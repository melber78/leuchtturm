/* ===============================================================
   Leise-Welten (Erweiterung zum Leise-Wald) – Mikrofon misst nur die Lautstärke
   Ruhepause (zum Zuschauen):  Korallenriff · Winterwald · Nachthimmel · Raupe wird Schmetterling
   Arbeitsphase (ruhig, Überraschung am Ende, keine Uhr für die Kinder):
                               Weihnachtsbaum · Ballonfahrt · Burg bauen · Geheimbild
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
.w-ballon .land{ position:absolute; left:0; right:0; bottom:0; height:46%; will-change:transform; }
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
/* Geheimbild */
.w-geheim{ background:radial-gradient(circle at 50% 40%, #fdf6e3, #f1e2c2); }
.w-geheim .rahmen{ position:absolute; left:50%; top:52%; transform:translate(-50%,-50%); width:min(86vw,74vh); aspect-ratio:1; border-radius:28px; background:#fff; box-shadow:0 20px 60px rgba(90,60,20,.25); overflow:hidden; }
.w-geheim .motiv{ position:absolute; inset:8%; }
.w-geheim .motiv svg{ width:100%; height:100%; }
.w-geheim .kacheln{ position:absolute; inset:0; display:grid; grid-template-columns:repeat(6,1fr); grid-template-rows:repeat(6,1fr); }
.w-geheim .kachel{ border:2px solid rgba(255,255,255,.55); display:flex; align-items:center; justify-content:center; font-weight:900; color:rgba(255,255,255,.75); font-size:min(4vw,3.4vh); transition:transform .9s, opacity .9s; }
.w-geheim .kachel.weg{ transform:rotateY(90deg) scale(.6); opacity:0; }
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

WELTEN.riff = { titel: "Korallenriff", emoji: "🐠", art: "ruhe",
  text: "Je leiser ihr seid, desto mehr Meerestiere kommen ins Riff. Bei Lärm verstecken sich alle zwischen den Korallen.",
  fertigText: ["Das ganze Riff ist zum Leben erwacht!", "Sogar der Wal schaut vorbei."],
  aufbauen(sz){
    sz.innerHTML = `
      ${[8, 30, 55, 78].map((x, i) => `<div class="strahl" style="left:${x}%;animation-delay:${-i * 1.7}s"></div>`).join("")}
      ${Array.from({ length: 14 }, (_, i) => `<div class="blase" style="left:${(i * 7.3 + 3) % 98}%;width:${6 + (i % 4) * 4}px;height:${6 + (i % 4) * 4}px;animation-duration:${7 + (i % 5) * 2}s;animation-delay:${-i * 1.1}s"></div>`).join("")}
      <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true"><path d="M0 800 Q300 760 640 790 T1300 780 T1600 790 V900 H0Z" fill="#e9d39b"/><path d="M0 840 Q400 810 900 835 T1600 830 V900 H0Z" fill="#d9bd7c"/></svg>
      ${[4, 16, 40, 62, 86, 95].map((x, i) => `<svg class="tang" style="left:${x}%;animation-delay:${-i * .8}s" viewBox="0 0 40 200" preserveAspectRatio="none"><path d="M20 200 C5 160 35 130 18 95 C5 65 30 40 22 0" stroke="${i % 2 ? "#2f9e6b" : "#46b97b"}" stroke-width="9" fill="none" stroke-linecap="round"/></svg>`).join("")}
      <svg class="koralle" style="left:6%;width:22%" viewBox="0 0 300 200" aria-hidden="true"><path d="M150 200 C150 150 120 120 90 100 M150 200 C150 140 170 110 200 80 M120 130 C100 110 70 100 50 70 M175 110 C200 100 230 90 250 60 M150 160 C150 120 150 90 150 40" stroke="#ff7a8a" stroke-width="18" fill="none" stroke-linecap="round"/></svg>
      <svg class="koralle" style="left:40%;width:16%" viewBox="0 0 200 140" aria-hidden="true"><ellipse cx="100" cy="110" rx="90" ry="50" fill="#f5a35c"/><path d="M30 105 Q60 80 90 105 T150 105 T185 100 M25 125 Q60 105 100 125 T175 122" stroke="#d9783a" stroke-width="6" fill="none"/></svg>
      <svg class="koralle" style="left:70%;width:24%" viewBox="0 0 300 220" aria-hidden="true"><path d="M150 220 L150 120 M150 120 L60 40 M150 120 L240 40 M150 150 L80 100 M150 150 L220 100 M150 120 L150 20" stroke="#b07ce8" stroke-width="10" stroke-linecap="round"/><path d="M60 40 Q150 -20 240 40 Q260 110 150 130 Q40 110 60 40Z" fill="#c69af0" opacity=".55"/></svg>
      <div class="ebene"></div>`;
    const ebene = sz.querySelector(".ebene");
    const plan = [["tropenfisch", "s", .3], ["fisch", "s", .5], ["kugelfisch", "s", .62], ["schildkroete", "s", .4], ["qualle", "q", .28], ["krebs", "b", .93], ["tropenfisch", "s", .7], ["krake", "s", .78], ["fisch", "s", .22], ["delfin", "s", .18], ["qualle", "q", .45], ["robbe", "s", .58]];
    const tiere = plan.map(([k, typ, y], i) => ({ k, typ, y, d: wesen(ebene, k), x: Math.random() < .5 ? -.15 : 1.15, zx: zuf(.1, .9), v: zuf(.03, .06) * (typ === "b" ? .5 : 1), t: zuf(0, 9), da: false, g: k === "delfin" || k === "schildkroete" || k === "robbe" ? .17 : k === "krebs" ? .09 : .12 }));
    const wal = wesen(ebene, "wal"); let walX = -.4, walAn = false;
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
              t.d.classList.toggle("links", dx < 0);
              y = t.typ === "q" ? t.y + Math.sin(t.t * .6) * .1 : t.typ === "b" ? t.y : t.y + Math.sin(t.t * 1.6) * .025;
            }
            x = t.x;
          }
          t.d.style.opacity = a; setze(t.d, x, y, t.g * S * sk, W, H);
        });
        if (walAn){ walX += dt * .05; wal.style.opacity = walX < 1.4 ? .95 : 0; setze(wal, walX, .4 + Math.sin(walX * 4) * .03, S * .42, W, H); if (walX > 1.5) walX = -.4; }
      },
      fertig(){ walAn = true; }
    };
  } };

WELTEN.winter = { titel: "Winterwald", emoji: "⛄", art: "ruhe",
  text: "Je leiser ihr seid, desto mehr schneit es und die Waldtiere kommen. Bleibt es lange leise, baut sich Stück für Stück ein Schneemann.",
  fertigText: ["Der Schneemann ist fertig!", "Er winkt euch zu."],
  aufbauen(sz){
    const tanne = (x, y, g, f) => `<g transform="translate(${x} ${y}) scale(${g})"><rect x="-8" y="-10" width="16" height="30" fill="#5a4030"/><path d="M0 -190 L70 -60 L35 -60 L90 10 L-90 10 L-35 -60 L-70 -60 Z" fill="${f}"/><path d="M0 -190 L30 -135 L-30 -135Z M-70 -60 L-40 -72 L-10 -62 L20 -74 L70 -60 L35 -60Z" fill="#fff" opacity=".9"/></g>`;
    sz.innerHTML = `
      <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 560 Q400 470 800 540 T1600 520 V900 H0Z" fill="#c9d5f0"/>
        ${[[120, 590, .9], [300, 560, .7], [520, 580, .8], [1050, 560, .75], [1250, 585, .9], [1460, 560, .7]].map(([x, y, g]) => tanne(x, y, g, "#2e5a5a")).join("")}
        <path d="M0 680 Q500 620 1000 670 T1600 660 V900 H0Z" fill="#f4f7ff"/>
      </svg>
      <div class="l2-mond" style="right:14%;top:10%;width:min(9vmin,90px);aspect-ratio:1;background:#fff8de;box-shadow:0 0 40px rgba(255,248,222,.6)"></div>
      <div class="flocken">${Array.from({ length: 90 }, (_, i) => `<span class="flocke" style="left:${(i * 11.3) % 100}%;font-size:${8 + (i % 5) * 4}px;--dx:${(i % 7) * 12 - 36}px;animation-duration:${7 + (i % 6) * 2}s;animation-delay:${-i * .37}s;opacity:0">❄</span>`).join("")}</div>
      <svg class="voll mitte" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <g transform="translate(800 820)">
          <ellipse cx="0" cy="6" rx="150" ry="18" fill="#dfe6f7"/>
          <circle class="sm-teil t1" cx="0" cy="-90" r="100" fill="#fff" stroke="#d7e0f2" stroke-width="4"/>
          <circle class="sm-teil t2" cx="0" cy="-245" r="72" fill="#fff" stroke="#d7e0f2" stroke-width="4"/>
          <circle class="sm-teil t3" cx="0" cy="-360" r="52" fill="#fff" stroke="#d7e0f2" stroke-width="4"/>
          <g class="sm-teil t4"><circle cx="-18" cy="-372" r="7" fill="#24242c"/><circle cx="18" cy="-372" r="7" fill="#24242c"/><path d="M0 -360 L52 -348 L0 -348Z" fill="#f08a24"/><path d="M-20 -336 q20 12 40 0" stroke="#24242c" stroke-width="5" fill="none" stroke-linecap="round"/></g>
          <g class="sm-teil t5"><circle cx="0" cy="-270" r="8" fill="#24242c"/><circle cx="0" cy="-240" r="8" fill="#24242c"/><circle cx="0" cy="-210" r="8" fill="#24242c"/><path d="M-66 -260 L-150 -310 M-130 -298 L-150 -330" stroke="#6b4a32" stroke-width="9" stroke-linecap="round"/><g class="sm-arm-w"><path d="M66 -260 L150 -320 M130 -306 L160 -330" stroke="#6b4a32" stroke-width="9" stroke-linecap="round"/></g></g>
          <g class="sm-teil t6"><rect x="-52" y="-420" width="104" height="14" rx="4" fill="#2a2a38"/><rect x="-34" y="-482" width="68" height="66" rx="6" fill="#2a2a38"/><rect x="-34" y="-436" width="68" height="12" fill="#c0392b"/></g>
          <g class="sm-teil t7"><path d="M-54 -310 Q0 -285 54 -310 L54 -290 Q0 -265 -54 -290Z" fill="#d9574a"/><path d="M30 -296 L48 -220 L22 -222 L14 -290Z" fill="#d9574a"/></g>
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
          t.d.classList.toggle("links", ziel < t.x);
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
    const sterne = Array.from({ length: 80 }, () => [zuf(1, 99), zuf(1, 62), zuf(2, 4)]);
    sz.innerHTML = `
      <div class="l2-mond" style="left:9%;top:9%;width:min(9vmin,90px);aspect-ratio:1;background:#fff6d0;box-shadow:inset -22px -8px 0 0 #0a1236, 0 0 30px rgba(255,246,208,.25)"></div>
      <div class="sterne">${sterne.map(([x, y, r], i) => `<i class="l2-stern" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;width:${r.toFixed(1)}px;height:${r.toFixed(1)}px;animation:l2Funkeln ${3 + i % 4}s ease-in-out ${-i * .3}s infinite"></i>`).join("")}</div>
      <svg class="voll mitte-o" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        ${BILDER.map((b, i) => `<g class="bild b${i}"><polyline class="bild-linie" points="${b.l.map(j => b.p[j].join(",")).join(" ")}" fill="none" stroke="rgba(160,200,255,.75)" stroke-width="3" stroke-linejoin="round"/>${b.p.map(([x, y]) => `<circle class="st" cx="${x}" cy="${y}" r="6" fill="#fff8c8" opacity="0" style="filter:drop-shadow(0 0 6px #fff)"/>`).join("")}</g>`).join("")}
        <g class="wolken" style="transform:translateX(-60px)"><ellipse cx="400" cy="230" rx="320" ry="90" fill="#3a4270"/><ellipse cx="900" cy="180" rx="360" ry="100" fill="#343b66"/><ellipse cx="1300" cy="250" rx="320" ry="90" fill="#3a4270"/></g>
      </svg>
      <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <path d="M-400 700 Q200 640 420 690 T860 670 T1300 690 T2000 660 V900 H-400Z" fill="#05081a"/>
        <g fill="#05081a"><path d="M560 700 L590 580 L620 700Z"/><path d="M600 700 L640 540 L680 700Z"/><rect x="900" y="620" width="130" height="80"/><path d="M885 625 L965 565 L1045 625Z"/></g>
        <rect x="935" y="645" width="26" height="26" fill="#ffd56b" opacity=".85"/>
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
      ${[[12, 60], [40, 90], [70, 75]].map(([y, t], i) => `<div class="wolke" style="top:${y}%;animation-duration:${t}s;animation-delay:${-i * 25}s">☁️</div>`).join("")}
      <svg class="voll mitte" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <path d="M-50 330 C300 300 700 320 1100 290 C1300 275 1480 250 1650 230" stroke="#7a5232" stroke-width="30" fill="none" stroke-linecap="round"/>
        <g class="blatt"><path d="M520 318 C560 200 820 170 980 250 C900 360 640 390 520 318Z" fill="#5fae4a"/><path d="M520 318 C680 280 820 260 980 250" stroke="#3f8a33" stroke-width="6" fill="none"/>
          ${[[930, 262, 26], [850, 300, 30], [770, 320, 28], [690, 330, 26]].map(([x, y, r], i) => `<circle class="loch l${i}" cx="${x}" cy="${y}" r="${r}" fill="#dff3ff" opacity="0"/>`).join("")}</g>
        <ellipse class="ei" cx="900" cy="300" rx="12" ry="16" fill="#fff6d8" stroke="#e6d49a" stroke-width="3"/>
        <g class="puppe-g" opacity="0"><line x1="1200" y1="282" x2="1200" y2="312" stroke="#bba27a" stroke-width="4"/><g class="puppe"><path d="M1200 310 C1240 330 1246 420 1200 470 C1154 420 1160 330 1200 310Z" fill="#9bc26a"/><path class="riss" d="M1186 360 L1200 380 L1190 400 L1206 420" stroke="#5d7a3a" stroke-width="4" fill="none" opacity="0"/><path d="M1178 350 q22 10 44 0 M1176 390 q24 10 48 0 M1182 430 q18 8 36 0" stroke="#86ad57" stroke-width="4" fill="none"/></g></g>
      </svg>
      ${["tulpe", "sonnenblume", "bluete", "tulpe", "bluete", "sonnenblume"].map((k, i) => `<div class="blume" style="left:${6 + i * 15.5}%;transition-delay:${i * .25}s">${BILD(k)}</div>`).join("")}
      <div class="ebene"></div>`;
    const ebene = sz.querySelector(".ebene"), ei = sz.querySelector(".ei"), loecher = [...sz.querySelectorAll(".loch")], puppe = sz.querySelector(".puppe-g"), riss = sz.querySelector(".riss"), blumen = [...sz.querySelectorAll(".blume")];
    const raupe = wesen(ebene, "raupe"), falter = wesen(ebene, "schmetterling"), biene = wesen(ebene, "biene");
    let rx = .56, t = 0, fx = .75, fy = .34, ft = 0, fertig = false;
    // Umrechnung SVG (1600×900, meet) → Szene
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
    const FARBEN = ["#e74c3c", "#f1c40f", "#3498db", "#e67e22", "#9b59b6", "#ecf0f1"];
    const schmuck = mischen(PLAETZE).map(([x, y], i) => i % 6 === 5
      ? `<g class="schmuck"><rect x="${x - 6}" y="${y - 22}" width="12" height="26" rx="3" fill="#fff6e0"/><path d="M${x} ${y - 36} q8 8 0 14 q-8 -6 0 -14Z" fill="#ffb93b"/></g>`
      : i % 6 === 4 ? `<g class="schmuck"><path d="M${x - 16} ${y - 10} L${x} ${y} L${x - 16} ${y + 10}Z M${x + 16} ${y - 10} L${x} ${y} L${x + 16} ${y + 10}Z" fill="#d63a4a"/><circle cx="${x}" cy="${y}" r="5" fill="#b02a38"/></g>`
      : `<g class="schmuck"><circle cx="${x}" cy="${y}" r="17" fill="${FARBEN[i % FARBEN.length]}"/><circle cx="${x - 6}" cy="${y - 6}" r="5" fill="#fff" opacity=".55"/><rect x="${x - 4}" y="${y - 22}" width="8" height="6" fill="#c9a24a"/></g>`).join("");
    sz.innerHTML = `
      <svg class="voll mitte" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <defs><clipPath id="l2Fenster"><rect x="1160" y="140" width="300" height="360" rx="16"/></clipPath></defs>
        <rect x="1150" y="130" width="320" height="380" rx="20" fill="#7a5030"/><rect x="1160" y="140" width="300" height="360" rx="16" fill="#1b2a52"/>
        <g clip-path="url(#l2Fenster)">${Array.from({ length: 18 }, (_, i) => `<circle class="fenster-flocke" cx="${1170 + (i * 37) % 290}" cy="140" r="${3 + i % 3}" fill="#fff" style="animation-duration:${6 + i % 5}s;animation-delay:${-i * .6}s;--dx:10px"/>`).join("")}<path d="M1160 470 Q1310 440 1460 470 V500 H1160Z" fill="#eef3ff"/></g>
        <rect x="1300" y="140" width="10" height="360" fill="#7a5030"/><rect x="1160" y="315" width="300" height="10" fill="#7a5030"/>
        <rect x="0" y="790" width="1600" height="110" fill="#6b4630"/><rect x="0" y="790" width="1600" height="10" fill="#80573c"/>
        <rect x="770" y="740" width="60" height="70" fill="#6b4a32"/>
        <path d="M800 180 L880 330 L840 330 L930 470 L880 470 L980 630 L920 630 L1010 770 L590 770 L680 630 L620 630 L720 470 L670 470 L760 330 L720 330 Z" fill="#2f7d4f"/>
        <path d="M800 180 L880 330 L840 330 L930 470 L880 470 L980 630 L920 630 L1010 770 L800 770Z" fill="#276b43"/>
        ${[[700, 370, 900, 420], [660, 520, 950, 590], [630, 680, 980, 720]].map(([a, b, c, d]) => `<path d="M${a} ${b} Q800 ${(b + d) / 2 + 40} ${c} ${d}" stroke="#f6d878" stroke-width="3" fill="none" opacity=".7"/>`).join("")}
        ${Array.from({ length: 22 }, (_, i) => { const r = Math.floor(i / 7), x = [720, 680, 650][r] + (i % 7) * [26, 42, 52][r], y = [395, 555, 700][r] + Math.sin(i) * 12; return `<circle class="licht" cx="${x}" cy="${y}" r="6" fill="${["#ffe066", "#ff8a80", "#80d8ff"][i % 3]}" style="animation-delay:${-i * .27}s"/>`; }).join("")}
        ${schmuck}
        <g class="spitze"><path d="M800 120 L815 160 L858 162 L824 188 L836 230 L800 205 L764 230 L776 188 L742 162 L785 160Z" fill="#ffd84d" stroke="#e0a800" stroke-width="3"/></g>
        <g class="geschenke" opacity="0" style="transition:opacity 1.5s">
          <rect x="600" y="730" width="110" height="80" rx="6" fill="#e2725b"/><rect x="648" y="730" width="14" height="80" fill="#f6c453"/>
          <rect x="880" y="745" width="90" height="65" rx="6" fill="#4a90d9"/><rect x="918" y="745" width="14" height="65" fill="#fff"/>
          <rect x="980" y="760" width="70" height="50" rx="6" fill="#9b59b6"/><rect x="1008" y="760" width="12" height="50" fill="#f6c453"/>
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
      ${[[8, 160, 220], [22, 120, 160], [36, 200, 260], [55, 140, 120]].map(([y, t, w], i) => `<svg class="wolke" style="top:${y}%;width:${w}px;animation-duration:${t}s;animation-delay:${-i * 40}s" viewBox="0 0 200 90"><path d="M30 80 Q0 80 8 58 Q10 36 40 40 Q48 10 85 16 Q110 0 132 24 Q170 18 172 50 Q200 56 188 80Z" fill="#fff"/></svg>`).join("")}
      <svg class="land" viewBox="0 0 1600 500" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 200 Q300 120 600 180 T1200 160 T1600 170 V500 H0Z" fill="#9ccf86"/>
        <path d="M0 290 Q400 220 800 270 T1600 260 V500 H0Z" fill="#7dbb64"/>
        <path d="M0 380 Q500 330 1000 370 T1600 360 V500 H0Z" fill="#5fa24c"/>
        <g fill="#3f7d3a">${[100, 260, 1180, 1400].map(x => `<circle cx="${x}" cy="280" r="34"/><rect x="${x - 6}" y="300" width="12" height="30" fill="#6b4a32"/>`).join("")}</g>
        <g><rect x="700" y="300" width="120" height="80" fill="#f3e3c3"/><path d="M690 305 L760 250 L830 305Z" fill="#c0392b"/><rect x="745" y="335" width="28" height="45" fill="#7a5030"/></g>
      </svg>
      <svg class="ziel-wolke" viewBox="0 0 600 220" aria-hidden="true"><path d="M70 200 Q0 200 16 150 Q20 100 90 108 Q110 40 200 54 Q260 0 330 50 Q420 30 440 100 Q540 90 550 150 Q600 170 560 200Z" fill="#fff"/><path d="M120 150 Q300 120 480 150" stroke="#f5e6ff" stroke-width="10" fill="none" opacity=".7"/></svg>
      <svg class="ballon" viewBox="0 0 200 290" aria-hidden="true">
        <path d="M100 6 C40 6 8 50 8 98 C8 150 60 186 76 206 L124 206 C140 186 192 150 192 98 C192 50 160 6 100 6Z" fill="#e74c3c"/>
        <path d="M100 6 C80 6 60 50 60 98 C60 150 84 186 88 206 L112 206 C116 186 140 150 140 98 C140 50 120 6 100 6Z" fill="#f6c453"/>
        <path d="M100 6 C94 6 88 50 88 98 C88 150 96 186 98 206 L102 206 C104 186 112 150 112 98 C112 50 106 6 100 6Z" fill="#3498db"/>
        <path d="M12 96 Q100 120 188 96" stroke="#fff" stroke-width="6" fill="none" opacity=".5"/>
        <path class="flamme" d="M100 214 C90 226 94 238 100 242 C106 238 110 226 100 214Z" fill="#ffb03b"/>
        <path d="M80 206 L84 250 M120 206 L116 250" stroke="#6b4a32" stroke-width="3"/>
        <rect x="76" y="246" width="48" height="36" rx="6" fill="#a8763a"/><path d="M76 258 H124 M76 270 H124" stroke="#8a5f2a" stroke-width="3"/>
      </svg>`;
    const land = sz.querySelector(".land"), ballon = sz.querySelector(".ballon");
    let fertig = false, landeH = 0;
    return {
      schritt(p, laut){
        sz.classList.toggle("laut", laut);
        const h = fertig ? landeH : p;
        land.style.transform = `translateY(${(h * 70).toFixed(1)}%)`;
        ballon.style.top = `calc(${(62 - h * 50).toFixed(1)}% - 10vh)`;
        sz.style.background = `linear-gradient(hsl(207 ${70 - h * 10}% ${62 - h * 18}%) 0%, hsl(205 80% ${80 - h * 12}%) 60%, hsl(200 100% ${92 - h * 8}%) 100%)`;
      },
      fertig(anteil, p){ fertig = true; landeH = p >= .85 ? 1.05 : p; if (p >= .85) sz.classList.add("fertig"); return p >= .85 ? ["Gelandet auf der großen Wolke!", ""] : ["Der Ballon landet sanft.", "Nächstes Mal schafft ihr es bis auf die Wolke!"]; }
    };
  } };

WELTEN.burg = { titel: "Burg bauen", emoji: "🏰", art: "arbeit",
  text: "Solange es leise ist, kommt Stein für Stein dazu. Ganz am Ende wird die Fahne gehisst.",
  aufbauen(sz){
    const steine = [];
    const reihe = (x0, y, anzahl, w, h, versatz) => { for (let i = 0; i < anzahl; i++) steine.push([x0 + i * w + (versatz ? w / 2 : 0), y, w - 4, h - 4]); };
    // Mauer (unten nach oben), Türme links/rechts, Zinnen
    for (let r = 0; r < 6; r++){ reihe(520, 760 - r * 50, r % 2 ? 9 : 10, 56, 50, r % 2); }
    for (let r = 0; r < 10; r++){ reihe(380, 760 - r * 50, 3, 50, 50, false); reihe(1070, 760 - r * 50, 3, 50, 50, false); }
    const zinnen = []; [[520, 460, 10, 56], [380, 260, 3, 50], [1070, 260, 3, 50]].forEach(([x, y, n, w]) => { for (let i = 0; i < n; i += 2 / (n > 3 ? 1 : 1)) zinnen.push([x + i * w, y, w - 6, 40]); });
    const alle = [...steine.sort((a, b) => b[1] - a[1] || a[0] - b[0]), ...zinnen];
    sz.innerHTML = `
      <svg class="voll mitte" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <circle cx="1440" cy="110" r="54" fill="#ffd95a"/>
        <path d="M0 820 Q400 780 800 805 T1600 800 V900 H0Z" fill="#5fa24c"/>
        <g class="fahne"><rect x="452" y="140" width="6" height="130" fill="#6b4a32"/><path class="fahne-tuch" d="M458 144 L540 160 L458 182Z" fill="#e74c3c"/><rect x="1142" y="140" width="6" height="130" fill="#6b4a32"/><path class="fahne-tuch" d="M1148 144 L1230 160 L1148 182Z" fill="#3498db"/><rect x="797" y="300" width="6" height="170" fill="#6b4a32"/><path class="fahne-tuch" d="M803 304 L900 324 L803 350Z" fill="#f6c453"/></g>
        ${alle.map(([x, y, w, h], i) => `<rect class="stein" x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${["#b9aa95", "#a8988a", "#c6b8a3"][i % 3]}" stroke="#8c7c69" stroke-width="2"/>`).join("")}
        <path d="M760 810 L760 700 Q800 650 840 700 L840 810Z" fill="#5a3d28" class="tor" opacity="0" style="transition:opacity 1s"/>
      </svg>`;
    const st = [...sz.querySelectorAll(".stein")], tor = sz.querySelector(".tor");
    return {
      schritt(p){
        const n = Math.floor(p * st.length + .001);
        st.forEach((s, i) => { if (i < n && !s.classList.contains("da")){ s.classList.add("da"); if (i % 4 === 0 && this.klang) this.klang(300 + (i % 7) * 30, .06, "triangle"); } });
        tor.setAttribute("opacity", p >= .35 ? 1 : 0);
      },
      fertig(){ sz.classList.add("fertig"); }
    };
  } };

WELTEN.geheim = { titel: "Geheimbild", emoji: "🧩", art: "arbeit",
  text: "Solange es leise ist, deckt sich Kachel für Kachel ein Bild auf. Was ist es? Die Kinder dürfen leise raten – erst am Ende wird alles gezeigt.",
  aufbauen(sz){
    const MOTIVE = [["dino", "ein Dino"], ["rakete", "eine Rakete"], ["einhorn", "ein Einhorn"], ["eisbaer", "ein Eisbär"], ["elefant", "ein Elefant"], ["giraffe", "eine Giraffe"], ["ufo", "ein Ufo"], ["pinguin", "ein Pinguin"], ["schildkroete", "eine Schildkröte"], ["feuerwehr", "ein Feuerwehrauto"], ["krake", "ein Krake"], ["papagei", "ein Papagei"], ["schneemann", "ein Schneemann"], ["pizza", "eine Pizza"], ["vulkan", "ein Vulkan"], ["eule", "eine Eule"], ["igel", "ein Igel"], ["koala", "ein Koala"], ["hubschrauber", "ein Hubschrauber"], ["regenbogen", "ein Regenbogen"]].filter(([k]) => BILD(k));
    let letzt = ""; try { letzt = localStorage.getItem("lt-geheimbild") || ""; } catch (x) {}
    const wahl = mischen(MOTIVE.filter(([k]) => k !== letzt))[0] || MOTIVE[0] || ["", "ein Bild"];
    try { localStorage.setItem("lt-geheimbild", wahl[0]); } catch (x) {}
    const FARB = ["#e2725b", "#f2a93b", "#f6c453", "#5fae4a", "#3d7ea6", "#8e6cc8", "#e07a9a", "#2f9e8f"];
    sz.innerHTML = `<div class="rahmen"><div class="motiv">${BILD(wahl[0])}</div><div class="kacheln">${Array.from({ length: 36 }, (_, i) => `<div class="kachel" style="background:${FARB[(i * 5 + Math.floor(i / 6)) % FARB.length]}">?</div>`).join("")}</div></div>`;
    const k = mischen([...sz.querySelectorAll(".kachel")]);
    return {
      schritt(p){
        // Die letzten Kacheln bleiben bis zum Schluss zu, damit es spannend bleibt
        const n = Math.floor(p * (k.length - 8) + .001);
        k.forEach((x, i) => { if (i < n && !x.classList.contains("weg")){ x.classList.add("weg"); this.klang && this.klang(660 + (i % 6) * 40, .08); } });
      },
      fertig(){ k.forEach((x, i) => setTimeout(() => x.classList.add("weg"), i * 60)); return ["Es ist " + wahl[1] + "!", null]; }
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
