/* ============================================================
   Leuchtturm – Sozialtraining: Einstiegs-Präsentation
   Baut aus jeder Stunde automatisch eine interaktive Präsentation
   für die digitale Tafel (Vollbild, Tippen/Klicken, Tastatur,
   Presenter): Titel, Gefühls-Abstimmung, Geschichte mit Bildern
   und Vorlesestimme, Fragen, Film, Übungen mit Timer,
   Daumen-/Gefühls-Abstimmungen, Arbeitsphase, Abschluss.
   Werkzeuge: Glücksrad „Wer ist dran?“, Timer, Klangschale.
   Dazu der Export als PowerPoint (pptxgen.bundle.js, MIT).
   Benötigt Funktionen aus sozial-stunden.php (inline, md, esc,
   gesichtSvg, gefuehlArt, ltBild, bildSuchen).
   ============================================================ */
"use strict";

(function () {

/* ---------------- Gestaltung ---------------- */
const CSS = `
#praes{ position:fixed; inset:0; z-index:100; background:#fdfaf3; color:#1f2d36; font-family:"Nunito",sans-serif; display:flex; flex-direction:column; overflow:hidden; user-select:none; }
#praes *{ box-sizing:border-box; }
#praes .p-buehne{ flex:1; position:relative; overflow:hidden; }
#praes .p-folie{ position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:safe center; overflow-y:auto; padding:3vh 6vw 2vh; text-align:center; animation:pRein .45s cubic-bezier(.2,.8,.2,1); }
#praes .p-folie.zurueck{ animation:pReinL .45s cubic-bezier(.2,.8,.2,1); }
@keyframes pRein{ from{ opacity:0; transform:translateX(6vw) scale(.98); } to{ opacity:1; transform:none; } }
@keyframes pReinL{ from{ opacity:0; transform:translateX(-6vw) scale(.98); } to{ opacity:1; transform:none; } }
#praes h1{ font-size:clamp(34px,7vw,110px); font-weight:900; margin:.1em 0; line-height:1.05; color:#16324a; }
#praes h2{ font-size:clamp(26px,4.4vw,64px); font-weight:900; margin:0 0 .4em; color:#16324a; line-height:1.1; }
#praes .p-klein{ font-size:clamp(16px,1.8vw,26px); font-weight:800; color:#7c8a85; letter-spacing:.03em; }
#praes .p-chip{ display:inline-block; padding:.35em 1em; border-radius:99px; background:#e7f1fb; color:#3d7ea6; font-weight:900; font-size:clamp(14px,1.6vw,24px); margin:.2em; }
#praes .p-chip.gold{ background:#f9eeda; color:#8a5a12; }
#praes .p-chip.gruen{ background:#e5f4e4; color:#2e8b57; }
#praes .p-text{ font-family:"Andika","Nunito",sans-serif; font-size:clamp(22px,3.3vw,50px); line-height:1.4; max-width:30em; }
#praes .p-text p{ margin:0 0 .5em; }
#praes .p-text ul, #praes .p-text ol{ text-align:left; display:inline-block; margin:0; }
#praes .p-text li{ margin:.25em 0; }
#praes .p-bilder{ display:flex; gap:3vw; justify-content:center; margin:1vh 0 3vh; }
#praes .p-bilder .bild{ width:clamp(70px,12vh,170px); height:clamp(70px,12vh,170px); animation:pHuepf 2.4s ease-in-out infinite; }
#praes .p-bilder .bild:nth-child(2){ animation-delay:.4s; } #praes .p-bilder .bild:nth-child(3){ animation-delay:.8s; }
@keyframes pHuepf{ 0%,100%{ transform:translateY(0) rotate(-3deg); } 50%{ transform:translateY(-10px) rotate(3deg); } }
#praes .p-knopf{ border:0; border-radius:18px; padding:.55em 1.1em; font:inherit; font-weight:900; font-size:clamp(16px,1.9vw,28px); cursor:pointer; background:#16324a; color:white; box-shadow:0 6px 18px rgba(22,50,74,.2); transition:transform .12s; }
#praes .p-knopf:active{ transform:scale(.95); }
#praes .p-knopf.gold{ background:#f2a93b; color:#16324a; }
#praes .p-knopf.hell{ background:white; color:#16324a; }
#praes .p-reihe{ display:flex; gap:1.4vw; justify-content:center; flex-wrap:wrap; margin-top:3vh; }

/* Titel mit Leuchtturm-Strahl */
#praes .p-titel{ background:radial-gradient(circle at 50% 120%, #3d7ea6 0%, #16324a 60%); color:white; }
#praes .p-titel h1{ color:white; text-shadow:0 6px 30px rgba(0,0,0,.35); }
#praes .p-titel .p-klein{ color:#f2c97b; }
#praes .p-strahl-box{ position:absolute; inset:0; overflow:hidden; pointer-events:none; }
#praes .p-strahl{ position:absolute; left:50%; top:105%; width:240vmax; height:240vmax; margin:-120vmax 0 0 -120vmax; background:conic-gradient(from 0deg, transparent 0 40deg, rgba(242,169,59,.22) 50deg, transparent 62deg, transparent 220deg, rgba(242,169,59,.16) 230deg, transparent 242deg); animation:pDreh 12s linear infinite; pointer-events:none; }
@keyframes pDreh{ to{ transform:rotate(360deg); } }
#praes .p-titel .p-bilder .bild{ width:clamp(90px,17vh,220px); height:clamp(90px,17vh,220px); }
#praes .p-wahl{ margin-top:3vh; display:flex; gap:1vw; justify-content:center; flex-wrap:wrap; }
#praes .p-wahl .p-knopf{ background:rgba(255,255,255,.14); color:white; box-shadow:none; border:2px solid rgba(255,255,255,.35); font-size:clamp(14px,1.5vw,22px); }
#praes .p-wahl .p-knopf.an{ background:#f2a93b; color:#16324a; border-color:#f2a93b; }

/* Abstimmung (Gesichter, Daumen, Ampel) */
#praes .p-stimmen{ display:flex; gap:2.2vw; justify-content:center; align-items:flex-end; margin-top:2vh; flex-wrap:wrap; }
#praes .p-stimme{ display:flex; flex-direction:column; align-items:center; gap:.6vh; cursor:pointer; -webkit-tap-highlight-color:transparent; }
#praes .p-saeule{ width:clamp(46px,7vw,110px); background:#e7f1fb; border-radius:14px 14px 4px 4px; display:flex; align-items:flex-end; justify-content:center; height:22vh; overflow:hidden; position:relative; }
#praes .p-saeule .p-fuell{ width:100%; background:linear-gradient(#f2c97b,#f2a93b); border-radius:12px 12px 0 0; transition:height .35s cubic-bezier(.2,1.4,.4,1); }
#praes .p-saeule .p-zahl{ position:absolute; top:.3em; font-weight:900; font-size:clamp(18px,2.4vw,40px); color:#16324a; }
#praes .p-symbol{ width:clamp(70px,10vw,150px); height:clamp(70px,10vw,150px); border-radius:50%; background:white; box-shadow:0 6px 20px rgba(22,50,74,.15); display:flex; align-items:center; justify-content:center; transition:transform .15s; font-size:clamp(40px,6vw,90px); }
#praes .p-symbol svg{ width:84%; height:84%; }
#praes .p-stimme:active .p-symbol, #praes .p-symbol.pop{ transform:scale(1.15); }
#praes .p-stimme .p-name{ font-weight:900; font-size:clamp(15px,1.7vw,26px); }
#praes .p-stimme.richtig .p-symbol{ box-shadow:0 0 0 6px #2e8b57, 0 6px 20px rgba(46,139,87,.4); transform:scale(1.12); }
#praes .p-stimme.richtig .p-name::after{ content:" ✓"; color:#2e8b57; }
#praes .p-stimme.falsch{ opacity:.3; }
#praes .p-minus{ border:0; background:none; color:#a0aaa6; font-size:clamp(14px,1.4vw,20px); font-weight:900; cursor:pointer; padding:.2em .6em; }
#praes .p-aussage{ font-family:"Andika","Nunito",sans-serif; font-size:clamp(26px,4.2vw,66px); font-weight:700; line-height:1.25; max-width:24em; background:white; border-radius:28px; padding:.6em 1em; box-shadow:0 8px 30px rgba(22,50,74,.12); }

/* Fragen */
#praes .p-fragen{ text-align:left; width:min(100%,1150px); }
#praes .p-frage{ font-family:"Andika","Nunito",sans-serif; font-size:clamp(18px,min(2.4vw,4vh),38px); padding:.4em .8em; margin:.3em 0; border-radius:18px; background:white; box-shadow:0 4px 14px rgba(22,50,74,.08); opacity:.35; transition:.3s; cursor:pointer; display:flex; gap:.6em; }
#praes .p-frage.an{ opacity:1; transform:scale(1.02); box-shadow:0 8px 26px rgba(242,169,59,.35); }
#praes .p-frage.aufgabe{ background:#fff7e6; }
#praes .p-frage.aufgabe:not(.an):not(.war){ visibility:hidden; }
#praes .p-chip.zusatz{ background:#eef1f3; color:#6b7880; }
#praes .p-liste{ display:flex; flex-wrap:wrap; gap:.5em .7em; justify-content:center; margin-top:2vh; max-width:min(1300px,94vw); }
#praes .p-liste div{ background:white; border-radius:16px; padding:.35em .8em; box-shadow:0 4px 14px rgba(22,50,74,.1); font-family:"Andika","Nunito",sans-serif; font-size:clamp(17px,min(2.2vw,3.6vh),34px); }
#praes .p-frage .nr{ font-family:"Nunito",sans-serif; font-weight:900; color:#f2a93b; }

/* Film */
#praes .p-filme{ display:grid; grid-template-columns:repeat(auto-fit,minmax(min(420px,80vw),1fr)); gap:2vw; width:100%; max-width:1400px; }
#praes .p-film{ background:white; border-radius:24px; padding:1.2em 1.4em; box-shadow:0 6px 22px rgba(22,50,74,.12); text-align:left; display:flex; gap:1em; align-items:center; text-decoration:none; color:inherit; }
#praes .p-film .play{ flex:0 0 auto; width:clamp(56px,6vw,90px); height:clamp(56px,6vw,90px); border-radius:50%; background:#e74c3c; display:flex; align-items:center; justify-content:center; color:white; font-size:clamp(24px,3vw,44px); }
#praes .p-film strong{ display:block; font-size:clamp(18px,2vw,30px); }
#praes .p-film span{ color:#7c8a85; font-weight:700; font-size:clamp(14px,1.4vw,20px); }

/* Abschluss: Applauswelle */
#praes .p-welle{ display:flex; gap:1.2vw; justify-content:center; margin:3vh 0; flex-wrap:wrap; }
#praes .p-hand{ font-size:clamp(36px,6vw,90px); opacity:.25; transition:transform .15s, opacity .15s; }
#praes .p-hand.an{ opacity:1; transform:translateY(-18px) scale(1.25); }

/* Leiste */
#praes .p-leiste{ display:flex; align-items:center; gap:8px; padding:8px 14px; background:white; box-shadow:0 -4px 18px rgba(22,50,74,.08); flex-wrap:wrap; }
#praes .p-leiste button{ border:0; background:#f1f4f2; border-radius:12px; padding:10px 14px; font:inherit; font-weight:900; font-size:16px; cursor:pointer; color:#16324a; min-width:46px; }
#praes .p-leiste button:hover{ background:#e7f1fb; }
#praes .p-leiste .p-pos{ font-weight:900; color:#7c8a85; min-width:70px; text-align:center; }
#praes .p-leiste .p-platz{ flex:1; }
#praes .p-punkte{ display:flex; gap:4px; flex:1; justify-content:center; flex-wrap:wrap; }
#praes .p-punkte i{ width:9px; height:9px; border-radius:50%; background:#dfe5e2; display:block; cursor:pointer; }
#praes .p-punkte i.an{ background:#f2a93b; transform:scale(1.4); }
@media (max-width:700px){
    #praes .p-punkte{ display:none; }
    #praes .p-leiste .p-wort{ display:none; }
    #praes .p-stimmen{ gap:10px 12px; flex-wrap:nowrap; }
    #praes .p-saeule{ width:44px; height:18vh; }
    #praes .p-symbol{ width:62px; height:62px; font-size:36px; }
    #praes .p-stimme .p-name{ font-size:13px; max-width:78px; text-align:center; line-height:1.15; }
    #praes .p-leiste .p-pos{ flex:1; }
    #praes .p-leiste{ gap:6px; padding:6px 8px; }
    #praes .p-leiste button{ padding:9px 10px; font-size:15px; min-width:40px; }
    #praes .p-leiste .p-pos{ min-width:52px; }
}

/* Timer */
#praes .p-timer{ position:absolute; top:2vh; right:2vw; background:#16324a; color:white; border-radius:22px; padding:.3em .7em; font-weight:900; font-size:clamp(28px,4vw,64px); font-variant-numeric:tabular-nums; display:flex; align-items:center; gap:.4em; z-index:5; box-shadow:0 8px 24px rgba(22,50,74,.3); }
#praes .p-timer button{ border:0; background:rgba(255,255,255,.15); color:white; border-radius:10px; font:inherit; font-size:.45em; padding:.3em .55em; cursor:pointer; }
#praes .p-timer.ende{ animation:pBlink .6s ease-in-out 6; background:#e74c3c; }
@keyframes pBlink{ 50%{ transform:scale(1.12); } }
#praes .p-timer .ring{ width:.8em; height:.8em; }

/* Overlays (Glücksrad, Timer wählen) */
#praes .p-dran{ position:absolute; top:12px; right:12px; z-index:9; min-width:clamp(48px,5.5vw,80px); height:clamp(48px,5.5vw,80px); border-radius:999px; border:4px solid white; box-shadow:0 6px 18px rgba(22,50,74,.25); color:white; font:900 clamp(24px,3vw,44px)/1 "Nunito",sans-serif; display:flex; align-items:center; justify-content:center; padding:0 .3em; cursor:pointer; }
#praes .p-dran.lang{ font-size:clamp(16px,1.8vw,26px); padding:0 .7em; }
#praes .p-dran.neu{ animation:pDran .5s cubic-bezier(.2,1.6,.4,1); }
@keyframes pDran{ from{ transform:scale(.3); } to{ transform:scale(1); } }
#praes .p-vorleser[hidden]{ display:none !important; }
#praes .p-s1{ color:#1D5FA8; }
#praes .p-s2{ color:#C0392B; }
#praes .p-silbenknopf{ opacity:.55; }
#praes .p-silbenknopf.an{ opacity:1; background:#fff4dc !important; box-shadow:inset 0 0 0 2px #f2a93b; }
#praes .p-overlay{ position:absolute; inset:0; background:rgba(22,50,74,.55); display:flex; align-items:center; justify-content:center; z-index:10; animation:pFade .2s; }
@keyframes pFade{ from{ opacity:0; } }
#praes .p-dialog{ background:white; border-radius:30px; padding:3vh 3vw; text-align:center; box-shadow:0 20px 60px rgba(0,0,0,.3); max-width:92vw; max-height:calc(100% - 16px); overflow-y:auto; box-sizing:border-box; }
#praes .p-dialog.mit-namen .p-rad-wrap{ width:min(32vh,60vw); height:min(32vh,60vw); }
#praes .p-dialog h2{ font-size:clamp(24px,3vw,44px); }
#praes .p-rad-wrap{ position:relative; width:min(50vh,78vw); height:min(50vh,78vw); margin:0 auto 1vh; }
#praes .p-rad-wrap canvas{ width:100%; height:100%; }
#praes .p-zeiger{ position:absolute; top:-10px; left:50%; margin-left:-22px; width:0; height:0; border-left:22px solid transparent; border-right:22px solid transparent; border-top:44px solid #16324a; filter:drop-shadow(0 3px 4px rgba(0,0,0,.3)); }
#praes .p-ergebnis{ font-size:clamp(36px,6vh,90px); font-weight:900; color:#f2a93b; min-height:1.2em; }
#praes .p-vorleser{ display:inline-flex; align-items:center; gap:.4em; background:#fff4dc; color:#16324a; border-radius:18px; padding:.45em 1em; font-weight:900; font-size:clamp(16px,1.9vw,28px); box-shadow:0 4px 14px rgba(22,50,74,.1); }
#praes .p-rad-optionen{ display:flex; gap:1.2em; justify-content:center; align-items:center; flex-wrap:wrap; font-weight:800; margin-top:.4em; }
#praes .p-rad-optionen label{ display:inline-flex; gap:.4em; align-items:center; cursor:pointer; }
#praes .p-rad-optionen input[type=checkbox]{ width:1.2em; height:1.2em; }
#praes .p-namen{ width:min(560px,80vw); min-height:4em; height:4.5em; font:inherit; font-size:18px; border:2px solid #dfe5e2; border-radius:12px; padding:.4em .6em; margin-top:.5em; }
#praes .p-dialog input{ font:inherit; font-size:22px; width:4.5em; text-align:center; border:2px solid #dfe5e2; border-radius:12px; padding:.2em; }
#praes .p-ruhe{ position:absolute; inset:0; z-index:30; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2.2vh; text-align:center; color:white; cursor:pointer;
    background:radial-gradient(circle at 50% 40%, #2b5f86 0%, #16324a 70%); animation:pRuheAtem 6s ease-in-out infinite, pFade .25s; padding:3vh 4vw; }
#praes .p-ruhe-icon{ font-size:clamp(90px,17vh,220px); line-height:1; animation:pRuhePuls 2s ease-in-out infinite; }
#praes .p-ruhe h2{ color:white; font-size:clamp(40px,8vh,110px); margin:0; letter-spacing:.02em; }
#praes .p-ruhe-regeln{ display:flex; gap:2vw; flex-wrap:wrap; justify-content:center; }
#praes .p-ruhe-regeln div{ background:rgba(255,255,255,.12); border:2px solid rgba(255,255,255,.25); border-radius:22px; padding:1.4vh 2vw; font:800 clamp(18px,3.2vh,38px)/1.2 "Nunito",sans-serif; display:flex; flex-direction:column; align-items:center; gap:.4em; min-width:9em; }
#praes .p-ruhe-regeln div span{ font-size:1.8em; line-height:1; }
#praes .p-ruhe-zeit{ font:800 clamp(16px,2.6vh,30px)/1.3 "Nunito",sans-serif; opacity:.85; }
#praes .p-ruhe-zeit b{ font-variant-numeric:tabular-nums; color:#f2a93b; }
#praes .p-ruhe .p-knopf{ margin-top:1vh; }
@keyframes pRuhePuls{ 0%,100%{ transform:scale(1); } 50%{ transform:scale(1.08); } }
@keyframes pRuheAtem{ 0%,100%{ filter:brightness(1); } 50%{ filter:brightness(1.18); } }
#praes .p-konfetti{ position:absolute; inset:0; pointer-events:none; z-index:20; }
`;

/* ---------------- Klänge (ohne Dateien, mit Web Audio) ---------------- */
let ton = null;
function audio(){ if (!ton) { try { ton = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } } if (ton.state === "suspended") ton.resume(); return ton; }
function klangschale(lautstaerke = .5){
    const a = audio(); if (!a) return;
    const t = a.currentTime;
    [[262, 1], [524, .5], [787, .3], [1310, .15], [1832, .08]].forEach(([f, v]) => {
        const o = a.createOscillator(), g = a.createGain();
        o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v * lautstaerke, t + .01);
        g.gain.exponentialRampToValueAtTime(.0001, t + 5.5);
        o.connect(g).connect(a.destination); o.start(t); o.stop(t + 5.6);
    });
}
// Ruhe-Gong: drei sanfte, absteigende Töne, dann die Klangschale
function ruheGong(){
    const a = audio(); if (!a) return;
    [[784, 0], [659, .45], [523, .9]].forEach(([f, d]) => {
        const t = a.currentTime + d;
        [[f, .32], [f * 2, .08], [f * 3, .03]].forEach(([fr, v]) => {
            const o = a.createOscillator(), g = a.createGain();
            o.type = "sine"; o.frequency.value = fr;
            g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .015); g.gain.exponentialRampToValueAtTime(.0001, t + 2.2);
            o.connect(g).connect(a.destination); o.start(t); o.stop(t + 2.3);
        });
    });
    setTimeout(() => klangschale(.35), 1600);
}
function tick(){ const a = audio(); if (!a) return; const o = a.createOscillator(), g = a.createGain(), t = a.currentTime; o.frequency.value = 1200; o.type = "square"; g.gain.setValueAtTime(.06, t); g.gain.exponentialRampToValueAtTime(.0001, t + .04); o.connect(g).connect(a.destination); o.start(t); o.stop(t + .05); }
function plopp(hoch = 1){ const a = audio(); if (!a) return; const o = a.createOscillator(), g = a.createGain(), t = a.currentTime; o.type = "sine"; o.frequency.setValueAtTime(420 * hoch, t); o.frequency.exponentialRampToValueAtTime(900 * hoch, t + .08); g.gain.setValueAtTime(.25, t); g.gain.exponentialRampToValueAtTime(.0001, t + .15); o.connect(g).connect(a.destination); o.start(t); o.stop(t + .16); }
function klatsch(){
    const a = audio(); if (!a) return;
    const t = a.currentTime, n = a.sampleRate * .12, puffer = a.createBuffer(1, n, a.sampleRate), d = puffer.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 4);
    const q = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
    q.buffer = puffer; f.type = "bandpass"; f.frequency.value = 1400; f.Q.value = .8; g.gain.value = .9;
    q.connect(f).connect(g).connect(a.destination); q.start(t);
}
function fanfare(){ const a = audio(); if (!a) return; [523, 659, 784, 1047].forEach((f, i) => { const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + i * .12; o.type = "triangle"; o.frequency.value = f; g.gain.setValueAtTime(.18, t); g.gain.exponentialRampToValueAtTime(.0001, t + .35); o.connect(g).connect(a.destination); o.start(t); o.stop(t + .4); }); }

/* ---------------- Konfetti ---------------- */
function konfetti(buehne){
    const c = document.createElement("canvas"); c.className = "p-konfetti";
    buehne.appendChild(c);
    const w = c.width = buehne.clientWidth, h = c.height = buehne.clientHeight, x = c.getContext("2d");
    const farben = ["#f2a93b", "#3d7ea6", "#e74c3c", "#2e8b57", "#c0399b", "#f9d56e"];
    const teile = Array.from({ length: 160 }, () => ({ x: w / 2 + (Math.random() - .5) * w * .3, y: h * .45, vx: (Math.random() - .5) * 18, vy: -Math.random() * 18 - 6, r: Math.random() * 6.3, s: 6 + Math.random() * 8, f: farben[Math.floor(Math.random() * farben.length)] }));
    let n = 0;
    (function bild(){
        x.clearRect(0, 0, w, h);
        teile.forEach(p => { p.vy += .45; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.r += .15; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.f; x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); });
        if (++n < 170) requestAnimationFrame(bild); else c.remove();
    })();
}

/* ---------------- Inhalte aufbereiten ---------------- */
function ohneMarkdown(t){ return String(t || "").replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/^###\s+/gm, "").replace(/^\s*[-•]\s+/gm, "").trim(); }
const KAT_BILD = { "Gefühle": "regenbogen", "Konflikte lösen": "blitz", "Freundschaft": "geschenk", "Regeln & Miteinander": "glocke", "Selbstwert & Stärken": "pokal", "Kommunikation": "telefon", "Kooperation & Teamgeist": "puzzle", "Achtsamkeit & Ruhe": "kleeblatt", "Vielfalt & Respekt": "regenbogen" };
let bildRegex = null;
// Findet Bilder aus der Bildersammlung, deren Name im Text vorkommt (auch „Hasen“, „Bären“ …)
function bilderImText(text, max = 3){
    if (!window.LT_BILDER) return [];
    if (!bildRegex) {
        const namen = Object.values(window.LT_BILDER).map(v => v[0]).filter(n => n.length > 2 && !/\s/.test(n));
        namen.sort((a, b) => b.length - a.length);
        bildRegex = new RegExp("(^|[^A-Za-zÄÖÜäöüß])(" + namen.map(n => n.replace(/[-]/g, "\\-")).join("|") + ")(n|en|e|s|es)?(?![A-Za-zÄÖÜäöüß])", "g");
    }
    const treffer = [];
    // Alltagswörter, die in Geschichten oft nur nebenbei vorkommen, nicht bebildern
    const ohne = ["tuer", "stein", "ei", "uhr", "stuhl", "spiegel", "korb", "brief", "tasse", "loeffel", "schluessel", "eimer", "paket", "regen", "feuer", "berg"];
    let m;
    bildRegex.lastIndex = 0;
    while ((m = bildRegex.exec(text)) && treffer.length < max) {
        const k = bildSuchen(m[2]);
        if (k && !treffer.includes(k) && !ohne.includes(k)) treffer.push(k);
    }
    return treffer;
}
function absaetze(text){ return String(text || "").replace(/\r/g, "").split(/\n\s*\n/).map(s => s.trim()).filter(Boolean); }
// Zerlegt einen Lerntext in Erzählung und den Teil danach (Fragen / „Nach dem Vorlesen“)
function geschichteZerlegen(text){
    const teile = absaetze(text), erz = [], nach = [];
    let danach = false;
    for (const t of teile) {
        if (/^\*\*(Nach dem Vorlesen|Fragen|Tafelbild|Merksatz)/i.test(t)) danach = true;
        (danach ? nach : erz).push(t);
    }
    return { erz, nach };
}
function fragenAus(nach){
    const fragen = [];
    for (const t of nach) {
        if (/^\*\*(Tipp|Hinweis|Für dich)/i.test(t)) continue;   // nur für die Lehrkraft
        const zeilen = t.split("\n");
        const liste = zeilen.filter(z => /^\s*(\d+[.)]|[-•])\s+/.test(z)).map(z => z.replace(/^\s*(\d+[.)]|[-•])\s+/, ""));
        if (liste.length) fragen.push(...liste);
        else fragen.push(t.replace(/^\*\*[^*]+\*\*\s*/, ""));
    }
    // Nur die Frage zeigen – was danach kommt (z. B. „Alle üben gemeinsam: …“ = die Lösung) wird ein eigener Schritt,
    // der erst nach der Frage aufgedeckt wird. Zeilen ohne Frage (Tafelbild, Merksatz) ebenso.
    const aus = [];
    fragen.map(ohneMarkdown).map(t => t.replace(/\?\s*\([^)]*\)/g, "?")).filter(Boolean).forEach(t => {
        const m = /^([\s\S]*\?[“”"«»]?)\s+([^?]+)$/.exec(t);
        if (m && m[2].trim()) { aus.push({ text: m[1].trim(), art: "frage" }, { text: m[2].trim(), art: "aufgabe" }); }
        else aus.push({ text: t, art: /\?/.test(t) ? "frage" : "aufgabe" });
    });
    return aus;
}
function aufzaehlung(text){ return String(text || "").split("\n").filter(z => /^\s*[-•]\s+/.test(z)).map(z => z.replace(/^\s*[-•]\s+/, "").trim()); }
function quizArt(text){
    const t = String(text).toLowerCase();
    if (/lösungskarte/.test(t)) return "loesung";
    if (/stopp-hand/.test(t)) return "stopp";
    if (/daumen/.test(t)) return "daumen";
    if (/rote|grüne|rot \(|grün \(|karte/.test(t)) return "ampel";
    if (/gefühl|fühlt|barometer|wie wütend|angst/.test(t)) return "gefuehle";
    return "frage";
}
function minuten(text){ const m = String(text || "").match(/(\d+)\s*Min/i); return m ? +m[1] : 0; }
function medienFuer(e){
    if (Array.isArray(e.medien)) return e.medien.filter(m => m && m.url);
    const id = e.ersetzt || e.id;
    return ((window.SOZIAL_MEDIEN || {})[id] || []).filter(m => m && m.url);
}
window.sozialMedien = medienFuer;

function folienBauen(e, stufe){
    const f = [];
    f.push({ typ: "titel" });
    if (!(window.BEREICH && window.BEREICH.key === "vertretung")) f.push({ typ: "barometer" });
    const lt = stufe === "34" ? e.lerntext34 : e.lerntext12;
    const { erz, nach } = geschichteZerlegen(lt && lt.text);
    erz.forEach((a, i) => f.push({ typ: "geschichte", titel: lt.titel, text: a, nr: i + 1, von: erz.length }));
    const fragen = fragenAus(nach);
    if (fragen.length) f.push({ typ: "fragen", titel: lt.titel, fragen });
    const medien = medienFuer(e);
    if (medien.length) f.push({ typ: "film", medien });
    const ueListe = window.uebungenFuer ? window.uebungenFuer(e, stufe) : (e.uebungen || []);   // Kern zuerst, dann Zusatz
    ueListe.forEach(u0 => {
        // Klassen sind getrennt: nur Übungen dieser Stufe, Text passend zur Stufe
        if (u0.fuer && u0.fuer !== "alle" && u0.fuer !== stufe) return;
        const u = Object.assign({}, u0, { text: window.stufenText ? window.stufenText(u0, stufe) : u0.text, folie: u0["folie" + stufe] || u0.folie || "", warum: u0["warum" + stufe] || u0.warum || "", zusatz: !!(window.istZusatz && window.istZusatz(e, u0, stufe)) });
        // quiz: daumen/ampel/… = Abstimmung je Punkt · karten = je Punkt eine Folie ohne Abstimmung ·
        // liste = alle Punkte auf der Übungsfolie · keine = Punkte nur für die Lehrkraft
        const punkte = aufzaehlung(u.text).slice(0, 10).map(p => p.split(/\s+→\s+/)[0]);
        const art = u.quiz || quizArt(u.text);
        if (art === "liste" && punkte.length) u.liste = punkte;
        f.push({ typ: "ankuendigung", u });   // „Als Nächstes …“ – kurze Einführung vor jeder Übung
        f.push({ typ: "uebung", u });
        if (punkte.length >= 2 && art === "karten") punkte.forEach((p, i) => f.push({ typ: "karte", u, aussage: p, nr: i + 1, von: punkte.length }));
        else if (punkte.length >= 2 && !["frage", "keine", "liste", "karten"].includes(art)) {
            const loes = u0["loesungen" + stufe] || u0.loesungen || [];   // je Situation: richtige Antwort(en), z. B. "1" oder "2,3"
            punkte.forEach((p, i) => f.push({ typ: "abstimmung", u, art, aussage: p, nr: i + 1, von: punkte.length, loesung: loes[i] ? String(loes[i]).split(/[,\s]+/).map(Number).filter(Boolean) : [] }));
        }
    });
    f.push({ typ: "arbeitsblatt" });
    f.push({ typ: "abschluss" });
    // „Überspringen“ bei Zusatz-Übungen: zur nächsten Folie, die nicht mehr zu dieser Übung gehört
    f.forEach((x, i) => { if (x.typ === "uebung" && x.u.zusatz) { let j = i + 1; while (j < f.length && (f[j].typ === "karte" || f[j].typ === "abstimmung") && f[j].u === x.u) j++; x.weiter = j; } });
    f.forEach((x, i) => { if (x.typ === "ankuendigung" && f[i + 1] && f[i + 1].weiter) x.weiter = f[i + 1].weiter; });
    return f;
}

/* ---------------- Präsentation ---------------- */
let zustand = null;

function praesentationStarten(e, startStufe){
    if (!document.getElementById("praesCss")) { const st = document.createElement("style"); st.id = "praesCss"; st.textContent = CSS; document.head.appendChild(st); }
    praesentationBeenden();
    const wurzel = document.createElement("div");
    wurzel.id = "praes";
    wurzel.innerHTML = `<div class="p-buehne"></div>
        <div class="p-leiste">
            <button data-p="zu" title="Schließen (Esc)">✕</button>
            <button data-p="zurueck" title="Zurück (←)">◀</button>
            <span class="p-pos"></span>
            <button data-p="weiter" title="Weiter (→ oder Leertaste)">▶</button>
            <div class="p-punkte"></div>
            <button data-p="rad" title="Wer ist dran?">🎡<span class="p-wort"> Wer ist dran?</span></button>
            <button data-p="timer" title="Timer">⏱<span class="p-wort"> Timer</span></button>
            <button data-p="silben" class="p-silbenknopf" title="Silbenfarben an/aus – zum Selbstlesen an der Tafel"><span class="p-s1">Sil</span><span class="p-s2">ben</span></button>
            <button data-p="ruhe" title="Ruhe-Signal: zu laut? (Taste R)">🤫<span class="p-wort"> Ruhe!</span></button>
            <button data-p="schale" title="Klangschale">🔔</button>
            <button data-p="vollbild" title="Vollbild (F)">⛶</button>
        </div>`;
    document.body.appendChild(wurzel);
    let anzahl = 9;
    try { anzahl = Math.max(2, Math.min(30, parseInt(localStorage.getItem("sozial_anzahl"), 10) || 9)); } catch (err) {}
    zustand = { e, stufe: startStufe || "12", wurzel, buehne: wurzel.querySelector(".p-buehne"), i: 0, folien: [], stimmen: {}, anzahl, timer: null, gelesen: new Set(), vorleser: {} };
    try { zustand.silben = localStorage.getItem("sozial_silben_" + zustand.stufe) === "1"; } catch (err) { zustand.silben = false; }
    wurzel.querySelector(".p-silbenknopf").classList.toggle("an", zustand.silben);
    if (zustand.silben) silbenLaden().then(() => { if (zustand) silbenAnwenden(zustand.buehne); });
    zustand.folien = folienBauen(e, zustand.stufe);
    wurzel.addEventListener("click", leistenKlick);
    document.addEventListener("keydown", tasten);
    zeigen(0);
    if (wurzel.requestFullscreen) wurzel.requestFullscreen().catch(() => {});
}
/* Ruhe-Signal: großes Bild + Gong. Die Wartezeit läuft sichtbar mit – weiter geht's, wenn alle leise sind. */
function ruheSignal(){
    if (!zustand) return;
    const alt = zustand.wurzel.querySelector(".p-ruhe");
    if (alt) { ruheEnde(); return; }
    const o = document.createElement("div");
    o.className = "p-ruhe";
    o.innerHTML = `<div class="p-ruhe-icon">🤫</div><h2>Psst … Ruhe bitte!</h2>
        <div class="p-ruhe-regeln"><div><span>👀</span>Augen nach vorn</div><div><span>🤐</span>Mund zu</div><div><span>✋</span>Hände still</div></div>
        <div class="p-ruhe-zeit">Wir warten, bis alle leise sind … <b>0:00</b></div>
        <button class="p-knopf gold">✅ Alle sind leise – weiter</button>`;
    zustand.wurzel.appendChild(o);
    ruheGong();
    const start = Date.now(), zeit = o.querySelector(".p-ruhe-zeit b");
    zustand.ruhe = setInterval(() => { const sek = Math.floor((Date.now() - start) / 1000); zeit.textContent = Math.floor(sek / 60) + ":" + String(sek % 60).padStart(2, "0"); }, 250);
    o.addEventListener("click", ruheEnde);
}
function ruheEnde(){
    if (!zustand) return;
    clearInterval(zustand.ruhe); zustand.ruhe = null;
    const o = zustand.wurzel.querySelector(".p-ruhe"); if (o) o.remove();
}
function praesentationBeenden(){
    if (!zustand) return;
    if (zustand.ruhe) clearInterval(zustand.ruhe);
    if (zustand.timer) clearInterval(zustand.timer.id);
    if (window.speechSynthesis) speechSynthesis.cancel();
    document.removeEventListener("keydown", tasten);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    zustand.wurzel.remove();
    zustand = null;
}
function tasten(ev){
    if (!zustand) return;
    if (ev.target && /INPUT|TEXTAREA/.test(ev.target.tagName)) return;
    if (zustand.wurzel.querySelector(".p-ruhe")) {   // während des Ruhe-Signals nicht weiterblättern
        if ([" ", "Enter", "Escape", "r", "R"].includes(ev.key)) { ev.preventDefault(); ruheEnde(); }
        else if (["ArrowRight", "PageDown", "ArrowLeft", "PageUp", "Backspace"].includes(ev.key)) ev.preventDefault();
        return;
    }
    if (["ArrowRight", "PageDown", " ", "Enter"].includes(ev.key)) { ev.preventDefault(); naechste(); }
    else if (["ArrowLeft", "PageUp", "Backspace"].includes(ev.key)) { ev.preventDefault(); zeigen(zustand.i - 1, true); }
    else if (ev.key === "Escape") { if (zustand.wurzel.querySelector(".p-ruhe")) ruheEnde(); else if (zustand.wurzel.querySelector(".p-overlay")) zustand.wurzel.querySelector(".p-overlay").remove(); else if (!document.fullscreenElement) praesentationBeenden(); }
    else if (ev.key === "f" || ev.key === "F") vollbild();
    else if (ev.key === "r" || ev.key === "R") ruheSignal();
}
function naechste(){
    // Bei den Fragen erst Frage für Frage aufdecken
    const fr = zustand.buehne.querySelector(".p-fragen");
    if (fr) { const alle = [...fr.querySelectorAll(".p-frage")], an = alle.findIndex(x => x.classList.contains("an")); if (an < alle.length - 1) { alle.forEach((x, k) => { x.classList.toggle("an", k === an + 1); if (k <= an + 1) x.classList.add("war"); }); return; } }
    zeigen(zustand.i + 1);
}
function vollbild(){ const w = zustand.wurzel; if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); else if (w.requestFullscreen) w.requestFullscreen().catch(() => {}); }
function leistenKlick(ev){
    const b = ev.target.closest("[data-p]"); if (!b) return;
    const a = b.dataset.p;
    audio();
    if (a === "zu") praesentationBeenden();
    else if (a === "weiter") naechste();
    else if (a === "zurueck") zeigen(zustand.i - 1, true);
    else if (a === "vollbild") vollbild();
    else if (a === "schale") klangschale();
    else if (a === "ruhe") ruheSignal();
    else if (a === "silben") {
        zustand.silben = !zustand.silben;
        b.classList.toggle("an", zustand.silben);
        try { localStorage.setItem("sozial_silben_" + zustand.stufe, zustand.silben ? "1" : "0"); } catch (err) {}
        zeigen(zustand.i);
    }
    else if (a === "rad") gluecksrad();
    else if (a === "timer") timerWaehlen();
    else if (a === "punkt") zeigen(+b.dataset.n, +b.dataset.n < zustand.i);
}

function zeigen(i, rueckwaerts){
    const z = zustand;
    if (i < 0 || i >= z.folien.length) return;
    if (window.speechSynthesis) speechSynthesis.cancel();
    if (i !== z.i) { const dran = z.wurzel.querySelector(".p-dran"); if (dran) dran.remove(); }   // Glücksrad-Nummer gilt nur für diese Folie
    z.i = i;
    const f = z.folien[i];
    const el = document.createElement("div");
    el.className = "p-folie" + (rueckwaerts ? " zurueck" : "");
    el.innerHTML = folieHtml(f, z.e);
    if (f.typ === "titel") el.classList.add("p-titel");
    z.buehne.querySelectorAll(".p-folie").forEach(x => x.remove());
    z.buehne.appendChild(el);
    folieAktivieren(el, f);
    if (z.silben) silbenLaden().then(() => { if (el.isConnected) silbenAnwenden(el); });
    z.wurzel.querySelector(".p-pos").textContent = (i + 1) + " / " + z.folien.length;
    z.wurzel.querySelector(".p-punkte").innerHTML = z.folien.map((_, k) => `<i data-p="punkt" data-n="${k}" class="${k === i ? "an" : ""}"></i>`).join("");
}

function bilderHtml(keys){ return keys.length ? `<div class="p-bilder">${keys.map(k => ltBild(k)).join("")}</div>` : ""; }
function symbolHtml(art, wert){
    if (art === "gefuehl") return `<div class="p-symbol">${gesichtSvg(gefuehlArt(wert), false)}</div>`;
    return `<div class="p-symbol">${wert}</div>`;
}
function stimmenHtml(schluessel, optionen){
    const s = zustand.stimmen[schluessel] || {};
    return `<div class="p-stimmen" data-schluessel="${esc(schluessel)}">${optionen.map(o => `<div class="p-stimme" data-wert="${esc(o.wert)}">
        <div class="p-saeule"><span class="p-zahl">${s[o.wert] || ""}</span><div class="p-fuell" style="height:0"></div></div>
        ${symbolHtml(o.art, o.zeichen)}<div class="p-name">${esc(o.name)}</div>
        <button class="p-minus" data-minus="1" title="Aus Versehen getippt? Eine Stimme zurücknehmen." style="visibility:${s[o.wert] ? "visible" : "hidden"}">↩ zurück</button></div>`).join("")}</div>`;
}
const GEFUEHLE_OPT = ["fröhlich", "traurig", "wütend", "ängstlich", "cool"].map(g => ({ wert: g, name: g, art: "gefuehl", zeichen: g }));
function abstimmOptionen(art, u){
    if (u && Array.isArray(u.antworten) && u.antworten.length) return u.antworten.map((a, k) => { const m = /^(\S+)\s+(.*)$/.exec(a) || [a, "", a]; return { wert: "a" + k, name: m[2], art: "emoji", zeichen: m[1] }; });
    if (art === "daumen") return [{ wert: "hoch", name: "Daumen hoch", art: "emoji", zeichen: "👍" }, { wert: "seite", name: "weiß nicht", art: "emoji", zeichen: "🤔" }, { wert: "runter", name: "Daumen runter", art: "emoji", zeichen: "👎" }];
    if (art === "loesung") return [{ wert: "abwechseln", name: "Abwechseln", art: "emoji", zeichen: "🔄" }, { wert: "teilen", name: "Teilen", art: "emoji", zeichen: "🍕" }, { wert: "zusammen", name: "Zusammen machen", art: "emoji", zeichen: "🤝" }, { wert: "hilfe", name: "Hilfe holen", art: "emoji", zeichen: "🙋" }];
    if (art === "stopp") return [{ wert: "ok", name: "okay", art: "emoji", zeichen: "👍" }, { wert: "stopp", name: "Stopp!", art: "emoji", zeichen: "✋" }];
    if (art === "ampel") return [{ wert: "gruen", name: "Grün", art: "emoji", zeichen: "🟢" }, { wert: "rot", name: "Rot", art: "emoji", zeichen: "🔴" }];
    return GEFUEHLE_OPT;
}

function folieHtml(f, e){
    const fuerChip = u => `<span class="p-chip ${u.fuer === "34" ? "gold" : u.fuer === "12" ? "" : "gruen"}">${{ alle: "Alle", "12": "Kl. 1/2", "34": "Kl. 3/4" }[u.fuer] || "Alle"}</span>`;
    switch (f.typ) {
        case "titel": {
            const lt = zustand.stufe === "34" ? e.lerntext34 : e.lerntext12;
            const bilder = bilderImText(lt && lt.text, 3);
            const k = bilder.length ? bilder : (KAT_BILD[e.kategorie] ? [KAT_BILD[e.kategorie]] : []);
            return `<div class="p-strahl-box"><div class="p-strahl"></div></div>
                <div class="p-klein">${esc(String((window.BEREICH && window.BEREICH.name) || "Sozialtraining").toUpperCase())} · ${esc(String(e.kategorie || "").toUpperCase())}</div>
                ${bilderHtml(k)}
                <h1>${esc(e.titel)}</h1>
                <div class="p-wahl"><button class="p-knopf ${zustand.stufe === "12" ? "an" : ""}" data-stufe="12">Geschichte Kl. 1/2</button><button class="p-knopf ${zustand.stufe === "34" ? "an" : ""}" data-stufe="34">Geschichte Kl. 3/4</button></div>`;
        }
        case "barometer":
            return `<h2>Wie geht es dir heute?</h2><div class="p-klein">Tippe auf dein Gefühl – oder komm nach vorn und zeig es.</div>${stimmenHtml("barometer", GEFUEHLE_OPT)}`;
        case "geschichte": {
            const bilder = bilderImText(f.text, 3);
            const lang = f.text.length > (bilder.length ? 300 : 380);
            const leser = zustand.vorleser[zustand.i];
            return `<div class="p-klein">${esc(f.titel)} · ${f.nr} / ${f.von}</div>${bilderHtml(bilder)}<div class="p-text"${lang ? ' style="font-size:clamp(18px,min(2.6vw,4.1vh),42px)"' : ""}>${md(f.text)}</div>
                <div class="p-reihe"><button class="p-knopf gold" data-vorleser="1">🎡 Wer liest vor?</button><span class="p-vorleser"${leser ? "" : " hidden"}>📖 Es liest: <b>${esc(leser || "")}</b></span><button class="p-knopf hell" data-vorlesen="1">🔊 Vorlesen lassen</button></div>`;
        }
        case "fragen":
            return `<h2>Lass uns darüber sprechen</h2><div class="p-fragen">${(() => { let n = 0; return f.fragen.map((q, k) => `<div class="p-frage ${q.art === "aufgabe" ? "aufgabe " : ""}${k === 0 ? "an" : ""}" data-frage="${k}"><span class="nr">${q.art === "aufgabe" ? "👉" : ++n}</span><span>${esc(q.text)}</span></div>`).join(""); })()}</div>
                <div class="p-reihe"><button class="p-knopf gold" data-p="rad">🎡 Wer antwortet?</button></div>`;
        case "film":
            return `<h2>🎬 Film ab!</h2><div class="p-filme">${f.medien.map(m => `<a class="p-film" href="${esc(m.url)}" target="_blank" rel="noopener"><div class="play">▶</div><div><strong>${esc(m.titel || "Film")}</strong><span>${esc([m.quelle, m.dauer].filter(Boolean).join(" · "))}</span>${m.hinweis ? `<span style="display:block">${esc(m.hinweis)}</span>` : ""}</div></a>`).join("")}</div>
                <div class="p-klein" style="margin-top:2vh">Öffnet in einem neuen Fenster – danach hierher zurückwechseln.</div>`;
        case "ankuendigung": {
            const reihe = zustand.folien.filter(x => x.typ === "uebung"), nr = reihe.findIndex(x => x.u === f.u) + 1;
            return `<div class="p-klein">${f.u.zusatz ? "Zusatz – wenn noch Zeit ist" : reihe.length > 1 ? "Übung " + nr + " von " + reihe.length : "Unsere Übung"}</div>
                <div style="font-size:clamp(40px,7vw,110px);line-height:1">${f.u.emoji || "👉"}</div>
                <h2 style="margin-top:.2em"><span style="opacity:.6;font-size:.6em;display:block">Als Nächstes:</span>${esc(f.u.titel)}</h2>
                <div class="p-text" style="font-size:clamp(20px,min(2.6vw,4.4vh),40px)">${f.u.warum ? inline(f.u.warum) : "Hört gut zu – gleich erkläre ich euch, wie es geht."}</div>
                ${f.u.zusatz && f.weiter ? `<div class="p-reihe"><button class="p-knopf hell" data-springen="${f.weiter}">⏭ Überspringen</button></div>` : ""}`;
        }
        case "uebung": {
            const min = minuten(f.u.dauer);
            const kurz = String(f.u.text || "").split(/\n\s*\n/)[0];
            return `<div>${f.u.zusatz ? '<span class="p-chip zusatz">Zusatz – wenn noch Zeit ist</span>' : fuerChip(f.u)}${f.u.dauer ? `<span class="p-chip">${esc(f.u.dauer)}</span>` : ""}</div><h2>${esc(f.u.titel)}</h2>
                <div class="p-text" style="font-size:${String(f.u.text || "").length > 450 ? "clamp(14px,min(1.45vw,2.3vh),26px)" : String(f.u.text || "").length > 280 ? "clamp(17px,min(2.1vw,3.6vh),34px)" : "clamp(20px,min(2.6vw,4.6vh),40px)"}">${md(f.u.folie ? f.u.folie : aufzaehlung(f.u.text).length ? kurz.split("\n").filter(z => !/^\s*[-•]/.test(z)).join("\n") : f.u.text)}</div>${f.u.liste ? `<div class="p-liste">${f.u.liste.map(x => `<div>${inline(x)}</div>`).join("")}</div>` : ""}
                <div class="p-reihe">${min ? `<button class="p-knopf gold" data-start="${min}">⏱ ${min} Minuten starten</button>` : ""}<button class="p-knopf hell" data-p="rad">🎡 Wer fängt an?</button>${f.u.zusatz ? `<button class="p-knopf hell" data-springen="${f.weiter}">⏭ Überspringen</button>` : ""}</div>`;
        }
        case "abstimmung":
            return `<div class="p-klein">${esc(f.u.titel)} · ${f.nr} / ${f.von}</div><div class="p-aussage"${f.aussage.length > 70 ? ' style="font-size:clamp(20px,min(3vw,5vh),48px)"' : f.aussage.length > 32 ? ' style="font-size:clamp(22px,min(3.6vw,6vh),56px)"' : ""}>${inline(f.aussage)}</div>${stimmenHtml("q" + zustand.i + f.aussage, abstimmOptionen(f.art, f.u))}${f.loesung && f.loesung.length ? '<div class="p-reihe" style="margin-top:1.5vh"><button class="p-knopf hell" data-aufloesen="1">✅ Auflösen</button></div>' : ""}`;
        case "karte":
            return `<div class="p-klein">${esc(f.u.titel)} · ${f.nr} / ${f.von}</div><div class="p-aussage">${inline(f.aussage)}</div>${f.u.frage ? `<div class="p-text" style="margin-top:2vh;font-size:clamp(18px,2.2vw,34px)">${inline(f.u.frage)}</div>` : ""}
                <div class="p-reihe" style="margin-top:2vh"><button class="p-knopf hell" data-p="rad">🎡 Wer ist dran?</button></div>`;
        case "arbeitsblatt":
            return `<div class="p-bilder">${ltBild("stift")}${ltBild("heft")}</div><h2>Bearbeite jetzt leise dein Arbeitsblatt.</h2>
                <div class="p-text" style="font-size:clamp(20px,2.6vw,40px)">🤫 Wenn du fertig bist, drehst du dein Blatt um und wartest leise.</div>
                <div class="p-reihe"><button class="p-knopf gold" data-start="10">⏱ 10 Minuten starten</button><button class="p-knopf hell" data-schale="1">🔔 Ruhe-Signal</button></div>`;
        case "abschluss":
            return `<h2>Was nimmst du heute mit?</h2><div class="p-text" style="font-size:clamp(22px,3vw,46px)">„Heute habe ich gelernt …“</div>
                <div class="p-welle">${Array.from({ length: zustand.anzahl }, () => '<span class="p-hand">👏</span>').join("")}</div>
                <div class="p-reihe"><button class="p-knopf gold" data-welle="1">👏 Applauswelle!</button><button class="p-knopf hell" data-p="rad">🎡 Wer erzählt?</button></div>`;
    }
    return "";
}

function folieAktivieren(el, f){
    // Abstimmungen
    el.querySelectorAll(".p-stimmen").forEach(box => {
        const schl = box.dataset.schluessel;
        const s = zustand.stimmen[schl] = zustand.stimmen[schl] || {};
        const zeichnen = () => {
            const max = Math.max(3, ...Object.values(s));
            box.querySelectorAll(".p-stimme").forEach(st => { const n = s[st.dataset.wert] || 0; st.querySelector(".p-fuell").style.height = (n / max * 100) + "%"; st.querySelector(".p-zahl").textContent = n || ""; st.querySelector(".p-minus").style.visibility = n ? "visible" : "hidden"; });
        };
        box.addEventListener("click", ev => {
            const st = ev.target.closest(".p-stimme"); if (!st) return;
            const w = st.dataset.wert;
            if (ev.target.closest("[data-minus]")) { s[w] = Math.max(0, (s[w] || 0) - 1); }
            else { s[w] = (s[w] || 0) + 1; plopp(1 + Object.keys(s).indexOf(w) * .12); const sy = st.querySelector(".p-symbol"); sy.classList.remove("pop"); void sy.offsetWidth; sy.classList.add("pop"); setTimeout(() => sy.classList.remove("pop"), 160); }
            zeichnen();
        });
        requestAnimationFrame(zeichnen);
    });
    el.querySelectorAll("[data-stufe]").forEach(b => b.addEventListener("click", () => {
        zustand.stufe = b.dataset.stufe; zustand.folien = folienBauen(zustand.e, zustand.stufe); zeigen(0);
    }));
    el.querySelectorAll("[data-frage]").forEach(q => q.addEventListener("click", () => el.querySelectorAll(".p-frage").forEach((x, k) => { x.classList.toggle("an", x === q); if (k <= +q.dataset.frage) x.classList.add("war"); })));
    el.querySelectorAll("[data-start]").forEach(b => b.addEventListener("click", () => timerStarten(+b.dataset.start * 60)));
    el.querySelectorAll("[data-schale]").forEach(b => b.addEventListener("click", () => klangschale()));
    el.querySelectorAll("[data-aufloesen]").forEach(b => b.addEventListener("click", () => {
        const richtig = f.loesung || [];
        el.querySelectorAll(".p-stimme").forEach((st, k) => st.classList.add(richtig.includes(k + 1) ? "richtig" : "falsch"));
        b.remove(); fanfare();
    }));
    el.querySelectorAll("[data-springen]").forEach(b => b.addEventListener("click", () => zeigen(+b.dataset.springen)));
    el.querySelectorAll("[data-vorlesen]").forEach(b => b.addEventListener("click", () => vorlesen(f.text, b)));
    el.querySelectorAll("[data-vorleser]").forEach(b => b.addEventListener("click", () => {
        const nr = zustand.i;
        gluecksrad({ titel: "📖 Wer liest vor?", lesen: true, fertig: name => {
            zustand.vorleser[nr] = name;
            const badge = el.querySelector(".p-vorleser");
            if (badge) { badge.hidden = false; badge.innerHTML = "📖 Es liest: <b>" + esc(name) + "</b>"; }
        } });
    }));
    el.querySelectorAll("[data-welle]").forEach(b => b.addEventListener("click", () => applauswelle(el)));
}

function vorlesen(text, knopf){
    if (!window.speechSynthesis) { alert("Dieser Browser kann nicht vorlesen."); return; }
    if (speechSynthesis.speaking) { speechSynthesis.cancel(); knopf.textContent = "🔊 Vorlesen lassen"; return; }
    const u = new SpeechSynthesisUtterance(ohneMarkdown(text));
    u.lang = "de-DE"; u.rate = .9;
    const stimme = speechSynthesis.getVoices().find(v => /^de/i.test(v.lang));
    if (stimme) u.voice = stimme;
    u.onend = () => { knopf.textContent = "🔊 Vorlesen lassen"; };
    knopf.textContent = "⏹ Stopp";
    speechSynthesis.speak(u);
}

function applauswelle(el){
    const haende = [...el.querySelectorAll(".p-hand")];
    haende.forEach((h, k) => setTimeout(() => { h.classList.add("an"); klatsch(); setTimeout(() => h.classList.remove("an"), 260); }, k * 330));
    setTimeout(() => { haende.forEach(h => h.classList.add("an")); [0, 90, 180, 260, 350, 430].forEach(d => setTimeout(klatsch, d)); fanfare(); konfetti(zustand.buehne); setTimeout(() => haende.forEach(h => h.classList.remove("an")), 900); }, haende.length * 330 + 200);
}

/* ---------------- Timer ---------------- */
function timerStarten(sekunden){
    const z = zustand;
    if (z.timer) { clearInterval(z.timer.id); z.timer.el.remove(); }
    const el = document.createElement("div");
    el.className = "p-timer";
    z.buehne.parentElement.appendChild(el);
    el.style.position = "absolute";
    const t = z.timer = { rest: sekunden, gesamt: sekunden, el, pause: false, id: null };
    const zeichnen = () => {
        const m = Math.floor(t.rest / 60), s = t.rest % 60, anteil = t.rest / t.gesamt;
        el.innerHTML = `<svg class="ring" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="5"/><circle cx="18" cy="18" r="15" fill="none" stroke="#f2a93b" stroke-width="5" stroke-dasharray="${(anteil * 94.2).toFixed(1)} 94.2" transform="rotate(-90 18 18)"/></svg>
            <span>${m}:${String(s).padStart(2, "0")}</span><button data-t="pause">${t.pause ? "▶" : "⏸"}</button><button data-t="plus">+1</button><button data-t="weg">✕</button>`;
    };
    el.addEventListener("click", ev => {
        const b = ev.target.closest("[data-t]"); if (!b) return;
        if (b.dataset.t === "pause") t.pause = !t.pause;
        if (b.dataset.t === "plus") { t.rest += 60; t.gesamt = Math.max(t.gesamt, t.rest); el.classList.remove("ende"); }
        if (b.dataset.t === "weg") { clearInterval(t.id); el.remove(); z.timer = null; return; }
        zeichnen();
    });
    zeichnen();
    t.id = setInterval(() => {
        if (t.pause || t.rest <= 0) return;
        t.rest--; zeichnen();
        if (t.rest === 0) { el.classList.add("ende"); klangschale(.7); }
    }, 1000);
}
function timerWaehlen(){
    const o = overlay(`<h2>⏱ Timer</h2><div class="p-reihe">${[1, 2, 3, 5, 8, 10].map(m => `<button class="p-knopf ${m === 5 ? "gold" : "hell"}" data-min="${m}">${m} Min</button>`).join("")}</div>`);
    o.addEventListener("click", ev => { const b = ev.target.closest("[data-min]"); if (b) { timerStarten(+b.dataset.min * 60); o.remove(); } });
}

/* ---------------- Silbenfarben (blau/rot) zum Selbstlesen ---------------- */
const SILBEN_CDN = "https://cdn.jsdelivr.net/npm/hyphen@1.10.6/";
let silbenTrenner = null, silbenVersprechen = null;
function skriptLaden(url, test){
    return new Promise((ok, fehler) => {
        if (test()) return ok();
        const sc = document.createElement("script"); sc.src = url; sc.onload = () => ok(); sc.onerror = fehler; document.head.appendChild(sc);
    });
}
function silbenLaden(){
    if (!silbenVersprechen) silbenVersprechen = skriptLaden(SILBEN_CDN + "hyphen.js", () => window.createHyphenator)
        .then(() => skriptLaden(SILBEN_CDN + "patterns/de-1996.js", () => window.hyphenationPatternsDe1996))
        .then(() => { silbenTrenner = window.createHyphenator(window.hyphenationPatternsDe1996, { hyphenChar: "|", minWordLength: 3 }); })
        .catch(() => null);
    return silbenVersprechen;
}
function silbenRegel(wort){
    const VOKALE = "aeiouäöüyAEIOUÄÖÜY", EINHEITEN = ["sch", "ch", "ck", "ph", "qu"], teile = [];
    for (let i = 0; i < wort.length;) {
        const rest = wort.slice(i).toLowerCase(), einheit = EINHEITEN.find(x => rest.startsWith(x));
        if (einheit) { teile.push({ s: wort.substr(i, einheit.length), v: false }); i += einheit.length; }
        else { teile.push({ s: wort[i], v: VOKALE.includes(wort[i]) }); i++; }
    }
    const kerne = [];
    for (let k = 0; k < teile.length; k++) { if (!teile[k].v) continue; let e = k; while (e + 1 < teile.length && teile[e + 1].v) e++; kerne.push([k, e]); k = e; }
    if (kerne.length < 2) return [wort];
    const schnitte = kerne.slice(0, -1).map((kk, n) => { const kons = kerne[n + 1][0] - kk[1] - 1; return kons <= 1 ? kk[1] + 1 : kerne[n + 1][0] - 1; });
    const aus = []; let st = 0;
    schnitte.forEach(x => { aus.push(teile.slice(st, x).map(t => t.s).join("")); st = x; });
    aus.push(teile.slice(st).map(t => t.s).join(""));
    return aus;
}
function silbenTrennen(wort){
    let teile;
    try { teile = silbenTrenner ? silbenTrenner(wort).split("|") : silbenRegel(wort); } catch (err) { teile = silbenRegel(wort); }
    const aus = [];
    teile.forEach(t => {
        if (t.length > 2 && /^[aeiouäöü][bcdfghjklmnpqrstvwxzß][aeiouäöüy]/i.test(t) && !/^(un|er|um|ur|an|ob)/i.test(t)) aus.push(t[0], t.slice(1));
        else aus.push(t);
    });
    return aus.filter(Boolean);
}
// färbt alle Wörter in Lesetext, Aussagen, Fragen und Übungstext – Knöpfe und Titel bleiben unverändert
function silbenAnwenden(wurzel){
    wurzel.querySelectorAll(".p-text, .p-aussage, .p-frage span:not(.nr)").forEach(bereich => {
        if (bereich.dataset.silben) return;
        bereich.dataset.silben = "1";
        const knoten = [], gang = document.createTreeWalker(bereich, NodeFilter.SHOW_TEXT);
        while (gang.nextNode()) if (!gang.currentNode.parentElement.closest("button, .p-sil")) knoten.push(gang.currentNode);
        knoten.forEach(n => {
            const t = n.nodeValue;
            if (!/[A-Za-zÄÖÜäöüß]/.test(t)) return;
            const frag = document.createElement("span");
            frag.innerHTML = t.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]))
                .replace(/[A-Za-zÄÖÜäöüß]+/g, w => `<span class="p-sil">${silbenTrennen(w).map((x, i) => `<span class="p-s${i % 2 + 1}">${x}</span>`).join("")}</span>`);
            n.replaceWith(...frag.childNodes);
        });
    });
}

/* ---------------- Glücksrad „Wer ist dran?“ ---------------- */
function dranZeigen(name, farbe){
    const w = zustand && zustand.wurzel;
    if (!w) return;
    let b = w.querySelector(".p-dran");
    if (!b) {
        b = document.createElement("button");
        b.className = "p-dran"; b.title = "Wer dran ist – antippen zum Ausblenden";
        b.addEventListener("click", () => b.remove());
        w.appendChild(b);
    }
    const nr = String(name).startsWith("Platz ") ? String(name).slice(6) : String(name);
    b.textContent = nr;
    b.classList.toggle("lang", nr.length > 2);
    b.style.background = farbe || "#f2a93b";
    b.classList.remove("neu"); void b.offsetWidth; b.classList.add("neu");
}
function overlay(html){
    const o = document.createElement("div");
    o.className = "p-overlay";
    o.innerHTML = `<div class="p-dialog">${html}<div class="p-reihe"><button class="p-knopf hell" data-zu="1">Schließen</button></div></div>`;
    o.addEventListener("click", ev => { if (ev.target === o || ev.target.closest("[data-zu]")) o.remove(); });
    zustand.buehne.appendChild(o);
    return o;
}
// Namen fürs Rad: nur im Arbeitsspeicher dieser Seite – werden nie gespeichert oder gesendet
let radNamen = [];
let radNurEinmal = true;
function gluecksrad(opt = {}){
    const z = zustand;
    const titel = opt.titel || "🎡 Wer ist dran?";
    const o = overlay(`<h2>${esc(titel)}</h2>
        <div class="p-rad-wrap"><div class="p-zeiger"></div><canvas width="800" height="800"></canvas></div>
        <div class="p-ergebnis">&nbsp;</div>
        <div class="p-reihe" style="align-items:center"><button class="p-knopf gold" data-dreh="1">Drehen!</button>
        <span style="font-weight:800" data-anzahl-box="1">Plätze: <input type="number" min="2" max="30" value="${z.anzahl}" data-anzahl="1"></span></div>
        <div class="p-rad-optionen">
            <label><input type="checkbox" data-einmal="1" ${radNurEinmal ? "checked" : ""}> Jeder nur einmal</label>
            <button class="p-knopf hell" data-neu="1" style="font-size:16px;padding:.35em .8em">↺ Alle wieder frei</button>
            <button class="p-knopf hell" data-namen-auf="1" style="font-size:16px;padding:.35em .8em">✏️ Namen statt Nummern</button>
        </div>
        <div data-namen-box="1" hidden><textarea class="p-namen" data-namen="1" placeholder="Ein Vorname pro Zeile (oder mit Komma getrennt) – wird nicht gespeichert">${esc(radNamen.join("\n"))}</textarea>
            <div style="font-size:14px;color:#7c8a85;font-weight:700">Die Namen bleiben nur, solange diese Seite offen ist. Leer lassen = Platznummern.</div></div>`);
    const c = o.querySelector("canvas"), x = c.getContext("2d");
    const farben = ["#f2a93b", "#3d7ea6", "#e74c3c", "#2e8b57", "#c0399b", "#e67e22", "#17a2b8", "#16324a", "#8e44ad", "#27ae60"];
    let winkel = 0, laeuft = false;
    const etiketten = () => radNamen.length >= 2 ? radNamen.slice(0, 30) : Array.from({ length: z.anzahl }, (_, k) => "Platz " + (k + 1));
    const kurz = t => t.startsWith("Platz ") ? t.slice(6) : (t.length > 9 ? t.slice(0, 8) + "…" : t);
    const gesperrt = t => radNurEinmal && z.gelesen.has(t);
    const zeichnen = () => {
        const liste = etiketten(), n = liste.length, r = 390, st = Math.PI * 2 / n;
        x.clearRect(0, 0, 800, 800);
        for (let k = 0; k < n; k++) {
            const a0 = winkel + k * st - Math.PI / 2, grau = gesperrt(liste[k]);
            x.beginPath(); x.moveTo(400, 400); x.arc(400, 400, r, a0, a0 + st); x.closePath();
            x.fillStyle = grau ? "#d5dbd8" : farben[k % farben.length]; x.fill(); x.strokeStyle = "white"; x.lineWidth = 4; x.stroke();
            const text = kurz(liste[k]), gross = text.length <= 2;
            x.save(); x.translate(400, 400); x.rotate(a0 + st / 2); x.fillStyle = grau ? "#9aa6ab" : "white";
            x.font = "900 " + (gross ? Math.min(90, 520 / n + 20) : Math.min(46, 300 / n + 18)) + "px Nunito, sans-serif"; x.textAlign = "right"; x.textBaseline = "middle"; x.fillText(text, r - 30, 0); x.restore();
        }
        x.beginPath(); x.arc(400, 400, 46, 0, Math.PI * 2); x.fillStyle = "white"; x.fill();
        o.querySelector("[data-anzahl-box]").style.display = radNamen.length >= 2 ? "none" : "";
    };
    zeichnen();
    o.querySelector("[data-anzahl]").addEventListener("input", ev => {
        z.anzahl = Math.max(2, Math.min(30, parseInt(ev.target.value, 10) || 9));
        try { localStorage.setItem("sozial_anzahl", z.anzahl); } catch (err) {}
        zeichnen();
    });
    o.querySelector("[data-einmal]").addEventListener("change", ev => { radNurEinmal = ev.target.checked; zeichnen(); });
    o.querySelector("[data-neu]").addEventListener("click", () => { z.gelesen.clear(); zeichnen(); o.querySelector(".p-ergebnis").innerHTML = "&nbsp;"; });
    o.querySelector("[data-namen-auf]").addEventListener("click", () => { const b = o.querySelector("[data-namen-box]"); b.hidden = !b.hidden; o.querySelector(".p-dialog").classList.toggle("mit-namen", !b.hidden); });
    o.querySelector("[data-namen]").addEventListener("input", ev => {
        radNamen = ev.target.value.split(/[\n,;]+/).map(t => t.trim().slice(0, 20)).filter(Boolean).slice(0, 30);
        z.gelesen.clear(); zeichnen();
    });
    o.querySelector("[data-dreh]").addEventListener("click", () => {
        if (laeuft) return;
        const liste = etiketten(), n = liste.length, st = Math.PI * 2 / n;
        let frei = liste.map((t, k) => k).filter(k => !gesperrt(liste[k]));
        if (!frei.length) { z.gelesen.clear(); zeichnen(); frei = liste.map((t, k) => k); o.querySelector(".p-ergebnis").textContent = "Alle waren dran – neue Runde!"; }
        laeuft = true; audio();
        const ziel = frei[Math.floor(Math.random() * frei.length)];
        // Zielwinkel: Die Mitte von Feld „ziel“ steht am Ende genau unter dem Zeiger (oben); nur ganze Zusatz-Umdrehungen
        const zufall = (Math.random() - .5) * st * .7;
        const start = winkel, ende = winkel + Math.PI * 2 * (5 + Math.floor(Math.random() * 3)) + ((((-(ziel + .5) * st + zufall) - winkel) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const dauer = 4200, t0 = performance.now();
        let letzteSegment = -1;
        if (frei.length !== n || !z.gelesen.size) o.querySelector(".p-ergebnis").innerHTML = "&nbsp;";
        (function schritt(t){
            const p = Math.min(1, (t - t0) / dauer), e = 1 - Math.pow(1 - p, 4);
            winkel = start + (ende - start) * e; zeichnen();
            const seg = Math.floor(((-winkel % (Math.PI * 2)) + Math.PI * 4) % (Math.PI * 2) / st);
            if (seg !== letzteSegment) { tick(); letzteSegment = seg; }
            if (p < 1) requestAnimationFrame(schritt);
            else {
                laeuft = false;
                const feld = Math.floor(((((-winkel) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / st);
                const name = liste[feld];
                z.gelesen.add(name);
                o.querySelector(".p-ergebnis").textContent = name + (opt.lesen ? " liest vor!" : "!");
                fanfare();
                if (opt.fertig) opt.fertig(name);
                zeichnen();
                // kurz groß zeigen, dann schließen – die Nummer bleibt klein oben rechts in der Ecke
                dranZeigen(name, farben[feld % farben.length]);
                setTimeout(() => { if (o.isConnected) o.remove(); }, 2300);
            }
        })(t0);
    });
}

/* ============================================================
   PowerPoint-Export (gleiche Folien, mit Sprechernotizen)
   ============================================================ */
function skriptLaden(src){
    return new Promise((ok, fehler) => {
        if (window.PptxGenJS) return ok();
        const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = () => fehler(new Error("pptxgen.bundle.js konnte nicht geladen werden."));
        document.head.appendChild(s);
    });
}
// SVG → PNG (PowerPoint zeigt PNG überall zuverlässig an)
function svgZuPng(svg, groesse = 360){
    return new Promise(ok => {
        if (!svg) return ok(null);
        let s = String(svg).replace(/<svg([^>]*?)\swidth="[^"]*"/, "<svg$1").replace(/<svg([^>]*?)\sheight="[^"]*"/, "<svg$1");
        if (!/xmlns=/.test(s)) s = s.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
        s = s.replace("<svg", `<svg width="${groesse}" height="${groesse}"`);
        const img = new Image();
        img.onload = () => { const c = document.createElement("canvas"); c.width = c.height = groesse; c.getContext("2d").drawImage(img, 0, 0, groesse, groesse); ok(c.toDataURL("image/png")); };
        img.onerror = () => ok(null);
        img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
    });
}
function laufText(text){
    // **fett** in PowerPoint-Textstücke umwandeln
    const teile = [], re = /\*\*(.+?)\*\*/g;
    let pos = 0, m;
    const t = String(text).replace(/\*([^*\n]+)\*/g, "$1");
    while ((m = re.exec(t))) { if (m.index > pos) teile.push({ text: t.slice(pos, m.index) }); teile.push({ text: m[1], options: { bold: true } }); pos = m.index + m[0].length; }
    if (pos < t.length) teile.push({ text: t.slice(pos) });
    return teile;
}
async function pptxExport(e, stufe = "12"){
    await skriptLaden("pptxgen.bundle.js");
    const p = new window.PptxGenJS();
    p.layout = "LAYOUT_WIDE"; // 13,33 × 7,5 Zoll
    p.title = e.titel; p.subject = (window.BEREICH && window.BEREICH.name) || "Sozialtraining"; p.company = "Leuchtturm";
    const NACHT = "16324A", MEER = "3D7EA6", GOLD = "F2A93B", CREME = "FDFAF3", GRAU = "7C8A85";
    const W = 13.33, H = 7.5, FONT = "Arial Rounded MT Bold", TEXT = "Arial";
    const folien = folienBauen(e, stufe);
    const bildCache = {};
    const ltPng = async k => { if (!k) return null; if (!(k in bildCache)) bildCache[k] = await svgZuPng(window.LT_BILDER && window.LT_BILDER[k] && window.LT_BILDER[k][2]); return bildCache[k]; };
    const gesPng = async g => { const k = "g_" + gefuehlArt(g); if (!(k in bildCache)) bildCache[k] = await svgZuPng(gesichtSvg(gefuehlArt(g), false).replace("<svg", '<svg style="background:white"')); return bildCache[k]; };
    const fuss = s => s.addText(((window.BEREICH && window.BEREICH.name) || "Sozialtraining") + " · " + e.titel, { x: .4, y: H - .45, w: 8, h: .3, fontFace: TEXT, fontSize: 10, color: GRAU });
    const bilderSetzen = async (s, keys, y, groesse) => {
        const pngs = (await Promise.all(keys.map(ltPng))).filter(Boolean);
        const gesamt = pngs.length * groesse + (pngs.length - 1) * .4;
        pngs.forEach((d, k) => s.addImage({ data: d, x: (W - gesamt) / 2 + k * (groesse + .4), y, w: groesse, h: groesse }));
    };
    const stimmZeile = async (s, optionen, y) => {
        const g = 1.35, abst = .55, gesamt = optionen.length * g + (optionen.length - 1) * abst;
        for (let k = 0; k < optionen.length; k++) {
            const o = optionen[k], x = (W - gesamt) / 2 + k * (g + abst);
            if (o.art === "gefuehl") { const d = await gesPng(o.wert); if (d) s.addImage({ data: d, x, y, w: g, h: g }); }
            else s.addText(o.zeichen, { x, y, w: g, h: g, fontSize: 60, align: "center", valign: "middle" });
            s.addText(o.name, { x: x - .3, y: y + g + .05, w: g + .6, h: .4, fontFace: FONT, fontSize: 16, bold: true, align: "center", color: NACHT });
        }
    };
    for (const f of folien) {
        const s = p.addSlide();
        s.background = { color: CREME };
        switch (f.typ) {
            case "titel": {
                s.background = { color: NACHT };
                s.addText(String((window.BEREICH && window.BEREICH.name) || "Sozialtraining").toUpperCase() + " · " + String(e.kategorie || "").toUpperCase(), { x: 0, y: .7, w: W, h: .5, align: "center", fontFace: FONT, fontSize: 18, color: "F2C97B", charSpacing: 2 });
                const bilder = bilderImText((stufe === "34" ? e.lerntext34 : e.lerntext12 || {}).text, 3);
                await bilderSetzen(s, bilder.length ? bilder : [KAT_BILD[e.kategorie]].filter(Boolean), 1.6, 1.7);
                s.addText(e.titel, { x: .5, y: 3.6, w: W - 1, h: 1.6, align: "center", fontFace: FONT, fontSize: 60, bold: true, color: "FFFFFF" });
                s.addText([!e.nur34 && e.ziel12 && "Kl. 1/2: " + e.ziel12, e.ziel34 && "Kl. 3/4: " + e.ziel34].filter(Boolean).join("\n"), { x: 1, y: 5.4, w: W - 2, h: 1.2, align: "center", fontFace: TEXT, fontSize: 16, color: "C9D7E1" });
                s.addNotes("Ziele – Kl. 1/2: " + (e.ziel12 || "") + "\nKl. 3/4: " + (e.ziel34 || "") + "\nMaterial: " + (e.material || "").replace(/\n/g, ", "));
                break;
            }
            case "barometer":
                s.addText("Wie geht es dir heute?", { x: 0, y: .6, w: W, h: 1, align: "center", fontFace: FONT, fontSize: 44, bold: true, color: NACHT });
                s.addText("Zeig auf dein Gefühl – oder komm nach vorn.", { x: 0, y: 1.55, w: W, h: .5, align: "center", fontFace: TEXT, fontSize: 18, color: GRAU });
                await stimmZeile(s, GEFUEHLE_OPT, 2.8);
                s.addNotes("Gefühlsbarometer: Die Kinder zeigen oder tippen an der Tafel ihr Gefühl. Niemand muss erklären.");
                break;
            case "geschichte": {
                const bilder = bilderImText(f.text, 3);
                s.addText(f.titel + " · " + f.nr + " / " + f.von, { x: 0, y: .35, w: W, h: .45, align: "center", fontFace: FONT, fontSize: 16, color: GRAU });
                let y = .95;
                if (bilder.length) { await bilderSetzen(s, bilder, .95, 1.4); y = 2.55; }
                s.addText(laufText(f.text.replace(/^\s*[-•]\s+/gm, "")), { x: .9, y, w: W - 1.8, h: H - y - .7, align: "center", valign: "middle", fontFace: TEXT, fontSize: 30, color: "1F2D36", paraSpaceAfter: 8 });
                s.addNotes(ohneMarkdown(f.text));
                fuss(s);
                break;
            }
            case "fragen":
                s.addText("Lass uns darüber sprechen", { x: .6, y: .45, w: W - 1.2, h: .9, fontFace: FONT, fontSize: 38, bold: true, color: NACHT });
                s.addText(f.fragen.map(q => ({ text: (q.art === "aufgabe" ? "→ " : "") + q.text, options: { bullet: q.art === "aufgabe" ? false : { type: "number" }, paraSpaceAfter: 14 } })), { x: .9, y: 1.5, w: W - 1.8, h: H - 2.3, valign: "top", fontFace: TEXT, fontSize: 26, color: "1F2D36" });
                s.addNotes("Fragen zur Geschichte „" + f.titel + "“. Mit dem Glücksrad (im Leuchtturm) bestimmen, wer antwortet.");
                fuss(s);
                break;
            case "film":
                s.addText("🎬 Film ab!", { x: .6, y: .45, w: W - 1.2, h: .9, fontFace: FONT, fontSize: 40, bold: true, color: NACHT });
                f.medien.forEach((m, k) => {
                    const y = 1.6 + k * 1.25;
                    s.addShape(p.ShapeType.roundRect, { x: .9, y, w: W - 1.8, h: 1.05, fill: { color: "FFFFFF" }, line: { color: "DFE5E2" }, rectRadius: .15 });
                    s.addText("▶", { x: 1.1, y: y + .15, w: .75, h: .75, align: "center", valign: "middle", fontSize: 26, color: "FFFFFF", fill: { color: "E74C3C" } });
                    s.addText([{ text: m.titel || "Film", options: { hyperlink: { url: m.url }, bold: true, fontSize: 22, color: NACHT, breakLine: true } }, { text: [m.quelle, m.dauer].filter(Boolean).join(" · "), options: { fontSize: 14, color: GRAU } }], { x: 2.1, y: y + .08, w: W - 3.2, h: .9, fontFace: TEXT, valign: "middle" });
                });
                s.addNotes(f.medien.map(m => (m.titel || "Film") + ": " + m.url + (m.hinweis ? " – " + m.hinweis : "")).join("\n") + "\nHinweis: Mediathek-Links können ablaufen – vorher prüfen.");
                break;
            case "ankuendigung":
                s.addText("Als Nächstes:", { x: 0, y: 1.6, w: W, h: .6, align: "center", fontFace: FONT, fontSize: 24, color: GRAU });
                s.addText(f.u.titel, { x: .5, y: 2.2, w: W - 1, h: 1.2, align: "center", fontFace: FONT, fontSize: 48, bold: true, color: NACHT });
                s.addText(f.u.warum ? ohneMarkdown(f.u.warum) : "Hört gut zu – gleich erkläre ich euch, wie es geht.", { x: 1, y: 3.5, w: W - 2, h: 1.4, align: "center", fontFace: TEXT, fontSize: 24, color: MEER });
                break;
            case "uebung": {
                const fuer = { alle: "Alle", "12": "Kl. 1/2", "34": "Kl. 3/4" }[f.u.fuer] || "Alle";
                s.addText(fuer + (f.u.dauer ? " · " + f.u.dauer : ""), { x: 0, y: .5, w: W, h: .5, align: "center", fontFace: FONT, fontSize: 18, color: MEER, bold: true });
                s.addText(f.u.titel, { x: .5, y: 1.05, w: W - 1, h: 1.1, align: "center", fontFace: FONT, fontSize: 46, bold: true, color: NACHT });
                const kurz = f.u.folie ? ohneMarkdown(f.u.folie) + (f.u.liste ? "\n\n" + f.u.liste.map(x => "• " + ohneMarkdown(x)).join("\n") : "") : String(f.u.text || "").split(/\n\s*\n/)[0].split("\n").filter(z => !/^\s*[-•]/.test(z)).join(" ");
                s.addText(laufText(kurz), { x: 1, y: 2.4, w: W - 2, h: 3.6, align: "center", valign: "middle", fontFace: TEXT, fontSize: 24, color: "1F2D36" });
                s.addNotes(ohneMarkdown(f.u.text));
                fuss(s);
                break;
            }
            case "abstimmung":
                s.addText(f.u.titel + " · " + f.nr + " / " + f.von, { x: 0, y: .4, w: W, h: .45, align: "center", fontFace: FONT, fontSize: 16, color: GRAU });
                s.addShape(p.ShapeType.roundRect, { x: 1.2, y: 1.05, w: W - 2.4, h: 2, fill: { color: "FFFFFF" }, line: { color: "DFE5E2" }, rectRadius: .25 });
                s.addText(laufText(f.aussage), { x: 1.4, y: 1.1, w: W - 2.8, h: 1.9, align: "center", valign: "middle", fontFace: TEXT, fontSize: 34, bold: true, color: NACHT });
                await stimmZeile(s, abstimmOptionen(f.art, f.u), 3.5);
                s.addNotes((f.loesung && f.loesung.length ? "Lösung: " + f.loesung.map(n => (abstimmOptionen(f.art, f.u)[n - 1] || {}).name).join(" oder ") + "\n\n" : "") + ohneMarkdown(f.u.text));
                break;
            case "karte":
                s.addText(f.u.titel + " · " + f.nr + " / " + f.von, { x: 0, y: .4, w: W, h: .45, align: "center", fontFace: FONT, fontSize: 16, color: GRAU });
                s.addShape(p.ShapeType.roundRect, { x: 1.2, y: 1.4, w: W - 2.4, h: 2.4, fill: { color: "FFFFFF" }, line: { color: "DFE5E2" }, rectRadius: .25 });
                s.addText(laufText(f.aussage), { x: 1.4, y: 1.45, w: W - 2.8, h: 2.3, align: "center", valign: "middle", fontFace: TEXT, fontSize: 34, bold: true, color: NACHT });
                if (f.u.frage) s.addText(laufText(f.u.frage), { x: 1, y: 4.1, w: W - 2, h: 1, align: "center", fontFace: TEXT, fontSize: 22, color: MEER });
                s.addNotes(ohneMarkdown(f.u.text));
                break;
            case "arbeitsblatt":
                await bilderSetzen(s, ["stift", "heft"], .8, 1.4);
                s.addText("Bearbeite jetzt leise dein Arbeitsblatt.", { x: .5, y: 2.4, w: W - 1, h: 1.2, align: "center", fontFace: FONT, fontSize: 44, bold: true, color: NACHT });
                s.addText("Wenn du fertig bist, drehst du dein Blatt um und wartest leise.", { x: 1, y: 3.8, w: W - 2, h: 1, align: "center", fontFace: TEXT, fontSize: 24, color: MEER });
                s.addNotes(e.nur34 ? "Arbeitsphase ca. 10 Minuten." : "Arbeitsphase ca. 10 Minuten. Kl. 1/2: jede Aufgabe und jede Zeile vorlesen, die Farbsymbole zeigen die Zeile.");
                break;
            case "abschluss":
                s.background = { color: NACHT };
                s.addText("Was nimmst du heute mit?", { x: 0, y: 1.2, w: W, h: 1.2, align: "center", fontFace: FONT, fontSize: 50, bold: true, color: "FFFFFF" });
                s.addText("„Heute habe ich gelernt …“", { x: 0, y: 2.6, w: W, h: .9, align: "center", fontFace: TEXT, fontSize: 30, color: "F2C97B" });
                s.addText("👏 👏 👏 👏 👏 👏 👏 👏 👏", { x: 0, y: 4, w: W, h: 1.2, align: "center", fontSize: 48 });
                s.addNotes("Abschlussrunde, danach Applauswelle: der Reihe nach auf jeden Platz zeigen, jedes Kind klatscht einmal, zum Schluss alle zusammen.");
                break;
        }
    }
    const datei = (e.titel || "Einstieg").replace(/[^\p{L}\p{N}]+/gu, "_").replace(/^_+|_+$/g, "") + "_Einstieg.pptx";
    await p.writeFile({ fileName: datei });
    return datei;
}

window.sozialPraesentation = { starten: praesentationStarten, beenden: praesentationBeenden, pptx: pptxExport, folienBauen, bilderImText };
})();
