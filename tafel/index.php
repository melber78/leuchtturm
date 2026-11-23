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
if (!isset(LT_BAUSTEINE[$b])) $b = "";
$zurueck = "./" . ($b ? "?b=" . $b : "");
$fehler = "";
$eingabe = $_POST["code"] ?? ($_GET["c"] ?? null);
if ($eingabe !== null) {
    if (lt_tafelVersuche() >= 8) $fehler = "Zu viele falsche Versuche. Bitte in 15 Minuten noch einmal.";
    else {
        $t = lt_tafelZugang((string)$eingabe);
        if ($t) {
            setcookie("lt_tafel", lt_tafelNorm((string)$eingabe), ["expires" => time() + 400 * 86400, "path" => $pfad, "secure" => !empty($_SERVER["HTTPS"]), "httponly" => true, "samesite" => "Lax"]);
            header("Location: " . $zurueck); exit;
        }
        lt_tafelVersuche(true);
        $fehler = "Dieser Code stimmt nicht – oder die Tafel wurde gesperrt.";
    }
}
$tafel = lt_tafelZugang();
if ($tafel) setcookie("lt_tafel", $_COOKIE["lt_tafel"], ["expires" => time() + 400 * 86400, "path" => $pfad, "secure" => !empty($_SERVER["HTTPS"]), "httponly" => true, "samesite" => "Lax"]);
$frei = $tafel || !empty($_SESSION["leuchtturm_eingeloggt"]);
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
<p>Tafel-Code eingeben<?= $b ? " – danach öffnet sich <b>" . $h(LT_BAUSTEINE[$b][0]) . "</b>" : "" ?>:</p>
<form method="post" action="<?= $h($zurueck) ?>"><input name="code" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="z. B. KR7M-4XPT" maxlength="12" autofocus><button>Tafel freischalten</button></form>
<?php if ($fehler): ?><p class="rot"><?= $h($fehler) ?></p><?php endif; ?>
<p style="font-size:15px;color:#5b6f84">Den Code bekommst du im Leuchtturm: Tafelbilder → „📺 Auf Tafeln installieren“.</p>
<?php else: ?>
<h1>📺 Tafelbilder für diese Tafel</h1>
<p>Tippe ein Tafelbild an. Es öffnet sich – dann <b>„📲 Installieren“</b> (unten links) antippen. So bekommt jedes Tafelbild sein <b>eigenes Symbol</b> auf der Tafel. Für jedes gewünschte Tafelbild einmal wiederholen.</p>
<div class="liste"><?php foreach (LT_BAUSTEINE as $k => $x): ?><a href="./?b=<?= $h($k) ?>"><img src="icons/<?= $h($k) ?>-192.png" alt=""><span><b><?= $h($x[0]) ?></b><small><?= $h($x[1]) ?></small></span></a><?php endforeach; ?></div>
<?php endif; ?>
</div></body></html>
<?php exit; }

// Freigeschaltet: nur dieses Tafelbild aus tafelbilder.php
define("LT_TAFEL_APP", $tafel ? ($tafel["klasse"] ?? "") : "");
define("LT_TAFEL_BAUSTEIN", $b);
chdir(__DIR__ . "/..");
require __DIR__ . "/../tafelbilder.php";
