/* ===============================================================
   Ruhige Arbeitszeit – Bild und leiser Klang, die nebenbei laufen
   (kein Mikrofon, keine Punkte, nichts, was ablenkt)
   Kl. 1/2: Aquarium · Wolkenwiese
   Kl. 3/4: Regen am Fenster · Lagerfeuer
   Kl. 5–9: Stadt bei Regen · Meer · Polarlicht
   Der Klang wird im Browser erzeugt (keine Musikdateien).
   =============================================================== */
(function(){
"use strict";

const BILD = k => (window.LT_BILDER && window.LT_BILDER[k]) ? window.LT_BILDER[k][2] : "";
const zuf = (a, b) => a + Math.random() * (b - a);
const WOLKE = (id, w = 240, farbe = ["#fff", "#f4f8fc", "#c9d8e8"]) => `<svg viewBox="0 0 240 120" style="width:${w}px;overflow:visible" aria-hidden="true"><defs><radialGradient id="${id}" cx=".45" cy=".3" r=".8"><stop offset="0" stop-color="${farbe[0]}"/><stop offset=".65" stop-color="${farbe[1]}"/><stop offset="1" stop-color="${farbe[2]}"/></radialGradient><filter id="${id}b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.4"/></filter></defs>
  <g filter="url(#${id}b)" fill="url(#${id})"><circle cx="70" cy="76" r="34"/><circle cx="110" cy="56" r="44"/><circle cx="160" cy="66" r="38"/><circle cx="196" cy="84" r="26"/><circle cx="40" cy="90" r="22"/><rect x="40" y="80" width="160" height="30" rx="15"/></g></svg>`;

/* ======================= Klang ======================= */
const Klang = (() => {
    let ctx = null, master = null, knoten = [], timer = [], vol = .5;
    let noiseBuf = null;
    function rauschen(art){
        // weißes, rosa oder braunes Rauschen (10 s, in Schleife)
        const n = ctx.sampleRate * 10, b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, last = 0;
        for (let i = 0; i < n; i++){
            const w = Math.random() * 2 - 1;
            if (art === "braun"){ last = (last + .02 * w) / 1.02; d[i] = last * 3.2; }
            else if (art === "rosa"){ b0 = .99765 * b0 + w * .099; b1 = .963 * b1 + w * .2965; b2 = .57 * b2 + w * 1.0526; d[i] = (b0 + b1 + b2 + w * .1848) * .18; }
            else d[i] = w * .5;
        }
        return b;
    }
    const puffer = {};
    function quelle(art){ if (!puffer[art]) puffer[art] = rauschen(art); const s = ctx.createBufferSource(); s.buffer = puffer[art]; s.loop = true; s.start(0, Math.random() * 9); knoten.push(s); return s; }
    function filter(typ, f, q = .7){ const x = ctx.createBiquadFilter(); x.type = typ; x.frequency.value = f; x.Q.value = q; return x; }
    function gain(v){ const g = ctx.createGain(); g.gain.value = v; return g; }
    function lfo(ziel, frei, tiefe, basis){ const o = ctx.createOscillator(), g = gain(tiefe); o.frequency.value = frei; o.connect(g).connect(ziel); ziel.value = basis; o.start(); knoten.push(o); }
    function immer(f, a, b){ let aus = false; const lauf = () => { if (aus) return; f(); timer.push(setTimeout(lauf, zuf(a, b))); }; timer.push(setTimeout(lauf, zuf(a, b) * .3)); }
    function ton(freq, dauer, lauts, typ = "sine", ziel = master, an = .02){
        const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
        o.type = typ; o.frequency.value = freq;
        g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(lauts, t + an); g.gain.exponentialRampToValueAtTime(.0001, t + dauer);
        o.connect(g).connect(ziel); o.start(t); o.stop(t + dauer + .1);
        return o;
    }
    function knack(lauts, hp = 2000){ const s = ctx.createBufferSource(); s.buffer = puffer.weiss || (puffer.weiss = rauschen("weiss")); const f = filter("highpass", hp), g = ctx.createGain(), t = ctx.currentTime, d = zuf(.01, .05);
        g.gain.setValueAtTime(lauts, t); g.gain.exponentialRampToValueAtTime(.0001, t + d); s.connect(f).connect(g).connect(master); s.start(t, Math.random() * 9); s.stop(t + d + .02); }

    const ARTEN = {
        regen(st = 1){ const s = quelle("rosa"), hp = filter("highpass", 500), lp = filter("lowpass", 6000), g = gain(.55 * st); s.connect(hp).connect(lp).connect(g).connect(master);
            const s2 = quelle("braun"), g2 = gain(.25 * st); s2.connect(filter("lowpass", 400)).connect(g2).connect(master);
            immer(() => knack(zuf(.02, .06) * st, 3000), 60, 260); },
        tropfen(){ immer(() => ton(zuf(1800, 3200), .08, .015, "sine"), 900, 3000); },
        meer(){ const s = quelle("braun"), lp = filter("lowpass", 700), g = gain(.4); s.connect(lp).connect(g).connect(master); lfo(g.gain, 1 / 9, .32, .42); lfo(lp.frequency, 1 / 9, 350, 750);
            const s2 = quelle("rosa"), hp = filter("highpass", 1500), g2 = gain(.06); s2.connect(hp).connect(g2).connect(master); lfo(g2.gain, 1 / 9, .05, .06); },
        wasser(){ const s = quelle("braun"), g = gain(.14); s.connect(filter("lowpass", 300)).connect(g).connect(master); },
        blubb(){ immer(() => { const n = 1 + Math.floor(Math.random() * 3); for (let i = 0; i < n; i++) setTimeout(() => { if (!ctx) return; const o = ton(zuf(300, 700), .18, .035, "sine"); o.frequency.exponentialRampToValueAtTime(zuf(900, 1400), ctx.currentTime + .12); }, i * zuf(90, 180)); }, 2500, 7000); },
        wind(){ const s = quelle("rosa"), bp = filter("bandpass", 500, .6), g = gain(.09); s.connect(bp).connect(g).connect(master); lfo(bp.frequency, 1 / 14, 250, 550); lfo(g.gain, 1 / 11, .05, .09); },
        spieluhr(){ const NOTEN = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.5];
            const hall = ctx.createDelay(1.5), hg = gain(.32); hall.delayTime.value = .42; hall.connect(hg).connect(hall); const hallAus = gain(.5); hall.connect(hallAus).connect(master);
            const bus = gain(1); bus.connect(master); bus.connect(hall); knoten.push(bus);
            immer(() => { const n = 1 + Math.floor(Math.random() * 3); let k = Math.floor(Math.random() * NOTEN.length); for (let i = 0; i < n; i++) setTimeout(() => { if (!ctx) return; ton(NOTEN[k], 2.6, .03, "triangle", bus, .005); ton(NOTEN[k] * 2, 1.2, .006, "sine", bus, .005); k = Math.max(0, Math.min(NOTEN.length - 1, k + [-2, -1, 1, 2][Math.floor(Math.random() * 4)])); }, i * 520); }, 3500, 8000); },
        feuer(){ const s = quelle("braun"), g = gain(.22); s.connect(filter("lowpass", 500)).connect(g).connect(master); lfo(g.gain, .23, .06, .22);
            immer(() => { const n = Math.random() < .3 ? 3 : 1; for (let i = 0; i < n; i++) setTimeout(() => ctx && knack(zuf(.05, .16), zuf(1200, 3500)), i * zuf(30, 90)); }, 120, 700); },
        grillen(){ immer(() => { const f = zuf(4200, 4800); for (let i = 0; i < 3; i++) setTimeout(() => ctx && ton(f, .05, .006, "sine"), i * 70); }, 1800, 5000); },
        flaeche(tief = false){ // ruhige Klangfläche, wechselt langsam die Akkorde
            const AKK = tief ? [[65.4, 98, 130.8], [55, 82.4, 110], [58.3, 87.3, 116.5], [49, 73.4, 98]] : [[130.8, 196, 261.6, 329.6], [110, 164.8, 220, 261.6], [116.5, 174.6, 233.1, 293.7], [98, 146.8, 196, 246.9]];
            const lp = filter("lowpass", tief ? 600 : 900), bus = gain(tief ? .05 : .035); lp.connect(bus).connect(master); lfo(lp.frequency, 1 / 17, tief ? 200 : 300, tief ? 600 : 900); knoten.push(lp, bus);
            let i = 0;
            const spiel = () => { if (!ctx) return; const t = ctx.currentTime; AKK[i++ % AKK.length].forEach(f => [0, 1.003].forEach(det => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = tief ? "sine" : "triangle"; o.frequency.value = f * (det || 1); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.5, t + 6); g.gain.setValueAtTime(.5, t + 16); g.gain.exponentialRampToValueAtTime(.0001, t + 24); o.connect(g).connect(lp); o.start(t); o.stop(t + 24.5); })); };
            spiel(); const id = setInterval(spiel, 18000); timer.push({ iv: id }); }
    };
    return {
        an(arten){
            this.aus();
            try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (x) { return false; }
            master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
            master.gain.linearRampToValueAtTime(vol * .9, ctx.currentTime + 4);   // sanft einblenden
            arten.forEach(a => { const [n, p] = a.split(":"); if (ARTEN[n]) ARTEN[n](p === "leise" ? .5 : p === "tief" ? true : undefined); });
            return true;
        },
        aus(){
            timer.forEach(t => t && t.iv ? clearInterval(t.iv) : clearTimeout(t)); timer = [];
            knoten.forEach(k => { try { k.stop && k.stop(); k.disconnect && k.disconnect(); } catch (x) {} }); knoten = [];
            if (ctx) { const c = ctx; try { master.gain.linearRampToValueAtTime(0, c.currentTime + .4); } catch (x) {} setTimeout(() => { try { c.close(); } catch (x) {} }, 500); }
            ctx = null; master = null; for (const k in puffer) delete puffer[k];
        },
        lautstaerke(v){ vol = v; if (ctx && master) master.gain.linearRampToValueAtTime(v * .9, ctx.currentTime + .3); },
        laeuft(){ return !!ctx; }
    };
})();

/* ======================= Aussehen ======================= */
const CSS = `
#rz{ position:fixed; inset:0; z-index:14; display:none; background:#0d1424; font-family:"Nunito",sans-serif; user-select:none; -webkit-user-select:none; overflow:hidden; }
#rz.an{ display:block; }
.rz-szene{ position:absolute; inset:0; overflow:hidden; }
.rz-szene svg.voll, .rz-szene canvas.voll{ position:absolute; inset:0; width:100%; height:100%; }
.rz-korn{ position:absolute; inset:0; z-index:5; pointer-events:none; opacity:.1; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
.rz-vign{ position:absolute; inset:0; z-index:5; pointer-events:none; background:radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,.32) 100%); }
.rz-leiste{ position:absolute; top:10px; left:12px; right:12px; z-index:10; display:flex; gap:8px; align-items:center; opacity:.22; transition:opacity .5s; }
.rz-leiste:hover, #rz.menue .rz-leiste{ opacity:1; }
.rz-titel{ margin-right:auto; color:#fff; font-weight:900; font-size:17px; text-shadow:0 2px 8px rgba(0,0,0,.5); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.rz-k{ font:800 15px "Nunito",sans-serif; border:0; border-radius:999px; min-width:46px; height:46px; padding:0 14px; background:rgba(255,255,255,.2); color:#fff; cursor:pointer; backdrop-filter:blur(6px); display:inline-flex; align-items:center; justify-content:center; gap:6px; white-space:nowrap; }
.rz-k:hover{ background:rgba(255,255,255,.32); }
.rz-menue{ position:absolute; top:64px; right:12px; z-index:11; width:min(380px,calc(100vw - 24px)); max-height:calc(100% - 80px); overflow:auto; background:#fff; color:#1f2d36; border-radius:20px; padding:14px 16px 16px; box-shadow:0 20px 50px rgba(0,0,0,.35); display:none; }
#rz.menue .rz-menue{ display:block; }
.rz-menue h4{ margin:12px 0 6px; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:#7c8a96; }
.rz-menue h4:first-child{ margin-top:0; }
.rz-reihe{ display:flex; flex-wrap:wrap; gap:6px; }
.rz-reihe button{ font:800 14px "Nunito",sans-serif; border:2px solid #dfe5ea; background:#fff; color:#1f2d36; border-radius:999px; padding:7px 12px; cursor:pointer; min-height:40px; }
.rz-reihe button.an{ background:#28465f; border-color:#28465f; color:#fff; }
.rz-menue label{ display:flex; align-items:center; gap:8px; font-weight:800; font-size:14px; color:#5b6670; }
.rz-menue input[type=range]{ flex:1; }
.rz-start{ position:absolute; left:50%; bottom:8%; transform:translateX(-50%); z-index:9; font:900 18px "Nunito",sans-serif; border:0; border-radius:999px; padding:14px 24px; background:rgba(255,255,255,.9); color:#1f2d36; cursor:pointer; box-shadow:0 10px 30px rgba(0,0,0,.3); white-space:nowrap; }
.rz-zeit{ position:absolute; left:50%; bottom:16px; transform:translateX(-50%); z-index:8; width:min(560px,70vw); display:flex; align-items:center; gap:12px; color:rgba(255,255,255,.75); font-weight:800; font-size:14px; text-shadow:0 1px 4px rgba(0,0,0,.5); transition:opacity 1s; }
.rz-zeit .bahn{ flex:1; height:6px; border-radius:999px; background:rgba(255,255,255,.2); overflow:hidden; }
.rz-zeit .bahn i{ display:block; height:100%; width:100%; background:rgba(255,255,255,.7); border-radius:999px; transform-origin:0 50%; transition:transform 1s linear; }
.rz-zeit b{ min-width:7.2em; text-align:right; font-variant-numeric:tabular-nums; }
.rz-ende{ position:absolute; left:50%; top:50%; transform:translate(-50%,-40%); z-index:9; background:rgba(255,255,255,.95); color:#1f2d36; border-radius:24px; padding:18px 28px; text-align:center; font-weight:900; font-size:clamp(22px,4vmin,40px); opacity:0; transition:opacity 1.5s, transform 1.5s; pointer-events:none; box-shadow:0 20px 50px rgba(0,0,0,.3); }
.rz-ende.an{ opacity:1; transform:translate(-50%,-50%); }
.rz-ende small{ display:block; font-size:.5em; color:#5b6670; margin-top:4px; }
/* Auswahl */
.rz-wahl{ position:absolute; inset:0; z-index:12; overflow:auto; background:radial-gradient(circle at 20% 0%, #f8f4ec, #ece4d4); padding:24px; box-sizing:border-box; }
.rz-wahl-kopf{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin:0 auto 14px; max-width:1180px; }
.rz-wahl-kopf h2{ margin:0; font-size:26px; font-weight:900; color:#28465f; }
.rz-wahl-kopf small{ display:block; font-size:14px; color:#7c6a4f; font-weight:700; margin-top:2px; }
.rz-wahl-kopf button{ border:0; background:#fff; border-radius:50%; width:46px; height:46px; font-size:20px; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,.1); flex:none; }
.rz-gruppe{ max-width:1180px; margin:18px auto 10px; font-size:13px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; color:#7c6a4f; }
.rz-karten{ max-width:1180px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:16px; }
.rz-karte{ border:0; padding:0; background:#fff; border-radius:22px; overflow:hidden; cursor:pointer; text-align:left; font:inherit; display:flex; flex-direction:column; box-shadow:0 8px 22px rgba(60,40,10,.1); transition:transform .2s; }
.rz-karte:hover{ transform:translateY(-4px); }
.rz-karte .bild{ height:120px; display:flex; align-items:center; justify-content:center; font-size:54px; }
.rz-karte .text{ padding:12px 14px 14px; }
.rz-karte h3{ margin:0 0 4px; font-size:17px; font-weight:900; color:#1f2d36; }
.rz-karte p{ margin:0; font-size:13.5px; font-weight:700; color:#6b7672; line-height:1.4; }
.rz-karte .klang{ display:inline-block; margin-top:8px; font-size:12px; font-weight:900; color:#28465f; background:#e9f0f6; border-radius:999px; padding:3px 10px; }
@keyframes rzWiegen{ 0%,100%{ transform:rotate(-3deg); } 50%{ transform:rotate(3deg); } }
@keyframes rzZiehen{ from{ transform:translateX(-35vw); } to{ transform:translateX(135vw); } }
@keyframes rzSteigen{ from{ transform:translateY(0); opacity:0; } 10%{ opacity:.7; } to{ transform:translateY(-105vh); opacity:0; } }
@keyframes rzFunkeln{ 0%,100%{ opacity:var(--o1,.35); } 50%{ opacity:1; } }
@keyframes rzAtmen{ 0%,100%{ opacity:.75; transform:scale(1); } 50%{ opacity:1; transform:scale(1.04); } }
@media (prefers-reduced-motion: reduce){ #rz *{ animation-duration:60s !important; } }
/* Szenen */
.rz-aqua .pflanze{ transform-box:fill-box; transform-origin:50% 100%; animation:rzWiegen 7s ease-in-out infinite; }
.rz-aqua .blase{ position:absolute; bottom:12%; border-radius:50%; background:radial-gradient(circle at 35% 30%, rgba(255,255,255,.9) 0 12%, rgba(255,255,255,.12) 40%, rgba(255,255,255,.4) 72%, rgba(255,255,255,0) 76%); animation:rzSteigen linear infinite; }
.rz-aqua .strahl{ position:absolute; top:-10%; width:18%; height:95%; background:linear-gradient(rgba(255,255,255,.28), rgba(255,255,255,0) 85%); transform:skewX(-14deg); filter:blur(20px); mix-blend-mode:screen; animation:rzFunkeln 12s ease-in-out infinite; --o1:.3; }
.rz-wesen{ position:absolute; left:0; top:0; will-change:transform; pointer-events:none; }
.rz-wesen > div{ width:100%; height:100%; }
.rz-wesen svg{ width:100%; height:100%; display:block; filter:drop-shadow(0 10px 14px rgba(0,30,60,.3)) saturate(.88); }
.rz-wesen.links > div{ transform:scaleX(-1); }
.rz-wolken .wolke{ position:absolute; animation:rzZiehen linear infinite; }
.rz-wolken .halm{ transform-box:fill-box; transform-origin:50% 100%; animation:rzWiegen 6s ease-in-out infinite; }
.rz-feuer .glut{ position:absolute; left:50%; bottom:6%; width:min(110vw,1300px); aspect-ratio:2; transform:translateX(-50%); border-radius:50%; background:radial-gradient(ellipse at 50% 70%, rgba(255,150,60,.42), rgba(255,110,40,.12) 45%, rgba(255,110,40,0) 70%); animation:rzAtmen 3.5s ease-in-out infinite; }
.rz-stadt .fenster-licht{ transition:opacity 4s; }
.rz-maerchen .licht, .rz-winter .fenster{ animation:rzFunkeln 7s ease-in-out infinite; --o1:.7; }
.rz-maerchen .pilz{ animation:rzAtmen 5s ease-in-out infinite; transform-box:fill-box; transform-origin:50% 100%; }
.rz-maerchen .bluete{ transform-box:fill-box; transform-origin:50% 100%; animation:rzWiegen 6s ease-in-out infinite; }
.rz-maerchen .fahne{ transform-box:fill-box; transform-origin:0 50%; animation:rzWiegen 3s ease-in-out infinite; }
.rz-maerchen .nebel{ position:absolute; left:0; width:60vw; height:14vh; border-radius:50%; background:radial-gradient(ellipse, rgba(255,230,255,.22), rgba(255,230,255,0) 70%); filter:blur(12px); animation:rzZiehen linear infinite; }
.rz-winter .glimm{ animation:rzAtmen 5s ease-in-out infinite; transform-box:fill-box; transform-origin:50% 50%; }
.rz-winter .glitzer{ animation:rzFunkeln 4s ease-in-out infinite; --o1:0; }
.rz-maerchen .stern, .rz-winter .stern, .rz-polar .stern, .rz-feuer .stern{ position:absolute; width:2px; height:2px; border-radius:50%; background:#fff; box-shadow:0 0 5px rgba(255,255,255,.7); animation:rzFunkeln 5s ease-in-out infinite; }
`;

/* ======================= Szenen ======================= */
// Jede Szene: titel, stufe, klang (Arten), bauen(sz) → { frame(t, dt, W, H) }
function leinwand(sz, cls = ""){
    const c = document.createElement("canvas"); c.className = "voll " + cls; sz.appendChild(c);
    const g = c.getContext("2d");
    const passen = () => { const r = Math.min(2, window.devicePixelRatio || 1), w = sz.clientWidth, h = sz.clientHeight; if (c.width !== Math.round(w * r) || c.height !== Math.round(h * r)) { c.width = Math.round(w * r); c.height = Math.round(h * r); } g.setTransform(r, 0, 0, r, 0, 0); return [w, h]; };
    return { c, g, passen };
}
// Regentropfen auf einer Glasscheibe (Canvas)
function scheibe(sz, dichte = 1){
    const L = leinwand(sz, "glas"); let tropfen = [];
    return function(t, dt){
        const [W, H] = L.passen(), g = L.g;
        g.clearRect(0, 0, W, H);
        const ziel = (W * H) / 9000 * dichte;
        while (tropfen.length < ziel) tropfen.push({ x: zuf(0, W), y: zuf(0, H), r: zuf(1.4, 5), v: 0, wann: zuf(2, 40) });
        if (Math.random() < .25 * dichte * dt * 60 / 60) tropfen.push({ x: zuf(0, W), y: zuf(0, H), r: zuf(1, 3), v: 0, wann: zuf(4, 50) });
        for (const d of tropfen){
            d.wann -= dt;
            if (d.wann < 0 && d.r > 2.6){ d.v = Math.min(d.v + dt * 40, 26 + d.r * 6); }
            if (d.v > 0){ const alt = d.y; d.y += d.v * dt; d.x += Math.sin(d.y * .05) * .15; if (Math.random() < .08) tropfen.push({ x: d.x + zuf(-1, 1), y: alt, r: zuf(.6, 1.3), v: 0, wann: 999 }); d.r -= dt * .08; }
            // Tropfen: dunkler Rand unten, Glanz oben
            const gr = g.createRadialGradient(d.x - d.r * .3, d.y - d.r * .35, d.r * .1, d.x, d.y, d.r);
            gr.addColorStop(0, "rgba(255,255,255,.8)"); gr.addColorStop(.45, "rgba(255,255,255,.18)"); gr.addColorStop(1, "rgba(10,20,30,.5)");
            g.fillStyle = gr; g.beginPath(); g.ellipse(d.x, d.y, d.r, d.r * (d.v > 0 ? 1.25 : 1), 0, 0, Math.PI * 2); g.fill();
        }
        tropfen = tropfen.filter(d => d.y < H + 10 && d.r > .4).slice(-700);
    };
}

const SZENEN = {
  aquarium: { titel: "Aquarium", emoji: "🐟", stufe: "12", klang: ["wasser", "blubb"], klangText: "leises Blubbern",
    text: "Ein paar Fische gleiten langsam, Pflanzen wiegen sich, Luftblasen steigen auf.", farbe: "linear-gradient(#7fd3e6,#1f7ea6)",
    bauen(sz){
      sz.classList.add("rz-aqua");
      const pfl = (x, h, f1, f2, i) => `<path class="pflanze" style="animation-delay:${-i * 1.3}s" d="M${x} 900 C${x - 30} ${900 - h * .3} ${x + 30} ${900 - h * .6} ${x + 6} ${900 - h} C${x + 20} ${900 - h * .6} ${x + 50} ${900 - h * .3} ${x + 22} 900Z" fill="url(#aqP${i % 2})"/>`;
      sz.innerHTML = `
        <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs><linearGradient id="aqW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fe0ec"/><stop offset=".35" stop-color="#4fb1cf"/><stop offset=".75" stop-color="#1d7aa3"/><stop offset="1" stop-color="#0f4f72"/></linearGradient>
            <linearGradient id="aqS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ead7a6"/><stop offset="1" stop-color="#b39461"/></linearGradient>
            <linearGradient id="aqP0" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#1e6a46"/><stop offset="1" stop-color="#6fcf8a"/></linearGradient>
            <linearGradient id="aqP1" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2f7a3a"/><stop offset="1" stop-color="#9fdc6a"/></linearGradient>
            <radialGradient id="aqSt" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#b9c2c8"/><stop offset="1" stop-color="#5d6a74"/></radialGradient>
            <filter id="aqF"><feGaussianBlur stdDeviation="6"/></filter></defs>
          <rect width="1600" height="900" fill="url(#aqW)"/>
          <g filter="url(#aqF)" opacity=".5">${[[200, 360], [520, 300], [980, 380], [1340, 320]].map(([x, h], i) => pfl(x, h, 0, 0, i)).join("")}</g>
          <path d="M0 800 Q400 770 800 790 T1600 785 V900 H0Z" fill="url(#aqS)"/>
          <ellipse cx="420" cy="800" rx="130" ry="70" fill="url(#aqSt)"/><ellipse cx="1180" cy="810" rx="90" ry="50" fill="url(#aqSt)"/><ellipse cx="1260" cy="820" rx="60" ry="34" fill="url(#aqSt)"/>
          ${[[80, 420], [150, 330], [640, 380], [720, 290], [1000, 440], [1420, 400], [1500, 300]].map(([x, h], i) => pfl(x, h, 0, 0, i)).join("")}
        </svg>
        ${[12, 40, 68].map((x, i) => `<div class="strahl" style="left:${x}%;animation-delay:${-i * 4}s"></div>`).join("")}
        ${Array.from({ length: 10 }, (_, i) => `<div class="blase" style="left:${26 + (i % 3) * .6}%;width:${5 + i % 4 * 3}px;height:${5 + i % 4 * 3}px;animation-duration:${9 + i % 4 * 3}s;animation-delay:${-i * 1.6}s"></div>`).join("")}
        <div class="ebene"></div>`;
      const ebene = sz.querySelector(".ebene");
      const fische = ["tropenfisch", "fisch", "kugelfisch", "tropenfisch", "fisch"].map((k, i) => { const d = document.createElement("div"); d.className = "rz-wesen"; d.innerHTML = `<div>${BILD(k)}</div>`; ebene.appendChild(d); return { d, x: zuf(.1, .9), y: .2 + i * .12, zx: zuf(.1, .9), v: zuf(.012, .022), t: zuf(0, 9), g: [.11, .1, .09, .08, .1][i] }; });
      return { frame(t, dt, W, H){ const S = Math.min(Math.max(W, H * .55), H * 1.6);
        fische.forEach(f => { f.t += dt; const dx = f.zx - f.x; if (Math.abs(dx) < .01) f.zx = zuf(.08, .92); else f.x += Math.sign(dx) * Math.min(Math.abs(dx), f.v * dt); f.d.classList.toggle("links", dx > 0);
          const g = f.g * S, y = f.y + Math.sin(f.t * .5) * .02; f.d.style.width = f.d.style.height = g + "px"; f.d.style.transform = `translate(${(f.x * W - g / 2).toFixed(1)}px, ${(y * H - g / 2).toFixed(1)}px)`; }); } };
    } },

  wolken: { titel: "Wolkenwiese", emoji: "☁️", stufe: "12", klang: ["spieluhr", "wind"], klangText: "sanfte Spieluhr-Töne",
    text: "Wolken ziehen über eine Blumenwiese, ab und zu schwebt ein Schmetterling vorbei.", farbe: "linear-gradient(#8fcff5 0 62%, #9fd37f 62%)",
    bauen(sz){
      sz.classList.add("rz-wolken");
      sz.innerHTML = `
        <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs><linearGradient id="wwH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fb8ec"/><stop offset=".6" stop-color="#c4e6fb"/><stop offset="1" stop-color="#f2fbff"/></linearGradient>
            <radialGradient id="wwS" cx=".15" cy=".08" r=".5"><stop offset="0" stop-color="#fff8d2" stop-opacity=".95"/><stop offset=".2" stop-color="#fff0a8" stop-opacity=".4"/><stop offset="1" stop-color="#fff0a8" stop-opacity="0"/></radialGradient>
            <linearGradient id="wwG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8d77f"/><stop offset="1" stop-color="#5f9f43"/></linearGradient>
            <filter id="wwF"><feGaussianBlur stdDeviation="4"/></filter><filter id="wwU"><feGaussianBlur stdDeviation="6"/></filter></defs>
          <rect width="1600" height="900" fill="url(#wwH)"/><rect width="1600" height="900" fill="url(#wwS)"/>
          <path d="M-200 600 Q200 520 600 570 T1300 540 T1800 560 V900 H-200Z" fill="#b9dca4" filter="url(#wwF)"/>
          <path d="M-200 650 Q300 590 800 640 T1800 620 V900 H-200Z" fill="url(#wwG)"/>
          ${Array.from({ length: 34 }, (_, i) => { const x = (i * 49) % 1600, y = 680 + (i * 31) % 170, f = ["#fff", "#ffd5e5", "#fff2a8", "#e8d6ff", "#ffc9a8"][i % 5]; return `<g class="halm" style="animation-delay:${-i * .7}s"><path d="M${x} ${y + 40} Q${x + 4} ${y + 20} ${x} ${y}" stroke="#4f8f37" stroke-width="3" fill="none"/><circle cx="${x}" cy="${y}" r="${6 + i % 3 * 2}" fill="${f}"/><circle cx="${x}" cy="${y}" r="2.5" fill="#f2b705"/></g>`; }).join("")}
          <g filter="url(#wwU)" opacity=".85">${Array.from({ length: 36 }, (_, i) => { const x = (i * 47) % 1600, h = 70 + (i * 17) % 80; return `<path d="M${x} 900 Q${x + 8} ${900 - h * .6} ${x + (i % 2 ? 18 : -14)} ${900 - h}" stroke="${i % 3 ? "#4f8f37" : "#6aad4a"}" stroke-width="11" fill="none" stroke-linecap="round"/>`; }).join("")}</g>
        </svg>
        ${[[6, 170, 300], [18, 220, 220], [30, 260, 340], [12, 300, 180]].map(([y, d, w], i) => `<div class="wolke" style="top:${y}%;animation-duration:${d}s;animation-delay:${-i * 60}s">${WOLKE("wwW" + i, w)}</div>`).join("")}
        <div class="ebene"></div>`;
      const d = document.createElement("div"); d.className = "rz-wesen"; d.innerHTML = `<div>${BILD("schmetterling")}</div>`; sz.querySelector(".ebene").appendChild(d); d.style.opacity = 0;
      let flug = null, warte = zuf(8, 18);
      return { frame(t, dt, W, H){
        if (!flug){ warte -= dt; if (warte <= 0) flug = { s: 0, links: Math.random() < .5, y: zuf(.35, .6) }; return; }
        flug.s += dt / 38; const p = flug.s, x = flug.links ? 1.1 - p * 1.25 : -.1 + p * 1.25, y = flug.y + Math.sin(p * 9) * .06;
        const g = Math.min(W, H * 1.6) * .07; d.style.opacity = p < .05 ? p * 20 : p > .95 ? (1 - p) * 20 : 1; d.classList.toggle("links", flug.links);
        d.style.width = d.style.height = g + "px"; d.style.transform = `translate(${(x * W - g / 2).toFixed(1)}px, ${(y * H).toFixed(1)}px) scaleY(${.85 + Math.abs(Math.sin(t * 5)) * .15})`;
        if (p >= 1){ flug = null; warte = zuf(30, 60); d.style.opacity = 0; } } };
    } },

  regen: { titel: "Regen am Fenster", emoji: "🌧️", stufe: "34", klang: ["regen", "tropfen"], klangText: "Regenrauschen",
    text: "Regentropfen laufen die Scheibe herunter, drinnen brennt eine warme Lampe.", farbe: "linear-gradient(#3c4a5e,#7b8aa0)",
    bauen(sz){
      sz.innerHTML = `
        <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style="filter:blur(10px) saturate(.9);transform:scale(1.05)">
          <defs><linearGradient id="rgH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4d5d76"/><stop offset=".6" stop-color="#8794a8"/><stop offset="1" stop-color="#5e6b58"/></linearGradient></defs>
          <rect width="1600" height="900" fill="url(#rgH)"/>
          <g fill="#2f3f33">${[[150, 420, 200], [430, 380, 240], [900, 400, 260], [1300, 360, 220]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/><rect x="${x - 20}" y="${y}" width="40" height="500"/>`).join("")}</g>
          <path d="M0 700 Q800 650 1600 700 V900 H0Z" fill="#3e4a3a"/>
          ${[[300, 560, "#ffd27a"], [1150, 540, "#ffe2a8"], [720, 610, "#ffc36b"], [1450, 600, "#ffd99a"]].map(([x, y, f]) => `<circle cx="${x}" cy="${y}" r="30" fill="${f}" opacity=".75"/>`).join("")}
        </svg>
        <div style="position:absolute;inset:0;background:linear-gradient(rgba(30,40,60,.25),rgba(30,40,60,.1))"></div>`;
      const glas = scheibe(sz, 1.1);
      sz.insertAdjacentHTML("beforeend", `
        <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true" style="pointer-events:none">
          <defs><linearGradient id="rgR" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9e1d2"/><stop offset="1" stop-color="#b9ad98"/></linearGradient>
            <radialGradient id="rgL" cx=".1" cy=".95" r=".7"><stop offset="0" stop-color="#ffc977" stop-opacity=".55"/><stop offset="1" stop-color="#ffc977" stop-opacity="0"/></radialGradient></defs>
          <path d="M0 0 H1600 V900 H0Z M70 60 V780 H1530 V60Z" fill="url(#rgR)" fill-rule="evenodd"/>
          <rect x="785" y="60" width="30" height="720" fill="url(#rgR)"/><rect x="70" y="400" width="1460" height="22" fill="url(#rgR)"/>
          <rect x="0" y="780" width="1600" height="120" fill="#cdbfa6"/><rect x="0" y="780" width="1600" height="14" fill="#e6dac4"/>
          <rect width="1600" height="900" fill="url(#rgL)"/>
        </svg>
        <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMinYMax meet" aria-hidden="true" style="pointer-events:none">
          <defs><linearGradient id="rgT" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c96f4a"/><stop offset="1" stop-color="#8a4128"/></linearGradient>
            <radialGradient id="rgB" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#7cc46a"/><stop offset="1" stop-color="#2f6a2c"/></radialGradient>
            <radialGradient id="rgGl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff1c8" stop-opacity=".9"/><stop offset="1" stop-color="#ffc977" stop-opacity="0"/></radialGradient></defs>
          <path d="M140 790 L150 700 L250 700 L260 790Z" fill="url(#rgT)"/>
          ${[[200, 640, 50], [160, 670, 38], [240, 668, 40], [180, 610, 32], [222, 612, 30]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .8}" fill="url(#rgB)"/>`).join("")}
          <circle cx="420" cy="690" r="150" fill="url(#rgGl)" style="animation:rzAtmen 6s ease-in-out infinite"/>
          <rect x="400" y="700" width="40" height="90" rx="4" fill="#f6efe2"/><path d="M420 676 q10 12 0 22 q-10 -10 0 -22Z" fill="#ffcf5a"/>
          <path d="M520 740 h70 v40 a14 14 0 0 1 -14 14 h-42 a14 14 0 0 1 -14 -14Z" fill="#6f8fb0"/><path d="M590 750 q24 0 24 16 q0 16 -24 16" stroke="#6f8fb0" stroke-width="8" fill="none"/><path d="M540 728 q6 -10 0 -18 M560 726 q6 -10 0 -18" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>
        </svg>`);
      return { frame(t, dt){ glas(t, dt); } };
    } },

  feuer: { titel: "Lagerfeuer", emoji: "🔥", stufe: "34", klang: ["feuer", "grillen"], klangText: "Knistern und Grillen",
    text: "Ein Lagerfeuer im Wald bei Nacht, ein paar Funken steigen auf.", farbe: "radial-gradient(circle at 50% 80%, #ff9a4a, #1a1420 60%)",
    bauen(sz){
      sz.classList.add("rz-feuer");
      sz.innerHTML = `
        <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs><linearGradient id="fH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05060f"/><stop offset=".7" stop-color="#141a33"/><stop offset="1" stop-color="#1e1a26"/></linearGradient>
            <linearGradient id="fB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1c18"/><stop offset="1" stop-color="#120c0c"/></linearGradient>
            <filter id="fF"><feGaussianBlur stdDeviation="4"/></filter></defs>
          <rect width="1600" height="900" fill="url(#fH)"/>
          <g fill="#0b0d18" filter="url(#fF)">${[100, 260, 420, 1150, 1320, 1500].map((x, i) => `<path d="M${x} 760 L${x + 70} 760 L${x + 35} ${260 + i % 3 * 60}Z"/>`).join("")}</g>
          <g fill="#06070d">${[0, 180, 1240, 1420].map((x, i) => `<path d="M${x} 800 L${x + 120} 800 L${x + 60} ${200 + i % 2 * 80}Z"/><rect x="${x + 54}" y="760" width="12" height="60"/>`).join("")}</g>
          <path d="M-200 760 Q800 720 1800 760 V900 H-200Z" fill="url(#fB)"/>
          <g transform="translate(800 790)"><ellipse cx="0" cy="12" rx="170" ry="22" fill="#000" opacity=".5" filter="url(#fF)"/>
            ${Array.from({ length: 9 }, (_, i) => { const a = Math.PI * (i / 8), x = Math.cos(a) * 140, y = Math.sin(a) * 14; return `<ellipse cx="${x.toFixed(0)}" cy="${(y + 4).toFixed(0)}" rx="26" ry="18" fill="#5a5560"/><ellipse cx="${(x - 6).toFixed(0)}" cy="${(y - 2).toFixed(0)}" rx="12" ry="7" fill="#8a8590" opacity=".5"/>`; }).join("")}
            <path d="M-120 -6 L110 -40 L118 -22 L-112 12Z" fill="#5a3a22"/><path d="M-110 -40 L120 -4 L112 14 L-118 -22Z" fill="#6a4628"/><ellipse cx="-118" cy="-31" rx="10" ry="12" fill="#c89a64"/><ellipse cx="120" cy="5" rx="10" ry="12" fill="#c89a64"/></g>
        </svg>
        ${Array.from({ length: 50 }, (_, i) => `<i class="stern" style="left:${(i * 37.7) % 100}%;top:${(i * 23.3) % 38}%;animation-delay:${-i * .37}s"></i>`).join("")}
        <div class="glut"></div>`;
      const L = leinwand(sz); L.c.style.mixBlendMode = "screen";
      let teile = [], funken = [];
      return { frame(t, dt){
        const [W, H] = L.passen(), g = L.g, s = Math.max(W / 1600, H / 900);
        const bx = W / 2, by = H - 118 * s;
        g.clearRect(0, 0, W, H); g.globalCompositeOperation = "lighter";
        for (let i = 0; i < 5; i++) teile.push({ x: bx + zuf(-90, 90) * s, y: by + zuf(-6, 6) * s, vx: zuf(-12, 12) * s, vy: -zuf(70, 150) * s, r: zuf(26, 46) * s, l: 0, d: zuf(.7, 1.3) });
        if (Math.random() < dt * 2.2) funken.push({ x: bx + zuf(-60, 60) * s, y: by - 40 * s, vx: zuf(-14, 14) * s, vy: -zuf(60, 120) * s, l: 0, d: zuf(2, 4) });
        for (const p of teile){ p.l += dt / p.d; p.x += (p.vx + (bx - p.x) * .9) * dt; p.y += p.vy * dt; const k = 1 - p.l, r = p.r * (.4 + k * .8);
          const gr = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, r); const a = Math.max(0, k) * .45;
          gr.addColorStop(0, `rgba(255,${Math.round(200 + 50 * k)},${Math.round(120 * k)},${a})`); gr.addColorStop(.45, `rgba(255,${Math.round(110 + 60 * k)},30,${a * .6})`); gr.addColorStop(1, "rgba(200,40,10,0)");
          g.fillStyle = gr; g.beginPath(); g.arc(p.x, p.y, r, 0, Math.PI * 2); g.fill(); }
        for (const f of funken){ f.l += dt / f.d; f.x += (f.vx + Math.sin(f.l * 12) * 20 * s) * dt; f.y += f.vy * dt; g.fillStyle = `rgba(255,200,120,${Math.max(0, 1 - f.l)})`; g.beginPath(); g.arc(f.x, f.y, 2 * s + .6, 0, Math.PI * 2); g.fill(); }
        teile = teile.filter(p => p.l < 1); funken = funken.filter(f => f.l < 1);
        g.globalCompositeOperation = "source-over"; } };
    } },

  maerchen: { titel: "Märchenwald", emoji: "🏰", stufe: "12", klang: ["spieluhr", "wind"], klangText: "leise Spieluhr",
    text: "Ein Schloss auf dem Hügel, leuchtende Pilze und Glühwürmchen im Abendwald.", farbe: "radial-gradient(circle at 70% 25%, #ffe9c4, #8a6aa8 35%, #2a2052 80%)",
    bauen(sz){
      sz.classList.add("rz-maerchen");
      const baum = (x, y, s, f, i) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 0 C-10 -60 -16 -120 -6 -170 L6 -170 C16 -120 10 -60 14 0Z" fill="${f[0]}"/>${[[0, -230, 95], [-70, -190, 70], [70, -185, 74], [-30, -280, 70], [40, -275, 62]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f[1]}"/>`).join("")}<circle cx="-30" cy="-260" r="40" fill="${f[2]}" opacity=".35"/></g>`;
      const pilz = (x, y, s, i) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="pilz" style="animation-delay:${-i * 1.7}s"><ellipse cx="0" cy="-40" rx="70" ry="50" fill="url(#rzmwPg)"/><path d="M-12 0 C-14 -20 -10 -34 -9 -40 L9 -40 C10 -34 14 -20 12 0Z" fill="#f6ead6"/><path d="M-44 -38 C-44 -72 44 -72 44 -38 C30 -44 -30 -44 -44 -38Z" fill="${["#e2574c", "#d65a9e", "#e98b3a"][i % 3]}"/>${[[-22, -54, 6], [8, -60, 5], [26, -48, 4.5], [-6, -46, 4]].map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}" fill="#fff6e8"/>`).join("")}</g></g>`;
      sz.innerHTML = `
        <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs><linearGradient id="rzmwH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1442"/><stop offset=".45" stop-color="#4b3a80"/><stop offset=".72" stop-color="#b981b0"/><stop offset=".86" stop-color="#f2b8a4"/></linearGradient>
            <radialGradient id="rzmwM" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff8e6"/><stop offset=".22" stop-color="#fff1cf"/><stop offset=".3" stop-color="#ffe9c4" stop-opacity=".45"/><stop offset="1" stop-color="#ffe9c4" stop-opacity="0"/></radialGradient>
            <radialGradient id="rzmwPg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd8a8" stop-opacity=".55"/><stop offset="1" stop-color="#ffd8a8" stop-opacity="0"/></radialGradient>
            <radialGradient id="rzmwF" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe7a0" stop-opacity=".9"/><stop offset="1" stop-color="#ffe7a0" stop-opacity="0"/></radialGradient>
            <linearGradient id="rzmwS" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a3c7c"/><stop offset=".5" stop-color="#6e5a9e"/><stop offset="1" stop-color="#3e3270"/></linearGradient>
            <linearGradient id="rzmwD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8d5a9c"/><stop offset="1" stop-color="#4b3270"/></linearGradient>
            <filter id="rzmwB"><feGaussianBlur stdDeviation="5"/></filter><filter id="rzmwB2"><feGaussianBlur stdDeviation="2"/></filter></defs>
          <rect width="1600" height="900" fill="url(#rzmwH)"/>
          <circle cx="1180" cy="190" r="260" fill="url(#rzmwM)"/>
          <path d="M-200 600 Q200 480 520 540 T1100 500 T1800 540 V900 H-200Z" fill="#6c5596" opacity=".75" filter="url(#rzmwB)"/>
          <!-- Schloss -->
          <g transform="translate(800 520)">
            <path d="M-260 60 Q-120 -10 0 -6 Q130 -12 270 60 V200 H-260Z" fill="#4a3a78"/>
            <g fill="url(#rzmwS)">
              <rect x="-110" y="-150" width="220" height="160"/><rect x="-190" y="-110" width="64" height="120"/><rect x="126" y="-110" width="64" height="120"/>
              <rect x="-40" y="-250" width="80" height="110"/><rect x="-150" y="-70" width="300" height="80"/></g>
            <g fill="url(#rzmwD)"><path d="M-198 -110 L-158 -200 L-118 -110Z"/><path d="M118 -110 L158 -200 L198 -110Z"/><path d="M-50 -250 L0 -360 L50 -250Z"/><path d="M-118 -150 L-80 -210 L-42 -150Z"/><path d="M42 -150 L80 -210 L118 -150Z"/></g>
            <rect x="-118" y="-150" width="76" height="40" fill="url(#rzmwS)"/><rect x="42" y="-150" width="76" height="40" fill="url(#rzmwS)"/>
            <path d="M0 -360 V-392" stroke="#d9c7f0" stroke-width="3"/><path class="fahne" d="M0 -392 L30 -384 L0 -374Z" fill="#ffb2c8"/>
            <path d="M-22 10 V-26 a22 22 0 0 1 44 0 V10Z" fill="#2a2050"/>
            ${[[-12, -222], [-12, -190], [-80, -120], [-20, -120], [40, -120], [-170, -80], [146, -80], [-80, -40], [60, -40], [-118, -40], [100, -40]].map(([x, y], i) => `<rect class="licht" style="animation-delay:${-i * 1.9}s" x="${x}" y="${y}" width="${i < 2 ? 24 : 18}" height="${i < 2 ? 22 : 24}" rx="9" fill="#ffd98a"/>`).join("")}
            <circle cx="0" cy="-90" r="200" fill="url(#rzmwF)" opacity=".18"/>
          </g>
          <path d="M-200 680 Q300 600 760 640 Q1100 670 1800 610 V900 H-200Z" fill="#33285e"/>
          <path d="M740 900 C760 800 790 720 800 640 C812 720 860 800 900 900Z" fill="#6a5a9a" opacity=".5"/>
          <path d="M-200 760 Q400 700 900 760 T1800 740 V900 H-200Z" fill="#211a42"/>
          ${baum(110, 780, 1.25, ["#1a1438", "#241c4a", "#6b5aa8"])}${baum(300, 820, .9, ["#1a1438", "#2b2254", "#7c68b4"])}${baum(1330, 800, 1.15, ["#1a1438", "#241c4a", "#6b5aa8"])}${baum(1520, 840, 1.35, ["#15102e", "#1f1840", "#5b4a98"])}
          <g opacity=".9">${Array.from({ length: 26 }, (_, i) => { const x = (i * 61.7) % 1600, y = 800 + (i * 23) % 90; return `<g class="bluete" style="animation-delay:${-i * .9}s"><path d="M${x} ${y + 30} Q${x + 3} ${y + 14} ${x} ${y}" stroke="#3a6a5a" stroke-width="3" fill="none"/><circle cx="${x}" cy="${y}" r="${5 + i % 3}" fill="${["#9fe2ff", "#ffd1f0", "#e8d6ff", "#fff2a8"][i % 4]}"/></g>`; }).join("")}</g>
          ${pilz(420, 880, 1, 0)}${pilz(500, 890, .6, 1)}${pilz(1160, 880, .85, 2)}${pilz(1230, 895, .55, 0)}${pilz(200, 900, .7, 1)}
        </svg>
        ${Array.from({ length: 70 }, (_, i) => `<i class="stern" style="left:${(i * 37.7) % 100}%;top:${(i * 23.3) % 42}%;animation-delay:${-i * .37}s"></i>`).join("")}
        ${[[54, 220, 0], [62, 300, 1], [70, 260, 2]].map(([y, d, i]) => `<div class="nebel" style="top:${y}%;animation-duration:${d}s;animation-delay:${-i * 90}s"></div>`).join("")}`;
      const L = leinwand(sz); L.c.style.mixBlendMode = "screen";
      const wuermchen = Array.from({ length: 34 }, () => ({ x: zuf(0, 1), y: zuf(.45, .95), a: zuf(0, 7), v: zuf(.004, .012), r: zuf(1.6, 3.2), p: zuf(0, 7), w: zuf(0, 7) }));
      let funkel = [], schnuppe = null, warte = zuf(15, 30);
      return { frame(t, dt){
        const [W, H] = L.passen(), g = L.g; g.clearRect(0, 0, W, H); const s = Math.max(W / 1600, H / 900);
        for (const f of wuermchen){ f.w += dt * .4; f.a += Math.sin(f.w) * dt * .6; f.x += Math.cos(f.a) * f.v * dt; f.y += Math.sin(f.a) * f.v * dt * .6;
          if (f.x < -.05) f.x = 1.05; if (f.x > 1.05) f.x = -.05; if (f.y < .42) f.a = Math.PI / 2; if (f.y > .97) f.a = -Math.PI / 2;
          const hell = .35 + .65 * Math.max(0, Math.sin(t * .9 + f.p)), x = f.x * W, y = f.y * H, r = f.r * (s * .8 + .5);
          const gr = g.createRadialGradient(x, y, 0, x, y, r * 7); gr.addColorStop(0, `rgba(255,246,170,${(hell * .9).toFixed(3)})`); gr.addColorStop(.25, `rgba(220,255,140,${(hell * .3).toFixed(3)})`); gr.addColorStop(1, "rgba(200,255,120,0)");
          g.fillStyle = gr; g.beginPath(); g.arc(x, y, r * 7, 0, Math.PI * 2); g.fill(); }
        // zarter Glitzerstaub, der langsam aufsteigt
        if (Math.random() < dt * 3) funkel.push({ x: zuf(.05, .95), y: zuf(.7, 1), l: 0, d: zuf(6, 11), vx: zuf(-.01, .01) });
        for (const p of funkel){ p.l += dt / p.d; p.y -= dt * .025; p.x += p.vx * dt; const a = Math.sin(p.l * Math.PI) * .8, x = p.x * W, y = p.y * H, r = (1.2 + Math.sin(t * 6 + p.d) * .5) * (s + .4);
          g.fillStyle = `rgba(255,230,255,${a.toFixed(3)})`; g.beginPath(); g.moveTo(x, y - r * 3); g.lineTo(x + r * .7, y); g.lineTo(x, y + r * 3); g.lineTo(x - r * .7, y); g.closePath(); g.fill(); g.fillRect(x - r * 3, y - r * .35, r * 6, r * .7); }
        funkel = funkel.filter(p => p.l < 1);
        // ab und zu eine Sternschnuppe
        if (!schnuppe){ warte -= dt; if (warte <= 0) schnuppe = { x: zuf(.1, .6), y: zuf(.05, .2), l: 0 }; }
        else { schnuppe.l += dt / 1.6; const x = (schnuppe.x + schnuppe.l * .25) * W, y = (schnuppe.y + schnuppe.l * .1) * H, a = Math.sin(schnuppe.l * Math.PI);
          const gr = g.createLinearGradient(x, y, x - W * .08, y - H * .032); gr.addColorStop(0, `rgba(255,255,255,${a.toFixed(3)})`); gr.addColorStop(1, "rgba(255,255,255,0)"); g.strokeStyle = gr; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.lineTo(x - W * .08, y - H * .032); g.stroke();
          if (schnuppe.l >= 1){ schnuppe = null; warte = zuf(25, 50); } } } };
    } },

  winter: { titel: "Winterlandschaft", emoji: "❄️", stufe: "34", auch: "59", klang: ["wind", "flaeche"], klangText: "leiser Wind und warme Klänge",
    text: "Leiser Schneefall über verschneiten Tannen, im Häuschen brennt warmes Licht.", farbe: "linear-gradient(#3a4a86,#c89ab8 55%,#eef3fb 56%)",
    bauen(sz){
      sz.classList.add("rz-winter");
      const tanne = (x, y, s, d, i) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-7" y="-20" width="14" height="24" fill="${d ? "#3d3540" : "#5a4636"}"/>
        ${[[0, 150], [1, 118], [2, 86], [3, 56]].map(([k, b]) => { const yy = -20 - k * 52; return `<path d="M${-b / 2} ${yy} L0 ${yy - 90} L${b / 2} ${yy}Z" fill="${d ? "#5b7590" : "#1f4a4a"}"/><path d="M${-b / 2} ${yy} Q${-b / 4} ${yy - 14} 0 ${yy - 4} Q${b / 4} ${yy - 16} ${b / 2} ${yy} Q${b / 4} ${yy - 30} 0 ${yy - 26} Q${-b / 4} ${yy - 28} ${-b / 2} ${yy}Z" fill="${d ? "#e4ecf8" : "#f4f8ff"}"/>`; }).join("")}
        <path d="M-18 ${-20 - 3 * 52 - 70} L0 ${-20 - 3 * 52 - 90} L18 ${-20 - 3 * 52 - 70}Z" fill="#fff"/></g>`;
      sz.innerHTML = `
        <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs><linearGradient id="rzwiH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2656"/><stop offset=".38" stop-color="#4a5394"/><stop offset=".6" stop-color="#b48bb6"/><stop offset=".72" stop-color="#f4c2b4"/></linearGradient>
            <radialGradient id="rzwiM" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fbfbff"/><stop offset=".2" stop-color="#eef2ff"/><stop offset=".28" stop-color="#dfe6ff" stop-opacity=".35"/><stop offset="1" stop-color="#dfe6ff" stop-opacity="0"/></radialGradient>
            <linearGradient id="rzwiB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dde3f3"/><stop offset="1" stop-color="#a9b4d4"/></linearGradient>
            <linearGradient id="rzwiS1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9eefa"/><stop offset="1" stop-color="#c3cde6"/></linearGradient>
            <linearGradient id="rzwiS2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfcff"/><stop offset="1" stop-color="#d9e1f2"/></linearGradient>
            <linearGradient id="rzwiSee" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8a6c8"/><stop offset="1" stop-color="#8a98c8"/></linearGradient>
            <radialGradient id="rzwiL" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffcf7a" stop-opacity=".75"/><stop offset="1" stop-color="#ffb05a" stop-opacity="0"/></radialGradient>
            <filter id="rzwiF"><feGaussianBlur stdDeviation="4"/></filter></defs>
          <rect width="1600" height="900" fill="url(#rzwiH)"/>
          <circle cx="420" cy="170" r="230" fill="url(#rzwiM)"/>
          <path d="M-200 560 L80 420 L230 480 L420 340 L600 470 L760 400 L900 480 L1080 360 L1260 470 L1420 400 L1800 520 V640 H-200Z" fill="url(#rzwiB)" opacity=".9"/>
          <path d="M420 340 L470 380 L440 396 L410 372 L380 390 L392 360Z M1080 360 L1130 400 L1096 410 L1070 392 L1040 404Z" fill="#fff" opacity=".8"/>
          <g opacity=".75" filter="url(#rzwiF)">${[0, 70, 140, 1300, 1380, 1460, 1540].map((x, i) => tanne(x, 640, .55 + (i % 3) * .08, true, i)).join("")}</g>
          <path d="M-200 640 Q300 580 760 620 T1800 600 V900 H-200Z" fill="url(#rzwiS1)"/>
          <ellipse cx="420" cy="705" rx="200" ry="30" fill="url(#rzwiSee)" opacity=".85"/><ellipse cx="385" cy="699" rx="105" ry="8" fill="#fff" opacity=".35"/>
          ${[[150, 700, .9], [610, 715, .7], [1250, 700, 1], [1350, 730, .75], [1440, 690, 1.05], [80, 740, 1.15]].map(([x, y, s], i) => tanne(x, y, s, false, i)).join("")}
          <!-- Häuschen -->
          <g transform="translate(820 700)">
            <circle cx="0" cy="-30" r="180" fill="url(#rzwiL)" class="glimm"/>
            <rect x="-90" y="-80" width="180" height="90" fill="#8a5636"/>${[0, 1, 2, 3, 4].map(k => `<rect x="-90" y="${-80 + k * 18}" width="180" height="2" fill="#6a3e26" opacity=".6"/>`).join("")}
            <rect x="46" y="-170" width="24" height="70" fill="#7a5a4a"/><rect x="42" y="-180" width="32" height="14" rx="6" fill="#fff"/>
            <path d="M-118 -76 L0 -158 L118 -76 Z" fill="#6a3e26"/><path d="M-124 -72 Q-60 -96 0 -164 Q60 -96 124 -72 Q110 -62 96 -70 Q50 -60 0 -70 Q-50 -60 -96 -70 Q-110 -62 -124 -72Z" fill="#fbfcff"/>
            <rect class="fenster" x="-66" y="-58" width="38" height="34" rx="4" fill="#ffd27a"/><rect class="fenster" x="28" y="-58" width="38" height="34" rx="4" fill="#ffd27a"/>
            <path d="M-47 -58 V-24 M-66 -41 H-28 M47 -58 V-24 M28 -41 H66" stroke="#6a3e26" stroke-width="3"/>
            <rect x="-14" y="-40" width="28" height="50" rx="3" fill="#5a321e"/><circle cx="8" cy="-14" r="2.5" fill="#ffd27a"/>
            <path d="M-100 10 Q0 -6 100 10 Q60 22 0 20 Q-60 22 -100 10Z" fill="#fff"/>
            <g transform="translate(-140 -10)"><rect x="-3" y="-40" width="6" height="50" fill="#3a3040"/><rect x="-10" y="-58" width="20" height="20" rx="3" fill="#ffe2a0"/><circle cx="0" cy="-48" r="40" fill="url(#rzwiL)" class="glimm"/></g>
          </g>
          <path d="M-200 780 Q400 720 900 780 T1800 770 V900 H-200Z" fill="url(#rzwiS2)"/>
          <path d="M-200 850 Q500 810 1000 850 T1800 840 V900 H-200Z" fill="#fff"/>
          ${Array.from({ length: 60 }, (_, i) => `<circle class="glitzer" style="animation-delay:${-i * .53}s" cx="${(i * 89.3) % 1600}" cy="${720 + (i * 37) % 175}" r="${1.4 + i % 3 * .6}" fill="#fff"/>`).join("")}
        </svg>
        ${Array.from({ length: 50 }, (_, i) => `<i class="stern" style="left:${(i * 37.7) % 100}%;top:${(i * 23.3) % 34}%;animation-delay:${-i * .37}s"></i>`).join("")}`;
      const L = leinwand(sz);
      const flocken = Array.from({ length: 220 }, (_, i) => { const z = i < 150 ? zuf(.25, .6) : i < 205 ? zuf(.6, 1) : zuf(1.4, 2.2); return { x: zuf(0, 1), y: zuf(0, 1), z, p: zuf(0, 7) }; });
      let rauch = [];
      return { frame(t, dt){
        const [W, H] = L.passen(), g = L.g; g.clearRect(0, 0, W, H); const s = Math.max(W / 1600, H / 900), ox = (W - 1600 * s) / 2, oy = H - 900 * s;
        // Rauch aus dem Schornstein (Szene 878|520)
        if (Math.random() < dt * 2.2) rauch.push({ x: 878, y: 515, l: 0, d: zuf(6, 9), dx: zuf(10, 30) });
        for (const r of rauch){ r.l += dt / r.d; const x = ox + (r.x + r.dx * r.l * 3 + Math.sin(r.l * 6) * 8) * s, y = oy + (r.y - r.l * 170) * s, rad = (10 + r.l * 40) * s, a = (1 - r.l) * .28;
          const gr = g.createRadialGradient(x, y, 0, x, y, rad); gr.addColorStop(0, `rgba(235,235,245,${a.toFixed(3)})`); gr.addColorStop(1, "rgba(235,235,245,0)"); g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad, 0, Math.PI * 2); g.fill(); }
        rauch = rauch.filter(r => r.l < 1);
        // Schneeflocken in drei Tiefen
        for (const f of flocken){ f.y += dt * .022 * f.z; f.x += Math.sin(t * .4 + f.p) * dt * .004 * f.z + dt * .002; if (f.y > 1.03){ f.y = -.03; f.x = zuf(0, 1); } if (f.x > 1.02) f.x = -.02;
          const x = f.x * W, y = f.y * H, r = f.z * (s * 1.8 + .6), a = f.z > 1.3 ? .45 : .55 + f.z * .35;
          if (f.z > 1.3){ const gr = g.createRadialGradient(x, y, 0, x, y, r * 2.4); gr.addColorStop(0, `rgba(255,255,255,${a})`); gr.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = gr; g.beginPath(); g.arc(x, y, r * 2.4, 0, Math.PI * 2); g.fill(); }
          else { g.fillStyle = `rgba(255,255,255,${Math.min(1, a).toFixed(2)})`; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); } } } };
    } },

  stadt: { titel: "Stadt bei Regen", emoji: "🏙️", stufe: "59", klang: ["regen:leise", "flaeche"], klangText: "Regen und ruhige Klangfläche",
    text: "Blick aus dem Fenster auf eine Stadt bei Nacht, Regen läuft an der Scheibe herunter.", farbe: "linear-gradient(#141b2e,#3a3f5c)",
    bauen(sz){
      sz.classList.add("rz-stadt");
      const haeuser = []; let x = -20;
      while (x < 1640){ const w = zuf(70, 160), h = zuf(180, 520); haeuser.push([x, w, h]); x += w + zuf(4, 18); }
      const fenster = [];
      const bau = (reihe, dunkel, unscharf) => haeuser.map(([x, w, h], i) => { const y = 900 - h * (reihe ? .72 : 1) - (reihe ? 120 : 40); let f = "";
        for (let fy = y + 20; fy < 860; fy += 26) for (let fx = x + 10; fx < x + w - 14; fx += 20) if (Math.random() < .38) { fenster.push(1); f += `<rect class="fenster-licht" x="${fx.toFixed(0)}" y="${fy.toFixed(0)}" width="9" height="13" fill="${["#ffd98a", "#ffe9b8", "#cfe3ff", "#ffc66b"][Math.floor(Math.random() * 4)]}" opacity="${zuf(.45, .95).toFixed(2)}"/>`; }
        return `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="900" fill="${dunkel}"/>${unscharf ? "" : f}`; }).join("");
      sz.innerHTML = `
        <svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs><linearGradient id="stH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1020"/><stop offset=".6" stop-color="#262b48"/><stop offset="1" stop-color="#4a3f58"/></linearGradient>
            <filter id="stF"><feGaussianBlur stdDeviation="5"/></filter><filter id="stN"><feGaussianBlur stdDeviation="1.6"/></filter></defs>
          <rect width="1600" height="900" fill="url(#stH)"/>
          <g filter="url(#stF)" opacity=".8">${bau(true, "#1b2036", true)}</g>
          <g filter="url(#stN)">${bau(false, "#0e1222", false)}</g>
          ${Array.from({ length: 16 }, (_, i) => `<circle cx="${(i * 107) % 1600}" cy="${820 + (i * 13) % 60}" r="${18 + i % 3 * 10}" fill="${["#ffcf7a", "#ff8a6a", "#9fc6ff"][i % 3]}" opacity=".35" filter="url(#stF)"/>`).join("")}
        </svg>
        <div style="position:absolute;inset:0;background:linear-gradient(rgba(20,26,46,.15),rgba(20,26,46,.35))"></div>`;
      const streifen = leinwand(sz); const glas = scheibe(sz, .8);
      const lichter = [...sz.querySelectorAll(".fenster-licht")]; let naechst = 3;
      return { frame(t, dt){
        naechst -= dt; if (naechst <= 0 && lichter.length){ naechst = zuf(2, 6); const l = lichter[Math.floor(Math.random() * lichter.length)]; l.style.opacity = l.style.opacity === "0" ? "" : "0"; }
        const [W, H] = streifen.passen(), g = streifen.g; g.clearRect(0, 0, W, H); g.strokeStyle = "rgba(200,215,240,.13)"; g.lineWidth = 1;
        g.beginPath(); for (let i = 0; i < 70; i++){ const x = (i * 97.3 + t * 260) % (W + 200) - 100, y = (i * 53.1 + t * 900 * (.7 + (i % 5) * .08)) % (H + 80) - 40; g.moveTo(x, y); g.lineTo(x - 6, y + 28); } g.stroke();
        glas(t, dt); } };
    } },

  meer: { titel: "Meer", emoji: "🌊", stufe: "59", klang: ["meer"], klangText: "Meeresrauschen",
    text: "Der Horizont im Abendlicht, langsame Wellen, ein Glitzern auf dem Wasser.", farbe: "linear-gradient(#f2a675,#5c6f9e 55%,#1f3c5e)",
    bauen(sz){
      sz.innerHTML = `<div style="position:absolute;inset:0;background:linear-gradient(#2b3a6b 0%, #8a6f9e 30%, #f2a675 52%, #ffd3a0 58%)"></div>
        <div style="position:absolute;left:50%;top:46%;width:min(26vmin,260px);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle, #fff4d6 0 30%, rgba(255,214,160,.6) 45%, rgba(255,190,130,0) 70%)"></div>`;
      const L = leinwand(sz);
      return { frame(t){
        const [W, H] = L.passen(), g = L.g, hor = H * .55; g.clearRect(0, 0, W, H);
        const farben = [["#c98a7a", "#9a6c80"], ["#8a6c88", "#5d5a82"], ["#5a5a80", "#3c4a72"], ["#3e4c74", "#2a3a62"], ["#2c3c64", "#1c2c50"], ["#1f2f56", "#142242"]];
        for (let i = 0; i < 6; i++){
          const y0 = hor + (H - hor) * Math.pow(i / 6, 1.35), amp = 1.5 + i * i * 1.8, len = 140 + i * 90, sp = .12 + i * .05;
          const gr = g.createLinearGradient(0, y0 - amp, 0, H); gr.addColorStop(0, farben[i][0]); gr.addColorStop(1, farben[i][1]);
          g.fillStyle = gr; g.beginPath(); g.moveTo(0, H);
          for (let x = 0; x <= W + 10; x += 10) g.lineTo(x, y0 + Math.sin(x / len + t * sp + i) * amp + Math.sin(x / (len * .43) - t * sp * 1.3) * amp * .4);
          g.lineTo(W, H); g.closePath(); g.fill();
        }
        // Glitzern der Sonne
        g.globalCompositeOperation = "lighter";
        for (let i = 0; i < 46; i++){ const y = hor + 4 + Math.pow(i / 46, 1.6) * (H - hor), b = 6 + i * 2.2, x = W / 2 + Math.sin(i * 12.9 + t * .7) * b * 1.6, a = (.25 + .25 * Math.sin(t * 2 + i * 3.1)) * (1 - i / 60);
          g.fillStyle = `rgba(255,220,170,${Math.max(0, a).toFixed(3)})`; g.fillRect(x - b / 2, y, b, 1.6 + i * .06); }
        g.globalCompositeOperation = "source-over"; } };
    } },

  polar: { titel: "Polarlicht", emoji: "🌌", stufe: "59", klang: ["flaeche:tief", "wind"], klangText: "tiefer, ruhiger Klang",
    text: "Grünes Polarlicht fließt langsam über den Nachthimmel und spiegelt sich im See.", farbe: "linear-gradient(#041021,#0f3b45 60%,#062030)",
    bauen(sz){
      sz.classList.add("rz-polar");
      sz.innerHTML = `<div style="position:absolute;inset:0;background:linear-gradient(#020611 0%, #06162b 50%, #0b2a3a 70%, #04101c 100%)"></div>
        ${Array.from({ length: 90 }, (_, i) => `<i class="stern" style="left:${(i * 37.7) % 100}%;top:${(i * 23.3) % 60}%;animation-delay:${-i * .37}s;opacity:.6"></i>`).join("")}`;
      const L = leinwand(sz), S = leinwand(sz); L.c.style.filter = "blur(5px)"; S.c.style.cssText = "transform:scaleY(-1);opacity:.42;filter:blur(6px);top:auto;bottom:0;height:36%;";
      sz.insertAdjacentHTML("beforeend", `<svg class="voll" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs><linearGradient id="plB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1a26"/><stop offset="1" stop-color="#03080e"/></linearGradient>
            <linearGradient id="plS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e2c34" stop-opacity=".2"/><stop offset="1" stop-color="#020810" stop-opacity=".9"/></linearGradient></defs>
          <path d="M-200 580 L60 470 L180 520 L330 400 L520 540 L700 450 L860 560 L1040 430 L1220 520 L1400 420 L1600 510 L1800 470 V580Z" fill="url(#plB)"/>
          <path d="M330 400 L370 432 L340 436 L312 418Z M1040 430 L1080 460 L1050 464 L1020 448Z M1400 420 L1440 450 L1410 454 L1380 438Z" fill="#c8d8e6" opacity=".35"/>
          <rect x="-200" y="580" width="2000" height="320" fill="url(#plS)"/>
          <g fill="#02060b">${[40, 140, 1380, 1480, 1560].map((x, i) => `<path d="M${x} 600 L${x + 50} 600 L${x + 25} ${470 - i % 2 * 50}Z"/>`).join("")}</g>
        </svg>`);
      const BAND = [{ y: .22, h: .22, f: .0024, s: .05, c: [80, 255, 170] }, { y: .32, h: .16, f: .0031, s: -.035, c: [60, 220, 200] }, { y: .16, h: .12, f: .0018, s: .028, c: [170, 120, 255] }];
      return { frame(t){
        const [W, H] = L.passen(), g = L.g; g.clearRect(0, 0, W, H); g.globalCompositeOperation = "lighter";
        for (const b of BAND){ for (let x = 0; x < W; x += 6){
          const y = H * b.y + Math.sin(x * b.f + t * b.s * 6) * H * .05 + Math.sin(x * b.f * 2.7 - t * b.s * 4) * H * .025;
          const h = H * b.h * (.55 + .45 * Math.sin(x * b.f * 3.3 + t * .3 + b.y * 10));
          const a = .05 + .05 * Math.sin(x * .004 + t * .4 + b.f * 1000);
          const gr = g.createLinearGradient(0, y, 0, y - h); gr.addColorStop(0, `rgba(${b.c},${(a * 1.6).toFixed(3)})`); gr.addColorStop(.35, `rgba(${b.c},${a.toFixed(3)})`); gr.addColorStop(1, `rgba(${b.c},0)`);
          g.fillStyle = gr; g.fillRect(x, y - h, 7, h + 6); } }
        g.globalCompositeOperation = "source-over";
        // Spiegelung im See
        const [w2, h2] = S.passen(); S.g.clearRect(0, 0, w2, h2); S.g.drawImage(L.c, 0, 0, L.c.width, L.c.height * .62, 0, 0, w2, h2); } };
    } }
};

/* ======================= Ablauf ======================= */
const E = { minuten: 0, minutenSek: 20, laut: .5, klang: true };
try { Object.assign(E, JSON.parse(localStorage.getItem("lt-ruhig") || "{}")); } catch (x) {}
const merken = () => { try { localStorage.setItem("lt-ruhig", JSON.stringify(E)); } catch (x) {} };
let el, sz, inst, key, raf = 0, letzte = 0, t0 = 0, zeitStart = 0, zeitDauer = 0, gruppe = "alle", endeGezeigt = false;
const GRUPPEN = [["12", "Klasse 1/2"], ["34", "Klasse 3/4"], ["59", "Klasse 5–9"]];

function aufbauen(){
    if (el) return;
    const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    el = document.createElement("div"); el.id = "rz"; document.body.appendChild(el);
    el.addEventListener("click", klick);
    el.addEventListener("input", e => { if (e.target.id === "rzLaut"){ E.laut = +e.target.value; merken(); Klang.lautstaerke(E.laut); } });
    document.addEventListener("visibilitychange", () => { if (document.hidden) cancelAnimationFrame(raf), raf = 0; else if (el.classList.contains("an") && inst && !raf) { letzte = performance.now(); raf = requestAnimationFrame(schritt); } });
}

function wahlZeigen(){
    stopp();
    const zeig = gruppe === "gs" ? ["12", "34"] : gruppe === "sek" ? ["59"] : ["12", "34", "59"];
    el.className = "an";
    el.innerHTML = `<div class="rz-wahl"><div class="rz-wahl-kopf"><div><h2>🎧 Ruhige Arbeitszeit</h2><small>Läuft ganz ruhig nebenbei – ohne Mikrofon, ohne Punkte. Flüstern ist erlaubt.</small></div><button data-a="zu" title="Schließen">✕</button></div>
      ${GRUPPEN.filter(([g]) => zeig.includes(g)).map(([g, n]) => `<div class="rz-gruppe">${n}</div><div class="rz-karten">${Object.entries(SZENEN).filter(([, s]) => s.stufe === g || (s.auch === g && !zeig.includes(s.stufe))).map(([k, s]) => `<button class="rz-karte" data-szene="${k}"><div class="bild" style="background:${s.farbe}">${s.emoji}</div><div class="text"><h3>${s.titel}</h3><p>${s.text}</p><span class="klang">🔈 ${s.klangText}</span></div></button>`).join("")}</div>`).join("")}
      ${gruppe !== "alle" ? `<div class="rz-gruppe" style="text-align:center"><button class="rz-k" data-a="alle" style="background:#28465f">Alle Szenen zeigen</button></div>` : ""}</div>`;
}

function szeneStarten(k){
    stopp();
    key = k; const s = SZENEN[k];
    const min = s.stufe === "59" ? E.minutenSek : E.minuten;
    el.className = "an";
    el.innerHTML = `<div class="rz-szene"></div><div class="rz-korn"></div><div class="rz-vign"></div>
      <div class="rz-leiste"><span class="rz-titel">${s.emoji} ${s.titel}</span>
        <button class="rz-k" data-a="klang" title="Klang an/aus">${E.klang ? "🔈" : "🔇"}</button>
        <button class="rz-k" data-a="menue" title="Einstellungen">⚙️</button>
        <button class="rz-k" data-a="voll" title="Vollbild">⛶</button>
        <button class="rz-k" data-a="wahl" title="Andere Szene">☰</button>
        <button class="rz-k" data-a="zu" title="Schließen">✕</button></div>
      <div class="rz-menue">
        <h4>Zeitleiste</h4><div class="rz-reihe">${[0, 10, 15, 20, 25, 30, 45].map(m => `<button data-min="${m}" class="${min === m ? "an" : ""}">${m ? m + " Min." : "aus"}</button>`).join("")}</div>
        <h4>Lautstärke</h4><label>🔈 <input id="rzLaut" type="range" min="0.05" max="1" step="0.05" value="${E.laut}"> 🔊</label>
        <h4>Szene</h4><div class="rz-reihe">${Object.entries(SZENEN).map(([kk, x]) => `<button data-szene="${kk}" class="${kk === k ? "an" : ""}">${x.emoji} ${x.titel}</button>`).join("")}</div>
      </div>
      ${min ? `<div class="rz-zeit"><div class="bahn"><i></i></div><b></b></div>` : ""}
      <div class="rz-ende">Die Arbeitszeit ist vorbei.<small>Langsam zum Ende kommen.</small></div>
      ${E.klang ? `<button class="rz-start" data-a="klangan">▶ Starten mit Klang</button>` : ""}`;
    sz = el.querySelector(".rz-szene");
    inst = s.bauen(sz);
    zeitDauer = min * 60; zeitStart = performance.now(); endeGezeigt = false;
    t0 = performance.now(); letzte = t0; raf = requestAnimationFrame(schritt);
    try { history.replaceState(null, "", "#ruhig-" + k); } catch (x) {}
}

function schritt(jetzt){
    raf = requestAnimationFrame(schritt);
    const dt = Math.min(.1, (jetzt - letzte) / 1000); letzte = jetzt;
    const W = sz.clientWidth || 800, H = sz.clientHeight || 450;
    try { inst.frame((jetzt - t0) / 1000, dt, W, H); } catch (x) {}
    if (zeitDauer){
        const vorbei = (jetzt - zeitStart) / 1000, rest = Math.max(0, zeitDauer - vorbei);
        const z = el.querySelector(".rz-zeit");
        if (z){ z.querySelector("i").style.transform = `scaleX(${(rest / zeitDauer).toFixed(4)})`; const m = Math.ceil(rest / 60); z.querySelector("b").textContent = rest > 0 ? (m <= 1 ? "noch 1 Min." : "noch " + m + " Min.") : "Zeit ist um"; }
        if (rest <= 0 && !endeGezeigt){ endeGezeigt = true; el.querySelector(".rz-ende").classList.add("an"); Klang.lautstaerke(Math.min(E.laut, .25)); setTimeout(() => { const e = el.querySelector(".rz-ende"); if (e) e.classList.remove("an"); }, 12000); }
    }
}

function klangStarten(){ const s = SZENEN[key]; if (Klang.an(s.klang)) Klang.lautstaerke(E.laut); const b = el.querySelector(".rz-start"); if (b) b.remove(); }
function stopp(){ cancelAnimationFrame(raf); raf = 0; Klang.aus(); inst = null; }

function klick(e){
    const t = e.target.closest("button");
    if (!t){ if (!e.target.closest(".rz-menue")) el.classList.remove("menue"); return; }
    if (t.dataset.szene) return szeneStarten(t.dataset.szene);
    if (t.dataset.min !== undefined){ const m = +t.dataset.min; if (SZENEN[key].stufe === "59") E.minutenSek = m; else E.minuten = m; merken(); const klangLief = Klang.laeuft(); szeneStarten(key); if (klangLief) klangStarten(); return; }
    const a = t.dataset.a;
    if (a === "zu") return schliessen();
    if (a === "wahl") return wahlZeigen();
    if (a === "alle"){ gruppe = "alle"; return wahlZeigen(); }
    if (a === "menue") return el.classList.toggle("menue");
    if (a === "voll") return window.vollbild ? window.vollbild() : null;
    if (a === "klangan") return klangStarten();
    if (a === "klang"){ E.klang = !E.klang; merken(); t.textContent = E.klang ? "🔈" : "🔇"; if (E.klang) klangStarten(); else { Klang.aus(); const b = el.querySelector(".rz-start"); if (b) b.remove(); } return; }
}

function oeffnen(g){
    aufbauen(); gruppe = g || "alle";
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "none";
    if (SZENEN[g]) return szeneStarten(g);
    try { history.replaceState(null, "", "#ruhig" + (g === "sek" ? "-sek" : g === "gs" ? "-gs" : "")); } catch (x) {}
    wahlZeigen();
}
function schliessen(){
    stopp(); el.className = ""; el.innerHTML = "";
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "";
    try { history.replaceState(null, "", location.pathname); } catch (x) {}
}
window.tafelRuhig = { oeffnen, schliessen, SZENEN };
document.addEventListener("DOMContentLoaded", () => { const m = /^#ruhig(?:-([a-z]+))?$/.exec(location.hash); if (m) oeffnen(m[1] || "alle"); });
})();
