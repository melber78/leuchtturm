<?php
/* ============================================================
   Leuchtturm – Tafelbilder einzeln als App auf einer digitalen Tafel.
   tafel/?b=einmaleins öffnet nur dieses Tafelbild und lässt sich als
   eigene App installieren. Die Tafel braucht einmal einen Tafel-Code
   (im Leuchtturm unter Tafelbilder → „📺 Auf Tafeln installieren“) und
   kommt sonst nirgends in den Leuchtturm.
   ============================================================ */
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
require_once __DIR__ . "/../gast-zugang-pruefen.php";
require __DIR__ . "/bausteine.php";

$pfad = rtrim(dirname(dirname($_SERVER["SCRIPT_NAME"])), "/\\") . "/";
$b = (string)($_GET["b"] ?? "");
if ($b === "werkstatt") $b = "einmaleins";   // früher eigenes Tafelbild – jetzt Teil des Einmaleins
if (!isset(LT_BAUSTEINE[$b])) $b = "";
$zurueck = "./" . ($b ? "?b=" . $b : "");
$fehler = "";
$keks = fn($name, $wert, $tage) => setcookie($name, $wert, ["expires" => time() + $tage * 86400, "path" => $pfad, "secure" => !empty($_SERVER["HTTPS"]), "httponly" => true, "samesite" => "Lax"]);
// Kollegin meldet sich von dieser Tafel ab (danach kann sich jemand anderes anmelden)
if (isset($_GET["abmelden"])) { $keks("lt_tafel_gast", "", -1); unset($_SESSION["leuchtturm_gast"]); header("Location: ./"); exit; }
$eingabe = $_POST["code"] ?? ($_GET["c"] ?? null);
if ($eingabe !== null) {
    if (lt_tafelVersuche() >= 8) $fehler = "Zu viele falsche Versuche. Bitte in 15 Minuten noch einmal.";
    else {
        $t = lt_tafelZugang((string)$eingabe);
        $g = $t ? null : lt_gastPerCode((string)$eingabe);
        if ($t) {
            $keks("lt_tafel", lt_tafelNorm((string)$eingabe), 400); $keks("lt_tafel_gast", "", -1); unset($_SESSION["leuchtturm_gast"]);
            header("Location: " . $zurueck); exit;
        }
        if ($g && lt_gastHatTafelbild($g)) {
            // persönlicher Code der Kollegin: gilt auf jeder Tafel, zeigt nur ihre Tafelbilder
            $keks("lt_tafel_gast", strtoupper(preg_replace('/[^A-Za-z0-9]/', "", (string)$eingabe)), 400);   // Tafel-Code (z. B. für die Morgentafel) bleibt erhalten
            session_regenerate_id(true); $_SESSION["leuchtturm_gast"] = $g["id"];
            header("Location: " . (lt_gastDarfBaustein($g, $b) ? $zurueck : "./")); exit;
        }
        lt_tafelVersuche(true);
        $fehler = $g ? "Für diesen Zugang sind noch keine Tafelbilder freigegeben." : "Dieser Code stimmt nicht – oder der Zugang wurde gesperrt.";
    }
}
$tafel = lt_tafelZugang();
if ($tafel) $keks("lt_tafel", $_COOKIE["lt_tafel"], 400);
// Kollegin mit eigenem Code (Freigaben und Sperren gelten sofort, auch auf schon installierten Tafelbildern).
// Hat die Tafel zusätzlich einen Tafel-Code, gilt hier unter /tafel der persönliche Code – die Morgentafel-App unter /morgen bleibt beim Tafel-Code.
$gast = (empty($_SESSION["leuchtturm_eingeloggt"]) && is_string($_COOKIE["lt_tafel_gast"] ?? null)) ? lt_gastPerCode($_COOKIE["lt_tafel_gast"]) : null;
if ($gast && !lt_gastHatTafelbild($gast)) $gast = null;
if ($gast) { $_SESSION["leuchtturm_gast"] = $gast["id"]; $keks("lt_tafel_gast", $_COOKIE["lt_tafel_gast"], 400); }
elseif (!empty($_COOKIE["lt_tafel_gast"])) { $keks("lt_tafel_gast", "", -1); unset($_SESSION["leuchtturm_gast"]); }
if ($gast) $tafel = null;
if ($gast && $b && !lt_gastDarfBaustein($gast, $b)) $b = "";
$liste = $gast ? array_filter(LT_BAUSTEINE, fn($k) => lt_gastDarfBaustein($gast, $k), ARRAY_FILTER_USE_KEY) : LT_BAUSTEINE;
$frei = $tafel || $gast || !empty($_SESSION["leuchtturm_eingeloggt"]);
$h = fn($s) => htmlspecialchars((string)$s, ENT_QUOTES);

if (!$frei || !$b) { ?>
<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="manifest" href="manifest.php"><meta name="theme-color" content="#16324a"><link rel="icon" type="image/png" href="icons/start-192.png">
<title>Tafelbilder</title>
<style>body{margin:0;min-height:100vh;background:linear-gradient(160deg,#fff8e8,#eef6fb);font-family:"Nunito",system-ui,sans-serif;color:#16324a;display:flex;justify-content:center}
.box{background:#fff;border-radius:24px;box-shadow:0 10px 30px rgba(22,50,74,.12);padding:28px 32px;max-width:860px;width:100%;margin:28px 16px;box-sizing:border-box}h1{margin:0 0 10px;font-size:30px}p,li{font-size:17px;line-height:1.5}.rot{color:#a3261c;font-weight:800}
.liste{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;margin-top:14px}
.liste a{display:flex;gap:14px;align-items:center;text-decoration:none;color:#16324a;background:#f6f8fa;border-radius:16px;padding:12px;border:2px solid transparent}
.liste a:hover{border-color:#cfe2ef;background:#fff}.liste img{width:56px;height:56px;border-radius:14px;flex:none}.liste b{display:block;font-size:17px}.liste small{color:#6f7d86;font-weight:600}
input{font:800 32px/1 monospace;letter-spacing:.12em;text-transform:uppercase;width:100%;box-sizing:border-box;padding:14px 16px;border:3px solid #c9d6e3;border-radius:16px;text-align:center}
button{margin-top:14px;width:100%;font:900 20px system-ui,sans-serif;padding:14px;border:0;border-radius:16px;background:#16324a;color:#fff;cursor:pointer}</style></head>
<body><div class="box">
<?php if (!$frei): ?>
<h1>📺 Tafel freischalten</h1>
<p>Tafel-Code oder deinen persönlichen Zugangscode eingeben<?= $b ? " – danach öffnet sich <b>" . $h(LT_BAUSTEINE[$b][0]) . "</b>" : "" ?>:</p>
<form method="post" action="<?= $h($zurueck) ?>"><input name="code" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="z. B. KR7M-4XPT" maxlength="12" autofocus><button>Tafel freischalten</button></form>
<?php if ($fehler): ?><p class="rot"><?= $h($fehler) ?></p><?php endif; ?>
<p style="font-size:15px;color:#5b6f84">Kolleginnen: Hier funktioniert derselbe Code wie für den Leuchtturm-Zugang – auf jeder Tafel. Du siehst dann die Tafelbilder, die für dich freigegeben sind.</p>
<?php else: ?>
<h1>📺 Tafelbilder für diese Tafel</h1>
<?php if ($gast): ?><p style="background:#eef6fb;border-radius:14px;padding:10px 14px">👋 Angemeldet<?= ($gast["name"] ?? "") !== "" ? " als <b>" . $h($gast["name"]) . "</b>" : "" ?> – das sind deine freigegebenen Tafelbilder. <a href="./?abmelden=1" style="color:#a3261c;font-weight:800">Von dieser Tafel abmelden</a></p><?php endif; ?>
<p>Tippe ein Tafelbild an. Es öffnet sich – dann <b>„📲 Installieren“</b> (unten links) antippen. So bekommt jedes Tafelbild sein <b>eigenes Symbol</b> auf der Tafel. Für jedes gewünschte Tafelbild einmal wiederholen.</p>
<div class="liste"><?php foreach ($liste as $k => $x): ?><a href="./?b=<?= $h($k) ?>"><img src="icons/<?= $h($k) ?>-192.png" alt=""><span><b><?= $h($x[0]) ?></b><small><?= $h($x[1]) ?></small></span></a><?php endforeach; ?></div>
<?php endif; ?>
</div></body></html>
<?php exit; }

// Freigeschaltet: nur dieses Tafelbild aus tafelbilder.php
define("LT_TAFEL_APP", $tafel ? ($tafel["klasse"] ?? "") : "");
if ($gast) define("LT_TAFEL_GAST", $gast["id"]);
define("LT_TAFEL_BAUSTEIN", $b);
chdir(__DIR__ . "/..");
require __DIR__ . "/../tafelbilder.php";
