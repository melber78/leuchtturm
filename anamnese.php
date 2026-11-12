<?php $LT_GAST_BEREICH = "anamnese"; require __DIR__ . "/gast-zugang.php"; ?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Anamnesebogen · Leuchtturm</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<style>
/* =================== Bildschirm (Leuchtturm-Stil) =================== */
:root{ --nacht:#16324a; --meer:#3d7ea6; --gold:#f2a93b; --schaum:#f4f6f4; --text:#1f2d36; --schatten:0 6px 24px rgba(22,50,74,.1); }
*{ box-sizing:border-box; }
body{ margin:0; background:var(--schaum); color:var(--text); font-family:"Nunito",sans-serif; line-height:1.5; }
.wrap{ width:min(900px, calc(100% - 32px)); margin:24px auto 90px; }
.zurueck{ display:inline-block; margin-bottom:16px; color:#7c8a94; font-weight:800; font-size:13px; text-decoration:none; }
header.kopf{ background:linear-gradient(135deg, var(--nacht), var(--meer)); border-radius:24px; color:#fff; padding:24px 28px; box-shadow:var(--schatten); margin-bottom:16px; }
header.kopf h1{ font-size:26px; font-weight:900; margin:0 0 4px; }
header.kopf p{ font-size:14px; opacity:.9; font-weight:700; margin:0; }
.hinweis{ background:#fff8e6; border:2px solid var(--gold); border-radius:16px; padding:10px 16px; font-size:13px; font-weight:700; color:#7a5d00; margin-bottom:16px; display:flex; gap:10px; align-items:flex-start; }
.hinweis i{ margin-top:3px; }

.tabs{ display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap; }
.tab{ flex:1; min-width:160px; border:none; background:#fff; border-radius:16px; padding:14px 16px; font:800 15px "Nunito",sans-serif; color:var(--nacht); box-shadow:var(--schatten); cursor:pointer; display:flex; gap:10px; align-items:center; justify-content:center; }
.tab.aktiv{ background:var(--nacht); color:#fff; }

.karte{ background:#fff; border-radius:20px; box-shadow:var(--schatten); padding:20px 22px; margin-bottom:16px; }
.karte h2{ font-size:15px; font-weight:900; margin:0 0 12px; color:var(--nacht); display:flex; align-items:center; gap:10px; }
.karte h2 .nr{ width:28px; height:28px; border-radius:50%; background:var(--nacht); color:#fff; font-size:13px; display:inline-flex; align-items:center; justify-content:center; flex:none; }
.karte h2 small{ font-weight:700; color:#8a97a0; font-size:12px; }
.seite-titel{ font:900 13px "Nunito",sans-serif; color:var(--meer); text-transform:uppercase; letter-spacing:.08em; margin:26px 4px 10px; }

.felder{ display:grid; grid-template-columns:1fr 1fr; gap:12px 14px; }
.feld.voll{ grid-column:1 / -1; }
@media (max-width:640px){ .felder{ grid-template-columns:1fr; } }
.feld > label{ display:block; font-size:11.5px; font-weight:800; text-transform:uppercase; letter-spacing:.3px; color:#7c8a94; margin:0 0 5px; }
.feld > label em{ font-style:normal; text-transform:none; font-weight:600; color:#a2adb5; letter-spacing:0; }
input[type=text], input[type=date], textarea, select{ width:100%; border:2px solid #e6eaed; border-radius:12px; padding:9px 12px; font:600 15px "Nunito",sans-serif; color:var(--text); background:#fff; }
input:focus, textarea:focus, select:focus{ outline:none; border-color:var(--meer); }
textarea{ min-height:84px; resize:vertical; font-weight:500; }
.chips{ display:flex; flex-wrap:wrap; gap:6px; }
.chip{ border:2px solid #e2e7eb; background:#fff; border-radius:999px; padding:6px 12px; font:700 13.5px "Nunito",sans-serif; color:#405260; cursor:pointer; user-select:none; }
.chip.an{ background:var(--meer); border-color:var(--meer); color:#fff; }
.chip.an::before{ content:"✓ "; }
.chips.liste{ flex-direction:column; align-items:stretch; }
.chips.liste .chip{ border-radius:12px; text-align:left; }
.extra{ margin-top:6px; }

.tabelle{ display:grid; gap:8px; }
.trow{ display:grid; grid-template-columns:150px 1fr; gap:10px; align-items:center; padding:8px 0; border-top:1px solid #f0f2f4; }
.trow:first-child{ border-top:none; }
.trow > b{ font-size:14px; }
@media (max-width:640px){ .trow{ grid-template-columns:1fr; gap:6px; } }
.dev-zelle{ display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
.dev-zelle input{ flex:1; min-width:150px; }
.ziel{ border:2px solid #eef1f3; border-radius:14px; padding:12px; margin-bottom:10px; }
.ziel-kopf{ font-weight:900; color:var(--meer); margin-bottom:6px; }

.leiste{ position:sticky; bottom:12px; z-index:5; background:var(--nacht); border-radius:18px; padding:10px; display:flex; gap:8px; flex-wrap:wrap; box-shadow:0 10px 30px rgba(22,50,74,.35); }
.btn{ border:none; border-radius:12px; background:var(--meer); color:#fff; font:800 14px "Nunito",sans-serif; padding:11px 16px; cursor:pointer; display:inline-flex; gap:8px; align-items:center; text-decoration:none; }
.btn.gold{ background:var(--gold); color:#3b2a00; }
.btn.hell{ background:rgba(255,255,255,.14); }
.btn.weiss{ background:#fff; color:var(--nacht); border:2px solid #e2e7eb; }
.leiste .btn{ flex:1 1 auto; justify-content:center; }
@media (max-width:640px){
  .leiste{ padding:6px; gap:4px; bottom:8px; border-radius:16px; flex-wrap:nowrap; }
  .leiste .btn{ flex:1 1 0; flex-direction:column; gap:3px; padding:7px 2px; font-size:10.5px; border-radius:10px; min-width:0; }
  .leiste .btn i{ font-size:16px; }
}
.variante{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
.variante label{ font-weight:800; font-size:13px; color:#5c6b75; }
.variante select{ width:auto; min-width:220px; }

.vorlagen{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }
@media (max-width:640px){ .vorlagen{ grid-template-columns:1fr; } }
.vorlage{ border:2px solid #eef1f3; border-radius:18px; padding:18px; display:flex; flex-direction:column; gap:10px; }
.vorlage h3{ margin:0; font-size:16px; font-weight:900; color:var(--nacht); }
.vorlage p{ margin:0; font-size:13.5px; color:#5c6b75; }
.vorschau-mini{ background:#eef3f8; border-radius:12px; padding:12px 14px; font-size:12.5px; color:#1f3a5f; line-height:1.45; }
.vorschau-mini b{ display:block; }
.vorschau-mini small{ display:block; font-size:10px; text-transform:uppercase; letter-spacing:.08em; color:#5b7ea6; font-weight:800; margin-bottom:2px; }
[hidden]{ display:none !important; }

/* =================== Druck: A4-Bogen =================== */
#druck{ display:none; }
@media print{
  @page{ size:A4; margin:0; }
  body{ background:#fff; }
  .wrap{ display:none !important; }
  #druck{ display:block; }
}
#druck{ font-family:Inter, "Nunito", sans-serif; color:#1b1f24; font-size:9.4pt; line-height:1.35; --ac:#1f3a5f; --ac2:#5b7ea6; --tint:#eef3f8; --ln:#b9c6d6; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
#druck .page{ width:210mm; height:297mm; padding:10mm 13mm 14mm; position:relative; overflow:hidden; page-break-after:always; break-after:page; display:flex; flex-direction:column; }
#druck .page:last-child{ page-break-after:auto; break-after:auto; }
#druck .top{ display:flex; justify-content:space-between; align-items:flex-end; padding-bottom:3mm; border-bottom:2pt solid var(--ac); margin-bottom:1mm; }
#druck .brand{ font-size:7.6pt; letter-spacing:.12em; text-transform:uppercase; color:var(--ac2); font-weight:700; }
#druck h1{ font-size:19pt; font-weight:800; color:var(--ac); margin:1mm 0 0; letter-spacing:-.01em; }
#druck .who{ display:grid; grid-template-columns:auto 34mm; gap:1.5mm 2mm; align-items:end; font-size:7.6pt; color:#555; text-transform:uppercase; letter-spacing:.05em; }
#druck .who i{ border-bottom:.7pt solid #444; height:4.5mm; font-style:normal; text-transform:none; letter-spacing:0; font-size:9pt; color:#111; line-height:4.5mm; }
#druck .body{ flex:1; display:flex; flex-direction:column; }
#druck footer{ position:absolute; left:13mm; right:13mm; bottom:6mm; border-top:.6pt dashed #999; padding-top:1.4mm; font-size:7.4pt; color:#666; display:flex; justify-content:space-between; }
#druck .trainer{ display:grid; grid-template-columns:1fr 1fr; gap:4mm; background:var(--tint); border-radius:2mm; padding:3mm 4mm; margin-top:3mm; }
#druck .tl{ font-size:7pt; text-transform:uppercase; letter-spacing:.08em; color:var(--ac2); font-weight:700; margin-bottom:.6mm; }
#druck .tv{ font-size:9pt; line-height:1.45; }
#druck .tv b{ color:var(--ac); }
#druck .sec{ display:flex; align-items:center; gap:2.5mm; margin:4.5mm 0 2mm; }
#druck .sec .no{ width:6.4mm; height:6.4mm; border-radius:50%; background:var(--ac); color:#fff; font-weight:700; font-size:8.6pt; display:flex; align-items:center; justify-content:center; flex:none; }
#druck .sec .st{ font-weight:800; font-size:11.4pt; color:var(--ac); }
#druck .sec .sn{ font-size:8pt; color:#777; margin-left:1mm; }
#druck .sec::after{ content:""; flex:1; height:.6pt; background:var(--ln); }
#druck .g{ display:grid; gap:2mm; }
#druck .fill{ flex:1; }
#druck .f{ border:.7pt solid var(--ln); border-radius:1.6mm; padding:1.3mm 2.3mm 2mm; min-height:12.5mm; background:#fff; }
#druck .fl{ font-size:7pt; text-transform:uppercase; letter-spacing:.06em; color:var(--ac2); font-weight:700; margin-bottom:1.2mm; }
#druck .fl em{ font-style:normal; text-transform:none; letter-spacing:0; color:#888; font-weight:400; margin-left:1mm; }
#druck .f.lined{ background-image:repeating-linear-gradient(transparent 0 6.75mm, #d3dbe5 6.75mm 7mm); background-position:0 4.2mm; background-origin:content-box; }
#druck .v{ font-size:10pt; color:#0d1b2a; white-space:pre-wrap; }
#druck .f.lined .v{ line-height:7mm; margin-top:-1.6mm; }
#druck .cbs{ display:flex; flex-wrap:wrap; gap:1.2mm 3.6mm; }
#druck .cb{ display:inline-flex; align-items:center; white-space:nowrap; font-size:8.9pt; }
#druck .cb i{ width:3.2mm; height:3.2mm; border:.8pt solid var(--ac); border-radius:.7mm; margin-right:1.3mm; flex:none; display:inline-flex; align-items:center; justify-content:center; font-style:normal; font-size:8pt; font-weight:800; color:var(--ac); line-height:1; }
#druck .cb u{ text-decoration:none; border-bottom:.6pt solid #555; min-width:22mm; display:inline-block; margin-left:1mm; color:#0d1b2a; }
#druck .ckl{ display:grid; gap:1.8mm; }
#druck .ckl.one{ margin:2mm 0; }
#druck .mini{ font-size:8pt; color:#555; margin-top:1.6mm; }
#druck .f.tbl{ padding:0; overflow:hidden; }
#druck table{ width:100%; border-collapse:collapse; }
#druck table th{ background:var(--tint); color:var(--ac); font-size:7.8pt; font-weight:700; text-align:center; padding:1.6mm 1.5mm; }
#druck table td{ border-top:.6pt solid #dde4ec; text-align:center; padding:0 1.5mm; height:8mm; font-size:9pt; }
#druck table td:first-child, #druck table th:first-child{ text-align:left; padding-left:3mm; }
#druck table td i{ display:inline-flex; width:3.4mm; height:3.4mm; border:.8pt solid var(--ac); border-radius:.7mm; vertical-align:middle; align-items:center; justify-content:center; font-style:normal; font-size:8pt; font-weight:800; color:var(--ac); }
#druck table.scale td i{ border-radius:50%; }
#druck table .bem{ width:40%; border-left:.6pt solid #dde4ec; text-align:left; }
#druck table.goals td, #druck table.steps td{ border-left:.6pt solid #dde4ec; text-align:left; vertical-align:top; padding:1.5mm 2mm; }
#druck table.steps td{ height:9.6mm; vertical-align:middle; }
#druck table .n{ width:8mm; text-align:center !important; padding-left:0 !important; font-weight:700; color:var(--ac); vertical-align:middle !important; }
#druck table.goals th:not(.n), #druck table.steps th:not(.n){ text-align:left; }
#druck table .w{ width:22mm; }
#druck .f.tbl.fill{ display:flex; }
#druck .f.tbl.fill table{ height:100%; }
#druck table.goals tr:first-child{ height:7mm; }
#druck table.goals tr:not(:first-child){ height:32%; }
#druck .kid{ margin-top:2mm; border-radius:2mm; background:var(--tint); padding:2.5mm 4mm 3mm; }
#druck .kh{ font-weight:800; color:var(--ac); font-size:10pt; }
#druck .kq{ display:flex; gap:2mm; align-items:flex-end; margin-top:2.6mm; }
#druck .kq span{ white-space:nowrap; font-size:9pt; }
#druck .kq i{ flex:1; border-bottom:.7pt solid var(--ac2); min-height:5mm; font-style:normal; font-size:9.6pt; color:#0d1b2a; }
#druck .f.cons{ display:flex; flex-direction:column; flex:1; }
#druck .f.cons p{ font-size:8.6pt; color:#333; margin:1mm 0; }
#druck .sign{ display:grid; grid-template-columns:.7fr 1fr 1fr; gap:6mm; margin-top:auto; font-size:7.6pt; color:#555; }
#druck .sign i{ display:block; border-bottom:.8pt solid #222; height:6mm; margin-bottom:1mm; font-style:normal; font-size:9.4pt; color:#111; }
</style>
</head>
<body>
<div class="wrap">
<a href="index.php" class="zurueck"><i class="fa-solid fa-arrow-left"></i> Zurück zum Leuchtturm</a>
<header class="kopf">
  <h1><i class="fa-solid fa-clipboard-user"></i> Anamnesebogen</h1>
  <p>Elterngespräch vor der LRS-Förderung – digital ausfüllen oder leer drucken</p>
</header>

<div class="tabs">
  <button class="tab aktiv" data-tab="ausfuellen" onclick="tabZeigen('ausfuellen')"><i class="fa-solid fa-pen-to-square"></i> Digital ausfüllen</button>
  <button class="tab" data-tab="vorlage" onclick="tabZeigen('vorlage')"><i class="fa-solid fa-print"></i> Leere Vorlage drucken</button>
</div>

<!-- ============ Leere Vorlage ============ -->
<section id="tab-vorlage" hidden>
  <div class="karte">
    <h2><i class="fa-solid fa-print"></i> Leerer Bogen zum Ausfüllen mit Stift</h2>
    <p style="margin:0 0 14px; color:#5c6b75; font-size:14px;">6 Seiten A4. Beim Drucken „Hintergrundgrafiken“ einschalten, damit die hellblauen Flächen mitgedruckt werden – oder „Als PDF speichern“ wählen.</p>
    <div class="vorlagen">
      <div class="vorlage">
        <h3>Mit Einrichtung</h3>
        <div class="vorschau-mini"><small>Einrichtung</small><b>CJD Christophorusschule Weißenfels</b>LRS-Förderung nach der AFS-Methode · Förderstunden à 40 Minuten</div>
        <button class="btn" onclick="leerDrucken('schule')"><i class="fa-solid fa-print"></i> Drucken / PDF</button>
      </div>
      <div class="vorlage">
        <h3>Ohne Einrichtung</h3>
        <div class="vorschau-mini"><small>Förderung</small><b>LRS-Training nach der AFS-Methode</b>Aufmerksamkeit · Funktion · Symptom · nach den Richtlinien des EÖDL</div>
        <button class="btn" onclick="leerDrucken('neutral')"><i class="fa-solid fa-print"></i> Drucken / PDF</button>
      </div>
    </div>
  </div>
</section>

<!-- ============ Digital ausfüllen ============ -->
<section id="tab-ausfuellen">
  <div class="hinweis"><i class="fa-solid fa-lock"></i>
    <span>Läuft komplett im Browser – nichts wird auf dem Server gespeichert. Zum Weiterarbeiten an einem anderen Tag: <b>„Sichern“</b> legt eine Datei auf deinem Gerät ab, die du später mit <b>„Öffnen“</b> wieder lädst.</span></div>
  <div class="karte">
    <div class="variante">
      <label for="variante">Kopf des Bogens:</label>
      <select id="variante" onchange="geaendert()">
        <option value="schule">mit Einrichtung (Christophorusschule)</option>
        <option value="neutral">ohne Einrichtung</option>
      </select>
    </div>
  </div>
  <div id="formular"></div>
  <div class="leiste">
    <button class="btn gold" onclick="ausgefuelltDrucken()"><i class="fa-solid fa-file-pdf"></i> <span>Drucken</span></button>
    <button class="btn" onclick="insGutachten()"><i class="fa-solid fa-file-signature"></i> <span>Gutachten</span></button>
    <button class="btn hell" onclick="sichern()"><i class="fa-solid fa-download"></i> <span>Sichern</span></button>
    <button class="btn hell" onclick="document.getElementById('datei').click()"><i class="fa-solid fa-folder-open"></i> <span>Öffnen</span></button>
    <button class="btn hell" onclick="leeren()"><i class="fa-solid fa-eraser"></i> <span>Leeren</span></button>
    <input type="file" id="datei" accept=".json,application/json" hidden onchange="laden(this)">
  </div>
</section>
</div>

<div id="druck"></div>

<script>
/* =====================================================================
   Aufbau des Bogens – EINE Beschreibung für Formular UND Druck.
   Feldtypen: text, date, cb (Mehrfachauswahl), ckl (Liste), area,
   dev (Entwicklungstabelle), scale (Einschätzung), kid, goals, steps, cons
   ===================================================================== */
const FUSS = "Melanie Bernshausen · Diplomierte Mediendidaktikerin (EÖDL)";
const T = (k, l, span, o) => Object.assign({ t: "text", k, l, span: span || 1 }, o || {});
const D = (k, l, span) => ({ t: "date", k, l, span: span || 1 });
const C = (k, l, opts, span, o) => Object.assign({ t: "cb", k, l, opts, span: span || 1 }, o || {});
const A = (k, l, span, o) => Object.assign({ t: "area", k, l, span: span || 1 }, o || {});

const SEITEN = [
 { titel: "Stammdaten &amp; Familie", trainer: true, abschnitte: [
   { nr: 1, titel: "Angaben zum Kind", cols: 6, felder: [
     T("name", "Name / Code", 3), D("geb", "Geburtsdatum", 2), T("alter", "Alter"),
     T("klasse", "Klasse"), T("lehrkraft", "Klassenlehrer/in", 3), C("hand", "Händigkeit", ["rechts", "links", "beide"], 2),
     C("teilnehmer", "Gesprächsteilnehmer", ["Mutter", "Vater", "Kind", "Lehrkraft", "Schulpsychologin"], 6, { sonst: "Sonstige" }),
     C("anlass", "Anlass der Förderung", ["Elternwunsch", "Empfehlung der Schule", "Diagnostik vorhanden", "Nachteilsausgleich"], 6, { h: 21, notiz: true }),
   ]},
   { nr: 2, titel: "Familie und Umfeld", cols: 6, rows: "repeat(5, auto) 1fr", felder: [
     T("sorge", "Sorgeberechtigte", 3), T("erreich", "Erreichbarkeit", 3),
     C("kontakt", "Bevorzugter Kontakt", ["persönliches Gespräch", "E-Mail", "Hausaufgabenheft", "Messenger", "Telefon"], 6),
     T("geschw", "Geschwister (Anzahl / Alter)", 3), C("geschwlrs", "Geschwister mit LRS / Lernproblemen", ["nein", "ja", "unbekannt"], 3),
     C("sprache", "Familiensprache(n)", ["nur Deutsch"], 3, { sonst: "mehrsprachig" }), C("lrsfam", "LRS in der Familie", ["nein", "Mutter", "Vater", "weitere", "?"], 3),
     C("wohnen", "Wohnsituation", ["beide Elternteile", "ein Elternteil", "Wechselmodell"], 6, { sonst: "Sonstige" }),
     A("belast", "Besonderheiten / Belastungen <em>z. B. Umzug, Trennung, Schulwechsel</em>", 6, { lined: true }),
   ]},
 ]},
 { titel: "Entwicklung", abschnitte: [
   { nr: 3, titel: "Schwangerschaft, Geburt &amp; frühe Entwicklung", cols: 2, felder: [
     C("ss", "Schwangerschaft", ["unauffällig"], 1, { h: 19, sonst: "Besonderheiten" }),
     C("geburt", "Geburt", ["termingerecht", "zu früh", "zu spät"], 1, { h: 19, sonst: "Komplikationen" }),
   ], danach: { t: "dev", k: "dev" } },
   { nr: 4, titel: "Sprache, Sinne &amp; Motorik", cols: 2, rows: "repeat(3, auto) 1fr", felder: [
     C("sprachentw", "Sprachentwicklung", ["unauffällig", "Laute / Lispeln", "Stottern", "kleiner Wortschatz"], 1, { h: 19 }),
     C("therapie", "Therapien (von – bis)", ["Logopädie", "Ergotherapie", "Physiotherapie"], 1, { h: 19, notiz: true }),
     C("hoeren", "Hören", ["unauffällig", "häufige Mittelohrentzündungen", "Paukenröhrchen"], 1, { zusatz: "letzter Hörtest" }),
     C("sehen", "Sehen", ["unauffällig", "Brille", "Augenarzt geplant"], 1, { zusatz: "letzter Sehtest" }),
     C("grob", "Grobmotorik", ["geschickt", "eher ungeschickt", "Gleichgewicht schwierig"], 1, { h: 17 }),
     C("fein", "Feinmotorik", ["unauffällig", "verkrampfte Stifthaltung", "schwer lesbare Schrift", "ermüdet schnell"], 1, { h: 17 }),
     C("kiga", "Kindergarten", ["gern hingegangen"], 1, { sonst: "Auffälligkeiten", zusatz: "ab Alter" }),
     A("gesund", "Gesundheit / Medikamente <em>soweit für die Förderung wichtig</em>", 1, { lined: true }),
   ]},
 ]},
 { titel: "Schule, Lesen &amp; Schreiben", abschnitte: [
   { nr: 5, titel: "Schullaufbahn", cols: 6, felder: [
     T("einschjahr", "Einschulung (Jahr)"), C("einsch", "Einschulung", ["regulär", "vorzeitig", "zurückgestellt"], 3), C("seit", "Auffällig seit", ["Kl. 1", "Kl. 2", "später"], 2),
     C("wiederholt", "Klasse wiederholt / Schulwechsel", ["nein"], 3, { sonst: "ja" }), T("faecher", "Lieblingsfächer / ungeliebte Fächer", 3),
     T("nde", "Note Deutsch"), T("nma", "Note Mathe"), T("nen", "Note Englisch"), T("hadauer", "Hausaufgaben / Tag"), C("ha", "Hausaufgaben", ["selbstständig", "mit Hilfe", "oft Streit"], 2),
   ]},
   { nr: 6, titel: "Lesen &amp; Schreiben", note: "Was beobachten Eltern / Schule?", cols: 2, felder: [
     C("lesen", "Lesen", ["liest stockend / buchstabierend", "rät Wörter", "verliert die Zeile", "versteht Gelesenes nicht", "liest ungern / vermeidet"], 1, { liste: true, sonst: "Sonstiges" }),
     C("schreiben", "Schreiben", ["vergisst / vertauscht Buchstaben", "schreibt Wörter jedes Mal anders", "kennt Regeln, wendet sie nicht an", "Abschreibfehler", "Groß- / Kleinschreibung", "findet eigene Fehler nicht"], 1, { liste: true }),
   ]},
   { nr: 7, titel: "Bisherige Diagnostik &amp; Förderung", cols: 2, rows: "1fr auto auto", felder: [
     C("diag", "Diagnostik", ["keine", "Schulpsychologin", "SPZ / Kinder- und Jugendpsychiatrie", "Kinderarzt"]),
     A("diagerg", "Ergebnis / Datum", 1, { lined: true }),
     C("nta", "Nachteilsausgleich", ["nein", "beantragt", "gewährt"], 1, { zusatz: "Art" }),
     C("bisher", "Bisherige Förderung", ["keine", "schulisch", "außerschulisch", "Nachhilfe"]),
     C("rechnen", "Rechnen", ["unauffällig", "ebenfalls schwierig"], 2),
   ]},
 ]},
 { titel: "Aufmerksamkeit, Befinden &amp; Stärken", abschnitte: [
   { nr: 8, titel: "Aufmerksamkeit &amp; Arbeitsverhalten", note: "Einschätzung der Eltern", block: { t: "scale", k: "skala" } },
   { nr: 9, titel: "Befinden &amp; Selbstbild", cols: 2, felder: [
     C("fehler", "Umgang mit Fehlern", ["gelassen", "ärgert sich", "gibt auf", "vermeidet"]),
     C("angst", "Angst / Bauchweh vor …", ["Diktaten", "Vorlesen", "Klassenarbeiten", "nichts"]),
     A("selbst", "Sagt über sich selbst … <em>z. B. „Ich kann das nicht.“</em>", 2, { h: 17, lined: true }),
     C("freunde", "Freundschaften", ["gut eingebunden", "wenige Freunde", "Konflikte"]),
     T("schlaf", "Schlaf / Bildschirmzeit pro Tag"),
   ]},
   { nr: 10, titel: "Stärken &amp; Interessen", cols: 2, rows: "1fr auto", felder: [
     A("gut", "Das kann das Kind besonders gut", 1, { lined: true }),
     A("hobby", "Hobbys / Vereine", 1, { lined: true }),
     A("themen", "Lieblingsthemen <em>für Texte und Wortmaterial</em>", 1, { h: 17, lined: true }),
     C("motiv", "Das motiviert", ["Lob", "Punkte", "Wettbewerb", "Spiele", "Bewegung", "Tablet"], 1, { h: 17 }),
   ]},
 ]},
 { titel: "Wünsche, Ziele &amp; Absprachen", abschnitte: [
   { nr: 11, titel: "Wünsche &amp; Erwartungen", cols: 2, felder: [
     A("weltern", "Das wünschen sich die Eltern", 1, { h: 30, lined: true }),
     A("wschule", "Das wünscht sich die Schule / Lehrkraft", 1, { h: 30, lined: true }),
   ], danach: { t: "kid", k: "kind" } },
   { nr: 12, titel: "Absprachen", cols: 3, felder: [
     T("termin", "Fördertermin (Tag / Stunde)"), C("form", "Form", ["Einzel", "Paar", "Gruppe"]), D("naechstes", "Nächstes Gespräch am"),
     C("zuhause", "Übung zu Hause", ["nein", "ja"], 1, { zusatz: "Min. pro Woche" }),
     C("rueck", "Rückmeldung an Eltern", ["je Block", "halbjährlich", "bei Bedarf"]),
     C("rueckweg", "Rückmeldung über", ["Gespräch", "E-Mail", "Heft"]),
   ]},
   { nr: 13, titel: "Gemeinsame Ziele", block: { t: "goals", k: "ziele" }, fill: true },
 ]},
 { titel: "Planung &amp; Einverständnis", abschnitte: [
   { nr: 14, titel: "Eindruck aus dem Gespräch", note: "nur für die Trainerin", cols: 2, felder: [
     C("eindruck", "Kind im Gespräch", ["offen", "zurückhaltend", "unruhig", "angestrengt", "motiviert"]),
     C("abklaeren", "Bitte abklären", ["Hören", "Sehen", "Aufmerksamkeit", "Rechnen"]),
     C("afs", "Vermutete Schwerpunkte (AFS)", ["Aufmerksamkeit", "Optik", "Akustik", "Raumlage", "Serialität", "Intermodalität", "Körperschema"], 2),
     A("hypo", "Hypothesen / Notizen", 2, { h: 36, lined: true }),
   ]},
   { nr: 15, titel: "Nächste Schritte", block: { t: "steps", k: "schritte" } },
   { nr: 16, titel: "Einverständnis", block: { t: "cons", k: "einv" } },
 ]},
];
const DEV = ["Sitzen", "Laufen", "Erste Wörter", "Erste Sätze", "Sauberkeit"];
const SKALA = ["lässt sich leicht ablenken", "bleibt bei einer Aufgabe dran", "arbeitet sorgfältig", "arbeitet hastig / sehr schnell", "wird schnell müde", "kann Arbeitsaufträge behalten", "ist motorisch unruhig"];
const SKALA_STUFEN = ["trifft nicht zu", "eher nicht", "teils", "eher", "trifft zu"];
const KIND_FRAGEN = ["Was kannst du richtig gut?", "Was ist beim Lesen oder Schreiben schwer für dich?", "Was möchtest du besser können?", "Woran würdest du merken, dass es besser geworden ist?"];
const SCHRITTE = ["AFS-Testverfahren (EÖDL)", "Diktat mit Fehleranalyse", "Lesetest / Leseprobe", "Pädagogisches Gutachten", "Förderplan", "Rücksprache Lehrkraft", "Rücksprache Schulpsychologin", "Trainingsheft angelegt"];
const EINV = ["Ich bin mit der Förderung einverstanden.", "Ich bin mit dem Austausch mit Lehrkraft / Schulpsychologin einverstanden."];

/* ============================ Daten ============================ */
let W = {};          // alle Werte
let veraendert = false;
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const get = k => W[k];
function set(k, v){ W[k] = v; geaendert(); }
function geaendert(){ veraendert = true; }
window.addEventListener("beforeunload", e => { if (veraendert) { e.preventDefault(); e.returnValue = ""; } });

/* ============================ Formular ============================ */
function feldHTML(f, cols){
  const voll = f.span / cols > 0.5;
  let h = `<div class="feld${voll ? " voll" : ""}"><label>${f.l}</label>`;
  if (f.t === "text") h += `<input type="text" data-k="${f.k}">`;
  if (f.t === "date") h += `<input type="date" data-k="${f.k}">`;
  if (f.t === "area") h += `<textarea data-k="${f.k}"></textarea>`;
  if (f.t === "cb") {
    h += `<div class="chips${f.liste ? " liste" : ""}" data-cb="${f.k}">` + f.opts.map(o => `<span class="chip" data-o="${esc(o)}">${o}</span>`).join("") + `</div>`;
    if (f.sonst) h += `<input type="text" class="extra" data-k="${f.k}_sonst" placeholder="${esc(f.sonst)} …">`;
    if (f.zusatz) h += `<input type="text" class="extra" data-k="${f.k}_zusatz" placeholder="${esc(f.zusatz)}">`;
    if (f.notiz) h += `<input type="text" class="extra" data-k="${f.k}_notiz" placeholder="Bemerkung …">`;
  }
  return h + `</div>`;
}
function blockHTML(b){
  if (b.t === "dev") return `<div class="tabelle" style="margin-top:12px">` + DEV.map((d, i) => `<div class="trow"><b>${d}</b><div class="dev-zelle"><div class="chips" data-radio="dev_${i}">${["früh", "altersgerecht", "spät"].map(o => `<span class="chip" data-o="${o}">${o}</span>`).join("")}</div><input type="text" data-k="dev_${i}_bem" placeholder="Bemerkung"></div></div>`).join("") + `</div>`;
  if (b.t === "scale") return `<div class="tabelle">` + SKALA.map((s, i) => `<div class="trow"><b>${s}</b><div class="chips" data-radio="skala_${i}">${SKALA_STUFEN.map(o => `<span class="chip" data-o="${o}">${o}</span>`).join("")}</div></div>`).join("") + `</div>`;
  if (b.t === "kid") return `<div class="feld voll" style="margin-top:14px; background:#eef3f8; border-radius:14px; padding:12px;"><label style="color:var(--nacht)">Das sagt das Kind selbst</label>` + KIND_FRAGEN.map((q, i) => `<div style="margin-top:8px"><div style="font-weight:700; font-size:14px; margin-bottom:4px">${q}</div><input type="text" data-k="kind_${i}"></div>`).join("") + `</div>`;
  if (b.t === "goals") return [1, 2, 3].map(i => `<div class="ziel"><div class="ziel-kopf">Ziel ${i}</div><div class="felder"><div class="feld voll"><label>Ziel – konkret und erreichbar</label><input type="text" data-k="ziel_${i}"></div><div class="feld"><label>Woran erkennen wir es?</label><input type="text" data-k="ziel_${i}_woran"></div><div class="feld"><label>Bis wann?</label><input type="text" data-k="ziel_${i}_bis"></div></div></div>`).join("");
  if (b.t === "steps") return `<div class="tabelle">` + SCHRITTE.map((s, i) => `<div class="trow"><div class="chips" data-cb="schritt_${i}"><span class="chip" data-o="erledigt">${s}</span></div><div class="dev-zelle"><input type="text" data-k="schritt_${i}_termin" placeholder="Termin" style="max-width:130px"><input type="text" data-k="schritt_${i}_bem" placeholder="Bemerkung"></div></div>`).join("") + `</div>`;
  if (b.t === "cons") return `<p style="margin:0 0 10px; font-size:13.5px; color:#5c6b75">Die Angaben werden vertraulich behandelt und ausschließlich für die Planung und Durchführung der LRS-Förderung genutzt. Eine Weitergabe an Dritte erfolgt nur nach Absprache. Unterschrieben wird auf dem Ausdruck.</p><div class="chips liste" data-cb="einv">${EINV.map(o => `<span class="chip" data-o="${esc(o)}">${o}</span>`).join("")}</div><div class="felder" style="margin-top:12px"><div class="feld"><label>Ort, Datum</label><input type="text" data-k="ortdatum"></div></div>`;
  return "";
}
function formularBauen(){
  let h = "";
  SEITEN.forEach((s, si) => {
    h += `<div class="seite-titel">Teil ${si + 1} · ${s.titel}</div>`;
    s.abschnitte.forEach(a => {
      h += `<div class="karte"><h2><span class="nr">${a.nr}</span> ${a.titel}${a.note ? ` <small>${a.note}</small>` : ""}</h2>`;
      if (a.felder) h += `<div class="felder">${a.felder.map(f => feldHTML(f, a.cols)).join("")}</div>`;
      if (a.danach) h += blockHTML(a.danach);
      if (a.block) h += blockHTML(a.block);
      h += `</div>`;
    });
  });
  const box = document.getElementById("formular");
  box.innerHTML = h;
  box.querySelectorAll("[data-k]").forEach(el => el.addEventListener("input", () => set(el.dataset.k, el.value)));
  box.querySelectorAll("[data-cb] .chip").forEach(ch => ch.addEventListener("click", () => {
    const k = ch.parentElement.dataset.cb, o = ch.dataset.o;
    const liste = Array.isArray(get(k)) ? get(k).slice() : [];
    const i = liste.indexOf(o); i >= 0 ? liste.splice(i, 1) : liste.push(o);
    set(k, liste); ch.classList.toggle("an", i < 0);
  }));
  box.querySelectorAll("[data-radio] .chip").forEach(ch => ch.addEventListener("click", () => {
    const k = ch.parentElement.dataset.radio, o = ch.dataset.o;
    const neu = get(k) === o ? "" : o; set(k, neu);
    ch.parentElement.querySelectorAll(".chip").forEach(c => c.classList.toggle("an", c.dataset.o === neu));
  }));
}
function formularFuellen(){
  const box = document.getElementById("formular");
  box.querySelectorAll("[data-k]").forEach(el => el.value = W[el.dataset.k] ?? "");
  box.querySelectorAll("[data-cb]").forEach(g => { const l = W[g.dataset.cb] || []; g.querySelectorAll(".chip").forEach(c => c.classList.toggle("an", l.includes(c.dataset.o))); });
  box.querySelectorAll("[data-radio]").forEach(g => g.querySelectorAll(".chip").forEach(c => c.classList.toggle("an", W[g.dataset.radio] === c.dataset.o)));
  document.getElementById("variante").value = W._variante || "schule";
}

/* ============================ Druck ============================ */
let D_W = {};   // Werte für den Druck (leer = Vorlage)
const dv = k => D_W[k] ?? "";
const datumDE = s => /^\d{4}-\d{2}-\d{2}$/.test(s) ? s.split("-").reverse().join(".") : s;
const haken = (k, o) => (Array.isArray(D_W[k]) && D_W[k].includes(o)) ? "✓" : "";
function cbD(k, opts){ return `<div class="cbs">` + opts.map(o => `<span class="cb"><i>${haken(k, o)}</i>${o}</span>`).join("") + `</div>`; }
function druckFeld(f){
  const st = ` style="grid-column: span ${f.span};${f.h ? ` min-height:${f.h}mm;` : ""}"`;
  let inhalt = "";
  if (f.t === "text") inhalt = `<div class="v">${esc(dv(f.k))}</div>`;
  if (f.t === "date") inhalt = `<div class="v">${esc(datumDE(dv(f.k)))}</div>`;
  if (f.t === "area") inhalt = `<div class="v">${esc(dv(f.k))}</div>`;
  if (f.t === "cb") {
    const s = dv(f.k + "_sonst"), z = dv(f.k + "_zusatz"), n = dv(f.k + "_notiz");
    const liste = f.opts.map(o => `<span class="cb"><i>${haken(f.k, o)}</i>${o}</span>`);
    if (f.sonst) liste.push(`<span class="cb"><i>${s ? "✓" : ""}</i>${f.sonst}:<u>${esc(s) || "&nbsp;"}</u></span>`);
    inhalt = f.liste ? `<div class="ckl">${liste.join("")}</div>` : `<div class="cbs">${liste.join("")}</div>`;
    if (f.zusatz) inhalt += `<div class="mini">${f.zusatz}: <b style="color:#0d1b2a">${esc(z) || "__________"}</b></div>`;
    if (f.notiz && n) inhalt += `<div class="mini" style="color:#0d1b2a">${esc(n)}</div>`;
  }
  return `<div class="f${f.lined ? " lined" : ""}"${st}><div class="fl">${f.l}</div>${inhalt}</div>`;
}
function druckBlock(b, fill){
  if (b.t === "dev") return `<div class="f tbl" style="margin-top:2mm"><table><tr><th></th><th>früh</th><th>altersgerecht</th><th>spät</th><th class="bem">Bemerkung</th></tr>` +
    DEV.map((d, i) => `<tr><td>${d}</td>${["früh", "altersgerecht", "spät"].map(o => `<td><i>${dv("dev_" + i) === o ? "✓" : ""}</i></td>`).join("")}<td class="bem">${esc(dv("dev_" + i + "_bem"))}</td></tr>`).join("") + `</table></div>`;
  if (b.t === "scale") return `<div class="f tbl"><table class="scale"><tr><th></th>${SKALA_STUFEN.map(s => `<th>${s}</th>`).join("")}</tr>` +
    SKALA.map((s, i) => `<tr><td>${s}</td>${SKALA_STUFEN.map(o => `<td><i>${dv("skala_" + i) === o ? "●" : ""}</i></td>`).join("")}</tr>`).join("") + `</table></div>`;
  if (b.t === "kid") return `<div class="kid"><div class="kh">Das sagt das Kind selbst</div>` + KIND_FRAGEN.map((q, i) => `<div class="kq"><span>${q}</span><i>${esc(dv("kind_" + i))}</i></div>`).join("") + `</div>`;
  if (b.t === "goals") return `<div class="f tbl${fill ? " fill" : ""}"><table class="goals"><tr><th class="n">#</th><th>Ziel – konkret und erreichbar</th><th>Woran erkennen wir es?</th><th class="w">Bis wann?</th></tr>` +
    [1, 2, 3].map(i => `<tr><td class="n">${i}</td><td>${esc(dv("ziel_" + i))}</td><td>${esc(dv("ziel_" + i + "_woran"))}</td><td>${esc(dv("ziel_" + i + "_bis"))}</td></tr>`).join("") + `</table></div>`;
  if (b.t === "steps") return `<div class="f tbl"><table class="steps"><tr><th class="n">✓</th><th>Schritt</th><th class="w">Termin</th><th>Bemerkung</th></tr>` +
    SCHRITTE.map((s, i) => `<tr><td class="n"><i>${haken("schritt_" + i, "erledigt")}</i></td><td>${s}</td><td>${esc(dv("schritt_" + i + "_termin"))}</td><td>${esc(dv("schritt_" + i + "_bem"))}</td></tr>`).join("") + `</table></div>`;
  if (b.t === "cons") return `<div class="f cons"><p>Die Angaben werden vertraulich behandelt und ausschließlich für die Planung und Durchführung der LRS-Förderung genutzt. Eine Weitergabe an Dritte (z. B. Lehrkräfte, Schulpsychologin) erfolgt nur nach Absprache.</p>
    <div class="ckl one">${EINV.map(o => `<span class="cb"><i>${haken("einv", o)}</i>${o}</span>`).join("")}</div>
    <div class="sign"><div><i>${esc(dv("ortdatum"))}</i>Ort, Datum</div><div><i></i>Unterschrift Sorgeberechtigte/r</div><div><i></i>Melanie Bernshausen</div></div></div>`;
  return "";
}
function druckBauen(variante){
  const zweite = variante === "neutral"
    ? `<div><div class="tl">Förderung</div><div class="tv"><b>LRS-Training nach der AFS-Methode</b></div><div class="tv">Aufmerksamkeit · Funktion · Symptom</div><div class="tv">nach den Richtlinien des EÖDL</div></div>`
    : `<div><div class="tl">Einrichtung</div><div class="tv"><b>CJD Christophorusschule Weißenfels</b></div><div class="tv">LRS-Förderung nach der AFS-Methode</div><div class="tv">Förderstunden à 40 Minuten</div></div>`;
  const kopfName = esc(dv("name")), kopfDatum = "";
  let h = "";
  SEITEN.forEach((s, si) => {
    let body = "";
    if (s.trainer) body += `<div class="trainer"><div><div class="tl">Legasthenietrainerin</div><div class="tv"><b>Melanie Bernshausen</b></div><div class="tv">Diplomierte Legasthenietrainerin (EÖDL)</div><div class="tv">Diplomierte Mediendidaktikerin (EÖDL)</div></div>${zweite}</div>`;
    s.abschnitte.forEach(a => {
      body += `<div class="sec"><span class="no">${a.nr}</span><span class="st">${a.titel}</span>${a.note ? `<span class="sn">${a.note}</span>` : ""}</div>`;
      if (a.felder) body += `<div class="g${a.rows ? " fill" : ""}" style="grid-template-columns: repeat(${a.cols}, 1fr);${a.rows ? ` grid-template-rows:${a.rows};` : ""}">${a.felder.map(druckFeld).join("")}</div>`;
      if (a.danach) body += druckBlock(a.danach);
      if (a.block) body += druckBlock(a.block, a.fill);
    });
    h += `<section class="page"><div class="top"><div><div class="brand">Anamnesebogen · LRS-Förderung</div><h1>${s.titel}</h1></div>
      <div class="who"><span>Kind (Code)</span><i>${kopfName}</i><span>Datum</span><i>${kopfDatum}</i></div></div>
      <div class="body">${body}</div><footer><span>${FUSS}</span><span>Vertraulich · Seite ${si + 1} von ${SEITEN.length}</span></footer></section>`;
  });
  document.getElementById("druck").innerHTML = h;
}
function leerDrucken(variante){ D_W = {}; druckBauen(variante); setTimeout(() => window.print(), 150); }
function ausgefuelltDrucken(){ D_W = W; W._variante = document.getElementById("variante").value; druckBauen(W._variante); setTimeout(() => window.print(), 150); }

/* ============================ Sichern / Laden ============================ */
function dateiname(){ return "Anamnese_" + (String(W.name || "Kind").replace(/[^\wäöüÄÖÜß-]+/g, "_")) + "_" + new Date().toISOString().slice(0, 10) + ".json"; }
function sichern(){
  W._variante = document.getElementById("variante").value;
  const blob = new Blob([JSON.stringify({ typ: "leuchtturm-anamnese", version: 1, daten: W }, null, 1)], { type: "application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = dateiname(); a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000); veraendert = false;
}
function laden(input){
  const f = input.files[0]; if (!f) return;
  f.text().then(t => {
    try { const j = JSON.parse(t); if (j.typ !== "leuchtturm-anamnese") throw 0; W = j.daten || {}; formularFuellen(); veraendert = false; }
    catch (e) { alert("Das ist keine Anamnese-Datei aus dem Leuchtturm."); }
    input.value = "";
  });
}
function leeren(){ if (!confirm("Alle Eingaben löschen?")) return; W = {}; formularFuellen(); veraendert = false; }

/* ============================ Übergabe ans Gutachten ============================ */
function insGutachten(){
  const anl = W.anlass || [];
  let anregung = [];
  if (anl.includes("Elternwunsch")) anregung.push("der Eltern");
  if (anl.includes("Empfehlung der Schule")) anregung.push("der Schule");
  let text = (anregung.length ? `Auf Anregung ${anregung.join(" und ")} erfolgte` : "Es erfolgte") + " aufgrund vermuteter Auffälligkeiten im Bereich Lesen und Schreiben eine Überprüfung hinsichtlich einer möglichen Legasthenie bzw. Lese-Rechtschreibproblematik.";
  const lese = (W.lesen || []), schr = (W.schreiben || []);
  if (lese.length || schr.length) text += " Im Anamnesegespräch wurden folgende Beobachtungen geschildert: " + [...lese, ...schr].join("; ") + ".";
  if (W.lrsfam && W.lrsfam.length && !W.lrsfam.includes("nein") && !W.lrsfam.includes("?")) text += " In der Familie sind Lese-Rechtschreibschwierigkeiten bekannt (" + W.lrsfam.join(", ") + ").";
  if ((W.diag || []).some(d => d !== "keine")) text += " Eine Vordiagnostik liegt vor (" + W.diag.filter(d => d !== "keine").join(", ") + (W.diagerg ? "; " + W.diagerg.replace(/\s+/g, " ").trim() : "") + ").";
  try { sessionStorage.setItem("lt_anamnese_uebergabe", JSON.stringify({ name: W.name || "", geb: W.geb || "", anlass: text })); } catch (e) {}
  window.location.href = "gutachten.php";
}

/* ============================ Tabs ============================ */
function tabZeigen(t){
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("aktiv", b.dataset.tab === t));
  document.getElementById("tab-ausfuellen").hidden = t !== "ausfuellen";
  document.getElementById("tab-vorlage").hidden = t !== "vorlage";
}
formularBauen();
if (location.hash === "#vorlage") tabZeigen("vorlage");
</script>
</body>
</html>
