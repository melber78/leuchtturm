/* ===============================================================
   Leise-Welten (Erweiterung zum Leise-Wald) – Mikrofon misst nur die Lautstärke
   Ruhepause (zum Zuschauen):  Korallenriff · Winterwald · Nachthimmel · Raupe wird Schmetterling
   Arbeitsphase (ruhig, Überraschung am Ende, keine Uhr für die Kinder):
                               Weihnachtsbaum · Ballonfahrt · Burg bauen
   =============================================================== */
(function(){
"use strict";

const BILD = k => (window.LT_BILDER && window.LT_BILDER[k]) ? window.LT_BILDER[k][2] : "";
const zuf = (a, b) => a + Math.random() * (b - a);
const mischen = l => { const a = l.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---------- gemeinsames Aussehen ---------- */
const CSS = `
#lw2{ position:fixed; inset:0; z-index:14; display:none; flex-direction:column; background:#0e1a2b; font-family:"Nunito",sans-serif; user-select:none; -webkit-user-select:none; overflow:hidden; }
#lw2.an{ display:flex; }
.l2-leiste{ position:absolute; top:10px; right:12px; left:12px; z-index:20; display:flex; gap:8px; align-items:center; pointer-events:none; }
.l2-leiste > *{ pointer-events:auto; }
.l2-titel{ font-weight:900; font-size:18px; color:#fff; text-shadow:0 2px 8px rgba(0,0,0,.45); margin-right:auto; padding-left:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.l2-k{ font:800 15px "Nunito",sans-serif; border:0; border-radius:999px; min-width:46px; height:46px; padding:0 14px; background:rgba(255,255,255,.22); color:#fff; cursor:pointer; backdrop-filter:blur(6px); display:inline-flex; align-items:center; justify-content:center; gap:6px; }
.l2-k:hover{ background:rgba(255,255,255,.34); }
#lw2.ruhig .l2-leiste .l2-titel, #lw2.ruhig .l2-leiste .l2-k:not(.l2-immer){ opacity:.18; transition:opacity .4s; }
#lw2.ruhig .l2-leiste:hover .l2-titel, #lw2.ruhig .l2-leiste:hover .l2-k{ opacity:1; }
.l2-szene{ position:absolute; inset:0; overflow:hidden; }
.l2-szene svg.voll{ position:absolute; inset:0; width:100%; height:100%; }
.l2-start{ position:absolute; inset:0; z-index:18; display:flex; align-items:center; justify-content:center; background:rgba(8,14,28,.42); }
.l2-start > div{ background:rgba(255,255,255,.95); border-radius:28px; padding:26px 30px; max-width:min(560px,88vw); text-align:center; box-shadow:0 24px 60px rgba(0,0,0,.35); color:#1f2d36; }
.l2-start h2{ margin:0 0 6px; font-size:clamp(24px,3.4vmin,36px); font-weight:900; }
.l2-start p{ margin:0 0 16px; font-weight:700; color:#5b6670; line-height:1.45; font-size:16px; }
.l2-start button{ font:900 22px "Nunito",sans-serif; border:0; border-radius:999px; padding:14px 30px; background:#2f6a50; color:#fff; cursor:pointer; }
.l2-start .l2-fehler{ color:#b3261e; margin:12px 0 0; }
.l2-messer{ position:absolute; left:14px; bottom:12px; z-index:16; width:min(180px,34vw); height:10px; border-radius:999px; background:rgba(255,255,255,.28); overflow:hidden; }
.l2-pegel{ height:100%; width:0; background:#7ee29a; border-radius:999px; transition:width .1s; }
.l2-pegel.laut{ background:#ff7b6b; }
.l2-grenze{ position:absolute; top:-2px; bottom:-2px; width:3px; background:#fff; border-radius:3px; }
.l2-uhr{ position:absolute; right:14px; bottom:8px; z-index:16; font:800 14px "Nunito",sans-serif; color:rgba(255,255,255,.55); font-variant-numeric:tabular-nums; }
.l2-menue{ position:absolute; top:64px; right:12px; z-index:21; width:min(360px,calc(100vw - 24px)); background:#fff; color:#1f2d36; border-radius:20px; padding:14px 16px 16px; box-shadow:0 20px 50px rgba(0,0,0,.35); display:none; }
.l2-menue.an{ display:block; }
.l2-menue h4{ margin:10px 0 6px; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:#7c8a96; }
.l2-menue h4:first-child{ margin-top:0; }
.l2-reihe{ display:flex; flex-wrap:wrap; gap:6px; }
.l2-reihe button{ font:800 14px "Nunito",sans-serif; border:2px solid #dfe5ea; background:#fff; color:#1f2d36; border-radius:999px; padding:7px 12px; cursor:pointer; min-height:40px; }
.l2-reihe button.an{ background:#2f6a50; border-color:#2f6a50; color:#fff; }
.l2-menue label{ display:flex; align-items:center; gap:8px; font-weight:800; font-size:14px; color:#5b6670; }
.l2-menue input[type=range]{ flex:1; }
.l2-menue p{ margin:8px 0 0; font-size:13px; color:#7c8a96; font-weight:700; line-height:1.4; }
.l2-karte{ position:absolute; left:50%; bottom:7%; transform:translate(-50%,40px); z-index:17; background:rgba(255,255,255,.96); color:#1f2d36; border-radius:24px; padding:16px 26px; text-align:center; box-shadow:0 18px 50px rgba(0,0,0,.3); opacity:0; transition:opacity .8s, transform .8s; pointer-events:none; max-width:min(720px,90vw); }
.l2-karte.an{ opacity:1; transform:translate(-50%,0); }
.l2-karte b{ display:block; font-size:clamp(22px,4.2vmin,46px); font-weight:900; line-height:1.15; }
.l2-karte span{ display:block; margin-top:4px; font-weight:800; color:#5b6670; font-size:clamp(14px,2.2vmin,22px); }
.l2-wesen{ position:absolute; left:0; top:0; will-change:transform; transition:opacity .6s; pointer-events:none; }
.l2-wesen > div{ width:100%; height:100%; transition:transform .3s; }
.l2-wesen svg{ width:100%; height:100%; display:block; }
.l2-wesen.links > div{ transform:scaleX(-1); }
@keyframes l2Wiegen{ 0%,100%{ transform:rotate(-4deg); } 50%{ transform:rotate(4deg); } }
@keyframes l2Steigen{ from{ transform:translateY(0); opacity:.0; } 10%{ opacity:.8; } to{ transform:translateY(-110vh); opacity:0; } }
@keyframes l2Fallen{ from{ transform:translate(0,-10vh); } to{ transform:translate(var(--dx,20px),110vh); } }
@keyframes l2Funkeln{ 0%,100%{ opacity:var(--o1,.4); } 50%{ opacity:1; } }
@keyframes l2Plopp{ 0%{ transform:scale(0); } 70%{ transform:scale(1.25); } 100%{ transform:scale(1); } }
@keyframes l2Flackern{ 0%,100%{ opacity:1; } 20%{ opacity:.15; } 40%{ opacity:.9; } 60%{ opacity:.2; } 80%{ opacity:.8; } }
@keyframes l2Ziehen{ from{ transform:translateX(-30vw); } to{ transform:translateX(130vw); } }
@media (max-aspect-ratio: 1/1){ .l2-szene svg.mitte{ transform:scale(1.6); transform-origin:50% 100%; } .l2-szene svg.mitte-o{ transform:scale(1.5); transform-origin:50% 30%; } }
.l2-mond{ position:absolute; border-radius:50%; }
.l2-stern{ position:absolute; width:3px; height:3px; border-radius:50%; background:#fff; opacity:0; transition:opacity 1.2s; }
@media (prefers-reduced-motion: reduce){ #lw2 *{ animation-duration:.01s !important; animation-iteration-count:1 !important; } }

/* Riff */
.w-riff{ background:linear-gradient(#7fdcec 0%, #2aa3c6 30%, #0d6c97 65%, #0a4a6e 100%); }
.w-riff .strahl{ position:absolute; top:-10%; width:14%; height:90%; background:linear-gradient(rgba(255,255,255,.28), rgba(255,255,255,0)); transform:skewX(-18deg); filter:blur(6px); animation:l2Funkeln 7s ease-in-out infinite; --o1:.25; }
.w-riff .blase{ position:absolute; bottom:-20px; width:10px; height:10px; border-radius:50%; border:2px solid rgba(255,255,255,.6); animation:l2Steigen linear infinite; }
.w-riff .tang{ position:absolute; bottom:6%; width:5%; height:30%; transform-origin:50% 100%; animation:l2Wiegen 4s ease-in-out infinite; }
.w-riff .koralle{ position:absolute; bottom:2%; }
.w-riff .l2-wesen.qualle svg{ filter:drop-shadow(0 0 14px rgba(255,180,255,.9)); }
/* Winter */
.w-winter{ background:linear-gradient(#1e2c57 0%, #4a5f9c 45%, #a9b8e0 80%, #dfe7f7 100%); }
.w-winter .flocke{ position:absolute; top:0; color:#fff; font-size:14px; animation:l2Fallen linear infinite; transition:opacity 1.5s; text-shadow:0 0 4px rgba(255,255,255,.8); }
.w-winter .sm-teil{ opacity:0; transform:scale(0); transform-box:fill-box; transform-origin:50% 100%; transition:opacity .6s; }
.w-winter .sm-teil.da{ opacity:1; animation:l2Plopp .7s ease forwards; }
.w-winter .sm-arm-w{ transform-box:fill-box; transform-origin:0% 100%; }
.w-winter.fertig .sm-arm-w{ animation:l2Wiegen 1s ease-in-out infinite; }
/* Nacht */
.w-nacht{ background:linear-gradient(#03061a 0%, #0c1440 55%, #26306a 100%); }
.w-nacht .st{ transition:opacity 1.2s; }
.w-nacht .bild-linie{ stroke-dasharray:1000; stroke-dashoffset:1000; transition:stroke-dashoffset 4s ease; }
.w-nacht .bild.da .bild-linie{ stroke-dashoffset:0; }
.w-nacht .wolken{ transition:opacity 1.2s, transform 1.2s; opacity:0; }
.w-nacht.laut .wolken{ opacity:.95; transform:translateX(0); }
.w-nacht .schnuppe{ position:absolute; width:180px; height:3px; background:linear-gradient(90deg, rgba(255,255,255,0), #fff); border-radius:3px; transform:rotate(-24deg); opacity:0; }
.w-nacht .schnuppe.flieg{ animation:l2Schnuppe 1.6s ease-out forwards; }
@keyframes l2Schnuppe{ 0%{ opacity:0; transform:translate(0,0) rotate(-24deg); } 15%{ opacity:1; } 100%{ opacity:0; transform:translate(-40vw,18vw) rotate(-24deg); } }
/* Raupe */
.w-raupe{ background:linear-gradient(#bfe8ff 0%, #e6f7ff 60%, #b8e29c 60%, #8fcb6e 100%); }
.w-raupe .wolke{ position:absolute; font-size:60px; opacity:.9; animation:l2Ziehen linear infinite; }
.w-raupe .puppe{ transform-box:fill-box; transform-origin:50% 0%; animation:l2Wiegen 3.5s ease-in-out infinite; }
.w-raupe.laut .puppe, .w-raupe.laut .l2-wesen{ animation-play-state:paused; }
.w-raupe .blume{ position:absolute; bottom:4%; width:8%; aspect-ratio:1; transform:scale(0); transform-origin:50% 100%; transition:transform 1.2s cubic-bezier(.3,1.6,.5,1); }
.w-raupe .blume.da{ transform:scale(1); }
/* Weihnachtsbaum */
.w-baum{ background:radial-gradient(ellipse at 50% 70%, #5a3a52 0%, #2d1d33 60%, #1c1222 100%); }
.w-baum .schmuck{ opacity:0; transform:scale(0); transform-box:fill-box; transform-origin:50% 50%; }
.w-baum .schmuck.da{ opacity:1; animation:l2Plopp .6s ease forwards; }
.w-baum .licht{ animation:l2Funkeln 2.4s ease-in-out infinite; --o1:.55; }
.w-baum.laut .licht{ animation:l2Flackern .5s linear infinite; }
.w-baum .spitze{ opacity:0; transform:scale(0); transform-box:fill-box; transform-origin:50% 50%; transition:opacity 1s, transform 1.4s cubic-bezier(.3,1.6,.5,1); }
.w-baum.fertig .spitze{ opacity:1; transform:scale(1); filter:drop-shadow(0 0 18px #ffe066); }
.w-baum .fenster-flocke{ animation:l2Fallen linear infinite; }
/* Ballon */
.w-ballon{ background:linear-gradient(#5aa9e6 0%, #9fd3f5 60%, #d8f0ff 100%); transition:background 2s; }
.w-ballon .land{ position:absolute; left:0; right:0; bottom:0; width:100%; height:46%; will-change:transform; }
.w-ballon .wolke{ position:absolute; opacity:.95; animation:l2Ziehen linear infinite; filter:drop-shadow(0 6px 8px rgba(40,80,120,.15)); }
.w-ballon .ballon{ position:absolute; left:50%; width:min(22vh,30vw); transform:translate(-50%,0); will-change:top; }
.w-ballon .flamme{ transform-box:fill-box; transform-origin:50% 100%; animation:l2Flackern .4s linear infinite; }
.w-ballon.laut .flamme{ opacity:0; animation:none; }
.w-ballon .ziel-wolke{ position:absolute; left:50%; top:-40%; width:min(70vw,80vh); transform:translateX(-50%); transition:top 4s ease; }
.w-ballon.fertig .ziel-wolke{ top:2%; }
/* Burg */
.w-burg{ background:linear-gradient(#8fd0f5 0%, #d9f1ff 62%, #9fd37f 62%, #6fb65a 100%); }
.w-burg .stein{ opacity:0; }
.w-burg .stein.da{ opacity:1; animation:l2Rein .6s cubic-bezier(.3,1.4,.5,1) forwards; }
@keyframes l2Rein{ from{ transform:translateY(-40px); } to{ transform:translateY(0); } }
.w-burg .fahne{ opacity:0; transform:translateY(80px); transition:transform 3s ease, opacity 1s; }
.w-burg.fertig .fahne{ opacity:1; transform:translateY(0); }
.w-burg .fahne-tuch{ transform-box:fill-box; transform-origin:0 50%; animation:l2Wiegen 1.4s ease-in-out infinite; }
/* ---- weicher, echter ---- */
.l2-korn{ position:absolute; inset:0; z-index:15; pointer-events:none; opacity:.13; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
.l2-vignette{ position:absolute; inset:0; z-index:15; pointer-events:none; background:radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,.3) 100%); }
.l2-wesen svg{ filter:drop-shadow(0 8px 10px rgba(0,0,0,.22)) saturate(.92); }
.l2-wesen.fern svg{ filter:blur(2.5px) saturate(.6) brightness(.85); }
.w-riff .l2-wesen svg{ filter:drop-shadow(0 10px 14px rgba(0,30,60,.35)) saturate(.9); }
.w-riff .l2-wesen.qualle svg{ filter:drop-shadow(0 0 16px rgba(255,190,255,.85)) saturate(.9); }
.w-riff .strahl{ width:16%; background:linear-gradient(rgba(255,255,255,.32), rgba(255,255,255,0) 85%); filter:blur(18px); mix-blend-mode:screen; }
.w-riff .kaustik{ animation:l2Kaustik 18s ease-in-out infinite alternate; }
@keyframes l2Kaustik{ from{ transform:translateX(0); } to{ transform:translateX(90px); } }
.w-riff .schnee-meer{ position:absolute; width:4px; height:4px; border-radius:50%; background:rgba(255,255,255,.5); filter:blur(1px); animation:l2Treiben linear infinite; }
@keyframes l2Treiben{ 0%{ transform:translate(0,0); opacity:0; } 20%{ opacity:.8; } 100%{ transform:translate(40px,120px); opacity:0; } }
.w-riff .blase{ border:0; background:radial-gradient(circle at 35% 30%, rgba(255,255,255,.95) 0 12%, rgba(255,255,255,.15) 40%, rgba(255,255,255,.45) 72%, rgba(255,255,255,0) 76%); }
.w-winter .flocke{ border-radius:50%; background:radial-gradient(circle, #fff 0 45%, rgba(255,255,255,0) 72%); font-size:0; text-shadow:none; }
.w-winter .flocke.nah{ filter:blur(2.5px); }
.w-winter .glitzer{ animation:l2Funkeln 3s ease-in-out infinite; --o1:.1; }
.w-winter .l2-wesen svg{ filter:drop-shadow(6px 10px 8px rgba(40,60,120,.35)) saturate(.88); }
.w-nacht .l2-stern{ box-shadow:0 0 6px 1px rgba(255,255,255,.7); }
.w-nacht .schnuppe{ height:2px; box-shadow:0 0 10px 2px rgba(255,255,255,.6); }
.w-raupe{ background:#d4effc; }
.w-raupe .wolke{ font-size:0; opacity:1; }
.w-raupe .blume svg{ filter:drop-shadow(0 8px 8px rgba(40,80,20,.3)); }
.w-baum{ background:#1c1222; }
.w-baum .licht{ animation:l2Funkeln 2.4s ease-in-out infinite; --o1:.6; }
.w-ballon .sonne{ position:absolute; right:8%; top:6%; width:min(30vmin,300px); aspect-ratio:1; border-radius:50%; background:radial-gradient(circle, #fffbe6 0 14%, rgba(255,240,180,.55) 26%, rgba(255,240,180,0) 70%); }
.w-ballon .ballon{ filter:drop-shadow(0 14px 18px rgba(30,60,100,.3)); }
.w-burg{ background:#b9e0f7; }
.w-burg .st-k{ opacity:0; }
.w-burg .st-k.da{ opacity:.9; }
`;

/* ---------- kleine Bausteine ---------- */
function wesen(ebene, k, cls){
    const d = document.createElement("div");
    d.className = "l2-wesen " + (cls || "") + " " + k;
    d.innerHTML = `<div>${BILD(k)}</div>`;
    d.style.opacity = 0;
    ebene.appendChild(d);
    return d;
}
function setze(d, x, y, g, W, H){ d.style.width = d.style.height = g + "px"; d.style.transform = `translate(${(x * W - g / 2).toFixed(1)}px, ${(y * H - g).toFixed(1)}px)`; }

/* =====================================================================
   RUHEPAUSE
   ===================================================================== */
const WELTEN = {};

// Weiche Wolke aus vielen überlappenden Kreisen (mit Licht oben, Schatten unten)
const WOLKE = (id, w = 240) => `<svg viewBox="0 0 240 120" style="width:${w}px;overflow:visible" aria-hidden="true"><defs><radialGradient id="${id}" cx=".45" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".65" stop-color="#f4f8fc"/><stop offset="1" stop-color="#c9d8e8"/></radialGradient><filter id="${id}b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2"/></filter></defs>
  <g filter="url(#${id}b)" fill="url(#${id})"><circle cx="70" cy="76" r="34"/><circle cx="110" cy="56" r="44"/><circle cx="160" cy="66" r="38"/><circle cx="196" cy="84" r="26"/><circle cx="40" cy="90" r="22"/><rect x="40" y="80" width="160" height="30" rx="15"/></g></svg>`;

WELTEN.riff = { titel: "Korallenriff", emoji: "🐠", art: "ruhe",
  text: "Je leiser ihr seid, desto mehr Meerestiere kommen ins Riff. Bei Lärm verstecken sich alle zwischen den Korallen.",
  fertigText: ["Das ganze Riff ist zum Leben erwacht!", "Sogar der Wal schaut vorbei."],
  aufbauen(sz){
    const tentakel = (cx, cy, n, l, farbe) => Array.from({ length: n }, (_, i) => { const a = -Math.PI * (.12 + .76 * i / (n - 1)); return `<path d="M${cx} ${cy} q${(Math.cos(a) * l * .5).toFixed(0)} ${(Math.sin(a) * l * .7).toFixed(0)} ${(Math.cos(a) * l).toFixed(0)} ${(Math.sin(a) * l).toFixed(0)}" stroke="${farbe}" stroke-width="9" stroke-linecap="round" fill="none"/>`; }).join("");
    sz.innerHTML = `
      <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="rW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9be6f2"/><stop offset=".25" stop-color="#3cb2d2"/><stop offset=".6" stop-color="#11709d"/><stop offset="1" stop-color="#073656"/></linearGradient>
          <radialGradient id="rLicht" cx=".5" cy="-.1" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
          <linearGradient id="rSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1dda6"/><stop offset="1" stop-color="#b8975a"/></linearGradient>
          <linearGradient id="rKor" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#b8344f"/><stop offset="1" stop-color="#ff9fae"/></linearGradient>
          <radialGradient id="rHirn" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#ffc58a"/><stop offset="1" stop-color="#c76a2c"/></radialGradient>
          <radialGradient id="rFaecher" cx=".5" cy="1" r="1"><stop offset="0" stop-color="#7b4fc4"/><stop offset="1" stop-color="#d7b6ff"/></radialGradient>
          <linearGradient id="rTang" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#1f6b4a"/><stop offset="1" stop-color="#6fd39a"/></linearGradient>
          <filter id="rFern" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="5"/></filter>
          <filter id="rKaustik" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".008 .022" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 14 -7"/><feGaussianBlur stdDeviation="2"/></filter>
          <filter id="rSandK"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="2"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .35  0 0 0 0 .2  0 0 0 .35 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
        </defs>
        <rect width="1600" height="900" fill="url(#rW)"/><rect width="1600" height="900" fill="url(#rLicht)"/>
        <rect class="kaustik" x="-100" y="0" width="1800" height="560" filter="url(#rKaustik)" opacity=".16"/>
        <g filter="url(#rFern)" opacity=".55" fill="#1a6a8a"><path d="M0 720 C120 640 200 690 280 620 C340 580 380 650 460 640 C560 600 600 700 720 690 C820 640 900 600 980 660 C1080 700 1160 620 1260 640 C1360 660 1460 600 1600 650 V900 H0Z"/></g>
        <g filter="url(#rFern)" opacity=".5"><path d="M1100 760 L1100 640 M1100 680 L1060 620 M1100 660 L1150 600" stroke="#2c7d9c" stroke-width="16" stroke-linecap="round"/><ellipse cx="360" cy="720" rx="90" ry="50" fill="#2c7d9c"/></g>
        <path d="M0 790 Q300 750 640 785 T1300 772 T1600 785 V900 H0Z" fill="url(#rSand)"/>
        <path d="M0 790 Q300 750 640 785 T1300 772 T1600 785 V900 H0Z" fill="#fff" filter="url(#rSandK)" opacity=".7"/>
        <path d="M60 840 q60 -12 120 0 M380 860 q70 -14 140 0 M900 850 q60 -12 120 0 M1260 865 q70 -12 140 0" stroke="#fff4d6" stroke-width="4" fill="none" opacity=".45"/>
        <ellipse cx="270" cy="806" rx="200" ry="22" fill="#6b5326" opacity=".25" filter="url(#rFern)"/>
        <g transform="translate(270 810)"><path d="M0 0 C0 -60 -30 -100 -70 -130 M0 0 C0 -80 20 -120 60 -160 M-30 -70 C-60 -90 -100 -100 -120 -140 M25 -100 C60 -110 90 -130 110 -170 M0 -40 C0 -100 0 -150 0 -220" stroke="url(#rKor)" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M0 -40 C0 -100 0 -150 0 -220" stroke="#ffd0d7" stroke-width="5" fill="none" stroke-linecap="round" opacity=".5" transform="translate(-6 0)"/></g>
        <ellipse cx="760" cy="812" rx="150" ry="20" fill="#6b5326" opacity=".25" filter="url(#rFern)"/>
        <g transform="translate(760 805)"><ellipse cx="0" cy="-50" rx="130" ry="70" fill="url(#rHirn)"/><path d="M-110 -50 Q-80 -80 -50 -50 T10 -50 T70 -50 T120 -55 M-100 -20 Q-60 -45 -20 -20 T60 -20 T115 -25 M-90 -82 Q-50 -105 -10 -82 T70 -85" stroke="#a9551f" stroke-width="5" fill="none" opacity=".7"/><ellipse cx="-40" cy="-90" rx="50" ry="14" fill="#fff" opacity=".18"/></g>
        <g transform="translate(560 800)">${tentakel(0, 0, 13, 80, "#ff8fc0")}<ellipse cx="0" cy="4" rx="34" ry="14" fill="#c74f86"/></g>
        <ellipse cx="1260" cy="810" rx="170" ry="22" fill="#6b5326" opacity=".25" filter="url(#rFern)"/>
        <g transform="translate(1260 805)"><path d="M0 0 L0 -90 M0 -90 C-60 -130 -120 -200 -150 -250 M0 -90 C60 -130 120 -200 150 -250 M0 -90 L0 -280 M0 -120 C-40 -170 -70 -230 -80 -280 M0 -120 C40 -170 70 -230 80 -280" stroke="#6a3fae" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M0 -90 C-90 -120 -170 -230 -150 -260 C-60 -330 60 -330 150 -260 C170 -230 90 -120 0 -90Z" fill="url(#rFaecher)" opacity=".7"/></g>
        <g transform="translate(1480 800)">${tentakel(0, 0, 11, 64, "#ffd166")}<ellipse cx="0" cy="4" rx="28" ry="12" fill="#e0a43a"/></g>
        ${[60, 430, 980, 1100, 1560].map((x, i) => `<g class="tang" style="transform-origin:${x}px 800px;animation-delay:${-i * .9}s"><path d="M${x} 800 C${x - 20} 720 ${x + 30} 660 ${x + 6} 590 C${x - 14} 530 ${x + 24} 470 ${x + 10} ${400 + i * 20}" stroke="url(#rTang)" stroke-width="${14 - i % 2 * 4}" fill="none" stroke-linecap="round"/></g>`).join("")}
      </svg>
      ${[10, 34, 58, 80].map((x, i) => `<div class="strahl" style="left:${x}%;animation-delay:${-i * 1.7}s"></div>`).join("")}
      ${Array.from({ length: 26 }, (_, i) => `<i class="schnee-meer" style="left:${(i * 13.7) % 100}%;top:${(i * 29) % 90}%;animation-delay:${-i * 1.3}s;animation-duration:${18 + i % 7 * 3}s"></i>`).join("")}
      ${Array.from({ length: 14 }, (_, i) => `<div class="blase" style="left:${(i * 7.3 + 3) % 98}%;width:${6 + (i % 4) * 4}px;height:${6 + (i % 4) * 4}px;animation-duration:${7 + (i % 5) * 2}s;animation-delay:${-i * 1.1}s"></div>`).join("")}
      <div class="ebene"></div>`;
    const ebene = sz.querySelector(".ebene");
    const plan = [["tropenfisch", "s", .3], ["fisch", "s", .5], ["kugelfisch", "s", .62], ["schildkroete", "s", .4], ["qualle", "q", .28], ["krebs", "b", .93], ["tropenfisch", "s", .7], ["krake", "s", .78], ["fisch", "s", .22], ["delfin", "s", .18], ["qualle", "q", .45], ["robbe", "s", .58]];
    const tiere = plan.map(([k, typ, y], i) => ({ k, typ, y, d: wesen(ebene, k), x: Math.random() < .5 ? -.15 : 1.15, zx: zuf(.1, .9), v: zuf(.03, .06) * (typ === "b" ? .5 : 1), t: zuf(0, 9), da: false, g: k === "delfin" || k === "schildkroete" || k === "robbe" ? .17 : k === "krebs" ? .09 : .12 }));
    const wal = wesen(ebene, "wal", "fern"); let walX = -.4, walAn = false;
    const versteck = [.17, .48, .82];
    return {
      schritt(p, laut, dt, W, H){
        const S = Math.min(Math.max(W, H * .55), H * 1.6);
        tiere.forEach((t, i) => {
          const soll = p >= (i + 1) / (tiere.length + 1);
          if (soll && !t.da){ t.da = true; t.x = Math.random() < .5 ? -.15 : 1.15; this.klang && this.klang(500 + i * 40); }
          t.t += dt;
          let x = t.x, y = t.y, a = t.da ? 1 : 0, sk = 1;
          if (t.da){
            if (laut){ const z = versteck.reduce((b, v) => Math.abs(v - t.x) < Math.abs(b - t.x) ? v : b); t.x += (z - t.x) * Math.min(1, dt * 3); y = .86; a = .25; sk = .55; }
            else {
              const dx = t.zx - t.x;
              if (Math.abs(dx) < .01) t.zx = zuf(.08, .92); else t.x += Math.sign(dx) * Math.min(Math.abs(dx), t.v * dt);
              t.d.classList.toggle("links", dx > 0);
              y = t.typ === "q" ? t.y + Math.sin(t.t * .6) * .1 : t.typ === "b" ? t.y : t.y + Math.sin(t.t * 1.6) * .025;
            }
            x = t.x;
          }
          t.d.style.opacity = a; setze(t.d, x, y, t.g * S * sk, W, H);
        });
        if (walAn){ walX += dt * .05; wal.style.opacity = walX < 1.4 ? .7 : 0; setze(wal, walX, .36 + Math.sin(walX * 4) * .03, S * .42, W, H); if (walX > 1.5) walX = -.4; }
      },
      fertig(){ walAn = true; }
    };
  } };

WELTEN.winter = { titel: "Winterwald", emoji: "⛄", art: "ruhe",
  text: "Je leiser ihr seid, desto mehr schneit es und die Waldtiere kommen. Bleibt es lange leise, baut sich Stück für Stück ein Schneemann.",
  fertigText: ["Der Schneemann ist fertig!", "Er winkt euch zu."],
  aufbauen(sz){
    const tanne = (x, y, g, id) => `<g transform="translate(${x} ${y}) scale(${g})"><rect x="-9" y="-12" width="18" height="34" fill="#4a3628"/>
        <path d="M0 -200 C20 -160 40 -130 62 -100 C40 -98 30 -96 24 -94 C50 -60 70 -40 92 -12 C60 -8 30 -6 0 -6 C-30 -6 -60 -8 -92 -12 C-70 -40 -50 -60 -24 -94 C-30 -96 -40 -98 -62 -100 C-40 -130 -20 -160 0 -200Z" fill="url(#${id})"/>
        <path d="M0 -200 C12 -176 22 -160 32 -146 C16 -140 -16 -140 -32 -146 C-22 -160 -12 -176 0 -200Z M-62 -100 C-40 -112 -20 -104 0 -110 C20 -104 40 -112 62 -100 C40 -98 -40 -98 -62 -100Z M-92 -12 C-60 -24 -30 -16 0 -22 C30 -16 60 -24 92 -12 C60 -8 -60 -8 -92 -12Z" fill="#f4f8ff" opacity=".95"/></g>`;
    sz.innerHTML = `
      <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="wH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1838"/><stop offset=".45" stop-color="#2f4580"/><stop offset=".75" stop-color="#7f90c6"/><stop offset="1" stop-color="#cdd6f0"/></linearGradient>
          <radialGradient id="wMondL" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6d6" stop-opacity=".55"/><stop offset="1" stop-color="#fff6d6" stop-opacity="0"/></radialGradient>
          <radialGradient id="wMond" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fffdf2"/><stop offset="1" stop-color="#efe1b8"/></radialGradient>
          <linearGradient id="wT1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a6a6e"/><stop offset=".5" stop-color="#2a5458"/><stop offset="1" stop-color="#17383d"/></linearGradient>
          <linearGradient id="wT2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6c86ad"/><stop offset="1" stop-color="#4b6290"/></linearGradient>
          <linearGradient id="wB1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8eefb"/><stop offset="1" stop-color="#b9c6e6"/></linearGradient>
          <linearGradient id="wB2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eef2fb"/><stop offset="1" stop-color="#cfd9ef"/></linearGradient>
          <filter id="wFern"><feGaussianBlur stdDeviation="3.5"/></filter><filter id="wWeich"><feGaussianBlur stdDeviation="1.2"/></filter>
        </defs>
        <rect width="1600" height="900" fill="url(#wH)"/>
        <circle cx="1280" cy="150" r="230" fill="url(#wMondL)"/><circle cx="1280" cy="150" r="52" fill="url(#wMond)"/><circle cx="1265" cy="140" r="9" fill="#e6d6a8" opacity=".6"/><circle cx="1296" cy="170" r="6" fill="#e6d6a8" opacity=".5"/>
        <path d="M0 520 Q300 440 640 500 T1300 470 T1600 490 V900 H0Z" fill="#8f9fcf" filter="url(#wFern)"/>
        <g filter="url(#wFern)" opacity=".85">${[[80, 560, .5], [200, 545, .45], [330, 560, .55], [980, 540, .5], [1120, 555, .45], [1420, 540, .55], [1530, 560, .5]].map(([x, y, g]) => tanne(x, y, g, "wT2")).join("")}</g>
        <path d="M0 600 Q400 520 800 580 T1600 560 V900 H0Z" fill="url(#wB1)"/>
        <g filter="url(#wWeich)">${[[120, 640, .9], [290, 615, .75], [500, 630, .8], [1080, 610, .78], [1260, 635, .92], [1470, 615, .78]].map(([x, y, g]) => tanne(x, y, g, "wT1")).join("")}</g>
        <path d="M0 690 Q500 630 1000 680 T1600 670 V900 H0Z" fill="url(#wB2)"/>
        <path d="M0 760 Q400 740 800 770 T1600 760" stroke="#c4d0ec" stroke-width="30" fill="none" opacity=".35" filter="url(#wFern)"/>
        ${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 53) % 1600}" cy="${700 + (i * 37) % 180}" r="2" fill="#fff" class="glitzer" style="animation-delay:${-i * .4}s"/>`).join("")}
      </svg>
      <div class="flocken">${Array.from({ length: 90 }, (_, i) => `<span class="flocke${i % 9 === 0 ? " nah" : ""}" style="left:${(i * 11.3) % 100}%;width:${i % 9 === 0 ? 14 : 3 + (i % 4) * 2}px;height:${i % 9 === 0 ? 14 : 3 + (i % 4) * 2}px;--dx:${(i % 7) * 12 - 36}px;animation-duration:${7 + (i % 6) * 2}s;animation-delay:${-i * .37}s;opacity:0"></span>`).join("")}</div>
      <svg class="voll mitte" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <defs>
          <radialGradient id="wKugel" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eef2fb"/><stop offset="1" stop-color="#b3c1e2"/></radialGradient>
          <linearGradient id="wHut" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a3a4c"/><stop offset=".4" stop-color="#1e1e28"/><stop offset="1" stop-color="#111118"/></linearGradient>
          <linearGradient id="wSchal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ef6a5a"/><stop offset="1" stop-color="#b8342a"/></linearGradient>
          <linearGradient id="wNase" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffa149"/><stop offset="1" stop-color="#d86a14"/></linearGradient>
          <filter id="wSchatten"><feGaussianBlur stdDeviation="8"/></filter>
        </defs>
        <g transform="translate(800 820)">
          <ellipse cx="20" cy="6" rx="160" ry="20" fill="#7d8fbd" opacity=".45" filter="url(#wSchatten)"/>
          <circle class="sm-teil t1" cx="0" cy="-90" r="100" fill="url(#wKugel)"/>
          <circle class="sm-teil t2" cx="0" cy="-245" r="72" fill="url(#wKugel)"/>
          <circle class="sm-teil t3" cx="0" cy="-360" r="52" fill="url(#wKugel)"/>
          <g class="sm-teil t4"><circle cx="-18" cy="-372" r="7" fill="#24242c"/><circle cx="18" cy="-372" r="7" fill="#24242c"/><circle cx="-16" cy="-374" r="2" fill="#fff" opacity=".7"/><circle cx="20" cy="-374" r="2" fill="#fff" opacity=".7"/><path d="M0 -362 Q30 -356 56 -350 Q30 -344 0 -348Z" fill="url(#wNase)"/><path d="M-20 -336 q20 12 40 0" stroke="#3a3a44" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="1 9"/></g>
          <g class="sm-teil t5"><circle cx="0" cy="-270" r="8" fill="#2a2a32"/><circle cx="0" cy="-240" r="8" fill="#2a2a32"/><circle cx="0" cy="-210" r="8" fill="#2a2a32"/><path d="M-66 -260 Q-110 -290 -150 -312 M-128 -300 L-148 -334 M-112 -290 L-132 -300" stroke="#6b4a32" stroke-width="8" stroke-linecap="round" fill="none"/><g class="sm-arm-w"><path d="M66 -260 Q110 -296 150 -322 M128 -308 L158 -334 M112 -296 L136 -298" stroke="#6b4a32" stroke-width="8" stroke-linecap="round" fill="none"/></g></g>
          <g class="sm-teil t6"><ellipse cx="0" cy="-412" rx="60" ry="12" fill="url(#wHut)"/><rect x="-36" y="-484" width="72" height="72" rx="8" fill="url(#wHut)"/><rect x="-36" y="-438" width="72" height="12" fill="#b8342a"/><ellipse cx="0" cy="-484" rx="36" ry="7" fill="#3c3c4e"/></g>
          <g class="sm-teil t7"><path d="M-56 -312 Q0 -282 56 -312 L56 -290 Q0 -260 -56 -290Z" fill="url(#wSchal)"/><path d="M28 -298 L46 -218 Q36 -214 22 -220 L12 -290Z" fill="url(#wSchal)"/><path d="M-50 -304 Q0 -278 50 -304" stroke="#ffd0c8" stroke-width="3" fill="none" opacity=".5" stroke-dasharray="6 8"/></g>
        </g>
      </svg>
      <div class="ebene"></div>`;
    const ebene = sz.querySelector(".ebene"), flocken = [...sz.querySelectorAll(".flocke")], teile = [...sz.querySelectorAll(".sm-teil")];
    const plan = [["hase", .92, .08], ["hirsch", .86, .16], ["fuchs", .9, .1], ["eichhoernchen", .93, .07], ["vogel", .5, .07], ["eule", .58, .08]];
    const tiere = plan.map(([k, y, g], i) => ({ k, y, g, d: wesen(ebene, k), x: i % 2 ? 1.15 : -.15, zx: [.14, .28, .7, .84, .36, .9][i], da: false, t: 0 }));
    const schwellen = [.22, .36, .5, .62, .74, .86, .96];
    let maxP = 0;
    return {
      schritt(p, laut, dt, W, H){
        const S = Math.min(Math.max(W, H * .55), H * 1.6);
        const n = Math.round(10 + p * 80);
        flocken.forEach((f, i) => { const soll = laut ? 0 : (i < n ? .9 : 0); if (f._o !== soll){ f._o = soll; f.style.opacity = soll; } });
        maxP = Math.max(maxP, p);
        teile.forEach((t, i) => { if (maxP >= schwellen[i] && !t.classList.contains("da")){ t.classList.add("da"); this.klang && this.klang(620 + i * 60); } });
        tiere.forEach((t, i) => {
          const soll = p >= (i + 1) * .13;
          if (soll) t.da = true;
          t.t += dt;
          const ziel = laut ? (t.zx < .5 ? -.2 : 1.2) : t.zx;
          if (t.da) t.x += (ziel - t.x) * Math.min(1, dt * (laut ? 2 : .5));
          t.d.classList.toggle("links", ziel > t.x);
          const hop = (t.k === "hase" || t.k === "eichhoernchen") && Math.abs(ziel - t.x) > .01 ? -Math.abs(Math.sin(t.t * 8)) * .03 : 0;
          const flieg = t.k === "vogel" || t.k === "eule" ? Math.sin(t.t * 2) * .02 : 0;
          t.d.style.opacity = t.da ? 1 : 0;
          setze(t.d, t.x, t.y + hop + flieg, t.g * S, W, H);
        });
      },
      fertig(){ sz.classList.add("fertig"); }
    };
  } };

WELTEN.nacht = { titel: "Nachthimmel", emoji: "🌌", art: "ruhe",
  text: "Je leiser ihr seid, desto mehr Sterne gehen an und verbinden sich zu Sternbildern. Bei Lärm ziehen Wolken auf. Ganz am Ende: Sternschnuppen!",
  fertigText: ["Sternschnuppen!", "Wünscht euch ganz leise etwas."],
  aufbauen(sz){
    const BILDER = [
      { n: "Großer Wagen", p: [[340, 190], [430, 170], [510, 195], [580, 235], [600, 310], [710, 320], [720, 235]], l: [0, 1, 2, 3, 4, 5, 6, 3] },
      { n: "Kassiopeia", p: [[1000, 420], [1060, 490], [1130, 450], [1190, 510], [1260, 440]], l: [0, 1, 2, 3, 4] },
      { n: "Orion", p: [[860, 110], [1000, 130], [905, 240], [935, 252], [965, 264], [870, 390], [1030, 380]], l: [0, 2, 3, 4, 1, 4, 6, 5, 2] }
    ];
    const sterne = Array.from({ length: 90 }, () => [zuf(1, 99), zuf(1, 64), zuf(1.5, 3.6)]);
    sz.innerHTML = `
      <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="nH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#01030c"/><stop offset=".45" stop-color="#08103a"/><stop offset=".8" stop-color="#1c2766"/><stop offset="1" stop-color="#3b3f7e"/></linearGradient>
          <radialGradient id="nGlut" cx=".5" cy="1" r=".6"><stop offset="0" stop-color="#7d6fb5" stop-opacity=".55"/><stop offset="1" stop-color="#7d6fb5" stop-opacity="0"/></radialGradient>
          <filter id="nMilch" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".006 .012" numOctaves="4" seed="11"/><feColorMatrix values="0 0 0 0 .8  0 0 0 0 .82  0 0 0 0 1  0 0 0 1.6 -.75"/><feGaussianBlur stdDeviation="4"/></filter>
          <linearGradient id="nBand" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
          <mask id="nBandM"><rect width="1600" height="900" fill="black"/><path d="M-100 700 L1700 -100 L1700 200 L-100 1000Z" fill="url(#nBand)"/></mask>
          <filter id="nFern"><feGaussianBlur stdDeviation="3"/></filter><filter id="nLicht" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="10"/></filter>
          <linearGradient id="nHuegel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101530"/><stop offset="1" stop-color="#03040c"/></linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#nH)"/><rect width="1600" height="900" fill="url(#nGlut)"/>
        <rect width="1600" height="900" filter="url(#nMilch)" mask="url(#nBandM)" opacity=".5"/>
        <path d="M-400 660 Q100 590 500 640 T1200 620 T2000 630 V900 H-400Z" fill="#1a2148" filter="url(#nFern)"/>
        <path d="M-400 700 Q200 640 420 690 T860 670 T1300 690 T2000 660 V900 H-400Z" fill="url(#nHuegel)"/>
        <g fill="#04060f"><path d="M560 700 C575 640 580 600 590 570 C600 600 605 640 620 700Z"/><path d="M600 700 C615 620 625 580 640 530 C655 580 665 620 680 700Z"/><rect x="900" y="620" width="130" height="80"/><path d="M885 625 L965 565 L1045 625Z"/><rect x="1000" y="575" width="16" height="36"/></g>
        <rect x="935" y="645" width="26" height="26" fill="#ffd56b"/><circle cx="948" cy="658" r="40" fill="#ffc94d" opacity=".35" filter="url(#nLicht)"/>
      </svg>
      <div class="l2-mond" style="left:9%;top:9%;width:min(9vmin,90px);aspect-ratio:1;background:radial-gradient(circle at 38% 35%, #fffbe8, #e8dcb0 70%, #c9bb8a);box-shadow:0 0 60px 10px rgba(255,246,208,.22)"></div>
      <div class="sterne">${sterne.map(([x, y, r], i) => `<i class="l2-stern" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;width:${r.toFixed(1)}px;height:${r.toFixed(1)}px;animation:l2Funkeln ${3 + i % 4}s ease-in-out ${-i * .3}s infinite;--o1:.5"></i>`).join("")}</div>
      <svg class="voll mitte-o" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs><filter id="nGlanz" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><filter id="nWolke" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="28"/></filter></defs>
        ${BILDER.map((b, i) => `<g class="bild b${i}"><polyline class="bild-linie" points="${b.l.map(j => b.p[j].join(",")).join(" ")}" fill="none" stroke="rgba(170,205,255,.5)" stroke-width="2.5" stroke-linejoin="round"/>${b.p.map(([x, y]) => `<circle class="st" cx="${x}" cy="${y}" r="5" fill="#fffbe6" opacity="0" filter="url(#nGlanz)"/>`).join("")}</g>`).join("")}
        <g class="wolken" style="transform:translateX(-60px)" filter="url(#nWolke)"><ellipse cx="400" cy="230" rx="360" ry="110" fill="#3b4377"/><ellipse cx="900" cy="170" rx="420" ry="120" fill="#353c6c"/><ellipse cx="1300" cy="260" rx="360" ry="110" fill="#3b4377"/><ellipse cx="700" cy="330" rx="300" ry="90" fill="#2f3563"/></g>
      </svg>
      ${[0, 1, 2, 3, 4].map(i => `<div class="schnuppe" style="left:${60 + i * 8}%;top:${6 + i * 6}%"></div>`).join("")}`;
    const st = [...sz.querySelectorAll(".sterne .l2-stern")], bilder = [...sz.querySelectorAll(".bild")], schnuppen = [...sz.querySelectorAll(".schnuppe")];
    let fertig = false, naechste = 0, zwischen = false;
    const flieg = s => { s.classList.remove("flieg"); void s.offsetWidth; s.classList.add("flieg"); };
    return {
      schritt(p, laut, dt){
        sz.classList.toggle("laut", laut);
        const n = Math.round(p * st.length);
        st.forEach((s, i) => { const soll = i < n ? 1 : 0; if (s._o !== soll){ s._o = soll; s.style.opacity = soll; s.style.visibility = soll ? "visible" : "hidden"; } });
        bilder.forEach((b, i) => { const soll = p >= [.3, .55, .8][i]; if (soll && !b.classList.contains("da")){ b.classList.add("da"); b.querySelectorAll(".st").forEach(c => c.setAttribute("opacity", 1)); this.klang && this.klang(700 + i * 120); } });
        if (p >= .5 && !zwischen){ zwischen = true; flieg(schnuppen[0]); }
        if (fertig){ naechste -= dt; if (naechste <= 0){ naechste = zuf(1.2, 2.6); flieg(schnuppen[Math.floor(Math.random() * schnuppen.length)]); } }
      },
      fertig(){ fertig = true; }
    };
  } };

WELTEN.raupe = { titel: "Raupe wird Schmetterling", emoji: "🐛", art: "ruhe",
  text: "Die Raupe frisst, verpuppt sich und schlüpft – aber nur, solange es leise ist. Bei Lärm bleibt alles stehen.",
  fertigText: ["Ein Schmetterling ist geschlüpft!", "Und die Blumen blühen."],
  aufbauen(sz){
    sz.innerHTML = `
      <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="gH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fcff5"/><stop offset=".55" stop-color="#d4effc"/><stop offset="1" stop-color="#f3fbff"/></linearGradient>
          <radialGradient id="gSonne" cx=".85" cy=".05" r=".55"><stop offset="0" stop-color="#fff7cf" stop-opacity=".95"/><stop offset=".25" stop-color="#fff2b0" stop-opacity=".45"/><stop offset="1" stop-color="#fff2b0" stop-opacity="0"/></radialGradient>
          <linearGradient id="gWiese" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a6d77f"/><stop offset="1" stop-color="#5f9f43"/></linearGradient>
          <filter id="gFern"><feGaussianBlur stdDeviation="4"/></filter><filter id="gUnscharf"><feGaussianBlur stdDeviation="7"/></filter>
        </defs>
        <rect width="1600" height="900" fill="url(#gH)"/><rect width="1600" height="900" fill="url(#gSonne)"/>
        <path d="M0 560 Q300 480 620 530 T1250 500 T1600 520 V900 H0Z" fill="#b9dca4" filter="url(#gFern)"/>
        <path d="M0 600 Q400 540 820 590 T1600 570 V900 H0Z" fill="#9ccc7e" filter="url(#gFern)"/>
        ${Array.from({ length: 26 }, (_, i) => `<circle cx="${(i * 67) % 1600}" cy="${610 + (i * 23) % 70}" r="${5 + i % 3 * 3}" fill="${["#fff", "#ffd5e5", "#fff2a8", "#e8d6ff"][i % 4]}" opacity=".7" filter="url(#gFern)"/>`).join("")}
        <path d="M0 650 Q500 600 1000 640 T1600 630 V900 H0Z" fill="url(#gWiese)"/>
        <g filter="url(#gUnscharf)" opacity=".85">${Array.from({ length: 40 }, (_, i) => { const x = (i * 41) % 1600, h = 60 + (i * 17) % 70; return `<path d="M${x} 900 Q${x + 8} ${900 - h * .6} ${x + (i % 2 ? 18 : -14)} ${900 - h}" stroke="${i % 3 ? "#4f8f37" : "#6aad4a"}" stroke-width="10" fill="none" stroke-linecap="round"/>`; }).join("")}</g>
      </svg>
      ${[[10, 70, 220], [26, 95, 170], [6, 120, 260]].map(([y, t, w], i) => `<div class="wolke" style="top:${y}%;animation-duration:${t}s;animation-delay:${-i * 30}s">${WOLKE("gW" + i, w)}</div>`).join("")}
      <svg class="voll mitte" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <defs>
          <linearGradient id="gAst" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a87a52"/><stop offset=".5" stop-color="#7a5232"/><stop offset="1" stop-color="#4e331e"/></linearGradient>
          <linearGradient id="gBlatt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9ad97a"/><stop offset=".55" stop-color="#5fae4a"/><stop offset="1" stop-color="#3a7f30"/></linearGradient>
          <linearGradient id="gPuppe" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c3e08c"/><stop offset=".5" stop-color="#93bd5e"/><stop offset="1" stop-color="#6b9440"/></linearGradient>
          <radialGradient id="gEi" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fffef2"/><stop offset="1" stop-color="#e2cf8c"/></radialGradient>
          <mask id="gLoecher" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900"><rect width="1600" height="900" fill="white"/>
            ${[[930, 262, 26], [850, 300, 30], [770, 320, 28], [690, 330, 26]].map(([x, y, r], i) => `<path class="loch l${i}" d="M${x - r} ${y} a${r} ${r} 0 1 0 ${2 * r} 0 a${r * .8} ${r * .7} 0 0 0 -${2 * r} 0Z" fill="black" opacity="0"/>`).join("")}</mask>
          <filter id="gSch"><feGaussianBlur stdDeviation="6"/></filter>
        </defs>
        <path d="M-50 345 C300 315 700 335 1100 305 C1300 290 1480 265 1650 245" stroke="#3a4a2a" stroke-width="30" fill="none" opacity=".25" filter="url(#gSch)"/>
        <path d="M-50 330 C300 300 700 320 1100 290 C1300 275 1480 250 1650 230" stroke="url(#gAst)" stroke-width="32" fill="none" stroke-linecap="round"/>
        <path d="M100 318 q40 -4 80 2 M420 312 q50 -6 90 0 M1000 296 q40 -6 80 -4 M1350 268 q40 -6 70 -10" stroke="#5a3b22" stroke-width="3" fill="none" opacity=".6"/>
        <path d="M300 322 C320 280 360 250 400 240" stroke="url(#gAst)" stroke-width="12" fill="none" stroke-linecap="round"/>
        <path d="M400 240 C420 190 480 180 510 200 C490 240 440 260 400 240Z" fill="url(#gBlatt)"/>
        <path d="M1380 260 C1400 210 1470 196 1500 216 C1470 260 1420 272 1380 260Z" fill="url(#gBlatt)"/>
        <g mask="url(#gLoecher)"><path d="M520 318 C560 200 820 170 980 250 C900 360 640 390 520 318Z" fill="url(#gBlatt)"/>
          <path d="M520 318 C680 280 820 260 980 250 M620 300 C640 260 660 240 690 225 M700 290 C720 255 750 232 780 220 M780 280 C800 250 830 232 860 226 M640 312 C660 330 690 345 720 350 M740 300 C760 322 790 335 820 338" stroke="#3f8a33" stroke-width="4" fill="none" opacity=".8"/>
          <path d="M560 290 C620 230 720 205 820 210" stroke="#fff" stroke-width="10" fill="none" opacity=".18" stroke-linecap="round"/></g>
        <ellipse class="ei" cx="900" cy="298" rx="12" ry="16" fill="url(#gEi)"/>
        <g class="puppe-g" opacity="0"><line x1="1200" y1="282" x2="1200" y2="312" stroke="#bba27a" stroke-width="4"/><g class="puppe"><path d="M1200 310 C1240 330 1246 420 1200 470 C1154 420 1160 330 1200 310Z" fill="url(#gPuppe)"/><path d="M1186 330 C1180 370 1184 420 1198 460" stroke="#fff" stroke-width="6" fill="none" opacity=".3" stroke-linecap="round"/><path class="riss" d="M1186 360 L1200 380 L1190 400 L1206 420" stroke="#4d6a2c" stroke-width="4" fill="none" opacity="0"/><path d="M1178 350 q22 10 44 0 M1176 390 q24 10 48 0 M1182 430 q18 8 36 0" stroke="#7c9f4b" stroke-width="3" fill="none"/><circle cx="1200" cy="350" r="3" fill="#e8c24a"/><circle cx="1212" cy="352" r="3" fill="#e8c24a"/></g></g>
      </svg>
      ${["tulpe", "sonnenblume", "bluete", "tulpe", "bluete", "sonnenblume"].map((k, i) => `<div class="blume" style="left:${6 + i * 15.5}%;transition-delay:${i * .25}s">${BILD(k)}</div>`).join("")}
      <div class="ebene"></div>`;
    const ebene = sz.querySelector(".ebene"), ei = sz.querySelector(".ei"), loecher = [...sz.querySelectorAll(".loch")], puppe = sz.querySelector(".puppe-g"), riss = sz.querySelector(".riss"), blumen = [...sz.querySelectorAll(".blume")];
    const raupe = wesen(ebene, "raupe"), falter = wesen(ebene, "schmetterling"), biene = wesen(ebene, "biene");
    let rx = .56, t = 0, fx = .75, fy = .34, ft = 0, fertig = false;
    const umr = (x, y, W, H) => { const s0 = Math.min(W / 1600, H / 900), k = W <= H ? 1.6 : 1, ox = (W - 1600 * s0) / 2, oy = H - 900 * s0;
        const px = W / 2 + (ox + x * s0 - W / 2) * k, py = H + (oy + y * s0 - H) * k; return [px / W, py / H, s0 * k]; };
    return {
      schritt(p, laut, dt, W, H){
        if (!laut) t += dt;
        ei.setAttribute("opacity", p < .08 ? 1 : 0);
        loecher.forEach((l, i) => l.setAttribute("opacity", p >= .15 + i * .09 ? 1 : 0));
        const raupeDa = p >= .08 && p < .52;
        if (raupeDa && !laut){ rx = .56 + ((p - .08) / .44) * .17; }
        const [x, y, s] = umr(1600 * rx, 310, W, H);
        raupe.style.opacity = raupeDa ? 1 : 0;
        const wackel = laut ? 0 : Math.sin(t * 6) * .004;
        setze(raupe, x + wackel, y, (90 + (p - .08) * 200) * s, W, H);
        puppe.setAttribute("opacity", p >= .52 && !fertig ? 1 : 0);
        riss.setAttribute("opacity", p >= .82 ? 1 : 0);
        if (p >= .82 && !laut) puppe.style.transform = `translateX(${Math.sin(t * 20) * 3}px)`;
        if (fertig){
          ft += dt;
          fx = .5 + Math.sin(ft * .35) * .38; fy = .3 + Math.sin(ft * .9) * .12;
          falter.style.opacity = 1; falter.classList.toggle("links", Math.cos(ft * .35) < 0);
          setze(falter, fx, fy, Math.min(W, H * 1.6) * .14, W, H);
          falter.firstChild.style.transform = (Math.cos(ft * .35) < 0 ? "scaleX(-1) " : "") + `scaleY(${.85 + Math.abs(Math.sin(ft * 9)) * .15})`;
          biene.style.opacity = 1; setze(biene, .5 + Math.sin(ft * .6 + 2) * .35, .72 + Math.sin(ft * 2.1) * .05, Math.min(W, H * 1.6) * .06, W, H);
        }
      },
      fertig(){ fertig = true; blumen.forEach(b => b.classList.add("da")); }
    };
  } };

/* =====================================================================
   ARBEITSPHASE
   ===================================================================== */
WELTEN.baum = { titel: "Weihnachtsbaum schmücken", emoji: "🎄", art: "arbeit",
  text: "Solange es leise ist, kommt nach und nach Schmuck an den Baum. Bei Lärm flackern die Lichter. Ganz zum Schluss kommt der Stern auf die Spitze.",
  aufbauen(sz){
    const PLAETZE = [[800, 250], [770, 320], [835, 330], [740, 400], [800, 395], [865, 410], [705, 480], [770, 470], [835, 485], [900, 470], [675, 560], [740, 555], [805, 565], [870, 550], [930, 565], [650, 640], [715, 645], [790, 650], [860, 640], [935, 650], [690, 720], [760, 725], [840, 720], [910, 715]];
    const FARBEN = [["#ff7a6b", "#b3201a"], ["#ffe48a", "#c8930c"], ["#8fd0ff", "#1f5fa8"], ["#ffc07a", "#c2620e"], ["#d6a8ff", "#6a33a8"], ["#ffffff", "#a9b4c2"]];
    const schmuck = mischen(PLAETZE).map(([x, y], i) => i % 6 === 5
      ? `<g class="schmuck"><rect x="${x - 6}" y="${y - 22}" width="12" height="26" rx="3" fill="url(#bKerze)"/><circle cx="${x}" cy="${y - 30}" r="16" fill="#ffcf5a" opacity=".45" filter="url(#bGlow)"/><path d="M${x} ${y - 38} q8 8 0 14 q-8 -6 0 -14Z" fill="#ffd36b"/></g>`
      : i % 6 === 4 ? `<g class="schmuck"><path d="M${x - 16} ${y - 10} Q${x - 6} ${y - 2} ${x} ${y} Q${x - 6} ${y + 2} ${x - 16} ${y + 10}Z M${x + 16} ${y - 10} Q${x + 6} ${y - 2} ${x} ${y} Q${x + 6} ${y + 2} ${x + 16} ${y + 10}Z" fill="url(#bSchleife)"/><circle cx="${x}" cy="${y}" r="5" fill="#9e1e2c"/></g>`
      : `<g class="schmuck"><circle cx="${x + 3}" cy="${y + 4}" r="17" fill="#000" opacity=".25" filter="url(#bWeich)"/><circle cx="${x}" cy="${y}" r="17" fill="url(#bK${i % 5})"/><ellipse cx="${x - 6}" cy="${y - 7}" rx="5" ry="3.5" fill="#fff" opacity=".8"/><rect x="${x - 4}" y="${y - 22}" width="8" height="6" rx="1" fill="url(#bGold)"/></g>`).join("");
    const lage = (y0, y1, x0, x1, wellen) => `M800 ${y0} C${800 + (x1 - 800) * .35} ${y0 + (y1 - y0) * .45} ${x1 - 30} ${y1 - 40} ${x1} ${y1} ${Array.from({ length: wellen }, (_, i) => { const xa = x1 - (x1 - x0) * (i + .5) / wellen, xb = x1 - (x1 - x0) * (i + 1) / wellen; return `Q${xa.toFixed(0)} ${y1 + 22} ${xb.toFixed(0)} ${y1}`; }).join(" ")} C${x0 + 30} ${y1 - 40} ${800 - (800 - x0) * .35} ${y0 + (y1 - y0) * .45} 800 ${y0}Z`;
    sz.innerHTML = `
      <svg class="voll mitte" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <defs>
          <radialGradient id="bRaum" cx=".5" cy=".62" r=".7"><stop offset="0" stop-color="#7a4a46"/><stop offset=".45" stop-color="#3b2234"/><stop offset="1" stop-color="#160d18"/></radialGradient>
          <radialGradient id="bWaerme" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffc977" stop-opacity=".45"/><stop offset="1" stop-color="#ffc977" stop-opacity="0"/></radialGradient>
          <linearGradient id="bBoden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a3c"/><stop offset="1" stop-color="#4a2e1e"/></linearGradient>
          <linearGradient id="bNacht" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1a3c"/><stop offset="1" stop-color="#2d4478"/></linearGradient>
          <linearGradient id="bRahmen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9a6a42"/><stop offset="1" stop-color="#5c3a20"/></linearGradient>
          <radialGradient id="bTanne" cx=".5" cy=".25" r=".9"><stop offset="0" stop-color="#4fa36e"/><stop offset=".55" stop-color="#2b7349"/><stop offset="1" stop-color="#123d27"/></radialGradient>
          <linearGradient id="bStamm" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5f3c"/><stop offset="1" stop-color="#4a2f1c"/></linearGradient>
          <linearGradient id="bGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0a8"/><stop offset=".5" stop-color="#e0b040"/><stop offset="1" stop-color="#9a7010"/></linearGradient>
          <linearGradient id="bKerze" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#e6d6b8"/></linearGradient>
          <linearGradient id="bSchleife" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6b7a"/><stop offset="1" stop-color="#a81e30"/></linearGradient>
          ${FARBEN.slice(0, 5).map(([a, b], i) => `<radialGradient id="bK${i}" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".18" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`).join("")}
          <filter id="bGlow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="6"/></filter>
          <filter id="bWeich"><feGaussianBlur stdDeviation="3"/></filter><filter id="bSehrWeich" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
          <filter id="bNadeln"><feTurbulence type="fractalNoise" baseFrequency=".08" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 .1  0 0 0 0 0  0 0 0 .5 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
          <clipPath id="l2Fenster"><rect x="1160" y="140" width="300" height="360" rx="16"/></clipPath>
        </defs>
        <rect x="-400" y="0" width="2400" height="900" fill="url(#bRaum)"/>
        <circle cx="800" cy="480" r="420" fill="url(#bWaerme)"/>
        <rect x="1144" y="124" width="332" height="392" rx="22" fill="url(#bRahmen)"/><rect x="1160" y="140" width="300" height="360" rx="16" fill="url(#bNacht)"/>
        <g clip-path="url(#l2Fenster)">${Array.from({ length: 22 }, (_, i) => `<circle class="fenster-flocke" cx="${1170 + (i * 37) % 290}" cy="140" r="${2 + i % 3}" fill="#fff" opacity=".9" style="animation-duration:${6 + i % 5}s;animation-delay:${-i * .6}s;--dx:10px"/>`).join("")}<path d="M1160 470 Q1310 440 1460 470 V500 H1160Z" fill="#e8eefc"/><path d="M1160 140 h80 q-50 30 -80 80Z M1460 140 h-70 q40 26 70 70Z M1160 500 v-60 q30 40 70 60Z" fill="#fff" opacity=".35" filter="url(#bWeich)"/></g>
        <rect x="1302" y="140" width="10" height="360" fill="url(#bRahmen)"/><rect x="1160" y="314" width="300" height="10" fill="url(#bRahmen)"/>
        <rect x="-400" y="790" width="2400" height="110" fill="url(#bBoden)"/>
        ${[-200, 120, 440, 760, 1080, 1400].map(x => `<path d="M${x} 790 L${x + 40} 900" stroke="#3a2416" stroke-width="3" opacity=".5"/>`).join("")}
        <ellipse cx="800" cy="800" rx="320" ry="26" fill="#ffc977" opacity=".25" filter="url(#bWeich)"/>
        <ellipse cx="800" cy="795" rx="250" ry="16" fill="#000" opacity=".35" filter="url(#bWeich)"/>
        <rect x="772" y="730" width="56" height="74" fill="url(#bStamm)"/>
        <g>
          <path d="${lage(560, 780, 590, 1010, 7)}" fill="url(#bTanne)"/>
          <path d="${lage(420, 640, 640, 960, 6)}" fill="url(#bTanne)"/>
          <path d="${lage(300, 500, 690, 910, 5)}" fill="url(#bTanne)"/>
          <path d="${lage(180, 360, 735, 865, 4)}" fill="url(#bTanne)"/>
          <g filter="url(#bNadeln)" opacity=".9"><path d="${lage(560, 780, 590, 1010, 7)}" fill="#fff"/><path d="${lage(420, 640, 640, 960, 6)}" fill="#fff"/><path d="${lage(300, 500, 690, 910, 5)}" fill="#fff"/><path d="${lage(180, 360, 735, 865, 4)}" fill="#fff"/></g>
        </g>
        ${[[690, 400, 910, 445], [650, 545, 950, 610], [620, 690, 985, 745]].map(([a, b, c, d]) => `<path d="M${a} ${b} Q800 ${(b + d) / 2 + 46} ${c} ${d}" stroke="url(#bGold)" stroke-width="4" fill="none" opacity=".85"/>`).join("")}
        ${Array.from({ length: 24 }, (_, i) => { const r = Math.floor(i / 8), x = [708, 668, 640][r] + (i % 8) * [26, 37, 45][r], y = [418, 572, 714][r] + Math.sin(i * 1.3) * 10, f = ["#ffe066", "#ff9a8a", "#9fe2ff"][i % 3]; return `<g class="licht" style="animation-delay:${-i * .27}s"><circle cx="${x}" cy="${y}" r="14" fill="${f}" opacity=".55" filter="url(#bGlow)"/><circle cx="${x}" cy="${y}" r="5" fill="#fffbe8"/></g>`; }).join("")}
        ${schmuck}
        <g class="spitze"><circle cx="800" cy="170" r="70" fill="#ffe27a" opacity=".5" filter="url(#bGlow)"/><path d="M800 120 L815 160 L858 162 L824 188 L836 230 L800 205 L764 230 L776 188 L742 162 L785 160Z" fill="url(#bGold)"/><path d="M800 132 L809 162 L800 200Z" fill="#fff" opacity=".5"/></g>
        <g class="geschenke" opacity="0" style="transition:opacity 1.5s">
          <ellipse cx="760" cy="812" rx="330" ry="14" fill="#000" opacity=".3" filter="url(#bWeich)"/>
          <rect x="600" y="730" width="110" height="80" rx="6" fill="#d4604a"/><rect x="600" y="730" width="110" height="80" rx="6" fill="url(#bRaum)" opacity=".25"/><rect x="648" y="730" width="14" height="80" fill="url(#bGold)"/><rect x="600" y="752" width="110" height="12" fill="url(#bGold)"/>
          <rect x="880" y="745" width="90" height="65" rx="6" fill="#3f7fc4"/><rect x="918" y="745" width="14" height="65" fill="#f4f4f8"/>
          <rect x="980" y="760" width="70" height="50" rx="6" fill="#8a4fb0"/><rect x="1008" y="760" width="12" height="50" fill="url(#bGold)"/>
        </g>
      </svg>`;
    const teile = [...sz.querySelectorAll(".schmuck")];
    return {
      schritt(p, laut){
        sz.classList.toggle("laut", laut);
        const n = Math.floor(p * teile.length + .001);
        teile.forEach((t, i) => { if (i < n && !t.classList.contains("da")){ t.classList.add("da"); this.klang && this.klang(880 + (i % 5) * 60, .1); } });
      },
      fertig(anteil){ sz.classList.add("fertig"); sz.querySelector(".geschenke").setAttribute("opacity", anteil >= .5 ? 1 : 0); }
    };
  } };

WELTEN.ballon = { titel: "Ballonfahrt", emoji: "🎈", art: "arbeit", faellt: true,
  text: "Solange es leise ist, steigt der Heißluftballon langsam höher. Bei Lärm sinkt er ein Stück. Schafft ihr es bis auf die große Wolke?",
  aufbauen(sz){
    sz.innerHTML = `
      <div class="sonne"></div>
      ${[[8, 160, 260], [22, 120, 190], [36, 200, 300], [55, 140, 150]].map(([y, t, w], i) => `<div class="wolke" style="top:${y}%;animation-duration:${t}s;animation-delay:${-i * 40}s">${WOLKE("aW" + i, w)}</div>`).join("")}
      <svg class="land" viewBox="0 0 1600 500" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="aF1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bcdcc2"/><stop offset="1" stop-color="#9cc7a0"/></linearGradient>
          <linearGradient id="aF2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd07f"/><stop offset="1" stop-color="#6fae52"/></linearGradient>
          <linearGradient id="aF3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7dbd5c"/><stop offset="1" stop-color="#477f33"/></linearGradient>
          <radialGradient id="aBaum" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#7fc062"/><stop offset="1" stop-color="#2f6a2c"/></radialGradient>
          <filter id="aFern"><feGaussianBlur stdDeviation="3"/></filter><filter id="aSch"><feGaussianBlur stdDeviation="5"/></filter>
        </defs>
        <path d="M-200 180 Q200 110 600 160 T1300 140 T1800 150 V500 H-200Z" fill="url(#aF1)" filter="url(#aFern)"/>
        <path d="M-200 270 Q300 200 800 250 T1800 240 V500 H-200Z" fill="url(#aF2)"/>
        <path d="M300 300 L640 280 L700 330 L340 350Z" fill="#c8d76a" opacity=".55"/><path d="M900 290 L1200 300 L1180 340 L880 335Z" fill="#e3c97a" opacity=".55"/><path d="M640 280 L700 330 M340 350 L300 300" stroke="#6f9a45" stroke-width="2" opacity=".4"/>
        <path d="M-200 370 Q400 320 1000 360 T1800 350 V500 H-200Z" fill="url(#aF3)"/>
        <g>${[100, 230, 1180, 1330, 1460].map((x, i) => `<ellipse cx="${x + 12}" cy="372" rx="38" ry="8" fill="#1e3d1c" opacity=".35" filter="url(#aSch)"/><rect x="${x - 6}" y="330" width="12" height="40" fill="#5a3d26"/><circle cx="${x}" cy="${312 - i % 2 * 6}" r="${36 + i % 2 * 6}" fill="url(#aBaum)"/>`).join("")}</g>
        <g><ellipse cx="770" cy="386" rx="90" ry="10" fill="#1e3d1c" opacity=".3" filter="url(#aSch)"/><rect x="700" y="300" width="120" height="84" fill="#f1e2c4"/><rect x="760" y="300" width="60" height="84" fill="#d8c6a2"/><path d="M688 306 L760 250 L832 306Z" fill="#b8392d"/><path d="M760 250 L832 306 L760 306Z" fill="#8f2a22"/><rect x="745" y="338" width="28" height="46" fill="#6a4426"/><rect x="712" y="320" width="22" height="20" fill="#9fd0f0"/></g>
      </svg>
      <div class="ziel-wolke">${WOLKE("aZiel", 600)}</div>
      <svg class="ballon" viewBox="0 0 200 290" aria-hidden="true" style="overflow:visible">
        <defs>
          <radialGradient id="aHuelle" cx=".32" cy=".28" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></radialGradient>
          <linearGradient id="aKorb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c8924c"/><stop offset="1" stop-color="#7a5226"/></linearGradient>
          <filter id="aFl" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="4"/></filter>
          <clipPath id="aForm"><path d="M100 6 C40 6 8 50 8 98 C8 150 60 186 76 206 L124 206 C140 186 192 150 192 98 C192 50 160 6 100 6Z"/></clipPath>
        </defs>
        <g clip-path="url(#aForm)">
          <rect x="0" y="0" width="200" height="210" fill="#d8453a"/>
          <path d="M100 6 C80 6 60 50 60 98 C60 150 84 186 88 206 L112 206 C116 186 140 150 140 98 C140 50 120 6 100 6Z" fill="#f2bf46"/>
          <path d="M100 6 C94 6 88 50 88 98 C88 150 96 186 98 206 L102 206 C104 186 112 150 112 98 C112 50 106 6 100 6Z" fill="#3a8ad0"/>
          <path d="M0 96 Q100 124 200 96 L200 106 Q100 134 0 106Z" fill="#fff" opacity=".55"/>
          <rect x="0" y="0" width="200" height="210" fill="url(#aHuelle)"/>
        </g>
        <g class="flamme"><circle cx="100" cy="226" r="14" fill="#ffb03b" opacity=".6" filter="url(#aFl)"/><path d="M100 212 C90 226 94 238 100 242 C106 238 110 226 100 212Z" fill="#ffd36b"/></g>
        <path d="M80 206 L84 250 M120 206 L116 250 M100 206 L100 248" stroke="#5a3d26" stroke-width="2.5"/>
        <rect x="76" y="246" width="48" height="36" rx="6" fill="url(#aKorb)"/><path d="M76 258 H124 M76 270 H124 M88 246 V282 M100 246 V282 M112 246 V282" stroke="#6a4520" stroke-width="2" opacity=".6"/><rect x="74" y="244" width="52" height="6" rx="3" fill="#5a3d26"/>
      </svg>`;
    const land = sz.querySelector(".land"), ballon = sz.querySelector(".ballon");
    let fertig = false, landeH = 0;
    return {
      schritt(p, laut){
        sz.classList.toggle("laut", laut);
        const h = fertig ? landeH : p;
        land.style.transform = `translateY(${(h * 70).toFixed(1)}%)`;
        ballon.style.top = `calc(${(62 - h * 50).toFixed(1)}% - 10vh)`;
        sz.style.background = `linear-gradient(hsl(210 ${62 - h * 8}% ${54 - h * 14}%) 0%, hsl(205 75% ${76 - h * 10}%) 55%, hsl(40 80% ${90 - h * 4}%) 100%)`;
      },
      fertig(anteil, p){ fertig = true; landeH = p >= .85 ? 1.05 : p; if (p >= .85) sz.classList.add("fertig"); return p >= .85 ? ["Gelandet auf der großen Wolke!", ""] : ["Der Ballon landet sanft.", "Nächstes Mal schafft ihr es bis auf die Wolke!"]; }
    };
  } };

WELTEN.burg = { titel: "Burg bauen", emoji: "🏰", art: "arbeit",
  text: "Solange es leise ist, kommt Stein für Stein dazu. Ganz am Ende wird die Fahne gehisst.",
  aufbauen(sz){
    const steine = [];
    const reihe = (x0, y, anzahl, w, h, versatz) => { for (let i = 0; i < anzahl; i++) steine.push([x0 + i * w + (versatz ? w / 2 : 0), y, w - 4, h - 4]); };
    for (let r = 0; r < 6; r++){ reihe(520, 760 - r * 50, r % 2 ? 9 : 10, 56, 50, r % 2); }
    for (let r = 0; r < 10; r++){ reihe(380, 760 - r * 50, 3, 50, 50, false); reihe(1070, 760 - r * 50, 3, 50, 50, false); }
    const zinnen = []; [[520, 460, 10, 56], [380, 260, 3, 50], [1070, 260, 3, 50]].forEach(([x, y, n, w]) => { for (let i = 0; i < n; i += 2) zinnen.push([x + i * w, y, w - 6, 40]); });
    const alle = [...steine.sort((a, b) => b[1] - a[1] || a[0] - b[0]), ...zinnen];
    sz.innerHTML = `
      <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="uH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fa8e0"/><stop offset=".6" stop-color="#b9e0f7"/><stop offset="1" stop-color="#f2f6e8"/></linearGradient>
          <radialGradient id="uSonne" cx=".88" cy=".1" r=".5"><stop offset="0" stop-color="#fff6c8" stop-opacity="1"/><stop offset=".12" stop-color="#ffe98a" stop-opacity=".7"/><stop offset="1" stop-color="#ffe98a" stop-opacity="0"/></radialGradient>
          <linearGradient id="uWiese" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#93c96c"/><stop offset="1" stop-color="#4f8f39"/></linearGradient>
          <filter id="uFern"><feGaussianBlur stdDeviation="4"/></filter>
        </defs>
        <rect width="1600" height="900" fill="url(#uH)"/><rect width="1600" height="900" fill="url(#uSonne)"/>
        <path d="M-200 560 L80 380 L240 470 L420 330 L640 500 L860 360 L1080 480 L1280 340 L1500 470 L1800 400 V900 H-200Z" fill="#9fb3cf" filter="url(#uFern)" opacity=".8"/>
        <path d="M420 330 L470 362 L440 370 L400 345Z M860 360 L905 392 L870 396 L840 378Z M1280 340 L1325 372 L1292 376 L1262 358Z" fill="#fff" opacity=".7" filter="url(#uFern)"/>
        <path d="M-200 620 Q200 560 600 600 T1400 580 T1800 600 V900 H-200Z" fill="#a9cf8c" filter="url(#uFern)"/>
        <path d="M-200 780 Q400 740 800 765 T1800 760 V900 H-200Z" fill="url(#uWiese)"/>
      </svg>
      <svg class="voll mitte" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <defs>
          <linearGradient id="uS0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8ccb8"/><stop offset="1" stop-color="#9c8d78"/></linearGradient>
          <linearGradient id="uS1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9bba5"/><stop offset="1" stop-color="#8c7c67"/></linearGradient>
          <linearGradient id="uS2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2d6c2"/><stop offset="1" stop-color="#a99a84"/></linearGradient>
          <linearGradient id="uTor" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a4a30"/><stop offset="1" stop-color="#3e2a1a"/></linearGradient>
          <filter id="uKorn"><feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 .2  0 0 0 0 .15  0 0 0 0 .1  0 0 0 .35 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
          <filter id="uSch"><feGaussianBlur stdDeviation="10"/></filter>
        </defs>
        <ellipse cx="820" cy="815" rx="480" ry="28" fill="#2f5a22" opacity=".45" filter="url(#uSch)"/>
        <g class="fahne"><rect x="452" y="140" width="6" height="130" fill="#5a3d26"/><path class="fahne-tuch" d="M458 144 Q500 140 540 160 Q500 168 458 182Z" fill="#d8453a"/><rect x="1142" y="140" width="6" height="130" fill="#5a3d26"/><path class="fahne-tuch" d="M1148 144 Q1190 140 1230 160 Q1190 168 1148 182Z" fill="#3a8ad0"/><rect x="797" y="300" width="6" height="170" fill="#5a3d26"/><path class="fahne-tuch" d="M803 304 Q850 300 900 324 Q850 334 803 350Z" fill="#f2bf46"/></g>
        <g>${alle.map(([x, y, w, h], i) => `<rect class="stein" x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="url(#uS${(i * 7) % 3})"/>`).join("")}</g>
        <g filter="url(#uKorn)">${alle.map(([x, y, w, h]) => `<rect class="stein st-k" x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#fff"/>`).join("")}</g>
        <g class="tor" opacity="0" style="transition:opacity 1s"><path d="M756 810 L756 700 Q800 646 844 700 L844 810Z" fill="#3a2a1e"/><path d="M762 810 L762 704 Q800 656 838 704 L838 810Z" fill="url(#uTor)"/><path d="M762 740 H838 M762 780 H838" stroke="#2a1d12" stroke-width="5"/><circle cx="826" cy="760" r="4" fill="#c9a24a"/></g>
      </svg>`;
    const st = [...sz.querySelectorAll(".stein:not(.st-k)")], stK = [...sz.querySelectorAll(".st-k")], tor = sz.querySelector(".tor");
    return {
      schritt(p){
        const n = Math.floor(p * st.length + .001);
        st.forEach((s, i) => { if (i < n && !s.classList.contains("da")){ s.classList.add("da"); stK[i].classList.add("da"); if (i % 4 === 0 && this.klang) this.klang(300 + (i % 7) * 30, .06, "triangle"); } });
        tor.setAttribute("opacity", p >= .35 ? 1 : 0);
      },
      fertig(){ sz.classList.add("fertig"); }
    };
  } };

/* =====================================================================
   Ablauf: Mikrofon, Fortschritt, Ende
   ===================================================================== */
const E = { ruheMin: 3, arbeitMin: 10 };
try { Object.assign(E, JSON.parse(localStorage.getItem("lt-leise-welten") || "{}")); } catch (x) {}
const merken = () => { try { localStorage.setItem("lt-leise-welten", JSON.stringify(E)); } catch (x) {} };
let schwelle = 45; try { schwelle = +localStorage.getItem("lt-leise-schwelle") || 45; } catch (x) {}

let el, sz, karte, welt, key, inst, raf = 0, stream = null, ctx = null, analyser = null, puffer = null, laeuft = false, glatt = 0, letzte = 0;
let p = 0, zeit = 0, leise = 0, fertig = false, sim = null;

function aufbauen(){
    if (el) return;
    const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    el = document.createElement("div"); el.id = "lw2";
    document.body.appendChild(el);
    el.addEventListener("click", klick);
    el.addEventListener("input", e => { if (e.target.id === "l2Schwelle"){ schwelle = +e.target.value; try { localStorage.setItem("lt-leise-schwelle", schwelle); } catch (x) {} grenze(); } });
}
function grenze(){ const g = el.querySelector(".l2-grenze"); if (g) g.style.left = schwelle + "%"; }

function klang(f, d = .12, typ = "sine"){
    if (!ctx) return;
    try { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = typ; o.frequency.value = f; g.gain.setValueAtTime(.0001, ctx.currentTime); g.gain.exponentialRampToValueAtTime(.12, ctx.currentTime + .02); g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + d + .2); o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + d + .25); } catch (x) {}
}
const gong = () => [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => klang(f, .35, "triangle"), i * 180));

function menue(){
    const ruhe = welt.art === "ruhe";
    return `<h4>${ruhe ? "Fertig nach" : "Arbeitszeit"}</h4>
      <div class="l2-reihe">${(ruhe ? [1, 2, 3, 5, 10] : [3, 5, 8, 10, 12, 15, 20, 25, 30]).map(m => `<button data-min="${m}" class="${(ruhe ? E.ruheMin : E.arbeitMin) === m ? "an" : ""}">${m} Min.${ruhe ? " Ruhe" : ""}</button>`).join("")}</div>
      <h4>Wie laut darf es sein?</h4>
      <label>streng <input id="l2Schwelle" type="range" min="15" max="85" value="${schwelle}"> locker</label>
      <p>${welt.text}</p>
      <h4>Andere Welt</h4>
      <div class="l2-reihe">${Object.entries(WELTEN).map(([k, w]) => `<button data-welt="${k}" class="${k === key ? "an" : ""}">${w.emoji} ${w.titel}</button>`).join("")}</div>`;
}

function neu(){
    cancelAnimationFrame(raf);
    p = 0; zeit = 0; leise = 0; fertig = false;
    el.className = "an" + (laeuft ? " ruhig" : "");
    el.innerHTML = `
      <div class="l2-szene w-${key}"></div>
      <div class="l2-korn"></div><div class="l2-vignette"></div>
      <div class="l2-leiste"><span class="l2-titel">${welt.emoji} ${welt.titel}</span>
        <button class="l2-k" data-a="neu" title="Neu starten">🔄</button>
        <button class="l2-k" data-a="menue" title="Einstellungen">⚙️</button>
        <button class="l2-k" data-a="voll" title="Vollbild">⛶</button>
        <button class="l2-k l2-immer" data-a="zu" title="Schließen">✕</button></div>
      <div class="l2-menue">${menue()}</div>
      <div class="l2-messer"><div class="l2-pegel"></div><div class="l2-grenze"></div></div>
      ${welt.art === "arbeit" ? `<div class="l2-uhr"></div>` : ""}
      <div class="l2-karte"><b></b><span></span></div>
      ${laeuft ? "" : `<div class="l2-start"><div><h2>${welt.emoji} ${welt.titel}</h2><p>${welt.text}<br><small>${welt.art === "ruhe" ? "Ruhepause · fertig nach " + E.ruheMin + " Min. Ruhe" : "Arbeitsphase · " + E.arbeitMin + " Min."} · Das Mikrofon misst nur die Lautstärke, es wird nichts aufgenommen.</small></p><button data-a="start">▶ Start</button><p class="l2-fehler" hidden></p></div></div>`}`;
    sz = el.querySelector(".l2-szene"); karte = el.querySelector(".l2-karte");
    grenze();
    inst = welt.aufbauen(sz);
    inst.klang = klang;
    letzte = performance.now();
    raf = requestAnimationFrame(schritt);
}

async function start(){
    const f = el.querySelector(".l2-fehler");
    if (!sim){
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){ f.hidden = false; f.textContent = "Dieses Gerät erlaubt kein Mikrofon (die Seite muss über https geöffnet sein)."; return; }
        try { stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } }); }
        catch (x) { f.hidden = false; f.textContent = "Kein Zugriff aufs Mikrofon – bitte im Browser erlauben und noch einmal „Start“ tippen."; return; }
    }
    try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (stream){ analyser = ctx.createAnalyser(); analyser.fftSize = 1024; puffer = new Float32Array(analyser.fftSize); ctx.createMediaStreamSource(stream).connect(analyser); }
    } catch (x) {}
    laeuft = true;
    el.classList.add("ruhig");
    const s = el.querySelector(".l2-start"); if (s) s.remove();
    p = 0; zeit = 0; leise = 0; fertig = false; letzte = performance.now();
}

function messen(){
    if (sim) return sim();
    if (!analyser) return 0;
    analyser.getFloatTimeDomainData(puffer);
    let q = 0; for (let i = 0; i < puffer.length; i++) q += puffer[i] * puffer[i];
    const db = 20 * Math.log10(Math.sqrt(q / puffer.length) + 1e-8);
    return Math.max(0, Math.min(100, (db + 70) * 1.6));
}

function schritt(jetzt){
    raf = requestAnimationFrame(schritt);
    const dt = Math.min(.1, (jetzt - letzte) / 1000); letzte = jetzt;
    const W = sz.clientWidth || 800, H = sz.clientHeight || 450;
    let laut = false;
    if (laeuft){
        glatt = glatt * .85 + messen() * .15;
        laut = glatt > schwelle;
        const pg = el.querySelector(".l2-pegel"); pg.style.width = glatt + "%"; pg.classList.toggle("laut", laut);
        if (!fertig){
            if (welt.art === "ruhe"){
                const ziel = E.ruheMin * 60;
                if (!laut) p = Math.min(1, p + dt / ziel); else if (welt.faellt) p = Math.max(0, p - dt / ziel * .6);
                if (p >= 1) ende();
            } else {
                const dauer = E.arbeitMin * 60;
                zeit += dt; if (!laut) leise += dt;
                if (welt.faellt) p = laut ? Math.max(0, p - dt / dauer * .8) : Math.min(1, p + dt / dauer * 1.15);
                else p = Math.min(1, leise / dauer);
                const rest = Math.max(0, dauer - zeit), u = el.querySelector(".l2-uhr");
                if (u) u.textContent = Math.floor(rest / 60) + ":" + String(Math.floor(rest % 60)).padStart(2, "0");
                if (zeit >= dauer) ende();
            }
        }
    }
    inst.schritt(p, laut && !fertig, dt, W, H);
}

function ende(){
    fertig = true;
    const anteil = welt.art === "arbeit" ? leise / Math.max(1, zeit) : 1;
    gong();
    const r = inst.fertig(anteil, p);
    let titel, unter;
    if (welt.art === "ruhe") [titel, unter] = welt.fertigText;
    else {
        const stufe = anteil >= .85 ? "Super leise gearbeitet!" : anteil >= .6 ? "Gut gemacht!" : anteil >= .35 ? "Schon ganz gut!" : "Nächstes Mal klappt's noch besser!";
        titel = r && r[0] ? r[0] : stufe;
        unter = (r && r[1]) || `Ihr habt ${Math.round(anteil * 100)} % der Zeit leise gearbeitet.`;
        if (r && r[0] && r[1] === null) unter = `${stufe} Ihr habt ${Math.round(anteil * 100)} % der Zeit leise gearbeitet.`;
    }
    karte.querySelector("b").textContent = titel; karte.querySelector("span").textContent = unter || "";
    setTimeout(() => karte.classList.add("an"), welt.art === "ruhe" ? 1200 : 2200);
    const u = el.querySelector(".l2-uhr"); if (u) u.textContent = "";
}

function stoppen(){
    cancelAnimationFrame(raf); raf = 0;
    if (stream) stream.getTracks().forEach(t => t.stop());
    if (ctx) try { ctx.close(); } catch (x) {}
    stream = ctx = analyser = null; laeuft = false; glatt = 0;
}

function klick(e){
    const t = e.target.closest("button");
    if (!t){ if (!e.target.closest(".l2-menue")) { const m = el.querySelector(".l2-menue"); if (m) m.classList.remove("an"); } return; }
    if (t.dataset.min){ if (welt.art === "ruhe") E.ruheMin = +t.dataset.min; else E.arbeitMin = +t.dataset.min; merken(); return neu(); }
    if (t.dataset.welt){ key = t.dataset.welt; welt = WELTEN[key]; history.replaceState(null, "", "#leise-" + key); return neu(); }
    const a = t.dataset.a;
    if (a === "start") return start();
    if (a === "neu") return neu();
    if (a === "menue") return el.querySelector(".l2-menue").classList.toggle("an");
    if (a === "voll") return window.vollbild ? window.vollbild() : null;
    if (a === "zu") return schliessen();
}

function starten(k){
    if (!WELTEN[k]) return;
    aufbauen();
    key = k; welt = WELTEN[k];
    stoppen();
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "none";
    try { history.replaceState(null, "", "#leise-" + k); } catch (x) {}
    neu();
}
function schliessen(){
    stoppen();
    el.className = ""; el.innerHTML = "";
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "";
    try { history.replaceState(null, "", location.pathname); } catch (x) {}
}

window.leiseWelten = { starten, schliessen, WELTEN,
    // nur für Tests: Lautstärke vorgeben und Zeit vorspulen
    _sim(f){ sim = f; }, _vor(sek){ if (fertig) return; if (welt.art === "ruhe") p = Math.min(1, p + sek / (E.ruheMin * 60)); else { zeit += sek; leise += sek; p = Math.min(1, leise / (E.arbeitMin * 60)); } } };
document.addEventListener("DOMContentLoaded", () => { const m = /^#leise-([a-z]+)$/.exec(location.hash); if (m && WELTEN[m[1]]) starten(m[1]); });
})();
