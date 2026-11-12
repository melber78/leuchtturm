<?php
// ---------------------------------------------------------------
// Mein Tag: speichert den eigenen Stundenplan und die Tagespläne
// in material-daten/tagesplan.json (Gäste: material-daten/gaeste/<id>/).
// Wird von tagesplan.php per fetch() aufgerufen, antwortet mit JSON.
// Die Datei liegt in material-daten/ und wird bei Updates nie überschrieben.
// ---------------------------------------------------------------
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
date_default_timezone_set("Europe/Berlin");
header("Content-Type: application/json; charset=utf-8");
function antwort($ok, $daten = []){ echo json_encode(array_merge(["ok" => $ok], $daten), JSON_UNESCAPED_UNICODE); exit; }

require_once __DIR__ . "/gast-zugang-pruefen.php";
$gast = empty($_SESSION["leuchtturm_eingeloggt"]) ? lt_gast() : null;
if ($gast && !lt_gastDarf($gast, "tagesplan")) { http_response_code(403); antwort(false, ["fehler" => "Dieser Bereich ist für deinen Gast-Zugang nicht freigegeben."]); }
if (empty($_SESSION["leuchtturm_eingeloggt"]) && !$gast) { http_response_code(401); antwort(false, ["fehler" => "Du bist nicht mehr eingeloggt. Bitte in einem neuen Tab neu einloggen – deine Eingaben hier bleiben erhalten."]); }
if ($_SERVER["REQUEST_METHOD"] !== "POST") { http_response_code(405); antwort(false, ["fehler" => "Nur POST erlaubt."]); }
if (empty($_SESSION["tagesplan_csrf"]) || !hash_equals($_SESSION["tagesplan_csrf"], $_SERVER["HTTP_X_CSRF"] ?? "")) { http_response_code(403); antwort(false, ["fehler" => "Sitzung abgelaufen – bitte die Seite neu laden."]); }

$roh = file_get_contents("php://input");
if (strlen($roh) > 1024 * 1024) antwort(false, ["fehler" => "Die Daten sind zu groß."]);
// Als Objekte lesen, damit leere {} beim Speichern {} bleiben (nicht [])
$anfrage = json_decode($roh);
if (!is_object($anfrage)) antwort(false, ["fehler" => "Ungültige Anfrage."]);

// Nur Text, Zahlen und Ja/Nein – gekürzt und begrenzt verschachtelt
function bereinigen($wert, $tiefe = 0){
    if ($tiefe > 8) return null;
    if (is_array($wert)) { $neu = []; $i = 0; foreach ($wert as $v) { if (++$i > 300) break; $neu[] = bereinigen($v, $tiefe + 1); } return $neu; }
    if (is_object($wert)) { $neu = new stdClass(); $i = 0; foreach ($wert as $k => $v) { if (++$i > 300) break; $k = mb_substr((string)$k, 0, 60); if ($k === "" || $k[0] === "\0") continue; $neu->{$k} = bereinigen($v, $tiefe + 1); } return $neu; }
    if (is_string($wert)) return mb_substr(str_replace("\r", "", $wert), 0, 5000);
    if (is_bool($wert) || is_int($wert) || is_float($wert) || $wert === null) return $wert;
    return null;
}

$datei = lt_daten("tagesplan.json");

// Liest die Datei, ändert sie und schreibt sie zurück – unter einer Sperre. Beschädigte Datei → nichts schreiben.
function aktualisieren($datei, callable $aendern){
    $fp = fopen($datei, "c+");
    if (!$fp) return "Speichern nicht möglich (Schreibrechte für material-daten?).";
    flock($fp, LOCK_EX);
    $inhalt = stream_get_contents($fp);
    $d = json_decode($inhalt);
    if (!is_object($d)) {
        if (trim((string)$inhalt) !== "") { flock($fp, LOCK_UN); fclose($fp); return "tagesplan.json ist beschädigt – es wurde nichts geändert."; }
        $d = new stdClass();
    }
    if (!isset($d->tage) || !is_object($d->tage)) $d->tage = new stdClass();
    $aendern($d);
    ftruncate($fp, 0); rewind($fp);
    fwrite($fp, json_encode($d, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    fflush($fp); flock($fp, LOCK_UN); fclose($fp);
    return true;
}

$aktion = (string)($anfrage->aktion ?? "");

if ($aktion === "stundenplan_speichern") {
    $sp = bereinigen($anfrage->stundenplan ?? null);
    if (!is_object($sp)) antwort(false, ["fehler" => "Ungültiger Stundenplan."]);
    $erg = aktualisieren($datei, function ($d) use ($sp) { $d->stundenplan = $sp; });
    if ($erg !== true) antwort(false, ["fehler" => $erg]);
    antwort(true, ["zeit" => date("H:i")]);
}

if ($aktion === "tag_speichern") {
    $datum = (string)($anfrage->datum ?? "");
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $datum)) antwort(false, ["fehler" => "Ungültiges Datum."]);
    $tag = isset($anfrage->tag) ? bereinigen($anfrage->tag) : null;
    if ($tag !== null && !is_object($tag)) antwort(false, ["fehler" => "Ungültiger Tagesplan."]);
    $erg = aktualisieren($datei, function ($d) use ($datum, $tag) {
        if ($tag === null) unset($d->tage->$datum);
        else $d->tage->$datum = $tag;
        if (count((array)$d->tage) > 1200) {   // sehr alte Tage aufräumen (älter als 2 Jahre)
            $grenze = date("Y-m-d", strtotime("-2 years"));
            foreach (array_keys((array)$d->tage) as $k) if ($k < $grenze) unset($d->tage->$k);
        }
    });
    if ($erg !== true) antwort(false, ["fehler" => $erg]);
    antwort(true, ["zeit" => date("H:i")]);
}

antwort(false, ["fehler" => "Unbekannte Aktion."]);
