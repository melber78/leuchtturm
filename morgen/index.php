<?php
/* ============================================================
   Leuchtturm – Guten-Morgen-Tafel als eigene App für die digitale Tafel.
   Die Tafel sieht NUR die Morgentafel (kein Login, kein Zugriff auf
   Kinder-Akten, Material usw.). Freischalten über einen Tafel-Link,
   den Melanie im Leuchtturm erstellt (Guten Morgen → Bearbeiten → Klasse).
   ============================================================ */
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
require_once __DIR__ . "/../gast-zugang-pruefen.php";

$pfad = rtrim(dirname(dirname($_SERVER["SCRIPT_NAME"])), "/\\") . "/";
// Freischalt-Link: Schlüssel als Cookie merken (400 Tage) und ohne Schlüssel in der Adresse neu laden
if (isset($_GET["k"])) {
    $t = lt_tafelZugang((string)$_GET["k"]);
    if ($t) {
        setcookie("lt_tafel", (string)$_GET["k"], ["expires" => time() + 400 * 86400, "path" => $pfad, "secure" => !empty($_SERVER["HTTPS"]), "httponly" => true, "samesite" => "Lax"]);
        $_COOKIE["lt_tafel"] = (string)$_GET["k"];
    }
    header("Location: ./" . ($t ? "" : "?ungueltig=1")); exit;
}
$tafel = lt_tafelZugang();
if ($tafel) {
    // Schlüssel bei jedem Start verlängern, damit die Tafel nie abgemeldet wird
    setcookie("lt_tafel", $_COOKIE["lt_tafel"], ["expires" => time() + 400 * 86400, "path" => $pfad, "secure" => !empty($_SERVER["HTTPS"]), "httponly" => true, "samesite" => "Lax"]);
}
if (!$tafel && empty($_SESSION["leuchtturm_eingeloggt"])) { ?>
<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="manifest" href="manifest.php"><meta name="theme-color" content="#16324a"><link rel="icon" type="image/png" href="icon-192.png">
<title>Guten Morgen!</title>
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#fff8e8,#eef6fb);font-family:"Nunito",system-ui,sans-serif;color:#16324a}
.box{background:#fff;border-radius:24px;box-shadow:0 10px 30px rgba(22,50,74,.12);padding:32px 36px;max-width:560px;margin:20px}h1{margin:0 0 10px;font-size:30px}p,li{font-size:17px;line-height:1.5}.rot{color:#a3261c;font-weight:800}</style></head>
<body><div class="box"><h1>☀️ Guten Morgen!</h1>
<?php if (isset($_GET["ungueltig"])): ?><p class="rot">Dieser Tafel-Link ist ungültig oder wurde gesperrt.</p><?php endif; ?>
<p>Diese Tafel ist noch nicht freigeschaltet.</p>
<ol><li>Im Leuchtturm die Guten-Morgen-Tafel öffnen.</li><li><b>Bearbeiten → Klasse → „📺 Auf der Tafel installieren“</b> antippen.</li><li>Den Tafel-Link <b>hier auf der Tafel</b> öffnen.</li></ol>
</div></body></html>
<?php exit; }

// Freigeschaltet: die Morgentafel aus tafelbilder.php – nur sie, ohne Übersicht
define("LT_TAFEL_APP", $tafel ? ($tafel["klasse"] ?? "") : "");
chdir(__DIR__ . "/..");
require __DIR__ . "/../tafelbilder.php";
