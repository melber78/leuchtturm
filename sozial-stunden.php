<?php require __DIR__ . "/auth.php"; ?>
<?php
/* ============================================================
   Leuchtturm – Sozialtraining-Stunden
   Stundenbibliothek (fertige Vorlagen + eigene Stunden), Editor,
   Jahresplan und Druck (Stundenvorbereitung + Arbeitsblätter,
   jedes Arbeitsblatt füllt genau eine A4-Seite).
   Vorlagen: sozial-einheiten.js (kommt per Update)
   Eigene Daten: material-daten/sozialtraining.json (nie überschrieben)
   ============================================================ */
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
if (empty($_SESSION["sozial_csrf"])) $_SESSION["sozial_csrf"] = bin2hex(random_bytes(16));

// Zwei Bereiche auf einer Seite: Sozialtraining (Standard) und Vertretungsstunden (?bereich=vertretung)
$BEREICH = (($_GET["bereich"] ?? "") === "vertretung") ? "vertretung" : "sozial";
$B_INFO = $BEREICH === "vertretung"
    ? ["name" => "Vertretung", "titel" => "Vertretungsstunden", "icon" => "fa-shuffle", "datei" => "vertretung.json", "vorlagen" => "vertretung-einheiten"]
    : ["name" => "Sozialtraining", "titel" => "Sozialtraining-Stunden", "icon" => "fa-people-group", "datei" => "sozialtraining.json", "vorlagen" => "sozial-einheiten"];
$datei = __DIR__ . "/material-daten/" . $B_INFO["datei"];
$dateiKaputt = false;
$daten = [];
if (file_exists($datei)) {
    $inhalt = file_get_contents($datei);
    $daten = json_decode($inhalt, true);
    if (!is_array($daten)) { $dateiKaputt = trim((string)$inhalt) !== ""; $daten = []; }
}
$daten += ["einheiten" => [], "jahresplan" => null, "rituale" => null];
$JSON = JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE;
// Alle Vorlagen-Dateien: sozial-einheiten.js zuerst, dann -2, -3 … (neue Dateien werden automatisch geladen)
$vorlagenDateien = glob(__DIR__ . "/" . $B_INFO["vorlagen"] . "*.js") ?: [];
$basisDatei = $B_INFO["vorlagen"] . ".js";
usort($vorlagenDateien, fn($a, $b) => (basename($a) === $basisDatei ? -1 : (basename($b) === $basisDatei ? 1 : strnatcmp($a, $b))));
?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= htmlspecialchars($B_INFO["titel"]) ?> – Leuchtturm</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Andika:wght@400;700&family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

<style>
:root{
    --nacht:#16324a; --meer:#3d7ea6; --gold:#f2a93b; --schaum:#f4f6f4;
    --text:#1f2d36; --grau:#7c8a85; --linie:#dfe5e2;
    --schatten:0 6px 24px rgba(22,50,74,.1);
    --rot:#c0392b; --gruen:#2e8b57;
}
*{ box-sizing:border-box; }
body{ margin:0; background:var(--schaum); color:var(--text); font-family:"Nunito",sans-serif; }
button, input, select, textarea{ font-family:inherit; font-size:15px; }

/* ---------- Kopf ---------- */
.kopf{ background:linear-gradient(135deg,var(--nacht),var(--meer)); color:white; }
.kopf-innen{ width:min(1200px,95%); margin:0 auto; padding:18px 0 0; }
.kopf-zeile{ display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.kopf a.zurueck{ color:rgba(255,255,255,.8); text-decoration:none; font-weight:800; font-size:14px; }
.kopf h1{ margin:0; font-size:26px; font-weight:900; flex:1; }
.reiter{ display:flex; gap:4px; margin-top:16px; flex-wrap:wrap; }
.reiter a{ color:rgba(255,255,255,.8); text-decoration:none; font-weight:800; padding:10px 18px; border-radius:14px 14px 0 0; }
.reiter a.aktiv{ background:var(--schaum); color:var(--nacht); }

.seite{ width:min(1200px,95%); margin:24px auto 60px; }

/* ---------- Bausteine ---------- */
.btn{ border:0; border-radius:12px; padding:10px 16px; font-weight:800; cursor:pointer; background:white; color:var(--nacht); box-shadow:0 2px 8px rgba(22,50,74,.1); display:inline-flex; align-items:center; gap:8px; text-decoration:none; }
.btn:hover{ filter:brightness(.96); }
.btn.gold{ background:var(--gold); color:var(--nacht); }
.btn.blau{ background:var(--meer); color:white; }
.btn.nacht{ background:var(--nacht); color:white; }
.btn.rot{ background:#fbebeb; color:var(--rot); }
.btn.klein{ padding:6px 10px; font-size:13px; border-radius:9px; }
.btn:disabled{ opacity:.5; cursor:default; }
.karte{ background:white; border-radius:20px; box-shadow:var(--schatten); padding:22px 24px; margin-bottom:20px; }
.karte h2{ margin:0 0 12px; font-size:19px; font-weight:900; color:var(--nacht); }
.karte h3{ margin:16px 0 6px; font-size:16px; font-weight:900; }
.chip{ display:inline-block; border-radius:99px; padding:3px 10px; font-size:12px; font-weight:800; background:#e7f1fb; color:var(--meer); }
.chip.gold{ background:#f9eeda; color:#8a5a12; }
.chip.gruen{ background:#e5f4e4; color:var(--gruen); }
.chip.rot{ background:#fdecea; color:#c0392b; }
.chip.lila{ background:#efedff; color:#5b4fc4; }
.hinweis{ background:#f9eeda; border-radius:14px; padding:12px 16px; font-weight:700; margin-bottom:18px; }
.hinweis.rot{ background:#fbebeb; color:var(--rot); }
.leer{ color:var(--grau); font-weight:700; text-align:center; padding:30px; }
input[type=text], input[type=search], input[type=date], input[type=number], select, textarea{
    border:2px solid var(--linie); border-radius:10px; padding:8px 10px; background:white; color:var(--text); width:100%;
}
textarea{ resize:vertical; line-height:1.45; }
input:focus, select:focus, textarea:focus{ outline:none; border-color:var(--meer); }
label.feld{ display:block; font-weight:800; font-size:13px; color:var(--grau); margin:10px 0 4px; }

/* ---------- Bibliothek ---------- */
.werkzeug{ display:flex; gap:12px; flex-wrap:wrap; margin-bottom:20px; }
.werkzeug input{ flex:1 1 220px; width:auto; }
.werkzeug select{ flex:0 1 230px; width:auto; }
.diese-woche{ display:flex; align-items:center; gap:16px; flex-wrap:wrap; background:white; border-left:6px solid var(--gold); border-radius:16px; padding:16px 20px; box-shadow:var(--schatten); margin-bottom:22px; }
.diese-woche .dw-text{ flex:1; font-weight:800; }
.diese-woche .dw-text small{ display:block; color:var(--grau); font-weight:700; }
.kat-titel{ font-size:15px; font-weight:900; color:var(--grau); text-transform:uppercase; letter-spacing:.04em; margin:22px 0 10px; }
.karten{ display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; }
.einheit-karte{ background:white; border-radius:18px; box-shadow:var(--schatten); padding:18px 20px; cursor:pointer; text-decoration:none; color:var(--text); display:flex; flex-direction:column; gap:8px; transition:.15s; border:2px solid transparent; }
.einheit-karte:hover{ transform:translateY(-3px); border-color:#e7f1fb; }
.einheit-karte h3{ margin:0; font-size:18px; font-weight:900; }
.einheit-karte p{ margin:0; font-size:13.5px; color:#55636a; }
.einheit-karte .chips{ display:flex; gap:6px; flex-wrap:wrap; }

/* ---------- Detail ---------- */
.detail-kopf{ display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap; margin-bottom:18px; }
.detail-kopf .titel{ flex:1 1 300px; }
.detail-kopf h2{ font-size:28px; font-weight:900; margin:6px 0 0; }
.knopfleiste{ display:flex; gap:8px; flex-wrap:wrap; }
.zwei{ display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media (max-width:800px){ .zwei{ grid-template-columns:1fr; } }
.stufe-label{ font-size:12px; font-weight:900; text-transform:uppercase; letter-spacing:.05em; color:var(--meer); margin-bottom:4px; }
.stufe-label.s34{ color:#8a5a12; }
table.verlauf{ width:100%; border-collapse:collapse; font-size:14.5px; }
table.verlauf th{ text-align:left; background:var(--schaum); padding:8px 10px; font-weight:900; font-size:13px; color:var(--grau); }
table.verlauf td{ border-top:1px solid var(--linie); padding:8px 10px; vertical-align:top; }
table.verlauf td:first-child{ white-space:nowrap; font-weight:800; color:var(--meer); }
table.verlauf td:nth-child(2){ font-weight:800; }
@media (max-width:640px){ table.verlauf{ font-size:13px; } table.verlauf th, table.verlauf td{ padding:6px; } }
.md p{ margin:0 0 10px; line-height:1.55; }
.md ul, .md ol{ margin:0 0 10px; padding-left:22px; line-height:1.5; }
.md h4{ margin:14px 0 6px; font-size:15.5px; font-weight:900; color:var(--nacht); }
.lerntext{ background:#fbfcfb; border:2px solid var(--linie); border-radius:16px; padding:16px 18px; }
.lerntext h3{ margin-top:0; }
.uebung{ border:2px solid var(--linie); border-radius:16px; padding:14px 18px; margin-bottom:12px; }
.uebung-kopf{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:6px; }
.uebung-kopf strong{ font-size:16px; }
.material-liste{ margin:0; padding-left:22px; line-height:1.7; }
.vorschau-paar{ display:grid; grid-template-columns:1fr 1fr; gap:22px; }
.vorschau-paar.drei{ grid-template-columns:1fr 1fr 1fr; }
@media (max-width:900px){ .vorschau-paar.drei{ grid-template-columns:1fr 1fr; } }
@media (max-width:800px){ .vorschau-paar, .vorschau-paar.drei{ grid-template-columns:1fr; } }
.ed-umschalter{ display:flex; gap:6px; margin-bottom:8px; }
.ed-umschalter .btn.aktiv{ background:var(--meer); color:white; }
.vorschau{ position:relative; overflow:hidden; border-radius:6px; box-shadow:0 2px 14px rgba(22,50,74,.18); background:white; }
.vorschau > .blatt{ position:absolute; top:0; left:0; transform-origin:top left; }
.vorschau-status{ font-size:13px; font-weight:800; margin-top:8px; }
.vorschau-status.ok{ color:var(--gruen); }
.vorschau-status.voll{ color:var(--rot); }

/* ---------- Editor ---------- */
.ed-raster{ display:grid; grid-template-columns:1fr 1fr; gap:14px 20px; }
@media (max-width:800px){ .ed-raster{ grid-template-columns:1fr; } }
.ed-zeile{ display:grid; grid-template-columns:90px 120px 1fr 1fr 34px; gap:8px; margin-bottom:8px; align-items:start; }
@media (max-width:800px){ .ed-zeile{ grid-template-columns:1fr 1fr; } }
.ed-zeile textarea{ min-height:42px; }
.ed-block{ border:2px solid var(--linie); border-radius:14px; padding:12px 14px; margin-bottom:12px; background:#fcfdfc; }
.rit-gruppe{ border-top:2px solid var(--linie); padding-top:14px; margin-top:14px; }
.rit-gruppe h3{ margin:0 0 2px; }
.ed-block-kopf{ display:flex; gap:8px; align-items:center; margin-bottom:6px; flex-wrap:wrap; }
.ed-block-kopf .nr{ width:30px; height:30px; border-radius:50%; background:var(--meer); color:white; display:flex; align-items:center; justify-content:center; font-weight:900; flex:0 0 auto; }
.ed-block-kopf select{ width:auto; flex:0 1 200px; }
.ed-block-kopf .platz{ flex:1; }
.ed-ab{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,.85fr); gap:22px; align-items:start; }
.ed-ab .ed-ab-vorschau{ position:sticky; top:12px; }
@media (max-width:900px){ .ed-ab{ grid-template-columns:1fr; } .ed-ab .ed-ab-vorschau{ position:static; } }
.ed-hilfe{ font-size:12.5px; color:var(--grau); font-weight:700; margin-top:4px; }
.ed-check{ display:flex; align-items:center; gap:8px; font-weight:700; font-size:14px; margin-top:8px; }
.ed-check input{ width:auto; }
.ed-paar{ display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.speicherleiste{ position:sticky; bottom:0; background:rgba(244,246,244,.95); backdrop-filter:blur(4px); padding:12px 0; display:flex; gap:10px; justify-content:flex-end; border-top:2px solid var(--linie); z-index:5; }

/* ---------- Jahresplan ---------- */
.plan-einstellung{ display:flex; gap:14px; align-items:flex-end; flex-wrap:wrap; }
.plan-einstellung > div{ flex:0 1 190px; }
table.plan{ width:100%; border-collapse:collapse; }
table.plan th{ text-align:left; font-size:13px; color:var(--grau); padding:8px; font-weight:900; }
table.plan td{ border-top:1px solid var(--linie); padding:6px 8px; vertical-align:middle; }
table.plan tr.jetzt td{ background:#fff7e8; }
table.plan tr.frei td{ color:#a0aaa6; }
table.plan tr.erledigt td .plan-wahl{ opacity:.65; }
table.plan td.kw{ font-weight:900; white-space:nowrap; color:var(--meer); }
table.plan td.datum{ white-space:nowrap; font-weight:700; }
table.plan th.kl-th{ text-align:center; }
table.plan td.kl-zelle{ text-align:center; position:relative; white-space:nowrap; }
.kl-status{ width:34px; height:34px; border-radius:10px; border:2px solid #d6dee3; background:#fff; font-size:17px; font-weight:900; color:#9aa6ab; cursor:pointer; }
.kl-status.gehalten{ background:#2e8b57; border-color:#2e8b57; color:#fff; }
.kl-status.ausgefallen{ background:#fdecea; border-color:#e74c3c; color:#c0392b; }
.kl-status:disabled{ opacity:.35; cursor:default; }
.kl-punkt{ position:absolute; top:6px; right:calc(50% - 21px); width:8px; height:8px; border-radius:50%; background:var(--gold); }
tr.kl-details td{ background:#f6f9fb; }
.kl-detail-raster{ display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:10px; }
.kl-detail{ display:flex; flex-direction:column; gap:6px; background:#fff; border:1.5px solid var(--linie); border-radius:12px; padding:8px 10px; }
.kl-zeile{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
.kl-stand{ display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:12px; }
.kl-karte{ border:2px solid var(--linie); border-radius:14px; padding:12px 14px; display:flex; flex-direction:column; gap:6px; }
.kl-kopf{ display:flex; justify-content:space-between; align-items:center; font-size:18px; }
.kl-zahlen{ display:flex; gap:12px; font-weight:800; font-size:14px; }
.kl-zahlen .ok{ color:#2e8b57; } .kl-zahlen .aus{ color:#c0392b; }
.kl-nach{ font-size:13.5px; line-height:1.45; } .kl-nach.leer{ color:var(--grau); font-weight:700; }
table.plan select, table.plan input[type=text]{ padding:6px 8px; }
table.plan input[type=checkbox]{ width:20px; height:20px; }
@media (max-width:760px){
    table.plan, table.plan tbody, table.plan tr, table.plan td{ display:block; width:100%; }
    table.plan thead{ display:none; }
    table.plan tr{ border-top:2px solid var(--linie); padding:8px 0; }
    table.plan td{ border:0; padding:3px 4px; }
    table.plan td.kw, table.plan td.datum{ display:inline-block; width:auto; }
}
.speicherstatus{ font-weight:800; font-size:13px; color:var(--grau); }
.speicherstatus.ok{ color:var(--gruen); }
.speicherstatus.fehler{ color:var(--rot); }

/* ---------- Meldung ---------- */
#toast{ position:fixed; left:50%; bottom:26px; transform:translateX(-50%) translateY(120px); background:var(--nacht); color:white; padding:12px 20px; border-radius:14px; font-weight:800; box-shadow:var(--schatten); transition:.25s; z-index:50; max-width:90vw; }
#toast.zeigen{ transform:translateX(-50%) translateY(0); }
#toast.fehler{ background:var(--rot); }

/* ============================================================
   ARBEITSBLATT (A4) – wird für Vorschau und Druck genutzt
   ============================================================ */
.blatt{
    width:210mm; height:297mm; overflow:hidden; background:white; color:#1b1b1b;
    padding:12mm 14mm 10mm; display:flex; flex-direction:column;
    font-family:"Andika","Nunito",sans-serif; font-size:14pt; line-height:1.35; --z:1;
    -webkit-print-color-adjust:exact; print-color-adjust:exact;
}
.blatt.zu-voll{ outline:4px solid var(--rot); outline-offset:-4px; }
.blatt > *{ flex-shrink:0; }
.blatt-kopf{ display:flex; align-items:flex-end; justify-content:space-between; gap:4mm; border-bottom:.6mm solid var(--meer); padding-bottom:2mm; }
.blatt-titel{ font-size:1.55em; font-weight:700; line-height:1.15; color:var(--nacht); }
.blatt-meta{ font-family:"Nunito",sans-serif; font-size:8pt; font-weight:800; color:#8a979c; white-space:nowrap; text-align:right; }
.blatt-meta i{ color:var(--gold); }
.blatt-name{ display:flex; gap:2mm; align-items:flex-end; margin:3.5mm 0 1mm; font-size:.85em; }
.blatt-name .ln{ flex:1; }
.blatt-name .ln.kurz{ flex:0 0 32mm; }
.blatt-inhalt{ flex:1 1 auto; display:flex; flex-direction:column; min-height:0; }
.blatt-inhalt > *{ flex-shrink:0; }
.luft{ flex:1 0 2.5mm; }
.aufgabe.dehnbar{ flex:6 0 auto; display:flex; flex-direction:column; }
.af-kopf{ display:flex; gap:2.5mm; align-items:flex-start; font-weight:700; margin-bottom:1.6mm; }
.af-nr{ flex:0 0 auto; width:1.45em; height:1.45em; border-radius:50%; background:var(--meer); color:white; font-family:"Nunito",sans-serif; font-weight:900; font-size:.85em; display:flex; align-items:center; justify-content:center; margin-top:.05em; }
.af-text{ flex:1; }
.af-body{ padding-left:calc(1.45em * .85 + 2.5mm); }
.aufgabe.ohne-kopf .af-body{ padding-left:calc(1.45em * .85 + 2.5mm); }
.ln.vorne{ flex:0 0 3.2em; min-width:3.2em; margin-left:0; margin-right:.4em; }
.ln{ display:inline-block; border-bottom:.35mm solid #555; min-width:3.5em; height:1.3em; flex:1 1 3.5em; margin:0 .15em; }
.lz{ display:flex; flex-wrap:wrap; align-items:flex-end; min-height:calc(1.9em * var(--z)); }
.lz + .lz{ margin-top:.25em; }
.lz.nur-text{ min-height:0; padding-top:.15em; }
.lz > span.t{ white-space:pre-wrap; }
.box{ display:inline-block; width:.9em; height:.9em; border:.35mm solid #333; border-radius:.12em; vertical-align:-.1em; margin-right:.15em; flex:0 0 auto; background:white; }
.schreiblinie{ height:calc(2.1em * var(--z)); border-bottom:.35mm solid #555; }
.blatt.stufe12 .schreiblinie{ height:calc(2.4em * var(--z)); }
.kreuz-liste{ display:flex; flex-direction:column; gap:calc(.45em * var(--z)); }
.kreuz-liste.reihe{ flex-direction:row; flex-wrap:wrap; gap:.4em 1.4em; }
.kreuz{ display:flex; align-items:flex-end; gap:.45em; }
.kreuz .box{ width:1em; height:1em; margin:0; align-self:center; }
.kreuz .lz{ min-height:0; flex:1; }
.zuordnen{ display:grid; grid-template-columns:minmax(0,max-content) 18mm minmax(0,max-content); justify-content:center; row-gap:calc(.55em * var(--z)); align-items:center; }
.zu-l{ display:flex; align-items:center; justify-content:flex-end; gap:.5em; text-align:right; }
.zu-r{ display:flex; align-items:center; gap:.5em; }
.punkt{ flex:0 0 auto; width:.62em; height:.62em; border-radius:50%; background:#333; }
table.ab-tab{ width:100%; border-collapse:collapse; }
table.ab-tab th{ background:#eef4f8; text-align:left; font-weight:700; padding:.3em .5em; border:.3mm solid #9aa9b2; font-size:.9em; }
table.ab-tab td{ border:.3mm solid #9aa9b2; padding:.35em .5em; vertical-align:middle; height:calc(2.3em * var(--z)); }
table.ab-tab td .lz{ min-height:0; }
.gesichter{ display:flex; justify-content:space-around; gap:3mm; flex-wrap:wrap; }
.gesicht{ text-align:center; width:5.2em; }
.gesicht svg{ width:4.6em; height:4.6em; display:block; margin:0 auto .2em; }
.blatt.stufe34 .gesicht svg{ width:3.8em; height:3.8em; }
.malfeld.mit-bild{ min-height:62mm; }
/* Klasse 1/2: Bilder, Farbsymbole, Aufgaben-Symbole */
.af-symbol{ flex:0 0 auto; width:1.35em; height:1.35em; color:var(--meer); margin-top:.02em; }
.bild{ display:inline-flex; flex:0 0 auto; width:1.7em; height:1.7em; align-self:center; }
.bild svg{ width:100%; height:100%; }
.blatt.kl1 .bild{ width:2.1em; height:2.1em; }
.zs{ flex:0 0 auto; width:1em; height:1em; align-self:center; }
.blatt.kl1 .box{ width:1.2em; height:1.2em; }
.blatt.kl1 .kreuz .box{ width:1.2em; height:1.2em; }
.kreuz .bild{ margin-right:.1em; }
.zu-l .bild, .zu-r .bild, .zu-l .zs{ margin:0 .05em; }
.zelle-kopf{ display:flex; align-items:center; gap:.4em; }
.zelle-kopf .lz{ min-height:0; }
.malfeld{ flex:1 1 auto; min-height:30mm; border:.5mm dashed #9aa9b2; border-radius:4mm; position:relative; }
.malfeld svg{ position:absolute; left:6%; top:7%; width:88%; height:86%; }
.satz-liste{ display:flex; flex-direction:column; gap:calc(.5em * var(--z)); }
.satz{ display:flex; gap:.4em; }
.satz .snr{ font-weight:700; flex:0 0 1.2em; padding-top:.15em; }
.satz .snr.mit-linie{ padding-top:calc(1.9em * var(--z) - 1.35em); }
.satz .sinhalt{ flex:1; }

/* Stundenvorbereitung (Lehrkraft) – Druck */
.lehrer-druck{ font-family:"Nunito",sans-serif; font-size:10.5pt; line-height:1.45; color:#1f2d36; background:white; }
.lehrer-druck .ld-kopf{ border-bottom:.7mm solid var(--meer); padding-bottom:3mm; margin-bottom:4mm; }
.lehrer-druck .ld-meta{ font-size:9pt; font-weight:800; color:#7c8a85; }
.lehrer-druck h1{ font-size:20pt; margin:1mm 0 0; font-weight:900; color:var(--nacht); }
.lehrer-druck h2{ font-size:13pt; margin:5mm 0 2mm; font-weight:900; color:var(--nacht); break-after:avoid; }
.lehrer-druck h3{ font-size:11pt; margin:3mm 0 1mm; font-weight:900; break-after:avoid; }
.lehrer-druck table{ width:100%; border-collapse:collapse; font-size:9.5pt; }
.lehrer-druck th{ background:#eef4f8; text-align:left; padding:1.5mm 2mm; border:.3mm solid #c5d0d6; }
.lehrer-druck td{ padding:1.5mm 2mm; border:.3mm solid #c5d0d6; vertical-align:top; }
.lehrer-druck tr{ break-inside:avoid; }
.lehrer-druck .md p{ margin:0 0 2mm; }
.lehrer-druck .ld-uebung{ break-inside:avoid; margin-bottom:3mm; }
.lehrer-druck .ld-badge{ font-size:8.5pt; font-weight:800; color:var(--meer); }

/* ---------- Druck ---------- */
#druck{ position:absolute; left:-10000px; top:0; visibility:hidden; }
@page{ size:A4; margin:0; }
@page lehrer{ size:A4; margin:14mm 15mm 14mm; }
@media print{
    body{ background:white; }
    body > *:not(#druck){ display:none !important; }
    #druck{ position:static; visibility:visible; }
    #druck .blatt{ break-after:page; outline:none; }
    #druck > :last-child{ break-after:auto; }
    #druck .lehrer-druck{ page:lehrer; break-after:page; }
}
</style>
</head>
<body>

<header class="kopf">
    <div class="kopf-innen">
        <div class="kopf-zeile">
            <a class="zurueck" href="index.php"><i class="fa-solid fa-arrow-left"></i> Leuchtturm</a>
            <h1><i class="fa-solid <?= $B_INFO["icon"] ?>"></i> <?= htmlspecialchars($B_INFO["titel"]) ?></h1>
        </div>
        <nav class="reiter">
            <a href="#bibliothek" data-reiter="bibliothek"><i class="fa-solid fa-book-open"></i> Stunden</a>
<?php if ($BEREICH === "sozial"): ?>
            <a href="#jahresplan" data-reiter="jahresplan"><i class="fa-solid fa-calendar-week"></i> Jahresplan</a>
            <a href="#rituale" data-reiter="rituale"><i class="fa-solid fa-hands-holding-circle"></i> Rituale</a>
<?php else: ?>
            <a href="#rituale" data-reiter="rituale"><i class="fa-solid fa-box-archive"></i> Material</a>
            <a href="sozial-stunden.php" style="margin-left:auto"><i class="fa-solid fa-people-group"></i> Zum Sozialtraining</a>
<?php endif; ?>
        </nav>
    </div>
</header>

<main class="seite">
    <?php if ($dateiKaputt): ?>
    <div class="hinweis rot"><i class="fa-solid fa-triangle-exclamation"></i> Die Datei material-daten/sozialtraining.json ist beschädigt. Deine eigenen Stunden werden deshalb gerade nicht angezeigt, und Speichern ist gesperrt, damit nichts verloren geht. Eine Sicherung findest du unter update-backup/.</div>
    <?php endif; ?>
    <div id="inhalt"></div>
</main>

<div id="toast"></div>
<div id="druck"></div>

<script src="bilder.js?v=<?= @filemtime(__DIR__ . "/bilder.js") ?: 1 ?>"></script>
<?php foreach ($vorlagenDateien as $vd): ?>
<script src="<?= htmlspecialchars(basename($vd)) ?>?v=<?= @filemtime($vd) ?: 1 ?>"></script>
<?php endforeach; ?>
<script>
window.SOZIAL_DATEN = <?= json_encode($daten, $JSON) ?>;
window.SOZIAL_CSRF = <?= json_encode($_SESSION["sozial_csrf"], $JSON) ?>;
window.SOZIAL_GESPERRT = <?= $dateiKaputt ? "true" : "false" ?>;
window.BEREICH = <?= json_encode(["key" => $BEREICH, "name" => $B_INFO["name"], "titel" => $B_INFO["titel"]], $JSON) ?>;
</script>
<script>
"use strict";

/* ============================================================
   Grundlagen
   ============================================================ */
const VORLAGEN = window.SOZIAL_VORLAGEN || [];
const KATEGORIEN = window.SOZIAL_KATEGORIEN || ["Sonstiges"];
const DATEN = window.SOZIAL_DATEN;
DATEN.einheiten = Array.isArray(DATEN.einheiten) ? DATEN.einheiten : [];
const inhalt = document.getElementById("inhalt");

const FUER = { alle: "Alle", "12": "Kl. 1/2", "34": "Kl. 3/4" };
const TYPEN = {
    schreiben: "Schreiblinien",
    luecken:   "Sätze mit Lücken",
    ankreuzen: "Ankreuzen",
    zuordnen:  "Verbinden",
    tabelle:   "Tabelle",
    gesichter: "Gesichter / Gefühle",
    malen:     "Malfeld"
};
const BILDER = { "": "– kein Bild –", stopp: "Stopp-Schild", herz: "Herz", stern: "Stern", ampel: "Ampel", sprechblase: "Sprechblase", sonne: "Sonne", ohr: "Ohr", blume: "Blume", wolke: "Wolke", pokal: "Pokal" };

function esc(s){ return String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c])); }
function inline(s){
    return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/(^|[^*])\*([^*\n]+?)\*/g, "$1<em>$2</em>");
}
// Kleine Textformatierung: Absätze, Listen, **fett**, *kursiv*, ### Überschrift
function md(text){
    const zeilen = String(text ?? "").replace(/\r/g, "").split("\n");
    let html = "", liste = null, absatz = [];
    const absatzEnde = () => { if (absatz.length) { html += "<p>" + absatz.map(inline).join("<br>") + "</p>"; absatz = []; } };
    const listeEnde = () => { if (liste) { html += `<${liste.typ}>` + liste.items.map(i => "<li>" + inline(i) + "</li>").join("") + `</${liste.typ}>`; liste = null; } };
    for (const z of zeilen) {
        let m;
        if (!z.trim()) { absatzEnde(); listeEnde(); continue; }
        if ((m = z.match(/^###\s+(.*)/))) { absatzEnde(); listeEnde(); html += "<h4>" + inline(m[1]) + "</h4>"; continue; }
        if ((m = z.match(/^\s*[-•]\s+(.*)/)) || (m = z.match(/^\s*\d+[.)]\s+(.*)/))) {
            const typ = /^\s*\d/.test(z) ? "ol" : "ul";
            absatzEnde();
            if (liste && liste.typ !== typ) listeEnde();
            if (!liste) liste = { typ, items: [] };
            liste.items.push(m[1]);
            continue;
        }
        listeEnde();
        absatz.push(z);
    }
    absatzEnde(); listeEnde();
    return html;
}
function kopie(o){ return JSON.parse(JSON.stringify(o)); }
function sauber(e){ const k = kopie(e); for (const s of Object.keys(k)) if (s.startsWith("_")) delete k[s]; return k; }

let toastZeit;
function toast(text, fehler = false){
    const t = document.getElementById("toast");
    t.textContent = text; t.classList.toggle("fehler", fehler); t.classList.add("zeigen");
    clearTimeout(toastZeit); toastZeit = setTimeout(() => t.classList.remove("zeigen"), fehler ? 6000 : 2600);
}

async function senden(daten){
    if (window.SOZIAL_GESPERRT) throw new Error("Speichern ist gesperrt, weil sozialtraining.json beschädigt ist.");
    let r;
    try {
        r = await fetch("sozial-speichern.php" + (window.BEREICH.key === "vertretung" ? "?bereich=vertretung" : ""), { method: "POST", credentials: "same-origin",
            headers: { "Content-Type": "application/json", "X-CSRF": window.SOZIAL_CSRF }, body: JSON.stringify(daten) });
    } catch (e) { throw new Error("Keine Verbindung zum Server. Bitte gleich noch einmal versuchen."); }
    let antwort;
    try { antwort = await r.json(); } catch (e) { throw new Error("Der Server hat unerwartet geantwortet (Code " + r.status + ")."); }
    if (!antwort.ok) throw new Error(antwort.fehler || "Speichern hat nicht geklappt.");
    return antwort;
}

/* ============================================================
   Stunden-Verwaltung
   ============================================================ */
function alleEinheiten(){
    const eigene = DATEN.einheiten;
    const ersetzt = new Set(eigene.map(e => e.ersetzt).filter(Boolean));
    return [
        ...VORLAGEN.filter(v => !ersetzt.has(v.id)).map(v => ({ ...v, _art: "vorlage" })),
        ...eigene.map(e => ({ ...e, _art: e.ersetzt ? "angepasst" : "eigen" }))
    ];
}
// Findet eine Stunde – eine angepasste Vorlage ersetzt dabei das Original (auch im Jahresplan)
function finde(id){
    if (!id) return null;
    const eigen = DATEN.einheiten.find(e => e.id === id);
    if (eigen) return { ...eigen, _art: eigen.ersetzt ? "angepasst" : "eigen" };
    const anpassung = DATEN.einheiten.find(e => e.ersetzt === id);
    if (anpassung) return { ...anpassung, _art: "angepasst" };
    const v = VORLAGEN.find(v => v.id === id);
    return v ? { ...v, _art: "vorlage" } : null;
}
function artChip(e){
    if (e._art === "vorlage") return '<span class="chip">Vorlage</span>';
    if (e._art === "angepasst") return '<span class="chip lila">Angepasst</span>';
    return '<span class="chip gruen">Eigene</span>';
}
function katSort(a, b){
    const ia = KATEGORIEN.indexOf(a.kategorie), ib = KATEGORIEN.indexOf(b.kategorie);
    return ((ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)) || String(a.titel).localeCompare(String(b.titel), "de");
}
function leereEinheit(){
    return {
        titel: "", kategorie: KATEGORIEN[0], dauer: 40, ziel12: "", ziel34: "", material: "",
        verlauf: kopie(window.SOZIAL_VERLAUF_STANDARD || []),
        lerntext12: { titel: "", text: "" }, lerntext34: { titel: "", text: "" },
        uebungen: [{ titel: "", fuer: "alle", dauer: "5 Min", text: "" }],
        ab12: { titel: "", aufgaben: [{ typ: "ankreuzen", text: "", optionen: [], nebeneinander: false }, { typ: "malen", text: "Male ein Bild dazu.", bild: "" }] },
        ab34: { titel: "", aufgaben: [{ typ: "luecken", text: "", saetze: [], nummern: true }] }
    };
}

/* ============================================================
   Bilder: Gesichter und Ausmalbilder (eigene Strichzeichnungen)
   ============================================================ */
function gefuehlArt(name){
    const n = String(name).toLowerCase();
    if (/froh|fröhlich|freu|glücklich|lustig/.test(n)) return "froh";
    if (/traurig|trauer|einsam/.test(n)) return "traurig";
    if (/wut|wüt|sauer|ärger|zorn/.test(n)) return "wuetend";
    if (/angst|ängst|furcht|sorge|nervös/.test(n)) return "angst";
    if (/ruhig|entspannt|gelassen|zufrieden/.test(n)) return "ruhig";
    if (/überrasch|staun/.test(n)) return "ueberrascht";
    if (/stolz/.test(n)) return "stolz";
    if (/müde|schläfrig/.test(n)) return "muede";
    if (/gelangweilt|langweil/.test(n)) return "gelangweilt";
    return "neutral";
}
function gesichtSvg(art, leer){
    const s = 'fill="none" stroke="#222" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"';
    let teile = `<circle cx="50" cy="50" r="45" ${s}/>`;
    if (!leer) {
        const augen = `<circle cx="35" cy="42" r="4.2" fill="#222"/><circle cx="65" cy="42" r="4.2" fill="#222"/>`;
        const f = {
            froh: augen + `<path d="M29 60 Q50 82 71 60" ${s}/>`,
            traurig: augen + `<path d="M30 75 Q50 56 70 75" ${s}/><path d="M66 52 Q63 58 66 61 Q69 58 66 52 Z" fill="#7fb3d5" stroke="#222" stroke-width="1.5"/>`,
            wuetend: `<path d="M24 29 L43 37" ${s}/><path d="M76 29 L57 37" ${s}/>` + `<circle cx="35" cy="44" r="4.2" fill="#222"/><circle cx="65" cy="44" r="4.2" fill="#222"/>` + `<path d="M32 72 Q50 61 68 72" ${s}/>`,
            angst: `<path d="M26 31 Q35 24 44 30" ${s}/><path d="M56 30 Q65 24 74 31" ${s}/><circle cx="35" cy="43" r="6.5" ${s}/><circle cx="65" cy="43" r="6.5" ${s}/><circle cx="35" cy="43" r="2.4" fill="#222"/><circle cx="65" cy="43" r="2.4" fill="#222"/>` + `<path d="M31 70 Q37 63 43 70 Q50 77 57 70 Q63 63 69 70" ${s}/>`,
            ruhig: `<path d="M27 43 Q35 48 43 43" ${s}/><path d="M57 43 Q65 48 73 43" ${s}/><path d="M37 64 Q50 72 63 64" ${s}/>`,
            ueberrascht: `<path d="M27 30 Q35 25 43 30" ${s}/><path d="M57 30 Q65 25 73 30" ${s}/>` + augen + `<ellipse cx="50" cy="68" rx="7" ry="9" ${s}/>`,
            stolz: `<path d="M27 43 Q35 37 43 43" ${s}/><path d="M57 43 Q65 37 73 43" ${s}/><path d="M32 60 Q50 76 68 60" ${s}/>`,
            muede: `<path d="M27 44 Q35 47 43 44" ${s}/><path d="M57 44 Q65 47 73 44" ${s}/><path d="M28 38 L43 40" ${s}/><path d="M72 38 L57 40" ${s}/><ellipse cx="50" cy="68" rx="5" ry="6" ${s}/><text x="72" y="26" font-family="Arial" font-weight="900" font-size="16" fill="#222">z</text><text x="82" y="16" font-family="Arial" font-weight="900" font-size="12" fill="#222">z</text>`,
            gelangweilt: `<path d="M27 42 H43" ${s}/><path d="M57 42 H73" ${s}/><circle cx="35" cy="45" r="2.6" fill="#222"/><circle cx="65" cy="45" r="2.6" fill="#222"/><path d="M36 68 Q50 64 64 68" ${s}/>`,
            neutral: augen + `<path d="M35 66 L65 66" ${s}/>`
        };
        teile += f[art] || f.neutral;
    }
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${teile}</svg>`;
}
function ausmalbild(name){
    const s = 'fill="none" stroke="#222" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"';
    const b = {
        stopp: `<svg viewBox="0 0 120 150"><polygon points="38,5 82,5 115,38 115,82 82,115 38,115 5,82 5,38" ${s}/><polygon points="41,12 79,12 108,41 108,79 79,108 41,108 12,79 12,41" ${s}/><text x="60" y="70" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="27" ${s} stroke-width="1.6">STOPP</text><rect x="55" y="115" width="10" height="33" ${s}/></svg>`,
        herz: `<svg viewBox="0 0 120 110"><path d="M60 102 C20 72 5 52 5 32 C5 15 18 5 33 5 C45 5 54 12 60 22 C66 12 75 5 87 5 C102 5 115 15 115 32 C115 52 100 72 60 102 Z" ${s}/></svg>`,
        stern: `<svg viewBox="0 0 120 115"><polygon points="60,5 74,42 114,43 82,67 94,107 60,83 26,107 38,67 6,43 46,42" ${s}/></svg>`,
        ampel: `<svg viewBox="0 0 70 160"><rect x="8" y="5" width="54" height="128" rx="12" ${s}/><circle cx="35" cy="30" r="15" ${s}/><circle cx="35" cy="69" r="15" ${s}/><circle cx="35" cy="108" r="15" ${s}/><rect x="30" y="133" width="10" height="24" ${s}/></svg>`,
        sprechblase: `<svg viewBox="0 0 140 110"><path d="M20 5 H120 Q135 5 135 20 V65 Q135 80 120 80 H55 L28 104 L33 80 H20 Q5 80 5 65 V20 Q5 5 20 5 Z" ${s}/></svg>`,
        sonne: `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="26" ${s}/>${[0,45,90,135,180,225,270,315].map(w => { const r = w * Math.PI / 180; return `<line x1="${60 + 36 * Math.cos(r)}" y1="${60 + 36 * Math.sin(r)}" x2="${60 + 54 * Math.cos(r)}" y2="${60 + 54 * Math.sin(r)}" ${s}/>`; }).join("")}</svg>`,
        ohr: `<svg viewBox="0 0 100 140"><path d="M28 50 Q28 8 62 8 Q95 8 92 50 Q90 72 72 86 Q62 95 62 112 Q60 132 42 132 Q26 132 24 116" ${s}/><path d="M45 52 Q46 30 62 30 Q76 30 74 50 Q73 62 63 66 Q55 70 57 82" ${s}/></svg>`,
        blume: `<svg viewBox="0 0 120 160"><circle cx="60" cy="52" r="15" ${s}/>${[0,60,120,180,240,300].map(w => { const r = w * Math.PI / 180; return `<ellipse cx="${60 + 30 * Math.cos(r)}" cy="${52 + 30 * Math.sin(r)}" rx="15" ry="12" transform="rotate(${w} ${60 + 30 * Math.cos(r)} ${52 + 30 * Math.sin(r)})" ${s}/>`; }).join("")}<path d="M60 84 V155" ${s}/><path d="M60 125 Q40 105 22 115 Q40 132 60 125" ${s}/><path d="M60 112 Q80 92 98 102 Q80 119 60 112" ${s}/></svg>`,
        wolke: `<svg viewBox="0 0 160 100"><path d="M35 88 Q8 88 8 66 Q8 46 30 44 Q30 16 60 14 Q82 12 92 30 Q104 18 120 24 Q138 30 136 48 Q154 52 152 70 Q150 88 128 88 Z" ${s}/></svg>`,
        pokal: `<svg viewBox="0 0 120 150"><path d="M30 10 H90 V50 Q90 85 60 88 Q30 85 30 50 Z" ${s}/><path d="M30 22 Q8 22 10 42 Q12 60 32 62" ${s}/><path d="M90 22 Q112 22 110 42 Q108 60 88 62" ${s}/><path d="M52 88 V112 H68 V88" ${s}/><rect x="34" y="112" width="52" height="16" rx="3" ${s}/><rect x="26" y="128" width="68" height="14" rx="3" ${s}/></svg>`,
        haende: `<svg viewBox="0 0 160 110"><path d="M10 70 Q10 50 30 45 L62 38 Q74 36 76 46 Q77 54 66 57 L52 60" ${s}/><path d="M150 70 Q150 50 130 45 L98 38 Q86 36 84 46 Q83 54 94 57 L108 60" ${s}/><path d="M10 70 Q20 95 50 95 L110 95 Q140 95 150 70" ${s}/><path d="M60 68 Q80 58 100 68" ${s}/></svg>`
    };
    return b[name] || "";
}

/* ============================================================
   Arbeitsblatt bauen (A4) und einpassen
   ============================================================ */
const t0 = teile => teile[0].trim() !== "";
// Text mit ___ (Schreiblinie) und ☐ (Kästchen), mehrzeilig
function linienText(text){
    return String(text ?? "").split("\n").map(zeile => {
        const teile = zeile.split(/_{3,}/);
        let html = "";
        teile.forEach((t, i) => {
            if (t) html += `<span class="t">${inline(t).replace(/☐/g, '<span class="box"></span>')}</span>`;
            // Linie ganz vorn mit Text dahinter = kurzes Feld (z. B. zum Nummerieren oder für F/K)
            if (i < teile.length - 1) html += (i === 0 && !t && teile[1].trim()) ? '<span class="ln vorne"></span>' : '<span class="ln"></span>';
        });
        const nurText = teile.length === 1 && t0(teile);
        return `<div class="lz${nurText ? " nur-text" : ""}">${html || '<span class="ln"></span>'}</div>`;
    }).join("");
}

/* ---------- Hilfen für Klasse 1 und 2: Bilder, Gesichter, Farbsymbole, Aufgaben-Symbole ---------- */
// Für wen ist eine Aufgabe auf dem 1/2-Blatt? "" = Kl. 1 und 2, "1" = nur Kl. 1, "2" = nur Kl. 2.
// Ohne Angabe gehören Schreibaufgaben automatisch nur zu Klasse 2.
function aufgabeFuer(a){
    if (a.nur !== undefined && a.nur !== null) return String(a.nur);
    return a.typ === "luecken" || a.typ === "schreiben" ? "2" : "";
}
let bildNamen = null;
function bildSuchen(wort){
    if (!window.LT_BILDER) return null;
    if (!bildNamen) {
        bildNamen = {};
        for (const [k, v] of Object.entries(window.LT_BILDER)) { bildNamen[k] = k; bildNamen[String(v[0]).toLowerCase()] = k; }
    }
    const w = String(wort).toLowerCase().trim();
    return bildNamen[w] || null;
}
function ltBild(k){ const b = window.LT_BILDER && window.LT_BILDER[k]; return b ? `<span class="bild">${b[2]}</span>` : ""; }
// Zerlegt eine Antwort in Bild + Text. [bild:keks] bzw. [gesicht:froh] vorn = ausdrücklich gewähltes Bild;
// auf dem 1/2-Blatt werden einzelne Gefühlswörter und Bildnamen (z. B. „Elefant“) automatisch bebildert.
function bildUndText(text, mitBild){
    let t = String(text ?? ""), svg = "";
    const m = t.match(/^\s*\[(bild|gesicht):\s*([^\]]+)\]\s*/i);
    if (m) {
        t = t.slice(m[0].length);
        if (mitBild) svg = m[1].toLowerCase() === "bild" ? ltBild(bildSuchen(m[2]) || m[2].trim().toLowerCase()) : `<span class="bild">${gesichtSvg(gefuehlArt(m[2]), false)}</span>`;
    } else if (mitBild) {
        const wort = t.trim().replace(/[.!?„“"]/g, "");
        if (/^[A-Za-zÄÖÜäöüß-]+$/.test(wort)) {
            const k = bildSuchen(wort);
            if (k) svg = ltBild(k);
            else if (gefuehlArt(wort) !== "neutral") svg = `<span class="bild">${gesichtSvg(gefuehlArt(wort), false)}</span>`;
        }
    }
    return { svg, text: t };
}
// Farbsymbole am Zeilenanfang (Klasse 1): „Beim roten Kreis steht …“
const SYMBOLE = [
    ["#e74c3c", '<circle cx="12" cy="12" r="10"/>'],
    ["#2f80c4", '<rect x="2.5" y="2.5" width="19" height="19" rx="2"/>'],
    ["#2e8b57", '<polygon points="12,2 22.5,21 1.5,21"/>'],
    ["#f2a93b", '<polygon points="12,1.5 14.9,8.8 22.7,9.2 16.6,14.1 18.6,21.7 12,17.4 5.4,21.7 7.4,14.1 1.3,9.2 9.1,8.8"/>'],
    ["#c0399b", '<path d="M12 21.5 C4 15.5 1.5 11.5 1.5 7.6 C1.5 4.4 4 2.2 6.9 2.2 C9.1 2.2 10.9 3.5 12 5.4 C13.1 3.5 14.9 2.2 17.1 2.2 C20 2.2 22.5 4.4 22.5 7.6 C22.5 11.5 20 15.5 12 21.5 Z"/>'],
    ["#e67e22", '<polygon points="12,1.5 22.5,12 12,22.5 1.5,12"/>'],
    ["#7f8c8d", '<path d="M15.5 2.5 A10 10 0 1 0 21.5 17 A8 8 0 1 1 15.5 2.5 Z"/>'],
    ["#17a2b8", '<path d="M6.5 19 C3 19 1.5 16.8 1.5 14.6 C1.5 12.2 3.4 10.6 5.6 10.6 C6 6.9 8.6 4.5 12 4.5 C15.1 4.5 17.4 6.6 18 9.6 C20.6 9.8 22.5 11.8 22.5 14.4 C22.5 17 20.6 19 18 19 Z"/>']
];
function symbol(i){ const [farbe, form] = SYMBOLE[i % SYMBOLE.length]; return `<svg class="zs" viewBox="0 0 24 24" fill="${farbe}">${form}</svg>`; }
// Kleines Bildzeichen im Aufgabenkopf: zeigt, was zu tun ist
function aufgabenSymbol(typ){
    const s = 'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
    const stift = `<path d="M5 19 L6 15 L16 5 L19 8 L9 18 Z" ${s}/><path d="M14 7 L17 10" ${s}/>`;
    const z = {
        malen: stift,
        schreiben: stift + `<path d="M3 22 H21" ${s}/>`,
        luecken: stift + `<path d="M3 22 H21" ${s}/>`,
        ankreuzen: `<rect x="3" y="3" width="18" height="18" rx="2.5" ${s}/><path d="M7.5 7.5 L16.5 16.5 M16.5 7.5 L7.5 16.5" ${s}/>`,
        zuordnen: `<circle cx="5" cy="12" r="2.6" fill="currentColor"/><circle cx="19" cy="12" r="2.6" fill="currentColor"/><path d="M7.5 12 H16.5" ${s}/>`,
        tabelle: `<rect x="3" y="4" width="18" height="16" rx="2" ${s}/><path d="M3 10 H21 M3 15 H21 M11 4 V20" ${s}/>`,
        gesichter: `<circle cx="12" cy="12" r="9" ${s}/><circle cx="9" cy="10" r="1.1" fill="currentColor"/><circle cx="15" cy="10" r="1.1" fill="currentColor"/><path d="M8.5 14.5 Q12 17.5 15.5 14.5" ${s}/>`
    };
    return `<svg class="af-symbol" viewBox="0 0 24 24">${z[typ] || z.schreiben}</svg>`;
}

function aufgabeHtml(a, stufe = "34"){
    const typ = a.typ || "schreiben";
    const klein = stufe === "1" || stufe === "2";    // Bilder für Klasse 1/2
    const k1 = stufe === "1";                         // Farbsymbole für Klasse 1
    const eintrag = (text, i) => {
        const b = bildUndText(text, klein);
        return { vorn: (k1 ? symbol(i) : ""), bild: b.svg, text: b.text };
    };
    switch (typ) {
        case "schreiben":
            return Array.from({ length: Math.max(1, Math.min(15, +a.zeilen || 2)) }, () => '<div class="schreiblinie"></div>').join("");
        case "luecken":
            return '<div class="satz-liste">' + (a.saetze || []).map((s, i) =>
                `<div class="satz">${a.nummern ? `<span class="snr${/_{3,}/.test(s.split("\n")[0]) ? " mit-linie" : ""}">${i + 1}.</span>` : ""}<div class="sinhalt">${linienText(s)}</div></div>`).join("") + "</div>";
        case "ankreuzen":
            return `<div class="kreuz-liste${a.nebeneinander ? " reihe" : ""}">` + (a.optionen || []).map((o, i) => {
                const x = eintrag(o, i);
                return `<div class="kreuz">${x.vorn}<span class="box"></span>${x.bild}${linienText(x.text)}</div>`;
            }).join("") + "</div>";
        case "zuordnen": {
            const l = a.links || [], r = a.rechts || [], n = Math.max(l.length, r.length);
            let html = '<div class="zuordnen">';
            for (let i = 0; i < n; i++) {
                const x = l[i] != null ? eintrag(l[i], i) : null, y = r[i] != null ? bildUndText(r[i], klein) : null;
                html += `<div class="zu-l">${x ? `${x.vorn}${x.bild}<span>${inline(x.text)}</span><span class="punkt"></span>` : ""}</div><div></div>`;
                html += `<div class="zu-r">${y ? `<span class="punkt"></span>${y.svg}<span>${inline(y.text)}</span>` : ""}</div>`;
            }
            return html + "</div>";
        }
        case "tabelle": {
            // Spalten, in die geschrieben wird (alle Zellen leer) und deren Überschrift länger ist
            // als ein Kürzel wie „D / I“, bekommen Platz zum Schreiben.
            const sp = a.spalten || [];
            const breite = sp.map((s, i) => {
                const leer = (a.zeilen || []).every(z => !String(z[i] ?? "").trim() || String(z[i]).trim() === "☐");
                return leer && String(s).replace(/\s/g, "").length > 8 ? (sp.length > 2 ? "34%" : "48%") : "";
            });
            return '<table class="ab-tab">' +
                (sp.length ? "<tr>" + sp.map((s, i) => `<th${breite[i] ? ` style="width:${breite[i]}"` : ""}>${inline(s)}</th>`).join("") + "</tr>" : "") +
                (a.zeilen || []).map((z, zi) => "<tr>" + (sp.length ? sp.map((_, i) => z[i]) : z).map((c, ci) => {
                    if (ci === 0 && c) { const x = eintrag(c, zi); return `<td><div class="zelle-kopf">${x.vorn}${x.bild}<div>${linienText(x.text)}</div></div></td>`; }
                    return `<td>${c ? linienText(c) : ""}</td>`;
                }).join("") + "</tr>").join("") +
                "</table>";
        }
        case "gesichter":
            return '<div class="gesichter">' + (a.gefuehle || []).map(g =>
                `<div class="gesicht">${gesichtSvg(gefuehlArt(g), !!a.leer)}<div>${inline(g)}</div></div>`).join("") + "</div>";
        case "malen":
            return `<div class="malfeld${a.bild ? " mit-bild" : ""}">${ausmalbild(a.bild)}</div>`;
    }
    return "";
}
// stufe: "1" (Vorlese-Fassung Kl. 1), "2" (Kl. 2) oder "34" – Kl. 1 und 2 nutzen beide das 1/2-Blatt
function blattBauen(e, stufe){
    if (stufe === "12") stufe = "2";
    const ab = (stufe === "34" ? e.ab34 : e.ab12) || { titel: "", aufgaben: [] };
    const blatt = document.createElement("div");
    blatt.className = "blatt " + (stufe === "34" ? "stufe34" : "stufe12 kl" + stufe);
    const aufgaben = (ab.aufgaben || []).filter(a => stufe === "34" || !aufgabeFuer(a) || aufgabeFuer(a) === stufe);
    let nr = 0, teile = [];
    for (const a of aufgaben) {
        const mitKopf = String(a.text || "").trim() !== "";
        if (mitKopf) nr++;
        const dehnbar = a.typ === "malen" ? " dehnbar" : "";
        teile.push(`<div class="aufgabe${dehnbar}${mitKopf ? "" : " ohne-kopf"}">` +
            (mitKopf ? `<div class="af-kopf"><span class="af-nr">${nr}</span>${stufe !== "34" ? aufgabenSymbol(a.typ) : ""}<span class="af-text">${inline(a.text)}</span></div>` : "") +
            `<div class="af-body"${a.typ === "malen" ? ' style="flex:1;display:flex;flex-direction:column"' : ""}>${aufgabeHtml(a, stufe)}</div></div>`);
    }
    // Aufgaben ohne eigene Überschrift hängen direkt an der vorherigen
    let inhaltHtml = "";
    teile.forEach((t, i) => {
        const ohneKopf = t.includes("ohne-kopf");
        if (i > 0 && !ohneKopf) inhaltHtml += '<div class="luft"></div>';
        else if (i > 0) inhaltHtml += '<div style="height:1.5mm"></div>';
        inhaltHtml += t;
    });
    inhaltHtml += '<div class="luft"></div>';
    blatt.innerHTML =
        `<div class="blatt-kopf"><div class="blatt-titel">${inline(ab.titel || e.titel || "Arbeitsblatt")}</div>` +
        `<div class="blatt-meta"><i class="fa-solid fa-tower-observation"></i> ${esc(window.BEREICH.name)}<br>Klasse ${stufe === "34" ? "3/4" : stufe}</div></div>` +
        `<div class="blatt-name"><span>Name:</span><span class="ln"></span>${stufe === "1" ? "" : '<span>Datum:</span><span class="ln kurz"></span>'}</div>` +
        `<div class="blatt-inhalt">${inhaltHtml}</div>`;
    return blatt;
}
// Größte Schrift suchen, bei der alles auf genau eine Seite passt; der Rest der Seite
// geht an Malfelder bzw. gleichmäßig an die Abstände.
function passt(b){ return b.scrollHeight <= b.clientHeight + 1; }
function einpassen(blatt){
    const [min, max] = blatt.classList.contains("kl1") ? [11, 20] : blatt.classList.contains("stufe12") ? [10, 19] : [9, 16];
    blatt.style.setProperty("--z", "1");
    blatt.style.fontSize = max + "pt";
    if (passt(blatt)) {
        blatt.classList.remove("zu-voll");
        // Noch Platz übrig und kein Malfeld? Dann bekommen die Kinder größere Schreibzeilen statt großer Lücken.
        if (!blatt.querySelector(".dehnbar")) {
            let zlo = 1, zhi = 1.9;
            for (let i = 0; i < 8; i++) {
                const m = (zlo + zhi) / 2;
                blatt.style.setProperty("--z", m.toFixed(3));
                if (passt(blatt)) zlo = m; else zhi = m;
            }
            // etwas Luft zwischen den Aufgaben behalten
            blatt.style.setProperty("--z", Math.max(1, zlo * 0.93).toFixed(3));
        }
        return true;
    }
    let lo = min, hi = max;
    for (let i = 0; i < 9; i++) {
        const m = (lo + hi) / 2;
        blatt.style.fontSize = m + "pt";
        if (passt(blatt)) lo = m; else hi = m;
    }
    blatt.style.fontSize = lo + "pt";
    const ok = passt(blatt);
    blatt.classList.toggle("zu-voll", !ok);
    return ok;
}
let schriftenBereit = null;
function schriften(){
    if (!schriftenBereit) schriftenBereit = Promise.race([
        Promise.all([document.fonts.load("700 16px Andika"), document.fonts.load("400 16px Andika"), document.fonts.load("900 16px Nunito")]).then(() => document.fonts.ready),
        new Promise(r => setTimeout(r, 2500))
    ]);
    return schriftenBereit;
}
// Blatt in einen Vorschau-Rahmen setzen (verkleinert dargestellt, gemessen in Originalgröße)
async function vorschauZeigen(rahmen, e, stufe){
    rahmen.innerHTML = "";
    const blatt = blattBauen(e, stufe);
    rahmen.appendChild(blatt);
    const skalieren = () => {
        const w = rahmen.clientWidth || 300;
        const f = w / blatt.offsetWidth;
        blatt.style.transform = `scale(${f})`;
        rahmen.style.height = (blatt.offsetHeight * f) + "px";
    };
    skalieren();
    if (!rahmen._beobachter) { rahmen._beobachter = new ResizeObserver(() => { const b = rahmen.querySelector(".blatt"); if (b) { const f = rahmen.clientWidth / b.offsetWidth; b.style.transform = `scale(${f})`; rahmen.style.height = (b.offsetHeight * f) + "px"; } }); rahmen._beobachter.observe(rahmen); }
    let ok = einpassen(blatt);
    await schriften();
    if (rahmen.contains(blatt)) ok = einpassen(blatt);
    const status = rahmen.parentElement.querySelector(".vorschau-status");
    if (status) {
        status.className = "vorschau-status " + (ok ? "ok" : "voll");
        status.innerHTML = ok ? '<i class="fa-solid fa-check"></i> Passt genau auf eine A4-Seite'
                              : '<i class="fa-solid fa-triangle-exclamation"></i> Zu viel für eine Seite – bitte Aufgaben kürzen oder weglassen';
    }
    return ok;
}

/* ============================================================
   Stundenvorbereitung (Lehrkraft) und Druck
   ============================================================ */
function materialListe(text){
    const z = String(text || "").split("\n").map(s => s.trim()).filter(Boolean);
    return z.length ? "<ul>" + z.map(s => "<li>" + inline(s) + "</li>").join("") + "</ul>" : "<p>–</p>";
}
function verlaufTabelle(e, klasse){
    return `<table class="${klasse}"><tr><th>Min</th><th>Phase</th><th>Kl. 1/2</th><th>Kl. 3/4</th></tr>` +
        (e.verlauf || []).map(v => `<tr><td>${esc(v.zeit)}</td><td>${esc(v.phase)}</td><td>${inline(v.k12)}</td><td>${inline(v.k34)}</td></tr>`).join("") + "</table>";
}
function lehrerHtml(e){
    return `<div class="lehrer-druck">
        <div class="ld-kopf"><div class="ld-meta">${esc(window.BEREICH.name)} · ${esc(e.kategorie)} · ${esc(e.dauer || 40)} Minuten · Klasse 1/2 und 3/4</div><h1>${esc(e.titel)}</h1></div>
        <table><tr><th style="width:50%">Ziel Kl. 1/2</th><th>Ziel Kl. 3/4</th></tr><tr><td>${inline(e.ziel12)}</td><td>${inline(e.ziel34)}</td></tr></table>
        <h2>Material</h2>${materialListe(e.material)}
        <p style="font-size:9pt;color:#55636a"><strong>Arbeitsblatt Kl. 1:</strong> Aufgaben und Antworten vorlesen – die Farbsymbole zeigen die Zeile („Beim roten Kreis steht …“). Schreibaufgaben gibt es nur auf dem Blatt für Kl. 2.</p>
        <h2>Stundenverlauf</h2>${verlaufTabelle(e, "")}
        ${e.lerntext12?.text ? `<h2>Lerntext Kl. 1/2: ${esc(e.lerntext12.titel)}</h2><div class="md">${md(e.lerntext12.text)}</div>` : ""}
        ${e.lerntext34?.text ? `<h2>Lerntext Kl. 3/4: ${esc(e.lerntext34.titel)}</h2><div class="md">${md(e.lerntext34.text)}</div>` : ""}
        ${(e.uebungen || []).length ? "<h2>Übungen</h2>" + e.uebungen.map(u => `<div class="ld-uebung"><h3>${esc(u.titel)} <span class="ld-badge">· ${FUER[u.fuer] || "Alle"}${u.dauer ? " · " + esc(u.dauer) : ""}</span></h3><div class="md">${md(u.text)}</div></div>`).join("") : ""}
    </div>`;
}
async function drucken(e, was){
    const ziel = document.getElementById("druck");
    ziel.innerHTML = "";
    if (was === "regie12" || was === "regie34") {
        const st = was.slice(5);
        ziel.innerHTML = `<div class="lehrer-druck"><div class="ld-kopf"><div class="ld-meta">${esc(window.BEREICH.name)} · ${esc(e.kategorie)} · ${esc(e.dauer || 40)} Minuten · Klasse ${st === "12" ? "1/2" : "3/4"}</div><h1>${esc(e.titel)} – Schritt für Schritt</h1></div>${window.sozialRegie.bauen(e, st)}</div>`;
    } else if (was === "rituale") {
        ziel.innerHTML = `<div class="lehrer-druck"><div class="ld-kopf"><div class="ld-meta">Sozialtraining · gilt für jede Stunde</div><h1>Feste Rituale</h1></div><div class="md">${md(rituale())}</div></div>`;
    } else {
        if (was === "lehrer" || was === "alles") ziel.insertAdjacentHTML("beforeend", lehrerHtml(e));
        const blaetter = [];
        if (was === "ab1" || was === "alles") blaetter.push(blattBauen(e, "1"));
        if (was === "ab2" || was === "ab12" || was === "alles") blaetter.push(blattBauen(e, "2"));
        if (was === "ab34" || was === "alles") blaetter.push(blattBauen(e, "34"));
        blaetter.forEach(b => ziel.appendChild(b));
        await schriften();
        const voll = blaetter.filter(b => !einpassen(b));
        if (voll.length && !confirm("Ein Arbeitsblatt ist zu voll für eine Seite und wird unten abgeschnitten. Trotzdem drucken?")) { ziel.innerHTML = ""; return; }
    }
    const titel = document.title;
    document.title = (e ? e.titel : "Rituale") + ({ regie12: " – Ablauf Kl. 1-2", regie34: " – Ablauf Kl. 3-4", ab1: " – AB Kl. 1", ab2: " – AB Kl. 2", ab12: " – AB Kl. 2", ab34: " – AB Kl. 3-4" }[was] || "");
    window.addEventListener("afterprint", () => { ziel.innerHTML = ""; document.title = titel; }, { once: true });
    setTimeout(() => window.print(), 60);
}

/* ============================================================
   Jahresplan – Datumshilfen
   ============================================================ */
function tag(iso){ const [j, m, t] = iso.split("-").map(Number); return new Date(Date.UTC(j, m - 1, t)); }
function iso(d){ return d.toISOString().slice(0, 10); }
function montag(d){ const x = new Date(d); const w = (x.getUTCDay() + 6) % 7; x.setUTCDate(x.getUTCDate() - w); return x; }
function heuteUtc(){ const n = new Date(); return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())); }
function kw(d){ const x = new Date(d); x.setUTCDate(x.getUTCDate() + 3 - ((x.getUTCDay() + 6) % 7)); const j = new Date(Date.UTC(x.getUTCFullYear(), 0, 4)); return 1 + Math.round(((x - j) / 864e5 - 3 + ((j.getUTCDay() + 6) % 7)) / 7); }
function kurzDatum(d){ return String(d.getUTCDate()).padStart(2, "0") + "." + String(d.getUTCMonth() + 1).padStart(2, "0") + "."; }
function plan(){
    if (!DATEN.jahresplan || !DATEN.jahresplan.start) {
        const s = montag(heuteUtc()), en = new Date(s); en.setUTCDate(en.getUTCDate() + 7 * 35);
        DATEN.jahresplan = { start: iso(s), ende: iso(en), wochen: {} };
    }
    if (!DATEN.jahresplan.wochen || Array.isArray(DATEN.jahresplan.wochen)) DATEN.jahresplan.wochen = {};
    return DATEN.jahresplan;
}
function planWochen(){
    const p = plan(), liste = [];
    let d = montag(tag(p.start)); const ende = tag(p.ende);
    while (d <= ende && liste.length < 60) { liste.push(new Date(d)); d.setUTCDate(d.getUTCDate() + 7); }
    return liste;
}
let planTimer = null;
function planSpeichern(){
    const st = document.getElementById("planStatus");
    if (st) { st.className = "speicherstatus"; st.textContent = "Speichert …"; }
    clearTimeout(planTimer);
    planTimer = setTimeout(async () => {
        try {
            await senden({ aktion: "jahresplan_speichern", jahresplan: DATEN.jahresplan });
            const s = document.getElementById("planStatus");
            if (s) { s.className = "speicherstatus ok"; s.innerHTML = '<i class="fa-solid fa-check"></i> Gespeichert'; }
        } catch (err) {
            const s = document.getElementById("planStatus");
            if (s) { s.className = "speicherstatus fehler"; s.textContent = err.message; }
            toast(err.message, true);
        }
    }, 700);
}
// Welche Stunde ist diese (oder die nächste offene) Woche dran?
function aktuelleWoche(){
    if (!DATEN.jahresplan) return null;
    const heute = montag(heuteUtc());
    for (const d of planWochen()) {
        if (d < heute) continue;
        const w = DATEN.jahresplan.wochen[iso(d)];
        if (w && w.einheit && !w.frei && !w.erledigt) return { datum: d, eintrag: w, einheit: finde(w.einheit), diese: +d === +heute };
    }
    return null;
}
function planVerwendung(e){
    if (!DATEN.jahresplan) return [];
    const ids = [e.id, e.ersetzt].filter(Boolean);
    return planWochen().filter(d => { const w = DATEN.jahresplan.wochen[iso(d)]; return w && ids.includes(w.einheit); });
}

/* ============================================================
   Ansichten
   ============================================================ */
let editor = null;   // { entwurf, geaendert, quelleId }
let ignoriereHash = false;

function reiterSetzen(name){
    document.querySelectorAll(".reiter a").forEach(a => a.classList.toggle("aktiv", a.dataset.reiter === name));
}
function route(){
    if (ignoriereHash) { ignoriereHash = false; return; }
    const [ansicht, id] = decodeURIComponent(location.hash.slice(1)).split("/");
    if (editor && editor.geaendert && ansicht !== "bearbeiten" && ansicht !== "neu") {
        if (!confirm("Deine Änderungen sind noch nicht gespeichert. Trotzdem verlassen?")) {
            ignoriereHash = true; history.back(); return;
        }
    }
    if (ansicht !== "bearbeiten" && ansicht !== "neu") editor = null;
    window.scrollTo(0, 0);
    if (ansicht === "stunde") return zeigeStunde(id);
    if (ansicht === "bearbeiten") return zeigeEditor(id);
    if (ansicht === "neu") return zeigeEditor(null);
    if (ansicht === "jahresplan") return zeigeJahresplan();
    if (ansicht === "rituale") return zeigeRituale();
    zeigeBibliothek();
}
window.addEventListener("hashchange", route);
// Zu einer Ansicht wechseln – auch wenn die Adresse gleich bleibt, wird neu gezeichnet
function gehe(hash){ if (location.hash === hash) route(); else location.hash = hash; }
window.addEventListener("beforeunload", ev => { if (editor && editor.geaendert) { ev.preventDefault(); ev.returnValue = ""; } });

/* ---------- Bibliothek ---------- */
let filterText = "", filterKat = "", filterOhne = false;
function zeigeBibliothek(){
    reiterSetzen("bibliothek");
    const kats = [...new Set([...KATEGORIEN, ...alleEinheiten().map(e => e.kategorie).filter(Boolean)])];
    inhalt.innerHTML = `
        <div id="dieseWoche"></div>
        <div class="werkzeug">
            <input type="search" id="suche" placeholder="Stunde suchen …" value="${esc(filterText)}">
            <select id="filterKat"><option value="">Alle Themen</option>${kats.map(k => `<option ${k === filterKat ? "selected" : ""}>${esc(k)}</option>`).join("")}</select>
            ${window.BEREICH.key === "vertretung" ? `<label class="ed-check" style="margin:0;background:white;border-radius:10px;padding:0 14px;display:flex;align-items:center;gap:8px;white-space:nowrap;width:auto"><input type="checkbox" id="nurOhne" style="width:auto;margin:0" ${filterOhne ? "checked" : ""}> nur ohne Vorbereitung</label>
            <button class="btn blau" id="zufall"><i class="fa-solid fa-dice"></i> Zufallsstunde</button>` : ""}
            <a class="btn gold" href="#neu"><i class="fa-solid fa-plus"></i> Neue Stunde</a>
        </div>
        <div id="kartenListe"></div>`;
    const dw = window.BEREICH.key === "sozial" ? aktuelleWoche() : null;
    if (dw && dw.einheit) {
        document.getElementById("dieseWoche").innerHTML = `<div class="diese-woche">
            <i class="fa-solid fa-calendar-day" style="font-size:26px;color:var(--gold)"></i>
            <div class="dw-text">${dw.diese ? "Diese Woche" : "Als Nächstes"}: ${esc(dw.einheit.titel)}<small>KW ${kw(dw.datum)} · ab ${kurzDatum(dw.datum)}${dw.eintrag.notiz ? " · " + esc(dw.eintrag.notiz) : ""}</small></div>
            <a class="btn blau" href="#stunde/${encodeURIComponent(dw.einheit.id)}">Öffnen</a></div>`;
    }
    const liste = () => {
        const q = filterText.toLowerCase();
        const alle = alleEinheiten().filter(e => (!filterKat || e.kategorie === filterKat) && (!filterOhne || e.ohneVorbereitung) &&
            (!q || [e.titel, e.kategorie, e.ziel12, e.ziel34, e.lerntext12?.titel, e.lerntext34?.titel].join(" ").toLowerCase().includes(q))).sort(katSort);
        const ziel = document.getElementById("kartenListe");
        if (!alle.length) { ziel.innerHTML = '<div class="leer">Keine Stunde gefunden.</div>'; return; }
        let html = "", letzte = null;
        for (const e of alle) {
            if (e.kategorie !== letzte) { if (letzte !== null) html += "</div>"; html += `<div class="kat-titel">${esc(e.kategorie || "Ohne Thema")}</div><div class="karten">`; letzte = e.kategorie; }
            const geplant = planVerwendung(e);
            html += `<a class="einheit-karte" href="#stunde/${encodeURIComponent(e.id)}">
                <div class="chips">${artChip(e)}${e.ohneVorbereitung ? '<span class="chip gruen"><i class="fa-solid fa-bolt"></i> ohne Vorbereitung</span>' : ""}${geplant.length ? `<span class="chip gold"><i class="fa-solid fa-calendar-check"></i> KW ${geplant.map(kw).join(", ")}</span>` : ""}</div>
                <h3>${esc(e.titel)}</h3>
                <p><strong>1/2:</strong> ${esc(e.ziel12)}</p><p><strong>3/4:</strong> ${esc(e.ziel34)}</p></a>`;
        }
        ziel.innerHTML = html + "</div>";
    };
    liste();
    document.getElementById("suche").addEventListener("input", ev => { filterText = ev.target.value; liste(); });
    document.getElementById("filterKat").addEventListener("change", ev => { filterKat = ev.target.value; liste(); });
    const nurOhne = document.getElementById("nurOhne");
    if (nurOhne) nurOhne.addEventListener("change", ev => { filterOhne = ev.target.checked; liste(); });
    const zufall = document.getElementById("zufall");
    if (zufall) zufall.addEventListener("click", () => {
        const pool = alleEinheiten().filter(e => (!filterKat || e.kategorie === filterKat) && (!filterOhne || e.ohneVorbereitung));
        if (!pool.length) { toast("Keine Stunde passt zum Filter.", true); return; }
        location.hash = "#stunde/" + encodeURIComponent(pool[Math.floor(Math.random() * pool.length)].id);
    });
}

/* ---------- Detail ---------- */
function zeigeStunde(id){
    reiterSetzen("bibliothek");
    const e = finde(id);
    if (!e) { inhalt.innerHTML = '<div class="leer">Diese Stunde gibt es nicht (mehr). <a href="#bibliothek">Zur Übersicht</a></div>'; return; }
    const wochen = planWochen();
    const heute = montag(heuteUtc());
    const kommende = wochen.filter(d => d >= heute);
    const geplant = planVerwendung(e);
    const bearbeitenKnopf = e._art === "vorlage"
        ? `<a class="btn nacht" href="#bearbeiten/${encodeURIComponent(e.id)}"><i class="fa-solid fa-pen"></i> Anpassen</a>`
        : `<a class="btn nacht" href="#bearbeiten/${encodeURIComponent(e.id)}"><i class="fa-solid fa-pen"></i> Bearbeiten</a>`;
    const loeschKnopf = e._art === "eigen" ? `<button class="btn rot" id="loeschen"><i class="fa-solid fa-trash"></i> Löschen</button>`
        : e._art === "angepasst" ? `<button class="btn rot" id="loeschen"><i class="fa-solid fa-rotate-left"></i> Original wiederherstellen</button>` : "";
    const uebungen = (e.uebungen || []).map(u => `<div class="uebung"><div class="uebung-kopf"><strong>${esc(u.titel)}</strong>
        <span class="chip ${u.fuer === "34" ? "gold" : u.fuer === "12" ? "" : "gruen"}">${FUER[u.fuer] || "Alle"}</span>${u.dauer ? `<span class="chip">${esc(u.dauer)}</span>` : ""}</div><div class="md">${md(u.text)}</div></div>`).join("");

    inhalt.innerHTML = `
        <div class="detail-kopf">
            <div class="titel"><a href="#bibliothek" style="color:var(--grau);font-weight:800;text-decoration:none"><i class="fa-solid fa-arrow-left"></i> Alle Stunden</a>
                <div style="margin-top:8px">${artChip(e)} ${e.ohneVorbereitung ? '<span class="chip gruen"><i class="fa-solid fa-bolt"></i> ohne Vorbereitung</span> ' : ""}<span class="chip">${esc(e.kategorie)}</span> <span class="chip">${esc(e.dauer || 40)} Min</span>
                ${geplant.length ? `<span class="chip gold"><i class="fa-solid fa-calendar-check"></i> geplant KW ${geplant.map(kw).join(", ")}</span>` : ""}
                ${(() => { if (!DATEN.jahresplan) return ""; const ids = [e.id, e.ersetzt].filter(Boolean);
                    const st = klassenStand(), mit = st.filter(x => x.gehalten.some(g => ids.includes(g.id))).map(x => x.k.name), nach = st.filter(x => x.nachholen.some(g => ids.includes(g.id))).map(x => x.k.name);
                    return (mit.length ? `<span class="chip gruen"><i class="fa-solid fa-check"></i> gehalten: ${esc(mit.join(", "))}</span> ` : "") + (nach.length ? `<span class="chip rot"><i class="fa-solid fa-rotate"></i> nachholen: ${esc(nach.join(", "))}</span>` : ""); })()}</div>
                <h2>${esc(e.titel)}</h2></div>
            <div class="knopfleiste">${bearbeitenKnopf}<button class="btn" id="kopieren"><i class="fa-solid fa-copy"></i> Als neue Stunde kopieren</button>${loeschKnopf}</div>
        </div>

        ${window.sozialPraesentation ? `<div class="karte" style="background:linear-gradient(135deg,#16324a,#3d7ea6);color:white">
            <h2 style="color:white"><i class="fa-solid fa-display"></i> Einstieg für die Tafel</h2>
            <p style="margin:0 0 14px;font-weight:700;opacity:.85">Interaktive Präsentation im Vollbild: Gefühls-Abstimmung, Geschichte mit Bildern und Vorlesestimme, Fragen, Daumen-Abstimmungen, Übungen mit Timer, Glücksrad „Wer ist dran?“ und Applauswelle. Steuerung mit Tippen, Pfeiltasten oder Presenter.</p>
            <div class="knopfleiste">
                <button class="btn gold" data-einstieg="12"><i class="fa-solid fa-play"></i> Starten (Geschichte Kl. 1/2)</button>
                <button class="btn" data-einstieg="34"><i class="fa-solid fa-play"></i> Starten (Geschichte Kl. 3/4)</button>
                <button class="btn" data-pptx="12"><i class="fa-solid fa-file-powerpoint"></i> PowerPoint Kl. 1/2</button>
                <button class="btn" data-pptx="34"><i class="fa-solid fa-file-powerpoint"></i> PowerPoint Kl. 3/4</button>
            </div></div>` : ""}
        ${(window.sozialMedien ? window.sozialMedien(e) : []).length ? `<div class="karte"><h2><i class="fa-solid fa-film"></i> Filme</h2>
            ${window.sozialMedien(e).map(m => `<div class="uebung"><div class="uebung-kopf"><strong><a href="${esc(m.url)}" target="_blank" rel="noopener">${esc(m.titel || m.url)}</a></strong>${m.quelle ? `<span class="chip">${esc(m.quelle)}</span>` : ""}${m.dauer ? `<span class="chip">${esc(m.dauer)}</span>` : ""}${m.fuer ? `<span class="chip gold">${esc(m.fuer)}</span>` : ""}</div>${m.hinweis ? `<div class="md"><p>${esc(m.hinweis)}</p></div>` : ""}</div>`).join("")}
            <p class="ed-hilfe">Mediathek-Links können nach einiger Zeit ablaufen – bitte vor der Stunde kurz prüfen. Eigene Filme trägst du über „Bearbeiten“ bzw. „Anpassen“ ein.</p></div>` : ""}
        <div class="karte"><h2><i class="fa-solid fa-print"></i> Drucken</h2>
            <div class="knopfleiste">
                <button class="btn blau" data-druck="lehrer"><i class="fa-solid fa-chalkboard-user"></i> Stundenvorbereitung</button>
                ${window.sozialRegie ? `<button class="btn blau" data-druck="regie12"><i class="fa-solid fa-list-ol"></i> Ablauf Schritt für Schritt Kl. 1/2</button>
                <button class="btn blau" data-druck="regie34"><i class="fa-solid fa-list-ol"></i> Ablauf Schritt für Schritt Kl. 3/4</button>` : ""}
                <button class="btn blau" data-druck="ab1"><i class="fa-solid fa-file"></i> Arbeitsblatt Kl. 1</button>
                <button class="btn blau" data-druck="ab2"><i class="fa-solid fa-file"></i> Arbeitsblatt Kl. 2</button>
                <button class="btn blau" data-druck="ab34"><i class="fa-solid fa-file"></i> Arbeitsblatt Kl. 3/4</button>
                <button class="btn gold" data-druck="alles"><i class="fa-solid fa-layer-group"></i> Alles zusammen</button>
            </div>
            <p class="ed-hilfe" style="margin-top:10px">Tipp: Im Druckfenster „Als PDF sichern“ wählen, um die Stunde als PDF abzulegen.</p>
        </div>

        ${window.sozialMaterial ? `<div class="karte"><div class="detail-kopf" style="margin:0 0 12px"><div class="titel"><h2 style="margin:0"><i class="fa-solid fa-scissors"></i> Arbeitsmaterial</h2>
            <p class="ed-hilfe" style="margin:4px 0 0">Karten, Plakate und Vorlagen für diese Stunde – jede Seite füllt genau eine A4-Seite.</p></div>
            <div class="knopfleiste"><button class="btn gold" id="materialAlle"><i class="fa-solid fa-print"></i> Alles Material drucken</button></div></div>
            <div class="m-uebersicht" id="materialListe"></div></div>` : ""}
        <div class="karte"><h2><i class="fa-solid fa-calendar-plus"></i> In den Jahresplan</h2>
            <div class="knopfleiste" style="align-items:center">
                <select id="planWoche" style="width:auto;flex:1 1 260px">${kommende.map(d => {
                    const w = DATEN.jahresplan?.wochen?.[iso(d)];
                    const belegt = w?.frei ? " – frei/Ferien" : w?.einheit ? " – belegt: " + (finde(w.einheit)?.titel || "?") : "";
                    return `<option value="${iso(d)}">KW ${kw(d)} · ${kurzDatum(d)}${esc(belegt)}</option>`; }).join("")}</select>
                <button class="btn gold" id="einplanen"><i class="fa-solid fa-check"></i> Eintragen</button>
            </div>
        </div>

        <div class="karte"><div class="zwei">
            <div><div class="stufe-label">Ziel Klasse 1/2</div><div style="font-weight:700">${inline(e.ziel12) || "–"}</div></div>
            <div><div class="stufe-label s34">Ziel Klasse 3/4</div><div style="font-weight:700">${inline(e.ziel34) || "–"}</div></div>
        </div>
            <h3>Material</h3>${materialListe(e.material).replace("<ul>", '<ul class="material-liste">')}
        </div>

        <div class="karte"><div class="detail-kopf" style="margin:0 0 12px"><div class="titel"><h2 style="margin:0">Stundenverlauf (${esc(e.dauer || 40)} Min)</h2>
            ${window.sozialRegie ? `<p class="ed-hilfe" style="margin:4px 0 0">„Schritt für Schritt“ erklärt dir jede Phase: was du tust, was du sagst und worauf du achtest.</p>` : ""}</div>
            ${window.sozialRegie ? `<div class="knopfleiste" id="verlaufWahl"><button class="btn nacht" data-va="tabelle">Überblick</button><button class="btn" data-va="12"><i class="fa-solid fa-list-ol"></i> Schritt für Schritt Kl. 1/2</button><button class="btn" data-va="34"><i class="fa-solid fa-list-ol"></i> Schritt für Schritt Kl. 3/4</button></div>` : ""}</div>
            <div id="verlaufInhalt" style="overflow-x:auto">${verlaufTabelle(e, "verlauf")}</div></div>

        <div class="karte"><h2>Lerntexte</h2><div class="zwei">
            <div class="lerntext"><div class="stufe-label">Klasse 1/2</div><h3>${esc(e.lerntext12?.titel || "–")}</h3><div class="md">${md(e.lerntext12?.text)}</div></div>
            <div class="lerntext"><div class="stufe-label s34">Klasse 3/4</div><h3>${esc(e.lerntext34?.titel || "–")}</h3><div class="md">${md(e.lerntext34?.text)}</div></div>
        </div></div>

        <div class="karte"><h2>Übungen</h2>${uebungen || '<div class="leer">Keine Übungen.</div>'}</div>

        <div class="karte"><h2>Arbeitsblätter</h2>
            <p class="ed-hilfe" style="margin:0 0 12px">Klasse 1 ist eine Vorlese-Fassung: Lies die Aufgaben und Antworten vor – die Farbsymbole zeigen die Zeile („Beim roten Kreis steht …“). Schreibaufgaben gibt es nur in Klasse 2.</p>
            <div class="vorschau-paar drei">
            <div><div class="stufe-label">Klasse 1</div><div class="vorschau" id="v1"></div><div class="vorschau-status"></div></div>
            <div><div class="stufe-label">Klasse 2</div><div class="vorschau" id="v2"></div><div class="vorschau-status"></div></div>
            <div><div class="stufe-label s34">Klasse 3/4</div><div class="vorschau" id="v34"></div><div class="vorschau-status"></div></div>
        </div></div>`;

    vorschauZeigen(document.getElementById("v1"), e, "1");
    vorschauZeigen(document.getElementById("v2"), e, "2");
    vorschauZeigen(document.getElementById("v34"), e, "34");
    inhalt.querySelectorAll("[data-druck]").forEach(b => b.addEventListener("click", () => drucken(e, b.dataset.druck)));
    const verlaufWahl = document.getElementById("verlaufWahl");
    if (verlaufWahl) {
        const zeigen = art => {
            verlaufWahl.querySelectorAll("[data-va]").forEach(b => b.classList.toggle("nacht", b.dataset.va === art));
            document.getElementById("verlaufInhalt").innerHTML = art === "tabelle" ? verlaufTabelle(e, "verlauf") : window.sozialRegie.bauen(e, art);
            try { localStorage.setItem("sozialVerlaufAnsicht", art); } catch (err) {}
        };
        verlaufWahl.querySelectorAll("[data-va]").forEach(b => b.addEventListener("click", () => zeigen(b.dataset.va)));
        let gemerkt = "tabelle";
        try { gemerkt = localStorage.getItem("sozialVerlaufAnsicht") || "tabelle"; } catch (err) {}
        if (gemerkt !== "tabelle") zeigen(gemerkt);
    }
    if (window.sozialMaterial) {
        window.sozialMaterial.cssLaden();
        const mats = window.sozialMaterial.fuer(e);
        const ml = document.getElementById("materialListe");
        ml.innerHTML = mats.length ? mats.map((m, k) => `<div class="m-eintrag"><div class="vorschau" data-mvorschau="${k}"></div>
            <strong>${esc(m.titel)}</strong><small>${window.sozialMaterial.seitenZahl(m)} Seite${window.sozialMaterial.seitenZahl(m) > 1 ? "n" : ""}${m.hinweis ? " · " + esc(m.hinweis) : ""}</small>
            <button class="btn klein blau" data-mdruck="${k}"><i class="fa-solid fa-print"></i> Drucken</button></div>`).join("") : '<div class="leer">Für diese Stunde ist kein Material hinterlegt. Über „Bearbeiten“ kannst du welches aus der Bibliothek auswählen.</div>';
        ml.querySelectorAll("[data-mvorschau]").forEach(r => window.sozialMaterial.vorschau(r, mats[+r.dataset.mvorschau]));
        ml.querySelectorAll("[data-mdruck]").forEach(b => b.addEventListener("click", () => window.sozialMaterial.drucken([mats[+b.dataset.mdruck]], e.titel + " – " + mats[+b.dataset.mdruck].titel)));
        const alle = document.getElementById("materialAlle");
        if (alle) { alle.disabled = !mats.length; alle.addEventListener("click", () => window.sozialMaterial.drucken(mats, e.titel + " – Material")); }
    }
    inhalt.querySelectorAll("[data-einstieg]").forEach(b => b.addEventListener("click", () => window.sozialPraesentation.starten(e, b.dataset.einstieg)));
    inhalt.querySelectorAll("[data-pptx]").forEach(b => b.addEventListener("click", async () => {
        const alt = b.innerHTML; b.disabled = true; b.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Wird erstellt …';
        try { await window.sozialPraesentation.pptx(e, b.dataset.pptx); toast("PowerPoint heruntergeladen"); }
        catch (err) { toast("PowerPoint konnte nicht erstellt werden: " + err.message, true); }
        b.disabled = false; b.innerHTML = alt;
    }));
    document.getElementById("kopieren").addEventListener("click", () => {
        editor = { entwurf: { ...sauber(e), id: undefined, ersetzt: undefined, titel: e.titel + " (Kopie)" }, geaendert: true, quelleId: null };
        ignoriereHash = true; location.hash = "#neu"; zeigeEditor(null, true);
    });
    const lk = document.getElementById("loeschen");
    if (lk) lk.addEventListener("click", async () => {
        const frage = e._art === "angepasst" ? `Deine Anpassungen an „${e.titel}“ verwerfen und die ursprüngliche Vorlage wiederherstellen?` : `„${e.titel}“ wirklich löschen?`;
        if (!confirm(frage)) return;
        try {
            await senden({ aktion: "einheit_loeschen", id: e.id });
            DATEN.einheiten = DATEN.einheiten.filter(x => x.id !== e.id);
            toast(e._art === "angepasst" ? "Original wiederhergestellt" : "Stunde gelöscht");
            gehe(e._art === "angepasst" ? "#stunde/" + encodeURIComponent(e.ersetzt) : "#bibliothek");
        } catch (err) { toast(err.message, true); }
    });
    document.getElementById("einplanen").addEventListener("click", () => {
        const datum = document.getElementById("planWoche").value;
        if (!datum) return;
        const p = plan();
        const alt = p.wochen[datum];
        if (alt && alt.einheit && !confirm("In dieser Woche ist schon „" + (finde(alt.einheit)?.titel || "eine Stunde") + "“ eingetragen. Ersetzen?")) return;
        p.wochen[datum] = { ...(alt || {}), einheit: e.ersetzt || e.id, frei: false };
        planSpeichern();
        toast("Eingetragen für KW " + kw(tag(datum)));
        setTimeout(() => zeigeStunde(id), 50);
    });
}

/* ---------- Editor ---------- */
function holen(o, pfad){ return pfad.split(".").reduce((x, k) => x == null ? x : x[k], o); }
function setzen(o, pfad, wert){
    const k = pfad.split("."); let x = o;
    for (let i = 0; i < k.length - 1; i++) { if (x[k[i]] == null) x[k[i]] = /^\d+$/.test(k[i + 1]) ? [] : {}; x = x[k[i]]; }
    x[k[k.length - 1]] = wert;
}
function zeilen(text){ return String(text || "").split("\n").map(s => s.trim()).filter(Boolean); }

function feld(label, pfad, wert, art = "text", extra = ""){
    if (art === "textarea") return `<label class="feld">${label}</label><textarea data-pfad="${pfad}" ${extra}>${esc(wert)}</textarea>`;
    return `<label class="feld">${label}</label><input type="text" data-pfad="${pfad}" value="${esc(wert)}" ${extra}>`;
}
function aufgabeEditor(stufe, i, a, anzahl){
    const p = `ab${stufe}.aufgaben.${i}`;
    let spezial = "";
    switch (a.typ) {
        case "schreiben":
            spezial = `<label class="feld">Anzahl Schreiblinien</label><input type="number" min="1" max="15" data-pfad="${p}.zeilen" data-art="zahl" value="${esc(a.zeilen || 2)}" style="width:110px">`; break;
        case "luecken":
            spezial = `<label class="feld">Sätze (einer pro Zeile)</label><textarea rows="4" data-pfad="${p}.saetze" data-art="luecken">${esc((a.saetze || []).map(s => s.replace(/\n/g, " // ")).join("\n"))}</textarea>
                <div class="ed-hilfe">___ = Schreiblinie · ☐ = Kästchen · // = Zeilenumbruch innerhalb eines Eintrags</div>
                <label class="ed-check"><input type="checkbox" data-pfad="${p}.nummern" data-art="check" ${a.nummern ? "checked" : ""}> nummerieren</label>`; break;
        case "ankreuzen":
            spezial = `<label class="feld">Antworten (eine pro Zeile)</label><textarea rows="4" data-pfad="${p}.optionen" data-art="liste">${esc((a.optionen || []).join("\n"))}</textarea>
                <div class="ed-hilfe">___ = Schreiblinie zum Selbst-Ausfüllen · [bild:keks] oder [gesicht:froh] vorn = Bild für Klasse 1/2 (Namen aus der Bildersammlung)</div>
                <label class="ed-check"><input type="checkbox" data-pfad="${p}.nebeneinander" data-art="check" ${a.nebeneinander ? "checked" : ""}> nebeneinander statt untereinander</label>`; break;
        case "zuordnen":
            spezial = `<div class="ed-paar"><div><label class="feld">Links (eine pro Zeile)</label><textarea rows="4" data-pfad="${p}.links" data-art="liste">${esc((a.links || []).join("\n"))}</textarea></div>
                <div><label class="feld">Rechts – schon gemischt</label><textarea rows="4" data-pfad="${p}.rechts" data-art="liste">${esc((a.rechts || []).join("\n"))}</textarea></div></div>
                <button class="btn klein" type="button" data-mischen="${p}" style="margin-top:6px"><i class="fa-solid fa-shuffle"></i> rechte Seite mischen</button>`; break;
        case "tabelle":
            spezial = `<label class="feld">Tabelle</label><textarea rows="5" data-pfad="${p}" data-art="tabelle">${esc([(a.spalten || []).join(" | "), ...(a.zeilen || []).map(z => z.join(" | "))].join("\n"))}</textarea>
                <div class="ed-hilfe">Erste Zeile = Überschriften. Spalten mit | trennen. Leere Zelle = Schreibfeld (z. B. „Ich bin froh. | “).</div>`; break;
        case "gesichter":
            spezial = `<label class="feld">Gefühle (eines pro Zeile)</label><textarea rows="3" data-pfad="${p}.gefuehle" data-art="liste">${esc((a.gefuehle || []).join("\n"))}</textarea>
                <div class="ed-hilfe">Erkannt werden z. B. froh, traurig, wütend, ängstlich, ruhig, überrascht, stolz.</div>
                <label class="ed-check"><input type="checkbox" data-pfad="${p}.leer" data-art="check" ${a.leer ? "checked" : ""}> leere Kreise – die Kinder malen das Gesicht selbst</label>`; break;
        case "malen":
            spezial = `<label class="feld">Bild zum Ausmalen</label><select data-pfad="${p}.bild">${Object.entries(BILDER).map(([k, v]) => `<option value="${k}" ${a.bild === k ? "selected" : ""}>${v}</option>`).join("")}</select>
                <div class="ed-hilfe">Das Malfeld wächst automatisch und füllt den freien Platz der Seite.</div>`; break;
    }
    return `<div class="ed-block">
        <div class="ed-block-kopf"><span class="nr">${i + 1}</span>
            <select data-typ="${p}">${Object.entries(TYPEN).map(([k, v]) => `<option value="${k}" ${a.typ === k ? "selected" : ""}>${v}</option>`).join("")}</select>
            <span class="platz"></span>
            <button class="btn klein" type="button" data-schieben="${stufe}|${i}|-1" ${i === 0 ? "disabled" : ""} title="nach oben"><i class="fa-solid fa-arrow-up"></i></button>
            <button class="btn klein" type="button" data-schieben="${stufe}|${i}|1" ${i === anzahl - 1 ? "disabled" : ""} title="nach unten"><i class="fa-solid fa-arrow-down"></i></button>
            <button class="btn klein rot" type="button" data-weg="${stufe}|${i}" title="entfernen"><i class="fa-solid fa-xmark"></i></button>
        </div>
        ${stufe === "12" ? `<label class="feld">Für</label><select data-pfad="${p}.nur" data-art="fuer" style="width:auto">
            ${[["", "Klasse 1 und 2"], ["1", "nur Klasse 1"], ["2", "nur Klasse 2 (z. B. Schreibaufgaben)"]].map(([k, v]) => `<option value="${k}" ${aufgabeFuer(a) === k ? "selected" : ""}>${v}</option>`).join("")}</select>` : ""}
        ${feld("Aufgabe (leer lassen = gehört zur vorherigen Aufgabe)", p + ".text", a.text)}
        ${spezial}
    </div>`;
}
function standardAufgabe(typ){
    return ({
        schreiben: { typ, text: "", zeilen: 3 }, luecken: { typ, text: "", saetze: ["___"], nummern: true },
        ankreuzen: { typ, text: "", optionen: [], nebeneinander: false }, zuordnen: { typ, text: "", links: [], rechts: [] },
        tabelle: { typ, text: "", spalten: ["", ""], zeilen: [["", ""]] }, gesichter: { typ, text: "", gefuehle: ["froh", "traurig", "wütend", "ängstlich"], leer: true },
        malen: { typ, text: "", bild: "" }
    })[typ];
}

function zeigeEditor(id, entwurfBehalten = false){
    reiterSetzen("bibliothek");
    if (!entwurfBehalten || !editor) {
        if (id) {
            const e = finde(id);
            if (!e) { inhalt.innerHTML = '<div class="leer">Diese Stunde gibt es nicht (mehr).</div>'; return; }
            const entwurf = sauber(e);
            if (e._art === "vorlage") { delete entwurf.id; entwurf.ersetzt = e.id; }
            editor = { entwurf, geaendert: false, quelleId: e.id, art: e._art };
        } else if (!editor) {
            editor = { entwurf: leereEinheit(), geaendert: false, quelleId: null, art: "neu" };
        }
    }
    const e = editor.entwurf;
    ["verlauf", "uebungen"].forEach(k => { if (!Array.isArray(e[k])) e[k] = []; });
    ["12", "34"].forEach(s => { if (!e["ab" + s]) e["ab" + s] = { titel: "", aufgaben: [] }; if (!e["lerntext" + s]) e["lerntext" + s] = { titel: "", text: "" }; });
    const kats = [...new Set([...KATEGORIEN, e.kategorie].filter(Boolean))];
    const ueberschrift = editor.art === "vorlage" ? "Vorlage anpassen" : editor.quelleId ? "Stunde bearbeiten" : "Neue Stunde";

    inhalt.innerHTML = `<div id="ed">
        <div class="detail-kopf"><div class="titel"><a href="${editor.quelleId ? "#stunde/" + encodeURIComponent(editor.quelleId) : "#bibliothek"}" style="color:var(--grau);font-weight:800;text-decoration:none"><i class="fa-solid fa-arrow-left"></i> Zurück</a>
            <h2>${ueberschrift}</h2></div></div>
        ${editor.art === "vorlage" ? '<div class="hinweis"><i class="fa-solid fa-circle-info"></i> Du passt eine fertige Vorlage an. Deine Fassung ersetzt danach die Vorlage – auch im Jahresplan. Das Original kannst du jederzeit wiederherstellen.</div>' : ""}

        <div class="karte"><h2>Grunddaten</h2>
            <div class="ed-raster">
                <div>${feld("Titel der Stunde", "titel", e.titel, "text", 'placeholder="z. B. Mutig sein"')}</div>
                <div><label class="feld">Thema</label><select data-pfad="kategorie">${kats.map(k => `<option ${k === e.kategorie ? "selected" : ""}>${esc(k)}</option>`).join("")}</select></div>
                <div>${feld("Ziel Klasse 1/2", "ziel12", e.ziel12)}</div>
                <div>${feld("Ziel Klasse 3/4", "ziel34", e.ziel34)}</div>
            </div>
            ${feld("Material (eines pro Zeile)", "material", e.material, "textarea", 'rows="3"')}
            <label class="ed-check"><input type="checkbox" data-pfad="ohneVorbereitung" data-art="check" ${e.ohneVorbereitung ? "checked" : ""}> Ohne Vorbereitung (nur Papier, Stifte, Tafel)</label>
            <label class="feld">Filme & Links für den Einstieg (einer pro Zeile)</label>
            <textarea rows="3" data-pfad="medien" data-art="medien" placeholder="Titel | https://… | Quelle, Dauer">${esc((window.sozialMedien ? window.sozialMedien(e) : (e.medien || [])).map(m => [m.titel || "", m.url, [m.quelle, m.dauer].filter(Boolean).join(", ")].join(" | ").replace(/ \| $/, "")).join("\n"))}</textarea>
            <div class="ed-hilfe">Format: Titel | Link | Quelle (optional). Die Filme erscheinen in der Tafel-Präsentation und auf der Stundenseite.</div>
        </div>

        <div class="karte"><h2>Stundenverlauf</h2><div id="edVerlauf"></div>
            <button class="btn klein" type="button" id="verlaufPlus"><i class="fa-solid fa-plus"></i> Zeile</button></div>

        <div class="karte"><h2>Lerntexte</h2><div class="zwei">
            <div><div class="stufe-label">Klasse 1/2</div>${feld("Titel", "lerntext12.titel", e.lerntext12.titel)}${feld("Text", "lerntext12.text", e.lerntext12.text, "textarea", 'rows="12"')}</div>
            <div><div class="stufe-label s34">Klasse 3/4</div>${feld("Titel", "lerntext34.titel", e.lerntext34.titel)}${feld("Text", "lerntext34.text", e.lerntext34.text, "textarea", 'rows="12"')}</div>
        </div><div class="ed-hilfe">Leerzeile = neuer Absatz · „- “ = Aufzählung · „1. “ = Nummerierung · **fett** · *kursiv*</div></div>

        <div class="karte"><h2>Übungen</h2><div id="edUebungen"></div>
            <button class="btn klein" type="button" id="uebungPlus"><i class="fa-solid fa-plus"></i> Übung</button></div>

        ${window.sozialMaterial ? (() => {
            const SM = window.sozialMaterial, gewaehlt = new Set(SM.bibIds(e)), gruppen = {};
            Object.entries(SM.bibliothek).forEach(([id, m]) => (gruppen[m.gruppe] = gruppen[m.gruppe] || []).push(id));
            const eigene = ((e.materialien && e.materialien.eigene) || []).map(k => "# " + (k.titel || "Eigene Karten") + "\n" + (k.karten || []).join("\n")).join("\n\n");
            return `<div class="karte" id="edMaterial"><h2>Arbeitsmaterial zum Ausdrucken</h2>
                <p class="ed-hilfe" style="margin-top:0">Wähle Vorlagen aus der Bibliothek. Situationskarten entstehen automatisch aus Übungen mit Aufzählung.</p>
                ${Object.keys(gruppen).map(g => `<details class="ed-block" ${gruppen[g].some(id => gewaehlt.has(id)) ? "open" : ""}><summary style="font-weight:900;cursor:pointer">${esc(g)}</summary>
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:4px 16px;margin-top:8px">${gruppen[g].map(id => `<label class="ed-check" style="margin:0"><input type="checkbox" data-mbib="${id}" ${gewaehlt.has(id) ? "checked" : ""}> ${esc(SM.bibliothek[id].titel)}</label>`).join("")}</div></details>`).join("")}
                <label class="ed-check"><input type="checkbox" data-mauto="1" ${e.materialien && e.materialien.ohneAuto ? "" : "checked"}> Situationskarten automatisch aus den Übungen erzeugen</label>
                <label class="feld">Eigene Kartensätze</label>
                <textarea rows="5" data-meigene="1" placeholder="# Titel des Kartensatzes&#10;Text der ersten Karte&#10;Text der zweiten Karte">${esc(eigene)}</textarea>
                <div class="ed-hilfe">Eine Zeile mit # beginnt einen neuen Kartensatz, jede weitere Zeile wird eine Karte (8 pro Seite).</div></div>`;
        })() : ""}
        ${["12", "34"].map(s => `<div class="karte"><h2>Arbeitsblatt Klasse ${s === "12" ? "1/2" : "3/4"}</h2>
            <div class="ed-ab">
                <div>${feld("Titel des Arbeitsblatts", `ab${s}.titel`, e["ab" + s].titel)}
                    <div id="edAufgaben${s}" style="margin-top:12px"></div>
                    <div class="knopfleiste"><select id="neuTyp${s}" style="width:auto">${Object.entries(TYPEN).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select>
                    <button class="btn klein" type="button" data-plus="${s}"><i class="fa-solid fa-plus"></i> Aufgabe</button></div>
                </div>
                <div class="ed-ab-vorschau">${s === "12" ? '<div class="ed-umschalter"><button class="btn klein aktiv" type="button" data-vstufe="1">Vorschau Kl. 1</button><button class="btn klein" type="button" data-vstufe="2">Vorschau Kl. 2</button></div>' : ""}<div class="vorschau" id="edV${s}"></div><div class="vorschau-status"></div></div>
            </div></div>`).join("")}

        <div class="speicherleiste">
            <a class="btn" href="${editor.quelleId ? "#stunde/" + encodeURIComponent(editor.quelleId) : "#bibliothek"}">Abbrechen</a>
            <button class="btn gold" id="speichern"><i class="fa-solid fa-floppy-disk"></i> Speichern</button>
        </div></div>`;
    const wurzel = document.getElementById("ed");

    const verlaufZeichnen = () => {
        document.getElementById("edVerlauf").innerHTML = e.verlauf.map((v, i) => `<div class="ed-zeile">
            <input type="text" data-pfad="verlauf.${i}.zeit" value="${esc(v.zeit)}" placeholder="Min">
            <input type="text" data-pfad="verlauf.${i}.phase" value="${esc(v.phase)}" placeholder="Phase">
            <textarea rows="1" data-pfad="verlauf.${i}.k12" placeholder="Klasse 1/2">${esc(v.k12)}</textarea>
            <textarea rows="1" data-pfad="verlauf.${i}.k34" placeholder="Klasse 3/4">${esc(v.k34)}</textarea>
            <button class="btn klein rot" type="button" data-verlaufweg="${i}" title="entfernen"><i class="fa-solid fa-xmark"></i></button></div>`).join("");
    };
    const uebungenZeichnen = () => {
        document.getElementById("edUebungen").innerHTML = e.uebungen.map((u, i) => `<div class="ed-block">
            <div class="ed-block-kopf"><span class="nr">${i + 1}</span>
                <input type="text" data-pfad="uebungen.${i}.titel" value="${esc(u.titel)}" placeholder="Name der Übung" style="flex:1 1 200px;width:auto">
                <select data-pfad="uebungen.${i}.fuer" style="width:auto">${Object.entries(FUER).map(([k, v]) => `<option value="${k}" ${u.fuer === k ? "selected" : ""}>${v}</option>`).join("")}</select>
                <input type="text" data-pfad="uebungen.${i}.dauer" value="${esc(u.dauer)}" placeholder="Dauer" style="width:90px">
                <button class="btn klein" type="button" data-uschieben="${i}|-1" ${i === 0 ? "disabled" : ""}><i class="fa-solid fa-arrow-up"></i></button>
                <button class="btn klein" type="button" data-uschieben="${i}|1" ${i === e.uebungen.length - 1 ? "disabled" : ""}><i class="fa-solid fa-arrow-down"></i></button>
                <button class="btn klein rot" type="button" data-uweg="${i}"><i class="fa-solid fa-xmark"></i></button></div>
            <textarea rows="4" data-pfad="uebungen.${i}.text" placeholder="So geht die Übung …">${esc(u.text)}</textarea></div>`).join("");
    };
    const aufgabenZeichnen = s => {
        const liste = e["ab" + s].aufgaben;
        document.getElementById("edAufgaben" + s).innerHTML = liste.length ? liste.map((a, i) => aufgabeEditor(s, i, a, liste.length)).join("") : '<div class="leer">Noch keine Aufgaben.</div>';
    };
    const vorschauTimer = {};
    let vorschauStufe = "1";
    const vorschau = (s, sofort) => {
        clearTimeout(vorschauTimer[s]);
        vorschauTimer[s] = setTimeout(() => vorschauZeigen(document.getElementById("edV" + s), e, s === "12" ? vorschauStufe : s), sofort ? 0 : 250);
    };
    const geaendert = () => { editor.geaendert = true; };

    verlaufZeichnen(); uebungenZeichnen(); aufgabenZeichnen("12"); aufgabenZeichnen("34");
    vorschau("12", true); vorschau("34", true);

    // Eingaben übernehmen
    const uebernehmen = ev => {
        const t = ev.target;
        const pfad = t.dataset.pfad;
        if (!pfad) return;
        const art = t.dataset.art;
        if (art === "check") setzen(e, pfad, t.checked);
        else if (art === "zahl") setzen(e, pfad, Math.max(1, Math.min(15, parseInt(t.value, 10) || 1)));
        else if (art === "liste") setzen(e, pfad, zeilen(t.value));
        else if (art === "luecken") setzen(e, pfad, zeilen(t.value).map(z => z.replace(/\s*\/\/\s*/g, "\n")));
        else if (art === "medien") setzen(e, pfad, zeilen(t.value).map(z => {
            const [titel, url, quelle] = z.split("|").map(x => (x || "").trim());
            const link = /^https?:\/\//i.test(url || "") ? url : (/^https?:\/\//i.test(titel) ? titel : "");
            return link ? { titel: link === titel ? "" : titel, url: link, quelle: quelle || "" } : null;
        }).filter(Boolean));
        else if (art === "tabelle") {
            const z = String(t.value).split("\n").filter(x => x.trim() !== "").map(x => x.split("|").map(c => c.trim()));
            const a = holen(e, pfad);
            a.spalten = z[0] || [];
            a.zeilen = z.slice(1);
        }
        else setzen(e, pfad, t.value);
        geaendert();
        const m = pfad.match(/^ab(12|34)\./);
        if (m) vorschau(m[1]);
    };
    wurzel.addEventListener("input", uebernehmen);
    const materialUebernehmen = () => {
        const box = document.getElementById("edMaterial"); if (!box) return;
        const bib = [...box.querySelectorAll("[data-mbib]")].filter(x => x.checked).map(x => x.dataset.mbib);
        const eigene = []; let aktuell = null;
        String(box.querySelector("[data-meigene]").value).split("\n").forEach(z => {
            const t = z.trim(); if (!t) return;
            if (t.startsWith("#")) { aktuell = { titel: t.replace(/^#+\s*/, ""), karten: [] }; eigene.push(aktuell); }
            else { if (!aktuell) { aktuell = { titel: "Eigene Karten", karten: [] }; eigene.push(aktuell); } aktuell.karten.push(t); }
        });
        e.materialien = { bib, eigene, ohneAuto: !box.querySelector("[data-mauto]").checked };
        geaendert();
    };
    const mBox = document.getElementById("edMaterial");
    if (mBox) { mBox.addEventListener("change", materialUebernehmen); mBox.addEventListener("input", ev => { if (ev.target.dataset.meigene) materialUebernehmen(); }); }
    wurzel.addEventListener("change", ev => {
        const t = ev.target;
        if (t.dataset.typ) {
            const mm = t.dataset.typ.match(/^ab(12|34)\.aufgaben\.(\d+)$/);
            if (!mm) return;
            const stufe = mm[1], idx = +mm[2];
            const alt = e["ab" + stufe].aufgaben[idx];
            e["ab" + stufe].aufgaben[idx] = { ...standardAufgabe(t.value), text: alt.text };
            geaendert(); aufgabenZeichnen(stufe); vorschau(stufe, true);
            return;
        }
        if (t.tagName === "SELECT" || t.type === "checkbox") uebernehmen(ev);
    });
    wurzel.addEventListener("click", ev => {
        const b = ev.target.closest("button");
        if (!b) return;
        if (b.id === "verlaufPlus") { e.verlauf.push({ zeit: "", phase: "", k12: "", k34: "" }); geaendert(); verlaufZeichnen(); }
        else if (b.dataset.verlaufweg != null) { e.verlauf.splice(+b.dataset.verlaufweg, 1); geaendert(); verlaufZeichnen(); }
        else if (b.id === "uebungPlus") { e.uebungen.push({ titel: "", fuer: "alle", dauer: "", text: "" }); geaendert(); uebungenZeichnen(); }
        else if (b.dataset.uweg != null) { if (confirm("Übung entfernen?")) { e.uebungen.splice(+b.dataset.uweg, 1); geaendert(); uebungenZeichnen(); } }
        else if (b.dataset.uschieben) { const [i, r] = b.dataset.uschieben.split("|").map(Number); const x = e.uebungen.splice(i, 1)[0]; e.uebungen.splice(i + r, 0, x); geaendert(); uebungenZeichnen(); }
        else if (b.dataset.plus) { const s = b.dataset.plus; e["ab" + s].aufgaben.push(standardAufgabe(document.getElementById("neuTyp" + s).value)); geaendert(); aufgabenZeichnen(s); vorschau(s, true); }
        else if (b.dataset.weg) { const [s, i] = b.dataset.weg.split("|"); if (confirm("Aufgabe entfernen?")) { e["ab" + s].aufgaben.splice(+i, 1); geaendert(); aufgabenZeichnen(s); vorschau(s, true); } }
        else if (b.dataset.schieben) { const [s, i, r] = b.dataset.schieben.split("|"); const l = e["ab" + s].aufgaben; const x = l.splice(+i, 1)[0]; l.splice(+i + +r, 0, x); geaendert(); aufgabenZeichnen(s); vorschau(s, true); }
        else if (b.dataset.mischen) {
            const a = holen(e, b.dataset.mischen); const r = [...(a.rechts || [])];
            for (let k = r.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [r[k], r[j]] = [r[j], r[k]]; }
            a.rechts = r; geaendert(); const s = b.dataset.mischen.slice(2, 4); aufgabenZeichnen(s); vorschau(s, true);
        }
        else if (b.dataset.vstufe) {
            vorschauStufe = b.dataset.vstufe;
            wurzel.querySelectorAll("[data-vstufe]").forEach(x => x.classList.toggle("aktiv", x === b));
            vorschau("12", true);
        }
        else if (b.id === "speichern") speichern();
    });

    async function speichern(){
        if (!String(e.titel || "").trim()) { toast("Bitte einen Titel eingeben.", true); wurzel.querySelector('[data-pfad="titel"]').focus(); return; }
        const knopf = document.getElementById("speichern");
        knopf.disabled = true;
        try {
            const antwort = await senden({ aktion: "einheit_speichern", einheit: sauber(e) });
            const gespeichert = { ...sauber(e), id: antwort.id, geaendert: antwort.geaendert };
            const i = DATEN.einheiten.findIndex(x => x.id === antwort.id);
            if (i >= 0) DATEN.einheiten[i] = gespeichert; else DATEN.einheiten.push(gespeichert);
            editor.geaendert = false;
            toast("Gespeichert");
            gehe("#stunde/" + encodeURIComponent(antwort.id));
        } catch (err) { toast(err.message, true); knopf.disabled = false; }
    }
}

/* ---------- Jahresplan ---------- */
/* ---------- Klassen im Jahresplan (z. B. GS1–GS4) ---------- */
const KLASSEN_STANDARD = [{ id: "gs1", name: "GS1", stufe: "12" }, { id: "gs2", name: "GS2", stufe: "12" }, { id: "gs3", name: "GS3", stufe: "34" }, { id: "gs4", name: "GS4", stufe: "34" }];
const STATUS = { "": { zeichen: "○", text: "offen" }, gehalten: { zeichen: "✓", text: "gehalten" }, ausgefallen: { zeichen: "✗", text: "ausgefallen" } };
const STATUS_FOLGE = ["", "gehalten", "ausgefallen"];
function planKlassen(){
    const p = plan();
    if (window.BEREICH.key === "vertretung") return [];
    if (!Array.isArray(p.klassen)) p.klassen = KLASSEN_STANDARD.map(k => ({ ...k }));
    return p.klassen;
}
// Eintrag einer Klasse in einer Woche (ältere Pläne: „erledigt“ gilt für alle Klassen)
function klasseInWoche(w, k){
    const x = (w.klassen && w.klassen[k.id]) || {};
    return { status: x.status || (w.erledigt && !w.klassen ? "gehalten" : ""), einheit: x.einheit || "", notiz: x.notiz || "" };
}
function einheitFuer(w, k){ const x = klasseInWoche(w, k); return x.einheit || w.einheit || ""; }
// Auswertung je Klasse: gehalten · ausgefallen · nachzuholen (ausgefallen und später nicht gehalten)
function klassenStand(){
    const p = plan(), wochen = planWochen();
    return planKlassen().map(k => {
        const gehalten = [], ausgefallen = [];
        wochen.forEach(d => {
            const w = p.wochen[iso(d)];
            if (!w || w.frei) return;
            const x = klasseInWoche(w, k), id = einheitFuer(w, k);
            if (x.status === "gehalten" && id) gehalten.push({ d, id });
            if (x.status === "ausgefallen" && id) ausgefallen.push({ d, id });
            // Klasse hat in dieser Woche etwas anderes gemacht (z. B. nachgeholt) → das geplante Thema fehlt ihr noch
            if (x.status === "gehalten" && w.einheit && id !== w.einheit) ausgefallen.push({ d, id: w.einheit, verschoben: true });
        });
        const gehaltenIds = new Set(gehalten.map(g => finde(g.id)?.id || g.id));
        const nachholen = ausgefallen.filter(a => !gehaltenIds.has(finde(a.id)?.id || a.id));
        return { k, gehalten, ausgefallen, nachholen };
    });
}
function zeigeJahresplan(){
    reiterSetzen("jahresplan");
    const p = plan();
    const klassen = planKlassen();
    const wochen = planWochen();
    const heute = montag(heuteUtc());
    const alle = alleEinheiten().sort(katSort);
    const gruppen = [...new Set(alle.map(e => e.kategorie))];
    const optionen = (sel, leerText = "– noch offen –", mitFrei = true) => `<option value="">${leerText}</option>${mitFrei ? `<option value="@frei" ${sel === "@frei" ? "selected" : ""}>Ferien / fällt aus</option>` : ""}` +
        gruppen.map(g => `<optgroup label="${esc(g)}">${alle.filter(e => e.kategorie === g).map(e => {
            const wert = e.ersetzt || e.id;
            return `<option value="${esc(wert)}" ${sel === wert || sel === e.id ? "selected" : ""}>${esc(e.titel)}</option>`; }).join("")}</optgroup>`).join("");
    const verplant = new Set(Object.values(p.wochen).map(w => w && w.einheit).filter(Boolean).map(id => finde(id)?.id));
    const offen = alle.filter(e => !verplant.has(e.id));
    const anzahl = wochen.filter(d => p.wochen[iso(d)]?.einheit).length;
    const stand = klassenStand();
    const stufeName = st => st === "34" ? "Kl. 3/4" : "Kl. 1/2";

    inhalt.innerHTML = `
        <div class="karte"><h2>Schuljahr</h2>
            <div class="plan-einstellung">
                <div><label class="feld">Erste Woche</label><input type="date" id="planStart" value="${esc(p.start)}"></div>
                <div><label class="feld">Letzte Woche</label><input type="date" id="planEnde" value="${esc(p.ende)}"></div>
                <div style="flex:1 1 200px"><span class="speicherstatus" id="planStatus"></span></div>
            </div>
            <p style="margin:12px 0 0;font-weight:700">${anzahl} von ${wochen.length} Wochen verplant</p>
            ${klassen.length ? `<details class="ed-block" style="margin:14px 0 0"><summary style="font-weight:900;cursor:pointer">Meine Klassen (${klassen.map(k => esc(k.name)).join(", ")}) bearbeiten</summary>
                <div id="klassenListe" style="display:flex;flex-direction:column;gap:8px;margin-top:10px">${klassen.map((k, i) => `<div class="kl-zeile" data-i="${i}">
                    <input type="text" class="kl-name" value="${esc(k.name)}" maxlength="12" style="max-width:140px">
                    <select class="kl-stufe" style="max-width:140px"><option value="12" ${k.stufe === "12" ? "selected" : ""}>Kl. 1/2</option><option value="34" ${k.stufe === "34" ? "selected" : ""}>Kl. 3/4</option></select>
                    <button class="btn klein rot kl-weg" title="Klasse entfernen"><i class="fa-solid fa-trash"></i></button></div>`).join("")}</div>
                <button class="btn klein" id="klasseNeu" style="margin-top:10px"><i class="fa-solid fa-plus"></i> Klasse hinzufügen</button>
                <p class="ed-hilfe">Nur Klassenbezeichnungen – keine Namen von Kindern.</p></details>` : ""}
        </div>
        ${klassen.length ? `<div class="karte"><h2>Stand je Klasse</h2><div class="kl-stand">${stand.map(s => `<div class="kl-karte">
            <div class="kl-kopf"><b>${esc(s.k.name)}</b><span class="chip ${s.k.stufe === "34" ? "gold" : ""}">${stufeName(s.k.stufe)}</span></div>
            <div class="kl-zahlen"><span class="ok">✓ ${s.gehalten.length} gehalten</span><span class="aus">✗ ${s.ausgefallen.filter(a => !a.verschoben).length} ausgefallen</span></div>
            ${s.nachholen.length ? `<div class="kl-nach"><b>Nachholen:</b> ${s.nachholen.map(n => { const e = finde(n.id); return e ? `<a href="#stunde/${encodeURIComponent(e.id)}">${esc(e.titel)}</a> <small>(KW ${kw(n.d)})</small>` : ""; }).join(", ")}</div>` : `<div class="kl-nach leer">Nichts nachzuholen 👍</div>`}
            </div>`).join("")}</div></div>` : ""}
        ${offen.length ? `<div class="karte"><h2>Noch nicht verplant</h2><div class="chips" style="display:flex;gap:8px;flex-wrap:wrap">${offen.map(e => `<a class="chip" style="text-decoration:none;font-size:13px" href="#stunde/${encodeURIComponent(e.id)}">${esc(e.titel)}</a>`).join("")}</div></div>` : ""}
        <div class="karte" style="padding:12px 14px">
            ${klassen.length ? `<p class="ed-hilfe" style="margin:0 0 8px">Klick auf das Kästchen einer Klasse: ○ offen → ✓ gehalten → ✗ ausgefallen. Mit <i class="fa-solid fa-sliders"></i> kannst du für eine Klasse ein anderes Thema (z. B. Nachholstunde) und eine Notiz eintragen.</p>` : ""}
            <div style="overflow-x:auto"><table class="plan">
            <thead><tr><th>KW</th><th>Woche ab</th><th>Stunde</th>${klassen.map(k => `<th class="kl-th" title="${stufeName(k.stufe)}">${esc(k.name)}</th>`).join("")}<th>Notiz</th>${klassen.length ? "" : `<th title="erledigt"><i class="fa-solid fa-check"></i></th>`}<th></th></tr></thead>
            <tbody>${wochen.map(d => {
                const k = iso(d), w = p.wochen[k] || {};
                const wert = w.frei ? "@frei" : (w.einheit || "");
                const e = w.einheit && !w.frei ? finde(w.einheit) : null;
                const fehlt = w.einheit && !w.frei && !e;
                const zellen = klassen.map(kl => {
                    const x = klasseInWoche(w, kl);
                    const anders = x.einheit && x.einheit !== w.einheit ? finde(x.einheit) : null;
                    return `<td class="kl-zelle"><button class="kl-status ${x.status || "offen"}" data-kl="${esc(kl.id)}" ${w.frei ? "disabled" : ""} title="${esc(kl.name)}: ${STATUS[x.status].text}${anders ? " · " + esc(anders.titel) : ""}${x.notiz ? " · " + esc(x.notiz) : ""}">${STATUS[x.status].zeichen}</button>${anders || x.notiz ? '<span class="kl-punkt" title="eigenes Thema / Notiz"></span>' : ""}</td>`;
                }).join("");
                const details = klassen.length && !w.frei ? `<tr class="kl-details" data-fuer="${k}" hidden><td colspan="${5 + klassen.length}"><div class="kl-detail-raster">${klassen.map(kl => {
                    const x = klasseInWoche(w, kl);
                    return `<div class="kl-detail" data-kl="${esc(kl.id)}"><b>${esc(kl.name)}</b>
                        <select class="kl-d-status">${STATUS_FOLGE.map(st => `<option value="${st}" ${x.status === st ? "selected" : ""}>${STATUS[st].zeichen} ${STATUS[st].text}</option>`).join("")}</select>
                        <select class="kl-d-einheit">${optionen(x.einheit, "wie geplant", false)}</select>
                        <input type="text" class="kl-d-notiz" value="${esc(x.notiz)}" placeholder="Notiz (z. B. Ausflug, Wandertag)"></div>`; }).join("")}</div></td></tr>` : "";
                return `<tr data-woche="${k}" class="${+d === +heute ? "jetzt" : ""} ${w.frei ? "frei" : ""} ${w.erledigt ? "erledigt" : ""}">
                    <td class="kw">KW ${kw(d)}</td><td class="datum">${kurzDatum(d)}${+d === +heute ? ' <span class="chip gold">jetzt</span>' : ""}</td>
                    <td><select class="plan-wahl">${optionen(wert)}${fehlt ? `<option value="${esc(w.einheit)}" selected>(gelöschte Stunde)</option>` : ""}</select></td>
                    ${zellen}
                    <td><input type="text" class="plan-notiz" value="${esc(w.notiz || "")}" placeholder="Notiz"></td>
                    ${klassen.length ? "" : `<td><input type="checkbox" class="plan-erledigt" ${w.erledigt ? "checked" : ""} ${w.frei ? "disabled" : ""} title="erledigt"></td>`}
                    <td style="white-space:nowrap">${klassen.length && !w.frei ? `<button class="btn klein kl-mehr" title="Je Klasse: anderes Thema, Notiz"><i class="fa-solid fa-sliders"></i></button> ` : ""}${e ? `<a class="btn klein" href="#stunde/${encodeURIComponent(e.id)}" title="öffnen"><i class="fa-solid fa-arrow-right"></i></a>` : ""}</td></tr>${details}`;
            }).join("")}</tbody></table></div></div>`;

    const datumAendern = () => {
        const s = document.getElementById("planStart").value, en = document.getElementById("planEnde").value;
        if (!s || !en || s > en) { toast("Bitte gültige Daten eingeben (erste Woche vor letzter Woche).", true); return; }
        if ((tag(en) - tag(s)) / 864e5 > 7 * 59) { toast("Höchstens 60 Wochen.", true); return; }
        p.start = iso(montag(tag(s))); p.ende = en;
        planSpeichern(); zeigeJahresplan();
    };
    document.getElementById("planStart").addEventListener("change", datumAendern);
    document.getElementById("planEnde").addEventListener("change", datumAendern);

    // Klassen bearbeiten
    const kl = document.getElementById("klassenListe");
    if (kl) {
        kl.querySelectorAll(".kl-zeile").forEach(z => {
            const k = p.klassen[+z.dataset.i];
            z.querySelector(".kl-name").addEventListener("change", ev => { k.name = ev.target.value.trim().slice(0, 12) || k.name; planSpeichern(); zeigeJahresplan(); });
            z.querySelector(".kl-stufe").addEventListener("change", ev => { k.stufe = ev.target.value; planSpeichern(); zeigeJahresplan(); });
            z.querySelector(".kl-weg").addEventListener("click", () => {
                if (!confirm(`Klasse ${k.name} entfernen? Die Häkchen dieser Klasse werden nicht mehr angezeigt.`)) return;
                p.klassen.splice(+z.dataset.i, 1); planSpeichern(); zeigeJahresplan();
            });
        });
        document.getElementById("klasseNeu").addEventListener("click", () => {
            if (p.klassen.length >= 8) { toast("Höchstens 8 Klassen.", true); return; }
            let n = p.klassen.length + 1; while (p.klassen.some(k => k.id === "gs" + n)) n++;
            p.klassen.push({ id: "gs" + n, name: "GS" + n, stufe: "12" }); planSpeichern(); zeigeJahresplan();
            const d = inhalt.querySelector("details"); if (d) d.open = true;
        });
    }

    inhalt.querySelectorAll("tr[data-woche]").forEach(tr => {
        const k = tr.dataset.woche;
        const eintrag = () => (p.wochen[k] = p.wochen[k] || {});
        const klEintrag = id => { const w = eintrag(); if (!w.klassen) { w.klassen = {}; if (w.erledigt) planKlassen().forEach(x => w.klassen[x.id] = { status: "gehalten" }); } return (w.klassen[id] = w.klassen[id] || {}); };
        tr.querySelector(".plan-wahl").addEventListener("change", ev => {
            const v = ev.target.value, w = eintrag();
            if (v === "@frei") { w.frei = true; w.einheit = ""; w.erledigt = false; }
            else { w.frei = false; w.einheit = v; }
            planSpeichern(); zeigeJahresplan();
        });
        tr.querySelector(".plan-notiz").addEventListener("input", ev => { eintrag().notiz = ev.target.value; planSpeichern(); });
        const erl = tr.querySelector(".plan-erledigt");
        if (erl) erl.addEventListener("change", ev => { eintrag().erledigt = ev.target.checked; tr.classList.toggle("erledigt", ev.target.checked); planSpeichern(); });
        tr.querySelectorAll(".kl-status").forEach(btn => btn.addEventListener("click", () => {
            const x = klEintrag(btn.dataset.kl);
            x.status = STATUS_FOLGE[(STATUS_FOLGE.indexOf(x.status || "") + 1) % STATUS_FOLGE.length];
            planSpeichern(); zeigeJahresplanBehalten();
        }));
        const mehr = tr.querySelector(".kl-mehr"), det = inhalt.querySelector(`tr.kl-details[data-fuer="${k}"]`);
        if (mehr && det) {
            mehr.addEventListener("click", () => { det.hidden = !det.hidden; });
            det.querySelectorAll(".kl-detail").forEach(box => {
                const id = box.dataset.kl;
                box.querySelector(".kl-d-status").addEventListener("change", ev => { klEintrag(id).status = ev.target.value; planSpeichern(); });
                box.querySelector(".kl-d-einheit").addEventListener("change", ev => { klEintrag(id).einheit = ev.target.value; planSpeichern(); });
                box.querySelector(".kl-d-notiz").addEventListener("input", ev => { klEintrag(id).notiz = ev.target.value.slice(0, 200); planSpeichern(); });
                // Zeile neu zeichnen, wenn die Details zugeklappt werden
            });
            mehr.addEventListener("click", () => { if (det.hidden) zeigeJahresplanBehalten(); });
        }
    });
}
// neu zeichnen und Scrollposition behalten
function zeigeJahresplanBehalten(){ const y = window.scrollY; zeigeJahresplan(); window.scrollTo(0, y); }

/* ---------- Material-Bibliothek (alle Vorlagen nach Thema) ---------- */
function materialEintraege(ids, ziel){
    const SM = window.sozialMaterial; SM.cssLaden();
    const mats = ids.map(id => Object.assign({ id }, SM.bibliothek[id]));
    ziel.innerHTML = mats.map((m, k) => `<div class="m-eintrag"><div class="vorschau" data-k="${k}"></div><strong>${esc(m.titel)}</strong><small>${SM.seitenZahl(m)} Seite${SM.seitenZahl(m) > 1 ? "n" : ""}${m.hinweis ? " · " + esc(m.hinweis) : ""}</small><button class="btn klein blau" data-d="${k}"><i class="fa-solid fa-print"></i> Drucken</button></div>`).join("");
    ziel.querySelectorAll("[data-k]").forEach(r => SM.vorschau(r, mats[+r.dataset.k]));
    ziel.querySelectorAll("[data-d]").forEach(btn => btn.addEventListener("click", () => SM.drucken([mats[+btn.dataset.d]], mats[+btn.dataset.d].titel)));
}
function materialBibliothekZeigen(bib){
    const SM = window.sozialMaterial, gruppen = {};
    Object.entries(SM.bibliothek).forEach(([id, m]) => (gruppen[m.gruppe] = gruppen[m.gruppe] || []).push(id));
    // Im Vertretungsbereich die Vertretungs-Vorlagen zuerst
    const namen = Object.keys(gruppen).sort((a, b) => (window.BEREICH.key === "vertretung" ? (b.startsWith("Vertretung") - a.startsWith("Vertretung")) : (a.startsWith("Vertretung") - b.startsWith("Vertretung"))));
    bib.innerHTML = namen.map((g, k) => `<details class="ed-block" data-g="${esc(g)}"><summary style="font-weight:900;cursor:pointer">${esc(g)} <span class="chip">${gruppen[g].length}</span></summary><div class="m-uebersicht" style="margin-top:12px"></div></details>`).join("");
    bib.querySelectorAll("details").forEach(d => d.addEventListener("toggle", () => { const z = d.querySelector(".m-uebersicht"); if (d.open && !z.childElementCount) materialEintraege(gruppen[d.dataset.g], z); }));
}

/* ---------- Rituale ---------- */
function rituale(){ return typeof DATEN.rituale === "string" && DATEN.rituale.trim() ? DATEN.rituale : (window.SOZIAL_RITUALE_STANDARD || ""); }
function zeigeRituale(bearbeiten = false){
    reiterSetzen("rituale");
    const SM = window.sozialMaterial || {};
    if (!bearbeiten && window.BEREICH.key === "vertretung") {
        inhalt.innerHTML = window.sozialMaterial ? `<div class="karte"><h2><i class="fa-solid fa-box-archive"></i> Material-Bibliothek</h2><p class="ed-hilfe" style="margin-top:0">Alle Vorlagen zum Ausdrucken. Thema aufklappen, um die Vorschau zu sehen.</p><div id="ritBib"></div></div>` : "";
        if (window.sozialMaterial) materialBibliothekZeigen(document.getElementById("ritBib"));
        return;
    }
    if (!bearbeiten) {
        inhalt.innerHTML = `<div class="karte"><div class="detail-kopf" style="margin:0"><div class="titel"><h2 style="margin:0">Feste Rituale</h2>
            <p style="color:var(--grau);font-weight:700;margin:6px 0 0">Gelten für jede Stunde – geben den Kindern Sicherheit und sparen Erklärzeit.</p></div>
            <div class="knopfleiste"><button class="btn nacht" id="ritBearb"><i class="fa-solid fa-pen"></i> Bearbeiten</button>
            <button class="btn blau" id="ritDruck"><i class="fa-solid fa-print"></i> Drucken</button></div></div>
            <div class="md" style="margin-top:16px">${md(rituale())}</div></div>
            ${window.sozialMaterial ? `<div class="karte"><div class="detail-kopf" style="margin:0 0 6px"><div class="titel"><h2 style="margin:0"><i class="fa-solid fa-scissors"></i> Material für die Rituale</h2>
                <p class="ed-hilfe" style="margin:4px 0 0">Einmal drucken (am besten laminieren) – hält das ganze Schuljahr.</p></div>
                <div class="knopfleiste"><button class="btn gold" id="ritAlles"><i class="fa-solid fa-print"></i> Ritual-Set komplett drucken</button></div></div>
                ${(SM.rituale || []).map((g, k) => `<div class="rit-gruppe"><h3>${esc(g.ritual)}</h3><p class="ed-hilfe" style="margin:0 0 10px">${esc(g.text)}</p><div class="m-uebersicht" id="ritMat${k}"></div></div>`).join("")}</div>
            <div class="karte"><h2><i class="fa-solid fa-box-archive"></i> Ganze Material-Bibliothek</h2><p class="ed-hilfe" style="margin-top:0">Alle Vorlagen zum Ausdrucken – auch für eigene Stunden. Thema aufklappen, um die Vorschau zu sehen.</p><div id="ritBib"></div></div>` : ""}`;
        document.getElementById("ritBearb").onclick = () => zeigeRituale(true);
        if (window.sozialMaterial) {
            (SM.rituale || []).forEach((g, k) => materialEintraege(g.ids, document.getElementById("ritMat" + k)));
            document.getElementById("ritAlles").onclick = () => SM.drucken(SM.allgemein.map(id => Object.assign({ id }, SM.bibliothek[id])), "Ritual-Set Sozialtraining");
            materialBibliothekZeigen(document.getElementById("ritBib"));
        }
        document.getElementById("ritDruck").onclick = () => drucken(null, "rituale");
        return;
    }
    inhalt.innerHTML = `<div class="karte"><h2>Rituale bearbeiten</h2>
        <textarea id="ritText" rows="22">${esc(rituale())}</textarea>
        <div class="ed-hilfe">### = Zwischenüberschrift · „1. “ = Nummerierung · **fett**</div>
        <div class="knopfleiste" style="margin-top:12px;justify-content:flex-end">
            <button class="btn rot" id="ritStandard"><i class="fa-solid fa-rotate-left"></i> Standard wiederherstellen</button>
            <button class="btn" id="ritAbbr">Abbrechen</button>
            <button class="btn gold" id="ritSpeichern"><i class="fa-solid fa-floppy-disk"></i> Speichern</button></div></div>`;
    const speichern = async wert => {
        try { await senden({ aktion: "rituale_speichern", rituale: wert }); DATEN.rituale = wert; toast("Gespeichert"); zeigeRituale(); }
        catch (err) { toast(err.message, true); }
    };
    document.getElementById("ritAbbr").onclick = () => zeigeRituale();
    document.getElementById("ritSpeichern").onclick = () => speichern(document.getElementById("ritText").value);
    document.getElementById("ritStandard").onclick = () => { if (confirm("Deine Rituale verwerfen und den Standardtext wiederherstellen?")) speichern(null); };
}

route();
</script>
<?php foreach (["sozial-medien.js", "sozial-praesentation.js", "sozial-material.js", "sozial-regie.js"] as $zusatz): if (file_exists(__DIR__ . "/" . $zusatz)): ?>
<script src="<?= $zusatz ?>?v=<?= @filemtime(__DIR__ . "/" . $zusatz) ?: 1 ?>"></script>
<?php endif; endforeach; ?>
<script>
// Ansicht neu zeichnen, sobald Präsentation und Filmliste geladen sind (Knöpfe/Filme erscheinen dann)
if (location.hash.startsWith("#stunde/")) route();
</script>
</body>
</html>
