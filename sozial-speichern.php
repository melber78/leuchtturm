<?php
// ---------------------------------------------------------------
// Sozialtraining-Stunden: speichert eigene/bearbeitete Stunden,
// den Jahresplan und die Rituale in material-daten/sozialtraining.json.
// Wird von sozial-stunden.php per fetch() aufgerufen, antwortet mit JSON.
// Die Datei liegt in material-daten/ und wird bei Updates nie überschrieben.
// ---------------------------------------------------------------

if (session_status() !== PHP_SESSION_ACTIVE) session_start();
header("Content-Type: application/json; charset=utf-8");

function antwort($ok, $daten = []){
    echo json_encode(array_merge(["ok" => $ok], $daten), JSON_UNESCAPED_UNICODE);
    exit;
}

if (empty($_SESSION["leuchtturm_eingeloggt"])) {
    http_response_code(401);
    antwort(false, ["fehler" => "Du bist nicht mehr eingeloggt. Bitte in einem neuen Tab neu einloggen und dann noch einmal speichern – deine Eingaben hier bleiben erhalten."]);
}
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    antwort(false, ["fehler" => "Nur POST erlaubt."]);
}
if (empty($_SESSION["sozial_csrf"]) || !hash_equals($_SESSION["sozial_csrf"], $_SERVER["HTTP_X_CSRF"] ?? "")) {
    http_response_code(403);
    antwort(false, ["fehler" => "Sitzung abgelaufen – bitte die Seite neu laden."]);
}

$roh = file_get_contents("php://input");
if (strlen($roh) > 2 * 1024 * 1024) antwort(false, ["fehler" => "Die Daten sind zu groß."]);
$anfrage = json_decode($roh, true);
if (!is_array($anfrage)) antwort(false, ["fehler" => "Ungültige Anfrage."]);

$DATEIEN = ["vertretung" => "vertretung.json", "lernangebot" => "lernangebot.json"];
$datei = __DIR__ . "/material-daten/" . ($DATEIEN[$_GET["bereich"] ?? ""] ?? "sozialtraining.json");
if (!is_dir(dirname($datei))) mkdir(dirname($datei), 0775, true);
if (!file_exists($datei)) file_put_contents($datei, json_encode(["einheiten" => [], "jahresplan" => null, "rituale" => null]));

// Kürzt alle Texte und begrenzt die Verschachtelung – es wird nur Text gespeichert, kein HTML ausgeführt
function bereinigen($wert, $tiefe = 0){
    if ($tiefe > 8) return null;
    if (is_array($wert)) {
        $neu = [];
        $i = 0;
        foreach ($wert as $k => $v) {
            if (++$i > 400) break;
            $schluessel = is_int($k) ? $k : mb_substr((string)$k, 0, 60);
            $neu[$schluessel] = bereinigen($v, $tiefe + 1);
        }
        return $neu;
    }
    if (is_string($wert)) return mb_substr(str_replace("\r", "", $wert), 0, 20000);
    if (is_bool($wert) || is_int($wert) || is_float($wert) || $wert === null) return $wert;
    return null;
}

// Liest die Datei, lässt sie von $aendern bearbeiten und schreibt sie zurück – alles unter einer Sperre.
// Ist die Datei beschädigt, wird nichts geschrieben.
function aktualisieren($datei, callable $aendern){
    $fp = fopen($datei, "c+");
    if (!$fp) return [false, "Datei konnte nicht geöffnet werden (Schreibrechte für material-daten?)."];
    flock($fp, LOCK_EX);
    $inhalt = stream_get_contents($fp);
    $daten = json_decode($inhalt, true);
    if (!is_array($daten)) {
        if (trim((string)$inhalt) !== "") { flock($fp, LOCK_UN); fclose($fp); return [false, basename($datei) . " ist beschädigt – es wurde nichts geändert."]; }
        $daten = [];
    }
    $daten += ["einheiten" => [], "jahresplan" => null, "rituale" => null];
    $ergebnis = $aendern($daten);
    if (is_array($ergebnis) && isset($ergebnis["fehler"])) { flock($fp, LOCK_UN); fclose($fp); return [false, $ergebnis["fehler"]]; }
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($daten, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    return [true, $ergebnis];
}

$aktion = $anfrage["aktion"] ?? "";

if ($aktion === "einheit_speichern") {
    $e = bereinigen($anfrage["einheit"] ?? null);
    if (!is_array($e) || trim((string)($e["titel"] ?? "")) === "") antwort(false, ["fehler" => "Die Stunde braucht einen Titel."]);
    $id = (string)($e["id"] ?? "");
    if (!preg_match('/^eigen-[a-z0-9]{6,40}$/', $id)) $id = "eigen-" . bin2hex(random_bytes(6));
    $e["id"] = $id;
    if (isset($e["ersetzt"]) && !preg_match('/^[vwl]-[a-z0-9-]{1,60}$/', (string)$e["ersetzt"])) unset($e["ersetzt"]);
    $e["geaendert"] = date("Y-m-d H:i");

    [$ok, $erg] = aktualisieren($datei, function (&$d) use ($e) {
        foreach ($d["einheiten"] as $i => $alt) {
            if (($alt["id"] ?? "") === $e["id"]) { $d["einheiten"][$i] = $e; return ["id" => $e["id"]]; }
        }
        if (count($d["einheiten"]) >= 500) return ["fehler" => "Es sind schon 500 eigene Stunden gespeichert."];
        $d["einheiten"][] = $e;
        return ["id" => $e["id"]];
    });
    if (!$ok) antwort(false, ["fehler" => $erg]);
    antwort(true, ["id" => $erg["id"], "geaendert" => $e["geaendert"]]);
}

if ($aktion === "einheit_loeschen") {
    $id = (string)($anfrage["id"] ?? "");
    [$ok, $erg] = aktualisieren($datei, function (&$d) use ($id) {
        $vorher = count($d["einheiten"]);
        $d["einheiten"] = array_values(array_filter($d["einheiten"], fn($x) => ($x["id"] ?? "") !== $id));
        return ["geloescht" => $vorher - count($d["einheiten"])];
    });
    if (!$ok) antwort(false, ["fehler" => $erg]);
    antwort(true, $erg);
}

if ($aktion === "jahresplan_speichern") {
    $plan = bereinigen($anfrage["jahresplan"] ?? null);
    if (!is_array($plan)) antwort(false, ["fehler" => "Ungültiger Jahresplan."]);
    [$ok, $erg] = aktualisieren($datei, function (&$d) use ($plan) { $d["jahresplan"] = $plan; return []; });
    if (!$ok) antwort(false, ["fehler" => $erg]);
    antwort(true);
}

// Sternenglas einer Gruppe (Lernangebot): Stern dazu/weg, Ziel setzen, Glas leeren – zählt auf dem Server, damit es auf jedem Gerät gleich ist
if ($aktion === "sterne_aendern") {
    $gruppe = (string)($anfrage["gruppe"] ?? "");
    if (!preg_match('/^[a-z0-9-]{1,40}$/', $gruppe)) antwort(false, ["fehler" => "Unbekannte Gruppe."]);
    $delta = max(-1, min(1, (int)($anfrage["delta"] ?? 0)));
    $ziel = isset($anfrage["ziel"]) ? max(3, min(200, (int)$anfrage["ziel"])) : null;
    $leeren = !empty($anfrage["leeren"]);
    [$ok, $erg] = aktualisieren($datei, function (&$d) use ($gruppe, $delta, $ziel, $leeren) {
        if (!isset($d["sterne"]) || !is_array($d["sterne"])) $d["sterne"] = [];
        $g = $d["sterne"][$gruppe] ?? ["n" => 0, "ziel" => 20, "voll" => 0];
        $g["n"] = max(0, min(999, (int)($g["n"] ?? 0) + $delta));
        if ($ziel !== null) $g["ziel"] = $ziel;
        if ($leeren) { if ((int)$g["n"] >= (int)($g["ziel"] ?? 20)) $g["voll"] = (int)($g["voll"] ?? 0) + 1; $g["n"] = 0; }
        $g["geaendert"] = date("Y-m-d H:i");
        $d["sterne"][$gruppe] = $g;
        return ["glas" => $g];
    });
    if (!$ok) antwort(false, ["fehler" => $erg]);
    antwort(true, $erg);
}

if ($aktion === "rituale_speichern") {
    $r = $anfrage["rituale"] ?? null;
    $r = is_string($r) ? mb_substr(str_replace("\r", "", $r), 0, 20000) : null;
    [$ok, $erg] = aktualisieren($datei, function (&$d) use ($r) { $d["rituale"] = $r; return []; });
    if (!$ok) antwort(false, ["fehler" => $erg]);
    antwort(true);
}

antwort(false, ["fehler" => "Unbekannte Aktion."]);
