<?php
/* ============================================================
   Leuchtturm – Gast-Zugang (Prüfung)
   Wird statt auth.php von den Seiten eingebunden, die Kolleginnen
   testen dürfen: Sozialtraining, Lernangebot, Vertretung.
   – Melanie (normal eingeloggt): alles wie immer über auth.php.
   – Gast mit gültigem Zugang: darf nur die freigegebenen Bereiche
     öffnen und arbeitet mit EIGENEN Daten in
     material-daten/gaeste/<id>/ – Melanies Daten bleiben unberührt.
   – Sonst: normaler Login über auth.php.
   Zugänge verwalten: zugaenge.php
   ============================================================ */
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

require_once __DIR__ . "/gast-zugang-pruefen.php";

$LT_GAST = null;
$LT_FREIGABE = null;
// Morgentafel als eigene App auf der digitalen Tafel (morgen/index.php hat den Zugang schon geprüft)
if (defined("LT_TAFEL_APP")) { if (defined("LT_TAFEL_GAST")) $LT_GAST = lt_gast(); return; }
if (empty($_SESSION["leuchtturm_eingeloggt"])) {
    $LT_GAST = lt_gast();
    if (!$LT_GAST) {
        // Freigabe-Link für genau eine Stunde (teilen.php) – nur für den passenden Bereich
        $f = lt_freigabe();
        if ($f && isset($LT_GAST_BEREICH) && in_array($f["bereich"], (array)$LT_GAST_BEREICH, true)) { $LT_FREIGABE = $f; return; }
        if (!empty($_SESSION["leuchtturm_gast"])) { unset($_SESSION["leuchtturm_gast"]); header("Location: gast.php?abgelaufen=1"); exit; }
        require __DIR__ . "/auth.php";
    } elseif (isset($LT_GAST_BEREICH) && !lt_gastDarfEinen($LT_GAST, $LT_GAST_BEREICH)) {
        header("Location: gast.php"); exit;
    }
} else {
    require __DIR__ . "/auth.php";
}
