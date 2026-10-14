<?php
// ---------------------------------------------------------------
// Kinder-Akte: Förderplan, bearbeitete Blätter und Stunden je Kürzel.
// Schnittstelle (POST, JSON) für trainingshefte.php und lrs.php.
// Gespeichert wird nur unter dem Kürzel – nie Namen.
// ---------------------------------------------------------------

session_start();
header("Content-Type: application/json; charset=utf-8");

$aktenDatei  = __DIR__ . "/material-daten/akten.json";
$kinderDatei = __DIR__ . "/material-daten/kinder.json";
if (!is_dir(dirname($aktenDatei))) mkdir(dirname($aktenDatei), 0775, true);
if (!file_exists($aktenDatei)) file_put_contents($aktenDatei, "{}");

$antwort = function ($ok, $daten = []) {
    echo json_encode(array_merge(["ok" => $ok], $daten), JSON_UNESCAPED_UNICODE);
    exit;
};
if (empty($_SESSION["leuchtturm_eingeloggt"])) {
    http_response_code(401);
    $antwort(false, ["fehler" => "Du bist nicht mehr eingeloggt. Bitte in einem neuen Tab neu einloggen."]);
}
if ($_SERVER["REQUEST_METHOD"] !== "POST") $antwort(false, ["fehler" => "Nur POST."]);

$eingabe = json_decode((string)file_get_contents("php://input"), true);
if (!is_array($eingabe)) $antwort(false, ["fehler" => "Ungültige Anfrage."]);

$FUNKTIONEN = ["aufmerksamkeit", "optdiff", "optged", "optser", "akdiff", "akged", "akser", "koerper", "raum"];
$RS = ["schaerfung", "cktz", "dehnung", "ie", "sss", "auslaut", "aeau", "dasdass", "grossklein", "vf", "doppelvokal", "iglich", "spst", "silbenh", "chsx"];
$WEITERE = ["lesen", "schreiben", "sonstiges"];
$STAND = ["offen", "teilweise", "erreicht"];

$aktion = (string)($eingabe["aktion"] ?? "");
$kind = trim((string)($eingabe["kind"] ?? ""));
$kinder = json_decode((string)@file_get_contents($kinderDatei), true);
$codes = is_array($kinder) ? array_map(fn($k) => $k["code"], $kinder) : [];
if (!in_array($kind, $codes, true)) $antwort(false, ["fehler" => "Das Kürzel „" . $kind . "“ gibt es nicht. Bitte zuerst unter Kinder-Akten anlegen."]);

$text = fn($w, $max) => mb_substr(trim((string)$w), 0, $max);
$zeile = fn($w, $max) => mb_substr(trim(preg_replace('/\s+/u', ' ', (string)$w)), 0, $max);
$datum = fn($d, $leer = false) => preg_match('/^\d{4}-\d{2}-\d{2}$/', (string)$d) ? (string)$d : ($leer ? "" : date("Y-m-d"));
$liste = fn($l, $erlaubt) => array_values(array_unique(array_filter(is_array($l) ? $l : [], fn($k) => in_array($k, $erlaubt, true))));

// Lesen – ändern – schreiben unter einer Sperre; eine beschädigte Datei wird nie überschrieben
$fp = fopen($aktenDatei, "c+");
if (!$fp) $antwort(false, ["fehler" => "akten.json konnte nicht geöffnet werden (Schreibrechte im Ordner material-daten?)."]);
flock($fp, LOCK_EX);
$inhalt = stream_get_contents($fp);
$alle = json_decode($inhalt, true);
if (!is_array($alle)) {
    if (trim((string)$inhalt) !== "" && trim((string)$inhalt) !== "[]") { flock($fp, LOCK_UN); fclose($fp); $antwort(false, ["fehler" => "akten.json ist beschädigt – es wurde nichts geändert."]); }
    $alle = [];
}
$akte = $alle[$kind] ?? [];
$akte += ["klasse" => "", "plan" => [], "erledigt" => [], "stunden" => []];
$akte["plan"] += ["von" => "", "bis" => "", "f" => [], "r" => [], "ziele" => [], "notiz" => "", "geaendert" => ""];
$geaendert = false; $meldung = "";

switch ($aktion) {
    case "laden":
        break;

    // komplette Förderplan-Seite aus der Akte
    case "plan_speichern":
        $p = (array)($eingabe["plan"] ?? []);
        $ziele = [];
        foreach (array_slice((array)($p["ziele"] ?? []), 0, 40) as $z) {
            $bereich = (string)($z["bereich"] ?? "sonstiges");
            if (!in_array($bereich, array_merge($FUNKTIONEN, $RS, $WEITERE), true)) $bereich = "sonstiges";
            $ziel = $text($z["ziel"] ?? "", 400);
            $massnahme = $text($z["massnahme"] ?? "", 600);
            if ($ziel === "" && $massnahme === "") continue;
            $ziele[] = [
                "id" => preg_match('/^z_[a-z0-9]+$/', (string)($z["id"] ?? "")) ? $z["id"] : uniqid("z_"),
                "bereich" => $bereich, "ziel" => $ziel, "massnahme" => $massnahme,
                "stand" => in_array($z["stand"] ?? "", $STAND, true) ? $z["stand"] : "offen",
                "pruefung" => $datum($z["pruefung"] ?? "", true),
                "beobachtung" => $text($z["beobachtung"] ?? "", 600),
            ];
        }
        $akte["plan"] = [
            "von" => $datum($p["von"] ?? "", true), "bis" => $datum($p["bis"] ?? "", true),
            "f" => $liste($p["f"] ?? [], $FUNKTIONEN), "r" => $liste($p["r"] ?? [], $RS),
            "ziele" => $ziele, "notiz" => $text($p["notiz"] ?? "", 3000), "geaendert" => date("Y-m-d"),
        ];
        if (preg_match('/^[1-8]$/', (string)($eingabe["klasse"] ?? ""))) $akte["klasse"] = (string)$eingabe["klasse"];
        $geaendert = true; $meldung = "Förderplan gespeichert.";
        break;

    // aus dem Generator: Schwerpunkte übernehmen, Ziele bleiben erhalten
    case "schwerpunkte_speichern":
        $akte["plan"]["f"] = $liste($eingabe["f"] ?? [], $FUNKTIONEN);
        $akte["plan"]["r"] = $liste($eingabe["r"] ?? [], $RS);
        if (!$akte["plan"]["von"]) $akte["plan"]["von"] = date("Y-m-d");
        $akte["plan"]["geaendert"] = date("Y-m-d");
        if (preg_match('/^[1-8]$/', (string)($eingabe["klasse"] ?? ""))) $akte["klasse"] = (string)$eingabe["klasse"];
        $geaendert = true;
        $meldung = count($akte["plan"]["f"]) . " Funktionsbereiche und " . count($akte["plan"]["r"]) . " Rechtschreib-Schwerpunkte im Förderplan gespeichert.";
        break;

    case "klasse":
        if (preg_match('/^[1-8]$/', (string)($eingabe["klasse"] ?? ""))) { $akte["klasse"] = (string)$eingabe["klasse"]; $geaendert = true; }
        break;

    case "erledigt":
        $id = (string)($eingabe["material_id"] ?? "");
        if (!preg_match('/^[A-Za-z0-9_.-]{1,60}$/', $id)) $antwort(false, ["fehler" => "Ungültiges Material."]);
        if (!empty($eingabe["an"])) $akte["erledigt"][$id] = date("Y-m-d"); else unset($akte["erledigt"][$id]);
        $geaendert = true;
        break;

    case "stunde_hinzu":
        $s = (array)($eingabe["stunde"] ?? []);
        $neu = [
            "id" => uniqid("s_"), "datum" => $datum($s["datum"] ?? ""),
            "dauer" => max(5, min(240, (int)($s["dauer"] ?? 40))),
            "inhalt" => $text($s["inhalt"] ?? "", 1500), "beobachtung" => $text($s["beobachtung"] ?? "", 1500),
        ];
        array_unshift($akte["stunden"], $neu);
        usort($akte["stunden"], fn($a, $b) => strcmp($b["datum"], $a["datum"]));
        $akte["stunden"] = array_slice($akte["stunden"], 0, 300);
        $geaendert = true; $meldung = "Stunde vom " . date("d.m.Y", strtotime($neu["datum"])) . " eingetragen.";
        break;

    case "stunde_aendern":
        $id = (string)($eingabe["id"] ?? "");
        $s = (array)($eingabe["stunde"] ?? []);
        foreach ($akte["stunden"] as &$st) {
            if ($st["id"] !== $id) continue;
            if (isset($s["datum"])) $st["datum"] = $datum($s["datum"]);
            if (isset($s["dauer"])) $st["dauer"] = max(5, min(240, (int)$s["dauer"]));
            if (isset($s["inhalt"])) $st["inhalt"] = $text($s["inhalt"], 1500);
            if (isset($s["beobachtung"])) $st["beobachtung"] = $text($s["beobachtung"], 1500);
            $geaendert = true;
        }
        unset($st);
        usort($akte["stunden"], fn($a, $b) => strcmp($b["datum"], $a["datum"]));
        break;

    case "stunde_loeschen":
        $id = (string)($eingabe["id"] ?? "");
        $vorher = count($akte["stunden"]);
        $akte["stunden"] = array_values(array_filter($akte["stunden"], fn($s) => $s["id"] !== $id));
        $geaendert = count($akte["stunden"]) !== $vorher;
        break;

    default:
        flock($fp, LOCK_UN); fclose($fp);
        $antwort(false, ["fehler" => "Unbekannte Aktion."]);
}

$akte["erledigt"] = (object)$akte["erledigt"];
if ($geaendert) {
    $alle[$kind] = $akte;
    ftruncate($fp, 0); rewind($fp);
    fwrite($fp, json_encode($alle, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    fflush($fp);
}
flock($fp, LOCK_UN); fclose($fp);
$antwort(true, ["akte" => $akte, "meldung" => $meldung]);
