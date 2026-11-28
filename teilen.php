<?php
/* ============================================================
   Leuchtturm – Freigabe-Links für einzelne Stunden
   GET  teilen.php?f=TOKEN  → öffnet genau diese Stunde (ohne Anmeldung)
   POST {aktion: erstellen|liste|loeschen}  → nur für Melanie (eingeloggt)
   Gespeichert in material-daten/gaeste/freigaben.json
   ============================================================ */
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
require_once __DIR__ . "/gast-zugang-pruefen.php";

const LT_FREIGABE_BEREICHE = ["sozial", "lernangebot", "vertretung"];

function lt_basisUrl(){
    $https = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off") || (($_SERVER["HTTP_X_FORWARDED_PROTO"] ?? "") === "https");
    $pfad = rtrim(str_replace("\\", "/", dirname($_SERVER["SCRIPT_NAME"] ?? "/")), "/");
    return ($https ? "https" : "http") . "://" . ($_SERVER["HTTP_HOST"] ?? "localhost") . $pfad;
}
function lt_freigabeUrl($f){ return lt_basisUrl() . "/teilen.php?f=" . rawurlencode($f["token"]); }

// ---------- Schnittstelle für Melanie ----------
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    header("Content-Type: application/json; charset=utf-8");
    $antwort = function ($ok, $d = []) { echo json_encode(array_merge(["ok" => $ok], $d), JSON_UNESCAPED_UNICODE); exit; };
    if (empty($_SESSION["leuchtturm_eingeloggt"])) { http_response_code(401); $antwort(false, ["fehler" => "Nur du selbst kannst Links erstellen – bitte im Leuchtturm anmelden."]); }
    $e = json_decode((string)file_get_contents("php://input"), true) ?: [];
    $aktion = (string)($e["aktion"] ?? "");
    $liste = lt_freigabenLesen();

    if ($aktion === "erstellen") {
        $bereich = (string)($e["bereich"] ?? ""); $id = (string)($e["id"] ?? "");
        if (!in_array($bereich, LT_FREIGABE_BEREICHE, true) || !preg_match('/^[A-Za-z0-9_.:-]{1,80}$/', $id)) $antwort(false, ["fehler" => "Diese Stunde kann nicht geteilt werden."]);
        $tage = max(0, min(3650, (int)($e["tage"] ?? 30)));
        $token = "";
        $z = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";
        for ($i = 0; $i < 14; $i++) $token .= $z[random_int(0, strlen($z) - 1)];
        $neu = ["token" => $token, "bereich" => $bereich, "id" => $id, "titel" => mb_substr(trim((string)($e["titel"] ?? "")), 0, 120),
                "erstellt" => date("Y-m-d"), "bis" => $tage ? date("Y-m-d", strtotime("+$tage days")) : ""];
        // abgelaufene Links aufräumen
        $liste = array_values(array_filter($liste, fn($f) => lt_freigabeGueltig($f)));
        $liste[] = $neu;
        if (!lt_freigabenSchreiben($liste)) $antwort(false, ["fehler" => "Konnte den Link nicht speichern (Schreibrechte im Ordner material-daten?)."]);
        $antwort(true, ["url" => lt_freigabeUrl($neu), "token" => $token]);
    }
    if ($aktion === "liste") {
        $bereich = (string)($e["bereich"] ?? ""); $id = (string)($e["id"] ?? "");
        $treffer = array_values(array_filter($liste, fn($f) => lt_freigabeGueltig($f) && (!$id || ($f["bereich"] === $bereich && $f["id"] === $id))));
        $antwort(true, ["liste" => array_map(fn($f) => ["token" => $f["token"], "titel" => $f["titel"] ?? "", "bis" => $f["bis"] ?? "", "erstellt" => $f["erstellt"] ?? "", "bereich" => $f["bereich"], "id" => $f["id"], "url" => lt_freigabeUrl($f)], $treffer)]);
    }
    if ($aktion === "loeschen") {
        $t = (string)($e["token"] ?? "");
        $liste = array_values(array_filter($liste, fn($f) => ($f["token"] ?? "") !== $t));
        lt_freigabenSchreiben($liste);
        $antwort(true);
    }
    $antwort(false, ["fehler" => "Unbekannte Aktion."]);
}

// ---------- Link öffnen ----------
$f = lt_freigabeVon((string)($_GET["f"] ?? ""));
if ($f) {
    $_SESSION["leuchtturm_freigabe"] = $f["token"];
    $ziel = "sozial-stunden.php" . ($f["bereich"] !== "sozial" ? "?bereich=" . rawurlencode($f["bereich"]) : "") . "#stunde/" . rawurlencode($f["id"]);
    header("Location: " . $ziel);
    exit;
}
?><!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Link nicht gültig · Leuchtturm</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="marke/mewe.css">
<script src="marke/stimme.js"></script>
<style>body{ margin:0; background:#f7f4ec; font-family:Nunito, sans-serif; color:#2d3530; display:flex; min-height:100vh; align-items:center; justify-content:center; padding:24px; box-sizing:border-box; }
.k{ background:#fff; border-radius:22px; padding:28px; max-width:420px; text-align:center; box-shadow:0 6px 24px rgba(47,74,31,.1); } img{ width:200px; } h1{ font-family:Fraunces, Georgia, serif; color:#2f4a1f; font-size:24px; } p{ color:#56664a; }</style></head>
<body><div class="k"><img src="marke/mewe-leuchtturm.svg" alt="MeWe Leuchtturm"><h1>Dieser Link ist nicht mehr gültig</h1><p>Er ist abgelaufen oder wurde gelöscht. Bitte frag nach einem neuen Link.</p></div></body></html>
