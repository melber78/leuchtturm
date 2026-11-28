<?php $LT_GAST_BEREICH = "vertretung"; require __DIR__ . "/gast-zugang.php";
// Bisherige Vertretungsstunden (Vorlagen + eigene) werden im Browser zu Stationen umgebaut
$vtDateien = glob(__DIR__ . "/vertretung-einheiten*.js") ?: [];
usort($vtDateien, fn($a, $b) => (basename($a) === "vertretung-einheiten.js" ? -1 : (basename($b) === "vertretung-einheiten.js" ? 1 : strnatcmp($a, $b))));
$vtEigen = ($LT_GAST ? lt_gastOrdner($LT_GAST) : __DIR__ . "/material-daten") . "/vertretung.json";
$vtEigeneStunden = [];
if (file_exists($vtEigen)) { $d = json_decode((string)file_get_contents($vtEigen), true); if (is_array($d) && is_array($d["einheiten"] ?? null)) $vtEigeneStunden = array_values($d["einheiten"]); }
?>
<!DOCTYPE html>
<html lang="de">
<head>
<!--
  Leuchtturm – Vertretung „Die Schatzkarte“
  Vertretung ohne Vorbereitung für Kl. 1–4: Die Lehrkraft tippt Klasse,
  Zeit und Stimmung an – daraus entsteht eine Wanderkarte mit Stationen.
  Jede gelöste Station lichtet den Nebel, am Ende wird unter der alten
  Eiche der Schatz gehoben. Kein Zusatzmaterial, nichts zu drucken.
  Stationen: vertretung-stationen.js
-->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="manifest" href="manifest.php">
<meta name="theme-color" content="#2f4a1f">
<link rel="apple-touch-icon" href="app-icon-192.png">
<link rel="icon" type="image/png" href="app-icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<title>Vertretung · Leuchtturm</title>
<link href="https://fonts.googleapis.com/css2?family=Andika:wght@400;700&family=Patrick+Hand&family=Special+Elite&family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<script src="marke/stimme.js"></script>
<?php foreach ($vtDateien as $f): ?><script src="<?= basename($f) ?>?v=<?= @filemtime($f) ?>"></script>
<?php endforeach; ?>
<script>window.VK_EIGENE = <?= json_encode($vtEigeneStunden, JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE) ?>;</script>
<script src="vertretung-stationen.js?v=<?= @filemtime(__DIR__ . "/vertretung-stationen.js") ?>"></script>
<script src="vertretung-umbau.js?v=<?= @filemtime(__DIR__ . "/vertretung-umbau.js") ?>"></script>
<style>
:root{
    --papier:#f3e8cc; --papier2:#e9dab4; --tinte:#3f3322; --tinte2:#6b5a40;
    --gruen:#2f4a1f; --gruen2:#5f8a36; --moos:#a9c07a; --fuchs:#d9772b; --gold:#c9962b; --himmel:#8fb8c9;
}
*{ box-sizing:border-box; }
html,body{ margin:0; min-height:100%; } body{ min-height:100vh; }
body{
    font-family:"Nunito",system-ui,sans-serif; color:var(--tinte);
    background:
        radial-gradient(ellipse at 20% 10%, rgba(255,255,255,.45), transparent 55%),
        radial-gradient(ellipse at 85% 90%, rgba(160,120,60,.18), transparent 60%),
        var(--papier);
    -webkit-tap-highlight-color:transparent;
}
button{ font:inherit; color:inherit; cursor:pointer; }
.hand{ font-family:"Patrick Hand","Nunito",cursive; }
.lesen{ font-family:"Andika","Nunito",sans-serif; }

/* ---------- Kopfleiste ---------- */
.kopf{ display:flex; align-items:center; gap:8px; padding:10px 14px; padding-top:max(10px, env(safe-area-inset-top)); }
.kopf h1{ margin:0; font-family:"Patrick Hand",cursive; font-weight:400; font-size:clamp(1.4rem,3.2vw,2rem); flex:1; line-height:1.1; }
.kopf h1 small{ display:block; font-family:"Nunito",sans-serif; font-size:.8rem; font-weight:700; color:var(--tinte2); }
.knopf-klein{ border:2px solid var(--tinte); background:rgba(255,255,255,.55); border-radius:12px; padding:7px 11px; font-weight:800; font-size:.9rem; display:inline-flex; gap:6px; align-items:center; text-decoration:none; color:var(--tinte); }
.knopf-klein:hover{ background:#fff; }
:fullscreen .nur-normal{ display:none !important; }

/* ---------- Karten-Knöpfe ---------- */
.knopf{ border:2.5px solid var(--tinte); border-radius:16px; padding:12px 22px; font-weight:900; font-size:clamp(1rem,2.2vw,1.25rem);
    background:var(--gruen2); color:#fff; box-shadow:3px 4px 0 var(--tinte); transition:transform .1s; }
.knopf:active{ transform:translate(2px,3px); box-shadow:1px 1px 0 var(--tinte); }
.knopf.hell{ background:#fffaf0; color:var(--tinte); }
.knopf.gold{ background:var(--gold); }
.knopf.fuchs{ background:var(--fuchs); }

/* ---------- Start-Check ---------- */
.start{ max-width:860px; margin:0 auto; padding:6px 16px 40px; }
.blatt{ background:linear-gradient(180deg,#fbf5e6,#f4e9cf); border:2px solid var(--tinte); border-radius:6px 18px 8px 16px;
    box-shadow:4px 6px 0 rgba(63,51,34,.25); padding:clamp(16px,3vw,28px); position:relative; }
.blatt h2{ font-family:"Patrick Hand",cursive; font-weight:400; font-size:clamp(1.5rem,4vw,2.2rem); margin:0 0 4px; }
.frage{ margin:18px 0 6px; font-weight:900; font-size:1.05rem; }
.chips{ display:flex; flex-wrap:wrap; gap:10px; }
.chip{ border:2.5px solid var(--tinte); border-radius:14px; background:#fffaf0; padding:10px 16px; font-weight:800; font-size:1.05rem; min-width:84px; }
.chip.an{ background:var(--gruen); color:#fff; box-shadow:inset 0 0 0 3px #fffaf0; }
.chip .mini{ display:block; font-size:.75rem; font-weight:700; opacity:.8; }
.hinweis-lk{ font-size:.92rem; color:var(--tinte2); margin:4px 0 0; }
.weiter-zeile{ display:flex; gap:12px; flex-wrap:wrap; margin-top:24px; align-items:center; }

/* ---------- Geschichte ---------- */
.geschichte{ max-width:900px; margin:0 auto; padding:10px 16px 40px; text-align:center; }
.geschichte p{ font-family:"Andika",sans-serif; font-size:clamp(1.15rem,2.8vw,1.6rem); line-height:1.55; margin:.5em 0; }
.regeln{ text-align:left; display:inline-block; font-size:clamp(1rem,2.4vw,1.3rem); font-weight:800; margin:10px 0 18px; padding:0; list-style:none; }
.regeln li{ margin:6px 0; }

/* ---------- Karte ---------- */
.karten-wrap{ padding:0 10px 14px; }
.karte{ width:100%; display:block; max-height:calc(100vh - 92px); margin:0 auto;
    background:radial-gradient(ellipse at center, #f7eed6 40%, #ead9b0 100%); border:3px solid var(--tinte); border-radius:10px 22px 12px 26px;
    box-shadow:5px 7px 0 rgba(63,51,34,.25); touch-action:manipulation; }
.ort{ cursor:pointer; }
.ort .ring{ fill:none; stroke:var(--fuchs); stroke-width:4; stroke-dasharray:8 7; opacity:0; }
.ort.jetzt .ring{ opacity:1; animation:dreh 9s linear infinite; transform-box:fill-box; transform-origin:center; }
@keyframes dreh{ to{ transform:rotate(360deg); } }
.ort.jetzt .bild{ animation:wipp 2.4s ease-in-out infinite; transform-box:fill-box; transform-origin:50% 100%; }
@keyframes wipp{ 50%{ transform:translateY(-5px); } }
.ort .name{ font-family:"Patrick Hand",cursive; fill:var(--tinte); text-anchor:middle; paint-order:stroke; stroke:#f6edd3; stroke-width:6px; stroke-linejoin:round; }
.ort.fertig .haken{ opacity:1; }
.haken{ opacity:0; transition:opacity .6s; }
.nebel{ transition:opacity 1.6s ease; pointer-events:none; }
.nebel.weg{ opacity:0; }
.fluegel{ transform-box:fill-box; transform-origin:center; }
.ort.jetzt .fluegel{ animation:dreh 6s linear infinite; }
.karten-info{ text-align:center; font-weight:800; color:var(--tinte2); margin:8px 0 0; font-size:.95rem; }

/* ---------- Station ---------- */
.station{ max-width:1100px; margin:0 auto; padding:0 14px 30px; }
.st-kopf{ display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:10px; }
.st-kopf .ortsbild{ width:64px; height:64px; flex:none; }
.st-kopf h2{ margin:0; font-family:"Patrick Hand",cursive; font-weight:400; font-size:clamp(1.5rem,4vw,2.4rem); line-height:1.05; flex:1; min-width:180px; }
.st-kopf h2 small{ display:block; font-family:"Nunito",sans-serif; font-size:.85rem; font-weight:800; color:var(--tinte2); }
.lk{ background:#fff7dc; border:2px dashed var(--gold); border-radius:12px; padding:8px 12px; font-size:.95rem; display:flex; gap:10px; align-items:flex-start; margin-bottom:12px; }
.lk b{ white-space:nowrap; }
.lk button{ margin-left:auto; border:0; background:none; font-weight:800; color:var(--tinte2); padding:0 4px; }
.auftrag{ font-family:"Andika",sans-serif; font-weight:700; font-size:clamp(1.15rem,2.8vw,1.7rem); margin:0 0 14px; line-height:1.35; }
.aufgabe{ min-height:clamp(180px,34vh,360px); display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:18px 10px; }
.aufgabe .f{ font-family:"Andika",sans-serif; font-size:clamp(1.5rem,4.4vw,3rem); line-height:1.3; white-space:pre-line; max-width:30ch; }
.aufgabe .f.zahl{ font-family:"Patrick Hand",cursive; font-size:clamp(2.2rem,8vw,5rem); letter-spacing:.04em; }
.aufgabe .f.salat{ font-family:"Patrick Hand",cursive; letter-spacing:.12em; }
.aufgabe .a{ margin-top:18px; font-family:"Andika",sans-serif; font-weight:700; font-size:clamp(1.2rem,3.2vw,2rem); color:var(--gruen); background:#eef5df; border:2.5px solid var(--gruen2);
    border-radius:16px; padding:10px 18px; max-width:34ch; white-space:pre-line; animation:auf .35s ease; }
@keyframes auf{ from{ opacity:0; transform:scale(.92); } }
.punkte{ display:flex; gap:7px; justify-content:center; margin:6px 0 14px; }
.punkte i{ width:13px; height:13px; border-radius:50%; border:2px solid var(--tinte); display:block; }
.punkte i.an{ background:var(--fuchs); }
.knoepfe{ display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
.text-box{ font-family:"Andika",sans-serif; font-size:clamp(1.15rem,2.8vw,1.75rem); line-height:1.6; white-space:pre-line; max-width:58ch; margin:0 auto 16px; }
.text-box.vers{ line-height:1.75; }

/* Atem-Kreis */
.atem{ display:flex; flex-direction:column; align-items:center; gap:18px; padding:20px 0; }
.atem .kreis{ width:clamp(150px,34vh,300px); height:clamp(150px,34vh,300px); border-radius:50%;
    background:radial-gradient(circle at 40% 35%, #dbe9c0, var(--moos) 60%, var(--gruen2)); border:3px solid var(--tinte);
    transform:scale(.55); transition:transform 4s ease-in-out; }
.atem .kreis.gross{ transform:scale(1); }
.atem .wort{ font-family:"Patrick Hand",cursive; font-size:clamp(2rem,6vw,3.4rem); min-height:1.2em; }

/* Kartenstück-Moment */
.stueck{ position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(243,232,204,.86); z-index:50; animation:auf .3s; }
.stueck div{ text-align:center; font-family:"Patrick Hand",cursive; font-size:clamp(2rem,6vw,3.6rem); }
.stueck svg{ width:clamp(120px,24vw,200px); height:auto; animation:flieg 1.4s ease forwards; }
@keyframes flieg{ 0%{ transform:rotate(-30deg) scale(.3); } 60%{ transform:rotate(8deg) scale(1.1); } 100%{ transform:rotate(0) scale(1); } }

/* Schatz */
.schatz{ text-align:center; max-width:900px; margin:0 auto; padding:10px 16px 40px; }
.kiste{ width:clamp(200px,40vw,340px); height:auto; overflow:visible; }
.kiste .deckel{ transform-box:fill-box; transform-origin:0% 100%; transition:transform 1.4s cubic-bezier(.3,1.4,.5,1) .4s; }
.kiste.offen .deckel{ transform:rotate(-38deg) translate(-4px,-6px); }
.kiste .glanz{ opacity:0; transition:opacity 1.2s ease 1.2s; }
.kiste.offen .glanz{ opacity:1; }
.liste-stationen{ display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin:12px 0 20px; padding:0; list-style:none; }
.liste-stationen li{ border:2px solid var(--tinte); border-radius:12px; background:#fffaf0; padding:8px 14px; font-weight:800; }
.liste-stationen li b{ display:inline-block; width:1.6em; height:1.6em; line-height:1.6em; border-radius:50%; background:var(--fuchs); color:#fff; margin-right:6px; }

.leise-link{ color:var(--tinte2); font-weight:800; }
/* ================= Escape-Fall (Kl. 3/4) ================= */
body.fall{ background-attachment:fixed !important; color:#efe7d4; background:radial-gradient(ellipse at 20% 0%, #2f4247 0%, transparent 60%), radial-gradient(ellipse at 100% 100%, #2a2f24 0%, transparent 55%), #1b2427; }
.fall .kopf h1, .fall .blatt h2, .fall .st-kopf h2, .fall .hand{ font-family:"Special Elite","Courier New",monospace; letter-spacing:.02em; }
.fall .kopf h1 small, .fall .karten-info, .fall .hinweis-lk{ color:#b9b19c; }
.fall .knopf-klein{ border-color:#efe7d4; color:#efe7d4; background:rgba(255,255,255,.06); }
.fall .blatt{ background:linear-gradient(180deg,#f3e9cf,#e8dab6); color:#2a2520; border:0; border-radius:3px; box-shadow:0 1px 0 #c9b98f, 8px 10px 0 rgba(0,0,0,.35); }
.fall .blatt::before{ content:""; position:absolute; top:-14px; right:42px; width:20px; height:52px; border:4px solid #8b9095; border-radius:12px; border-bottom-color:transparent; transform:rotate(8deg); }
.fall .blatt .hinweis-lk{ color:#5b5040; }
.fall .liste-stationen li b{ background:#a8322b; }
.fall .blatt .knopf-klein{ border-color:#2a2520; color:#2a2520; }
.fall .knopf{ background:#a8322b; color:#fff; border-color:#1a1a1a; box-shadow:3px 4px 0 #1a1a1a; }
.fall .knopf.hell{ background:#faf4e4; color:#2a2520; }
.fall .knopf.gold{ background:#d8a63e; color:#1a1a1a; }
.fall .chip{ background:#faf4e4; color:#2a2520; border-color:#2a2520; }
.fall .chip.an{ background:#2a2520; color:#faf4e4; box-shadow:inset 0 0 0 3px #faf4e4; }
.fall .lk{ background:#fffaf0; border-color:#a8322b; }
.fall .aufgabe .a{ background:#fffaf0; color:#7a1f1a; border-color:#a8322b; }
.fall .punkte i.an{ background:#a8322b; }
.fall-icon{ width:64px; height:64px; flex:none; border-radius:50%; border:3px solid #2a2520; display:flex; align-items:center; justify-content:center; font-size:28px; background:#fffaf0; color:#2a2520; }
.stempel{ display:inline-block; border:4px solid #a8322b; color:#a8322b; font-family:"Special Elite",monospace; font-size:clamp(1rem,2.4vw,1.5rem); padding:2px 12px; transform:rotate(-6deg); border-radius:6px; letter-spacing:.1em; }
.akte{ max-width:1200px; margin:0 auto; padding:0 14px 30px; }
.akte-kopf{ display:flex; flex-wrap:wrap; gap:14px; align-items:center; justify-content:space-between; margin-bottom:14px; }
.akte-kopf h2{ font-family:"Special Elite",monospace; font-weight:400; margin:0; font-size:clamp(1.3rem,3.4vw,2.1rem); }
.akte-kopf small{ display:block; font-family:"Nunito",sans-serif; font-weight:800; color:#b9b19c; font-size:.85rem; letter-spacing:.08em; }
.codeleiste{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
.codeleiste span.z{ width:clamp(42px,6vw,64px); height:clamp(52px,7.5vw,78px); border:3px solid #efe7d4; border-radius:8px; display:flex; align-items:center; justify-content:center; font-family:"Special Elite",monospace; font-size:clamp(1.6rem,4vw,2.6rem); background:rgba(0,0,0,.25); }
.codeleiste span.z.frei{ background:#efe7d4; color:#1b2427; }
.codeleiste i{ font-size:1.6rem; margin-right:4px; }
.akte-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr)); gap:16px; }
.hinweis{ position:relative; text-align:left; background:linear-gradient(180deg,#f3e9cf,#e5d6ae); color:#2a2520; border:0; border-radius:3px; padding:16px 16px 18px; min-height:150px; box-shadow:5px 6px 0 rgba(0,0,0,.35); font:inherit; cursor:pointer; display:flex; flex-direction:column; gap:6px; transition:transform .15s; }
.hinweis:nth-child(odd){ transform:rotate(-.7deg); } .hinweis:nth-child(even){ transform:rotate(.6deg); }
.hinweis .nr{ font-family:"Special Elite",monospace; font-size:1rem; letter-spacing:.12em; color:#6b5f4a; }
.hinweis .was{ font-weight:900; font-size:clamp(1.05rem,2.2vw,1.35rem); display:flex; gap:10px; align-items:center; }
.hinweis .was i{ font-size:1.4em; }
.hinweis .zustand{ margin-top:auto; font-weight:800; font-size:.9rem; color:#6b5f4a; }
.hinweis.gesperrt{ filter:grayscale(1) brightness(.62); cursor:default; }
.hinweis.jetzt{ outline:4px solid #d8a63e; outline-offset:4px; animation:puls 1.8s ease-in-out infinite; }
@keyframes puls{ 50%{ outline-color:rgba(216,166,62,.25); } }
.hinweis .ziffer{ position:absolute; right:14px; bottom:10px; font-family:"Special Elite",monospace; font-size:3.2rem; color:#a8322b; transform:rotate(-8deg); line-height:1; }
.hinweis.geloest .zustand{ color:#a8322b; }
.akte-fuss{ display:flex; gap:12px; flex-wrap:wrap; align-items:center; justify-content:center; margin-top:22px; }
/* Zahlenschloss */
.schloss{ display:flex; flex-direction:column; align-items:center; gap:18px; }
.schloss svg{ width:clamp(130px,22vw,210px); height:auto; overflow:visible; }
.schloss .buegel{ transition:transform .9s cubic-bezier(.3,1.6,.5,1); transform-box:fill-box; transform-origin:85% 100%; }
.schloss.offen .buegel{ transform:translateY(-26px) rotate(-28deg); }
.raeder{ display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }
.rad{ display:flex; flex-direction:column; align-items:center; gap:6px; }
.rad button{ width:clamp(48px,7vw,72px); height:40px; border:2px solid #2a2520; border-radius:10px; background:#faf4e4; font-size:1.2rem; }
.rad b{ width:clamp(48px,7vw,72px); height:clamp(62px,9vw,90px); display:flex; align-items:center; justify-content:center; background:#2a2520; color:#efe7d4; border-radius:10px; font-family:"Special Elite",monospace; font-size:clamp(2rem,5vw,3.2rem); }
.rad small{ font-weight:800; color:#6b5f4a; }
.schuetteln{ animation:schuettel .45s; }
@keyframes schuettel{ 20%,60%{ transform:translateX(-10px); } 40%,80%{ transform:translateX(10px); } }
@media (max-width:600px){ .hinweis{ min-height:92px; padding:12px 14px; } .hinweis .ziffer{ font-size:2.4rem; } }
.fall .stueck{ background:rgba(27,36,39,.9); color:#efe7d4; }

@media (max-width:600px){
    .kopf{ padding:8px 10px; } .knopf-klein span{ display:none; }
    .chip{ flex:1 1 calc(50% - 10px); min-width:0; }
    .lk{ font-size:.85rem; }
}
/* ---------- Druck (Vorbereitung) ---------- */
#druck{ display:none; }
@page{ size:A4; margin:0; }
@media print{
    body{ background:#fff !important; }
    body > *:not(#druck){ display:none !important; }
    #druck{ display:block !important; }
    .a4{ box-shadow:none !important; margin:0 !important; page-break-after:always; break-after:page; }
}
.druck-ansicht{ position:fixed; inset:0; z-index:80; background:rgba(40,40,40,.85); overflow:auto; padding:14px 0 40px; }
.druck-leiste{ position:sticky; top:0; display:flex; gap:10px; flex-wrap:wrap; justify-content:center; padding:8px; z-index:2; }
.a4{ width:210mm; height:297mm; overflow:hidden; background:#fff; color:#222; margin:14px auto; box-shadow:0 6px 30px rgba(0,0,0,.4); padding:14mm 14mm 12mm; font-family:"Nunito",sans-serif; display:flex; flex-direction:column; position:relative; }
.a4.gs{ font-family:"Andika","Nunito",sans-serif; }
.a4 h1{ font-family:"Patrick Hand",cursive; font-weight:400; font-size:calc(28pt * var(--f,1)); margin:0 0 2mm; line-height:1.05; }
.a4.fallblatt h1{ font-family:"Special Elite",monospace; font-size:calc(22pt * var(--f,1)); }
.a4 .kopfzeile{ display:flex; justify-content:space-between; gap:6mm; font-size:calc(11pt * var(--f,1)); margin-bottom:4mm; }
.a4 .kopfzeile span{ flex:1; border-bottom:1.5px solid #555; padding-bottom:1mm; }
.a4 .inhalt{ flex:1; display:flex; flex-direction:column; gap:3mm; min-height:0; }
.a4 .box{ border:2px solid #333; border-radius:3mm; padding:2.5mm 4mm; flex:1 1 auto; display:flex; flex-direction:column; min-height:0; }
.a4.fallblatt .box{ border-radius:0; border-style:solid; }
.a4 .box h2{ font-size:calc(13pt * var(--f,1)); margin:0 0 1.5mm; display:flex; gap:3mm; align-items:center; }
.a4 .box h2 b{ display:inline-flex; width:8mm; height:8mm; border-radius:50%; background:#333; color:#fff; align-items:center; justify-content:center; font-size:calc(11pt * var(--f,1)); }
.a4 .box .ziffer{ margin-left:auto; width:12mm; height:12mm; border:2px solid #333; border-radius:2mm; }
.a4 .zeilen{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1.5mm 6mm; flex:1; align-content:space-evenly; }
.a4 .zeile{ font-size:calc(12pt * var(--f,1)); display:flex; gap:2mm; align-items:flex-end; }
.a4 .zeile i{ flex:1; border-bottom:1.5px solid #777; min-width:12mm; height:6mm; }
.a4 .geschafft{ font-size:calc(12pt * var(--f,1)); display:flex; gap:3mm; align-items:center; }
.a4 .geschafft span{ width:7mm; height:7mm; border:2px solid #333; border-radius:1.5mm; display:inline-block; }
.a4 .malfeld{ flex:1; border:1.5px dashed #999; border-radius:2mm; min-height:20mm; }
.a4 .lk-zeile{ font-size:calc(9.5pt * var(--f,1)); margin:0 0 1mm; }
.a4 .lk-liste{ font-size:calc(9.5pt * var(--f,1)); margin:0; padding-left:5mm; columns:2; column-gap:6mm; }
.a4 .lk-liste li{ break-inside:avoid; margin-bottom:.6mm; }
.a4 .fuss{ font-size:8pt; color:#888; margin-top:2mm; text-align:right; }

</style>
</head>
<body>
<div id="app"></div>
<script>
(function(){
"use strict";
const GEN = window.VK_GEN || {};
const S = (window.VK_STATIONEN || []).concat(window.VK_UMBAU ? window.VK_UMBAU((window.SOZIAL_VORLAGEN || []).concat(window.VK_EIGENE || [])) : []);
const FAELLE = window.VK_FAELLE || [];
const app = document.getElementById("app");
const KEY = "lt-vk-reise";
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
const misch = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const laden = () => { try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; } };
const merken = () => { try { localStorage.setItem(KEY, JSON.stringify(R)); } catch (e) {} };
const lkAus = () => { try { return localStorage.getItem("lt-vk-lk") === "aus"; } catch (e) { return false; } };
const sprich = (t, en) => { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(String(t).replace(/\*\*/g, "").replace(/▢/g, "Lücke").replace(/\p{Extended_Pictographic}/gu, "")); u.lang = en ? "en-GB" : "de-DE"; u.rate = en ? .8 : .85; speechSynthesis.speak(u); } catch (e) {} };
const still = () => { try { speechSynthesis.cancel(); } catch (e) {} };

/* ---------- Orte ---------- */
const ORTE = {
    bewegung: ["Hüpf-Wiese", "Toben-Tal"], stille: ["Stiller Teich", "Moos-Lichtung"], raetsel: ["Rätsel-Höhle", "Knobel-Felsen"],
    rechnen: ["Zahlen-Mühle", "Rechen-Mühle"], lesen: ["Lese-Baum", "Geschichten-Linde"], woerter: ["Wort-Brücke", "Buchstaben-Steg"],
    wissen: ["Forscher-Hügel", "Entdecker-Berg"], kreativ: ["Mal-Atelier", "Ideen-Werkstatt"], englisch: ["English Corner", "English Corner"]
};
// Escape-Fall: Name und Symbol je Hinweis-Art
const FALL_ART = { bewegung: ["Fitness-Test", "fa-person-running"], stille: ["Konzentrations-Test", "fa-brain"], raetsel: ["Denkaufgabe", "fa-puzzle-piece"],
    rechnen: ["Zahlencode", "fa-calculator"], lesen: ["Akte lesen", "fa-folder-open"], woerter: ["Geheimschrift", "fa-font"], wissen: ["Labortest", "fa-flask"],
    kreativ: ["Phantombild", "fa-pen-nib"], englisch: ["Funkspruch (Englisch)", "fa-tower-broadcast"] };
const istFall = () => R && R.stufe === "34";
const ART = { bewegung: "Bewegen", stille: "Ruhe", raetsel: "Rätseln", rechnen: "Mathe", lesen: "Lesen", woerter: "Deutsch", wissen: "Sachunterricht", kreativ: "Kreativ", englisch: "Englisch" };

/* ---------- Route bauen ---------- */
const MUSTER = {
    normal:  { 3: ["raetsel", "fach", "bewegung"], 4: ["raetsel", "fach", "bewegung", "fach"], 6: ["raetsel", "fach", "fach", "bewegung", "fach", "stille"] },
    unruhig: { 3: ["bewegung", "stille", "fach"], 4: ["bewegung", "stille", "fach", "fach"], 6: ["bewegung", "stille", "fach", "fach", "bewegung", "fach"] },
    muede:   { 3: ["bewegung", "raetsel", "fach"], 4: ["bewegung", "fach", "raetsel", "fach"], 6: ["bewegung", "raetsel", "fach", "bewegung", "fach", "fach"] }
};
const ANZAHL = { 15: 3, 25: 4, 40: 6 };
const passt = (s, stufe) => (s.stufe === "alle" || s.stufe === stufe || (s.stufe === "12" && (stufe === "1" || stufe === "2"))) && !(stufe === "1" && s.nichtKl1);
function fachTypen(schwerpunkt, n){
    const out = [];
    if (schwerpunkt === "deutsch") for (let i = 0; i < n; i++) out.push(i % 2 ? "woerter" : "lesen");
    else if (schwerpunkt === "mathe") for (let i = 0; i < n; i++) out.push("rechnen");
    else if (schwerpunkt === "sach") for (let i = 0; i < n; i++) out.push(i % 2 ? "woerter" : "wissen");
    else if (schwerpunkt === "englisch") for (let i = 0; i < n; i++) out.push("englisch");
    else { const r = misch(["deutsch", "mathe", "sach"]); for (let i = 0; i < n; i++){ const f = r[i % 3]; out.push(f === "mathe" ? "rechnen" : f === "sach" ? "wissen" : (i < 3 ? "lesen" : "woerter")); } }
    return out;
}
function stationHolen(typ, stufe, benutzt){
    const typen = typ === "raetsel" ? ["raetsel", "kreativ"] : [typ];
    let pool = S.filter(s => typen.includes(s.typ) && passt(s, stufe) && !benutzt.includes(s.id) && !benutzt.includes("q:" + (s.quelle || s.id)));
    // Hälfte der Ziehungen: zuerst die eigens geschriebenen Stationen (mit Lösungen zum Aufdecken)
    const eigen = pool.filter(s => !s.quelle); if (eigen.length && Math.random() < .5) pool = eigen;
    if (!pool.length) pool = S.filter(s => typen.includes(s.typ) && passt(s, stufe) && !benutzt.includes(s.id));
    if (!pool.length) pool = S.filter(s => typen.includes(s.typ) && passt(s, stufe));
    const s = JSON.parse(JSON.stringify(misch(pool)[0]));
    if (s.gen && GEN[s.gen]) s.items = GEN[s.gen](stufe);
    return s;
}
function routeBauen(c){
    const n = ANZAHL[c.zeit] || 6;
    const slots = MUSTER[c.stimmung][n].slice();
    const fach = fachTypen(c.fach, slots.filter(x => x === "fach").length);
    const benutzt = [], zaehl = {};
    const stationen = slots.map(t => {
        const typ = t === "fach" ? fach.shift() : t;
        const s = stationHolen(typ, c.stufe, benutzt); benutzt.push(s.id); if (s.quelle) benutzt.push("q:" + s.quelle);
        zaehl[typ] = (zaehl[typ] || 0) + 1;
        s.ort = ORTE[typ][(zaehl[typ] - 1) % 2];
        return s;
    });
    const fall = c.stufe === "34" ? FAELLE[Math.floor(Math.random() * FAELLE.length)] : null;
    const code = stationen.map(() => 1 + Math.floor(Math.random() * 9));
    return { ...c, stationen, pos: 0, fertig: false, start: Date.now(), fall: fall && fall.id, code };
}

/* ---------- Zeichnungen (selbst gezeichnet, Tintenstil) ---------- */
const T = 'stroke="#3f3322" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"';
function zeichnung(typ){
    switch (typ){
    case "bewegung": return `<path d="M-46 22 Q-30 -10 0 -12 Q30 -10 46 22 Z" fill="#b9cf87" ${T}/>
        <path d="M-30 6 l-3 -10 M-14 -4 l-2 -9 M10 -6 l2 -9 M26 2 l4 -9" fill="none" ${T}/>
        <circle cx="-22" cy="-3" r="5" fill="#f2c94c" ${T}/><circle cx="4" cy="-9" r="5" fill="#e98b8b" ${T}/><circle cx="24" cy="-1" r="5" fill="#fff" ${T}/>
        <path d="M-6 -30 q6 -12 12 0" fill="none" ${T}/><path d="M-14 -24 q-4 -10 4 -12" fill="none" ${T}/>`;
    case "stille": return `<ellipse cx="0" cy="8" rx="46" ry="17" fill="#a8cbd3" ${T}/>
        <path d="M-22 6 q8 -4 16 0 M6 12 q8 -4 16 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M34 4 l-4 -32 M40 4 l2 -26 M28 6 l-8 -22" fill="none" ${T}/><ellipse cx="30" cy="-28" rx="3.5" ry="8" fill="#8a6a3e" ${T}/>
        <ellipse cx="-16" cy="7" rx="9" ry="3.5" fill="#7fae5a" ${T}/>`;
    case "raetsel": return `<path d="M-48 24 Q-44 -22 -10 -30 Q30 -34 48 24 Z" fill="#b8b1a3" ${T}/>
        <path d="M-16 24 Q-16 -6 2 -6 Q20 -6 20 24 Z" fill="#3f3322"/>
        <text x="2" y="17" font-family="Patrick Hand" font-size="24" fill="#f2c94c" text-anchor="middle">?</text>
        <path d="M-34 -2 l8 -4 M26 -12 l9 3" fill="none" ${T}/>`;
    case "rechnen": return `<path d="M-18 26 L-12 -18 L12 -18 L18 26 Z" fill="#e7c9a0" ${T}/><path d="M-12 -18 L0 -30 L12 -18" fill="#c96f4a" ${T}/>
        <path d="M-5 26 v-12 q5 -6 10 0 v12" fill="#8a6a3e" ${T}/>
        <g class="fluegel"><path d="M0 -18 L0 -58 L8 -56 L5 -20 M0 -18 L40 -18 L38 -10 L3 -14 M0 -18 L0 22 L-8 20 L-5 -16 M0 -18 L-40 -18 L-38 -26 L-3 -22" fill="#fffaf0" ${T}/><circle cx="0" cy="-18" r="4" fill="#3f3322"/></g>`;
    case "lesen": return `<rect x="-6" y="0" width="12" height="28" fill="#9b6b3c" ${T}/>
        <path d="M-40 4 Q-52 -24 -26 -34 Q-18 -56 6 -50 Q32 -56 38 -30 Q56 -14 38 6 Q20 16 0 8 Q-22 16 -40 4 Z" fill="#7fae5a" ${T}/>
        <path d="M-14 -16 l10 4 l10 -4 v14 l-10 4 l-10 -4 Z M-4 -12 v14" fill="#fffaf0" ${T}/>`;
    case "woerter": return `<path d="M-50 18 q12 -6 24 0 t24 0 t24 0 t26 0" fill="none" stroke="#8fb8c9" stroke-width="7" stroke-linecap="round"/>
        <path d="M-44 16 Q0 -30 44 16" fill="none" ${T} stroke-width="3.4"/><path d="M-44 16 Q0 -18 44 16" fill="none" ${T}/>
        <path d="M-30 4 v10 M-15 -5 v16 M0 -8 v18 M15 -5 v16 M30 4 v10" fill="none" ${T}/>
        <text x="0" y="-26" font-family="Patrick Hand" font-size="18" fill="#3f3322" text-anchor="middle">A b c</text>`;
    case "wissen": return `<path d="M-48 26 Q-16 -36 14 -20 Q34 -8 48 26 Z" fill="#c9b986" ${T}/>
        <path d="M-4 -30 v-26" fill="none" ${T}/><path d="M-4 -56 l22 7 l-22 7 Z" fill="#d9772b" ${T}/>
        <path d="M16 6 l18 -12 l4 6 l-18 12 Z" fill="#6b5a40" ${T}/><path d="M24 8 l-6 16 M26 6 l8 16" fill="none" ${T}/>`;
    case "kreativ": return `<path d="M-24 30 L-6 -30 M24 30 L6 -30 M0 -30 L0 30" fill="none" ${T}/><rect x="-30" y="-30" width="60" height="42" rx="3" fill="#fffaf0" ${T}/>
        <circle cx="-12" cy="-12" r="7" fill="#e98b8b" ${T}/><path d="M2 2 q8 -18 20 -6" fill="none" stroke="#5f8a36" stroke-width="4" stroke-linecap="round"/><circle cx="14" cy="-18" r="5" fill="#f2c94c" ${T}/>`;
    case "englisch": return `<rect x="-34" y="-28" width="68" height="44" rx="4" fill="#fffaf0" ${T}/><text x="0" y="2" font-family="Patrick Hand" font-size="22" text-anchor="middle" fill="#3f3322">Hello!</text>`;
    case "start": return `<path d="M-40 22 Q-30 -16 0 -18 Q30 -16 40 22 Z" fill="#a9c07a" ${T}/><path d="M-14 22 Q-14 -2 0 -2 Q14 -2 14 22 Z" fill="#3f3322"/>
        <path d="M-30 -2 l-4 -10 M28 0 l5 -10" fill="none" ${T}/>`;
    case "eiche": return `<path d="M-10 30 L-8 -6 L8 -6 L10 30 Z" fill="#8a5a32" ${T}/><path d="M-8 4 l-14 -10 M8 0 l14 -12" fill="none" ${T}/>
        <path d="M-56 -4 Q-70 -34 -40 -46 Q-36 -74 -8 -70 Q12 -88 34 -70 Q64 -72 62 -42 Q80 -20 56 -4 Q34 10 10 0 Q-14 10 -34 2 Q-48 8 -56 -4 Z" fill="#5f8a36" ${T}/>
        <circle cx="-30" cy="-30" r="4" fill="#c9962b" ${T}/><circle cx="20" cy="-46" r="4" fill="#c9962b" ${T}/><circle cx="40" cy="-20" r="4" fill="#c9962b" ${T}/>
        <rect x="16" y="14" width="30" height="18" rx="3" fill="#b5793d" ${T}/><path d="M16 20 h30" fill="none" ${T}/><rect x="28" y="18" width="6" height="7" fill="#f2c94c" ${T}/>`;
    }
    return "";
}
function fuchs(){
    return `<g><ellipse cx="0" cy="22" rx="20" ry="5" fill="rgba(63,51,34,.25)"/>
      <path d="M-20 -14 L-14 -34 L-4 -16 Z M20 -14 L14 -34 L4 -16 Z" fill="#d9772b" ${T}/>
      <path d="M-15 -26 L-12 -20 L-8 -18 Z M15 -26 L12 -20 L8 -18 Z" fill="#3f3322"/>
      <path d="M-24 -12 Q-24 -20 -12 -18 L12 -18 Q24 -20 24 -12 L0 18 Z" fill="#d9772b" ${T}/>
      <path d="M-24 -12 L0 18 L-8 0 Q-16 -2 -24 -12 Z M24 -12 L0 18 L8 0 Q16 -2 24 -12 Z" fill="#fffaf0" stroke="#3f3322" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="-8" cy="-7" r="2.8" fill="#3f3322"/><circle cx="8" cy="-7" r="2.8" fill="#3f3322"/><circle cx="0" cy="15" r="3.6" fill="#3f3322"/></g>`;
}
function puzzle(){
    return `<svg viewBox="-60 -60 120 120"><path d="M-40 -40 h28 a12 12 0 1 1 24 0 h28 v28 a12 12 0 1 1 0 24 v28 h-28 a12 12 0 1 0 -24 0 h-28 v-28 a12 12 0 1 0 0 -24 Z"
        fill="#f6e3b0" stroke="#3f3322" stroke-width="3.5" stroke-linejoin="round"/><path d="M-26 10 q14 -20 26 -4 t26 -14" fill="none" stroke="#d9772b" stroke-width="4" stroke-dasharray="6 6" stroke-linecap="round"/>
        <path d="M18 -22 l8 8 m0 -8 l-8 8" stroke="#c0392b" stroke-width="4" stroke-linecap="round"/></svg>`;
}
const ortsbild = typ => `<svg class="ortsbild" viewBox="-60 -66 120 104">${zeichnung(typ)}</svg>`;

/* ---------- Karte ---------- */
function punkteBerechnen(n, hoch){
    const W = hoch ? 620 : 1000, H = hoch ? 1000 : 620, P = [];
    // Schlangenweg: unten links los, erste Reihe nach rechts, zweite Reihe zurück nach links (oben)
    const k = n + 2, reihe1 = Math.ceil(k / 2), reihe2 = k - reihe1;
    const wackel = [0, -26, 18, -14, 24, -20, 10];
    for (let i = 0; i < k; i++){
        let a, b;
        if (i < reihe1){ const t = reihe1 > 1 ? i / (reihe1 - 1) : .5; a = 110 + t * 760; b = 455 + wackel[i % 7]; }
        else { const j = i - reihe1, t = reihe2 > 1 ? j / (reihe2 - 1) : .5; a = 890 - t * 740; b = 175 + wackel[(j + 3) % 7]; }
        P.push(hoch ? { x: 620 - b, y: 1000 - a } : { x: a, y: b });
    }
    return { W, H, P };
}
function glatt(P){
    let d = `M${P[0].x} ${P[0].y}`;
    for (let i = 0; i < P.length - 1; i++){
        const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
        d += ` C${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6} ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6} ${p2.x} ${p2.y}`;
    }
    return d;
}
function deko(W, H, P){
    // feste, „zufällige“ Bäumchen und Grasbüschel abseits des Weges
    let seed = 7, out = "";
    const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    for (let i = 0; i < 46; i++){
        const x = 30 + rnd() * (W - 60), y = 30 + rnd() * (H - 60);
        if (P.some(p => Math.hypot(p.x - x, p.y - y) < 95)) continue;
        const r = rnd();
        if (r < .45) out += `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${(.6 + rnd() * .5).toFixed(2)})" opacity=".8"><path d="M0 14 v-8" ${T} fill="none"/><path d="M-11 6 L0 -18 L11 6 Z" fill="#8fb366" ${T}/></g>`;
        else if (r < .8) out += `<path transform="translate(${x.toFixed(0)} ${y.toFixed(0)})" d="M-8 4 q2 -8 4 0 q2 -10 4 0 q2 -8 4 0" fill="none" stroke="#6b8f3c" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>`;
        else out += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(6 + rnd() * 8).toFixed(0)}" ry="4" fill="#cdbd94" stroke="#3f3322" stroke-width="1.6" opacity=".6"/>`;
    }
    return out;
}
function karteZeichnen(){
    const hoch = innerWidth < innerHeight * .95;
    const n = R.stationen.length, { W, H, P } = punkteBerechnen(n, hoch);
    const weg = glatt(P);
    const gross = hoch ? 1.05 : 1;
    let orte = "";
    P.forEach((p, i) => {
        const istStart = i === 0, istZiel = i === n + 1;
        const s = R.stationen[i - 1];
        const typ = istStart ? "start" : istZiel ? "eiche" : s.typ;
        const name = istStart ? "Fritz' Bau" : istZiel ? "Alte Eiche" : s.ort;
        const fertig = !istStart && !istZiel && i <= R.pos;
        const jetzt = (!istStart && i === R.pos + 1) || (istZiel && R.pos >= n);
        orte += `<g class="ort${fertig ? " fertig" : ""}${jetzt ? " jetzt" : ""}" data-i="${i}" transform="translate(${p.x} ${p.y}) scale(${istZiel ? 1.25 * gross : gross})">
            <circle class="ring" r="62"/><circle r="58" fill="transparent"/>
            <g class="bild">${zeichnung(typ)}</g>
            ${!istStart && !istZiel ? `<g transform="translate(40 -40)"><circle r="15" fill="${fertig ? "#5f8a36" : "#fffaf0"}" ${T}/><text y="6" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="17" fill="${fertig ? "#fff" : "#3f3322"}">${i}</text></g>` : ""}
            <g class="haken" transform="translate(-42 -38)"><path d="M-8 0 l6 7 l12 -14" fill="none" stroke="#2f4a1f" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>
            <text class="name" y="${istZiel ? 56 : 58}" font-size="${hoch ? 30 : 25}">${esc(name)}</text></g>`;
    });
    let nebel = "";
    P.forEach((p, i) => {
        if (i === 0) return;
        const verdeckt = i > R.pos + 1;
        nebel += `<g class="nebel${verdeckt ? "" : " weg"}" data-n="${i}" filter="url(#weich)">
            <ellipse cx="${p.x - 30}" cy="${p.y - 6}" rx="70" ry="52" fill="#efe3c3"/><ellipse cx="${p.x + 34}" cy="${p.y + 4}" rx="66" ry="50" fill="#f1e6c9"/>
            <ellipse cx="${p.x}" cy="${p.y + 30}" rx="76" ry="40" fill="#ede0bd"/></g>`;
    });
    const f = P[R.pos];
    return `<svg class="karte" viewBox="0 0 ${W} ${H}" role="img" aria-label="Wanderkarte">
        <defs><filter id="skizze"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="2.6"/></filter>
        <filter id="weich" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter></defs>
        <g filter="url(#skizze)">
          <rect x="14" y="14" width="${W - 28}" height="${H - 28}" rx="14" fill="none" stroke="#3f3322" stroke-width="1.6" stroke-dasharray="2 7" opacity=".5"/>
          ${deko(W, H, P)}
          <path d="${weg}" fill="none" stroke="#efe3c3" stroke-width="22" stroke-linecap="round"/>
          <path d="${weg}" fill="none" stroke="#6b5a40" stroke-width="3.2" stroke-dasharray="3 12" stroke-linecap="round"/>
          ${orte}
          ${hoch ? "" : `<g transform="translate(${W - 70} ${H - 70})"><circle r="30" fill="#fffaf0" ${T}/><path d="M0 -24 L6 0 L0 24 L-6 0 Z" fill="#d9772b" ${T}/><text y="-32" text-anchor="middle" font-family="Patrick Hand" font-size="20">N</text></g>`}
        </g>
        ${nebel}
        <g id="fuchs" transform="translate(${f.x} ${f.y - (R.pos === 0 ? 30 : 64)})" style="pointer-events:none">${fuchs()}</g>
    </svg>`;
}
function fuchsLaufen(von, nach, fertig){
    const svg = app.querySelector(".karte"), g = document.getElementById("fuchs");
    if (!svg || !g) { fertig && fertig(); return; }
    const n = R.stationen.length, { P } = punkteBerechnen(n, innerWidth < innerHeight * .95);
    const a = P[von], b = P[nach], ya = von === 0 ? 30 : 64, yb = 64, t0 = performance.now(), dauer = 1500;
    const schritt = t => {
        const k = Math.min(1, (t - t0) / dauer), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const x = a.x + (b.x - a.x) * e, y = a.y + (b.y - a.y) * e - (ya + (yb - ya) * e) - Math.sin(k * Math.PI * 6) * 4;
        g.setAttribute("transform", `translate(${x} ${y})`);
        if (k < 1) requestAnimationFrame(schritt); else fertig && fertig();
    };
    requestAnimationFrame(schritt);
}

/* ---------- Ansichten ---------- */
let R = laden();
let wahl = { stufe: "2", zeit: 40, stimmung: "normal", fach: "gemischt" };
try { const w = JSON.parse(localStorage.getItem("lt-vk-wahl")); if (w) wahl = { ...wahl, ...w }; } catch (e) {}
if (wahl.stufe === "12") wahl.stufe = "2";

function welt(){ document.body.classList.toggle("fall", (R ? R.stufe : wahl.stufe) === "34"); }
function fallDaten(){ return FAELLE.find(f => f.id === (R && R.fall)) || FAELLE[0]; }
function kopf(unter){
    welt();
    const titel = istFall() ? "Escape-Fall" : R ? "Die Schatzkarte" : "Vertretung";
    return `<div class="kopf"><h1>${titel}<small>${esc(unter)}</small></h1>
        <button class="knopf-klein" id="vollbild" title="Vollbild"><i class="fa-solid fa-expand"></i><span>Vollbild</span></button>
        <a class="knopf-klein nur-normal" href="index.php" title="Zum Leuchtturm"><i class="fa-solid fa-house"></i><span>Leuchtturm</span></a></div>`;
}
function kopfAktiv(){
    const b = document.getElementById("vollbild");
    if (b) b.onclick = () => { try { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); } catch (e) {} };
}
function chips(name, opts){
    return `<div class="chips" data-name="${name}">${opts.map(([w, t, mini]) => `<button class="chip${String(wahl[name]) === String(w) ? " an" : ""}" data-w="${w}">${t}${mini ? `<span class="mini">${mini}</span>` : ""}</button>`).join("")}</div>`;
}
function zeigeStart(){
    still();
    const offen = R && !R.fertig && R.stationen && R.pos < R.stationen.length + 1;
    const alt = R; R = null;
    const fall = wahl.stufe === "34";
    if (wahl.stufe !== "34" && wahl.fach === "englisch") wahl.fach = "gemischt";
    app.innerHTML = kopf("Vertretung ohne Vorbereitung · Kl. 1–4") + `<div class="start"><div class="blatt">
        <h2>Kurzer Start-Check</h2>
        <p class="hinweis-lk">Für dich als Lehrkraft: vier Mal antippen – nichts drucken, kein Material. <b>Kl. 1/2</b> gehen auf Schatzsuche, <b>Kl. 3/4</b> lösen einen Escape-Fall.</p>
        <div class="frage">Welche Klasse?</div>${chips("stufe", [["1", "Klasse 1", "Schatzkarte"], ["2", "Klasse 2", "Schatzkarte"], ["34", "Klasse 3/4", "Escape-Fall"]])}
        <div class="frage">Wie viel Zeit ist noch?</div>${chips("zeit", [[15, "15 Min", fall ? "3 Hinweise" : "3 Stationen"], [25, "25 Min", fall ? "4 Hinweise" : "4 Stationen"], [40, "40 Min", fall ? "6 Hinweise" : "6 Stationen"]])}
        <div class="frage">Wie ist die Klasse gerade drauf?</div>${chips("stimmung", [["unruhig", "🌪️ unruhig", "mehr Bewegung & Ruhe"], ["normal", "🙂 normal", "bunt gemischt"], ["muede", "😴 müde", "erst wach machen"]])}
        <div class="frage">Schwerpunkt?</div>${chips("fach", [["gemischt", "Gemischt"], ["deutsch", "Deutsch"], ["mathe", "Mathe"], ["sach", "Sachunterricht"]].concat(fall ? [["englisch", "Englisch"]] : []))}
        <div class="weiter-zeile">
            <button class="knopf" id="los"><i class="fa-solid ${fall ? "fa-folder-open" : "fa-map"}"></i> ${fall ? "Fall öffnen" : "Karte zeichnen"}</button>
            ${offen ? `<button class="knopf hell" id="weiter"><i class="fa-solid fa-shoe-prints"></i> Weitermachen (${alt.stufe === "34" ? "Hinweis" : "Station"} ${Math.min(alt.pos + 1, alt.stationen.length)} von ${alt.stationen.length})</button>` : ""}
        </div>
        <p class="hinweis-lk" style="margin-top:16px"><b>Spontan</b> geht alles an der Tafel. <b>Mit etwas Zeit</b> druckst du nach dem Start über „Material drucken“ ein Blatt für jedes Kind und den Ablauf mit Lösungen für dich.</p>
        <p class="hinweis-lk">So läuft es: <b>antippen → Aufgabe → Lösung zeigen → weiter.</b> Bei jeder Aufgabe steht genau ein Satz für dich. Mit 🎲 tauschst du eine Aufgabe, die nicht passt.</p>
        <p class="hinweis-lk"><a class="leise-link" href="sozial-stunden.php?bereich=vertretung&amp;liste=1">Eigene Vertretungsstunden anlegen oder bearbeiten</a> – sie erscheinen danach automatisch als Aufgaben.</p>
    </div></div>`;
    R = alt;
    kopfAktiv(); document.body.classList.toggle("fall", fall);
    app.querySelectorAll(".chips").forEach(c => c.onclick = e => {
        const b = e.target.closest(".chip"); if (!b) return;
        const v = b.dataset.w; wahl[c.dataset.name] = c.dataset.name === "zeit" ? +v : v;
        try { localStorage.setItem("lt-vk-wahl", JSON.stringify(wahl)); } catch (x) {}
        if (c.dataset.name === "stufe") { zeigeStart(); return; }
        c.querySelectorAll(".chip").forEach(x => x.classList.toggle("an", x === b));
    });
    document.getElementById("los").onclick = () => { R = routeBauen(wahl); merken(); zeigeGeschichte(); };
    const w = document.getElementById("weiter"); if (w) w.onclick = () => zeigeKarte();
}
function zeigeGeschichte(){
    const n = R.stationen.length;
    if (istFall()){
        const F = fallDaten();
        app.innerHTML = kopf("Fallakte Nr. " + F.nr) + `<div class="geschichte"><div class="blatt" style="text-align:left">
            <div class="stempel">VERTRAULICH</div>
            <h2 style="margin-top:12px">Fall ${esc(F.nr)}: ${esc(F.titel)}</h2>
            <p>${esc(F.intro)}</p>
            <p><b>Euer Auftrag:</b> ${n} Hinweise lösen – jeder bringt eine Ziffer. Mit allen ${n} Ziffern knackt ihr am Ende das Zahlenschloss.</p>
            <ul class="regeln"><li><i class="fa-solid fa-people-group"></i> Wir ermitteln als Team.</li><li><i class="fa-solid fa-hand"></i> Wer etwas weiß, meldet sich.</li><li><i class="fa-solid fa-volume-xmark"></i> Bei Konzentrations-Tests ist es ganz still.</li></ul>
            <div style="text-align:center"><button class="knopf" id="los"><i class="fa-solid fa-magnifying-glass"></i> Ermittlung starten</button></div>
        </div></div>`;
        kopfAktiv(); document.getElementById("los").onclick = () => zeigeKarte(); return;
    }
    app.innerHTML = kopf("Die Geschichte") + `<div class="geschichte"><div class="blatt">
        <svg viewBox="-40 -40 80 70" width="120" height="105" style="display:block;margin:0 auto">${fuchs()}</svg>
        <h2>Fuchs Fritz braucht eure Hilfe!</h2>
        <p>Fritz hatte eine Schatz-Karte.</p><p>Doch der Wind hat sie zerrissen.</p><p>Die ${n} Stücke liegen überall im Wald.</p><p>Findet ihr sie zusammen?</p>
        <ul class="regeln"><li>🤝 Wir lösen alles zusammen.</li><li>✋ Wer etwas weiß, meldet sich.</li><li>🤫 An den Ruhe-Orten ist es ganz still.</li></ul>
        <div><button class="knopf fuchs" id="los"><i class="fa-solid fa-shoe-prints"></i> Los geht's!</button></div>
    </div></div>`;
    kopfAktiv();
    document.getElementById("los").onclick = () => zeigeKarte();
}
function neuStarten(e){ if (e) e.preventDefault(); if (confirm(istFall() ? "Neuen Fall beginnen? Dieser Fall wird verworfen." : "Neue Reise beginnen? Die jetzige Karte wird verworfen.")) { R = null; try { localStorage.removeItem(KEY); } catch (x) {} zeigeStart(); } }
/* ---------- Fallakte (Kl. 3/4) ---------- */
function zeigeAkte(neu){
    still();
    const n = R.stationen.length, F = fallDaten(), alle = R.pos >= n;
    app.innerHTML = kopf(`Fall ${F.nr} · ${R.pos} von ${n} Hinweisen gelöst`) + `<div class="akte">
        <div class="akte-kopf"><h2><small>FALLAKTE NR. ${esc(F.nr)}</small>${esc(F.titel)}</h2>
            <div class="codeleiste"><i class="fa-solid fa-lock"></i>${R.code.map((z, i) => `<span class="z${i < R.pos ? " frei" : ""}">${i < R.pos ? z : "?"}</span>`).join("")}</div></div>
        <div class="akte-grid">${R.stationen.map((s, i) => {
            const [name, icon] = FALL_ART[s.typ] || ["Hinweis", "fa-file"];
            const st = i < R.pos ? "geloest" : i === R.pos ? "jetzt" : "gesperrt";
            return `<button class="hinweis ${st}" data-i="${i}"><span class="nr">HINWEIS ${i + 1}</span><span class="was"><i class="fa-solid ${icon}"></i>${esc(name)}</span>
                <span class="zustand">${st === "geloest" ? "entschlüsselt" : st === "jetzt" ? "▶ jetzt lösen" : "🔒 gesperrt"}</span>${st === "geloest" ? `<span class="ziffer">${R.code[i]}</span>` : ""}</button>`;
        }).join("")}</div>
        <div class="akte-fuss">${alle ? `<button class="knopf gold" id="schloss"><i class="fa-solid fa-lock-open"></i> Zahlenschloss knacken</button>` : `<span class="karten-info">Tippt auf Hinweis ${R.pos + 1}.</span>`}
            <button class="knopf-klein nur-normal" id="drucken" style="color:#efe7d4;border-color:#efe7d4"><i class="fa-solid fa-print"></i> Material drucken</button>
            <a class="leise-link" href="#" id="neu" style="color:#b9b19c">Neuer Fall</a></div>
    </div>`;
    kopfAktiv();
    document.getElementById("neu").onclick = neuStarten;
    document.getElementById("drucken").onclick = druckenZeigen;
    const sb = document.getElementById("schloss"); if (sb) sb.onclick = zeigeSchloss;
    app.querySelectorAll(".hinweis").forEach(h => h.onclick = () => {
        const i = +h.dataset.i;
        if (i === R.pos) zeigeStation(i); else if (i < R.pos) hinweis("Diesen Hinweis habt ihr schon entschlüsselt: Ziffer " + R.code[i] + "."); else hinweis("Noch gesperrt – erst Hinweis " + (R.pos + 1) + "!");
    });
    if (neu != null){ const z = app.querySelectorAll(".codeleiste .z")[neu]; if (z) { z.animate([{ transform: "scale(1.6)", background: "#d8a63e" }, { transform: "scale(1)" }], { duration: 900, easing: "ease-out" }); } }
}
function zeigeSchloss(){
    const n = R.stationen.length, F = fallDaten();
    const wahlZ = R.stationen.map(() => 0);
    app.innerHTML = kopf(`Fall ${F.nr} · Zahlenschloss`) + `<div class="schatz"><div class="blatt">
        <h2>Das Zahlenschloss</h2>
        <p class="auftrag" style="text-align:center">Stellt die Ziffern in der Reihenfolge der Hinweise ein: Hinweis 1, Hinweis 2 … – dann „Öffnen“.</p>
        <div class="schloss" id="schloss">
          <svg viewBox="-70 -110 140 170"><path class="buegel" d="M-38 -10 V-50 A38 38 0 0 1 38 -50 V-10" fill="none" stroke="#5b6066" stroke-width="16" stroke-linecap="round"/>
            <rect x="-60" y="-14" width="120" height="74" rx="12" fill="#c9962b" stroke="#2a2520" stroke-width="4"/><circle cx="0" cy="18" r="9" fill="#2a2520"/><rect x="-3" y="18" width="6" height="22" fill="#2a2520"/></svg>
          <div class="raeder">${R.stationen.map((_, i) => `<div class="rad"><small>Hinweis ${i + 1}</small><button data-hoch="${i}" aria-label="höher">▲</button><b data-z="${i}">0</b><button data-runter="${i}" aria-label="niedriger">▼</button></div>`).join("")}</div>
          <div class="knoepfe"><button class="knopf" id="oeffnen"><i class="fa-solid fa-key"></i> Öffnen</button><button class="knopf hell" id="akte"><i class="fa-solid fa-folder-open"></i> Zur Akte</button></div>
          <p class="hinweis-lk" id="meldung" style="text-align:center;font-weight:800"></p>
        </div>
        <div id="geloest" hidden style="text-align:center">
          <div class="stempel" style="font-size:2rem">FALL GELÖST</div>
          <p class="auftrag" style="margin-top:14px">${esc(F.geloest)}</p>
          <p class="frage">Nachbesprechung: Welcher Hinweis war am kniffligsten – und wie habt ihr ihn geknackt? Zeigt die Nummer mit den Fingern.</p>
          <ul class="liste-stationen">${R.stationen.map((s, i) => `<li><b>${i + 1}</b>${esc((FALL_ART[s.typ] || ["Hinweis"])[0])}</li>`).join("")}</ul>
          <div class="knoepfe"><button class="knopf" id="neuFall"><i class="fa-solid fa-rotate"></i> Neuer Fall</button></div>
        </div>
    </div></div>`;
    kopfAktiv();
    const zeig = i => app.querySelector(`[data-z="${i}"]`).textContent = wahlZ[i];
    app.querySelectorAll("[data-hoch]").forEach(b => b.onclick = () => { const i = +b.dataset.hoch; wahlZ[i] = (wahlZ[i] + 1) % 10; zeig(i); });
    app.querySelectorAll("[data-runter]").forEach(b => b.onclick = () => { const i = +b.dataset.runter; wahlZ[i] = (wahlZ[i] + 9) % 10; zeig(i); });
    document.getElementById("akte").onclick = () => zeigeKarte();
    document.getElementById("oeffnen").onclick = () => {
        const ok = wahlZ.every((z, i) => z === R.code[i]), sch = document.getElementById("schloss");
        if (!ok){ sch.classList.remove("schuetteln"); void sch.offsetWidth; sch.classList.add("schuetteln"); document.getElementById("meldung").textContent = "Klemmt! Prüft die Ziffern in der Akte noch einmal."; return; }
        R.fertig = true; merken();
        sch.querySelectorAll(".knoepfe, .raeder button").forEach(x => x.remove());
        sch.classList.add("offen");
        setTimeout(() => { document.getElementById("geloest").hidden = false; document.getElementById("geloest").scrollIntoView({ behavior: "smooth", block: "start" }); }, 1000);
    };
    document.getElementById("neuFall").onclick = () => { R = null; try { localStorage.removeItem(KEY); } catch (x) {} zeigeStart(); };
}
function zeigeKarte(lauf){
    if (istFall()) { zeigeAkte(lauf ? lauf.von : null); return; }
    still();
    const n = R.stationen.length;
    const info = R.pos >= n ? "Alle Kartenstücke gefunden! Tippt auf die alte Eiche. 🌳" : `Tippt auf Station ${R.pos + 1}: ${R.stationen[R.pos].ort}`;
    app.innerHTML = kopf(`${R.pos} von ${n} Kartenstücken`) + `<div class="karten-wrap">${karteZeichnen()}<p class="karten-info">${esc(info)}
        · <a class="leise-link nur-normal" href="#" id="drucken"><i class="fa-solid fa-print"></i> Material drucken</a> · <a class="leise-link" href="#" id="neu">Neue Reise</a></p></div>`;
    kopfAktiv();
    document.getElementById("neu").onclick = neuStarten;
    document.getElementById("drucken").onclick = e => { e.preventDefault(); druckenZeigen(); };
    if (lauf){
        const g = document.getElementById("fuchs");
        const { P } = punkteBerechnen(n, innerWidth < innerHeight * .95);
        g.setAttribute("transform", `translate(${P[lauf.von].x} ${P[lauf.von].y - (lauf.von === 0 ? 30 : 64)})`);
        const neb = app.querySelector(`.nebel[data-n="${R.pos + 1}"]`); if (neb) neb.classList.remove("weg");
        setTimeout(() => fuchsLaufen(lauf.von, lauf.nach, () => { if (neb) neb.classList.add("weg"); }), 350);
    }
    app.querySelector(".karte").addEventListener("click", e => {
        const o = e.target.closest(".ort"); if (!o) return;
        const i = +o.dataset.i;
        if (i === n + 1){ if (R.pos >= n) zeigeSchatz(); else hinweis("Erst alle Kartenstücke finden – dann zur alten Eiche!"); return; }
        if (i === 0) return;
        if (i === R.pos + 1) zeigeStation(i - 1);
        else if (i <= R.pos) hinweis("Diese Station habt ihr schon geschafft. ✔");
        else hinweis("Dort liegt noch Nebel. Erst Station " + (R.pos + 1) + "!");
    });
}
let hinweisTimer;
function hinweis(t){
    let h = document.getElementById("hinweis");
    if (!h){ h = document.createElement("div"); h.id = "hinweis"; h.style.cssText = "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);background:#3f3322;color:#fff;padding:10px 18px;border-radius:14px;font-weight:800;z-index:60;max-width:90vw;text-align:center"; document.body.appendChild(h); }
    h.textContent = t; h.style.display = "block"; clearTimeout(hinweisTimer); hinweisTimer = setTimeout(() => h.style.display = "none", 2600);
}

/* ---------- Station ---------- */
function zeigeStation(k){
    const s = R.stationen[k], n = R.stationen.length, fall = istFall(), en = s.lang === "en";
    let idx = 0, phase = s.typ === "lesen" ? "text" : "items", gezeigt = false, atemTimer = null, uhr = null;
    const items = s.items || [];
    const [fName, fIcon] = FALL_ART[s.typ] || ["Hinweis", "fa-file"];
    const symbol = fall ? `<span class="fall-icon"><i class="fa-solid ${fIcon}"></i></span>` : ortsbild(s.typ);
    const ueber = fall ? fName : s.ort, unter = (fall ? s.quelle : true) && s.titel !== ueber ? s.titel : "";
    const rahmen = inner => kopf(fall ? `Hinweis ${k + 1} von ${n} · ${fName}` : `Station ${k + 1} von ${n} · ${ART[s.typ]}`) + `<div class="station"><div class="blatt">
        <div class="st-kopf">${symbol}<h2>${esc(ueber)}${unter ? `<small>${esc(unter)}</small>` : ""}</h2>
            <button class="knopf-klein" id="tausch" title="Andere Aufgabe"><i class="fa-solid fa-dice"></i><span>andere Aufgabe</span></button>
            <button class="knopf-klein" id="zurKarte" title="${fall ? "Zur Akte" : "Zur Karte"}"><i class="fa-solid ${fall ? "fa-folder-open" : "fa-map"}"></i><span>${fall ? "Akte" : "Karte"}</span></button></div>
        ${lkAus() ? "" : `<div class="lk"><b>👩‍🏫 Für dich:</b><span>${md(s.lk)}</span><button id="lkWeg" title="Ausblenden">✕</button></div>`}
        <p class="auftrag" style="white-space:pre-line">${md(s.auftrag)}</p>${inner}</div></div>`;
    const fertigKnopf = fall ? `<button class="knopf gold" id="einsammeln"><i class="fa-solid fa-key"></i> Hinweis gelöst</button>` : `<button class="knopf gold" id="einsammeln">🧩 Kartenstück einsammeln</button>`;
    function zeichnen(){
        clearInterval(atemTimer);
        let inner = "";
        if (s.art === "atem"){
            inner = `<div class="atem"><div class="kreis" id="kreis"></div><div class="wort hand" id="wort">Bereit?</div>
                <div class="punkte" id="runden">${"<i></i>".repeat(5)}</div><div class="knoepfe"><button class="knopf" id="atemLos">Atmen beginnen</button>${fertigKnopf}</div></div>`;
        } else if (s.art === "text"){
            inner = `<div class="text-box vers">${md(s.text)}</div><div class="knoepfe"><button class="knopf hell" id="vorlesen"><i class="fa-solid fa-volume-high"></i> Vorlesen lassen</button>${fertigKnopf}</div>`;
        } else if (phase === "text"){
            inner = `<div class="text-box">${md(s.text)}</div><div class="knoepfe"><button class="knopf hell" id="vorlesen"><i class="fa-solid fa-volume-high"></i> Vorlesen</button>
                <button class="knopf" id="zuFragen">Zu den Fragen <i class="fa-solid fa-arrow-right"></i></button></div>`;
        } else if (!items.length){
            const min = parseInt(s.dauer, 10) || 0;
            inner = `<div class="knoepfe" style="margin-top:20px">${min ? `<button class="knopf hell" id="uhr"><i class="fa-solid fa-stopwatch"></i> <span id="uhrText">${min} Minuten</span></button>` : ""}
                <button class="knopf hell" id="sprichA" title="Vorlesen"><i class="fa-solid fa-volume-high"></i></button>${fertigKnopf}</div>`;
        } else {
            const it = items[idx] || { f: "" };
            const zahl = s.typ === "rechnen" && (s.gen === "schatzrechnen" || s.gen === "muster");
            const letzte = idx >= items.length - 1;
            inner = `<div class="punkte">${items.map((_, i) => `<i class="${i <= idx ? "an" : ""}"></i>`).join("")}</div>
                <div class="aufgabe"><div class="f${zahl ? " zahl" : ""}${s.gen === "salat" ? " salat" : ""}">${md(it.f)}</div>${gezeigt && it.a ? `<div class="a">${md(it.a)}</div>` : ""}</div>
                <div class="knoepfe">
                    ${s.typ === "lesen" ? `<button class="knopf hell" id="zumText"><i class="fa-solid fa-book-open"></i> Text</button>` : ""}
                    <button class="knopf hell" id="sprich" title="Vorlesen"><i class="fa-solid fa-volume-high"></i></button>
                    ${it.a && !gezeigt ? `<button class="knopf" id="loesung"><i class="fa-solid fa-eye"></i> ${en ? "Wort zeigen" : "Lösung zeigen"}</button>` : ""}
                    ${(!it.a || gezeigt) && !letzte ? `<button class="knopf" id="naechste">Weiter <i class="fa-solid fa-arrow-right"></i></button>` : ""}
                    ${letzte && (!it.a || gezeigt) ? fertigKnopf : `<button class="knopf hell" id="einsammeln" title="Aufgabe beenden">${fall ? "Hinweis fertig" : "Station fertig"}</button>`}
                </div>`;
        }
        app.innerHTML = rahmen(inner);
        kopfAktiv();
        const on = (id, f) => { const el = document.getElementById(id); if (el) el.onclick = f; };
        on("zurKarte", () => { clearInterval(uhr); zeigeKarte(); });
        on("lkWeg", () => { try { localStorage.setItem("lt-vk-lk", "aus"); } catch (e) {} zeichnen(); });
        on("tausch", () => {
            if (!confirm("Diese Aufgabe gegen eine andere tauschen?")) return;
            const benutzt = R.stationen.map(x => x.id);
            const neu = stationHolen(s.typ, R.stufe, benutzt); neu.ort = s.ort;
            R.stationen[k] = neu; merken(); clearInterval(uhr); zeigeStation(k);
        });
        on("loesung", () => { gezeigt = true; zeichnen(); if (en) { const a = (items[idx] || {}).a || ""; const w = (a.match(/\*\*(.+?)\*\*/) || [])[1] || a.split(/[–(·]/)[0]; sprich(w, true); } });
        on("naechste", () => { idx++; gezeigt = false; still(); zeichnen(); });
        on("zuFragen", () => { phase = "items"; still(); zeichnen(); });
        on("zumText", () => { phase = "text"; zeichnen(); });
        on("vorlesen", () => sprich(s.text));
        on("sprichA", () => sprich(s.auftrag));
        on("sprich", () => { const it = items[idx] || {}; if (en) sprich(gezeigt && it.a ? ((it.a.match(/\*\*(.+?)\*\*/) || [])[1] || it.f) : it.f, /^[A-Za-z]/.test(String(it.f).replace(/\p{Extended_Pictographic}|\s/gu, ""))); else sprich(it.f + (gezeigt && it.a ? ". " + it.a : "")); });
        on("uhr", () => {
            clearInterval(uhr); let rest = (parseInt(s.dauer, 10) || 1) * 60; const t = document.getElementById("uhrText");
            const tick = () => { if (!t.isConnected) { clearInterval(uhr); return; } t.textContent = rest > 0 ? "noch " + Math.ceil(rest / 60) + " Min" : "Zeit ist um!"; rest -= 5; if (rest < -5) clearInterval(uhr); };
            tick(); uhr = setInterval(tick, 5000);
        });
        on("einsammeln", einsammeln);
        on("atemLos", () => {
            const kreis = document.getElementById("kreis"), wort = document.getElementById("wort"), runden = document.querySelectorAll("#runden i");
            document.getElementById("atemLos").remove();
            let schritt = 0;
            const takt = () => {
                const ein = schritt % 2 === 0, r = Math.floor(schritt / 2);
                if (r >= 5){ clearInterval(atemTimer); kreis.classList.remove("gross"); wort.textContent = fall ? "Fokus da." : "Wunderbar ruhig. 🌿"; return; }
                kreis.classList.toggle("gross", ein); wort.textContent = ein ? "Einatmen …" : "Ausatmen …";
                if (!ein) runden[r].classList.add("an");
                schritt++;
            };
            takt(); atemTimer = setInterval(takt, 4200);
        });
    }
    function einsammeln(){
        clearInterval(atemTimer); clearInterval(uhr); still();
        const von = R.pos; R.pos = Math.max(R.pos, k + 1); merken();
        const o = document.createElement("div"); o.className = "stueck";
        o.innerHTML = fall ? `<div><div class="stempel" style="font-size:1.4rem;background:#faf4e4">ENTSCHLÜSSELT</div><br>Hinweis ${k + 1} · Ziffer <b style="font-size:1.6em;color:#d8a63e">${R.code[k]}</b></div>`
                           : `<div>${puzzle()}<br>Kartenstück ${k + 1} gefunden!</div>`;
        document.body.appendChild(o);
        setTimeout(() => { o.remove(); zeigeKarte({ von: fall ? k : von, nach: R.pos }); }, fall ? 2200 : 1800);
    }
    zeichnen();
}

/* ---------- Drucken (wenn Zeit zur Vorbereitung ist) ---------- */
function druckenZeigen(){
    const fall = istFall(), k1 = R.stufe === "1", F = fall ? fallDaten() : null, n = R.stationen.length;
    const name = (s, i) => fall ? `Hinweis ${i + 1}: ${(FALL_ART[s.typ] || ["Hinweis"])[0]}` : `Station ${i + 1}: ${s.ort}`;
    const schreibbar = s => ["rechnen", "raetsel", "wissen", "woerter", "lesen", "englisch"].includes(s.typ) && (s.items || []).length;
    // Blatt für die Kinder
    const boxen = R.stationen.map((s, i) => {
        const it = (s.items || []).slice(0, k1 ? 0 : s.typ === "rechnen" ? 6 : 4);
        let koerper;
        if (k1) koerper = `<div class="geschafft"><span></span> geschafft!</div>${s.typ === "raetsel" || s.typ === "lesen" ? '<div class="malfeld"></div>' : ""}`;
        else if (schreibbar(s) && it.length) {
            const rf = x => String(x.f).replace(/\*\*/g, "").replace(/\s*=\s*\?$/, "");
            const lang = s.typ === "rechnen" && it.some(x => rf(x).length > 18);
            koerper = `<div class="zeilen"${lang ? ' style="grid-template-columns:1fr"' : ""}>${it.map((x, k) => `<div class="zeile">${k + 1})&nbsp;${s.typ === "rechnen" && !/\n/.test(x.f) && rf(x).length < 60 ? esc(rf(x)) + (/[?▢]/.test(rf(x)) ? "" : " =") : ""}<i></i></div>`).join("")}</div>`;
        }
        else koerper = `<div class="geschafft"><span></span> geschafft!</div>`;
        return `<div class="box"><h2><b>${i + 1}</b>${esc(name(s, i))}${fall ? '<span class="ziffer"></span>' : ""}</h2>${koerper}</div>`;
    }).join("");
    const kind = `<div class="a4 ${R.stufe === "34" ? "" : "gs"}${fall ? " fallblatt" : ""}">
        <h1>${fall ? "Ermittlungsprotokoll · Fall " + esc(F.nr) : "Meine Schatzkarte"}</h1>
        <div class="kopfzeile"><span>Name:</span>${k1 ? "" : "<span>Datum:</span>"}</div>
        ${fall ? `<p class="lk-zeile"><b>${esc(F.titel)}</b> – Trage bei jedem Hinweis deine Ziffer ins Kästchen ein. Zum Schluss knackt ihr damit das Zahlenschloss.</p>` : ""}
        <div class="inhalt">${boxen}
            <div class="box" style="flex:0 0 auto"><h2>${k1 ? "Das hat mir am besten gefallen – male es:" : "Am besten war Nummer ___, weil …"}</h2>${k1 ? '<div class="malfeld" style="min-height:28mm"></div>' : '<div class="zeilen" style="grid-template-columns:1fr"><div class="zeile"><i></i></div><div class="zeile"><i></i></div></div>'}</div>
        </div></div>`;
    // Ablauf für die Lehrkraft mit Lösungen
    const quellen = [...new Map(R.stationen.filter(s => s.quelleId).map(s => [s.quelleId, s.quelle])).entries()];
    const lehr = `<div class="a4"><h1>Ablauf · ${fall ? "Escape-Fall " + esc(F.nr) : "Schatzkarte"}</h1>
        <p class="lk-zeile">Klasse ${R.stufe === "34" ? "3/4" : R.stufe} · ${R.zeit} Min · ${n} ${fall ? "Hinweise" : "Stationen"}${fall ? ` · <b>Code: ${R.code.join(" ")}</b>` : ""}</p>
        <div class="inhalt" style="gap:2mm">${R.stationen.map((s, i) => `<div class="box" style="flex:0 1 auto"><h2><b>${i + 1}</b>${esc(name(s, i))}${s.titel && s.titel !== s.ort ? " – " + esc(s.titel) : ""}${fall ? ` <span style="margin-left:auto">Ziffer ${R.code[i]}</span>` : ""}</h2>
            <p class="lk-zeile">${md(s.lk || "")}</p>${(s.items || []).length ? `<ol class="lk-liste">${s.items.slice(0, 10).map(x => `<li>${md(x.f)}${x.a ? ` → <b>${md(x.a)}</b>` : ""}</li>`).join("")}</ol>` : ""}</div>`).join("")}
            ${quellen.length ? `<p class="lk-zeile" style="margin-top:auto">Passende Arbeitsblätter aus den Stunden: ${quellen.map(q => "„" + esc(q[1]) + "“").join(", ")} – über die Knöpfe unter der Vorschau.</p>` : ""}
        </div></div>`;
    let d = document.getElementById("druck"); if (!d) { d = document.createElement("div"); d.id = "druck"; document.body.appendChild(d); }
    d.innerHTML = kind + lehr;
    const o = document.createElement("div"); o.className = "druck-ansicht";
    o.innerHTML = `<div class="druck-leiste"><button class="knopf" id="dDruck"><i class="fa-solid fa-print"></i> Drucken</button><button class="knopf hell" id="dZu">Schließen</button>
        ${quellen.map(q => `<a class="knopf hell" style="text-decoration:none" target="_blank" href="sozial-stunden.php?bereich=vertretung&amp;liste=1#stunde/${encodeURIComponent(q[0])}"><i class="fa-solid fa-file-lines"></i> AB „${esc(q[1])}“</a>`).join("")}</div>
        <p style="text-align:center;color:#eee;font-weight:800;margin:4px 12px">Seite 1: Blatt für jedes Kind · Seite 2: Ablauf mit Lösungen für dich</p>${kind}${lehr}`;
    document.body.appendChild(o);
    // jede Seite passt auf genau eine A4-Seite: Schrift verkleinern, bis nichts mehr übersteht
    const passen = wurzel => wurzel.querySelectorAll(".a4").forEach(a => {
        const ueber = () => a.scrollHeight > a.clientHeight + 1 || [...a.querySelectorAll(".box")].some(b => b.scrollHeight > b.clientHeight + 2);
        let f = 1; a.style.setProperty("--f", f);
        while (ueber() && f > .5) { f = Math.round((f - .05) * 100) / 100; a.style.setProperty("--f", f); }
    });
    requestAnimationFrame(() => { passen(o); passen(d);
        // Vorschau am Handy: Seiten verkleinert zeigen (gedruckt wird immer A4)
        const z = Math.min(1, (innerWidth - 16) / 794); if (z < 1) o.querySelectorAll(".a4").forEach(a => a.style.zoom = z.toFixed(3)); });
    o.querySelector("#dZu").onclick = () => o.remove();
    o.querySelector("#dDruck").onclick = () => { d.innerHTML = kind + lehr; requestAnimationFrame(() => { passen(d); window.print(); }); };
}

/* ---------- Schatz (Kl. 1/2) ---------- */
function zeigeSchatz(){
    R.fertig = true; merken();
    app.innerHTML = kopf("Geschafft!") + `<div class="schatz"><div class="blatt">
        <h2>Die Karte ist wieder ganz!</h2>
        <p class="auftrag" style="text-align:center">Fritz gräbt unter der alten Eiche … und findet die Kiste!</p>
        <svg class="kiste" viewBox="-90 -110 180 170" id="kiste">
          <g class="glanz"><path d="M-60 -20 L-90 -100 M0 -30 L0 -110 M60 -20 L90 -100 M-30 -26 L-48 -96 M30 -26 L48 -96" stroke="#f2c94c" stroke-width="6" stroke-linecap="round"/>
            <circle cx="-26" cy="-16" r="10" fill="#f2c94c" ${T}/><circle cx="2" cy="-22" r="10" fill="#f2c94c" ${T}/><circle cx="28" cy="-14" r="10" fill="#f2c94c" ${T}/>
            <path d="M-6 -30 l6 -14 l6 14 l14 2 l-10 10 l3 14 l-13 -7 l-13 7 l3 -14 l-10 -10 Z" fill="#fff4b8" ${T}/></g>
          <rect x="-70" y="-10" width="140" height="66" rx="8" fill="#b5793d" ${T}/><path d="M-70 14 h140 M-40 -10 v66 M40 -10 v66" fill="none" ${T}/>
          <g class="deckel"><path d="M-72 -10 Q-72 -52 0 -52 Q72 -52 72 -10 Z" fill="#c98a4a" ${T}/><path d="M-40 -10 Q-40 -48 0 -50 M40 -10 Q40 -48 0 -50" fill="none" ${T}/></g>
          <rect x="-10" y="-4" width="20" height="22" rx="3" fill="#f2c94c" ${T}/>
        </svg>
        <p class="auftrag" style="text-align:center;margin-top:10px">Der Schatz: <b>der goldene Schatzsucher-Stern für die ganze Klasse!</b> ⭐<br>Ihr habt das zusammen geschafft.</p>
        <p class="frage" style="text-align:center">Zum Schluss: Welche Station hat euch am besten gefallen? Zeigt die Nummer mit den Fingern!</p>
        <ul class="liste-stationen">${R.stationen.map((s, i) => `<li><b>${i + 1}</b>${esc(s.ort)}</li>`).join("")}</ul>
        <p style="text-align:center;font-weight:800">Und dann: eine große Applauswelle für die Schatzsucher-Klasse! 👏</p>
        <div class="knoepfe"><button class="knopf hell" id="karte"><i class="fa-solid fa-map"></i> Karte ansehen</button><button class="knopf" id="neu"><i class="fa-solid fa-rotate"></i> Neue Reise</button></div>
    </div></div>`;
    kopfAktiv();
    setTimeout(() => document.getElementById("kiste").classList.add("offen"), 200);
    document.getElementById("karte").onclick = () => zeigeKarte();
    document.getElementById("neu").onclick = () => { R = null; try { localStorage.removeItem(KEY); } catch (x) {} zeigeStart(); };
}

let altHoch = innerWidth < innerHeight * .95;
addEventListener("resize", () => { const h = innerWidth < innerHeight * .95; if (h !== altHoch && app.querySelector(".karte")){ altHoch = h; zeigeKarte(); } altHoch = h; });

if (!(R && !R.fertig && Array.isArray(R.stationen) && Array.isArray(R.code))) R = null;
zeigeStart();
})();
</script>
</body>
</html>
