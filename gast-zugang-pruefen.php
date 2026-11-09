<?php
/* Leuchtturm – Gast-Zugang: nur Funktionen (ohne Login-Umleitung).
   Genutzt von gast-zugang.php, gast.php, zugaenge.php und sozial-speichern.php. */
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

const LT_GAST_BEREICHE = [
    "sozial"      => "Sozialtraining",
    "lernangebot" => "Lernangebot",
    "vertretung"  => "Vertretungsstunden",
];

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
        return $g;
    }
    return null;
}
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
