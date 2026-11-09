<?php
/* ============================================================
   Leuchtturm – Anmeldung für Gäste (Kolleginnen, die testen)
   Link: gast.php?code=XXXX-XXXX  oder Code ins Feld eingeben.
   Gäste sehen nur die freigegebenen Bereiche mit eigenen Daten.
   ============================================================ */
require_once __DIR__ . "/gast-zugang-pruefen.php";
function h($s){ return htmlspecialchars((string)$s, ENT_QUOTES, "UTF-8"); }

if (isset($_GET["abmelden"])) { unset($_SESSION["leuchtturm_gast"]); header("Location: gast.php?tschuess=1"); exit; }

$meldung = "";
$code = trim((string)($_POST["code"] ?? $_GET["code"] ?? ""));
if ($code !== "") {
    $_SESSION["gast_versuche"] = ($_SESSION["gast_versuche"] ?? 0) + 1;
    if ($_SESSION["gast_versuche"] > 8) { sleep(2); $meldung = "Zu viele Versuche. Bitte später noch einmal versuchen."; }
    else {
        $liste = lt_gaesteLesen(); $treffer = null;
        foreach ($liste as $i => $g) if (hash_equals($g["codeHash"] ?? "", lt_codeHash($code))) $treffer = $i;
        if ($treffer === null) { sleep(1); $meldung = "Dieser Code passt nicht. Bitte genau so eingeben, wie du ihn bekommen hast."; }
        else {
            $g = $liste[$treffer];
            if (!empty($g["gesperrt"])) $meldung = "Dieser Zugang ist nicht mehr aktiv.";
            elseif (!empty($g["bis"]) && strtotime($g["bis"] . " 23:59:59") < time()) $meldung = "Dieser Zugang ist abgelaufen.";
            else {
                session_regenerate_id(true);
                $_SESSION["leuchtturm_gast"] = $g["id"]; $_SESSION["gast_versuche"] = 0;
                $liste[$treffer]["zuletzt"] = date("Y-m-d H:i");
                lt_gaesteSchreiben($liste);
                header("Location: gast.php"); exit;
            }
        }
    }
}
$gast = empty($_SESSION["leuchtturm_eingeloggt"]) ? lt_gast() : null;
$INFO = [
    "sozial"      => ["sozial-stunden.php", "fa-people-group", "Sozialtraining-Stunden", "Fertige Stunden, Jahresplan, Präsentation &amp; Material – Kl. 1/2 und 3/4"],
    "lernangebot" => ["sozial-stunden.php?bereich=lernangebot", "fa-seedling", "Lernangebot", "40-Minuten-Stunden Deutsch, Mathe &amp; Lernen lernen – Planer, Tafel &amp; Arbeitsblätter"],
    "vertretung"  => ["sozial-stunden.php?bereich=vertretung", "fa-shuffle", "Vertretungsstunden", "Fertige Stunden für Kl. 1–4 mit Zufallsauswahl"],
    "morgen"      => ["tafelbilder.php#morgen", "fa-sun", "Guten Morgen!", "Tagesstart an der Tafel: Datum, Wetter, Stundenplan, Auspacken, Hinweise"],
    "buchstabenkurs" => ["tafelbilder.php#buchstabenkurs", "fa-pen-fancy", "Buchstabenkurs", "Buchstaben in der Lineatur nachspuren und schreiben – an der digitalen Tafel"],
    "lrs"         => ["lrs.php", "fa-wand-magic-sparkles", "Material-Generator", "Arbeitsblätter nach AFS – Aufmerksamkeit, Funktion, Lesen, Rechtschreiben"],
    "akten"       => ["trainingshefte.php", "fa-user-graduate", "Kinder-Akten", "Förderplan, Förderpaket, Trainingsheft, Lernbox &amp; Stunden (nur Kürzel)"],
    "gutachten"   => ["gutachten.php", "fa-file-signature", "Gutachten", "Förderdiagnostik-Gutachten erstellen (wird nicht gespeichert)"],
    "materialien" => ["materialien.php", "fa-folder-open", "Materialien", "Eigene Blätter hochladen &amp; einordnen"],
    "timer"       => ["lrs-timer.php", "fa-stopwatch", "Stunden-Timer", "Phasen der LRS-Stunde mit Zeit im Blick"],
    "stundenplan" => ["stundenplan.php", "fa-calendar-days", "Stundenplan", "Stundenplan für die LRS-Kinder"],
];
?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Leuchtturm · Gast-Zugang</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<style>
:root{ --nacht:#16324a; --meer:#3d7ea6; --gold:#f2a93b; --schaum:#f4f6f4; --text:#1f2d36; --schatten:0 6px 24px rgba(22,50,74,.1); }
*{ box-sizing:border-box; }
body{ margin:0; background:var(--schaum); color:var(--text); font-family:"Nunito",sans-serif; }
.portal{ width:min(860px,94%); margin:44px auto; }
.kopf{ text-align:center; margin-bottom:28px; }
.icon{ width:70px; height:70px; border-radius:20px; background:linear-gradient(135deg,var(--nacht),var(--meer)); display:flex; align-items:center; justify-content:center; color:white; font-size:30px; margin:0 auto 14px; box-shadow:var(--schatten); }
h1{ font-size:30px; font-weight:900; margin:0 0 6px; }
.kopf p{ color:#7c8a85; font-weight:700; margin:0; }
.karte{ background:white; border-radius:22px; box-shadow:var(--schatten); padding:28px; max-width:440px; margin:0 auto; }
label{ font-weight:800; font-size:14px; color:#4a5866; display:block; margin-bottom:8px; }
input{ width:100%; font:800 24px "Nunito",sans-serif; letter-spacing:.12em; text-transform:uppercase; text-align:center; padding:12px; border:2px solid #d6dde3; border-radius:14px; }
input:focus{ outline:none; border-color:var(--meer); }
button{ margin-top:14px; width:100%; font:900 17px "Nunito",sans-serif; background:var(--nacht); color:white; border:0; border-radius:14px; padding:13px; cursor:pointer; }
.meldung{ background:#fdecea; color:#a3261c; border-radius:12px; padding:10px 14px; font-weight:800; margin-bottom:14px; }
.ok{ background:#e8f5ec; color:#22693a; }
.grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:20px; }
.grid a{ background:white; border-radius:22px; box-shadow:var(--schatten); padding:28px 22px; text-align:center; text-decoration:none; color:var(--text); transition:.2s; }
.grid a:hover{ transform:translateY(-4px); }
.grid i{ font-size:36px; color:var(--meer); margin-bottom:12px; }
.grid h2{ font-size:19px; font-weight:900; margin:0 0 6px; }
.grid p{ font-size:14px; color:#7c8a85; margin:0; }
.hinweis{ background:#fff7e6; border-radius:16px; padding:14px 18px; font-weight:700; color:#6b4a12; margin:0 0 24px; line-height:1.5; }
.fuss{ text-align:center; margin-top:28px; font-weight:800; }
.fuss a{ color:var(--meer); }
</style>
</head>
<body>
<div class="portal">
<?php if ($gast): ?>
    <div class="kopf"><div class="icon"><i class="fa-solid fa-tower-observation"></i></div>
        <h1>Willkommen<?= !empty($gast["name"]) ? ", " . h($gast["name"]) : "" ?>!</h1>
        <p>Leuchtturm · Gast-Zugang<?= !empty($gast["bis"]) ? " · gültig bis " . date("d.m.Y", strtotime($gast["bis"])) : "" ?></p></div>
    <div class="hinweis"><i class="fa-solid fa-circle-info"></i> Probier alles in Ruhe aus: Stunden ansehen, präsentieren, drucken, eigene Stunden anlegen, Jahresplan füllen. Was du speicherst, gehört nur zu deinem Zugang – du kannst nichts kaputt machen.</div>
    <div class="grid">
    <?php foreach (array_keys($INFO) as $b): if (!lt_gastDarf($gast, $b)) continue; [$url, $icon, $titel, $text] = $INFO[$b]; ?>
        <a href="<?= h($url) ?>"><i class="fa-solid <?= $icon ?>"></i><h2><?= h($titel) ?></h2><p><?= $text ?></p></a>
    <?php endforeach; ?>
    </div>
    <div class="fuss"><a href="gast.php?abmelden=1"><i class="fa-solid fa-right-from-bracket"></i> Abmelden</a></div>
<?php else: ?>
    <div class="kopf"><div class="icon"><i class="fa-solid fa-tower-observation"></i></div><h1>Leuchtturm</h1><p>Gast-Zugang</p></div>
    <form class="karte" method="post" action="gast.php">
        <?php if ($meldung): ?><div class="meldung"><?= h($meldung) ?></div><?php endif; ?>
        <?php if (isset($_GET["abgelaufen"])): ?><div class="meldung">Dein Gast-Zugang ist abgelaufen oder wurde beendet.</div><?php endif; ?>
        <?php if (isset($_GET["tschuess"])): ?><div class="meldung ok">Du bist abgemeldet. Bis bald!</div><?php endif; ?>
        <label for="code">Zugangscode</label>
        <input id="code" name="code" autocomplete="off" autocapitalize="characters" placeholder="XXXX-XXXX" maxlength="12" required autofocus>
        <button type="submit"><i class="fa-solid fa-right-to-bracket"></i> Anmelden</button>
    </form>
<?php endif; ?>
</div>
</body>
</html>
