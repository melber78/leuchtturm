<?php require_once __DIR__ . "/gast-zugang-pruefen.php"; if (empty($_SESSION["leuchtturm_eingeloggt"]) && lt_gast()) { header("Location: gast.php"); exit; } require __DIR__ . "/auth.php"; ?>
<!DOCTYPE html>
<html lang="de">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- App (Home-Bildschirm) -->
<link rel="manifest" href="manifest.php">
<meta name="theme-color" content="#2f4a1f">
<link rel="apple-touch-icon" href="app-icon-192.png">
<link rel="icon" type="image/png" href="app-icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Leuchtturm">
<script>if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(function(){});</script>


<title>Leuchtturm</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

<style>

:root{
    --nacht:#2f4a1f;
    --meer:#557428;
    --gold:#d9a23f;
    --schaum:#f7f4ec;
    --text:#1f2d36;
    --schatten:0 6px 24px rgba(47,74,31,.1);
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
.portal-logo{ margin:0 0 10px !important; line-height:0; }
.portal-logo img{ width:min(300px, 70vw); height:auto; }
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
.portal-card.haupt{ background:linear-gradient(135deg, #f3f7ec, #fff); outline:2px solid #dbe6cc; }
.heute-karte{ display:flex; align-items:center; gap:16px; text-decoration:none; color:white; background:linear-gradient(135deg, var(--nacht), var(--meer)); border-radius:22px; padding:18px 22px; box-shadow:var(--schatten); margin:18px 0 6px; transition:.2s; }
.heute-karte:hover{ transform:translateY(-3px); }
.heute-karte > i:first-child{ font-size:30px; color:var(--gold); }
.heute-karte span{ flex:1; }
.heute-karte b{ display:block; font-size:19px; font-weight:900; }
.heute-karte small{ display:block; font-size:13px; opacity:.85; font-weight:700; }
.neu{ background:#fff8e6; border:2px solid #f6dfa6; border-radius:20px; padding:14px 16px; margin-bottom:10px; }
.neu-kopf{ display:flex; justify-content:space-between; align-items:center; font-weight:900; color:#8a5a00; margin-bottom:8px; }
.neu-kopf button{ border:none; background:none; font-size:18px; color:#8a5a00; cursor:pointer; }
.neu-eintrag{ display:flex; gap:12px; align-items:center; text-decoration:none; color:var(--text); background:#fff; border-radius:12px; padding:10px 14px; margin-top:6px; }
.neu-eintrag b{ flex:none; width:230px; }
.neu-eintrag span{ flex:1; font-size:13px; color:#55636b; }
.neu-eintrag i{ color:var(--gold); }
@media (max-width:650px){ .neu-eintrag{ flex-wrap:wrap; } .neu-eintrag b{ width:100%; } }

/* Neue Startseite */
.portal{ margin:28px auto 50px !important; }
.portal-header{ margin-bottom:16px !important; }
.portal-header h1{ font-size:28px !important; }
.portal-icon{ width:56px !important; height:56px !important; font-size:24px !important; border-radius:16px !important; }
.suche{ display:flex; align-items:center; gap:10px; background:white; border-radius:16px; box-shadow:var(--schatten); padding:4px 14px; margin:12px 0; }
.suche i{ color:var(--meer); }
.suche input{ flex:1; border:0; outline:0; font:700 16px "Nunito",sans-serif; padding:10px 0; background:none; color:var(--text); min-width:0; }
.suche button{ border:0; background:none; color:#9aa5ad; font-size:18px; cursor:pointer; }
.such-leer{ text-align:center; color:#7c8a85; font-weight:800; }
.neu .neu-eintrag.mehr{ display:none; } .neu.alle .neu-eintrag.mehr{ display:flex; }
.neu-mehr{ border:0; background:none; color:#8a5a00; font:800 14px "Nunito",sans-serif; cursor:pointer; padding:8px 4px 0; }
details.bereich{ background:white; border-radius:20px; box-shadow:var(--schatten); margin:14px 0; overflow:hidden; }
details.bereich > summary{ list-style:none; cursor:pointer; display:flex; align-items:center; gap:10px; padding:16px 20px; font:900 18px "Nunito",sans-serif; color:var(--nacht); }
details.bereich > summary::-webkit-details-marker{ display:none; }
details.bereich > summary > i:first-child{ color:var(--meer); width:24px; text-align:center; }
details.bereich .zahl{ font-size:12px; font-weight:800; color:#7c8a85; background:#eef2f5; border-radius:999px; padding:2px 9px; }
details.bereich .pfeil{ margin-left:auto; color:#9aa5ad; transition:.2s; }
details.bereich[open] .pfeil{ transform:rotate(180deg); }
.untergruppe{ padding:0 20px 14px; }
.untergruppe h3{ margin:4px 0 8px; font:900 12px "Nunito",sans-serif; text-transform:uppercase; letter-spacing:.08em; color:#8a9aa5; }
.kacheln{ display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:10px; }
.kachel{ display:flex; align-items:center; gap:12px; text-decoration:none; color:var(--text); background:#f6f8fa; border-radius:14px; padding:12px 14px; border:2px solid transparent; transition:.15s; min-width:0; }
.kachel:hover{ border-color:#dbe6cc; background:#fff; transform:translateY(-2px); }
.kachel > i{ font-size:22px; color:var(--meer); width:30px; text-align:center; flex:none; }
.kachel span{ display:flex; flex-direction:column; min-width:0; }
.kachel b{ font-size:15px; font-weight:900; color:var(--nacht); }
.kachel small{ font-size:12.5px; color:#6f7d86; font-weight:600; line-height:1.3; }
.kachel.haupt{ background:linear-gradient(135deg,#f3f7ec,#fff); border-color:#d5e6f1; }
.kachel.versteckt, .untergruppe.versteckt, details.bereich.versteckt{ display:none; }
@media (max-width:520px){ .kacheln{ grid-template-columns:1fr 1fr; gap:8px; } .kachel{ flex-direction:column; align-items:flex-start; gap:6px; padding:10px 12px; } .kachel small{ display:none; } .kachel b{ font-size:14px; line-height:1.2; } .neu-eintrag span{ display:none; } .neu-eintrag{ padding:8px 12px; } .portal-header p{ display:none; } details.bereich > summary{ padding:14px 16px; font-size:17px; } .untergruppe{ padding:0 14px 12px; } }
</style>
<link rel="stylesheet" href="marke/mewe.css">
</head>
<body>

<div class="portal">

<header class="portal-header">
<h1 class="portal-logo"><img src="marke/mewe-leuchtturm.svg" alt="MeWe Leuchtturm" width="1253" height="789"></h1>
<p>Orientierung &amp; Material für LRS-Förderung, Sozialtraining, Lernangebot und Vertretung</p>
</header>

<?php
// Neu im Leuchtturm: wird nach Updates kurz oben angezeigt (Einträge der letzten 3 Wochen)
$NEU = [
    ["2026-11-27", "Stunden-Abschluss & nächste Stunde per Knopfdruck", "In der Kinder-Akte jede Stunde Blatt für Blatt abschließen: ✓ klappt · ◐ teilweise · ✗ noch nicht · ⏸ nicht geschafft, Fehlerwörter direkt in die Lernbox, „weiter mit …“. Daraus stellt der Leuchtturm die nächste Stunde zusammen – auch die Spontanstunde knüpft daran an.", "trainingshefte.php"],
    ["2026-11-27", "Lernspiele neu gedacht", "Geübt wird jetzt immer mit Strategie: Wort hören, Schwingen/Verlängern/Ableiten, Lücke füllen – bei Fehlern erst ein Tipp, dann noch ein Versuch. Nie ein falsches Wortbild. Weltenreise = Lehrgang (eine Strategie pro Welt, Lesepfad für Buchstabenkinder). Action-Spiele sind jetzt Belohnung und kosten ⚡ Energie, die man beim Üben sammelt.", "lrs-spiele.php"],
    ["2026-11-27", "Schreiben & Vorlagen", "Empfehlung zum Nachteilsausgleich zum Ankreuzen, Einladung zum Gespräch, Rückmeldung an die Eltern, Übungstipps für zu Hause (passend zu den Schwerpunkten, ohne Technik) und Elterninfo zum Start – druckfertig im MeWe-Design.", "lrs-schreiben.php"],
    ["2026-11-27", "Weltenreise", "Abenteuerspiel in den Lernspielen: 8 Welten von Zauberwald bis Wolkenschloss – mit Geschichte, Begleitfigur, Abenteuern (Springen, Suchen, Bauen) und einem Wächter-Kampf. Sterne, Schätze und Münzen; geübt wird der Schwerpunkt des Kindes.", "lrs-spiele.php"],
    ["2026-11-27", "Lernstand & Förderbericht", "Neuer Reiter in der Kinder-Akte: Lesetempo-Test (1 Minute), Mini-Diktat und Buchstabentest mit festen Listen, Verlauf als Grafik – und ein Förderbericht auf Knopfdruck für Konferenz und Elterngespräch.", "trainingshefte.php"],
    ["2026-11-27", "Eigenes Drucklayout „Wachsen“", "Mit deinem MeWe-Logo im Kopf: Grün, Salbei und Holz, Überschriften in Fraunces, am Rand wächst ein Stängel mit den Aufgaben als Blätter, Samenpunkte zeigen das Blatt der Reihe, unten sanfte Hügel.", "lrs.php"],
    ["2026-11-26", "Buchstabenkurs in der Stundenplanung", "Symptomtraining → „Buchstabenkurs“: Buchstabe für Buchstabe in Fibel-Reihenfolge mit Schreibweg (Startpunkt, Zahlen, Pfeile), Hören, Finden, Lesen nur mit bekannten Buchstaben und Buchstabenpass.", "lrs.php"],
    ["2026-11-26", "LRS-Blätter in Grundschrift", "Blätter für Klasse 1–4 (auch Lesetexte und Lernbox) jetzt in Grundschrift – ab Klasse 5 und auf deinen Planungsblättern bleibt alles wie gewohnt.", "lrs.php"],
    ["2026-11-26", "Handy-Widget „Mein Tag“", "Deine Stunden von heute als Widget auf dem Android-Startbildschirm – die laufende Stunde ist hervorgehoben. Einrichten unter Mein Tag → Mein Stundenplan → Handy-Widget.", "tagesplan.php#stundenplan"],
    ["2026-11-26", "Gemeinsame Stunde: nur ein Kind da", "In der Kinder-Akte bei der gemeinsamen Stunde „Nur 1 Kind da“: Das fehlende Kind bekommt seine Blätter an einem anderen Tag, das anwesende planst du direkt neu.", "trainingshefte.php"],
    ["2026-11-27", "LRS-Lernspiele", "Action-Spiele (Wort-Runner, Asteroiden-Jagd, Monster füttern) mit Münzen, Rekorden und Figuren zum Freischalten – plus 9 ruhige Spiele: Lückenwörter, Sortieren, Wort-Baumeister, Lese-Blitz, Silben-Puzzle, Anlaut, Memory. Passt sich dem Kind an – Klasse, bekannte Buchstaben, Förderplan-Schwerpunkte und Fehlerwörter.", "lrs-spiele.php"],
    ["2026-11-27", "Link für Kollegin", "In jeder Sozialtraining-, Lernangebot- und Vertretungsstunde: Link erstellen, und die Kollegin sieht genau diese Stunde – ohne Anmeldung.", "sozial-stunden.php"],
    ["2026-11-25", "Ruhige Arbeitszeit: Märchenwald & Winterlandschaft", "Zwei neue zauberhafte Szenen: ein Märchenschloss mit Glühwürmchen und leuchtenden Pilzen und eine verschneite Winterlandschaft mit Häuschen und leisem Schneefall.", "tafelbilder.php#ruhig"],
    ["2026-11-25", "Runterkommen & Bewegungspausen", "Runterkommen: Atem-Ballon/Atemkreis, Blume & Kerze, Box-Atmung, Glitzerglas, 5-4-3-2-1, Anspannen & Loslassen. Bewegungspause: eine Figur macht 13 Übungen am Platz vor – als Programm oder einzeln.", "tafelbilder.php#bewegung"],
    ["2026-11-25", "Lernspiel „Bootsfahrt zum Leuchtturm“", "Mathe & Deutsch für Kl. 1–4: Jede richtige Antwort bringt das Boot eine Boje weiter. An der Tafel Klasse gegen Ella oder allein am iPad mit Zahlenfeld und Vorlesen.", "tafelbilder.php#boot"],
    ["2026-11-25", "6 neue Tafelbilder für Mathe & Deutsch", "Schriftlich rechnen, Stellenwerttafel, Uhr & Zeit, Größen umrechnen, Prozent & Dezimalzahlen sowie Wortarten & Satzglieder – mit Bild, Merksatz und Schritten zum Aufdecken.", "tafelbilder.php"],
    ["2026-11-25", "Ruhige Arbeitszeit", "Für Arbeitsphasen, in denen geflüstert werden darf: Aquarium, Wolkenwiese (Kl. 1/2), Regen am Fenster, Lagerfeuer (Kl. 3/4), Stadt bei Regen, Meer, Polarlicht (Kl. 5–9) – mit leisem, erzeugtem Klang und Zeitleiste.", "tafelbilder.php#ruhig"],
    ["2026-11-25", "Leise-Wald: 7 neue Welten", "Ruhepause: Korallenriff, Winterwald, Nachthimmel, Raupe wird Schmetterling. Arbeitsphase: Weihnachtsbaum schmücken, Ballonfahrt, Burg bauen – unter Tafelbilder → Leise-Wald.", "tafelbilder.php#leise"],
    ["2026-11-25", "Tafelbild „Taschenlampen-Lesen“ (Kl. 1–4)", "Die Tafel ist dunkel – ein Kind führt mit dem Finger die Taschenlampe, im Lichtkegel tauchen Buchstaben, Silben, Wörter oder Sätze auf. Mit Silbenbögen, eigenen Wörtern, Advent-Wörtern und „Wort suchen“.", "tafelbilder.php#taschenlampe"],
    ["2026-11-25", "Holz & Metall – Werkstoff-Duell (Technik Kl. 5–7)", "Tafelbild passend zu den Arbeitsblättern: Quiz, Fe oder NE?, Werkzeug, Metallrohr, Holzarten, Baumstamm, Holz arbeitet, Holzwerkstoffe – Team A gegen Team B.", "tafelbilder.php#werkstatt"],
    ["24.11.2026", "Zusammenfassung für den Hefter – ausführlicher", "„Das habe ich heute gelernt“, „Meine Werkzeuge“ zum Abhaken, „Mein Satz“ und ein Wochenauftrag (Mo–Fr). Wird beim Arbeitsblatt automatisch mitgedruckt.", "sozial-stunden.php"],
    ["24.11.2026", "Jahresplan: ausgefallene Stunden verschieben", "Bei ✗ ausgefallen erscheint „⏭ verschieben“ – die Stunde rückt in die nächste Woche, alle folgenden eine Woche nach hinten.", "sozial-stunden.php#jahresplan"],
    ["2026-11-24", "Leise-Wald: Quatsch-Wald", "Neue Welt im Leise-Wald: knallbunter Quatsch-Wald mit 12 erfundenen Quatsch-Wesen (Brummi Toastflieger, Gurki Rollschuh, Kalle Kühlschrank …) und Quietsch-König Quaki als Belohnung.", "tafelbilder.php#leise"],
    ["2026-11-24", "Leise-Wald: Belohnungstier mit Spezialeffekt", "Wenn alle Tiere da sind, kommt zum Schluss ein Belohnungstier mit großem Auftritt: Löwe (Brüllen, Schallwellen), T-Rex (Erdbeben, Fußspuren), Papagei (Regenbogen-Federn), blauer Hai (Flut, Sprung), Elefant (Wasserfontäne), Delfin (drei Sprünge, Regenbogen) oder Megalodon (Tiefsee, riesiges Maul).", "tafelbilder.php#leise"],
    ["2026-11-23", "Das Einmaleins: alles in einer Tafel", "1×1-Tabelle, Verstehen, Kernaufgaben, Tricks, Geteilt, Aufgabenfamilie, Üben und großes 1 × 1 – jetzt eine Tafel mit Reitern.", "tafelbilder.php#1x1-tabelle"],
    ["2026-11-23", "Tafelbilder einzeln auf Tafeln installieren", "Tafelbilder → „📺 Auf Tafeln installieren“: Tafel-Code erstellen, auf der Tafel …/tafel öffnen – jedes Tafelbild bekommt dort sein eigenes Symbol, ohne Login.", "tafelbilder.php"],
    ["2026-11-23", "Einmaleins-Werkstatt", "Neue Tafelbilder zum 1 × 1: verstehen im Punktefeld, Kernaufgaben & Nachbarn, 14 Tricks (z. B. 9er-Finger-Trick), Geteilt mit Aufteilen/Verteilen und Rest, Aufgabenfamilie, Üben Klasse gegen Ella – und das echte große 1 × 1 (11–20). Die bisherige Tabelle heißt jetzt „Das kleine 1 × 1“.", "tafelbilder.php#1x1-verstehen"],
    ["2026-11-23", "Morgentafel als eigene App auf der Tafel", "Guten Morgen → Bearbeiten → Klasse → „📺 Auf der Tafel installieren“: Die Tafel bekommt nur die Morgentafel als App – ohne Login und ohne Zugriff auf den Rest des Leuchtturms.", "tafelbilder.php#morgen-sek"],
    ["2026-11-23", "Guten Morgen! für die Großen", "Eigene Tagesstart-Tafel für Kl. 5–9: sachlich, Stundenplan mit Uhrzeiten, A-/B-Woche, Termine (Tests, Abgaben) mit Countdown und jeden Tag ein Impuls – Wort des Tages, Denk-Nuss, Wusstest du?, Redewendung.", "tafelbilder.php#morgen-sek"],
    ["2026-11-23", "Tafelbild „Brüche“ für Klasse 5/6", "Erklär-Tafel mit Bild, Merksatz und Rechenweg zum Aufdecken: Was ist ein Bruch, gemischte Zahlen, Erweitern & Kürzen, Vergleichen, Zahlenstrahl, Plus/Minus, Mal/Geteilt – mit Zufallsbeispielen und eigener Aufgabe.", "tafelbilder.php#brueche"],
    ["2026-11-22", "Echte Konzentrationstests", "14 neue Aufmerksamkeits-Blätter in allen Stufen: Würfel-Test, Pauli-Test, Revisionstest, Kopfrechnen unter Belastung, Stroop, Stopp-Test, zwei Regeln gleichzeitig, Rückblick-Test, Zeichen-Suche, Korrektur lesen u. v. m. – ab Klasse 5 mit Takt und Auswertung, Zufallsmix nur noch mit echten Konzentrationstests.", "lrs.php"],
    ["2026-11-20", "Deutsch-Werkzeugkasten", "Alle Arbeitsblätter zu den Rechtschreibstrategien an einem Ort, sortiert nach Werkzeug: Mitsprechen, Schwingen, Kurz/lang, Verlängern, Ableiten, Groß/klein, Ersatzprobe, Merkwörter, Komma – ein Tipp und die Blätter sind da.", "lrs.php#werkzeug"],
    ["2026-11-20", "Rechtschreib-Werkstatt jetzt bis Klasse 8", "Neue Lehrgangs-Stufen 18–25 (Nominalisierung, ent-/end-, wieder/wider, seit/seid, Zeitangaben, Komma, Fremdwörter, höfliche Anrede) und Grundwortschatz Kl. 5/6 und 7/8 (häufige Fehlerwörter, Fremdwörter, Beruf, Argumentieren, -nis, -ung/-heit/-keit). Ab Klasse 5 automatisch sachlicher gestaltet.", "lrs.php"],
    ["2026-11-20", "Rechtschreib-Werkstatt ab Klasse 3", "Lehrgang in 17 Stufen (Mitsprechen, Silben, Nomen groß, Verlängern, Ableiten, doppelte Mitlaute, ck/tz, ie, Dehnungs-h, s/ss/ß … bis das/dass) und Grundwortschatz Kl. 3/4 in 18 Paketen – je 9 kindgerechte Blätter bis zur Lernkontrolle „Kann ich's?“. Im Generator unter Symptomtraining und in der Stundenplanung.", "lrs.php"],
    ["2026-11-19", "Mein Tag: LRS-Kinder ein- und ausblenden", "In der Woche (und unter „Mein Stundenplan“) tippst du ein Kürzel an, um das Kind aus deiner Tages- und Wochenplanung auszublenden – oder wieder einzublenden. Die Kinder-Akte bleibt unverändert.", "tagesplan.php#woche"],
    ["2026-11-19", "Wochenhausaufgabe für die Eltern", "Statt Elternblatt: sechs Übungen für den Familienalltag (Frühstück, Unterwegs, Einkaufen, Küche, Abend …) passend zu dem, was in der Stunde geübt wurde – mit Wochenraster Mo–So zum Ankreuzen und Rückmeldung. In der Stundenplanung unter „Dazu“ ankreuzen; bei 2 Kindern bekommt jedes sein eigenes Blatt.", "lrs.php"],
    ["2026-11-18", "Zusammenfassung für die Kinder", "Zu jeder Stunde (Sozialtraining, Vertretung, Lernangebot) gibt es jetzt „Das habe ich heute gelernt“ zum Drucken: Merksatz und die wichtigsten Punkte, bei Englisch mit Vokabeln – ein A4-Blatt pro Kind.", "sozial-stunden.php"],
    ["2026-11-17", "Vertretung Englisch (Kl. 3/4)", "10 fertige Englischstunden: My family, Colours, Numbers, Animals, My body, Clothes, Food, School things, Weather & days, Christmas – mit Aussprachehilfe, Wortkarten zum Anhören, What's this? und Right or wrong? an der Tafel, Spiel und Arbeitsblatt.", "sozial-stunden.php?bereich=vertretung"],
    ["2026-11-17", "Das kleine 1×1 als Tafelbild", "Interaktive 1×1-Tabelle: Feld antippen → Aufgabe groß mit Tauschaufgabe, Rechentrick und Punktefeld; Reihen leuchten auf; verdecken, Lücken, Kernaufgaben, Quadratzahlen – und Blitzrechnen Klasse gegen Ella.", "tafelbilder.php#einmaleins"],
    ["2026-11-17", "b/d-Training", "Neue Reihe im Funktionstraining (Optische Differenzierung): Bett-Trick, Suchbild, Zählen, Lückenwörter, richtiges Wort finden, Bach oder Dach?, Sätze, Blitzlesen, Diktat und Sortieren – von leicht bis Profi mit p/q-Verwechslern. In der Stundenplanung unter Funktionstraining wählbar.", "lrs.php"],
    ["2026-11-26", "Stopp-Routine: Lernweg zum Selbstlernen", "8 Blätter, mit denen die Kinder die Stopp-Routine allein erarbeiten: Einführung, Signalstellen & Alarm-Fragen, alle sechs Werkzeuge mit So geht's und Muster, Üben Satz für Satz, Merken mit Klappkarten, Check mit Punkten – Kontrollstreifen zum Umknicken. Im Generator unter Werkzeuge und in der Stundenplanung.", "lrs.php"],
    ["2026-11-16", "Funktionstraining: viel mehr Abwechslung & Profi-Stufe", "38 neue Blattarten (z. B. Abschreibfehler, Gedreht oder gespiegelt?, Laute zählen, Lang oder kurz?, Einkaufszettel, Tierkonzert, Koordinaten, Weg aufschreiben), neue Schwierigkeit „Profi (sehr schwer)“, großer Wortschatz – und die Stundenplanung meidet Blätter, die das Kind zuletzt hatte.", "lrs.php"],
    ["2026-11-16", "Stunden verschieben", "In der Kinder-Akte geplante Stunden mit einem Tipp auf ein anderes Datum legen – gemeinsame Stunden mit 2 Kindern auf Wunsch gleich mit.", "trainingshefte.php"],
    ["2026-11-15", "Ella-Quiz", "Üben wie bei Schlaukopf: Klasse 1–4, Deutsch, Mathe, Sachunterricht, Lernen lernen – mit Sternen pro Thema, Fehler nochmal üben und Tafel-Modus Klasse gegen Ella. Mathe wird jedes Mal neu gemischt.", "ella-quiz.php"],
    ["2026-11-15", "Startklar! – Tagesbeginn & Stundenbeginn", "Auf der Guten-Morgen-Tafel und groß als eigene Kachel: was die Kinder vor dem Tag und vor jeder Stunde bereitlegen – zum Abhaken. Dazu Bilder per Auswahl und eigenes Material anlegen.", "tafelbilder.php#startklar"],
    ["2026-11-15", "Lernangebot Deutsch neu", "Eine Strategie pro Stunde (Silben, Mitsprechen, Verlängern, Nachschlagen, Proben, Satzzeichen), echtes Lesen – und jede Antwort wird an der Tafel angetippt: Punkt für die Klasse oder Ella.", "sozial-stunden.php?bereich=lernangebot"],
    ["2026-11-15", "Alles über die Tafel", "Sozialtraining, Vertretung und Lernangebot laufen ohne Extra-Material: keine doppelten Folien mehr, Abstimmen mit Daumen und Fingern, Lösungen zum Aufdecken. Material nur noch optional für die Mappen.", "sozial-stunden.php"],
    ["2026-11-12", "Rechtschreibung anwenden statt nur wissen", "Für Kinder, die die Regeln kennen, aber nicht anwenden: Stopp-Routine, Werkzeugkasten, gemischtes Signalstellen-Training, Fehlerdetektiv, Diktat-Duell, eigener Text, Fehlerprofil – auch in der Stundenplanung.", "lrs.php"],
    ["2026-11-12", "Anamnesebogen", "Elterngespräch strukturiert erfassen: am Handy ausfüllen oder leer drucken (mit/ohne Einrichtung), Ziele &amp; Wünsche, Übergabe ins Gutachten – nichts wird gespeichert.", "anamnese.php"],
    ["2026-11-12", "Signal „Pause vorbei!“", "Klingel, Checkliste zum Abhaken und Countdown – in jeder Präsentation unten (⏰) und bei den Tafelbildern.", "tafelbilder.php#pause"],
    ["2026-11-12", "14 neue Vertretungsstunden", "Deutsch, Mathe, Gemischt und entspannte Stunden – alle ohne Zusatzmaterial, nur Arbeitsblatt und Tafel.", "sozial-stunden.php?bereich=vertretung"],
    ["2026-11-12", "Mein Tag: Stundenplan &amp; Tagesplan", "Deinen eigenen Stundenplan hinterlegen und jeden Tag planen – Sozialtraining und Lernangebot kommen automatisch aus dem Jahresplan, andere Stunden fügst du mit einem Tipp ein.", "tagesplan.php"],
    ["2026-11-09", "Stundenplan für LRS-Kinder", "Wochenraster mit den Namen der Kinder statt Fächern – lokal, es wird nichts gespeichert. Drucken oder als PDF.", "stundenplan.php"],
    ["2026-11-09", "Stunden-Timer für die LRS-Stunde", "Alle Phasen (Ankommen bis Abschluss) mit Countdown, Gong und Endzeit – auch direkt aus der Stundenplanung.", "lrs-timer.php"],
    ["2026-11-09", "Tafelbild „Guten Morgen!“", "Zum Stundenanfang: Begrüßung, Datum, Wetter, Stundenplan mit Lehrkräften, was auspacken, was beachten – für Kl. 1/2 oder 3/4.", "tafelbilder.php#morgen"],
    ["2026-11-09", "Tafelbilder: Buchstabenkurs", "Buchstaben in der Lineatur an der digitalen Tafel vorschreiben, nachspuren und selbst schreiben – Druck- oder Grundschrift.", "tafelbilder.php#buchstabenkurs"],
    ["2026-11-09", "Gast-Zugänge für Kolleginnen", "Kolleginnen testen Sozialtraining, Lernangebot und Vertretung mit eigenem Code – getrennt von deinen Daten.", "zugaenge.php"],
    ["2026-11-08", "Leise-Meer im Sozialtraining", "In jeder Präsentation unten: 🌊 Leise-Meer – je leiser, desto mehr Meerestiere tauchen am Leuchtturm auf.", "sozial-stunden.php"],
    ["2026-11-08", "Leise-Wald", "Neue Tafel-Übung: Je leiser die Klasse, desto mehr Tiere kommen aus dem Wald (Mikrofon, es wird nichts aufgenommen).", "sozial-stunden.php?bereich=lernangebot#tafel"],
    ["2026-11-08", "Lernzeit mit Eule Ella", "Lernangebot: eigene Tafel-Welt (grüne Kreidetafel, Lernpfad, Sternenglas) und 8 neue Stunden „Lernen lernen“.", "sozial-stunden.php?bereich=lernangebot"],
    ["2026-11-08", "Lernangebot Grundschule", "Fertige 40-Minuten-Stunden Deutsch, Mathe &amp; Lernen lernen, Methodenpool mit Stundenplaner, Tafel-Übungen und Arbeitsblatt-Generator.", "sozial-stunden.php?bereich=lernangebot"],
    ["2026-11-02", "Lesetraining von Buchstaben bis Text", "In der Kinder-Akte unter <b>Förderplan</b>: Lesestufen 1–5 und bekannte Buchstaben wählen – das Förderpaket nimmt sie mit.", "trainingshefte.php"],
    ["2026-11-02", "Vertretungsstunden", "Fertige 40-Minuten-Stunden für Kl. 1–4 mit Zufallsauswahl und Arbeitsblättern.", "sozial-stunden.php?bereich=vertretung"],
    ["2026-10-30", "Sozialtraining: Präsentation & Material", "Tafel-Präsentation, PowerPoint, Filme und Gefühlskarten zu jeder Stunde.", "sozial-stunden.php"],
];
$neuAktuell = array_values(array_filter($NEU, fn($n) => strtotime($n[0]) >= strtotime("-21 days")));
?>


<?php
// Startseite: Bereiche → Untergruppen → Kacheln [Link, Symbol, Titel, Text, haupt?]
$BEREICHE = [
    ["lrs", "fa-pen-nib", "LRS-Förderung", [
        ["Kinder &amp; Stunden", [
            ["trainingshefte.php", "fa-user-graduate", "Kinder-Akten", "Pro Kind (nur Kürzel): Förderplan, Trainingsheft, Lernbox &amp; Stunden", true],
            ["lrs.php#stunde", "fa-layer-group", "Stunde planen", "Stundenplanung für 1 oder 2 Kinder mit allen Blättern"],
            ["lrs.php?spontan=1#stunde", "fa-bolt", "Spontanstunde", "Ein Klick – fertige Stunde passend zur Akte"],
            ["lrs-timer.php", "fa-stopwatch", "Stunden-Timer", "Phasen der LRS-Stunde mit Zeit im Blick"],
            ["lrs-spiele.php", "fa-seedling", "Lernspiele", "Weltenreise, Action-Spiele & ruhiges Üben"],
            ["lrs-schreiben.php", "fa-envelope-open-text", "Schreiben & Vorlagen", "Nachteilsausgleich, Elternbriefe, Übungstipps"],
            ["stundenplan.php", "fa-table-cells", "Stundenplan mit Namen", "Wochenplan der LRS-Kinder (nur lokal)"],
        ]],
        ["Arbeitsblätter", [
            ["lrs.php", "fa-wand-magic-sparkles", "Material-Generator", "Aufmerksamkeit, Funktion, Lesen, Symptomtraining", true],
            ["lrs.php#werkzeug", "fa-toolbox", "Deutsch-Werkzeugkasten", "Alle Blätter zu den Rechtschreibstrategien"],
            ["materialien.php", "fa-folder-open", "Materialien", "Gespeicherte und eigene Blätter"],
        ]],
        ["Diagnostik", [
            ["anamnese.php", "fa-clipboard-user", "Anamnesebogen", "Elterngespräch ausfüllen oder leer drucken"],
            ["gutachten.php", "fa-file-signature", "Gutachten", "Förderdiagnostik-Gutachten (nur lokal)"],
        ]],
    ]],
    ["sozial", "fa-hands-holding-child", "Sozialtraining", [
        ["", [
            ["sozial-stunden.php", "fa-calendar-week", "Sozialtraining-Stunden", "36 fertige Stunden mit Präsentation – Kl. 1/2 und 3/4", true],
            ["sozial-stunden.php#jahresplan", "fa-calendar-days", "Jahresplan", "Welche Stunde wann – für beide Gruppen"],
            ["sozial-stunden.php#rituale", "fa-hands-holding-circle", "Rituale", "Anfang und Abschluss jeder Stunde"],
            ["sozialtraining.php", "fa-lightbulb", "Sozialtraining-Generator", "Methodenpool &amp; Vorlagen"],
        ]],
    ]],
    ["gs", "fa-people-group", "Grundschule", [
        ["Stunden", [
            ["sozial-stunden.php?bereich=lernangebot", "fa-seedling", "Lernangebot", "40-Minuten-Stunden Deutsch, Mathe &amp; Lernen lernen", true],
            ["sozial-stunden.php?bereich=vertretung", "fa-shuffle", "Vertretungsstunden", "Fertige Stunden für Kl. 1–4, auch Englisch"],
        ]],
        ["Werkzeuge", [
            ["ella-quiz.php", "fa-graduation-cap", "Ella-Quiz", "Üben nach Klasse, Fach und Thema – auch an der Tafel"],
        ]],
    ]],
    ["tafel", "fa-chalkboard", "Tafelbilder", [
        ["Tagesstart &amp; Klassenführung", [
            ["tafelbilder.php#morgen", "fa-sun", "Guten Morgen! (Kl. 1–4)", "Datum, Wetter, Stundenplan, Auspacken", true],
            ["tafelbilder.php#morgen-sek", "fa-mug-hot", "Guten Morgen! (Kl. 5–9)", "Stundenplan, A-/B-Woche, Termine, Impuls"],
            ["tafelbilder.php#pause", "fa-bell", "Pause vorbei!", "Klingel, Checkliste und Countdown"],
        ]],
        ["Ruhe &amp; Arbeitsphase", [
            ["tafelbilder.php#leise", "fa-tree", "Leise-Wald", "Leise arbeiten mit dem Mikrofon"],
            ["tafelbilder.php#runter", "fa-spa", "Runterkommen", "Atemübungen, Glitzerglas, 5-4-3-2-1"],
            ["tafelbilder.php#bewegung", "fa-person-running", "Bewegungspause", "Figur macht Übungen am Platz vor"],
            ["tafelbilder.php#ruhig", "fa-headphones", "Ruhige Arbeitszeit", "Bild und leiser Klang nebenbei – Kl. 1–9"],
        ]],
        ["Grundschule: Mathe, Deutsch &amp; Spiel", [
            ["tafelbilder.php#boot", "fa-sailboat", "Bootsfahrt zum Leuchtturm", "Lernspiel Mathe & Deutsch, Kl. 1–4"],
            ["tafelbilder.php#uhr", "fa-clock", "Uhr & Zeit", "Lernuhr und Zeitspannen"],
            ["tafelbilder.php#stellen", "fa-table-columns", "Stellenwerttafel", "Darstellen, Bündeln, Kommazahlen"],
            ["tafelbilder.php#1x1-tabelle", "fa-table-cells-large", "Das Einmaleins", "Tabelle, Verstehen, Tricks, Geteilt, Üben, großes 1 × 1"],
            ["tafelbilder.php#buchstabenkurs", "fa-pen-fancy", "Buchstabenkurs", "Nachspuren und schreiben in der Lineatur"],
            ["tafelbilder.php#taschenlampe", "fa-lightbulb", "Taschenlampen-Lesen", "Im Dunkeln leuchten und lesen – auch Wort suchen"],
        ]],
        ["Klasse 3–7", [
            ["tafelbilder.php#schriftlich", "fa-calculator", "Schriftlich rechnen", "Plus, Minus, Mal, Geteilt Schritt für Schritt"],
            ["tafelbilder.php#wortarten", "fa-spell-check", "Wortarten & Satzglieder", "Einfärben, Umstellprobe"],
        ]],
        ["Höhere Klassen", [
            ["tafelbilder.php#brueche", "fa-chart-pie", "Brüche (Kl. 5/6)", "Bild, Merksatz und Rechenweg zum Aufdecken"],
            ["tafelbilder.php#prozent", "fa-percent", "Prozent & Dezimalzahlen", "Hunderterfeld, Prozentstreifen"],
            ["tafelbilder.php#groessen", "fa-ruler", "Größen umrechnen", "Einheitentreppe"],
            ["tafelbilder.php#werkstatt", "fa-screwdriver-wrench", "Holz & Metall (Technik)", "Werkstoff-Duell: Fe/NE, Holzarten, Baumstamm, Werkzeug"],
        ]],
    ]],
    ["familie", "fa-house", "Familie", [
        ["", [
            ["lernbasis/", "fa-book-open-reader", "Lernbasis", "Lern-App für die 5. Klasse"],
            ["zahnputz/", "fa-tooth", "Zahnputz-Spiel", "Gemeinsam Zähne putzen"],
        ]],
    ]],
];
?>

<a href="tagesplan.php" class="heute-karte">
<i class="fa-solid fa-calendar-day"></i>
<span><b>Mein Tag</b><small>Stundenplan, Tagesplan &amp; Woche – mit den geplanten Stunden</small></span>
<i class="fa-solid fa-arrow-right"></i>
</a>

<div class="suche"><i class="fa-solid fa-magnifying-glass"></i><input type="search" id="suche" placeholder="Suchen, z. B. Gutachten, Brüche, Vertretung …" autocomplete="off" oninput="suchen(this.value)"><button type="button" id="sucheWeg" onclick="suchen(''); document.getElementById('suche').value=''" hidden><i class="fa-solid fa-xmark"></i></button></div>
<p class="such-leer" id="suchLeer" hidden>Nichts gefunden.</p>

<?php if ($neuAktuell): ?>
<section class="neu" id="neu" data-stand="<?= htmlspecialchars($neuAktuell[0][0]) ?>" hidden>
    <div class="neu-kopf"><span><i class="fa-solid fa-star"></i> Neu im Leuchtturm</span><button type="button" onclick="neuWeg()" title="Ausblenden"><i class="fa-solid fa-xmark"></i></button></div>
    <?php foreach ($neuAktuell as $nr => [$datum, $titel, $text, $link]): ?>
        <a class="neu-eintrag<?= $nr >= 3 ? " mehr" : "" ?>" href="<?= htmlspecialchars($link) ?>"><b><?= htmlspecialchars($titel) ?></b><span><?= $text ?></span><i class="fa-solid fa-arrow-right"></i></a>
    <?php endforeach; ?>
    <?php if (count($neuAktuell) > 3): ?><button type="button" class="neu-mehr" onclick="this.closest('.neu').classList.toggle('alle'); this.textContent = this.closest('.neu').classList.contains('alle') ? 'weniger anzeigen' : '+ <?= count($neuAktuell) - 3 ?> weitere Neuigkeiten'">+ <?= count($neuAktuell) - 3 ?> weitere Neuigkeiten</button><?php endif; ?>
</section>
<?php endif; ?>

<?php foreach ($BEREICHE as [$id, $icon, $titel, $gruppen]): ?>
<details class="bereich" data-id="<?= $id ?>"<?= $id === "familie" ? "" : " open" ?>>
    <summary><i class="fa-solid <?= $icon ?>"></i> <?= $titel ?><span class="zahl"><?= array_sum(array_map(fn($g) => count($g[1]), $gruppen)) ?></span><i class="fa-solid fa-chevron-down pfeil"></i></summary>
    <?php foreach ($gruppen as [$gTitel, $kacheln]): ?>
    <div class="untergruppe">
        <?php if ($gTitel): ?><h3><?= $gTitel ?></h3><?php endif; ?>
        <div class="kacheln">
        <?php foreach ($kacheln as $k): ?>
            <a href="<?= htmlspecialchars($k[0]) ?>" class="kachel<?= !empty($k[4]) ? " haupt" : "" ?>"><i class="fa-solid <?= $k[1] ?>"></i><span><b><?= $k[2] ?></b><small><?= $k[3] ?></small></span></a>
        <?php endforeach; ?>
        </div>
    </div>
    <?php endforeach; ?>
</details>
<?php endforeach; ?>

<div class="portal-footer">
<a href="update.php"><i class="fa-solid fa-cloud-arrow-down"></i> Updates</a> &nbsp;·&nbsp; <a href="zugaenge.php"><i class="fa-solid fa-user-clock"></i> Gast-Zugänge</a> &nbsp;·&nbsp; <a href="logout.php"><i class="fa-solid fa-right-from-bracket"></i> Abmelden</a>
</div>

</div>

<script>

// Bereiche auf-/zuklappen merken
document.querySelectorAll("details.bereich").forEach(d => {
    try { const z = JSON.parse(localStorage.getItem("lt-bereiche") || "{}"); if (d.dataset.id in z) d.open = z[d.dataset.id]; } catch (e) {}
    d.addEventListener("toggle", () => { if (document.getElementById("suche").value) return; try { const z = JSON.parse(localStorage.getItem("lt-bereiche") || "{}"); z[d.dataset.id] = d.open; localStorage.setItem("lt-bereiche", JSON.stringify(z)); } catch (e) {} });
});
// Suche über alle Kacheln
let offenVorher = null;
function suchen(text){
    const q = text.trim().toLowerCase();
    const bereiche = [...document.querySelectorAll("details.bereich")];
    if (q && !offenVorher) offenVorher = bereiche.map(d => d.open);
    let treffer = 0;
    bereiche.forEach((d, i) => {
        let imBereich = 0;
        d.querySelectorAll(".untergruppe").forEach(u => {
            let n = 0;
            u.querySelectorAll(".kachel").forEach(k => { const ok = !q || k.textContent.toLowerCase().includes(q); k.classList.toggle("versteckt", !ok); if (ok) n++; });
            u.classList.toggle("versteckt", !n); imBereich += n;
        });
        d.classList.toggle("versteckt", !imBereich);
        if (q) d.open = true; else if (offenVorher) d.open = offenVorher[i];
        treffer += imBereich;
    });
    if (!q) offenVorher = null;
    document.getElementById("suchLeer").hidden = !q || treffer > 0;
    document.getElementById("sucheWeg").hidden = !q;
    const neu = document.getElementById("neu"); if (neu) neu.style.display = q ? "none" : "";
}
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
