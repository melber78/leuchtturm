<?php
/* Leuchtturm – Gast-Zugang: nur Funktionen (ohne Login-Umleitung).
   Genutzt von gast-zugang.php, gast.php, zugaenge.php und sozial-speichern.php. */
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

// Alle Bereiche, die einzeln für Gäste freigegeben werden können (Gruppe => [Schlüssel => Name])
const LT_GAST_GRUPPEN = [
    "Grundschule" => ["sozial" => "Sozialtraining", "lernangebot" => "Lernangebot (mit Arbeitsblatt-Generator)", "vertretung" => "Vertretungsstunden"],
    "Tafelbilder" => ["morgen" => "Guten Morgen! (Tagesstart)", "buchstabenkurs" => "Buchstabenkurs", "leise" => "Leise-Wald (alle 4 Arten)"],
    "LRS-Förderung" => ["lrs" => "Material-Generator", "akten" => "Kinder-Akten", "gutachten" => "Gutachten", "materialien" => "Materialien", "timer" => "Stunden-Timer", "stundenplan" => "Stundenplan"],
];
define("LT_GAST_BEREICHE", array_merge(...array_values(LT_GAST_GRUPPEN)));

function lt_gaesteDatei(){ return __DIR__ . "/material-daten/gaeste/zugaenge.json"; }
function lt_gaesteLesen(){
    $f = lt_gaesteDatei();
    $d = file_exists($f) ? json_decode((string)file_get_contents($f), true) : null;
    return is_array($d) ? $d : [];
}
// Liefert den gültigen Gast-Zugang der Sitzung (oder null)
function lt_gast(){
    $id = $_SESSION["leuchtturm_gast"] ?? "";
    if (!is_string($id) || !preg_match('/^[a-f0-9]{12}$/', $id)) return null;
    foreach (lt_gaesteLesen() as $g) {
        if (($g["id"] ?? "") !== $id) continue;
        if (!empty($g["gesperrt"])) return null;
        if (!empty($g["bis"]) && strtotime($g["bis"] . " 23:59:59") < time()) return null;
        // ältere Zugänge: Lernangebot schloss die Tafelbilder mit ein
        if (empty($g["v2"]) && in_array("lernangebot", $g["bereiche"] ?? [], true)) $g["bereiche"] = array_values(array_unique(array_merge($g["bereiche"], ["morgen", "buchstabenkurs", "leise"])));
        return $g;
    }
    return null;
}
// Darf der Gast irgendeinen dieser Bereiche?
function lt_gastDarfEinen($g, $bereiche){ foreach ((array)$bereiche as $b) if (lt_gastDarf($g, $b)) return true; return false; }
// Speicherorte: Gäste arbeiten immer mit eigenen Daten (material-daten/gaeste/<id>/), nie mit Melanies
function lt_aktuellerGast(){ static $g = false; if ($g === false) $g = empty($_SESSION["leuchtturm_eingeloggt"]) ? lt_gast() : null; return $g; }
function lt_daten($datei){
    $g = lt_aktuellerGast();
    $ordner = $g ? lt_gastOrdner($g) : __DIR__ . "/material-daten";
    if (!is_dir($ordner)) @mkdir($ordner, 0775, true);
    return $ordner . "/" . $datei;
}
// Hochgeladene Dateien (müssen im Browser anzeigbar sein): material-dateien/ bzw. material-dateien/gaeste/<id>/
function lt_dateienUrl(){ $g = lt_aktuellerGast(); return $g ? "material-dateien/gaeste/" . $g["id"] : "material-dateien"; }
function lt_dateienOrdner(){ $o = __DIR__ . "/" . lt_dateienUrl(); if (!is_dir($o)) @mkdir($o, 0775, true); return $o; }
// Für JSON-Schnittstellen: eingeloggt oder Gast mit einem der Bereiche?
function lt_apiErlaubt($bereiche){ return !empty($_SESSION["leuchtturm_eingeloggt"]) || lt_gastDarfEinen(lt_gast(), $bereiche); }
function lt_gastDarf($g, $bereich){ return $g && in_array($bereich, $g["bereiche"] ?? [], true); }
// Eigener Datenordner des Gasts
function lt_gastOrdner($g){ return __DIR__ . "/material-daten/gaeste/" . $g["id"]; }
function lt_gaesteSchreiben($liste){
    $f = lt_gaesteDatei();
    if (!is_dir(dirname($f))) mkdir(dirname($f), 0775, true);
    // Ordner nie direkt aus dem Web abrufbar
    if (!file_exists(dirname($f) . "/.htaccess")) @file_put_contents(dirname($f) . "/.htaccess", "Require all denied\nDeny from all\n");
    return file_put_contents($f, json_encode(array_values($liste), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX) !== false;
}
// Gut lesbarer Zugangscode, z. B. „KR7M-4XPT“ (ohne 0/O, 1/I/L)
function lt_neuerCode(){
    $z = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; $c = "";
    for ($i = 0; $i < 8; $i++) $c .= $z[random_int(0, strlen($z) - 1)];
    return substr($c, 0, 4) . "-" . substr($c, 4);
}
function lt_codeHash($code){ return hash("sha256", "leuchtturm-gast|" . strtoupper(preg_replace('/[^A-Za-z0-9]/', "", (string)$code))); }
