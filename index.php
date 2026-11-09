<?php require __DIR__ . "/auth.php"; ?>
<!DOCTYPE html>
<html lang="de">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Leuchtturm</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

<style>

:root{
    --nacht:#16324a;
    --meer:#3d7ea6;
    --gold:#f2a93b;
    --schaum:#f4f6f4;
    --text:#1f2d36;
    --schatten:0 6px 24px rgba(22,50,74,.1);
}

*{ box-sizing:border-box; }

body{
    margin:0; background:var(--schaum); color:var(--text);
    font-family:"Nunito",sans-serif;
}

.portal{ width:min(900px,95%); margin:50px auto; }

.portal-header{ text-align:center; margin-bottom:36px; }
.portal-icon{
    width:70px; height:70px; border-radius:20px;
    background:linear-gradient(135deg, var(--nacht), var(--meer));
    display:flex; align-items:center; justify-content:center;
    color:white; font-size:30px; margin:0 auto 14px;
    box-shadow:var(--schatten);
}
.portal-header h1{ font-size:32px; font-weight:900; margin:0 0 6px; }
.portal-header p{ color:#7c8a85; font-weight:700; margin:0; }

.portal-grid{
    display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:30px;
}
@media (max-width:650px){ .portal-grid{ grid-template-columns:1fr; } }

.portal-card{
    background:white; border-radius:24px; box-shadow:var(--schatten);
    padding:32px 26px; text-align:center; text-decoration:none; color:var(--text);
    transition:.2s;
}
.portal-card:hover{ transform:translateY(-4px); }
.portal-card i{ font-size:38px; margin-bottom:14px; color:var(--meer); }
.portal-card h2{ font-size:20px; font-weight:900; margin:0 0 6px; }
.portal-card p{ font-size:14px; color:#7c8a85; margin:0; }

.portal-footer{ text-align:center; }
.portal-footer a{
    color:#a0a0a0; font-weight:700; font-size:13px; text-decoration:none;
}

.gruppe{ font-size:15px; font-weight:900; text-transform:uppercase; letter-spacing:.06em; color:#7c8a85; margin:28px 0 12px; display:flex; gap:8px; align-items:center; }
.gruppe i{ color:var(--meer); }
.portal-grid{ grid-template-columns:repeat(4, 1fr) !important; gap:16px !important; margin-bottom:8px !important; }
@media (max-width:860px){ .portal-grid{ grid-template-columns:1fr 1fr !important; } }
@media (max-width:520px){ .portal-grid{ grid-template-columns:1fr !important; } }
.portal-card{ padding:22px 16px !important; }
.portal-card i{ font-size:30px !important; margin-bottom:10px !important; }
.portal-card h2{ font-size:17px !important; }
.portal-card p{ font-size:13px !important; }
.portal-card.haupt{ background:linear-gradient(135deg, #eef6fb, #fff); outline:2px solid #cfe2ef; }
.neu{ background:#fff8e6; border:2px solid #f6dfa6; border-radius:20px; padding:14px 16px; margin-bottom:10px; }
.neu-kopf{ display:flex; justify-content:space-between; align-items:center; font-weight:900; color:#8a5a00; margin-bottom:8px; }
.neu-kopf button{ border:none; background:none; font-size:18px; color:#8a5a00; cursor:pointer; }
.neu-eintrag{ display:flex; gap:12px; align-items:center; text-decoration:none; color:var(--text); background:#fff; border-radius:12px; padding:10px 14px; margin-top:6px; }
.neu-eintrag b{ flex:none; width:230px; }
.neu-eintrag span{ flex:1; font-size:13px; color:#55636b; }
.neu-eintrag i{ color:var(--gold); }
@media (max-width:650px){ .neu-eintrag{ flex-wrap:wrap; } .neu-eintrag b{ width:100%; } }
</style>
</head>
<body>

<div class="portal">

<header class="portal-header">
<div class="portal-icon"><i class="fa-solid fa-tower-observation"></i></div>
<h1>Leuchtturm</h1>
<p>Orientierung &amp; Material für LRS-Förderung, Sozialtraining, Lernangebot und Vertretung</p>
</header>

<?php
// Neu im Leuchtturm: wird nach Updates kurz oben angezeigt (Einträge der letzten 3 Wochen)
$NEU = [
    ["2026-11-09", "Gast-Zugänge für Kolleginnen", "Kolleginnen testen Sozialtraining, Lernangebot und Vertretung mit eigenem Code – getrennt von deinen Daten.", "zugaenge.php"],
    ["2026-11-08", "Leise-Meer im Sozialtraining", "In jeder Präsentation unten: 🌊 Leise-Meer – je leiser, desto mehr Meerestiere tauchen am Leuchtturm auf.", "sozial-stunden.php"],
    ["2026-11-08", "Leise-Wald", "Neue Tafel-Übung: Je leiser die Klasse, desto mehr Tiere kommen aus dem Wald (Mikrofon, es wird nichts aufgenommen).", "sozial-stunden.php?bereich=lernangebot#tafel"],
    ["2026-11-08", "Lernzeit mit Eule Ella", "Lernangebot: eigene Tafel-Welt (grüne Kreidetafel, Lernpfad, Sternenglas) und 8 neue Stunden „Lernen lernen“.", "sozial-stunden.php?bereich=lernangebot"],
    ["2026-11-08", "Lernangebot Grundschule", "Fertige 40-Minuten-Stunden Deutsch, Mathe &amp; Lernen lernen, Methodenpool mit Stundenplaner, Tafel-Übungen und Arbeitsblatt-Generator.", "sozial-stunden.php?bereich=lernangebot"],
    ["2026-11-02", "Lesetraining von Buchstaben bis Text", "In der Kinder-Akte unter <b>Förderplan</b>: Lesestufen 1–5 und bekannte Buchstaben wählen – das Förderpaket nimmt sie mit.", "trainingshefte.php"],
    ["2026-11-02", "Vertretungsstunden", "22 fertige 40-Minuten-Stunden für Kl. 1–4 mit Zufallsauswahl und Arbeitsblättern.", "sozial-stunden.php?bereich=vertretung"],
    ["2026-10-30", "Sozialtraining: Präsentation & Material", "Tafel-Präsentation, PowerPoint, Filme und Gefühlskarten zu jeder Stunde.", "sozial-stunden.php"],
];
$neuAktuell = array_values(array_filter($NEU, fn($n) => strtotime($n[0]) >= strtotime("-21 days")));
?>
<?php if ($neuAktuell): ?>
<section class="neu" id="neu" data-stand="<?= htmlspecialchars($neuAktuell[0][0]) ?>" hidden>
    <div class="neu-kopf"><span><i class="fa-solid fa-star"></i> Neu im Leuchtturm</span><button type="button" onclick="neuWeg()" title="Ausblenden"><i class="fa-solid fa-xmark"></i></button></div>
    <?php foreach ($neuAktuell as [$datum, $titel, $text, $link]): ?>
        <a class="neu-eintrag" href="<?= htmlspecialchars($link) ?>"><b><?= htmlspecialchars($titel) ?></b><span><?= $text ?></span><i class="fa-solid fa-arrow-right"></i></a>
    <?php endforeach; ?>
</section>
<?php endif; ?>

<h2 class="gruppe"><i class="fa-solid fa-pen-nib"></i> LRS-Förderung</h2>
<section class="portal-grid">

<a href="trainingshefte.php" class="portal-card haupt">
<i class="fa-solid fa-user-graduate"></i>
<h2>Kinder-Akten</h2>
<p>Pro Kind (nur Kürzel): Förderplan mit Lesetraining, Förderpaket, Trainingsheft, Lernbox &amp; Stunden</p>
</a>

<a href="lrs.php" class="portal-card">
<i class="fa-solid fa-wand-magic-sparkles"></i>
<h2>Material-Generator</h2>
<p>Arbeitsblätter nach AFS – Aufmerksamkeit, Funktion, Lesen, Rechtschreiben</p>
</a>

<a href="gutachten.php" class="portal-card">
<i class="fa-solid fa-file-signature"></i>
<h2>Gutachten</h2>
<p>Förderdiagnostik-Gutachten erstellen (lokal, nicht gespeichert)</p>
</a>

<a href="materialien.php" class="portal-card">
<i class="fa-solid fa-folder-open"></i>
<h2>Materialien</h2>
<p>Gespeicherte und eigene Blätter hochladen &amp; einordnen</p>
</a>

</section>

<h2 class="gruppe"><i class="fa-solid fa-people-group"></i> Grundschule: Sozialtraining, Lernangebot &amp; Vertretung</h2>
<section class="portal-grid">

<a href="sozial-stunden.php" class="portal-card haupt">
<i class="fa-solid fa-calendar-week"></i>
<h2>Sozialtraining-Stunden</h2>
<p>36 fertige Stunden, Jahresplan, Präsentation &amp; Material – Kl. 1/2 und 3/4</p>
</a>

<a href="sozial-stunden.php?bereich=lernangebot" class="portal-card haupt">
<i class="fa-solid fa-seedling"></i>
<h2>Lernangebot</h2>
<p>40-Minuten-Stunden Deutsch, Mathe &amp; Lernen lernen – Planer, Tafel &amp; Arbeitsblätter</p>
</a>

<a href="sozial-stunden.php?bereich=vertretung" class="portal-card">
<i class="fa-solid fa-shuffle"></i>
<h2>Vertretungsstunden</h2>
<p>Fertige 40-Minuten-Stunden für Kl. 1–4 mit Zufallsauswahl</p>
</a>

<a href="sozialtraining.php" class="portal-card">
<i class="fa-solid fa-lightbulb"></i>
<h2>Sozialtraining-Generator</h2>
<p>Methodenpool &amp; Vorlagen</p>
</a>

</section>

<div class="portal-footer">
<a href="update.php"><i class="fa-solid fa-cloud-arrow-down"></i> Updates</a> &nbsp;·&nbsp; <a href="zugaenge.php"><i class="fa-solid fa-user-clock"></i> Gast-Zugänge</a> &nbsp;·&nbsp; <a href="logout.php"><i class="fa-solid fa-right-from-bracket"></i> Abmelden</a>
</div>

</div>

<script>
// „Neu“-Kasten: bleibt weg, bis es wieder etwas Neues gibt
(function(){
    const box = document.getElementById("neu");
    if (!box) return;
    let weg = "";
    try { weg = localStorage.getItem("lt-neu-weg") || ""; } catch (e) {}
    if (weg !== box.dataset.stand) box.hidden = false;
})();
function neuWeg(){
    const box = document.getElementById("neu");
    try { localStorage.setItem("lt-neu-weg", box.dataset.stand); } catch (e) {}
    box.hidden = true;
}
</script>

</body>
</html>
