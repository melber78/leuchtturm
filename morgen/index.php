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
// Freischalten: Tafel-Code eintippen (oder Link mit ?c=CODE bzw. alter ?k=…) – Code als Cookie merken (400 Tage)
$fehler = "";
$eingabe = $_POST["code"] ?? ($_GET["c"] ?? ($_GET["k"] ?? null));
if ($eingabe !== null) {
    if (lt_tafelVersuche() >= 8) $fehler = "Zu viele falsche Versuche. Bitte in 15 Minuten noch einmal.";
    else {
        $t = lt_tafelZugang((string)$eingabe);
        if ($t) {
            $code = lt_tafelNorm((string)$eingabe);
            setcookie("lt_tafel", $code, ["expires" => time() + 400 * 86400, "path" => $pfad, "secure" => !empty($_SERVER["HTTPS"]), "httponly" => true, "samesite" => "Lax"]);
            header("Location: ./"); exit;
        }
        lt_tafelVersuche(true);
        $fehler = "Dieser Code stimmt nicht – oder die Tafel wurde gesperrt.";
    }
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
<p>Tafel-Code eingeben:</p>
<form method="post" action="./"><input name="code" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="z. B. KR7M-4XPT" maxlength="12" autofocus
 style="font:800 34px/1 monospace;letter-spacing:.12em;text-transform:uppercase;width:100%;box-sizing:border-box;padding:14px 16px;border:3px solid #c9d6e3;border-radius:16px;text-align:center">
<button style="margin-top:14px;width:100%;font:900 20px system-ui,sans-serif;padding:14px;border:0;border-radius:16px;background:#16324a;color:#fff;cursor:pointer">Tafel freischalten</button></form>
<?php if ($fehler): ?><p class="rot"><?= htmlspecialchars($fehler) ?></p><?php endif; ?>
<p style="font-size:15px;color:#5b6f84">Den Code bekommst du im Leuchtturm: Guten Morgen → Bearbeiten → Klasse → „📺 Auf der Tafel installieren“.</p>
</div></body></html>
<?php exit; }

// Freigeschaltet: die Morgentafel aus tafelbilder.php – nur sie, ohne Übersicht
define("LT_TAFEL_APP", $tafel ? ($tafel["klasse"] ?? "") : "");
chdir(__DIR__ . "/..");
require __DIR__ . "/../tafelbilder.php";
