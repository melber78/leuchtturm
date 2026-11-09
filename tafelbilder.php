<?php $LT_GAST_BEREICH = "lernangebot"; require __DIR__ . "/gast-zugang.php"; ?>
<?php
if (empty($_SESSION["tafel_csrf"])) $_SESSION["tafel_csrf"] = bin2hex(random_bytes(16));
// Gespeicherte Tafelbild-Einstellungen (Morgentafel …) – Gäste haben eigene Daten
$tbDatei = ($LT_GAST ? lt_gastOrdner($LT_GAST) : __DIR__ . "/material-daten") . "/tafelbilder.json";
$tbDaten = file_exists($tbDatei) ? json_decode((string)file_get_contents($tbDatei)) : null;
if (!is_object($tbDaten)) $tbDaten = new stdClass();
$JSON = JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE;
?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tafelbilder · Leuchtturm</title>
<link href="https://fonts.googleapis.com/css2?family=Andika:wght@400;700&family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<!--
  Leuchtturm – Tafelbilder für die digitale Tafel
  Erstes Tafelbild: Buchstabenkurs – Buchstaben in der Lineatur (Klasse 1)
  vorschreiben, nachspuren und frei schreiben. Druckschrift oder Grundschrift.
  Die Buchstaben sind als Schreibwege gezeichnet (Strich für Strich, in
  Schreibrichtung) – so lässt sich auch zeigen, wie ein Buchstabe geschrieben wird.
  Mit dem Tafelstift wird direkt auf der Seite geschrieben (eigene Zeichenebene).
-->
<style>
:root{ --nacht:#16324a; --meer:#3d7ea6; --gold:#f2a93b; --schaum:#f4f6f4; --text:#1f2d36; --grau:#7c8a85; --schatten:0 6px 24px rgba(22,50,74,.1); }
*{ box-sizing:border-box; }
body{ margin:0; background:var(--schaum); color:var(--text); font-family:"Nunito",sans-serif; }
/* Übersicht */
.uebersicht{ width:min(900px,94%); margin:34px auto 60px; }
.uebersicht a.zurueck{ color:var(--meer); font-weight:800; text-decoration:none; }
.uebersicht h1{ font-size:30px; font-weight:900; margin:12px 0 4px; }
.uebersicht .unter{ color:var(--grau); font-weight:700; margin:0 0 24px; }
.kacheln{ display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:18px; }
.kachel{ background:white; border-radius:22px; box-shadow:var(--schatten); padding:24px 22px; text-decoration:none; color:var(--text); transition:.2s; cursor:pointer; border:0; text-align:left; font:inherit; }
.kachel:hover{ transform:translateY(-4px); }
.kachel .bild{ height:86px; border-radius:14px; background:#fff; border:2px solid #e6ebef; margin-bottom:14px; display:flex; align-items:center; justify-content:center; overflow:hidden; }
.kachel h2{ margin:0 0 6px; font-size:19px; font-weight:900; }
.kachel p{ margin:0; color:var(--grau); font-weight:700; font-size:14px; }
.kachel.bald{ opacity:.55; cursor:default; } .kachel.bald:hover{ transform:none; }

/* Tafel-Ansicht (Vollbild) */
#tafel{ position:fixed; inset:0; display:none; flex-direction:column; background:radial-gradient(circle at 20% 0%, #fbf7ee, #efe8da); z-index:10; user-select:none; -webkit-user-select:none; }
#tafel.an{ display:flex; }
#tafel.gruen{ background:#6b4423; }
.tb-leiste{ display:flex; gap:8px; align-items:center; padding:10px 16px; background:rgba(255,255,255,.85); box-shadow:0 4px 18px rgba(60,40,10,.08); color:var(--nacht); position:relative; z-index:4; }
#tafel.gruen .tb-leiste{ background:#5a381b; color:#fff7e6; box-shadow:none; }
.tb-leiste .titel{ font-weight:900; font-size:17px; margin:0 6px 0 2px; white-space:nowrap; color:#7c6a4f; }
#tafel.gruen .tb-leiste .titel{ color:#f4d9a6; }
.tb-k{ font:800 15px "Nunito",sans-serif; border:0; border-radius:999px; padding:9px 15px; background:#f1ece2; color:var(--nacht); cursor:pointer; display:inline-flex; gap:7px; align-items:center; white-space:nowrap; min-height:46px; transition:.15s; }
.tb-k:hover{ background:#e7dfcf; }
#tafel.gruen .tb-k{ background:rgba(255,255,255,.12); color:#fff7e6; }
.tb-k.an{ background:var(--gold) !important; color:#16324a !important; }
.tb-k.rund{ width:46px; padding:0; justify-content:center; }
.tb-buchstabe{ font:900 30px "Nunito",sans-serif; min-width:86px; height:56px; border-radius:18px; border:0; cursor:pointer; color:white; background:linear-gradient(135deg,#3d7ea6,#16324a); box-shadow:0 6px 16px rgba(22,50,74,.25); letter-spacing:.04em; }
.tb-luft{ flex:1; }
#buehne{ position:relative; flex:1; overflow:hidden; }
#blatt{ position:absolute; left:18px; right:18px; top:14px; bottom:96px; background:#fffdf8; border-radius:22px; box-shadow:0 10px 30px rgba(80,60,20,.12), 0 0 0 1px rgba(80,60,20,.06); overflow:hidden; }
#tafel.gruen #blatt{ background:radial-gradient(circle at 30% 20%, #2f6a50, #1f4a37); box-shadow:inset 0 0 60px rgba(0,0,0,.35), 0 0 0 10px #8a5a2e, 0 0 0 14px #5a381b; left:30px; right:30px; top:24px; bottom:104px; border-radius:10px; }
#zeilen{ position:absolute; inset:0; display:flex; flex-direction:column; justify-content:space-evenly; padding:1vh 1.4vw 1vh .6vw; }
.tb-zeile{ display:flex; align-items:center; gap:.6vw; }
.tb-zeile svg{ display:block; flex:none; }
.tb-marke{ flex:none; width:64px; display:flex; flex-direction:column; align-items:center; gap:4px; font:800 12px "Nunito",sans-serif; color:#8a7a60; text-align:center; line-height:1.1; }
.tb-marke span{ width:48px; height:48px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:24px; background:#fff1c2; box-shadow:0 3px 0 rgba(0,0,0,.06); }
.tb-marke.allein span{ background:#d9f2e3; }
.tb-marke.vorlage span{ background:#dceaf7; }
#tafel.gruen .tb-marke{ color:#d9ead1; } #tafel.gruen .tb-marke span{ background:rgba(255,255,255,.14); }
#malen{ position:absolute; left:0; top:0; width:100%; height:100%; touch-action:none; cursor:crosshair; }
#malen.aus{ pointer-events:none; }
.vorlage{ cursor:pointer; }
/* Stift-Palette unten (für die Kinder gut erreichbar) */
.tb-palette{ position:absolute; left:50%; bottom:14px; transform:translateX(-50%); z-index:3; display:flex; gap:10px; align-items:center; background:rgba(255,255,255,.95); border-radius:999px; padding:8px 14px; box-shadow:0 8px 24px rgba(60,40,10,.18); }
#tafel.gruen .tb-palette{ background:#5a381b; }
.tb-farbe{ width:52px; height:52px; border-radius:50%; border:4px solid white; cursor:pointer; padding:0; box-shadow:0 0 0 2px rgba(0,0,0,.12); transition:.15s; }
.tb-farbe.an{ transform:scale(1.12); box-shadow:0 0 0 4px var(--gold); }
.tb-trenn{ width:2px; height:36px; background:rgba(0,0,0,.08); border-radius:2px; }
/* Einstellungen */
#einstellungen{ position:absolute; top:0; left:0; right:0; max-height:100%; overflow:auto; background:white; color:var(--text); padding:16px 22px 22px; box-shadow:0 14px 40px rgba(0,0,0,.25); z-index:5; display:none; border-radius:0 0 22px 22px; }
#einstellungen.an{ display:block; }
#einstellungen h3{ margin:14px 0 8px; font-size:14px; text-transform:uppercase; letter-spacing:.05em; color:var(--grau); }
#einstellungen h3:first-child{ margin-top:0; }
.wahl{ display:flex; flex-wrap:wrap; gap:8px; }
.wahl button{ font:800 16px "Nunito",sans-serif; border:2px solid #d6dde3; background:white; border-radius:12px; padding:8px 14px; cursor:pointer; min-height:44px; }
.wahl button.an{ background:var(--nacht); border-color:var(--nacht); color:white; }
.buchst button{ min-width:52px; font-size:22px; padding:4px 8px; }
.buchst.gelernt button.an{ background:#2e8b57; border-color:#2e8b57; }
.buchst.gelernt button.aktuell{ outline:3px solid var(--gold); outline-offset:2px; }
.hilfe{ color:var(--grau); font-weight:700; font-size:14px; margin:6px 0 0; }
.zu{ position:sticky; top:0; float:right; }

/* ---------- Guten Morgen! (Tagesstart) ---------- */
#morgen{ position:fixed; inset:0; display:none; flex-direction:column; z-index:10; background:linear-gradient(160deg,#fff8e8 0%,#eef6fb 100%); color:#1f2d36; font-family:"Nunito",sans-serif; user-select:none; }
#morgen.an{ display:flex; }
.mg-leiste{ display:flex; gap:8px; align-items:center; padding:8px 16px; }
.mg-titel{ font-weight:900; color:#7c6a4f; font-size:17px; }
#mgInhalt{ flex:1; display:flex; flex-direction:column; padding:0 1.6vw 1.6vh; min-height:0; }
.mg-gruss{ display:flex; align-items:center; gap:1.2vw; margin:0 0 1.4vh; }
.mg-gruss h1{ flex:1; margin:0; font:900 clamp(26px,min(4.2vw,7vh),76px)/1.1 "Nunito",sans-serif; color:#16324a; }
.mg-sonne{ font-size:clamp(34px,min(5vw,8vh),90px); display:inline-block; }
.mg-sonne.dreht{ animation:mgSonne 12s linear infinite; }
.mg-warnung{ background:#fdecea; color:#a3261c; font-weight:900; border-radius:14px; padding:8px 14px; margin-bottom:8px; }
.mg-info-box{ background:#e9f7ee; color:#1d5c38; border-radius:14px; padding:12px 16px; font-weight:700; margin-bottom:8px; }
@keyframes mgSonne{ to{ transform:rotate(360deg); } }
.mg-uhr{ font:900 clamp(24px,min(3.2vw,5.5vh),58px) "Nunito",sans-serif; color:#16324a; background:white; border-radius:20px; padding:.15em .6em; box-shadow:0 6px 18px rgba(22,50,74,.1); font-variant-numeric:tabular-nums; }
.mg-raster{ flex:1; display:grid; grid-template-columns:27fr 40fr 33fr; gap:1.4vw; min-height:0; }
.mg-spalte{ display:flex; flex-direction:column; gap:1.4vw; min-height:0; }
.mg-karte{ background:white; border-radius:26px; box-shadow:0 10px 28px rgba(22,50,74,.09); padding:1.6vh 1.3vw; display:flex; flex-direction:column; min-height:0; overflow:hidden; position:relative; }
.mg-karte h2{ margin:0 0 .8vh; font:900 clamp(15px,min(1.5vw,2.6vh),28px) "Nunito",sans-serif; text-transform:uppercase; letter-spacing:.05em; color:#8a7a60; }
.mg-spalte .mg-karte{ flex:1; }
/* Datum */
.mg-datum{ text-align:center; border-top:10px solid var(--tf); }
.mg-kopfzeile{ display:flex; align-items:center; justify-content:space-between; }
.mg-pfeil{ border:0; background:#f3efe6; border-radius:50%; width:44px; height:44px; font:900 26px/1 "Nunito",sans-serif; color:#8a7a60; cursor:pointer; }
.mg-wtag{ font:900 clamp(30px,min(4.4vw,7.4vh),84px)/1.05 "Nunito",sans-serif; color:var(--tf); }
.mg-tagzahl{ font:800 clamp(18px,min(2.2vw,3.8vh),42px) "Nunito",sans-serif; color:#16324a; margin-top:.6vh; }
.mg-tagzahl b{ font-size:1.5em; }
.mg-info{ margin-top:.8vh; font-weight:800; color:#7c8a85; font-size:clamp(13px,min(1.2vw,2vh),22px); }
.mg-woche{ display:flex; justify-content:center; gap:.4vw; margin-top:1vh; }
.mg-woche span{ font:900 clamp(13px,min(1.3vw,2.2vh),24px) "Nunito",sans-serif; padding:.25em .45em; border-radius:10px; color:#9aa5ad; background:#f3f5f7; }
.mg-woche span.an{ background:var(--tf); color:white; transform:scale(1.15); }
.mg-jz{ margin-top:1.4vh; font:800 clamp(15px,min(1.6vw,2.7vh),30px) "Nunito",sans-serif; color:#8a7a60; display:flex; align-items:center; justify-content:center; gap:.4em; }
.mg-jz span{ font-size:1.8em; }
.mg-bdw{ flex:1.1 !important; background:linear-gradient(135deg,#fffdf6,#f2f8fd); }
.mg-bdw-reihe{ flex:1; display:flex; align-items:center; justify-content:center; gap:1.2vw; min-height:0; }
.mg-bdw-b{ font:700 clamp(44px,min(5.2vw,9vh),112px)/1.15 "Andika","Nunito",sans-serif; color:#1e4f8c; padding:.02em .3em .08em; border-radius:20px; background:#fff3c4; box-shadow:inset 0 -6px 0 rgba(0,0,0,.05); white-space:nowrap; }
.mg-bdw-b span{ margin-left:.12em; }
.mg-bdw-b.lang span{ margin-left:.35em; } .mg-bdw-b.lang{ font-size:clamp(34px,min(3.8vw,6.6vh),84px); }
.mg-wetter.kompakt{ display:grid; grid-template-columns:auto 1fr; grid-template-rows:auto 1fr auto auto; column-gap:1vw; align-items:center; text-align:left; justify-items:start; }
.mg-wetter.kompakt h2{ grid-column:1/-1; }
.mg-wetter.kompakt .mg-wbild{ grid-row:2/5; font-size:clamp(40px,min(4.6vw,8vh),96px); }
.mg-wetter.kompakt .mg-wtext{ align-self:end; } .mg-wetter.kompakt .mg-kleidung{ margin-top:.4vh; }
.mg-bdw-bild{ display:flex; flex-direction:column; align-items:center; }
.mg-bdw-bild span{ font-size:clamp(34px,min(4.2vw,7vh),84px); line-height:1.1; }
.mg-bdw-bild b{ font:800 clamp(15px,min(1.6vw,2.7vh),30px) "Nunito",sans-serif; color:#16324a; }
.mg-bdw-bild em{ font-style:normal; color:#e2574c; text-decoration:underline; text-decoration-thickness:3px; text-underline-offset:3px; }
.mg-spalte .mg-datum{ flex:0 1 auto; }
.mg-bdw-teil{ display:flex; align-items:center; gap:.8vw; cursor:pointer; }
.mg-bdw.mehrere .mg-bdw-reihe{ justify-content:space-around; gap:.6vw; }
.mg-bdw.mehrere .mg-bdw-teil{ flex-direction:column; gap:.4vh; }
.mg-bdw.mehrere .mg-bdw-b{ font-size:clamp(30px,min(3.2vw,5.6vh),70px); padding:0 .2em .04em; border-radius:14px; }
.mg-bdw.mehrere .mg-bdw-b.lang{ font-size:clamp(24px,min(2.5vw,4.4vh),54px); }
.mg-bdw.mehrere .mg-bdw-bild{ flex-direction:row; gap:.3vw; }
.mg-bdw.mehrere .mg-bdw-bild span{ font-size:clamp(20px,min(2.2vw,3.8vh),44px); }
.mg-bdw.mehrere .mg-bdw-bild b{ font-size:clamp(12px,min(1.2vw,2vh),22px); }
.mg-bdw.n2 .mg-bdw-b{ font-size:clamp(36px,min(4vw,7.4vh),92px); } .mg-bdw.n2 .mg-bdw-b.lang{ font-size:clamp(26px,min(2.8vw,5vh),64px); }
.mg-bdw.n2 .mg-bdw-bild span{ font-size:clamp(24px,min(2.6vw,4.4vh),52px); } .mg-bdw.n2 .mg-bdw-bild b{ font-size:clamp(14px,min(1.4vw,2.4vh),26px); }
.mg-bdw.n3 .mg-bdw-b, .mg-bdw.n4 .mg-bdw-b{ font-size:clamp(22px,min(2.3vw,4vh),50px); }
.mg-bdw.n3 .mg-bdw-bild b, .mg-bdw.n4 .mg-bdw-bild b{ display:none; }
.mg-stunden li{ cursor:pointer; }
.mg-stunden li.vorbei{ opacity:.38; filter:saturate(.4); }
.mg-stunden li.gleich{ box-shadow:0 0 0 3px var(--ff); background:white; }
.mg-stunden li.ausfall{ opacity:.55; } .mg-stunden li.ausfall .mg-fach b{ text-decoration:line-through; text-decoration-thickness:3px; }
.mg-marke{ background:#fff1c2; color:#8a5a00; border-radius:999px; padding:.15em .6em; font:900 clamp(11px,min(1.05vw,1.8vh),20px) "Nunito",sans-serif; white-space:nowrap; }
.mg-marke.rot{ background:#fdecea; color:#a3261c; }
.mg-jetzt.gleich{ background:white; color:var(--ff); box-shadow:inset 0 0 0 2px var(--ff); }
.mg-jetzt.klein{ font-size:.85em; padding:.1em .6em; margin-left:.4em; background:#e09a2c; }
.mg-pause.jetzt{ background:#fff3c4 !important; border-radius:14px; padding:.5vh .6vw !important; color:#8a5a00; font-size:clamp(15px,min(1.6vw,2.7vh),30px) !important; }
.mg-pause.vorbei{ opacity:.38; }
.mg-h2-knopf{ display:flex; align-items:center; justify-content:space-between; gap:8px; }
.mg-k.klein{ min-height:34px; padding:5px 12px; font-size:13px; text-transform:none; letter-spacing:0; }
.mg-fuer{ display:flex; align-items:center; gap:.5vw; font:900 clamp(16px,min(1.8vw,3vh),34px) "Nunito",sans-serif; color:var(--ff); margin:-.2vh 0 1vh; }
.mg-fuer span{ font-size:1.3em; }
.mg-aendern table{ border-spacing:6px 4px; } .mg-aendern td{ min-width:0 !important; vertical-align:middle; }
.mg-aendern select, .mg-aendern input[data-al]{ font:700 15px "Nunito",sans-serif; padding:6px 8px; border:2px solid #e2ddd2; border-radius:10px; margin:2px; }
.mg-aendern tr.fokus td{ background:#fff8e1; }
.mg-ausfall{ display:flex; gap:6px; align-items:center; font-weight:800; color:#a3261c; white-space:nowrap; }
.mg-dialog{ max-height:92vh; overflow:auto; }
.mg-sdw{ display:flex; align-items:center; gap:.6vw; background:linear-gradient(135deg,#fff3c4,#ffe08a); border-radius:22px; padding:.4em 1em .4em .6em; box-shadow:0 6px 18px rgba(200,140,0,.18); }
.mg-sdw span{ font-size:clamp(26px,min(3vw,5vh),54px); animation:mgSonne 8s linear infinite; display:inline-block; }
.mg-sdw small{ display:block; font:800 clamp(11px,min(1vw,1.7vh),18px) "Nunito",sans-serif; color:#8a5a00; text-transform:uppercase; letter-spacing:.05em; }
.mg-sdw b{ display:block; font:900 clamp(20px,min(2.4vw,4vh),44px)/1.05 "Nunito",sans-serif; color:#16324a; }
.mg-schluss{ margin-top:1vh; border-top:2px dashed #eee6d6; padding-top:.8vh; display:flex; flex-direction:column; gap:.6vh; }
.mg-schluss h3{ margin:0; font:900 clamp(13px,min(1.2vw,2vh),22px) "Nunito",sans-serif; text-transform:uppercase; letter-spacing:.05em; color:#c0392b; }
.mg-check{ display:flex; align-items:center; gap:.6vw; text-align:left; border:3px solid #f0ebe0; background:#fffdf8; border-radius:14px; padding:.5vh .7vw; font:800 clamp(13px,min(1.3vw,2.2vh),24px) "Nunito",sans-serif; color:#16324a; cursor:pointer; }
.mg-check span{ font-size:1.4em; }
.mg-check.ok{ border-color:#2e9e5b; background:#e9f7ee; text-decoration:line-through; color:#5d7a68; }
.mg-dienste{ flex:1 !important; }
.mg-dliste{ display:grid; grid-template-columns:1fr 1fr; gap:.6vh .8vw; align-content:start; }
.mg-dienst{ display:flex; align-items:center; gap:.5vw; background:#f8f6f1; border-radius:14px; padding:.4vh .6vw; min-width:0; }
.mg-dienst span{ font-size:clamp(20px,min(2.2vw,3.6vh),40px); }
.mg-dienst small{ display:block; font:800 clamp(10px,min(.95vw,1.6vh),17px) "Nunito",sans-serif; color:#8a7a60; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.mg-dienst b{ display:block; font:900 clamp(13px,min(1.35vw,2.3vh),25px) "Nunito",sans-serif; color:#16324a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.mg-dienst div{ min-width:0; }
.mg-achtung.weg{ display:none; }
.mg-schalter{ display:flex !important; align-items:center; gap:8px; text-transform:none !important; letter-spacing:0 !important; font-size:15px !important; color:#16324a !important; cursor:pointer; }
.mg-schalter input{ width:20px !important; height:20px; }
.mg-heute{ margin:1vh auto 0; border:0; background:#fff1c2; border-radius:999px; padding:6px 14px; font:800 14px "Nunito",sans-serif; cursor:pointer; }
/* Wetter */
.mg-wetter{ text-align:center; cursor:pointer; align-items:center; justify-content:center; }
.mg-wetter h2{ align-self:stretch; text-align:left; }
.mg-wbild{ font-size:clamp(46px,min(6.5vw,11vh),130px); line-height:1.1; }
.mg-wtext{ font:900 clamp(18px,min(2vw,3.4vh),38px) "Nunito",sans-serif; color:#16324a; }
.mg-temp{ font:800 clamp(15px,min(1.5vw,2.6vh),28px) "Nunito",sans-serif; color:#3d7ea6; margin-top:.4vh; }
.mg-kleidung{ margin-top:.8vh; background:#eef6fb; border-radius:999px; padding:.3em .9em; font:800 clamp(13px,min(1.3vw,2.2vh),24px) "Nunito",sans-serif; color:#16324a; }
.mg-tipp{ color:#9aa5ad; font-weight:700; font-size:14px; }
/* Stundenplan */
.mg-stunden{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:.9vh; flex:1; min-height:0; justify-content:flex-start; }
.mg-stunden li{ display:flex; align-items:center; gap:.9vw; background:#f8f6f1; border-radius:18px; padding:.7vh .9vw; border-left:10px solid var(--ff); flex:0 1 auto; min-height:0; }
.mg-nr{ font:900 clamp(15px,min(1.5vw,2.6vh),28px) "Nunito",sans-serif; color:#9aa5ad; width:1.4em; text-align:center; }
.mg-fe{ font-size:clamp(26px,min(3vw,5vh),56px); line-height:1; }
.mg-fach{ flex:1; display:flex; flex-direction:column; }
.mg-fach b{ font:900 clamp(18px,min(2.1vw,3.6vh),40px)/1.1 "Nunito",sans-serif; color:#16324a; }
.mg-fach small{ font:700 clamp(13px,min(1.3vw,2.2vh),24px) "Nunito",sans-serif; color:#7c8a85; }
.mg-zeit{ font:800 clamp(13px,min(1.3vw,2.2vh),24px) "Nunito",sans-serif; color:#7c8a85; font-variant-numeric:tabular-nums; }
.mg-stunden li.jetzt{ background:white; box-shadow:0 0 0 4px var(--ff), 0 8px 20px rgba(0,0,0,.12); transform:scale(1.02); }
.mg-stunden li.vorbei{ opacity:.45; }
.mg-jetzt{ background:var(--ff); color:white; border-radius:999px; padding:.15em .7em; font:900 clamp(13px,min(1.3vw,2.2vh),24px) "Nunito",sans-serif; }
.mg-pause{ background:transparent !important; border-left:0 !important; justify-content:center; font:800 clamp(13px,min(1.3vw,2.2vh),24px) "Nunito",sans-serif; color:#9a8a6a; padding:0 !important; gap:.5vw !important; }
.mg-pause small{ color:#b0a58f; }
#morgen.klein .mg-fach b{ font-size:clamp(20px,min(2.4vw,4.2vh),46px); }
#morgen.klein .mg-fe{ font-size:clamp(30px,min(3.6vw,6vh),66px); }
/* Auspacken */
.mg-dinge{ display:grid; grid-template-columns:repeat(auto-fill,minmax(clamp(80px,8.5vw,160px),1fr)); gap:.8vw; align-content:start; }
.mg-ding{ border:3px solid #f0ebe0; background:#fffdf8; border-radius:18px; padding:.6vh .3vw; display:flex; flex-direction:column; align-items:center; gap:.2vh; cursor:pointer; font-family:"Nunito",sans-serif; position:relative; }
.mg-ding span{ font-size:clamp(28px,min(3.2vw,5.4vh),60px); line-height:1.15; }
.mg-ding b{ font:800 clamp(12px,min(1.15vw,2vh),22px) "Nunito",sans-serif; color:#16324a; }
.mg-ding.ok{ border-color:#2e9e5b; background:#e9f7ee; }
.mg-ding.ok::after{ content:"✓"; position:absolute; top:-8px; right:-6px; background:#2e9e5b; color:white; border-radius:50%; width:28px; height:28px; font:900 18px/28px "Nunito",sans-serif; }
/* Beachten */
.mg-achtung{ background:#fff8e1; }
.mg-spalte .mg-pack{ flex:1.5; }
.mg-dinge.viele{ grid-template-columns:repeat(4,1fr); gap:.5vw; } .mg-dinge.viele .mg-ding span{ font-size:clamp(22px,min(2.4vw,4vh),46px); } .mg-dinge.viele .mg-ding b{ font-size:clamp(11px,min(.95vw,1.7vh),18px); }
.mg-dinge.sehr-viele{ grid-template-columns:repeat(5,1fr); gap:.4vw; } .mg-dinge.sehr-viele .mg-ding span{ font-size:clamp(18px,min(2vw,3.3vh),40px); } .mg-dinge.sehr-viele .mg-ding b{ font-size:clamp(10px,min(.85vw,1.5vh),16px); }
.mg-hinweise{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:.9vh; }
.mg-hinweise li{ display:flex; gap:.7vw; align-items:center; background:white; border-radius:16px; padding:.7vh .8vw; font:800 clamp(15px,min(1.6vw,2.7vh),30px)/1.2 "Nunito",sans-serif; color:#16324a; }
.mg-hinweise li span{ font-size:1.5em; }
.mg-leer{ margin:auto; text-align:center; font:800 clamp(16px,min(1.6vw,2.7vh),30px)/1.4 "Nunito",sans-serif; color:#9aa5ad; }
.mg-leer.klein{ font-size:clamp(14px,min(1.3vw,2.2vh),24px); }
/* Dialoge und Editor */
.mg-k{ font:800 15px "Nunito",sans-serif; border:0; border-radius:999px; padding:9px 16px; background:#16324a; color:white; cursor:pointer; min-height:42px; }
.mg-k.hell{ background:#f1ece2; color:#16324a; } .mg-k.rot{ background:#fdecea; color:#a3261c; margin-top:16px; }
.mg-overlay{ position:absolute; inset:0; background:rgba(22,50,74,.45); display:flex; align-items:center; justify-content:center; z-index:20; }
.mg-dialog{ background:white; border-radius:26px; padding:24px 28px; max-width:min(900px,94vw); box-shadow:0 20px 60px rgba(0,0,0,.3); }
.mg-dialog h2{ margin:0 0 14px; font:900 28px "Nunito",sans-serif; color:#16324a; }
.mg-wwahl{ display:grid; grid-template-columns:repeat(5,1fr); gap:10px; margin-bottom:14px; }
.mg-wwahl button{ border:3px solid #eef1f4; background:#fafcfd; border-radius:18px; padding:10px 6px; font:800 16px "Nunito",sans-serif; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:4px; }
.mg-wwahl button span{ font-size:48px; }
.mg-reihe{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
#mgEditor{ position:absolute; inset:0; background:#fbfaf6; z-index:15; display:none; flex-direction:column; user-select:text; }
#mgEditor.an{ display:flex; }
.mg-ed-kopf{ display:flex; gap:10px; align-items:center; padding:12px 18px; background:white; box-shadow:0 4px 14px rgba(0,0,0,.06); flex-wrap:wrap; }
.mg-reiter{ display:flex; gap:6px; flex-wrap:wrap; flex:1; }
.mg-reiter button{ border:0; background:#f1ece2; border-radius:999px; padding:10px 16px; font:800 15px "Nunito",sans-serif; cursor:pointer; }
.mg-reiter button.an{ background:#16324a; color:white; }
.mg-status{ font-weight:800; color:#2e9e5b; font-size:14px; }
.mg-ed-inhalt{ flex:1; overflow:auto; padding:18px 22px 40px; max-width:1300px; width:100%; margin:0 auto; }
.mg-ed-inhalt label{ display:block; font-weight:900; font-size:13px; text-transform:uppercase; letter-spacing:.04em; color:#8a7a60; margin:16px 0 6px; }
.mg-ed-inhalt input, .mg-ed-inhalt select{ font:700 15px "Nunito",sans-serif; padding:8px 10px; border:2px solid #e2ddd2; border-radius:10px; background:white; width:100%; }
.mg-felder{ display:grid; grid-template-columns:1fr 1fr; gap:4px 18px; }
.mg-chip{ border:2px solid #e2ddd2; background:white; border-radius:999px; padding:8px 16px; font:800 15px "Nunito",sans-serif; cursor:pointer; }
.mg-chip.an{ background:#16324a; color:white; border-color:#16324a; }
.mg-hilfe{ color:#7c8a85; font-weight:700; font-size:14px; }
.mg-tabelle{ overflow-x:auto; }
.mg-tabelle table{ border-collapse:separate; border-spacing:6px; width:100%; }
.mg-tabelle th{ font-size:13px; color:#8a7a60; text-align:left; }
.mg-tabelle td{ vertical-align:top; min-width:150px; }
.mg-tabelle td:first-child{ min-width:30px; } .mg-tabelle td.mg-zeiten{ min-width:90px; }
.mg-tabelle td select, .mg-tabelle td input{ margin-bottom:4px; font-size:14px; padding:6px 8px; }
.mg-pausen .mg-reihe{ margin-bottom:6px; } .mg-pausen select{ width:auto !important; } .mg-pausen input{ width:auto; }
.mg-matliste{ display:grid; grid-template-columns:repeat(auto-fill,minmax(420px,1fr)); gap:10px; }
.mg-mat{ background:white; border-radius:14px; padding:10px 12px; box-shadow:0 2px 8px rgba(0,0,0,.04); }
.mg-mat b{ display:block; margin-bottom:6px; }
.mg-mini{ border:2px solid #eee; background:white; border-radius:12px; width:78px; min-height:68px; margin:2px; cursor:pointer; opacity:.5; display:inline-flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; padding:4px 2px; vertical-align:top; }
.mg-mini span{ font-size:24px; line-height:1; height:28px; display:flex; align-items:center; }
.mg-mini small{ font:800 10.5px/1.1 "Nunito",sans-serif; color:#16324a; text-align:center; }
.mg-mini .mg-ordner, .mg-vorschau .mg-ordner{ width:30px; height:26px; }
.mg-ding .mg-ordner{ width:1.15em; height:1em; }
.mg-chips{ display:flex; flex-wrap:wrap; gap:2px; }
.mg-mat.breit{ max-width:none; }
.mg-liste{ display:flex; flex-direction:column; gap:6px; }
.mg-eintrag{ background:white; border-radius:12px; padding:6px 10px; }
.mg-eintrag input[type=color]{ width:48px; height:38px; padding:2px; }
.mg-vorschau{ font-size:26px; width:40px; text-align:center; }
.mg-farbwahl{ display:flex !important; align-items:center; gap:4px; margin:0 !important; text-transform:none !important; letter-spacing:0 !important; font-size:14px !important; color:#16324a !important; }
.mg-farbwahl input{ width:auto !important; }
.mg-mini.an{ opacity:1; border-color:#2e9e5b; background:#e9f7ee; }
.mg-neuhinweis{ display:flex; gap:8px; flex-wrap:wrap; align-items:center; background:white; padding:12px; border-radius:14px; }
.mg-neuhinweis select{ width:auto !important; } .mg-neuhinweis input{ flex:1 1 260px; width:auto !important; }
.mg-hliste{ list-style:none; padding:0; display:flex; flex-direction:column; gap:6px; }
.mg-hliste li{ display:flex; gap:10px; align-items:center; background:white; border-radius:12px; padding:8px 12px; }
.mg-hliste li span{ font-size:24px; } .mg-hliste li b{ flex:1; } .mg-hliste li small{ color:#7c8a85; font-weight:700; }
@media (max-width:900px){ .mg-raster{ grid-template-columns:1fr; overflow:auto; } #mgInhalt{ overflow:auto; } .mg-felder{ grid-template-columns:1fr; } .mg-wwahl{ grid-template-columns:repeat(3,1fr); } }
</style>
</head>
<body>

<div class="uebersicht" id="uebersicht">
    <a class="zurueck" href="<?= $LT_GAST ? "gast.php" : "index.php" ?>"><i class="fa-solid fa-arrow-left"></i> Leuchtturm</a>
    <h1><i class="fa-solid fa-chalkboard"></i> Tafelbilder</h1>
    <p class="unter">Für die digitale Tafel: öffnen, Vollbild an, mit dem Tafelstift direkt hineinschreiben.</p>
    <div class="kacheln">
        <button class="kachel" type="button" onclick="kursOeffnen()">
            <div class="bild" id="kachelBild"></div>
            <h2>Buchstabenkurs</h2>
            <p>Buchstaben in der Lineatur vorschreiben, nachspuren und selbst schreiben – groß und klein, Druck- oder Grundschrift.</p>
        </button>
        <button class="kachel" type="button" onclick="tafelMorgen.oeffnen()">
            <div class="bild" style="font-size:44px;gap:10px;background:linear-gradient(135deg,#fff7df,#e8f4fb)">☀️<span style="font:900 20px Nunito,sans-serif;color:#16324a">Guten Morgen!</span></div>
            <h2>Guten Morgen! – Tagesstart</h2>
            <p>Zum Stundenanfang: Begrüßung, Datum, Wetter, Stundenplan mit Lehrkräften, was auspacken, was beachten – passend für Kl. 1/2 oder 3/4.</p>
        </button>
    </div>
</div>

<div id="morgen">
    <div class="mg-leiste">
        <button class="tb-k rund" onclick="tafelMorgen.schliessen()" title="Zurück zur Übersicht"><i class="fa-solid fa-arrow-left"></i></button>
        <span class="mg-titel">Guten Morgen!</span>
        <span class="tb-luft"></span>
        <button class="tb-k" onclick="tafelMorgen.bearbeiten()" title="Klasse, Stundenplan, Material, Hinweise"><i class="fa-solid fa-pen"></i> Bearbeiten</button>
        <button class="tb-k rund" onclick="vollbild()" title="Vollbild"><i class="fa-solid fa-expand"></i></button>
    </div>
    <div id="mgInhalt"></div>
    <div id="mgEditor"></div>
</div>

<div id="tafel">
    <div class="tb-leiste">
        <button class="tb-k rund" onclick="kursSchliessen()" title="Zurück zur Übersicht"><i class="fa-solid fa-arrow-left"></i></button>
        <span class="titel">Buchstabenkurs</span>
        <button class="tb-k rund" onclick="buchstabeSchritt(-1)" title="voriger Buchstabe"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="tb-buchstabe" id="kBuchstabe" onclick="einstellungen()" title="Buchstabe wählen"></button>
        <button class="tb-k rund" onclick="buchstabeSchritt(1)" title="nächster gelernter Buchstabe"><i class="fa-solid fa-chevron-right"></i></button>
        <button class="tb-k" id="kAnsicht" onclick="einstellungen()"></button>
        <span class="tb-luft"></span>
        <button class="tb-k" onclick="vormachen()" title="Schreibweg der Vorlage zeigen"><i class="fa-solid fa-play"></i> Schreibweg</button>
        <button class="tb-k rund" onclick="neuMischen()" title="andere Wörter / neu mischen"><i class="fa-solid fa-shuffle"></i></button>
        <button class="tb-k rund" onclick="einstellungen()" title="Einstellungen"><i class="fa-solid fa-sliders"></i></button>
        <button class="tb-k rund" onclick="vollbild()" title="Vollbild"><i class="fa-solid fa-expand"></i></button>
    </div>
    <div id="buehne">
        <div id="blatt"><div id="zeilen"></div></div>
        <canvas id="malen"></canvas>
        <div class="tb-palette">
            <button class="tb-farbe an" style="background:#1d5fbf" data-farbe="#1d5fbf" title="Blau"></button>
            <button class="tb-farbe" style="background:#d1342b" data-farbe="#d1342b" title="Rot"></button>
            <button class="tb-farbe" style="background:#1f8a4c" data-farbe="#1f8a4c" title="Grün"></button>
            <button class="tb-farbe" style="background:#f2a93b" data-farbe="#f2a93b" title="Orange"></button>
            <button class="tb-farbe" style="background:#222" data-farbe="#222222" title="Schwarz"></button>
            <span class="tb-trenn"></span>
            <button class="tb-k" id="kDicke" onclick="dickeWechseln()" title="Stiftdicke"><i class="fa-solid fa-pen"></i> dick</button>
            <button class="tb-k rund" id="kRadierer" onclick="radierer()" title="Radierer"><i class="fa-solid fa-eraser"></i></button>
            <button class="tb-k rund" id="kHand" onclick="stiftAus()" title="Stift aus – Vorlagen antippen"><i class="fa-solid fa-hand-pointer"></i></button>
            <button class="tb-k rund" onclick="rueckgaengig()" title="Rückgängig"><i class="fa-solid fa-rotate-left"></i></button>
            <button class="tb-k" onclick="wischen()" title="Alles wegwischen"><i class="fa-solid fa-broom"></i> Wischen</button>
        </div>
        <div id="einstellungen">
            <button class="tb-k zu" style="background:var(--nacht)" onclick="einstellungen(false)"><i class="fa-solid fa-check"></i> Fertig</button>
            <h3>Schrift</h3>
            <div class="wahl" data-wahl="schrift"><button data-wert="druck">Druckschrift</button><button data-wert="grund">Grundschrift</button></div>
            <h3>Was soll an die Tafel?</h3>
            <div class="wahl" data-wahl="ansicht"><button data-wert="buchstabe">Neuer Buchstabe</button><button data-wert="wiederholung">Alle gelernten Buchstaben</button><button data-wert="woerter">Wörter</button><button data-wert="leer">Leere Lineatur</button></div>
            <h3>Buchstabe der Stunde</h3>
            <div class="wahl buchst" id="wahlAktuell"></div>
            <h3>Schon gelernt <span style="text-transform:none;letter-spacing:0">(antippen = an/aus · für Wiederholung und Wörter)</span></h3>
            <div class="wahl buchst gelernt" id="wahlGelernt"></div>
            <div class="wahl" style="margin-top:8px"><button onclick="gelerntBisAktuell()">bis zum Buchstaben der Stunde</button><button onclick="gelerntAlle(true)">alle</button><button onclick="gelerntAlle(false)">keine</button></div>
            <h3>Zeilen <span style="text-transform:none;letter-spacing:0">(bei Wiederholung, Wörtern und leerer Lineatur – „Neuer Buchstabe“ hat immer: groß nachspuren · groß allein · klein nachspuren · klein allein)</span></h3>
            <div class="wahl" data-wahl="zeilen"><button data-wert="2">2 – ganz groß</button><button data-wert="3">3</button><button data-wert="4">4</button><button data-wert="5">5</button></div>
            <h3>Nachspuren</h3>
            <div class="wahl" data-wahl="spur"><button data-wert="punkte">gepunktet</button><button data-wert="grau">hellgrau</button></div>
            <div class="wahl" data-wahl="start" style="margin-top:8px"><button data-wert="ja">Startpunkte und Reihenfolge zeigen</button><button data-wert="nein">ohne Startpunkte</button></div>
            <h3>Hintergrund</h3>
            <div class="wahl" data-wahl="hg"><button data-wert="weiss">weiß</button><button data-wert="gruen">Kreidetafel grün</button></div>
            <p class="hilfe"><i class="fa-solid fa-circle-info"></i> Mit dem Tafelstift direkt auf die Lineatur schreiben. „Schreibweg“ zeigt Strich für Strich, wie der Buchstabe geschrieben wird – bei ausgeschaltetem Stift (<i class="fa-solid fa-hand-pointer"></i>) auch durch Antippen der Vorlage.</p>
        </div>
    </div>
</div>

<script>
window.TAFEL_DATEN = <?= json_encode($tbDaten, $JSON) ?>;
window.TAFEL_CSRF = <?= json_encode($_SESSION["tafel_csrf"]) ?>;
</script>
<script src="tafel-morgen.js?v=<?= @filemtime(__DIR__ . "/tafel-morgen.js") ?>"></script>
<script>
"use strict";
/* ---------- Buchstaben als Schreibwege ----------
   Einheit: 1 = Höhe eines Bandes der Lineatur.
   y: 0 = Oberlinie, 1 = Mittellinie, 2 = Grundlinie, 3 = Unterlinie.
   Jede Zeichenkette ist ein Strich in Schreibrichtung; Reihenfolge = Schreibreihenfolge.
   „.“ am Anfang = Punkt (i-Punkt, Umlaut-Punkte). */
const KREIS = (cx, cy, rx, ry) => `M${cx + rx},${cy} A${rx},${ry} 0 0 0 ${cx - rx},${cy} A${rx},${ry} 0 0 0 ${cx + rx},${cy}`;  // gegen den Uhrzeigersinn, Start rechts
const OVAL_OBEN = (cx, cy, rx, ry) => `M${cx},${cy - ry} A${rx},${ry} 0 0 0 ${cx},${cy + ry} A${rx},${ry} 0 0 0 ${cx},${cy - ry}`;
const BAUCH_R = (x, cy, rx, ry) => `M${x},${cy} A${rx},${ry} 0 0 1 ${x + 2 * rx},${cy} A${rx},${ry} 0 0 1 ${x},${cy}`;   // im Uhrzeigersinn (b, p)
const PUNKT = (x, y) => `.${x},${y}`;
const DRUCK = {
    a: { w: 1.0, s: [KREIS(0.5, 1.5, 0.45, 0.5), "M0.95,1 L0.95,2"] },
    b: { w: 1.0, s: ["M0.05,0 L0.05,2", BAUCH_R(0.05, 1.5, 0.45, 0.5)] },
    c: { w: 0.9, s: ["M0.85,1.17 A0.45,0.5 0 1 0 0.85,1.83"] },
    d: { w: 1.0, s: [KREIS(0.5, 1.5, 0.45, 0.5), "M0.95,0 L0.95,2"] },
    e: { w: 0.95, s: ["M0.06,1.5 L0.94,1.5 A0.45,0.5 0 1 0 0.83,1.84"] },
    f: { w: 0.8, s: ["M0.78,0.18 C0.66,-0.04 0.3,-0.06 0.3,0.38 L0.3,2", "M0.02,1 L0.68,1"] },
    g: { w: 1.0, s: [KREIS(0.5, 1.5, 0.45, 0.5), "M0.95,1 L0.95,2.55 Q0.95,3 0.5,3 Q0.2,3 0.08,2.82"] },
    h: { w: 1.0, s: ["M0.05,0 L0.05,2", "M0.05,1.45 Q0.05,1 0.5,1 Q0.95,1 0.95,1.45 L0.95,2"] },
    i: { w: 0.25, s: ["M0.12,1 L0.12,2", PUNKT(0.12, 0.5)] },
    j: { w: 0.7, s: ["M0.55,1 L0.55,2.6 Q0.55,3 0.25,3 Q0.1,3 0.02,2.88", PUNKT(0.55, 0.5)] },
    k: { w: 0.9, s: ["M0.05,0 L0.05,2", "M0.82,1 L0.05,1.6", "M0.32,1.38 L0.88,2"] },
    l: { w: 0.25, s: ["M0.12,0 L0.12,2"] },
    m: { w: 1.45, s: ["M0.05,1 L0.05,2", "M0.05,1.4 Q0.05,1 0.4,1 Q0.72,1 0.72,1.4 L0.72,2", "M0.72,1.4 Q0.72,1 1.07,1 Q1.4,1 1.4,1.4 L1.4,2"] },
    n: { w: 0.95, s: ["M0.05,1 L0.05,2", "M0.05,1.45 Q0.05,1 0.48,1 Q0.9,1 0.9,1.45 L0.9,2"] },
    o: { w: 1.0, s: [OVAL_OBEN(0.5, 1.5, 0.45, 0.5)] },
    p: { w: 1.0, s: ["M0.05,1 L0.05,3", BAUCH_R(0.05, 1.5, 0.45, 0.5)] },
    q: { w: 1.0, s: [KREIS(0.5, 1.5, 0.45, 0.5), "M0.95,1 L0.95,3"] },
    r: { w: 0.75, s: ["M0.05,1 L0.05,2", "M0.05,1.45 Q0.1,1 0.52,1 Q0.66,1 0.74,1.08"] },
    s: { w: 0.85, s: ["M0.8,1.15 Q0.66,1 0.44,1 Q0.1,1 0.1,1.25 Q0.1,1.46 0.44,1.5 Q0.82,1.55 0.82,1.76 Q0.82,2 0.42,2 Q0.15,2 0.04,1.84"] },
    t: { w: 0.75, s: ["M0.35,0.3 L0.35,2", "M0.04,1 L0.7,1"] },
    u: { w: 0.95, s: ["M0.05,1 L0.05,1.55 Q0.05,2 0.48,2 Q0.9,2 0.9,1.55", "M0.9,1 L0.9,2"] },
    v: { w: 1.0, s: ["M0.05,1 L0.5,2 L0.95,1"] },
    w: { w: 1.4, s: ["M0.05,1 L0.38,2 L0.7,1.1 L1.02,2 L1.35,1"] },
    x: { w: 0.9, s: ["M0.05,1 L0.85,2", "M0.85,1 L0.05,2"] },
    y: { w: 1.0, s: ["M0.05,1 L0.5,2", "M0.95,1 L0.25,3"] },
    z: { w: 0.9, s: ["M0.08,1 L0.84,1 L0.06,2 L0.88,2"] },
    "ß": { w: 1.0, s: ["M0.06,2 L0.06,0.5 Q0.06,0 0.45,0 Q0.84,0 0.84,0.45 Q0.84,0.86 0.42,0.98 Q0.96,1.08 0.96,1.5 Q0.96,2 0.48,2 L0.36,2"] },
    A: { w: 1.25, s: ["M0.05,2 L0.62,0 L1.2,2", "M0.3,1.25 L0.95,1.25"] },
    B: { w: 1.1, s: ["M0.1,0 L0.1,2", "M0.1,0 L0.55,0 Q0.95,0 0.95,0.5 Q0.95,1 0.55,1 L0.1,1", "M0.1,1 L0.6,1 Q1.05,1 1.05,1.5 Q1.05,2 0.6,2 L0.1,2"] },
    C: { w: 1.25, s: ["M1.18,0.4 A0.62,1 0 1 0 1.18,1.6"] },
    D: { w: 1.25, s: ["M0.1,0 L0.1,2", "M0.1,0 L0.45,0 Q1.18,0 1.18,1 Q1.18,2 0.45,2 L0.1,2"] },
    E: { w: 0.95, s: ["M0.1,0 L0.1,2", "M0.1,0 L0.9,0", "M0.1,1 L0.76,1", "M0.1,2 L0.9,2"] },
    F: { w: 0.9, s: ["M0.1,0 L0.1,2", "M0.1,0 L0.88,0", "M0.1,1 L0.74,1"] },
    G: { w: 1.3, s: ["M1.18,0.4 A0.62,1 0 1 0 1.24,1.45", "M0.78,1.1 L1.24,1.1 L1.24,2"] },
    H: { w: 1.2, s: ["M0.1,0 L0.1,2", "M1.1,0 L1.1,2", "M0.1,1 L1.1,1"] },
    I: { w: 0.3, s: ["M0.15,0 L0.15,2"] },
    J: { w: 0.95, s: ["M0.88,0 L0.88,1.48 Q0.88,2 0.46,2 Q0.12,2 0.04,1.64"] },
    K: { w: 1.1, s: ["M0.1,0 L0.1,2", "M1.0,0 L0.1,1.18", "M0.44,0.76 L1.06,2"] },
    L: { w: 0.9, s: ["M0.1,0 L0.1,2 L0.88,2"] },
    M: { w: 1.45, s: ["M0.1,2 L0.1,0 L0.72,1.25 L1.35,0 L1.35,2"] },
    N: { w: 1.2, s: ["M0.1,2 L0.1,0 L1.08,2 L1.08,0"] },
    O: { w: 1.35, s: [OVAL_OBEN(0.67, 1, 0.62, 1)] },
    P: { w: 1.05, s: ["M0.1,0 L0.1,2", "M0.1,0 L0.55,0 Q1.0,0 1.0,0.55 Q1.0,1.1 0.55,1.1 L0.1,1.1"] },
    Q: { w: 1.4, s: [OVAL_OBEN(0.67, 1, 0.62, 1), "M0.82,1.48 L1.34,2.12"] },
    R: { w: 1.1, s: ["M0.1,0 L0.1,2", "M0.1,0 L0.55,0 Q1.0,0 1.0,0.55 Q1.0,1.1 0.55,1.1 L0.1,1.1", "M0.5,1.1 L1.06,2"] },
    S: { w: 1.1, s: ["M1.0,0.3 Q0.86,0 0.55,0 Q0.12,0 0.12,0.48 Q0.12,0.9 0.6,1 Q1.08,1.1 1.08,1.52 Q1.08,2 0.55,2 Q0.2,2 0.04,1.7"] },
    T: { w: 1.2, s: ["M0.05,0 L1.15,0", "M0.6,0 L0.6,2"] },
    U: { w: 1.2, s: ["M0.1,0 L0.1,1.4 Q0.1,2 0.6,2 Q1.1,2 1.1,1.4 L1.1,0"] },
    V: { w: 1.25, s: ["M0.05,0 L0.62,2 L1.2,0"] },
    W: { w: 1.65, s: ["M0.05,0 L0.42,2 L0.82,0.15 L1.22,2 L1.6,0"] },
    X: { w: 1.15, s: ["M0.06,0 L1.08,2", "M1.08,0 L0.06,2"] },
    Y: { w: 1.2, s: ["M0.05,0 L0.6,1", "M1.15,0 L0.6,1 L0.6,2"] },
    Z: { w: 1.1, s: ["M0.1,0 L1.04,0 L0.06,2 L1.06,2"] },
};
// Umlaute
const umlaut = (b, y, x1, x2) => ({ w: DRUCK[b].w, s: DRUCK[b].s.concat([PUNKT(x1, y), PUNKT(x2, y)]) });
DRUCK["ä"] = umlaut("a", 0.55, 0.3, 0.7); DRUCK["ö"] = umlaut("o", 0.55, 0.3, 0.7); DRUCK["ü"] = umlaut("u", 0.55, 0.28, 0.68);
DRUCK["Ä"] = umlaut("A", -0.32, 0.4, 0.85); DRUCK["Ö"] = umlaut("O", -0.32, 0.45, 0.9); DRUCK["Ü"] = umlaut("U", -0.32, 0.4, 0.8);

/* Grundschrift: wie Druckschrift, aber die Kleinbuchstaben enden an der Grundlinie
   mit einem kleinen Bogen nach rechts (Anschwung zum nächsten Buchstaben). */
const BOGEN = x => `L${x},1.78 Q${x},2 ${x + 0.24},2`;
const GRUND = Object.assign({}, DRUCK, {
    a: { w: 1.2, s: [KREIS(0.5, 1.5, 0.45, 0.5), "M0.95,1 " + BOGEN(0.95)] },
    d: { w: 1.2, s: [KREIS(0.5, 1.5, 0.45, 0.5), "M0.95,0 " + BOGEN(0.95)] },
    h: { w: 1.2, s: ["M0.05,0 L0.05,2", "M0.05,1.45 Q0.05,1 0.5,1 Q0.95,1 0.95,1.45 " + BOGEN(0.95)] },
    i: { w: 0.42, s: ["M0.12,1 " + BOGEN(0.12), PUNKT(0.12, 0.5)] },
    k: { w: 1.0, s: ["M0.05,0 L0.05,2", "M0.82,1 L0.05,1.6", "M0.32,1.38 L0.7,1.86 Q0.8,2 0.98,1.97"] },
    l: { w: 0.42, s: ["M0.12,0 " + BOGEN(0.12)] },
    m: { w: 1.65, s: ["M0.05,1 L0.05,2", "M0.05,1.4 Q0.05,1 0.4,1 Q0.72,1 0.72,1.4 L0.72,2", "M0.72,1.4 Q0.72,1 1.07,1 Q1.4,1 1.4,1.4 " + BOGEN(1.4)] },
    n: { w: 1.15, s: ["M0.05,1 L0.05,2", "M0.05,1.45 Q0.05,1 0.48,1 Q0.9,1 0.9,1.45 " + BOGEN(0.9)] },
    t: { w: 0.85, s: ["M0.35,0.3 " + BOGEN(0.35), "M0.04,1 L0.7,1"] },
    u: { w: 1.15, s: ["M0.05,1 L0.05,1.55 Q0.05,2 0.48,2 Q0.9,2 0.9,1.55", "M0.9,1 " + BOGEN(0.9)] },
    q: { w: 1.1, s: [KREIS(0.5, 1.5, 0.45, 0.5), "M0.95,1 L0.95,2.8 Q0.95,3 1.1,2.9"] },
});
GRUND["ä"] = { w: GRUND.a.w, s: GRUND.a.s.concat([PUNKT(0.3, 0.55), PUNKT(0.7, 0.55)]) };
GRUND["ü"] = { w: GRUND.u.w, s: GRUND.u.s.concat([PUNKT(0.28, 0.55), PUNKT(0.68, 0.55)]) };

const ALLE = "abcdefghijklmnopqrstuvwxyzäöüß".split("");
const ABSTAND_WORT = 0.24;   // zwischen Buchstaben im Wort
const ABSTAND = 0.9;         // zwischen Einzelbuchstaben
const RAND_OBEN = 0.5, RAND_UNTEN = 0.25, ZEILE = RAND_OBEN + 3 + RAND_UNTEN;

/* Wörter für die ersten Klassen (Fibel-Wortschatz) */
const WOERTER = ("Mama Papa Oma Opa Mia Lea Leo Ali Tim Tom Ina Uli Ole Emma Mila Lina Nele Toni Timo Udo Ella Lola Mimi Lama Limo Mole Mut Mal Maus Mais Mehl Milch Mond Mund Mus Mütze Möwe Melone Maler Mantel Mann " +
    "Ast Arm Ameise Apfel Auto Affe Esel Ente Ei Eis Eimer Eule Igel Insel Indianer Ofen Ohr Oma Uhr Ufer Ubu " +
    "Lama Laus Lampe Leiter Lied Limo Linie Los Löwe Lupe Lineal Rose Rosen Rasen Rad Rabe Rakete Regen Reis Ring Rock Ruder Raum Sofa Salami Salat Sand Saft Seil Seife Sonne Socke Sessel See Sofa Sieb " +
    "Tomate Tomaten Tal Tee Teller Tisch Tasse Tante Tor Turm Taxi Tür Nase Name Nadel Nest Note Nudel Nuss Nil Nina Dose Dach Dino Delfin Dorf Daumen Hose Haus Hase Hut Hund Hand Hemd Huhn Heft Honig Hexe " +
    "Ball Baum Banane Bus Bär Biene Boot Bett Brot Buch Kuh Kind Kino Katze Kamel Kerze Kiste Koffer Käse Kuchen Wal Wolke Wurm Wasser Wald Wind Wolf Wiese Fisch Fuchs Feder Fee Fahne Füße Fenster " +
    "Gabel Garten Gans Geld Giraffe Glas Gurke Junge Jacke Jo Pinsel Puppe Pirat Pilz Pony Palme Zelt Zug Zebra Zaun Zahn Zange Ziege Zitrone Vogel Vase Vater Säge Öl Ölkanne Möhre Mäuse Läuse " +
    "Esel Igel Rosa Toto Lotto Molli Susi Sami Lisa Lilo Moni Rita Rudi Resi Nils Lars Malte Ole Tilo Lotte Lilli Anna Nino Alina Elisa Emil Lukas Ida Ute Otto").split(" ");

/* ---------- Einstellungen ---------- */
const STANDARD = { schrift: "druck", ansicht: "buchstabe", aktuell: "m", gelernt: ["m", "a", "l", "i", "o"], zeilen: "3", spur: "punkte", start: "ja", hg: "weiss" };
let E = Object.assign({}, STANDARD);
try { Object.assign(E, JSON.parse(localStorage.getItem("tb_buchstabenkurs") || "{}")); } catch (x) {}
function merken(){ try { localStorage.setItem("tb_buchstabenkurs", JSON.stringify(E)); } catch (x) {} }
let mischung = 0;

function glyphe(z){ const G = E.schrift === "grund" ? GRUND : DRUCK; return G[z] || null; }
const gross = z => z === "ß" ? null : z.toUpperCase();

/* ---------- Zeichnen der Lineatur und der Buchstaben ---------- */
const NS = "http://www.w3.org/2000/svg";
function farben(){
    return E.hg === "gruen"
        ? { linie: "rgba(255,255,255,.45)", grund: "rgba(255,255,255,.85)", oben: "rgba(255,255,255,0)", band: "rgba(255,255,255,.08)", unten: "rgba(255,255,255,0)", vorlage: "#ffffff", spur: "rgba(255,255,255,.6)", grau: "rgba(255,255,255,.22)", start: "#7ee2a8", nr: "#16324a" }
        : { linie: "#a9bccd", grund: "#2f5d86", oben: "#f1f7fd", band: "#fff3c4", unten: "#eef6e8", vorlage: "#1e4f8c", spur: "#8ea3b8", grau: "#d6dee6", start: "#2e9e5b", nr: "#ffffff" };
}
function wegeVon(g){ return g.s; }
// Ein Buchstabe als <g> – art: "vorlage" | "spur"
function buchstabeSvg(z, x, art){
    const g = glyphe(z), F = farben();
    const gr = document.createElementNS(NS, "g");
    gr.setAttribute("transform", `translate(${x},${RAND_OBEN})`);
    if (art === "vorlage") { gr.classList.add("vorlage"); gr.dataset.z = z; }
    const breite = art === "vorlage" ? 0.13 : (E.spur === "grau" ? 0.13 : 0.075);
    const farbe = art === "vorlage" ? F.vorlage : (E.spur === "grau" ? F.grau : F.spur);
    g.s.forEach((d, i) => {
        const p = document.createElementNS(NS, "path");
        p.setAttribute("d", d[0] === "." ? `M${d.slice(1)} l0,0.001` : d);
        p.setAttribute("fill", "none"); p.setAttribute("stroke", farbe);
        p.setAttribute("stroke-linecap", "round"); p.setAttribute("stroke-linejoin", "round");
        p.setAttribute("stroke-width", d[0] === "." ? (art === "vorlage" ? 0.2 : 0.16) : breite);
        if (art === "spur" && E.spur === "punkte" && d[0] !== ".") p.setAttribute("stroke-dasharray", "0 0.17");
        gr.appendChild(p);
    });
    // Startpunkte mit Reihenfolge (nur an der Vorlage)
    if (art === "vorlage" && E.start === "ja") {
        g.s.forEach((d, i) => {
            if (d[0] === ".") return;
            const m = d.match(/M\s*(-?[\d.]+)[ ,](-?[\d.]+)/); if (!m) return;
            const c = document.createElementNS(NS, "circle");
            c.setAttribute("cx", m[1]); c.setAttribute("cy", m[2]); c.setAttribute("r", 0.15); c.setAttribute("fill", F.start);
            const t = document.createElementNS(NS, "text");
            t.setAttribute("x", m[1]); t.setAttribute("y", +m[2] + 0.075); t.setAttribute("text-anchor", "middle");
            t.setAttribute("font-size", 0.21); t.setAttribute("font-weight", 900); t.setAttribute("fill", F.nr); t.setAttribute("font-family", "Nunito, sans-serif");
            t.textContent = i + 1;
            gr.appendChild(c); gr.appendChild(t);
        });
    }
    return gr;
}
function wortBreite(w){ return [...w].reduce((s, z, i) => s + (glyphe(z) ? glyphe(z).w : 0.5) + (i ? ABSTAND_WORT : 0), 0); }
// Inhalt einer Zeile: Liste von { text, art, wort }
function zeileSvg(inhalt, breiteE){
    const F = farben();
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${breiteE} ${ZEILE}`);
    const lin = (y, dick, farbe) => { const l = document.createElementNS(NS, "line"); l.setAttribute("x1", 0); l.setAttribute("x2", breiteE); l.setAttribute("y1", y + RAND_OBEN); l.setAttribute("y2", y + RAND_OBEN); l.setAttribute("stroke", farbe); l.setAttribute("stroke-width", dick); svg.appendChild(l); };
    [[0, F.oben], [1, F.band], [2, F.unten]].forEach(([y, f]) => { const band = document.createElementNS(NS, "rect");
        band.setAttribute("x", 0); band.setAttribute("y", y + RAND_OBEN); band.setAttribute("width", breiteE); band.setAttribute("height", 1); band.setAttribute("fill", f); band.setAttribute("rx", 0);
        svg.appendChild(band); });
    lin(0, 0.03, F.linie); lin(1, 0.025, F.linie); lin(2, 0.055, F.grund); lin(3, 0.03, F.linie);
    let x = 0.5;
    inhalt.forEach(t => {
        [...t.text].forEach((z, i) => {
            if (!glyphe(z)) { x += 0.5; return; }
            svg.appendChild(buchstabeSvg(z, x, t.art));
            x += glyphe(z).w + (t.wort ? ABSTAND_WORT : 0);
        });
        x += t.wort ? ABSTAND * 1.4 - ABSTAND_WORT : ABSTAND;
    });
    return svg;
}
// Füllt eine Zeile bis etwa „anteil“ der Breite mit Kopien
function fuellen(text, art, breiteE, anteil, wort){
    const b = (wort ? wortBreite(text) : glyphe(text[0]) ? glyphe(text[0]).w : 1) + (wort ? ABSTAND * 1.4 : ABSTAND);
    const n = Math.max(1, Math.floor((breiteE * anteil - 0.5) / b));
    return Array.from({ length: n }, () => ({ text, art, wort }));
}
function mischen(a, s){ const r = a.slice(); let z = s * 9301 + 49297; for (let i = r.length - 1; i > 0; i--) { z = (z * 9301 + 49297) % 233280; const j = Math.floor(z / 233280 * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
function passendeWoerter(muss){
    const ok = new Set(E.gelernt.concat(muss ? [muss] : []));
    const liste = [...new Set(WOERTER)].filter(w => [...w.toLowerCase()].every(z => ok.has(z)) && (!muss || w.toLowerCase().includes(muss)));
    return mischen(liste, mischung + 1);
}

function zeichnen(){
    const tafel = document.getElementById("tafel");
    tafel.classList.toggle("gruen", E.hg === "gruen");
    const box = document.getElementById("zeilen"), r = box.getBoundingClientRect();
    const z = E.aktuell, Z = gross(z);
    // Neuer Buchstabe: je Groß- und Kleinbuchstabe eine Zeile zum Nachspuren und eine leere Zeile zum allein Schreiben
    const n = E.ansicht === "buchstabe" ? (Z ? 4 : 2) : +E.zeilen;
    const MARKE = 76, platzH = r.height - 2 * 0.01 * window.innerHeight, platzB = r.width - 0.02 * window.innerWidth - MARKE;
    const bandPx = Math.min(platzH / (n * ZEILE) * 0.97, platzB / 12);
    const breiteE = platzB / bandPx;
    box.innerHTML = "";
    const zeilen = [], marken = [];
    const SPUR = ["✏️", "nach&shy;spuren", "spur"], ALLEIN = ["⭐", "allein", "allein"];
    if (E.ansicht === "buchstabe") {
        [Z, z].filter(Boolean).forEach(b => {
            zeilen.push([{ text: b, art: "vorlage" }, ...fuellen(b, "spur", breiteE, 0.6)]); marken.push(SPUR);
            zeilen.push([]); marken.push(ALLEIN);
        });
    } else if (E.ansicht === "wiederholung") {
        const pool = mischen(E.gelernt.flatMap(b => gross(b) ? [gross(b), b] : [b]), mischung + 3);
        let i = 0;
        for (let k = 0; k < n; k++) {
            const reihe = []; let b = 0.5;
            while (pool.length && b < breiteE - 1.6) { const t = pool[i++ % pool.length]; reihe.push({ text: t, art: "spur" }); b += glyphe(t).w + ABSTAND; }
            zeilen.push(reihe);
        }
    } else if (E.ansicht === "woerter") {
        const w = passendeWoerter(null);
        let i = 0;
        for (let k = 0; k < n; k++) {
            const reihe = []; let b = 0.5;
            while (w.length && i < w.length * 3) { const t = w[i % w.length]; const bb = wortBreite(t) + ABSTAND * 1.4; if (b + bb > breiteE * 0.9) break; reihe.push({ text: t, art: "spur", wort: true }); b += bb; i++; }
            if (!reihe.length && w.length) { reihe.push({ text: w[i++ % w.length], art: "spur", wort: true }); }
            zeilen.push(reihe);
        }
    }
    while (zeilen.length < n) zeilen.push([]);
    zeilen.slice(0, n).forEach((inh, k) => {
        const m = marken[k] || (E.ansicht === "leer" || !inh.length ? ALLEIN : SPUR);
        const reihe = document.createElement("div"); reihe.className = "tb-zeile";
        reihe.innerHTML = `<div class="tb-marke ${m[2]}"><span>${m[0]}</span>${m[1]}</div>`;
        const s = zeileSvg(inh, breiteE); s.style.height = (bandPx * ZEILE) + "px"; s.style.width = platzB + "px";
        reihe.appendChild(s); box.appendChild(reihe);
    });
    box.querySelectorAll(".vorlage").forEach(g => g.addEventListener("click", () => schreibweg(g)));
    kopfZeigen();
    malenGroesse();
}
function kopfZeigen(){
    document.getElementById("kBuchstabe").textContent = E.ansicht === "buchstabe" ? (gross(E.aktuell) ? gross(E.aktuell) + " " + E.aktuell : E.aktuell) : "Aa";
    document.getElementById("kAnsicht").innerHTML = { buchstabe: '<i class="fa-solid fa-a"></i> Neuer Buchstabe', wiederholung: '<i class="fa-solid fa-repeat"></i> Wiederholung', woerter: '<i class="fa-solid fa-font"></i> Wörter', leer: '<i class="fa-solid fa-grip-lines"></i> Leere Lineatur' }[E.ansicht] + " · " + (E.schrift === "grund" ? "Grundschrift" : "Druckschrift");
}

/* ---------- Schreibweg vormachen ---------- */
function schreibweg(g){
    const F = farben();
    const pfade = [...g.querySelectorAll("path")];
    let verz = 0;
    pfade.forEach(p => {
        const k = p.cloneNode(); k.setAttribute("stroke", "#e8590c"); k.setAttribute("stroke-width", p.getAttribute("stroke-width") * 1.15); k.removeAttribute("stroke-dasharray");
        g.appendChild(k);
        const punkt = /l0,0\.001$/.test(p.getAttribute("d"));
        const L = punkt ? 0.01 : k.getTotalLength();
        const dauer = punkt ? 250 : Math.max(500, L * 380);
        k.style.strokeDasharray = L + " " + (L + 1); k.style.strokeDashoffset = L; k.style.opacity = punkt ? 0 : 1;
        setTimeout(() => { k.style.transition = punkt ? "opacity .25s" : `stroke-dashoffset ${dauer}ms linear`; k.style.strokeDashoffset = 0; k.style.opacity = 1; }, verz + 30);
        verz += dauer + 250;
        setTimeout(() => k.remove(), verz + 1800);
    });
    return verz;
}
function vormachen(){
    const v = [...document.querySelectorAll("#zeilen .vorlage")];
    if (!v.length) { // ohne Vorlage: erste Spur-Buchstaben der ersten Zeile vormachen
        alert("Schreibweg gibt es bei „Neuer Buchstabe“ – dort wird die Vorlage vorne in der Zeile vorgemacht."); return;
    }
    let t = 0; v.forEach(g => { setTimeout(() => schreibweg(g), t); t += 2600; });
}

/* ---------- Mit dem Tafelstift schreiben ---------- */
const lein = document.getElementById("malen"), ctx = lein.getContext("2d");
let striche = [], aktiv = null, farbe = "#1d5fbf", dick = true, modus = "stift";
function malenGroesse(){
    const r = lein.getBoundingClientRect(), d = window.devicePixelRatio || 1;
    lein.width = Math.round(r.width * d); lein.height = Math.round(r.height * d);
    ctx.setTransform(d, 0, 0, d, 0, 0);
    alleMalen();
}
function strichMalen(s){
    const r = lein.getBoundingClientRect();
    ctx.globalCompositeOperation = s.radierer ? "destination-out" : "source-over";
    ctx.strokeStyle = s.farbe; ctx.lineWidth = s.breite * Math.min(r.width, r.height) / 1000; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath();
    s.p.forEach(([x, y], i) => i ? ctx.lineTo(x * r.width, y * r.height) : ctx.moveTo(x * r.width, y * r.height));
    if (s.p.length === 1) ctx.lineTo(s.p[0][0] * r.width + .1, s.p[0][1] * r.height);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
}
function alleMalen(){ const r = lein.getBoundingClientRect(); ctx.clearRect(0, 0, r.width, r.height); striche.forEach(strichMalen); }
lein.addEventListener("pointerdown", ev => {
    if (modus === "aus") return;
    lein.setPointerCapture(ev.pointerId);
    const r = lein.getBoundingClientRect();
    aktiv = { farbe, breite: modus === "radierer" ? 40 : (dick ? 9 : 5), radierer: modus === "radierer", p: [[(ev.clientX - r.left) / r.width, (ev.clientY - r.top) / r.height]] };
    striche.push(aktiv); strichMalen(aktiv);
});
lein.addEventListener("pointermove", ev => {
    if (!aktiv) return;
    const r = lein.getBoundingClientRect();
    const pts = ev.getCoalescedEvents ? ev.getCoalescedEvents() : [ev];
    pts.forEach(e => aktiv.p.push([(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]));
    const s = aktiv, n = s.p.length;
    const teil = { ...s, p: s.p.slice(Math.max(0, n - pts.length - 1)) };
    strichMalen(teil);
});
const ende = () => { aktiv = null; };
lein.addEventListener("pointerup", ende); lein.addEventListener("pointercancel", ende); lein.addEventListener("pointerleave", ende);
function rueckgaengig(){ striche.pop(); alleMalen(); }
function wischen(){ striche = []; alleMalen(); }
function knoepfeModus(){
    document.getElementById("kRadierer").classList.toggle("an", modus === "radierer");
    document.getElementById("kHand").classList.toggle("an", modus === "aus");
    lein.classList.toggle("aus", modus === "aus");
    document.querySelectorAll(".tb-farbe").forEach(b => b.classList.toggle("an", modus === "stift" && b.dataset.farbe === farbe));
}
document.querySelectorAll(".tb-farbe").forEach(b => b.addEventListener("click", () => { farbe = b.dataset.farbe; modus = "stift"; knoepfeModus(); }));
function radierer(){ modus = modus === "radierer" ? "stift" : "radierer"; knoepfeModus(); }
function stiftAus(){ modus = modus === "aus" ? "stift" : "aus"; knoepfeModus(); }
function dickeWechseln(){ dick = !dick; document.getElementById("kDicke").innerHTML = `<i class="fa-solid fa-pen"></i> ${dick ? "dick" : "dünn"}`; }

/* ---------- Bedienung ---------- */
function einstellungen(an){
    const el = document.getElementById("einstellungen");
    el.classList.toggle("an", an === undefined ? !el.classList.contains("an") : an);
    if (el.classList.contains("an")) einstellungenZeigen();
}
function einstellungenZeigen(){
    document.querySelectorAll("[data-wahl]").forEach(w => w.querySelectorAll("button").forEach(b => b.classList.toggle("an", String(E[w.dataset.wahl]) === b.dataset.wert)));
    document.getElementById("wahlAktuell").innerHTML = ALLE.map(z => `<button data-z="${z}" class="${z === E.aktuell ? "an" : ""}">${gross(z) ? gross(z) + z : z}</button>`).join("");
    document.getElementById("wahlGelernt").innerHTML = ALLE.map(z => `<button data-z="${z}" class="${E.gelernt.includes(z) ? "an" : ""} ${z === E.aktuell ? "aktuell" : ""}">${z}</button>`).join("");
    document.querySelectorAll("#wahlAktuell button").forEach(b => b.addEventListener("click", () => { E.aktuell = b.dataset.z; E.ansicht = "buchstabe"; if (!E.gelernt.includes(E.aktuell)) E.gelernt.push(E.aktuell); geaendert(); }));
    document.querySelectorAll("#wahlGelernt button").forEach(b => b.addEventListener("click", () => { const z = b.dataset.z; E.gelernt = E.gelernt.includes(z) ? E.gelernt.filter(x => x !== z) : E.gelernt.concat(z); geaendert(); }));
}
document.querySelectorAll("[data-wahl]").forEach(w => w.addEventListener("click", ev => { const b = ev.target.closest("button[data-wert]"); if (!b) return; E[w.dataset.wahl] = b.dataset.wert; geaendert(); }));
function geaendert(){ merken(); einstellungenZeigen(); wischen(); zeichnen(); }
function gelerntBisAktuell(){ const i = ALLE.indexOf(E.aktuell); E.gelernt = [...new Set(E.gelernt.concat(ALLE.slice(0, i + 1)))]; geaendert(); }
function gelerntAlle(an){ E.gelernt = an ? ALLE.slice() : [E.aktuell]; geaendert(); }
// Pfeile: durch die gelernten Buchstaben blättern (Reihenfolge, in der sie gelernt wurden)
function buchstabeSchritt(d){
    const liste = E.gelernt.length ? E.gelernt : ALLE;
    let i = liste.indexOf(E.aktuell); i = (i + d + liste.length) % liste.length;
    E.aktuell = liste[i]; E.ansicht = "buchstabe"; merken(); wischen(); zeichnen();
}
function neuMischen(){ mischung++; wischen(); zeichnen(); }
function vollbild(){ try { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); } catch (x) {} }
// Aus „Guten Morgen!“: Buchstabe der Woche im Buchstabenkurs öffnen
function kursMitBuchstabe(b){
    if (ALLE.includes(b)) { E.aktuell = b; E.ansicht = "buchstabe"; if (!E.gelernt.includes(b)) E.gelernt.push(b); merken(); }
    tafelMorgen.schliessen(); kursOeffnen();
}
function kursOeffnen(){ document.getElementById("tafel").classList.add("an"); document.getElementById("uebersicht").style.display = "none"; history.replaceState(null, "", "#buchstabenkurs"); requestAnimationFrame(zeichnen); }
function kursSchliessen(){ document.getElementById("tafel").classList.remove("an"); document.getElementById("uebersicht").style.display = ""; history.replaceState(null, "", location.pathname); }
window.addEventListener("resize", () => { if (document.getElementById("tafel").classList.contains("an")) zeichnen(); });
document.addEventListener("keydown", ev => {
    if (!document.getElementById("tafel").classList.contains("an")) return;
    if (ev.key === "ArrowRight") buchstabeSchritt(1); else if (ev.key === "ArrowLeft") buchstabeSchritt(-1);
    else if (ev.key === "Escape") einstellungen(false);
    else if ((ev.ctrlKey || ev.metaKey) && ev.key === "z") rueckgaengig();
});
knoepfeModus();
// Vorschau auf der Kachel
(function(){
    const s = zeileSvg([{ text: "A", art: "vorlage" }, { text: "a", art: "vorlage" }, { text: "a", art: "spur" }, { text: "a", art: "spur" }], 8.5);
    s.style.width = "100%"; s.style.height = "100%";
    s.querySelectorAll("circle, text").forEach(x => x.remove());
    document.getElementById("kachelBild").appendChild(s);
})();
if (location.hash === "#buchstabenkurs") kursOeffnen();
window.addEventListener("hashchange", () => { if (location.hash === "#buchstabenkurs") kursOeffnen(); });
</script>
</body>
</html>
