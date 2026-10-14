<?php require __DIR__ . "/auth.php"; ?>
<?php
// Für "In Materialien speichern": vorhandene Ordner und Trainingshefte (nur lesen)
function lrsJsonLesen($datei){
    if (!is_file($datei)) return [];
    $daten = json_decode((string)file_get_contents($datei), true);
    return is_array($daten) ? $daten : [];
}
$lrsOrdner = array_values(array_unique(array_map(fn($m) => $m["ordner"] ?? "Allgemein", lrsJsonLesen(__DIR__ . "/material-daten/materialien.json"))));
sort($lrsOrdner);
$lrsKinder = array_map(fn($k) => $k["code"], lrsJsonLesen(__DIR__ . "/material-daten/kinder.json"));
// Förderkartei: Fehlerwörter je Kürzel (für Blätter mit den eigenen Wörtern eines Kindes)
$lrsKartei = [];
foreach (lrsJsonLesen(__DIR__ . "/material-daten/foerderkartei.json") as $code => $d) {
    if (!in_array((string)$code, $lrsKinder, true) || !is_array($d)) continue;
    $lrsKartei[(string)$code] = array_map(fn($w) => [
        "w" => (string)($w["wort"] ?? ""), "sp" => $w["sp"] ?? ["sonstige"], "f" => (int)($w["fach"] ?? 1), "x" => $w["falschschreibungen"] ?? [],
    ], $d["woerter"] ?? []);
}
?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LRS-Förderung · Leuchtturm</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Andika:wght@400;700&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

<style>

:root{
    --nacht:#16324a;
    --meer:#3d7ea6;
    --gold:#f2a93b;
    --schaum:#f4f6f4;
    --karte:#ffffff;
    --text:#1f2d36;
    --schatten:0 6px 24px rgba(22,50,74,.1);
}

*{ box-sizing:border-box; }
body{ margin:0; background:var(--schaum); color:var(--text); font-family:"Nunito",sans-serif; line-height:1.5; }

.wrap{ width:min(1150px,95%); margin:30px auto 70px; }

.zurueck{ display:inline-block; margin-bottom:18px; color:#7c8a94; font-weight:800; font-size:13px; text-decoration:none; }

header.kopf{
    background:linear-gradient(135deg, var(--nacht), var(--meer));
    border-radius:24px; color:white; padding:26px 32px;
    box-shadow:var(--schatten); margin-bottom:18px;
}
header.kopf h1{ font-size:30px; font-weight:900; margin:0 0 4px; }
header.kopf p{ font-size:14px; opacity:.9; font-weight:700; margin:0; }

.hinweis{
    background:#fff8e6; border:2px solid var(--gold); border-radius:16px;
    padding:10px 18px; font-size:13px; font-weight:700; color:#7a5d00;
    margin-bottom:20px; display:flex; gap:10px; align-items:center;
}

.global-karte{
    background:var(--karte); border-radius:24px; box-shadow:var(--schatten);
    padding:22px 24px; margin-bottom:20px;
}
.global-karte h2{ font-size:15px; font-weight:900; margin:0 0 14px; color:var(--nacht); text-transform:uppercase; letter-spacing:.4px; }
.global-zeile{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
@media (max-width:900px){ .global-zeile{ grid-template-columns:1fr 1fr; } }
@media (max-width:500px){ .global-zeile{ grid-template-columns:1fr; } }

.global-zeile2{ display:grid; grid-template-columns:1fr; gap:14px; margin-top:14px; }

label{ display:block; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:.4px; color:#7c8a94; margin:0 0 4px; }
input[type="text"], input[type="number"], select, textarea{
    width:100%; border:2px solid #ececec; border-radius:12px; padding:9px 14px;
    font-family:"Nunito",sans-serif; font-size:14px; font-weight:700; color:var(--text);
}
textarea{ min-height:64px; resize:vertical; font-weight:400; }

.tabs{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom:20px; }
.tab{
    border:none; border-radius:999px; padding:10px 18px;
    font-family:"Nunito",sans-serif; font-weight:800; font-size:13px;
    cursor:pointer; background:white; color:var(--text); box-shadow:var(--schatten);
}
.tab.aktiv{ background:var(--nacht); color:white; }

.bereich{ display:none; }
.bereich.aktiv{ display:block; }

.karte{ background:var(--karte); border-radius:24px; box-shadow:var(--schatten); padding:24px; margin-bottom:20px; }
.karte h2.titel{ font-size:20px; font-weight:900; margin:0 0 4px; }
.karte .beschreibung{ font-size:13px; color:#7c8a94; margin:0 0 16px; }

.zeile{ display:grid; gap:12px; }
.zeile.zwei{ grid-template-columns:1fr 1fr; }
.zeile.drei{ grid-template-columns:1fr 1fr 1fr; }
@media (max-width:700px){ .zeile.zwei, .zeile.drei{ grid-template-columns:1fr; } }

.btn{
    border:none; border-radius:999px; padding:11px 24px; margin-top:16px;
    font-family:"Nunito",sans-serif; font-weight:800; font-size:14px;
    cursor:pointer; color:white; background:var(--nacht); transition:.15s;
}
.btn:hover{ background:var(--gold); color:var(--nacht); transform:translateY(-2px); }
.btn.sekundaer{ background:var(--meer); }
.btn.klein{ padding:6px 14px; font-size:12px; margin-top:0; }

/* ===== Arbeitsblätter im Leuchtturm-Design (wie die Worterarbeitungs-Serie) ===== */
.blatt{
    width:210mm; height:297mm; margin:6px auto 0; box-sizing:border-box; flex:none;
    padding:13mm 15mm; background:#fff; box-shadow:0 6px 24px rgba(22,50,74,.12); overflow:hidden;
    font-family:"Andika", sans-serif; color:#1E2A36; line-height:1.4;
    -webkit-print-color-adjust:exact; print-color-adjust:exact;
    page:lt-blatt;
}
.blatt *{ box-sizing:border-box; }
/* Aufbau: Kopf (Pille, Name, Titel) – Inhaltsrahmen (wird auf die Seite eingepasst) – Fußzeile */
.blatt-innen{ height:100%; display:flex; flex-direction:column; gap:18px; }
.blatt-rahmen{ flex:1; min-height:0; position:relative; overflow:hidden; }
.blatt-rahmen > .blatt-koerper{ position:absolute; top:0; left:0; width:100%; }
.blatt-kopf{ padding:0; display:flex; flex-direction:column; gap:18px; }
.blatt-oben{ display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap; }
.blatt-kopf .autor-zeile{
    display:inline-block; background:#E3EEF8; color:#1D4F86; padding:6px 14px; border-radius:999px;
    font-size:15px; font-weight:700; margin:0;
}
.blatt-kopf h3{ margin:0; font-size:36px; line-height:1.15; font-weight:700; color:#1E2A36; }

.blatt-koerper{ padding:0; min-height:0; display:flex; flex-direction:column; gap:18px; font-size:18px; }
.blatt-warnung{ align-self:center; font-size:12px; font-weight:800; color:#b3382f; }

.blatt-namenszeile{ display:flex; gap:18px; margin:0 0 0 auto; font-size:16px; font-weight:400; color:#1E2A36; }
.blatt-namenszeile span{ display:inline-flex; align-items:flex-end; border-bottom:2px solid #1E2A36; padding:0 0 2px; min-width:120px; }
.blatt-namenszeile span:first-child{ min-width:180px; }

.anweisung{
    background:#FFF4D6; border-radius:16px; padding:14px 20px; margin:0;
    font-size:20px; font-weight:400; line-height:1.45; color:#1E2A36;
}
.anweisung:empty{ display:none; }

/* Aufgaben-Überschriften mit Nummernkreis (werden automatisch erkannt: "1. …") */
.blatt-aufgabe{ display:flex !important; gap:14px; align-items:center; font-size:20px !important; font-weight:400 !important; line-height:1.4; margin:6px 0 10px !important; color:#1E2A36 !important; }
.blatt-nummer{ width:34px; height:34px; flex:none; border-radius:50%; background:#1D5FA8; color:#fff; font-size:18px; font-weight:700; display:flex; align-items:center; justify-content:center; }
.blatt-koerper h4{ font-size:20px; font-weight:700; color:#1D4F86; margin:10px 0 6px; text-transform:none; letter-spacing:0; }

.blatt-fusszeile{
    margin:0; padding-top:4px; border-top:0;
    display:flex; justify-content:space-between; gap:16px;
    font-size:14px; font-weight:400; color:#4A5866;
}

.ausgabe-aktionen{ display:flex; gap:8px; margin-bottom:14px; justify-content:flex-end; }

/* Inhalte */
.gitter{ display:flex; flex-direction:column; gap:16px; font-size:26px; font-weight:700; letter-spacing:3px; }
.gitter .zeile-inhalt{ display:flex; gap:22px; flex-wrap:wrap; }

.wortliste{ display:flex; flex-wrap:wrap; gap:14px 18px; font-size:24px; font-weight:700; }
.wortliste > *{ background:#F4F7FA; border:2px solid #C9D6E3; border-radius:12px; padding:4px 14px; }

.merk-block{ margin-bottom:20px; border:2px solid #C9D6E3; border-radius:16px; padding:14px 18px; }
.merk-block h4{ font-size:15px; text-transform:none; color:#4A5866; margin:0 0 12px; letter-spacing:0; font-weight:700; }
.merk-linien{ display:flex; flex-direction:column; gap:30px; margin-top:12px; }
.merk-linien div{ border-bottom:2px solid #1E2A36; height:1px; }

table.paare{ width:100%; border-collapse:separate; border-spacing:0 8px; margin-top:0; }
table.paare td, table.paare th{ padding:10px 12px; border-bottom:0; text-align:left; font-size:20px; }
table.paare td{ background:#F7F9FB; border-top:2px solid #E1E8EF; border-bottom:2px solid #E1E8EF; }
table.paare td:first-child{ border-left:2px solid #E1E8EF; border-radius:14px 0 0 14px; color:#1D5FA8; font-weight:700; }
table.paare td:last-child{ border-right:2px solid #E1E8EF; border-radius:0 14px 14px 0; }
table.paare th{ font-size:14px; text-transform:none; color:#4A5866; font-weight:700; padding-bottom:0; }
.wort-btn{ background:#E3EEF8; border:2px solid #1D5FA8; color:#1D4F86; border-radius:12px; padding:4px 14px; font-weight:700; display:inline-block; margin-right:8px; font-size:22px; }
.loesung{ color:#1D5FA8; font-weight:700; }

.zahlenreihe{ display:flex; gap:14px; flex-wrap:wrap; font-size:28px; font-weight:700; align-items:flex-end; }
.zahlenreihe .luecke{ border:3px solid #1D5FA8; background:#FFF4D6; border-radius:10px; width:60px; height:48px; display:inline-block; text-align:center; }

.sortierliste{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px; }
.sortierliste li{ display:flex; align-items:center; gap:16px; font-size:22px; font-weight:400; border:2px solid #C9D6E3; border-radius:14px; padding:8px 14px; }
.nr-box{ width:40px; height:40px; border:3px solid #1D5FA8; background:#FFF4D6; border-radius:10px; flex:none; }

.schulte{ display:grid; gap:10px; margin:10px auto; width:fit-content; }
.schulte-zelle{
    width:62px; height:62px; border:2px solid #C9D6E3; background:#F4F7FA; border-radius:12px;
    display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:700; color:#1E2A36;
}

.reihenfolge-liste{ display:flex; gap:20px; flex-wrap:wrap; margin-top:10px; }
.reihenfolge-item{ text-align:center; border:2px solid #C9D6E3; border-radius:14px; padding:10px 14px; }
.reihenfolge-item .wort{ font-size:22px; font-weight:700; margin-bottom:8px; }

.luecken-text{ font-size:22px; font-weight:400; line-height:2.4; }
.luecken-text p{ margin:0 0 6px; }
.luecken-text .luecke-wort{ border-bottom:3px solid #1D5FA8; background:#FFF4D6; border-radius:6px 6px 0 0; padding:0 26px; display:inline-block; line-height:1.6; }

/* Generator-Inhalte mit eigenen grauen Linien/Texten an das Design angleichen */
.blatt-koerper [style*="dotted #ccc"], .blatt-koerper [style*="dotted #999"]{ border-bottom-color:#1E2A36 !important; border-bottom-style:solid !important; }
.blatt-koerper [style*="solid #ccc"]{ border-bottom-color:#8FA3B8 !important; }
.blatt-koerper [style*="dashed #ddd"]{ border-bottom-color:#C9D6E3 !important; }
.blatt-koerper [style*="color:#555"]{ color:#4A5866 !important; }

/* Bearbeitbare Blätter */
.blatt [contenteditable="true"]{ outline:none; }
.blatt [contenteditable="true"]:focus{ outline:2px dashed var(--gold); outline-offset:6px; border-radius:6px; }
.blatt-tipp{ margin-right:auto; align-self:center; font-size:12px; color:#7c8a94; font-weight:700; }

/* Dialog "In Materialien speichern" */
.mat-dialog-hg{ position:fixed; inset:0; background:rgba(22,50,74,.45); display:flex; align-items:center; justify-content:center; z-index:1000; padding:16px; }
.mat-dialog{ background:white; border-radius:24px; box-shadow:0 20px 60px rgba(0,0,0,.3); padding:24px; width:min(640px,100%); max-height:90vh; overflow:auto; }
.mat-dialog h2{ font-size:18px; font-weight:900; margin:0 0 4px; color:var(--nacht); }
.mat-dialog .mat-bereich{ font-size:13px; font-weight:800; color:var(--meer); margin:0 0 14px; }
.mat-dialog label{ margin:12px 0 4px; }

/* Förderplan, Stunde, Extras (Bedienung) */
/* Förderplan: Schritte mit Auswahl-Kacheln */
.fp-karte{ padding:28px; }
.fp-kopf{ display:flex; justify-content:space-between; gap:16px; align-items:flex-start; flex-wrap:wrap; }
.fp-kopf .beschreibung{ max-width:720px; }
.fp-kopf a.btn{ text-decoration:none; margin-top:0; }
.fp-schritt{ display:flex; gap:16px; padding:20px 0; border-top:2px solid #eef2f5; }
.fp-nr{ width:36px; height:36px; flex:none; border-radius:50%; background:var(--nacht); color:#fff; font-weight:900; display:flex; align-items:center; justify-content:center; font-size:16px; }
.fp-teil{ flex:1; min-width:0; }
.fp-titelzeile{ display:flex; align-items:center; gap:10px; margin:4px 0 12px; }
.fp-titelzeile h3{ margin:0; font-size:17px; font-weight:900; color:var(--nacht); }
.fp-zaehler{ font-size:12px; font-weight:800; color:#fff; background:var(--meer); border-radius:999px; padding:2px 10px; }
.fp-zaehler:empty{ display:none; }
.fp-gruppen{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:12px; }
.fp-gruppe{ background:#f7f9fb; border-radius:16px; padding:10px; display:flex; flex-direction:column; gap:8px; }
.fp-gruppe-titel{ font-size:11px; font-weight:900; text-transform:uppercase; letter-spacing:.5px; color:#7c8a94; padding:2px 4px; display:flex; gap:6px; align-items:center; }
.fp-raster{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:8px; }
.fp-chip{ position:relative; display:flex; align-items:center; gap:10px; background:#fff; border:2px solid #e3e9ee; border-radius:14px; padding:9px 12px; cursor:pointer; margin:0; text-transform:none; letter-spacing:0; color:var(--text); font-size:13.5px; font-weight:800; line-height:1.25; transition:.12s; min-height:46px; }
.fp-chip:hover{ border-color:#bcd2e2; }
.fp-chip input{ position:absolute; opacity:0; pointer-events:none; }
.fp-chip::before{ content:""; width:20px; height:20px; flex:none; border-radius:6px; border:2px solid #c3ced6; background:#fff; }
.fp-chip.an{ border-color:var(--meer); background:#eef6fb; }
.fp-chip.an::before{ background:var(--meer) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10.5l3.2 3.2L15 7' fill='none' stroke='white' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/16px no-repeat; border-color:var(--meer); }
.fp-chip-text{ flex:1; min-width:0; }
.fp-chip-text small{ display:block; font-size:11.5px; font-weight:700; color:#7c8a94; margin-top:1px; }
.fp-badge{ display:block; width:max-content; margin-top:4px; font-size:10.5px; font-weight:900; border-radius:999px; padding:1px 8px; white-space:nowrap; }
.fp-badge:empty{ display:none; }
.fp-badge.e{ background:#fde3df; color:#a8322a; }
.fp-badge.r{ background:#fff0cc; color:#8a6100; }
.fp-badge.d{ background:#e1effa; color:#1d5f8a; }
.fp-chip.klein{ min-height:0; padding:7px 12px; }
.fp-optionen{ display:grid; grid-template-columns:auto minmax(200px, 280px) 1fr; gap:18px 26px; align-items:start; }
.fp-label{ font-size:11px; font-weight:900; text-transform:uppercase; letter-spacing:.5px; color:#7c8a94; margin-bottom:6px; }
.fp-segment{ display:inline-flex; background:#eef2f5; border-radius:12px; padding:4px; gap:4px; }
.fp-segment button{ border:none; background:transparent; border-radius:9px; width:46px; height:36px; font-family:"Nunito",sans-serif; font-weight:900; font-size:15px; color:#4a5866; cursor:pointer; }
.fp-segment button.an{ background:#fff; color:var(--nacht); box-shadow:0 2px 6px rgba(22,50,74,.15); }
.fp-extras{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
.fp-extras .fp-label{ width:100%; }
.fp-leiste{ position:sticky; bottom:12px; z-index:5; display:flex; justify-content:space-between; align-items:center; gap:14px; flex-wrap:wrap; background:var(--nacht); color:#fff; border-radius:18px; padding:12px 14px 12px 22px; box-shadow:0 10px 30px rgba(22,50,74,.25); margin-top:6px; }
.fp-leiste .btn{ margin:0; background:var(--gold); color:var(--nacht); }
.fp-leiste .btn:hover{ background:#fff; }
#fp-summe{ font-size:14px; font-weight:800; }
#fp-summe b{ font-size:20px; color:var(--gold); }
#fp-summe span{ opacity:.8; font-weight:700; }
/* Übernahme aus dem Gutachten */
.fp-import{ background:linear-gradient(135deg, #eef6fb, #f7fbfe); border:2px solid #cfe3f0; border-radius:20px; padding:16px 18px; margin:6px 0 14px; }
.fp-import-kopf{ display:flex; gap:10px; align-items:center; font-weight:900; color:var(--nacht); font-size:14px; }
.fp-import-kopf small{ font-weight:700; color:#7c8a94; font-size:12px; }
.fp-kacheln{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:10px; margin:12px 0; }
.fp-kachel{ background:#fff; border-radius:14px; padding:10px 14px; }
.fp-kachel b{ display:block; font-size:24px; color:var(--nacht); line-height:1.1; }
.fp-kachel span{ font-size:12px; font-weight:800; color:#7c8a94; }
.fp-balken{ display:flex; flex-direction:column; gap:6px; }
.fp-balken-zeile{ display:grid; grid-template-columns:minmax(150px, 240px) 1fr; gap:12px; align-items:center; font-size:13px; }
.fp-balken-zeile .name{ font-weight:800; }
.fp-balken-zeile .spur{ display:flex; align-items:center; gap:10px; min-width:0; }
.fp-balken-zeile .bar{ height:10px; border-radius:6px; background:var(--meer); flex:none; }
.fp-balken-zeile .bsp{ color:#7c8a94; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.fp-uebertragen{ margin-top:12px; padding-top:12px; border-top:1px dashed #bcd8ea; display:flex; gap:8px; align-items:center; flex-wrap:wrap; font-weight:800; font-size:13px; }
.fp-select{ padding:8px 12px; }
@media (max-width:900px){ .fp-gruppen{ grid-template-columns:1fr 1fr; } .fp-raster{ grid-template-columns:1fr 1fr; } .fp-optionen{ grid-template-columns:1fr; } }
@media (max-width:560px){ .fp-gruppen, .fp-raster, .fp-kacheln{ grid-template-columns:1fr; } .fp-schritt{ gap:10px; } .fp-nr{ width:30px; height:30px; } .fp-balken-zeile{ grid-template-columns:1fr; gap:2px; } }

.dk-pw{ text-decoration-color:#B23A2E; text-decoration-thickness:2px; text-underline-offset:3px; }
.std-tabelle.dk-auswertung th{ font-size:12.5px; padding:5px 8px; }
.std-tabelle.dk-auswertung td{ vertical-align:middle; font-size:13.5px; padding:4px 8px; line-height:1.3; }
.std-tabelle .dk-ebene td{ background:#F3F6FA; font-weight:700; font-size:13px; color:#2C3E55; padding:4px 8px !important; }
.dk-ab{ text-align:center; color:#7c8a94; } .dk-ab.f{ color:#1E2A36; font-weight:700; }
.dk-woerter{ line-height:1.75; }
.dk-woerter span{ display:inline-flex; align-items:center; gap:4px; margin-right:11px; white-space:nowrap; }
.dk-woerter i{ display:inline-block; width:12px; height:12px; border:1.5px solid #2C4A6E; border-radius:3px; }
.dk-wertung{ display:flex; justify-content:center; gap:7px; white-space:nowrap; }
.dk-wertung i, .dk-ue i{ display:inline-block; width:13px; height:13px; border:1.5px solid #2C4A6E; border-radius:50%; box-sizing:border-box; vertical-align:-2px; }
.dk-wertung i.v, .dk-ue i.v{ background:#2C4A6E; }
.dk-wertung i.h, .dk-ue i.h{ background:linear-gradient(90deg, #2C4A6E 50%, transparent 50%); }
.dk-ue i{ margin:0 2px 0 6px; }
.dk-quote{ text-align:center; white-space:nowrap; }
.dk-ue b{ font-size:15px; margin-right:8px; } .dk-ue span{ font-size:12px; color:#7c8a94; }
.dk-felder{ display:grid; grid-template-columns:repeat(3, auto); justify-content:space-between; gap:6px 14px; font-size:14px; background:#F3F6FA; border-radius:12px; padding:9px 14px; white-space:nowrap; }
.dk-felder span.l{ display:inline-block; min-width:44px; border-bottom:1.5px solid #1E2A36; } .dk-felder span.l.k{ min-width:34px; }
.dk-hinweis-norm{ font-size:12.5px; color:#4A5866; background:#FFF8E6; border-radius:10px; padding:8px 12px; }
.dk-pruefliste{ display:grid; grid-template-columns:1fr 1fr; gap:4px 18px; font-size:13.5px; line-height:1.35; }
.dk-pruefliste b{ color:#2C3E55; }
.bs-mixwahl{ display:grid; grid-template-columns:repeat(auto-fill, minmax(76px, 1fr)); gap:4px 10px; }
.bs-mixwahl label{ display:flex; gap:6px; align-items:center; text-transform:none; letter-spacing:0; font-size:14px; font-weight:800; color:var(--text); margin:0; }
.fp-wahl{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:4px 14px; }
.fp-wahl label{ display:flex; gap:6px; align-items:center; text-transform:none; letter-spacing:0; font-size:13px; font-weight:700; color:var(--text); margin:0; }
.fp-wahl label small{ color:var(--meer); font-weight:800; }
.fp-import{ background:#eef6fb; border:2px solid #bcd8ea; border-radius:16px; padding:12px 16px; font-size:13px; margin-bottom:14px; }
.fp-tabelle{ width:100%; border-collapse:collapse; margin-top:8px; font-size:13px; }
.fp-tabelle th, .fp-tabelle td{ text-align:left; padding:4px 8px; border-bottom:1px solid #d6e6f0; }
.fp-uebertragen{ margin-top:10px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; font-weight:700; }
.fp-uebertragen select{ width:auto; padding:5px 10px; font-size:13px; }
.tab.tab-neu{ border:2px solid var(--gold); }
@media (max-width:700px){ .fp-wahl{ grid-template-columns:1fr; } }

/* Werkzeugleiste der Worterarbeitungs-Serie (nur Bildschirm) */
.ws-werkzeug{
    display:flex; gap:12px 20px; flex-wrap:wrap; align-items:center; justify-content:space-between;
    background:white; border-radius:16px; box-shadow:var(--schatten); padding:12px 18px; margin-bottom:16px;
}
.ws-blattwahl{ display:flex; gap:8px 16px; flex-wrap:wrap; align-items:center; }
.ws-blattwahl label{ display:flex; align-items:center; gap:6px; margin:0; text-transform:none; letter-spacing:0; color:var(--text); font-size:13px; font-weight:800; cursor:pointer; }
.ws-blattwahl label small{ font-weight:700; color:#7c8a94; }
.ws-werkzeug .ws-knoepfe{ display:flex; gap:8px; flex-wrap:wrap; }
.ws-tipp{ width:100%; font-size:12px; color:#7c8a94; font-weight:700; }
.ws-speichern{ width:100%; border-top:2px solid #eef2f5; padding-top:12px; }
.ws-speichern label{ margin:0 0 4px; }
.ws-sp-ok{ color:#2f8a3d; }
.ws-sp-fehler{ color:#b3382f; }
.ws-sp-ok a, .ws-sp-fehler a{ color:var(--meer); }
.ws-blaetter{ display:flex; flex-direction:column; align-items:center; gap:28px; overflow-x:auto; padding:4px 0 10px; }

@media print{
    .zurueck, header.kopf, .hinweis, .global-karte, .tabs, .karte, .ausgabe-aktionen, .ws-werkzeug, .mat-dialog-hg{ display:none !important; }
    .blatt button{ display:none !important; } /* Vorlese-Knöpfe sind nur für den Bildschirm */
    .blatt [contenteditable="true"]:focus{ outline:none; }
    body{ background:white; margin:0; }
    .wrap{ width:auto; margin:0; }
    .blatt{ box-shadow:none; border-radius:0; margin:0; break-inside:avoid; }
    .ws-blaetter{ display:block; overflow:visible; padding:0; }
    .ws-seite{ box-shadow:none !important; break-after:page; }
}
/* Arbeitsblätter randlos auf genau eine A4-Seite (der Seitenrand steckt im Blatt selbst) */
@page lt-blatt{ size:A4; margin:0; }

</style>

<!-- Gestaltung der Worterarbeitungs-Serie (wird auch für den Druck wiederverwendet) -->
<style id="ws-stil">
.ws-seite{
    width:210mm; height:297mm; flex:none; box-sizing:border-box; padding:13mm 15mm;
    background:#fff; box-shadow:0 6px 24px rgba(22,50,74,.12); overflow:hidden;
    font-family:"Andika",sans-serif; color:#1E2A36; line-height:1.3;
    -webkit-print-color-adjust:exact; print-color-adjust:exact;
}
.ws-seite *{ box-sizing:border-box; }
.ws-seite.ws-aus{ display:none; }
.ws-innen{ height:100%; display:flex; flex-direction:column; gap:18px; outline:none; }
.ws-innen:focus-within{ outline:none; }
.ws-kopf{ display:flex; justify-content:space-between; align-items:center; font-size:16px; }
.ws-pille{ background:#E3EEF8; color:#1D4F86; padding:6px 14px; border-radius:999px; font-weight:700; }
.ws-name{ display:flex; gap:8px; align-items:flex-end; }
.ws-name .ws-linie{ display:inline-block; width:220px; border-bottom:2px solid #1E2A36; height:20px; }
.ws-seite h1{ margin:0; font-size:38px; line-height:1.15; font-weight:700; }
.ws-auftrag{ background:#FFF4D6; border-radius:16px; padding:14px 20px; font-size:20px; line-height:1.45; }
.ws-aufgabe{ display:flex; gap:14px; align-items:center; font-size:21px; line-height:1.4; }
.ws-nummer{ width:36px; height:36px; flex:none; border-radius:50%; background:#1D5FA8; color:#fff; font-size:20px; font-weight:700; display:flex; align-items:center; justify-content:center; }
.ws-fuss{ margin-top:auto; display:flex; justify-content:space-between; gap:16px; font-size:14px; color:#4A5866; }

/* Silbenbögen: abwechselnd blau / rot */
.ws-s1, .ws-s2{ display:inline-block; position:relative; padding:0 3px 14px; }
.ws-s1{ color:#1D5FA8; }
.ws-s2{ color:#B23A2E; }
.ws-bogen{ position:absolute; left:1px; bottom:0; width:calc(100% - 2px); height:14px; display:block; pointer-events:none; user-select:none; }

/* Blatt 1 */
.ws-tabkopf{ display:grid; grid-template-columns:250px 190px minmax(0,1fr); gap:16px; font-size:15px; font-weight:700; color:#4A5866; padding:0 16px; }
.ws-zeilen{ flex:1; display:flex; flex-direction:column; gap:12px; min-height:0; }
.ws-wortzeile{ flex:1; min-height:96px; max-height:150px; display:grid; grid-template-columns:250px 190px minmax(0,1fr); gap:16px; align-items:center; padding:10px 16px; border:2px solid #C9D6E3; border-radius:16px; }
.ws-wort{ font-weight:700; letter-spacing:2px; white-space:nowrap; }
.ws-kreise{ display:flex; gap:12px; flex-wrap:wrap; }
.ws-kreis{ width:42px; height:42px; border:3px solid #1E2A36; border-radius:50%; }
.ws-malbox{ align-self:stretch; min-height:70px; border:2px dashed #8FA3B8; border-radius:12px; }

/* Blatt 2 */
.ws-verbinden{ display:grid; grid-template-columns:max-content minmax(60px,1fr) max-content; padding:0 40px; }
.ws-spalte{ display:flex; flex-direction:column; gap:14px; }
.ws-silbe-l, .ws-silbe-r{ min-width:180px; height:54px; border:3px solid; border-radius:14px; display:flex; align-items:center; font-size:34px; font-weight:700; white-space:nowrap; }
.ws-silbe-l{ border-color:#1D5FA8; background:#E3EEF8; color:#1D5FA8; justify-content:space-between; gap:16px; padding:0 14px 0 24px; }
.ws-silbe-r{ border-color:#B23A2E; background:#FBE7E4; color:#B23A2E; gap:24px; padding:0 14px; }
.ws-punkt{ width:14px; height:14px; border-radius:50%; background:#1E2A36; flex:none; }
.ws-ordnen{ display:grid; grid-template-columns:minmax(280px,max-content) minmax(160px,1fr); gap:12px 24px; align-items:end; padding:0 16px; }
.ws-ordnen-zeile{ display:contents; }
.ws-chips{ display:flex; gap:8px; flex-wrap:nowrap; }
.ws-chip{ border:2px solid #8FA3B8; border-radius:10px; padding:2px 12px; font-size:30px; background:#F4F7FA; }
.ws-schreiblinie{ border-bottom:2px solid #1E2A36; height:48px; }

/* Blatt 3 */
.ws-suchliste{ display:flex; flex-direction:column; gap:10px; }
.ws-suchreihe{ border:2px solid #C9D6E3; border-radius:16px; padding:8px 18px; display:flex; flex-direction:column; gap:6px; }
.ws-suche{ display:flex; align-items:center; gap:12px; font-size:16px; color:#4A5866; }
.ws-ziel{ background:#FFF4D6; border-radius:10px; padding:0 16px; font-size:26px; font-weight:700; color:#1E2A36; }
.ws-kandidaten{ display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); gap:8px; font-size:28px; text-align:center; white-space:nowrap; }
.ws-schlange{ background:#EAF5EC; border:2px solid #9CC7A4; border-radius:40px; padding:14px 24px; font-size:30px; letter-spacing:1px; text-align:center; word-break:break-all; }

/* Blatt 4 */
.ws-luecken{ display:flex; flex-wrap:wrap; gap:16px 36px; padding:0 16px; }
.ws-buchstaben{ display:flex; gap:6px; font-size:30px; font-weight:700; }
.ws-feld{ width:44px; height:48px; border:2px solid #8FA3B8; border-radius:8px; display:flex; align-items:center; justify-content:center; }
.ws-feld.ws-leer{ border:3px solid #1D5FA8; background:#FFF4D6; }
.ws-spalten2{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px; }
.ws-spaltenkopf{ font-size:15px; font-weight:700; color:#4A5866; padding:0 4px; }
.ws-lineatur-liste{ display:flex; flex-direction:column; gap:10px; }
.ws-lineatur{ position:relative; height:66px; display:flex; flex-direction:column; }
.ws-lineatur .ws-l-o{ height:22px; border-top:1px solid #8FA3B8; }
.ws-lineatur .ws-l-m{ height:22px; border-top:1px dashed #8FA3B8; }
.ws-lineatur .ws-l-g{ height:20px; border-top:2px solid #1E2A36; border-bottom:1px solid #8FA3B8; }
.ws-spur{ position:absolute; left:14px; top:2px; font-size:46px; line-height:46px; color:#A7B4C2; letter-spacing:4px; white-space:nowrap; }
.ws-bilanz{ border:2px solid #9CC7A4; background:#EAF5EC; border-radius:16px; padding:12px 20px; display:flex; align-items:center; gap:18px; flex-wrap:wrap; font-size:19px; }
.ws-bilanz .ws-kreis{ width:30px; height:30px; }

/* Inhaltsrahmen: der Aufgabenteil wird so skaliert, dass er die Seite füllt */
.ws-rahmen{ flex:1; min-height:0; position:relative; overflow:hidden; }
.ws-inhalt{ position:absolute; top:0; left:0; width:100%; display:flex; flex-direction:column; gap:18px; }
.ws-fuss{ margin-top:0; }

/* Blatt 5: Buchstaben-Salat */
.ws-salat{ display:grid; grid-template-columns:max-content minmax(160px,1fr); gap:14px 24px; align-items:end; padding:0 16px; }
.ws-salat-zeile{ display:contents; }
.ws-salat .ws-feld{ background:#F4F7FA; }
.ws-auswahl-liste{ display:flex; flex-direction:column; gap:10px; padding:0 16px; }
.ws-auswahl3{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; font-size:28px; text-align:center; }
.ws-auswahl3 > div{ border:2px solid #C9D6E3; border-radius:12px; padding:4px 6px; white-space:nowrap; }

/* Blatt 6: Suchsel */
.ws-suchsel-wrap{ display:flex; gap:24px; align-items:flex-start; justify-content:center; }
.ws-gitter{ display:grid; flex:1 1 auto; width:calc(100% - 210px); max-width:500px; aspect-ratio:1 / 1; border:3px solid #1D5FA8; border-radius:12px; overflow:hidden; background:#fff; }
.ws-gitter > div{ display:flex; align-items:center; justify-content:center; font-weight:700; border-right:1px solid #DCE4EC; border-bottom:1px solid #DCE4EC; min-width:0; min-height:0; }
.ws-suchwoerter{ flex:0 0 186px; }
.ws-suchwoerter{ display:flex; flex-direction:column; gap:14px; font-size:24px; padding-top:6px; }
.ws-haken{ display:flex; gap:12px; align-items:center; }
.ws-kaestchen{ width:26px; height:26px; flex:none; border:3px solid #1D5FA8; border-radius:6px; }

/* Blatt 7: Wort-Gedächtnis */
.ws-merkbox{ border:3px solid #1D5FA8; background:#E3EEF8; border-radius:18px; padding:18px; display:flex; flex-wrap:wrap; gap:16px 26px; justify-content:center; }
.ws-knick{ display:flex; align-items:center; gap:12px; color:#4A5866; font-size:15px; }
.ws-knick::before, .ws-knick::after{ content:""; flex:1; border-top:3px dashed #8FA3B8; }
.ws-kreiswahl{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; font-size:26px; text-align:center; }
.ws-kreiswahl > div{ border:2px solid #C9D6E3; border-radius:12px; padding:6px 4px; white-space:nowrap; }
.ws-zeilen2{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px 28px; padding:0 8px; }

/* Blatt 8: Laute hören */
.ws-laut-tabelle{ width:100%; border-collapse:separate; border-spacing:0 10px; }
.ws-laut-tabelle th{ font-size:15px; font-weight:700; color:#4A5866; text-align:center; padding:0 6px; }
.ws-laut-tabelle th:first-child{ text-align:left; padding-left:16px; }
.ws-laut-tabelle td{ text-align:center; padding:8px 6px; border-top:2px solid #C9D6E3; border-bottom:2px solid #C9D6E3; }
.ws-laut-tabelle td:first-child{ text-align:left; padding-left:16px; border-left:2px solid #C9D6E3; border-radius:14px 0 0 14px; }
.ws-laut-tabelle td:last-child{ border-right:2px solid #C9D6E3; border-radius:0 14px 14px 0; }
.ws-kasten{ width:54px; height:50px; border:3px solid #1D5FA8; background:#FFF4D6; border-radius:10px; display:inline-block; vertical-align:middle; }
.ws-vokalbank{ display:flex; gap:10px; justify-content:center; }
.ws-vokalbank > div{ width:46px; height:46px; border-radius:50%; background:#FBE7E4; color:#B23A2E; font-size:28px; font-weight:700; display:flex; align-items:center; justify-content:center; }

/* Blatt 9: Silbenteppich */
.ws-teppich{ display:grid; grid-template-columns:40px repeat(6,minmax(0,1fr)); border:3px solid #C9D6E3; border-radius:16px; overflow:hidden; }
.ws-teppich > div{ text-align:center; font-size:30px; padding:6px 0; border-bottom:1px solid #E1E8EF; white-space:nowrap; }
.ws-teppich > .ws-reihe{ font-size:15px; color:#4A5866; display:flex; align-items:center; justify-content:center; background:#F4F7FA; }
.ws-teppich > .ws-gerade{ background:#F7F9FB; }
.ws-t1{ color:#1D5FA8; } .ws-t2{ color:#B23A2E; }
.ws-blitz{ display:flex; flex-wrap:wrap; gap:10px 22px; font-size:28px; justify-content:center; border:2px solid #C9D6E3; border-radius:16px; padding:12px 16px; }
.ws-versuche{ display:flex; gap:20px; justify-content:space-between; font-size:18px; flex-wrap:wrap; }
.ws-versuche span.ws-linie2{ display:inline-block; width:60px; border-bottom:2px solid #1E2A36; }

/* Blatt 10: Wort-Memory */
.ws-karten{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); border-top:2px dashed #8FA3B8; border-left:2px dashed #8FA3B8; }
.ws-karte{ height:150px; border-right:2px dashed #8FA3B8; border-bottom:2px dashed #8FA3B8; display:flex; align-items:center; justify-content:center; padding:10px; text-align:center; }
.ws-karte.ws-k-silben{ background:#E3EEF8; }
.ws-karte.ws-k-wort{ background:#FFF4D6; }
.ws-karte-wort{ font-weight:700; letter-spacing:1px; white-space:nowrap; }
.ws-karte .ws-wort, .ws-karte .ws-karte-wort{ display:inline-block; }
.ws-schere{ font-size:15px; color:#4A5866; display:flex; align-items:center; gap:8px; }

/* ===== Funktions-Serien (Aufmerksamkeit, Optische Differenzierung, …) ===== */
.fs-form{ display:inline-block; flex:none; }
.fs-kreis{ border-radius:50%; }
.fs-ring{ border-radius:50%; background:transparent !important; border-style:solid; }
.fs-raute{ transform:rotate(45deg) scale(.8); }
.fs-dreieck{ width:0 !important; height:0 !important; background:transparent !important; border-left-style:solid; border-right-style:solid; border-bottom-style:solid; border-left-color:transparent !important; border-right-color:transparent !important; }
.fs-zeit{ display:flex; gap:24px; justify-content:center; font-size:18px; flex-wrap:wrap; }
.fs-zeit span.fs-l{ display:inline-block; width:70px; border-bottom:2px solid #1E2A36; margin:0 4px; }

/* Zahlentafel */
.fs-tafel{ display:grid; gap:10px; margin:0 auto; }
.fs-tafel > div{ aspect-ratio:1 / 1; border:2px solid #C9D6E3; border-radius:14px; background:#F4F7FA; display:flex; align-items:center; justify-content:center; font-weight:700; }

/* Reihen mit Zählkästchen */
.fs-reihen{ display:flex; flex-direction:column; gap:10px; }
.fs-reihe{ display:flex; align-items:center; gap:10px; }
.fs-reihe-nr{ width:26px; flex:none; font-size:14px; color:#4A5866; text-align:right; }
.fs-reihe-inhalt{ flex:1; display:flex; justify-content:space-between; align-items:center; border:2px solid #E1E8EF; border-radius:12px; padding:6px 12px; min-height:46px; }
.fs-zaehl{ width:52px; height:44px; flex:none; border:3px solid #1D5FA8; background:#FFF4D6; border-radius:10px; }
.fs-ziel{ display:flex; align-items:center; justify-content:center; gap:14px; font-size:20px; background:#E3EEF8; border-radius:14px; padding:10px 16px; }
.fs-buchstabe{ font-size:30px; width:28px; text-align:center; }

/* Muster fortsetzen */
.fs-muster{ display:flex; flex-direction:column; gap:14px; }
.fs-muster-reihe{ display:flex; align-items:center; gap:10px; border:2px solid #E1E8EF; border-radius:14px; padding:10px 14px; }
.fs-leer{ width:38px; height:38px; flex:none; border:2px dashed #8FA3B8; border-radius:8px; }

/* Labyrinth */
.fs-laby{ display:grid; margin:0 auto; border:4px solid #1E2A36; background:#fff; }
.fs-laby > div{ aspect-ratio:1 / 1; border-color:#1E2A36; border-style:solid; border-width:0; position:relative; }
.fs-laby .fs-start{ background:#DFF1E3; }
.fs-laby .fs-ende{ background:#FFF4D6; }
.fs-laby-legende{ display:flex; gap:28px; justify-content:center; font-size:18px; }
.fs-laby-legende span{ display:inline-flex; align-items:center; gap:8px; }
.fs-laby-legende i{ display:inline-block; width:22px; height:22px; border-radius:5px; border:2px solid #1E2A36; }

/* Punktefeld abzeichnen */
.fs-punkte-paare{ display:flex; flex-direction:column; gap:20px; align-items:center; }
.fs-punkte-paar{ display:flex; gap:40px; align-items:center; }
.fs-punkte-paar img{ display:block; border:2px solid #C9D6E3; border-radius:14px; background:#fff; }
.fs-pfeil{ font-size:30px; color:#8FA3B8; }

/* Gleich oder verschieden */
.fs-vergleich{ width:100%; border-collapse:separate; border-spacing:0 8px; font-size:28px; }
.fs-vergleich th{ font-size:15px; color:#4A5866; font-weight:700; text-align:center; }
.fs-vergleich td{ text-align:center; padding:6px 8px; border-top:2px solid #E1E8EF; border-bottom:2px solid #E1E8EF; }
.fs-vergleich td:first-child{ border-left:2px solid #E1E8EF; border-radius:14px 0 0 14px; }
.fs-vergleich td:last-child{ border-right:2px solid #E1E8EF; border-radius:0 14px 14px 0; }
.fs-kaestchen-klein{ display:inline-block; width:34px; height:34px; border:3px solid #1D5FA8; border-radius:8px; vertical-align:middle; }

/* Buchstaben-Suchbild */
.fs-suchbild{ display:grid; width:100%; gap:6px 4px; font-size:32px; text-align:center; }
.fs-suchbild > div{ padding:2px 0; }

/* Muster-Kacheln vergleichen */
.fs-kacheln{ display:flex; flex-direction:column; gap:14px; }
.fs-kachel-reihe{ display:flex; align-items:center; gap:18px; border:2px solid #E1E8EF; border-radius:14px; padding:10px 14px; }
.fs-kachel-reihe .fs-vorlage{ padding-right:18px; border-right:3px dashed #8FA3B8; }
.fs-kachel{ display:grid; grid-template-columns:repeat(3, 22px); grid-template-rows:repeat(3, 22px); gap:3px; padding:6px; border:2px solid #C9D6E3; border-radius:10px; background:#fff; }
.fs-kachel > div{ border-radius:4px; background:#EEF2F6; }
.fs-optionen{ display:flex; gap:16px; flex:1; justify-content:space-around; }

/* Unterschiede finden */
.fs-zwei-bilder{ display:flex; gap:26px; justify-content:center; }
.fs-bild-gitter{ display:grid; gap:6px; padding:10px; border:3px solid #1D5FA8; border-radius:14px; background:#fff; }
.fs-bild-gitter > div{ display:flex; align-items:center; justify-content:center; }
.fs-bild-titel{ text-align:center; font-size:15px; color:#4A5866; margin-bottom:6px; }

/* Wörter-Paare */
.fs-wortgitter{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:12px; }
.fs-wortgitter > div{ border:2px solid #C9D6E3; border-radius:12px; padding:12px 4px; text-align:center; font-size:26px; white-space:nowrap; }

/* weitere Bausteine der Funktions-Serien */
.fs-zweispaltig{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:12px 16px; }
.fs-karte{ border:2px solid #E1E8EF; border-radius:14px; padding:10px 14px; display:flex; align-items:center; gap:14px; }
.fs-ansage{ flex:none; width:150px; font-size:13px; line-height:1.35; color:#4A5866; border:2px dashed #C9D6E3; border-radius:10px; padding:6px 8px; background:#F7F9FB; }
.fs-ansage b{ display:block; font-size:11px; text-transform:uppercase; letter-spacing:.4px; color:#7c8a94; }
.fs-chips{ display:flex; gap:12px; flex-wrap:wrap; flex:1; justify-content:space-around; }
.fs-chip{ display:flex; flex-direction:column; align-items:center; gap:6px; }
.fs-chip > .fs-chiptext{ border:2px solid #8FA3B8; background:#F4F7FA; border-radius:10px; padding:2px 12px; font-size:26px; white-space:nowrap; }
.fs-nrbox{ width:36px; height:32px; border:3px solid #1D5FA8; background:#FFF4D6; border-radius:8px; }
.fs-boxen{ display:flex; gap:8px; flex:1; justify-content:flex-start; }
.fs-box{ width:46px; height:46px; flex:none; border:3px solid #1D5FA8; background:#FFF4D6; border-radius:10px; }
.fs-linien{ flex:1; display:flex; flex-direction:column; gap:22px; padding-top:10px; }
.fs-linien > div{ border-bottom:2px solid #1E2A36; }
.fs-merk{ flex:none; display:flex; gap:10px; align-items:center; background:#E3EEF8; border-radius:12px; padding:8px 12px; }
.fs-abdecken{ flex:none; font-size:13px; color:#8FA3B8; text-align:center; width:62px; line-height:1.2; }
.fs-umriss{ display:inline-block; flex:none; border:3px solid #1E2A36; background:#fff; }
.fs-kreuz{ display:flex; gap:16px; flex:none; font-size:17px; }
.fs-kreuz span{ display:inline-flex; align-items:center; gap:6px; }
.fs-gross{ font-size:30px; }
.fs-satz{ font-size:24px; flex:1; }
.fs-pfeile{ display:flex; justify-content:space-between; flex:1; }
.fs-pfeil-zelle{ display:flex; flex-direction:column; align-items:center; gap:6px; }
.fs-pfeil-zelle .fs-pfeilzeichen{ font-size:34px; line-height:1; font-family:Arial, sans-serif; color:#1D4F86; }
.fs-pfeil-zelle .fs-nrbox{ width:32px; height:30px; }
.fs-raster{ display:grid; margin:0 auto; border:2px solid #8FA3B8; background:#fff; }
.fs-raster > div{ aspect-ratio:1 / 1; border-right:1px solid #C9D6E3; border-bottom:1px solid #C9D6E3; }
.fs-raster .fs-startfeld{ background:#2E6FD1; }
.fs-code{ display:flex; flex-wrap:wrap; gap:8px; justify-content:center; font-size:24px; }
.fs-code span{ border:2px solid #C9D6E3; border-radius:10px; padding:2px 10px; background:#F4F7FA; font-family:Arial, sans-serif; }
.fs-spiegel{ display:flex; align-items:center; gap:0; }
.fs-achse{ width:0; align-self:stretch; border-left:4px dashed #B23A2E; margin:0 14px; }
/* ===== Ältere Schüler (ab Klasse 5): sachlichere Optik ===== */
.ws-seite.fs-reif{ font-family:"Atkinson Hyperlegible", "Andika", sans-serif; }
.fs-reif h1{ font-size:30px; letter-spacing:-.2px; }
.fs-reif .ws-pille{ background:#E8EDF3; color:#2C3E55; }
.fs-reif .ws-nummer{ width:30px; height:30px; font-size:16px; background:#2C4A6E; }
.fs-reif .ws-aufgabe{ font-size:18px; }
.fs-reif .fs-ziel{ font-size:17px; background:#EEF2F7; }
.fs-reif .fs-karte, .fs-reif .fs-reihe-inhalt{ border-color:#D8DFE7; }
.fs-reif .fs-box, .fs-reif .fs-zaehl, .fs-reif .fs-nrbox{ background:#FBF6E6; border-color:#2C4A6E; }

/* Rechtschreibung */
.rs-regel{ background:#F3F6FA; border:2px solid #C9D6E3; border-radius:14px; padding:14px 18px; font-size:17px; line-height:1.5; }
.rs-regel strong{ color:#2C4A6E; }
.rs-merksatz{ background:#FFF4D6; border-radius:12px; padding:10px 16px; font-weight:700; font-size:18px; text-align:center; }
.rs-schritte{ margin:0; padding-left:22px; font-size:17px; line-height:1.55; }
.rs-beispiele{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:10px 16px; }
.rs-beispiele > div{ border:2px solid #D8DFE7; border-radius:12px; padding:8px 12px; font-size:17px; }
.rs-beispiele b{ display:block; font-size:13px; color:#4A5866; margin-bottom:4px; }
.rs-wort{ font-size:22px; white-space:nowrap; }
.rs-satz{ flex:1; font-size:19px; line-height:1.55; }
.rs-luecke{ display:inline-block; width:40px; height:30px; border:2px solid #2C4A6E; border-radius:6px; background:#FBF6E6; vertical-align:-6px; margin:0 2px; }
.rs-optionen{ display:flex; gap:8px; font-size:17px; color:#2C4A6E; }
.rs-optionen span{ border:2px solid #C9D6E3; border-radius:8px; padding:0 10px; min-width:34px; text-align:center; }
.rs-wortbank{ display:flex; flex-wrap:wrap; gap:8px 12px; border:2px dashed #8FA3B8; border-radius:14px; padding:12px 14px; font-size:19px; }
.rs-tabelle{ width:100%; border-collapse:collapse; table-layout:fixed; }
.rs-tabelle th{ font-size:15px; font-weight:700; color:#2C3E55; text-align:left; padding:8px 10px; background:#E8EDF3; border:2px solid #C9D6E3; }
.rs-tabelle td{ height:40px; border-left:2px solid #C9D6E3; border-right:2px solid #C9D6E3; border-bottom:1.5px solid #8FA3B8; font-size:20px; padding:4px 10px; }
.rs-linie{ display:inline-block; border-bottom:2px solid #1E2A36; min-width:160px; height:26px; }
.rs-falsch{ text-decoration:none; }

.fs-tier{ display:inline-block; line-height:0; }
.fs-tier svg{ width:44px; height:44px; }

/* ===== Lösungen (unsichtbar, bis „Lösungen zeigen“ aktiv ist – das Layout bleibt gleich) ===== */
.fs-loes{ visibility:hidden; color:#C0392B; font-family:"Andika", sans-serif; font-weight:700; white-space:nowrap; line-height:1.1; }
.fs-lx{ font-size:26px; line-height:1; }
.ws-loesung .fs-loes{ visibility:visible; }
.fs-lm{ display:inline-flex; align-items:center; justify-content:center; border-radius:10px; }
.ws-loesung .fs-lm{ box-shadow:0 0 0 2px #fff, 0 0 0 5px #C0392B; }   /* Ring ohne Layout-Verschiebung (auch im PDF) */
.ws-loesung .fs-ls{ text-decoration:line-through; text-decoration-color:#C0392B; text-decoration-thickness:3px; }
.ws-loesung .fs-weg{ background:#F6C9C3 !important; }
.ws-loesung .fs-lfill{ background:var(--lf) !important; }
.ws-loesung .ws-pille::after{ content:" · Lösung"; color:#C0392B; }
.ws-loesung.ws-ohneloesung .ws-pille::after{ content:" · offene Aufgabe (ohne Lösung)"; }
.ws-loesung.ws-info .ws-pille::after{ content:none; }
.fs-box, .fs-zaehl, .fs-nrbox, .fs-leer{ display:flex; align-items:center; justify-content:center; font-size:20px; }
.fs-kaestchen-klein{ text-align:center; }
.rs-luecke{ text-align:center; font-size:18px; vertical-align:middle; }
/* Lösung mittig im Kästchen – als Block mit Verschiebung, das übernimmt auch die PDF-Umwandlung zuverlässig */
.fs-kaestchen-klein > .fs-loes, .rs-luecke > .fs-loes{ display:block; line-height:1; position:relative; top:50%; transform:translateY(-50%); }
.rs-linie{ vertical-align:bottom; padding-left:6px; font-size:19px; }
.rs-tabelle td .fs-loes{ font-size:19px; }

/* ===== Silbentext ===== */
.st-text{ color:#1E2A36; }
.st-text p{ margin:0 0 .5em; }
.st-w{ white-space:nowrap; }
.st-s1{ color:#1D5FA8; } .st-s2{ color:#B23A2E; }
.st-wort1{ color:#1D5FA8; } .st-wort2{ color:#1E2A36; }
.st-schwarz .ws-s1, .st-schwarz .ws-s2{ color:#1E2A36; }
.st-text .ws-s1, .st-text .ws-s2{ padding:0 1px 10px; }
.st-text .ws-bogen{ height:10px; }
.st-protokoll{ border:2px solid #9CC7A4; background:#EAF5EC; border-radius:16px; padding:12px 18px; font-size:17px; display:flex; flex-wrap:wrap; gap:10px 28px; align-items:center; }
.st-protokoll .ws-linie2{ display:inline-block; width:70px; border-bottom:2px solid #1E2A36; }
.st-malbox{ flex:1; min-height:120px; border:2px dashed #8FA3B8; border-radius:16px; display:flex; align-items:flex-start; padding:10px 14px; font-size:15px; color:#4A5866; }

/* ===== Strategie-Kärtchen, Pass, Elternblatt, Stunde ===== */
.sk-gitter{ flex:1; display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); grid-auto-rows:1fr; border-top:2px dashed #8FA3B8; border-left:2px dashed #8FA3B8; min-height:0; }
.sk-karte{ border-right:2px dashed #8FA3B8; border-bottom:2px dashed #8FA3B8; padding:14px 16px; display:flex; flex-direction:column; gap:6px; overflow:hidden; }
.sk-titel{ font-size:17px; font-weight:700; color:#fff; background:#2C4A6E; border-radius:8px; padding:3px 10px; align-self:flex-start; }
.sk-merk{ font-size:17px; font-weight:700; line-height:1.3; }
.sk-pruefen{ font-size:14px; color:#2C3E55; }
.sk-bsp{ margin-top:auto; font-size:16px; color:#4A5866; }
.sk-bsp .stelle, .kt-stelle{ background:#FFE7A3; border-radius:4px; padding:0 2px; }
.sk-leer .sk-linien{ flex:1; display:flex; flex-direction:column; justify-content:space-evenly; }
.sk-leer .sk-linien div{ border-bottom:1.5px solid #8FA3B8; }
.sp-gitter{ flex:1; display:grid; gap:14px; min-height:0; }
.sp-feld{ border:3px solid #C9D6E3; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; color:#A7B4C2; font-weight:700; aspect-ratio:1 / 1; justify-self:center; align-self:center; width:100%; max-width:110px; }
.sp-feld.sp-preis{ border-color:#E8B900; background:#FFF4D6; color:#9A7A00; flex-direction:column; font-size:14px; border-radius:22px; aspect-ratio:auto; height:100%; max-width:none; gap:2px; }
.sp-motto{ text-align:center; font-size:20px; background:#E3EEF8; border-radius:14px; padding:8px 14px; }
.sp-tabelle{ width:100%; border-collapse:collapse; flex:1; }
.sp-tabelle th{ background:#E8EDF3; font-size:14px; text-align:left; padding:6px 8px; border:1.5px solid #C9D6E3; }
.sp-tabelle td{ border:1.5px solid #C9D6E3; height:34px; font-size:15px; padding:2px 8px; }
.eb-intro{ font-size:16px; line-height:1.45; }
.eb-plan{ width:100%; border-collapse:separate; border-spacing:0 6px; }
.eb-plan td{ padding:8px 12px; border-top:2px solid #E1E8EF; border-bottom:2px solid #E1E8EF; font-size:15.5px; line-height:1.35; vertical-align:top; }
.eb-plan td:first-child{ border-left:2px solid #E1E8EF; border-radius:12px 0 0 12px; font-weight:700; color:#1D4F86; width:110px; }
.eb-plan td:last-child{ border-right:2px solid #E1E8EF; border-radius:0 12px 12px 0; width:54px; text-align:center; }
.eb-plan b{ color:#1E2A36; }
.eb-tipps{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:8px 18px; font-size:14.5px; background:#EAF5EC; border:2px solid #9CC7A4; border-radius:16px; padding:12px 16px; }
.eb-woerter{ font-size:19px; background:#FFF4D6; border-radius:14px; padding:10px 16px; }
.eb-rueck{ border:2px dashed #8FA3B8; border-radius:14px; padding:10px 14px; font-size:14.5px; display:flex; flex-direction:column; gap:10px; }
.eb-rueck .linie{ border-bottom:1.5px solid #8FA3B8; height:18px; }
.std-tabelle{ width:100%; border-collapse:collapse; }
.std-tabelle th{ background:#E8EDF3; font-size:14px; text-align:left; padding:7px 9px; border:1.5px solid #C9D6E3; }
.std-tabelle td{ border:1.5px solid #C9D6E3; font-size:15px; padding:8px 9px; vertical-align:top; line-height:1.35; }
.std-felder{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:10px 18px; font-size:15px; background:#F3F6FA; border-radius:14px; padding:12px 16px; }
.std-felder span.l{ display:inline-block; min-width:60px; border-bottom:1.5px solid #1E2A36; }
.std-linien{ display:flex; flex-direction:column; gap:22px; padding-top:6px; }
.std-linien div{ border-bottom:1.5px solid #8FA3B8; }
.rb-smileys{ display:flex; justify-content:space-around; }
.rb-smileys > div{ display:flex; flex-direction:column; align-items:center; gap:6px; font-size:16px; }
.rb-stempel{ width:170px; height:170px; border:3px dashed #E8B900; border-radius:50%; display:flex; align-items:center; justify-content:center; text-align:center; color:#9A7A00; font-size:16px; background:#FFFBEF; }
.kt-tabelle td.kt-wort{ font-size:24px; white-space:nowrap; }
.kt-eigen{ color:#B23A2E; font-size:16px; }
.bs-vorlage{ display:flex; justify-content:center; gap:70px; font-size:150px; line-height:1; font-weight:700; color:#C9D6E3; }
.bs-beispiele{ display:flex; flex-wrap:wrap; gap:10px 14px; justify-content:center; font-size:26px; }
.bs-beispiele > span{ border:2px solid #C9D6E3; border-radius:12px; padding:2px 14px; background:#F4F7FA; }
.bs-mark{ color:#B23A2E; }
.bs-zeile{ overflow:hidden; }
.bs-zeichen{ width:auto; min-width:28px; }
.bs-wort{ font-size:26px; letter-spacing:1px; white-space:nowrap; }
.bs-wort .fs-lm{ padding:0; border-radius:0; }
.ws-loesung .bs-wort .fs-lm{ box-shadow:none; color:#C0392B; text-decoration:underline; text-decoration-thickness:3px; text-underline-offset:4px; }
.bs-merk span{ font-size:30px; min-width:30px; text-align:center; }
.bs-gk{ font-size:28px !important; min-width:44px; text-align:center; }
.bs-silben{ flex:1; display:flex; justify-content:space-around; font-size:30px; }
.bs-zielchip{ flex:none; width:44px; height:44px; border-radius:50%; background:#1D5FA8; color:#fff; font-size:24px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; }
.bs-reihe{ flex:1; display:flex; justify-content:space-between; align-items:center; margin-left:10px; }
.bs-hoerkreuz{ flex:1; justify-content:center; font-size:20px; gap:22px; }
.lt-fragen{ display:flex; flex-direction:column; gap:10px; }
.lt-frage{ border:2px solid #E1E8EF; border-radius:14px; padding:8px 14px; }
.lt-f{ font-size:18px; margin-bottom:6px; }
.lt-opt{ display:flex; flex-wrap:wrap; gap:6px 24px; font-size:17px; }
.lt-opt > span{ display:inline-flex; align-items:center; gap:8px; }
.lt-rf td{ font-size:17px; padding:8px 12px; }
.lt-offen{ display:flex; flex-direction:column; gap:4px; }
.lt-linie{ border-bottom:1.5px solid #1E2A36; height:36px; display:flex; align-items:flex-end; padding:0 0 3px 6px; overflow:hidden; }
.lt-text{ line-height:2.15; }
.lt-luecke{ display:inline-block; border-bottom:2px solid #2C4A6E; background:#FBF6E6; border-radius:6px 6px 0 0; text-align:center; line-height:1.35; }
.lt-satz{ flex:1; line-height:1.45; }
.lt-haelften{ display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.lt-haelften > div{ display:flex; flex-direction:column; gap:8px; }
.lt-haelften .fs-karte{ padding:8px 12px; gap:10px; line-height:1.35; }
.lt-wortgitter{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:8px; }
.lt-wortgitter > div{ border:2px solid #E1E8EF; border-radius:12px; padding:6px 10px; display:flex; justify-content:space-between; align-items:center; gap:8px; }
.lt-silbenwort{ font-size:21px; white-space:nowrap; }
.lt-tipp{ font-size:14px; color:#4A5866; }
.lt-tipps{ display:grid; grid-template-columns:1fr 1fr; gap:6px 18px; font-size:16px; }
.dk-info{ display:flex; gap:8px 22px; flex-wrap:wrap; font-size:15px; background:#F3F6FA; border-radius:12px; padding:8px 14px; }
.dk-text{ font-size:18px; line-height:1.75; border:2px solid #D8DFE7; border-radius:14px; padding:12px 16px; }
.dk-text p{ margin:0 0 4px; }
.dk-text b{ color:#7c8a94; font-size:13px; margin-right:6px; }
.dk-strich{ color:#B23A2E; font-weight:700; }
.dk-hinweise{ font-size:14px; background:#FFF4D6; border-radius:12px; padding:8px 14px; }
.dk-hinweise ul{ margin:4px 0 0; padding-left:20px; }
.dk-pruef td{ font-size:14px; }
.dk-zeilen{ display:flex; flex-direction:column; }
.dk-zeile{ height:44px; border-bottom:1.5px solid #8FA3B8; flex:none; }
.fp-uebersicht{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:12px; }
.fp-uebersicht > div{ border:2px solid #D8DFE7; border-radius:14px; padding:10px 14px; font-size:15px; }
.fp-uebersicht b{ display:block; font-size:13px; color:#4A5866; margin-bottom:4px; text-transform:uppercase; letter-spacing:.3px; }
/* ---------- Aufmerksamkeit: Bilder-Blätter ---------- */
.lt-bild{ display:inline-block; vertical-align:middle; flex:none; object-fit:contain; }
.au-x{ position:relative; display:inline-flex; align-items:center; justify-content:center; }
.au-xm{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); font-size:40px; line-height:1; }
.au-zwei{ display:flex; flex-direction:column; gap:4px; flex:none; } .au-zwei > span{ display:flex; align-items:center; gap:4px; }
.fs-zaehl.au-klein{ width:40px; height:30px; font-size:16px; border-width:2.5px; }
.au-paare, .au-pbs{ display:flex; flex-direction:column; gap:14px; }
.au-paar, .au-pb{ display:flex; align-items:center; gap:18px; justify-content:center; }
.au-gitter{ display:grid; border:2.5px solid #2C4A6E; border-radius:10px; padding:4px; background:#fff; }
.au-gitter > div{ display:flex; align-items:center; justify-content:center; }
.au-paar-zahl{ display:flex; flex-direction:column; align-items:center; gap:4px; font-size:14px; text-align:center; }
.au-wahl{ display:inline-flex; flex-direction:column; align-items:center; gap:4px; }
.au-vorbild{ padding:4px; border:2.5px solid #1D5FA8; border-radius:10px; background:#E3EEF8; display:inline-flex; }
.au-pfeil{ font-size:26px; color:#4A5866; }
.au-pn.mit{ display:flex; align-items:center; gap:10px; } .au-pn.mit > .fs-reihe{ flex:1; min-width:0; }
.au-begriff{ font-size:13px; display:flex; flex-direction:column; gap:2px; width:160px; flex:none; color:#4A5866; }
.au-linie{ display:block; border-bottom:2px solid #1E2A36; min-height:26px; font-size:16px; color:#1E2A36; }
.au-wort{ font-size:18px; padding:2px 3px; }
.au-sudokus, .au-shs{ display:flex; flex-wrap:wrap; gap:22px 30px; justify-content:center; }
.au-sudoku{ display:grid; border:3px solid #2C4A6E; background:#fff; }
.au-sudoku > div{ border:1px solid #9FB3C8; display:flex; align-items:center; justify-content:center; gap:2px; }
.au-folge{ display:flex; align-items:center; gap:4px; }
.au-frage{ width:34px; height:34px; border:2.5px dashed #9FB3C8; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; font-size:22px; font-weight:800; color:#4A5866; }
.au-optionen{ display:flex; gap:10px; padding-left:12px; border-left:2px dashed #C9D6E3; }
.au-schluessel{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; }
.au-schl{ display:inline-flex; flex-direction:column; align-items:center; border:1.5px solid #D8DFE7; border-radius:8px; padding:3px 6px; min-width:44px; }
.au-schl b{ font-size:18px; }
.au-code{ display:inline-flex; flex-direction:column; align-items:center; gap:3px; }
.au-wimmel{ position:relative; border:2px solid #D8DFE7; border-radius:16px; }
.au-zaehltabelle{ display:flex; flex-wrap:wrap; gap:14px 22px; justify-content:center; }
.au-zaehlfeld{ display:flex; align-items:center; gap:8px; }
.au-ww{ position:relative; margin:0 auto; }
.au-ww-l{ position:absolute; left:0; display:flex; align-items:center; gap:8px; height:56px; }
.au-ww-zahl{ display:inline-flex; width:46px; height:46px; align-items:center; justify-content:center; border:2.5px solid #2C4A6E; border-radius:10px; font-size:22px; background:#fff; }
.au-ww-r{ position:absolute; right:0; width:44px; height:44px; border:2.5px solid #2C4A6E; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:20px; background:#fff; }
.au-pb-feld{ border:2px solid #D8DFE7; border-radius:12px; padding:6px; background:#fff; line-height:0; }
.au-pb-loes{ position:absolute; left:6px; top:6px; display:block; line-height:0; }
.au-rechnungen{ display:grid; grid-template-columns:1fr 1fr; gap:14px; align-content:start; }
.au-rechnen{ display:flex; gap:8px; border:2px solid #E1E8EF; border-radius:12px; padding:8px 10px; }
.au-rechnen-inhalt{ display:flex; flex-direction:column; gap:6px; }
.au-gl{ display:flex; align-items:center; gap:2px; font-size:20px; flex-wrap:wrap; }
.au-frage-gl{ border-top:1.5px dashed #C9D6E3; padding-top:6px; }
.au-sym{ font-size:26px; }
.au-op{ font-weight:700; margin:0 4px; }
.au-werte{ display:flex; gap:12px; flex-wrap:wrap; font-size:16px; align-items:center; }
.au-werte > span{ display:inline-flex; align-items:center; gap:3px; }
.au-sz-reihe{ display:flex; justify-content:space-between; border:2px solid #E1E8EF; border-radius:12px; padding:6px 8px; }
.au-sz{ display:flex; flex-direction:column; align-items:center; gap:3px; }
.au-sz-z{ font-weight:700; line-height:1; min-height:34px; display:flex; align-items:center; }
.au-ws-wrap{ display:flex; gap:24px; align-items:flex-start; justify-content:center; }
.au-suchsel{ display:grid; border:2.5px solid #2C4A6E; border-radius:8px; font-weight:700; background:#fff; }
.au-suchsel > div{ display:flex; align-items:center; justify-content:center; border:1px solid #E1E8EF; }
.au-ws-treffer{ display:flex; width:100%; height:100%; align-items:center; justify-content:center; }
.au-ws-liste{ display:flex; flex-wrap:wrap; gap:8px 22px; font-size:18px; justify-content:center; max-width:640px; }
.au-ws-wort{ display:inline-flex; align-items:center; gap:8px; }
.au-sh{ display:flex; gap:6px; align-items:flex-start; }
.au-sh-gitter{ display:grid; border:2px solid #2C4A6E; background:#fff; }
.au-sh-gitter > div{ border:1px solid #9FB3C8; position:relative; }
.au-sh-gitter > div.au-achse{ border-left:3px solid #C0392B; }
.au-sh-gitter .fs-lfill{ position:absolute; left:0; top:0; right:0; bottom:0; }
.au-regel{ color:#fff; font-weight:800; font-size:13px; border-radius:8px; padding:4px 8px; width:96px; flex:none; text-align:center; }
.au-ziffer{ font-size:22px; font-weight:600; min-width:14px; text-align:center; }
.au-rs .au-rot{ color:#C0392B; text-decoration:underline; text-decoration-thickness:3px; text-underline-offset:5px; }
.au-gruppe-titel{ font-size:12px; font-weight:900; color:var(--meer); margin:8px 0 4px; text-transform:uppercase; letter-spacing:.3px; }
</style>
</head>
<body>

<div class="wrap">

<a href="index.php" class="zurueck"><i class="fa-solid fa-arrow-left"></i> Zurück zum Leuchtturm</a>

<div id="update-test" style="background:linear-gradient(90deg,#ff6b6b,#f2a93b,#ffd93d,#6bcb77,#4d96ff,#9b5de5); color:#fff; font-weight:900; font-size:22px; text-align:center; padding:18px; border-radius:18px; margin-bottom:18px; text-shadow:0 2px 4px rgba(0,0,0,.3);">🎉 Update-Test erfolgreich! Diese Nachricht kam direkt von GitHub. 🚀</div>
<header class="kopf">
<h1><i class="fa-solid fa-pen-nib"></i> LRS-Förderung</h1>
<p>Arbeitsblatt-Generator nach der AFS-Methode</p>
</header>

<div class="hinweis">
<i class="fa-solid fa-lock"></i>
Die Blätter entstehen im Browser. Gespeichert wird nur, was du selbst in Materialien oder in der Förderkartei speicherst – immer nur mit Kürzel, nie mit Namen.
</div>

<div class="global-karte">
    <h2><i class="fa-solid fa-sliders"></i> Gemeinsame Einstellungen (gelten für alle Bereiche)</h2>
    <div class="global-zeile">
        <div>
            <label>Klassenstufe</label>
            <select id="g-klasse">
                <option value="1">1</option>
                <option value="2" selected>2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </select>
        </div>
        <div>
            <label>Schwierigkeit</label>
            <select id="g-schwierigkeit">
                <option value="leicht">Leicht</option>
                <option value="mittel" selected>Mittel</option>
                <option value="schwer">Schwer</option>
            </select>
        </div>
        <div>
            <label>Thema</label>
            <select id="g-thema">
                <option value="herbst">Herbst</option>
                <option value="tiere">Tiere</option>
                <option value="schule">Schule</option>
                <option value="familie">Familie</option>
                <option value="jahreszeiten">Jahreszeiten</option>
                <option value="freizeit">Freizeit & Medien</option>
                <option value="beruf">Beruf & Zukunft</option>
                <option value="eigen">Eigene Wörter</option>
            </select>
        </div>
        <div>
            <label>Umfang</label>
            <select id="g-umfang">
                <option value="klein">Klein</option>
                <option value="mittel" selected>Mittel</option>
                <option value="gross">Groß</option>
            </select>
        </div>
    </div>
    <div class="global-zeile2" id="g-eigen-wrap" style="display:none;">
        <div>
            <label>Eigene Wörter (kommagetrennt)</label>
            <textarea id="g-eigene-woerter" placeholder="Sonne, Baum, Haus, Fahrrad, ..."></textarea>
        </div>
    </div>
</div>

<div class="tabs">
<button class="tab aktiv" data-bereich="aufmerksamkeit">🎯 Aufmerksamkeit</button>
<button class="tab" data-bereich="optdiff">👁️ Optische Differenzierung</button>
<button class="tab" data-bereich="optged">🖼️ Optisches Gedächtnis</button>
<button class="tab" data-bereich="optser">🔢 Optische Serialität</button>
<button class="tab" data-bereich="akdiff">👂 Akustische Differenzierung</button>
<button class="tab" data-bereich="akged">🎧 Akustisches Gedächtnis</button>
<button class="tab" data-bereich="akser">🔊 Akustische Serialität</button>
<button class="tab" data-bereich="symptom">✏️ Symptomtraining</button>
<button class="tab" data-bereich="koerper">🙆 Körperschema</button>
<button class="tab" data-bereich="raum">🐸 Raumorientierung</button>
<button class="tab tab-neu" data-bereich="lesen">📚 Lesen &amp; Diktat</button>
<button class="tab tab-neu" data-bereich="plan">🧭 Förderplan</button>
<button class="tab tab-neu" data-bereich="stunde">🗂️ Stunde</button>
<button class="tab tab-neu" data-bereich="extras">🧰 Extras</button>
</div>

<div class="bereich aktiv" id="bereich-aufmerksamkeit">
    <div class="karte">
        <h2 class="titel">Aufmerksamkeit / Konzentration</h2>
        <p class="beschreibung">Verschiedene Übungstypen zur Auswahl.</p>
        <label>Aufgaben-Typ</label>
        <select id="aufm-typ">
            <option value="schulte">Schulte-Tafel (Zahlen in Reihenfolge suchen)</option>
            <option value="symbole">Symbole zählen</option>
            <option value="muster">Muster fortsetzen</option>
            <option value="unterschiede">Unterschiede finden</option>
            <option value="durchstreichen">Ziel-Symbol durchstreichen (auf Zeit)</option>
            <option value="punkte">Punkte verbinden</option>
        </select>
        <button class="btn" onclick="erstelleAufmerksamkeit()"><i class="fa-solid fa-wand-magic-sparkles"></i> Arbeitsblatt erstellen</button>
    </div>
    <div class="ausgabe-aktionen" id="akt-aufmerksamkeit" style="display:none;">
        <button class="btn klein" onclick="window.print()"><i class="fa-solid fa-print"></i> Drucken</button>
    </div>
    <div class="blatt" id="ausgabe-aufmerksamkeit" style="display:none;">
        <div class="blatt-kopf">
            <div class="autor-zeile">Leuchtturm · Aufmerksamkeit &amp; Konzentration</div>
            <h3 id="aufm-titel">Übung</h3>
        </div>
        <div class="blatt-koerper">
            <div class="blatt-namenszeile"><span>Name:</span><span>Datum:</span></div>
            <p class="anweisung" id="aufm-anweisung"></p>
            <div id="aufm-inhalt"></div>
            <div class="blatt-fusszeile">Leuchtturm &middot; Aufmerksamkeit</div>
        </div>
    </div>
</div>

<div class="bereich" id="bereich-optdiff">
    <div class="karte">
        <h2 class="titel">Optische Differenzierung</h2>
        <p class="beschreibung">Verschiedene Übungstypen zur Auswahl.</p>
        <label>Aufgaben-Typ</label>
        <select id="od-typ" onchange="od_typWechsel()">
            <option value="bildpaare">Bildpaare finden</option>
            <option value="suchbild">Suchbild (Buchstabe/Wort einkreisen)</option>
            <option value="wortpaare">Wortpaare vergleichen (gleich/verschieden)</option>
            <option value="fehlerreihe">Der Fehler in der Reihe (Wort-Variante finden)</option>
        </select>
        <div id="od-suchbild-wrap">
            <div class="zeile zwei">
                <div>
                    <label>Zielelement</label>
                    <input type="text" id="od-ziel" value="b">
                </div>
                <div>
                    <label>Eigene Verwechsler (optional, kommagetrennt)</label>
                    <input type="text" id="od-verwechsler" placeholder="z.B. d,p,q,m,n">
                </div>
            </div>
        </div>
        <button class="btn" onclick="erstelleOptDiff()"><i class="fa-solid fa-wand-magic-sparkles"></i> Arbeitsblatt erstellen</button>
    </div>
    <div class="ausgabe-aktionen" id="akt-optdiff" style="display:none;">
        <button class="btn klein" onclick="window.print()"><i class="fa-solid fa-print"></i> Drucken</button>
    </div>
    <div class="blatt" id="ausgabe-optdiff" style="display:none;">
        <div class="blatt-kopf">
            <div class="autor-zeile">Leuchtturm · Optische Differenzierung</div>
            <h3 id="od-titel">Suchbild</h3>
        </div>
        <div class="blatt-koerper">
            <div class="blatt-namenszeile"><span>Name:</span><span>Datum:</span></div>
            <p class="anweisung" id="od-anweisung"></p>
            <div id="od-inhalt"></div>
            <div class="blatt-fusszeile">Leuchtturm &middot; Optische Differenzierung</div>
        </div>
    </div>
</div>

<div class="bereich" id="bereich-optged">
    <div class="karte">
        <h2 class="titel">Optisches Gedächtnis</h2>
        <p class="beschreibung">Verschiedene Übungstypen zur Auswahl.</p>
        <label>Aufgaben-Typ</label>
        <select id="og-typ" onchange="og_typWechsel()">
            <option value="tierfehlt">Schau genau hin — welches Tier fehlt?</option>
            <option value="wortreihe">Wortreihe merken & aufschreiben</option>
            <option value="formen">Formen-Merkspiel (Symbole statt Wörter)</option>
            <option value="veraendert">Was hat sich verändert?</option>
        </select>
        <div id="og-zeit-wrap">
            <label>Merkzeit (Sekunden, nur als Hinweistext)</label>
            <input type="number" id="og-zeit" value="30" min="10" max="120">
        </div>
        <button class="btn" onclick="erstelleOptGed()"><i class="fa-solid fa-wand-magic-sparkles"></i> Arbeitsblatt erstellen</button>
    </div>
    <div class="ausgabe-aktionen" id="akt-optged" style="display:none;">
        <button class="btn klein" onclick="window.print()"><i class="fa-solid fa-print"></i> Drucken</button>
    </div>
    <div class="blatt" id="ausgabe-optged" style="display:none;">
        <div class="blatt-kopf">
            <div class="autor-zeile">Leuchtturm · Optisches Gedächtnis</div>
            <h3 id="og-titel">Merk dir die Reihe</h3>
        </div>
        <div class="blatt-koerper">
            <div class="blatt-namenszeile"><span>Name:</span><span>Datum:</span></div>
            <div id="og-inhalt"></div>
            <div class="blatt-fusszeile">Leuchtturm &middot; Optisches Gedächtnis</div>
        </div>
    </div>
</div>

<div class="bereich" id="bereich-optser">
    <div class="karte">
        <h2 class="titel">Optische Serialität</h2>
        <p class="beschreibung">Reihenfolgen erkennen und herstellen.</p>
        <label>Aufgaben-Typ</label>
        <select id="os-typ" onchange="os_typWechsel()">
            <option value="zahlen">Zahlenreihen fortsetzen</option>
            <option value="alphabet">Wörter alphabetisch sortieren</option>
            <option value="anagramm">Buchstabensalat entwirren</option>
            <option value="alphabetluecken">Alphabet-Lücken ergänzen</option>
        </select>
        <div id="os-zahlen-wrap">
            <div class="zeile drei">
                <div><label>Start</label><input type="number" id="os-start" value="2"></div>
                <div><label>Schrittweite</label><input type="number" id="os-schritt" value="2"></div>
                <div><label>Anzahl Lücken</label><input type="number" id="os-luecken" value="4" min="1" max="12"></div>
            </div>
        </div>
        <button class="btn" onclick="erstelleOptSer()"><i class="fa-solid fa-wand-magic-sparkles"></i> Arbeitsblatt erstellen</button>
    </div>
    <div class="ausgabe-aktionen" id="akt-optser" style="display:none;">
        <button class="btn klein" onclick="window.print()"><i class="fa-solid fa-print"></i> Drucken</button>
    </div>
    <div class="blatt" id="ausgabe-optser" style="display:none;">
        <div class="blatt-kopf">
            <div class="autor-zeile">Leuchtturm · Optische Serialität</div>
            <h3 id="os-titel">Reihenfolge</h3>
        </div>
        <div class="blatt-koerper">
            <div class="blatt-namenszeile"><span>Name:</span><span>Datum:</span></div>
            <p class="anweisung" id="os-anweisung"></p>
            <div id="os-inhalt"></div>
            <div class="blatt-fusszeile">Leuchtturm &middot; Optische Serialität</div>
        </div>
    </div>
</div>

<div class="bereich" id="bereich-akdiff">
    <div class="karte">
        <h2 class="titel">Akustische Differenzierung</h2>
        <p class="beschreibung">Verschiedene Übungstypen zur Auswahl.</p>
        <label>Aufgaben-Typ</label>
        <select id="ad-typ" onchange="ad_typWechsel()">
            <option value="hoergenau">Hör genau hin (Laut im Bild erkennen)</option>
            <option value="minimalpaare">Minimalpaare (Wort markieren)</option>
            <option value="anlaut">Anlaut erkennen</option>
            <option value="reime">Reimwörter erkennen (ja/nein)</option>
        </select>
        <div id="ad-hoergenau-wrap">
            <label>Zwei Ziellaute (Buchstaben)</label>
            <div class="zeile zwei">
                <input type="text" id="ad-laut1" value="b" placeholder="z.B. b">
                <input type="text" id="ad-laut2" value="p" placeholder="z.B. p">
            </div>
        </div>
        <div id="ad-minimalpaare-wrap">
            <label>Vorgefertigtes Paar-Set</label>
            <select id="ad-set" onchange="ad_setWechsel()">
                <option value="bp">b / p</option>
                <option value="dt">d / t</option>
                <option value="gk">g / k</option>
                <option value="mn">m / n</option>
                <option value="eigen">Eigene Paare eingeben</option>
            </select>
            <div id="ad-eigen-wrap" style="display:none;">
                <label>Eigene Wortpaare (ein Paar pro Zeile, Semikolon-getrennt)</label>
                <textarea id="ad-eigen" placeholder="Bein;Pein&#10;Dach;Tach"></textarea>
            </div>
        </div>
        <button class="btn" onclick="erstelleAkDiff()"><i class="fa-solid fa-wand-magic-sparkles"></i> Arbeitsblatt erstellen</button>
    </div>
    <div class="ausgabe-aktionen" id="akt-akdiff" style="display:none;">
        <button class="btn sekundaer klein" onclick="ad_loesungAn = !ad_loesungAn; ad_neuZeichnen();"><i class="fa-solid fa-eye"></i> Lösung ein/aus</button>
        <button class="btn klein" onclick="window.print()"><i class="fa-solid fa-print"></i> Drucken</button>
    </div>
    <div class="blatt" id="ausgabe-akdiff" style="display:none;">
        <div class="blatt-kopf">
            <div class="autor-zeile">Leuchtturm · Akustische Differenzierung</div>
            <h3 id="ad-titel">Minimalpaare</h3>
        </div>
        <div class="blatt-koerper">
            <div class="blatt-namenszeile"><span>Name:</span><span>Datum:</span></div>
            <p class="anweisung" id="ad-anweisung">Lehrkraft liest EIN Wort aus jeder Zeile vor (🔊 zum Anhören) — Kind markiert, was es gehört hat.</p>
            <div id="ad-inhalt"></div>
            <div class="blatt-fusszeile">Leuchtturm &middot; Akustische Differenzierung</div>
        </div>
    </div>
</div>

<div class="bereich" id="bereich-akged">
    <div class="karte">
        <h2 class="titel">Akustisches Gedächtnis</h2>
        <p class="beschreibung">Verschiedene Übungstypen zur Auswahl.</p>
        <label>Aufgaben-Typ</label>
        <select id="akg-typ">
            <option value="geschichte">Geschichte in Reihenfolge bringen</option>
            <option value="wortfolgen">Wortfolgen merken</option>
            <option value="zahlenspanne">Zahlenspanne (Zahlen nachschreiben)</option>
            <option value="satzgedaechtnis">Satzgedächtnis</option>
        </select>
        <button class="btn" onclick="erstelleAkGed()"><i class="fa-solid fa-wand-magic-sparkles"></i> Arbeitsblatt erstellen</button>
    </div>
    <div class="ausgabe-aktionen" id="akt-akged" style="display:none;">
        <button class="btn klein" onclick="window.print()"><i class="fa-solid fa-print"></i> Drucken</button>
    </div>
    <div class="blatt" id="ausgabe-akged" style="display:none;">
        <div class="blatt-kopf">
            <div class="autor-zeile">Leuchtturm · Akustisches Gedächtnis</div>
            <h3 id="akg-titel">Wortfolgen merken</h3>
        </div>
        <div class="blatt-koerper">
            <div class="blatt-namenszeile"><span>Name:</span><span>Datum:</span></div>
            <p class="anweisung" id="akg-anweisung">Auf 🔊 klicken, anhören, dann aus dem Gedächtnis auf die Linien schreiben.</p>
            <div id="akg-inhalt"></div>
            <div class="blatt-fusszeile">Leuchtturm &middot; Akustisches Gedächtnis</div>
        </div>
    </div>
</div>

<div class="bereich" id="bereich-akser">
    <div class="karte">
        <h2 class="titel">Akustische Serialität</h2>
        <p class="beschreibung">Verschiedene Übungstypen zur Auswahl.</p>
        <label>Aufgaben-Typ</label>
        <select id="aks-typ">
            <option value="richtigereihenfolge">Richtige Reihenfolge (Farben + Zahlen-Diktat)</option>
            <option value="gehoert">Gehörte Reihenfolge nummerieren</option>
            <option value="logisch">Logische Reihenfolge herstellen</option>
        </select>
        <button class="btn" onclick="erstelleAkSer()"><i class="fa-solid fa-wand-magic-sparkles"></i> Arbeitsblatt erstellen</button>
    </div>
    <div class="ausgabe-aktionen" id="akt-akser" style="display:none;">
        <button class="btn sekundaer klein" onclick="as_loesungAn = !as_loesungAn; as_neuZeichnen();"><i class="fa-solid fa-eye"></i> Lösung ein/aus</button>
        <button class="btn klein" onclick="window.print()"><i class="fa-solid fa-print"></i> Drucken</button>
    </div>
    <div class="blatt" id="ausgabe-akser" style="display:none;">
        <div class="blatt-kopf">
            <div class="autor-zeile">Leuchtturm · Akustische Serialität</div>
            <h3 id="aks-titel">Gehörte Reihenfolge</h3>
        </div>
        <div class="blatt-koerper">
            <div class="blatt-namenszeile"><span>Name:</span><span>Datum:</span></div>
            <p class="anweisung" id="aks-anweisung">🔊 klicken und die Wörter unten in der gehörten Reihenfolge nummerieren (1, 2, 3 ...).</p>
            <div id="aks-inhalt"></div>
            <div class="blatt-fusszeile">Leuchtturm &middot; Akustische Serialität</div>
        </div>
    </div>
</div>

<div class="bereich" id="bereich-symptom">
    <div class="karte">
        <h2 class="titel">Symptomtraining</h2>
        <p class="beschreibung">Individuelles Übungsmaterial direkt am Fehlerschwerpunkt.</p>
        <label>Aufgaben-Typ</label>
        <select id="sy-typ" onchange="sy_typWechsel()">
            <option value="serie">Worterarbeitung – Serie (4 Blätter, für starke LRS)</option>
            <option value="worterarbeitung">Worterarbeitung (Wortbild/-klang/-bedeutung)</option>
            <option value="luecken">Lückendiktat (*Zielwort* in Sternchen)</option>
            <option value="korrektur">Fehler korrigieren (*falsch|richtig*)</option>
        </select>
        <div id="sy-serie-wrap">
            <label style="margin-top:12px;">Lernwörter mit Silbentrennung (3–6 Wörter, durch Komma oder Zeilenumbruch getrennt)</label>
            <textarea id="ws-woerter" placeholder="Na-se, Ro-se, So-fa, Li-mo, To-ma-te">Na-se, Ro-se, So-fa, Li-mo, To-ma-te</textarea>
            <p class="beschreibung" style="margin:6px 0 0;">Silben mit Bindestrich trennen. Wörter ohne Bindestrich werden automatisch getrennt – bitte kurz prüfen. Es entstehen vier Blätter: Wörter kennenlernen · Silben-Puzzle · Wort-Detektiv · Ich schreibe meine Wörter.</p>
            <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center; margin-top:10px;">
                <button class="btn sekundaer klein" onclick="ws_ausThema()"><i class="fa-solid fa-shuffle"></i> 5 Wörter aus dem gewählten Thema vorschlagen</button>
                <span style="font-size:13px; color:#7c8a94; font-weight:800;">oder Fehlerwörter aus der Förderkartei:</span>
                <select id="ws-kt-kind" style="width:auto; padding:5px 10px; font-size:13px;"></select>
                <button class="btn sekundaer klein" onclick="ws_ausKartei()"><i class="fa-solid fa-box-archive"></i> übernehmen</button>
            </div>
        </div>
        <div id="sy-worterarbeitung-wrap">
            <div class="zeile zwei">
                <div>
                    <label>Wort</label>
                    <input type="text" id="sy-wort" placeholder="z.B. schnell">
                </div>
                <div>
                    <label>Wortart</label>
                    <select id="sy-wortart">
                        <option value="Adjektiv">Adjektiv</option>
                        <option value="Nomen">Nomen</option>
                        <option value="Verb">Verb</option>
                        <option value="Präposition">Präposition</option>
                        <option value="Pronomen">Pronomen</option>
                    </select>
                </div>
            </div>
            <label>Bedeutungsfrage — 3 Auswahlmöglichkeiten, kommagetrennt (die erste ist NICHT automatisch richtig — Häkchen setzt du beim Ausdrucken selbst)</label>
            <input type="text" id="sy-bedeutung-optionen" placeholder="z.B. eine Schnecke, ein Rennauto, ein Stein">
        </div>
        <div id="sy-luecken-hinweis">
            <label>Sätze (ein Satz pro Zeile, Zielwort in *Sternchen*)</label>
            <textarea id="sy-saetze" placeholder="Der *Hund* bellt laut.&#10;Ich *fahre* mit dem Rad.&#10;Die *Sonne* scheint hell." style="min-height:120px;"></textarea>
        </div>
        <button class="btn" onclick="erstelleSymptom()"><i class="fa-solid fa-wand-magic-sparkles"></i> Arbeitsblatt erstellen</button>
    </div>
    <div class="ausgabe-aktionen" id="akt-symptom" style="display:none;">
        <button class="btn sekundaer klein" onclick="sy_loesungAn = !sy_loesungAn; sy_neuZeichnen();"><i class="fa-solid fa-eye"></i> Lösung ein/aus</button>
        <button class="btn klein" onclick="window.print()"><i class="fa-solid fa-print"></i> Drucken</button>
    </div>
    <div class="blatt" id="ausgabe-symptom" style="display:none;">
        <div class="blatt-kopf">
            <div class="autor-zeile">Leuchtturm · Symptomtraining</div>
            <h3 id="sy-titel">Lückendiktat</h3>
        </div>
        <div class="blatt-koerper">
            <div class="blatt-namenszeile"><span>Name:</span><span>Datum:</span></div>
            <p class="anweisung" id="sy-anweisung">Fülle die Lücken mit dem richtigen Wort!</p>
            <div class="luecken-text" id="sy-text"></div>
            <div class="blatt-fusszeile">Leuchtturm &middot; Symptomtraining</div>
        </div>
    </div>

    <div id="ausgabe-serie" style="display:none;">
        <div class="ws-werkzeug">
            <div class="ws-blattwahl">
                <strong style="font-size:13px; color:var(--nacht);">Blätter:</strong>
                <span id="ws-wahl-liste" class="ws-blattwahl"></span>
                <button class="btn klein" style="background:#7c8a94;" onclick="ws_wahlSetzen('alle')">Alle</button>
                <button class="btn klein" style="background:#7c8a94;" onclick="ws_wahlSetzen('grund')">Grundserie 1–4</button>
            </div>
            <div class="ws-knoepfe">
                <button class="btn sekundaer klein" onclick="ws_neuMischen()"><i class="fa-solid fa-shuffle"></i> Neu mischen</button>
                <button class="btn sekundaer klein" onclick="ws_speichernOeffnen()"><i class="fa-solid fa-folder-plus"></i> In Materialien speichern</button>
                <button class="btn klein" onclick="ws_drucken()"><i class="fa-solid fa-print"></i> Drucken / PDF</button>
            </div>
            <div class="ws-tipp"><i class="fa-solid fa-pen"></i> Alles auf den Blättern ist bearbeitbar: einfach in einen Text klicken und tippen. Für andere Lernwörter oben die Wortliste ändern und neu erstellen.</div>

            <div class="ws-speichern" id="ws-speichern" style="display:none;">
                <div class="zeile zwei">
                    <div>
                        <label>Titel</label>
                        <input type="text" id="ws-sp-titel">
                    </div>
                    <div>
                        <label>Ordner</label>
                        <input type="text" id="ws-sp-ordner" list="ws-ordner-liste" value="Worterarbeitung">
                        <datalist id="ws-ordner-liste">
                            <?php foreach ($lrsOrdner as $o): ?>
                                <option value="<?= htmlspecialchars($o) ?>">
                            <?php endforeach; ?>
                        </datalist>
                    </div>
                </div>
                <div class="zeile zwei" style="margin-top:10px;">
                    <div>
                        <label>Klassenstufe</label>
                        <select id="ws-sp-klasse">
                            <option value="alle">Alle Klassen</option>
                            <?php for ($k = 1; $k <= 8; $k++): ?>
                                <option value="<?= $k ?>">Klasse <?= $k ?></option>
                            <?php endfor; ?>
                        </select>
                    </div>
                    <div>
                        <label>Direkt einem Trainingsheft zuweisen (optional)</label>
                        <select id="ws-sp-kind">
                            <option value="">— keinem Trainingsheft —</option>
                            <?php foreach ($lrsKinder as $code): ?>
                                <option value="<?= htmlspecialchars($code) ?>"><?= htmlspecialchars($code) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <p class="ws-tipp" style="margin:10px 0 0;">Gespeichert werden die oben angehakten Blätter als ein PDF – mit allen Änderungen, die du auf den Blättern gemacht hast. Funktionsbereich: Symptomtraining.</p>
                <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-top:10px;">
                    <button class="btn klein" id="ws-sp-knopf" onclick="ws_speichern()"><i class="fa-solid fa-floppy-disk"></i> Speichern</button>
                    <button class="btn klein" style="background:#999;" onclick="document.getElementById('ws-speichern').style.display='none'">Abbrechen</button>
                    <span id="ws-sp-status" style="font-size:13px; font-weight:800;"></span>
                </div>
            </div>
        </div>
        <div class="ws-blaetter" id="ws-blaetter"></div>
    </div>
</div>

<div class="bereich" id="bereich-plan">
    <div class="karte fp-karte">
        <div class="fp-kopf">
            <div>
                <h2 class="titel">Förderplan</h2>
                <p class="beschreibung">In drei Schritten zum fertigen Förderpaket. Tipp: Im Gutachten führt der Knopf „Förderplan im Generator öffnen“ direkt hierher – dann ist alles schon vorausgewählt.</p>
            </div>
            <a class="btn sekundaer klein" href="gutachten.php" target="_blank"><i class="fa-solid fa-file-signature"></i> Zum Gutachten</a>
        </div>
        <div id="fp-herkunft"></div>

        <section class="fp-schritt">
            <div class="fp-nr">1</div>
            <div class="fp-teil">
                <div class="fp-titelzeile"><h3>Funktionsbereiche</h3><span class="fp-zaehler" id="fp-n-f"></span></div>
                <div class="fp-gruppen" id="fp-funktionen"></div>
            </div>
        </section>

        <section class="fp-schritt">
            <div class="fp-nr">2</div>
            <div class="fp-teil">
                <div class="fp-titelzeile"><h3>Rechtschreib-Schwerpunkte</h3><span class="fp-zaehler" id="fp-n-r"></span></div>
                <div class="fp-raster" id="fp-rs"></div>
            </div>
        </section>

        <section class="fp-schritt">
            <div class="fp-nr">3</div>
            <div class="fp-teil">
                <div class="fp-titelzeile"><h3>Paket zusammenstellen</h3></div>
                <div class="fp-optionen">
                    <div>
                        <div class="fp-label">Blätter je Bereich</div>
                        <div class="fp-segment" id="fp-anzahl-knoepfe">
                            <button type="button" data-wert="1">1</button><button type="button" data-wert="2" class="an">2</button><button type="button" data-wert="3">3</button>
                        </div>
                        <select id="fp-anzahl" hidden><option value="1">1</option><option value="2" selected>2</option><option value="3">3</option></select>
                    </div>
                    <div>
                        <div class="fp-label">Eigene Fehlerwörter (Kürzel)</div>
                        <select id="fp-kind" class="fp-select"></select>
                    </div>
                    <div class="fp-extras">
                        <div class="fp-label">Dazu</div>
                        <label class="fp-chip klein an"><input type="checkbox" id="fp-uebersicht" checked><span class="fp-chip-text"><i class="fa-solid fa-clipboard-list"></i> Übersicht für dich</span></label>
                        <label class="fp-chip klein an"><input type="checkbox" id="fp-kaertchen" checked><span class="fp-chip-text"><i class="fa-solid fa-id-card"></i> Strategie-Kärtchen</span></label>
                        <label class="fp-chip klein an"><input type="checkbox" id="fp-eltern" checked><span class="fp-chip-text"><i class="fa-solid fa-house-chimney"></i> Elternblatt</span></label>
                    </div>
                </div>
            </div>
        </section>

        <div class="fp-leiste">
            <div id="fp-summe"></div>
            <button class="btn" onclick="fs_erstellen('foerderpaket')"><i class="fa-solid fa-wand-magic-sparkles"></i> Förderpaket erstellen</button>
        </div>
    </div>
</div>

<div class="bereich" id="bereich-stunde">
    <div class="karte">
        <h2 class="titel">Stunde zusammenstellen</h2>
        <p class="beschreibung">Eine komplette Fördereinheit nach dem AFS-Aufbau: Aufmerksamkeit zum Einstieg · Funktionstraining · Symptomtraining · Abschluss – dazu dein Ablaufplan mit Feldern für den Lernverlauf.</p>
        <div class="zeile drei">
            <div><label>Kind (Kürzel, optional)</label><select id="std-kind"></select></div>
            <div><label>Dauer der Stunde</label><div style="display:flex; gap:8px;"><select id="std-dauer" onchange="std_dauerWechsel()" style="flex:1;"><option value="20">20 Minuten</option><option value="25">25 Minuten</option><option value="30">30 Minuten</option><option value="35">35 Minuten</option><option value="40" selected>40 Minuten</option><option value="45">45 Minuten</option><option value="50">50 Minuten</option><option value="60">60 Minuten</option><option value="75">75 Minuten</option><option value="90">90 Minuten</option><option value="eigen">andere Dauer …</option></select><input type="number" id="std-dauer-eigen" min="10" max="180" step="5" value="40" style="display:none; width:90px;" onchange="std_dauerWechsel()" title="Minuten"></div></div>
            <div><label>Aufmerksamkeit (Einstieg)</label><select id="std-aufm"></select></div>
        </div>
        <div class="zeile zwei" style="margin-top:12px;">
            <div><label>Klassenstufe</label><select id="std-klasse"><option value="1">Klasse 1</option><option value="2">Klasse 2</option><option value="3">Klasse 3</option><option value="4">Klasse 4</option><option value="5">Klasse 5</option><option value="6">Klasse 6</option><option value="7">Klasse 7</option><option value="8">Klasse 8</option></select></div>
            <div><label>Schwierigkeit</label><select id="std-schwierigkeit"><option value="leicht">leicht</option><option value="mittel">mittel</option><option value="schwer">schwer</option></select></div>
        </div>
        <div class="zeile zwei" style="margin-top:12px;">
            <div><label>Funktionstraining</label><select id="std-funktion"></select></div>
            <div><label>Blatt</label><select id="std-funktion-blatt"></select></div>
        </div>
        <div class="zeile zwei" style="margin-top:12px;">
            <div><label>Symptomtraining</label><select id="std-symptom"></select></div>
            <div><label>Blatt</label><select id="std-symptom-blatt"></select></div>
        </div>
        <p class="beschreibung" id="std-hinweis" style="margin:6px 0 0;"></p>
        <label style="margin-top:12px;">Dazu</label>
        <div class="fp-wahl">
            <label><input type="checkbox" id="std-plan" checked> Ablaufplan (für dich)</label>
            <label><input type="checkbox" id="std-rueck" checked> Stunden-Rückblick fürs Kind (Kl. 1–4 kindgerecht, ab Kl. 5 Reflexion)</label>
            <label><input type="checkbox" id="std-eltern"> Elternblatt mitgeben</label>
        </div>
        <button class="btn" onclick="fs_erstellen('stunde')"><i class="fa-solid fa-layer-group"></i> Stunde zusammenstellen</button>
    </div>
</div>

<div class="bereich" id="bereich-lesen">
    <div class="karte">
        <h2 class="titel">Lesetexte &amp; Test-Diktate</h2>
        <p class="beschreibung">Lesetexte für Klasse 1–8 mit wählbaren Aufgaben – und Test-Diktate als Grundlage für deine Gutachten.</p>
        <label>Was möchtest du erstellen?</label>
        <select id="ld-typ"></select>
        <button class="btn" onclick="erstelleLesen()"><i class="fa-solid fa-wand-magic-sparkles"></i> Erstellen</button>
    </div>
</div>

<div class="bereich" id="bereich-extras">
    <div class="karte">
        <h2 class="titel">Extras</h2>
        <p class="beschreibung">Silbentexte zum Lesen, Strategie-Kärtchen fürs Mäppchen, Belohnungspass und Elternblatt.</p>
        <label>Was möchtest du erstellen?</label>
        <select id="ex-typ"></select>
        <button class="btn" onclick="erstelleExtras()"><i class="fa-solid fa-wand-magic-sparkles"></i> Erstellen</button>
    </div>
</div>

<!-- Gemeinsamer Dialog: aktuelles Blatt als PDF in den Materialien speichern -->
<div class="mat-dialog-hg" id="mat-dialog" style="display:none;" onclick="if (event.target === this) mat_schliessen()">
    <div class="mat-dialog" role="dialog" aria-modal="true" aria-labelledby="mat-dialog-titel">
        <h2 id="mat-dialog-titel"><i class="fa-solid fa-folder-plus"></i> In Materialien speichern</h2>
        <p class="mat-bereich">Funktionsbereich: <span id="mat-bereich-text"></span></p>

        <label for="mat-titel">Titel</label>
        <input type="text" id="mat-titel">

        <div class="zeile zwei">
            <div>
                <label for="mat-ordner">Ordner</label>
                <input type="text" id="mat-ordner" list="ws-ordner-liste">
            </div>
            <div>
                <label for="mat-klasse">Klassenstufe</label>
                <select id="mat-klasse">
                    <option value="alle">Alle Klassen</option>
                    <?php for ($k = 1; $k <= 8; $k++): ?>
                        <option value="<?= $k ?>">Klasse <?= $k ?></option>
                    <?php endfor; ?>
                </select>
            </div>
        </div>

        <label for="mat-kind">Direkt einem Trainingsheft zuweisen (optional)</label>
        <select id="mat-kind">
            <option value="">— keinem Trainingsheft —</option>
            <?php foreach ($lrsKinder as $code): ?>
                <option value="<?= htmlspecialchars($code) ?>"><?= htmlspecialchars($code) ?></option>
            <?php endforeach; ?>
        </select>

        <p class="ws-tipp" style="margin:12px 0 0;">Gespeichert wird das Blatt so, wie du es gerade siehst – mit allen Änderungen. Vorlese-Knöpfe werden im PDF weggelassen.</p>

        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-top:14px;">
            <button class="btn klein" id="mat-knopf" onclick="mat_speichern()"><i class="fa-solid fa-floppy-disk"></i> Speichern</button>
            <button class="btn klein" style="background:#999;" onclick="mat_schliessen()">Schließen</button>
            <span id="mat-status" style="font-size:13px; font-weight:800;"></span>
        </div>
    </div>
</div>

<div class="bereich" id="bereich-koerper">
    <div class="karte">
        <h2 class="titel">Körperschema</h2>
        <p class="beschreibung">Rechts/Links-Anweisungen zum Zeigen oder Ausführen.</p>
        <label>Aufgaben-Typ</label>
        <select id="ks-typ">
            <option value="zeigen">Zeigen und Benennen</option>
            <option value="bewegung">Bewegungen ausführen</option>
        </select>
        <button class="btn" onclick="erstelleKoerper()"><i class="fa-solid fa-wand-magic-sparkles"></i> Arbeitsblatt erstellen</button>
    </div>
    <div class="ausgabe-aktionen" id="akt-koerper" style="display:none;">
        <button class="btn klein" onclick="window.print()"><i class="fa-solid fa-print"></i> Drucken</button>
    </div>
    <div class="blatt" id="ausgabe-koerper" style="display:none;">
        <div class="blatt-kopf">
            <div class="autor-zeile">Leuchtturm · Körperschema</div>
            <h3 id="ks-titel">Rechts und Links erkennen</h3>
        </div>
        <div class="blatt-koerper">
            <div class="blatt-namenszeile"><span>Name:</span><span>Datum:</span></div>
            <p class="anweisung" id="ks-anweisung"></p>
            <ol id="ks-liste" style="font-size:16px; line-height:2.4; padding-left:24px;"></ol>
            <div class="blatt-fusszeile">Leuchtturm &middot; Körperschema</div>
        </div>
    </div>
</div>

<div class="bereich" id="bereich-raum">
    <div class="karte">
        <h2 class="titel">Raumorientierung</h2>
        <p class="beschreibung">Ein Tier-Symbol erscheint zeilenweise gespiegelt oder normal — zähle, wie oft es in welche Richtung schaut.</p>
        <button class="btn" onclick="erstelleRaum()"><i class="fa-solid fa-wand-magic-sparkles"></i> Arbeitsblatt erstellen</button>
    </div>
    <div class="ausgabe-aktionen" id="akt-raum" style="display:none;">
        <button class="btn klein" onclick="window.print()"><i class="fa-solid fa-print"></i> Drucken</button>
    </div>
    <div class="blatt" id="ausgabe-raum" style="display:none;">
        <div class="blatt-kopf">
            <div class="autor-zeile">Leuchtturm · Raumorientierung</div>
            <h3>Wer springt denn da?</h3>
        </div>
        <div class="blatt-koerper">
            <div class="blatt-namenszeile"><span>Name:</span><span>Datum:</span></div>
            <div id="raum-gitter"></div>
            <p style="font-weight:600; margin-top:26px;">Wieviele Tiere schauen nach rechts? <span style="border-bottom:1.5px solid #999; padding:0 40px;">&nbsp;</span></p>
            <p style="font-weight:600;">Wieviele Tiere schauen nach links? <span style="border-bottom:1.5px solid #999; padding:0 40px;">&nbsp;</span></p>
            <div class="blatt-fusszeile">Leuchtturm &middot; Raumorientierung</div>
        </div>
    </div>
</div>

</div>

<script src="rs-einordnung.js"></script>
<script src="bilder.js"></script>
<script>

function zufallsZahl(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }
function zufallsElement(arr){ return arr[zufallsZahl(0, arr.length - 1)]; }
function mische(arr){
    const kopie = [...arr];
    for (let i = kopie.length - 1; i > 0; i--){
        const j = zufallsZahl(0, i);
        [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
    }
    return kopie;
}

const TIER_ICONS = {
    frosch: `<svg viewBox="0 0 100 100" width="56" height="56"><ellipse cx="50" cy="60" rx="35" ry="26" fill="#6cbf4b"/><circle cx="30" cy="35" r="12" fill="#6cbf4b"/><circle cx="70" cy="35" r="12" fill="#6cbf4b"/><circle cx="30" cy="33" r="6" fill="#fff"/><circle cx="70" cy="33" r="6" fill="#fff"/><circle cx="30" cy="33" r="3" fill="#222"/><circle cx="70" cy="33" r="3" fill="#222"/><path d="M30 68 Q50 78 70 68" stroke="#2f7a2f" stroke-width="3" fill="none"/></svg>`,
    baer: `<svg viewBox="0 0 100 100" width="56" height="56"><circle cx="50" cy="55" r="32" fill="#7a5230"/><circle cx="26" cy="25" r="11" fill="#7a5230"/><circle cx="74" cy="25" r="11" fill="#7a5230"/><ellipse cx="50" cy="62" rx="14" ry="11" fill="#c99a6c"/><circle cx="38" cy="48" r="4" fill="#222"/><circle cx="62" cy="48" r="4" fill="#222"/><circle cx="50" cy="60" r="3" fill="#222"/></svg>`,
    biene: `<svg viewBox="0 0 100 100" width="56" height="56"><ellipse cx="26" cy="42" rx="16" ry="12" fill="#fff" opacity="0.7"/><ellipse cx="74" cy="42" rx="16" ry="12" fill="#fff" opacity="0.7"/><ellipse cx="50" cy="58" rx="30" ry="22" fill="#f4c430"/><rect x="24" y="46" width="52" height="8" fill="#222"/><rect x="24" y="62" width="52" height="8" fill="#222"/><circle cx="50" cy="32" r="12" fill="#222"/></svg>`,
    panda: `<svg viewBox="0 0 100 100" width="56" height="56"><circle cx="50" cy="55" r="32" fill="#fff"/><circle cx="26" cy="24" r="10" fill="#222"/><circle cx="74" cy="24" r="10" fill="#222"/><ellipse cx="35" cy="45" rx="9" ry="12" fill="#222"/><ellipse cx="65" cy="45" rx="9" ry="12" fill="#222"/><circle cx="35" cy="47" r="3" fill="#fff"/><circle cx="65" cy="47" r="3" fill="#fff"/><ellipse cx="50" cy="62" rx="6" ry="4" fill="#222"/></svg>`,
    schildkroete: `<svg viewBox="0 0 100 100" width="56" height="56"><ellipse cx="45" cy="55" rx="32" ry="25" fill="#7fae4a"/><circle cx="34" cy="48" r="7" fill="#6a9b3a"/><circle cx="56" cy="48" r="7" fill="#6a9b3a"/><circle cx="45" cy="62" r="7" fill="#6a9b3a"/><circle cx="80" cy="52" r="10" fill="#8fc95c"/><circle cx="84" cy="49" r="2" fill="#222"/></svg>`,
    schlange: `<svg viewBox="0 0 100 100" width="56" height="56"><path d="M12 72 Q28 32 48 55 T85 38" stroke="#4a9d5e" stroke-width="15" fill="none" stroke-linecap="round"/><circle cx="85" cy="38" r="10" fill="#4a9d5e"/><circle cx="88" cy="35" r="2" fill="#222"/></svg>`,
    affe: `<svg viewBox="0 0 100 100" width="56" height="56"><circle cx="50" cy="55" r="30" fill="#8a5a3a"/><circle cx="22" cy="45" r="10" fill="#8a5a3a"/><circle cx="78" cy="45" r="10" fill="#8a5a3a"/><ellipse cx="50" cy="60" rx="18" ry="16" fill="#e0b88a"/><circle cx="42" cy="55" r="3" fill="#222"/><circle cx="58" cy="55" r="3" fill="#222"/><ellipse cx="50" cy="66" rx="6" ry="3" fill="#7a3f1f"/></svg>`,
    vogel: `<svg viewBox="0 0 100 100" width="56" height="56"><ellipse cx="48" cy="55" rx="26" ry="22" fill="#4f96e8"/><path d="M48 55 L78 48 L78 62 Z" fill="#4f96e8"/><circle cx="34" cy="45" r="5" fill="#222"/><path d="M16 50 L30 45 L30 55 Z" fill="#f0a020"/></svg>`,
    fisch: `<svg viewBox="0 0 100 100" width="56" height="56"><ellipse cx="42" cy="55" rx="30" ry="20" fill="#f0883e"/><path d="M72 55 L92 40 L92 70 Z" fill="#f0883e"/><circle cx="26" cy="50" r="4" fill="#222"/><path d="M38 40 Q45 30 55 38" stroke="#d9662a" stroke-width="4" fill="none"/></svg>`,
    katze: `<svg viewBox="0 0 100 100" width="56" height="56"><circle cx="50" cy="58" r="28" fill="#e8a33d"/><path d="M25 40 L32 18 L44 38 Z" fill="#e8a33d"/><path d="M75 40 L68 18 L56 38 Z" fill="#e8a33d"/><circle cx="40" cy="55" r="4" fill="#222"/><circle cx="60" cy="55" r="4" fill="#222"/><ellipse cx="50" cy="66" rx="4" ry="3" fill="#c06"/></svg>`,
    hund: `<svg viewBox="0 0 100 100" width="56" height="56"><circle cx="50" cy="58" r="28" fill="#c98a4b"/><ellipse cx="20" cy="45" rx="10" ry="18" fill="#a56a2f"/><ellipse cx="80" cy="45" rx="10" ry="18" fill="#a56a2f"/><circle cx="40" cy="55" r="4" fill="#222"/><circle cx="60" cy="55" r="4" fill="#222"/><ellipse cx="50" cy="68" rx="6" ry="4" fill="#222"/></svg>`,
    hase: `<svg viewBox="0 0 100 100" width="56" height="56"><ellipse cx="50" cy="62" rx="26" ry="22" fill="#e8e0d0"/><ellipse cx="35" cy="18" rx="8" ry="24" fill="#e8e0d0"/><ellipse cx="65" cy="18" rx="8" ry="24" fill="#e8e0d0"/><circle cx="40" cy="58" r="3" fill="#222"/><circle cx="60" cy="58" r="3" fill="#222"/><ellipse cx="50" cy="68" rx="4" ry="3" fill="#e8809a"/></svg>`,
    schmetterling: `<svg viewBox="0 0 100 100" width="56" height="56"><ellipse cx="30" cy="35" rx="20" ry="16" fill="#e05fa0" transform="rotate(-20 30 35)"/><ellipse cx="70" cy="35" rx="20" ry="16" fill="#e05fa0" transform="rotate(20 70 35)"/><ellipse cx="30" cy="65" rx="16" ry="13" fill="#f0a0c8" transform="rotate(20 30 65)"/><ellipse cx="70" cy="65" rx="16" ry="13" fill="#f0a0c8" transform="rotate(-20 70 65)"/><rect x="47" y="25" width="6" height="50" rx="3" fill="#333"/></svg>`,
    schnecke: `<svg viewBox="0 0 100 100" width="56" height="56"><circle cx="62" cy="42" r="20" fill="#c98a4b"/><path d="M62 42 m-12,0 a12,12 0 1,1 24,0 a8,8 0 1,1 -16,0 a4,4 0 1,1 8,0" fill="none" stroke="#8a5a2f" stroke-width="2"/><path d="M15 75 Q30 55 55 62 Q70 66 78 58" stroke="#7fae4a" stroke-width="14" fill="none" stroke-linecap="round"/></svg>`,
    pinguin: `<svg viewBox="0 0 100 100" width="56" height="56"><ellipse cx="50" cy="58" rx="24" ry="30" fill="#222"/><ellipse cx="50" cy="62" rx="14" ry="20" fill="#fff"/><path d="M42 42 L50 50 L58 42 Z" fill="#f0a020"/><circle cx="43" cy="35" r="3" fill="#fff"/><circle cx="57" cy="35" r="3" fill="#fff"/></svg>`
};

function tierBild(t){ return TIER_ICONS[t.icon] || ""; }

const TIER_BANK = [
    {wort:"Frosch", icon:"frosch"}, {wort:"Bär", icon:"baer"}, {wort:"Biene", icon:"biene"},
    {wort:"Panda", icon:"panda"}, {wort:"Schildkröte", icon:"schildkroete"}, {wort:"Schlange", icon:"schlange"},
    {wort:"Affe", icon:"affe"}, {wort:"Vogel", icon:"vogel"}, {wort:"Fisch", icon:"fisch"},
    {wort:"Katze", icon:"katze"}, {wort:"Hund", icon:"hund"}, {wort:"Hase", icon:"hase"},
    {wort:"Schmetterling", icon:"schmetterling"}, {wort:"Schnecke", icon:"schnecke"}, {wort:"Pinguin", icon:"pinguin"}
];

const THEMEN = {
    herbst: ["Blatt","Wind","Regen","Ernte","Nebel","Apfel","Igel","Drachen","Pilz","Laub","Wolke","Suppe","Jacke","Stiefel","Schirm","Feuer","Wald","Kürbis","Kastanie","Eichel"],
    tiere: ["Hund","Katze","Pferd","Maus","Vogel","Fisch","Löwe","Bär","Affe","Schaf","Kuh","Ente","Frosch","Spinne","Igel","Hase","Fuchs","Reh","Elefant","Schnecke"],
    schule: ["Heft","Stift","Tafel","Pause","Buch","Schere","Kleber","Ranzen","Pult","Kreide","Ordner","Lineal","Test","Klasse","Lehrer","Freundin","Turnhalle","Radiergummi","Sportplatz","Hausaufgabe"],
    familie: ["Mama","Papa","Oma","Opa","Bruder","Baby","Onkel","Tante","Kind","Eltern","Zuhause","Garten","Küche","Familie","Cousine","Schwester","Wohnung","Haustier","Geschwister","Wohnzimmer"],
    jahreszeiten: ["Frühling","Sommer","Herbst","Winter","Schnee","Sonne","Regen","Blume","Eis","Wärme","Kälte","Ernte","Baden","Nebel","Frost","Schlitten","Gewitter","Regenbogen","Schneemann","Vogelzug"],
    freizeit: ["Smartphone","Freunde","Fußball","Konzert","Kino","Serie","Fahrrad","Playlist","Chatgruppe","Training","Verein","Konsole","Skateboard","Wochenende","Hobby","Nachricht","Kopfhörer","Ausflug","Treffpunkt","Video"],
    beruf: ["Ausbildung","Praktikum","Bewerbung","Zukunft","Beruf","Handwerk","Studium","Interesse","Fähigkeit","Ziel","Zeugnis","Vorstellung","Teamarbeit","Verantwortung","Erfahrung","Betrieb","Karriere","Entscheidung","Talent","Plan"]
};

function liesGlobal(){
    const klasse = parseInt(document.getElementById("g-klasse").value);
    const schwierigkeit = document.getElementById("g-schwierigkeit").value;
    const thema = document.getElementById("g-thema").value;
    const umfang = document.getElementById("g-umfang").value;
    return { klasse, schwierigkeit, thema, umfang };
}

function wortpool(){
    const g = liesGlobal();
    if (g.thema === "eigen"){
        const eigene = document.getElementById("g-eigene-woerter").value.split(",").map(w => w.trim()).filter(Boolean);
        if (eigene.length) return eigene;
    }
    const basis = THEMEN[g.thema] || THEMEN.herbst;
    const maxLaenge = { 1:5, 2:7, 3:9 }[g.klasse] || 99;
    const gefiltert = basis.filter(w => w.length <= maxLaenge);
    return gefiltert.length >= 6 ? gefiltert : basis;
}

function umfangWert(klein, mittel, gross){
    const u = liesGlobal().umfang;
    return u === "klein" ? klein : (u === "gross" ? gross : mittel);
}

document.getElementById("g-thema").addEventListener("change", () => {
    document.getElementById("g-eigen-wrap").style.display = document.getElementById("g-thema").value === "eigen" ? "block" : "none";
});

document.querySelectorAll(".tabs .tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".tabs .tab").forEach(t => t.classList.remove("aktiv"));
        document.querySelectorAll(".bereich").forEach(b => b.classList.remove("aktiv"));
        tab.classList.add("aktiv");
        document.getElementById("bereich-" + tab.dataset.bereich).classList.add("aktiv");
    });
});

function vorlesen(text){
    if (!("speechSynthesis" in window)){ alert("Dein Browser unterstützt leider keine Sprachausgabe."); return; }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "de-DE";
    speechSynthesis.speak(utter);
}

function vorlesenReihe(woerter, pauseMs){
    if (!("speechSynthesis" in window)){ alert("Dein Browser unterstützt leider keine Sprachausgabe."); return; }
    let i = 0;
    function naechstes(){
        if (i >= woerter.length) return;
        const utter = new SpeechSynthesisUtterance(woerter[i]);
        utter.lang = "de-DE";
        utter.onend = () => { i++; setTimeout(naechstes, pauseMs); };
        speechSynthesis.speak(utter);
    }
    naechstes();
}

/* 1. Aufmerksamkeit — 6 Übungstypen */

const SYMBOL_POOL = ["●","■","▲","★","♦","✚","◆","☀"];

function erstelleAufmerksamkeit(){
    const typ = document.getElementById("aufm-typ").value;
    const inhalt = document.getElementById("aufm-inhalt");
    inhalt.innerHTML = "";

    if (typ === "schulte") aufm_schulte(inhalt);
    else if (typ === "symbole") aufm_symbole(inhalt);
    else if (typ === "muster") aufm_muster(inhalt);
    else if (typ === "unterschiede") aufm_unterschiede(inhalt);
    else if (typ === "durchstreichen") aufm_durchstreichen(inhalt);
    else if (typ === "punkte") aufm_punkte(inhalt);

    document.getElementById("ausgabe-aufmerksamkeit").style.display = "block";
    document.getElementById("akt-aufmerksamkeit").style.display = "flex";
}

function aufm_schulte(inhalt){
    const g = liesGlobal();
    const groesse = { leicht:4, mittel:5, schwer:6 }[g.schwierigkeit] + (g.umfang === "gross" ? 1 : (g.umfang === "klein" ? -1 : 0));
    const n = Math.max(3, Math.min(8, groesse));
    const zahlen = mische(Array.from({length: n*n}, (_, i) => i + 1));

    let html = `<div class="schulte" style="grid-template-columns:repeat(${n},1fr);">`;
    zahlen.forEach(z => { html += `<div class="schulte-zelle">${z}</div>`; });
    html += "</div>";
    inhalt.innerHTML = html;

    document.getElementById("aufm-titel").textContent = "Zahlen-Suchbild";
    document.getElementById("aufm-anweisung").textContent = `Suche die Zahlen von 1 bis ${n*n} in der richtigen Reihenfolge und streiche sie durch!`;
}

function aufm_symbole(inhalt){
    const ziel = zufallsElement(SYMBOL_POOL);
    const andere = SYMBOL_POOL.filter(s => s !== ziel);
    const zeilen = umfangWert(6, 9, 12);
    const anzahl = umfangWert(10, 13, 16);

    let treffer = 0;
    let html = '<div class="gitter" style="font-size:26px;">';
    for (let z = 0; z < zeilen; z++){
        html += '<div class="zeile-inhalt">';
        for (let i = 0; i < anzahl; i++){
            const istZiel = zufallsZahl(1,100) <= 25;
            if (istZiel) treffer++;
            html += `<span>${istZiel ? ziel : zufallsElement(andere)}</span>`;
        }
        html += "</div>";
    }
    html += "</div>";
    html += `<div style="margin-top:26px; font-size:16px; font-weight:800;">Wie oft kommt ${ziel} vor? &nbsp; Anzahl: <span style="border-bottom:3px solid var(--nacht); padding:0 30px;">&nbsp;</span></div>`;
    inhalt.innerHTML = html;

    document.getElementById("aufm-titel").textContent = "Symbole zählen";
    document.getElementById("aufm-anweisung").textContent = `Zähle, wie oft das Symbol ${ziel} vorkommt, und schreibe die Anzahl auf!`;
}

function aufm_muster(inhalt){
    const g = liesGlobal();
    const anzahlSymbole = { leicht:2, mittel:3, schwer:3 }[g.schwierigkeit];
    const reihenAnzahl = umfangWert(4, 6, 8);
    const laenge = umfangWert(12, 16, 20);
    const luecken = { leicht:2, mittel:4, schwer:6 }[g.schwierigkeit];

    let html = "";
    for (let r = 0; r < reihenAnzahl; r++){
        const muster = mische(SYMBOL_POOL).slice(0, anzahlSymbole);
        const reihe = Array.from({length: laenge}, (_, i) => muster[i % muster.length]);
        const luekenIndizes = new Set();
        while (luekenIndizes.size < Math.min(luecken, laenge)) luekenIndizes.add(zufallsZahl(2, laenge - 1));

        html += '<div class="zeile-inhalt" style="margin-bottom:18px;">';
        reihe.forEach((s, i) => {
            html += luekenIndizes.has(i) ? '<span style="border:2px dashed #ccc; border-radius:8px; width:36px; height:36px; display:inline-flex; align-items:center; justify-content:center;">&nbsp;</span>' : `<span>${s}</span>`;
        });
        html += "</div>";
    }
    inhalt.innerHTML = `<div class="gitter" style="font-size:26px;">${html}</div>`;

    document.getElementById("aufm-titel").textContent = "Muster fortsetzen";
    document.getElementById("aufm-anweisung").textContent = "Erkenne das Muster und ergänze die fehlenden Symbole!";
}

function aufm_unterschiede(inhalt){
    const g = liesGlobal();
    const laenge = umfangWert(10, 12, 14);
    const paarAnzahl = umfangWert(3, 4, 6);
    const anzahlUnterschiede = { leicht:2, mittel:4, schwer:6 }[g.schwierigkeit];

    let html = "";
    for (let p = 0; p < paarAnzahl; p++){
        const reiheA = Array.from({length: laenge}, () => zufallsElement(SYMBOL_POOL));
        const reiheB = [...reiheA];
        const positionen = new Set();
        while (positionen.size < Math.min(anzahlUnterschiede, laenge)) positionen.add(zufallsZahl(0, laenge - 1));
        positionen.forEach(pos => {
            const andere = SYMBOL_POOL.filter(s => s !== reiheB[pos]);
            reiheB[pos] = zufallsElement(andere);
        });

        html += `<div style="margin-bottom:24px; padding-bottom:20px; border-bottom:1px dashed #ddd;">
            <div class="zeile-inhalt" style="font-size:24px; margin-bottom:8px;">${reiheA.map(s => `<span>${s}</span>`).join("")}</div>
            <div class="zeile-inhalt" style="font-size:24px;">${reiheB.map(s => `<span>${s}</span>`).join("")}</div>
        </div>`;
    }
    inhalt.innerHTML = html;

    document.getElementById("aufm-titel").textContent = "Unterschiede finden";
    document.getElementById("aufm-anweisung").textContent = "Vergleiche jeweils die obere und untere Reihe — kreise die Unterschiede ein!";
}

function aufm_durchstreichen(inhalt){
    const ziel = zufallsElement(SYMBOL_POOL);
    const andere = SYMBOL_POOL.filter(s => s !== ziel);
    const zeilen = umfangWert(8, 11, 15);
    const anzahl = umfangWert(12, 15, 18);

    let html = '<div class="gitter" style="font-size:26px;">';
    for (let z = 0; z < zeilen; z++){
        html += '<div class="zeile-inhalt">';
        for (let i = 0; i < anzahl; i++){
            const istZiel = zufallsZahl(1,100) <= 30;
            html += `<span>${istZiel ? ziel : zufallsElement(andere)}</span>`;
        }
        html += "</div>";
    }
    html += "</div>";
    html += `<div style="margin-top:26px; font-size:16px; font-weight:800;">Start: ______ Uhr &nbsp;&nbsp; Ende: ______ Uhr &nbsp;&nbsp; Gesamtzeit: ______ Minuten</div>`;
    inhalt.innerHTML = html;

    document.getElementById("aufm-titel").textContent = "Ziel-Symbol durchstreichen";
    document.getElementById("aufm-anweisung").textContent = `Streiche so schnell und genau wie möglich alle ${ziel} durch! Miss die Zeit.`;
}

function aufm_punkte(inhalt){
    const anzahl = umfangWert(12, 18, 24);
    const breite = 700, hoehe = 480;
    const spalten = Math.ceil(Math.sqrt(anzahl * (breite/hoehe)));
    const zeilenAnzahl = Math.ceil(anzahl / spalten);
    const zellBreite = breite / spalten, zellHoehe = hoehe / zeilenAnzahl;

    const zellen = [];
    for (let r = 0; r < zeilenAnzahl; r++) for (let c = 0; c < spalten; c++) zellen.push({r,c});
    const gewaehlt = mische(zellen).slice(0, anzahl);

    const punkte = gewaehlt.map(({r,c}) => ({
        x: c * zellBreite + zellBreite/2 + zufallsZahl(-zellBreite*0.2, zellBreite*0.2),
        y: r * zellHoehe + zellHoehe/2 + zufallsZahl(-zellHoehe*0.2, zellHoehe*0.2)
    }));

    let svg = `<svg viewBox="0 0 ${breite} ${hoehe}" style="width:100%; max-width:700px; display:block; margin:0 auto;">`;
    punkte.forEach((p, i) => {
        svg += `<circle cx="${p.x}" cy="${p.y}" r="5" fill="#16324a"/>`;
        svg += `<text x="${p.x+10}" y="${p.y+5}" font-size="16" font-weight="800" fill="#16324a">${i+1}</text>`;
    });
    svg += "</svg>";
    inhalt.innerHTML = svg;

    document.getElementById("aufm-titel").textContent = "Punkte verbinden";
    document.getElementById("aufm-anweisung").textContent = `Verbinde die Punkte von 1 bis ${anzahl} der Reihe nach mit einem Strich!`;
}

/* 2. Optische Differenzierung */
const VERWECHSLER_SETS = { leicht: ["k","w","z","x"], mittel: ["d","p","o","a"], schwer: ["d","p","q"] };

function od_typWechsel(){
    document.getElementById("od-suchbild-wrap").style.display = document.getElementById("od-typ").value === "suchbild" ? "block" : "none";
}

function erstelleOptDiff(){
    const typ = document.getElementById("od-typ").value;
    const inhalt = document.getElementById("od-inhalt");
    inhalt.innerHTML = "";

    if (typ === "bildpaare") od_bildpaare(inhalt);
    else if (typ === "suchbild") od_suchbild(inhalt);
    else if (typ === "wortpaare") od_wortpaare(inhalt);
    else if (typ === "fehlerreihe") od_fehlerreihe(inhalt);

    document.getElementById("ausgabe-optdiff").style.display = "block";
    document.getElementById("akt-optdiff").style.display = "flex";
}

function od_bildpaare(inhalt){
    const anzahlPaare = umfangWert(6, 8, 10);
    const anzahlEinzeln = umfangWert(4, 6, 8);

    const gemischtBank = mische(TIER_BANK);
    const paare = gemischtBank.slice(0, anzahlPaare);
    const einzelne = gemischtBank.slice(anzahlPaare, anzahlPaare + anzahlEinzeln);

    let karten = [...paare, ...paare, ...einzelne];
    karten = mische(karten);

    let html = '<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:26px; font-size:40px; text-align:center;">';
    karten.forEach(k => { html += `<div>${tierBild(k)}</div>`; });
    html += "</div>";
    html += '<p style="margin-top:30px; font-weight:600;">Verbinde die Paare.</p>';

    inhalt.innerHTML = html;
    document.getElementById("od-titel").textContent = "Findest du alle Paare?";
    document.getElementById("od-anweisung").style.display = "none";
}

function od_suchbild(inhalt){
    const g = liesGlobal();
    const ziel = document.getElementById("od-ziel").value.trim() || "b";
    const eigene = document.getElementById("od-verwechsler").value.trim();
    let pool = eigene ? eigene.split(",").map(s => s.trim()).filter(Boolean) : VERWECHSLER_SETS[g.schwierigkeit];
    if (!pool.includes(ziel)) pool = [ziel, ...pool];

    const zeilen = umfangWert(6, 9, 13);
    const anzahl = umfangWert(9, 12, 15);

    let html = '<div class="gitter">';
    for (let z = 0; z < zeilen; z++){
        html += '<div class="zeile-inhalt">';
        for (let i = 0; i < anzahl; i++){
            const treffer = zufallsZahl(1,100) <= 30;
            const andere = pool.filter(p => p !== ziel);
            html += `<span>${treffer ? ziel : zufallsElement(andere.length ? andere : pool)}</span>`;
        }
        html += "</div>";
    }
    html += "</div>";
    inhalt.innerHTML = html;

    document.getElementById("od-titel").textContent = ziel.length > 1 ? `Suchbild — Wort „${ziel}"` : `Suchbild — Buchstabe „${ziel}"`;
    document.getElementById("od-anweisung").textContent = `Kreise alle „${ziel}" ein, die du findest!`;
    document.getElementById("od-anweisung").style.display = "inline-block";
}

function od_wortpaare(inhalt){
    const pool = wortpool();
    const anzahl = umfangWert(8, 12, 16);
    let html = '<table class="paare"><tr><th>#</th><th>Wortpaar</th><th>Gleich oder verschieden?</th></tr>';

    for (let i = 0; i < anzahl; i++){
        const wort = zufallsElement(pool);
        const gleich = zufallsZahl(1,100) <= 50;
        let wort2 = wort;
        if (!gleich && wort.length > 2){
            const pos = zufallsZahl(0, wort.length - 1);
            const buchstaben = wort.split("");
            const ersatz = zufallsElement("abcdefghijklmnopqrstuvwxyz".split("").filter(b => b !== buchstaben[pos].toLowerCase()));
            buchstaben[pos] = ersatz;
            wort2 = buchstaben.join("");
        }
        html += `<tr>
            <td>${i+1}</td>
            <td><span class="wort-btn">${wort}</span> / <span class="wort-btn">${wort2}</span></td>
            <td>◯ gleich &nbsp;&nbsp; ◯ verschieden</td>
        </tr>`;
    }
    html += "</table>";
    inhalt.innerHTML = html;

    document.getElementById("od-titel").textContent = "Wortpaare vergleichen";
    document.getElementById("od-anweisung").textContent = "Vergleiche jedes Wortpaar genau — sind die Wörter gleich oder verschieden?";
    document.getElementById("od-anweisung").style.display = "inline-block";
}

function od_fehlerreihe(inhalt){
    const pool = wortpool();
    const zeilen = umfangWert(5, 7, 10);
    const laenge = umfangWert(6, 8, 10);
    let html = "";

    for (let z = 0; z < zeilen; z++){
        const wort = zufallsElement(pool);
        const fehlerPos = zufallsZahl(0, laenge - 1);
        let html2 = '<div class="zeile-inhalt" style="margin-bottom:16px;">';
        for (let i = 0; i < laenge; i++){
            if (i === fehlerPos && wort.length > 2){
                const buchstaben = wort.split("");
                const pos = zufallsZahl(0, buchstaben.length - 1);
                const ersatz = zufallsElement("abcdefghijklmnopqrstuvwxyz".split("").filter(b => b !== buchstaben[pos].toLowerCase()));
                buchstaben[pos] = ersatz;
                html2 += `<span style="font-size:19px; font-weight:700;">${buchstaben.join("")}</span>`;
            } else {
                html2 += `<span style="font-size:19px; font-weight:700;">${wort}</span>`;
            }
        }
        html2 += "</div>";
        html += html2;
    }
    inhalt.innerHTML = html;

    document.getElementById("od-titel").textContent = "Der Fehler in der Reihe";
    document.getElementById("od-anweisung").textContent = "In jeder Reihe steht einmal ein anderes Wort — kreise es ein!";
    document.getElementById("od-anweisung").style.display = "inline-block";
}

/* 3. Optisches Gedächtnis */
function og_typWechsel(){
    document.getElementById("og-zeit-wrap").style.display = document.getElementById("og-typ").value !== "veraendert" ? "block" : "none";
}

function erstelleOptGed(){
    const typ = document.getElementById("og-typ").value;
    const inhalt = document.getElementById("og-inhalt");
    inhalt.innerHTML = "";

    if (typ === "tierfehlt") og_tierfehlt(inhalt);
    else if (typ === "wortreihe") og_wortreihe(inhalt);
    else if (typ === "formen") og_formen(inhalt);
    else if (typ === "veraendert") og_veraendert(inhalt);

    document.getElementById("ausgabe-optged").style.display = "block";
    document.getElementById("akt-optged").style.display = "flex";
}

function og_tierfehlt(inhalt){
    const anzahl = umfangWert(9, 12, 15);
    const auswahl = mische(TIER_BANK).slice(0, anzahl);
    const fehlendIndex = zufallsZahl(0, auswahl.length - 1);
    const fehlend = auswahl[fehlendIndex];
    const rest = mische(auswahl.filter((_, i) => i !== fehlendIndex));

    const gitterHTML = (liste) => `<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:20px; text-align:center;">${liste.map(t => `<div>${tierBild(t)}</div>`).join("")}</div>`;

    inhalt.innerHTML = `
        <div style="margin-bottom:14px;">${gitterHTML(auswahl)}</div>
        <p style="font-weight:600; margin:26px 0;">Schau dir die Tiere oben genau an. Decke sie dann ab.</p>
        <p style="font-weight:700; margin-bottom:16px;">Welches Tier fehlt?</p>
        <div>${gitterHTML(rest)}</div>
        <p style="margin-top:20px; font-weight:600;">Antwort: <span style="border-bottom:1.5px solid #999; padding:0 60px;">&nbsp;</span></p>
    `;

    document.getElementById("og-titel").textContent = "Schau genau hin.";
}

function og_wortreihe(inhalt){
    const zeit = parseInt(document.getElementById("og-zeit").value) || 30;
    const anzahl = umfangWert(5, 7, 9);
    const pool = wortpool();
    const elemente = mische(pool).slice(0, Math.min(anzahl, pool.length));

    inhalt.innerHTML = `
        <div class="merk-block">
            <h4>${zeit} Sekunden einprägen:</h4>
            <div class="wortliste">${elemente.map(e => `<span>${e}</span>`).join("")}</div>
        </div>
        <div class="merk-block">
            <h4>Jetzt zugedeckt aus dem Gedächtnis aufschreiben:</h4>
            <div class="merk-linien">${elemente.map(() => "<div></div>").join("")}</div>
        </div>`;

    document.getElementById("og-titel").textContent = "Merk dir die Reihe";
}

function og_formen(inhalt){
    const zeit = parseInt(document.getElementById("og-zeit").value) || 30;
    const anzahl = umfangWert(5, 7, 9);
    const elemente = Array.from({length: anzahl}, () => zufallsElement(SYMBOL_POOL));

    inhalt.innerHTML = `
        <div class="merk-block">
            <h4>${zeit} Sekunden einprägen:</h4>
            <div class="wortliste" style="font-size:32px;">${elemente.map(e => `<span>${e}</span>`).join("")}</div>
        </div>
        <div class="merk-block">
            <h4>Jetzt zugedeckt aus dem Gedächtnis in der richtigen Reihenfolge malen:</h4>
            <div style="display:flex; gap:16px; margin-top:12px;">${elemente.map(() => '<div style="width:50px; height:50px; border:2px dashed #ccc; border-radius:10px;"></div>').join("")}</div>
        </div>`;

    document.getElementById("og-titel").textContent = "Formen-Merkspiel";
}

function og_veraendert(inhalt){
    const anzahl = umfangWert(6, 8, 10);
    const original = Array.from({length: anzahl}, () => zufallsElement(SYMBOL_POOL));
    const veraendert = [...original];
    const anzahlAenderungen = { leicht:1, mittel:2, schwer:3 }[liesGlobal().schwierigkeit];
    const positionen = new Set();
    while (positionen.size < Math.min(anzahlAenderungen, anzahl)) positionen.add(zufallsZahl(0, anzahl - 1));
    positionen.forEach(pos => {
        const andere = SYMBOL_POOL.filter(s => s !== veraendert[pos]);
        veraendert[pos] = zufallsElement(andere);
    });

    inhalt.innerHTML = `
        <div class="merk-block">
            <h4>Präge dir diese Reihe gut ein:</h4>
            <div class="wortliste" style="font-size:32px;">${original.map(e => `<span>${e}</span>`).join("")}</div>
        </div>
        <div class="merk-block" style="margin-top:60px;">
            <h4>Diese Reihe hat sich leicht verändert — kreise die Unterschiede ein:</h4>
            <div class="wortliste" style="font-size:32px;">${veraendert.map(e => `<span>${e}</span>`).join("")}</div>
        </div>`;

    document.getElementById("og-titel").textContent = "Was hat sich verändert?";
}

/* 4. Optische Serialität */
function os_typWechsel(){
    document.getElementById("os-zahlen-wrap").style.display = document.getElementById("os-typ").value === "zahlen" ? "block" : "none";
}

function erstelleOptSer(){
    const typ = document.getElementById("os-typ").value;
    const inhalt = document.getElementById("os-inhalt");
    inhalt.innerHTML = "";

    if (typ === "zahlen"){
        const start = parseInt(document.getElementById("os-start").value) || 2;
        const schritt = parseInt(document.getElementById("os-schritt").value) || 2;
        const felder = umfangWert(8, 12, 16);
        const luecken = parseInt(document.getElementById("os-luecken").value) || 4;

        const reihe = Array.from({length: felder}, (_, i) => start + i * schritt);
        const luekenIndizes = new Set();
        while (luekenIndizes.size < Math.min(luecken, felder)) luekenIndizes.add(zufallsZahl(0, felder - 1));

        let html = '<div class="zahlenreihe">';
        reihe.forEach((zahl, i) => { html += luekenIndizes.has(i) ? '<span class="luecke"></span>' : `<span>${zahl}</span>`; });
        html += "</div>";
        inhalt.innerHTML = html;
        document.getElementById("os-titel").textContent = "Zahlenreihen fortsetzen";
        document.getElementById("os-anweisung").textContent = "Fülle die fehlenden Zahlen in der Reihe aus!";

    } else if (typ === "alphabet"){
        const pool = wortpool();
        const anzahl = umfangWert(6, 8, 10);
        const woerter = mische(pool).slice(0, Math.min(anzahl, pool.length));
        const gemischt = mische(woerter);
        let html = '<ul class="sortierliste">';
        gemischt.forEach(w => { html += `<li><span class="nr-box"></span> ${w}</li>`; });
        html += "</ul>";
        inhalt.innerHTML = html;
        document.getElementById("os-titel").textContent = "Wörter alphabetisch sortieren";
        document.getElementById("os-anweisung").textContent = "Nummeriere die Wörter in alphabetischer Reihenfolge!";

    } else if (typ === "anagramm"){
        const pool = wortpool();
        const anzahl = umfangWert(6, 8, 10);
        const woerter = mische(pool).slice(0, Math.min(anzahl, pool.length));
        let html = '<ul class="sortierliste">';
        woerter.forEach(w => {
            const gemischt = mische(w.split("")).join("");
            html += `<li>🔤 <strong style="letter-spacing:3px;">${gemischt.toUpperCase()}</strong> &nbsp;→&nbsp; ______________</li>`;
        });
        html += "</ul>";
        inhalt.innerHTML = html;
        document.getElementById("os-titel").textContent = "Buchstabensalat entwirren";
        document.getElementById("os-anweisung").textContent = "Bringe die Buchstaben in die richtige Reihenfolge!";

    } else if (typ === "alphabetluecken"){
        const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const laenge = umfangWert(10, 14, 18);
        const startIdx = zufallsZahl(0, ALPHABET.length - laenge);
        const reihe = ALPHABET.slice(startIdx, startIdx + laenge);
        const luecken = { leicht:2, mittel:4, schwer:6 }[liesGlobal().schwierigkeit];
        const luekenIndizes = new Set();
        while (luekenIndizes.size < Math.min(luecken, laenge)) luekenIndizes.add(zufallsZahl(0, laenge - 1));

        let html = '<div class="zahlenreihe">';
        reihe.forEach((buchstabe, i) => { html += luekenIndizes.has(i) ? '<span class="luecke"></span>' : `<span>${buchstabe}</span>`; });
        html += "</div>";
        inhalt.innerHTML = html;
        document.getElementById("os-titel").textContent = "Alphabet-Lücken ergänzen";
        document.getElementById("os-anweisung").textContent = "Fülle die fehlenden Buchstaben im Alphabet aus!";
    }

    document.getElementById("ausgabe-optser").style.display = "block";
    document.getElementById("akt-optser").style.display = "flex";
}

/* 5. Akustische Differenzierung */
const PAAR_SETS = {
    bp: [["Bein","Pein"],["Baum","Paum"],["Bach","Pach"],["Bogen","Pogen"],["Ball","Pall"],["Butter","Putter"],["Bild","Pild"],["Beet","Peet"]],
    dt: [["Dach","Tach"],["Dose","Tose"],["Deck","Teck"],["Dorn","Torn"],["Dicht","Ticht"],["Deich","Teich"],["Dose","Tobe"],["Dose","Tolle"]],
    gk: [["Gold","Kold"],["Gasse","Kasse"],["Gabel","Kabel"],["Garten","Karten"],["Gunst","Kunst"],["Geld","Keld"],["Gitter","Kitter"],["Gasse","Kasse"]],
    mn: [["Maus","Naus"],["Mund","Nund"],["Mahl","Nahl"],["Moos","Noos"],["Milch","Nilch"],["Made","Nade"],["Mast","Nast"],["Mund","Bund"]]
};

const REIME_WOERTER = ["Maus","Haus","Baum","Zaum","Hund","Mund","Katze","Tatze","Ball","Fall","Tisch","Fisch","Sonne","Wonne","Blume","Ruhme"];

let ad_paare = [];
let ad_loesungAn = false;
let ad_aktuellerTyp = "minimalpaare";

function ad_typWechsel(){
    document.getElementById("ad-minimalpaare-wrap").style.display = document.getElementById("ad-typ").value === "minimalpaare" ? "block" : "none";
    document.getElementById("ad-hoergenau-wrap").style.display = document.getElementById("ad-typ").value === "hoergenau" ? "block" : "none";
}

function ad_setWechsel(){
    document.getElementById("ad-eigen-wrap").style.display = document.getElementById("ad-set").value === "eigen" ? "block" : "none";
}

function erstelleAkDiff(){
    ad_aktuellerTyp = document.getElementById("ad-typ").value;
    document.getElementById("ausgabe-akdiff").style.display = "block";
    document.getElementById("akt-akdiff").style.display = "flex";

    if (ad_aktuellerTyp === "hoergenau"){
        ad_hoergenau();
        return;
    }

    if (ad_aktuellerTyp === "minimalpaare"){
        const set = document.getElementById("ad-set").value;
        const anzahl = umfangWert(6, 9, 12);
        let quelle;
        if (set === "eigen"){
            const zeilen = document.getElementById("ad-eigen").value.split("\n").map(z => z.trim()).filter(Boolean);
            quelle = zeilen.map(z => z.split(";").map(w => w.trim())).filter(p => p.length === 2);
            if (!quelle.length) quelle = PAAR_SETS.bp;
        } else {
            quelle = PAAR_SETS[set];
        }
        ad_paare = [];
        for (let i = 0; i < anzahl; i++){
            const paar = quelle[i % quelle.length];
            const gehoert = zufallsZahl(0,1) === 0 ? paar[0] : paar[1];
            ad_paare.push({ paar, gehoert });
        }
        document.getElementById("ad-titel").textContent = "Minimalpaare";
        document.getElementById("ad-anweisung").textContent = "Lehrkraft liest EIN Wort aus jeder Zeile vor (🔊 zum Anhören) — Kind markiert, was es gehört hat.";
    } else if (ad_aktuellerTyp === "anlaut"){
        const pool = wortpool();
        const anzahl = umfangWert(6, 9, 12);
        ad_paare = mische(pool).slice(0, Math.min(anzahl, pool.length)).map(w => ({ wort: w, anlaut: w[0].toUpperCase() }));
        document.getElementById("ad-titel").textContent = "Anlaut erkennen";
        document.getElementById("ad-anweisung").textContent = "🔊 anhören und den ersten Laut (Anlaut) des Wortes aufschreiben!";
    } else if (ad_aktuellerTyp === "reime"){
        const anzahl = umfangWert(6, 8, 10);
        ad_paare = [];
        for (let i = 0; i < anzahl; i++){
            const reimtSich = zufallsZahl(1,100) <= 50;
            const w1 = zufallsElement(REIME_WOERTER);
            let w2;
            if (reimtSich){
                const idx = REIME_WOERTER.indexOf(w1);
                w2 = REIME_WOERTER[idx % 2 === 0 ? idx + 1 : idx - 1];
            } else {
                w2 = zufallsElement(REIME_WOERTER.filter(w => w !== w1));
            }
            ad_paare.push({ paar: [w1, w2], reimtSich });
        }
        document.getElementById("ad-titel").textContent = "Reimwörter erkennen";
        document.getElementById("ad-anweisung").textContent = "🔊 beide Wörter anhören — reimen sie sich? Ja oder Nein ankreuzen!";
    }

    ad_neuZeichnen();
}

function ad_hoergenau(){
    const laut1 = (document.getElementById("ad-laut1").value.trim() || "b").toLowerCase();
    const laut2 = (document.getElementById("ad-laut2").value.trim() || "p").toLowerCase();
    const anzahl = umfangWert(10, 14, 18);

    const passend = TIER_BANK.filter(t => t.wort.toLowerCase().includes(laut1) || t.wort.toLowerCase().includes(laut2));
    const distraktoren = TIER_BANK.filter(t => !t.wort.toLowerCase().includes(laut1) && !t.wort.toLowerCase().includes(laut2));

    let auswahl = mische(passend).slice(0, Math.ceil(anzahl * 0.7));
    auswahl = auswahl.concat(mische(distraktoren).slice(0, anzahl - auswahl.length));
    auswahl = mische(auswahl);

    document.getElementById("ad-titel").textContent = "Hör genau hin.";
    document.getElementById("ad-anweisung").innerHTML =
        `Sprich dir die Wörter laut vor. Wo hörst du ein ${laut1.toUpperCase()}/${laut1}? Wo ein ${laut2.toUpperCase()}/${laut2}?<br>Kreise alle Bilder mit ${laut1.toUpperCase()}/${laut1} rot und alle mit ${laut2.toUpperCase()}/${laut2} grün ein.`;

    document.getElementById("ad-inhalt").innerHTML =
        `<div style="display:flex; flex-wrap:wrap; gap:22px;">${auswahl.map(t => `<div>${tierBild(t)}</div>`).join("")}</div>`;
}

function ad_neuZeichnen(){
    if (ad_aktuellerTyp === "hoergenau") return;
    const inhalt = document.getElementById("ad-inhalt");
    let html = "";

    if (ad_aktuellerTyp === "minimalpaare"){
        html = "<table class='paare'><tr><th>#</th><th>Wortpaar</th><th>Anhören</th><th>Kind markiert</th></tr>";
        ad_paare.forEach((eintrag, i) => {
            html += `<tr>
                <td>${i+1}</td>
                <td><span class="wort-btn">${eintrag.paar[0]}</span> / <span class="wort-btn">${eintrag.paar[1]}</span></td>
                <td><button class="btn sekundaer klein" onclick="vorlesen('${eintrag.gehoert}')"><i class="fa-solid fa-volume-high"></i></button></td>
                <td>${ad_loesungAn ? `<span class="loesung">${eintrag.gehoert}</span>` : "◯ ______"}</td>
            </tr>`;
        });
        html += "</table>";
    } else if (ad_aktuellerTyp === "anlaut"){
        html = "<table class='paare'><tr><th>#</th><th>Anhören</th><th>Anlaut</th></tr>";
        ad_paare.forEach((eintrag, i) => {
            html += `<tr>
                <td>${i+1}</td>
                <td><button class="btn sekundaer klein" onclick="vorlesen('${eintrag.wort}')"><i class="fa-solid fa-volume-high"></i></button></td>
                <td>${ad_loesungAn ? `<span class="loesung">${eintrag.anlaut}</span>` : "______"}</td>
            </tr>`;
        });
        html += "</table>";
    } else if (ad_aktuellerTyp === "reime"){
        html = "<table class='paare'><tr><th>#</th><th>Wortpaar</th><th>Anhören</th><th>Reimt sich?</th></tr>";
        ad_paare.forEach((eintrag, i) => {
            html += `<tr>
                <td>${i+1}</td>
                <td><span class="wort-btn">${eintrag.paar[0]}</span> / <span class="wort-btn">${eintrag.paar[1]}</span></td>
                <td><button class="btn sekundaer klein" onclick='vorlesenReihe(${JSON.stringify(eintrag.paar)}, 500)'><i class="fa-solid fa-volume-high"></i></button></td>
                <td>◯ Ja &nbsp;&nbsp; ◯ Nein ${ad_loesungAn ? `<span class="loesung">(${eintrag.reimtSich ? "Ja" : "Nein"})</span>` : ""}</td>
            </tr>`;
        });
        html += "</table>";
    }

    inhalt.innerHTML = html;
}

/* 6. Akustisches Gedächtnis */
function erstelleAkGed(){
    const typ = document.getElementById("akg-typ").value;
    const inhalt = document.getElementById("akg-inhalt");
    inhalt.innerHTML = "";

    if (typ === "geschichte") akg_geschichte(inhalt);
    else if (typ === "wortfolgen") akg_wortfolgen(inhalt);
    else if (typ === "zahlenspanne") akg_zahlenspanne(inhalt);
    else if (typ === "satzgedaechtnis") akg_satzgedaechtnis(inhalt);

    document.getElementById("ausgabe-akged").style.display = "block";
    document.getElementById("akt-akged").style.display = "flex";
}

const GESCHICHTEN_BANK = [
    {
        titel: "Ein Tag am Wochenende",
        saetze: [
            "Am Samstag wacht Ben früh auf, weil die Sonne ins Zimmer scheint.",
            "Er zieht sich an und geht in die Küche.",
            "Dort frühstückt er Müsli mit Milch und trinkt einen Kakao.",
            "Nach dem Frühstück packt er seinen Rucksack mit einer Wasserflasche und einem Apfel.",
            "Dann trifft er sich draußen mit seiner Freundin Mia.",
            "Gemeinsam gehen sie zum Spielplatz.",
            "Sie rutschen, schaukeln und lachen viel.",
            "Später kaufen sie sich beim Bäcker eine Brezel.",
            "Am Nachmittag geht Ben wieder nach Hause.",
            "Er erzählt seiner Mutter von seinem Tag und macht anschließend seine Hausaufgaben."
        ]
    },
    {
        titel: "Der Ausflug in den Zoo",
        saetze: [
            "Am Sonntag fährt Lea mit ihrem Opa in den Zoo.",
            "Zuerst schauen sie sich die Affen an, die wild herumklettern.",
            "Danach gehen sie zu den Elefanten, die gerade gefüttert werden.",
            "Lea findet die kleinen Pinguine am spannendsten.",
            "In der Mittagspause essen sie zusammen ein Eis.",
            "Am Nachmittag sehen sie sich noch die Löwen an.",
            "Zum Schluss kauft Opa Lea ein kleines Stofftier im Souvenirladen.",
            "Müde, aber glücklich fahren sie am Abend wieder nach Hause."
        ]
    },
    {
        titel: "Kuchen backen",
        saetze: [
            "Am Nachmittag will Finn mit seiner Oma einen Kuchen backen.",
            "Zuerst holen sie alle Zutaten aus dem Schrank.",
            "Finn rührt Mehl, Zucker und Eier in einer großen Schüssel zusammen.",
            "Die Oma gießt den Teig vorsichtig in die Backform.",
            "Der Kuchen kommt für 30 Minuten in den Ofen.",
            "Während der Kuchen backt, decken sie gemeinsam den Tisch.",
            "Endlich duftet die ganze Küche nach frischem Kuchen.",
            "Zum Kaffee gibt es den warmen Kuchen mit Sahne."
        ]
    }
];

function akg_geschichte(inhalt){
    const geschichte = zufallsElement(GESCHICHTEN_BANK);
    const nummeriert = geschichte.saetze.map((s, i) => ({ satz: s, nr: i + 1 }));
    const gemischt = mische(nummeriert);

    inhalt.innerHTML = `
        <p style="font-weight:700; margin-bottom:16px;">Geschichte (nur zum Vorlesen): <button class="btn sekundaer klein" onclick='vorlesen(${JSON.stringify(geschichte.saetze.join(" "))})'><i class="fa-solid fa-volume-high"></i></button></p>
        <p style="font-weight:700; margin:24px 0 12px;">Aufgabe: Nummeriere die Sätze von 1–${geschichte.saetze.length}.</p>
        ${gemischt.map(g => `<p style="margin:0 0 8px;">${g.satz} <span style="border:1.5px solid #ccc; border-radius:6px; padding:1px 10px; margin-left:8px;">&nbsp;</span></p><div style="border-bottom:1px dotted #ccc; margin-bottom:14px;"></div>`).join("")}
    `;

    document.getElementById("akg-titel").textContent = "Ich erzähle eine Geschichte.";
    document.getElementById("akg-anweisung").textContent = "Ich lese die Geschichte langsam und deutlich vor. Danach bringst du die Sätze in die richtige Reihenfolge.";
}

function akg_wortfolgen(inhalt){
    const g = liesGlobal();
    const zeilenAnzahl = umfangWert(4, 6, 8);
    const woerterProZeile = { 1:2, 2:3, 3:4, 4:5, 5:5, 6:6, 7:6, 8:7 }[g.klasse] || 5;
    const pool = wortpool();

    let html = "";
    for (let i = 0; i < zeilenAnzahl; i++){
        const reihe = mische(pool).slice(0, Math.min(woerterProZeile, pool.length));
        html += `<div style="margin-bottom:26px;">
            <button class="btn sekundaer klein" onclick='vorlesenReihe(${JSON.stringify(reihe)}, 500)'><i class="fa-solid fa-volume-high"></i> Reihe ${i+1} anhören</button>
            <div class="merk-linien" style="margin-top:10px;">${reihe.map(() => "<div></div>").join("")}</div>
        </div>`;
    }
    inhalt.innerHTML = html;
    document.getElementById("akg-titel").textContent = "Wortfolgen merken";
    document.getElementById("akg-anweisung").textContent = "Auf 🔊 klicken, anhören, dann aus dem Gedächtnis auf die Linien schreiben.";
}

function akg_zahlenspanne(inhalt){
    const g = liesGlobal();
    const zeilenAnzahl = umfangWert(4, 6, 8);
    const ziffernProZeile = { 1:2, 2:3, 3:4, 4:5, 5:5, 6:6, 7:6, 8:7 }[g.klasse] || 5;

    let html = "";
    for (let i = 0; i < zeilenAnzahl; i++){
        const zahlen = Array.from({length: ziffernProZeile}, () => zufallsZahl(0,9));
        html += `<div style="margin-bottom:26px;">
            <button class="btn sekundaer klein" onclick='vorlesenReihe(${JSON.stringify(zahlen.map(String))}, 500)'><i class="fa-solid fa-volume-high"></i> Zahlenreihe ${i+1} anhören</button>
            <div style="border-bottom:2px dotted #ccc; height:34px; margin-top:12px;"></div>
        </div>`;
    }
    inhalt.innerHTML = html;
    document.getElementById("akg-titel").textContent = "Zahlenspanne";
    document.getElementById("akg-anweisung").textContent = "Zahlenreihe anhören und in derselben Reihenfolge aufschreiben.";
}

const BEISPIELSAETZE = [
    "Der kleine Hund läuft schnell über die Wiese.",
    "Am Morgen scheint die Sonne durch das Fenster.",
    "Meine Schwester malt ein buntes Bild von unserem Haus.",
    "Im Herbst fallen die bunten Blätter von den Bäumen.",
    "Wir fahren am Samstag mit dem Zug zu Oma."
];

function akg_satzgedaechtnis(inhalt){
    const anzahl = umfangWert(3, 4, 6);
    let html = "";
    for (let i = 0; i < anzahl; i++){
        const satz = BEISPIELSAETZE[i % BEISPIELSAETZE.length];
        html += `<div style="margin-bottom:30px;">
            <button class="btn sekundaer klein" onclick="vorlesen('${satz}')"><i class="fa-solid fa-volume-high"></i> Satz ${i+1} anhören</button>
            <div style="border-bottom:2px dotted #ccc; height:34px; margin-top:12px;"></div>
        </div>`;
    }
    inhalt.innerHTML = html;
    document.getElementById("akg-titel").textContent = "Satzgedächtnis";
    document.getElementById("akg-anweisung").textContent = "Satz anhören und so genau wie möglich aus dem Gedächtnis aufschreiben.";
}

/* 7. Akustische Serialität */
let aks_runden = [];
let as_loesungAn = false;
let aks_aktuellerTyp = "gehoert";

const LOGISCHE_REIHEN = [
    ["Aufwachen","Zähne putzen","Frühstücken","Anziehen","Zur Schule gehen"],
    ["Teig anrühren","In die Form füllen","Backen","Abkühlen lassen","Essen"],
    ["Samen säen","Gießen","Warten","Blume wächst","Blühen"],
    ["Brief schreiben","Umschlag zukleben","Briefmarke aufkleben","Zum Briefkasten bringen"]
];

function erstelleAkSer(){
    aks_aktuellerTyp = document.getElementById("aks-typ").value;
    const g = liesGlobal();

    if (aks_aktuellerTyp === "richtigereihenfolge"){
        aks_richtigeReihenfolge();
        document.getElementById("ausgabe-akser").style.display = "block";
        document.getElementById("akt-akser").style.display = "flex";
        return;
    }

    if (aks_aktuellerTyp === "gehoert"){
        const anzahlRunden = umfangWert(2, 3, 4);
        const woerterProRunde = { 1:3, 2:4, 3:5, 4:6, 5:6, 6:7, 7:7, 8:8 }[g.klasse] || 6;
        const pool = wortpool();
        aks_runden = [];
        for (let i = 0; i < anzahlRunden; i++){
            const angezeigt = mische(pool).slice(0, Math.min(woerterProRunde, pool.length));
            const gehoerteReihenfolge = mische(angezeigt);
            aks_runden.push({ angezeigt, gehoerteReihenfolge });
        }
        document.getElementById("aks-titel").textContent = "Gehörte Reihenfolge";
        document.getElementById("aks-anweisung").textContent = "🔊 klicken und die Wörter unten in der gehörten Reihenfolge nummerieren (1, 2, 3 ...).";
    document.getElementById("aks-anweisung").style.display = "inline-block";
    } else if (aks_aktuellerTyp === "logisch"){
        const anzahlRunden = umfangWert(2, 3, 4);
        aks_runden = [];
        for (let i = 0; i < anzahlRunden; i++){
            const richtig = LOGISCHE_REIHEN[i % LOGISCHE_REIHEN.length];
            const angezeigt = mische(richtig);
            aks_runden.push({ angezeigt, gehoerteReihenfolge: richtig });
        }
        document.getElementById("aks-titel").textContent = "Logische Reihenfolge";
        document.getElementById("aks-anweisung").textContent = "Bringe die Schritte in die richtige (logische) Reihenfolge — nummeriere sie!";
    document.getElementById("aks-anweisung").style.display = "inline-block";
    }

    document.getElementById("ausgabe-akser").style.display = "block";
    document.getElementById("akt-akser").style.display = "flex";
    as_neuZeichnen();
}

const FARB_BLOBS = [
    {name:"rot", farbe:"#e74c3c"}, {name:"blau", farbe:"#2e6fd1"}, {name:"grün", farbe:"#4a9d5e"},
    {name:"lila", farbe:"#9b59d0"}, {name:"gelb", farbe:"#f0c419"}
];

function aks_richtigeReihenfolge(){
    const zielReihenfolge = mische(FARB_BLOBS);
    const anzahlZeilen = 5;
    const zeilen = [zielReihenfolge];
    for (let i = 1; i < anzahlZeilen; i++) zeilen.push(mische(FARB_BLOBS));

    const blobHTML = (farbe) => `<svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" fill="${farbe}"/></svg>`;

    let html = `
        <p style="font-weight:700; margin-bottom:14px;">1. Kreuze die richtige Reihenfolge der Farben an. Die Farben werden dir hintereinander genannt.</p>
    `;
    zeilen.forEach(zeile => {
        html += `<div style="display:flex; align-items:center; gap:16px; margin-bottom:14px;">
            <span style="width:20px; height:20px; border:2px solid #ccc; border-radius:5px; display:inline-block;"></span>
            ${zeile.map(f => blobHTML(f.farbe)).join("")}
        </div>`;
    });
    html += `<p style="margin:20px 0 34px; color:#555;">(Ansage: ${zielReihenfolge.map(f => f.name).join(" - ")})</p>`;

    const anzahlDiktate = umfangWert(2, 4, 6);
    const laengen = [4,6,5,6,5,7];
    html += `<p style="font-weight:700; margin-bottom:14px;">2. Schreib die richtige Reihenfolge der Zahlen auf.</p>`;
    for (let i = 0; i < anzahlDiktate; i++){
        const laenge = laengen[i % laengen.length];
        const zahlen = Array.from({length: laenge}, () => zufallsZahl(1,99));
        html += `<p style="margin:0 0 6px; color:#555;">Ansage: ${zahlen.join(" - ")}</p>`;
        html += `<div style="border-bottom:1.5px solid #ccc; height:30px; margin-bottom:20px;"></div>`;
    }

    document.getElementById("aks-inhalt").innerHTML = html;
    document.getElementById("aks-titel").textContent = "Richtige Reihenfolge";
    document.getElementById("aks-anweisung").style.display = "none";
}

function as_neuZeichnen(){
    if (aks_aktuellerTyp === "richtigereihenfolge") return;
    const inhalt = document.getElementById("aks-inhalt");
    inhalt.innerHTML = "";

    aks_runden.forEach((runde, i) => {
        const div = document.createElement("div");
        div.style.marginBottom = "30px";

        let items = "";
        runde.angezeigt.forEach(wort => {
            const position = runde.gehoerteReihenfolge.indexOf(wort) + 1;
            items += `<div class="reihenfolge-item">
                <div class="wort">${wort}</div>
                <div class="nr-box" style="margin:0 auto;">${as_loesungAn ? `<span style="font-size:14px;">${position}</span>` : ""}</div>
            </div>`;
        });

        const knopf = aks_aktuellerTyp === "gehoert"
            ? `<button class="btn sekundaer klein" onclick='vorlesenReihe(${JSON.stringify(runde.gehoerteReihenfolge)}, 600)'><i class="fa-solid fa-volume-high"></i> Runde ${i+1} anhören</button>`
            : `<div style="font-weight:800; color:var(--nacht);">Runde ${i+1}</div>`;

        div.innerHTML = `${knopf}<div class="reihenfolge-liste">${items}</div>`;
        inhalt.appendChild(div);
    });
}

/* 8. Symptomtraining */
let sy_saetze = [];
let sy_loesungAn = false;
let sy_aktuellerTyp = "luecken";

function sy_typWechsel(){
    const typ = document.getElementById("sy-typ").value;
    document.getElementById("sy-serie-wrap").style.display = typ === "serie" ? "block" : "none";
    document.getElementById("sy-worterarbeitung-wrap").style.display = typ === "worterarbeitung" ? "block" : "none";
    document.getElementById("sy-luecken-hinweis").style.display = (typ === "luecken" || typ === "korrektur") ? "block" : "none";
    if (typ === "luecken" || typ === "korrektur") {
        document.getElementById("sy-luecken-hinweis").querySelector("label").textContent =
            typ === "luecken" ? "Sätze (ein Satz pro Zeile, Zielwort in *Sternchen*)" : "Sätze (ein Satz pro Zeile, falsches Wort als *falsch|richtig*)";
        document.getElementById("sy-saetze").placeholder = typ === "luecken"
            ? "Der *Hund* bellt laut.\nIch *fahre* mit dem Rad.\nDie *Sonne* scheint hell."
            : "Der Hund *bellen|bellt* laut.\nIch *fahre|fahre* mit dem Rad.";
    }
}

function erstelleSymptom(){
    sy_aktuellerTyp = document.getElementById("sy-typ").value;

    // Serie und Einzelblatt teilen sich den Bereich – immer nur eins zeigen
    const istSerie = sy_aktuellerTyp === "serie";
    document.getElementById("ausgabe-serie").style.display = istSerie ? "block" : "none";
    document.getElementById("ausgabe-symptom").style.display = "none";
    document.getElementById("akt-symptom").style.display = "none";

    if (istSerie){
        ws_erstellen();
        return;
    }

    if (sy_aktuellerTyp === "worterarbeitung"){
        sy_worterarbeitung();
        return;
    }

    const roh = document.getElementById("sy-saetze").value.split("\n").map(s => s.trim()).filter(Boolean);
    sy_saetze = roh.length ? roh : (sy_aktuellerTyp === "luecken"
        ? ["Der *Hund* bellt laut.", "Ich *fahre* mit dem Rad.", "Die *Sonne* scheint hell."]
        : ["Der Hund *bellen|bellt* laut.", "Die Katze *schlaffen|schläft* auf dem Sofa."]);

    document.getElementById("sy-titel").textContent = sy_aktuellerTyp === "luecken" ? "Lückendiktat" : "Fehler korrigieren";
    document.getElementById("sy-anweisung").textContent = sy_aktuellerTyp === "luecken"
        ? "Fülle die Lücken mit dem richtigen Wort!"
        : "Unterstreiche den Fehler in jedem Satz und schreibe das richtige Wort daneben!";

    document.getElementById("ausgabe-symptom").style.display = "block";
    document.getElementById("akt-symptom").style.display = "flex";
    sy_neuZeichnen();
}

function sy_worterarbeitung(){
    const wort = document.getElementById("sy-wort").value.trim() || "schnell";
    const wortart = document.getElementById("sy-wortart").value;
    const optionenRoh = document.getElementById("sy-bedeutung-optionen").value.split(",").map(o => o.trim()).filter(Boolean);
    const optionen = optionenRoh.length ? optionenRoh : ["Option 1", "Option 2", "Option 3"];

    document.getElementById("sy-text").style.lineHeight = "1.5"; // kein Lücken-Zeilenabstand nötig
    document.getElementById("sy-titel").textContent = `Worterarbeitung ${wortart}: „${wort}"`;
    document.getElementById("sy-anweisung").textContent = `Wir lernen das Wort „${wort}" genau kennen — wie es aussieht, wie es klingt und was es bedeutet.`;

    document.getElementById("sy-text").innerHTML = `

        <h4 style="font-size:14px; font-weight:900; margin:24px 0 10px;">1. Wortbild (sehen)</h4>
        <p style="margin:0 0 14px;">Lies das Wort laut: <strong>${wort}</strong><br>Fahre mit dem Finger über das Wort. Schreibe das Wort 3× auf.</p>
        <div style="font-size:36px; font-weight:900; text-align:center; margin:20px 0 34px;">${wort}</div>

        <h4 style="font-size:14px; font-weight:900; margin:24px 0 10px;">2. Wortklang (hören)</h4>
        <p style="margin:0 0 8px;">Sprich das Wort laut: <strong>${wort}</strong></p>
        <p style="margin:0 0 8px;">Klatsche die Silben: ${wort} → ____ Klatscher</p>
        <p style="margin:0 0 8px;">Sprich langsam und deutlich: ${wort.split("").join(" – ")}</p>
        <p style="margin:0 0 8px;">Anfangslaut hören: ______ &nbsp;&nbsp; Endlaut hören: ______</p>
        <p style="margin:0 0 20px;">Sprich das Wort: laut – leise – flüsternd</p>
        <p style="margin:0 0 34px;">Reimwort finden: <span style="border-bottom:2px dotted #999; padding:0 100px;">&nbsp;</span></p>

        <h4 style="font-size:14px; font-weight:900; margin:24px 0 10px;">3. Wortbedeutung (verstehen)</h4>
        <p style="margin:0 0 10px;">Was passt zu „${wort}"? Kreuze an:</p>
        ${optionen.map(o => `<p style="margin:0 0 6px;">☐ ${o}</p>`).join("")}
        <p style="margin:24px 0 8px;">Bilde einen Satz mit „${wort}":</p>
        <div style="border-bottom:1.5px solid #ccc; height:30px; margin-bottom:10px;"></div>
        <div style="border-bottom:1.5px solid #ccc; height:30px; margin-bottom:30px;"></div>

        <p style="margin:0;"><strong>Selbsteinschätzung:</strong> ☐ leicht &nbsp;&nbsp; ☐ mittel &nbsp;&nbsp; ☐ schwer</p>
    `;

    document.getElementById("ausgabe-symptom").style.display = "block";
    document.getElementById("akt-symptom").style.display = "flex";
}

function sy_neuZeichnen(){
    if (sy_aktuellerTyp === "worterarbeitung") return;
    const ziel = document.getElementById("sy-text");
    ziel.style.lineHeight = "";
    let html = "";

    if (sy_aktuellerTyp === "luecken"){
        sy_saetze.forEach(satz => {
            const ersetzt = satz.replace(/\*(.+?)\*/g, (m, wort) => {
                return sy_loesungAn ? `<span class="luecke-wort">${wort}</span>` : `<span class="luecke-wort">&nbsp;</span>`;
            });
            html += `<p>${ersetzt}</p>`;
        });
    } else {
        sy_saetze.forEach(satz => {
            const ersetzt = satz.replace(/\*(.+?)\|(.+?)\*/g, (m, falsch, richtig) => {
                return sy_loesungAn
                    ? `<span style="text-decoration:line-through; color:#c0392b;">${falsch}</span> <span class="loesung">${richtig}</span>`
                    : `<span style="border-bottom:3px dotted var(--nacht);">${falsch}</span> ______________`;
            });
            html += `<p>${ersetzt}</p>`;
        });
    }

    ziel.innerHTML = html;
}

/* 8b. Worterarbeitung – Serie (4 bearbeitbare A4-Blätter für starke LRS) */

let ws_letzteWoerter = [];

function ws_esc(text){
    return String(text).replace(/[&<>"']/g, z => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[z]));
}

// Einfache Silbentrennung für lautgetreue Wörter (Vorschlag – mit Bindestrich lässt sie sich überschreiben).
// Regel: ein Konsonant zwischen zwei Vokalen geht zur nächsten Silbe (Na-se),
// bei mehreren wird vor dem letzten getrennt (Son-ne, Kas-ta-nie); sch, ch, ck, ph, qu bleiben zusammen.
function ws_silbenAuto(wort){
    const VOKALE = "aeiouäöüyAEIOUÄÖÜY";
    const EINHEITEN = ["sch", "ch", "ck", "ph", "qu"];
    const teile = [];
    let i = 0;
    while (i < wort.length){
        const rest = wort.slice(i).toLowerCase();
        const einheit = EINHEITEN.find(e => rest.startsWith(e));
        if (einheit){ teile.push({ s: wort.substr(i, einheit.length), vokal: false }); i += einheit.length; }
        else { teile.push({ s: wort[i], vokal: VOKALE.includes(wort[i]) }); i++; }
    }
    const kerne = [];
    for (let k = 0; k < teile.length; k++){
        if (!teile[k].vokal) continue;
        let ende = k;
        while (ende + 1 < teile.length && teile[ende + 1].vokal) ende++;
        kerne.push([k, ende]);
        k = ende;
    }
    if (kerne.length < 2) return [wort];

    const schnitte = [];
    for (let n = 0; n < kerne.length - 1; n++){
        const vokalEnde = kerne[n][1], naechsterVokal = kerne[n + 1][0];
        const konsonanten = naechsterVokal - vokalEnde - 1;
        schnitte.push(konsonanten <= 1 ? vokalEnde + 1 : naechsterVokal - 1);
    }
    const silben = [];
    let start = 0;
    schnitte.forEach(s => { silben.push(teile.slice(start, s).map(t => t.s).join("")); start = s; });
    silben.push(teile.slice(start).map(t => t.s).join(""));
    return silben;
}

function ws_woerterLesen(){
    const roh = document.getElementById("ws-woerter").value
        .split(/[,\n;]+/).map(w => w.trim().replace(/\s+/g, "")).filter(Boolean);
    return roh.slice(0, 6).map(eintrag => {
        const silben = eintrag.includes("-")
            ? eintrag.split("-").map(s => s.trim()).filter(Boolean)
            : silben_trennen(eintrag);
        return { wort: silben.join(""), silben };
    });
}

function ws_ausThema(){
    const kurz = wortpool().filter(w => w.length >= 3 && w.length <= 7 && silben_trennen(w).length >= 2);
    const auswahl = mische(kurz.length >= 5 ? kurz : wortpool()).slice(0, 5);
    document.getElementById("ws-woerter").value = auswahl.map(w => silben_trennen(w).join("-")).join(", ");
}

// Ähnlich aussehende bzw. klingende Buchstaben für die Ablenker im Wort-Detektiv
const WS_AEHNLICH = { b:"d", d:"b", p:"q", q:"p", m:"n", n:"m", e:"a", a:"e", o:"a", u:"n", i:"l", l:"i", t:"f", f:"t", s:"z", z:"s", h:"n", r:"n", k:"h", g:"q", w:"v", v:"w" };

function ws_ablenker(wort, anzahl){
    const dreher = [], aehnlich = [], ausgelassen = [];
    const gleich = v => v.toLowerCase() === wort.toLowerCase();

    for (let i = 1; i < wort.length - 1; i++){
        const b = wort.split("");
        [b[i], b[i + 1]] = [b[i + 1], b[i]];
        const v = b.join("");
        if (!gleich(v)) dreher.push(v);
    }
    for (let i = 0; i < wort.length; i++){
        const z = wort[i], klein = z.toLowerCase();
        if (!WS_AEHNLICH[klein]) continue;
        const ersatz = z === klein ? WS_AEHNLICH[klein] : WS_AEHNLICH[klein].toUpperCase();
        if (ersatz === "I" || ersatz === "L") continue; // I/l sind am Wortanfang kaum unterscheidbar
        const v = wort.slice(0, i) + ersatz + wort.slice(i + 1);
        if (!gleich(v)) aehnlich.push(v);
    }
    if (wort.length > 3){
        for (let i = 1; i < wort.length; i++) ausgelassen.push(wort.slice(0, i) + wort.slice(i + 1));
    }

    // abwechselnd aus den drei Fehlerarten ziehen, ohne Doppelungen
    const toepfe = [mische(dreher), mische(aehnlich), mische(ausgelassen)];
    const ergebnis = new Set();
    let runde = 0;
    while (ergebnis.size < anzahl && toepfe.some(t => t.length)){
        const topf = toepfe[runde % 3];
        if (topf.length){
            const v = topf.pop();
            if (!gleich(v)) ergebnis.add(v);
        }
        runde++;
    }
    let notfall = 0;
    while (ergebnis.size < anzahl && notfall < 20){
        ergebnis.add(wort + "e".repeat(++notfall));
    }
    return [...ergebnis];
}

function ws_bogen(silben, schrift){
    return `<span class="ws-wort" style="font-size:${schrift}px;">` +
        silben.map((s, i) => {
            const farbe = i % 2 === 0 ? "#1D5FA8" : "#B23A2E";
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 14" preserveAspectRatio="none">` +
                `<path d="M3 2 Q50 22 97 2" fill="none" stroke="${farbe}" stroke-width="4" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`;
            // als Bild eingebunden: sieht so auf dem Bildschirm, im Druck und im gespeicherten PDF gleich aus
            const bogen = `<img class="ws-bogen" alt="" src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}">`;
            return `<span class="${i % 2 === 0 ? "ws-s1" : "ws-s2"}">${ws_esc(s)}${bogen}</span>`;
        }).join("") +
        `</span>`;
}

function ws_wortgroesse(wort){
    if (wort.length <= 5) return 52;
    if (wort.length <= 7) return 44;
    if (wort.length <= 9) return 36;
    return 30;
}

function ws_kopf(titel, label = "Worterarbeitung"){
    return `
        <div class="ws-kopf">
            <div class="ws-pille">${label} · Blatt <span class="ws-nr">1</span> von <span class="ws-gesamt">4</span></div>
            <div class="ws-name">Name: <span class="ws-linie"></span></div>
        </div>
        <h1>${titel}</h1><!--ws-inhalt-->`;
}

function ws_fuss(woerter, afs){
    return `<!--/ws-inhalt-->
        <div class="ws-fuss">
            <div>Meine Wörter: ${woerter.map(w => ws_esc(w.wort)).join(" · ")}</div>
            <div>${afs}</div>
        </div>`;
}

function ws_aufgabe(nr, text){
    return `<div class="ws-aufgabe"><div class="ws-nummer">${nr}</div><div>${text}</div></div>`;
}

// Baut ein A4-Blatt: Kopf · Inhaltsrahmen (wird eingepasst) · Fußzeile
function ws_seite(nr, html){
    const START = "<!--ws-inhalt-->", ENDE = "<!--/ws-inhalt-->";
    const a = html.indexOf(START), e = html.indexOf(ENDE);
    const kopf = html.slice(0, a), inhalt = html.slice(a + START.length, e), fuss = html.slice(e + ENDE.length);
    return `<div class="ws-seite" data-blatt="${nr}"><div class="ws-innen" contenteditable="true" spellcheck="false">` +
        `${kopf}<div class="ws-rahmen"><div class="ws-inhalt">${inhalt}</div></div>${fuss}</div></div>`;
}

function ws_blatt1(woerter){
    const zeilen = woerter.map(w => `
        <div class="ws-wortzeile">
            <div>${ws_bogen(w.silben, ws_wortgroesse(w.wort))}</div>
            <div class="ws-kreise">${w.silben.map(() => `<div class="ws-kreis"></div>`).join("")}</div>
            <div class="ws-malbox"></div>
        </div>`).join("");

    return ws_seite(1, `
        ${ws_kopf("Meine Wörter kennenlernen")}
        <div class="ws-auftrag">Lies jedes Wort langsam. Schwinge die Silben mit dem Arm und klatsche dazu. Male für jede Silbe einen Kreis aus. Male dann ein Bild zum Wort.</div>
        <div class="ws-tabkopf"><div>Wort lesen</div><div>Silben klatschen</div><div>Bild malen</div></div>
        <div class="ws-zeilen">${zeilen}</div>
        ${ws_fuss(woerter, "AFS · Symptomtraining: Silbengliederung")}`);
}

function ws_blatt2(woerter){
    // Teil 1: erste Silbe links, Rest rechts (gemischt)
    const links = woerter.map(w => w.silben[0]);
    const rechts = mische(woerter.map(w => w.silben.slice(1).join("") || "–"));

    const linksHtml = links.map(s => `<div class="ws-silbe-l">${ws_esc(s)}<div class="ws-punkt"></div></div>`).join("");
    const rechtsHtml = rechts.map(s => `<div class="ws-silbe-r"><div class="ws-punkt"></div>${ws_esc(s)}</div>`).join("");

    // Teil 2: Silben durcheinander (nie in richtiger Reihenfolge, wenn es sich vermeiden lässt)
    const ordnen = mische(woerter).map(w => {
        let gemischt = mische(w.silben);
        for (let versuch = 0; versuch < 10 && w.silben.length > 1 && gemischt.join("|") === w.silben.join("|"); versuch++){
            gemischt = mische(w.silben);
        }
        return `
            <div class="ws-ordnen-zeile">
                <div class="ws-chips">${gemischt.map(s => `<div class="ws-chip">${ws_esc(s)}</div>`).join("")}</div>
                <div class="ws-schreiblinie"></div>
            </div>`;
    }).join("");

    return ws_seite(2, `
        ${ws_kopf("Silben-Puzzle")}
        ${ws_aufgabe(1, "Welche Silben gehören zusammen? Verbinde mit einem Strich. Lies das Wort laut.")}
        <div class="ws-verbinden">
            <div class="ws-spalte">${linksHtml}</div>
            <div></div>
            <div class="ws-spalte">${rechtsHtml}</div>
        </div>
        <div style="height:6px;"></div>
        ${ws_aufgabe(2, "Die Silben sind durcheinander. Lege sie richtig und schreibe das Wort auf die Linie.")}
        <div class="ws-ordnen">${ordnen}</div>
        ${ws_fuss(woerter, "AFS · Funktionstraining: Serialität")}`);
}

function ws_blatt3(woerter){
    const reihen = woerter.map(w => {
        const kandidaten = mische([w.wort, w.wort, ...ws_ablenker(w.wort, 4)]);
        const schrift = w.wort.length > 7 ? 22 : (w.wort.length > 5 ? 26 : 28);
        return `
            <div class="ws-suchreihe">
                <div class="ws-suche">Suche: <span class="ws-ziel">${ws_esc(w.wort)}</span></div>
                <div class="ws-kandidaten" style="font-size:${schrift}px;">${kandidaten.map(k => `<div>${ws_esc(k)}</div>`).join("")}</div>
            </div>`;
    }).join("");

    const schlange1 = mische(woerter).map(w => ws_esc(w.wort)).join("");
    const schlange2 = mische(woerter).map(w => ws_esc(w.wort)).join("");

    return ws_seite(3, `
        ${ws_kopf("Wort-Detektiv")}
        ${ws_aufgabe(1, "Schau genau! Das Wort steckt in jeder Reihe <b>zweimal</b>. Kreise es ein.")}
        <div class="ws-suchliste">${reihen}</div>
        <div style="height:4px;"></div>
        ${ws_aufgabe(2, "Die Wortschlange! Trenne die Wörter mit einem Strich.")}
        <div class="ws-schlange">${schlange1}</div>
        <div class="ws-schlange">${schlange2}</div>
        ${ws_fuss(woerter, "AFS · Funktionstraining: Optische Differenzierung")}`);
}

function ws_blatt4(woerter){
    const VOKALE = "aeiouäöü";
    const luecken = woerter.map(w => {
        const buchstaben = w.wort.split("");
        const vokalStellen = buchstaben.map((b, i) => (i > 0 && VOKALE.includes(b.toLowerCase())) ? i : -1).filter(i => i >= 0);
        const leer = vokalStellen.length ? zufallsElement(vokalStellen) : Math.min(1, buchstaben.length - 1);
        return `<div class="ws-buchstaben">${buchstaben.map((b, i) =>
            i === leer ? `<div class="ws-feld ws-leer"></div>` : `<div class="ws-feld">${ws_esc(b)}</div>`
        ).join("")}</div>`;
    }).join("");

    const lineatur = (text) => `
        <div class="ws-lineatur"><div class="ws-l-o"></div><div class="ws-l-m"></div><div class="ws-l-g"></div>${text ? `<div class="ws-spur">${ws_esc(text)}</div>` : ""}</div>`;

    const schreibzeilen = woerter.map(w => `
        <div class="ws-spalten2">${lineatur(w.wort)}${lineatur("")}</div>`).join("");

    return ws_seite(4, `
        ${ws_kopf("Ich schreibe meine Wörter")}
        ${ws_aufgabe(1, "Ein Buchstabe fehlt. Sprich das Wort deutlich. Schreibe den Buchstaben ins leere Kästchen.")}
        <div class="ws-luecken">${luecken}</div>
        ${ws_aufgabe(2, "Spure das Wort nach und sprich dabei mit. Präge es dir ein. Decke es dann ab und schreibe es aus dem Kopf.")}
        <div class="ws-spalten2"><div class="ws-spaltenkopf">Nachspuren</div><div class="ws-spaltenkopf">Abdecken – aus dem Kopf schreiben</div></div>
        <div class="ws-lineatur-liste">${schreibzeilen}</div>
        <div class="ws-bilanz">
            <strong>Das kann ich schon!</strong>
            <span>Male für jedes richtige Wort einen Kreis aus:</span>
            <span style="display:flex; gap:10px; align-items:center;">${woerter.map(() => `<span class="ws-kreis" style="display:inline-block;"></span>`).join("")}</span>
        </div>
        ${ws_fuss(woerter, "AFS · Symptomtraining: Wortbild sichern")}`);
}

/* ---------- Weitere Varianten ---------- */

// Blatt 5: Buchstaben-Salat (Optische Serialität)
function ws_blatt5(woerter){
    const salat = mische(woerter).map(w => {
        const buchstaben = w.wort.split("");
        let gemischt = mische(buchstaben);
        for (let v = 0; v < 10 && buchstaben.length > 1 && gemischt.join("") === w.wort; v++) gemischt = mische(buchstaben);
        return `
            <div class="ws-salat-zeile">
                <div class="ws-buchstaben">${gemischt.map(z => `<div class="ws-feld">${ws_esc(z)}</div>`).join("")}</div>
                <div class="ws-schreiblinie"></div>
            </div>`;
    }).join("");

    const auswahl = mische(woerter).map(w => {
        const optionen = mische([w.wort, ...ws_ablenker(w.wort, 2)]);
        return `<div class="ws-auswahl3">${optionen.map(o => `<div>${ws_esc(o)}</div>`).join("")}</div>`;
    }).join("");

    return ws_seite(5, `
        ${ws_kopf("Buchstaben-Salat")}
        ${ws_aufgabe(1, "Die Buchstaben sind durcheinander. Bringe sie in die richtige Reihenfolge und schreibe das Wort.")}
        <div class="ws-salat">${salat}</div>
        ${ws_aufgabe(2, "Nur ein Wort ist richtig geschrieben. Kreise es ein.")}
        <div class="ws-auswahl-liste">${auswahl}</div>
        ${ws_fuss(woerter, "AFS · Funktionstraining: Optische Serialität")}`);
}

// Blatt 6: Wörter-Suchsel – nur waagerecht (→) und senkrecht (↓), keine Diagonalen oder Rückwärts-Wörter
function ws_suchselBauen(woerter){
    const W = woerter.map(w => w.wort.toUpperCase());
    const laengste = Math.max(...W.map(w => w.length));
    const FUELL = "ABDEFGHIKLMNOPRSTUW";
    const start = Math.max(8, laengste + 1);
    for (let n = start; n <= Math.max(start, 14) + 2; n++){
        for (let versuch = 0; versuch < 40; versuch++){
            const g = Array.from({ length: n }, () => Array(n).fill(null));
            let allesPlatziert = true;
            for (const w of [...W].sort((a, b) => b.length - a.length)){
                let platziert = false;
                for (let t = 0; t < 150 && !platziert; t++){
                    const senkrecht = Math.random() < 0.5;
                    const r = zufallsZahl(0, senkrecht ? n - w.length : n - 1);
                    const c = zufallsZahl(0, senkrecht ? n - 1 : n - w.length);
                    let passt = true;
                    for (let i = 0; i < w.length && passt; i++){
                        const feld = g[senkrecht ? r + i : r][senkrecht ? c : c + i];
                        if (feld && feld !== w[i]) passt = false;
                    }
                    if (!passt) continue;
                    for (let i = 0; i < w.length; i++) g[senkrecht ? r + i : r][senkrecht ? c : c + i] = w[i];
                    platziert = true;
                }
                if (!platziert){ allesPlatziert = false; break; }
            }
            if (allesPlatziert){
                g.forEach(zeile => zeile.forEach((z, i) => { if (!z) zeile[i] = FUELL[zufallsZahl(0, FUELL.length - 1)]; }));
                return { gitter: g, n };
            }
        }
    }
    return null;
}

function ws_blatt6(woerter){
    const suchsel = ws_suchselBauen(woerter);
    let gitterHtml = "<p>Die Wörter sind zu lang für ein Suchsel.</p>";
    if (suchsel){
        // Gitter passt sich der Breite an (quadratische Felder); Schriftgröße passend zur Feldgröße
        const z = Math.floor(460 / suchsel.n);
        gitterHtml = `<div class="ws-gitter" style="grid-template-columns:repeat(${suchsel.n}, minmax(0,1fr)); grid-template-rows:repeat(${suchsel.n}, minmax(0,1fr)); font-size:${Math.round(z * 0.56)}px;">` +
            suchsel.gitter.flat().map(b => `<div>${ws_esc(b)}</div>`).join("") + `</div>`;
    }
    const liste = woerter.map(w => `<div class="ws-haken"><span class="ws-kaestchen"></span>${ws_esc(w.wort)}</div>`).join("");

    return ws_seite(6, `
        ${ws_kopf("Wörter-Suchsel")}
        ${ws_aufgabe(1, "Die Wörter stehen waagerecht (→) oder senkrecht (↓). Finde jedes Wort, male es farbig an und hake es in der Liste ab.")}
        <div class="ws-suchsel-wrap">
            ${gitterHtml}
            <div class="ws-suchwoerter"><strong style="font-size:16px; color:#4A5866;">Diese Wörter suchst du:</strong>${liste}</div>
        </div>
        ${ws_aufgabe(2, "Schreibe jedes gefundene Wort einmal ab.")}
        <div class="ws-zeilen2">${woerter.map(() => `<div class="ws-schreiblinie"></div>`).join("")}</div>
        ${ws_fuss(woerter, "AFS · Funktionstraining: Optische Differenzierung")}`);
}

// Blatt 7: Wort-Gedächtnis (Optisches Gedächtnis) – oben merken, Blatt knicken, unten wiedererkennen und schreiben
function ws_blatt7(woerter){
    const merk = woerter.map(w => `<div>${ws_bogen(w.silben, Math.min(40, ws_wortgroesse(w.wort)))}</div>`).join("");
    const kandidaten = mische([...woerter.map(w => w.wort), ...woerter.map(w => ws_ablenker(w.wort, 1)[0])]);

    return ws_seite(7, `
        ${ws_kopf("Wort-Gedächtnis")}
        ${ws_aufgabe(1, "Schau dir die Wörter genau an. Lies jedes Wort zweimal. Präge dir ein, wie es aussieht.")}
        <div class="ws-merkbox">${merk}</div>
        <div class="ws-knick">Hier nach hinten knicken – nicht mehr nachschauen!</div>
        ${ws_aufgabe(2, "Welche Wörter waren <b>genau so</b> geschrieben? Kreise sie ein.")}
        <div class="ws-kreiswahl">${kandidaten.map(k => `<div>${ws_esc(k)}</div>`).join("")}</div>
        ${ws_aufgabe(3, "Schreibe alle Wörter aus dem Kopf auf.")}
        <div class="ws-zeilen2">${woerter.map(() => `<div class="ws-schreiblinie"></div>`).join("")}</div>
        ${ws_fuss(woerter, "AFS · Funktionstraining: Optisches Gedächtnis")}`);
}

// Blatt 8: Laute hören (Akustische Differenzierung) – Anlaut, Endlaut, Silben, Buchstaben; Selbstlaute einsetzen
function ws_blatt8(woerter){
    const VOKALE = "aeiouäöüAEIOUÄÖÜ";
    const zeilen = woerter.map(w => `
        <tr>
            <td>${ws_bogen(w.silben, Math.min(36, ws_wortgroesse(w.wort)))}</td>
            <td><span class="ws-kasten"></span></td>
            <td><span class="ws-kasten"></span></td>
            <td><span class="ws-kasten"></span></td>
            <td><span class="ws-kasten"></span></td>
        </tr>`).join("");

    const vokalWoerter = mische(woerter).map(w => `<div class="ws-buchstaben">${w.wort.split("").map(b =>
        VOKALE.includes(b) ? `<div class="ws-feld ws-leer"></div>` : `<div class="ws-feld">${ws_esc(b)}</div>`
    ).join("")}</div>`).join("");

    const benutzt = [...new Set(woerter.map(w => w.wort.toLowerCase()).join("").split("").filter(b => VOKALE.includes(b)))];
    const bank = ["a", "e", "i", "o", "u", ...["ä", "ö", "ü"].filter(v => benutzt.includes(v))];

    return ws_seite(8, `
        ${ws_kopf("Laute hören")}
        ${ws_aufgabe(1, "Sprich jedes Wort langsam und deutlich. Was hörst du am Anfang, was am Ende? Wie viele Silben und Buchstaben hat es?")}
        <table class="ws-laut-tabelle">
            <tr><th>Wort</th><th>Anfangslaut</th><th>Endlaut</th><th>Silben</th><th>Buchstaben</th></tr>
            ${zeilen}
        </table>
        ${ws_aufgabe(2, "Die Selbstlaute fehlen. Sprich das Wort und setze sie ein.")}
        <div class="ws-vokalbank">${bank.map(v => `<div>${v}</div>`).join("")}</div>
        <div class="ws-luecken">${vokalWoerter}</div>
        ${ws_fuss(woerter, "AFS · Funktionstraining: Akustische Differenzierung")}`);
}

// Blatt 9: Silbenteppich + Blitzlesen (Symptomtraining Lesen)
function ws_blatt9(woerter){
    const silben = woerter.flatMap(w => w.silben);
    const REIHEN = 8, SPALTEN = 6;
    let html = "", vorher = "";
    for (let r = 0; r < REIHEN; r++){
        html += `<div class="ws-reihe${r % 2 ? " ws-gerade" : ""}">${r + 1}</div>`;
        for (let c = 0; c < SPALTEN; c++){
            let s = zufallsElement(silben);
            for (let v = 0; v < 6 && s === vorher && silben.length > 1; v++) s = zufallsElement(silben);
            vorher = s;
            html += `<div class="${c % 2 ? "ws-t2" : "ws-t1"}${r % 2 ? " ws-gerade" : ""}">${ws_esc(s)}</div>`;
        }
    }
    const blitz = [...mische(woerter), ...mische(woerter), ...mische(woerter)].map(w => `<span>${ws_esc(w.wort)}</span>`).join("");
    const versuch = n => `<span>${n}. Versuch: <span class="ws-linie2"></span> Reihen</span>`;

    return ws_seite(9, `
        ${ws_kopf("Silbenteppich")}
        ${ws_aufgabe(1, "Lies die Silben Reihe für Reihe laut. Jemand stoppt eine Minute. Wie weit kommst du?")}
        <div class="ws-teppich">${html}</div>
        <div class="ws-versuche">${versuch(1)}${versuch(2)}${versuch(3)}</div>
        ${ws_aufgabe(2, "Blitzlesen: Lies die Wörter so schnell und genau, wie du kannst.")}
        <div class="ws-blitz">${blitz}</div>
        ${ws_fuss(woerter, "AFS · Symptomtraining: Lesen")}`);
}

// Blatt 10: Wort-Memory zum Ausschneiden (Wortbild sichern)
function ws_blatt10(woerter){
    const kartenGroesse = w => Math.max(18, Math.min(40, Math.floor(190 / (w.wort.length * 0.62))));
    const karten = mische(woerter.flatMap(w => [
        `<div class="ws-karte ws-k-silben">${ws_bogen(w.silben, kartenGroesse(w))}</div>`,
        `<div class="ws-karte ws-k-wort"><span class="ws-karte-wort" style="font-size:${kartenGroesse(w)}px;">${ws_esc(w.wort)}</span></div>`,
    ])).join("");

    return ws_seite(10, `
        ${ws_kopf("Wort-Memory")}
        <div class="ws-auftrag">Schneide die Karten an den gestrichelten Linien aus. Spiele Memory: Die blaue Silben-Karte und die gelbe Wort-Karte gehören zusammen. Lies jedes Paar laut vor.</div>
        <div class="ws-schere">✂ Hier ausschneiden</div>
        <div class="ws-karten">${karten}</div>
        ${ws_fuss(woerter, "AFS · Symptomtraining: Wortbild sichern")}`);
}

// Alle Blätter der Serie (Reihenfolge = Reihenfolge beim Drucken)
const WS_BLAETTER = [
    { nr: "1",  name: "Wörter kennenlernen",       kurz: "Kennenlernen",     bereich: "Silben",        fn: ws_blatt1,  grund: true },
    { nr: "2",  name: "Silben-Puzzle",             kurz: "Silben-Puzzle",    bereich: "Serialität",    fn: ws_blatt2,  grund: true },
    { nr: "3",  name: "Wort-Detektiv",             kurz: "Wort-Detektiv",    bereich: "Optik",         fn: ws_blatt3,  grund: true },
    { nr: "4",  name: "Ich schreibe meine Wörter", kurz: "Schreiben",        bereich: "Wortbild",      fn: ws_blatt4,  grund: true },
    { nr: "5",  name: "Buchstaben-Salat",          kurz: "Buchstaben-Salat", bereich: "Serialität",    fn: ws_blatt5 },
    { nr: "6",  name: "Wörter-Suchsel",            kurz: "Suchsel",          bereich: "Optik",         fn: ws_blatt6 },
    { nr: "7",  name: "Wort-Gedächtnis",           kurz: "Wort-Gedächtnis",  bereich: "Gedächtnis",    fn: ws_blatt7 },
    { nr: "8",  name: "Laute hören",               kurz: "Laute hören",      bereich: "Akustik",       fn: ws_blatt8 },
    { nr: "9",  name: "Silbenteppich",             kurz: "Silbenteppich",    bereich: "Lesen",         fn: ws_blatt9 },
    { nr: "10", name: "Wort-Memory",               kurz: "Memory",           bereich: "Spiel",         fn: ws_blatt10 },
];

function ws_wahlAufbauen(){
    const liste = document.getElementById("ws-wahl-liste");
    if (!liste || liste.children.length) return;
    liste.innerHTML = WS_BLAETTER.map(b =>
        `<label title="${ws_esc(b.name)}"><input type="checkbox" class="ws-wahl" value="${b.nr}" ${b.grund ? "checked" : ""} onchange="ws_blattwahl()"> ${b.nr} ${ws_esc(b.kurz)} <small>${ws_esc(b.bereich)}</small></label>`
    ).join("");
}

function ws_wahlSetzen(art){
    document.querySelectorAll(".ws-wahl").forEach(cb => {
        const blatt = WS_BLAETTER.find(b => b.nr === cb.value);
        cb.checked = art === "alle" ? true : !!(blatt && blatt.grund);
    });
    ws_blattwahl();
}

function ws_erstellen(){
    const woerter = ws_woerterLesen();
    if (woerter.length < 2){
        alert("Bitte mindestens zwei Lernwörter eingeben (z. B. Na-se, Ro-se).");
        document.getElementById("ausgabe-serie").style.display = "none";
        return;
    }
    if (document.getElementById("ws-woerter").value.split(/[,\n;]+/).filter(w => w.trim()).length > 6){
        alert("Es werden die ersten 6 Wörter verwendet – mehr passen nicht sauber auf ein Blatt.");
    }
    ws_letzteWoerter = woerter;

    document.getElementById("ws-blaetter").innerHTML = WS_BLAETTER.map(b => b.fn(woerter)).join("");

    // Änderungen direkt auf dem Blatt: Blatt danach wieder einpassen
    document.querySelectorAll("#ws-blaetter .ws-innen").forEach(innen => {
        let timer = null;
        innen.addEventListener("input", () => {
            clearTimeout(timer);
            timer = setTimeout(() => ws_einpassen(innen.closest(".ws-seite")), 500);
        });
    });

    ws_blattwahl();
    ws_spurAusrichten();
    if (document.fonts && document.fonts.load){
        Promise.all([document.fonts.load("400 40px Andika"), document.fonts.load("700 40px Andika")])
            .catch(() => {})
            .then(() => { ws_spurAusrichten(); ws_einpassen(); });
    }
}

// Richtet die Nachspur-Wörter exakt in der Lineatur aus: Kleinbuchstaben füllen das
// Mittelband (gestrichelte Linie bis Grundlinie), die Grundlinie der Schrift liegt auf der dicken Linie.
function ws_spurAusrichten(){
    const MITTELBAND = 22, GRUNDLINIE = 44; // in px, passend zu .ws-l-o / .ws-l-m in der Lineatur
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.font = "400 100px Andika, sans-serif";
    const x = ctx.measureText("x");
    const ref = ctx.measureText("Hg");
    if (!x.actualBoundingBoxAscent || !ref.fontBoundingBoxAscent) return; // ältere Browser: Standardwerte aus dem CSS

    const groesse = MITTELBAND / x.actualBoundingBoxAscent * 100;
    const faktor = groesse / 100;
    const oberlaenge = ref.fontBoundingBoxAscent * faktor;
    const unterlaenge = ref.fontBoundingBoxDescent * faktor;
    // Mit line-height = Schriftgröße liegt die Grundlinie bei: halber Rest + Oberlänge
    const grundlinieImKasten = (groesse - (oberlaenge + unterlaenge)) / 2 + oberlaenge;

    document.querySelectorAll(".ws-spur").forEach(spur => {
        spur.style.fontSize = groesse.toFixed(1) + "px";
        spur.style.lineHeight = groesse.toFixed(1) + "px";
        spur.style.top = (GRUNDLINIE - grundlinieImKasten).toFixed(1) + "px";
    });
}

function ws_neuMischen(){
    if (!ws_letzteWoerter.length) return;
    if (!confirm("Neu mischen erstellt die Blätter neu – Änderungen, die du direkt auf den Blättern gemacht hast, gehen dabei verloren. Fortfahren?")) return;
    ws_erstellen();
}

function ws_blattwahl(){
    const an = [...document.querySelectorAll(".ws-wahl:checked")].map(cb => cb.value);
    const seiten = [...document.querySelectorAll("#ws-blaetter .ws-seite")];
    seiten.forEach(s => s.classList.toggle("ws-aus", !an.includes(s.dataset.blatt)));

    const sichtbar = seiten.filter(s => !s.classList.contains("ws-aus"));
    sichtbar.forEach((s, i) => {
        s.querySelectorAll(".ws-nr").forEach(el => el.textContent = i + 1);
        s.querySelectorAll(".ws-gesamt").forEach(el => el.textContent = sichtbar.length);
    });
    ws_einpassen();
}

// Memory-Karten: jedes Wort bekommt die größte Schrift, die in seine Karte passt
function ws_kartenEinpassen(seite){
    seite.querySelectorAll(".ws-karte").forEach(karte => {
        const text = karte.querySelector(".ws-wort, .ws-karte-wort");
        if (!text) return;
        const platz = karte.clientWidth - 20;
        let groesse = 40;
        text.style.fontSize = groesse + "px";
        while (text.scrollWidth > platz && groesse > 14){
            groesse -= 2;
            text.style.fontSize = groesse + "px";
        }
    });
}

// Passt den Aufgabenteil jedes Blatts so an, dass er die A4-Seite füllt:
// zu viel Inhalt wird verkleinert, wenig Inhalt etwas vergrößert (Kopf und Fußzeile bleiben gleich groß).
const WS_MIN = 0.55, WS_MAX = 1.2;
function ws_einpassen(nurSeite){
    const seiten = nurSeite ? [nurSeite] : [...document.querySelectorAll("#ws-blaetter .ws-seite")];
    seiten.forEach(seite => {
        if (seite.classList.contains("ws-aus")) return;
        const rahmen = seite.querySelector(".ws-rahmen");
        const inhalt = seite.querySelector(".ws-inhalt");
        if (!rahmen || !inhalt) return;
        const H = rahmen.clientHeight, B = rahmen.clientWidth;
        if (!H || !B) return;

        inhalt.style.transform = "";
        inhalt.style.height = "auto";
        inhalt.style.width = B + "px";

        const maxF = parseFloat(seite.dataset.max) || WS_MAX;
        let f = 1;
        for (let schritt = 0; schritt < 6; schritt++){
            ws_kartenEinpassen(seite);
            const neu = Math.min(maxF, Math.max(WS_MIN, H / inhalt.scrollHeight));
            if (Math.abs(neu - f) < 0.004){ f = neu; break; }
            f = neu;
            inhalt.style.width = (B / f) + "px";
        }
        ws_kartenEinpassen(seite);
        if (inhalt.scrollHeight * f > H + 1 && f > WS_MIN){
            f = Math.max(WS_MIN, f * H / (inhalt.scrollHeight * f));
            inhalt.style.width = (B / f) + "px";
        }

        inhalt.style.transformOrigin = "top left";
        inhalt.style.transform = `scale(${f.toFixed(4)})`;
        inhalt.style.height = (H / f) + "px";
    });
}

// ---------------------------
// In Materialien speichern: PDF im Browser erzeugen und hochladen
// ---------------------------

function ws_skriptLaden(url, global){
    return new Promise((fertig, fehler) => {
        if (global()) return fertig();
        const s = document.createElement("script");
        s.src = url;
        s.onload = () => fertig();
        s.onerror = () => fehler(new Error("Hilfsprogramm konnte nicht geladen werden – bitte Internetverbindung prüfen."));
        document.head.appendChild(s);
    });
}

function ws_sichtbareSeiten(){
    return [...document.querySelectorAll("#ws-blaetter .ws-seite")].filter(s => !s.classList.contains("ws-aus"));
}

function ws_speichernOeffnen(){
    const feld = document.getElementById("ws-speichern");
    if (!ws_letzteWoerter.length) return;
    document.getElementById("ws-sp-titel").value = "Worterarbeitung – " + ws_letzteWoerter.map(w => w.wort).join(", ");
    document.getElementById("ws-sp-klasse").value = document.getElementById("g-klasse").value;
    document.getElementById("ws-sp-status").textContent = "";
    feld.style.display = "block";
    document.getElementById("ws-sp-titel").focus();
}

// PDF-Qualität: ca. 150 dpi und gute JPEG-Kompression – scharf genug für den Druck,
// klein genug für übliche Upload-Grenzen der Webhoster (oft 2 MB)
const PDF_AUFLOESUNG = 1.6, PDF_QUALITAET = 0.8;

async function ws_pdfErzeugen(seiten, status, aufloesung = PDF_AUFLOESUNG, qualitaet = PDF_QUALITAET){
    await ws_skriptLaden("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js", () => window.html2canvas);
    await ws_skriptLaden("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js", () => window.jspdf);
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    if (document.activeElement) document.activeElement.blur(); // keine Schreibmarke im PDF
    seiten.forEach(s => ws_einpassen(s)); // letzte Änderungen sofort einpassen

    const pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
    for (let i = 0; i < seiten.length; i++){
        status(`Blatt ${i + 1} von ${seiten.length} wird umgewandelt …`);
        const leinwand = await window.html2canvas(seiten[i], {
            scale: aufloesung, backgroundColor: "#ffffff", logging: false, useCORS: true,
            onclone: (kopie) => {
                kopie.querySelectorAll(".ws-seite").forEach(s => s.style.boxShadow = "none");
                // Lösungs-Ringe: die Umwandlung kennt keine Schatten → echter Rahmen, Rand nach außen ausgeglichen
                kopie.querySelectorAll(".ws-loesung .fs-lm").forEach(el => {
                    if (el.closest(".bs-wort")) return;   // im Wort: rot unterstrichen, kein Ring
                    el.style.boxShadow = "none";
                    el.style.border = "3px solid #C0392B";
                    el.style.margin = "-3px";
                });
                // Eingebettete Grafiken (z. B. Tiere) als Bild mit fester Größe – das erfasst die Umwandlung zuverlässig
                kopie.querySelectorAll(".ws-inhalt").forEach(inh => {
                    const skala = parseFloat((inh.style.transform || "").replace(/[^\d.]/g, "")) || 1;
                    inh.querySelectorAll("svg").forEach(svg => {
                        const r = svg.getBoundingClientRect();
                        const w = r.width / skala, h = r.height / skala;
                        if (!w || !h) return;
                        const klon = svg.cloneNode(true);
                        klon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                        klon.setAttribute("width", w);
                        klon.setAttribute("height", h);
                        const bild = kopie.createElement("img");
                        bild.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(klon));
                        bild.style.cssText = `width:${w}px; height:${h}px; display:inline-block; vertical-align:middle;`;
                        svg.replaceWith(bild);
                    });
                });
                // Silbenbögen pixelgenau nachzeichnen (die Umwandlung würde das gestreckte Bogen-Bild flachdrücken)
                kopie.querySelectorAll("img.ws-bogen").forEach(bild => {
                    const silbe = bild.parentElement;
                    const breite = Math.max(10, silbe.offsetWidth - 2), hoehe = 14, aufloesung = 3;
                    const farbe = silbe.classList.contains("ws-s2") ? "#B23A2E" : "#1D5FA8";
                    const leinwand = kopie.createElement("canvas");
                    leinwand.width = breite * aufloesung;
                    leinwand.height = hoehe * aufloesung;
                    leinwand.className = "ws-bogen";
                    leinwand.style.width = breite + "px";
                    leinwand.style.height = hoehe + "px";
                    const c = leinwand.getContext("2d");
                    c.scale(aufloesung, aufloesung);
                    c.strokeStyle = farbe;
                    c.lineWidth = 4;
                    c.lineCap = "round";
                    c.beginPath();
                    c.moveTo(breite * 0.03, 2);
                    c.quadraticCurveTo(breite / 2, 22, breite * 0.97, 2);
                    c.stroke();
                    bild.replaceWith(leinwand);
                });
            },
        });
        if (i > 0) pdf.addPage();
        pdf.addImage(leinwand.toDataURL("image/jpeg", qualitaet), "JPEG", 0, 0, 210, 297);
    }
    return pdf.output("blob");
}

// Fingerabdruck des Blatt-Inhalts: gleich bleibende Blätter = gleicher Wert (das PDF selbst
// enthält einen Zeitstempel und wäre jedes Mal anders – so werden Doppelungen trotzdem erkannt).
function ws_fingerabdruck(seiten){
    const text = seiten.map(s => s.dataset.blatt + ":" + s.querySelector(".ws-innen").innerHTML).join("|");
    let a = 0x811c9dc5, b = 0x01000193 ^ text.length;
    for (let i = 0; i < text.length; i++){
        const c = text.charCodeAt(i);
        a = Math.imul(a ^ c, 0x01000193) >>> 0;
        b = Math.imul(b ^ c, 0x5bd1e995) >>> 0;
    }
    return "ws-" + a.toString(16).padStart(8, "0") + b.toString(16).padStart(8, "0") + "-" + text.length;
}

async function ws_speichern(){
    const knopf = document.getElementById("ws-sp-knopf");
    const statusEl = document.getElementById("ws-sp-status");
    const status = (text, art) => {
        statusEl.className = art === "ok" ? "ws-sp-ok" : (art === "fehler" ? "ws-sp-fehler" : "");
        statusEl.innerHTML = text;
    };

    const seiten = ws_sichtbareSeiten();
    if (!seiten.length){ status("Bitte mindestens ein Blatt anhaken.", "fehler"); return; }

    const titel = document.getElementById("ws-sp-titel").value.trim() || "Worterarbeitung";
    const blattNamen = Object.fromEntries(WS_BLAETTER.map(b => [b.nr, b.name]));
    const beschreibung = `${seiten.length} Blatt/Blätter: ` + seiten.map(s => blattNamen[s.dataset.blatt]).join(", ") +
        ". Lernwörter: " + ws_letzteWoerter.map(w => w.silben.join("-")).join(", ");

    knopf.disabled = true;
    try {
        const pdf = await ws_pdfErzeugen(seiten, t => status(`<i class="fa-solid fa-spinner fa-spin"></i> ${t}`));
        status(`<i class="fa-solid fa-spinner fa-spin"></i> Wird gespeichert …`);

        const daten = await mat_hochladen(pdf, {
            titel: titel,
            ordner: document.getElementById("ws-sp-ordner").value.trim() || "Worterarbeitung",
            klasse: document.getElementById("ws-sp-klasse").value,
            kind: document.getElementById("ws-sp-kind").value,
            bereich: "symptom",
            beschreibung: beschreibung,
            inhalt_hash: ws_fingerabdruck(seiten),
        });
        status(mat_erfolgsText(daten), "ok");
    } catch (fehler) {
        console.error(fehler);
        status("⚠️ " + ws_esc(fehler.message || fehler), "fehler");
    } finally {
        knopf.disabled = false;
    }
}

// Druckt nur die ausgewählten Blätter, jedes auf eine eigene A4-Seite
function ws_drucken(seitenListe){
    const seiten = (Array.isArray(seitenListe) ? seitenListe : [...document.querySelectorAll("#ws-blaetter .ws-seite")])
        .filter(s => !s.classList.contains("ws-aus"));
    if (!seiten.length){ alert("Bitte mindestens ein Blatt auswählen."); return; }
    seiten.forEach(s => ws_einpassen(s));

    const rahmen = document.createElement("iframe");
    rahmen.style.cssText = "position:fixed; right:0; bottom:0; width:0; height:0; border:0;";
    document.body.appendChild(rahmen);

    const doc = rahmen.contentDocument;
    doc.open();
    doc.write(`<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>Worterarbeitung</title>
        <link href="https://fonts.googleapis.com/css2?family=Andika:wght@400;700&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
        <style>${document.getElementById("ws-stil").textContent}
        @page{ size:A4; margin:0; }
        html, body{ margin:0; padding:0; background:#fff; }
        .ws-seite{ box-shadow:none; break-after:page; page-break-after:always; }
        .ws-seite:last-child{ break-after:auto; page-break-after:auto; }
        </style></head><body>${seiten.map(s => s.outerHTML).join("")}</body></html>`);
    doc.close();

    let gedruckt = false;
    const los = () => {
        if (gedruckt) return;
        gedruckt = true;
        rahmen.contentWindow.focus();
        rahmen.contentWindow.print();
        setTimeout(() => rahmen.remove(), 1500);
    };

    // Erst drucken, wenn die Schrift Andika im Druckfenster geladen ist (spätestens nach 3 Sekunden)
    const schriftLink = doc.querySelector("link");
    const schriftLaden = () => {
        const fonts = doc.fonts;
        if (!fonts || !fonts.load){ setTimeout(los, 300); return; }
        Promise.all([fonts.load("400 30px Andika"), fonts.load("700 30px Andika")])
            .then(() => setTimeout(los, 150))
            .catch(() => setTimeout(los, 150));
    };
    if (schriftLink){
        schriftLink.addEventListener("load", schriftLaden);
        schriftLink.addEventListener("error", () => setTimeout(los, 150));
    } else {
        schriftLaden();
    }
    setTimeout(los, 3000);
}

sy_typWechsel();
ws_wahlAufbauen();

/* ===============================================================
   Für alle Bereiche: Blätter direkt bearbeiten & in Materialien speichern
   =============================================================== */

const MAT_BEREICHE = {
    aufmerksamkeit: "Aufmerksamkeit/Konzentration",
    optdiff: "Optische Differenzierung",
    optged:  "Optisches Gedächtnis",
    optser:  "Optische Serialität",
    akdiff:  "Akustische Differenzierung",
    akged:   "Akustisches Gedächtnis",
    akser:   "Akustische Serialität",
    symptom: "Symptomtraining",
    koerper: "Körperschema",
    raum:    "Raumorientierung",
    foerderplan: "Förderpläne & Stunden",
    sonstiges: "Sonstiges",
};

let mat_aktuellerBereich = null;

function mat_textHash(text){
    let a = 0x811c9dc5, b = 0x01000193 ^ text.length;
    for (let i = 0; i < text.length; i++){
        const c = text.charCodeAt(i);
        a = Math.imul(a ^ c, 0x01000193) >>> 0;
        b = Math.imul(b ^ c, 0x5bd1e995) >>> 0;
    }
    return "ws-" + a.toString(16).padStart(8, "0") + b.toString(16).padStart(8, "0") + "-" + text.length;
}

// Gemeinsamer Upload zu material-speichern.php (Serie und Einzelblätter)
async function mat_hochladen(pdf, felder){
    const formular = new FormData();
    formular.append("pdf", pdf, "arbeitsblatt.pdf");
    Object.entries(felder).forEach(([k, v]) => formular.append(k, v ?? ""));
    const antwort = await fetch("material-speichern.php", { method: "POST", body: formular, credentials: "same-origin" });
    let daten;
    try { daten = await antwort.json(); }
    catch (e) { throw new Error("Der Server hat unerwartet geantwortet. Liegt material-speichern.php im gleichen Ordner wie lrs.php?"); }
    if (!daten.ok) throw new Error(daten.fehler || "Speichern fehlgeschlagen.");
    return daten;
}

function mat_erfolgsText(daten){
    let text = daten.schon_da
        ? `✅ Dieses Blatt ist schon in den Materialien („${ws_esc(daten.titel)}“) – nichts doppelt gespeichert.`
        : `✅ Gespeichert in den <a href="materialien.php" target="_blank">Materialien</a>.`;
    if (daten.kind){
        const link = `<a href="trainingshefte.php?kind=${encodeURIComponent(daten.kind)}" target="_blank">Trainingsheft ${ws_esc(daten.kind)}</a>`;
        text += daten.kind_status === "schon_zugewiesen" ? ` War schon im ${link}.` : ` Dem ${link} zugewiesen.`;
    }
    if (daten.hinweis) text += " " + ws_esc(daten.hinweis);
    return text;
}

// 0) Blätter neu ordnen: Pille + Namenszeile oben, Inhalt in einem Rahmen, Fußzeile unten
function blatt_aufbauen(){
    document.querySelectorAll(".blatt").forEach(blatt => {
        if (blatt.querySelector(".blatt-innen")) return;
        const kopf = blatt.querySelector(".blatt-kopf");
        const koerper = blatt.querySelector(".blatt-koerper");
        if (!kopf || !koerper) return;

        const oben = document.createElement("div");
        oben.className = "blatt-oben";
        const autor = kopf.querySelector(".autor-zeile");
        if (autor) oben.appendChild(autor);
        const name = koerper.querySelector(".blatt-namenszeile");
        if (name) oben.appendChild(name);
        kopf.insertBefore(oben, kopf.firstChild);

        const innen = document.createElement("div");
        innen.className = "blatt-innen";
        const rahmen = document.createElement("div");
        rahmen.className = "blatt-rahmen";
        const fuss = koerper.querySelector(".blatt-fusszeile");
        blatt.insertBefore(innen, kopf);
        innen.appendChild(kopf);
        innen.appendChild(rahmen);
        rahmen.appendChild(koerper);
        if (fuss) innen.appendChild(fuss);

        // Bei jeder neuen Erstellung, Änderung oder Anzeige neu einpassen
        let timer = null;
        const neu = () => { clearTimeout(timer); timer = setTimeout(() => { blatt_aufgabenNummern(blatt); blatt_einpassen(blatt); }, 150); };
        new MutationObserver(neu).observe(innen, { childList: true, subtree: true, characterData: true });
        new MutationObserver(neu).observe(blatt, { attributes: true, attributeFilter: ["style"] });
    });
}

// Aufgaben-Überschriften wie "1. Kreuze …" bekommen einen blauen Nummernkreis
function blatt_aufgabenNummern(blatt){
    blatt.querySelectorAll(".blatt-koerper p, .blatt-koerper h4").forEach(el => {
        if (el.classList.contains("blatt-aufgabe") || el.closest("td, li")) return;
        if (el.tagName === "P" && el.closest(".luecken-text")) return; // Lückensätze nicht anfassen
        if (el.children.length > 1 || el.querySelector("button, input, span")) return;
        const treffer = el.textContent.trim().match(/^(\d{1,2})\.\s+([\s\S]+)$/);
        if (!treffer) return;
        const fett = el.tagName === "H4" || parseInt(getComputedStyle(el).fontWeight, 10) >= 700;
        if (!fett) return;
        el.classList.add("blatt-aufgabe");
        el.innerHTML = `<span class="blatt-nummer" contenteditable="false">${treffer[1]}</span><span>${ws_esc(treffer[2])}</span>`;
    });
}

// Inhalt so skalieren, dass er die Seite füllt: wenig Inhalt wird größer, viel Inhalt kleiner
const BLATT_MIN = 0.5, BLATT_MAX = 1.5;
function blatt_einpassen(blatt){
    if (!blatt || blatt.style.display === "none" || !blatt.offsetParent) return;
    const rahmen = blatt.querySelector(".blatt-rahmen");
    const koerper = blatt.querySelector(".blatt-koerper");
    if (!rahmen || !koerper) return;
    const H = rahmen.clientHeight, B = rahmen.clientWidth;
    if (!H || !B) return;

    koerper.style.transform = "";
    koerper.style.height = "auto";
    koerper.style.width = B + "px";
    koerper.style.gap = "";

    // Der gelbe Arbeitsauftrag soll beim Vergrößern nicht größer als ca. 24 px wirken
    const auftrag = koerper.querySelector(".anweisung");
    const auftragGroesse = fak => { if (auftrag) auftrag.style.fontSize = Math.min(20, 24 / fak) + "px"; };
    auftragGroesse(1);

    let f = 1, roh = 1;
    for (let i = 0; i < 6; i++){
        auftragGroesse(f);
        const noetig = koerper.scrollHeight;
        roh = H / noetig;                  // Faktor, mit dem der Inhalt bei aktueller Breite genau passt
        const neu = Math.min(BLATT_MAX, Math.max(BLATT_MIN, roh));
        if (Math.abs(neu - f) < 0.004) { f = neu; break; }
        f = neu;
        koerper.style.width = (B / f) + "px";
    }
    // Sicherheit: nie über die Seite hinaus
    const endHoehe = koerper.scrollHeight * f;
    if (endHoehe > H + 1 && f > BLATT_MIN){
        f = Math.max(BLATT_MIN, f * H / endHoehe);
        koerper.style.width = (B / f) + "px";
    }

    auftragGroesse(f);
    koerper.style.transformOrigin = "top left";
    koerper.style.transform = `scale(${f.toFixed(4)})`;

    koerper.style.height = (H / f) + "px";

    // Warnung, wenn selbst die kleinste Stufe nicht reicht
    const leiste = document.getElementById(blatt.id.replace("ausgabe-", "akt-"));
    if (leiste){
        let warnung = leiste.querySelector(".blatt-warnung");
        const zuViel = koerper.scrollHeight * f > H + 2;
        if (zuViel && !warnung){
            warnung = document.createElement("span");
            warnung.className = "blatt-warnung";
            leiste.insertBefore(warnung, leiste.querySelector(".mat-knopf"));
        }
        if (warnung) warnung.textContent = zuViel ? "⚠️ Zu viel Inhalt für eine Seite – „Umfang“ kleiner wählen" : "";
    }
}

function blatt_alleEinpassen(){
    document.querySelectorAll(".blatt").forEach(blatt_einpassen);
}

// 1) Alle Blätter bearbeitbar machen; Vorlese-Knöpfe bleiben klickbar und werden nicht mitbearbeitet
function mat_bearbeitbarMachen(){
    document.querySelectorAll(".blatt").forEach(blatt => {
        blatt.querySelectorAll(".blatt-kopf, .blatt-koerper, .blatt-fusszeile").forEach(teil => {
            teil.contentEditable = "true";
            teil.spellcheck = false;
        });
        const knoepfeSchuetzen = () => blatt.querySelectorAll("button").forEach(b => b.contentEditable = "false");
        knoepfeSchuetzen();
        new MutationObserver(knoepfeSchuetzen).observe(blatt, { childList: true, subtree: true });
    });
}

// 2) In jede Aktionsleiste: Hinweis + "In Materialien speichern"
function mat_knoepfeEinfuegen(){
    Object.keys(MAT_BEREICHE).forEach(bereich => {
        const leiste = document.getElementById("akt-" + bereich);
        if (!leiste || leiste.querySelector(".mat-knopf")) return;

        const tipp = document.createElement("span");
        tipp.className = "blatt-tipp";
        tipp.innerHTML = '<i class="fa-solid fa-pen"></i> Text auf dem Blatt anklicken, um ihn zu ändern';
        leiste.prepend(tipp);

        const knopf = document.createElement("button");
        knopf.className = "btn sekundaer klein mat-knopf";
        knopf.innerHTML = '<i class="fa-solid fa-folder-plus"></i> In Materialien speichern';
        knopf.addEventListener("click", () => mat_oeffnen(bereich));
        const drucken = [...leiste.querySelectorAll("button")].find(b => b.textContent.includes("Drucken"));
        leiste.insertBefore(knopf, drucken || null);
    });
}

let mat_serie = null; // gesetzt, wenn eine ganze Funktions-Serie gespeichert wird

function mat_oeffnen(bereich){
    const blatt = document.getElementById("ausgabe-" + bereich);
    if (!blatt || blatt.style.display === "none") return;
    mat_aktuellerBereich = bereich;
    mat_serie = null;

    const ueberschrift = (blatt.querySelector(".blatt-kopf h3")?.textContent || "").trim();
    document.getElementById("mat-bereich-text").textContent = MAT_BEREICHE[bereich];
    document.getElementById("mat-titel").value = ueberschrift && ueberschrift !== MAT_BEREICHE[bereich]
        ? `${MAT_BEREICHE[bereich]} – ${ueberschrift}` : MAT_BEREICHE[bereich];
    document.getElementById("mat-ordner").value = MAT_BEREICHE[bereich];
    document.getElementById("mat-klasse").value = document.getElementById("g-klasse").value;
    document.getElementById("mat-status").textContent = "";
    document.getElementById("mat-status").className = "";
    document.getElementById("mat-dialog").style.display = "flex";
    document.getElementById("mat-titel").focus();
}

function mat_schliessen(){
    document.getElementById("mat-dialog").style.display = "none";
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape" && document.getElementById("mat-dialog").style.display !== "none") mat_schliessen();
});

// 3) Blatt in A4-Breite nachbauen, als Bild erfassen und als PDF (meist 1 Seite) ausgeben
async function mat_blattAlsPdf(blatt, status){
    await ws_skriptLaden("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js", () => window.html2canvas);
    await ws_skriptLaden("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js", () => window.jspdf);
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    if (document.activeElement) document.activeElement.blur();
    // letzte Änderungen sofort einpassen (nicht erst nach der kurzen Wartezeit)
    blatt_aufgabenNummern(blatt);
    blatt_einpassen(blatt);

    // Kopie des A4-Blatts (Größe und Einpassung bleiben genau wie auf dem Bildschirm)
    const halter = document.createElement("div");
    halter.style.cssText = "position:absolute; left:-10000px; top:0; background:#fff;";
    const kopie = blatt.cloneNode(true);
    kopie.removeAttribute("id");
    kopie.style.boxShadow = "none";
    kopie.style.margin = "0";
    kopie.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));
    kopie.querySelectorAll("button").forEach(b => b.remove());
    kopie.querySelectorAll("[contenteditable]").forEach(el => el.removeAttribute("contenteditable"));
    halter.appendChild(kopie);
    document.body.appendChild(halter);

    try {
        // Eingebettete Grafiken (Tiere, Punkte-Bild …) als Bild mit fester Größe – das erfasst die Umwandlung zuverlässig
        // Maße ohne die Einpassung (scale) des Inhalts, sonst würden Grafiken doppelt skaliert
        const inhaltKopie = kopie.querySelector(".blatt-koerper");
        const skala = parseFloat(((inhaltKopie && inhaltKopie.style.transform) || "").replace(/[^\d.]/g, "")) || 1;
        kopie.querySelectorAll("svg").forEach(svg => {
            const echt = svg.getBoundingClientRect();
            const faktor = inhaltKopie && inhaltKopie.contains(svg) ? skala : 1;
            const r = { width: echt.width / faktor, height: echt.height / faktor };
            if (!r.width || !r.height) return;
            const klon = svg.cloneNode(true);
            klon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            klon.setAttribute("width", r.width);
            klon.setAttribute("height", r.height);
            // Text in Grafiken (z. B. Punkte-Nummern): serifenlose Schrift wie auf dem Bildschirm
            klon.querySelectorAll("text").forEach(t => { if (!t.getAttribute("font-family")) t.setAttribute("font-family", "Nunito, Arial, Helvetica, sans-serif"); });
            const bild = document.createElement("img");
            bild.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(klon));
            bild.style.cssText = `width:${r.width}px; height:${r.height}px; display:${getComputedStyle(svg).display === "block" ? "block" : "inline-block"}; margin:${getComputedStyle(svg).margin}; vertical-align:middle;`;
            svg.replaceWith(bild);
        });
        await Promise.all([...kopie.querySelectorAll("img")].map(i => i.complete ? null : new Promise(f => { i.onload = i.onerror = f; })));

        status("Blatt wird umgewandelt …");
        const leinwand = await window.html2canvas(kopie, { scale: PDF_AUFLOESUNG, backgroundColor: "#ffffff", logging: false, useCORS: true });

        // Das Blatt ist genau eine A4-Seite
        const pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
        pdf.addImage(leinwand.toDataURL("image/jpeg", PDF_QUALITAET), "JPEG", 0, 0, 210, 297);
        return { pdf: pdf.output("blob"), inhalt: kopie.innerHTML };
    } finally {
        halter.remove();
    }
}

// Große Mappen: erst kompakter erzeugen, sonst in mehrere Teile aufteilen
// (viele Webhoster nehmen nur 2 MB pro Upload an)
const MAT_GRENZE = 1.85 * 1024 * 1024;
function mat_inhaltText(seiten){
    return seiten.map(s => (s.classList.contains("ws-loesung") ? "L" : "") + s.dataset.blatt + ":" + s.querySelector(".ws-innen").innerHTML).join("|");
}
async function mat_serieTeilen(seiten, status){
    let pdf = await ws_pdfErzeugen(seiten, t => status(t));
    if (pdf.size <= MAT_GRENZE) return [{ pdf, inhalt: mat_inhaltText(seiten), seiten }];
    status("Die Mappe ist groß – sie wird kompakter erstellt …");
    pdf = await ws_pdfErzeugen(seiten, t => status(t), 1.25, 0.68);
    if (pdf.size <= MAT_GRENZE || seiten.length === 1) return [{ pdf, inhalt: mat_inhaltText(seiten), seiten }];
    const anzahl = Math.ceil(pdf.size / MAT_GRENZE * 1.15);
    const proTeil = Math.ceil(seiten.length / anzahl);
    const teile = [];
    for (let i = 0; i < seiten.length; i += proTeil){
        const gruppe = seiten.slice(i, i + proTeil);
        const teilPdf = await ws_pdfErzeugen(gruppe, t => status(`Teil ${teile.length + 1}: ${t}`), 1.25, 0.68);
        teile.push({ pdf: teilPdf, inhalt: mat_inhaltText(gruppe), seiten: gruppe });
    }
    return teile;
}
async function mat_teileHochladen(teile, bereich, status){
    const titel = document.getElementById("mat-titel").value.trim() || MAT_BEREICHE[bereich];
    const meldungen = [];
    for (let k = 0; k < teile.length; k++){
        status(`Teil ${k + 1} von ${teile.length} wird gespeichert …`);
        const daten = await mat_hochladen(teile[k].pdf, {
            titel: `${titel} (Teil ${k + 1} von ${teile.length})`,
            ordner: document.getElementById("mat-ordner").value.trim() || MAT_BEREICHE[bereich],
            klasse: document.getElementById("mat-klasse").value,
            kind: document.getElementById("mat-kind").value,
            bereich: bereich,
            beschreibung: `Aus dem Leuchtturm-Generator · ${teile[k].seiten.length} Blätter`,
            inhalt_hash: mat_textHash(bereich + "|" + teile[k].inhalt),
        });
        meldungen.push(daten);
    }
    const kind = meldungen.find(d => d.kind);
    status(`✅ In ${teile.length} Teilen gespeichert (jedes PDF unter 2 MB) – <a href="materialien.php" target="_blank">Materialien</a>` +
        (kind ? `, im <a href="trainingshefte.php?kind=${encodeURIComponent(kind.kind)}" target="_blank">Trainingsheft ${ws_esc(kind.kind)}</a>` : "") + ".", "ok");
}

async function mat_speichern(){
    const bereich = mat_aktuellerBereich;
    const blatt = document.getElementById("ausgabe-" + bereich);
    const knopf = document.getElementById("mat-knopf");
    const statusEl = document.getElementById("mat-status");
    const status = (text, art) => {
        statusEl.className = art === "ok" ? "ws-sp-ok" : (art === "fehler" ? "ws-sp-fehler" : "");
        statusEl.innerHTML = art ? text : `<i class="fa-solid fa-spinner fa-spin"></i> ${text}`;
    };
    if (!blatt && !mat_serie) return;

    knopf.disabled = true;
    try {
        let pdf, inhalt;
        if (mat_serie){
            // Serie: alle angehakten Blätter als ein PDF
            const seiten = fs_sichtbareSeiten(mat_serie);
            if (!seiten.length) throw new Error("Bitte mindestens ein Blatt anhaken.");
            const teile = await mat_serieTeilen(seiten, status);
            if (teile.length > 1){ await mat_teileHochladen(teile, bereich, status); return; }
            pdf = teile[0].pdf;
            inhalt = teile[0].inhalt;
        } else {
            ({ pdf, inhalt } = await mat_blattAlsPdf(blatt, status));
        }
        status("Wird gespeichert …");
        const g = liesGlobal();
        const daten = await mat_hochladen(pdf, {
            titel: document.getElementById("mat-titel").value.trim() || MAT_BEREICHE[bereich],
            ordner: document.getElementById("mat-ordner").value.trim() || MAT_BEREICHE[bereich],
            klasse: document.getElementById("mat-klasse").value,
            kind: document.getElementById("mat-kind").value,
            bereich: bereich,
            beschreibung: `Aus dem Leuchtturm-Generator · Schwierigkeit: ${g.schwierigkeit} · Umfang: ${g.umfang}`,
            inhalt_hash: mat_textHash(bereich + "|" + inhalt),
        });
        status(mat_erfolgsText(daten), "ok");
    } catch (fehler) {
        console.error(fehler);
        status("⚠️ " + ws_esc(fehler.message || fehler), "fehler");
    } finally {
        knopf.disabled = false;
    }
}

/* ===============================================================
   Funktions-Serien: mehrere unterschiedliche, seitenfüllende Blätter
   je Funktionsbereich (wie die Worterarbeitung im Symptomtraining)
   =============================================================== */

const FS_FARBEN = [
    { n: "rot", c: "#D64545" }, { n: "blau", c: "#2E6FD1" }, { n: "grün", c: "#3E9D5A" },
    { n: "gelb", c: "#E8B900" }, { n: "lila", c: "#8E5BC7" },
];
const FS_FORMEN = ["kreis", "quadrat", "dreieck", "raute", "ring"];

let fs_zustand = {};   // je Bereich: Aufgaben-Erzeuger der einzelnen Blätter

function fs_stufe(ctx){ return { leicht: 0, mittel: 1, schwer: 2 }[ctx.g.schwierigkeit] ?? 1; }
function fs_zufallsForm(){ return { form: zufallsElement(FS_FORMEN), farbe: zufallsElement(FS_FARBEN) }; }
function fs_gleich(a, b){ return a.form === b.form && a.farbe.c === b.farbe.c; }

// Eine farbige Form (Kreis, Quadrat, Dreieck, Raute, Ring)
function fs_form(form, farbe, gr = 30){
    if (form === "dreieck"){
        return `<span class="fs-form fs-dreieck" style="border-left-width:${gr / 2}px; border-right-width:${gr / 2}px; border-bottom-width:${Math.round(gr * 0.87)}px; border-bottom-color:${farbe};"></span>`;
    }
    if (form === "ring"){
        return `<span class="fs-form fs-ring" style="width:${gr}px; height:${gr}px; border-width:${Math.max(4, Math.round(gr / 6))}px; border-color:${farbe};"></span>`;
    }
    const art = form === "kreis" ? "fs-kreis" : (form === "raute" ? "fs-raute" : "");
    return `<span class="fs-form ${art}" style="width:${gr}px; height:${gr}px; background:${farbe};${form === "quadrat" ? " border-radius:4px;" : ""}"></span>`;
}
function fs_f(x, gr){ return fs_form(x.form, x.farbe.c, gr); }

// Umriss zum Ausmalen
function fs_umriss(form, gr = 44){
    const stil = { kreis: "border-radius:50%;", quadrat: "border-radius:4px;", raute: "transform:rotate(45deg) scale(.8);", rechteck: "" }[form];
    const breite = form === "rechteck" ? Math.round(gr * 1.5) : gr;
    return `<span class="fs-umriss" style="width:${breite}px; height:${gr}px; ${stil}"></span>`;
}

function fs_wortGroesse(wort, platz, max = 30){
    return Math.max(16, Math.min(max, Math.floor(platz / (Math.max(3, wort.length) * 0.62))));
}

// Eine Seite der Serie: Kopf (Pille, Name, Titel) · Aufgaben · Fußzeile
function fs_seite(bereich, nr, titel, inhalt, extra = {}){
    const s = FS_SERIEN[bereich];
    const label = extra.label || s.label, afs = extra.afs || s.afs;
    let kopf = ws_kopf(titel, label);
    if (extra.kopfRechts != null) kopf = kopf.replace('<div class="ws-name">Name: <span class="ws-linie"></span></div>', `<div class="ws-name">${extra.kopfRechts}</div>`);
    let html = ws_seite(nr, `${kopf}${inhalt}<!--/ws-inhalt-->
        <div class="ws-fuss"><div>Leuchtturm · ${label}</div><div>${afs.startsWith("AFS") || extra.ohneAfs ? afs : "AFS · " + afs}</div></div>`);
    // ältere Schüler: sachlichere Gestaltung
    const reif = extra.reif != null ? extra.reif : (typeof s.reif === "function" ? s.reif() : s.reif);
    if (reif) html = html.replace('<div class="ws-seite"', '<div class="ws-seite fs-reif"');
    // Seiten mit festem Raster (Kärtchen, Pass …) nicht über 100 % vergrößern
    if (extra.max) html = html.replace('<div class="ws-seite', `<div data-max="${extra.max}" class="ws-seite`);
    if (extra.info) html = html.replace('class="ws-seite', 'class="ws-seite ws-info');
    return html;
}

// Gemeinsamer Zufalls-Vorrat für ein Erstellen (Wörter aus Thema/Klasse)
function fs_ctx(){
    const g = liesGlobal();
    const pool = wortpool();
    let vorrat = [];
    return {
        g, pool,
        wort(filter){
            for (let versuch = 0; versuch < 200; versuch++){
                if (!vorrat.length) vorrat = mische(pool);
                const w = vorrat.pop();
                if (!filter || filter(w)) return w;
            }
            return zufallsElement(pool);
        },
    };
}

function fs_seiten(bereich){ return [...document.querySelectorAll(`#fs-blaetter-${bereich} .ws-seite`)]; }
function fs_sichtbareSeiten(bereich){ return fs_seiten(bereich).filter(s => !s.classList.contains("ws-aus")); }

async function fs_erstellen(bereich){
    const s = FS_SERIEN[bereich];
    const ausgabe = document.getElementById("fs-ausgabe-" + bereich);

    const ctx = fs_ctx();
    if (s.ctxExtra) Object.assign(ctx, s.ctxExtra());
    if (s.pruefen){
        const problem = s.pruefen(ctx);
        if (problem){ alert(problem); ausgabe.style.display = "none"; return; }
    }
    ausgabe.style.display = "block";
    // Mappen (Stunde, Förderpaket, Kärtchen …): Blätter werden erst jetzt festgelegt
    if (s.dynamisch){
        s.blaetter = s.dynamisch(ctx);
        const wahl = document.getElementById("fs-wahl-" + bereich);
        if (wahl) wahl.innerHTML = fs_wahlHtml(s);
    }
    const box = document.getElementById("fs-blaetter-" + bereich);
    const erzeuger = {};
    fs_zustand[bereich] = { erzeuger, loesung: false };

    if (s.eigen){
        // Seiten, die sich selbst aufteilen (z. B. ein langer Lesetext)
        box.innerHTML = "";
        await s.eigen(box, ctx);
        fs_blattwahl(bereich);
        fs_loesungKnopf(bereich);
        return;
    }

    const html = s.blaetter.map(b => {
        const r = b.bau(ctx);
        erzeuger[b.nr] = r;
        if (r.seite) return r.seite.replace(/data-blatt="[^"]*"/, `data-blatt="${b.nr}"`);   // fertige Seite (z. B. Worterarbeitung)
        return fs_seite(bereich, b.nr, r.titel, r.html, { ...(b.extra || {}), ...(r.extra || {}) });
    }).join("");

    box.innerHTML = html;
    fs_loesungKnopf(bereich);
    if (box.querySelector(".ws-spur")) ws_spurAusrichten();

    box.querySelectorAll(".ws-innen").forEach(innen => {
        let timer = null;
        innen.addEventListener("input", () => {
            clearTimeout(timer);
            timer = setTimeout(() => ws_einpassen(innen.closest(".ws-seite")), 500);
        });
    });

    fs_blattwahl(bereich);
    if (document.fonts && document.fonts.load){
        Promise.all([document.fonts.load("400 30px Andika"), document.fonts.load("700 30px Andika")])
            .catch(() => {})
            .then(() => { if (box.querySelector(".ws-spur")) ws_spurAusrichten(); fs_alleFuellen(bereich, true); });
    }
}

// Lösungen: Knopf nur zeigen, wenn die Blätter Lösungen enthalten
const FS_LOESUNG_SEL = ".fs-loes, .fs-lm, .fs-weg, .fs-lfill, .fs-ls";
function fs_loesungKnopf(bereich){
    const ausgabe = document.getElementById("fs-ausgabe-" + bereich);
    if (!ausgabe) return;
    const an = !!(fs_zustand[bereich] && fs_zustand[bereich].loesung);
    const seiten = fs_seiten(bereich);
    seiten.forEach(seite => {
        seite.classList.toggle("ws-loesung", an);
        seite.classList.toggle("ws-ohneloesung", !seite.querySelector(FS_LOESUNG_SEL));
    });
    const hat = seiten.some(seite => seite.querySelector(FS_LOESUNG_SEL));
    ausgabe.querySelectorAll(".fs-loes-knopf").forEach(k => k.style.display = hat ? "" : "none");
    const text = ausgabe.querySelector(".fs-loes-knopf span");
    if (text) text.textContent = an ? "Lösungen ausblenden" : "Lösungen zeigen";
}
function fs_loesungUmschalten(bereich){
    const z = fs_zustand[bereich];
    if (!z) return;
    z.loesung = !z.loesung;
    fs_loesungKnopf(bereich);
}
// Druckt die Blätter und dahinter die zugehörigen Lösungsblätter
function fs_mitLoesungDrucken(bereich){
    const seiten = fs_sichtbareSeiten(bereich);
    seiten.forEach(seite => ws_einpassen(seite));
    const loesungen = seiten.filter(seite => seite.querySelector(FS_LOESUNG_SEL)).map(seite => {
        const kopie = seite.cloneNode(true);
        kopie.classList.add("ws-loesung");
        return kopie;
    });
    ws_drucken([...seiten.map(seite => { const k = seite.cloneNode(true); k.classList.remove("ws-loesung"); return k; }), ...loesungen]);
}

function fs_neuMischen(bereich){
    if (!fs_zustand[bereich]) return;
    if (!confirm("Neu mischen erstellt die Blätter neu – Änderungen, die du direkt auf den Blättern gemacht hast, gehen dabei verloren. Fortfahren?")) return;
    fs_erstellen(bereich);
}

function fs_blattwahl(bereich){
    const an = [...document.querySelectorAll(`.fs-wahl[data-bereich="${bereich}"]:checked`)].map(c => c.value);
    const seiten = fs_seiten(bereich);
    seiten.forEach(s => s.classList.toggle("ws-aus", !an.includes(s.dataset.blatt)));
    const sichtbar = seiten.filter(s => !s.classList.contains("ws-aus"));
    sichtbar.forEach((s, i) => {
        s.querySelectorAll(".ws-nr").forEach(el => el.textContent = i + 1);
        s.querySelectorAll(".ws-gesamt").forEach(el => el.textContent = sichtbar.length);
    });
    fs_alleFuellen(bereich, false);
}

function fs_alleFuellen(bereich, neu){
    fs_sichtbareSeiten(bereich).forEach(seite => {
        if (neu || !seite.dataset.gefuellt) fs_fuellen(bereich, seite);
        ws_einpassen(seite);
    });
    fs_loesungKnopf(bereich);   // Lösungen stecken oft erst in den nachgefüllten Reihen
}

// Fügt so lange Aufgaben-Reihen hinzu, bis die Seite voll ist (und nimmt eine zurück, wenn es zu viel wird)
function fs_fuellen(bereich, seite){
    const r = fs_zustand[bereich] && fs_zustand[bereich].erzeuger[seite.dataset.blatt];
    const box = seite.querySelector(".fs-fuell");
    const rahmen = seite.querySelector(".ws-rahmen");
    const inhalt = seite.querySelector(".ws-inhalt");
    if (!r || !r.zeile || !box || !rahmen || !rahmen.clientHeight) return;

    inhalt.style.transform = "";
    inhalt.style.height = "auto";
    inhalt.style.width = rahmen.clientWidth + "px";
    const ziel = rahmen.clientHeight - 6;
    const schritt = r.schritt || 1;
    const max = r.max || 60;

    let i = box.children.length;
    let sicherung = 0;
    while (inhalt.scrollHeight < ziel && i < max && sicherung++ < 120){
        let neu = "";
        for (let k = 0; k < schritt; k++) neu += r.zeile(i++) || "";
        if (!neu) break;                    // keine weiteren Aufgaben möglich
        box.insertAdjacentHTML("beforeend", neu);
    }
    while (inhalt.scrollHeight > ziel && box.children.length > schritt){
        for (let k = 0; k < schritt && box.lastElementChild; k++) box.lastElementChild.remove();
    }
    if (box.querySelector(".ws-spur")) ws_spurAusrichten();
    seite.dataset.gefuellt = "1";
}

function fs_speichernOeffnen(bereich){
    if (!fs_sichtbareSeiten(bereich).length) return;
    const s = FS_SERIEN[bereich];
    mat_aktuellerBereich = s.mat;
    mat_serie = bereich;
    const n = fs_sichtbareSeiten(bereich).length;
    const name = s.speicherName ? s.speicherName() : MAT_BEREICHE[s.mat];
    const loesung = fs_zustand[bereich] && fs_zustand[bereich].loesung;
    document.getElementById("mat-bereich-text").textContent = MAT_BEREICHE[s.mat];
    document.getElementById("mat-titel").value = s.einzelTitel
        ? name + (loesung ? " – Lösungen" : "")
        : `${name} – ${loesung ? "Lösungen" : "Serie"} (${n} ${n === 1 ? "Blatt" : "Blätter"})`;
    document.getElementById("mat-ordner").value = s.ordner || MAT_BEREICHE[s.mat];
    document.getElementById("mat-klasse").value = document.getElementById("g-klasse").value;
    if (s.kind){ const k = s.kind(); if (k && [...document.getElementById("mat-kind").options].some(o => o.value === k)) document.getElementById("mat-kind").value = k; }
    document.getElementById("mat-status").textContent = "";
    document.getElementById("mat-status").className = "";
    document.getElementById("mat-dialog").style.display = "flex";
    document.getElementById("mat-titel").focus();
}

function fs_wahlHtml(s){
    return `<strong style="font-size:13px; color:var(--nacht);">Blätter:</strong>` +
        (s.blaetter || []).map(b => `<label title="${ws_esc(b.name)}"><input type="checkbox" class="fs-wahl" data-bereich="${s.key}" value="${b.nr}" checked onchange="fs_blattwahl('${s.key}')"> ${b.nr} ${ws_esc(b.kurz)}</label>`).join("");
}

function fs_ausgabeAnlegen(s){
    const ausgabe = document.createElement("div");
    ausgabe.id = "fs-ausgabe-" + s.key;
    ausgabe.style.display = "none";
    ausgabe.innerHTML = `
        <div class="ws-werkzeug">
            <div class="ws-blattwahl" id="fs-wahl-${s.key}">${fs_wahlHtml(s)}</div>
            <div class="ws-knoepfe">
                ${s.ohneMischen ? "" : `<button class="btn sekundaer klein" onclick="fs_neuMischen('${s.key}')"><i class="fa-solid fa-shuffle"></i> Neu mischen</button>`}
                <button class="btn sekundaer klein fs-loes-knopf" style="display:none;" onclick="fs_loesungUmschalten('${s.key}')"><i class="fa-solid fa-key"></i> <span>Lösungen zeigen</span></button>
                <button class="btn sekundaer klein" onclick="fs_speichernOeffnen('${s.key}')"><i class="fa-solid fa-folder-plus"></i> In Materialien speichern</button>
                <button class="btn klein" onclick="ws_drucken(fs_sichtbareSeiten('${s.key}'))"><i class="fa-solid fa-print"></i> Drucken / PDF</button>
                <button class="btn klein fs-loes-knopf" style="display:none;" onclick="fs_mitLoesungDrucken('${s.key}')"><i class="fa-solid fa-print"></i> Mit Lösungsblättern drucken</button>
            </div>
            <div class="ws-tipp"><i class="fa-solid fa-pen"></i> ${s.tippVoll || `Jedes Blatt wird automatisch mit Aufgaben gefüllt. ${s.tipp || "Klassenstufe, Schwierigkeit und Thema oben gelten für alle Blätter."} Texte auf den Blättern kannst du anklicken und ändern.`}</div>
        </div>
        <div class="ws-blaetter" id="fs-blaetter-${s.key}"></div>`;
    return ausgabe;
}

// Baut Auswahl, Werkzeugleiste und Ausgabe in jeden Bereich ein.
// Ein Bereich kann mehrere Serien haben (z. B. Aufmerksamkeit für Kleine und ab Klasse 5).
function fs_init(){
    const proBereich = {};
    Object.entries(FS_SERIEN).forEach(([key, s]) => {
        s.key = key;
        s.tab = s.tab || key;
        s.mat = s.mat || s.tab;
        s.wert = s.wert || "serie";
        (proBereich[s.tab] = proBereich[s.tab] || []).push(s);
    });

    Object.entries(proBereich).forEach(([tab, serien]) => {
        const bereichEl = document.getElementById("bereich-" + tab);
        if (!bereichEl || bereichEl.dataset.fsFertig) return;
        bereichEl.dataset.fsFertig = "1";
        const karte = bereichEl.querySelector(".karte");
        const erstellenKnopf = karte.querySelector(":scope > button.btn");
        const erste = serien[0];

        if (erste.ohneAuswahl){
            // eigene Oberfläche (Förderplan, Stunde): nur Ausgabe mit Werkzeugleiste anlegen
            let davor = bereichEl.querySelector(".fs-ausgabe-anker") || karte;
            serien.forEach(s => { const a = fs_ausgabeAnlegen(s); davor.after(a); davor = a; });
            return;
        }

        // Aufgaben-Typ-Auswahl (Raumorientierung hatte keine – wird angelegt)
        let auswahl = erste.select ? document.querySelector(erste.select) : null;
        if (!auswahl){
            const label = document.createElement("label");
            label.textContent = "Aufgaben-Typ";
            auswahl = document.createElement("select");
            auswahl.id = "fs-typ-" + tab;
            auswahl.appendChild(new Option(erste.altName || "Einzelblatt (bisher)", "einzel"));
            karte.insertBefore(label, erstellenKnopf);
            karte.insertBefore(auswahl, erstellenKnopf);
        }
        serien.forEach(s => s.select = "#" + auswahl.id);

        const neueOptionen = serien.map(s => new Option(s.optionText || `Serie – ${s.blaetter.length} seitenfüllende Blätter`, s.wert));
        if (erste.nachErsterOption){
            // Symptomtraining: neue Serie hinter der Worterarbeitung einreihen, Auswahl bleibt wie sie ist
            let davor = auswahl.options[0];
            neueOptionen.forEach(o => { davor.after(o); davor = o; });
        } else {
            const alte = [...auswahl.options];
            neueOptionen.forEach(o => auswahl.appendChild(o));
            if (alte.length){
                const gruppe = document.createElement("optgroup");
                gruppe.label = "Einzelblätter (bisher)";
                alte.forEach(o => gruppe.appendChild(o));
                auswahl.appendChild(gruppe);
            }
            auswahl.value = erste.wert;
        }

        // Zusatz-Einstellungen einer Serie (nur sichtbar, wenn diese Serie gewählt ist)
        serien.forEach(s => {
            if (!s.optionenHtml) return;
            const feld = document.createElement("div");
            feld.id = "fs-opt-" + s.key;
            feld.innerHTML = s.optionenHtml;
            feld.style.display = "none";
            karte.insertBefore(feld, erstellenKnopf);
        });
        const zusatzZeigen = () => serien.forEach(s => {
            const feld = document.getElementById("fs-opt-" + s.key);
            if (feld) feld.style.display = auswahl.value === s.wert ? "block" : "none";
        });
        auswahl.addEventListener("change", zusatzZeigen);
        auswahl.dispatchEvent(new Event("change"));

        // Ausgaben mit Werkzeugleiste (in Reihenfolge direkt unter der Karte)
        let davor = karte;
        serien.forEach(s => {
            const ausgabe = fs_ausgabeAnlegen(s);
            davor.after(ausgabe);
            davor = ausgabe;
        });

        // Erstellen-Knopf: passende Serie oder bisheriges Einzelblatt
        const altFunktion = window[erste.erstellen];
        window[erste.erstellen] = function(){
            const typ = auswahl.value;
            const treffer = serien.find(s => s.wert === typ);
            serien.forEach(s => { if (s !== treffer) document.getElementById("fs-ausgabe-" + s.key).style.display = "none"; });
            if (treffer){
                ["ausgabe-" + tab, "akt-" + tab, tab === "symptom" ? "ausgabe-serie" : null].forEach(id => {
                    const el = id && document.getElementById(id);
                    if (el) el.style.display = "none";
                });
                fs_erstellen(treffer.key);
                return;
            }
            return altFunktion.apply(this, arguments);
        };
    });
}

/* ---------- Aufgaben-Bausteine, die mehrere Bereiche nutzen ---------- */

// Lösungen: unsichtbar, bis „Lösungen zeigen“ aktiv ist (das Layout bleibt dabei exakt gleich)
function L(text, stil = ""){ return `<span class="fs-loes"${stil ? ` style="${stil}"` : ""}>${text}</span>`; }
const LX = `<span class="fs-loes fs-lx">✗</span>`;
function LM(html){ return `<span class="fs-lm">${html}</span>`; }
function fs_kreuzBox(an, stil = ""){ return `<span class="fs-kaestchen-klein"${stil ? ` style="${stil}"` : ""}>${an ? LX : ""}</span>`; }

// Reihe mit Nummer, Inhalt und Zählkästchen
function fs_zaehlreihe(i, inhalt, loesung){
    return `<div class="fs-reihe"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-reihe-inhalt">${inhalt}</div><div class="fs-zaehl">${loesung != null ? L(loesung) : ""}</div></div>`;
}

// Kachel (Raster mit gefärbten Feldern)
function fs_kachel(felder, n, farbe, leer = false, loesung = null){
    const gr = n === 3 ? 22 : 18;
    return `<div class="fs-kachel" style="grid-template-columns:repeat(${n}, ${gr}px); grid-template-rows:repeat(${n}, ${gr}px);">` +
        felder.map((an, k) => leer
            ? `<div class="${loesung && loesung[k] ? "fs-lfill" : ""}" style="background:#fff; border:1px solid #C9D6E3;${loesung && loesung[k] ? ` --lf:${farbe};` : ""}"></div>`
            : `<div style="${an ? `background:${farbe};` : ""}"></div>`).join("") + `</div>`;
}
function fs_zufallsKachel(n, anzahl){
    const felder = Array(n * n).fill(false);
    mische([...felder.keys()]).slice(0, anzahl).forEach(i => felder[i] = true);
    return felder;
}

// Labyrinth (Tiefensuche): jede Zelle kennt ihre Wände oben/links/rechts/unten
function fs_labyrinth(n){
    const zellen = Array.from({ length: n * n }, () => ({ o: true, u: true, l: true, r: true, besucht: false }));
    const stapel = [0];
    zellen[0].besucht = true;
    while (stapel.length){
        const aktuell = stapel[stapel.length - 1];
        const z = Math.floor(aktuell / n), s = aktuell % n;
        const nachbarn = [];
        if (z > 0 && !zellen[aktuell - n].besucht) nachbarn.push(["o", aktuell - n, "u"]);
        if (z < n - 1 && !zellen[aktuell + n].besucht) nachbarn.push(["u", aktuell + n, "o"]);
        if (s > 0 && !zellen[aktuell - 1].besucht) nachbarn.push(["l", aktuell - 1, "r"]);
        if (s < n - 1 && !zellen[aktuell + 1].besucht) nachbarn.push(["r", aktuell + 1, "l"]);
        if (!nachbarn.length){ stapel.pop(); continue; }
        const [wand, ziel, gegen] = zufallsElement(nachbarn);
        zellen[aktuell][wand] = false;
        zellen[ziel][gegen] = false;
        zellen[ziel].besucht = true;
        stapel.push(ziel);
    }
    return zellen;
}

// Punktefeld mit Linienfigur als Bild (für sauberen Druck und PDF)
function fs_punktefeld(n, linien, gr = 210){
    const abstand = gr / (n + 1);
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${gr}" height="${gr}" viewBox="0 0 ${gr} ${gr}">`;
    linien.forEach(([a, b]) => {
        svg += `<line x1="${(a[0] + 1) * abstand}" y1="${(a[1] + 1) * abstand}" x2="${(b[0] + 1) * abstand}" y2="${(b[1] + 1) * abstand}" stroke="#2E6FD1" stroke-width="5" stroke-linecap="round"/>`;
    });
    for (let x = 0; x < n; x++) for (let y = 0; y < n; y++){
        svg += `<circle cx="${(x + 1) * abstand}" cy="${(y + 1) * abstand}" r="4.5" fill="#1E2A36"/>`;
    }
    svg += "</svg>";
    return `<img alt="" width="${gr}" height="${gr}" src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}">`;
}
function fs_linienzug(n, schritte){
    let p = [zufallsZahl(0, n - 1), zufallsZahl(0, n - 1)];
    const linien = [];
    const richtungen = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]];
    for (let i = 0; i < schritte; i++){
        const moeglich = richtungen.map(([dx, dy]) => [p[0] + dx, p[1] + dy]).filter(([x, y]) => x >= 0 && y >= 0 && x < n && y < n);
        const neu = zufallsElement(moeglich);
        linien.push([p, neu]);
        p = neu;
    }
    return linien;
}

// Formen-Gitter und „verändertes" Gegenstück (Unterschiede finden / Was hat sich verändert?)
function fs_formenGitter(formen, n, zelle, markiert = []){
    return `<div class="fs-bild-gitter" style="grid-template-columns:repeat(${n}, ${zelle}px); grid-auto-rows:${zelle}px;">` +
        formen.map((x, i) => `<div class="${markiert.includes(i) ? "fs-lm" : ""}">${fs_f(x, Math.round(zelle * 0.68))}</div>`).join("") + `</div>`;
}
function fs_veraendern(formen, anzahl){
    const neu = formen.map(x => ({ ...x }));
    neu.geaendert = mische([...formen.keys()]).slice(0, anzahl);
    neu.geaendert.forEach(i => {
        let x;
        do {
            x = Math.random() < 0.5 ? { form: formen[i].form, farbe: zufallsElement(FS_FARBEN) } : { form: zufallsElement(FS_FORMEN), farbe: formen[i].farbe };
        } while (fs_gleich(x, formen[i]));
        neu[i] = x;
    });
    return neu;
}
function fs_verschiedeneFormen(anzahl){
    const teile = [];
    while (teile.length < anzahl){
        const x = fs_zufallsForm();
        if (!teile.some(t => fs_gleich(t, x))) teile.push(x);
    }
    return teile;
}

const FS_BUCHSTABEN_ZIELE = [
    { z: "a", v: "oecnu" },   // leicht: deutlich andere Buchstaben
    { z: "b", v: "dphkl" },   // mittel: ähnliche Formen
    { z: "d", v: "bpqgo" },   // schwer: gespiegelte/gedrehte Verwechsler
];

/* ---------- Aufmerksamkeit ---------- */

function fsA_zahlentafel(ctx){
    const st = fs_stufe(ctx), n = [4, 5, 6][st];
    const zahlen = mische([...Array(n * n).keys()].map(i => i + 1));
    return { titel: "Zahlentafel", html: `
        ${ws_aufgabe(1, `Suche die Zahlen von 1 bis ${n * n} der Reihe nach. Zeige mit dem Finger auf jede Zahl und sprich sie leise mit.`)}
        <div class="fs-tafel" style="grid-template-columns:repeat(${n}, minmax(0,1fr)); width:100%; max-width:600px; font-size:${[44, 38, 32][st]}px;">${zahlen.map(z => `<div>${z}</div>`).join("")}</div>
        ${ws_aufgabe(2, "Wie lange brauchst du? Probiere es dreimal.")}
        <div class="fs-zeit"><span>1. Versuch:<span class="fs-l"></span>Sek.</span><span>2. Versuch:<span class="fs-l"></span>Sek.</span><span>3. Versuch:<span class="fs-l"></span>Sek.</span></div>` };
}

function fsA_formenDetektiv(ctx){
    const ziel = fs_zufallsForm();
    const anteil = [0.3, 0.25, 0.2][fs_stufe(ctx)];
    const zeile = i => {
        let html = "", treffer = 0;
        for (let k = 0; k < 11; k++){
            let x = ziel;
            if (Math.random() >= anteil){
                do {
                    const art = zufallsZahl(0, 2);
                    x = art === 0 ? { form: ziel.form, farbe: zufallsElement(FS_FARBEN) }
                      : art === 1 ? { form: zufallsElement(FS_FORMEN), farbe: ziel.farbe } : fs_zufallsForm();
                } while (fs_gleich(x, ziel));
            }
            if (x === ziel){ treffer++; html += LM(fs_f(x, 30)); } else html += fs_f(x, 30);
        }
        return fs_zaehlreihe(i, html, treffer);
    };
    return { titel: "Formen-Detektiv", zeile, html: `
        <div class="fs-ziel">Suche genau diese Form: ${fs_f(ziel, 42)}</div>
        ${ws_aufgabe(1, "Streiche in jeder Reihe alle Formen durch, die genau so aussehen. Achte auf Form <b>und</b> Farbe. Schreibe die Anzahl ins Kästchen.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsA_buchstabenDetektiv(ctx){
    const t = FS_BUCHSTABEN_ZIELE[fs_stufe(ctx)];
    const zeile = i => {
        const reihe = [...Array(13)].map(() => Math.random() < 0.25 ? t.z : zufallsElement(t.v.split("")));
        return fs_zaehlreihe(i, reihe.map(b => b === t.z ? LM(`<span class="fs-buchstabe">${b}</span>`) : `<span class="fs-buchstabe">${b}</span>`).join(""), reihe.filter(b => b === t.z).length);
    };
    return { titel: "Buchstaben-Detektiv", zeile, html: `
        <div class="fs-ziel">Suche den Buchstaben <b style="font-size:40px; color:#1D5FA8;">${t.z}</b></div>
        ${ws_aufgabe(1, `Kreise in jeder Reihe jedes <b>${t.z}</b> ein. Zähle und schreibe die Anzahl ins Kästchen.`)}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsA_labyrinth(ctx){
    const n = [8, 11, 14][fs_stufe(ctx)];
    const zellen = fs_labyrinth(n);
    // Lösungsweg (Breitensuche vom Start zum Ziel)
    const vorher = { 0: -1 }, schlange = [0];
    while (schlange.length){
        const a = schlange.shift(), c = zellen[a];
        [["o", -n], ["u", n], ["l", -1], ["r", 1]].forEach(([wand, d]) => {
            if (!c[wand] && vorher[a + d] === undefined){ vorher[a + d] = a; schlange.push(a + d); }
        });
    }
    const weg = new Set();
    for (let k = n * n - 1; k > 0; k = vorher[k]) weg.add(k);
    const html = zellen.map((c, idx) => {
        const z = Math.floor(idx / n), s = idx % n;
        const rand = `border-top-width:${c.o && z > 0 ? 3 : 0}px; border-left-width:${c.l && s > 0 ? 3 : 0}px;`;
        const art = idx === 0 ? "fs-start" : (idx === n * n - 1 ? "fs-ende" : (weg.has(idx) ? "fs-weg" : ""));
        return `<div class="${art}" style="${rand}"></div>`;
    }).join("");
    return { titel: "Labyrinth", html: `
        ${ws_aufgabe(1, "Finde den Weg vom grünen Start zum gelben Ziel. Fahre zuerst mit dem Finger, dann zeichne den Weg mit einem Stift ein. Berühre dabei keine Wand.")}
        <div class="fs-laby-legende"><span><i style="background:#DFF1E3;"></i> Start (oben links)</span><span><i style="background:#FFF4D6;"></i> Ziel (unten rechts)</span></div>
        <div class="fs-laby" style="grid-template-columns:repeat(${n}, minmax(0,1fr)); width:100%; max-width:640px;">${html}</div>` };
}

function fsA_muster(ctx){
    const p = [2, 3, 4][fs_stufe(ctx)];
    const zeile = () => {
        const teile = fs_verschiedeneFormen(p);
        const gezeigt = [...teile, ...teile];
        return `<div class="fs-muster-reihe">${gezeigt.map(x => fs_f(x, 32)).join("")}${[...Array(11 - 2 * p).keys()].map(k => `<span class="fs-leer">${L(fs_f(teile[k % p], 24))}</span>`).join("")}</div>`;
    };
    return { titel: "Muster fortsetzen", zeile, html: `
        ${ws_aufgabe(1, "Erkenne das Muster in jeder Reihe. Male es in den leeren Kästchen weiter.")}
        <div class="fs-muster fs-fuell"></div>` };
}

/* ---------- Optische Differenzierung ---------- */

function fsO_gleich(ctx){
    const zeile = () => {
        const w = ctx.wort();
        const w2 = Math.random() < 0.45 ? w : (ws_ablenker(w, 1)[0] || w);
        const gr = fs_wortGroesse(w, 230, 30);
        return `<tr><td style="font-size:${gr}px;">${ws_esc(w)}</td><td style="font-size:${gr}px;">${ws_esc(w2)}</td><td>${fs_kreuzBox(w === w2)}</td><td>${fs_kreuzBox(w !== w2)}</td></tr>`;
    };
    return { titel: "Gleich oder verschieden?", zeile, html: `
        ${ws_aufgabe(1, "Vergleiche die beiden Wörter Buchstabe für Buchstabe. Sind sie genau gleich? Kreuze an.")}
        <table class="fs-vergleich"><thead><tr><th>Wort 1</th><th>Wort 2</th><th>gleich</th><th>verschieden</th></tr></thead><tbody class="fs-fuell"></tbody></table>` };
}

function fsO_fehlerreihe(ctx){
    const zeile = i => {
        const w = ctx.wort();
        const plaetze = w.length > 7 ? 4 : 5;
        const anders = zufallsZahl(0, plaetze - 1);
        const v = ws_ablenker(w, 1)[0] || (w + "e");
        const gr = fs_wortGroesse(w, 600 / plaetze, 28);
        const woerter = [...Array(plaetze)].map((_, k) => k === anders ? LM(`<span style="font-size:${gr}px;">${ws_esc(v)}</span>`) : `<span style="font-size:${gr}px;">${ws_esc(w)}</span>`).join("");
        return `<div class="fs-reihe"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-reihe-inhalt">${woerter}</div></div>`;
    };
    return { titel: "Wer ist anders?", zeile, html: `
        ${ws_aufgabe(1, "In jeder Reihe ist <b>ein</b> Wort anders geschrieben. Finde es und kreise es ein.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsO_kacheln(ctx){
    const st = fs_stufe(ctx), n = st === 2 ? 4 : 3, anzahl = n === 3 ? 4 : 7, unterschied = st === 0 ? 2 : 1;
    const farbe = zufallsElement(FS_FARBEN).c;
    const zeile = () => {
        const vorlage = fs_zufallsKachel(n, anzahl);
        const varianten = [];
        while (varianten.length < 3){
            const v = [...vorlage];
            mische([...v.keys()]).slice(0, unterschied).forEach(k => v[k] = !v[k]);
            if (v.join() !== vorlage.join() && !varianten.some(x => x.join() === v.join())) varianten.push(v);
        }
        const optionen = mische([vorlage, ...varianten]);
        return `<div class="fs-kachel-reihe"><div class="fs-vorlage">${fs_kachel(vorlage, n, farbe)}</div><div class="fs-optionen">${optionen.map(o => o === vorlage ? LM(fs_kachel(o, n, farbe)) : fs_kachel(o, n, farbe)).join("")}</div></div>`;
    };
    return { titel: "Muster vergleichen", zeile, html: `
        ${ws_aufgabe(1, "Links steht die Vorlage. Welches Muster rechts ist <b>genau gleich</b>? Kreise es ein.")}
        <div class="fs-kacheln fs-fuell"></div>` };
}

function fsO_unterschiede(ctx){
    const anzahl = [3, 5, 7][fs_stufe(ctx)];
    const paar = () => {
        const a = [...Array(25)].map(() => fs_zufallsForm());
        const b = fs_veraendern(a, anzahl);
        return `<div class="fs-zwei-bilder"><div><div class="fs-bild-titel">Vorlage</div>${fs_formenGitter(a, 5, 44)}</div><div><div class="fs-bild-titel">Hier ist ${anzahl}-mal etwas anders</div>${fs_formenGitter(b, 5, 44, b.geaendert)}</div></div>`;
    };
    return { titel: "Unterschiede finden", html: `
        ${ws_aufgabe(1, `Vergleiche die beiden Bilder Feld für Feld. Kreise im rechten Bild die ${anzahl} Unterschiede ein.`)}
        ${paar()}
        ${ws_aufgabe(2, "Und noch einmal:")}
        ${paar()}` };
}

function fsO_suchbild(ctx){
    const t = FS_BUCHSTABEN_ZIELE[fs_stufe(ctx)];
    const zeile = () => Math.random() < 0.22 ? `<div class="fs-lm">${t.z}</div>` : `<div>${zufallsElement(t.v.split(""))}</div>`;
    return { titel: "Buchstaben-Suchbild", zeile, schritt: 12, max: 400, html: `
        <div class="fs-ziel">Male jedes <b style="font-size:40px; color:#1D5FA8;">${t.z}</b> gelb an. Wie viele hast du gefunden? <span class="fs-zaehl" style="display:inline-block;"></span></div>
        <div class="fs-suchbild fs-fuell" style="grid-template-columns:repeat(12, minmax(0,1fr));"></div>` };
}

/* ---------- Optisches Gedächtnis ---------- */

function fsG_formenreihen(ctx){
    const laenge = [3, 4, 5][fs_stufe(ctx)];
    const zeile = () => {
        const reihe = fs_verschiedeneFormen(laenge);
        return `<div class="fs-karte"><div class="fs-merk">${reihe.map(x => fs_f(x, 30)).join("")}</div><div class="fs-abdecken">abdecken →</div><div class="fs-boxen">${reihe.map(x => `<span class="fs-box">${L(fs_f(x, 26))}</span>`).join("")}</div></div>`;
    };
    return { titel: "Formen merken", zeile, html: `
        ${ws_aufgabe(1, "Schau dir eine Reihe genau an und zähle langsam bis 10. Decke sie dann mit einem Blatt ab und male die Formen rechts aus dem Kopf nach – in der richtigen Reihenfolge und Farbe.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsG_wortreihen(ctx){
    const k = [2, 3, 4][fs_stufe(ctx)];
    const zeile = () => {
        const woerter = [];
        while (woerter.length < k){ const w = ctx.wort(); if (!woerter.includes(w)) woerter.push(w); }
        return `<div class="fs-karte"><div class="fs-merk" style="flex-direction:column; align-items:flex-start; gap:4px; min-width:210px;">${woerter.map(w => `<span style="font-size:24px;">${ws_esc(w)}</span>`).join("")}</div><div class="fs-abdecken">abdecken →</div><div class="fs-linien">${"<div></div>".repeat(k)}</div></div>`;
    };
    return { titel: "Wörter merken", zeile, html: `
        ${ws_aufgabe(1, "Lies die Wörter in einem Kasten zweimal und präge sie dir ein. Decke sie ab und schreibe sie rechts aus dem Kopf auf.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsG_kacheln(ctx){
    const st = fs_stufe(ctx), n = st === 2 ? 4 : 3, anzahl = [3, 4, 6][st];
    const farbe = zufallsElement(FS_FARBEN).c;
    const zeile = () => {
        const vorlage = fs_zufallsKachel(n, anzahl);
        return `<div class="fs-karte" style="justify-content:space-around;">${fs_kachel(vorlage, n, farbe)}<div class="fs-abdecken">abdecken →</div>${fs_kachel(vorlage.map(() => false), n, farbe, true, vorlage)}</div>`;
    };
    return { titel: "Muster merken", zeile, schritt: 2, html: `
        ${ws_aufgabe(1, "Präge dir das bunte Muster genau ein. Decke es ab und male es im leeren Feld daneben aus dem Kopf nach.")}
        <div class="fs-zweispaltig fs-fuell"></div>` };
}

function fsG_veraendert(ctx){
    const anzahl = [2, 3, 4][fs_stufe(ctx)];
    const a = [...Array(25)].map(() => fs_zufallsForm());
    const b = fs_veraendern(a, anzahl);
    return { titel: "Was hat sich verändert?", html: `
        ${ws_aufgabe(1, "Schau dir das Bild eine Minute lang genau an.")}
        <div style="display:flex; justify-content:center;">${fs_formenGitter(a, 5, 56)}</div>
        <div class="ws-knick">Hier nach hinten knicken – nicht mehr nachschauen!</div>
        ${ws_aufgabe(2, `Was hat sich verändert? Kreise die ${anzahl} veränderten Felder ein.`)}
        <div style="display:flex; justify-content:center;">${fs_formenGitter(b, 5, 56, b.geaendert)}</div>` };
}

/* ---------- Optische Serialität ---------- */

function fsS_zahlenreihen(ctx){
    const st = fs_stufe(ctx);
    const zeile = i => {
        let reihe;
        if (st === 0){
            const schritt = zufallsElement([1, 2]), start = zufallsZahl(1, 10);
            reihe = [...Array(8)].map((_, k) => start + k * schritt);
        } else if (st === 1){
            const schritt = zufallsElement([2, 3, 4, 5]) * (Math.random() < 0.3 ? -1 : 1);
            const start = schritt < 0 ? zufallsZahl(40, 60) : zufallsZahl(1, 20);
            reihe = [...Array(8)].map((_, k) => start + k * schritt);
        } else {
            const a = zufallsZahl(2, 6), b = zufallsZahl(1, 4), start = zufallsZahl(1, 15);
            reihe = [start];
            for (let k = 1; k < 8; k++) reihe.push(reihe[k - 1] + (k % 2 ? a : b));   // +a, +b im Wechsel
        }
        const luecken = new Set(mische([...Array(6).keys()].map(k => k + 2)).slice(0, [2, 3, 4][st]));
        const html = reihe.map((z, k) => luecken.has(k) ? `<span class="fs-box">${L(z)}</span>` : `<span class="fs-gross" style="min-width:46px; text-align:center;">${z}</span>`).join("");
        return `<div class="fs-reihe"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-reihe-inhalt">${html}</div></div>`;
    };
    return { titel: "Zahlenreihen fortsetzen", zeile, html: `
        ${ws_aufgabe(1, "Wie geht die Reihe weiter? Finde die Regel und schreibe die fehlenden Zahlen in die Kästchen.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsS_reihenfolge(ctx){
    const laenge = [3, 4, 5][fs_stufe(ctx)];
    const zeile = () => {
        const reihe = fs_verschiedeneFormen(laenge);
        let gemischt = mische(reihe);
        for (let v = 0; v < 10 && gemischt.every((x, k) => fs_gleich(x, reihe[k])); v++) gemischt = mische(reihe);
        return `<div class="fs-karte"><div class="fs-merk">${reihe.map(x => fs_f(x, 30)).join("")}</div><div class="fs-chips">${gemischt.map(x => `<div class="fs-chip">${fs_f(x, 30)}<span class="fs-nrbox">${L(reihe.indexOf(x) + 1)}</span></div>`).join("")}</div></div>`;
    };
    return { titel: "Reihenfolge erkennen", zeile, html: `
        ${ws_aufgabe(1, "Links siehst du die richtige Reihenfolge. Rechts sind die Formen durcheinander. Schreibe unter jede Form, an welcher Stelle sie links steht (1, 2, 3 …).")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsS_buchstabensalat(ctx){
    const max = [5, 7, 10][fs_stufe(ctx)];
    const zeile = i => {
        const w = ctx.wort(x => x.length >= 3 && x.length <= max);
        const b = w.split("");
        let m = mische(b);
        for (let v = 0; v < 10 && m.join("") === w && b.length > 1; v++) m = mische(b);
        return `<div class="fs-reihe"><div class="fs-reihe-nr">${i + 1}</div><div class="ws-buchstaben" style="flex:none;">${m.map(z => `<div class="ws-feld" style="background:#F4F7FA;">${ws_esc(z)}</div>`).join("")}</div><div class="ws-schreiblinie" style="flex:1; margin-left:18px; display:flex; align-items:flex-end; padding:0 0 2px 10px;">${L(ws_esc(w), "font-size:28px;")}</div></div>`;
    };
    return { titel: "Buchstaben-Salat", zeile, html: `
        ${ws_aufgabe(1, "Die Buchstaben sind durcheinander. Bringe sie in die richtige Reihenfolge und schreibe das Wort auf die Linie.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsS_abc(ctx){
    const st = fs_stufe(ctx);
    const zeile = i => {
        const woerter = [];
        for (let v = 0; woerter.length < 4 && v < 200; v++){
            const w = ctx.wort();
            const gleicherAnfang = woerter.some(x => x[0].toLowerCase() === w[0].toLowerCase());
            if (!woerter.includes(w) && (st === 2 || !gleicherAnfang)) woerter.push(w);
        }
        const sortiert = [...woerter].sort((a, b) => a.localeCompare(b, "de", { sensitivity: "base" }));
        return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-chips">${woerter.map(w => `<div class="fs-chip"><span class="fs-chiptext">${ws_esc(w)}</span><span class="fs-nrbox">${L(sortiert.indexOf(w) + 1)}</span></div>`).join("")}</div></div>`;
    };
    return { titel: "ABC-Ordnung", zeile, html: `
        ${ws_aufgabe(1, "Bringe die Wörter in die Reihenfolge des Alphabets. Schreibe 1, 2, 3 und 4 in die Kästchen.")}
        <div class="fs-ziel" style="font-size:22px; letter-spacing:2px;">a b c d e f g h i j k l m n o p q r s t u v w x y z</div>
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsS_alphabet(ctx){
    const ABC = "abcdefghijklmnopqrstuvwxyz";
    const luecken = [2, 3, 4][fs_stufe(ctx)];
    const zeile = i => {
        const start = zufallsZahl(0, ABC.length - 9);
        const teil = ABC.slice(start, start + 9).split("").map(b => i % 2 ? b.toUpperCase() : b);
        const leer = new Set(mische([...Array(8).keys()].map(k => k + 1)).slice(0, luecken));
        const html = teil.map((b, k) => leer.has(k) ? `<span class="fs-box">${L(b)}</span>` : `<span class="fs-gross" style="min-width:40px; text-align:center;">${b}</span>`).join("");
        return `<div class="fs-reihe"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-reihe-inhalt">${html}</div></div>`;
    };
    return { titel: "ABC-Lücken", zeile, html: `
        ${ws_aufgabe(1, "Welche Buchstaben fehlen? Sprich das ABC leise mit und schreibe die fehlenden Buchstaben in die Kästchen.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

/* ---------- Akustische Differenzierung ---------- */

const FS_REIME = [
    ["Haus", "Maus"], ["Hund", "Mund"], ["Tisch", "Fisch"], ["Hose", "Rose"], ["Kanne", "Tanne"], ["Nase", "Hase"],
    ["Bein", "Schwein"], ["Topf", "Kopf"], ["Wand", "Hand"], ["Ball", "Stall"], ["Katze", "Tatze"], ["Sonne", "Tonne"],
    ["Schnecke", "Decke"], ["Stern", "Kern"], ["Baum", "Traum"], ["Rad", "Bad"], ["Teller", "Keller"], ["Ziege", "Wiege"],
    ["Bett", "Brett"], ["Kuchen", "Buchen"], ["Tasche", "Flasche"], ["Mantel", "Hantel"], ["Socke", "Glocke"],
    ["Pilz", "Filz"], ["Igel", "Spiegel"], ["Wolke", "Molke"], ["Kirsche", "Hirsche"], ["Wurm", "Turm"],
];
// Hinweis: jede Reimgruppe kommt nur einmal vor, damit gemischte "Nicht-Reim"-Paare sich nicht doch reimen
// Paare, die sich nur in einem Laut unterscheiden – nach Schwierigkeit
const FS_MINIMALPAARE = [
    [["Bass", "Pass"], ["Bein", "Pein"], ["backen", "packen"], ["Blatt", "platt"], ["Dank", "Tank"], ["Dorf", "Torf"],
     ["Daten", "Taten"], ["Seide", "Seite"], ["Gabel", "Kabel"], ["Garten", "Karten"], ["Gasse", "Kasse"], ["Greis", "Kreis"]],
    [["Mut", "Nut"], ["Kamm", "kann"], ["fein", "Wein"], ["Fall", "Wall"], ["Saal", "Schal"], ["Sau", "Schau"],
     ["sein", "Schein"], ["Gram", "Kram"], ["leiden", "leiten"], ["Brise", "Prise"]],
    [["Miete", "Mitte"], ["Stiel", "still"], ["Wahl", "Wall"], ["Bahn", "Bann"], ["Hüte", "Hütte"], ["Ofen", "offen"],
     ["Saat", "satt"], ["Beet", "Bett"], ["Rose", "Rosse"], ["Höhle", "Hölle"]],
];
const FS_LAUTWOERTER = {
    m: ["Maus", "Mama", "Mond", "Lampe", "Hammer", "Blume", "Baum", "Turm", "Kamm", "Ameise", "Tomate", "Melone", "Himmel", "Arm", "Mütze", "Mantel", "Zimmer", "Kamel", "Lamm", "Roman"],
    n: ["Nase", "Nest", "Nudel", "Biene", "Sonne", "Banane", "Kanne", "Zahn", "Mann", "Bohne", "Schwan", "Laterne", "Hahn", "Kran", "Nuss", "Hund", "Tanne", "Kino", "Zitrone", "Ente"],
    r: ["Rose", "Rad", "Rabe", "Regen", "Tor", "Bär", "Ohr", "Uhr", "Stern", "Garten", "Karte", "Birne", "Pferd", "Zebra", "Ring", "Ritter", "Tür", "Feuer", "Torte", "Rakete"],
};

function fsD_silben(ctx){
    const zeile = () => {
        const w = ctx.wort();
        const n = silben_trennen(w).length;
        return `<div class="fs-karte" style="justify-content:space-between;"><span style="font-size:${fs_wortGroesse(w, 170, 28)}px;">${ws_esc(w)}</span><span style="display:flex; gap:8px;">${[0, 1, 2, 3].map(k => `<span class="ws-kreis${k < n ? " fs-lfill" : ""}" style="width:30px; height:30px;${k < n ? " --lf:#E8A09A;" : ""}"></span>`).join("")}</span></div>`;
    };
    return { titel: "Silben hören", zeile, schritt: 2, html: `
        ${ws_aufgabe(1, "Sprich jedes Wort laut und klatsche dabei die Silben. Male für jede Silbe einen Kreis aus.")}
        <div class="fs-zweispaltig fs-fuell"></div>` };
}

function fsD_reime(ctx){
    const paare = [];
    FS_REIME.forEach(p => paare.push({ a: p[0], b: p[1], reim: true }));
    for (let k = 0; k < FS_REIME.length; k++){
        const p1 = zufallsElement(FS_REIME), p2 = zufallsElement(FS_REIME);
        if (p1 !== p2) paare.push({ a: p1[0], b: p2[1], reim: false });
    }
    const gemischt = mische(paare);
    const zeile = i => {
        const p = gemischt[i];
        if (!p) return "";
        return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div><span class="fs-satz"><b>${ws_esc(p.a)}</b> – <b>${ws_esc(p.b)}</b></span><span class="fs-kreuz"><span>${fs_kreuzBox(p.reim)} reimt sich</span><span>${fs_kreuzBox(!p.reim)} reimt sich nicht</span></span></div>`;
    };
    return { titel: "Reimen", zeile, html: `
        ${ws_aufgabe(1, "Sprich beide Wörter laut. Klingen sie am Ende gleich? Kreuze an.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsD_minimalpaare(ctx){
    const st = fs_stufe(ctx);
    const liste = mische(FS_MINIMALPAARE.slice(0, st + 1).flat());
    const zeile = i => {
        const p = liste[i];
        if (!p) return "";
        const [a, b] = Math.random() < 0.5 ? p : [p[1], p[0]];
        return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-chips"><span class="fs-gross">${ws_esc(a)}</span><span class="fs-gross">${ws_esc(b)}</span></div></div>`;
    };
    return { titel: "Genau hinhören", zeile, html: `
        ${ws_aufgabe(1, "Die Lehrkraft liest aus jeder Reihe <b>ein</b> Wort vor. Hör genau hin und kreise das Wort ein, das du gehört hast.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsD_lautposition(ctx){
    const laut = ["m", "n", "r"][fs_stufe(ctx)];
    const woerter = mische(FS_LAUTWOERTER[laut]);
    const zeile = i => {
        const w = woerter[i];
        if (!w) return "";
        const k = w.toLowerCase(), wo = { anfang: k[0] === laut, ende: false, mitte: false };
        const ohneEnde = k.replace(new RegExp(laut + "+$"), m => { wo.ende = true; return ""; });
        wo.mitte = ohneEnde.slice(1).includes(laut);
        return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div><span class="fs-satz">${ws_esc(w)}</span><span class="fs-kreuz"><span>${fs_kreuzBox(wo.anfang)} Anfang</span><span>${fs_kreuzBox(wo.mitte)} Mitte</span><span>${fs_kreuzBox(wo.ende)} Ende</span></span></div>`;
    };
    return { titel: `Wo hörst du das ${laut.toUpperCase()}?`, zeile, html: `
        <div class="fs-ziel">Wir hören auf den Laut <b style="font-size:40px; color:#1D5FA8;">${laut.toUpperCase()} ${laut}</b></div>
        ${ws_aufgabe(1, `Sprich jedes Wort langsam. Hörst du das ${laut.toUpperCase()} am Anfang, in der Mitte oder am Ende? Kreuze an.`)}
        <div class="fs-reihen fs-fuell"></div>` };
}

/* ---------- Akustisches Gedächtnis ---------- */

function fsH_wortfolgen(ctx){
    const k = [3, 4, 5][fs_stufe(ctx)];
    const zeile = i => {
        const woerter = [];
        while (woerter.length < k){ const w = ctx.wort(); if (!woerter.includes(w)) woerter.push(w); }
        return `<div class="fs-karte"><div class="fs-ansage"><b>Lehrkraft liest vor</b>${woerter.map(ws_esc).join(" · ")}</div><div class="fs-linien">${"<div></div>".repeat(2)}</div></div>`;
    };
    return { titel: "Wörter merken", zeile, html: `
        ${ws_aufgabe(1, "Hör gut zu: Die Lehrkraft liest die Wörter einmal langsam vor. Schreibe danach alle Wörter in der richtigen Reihenfolge auf.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsH_zahlenspanne(ctx){
    const st = fs_stufe(ctx);
    const zeile = i => {
        const k = [3, 4, 5][st] + Math.floor(i / 4);           // wird von Reihe zu Reihe etwas länger
        const zahlen = [...Array(Math.min(k, 8))].map(() => zufallsZahl(1, 9));
        return `<div class="fs-karte"><div class="fs-ansage"><b>Lehrkraft liest vor</b>${zahlen.join(" – ")}</div><div class="fs-boxen">${'<span class="fs-box"></span>'.repeat(zahlen.length)}</div></div>`;
    };
    return { titel: "Zahlen merken", zeile, html: `
        ${ws_aufgabe(1, "Hör gut zu: Die Lehrkraft sagt Zahlen vor. Schreibe sie danach in der richtigen Reihenfolge in die Kästchen.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsH_auftraege(ctx){
    const k = [1, 2, 3][fs_stufe(ctx)];
    const FORMEN = ["kreis", "quadrat", "raute", "rechteck"];
    const zeile = i => {
        const reihe = [...Array(5)].map(() => zufallsElement(FORMEN));
        const stellen = mische([0, 1, 2, 3, 4]).slice(0, k).sort();
        const auftraege = stellen.map(s => `Form ${s + 1} ${zufallsElement(FS_FARBEN).n}`);
        return `<div class="fs-karte"><div class="fs-ansage"><b>Lehrkraft sagt</b>Male ${auftraege.join(", ")} an.</div><div class="fs-chips">${reihe.map(f => fs_umriss(f, 40)).join("")}</div></div>`;
    };
    return { titel: "Aufträge merken", zeile, html: `
        ${ws_aufgabe(1, "Hör gut zu: Die Lehrkraft sagt dir, welche Formen du in welcher Farbe anmalen sollst. Hör bis zum Ende zu und male erst dann.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

/* ---------- Akustische Serialität ---------- */

function fsR_silbenfolge(ctx){
    const zeile = i => {
        const w = ctx.wort(x => silben_trennen(x).length >= 2);
        const silben = silben_trennen(w);
        let idx = mische([...silben.keys()]);
        for (let v = 0; v < 10 && idx.every((x, k) => x === k); v++) idx = mische([...silben.keys()]);
        return `<div class="fs-karte"><div class="fs-ansage"><b>Lehrkraft spricht</b>${silben.map(ws_esc).join(" – ")}</div><div class="fs-chips">${idx.map(k => `<div class="fs-chip"><span class="fs-chiptext">${ws_esc(silben[k])}</span><span class="fs-nrbox">${L(k + 1)}</span></div>`).join("")}</div></div>`;
    };
    return { titel: "Silben in Reihenfolge", zeile, html: `
        ${ws_aufgabe(1, "Hör gut zu: Die Lehrkraft spricht ein Wort in Silben. Schreibe unter jede Silbe, als wievielte du sie gehört hast.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsR_wortfolge(ctx){
    const k = [3, 4, 5][fs_stufe(ctx)];
    const zeile = i => {
        const woerter = [];
        while (woerter.length < k){ const w = ctx.wort(); if (!woerter.includes(w)) woerter.push(w); }
        const gehoert = mische(woerter);
        return `<div class="fs-karte"><div class="fs-ansage"><b>Lehrkraft liest vor</b>${gehoert.map(ws_esc).join(" – ")}</div><div class="fs-chips">${woerter.map(w => `<div class="fs-chip"><span class="fs-chiptext" style="font-size:${fs_wortGroesse(w, 120, 24)}px;">${ws_esc(w)}</span><span class="fs-nrbox">${L(gehoert.indexOf(w) + 1)}</span></div>`).join("")}</div></div>`;
    };
    return { titel: "Gehörte Reihenfolge", zeile, html: `
        ${ws_aufgabe(1, "Hör gut zu: Die Lehrkraft liest die Wörter in einer bestimmten Reihenfolge vor. Nummeriere sie so, wie du sie gehört hast.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsR_lautfolge(ctx){
    const max = [4, 5, 6][fs_stufe(ctx)];
    const zeile = i => {
        const w = ctx.wort(x => x.length >= 3 && x.length <= max && !/(sch|ch|ck|ei|au|eu|ie)/i.test(x));
        const b = w.split("");
        let idx = mische([...b.keys()]);
        for (let v = 0; v < 10 && idx.every((x, k) => x === k); v++) idx = mische([...b.keys()]);
        return `<div class="fs-karte"><div class="fs-ansage"><b>Lehrkraft spricht gedehnt</b>${ws_esc(w)}</div><div class="fs-chips">${idx.map(k => `<div class="fs-chip"><span class="fs-chiptext">${ws_esc(b[k].toLowerCase())}</span><span class="fs-nrbox">${L(k + 1)}</span></div>`).join("")}</div></div>`;
    };
    return { titel: "Laute in Reihenfolge", zeile, html: `
        ${ws_aufgabe(1, "Hör gut zu: Die Lehrkraft spricht ein Wort ganz langsam, Laut für Laut. Schreibe unter jeden Buchstaben, als wievielten du ihn gehört hast.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

/* ---------- Körperschema ---------- */

// dein rechtes Knie · deine rechte Schulter · deinen rechten Fuß
function ks_akk(seite, teil){
    return { m: `deinen ${seite}n`, f: `deine ${seite}`, n: `dein ${seite}s` }[teil.g] + " " + teil.wort;
}

function fs_satzBlatt(titel, auftrag, saetze){
    const liste = mische(saetze);
    const zeile = i => {
        const satz = liste[i];
        if (!satz) return "";
        return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div><span class="fs-satz">${ws_esc(satz)}</span><span class="fs-kreuz"><span><span class="fs-kaestchen-klein"></span> geschafft</span></span></div>`;
    };
    return { titel, zeile, html: `${ws_aufgabe(1, auftrag)}<div class="fs-reihen fs-fuell"></div>` };
}

function fsK_zeigen(){
    return fs_satzBlatt("Zeige deinen Körper", "Die Lehrkraft (oder ein Partner) liest vor. Zeige den Körperteil und kreuze an, wenn du es geschafft hast.",
        KOERPERTEILE.flatMap(teil => ["rechte", "linke"].map(seite => ks_zeige(seite, teil))));
}

function fsK_bewegungen(){
    return fs_satzBlatt("Rechts und links bewegen", "Lies die Anweisung (oder lass sie dir vorlesen) und führe die Bewegung genau aus.",
        BEWEGUNGEN.flatMap(vorlage => ["rechte", "linke"].map(seite => vorlage(seite))));
}

function fsK_ueberkreuz(){
    const ZIELE = [
        { wort: "Knie", g: "n" }, { wort: "Ohr", g: "n" }, { wort: "Schulter", g: "f" }, { wort: "Fuß", g: "m" },
        { wort: "Ellenbogen", g: "m" }, { wort: "Auge", g: "n" }, { wort: "Hüfte", g: "f" }, { wort: "Wange", g: "f" },
    ];
    const saetze = [];
    ["rechte", "linke"].forEach(hand => ["rechte", "linke"].forEach(seite => ZIELE.forEach(teil => {
        if (teil.wort === "Ellenbogen" && hand === seite) return;   // mit derselben Hand nicht erreichbar
        saetze.push(`Berühre mit der ${hand}n Hand ${ks_akk(seite, teil)}.`);
    })));
    return fs_satzBlatt("Über Kreuz", "Achte genau auf rechts und links: Welche Hand berührt welchen Körperteil? Führe die Bewegung aus.", saetze);
}

/* ---------- Raumorientierung ---------- */

function fsRO_blickrichtung(ctx){
    const tiere = TIER_BANK.filter(t => ["fisch", "vogel", "schildkroete", "schlange"].includes(t.icon));
    const zeile = i => {
        const tier = zufallsElement(tiere);
        const grundRechts = ["schildkroete", "schlange"].includes(tier.icon);   // Fisch und Vogel schauen ungespiegelt nach links
        let rechts = 0;
        const bilder = [...Array(7)].map(() => {
            const gespiegelt = Math.random() < 0.5;
            if (gespiegelt !== grundRechts) rechts++;
            return `<span class="fs-tier" style="transform:scaleX(${gespiegelt ? -1 : 1});">${TIER_ICONS[tier.icon]}</span>`;
        }).join("");
        return `<div class="fs-reihe"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-reihe-inhalt">${bilder}</div>
            <div style="display:flex; flex-direction:column; gap:4px; font-size:15px; flex:none;"><span>→ <span class="fs-kaestchen-klein" style="width:30px; height:26px;">${L(rechts)}</span></span><span>← <span class="fs-kaestchen-klein" style="width:30px; height:26px;">${L(7 - rechts)}</span></span></div></div>`;
    };
    return { titel: "Wohin schauen die Tiere?", zeile, html: `
        ${ws_aufgabe(1, "Schau jedes Tier genau an: Schaut es nach rechts (→) oder nach links (←)? Zähle in jeder Reihe und schreibe die Anzahl in die Kästchen.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsRO_pfeile(ctx){
    const st = fs_stufe(ctx);
    const PFEILE = [["←", "→"], ["←", "→", "↑", "↓"], ["←", "→", "↑", "↓"]][st];
    const zeile = i => {
        const reihe = [...Array(10)].map(() => zufallsElement(PFEILE));
        return `<div class="fs-reihe"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-reihe-inhalt fs-pfeile">${reihe.map(p => `<div class="fs-pfeil-zelle"><span class="fs-pfeilzeichen">${p}</span><span class="fs-nrbox">${L({ "←": "l", "→": "r", "↑": "o", "↓": "u" }[p])}</span></div>`).join("")}</div></div>`;
    };
    const legende = st === 0 ? "r = rechts, l = links" : "r = rechts, l = links, o = oben, u = unten";
    return { titel: "Pfeile lesen", zeile, html: `
        <div class="fs-ziel">${legende}</div>
        ${ws_aufgabe(1, "In welche Richtung zeigt der Pfeil? Schreibe den passenden Buchstaben darunter. Sprich dabei leise mit.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsRO_diktat(ctx){
    const st = fs_stufe(ctx), n = 9, zuege = [5, 7, 9][st];
    const RICHTUNG = { "→": [1, 0], "←": [-1, 0], "↓": [0, 1], "↑": [0, -1] };
    const aufgabe = () => {
        for (let versuch = 0; versuch < 200; versuch++){
            let x = zufallsZahl(0, n - 1), y = zufallsZahl(0, n - 1);
            const start = [x, y], code = [], weg = new Set();
            let ok = true, letzte = null;
            for (let k = 0; k < zuege && ok; k++){
                const moeglich = Object.keys(RICHTUNG).filter(r => r !== letzte);
                const r = zufallsElement(moeglich), weite = zufallsZahl(1, 3);
                for (let schritt = 0; schritt < weite; schritt++){
                    x += RICHTUNG[r][0]; y += RICHTUNG[r][1];
                    if (x >= 0 && y >= 0 && x < n && y < n) weg.add(y * n + x);
                }
                if (x < 0 || y < 0 || x >= n || y >= n) ok = false;
                code.push(`${weite} ${r}`);
                letzte = r;
            }
            if (!ok) continue;
            const startIdx = start[1] * n + start[0];
            const felder = [...Array(n * n)].map((_, idx) => `<div class="${idx === startIdx ? "fs-startfeld" : (weg.has(idx) ? "fs-weg" : "")}"></div>`).join("");
            return `<div class="fs-code">${code.map(c => `<span>${c}</span>`).join("")}</div>
                <div class="fs-raster" style="grid-template-columns:repeat(${n}, 38px);">${felder}</div>`;
        }
        return "";
    };
    return { titel: "Wege nach Plan", html: `
        ${ws_aufgabe(1, "Starte im blauen Feld. Gehe so viele Felder, wie die Zahl sagt, in Pfeilrichtung. Zeichne den Weg mit einer Linie ein.")}
        ${aufgabe()}
        ${ws_aufgabe(2, "Und noch ein Weg:")}
        ${aufgabe()}` };
}

function fsRO_spiegeln(ctx){
    const st = fs_stufe(ctx), n = st === 0 ? 3 : 4, anzahl = [3, 5, 7][st];
    const farbe = zufallsElement(FS_FARBEN).c;
    const zeile = () => {
        const vorlage = fs_zufallsKachel(n, anzahl);
        const spiegel = vorlage.map((_, k) => vorlage[Math.floor(k / n) * n + (n - 1 - k % n)]);
        return `<div class="fs-karte" style="justify-content:center;"><div class="fs-spiegel">${fs_kachel(vorlage, n, farbe)}<div class="fs-achse"></div>${fs_kachel(vorlage.map(() => false), n, farbe, true, spiegel)}</div></div>`;
    };
    return { titel: "Spiegelbilder", zeile, schritt: 2, html: `
        ${ws_aufgabe(1, "Die rote Linie ist ein Spiegel. Male das Muster rechts so an, wie es im Spiegel aussieht.")}
        <div class="fs-zweispaltig fs-fuell"></div>` };
}

/* ===============================================================
   Rechtschreibung – Strategien & Übungen (für ältere Schüler)
   =============================================================== */

// Je Schwerpunkt: Regel, Merksatz, Strategie, Wortlisten (treffer = Phänomen, kontrast = Gegenbeispiele)
// Bei Auslaut und ä/äu steht hinter "|" die Verlängerung bzw. das verwandte Wort.
const RS_SCHWERPUNKTE = {
    schaerfung: {
        name: "Schärfung – doppelte Konsonanten",
        regel: "Nach einem <strong>kurzen, betonten Vokal</strong> folgen immer zwei Konsonanten. Hörst du beim Schwingen nur einen, wird er <strong>verdoppelt</strong>: Son-ne, Hüt-te, schwim-men.<br>Nach einem <strong>langen Vokal</strong> steht nur ein Konsonant: Ro-se, Na-se.",
        merksatz: "Kurzer Vokal + nur ein Konsonant hörbar → Konsonant verdoppeln!",
        schritte: ["Sprich das Wort deutlich in Silben (schwingen).", "Ist der betonte Vokal kurz oder lang?", "Kurz und du hörst nur einen Konsonanten? → Doppelt schreiben.", "Bei kurzen Wörtern verlängern: Ball → Bäl-le."],
        pruefen: "Silben schwingen: kurz oder lang?",
        laenge: true,
        spalten: ["kurzer Vokal: Doppelkonsonant (Son-ne)", "langer Vokal: ein Konsonant (Ro-se)"],
        treffer: ["Sonne", "Teller", "Himmel", "Koffer", "Butter", "Mutter", "Puppe", "Brille", "Kasse", "Tanne", "Wolle", "Zimmer", "Sommer", "Schlitten", "Schatten", "Pfeffer", "Gruppe", "Kette", "Hammer", "Mitte", "Lippe", "Nummer", "Quelle", "Rolle", "Stimme", "Suppe", "Tasse", "Tonne", "Zettel", "Ratte", "Klasse", "Wasser", "Kamm", "Stall", "Schiff", "Fell", "Bett", "kommen", "rennen", "schwimmen", "treffen", "sammeln", "offen", "dünn", "schnell", "still", "voll", "sollen", "wissen", "Kissen"],
        kontrast: ["Rose", "Nase", "Hose", "Tafel", "Ofen", "Name", "Hase", "Blume", "Regen", "Besen", "Boden", "Igel", "Leben", "Schule", "Wagen", "Vogel", "Faden", "Kamel", "Hof", "Schaf", "lesen", "geben", "holen", "malen", "Tomate"],
        stelle(w, t){
            if (t){ const m = /(bb|dd|ff|gg|ll|mm|nn|pp|rr|ss|tt)/.exec(w); if (m) return rs_teil(w, m.index, 2, [m[0][0], m[0]]); }
            const m = /[aeiouäöü]([bdfglmnprst])/i.exec(w);
            return m ? rs_teil(w, m.index + 1, 1, [m[1], m[1] + m[1]]) : null;
        },
    },
    cktz: {
        name: "ck und tz",
        regel: "Nach einem <strong>kurzen Vokal</strong> schreibt man <strong>ck</strong> statt kk und <strong>tz</strong> statt zz: Jacke, Katze.<br>Nach einem Konsonanten (l, n, r …) oder nach einem langen Vokal/Doppellaut steht <strong>nie</strong> ck oder tz: Bank, Herz, Haken, Kreuz.",
        merksatz: "Nach l, n, r – das merke ja – steht nie tz und nie ck!",
        schritte: ["Sprich das Wort in Silben.", "Steht vor dem k- oder z-Laut ein Konsonant (l, n, r …)? → nur k oder z.", "Ist der Vokal davor lang oder ein ei, au, eu? → nur k oder z.", "Ist der Vokal davor kurz? → ck oder tz."],
        pruefen: "Was steht davor: kurzer Vokal oder Konsonant?",
        laenge: true,
        spalten: ["ck oder tz (Jacke, Katze)", "k oder z (Bank, Herz)"],
        treffer: ["Jacke", "Zucker", "Brücke", "Decke", "Ecke", "Glück", "Hecke", "Mücke", "Rücken", "Socke", "Stück", "Schnecke", "Bäcker", "Acker", "backen", "drücken", "packen", "wecken", "dick", "Blick", "Katze", "Mütze", "Platz", "Satz", "Schatz", "Schmutz", "Blitz", "Hitze", "Spitze", "Pfütze", "Netz", "Witz", "putzen", "setzen", "sitzen", "schwitzen", "jetzt", "trotz"],
        kontrast: ["Bank", "Schrank", "Onkel", "Haken", "Laken", "stark", "Werk", "Volk", "krank", "Gurke", "Herz", "Holz", "Salz", "Pilz", "Kerze", "Wurzel", "Pflanze", "tanzen", "Brezel", "Kreuz", "Weizen", "Heizung", "kurz", "Schmerz"],
        stelle(w, t){
            if (t){ const m = /(ck|tz)/.exec(w); if (m) return rs_teil(w, m.index, 2, m[0] === "ck" ? ["k", "ck"] : ["z", "tz"]); }
            const m = /[kz](?!.*[kz])/.exec(w);
            return m ? rs_teil(w, m.index, 1, m[0] === "k" ? ["k", "ck"] : ["z", "tz"]) : null;
        },
    },
    dehnung: {
        name: "Dehnungs-h",
        regel: "Das <strong>Dehnungs-h</strong> zeigt an, dass der Vokal davor <strong>lang</strong> gesprochen wird. Man hört es nicht. Es steht nur vor <strong>l, m, n</strong> oder <strong>r</strong>: Zahl, lahm, Zahn, Uhr.<br>Viele Wörter mit langem Vokal haben aber <strong>kein</strong> h (Name, Schule). Wörter mit Dehnungs-h sind <strong>Merkwörter</strong>.",
        merksatz: "Das Dehnungs-h steht nur vor l, m, n, r – und muss gemerkt werden!",
        schritte: ["Sprich das Wort deutlich: Ist der Vokal lang?", "Folgt danach l, m, n oder r? → Ein Dehnungs-h ist möglich.", "Kenne ich das Wort? Merkwort-Liste oder Wörterbuch nutzen.", "Wortfamilie prüfen: fahren → Fahrt, Fahrer."],
        pruefen: "Langer Vokal vor l, m, n, r? Merkwort?",
        laenge: true,
        spalten: ["mit Dehnungs-h (Zahn)", "ohne h, aber lang (Name)"],
        treffer: ["Zahl", "Zahn", "Bahn", "Fahne", "Sahne", "Hahn", "Jahr", "Rahmen", "Mehl", "Lehrer", "Fehler", "Bohne", "Kohle", "Sohn", "Ohr", "Uhr", "Stuhl", "Huhn", "Mühle", "Bühne", "Höhle", "Wohnung", "fahren", "nehmen", "wohnen", "zählen", "fehlen", "führen", "ohne", "sehr", "kühl", "wahr", "kahl"],
        kontrast: ["Name", "Schule", "Krone", "Tal", "Schal", "Ton", "Plan", "Ware", "Bär", "Tür", "Spur", "hören", "spüren", "Zone", "Pole", "Blume", "Schere", "Kino"],
        stelle(w, t){
            if (t){ const m = /([aeiouäöü])h(?=[lmnr])/i.exec(w); if (m) return rs_teil(w, m.index + 1, 1, ["h", "–"]); }
            const m = /[aeiouäöü](?=[lmnr])/i.exec(w);
            return m ? rs_teil(w, m.index + 1, 0, ["h", "–"]) : null;
        },
    },
    ie: {
        name: "Langes i: ie",
        regel: "Das <strong>lange i</strong> schreibt man fast immer <strong>ie</strong>: Biene, Brief, spielen.<br>Das <strong>kurze i</strong> schreibt man <strong>i</strong>: Kiste, Fisch, bitten.<br>Ausnahmen mit langem i ohne e sind <strong>Merkwörter</strong>: Igel, Tiger, Kino, Bibel, Krokodil, Maschine, Musik.",
        merksatz: "Langes i → ie. Kurzes i → i. Ausnahmen merken!",
        schritte: ["Sprich das Wort deutlich in Silben.", "Ist das i lang (Bie-ne) oder kurz (Kis-te)?", "Lang → ie, kurz → i.", "Klingt es lang, aber steht kein e? → Merkwort (Igel, Tiger …)."],
        pruefen: "Ist das i lang oder kurz?",
        laenge: true,
        spalten: ["langes i: ie (Biene)", "kurzes i: i (Kiste)"],
        treffer: ["Biene", "Brief", "Dieb", "Fliege", "Kies", "Knie", "Lied", "Miete", "Riese", "Sieb", "Sieg", "Stiefel", "Tier", "Wiese", "Ziel", "Zwiebel", "Papier", "Spiegel", "Krieg", "Ziege", "frieren", "liegen", "spielen", "fliegen", "schieben", "ziehen", "lieb", "schief", "tief", "viel", "vier", "sieben", "wieder", "nie"],
        kontrast: ["Kiste", "Fisch", "Tisch", "Bild", "Wind", "Kind", "Spinne", "Himmel", "Kinn", "Ring", "Kirsche", "Mitte", "Insel", "Pilz", "Licht", "bitten", "finden", "singen", "trinken", "wild"],
        stelle(w, t){
            if (t){ const i = w.indexOf("ie"); if (i >= 0) return rs_teil(w, i, 2, ["i", "ie"]); }
            const m = /i(?!e)/i.exec(w);
            return m ? rs_teil(w, m.index, 1, ["i", "ie"]) : null;
        },
    },
    sss: {
        name: "s, ss oder ß",
        regel: "Nach einem <strong>kurzen Vokal</strong> schreibt man <strong>ss</strong>: Fluss, Wasser, essen.<br>Nach einem <strong>langen Vokal</strong> oder nach <strong>ei, au, eu</strong> schreibt man <strong>ß</strong>, wenn das s scharf (stimmlos) klingt: Fuß, Straße, heiß.<br>Klingt das s weich und summend, schreibt man <strong>s</strong>: Hose, Rasen. Verlängere bei einsilbigen Wörtern: Gras → Gräser (summend → s).",
        merksatz: "Kurz → ss · lang und scharf → ß · summend → s",
        schritte: ["Ist der Vokal vor dem s-Laut kurz? → ss.", "Ist er lang oder ein ei, au, eu? → weiter prüfen.", "Klingt das s scharf (zischend)? → ß. Klingt es summend? → s.", "Einsilbige Wörter verlängern: Fuß → Fü-ße, Haus → Häu-ser."],
        pruefen: "Vokal kurz/lang? s-Laut scharf oder summend?",
        laenge: true,
        spalten: ["ss (Fluss)", "ß (Fuß)", "s (Hose)"],
        treffer: ["Fluss", "Kuss", "Schloss", "Nuss", "Wasser", "Tasse", "Kissen", "Messer", "Schlüssel", "Klasse", "Biss", "Riss", "Kasse", "essen", "wissen", "besser", "lassen", "müssen", "nass", "Fuß", "Gruß", "Spaß", "Straße", "Soße", "Kloß", "Floß", "Strauß", "groß", "süß", "heiß", "weiß", "fleißig", "draußen", "gießen", "schließen", "beißen", "fließen"],
        kontrast: ["Hose", "Nase", "Rose", "Rasen", "Besen", "Vase", "Wiese", "Gras", "Glas", "Haus", "Maus", "Gans", "Reise", "Ameise", "leise", "lesen", "Bluse", "Hase"],
        stelle(w, t){
            if (t){ const m = /(ß|ss)/.exec(w); if (m) return rs_teil(w, m.index, m[0].length, ["s", "ss", "ß"]); }
            const m = /s(?![sctp])/.exec(w);
            return m ? rs_teil(w, m.index, 1, ["s", "ss", "ß"]) : null;
        },
        spalteVon: w => /ss/.test(w) ? 0 : (/ß/.test(w) ? 1 : 2),
    },
    auslaut: {
        name: "Auslautverhärtung – Verlängern",
        regel: "Am Wortende und vor Konsonanten klingen <strong>b, d, g</strong> wie <strong>p, t, k</strong>: Hund klingt wie „Hunt“.<br>Mit der Strategie <strong>Verlängern</strong> hörst du den richtigen Buchstaben: Mehrzahl bilden (Hund → Hun-de), steigern (gelb → gel-ber) oder die Grundform bilden (sagt → sa-gen).",
        merksatz: "Verlängern hilft! Hund → Hun-de: Ich höre ein d.",
        schritte: ["Hörst du am Wortende p, t oder k? Vorsicht!", "Verlängere das Wort: Mehrzahl, steigern oder Grundform.", "Sprich die Verlängerung deutlich in Silben.", "Jetzt hörst du, ob b/p, d/t oder g/k richtig ist."],
        pruefen: "Verlängerung: Mehrzahl, steigern, Grundform",
        laenge: false,
        verlaengern: true,
        spalten: ["b, d, g am Ende (Hund)", "p, t, k am Ende (Hut)"],
        treffer: ["Hund|Hunde", "Kind|Kinder", "Wald|Wälder", "Bild|Bilder", "Rad|Räder", "Geld|Gelder", "Feld|Felder", "Hand|Hände", "Land|Länder", "Lied|Lieder", "Pferd|Pferde", "Mund|Münder", "Korb|Körbe", "Dieb|Diebe", "Sieb|Siebe", "Kalb|Kälber", "Stab|Stäbe", "Berg|Berge", "Weg|Wege", "Tag|Tage", "Zug|Züge", "Zwerg|Zwerge", "Burg|Burgen", "Teig|Teige", "Flug|Flüge", "Krieg|Kriege", "rund|runder", "gelb|gelber", "lieb|lieber", "halb|halbe", "klug|klüger", "wild|wilder", "blind|blinder", "fremd|fremder"],
        kontrast: ["Hut|Hüte", "Blut|blutig", "Gast|Gäste", "Rat|Räte", "Brot|Brote", "Boot|Boote", "Nest|Nester", "Bank|Bänke", "Werk|Werke", "Volk|Völker", "Park|Parks", "krank|kranker", "stark|stärker", "laut|lauter", "kalt|kälter", "bunt|bunter", "Typ|Typen"],
        stelle(w){
            const letzter = w[w.length - 1];
            const partner = { b: "p", p: "b", d: "t", t: "d", g: "k", k: "g" }[letzter];
            if (!partner) return null;
            const paar = "bdg".includes(letzter) ? [letzter, partner] : [partner, letzter];
            return rs_teil(w, w.length - 1, 1, paar);
        },
        spalteVon: w => "bdg".includes(w[w.length - 1]) ? 0 : 1,
    },
    aeau: {
        name: "ä/äu oder e/eu – Ableiten",
        regel: "<strong>ä</strong> und <strong>äu</strong> schreibt man, wenn es ein <strong>verwandtes Wort mit a oder au</strong> gibt (Ableiten): Bäume → Baum, Hände → Hand, kälter → kalt.<br>Findest du kein verwandtes Wort mit a/au, schreibst du meistens <strong>e</strong> oder <strong>eu</strong>: Feld, heute, Leute.",
        merksatz: "Ableiten hilft! Gibt es ein Wort mit a oder au? → ä oder äu.",
        schritte: ["Hörst du ein e oder eu? Vorsicht – es könnte ä oder äu sein.", "Suche ein verwandtes Wort: Einzahl, Grundform, Wortfamilie.", "Steht dort a oder au? → ä bzw. äu.", "Kein a/au zu finden? → meistens e bzw. eu."],
        pruefen: "Verwandtes Wort mit a oder au?",
        laenge: false,
        ableiten: true,
        spalten: ["ä / äu (Bäume)", "e / eu (Feld, heute)"],
        treffer: ["Bäume|Baum", "Räder|Rad", "Hände|Hand", "Gläser|Glas", "Äpfel|Apfel", "Bäcker|backen", "Kälte|kalt", "Wärme|warm", "Gärten|Garten", "Wände|Wand", "Blätter|Blatt", "Bänke|Bank", "Nächte|Nacht", "Stärke|stark", "Häuser|Haus", "Mäuse|Maus", "Bäuche|Bauch", "Zäune|Zaun", "Räuber|rauben", "Träume|Traum", "länger|lang", "älter|alt", "läuft|laufen", "träumen|Traum", "säubern|sauber"],
        kontrast: ["Feld|–", "Heft|–", "Welt|–", "Pferd|–", "Berg|–", "Nest|–", "Wetter|–", "Ende|–", "merken|–", "Feuer|–", "heute|–", "Leute|–", "Freund|–", "Eule|–", "Kreuz|–", "teuer|–", "neu|–", "Heu|–"],
        stelle(w, t){
            const m = t ? /(äu|ä)/i.exec(w) : /(eu|e(?!i))/i.exec(w.replace(/ie/gi, "##"));
            if (!m) return null;
            return rs_teil(w, m.index, m[0].length, m[0].length === 2 ? ["eu", "äu"] : ["e", "ä"]);
        },
    },
    dasdass: {
        name: "das oder dass",
        saetze: true,
        regel: "<strong>das</strong> ist ein Begleiter (Artikel: <em>das Haus</em>) oder ein Stellvertreter (Pronomen: <em>Das Buch, das ich lese …</em>). Man kann es durch <strong>dieses, jenes</strong> oder <strong>welches</strong> ersetzen.<br><strong>dass</strong> ist ein Bindewort (Konjunktion). Es leitet einen Nebensatz ein und steht meist nach einem <strong>Komma</strong> und nach Verben wie <em>wissen, hoffen, sagen, glauben</em>.",
        merksatz: "Kannst du dieses, jenes oder welches einsetzen? → das. Sonst → dass!",
        schritte: ["Lies den ganzen Satz.", "Setze probeweise dieses, jenes oder welches ein.", "Passt eines davon? → das (mit einem s).", "Passt keines? → dass (mit Doppel-s). Oft steht davor ein Komma."],
        pruefen: "Ersatzprobe: dieses / jenes / welches?",
        uebungText: "Mache in jedem Satz die Ersatzprobe und kreuze an: das oder dass?",
        spalten: ["dass (Bindewort)", "das (Begleiter / Stellvertreter)"],
        spaltenKurz: ["dass", "das"],
        treffer: ["Ich hoffe, *dass* du morgen kommst.", "Mama sagt, *dass* das Essen fertig ist.", "Wir wissen, *dass* die Ferien bald beginnen.", "Es ist schön, *dass* du da bist.", "Er glaubt, *dass* es heute regnet.", "Sie freut sich, *dass* sie gewonnen hat.", "Ich weiß, *dass* ich das schaffe.", "Der Lehrer erklärt, *dass* morgen ein Test ist.", "Tim merkt, *dass* sein Rad kaputt ist.", "Ich finde es gut, *dass* wir zusammen lernen.", "Sie hat gehört, *dass* der Bus ausfällt.", "Ich bin froh, *dass* alles geklappt hat.", "Wir haben gesehen, *dass* die Tür offen war.", "Es kann sein, *dass* wir später kommen.", "Paul behauptet, *dass* er der Schnellste ist.", "Ich wünsche mir, *dass* es schneit.", "Lena vergisst oft, *dass* sie Hausaufgaben hat.", "Achte darauf, *dass* du nichts vergisst.", "Die Ärztin meint, *dass* ich viel trinken soll.", "Ich ärgere mich, *dass* ich verschlafen habe."],
        kontrast: ["*Das* Fahrrad steht im Keller.", "Ich lese *das* Buch zu Ende.", "*Das* Kind spielt im Garten.", "Siehst du *das* Haus dort drüben?", "*Das* ist mein Lieblingslied.", "Das Spiel, *das* wir gestern gespielt haben, war lustig.", "Ich mag *das* Eis mit Schokolade.", "Das Pferd, *das* dort steht, heißt Max.", "Hast du *das* gewusst?", "*Das* Wetter ist heute schön.", "Das Handy, *das* auf dem Tisch liegt, gehört mir.", "Wir besuchen *das* Museum.", "*Das* habe ich nicht gesagt.", "Das Bild, *das* an der Wand hängt, ist alt.", "Gib mir bitte *das* Heft.", "*Das* Fenster ist offen.", "Das Geschenk, *das* du mir gegeben hast, ist toll.", "Ich kaufe *das* rote T-Shirt.", "*Das* Tor ist geschlossen.", "Kennst du *das* Mädchen?"],
        stelle(roh){
            const m = rs_markiert(roh);
            if (!m) return null;
            const gross = m.wort[0] === m.wort[0].toUpperCase();
            return { vor: m.vor, ziel: m.wort, nach: m.nach, optionen: gross ? ["Das", "Dass"] : ["das", "dass"] };
        },
    },
    grossklein: {
        name: "Groß- und Kleinschreibung",
        saetze: true,
        regel: "<strong>Nomen</strong> schreibt man groß. Du erkennst sie an der <strong>Artikelprobe</strong> (der, die, das, ein, eine) und an Endungen wie -ung, -heit, -keit, -nis.<br>Auch <strong>Verben und Adjektive werden groß</strong>, wenn sie als Nomen gebraucht werden (Nominalisierung). Signalwörter sind: <strong>das, beim, zum, im, am, vom</strong> und <strong>etwas, nichts, viel, alles</strong> vor einem Adjektiv: <em>beim Laufen, etwas Schönes</em>.",
        merksatz: "Steht ein Begleiter davor oder kann man einen davorsetzen? → groß!",
        schritte: ["Suche im Satz das Wort mit der Lücke.", "Steht ein Begleiter oder Signalwort davor (das, beim, zum, etwas, nichts, viel …)?", "Kannst du einen Artikel davorsetzen? → groß.", "Ist es ein Tun-Wort oder Wie-Wort ohne Begleiter? → klein."],
        pruefen: "Artikelprobe / Signalwort davor?",
        uebungText: "Prüfe das Wort mit der Lücke: groß oder klein? Setze den Anfangsbuchstaben ein.",
        spalten: ["groß (Nomen, Nominalisierung)", "klein (Verb, Adjektiv …)"],
        spaltenKurz: ["groß", "klein"],
        treffer: ["Beim *Laufen* bin ich schnell.", "Das *Lesen* macht mir Spaß.", "Zum *Schwimmen* gehen wir ins Bad.", "Ich wünsche dir viel *Glück*.", "Wir haben etwas *Schönes* erlebt.", "Heute ist nichts *Neues* passiert.", "Das *Rot* der Ampel leuchtet.", "Im *Winter* fahren wir Ski.", "Meine *Freundin* heißt Mia.", "Die *Angst* war groß.", "Er hat viel *Gutes* getan.", "Vor dem *Essen* waschen wir die Hände.", "Das *Spielen* im Regen ist lustig.", "Alles *Gute* zum Geburtstag!", "Die *Freiheit* ist wichtig.", "Am *Abend* lesen wir.", "Wir hatten viel *Spaß*.", "Das *Malen* fällt mir leicht.", "Etwas *Süßes* wäre jetzt toll.", "Die *Hoffnung* bleibt."],
        kontrast: ["Wir *laufen* zum Park.", "Ich *lese* gern Comics.", "Das Wasser ist *kalt*.", "Wir *schwimmen* im See.", "Der Hund ist *schön*.", "Mein Fahrrad ist *neu*.", "Die Ampel ist *rot*.", "Ich bin *glücklich*.", "Sie *malt* ein Bild.", "Er *spielt* Fußball.", "Wir *essen* um zwölf.", "Das war *gut*.", "Der Tee ist *süß*.", "Ich bin *müde*.", "Der Film war *spannend*.", "Wir *hoffen* auf Sonne.", "Tom ist *mutig*.", "Morgen *fahren* wir weg.", "Das Bild ist *groß*.", "Ich *freue* mich."],
        stelle(roh){
            const m = rs_markiert(roh);
            if (!m) return null;
            const erster = m.wort[0];
            return { vor: m.vor, ziel: erster, nach: m.wort.slice(1) + m.nach, optionen: [erster.toUpperCase(), erster.toLowerCase()] };
        },
    },
    vf: {
        name: "v oder f",
        regel: "Der f-Laut wird meistens mit <strong>f</strong> geschrieben: Fisch, Fenster, fertig.<br>Mit <strong>v</strong> schreibt man die Vorsilben <strong>ver-</strong> und <strong>vor-</strong> (verlieren, vorlesen) und einige <strong>Merkwörter</strong>: Vater, Vogel, viel, vier, voll, von, Volk, Vieh, Veilchen.",
        merksatz: "ver- und vor- immer mit v! Sonst meistens f – Merkwörter lernen.",
        schritte: ["Hörst du am Wortanfang ver- oder vor-? → v.", "Ist es ein Merkwort (Vater, Vogel, viel, vier, voll, von …)? → v.", "Sonst schreibst du meistens f.", "Unsicher? Im Wörterbuch nachschlagen."],
        pruefen: "Vorsilbe ver-/vor- oder Merkwort?",
        uebungText: "Lies jedes Wort, präge es dir ein und schreibe es daneben ab. Markiere v oder f farbig.",
        uebungLabel: "abschreiben",
        spalten: ["mit v (Vogel, verlieren)", "mit f (Fisch)"],
        treffer: ["Vater", "Vogel", "viel", "vier", "voll", "von", "Volk", "Vieh", "Veilchen", "Vorsicht", "verlieren", "vergessen", "verkaufen", "verstehen", "versuchen", "vorlesen", "vorbei", "Vorhang", "Verkehr", "Verband", "vielleicht", "vorne", "Vers", "verletzt"],
        kontrast: ["Fahrrad", "Feder", "Fenster", "Fisch", "für", "fertig", "fallen", "Fuß", "Ferien", "Fieber", "Feuer", "fliegen", "Frosch", "Fluss", "finden", "fragen", "Familie", "Farbe", "fünf", "Freund"],
        stelle(w){ return /^[fv]/i.test(w) ? rs_teil(w, 0, 1, ["f", "v"]) : null; },
    },
    doppelvokal: {
        name: "Doppelvokale aa, ee, oo",
        regel: "Ein langer Vokal wird meistens nur mit <strong>einem</strong> Buchstaben geschrieben: Hase, Tal, Rose.<br>Nur in wenigen Wörtern wird er <strong>verdoppelt</strong>: <strong>aa</strong> (Haar, Saal), <strong>ee</strong> (See, Tee), <strong>oo</strong> (Boot, Zoo). Diese Wörter sind <strong>Merkwörter</strong>. i und u werden nie verdoppelt.",
        merksatz: "aa, ee, oo gibt es nur in Merkwörtern – sie muss man lernen!",
        schritte: ["Sprich das Wort: Ist der Vokal lang?", "Langer Vokal → meistens nur ein Buchstabe.", "Ist es ein Merkwort mit aa, ee oder oo? → verdoppeln.", "Merkwörter sammeln und regelmäßig üben."],
        pruefen: "Merkwort mit aa, ee, oo?",
        uebungText: "Lies jedes Wort, präge es dir ein und schreibe es daneben ab. Markiere den langen Vokal.",
        uebungLabel: "abschreiben",
        spalten: ["aa, ee, oo (Boot)", "einfacher langer Vokal (Hose)"],
        treffer: ["Haar", "Paar", "Saal", "Waage", "Aal", "Staat", "Boot", "Moos", "Moor", "Zoo", "Tee", "See", "Meer", "Beere", "Klee", "Schnee", "Fee", "leer", "Idee", "Allee", "Seele", "Teer", "Speer", "Kaffee", "Beet"],
        kontrast: ["Hase", "Tal", "Name", "Rose", "Hof", "Ton", "Regen", "Besen", "Ofen", "Note", "Tafel", "Weg", "Schere", "Hose", "Nase", "Tomate", "Kino", "leben", "malen", "Schal"],
        stelle(w, t){
            if (t){ const m = /(aa|ee|oo)/i.exec(w); if (m) return rs_teil(w, m.index, 2, [m[0][0].toLowerCase(), m[0].toLowerCase()]); }
            const m = /[aeo]/i.exec(w);
            return m ? rs_teil(w, m.index, 1, [m[0].toLowerCase(), m[0].toLowerCase() + m[0].toLowerCase()]) : null;
        },
    },
    iglich: {
        name: "Endungen -ig und -lich",
        regel: "Die Endungen <strong>-ig</strong> und <strong>-lich</strong> klingen am Wortende fast gleich (<em>lustich – fröhlich</em>).<br>Mit der Strategie <strong>Verlängern</strong> hörst du den Unterschied: <em>lusti<strong>g</strong> → lusti<strong>g</strong>er</em> (du hörst ein g), <em>fröhli<strong>ch</strong> → fröhli<strong>ch</strong>er</em> (du hörst ch).",
        merksatz: "Verlängern hilft: lustig → lustiger (g) · fröhlich → fröhlicher (ch)",
        schritte: ["Hörst du am Ende -ich? Vorsicht!", "Verlängere das Wort: lustiger, die lustige …", "Hörst du ein g? → -ig.", "Hörst du ch? → -lich."],
        pruefen: "Verlängern: hörst du g oder ch?",
        verlaengern: true,
        spalten: ["-ig (lustig)", "-lich (fröhlich)"],
        treffer: ["lustig|lustiger", "fleißig|fleißiger", "mutig|mutiger", "ruhig|ruhiger", "eilig|eiliger", "fertig|fertige", "günstig|günstiger", "durstig|durstiger", "hungrig|hungriger", "schmutzig|schmutziger", "salzig|salziger", "wichtig|wichtiger", "traurig|trauriger", "richtig|richtiger", "witzig|witziger", "eisig|eisiger", "sonnig|sonniger", "windig|windiger", "billig|billiger", "zornig|zorniger"],
        kontrast: ["freundlich|freundlicher", "fröhlich|fröhlicher", "herrlich|herrlicher", "glücklich|glücklicher", "ehrlich|ehrlicher", "gefährlich|gefährlicher", "deutlich|deutlicher", "ängstlich|ängstlicher", "schrecklich|schrecklicher", "persönlich|persönliche", "ordentlich|ordentlicher", "gemütlich|gemütlicher", "pünktlich|pünktlicher", "nützlich|nützlicher", "zärtlich|zärtlicher"],
        stelle(w){
            if (/ig$/.test(w)) return rs_teil(w, w.length - 1, 1, ["g", "ch"]);
            if (/ich$/.test(w)) return rs_teil(w, w.length - 2, 2, ["g", "ch"]);
            return null;
        },
    },
    spst: {
        name: "sp und st am Wortanfang",
        regel: "Am Wort- oder Silbenanfang sprichst du <strong>schp</strong> und <strong>scht</strong> – du schreibst aber <strong>sp</strong> und <strong>st</strong>: Sport, Stein, ver-ste-hen.<br>Bei anderen Lauten (schl, schm, schn, schr, schw) schreibst du <strong>sch</strong>: Schnee, schreiben.",
        merksatz: "Ich spreche schp und scht – ich schreibe sp und st!",
        schritte: ["Sprich das Wort deutlich.", "Hörst du am Anfang schp oder scht?", "Dann schreibst du sp oder st.", "Hörst du sch + l, m, n, r, w? → sch."],
        pruefen: "Höre ich schp / scht oder schl, schn …?",
        uebungText: "Lies jedes Wort deutlich vor und schreibe es daneben ab. Markiere sp, st oder sch.",
        uebungLabel: "abschreiben",
        spalten: ["sp / st (Sport, Stein)", "sch (Schnee)"],
        treffer: ["Sport", "Spiel", "Spinne", "springen", "sparen", "spät", "Spaß", "spitz", "sprechen", "Spur", "Spiegel", "spülen", "Stein", "Stuhl", "Stern", "stark", "Stift", "Straße", "stehen", "still", "Stunde", "Sturm", "Stadt", "Strand"],
        kontrast: ["Schule", "Schaf", "schön", "Schwein", "schreiben", "Schnee", "schlafen", "Schmetterling", "Schrank", "schwimmen", "Schloss", "schnell", "Schwester", "Schlange", "schmal"],
        stelle(w, t){
            if (t){ const m = /^(sp|st)/i.exec(w); if (m) return rs_teil(w, 0, 2, m[0].toLowerCase() === "sp" ? ["sp", "schp"] : ["st", "scht"]); }
            return /^sch/i.test(w) ? rs_teil(w, 0, 3, ["sch", "s"]) : null;
        },
    },
    silbenh: {
        name: "Silbentrennendes h",
        regel: "Zwischen zwei Silben steht oft ein <strong>h</strong>, das man kaum hört: ge-hen, Schu-he, nä-hen. Es trennt die beiden Vokale.<br>Bei <strong>kurzen Wörtern</strong> findest du es durch <strong>Verlängern</strong>: Schuh → Schu-he, Reh → Re-he, früh → frü-her.<br>Nach ei, au, eu steht meistens <strong>kein</strong> h: bau-en, freu-en.",
        merksatz: "Verlängern oder in Silben sprechen: ge-hen → das h trennt die Silben!",
        schritte: ["Sprich das Wort in Silben.", "Stoßen zwei Vokale zusammen (ge-en)? → meistens h dazwischen.", "Kurzes Wort? Verlängern: Schuh → Schu-he.", "Nach au, eu, ei meist kein h: bau-en."],
        pruefen: "In Silben sprechen oder verlängern",
        uebungText: "Schreibe jedes Wort in Silben getrennt auf (ge-hen, bau-en). Kurze Wörter vorher verlängern.",
        uebungLabel: "in Silben",
        spalten: ["mit h (ge-hen, Schu-he)", "ohne h (bau-en)"],
        treffer: ["gehen", "sehen", "stehen", "drehen", "nähen", "mähen", "krähen", "ziehen", "fliehen", "blühen", "glühen", "früher", "Schuhe", "Kühe", "Flöhe", "Rehe", "Zehen", "Ruhe", "Mühe", "Höhe", "Nähe", "Schuh", "Kuh", "Floh", "Reh", "froh", "früh"],
        kontrast: ["säen", "bauen", "freuen", "Bauer", "Ruine", "Poet", "Theater", "kauen", "trauen", "Mauer", "Duell", "Trauer", "schauen", "Feuer"],
        stelle(w, t){
            if (t){
                const m = /([aeiouäöü])h(?=[aeiouäöü]|$)/i.exec(w);
                if (m) return rs_teil(w, m.index + 1, 1, ["h", "–"]);
            }
            const ZWIELAUTE = ["ei", "au", "eu", "ie", "äu", "ee", "aa", "oo"];
            for (let k = 1; k < w.length; k++){
                const a = w[k - 1].toLowerCase(), b = w[k].toLowerCase();
                if ("aeiouäöü".includes(a) && "aeiouäöü".includes(b) && !ZWIELAUTE.includes(a + b)) return rs_teil(w, k, 0, ["h", "–"]);
            }
            return null;
        },
    },
    chsx: {
        name: "chs, x oder ks/cks",
        regel: "Der Laut <strong>ks</strong> kann ganz unterschiedlich geschrieben werden: <strong>chs</strong> (Fuchs, wachsen), <strong>x</strong> (Hexe, Taxi), <strong>ks</strong> (Keks, links) oder <strong>cks</strong> (Klecks).<br>Am häufigsten ist <strong>chs</strong>. Wörter mit x, ks und cks sind meist <strong>Merkwörter</strong>. Tipp: Gibt es ein verwandtes Wort mit ck? Dann cks (Klecks – kleckern).",
        merksatz: "Der ks-Laut hat viele Gesichter – am häufigsten ist chs!",
        schritte: ["Hörst du ks? Vorsicht: chs, x, ks oder cks.", "Kennst du das Wort als Merkwort?", "Gibt es ein verwandtes Wort mit ck? → cks.", "Sonst ist chs am wahrscheinlichsten – im Zweifel nachschlagen."],
        pruefen: "Merkwort? Verwandtes Wort mit ck?",
        uebungText: "Lies jedes Wort, präge es dir ein und schreibe es daneben ab. Markiere chs, x, ks oder cks.",
        uebungLabel: "abschreiben",
        spalten: ["chs (Fuchs)", "x (Hexe)", "ks / cks (Keks, Klecks)"],
        treffer: ["Fuchs", "Dachs", "Lachs", "Ochse", "wachsen", "sechs", "Wechsel", "Achse", "Büchse", "Gewächs", "Eidechse", "Deichsel", "Wachs", "Drechsler"],
        kontrast: ["Hexe", "Taxi", "Text", "Mixer", "Boxer", "Axt", "Nixe", "Lexikon", "Keks", "links", "Klecks", "Knacks", "Koks", "Häcksel"],
        stelle(w){
            const m = /(chs|cks|ks|x)/i.exec(w);
            return m ? rs_teil(w, m.index, m[0].length, ["chs", "x", "ks", "cks"]) : null;
        },
        spalteVon: w => /chs/i.test(w) ? 0 : (/x/i.test(w) ? 1 : 2),
    },
};

RS_SCHWERPUNKTE.schaerfung.laengeVon = (w, t) => t ? "kurz" : "lang";
RS_SCHWERPUNKTE.ie.laengeVon = (w, t) => t ? "lang" : "kurz";
RS_SCHWERPUNKTE.dehnung.laengeVon = () => "lang";
RS_SCHWERPUNKTE.cktz.laengeVon = (w, t) => t ? "kurz" : null;
RS_SCHWERPUNKTE.sss.laengeVon = w => /ss/.test(w) ? "kurz" : (/ß/.test(w) ? "lang" : null);

// Zerlegt ein Wort an der Rechtschreibstelle: vor · Ziel · nach (+ Auswahl)
function rs_teil(w, index, laenge, optionen){
    return { vor: w.slice(0, index), ziel: w.slice(index, index + laenge), nach: w.slice(index + laenge), optionen };
}
// In Sätzen ist das Prüfwort mit *Sternchen* markiert
function rs_markiert(roh){
    const m = /\*([^*]+)\*/.exec(roh);
    if (!m) return null;
    return { vor: roh.slice(0, m.index).replace(/\*/g, ""), wort: m[1], nach: roh.slice(m.index + m[0].length).replace(/\*/g, "") };
}
function rs_roh(eintrag){ return eintrag.split("|")[0]; }
function rs_wort(eintrag){ return rs_roh(eintrag).replace(/\*/g, ""); }
function rs_hilfe(eintrag){ return eintrag.split("|")[1] || ""; }

// Wortvorrat einer Serie: Treffer und Kontrast gemischt, jeweils mit Kennzeichen
// Eigene Fehlerwörter aus der Förderkartei (nur die, an denen die Regel-Stelle erkannt wird)
function rs_eigeneListe(sp){ return (sp.eigene || []).filter(e => !sp.saetze && sp.stelle(e, true)); }
function rs_vorrat(sp, anteilTreffer = 0.65){
    const eigene = rs_eigeneListe(sp);
    const treffer = [...mische(eigene), ...mische(sp.treffer.filter(e => !eigene.includes(rs_wort(e))))].map(e => ({ e, t: true }));
    const kontrast = mische(sp.kontrast).map(e => ({ e, t: false }));
    let ti = 0, ki = 0;
    return () => {
        if (Math.random() < anteilTreffer || !kontrast.length) return treffer[ti++ % treffer.length];
        return kontrast[ki++ % kontrast.length];
    };
}

// Wort oder Satz mit Lücke an der Rechtschreibstelle
function rs_lueckenwort(sp, x){
    const st = sp.stelle(rs_roh(x.e), x.t);
    if (!st) return null;
    const klasse = sp.saetze ? "rs-satz" : "rs-wort";
    return { t: x.t, html: `<span class="${klasse}">${ws_esc(st.vor)}<span class="rs-luecke">${L(ws_esc(st.ziel === "" ? "–" : st.ziel))}</span>${ws_esc(st.nach)}</span>`, st, w: rs_wort(x.e), ziel: sp.saetze ? (rs_markiert(rs_roh(x.e)) || {}).wort : rs_wort(x.e) };
}
function rs_optionen(st){ return `<span class="rs-optionen">${st.optionen.map(o => `<span>${o}</span>`).join("")}</span>`; }

// Falsche Schreibungen, die zufällig echte Wörter wären – werden nicht als "Fehler" angeboten
const RS_ECHTE_WOERTER = new Set(["stil", "rosse", "hasse", "nasse", "wahre", "lid", "läute", "häute", "fällt", "rasse", "masse", "busse", "muse", "fiel", "biss", "ries", "wiese", "mal", "wal", "ton", "tone", "bete", "hüte", "statt", "kam", "stall", "fell", "wollen", "see", "boot", "moos", "leer", "staat", "fiel", "volk", "voll", "fiel", "viel", "fast", "vast"]);

// Falsche Schreibung (für den Fehlerdetektiv)
function rs_falsch(sp, x){
    const st = sp.stelle(rs_roh(x.e), x.t);
    if (!st) return null;
    const ziel = st.ziel === "" ? "–" : st.ziel;
    // Groß-/Kleinschreibung nur beim Schwerpunkt Groß/klein unterscheiden (sonst wäre "V" ≠ "v")
    const gleich = (a, b) => sp.saetze ? a === b : a.toLowerCase() === b.toLowerCase();
    const andere = st.optionen.filter(o => !gleich(o, ziel));
    if (!andere.length) return null;
    let ersatz = zufallsElement(andere);
    if (ersatz === "–") ersatz = "";
    // Großschreibung am Wort-/Satzanfang erhalten (Ende → Änd…, Vater → Fater)
    if (st.vor === "" && st.ziel && st.ziel[0] === st.ziel[0].toUpperCase() && st.ziel[0] !== st.ziel[0].toLowerCase() && ersatz && !sp.saetze){
        ersatz = ersatz[0].toUpperCase() + ersatz.slice(1);
    }
    const falsch = st.vor + ersatz + st.nach;
    return RS_ECHTE_WOERTER.has(falsch.toLowerCase()) ? null : falsch;
}

function rs_schwerpunkt(){
    const el = document.getElementById("rs-schwerpunkt");
    return RS_SCHWERPUNKTE[(el && el.value) || "schaerfung"];
}

/* ---------- Die sechs Rechtschreib-Blätter (Wörter oder Sätze) ---------- */

function rsB_regel(ctx){
    const sp = ctx.rs;
    const n = sp.saetze ? 2 : 4;
    const trenner = sp.saetze ? " · " : ", ";
    const bsp = (liste, k) => mische(liste).slice(0, k).map(e => rs_wort(e) + (rs_hilfe(e) && rs_hilfe(e) !== "–" ? ` (${rs_hilfe(e)})` : "")).join(trenner);
    const naechstes = rs_vorrat(sp, 0.55);
    // Beispiele passend zu den Spalten (bei s/ss/ß und chs/x/ks nach Spalten getrennt)
    const beispielSpalten = () => {
        if (!sp.spalteVon) return `<div><b>${sp.spalten[0]}</b>${ws_esc(bsp(sp.treffer, n))}</div><div><b>${sp.spalten[1]}</b>${ws_esc(bsp(sp.kontrast, n))}</div>`;
        const gruppen = sp.spalten.map(() => []);
        [...sp.treffer, ...sp.kontrast].forEach(e => gruppen[sp.spalteVon(rs_wort(e))].push(e));
        return sp.spalten.map((titel, k) => `<div><b>${titel}</b>${ws_esc(bsp(gruppen[k], n))}</div>`).join("");
    };

    let zeile, behaelter, uebung;
    if (sp.saetze){
        // Sätze: Lücke füllen mit Auswahl
        zeile = i => {
            for (let v = 0; v < 20; v++){
                const lw = rs_lueckenwort(sp, naechstes());
                if (lw) return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div>${lw.html}${rs_optionen(lw.st)}</div>`;
            }
            return "";
        };
        behaelter = `<div class="fs-reihen fs-fuell"></div>`;
        uebung = sp.uebungText;
    } else {
        zeile = i => {
            const x = naechstes();
            const w = rs_wort(x.e), hilfe = rs_hilfe(x.e);
            let rechts;
            if (sp.laenge){
                const kl = sp.laengeVon ? sp.laengeVon(w, x.t) : null;
                rechts = `<span class="fs-kreuz"><span>${fs_kreuzBox(kl === "kurz")} kurz</span><span>${fs_kreuzBox(kl === "lang")} lang</span></span>`;
            }
            else if (sp.verlaengern) rechts = `<span>→ verlängert: <span class="rs-linie">${hilfe ? L(ws_esc(hilfe)) : ""}</span></span>`;
            else if (sp.ableiten) rechts = `<span>→ verwandt: <span class="rs-linie">${hilfe ? L(ws_esc(hilfe === "–" ? "– (kein a/au)" : hilfe)) : ""}</span></span>`;
            else if (sp.uebungLabel === "in Silben") rechts = `<span>→ in Silben: <span class="rs-linie">${L(ws_esc(silben_trennen(w).join("-")))}</span></span>`;
            else rechts = `<span>→ ${sp.uebungLabel || "abschreiben"}: <span class="rs-linie"></span></span>`;
            return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div><span class="rs-wort" style="flex:1;">${ws_esc(w)}</span>${rechts}</div>`;
        };
        behaelter = `<div class="fs-zweispaltig fs-fuell"></div>`;
        uebung = sp.uebungText || (sp.laenge ? "Sprich jedes Wort in Silben. Ist der betonte Vokal kurz oder lang? Kreuze an."
            : (sp.verlaengern ? "Verlängere jedes Wort und schreibe die Verlängerung auf. Sprich sie deutlich."
            : "Schreibe zu jedem Wort ein verwandtes Wort auf (wenn es eines mit a/au gibt)."));
    }
    const eigene = rs_eigeneListe(sp);
    return { titel: sp.name, zeile, schritt: sp.saetze ? 1 : 2, html: `
        ${eigene.length ? `<div class="fs-ziel" style="font-size:16px;">★ Mit deinen eigenen Wörtern: ${eigene.slice(0, 8).map(ws_esc).join(", ")}</div>` : ""}
        <div class="rs-regel">${sp.regel}</div>
        <div class="rs-merksatz">${sp.merksatz}</div>
        <div class="rs-beispiele" style="grid-template-columns:repeat(${sp.spalten.length}, minmax(0,1fr));">${beispielSpalten()}</div>
        <div><b style="font-size:16px;">So gehst du vor:</b><ol class="rs-schritte">${sp.schritte.map(s => `<li>${s}</li>`).join("")}</ol></div>
        ${ws_aufgabe(1, uebung)}
        ${behaelter}` };
}

function rsB_luecken(ctx){
    const sp = ctx.rs;
    const naechstes = rs_vorrat(sp, 0.55);
    const zeile = i => {
        for (let v = 0; v < 20; v++){
            const lw = rs_lueckenwort(sp, naechstes());
            if (!lw) continue;
            if (sp.saetze) return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div>${lw.html}${rs_optionen(lw.st)}</div>`;
            return `<div class="fs-karte" style="justify-content:space-between;">${lw.html}${rs_optionen(lw.st)}</div>`;
        }
        return "";
    };
    return { titel: sp.saetze ? "Lückensätze" : "Lückenwörter", zeile, schritt: sp.saetze ? 1 : 2, html: `
        <div class="fs-ziel">Schwerpunkt: ${sp.name}</div>
        ${ws_aufgabe(1, sp.saetze
            ? "Was gehört in die Lücke? Wende die Strategie an und kreise die richtige Schreibung ein."
            : "Was gehört in die Lücke? Wende die Strategie an und kreise die richtige Schreibung ein. Schreibe danach das ganze Wort auf ein Extrablatt.")}
        <div class="${sp.saetze ? "fs-reihen" : "fs-zweispaltig"} fs-fuell"></div>` };
}

function rsB_sortieren(ctx){
    const sp = ctx.rs;
    if (sp.saetze){
        // Sätze: Lücke füllen und die Regel zuordnen
        const naechstes = rs_vorrat(sp, 0.5);
        const zeile = i => {
            for (let v = 0; v < 20; v++){
                const lw = rs_lueckenwort(sp, naechstes());
                if (lw) return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div>${lw.html}<span class="fs-kreuz">${sp.spaltenKurz.map((k, j) => `<span>${fs_kreuzBox(j === (lw.t ? 0 : 1))} ${k}</span>`).join("")}</span></div>`;
            }
            return "";
        };
        return { titel: "Zuordnen", zeile, html: `
            ${ws_aufgabe(1, "Lies jeden Satz und prüfe mit der Strategie. Kreuze an, was in die Lücke gehört, und schreibe es hinein.")}
            <div class="rs-beispiele" style="grid-template-columns:repeat(${sp.spalten.length}, minmax(0,1fr));">${sp.spalten.map(t => `<div><b>Tipp</b>${t}</div>`).join("")}</div>
            <div class="fs-reihen fs-fuell"></div>` };
    }
    const n = sp.spalten.length;
    const eigene = rs_eigeneListe(sp).slice(0, 8);
    const auswahl = mische([...eigene.map(e => ({ e, t: true })), ...mische(sp.treffer).filter(e => !eigene.includes(e)).slice(0, 10 - eigene.length).map(e => ({ e, t: true })), ...mische(sp.kontrast).slice(0, 6).map(e => ({ e, t: false }))]);
    const woerter = auswahl.map(x => rs_wort(x.e));
    const spalten = sp.spalten.map(() => []);
    auswahl.forEach(x => spalten[sp.spalteVon ? sp.spalteVon(rs_wort(x.e)) : (x.t ? 0 : 1)].push(rs_wort(x.e)));
    const zeile = i => `<tr>${spalten.map(sp1 => `<td>${sp1[i] ? L(ws_esc(sp1[i])) : ""}</td>`).join("")}</tr>`;
    return { titel: "Wörter sortieren", zeile, max: 30, html: `
        ${ws_aufgabe(1, "Lies jedes Wort deutlich und prüfe es mit der Strategie. Schreibe es in die richtige Spalte. Streiche es oben durch, wenn du es einsortiert hast.")}
        <div class="rs-wortbank">${woerter.map(w => `<span>${ws_esc(w)}</span>`).join("")}</div>
        <table class="rs-tabelle"><thead><tr>${sp.spalten.map(s => `<th>${s}</th>`).join("")}</tr></thead><tbody class="fs-fuell"></tbody></table>` };
}

function rsB_fehler(ctx){
    const sp = ctx.rs;
    const naechstes = rs_vorrat(sp, 0.6);
    if (sp.saetze){
        const zeile = i => {
            const x = naechstes();
            let satz = rs_wort(x.e), istFalsch = false;
            if (Math.random() < 0.5){ const f = rs_falsch(sp, x); if (f){ satz = f; istFalsch = true; } }
            return `<div class="fs-karte" style="flex-wrap:wrap;"><div class="fs-reihe-nr">${i + 1}</div><span class="rs-satz">${ws_esc(satz)}</span><span class="fs-kreuz"><span>${fs_kreuzBox(!istFalsch)} richtig</span><span>${fs_kreuzBox(istFalsch)} falsch</span></span></div>`;
        };
        return { titel: "Fehlerdetektiv", zeile, html: `
            ${ws_aufgabe(1, "Ist der Satz richtig geschrieben? Kreuze an. Wenn er falsch ist: Streiche den Fehler durch und schreibe das Wort richtig darüber.")}
            <div class="fs-ziel">Schwerpunkt: ${sp.name}</div>
            <div class="fs-reihen fs-fuell"></div>` };
    }
    const zeile = i => {
        const woerter = [], richtig = [];
        const falschePlaetze = new Set(mische([0, 1, 2, 3]).slice(0, zufallsZahl(1, 2)));
        for (let k = 0; k < 4; k++){
            const x = naechstes();
            let wort = rs_wort(x.e), falsch = false;
            if (falschePlaetze.has(k)){ const f = rs_falsch(sp, x); if (f){ wort = f; falsch = true; richtig.push(rs_wort(x.e)); } }
            woerter.push({ wort, falsch });
        }
        return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-chips">${woerter.map(w => `<span class="rs-wort${w.falsch ? " fs-ls" : ""}" style="font-size:${fs_wortGroesse(w.wort, 140, 22)}px;">${ws_esc(w.wort)}</span>`).join("")}</div><span class="rs-linie" style="min-width:150px;">${L(ws_esc(richtig.join(", ")), richtig.join(", ").length > 14 ? "font-size:14px;" : "")}</span></div>`;
    };
    return { titel: "Fehlerdetektiv", zeile, html: `
        ${ws_aufgabe(1, "In jeder Reihe sind ein oder zwei Wörter falsch geschrieben. Streiche sie durch und schreibe sie rechts richtig auf.")}
        <div class="fs-ziel">Schwerpunkt: ${sp.name}</div>
        <div class="fs-reihen fs-fuell"></div>` };
}

function rsB_strategie(ctx){
    const sp = ctx.rs;
    const naechstes = rs_vorrat(sp, 0.55);
    const zeile = () => {
        for (let v = 0; v < 20; v++){
            const lw = rs_lueckenwort(sp, naechstes());
            if (lw) return `<tr><td style="font-size:${sp.saetze ? 17 : 20}px; height:auto; padding:8px 10px;">${lw.html}</td><td></td><td>${L(ws_esc(lw.ziel || lw.w))}</td></tr>`;
        }
        return "";
    };
    const breite = sp.saetze ? ["52%", "24%", "24%"] : ["34%", "36%", "30%"];
    return { titel: "Strategie-Check", zeile, max: 30, html: `
        ${ws_aufgabe(1, "Prüfe jede Lücke mit der Strategie. Notiere in der Mitte, wie du geprüft hast (z. B. Silben, Verlängerung, verwandtes Wort, Ersatzprobe). Schreibe rechts das richtige Wort.")}
        <div class="fs-ziel">So prüfst du: ${sp.pruefen}</div>
        <table class="rs-tabelle"><thead><tr><th style="width:${breite[0]};">${sp.saetze ? "Satz mit Lücke" : "Wort mit Lücke"}</th><th style="width:${breite[1]};">So habe ich geprüft</th><th style="width:${breite[2]};">richtiges Wort</th></tr></thead><tbody class="fs-fuell"></tbody></table>` };
}

function rsB_diktat(ctx){
    const sp = ctx.rs;
    // Sätze: alle gemischt · Wörter: erst die Trefferwörter, bei kurzen Listen auch die Gegenbeispiele (Merkwörter)
    const eigene = rs_eigeneListe(sp);
    const liste = sp.saetze ? mische([...sp.treffer, ...sp.kontrast]).map(rs_wort)
        : [...mische(eigene), ...mische(sp.treffer.filter(e => !eigene.includes(rs_wort(e)))), ...(sp.treffer.length < 24 ? mische(sp.kontrast) : [])].map(rs_wort);
    const kaestchen = '<span style="display:flex; gap:6px; flex:none;">' + '<span class="fs-kaestchen-klein" style="width:24px; height:24px;"></span>'.repeat(3) + "</span>";
    const zeile = i => {
        const w = liste[i];
        if (!w) return "";
        if (sp.saetze) return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div><span class="rs-satz">${ws_esc(w)}</span>${kaestchen}</div>`;
        return `<div class="fs-karte" style="justify-content:space-between;"><span class="rs-wort">${ws_esc(w)}</span>${kaestchen}</div>`;
    };
    return { titel: sp.saetze ? "Übungssätze & Partnerdiktat" : "Übungswörter & Partnerdiktat", zeile, schritt: sp.saetze ? 1 : 2, html: `
        ${ws_aufgabe(1, sp.saetze
            ? "Übe die Sätze so: <b>Lesen</b> – die Prüfstelle <b>markieren</b> und die Strategie anwenden – abdecken – <b>schreiben</b> – vergleichen. Für jeden richtigen Satz ein Kästchen ankreuzen."
            : "Übe die Wörter so: <b>Lesen</b> – in Silben sprechen – <b>Stelle markieren</b> – abdecken – <b>schreiben</b> – vergleichen. Für jedes richtig geschriebene Wort ein Kästchen ankreuzen.")}
        ${ws_aufgabe(2, `Partnerdiktat: Dein Partner diktiert dir die ${sp.saetze ? "Sätze" : "Wörter"}. Danach tauscht ihr.`)}
        <div class="${sp.saetze ? "fs-reihen" : "fs-zweispaltig"} fs-fuell"></div>` };
}

/* ---------- Aufmerksamkeit ab Klasse 5 ---------- */

// d2-artiges Zeichen: Buchstabe mit Strichen oben und unten
function fs_d2Zeichen(buchstabe, oben, unten){
    const striche = n => `<span style="display:flex; gap:3px; justify-content:center; height:9px;">${'<span style="width:2px; height:9px; background:#1E2A36;"></span>'.repeat(n)}</span>`;
    return `<span style="display:inline-flex; flex-direction:column; align-items:center; gap:2px; width:28px;">${striche(oben)}<span style="font-size:24px; line-height:1;">${buchstabe}</span>${striche(unten)}</span>`;
}

function fsB_d2(ctx){
    const st = fs_stufe(ctx);
    const pro = [12, 14, 16][st];
    const zeile = i => {
        let html = "", treffer = 0;
        for (let k = 0; k < pro; k++){
            const ziel = Math.random() < 0.3;
            let b, o, u;
            if (ziel){ b = "d"; o = zufallsZahl(0, 2); u = 2 - o; }
            else {
                do { b = Math.random() < 0.55 ? "d" : "p"; o = zufallsZahl(0, 2); u = zufallsZahl(0, 2); }
                while ((b === "d" && o + u === 2) || o + u === 0);
            }
            if (b === "d" && o + u === 2){ treffer++; html += LM(fs_d2Zeichen(b, o, u)); }
            else html += fs_d2Zeichen(b, o, u);
        }
        return fs_zaehlreihe(i, html, treffer);
    };
    return { titel: "Konzentrations-Test", zeile, html: `
        <div class="fs-ziel">Gesucht: jedes <b>d</b> mit genau <b>zwei</b> Strichen ${fs_d2Zeichen("d", 2, 0)} ${fs_d2Zeichen("d", 1, 1)} ${fs_d2Zeichen("d", 0, 2)}</div>
        ${ws_aufgabe(1, "Arbeite Reihe für Reihe von links nach rechts. Streiche jedes d mit genau zwei Strichen durch (egal ob oben, unten oder verteilt). Schreibe die Anzahl ins Kästchen. Arbeite zügig, aber genau – deine Lehrkraft kann 20 Sekunden pro Reihe vorgeben.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsB_geheimschrift(ctx){
    const ABC = "abcdefghijklmnopqrstuvwxyzäöü".split("");
    const zahlen = mische([...Array(ABC.length).keys()].map(i => i + 1));
    const code = {};
    ABC.forEach((b, i) => code[b] = zahlen[i]);
    const schluessel = ABC.map(b => `<span style="display:inline-flex; flex-direction:column; align-items:center; min-width:30px; border:1.5px solid #D8DFE7; border-radius:6px; padding:2px 0;"><b>${b}</b><span style="font-size:14px; color:#2C4A6E;">${code[b]}</span></span>`).join("");
    const zeile = i => {
        const w = ctx.wort(x => x.length >= 4 && x.length <= 10 && /^[a-zäöüß]+$/i.test(x) && !/ß/i.test(x)).toLowerCase();
        return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-chips" style="justify-content:flex-start;">${w.split("").map(b => `<div class="fs-chip"><span class="fs-chiptext" style="font-size:18px; min-width:38px; text-align:center;">${code[b]}</span><span class="fs-nrbox">${L(b)}</span></div>`).join("")}</div></div>`;
    };
    return { titel: "Geheimschrift", zeile, html: `
        ${ws_aufgabe(1, "Jede Zahl steht für einen Buchstaben. Entschlüssle die Wörter und schreibe die Buchstaben in die Kästchen.")}
        <div style="display:flex; flex-wrap:wrap; gap:5px; justify-content:center;">${schluessel}</div>
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsB_pfad(ctx){
    const anzahl = [9, 12, 15][fs_stufe(ctx)];
    const ABC = "ABCDEFGHIJKLMNO";
    const punkte = [];
    for (let i = 0; i < anzahl; i++){ punkte.push(String(i + 1)); punkte.push(ABC[i]); }
    const SP = 6, ZE = Math.ceil(punkte.length / SP) + 2;
    const felder = mische([...Array(SP * ZE).keys()]).slice(0, punkte.length);
    const html = punkte.map((p, k) => {
        const f = felder[k];
        const x = (f % SP + 0.5) / SP * 100 + (Math.random() - 0.5) * 8;
        const y = (Math.floor(f / SP) + 0.5) / ZE * 100 + (Math.random() - 0.5) * 5;
        const zahl = /\d/.test(p);
        return `<span style="position:absolute; left:${x}%; top:${y}%; transform:translate(-50%,-50%); width:46px; height:46px; border-radius:50%; border:2.5px solid ${zahl ? "#2C4A6E" : "#B23A2E"}; background:#fff; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:700; color:${zahl ? "#2C4A6E" : "#B23A2E"};">${p}</span>`;
    }).join("");
    return { titel: "Zahlen-Buchstaben-Pfad", html: `
        ${ws_aufgabe(1, `Verbinde im Wechsel Zahl und Buchstabe: 1 – A – 2 – B – 3 – C … bis ${anzahl} – ${ABC[anzahl - 1]}. Zeichne die Linie, ohne abzusetzen. Wie lange brauchst du?`)}
        <div class="fs-zeit"><span>Zeit:<span class="fs-l"></span>Sek.</span><span>Fehler:<span class="fs-l"></span></span></div>
        <div style="position:relative; width:100%; height:${ZE * 92}px; border:2px solid #D8DFE7; border-radius:16px;">${html}</div>` };
}

function fsB_rechenketten(ctx){
    const st = fs_stufe(ctx);
    const zeile = i => {
        const start = zufallsZahl(2, 12);
        let wert = start;
        const teile = [];
        for (let k = 0; k < [4, 5, 6][st]; k++){
            const moeglich = ["+"];
            if (wert > 2) moeglich.push("−");
            if (st > 0 && wert <= 15) moeglich.push("×");
            if (st > 0 && wert % 2 === 0 && wert >= 4) moeglich.push(":");
            const op = zufallsElement(moeglich);
            let z;
            if (op === "+"){ z = zufallsZahl(2, 9); wert += z; }
            else if (op === "−"){ z = zufallsZahl(1, Math.max(1, Math.min(9, wert - 1))); wert -= z; }
            else if (op === "×"){ z = zufallsZahl(2, 3); wert *= z; }
            else { z = 2; wert /= 2; }
            teile.push(`<span>${op} ${z}</span>`);
        }
        return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-code" style="justify-content:flex-start; flex:1; font-size:22px;"><span style="background:#E8EDF3;">${start}</span>${teile.join("")}<b style="align-self:center;">=</b></div><span class="fs-box">${L(wert, wert > 99 ? "font-size:16px;" : "")}</span></div>`;
    };
    return { titel: "Rechenketten", zeile, html: `
        ${ws_aufgabe(1, "Rechne im Kopf von links nach rechts – ohne Zwischenergebnisse aufzuschreiben. Schreibe nur das Endergebnis ins Kästchen.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsB_wortschlangen(ctx){
    const st = fs_stufe(ctx);
    const FUELL = "bcdfghklmnprstwz";
    const zeile = i => {
        const anzahl = [2, 2, 3][st];
        const woerter = [];
        while (woerter.length < anzahl){ const w = ctx.wort(x => x.length <= 9).toLowerCase(); if (!woerter.includes(w)) woerter.push(w); }
        let kette = "";
        const zufall = n => [...Array(n)].map(() => FUELL[zufallsZahl(0, FUELL.length - 1)]).join("");
        woerter.forEach(w => kette += zufall(zufallsZahl(2, [4, 6, 8][st])) + w);
        kette += zufall(zufallsZahl(2, 5));
        return `<div class="fs-karte" style="flex-direction:column; align-items:stretch; gap:8px;"><div style="display:flex; gap:10px; align-items:center;"><div class="fs-reihe-nr">${i + 1}</div><span style="font-size:22px; letter-spacing:3px; font-family:'Atkinson Hyperlegible', monospace; word-break:break-all;">${kette}</span></div><div style="display:flex; gap:20px; padding-left:36px;">${woerter.map(w => `<span class="rs-linie" style="min-width:150px;">${L(ws_esc(w))}</span>`).join("")}</div></div>`;
    };
    return { titel: "Wortschlangen", zeile, html: `
        ${ws_aufgabe(1, `In jeder Buchstabenschlange verstecken sich ${[2, 2, 3][st]} Wörter. Finde sie, markiere sie und schreibe sie darunter.`)}
        <div class="fs-reihen fs-fuell"></div>` };
}

function fsB_codes(ctx){
    const st = fs_stufe(ctx);
    const VERWECHSLER = { O: "0", "0": "O", I: "1", "1": "I", B: "8", "8": "B", S: "5", "5": "S", Z: "2", "2": "Z", E: "F", F: "E", M: "N", N: "M", 6: "G", G: "6" };
    const ZEICHEN = "ABCDEFGHKLMNPRSTUZ0123456789".split("");
    const laenge = [6, 8, 10][st];
    const zeile = i => {
        let code = [...Array(laenge)].map(() => zufallsElement(ZEICHEN));
        code.splice(Math.floor(laenge / 2), 0, "-");
        const a = code.join("");
        let b = a;
        if (Math.random() < 0.5){
            const stellen = mische([...code.keys()].filter(k => code[k] !== "-"));
            for (const k of stellen){
                const ersatz = VERWECHSLER[code[k]];
                if (ersatz){ const c = [...code]; c[k] = ersatz; b = c.join(""); break; }
            }
            if (b === a){ const c = [...code]; const k = stellen[0]; c[k] = c[k] === "A" ? "R" : "A"; b = c.join(""); }
        }
        const stil = "font-family:'Atkinson Hyperlegible', monospace; font-size:22px; letter-spacing:2px;";
        return `<tr><td style="${stil}">${a}</td><td style="${stil}">${b}</td><td>${fs_kreuzBox(a === b)}</td><td>${fs_kreuzBox(a !== b)}</td></tr>`;
    };
    return { titel: "Codes vergleichen", zeile, html: `
        ${ws_aufgabe(1, "Vergleiche die beiden Codes Zeichen für Zeichen. Achte besonders auf 0 und O, 1 und I, 8 und B, 5 und S. Sind sie genau gleich? Kreuze an.")}
        <table class="fs-vergleich"><thead><tr><th>Code 1</th><th>Code 2</th><th>gleich</th><th>verschieden</th></tr></thead><tbody class="fs-fuell"></tbody></table>` };
}

/* ---------- Bilder (Microsoft Fluent Emoji, MIT – Datei bilder.js) ---------- */
const BILD_URL = {};
function bild_da(){ return !!(window.LT_BILDER && Object.keys(window.LT_BILDER).length); }
// Spiegeln/Drehen wird direkt ins SVG geschrieben (CSS-Transformationen fehlen sonst im PDF)
function bild_url(key, schatten, spiegel = false, dreh = 0){
    const id = `${key}#${schatten ? 1 : 0}${spiegel ? 1 : 0}${dreh}`;
    if (!BILD_URL[id]){
        let svg = LT_BILDER[key][2];
        if (schatten) svg = svg.replace(/(fill|stop-color)="(?!none)[^"]*"/g, '$1="#34495E"').replace(/(fill-opacity|stop-opacity|opacity)="[^"]*"/g, "");
        const tr = (spiegel ? "translate(32 0) scale(-1 1) " : "") + (dreh ? `rotate(${dreh} 16 16)` : "");
        if (tr) svg = svg.replace(/(<svg[^>]*>)/, `$1<g transform="${dreh && spiegel ? `rotate(${dreh} 16 16) translate(32 0) scale(-1 1)` : tr.trim()}">`).replace(/<\/svg>\s*$/, "</g></svg>");
        BILD_URL[id] = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    }
    return BILD_URL[id];
}
// art: "" | "spiegel" | "schatten" | "schatten spiegel" | "dreh180" …
function bild(key, gr = 40, art = ""){
    const d = /dreh(-?\d+)/.exec(art);
    return `<img class="lt-bild" src="${bild_url(key, art.includes("schatten"), art.includes("spiegel"), d ? parseInt(d[1], 10) : 0)}" alt="" style="width:${gr}px; height:${gr}px;">`;
}
function bild_name(k){ return LT_BILDER[k][0]; }
function bild_tags(k){ return LT_BILDER[k][1].split(" "); }
function bild_haupt(k){ return bild_tags(k)[0]; }
function bilder_mit(tag){ return Object.keys(LT_BILDER).filter(k => bild_tags(k).includes(tag)); }
function bilder_alle(){ return Object.keys(LT_BILDER); }
// deutlich unsymmetrische Bilder – nur damit sind gespiegelte Varianten sichtbar
const BILD_SPIEGELBAR = ("hund katze maus hase kuh schwein pferd schaf ziege huhn hahn kueken ente schildkroete schlange fisch tropenfisch wal delfin hai robbe schnecke " +
    "elefant giraffe zebra affe kamel igel eichhoernchen papagei krokodil dino trex einhorn flamingo schwan adler taube vogel kaenguru nashorn nilpferd hirsch otter lama " +
    "auto bus zug flugzeug schiff rakete hubschrauber traktor feuerwehr polizei krankenwagen laster segelboot motorrad taxi rennauto skateboard banane karotte gitarre " +
    "trompete saxofon hammer saege axt stift fueller pinsel lupe schluessel loeffel besen teekanne").split(" ");
function bilder_spiegelbar(){ return BILD_SPIEGELBAR.filter(k => window.LT_BILDER && LT_BILDER[k]); }
// Oberbegriffe für „Was passt nicht?“ und Regelwechsel
const BILD_BEGRIFF = { tier: "Tiere", obst: "Obst", gemuese: "Gemüse", fahrzeug: "Fahrzeuge", kleidung: "Kleidung", musik: "Musikinstrumente", schule: "Schulsachen",
    werkzeug: "Werkzeuge", suess: "Süßigkeiten", wetter: "Wetter und Himmel", blume: "Blumen", wasser: "Tiere im Wasser", bauernhof: "Bauernhoftiere", vogel: "Vögel",
    insekt: "Krabbeltiere", zoo: "Zootiere", wald: "Waldtiere", luft: "Luftfahrzeuge", wasserfz: "Wasserfahrzeuge", sport: "Sportgeräte", pflanze: "Pflanzen", essen: "Essen" };
const BILD_GRUPPEN_LEICHT = ["tier", "obst", "gemuese", "fahrzeug", "kleidung", "musik", "schule", "werkzeug", "suess", "wetter", "blume"];
// knifflige Paare: Gruppe + „naheliegender“ Fremdling
const BILD_GRUPPEN_SCHWER = [["wasser", "bauernhof"], ["vogel", "insekt"], ["obst", "gemuese"], ["gemuese", "obst"], ["zoo", "bauernhof"], ["bauernhof", "zoo"], ["insekt", "vogel"],
    ["suess", "gemuese"], ["luft", "fahrzeug"], ["wasserfz", "fahrzeug"], ["blume", "pflanze"], ["wald", "zoo"], ["musik", "spiel"], ["werkzeug", "haushalt"], ["kleidung", "haushalt"]];

/* ---------- Niveau aus Klassenstufe + Schwierigkeit (0 = Kl. 1 leicht … 6 = Kl. 7/8 schwer) ---------- */
function au_niveau(ctx){
    const k = lt_klasse();
    const band = k <= 1 ? 0 : k === 2 ? 1 : k === 3 ? 2 : k === 4 ? 3 : k <= 6 ? 4 : 5;
    return Math.max(0, Math.min(6, band + fs_stufe(ctx) - 1));
}
function au_w(n, werte){ return werte[Math.min(werte.length - 1, Math.max(0, n))]; }
function au_gr(n){ return au_w(n, [46, 44, 40, 38, 34, 32, 30]); }
function au_kein(titel){
    return { titel, html: `<div class="fs-ziel">Die Bildersammlung (bilder.js) fehlt auf dem Server. Bitte die Datei bilder.js in den Leuchtturm-Ordner hochladen.</div>` };
}
function au_reihe(i, inhalt, rechts = ""){
    return `<div class="fs-reihe"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-reihe-inhalt">${inhalt}</div>${rechts}</div>`;
}
// Bild mit Lösungs-Kreuz (durchstreichen)
function au_x(html){ return `<span class="au-x">${html}<span class="fs-loes au-xm">✗</span></span>`; }

/* 1 · Bilder-Detektiv */
function au_bilderDetektiv(ctx){
    if (!bild_da()) return au_kein("Bilder-Detektiv");
    const n = au_niveau(ctx), gr = au_gr(n);
    const spiegel = n >= 3;
    const ziel = zufallsElement(spiegel ? bilder_spiegelbar() : bilder_alle());
    const gleich = bilder_mit(bild_haupt(ziel)).filter(k => k !== ziel);
    const fremd = bilder_alle().filter(k => bild_haupt(k) !== bild_haupt(ziel));
    const ablenker = n <= 1 ? mische(fremd).slice(0, 4) : mische(gleich).slice(0, n <= 3 ? 4 : 6);
    const pro = au_w(n, [7, 8, 9, 10, 11, 12, 12]);
    const zeile = i => {
        let html = "", t = 0;
        for (let k = 0; k < pro; k++){
            const r = Math.random();
            if (r < 0.27){ t++; html += LM(bild(ziel, gr)); }
            else if (spiegel && r < 0.45) html += bild(ziel, gr, "spiegel");
            else html += bild(zufallsElement(ablenker), gr);
        }
        return fs_zaehlreihe(i, html, t);
    };
    return { titel: "Bilder-Detektiv", zeile, html: `
        <div class="fs-ziel">Suche genau dieses Bild: ${bild(ziel, 64)}${spiegel ? `<span style="font-size:16px;">Achtung: Gespiegelte Bilder ${bild(ziel, 34, "spiegel")} zählen nicht!</span>` : ""}</div>
        ${ws_aufgabe(1, "Kreise in jeder Reihe jedes gesuchte Bild ein. Zähle und schreibe die Anzahl ins Kästchen.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

/* 2 · Doppelt gesucht – zwei Ziele, zwei Handlungen */
function au_doppelt(ctx){
    if (!bild_da()) return au_kein("Doppelt gesucht");
    const n = au_niveau(ctx), gr = au_gr(n) - 2;
    let a, b;
    if (n <= 1){ [a, b] = mische(bilder_alle()).slice(0, 2); while (bild_haupt(a) === bild_haupt(b)) b = zufallsElement(bilder_alle()); }
    else { const kat = zufallsElement(["tier", "obst", "fahrzeug", "essen", "spiel", "natur"]); [a, b] = mische(bilder_mit(kat)).slice(0, 2); }
    const andere = mische(bilder_mit(n <= 1 ? "natur" : bild_haupt(a)).filter(k => k !== a && k !== b)).slice(0, au_w(n, [2, 3, 3, 4, 5, 5, 6]));
    const pro = au_w(n, [8, 9, 10, 10, 11, 12, 12]);
    const zeile = i => {
        let html = "", ta = 0, tb = 0;
        for (let k = 0; k < pro; k++){
            const r = Math.random();
            if (r < 0.24){ ta++; html += LM(bild(a, gr)); }
            else if (r < 0.48){ tb++; html += au_x(bild(b, gr)); }
            else html += bild(zufallsElement(andere), gr);
        }
        return au_reihe(i, html, `<div class="au-zwei"><span>${bild(a, 22)}<span class="fs-zaehl au-klein">${L(ta)}</span></span><span>${bild(b, 22)}<span class="fs-zaehl au-klein">${L(tb)}</span></span></div>`);
    };
    return { titel: "Doppelt gesucht", zeile, html: `
        <div class="fs-ziel"><span>Einkreisen: ${bild(a, 50)}</span><span style="margin-left:24px;">Durchstreichen: ${bild(b, 50)}</span></div>
        ${ws_aufgabe(1, "Arbeite Reihe für Reihe. Kreise jedes erste Bild ein und streiche jedes zweite Bild durch. Zähle beide und trage die Anzahl ein.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

/* 3 · Was ist anders? – zwei Bildergitter vergleichen */
function au_unterschiede(ctx){
    if (!bild_da()) return au_kein("Was ist anders?");
    const n = au_niveau(ctx);
    const g = au_w(n, [3, 3, 4, 4, 5, 5, 6]), d = au_w(n, [2, 3, 3, 4, 5, 6, 7]), gr = au_w(n, [44, 42, 38, 36, 30, 28, 26]);
    const reif = lt_klasse() >= 5;
    const zeile = i => {
        const vorrat = mische(bilder_alle()).slice(0, Math.max(6, g * 2));
        const links = [...Array(g * g)].map(() => ({ k: zufallsElement(vorrat), art: "" }));
        const rechts = links.map(x => ({ ...x }));
        const stellen = mische([...Array(g * g).keys()]).slice(0, d);
        stellen.forEach(s => {
            const moeglich = ["tausch"];
            if (n >= 1) moeglich.push("weg");
            if (n >= 2 && BILD_SPIEGELBAR.includes(rechts[s].k)) moeglich.push("spiegel", "spiegel");
            const art = zufallsElement(moeglich);
            if (art === "tausch"){ let neu; do neu = zufallsElement(vorrat); while (neu === rechts[s].k); rechts[s].k = neu; }
            else if (art === "weg") rechts[s].k = null;
            else rechts[s].art = "spiegel";
        });
        const zelle = (x, mark) => {
            const inhalt = x.k ? bild(x.k, gr, x.art) : `<span style="display:inline-block; width:${gr}px; height:${gr}px;"></span>`;
            return `<div>${mark ? LM(inhalt) : inhalt}</div>`;
        };
        const gitter = (liste, marks) => `<div class="au-gitter" style="grid-template-columns:repeat(${g}, ${gr + 8}px); grid-auto-rows:${gr + 8}px;">${liste.map((x, k) => zelle(x, marks && stellen.includes(k))).join("")}</div>`;
        return `<div class="au-paar"><div class="fs-reihe-nr">${i + 1}</div>${gitter(links, false)}${gitter(rechts, true)}<div class="au-paar-zahl">${reif ? "Unterschiede" : "Ich finde"}<span class="fs-zaehl">${L(d)}</span>${reif ? "" : "Unterschiede"}</div></div>`;
    };
    return { titel: "Was ist anders?", zeile, max: 8, html: `
        ${ws_aufgabe(1, `Vergleiche das rechte Bild mit dem linken. Kreise im rechten Bild alle Unterschiede ein.${n >= 2 ? " Achtung: Auch gespiegelte oder fehlende Bilder zählen." : ""}`)}
        <div class="au-paare fs-fuell"></div>` };
}

/* 4 · Wer hat keinen Partner? */
function au_partner(ctx){
    if (!bild_da()) return au_kein("Wer hat keinen Partner?");
    const n = au_niveau(ctx), gr = au_gr(n);
    const paare = au_w(n, [3, 4, 4, 5, 5, 6, 6]), allein = n >= 4 ? 2 : 1;
    const zeile = i => {
        const kat = n >= 2 ? zufallsElement(["tier", "obst", "fahrzeug", "essen", "spiel", "natur", "kleidung", "haushalt"]) : null;
        const quelle = mische(kat ? bilder_mit(kat) : bilder_alle()).slice(0, paare + allein);
        const liste = mische([...quelle.slice(0, paare).flatMap(k => [k, k]), ...quelle.slice(paare)]);
        const einzeln = quelle.slice(paare);
        return au_reihe(i, liste.map(k => einzeln.includes(k) ? LM(bild(k, gr)) : bild(k, gr)).join(""));
    };
    return { titel: "Wer hat keinen Partner?", zeile, html: `
        ${ws_aufgabe(1, `In jeder Reihe kommt jedes Bild zweimal vor – nur ${allein === 1 ? "ein Bild ist allein" : "zwei Bilder sind allein"}. Finde ${allein === 1 ? "es und kreise es" : "sie und kreise sie"} ein.`)}
        <div class="fs-reihen fs-fuell"></div>` };
}

/* 5 · Schatten finden */
function au_schatten(ctx){
    if (!bild_da()) return au_kein("Welcher Schatten passt?");
    const n = au_niveau(ctx), gr = au_gr(n) + 6;
    const anzahl = au_w(n, [3, 3, 4, 4, 5, 5, 5]);
    const benutzt = new Set();
    const zeile = i => {
        let z; do z = zufallsElement(n >= 2 ? bilder_spiegelbar() : bilder_alle()); while (benutzt.has(z) && benutzt.size < 60);
        benutzt.add(z);
        const optionen = [{ k: z, art: "schatten", ok: true }];
        if (n >= 2 && BILD_SPIEGELBAR.includes(z)) optionen.push({ k: z, art: "schatten spiegel", ok: false });
        mische(bilder_mit(bild_haupt(z)).filter(k => k !== z)).slice(0, anzahl - optionen.length).forEach(k => optionen.push({ k, art: "schatten", ok: false }));
        const html = mische(optionen).map(o => `<span class="au-wahl">${bild(o.k, gr, o.art)}${fs_kreuzBox(o.ok, "width:26px; height:26px;")}</span>`).join("");
        return au_reihe(i, `<span class="au-vorbild">${bild(z, gr + 8)}</span><span class="au-pfeil">→</span>${html}`);
    };
    return { titel: "Welcher Schatten passt?", zeile, html: `
        ${ws_aufgabe(1, `Schau dir das Bild links genau an. Welcher Schatten gehört dazu? Kreuze an.${n >= 2 ? " Vorsicht: Manche Schatten sind gespiegelt!" : ""}`)}
        <div class="fs-reihen fs-fuell"></div>` };
}

/* 6 · Was passt nicht? (Bilder bis Kl. 4, Begriffe ab Kl. 5) */
function au_passtNicht(ctx){
    if (!bild_da()) return au_kein("Was passt nicht?");
    const n = au_niveau(ctx), gr = au_gr(n), woerter = lt_klasse() >= 5;
    const m = au_w(n, [4, 4, 5, 5, 5, 6, 6]);
    const mitBegriff = lt_klasse() >= 3;
    // botanisch strittig (Obst oder Gemüse?) – hier lieber weglassen
    const UNKLAR = ["avocado", "tomate", "gurke", "paprika", "chili", "kokos", "kartoffel"];
    const bilder_mit = tag => window.bilder_mit(tag).filter(k => !UNKLAR.includes(k));
    const bilder_alle = () => window.bilder_alle().filter(k => !UNKLAR.includes(k));
    const zeile = i => {
        let gruppe, fremd;
        if (n <= 2){
            gruppe = zufallsElement(BILD_GRUPPEN_LEICHT);
            const ausGruppe = bilder_mit(gruppe);
            fremd = zufallsElement(bilder_alle().filter(k => !bild_tags(k).includes(gruppe) && bild_haupt(k) !== bild_haupt(ausGruppe[0])));
        } else {
            let paar, kandidaten;
            do { paar = zufallsElement(BILD_GRUPPEN_SCHWER); kandidaten = bilder_mit(paar[1]).filter(k => !bild_tags(k).includes(paar[0])); } while (!kandidaten.length);
            gruppe = paar[0]; fremd = zufallsElement(kandidaten);
        }
        const teile = mische([...mische(bilder_mit(gruppe)).slice(0, m - 1), fremd]);
        const inhalt = woerter
            ? teile.map(k => `<span class="au-wort">${k === fremd ? au_x(ws_esc(bild_name(k))) : ws_esc(bild_name(k))}</span>`).join("")
            : teile.map(k => k === fremd ? au_x(bild(k, gr)) : bild(k, gr)).join("");
        const rechts = mitBegriff ? `<div class="au-begriff">Oberbegriff:<span class="au-linie">${L(BILD_BEGRIFF[gruppe] || "")}</span></div>` : "";
        return `<div class="au-pn${mitBegriff ? " mit" : ""}">${au_reihe(i, inhalt)}${rechts}</div>`;
    };
    return { titel: woerter ? "Welcher Begriff passt nicht?" : "Was passt nicht?", zeile, html: `
        ${ws_aufgabe(1, `${woerter ? "Ein Begriff" : "Ein Bild"} in jeder Reihe passt nicht zu den anderen. Streiche ${woerter ? "ihn" : "es"} durch.${mitBegriff ? " Schreibe den Oberbegriff für die übrigen auf." : ""}`)}
        <div class="fs-reihen fs-fuell"></div>` };
}

/* 7 · Bilder-Sudoku (4×4 / 6×6) */
function au_sudokuLoesung(s){
    const br = s === 4 ? 2 : 3, bh = 2;   // Kästen: 2×2 bzw. 2 Zeilen × 3 Spalten
    let g = [...Array(s)].map((_, r) => [...Array(s)].map((_, c) => (r * br + Math.floor(r / bh) + c) % s));
    const sym = mische([...Array(s).keys()]);
    g = g.map(r => r.map(v => sym[v]));
    // Zeilen innerhalb der Bänder und Bänder tauschen, Spalten innerhalb der Stapel und Stapel tauschen
    const baender = mische([...Array(s / bh).keys()]).flatMap(b => mische([...Array(bh).keys()]).map(k => b * bh + k));
    g = baender.map(r => g[r]);
    const stapel = mische([...Array(s / br).keys()]).flatMap(b => mische([...Array(br).keys()]).map(k => b * br + k));
    return g.map(r => stapel.map(c => r[c]));
}
function au_sudokuZaehlen(gitter, s, grenze = 2){
    const br = s === 4 ? 2 : 3, bh = 2;
    const leer = gitter.findIndex(v => v == null);
    if (leer < 0) return 1;
    const r = Math.floor(leer / s), c = leer % s;
    let anzahl = 0;
    for (let v = 0; v < s && anzahl < grenze; v++){
        let ok = true;
        for (let k = 0; k < s && ok; k++) if (gitter[r * s + k] === v || gitter[k * s + c] === v) ok = false;
        const r0 = Math.floor(r / bh) * bh, c0 = Math.floor(c / br) * br;
        for (let a = 0; a < bh && ok; a++) for (let b = 0; b < br && ok; b++) if (gitter[(r0 + a) * s + c0 + b] === v) ok = false;
        if (!ok) continue;
        gitter[leer] = v; anzahl += au_sudokuZaehlen(gitter, s, grenze - anzahl); gitter[leer] = null;
    }
    return anzahl;
}
function au_sudoku(ctx){
    const n = au_niveau(ctx), s = n <= 2 ? 4 : 6, mitBild = bild_da() && lt_klasse() <= 6;
    const leerZiel = s === 4 ? au_w(n, [5, 7, 9]) : au_w(n - 3, [14, 17, 20, 22]);
    const zeichen = mitBild ? mische(bilder_alle().filter((k, _, a) => true)).filter((k, i, a) => a.findIndex(x => bild_haupt(x) === bild_haupt(k)) === i).slice(0, s) : null;
    const zelle = s === 4 ? 64 : 52;
    const symbol = (v, gr) => mitBild ? bild(zeichen[v], gr) : `<span style="font-size:${gr * 0.8}px;">${v + 1}</span>`;
    const zeile = () => {
        const loes = au_sudokuLoesung(s).flat();
        const gitter = [...loes];
        for (const p of mische([...Array(s * s).keys()])){
            if (gitter.filter(v => v == null).length >= leerZiel) break;
            const alt = gitter[p]; gitter[p] = null;
            if (au_sudokuZaehlen([...gitter], s) !== 1) gitter[p] = alt;
        }
        const br = s === 4 ? 2 : 3;
        const html = gitter.map((v, k) => {
            const r = Math.floor(k / s), c = k % s;
            const rand = `${c % br === br - 1 && c < s - 1 ? "border-right:3px solid #2C4A6E;" : ""}${r % 2 === 1 && r < s - 1 ? "border-bottom:3px solid #2C4A6E;" : ""}`;
            return `<div style="${rand}">${v == null ? (mitBild ? L(`<span style="opacity:.55;">${bild(zeichen[loes[k]], zelle * 0.5)}</span><b style="font-size:14px;">${loes[k] + 1}</b>`) : L(loes[k] + 1, `font-size:${zelle * 0.55}px;`)) : symbol(v, zelle * 0.7)}</div>`;
        }).join("");
        return `<div class="au-sudoku" style="grid-template-columns:repeat(${s}, ${zelle}px); grid-template-rows:repeat(${s}, ${zelle}px);">${html}</div>`;
    };
    const legende = mitBild ? `<div class="fs-ziel" style="gap:18px;">${zeichen.map((k, v) => `<span style="display:inline-flex; align-items:center; gap:4px;">${bild(k, 36)}<b>= ${v + 1}</b></span>`).join("")}</div>` : "";
    return { titel: mitBild ? "Bilder-Sudoku" : "Zahlen-Sudoku", zeile, max: 12, extra: { max: 1 }, html: `
        ${ws_aufgabe(1, `In jeder Reihe, jeder Spalte und jedem dick umrandeten Kasten kommt jedes ${mitBild ? "Bild" : "Zahl von 1 bis " + s} genau einmal vor. ${mitBild ? "Male das fehlende Bild oder schreibe seine Zahl ins leere Feld." : "Trage die fehlenden Zahlen ein."}`)}
        ${legende}
        <div class="au-sudokus fs-fuell"></div>` };
}

/* 8 · Bilder-Reihen fortsetzen */
function au_reihen(ctx){
    if (!bild_da()) return au_kein("Wie geht die Reihe weiter?");
    const n = au_niveau(ctx), gr = au_gr(n) - 4;
    const MUSTER = [["AB", "AAB", "ABB"], ["AB", "AAB", "ABB", "ABC"], ["AAB", "ABC", "AABB", "ABBC", "ABAC"], ["ABC", "AABB", "ABBC", "ABCD", "ABAC", "S"],
        ["ABCD", "AABBC", "ABCB", "S", "SD", "ABAC"], ["ABCD", "AABBC", "ABCB", "SD", "ABCDC", "S"], ["ABCDE", "AABBC", "ABCDC", "SD", "ABACAD"]];
    const zeile = i => {
        const typ = zufallsElement(au_w(n, MUSTER));
        let folge;
        if (typ === "S"){                     // gleiches Bild, abwechselnd gespiegelt
            const k = zufallsElement(bilder_spiegelbar());
            folge = [{ k, art: "" }, { k, art: "" }, { k, art: "spiegel" }];
        } else if (typ === "SD"){             // Drehung in Vierteln
            const k = zufallsElement(bilder_spiegelbar());
            folge = [0, 90, 180, 270].map(w => ({ k, art: w ? "dreh" + w : "" }));
        } else {
            const buchst = [...new Set(typ.split(""))];
            const kat = n >= 3 ? zufallsElement(["tier", "obst", "fahrzeug", "essen", "spiel"]) : null;
            const wahl = mische(kat ? bilder_mit(kat) : bilder_alle()).slice(0, buchst.length);
            folge = typ.split("").map(b => ({ k: wahl[buchst.indexOf(b)], art: "" }));
        }
        const laenge = Math.min(au_w(n, [7, 8, 8, 9, 10, 10, 11]), 12);
        const gezeigt = [...Array(laenge)].map((_, k) => folge[k % folge.length]);
        const richtig = folge[laenge % folge.length];
        const gleich = (a, b) => a.k === b.k && a.art === b.art;
        const andere = mische([...folge.filter(x => !gleich(x, richtig)), { k: zufallsElement(bilder_alle()), art: "" }, { k: richtig.k, art: richtig.art === "spiegel" ? "" : (BILD_SPIEGELBAR.includes(richtig.k) && n >= 3 ? "spiegel" : "dreh180") }])
            .filter((x, idx, a) => !gleich(x, richtig) && a.findIndex(y => gleich(x, y)) === idx).slice(0, 2);
        const optionen = mische([{ ...richtig, ok: true }, ...andere.map(x => ({ ...x, ok: false }))]);
        return au_reihe(i, `<span class="au-folge">${gezeigt.map(x => bild(x.k, gr, x.art)).join("")}<span class="au-frage">?</span></span><span class="au-optionen">${optionen.map(o => `<span class="au-wahl">${bild(o.k, gr, o.art)}${fs_kreuzBox(o.ok, "width:24px; height:24px;")}</span>`).join("")}</span>`);
    };
    return { titel: "Wie geht die Reihe weiter?", zeile, html: `
        ${ws_aufgabe(1, "Erkenne die Regel in jeder Reihe. Welches Bild kommt als Nächstes? Kreuze rechts an.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

/* 9 · Bilder-Code: Bild = Buchstabe */
const AU_CODE_WOERTER = ["OMA", "OPA", "EIS", "AST", "BALL", "HAUS", "MAUS", "SONNE", "MOND", "ROSE", "NASE", "TOR", "BUS", "AUTO", "ESEL", "IGEL", "OFEN", "HUND", "KUH", "LAMA", "SOFA", "MUND", "TISCH", "BAUM", "BROT", "RAD", "NEST", "BOOT", "ENTE", "TOMATE", "BANANE", "SALAT", "LAMPE", "INSEL", "SEIL"];
function au_bildcode(ctx){
    if (!bild_da()) return au_kein("Bilder-Code");
    const n = au_niveau(ctx), maxBuchst = au_w(n, [10, 11, 12, 13, 14, 15, 16]);
    const [lmin, lmax] = au_w(n, [[3, 4], [3, 5], [3, 6], [4, 7], [4, 8], [5, 9], [5, 10]]);
    const quelle = mische([...ctx.pool, ...AU_CODE_WOERTER]).map(w => w.toUpperCase()).filter(w => /^[A-ZÄÖÜ]+$/.test(w) && w.length >= lmin && w.length <= lmax);
    const woerter = [], buchst = new Set();
    for (const w of quelle){
        if (woerter.includes(w)) continue;
        const neu = new Set([...buchst, ...w]);
        if (neu.size <= maxBuchst){ woerter.push(w); w.split("").forEach(b => buchst.add(b)); }
        if (woerter.length >= 10) break;
    }
    const liste = [...buchst].sort();
    const bilder = mische(bilder_alle()).filter((k, i, a) => a.findIndex(x => bild_haupt(x) === bild_haupt(k)) === i || i > 40).slice(0, liste.length);
    const code = {}; liste.forEach((b, i) => code[b] = bilder[i]);
    const gr = au_w(n, [40, 38, 36, 34, 32, 30, 30]);
    const schluessel = liste.map(b => `<span class="au-schl">${bild(code[b], 34)}<b>${b}</b></span>`).join("");
    const zeile = i => i < woerter.length
        ? `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-chips" style="justify-content:flex-start;">${woerter[i].split("").map(b => `<div class="au-code">${bild(code[b], gr)}<span class="fs-nrbox">${L(b)}</span></div>`).join("")}</div></div>`
        : i === woerter.length ? `<div class="fs-karte" style="flex-direction:column; align-items:stretch; gap:6px;"><b style="font-size:17px;">★ Dein Geheimwort: Male die Bilder für ein eigenes Wort. Dein Partner entschlüsselt es.</b><div style="${LT_LINIENFELD} min-height:68px; flex:none;"></div></div>` : "";
    return { titel: "Bilder-Code", zeile, max: woerter.length + 1, html: `
        ${ws_aufgabe(1, "Jedes Bild steht für einen Buchstaben. Schreibe unter jedes Bild den passenden Buchstaben. Lies dann das Wort.")}
        <div class="au-schluessel">${schluessel}</div>
        <div class="fs-reihen fs-fuell"></div>` };
}

/* 10 · Wimmelbild zählen */
function au_zaehlen(ctx){
    if (!bild_da()) return au_kein("Bilder zählen");
    const n = au_niveau(ctx);
    const typen = au_w(n, [3, 4, 4, 5, 5, 6, 6]), maxJe = au_w(n, [5, 7, 9, 10, 11, 12, 13]);
    const arten = mische(bilder_alle()).filter((k, i, a) => a.findIndex(x => bild_haupt(x) === bild_haupt(k)) === i).slice(0, typen);
    const anzahl = arten.map(() => zufallsZahl(Math.max(2, maxJe - 5), maxJe));
    const SP = 10, ZE = Math.ceil(anzahl.reduce((a, b) => a + b, 0) / SP) + 2;
    const felder = mische([...Array(SP * ZE).keys()]);
    let p = 0, html = "";
    const gr = au_w(n, [44, 42, 40, 38, 36, 34, 34]);
    arten.forEach((k, a) => {
        for (let j = 0; j < anzahl[a]; j++){
            const f = felder[p++];
            const x = (f % SP + 0.5) / SP * 100 + (Math.random() - 0.5) * 4, y = (Math.floor(f / SP) + 0.5) / ZE * 100 + (Math.random() - 0.5) * 3;
            const art = n >= 2 ? (Math.random() < 0.3 ? "dreh" + zufallsZahl(-35, 35) : (n >= 4 && Math.random() < 0.3 && BILD_SPIEGELBAR.includes(k) ? "spiegel" : "")) : "";
            html += `<span style="position:absolute; left:${x.toFixed(1)}%; top:${y.toFixed(1)}%; transform:translate(-50%,-50%);">${bild(k, gr, art)}</span>`;
        }
    });
    const tabelle = arten.map((k, a) => `<div class="au-zaehlfeld">${bild(k, 38)}<span class="fs-zaehl">${L(anzahl[a])}</span></div>`).join("");
    return { titel: "Wie viele sind es?", html: `
        ${ws_aufgabe(1, "Zähle jede Bildsorte. Tipp: Streiche jedes gezählte Bild mit einem kleinen Strich ab. Schreibe die Anzahl ins Kästchen.")}
        <div class="au-wimmel" style="flex:1; min-height:${ZE * 52}px;">${html}</div>
        <div class="au-zaehltabelle">${tabelle}</div>` };
}

/* 11 · Spiegel-Detektiv */
function au_spiegelDetektiv(ctx){
    if (!bild_da()) return au_kein("Spiegel-Detektiv");
    const n = au_niveau(ctx), gr = au_gr(n);
    const ziel = zufallsElement(bilder_spiegelbar());
    const pro = au_w(n, [7, 8, 9, 10, 11, 12, 12]);
    const falsch = n >= 4 ? ["spiegel", "dreh180", "spiegel dreh180"] : ["spiegel"];
    const zeile = i => {
        let html = "", t = 0;
        for (let k = 0; k < pro; k++){
            if (Math.random() < 0.4){ t++; html += LM(bild(ziel, gr)); }
            else html += bild(ziel, gr, zufallsElement(falsch));
        }
        return fs_zaehlreihe(i, html, t);
    };
    return { titel: "Spiegel-Detektiv", zeile, html: `
        <div class="fs-ziel">So sieht das Bild richtig aus: ${bild(ziel, 64)}</div>
        ${ws_aufgabe(1, `Kreise nur die Bilder ein, die genau so aussehen wie das Vorbild. Gespiegelte${n >= 4 ? " oder gedrehte" : ""} Bilder zählen nicht! Schreibe die Anzahl ins Kästchen.`)}
        <div class="fs-reihen fs-fuell"></div>` };
}

/* 12 · Linien-Wirrwarr */
function au_wirrwarr(ctx){
    const n = au_niveau(ctx), mitBild = bild_da() && lt_klasse() <= 6;
    const m = au_w(n, [4, 5, 5, 6, 7, 8, 9]);
    const H = 680, B = 640, x0 = 108, x1 = B - 52;
    const ziele = mische([...Array(m).keys()]);
    const FARBEN = ["#C0392B", "#1D5FA8", "#2E8B57", "#D68910", "#7D3C98", "#117A65", "#A04000", "#2C3E50", "#B03A2E"];
    const farbig = n <= 2;
    const y = k => (k + 0.5) * H / m;
    const pfade = [...Array(m).keys()].map(a => {
        const ya = y(a), yb = y(ziele[a]);
        const p1 = zufallsZahl(20, H - 20), p2 = zufallsZahl(20, H - 20), xm = zufallsZahl(220, 420);
        const d = `M${x0} ${ya.toFixed(0)} C ${xm - 120} ${ya.toFixed(0)}, ${xm - 80} ${p1}, ${xm} ${((p1 + p2) / 2).toFixed(0)} S ${x1 - 120} ${yb.toFixed(0)}, ${x1} ${yb.toFixed(0)}`;
        return `<path d="${d}" fill="none" stroke="${farbig ? FARBEN[a % FARBEN.length] : "#2C3E50"}" stroke-width="${farbig ? 3.5 : 2.5}" stroke-linecap="round"/>`;
    }).join("");
    const linksBilder = mitBild ? mische(bilder_alle()).slice(0, m) : null;
    const ABC = "ABCDEFGHIJ";
    const links = [...Array(m).keys()].map(a => `<div class="au-ww-l" style="top:${y(a) - 28}px;"><span class="fs-nrbox">${L(ABC[ziele[a]])}</span>${mitBild ? bild(linksBilder[a], 50) : `<b class="au-ww-zahl">${a + 1}</b>`}</div>`).join("");
    const rechts = [...Array(m).keys()].map(b => `<div class="au-ww-r" style="top:${y(b) - 22}px;">${ABC[b]}</div>`).join("");
    return { titel: "Linien-Wirrwarr", html: `
        ${ws_aufgabe(1, `Folge jeder Linie nur mit den Augen von links nach rechts. Wo kommt sie an? Schreibe den Buchstaben ins Kästchen neben ${mitBild ? "das Bild" : "die Zahl"}.${farbig ? "" : " Erst zum Schluss darfst du mit dem Finger prüfen."}`)}
        <div class="au-ww" style="height:${H}px; width:${B}px;"><svg viewBox="0 0 ${B} ${H}" width="${B}" height="${H}" style="position:absolute; left:0; top:0;">${pfade}</svg>${links}${rechts}</div>
        <div class="fs-zeit"><span>Zeit:<span class="fs-l"></span>Sek.</span><span>richtig:<span class="fs-l"></span>von ${m}</span></div>` };
}

/* 13 · Punktebild abzeichnen */
function au_punktebild(ctx){
    const n = au_niveau(ctx);
    const g = au_w(n, [4, 4, 5, 5, 6, 7, 7]), seg = au_w(n, [4, 5, 6, 8, 10, 12, 14]), schraeg = n >= 2;
    const abst = au_w(n, [40, 40, 34, 34, 28, 24, 24]), rand = 12, groesse = (g - 1) * abst + 2 * rand;
    const pkt = (p) => `${rand + (p % g) * abst},${rand + Math.floor(p / g) * abst}`;
    const punkte = () => [...Array(g * g).keys()].map(p => { const [x, y] = pkt(p).split(","); return `<circle cx="${x}" cy="${y}" r="3.2" fill="#2C3E50"/>`; }).join("");
    const zeile = i => {
        let p = zufallsZahl(0, g * g - 1), weg = [p], vorher = -1;
        for (let k = 0; k < seg; k++){
            const r = Math.floor(p / g), c = p % g;
            const schritte = [[0, 1], [1, 0], [0, -1], [-1, 0], ...(schraeg ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : [])]
                .map(([dr, dc]) => [r + dr, c + dc]).filter(([a, b]) => a >= 0 && b >= 0 && a < g && b < g).map(([a, b]) => a * g + b).filter(q => q !== vorher);
            vorher = p; p = zufallsElement(schritte); weg.push(p);
        }
        const linie = farbe => `<polyline points="${weg.map(pkt).join(" ")}" fill="none" stroke="${farbe}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>`;
        const svg = (inhalt) => `<svg viewBox="0 0 ${groesse} ${groesse}" width="${groesse}" height="${groesse}">${inhalt}</svg>`;
        return `<div class="au-pb"><div class="fs-reihe-nr">${i + 1}</div><div class="au-pb-feld">${svg(linie("#1D5FA8") + punkte())}</div><div class="au-pb-feld" style="position:relative;">${svg(punkte())}<span class="fs-loes au-pb-loes">${svg(linie("#C0392B"))}</span></div></div>`;
    };
    return { titel: "Punktebild abzeichnen", zeile, max: 8, html: `
        ${ws_aufgabe(1, "Zeichne das Bild links genau ab. Verbinde rechts dieselben Punkte mit dem Lineal. Zähle die Punkte, damit du dich nicht verrutschst.")}
        <div class="au-pbs fs-fuell"></div>` };
}

/* 14 · Symbol-Rechnen */
function au_symbolrechnen(ctx){
    const n = au_niveau(ctx), mitBild = bild_da();
    const gr = 32;
    const sym = (k) => mitBild ? bild(k, gr) : `<b class="au-sym">${k}</b>`;
    const zeile = i => {
        const zeichen = mitBild ? mische(bilder_mit(zufallsElement(["obst", "tier", "essen", "spiel", "fahrzeug"]))).slice(0, 3) : mische(["■", "▲", "●", "★", "♦"]).slice(0, 3);
        const [A, Bz, C] = zeichen;
        const max = au_w(n, [5, 10, 10, 20, 20, 30, 50]);
        const a = zufallsZahl(1, max), b = zufallsZahl(1, max), c = zufallsZahl(2, Math.min(max, 12));
        let gl = [], frage;
        if (n <= 1){
            const k = zufallsZahl(2, 3);
            gl = [[Array(k).fill(A), a * k]];
            frage = [[A], a];
        } else if (n <= 3){
            gl = [[[A, A], 2 * a], [[A, Bz], a + b]];
            frage = n === 3 ? [[A, Bz, Bz], a + 2 * b] : [[Bz], b];
        } else {
            const mal = n >= 5;
            gl = [[[A, A, A], 3 * a], [[A, Bz], a + b], [mal ? [Bz, "·", C] : [Bz, C], mal ? b * c : b + c]];
            frage = mal ? [[A, "+", Bz, "·", C], a + b * c] : [[A, Bz, C], a + b + c];
        }
        const term = (teile) => teile.map((t, k) => (t === "·" || t === "+") ? `<span class="au-op">${t}</span>` : (k > 0 && teile[k - 1] !== "·" && teile[k - 1] !== "+" ? `<span class="au-op">+</span>` : "") + sym(t)).join("");
        const zeilen = gl.map(([t, e]) => `<div class="au-gl">${term(t)}<span class="au-op">=</span><b>${e}</b></div>`).join("");
        const werte = mitBild ? zeichen.slice(0, n <= 1 ? 1 : n <= 3 ? 2 : 3).map((z, k) => `<span>${sym(z)} = <span class="fs-nrbox">${L([a, b, c][k])}</span></span>`).join("") : "";
        return `<div class="au-rechnen"><div class="fs-reihe-nr">${i + 1}</div><div class="au-rechnen-inhalt">${zeilen}<div class="au-gl au-frage-gl">${term(frage[0])}<span class="au-op">=</span><span class="fs-nrbox" style="width:56px;">${L(frage[1])}</span></div>${werte ? `<div class="au-werte">${werte}</div>` : ""}</div></div>`;
    };
    return { titel: "Symbol-Rechnen", zeile, max: 20, extra: { max: 1 }, html: `
        ${ws_aufgabe(1, "Gleiche Zeichen haben immer den gleichen Wert. Finde heraus, was jedes Zeichen wert ist, und löse die letzte Rechnung.")}
        <div class="au-rechnungen fs-fuell"${n >= 4 ? ' style="grid-template-columns:1fr;"' : ""}></div>` };
}

/* 15 · Symbol-Zahlen-Test (Zahlen zuordnen auf Zeit) */
function au_symbolzahl(ctx){
    const n = au_niveau(ctx), mitBild = bild_da() && lt_klasse() <= 4;
    const anzahl = au_w(n, [5, 6, 6, 7, 8, 9, 9]);
    const ZEICHEN = ["◯", "△", "□", "✕", "◇", "☆", "♡", "⊥", "∩"];
    const zeichen = mitBild ? mische(bilder_alle()).filter((k, i, a) => a.findIndex(x => bild_haupt(x) === bild_haupt(k)) === i).slice(0, anzahl) : mische(ZEICHEN).slice(0, anzahl);
    const zeig = (v, gr) => mitBild ? bild(zeichen[v], gr) : `<span class="au-sz-z" style="font-size:${gr * 0.8}px;">${zeichen[v]}</span>`;
    const pro = au_w(n, [10, 11, 12, 13, 14, 15, 15]);
    const zeile = i => `<div class="au-sz-reihe">${[...Array(pro)].map((_, k) => {
        const v = zufallsZahl(0, anzahl - 1);
        const beispiel = i === 0 && k < 3;
        return `<div class="au-sz">${zeig(v, mitBild ? 32 : 30)}<span class="fs-nrbox">${beispiel ? `<b style="color:#1D5FA8;">${v + 1}</b>` : L(v + 1)}</span></div>`;
    }).join("")}</div>`;
    return { titel: mitBild ? "Bilder-Zahlen-Test" : "Zeichen-Zahlen-Test", zeile, html: `
        <div class="au-schluessel">${[...Array(anzahl).keys()].map(v => `<span class="au-schl">${zeig(v, 34)}<b>${v + 1}</b></span>`).join("")}</div>
        ${ws_aufgabe(1, `Schreibe unter jedes ${mitBild ? "Bild" : "Zeichen"} die passende Zahl aus dem Schlüssel. Die ersten drei sind schon gelöst. Arbeite der Reihe nach, ohne etwas auszulassen – so schnell und genau du kannst.`)}
        <div class="fs-zeit"><span>Zeit: <b>${au_w(n, [120, 120, 90, 90, 90, 60, 60])} Sek.</b></span><span>geschafft:<span class="fs-l"></span></span><span>davon richtig:<span class="fs-l"></span></span></div>
        <div class="fs-reihen fs-fuell"></div>` };
}

/* 16 · Wortsuchrätsel */
function au_wortsuche(ctx){
    const n = au_niveau(ctx);
    const s = au_w(n, [7, 8, 9, 10, 12, 13, 14]), ziel = au_w(n, [4, 5, 6, 7, 9, 10, 12]);
    const richtungen = [[0, 1]];
    if (n >= 2) richtungen.push([1, 0]);
    if (n >= 4) richtungen.push([1, 1]);
    if (n >= 5) richtungen.push([0, -1], [-1, 0]);
    const quelle = [...mische([...new Set(ctx.pool)]), ...mische(AU_CODE_WOERTER)]
        .map(w => w.toUpperCase().replace(/ß/g, "SS")).filter(w => /^[A-ZÄÖÜ]+$/.test(w) && w.length >= 3 && w.length <= s);
    const gitter = [...Array(s * s)].fill(null), treffer = new Set(), woerter = [];
    for (const w of quelle){
        if (woerter.length >= ziel) break;
        if (woerter.includes(w)) continue;
        for (let versuch = 0; versuch < 60; versuch++){
            const [dr, dc] = zufallsElement(richtungen);
            const r0 = zufallsZahl(0, s - 1), c0 = zufallsZahl(0, s - 1);
            const pos = [...w].map((_, k) => [r0 + dr * k, c0 + dc * k]);
            if (pos.some(([r, c]) => r < 0 || c < 0 || r >= s || c >= s)) continue;
            if (pos.some(([r, c], k) => gitter[r * s + c] && gitter[r * s + c] !== w[k])) continue;
            pos.forEach(([r, c], k) => { gitter[r * s + c] = w[k]; treffer.add(r * s + c); });
            woerter.push(w); break;
        }
    }
    const FUELL = "AEEEINNRSTUDHLMOBGKFWZP";
    const zellen = gitter.map((b, k) => { const z = b || zufallsElement(FUELL.split("")); return `<div>${treffer.has(k) ? `<span class="fs-lfill au-ws-treffer" style="--lf:#F9E79F;">${z}</span>` : z}</div>`; }).join("");
    const zelle = Math.min(72, Math.floor(620 / s));
    const hinweis = ["von links nach rechts", "von links nach rechts und von oben nach unten", "waagerecht, senkrecht und schräg", "in alle Richtungen – auch rückwärts"][n >= 5 ? 3 : n >= 4 ? 2 : n >= 2 ? 1 : 0];
    return { titel: "Wörter-Suchsel", extra: { max: 1 }, html: `
        ${ws_aufgabe(1, `Im Gitter sind ${woerter.length} Wörter versteckt – ${hinweis}. Kreise jedes Wort ein und hake es in der Liste ab.`)}
        <div class="au-ws-wrap" style="flex-direction:column; align-items:center;"><div class="au-suchsel" style="grid-template-columns:repeat(${s}, ${zelle}px); grid-template-rows:repeat(${s}, ${zelle}px); font-size:${Math.round(zelle * 0.55)}px;">${zellen}</div>
        <div class="au-ws-liste">${woerter.map(w => `<span class="au-ws-wort">${fs_kreuzBox(true, "width:24px; height:24px;")} ${lt_klasse() <= 2 ? w : w.charAt(0) + w.slice(1).toLowerCase()}</span>`).join("")}</div></div>` };
}

/* 17 · Spiegelhälfte ergänzen */
function au_spiegelhaelfte(ctx){
    const n = au_niveau(ctx);
    const r = au_w(n, [4, 5, 6, 6, 7, 8, 8]), h = au_w(n, [2, 3, 3, 4, 4, 5, 5]), zelle = au_w(n, [34, 32, 28, 26, 24, 22, 22]);
    const zweiFarben = n >= 3 && lt_klasse() <= 6;
    const zeile = i => {
        const links = [...Array(r * h)].map(() => Math.random() < 0.45 ? (zweiFarben && Math.random() < 0.35 ? 2 : 1) : 0);
        const FB = ["", "#2C4A6E", "#E67E22"];
        let html = "";
        for (let z = 0; z < r; z++){
            for (let c = 0; c < h; c++) html += `<div style="background:${FB[links[z * h + c]] || "#fff"};"></div>`;
            for (let c = 0; c < h; c++){
                const v = links[z * h + (h - 1 - c)];
                html += `<div${c === 0 ? ' class="au-achse"' : ""}>${v ? `<span class="fs-lfill" style="--lf:${FB[v]};"></span>` : ""}</div>`;
            }
        }
        return `<div class="au-sh"><div class="fs-reihe-nr">${i + 1}</div><div class="au-sh-gitter" style="grid-template-columns:repeat(${2 * h}, ${zelle}px); grid-template-rows:repeat(${r}, ${zelle}px);">${html}</div></div>`;
    };
    return { titel: "Spiegelbild ergänzen", zeile, max: 40, extra: { max: 1 }, html: `
        ${ws_aufgabe(1, `Die rote Linie ist ein Spiegel. Male rechts die Kästchen so an, dass ein Spiegelbild entsteht.${zweiFarben ? " Achte auch auf die Farben." : ""}`)}
        <div class="au-shs fs-fuell"></div>` };
}

/* 18 · Regelwechsel */
function au_regelwechsel(ctx){
    if (!bild_da()) return au_kein("Regelwechsel");
    const n = au_niveau(ctx), gr = au_gr(n) - 4;
    const GRUPPEN = { tier: ["tier"], essbar: ["obst", "gemuese", "essen"], fahrzeug: ["fahrzeug"], kleidung: ["kleidung"], musik: ["musik"], natur: ["natur"] };
    const NAMEN = { tier: "Tiere", essbar: "alles Essbare", fahrzeug: "Fahrzeuge", kleidung: "Kleidung", musik: "Instrumente", natur: "Natur" };
    const regeln = mische(Object.keys(GRUPPEN)).slice(0, n <= 3 ? 2 : 3);
    const gehoert = (k, g) => GRUPPEN[g].some(t => bild_tags(k).includes(t));
    const sonstige = bilder_alle().filter(k => !regeln.some(g => gehoert(k, g)));
    const ausGruppe = g => bilder_alle().filter(k => gehoert(k, g));
    const pro = au_w(n, [8, 9, 10, 11, 12, 12, 13]);
    const FARBE = ["#1D5FA8", "#C0392B", "#2E8B57"];
    const zeile = i => {
        const ri = n <= 4 ? i % regeln.length : zufallsZahl(0, regeln.length - 1);
        const g = regeln[ri];
        let html = "", t = 0;
        for (let k = 0; k < pro; k++){
            const r = Math.random();
            const b = r < 0.32 ? zufallsElement(ausGruppe(g)) : r < 0.75 ? zufallsElement(ausGruppe(zufallsElement(regeln.filter(x => x !== g)))) : zufallsElement(sonstige);
            if (gehoert(b, g)){ t++; html += LM(bild(b, gr)); } else html += bild(b, gr);
        }
        return `<div class="fs-reihe"><div class="au-regel" style="background:${FARBE[ri]};">${NAMEN[g]}</div><div class="fs-reihe-inhalt">${html}</div><div class="fs-zaehl">${L(t)}</div></div>`;
    };
    return { titel: "Regelwechsel", zeile, html: `
        <div class="fs-ziel" style="gap:10px; flex-wrap:wrap;">${regeln.map((g, k) => `<span class="au-regel" style="background:${FARBE[k]};">${NAMEN[g]}</span>`).join(" ")}</div>
        ${ws_aufgabe(1, `Die Regel wechselt ${n <= 4 ? "von Reihe zu Reihe" : "ohne festen Takt"}! Lies vor jeder Reihe das farbige Schild und kreise nur das ein, was dazu passt. Schreibe die Anzahl ins Kästchen.`)}
        <div class="fs-reihen fs-fuell"></div>` };
}

/* 19 · Zahlen nach Regel durchstreichen */
function au_regelstreichen(ctx){
    const n = au_niveau(ctx), pro = au_w(n, [16, 18, 20, 22, 24, 26, 28]);
    const art = n <= 3 ? "nach" : n === 4 ? zufallsElement(["nach", "zehn"]) : zufallsElement(["nach", "zehn", "zwischen"]);
    const x = zufallsZahl(1, 9); let y; do y = zufallsZahl(1, 9); while (y === x);
    const regel = { nach: `Streiche jede <b>${x}</b> durch, die direkt nach einer <b>${y}</b> steht.`,
        zehn: "Kreise jedes Zahlenpaar ein, das nebeneinandersteht und zusammen <b>10</b> ergibt.",
        zwischen: "Streiche jede <b>gerade</b> Zahl durch, die zwischen zwei <b>ungeraden</b> Zahlen steht." }[art];
    const beispiel = { nach: `${y} <u>${x}</u>`, zehn: "<u>3 7</u>", zwischen: "5 <u>4</u> 9" }[art];
    const zeile = i => {
        const z = [...Array(pro)].map(() => zufallsZahl(1, 9));
        for (let k = 1; k < pro; k++) if (Math.random() < 0.18){
            if (art === "nach"){ z[k - 1] = y; z[k] = x; }
            else if (art === "zehn"){ z[k - 1] = zufallsZahl(1, 9); z[k] = 10 - z[k - 1]; }
            else if (k < pro - 1){ z[k - 1] = 2 * zufallsZahl(0, 4) + 1; z[k] = 2 * zufallsZahl(1, 4); z[k + 1] = 2 * zufallsZahl(0, 4) + 1; }
        }
        const mark = new Set(); let t = 0;
        for (let k = 0; k < pro; k++){
            if (art === "nach" && k > 0 && z[k] === x && z[k - 1] === y){ mark.add(k); t++; }
            if (art === "zehn" && k > 0 && z[k] + z[k - 1] === 10){ mark.add(k); mark.add(k - 1); t++; }
            if (art === "zwischen" && k > 0 && k < pro - 1 && z[k] % 2 === 0 && z[k - 1] % 2 && z[k + 1] % 2){ mark.add(k); t++; }
        }
        return fs_zaehlreihe(i, z.map((v, k) => `<span class="au-ziffer">${mark.has(k) ? LM(v) : v}</span>`).join(""), t);
    };
    return { titel: "Zahlen-Regel", zeile, html: `
        <div class="fs-ziel" style="flex-direction:column; gap:4px;"><span>${regel}</span><span style="font-size:16px;">Beispiel: ${beispiel}</span></div>
        ${ws_aufgabe(1, "Arbeite Reihe für Reihe von links nach rechts. Schreibe am Ende jeder Reihe auf, wie oft du etwas gefunden hast.")}
        <div class="fs-zeit"><span>Start:<span class="fs-l"></span></span><span>Ende:<span class="fs-l"></span></span><span>Fehler:<span class="fs-l"></span></span></div>
        <div class="fs-reihen fs-fuell"></div>` };
}

/* 20 · Rot-Schwarz-Tafel */
function au_rotschwarz(ctx){
    const n = au_niveau(ctx), g = n <= 4 ? 5 : 7;
    const schwarz = Math.ceil(g * g / 2), rot = g * g - schwarz;
    const felder = mische([...[...Array(schwarz)].map((_, k) => ({ z: k + 1, rot: false })), ...[...Array(rot)].map((_, k) => ({ z: k + 1, rot: true }))]);
    return { titel: "Rot-Schwarz-Tafel", html: `
        ${ws_aufgabe(1, `Suche abwechselnd: schwarz aufwärts und rot abwärts – 1 schwarz, ${rot} rot, 2 schwarz, ${rot - 1} rot … Zeige auf jede Zahl und sprich sie leise mit. Rote Zahlen sind unterstrichen.`)}
        <div class="fs-tafel au-rs" style="grid-template-columns:repeat(${g}, minmax(0,1fr)); width:100%; max-width:620px; font-size:${g === 5 ? 40 : 30}px;">${felder.map(f => `<div class="${f.rot ? "au-rot" : ""}">${f.z}</div>`).join("")}</div>
        ${ws_aufgabe(2, "Miss die Zeit. Probiere es dreimal.")}
        <div class="fs-zeit"><span>1.:<span class="fs-l"></span>Sek.</span><span>2.:<span class="fs-l"></span>Sek.</span><span>3.:<span class="fs-l"></span>Sek.</span></div>` };
}

/* ---------- Kataloge: welche Blätter es je Serie gibt ---------- */
// bild: arbeitet mit Grafiken · ab/bis: Klassenstufen · gruppe: für die Auswahl
const AU_GRUPPEN = { suchen: "Suchen & Konzentrieren", vergleichen: "Genau hinsehen & Vergleichen", logik: "Logik & Regeln", zeichnen: "Verfolgen & Zeichnen" };
const AU_KATALOG_GS = [
    { nr: "1", kurz: "Zahlentafel", name: "Zahlentafel", bau: fsA_zahlentafel, gruppe: "suchen" },
    { nr: "2", kurz: "Formen-Detektiv", name: "Formen-Detektiv", bau: fsA_formenDetektiv, gruppe: "suchen" },
    { nr: "3", kurz: "Buchstaben-Detektiv", name: "Buchstaben-Detektiv", bau: fsA_buchstabenDetektiv, gruppe: "suchen" },
    { nr: "6", kurz: "Bilder-Detektiv", name: "Bilder-Detektiv", bau: au_bilderDetektiv, gruppe: "suchen", bild: true },
    { nr: "7", kurz: "Doppelt gesucht", name: "Doppelt gesucht (einkreisen + durchstreichen)", bau: au_doppelt, gruppe: "suchen", bild: true },
    { nr: "15", kurz: "Wie viele?", name: "Wimmelbild zählen", bau: au_zaehlen, gruppe: "suchen", bild: true },
    { nr: "20", kurz: "Bilder-Zahlen-Test", name: "Bilder-Zahlen-Test (auf Zeit)", bau: au_symbolzahl, gruppe: "suchen", bild: true, ab: 2 },
    { nr: "23", kurz: "Zahlen-Regel", name: "Zahlen nach Regel durchstreichen", bau: au_regelstreichen, gruppe: "suchen", ab: 3 },
    { nr: "24", kurz: "Rot-Schwarz-Tafel", name: "Rot-Schwarz-Tafel", bau: au_rotschwarz, gruppe: "suchen", ab: 4 },
    { nr: "8", kurz: "Was ist anders?", name: "Was ist anders? (Bilder vergleichen)", bau: au_unterschiede, gruppe: "vergleichen", bild: true },
    { nr: "9", kurz: "Kein Partner", name: "Wer hat keinen Partner?", bau: au_partner, gruppe: "vergleichen", bild: true },
    { nr: "10", kurz: "Schatten", name: "Welcher Schatten passt?", bau: au_schatten, gruppe: "vergleichen", bild: true },
    { nr: "16", kurz: "Spiegel-Detektiv", name: "Spiegel-Detektiv", bau: au_spiegelDetektiv, gruppe: "vergleichen", bild: true },
    { nr: "21", kurz: "Wörter-Suchsel", name: "Wörter-Suchsel", bau: au_wortsuche, gruppe: "vergleichen", ab: 2 },
    { nr: "5", kurz: "Muster fortsetzen", name: "Muster fortsetzen (Formen)", bau: fsA_muster, gruppe: "logik" },
    { nr: "11", kurz: "Was passt nicht?", name: "Was passt nicht?", bau: au_passtNicht, gruppe: "logik", bild: true },
    { nr: "12", kurz: "Sudoku", name: "Bilder-Sudoku", bau: au_sudoku, gruppe: "logik", bild: true },
    { nr: "13", kurz: "Reihe weiter", name: "Wie geht die Reihe weiter?", bau: au_reihen, gruppe: "logik", bild: true },
    { nr: "14", kurz: "Bilder-Code", name: "Bilder-Code (Bild = Buchstabe)", bau: au_bildcode, gruppe: "logik", bild: true },
    { nr: "19", kurz: "Symbol-Rechnen", name: "Symbol-Rechnen", bau: au_symbolrechnen, gruppe: "logik", bild: true, ab: 2 },
    { nr: "22", kurz: "Regelwechsel", name: "Regelwechsel", bau: au_regelwechsel, gruppe: "logik", bild: true, ab: 3 },
    { nr: "4", kurz: "Labyrinth", name: "Labyrinth", bau: fsA_labyrinth, gruppe: "zeichnen" },
    { nr: "17", kurz: "Linien-Wirrwarr", name: "Linien-Wirrwarr", bau: au_wirrwarr, gruppe: "zeichnen", bild: true },
    { nr: "18", kurz: "Punktebild", name: "Punktebild abzeichnen", bau: au_punktebild, gruppe: "zeichnen" },
    { nr: "25", kurz: "Spiegelbild", name: "Spiegelbild ergänzen", bau: au_spiegelhaelfte, gruppe: "zeichnen" },
];
const AU_KATALOG_5 = [
    { nr: "1", kurz: "Konzentrations-Test", name: "Konzentrations-Test (d2-Stil)", bau: fsB_d2, gruppe: "suchen" },
    { nr: "7", kurz: "Zahlen-Regel", name: "Zahlen nach Regel durchstreichen", bau: au_regelstreichen, gruppe: "suchen" },
    { nr: "8", kurz: "Rot-Schwarz-Tafel", name: "Rot-Schwarz-Tafel", bau: au_rotschwarz, gruppe: "suchen" },
    { nr: "9", kurz: "Zeichen-Zahlen-Test", name: "Zeichen-Zahlen-Test (auf Zeit)", bau: au_symbolzahl, gruppe: "suchen" },
    { nr: "6", kurz: "Codes vergleichen", name: "Codes vergleichen", bau: fsB_codes, gruppe: "vergleichen" },
    { nr: "10", kurz: "Was ist anders?", name: "Was ist anders? (Bilder vergleichen)", bau: au_unterschiede, gruppe: "vergleichen", bild: true },
    { nr: "11", kurz: "Wörter-Suchsel", name: "Wörter-Suchsel", bau: au_wortsuche, gruppe: "vergleichen" },
    { nr: "5", kurz: "Wortschlangen", name: "Wortschlangen", bau: fsB_wortschlangen, gruppe: "vergleichen" },
    { nr: "2", kurz: "Geheimschrift", name: "Geheimschrift", bau: fsB_geheimschrift, gruppe: "logik" },
    { nr: "4", kurz: "Rechenketten", name: "Rechenketten", bau: fsB_rechenketten, gruppe: "logik" },
    { nr: "12", kurz: "Symbol-Rechnen", name: "Symbol-Rechnen", bau: au_symbolrechnen, gruppe: "logik", bild: true },
    { nr: "13", kurz: "Sudoku", name: "Sudoku 6×6", bau: au_sudoku, gruppe: "logik", bild: true },
    { nr: "14", kurz: "Begriff passt nicht", name: "Welcher Begriff passt nicht?", bau: au_passtNicht, gruppe: "logik" },
    { nr: "15", kurz: "Regelwechsel", name: "Regelwechsel", bau: au_regelwechsel, gruppe: "logik", bild: true },
    { nr: "3", kurz: "Zahlen-Buchstaben-Pfad", name: "Zahlen-Buchstaben-Pfad", bau: fsB_pfad, gruppe: "zeichnen" },
    { nr: "16", kurz: "Linien-Wirrwarr", name: "Linien-Wirrwarr", bau: au_wirrwarr, gruppe: "zeichnen" },
    { nr: "17", kurz: "Punktebild", name: "Punktebild abzeichnen", bau: au_punktebild, gruppe: "zeichnen" },
    { nr: "18", kurz: "Spiegelbild", name: "Spiegelbild ergänzen", bau: au_spiegelhaelfte, gruppe: "zeichnen" },
];
function au_passt(b){ const k = lt_klasse(); return (!b.ab || k >= b.ab) && (!b.bis || k <= b.bis); }
function fs_katalog(key){ return FS_SERIEN[key].katalog || FS_SERIEN[key].blaetter; }
function au_optionenHtml(key, katalog){
    return `
        <label style="margin-top:12px;">Blätter auswählen <span id="au-zahl-${key}" style="text-transform:none; color:var(--meer);"></span></label>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
            <button type="button" class="btn sekundaer klein" onclick="au_mix('${key}')"><i class="fa-solid fa-dice"></i> Zufallsmix (6 Blätter)</button>
            <button type="button" class="btn sekundaer klein" onclick="au_alle('${key}', true)">alle</button>
            <button type="button" class="btn sekundaer klein" onclick="au_alle('${key}', false)">keine</button>
        </div>
        ${Object.entries(AU_GRUPPEN).map(([g, titel]) => `<div class="au-gruppe-titel">${titel}</div>
            <div class="fp-wahl">${katalog.filter(b => b.gruppe === g).map(b => `<label class="au-wahl-l"><input type="checkbox" class="au-blatt" data-serie="${key}" value="${b.nr}" onchange="au_zaehlen_(${"'" + key + "'"})"> ${ws_esc(b.name)}${b.bild ? ' <small title="mit Bildern">🖼️</small>' : ""}${b.ab ? ` <small>ab Kl. ${b.ab}</small>` : ""}</label>`).join("")}</div>`).join("")}
        <p class="beschreibung" style="margin:6px 0 0;">Alle Blätter passen sich an Klassenstufe und Schwierigkeit oben an. 🖼️ = mit Bildern. „Neu mischen“ erzeugt dieselben Blätter mit neuem Inhalt.</p>`;
}
function au_zaehlen_(key){
    const n = document.querySelectorAll(`.au-blatt[data-serie="${key}"]:checked`).length;
    const el = document.getElementById("au-zahl-" + key);
    if (el) el.textContent = `(${n} gewählt)`;
}
function au_klassePruefen(){
    ["aufmerksamkeit", "aufmerksamkeit5"].forEach(key => {
        fs_katalog(key).forEach(b => {
            const cb = document.querySelector(`.au-blatt[data-serie="${key}"][value="${b.nr}"]`);
            if (!cb) return;
            const ok = au_passt(b);
            cb.disabled = !ok;
            if (!ok) cb.checked = false;
            cb.closest("label").style.opacity = ok ? "" : ".45";
        });
        au_zaehlen_(key);
    });
}
// gesunde Mischung: etwa halb mit, halb ohne Bilder, aus möglichst vielen Gruppen
function au_mix(key, anzahl = 6){
    const passend = fs_katalog(key).filter(au_passt);
    const mit = mische(passend.filter(b => b.bild)), ohne = mische(passend.filter(b => !b.bild));
    const wahl = [];
    const gruppen = new Set();
    const nimm = (liste) => {
        const b = liste.find(x => !wahl.includes(x) && !gruppen.has(x.gruppe)) || liste.find(x => !wahl.includes(x));
        if (b){ wahl.push(b); gruppen.add(b.gruppe); if (gruppen.size >= Object.keys(AU_GRUPPEN).length) gruppen.clear(); }
    };
    for (let k = 0; wahl.length < Math.min(anzahl, passend.length) && k < 40; k++) nimm(k % 2 ? ohne : mit.length ? mit : ohne);
    document.querySelectorAll(`.au-blatt[data-serie="${key}"]`).forEach(cb => cb.checked = wahl.some(b => b.nr === cb.value));
    au_zaehlen_(key);
}
function au_alle(key, an){
    document.querySelectorAll(`.au-blatt[data-serie="${key}"]`).forEach(cb => { if (!cb.disabled) cb.checked = an; });
    au_zaehlen_(key);
}
function au_dynamisch(key){
    return () => {
        const an = [...document.querySelectorAll(`.au-blatt[data-serie="${key}"]:checked`)].map(c => c.value);
        return fs_katalog(key).filter(b => an.includes(b.nr) && au_passt(b)).map((b, i) => ({ ...b, nr: String(i + 1) }));
    };
}
function au_pruefen(key){
    return () => document.querySelectorAll(`.au-blatt[data-serie="${key}"]:checked`).length ? null : "Bitte mindestens ein Blatt auswählen (oder auf „Zufallsmix“ klicken).";
}

/* ---------- Alle Serien ---------- */

const FS_SERIEN = {
    aufmerksamkeit: { label: "Aufmerksamkeit", afs: "Aufmerksamkeit & Konzentration", select: "#aufm-typ", erstellen: "erstelleAufmerksamkeit",
        optionText: "Grundschule (Kl. 1–4) – 25 Übungen, frei wählbar",
        katalog: AU_KATALOG_GS, blaetter: AU_KATALOG_GS, optionenHtml: au_optionenHtml("aufmerksamkeit", AU_KATALOG_GS),
        dynamisch: au_dynamisch("aufmerksamkeit"), pruefen: au_pruefen("aufmerksamkeit") },
    aufmerksamkeit5: { tab: "aufmerksamkeit", mat: "aufmerksamkeit", wert: "serie5", reif: true,
        optionText: "Ab Klasse 5 – 18 Übungen, frei wählbar",
        label: "Aufmerksamkeit · ab Klasse 5", afs: "Aufmerksamkeit & Konzentration", select: "#aufm-typ", erstellen: "erstelleAufmerksamkeit",
        speicherName: () => "Aufmerksamkeit ab Klasse 5",
        katalog: AU_KATALOG_5, blaetter: AU_KATALOG_5, optionenHtml: au_optionenHtml("aufmerksamkeit5", AU_KATALOG_5),
        dynamisch: au_dynamisch("aufmerksamkeit5"), pruefen: au_pruefen("aufmerksamkeit5") },
    rechtschreibung: { tab: "symptom", mat: "symptom", wert: "rs-serie", reif: true, nachErsterOption: true,
        optionText: "Rechtschreibung – Strategien & Übungen (ab Klasse 4/5)",
        label: "Rechtschreibung", afs: "Symptomtraining: Rechtschreibstrategien", select: "#sy-typ", erstellen: "erstelleSymptom",
        ordner: "Rechtschreibung",
        tipp: "Der Rechtschreib-Schwerpunkt oben bestimmt Regel und Wörter aller Blätter; die Schwierigkeit oben wird hier nicht gebraucht.",
        optionenHtml: `
            <label style="margin-top:12px;">Rechtschreib-Schwerpunkt</label>
            <select id="rs-schwerpunkt">
                ${Object.entries(RS_SCHWERPUNKTE).map(([k, sp]) => `<option value="${k}">${sp.name}</option>`).join("")}
            </select>
            <p class="beschreibung" style="margin:6px 0 0;">Für Schüler, die gut lesen, aber Rechtschreibfehler machen. Es entstehen sechs Blätter: Regel & Strategie · Lückenwörter · Wörter sortieren · Fehlerdetektiv · Strategie-Check · Übungswörter/Partnerdiktat.</p>`,
        ctxExtra: () => ({ rs: rs_schwerpunkt() }),
        speicherName: () => "Rechtschreibung – " + rs_schwerpunkt().name,
        blaetter: [
        { nr: "1", kurz: "Regel & Strategie", name: "Regel & Strategie", bau: rsB_regel },
        { nr: "2", kurz: "Lückenwörter", name: "Lückenwörter", bau: rsB_luecken },
        { nr: "3", kurz: "Sortieren", name: "Wörter sortieren", bau: rsB_sortieren },
        { nr: "4", kurz: "Fehlerdetektiv", name: "Fehlerdetektiv", bau: rsB_fehler },
        { nr: "5", kurz: "Strategie-Check", name: "Strategie-Check", bau: rsB_strategie },
        { nr: "6", kurz: "Partnerdiktat", name: "Übungswörter & Partnerdiktat", bau: rsB_diktat },
    ]},
    optdiff: { label: "Optische Differenzierung", afs: "Funktionstraining: Optische Differenzierung", select: "#od-typ", erstellen: "erstelleOptDiff", blaetter: [
        { nr: "1", kurz: "Gleich/verschieden", name: "Gleich oder verschieden?", bau: fsO_gleich },
        { nr: "2", kurz: "Wer ist anders?", name: "Wer ist anders?", bau: fsO_fehlerreihe },
        { nr: "3", kurz: "Muster vergleichen", name: "Muster vergleichen", bau: fsO_kacheln },
        { nr: "4", kurz: "Unterschiede", name: "Unterschiede finden", bau: fsO_unterschiede },
        { nr: "5", kurz: "Buchstaben-Suchbild", name: "Buchstaben-Suchbild", bau: fsO_suchbild },
    ]},
    optged: { label: "Optisches Gedächtnis", afs: "Funktionstraining: Optisches Gedächtnis", select: "#og-typ", erstellen: "erstelleOptGed", blaetter: [
        { nr: "1", kurz: "Formen merken", name: "Formen merken", bau: fsG_formenreihen },
        { nr: "2", kurz: "Wörter merken", name: "Wörter merken", bau: fsG_wortreihen },
        { nr: "3", kurz: "Muster merken", name: "Muster merken", bau: fsG_kacheln },
        { nr: "4", kurz: "Was ist anders?", name: "Was hat sich verändert?", bau: fsG_veraendert },
    ]},
    optser: { label: "Optische Serialität", afs: "Funktionstraining: Optische Serialität", select: "#os-typ", erstellen: "erstelleOptSer", blaetter: [
        { nr: "1", kurz: "Zahlenreihen", name: "Zahlenreihen fortsetzen", bau: fsS_zahlenreihen },
        { nr: "2", kurz: "Reihenfolge", name: "Reihenfolge erkennen", bau: fsS_reihenfolge },
        { nr: "3", kurz: "Buchstaben-Salat", name: "Buchstaben-Salat", bau: fsS_buchstabensalat },
        { nr: "4", kurz: "ABC-Ordnung", name: "ABC-Ordnung", bau: fsS_abc },
        { nr: "5", kurz: "ABC-Lücken", name: "ABC-Lücken", bau: fsS_alphabet },
    ]},
    akdiff: { label: "Akustische Differenzierung", afs: "Funktionstraining: Akustische Differenzierung", select: "#ad-typ", erstellen: "erstelleAkDiff", blaetter: [
        { nr: "1", kurz: "Silben hören", name: "Silben hören", bau: fsD_silben },
        { nr: "2", kurz: "Reimen", name: "Reimen", bau: fsD_reime },
        { nr: "3", kurz: "Genau hinhören", name: "Genau hinhören (Minimalpaare)", bau: fsD_minimalpaare },
        { nr: "4", kurz: "Lautposition", name: "Wo hörst du den Laut?", bau: fsD_lautposition },
    ]},
    akged: { label: "Akustisches Gedächtnis", afs: "Funktionstraining: Akustisches Gedächtnis", select: "#akg-typ", erstellen: "erstelleAkGed", blaetter: [
        { nr: "1", kurz: "Wörter merken", name: "Wörter merken", bau: fsH_wortfolgen },
        { nr: "2", kurz: "Zahlen merken", name: "Zahlen merken", bau: fsH_zahlenspanne },
        { nr: "3", kurz: "Aufträge merken", name: "Aufträge merken", bau: fsH_auftraege },
    ]},
    akser: { label: "Akustische Serialität", afs: "Funktionstraining: Akustische Serialität", select: "#aks-typ", erstellen: "erstelleAkSer", blaetter: [
        { nr: "1", kurz: "Silbenfolge", name: "Silben in Reihenfolge", bau: fsR_silbenfolge },
        { nr: "2", kurz: "Wortfolge", name: "Gehörte Reihenfolge", bau: fsR_wortfolge },
        { nr: "3", kurz: "Lautfolge", name: "Laute in Reihenfolge", bau: fsR_lautfolge },
    ]},
    koerper: { label: "Körperschema", afs: "Funktionstraining: Körperschema", select: "#ks-typ", erstellen: "erstelleKoerper", blaetter: [
        { nr: "1", kurz: "Zeigen", name: "Zeige deinen Körper", bau: fsK_zeigen },
        { nr: "2", kurz: "Bewegungen", name: "Rechts und links bewegen", bau: fsK_bewegungen },
        { nr: "3", kurz: "Über Kreuz", name: "Über Kreuz", bau: fsK_ueberkreuz },
    ]},
    raum: { label: "Raumorientierung", afs: "Funktionstraining: Raumorientierung", select: null, erstellen: "erstelleRaum", altName: "Wer springt denn da? (bisheriges Einzelblatt)", blaetter: [
        { nr: "1", kurz: "Blickrichtung", name: "Wohin schauen die Tiere?", bau: fsRO_blickrichtung },
        { nr: "2", kurz: "Pfeile", name: "Pfeile lesen", bau: fsRO_pfeile },
        { nr: "3", kurz: "Wege nach Plan", name: "Wege nach Plan", bau: fsRO_diktat },
        { nr: "4", kurz: "Spiegelbilder", name: "Spiegelbilder", bau: fsRO_spiegeln },
    ]},
};


/* ===============================================================
   Erweiterungen: Silbentrennung · Förderkartei · Förderplan ·
   Stunde zusammenstellen · Silbentext · Kärtchen · Pass · Elternblatt
   =============================================================== */

const LRS_KINDER = <?= json_encode(array_values($lrsKinder), JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) ?>;
const LRS_KARTEI = <?= json_encode((object)$lrsKartei, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) ?>;

function lt_wert(id){ const el = document.getElementById(id); return el ? el.value : ""; }
function lt_an(id){ const el = document.getElementById(id); return !!(el && el.checked); }
function lt_klasse(){ return parseInt(lt_wert("g-klasse"), 10) || 2; }
function lt_reifVon(s){ return typeof s.reif === "function" ? s.reif() : !!s.reif; }

/* ---------- Silbentrennung mit deutschen Trennmustern (Fallback: einfache Regel) ---------- */
const SILBEN_CDN = "https://cdn.jsdelivr.net/npm/hyphen@1.10.6/";
let silben_trenner = null;
function silben_laden(){
    if (!silben_laden.versprechen){
        silben_laden.versprechen = ws_skriptLaden(SILBEN_CDN + "hyphen.js", () => window.createHyphenator)
            .then(() => ws_skriptLaden(SILBEN_CDN + "patterns/de-1996.js", () => window.hyphenationPatternsDe1996))
            .then(() => { silben_trenner = window.createHyphenator(window.hyphenationPatternsDe1996, { hyphenChar: "|", minWordLength: 3 }); })
            .catch(() => null);
    }
    return silben_laden.versprechen;
}
function silben_trennen(wort){
    if (!wort) return [];
    let teile;
    try { teile = silben_trenner ? silben_trenner(wort).split("|") : ws_silbenAuto(wort); }
    catch (e) { teile = ws_silbenAuto(wort); }
    // Vokal allein am Silbenanfang abtrennen, wie beim Schwingen: O-fen, A-bend, I-gel
    const ergebnis = [];
    teile.forEach(t => {
        if (t.length > 2 && /^[aeiouäöü][bcdfghjklmnpqrstvwxzß][aeiouäöüy]/i.test(t) && !/^(un|er|um|ur|an|ob)/i.test(t)) ergebnis.push(t[0], t.slice(1));
        else ergebnis.push(t);
    });
    return ergebnis.filter(Boolean);
}

/* ---------- Förderkartei: Fehlerwörter je Kürzel ---------- */
function kt_woerter(code, faecher = "offen"){
    return (LRS_KARTEI[code] || [])
        .filter(w => faecher === "alle" ? true : (faecher === "neu" ? w.f <= 2 : w.f < 5))
        .slice().sort((a, b) => a.f - b.f);
}
function kt_kindOptionen(leer){
    return `<option value="">${leer}</option>` + LRS_KINDER.map(c => {
        const n = (LRS_KARTEI[c] || []).filter(w => w.f < 5).length;
        return `<option value="${ws_esc(c)}">${ws_esc(c)} – ${n} ${n === 1 ? "Wort" : "Wörter"}</option>`;
    }).join("");
}
function rs_key(sp){ return Object.keys(RS_SCHWERPUNKTE).find(k => RS_SCHWERPUNKTE[k] === sp || RS_SCHWERPUNKTE[k].name === sp.name); }
// Schwerpunkt mit den eigenen Fehlerwörtern eines Kindes
function rs_mitKartei(sp, code){
    if (!code) return sp;
    const key = rs_key(sp);
    return { ...sp, eigene: kt_woerter(code).filter(w => (w.sp || []).includes(key)).map(w => w.w) };
}
function rs_kindWechsel(){
    const code = lt_wert("rs-kind");
    const auswahl = document.getElementById("rs-schwerpunkt");
    if (!auswahl) return;
    let bester = null, besteZahl = 0;
    [...auswahl.options].forEach(o => {
        const sp = RS_SCHWERPUNKTE[o.value];
        const n = code ? rs_eigeneListe(rs_mitKartei(sp, code)).length : 0;
        o.textContent = sp.name + (n ? ` (★ ${n} eigene)` : "");
        if (n > besteZahl){ besteZahl = n; bester = o.value; }
    });
    const aktuell = code ? rs_eigeneListe(rs_mitKartei(RS_SCHWERPUNKTE[auswahl.value], code)).length : 0;
    if (bester && !aktuell) auswahl.value = bester;
}

// Kartei-Kontext: eigene Wörter zuerst, danach passende Übungswörter derselben Schwerpunkte
function kt_kontextFuer(code, faecher){
    const eigene = kt_woerter(code, faecher).map(w => ({ w: w.w, sp: (w.sp || ["sonstige"])[0], falsch: w.x || [], eigen: true }));
    const keys = [...new Set(eigene.map(e => e.sp))].filter(k => RS_SCHWERPUNKTE[k] && !RS_SCHWERPUNKTE[k].saetze);
    const extra = mische(keys.flatMap(k => RS_SCHWERPUNKTE[k].treffer.map(e => ({ w: rs_wort(e), sp: k, falsch: [], eigen: false }))))
        .filter(x => !eigene.some(e => e.w === x.w));
    return { code, eigene, extra, alle: [...eigene, ...extra] };
}
// Rechtschreibstelle eines Kartei-Worts: über den Schwerpunkt oder über die Fehlschreibung des Kindes
function kt_stelle(item){
    const sp = RS_SCHWERPUNKTE[item.sp];
    if (sp && !sp.saetze){ const st = sp.stelle(item.w, true); if (st) return st; }
    const f = item.falsch && item.falsch[0];
    if (!f) return null;
    const a = item.w, b = f;
    let p = 0;
    while (p < a.length && p < b.length && a[p].toLowerCase() === b[p].toLowerCase() && a[p] === b[p]) p++;
    let s = 0;
    while (s < a.length - p && s < b.length - p && a[a.length - 1 - s] === b[b.length - 1 - s]) s++;
    const ziel = a.slice(p, a.length - s), falschTeil = b.slice(p, b.length - s);
    if (ziel === falschTeil) return null;
    return { vor: a.slice(0, p), ziel, nach: a.slice(a.length - s), optionen: mische([ziel || "–", falschTeil || "–"]) };
}
function kt_markiert(item){
    const st = kt_stelle(item);
    if (!st || !st.ziel) return ws_esc(item.w);
    return `${ws_esc(st.vor)}<span class="kt-stelle">${ws_esc(st.ziel)}</span>${ws_esc(st.nach)}`;
}
function kt_tipp(item){ return (typeof RS_NAMEN !== "undefined" && RS_NAMEN[item.sp]) ? RS_NAMEN[item.sp].tipp : ""; }
function kt_eintrag(liste, i){ return liste.length ? liste[i % liste.length] : null; }

function ktB_woerter(ctx){
    const kt = ctx.kt;
    const zeile = i => {
        const x = kt_eintrag(kt.alle, i);
        if (!x || i >= Math.max(kt.alle.length, 30)) return "";
        return `<tr><td class="kt-wort">${x.eigen ? '<span class="kt-eigen">★</span> ' : ""}${kt_markiert(x)}</td><td style="font-size:15px;">${ws_esc(kt_tipp(x))}</td><td></td></tr>`;
    };
    return { titel: "Meine Lernwörter", zeile, max: 40, html: `
        ${ws_aufgabe(1, "Lies jedes Wort und sprich es in Silben. Die schwierige Stelle ist markiert. Decke das Wort ab, schreibe es rechts auf und vergleiche. ★ = dein eigenes Fehlerwort.")}
        <table class="rs-tabelle kt-tabelle"><thead><tr><th style="width:32%;">Wort</th><th style="width:28%;">So merke ich es mir</th><th>abdecken – schreiben – vergleichen</th></tr></thead><tbody class="fs-fuell"></tbody></table>` };
}

function ktB_luecken(ctx){
    const liste = ctx.kt.alle.filter(x => kt_stelle(x));
    const zeile = i => {
        const x = kt_eintrag(liste, i);
        if (!x || i >= Math.max(liste.length, 24)) return "";
        const st = kt_stelle(x);
        return `<div class="fs-karte" style="justify-content:space-between;"><span class="rs-wort">${x.eigen ? '<span class="kt-eigen">★</span> ' : ""}${ws_esc(st.vor)}<span class="rs-luecke">${L(ws_esc(st.ziel || "–"))}</span>${ws_esc(st.nach)}</span>${rs_optionen(st)}</div>`;
    };
    return { titel: "Lückenwörter", zeile, schritt: 2, html: `
        ${ws_aufgabe(1, "Was gehört in die Lücke? Denk an deinen Tipp und kreise die richtige Schreibung ein. Schreibe das ganze Wort danach auf ein Extrablatt.")}
        <div class="fs-zweispaltig fs-fuell"></div>` };
}

// Falsche Schreibungen: zuerst so, wie das Kind es geschrieben hat
function kt_varianten(x, anzahl){
    const set = new Set();
    (x.falsch || []).forEach(f => { if (f && f !== x.w) set.add(f); });
    const st = kt_stelle(x);
    if (st) st.optionen.forEach(o => { const v = st.vor + (o === "–" ? "" : o) + st.nach; if (v !== x.w) set.add(v); });
    ws_ablenker(x.w, 4).forEach(v => set.add(v));
    const eigene = (x.falsch || []).filter(f => f && f !== x.w);
    const rest = mische([...set].filter(v => v !== x.w && !eigene.includes(v)));
    return [...eigene, ...rest].slice(0, anzahl);   // so, wie das Kind es geschrieben hat, zuerst
}
function ktB_detektiv(ctx){
    const zeile = i => {
        const x = kt_eintrag(ctx.kt.alle, i);
        if (!x || i >= Math.max(ctx.kt.alle.length, 24)) return "";
        const varianten = mische([{ w: x.w, ok: true }, ...kt_varianten(x, 2).map(w => ({ w, ok: false }))]);
        return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-chips" style="justify-content:flex-start; gap:18px;">${varianten.map(v => {
            const chip = `<span class="rs-wort" style="font-size:${fs_wortGroesse(v.w, 150, 24)}px;">${ws_esc(v.w)}</span>`;
            return v.ok ? LM(chip) : chip;
        }).join("")}</div><span class="rs-linie" style="min-width:170px;">${L(ws_esc(x.w))}</span></div>`;
    };
    return { titel: "Welche Schreibung stimmt?", zeile, html: `
        ${ws_aufgabe(1, "Nur eine Schreibung ist richtig. Kreise sie ein und schreibe das Wort rechts noch einmal richtig auf.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function ktB_training(ctx){
    const kaestchen = '<span style="display:flex; gap:6px; flex:none;">' + '<span class="fs-kaestchen-klein" style="width:24px; height:24px;"></span>'.repeat(3) + "</span>";
    const zeile = i => {
        const x = kt_eintrag(ctx.kt.alle, i);
        if (!x || i >= Math.max(ctx.kt.alle.length, 30)) return "";
        return `<div class="fs-karte" style="justify-content:space-between;"><span class="rs-wort">${x.eigen ? '<span class="kt-eigen">★</span> ' : ""}${ws_esc(x.w)}</span>${kaestchen}</div>`;
    };
    return { titel: "Wort-Training & Partnerdiktat", zeile, schritt: 2, html: `
        ${ws_aufgabe(1, "Übe jedes Wort: <b>lesen</b> – in Silben sprechen – <b>schwierige Stelle markieren</b> – abdecken – <b>schreiben</b> – vergleichen. Für jedes richtig geschriebene Wort ein Kästchen ankreuzen.")}
        ${ws_aufgabe(2, "Partnerdiktat: Lass dir die Wörter diktieren. Die richtig geschriebenen Wörter wandern in der Lernbox ein Fach weiter.")}
        <div class="fs-zweispaltig fs-fuell"></div>` };
}

const KT_BLAETTER = [
    { nr: "1", kurz: "Meine Lernwörter", name: "Meine Lernwörter", bau: ktB_woerter },
    { nr: "2", kurz: "Lückenwörter", name: "Lückenwörter", bau: ktB_luecken },
    { nr: "3", kurz: "Welche stimmt?", name: "Welche Schreibung stimmt?", bau: ktB_detektiv },
    { nr: "4", kurz: "Wort-Training", name: "Wort-Training & Partnerdiktat", bau: ktB_training },
];

function ws_ausKartei(){
    const code = lt_wert("ws-kt-kind");
    if (!code){ alert("Bitte zuerst ein Kürzel wählen."); return; }
    const woerter = kt_woerter(code).map(w => w.w).filter(w => w.length <= 12).slice(0, 5);
    if (woerter.length < 2){ alert(`In der Förderkartei von ${code} sind noch zu wenige offene Wörter (mindestens 2).`); return; }
    silben_laden().then(() => {
        document.getElementById("ws-woerter").value = woerter.map(w => silben_trennen(w).join("-")).join(", ");
    });
}

/* ---------- Strategie-Kärtchen ---------- */
const SK_BEISPIEL = {
    dasdass: 'Ich hoffe, <span class="stelle">dass</span> … · <span class="stelle">das</span> Haus',
    grossklein: 'beim <span class="stelle">L</span>aufen · etwas <span class="stelle">S</span>chönes',
};
function sk_karte(key){
    const sp = RS_SCHWERPUNKTE[key];
    let bsp = SK_BEISPIEL[key];
    if (!bsp){
        bsp = mische(sp.treffer).slice(0, 2).map(e => {
            const st = sp.stelle(rs_roh(e), true);
            return st ? `${ws_esc(st.vor)}<span class="stelle">${ws_esc(st.ziel)}</span>${ws_esc(st.nach)}` : ws_esc(rs_wort(e));
        }).join(" · ");
    }
    return `<div class="sk-karte"><div class="sk-titel">${ws_esc(RS_NAMEN[key] ? RS_NAMEN[key].kurz : sp.name)}</div><div class="sk-merk">${sp.merksatz}</div><div class="sk-pruefen">So prüfe ich: ${sp.pruefen}</div><div class="sk-bsp">${bsp}</div></div>`;
}
function sk_blaetter(keys){
    const seiten = [];
    for (let i = 0; i < keys.length; i += 8) seiten.push(keys.slice(i, i + 8));
    return seiten.map((teil, k) => ({
        nr: String(k + 1), kurz: `Kärtchen ${k + 1}`, name: `Strategie-Kärtchen ${k + 1}`,
        bau: () => ({ titel: "Meine Strategie-Kärtchen", html: `
            ${ws_aufgabe(1, "Schneide die Kärtchen aus. Sie passen ins Mäppchen oder an einen Schlüsselring – so hast du deine Strategien immer dabei.")}
            <div class="sk-gitter">${teil.map(sk_karte).join("")}${'<div class="sk-karte sk-leer"><div class="sk-titel" style="background:#8FA3B8;">Mein Merksatz</div><div class="sk-linien"><div></div><div></div><div></div></div></div>'.repeat(8 - teil.length)}</div>` }),
        extra: { info: true, max: 1, reif: lt_klasse() >= 4, label: "Strategie-Kärtchen", afs: "Symptomtraining: Rechtschreibstrategien" },
    }));
}
function sk_keys(){
    const code = lt_wert("sk-kind");
    if (code){
        const keys = [...new Set(kt_woerter(code, "alle").flatMap(w => w.sp || []))].filter(k => RS_SCHWERPUNKTE[k]);
        if (keys.length) return keys;
    }
    return [...document.querySelectorAll(".sk-wahl:checked")].map(c => c.value);
}

/* ---------- Belohnungs-/Stempelpass ---------- */
const SP_STERN = `<svg viewBox="0 0 24 24" width="30" height="30"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" fill="#F2C94C" stroke="#9A7A00" stroke-width="1.2"/></svg>`;
function sp_blatt(){
    const felder = parseInt(lt_wert("sp-felder"), 10) || 30;
    const preis = lt_an("sp-preis");
    if (lt_wert("sp-stil") === "protokoll"){
        return { titel: "Mein Trainingsprotokoll", extra: { info: true, reif: true, ohneAfs: true }, html: `
            <div class="sp-motto">Jede Fördereinheit zählt. Trage ein, was du geübt hast, und bewerte dich selbst.</div>
            <table class="sp-tabelle"><thead><tr><th style="width:44px;">Nr.</th><th style="width:96px;">Datum</th><th>Das habe ich geübt</th><th style="width:120px;">So lief's ☆☆☆</th><th style="width:80px;">Kürzel</th></tr></thead>
            <tbody>${[...Array(felder)].map((_, i) => `<tr${preis && (i + 1) % 10 === 0 ? ' style="background:#FFF4D6;"' : ""}><td>${i + 1}${preis && (i + 1) % 10 === 0 ? " ★" : ""}</td><td></td><td></td><td></td><td></td></tr>`).join("")}</tbody></table>
            ${preis ? `<div style="font-size:15px;">★ Nach jeweils 10 Einheiten: gemeinsam vereinbarte Belohnung: <span class="rs-linie" style="min-width:260px;"></span></div>` : ""}` };
    }
    const spalten = felder <= 20 ? 4 : 5;
    const html = [...Array(felder)].map((_, i) => (preis && (i + 1) % 10 === 0)
        ? `<div class="sp-feld sp-preis">${SP_STERN}<b>${i + 1}</b><span>Belohnung:</span><span class="rs-linie" style="min-width:70px; height:16px;"></span></div>`
        : `<div class="sp-feld">${i + 1}</div>`).join("");
    return { titel: "Mein Leuchtturm-Pass", extra: { info: true, max: 1, ohneAfs: true }, html: `
        <div class="sp-motto">Für jede Förderstunde gibt es einen Stempel.${preis ? " Nach 10 Stempeln wartet eine Belohnung!" : ""}</div>
        <div class="sp-gitter" style="grid-template-columns:repeat(${spalten}, minmax(0,1fr));">${html}</div>` };
}

/* ---------- Elternblatt ---------- */
const EB_UEBUNGEN = {
    aufmerksamkeit: [["Zahlentafel-Rennen", "Ihr Kind sucht die Zahlen 1–25 der Reihe nach und zeigt darauf. Sie stoppen die Zeit – jeden Tag ein Versuch, die Zeiten in eine Liste eintragen."], ["Ich packe meinen Koffer", "Abwechselnd einen Gegenstand dazunehmen und alle vorherigen wiederholen. Trainiert Konzentration und Merkfähigkeit."]],
    optdiff: [["Buchstaben-Jagd", "In einer Zeitungsspalte alle b (oder d) einkreisen. Danach gemeinsam nachzählen."], ["Fehlerbilder", "Suchbilder aus Rätselheften: Wer findet zuerst alle Unterschiede?"]],
    optged: [["Kim-Spiel", "6–8 Gegenstände 30 Sekunden anschauen, abdecken, einen wegnehmen: Was fehlt?"], ["Muster merken", "Sie legen mit Bausteinen ein kleines Muster, Ihr Kind schaut es an und baut es aus dem Kopf nach."]],
    optser: [["Muster weiterlegen", "Mit Besteck, Knöpfen oder Steinen eine Reihe legen (Löffel – Gabel – Gabel …). Ihr Kind setzt sie fort."], ["Wörter-Salat", "Sie mischen die Buchstabenkärtchen eines Lernworts. Ihr Kind legt das Wort richtig."]],
    akdiff: [["Reimwörter-Ping-Pong", "Sie sagen ein Wort (Maus), Ihr Kind antwortet mit einem Reim (Haus). Wer zuerst keinen mehr findet, verliert."], ["Silben klatschen", "Beim Treppensteigen oder Spazierengehen Wörter in Silben klatschen oder schwingen: Scho-ko-la-de."]],
    akged: [["Einkaufsliste merken", "Vor dem Einkauf 4–6 Dinge nennen, die Ihr Kind sich merkt. Im Laden darf es sie aufzählen."], ["Zahlen nachsprechen", "Sie sagen 4–6 Ziffern, Ihr Kind spricht sie nach (für Profis: rückwärts)."]],
    akser: [["Klatsch-Rhythmus", "Sie klatschen einen kurzen Rhythmus vor, Ihr Kind klatscht ihn genau nach."], ["Silben-Salat", "Sie sprechen die Silben eines Wortes durcheinander (ne – Son). Ihr Kind setzt das Wort zusammen."]],
    koerper: [["Simon sagt …", "„Simon sagt: Fass mit der rechten Hand an dein linkes Ohr.“ Nur wenn „Simon sagt“ davorsteht, wird es gemacht."]],
    raum: [["Schatzsuche", "Ein kleiner Schatz wird versteckt, der Weg wird beschrieben: „3 Schritte geradeaus, dann links …“. Danach tauschen."], ["Rechts oder links?", "Beim Spazierengehen an jeder Kreuzung fragen: In welche Richtung gehen wir jetzt?"]],
    worterarbeitung: [["Lernwörter-Box", "Täglich die Lernwörter aus der Box üben: lesen – abdecken – schreiben – vergleichen. Richtige Wörter rücken ein Fach weiter."]],
    lesen: [["Gemeinsam lesen", "Abwechselnd einen Satz oder eine Seite vorlesen. Lesen Sie Ihrem Kind auch gern weiter vor – das macht Lust auf Bücher."], ["Silbentext", "Den Silbentext aus der Förderung zweimal lesen und die Zeit notieren. Beim zweiten Mal geht es meist schneller!"]],
};
const EB_RS = {
    schaerfung: "Wörter schwingen: Ist der Vokal kurz? Bei kurzem Vokal kurz in die Hocke gehen – dann wird der Konsonant verdoppelt (Son-ne).",
    cktz: "Wörter mit ck und tz sammeln (Jacke, Katze) und mit Wörtern mit l, n, r davor vergleichen (Bank, Herz).",
    dehnung: "Merkwörter-Memory: Lernwörter mit Dehnungs-h auf Kärtchen schreiben und Paare suchen.",
    ie: "Lang-kurz-Hüpfen: Bei langem i (Biene) einen großen Schritt, bei kurzem i (Kiste) einen kleinen.",
    sss: "s-Laut-Detektiv: Summt das s (Hose) oder zischt es (Fuß, Fluss)? Gemeinsam Wörter sortieren.",
    auslaut: "Verlängern-Spiel: Sie sagen „Hund“, Ihr Kind verlängert: „Hun-de – ich höre ein d!“",
    aeau: "Wortfamilien-Ball: Sie werfen den Ball und sagen „Baum“, Ihr Kind fängt und antwortet „Bäume“.",
    dasdass: "Ersatzprobe üben: Passt „dieses“ oder „welches“? Dann „das“ – sonst „dass“.",
    grossklein: "Artikel-Probe: Bei jedem Wort fragen: Kann ich „der, die, das“ davorsetzen? Dann groß!",
    vf: "Wörter mit ver- und vor- sammeln. Merkwörter mit v (Vater, Vogel, viel, vier) auf einen Zettel an den Kühlschrank.",
    doppelvokal: "Merksatz aufsagen: „Im Zoo am See trinkt die Fee Tee.“ Weitere Wörter mit aa, ee, oo finden.",
    iglich: "Verlängern: lustig → lustiger (g), fröhlich → fröhlicher (ch). Abwechselnd Wörter verlängern.",
    spst: "Sp/St-Bingo: Wörter mit sp und st am Anfang sammeln (Sport, Stein) – gesprochen „schp“, geschrieben „sp“.",
    silbenh: "In Silben sprechen: ge-hen, Schu-he. Bei kurzen Wörtern verlängern: Schuh → Schu-he.",
    chsx: "Merkwörter-Detektiv: Wörter mit chs (Fuchs), x (Hexe) und ks (Keks) sammeln und an die Kühlschranktür hängen.",
};
const EB_TIPPS = [
    "Lieber jeden Tag 10 Minuten als einmal pro Woche eine Stunde.",
    "Loben Sie die Anstrengung, nicht nur das Ergebnis.",
    "Fehler sind erlaubt – gelassen bleiben, gemeinsam verbessern.",
    "Bei Müdigkeit oder Frust: aufhören und morgen weitermachen.",
    "Feste Übungszeit, ruhiger Platz, kein Handy daneben.",
    "Nicht mit Geschwistern oder Mitschülern vergleichen.",
];
function eb_blatt(foki, code){
    const tage = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
    const vorschlaege = [];
    foki.forEach(k => {
        if (EB_RS[k]) vorschlaege.push({ titel: RS_NAMEN[k] ? RS_NAMEN[k].kurz : RS_SCHWERPUNKTE[k].name, text: EB_RS[k] });
        (EB_UEBUNGEN[k] || []).forEach(([titel, text]) => vorschlaege.push({ titel, text }));
    });
    if (!vorschlaege.length) [...EB_UEBUNGEN.lesen, ...EB_UEBUNGEN.aufmerksamkeit, ...EB_UEBUNGEN.akdiff].forEach(([titel, text]) => vorschlaege.push({ titel, text }));
    // abwechselnd aus den Bereichen verteilen
    const plan = tage.map((tag, i) => ({ tag, u: vorschlaege[i % vorschlaege.length] }));
    const woerter = code ? kt_woerter(code).slice(0, 10).map(w => w.w) : [];
    return { titel: "10 Minuten am Tag", extra: { kopfRechts: 'Woche vom: <span class="ws-linie" style="width:150px;"></span>', label: "Elternblatt", afs: "Leuchtturm · Zusammenarbeit mit dem Elternhaus", ohneAfs: true, max: 1.1, info: true }, html: `
        <div class="eb-intro">Liebe Eltern, kurze, regelmäßige Übungen von etwa <b>10 Minuten</b> helfen Ihrem Kind mehr als eine lange Übungsstunde am Wochenende. Hier sind Vorschläge für diese Woche – passend zu dem, was wir gerade in der Förderung üben. Haken Sie ab, was Sie geschafft haben.</div>
        <table class="eb-plan"><tbody>${plan.map(p => `<tr><td>${p.tag}</td><td><b>${ws_esc(p.u.titel)}:</b> ${ws_esc(p.u.text)}</td><td><span class="fs-kaestchen-klein"></span></td></tr>`).join("")}</tbody></table>
        ${woerter.length ? `<div class="eb-woerter"><b>Unsere Übungswörter:</b> ${woerter.map(ws_esc).join(" · ")}</div>` : ""}
        <div class="eb-tipps">${EB_TIPPS.map(t => `<div>✔ ${t}</div>`).join("")}</div>
        <div class="eb-rueck"><b>Rückmeldung an die Förderung</b><div>☐ hat gut geklappt &nbsp;&nbsp; ☐ war manchmal schwierig &nbsp;&nbsp; ☐ bitte kurz sprechen</div><div class="linie"></div><div class="linie"></div></div>` };
}
function eb_foki(){ return [...document.querySelectorAll(".eb-wahl:checked")].map(c => c.value); }

/* ---------- Silbentext-Generator ---------- */
const ST_BEISPIEL = "Am Meer steht ein kleiner Leuchtturm. Jeden Abend schaltet er sein Licht an. Dann leuchtet er weit über das Wasser. Die Schiffe sehen das Licht und wissen: Hier sind Felsen! Sie fahren langsam und vorsichtig vorbei.\n\nEines Nachts kommt ein starker Sturm. Der Wind heult und die Wellen sind hoch. Doch der Leuchtturm leuchtet weiter. Am Morgen ist das Meer wieder ruhig. Die Möwen fliegen über den Strand und der kleine Leuchtturm ruht sich aus.";

function st_tokens(text){
    const tokens = [];
    String(text || "").replace(/\r/g, "").split(/\n\s*\n|\n/).forEach((absatz, a) => {
        if (a > 0) tokens.push({ typ: "absatz" });
        absatz.split(/\s+/).filter(Boolean).forEach(roh => {
            const m = /^([^A-Za-zÄÖÜäöüß]*)([A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß-]*[A-Za-zÄÖÜäöüß]|[A-Za-zÄÖÜäöüß])?(.*)$/.exec(roh);
            const kern = m && m[2] ? m[2] : "";
            const silben = kern ? kern.split("-").flatMap((teil, k, alle) => {
                const s = silben_trennen(teil);
                if (k < alle.length - 1 && s.length) s[s.length - 1] += "-";
                return s;
            }) : [];
            tokens.push({ typ: "wort", vor: m ? m[1] : roh, kern, nach: m ? m[3] : "", silben, satzende: /[.!?]["“”»]?$/.test(roh) });
        });
    });
    return tokens;
}
function st_wortHtml(t, art, nr){
    if (!t.kern) return ws_esc(t.vor + t.nach);
    let mitte;
    if (art === "normal") mitte = ws_esc(t.kern);
    else if (art === "woerter") mitte = `<span class="st-wort${nr % 2 + 1}">${ws_esc(t.kern)}</span>`;
    else if (art === "farbig") mitte = t.silben.map((s, i) => `<span class="st-s${i % 2 + 1}">${ws_esc(s)}</span>`).join("");
    else mitte = t.silben.map((s, i) => {
        const farbe = i % 2 === 0 ? "#1D5FA8" : "#B23A2E";
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 14" preserveAspectRatio="none"><path d="M3 2 Q50 22 97 2" fill="none" stroke="${farbe}" stroke-width="4" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`;
        return `<span class="ws-s${i % 2 + 1}">${ws_esc(s)}<img class="ws-bogen" alt="" src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}"></span>`;
    }).join("");
    return `<span class="st-w">${ws_esc(t.vor)}${mitte}${ws_esc(t.nach)}</span>`;
}
function st_html(tokens, opt){
    let html = "<p>", wortNr = 0;
    tokens.forEach(t => {
        if (t.typ === "absatz"){ html += "</p><p>"; return; }
        html += st_wortHtml(t, opt.art, wortNr++) + " ";
        if (opt.saetze && t.satzende) html += "<br>";
    });
    return html + "</p>";
}
function st_optionen(){
    return {
        text: lt_wert("st-text"), titel: lt_wert("st-titel").trim() || "Mein Lesetext",
        art: lt_wert("st-art") || "farbig", groesse: parseInt(lt_wert("st-groesse"), 10) || 24,
        abstand: parseFloat(lt_wert("st-abstand")) || 2, schrift: lt_wert("st-schrift") || "Andika",
        saetze: lt_an("st-saetze"), protokoll: lt_an("st-protokoll"),
    };
}
async function st_erstellen(box){
    await silben_laden();
    if (document.fonts && document.fonts.load) await Promise.all([document.fonts.load("400 24px Andika"), document.fonts.load("400 24px 'Atkinson Hyperlegible'")]).catch(() => {});
    const opt = st_optionen();
    const tokens = st_tokens(opt.text);
    if (!tokens.some(t => t.typ === "wort")){ box.innerHTML = '<p class="beschreibung">Bitte oben einen Text eingeben.</p>'; return; }
    const ende = opt.protokoll ? `<div class="st-protokoll">Ich habe den Text <span class="ws-linie2"></span> mal gelesen. <span>Zeit: <span class="ws-linie2"></span></span> <span>Das war schwer: <span class="ws-linie2" style="width:180px;"></span></span></div><div class="st-malbox">Male ein Bild zum Text oder schreibe auf, was dir gefallen hat:</div>` : "";
    await st_paginieren(box, "silbentext", "1", opt, tokens, ende, opt.schrift !== "Andika");
}

/* ---------- Stunde und Förderplan: Lehrkraft-Seiten ---------- */
const FP_FUNKTIONEN = {
    aufmerksamkeit: "Aufmerksamkeit/Konzentration", optdiff: "Optische Differenzierung", optged: "Optisches Gedächtnis", optser: "Optische Serialität",
    akdiff: "Akustische Differenzierung", akged: "Akustisches Gedächtnis", akser: "Akustische Serialität", koerper: "Körperschema", raum: "Raumorientierung",
};
const FP_ZIELE = {
    aufmerksamkeit: "Aufmerksamkeit gezielt lenken und über die ganze Übung halten",
    optdiff: "ähnliche Buchstaben, Formen und Wortbilder sicher unterscheiden",
    optged: "Wortbilder und Formen kurz einprägen und sicher wiedergeben",
    optser: "Reihenfolgen von Zeichen und Buchstaben sicher erfassen",
    akdiff: "ähnlich klingende Laute und Silben sicher unterscheiden",
    akged: "Gehörtes behalten und vollständig wiedergeben",
    akser: "Laut- und Silbenfolgen in der richtigen Reihenfolge erfassen",
    koerper: "rechts und links am eigenen Körper sicher benennen",
    raum: "Raumlage und Richtungen sicher erkennen (b/d, p/q)",
};
function lt_smiley(art){
    const mund = { gut: "M14 27 Q22 34 30 27", mittel: "M14 29 L30 29", schlecht: "M14 31 Q22 24 30 31" }[art];
    return `<svg viewBox="0 0 44 44" width="70" height="70"><circle cx="22" cy="22" r="20" fill="#fff" stroke="#1E2A36" stroke-width="2.5"/><circle cx="15" cy="17" r="2.6" fill="#1E2A36"/><circle cx="29" cy="17" r="2.6" fill="#1E2A36"/><path d="${mund}" fill="none" stroke="#1E2A36" stroke-width="2.5" stroke-linecap="round"/></svg>`;
}
const LT_LINIENFELD = "flex:1; min-height:96px; background:repeating-linear-gradient(to bottom, transparent 0, transparent 33px, #8FA3B8 33px, #8FA3B8 34.5px);";

function std_ablaufplan(info){
    const zeilen = info.phasen.map(p => `<tr><td><b>${p.phase}</b></td><td style="white-space:nowrap;"><b>${p.zeit}</b><br><small style="color:#7c8a94;">Min. ${p.von}–${p.bis}</small></td><td>${p.inhalt}</td><td style="text-align:center;"><span class="fs-kaestchen-klein" style="width:26px; height:26px;"></span></td></tr>`).join("");
    return { titel: "Ablaufplan der Stunde", extra: { info: true, max: 1, reif: true, label: "Stundenplanung", afs: "AFS · Aufmerksamkeit – Funktion – Symptom", kopfRechts: `Kürzel: <b>${ws_esc(info.kind || "______")}</b> · Datum: <span class="ws-linie" style="width:120px;"></span>` }, html: `
        <div class="dk-info"><span>Dauer: <b>${info.dauer} Minuten</b></span><span>Beginn: <span style="display:inline-block; width:70px; border-bottom:1.5px solid #1E2A36;"></span> Uhr</span><span>Ende: <span style="display:inline-block; width:70px; border-bottom:1.5px solid #1E2A36;"></span> Uhr</span></div>
        <table class="std-tabelle"><thead><tr><th style="width:150px;">Phase</th><th style="width:86px;">Zeit</th><th>Inhalt / Material</th><th style="width:44px;">✓</th></tr></thead><tbody>${zeilen}</tbody></table>
        <div><b style="font-size:15px;">Für den Lernverlauf (danach in die Förderkartei übertragen)</b></div>
        <div class="std-felder"><div>Diktat: <span class="l"></span> Fehler / <span class="l"></span> Wörter</div><div>Zahlentafel: <span class="l"></span> Sek.</div><div>Lernbox: <span class="l"></span> richtig / <span class="l"></span> üben</div></div>
        <div><b style="font-size:15px;">Beobachtungen &amp; nächste Schritte</b></div>
        <div style="${LT_LINIENFELD}"></div>` };
}

function std_rueckblick(info){
    if (lt_klasse() >= 5) return std_reflexion(info);
    return { titel: "Mein Stunden-Rückblick", extra: { info: true, max: 1, label: "Abschluss", afs: "AFS · Reflexion und Motivation" }, html: `
        ${ws_aufgabe(1, "Wie war die Stunde heute für dich? Male ein Gesicht an.")}
        <div class="rb-smileys"><div>${lt_smiley("gut")}super</div><div>${lt_smiley("mittel")}geht so</div><div>${lt_smiley("schlecht")}schwer</div></div>
        ${ws_aufgabe(2, "Das habe ich heute geübt – hake ab, was du geschafft hast:")}
        <div style="display:flex; flex-direction:column; gap:8px; font-size:19px; padding-left:50px;">${info.geuebt.map(g => `<div style="display:flex; gap:12px; align-items:center;"><span class="fs-kaestchen-klein" style="width:26px; height:26px;"></span>${ws_esc(g)}</div>`).join("")}</div>
        ${info.merksatz ? `<div class="rs-merksatz">Mein Merksatz: ${info.merksatz}</div>` : ""}
        <div style="display:flex; gap:26px; align-items:stretch; flex:1; min-height:200px;">
            <div style="flex:1; display:flex; flex-direction:column; gap:10px;">
                ${ws_aufgabe(3, "Das kann ich jetzt schon gut:")}<div style="${LT_LINIENFELD} min-height:70px;"></div>
                ${ws_aufgabe(4, "Das will ich noch üben:")}<div style="${LT_LINIENFELD} min-height:70px;"></div>
            </div>
            <div style="display:flex; flex-direction:column; align-items:center; gap:10px; justify-content:center;"><div class="rb-stempel">Stempel<br>oder<br>Sticker</div><div style="font-size:15px;">Lernpass-Feld Nr. <span class="rs-linie" style="min-width:50px;"></span></div></div>
        </div>` };
}

// ab Klasse 5: sachliche Selbsteinschätzung statt Smileys und Stempel
function std_reflexion(info){
    const aussagen = ["Ich konnte mich gut konzentrieren.", "Ich habe die Aufgaben verstanden.", "Ich habe sorgfältig gearbeitet.", "Ich bin mit meinem Ergebnis zufrieden."];
    const kreuz = `<span class="fs-kaestchen-klein" style="width:24px; height:24px;"></span>`;
    return { titel: "Reflexion der Stunde", extra: { info: true, max: 1, reif: true, label: "Abschluss", afs: "AFS · Reflexion und Lernziele" }, html: `
        ${ws_aufgabe(1, "Wie schätzt du dich heute ein? Kreuze an: 1 = trifft gar nicht zu … 5 = trifft voll zu.")}
        <table class="std-tabelle"><thead><tr><th>Aussage</th>${[1, 2, 3, 4, 5].map(z => `<th style="width:50px; text-align:center;">${z}</th>`).join("")}</tr></thead>
            <tbody>${aussagen.map(a => `<tr><td>${a}</td>${[1, 2, 3, 4, 5].map(() => `<td style="text-align:center;">${kreuz}</td>`).join("")}</tr>`).join("")}</tbody></table>
        ${ws_aufgabe(2, "Das habe ich heute geübt:")}
        <div style="display:flex; flex-direction:column; gap:6px; font-size:17px; padding-left:50px;">${info.geuebt.map(g => `<div style="display:flex; gap:10px; align-items:center;">${kreuz}${ws_esc(g)}</div>`).join("")}</div>
        ${info.merksatz ? `<div class="rs-merksatz">Strategie: ${info.merksatz}</div>` : ""}
        ${ws_aufgabe(3, "Das nehme ich mit (das Wichtigste aus der Stunde):")}<div style="${LT_LINIENFELD} min-height:70px;"></div>
        ${ws_aufgabe(4, "Mein Ziel bis zur nächsten Stunde:")}<div style="${LT_LINIENFELD} min-height:70px;"></div>
        ${ws_aufgabe(5, "Frage oder Wunsch für die nächste Stunde:")}<div style="${LT_LINIENFELD} min-height:40px; flex:0.6;"></div>` };
}

function fp_uebersicht(info){
    const liste = (titel, eintraege) => `<div><b>${titel}</b>${eintraege.length ? eintraege.join("<br>") : "–"}</div>`;
    return { titel: "Förderplan", extra: { info: true, max: 1, reif: true, label: "Förderplan", afs: "AFS · Funktion vor Symptom", kopfRechts: `Kürzel: <b>${ws_esc(info.kind || "______")}</b> · erstellt: ${new Date().toLocaleDateString("de-DE")}` }, html: `
        <div class="fp-uebersicht">
            ${liste("Funktionsbereiche", info.funktionen.map(k => `• ${ws_esc(FP_FUNKTIONEN[k])}${info.stufen[k] === "e" ? " <b style='display:inline; color:#B23A2E;'>(Training erforderlich)</b>" : (info.stufen[k] === "r" ? " (ratsam)" : "")}`))}
            ${liste("Rechtschreib-Schwerpunkte", info.rs.map(k => `• ${ws_esc(RS_SCHWERPUNKTE[k].name)}${info.zahl[k] ? ` – ${info.zahl[k]} Fehler im Diktat` : ""}`))}
            ${liste("Ziele Funktionstraining", info.funktionen.map(k => `• ${ws_esc(FP_ZIELE[k])}`))}
            ${liste("Ziele Symptomtraining", info.rs.map(k => `• ${RS_SCHWERPUNKTE[k].merksatz}`))}
        </div>
        ${info.beispiele.length ? `<div class="rs-beispiele" style="grid-template-columns:1fr;"><div><b>Beispiele aus dem Diktat (richtig / so geschrieben)</b>${info.beispiele.map(ws_esc).join(" · ")}</div></div>` : ""}
        <div><b style="font-size:15px;">Inhalt dieses Förderpakets</b><ol class="rs-schritte" style="columns:2; column-gap:30px;">${info.inhalt.map(t => `<li>${ws_esc(t)}</li>`).join("")}</ol></div>
        <div class="std-felder"><div>Start: <span class="l" style="min-width:90px;"></span></div><div>Zwischencheck (Diktat): <span class="l" style="min-width:90px;"></span></div><div>Elterngespräch: <span class="l" style="min-width:90px;"></span></div></div>
        <div><b style="font-size:15px;">Notizen</b></div>
        <div style="${LT_LINIENFELD}"></div>` };
}

/* ---------- Förderplan: Auswahl, Übernahme aus dem Gutachten ---------- */
let fp_import = null;

const FP_GRUPPEN = [
    { titel: "Aufmerksamkeit", icon: "fa-bullseye", keys: ["aufmerksamkeit"] },
    { titel: "Optik", icon: "fa-eye", keys: ["optdiff", "optged", "optser"] },
    { titel: "Akustik", icon: "fa-ear-listen", keys: ["akdiff", "akged", "akser"] },
    { titel: "Raum & Körper", icon: "fa-person-walking", keys: ["raum", "koerper"] },
];
const FP_KURZ = { aufmerksamkeit: "Aufmerksamkeit & Konzentration", optdiff: "Differenzierung", optged: "Gedächtnis", optser: "Serialität", akdiff: "Differenzierung", akged: "Gedächtnis", akser: "Serialität", raum: "Raumorientierung", koerper: "Körperschema" };

function fp_chip(klasse, key, text, unter, badgeId){
    return `<label class="fp-chip" data-key="${key}"><input type="checkbox" class="${klasse}" value="${key}"><span class="fp-chip-text">${text}${unter ? `<small>${unter}</small>` : ""}<span class="fp-badge" id="${badgeId}"></span></span></label>`;
}
function fp_auswahlAufbauen(){
    const f = document.getElementById("fp-funktionen"), r = document.getElementById("fp-rs");
    if (!f || f.children.length) return;
    f.innerHTML = FP_GRUPPEN.map(g => `<div class="fp-gruppe"><div class="fp-gruppe-titel"><i class="fa-solid ${g.icon}"></i> ${g.titel}</div>${g.keys.map(k => fp_chip("fp-f", k, ws_esc(FP_KURZ[k]), "", "fp-stufe-" + k)).join("")}</div>`).join("");
    fp_rsAufbauen([]);
    document.getElementById("bereich-plan").addEventListener("change", fp_aktualisieren);
    document.getElementById("fp-anzahl-knoepfe").addEventListener("click", e => {
        const k = e.target.closest("button");
        if (!k) return;
        document.querySelectorAll("#fp-anzahl-knoepfe button").forEach(b => b.classList.toggle("an", b === k));
        document.getElementById("fp-anzahl").value = k.dataset.wert;
        fp_aktualisieren();
    });
    fp_aktualisieren();
}
// Rechtschreib-Kacheln – Vorschläge aus dem Diktat stehen vorn
function fp_rsAufbauen(vorne){
    const r = document.getElementById("fp-rs");
    const an = new Set([...document.querySelectorAll(".fp-r:checked")].map(c => c.value));
    const keys = [...vorne, ...Object.keys(RS_SCHWERPUNKTE).filter(k => !vorne.includes(k))];
    r.innerHTML = keys.map(k => fp_chip("fp-r", k, ws_esc(RS_SCHWERPUNKTE[k].name), "", "fp-zahl-" + k)).join("");
    an.forEach(k => { const cb = r.querySelector(`.fp-r[value="${k}"]`); if (cb) cb.checked = true; });
}
function fp_badge(id, text, art){
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.className = "fp-badge " + art;
    const chip = el.closest(".fp-chip");
    if (chip) chip.classList.add("vorschlag");
}
function fp_aktualisieren(){
    document.querySelectorAll("#bereich-plan .fp-chip").forEach(c => c.classList.toggle("an", !!c.querySelector("input").checked));
    const f = document.querySelectorAll(".fp-f:checked").length, r = document.querySelectorAll(".fp-r:checked").length;
    const n = parseInt(lt_wert("fp-anzahl"), 10) || 2;
    const code = lt_wert("fp-kind");
    const blaetter = (lt_an("fp-uebersicht") ? 1 : 0) + f * n + r * (n + 1) + (code && kt_woerter(code).length ? 2 : 0)
        + (lt_an("fp-kaertchen") && r ? Math.ceil(r / 8) : 0) + (lt_an("fp-eltern") ? 1 : 0);
    document.getElementById("fp-n-f").textContent = f ? `${f} gewählt` : "";
    document.getElementById("fp-n-r").textContent = r ? `${r} gewählt` : "";
    document.getElementById("fp-summe").innerHTML = (f || r)
        ? `<b>${blaetter}</b> Blätter <span>· ${f} ${f === 1 ? "Funktionsbereich" : "Funktionsbereiche"} · ${r} ${r === 1 ? "Schwerpunkt" : "Schwerpunkte"}</span>`
        : `<span>Wähle oben mindestens einen Bereich aus.</span>`;
}

function fp_hashLesen(){
    const m = /[#&]plan=([^&]+)/.exec(location.hash);
    if (!m) return false;
    let daten;
    try {
        const b64 = m[1].replace(/-/g, "+").replace(/_/g, "/");
        const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
        daten = JSON.parse(new TextDecoder().decode(bytes));
    } catch (e) { console.warn("Förderplan-Daten nicht lesbar", e); return false; }
    history.replaceState(null, "", location.pathname + location.search);   // Daten nicht im Verlauf behalten
    fp_import = daten;
    fp_auswahlAufbauen();

    const stufen = daten.f || {};
    Object.entries(stufen).forEach(([k, s]) => {
        const cb = document.querySelector(`.fp-f[value="${k}"]`);
        if (cb && (s === "e" || s === "r")){ cb.checked = true; fp_badge("fp-stufe-" + k, s === "e" ? "erforderlich" : "ratsam", s); }
    });
    // Wahrnehmungsbereiche aus dem Diktat-Auswertungsbogen
    const BOGEN = { optik: ["optdiff"], akustik: ["akdiff"], raumlage: ["raum"], serialitaet: ["optser", "akser"], aufmerksamkeit: ["aufmerksamkeit"] };
    Object.entries(daten.b || {}).forEach(([bereich, n]) => {
        if (!(n > 0)) return;
        (BOGEN[bereich] || []).forEach(k => {
            const cb = document.querySelector(`.fp-f[value="${k}"]`);
            if (cb && !cb.checked){ cb.checked = true; fp_badge("fp-stufe-" + k, `Diktat: ${n}`, "d"); }
        });
    });
    if (daten.a){ document.querySelector('.fp-f[value="aufmerksamkeit"]').checked = true; fp_badge("fp-stufe-aufmerksamkeit", "Diktat: Wortanzahl", "d"); }

    // Fehlerwörter → Rechtschreib-Schwerpunkte
    const paare = (daten.w || []).filter(p => Array.isArray(p) && p[0] && p[1] && p[0] !== p[1]).slice(0, 150);
    const zahl = {}, beispiele = {};
    fp_import.woerter = paare.map(([ziel, kind]) => {
        const sp = rs_einordnen(ziel, kind);
        sp.filter(k => k !== "sonstige").forEach(k => { zahl[k] = (zahl[k] || 0) + 1; (beispiele[k] = beispiele[k] || []).push(`${ziel}/${kind}`); });
        return { wort: ziel, falsch: kind, sp };
    });
    fp_import.zahl = zahl;
    const sortiert = Object.entries(zahl).sort((a, b) => b[1] - a[1]);
    fp_rsAufbauen(sortiert.map(([k]) => k));
    sortiert.slice(0, 3).forEach(([k]) => { const cb = document.querySelector(`.fp-r[value="${k}"]`); if (cb) cb.checked = true; });
    sortiert.forEach(([k, n]) => fp_badge("fp-zahl-" + k, `${n}× im Diktat`, "d"));
    if (daten.k && /^[1-8]$/.test(String(daten.k))) document.getElementById("g-klasse").value = String(daten.k);

    const herkunft = document.getElementById("fp-herkunft");
    const fNamen = Object.keys(stufen).filter(k => stufen[k] === "e" || stufen[k] === "r");
    const fehlerSumme = sortiert.reduce((summe, [, n]) => summe + n, 0);
    const max = sortiert.length ? sortiert[0][1] : 1;
    herkunft.innerHTML = `<div class="fp-import">
        <div class="fp-import-kopf"><i class="fa-solid fa-file-import"></i> Aus dem Gutachten übernommen <small>· nur Einstufungen und Fehlerwörter, keine Namen</small></div>
        <div class="fp-kacheln">
            <div class="fp-kachel"><b>${fNamen.length}</b><span>Funktionsbereiche mit Trainingsbedarf</span></div>
            <div class="fp-kachel"><b>${paare.length}</b><span>Fehlerwörter im Diktat</span></div>
            <div class="fp-kachel"><b>${sortiert.length}</b><span>Rechtschreib-Schwerpunkte erkannt (${fehlerSumme} Zuordnungen)</span></div>
        </div>
        ${sortiert.length ? `<div class="fp-balken">${sortiert.slice(0, 6).map(([k, n]) => `<div class="fp-balken-zeile"><span class="name">${ws_esc(RS_SCHWERPUNKTE[k].name)}</span><span class="spur"><span class="bar" style="width:${Math.max(14, Math.round(n / max * 160))}px;"></span><b>${n}</b><span class="bsp">${ws_esc(beispiele[k].slice(0, 3).join(" · "))}</span></span></div>`).join("")}</div>` : `<p style="margin:0; font-size:13px;">Im Diktat wurden keine Fehler einem Rechtschreib-Schwerpunkt zugeordnet.</p>`}
        ${fp_import.woerter.length ? `<div class="fp-uebertragen"><i class="fa-solid fa-box-archive" style="color:var(--meer);"></i> Die ${fp_import.woerter.length} Fehlerwörter in die Förderkartei übernehmen für <select id="fp-kartei-kind" class="fp-select" style="width:auto;">${kt_kindOptionen("— Kürzel wählen —")}</select> <button class="btn sekundaer klein" onclick="fp_inKartei()">Übernehmen</button> <span id="fp-kartei-status"></span></div>` : ""}
    </div>`;
    fp_aktualisieren();
    document.querySelector('.tabs .tab[data-bereich="plan"]').click();
    return true;
}

async function fp_inKartei(){
    const code = lt_wert("fp-kartei-kind"), st = document.getElementById("fp-kartei-status");
    if (!code){ st.textContent = "Bitte ein Kürzel wählen."; st.className = "ws-sp-fehler"; return; }
    st.className = ""; st.textContent = "Wird übernommen …";
    try {
        const antwort = await fetch("foerderkartei.php", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ aktion: "woerter_hinzu", kind: code, eintraege: fp_import.woerter }) });
        const j = await antwort.json();
        if (!j.ok) throw new Error(j.fehler || "Fehler");
        LRS_KARTEI[code] = (j.daten.woerter || []).map(w => ({ w: w.wort, sp: w.sp, f: w.fach, x: w.falschschreibungen || [] }));
        st.className = "ws-sp-ok";
        st.innerHTML = `✅ ${ws_esc(j.meldung)} <a href="foerderkartei.php?kind=${encodeURIComponent(code)}" target="_blank">Förderkartei öffnen</a>`;
        const fk = document.getElementById("fp-kind");
        if (fk){ fk.innerHTML = kt_kindOptionen("— ohne —"); fk.value = code; fp_aktualisieren(); }
    } catch (e){ st.className = "ws-sp-fehler"; st.textContent = "⚠️ " + (e.message || "Speichern fehlgeschlagen. Liegt foerderkartei.php im gleichen Ordner?"); }
}

// Blätter einer Funktions-Serie auswählen (Aufmerksamkeit je nach Klasse)
function fp_serieVon(key){ return key === "aufmerksamkeit" && lt_klasse() >= 5 ? "aufmerksamkeit5" : key; }
function fp_blattEintrag(serieKey, b, nr){
    const s = FS_SERIEN[serieKey];
    return { nr: String(nr), kurz: `${s.label.replace(" · ab Klasse 5", "")}: ${b.kurz}`, name: `${s.label} – ${b.name}`, bau: b.bau, extra: { label: s.label, afs: s.afs, reif: lt_reifVon(s) } };
}
function fp_rsEintrag(key, fn, name, nr, code){
    const sp = rs_mitKartei(RS_SCHWERPUNKTE[key], code);
    return { nr: String(nr), kurz: `${RS_NAMEN[key] ? RS_NAMEN[key].kurz : key}: ${name}`, name: `${sp.name} – ${name}`, bau: c => fn({ ...c, rs: sp }), extra: { label: "Rechtschreibung", afs: "Symptomtraining: Rechtschreibstrategien", reif: true } };
}

function fp_dynamisch(){
    const funktionen = [...document.querySelectorAll(".fp-f:checked")].map(c => c.value);
    const rs = [...document.querySelectorAll(".fp-r:checked")].map(c => c.value);
    const anzahl = parseInt(lt_wert("fp-anzahl"), 10) || 2;
    const code = lt_wert("fp-kind");
    const blaetter = [];
    let nr = 1;
    const inhalt = [];
    const uebersicht = lt_an("fp-uebersicht");
    if (uebersicht) blaetter.push(null);   // Platzhalter – wird am Ende mit der Inhaltsliste gefüllt
    funktionen.forEach(key => {
        const sk = fp_serieVon(key), s = FS_SERIEN[sk];
        const wahl = mische(fs_katalog(sk).filter(au_passt)).slice(0, anzahl).sort((a, b) => a.nr - b.nr);
        wahl.forEach(b => { blaetter.push(fp_blattEintrag(sk, b, 0)); inhalt.push(`${s.label}: ${b.name}`); });
    });
    const RS_FOLGE = [[rsB_regel, "Regel & Strategie"], [rsB_luecken, "Lückenwörter"], [rsB_fehler, "Fehlerdetektiv"], [rsB_strategie, "Strategie-Check"]];
    rs.forEach(key => RS_FOLGE.slice(0, anzahl + 1).forEach(([fn, name]) => { blaetter.push(fp_rsEintrag(key, fn, name, 0, code)); inhalt.push(`${RS_SCHWERPUNKTE[key].name}: ${name}`); }));
    if (code && kt_woerter(code).length){
        const kt = kt_kontextFuer(code, "offen");
        [KT_BLAETTER[0], KT_BLAETTER[2]].forEach(b => {
            blaetter.push({ nr: "0", kurz: `Kartei: ${b.kurz}`, name: `Fehlerwörter – ${b.name}`, bau: c => b.bau({ ...c, kt }), extra: { label: "Meine Fehlerwörter", afs: "Symptomtraining: Fehlerwörter-Kartei", reif: lt_klasse() >= 5 } });
            inhalt.push(`Eigene Fehlerwörter: ${b.name}`);
        });
    }
    if (lt_an("fp-kaertchen") && rs.length){ sk_blaetter(rs).forEach(b => { blaetter.push({ ...b, kurz: "Kärtchen" }); }); inhalt.push("Strategie-Kärtchen"); }
    if (lt_an("fp-eltern")){ blaetter.push({ nr: "0", kurz: "Elternblatt", name: "Elternblatt", bau: () => eb_blatt([...funktionen, ...rs], code) }); inhalt.push("Elternblatt (10 Minuten am Tag)"); }
    if (uebersicht){
        const stufen = (fp_import && fp_import.f) || {};
        const beispiele = ((fp_import && fp_import.woerter) || []).filter(w => w.sp.some(k => rs.includes(k))).slice(0, 10).map(w => `${w.wort} / ${w.falsch}`);
        const info = { kind: code, funktionen, rs, stufen, zahl: (fp_import && fp_import.zahl) || {}, beispiele, inhalt };
        blaetter[0] = { nr: "0", kurz: "Förderplan", name: "Förderplan-Übersicht", bau: () => fp_uebersicht(info) };
    }
    return blaetter.filter(Boolean).map((b, i) => ({ ...b, nr: String(i + 1) }));
}

/* ---------- Stunde zusammenstellen ---------- */
const STD_FUNKTIONEN = ["optdiff", "optged", "optser", "akdiff", "akged", "akser", "koerper", "raum"];

// Klassenstufe/Schwierigkeit der Stunde = gemeinsame Einstellungen oben (beide Richtungen abgleichen)
function std_einstellungenVerbinden(){
    [["std-klasse", "g-klasse"], ["std-schwierigkeit", "g-schwierigkeit"]].forEach(([lokal, global]) => {
        const l = document.getElementById(lokal), g = document.getElementById(global);
        l.value = g.value;
        l.addEventListener("change", () => { g.value = l.value; g.dispatchEvent(new Event("change")); });
        g.addEventListener("change", () => { if (l.value !== g.value) l.value = g.value; });
    });
}
function std_klasseAusKuerzel(){
    const m = /^([1-8])/.exec(lt_wert("std-kind") || "");
    if (!m) return;
    const l = document.getElementById("std-klasse");
    if (l.value !== m[1]){ l.value = m[1]; l.dispatchEvent(new Event("change")); }
}
function std_auswahlAufbauen(){
    const aufm = document.getElementById("std-aufm");
    if (!aufm || aufm.options.length) return;
    std_dauerLaden();
    std_einstellungenVerbinden();
    aufm.innerHTML = `<option value="zufall">Passend zur Klassenstufe (zufällig)</option>` +
        ["aufmerksamkeit", "aufmerksamkeit5"].map(k => `<optgroup label="${ws_esc(FS_SERIEN[k].label)}">${fs_katalog(k).map(b => `<option value="${k}:${b.nr}">${ws_esc(b.name)}${b.ab ? ` (ab Kl. ${b.ab})` : ""}</option>`).join("")}</optgroup>`).join("") +
        `<option value="">– ohne Aufmerksamkeitsblatt –</option>`;
    document.getElementById("std-funktion").innerHTML = STD_FUNKTIONEN.map(k => `<option value="${k}">${ws_esc(FS_SERIEN[k].label)}</option>`).join("") + `<option value="">– ohne Funktionsblatt –</option>`;
    document.getElementById("std-symptom").innerHTML =
        `<optgroup label="Rechtschreibung (ab Kl. 3/4)">${Object.entries(RS_SCHWERPUNKTE).map(([k, sp]) => `<option value="rs:${k}">${ws_esc(sp.name)}</option>`).join("")}</optgroup>` +
        `<option value="lesen">Lesetraining (Lesetext + Aufgabe, passend zur Klasse)</option>` +
        `<option value="diktat">Diktat (Übungs-, Lücken- oder Testdiktat)</option>` +
        `<option value="kartei">Eigene Fehlerwörter aus der Förderkartei</option>` +
        `<option value="ws">Worterarbeitung (Lernwörter aus dem Reiter Symptomtraining)</option>` +
        `<option value="">– ohne Symptomblatt –</option>`;
    document.getElementById("std-funktion").addEventListener("change", std_blattListen);
    document.getElementById("std-symptom").addEventListener("change", std_blattListen);
    document.getElementById("std-kind").addEventListener("change", () => {
        std_klasseAusKuerzel();
        if (lt_wert("std-kind") && kt_woerter(lt_wert("std-kind")).length) document.getElementById("std-symptom").value = "kartei";
        std_blattListen();
    });
    std_blattListen();
}
function std_blattListen(){
    const f = lt_wert("std-funktion"), sy = lt_wert("std-symptom");
    const fb = document.getElementById("std-funktion-blatt"), sb = document.getElementById("std-symptom-blatt");
    fb.innerHTML = f ? `<option value="zufall">zufällig</option>` + FS_SERIEN[f].blaetter.map(b => `<option value="${b.nr}">${ws_esc(b.name)}</option>`).join("") : `<option value="">–</option>`;
    let liste = [];
    if (sy.startsWith("rs:")) liste = FS_SERIEN.rechtschreibung.blaetter;
    else if (sy === "kartei") liste = KT_BLAETTER;
    else if (sy === "ws") liste = WS_BLAETTER;
    else if (sy === "lesen") liste = LT_AUFGABEN.map(a => ({ nr: a.key, name: "Lesetext + " + a.name }));
    else if (sy === "diktat") liste = STD_DIKTAT.map(d => ({ nr: d.key, name: d.name }));
    sb.innerHTML = liste.length ? liste.map(b => `<option value="${b.nr}">${ws_esc(b.name)}</option>`).join("") : `<option value="">–</option>`;
    if (sy.startsWith("rs:")) sb.value = "2";
    const hinweis = document.getElementById("std-hinweis");
    if (sy === "kartei") hinweis.textContent = lt_wert("std-kind") ? `Fehlerwörter von ${lt_wert("std-kind")}: ${kt_woerter(lt_wert("std-kind")).length} offen.` : "Bitte oben ein Kürzel wählen – die Wörter kommen aus seiner Förderkartei.";
    else if (sy === "lesen") hinweis.textContent = "Ein Lesetext passend zu Klassenstufe und Schwierigkeit wird zufällig gewählt (Kl. 1–4 mit farbigen Silben).";
    else if (sy === "diktat") hinweis.textContent = "Ein Diktattext passend zu Klassenstufe und Schwierigkeit wird zufällig gewählt (gekürzte Fassung für die Stunde).";
    else if (sy === "ws") hinweis.textContent = "Es werden die Lernwörter aus dem Reiter Symptomtraining → Worterarbeitung verwendet: " + (lt_wert("ws-woerter") || "–");
    else hinweis.textContent = "";
}

function std_pruefen(){
    const sy = lt_wert("std-symptom");
    if (sy === "kartei"){
        const code = lt_wert("std-kind");
        if (!code) return "Für die eigenen Fehlerwörter bitte ein Kürzel wählen.";
        if (!kt_woerter(code).length) return `In der Förderkartei von ${code} sind noch keine offenen Wörter.`;
    }
    if (sy === "ws" && ws_woerterLesen().length < 2) return "Für die Worterarbeitung bitte im Reiter Symptomtraining mindestens zwei Lernwörter eintragen.";
    return null;
}

/* ---------- Dauer: frei wählbar, Phasen werden anteilig verteilt ---------- */
function std_dauer(){
    const w = lt_wert("std-dauer");
    const m = parseInt(w === "eigen" ? lt_wert("std-dauer-eigen") : w, 10);
    return Math.min(180, Math.max(10, m || 40));
}
function std_dauerWechsel(){
    const eigen = lt_wert("std-dauer") === "eigen";
    document.getElementById("std-dauer-eigen").style.display = eigen ? "" : "none";
    try { localStorage.setItem("lt_std_dauer", String(std_dauer())); } catch (e){}
}
function std_dauerLaden(){
    let m = null;
    try { m = parseInt(localStorage.getItem("lt_std_dauer"), 10); } catch (e){}
    if (!m) return;
    const sel = document.getElementById("std-dauer");
    if ([...sel.options].some(o => o.value === String(m))) sel.value = String(m);
    else { sel.value = "eigen"; document.getElementById("std-dauer-eigen").value = m; }
    std_dauerWechsel();
}
// Gewichte je Phase; fehlende Phasen fallen weg, der Rest wird auf die Gesamtdauer hochgerechnet
const STD_GEWICHT = { Ankommen: 3, Aufmerksamkeit: 7, Funktionstraining: 14, Symptomtraining: 15, Abschluss: 5 };
const STD_MINDEST = { Ankommen: 2, Aufmerksamkeit: 3, Funktionstraining: 5, Symptomtraining: 5, Abschluss: 2 };
function std_zeitenVerteilen(phasen, gesamt){
    const summe = phasen.reduce((a, p) => a + STD_GEWICHT[p.phase], 0);
    const roh = phasen.map(p => Math.max(STD_MINDEST[p.phase], gesamt * STD_GEWICHT[p.phase] / summe));
    let min = roh.map(Math.floor);
    let rest = gesamt - min.reduce((a, b) => a + b, 0);
    // Rundungsrest an die größten Nachkommastellen, Überhang von den größten Phasen abziehen
    const ordnung = roh.map((r, i) => [r - Math.floor(r), i]).sort((a, b) => b[0] - a[0]).map(x => x[1]);
    for (let k = 0; rest > 0; k++, rest--) min[ordnung[k % ordnung.length]]++;
    while (rest < 0){
        const i = min.indexOf(Math.max(...min));
        if (min[i] <= 1) break;
        min[i]--; rest++;
    }
    let start = 0;
    phasen.forEach((p, i) => { p.zeit = `${min[i]} Min.`; p.von = start; start += min[i]; p.bis = start; });
}
/* Lesen und Diktat in der Stunde */
const STD_DIKTAT = [
    { key: "ueben", name: "Übungsdiktat (Lehrkraft + Schülerblatt)", blaetter: ["lehrkraft", "schueler"] },
    { key: "luecken", name: "Lückendiktat (Lehrkraft + Lückenblatt)", blaetter: ["lehrkraft", "luecken"] },
    { key: "test", name: "Testdiktat mit Auswertungsbogen", blaetter: ["lehrkraft", "schueler", "auswertung"] },
];
function std_stufe(){ return { leicht: "l", mittel: "m", schwer: "s" }[lt_wert("g-schwierigkeit")] || "m"; }
function std_lesetext(){
    const k = lt_klasse(), st = std_stufe();
    const passend = LT_TEXTE.filter(t => t.k === k && t.s === st);
    const text = zufallsElement(passend.length ? passend : LT_TEXTE.filter(t => t.k === k));
    return { text, klasse: k, stufe: text.s, umfang: 0, art: k <= 4 ? "farbig" : "normal", saetze: lt_saetze(text.x), reif: k >= 5 };
}
function std_lesetextSeite(lt){
    const t = lt.text;
    const stil = `font-size:${LT_SCHRIFT[lt.klasse] || 22}px; line-height:${LT_ABSTAND[lt.klasse] || 1.9}; font-family:'${lt.reif ? "Atkinson Hyperlegible" : "Andika"}', 'Andika', sans-serif;`;
    return { titel: ws_esc(t.t), extra: { max: 1, info: true }, html: `
        <div class="st-text" style="${stil}">${st_html(st_tokens(t.x), { art: lt.art, saetze: false })}</div>
        <div class="st-protokoll">Ich habe den Text <span class="ws-linie2"></span> mal gelesen. <span>Zeit: <span class="ws-linie2"></span> Sek.</span> <span>${lt_woerter(t.x).length} Wörter</span></div>
        ${lt.klasse <= 4 ? `<div class="st-malbox" style="flex:1; min-height:90px;">Male ein Bild zum Text:</div>` : `<div style="font-size:15px; font-weight:700; color:#4A5866;">Notizen zum Text:</div><div style="${LT_LINIENFELD} min-height:60px;"></div>`}` };
}
function std_diktat(){
    const k = lt_klasse(), st = std_stufe();
    const passend = DK_TEXTE.filter(t => t.k === k && t.s === st);
    const text = dk_kuerzen(zufallsElement(passend.length ? passend : DK_TEXTE.filter(t => t.k === k)), "mittel");
    return { text, klasse: k, reif: k >= 5 };
}
function std_dynamisch(){
    const dauer = std_dauer();
    const code = lt_wert("std-kind");
    const blaetter = [], phasen = [], geuebt = [];
    let merksatz = "";
    const zeiten = ["", "", "", "", ""];
    phasen.push({ phase: "Ankommen", zeit: zeiten[0], inhalt: "Begrüßung, kurzes Gespräch: Wie war die Woche? Was hat in der Schule gut geklappt?" + (code && kt_woerter(code).length ? ` Lernbox: fällige Wörter von ${ws_esc(code)} abfragen.` : "") });

    const aufm = lt_wert("std-aufm");
    if (aufm){
        let sk, nr;
        if (aufm === "zufall"){ sk = fp_serieVon("aufmerksamkeit"); nr = zufallsElement(fs_katalog(sk).filter(b => au_passt(b) && (b.nr !== "3" || sk !== "aufmerksamkeit5"))).nr; }
        else [sk, nr] = aufm.split(":");
        const b = fs_katalog(sk).find(x => x.nr === nr);
        blaetter.push(fp_blattEintrag(sk, b, 0));
        phasen.push({ phase: "Aufmerksamkeit", zeit: zeiten[1], inhalt: `Blatt „${ws_esc(b.name)}“ – Einstieg, Konzentration aufbauen.` });
        geuebt.push(b.name);
    }
    const f = lt_wert("std-funktion");
    if (f){
        const fb = lt_wert("std-funktion-blatt");
        const b = fb === "zufall" ? zufallsElement(FS_SERIEN[f].blaetter) : FS_SERIEN[f].blaetter.find(x => x.nr === fb);
        blaetter.push(fp_blattEintrag(f, b, 0));
        phasen.push({ phase: "Funktionstraining", zeit: zeiten[2], inhalt: `${ws_esc(FS_SERIEN[f].label)}: „${ws_esc(b.name)}“. Ziel: ${ws_esc(FP_ZIELE[f] || "")}.` });
        geuebt.push(b.name);
    }
    const sy = lt_wert("std-symptom"), sb = lt_wert("std-symptom-blatt");
    if (sy.startsWith("rs:")){
        const key = sy.slice(3);
        const b = FS_SERIEN.rechtschreibung.blaetter.find(x => x.nr === sb) || FS_SERIEN.rechtschreibung.blaetter[0];
        blaetter.push(fp_rsEintrag(key, b.bau, b.name, 0, code));
        merksatz = RS_SCHWERPUNKTE[key].merksatz;
        phasen.push({ phase: "Symptomtraining", zeit: zeiten[3], inhalt: `${ws_esc(RS_SCHWERPUNKTE[key].name)}: „${ws_esc(b.name)}“. Strategie: ${RS_SCHWERPUNKTE[key].pruefen.replace(/[.?!]$/, "")}.` });
        geuebt.push(`${RS_NAMEN[key] ? RS_NAMEN[key].kurz : key}: ${b.name}`);
    } else if (sy === "lesen"){
        const lt = std_lesetext();
        const a = LT_AUFGABEN.find(x => x.key === sb) || LT_AUFGABEN[0];
        const extra = { label: "Lesetraining", afs: "Symptomtraining: Lesen & Textverständnis", reif: lt.reif };
        blaetter.push({ nr: "0", kurz: "Lesetext", name: `Lesetext „${lt.text.t}“`, bau: () => std_lesetextSeite(lt), extra });
        blaetter.push({ nr: "0", kurz: a.kurz, name: a.name, bau: c => LT_BAU[a.key]({ ...c, lt }), extra });
        phasen.push({ phase: "Symptomtraining", zeit: zeiten[3], inhalt: `Lesetraining: „${ws_esc(lt.text.t)}“ (${lt_woerter(lt.text.x).length} Wörter, ${LT_STUFEN[lt.text.s]}) – erst vorlesen lassen, dann „${ws_esc(a.name)}“.` });
        geuebt.push(`Lesen: ${lt.text.t}`, a.name);
    } else if (sy === "diktat"){
        const d = STD_DIKTAT.find(x => x.key === sb) || STD_DIKTAT[0];
        const dk = std_diktat();
        const lang = dk_auswertungDaten(dk.text).p > DK_EINSEITIG_MAX;
        d.blaetter.forEach(key => {
            const b = DK_BLAETTER.find(x => x.key === key);
            const teile = key === "auswertung" && lang ? [["Auswertung 1", dkB_auswertung1], ["Auswertung 2", dkB_auswertung2]] : [[b.kurz, b.bau]];
            teile.forEach(([kurz, bau]) => blaetter.push({ nr: "0", kurz: `Diktat: ${kurz}`, name: b.name, bau: c => bau({ ...c, dk }), extra: { label: "Diktat", afs: "Symptomtraining: Diktat", reif: dk.reif } }));
        });
        phasen.push({ phase: "Symptomtraining", zeit: zeiten[3], inhalt: `${ws_esc(d.name)}: „${ws_esc(dk.text.t)}“ (${lt_woerter(dk.text.x).length} Wörter). Danach gemeinsam berichtigen, Fehlerwörter in die Lernbox.` });
        geuebt.push(`Diktat: ${dk.text.titel || dk.text.t}`);
    } else if (sy === "kartei"){
        const b = KT_BLAETTER.find(x => x.nr === sb) || KT_BLAETTER[0];
        const kt = kt_kontextFuer(code, "offen");
        blaetter.push({ nr: "0", kurz: `Kartei: ${b.kurz}`, name: b.name, bau: c => b.bau({ ...c, kt }), extra: { label: "Meine Fehlerwörter", afs: "Symptomtraining: Fehlerwörter-Kartei", reif: lt_klasse() >= 5 } });
        phasen.push({ phase: "Symptomtraining", zeit: zeiten[3], inhalt: `Eigene Fehlerwörter: „${ws_esc(b.name)}“ (${kt.eigene.length} Wörter aus der Lernbox).` });
        geuebt.push(`Meine Fehlerwörter: ${b.name}`);
    } else if (sy === "ws"){
        const b = WS_BLAETTER.find(x => x.nr === sb) || WS_BLAETTER[0];
        const woerter = ws_woerterLesen();
        blaetter.push({ nr: "0", kurz: `Worterarbeitung: ${b.kurz}`, name: b.name, bau: () => ({ seite: b.fn(woerter) }) });
        phasen.push({ phase: "Symptomtraining", zeit: zeiten[3], inhalt: `Worterarbeitung „${ws_esc(b.name)}“ mit ${woerter.map(w => ws_esc(w.silben.join("-"))).join(", ")}.` });
        geuebt.push(`Worterarbeitung: ${b.name}`);
    }
    phasen.push({ phase: "Abschluss", zeit: zeiten[4], inhalt: "Stunden-Rückblick, Stempel im Lernpass, kurzes Spiel (z. B. Reimwörter-Ping-Pong)" + (lt_an("std-eltern") ? ", Elternblatt mitgeben." : ".") });

    std_zeitenVerteilen(phasen, dauer);
    const info = { kind: code, phasen, geuebt, merksatz, dauer };
    const ergebnis = [];
    if (lt_an("std-plan")) ergebnis.push({ nr: "0", kurz: "Ablaufplan", name: "Ablaufplan (für dich)", bau: () => std_ablaufplan(info) });
    ergebnis.push(...blaetter);
    if (lt_an("std-rueck")) ergebnis.push({ nr: "0", kurz: "Rückblick", name: "Stunden-Rückblick", bau: () => std_rueckblick(info) });
    if (lt_an("std-eltern")){
        const foki = [f, sy.startsWith("rs:") ? sy.slice(3) : (sy === "ws" ? "worterarbeitung" : ""), "aufmerksamkeit"].filter(Boolean);
        ergebnis.push({ nr: "0", kurz: "Elternblatt", name: "Elternblatt", bau: () => eb_blatt(foki, code) });
    }
    return ergebnis.map((b, i) => ({ ...b, nr: String(i + 1) }));
}

function erstelleExtras(){}


/* ---------- Buchstabenerarbeitung: ein Buchstabe · Unterscheiden (b/p …) · gemischt ---------- */
const BS_WOERTER = [...new Set(("Affe Ameise Ampel Apfel Arm Ast Auge Auto Axt Bad Ball Banane Bank Bär Baum Bein Besen Bett Biene Birne Blatt Blume Boot Brot Brief Brille Buch Burg Bus Butter " +
    "Dach Dackel Dame Daumen Decke Delfin Dose Drache Dusche Ei Eimer Eis Eule Ente Esel Euro Fahne Fahrrad Feder Fee Fenster Feuer Fisch Flasche Fliege Frosch Fuchs Fuß " +
    "Gabel Gans Garten Geld Geige Giraffe Glas Glocke Gurke Haar Hahn Hand Hase Haus Hemd Herz Heft Hexe Himmel Hose Huhn Hund Hut Igel Insel Iglu " +
    "Jacke Joghurt Junge Juli Kaffee Kamel Kamm Kanne Katze Kerze Kind Kino Kiste Kissen Kleid Knopf Koffer Kopf Korb Krone Kuchen Kuh " +
    "Lama Lamm Lampe Laterne Leiter Licht Limo Löffel Löwe Luft Mama Mann Mantel Maus Meer Messer Milch Mond Mund Mütze Möwe Melone Nadel Nase Nest Netz Nudel Nuss " +
    "Ofen Ohr Oma Opa Orange Papa Paket Palme Pilz Pinsel Pirat Pizza Pony Puppe Quark Qualle Quelle Rabe Rad Rakete Regen Reh Ring Rock Rose Rucksack " +
    "Saft Salat Sand Sofa Sonne Seife Sessel Socke Sieb Salz Seil Schaf Schal Schere Schiff Schirm Schnee Schuh Schule Schwan Spiegel Spinne Sport Stern Stift Stuhl Sturm Stein Suppe " +
    "Tafel Tanne Tasche Tasse Taxi Teller Tiger Tisch Tomate Topf Tor Torte Traube Tür Turm Uhr Ufer Uhu Vase Vater Vogel Vulkan Waage Wagen Wal Wald Wand Wasser Wecker Wind Wolke Wolf Wurm Wurst " +
    "Zahn Zange Zaun Zebra Zelt Ziege Zitrone Zug Zwerg Zucker Zimmer Kran Helm Film Bohne Wein Tag Gras Kuss Fell Mehl Tal Hof Bagger Roller Tunnel Nixe Box Kiwi Kakao Kamera Zoo Knie Brei Heu Tau Frau Pferd Kalb Weg " +
    "Ärmel Äpfel Ähre Äste Öl Ölkanne Brötchen Würfel Bücher Schüssel Übung Tüte Hütte Mücke Rübe Kürbis Käse Säge Zähne Mädchen Flöte Kröte Möhre Eichel Teich Liebe Leute Kreuz Raupe Bauch Faust " +
    "Koch Loch Pfanne Pfeil Zopf Wiese Lied Dieb Ziel Papier Kiefer Baby Yoga Xylofon Feile Zeitung Beule Scheune Maulwurf Laub Nacht Becher Rauch " +
    "Puder Pudel Pause Paar Pass Pinguin Post Pommes Panda Pudding Bude Beere Birke Bart Banane Bier Beutel Gabel Gold Gurt Gans Geschenk Kuss Kasse Kegel Keks Kerze Kugel Kamin Deckel Daumen Dorf Dino Teppich Tante Tunnel Tomate Daten " +
    "Robbe Raupe Lippe Suppe Kappe Wippe Gabel Nebel Hobel Kabel Ruder Leder Feder Seide Seite Leiter Kinder Wolke Glocke Säge Waage Wagen Haken Laken Regen Kegel Nagel Vogel Feder Bote Note Hütte Puder").split(" "))];

const BS_GRAPHEME = ["sch", "ch", "ck", "ei", "eu", "äu", "au", "ie", "qu", "pf"];
const BS_ZIELE = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ä", "ö", "ü", "au", "ei", "eu", "ie", "sch", "ch", "pf", "qu", "sp", "st"];
const BS_PAARE = [
    { ziele: ["b", "p"], text: "b oder p (hören)" }, { ziele: ["d", "t"], text: "d oder t (hören)" }, { ziele: ["g", "k"], text: "g oder k (hören)" },
    { ziele: ["m", "n"], text: "m oder n (hören)" }, { ziele: ["f", "w"], text: "f oder w (hören)" }, { ziele: ["s", "z"], text: "s oder z (hören)" },
    { ziele: ["ei", "eu"], text: "ei oder eu (hören)" }, { ziele: ["ie", "ei"], text: "ie oder ei (hören/sehen)" }, { ziele: ["au", "eu"], text: "au oder eu (hören)" },
    { ziele: ["sch", "ch"], text: "sch oder ch (hören)" }, { ziele: ["e", "i"], text: "e oder i (hören)" }, { ziele: ["o", "u"], text: "o oder u (hören)" },
    { ziele: ["b", "d"], text: "b oder d (sehen – Spiegelung)" }, { ziele: ["p", "q"], text: "p oder q (sehen – Spiegelung)" }, { ziele: ["m", "w"], text: "m oder w (sehen)" },
];
// Optisch ähnliche Zeichen und ähnlich klingende Laute (für Ablenker)
const BS_OPTISCH = { a: "oed", b: "dpqh", c: "eo", d: "bpq", e: "ac", f: "tl", g: "qpy", h: "nbk", i: "lj", j: "iy", k: "hx", l: "it", m: "nw", n: "muh", o: "ac", p: "qbd", q: "pg", r: "nv", s: "zc", t: "fl", u: "nv", v: "wu", w: "vm", x: "ky", y: "vx", z: "s", ä: "aö", ö: "oä", ü: "uö" };
const BS_OPTISCH_G = { au: ["ua", "eu", "an"], ei: ["ie", "eu", "ai"], eu: ["ei", "au", "ue"], ie: ["ei", "ai", "il"], sch: ["sh", "ch", "sc"], ch: ["ck", "sch", "cn"], pf: ["fp", "ph", "pt"], qu: ["gu", "qn", "ou"], sp: ["st", "ps", "sq"], st: ["sp", "ts", "sf"] };
const BS_KLANG = { b: ["p", "d"], p: ["b", "t"], d: ["t", "b"], t: ["d", "k"], g: ["k", "ch"], k: ["g", "t"], m: ["n", "l"], n: ["m", "l"], f: ["w", "v"], w: ["f", "v"], v: ["f", "w"], s: ["z", "sch"], z: ["s", "tz"], sch: ["s", "ch"], ch: ["sch", "k"],
    a: ["o", "e"], e: ["i", "ä"], i: ["e", "ie"], o: ["u", "a"], u: ["o", "ü"], ä: ["e", "a"], ö: ["ü", "o"], ü: ["ö", "u"], ei: ["eu", "ie"], eu: ["ei", "au"], au: ["o", "eu"], ie: ["i", "ei"],
    l: ["r", "n"], r: ["l", "n"], h: ["f", "k"], j: ["g", "ch"], x: ["ks", "k"], y: ["j", "i"], q: ["k", "g"], c: ["k", "z"], pf: ["f", "p"], qu: ["k", "kw"], sp: ["st", "sch"], st: ["sp", "scht"] };
const BS_VERHAERTET = ["b", "d", "g", "p", "t", "k"];
const BS_KONSONANT = /^[bcdfghjklmnpqrstvwxyzß]|^(sch|ch|ck|pf|qu|sp|st)$/;

function bs_gross(z){ return z ? z[0].toUpperCase() + z.slice(1) : z; }
function bs_laute(wort){
    const w = wort.toLowerCase(), teile = [];
    let i = 0;
    while (i < w.length){
        if (i === 0 && /^s[pt]/.test(w)){ teile.push(w.slice(0, 2)); i += 2; continue; }
        const g = BS_GRAPHEME.find(x => w.startsWith(x, i));
        if (g){ teile.push(g); i += g.length; } else { teile.push(w[i]); i++; }
    }
    return teile;
}
// Ist der Laut an dieser Stelle eindeutig hörbar? (b/d/g am Ende oder vor Konsonant klingen wie p/t/k)
function bs_hoerbar(laute, k){
    if (!BS_VERHAERTET.includes(laute[k])) return true;
    const naechster = laute[k + 1];
    if (!naechster) return false;                                         // Wortende: Hund klingt wie Hunt
    if (k > 0 && BS_KONSONANT.test(naechster) && !["l", "r"].includes(naechster)) return false;   // Herbst, Hemd
    return true;
}

function bs_modus(){ return lt_wert("bs-modus") || "einzeln"; }
function bs_ziele(){
    const modus = bs_modus();
    if (modus === "paar") return (BS_PAARE[parseInt(lt_wert("bs-paar"), 10) || 0] || BS_PAARE[0]).ziele;
    if (modus === "gemischt"){
        const auswahl = [...document.querySelectorAll(".bs-mix:checked")].map(c => c.value);
        return auswahl.length ? auswahl : ["m", "a", "l", "o"];
    }
    return [lt_wert("bs-ziel") || "m"];
}
function bs_pool(){
    const g = liesGlobal();
    const eigene = g.thema === "eigen" ? (lt_wert("g-eigene-woerter") || "").split(",").map(w => w.trim()).filter(Boolean) : [];
    return [...new Set([...eigene, ...BS_WOERTER])].filter(w => w.length <= (g.klasse <= 1 ? 7 : 10));
}
function bs_kontext(){
    const modus = bs_modus(), ziele = bs_ziele(), pool = bs_pool();
    const set = new Set(ziele);
    const info = pool.map(w => {
        const roh = bs_laute(w);
        const l = roh.filter((x, k) => x !== roh[k - 1]);   // Doppelkonsonanten als ein Laut
        const stellen = l.map((x, k) => set.has(x) ? k : -1).filter(k => k >= 0);
        const hoerbar = stellen.filter(k => bs_hoerbar(l, k));
        return { w, l, stellen, hoerbar, n: l.length, anfang: set.has(l[0]) ? l[0] : null, ende: l.length > 1 && set.has(l[l.length - 1]) ? l[l.length - 1] : null };
    });
    const unterscheiden = modus !== "einzeln";
    return {
        modus, ziele, set, unterscheiden, ziel: ziele[0], Z: bs_gross(ziele[0]), info,
        titel: modus === "einzeln" ? `${bs_gross(ziele[0])} ${ziele[0]}` : ziele.join(" · "),
        anlaut: info.filter(x => x.anfang && (!unterscheiden || bs_hoerbar(x.l, 0))),
        endlaut: info.filter(x => x.ende && !BS_VERHAERTET.includes(x.ende)),
        enthalten: info.filter(x => x.stellen.length),
        hoerbar: info.filter(x => x.hoerbar.length),
        andere: info.filter(x => !x.stellen.length),
    };
}
// Auswahl für eine Lücke: einzeln → ähnlich klingende Laute · Paar → genau das Paar · gemischt → aus der Auswahl
function bs_auswahl(richtig, bs){
    let opt;
    if (bs.modus === "paar") opt = [...bs.ziele];
    else if (bs.modus === "gemischt") opt = [richtig, ...mische(bs.ziele.filter(z => z !== richtig)).slice(0, 2)];
    else opt = [richtig, ...(BS_KLANG[richtig] || []), ...((BS_OPTISCH[richtig] || "").split(""))];
    opt = [...new Set(opt.filter(Boolean))].slice(0, 3);
    if (!opt.includes(richtig)) opt[0] = richtig;
    if (opt.length < 2) opt.push(...(BS_KLANG[richtig] || ["a"]).slice(0, 1));
    return mische(opt);
}
function bs_aehnliche(bs){
    const a = new Set(bs.ziele.length > 1 ? bs.ziele : []);
    bs.ziele.forEach(z => (z.length > 1 ? (BS_OPTISCH_G[z] || []) : (BS_OPTISCH[z] || "").split("")).forEach(x => a.add(x)));
    return [...a];
}
// Wort mit dem Laut hervorgehoben (fett) oder für die Lösung eingekreist
function bs_wortMarkiert(w, ziele, art){
    let html = "", i = 0, zahl = 0;
    bs_laute(w).forEach(l => {
        const teil = w.slice(i, i + l.length);
        i += l.length;
        if (!ziele.includes(l)){ html += ws_esc(teil); return; }
        zahl++;
        html += art === "fett" ? `<b class="bs-mark">${ws_esc(teil)}</b>` : LM(ws_esc(teil));
    });
    return { html, zahl };
}
// Gleich viele Wörter je Buchstabe (abwechselnd aus jeder Gruppe)
function bs_ausgeglichen(liste, gruppeVon){
    const gruppen = {};
    mische(liste).forEach(x => { const g = gruppeVon(x); (gruppen[g] = gruppen[g] || []).push(x); });
    const toepfe = Object.values(gruppen), ergebnis = [];
    const max = Math.max(0, ...toepfe.map(t => t.length));
    const grenze = toepfe.length > 1 ? Math.min(max, Math.max(4, Math.min(...toepfe.map(t => t.length)) * 2)) : max;
    for (let i = 0; i < grenze; i++) toepfe.forEach(t => { if (t[i]) ergebnis.push(t[i]); });
    return ergebnis;
}
function bs_lineatur(text){
    return `<div class="ws-lineatur bs-zeile"><div class="ws-l-o"></div><div class="ws-l-m"></div><div class="ws-l-g"></div>${text ? `<div class="ws-spur">${ws_esc(text)}</div>` : ""}</div>`;
}
function bs_zielChip(z){ return `<span class="bs-zielchip">${ws_esc(z)}</span>`; }

/* --- die Blätter --- */
function bsB_kennenlernen(ctx){
    const bs = ctx.bs;
    const zeigen = bs.ziele.slice(0, 4);
    const beispiele = mische(bs.anlaut.length >= 3 ? bs.anlaut : bs.enthalten).slice(0, bs.ziele.length > 1 ? 8 : 6);
    const spur = zeigen.map(z => `${bs_gross(z)} ${z}`).join("  ");
    const zeile = i => i % 2 === 0 ? bs_lineatur((spur + "   ").repeat(6).trim()) : bs_lineatur("");
    const groesse = [150, 120, 86, 70][zeigen.length - 1];
    return { titel: bs.modus === "einzeln" ? `Mein Buchstabe ${bs.titel}` : `Meine Buchstaben: ${bs.titel}`, zeile, max: 14, html: `
        <div class="bs-vorlage" style="font-size:${groesse}px; gap:${zeigen.length > 2 ? 34 : 60}px;">${zeigen.map(z => `<span>${ws_esc(bs_gross(z))}${ws_esc(z)}</span>`).join("")}</div>
        ${ws_aufgabe(1, `Fahre die Buchstaben mit dem Finger nach und sprich dabei den Laut.${bs.ziele.length > 1 ? " Achte auf den Unterschied!" : ""}`)}
        <div class="bs-beispiele">${beispiele.map(x => `<span>${bs_wortMarkiert(x.w, bs.ziele, "fett").html}</span>`).join("")}</div>
        ${ws_aufgabe(2, "Spure nach und sprich mit. Schreibe in der leeren Zeile darunter selbst.")}
        <div class="ws-lineatur-liste fs-fuell"></div>` };
}

function bsB_detektiv(ctx){
    const bs = ctx.bs;
    const st = fs_stufe(ctx);
    const aehnlich = bs_aehnliche(bs);
    const zeile = i => {
        const ziel = bs.ziele[i % bs.ziele.length];
        const ablenker = aehnlich.filter(x => x !== ziel);
        const reihe = [...Array(ziel.length > 1 ? 9 : 12)].map(() => {
            const z = Math.random() < 0.3 ? ziel : zufallsElement(ablenker.length ? ablenker : ["a", "o"]);
            return { z, gross: st > 0 && Math.random() < 0.35 };
        });
        const treffer = reihe.filter(x => x.z === ziel).length;
        return fs_zaehlreihe(i, `${bs_zielChip(ziel)}<span class="bs-reihe">${reihe.map(x => {
            const t = `<span class="fs-buchstabe bs-zeichen">${ws_esc(x.gross ? bs_gross(x.z) : x.z)}</span>`;
            return x.z === ziel ? LM(t) : t;
        }).join("")}</span>`, treffer);
    };
    return { titel: "Buchstaben-Detektiv", zeile, html: `
        ${ws_aufgabe(1, `Links steht, welchen Buchstaben du in der Reihe suchst. Kreise ihn jedes Mal ein${st > 0 ? " – auch als Großbuchstaben" : ""}. Zähle und schreibe die Anzahl ins Kästchen.${bs.ziele.length > 1 ? " Vorsicht: Die Buchstaben sehen sich ähnlich!" : ""}`)}
        <div class="fs-reihen fs-fuell"></div>` };
}

function bsB_imWort(ctx){
    const bs = ctx.bs;
    const liste = mische([...mische(bs.enthalten), ...mische(bs.andere).slice(0, Math.ceil(bs.enthalten.length / 6))]);
    const zeile = i => {
        const x = liste[i % liste.length];
        if (!x || i >= Math.max(liste.length, 24)) return "";
        // bei mehreren Buchstaben: je Karte einer davon (bevorzugt einer, der im Wort vorkommt)
        const imWort = bs.ziele.filter(z => x.l.includes(z));
        const ziel = bs.ziele.length === 1 ? bs.ziel : (imWort.length && Math.random() < 0.92 ? zufallsElement(imWort) : zufallsElement(bs.ziele));
        const m = bs_wortMarkiert(x.w, [ziel]);
        return `<div class="fs-karte" style="justify-content:space-between; gap:10px;">${bs.ziele.length > 1 ? bs_zielChip(ziel) : ""}<span class="bs-wort" style="flex:1;">${m.html}</span><span class="fs-box">${L(m.zahl)}</span></div>`;
    };
    return { titel: bs.ziele.length > 1 ? "Buchstaben im Wort finden" : `Wo steckt das ${ws_esc(bs.ziel)}?`, zeile, schritt: 2, html: `
        ${ws_aufgabe(1, `Lies jedes Wort. Kreise ${bs.ziele.length > 1 ? "den Buchstaben, der links im Kreis steht," : `jedes <b>${ws_esc(bs.ziel)}</b>`} im Wort ein – auch groß geschrieben. Wie oft kommt er vor? Schreibe die Zahl ins Kästchen – manchmal ist es 0!`)}
        <div class="fs-zweispaltig fs-fuell"></div>` };
}

// Karte mit Lücke an Laut-Stelle k (Optionen je nach Modus)
function bs_lueckenKarte(x, k, bs){
    const roh = bs_laute(x.w);
    // Stelle k bezieht sich auf die Laute ohne Doppelung → passende Stelle im Wort suchen
    let zaehler = -1, pos = 0, start = 0, laenge = 0;
    for (let j = 0; j < roh.length; j++){
        if (roh[j] !== roh[j - 1]) zaehler++;
        if (zaehler === k && roh[j] === x.l[k]){ start = pos; laenge = roh[j].length; while (roh[j + 1] === roh[j]){ j++; laenge += roh[j].length; } break; }
        pos += roh[j].length;
    }
    const fehlt = x.w.slice(start, start + laenge);
    const laut = x.l[k];
    const grossAnfang = start === 0 && /[A-ZÄÖÜ]/.test(x.w[0]);
    const doppelt = laenge > laut.length;
    const opt = bs_auswahl(laut, bs).map(o => { let v = doppelt ? o + o : o; return grossAnfang ? bs_gross(v) : v; });
    return `<div class="fs-karte" style="justify-content:space-between;"><span class="rs-wort bs-wort">${ws_esc(x.w.slice(0, start))}<span class="rs-luecke">${L(ws_esc(fehlt))}</span>${ws_esc(x.w.slice(start + laenge))}</span>${rs_optionen({ optionen: opt })}</div>`;
}

function bsB_anlaut(ctx){
    const bs = ctx.bs;
    let liste;
    if (bs.unterscheiden) liste = bs_ausgeglichen(bs.anlaut, x => x.anfang);
    else {
        const partner = BS_KLANG[bs.ziel] || [];
        const kontrast = bs.info.filter(x => partner.includes(x.l[0]));
        liste = mische([...mische(bs.anlaut), ...mische(kontrast).slice(0, Math.ceil(bs.anlaut.length * 0.6))]);
    }
    const zeile = i => {
        const x = liste[i % liste.length];
        if (!x || i >= Math.max(liste.length, 22)) return "";
        return bs_lueckenKarte(x, 0, bs);
    };
    return { titel: "Wie fängt das Wort an?", zeile, schritt: 2, html: `
        ${bs.modus === "paar" ? `<div class="fs-ziel">Hör genau hin: ${bs.ziele.map(z => `<b style="font-size:32px; color:#1D5FA8;">${ws_esc(bs_gross(z))} ${ws_esc(z)}</b>`).join(" oder ")}?</div>` : ""}
        ${ws_aufgabe(1, "Sprich das Wort langsam und deutlich. Welchen Laut hörst du ganz am Anfang? Kreise ihn ein und schreibe ihn in die Lücke.")}
        <div class="fs-zweispaltig fs-fuell"></div>` };
}

function bsB_inlaut(ctx){
    const bs = ctx.bs;
    // Lücke mitten im Wort – nur an Stellen, an denen man den Laut eindeutig hört
    const mitte = x => x.hoerbar.filter(k => k > 0 && k < x.n - 1);
    const liste = bs_ausgeglichen(bs.hoerbar.filter(x => mitte(x).length), x => x.l[mitte(x)[0]]);
    const zeile = i => {
        const x = liste[i % liste.length];
        if (!x || i >= Math.max(liste.length, 22)) return "";
        const k = zufallsElement(mitte(x));
        return bs_lueckenKarte(x, k, bs);
    };
    return { titel: "Welcher Buchstabe fehlt?", zeile, schritt: 2, html: `
        ${bs.modus === "paar" ? `<div class="fs-ziel">${bs.ziele.map(z => `<b style="font-size:32px; color:#1D5FA8;">${ws_esc(z)}</b>`).join(" oder ")}? Sprich das Wort in Silben!</div>` : ""}
        ${ws_aufgabe(1, "Sprich das Wort langsam in Silben. Welcher Buchstabe fehlt in der Mitte? Kreise ihn ein und schreibe ihn in die Lücke.")}
        <div class="fs-zweispaltig fs-fuell"></div>` };
}

function bsB_endlaut(ctx){
    const bs = ctx.bs;
    let liste = bs_ausgeglichen(bs.endlaut, x => x.ende);
    if (bs.modus === "einzeln"){
        const partner = BS_KLANG[bs.ziel] || [];
        const kontrast = bs.info.filter(x => partner.includes(x.l[x.l.length - 1]) && !BS_VERHAERTET.includes(x.l[x.l.length - 1]));
        liste = mische([...liste, ...mische(kontrast).slice(0, Math.ceil(liste.length * 0.6))]);
    }
    const zeile = i => {
        const x = liste[i % liste.length];
        if (!x || i >= Math.max(liste.length, 22)) return "";
        return bs_lueckenKarte(x, x.l.length - 1, bs);
    };
    return { titel: "Wie hört das Wort auf?", zeile, schritt: 2, html: `
        ${ws_aufgabe(1, "Sprich das Wort langsam bis zum Ende. Welchen Laut hörst du zum Schluss? Kreise ihn ein und schreibe ihn in die Lücke.")}
        <div class="fs-zweispaltig fs-fuell"></div>` };
}

function bsB_position(ctx){
    const bs = ctx.bs;
    const liste = mische(bs.enthalten);
    const zeile = i => {
        const x = liste[i % liste.length];
        if (!x || i >= Math.max(liste.length, 20)) return "";
        const anfang = x.stellen.includes(0), ende = x.stellen.includes(x.n - 1) && x.n > 1, mitte = x.stellen.some(k => k > 0 && k < x.n - 1);
        return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div><span class="fs-satz">${ws_esc(x.w)}</span><span class="fs-kreuz"><span>${fs_kreuzBox(anfang)} Anfang</span><span>${fs_kreuzBox(mitte)} Mitte</span><span>${fs_kreuzBox(ende)} Ende</span></span></div>`;
    };
    return { titel: `Wo hörst du das ${ws_esc(bs.Z)}?`, zeile, html: `
        <div class="fs-ziel">Wir hören auf den Laut <b style="font-size:36px; color:#1D5FA8;">${ws_esc(bs.Z)} ${ws_esc(bs.ziel)}</b></div>
        ${ws_aufgabe(1, `Sprich jedes Wort langsam (oder lass es dir vorlesen). Hörst du ${ws_esc(bs.ziel)} am Anfang, in der Mitte oder am Ende? Kreuze an – manchmal stimmt mehr als eins.`)}
        <div class="fs-reihen fs-fuell"></div>` };
}

// Hören und sortieren: welcher der Buchstaben steckt im Wort? (Paar und gemischt)
function bsB_hoeren(ctx){
    const bs = ctx.bs;
    const spalten = bs.ziele.slice(0, 4);
    const eindeutig = bs.hoerbar.filter(x => spalten.filter(z => x.hoerbar.some(k => x.l[k] === z)).length === 1);
    const liste = bs_ausgeglichen(eindeutig, x => spalten.find(z => x.hoerbar.some(k => x.l[k] === z)));
    const zeile = i => {
        const x = liste[i % liste.length];
        if (!x || i >= Math.max(liste.length, 20)) return "";
        const richtig = spalten.find(z => x.hoerbar.some(k => x.l[k] === z));
        return `<div class="fs-karte"><div class="fs-ansage"><b>Lehrkraft liest vor</b>${ws_esc(x.w)}</div><span class="fs-kreuz bs-hoerkreuz">${spalten.map(z => `<span>${fs_kreuzBox(z === richtig)} <b>${ws_esc(z)}</b></span>`).join("")}</span><span class="rs-linie" style="min-width:150px;">${L(ws_esc(x.w))}</span></div>`;
    };
    return { titel: `Hören: ${spalten.join(" oder ")}?`, zeile, html: `
        ${ws_aufgabe(1, `Hör gut zu: Die Lehrkraft liest ein Wort vor (das Wort links abdecken!). Welchen Laut hörst du: ${spalten.map(z => `<b>${ws_esc(z)}</b>`).join(" oder ")}? Kreuze an. Schreibe das Wort danach auf die Linie.`)}
        <div class="fs-reihen fs-fuell"></div>` };
}

function bsB_sortieren(ctx){
    const bs = ctx.bs;
    const spalten = bs.ziele.slice(0, 4);
    const eindeutig = bs.hoerbar.filter(x => spalten.filter(z => x.hoerbar.some(k => x.l[k] === z)).length === 1);
    const proSpalte = Math.max(4, Math.floor(18 / spalten.length));
    const passend = spalten.flatMap(z => mische(eindeutig.filter(x => x.hoerbar.some(k => x.l[k] === z))).slice(0, proSpalte));
    const gruppen = spalten.map(z => passend.filter(x => x.hoerbar.some(k => x.l[k] === z)).map(x => x.w));
    const zeile = i => `<tr>${gruppen.map(g => `<td>${g[i] ? L(ws_esc(g[i])) : ""}</td>`).join("")}</tr>`;
    return { titel: "Wörter sortieren", zeile, max: 30, html: `
        ${ws_aufgabe(1, "Lies jedes Wort deutlich. Welchen Buchstaben hörst du darin? Schreibe das Wort in die richtige Spalte und streiche es oben durch.")}
        <div class="rs-wortbank">${mische(passend).map(x => `<span>${ws_esc(x.w)}</span>`).join("")}</div>
        <table class="rs-tabelle"><thead><tr>${spalten.map(z => `<th style="font-size:22px; text-align:center;">${ws_esc(bs_gross(z))} ${ws_esc(z)}</th>`).join("")}</tr></thead><tbody class="fs-fuell"></tbody></table>` };
}

function bsB_merken(ctx){
    const bs = ctx.bs;
    const laenge = [3, 4, 5][fs_stufe(ctx)];
    const vorrat = [...new Set([...bs.ziele, ...bs_aehnliche(bs)])];
    const zeile = () => {
        const reihe = [zufallsElement(bs.ziele)];
        while (reihe.length < laenge) reihe.push(zufallsElement(vorrat.length > 2 ? vorrat : [...vorrat, "a", "o", "e"]));
        const r = mische(reihe);
        return `<div class="fs-karte"><div class="fs-merk bs-merk">${r.map(z => `<span>${ws_esc(z)}</span>`).join("")}</div><div class="fs-abdecken">abdecken →</div><div class="fs-boxen">${r.map(z => `<span class="fs-box">${L(ws_esc(z))}</span>`).join("")}</div></div>`;
    };
    return { titel: "Buchstaben merken", zeile, html: `
        ${ws_aufgabe(1, "Schau dir die Buchstaben einer Reihe genau an und sprich sie leise. Decke sie ab und schreibe sie aus dem Kopf in der gleichen Reihenfolge in die Kästchen.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function bsB_grossKlein(ctx){
    const bs = ctx.bs;
    const andere = bs_aehnliche(bs).filter(x => /^[a-zäöü]+$/.test(x) && !bs.ziele.includes(x));
    const zeile = i => {
        const reihe = mische([...mische(bs.ziele).slice(0, 3), ...mische(andere).slice(0, 6)]).slice(0, 6);
        return `<div class="fs-karte"><div class="fs-reihe-nr">${i + 1}</div><div class="fs-chips">${reihe.map(z => `<div class="fs-chip"><span class="fs-chiptext bs-gk">${ws_esc(bs_gross(z))}</span><span class="fs-nrbox" style="width:${z.length > 1 ? 60 : 40}px;">${L(ws_esc(z))}</span></div>`).join("")}</div></div>`;
    };
    return { titel: "Groß und klein", zeile, html: `
        <div class="fs-ziel">${bs.ziele.slice(0, 4).map(z => `<b style="font-size:30px; color:#1D5FA8;">${ws_esc(bs_gross(z))}</b> → <b style="font-size:30px; color:#1D5FA8;">${ws_esc(z)}</b>`).join(" &nbsp;·&nbsp; ")}</div>
        ${ws_aufgabe(1, "Schreibe zu jedem großen Buchstaben den kleinen Buchstaben ins Kästchen darunter.")}
        <div class="fs-reihen fs-fuell"></div>` };
}

function bsB_silben(ctx){
    const bs = ctx.bs;
    const VOKALE = ["a", "e", "i", "o", "u", "au", "ei"];
    const KONS = ["m", "l", "n", "r", "s", "t", "f", "w", "h", "b", "d"];
    const istVokal = z => /^(a|e|i|o|u|ä|ö|ü|au|ei|eu|ie)$/.test(z);
    const silben = [];
    bs.ziele.forEach(z => {
        if (istVokal(z)) KONS.forEach(k => silben.push(bs_gross(k) + z));
        else if (!["c", "q", "x", "y", "sp", "st"].includes(z)) VOKALE.forEach(v => silben.push(bs_gross(z) + v));
    });
    if (!silben.length) ["Ma", "Mo", "La", "Lo"].forEach(x => silben.push(x));
    const paarweise = bs.modus === "paar";
    const zeile = i => {
        let reihe;
        if (paarweise){
            // Ba – Pa, Bo – Po …: dieselbe Silbe mit beiden Buchstaben nebeneinander
            reihe = [];
            for (let k = 0; k < 3; k++){
                const v = zufallsElement(VOKALE);
                mische(bs.ziele).forEach(z => reihe.push(istVokal(z) ? bs_gross(zufallsElement(KONS)) + z : bs_gross(z) + v));
            }
        } else reihe = [...Array(6)].map(() => zufallsElement(silben));
        return `<div class="fs-karte bs-silbenreihe"><div class="fs-reihe-nr">${i + 1}</div><div class="bs-silben">${reihe.map((s, k) => `<span class="${k % 2 ? "ws-t2" : "ws-t1"}">${ws_esc(s)}</span>`).join("")}</div><span style="display:flex; gap:6px; flex:none;">${'<span class="fs-kaestchen-klein" style="width:24px; height:24px;"></span>'.repeat(3)}</span></div>`;
    };
    return { titel: "Silben lesen", zeile, html: `
        ${ws_aufgabe(1, `Lies jede Reihe laut und deutlich – Laute zusammenziehen: M + a = <b>Ma</b>.${paarweise ? " Achte genau auf den Unterschied!" : ""} Für jedes Mal Lesen ein Kästchen ankreuzen.`)}
        <div class="fs-reihen fs-fuell"></div>` };
}

const BS_BLAETTER = [
    { kurz: "Kennenlernen", name: "Buchstaben kennenlernen (nachspuren & schreiben)", bau: bsB_kennenlernen },
    { kurz: "Detektiv", name: "Buchstaben-Detektiv", bau: bsB_detektiv },
    { kurz: "Im Wort", name: "Buchstaben im Wort finden", bau: bsB_imWort, braucht: bs => bs.enthalten.length >= 4 },
    { kurz: "Anlaut", name: "Wie fängt das Wort an?", bau: bsB_anlaut, braucht: bs => bs.anlaut.length >= 4 },
    { kurz: "In der Mitte", name: "Welcher Buchstabe fehlt?", bau: bsB_inlaut, braucht: bs => bs.hoerbar.filter(x => x.hoerbar.some(k => k > 0 && k < x.n - 1)).length >= 4 },
    { kurz: "Endlaut", name: "Wie hört das Wort auf?", bau: bsB_endlaut, braucht: bs => bs.endlaut.length >= 4 },
    { kurz: "Lautposition", name: "Anfang, Mitte oder Ende?", bau: bsB_position, braucht: bs => bs.modus === "einzeln" && bs.enthalten.length >= 6 },
    { kurz: "Hören", name: "Hören und ankreuzen", bau: bsB_hoeren, braucht: bs => bs.ziele.length >= 2 && bs.ziele.length <= 4 && bs.hoerbar.length >= 6 },
    { kurz: "Sortieren", name: "Wörter sortieren", bau: bsB_sortieren, braucht: bs => bs.ziele.length >= 2 && bs.ziele.length <= 4 && bs.hoerbar.length >= 6 },
    { kurz: "Merken", name: "Buchstaben merken", bau: bsB_merken },
    { kurz: "Groß/klein", name: "Groß und klein", bau: bsB_grossKlein, braucht: bs => bs.ziele.some(z => /^[a-zäöü]/.test(z)) },
    { kurz: "Silben", name: "Silben lesen", bau: bsB_silben, braucht: bs => bs.ziele.some(z => !["c", "q", "x", "y", "qu", "sp", "st"].includes(z)) },
];
function bs_dynamisch(ctx){
    return BS_BLAETTER.filter(b => !b.braucht || b.braucht(ctx.bs)).map((b, i) => ({ ...b, nr: String(i + 1) }));
}
function bs_modusWechsel(){
    const m = bs_modus();
    ["einzeln", "paar", "gemischt"].forEach(x => { const el = document.getElementById("bs-feld-" + x); if (el) el.style.display = x === m ? "" : "none"; });
}
function bs_mixSetzen(liste){ document.querySelectorAll(".bs-mix").forEach(c => c.checked = liste === "keine" ? false : liste.includes(c.value)); }
function bs_speicherName(){
    const m = bs_modus(), z = bs_ziele();
    if (m === "paar") return `Buchstaben unterscheiden ${z.join("-")}`;
    if (m === "gemischt") return `Buchstaben gemischt (${z.join(", ")})`;
    return `Buchstabe ${bs_gross(z[0])} ${z[0]}`;
}


/* ---------- Lesetexte: Klasse 1–8, je Stufe zwei Texte (eigene Texte) ----------
   k = Klasse · s = l/m/s (leicht/mittel/schwer) · t = Titel · x = Text
   mc = Ankreuzfragen [Frage, richtig, falsch, falsch] · rf = [Aussage, 1 = richtig / 0 = falsch] · of = offene Fragen [Frage, Musterantwort] */
const LT_TEXTE = [
{ k: 1, s: "l", t: "Lilo malt", x: `Lilo ist im Garten. Mama ist auch da. Lilo malt eine Rose. Die Rose ist rot. Mama lobt Lilo. Lilo lacht.`,
  mc: [["Wo ist Lilo?", "im Garten", "im Bad", "in der Schule"], ["Was malt Lilo?", "eine Rose", "ein Auto", "eine Maus"], ["Welche Farbe hat die Rose?", "rot", "blau", "gelb"]],
  rf: [["Mama ist auch da.", 1], ["Lilo weint.", 0], ["Die Rose ist blau.", 0]],
  of: [["Wer lobt Lilo?", "Mama lobt Lilo."], ["Was macht Lilo am Ende?", "Lilo lacht."]] },
{ k: 1, s: "l", t: "Tomo", x: `Tomo ist ein Hund. Tomo ist lieb. Er rennt im Wald. Da liegt ein Ast. Tomo holt den Ast. Er legt ihn zu Opa.`,
  mc: [["Wer ist Tomo?", "ein Hund", "ein Kater", "ein Junge"], ["Wo rennt Tomo?", "im Wald", "am See", "im Haus"], ["Was holt Tomo?", "einen Ast", "einen Ball", "eine Wurst"]],
  rf: [["Tomo ist lieb.", 1], ["Tomo legt den Ast zu Oma.", 0], ["Tomo rennt im Wald.", 1]],
  of: [["Was liegt im Wald?", "Ein Ast liegt im Wald."], ["Zu wem legt Tomo den Ast?", "Zu Opa."]] },
{ k: 1, s: "m", t: "Im Schnee", x: `Heute liegt Schnee. Nele und Timo laufen nach draußen. Sie bauen einen Schneemann. Er bekommt eine Nase aus einer Möhre. Timo holt noch einen alten Hut. Jetzt ist der Schneemann fertig. Nele und Timo sind stolz.`,
  mc: [["Was liegt heute draußen?", "Schnee", "Laub", "Sand"], ["Woraus ist die Nase?", "aus einer Möhre", "aus einem Apfel", "aus einem Stein"], ["Wer holt den Hut?", "Timo", "Nele", "Mama"]],
  rf: [["Nele und Timo bauen einen Schneemann.", 1], ["Der Hut ist neu.", 0], ["Am Ende sind die Kinder traurig.", 0], ["Der Schneemann wird fertig.", 1]],
  of: [["Was bauen Nele und Timo?", "Sie bauen einen Schneemann."], ["Wie fühlen sich die Kinder am Ende?", "Sie sind stolz."]] },
{ k: 1, s: "m", t: "Die kleine Maus", x: `Eine kleine Maus wohnt unter dem Sofa. In der Nacht kommt sie heraus. Sie sucht Käse und Brot. Da sieht sie die Katze! Schnell rennt die Maus zurück. Unter dem Sofa ist sie sicher.`,
  mc: [["Wo wohnt die Maus?", "unter dem Sofa", "im Keller", "im Garten"], ["Wann kommt die Maus heraus?", "in der Nacht", "am Morgen", "am Mittag"], ["Wen sieht die Maus?", "die Katze", "den Hund", "das Kind"]],
  rf: [["Die Maus sucht Käse und Brot.", 1], ["Die Maus ist groß.", 0], ["Unter dem Sofa ist die Maus sicher.", 1], ["Die Maus spielt mit der Katze.", 0]],
  of: [["Was sucht die Maus?", "Käse und Brot."], ["Warum rennt die Maus zurück?", "Weil sie die Katze sieht."]] },
{ k: 1, s: "s", t: "Am See", x: `Am Sonntag fährt Familie Berger an den See. Papa packt eine Decke und einen Ball ein. Mama nimmt Brote und Saft mit. Am See ist es warm. Die Kinder baden im Wasser. Dann spielen alle zusammen Ball. Am Abend sind alle müde, aber froh.`,
  mc: [["Wann fährt die Familie an den See?", "am Sonntag", "am Montag", "am Freitag"], ["Was packt Papa ein?", "eine Decke und einen Ball", "Brote und Saft", "ein Boot"], ["Wie ist das Wetter am See?", "warm", "kalt", "es regnet"]],
  rf: [["Mama nimmt Brote und Saft mit.", 1], ["Die Kinder baden im Wasser.", 1], ["Am Abend sind alle wach und munter.", 0], ["Die Familie fährt in den Wald.", 0]],
  of: [["Was machen die Kinder am See?", "Sie baden und spielen Ball."], ["Wie sind alle am Abend?", "Müde, aber froh."]] },
{ k: 1, s: "s", t: "Ein neuer Freund", x: `Lena ist neu in der Klasse. Sie kennt noch niemanden. In der Pause steht sie allein am Zaun. Da kommt Emil zu ihr. Er fragt: „Willst du mit uns Fangen spielen?“ Lena nickt und rennt mit. Jetzt hat sie einen Freund.`,
  mc: [["Wer ist neu in der Klasse?", "Lena", "Emil", "Mia"], ["Wo steht Lena in der Pause?", "am Zaun", "an der Tafel", "am Tor"], ["Was wollen die Kinder spielen?", "Fangen", "Fußball", "Verstecken"]],
  rf: [["Lena kennt am Anfang alle Kinder.", 0], ["Emil fragt Lena.", 1], ["Lena rennt mit.", 1], ["Lena bleibt allein.", 0]],
  of: [["Was fragt Emil?", "Ob Lena mit Fangen spielen will."], ["Was hat Lena am Ende?", "Einen Freund."]] },

{ k: 2, s: "l", t: "Der Kürbis", x: `Im Herbst wächst im Garten ein großer Kürbis. Er ist orange und rund. Ole und Opa ernten ihn. Der Kürbis ist sehr schwer. Zusammen tragen sie ihn ins Haus. Daraus kochen sie eine leckere Suppe.`,
  mc: [["Wann wächst der Kürbis?", "im Herbst", "im Winter", "im Frühling"], ["Wie sieht der Kürbis aus?", "orange und rund", "grün und lang", "gelb und klein"], ["Was kochen Ole und Opa?", "eine Suppe", "einen Kuchen", "Nudeln"]],
  rf: [["Der Kürbis ist leicht.", 0], ["Ole und Opa tragen den Kürbis zusammen.", 1], ["Der Kürbis wächst im Wald.", 0], ["Die Suppe ist lecker.", 1]],
  of: [["Wer erntet den Kürbis?", "Ole und Opa."], ["Warum tragen sie den Kürbis zusammen?", "Weil er sehr schwer ist."]] },
{ k: 2, s: "l", t: "Paulas Fahrrad", x: `Paula hat ein neues Fahrrad. Es ist grün und hat eine Klingel. Am Anfang wackelt Paula noch. Papa hält sie am Sattel fest. Dann lässt er los. Paula fährt ganz allein! Sie klingelt vor Freude.`,
  mc: [["Welche Farbe hat das Fahrrad?", "grün", "rot", "blau"], ["Wer hält Paula fest?", "Papa", "Mama", "Oma"], ["Warum klingelt Paula?", "vor Freude", "weil ein Auto kommt", "weil sie Angst hat"]],
  rf: [["Das Fahrrad ist alt.", 0], ["Am Anfang wackelt Paula.", 1], ["Paula fährt am Ende allein.", 1], ["Das Fahrrad hat keine Klingel.", 0]],
  of: [["Wo hält Papa Paula fest?", "Am Sattel."], ["Was passiert, als Papa loslässt?", "Paula fährt ganz allein."]] },
{ k: 2, s: "m", t: "Der Igel im Laub", x: `Es ist ein kalter Abend im November. Im Garten raschelt es unter einem Haufen Laub. Jonas schaut nach und entdeckt einen kleinen Igel. Der Igel rollt sich zu einer Kugel zusammen. Mama erklärt: „Igel schlafen im Winter. Das Laub hält ihn warm.“ Jonas legt noch ein paar Blätter dazu. Dann lassen sie den Igel in Ruhe schlafen.`,
  mc: [["In welchem Monat spielt die Geschichte?", "im November", "im Mai", "im Juli"], ["Was macht der Igel, als Jonas kommt?", "Er rollt sich zusammen.", "Er rennt weg.", "Er frisst."], ["Warum liegt der Igel im Laub?", "Das Laub hält ihn warm.", "Er sucht Futter.", "Er spielt Verstecken."]],
  rf: [["Jonas entdeckt einen Igel.", 1], ["Igel schlafen im Sommer.", 0], ["Jonas nimmt den Igel mit ins Haus.", 0], ["Jonas legt Blätter dazu.", 1]],
  of: [["Was raschelt im Garten?", "Ein Igel im Laub."], ["Was machen Igel im Winter?", "Sie schlafen."]] },
{ k: 2, s: "m", t: "Der verlorene Schlüssel", x: `Mama sucht ihren Schlüssel. Sie schaut in der Küche und im Flur nach. Aber der Schlüssel ist weg. Max hilft beim Suchen. Er krabbelt unter den Tisch und schaut in alle Schuhe. Plötzlich bellt der Hund Bello. Er steht vor seinem Korb. Und dort liegt der Schlüssel! Bello hat ihn versteckt.`,
  mc: [["Was sucht Mama?", "ihren Schlüssel", "ihre Brille", "ihr Handy"], ["Wo schaut Max nach?", "unter dem Tisch und in den Schuhen", "im Garten", "im Auto"], ["Wo liegt der Schlüssel?", "im Korb von Bello", "im Flur", "in der Küche"]],
  rf: [["Max hilft beim Suchen.", 1], ["Bello ist eine Katze.", 0], ["Bello hat den Schlüssel versteckt.", 1], ["Mama findet den Schlüssel in der Küche.", 0]],
  of: [["Wer hilft Mama?", "Max hilft Mama."], ["Wie zeigt Bello, wo der Schlüssel ist?", "Er bellt und steht vor seinem Korb."]] },
{ k: 2, s: "s", t: "Auf dem Bauernhof", x: `Die Klasse 2b fährt auf einen Bauernhof. Bauer Krause zeigt den Kindern zuerst den Stall. Dort stehen zehn Kühe. Jeden Morgen werden sie gemolken. Dann dürfen die Kinder die Hühner füttern. Ben findet sogar drei Eier im Stroh. Zum Schluss gibt es frische Milch und Butterbrote. Auf der Rückfahrt sagt Mia: „Das war der schönste Ausflug!“`,
  mc: [["Wer zeigt den Kindern den Hof?", "Bauer Krause", "die Lehrerin", "Ben"], ["Wie viele Kühe stehen im Stall?", "zehn", "drei", "zwanzig"], ["Was findet Ben im Stroh?", "drei Eier", "eine Katze", "einen Schuh"], ["Was gibt es zum Schluss?", "Milch und Butterbrote", "Eis", "Kuchen"]],
  rf: [["Die Kühe werden jeden Abend gemolken.", 0], ["Die Kinder füttern die Hühner.", 1], ["Mia fand den Ausflug langweilig.", 0], ["Die Klasse heißt 2b.", 1]],
  of: [["Was dürfen die Kinder machen?", "Die Hühner füttern."], ["Was sagt Mia auf der Rückfahrt?", "Das war der schönste Ausflug!"]] },
{ k: 2, s: "s", t: "Ein Tag im Zoo", x: `Heute besucht Elif mit Oma den Zoo. Zuerst gehen sie zu den Elefanten. Ein Elefant spritzt mit seinem Rüssel Wasser. Dann schauen sie den Affen zu. Die Affen klettern und schaukeln an Seilen. Bei den Pinguinen ist gerade Fütterung. Der Tierpfleger wirft Fische ins Becken. Am Ende kauft Oma ein Eis. Elif darf sich die Sorte aussuchen.`,
  mc: [["Mit wem geht Elif in den Zoo?", "mit Oma", "mit Papa", "mit der Klasse"], ["Was macht der Elefant?", "Er spritzt Wasser.", "Er schläft.", "Er frisst Gras."], ["Was bekommen die Pinguine?", "Fische", "Bananen", "Brot"], ["Was kauft Oma am Ende?", "ein Eis", "ein Buch", "einen Ballon"]],
  rf: [["Die Affen klettern an Seilen.", 1], ["Zuerst gehen sie zu den Pinguinen.", 0], ["Elif darf die Eissorte aussuchen.", 1], ["Der Tierpfleger füttert die Affen mit Fischen.", 0]],
  of: [["Welche Tiere sehen Elif und Oma?", "Elefanten, Affen und Pinguine."], ["Was macht der Tierpfleger?", "Er wirft Fische ins Becken."]] },

{ k: 3, s: "l", t: "Das Vogelhaus", x: `Im Winter finden Vögel nur wenig Futter. Deshalb baut Finn mit seinem Opa ein Vogelhaus. Sie sägen Bretter, schrauben sie zusammen und streichen das Dach rot an. Dann hängen sie das Haus in den Apfelbaum. Finn füllt Körner hinein. Schon am nächsten Morgen kommen die ersten Meisen. Finn beobachtet sie vom Fenster aus und zählt jeden Tag, wie viele Vögel kommen.`,
  mc: [["Warum baut Finn ein Vogelhaus?", "Im Winter finden Vögel wenig Futter.", "Er möchte einen Vogel fangen.", "Es ist eine Hausaufgabe."], ["Welche Farbe hat das Dach?", "rot", "grün", "braun"], ["Wo hängt das Vogelhaus?", "im Apfelbaum", "am Fenster", "auf dem Balkon"], ["Welche Vögel kommen zuerst?", "Meisen", "Amseln", "Spatzen"]],
  rf: [["Finn baut das Vogelhaus allein.", 0], ["Finn füllt Körner in das Haus.", 1], ["Die ersten Vögel kommen nach einer Woche.", 0], ["Finn zählt die Vögel.", 1]],
  of: [["Was machen Finn und Opa mit den Brettern?", "Sie sägen sie und schrauben sie zusammen."], ["Von wo beobachtet Finn die Vögel?", "Vom Fenster aus."], ["Warum ist ein Vogelhaus im Winter wichtig?", "Weil die Vögel dann wenig Futter finden."]] },
{ k: 3, s: "l", t: "Der Flohmarkt", x: `Am Samstag ist auf dem Schulhof Flohmarkt. Hanna sortiert ihre alten Spielsachen aus. Sie packt Bücher, Puzzles und ein Stofftier in eine Kiste. Auf dem Flohmarkt baut sie einen kleinen Tisch auf. Viele Leute bleiben stehen. Ein Junge kauft zwei Bücher, eine Frau nimmt das Puzzle. Am Ende hat Hanna acht Euro verdient. Die Hälfte spendet sie für das Tierheim.`,
  mc: [["Wo ist der Flohmarkt?", "auf dem Schulhof", "im Park", "auf dem Marktplatz"], ["Was kauft der Junge?", "zwei Bücher", "das Stofftier", "ein Puzzle"], ["Wie viel Geld verdient Hanna?", "acht Euro", "vier Euro", "zehn Euro"], ["Wofür spendet Hanna Geld?", "für das Tierheim", "für die Schule", "für den Zoo"]],
  rf: [["Der Flohmarkt ist am Sonntag.", 0], ["Hanna baut einen Tisch auf.", 1], ["Hanna spendet die Hälfte des Geldes.", 1], ["Niemand bleibt stehen.", 0]],
  of: [["Was packt Hanna in die Kiste?", "Bücher, Puzzles und ein Stofftier."], ["Wie viel Geld spendet Hanna?", "Vier Euro (die Hälfte)."], ["Was hättest du verkauft?", "eigene Antwort"]] },
{ k: 3, s: "m", t: "Von der Raupe zum Schmetterling", x: `Ein Schmetterling legt seine Eier auf ein Blatt. Nach einigen Tagen schlüpfen daraus kleine Raupen. Die Raupen haben großen Hunger und fressen fast ununterbrochen Blätter. Dabei wachsen sie schnell. Weil ihre Haut nicht mitwächst, häuten sie sich mehrmals. Nach einigen Wochen hängt sich die Raupe an einen Zweig und spinnt sich ein. Jetzt ist sie eine Puppe. Von außen sieht es aus, als würde nichts passieren. Doch in der Puppe verwandelt sich die Raupe vollständig. Nach zwei bis drei Wochen schlüpft ein Schmetterling. Er muss seine Flügel erst trocknen lassen, bevor er losfliegen kann.`,
  mc: [["Wohin legt der Schmetterling seine Eier?", "auf ein Blatt", "in die Erde", "ins Wasser"], ["Warum häuten sich Raupen?", "Ihre Haut wächst nicht mit.", "Ihnen ist zu warm.", "Sie wollen sich verstecken."], ["Wie heißt die Raupe, wenn sie sich eingesponnen hat?", "Puppe", "Larve", "Kokon-Käfer"], ["Was muss der Schmetterling vor dem ersten Flug tun?", "seine Flügel trocknen lassen", "Blätter fressen", "sich häuten"]],
  rf: [["Raupen fressen fast ununterbrochen.", 1], ["In der Puppe passiert nichts.", 0], ["Aus den Eiern schlüpfen Raupen.", 1], ["Der Schmetterling schlüpft nach zwei Tagen.", 0]],
  of: [["Nenne die vier Stufen der Verwandlung.", "Ei – Raupe – Puppe – Schmetterling."], ["Was machen die Raupen den ganzen Tag?", "Sie fressen Blätter und wachsen."], ["Warum kann der Schmetterling nicht sofort fliegen?", "Seine Flügel müssen erst trocknen."]] },
{ k: 3, s: "m", t: "Das wichtige Spiel", x: `Heute spielt Noahs Mannschaft im Endspiel. Noah ist der Torwart. Schon vor dem Anpfiff ist er schrecklich aufgeregt. In der ersten Halbzeit hält er zwei schwierige Schüsse. Doch kurz vor der Pause rutscht ihm der Ball durch die Hände. Es steht null zu eins. In der Kabine ist Noah enttäuscht. Seine Trainerin sagt: „Jeder macht mal einen Fehler. Wichtig ist, dass wir zusammenhalten.“ In der zweiten Halbzeit schießt Leni den Ausgleich. Und dann hält Noah im Elfmeterschießen den entscheidenden Ball!`,
  mc: [["Welche Position spielt Noah?", "Torwart", "Stürmer", "Verteidiger"], ["Wie steht es zur Halbzeit?", "null zu eins", "eins zu eins", "zwei zu null"], ["Wer schießt den Ausgleich?", "Leni", "Noah", "die Trainerin"], ["Wie wird das Spiel entschieden?", "im Elfmeterschießen", "in der ersten Halbzeit", "durch ein Eigentor"]],
  rf: [["Noah ist vor dem Spiel ganz ruhig.", 0], ["Noah hält in der ersten Halbzeit zwei Schüsse.", 1], ["Die Trainerin schimpft mit Noah.", 0], ["Noah hält den entscheidenden Elfmeter.", 1]],
  of: [["Warum ist Noah in der Kabine enttäuscht?", "Weil ihm der Ball durch die Hände gerutscht ist."], ["Was sagt die Trainerin?", "Jeder macht mal einen Fehler; wichtig ist, zusammenzuhalten."], ["Wie fühlt sich Noah wohl am Ende?", "Stolz und glücklich."]] },
{ k: 3, s: "s", t: "Das Leben der Bienen", x: `In einem Bienenstock leben im Sommer bis zu fünfzigtausend Bienen. Jede Biene hat eine bestimmte Aufgabe. Die Königin ist die größte Biene. Sie legt jeden Tag sehr viele Eier. Die meisten Bienen im Stock sind Arbeiterinnen. Junge Arbeiterinnen putzen die Waben und füttern die Larven. Ältere Arbeiterinnen fliegen hinaus und sammeln Nektar und Blütenstaub. Aus dem Nektar machen die Bienen Honig. Er ist ihr Vorrat für den Winter. Wenn eine Biene eine Wiese mit vielen Blüten gefunden hat, führt sie im Stock einen Tanz auf. So zeigt sie den anderen Bienen den Weg. Bienen sind sehr wichtig für uns, denn sie bestäuben viele Pflanzen, zum Beispiel Apfelbäume.`,
  mc: [["Wie viele Bienen leben im Sommer in einem Stock?", "bis zu fünfzigtausend", "etwa hundert", "genau tausend"], ["Was ist die Aufgabe der Königin?", "Sie legt Eier.", "Sie sammelt Nektar.", "Sie putzt die Waben."], ["Woraus machen Bienen Honig?", "aus Nektar", "aus Wasser", "aus Blättern"], ["Wie zeigt eine Biene den Weg zu Blüten?", "mit einem Tanz", "mit einem Summen", "mit einer Duftspur am Boden"]],
  rf: [["Die meisten Bienen sind Arbeiterinnen.", 1], ["Junge Arbeiterinnen fliegen hinaus.", 0], ["Honig ist der Wintervorrat der Bienen.", 1], ["Bienen bestäuben keine Pflanzen.", 0]],
  of: [["Welche Aufgaben haben junge Arbeiterinnen?", "Sie putzen die Waben und füttern die Larven."], ["Warum sind Bienen für uns wichtig?", "Sie bestäuben Pflanzen, z. B. Apfelbäume."], ["Wofür brauchen die Bienen Honig?", "Als Vorrat für den Winter."]] },
{ k: 3, s: "s", t: "Gefangen im Fahrstuhl", x: `Clara wohnt im siebten Stock. Als sie von der Schule kommt, steigt sie wie immer in den Fahrstuhl. Doch zwischen dem vierten und fünften Stock ruckelt es plötzlich. Das Licht flackert und der Fahrstuhl bleibt stehen. Clara bekommt Herzklopfen. Dann erinnert sie sich an den roten Knopf mit der Glocke. Sie drückt ihn fest. Eine freundliche Stimme meldet sich: „Bleib ruhig, in zwanzig Minuten ist jemand bei dir.“ Clara setzt sich auf den Boden und liest in ihrem Lesebuch. Endlich hört sie Schritte. Ein Techniker öffnet die Tür. Clara ist erleichtert und nimmt heute lieber die Treppe.`,
  mc: [["In welchem Stock wohnt Clara?", "im siebten Stock", "im vierten Stock", "im fünften Stock"], ["Wo bleibt der Fahrstuhl stehen?", "zwischen dem vierten und fünften Stock", "im Erdgeschoss", "ganz oben"], ["Was macht Clara, um Hilfe zu holen?", "Sie drückt den Knopf mit der Glocke.", "Sie ruft ihre Mutter an.", "Sie klopft an die Tür."], ["Wer befreit Clara?", "ein Techniker", "die Feuerwehr", "ihr Nachbar"]],
  rf: [["Clara bleibt die ganze Zeit ruhig.", 0], ["Eine Stimme sagt, dass Hilfe kommt.", 1], ["Clara liest, während sie wartet.", 1], ["Clara fährt danach gleich wieder Fahrstuhl.", 0]],
  of: [["Woran merkt Clara, dass etwas nicht stimmt?", "Es ruckelt, das Licht flackert und der Fahrstuhl bleibt stehen."], ["Wie beruhigt sich Clara?", "Sie setzt sich hin und liest."], ["Was würdest du in so einer Situation tun?", "eigene Antwort"]] },

{ k: 4, s: "l", t: "Die Schatzkarte", x: `Auf dem Dachboden findet Ida eine alte Kiste. Darin liegt ein vergilbtes Papier. Es ist eine Karte von ihrem Garten! Neben der großen Eiche ist ein Kreuz eingezeichnet. Darunter steht: „Zwanzig Schritte nach Osten.“ Ida holt ihren Bruder Jakob und einen Spaten. Mit einem Kompass finden sie die richtige Richtung. Sie zählen die Schritte und beginnen zu graben. Nach einer Weile stößt der Spaten auf etwas Hartes. Es ist eine Blechdose. Darin liegen alte Murmeln, ein Foto und ein Zettel: „Viel Spaß damit! Euer Opa.“ Die Kinder lachen. Opa hat die Dose als Kind vergraben.`,
  mc: [["Wo findet Ida die Kiste?", "auf dem Dachboden", "im Keller", "im Garten"], ["Was ist neben dem Kreuz eingezeichnet?", "eine Eiche", "ein Teich", "ein Haus"], ["Womit finden die Kinder die Richtung?", "mit einem Kompass", "mit dem Handy", "mit der Sonne"], ["Wer hat die Dose vergraben?", "Opa, als er ein Kind war", "Jakob", "ein Pirat"]],
  rf: [["Die Karte zeigt den Garten.", 1], ["Die Kinder gehen zwanzig Schritte nach Westen.", 0], ["In der Dose liegen Murmeln und ein Foto.", 1], ["Ida sucht den Schatz allein.", 0]],
  of: [["Was steht unter dem Kreuz auf der Karte?", "Zwanzig Schritte nach Osten."], ["Was finden die Kinder in der Dose?", "Murmeln, ein Foto und einen Zettel."], ["Warum lachen die Kinder am Ende?", "Weil der Schatz von Opa ist."]] },
{ k: 4, s: "l", t: "Wale", x: `Wale leben im Meer, aber sie sind keine Fische. Wale sind Säugetiere, genau wie wir Menschen. Sie atmen Luft und müssen deshalb immer wieder an die Wasseroberfläche kommen. Dort stoßen sie durch ihr Blasloch verbrauchte Luft aus. Das sieht aus wie eine Fontäne. Wal-Mütter bringen lebende Junge zur Welt und säugen sie mit Milch. Der Blauwal ist das größte Tier der Erde. Er kann über dreißig Meter lang werden. Obwohl er so riesig ist, frisst er vor allem winzige Krebse, den Krill. Viele Wale verständigen sich mit Lauten, die man unter Wasser weit hören kann.`,
  mc: [["Zu welcher Tiergruppe gehören Wale?", "zu den Säugetieren", "zu den Fischen", "zu den Reptilien"], ["Warum kommen Wale an die Oberfläche?", "um Luft zu atmen", "um zu fressen", "um sich zu sonnen"], ["Wie lang kann ein Blauwal werden?", "über dreißig Meter", "etwa drei Meter", "genau zehn Meter"], ["Was frisst der Blauwal vor allem?", "Krill", "Haie", "Algen"]],
  rf: [["Wale legen Eier.", 0], ["Wale säugen ihre Jungen mit Milch.", 1], ["Der Blauwal ist das größte Tier der Erde.", 1], ["Wale können sich nicht verständigen.", 0]],
  of: [["Warum sind Wale keine Fische?", "Sie atmen Luft und säugen ihre Jungen – sie sind Säugetiere."], ["Wie heißt die Öffnung, durch die Wale ausatmen?", "Blasloch."], ["Wie verständigen sich Wale?", "Mit Lauten, die man unter Wasser weit hört."]] },
{ k: 4, s: "m", t: "Das Geräusch im Keller", x: `Seit drei Nächten hört Selin ein seltsames Kratzen aus dem Keller. Ihre Eltern sagen, das sei bestimmt nur die Heizung. Doch Selin glaubt das nicht. Am Freitagabend nimmt sie ihre Taschenlampe und schleicht leise die Treppe hinunter. Ihr Herz klopft laut. Das Kratzen kommt aus der Ecke mit den alten Kartons. Selin leuchtet vorsichtig hinein. Zwei Augen blitzen auf! Erschrocken weicht sie zurück. Dann hört sie ein leises Miauen. In einem Karton sitzt eine dünne, getigerte Katze mit drei winzigen Jungen. Sie muss durch das gekippte Kellerfenster hereingekommen sein. Selin holt ihre Eltern. Gemeinsam bringen sie der Katzenfamilie Wasser und Futter. Am nächsten Tag fragen sie im Tierheim, ob jemand eine Katze vermisst.`,
  mc: [["Was hört Selin seit drei Nächten?", "ein Kratzen", "ein Bellen", "ein Klopfen"], ["Was glauben die Eltern?", "Es ist die Heizung.", "Es ist ein Einbrecher.", "Es ist der Wind."], ["Was findet Selin im Karton?", "eine Katze mit drei Jungen", "einen Igel", "eine Maus"], ["Wie ist die Katze in den Keller gekommen?", "durch das gekippte Fenster", "durch die Tür", "durch die Garage"]],
  rf: [["Selin geht am Montag in den Keller.", 0], ["Selin nimmt eine Taschenlampe mit.", 1], ["Die Katze ist getigert.", 1], ["Selin behält die Katze sofort.", 0]],
  of: [["Warum klopft Selins Herz laut?", "Weil sie aufgeregt ist und Angst hat."], ["Wie helfen Selin und ihre Eltern der Katze?", "Sie bringen ihr Wasser und Futter."], ["Warum fragen sie im Tierheim nach?", "Um herauszufinden, ob jemand die Katze vermisst."]] },
{ k: 4, s: "m", t: "Wie Papier entsteht", x: `Papier begegnet uns jeden Tag: in Heften, Büchern und Verpackungen. Doch wie wird es eigentlich hergestellt? Der wichtigste Rohstoff ist Holz. In der Papierfabrik wird das Holz zuerst in kleine Stücke zerhackt. Dann wird es so lange gekocht oder gemahlen, bis sich einzelne Fasern lösen. Diese Fasern werden mit sehr viel Wasser zu einem Brei vermischt. Der Brei wird auf ein feines Sieb gegossen. Das Wasser läuft ab und die Fasern verfilzen zu einer dünnen Schicht. Große Walzen pressen die Schicht und heiße Zylinder trocknen sie. Am Ende wird das Papier auf riesige Rollen gewickelt. Papier kann man gut wiederverwerten. Aus Altpapier entsteht Recyclingpapier. Dafür müssen weniger Bäume gefällt werden.`,
  mc: [["Was ist der wichtigste Rohstoff für Papier?", "Holz", "Stein", "Baumwolle"], ["Womit werden die Fasern vermischt?", "mit Wasser", "mit Öl", "mit Sand"], ["Was passiert auf dem Sieb?", "Das Wasser läuft ab und die Fasern verfilzen.", "Das Papier wird bedruckt.", "Das Holz wird zerhackt."], ["Was ist ein Vorteil von Recyclingpapier?", "Es müssen weniger Bäume gefällt werden.", "Es ist immer weißer.", "Es braucht kein Wasser."]],
  rf: [["Das Holz wird zuerst zerhackt.", 1], ["Papier wird mit kalten Steinen getrocknet.", 0], ["Am Ende wird das Papier aufgerollt.", 1], ["Altpapier kann man nicht wiederverwerten.", 0]],
  of: [["Nenne drei Dinge aus Papier.", "z. B. Heft, Buch, Verpackung."], ["Wozu dienen die Walzen und Zylinder?", "Sie pressen und trocknen das Papier."], ["Warum ist es gut, Altpapier zu sammeln?", "Daraus entsteht neues Papier und es werden weniger Bäume gefällt."]] },
{ k: 4, s: "s", t: "Die Mutprobe", x: `„Wer zur Bande gehören will, muss eine Mutprobe bestehen“, sagt Kevin und grinst. Die anderen nicken. Tim schluckt. Er möchte so gern dazugehören. „Du musst heute Abend allein über den Zaun der alten Gärtnerei klettern und eine Blume holen“, fordert Kevin. Die Gärtnerei ist seit Jahren geschlossen und das Betreten ist verboten. Den ganzen Nachmittag denkt Tim darüber nach. Er stellt sich vor, wie er im Dunkeln über den rostigen Zaun klettert. Was, wenn er abrutscht? Und was würden seine Eltern sagen? Am Abend trifft er die Bande am Spielplatz. Alle schauen ihn erwartungsvoll an. Tim holt tief Luft. „Ich mache das nicht“, sagt er mit fester Stimme. „Das ist gefährlich und verboten. Wenn ihr mich nur so mögt, will ich nicht dazugehören.“ Erst ist es still. Dann sagt Aylin leise: „Eigentlich hast du recht.“ Und plötzlich nicken auch die anderen.`,
  mc: [["Was verlangt Kevin von Tim?", "Er soll über den Zaun der Gärtnerei klettern.", "Er soll eine Blume kaufen.", "Er soll ein Spiel gewinnen."], ["Warum ist die Mutprobe verboten?", "Die Gärtnerei darf man nicht betreten.", "Blumen pflücken ist teuer.", "Es ist schon zu spät am Abend."], ["Wie entscheidet sich Tim?", "Er macht die Mutprobe nicht.", "Er klettert über den Zaun.", "Er geht nicht zum Spielplatz."], ["Wer gibt Tim zuerst recht?", "Aylin", "Kevin", "seine Eltern"]],
  rf: [["Tim möchte gern zur Bande gehören.", 1], ["Die Gärtnerei ist neu eröffnet.", 0], ["Tim denkt lange über die Mutprobe nach.", 1], ["Am Ende lachen alle Tim aus.", 0]],
  of: [["Welche Gedanken macht sich Tim am Nachmittag?", "Er hat Angst abzurutschen und denkt an seine Eltern."], ["Warum braucht Tim Mut, um Nein zu sagen?", "Weil er dazugehören möchte und die anderen ihn erwartungsvoll anschauen."], ["Wie findest du Tims Entscheidung? Begründe.", "eigene Antwort"]] },
{ k: 4, s: "s", t: "Der Wald im Jahreslauf", x: `Ein Laubwald verändert sich im Laufe eines Jahres stark. Im Frühling, bevor die Bäume Blätter tragen, fällt viel Sonnenlicht auf den Boden. Jetzt blühen Frühblüher wie das Buschwindröschen. Sie nutzen das Licht, bevor das Blätterdach dicht wird. Im Sommer spenden die Bäume Schatten. Ihre Blätter wandeln mit Hilfe des Sonnenlichts Wasser und Kohlendioxid in Zucker und Sauerstoff um. In dieser Zeit ziehen viele Tiere ihre Jungen groß. Im Herbst färben sich die Blätter gelb, rot und braun. Der Baum zieht wertvolle Stoffe aus den Blättern zurück und wirft sie dann ab. Eichhörnchen sammeln Nüsse und verstecken sie als Vorrat. Im Winter ruht der Wald. Manche Tiere halten Winterschlaf, andere wie das Reh suchen mühsam nach Futter. Unter der Schneedecke zersetzen Pilze und Kleinstlebewesen das Laub zu neuer, fruchtbarer Erde.`,
  mc: [["Warum blühen Frühblüher so früh?", "Sie nutzen das Licht, bevor das Blätterdach dicht ist.", "Sie mögen die Kälte.", "Im Sommer ist es zu trocken."], ["Was stellen die Blätter im Sommer her?", "Zucker und Sauerstoff", "Wasser und Salz", "Nüsse und Samen"], ["Was macht das Eichhörnchen im Herbst?", "Es versteckt Nüsse als Vorrat.", "Es hält Winterschlaf.", "Es baut ein Nest im Boden."], ["Was geschieht mit dem Laub im Winter?", "Pilze und Kleinstlebewesen machen daraus Erde.", "Es wird vom Wind weggeweht.", "Es wächst wieder an den Baum."]],
  rf: [["Im Frühling fällt viel Licht auf den Waldboden.", 1], ["Im Herbst werden die Blätter blau.", 0], ["Das Reh hält Winterschlaf.", 0], ["Der Baum zieht vor dem Laubfall Stoffe aus den Blättern.", 1]],
  of: [["Nenne einen Frühblüher aus dem Text.", "Das Buschwindröschen."], ["Was machen die Bäume im Sommer für Tiere und Menschen?", "Sie spenden Schatten und erzeugen Sauerstoff."], ["Beschreibe, was im Winter im Wald passiert.", "Der Wald ruht; Tiere halten Winterschlaf oder suchen Futter; das Laub wird zu Erde."]] },

{ k: 5, s: "l", t: "Der erste Tag", x: `Ben steht vor dem großen Gebäude der Gesamtschule. Alles ist neu: die Schule, die Lehrer und die Mitschüler. Aus seiner alten Klasse kennt er nur Emma. In der Aula werden die neuen Fünftklässler begrüßt. Danach geht es in die Klassenräume. Ben setzt sich neben einen Jungen mit roter Mütze. „Ich bin Malik“, sagt er. „Ich kenne hier auch fast niemanden.“ Ihre Klassenlehrerin, Frau Okafor, verteilt die Stundenpläne. Ben sieht, dass es jetzt Fächer wie Biologie und Englisch gibt. In der großen Pause zeigt Malik ihm die Mensa. Auf dem Heimweg merkt Ben, dass er gar nicht mehr nervös ist. Er freut sich schon auf morgen.`,
  mc: [["Wen kennt Ben aus seiner alten Klasse?", "Emma", "Malik", "Frau Okafor"], ["Woran erkennt man Malik?", "an seiner roten Mütze", "an seiner Brille", "an seinem Rucksack"], ["Was verteilt Frau Okafor?", "Stundenpläne", "Bücher", "Namensschilder"], ["Was zeigt Malik Ben in der Pause?", "die Mensa", "die Turnhalle", "die Bibliothek"]],
  rf: [["Ben geht jetzt in die fünfte Klasse.", 1], ["Malik kennt schon viele Kinder.", 0], ["Es gibt neue Fächer wie Biologie.", 1], ["Ben ist auf dem Heimweg immer noch nervös.", 0]],
  of: [["Warum ist Ben am Anfang nervös?", "Alles ist neu und er kennt fast niemanden."], ["Was haben Ben und Malik gemeinsam?", "Beide kennen fast niemanden an der neuen Schule."], ["Wie hat sich Bens Gefühl am Ende verändert?", "Er ist nicht mehr nervös und freut sich auf morgen."]] },
{ k: 5, s: "l", t: "Delfine", x: `Delfine gehören zu den klügsten Tieren der Welt. Wie Wale sind sie Säugetiere und atmen Luft. Die meisten Delfine leben in Gruppen, die man Schulen nennt. In der Gruppe jagen sie gemeinsam und beschützen ihre Jungen. Delfine können sich mit Pfiffen und Klicklauten verständigen. Manche Forscher glauben, dass jeder Delfin einen eigenen Pfiff hat, an dem ihn die anderen erkennen – fast wie einen Namen. Mit Klicklauten orientieren sich Delfine auch im trüben Wasser: Die Laute werden von Fischen oder Felsen zurückgeworfen. So „hören“ die Delfine, was vor ihnen liegt. Das nennt man Echoortung. Besonders erstaunlich ist ihr Schlaf: Delfine lassen immer nur eine Hälfte ihres Gehirns ruhen. Mit der anderen Hälfte passen sie auf und tauchen zum Atmen auf.`,
  mc: [["Wie nennt man eine Gruppe von Delfinen?", "Schule", "Herde", "Rudel"], ["Wozu nutzen Delfine Klicklaute?", "zur Orientierung", "zum Fressen", "zum Schlafen"], ["Was vermuten Forscher über den Pfiff?", "Er ist wie ein Name.", "Er warnt vor Haien.", "Er lockt Fische an."], ["Wie schlafen Delfine?", "Eine Gehirnhälfte ruht, die andere passt auf.", "Sie schlafen am Strand.", "Sie schlafen gar nicht."]],
  rf: [["Delfine sind Fische.", 0], ["Delfine jagen gemeinsam.", 1], ["Echoortung funktioniert nur in klarem Wasser.", 0], ["Delfine müssen auch im Schlaf zum Atmen auftauchen.", 1]],
  of: [["Erkläre mit eigenen Worten, was Echoortung ist.", "Delfine senden Klicklaute aus, die zurückgeworfen werden; so erkennen sie, was vor ihnen ist."], ["Warum leben Delfine in Gruppen?", "Sie jagen gemeinsam und beschützen ihre Jungen."], ["Was findest du an Delfinen am erstaunlichsten?", "eigene Antwort"]] },
{ k: 5, s: "m", t: "Eine Woche ohne Handy", x: `„Eine Woche ohne Handy? Niemals!“, ruft Lara, als ihre Klassenlehrerin das Projekt vorstellt. Die Klasse 5c soll sieben Tage lang auf Smartphones verzichten und aufschreiben, wie es ihnen dabei geht. Am ersten Tag greift Lara ständig in ihre Tasche, obwohl das Handy zu Hause in der Schublade liegt. Ihr ist langweilig und sie hat Angst, etwas zu verpassen. Am dritten Tag holt sie ein altes Puzzle aus dem Schrank. Ihr kleiner Bruder hilft mit, und sie lachen viel. Am Wochenende verabredet sie sich mit Nora – ganz altmodisch über das Festnetztelefon. Die beiden fahren mit dem Rad zum See. Am Ende der Woche liest Lara ihr Tagebuch noch einmal. Sie ist überrascht: Sie hat besser geschlafen und mehr erlebt als sonst. Ganz verzichten möchte sie zwar nicht, aber sie nimmt sich vor, das Handy abends früher wegzulegen.`,
  mc: [["Wie lange dauert das Projekt?", "sieben Tage", "einen Tag", "einen Monat"], ["Wo liegt Laras Handy?", "in der Schublade", "im Ranzen", "bei der Lehrerin"], ["Wie verabredet sich Lara mit Nora?", "über das Festnetztelefon", "mit einem Brief", "in der Schule"], ["Was nimmt sich Lara am Ende vor?", "das Handy abends früher wegzulegen", "nie wieder ein Handy zu benutzen", "ein neues Handy zu kaufen"]],
  rf: [["Lara ist von Anfang an begeistert.", 0], ["Am ersten Tag ist Lara langweilig.", 1], ["Lara puzzelt mit ihrem Bruder.", 1], ["Lara hat in der Woche schlechter geschlafen.", 0]],
  of: [["Warum greift Lara am ersten Tag ständig in ihre Tasche?", "Aus Gewohnheit – sie ist es gewohnt, das Handy dabeizuhaben."], ["Was erlebt Lara in der Woche? Nenne zwei Dinge.", "Puzzeln mit dem Bruder, Radtour zum See mit Nora."], ["Könntest du eine Woche ohne Handy leben? Begründe.", "eigene Antwort"]] },
{ k: 5, s: "m", t: "Vulkane", x: `Unter der festen Erdkruste ist es so heiß, dass Gestein schmilzt. Dieses flüssige Gestein heißt Magma. Es steigt durch Risse und Spalten nach oben und sammelt sich in einer Magmakammer unter dem Vulkan. Wenn der Druck dort zu groß wird, kommt es zu einem Ausbruch. Das Magma tritt aus dem Krater aus und heißt nun Lava. Lava kann über tausend Grad heiß sein. Bei manchen Ausbrüchen fließt sie langsam den Berg hinab, bei anderen werden Asche und Gesteinsbrocken mit großer Wucht in die Luft geschleudert. Ein bekannter aktiver Vulkan in Europa ist der Ätna auf der Insel Sizilien in Italien. Obwohl Vulkane gefährlich sein können, leben viele Menschen in ihrer Nähe. Der Grund: Vulkanasche macht den Boden besonders fruchtbar. Forscher beobachten aktive Vulkane genau, um Ausbrüche möglichst früh vorherzusagen.`,
  mc: [["Wie heißt das flüssige Gestein unter der Erde?", "Magma", "Lava", "Asche"], ["Wann kommt es zu einem Ausbruch?", "wenn der Druck in der Magmakammer zu groß wird", "wenn es regnet", "wenn der Vulkan erkaltet"], ["Wo liegt der Ätna?", "auf Sizilien in Italien", "in Island", "in Spanien"], ["Warum leben Menschen in der Nähe von Vulkanen?", "Der Boden ist sehr fruchtbar.", "Dort ist es kühl.", "Dort gibt es keine Erdbeben."]],
  rf: [["Lava kann über tausend Grad heiß sein.", 1], ["Magma und Lava sind verschiedene Stoffe.", 0], ["Bei jedem Ausbruch fließt die Lava langsam.", 0], ["Forscher versuchen, Ausbrüche vorherzusagen.", 1]],
  of: [["Was ist der Unterschied zwischen Magma und Lava?", "Magma ist unter der Erde, Lava ist das ausgetretene Magma."], ["Beschreibe zwei Arten von Ausbrüchen.", "Lava fließt langsam ab – oder Asche und Steine werden mit Wucht herausgeschleudert."], ["Warum ist es wichtig, Vulkane zu beobachten?", "Um Ausbrüche früh vorherzusagen und Menschen zu warnen."]] },
{ k: 5, s: "s", t: "Der Plan", x: `Jeden Tag nach der Schule muss Ole an der Bushaltestelle vorbei, an der Dennis und seine Freunde stehen. Und jeden Tag passiert dasselbe: Sie rufen ihm etwas hinterher, lachen über seine Brille oder schnappen sich seine Mütze. Ole hat niemandem davon erzählt. Er schämt sich und denkt, er müsse das allein lösen. Seit Wochen nimmt er deshalb einen Umweg, der fast zwanzig Minuten länger dauert. Doch dann bemerkt seine Sitznachbarin Jana, wie still er geworden ist. Als sie nachfragt, erzählt Ole stockend alles. Jana hört zu, ohne ihn zu unterbrechen. „Du bist nicht schuld“, sagt sie. „Und du musst das nicht allein schaffen.“ Gemeinsam überlegen sie einen Plan. Ole schreibt auf, was wann passiert ist. Dann gehen sie zusammen zum Vertrauenslehrer, Herrn Brandt. Der nimmt Ole ernst und spricht mit Dennis und dessen Eltern. Es dauert ein paar Wochen, aber die Sprüche hören auf. Ole merkt: Sich Hilfe zu holen, war kein Zeichen von Schwäche, sondern der mutigste Schritt.`,
  mc: [["Wo wird Ole geärgert?", "an der Bushaltestelle", "im Klassenzimmer", "beim Sport"], ["Warum erzählt Ole lange niemandem davon?", "Er schämt sich und will es allein lösen.", "Er findet es lustig.", "Er hat keine Zeit."], ["Wer bemerkt, dass Ole still geworden ist?", "Jana", "Herr Brandt", "Dennis"], ["Was gehört zum Plan?", "Ole schreibt auf, was passiert ist, und sie gehen zum Vertrauenslehrer.", "Ole ärgert Dennis zurück.", "Ole wechselt die Schule."]],
  rf: [["Ole nimmt wochenlang einen Umweg.", 1], ["Jana unterbricht Ole ständig.", 0], ["Herr Brandt nimmt Ole ernst.", 1], ["Die Sprüche hören sofort am nächsten Tag auf.", 0]],
  of: [["Was sagt Jana zu Ole? Warum ist das wichtig?", "„Du bist nicht schuld“ – das nimmt ihm die Scham."], ["Warum ist es sinnvoll, Vorfälle aufzuschreiben?", "Man kann genau zeigen, was wann passiert ist."], ["Erkläre den letzten Satz mit eigenen Worten.", "Hilfe zu holen braucht Mut und ist nicht schwach."]] },
{ k: 5, s: "s", t: "Wie Wetter entsteht", x: `Das Wetter wird von der Sonne angetrieben. Sie erwärmt die Erde jedoch ungleichmäßig: Am Äquator ist es viel wärmer als an den Polen, und über Land erwärmt sich die Luft schneller als über dem Meer. Warme Luft ist leichter als kalte und steigt nach oben. Dadurch entstehen Gebiete mit unterschiedlichem Luftdruck. Die Luft strömt immer vom hohen zum niedrigen Druck – diese Bewegung spüren wir als Wind. Auch Wolken und Regen haben mit der Sonne zu tun. Sie lässt Wasser aus Meeren, Seen und Pflanzen verdunsten. Der unsichtbare Wasserdampf steigt mit der warmen Luft auf. In der Höhe ist es kälter, sodass der Dampf zu winzigen Tröpfchen kondensiert. Viele Milliarden davon bilden eine Wolke. Wachsen die Tropfen weiter und werden zu schwer, fallen sie als Regen herunter. Ist es kalt genug, entstehen Schneeflocken. Das Wasser fließt über Flüsse zurück ins Meer, und der Kreislauf beginnt von vorn. Meteorologen messen Temperatur, Luftdruck und Feuchtigkeit, um mit Computern das Wetter vorherzusagen.`,
  mc: [["Was treibt das Wetter an?", "die Sonne", "der Mond", "das Meer"], ["Was ist Wind?", "Luft, die vom hohen zum niedrigen Druck strömt", "Luft, die nach unten fällt", "Wasserdampf in der Höhe"], ["Wie entsteht eine Wolke?", "Wasserdampf kondensiert in der Höhe zu Tröpfchen.", "Rauch steigt aus Fabriken auf.", "Das Meer verdampft komplett."], ["Wer sagt das Wetter vorher?", "Meteorologen", "Geologen", "Astronauten"]],
  rf: [["Warme Luft ist schwerer als kalte.", 0], ["Über Land erwärmt sich die Luft schneller als über dem Meer.", 1], ["Wasserdampf ist sichtbar.", 0], ["Der Wasserkreislauf beginnt immer wieder von vorn.", 1]],
  of: [["Warum erwärmt die Sonne die Erde ungleichmäßig? Nenne ein Beispiel aus dem Text.", "Am Äquator ist es wärmer als an den Polen; Land erwärmt sich schneller als Wasser."], ["Beschreibe den Wasserkreislauf in drei Schritten.", "Verdunsten – Kondensieren (Wolke) – Regen/Schnee fällt und fließt zurück ins Meer."], ["Welche Messwerte nutzen Meteorologen?", "Temperatur, Luftdruck und Feuchtigkeit."]] },

{ k: 6, s: "l", t: "Die Klassensprecherwahl", x: `In der 6a wird ein neuer Klassensprecher gewählt. Drei Kinder stellen sich zur Wahl: Paul, Amira und Lukas. Jeder darf eine kurze Rede halten. Paul verspricht, dass es mehr Ausflüge geben wird. Lukas sagt, er sei der Beste, weil er die meisten Freunde habe. Amira ist nervös, aber sie spricht ruhig: „Ich kann nicht versprechen, was die Lehrer entscheiden. Aber ich höre euch zu und bringe eure Ideen in die Schülervertretung.“ Danach schreibt jeder geheim einen Namen auf einen Zettel. Frau Lindner zählt die Stimmen an der Tafel aus. Paul bekommt sieben, Lukas fünf und Amira dreizehn Stimmen. Amira strahlt. Als Erstes fragt sie die Klasse, was sie verbessern soll.`,
  mc: [["Wie viele Kinder stellen sich zur Wahl?", "drei", "zwei", "vier"], ["Was verspricht Paul?", "mehr Ausflüge", "weniger Hausaufgaben", "eine neue Tafel"], ["Wie viele Stimmen bekommt Amira?", "dreizehn", "sieben", "fünf"], ["Was macht Amira als Erstes?", "Sie fragt die Klasse, was sie verbessern soll.", "Sie hält noch eine Rede.", "Sie geht zur Schulleitung."]],
  rf: [["Die Wahl ist geheim.", 1], ["Lukas bekommt die meisten Stimmen.", 0], ["Amira verspricht viele Ausflüge.", 0], ["Frau Lindner zählt die Stimmen aus.", 1]],
  of: [["Warum hat Amira wohl gewonnen?", "Sie verspricht nichts, was sie nicht halten kann, und will zuhören."], ["Was ist an Lukas' Rede problematisch?", "Er nennt keinen Grund außer seinen vielen Freunden."], ["Welche Eigenschaften sollte ein Klassensprecher haben?", "eigene Antwort"]] },
{ k: 6, s: "l", t: "Die Pyramiden von Gizeh", x: `Am Rand der Stadt Kairo in Ägypten stehen die berühmten Pyramiden von Gizeh. Die größte von ihnen ist die Cheops-Pyramide. Sie wurde vor etwa 4500 Jahren gebaut und war ursprünglich rund 146 Meter hoch. Die Pyramiden waren Grabmäler für die Pharaonen, die Könige im alten Ägypten. Die Ägypter glaubten an ein Leben nach dem Tod. Deshalb legten sie Möbel, Schmuck und Vorräte in die Gräber. Für die Cheops-Pyramide wurden über zwei Millionen Steinblöcke verbaut. Manche wiegen mehrere Tonnen. Wie die Arbeiter die Blöcke ohne moderne Maschinen nach oben brachten, ist bis heute nicht ganz geklärt. Vermutlich nutzten sie Rampen, Schlitten und viel Muskelkraft. Früher dachte man, Sklaven hätten die Pyramiden gebaut. Heute wissen Forscher, dass vor allem bezahlte Arbeiter daran beteiligt waren.`,
  mc: [["In welchem Land stehen die Pyramiden von Gizeh?", "in Ägypten", "in Mexiko", "in Griechenland"], ["Wofür wurden die Pyramiden gebaut?", "als Grabmäler für Pharaonen", "als Wohnhäuser", "als Tempel für die Sonne"], ["Wie alt ist die Cheops-Pyramide ungefähr?", "4500 Jahre", "450 Jahre", "45 000 Jahre"], ["Wer baute die Pyramiden nach heutigem Wissen vor allem?", "bezahlte Arbeiter", "Sklaven", "Soldaten"]],
  rf: [["Die Cheops-Pyramide war ursprünglich etwa 146 Meter hoch.", 1], ["Die Ägypter glaubten an ein Leben nach dem Tod.", 1], ["Es ist genau bekannt, wie die Steine transportiert wurden.", 0], ["Für die Cheops-Pyramide wurden etwa 2000 Steine verbaut.", 0]],
  of: [["Warum legten die Ägypter Schmuck und Vorräte in die Gräber?", "Weil sie an ein Leben nach dem Tod glaubten."], ["Wie brachten die Arbeiter die Steine vermutlich nach oben?", "Mit Rampen, Schlitten und Muskelkraft."], ["Was hat sich an der Meinung über die Bauarbeiter geändert?", "Früher dachte man an Sklaven, heute an bezahlte Arbeiter."]] },
{ k: 6, s: "m", t: "Ein Hund aus dem Tierheim", x: `Seit Jahren wünscht sich Mira einen Hund. Endlich sind ihre Eltern einverstanden – allerdings unter einer Bedingung: Er soll aus dem Tierheim kommen. Dort zeigt ihnen eine Mitarbeiterin die Zwinger. Ein junger Labrador springt freudig am Gitter hoch, ein kleiner Terrier bellt aufgeregt. Doch Mira bleibt vor einem älteren, grauen Mischling stehen, der still in der Ecke liegt. „Das ist Kalle“, erklärt die Mitarbeiterin. „Er ist acht Jahre alt. Seine Besitzerin ist gestorben. Ältere Hunde werden selten ausgesucht.“ Mira hockt sich hin. Kalle hebt vorsichtig den Kopf und schnuppert an ihrer Hand. Bei den nächsten drei Besuchen gehen sie gemeinsam spazieren. Kalle wird immer mutiger. Schließlich zieht er bei Mira ein. In den ersten Nächten winselt er noch, doch bald folgt er ihr überallhin. Mira hat gelernt, dass man manchmal genauer hinsehen muss, um den richtigen Freund zu finden.`,
  mc: [["Welche Bedingung stellen die Eltern?", "Der Hund soll aus dem Tierheim kommen.", "Der Hund muss klein sein.", "Mira muss allein bezahlen."], ["Wie alt ist Kalle?", "acht Jahre", "ein Jahr", "zwölf Jahre"], ["Warum ist Kalle im Tierheim?", "Seine Besitzerin ist gestorben.", "Er wurde ausgesetzt.", "Er hat gebissen."], ["Was passiert vor Kalles Einzug?", "Mira geht dreimal mit ihm spazieren.", "Kalle wird operiert.", "Mira besucht eine Hundeschule."]],
  rf: [["Der Labrador liegt still in der Ecke.", 0], ["Ältere Hunde werden selten ausgesucht.", 1], ["Kalle winselt in den ersten Nächten.", 1], ["Mira entscheidet sich für den Terrier.", 0]],
  of: [["Wie verhält sich Kalle beim ersten Treffen?", "Er liegt still und schnuppert dann vorsichtig an Miras Hand."], ["Warum werden ältere Hunde selten ausgesucht? Stelle eine Vermutung an.", "z. B. weil Menschen lieber junge, verspielte Hunde möchten."], ["Was bedeutet der letzte Satz?", "Man soll nicht nur nach dem ersten Eindruck entscheiden."]] },
{ k: 6, s: "m", t: "Plastik im Meer", x: `Jedes Jahr gelangen Millionen Tonnen Plastik in die Ozeane. Ein großer Teil stammt vom Land: Müll wird achtlos weggeworfen, über Flüsse ins Meer getragen oder fällt aus schlecht gesicherten Deponien. Auch Fischernetze, die verloren gehen, treiben jahrelang durch das Wasser. Das Problem: Plastik verrottet kaum. Durch Sonne, Salz und Wellen zerfällt es zwar in immer kleinere Stücke, verschwindet aber nicht. Teilchen, die kleiner als fünf Millimeter sind, nennt man Mikroplastik. Meerestiere verwechseln Plastik häufig mit Nahrung. Schildkröten fressen Plastiktüten, weil sie wie Quallen aussehen. Seevögel füttern ihre Küken mit bunten Plastikteilen. Viele Tiere verhungern mit vollem Magen, andere verfangen sich in Netzen. Über Fische kann Mikroplastik sogar auf unseren Tellern landen. Jeder kann etwas dagegen tun: Müll richtig trennen, Mehrwegflaschen und Stoffbeutel nutzen und bei Aktionen zum Müllsammeln mitmachen.`,
  mc: [["Woher stammt ein großer Teil des Plastiks im Meer?", "vom Land", "von Vulkanen", "aus dem Weltall"], ["Was ist Mikroplastik?", "Plastikteilchen, kleiner als fünf Millimeter", "besonders festes Plastik", "Plastik aus Pflanzen"], ["Warum fressen Schildkröten Plastiktüten?", "Sie sehen aus wie Quallen.", "Sie schmecken süß.", "Sie haben keinen Hunger."], ["Was kann jeder gegen Plastikmüll tun?", "Mehrwegflaschen und Stoffbeutel nutzen", "Plastik im Garten vergraben", "mehr Einwegflaschen kaufen"]],
  rf: [["Plastik verrottet sehr schnell.", 0], ["Verlorene Fischernetze treiben jahrelang im Meer.", 1], ["Mikroplastik kann über Fische zu uns gelangen.", 1], ["Seevögel erkennen Plastik immer sofort.", 0]],
  of: [["Wie gelangt Plastik ins Meer? Nenne zwei Wege.", "Über Flüsse, durch achtlos weggeworfenen Müll, aus Deponien, durch verlorene Netze."], ["Warum verhungern manche Tiere mit vollem Magen?", "Ihr Magen ist mit Plastik gefüllt, das sie nicht verdauen können."], ["Was machst du selbst schon gegen Plastikmüll?", "eigene Antwort"]] },
{ k: 6, s: "s", t: "Funkstille", x: `Seit dem Streit vor zwei Wochen herrscht zwischen Hannah und Leonie Funkstille. Dabei waren die beiden seit der ersten Klasse unzertrennlich. Angefangen hatte alles mit einem Foto. Leonie hatte im Klassenchat ein Bild von Hannah geteilt, auf dem sie mit verschmiertem Gesicht beim Zelten zu sehen war. Für Leonie war es ein Spaß, für Hannah eine Demütigung. Mehrere Mitschüler hatten lachende Emojis darunter gesetzt. Hannah hatte Leonie daraufhin eine wütende Nachricht geschrieben, in der sie Dinge sagte, die sie inzwischen bereut. Seitdem sitzen die beiden im Unterricht so weit voneinander entfernt wie möglich. In den Pausen tun sie, als würden sie sich nicht kennen. Doch beide vermissen die andere. Als die Klasse ein Partnerprojekt bekommt, lost die Lehrerin ausgerechnet die beiden zusammen. Die ersten Minuten schweigen sie. Dann sagt Leonie leise: „Das mit dem Foto war gemein. Ich habe nicht nachgedacht.“ Hannah schaut überrascht auf. „Und ich war auch fies“, antwortet sie. „Ich hätte dir sagen sollen, warum es mich so verletzt hat.“ Nach dem Gespräch löscht Leonie das Foto. Das Projekt wird das beste der Klasse.`,
  mc: [["Wie lange herrscht schon Funkstille?", "seit zwei Wochen", "seit zwei Tagen", "seit einem Jahr"], ["Was war der Auslöser des Streits?", "ein geteiltes Foto im Klassenchat", "eine schlechte Note", "ein verlorenes Buch"], ["Wie reagiert Hannah zuerst?", "Sie schreibt eine wütende Nachricht.", "Sie lacht mit.", "Sie geht zur Lehrerin."], ["Wodurch kommen die beiden wieder ins Gespräch?", "durch ein Partnerprojekt", "durch eine Klassenfahrt", "durch ihre Eltern"]],
  rf: [["Hannah und Leonie kennen sich seit der ersten Klasse.", 1], ["Für Hannah war das Foto ein Spaß.", 0], ["Beide vermissen einander.", 1], ["Leonie behält das Foto im Chat.", 0]],
  of: [["Warum empfinden Leonie und Hannah das Foto unterschiedlich?", "Für Leonie war es Spaß, für Hannah peinlich und verletzend."], ["Was bereut Hannah?", "Ihre wütende Nachricht mit gemeinen Worten."], ["Was kann man tun, bevor man ein Foto von anderen teilt?", "Die Person vorher fragen und überlegen, wie sie sich fühlt."]] },
{ k: 6, s: "s", t: "Die Sprache der Bienen", x: `Lange war es ein Rätsel, wie Honigbienen ihren Stockgenossinnen mitteilen, wo es Futter gibt. Erst im zwanzigsten Jahrhundert fanden Forscher die Antwort: Die Bienen tanzen. Kehrt eine Sammlerin von einer ergiebigen Futterquelle zurück, führt sie auf den senkrechten Waben im dunklen Stock einen Tanz auf. Liegt das Futter nah am Stock, läuft sie im Kreis, abwechselnd links- und rechtsherum. Dieser Rundtanz bedeutet: „In der Nähe gibt es Nahrung, sucht danach!“ Ist die Futterquelle weiter entfernt, tanzt die Biene den sogenannten Schwänzeltanz. Dabei läuft sie eine gerade Strecke und wackelt kräftig mit dem Hinterleib. Anschließend kehrt sie im Bogen zum Startpunkt zurück und beginnt von vorn. Die Richtung der geraden Strecke verrät den Winkel zwischen Sonne und Futterquelle. Läuft die Biene senkrecht nach oben, liegt das Futter genau in Richtung der Sonne. Die Dauer des Schwänzelns zeigt die Entfernung an: Je länger sie wackelt, desto weiter ist der Weg. Zusätzlich nehmen die anderen Bienen den Duft der Blüten auf, der an der Tänzerin haftet. So finden sie die Futterquelle oft auf Anhieb.`,
  mc: [["Wann wurde die Bienensprache entschlüsselt?", "im zwanzigsten Jahrhundert", "im Mittelalter", "vor zehn Jahren"], ["Was bedeutet der Rundtanz?", "Das Futter ist in der Nähe.", "Gefahr droht.", "Die Königin ist krank."], ["Was zeigt die Dauer des Schwänzelns?", "die Entfernung zum Futter", "die Menge des Honigs", "die Farbe der Blüten"], ["Was bedeutet ein Schwänzellauf senkrecht nach oben?", "Das Futter liegt in Richtung der Sonne.", "Das Futter liegt im Schatten.", "Es gibt kein Futter."]],
  rf: [["Die Bienen tanzen auf waagerechten Waben im Freien.", 0], ["Beim Schwänzeltanz wackelt die Biene mit dem Hinterleib.", 1], ["Je länger das Schwänzeln, desto näher das Futter.", 0], ["Auch der Blütenduft hilft beim Finden der Futterquelle.", 1]],
  of: [["Erkläre den Unterschied zwischen Rundtanz und Schwänzeltanz.", "Rundtanz: Futter in der Nähe. Schwänzeltanz: weiter weg, mit Richtung und Entfernung."], ["Welche zwei Informationen enthält der Schwänzeltanz?", "Richtung (Winkel zur Sonne) und Entfernung (Dauer)."], ["Warum finden die Bienen die Quelle oft auf Anhieb?", "Durch die Tanzinformationen und den Blütenduft an der Tänzerin."]] },

{ k: 7, s: "l", t: "Das Praktikum", x: `Zwei Wochen lang macht Deniz sein erstes Schülerpraktikum in einer Kfz-Werkstatt. Am ersten Morgen ist er schon um halb acht da, eine halbe Stunde zu früh. Der Meister, Herr Wolff, gibt ihm einen Blaumann und Sicherheitsschuhe. „Hier gilt: Erst zuschauen, dann fragen, dann anfassen“, erklärt er. In den ersten Tagen fegt Deniz die Halle, sortiert Schrauben und reicht Werkzeug an. Er ist etwas enttäuscht, weil er eigentlich gleich an Motoren schrauben wollte. Doch er hört genau zu und stellt viele Fragen. Am sechsten Tag darf er unter Aufsicht zum ersten Mal einen Reifen wechseln. Am Ende bekommt er eine Beurteilung: „Zuverlässig, interessiert, packt mit an.“ Herr Wolff bietet ihm an, in den Ferien wiederzukommen. Deniz ist sicher: Kfz-Mechatroniker könnte sein Traumberuf werden.`,
  mc: [["Wo macht Deniz sein Praktikum?", "in einer Kfz-Werkstatt", "in einer Bäckerei", "in einem Büro"], ["Was ist die Regel von Herrn Wolff?", "Erst zuschauen, dann fragen, dann anfassen.", "Immer schnell arbeiten.", "Nie Fragen stellen."], ["Was darf Deniz am sechsten Tag?", "einen Reifen wechseln", "allein Auto fahren", "einen Motor bauen"], ["Was steht in seiner Beurteilung?", "zuverlässig, interessiert, packt mit an", "unpünktlich", "schweigsam"]],
  rf: [["Deniz kommt am ersten Tag zu spät.", 0], ["In den ersten Tagen fegt Deniz die Halle.", 1], ["Deniz ist am Anfang etwas enttäuscht.", 1], ["Herr Wolff möchte Deniz nicht wiedersehen.", 0]],
  of: [["Warum ist Deniz anfangs enttäuscht?", "Er wollte gleich an Motoren schrauben."], ["Wodurch überzeugt Deniz im Praktikum?", "Er ist pünktlich, hört zu, fragt viel und packt mit an."], ["Welches Praktikum würdest du gern machen? Warum?", "eigene Antwort"]] },
{ k: 7, s: "l", t: "Falschmeldungen erkennen", x: `Im Internet verbreiten sich Nachrichten in Sekunden – auch falsche. Solche Falschmeldungen werden oft „Fake News“ genannt. Manche entstehen aus Versehen, andere werden absichtlich gestreut, um Menschen zu täuschen, Angst zu machen oder Geld zu verdienen. Doch es gibt Hinweise, an denen man sie erkennen kann. Erstens: Wer hat die Nachricht verbreitet? Seriöse Medien nennen ihre Quellen und haben ein Impressum. Zweitens: Wie ist die Überschrift formuliert? Viele Ausrufezeichen und Wörter wie „Schock!“ sollen Gefühle wecken statt zu informieren. Drittens: Berichten auch andere vertrauenswürdige Seiten darüber? Wenn nicht, ist Vorsicht geboten. Viertens: Passt das Foto wirklich zur Meldung? Mit einer umgekehrten Bildersuche lässt sich prüfen, ob ein Bild schon früher in einem anderen Zusammenhang auftauchte. Die wichtigste Regel lautet: Erst prüfen, dann teilen.`,
  mc: [["Warum werden Falschmeldungen manchmal absichtlich verbreitet?", "um zu täuschen, Angst zu machen oder Geld zu verdienen", "um Leser zu informieren", "weil es gesetzlich vorgeschrieben ist"], ["Woran erkennt man seriöse Medien?", "Sie nennen Quellen und haben ein Impressum.", "Sie haben viele Ausrufezeichen.", "Sie zeigen nur Fotos."], ["Wozu dient eine umgekehrte Bildersuche?", "um zu prüfen, ob ein Bild schon früher anders verwendet wurde", "um Bilder schöner zu machen", "um Bilder zu löschen"], ["Wie lautet die wichtigste Regel?", "Erst prüfen, dann teilen.", "Schnell teilen.", "Nie im Internet lesen."]],
  rf: [["Alle Falschmeldungen entstehen absichtlich.", 0], ["Reißerische Überschriften sollen Gefühle wecken.", 1], ["Berichtet keine andere Seite darüber, ist Vorsicht geboten.", 1], ["Ein Foto beweist immer, dass eine Meldung stimmt.", 0]],
  of: [["Nenne zwei Hinweise auf eine Falschmeldung.", "z. B. keine Quelle, reißerische Überschrift, keine anderen Berichte, unpassendes Foto."], ["Warum verbreiten sich Falschmeldungen so schnell?", "Weil sie im Internet in Sekunden geteilt werden und Gefühle wecken."], ["Hast du schon einmal eine Falschmeldung gesehen? Beschreibe.", "eigene Antwort"]] },
{ k: 7, s: "m", t: "Der Streit", x: `„Du nimmst mir nie etwas ab!“, schreit Ella und knallt die Zimmertür zu. Ihre Mutter steht im Flur, mit dem Wäschekorb in der Hand, und atmet tief durch. Es ist bereits der dritte Streit in dieser Woche. Diesmal ging es darum, dass Ella am Wochenende nicht mit zur Oma fahren will, weil ihre Freundinnen einen Ausflug in den Freizeitpark planen. Ella liegt auf dem Bett und starrt an die Decke. Eigentlich hat sie ihre Oma gern, aber sie hat das Gefühl, dass ihre Wünsche zu Hause nie zählen. Gleichzeitig weiß sie, dass ihre Mutter seit der Trennung viel allein schultern muss. Nach einer halben Stunde klopft es leise. „Darf ich reinkommen?“, fragt die Mutter. Diesmal schreit keiner. Ella erklärt, warum ihr der Ausflug so wichtig ist. Ihre Mutter erzählt, dass die Oma seit Wochen einsam ist. Am Ende finden sie einen Kompromiss: Ella fährt am Samstag mit den Freundinnen in den Freizeitpark, am Sonntag besuchen sie gemeinsam die Oma und backen ihren Lieblingskuchen. Als Ella am Abend den Tisch deckt, tut sie das ausnahmsweise ohne Aufforderung.`,
  mc: [["Worum geht es im Streit?", "um den Besuch bei der Oma und einen Ausflug", "um das Taschengeld", "um schlechte Noten"], ["Wie oft haben sie sich in dieser Woche gestritten?", "dreimal", "einmal", "fünfmal"], ["Was weiß Ella über ihre Mutter?", "Sie muss seit der Trennung viel allein schultern.", "Sie arbeitet im Freizeitpark.", "Sie mag die Oma nicht."], ["Wie sieht der Kompromiss aus?", "Samstag Freizeitpark, Sonntag Besuch bei der Oma", "Ella bleibt zu Hause.", "Alle fahren in den Freizeitpark."]],
  rf: [["Ella mag ihre Oma eigentlich gern.", 1], ["Die Mutter kommt sofort ins Zimmer und schimpft.", 0], ["Die Oma ist seit Wochen einsam.", 1], ["Ella deckt am Abend nur auf Aufforderung den Tisch.", 0]],
  of: [["Warum fühlt sich Ella ungerecht behandelt?", "Sie hat das Gefühl, dass ihre Wünsche nie zählen."], ["Was ist beim zweiten Gespräch anders als beim Streit?", "Niemand schreit; beide erklären ruhig ihre Gründe."], ["Was zeigt der letzte Satz über Ella?", "Sie ist versöhnt und möchte etwas zurückgeben."]] },
{ k: 7, s: "m", t: "Der Klimawandel", x: `Das Klima beschreibt das durchschnittliche Wetter an einem Ort über viele Jahre. Seit Beginn der Industrialisierung vor etwa 150 Jahren ist die durchschnittliche Temperatur auf der Erde um mehr als ein Grad gestiegen. Die Hauptursache sind Treibhausgase, vor allem Kohlendioxid. Es entsteht, wenn Kohle, Erdöl und Erdgas verbrannt werden, zum Beispiel in Kraftwerken, Fabriken und Autos. Treibhausgase wirken in der Atmosphäre wie die Scheiben eines Gewächshauses: Sie lassen Sonnenstrahlen durch, halten aber einen Teil der Wärme zurück, die die Erde abstrahlt. Je mehr dieser Gase in der Luft sind, desto wärmer wird es. Die Folgen sind schon heute spürbar: Gletscher schmelzen, der Meeresspiegel steigt, und extreme Wetterereignisse wie Hitzewellen, Dürren und Starkregen werden häufiger. Um die Erwärmung zu begrenzen, wollen viele Länder ihre Emissionen deutlich verringern. Dazu gehören erneuerbare Energien, sparsamere Geräte und ein Umstieg auf Bus, Bahn und Fahrrad.`,
  mc: [["Was beschreibt das Klima?", "das durchschnittliche Wetter über viele Jahre", "das Wetter von morgen", "die Temperatur im Sommer"], ["Wie entsteht Kohlendioxid vor allem?", "beim Verbrennen von Kohle, Öl und Gas", "durch Regen", "durch Pflanzenwachstum"], ["Womit werden Treibhausgase verglichen?", "mit den Scheiben eines Gewächshauses", "mit einem Kühlschrank", "mit einem Regenschirm"], ["Welche Folge wird im Text genannt?", "Gletscher schmelzen", "Die Erde dreht sich langsamer", "Es gibt mehr Vulkane"]],
  rf: [["Die Temperatur ist seit der Industrialisierung um mehr als ein Grad gestiegen.", 1], ["Treibhausgase halten keine Wärme zurück.", 0], ["Extreme Wetterereignisse werden häufiger.", 1], ["Der Meeresspiegel sinkt.", 0]],
  of: [["Erkläre den Treibhauseffekt mit eigenen Worten.", "Gase lassen Sonnenlicht durch, halten aber Wärme zurück – es wird wärmer."], ["Nenne drei Folgen des Klimawandels.", "Gletscherschmelze, steigender Meeresspiegel, Hitzewellen/Dürren/Starkregen."], ["Was kannst du selbst tun?", "eigene Antwort (z. B. Rad/Bus fahren, Strom sparen)"]] },
{ k: 7, s: "s", t: "Nachtzug", x: `Der Zug ruckelt gleichmäßig durch die Dunkelheit. Mats sitzt am Fenster des Abteils und beobachtet, wie die Lichter der Dörfer vorbeiziehen. Er ist zum ersten Mal allein unterwegs, auf dem Weg zu seinem Vater, der seit einem Jahr in Wien arbeitet. Seine Mutter hat ihm tausend Ratschläge mit auf den Weg gegeben, und in seiner Jackentasche steckt ein Zettel mit allen wichtigen Telefonnummern. Gegen Mitternacht bleibt der Zug plötzlich auf freier Strecke stehen. Eine Durchsage erklärt knapp, dass ein Baum auf die Gleise gestürzt sei; die Weiterfahrt verzögere sich auf unbestimmte Zeit. Mats spürt, wie Unruhe in ihm aufsteigt. Sein Handyakku zeigt nur noch acht Prozent. Die ältere Frau ihm gegenüber, die bisher schweigend gestrickt hat, sieht von ihrer Arbeit auf. „Erste große Reise?“, fragt sie. Mats nickt. Sie bietet ihm ein Ladekabel und ein Stück Apfelkuchen an. Während sie warten, erzählt sie von ihren eigenen Reisen als junge Frau, als es noch keine Handys gab und man sich auf Fahrpläne und Fremde verlassen musste. Mats schickt seinem Vater eine kurze Nachricht und hört dann gebannt zu. Als der Zug nach zweieinhalb Stunden weiterfährt, ist die Unruhe verflogen. Er hat gelernt, dass man unterwegs nicht nur Ziele erreicht, sondern auch Menschen begegnet.`,
  mc: [["Wohin fährt Mats?", "zu seinem Vater nach Wien", "zu seiner Oma", "auf Klassenfahrt"], ["Warum bleibt der Zug stehen?", "Ein Baum liegt auf den Gleisen.", "Der Lokführer ist krank.", "Es gibt einen Stromausfall."], ["Was bietet die Frau Mats an?", "ein Ladekabel und Apfelkuchen", "eine Decke", "ihr Handy"], ["Wie lange dauert die Verzögerung?", "zweieinhalb Stunden", "zehn Minuten", "die ganze Nacht"]],
  rf: [["Mats ist schon oft allein Zug gefahren.", 0], ["Mats' Akku ist fast leer.", 1], ["Die Frau erzählt von Reisen ohne Handy.", 1], ["Mats ist am Ende noch genauso unruhig.", 0]],
  of: [["Warum wird Mats unruhig?", "Der Zug steht, die Dauer ist unklar und sein Akku ist fast leer."], ["Wie verändert die Begegnung mit der Frau die Situation?", "Sie hilft praktisch und lenkt ihn mit Geschichten ab; die Unruhe verfliegt."], ["Erkläre den letzten Satz.", "Auf Reisen zählen auch die Begegnungen unterwegs, nicht nur das Ankommen."]] },
{ k: 7, s: "s", t: "Wie das Internet funktioniert", x: `Wenn du eine Internetseite aufrufst, passiert in Sekundenbruchteilen erstaunlich viel. Das Internet ist ein weltweites Netz aus Milliarden Geräten, die über Kabel, Glasfaserleitungen und Funk miteinander verbunden sind. Damit sich die Geräte finden, hat jedes eine eigene Adresse, die IP-Adresse – vergleichbar mit einer Hausnummer. Tippst du einen Namen wie eine Webadresse ein, übersetzt ein besonderer Dienst, das Domain Name System, diesen Namen in die passende IP-Adresse. Dein Gerät schickt dann eine Anfrage an den Server, also den Computer, auf dem die Seite gespeichert ist. Dieser antwortet jedoch nicht mit einem einzigen großen Datenpaket. Stattdessen wird die Seite in viele kleine Pakete zerlegt. Jedes Paket trägt die Zieladresse und eine Nummer. Router, die wie Verkehrsknotenpunkte arbeiten, leiten die Pakete weiter – oft auf ganz unterschiedlichen Wegen, je nachdem, wo gerade Platz in den Leitungen ist. Ein Teil der Daten reist dabei durch Unterseekabel quer durch die Ozeane. Erst auf deinem Gerät werden alle Pakete anhand ihrer Nummern wieder richtig zusammengesetzt. Fehlt eines, wird es einfach erneut angefordert. Dieses Prinzip macht das Internet besonders robust: Fällt eine Leitung aus, nehmen die Daten einfach einen anderen Weg.`,
  mc: [["Womit vergleicht der Text die IP-Adresse?", "mit einer Hausnummer", "mit einem Passwort", "mit einer Telefonzelle"], ["Was macht das Domain Name System?", "Es übersetzt Namen in IP-Adressen.", "Es speichert Fotos.", "Es baut Kabel."], ["Was ist ein Server?", "ein Computer, auf dem die Seite gespeichert ist", "ein Bildschirm", "ein Unterseekabel"], ["Warum ist das Internet robust?", "Fällt eine Leitung aus, nehmen die Daten einen anderen Weg.", "Es gibt nur eine einzige Leitung.", "Alle Daten reisen als ein großes Paket."]],
  rf: [["Eine Internetseite wird in viele kleine Pakete zerlegt.", 1], ["Alle Pakete nehmen immer denselben Weg.", 0], ["Ein Teil der Daten reist durch Unterseekabel.", 1], ["Fehlt ein Paket, ist die Seite für immer kaputt.", 0]],
  of: [["Wozu tragen die Pakete eine Nummer?", "Damit sie auf dem Gerät richtig zusammengesetzt werden können."], ["Beschreibe den Weg einer Internetseite in drei Schritten.", "Name wird in IP übersetzt – Anfrage an Server – Pakete werden über Router gesendet und zusammengesetzt."], ["Welche Aufgabe haben Router?", "Sie leiten die Pakete wie Verkehrsknotenpunkte weiter."]] },

{ k: 8, s: "l", t: "Die Bewerbung", x: `Sophie möchte im nächsten Sommer eine Ausbildung zur Erzieherin beginnen. Deshalb sitzt sie heute am Schreibtisch und schreibt ihre erste Bewerbung. Ihre Lehrerin hat erklärt, worauf es ankommt: Ein Anschreiben, ein Lebenslauf und die letzten Zeugnisse gehören dazu. Im Anschreiben soll Sophie erklären, warum sie sich gerade für diesen Beruf und diesen Kindergarten interessiert. Sie überlegt lange. Dann schreibt sie, dass sie seit zwei Jahren ihre kleinen Cousins betreut und in ihrem Praktikum gemerkt hat, wie viel Freude ihr die Arbeit mit Kindern macht. Sie achtet darauf, keine Rechtschreibfehler zu machen, und lässt den Text von ihrem Vater gegenlesen. Für den Lebenslauf sucht sie ein freundliches Foto aus. Am Ende speichert sie alles in einer einzigen PDF-Datei und schickt die Bewerbung per E-Mail ab. Drei Wochen später kommt eine Antwort: eine Einladung zum Vorstellungsgespräch.`,
  mc: [["Welchen Beruf möchte Sophie lernen?", "Erzieherin", "Krankenpflegerin", "Bürokauffrau"], ["Was gehört laut Lehrerin zu einer Bewerbung?", "Anschreiben, Lebenslauf und Zeugnisse", "nur ein Foto", "ein Aufsatz"], ["Wer liest das Anschreiben gegen?", "ihr Vater", "ihre Lehrerin", "ihre Cousins"], ["Was erhält Sophie nach drei Wochen?", "eine Einladung zum Vorstellungsgespräch", "eine Absage", "einen Ausbildungsvertrag"]],
  rf: [["Sophie hat schon Erfahrung mit Kindern.", 1], ["Sophie schickt die Bewerbung per Post.", 0], ["Sophie achtet auf die Rechtschreibung.", 1], ["Im Anschreiben steht nur ihr Name.", 0]],
  of: [["Welche Erfahrungen nennt Sophie im Anschreiben?", "Betreuung ihrer Cousins und ihr Praktikum."], ["Warum ist es sinnvoll, die Bewerbung gegenlesen zu lassen?", "Um Fehler zu finden."], ["Was würdest du in dein Anschreiben schreiben?", "eigene Antwort"]] },
{ k: 8, s: "l", t: "Schlaf und Lernen", x: `Viele Jugendliche schlafen unter der Woche deutlich zu wenig. Fachleute empfehlen in diesem Alter etwa acht bis zehn Stunden Schlaf pro Nacht. Doch Hausaufgaben, Hobbys und vor allem das Handy halten viele lange wach. Dabei ist Schlaf für das Lernen entscheidend. Während wir schlafen, sortiert das Gehirn die Eindrücke des Tages. Wichtige Informationen werden vom Kurzzeitgedächtnis ins Langzeitgedächtnis übertragen und dort gefestigt. Wer nach dem Lernen ausreichend schläft, kann sich am nächsten Tag deutlich besser erinnern. Schlafmangel dagegen macht unkonzentriert, gereizt und anfälliger für Krankheiten. Ein besonderes Problem ist das blaue Licht von Bildschirmen. Es signalisiert dem Körper, dass noch Tag ist, und verzögert die Ausschüttung des Schlafhormons Melatonin. Experten raten deshalb, eine Stunde vor dem Schlafen keine Bildschirme mehr zu nutzen und möglichst immer zur gleichen Zeit ins Bett zu gehen.`,
  mc: [["Wie viel Schlaf wird Jugendlichen empfohlen?", "acht bis zehn Stunden", "fünf bis sechs Stunden", "zwölf bis vierzehn Stunden"], ["Was passiert im Schlaf mit dem Gelernten?", "Es wird ins Langzeitgedächtnis übertragen.", "Es wird gelöscht.", "Nichts."], ["Wie wirkt blaues Licht von Bildschirmen?", "Es verzögert das Schlafhormon Melatonin.", "Es macht sofort müde.", "Es verbessert das Gedächtnis."], ["Was raten Experten?", "eine Stunde vor dem Schlafen keine Bildschirme", "abends viel Kaffee trinken", "am Wochenende gar nicht schlafen"]],
  rf: [["Viele Jugendliche schlafen unter der Woche zu wenig.", 1], ["Schlafmangel macht konzentrierter.", 0], ["Regelmäßige Schlafenszeiten werden empfohlen.", 1], ["Das Gehirn ruht im Schlaf vollständig.", 0]],
  of: [["Warum ist Schlaf wichtig für das Lernen?", "Das Gehirn festigt im Schlaf das Gelernte im Langzeitgedächtnis."], ["Nenne zwei Folgen von Schlafmangel.", "Unkonzentriertheit, Gereiztheit, Krankheitsanfälligkeit."], ["Was könntest du an deinen Schlafgewohnheiten verbessern?", "eigene Antwort"]] },
{ k: 8, s: "m", t: "Der Wettbewerb", x: `Seit Monaten arbeiten Jonas und Aylin an ihrem Projekt für den Wettbewerb „Jugend forscht“. Ihre Idee: ein günstiger Sensor, der anzeigt, wann Zimmerpflanzen gegossen werden müssen. Unzählige Nachmittage haben sie im Technikraum der Schule verbracht, gelötet, programmiert und Messwerte notiert. Mehrmals funktionierte nichts, und einmal brannte sogar eine Platine durch. Jonas wollte damals aufgeben. Aylin überzeugte ihn weiterzumachen, indem sie eine Liste mit allem schrieb, was sie bereits geschafft hatten. Beim Regionalwettbewerb stehen sie nun neben anderen Ständen mit Robotern, Solarbooten und Wasserfiltern. Die Jury stellt knifflige Fragen: Wie genau ist der Sensor? Was kostet er? Warum haben sie gerade diese Bauteile gewählt? Aylin erklärt die Technik, Jonas zeigt die Messreihen. Bei der Siegerehrung werden zuerst die dritten und zweiten Plätze aufgerufen – ihre Namen fallen nicht. Jonas lässt enttäuscht die Schultern hängen. Dann sagt die Moderatorin: „Der erste Preis im Fachgebiet Technik geht an …“ Aylin greift nach Jonas' Arm. Sie haben gewonnen und dürfen zum Landeswettbewerb.`,
  mc: [["Was entwickeln Jonas und Aylin?", "einen Sensor für Zimmerpflanzen", "einen Roboter", "ein Solarboot"], ["Was passierte einmal bei der Arbeit?", "Eine Platine brannte durch.", "Der Technikraum wurde geschlossen.", "Aylin wurde krank."], ["Wie überzeugte Aylin Jonas weiterzumachen?", "mit einer Liste des bereits Geschafften", "mit einem Geschenk", "mit Druck von der Lehrerin"], ["Welchen Platz belegen die beiden?", "den ersten Platz", "den dritten Platz", "keinen Platz"]],
  rf: [["Die beiden arbeiten seit wenigen Tagen am Projekt.", 0], ["Die Jury fragt nach Genauigkeit und Kosten.", 1], ["Jonas erklärt die Technik, Aylin zeigt die Messreihen.", 0], ["Die beiden dürfen zum Landeswettbewerb.", 1]],
  of: [["Welche Rückschläge erleben die beiden?", "Vieles funktioniert nicht, eine Platine brennt durch, Jonas will aufgeben."], ["Wie ergänzen sich Jonas und Aylin?", "Aylin erklärt die Technik und motiviert, Jonas zeigt die Messreihen."], ["Wie wird bei der Siegerehrung Spannung erzeugt?", "Die Plätze drei und zwei werden zuerst genannt, der Satz zum ersten Preis bricht ab."]] },
{ k: 8, s: "m", t: "Energie aus Wind und Sonne", x: `Strom kommt aus der Steckdose – doch er muss irgendwo erzeugt werden. Lange stammte der größte Teil aus Kohle-, Gas- und Atomkraftwerken. Heute wächst der Anteil erneuerbarer Energien stetig. Sie heißen so, weil ihre Quellen nicht aufgebraucht werden: Die Sonne scheint weiter und der Wind weht immer wieder. Windkraftanlagen wandeln die Bewegungsenergie des Windes in Strom um. Der Wind dreht die Rotorblätter, die einen Generator antreiben. Auf dem offenen Meer, wo der Wind besonders stark und gleichmäßig weht, stehen ganze Windparks. Solarzellen dagegen erzeugen Strom direkt aus Sonnenlicht. Man findet sie auf Hausdächern, an Balkonen und auf großen Freiflächen. Beide Technologien verursachen beim Betrieb kein Kohlendioxid. Ihr Nachteil ist, dass sie vom Wetter abhängen: Nachts liefert eine Solaranlage keinen Strom, und bei Flaute stehen die Windräder still. Deshalb arbeiten Fachleute an Speichern, zum Beispiel großen Batterien, und an Leitungen, die Strom aus windreichen Regionen dorthin bringen, wo er gebraucht wird.`,
  mc: [["Warum heißen erneuerbare Energien so?", "Ihre Quellen werden nicht aufgebraucht.", "Sie sind besonders neu.", "Sie werden jedes Jahr erneuert gebaut."], ["Wie erzeugt eine Windkraftanlage Strom?", "Der Wind dreht Rotorblätter, die einen Generator antreiben.", "Der Wind erhitzt Wasser.", "Durch Sonnenlicht auf den Flügeln."], ["Was ist ein Nachteil von Solar- und Windstrom?", "Sie hängen vom Wetter ab.", "Sie stoßen viel Kohlendioxid aus.", "Sie funktionieren nur im Winter."], ["Woran arbeiten Fachleute deshalb?", "an Speichern und Leitungen", "an neuen Kohlekraftwerken", "an kleineren Steckdosen"]],
  rf: [["Solarzellen erzeugen Strom direkt aus Sonnenlicht.", 1], ["Auf dem Meer weht der Wind schwächer als an Land.", 0], ["Windräder verursachen im Betrieb kein Kohlendioxid.", 1], ["Solaranlagen liefern auch nachts viel Strom.", 0]],
  of: [["Wo findet man Solarzellen? Nenne zwei Orte.", "Hausdächer, Balkone, große Freiflächen."], ["Warum stehen Windparks oft auf dem Meer?", "Dort weht der Wind stärker und gleichmäßiger."], ["Erkläre, warum Stromspeicher wichtig sind.", "Damit Strom auch bei Nacht oder Flaute zur Verfügung steht."]] },
{ k: 8, s: "s", t: "Am Bahnsteig", x: `Der Regionalzug nach Leipzig hat zwölf Minuten Verspätung. Nils lehnt an einem Pfeiler am Bahnsteig und dreht den Briefumschlag in seinen Händen. Darin liegt die Zusage für die Ausbildung als Tischler – in einer Werkstatt dreihundert Kilometer von zu Hause entfernt. Eigentlich sollte er sich freuen. Seit der siebten Klasse träumt er davon, mit Holz zu arbeiten, und von über vierzig Bewerbern wurden nur zwei genommen. Doch seit er die Zusage in der Hand hält, plagen ihn Zweifel. Was, wenn er dort niemanden kennt? Was wird aus seiner Mutter, die nach der Trennung allein mit seinen beiden kleinen Schwestern lebt und oft auf seine Hilfe angewiesen ist? Und was ist mit Leon, seinem besten Freund, mit dem er seit dem Kindergarten alles teilt? Ein älterer Mann in Arbeitsjacke stellt sich neben ihn. Sein Blick fällt auf den Umschlag mit dem Logo der Tischlerei. „Gute Werkstatt“, sagt er knapp. „Hab da vor dreißig Jahren gelernt.“ Nils sieht überrascht auf. Der Mann erzählt, dass auch er damals Heimweh hatte, dass die ersten Wochen hart waren und dass er trotzdem keinen Tag bereut. „Wer gut ist, muss manchmal gehen, um besser zu werden“, sagt er. „Zurückkommen kann man immer.“ Als der Zug einfährt, steigt der Mann in den hinteren Wagen. Nils bleibt einen Moment stehen. Dann zieht er sein Handy heraus und schreibt seiner Mutter: „Ich nehme an. Lass uns heute Abend reden, wie wir das zusammen schaffen.“`,
  mc: [["Welche Ausbildung möchte Nils machen?", "Tischler", "Elektriker", "Koch"], ["Wie viele Bewerber wurden genommen?", "zwei von über vierzig", "zwanzig von vierzig", "alle"], ["Was verbindet den älteren Mann mit der Tischlerei?", "Er hat dort vor dreißig Jahren gelernt.", "Er ist der Chef.", "Er ist Nils' Onkel."], ["Wie entscheidet sich Nils?", "Er nimmt die Zusage an.", "Er sagt ab.", "Er verschiebt die Entscheidung um ein Jahr."]],
  rf: [["Der Zug hat Verspätung.", 1], ["Nils macht sich keine Sorgen um seine Familie.", 0], ["Der Mann hatte damals auch Heimweh.", 1], ["Nils schreibt Leon zuerst.", 0]],
  of: [["Welche Zweifel hat Nils? Nenne drei.", "Er kennt dort niemanden; Sorge um Mutter und Schwestern; Abschied von Leon."], ["Erkläre den Satz: „Wer gut ist, muss manchmal gehen, um besser zu werden.“", "Um sich weiterzuentwickeln, muss man manchmal Vertrautes verlassen."], ["Wie zeigt Nils' Nachricht, dass er Verantwortung übernimmt?", "Er will die Situation mit seiner Mutter gemeinsam planen."]] },
{ k: 8, s: "s", t: "Die Erfindung des Buchdrucks", x: `Bis zur Mitte des 15. Jahrhunderts wurden Bücher in Europa meist von Hand abgeschrieben, häufig von Mönchen in Klöstern. Eine einzige Bibel abzuschreiben, konnte Jahre dauern. Bücher waren entsprechend kostbar und nur wenige Menschen konnten lesen. Um 1450 entwickelte der Mainzer Goldschmied Johannes Gutenberg ein Verfahren, das die Welt verändern sollte. Seine Idee bestand aus mehreren Teilen. Er goss einzelne Buchstaben, die sogenannten Lettern, aus einer Metallmischung. Weil sie beweglich waren, ließen sie sich immer wieder zu neuen Wörtern und Seiten zusammensetzen. Mit einem Handgießinstrument konnte er sie in großer Zahl und gleichmäßiger Qualität herstellen. Außerdem entwickelte er eine ölhaltige Druckfarbe, die gut auf dem Metall haftete, und nutzte eine Presse, ähnlich wie sie zum Keltern von Wein verwendet wurde. Gutenbergs berühmtestes Werk ist eine Bibel, von der vermutlich etwa 180 Exemplare gedruckt wurden. Die neue Technik verbreitete sich rasch in ganz Europa. Bücher, Flugblätter und später Zeitungen wurden billiger und erreichten immer mehr Menschen. Wissen und neue Ideen konnten sich schneller verbreiten als je zuvor. Viele Historiker zählen den Buchdruck deshalb zu den wichtigsten Erfindungen der Menschheitsgeschichte.`,
  mc: [["Wer schrieb vor Gutenberg häufig Bücher ab?", "Mönche in Klöstern", "Kaufleute", "Soldaten"], ["Was sind Lettern?", "einzelne, bewegliche Buchstaben aus Metall", "handgeschriebene Briefe", "Holzschnitte von Bildern"], ["Woher stammte die Idee für die Druckpresse?", "von Pressen zum Keltern von Wein", "von Getreidemühlen", "von Webstühlen"], ["Wie viele Exemplare der Gutenberg-Bibel wurden vermutlich gedruckt?", "etwa 180", "etwa 18", "etwa 18 000"]],
  rf: [["Gutenberg war von Beruf Goldschmied.", 1], ["Die Lettern wurden aus Holz geschnitzt.", 0], ["Durch den Buchdruck wurden Bücher billiger.", 1], ["Die neue Technik blieb lange auf Mainz beschränkt.", 0]],
  of: [["Warum waren Bücher vor Gutenberg so kostbar?", "Sie wurden von Hand abgeschrieben, was sehr lange dauerte."], ["Aus welchen Teilen bestand Gutenbergs Verfahren?", "Bewegliche Metalllettern, Handgießinstrument, ölhaltige Farbe, Druckpresse."], ["Welche Folgen hatte der Buchdruck für die Gesellschaft?", "Wissen und Ideen verbreiteten sich schneller; mehr Menschen konnten lesen."]] },
];

/* Test-Diktate (kriteriumsorientiert): {Wort|Bereich} markiert ein gezähltes Prüfwort.
   Bereiche: lt lautgetreu · sch Schärfung · ck ck/tz · dh Dehnungs-h · ie ie · ss s/ss/ß · al Auslaut · ae ä/äu · gk Groß/klein
             dd das/dass · vf v/f · dv aa/ee/oo · ig -ig/-lich · sp sp/st · sh Silben-h · x chs/x */
const DK_ROH = [
/* ---------- Klasse 1 ---------- */
{ k: 1, s: "l", v: "A", t: "Der Ball", x: "{Mama|lt} {malt|lt}. {Oma|lt} {ruft|lt} Lisa. Lisa holt den {Ball|sch}." },
{ k: 1, s: "l", v: "B", t: "Der Kamm", x: "{Opa|lt} {malt|lt}. {Ole|lt} {ruft|lt} Ela. Ela holt den {Kamm|sch}." },
{ k: 1, s: "m", v: "A", t: "Die Limo", x: "{Lina|lt} {holt|lt} {Limo|lt}. Sie {trinkt|lt} aus der {Tasse|sch}. {Die|ie} Limo ist {kalt|lt}. Lina lacht." },
{ k: 1, s: "m", v: "B", t: "Die Melone", x: "{Tom|lt} {holt|lt} {Melone|lt}. Er {legt|lt} sie in die {Kanne|sch}. {Die|ie} Kanne ist {rot|lt}. Tom lacht." },
{ k: 1, s: "s", v: "A", t: "Im Garten", x: "{Timo|lt} ist im {Garten|lt}. Da {sitzt|ck} eine {Maus|lt}. {Sie|ie} {rennt|sch} zum {Baum|lt}. Timo {ruft|lt} Mama. {Mama|lt} kommt und lacht." },
{ k: 1, s: "s", v: "B", t: "Am Teich", x: "{Nele|lt} ist am {Teich|lt}. Da {sitzt|ck} eine {Ente|lt}. {Sie|ie} {schwimmt|sch} zum {Ufer|lt}. Nele {ruft|lt} Papa. {Papa|lt} kommt und winkt." },

/* ---------- Klasse 2 ---------- */
{ k: 2, s: "l", v: "A", t: "Der Igel", x: "Im Herbst {liegt|ie} viel {Laub|gk} im {Garten|gk}. Ben {findet|lt} dort einen {Igel|gk}. Der Igel {schläft|lt}. Ben holt eine {Kiste|lt} und legt {Blätter|sch} hinein. Jetzt hat der Igel ein {Bett|sch}." },
{ k: 2, s: "l", v: "B", t: "Der Vogel", x: "Im Winter {liegt|ie} viel {Schnee|gk} im {Garten|gk}. Mia {findet|lt} dort einen {Spatz|gk}. Der Spatz {friert|lt}. Mia holt eine {Schale|lt} und legt {Futter|sch} hinein. Jetzt hat der Spatz ein {Fressen|sch}." },
{ k: 2, s: "m", v: "A", t: "Das Fahrrad", x: "Paul {bekommt|sch} ein neues {Fahrrad|gk}. Es ist {grün|lt} und hat eine {Klingel|gk}. Am {Anfang|gk} {wackelt|ck} Paul noch. Papa hält ihn am {Sattel|sch} fest. Dann {fährt|dh} Paul allein. Vor {Freude|gk} klingelt er dreimal. {Stolz|sp} winkt er Papa zu." },
{ k: 2, s: "m", v: "B", t: "Der Drache", x: "Lea {bekommt|sch} einen neuen {Drachen|gk}. Er ist {blau|lt} und hat einen {Schwanz|gk}. Am {Anfang|gk} {flattert|sch} er nur. Opa hält ihn an der {Schnur|lt} fest. Dann {fliegt|ie} der Drache hoch. Vor {Freude|gk} hüpft Lea {herum|lt}. {Stolz|sp} winkt sie Opa zu." },
{ k: 2, s: "s", v: "A", t: "Am Meer", x: "In den {Ferien|gk} fahren wir an das {Meer|dv}. Am {Strand|sp} baue ich mit meinem {Bruder|gk} eine {Burg|al}. Wir {sammeln|sch} {Muscheln|gk} und {Steine|sp}. Plötzlich kommt eine große {Welle|sch}. Die Burg ist weg. Wir {lachen|lt} und bauen eine neue. Am {Abend|al} sehen wir die {Sonne|sch} untergehen." },
{ k: 2, s: "s", v: "B", t: "Im Schnee", x: "In den {Ferien|gk} fahren wir in den {Schnee|dv}. Am {Stall|sp} baue ich mit meiner {Schwester|gk} einen {Berg|al}. Wir {rollen|sch} {Kugeln|gk} und {Sterne|sp}. Plötzlich kommt ein großer {Hund|al}. Der Berg ist platt. Wir {lachen|lt} und bauen einen neuen. Am {Abend|al} sehen wir den {Himmel|sch} leuchten." },

/* ---------- Klasse 3 ---------- */
{ k: 3, s: "l", v: "A", t: "Der Fuchs", x: "Am Rand des {Waldes|gk} wohnt ein {Fuchs|x}. Er hat ein {rotes|lt} {Fell|sch} und einen {dicken|ck} Schwanz. Am Tag {schläft|ae} er in seiner {Höhle|dh}. Erst in der {Nacht|gk} geht er auf die {Jagd|al}. Er {fängt|ae} {Mäuse|ae} und {frisst|ss} auch {Beeren|dv}." },
{ k: 3, s: "l", v: "B", t: "Der Dachs", x: "Am Rand des {Feldes|gk} wohnt ein {Dachs|x}. Er hat ein {graues|lt} {Fell|sch} und einen {kurzen|lt} Schwanz. Am Tag {schläft|ae} er in seinem {Bau|lt}. Erst am {Abend|al} {kommt|sch} er {heraus|lt}. Er {gräbt|ae} nach {Würmern|gk} und {frisst|ss} auch {Beeren|dv}." },
{ k: 3, s: "m", v: "A", t: "Das Rennen", x: "Beim {Sportfest|sp} {findet|lt} ein {Fahrradrennen|gk} statt. Alle {Fahrer|dh} tragen einen {Helm|gk}. Die Strecke {führt|dh} um den {Schulhof|gk} und über einen kleinen {Hügel|gk}. Als der {Pfiff|sch} ertönt, {treten|lt} alle {kräftig|ig} in die Pedale. In der letzten {Kurve|vf} {überholt|lt} Jan zwei {Kinder|gk}. Er fährt als {Erster|gk} durchs {Ziel|ie}. Seine {Klasse|ss} jubelt laut." },
{ k: 3, s: "m", v: "B", t: "Das Spiel", x: "Beim {Schulfest|sp} {findet|lt} ein {Fußballspiel|gk} statt. Alle {Spieler|ie} tragen ein {Trikot|gk}. Das Spiel {dauert|lt} zweimal zehn Minuten und ist sehr {spannend|sp}. Als der {Pfiff|sch} ertönt, {rennen|sch} alle {eilig|ig} los. In der letzten {Minute|gk} {schießt|ss} Ali ein {Tor|gk}. Er {jubelt|lt} mit den {Kindern|gk}. Seine {Klasse|ss} {gewinnt|sch} {knapp|sch}. Danach gibt es {Eis|ss} für alle." },
{ k: 3, s: "s", v: "A", t: "Das Gewitter", x: "Am {Nachmittag|gk} wird der {Himmel|sch} plötzlich {dunkel|lt}. Schwere {Wolken|gk} ziehen auf, und es {fängt|ae} an zu {donnern|sch}. Mia und ihr kleiner {Bruder|gk} spielen draußen. Schnell {rennen|sch} sie ins {Haus|ss}. Kaum sind sie drinnen, {prasselt|ss} der {Regen|lt} gegen die {Fenster|gk}. Ein {greller|sch} {Blitz|ck} erhellt das {Zimmer|sch}. Mia sagt: „Hab keine {Angst|gk}, im Haus sind wir {sicher|lt}.“ {Bald|al} ist das Gewitter {vorbei|vf}." },
{ k: 3, s: "s", v: "B", t: "Der Sturm", x: "Am {Vormittag|gk} wird der {Wind|al} plötzlich {stärker|ae}. Dunkle {Wolken|gk} jagen über das {Feld|al}, und die {Bäume|ae} {biegen|ie} sich. Tom und sein {Vater|vf} {sammeln|sch} schnell die {Gartenstühle|gk} ein. Dann {rennen|sch} sie ins {Haus|ss}. Kaum sind sie drinnen, {prasselt|ss} der {Regen|lt} gegen die {Scheiben|gk}. Ein {Ast|lt} {knackt|ck} laut. Tom fragt: „Ist unser {Haus|gk} sicher?“ Der {Vater|gk} {nickt|ck} und {lacht|lt}." },

/* ---------- Klasse 4 ---------- */
{ k: 4, s: "l", v: "A", t: "Die Klassenfahrt", x: "Endlich {beginnt|sch} unsere {Klassenfahrt|gk} an die {Ostsee|dv}. Früh am {Morgen|gk} treffen sich alle am {Bahnhof|dh}. Jeder hat einen {schweren|lt} {Koffer|sch} dabei. Die {Fahrt|dh} dauert fast vier {Stunden|sp}. In der {Jugendherberge|gk} {schlafe|lt} ich mit drei {Freundinnen|gk}. Am Abend machen wir eine {Nachtwanderung|gk} am {Strand|al}. Unsere {Lehrerin|dh} sagt, {dass|dd} wir {zusammenbleiben|gk} sollen." },
{ k: 4, s: "l", v: "B", t: "Der Ausflug", x: "Endlich {beginnt|sch} unser {Ausflug|gk} in den {Zoo|dv}. Früh am {Morgen|gk} treffen sich alle an der {Schule|lt}. Jeder hat einen {vollen|vf} {Rucksack|ck} dabei. Die {Fahrt|dh} dauert fast eine {Stunde|sp}. Im {Affenhaus|gk} {lachen|lt} wir über die frechen {Tiere|ie}. Am Mittag {essen|ss} wir unsere {Brote|lt} auf einer {Wiese|ie}. Unser {Lehrer|dh} sagt, {dass|dd} wir {zusammenbleiben|gk} sollen." },
{ k: 4, s: "m", v: "A", t: "Der Waldbrand", x: "Im {trockenen|ck} {Sommer|sch} ist die {Gefahr|dh} groß, {dass|dd} im {Wald|al} ein {Feuer|gk} ausbricht. Schon eine {weggeworfene|gk} {Flasche|sch} kann {trockenes|ck} {Gras|ss} {entzünden|ck}. Als ein {Spaziergänger|sp} {Rauch|lt} {bemerkt|lt}, ruft er sofort die {Feuerwehr|dh}. Wenige {Minuten|gk} später rasen die {Löschfahrzeuge|gk} heran. Die {Feuerwehrleute|gk} {bekämpfen|ae} die {Flammen|sch}. Nach zwei {Stunden|sp} ist der {Brand|al} {gelöscht|lt}. Der {Förster|gk} erklärt, {dass|dd} man im Wald nie {Feuer|vf} machen darf." },
{ k: 4, s: "m", v: "B", t: "Die Baustelle", x: "Im {heißen|ss} {Sommer|sch} ist der {Lärm|ae} groß, {dass|dd} man im {Haus|ss} kaum etwas hört. Gegenüber der {Schule|gk} {entsteht|sp} ein {neues|lt} {Gebäude|ae}. Jeden {Morgen|gk} {schleppen|sch} die {Arbeiter|gk} Steine und {mauern|lt} {Wände|ae}. Ein {riesiger|ie} {Kran|lt} hebt {schwere|lt} {Lasten|gk}. Letzte {Woche|gk} {durften|lt} wir die {Baustelle|sp} besuchen. Dabei trugen alle einen {gelben|lt} {Helm|gk}. Der {Bauleiter|gk} zeigte uns, {dass|dd} jedes Haus mit einem {Fundament|gk} {beginnt|sch}." },
{ k: 4, s: "s", v: "A", t: "Die Brieftaube", x: "Schon vor {vielen|vf} hundert {Jahren|dh} {nutzten|ck} die Menschen {Tauben|gk}, um {Nachrichten|gk} zu {übermitteln|sch}. {Brieftauben|ie} besitzen nämlich einen {erstaunlichen|ig} {Orientierungssinn|gk}. Selbst wenn man sie {weit|lt} {entfernt|lt} freilässt, finden sie {zuverlässig|ig} zu ihrem {Schlag|al} zurück. {Forscher|gk} {vermuten|vf}, {dass|dd} sich die {Tiere|ie} an der {Sonne|sch} und am {Magnetfeld|al} der {Erde|gk} {orientieren|ie}. Früher band man ihnen kleine {Röhrchen|dh} mit {Briefen|ie} an die {Beine|gk}. Heute {veranstalten|vf} {Züchter|gk} vor allem {Wettflüge|sch}, bei denen das {Fliegen|gk} der {schnellsten|sch} Taube {belohnt|dh} wird." },
{ k: 4, s: "s", v: "B", t: "Der Sturm an der Küste", x: "Schon vor {vielen|vf} {Stunden|sp} hatte der {Wetterdienst|sch} vor einem {Sturm|gk} {gewarnt|lt}. Trotzdem {waren|lt} die {Bewohner|dh} des {kleinen|lt} {Ortes|gk} {überrascht|sch}, wie {heftig|ig} der {Wind|al} blies. {Ziegel|ie} flogen von den {Dächern|ae}, und am {Hafen|gk} {schaukelten|lt} die {Boote|dv}. Die {Fischer|gk} hatten ihre {Kutter|sch} zum {Glück|ck} {rechtzeitig|ig} {festgemacht|gk}. {Freiwillige|ig} {Helfer|gk} {schleppten|sch} {Sandsäcke|ae}, um die {Häuser|ae} zu schützen. Erst am {Morgen|gk} ließ der Sturm nach. Beim {Aufräumen|gk} halfen alle {Nachbarn|gk} mit, und am {Abend|al} saßen sie {gemeinsam|lt} beim {Essen|gk}." },

/* ---------- Klasse 5 ---------- */
{ k: 5, s: "l", v: "A", t: "Die neue Schule", x: "Nach den {Sommerferien|sch} beginnt für Lena ein neuer {Abschnitt|gk}. Sie {wechselt|x} auf eine {weiterführende|dh} {Schule|gk}. Das {Gebäude|ae} ist {riesig|ig}, und {anfangs|gk} {verläuft|vf} sie sich in den langen {Fluren|gk}. Statt einer {Klassenlehrerin|dh} hat sie nun viele {Lehrkräfte|ae}. Besonders {spannend|sp} findet sie die neuen {Fächer|ae}. Zum {Glück|ck} ist ihre {Freundin|gk} Ronja in derselben {Klasse|ss}. Lena {merkt|lt} schnell, {dass|dd} sie sich vor {nichts|gk} {fürchten|lt} muss." },
{ k: 5, s: "l", v: "B", t: "Das Haustier", x: "Seit einem {halben|lt} {Jahr|dh} wünscht sich Mats ein {Meerschweinchen|dv}. Seine {Eltern|gk} sind {zunächst|ae} {skeptisch|gk}, denn ein {Haustier|ie} macht viel {Arbeit|gk}. Mats {verspricht|vf}, sich um alles zu {kümmern|sch}. Er liest {Bücher|gk} und {erfährt|ae}, {dass|dd} {Meerschweinchen|gk} nie {allein|sch} leben sollten. {Deshalb|al} ziehen zwei {Tiere|ie} ein. Jeden {Tag|al} {füttert|sch} er sie mit {Heu|lt} und {frischem|lt} {Gemüse|gk}. Zum {Glück|ck} {quieken|ie} die beiden {zufrieden|ie}." },
{ k: 5, s: "m", v: "A", t: "Die Mondlandung", x: "Im {Sommer|sch} 1969 betrat zum {ersten|gk} Mal ein {Mensch|gk} den {Mond|al}. Der {Astronaut|gk} stieg aus der {Landefähre|ae} und setzte seinen {Fuß|ss} auf die {staubige|ig} {Oberfläche|ae}. {Millionen|sch} {Menschen|gk} {verfolgten|vf} das {Ereignis|ss} vor dem {Fernseher|gk}. Die {Reise|ss} hatte etwa vier {Tage|gk} gedauert. Auf dem {Mond|al} gibt es keine {Luft|lt} zum {Atmen|gk}, {deshalb|al} trugen die {Astronauten|gk} schwere {Anzüge|ae}. Sie {sammelten|sch} {Gesteinsproben|sp} und {stellten|sch} eine {Flagge|sch} auf. Ihre {Fußspuren|ss} sind {vermutlich|ig} bis heute zu sehen." },
{ k: 5, s: "m", v: "B", t: "Die Talsperre", x: "Im {Gebirge|gk} gibt es viele {große|ss} {Talsperren|sp}. Dabei wird ein {Fluss|ss} mit einer {gewaltigen|ig} {Mauer|gk} {aufgestaut|sp}, {sodass|dd} ein {künstlicher|ig} {See|dv} entsteht. Bei {starkem|sp} {Regen|gk} halten {Talsperren|gk} {Wasser|ss} zurück und {schützen|ck} so die {Dörfer|ae} im {Tal|gk} vor {Hochwasser|gk}. In {trockenen|ck} {Zeiten|gk} geben sie Wasser ab, damit die {Flüsse|ss} nicht {austrocknen|ck}. {Außerdem|ss} liefern sie {Trinkwasser|gk} für viele {Haushalte|gk}. Mit {Turbinen|gk} wird {zusätzlich|ig} {Strom|sp} {erzeugt|al}. Damit das Wasser {sauber|lt} {bleibt|al}, ist das {Baden|gk} oft {verboten|vf}." },
{ k: 5, s: "s", v: "A", t: "Der Fund im Moor", x: "Als ein {Bauer|gk} im {Frühjahr|dh} {Torf|gk} aus einem {Moor|dv} stach, machte er eine {unheimliche|ig} {Entdeckung|ck}. Zwischen den {nassen|ss} {Schichten|gk} lag ein {menschlicher|ig} {Körper|gk}, der {erstaunlich|ig} gut {erhalten|lt} war. {Zunächst|ae} {vermutete|vf} man ein {Verbrechen|vf} und {alarmierte|gk} die {Polizei|gk}. Doch die {Untersuchungen|gk} {ergaben|lt}, {dass|dd} der Mann vor über {zweitausend|lt} {Jahren|dh} gestorben war. Im Moor gibt es kaum {Sauerstoff|sch}, und das {saure|lt} {Wasser|ss} {verhindert|vf} das {Verwesen|gk}. {Deshalb|al} {blieben|ie} {Haut|lt}, {Haare|dv} und sogar {Kleidung|gk} {erhalten|lt}. Heute ist der {Fund|al} in einem {Museum|gk} {ausgestellt|sp}." },
{ k: 5, s: "s", v: "B", t: "Die neue Brücke", x: "Seit {Jahren|dh} war die alte {Holzbrücke|ck} über den {Fluss|ss} {baufällig|ig}. Bei jedem {Hochwasser|gk} {befürchteten|lt} die {Bewohner|dh}, {dass|dd} sie {einstürzen|sp} könnte. {Schließlich|ig} {beschloss|ss} der {Gemeinderat|gk}, eine neue {Brücke|ck} aus {Stahl|dh} und {Beton|gk} zu bauen. Zuerst {mussten|ss} {Ingenieure|ie} den {Untergrund|al} {genau|lt} {untersuchen|gk}. {Riesige|ie} {Pfeiler|gk} wurden tief in den {Boden|gk} {gerammt|sch}, damit alles {stabil|lt} steht. {Während|dh} der {Bauzeit|gk} {mussten|ss} die {Fußgänger|ae} einen langen {Umweg|al} {gehen|sh}. Nach {achtzehn|dh} {Monaten|gk} war die Brücke {endlich|ig} fertig. Zur {Eröffnung|sch} feierte das ganze {Dorf|gk} ein großes {Fest|sp}." },

/* ---------- Klasse 6 ---------- */
{ k: 6, s: "l", v: "A", t: "Die Hütte in den Bergen", x: "Für die {Klassenfahrt|gk} hatte sich die 6b eine {Hütte|sch} in den {Bergen|gk} {ausgesucht|lt}. Nach einer langen {Busfahrt|dh} {mussten|ss} alle die {letzten|sch} drei {Kilometer|gk} zu {Fuß|ss} gehen. Oben {angekommen|sch}, wurden sie mit einem {herrlichen|ig} {Ausblick|ck} {belohnt|dh}. Jeden {Tag|al} stand eine andere {Wanderung|gk} auf dem {Programm|sch}. Einmal {erreichten|lt} sie einen {Gipfel|gk}, auf dem noch {Schnee|dv} lag. {Abends|al} saßen alle am {Lagerfeuer|gk} und {erzählten|ae} sich {Geschichten|gk}. Am meisten {beeindruckte|ck} sie, {dass|dd} es weder {Fernseher|gk} noch {Internet|gk} gab." },
{ k: 6, s: "l", v: "B", t: "Der Flohmarkt", x: "Die {Schülervertretung|vf} hatte {beschlossen|ss}, einen {Flohmarkt|dh} zu {veranstalten|vf}. Der {Erlös|ss} sollte einem {Tierheim|ie} {zugutekommen|gk}. {Wochenlang|gk} {sammelten|sch} die {Jugendlichen|ig} {Bücher|gk}, {Spiele|sp} und {Kleidung|gk}. Am {Samstag|al} bauten sie früh die {Tische|gk} in der {Aula|lt} auf. Kurz nach der {Eröffnung|sch} {drängten|ae} sich die {Besucher|gk} an den {Ständen|ae}. Besonders {begehrt|dh} waren die {selbst|lt} {gebackenen|ck} {Kuchen|gk}. Am {Nachmittag|gk} {zählten|ae} sie das Geld. Es war {mehr|dh}, als alle {erwartet|lt} hatten, und die {Leiterin|gk} {bedankte|lt} sich {herzlich|ig}." },
{ k: 6, s: "m", v: "A", t: "Die Laufmaschine", x: "Im {Jahr|dh} 1817 stellte Karl Drais eine {ungewöhnliche|ig} {Erfindung|gk} vor: eine {Laufmaschine|gk} aus {Holz|lt} mit zwei {Rädern|ae}. Der {Fahrer|dh} saß auf einem {Sattel|sch} und {stieß|ss} sich mit den {Füßen|ss} vom {Boden|gk} ab. {Pedale|gk} gab es noch nicht. Viele {belächelten|ae} das {seltsame|lt} {Gefährt|ae}, doch Drais legte damit den {Grundstein|sp} für das {moderne|lt} {Fahrrad|al}. Später {befestigte|lt} man {Pedale|gk} am {Vorderrad|vf}, dann setzte sich die {Kette|sch} durch. Mit {luftgefüllten|sch} {Reifen|gk} wurde das {Fahren|gk} {deutlich|ig} {bequemer|lt}. Heute ist das Fahrrad {günstig|ig}, {umweltfreundlich|ig} und hält {fit|lt}." },
{ k: 6, s: "m", v: "B", t: "Die Rettungshunde", x: "Wenn nach einem {Erdbeben|al} {Menschen|gk} unter {Trümmern|sch} {verschüttet|vf} sind, zählt jede {Minute|gk}. Dann kommen oft {Rettungshunde|sch} zum {Einsatz|gk}. Mit ihrer {feinen|lt} {Nase|gk} können sie Menschen unter {dicken|ck} {Schichten|gk} {aufspüren|sp}. Die {Ausbildung|gk} {dauert|lt} etwa zwei bis drei {Jahre|dh}. Dabei lernt der {Hund|al}, über {wackelige|ck} {Untergründe|gk} zu laufen und sich von {Lärm|ae} nicht {ablenken|lt} zu {lassen|ss}. Hat er einen Menschen {gefunden|lt}, zeigt er dies durch {lautes|lt} {Bellen|gk} an. {Hundeführer|dh} und Hund müssen sich {blind|al} {vertrauen|vf}. Viele {Teams|gk} arbeiten {ehrenamtlich|ig} und sind {ständig|ig} {einsatzbereit|lt}." },
{ k: 6, s: "s", v: "A", t: "Das Wattenmeer", x: "Das {Wattenmeer|sch} an der {Nordseeküste|dv} ist eine {einzigartige|ig} {Landschaft|al}. Zweimal am {Tag|al} {weicht|lt} das Meer bei {Ebbe|sch} zurück und gibt einen {breiten|lt} {Streifen|sp} {Meeresboden|dv} frei. Etwa sechs {Stunden|sp} später kehrt das {Wasser|ss} mit der {Flut|lt} zurück. Auf den ersten {Blick|ck} wirkt das {Watt|sch} {leblos|al}. {Tatsächlich|ig} ist es jedoch einer der {artenreichsten|lt} {Lebensräume|ae} der {Erde|gk}. In einem {Quadratmeter|gk} {Schlick|ck} leben {Tausende|gk} {winziger|ig} {Lebewesen|gk} wie {Würmer|gk}, {Muscheln|gk} und {Schnecken|ck}. Sie sind die {Nahrung|dh} für {Millionen|sch} von {Zugvögeln|al}. Wer eine {Wattwanderung|gk} {unternehmen|dh} möchte, sollte dies nur mit einem {erfahrenen|dh} {Führer|dh} tun, denn das {zurückkehrende|ck} Wasser wird oft {unterschätzt|ae}." },
{ k: 6, s: "s", v: "B", t: "Die Burg", x: "Im {Mittelalter|sch} {errichteten|sch} {Adlige|ig} ihre {Burgen|gk} gern auf {Bergen|gk} oder {umgeben|lt} von {Wasser|ss}. So {konnten|sch} {Feinde|gk} schon von {Weitem|gk} {erkannt|sch} werden. Eine {mächtige|ig} {Ringmauer|gk} mit {Zinnen|sch} {schützte|ck} die {Bewohner|dh}. Der {Zugang|gk} {führte|dh} meist über eine {Zugbrücke|ck}, die bei {Gefahr|dh} {hochgezogen|lt} wurde. Das {Herzstück|ck} war der {Bergfried|ie}, ein {hoher|sh} {Turm|lt} für den {äußersten|ss} {Notfall|gk}. Das {Leben|gk} auf einer Burg war {allerdings|sch} {weniger|lt} {romantisch|gk}, als man heute oft {glaubt|al}. Im {Winter|gk} war es {kalt|lt} und {zugig|ig}, und die {Räume|ae} wurden nur {spärlich|ae} {beheizt|lt}. Mit der {Erfindung|gk} von {Kanonen|gk} {verloren|vf} die Burgen ihre {Bedeutung|gk}." },

/* ---------- Klasse 7 ---------- */
{ k: 7, s: "l", v: "A", t: "Der Schüleraustausch", x: "Im {Frühjahr|dh} nahm Anton an einem {Schüleraustausch|gk} mit {Frankreich|gk} teil. Zwei {Wochen|gk} lang wohnte er bei der {Familie|gk} seines {Austauschpartners|gk} in der Nähe von Lyon. {Anfangs|gk} fiel es ihm {schwer|lt}, alles zu {verstehen|vf}, denn die Familie {sprach|sp} {schnell|sch}. Doch von {Tag|al} zu Tag {traute|lt} er sich mehr. Am {Vormittag|gk} {besuchten|lt} die {Deutschen|gk} den {Unterricht|gk}, am {Nachmittag|gk} standen {Ausflüge|gk} auf dem {Programm|sch}. {Besonders|ss} {beeindruckte|ck} ihn, {dass|dd} das {Abendessen|gk} erst {gegen|lt} neun {Uhr|dh} begann. Zum {Abschied|ie} {versprachen|vf} sich die beiden, in {Kontakt|gk} zu bleiben." },
{ k: 7, s: "l", v: "B", t: "Das Ehrenamt", x: "Jeden {Donnerstagnachmittag|gk} hilft Malin in einem {Seniorenheim|gk} in ihrer {Nachbarschaft|gk}. Dort liest sie den {Bewohnern|dh} aus der {Zeitung|gk} vor oder spielt mit ihnen {Brettspiele|sch}. Am {Anfang|gk} war sie {unsicher|lt}, worüber sie sich {unterhalten|lt} sollte. {Inzwischen|sch} freut sie sich jede {Woche|gk} auf die {Besuche|lt}. {Besonders|ss} gern hört sie {Herrn|sch} Lehmann zu, der {früher|dh} als {Seemann|dv} um die Welt {gefahren|dh} ist. Malin hat {gemerkt|lt}, {dass|dd} ihr das {Ehrenamt|gk} nicht nur {Spaß|sp} macht. Für ihr {Engagement|gk} wurde sie im {vergangenen|vf} Jahr von der {Stadt|gk} {ausgezeichnet|lt}." },
{ k: 7, s: "m", v: "A", t: "Smartphones", x: "{Smartphones|gk} sind aus dem {Alltag|gk} vieler {Jugendlicher|ig} kaum {wegzudenken|gk}. Sie dienen zum {Kommunizieren|gk}, zum {Musikhören|gk} und zum {Recherchieren|gk} für die {Schule|gk}. {Laut|lt} {aktuellen|sch} {Studien|sp} {verbringen|vf} {Jugendliche|ig} {täglich|ig} {mehrere|dh} {Stunden|sp} mit ihrem {Gerät|ae}. {Fachleute|gk} weisen {darauf|lt} hin, {dass|dd} eine zu {intensive|vf} {Nutzung|ck} {Nachteile|gk} haben kann. Wer {ständig|ig} auf {Nachrichten|gk} {reagiert|ie}, kann sich {schlechter|lt} {konzentrieren|ie}. {Andererseits|gk} bieten Smartphones {Chancen|gk}, etwa beim {Lernen|gk} mit {Apps|sch}. {Entscheidend|al} ist ein {bewusster|ss} {Umgang|gk}. Viele {Familien|gk} {vereinbaren|vf} {deshalb|al} feste {Regeln|gk}." },
{ k: 7, s: "m", v: "B", t: "Die Schrift", x: "Lange {bevor|vf} es {Bücher|gk} gab, suchten die {Menschen|gk} nach {Möglichkeiten|ig}, {Informationen|gk} {dauerhaft|lt} {festzuhalten|gk}. Eine der {ältesten|ae} {Schriften|gk} {entstand|sp} vor über {fünftausend|al} {Jahren|dh} in {Mesopotamien|gk}. Dort {drückten|ck} {Schreiber|gk} {keilförmige|lt} {Zeichen|gk} in {feuchte|lt} {Tontafeln|gk}. {Ungefähr|ae} zur {gleichen|lt} Zeit {entwickelten|ck} die {Ägypter|ae} ihre {Hieroglyphen|ie}. Das {Erlernen|gk} war {mühsam|dh} und nur {wenigen|lt} {vorbehalten|vf}. Einen {Fortschritt|sch} brachte das {Alphabet|gk}, bei dem jedes {Zeichen|gk} für einen {Laut|lt} steht. {Dadurch|lt} {genügten|lt} wenige {Buchstaben|sp}, {sodass|dd} man alle {Wörter|gk} {aufschreiben|lt} konnte." },
{ k: 7, s: "s", v: "A", t: "Die Rückkehr des Wolfs", x: "Mehr als {hundert|lt} {Jahre|dh} lang galt der {Wolf|vf} in {Deutschland|al} als {ausgerottet|sch}. Um das {Jahr|dh} 2000 {wanderten|lt} jedoch die {ersten|gk} {Tiere|ie} aus {Polen|gk} ein und {gründeten|lt} ein neues {Rudel|gk}. {Seitdem|lt} hat sich der {Bestand|al} {deutlich|ig} {vergrößert|vf}. Für {Naturschützer|ck} ist die {Rückkehr|ck} ein {Erfolg|al}, denn als {Raubtier|ie} spielt der Wolf eine {wichtige|ig} {Rolle|sch} im {Ökosystem|gk}. Er {erbeutet|lt} vor allem {Rehe|sh}, {Hirsche|gk} und {Wildschweine|al} und hält deren {Bestände|ae} im {Gleichgewicht|gk}. Viele {Schäfer|ae} sehen die {Entwicklung|ck} {dagegen|lt} {kritisch|gk}, da Wölfe {gelegentlich|ig} {Schafe|gk} {reißen|ss}. Um {Konflikte|gk} zu {verringern|vf}, wird der {Bau|lt} von {Zäunen|ae} {gefördert|lt}. {Fachleute|gk} {betonen|lt}, {dass|dd} Wölfe {Menschen|gk} {gegenüber|lt} {normalerweise|gk} {scheu|lt} sind." },
{ k: 7, s: "s", v: "B", t: "Der Traum vom Fliegen", x: "Schon immer {träumten|ae} {Menschen|gk} davon, sich wie die {Vögel|vf} in die {Luft|lt} zu {erheben|lt}. {Zahlreiche|dh} {Erfinder|gk} bauten im {Lauf|lt} der {Jahrhunderte|dh} {Flugapparate|sch}, die meist {kläglich|ig} {scheiterten|lt}. Einer der {Ersten|gk}, die {wirklich|ig} {erfolgreich|ig} {waren|lt}, war Otto Lilienthal. Ende des 19. {Jahrhunderts|dh} {unternahm|dh} der {mutige|lt} {Ingenieur|gk} über {tausend|al} {Gleitflüge|gk} mit {selbst|lt} {gebauten|lt} {Flugzeugen|gk} aus {Weidenholz|lt}. Lilienthal {verunglückte|vf} {später|sp} bei einem {Flug|al} {tödlich|ig}. Dabei {beobachtete|lt} er, wie {Störche|gk} ihre {Flügel|gk} {einsetzen|ck}, und {übertrug|al} seine {Erkenntnisse|ss}. 1903 {gelang|lt} den {Brüdern|gk} Wright der erste {gesteuerte|lt} {Motorflug|gk}. Er {dauerte|lt} zwar nur zwölf {Sekunden|gk}, doch er {markierte|ie} den {Beginn|sch} eines neuen {Zeitalters|gk}. Heute {befördern|vf} {Flugzeuge|gk} {Milliarden|sch} von {Passagieren|ie}." },

/* ---------- Klasse 8 ---------- */
{ k: 8, s: "l", v: "A", t: "Die Berufsmesse", x: "Einmal im {Jahr|dh} {findet|lt} in unserer {Stadt|gk} eine große {Berufsmesse|ss} statt. {Zahlreiche|dh} {Betriebe|ie} und {Hochschulen|gk} stellen sich an ihren {Ständen|ae} vor. Für die {Achtklässler|ss} ist der {Besuch|gk} Teil der {Berufsorientierung|gk}. Im {Vorfeld|vf} hatte jeder {überlegt|al}, welche {Bereiche|gk} ihn {interessieren|ie}. Am {Stand|al} eines {Krankenhauses|gk} durfte man den {Blutdruck|ck} {messen|ss}, bei einer {Schreinerei|gk} konnte man ein {Werkstück|ck} {anfertigen|lt}. Viele {Auszubildende|gk} {berichteten|lt} offen von ihren {Erfahrungen|dh}. Am {Ende|gk} {waren|lt} sich die {meisten|gk} {einig|ig}, {dass|dd} sich der Besuch {gelohnt|dh} hatte." },
{ k: 8, s: "l", v: "B", t: "Die Schülerzeitung", x: "Seit diesem {Schuljahr|dh} gibt es an unserer {Schule|gk} wieder eine {Schülerzeitung|gk}. Zehn {Jugendliche|ig} {treffen|sch} sich jeden {Mittwoch|sch} in der {Bibliothek|gk}. {Gemeinsam|lt} {überlegen|lt} sie, worüber sie {berichten|lt} wollen. Es gibt {Interviews|gk} mit {Lehrkräften|ae}, {Berichte|gk} über {Turniere|ie} und eine {Rätselseite|ae}. {Besonders|ss} {beliebt|ie} ist die {Rubrik|gk}, in der {Schülerinnen|gk} ihre {Meinung|gk} {äußern|ss} können. {Bevor|vf} ein {Text|x} {erscheint|lt}, liest die {Redaktion|gk} {sorgfältig|ig} {Korrektur|sch}. Vom {Erlös|ss} {finanziert|ie} die Redaktion den {Druck|ck} der {nächsten|ae} {Ausgabe|gk}. Alle sind sich {einig|ig}, {dass|dd} sich die {Arbeit|gk} {lohnt|dh}." },
{ k: 8, s: "m", v: "A", t: "Mikroplastik", x: "Als {Mikroplastik|gk} {bezeichnet|lt} man {Kunststoffteilchen|ig}, die {kleiner|lt} als fünf {Millimeter|sch} sind. Ein Teil davon wird {gezielt|ie} {hergestellt|sch}, etwa für {Kosmetik|gk}. Der {größere|ss} {Anteil|gk} {entsteht|sp} jedoch, wenn {Plastikgegenstände|ae} durch {Sonne|sch} und {Wasser|ss} {allmählich|dh} {zerfallen|sch}. Auch beim {Waschen|gk} von {Kleidung|gk} aus {Kunstfasern|gk} lösen sich {winzige|ig} {Fasern|gk}, die über das {Abwasser|ss} ins {Meer|dv} {gelangen|lt}. {Kläranlagen|ae} können diese {Partikel|gk} nur {teilweise|lt} {zurückhalten|ck}. {Inzwischen|sch} wurde {Mikroplastik|gk} {nahezu|dh} {überall|sch} {nachgewiesen|ie}, sogar im {Schnee|dv} der {Arktis|gk}. {Fachleute|gk} {empfehlen|dh}, den {Verbrauch|vf} zu {verringern|vf}." },
{ k: 8, s: "m", v: "B", t: "Die Digitalisierung", x: "Kaum ein {Bereich|gk} der {Arbeitswelt|gk} bleibt von der {Digitalisierung|ig} {unberührt|dh}. In {Fabriken|ie} {übernehmen|dh} {Roboter|gk} {zunehmend|al} {Aufgaben|gk}, die {früher|dh} von {Menschen|gk} {erledigt|ig} wurden. {Lagerhäuser|ae} werden mit {Programmen|sch} {gesteuert|lt}, und in vielen {Büros|gk} {ersetzen|ck} {digitale|ig} {Abläufe|ae} die {Papierakten|ie}. {Kritiker|gk} {befürchten|lt}, {dass|dd} {Arbeitsplätze|ae} {verloren|vf} gehen. Andere {weisen|ss} {darauf|lt} hin, {dass|dd} neue {Berufe|gk} {entstehen|sp}, etwa in der {Softwareentwicklung|ck}. Neben {Fachwissen|ss} {gewinnen|sch} {Fähigkeiten|ig} wie {Teamarbeit|gk} an {Bedeutung|gk}. Für {Schüler|gk} {bedeutet|lt} das, offen für {Veränderungen|vf} zu {bleiben|lt}." },
{ k: 8, s: "s", v: "A", t: "Das Grundgesetz", x: "Am 23. Mai 1949 trat in der {Bundesrepublik|gk} das {Grundgesetz|ck} in {Kraft|gk}. Seine {Verfasser|vf} hatten die {Erfahrungen|dh} der {nationalsozialistischen|gk} {Diktatur|gk} noch {unmittelbar|sch} vor {Augen|gk}. {Deshalb|al} stellten sie an den {Anfang|gk} den Satz, {dass|dd} die {Würde|gk} des {Menschen|gk} {unantastbar|lt} sei. {Daraus|lt} folgt, {dass|dd} der {Staat|dv} jeden {Einzelnen|gk} {achten|lt} und {schützen|ck} muss, {unabhängig|ig} von {Herkunft|gk}, {Geschlecht|gk}, {Religion|gk} oder {Meinung|gk}. Im {Grundgesetz|gk} sind {zahlreiche|dh} {Grundrechte|al} {festgeschrieben|ie}, {beispielsweise|ie} die {Meinungsfreiheit|gk} und die {Pressefreiheit|ss}. Über ihre {Einhaltung|gk} {wacht|lt} das {Bundesverfassungsgericht|vf} in {Karlsruhe|sh}. Viele {Fachleute|gk} {halten|lt} das {Grundgesetz|gk} für eine der {erfolgreichsten|ig} {Verfassungen|vf} der {Welt|gk}." },
{ k: 8, s: "s", v: "B", t: "Antibiotika", x: "Im {Jahr|dh} 1928 machte der {Bakteriologe|gk} Alexander Fleming eine {folgenreiche|vf} {Entdeckung|ck}. Als er aus dem {Urlaub|al} in sein {Labor|gk} {zurückkehrte|ck}, {bemerkte|lt} er, {dass|dd} auf einer {Bakterienkultur|gk} ein {Schimmelpilz|sch} {gewachsen|x} war. Rund um den {Pilz|gk} waren die {Bakterien|gk} {abgestorben|sp}. Fleming {erkannte|sch}, {dass|dd} der {Schimmel|sch} einen {Stoff|sp} {absonderte|lt}, der {Bakterien|gk} {abtötet|ae}, und nannte ihn {Penicillin|sch}. Es {dauerte|lt} noch {Jahre|dh}, bis man das {Medikament|gk} in großen {Mengen|gk} {herstellen|sch} konnte. {Seitdem|lt} haben {Antibiotika|gk} {unzähligen|ae} {Menschen|gk} das {Leben|gk} {gerettet|sch}. {Inzwischen|sch} {bereitet|lt} es {Sorge|gk}, {dass|dd} {immer|sch} mehr {Bakterien|gk} {unempfindlich|ig} werden. Diese {Resistenzen|gk} {entstehen|sp}, wenn {Antibiotika|gk} zu {häufig|ig} {eingesetzt|ck} werden." },
];

/* Bereiche der Test-Diktate: Strategie-Ebene und ab welcher Klasse der Bereich in der Regel gesichert sein sollte
   (pädagogische Orientierung nach gängigen Lehrplänen – keine Normwerte) */
const DK_EBENEN = [
    ["alphabetisch", "Alphabetische Strategie – lautgetreu schreiben"],
    ["orthografisch", "Orthografische Strategie – Merkelemente und Regeln"],
    ["morphematisch", "Morphematische Strategie – verlängern und ableiten"],
    ["wortuebergreifend", "Wortübergreifende Strategie – Groß/klein, das/dass"],
];
const DK_BEREICHE = {
    lautgetreu:  { name: "Lautgetreue Wörter", ebene: "alphabetisch", ab: 1 },
    schaerfung:  { ebene: "orthografisch", ab: 2 }, cktz: { ebene: "orthografisch", ab: 2 }, ie: { ebene: "orthografisch", ab: 2 },
    spst:        { ebene: "orthografisch", ab: 2 }, dehnung: { ebene: "orthografisch", ab: 3 }, sss: { ebene: "orthografisch", ab: 3 },
    doppelvokal: { ebene: "orthografisch", ab: 3 }, silbenh: { ebene: "orthografisch", ab: 3 }, vf: { ebene: "orthografisch", ab: 3 },
    chsx:        { ebene: "orthografisch", ab: 4 },
    auslaut:     { ebene: "morphematisch", ab: 2 }, aeau: { ebene: "morphematisch", ab: 3 }, iglich: { ebene: "morphematisch", ab: 4 },
    grossklein:  { ebene: "wortuebergreifend", ab: 2 }, dasdass: { ebene: "wortuebergreifend", ab: 4 },
};
function dk_bereichName(b){ return (DK_BEREICHE[b] && DK_BEREICHE[b].name) || (RS_NAMEN[b] ? RS_NAMEN[b].name : b); }
const DK_KEY = { lt: "lautgetreu", sch: "schaerfung", ck: "cktz", dh: "dehnung", ie: "ie", ss: "sss", al: "auslaut", ae: "aeau", gk: "grossklein",
    dd: "dasdass", vf: "vf", dv: "doppelvokal", ig: "iglich", sp: "spst", sh: "silbenh", x: "chsx" };

// Aus den markierten Rohtexten: Text, feste Prüfwörter und echte Parallelformen
// (je Klasse/Stufe zählen pro Bereich nur so viele Prüfwörter, wie beide Formen A und B haben)
const DK_TEXTE = (function(){
    const texte = DK_ROH.map(t => {
        const alle = [];
        const x = t.x.replace(/\{([^|}]+)\|(\w+)\}/g, (m, w, k) => { alle.push({ w, b: DK_KEY[k] || k }); return w; });
        return { k: t.k, s: t.s, v: t.v, titel: t.t, t: `${t.t} (Form ${t.v})`, x, pwAlle: alle };
    });
    const gruppen = {};
    texte.forEach(t => (gruppen[t.k + t.s] = gruppen[t.k + t.s] || []).push(t));
    Object.values(gruppen).forEach(g => {
        const grenze = {};
        g.forEach(t => t.pwAlle.forEach(p => { grenze[p.b] = Math.min(...g.map(u => u.pwAlle.filter(q => q.b === p.b).length)); }));
        g.forEach(t => {
            const gezaehlt = {};
            t.pw = t.pwAlle.filter(p => (gezaehlt[p.b] = (gezaehlt[p.b] || 0) + 1) <= grenze[p.b]);
        });
    });
    return texte;
})();

/* ---------- Lesetexte mit Aufgaben & Test-Diktate ---------- */
const LT_STUFEN = { l: "leicht", m: "mittel", s: "schwer" };
const LT_SCHRIFT = { 1: 30, 2: 27, 3: 25, 4: 23, 5: 21, 6: 20, 7: 19, 8: 19 };
const LT_ABSTAND = { 1: 2.3, 2: 2.2, 3: 2.0, 4: 1.9, 5: 1.8, 6: 1.75, 7: 1.7, 8: 1.7 };
const LT_AUFGABEN = [
    { key: "fragen",   kurz: "Fragen",        name: "Fragen zum Text (ankreuzen, richtig/falsch)", standard: true },
    { key: "offen",    kurz: "W-Fragen",      name: "W-Fragen beantworten (schreiben)" },
    { key: "luecke",   kurz: "Lückentext",    name: "Lückentext", standard: true },
    { key: "ordnen",   kurz: "Sätze ordnen",  name: "Sätze in die richtige Reihenfolge bringen" },
    { key: "haelften", kurz: "Satzhälften",   name: "Satzhälften verbinden" },
    { key: "fehler",   kurz: "Lies genau!",   name: "Lies genau! Falsche Wörter finden" },
    { key: "training", kurz: "Lesetraining",  name: "Lesetraining (schwierige Wörter, Lesezeit)", standard: true },
];

function lt_saetze(text){
    return text.replace(/\s+/g, " ").trim().split(/(?<=[.!?][“"]?)\s+(?=[„"A-ZÄÖÜ])/).filter(Boolean);
}
function lt_woerter(text){ return text.split(/\s+/).filter(w => /[A-Za-zÄÖÜäöüß]/.test(w)); }
function lt_umfang(wert){ return { klein: 0, mittel: 1, gross: 2 }[wert] ?? 1; }

function lt_textAuswahlFuellen(prefix, bank){
    const k = parseInt(lt_wert(prefix + "-klasse"), 10) || 2, s = lt_wert(prefix + "-stufe") || "m";
    const sel = document.getElementById(prefix + "-text");
    if (!sel) return;
    const passend = bank.map((t, i) => ({ t, i })).filter(x => x.t.k === k && x.t.s === s);
    sel.innerHTML = `<option value="zufall">zufällig (Klasse ${k}, ${LT_STUFEN[s]})</option>` +
        passend.map(x => `<option value="${x.i}">${ws_esc(x.t.t)} · ${lt_woerter(x.t.x).length} Wörter</option>`).join("") +
        `<optgroup label="Andere Klassen/Stufen">${bank.map((t, i) => (t.k === k && t.s === s) ? "" : `<option value="${i}">Kl. ${t.k} ${LT_STUFEN[t.s]}: ${ws_esc(t.t)}</option>`).join("")}</optgroup>` +
        `<option value="eigen">✎ eigener Text …</option>`;
    lt_eigenZeigen(prefix);
}
function lt_eigenZeigen(prefix){
    const feld = document.getElementById(prefix + "-eigen");
    if (feld) feld.style.display = lt_wert(prefix + "-text") === "eigen" ? "" : "none";
}
function lt_textHolen(prefix, bank){
    const wahl = lt_wert(prefix + "-text"), k = parseInt(lt_wert(prefix + "-klasse"), 10) || 2, s = lt_wert(prefix + "-stufe") || "m";
    if (wahl === "eigen"){
        const x = (lt_wert(prefix + "-eigen-text") || "").trim();
        return x ? { k, s, t: lt_wert(prefix + "-eigen-titel").trim() || "Mein Text", x, eigen: true } : null;
    }
    if (wahl === "zufall" || wahl === ""){
        const passend = bank.filter(t => t.k === k && t.s === s);
        return zufallsElement(passend.length ? passend : bank);
    }
    return bank[parseInt(wahl, 10)] || bank[0];
}

/* --- gemeinsame Seitenaufteilung für lange Texte (Silbentext, Lesetext) --- */
async function st_paginieren(box, bereich, nr, opt, tokens, ende, reif){
    const stil = `font-size:${opt.groesse}px; line-height:${opt.abstand}; font-family:'${opt.schrift}', 'Andika', sans-serif;`;
    const klasse = "st-text" + (opt.art === "boegen" ? " st-schwarz" : "");
    let start = 0, seite = 0;
    while (start < tokens.length && seite < 40){
        seite++;
        const titel = seite === 1 ? opt.titel : opt.titel + " (Fortsetzung)";
        box.insertAdjacentHTML("beforeend", fs_seite(bereich, nr, ws_esc(titel), `<div class="${klasse}" style="${stil}"></div><div class="st-ende" style="display:flex; flex-direction:column; gap:14px; flex:1;"></div>`, { max: 1, reif, info: true }));
        const blatt = box.lastElementChild;
        const rahmen = blatt.querySelector(".ws-rahmen"), inhalt = blatt.querySelector(".ws-inhalt");
        const textEl = blatt.querySelector(".st-text"), endeEl = blatt.querySelector(".st-ende");
        inhalt.style.transform = ""; inhalt.style.height = "auto"; inhalt.style.width = rahmen.clientWidth + "px";
        const H = rahmen.clientHeight - 4;
        const passt = bis => {
            textEl.innerHTML = st_html(tokens.slice(start, bis), opt);
            endeEl.innerHTML = (bis >= tokens.length && ende) ? ende : "";
            return inhalt.scrollHeight <= H;
        };
        let beste = start;
        if (passt(tokens.length)) beste = tokens.length;
        else {
            let lo = start + 1, hi = tokens.length - 1;
            while (lo <= hi){ const mitte = (lo + hi) >> 1; if (passt(mitte)){ beste = mitte; lo = mitte + 1; } else hi = mitte - 1; }
            for (let k = beste; k > start + Math.floor((beste - start) * 0.7); k--){ if (tokens[k - 1] && (tokens[k - 1].satzende || tokens[k - 1].typ === "absatz")){ beste = k; break; } }
        }
        if (beste <= start) beste = start + 1;
        passt(beste);
        start = beste;
        if (start >= tokens.length && ende && !endeEl.innerHTML){
            box.insertAdjacentHTML("beforeend", fs_seite(bereich, nr, ws_esc(opt.titel), `<div class="st-ende" style="display:flex; flex-direction:column; gap:14px; flex:1;">${ende}</div>`, { max: 1, reif, info: true }));
        }
    }
}

/* --- Lesetext-Kontext --- */
let lt_letzter = null;
function lt_kontext(){
    const text = lt_textHolen("lt", LT_TEXTE);
    lt_letzter = text;
    const klasse = text ? (text.eigen ? text.k : text.k) : 2;
    return { lt: { text, klasse, stufe: text ? text.s : "m", umfang: lt_umfang(lt_wert("lt-umfang")), art: lt_wert("lt-art") || "farbig",
        saetze: text ? lt_saetze(text.x) : [], reif: klasse >= 5 } };
}
function lt_aufgabenGewaehlt(){ return [...document.querySelectorAll(".lt-aufgabe:checked")].map(c => c.value); }
function lt_dynamisch(ctx){
    const t = ctx.lt.text;
    const liste = [{ kurz: "Lesetext", name: "Lesetext" }];
    LT_AUFGABEN.forEach(a => {
        if (!lt_aufgabenGewaehlt().includes(a.key)) return;
        if (t && t.eigen && (a.key === "fragen" || a.key === "offen")) return;   // eigene Texte haben keine vorbereiteten Fragen
        liste.push({ kurz: a.kurz, name: a.name, bau: LT_BAU[a.key] });
    });
    return liste.map((b, i) => ({ ...b, nr: String(i + 1) }));
}
async function lt_erstellen(box, ctx){
    await silben_laden();
    if (document.fonts && document.fonts.load) await Promise.all([document.fonts.load("400 24px Andika"), document.fonts.load("400 24px 'Atkinson Hyperlegible'")]).catch(() => {});
    const lt = ctx.lt, t = lt.text;
    const opt = { titel: t.t, art: lt.art, groesse: LT_SCHRIFT[lt.klasse] || 22, abstand: LT_ABSTAND[lt.klasse] || 1.9,
        schrift: lt.reif ? "Atkinson Hyperlegible" : "Andika", saetze: lt_an("lt-satzweise") };
    const ende = `<div class="st-protokoll">Ich habe den Text <span class="ws-linie2"></span> mal gelesen. <span>Zeit: <span class="ws-linie2"></span> Sek.</span> <span>${lt_woerter(t.x).length} Wörter</span></div>` +
        (lt.klasse <= 4
            ? `<div class="st-malbox" style="min-height:90px;">Male ein Bild zum Text:</div>`
            : `<div style="font-size:15px; font-weight:700; color:#4A5866;">Meine Notizen zum Text (Stichpunkte, unbekannte Wörter):</div><div style="${LT_LINIENFELD} min-height:70px;"></div>`);
    await st_paginieren(box, "lesetext", "1", opt, st_tokens(t.x), ende, lt.reif);
    const erzeuger = fs_zustand.lesetext.erzeuger;
    FS_SERIEN.lesetext.blaetter.filter(b => b.bau).forEach(b => {
        const r = b.bau(ctx);
        erzeuger[b.nr] = r;
        box.insertAdjacentHTML("beforeend", fs_seite("lesetext", b.nr, r.titel, r.html, { reif: lt.reif, ...(r.extra || {}) }));
    });
    box.querySelectorAll(".ws-innen").forEach(innen => {
        let timer = null;
        innen.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => ws_einpassen(innen.closest(".ws-seite")), 500); });
    });
}

function lt_schriftStil(lt){ return `font-size:${Math.max(17, (LT_SCHRIFT[lt.klasse] || 22) - 4)}px;`; }

function ltB_fragen(ctx){
    const lt = ctx.lt, t = lt.text;
    const mc = t.mc.slice(0, [3, 4, 6][lt.umfang]);
    const rf = t.rf.slice(0, [3, 4, 6][lt.umfang]);
    const jung = lt.klasse <= 2;
    return { titel: "Fragen zum Text", extra: { max: 1 }, html: `
        <div class="fs-ziel" style="font-size:17px;">Text: „${ws_esc(t.t)}“</div>
        ${ws_aufgabe(1, "Lies die Fragen. Kreuze die richtige Antwort an.")}
        <div class="lt-fragen">${mc.map((f, i) => {
            const opt = mische(f.slice(1));
            return `<div class="lt-frage"><div class="lt-f"><b>${i + 1}.</b> ${ws_esc(f[0])}</div><div class="lt-opt">${opt.map(o => `<span>${fs_kreuzBox(o === f[1], "width:26px; height:26px;")} ${ws_esc(o)}</span>`).join("")}</div></div>`;
        }).join("")}</div>
        ${ws_aufgabe(2, "Stimmt das? Kreuze an.")}
        <table class="fs-vergleich lt-rf"><thead><tr><th style="text-align:left;">Aussage</th><th>richtig</th><th>falsch</th></tr></thead><tbody>
            ${rf.map(r => `<tr><td style="text-align:left;">${ws_esc(r[0])}</td><td>${fs_kreuzBox(r[1] === 1)}</td><td>${fs_kreuzBox(r[1] !== 1)}</td></tr>`).join("")}</tbody></table>
        ${ws_aufgabe(3, jung ? "Male ein Bild zum Text." : "Was hat dir am Text gefallen? Was war neu für dich? Schreibe auf.")}
        ${jung ? `<div class="st-malbox" style="min-height:140px;"></div>` : `<div style="${LT_LINIENFELD} min-height:100px;"></div>`}` };
}

function ltB_offen(ctx){
    const lt = ctx.lt, t = lt.text;
    const fragen = t.of.slice(0, [2, 3, 4][lt.umfang]);
    const zeilen = lt.klasse <= 2 ? 1 : 2;
    return { titel: "W-Fragen beantworten", extra: { max: 1 }, html: `
        <div class="fs-ziel" style="font-size:17px;">Text: „${ws_esc(t.t)}“</div>
        ${ws_aufgabe(1, lt.klasse <= 2 ? "Lies die Frage. Schreibe die Antwort auf die Linie. Du darfst im Text nachschauen." : "Beantworte die Fragen in ganzen Sätzen. Suche die passende Stelle im Text und unterstreiche sie.")}
        ${fragen.map((f, i) => `<div class="lt-offen"><div class="lt-f"><b>${i + 1}.</b> ${ws_esc(f[0])}</div>
            <div class="lt-linie">${L(ws_esc(f[1] === "eigene Antwort" ? "(eigene Antwort)" : f[1]), "font-size:15px;")}</div>${'<div class="lt-linie"></div>'.repeat(zeilen - 1 + (lt.klasse >= 5 ? 1 : 0))}</div>`).join("")}
        ${ws_aufgabe(fragen.length ? 2 : 1, lt.klasse <= 2 ? "Schreibe einen Satz zum Text." : "Fasse den Text in zwei bis drei Sätzen zusammen.")}
        <div style="${LT_LINIENFELD} min-height:110px;"></div>` };
}

function ltB_luecke(ctx){
    const lt = ctx.lt, t = lt.text;
    const woerter = t.x.replace(/\s+/g, " ").trim().split(" ");
    // Kandidaten: Nomen (groß, nicht am Satzanfang) und längere Wörter
    const kandidaten = [];
    woerter.forEach((w, i) => {
        const kern = w.replace(/^[„"(]+|[.,!?;:“")]+$/g, "");
        const satzanfang = i === 0 || /[.!?:“]$/.test(woerter[i - 1]);
        if (kern.length >= 4 && /^[A-Za-zÄÖÜäöüß-]+$/.test(kern) && ((/^[A-ZÄÖÜ]/.test(kern) && !satzanfang) || kern.length >= 7)) kandidaten.push(i);
    });
    const anzahl = Math.min(kandidaten.length, Math.round([0.6, 1, 1.5][lt.umfang] * Math.max(5, Math.min(14, woerter.length / 8))));
    const schritt = kandidaten.length / Math.max(1, anzahl);
    const luecken = new Set([...Array(anzahl).keys()].map(k => kandidaten[Math.floor(k * schritt + Math.random() * Math.max(0, schritt - 1))]));
    const bank = [];
    const html = woerter.map((w, i) => {
        if (!luecken.has(i)) return ws_esc(w);
        const m = /^([„"(]*)(.*?)([.,!?;:“")]*)$/.exec(w);
        bank.push(m[2]);
        return `${ws_esc(m[1])}<span class="lt-luecke" style="min-width:${Math.max(70, m[2].length * 13)}px;">${L(ws_esc(m[2]))}</span>${ws_esc(m[3])}`;
    }).join(" ");
    const mitBank = lt.stufe !== "s" || lt.klasse <= 2;
    return { titel: "Lückentext", html: `
        ${ws_aufgabe(1, mitBank ? "Lies den Text. Setze die Wörter aus dem Kasten in die Lücken ein. Streiche jedes Wort durch, das du benutzt hast." : "Lies den Text. Welche Wörter fehlen? Setze passende Wörter ein – ohne im Original nachzuschauen.")}
        ${mitBank ? `<div class="rs-wortbank">${mische(bank).map(w => `<span>${ws_esc(w)}</span>`).join("")}</div>` : ""}
        <div class="lt-text" style="${lt_schriftStil(lt)} font-family:${lt.reif ? "'Atkinson Hyperlegible'," : ""}'Andika', sans-serif;">${html}</div>
        ${ws_aufgabe(2, lt.klasse <= 2 ? "Schreibe zwei Sätze mit Lückenwörtern ab." : "Schreibe die Sätze mit den Lückenwörtern vollständig ab.")}
        <div style="${LT_LINIENFELD} min-height:60px;"></div>`, extra: { max: 1 } };
}

function ltB_ordnen(ctx){
    const lt = ctx.lt;
    const anzahl = Math.min(lt.saetze.length, [5, 7, 10][lt.umfang]);
    const start = Math.max(0, Math.floor(Math.random() * (lt.saetze.length - anzahl + 1)));
    const block = lt.saetze.slice(start, start + anzahl);
    let idx = mische([...block.keys()]);
    for (let v = 0; v < 10 && idx.every((x, k) => x === k); v++) idx = mische([...block.keys()]);
    const vorgabe = lt.stufe === "l";
    return { titel: "Sätze ordnen", html: `
        ${ws_aufgabe(1, `Die Sätze sind durcheinandergeraten. Lies sie und schreibe die richtige Reihenfolge in die Kästchen (1, 2, 3 …).${vorgabe ? " Der erste Satz ist schon markiert." : ""}`)}
        <div class="fs-reihen">${idx.map(k => `<div class="fs-karte"><span class="fs-nrbox" style="flex:none;">${vorgabe && k === 0 ? "<b>1</b>" : L(k + 1)}</span><span class="lt-satz" style="${lt_schriftStil(lt)}">${ws_esc(block[k])}</span></div>`).join("")}</div>
        ${ws_aufgabe(2, "Schreibe die Sätze in der richtigen Reihenfolge ab.")}
        <div style="${LT_LINIENFELD} min-height:120px;"></div>` , extra: { max: 1 } };
}

function ltB_haelften(ctx){
    const lt = ctx.lt;
    const mindest = lt.klasse <= 2 ? 3 : 5;
    const passt = s => s.split(" ").length >= mindest && s.length <= 110;
    const ziel = [5, 7, 9][lt.umfang];
    let auswahl = mische(lt.saetze.filter(passt)).slice(0, ziel);
    if (auswahl.length < ziel){
        // zu wenige Sätze im Text: mit Sätzen aus anderen Texten derselben Klasse auffüllen
        const andere = LT_TEXTE.filter(x => x.k === lt.klasse && x !== lt.text).flatMap(x => lt_saetze(x.x)).filter(passt);
        auswahl = [...auswahl, ...mische(andere).slice(0, ziel - auswahl.length)];
    }
    const BUCH = "ABCDEFGHIJ";
    const paare = auswahl.map(s => { const w = s.split(" "); const m = Math.ceil(w.length / 2); return [w.slice(0, m).join(" "), w.slice(m).join(" ")]; });
    const rechts = mische(paare.map((p, i) => ({ text: p[1], von: i })));
    return { titel: "Satzhälften verbinden", extra: { max: 1 }, html: `
        ${ws_aufgabe(1, "Welche Satzhälften gehören zusammen? Schreibe den passenden Buchstaben ins Kästchen. Lies dann die ganzen Sätze vor.")}
        <div class="lt-haelften" style="${lt_schriftStil(lt)}">
            <div>${paare.map((p, i) => `<div class="fs-karte"><b>${i + 1}</b><span style="flex:1;">${ws_esc(p[0])} …</span><span class="fs-nrbox">${L(BUCH[rechts.findIndex(r => r.von === i)])}</span></div>`).join("")}</div>
            <div>${rechts.map((r, j) => `<div class="fs-karte"><b>${BUCH[j]}</b><span>… ${ws_esc(r.text)}</span></div>`).join("")}</div>
        </div>
        ${ws_aufgabe(2, "Schreibe zwei der Sätze vollständig ab.")}
        <div style="${LT_LINIENFELD} min-height:110px;"></div>` };
}

function ltB_fehler(ctx){
    const lt = ctx.lt, t = lt.text;
    const woerter = t.x.replace(/\s+/g, " ").trim().split(" ");
    const fremd = [...new Set(LT_TEXTE.filter(x => x !== t).flatMap(x => x.x.split(/\s+/)).map(w => w.replace(/^[„"(]+|[.,!?;:“")]+$/g, "")).filter(w => /^[A-ZÄÖÜ][a-zäöüß]{3,}$/.test(w)))];
    const kandidaten = woerter.map((w, i) => ({ w, i, kern: w.replace(/^[„"(]+|[.,!?;:“")]+$/g, "") }))
        .filter((x, k) => /^[A-ZÄÖÜ][a-zäöüß]{3,}$/.test(x.kern) && k > 0 && !/[.!?:“]$/.test(woerter[k - 1]));
    const anzahl = Math.min(kandidaten.length, [3, 5, 7][lt.umfang]);
    const gewaehlt = mische(kandidaten).slice(0, anzahl);
    const ersatz = {};
    gewaehlt.forEach(x => { ersatz[x.i] = zufallsElement(fremd.filter(f => f !== x.kern && !t.x.includes(f))); });
    const html = woerter.map((w, i) => ersatz[i] ? `<span class="fs-ls">${ws_esc(w.replace(woerter[i].replace(/^[„"(]+|[.,!?;:“")]+$/g, ""), ersatz[i]))}</span>` : ws_esc(w)).join(" ");
    return { titel: "Lies genau!", html: `
        ${ws_aufgabe(1, `In diesem Text haben sich <b>${anzahl}</b> Wörter versteckt, die nicht passen. Lies genau und streiche sie durch. Schreibe das richtige Wort darüber – schau dafür im Original nach.`)}
        <div class="lt-text" style="${lt_schriftStil(lt)} font-family:${lt.reif ? "'Atkinson Hyperlegible'," : ""}'Andika', sans-serif;">${html}</div>
        <div class="fs-ziel" style="font-size:15px;">Gefunden: <span class="rs-linie" style="min-width:60px;"></span> von ${anzahl} Wörtern ${L("Richtig: " + gewaehlt.map(x => ws_esc(x.kern)).join(", "), "font-size:14px; white-space:normal;")}</div>
        ${ws_aufgabe(2, "Schreibe die Sätze mit den falschen Wörtern richtig ab.")}
        <div style="${LT_LINIENFELD} min-height:60px;"></div>`, extra: { max: 1 } };
}

function ltB_training(ctx){
    const lt = ctx.lt, t = lt.text;
    const roh = [...new Set(lt_woerter(t.x).map(w => w.replace(/^[„"(]+|[.,!?;:“")]+$/g, "")).filter(w => /^[A-Za-zÄÖÜäöüß]+$/.test(w)))];
    const schwer = roh.map(w => ({ w, s: silben_trennen(w) })).filter(x => x.s.length >= (lt.klasse <= 2 ? 2 : 3))
        .sort((a, b) => b.s.length - a.s.length || b.w.length - a.w.length).slice(0, [9, 12, 18][lt.umfang]);
    const n = lt_woerter(t.x).length;
    return { titel: "Lesetraining", extra: { max: 1 }, html: `
        <div class="fs-ziel" style="font-size:17px;">Text: „${ws_esc(t.t)}“ · ${n} Wörter</div>
        ${ws_aufgabe(1, "Lies die schwierigen Wörter in Silben – erst langsam, dann schneller. Kreuze nach jedem Durchgang ein Kästchen an.")}
        <div class="lt-wortgitter">${mische(schwer).map(x => `<div><span class="lt-silbenwort">${x.s.map((s, i) => `<span class="st-s${i % 2 + 1}">${ws_esc(s)}</span>`).join("")}</span><span style="display:flex; gap:4px;">${'<span class="fs-kaestchen-klein" style="width:20px; height:20px;"></span>'.repeat(3)}</span></div>`).join("")}</div>
        ${ws_aufgabe(2, "Lies den ganzen Text dreimal laut. Stoppe die Zeit und zähle die Lesefehler.")}
        <table class="std-tabelle lt-protokoll"><thead><tr><th>Durchgang</th><th>Datum</th><th>Zeit (Sek.)</th><th>Lesefehler</th><th>Wörter pro Minute</th></tr></thead>
            <tbody>${[1, 2, 3].map(d => `<tr><td><b>${d}.</b></td><td></td><td></td><td></td><td></td></tr>`).join("")}</tbody></table>
        <div class="lt-tipp">Wörter pro Minute = ${n} × 60 : Sekunden. Beispiel: 90 Sekunden → ${Math.round(n * 60 / 90)} Wörter pro Minute.</div>
        ${ws_aufgabe(3, "Das hilft mir beim Lesen:")}
        <div class="lt-tipps"><span>☐ mit dem Finger mitlesen</span><span>☐ lange Wörter in Silben lesen</span><span>☐ bei Punkten kurz Pause machen</span><span>☐ unbekannte Wörter nachfragen</span></div>
        <div style="${LT_LINIENFELD} min-height:80px;"></div>` };
}
const LT_BAU = { fragen: ltB_fragen, offen: ltB_offen, luecke: ltB_luecke, ordnen: ltB_ordnen, haelften: ltB_haelften, fehler: ltB_fehler, training: ltB_training };

/* --- Test-Diktate --- */
const DK_HINWEISE = {
    1: ["Jeden Satz zuerst ganz vorlesen, dann Wort für Wort diktieren.", "Deutlich, aber natürlich sprechen – nicht überbetonen.", "Satzzeichen ansagen."],
    2: ["Jeden Satz einmal ganz vorlesen, dann in kurzen Abschnitten diktieren.", "Satzzeichen ansagen.", "Am Ende den ganzen Text noch einmal vorlesen."],
    3: ["Text zuerst vollständig vorlesen.", "In Sinnabschnitten (siehe |) diktieren, jeden Abschnitt zweimal.", "Satzzeichen nur am Satzende ansagen."],
    4: ["Text zuerst vollständig vorlesen.", "In Sinnabschnitten (siehe |) diktieren, jeden Abschnitt zweimal.", "Keine Satzzeichen ansagen (außer wörtlicher Rede)."],
    5: ["Text vollständig vorlesen, dann in Sinnabschnitten (|) diktieren.", "Jeden Abschnitt höchstens zweimal.", "Satzzeichen nicht ansagen; Zeit zum Durchlesen geben (ca. 5 Min.)."],
};
function dk_hinweise(k){ return DK_HINWEISE[Math.min(5, k)]; }
let dk_letzter = null;
// Länge des Diktats: an Satzgrenzen kürzen (kurz ≈ 60 %, mittel ≈ 80 %, vollständig)
function dk_kuerzen(text, laenge){
    if (!text) return text;
    const anteil = { kurz: 0.6, mittel: 0.8 }[laenge];
    if (!anteil) return text;
    const saetze = lt_saetze(text.x), gesamt = lt_woerter(text.x).length;
    const behalten = [];
    let zahl = 0;
    for (const satz of saetze){
        if (behalten.length >= 2 && zahl >= gesamt * anteil) break;
        behalten.push(satz);
        zahl += lt_woerter(satz).length;
    }
    const x = behalten.join(" ");
    const woerter = lt_woerter(x).map(w => w.replace(/^[„"(]+|[.,!?;:“")]+$/g, ""));
    const rest = woerter.slice();
    const pw = text.pw ? text.pw.filter(p => { const i = rest.indexOf(p.w); if (i < 0) return false; rest.splice(i, 1); return true; }) : undefined;
    return { ...text, x, pw, gekuerzt: laenge };
}
function dk_kontext(){
    const text = dk_kuerzen(lt_textHolen("dk", DK_TEXTE), lt_wert("dk-laenge"));
    dk_letzter = text;
    return { dk: { text, klasse: text ? text.k : 2, reif: text ? text.k >= 5 : false } };
}
// Sinnabschnitte zum Diktieren: an Kommas oder nach 3–7 Wörtern
function dk_abschnitte(satz, k){
    const max = k <= 2 ? 3 : (k <= 4 ? 5 : 7);
    const teile = [];
    let aktuell = [];
    satz.split(" ").forEach(w => {
        aktuell.push(w);
        if (/,$/.test(w) || aktuell.length >= max){ teile.push(aktuell.join(" ")); aktuell = []; }
    });
    if (aktuell.length) teile.push(aktuell.join(" "));
    return teile;
}
// Prüfwörter: bei den Leuchtturm-Diktaten fest vorgegeben, bei eigenen Texten automatisch erkannt
function dk_pw(t){
    if (!t.pw) return dk_pruefwoerter(t.x);
    const gruppen = {};
    t.pw.forEach(p => (gruppen[p.b] = gruppen[p.b] || []).push(p.w));
    return gruppen;
}
function dk_reihenfolge(gruppen){
    return DK_EBENEN.flatMap(([e]) => Object.keys(DK_BEREICHE).filter(b => DK_BEREICHE[b].ebene === e && gruppen[b]))
        .concat(Object.keys(gruppen).filter(b => !DK_BEREICHE[b]));
}
function dk_pruefwoerter(text){
    const gruppen = {};
    const satzanfaenge = new Set(lt_saetze(text).map(s => s.split(" ")[0].replace(/^[„"]+/, "")));
    [...new Set(lt_woerter(text).map(w => w.replace(/^[„"(]+|[.,!?;:“")]+$/g, "")))].forEach(w => {
        if (!/^[A-Za-zÄÖÜäöüß]+$/.test(w)) return;
        const keys = rs_einordnen(w).filter(k => k !== "sonstige" && k !== "grossklein");
        if (/^[A-ZÄÖÜ]/.test(w) && !satzanfaenge.has(w)) keys.push("grossklein");
        if (/^(das|dass)$/i.test(w)) keys.splice(0, keys.length, "dasdass");
        keys.forEach(k => (gruppen[k] = gruppen[k] || []).push(w));
    });
    return gruppen;
}

function dkB_lehrkraft(ctx){
    const dk = ctx.dk, t = dk.text;
    const saetze = lt_saetze(t.x);
    const n = lt_woerter(t.x).length;
    const gruppen = dk_pw(t);
    const reihenfolge = dk_reihenfolge(gruppen);
    const pruefSet = new Set(Object.values(gruppen).flat());
    const markiert = satz => dk_abschnitte(satz, t.k).map(teil => teil.split(" ").map(w => {
        const kern = w.replace(/^[„"(]+|[.,!?;:“")]+$/g, "");
        return pruefSet.has(kern) ? ws_esc(w).replace(ws_esc(kern), `<u class="dk-pw">${ws_esc(kern)}</u>`) : ws_esc(w);
    }).join(" ")).join(' <span class="dk-strich">|</span> ');
    const p = Object.values(gruppen).flat().length;
    return { titel: `Diktat: ${ws_esc(t.titel || t.t)}`, extra: { info: true, max: 1, reif: true, label: "Test-Diktat · Lehrkraft", afs: "Förderdiagnostik · Diktat", kopfRechts: `Kürzel: <span class="ws-linie" style="width:90px;"></span> Datum: <span class="ws-linie" style="width:110px;"></span>` }, html: `
        <div class="dk-info"><span><b>Klasse ${t.k}</b> · ${LT_STUFEN[t.s] || ""}${t.v ? ` · <b>Form ${t.v}</b>` : ""}</span><span><b>${n}</b> Wörter</span><span><b>${p}</b> Prüfstellen</span><span><b>${saetze.length}</b> Sätze${t.gekuerzt ? " (gekürzt)" : ""}</span><span>ca. <b>${Math.max(5, Math.round(n / (t.k <= 2 ? 4 : 8)))}</b> Min.</span></div>
        <div class="dk-text">${saetze.map((satz, i) => `<p><b>${i + 1}</b> ${markiert(satz)}</p>`).join("")}</div>
        <div class="dk-hinweise"><b>So diktieren</b><ul>${dk_hinweise(t.k).map(h => `<li>${h}</li>`).join("")}<li>Unterstrichen = gezählte Prüfwörter (nicht betonen!).</li></ul></div>
        <div><b style="font-size:15px;">Prüfstellen je Bereich</b> <span style="font-size:12px; color:#7c8a94;">${t.pw ? (t.gekuerzt ? "fest vorgegeben · gekürzte Fassung: Form A/B nur bei vollständiger Länge gleichwertig" : "fest vorgegeben · Form A und B haben je Bereich gleich viele Prüfstellen") : "automatisch erkannt – bitte kurz prüfen"}</span></div>
        <div class="dk-pruefliste">${reihenfolge.map(b => `<div><b>${ws_esc(dk_bereichName(b))} (${gruppen[b].length}):</b> ${gruppen[b].slice(0, 12).map(ws_esc).join(", ")}${gruppen[b].length > 12 ? " …" : ""}</div>`).join("")}</div>
        <div><b style="font-size:15px;">Notizen zur Durchführung</b></div>
        <div style="${LT_LINIENFELD} min-height:40px;"></div>` };
}

function dkB_schueler(ctx){
    const dk = ctx.dk, t = dk.text;
    const lineatur = t.k <= 2;
    const zeile = () => lineatur ? bs_lineatur("") : `<div class="dk-zeile"></div>`;
    return { titel: "Diktat", zeile, max: 40, extra: { reif: dk.reif, label: "Diktat", afs: "Leuchtturm · Diktat" }, html: `
        ${ws_aufgabe(1, lineatur ? "Hör gut zu und schreibe mit. Sprich leise mit, wenn du schreibst." : "Hör gut zu und schreibe den Text mit. Lies ihn am Ende noch einmal genau durch und verbessere, was dir auffällt.")}
        <div class="${lineatur ? "ws-lineatur-liste" : "dk-zeilen"} fs-fuell"></div>` };
}

function dkB_luecken(ctx){
    const dk = ctx.dk, t = dk.text;
    const gruppen = dk_pw(t);
    const pruef = new Set(Object.entries(gruppen).filter(([k]) => k !== "grossklein" && k !== "lautgetreu").flatMap(([, w]) => w));
    const woerter = t.x.replace(/\s+/g, " ").trim().split(" ");
    // Lücken gleichmäßig über den ganzen Text verteilen (höchstens 25)
    const stellen = woerter.map((w, i) => pruef.has(/^([„"(]*)(.*?)([.,!?;:“")]*)$/.exec(w)[2]) ? i : -1).filter(i => i >= 0);
    const max = 25, gewaehlt = new Set(stellen.length <= max ? stellen : [...Array(max).keys()].map(k => stellen[Math.floor(k * stellen.length / max)]));
    const html = woerter.map((w, i) => {
        const m = /^([„"(]*)(.*?)([.,!?;:“")]*)$/.exec(w);
        if (!gewaehlt.has(i)) return ws_esc(w);
        return `${ws_esc(m[1])}<span class="lt-luecke" style="min-width:${Math.max(70, m[2].length * 14)}px;">${L(ws_esc(m[2]))}</span>${ws_esc(m[3])}`;
    }).join(" ");
    const lineatur = t.k <= 2;
    const zeile = () => lineatur ? bs_lineatur("") : `<div class="dk-zeile"></div>`;
    return { titel: "Lückendiktat", zeile, max: 30, extra: { reif: dk.reif }, html: `
        ${ws_aufgabe(1, "Hör gut zu. Schreibe die fehlenden Wörter in die Lücken.")}
        <div class="lt-text" style="font-size:${t.k <= 2 ? 24 : 20}px; font-family:${dk.reif ? "'Atkinson Hyperlegible'," : ""}'Andika', sans-serif;">${html}</div>
        ${ws_aufgabe(2, "Schreibe die Lückenwörter noch einmal ab. Sprich dabei leise mit.")}
        <div class="${lineatur ? "ws-lineatur-liste" : "dk-zeilen"} fs-fuell"></div>` };
}

const DK_WERTUNG = `<span class="dk-wertung"><i class="v"></i><i class="h"></i><i></i></span>`;
function dk_auswertungDaten(t){
    const gruppen = dk_pw(t), reihenfolge = dk_reihenfolge(gruppen);
    const ebeneVon = b => DK_BEREICHE[b] ? DK_BEREICHE[b].ebene : "orthografisch";
    return { gruppen, reihenfolge, ebeneVon, n: lt_woerter(t.x).length, p: Object.values(gruppen).flat().length };
}
function dk_auswertungKopf(t, d){
    return `<div class="dk-info"><span>„${ws_esc(t.titel || t.t)}“${t.v ? ` · Form ${t.v}` : ""}</span><span>Klasse ${t.k} · ${LT_STUFEN[t.s] || ""}</span><span><b>${d.n}</b> Wörter · <b>${d.p}</b> Prüfstellen</span></div>
        <div class="dk-felder"><div>Wörter richtig: <span class="l"></span> / ${d.n} = <span class="l k"></span> %</div><div>Prüfstellen richtig: <span class="l"></span> / ${d.p} = <span class="l k"></span> %</div><div>Fehler je 100 Wörter: <span class="l k"></span></div></div>`;
}
// gleiche Prüfwörter zusammenfassen: je Vorkommen ein Kästchen
function dk_zusammenfassen(liste){
    const m = new Map();
    liste.forEach(w => m.set(w, (m.get(w) || 0) + 1));
    return [...m];
}
function dk_strategieTabelle(t, d){
    const zeilen = DK_EBENEN.map(([e, titel]) => {
        const bs = d.reihenfolge.filter(b => d.ebeneVon(b) === e);
        if (!bs.length) return "";
        return `<tr class="dk-ebene"><td colspan="5">${titel}</td></tr>` + bs.map(b => {
            const ab = DK_BEREICHE[b] ? DK_BEREICHE[b].ab : "";
            return `<tr><td>${ws_esc(dk_bereichName(b))}</td><td class="dk-ab${ab && t.k >= ab ? " f" : ""}">${ab}</td>
                <td class="dk-woerter">${dk_zusammenfassen(d.gruppen[b]).map(([w, n]) => `<span>${"<i></i>".repeat(n)}${ws_esc(w)}</span>`).join("")}</td>
                <td class="dk-quote">____ / ${d.gruppen[b].length}</td><td>${DK_WERTUNG}</td></tr>`;
        }).join("");
    }).join("");
    return `<div class="dk-ue"><b>1. Prüfstellen nach Rechtschreibstrategie</b><span>Falsch geschriebene Prüfwörter ankreuzen · Wertung einkreisen: <i class="v"></i> sicher (≥ 90 %) <i class="h"></i> teilweise (60–89 %) <i></i> unsicher (&lt; 60 %) · „ab Kl.“ = erwartet ab Klasse (fett: bereits erwartet) · ein Kästchen je Vorkommen</span></div>
        <table class="std-tabelle dk-auswertung"><thead><tr><th style="width:25%;">Bereich</th><th style="width:52px; white-space:nowrap;">ab Kl.</th><th>Prüfwörter</th><th style="width:70px;">richtig</th><th style="width:70px;">Wertung</th></tr></thead><tbody>${zeilen}</tbody></table>`;
}
function dk_afsTabelle(nr){
    const BEREICHE = ["Optische Wahrnehmung (b/d, m/n …)", "Akustische Wahrnehmung (d/t, g/k …)", "Raumlage (Spiegelungen)", "Serialität (Reihenfolge, Auslassungen)", "Aufmerksamkeit (Wortgrenzen, Flüchtigkeit)"];
    return `<div class="dk-ue"><b>${nr}. Fehler nach Wahrnehmungsbereichen (AFS)</b></div>
        <table class="std-tabelle dk-auswertung"><thead><tr><th style="width:42%;">Bereich</th><th style="width:64px;">Anzahl</th><th>Beispiele (Ziel / Kind)</th></tr></thead>
        <tbody>${BEREICHE.map(b => `<tr><td>${b}</td><td></td><td></td></tr>`).join("")}</tbody></table>`;
}
function dk_ebenenTabelle(d){
    const zeilen = DK_EBENEN.map(([e, titel]) => {
        const anz = d.reihenfolge.filter(b => d.ebeneVon(b) === e).reduce((s, b) => s + d.gruppen[b].length, 0);
        return anz ? `<tr><td>${titel}</td><td class="dk-quote">____ / ${anz}</td><td class="dk-quote">____ %</td><td>${DK_WERTUNG}</td></tr>` : "";
    }).join("");
    return `<div class="dk-ue"><b>2. Übersicht nach Strategie-Ebenen</b><span>Summen aus Teil 1 übertragen</span></div>
        <table class="std-tabelle dk-auswertung"><thead><tr><th>Strategie-Ebene</th><th style="width:80px;">richtig</th><th style="width:70px;">Quote</th><th style="width:70px;">Wertung</th></tr></thead><tbody>${zeilen}</tbody></table>`;
}
function dk_hinweisNorm(t){
    return `<div class="dk-hinweis-norm">Informelles, kriteriumsorientiertes Verfahren (nicht normiert). Bewertungsgrenzen und „erwartet ab Klasse“ sind pädagogische Orientierungswerte, keine Normwerte.${t.v ? " Für Verlaufsmessungen Form A und B im Wechsel verwenden (gleiche Anzahl Prüfstellen je Bereich, vollständige Länge)." : ""}</div>`;
}
const DK_KOPF_RECHTS = `Kürzel: <span class="ws-linie" style="width:90px;"></span> Datum: <span class="ws-linie" style="width:110px;"></span>`;
const DK_EINSEITIG_MAX = 16;   // bis zu so vielen Prüfstellen passt alles auf eine Seite
function dkB_auswertung(ctx){
    const t = ctx.dk.text, d = dk_auswertungDaten(t);
    return { titel: "Auswertungsbogen Diktat", extra: { info: true, max: 1, reif: true, label: "Test-Diktat · Auswertung", afs: "Förderdiagnostik · Diktat", kopfRechts: DK_KOPF_RECHTS }, html: `
        ${dk_auswertungKopf(t, d)}
        ${dk_strategieTabelle(t, d)}
        ${dk_afsTabelle(2)}
        ${dk_hinweisNorm(t)}
        <div class="dk-ue"><b>Beobachtungen</b><span>Schreibtempo, Selbstkorrekturen, Schriftbild, Arbeitsverhalten</span></div>
        <div style="${LT_LINIENFELD} min-height:40px;"></div>` };
}
function dkB_auswertung1(ctx){
    const t = ctx.dk.text, d = dk_auswertungDaten(t);
    return { titel: "Auswertungsbogen Diktat (1)", extra: { info: true, max: 1, reif: true, label: "Test-Diktat · Auswertung", afs: "Förderdiagnostik · Diktat", kopfRechts: DK_KOPF_RECHTS }, html: `
        ${dk_auswertungKopf(t, d)}
        ${dk_strategieTabelle(t, d)}
        <div class="dk-ue"><b>Weitere Fehler</b><span>Fehler außerhalb der Prüfwörter (Ziel / Kind)</span></div>
        <div style="${LT_LINIENFELD} min-height:40px;"></div>` };
}
function dkB_auswertung2(ctx){
    const t = ctx.dk.text, d = dk_auswertungDaten(t);
    return { titel: "Auswertungsbogen Diktat (2)", extra: { info: true, max: 1, reif: true, label: "Test-Diktat · Auswertung", afs: "Förderdiagnostik · Diktat", kopfRechts: DK_KOPF_RECHTS }, html: `
        <div class="dk-info"><span>„${ws_esc(t.titel || t.t)}“${t.v ? ` · Form ${t.v}` : ""}</span><span>Klasse ${t.k} · ${LT_STUFEN[t.s] || ""}</span><span>Fortsetzung</span></div>
        ${dk_ebenenTabelle(d)}
        ${dk_afsTabelle(3)}
        <div class="dk-ue"><b>4. Zusammenfassung für das Gutachten</b><span>Stärken · Schwerpunkte für die Förderung</span></div>
        <div style="${LT_LINIENFELD} min-height:120px;"></div>
        ${dk_hinweisNorm(t)}
        <div class="dk-ue"><b>Beobachtungen</b><span>Schreibtempo, Selbstkorrekturen, Schriftbild, Arbeitsverhalten</span></div>
        <div style="${LT_LINIENFELD} min-height:60px;"></div>` };
}

const DK_BLAETTER = [
    { key: "lehrkraft", kurz: "Lehrkraft", name: "Diktattext für die Lehrkraft", bau: dkB_lehrkraft, standard: true },
    { key: "schueler", kurz: "Schülerblatt", name: "Schülerblatt (Schreiblinien)", bau: dkB_schueler, standard: true },
    { key: "luecken", kurz: "Lückendiktat", name: "Lückendiktat (Prüfwörter)", bau: dkB_luecken },
    { key: "auswertung", kurz: "Auswertung", name: "Auswertungsbogen", bau: dkB_auswertung, standard: true },
];
function dk_dynamisch(ctx){
    const an = [...document.querySelectorAll(".dk-blatt:checked")].map(c => c.value);
    const t = ctx && ctx.dk && ctx.dk.text;
    const lang = t && dk_auswertungDaten(t).p > DK_EINSEITIG_MAX;
    const liste = [];
    DK_BLAETTER.filter(b => an.includes(b.key)).forEach(b => {
        if (b.key === "auswertung" && lang){
            liste.push({ ...b, kurz: "Auswertung 1", name: "Auswertungsbogen (Prüfstellen)", bau: dkB_auswertung1 });
            liste.push({ ...b, key: "auswertung2", kurz: "Auswertung 2", name: "Auswertungsbogen (Übersicht & AFS)", bau: dkB_auswertung2 });
        } else liste.push(b);
    });
    return liste.map((b, i) => ({ ...b, nr: String(i + 1) }));
}
// Zieltext direkt ins Gutachten übernehmen (nur im Adress-Anker – wird nicht an den Server geschickt)
function dk_insGutachten(){
    let t = dk_letzter;
    const k = parseInt(lt_wert("dk-klasse"), 10), stufe = lt_wert("dk-stufe");
    if (!t || t.k !== k || t.s !== stufe || lt_wert("dk-text") !== "zufall") t = dk_kontext().dk.text;
    if (!t){ document.getElementById("dk-kopie-status").textContent = "Bitte zuerst einen Text wählen."; return; }
    const daten = { z: t.x, k: t.k, t: t.t, s: LT_STUFEN[t.s] || "", v: t.gekuerzt || "" };
    const bytes = new TextEncoder().encode(JSON.stringify(daten));
    let bin = "";
    bytes.forEach(b => bin += String.fromCharCode(b));
    window.open("gutachten.php#diktat=" + btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), "_blank");
    document.getElementById("dk-kopie-status").textContent = `✅ „${t.t}“ (${lt_woerter(t.x).length} Wörter) im Gutachten eingetragen.`;
}
async function dk_kopieren(){
    const t = dk_letzter || lt_textHolen("dk", DK_TEXTE);
    const st = document.getElementById("dk-kopie-status");
    if (!t){ st.textContent = "Bitte zuerst einen Text wählen."; return; }
    try { await navigator.clipboard.writeText(t.x); st.textContent = "✅ Zieltext kopiert – im Gutachten bei „Zieltext (korrekt)“ einfügen."; }
    catch (e){ st.textContent = "Kopieren nicht möglich – bitte den Text auf dem Lehrkraftblatt markieren und kopieren."; }
}
function erstelleLesen(){}
function lt_klasseWechsel(){
    const k = parseInt(lt_wert("lt-klasse"), 10) || 2;
    document.getElementById("lt-art").value = k <= 4 ? "farbig" : "normal";
    lt_textAuswahlFuellen("lt", LT_TEXTE);
}
function lt_init(){
    const k = lt_wert("g-klasse") || "2", s = { leicht: "l", mittel: "m", schwer: "s" }[lt_wert("g-schwierigkeit")] || "m";
    ["lt", "dk"].forEach(p => { document.getElementById(p + "-klasse").value = k; document.getElementById(p + "-stufe").value = s; });
    document.getElementById("lt-umfang").value = lt_wert("g-umfang") || "mittel";
    lt_klasseWechsel();
    lt_textAuswahlFuellen("dk", DK_TEXTE);
    // Gemeinsame Einstellungen oben übernehmen, wenn sie geändert werden
    document.getElementById("g-klasse").addEventListener("change", () => { ["lt", "dk"].forEach(p => document.getElementById(p + "-klasse").value = lt_wert("g-klasse")); lt_klasseWechsel(); lt_textAuswahlFuellen("dk", DK_TEXTE); });
    document.getElementById("g-schwierigkeit").addEventListener("change", () => { const st = { leicht: "l", mittel: "m", schwer: "s" }[lt_wert("g-schwierigkeit")]; ["lt", "dk"].forEach(p => document.getElementById(p + "-stufe").value = st); lt_textAuswahlFuellen("lt", LT_TEXTE); lt_textAuswahlFuellen("dk", DK_TEXTE); });
    document.getElementById("g-umfang").addEventListener("change", () => document.getElementById("lt-umfang").value = lt_wert("g-umfang"));
}

/* ---------- Neue Serien anmelden ---------- */
Object.assign(FS_SERIEN, {
    lesetext: { tab: "lesen", mat: "symptom", wert: "lesetext", select: "#ld-typ", erstellen: "erstelleLesen", ohneMischen: false,
        optionText: "Lesetexte mit Aufgaben (Klasse 1–8)",
        label: "Lesen", afs: "Symptomtraining: Lesen & Textverständnis", ordner: "Lesetexte",
        tippVoll: "Der Lesetext kann mehrere Seiten haben. „Neu mischen“ wählt bei „zufällig“ einen anderen Text und mischt die Aufgaben neu. Texte auf den Blättern kannst du anklicken und ändern.",
        optionenHtml: `
            <div class="zeile drei" style="margin-top:12px;">
                <div><label>Klassenstufe</label><select id="lt-klasse" onchange="lt_klasseWechsel()">${[1, 2, 3, 4, 5, 6, 7, 8].map(k => `<option value="${k}">Klasse ${k}</option>`).join("")}</select></div>
                <div><label>Schwierigkeit</label><select id="lt-stufe" onchange="lt_textAuswahlFuellen('lt', LT_TEXTE)"><option value="l">leicht</option><option value="m" selected>mittel</option><option value="s">schwer</option></select></div>
                <div><label>Umfang der Aufgaben</label><select id="lt-umfang"><option value="klein">klein</option><option value="mittel" selected>mittel</option><option value="gross">groß</option></select></div>
            </div>
            <label style="margin-top:10px;">Text</label><select id="lt-text" onchange="lt_eigenZeigen('lt')"></select>
            <div id="lt-eigen" style="display:none; margin-top:8px;"><input type="text" id="lt-eigen-titel" placeholder="Überschrift"><textarea id="lt-eigen-text" style="min-height:120px; margin-top:6px;" placeholder="Eigenen Text hier einfügen …"></textarea><p class="beschreibung" style="margin:4px 0 0;">Bei eigenen Texten entfallen die vorbereiteten Fragen; Lückentext, Sätze ordnen, Satzhälften, „Lies genau!“ und Lesetraining entstehen automatisch.</p></div>
            <div class="zeile zwei" style="margin-top:10px;">
                <div><label>Darstellung des Lesetexts</label><select id="lt-art"><option value="farbig">Silben farbig (blau/rot)</option><option value="boegen">Silbenbögen</option><option value="beides">Silben farbig + Bögen</option><option value="woerter">Wörter abwechselnd farbig</option><option value="normal">ohne Hilfen (normaler Text)</option></select></div>
                <div><label style="display:flex; gap:6px; align-items:center; margin-top:26px; text-transform:none;"><input type="checkbox" id="lt-satzweise"> Jeder Satz in neuer Zeile</label></div>
            </div>
            <label style="margin-top:10px;">Aufgaben zum Text</label>
            <div class="fp-wahl">${LT_AUFGABEN.map(a => `<label><input type="checkbox" class="lt-aufgabe" value="${a.key}"${a.standard ? " checked" : ""}> ${ws_esc(a.name)}</label>`).join("")}</div>
            <p class="beschreibung" style="margin:6px 0 0;">48 eigene Texte (Geschichten und Sachtexte), je Klasse und Stufe zwei. Schwierigkeit = Textlänge und Satzbau · Umfang = Anzahl der Fragen, Lücken und Sätze.</p>`,
        ctxExtra: lt_kontext,
        pruefen: ctx => !ctx.lt.text ? "Bitte einen eigenen Text eingeben oder einen Text auswählen." : null,
        dynamisch: lt_dynamisch, eigen: lt_erstellen,
        speicherName: () => "Lesetext – " + (lt_letzter ? lt_letzter.t : "Text"), einzelTitel: true,
        blaetter: [] },

    diktat: { tab: "lesen", mat: "symptom", wert: "diktat", select: "#ld-typ", erstellen: "erstelleLesen",
        optionText: "Test-Diktate für Diagnostik und Gutachten (Klasse 1–8)",
        label: "Diktat", afs: "Förderdiagnostik · Diktat", ordner: "Test-Diktate",
        tippVoll: "Lehrkraftblatt mit Diktier-Abschnitten (|) und Prüfwörtern, Schülerblatt mit Lineatur (Kl. 1–2) bzw. Linien, Lückendiktat und Auswertungsbogen passend zum Gutachten.",
        optionenHtml: `
            <div class="zeile drei" style="margin-top:12px;">
                <div><label>Klassenstufe</label><select id="dk-klasse" onchange="lt_textAuswahlFuellen('dk', DK_TEXTE)">${[1, 2, 3, 4, 5, 6, 7, 8].map(k => `<option value="${k}">Klasse ${k}</option>`).join("")}</select></div>
                <div><label>Schwierigkeit</label><select id="dk-stufe" onchange="lt_textAuswahlFuellen('dk', DK_TEXTE)"><option value="l">leicht (kürzer, lautgetreuer)</option><option value="m" selected>mittel</option><option value="s">schwer (länger, mehr Phänomene)</option></select></div>
                <div><label>Text</label><select id="dk-text" onchange="lt_eigenZeigen('dk')"></select></div>
            </div>
            <div id="dk-eigen" style="display:none; margin-top:8px;"><input type="text" id="dk-eigen-titel" placeholder="Überschrift"><textarea id="dk-eigen-text" style="min-height:110px; margin-top:6px;" placeholder="Eigenen Diktattext einfügen …"></textarea></div>
            <div class="zeile drei" style="margin-top:10px;">
                <div><label>Länge</label><select id="dk-laenge"><option value="kurz">kurz (ca. 60 %)</option><option value="mittel">mittel (ca. 80 %)</option><option value="voll" selected>vollständig</option></select></div>
                <div style="grid-column:span 2;"><p class="beschreibung" style="margin:24px 0 0;">Für Vor- und Nachtest: Je Klasse und Stufe gibt es zwei gleichwertige Texte (A/B) – einfach den anderen Text wählen.</p></div>
            </div>
            <label style="margin-top:10px;">Blätter</label>
            <div class="fp-wahl">${DK_BLAETTER.map(b => `<label><input type="checkbox" class="dk-blatt" value="${b.key}"${b.standard ? " checked" : ""}> ${ws_esc(b.name)}</label>`).join("")}</div>
            <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-top:10px;">
                <button type="button" class="btn klein" onclick="dk_insGutachten()"><i class="fa-solid fa-file-signature"></i> Ins Gutachten übernehmen</button>
                <button type="button" class="btn sekundaer klein" onclick="dk_kopieren()"><i class="fa-solid fa-copy"></i> Zieltext kopieren</button>
                <span id="dk-kopie-status" style="font-size:13px; font-weight:800; color:var(--meer);"></span>
            </div>
            <p class="beschreibung" style="margin:6px 0 0;">48 eigene Diktattexte – Länge und Rechtschreibphänomene passend zu Klasse und Stufe. Die Prüfwörter je Schwerpunkt werden automatisch erkannt. Den Zieltext im Gutachten einfügen, das Geschriebene des Kindes daneben – fertig ist die Analyse.</p>`,
        ctxExtra: dk_kontext,
        pruefen: ctx => !ctx.dk.text ? "Bitte einen eigenen Text eingeben oder einen Text auswählen." : (!document.querySelectorAll(".dk-blatt:checked").length ? "Bitte mindestens ein Blatt anhaken." : null),
        dynamisch: dk_dynamisch,
        speicherName: () => "Test-Diktat – " + (dk_letzter ? `${dk_letzter.t} (Kl. ${dk_letzter.k})` : "Diktat"), einzelTitel: true,
        blaetter: [] },

    buchstabe: { tab: "symptom", mat: "symptom", wert: "bs-serie", nachErsterOption: true, select: "#sy-typ", erstellen: "erstelleSymptom",
        optionText: "Buchstabenerarbeitung – einzeln, unterscheiden (b/p, d/t, g/k …) oder gemischt",
        label: "Buchstabenerarbeitung", afs: "Symptomtraining: Buchstaben & Laute", ordner: "Buchstaben",
        tipp: "Die Auswahl oben bestimmt alle Blätter. Bei „mittel“ und „schwer“ kommen Großbuchstaben und längere Merkreihen dazu. Blätter, für die es zu wenige passende Wörter gibt, entfallen automatisch.",
        optionenHtml: `
            <div class="zeile zwei" style="margin-top:12px;">
                <div><label>Art</label><select id="bs-modus" onchange="bs_modusWechsel()">
                    <option value="einzeln">Ein Buchstabe / Laut</option>
                    <option value="paar">Unterscheiden: zwei ähnliche Buchstaben (b/p, d/t, g/k …)</option>
                    <option value="gemischt">Gemischt: mehrere Buchstaben wiederholen</option>
                </select></div>
                <div id="bs-feld-einzeln"><label>Buchstabe / Laut</label><select id="bs-ziel">${BS_ZIELE.map(z => `<option value="${z}"${z === "m" ? " selected" : ""}>${bs_gross(z)} ${z}</option>`).join("")}</select></div>
                <div id="bs-feld-paar" style="display:none;"><label>Welche Buchstaben unterscheiden?</label><select id="bs-paar">${BS_PAARE.map((p, i) => `<option value="${i}">${ws_esc(p.text)}</option>`).join("")}</select></div>
            </div>
            <div id="bs-feld-gemischt" style="display:none; margin-top:10px;">
                <label>Diese Buchstaben mischen</label>
                <div class="bs-mixwahl">${BS_ZIELE.map(z => `<label><input type="checkbox" class="bs-mix" value="${z}"${["m", "a", "l", "o", "i", "s"].includes(z) ? " checked" : ""}> ${bs_gross(z)} ${z}</label>`).join("")}</div>
                <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
                    <button type="button" class="btn klein" style="background:#7c8a94;" onclick="bs_mixSetzen(['a','e','i','o','u'])">Vokale</button>
                    <button type="button" class="btn klein" style="background:#7c8a94;" onclick="bs_mixSetzen(['m','l','n','r','s','f','w'])">Dauerlaute m l n r s f w</button>
                    <button type="button" class="btn klein" style="background:#7c8a94;" onclick="bs_mixSetzen(['b','p','d','t','g','k'])">b p d t g k</button>
                    <button type="button" class="btn klein" style="background:#7c8a94;" onclick="bs_mixSetzen(['au','ei','eu','ie','sch','ch'])">Laute au ei eu ie sch ch</button>
                    <button type="button" class="btn klein" style="background:#7c8a94;" onclick="bs_mixSetzen('keine')">keine</button>
                </div>
            </div>
            <p class="beschreibung" style="margin:8px 0 0;">Blätter: Kennenlernen & Schreiben · Detektiv · im Wort finden · Anlaut · Mitte · Endlaut · Lautposition · Hören (bei zwei bis vier Buchstaben) · Sortieren · Merken · Groß/klein · Silben lesen.</p>`,
        pruefen: () => bs_modus() === "gemischt" && !document.querySelectorAll(".bs-mix:checked").length ? "Bitte mindestens einen Buchstaben zum Mischen anhaken." : null,
        ctxExtra: () => ({ bs: bs_kontext() }),
        dynamisch: ctx => bs_dynamisch(ctx),
        speicherName: bs_speicherName,
        blaetter: [] },

    kartei: { tab: "symptom", mat: "symptom", wert: "kartei-serie", nachErsterOption: true, select: "#sy-typ", erstellen: "erstelleSymptom",
        optionText: "Meine Fehlerwörter – Blätter aus der Förderkartei",
        label: "Meine Fehlerwörter", afs: "Symptomtraining: Fehlerwörter-Kartei", ordner: "Fehlerwörter",
        reif: () => lt_klasse() >= 5,
        tipp: "Die Wörter kommen aus der Förderkartei des gewählten Kürzels – eigene Fehlerwörter zuerst (★), danach passende Übungswörter.",
        optionenHtml: `
            <div class="zeile zwei" style="margin-top:12px;">
                <div><label>Kind (Kürzel)</label><select id="kt-kind">${kt_kindOptionen("— bitte wählen —")}</select></div>
                <div><label>Welche Wörter?</label><select id="kt-faecher"><option value="offen">alle noch nicht gelernten (Fach 1–4)</option><option value="neu">nur neue / schwierige (Fach 1–2)</option><option value="alle">alle, auch gelernte</option></select></div>
            </div>
            <p class="beschreibung" style="margin:6px 0 0;">Fehlerwörter trägst du in der <a href="foerderkartei.php" target="_blank">Förderkartei</a> ein. Es entstehen vier Blätter: Meine Lernwörter · Lückenwörter · Welche Schreibung stimmt? · Wort-Training.</p>`,
        pruefen: () => {
            const code = lt_wert("kt-kind");
            if (!code) return "Bitte ein Kürzel wählen.";
            if (!kt_woerter(code, lt_wert("kt-faecher")).length) return `In der Förderkartei von ${code} sind (in dieser Auswahl) noch keine Wörter. Trage sie zuerst in der Förderkartei ein.`;
            return null;
        },
        ctxExtra: () => ({ kt: kt_kontextFuer(lt_wert("kt-kind"), lt_wert("kt-faecher")) }),
        speicherName: () => "Fehlerwörter " + lt_wert("kt-kind"),
        kind: () => lt_wert("kt-kind"),
        blaetter: KT_BLAETTER },

    foerderpaket: { tab: "plan", mat: "foerderplan", ohneAuswahl: true, label: "Förderpaket", afs: "Förderplan", ordner: "Förderpakete",
        tippVoll: "Das Förderpaket enthält passende Blätter zu jedem gewählten Bereich. Blätter abwählen, neu mischen oder direkt auf dem Blatt ändern – wie gewohnt.",
        dynamisch: fp_dynamisch,
        pruefen: () => (document.querySelectorAll(".fp-f:checked, .fp-r:checked").length || lt_an("fp-eltern")) ? null : "Bitte mindestens einen Funktionsbereich oder Rechtschreib-Schwerpunkt anhaken.",
        speicherName: () => "Förderpaket" + (lt_wert("fp-kind") ? " " + lt_wert("fp-kind") : ""), einzelTitel: false,
        kind: () => lt_wert("fp-kind"),
        blaetter: [] },

    stunde: { tab: "stunde", mat: "foerderplan", ohneAuswahl: true, label: "Stunde", afs: "AFS-Stunde", ordner: "Stunden",
        tippVoll: "Reihenfolge wie in der Stunde: Ablaufplan (für dich) · Aufmerksamkeit · Funktion · Symptom · Rückblick. Alles bleibt bearbeitbar.",
        dynamisch: std_dynamisch, pruefen: std_pruefen,
        speicherName: () => `Stunde ${new Date().toLocaleDateString("de-DE")}${lt_wert("std-kind") ? " – " + lt_wert("std-kind") : ""}`, einzelTitel: true,
        kind: () => lt_wert("std-kind"),
        blaetter: [] },

    silbentext: { tab: "extras", mat: "symptom", wert: "silbentext", select: "#ex-typ", erstellen: "erstelleExtras", ohneMischen: true,
        optionText: "Silbentext-Generator – beliebigen Text in farbigen Silben",
        label: "Lesetext", afs: "Symptomtraining: Lesen", ordner: "Lesetexte",
        tippVoll: "Langer Text? Er wird automatisch auf mehrere Seiten verteilt. Texte auf dem Blatt kannst du anklicken und ändern.",
        optionenHtml: `
            <label style="margin-top:12px;">Überschrift</label><input type="text" id="st-titel" value="Der kleine Leuchtturm">
            <label style="margin-top:10px;">Text (einfach hineinkopieren – Leerzeile = neuer Absatz)</label>
            <textarea id="st-text" style="min-height:150px;">${ST_BEISPIEL}</textarea>
            <div class="zeile drei" style="margin-top:10px;">
                <div><label>Darstellung</label><select id="st-art"><option value="farbig">Silben farbig (blau/rot)</option><option value="boegen">Silbenbögen (schwarzer Text)</option><option value="beides">Silben farbig + Bögen</option><option value="woerter">Wörter abwechselnd farbig</option><option value="normal">ohne Hilfen (normaler Text)</option></select></div>
                <div><label>Schriftgröße</label><select id="st-groesse"><option value="20">klein (20 pt)</option><option value="24" selected>mittel (24 pt)</option><option value="28">groß (28 pt)</option><option value="34">sehr groß (34 pt)</option></select></div>
                <div><label>Zeilenabstand</label><select id="st-abstand"><option value="1.7">normal</option><option value="2.1" selected>groß</option><option value="2.6">sehr groß</option></select></div>
            </div>
            <div class="zeile drei" style="margin-top:10px;">
                <div><label>Schrift</label><select id="st-schrift"><option value="Andika">Andika (Grundschule)</option><option value="Atkinson Hyperlegible">Atkinson (ältere Schüler)</option></select></div>
                <div><label style="display:flex; gap:6px; align-items:center; margin-top:26px; text-transform:none;"><input type="checkbox" id="st-saetze"> Jeder Satz in neuer Zeile</label></div>
                <div><label style="display:flex; gap:6px; align-items:center; margin-top:26px; text-transform:none;"><input type="checkbox" id="st-protokoll" checked> Leseprotokoll am Ende</label></div>
            </div>`,
        eigen: st_erstellen,
        speicherName: () => "Lesetext – " + (lt_wert("st-titel") || "Silbentext"), einzelTitel: true,
        blaetter: [{ nr: "1", kurz: "Lesetext", name: "Lesetext" }] },

    kaertchen: { tab: "extras", mat: "symptom", wert: "kaertchen", select: "#ex-typ", erstellen: "erstelleExtras", ohneMischen: true,
        optionText: "Strategie-Kärtchen fürs Mäppchen (Merksätze)",
        label: "Strategie-Kärtchen", afs: "Symptomtraining: Rechtschreibstrategien", ordner: "Strategie-Kärtchen", reif: true,
        tippVoll: "Je Seite 8 Kärtchen zum Ausschneiden. Freie Plätze werden zu „Mein Merksatz“-Kärtchen.",
        optionenHtml: `
            <label style="margin-top:12px;">Schwerpunkte</label>
            <div class="fp-wahl">${Object.entries(RS_SCHWERPUNKTE).map(([k, sp]) => `<label><input type="checkbox" class="sk-wahl" value="${k}" checked> ${ws_esc(sp.name)}</label>`).join("")}</div>
            <div style="display:flex; gap:8px; margin-top:6px;"><button type="button" class="btn klein" style="background:#7c8a94;" onclick="document.querySelectorAll('.sk-wahl').forEach(c => c.checked = true)">alle</button><button type="button" class="btn klein" style="background:#7c8a94;" onclick="document.querySelectorAll('.sk-wahl').forEach(c => c.checked = false)">keine</button></div>
            <label style="margin-top:10px;">… oder nur die Schwerpunkte aus der Förderkartei von</label><select id="sk-kind">${kt_kindOptionen("— Auswahl oben verwenden —")}</select>`,
        dynamisch: () => sk_blaetter(sk_keys()),
        pruefen: () => sk_keys().length ? null : "Bitte mindestens einen Schwerpunkt anhaken.",
        speicherName: () => "Strategie-Kärtchen", einzelTitel: true,
        blaetter: [{ nr: "1", kurz: "Kärtchen 1", name: "Strategie-Kärtchen" }] },

    pass: { tab: "extras", mat: "sonstiges", wert: "pass", select: "#ex-typ", erstellen: "erstelleExtras", ohneMischen: true,
        optionText: "Belohnungs- und Stempelpass",
        label: "Lernpass", afs: "Leuchtturm · Motivation", ordner: "Motivation",
        tippVoll: "Ein Blatt zum Sammeln von Stempeln (Grundschule) oder als Trainingsprotokoll (ab Klasse 5).",
        optionenHtml: `
            <div class="zeile drei" style="margin-top:12px;">
                <div><label>Art</label><select id="sp-stil"><option value="stempel">Stempelpass (Grundschule)</option><option value="protokoll">Trainingsprotokoll (ab Klasse 5)</option></select></div>
                <div><label>Anzahl Felder</label><select id="sp-felder"><option value="20">20</option><option value="30" selected>30</option><option value="40">40</option></select></div>
                <div><label style="display:flex; gap:6px; align-items:center; margin-top:26px; text-transform:none;"><input type="checkbox" id="sp-preis" checked> Alle 10 Felder eine Belohnung</label></div>
            </div>`,
        speicherName: () => lt_wert("sp-stil") === "protokoll" ? "Trainingsprotokoll" : "Leuchtturm-Pass", einzelTitel: true,
        blaetter: [{ nr: "1", kurz: "Pass", name: "Lernpass", bau: sp_blatt }] },

    eltern: { tab: "extras", mat: "sonstiges", wert: "eltern", select: "#ex-typ", erstellen: "erstelleExtras",
        optionText: "Elternblatt – 10-Minuten-Übungen für zu Hause",
        label: "Elternblatt", afs: "Leuchtturm · Zusammenarbeit mit dem Elternhaus", ordner: "Elternbriefe",
        tippVoll: "Wochenplan mit fünf kurzen Übungen passend zu den gewählten Bereichen. „Neu mischen“ verteilt die Übungen anders.",
        optionenHtml: `
            <label style="margin-top:12px;">Was üben wir gerade?</label>
            <div class="fp-wahl">${Object.entries(FP_FUNKTIONEN).map(([k, n]) => `<label><input type="checkbox" class="eb-wahl" value="${k}"${k === "aufmerksamkeit" ? " checked" : ""}> ${ws_esc(n)}</label>`).join("")}<label><input type="checkbox" class="eb-wahl" value="lesen"> Lesen</label><label><input type="checkbox" class="eb-wahl" value="worterarbeitung"> Lernwörter</label>${Object.entries(RS_SCHWERPUNKTE).map(([k, sp]) => `<label><input type="checkbox" class="eb-wahl" value="${k}"> ${ws_esc(sp.name)}</label>`).join("")}</div>
            <label style="margin-top:10px;">Übungswörter aus der Förderkartei mitgeben (optional)</label><select id="eb-kind">${kt_kindOptionen("— keine —")}</select>`,
        speicherName: () => "Elternblatt", einzelTitel: true,
        kind: () => lt_wert("eb-kind"),
        blaetter: [{ nr: "1", kurz: "Elternblatt", name: "Elternblatt", bau: () => { const foki = eb_foki(); return eb_blatt(foki.length ? mische(foki) : [], lt_wert("eb-kind")); } }] },
});

// Rechtschreib-Serie: eigene Fehlerwörter eines Kindes einbeziehen
FS_SERIEN.rechtschreibung.optionenHtml += `
    <label style="margin-top:10px;">Eigene Fehlerwörter einbeziehen (optional)</label>
    <select id="rs-kind" onchange="rs_kindWechsel()">${kt_kindOptionen("— nur Übungswörter —")}</select>`;
FS_SERIEN.rechtschreibung.ctxExtra = () => ({ rs: rs_mitKartei(rs_schwerpunkt(), lt_wert("rs-kind")) });
FS_SERIEN.rechtschreibung.speicherName = () => "Rechtschreibung – " + rs_schwerpunkt().name + (lt_wert("rs-kind") ? " (" + lt_wert("rs-kind") + ")" : "");
FS_SERIEN.rechtschreibung.kind = () => lt_wert("rs-kind");

blatt_aufbauen();
mat_bearbeitbarMachen();
mat_knoepfeEinfuegen();
fs_init();
// Aufmerksamkeit: Startauswahl (gemischt) und Klassenstufen-Filter
["aufmerksamkeit", "aufmerksamkeit5"].forEach(k => au_mix(k));
au_klassePruefen();
document.getElementById("g-klasse").addEventListener("change", au_klassePruefen);
silben_laden();
std_auswahlAufbauen();
fp_auswahlAufbauen();
lt_init();
["std-kind", "fp-kind", "ws-kt-kind"].forEach(id => { const el = document.getElementById(id); if (el) el.innerHTML = kt_kindOptionen(id === "ws-kt-kind" ? "— Kürzel —" : "— ohne —"); });
(function startParameter(){
    if (fp_hashLesen()) return;
    // aus der Förderkartei: lrs.php?kartei=KÜRZEL öffnet die Blätter mit den Fehlerwörtern
    const code = new URLSearchParams(location.search).get("kartei");
    if (code && LRS_KINDER.includes(code)){
        document.querySelector('.tabs .tab[data-bereich="symptom"]').click();
        const typ = document.getElementById("sy-typ");
        typ.value = "kartei-serie";
        typ.dispatchEvent(new Event("change"));
        document.getElementById("kt-kind").value = code;
        silben_laden().then(() => erstelleSymptom());
    }
})();
(function klassenstufeBeachten(){
    const klasse = document.getElementById("g-klasse"), aufm = document.getElementById("aufm-typ");
    const anpassen = () => {
        if (!aufm) return;
        const gross = parseInt(klasse.value, 10) >= 5;
        if (gross && aufm.value === "serie") aufm.value = "serie5";
        if (!gross && aufm.value === "serie5") aufm.value = "serie";
        aufm.dispatchEvent(new Event("change"));
    };
    klasse.addEventListener("change", anpassen);
    anpassen();
})();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(blatt_alleEinpassen);
window.addEventListener("load", blatt_alleEinpassen);
window.addEventListener("beforeprint", blatt_alleEinpassen); // auch direkt vor dem Drucken passend machen
document.querySelectorAll(".tabs .tab").forEach(tab => tab.addEventListener("click", () => setTimeout(blatt_alleEinpassen, 30)));

/* 9. Körperschema */
// Körperteile mit Geschlecht, damit der Artikel stimmt (dein rechtes Ohr, deine rechte Hand, deinen rechten Fuß)
const KOERPERTEILE = [
    { wort:"Hand", g:"f" }, { wort:"Ohr", g:"n" }, { wort:"Fuß", g:"m" }, { wort:"Schulter", g:"f" },
    { wort:"Knie", g:"n" }, { wort:"Ellenbogen", g:"m" }, { wort:"Auge", g:"n" }, { wort:"Hüfte", g:"f" },
    { wort:"Wange", g:"f" }, { wort:"Daumen", g:"m" }
];
// "Zeige …" (Akkusativ): deinen rechten (m) · deine rechte (f) · dein rechtes (n)
function ks_zeige(seite, teil){
    const form = { m: `deinen ${seite}n`, f: `deine ${seite}`, n: `dein ${seite}s` }[teil.g];
    return `Zeige ${form} ${teil.wort}.`;
}
// s = Grundform "rechte"/"linke"; s+"n" = rechten, s+"s" = rechtes
const BEWEGUNGEN = [
    s => `Hebe den ${s}n Arm.`,
    s => `Tippe mit dem ${s}n Fuß auf den Boden.`,
    s => `Lege die ${s} Hand auf den Bauch.`,
    s => `Berühre mit der ${s}n Hand deinen Kopf.`,
    s => `Strecke den ${s}n Arm nach oben.`,
    s => `Stelle dich auf dein ${s}s Bein.`,
    s => `Berühre mit der ${s}n Hand dein ${s}s Ohr.`,
    s => `Hebe den ${s}n Fuß leicht an.`
];

function erstelleKoerper(){
    const typ = document.getElementById("ks-typ").value;
    const anzahl = umfangWert(6, 8, 10);
    const liste = document.getElementById("ks-liste");
    liste.innerHTML = "";

    if (typ === "zeigen"){
        document.getElementById("ks-titel").textContent = "Rechts und Links erkennen — Zeigen und Benennen";
        document.getElementById("ks-anweisung").textContent = "Hör gut zu und zeige den richtigen Körperteil.";
        // jede Kombination aus Seite und Körperteil höchstens einmal
        const saetze = mische(KOERPERTEILE.flatMap(teil => ["rechte", "linke"].map(seite => ks_zeige(seite, teil)))).slice(0, anzahl);
        saetze.forEach(satz => {
            const li = document.createElement("li");
            li.textContent = satz;
            liste.appendChild(li);
        });
    } else {
        document.getElementById("ks-titel").textContent = "Rechts und Links erkennen — Bewegungen ausführen";
        document.getElementById("ks-anweisung").textContent = "Führe die Bewegung genau aus.";
        // jede Bewegung höchstens einmal (8 Bewegungen × rechts/links)
        const saetze = mische(BEWEGUNGEN.flatMap(vorlage => ["rechte", "linke"].map(seite => vorlage(seite)))).slice(0, anzahl);
        saetze.forEach(satz => {
            const li = document.createElement("li");
            li.textContent = satz;
            liste.appendChild(li);
        });
    }

    document.getElementById("ausgabe-koerper").style.display = "block";
    document.getElementById("akt-koerper").style.display = "flex";
}

/* 10. Raumorientierung */
function erstelleRaum(){
    // nur Tiere mit klarer Blickrichtung – Frosch und Affe sind symmetrisch, gespiegelt sähen sie gleich aus
    const tier = zufallsElement(TIER_BANK.filter(t => ["fisch","vogel","schildkroete","schnecke","schlange"].includes(t.icon)));
    const zeilen = umfangWert(5, 7, 8);
    const anzahl = umfangWert(5, 6, 7);

    let html = `<div style="display:flex; flex-direction:column; gap:14px; font-size:34px;">`;
    for (let z = 0; z < zeilen; z++){
        html += `<div style="display:flex; gap:20px;">`;
        for (let i = 0; i < anzahl; i++){
            const spiegeln = zufallsZahl(0,1) === 0;
            html += `<span style="display:inline-block; transform:scaleX(${spiegeln ? -1 : 1});">${tierBild(tier)}</span>`;
        }
        html += `</div>`;
    }
    html += `</div>`;

    document.getElementById("raum-gitter").innerHTML = html;
    document.getElementById("ausgabe-raum").style.display = "block";
    document.getElementById("akt-raum").style.display = "flex";
}

</script>

</body>
</html>
