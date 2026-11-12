<?php $LT_GAST_BEREICH = "tagesplan"; require __DIR__ . "/gast-zugang.php"; ?>
<?php
/* ============================================================
   Leuchtturm – Mein Tag: eigener Stundenplan + Tagespläne
   – Stundenplan: Zeitraster und Woche Mo–Fr (Sozialtraining,
     Lernangebot, LRS, Vertretung, Unterricht, Aufsicht …)
   – Tagesplan: jeder Tag aus dem Stundenplan, die geplanten
     Stunden kommen automatisch aus dem Jahresplan (Sozialtraining,
     Lernangebot) oder werden direkt eingefügt; dazu Notizen,
     To-dos und zusätzliche Termine. Woche im Überblick, Druck.
   Daten: material-daten/tagesplan.json (nie überschrieben),
   gespeichert über tagesplan-speichern.php.
   ============================================================ */
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
if (empty($_SESSION["tagesplan_csrf"])) $_SESSION["tagesplan_csrf"] = bin2hex(random_bytes(16));

function tp_lesen($datei){
    $f = lt_daten($datei);
    if (!file_exists($f)) return [null, false];
    $i = (string)file_get_contents($f);
    $d = json_decode($i, true);
    return [is_array($d) ? $d : null, !is_array($d) && trim($i) !== ""];
}
[$tagesplan, $tpKaputt] = tp_lesen("tagesplan.json");
$tagesplan = $tagesplan ?: [];

// Eigene Stunden und Jahrespläne der drei Bereiche (nur was der Tagesplan braucht)
$PLAENE = [];
$VORLAGEN = [];
foreach (["sozial" => ["sozialtraining.json", "sozial-einheiten"], "lernangebot" => ["lernangebot.json", "lernangebot-einheiten"], "vertretung" => ["vertretung.json", "vertretung-einheiten"]] as $b => [$datei, $praefix]) {
    [$d] = tp_lesen($datei);
    $d = $d ?: [];
    $eigene = [];
    foreach ((array)($d["einheiten"] ?? []) as $e) {
        if (!is_array($e) || empty($e["id"])) continue;
        $eigene[] = ["id" => (string)$e["id"], "titel" => (string)($e["titel"] ?? ""), "kategorie" => (string)($e["kategorie"] ?? ""), "ersetzt" => (string)($e["ersetzt"] ?? ""),
                     "material" => (string)($e["material"] ?? ""), "ziel12" => (string)($e["ziel12"] ?? ""), "ziel34" => (string)($e["ziel34"] ?? "")];
    }
    $PLAENE[$b] = ["einheiten" => $eigene, "jahresplan" => $d["jahresplan"] ?? null];
    // Vorlagen-Dateien in derselben Reihenfolge wie sozial-stunden.php (Grunddatei zuerst)
    $dateien = glob(__DIR__ . "/" . $praefix . "*.js") ?: [];
    usort($dateien, fn($x, $y) => (basename($x) === "$praefix.js" ? -1 : (basename($y) === "$praefix.js" ? 1 : strnatcmp($x, $y))));
    $VORLAGEN[$b] = array_map(fn($f) => basename($f) . "?v=" . (@filemtime($f) ?: 1), $dateien);
}
$JSON = JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE;
?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mein Tag · Leuchtturm</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
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
.kopf-innen{ width:min(1100px,94%); margin:0 auto; padding:18px 0 0; }
.kopf-zeile{ display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.kopf a.zurueck{ color:rgba(255,255,255,.8); text-decoration:none; font-weight:800; font-size:14px; }
.kopf h1{ margin:0; font-size:26px; font-weight:900; flex:1; }
.speicherstatus{ font-size:13px; font-weight:800; opacity:.85; }
.speicherstatus.fehler{ color:#ffd2cc; opacity:1; }
.reiter{ display:flex; gap:4px; margin-top:14px; overflow-x:auto; }
.reiter a{ color:rgba(255,255,255,.8); text-decoration:none; font-weight:800; padding:10px 16px; border-radius:14px 14px 0 0; white-space:nowrap; }
.reiter a.aktiv{ background:var(--schaum); color:var(--nacht); }

.seite{ width:min(1100px,94%); margin:22px auto 60px; }

/* ---------- Bausteine ---------- */
.btn{ border:0; border-radius:12px; padding:9px 14px; font-weight:800; cursor:pointer; background:white; color:var(--nacht); box-shadow:0 2px 8px rgba(22,50,74,.1); display:inline-flex; align-items:center; gap:7px; text-decoration:none; font-size:14px; }
.btn:hover{ filter:brightness(.96); }
.btn.gold{ background:var(--gold); color:var(--nacht); }
.btn.blau{ background:var(--meer); color:white; }
.btn.nacht{ background:var(--nacht); color:white; }
.btn.rot{ background:#fbebeb; color:var(--rot); box-shadow:none; }
.btn.flach{ background:transparent; box-shadow:none; color:var(--grau); }
.btn.klein{ padding:6px 10px; font-size:13px; border-radius:9px; }
.karte{ background:white; border-radius:20px; box-shadow:var(--schatten); padding:20px 22px; margin-bottom:18px; }
.karte h2{ margin:0 0 12px; font-size:18px; font-weight:900; color:var(--nacht); display:flex; gap:8px; align-items:center; }
.hinweis{ background:#f9eeda; border-radius:14px; padding:12px 16px; font-weight:700; margin-bottom:18px; }
.hinweis.rot{ background:#fbebeb; color:var(--rot); }
.hinweis.blau{ background:#eef6fb; color:var(--nacht); }
.leer{ color:var(--grau); font-weight:700; text-align:center; padding:22px; }
input[type=text], input[type=time], input[type=date], input[type=search], select, textarea{
    border:2px solid var(--linie); border-radius:10px; padding:7px 10px; background:white; color:var(--text); width:100%;
}
textarea{ resize:none; line-height:1.45; overflow:hidden; min-height:40px; }
input:focus, select:focus, textarea:focus{ outline:none; border-color:var(--meer); }
.chip{ display:inline-flex; align-items:center; gap:5px; border-radius:99px; padding:3px 10px; font-size:12px; font-weight:800; background:#e7f1fb; color:var(--meer); }
.chip.grau{ background:#eef1ef; color:var(--grau); }
.chip.gruen{ background:#e5f4e4; color:var(--gruen); }
.chip.rot{ background:#fdecea; color:var(--rot); }
.chip.gold{ background:#f9eeda; color:#8a5a12; }

/* ---------- Tag ---------- */
.datum-leiste{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:18px; }
.datum-leiste .datum{ flex:1 1 220px; font-size:22px; font-weight:900; color:var(--nacht); }
.datum-leiste .datum small{ display:block; font-size:13px; color:var(--grau); font-weight:800; }
.datum-leiste input[type=date]{ width:auto; }
.rund{ width:40px; height:40px; border-radius:50%; justify-content:center; padding:0; }

.slot{ display:flex; gap:0; background:white; border-radius:18px; box-shadow:var(--schatten); margin-bottom:12px; overflow:hidden; border-left:7px solid var(--f, #c9d3d8); }
.slot.pause{ box-shadow:none; background:transparent; border-left-color:transparent; margin-bottom:8px; }
.slot.aus{ opacity:.6; }
.slot-zeit{ flex:none; width:86px; padding:14px 6px 14px 12px; font-weight:900; color:var(--nacht); }
.slot-zeit .nr{ font-size:20px; }
.slot-zeit small{ display:block; font-size:12px; color:var(--grau); font-weight:800; line-height:1.35; }
.slot-inhalt{ flex:1; min-width:0; padding:12px 14px 12px 4px; }
.slot-kopf{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.slot-art{ font-weight:900; color:var(--f, var(--nacht)); display:inline-flex; align-items:center; gap:6px; }
.slot-wer{ font-weight:800; }
.slot-raum{ color:var(--grau); font-weight:700; font-size:13px; }
.slot-knoepfe{ margin-left:auto; display:flex; gap:4px; }
.slot-stunde{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-top:8px; background:#f6f9fb; border-radius:12px; padding:8px 10px; }
.slot-stunde .titel{ flex:1 1 160px; font-weight:900; font-size:16px; }
.slot-stunde .titel small{ display:block; font-size:12px; color:var(--grau); font-weight:800; }
.slot-stunde.leer-stunde{ background:transparent; border:2px dashed var(--linie); }
.slot details{ margin-top:6px; font-size:14px; }
.slot details summary{ cursor:pointer; font-weight:800; color:var(--meer); font-size:13px; }
.slot details .mat{ white-space:pre-line; margin:6px 0 0; color:#3b4a52; }
.slot-notiz{ margin-top:8px; }
.slot-notiz textarea{ font-size:14px; padding:6px 10px; min-height:36px; border-color:#edf1ef; }
.slot-aendern{ margin-top:8px; display:grid; grid-template-columns:1fr 1fr; gap:8px; background:#fffaf0; border-radius:12px; padding:10px; }
.slot-aendern .voll{ grid-column:1/-1; display:flex; gap:8px; flex-wrap:wrap; }

.todo{ display:flex; align-items:flex-start; gap:8px; padding:3px 0; }
.todo input[type=checkbox]{ width:18px; height:18px; margin-top:3px; accent-color:var(--gruen); flex:none; }
.todo span{ flex:1; font-weight:700; font-size:14px; word-break:break-word; }
.todo.ok span{ text-decoration:line-through; color:var(--grau); }
.todo button{ border:0; background:none; color:#b9c2be; cursor:pointer; padding:2px 4px; }
.todo button:hover{ color:var(--rot); }
.todo-neu{ display:flex; gap:6px; margin-top:4px; }
.todo-neu input{ font-size:14px; padding:6px 10px; }

.unten{ display:grid; grid-template-columns:1fr 1fr; gap:18px; }
.extra{ display:grid; grid-template-columns:90px 90px 1fr auto; gap:8px; align-items:center; margin-bottom:8px; }

/* ---------- Woche ---------- */
.woche{ display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:12px; }
.w-tag{ background:white; border-radius:18px; box-shadow:var(--schatten); padding:12px; min-width:0; }
.w-tag.heute{ outline:3px solid var(--gold); }
.w-kopf{ display:flex; justify-content:space-between; align-items:baseline; text-decoration:none; color:var(--nacht); font-weight:900; margin-bottom:8px; }
.w-kopf small{ color:var(--grau); font-weight:800; }
.w-slot{ display:block; text-decoration:none; color:var(--text); border-left:5px solid var(--f, #c9d3d8); background:#f8faf9; border-radius:10px; padding:6px 8px; margin-bottom:6px; font-size:13px; }
.w-slot b{ display:block; font-size:12px; color:var(--f, var(--grau)); }
.w-slot .t{ font-weight:800; display:block; overflow-wrap:anywhere; }
.w-slot.aus{ opacity:.5; text-decoration:line-through; }
.w-slot.pause{ background:transparent; border-left-color:transparent; padding:2px 8px; color:var(--grau); }
.w-ferien{ background:#f9eeda; color:#8a5a12; border-radius:10px; padding:4px 8px; font-size:12px; font-weight:800; margin-bottom:6px; }

/* ---------- Stundenplan ---------- */
.raster-zeile{ display:grid; grid-template-columns:28px 1fr 110px 110px auto; gap:8px; align-items:center; margin-bottom:8px; }
.raster-zeile.pause input[type=text]{ background:#f8faf9; font-style:italic; }
.raster-zeile .griff{ color:var(--grau); font-weight:900; text-align:center; }
.tag-chips{ display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; }
.tag-chips button{ border:2px solid var(--linie); background:white; border-radius:99px; padding:7px 16px; font-weight:900; cursor:pointer; color:var(--nacht); }
.tag-chips .kurz-tag{ display:none; }
.tag-chips button.aktiv{ background:var(--nacht); color:white; border-color:var(--nacht); }
.sp-zeile{ display:grid; grid-template-columns:86px 170px 120px 1fr 96px 118px; gap:8px; align-items:center; padding:8px 0; border-bottom:1px solid #eef1ef; }
.sp-titelzeile{ padding:0 0 4px; font-size:12px; font-weight:800; color:var(--grau); text-transform:uppercase; letter-spacing:.04em; }
.zweit-check{ display:flex; align-items:center; gap:6px; font-size:13px; font-weight:800; color:var(--nacht); cursor:pointer; line-height:1.15; }
.zweit-check input{ width:18px; height:18px; accent-color:var(--meer); flex:none; }
.sp-zeile:last-child{ border-bottom:0; }
.sp-zeile .z{ font-weight:900; color:var(--nacht); }
.sp-zeile .z small{ display:block; color:var(--grau); font-size:12px; }
.sp-zeile.pause .z{ color:var(--grau); font-style:italic; }
.uebersicht{ overflow-x:auto; }
table.ue{ width:100%; border-collapse:collapse; min-width:620px; table-layout:fixed; }
table.ue th{ background:#eef3f6; font-size:12px; text-transform:uppercase; color:var(--nacht); padding:8px 4px; border:1px solid var(--linie); }
table.ue th:first-child{ width:90px; }
table.ue td{ border:1px solid var(--linie); padding:5px; font-size:13px; vertical-align:top; }
table.ue td.z{ font-weight:900; text-align:center; background:#fafbfa; }
table.ue td.z small{ display:block; font-weight:700; color:var(--grau); font-size:11px; }
table.ue .zelle{ border-left:4px solid var(--f); padding-left:6px; }
table.ue .zelle b{ display:block; color:var(--f); font-size:12px; }
table.ue tr.pause td{ background:#fafbfa; color:var(--grau); font-style:italic; }

/* ---------- Auswahl (Stunde einfügen) ---------- */
.dialog-hg{ position:fixed; inset:0; background:rgba(22,50,74,.45); display:flex; align-items:flex-end; justify-content:center; z-index:50; }
@media (min-width:700px){ .dialog-hg{ align-items:center; } }
.dialog{ background:white; width:min(680px,100%); max-height:88vh; border-radius:22px 22px 0 0; display:flex; flex-direction:column; overflow:hidden; }
@media (min-width:700px){ .dialog{ border-radius:22px; } }
.dialog-kopf{ padding:16px 18px 10px; border-bottom:1px solid var(--linie); }
.dialog-kopf h2{ margin:0 0 10px; font-size:18px; font-weight:900; display:flex; justify-content:space-between; align-items:center; }
.dialog-kopf .bereiche{ display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px; }
.dialog-liste{ overflow-y:auto; padding:6px 18px 18px; }
.dialog-liste h4{ margin:14px 0 6px; font-size:12px; text-transform:uppercase; letter-spacing:.04em; color:var(--grau); }
.wahl{ display:flex; gap:10px; align-items:center; width:100%; text-align:left; border:0; background:#f6f9fb; border-radius:12px; padding:10px 12px; margin-bottom:6px; cursor:pointer; font-weight:800; color:var(--text); }
.wahl:hover{ background:#e7f1fb; }
.wahl small{ margin-left:auto; color:var(--grau); font-weight:700; font-size:12px; white-space:nowrap; }
.wahl.vorschlag{ background:#fff4df; }

#toast{ position:fixed; left:50%; bottom:24px; transform:translateX(-50%); background:var(--nacht); color:white; padding:10px 18px; border-radius:12px; font-weight:800; opacity:0; transition:.25s; pointer-events:none; z-index:60; max-width:92%; }
#toast.zeigen{ opacity:1; }
#toast.fehler{ background:var(--rot); }

/* ---------- Handy ---------- */
@media (max-width:900px){ .woche{ grid-template-columns:repeat(2, minmax(0,1fr)); } .sp-zeile{ grid-template-columns:80px 1fr 1fr; } .sp-zeile .z{ grid-row:span 2; } .sp-titelzeile{ display:none; } }
@media (max-width:640px){
    .kopf h1{ font-size:22px; }
    .woche{ grid-template-columns:1fr; }
    .unten{ grid-template-columns:1fr; }
    .slot-zeit{ width:68px; padding-left:10px; }
    .slot-zeit .nr{ font-size:17px; }
    .slot-knoepfe{ margin-left:0; width:100%; }
    .slot-aendern{ grid-template-columns:1fr; }
    .extra{ grid-template-columns:1fr 1fr auto; }
    .extra .ex-titel{ grid-column:1/-1; order:-1; }
    .raster-zeile{ grid-template-columns:20px 54px 1fr 1fr auto; gap:5px; }
    .raster-zeile input[type=time]{ padding:7px 4px; }
    .sp-zeile{ grid-template-columns:1fr 1fr; }
    .sp-titelzeile{ display:none; }
    .sp-zeile .z{ grid-column:1/-1; }
    .tag-chips .kurz-tag{ display:inline; } .tag-chips .lang-tag{ display:none; }
    .tag-chips button{ flex:1; padding:7px 0; }
    .karte{ padding:16px; }
}

/* ---------- Druck ---------- */
#druck{ display:none; }
@media print{
    body > *:not(#druck){ display:none !important; }
    #druck{ display:block; }
    body{ background:white; }
    #druck *{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
}
.dr-titel{ font-size:20pt; font-weight:900; color:var(--nacht); margin:0 0 2mm; }
.dr-unter{ font-size:10pt; color:var(--grau); font-weight:800; margin-bottom:5mm; }
.dr-slot{ display:flex; gap:4mm; border-left:2mm solid var(--f, #c9d3d8); padding:2mm 3mm; margin-bottom:2.5mm; background:#f8faf9; break-inside:avoid; font-size:10.5pt; }
.dr-slot.pause{ background:none; border-left-color:transparent; color:var(--grau); font-style:italic; padding:0.5mm 3mm; }
.dr-slot .z{ width:22mm; flex:none; font-weight:900; }
.dr-slot .z small{ display:block; font-weight:700; color:var(--grau); font-size:8.5pt; }
.dr-slot .i{ flex:1; }
.dr-slot .i b{ color:var(--f); }
.dr-slot .st{ font-weight:900; font-size:11.5pt; }
.dr-slot .no{ white-space:pre-line; color:#3b4a52; margin-top:1mm; }
.dr-slot ul{ margin:1mm 0 0; padding-left:5mm; }
.dr-block{ margin-top:5mm; font-size:10.5pt; break-inside:avoid; }
.dr-block h3{ font-size:11pt; margin:0 0 1.5mm; color:var(--nacht); }
.dr-linien div{ border-bottom:0.3mm solid #c9d3d8; height:7mm; }
table.dr-woche{ width:100%; border-collapse:collapse; table-layout:fixed; font-size:9pt; }
table.dr-woche th, table.dr-woche td{ border:0.3mm solid #c9d3d8; padding:1.5mm; vertical-align:top; }
table.dr-woche th{ background:#eef3f6; }
table.dr-woche td.z{ width:18mm; font-weight:900; text-align:center; }
table.dr-woche .zelle{ border-left:1.2mm solid var(--f); padding-left:1.5mm; }
table.dr-woche .zelle b{ color:var(--f); display:block; font-size:8pt; }
</style>
<style id="druckSeite">@page{ size:A4 portrait; margin:12mm; }</style>
</head>
<body>

<header class="kopf">
  <div class="kopf-innen">
    <div class="kopf-zeile">
      <a class="zurueck" href="<?= $LT_GAST ? "gast.php" : "index.php" ?>"><i class="fa-solid fa-arrow-left"></i> Leuchtturm</a>
      <h1><i class="fa-solid fa-calendar-day"></i> Mein Tag</h1>
      <span class="speicherstatus" id="status"></span>
    </div>
    <nav class="reiter">
      <a href="#tag" data-reiter="tag"><i class="fa-solid fa-sun"></i> Tag</a>
      <a href="#woche" data-reiter="woche"><i class="fa-solid fa-calendar-week"></i> Woche</a>
      <a href="#stundenplan" data-reiter="stundenplan"><i class="fa-solid fa-table-cells"></i> Mein Stundenplan</a>
    </nav>
  </div>
</header>

<main class="seite" id="inhalt"></main>
<div id="toast"></div>
<div id="druck"></div>

<script>
window.TP_DATEN = <?= json_encode((object)$tagesplan, $JSON) ?>;
window.TP_PLAENE = <?= json_encode($PLAENE, $JSON) ?>;
window.TP_VORLAGEN = <?= json_encode($VORLAGEN, $JSON) ?>;
window.TP_CSRF = <?= json_encode($_SESSION["tagesplan_csrf"], $JSON) ?>;
window.TP_GESPERRT = <?= $tpKaputt ? "true" : "false" ?>;
</script>
<script>
"use strict";
/* ============================================================
   Grundlagen
   ============================================================ */
const DATEN = window.TP_DATEN;
if (!DATEN.tage || Array.isArray(DATEN.tage)) DATEN.tage = {};
const PLAENE = window.TP_PLAENE;
const VORL = { sozial: null, lernangebot: null, vertretung: null };   // fertige Stunden, werden nachgeladen
const inhalt = document.getElementById("inhalt");

const ARTEN = {
    "":          { name: "frei",              farbe: "#b5c0c5", icon: "fa-mug-hot" },
    sozial:      { name: "Sozialtraining",    farbe: "#3d7ea6", icon: "fa-people-group", bereich: "sozial" },
    lernangebot: { name: "Lernangebot",       farbe: "#2e8b57", icon: "fa-seedling", bereich: "lernangebot" },
    lrs:         { name: "LRS-Förderung",     farbe: "#7b5cc4", icon: "fa-pen-nib" },
    vertretung:  { name: "Vertretung",        farbe: "#e07a2f", icon: "fa-shuffle", bereich: "vertretung" },
    unterricht:  { name: "Unterricht",        farbe: "#16324a", icon: "fa-chalkboard-user" },
    aufsicht:    { name: "Aufsicht",          farbe: "#b08a2e", icon: "fa-eye" },
    termin:      { name: "Termin / Besprechung", farbe: "#c0392b", icon: "fa-handshake" },
    sonstiges:   { name: "Sonstiges",         farbe: "#7c8a85", icon: "fa-thumbtack" }
};
const BEREICHE = {
    sozial:      { name: "Sozialtraining", url: "sozial-stunden.php" },
    lernangebot: { name: "Lernangebot",    url: "sozial-stunden.php?bereich=lernangebot" },
    vertretung:  { name: "Vertretung",     url: "sozial-stunden.php?bereich=vertretung" }
};
const KLASSEN_STANDARD = [{ id: "gs1", name: "GS1", stufe: "12" }, { id: "gs2", name: "GS2", stufe: "12" }, { id: "gs3", name: "GS3", stufe: "34" }, { id: "gs4", name: "GS4", stufe: "34" }];
const STATUS = { gehalten: ["✓ gehalten", "gruen"], angefangen: ["◐ angefangen", "gold"], ausgefallen: ["✗ ausgefallen", "rot"], entfaellt: ["– entfällt", "grau"] };
const TAGNAMEN = ["", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
const TAGKURZ = ["", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function esc(s){ return String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c])); }
function neueId(p){ return p + Math.random().toString(36).slice(2, 9); }
let toastTimer = null;
function toast(t, fehler){ const el = document.getElementById("toast"); el.textContent = t; el.className = "zeigen" + (fehler ? " fehler" : ""); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.className = "", 3200); }

/* ---------- Datum ---------- */
function tagVon(isoStr){ const [j, m, t] = isoStr.split("-").map(Number); return new Date(Date.UTC(j, m - 1, t)); }
function iso(d){ return d.toISOString().slice(0, 10); }
function heute(){ const n = new Date(); return iso(new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()))); }
function plusTage(isoStr, n){ const d = tagVon(isoStr); d.setUTCDate(d.getUTCDate() + n); return iso(d); }
function wochentag(isoStr){ return ((tagVon(isoStr).getUTCDay() + 6) % 7) + 1; }   // 1 = Mo … 7 = So
function montag(isoStr){ return plusTage(isoStr, 1 - wochentag(isoStr)); }
function kw(isoStr){ const x = tagVon(isoStr); x.setUTCDate(x.getUTCDate() + 3 - ((x.getUTCDay() + 6) % 7)); const j = new Date(Date.UTC(x.getUTCFullYear(), 0, 4)); return 1 + Math.round(((x - j) / 864e5 - 3 + ((j.getUTCDay() + 6) % 7)) / 7); }
function kurz(isoStr){ const [, m, t] = isoStr.split("-"); return t + "." + m + "."; }
function lang(isoStr){ const [j, m, t] = isoStr.split("-"); return TAGNAMEN[wochentag(isoStr)] + ", " + t + "." + m + "." + j; }
function gueltig(isoStr){ return /^\d{4}-\d{2}-\d{2}$/.test(isoStr || "") && !isNaN(tagVon(isoStr)); }

/* ============================================================
   Speichern
   ============================================================ */
async function senden(daten){
    if (window.TP_GESPERRT) throw new Error("tagesplan.json ist beschädigt – Speichern ist gesperrt.");
    const r = await fetch("tagesplan-speichern.php", { method: "POST", headers: { "Content-Type": "application/json", "X-CSRF": window.TP_CSRF }, body: JSON.stringify(daten), credentials: "same-origin" });
    let j = null; try { j = await r.json(); } catch (e) {}
    if (!j || !j.ok) throw new Error((j && j.fehler) || "Speichern hat nicht geklappt (Verbindung?).");
    return j;
}
const offen = new Map();   // Schlüssel → Timer
function status(text, fehler){ const s = document.getElementById("status"); s.className = "speicherstatus" + (fehler ? " fehler" : ""); s.innerHTML = text; }
function spaeterSpeichern(schluessel, aufgabe){
    status("Speichert …");
    clearTimeout(offen.get(schluessel));
    offen.set(schluessel, setTimeout(async () => {
        offen.delete(schluessel);
        try { const j = await aufgabe(); if (!offen.size) status('<i class="fa-solid fa-check"></i> Gespeichert ' + (j.zeit || "")); }
        catch (err) { status(esc(err.message), true); toast(err.message, true); }
    }, 600));
}
function stundenplanSpeichern(){ spaeterSpeichern("sp", () => senden({ aktion: "stundenplan_speichern", stundenplan: sp() })); }
function tagLeer(t){ return !t || (!Object.keys(t.slots || {}).length && !(t.extra || []).length && !(t.todos || []).length && !(t.notiz || "").trim()); }
function tagSpeichern(datum){
    const t = DATEN.tage[datum];
    if (t && t.slots) Object.keys(t.slots).forEach(k => { if (!Object.keys(t.slots[k]).filter(x => t.slots[k][x] !== "" && t.slots[k][x] !== undefined && !(Array.isArray(t.slots[k][x]) && !t.slots[k][x].length)).length) delete t.slots[k]; });
    spaeterSpeichern("tag" + datum, () => senden({ aktion: "tag_speichern", datum, tag: tagLeer(DATEN.tage[datum]) ? null : DATEN.tage[datum] }));
}
window.addEventListener("beforeunload", ev => { if (offen.size) { ev.preventDefault(); ev.returnValue = ""; } });

/* ============================================================
   Daten-Zugriff
   ============================================================ */
function sp(){
    if (!DATEN.stundenplan || typeof DATEN.stundenplan !== "object") DATEN.stundenplan = {};
    const s = DATEN.stundenplan;
    if (!Array.isArray(s.zeiten)) s.zeiten = [1, 2, 3, 4, 5, 6].map(n => ({ id: "z" + n, typ: "stunde", name: String(n), von: "", bis: "" }));
    if (!s.tage || Array.isArray(s.tage)) s.tage = {};
    return s;
}
function spEintrag(wt, zid, anlegen){
    const s = sp();
    if (!s.tage[wt] || Array.isArray(s.tage[wt])) { if (!anlegen) return {}; s.tage[wt] = {}; }
    if (!s.tage[wt][zid]) { if (!anlegen) return {}; s.tage[wt][zid] = {}; }
    return s.tage[wt][zid];
}
function spHatEtwas(){ const s = sp(); return Object.values(s.tage).some(t => t && Object.values(t).some(x => x && x.art)); }
function tagDaten(datum, anlegen){
    let t = DATEN.tage[datum];
    if (!t || typeof t !== "object" || Array.isArray(t)) { if (!anlegen) return { slots: {}, extra: [], todos: [], notiz: "" }; t = DATEN.tage[datum] = {}; }
    if (!t.slots || Array.isArray(t.slots)) t.slots = {};
    if (!Array.isArray(t.extra)) t.extra = [];
    if (!Array.isArray(t.todos)) t.todos = [];
    if (typeof t.notiz !== "string") t.notiz = "";
    return t;
}
function slotDaten(datum, zid){ const t = tagDaten(datum, true); if (!t.slots[zid] || Array.isArray(t.slots[zid])) t.slots[zid] = {}; return t.slots[zid]; }

function klassenVon(b){ const p = PLAENE[b] && PLAENE[b].jahresplan; return (p && Array.isArray(p.klassen) && p.klassen.length) ? p.klassen : KLASSEN_STANDARD; }
// Klassen für die Spalte „Klasse“: GS1–GS4, SEK1–SEK7 und weitere Klassen aus den Jahresplänen
const KLASSEN_ALLE = [...KLASSEN_STANDARD, ...[1, 2, 3, 4, 5, 6, 7].map(n => ({ id: "sek" + n, name: "SEK" + n }))];
function klassenListe(){
    const liste = KLASSEN_ALLE.map(k => ({ ...k }));
    ["sozial", "lernangebot"].forEach(b => klassenVon(b).forEach(k => { if (!liste.some(x => x.id === k.id)) liste.push({ id: k.id, name: k.name }); }));
    return liste;
}
function klasseName(b, id){ const k = klassenVon(b).find(x => x.id === id) || klassenListe().find(x => x.id === id); return k ? k.name : id; }
function klasseOptionen(sel){
    const l = klassenListe();
    const gs = l.filter(k => !/^sek/.test(k.id)), sek = l.filter(k => /^sek/.test(k.id));
    const opt = k => `<option value="${esc(k.id)}" ${k.id === sel ? "selected" : ""}>${esc(k.name)}</option>`;
    return `<option value="">– Klasse –</option><optgroup label="Grundschule">${gs.map(opt).join("")}</optgroup><optgroup label="Sekundarstufe">${sek.map(opt).join("")}</optgroup>`;
}
function klasseStufe(b, id){ const k = klassenVon(b).find(x => x.id === id); return k ? k.stufe : ""; }

// Was sagt der Jahresplan (Sozialtraining/Lernangebot) für diese Klasse an diesem Tag?
function planEintrag(b, datum, klasseId){
    const p = PLAENE[b] && PLAENE[b].jahresplan;
    if (!p || !p.wochen || Array.isArray(p.wochen)) return null;
    const w = p.wochen[montag(datum)];
    if (!w) return null;
    if (w.frei) return { frei: true, notiz: w.notiz || "" };
    const kl = klassenVon(b).find(k => k.id === klasseId);
    if (!kl) return null;
    const x = (w.klassen && w.klassen[kl.id]) || {};
    const stufenThema = (w.einheiten && Object.prototype.hasOwnProperty.call(w.einheiten, kl.stufe)) ? (w.einheiten[kl.stufe] || "") : (w.einheit || "");
    const jeKlasse = !!p.jeKlasse;
    return { id: x.einheit || (jeKlasse ? "" : stufenThema), status: x.status || (w.erledigt && !w.klassen ? "gehalten" : ""), fortsetzung: !!x.fortsetzung, notiz: x.notiz || w.notiz || "" };
}
// Eine Stunde finden – eigene/angepasste vor den fertigen Vorlagen
function einheitFinden(b, id){
    if (!b || !id || !PLAENE[b]) return null;
    const eig = PLAENE[b].einheiten;
    const e = eig.find(x => x.id === id) || eig.find(x => x.ersetzt === id) || (VORL[b] || []).find(x => x.id === id);
    return e ? { ...e, b } : null;
}
function alleEinheiten(b){
    const eig = PLAENE[b] ? PLAENE[b].einheiten : [];
    const ersetzt = new Set(eig.map(e => e.ersetzt).filter(Boolean));
    return [...(VORL[b] || []).filter(v => !ersetzt.has(v.id)), ...eig].map(e => ({ ...e, b }));
}
function stundeLink(e){ return BEREICHE[e.b].url + "#stunde/" + encodeURIComponent(e.id); }

// Alles, was an einem Tag in einer Zeile des Stundenplans steht (Stundenplan + Änderungen des Tages + Jahresplan)
function slotInfo(datum, zid){
    const wt = wochentag(datum);
    const def = spEintrag(wt, zid, false);
    const t = DATEN.tage[datum];
    const ov = (t && t.slots && t.slots[zid]) || {};
    const geaendert = ov.art !== undefined;
    const art = geaendert ? ov.art : (def.art || "");
    const klasse = geaendert ? (ov.klasse || "") : (def.klasse || "");
    const titel = geaendert ? (ov.titel || "") : (def.titel || "");
    const raum = geaendert && ov.raum !== undefined ? ov.raum : (def.raum || "");
    const zweit = geaendert && ov.zweit !== undefined ? !!ov.zweit : !!def.zweit;
    let einheit = null, quelle = "", plan = null;
    if (ov.einheit && ov.einheit.id) {
        einheit = einheitFinden(ov.einheit.b, ov.einheit.id) || { b: ov.einheit.b, id: ov.einheit.id, titel: ov.einheit.titel || "Stunde", fehlt: true };
        quelle = "eingefuegt";
    }
    if ((art === "sozial" || art === "lernangebot") && klasse) {
        plan = planEintrag(art, datum, klasse);
        if (!einheit && plan && plan.id && !ov.ohnePlan) {
            einheit = einheitFinden(art, plan.id) || { b: art, id: plan.id, titel: VORL[art] ? "Stunde nicht gefunden" : "wird geladen …", fehlt: !!VORL[art] };
            quelle = "plan";
        }
    }
    return { def, ov, geaendert, art, klasse, titel, raum, zweit, einheit, quelle, plan, aus: !!ov.entfaellt };
}
function werText(info){
    return [info.klasse ? klasseName(info.art, info.klasse) : "", info.titel || ""].filter(Boolean).join(" · ");
}
const ZWEIT_CHIP = `<span class="chip grau"><i class="fa-solid fa-user-group"></i> Zweitbesetzung</span>`;
function zeitText(z){ return z.von ? z.von + (z.bis ? "–" + z.bis : "") : ""; }

/* ============================================================
   Ansichten
   ============================================================ */
function reiter(name){ document.querySelectorAll(".reiter a").forEach(a => a.classList.toggle("aktiv", a.dataset.reiter === name)); }
let ansicht = { name: "tag", datum: heute(), spTag: 1 };
function route(){
    const [n, d] = decodeURIComponent(location.hash.slice(1)).split("/");
    if (n === "stundenplan") { ansicht.name = "stundenplan"; return zeigeStundenplan(); }
    if (n === "woche") { ansicht.name = "woche"; ansicht.datum = gueltig(d) ? d : (ansicht.datum || heute()); return zeigeWoche(); }
    ansicht.name = "tag"; ansicht.datum = gueltig(d) ? d : heute();
    zeigeTag();
}
function neuZeichnen(){ const y = window.scrollY; route(); window.scrollTo(0, y); }
window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); });

function hoehe(ta){ ta.style.height = "auto"; ta.style.height = ta.scrollHeight + 2 + "px"; }
function textfelderAnpassen(){ inhalt.querySelectorAll("textarea").forEach(hoehe); }

/* ---------- Tag ---------- */
function todoHtml(liste, wo){
    return `${liste.map((x, i) => `<div class="todo ${x.ok ? "ok" : ""}"><input type="checkbox" data-todo="${wo}" data-i="${i}" ${x.ok ? "checked" : ""}><span>${esc(x.t)}</span><button data-todoweg="${wo}" data-i="${i}" title="Löschen"><i class="fa-solid fa-xmark"></i></button></div>`).join("")}
        <div class="todo-neu"><input type="text" data-todoneu="${wo}" placeholder="${wo === "tag" ? "To-do für heute …" : "To-do (z. B. kopieren, mitbringen) …"}" maxlength="300"><button class="btn klein" data-todoplus="${wo}" title="Hinzufügen"><i class="fa-solid fa-plus"></i></button></div>`;
}
function stundeHtml(info){
    const e = info.einheit;
    const b = ARTEN[info.art] && ARTEN[info.art].bereich;
    if (e) {
        const quelle = info.quelle === "plan" ? `<small><i class="fa-solid fa-calendar-week"></i> aus dem Jahresplan ${BEREICHE[e.b].name}${info.plan && info.plan.fortsetzung ? " · Fortsetzung" : ""}</small>` : `<small><i class="fa-solid fa-thumbtack"></i> eingefügt · ${BEREICHE[e.b].name}${e.kategorie ? " · " + esc(e.kategorie) : ""}</small>`;
        const st = info.plan && info.plan.status && STATUS[info.plan.status] && info.quelle === "plan" ? `<span class="chip ${STATUS[info.plan.status][1]}">${STATUS[info.plan.status][0]}</span>` : "";
        const stufe = (e.b === "sozial" || e.b === "lernangebot") && info.klasse ? klasseStufe(info.art, info.klasse) : "";
        const ziel = stufe === "34" ? e.ziel34 : stufe === "12" ? e.ziel12 : (e.ziel12 || e.ziel34);
        const mehr = (ziel || e.material) ? `<details><summary><i class="fa-solid fa-box-open"></i> Ziel &amp; Material</summary><div class="mat">${ziel ? "<b>Ziel:</b> " + esc(ziel) + "\n" : ""}${e.material ? "<b>Material:</b>\n" + esc(e.material) : ""}</div></details>` : "";
        return `<div class="slot-stunde"><div class="titel">${esc(e.titel)}${quelle}</div>${st}
            ${e.fehlt ? "" : `<a class="btn klein blau" href="${esc(stundeLink(e))}"><i class="fa-solid fa-book-open"></i> Öffnen</a>`}
            <button class="btn klein" data-waehlen title="Andere Stunde einfügen"><i class="fa-solid fa-repeat"></i></button>
            <button class="btn klein flach" data-stundeweg title="${info.quelle === "plan" ? "Heute nicht die Stunde aus dem Jahresplan" : "Stunde entfernen"}"><i class="fa-solid fa-xmark"></i></button></div>${mehr}`;
    }
    if (info.plan && info.plan.frei) return `<div class="slot-stunde leer-stunde"><div class="titel" style="color:#8a5a12">Laut Jahresplan: Ferien / fällt aus${info.plan.notiz ? " · " + esc(info.plan.notiz) : ""}</div><button class="btn klein" data-waehlen><i class="fa-solid fa-plus"></i> Stunde einfügen</button></div>`;
    if (b || info.ov.ohnePlan) return `<div class="slot-stunde leer-stunde"><div class="titel" style="color:var(--grau);font-weight:800">${(info.art === "sozial" || info.art === "lernangebot") && info.klasse && !info.ov.ohnePlan && klassenVon(info.art).some(k => k.id === info.klasse) ? "Im Jahresplan steht für diese Woche noch nichts" : "Noch keine Stunde geplant"}</div>
        <button class="btn klein gold" data-waehlen><i class="fa-solid fa-plus"></i> Stunde einfügen</button>${info.ov.ohnePlan ? `<button class="btn klein flach" data-planzurueck title="Wieder die Stunde aus dem Jahresplan zeigen"><i class="fa-solid fa-rotate-left"></i> Jahresplan</button>` : ""}</div>`;
    return "";
}
function aendernHtml(info){
    const arten = Object.entries(ARTEN).map(([k, a]) => `<option value="${k}" ${k === info.art ? "selected" : ""}>${a.name}</option>`).join("");
    return `<div class="slot-aendern">
        <select data-aart>${arten}</select>
        <select data-aklasse>${klasseOptionen(info.klasse)}</select>
        <input type="text" data-atitel value="${esc(info.titel)}" placeholder="Fach / Gruppe / Was?" maxlength="80">
        <input type="text" data-araum value="${esc(info.raum)}" placeholder="Raum" maxlength="40">
        <label class="zweit-check voll"><input type="checkbox" data-azweit ${info.zweit ? "checked" : ""}> Ich bin Zweitbesetzung</label>
        <div class="voll"><button class="btn klein nacht" data-afertig><i class="fa-solid fa-check"></i> Fertig</button>
        ${info.geaendert ? `<button class="btn klein" data-azurueck><i class="fa-solid fa-rotate-left"></i> Wie im Stundenplan</button>` : ""}
        <span style="font-size:12px;color:var(--grau);font-weight:700;align-self:center">Gilt nur für diesen Tag.</span></div></div>`;
}
let offenAendern = null;   // zid, dessen „heute ändern“ offen ist
function zeigeTag(){
    reiter("tag");
    const d = ansicht.datum, wt = wochentag(d), s = sp(), t = tagDaten(d, false);
    const istHeute = d === heute();
    const zeiten = wt <= 5 ? s.zeiten : [];
    const slots = zeiten.map(z => {
        const info = slotInfo(d, z.id);
        const a = ARTEN[info.art] || ARTEN.sonstiges;
        const pause = z.typ === "pause";
        if (pause && !info.art && !(info.ov.notiz) && offenAendern !== z.id) {
            return `<div class="slot pause" data-z="${esc(z.id)}"><div class="slot-zeit"><small>${esc(zeitText(z))}</small></div><div class="slot-inhalt" style="padding-top:12px;display:flex;gap:8px;align-items:center;color:var(--grau);font-weight:800"><i class="fa-solid fa-mug-hot"></i> ${esc(z.name || "Pause")}<button class="btn klein flach" data-aendern title="Aufsicht o. Ä. eintragen"><i class="fa-solid fa-pen"></i></button></div></div>`;
        }
        const ov = info.ov, todos = Array.isArray(ov.todos) ? ov.todos : [];
        return `<div class="slot ${info.aus ? "aus" : ""}" data-z="${esc(z.id)}" style="--f:${a.farbe}">
            <div class="slot-zeit"><span class="nr">${pause ? '<i class="fa-solid fa-mug-hot" style="font-size:15px"></i>' : esc(z.name)}</span><small>${esc(zeitText(z)).replace("–", "<br>")}</small></div>
            <div class="slot-inhalt">
                <div class="slot-kopf">
                    <span class="slot-art"><i class="fa-solid ${a.icon}"></i> ${info.art ? a.name : (pause ? esc(z.name || "Pause") : "frei")}</span>
                    ${werText(info) ? `<span class="slot-wer">${esc(werText(info))}</span>` : ""}
                    ${info.raum ? `<span class="slot-raum"><i class="fa-solid fa-door-open"></i> ${esc(info.raum)}</span>` : ""}
                    ${info.zweit ? ZWEIT_CHIP : ""}
                    ${info.geaendert ? `<span class="chip gold">heute geändert</span>` : ""}
                    ${info.aus ? `<span class="chip rot">fällt aus</span>` : ""}
                    <span class="slot-knoepfe">
                        ${info.art === "lrs" ? `<a class="btn klein flach" href="lrs-timer.php" title="Stunden-Timer"><i class="fa-solid fa-stopwatch"></i></a><a class="btn klein flach" href="trainingshefte.php" title="Kinder-Akten"><i class="fa-solid fa-user-graduate"></i></a>` : ""}
                        <button class="btn klein flach" data-aendern title="Nur heute ändern (z. B. Vertretung)"><i class="fa-solid fa-pen"></i></button>
                        <button class="btn klein flach" data-aus title="${info.aus ? "Findet doch statt" : "Fällt heute aus"}"><i class="fa-solid ${info.aus ? "fa-rotate-left" : "fa-ban"}"></i></button>
                    </span>
                </div>
                ${offenAendern === z.id ? aendernHtml(info) : ""}
                ${info.aus ? "" : stundeHtml(info)}
                <div class="slot-notiz"><textarea data-notiz rows="1" placeholder="Notiz zur Stunde (Kürzel statt Namen) …" maxlength="3000">${esc(ov.notiz || "")}</textarea></div>
                ${todos.length || ov.todoOffen ? `<div style="margin-top:6px">${todoHtml(todos, "z:" + z.id)}</div>` : `<button class="btn klein flach" data-todoauf style="margin-top:2px;padding-left:0"><i class="fa-solid fa-list-check"></i> To-do</button>`}
            </div></div>`;
    }).join("");

    inhalt.innerHTML = `
        ${window.TP_GESPERRT ? `<div class="hinweis rot"><i class="fa-solid fa-triangle-exclamation"></i> Die Datei tagesplan.json ist beschädigt – Speichern ist gesperrt, damit nichts verloren geht.</div>` : ""}
        <div class="datum-leiste">
            <button class="btn rund" data-tag="-1" title="Tag davor"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="datum">${esc(lang(d))}<small>KW ${kw(d)}${istHeute ? " · heute" : ""}</small></div>
            <button class="btn rund" data-tag="1" title="Nächster Tag"><i class="fa-solid fa-chevron-right"></i></button>
            ${istHeute ? "" : `<button class="btn" data-heute><i class="fa-solid fa-sun"></i> Heute</button>`}
            <input type="date" id="datumWahl" value="${d}" aria-label="Datum wählen">
            <button class="btn nacht" data-drucken><i class="fa-solid fa-print"></i> Drucken</button>
        </div>
        ${!spHatEtwas() ? `<div class="hinweis blau"><i class="fa-solid fa-circle-info"></i> Trag zuerst <a href="#stundenplan">deinen Stundenplan</a> ein – dann erscheinen hier jeden Tag deine Stunden, und Sozialtraining und Lernangebot holen sich die Stunde aus dem Jahresplan.</div>` : ""}
        ${wt > 5 ? `<div class="karte leer"><i class="fa-solid fa-umbrella-beach"></i> Wochenende – kein Stundenplan. Termine und To-dos gehen trotzdem.</div>` : slots}
        <div class="unten">
            <div class="karte"><h2><i class="fa-solid fa-clock"></i> Weitere Termine</h2>
                ${t.extra.map((x, i) => `<div class="extra"><input type="time" data-ex="${i}" data-feld="von" value="${esc(x.von || "")}" aria-label="von"><input type="time" data-ex="${i}" data-feld="bis" value="${esc(x.bis || "")}" aria-label="bis"><input class="ex-titel" type="text" data-ex="${i}" data-feld="titel" value="${esc(x.titel || "")}" placeholder="z. B. Konferenz, Elterngespräch …" maxlength="120"><button class="btn klein flach" data-exweg="${i}" title="Löschen"><i class="fa-solid fa-trash"></i></button></div>`).join("") || `<p style="color:var(--grau);font-weight:700;margin:0 0 10px">Nichts außer dem Stundenplan.</p>`}
                <button class="btn klein" data-explus><i class="fa-solid fa-plus"></i> Termin</button>
            </div>
            <div class="karte"><h2><i class="fa-solid fa-list-check"></i> To-dos für den Tag</h2>${todoHtml(t.todos, "tag")}</div>
        </div>
        <div class="karte"><h2><i class="fa-solid fa-note-sticky"></i> Notizen</h2><textarea data-tagnotiz rows="3" placeholder="Was sonst noch wichtig ist …" maxlength="5000">${esc(t.notiz)}</textarea></div>`;
    textfelderAnpassen();
    tagEreignisse(d);
}
function tagEreignisse(d){
    inhalt.querySelectorAll("[data-tag]").forEach(b => b.onclick = () => location.hash = "tag/" + plusTage(d, +b.dataset.tag));
    const h = inhalt.querySelector("[data-heute]"); if (h) h.onclick = () => location.hash = "tag/" + heute();
    document.getElementById("datumWahl").onchange = e => { if (gueltig(e.target.value)) location.hash = "tag/" + e.target.value; };
    inhalt.querySelector("[data-drucken]").onclick = () => druckeTag(d);
    inhalt.querySelectorAll("textarea").forEach(ta => ta.addEventListener("input", () => hoehe(ta)));

    inhalt.querySelectorAll(".slot[data-z]").forEach(el => {
        const zid = el.dataset.z;
        const q = s => el.querySelector(s);
        const notiz = q("[data-notiz]");
        if (notiz) notiz.oninput = () => { slotDaten(d, zid).notiz = notiz.value; hoehe(notiz); tagSpeichern(d); };
        if (q("[data-aus]")) q("[data-aus]").onclick = () => { const o = slotDaten(d, zid); if (o.entfaellt) delete o.entfaellt; else o.entfaellt = true; tagSpeichern(d); neuZeichnen(); };
        if (q("[data-aendern]")) q("[data-aendern]").onclick = () => { offenAendern = offenAendern === zid ? null : zid; neuZeichnen(); };
        if (q("[data-waehlen]")) q("[data-waehlen]").onclick = () => auswahl(d, zid);
        if (q("[data-stundeweg]")) q("[data-stundeweg]").onclick = () => { const o = slotDaten(d, zid), info = slotInfo(d, zid); if (info.quelle === "plan") o.ohnePlan = true; delete o.einheit; tagSpeichern(d); neuZeichnen(); };
        if (q("[data-planzurueck]")) q("[data-planzurueck]").onclick = () => { delete slotDaten(d, zid).ohnePlan; tagSpeichern(d); neuZeichnen(); };
        if (q("[data-todoauf]")) q("[data-todoauf]").onclick = () => { slotDaten(d, zid).todoOffen = true; neuZeichnen(); const i = inhalt.querySelector(`.slot[data-z="${zid}"] [data-todoneu]`); if (i) i.focus(); };
        // „Nur heute ändern“
        const aart = q("[data-aart]");
        if (aart) {
            const uebernehmen = () => {
                const o = slotDaten(d, zid), info = slotInfo(d, zid);
                if (!info.geaendert) { o.art = info.art; o.klasse = info.klasse; o.titel = info.titel; o.raum = info.raum; o.zweit = info.zweit; }
                o.art = aart.value;
                const k = q("[data-aklasse]"), ti = q("[data-atitel]"), r = q("[data-araum]");
                if (k) o.klasse = k.value; if (ti) o.titel = ti.value; if (r) o.raum = r.value;
                const zw = q("[data-azweit]"); if (zw) o.zweit = zw.checked;
                tagSpeichern(d);
            };
            aart.onchange = () => { uebernehmen(); neuZeichnen(); };
            ["[data-aklasse]", "[data-atitel]", "[data-araum]", "[data-azweit]"].forEach(s => { const f = q(s); if (f) f[f.tagName === "SELECT" || f.type === "checkbox" ? "onchange" : "oninput"] = () => { uebernehmen(); if (f.tagName === "SELECT" || f.type === "checkbox") neuZeichnen(); }; });
            q("[data-afertig]").onclick = () => { offenAendern = null; neuZeichnen(); };
            const zur = q("[data-azurueck]");
            if (zur) zur.onclick = () => { const o = slotDaten(d, zid); ["art", "klasse", "titel", "raum", "zweit"].forEach(x => delete o[x]); offenAendern = null; tagSpeichern(d); neuZeichnen(); };
        }
    });
    // To-dos (je Stunde und für den Tag)
    const liste = wo => wo === "tag" ? tagDaten(d, true).todos : (() => { const o = slotDaten(d, wo.slice(2)); if (!Array.isArray(o.todos)) o.todos = []; return o.todos; })();
    inhalt.querySelectorAll("[data-todo]").forEach(c => c.onchange = () => { liste(c.dataset.todo)[+c.dataset.i].ok = c.checked; c.closest(".todo").classList.toggle("ok", c.checked); tagSpeichern(d); });
    inhalt.querySelectorAll("[data-todoweg]").forEach(b => b.onclick = () => { liste(b.dataset.todoweg).splice(+b.dataset.i, 1); tagSpeichern(d); neuZeichnen(); });
    const neu = wo => { const i = inhalt.querySelector(`[data-todoneu="${wo}"]`); const v = i.value.trim(); if (!v) return; liste(wo).push({ t: v, ok: false }); tagSpeichern(d); neuZeichnen(); const n = inhalt.querySelector(`[data-todoneu="${wo}"]`); if (n) n.focus(); };
    inhalt.querySelectorAll("[data-todoplus]").forEach(b => b.onclick = () => neu(b.dataset.todoplus));
    inhalt.querySelectorAll("[data-todoneu]").forEach(i => i.onkeydown = e => { if (e.key === "Enter") { e.preventDefault(); neu(i.dataset.todoneu); } });
    // Termine & Notiz
    inhalt.querySelectorAll("[data-ex]").forEach(f => f.oninput = () => { tagDaten(d, true).extra[+f.dataset.ex][f.dataset.feld] = f.value; tagSpeichern(d); });
    inhalt.querySelectorAll("[data-exweg]").forEach(b => b.onclick = () => { tagDaten(d, true).extra.splice(+b.dataset.exweg, 1); tagSpeichern(d); neuZeichnen(); });
    inhalt.querySelector("[data-explus]").onclick = () => { tagDaten(d, true).extra.push({ von: "", bis: "", titel: "" }); neuZeichnen(); const f = inhalt.querySelectorAll(".ex-titel"); if (f.length) f[f.length - 1].focus(); };
    const tn = inhalt.querySelector("[data-tagnotiz]");
    tn.oninput = () => { tagDaten(d, true).notiz = tn.value; tagSpeichern(d); };
}

/* ---------- Stunde einfügen (Auswahl) ---------- */
function auswahl(d, zid){
    const info = slotInfo(d, zid);
    let b = (ARTEN[info.art] && ARTEN[info.art].bereich) || (info.einheit && info.einheit.b) || "sozial";
    let suche = "";
    const hg = document.createElement("div");
    hg.className = "dialog-hg";
    hg.innerHTML = `<div class="dialog" role="dialog" aria-label="Stunde einfügen"><div class="dialog-kopf">
        <h2><span><i class="fa-solid fa-plus"></i> Stunde einfügen</span><button class="btn klein flach" data-zu title="Schließen"><i class="fa-solid fa-xmark"></i></button></h2>
        <div class="bereiche">${Object.entries(BEREICHE).map(([k, x]) => `<button class="btn klein" data-b="${k}">${x.name}</button>`).join("")}</div>
        <input type="search" placeholder="Suchen …" data-suche></div><div class="dialog-liste"></div></div>`;
    document.body.appendChild(hg);
    const listeEl = hg.querySelector(".dialog-liste");
    const zu = () => { hg.remove(); document.removeEventListener("keydown", taste); };
    const taste = e => { if (e.key === "Escape") zu(); };
    document.addEventListener("keydown", taste);
    hg.onclick = e => { if (e.target === hg) zu(); };
    hg.querySelector("[data-zu]").onclick = zu;
    const nehmen = e => {
        const o = slotDaten(d, zid);
        o.einheit = { b: e.b, id: e.id, titel: e.titel };
        delete o.ohnePlan;
        tagSpeichern(d); zu(); neuZeichnen();
        toast("„" + e.titel + "“ eingefügt");
    };
    const zeichnen = () => {
        hg.querySelectorAll("[data-b]").forEach(x => { x.classList.toggle("nacht", x.dataset.b === b); });
        if (!VORL[b]) { listeEl.innerHTML = `<div class="leer"><i class="fa-solid fa-spinner fa-spin"></i> Stunden werden geladen …</div>`; return; }
        const s = suche.toLowerCase();
        const alle = alleEinheiten(b).filter(e => !s || (e.titel + " " + e.kategorie).toLowerCase().includes(s));
        let vorschlag = "";
        // Vorschläge: was im Jahresplan steht / zuletzt nicht gehalten wurde
        if (!s && (b === "sozial" || b === "lernangebot") && info.klasse && info.art === b) {
            const p = planEintrag(b, d, info.klasse), e = p && p.id ? einheitFinden(b, p.id) : null;
            if (e) vorschlag = `<h4>Laut Jahresplan diese Woche</h4><button class="wahl vorschlag" data-id="${esc(e.id)}"><i class="fa-solid fa-calendar-week" style="color:var(--gold)"></i> ${esc(e.titel)}<small>${esc(e.kategorie)}</small></button>`;
        }
        const zufall = b === "vertretung" && alle.length ? `<button class="btn klein gold" data-zufall style="margin:10px 0 4px"><i class="fa-solid fa-dice"></i> Zufällige Vertretungsstunde</button>` : "";
        const kats = [...new Set(alle.map(e => e.kategorie || "Sonstiges"))];
        listeEl.innerHTML = vorschlag + zufall + (kats.map(k => `<h4>${esc(k)}</h4>` + alle.filter(e => (e.kategorie || "Sonstiges") === k).map(e => `<button class="wahl" data-id="${esc(e.id)}">${esc(e.titel)}${e.ersetzt ? '<small>angepasst</small>' : (PLAENE[b].einheiten.some(x => x.id === e.id) ? '<small>eigene</small>' : "")}</button>`).join("")).join("") || `<div class="leer">Nichts gefunden.</div>`);
        listeEl.querySelectorAll("[data-id]").forEach(x => x.onclick = () => { const e = einheitFinden(b, x.dataset.id); if (e) nehmen(e); });
        const z = listeEl.querySelector("[data-zufall]");
        if (z) z.onclick = () => nehmen(alle[Math.floor(Math.random() * alle.length)]);
    };
    hg.querySelectorAll("[data-b]").forEach(x => x.onclick = () => { b = x.dataset.b; zeichnen(); });
    const si = hg.querySelector("[data-suche]");
    si.oninput = () => { suche = si.value.trim(); zeichnen(); };
    zeichnen();
    hg._neu = zeichnen;
    aktiverDialog = hg;
}
let aktiverDialog = null;

/* ---------- Woche ---------- */
function zeigeWoche(){
    reiter("woche");
    const mo = montag(ansicht.datum), s = sp();
    const tage = [0, 1, 2, 3, 4].map(i => plusTage(mo, i));
    const ferien = b => { const p = PLAENE[b] && PLAENE[b].jahresplan; const w = p && p.wochen && p.wochen[mo]; return w && w.frei; };
    inhalt.innerHTML = `
        <div class="datum-leiste">
            <button class="btn rund" data-woche="-7" title="Woche davor"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="datum">KW ${kw(mo)}<small>${kurz(mo)} – ${kurz(plusTage(mo, 4))}${mo === montag(heute()) ? " · diese Woche" : ""}</small></div>
            <button class="btn rund" data-woche="7" title="Nächste Woche"><i class="fa-solid fa-chevron-right"></i></button>
            ${mo === montag(heute()) ? "" : `<button class="btn" data-diese><i class="fa-solid fa-sun"></i> Diese Woche</button>`}
            <button class="btn nacht" data-drucken><i class="fa-solid fa-print"></i> Woche drucken</button>
        </div>
        ${ferien("sozial") || ferien("lernangebot") ? `<div class="hinweis"><i class="fa-solid fa-umbrella-beach"></i> Laut Jahresplan sind diese Woche Ferien bzw. ${ferien("sozial") && ferien("lernangebot") ? "Sozialtraining und Lernangebot fallen" : (ferien("sozial") ? "Sozialtraining fällt" : "Lernangebot fällt")} aus.</div>` : ""}
        <div class="woche">${tage.map(d => {
            const t = tagDaten(d, false);
            const offeneTodos = [...t.todos, ...Object.values(t.slots).flatMap(x => Array.isArray(x.todos) ? x.todos : [])].filter(x => !x.ok).length;
            const zeilen = s.zeiten.map(z => {
                const info = slotInfo(d, z.id), a = ARTEN[info.art] || ARTEN.sonstiges;
                if (z.typ === "pause" && !info.art) return "";
                if (!info.art && !info.einheit && !(info.ov.notiz)) return "";
                return `<a class="w-slot ${info.aus ? "aus" : ""}" href="#tag/${d}" style="--f:${a.farbe}"><b>${esc(z.typ === "pause" ? (z.name || "Pause") : z.name + ".")} ${esc(zeitText(z))} · ${esc(a.name)}</b><span class="t">${info.zweit ? '<i class="fa-solid fa-user-group" title="Zweitbesetzung" style="color:var(--grau)"></i> ' : ""}${esc(werText(info) || "")}${info.einheit && !info.aus ? (werText(info) ? ": " : "") + esc(info.einheit.titel) : ""}${info.ov.notiz ? ' <i class="fa-regular fa-note-sticky" style="color:var(--grau)"></i>' : ""}</span></a>`;
            }).join("");
            const extra = t.extra.filter(x => x.titel).map(x => `<a class="w-slot" href="#tag/${d}" style="--f:#c0392b"><b>${esc(x.von || "")}${x.bis ? "–" + esc(x.bis) : ""} · Termin</b><span class="t">${esc(x.titel)}</span></a>`).join("");
            return `<div class="w-tag ${d === heute() ? "heute" : ""}"><a class="w-kopf" href="#tag/${d}">${TAGNAMEN[wochentag(d)]}<small>${kurz(d)}</small></a>
                ${zeilen || extra ? zeilen + extra : `<div style="color:var(--grau);font-weight:700;font-size:13px">frei</div>`}
                ${offeneTodos ? `<a class="w-slot pause" href="#tag/${d}"><i class="fa-solid fa-list-check"></i> ${offeneTodos} To-do${offeneTodos > 1 ? "s" : ""} offen</a>` : ""}</div>`;
        }).join("")}</div>
        ${!spHatEtwas() ? `<div class="hinweis blau" style="margin-top:18px"><i class="fa-solid fa-circle-info"></i> Noch leer? Trag zuerst <a href="#stundenplan">deinen Stundenplan</a> ein.</div>` : ""}`;
    inhalt.querySelectorAll("[data-woche]").forEach(b => b.onclick = () => location.hash = "woche/" + plusTage(mo, +b.dataset.woche));
    const di = inhalt.querySelector("[data-diese]"); if (di) di.onclick = () => location.hash = "woche/" + montag(heute());
    inhalt.querySelector("[data-drucken]").onclick = () => druckeWoche(mo);
}

/* ---------- Stundenplan bearbeiten ---------- */
function zeigeStundenplan(){
    reiter("stundenplan");
    const s = sp(), wt = ansicht.spTag;
    const artOptionen = sel => Object.entries(ARTEN).map(([k, a]) => `<option value="${k}" ${k === sel ? "selected" : ""}>${k ? a.name : "– frei –"}</option>`).join("");
    inhalt.innerHTML = `
        ${window.TP_GESPERRT ? `<div class="hinweis rot"><i class="fa-solid fa-triangle-exclamation"></i> Die Datei tagesplan.json ist beschädigt – Speichern ist gesperrt.</div>` : ""}
        <div class="karte"><h2><i class="fa-solid fa-calendar-days"></i> Meine Woche</h2>
            <div class="tag-chips">${[1, 2, 3, 4, 5].map(i => `<button data-sptag="${i}" class="${i === wt ? "aktiv" : ""}"><span class="kurz-tag">${TAGKURZ[i]}</span><span class="lang-tag">${TAGNAMEN[i]}</span></button>`).join("")}</div>
            ${s.zeiten.length ? `<div class="sp-zeile sp-titelzeile"><span></span><span>Art</span><span>Klasse</span><span>Fach / Was</span><span>Raum</span><span></span></div>` : ""}
            ${s.zeiten.length ? s.zeiten.map(z => {
                const e = spEintrag(wt, z.id, false), art = e.art || "";
                const aus = art ? "" : "disabled";
                return `<div class="sp-zeile ${z.typ === "pause" ? "pause" : ""}" data-z="${esc(z.id)}">
                    <div class="z">${z.typ === "pause" ? esc(z.name || "Pause") : esc(z.name) + ". Stunde"}<small>${esc(zeitText(z)) || "&nbsp;"}</small></div>
                    <select data-f="art" style="border-left:6px solid ${(ARTEN[art] || ARTEN.sonstiges).farbe}" aria-label="Art">${artOptionen(art)}</select>
                    <select data-f="klasse" aria-label="Klasse" ${aus}>${klasseOptionen(e.klasse || "")}</select>
                    <input type="text" data-f="titel" value="${esc(e.titel || "")}" placeholder="${art === "lrs" ? "Gruppe / Kürzel" : art === "unterricht" ? "Fach" : art === "aufsicht" ? "Wo? (Hof, Flur …)" : "Was? (optional)"}" maxlength="80" aria-label="Was" ${aus}>
                    <input type="text" data-f="raum" value="${esc(e.raum || "")}" placeholder="Raum" maxlength="40" aria-label="Raum" ${aus}>
                    <label class="zweit-check" title="Ich bin in dieser Stunde als Zweitbesetzung eingeteilt"><input type="checkbox" data-f="zweit" ${e.zweit ? "checked" : ""} ${aus}> Zweit&shy;besetzung</label>
                </div>`;
            }).join("") : `<div class="leer">Noch keine Zeiten – unten im Zeitraster anlegen.</div>`}
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:14px">
                <span style="font-weight:800;color:var(--grau);font-size:13px">${TAGNAMEN[wt]} kopieren nach:</span>
                ${[1, 2, 3, 4, 5].filter(i => i !== wt).map(i => `<button class="btn klein" data-kopie="${i}">${TAGKURZ[i]}</button>`).join("")}
            </div>
            <p style="font-size:13px;color:var(--grau);font-weight:700;margin:12px 0 0"><i class="fa-solid fa-lightbulb"></i> Bei Sozialtraining und Lernangebot mit GS1–GS4 steht im Tagesplan automatisch die Stunde aus dem Jahresplan.</p>
        </div>
        <div class="karte"><h2><i class="fa-solid fa-table"></i> Überblick</h2><div class="uebersicht">${uebersichtHtml()}</div></div>
        <div class="karte"><h2><i class="fa-solid fa-clock"></i> Zeitraster</h2>
            ${s.zeiten.map((z, i) => `<div class="raster-zeile ${z.typ === "pause" ? "pause" : ""}" data-i="${i}">
                <span class="griff">${z.typ === "pause" ? '<i class="fa-solid fa-mug-hot"></i>' : i + 1}</span>
                <input type="text" data-r="name" value="${esc(z.name)}" placeholder="${z.typ === "pause" ? "Pause" : "Nr."}" maxlength="30" aria-label="Name">
                <input type="time" data-r="von" value="${esc(z.von)}" aria-label="von">
                <input type="time" data-r="bis" value="${esc(z.bis)}" aria-label="bis">
                <span style="display:flex;gap:2px"><button class="btn klein flach" data-hoch title="Nach oben" ${i ? "" : "disabled"}><i class="fa-solid fa-arrow-up"></i></button><button class="btn klein flach" data-weg title="Löschen"><i class="fa-solid fa-trash"></i></button></span>
            </div>`).join("")}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
                <button class="btn klein" data-plus="stunde"><i class="fa-solid fa-plus"></i> Stunde</button>
                <button class="btn klein" data-plus="pause"><i class="fa-solid fa-mug-hot"></i> Pause</button>
            </div>
        </div>`;

    inhalt.querySelectorAll("[data-sptag]").forEach(b => b.onclick = () => { ansicht.spTag = +b.dataset.sptag; neuZeichnen(); });
    inhalt.querySelectorAll(".sp-zeile").forEach(el => {
        const zid = el.dataset.z;
        el.querySelectorAll("[data-f]").forEach(f => {
            const aendern = () => {
                const e = spEintrag(wt, zid, true);
                if (f.type === "checkbox") { if (f.checked) e[f.dataset.f] = true; else delete e[f.dataset.f]; }
                else e[f.dataset.f] = f.value;
                if (f.dataset.f === "art" && !f.value) delete sp().tage[wt][zid];
                stundenplanSpeichern();
            };
            if (f.tagName === "SELECT" || f.type === "checkbox") f.onchange = () => { aendern(); neuZeichnen(); };
            else { f.oninput = aendern; f.onchange = rasterAnzeigen; }
        });
    });
    inhalt.querySelectorAll("[data-kopie]").forEach(b => b.onclick = () => {
        const ziel = +b.dataset.kopie;
        if (Object.keys(sp().tage[ziel] || {}).length && !confirm(TAGNAMEN[ziel] + " wird mit " + TAGNAMEN[wt] + " überschrieben. Weiter?")) return;
        sp().tage[ziel] = JSON.parse(JSON.stringify(sp().tage[wt] || {}));
        stundenplanSpeichern(); toast(TAGNAMEN[wt] + " nach " + TAGNAMEN[ziel] + " kopiert"); neuZeichnen();
    });
    inhalt.querySelectorAll(".raster-zeile").forEach(el => {
        const i = +el.dataset.i, z = s.zeiten[i];
        el.querySelectorAll("[data-r]").forEach(f => { f.oninput = () => { z[f.dataset.r] = f.value; stundenplanSpeichern(); }; f.onchange = () => rasterAnzeigen(); });
        el.querySelector("[data-hoch]").onclick = () => { if (!i) return; [s.zeiten[i - 1], s.zeiten[i]] = [s.zeiten[i], s.zeiten[i - 1]]; stundenplanSpeichern(); neuZeichnen(); };
        el.querySelector("[data-weg]").onclick = () => {
            const belegt = Object.values(s.tage).some(t => t && t[z.id] && t[z.id].art);
            if (belegt && !confirm("In dieser Zeile ist etwas eingetragen. Trotzdem löschen?")) return;
            s.zeiten.splice(i, 1); Object.values(s.tage).forEach(t => { if (t) delete t[z.id]; });
            stundenplanSpeichern(); neuZeichnen();
        };
    });
    inhalt.querySelectorAll("[data-plus]").forEach(b => b.onclick = () => {
        const pause = b.dataset.plus === "pause";
        const letzte = s.zeiten[s.zeiten.length - 1];
        const nr = s.zeiten.filter(z => z.typ !== "pause").length + 1;
        s.zeiten.push({ id: neueId("z"), typ: pause ? "pause" : "stunde", name: pause ? "Pause" : String(nr), von: letzte && letzte.bis ? letzte.bis : "", bis: "" });
        stundenplanSpeichern(); neuZeichnen();
    });
}
// Nach Änderungen am Zeitraster: Beschriftungen und Überblick neu, ohne den Fokus zu verlieren
function rasterAnzeigen(){
    sp().zeiten.forEach(z => { const el = inhalt.querySelector(`.sp-zeile[data-z="${esc(z.id)}"] .z`); if (el) el.innerHTML = (z.typ === "pause" ? esc(z.name || "Pause") : esc(z.name) + ". Stunde") + `<small>${esc(zeitText(z)) || "&nbsp;"}</small>`; });
    const ue = inhalt.querySelector(".uebersicht"); if (ue) ue.innerHTML = uebersichtHtml();
}
function uebersichtHtml(){
    const s = sp();
    if (!s.zeiten.length) return "";
    return `<table class="ue"><thead><tr><th></th>${[1, 2, 3, 4, 5].map(i => `<th>${TAGNAMEN[i]}</th>`).join("")}</tr></thead><tbody>
        ${s.zeiten.map(z => `<tr class="${z.typ === "pause" ? "pause" : ""}"><td class="z">${esc(z.typ === "pause" ? (z.name || "Pause") : z.name)}<small>${esc(zeitText(z))}</small></td>
            ${[1, 2, 3, 4, 5].map(wt => { const e = spEintrag(wt, z.id, false); if (!e.art) return "<td></td>"; const a = ARTEN[e.art] || ARTEN.sonstiges;
                const wer = [e.klasse ? klasseName(e.art, e.klasse) : "", e.titel || ""].filter(Boolean).join(" · ");
                return `<td><div class="zelle" style="--f:${a.farbe}"><b>${esc(a.name)}</b>${esc(wer)}${e.zweit ? '<br><span style="color:var(--grau)"><i class="fa-solid fa-user-group"></i> Zweitbesetzung</span>' : ""}${e.raum ? `<br><span style="color:var(--grau)">${esc(e.raum)}</span>` : ""}</div></td>`; }).join("")}</tr>`).join("")}
    </tbody></table>`;
}

/* ============================================================
   Druck
   ============================================================ */
function drucken(html, quer, titel){
    document.getElementById("druckSeite").textContent = `@page{ size:A4 ${quer ? "landscape" : "portrait"}; margin:12mm; }`;
    const ziel = document.getElementById("druck");
    ziel.innerHTML = html;
    const alt = document.title;
    document.title = titel;
    window.addEventListener("afterprint", () => { ziel.innerHTML = ""; document.title = alt; }, { once: true });
    setTimeout(() => window.print(), 60);
}
function druckeTag(d){
    const s = sp(), t = tagDaten(d, false), wt = wochentag(d);
    const zeilen = (wt <= 5 ? s.zeiten : []).map(z => {
        const info = slotInfo(d, z.id), a = ARTEN[info.art] || ARTEN.sonstiges;
        const ov = info.ov, todos = Array.isArray(ov.todos) ? ov.todos : [];
        if (z.typ === "pause" && !info.art && !ov.notiz) return `<div class="dr-slot pause"><div class="z">${esc(zeitText(z))}</div><div class="i">${esc(z.name || "Pause")}</div></div>`;
        if (!info.art && !info.einheit && !ov.notiz && !todos.length) return `<div class="dr-slot" style="--f:${a.farbe}"><div class="z">${esc(z.name)}.<small>${esc(zeitText(z))}</small></div><div class="i" style="color:var(--grau)">frei</div></div>`;
        return `<div class="dr-slot" style="--f:${a.farbe}"><div class="z">${z.typ === "pause" ? esc(z.name || "Pause") : esc(z.name) + "."}<small>${esc(zeitText(z))}</small></div><div class="i">
            <b>${esc(info.art ? a.name : "")}</b> ${esc(werText(info))}${info.raum ? " · " + esc(info.raum) : ""}${info.zweit ? " · Zweitbesetzung" : ""}${info.aus ? " · <b style='color:#c0392b'>fällt aus</b>" : ""}
            ${info.einheit && !info.aus ? `<div class="st">${esc(info.einheit.titel)}</div>${info.einheit.material ? `<div class="no">Material: ${esc(info.einheit.material.split("\n").filter(Boolean).join(" · "))}</div>` : ""}` : ""}
            ${ov.notiz ? `<div class="no">${esc(ov.notiz)}</div>` : ""}
            ${todos.length ? `<ul>${todos.map(x => `<li>${x.ok ? "☑" : "☐"} ${esc(x.t)}</li>`).join("")}</ul>` : ""}
        </div></div>`;
    }).join("");
    const extra = t.extra.filter(x => x.titel);
    drucken(`<div class="dr-titel">${esc(lang(d))}</div><div class="dr-unter">KW ${kw(d)} · Mein Tag</div>
        ${zeilen}
        ${extra.length ? `<div class="dr-block"><h3>Weitere Termine</h3>${extra.map(x => `<div>${esc(x.von || "")}${x.bis ? "–" + esc(x.bis) : ""} ${esc(x.titel)}</div>`).join("")}</div>` : ""}
        <div class="dr-block"><h3>To-dos</h3>${t.todos.map(x => `<div>${x.ok ? "☑" : "☐"} ${esc(x.t)}</div>`).join("")}<div class="dr-linien"><div></div><div></div></div></div>
        <div class="dr-block"><h3>Notizen</h3>${t.notiz ? `<div style="white-space:pre-line">${esc(t.notiz)}</div>` : ""}<div class="dr-linien"><div></div><div></div><div></div></div></div>`, false, "Tagesplan " + kurz(d));
}
function druckeWoche(mo){
    const s = sp(), tage = [0, 1, 2, 3, 4].map(i => plusTage(mo, i));
    drucken(`<div class="dr-titel">Wochenplan KW ${kw(mo)}</div><div class="dr-unter">${kurz(mo)} – ${kurz(plusTage(mo, 4))}</div>
        <table class="dr-woche"><thead><tr><th></th>${tage.map(d => `<th>${TAGNAMEN[wochentag(d)]} ${kurz(d)}</th>`).join("")}</tr></thead><tbody>
        ${s.zeiten.map(z => `<tr><td class="z">${esc(z.typ === "pause" ? (z.name || "Pause") : z.name)}<br><span style="font-weight:700;font-size:7.5pt">${esc(zeitText(z))}</span></td>${tage.map(d => {
            const info = slotInfo(d, z.id), a = ARTEN[info.art] || ARTEN.sonstiges;
            if (!info.art && !info.einheit && !info.ov.notiz) return "<td></td>";
            return `<td><div class="zelle" style="--f:${a.farbe}"><b>${esc(info.art ? a.name : "")}${info.aus ? " – fällt aus" : ""}</b>${esc(werText(info))}${info.zweit ? " (Zweitbesetzung)" : ""}${info.einheit && !info.aus ? `<div style="font-weight:800">${esc(info.einheit.titel)}</div>` : ""}${info.ov.notiz ? `<div style="color:#55636b">${esc(info.ov.notiz)}</div>` : ""}</div></td>`;
        }).join("")}</tr>`).join("")}
        <tr><td class="z">Termine</td>${tage.map(d => `<td>${tagDaten(d, false).extra.filter(x => x.titel).map(x => esc((x.von ? x.von + " " : "") + x.titel)).join("<br>")}</td>`).join("")}</tr>
        </tbody></table>`, true, "Wochenplan KW " + kw(mo));
}

/* ============================================================
   Fertige Stunden nachladen (jede Bereichs-Datei setzt dieselben
   Namen – deshalb nacheinander laden und je Bereich merken)
   ============================================================ */
function skriptLaden(src){ return new Promise(fertig => { const el = document.createElement("script"); el.src = src; el.onload = el.onerror = () => { el.remove(); fertig(); }; document.head.appendChild(el); }); }
async function vorlagenLaden(){
    for (const b of ["sozial", "lernangebot", "vertretung"]) {
        window.SOZIAL_VORLAGEN = undefined;
        for (const f of window.TP_VORLAGEN[b] || []) await skriptLaden(f);
        VORL[b] = (window.SOZIAL_VORLAGEN || []).filter(e => e && e.id).map(e => ({ id: e.id, titel: e.titel || "", kategorie: e.kategorie || "", material: e.material || "", ziel12: e.ziel12 || "", ziel34: e.ziel34 || "" }));
        if (aktiverDialog && document.body.contains(aktiverDialog)) aktiverDialog._neu();
    }
    window.SOZIAL_VORLAGEN = undefined;
    if (ansicht.name !== "stundenplan" && !document.activeElement.matches("input, textarea, select")) neuZeichnen();
}

route();
vorlagenLaden();
</script>
</body>
</html>
