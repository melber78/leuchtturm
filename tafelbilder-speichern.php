<?php
// ---------------------------------------------------------------
// Tafelbilder: speichert Einstellungen der Tafelbilder (z. B. Morgentafel:
// Klassen, Stundenplan, Material, Hinweise) in material-daten/tafelbilder.json.
// Gäste (Kollegin testet) speichern in material-daten/gaeste/<id>/.
// Wird von tafelbilder.php per fetch() aufgerufen, antwortet mit JSON.
// ---------------------------------------------------------------
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
header("Content-Type: application/json; charset=utf-8");
function antwort($ok, $daten = []){ echo json_encode(array_merge(["ok" => $ok], $daten), JSON_UNESCAPED_UNICODE); exit; }

require_once __DIR__ . "/gast-zugang-pruefen.php";
$gast = empty($_SESSION["leuchtturm_eingeloggt"]) ? lt_gast() : null;
if ($gast && !lt_gastDarf($gast, "lernangebot")) { http_response_code(403); antwort(false, ["fehler" => "Nicht freigegeben."]); }
if (empty($_SESSION["leuchtturm_eingeloggt"]) && !$gast) { http_response_code(401); antwort(false, ["fehler" => "Du bist nicht mehr eingeloggt. Bitte neu einloggen."]); }
if ($_SERVER["REQUEST_METHOD"] !== "POST") { http_response_code(405); antwort(false, ["fehler" => "Nur POST erlaubt."]); }
if (empty($_SESSION["tafel_csrf"]) || !hash_equals($_SESSION["tafel_csrf"], $_SERVER["HTTP_X_CSRF"] ?? "")) { http_response_code(403); antwort(false, ["fehler" => "Sitzung abgelaufen – bitte die Seite neu laden."]); }

$roh = file_get_contents("php://input");
if (strlen($roh) > 1024 * 1024) antwort(false, ["fehler" => "Die Daten sind zu groß."]);
$anfrage = json_decode($roh, true);
if (!is_array($anfrage)) antwort(false, ["fehler" => "Ungültige Anfrage."]);

function bereinigen($wert, $tiefe = 0){
    if ($tiefe > 8) return null;
    if (is_array($wert)) { $neu = []; $i = 0; foreach ($wert as $k => $v) { if (++$i > 300) break; $neu[is_int($k) ? $k : mb_substr((string)$k, 0, 60)] = bereinigen($v, $tiefe + 1); } return $neu; }
    if (is_string($wert)) return mb_substr(str_replace("\r", "", $wert), 0, 2000);
    if (is_bool($wert) || is_int($wert) || is_float($wert) || $wert === null) return $wert;
    return null;
}

$ordner = $gast ? lt_gastOrdner($gast) : __DIR__ . "/material-daten";
if (!is_dir($ordner)) mkdir($ordner, 0775, true);
$datei = $ordner . "/tafelbilder.json";

$schluessel = (string)($anfrage["bild"] ?? "");
if (!preg_match('/^[a-z0-9-]{1,30}$/', $schluessel)) antwort(false, ["fehler" => "Unbekanntes Tafelbild."]);
$wert = bereinigen($anfrage["daten"] ?? null);
if (!is_array($wert)) antwort(false, ["fehler" => "Keine Daten."]);

$fp = fopen($datei, "c+");
if (!$fp) antwort(false, ["fehler" => "Speichern nicht möglich."]);
flock($fp, LOCK_EX);
$alt = json_decode(stream_get_contents($fp), true);
if (!is_array($alt)) $alt = [];
$alt[$schluessel] = $wert;
ftruncate($fp, 0); rewind($fp);
fwrite($fp, json_encode($alt, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
fflush($fp); flock($fp, LOCK_UN); fclose($fp);
antwort(true);
