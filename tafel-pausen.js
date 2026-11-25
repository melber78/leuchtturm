/* ===============================================================
   Pausen-Tafeln: Runterkommen & Bewegungspausen
   – Runterkommen: Atemkreis, Blume & Kerze, Box-Atmung, Glitzerglas,
     5-4-3-2-1 (Sinne), Anspannen & Loslassen
   – Bewegungspausen: eine gezeichnete Figur macht jede Übung vor
     (am Platz und daneben), Programm oder einzelne Übung
   Jeweils mit Namen für die Grundschule und sachlich für Kl. 5–9.
   =============================================================== */
(function(){
"use strict";
const zuf = (a, b) => a + Math.random() * (b - a);
const mischen = l => { const a = l.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const CSS = `
#pz{ position:fixed; inset:0; z-index:14; display:none; flex-direction:column; font-family:"Nunito",sans-serif; user-select:none; -webkit-user-select:none; overflow:hidden; color:#fff;
  background:radial-gradient(ellipse at 50% 30%, #2d5c6e 0%, #183848 55%, #0e2330 100%); }
#pz.an{ display:flex; }
#pz.bewegt{ background:radial-gradient(ellipse at 50% 30%, #ffe7b8 0%, #ffc98a 45%, #f39a5a 100%); color:#3a2416; }
.pz-kopf{ display:flex; align-items:center; gap:8px; padding:10px 14px; flex:none; z-index:3; }
.pz-kopf .titel{ font-weight:900; font-size:18px; margin-right:auto; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; opacity:.85; }
.pz-k{ font:800 15px "Nunito",sans-serif; border:0; border-radius:999px; min-width:44px; height:44px; padding:0 14px; background:rgba(255,255,255,.18); color:inherit; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:6px; white-space:nowrap; }
#pz.bewegt .pz-k{ background:rgba(255,255,255,.55); }
.pz-buehne{ flex:1; min-height:0; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2vmin; padding:0 16px; }
.pz-bild{ position:relative; width:min(92vw, 62vh); aspect-ratio:1; display:flex; align-items:center; justify-content:center; }
.pz-bild svg, .pz-bild canvas{ width:100%; height:100%; display:block; overflow:visible; }
.pz-text{ font-weight:900; font-size:clamp(28px,6vmin,76px); text-align:center; line-height:1.1; text-shadow:0 3px 14px rgba(0,0,0,.25); min-height:1.1em; }
#pz.bewegt .pz-text{ text-shadow:none; }
.pz-unter{ font-weight:800; font-size:clamp(16px,2.8vmin,30px); opacity:.85; text-align:center; max-width:40em; min-height:1.3em; }
.pz-fuss{ flex:none; display:flex; gap:10px; justify-content:center; align-items:center; padding:12px 14px 18px; flex-wrap:wrap; }
.pz-fuss button{ font:900 clamp(17px,2.6vmin,24px) "Nunito",sans-serif; border:0; border-radius:999px; padding:12px 22px; background:rgba(255,255,255,.2); color:inherit; cursor:pointer; min-height:50px; }
#pz.bewegt .pz-fuss button{ background:rgba(255,255,255,.6); }
.pz-fuss .haupt{ background:#fff; color:#183848; }
#pz.bewegt .pz-fuss .haupt{ background:#3a2416; color:#fff; }
.pz-punkte{ display:flex; gap:8px; justify-content:center; }
.pz-punkte i{ width:14px; height:14px; border-radius:50%; background:rgba(255,255,255,.3); }
#pz.bewegt .pz-punkte i{ background:rgba(58,36,22,.2); }
.pz-punkte i.ok{ background:#fff; } #pz.bewegt .pz-punkte i.ok{ background:#3a2416; }
.pz-wahl{ position:absolute; inset:0; overflow:auto; padding:10px 18px 24px; box-sizing:border-box; z-index:4; }
.pz-wahl h2{ margin:4px auto 2px; max-width:1100px; font-size:clamp(22px,3.4vmin,32px); font-weight:900; }
.pz-wahl .hint{ max-width:1100px; margin:0 auto 12px; font-weight:700; opacity:.8; }
.pz-karten{ max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:14px; }
.pz-karte{ border:0; text-align:left; font:inherit; color:#1f2d36; background:#fff; border-radius:22px; padding:0; overflow:hidden; cursor:pointer; box-shadow:0 10px 26px rgba(0,0,0,.18); display:flex; flex-direction:column; transition:transform .2s; }
.pz-karte:hover{ transform:translateY(-4px); }
.pz-karte .b{ height:96px; display:flex; align-items:center; justify-content:center; font-size:46px; }
.pz-karte .t{ padding:10px 14px 14px; }
.pz-karte h3{ margin:0 0 4px; font-size:17px; font-weight:900; }
.pz-karte p{ margin:0; font-size:13.5px; font-weight:700; color:#5b6670; line-height:1.4; }
.pz-einst{ max-width:1100px; margin:14px auto 0; background:rgba(255,255,255,.14); border-radius:18px; padding:10px 14px; display:flex; flex-wrap:wrap; gap:10px 18px; align-items:center; }
#pz.bewegt .pz-einst{ background:rgba(255,255,255,.5); }
.pz-einst b{ font-size:13px; letter-spacing:.06em; text-transform:uppercase; opacity:.8; }
.pz-reihe{ display:inline-flex; gap:4px; flex-wrap:wrap; }
.pz-reihe button{ font:800 14px "Nunito",sans-serif; border:0; border-radius:999px; padding:7px 12px; cursor:pointer; background:rgba(255,255,255,.25); color:inherit; min-height:38px; }
#pz.bewegt .pz-reihe button{ background:rgba(255,255,255,.7); }
.pz-reihe button.an{ background:#fff; color:#183848; }
#pz.bewegt .pz-reihe button.an{ background:#3a2416; color:#fff; }
.pz-start{ max-width:1100px; margin:16px auto 0; display:flex; }
.pz-start button{ flex:1; font:900 22px "Nunito",sans-serif; border:0; border-radius:999px; padding:14px; background:#3a2416; color:#fff; cursor:pointer; }
.pz-sinn{ display:flex; gap:clamp(10px,2vmin,22px); justify-content:center; flex-wrap:wrap; }
.pz-sinn button{ width:clamp(54px,10vmin,110px); aspect-ratio:1; border-radius:50%; border:4px solid rgba(255,255,255,.7); background:transparent; cursor:pointer; transition:background .3s, transform .3s; }
.pz-sinn button.an{ background:#fff; transform:scale(1.08); }
.pz-ring{ position:absolute; right:18px; bottom:16px; font-weight:900; opacity:.6; font-variant-numeric:tabular-nums; }
#pz .augen{ transform-box:fill-box; transform-origin:50% 50%; animation:pzBlinzeln 5s infinite; }
@keyframes pzBlinzeln{ 0%,92%,100%{ transform:scaleY(1); } 95%{ transform:scaleY(.1); } }
@keyframes pzFlacker{ 0%,100%{ transform:scale(1) rotate(-2deg); } 50%{ transform:scale(1.05,.95) rotate(2deg); } }
`;

/* ======================= Klang ======================= */
let ctx = null, tonAn = true;
function ton(f, d = .6, lauts = .08, typ = "sine"){
    if (!tonAn) return;
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime; o.type = typ; o.frequency.value = f; g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(lauts, t + .05); g.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + d + .05); } catch (x) {}
}
// sanftes Rauschen, das beim Einatmen an- und beim Ausatmen abschwillt
let atemQuelle = null;
function atemKlang(ziel, dauer){
    if (!tonAn) return;
    try {
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        if (!atemQuelle){ const n = ctx.sampleRate * 4, b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0); let l = 0; for (let i = 0; i < n; i++){ l = (l + .02 * (Math.random() * 2 - 1)) / 1.02; d[i] = l * 3; } const s = ctx.createBufferSource(); s.buffer = b; s.loop = true; const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 700; const g = ctx.createGain(); g.gain.value = 0; s.connect(f).connect(g).connect(ctx.destination); s.start(); atemQuelle = { s, g }; }
        atemQuelle.g.gain.cancelScheduledValues(ctx.currentTime); atemQuelle.g.gain.linearRampToValueAtTime(ziel, ctx.currentTime + dauer);
    } catch (x) {}
}
function klangAus(){ try { if (atemQuelle){ atemQuelle.s.stop(); atemQuelle = null; } } catch (x) {} }

/* ======================= Runterkommen ======================= */
// Phasen: [art, Sekunden, Text]
function atemPhasen(n, ein, aus, halten){
    const l = []; for (let i = 0; i < n; i++){ l.push(["ein", ein, "Einatmen"]); if (halten) l.push(["halt", halten, "Kurz halten"]); l.push(["aus", aus, "Ausatmen"]); l.push(["pause", 1.2, ""]); } return l;
}
const R = {
  atem: { gs: ["Atem-Ballon", "🎈"], sek: ["Atemkreis", "◯"], text: "Der Kreis wird beim Einatmen groß und beim Ausatmen klein. Alle atmen mit.", farbe: "linear-gradient(135deg,#7fd3e6,#2d5c6e)",
    phasen: e => atemPhasen(e.n, e.ein, e.aus, 0),
    bild(st){ const ball = st.stufe === "gs";
      return `<svg viewBox="0 0 400 400"><defs><radialGradient id="pzK" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="${ball ? "#ffd0c8" : "#d9f6fb"}"/><stop offset=".6" stop-color="${ball ? "#ff7f6e" : "#6cc5d8"}"/><stop offset="1" stop-color="${ball ? "#d9483a" : "#2f8aa3"}"/></radialGradient></defs>
        <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="3"/>
        <circle class="ring" cx="200" cy="200" r="182" fill="none" stroke="rgba(255,255,255,.65)" stroke-width="6" stroke-linecap="round" stroke-dasharray="1144" stroke-dashoffset="1144" transform="rotate(-90 200 200)"/>
        ${ball ? `<path class="schnur" d="M200 300 q-14 40 6 90" stroke="rgba(255,255,255,.7)" stroke-width="3" fill="none"/>` : ""}
        <circle class="kreis" cx="200" cy="200" r="70" fill="url(#pzK)"/>${ball ? `<ellipse class="glanz" cx="170" cy="170" rx="18" ry="26" fill="#fff" opacity=".45"/>` : ""}</svg>`; },
    zeigen(svg, ph, p){ const r = ph[0] === "ein" ? 70 + 100 * ease(p) : ph[0] === "aus" ? 170 - 100 * ease(p) : ph[0] === "halt" ? 170 : 70;
      const k = svg.querySelector(".kreis"); k.setAttribute("r", r.toFixed(1)); const g = svg.querySelector(".glanz"); if (g){ g.setAttribute("cx", 200 - r * .43); g.setAttribute("cy", 200 - r * .43); g.setAttribute("rx", r * .26); g.setAttribute("ry", r * .37); }
      const s = svg.querySelector(".schnur"); if (s) s.setAttribute("d", `M200 ${200 + r} q-14 40 6 ${Math.max(40, 190 - r)}`);
      svg.querySelector(".ring").setAttribute("stroke-dashoffset", (1144 * (1 - p)).toFixed(1)); } },

  blume: { gs: ["Blume & Kerze", "🌷"], sek: null, text: "An der Blume riechen (tief einatmen) – die Kerze auspusten (langsam ausatmen).", farbe: "linear-gradient(135deg,#ffd6e3,#8a4f7d)",
    phasen: e => atemPhasen(e.n, e.ein, e.aus, 0).map(p => p[0] === "ein" ? ["ein", p[1], "An der Blume riechen"] : p[0] === "aus" ? ["aus", p[1], "Die Kerze auspusten"] : p),
    bild(){ return `<svg viewBox="0 0 400 400">
        <g class="blume" style="transition:opacity .8s"><path d="M200 380 C196 320 204 280 200 230" stroke="#4f9a43" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M200 320 C170 300 150 310 140 330 C160 340 184 336 200 320Z M200 300 C230 280 252 290 260 310 C240 320 216 316 200 300Z" fill="#6fbf5a"/>
          <g class="kopf" transform="translate(200 190)">${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-48" rx="34" ry="52" fill="#ff8fb6" transform="rotate(${a})"/>`).join("")}<circle r="30" fill="#ffd84d"/></g></g>
        <g class="kerze" style="transition:opacity .8s;opacity:0"><rect x="165" y="200" width="70" height="170" rx="10" fill="#fff6e8"/><rect x="165" y="200" width="20" height="170" rx="8" fill="#ffffff" opacity=".6"/><line x1="200" y1="200" x2="200" y2="178" stroke="#3a2a20" stroke-width="5"/>
          <g class="flamme" transform="translate(200 176)"><path d="M0 0 C-26 -24 -14 -66 0 -96 C14 -66 26 -24 0 0Z" fill="#ffb03b"/><path d="M0 -6 C-12 -20 -6 -46 0 -62 C6 -46 12 -20 0 -6Z" fill="#fff4b0"/></g>
          <circle cx="200" cy="140" r="80" fill="#ffd27a" opacity=".18"/></g></svg>`; },
    zeigen(svg, ph, p){ const ein = ph[0] === "ein" || ph[0] === "halt", bl = svg.querySelector(".blume"), ke = svg.querySelector(".kerze");
      if (ph[0] !== "pause"){ bl.style.opacity = ein ? 1 : 0; ke.style.opacity = ein ? 0 : 1; }
      svg.querySelector(".kopf").setAttribute("transform", `translate(200 190) scale(${ein ? (1 + .12 * ease(p)).toFixed(3) : 1})`);
      const f = svg.querySelector(".flamme"), neig = ph[0] === "aus" ? Math.sin(Math.min(1, p * 1.2) * Math.PI / 2) * 55 : 0;
      f.setAttribute("transform", `translate(200 176) rotate(${neig.toFixed(1)}) scale(${(1 - neig / 140).toFixed(3)}, ${(1 - neig / 110).toFixed(3)})`); } },

  box: { gs: null, sek: ["Box-Atmung", "⬜"], text: "Atmen im Viereck: einatmen – halten – ausatmen – halten, je gleich lang. Der Punkt zeigt, wo ihr seid.", farbe: "linear-gradient(135deg,#a6c8e0,#24485e)",
    phasen: e => { const t = e.ein, l = []; for (let i = 0; i < e.n; i++) l.push(["ein", t, "Einatmen"], ["halt", t, "Halten"], ["aus", t, "Ausatmen"], ["halt2", t, "Halten"]); return l; },
    bild(){ return `<svg viewBox="0 0 400 400"><rect x="80" y="80" width="240" height="240" rx="20" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="10"/>
        ${[["M100 80 H300", "ein"], ["M320 100 V300", "halt"], ["M300 320 H100", "aus"], ["M80 300 V100", "halt2"]].map(([d, k]) => `<path class="kante k-${k}" d="${d}" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="0"/>`).join("")}
        <text x="200" y="62" text-anchor="middle" font-size="22" font-weight="900" fill="rgba(255,255,255,.7)">einatmen</text><text x="350" y="205" text-anchor="middle" font-size="22" font-weight="900" fill="rgba(255,255,255,.7)" transform="rotate(90 350 205)">halten</text>
        <text x="200" y="355" text-anchor="middle" font-size="22" font-weight="900" fill="rgba(255,255,255,.7)">ausatmen</text><text x="50" y="205" text-anchor="middle" font-size="22" font-weight="900" fill="rgba(255,255,255,.7)" transform="rotate(-90 50 205)">halten</text>
        <circle class="punkt" cx="80" cy="80" r="20" fill="#fff"/></svg>`; },
    zeigen(svg, ph, p){ const ecken = { ein: [[80, 80], [320, 80]], halt: [[320, 80], [320, 320]], aus: [[320, 320], [80, 320]], halt2: [[80, 320], [80, 80]], pause: [[80, 80], [80, 80]] }[ph[0]];
      const x = ecken[0][0] + (ecken[1][0] - ecken[0][0]) * p, y = ecken[0][1] + (ecken[1][1] - ecken[0][1]) * p, c = svg.querySelector(".punkt"); c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1));
      svg.querySelectorAll(".kante").forEach(k => k.setAttribute("opacity", k.classList.contains("k-" + ph[0]) ? .9 : 0)); } },

  glas: { gs: ["Glitzerglas", "✨"], sek: ["Glitzerglas", "✨"], text: "Das Glas wird geschüttelt. Schaut ruhig zu und atmet langsam, bis sich der ganze Glitzer gesetzt hat.", farbe: "linear-gradient(135deg,#c9b8ea,#3c3070)",
    phasen: () => [["glas", 60, "Schaut zu, wie der Glitzer sinkt …"]], canvas: true,
    bild(){ return `<canvas></canvas>`; } },

  sinne: { gs: ["5-4-3-2-1", "👀"], sek: ["5-4-3-2-1 – Ankommen", "👀"], text: "Mit allen Sinnen ankommen: 5 Dinge sehen, 4 hören, 3 fühlen, 2 riechen, 1 schmecken. Tippt für jedes Ding einen Kreis an.", farbe: "linear-gradient(135deg,#ffe3a6,#a8632a)",
    phasen: () => [["s5", 999, "Findet 5 Dinge, die ihr sehen könnt."], ["s4", 999, "Findet 4 Dinge, die ihr hören könnt."], ["s3", 999, "Findet 3 Dinge, die ihr fühlen könnt."], ["s2", 999, "Findet 2 Dinge, die ihr riechen könnt."], ["s1", 999, "Findet 1 Ding, das ihr schmecken könnt."]], manuell: true,
    bild(){ return `<div class="pz-sinne-bild" style="display:flex;flex-direction:column;align-items:center;gap:3vmin;width:100%"><div class="zahl" style="font-size:clamp(90px,24vmin,260px);font-weight:900;line-height:1"></div><div class="pz-sinn"></div></div>`; } },

  pmr: { gs: ["Anspannen & Loslassen", "🍋"], sek: ["Anspannen & Loslassen", "✊"], text: "Einen Körperteil fest anspannen – und dann ganz locker lassen. Wer mag, macht die Augen zu.", farbe: "linear-gradient(135deg,#d8f0c8,#3f7d3a)",
    teile: { gs: [["🍋", "Zitrone auspressen", "Ballt die Hände ganz fest zu Fäusten."], ["🐢", "Schildkröte", "Zieht die Schultern hoch bis zu den Ohren."], ["🐭", "Mäusegesicht", "Kneift Augen und Nase zusammen."], ["🏖️", "Füße in den Sand", "Drückt die Füße fest auf den Boden."]],
             sek: [["✊", "Hände", "Ballt die Hände fest zu Fäusten."], ["⬆️", "Schultern", "Zieht die Schultern hoch zu den Ohren."], ["😣", "Gesicht", "Spannt das ganze Gesicht an."], ["🦶", "Füße & Beine", "Drückt die Füße fest in den Boden."], ["🫁", "Bauch", "Spannt den Bauch fest an."]] },
    phasen(e, st){ const l = []; this.teile[st.stufe].forEach(([i, n, t]) => { l.push(["an", 5, `${n}: anspannen`, i, t], ["los", 9, "Und ganz locker lassen …", i, "Spürt, wie es warm und schwer wird."], ["pause", 1.5, "", i, ""]); }); return l; },
    bild(){ return `<div style="display:flex;flex-direction:column;align-items:center;gap:2vmin;width:100%"><div class="ikon" style="font-size:clamp(100px,26vmin,280px);line-height:1;transition:transform .6s"></div><div class="balken" style="width:min(70vw,520px);height:22px;border-radius:999px;background:rgba(255,255,255,.2);overflow:hidden"><i style="display:block;height:100%;width:0;border-radius:999px;background:#fff"></i></div></div>`; },
    zeigen(box, ph, p){ box.querySelector(".ikon").textContent = ph[3] || ""; box.querySelector(".ikon").style.transform = ph[0] === "an" ? `scale(${(1 - .12 * p).toFixed(3)})` : "scale(1.06)";
      const b = box.querySelector(".balken i"); b.style.width = (ph[0] === "an" ? p * 100 : ph[0] === "los" ? (1 - p) * 100 : 0) + "%"; b.style.background = ph[0] === "an" ? "#ffb3a6" : "#c8f0d0"; } }
};
const ease = p => .5 - .5 * Math.cos(Math.PI * Math.min(1, Math.max(0, p)));

/* Glitzerglas (Canvas) */
function glasLauf(cv){
    const g = cv.getContext("2d"), N = 260, teile = [];
    const farben = ["#ffd84d", "#ff8fb6", "#9fe2ff", "#c8a8ff", "#ffffff", "#7ee29a"];
    const schuetteln = () => { teile.length = 0; for (let i = 0; i < N; i++) teile.push({ x: zuf(.2, .8), y: zuf(.25, .85), vx: zuf(-.5, .5), vy: zuf(-.6, .3), r: zuf(1.6, 3.6), f: farben[i % farben.length], w: zuf(0, 6), s: zuf(.012, .03) }); };
    schuetteln();
    let letzte = performance.now();
    return { schuetteln, schritt(){
        const jetzt = performance.now(), dt = Math.min(.05, (jetzt - letzte) / 1000); letzte = jetzt;
        const r = Math.min(2, devicePixelRatio || 1), W = cv.clientWidth, H = cv.clientHeight; if (cv.width !== Math.round(W * r)){ cv.width = Math.round(W * r); cv.height = Math.round(H * r); } g.setTransform(r, 0, 0, r, 0, 0);
        g.clearRect(0, 0, W, H);
        const x0 = W * .22, x1 = W * .78, y0 = H * .18, y1 = H * .9;
        // Glas
        g.fillStyle = "rgba(255,255,255,.08)"; g.strokeStyle = "rgba(255,255,255,.6)"; g.lineWidth = 5; g.beginPath(); g.roundRect(x0, y0, x1 - x0, y1 - y0, 34); g.fill(); g.stroke();
        g.fillStyle = "#c99a52"; g.beginPath(); g.roundRect(x0 + 10, y0 - 34, x1 - x0 - 20, 34, 10); g.fill();
        g.fillStyle = "rgba(160,200,255,.12)"; g.fillRect(x0 + 6, y0 + 30, x1 - x0 - 12, y1 - y0 - 36);
        let liegen = 0;
        for (const t of teile){
            t.w += dt * 2; t.vx *= .985; t.vy = t.vy * .985 + t.s * dt * 6;   // langsam sinken
            if (t.vy > t.s) t.vy = t.s * 1.2;
            t.x += (t.vx * .05 + Math.sin(t.w) * .0006) * dt * 60 * .4; t.y += t.vy * dt * 60 * .06;
            t.x = Math.max(.24, Math.min(.76, t.x)); if (t.y < .24){ t.y = .24; t.vy = Math.abs(t.vy) * .3; }
            const boden = .88 - (t.r - 1.6) * .004;
            if (t.y >= boden){ t.y = boden; t.vy = 0; t.vx = 0; liegen++; }
            g.globalAlpha = .9; g.fillStyle = t.f; g.save(); g.translate(t.x * W, t.y * H); g.rotate(t.w); g.fillRect(-t.r, -t.r * .6, t.r * 2, t.r * 1.2); g.restore();
        }
        g.globalAlpha = 1;
        g.fillStyle = "rgba(255,255,255,.22)"; g.beginPath(); g.ellipse(x0 + 30, (y0 + y1) / 2, 10, (y1 - y0) * .32, 0, 0, Math.PI * 2); g.fill();
        return liegen / N;
    } };
}

/* ======================= Bewegungspausen ======================= */
// Pose: Arme a = Winkel von unten nach außen, e = Unterarm zusätzlich; Beine h = nach außen, k = Knie (Unterschenkel zurück nach innen), l = Knie heben 0..1; y = Sprung/Hocke; n = Neigung
const P0 = { aL: 12, eL: 0, aR: 12, eR: 0, hL: 6, kL: 0, lL: 0, tL: 0, hR: 6, kR: 0, lR: 0, tR: 0, y: 0, n: 0 };
const pose = o => Object.assign({}, P0, o);
const UEB = [
    { id: "hampel", gs: "Hampelmann", sek: "Hampelmann", tipp: "Arme und Beine gleichzeitig auf und zu.", t: .9, f: [pose({ y: 0 }), pose({ aL: 165, aR: 165, hL: 22, hR: 22, y: -18 })] },
    { id: "laufen", gs: "Auf der Stelle laufen", sek: "Auf der Stelle laufen", tipp: "Knie abwechselnd hoch, Arme schwingen mit.", t: .7, f: [pose({ lL: 1, aR: 40, eR: 70, aL: 5, eL: 50 }), pose({ lR: 1, aL: 40, eL: 70, aR: 5, eR: 50 })] },
    { id: "kniebeuge", gs: "Kniebeugen", sek: "Kniebeugen", tipp: "Langsam in die Hocke und wieder hoch. Arme zur Seite strecken.", t: 2.2, f: [pose({ aL: 80, aR: 80 }), pose({ aL: 85, aR: 85, hL: 30, hR: 30, kL: 62, kR: 62, y: 46 })] },
    { id: "kreisen", gs: "Windmühle", sek: "Arme kreisen", tipp: "Beide Arme groß nach hinten kreisen.", t: 2, kreis: true, f: [pose({})] },
    { id: "strecken", gs: "Groß wie ein Riese – klein wie eine Maus", sek: "Strecken und beugen", tipp: "Ganz lang zur Decke strecken, dann locker nach unten hängen.", t: 3, f: [pose({ aL: 172, aR: 172, y: -8 }), pose({ aL: 175, aR: 175, n: 0, y: 30, kL: 30, kR: 30, hL: 10, hR: 10 })] },
    { id: "seite", gs: "Baum im Wind", sek: "Seitbeuge", tipp: "Einen Arm über den Kopf und zur Seite neigen – dann die andere Seite.", t: 3, f: [pose({ aR: 160, eR: 20, n: -14, hL: 10, hR: 10 }), pose({ aL: 160, eL: 20, n: 14, hL: 10, hR: 10 })] },
    { id: "boxen", gs: "Boxen wie ein Kängurur", sek: "Boxen in die Luft", tipp: "Abwechselnd nach vorn boxen, locker in den Knien.", t: .7, f: [pose({ aL: 90, eL: 0, aR: 40, eR: 110, kL: 12, kR: 12, hL: 12, hR: 12, y: 6 }), pose({ aR: 90, eR: 0, aL: 40, eL: 110, kL: 12, kR: 12, hL: 12, hR: 12, y: 6 })] },
    { id: "flamingo", gs: "Flamingo", sek: "Auf einem Bein stehen", tipp: "Auf einem Bein stehen, Arme zur Seite. Nach der Hälfte wechseln.", t: 6, halb: true, f: [pose({ aL: 90, aR: 90, lR: 1, tR: 1, hR: 4 }), pose({ aL: 90, aR: 90, lL: 1, tL: 1, hL: 4 })] },
    { id: "kreuz", gs: "Überkreuz-Tanz", sek: "Überkreuzbewegung", tipp: "Rechter Ellenbogen zum linken Knie – dann links zu rechts.", t: 1.2, f: [pose({ aR: 120, eR: 150, lL: 1, n: -6 }), pose({ aL: 120, eL: 150, lR: 1, n: 6 })] },
    { id: "schultern", gs: "Schultern kreisen", sek: "Schultern kreisen", tipp: "Schultern langsam nach hinten kreisen, Arme locker.", t: 2, schulter: true, f: [pose({ aL: 8, aR: 8 })] },
    { id: "acht", gs: "Liegende Acht", sek: "Liegende Acht", tipp: "Mit dem Daumen eine große liegende Acht in die Luft malen. Augen folgen dem Daumen.", t: 4, acht: true, f: [pose({})] },
    { id: "schuetteln", gs: "Ausschütteln wie ein nasser Hund", sek: "Ausschütteln", tipp: "Hände, Arme und Beine locker ausschütteln.", t: .25, wackel: true, f: [pose({ aL: 30, aR: 30, eL: 30, eR: 30, kL: 10, kR: 10 }), pose({ aL: 38, aR: 22, eL: 10, eR: 45, kL: 16, kR: 6, y: 4 })] },
    { id: "huepfen", gs: "Hüpfen wie ein Hase", sek: "Hüpfen auf der Stelle", tipp: "Kleine Sprünge auf der Stelle, leise landen.", t: .6, f: [pose({ aL: 30, aR: 30, eL: 60, eR: 60, kL: 18, kR: 18, y: 10 }), pose({ aL: 40, aR: 40, eL: 70, eR: 70, y: -24 })] }
];
UEB.find(u => u.id === "boxen").gs = "Boxen wie ein Känguru";

function mix(a, b, t){ const o = {}; for (const k in P0) o[k] = a[k] + (b[k] - a[k]) * t; return o; }
function figur(v){
    v = v || E.figur || "a";
    const M = v === "b";
    const HOSE = M ? ["#6a4f9a", "#4a3576"] : ["#3f5f8c", "#2a4266"], SHIRT = M ? ["#2fa58f", "#1c7565"] : ["#e85a4c", "#a93a30"], HAUT = ["#f6c4a0", "#c98d68"], HAAR = M ? ["#c9792e", "#9a5520"] : ["#7a4e2e", "#5a3620"];
    const aussen = (k, w, f) => `<path class="${k}" stroke="${f[1]}" stroke-width="${w + 5}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
    const innen = (k, w, f) => `<path class="${k}" stroke="${f[0]}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
    const licht = (k, w) => `<path class="${k}" stroke="#fff" stroke-opacity=".16" stroke-width="${w * .3}" stroke-linecap="round" fill="none" transform="translate(-${w * .2} -1)"/>`;
    const beine = [["oL", 27], ["uL", 23], ["oR", 27], ["uR", 23]], arme = [["uaL", 15, HAUT], ["uaR", 15, HAUT], ["oaL", 22, SHIRT], ["oaR", 22, SHIRT]];
    const schuh = k => `<g class="${k}"><rect x="-9" y="-16" width="18" height="12" rx="4" fill="#fff"/><rect x="-9" y="-12" width="18" height="3" fill="${SHIRT[0]}" opacity=".7"/><path d="M-9 -6 h16 a13 13 0 0 1 13 13 v2 h-36 v-4 a9 9 0 0 1 7 -11Z" fill="${M ? "#e2574c" : "#2d3142"}" stroke="${M ? "#a93a30" : "#16181f"}" stroke-width="2"/><rect x="-16" y="8" width="36" height="4.5" rx="2.2" fill="#fff"/><path d="M-2 -2 l6 3 M2 -4 l6 3" stroke="#fff" stroke-width="1.6" opacity=".7" stroke-linecap="round"/></g>`;
    return `<svg viewBox="0 0 400 400" class="figur fig-${v}"><defs>
        <linearGradient id="pzShirt${v}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${SHIRT[0]}"/><stop offset=".55" stop-color="${SHIRT[0]}"/><stop offset="1" stop-color="${SHIRT[1]}"/></linearGradient>
        <radialGradient id="pzHaut${v}" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#ffdcc0"/><stop offset="1" stop-color="#efb48a"/></radialGradient></defs>
      <ellipse class="schatten" cx="200" cy="374" rx="78" ry="11" fill="rgba(90,50,20,.2)"/>
      <path class="acht" d="" stroke="rgba(58,36,22,.35)" stroke-width="6" fill="none" stroke-dasharray="4 12" stroke-linecap="round"/>
      <g class="koerper">
        ${M ? `<path class="zopf" d="M0 0 C 22 6 30 30 22 58 C 18 70 8 74 2 66 C 12 50 10 24 -6 10Z" fill="${HAAR[0]}" stroke="${HAAR[1]}" stroke-width="2.5"/>` : ""}
        ${beine.map(([k, w]) => aussen(k, w, HOSE)).join("")}${beine.map(([k, w]) => innen(k, w, HOSE)).join("")}${beine.map(([k, w]) => licht(k, w)).join("")}
        ${schuh("schuhL")}${schuh("schuhR")}
        <path class="hosenbund" fill="${HOSE[0]}" stroke="${HOSE[1]}" stroke-width="2.5"/>
        ${arme.slice(2).map(([k, w, f]) => aussen(k, w, f)).join("")}${arme.slice(2).map(([k, w, f]) => innen(k, w, f)).join("")}
        <path class="rumpf" fill="url(#pzShirt${v})" stroke="${SHIRT[1]}" stroke-width="2.5" stroke-linejoin="round"/>
        <path class="kragen" stroke="${SHIRT[1]}" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path class="motiv" d="M0 -11 L3.2 -3.4 L11.4 -3.4 L4.8 1.6 L7.2 9.6 L0 4.8 L-7.2 9.6 L-4.8 1.6 L-11.4 -3.4 L-3.2 -3.4Z" fill="#ffe27a" stroke="#e6b93c" stroke-width="1.5" stroke-linejoin="round"/>
        <path class="saum" stroke="${SHIRT[1]}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/>
        ${arme.slice(0, 2).map(([k, w, f]) => aussen(k, w, f)).join("")}${arme.slice(0, 2).map(([k, w, f]) => innen(k, w, f)).join("")}
        ${arme.slice(2).map(([k, w, f]) => `<path class="${k}e" stroke="${f[0]}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`).join("")}
        <circle class="hand hL" r="10.5" fill="url(#pzHaut${v})" stroke="${HAUT[1]}" stroke-width="2.2"/><circle class="hand hR" r="10.5" fill="url(#pzHaut${v})" stroke="${HAUT[1]}" stroke-width="2.2"/>
        <g class="kopf">
          <rect x="-9" y="22" width="18" height="18" rx="6" fill="#eab088"/>
          <ellipse cx="-33" cy="4" rx="7" ry="9" fill="#f3b993" stroke="${HAUT[1]}" stroke-width="2"/><ellipse cx="33" cy="4" rx="7" ry="9" fill="#f3b993" stroke="${HAUT[1]}" stroke-width="2"/>
          <ellipse cx="0" cy="0" rx="33" ry="35" fill="url(#pzHaut${v})" stroke="${HAUT[1]}" stroke-width="2"/>
          ${M ? `<path d="M-35 4 C-40 -40 -8 -48 6 -46 C30 -46 42 -28 36 6 C30 -12 18 -22 4 -26 C-6 -18 -22 -14 -35 4Z" fill="${HAAR[0]}" stroke="${HAAR[1]}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="28" cy="-26" r="7" fill="#ffd84d" stroke="#e6b93c" stroke-width="2"/>`
               : `<path d="M-35 0 C-38 -38 -12 -46 4 -44 C26 -44 40 -30 35 0 C31 -14 24 -20 14 -22 C10 -14 -2 -12 -12 -18 C-18 -10 -28 -10 -35 0Z" fill="${HAAR[0]}" stroke="${HAAR[1]}" stroke-width="2.5" stroke-linejoin="round"/><path d="M-2 -44 C-6 -56 6 -62 10 -54 C4 -54 2 -50 4 -44Z" fill="${HAAR[0]}" stroke="${HAAR[1]}" stroke-width="2"/>`}
          <path d="M-14 -34 C-6 -40 8 -40 18 -34" stroke="#fff" stroke-opacity=".25" stroke-width="3" fill="none" stroke-linecap="round"/>
          <g class="augen"><ellipse cx="-12" cy="3" rx="4.8" ry="5.8" fill="#2d2a33"/><ellipse cx="12" cy="3" rx="4.8" ry="5.8" fill="#2d2a33"/><circle cx="-10.4" cy="1" r="1.8" fill="#fff"/><circle cx="13.6" cy="1" r="1.8" fill="#fff"/></g>
          <path d="M-18 -8 q6 -4 11 -1 M7 -9 q6 -3 11 1" stroke="${HAAR[1]}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
          <path class="mund" d="M-10 14 q10 10 20 0" stroke="#7a3b2e" stroke-width="3.4" fill="#fff" fill-opacity=".0" stroke-linecap="round"/>
          <ellipse cx="-21" cy="13" rx="6" ry="4" fill="#f4877a" opacity=".45"/><ellipse cx="21" cy="13" rx="6" ry="4" fill="#f4877a" opacity=".45"/>
        </g>
      </g></svg>`;
}
function figurStellen(svg, q, extra){
    const rad = d => d * Math.PI / 180, hy = 230 + q.y, hx = 200, n = rad(q.n);
    const up = [Math.sin(n), -Math.cos(n)], quer = [Math.cos(n), Math.sin(n)];
    const pkt = (b, a, s) => [b[0] + up[0] * a + quer[0] * s, b[1] + up[1] * a + quer[1] * s];
    const sy = 84 + (extra.schulter || 0) * -1;
    const sL = pkt([hx, hy], sy, -31), sR = pkt([hx, hy], sy, 31);
    const armPkt = (s, a, e, links) => { const sg = links ? -1 : 1, A = rad(a), el = [s[0] + sg * Math.sin(A) * 48, s[1] + Math.cos(A) * 48], B = rad(a + e), ha = [el[0] + sg * Math.sin(B) * 46, el[1] + Math.cos(B) * 46]; return [el, ha]; };
    let [eL, hL] = armPkt(sL, q.aL, q.eL, true), [eR, hR] = armPkt(sR, q.aR, q.eR, false);
    if (extra.hand){ hR = extra.hand; const mx = (sR[0] + hR[0]) / 2, my = (sR[1] + hR[1]) / 2, dx = hR[0] - sR[0], dy = hR[1] - sR[1], d = Math.hypot(dx, dy) || 1, bend = Math.max(0, (94 - d) / 2); eR = [mx + dy / d * bend * .9, my - dx / d * bend * .9 + 6]; }
    const bein = (links, h, k, l, tuck) => { const sg = links ? -1 : 1, hp = [hx + sg * 15, hy + 4], H = rad(h);
        let kn = [hp[0] + sg * Math.sin(H) * 74, hp[1] + Math.cos(H) * 74]; const K = rad(h - k); let fu = [kn[0] + sg * Math.sin(K) * 72, kn[1] + Math.cos(K) * 72];
        if (l > 0){ // Knie anheben: Oberschenkel nach vorn (verkürzt), Fuß hängt darunter oder liegt am Standbein
            const kh = [hp[0] + sg * 14, hp[1] + 34], fh = [kh[0] - sg * 4, kh[1] + 60], ft = [hx - sg * 6, hy + 92];
            const fz = tuck ? [fh[0] + (ft[0] - fh[0]) * tuck, fh[1] + (ft[1] - fh[1]) * tuck] : fh;
            kn = [kn[0] + (kh[0] - kn[0]) * l, kn[1] + (kh[1] - kn[1]) * l]; fu = [fu[0] + (fz[0] - fu[0]) * l, fu[1] + (fz[1] - fu[1]) * l]; }
        return [hp, kn, fu, sg]; };
    const [hpL, knL, fuL] = bein(true, q.hL, q.kL, q.lL, q.tL || 0), [hpR, knR, fuR] = bein(false, q.hR, q.kR, q.lR, q.tR || 0);
    const P = a => a[0].toFixed(1) + " " + a[1].toFixed(1);
    const setz = (k, d) => svg.querySelectorAll("." + k).forEach(e => e.setAttribute("d", d));
    setz("oL", `M${P(hpL)} L${P(knL)}`); setz("uL", `M${P(knL)} L${P(fuL)}`); setz("oR", `M${P(hpR)} L${P(knR)}`); setz("uR", `M${P(knR)} L${P(fuR)}`);
    const schuh = (k, f, sg, l) => svg.querySelector(k).setAttribute("transform", `translate(${(f[0] + sg * 4).toFixed(1)} ${(f[1] + 4).toFixed(1)}) scale(${sg} 1) rotate(${(l * 30).toFixed(1)})`);
    schuh(".schuhL", fuL, -1, q.lL); schuh(".schuhR", fuR, 1, q.lR);
    const w1 = pkt([hx, hy], 6, -27), w2 = pkt([hx, hy], 6, 27), b1 = pkt([hx, hy], -12, -27), b2 = pkt([hx, hy], -12, 27);
    svg.querySelector(".hosenbund").setAttribute("d", `M${P(w1)} L${P(w2)} L${P(b2)} Q${P(pkt([hx, hy], -20, 0))} ${P(b1)}Z`);
    const hs = pkt([hx, hy], sy + 10, 0), sl = pkt([hx, hy], sy + 2, -40), sr = pkt([hx, hy], sy + 2, 40), al = pkt([hx, hy], sy - 22, -36), ar = pkt([hx, hy], sy - 22, 36), wl = pkt([hx, hy], 10, -29), wr = pkt([hx, hy], 10, 29);
    svg.querySelector(".rumpf").setAttribute("d", `M${P(pkt([hx, hy], sy + 8, -14))} Q${P(hs)} ${P(pkt([hx, hy], sy + 8, 14))} Q${P(sr)} ${P(ar)} L${P(wr)} Q${P(pkt([hx, hy], 2, 0))} ${P(wl)} L${P(al)} Q${P(sl)} ${P(pkt([hx, hy], sy + 8, -14))}Z`);
    svg.querySelector(".saum").setAttribute("d", `M${P(pkt([hx, hy], 16, -24))} Q${P(pkt([hx, hy], 9, 0))} ${P(pkt([hx, hy], 16, 24))}`);
    // Oberarm = Ärmel bis zur Hälfte, dann Haut
    const mitte = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const iL = pkt([hx, hy], sy - 8, -18), iR = pkt([hx, hy], sy - 8, 18);
    setz("oaL", `M${P(iL)} L${P(sL)} L${P(mitte(sL, eL, .6))}`); setz("oaR", `M${P(iR)} L${P(sR)} L${P(mitte(sR, eR, .6))}`);
    setz("oaLe", `M${P(mitte(sL, eL, .5))} L${P(mitte(sL, eL, .6))}`); setz("oaRe", `M${P(mitte(sR, eR, .5))} L${P(mitte(sR, eR, .6))}`);
    svg.querySelector(".kragen").setAttribute("d", `M${P(pkt([hx, hy], sy + 6, -13))} Q${P(pkt([hx, hy], sy - 6, 0))} ${P(pkt([hx, hy], sy + 6, 13))}`);
    svg.querySelector(".motiv").setAttribute("transform", `translate(${P(pkt([hx, hy], sy - 38, 0))}) rotate(${q.n.toFixed(1)})`);
    const zo = svg.querySelector(".zopf"); if (zo){ const zp = pkt([hx, hy], sy + 70, 24); zo.setAttribute("transform", `translate(${P(zp)}) rotate(${(q.n * .6 - q.y * .6 + Math.sin(performance.now() / 300) * 4).toFixed(1)})`); }
    setz("uaL", `M${P(mitte(sL, eL, .5))} L${P(eL)} L${P(hL)}`); setz("uaR", `M${P(mitte(sR, eR, .5))} L${P(eR)} L${P(hR)}`);
    svg.querySelector(".hL").setAttribute("cx", hL[0].toFixed(1)); svg.querySelector(".hL").setAttribute("cy", hL[1].toFixed(1));
    svg.querySelector(".hR").setAttribute("cx", hR[0].toFixed(1)); svg.querySelector(".hR").setAttribute("cy", hR[1].toFixed(1));
    const kp = pkt([hx, hy], sy + 56, 0); svg.querySelector(".kopf").setAttribute("transform", `translate(${P(kp)}) rotate(${(q.n * .6).toFixed(1)}) scale(1.12)`);
    const sch = svg.querySelector(".schatten"); const sc = 1 - Math.max(0, -q.y) / 90; sch.setAttribute("rx", (78 * sc).toFixed(1)); sch.setAttribute("opacity", sc.toFixed(2));
}
function uebungPose(u, zeit, stufe){
    const f = u.f, ph = (zeit / u.t);
    if (u.kreis){ const a = (zeit / u.t) * 360; return [pose({ aL: 90 + 80 * Math.sin(a * Math.PI / 180), aR: 90 + 80 * Math.sin(a * Math.PI / 180) }), {}]; }
    if (u.schulter){ const a = (zeit / u.t) * Math.PI * 2; return [pose({ aL: 8, aR: 8 }), { schulter: -(8 * Math.sin(a) + 4) }]; }
    if (u.acht){ const a = (zeit / u.t) * Math.PI * 2, x = 200 + 110 * Math.sin(a), y = 150 + 45 * Math.sin(2 * a); return [pose({ aL: 10 }), { hand: [x, y] }]; }
    if (u.halb) return [f[Math.floor(ph) % 2 === 0 ? 0 : 1], {}];
    const i = Math.floor(ph) % f.length, j = (i + 1) % f.length, t = ease(ph % 1);
    return [mix(f[i], f[j], t), {}];
}

/* ======================= Ablauf ======================= */
const E = { stufe: "gs", n: 5, tempo: "ruhig", ueb: 6, dauer: 30, ton: true, figur: "a" };
try { Object.assign(E, JSON.parse(localStorage.getItem("lt-pausen") || "{}")); } catch (x) {}
const merken = () => { try { localStorage.setItem("lt-pausen", JSON.stringify(E)); } catch (x) {} };
const TEMPO = { ruhig: [4, 6], langsam: [5, 7], kurz: [3, 4] };
let el, bereich = "runter", raf = 0, lauf = null;

function aufbauen(){
    if (el) return;
    const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    el = document.createElement("div"); el.id = "pz"; document.body.appendChild(el);
    el.addEventListener("click", klick);
}
function kopf(titel){ return `<div class="pz-kopf"><span class="titel">${titel}</span><button class="pz-k" data-a="ton">${E.ton ? "🔔" : "🔕"}</button><button class="pz-k" data-a="voll">⛶</button><button class="pz-k" data-a="zu">✕</button></div>`; }

function wahl(){
    stopp();
    el.className = "an" + (bereich === "bewegung" ? " bewegt" : "");
    const st = E.stufe, einst = `<div class="pz-einst"><b>Für</b><span class="pz-reihe"><button data-e="stufe=gs" class="${st === "gs" ? "an" : ""}">Grundschule</button><button data-e="stufe=sek" class="${st === "sek" ? "an" : ""}">Klasse 5–9</button></span>`;
    if (bereich === "runter"){
        const karten = Object.entries(R).filter(([, r]) => r[st]).map(([k, r]) => `<button class="pz-karte" data-r="${k}"><div class="b" style="background:${r.farbe}">${r[st][1]}</div><div class="t"><h3>${r[st][0]}</h3><p>${r.text}</p></div></button>`).join("");
        el.innerHTML = kopf("🌿 Runterkommen") + `<div class="pz-buehne"><div class="pz-wahl"><h2>🌿 Runterkommen</h2><div class="hint">Kurze Übungen, um ruhig zu werden – nach der Pause, nach Streit oder vor einer Arbeitsphase. Die Anleitung steht groß an der Tafel.</div>
          <div class="pz-karten">${karten}</div>
          ${einst}<b>Atemzüge</b><span class="pz-reihe">${[3, 5, 8].map(v => `<button data-e="n=${v}" class="${E.n === v ? "an" : ""}">${v}</button>`).join("")}</span><b>Tempo</b><span class="pz-reihe">${[["kurz", "kürzer"], ["ruhig", "ruhig"], ["langsam", "ganz langsam"]].map(([k, t]) => `<button data-e="tempo=${k}" class="${E.tempo === k ? "an" : ""}">${t}</button>`).join("")}</span></div></div></div>`;
    } else {
        const karten = UEB.map(u => `<button class="pz-karte" data-u="${u.id}"><div class="b" style="background:linear-gradient(135deg,#fff1d6,#ffc98a)"><svg viewBox="0 0 400 400" style="height:92px">${figur().replace(/^<svg[^>]*>|<\/svg>$/g, "")}</svg></div><div class="t"><h3>${u[st]}</h3><p>${u.tipp}</p></div></button>`).join("");
        el.innerHTML = kopf("🤸 Bewegungspause") + `<div class="pz-buehne"><div class="pz-wahl"><h2>🤸 Bewegungspause</h2><div class="hint">Die Figur macht jede Übung vor – am Platz und daneben. Starte ein ganzes Programm oder tippe eine einzelne Übung an.</div>
          ${einst}<b>Figur</b><span class="pz-reihe">${[["a", "🧒 Ben"], ["b", "👧 Lena"]].map(([k, t]) => `<button data-e="figur=${k}" class="${E.figur === k ? "an" : ""}">${t}</button>`).join("")}</span><b>Übungen</b><span class="pz-reihe">${[4, 6, 8].map(v => `<button data-e="ueb=${v}" class="${E.ueb === v ? "an" : ""}">${v}</button>`).join("")}</span><b>Je</b><span class="pz-reihe">${[20, 30, 45].map(v => `<button data-e="dauer=${v}" class="${E.dauer === v ? "an" : ""}">${v} Sek.</button>`).join("")}</span></div>
          <div class="pz-start"><button data-a="programm">▶ Programm starten (${E.ueb} Übungen, ca. ${Math.round(E.ueb * (E.dauer + 4) / 60)} Min.)</button></div>
          <div class="pz-gruppe" style="max-width:1100px;margin:18px auto 8px;font-weight:900;opacity:.75;text-transform:uppercase;letter-spacing:.08em;font-size:13px">Oder eine Übung</div>
          <div class="pz-karten">${karten}</div></div></div>`;
        el.querySelectorAll(".pz-karte svg").forEach((s, i) => { const [q, x] = uebungPose(UEB[i], UEB[i].t * .5, st); figurStellen(s, q, x); });
    }
}

/* --- Runterkommen ausführen --- */
function runterStarten(k){
    const r = R[k], st = E.stufe, [ein, aus] = TEMPO[E.tempo];
    const phasen = r.phasen.call(r, { n: E.n, ein, aus }, { stufe: st });
    el.className = "an";
    el.innerHTML = kopf(`🌿 ${r[st][0]}`) + `<div class="pz-buehne"><div class="pz-bild">${r.bild({ stufe: st })}</div><div class="pz-text"></div><div class="pz-unter"></div><div class="pz-punkte"></div></div>
      <div class="pz-fuss">${r.manuell ? `<button class="haupt" data-a="weiter">Weiter ▶</button>` : ""}${k === "glas" ? `<button class="haupt" data-a="schuetteln">✨ Schütteln</button>` : ""}<button data-a="pause">⏸ Pause</button><button data-a="wahl">Andere Übung</button></div>`;
    const bild = el.querySelector(".pz-bild"), txt = el.querySelector(".pz-text"), unt = el.querySelector(".pz-unter"), pkt = el.querySelector(".pz-punkte");
    const atemzuege = phasen.filter(p => p[0] === "ein").length;
    let i = 0, t = 0, letzte = performance.now(), pausiert = false, glas = r.canvas ? glasLauf(bild.querySelector("canvas")) : null, sinnAn = 0;
    const phaseBeginn = () => {
        const ph = phasen[i]; txt.textContent = ph[2]; unt.textContent = ph[4] || (k === "glas" ? "Atmet dabei ruhig ein und aus." : "");
        if (ph[0] === "ein") { atemKlang(.18, ph[1]); ton(392, .8, .05); } else if (ph[0] === "aus") { atemKlang(.02, ph[1]); ton(294, 1, .05); } else if (ph[0] === "an") ton(330, .5, .05); else if (ph[0] === "los") ton(262, 1.2, .05);
        if (ph[0].startsWith("s")){ const n = +ph[0].slice(1); sinnAn = 0; bild.querySelector(".zahl").textContent = n; bild.querySelector(".pz-sinn").innerHTML = Array.from({ length: n }, (_, j) => `<button data-sinn="${j}" aria-label="gefunden"></button>`).join(""); unt.textContent = ["", "👅 schmecken", "👃 riechen", "✋ fühlen", "👂 hören", "👀 sehen"][n]; }
        if (atemzuege) pkt.innerHTML = Array.from({ length: atemzuege }, (_, j) => `<i class="${j < phasen.slice(0, i).filter(p => p[0] === "ein").length ? "ok" : ""}"></i>`).join("");
    };
    phaseBeginn();
    lauf = { weiter(){ i++; t = 0; if (i >= phasen.length) return fertig(); phaseBeginn(); }, pause(){ pausiert = !pausiert; return pausiert; }, schuetteln(){ glas && glas.schuetteln(); t = 0; ton(660, .3, .05); }, sinn(j){ const b = bild.querySelectorAll(".pz-sinn button")[j]; if (b && !b.classList.contains("an")){ b.classList.add("an"); ton(523 + j * 60, .4, .05); sinnAn++; if (sinnAn >= +phasen[i][0].slice(1)) setTimeout(() => lauf && lauf.weiter(), 900); } } };
    const schritt = jetzt => {
        raf = requestAnimationFrame(schritt);
        const dt = Math.min(.1, (jetzt - letzte) / 1000); letzte = jetzt; if (pausiert) return;
        const ph = phasen[i]; if (!ph) return;
        if (glas){ const liegt = glas.schritt(); t += dt; if (liegt > .97 && t > 8){ txt.textContent = "Alles hat sich gesetzt."; unt.textContent = "Schön ruhig. Noch einmal schütteln?"; } return; }
        if (r.manuell) return;
        t += dt; const p = Math.min(1, t / ph[1]);
        if (r.zeigen) r.zeigen(bild.firstElementChild ? (bild.querySelector("svg") || bild.firstElementChild) : bild, ph, p);
        if (t >= ph[1]) lauf.weiter();
    };
    raf = requestAnimationFrame(schritt);
    function fertig(){
        cancelAnimationFrame(raf); atemKlang(0, 1.5); [523, 659, 784].forEach((f, j) => setTimeout(() => ton(f, 1.4, .05, "triangle"), j * 260));
        txt.textContent = "Gut gemacht."; unt.innerHTML = st === "gs" ? "Wie geht es dir jetzt? Zeigt eure Karte: 🟢 besser · 🔴 noch nicht so gut" : "Kurz nachspüren – dann geht es weiter.";
        el.querySelector(".pz-fuss").innerHTML = `<button class="haupt" data-r="${k}">Noch einmal</button><button data-a="wahl">Andere Übung</button>`;
    }
}

/* --- Bewegung ausführen --- */
function bewegungStarten(liste){
    const st = E.stufe, dauer = E.dauer;
    el.className = "an bewegt";
    el.innerHTML = kopf("🤸 Bewegungspause") + `<div class="pz-buehne"><div class="pz-text"></div><div class="pz-bild">${figur()}</div><div class="pz-unter"></div><div class="pz-punkte"></div><div class="pz-ring"></div></div>
      <div class="pz-fuss"><button data-a="pause">⏸ Pause</button><button data-a="weiter">Nächste ▶</button><button data-a="wahl">Übersicht</button></div>`;
    const svg = el.querySelector(".figur"), txt = el.querySelector(".pz-text"), unt = el.querySelector(".pz-unter"), pkt = el.querySelector(".pz-punkte"), ring = el.querySelector(".pz-ring"), acht = svg.querySelector(".acht");
    let i = 0, t = 0, vor = 3.5, letzte = performance.now(), pausiert = false, zeit = 0, letzterTakt = 0;
    const zeigeNamen = () => { const u = liste[i]; txt.textContent = (vor > 0 ? "Gleich: " : "") + u[st]; unt.textContent = u.tipp; pkt.innerHTML = liste.map((_, j) => `<i class="${j < i ? "ok" : ""}"></i>`).join(""); acht.setAttribute("d", u.acht ? "M200 150 C 250 60, 330 90, 310 150 C 290 210, 230 190, 200 150 C 170 110, 110 90, 90 150 C 70 210, 150 240, 200 150" : ""); };
    zeigeNamen(); ton(440, .4, .05);
    lauf = { weiter(){ i++; t = 0; vor = 3.5; if (i >= liste.length) return fertig(); zeigeNamen(); ton(440, .4, .05); }, pause(){ pausiert = !pausiert; return pausiert; } };
    const schritt = jetzt => {
        raf = requestAnimationFrame(schritt);
        const dt = Math.min(.1, (jetzt - letzte) / 1000); letzte = jetzt; if (pausiert) return;
        const u = liste[i]; if (!u) return;
        if (vor > 0){ vor -= dt; ring.textContent = Math.ceil(vor); const [q, x] = uebungPose(u, 0, st); figurStellen(svg, q, x); if (vor <= 0){ zeigeNamen(); ton(660, .3, .07); } return; }
        t += dt; zeit += dt;
        const [q, x] = uebungPose(u, t, st); figurStellen(svg, q, x);
        if (u.halb && Math.floor(t / u.t) !== Math.floor((t - dt) / u.t)) ton(520, .2, .04);
        const rest = Math.max(0, dauer - t); ring.textContent = Math.ceil(rest) + " s";
        if (rest <= 3 && Math.ceil(rest) !== letzterTakt){ letzterTakt = Math.ceil(rest); if (rest > 0) ton(880, .12, .04); }
        if (t >= dauer) lauf.weiter();
    };
    raf = requestAnimationFrame(schritt);
    function fertig(){
        cancelAnimationFrame(raf); [523, 659, 784, 1047].forEach((f, j) => setTimeout(() => ton(f, .5, .06, "triangle"), j * 160));
        txt.textContent = st === "gs" ? "Super – der Kopf-Akku ist wieder voll! 🔋" : "Geschafft – weiter geht's!"; unt.textContent = "Setzt euch ruhig hin und atmet einmal tief durch.";
figurStellen(svg, pose({ aL: 150, aR: 150 }), {}); ring.textContent = "";
        pkt.innerHTML = liste.map(() => `<i class="ok"></i>`).join("");
        el.querySelector(".pz-fuss").innerHTML = `<button class="haupt" data-a="programm">Noch ein Programm</button><button data-a="wahl">Übersicht</button>`;
    }
}
function programm(){
    // Mischung: abwechselnd aktiv und ruhiger, zum Schluss ausschütteln
    const aktiv = mischen(UEB.filter(u => ["hampel", "laufen", "kniebeuge", "boxen", "huepfen", "kreuz"].includes(u.id))), ruhig = mischen(UEB.filter(u => ["kreisen", "strecken", "seite", "flamingo", "schultern", "acht"].includes(u.id)));
    const l = []; while (l.length < E.ueb - 1 && (aktiv.length || ruhig.length)) { const q = l.length % 2 ? ruhig : aktiv; if (q.length) l.push(q.shift()); else l.push((q === aktiv ? ruhig : aktiv).shift()); }
    l.push(UEB.find(u => u.id === "schuetteln"));
    bewegungStarten(l);
}

function stopp(){ cancelAnimationFrame(raf); raf = 0; lauf = null; klangAus(); }
function klick(e){
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.sinn !== undefined){ lauf && lauf.sinn(+t.dataset.sinn); return; }
    if (t.dataset.e){ const [k, v] = t.dataset.e.split("="); E[k] = isNaN(+v) ? v : +v; merken(); return wahl(); }
    if (t.dataset.r) return runterStarten(t.dataset.r);
    if (t.dataset.u) return bewegungStarten([UEB.find(u => u.id === t.dataset.u)]);
    const a = t.dataset.a;
    if (a === "programm") return programm();
    if (a === "wahl") return wahl();
    if (a === "weiter") return lauf && lauf.weiter();
    if (a === "schuetteln") return lauf && lauf.schuetteln();
    if (a === "pause"){ if (lauf){ const p = lauf.pause(); t.textContent = p ? "▶ Weiter" : "⏸ Pause"; } return; }
    if (a === "ton"){ E.ton = tonAn = !E.ton; merken(); t.textContent = E.ton ? "🔔" : "🔕"; if (!tonAn) klangAus(); return; }
    if (a === "voll") return window.vollbild ? window.vollbild() : null;
    if (a === "zu") return schliessen();
}
function oeffnen(b, stufe){
    aufbauen(); bereich = b; tonAn = E.ton; if (stufe) { E.stufe = stufe; merken(); }
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "none";
    try { history.replaceState(null, "", "#" + b); } catch (x) {}
    wahl();
}
function schliessen(){ stopp(); el.className = ""; el.innerHTML = ""; const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = ""; try { history.replaceState(null, "", location.pathname); } catch (x) {} }
window.tafelPausen = { runter: s => oeffnen("runter", s), bewegung: s => oeffnen("bewegung", s), schliessen, _UEB: UEB, _stell: (s, q) => figurStellen(s, Object.assign({}, P0, q), {}) };
document.addEventListener("DOMContentLoaded", () => { if (location.hash === "#runter") oeffnen("runter"); if (location.hash === "#bewegung") oeffnen("bewegung"); });
})();
