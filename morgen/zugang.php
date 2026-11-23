<?php
/* Tafel-Links verwalten (nur Melanie, eingeloggt): erstellen, auflisten, sperren. Antwort als JSON. */
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
header("Content-Type: application/json; charset=utf-8");
require_once __DIR__ . "/../gast-zugang-pruefen.php";
function antwort($ok, $d = []){ echo json_encode(array_merge(["ok" => $ok], $d), JSON_UNESCAPED_UNICODE); exit; }
if (empty($_SESSION["leuchtturm_eingeloggt"])) { http_response_code(401); antwort(false, ["fehler" => "Nur im eigenen Leuchtturm-Login möglich."]); }
if ($_SERVER["REQUEST_METHOD"] !== "POST" || empty($_SESSION["tafel_csrf"]) || !hash_equals($_SESSION["tafel_csrf"], $_SERVER["HTTP_X_CSRF"] ?? "")) { http_response_code(403); antwort(false, ["fehler" => "Sitzung abgelaufen – bitte neu laden."]); }
$e = json_decode((string)file_get_contents("php://input"), true) ?: [];
$liste = lt_tafelnLesen();
$aktion = $e["aktion"] ?? "liste";
$basis = (!empty($_SERVER["HTTPS"]) ? "https" : "http") . "://" . $_SERVER["HTTP_HOST"] . rtrim(dirname($_SERVER["SCRIPT_NAME"]), "/\\") . "/";
if ($aktion === "neu") {
    $k = bin2hex(random_bytes(20));
    $name = mb_substr(trim((string)($e["name"] ?? "")), 0, 40) ?: "Tafel";
    $klasse = preg_match('/^[a-z0-9]{1,20}$/i', (string)($e["klasse"] ?? "")) ? $e["klasse"] : "";
    $liste[] = ["id" => bin2hex(random_bytes(6)), "name" => $name, "klasse" => $klasse, "hash" => lt_tafelHash($k), "erstellt" => date("Y-m-d")];
    if (!lt_tafelnSchreiben($liste)) antwort(false, ["fehler" => "Konnte nicht gespeichert werden."]);
    antwort(true, ["link" => $basis . "?k=" . $k, "liste" => array_map(fn($t) => array_diff_key($t, ["hash" => 1]), $liste)]);
}
if ($aktion === "loeschen") {
    $liste = array_values(array_filter($liste, fn($t) => ($t["id"] ?? "") !== ($e["id"] ?? "")));
    lt_tafelnSchreiben($liste);
}
antwort(true, ["liste" => array_map(fn($t) => array_diff_key($t, ["hash" => 1]), $liste)]);
