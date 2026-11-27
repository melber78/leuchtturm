/* ============================================================
   Leuchtturm – Action-Spiele für die LRS-Lernspiele
   Wort-Runner · Asteroiden-Jagd · Monster füttern
   Münzen sammeln, Highscore knacken, Figuren freischalten.
   Der Lerninhalt kommt aus lrs-spiele.php (Kind, Schwerpunkt,
   bekannte Buchstaben, Fehlerwörter).
   ============================================================ */
(function(){
const AR_SPIELE = {
    runner:  { titel: "Runner", emoji: "🏃", text: "Weich den Hindernissen aus und sammle Münzen. Es wird immer schneller!", gs: true, sek: true },
    weltall: { titel: "Asteroiden-Jagd", emoji: "🚀", text: "Schieß die Asteroiden ab – aber nie die Bomben!", gs: true, sek: true },
    monster: { titel: "Monster füttern", emoji: "👾", text: "Füttere das Monster mit Leckerem. Bloß keine Chilis!", gs: true, sek: false },
};
const AR_FIGUREN = {
    runner: [["🦊", 0], ["🐱", 40], ["🐶", 80], ["🐸", 120], ["🦄", 200], ["🐼", 260], ["🦖", 350], ["🤖", 500]],
    runnerSek: [["🏃", 0], ["🛹", 60], ["🚲", 120], ["🥷", 200], ["🤖", 300], ["🦖", 400], ["🏎️", 550], ["🛸", 800]],
    weltall: [["#7fd1ff", 0], ["#ffd166", 50], ["#ff6b9a", 100], ["#9cff8a", 160], ["#c39bff", 240], ["#ff9f43", 320], ["#ffffff", 450], ["regenbogen", 700]],
    monster: [["#7ac74f", 0], ["#5fb4ff", 50], ["#ff8fb1", 100], ["#ffb347", 160], ["#b388ff", 240], ["#ff6b6b", 320], ["#3fd1c6", 450], ["regenbogen", 700]],
};
const figurenListe = id => id === "runner" && sek() ? AR_FIGUREN.runnerSek : AR_FIGUREN[id];

/* ---------- Speicher je Kind ---------- */
const schluessel = () => "sp-arcade-" + (S.kind?.code || "_");
function konto(){ const k = laden(schluessel(), null) || {}; k.muenzen = k.muenzen || 0; k.best = k.best || {}; k.frei = k.frei || {}; k.aktiv = k.aktiv || {}; return k; }
function kontoSpeichern(k){ merken(schluessel(), k); }
function aktiveFigur(id){ const k = konto(), l = figurenListe(id), i = k.aktiv[id + (sek() ? "S" : "")] ?? 0; return l[i] ? l[i][0] : l[0][0]; }

/* ---------- Töne ---------- */
function sfx(art){
    if (!S.ton) return;
    try {
        window._arAc = window._arAc || new (window.AudioContext || window.webkitAudioContext)();
        const ac = window._arAc, t = ac.currentTime;
        const ton = (f, d, typ = "square", vol = .05, f2 = null, start = 0) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = typ; o.frequency.setValueAtTime(f, t + start);
            if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + start + d); g.gain.setValueAtTime(vol, t + start); g.gain.exponentialRampToValueAtTime(.0001, t + start + d); o.connect(g).connect(ac.destination); o.start(t + start); o.stop(t + start + d); };
        if (art === "pew") ton(900, .15, "square", .035, 200);
        if (art === "boom"){ ton(160, .35, "sawtooth", .06, 40); }
        if (art === "muenze"){ ton(988, .08, "square", .04); ton(1319, .22, "square", .04, null, .08); }
        if (art === "gut"){ ton(523, .1, "triangle", .08); ton(784, .18, "triangle", .08, null, .09); }
        if (art === "au"){ ton(220, .3, "sawtooth", .05, 110); }
        if (art === "level"){ [523, 659, 784, 1047].forEach((f, i) => ton(f, .16, "triangle", .07, null, i * .1)); }
        if (art === "mampf"){ ton(300, .08, "sine", .1, 180); ton(260, .1, "sine", .1, 140, .1); }
    } catch (e){}
}

/* ---------- Energie: wird beim ruhigen Üben gesammelt, eine Action-Runde kostet sie ---------- */
const KOSTEN = 10;
const eKey = () => "sp-energie-" + (S.kind?.code || "_");
function energie(){ return laden(eKey(), 0); }
function freispiel(){ return !!laden("sp-freispiel", false); }

/* ---------- Oberfläche ---------- */
const css = `
#arcade{ position:fixed; inset:0; z-index:60; display:none; background:#0d1a10; color:#fff; font-family:Nunito, sans-serif; user-select:none; -webkit-user-select:none; touch-action:none; }
#arcade.an{ display:block; }
.ar-start{ position:absolute; inset:0; overflow:auto; padding:22px; display:flex; flex-direction:column; align-items:center; gap:16px; text-align:center; background:radial-gradient(circle at 50% 0%, #2f4a1f, #0d1a10 70%); }
.ar-start h2{ font-family:Fraunces, Georgia, serif; font-size:clamp(34px, 7vw, 52px); margin:10px 0 0; color:#ffe08a; text-shadow:0 4px 0 #6b4a12; }
.ar-start .gross{ font-size:72px; filter:drop-shadow(0 6px 10px rgba(0,0,0,.4)); animation:ar-hupf 1.6s ease-in-out infinite; }
@keyframes ar-hupf{ 50%{ transform:translateY(-10px); } }
.ar-werte{ display:flex; gap:12px; flex-wrap:wrap; justify-content:center; }
.ar-wert{ background:rgba(255,255,255,.08); border:2px solid rgba(255,255,255,.12); border-radius:16px; padding:8px 16px; font-weight:900; font-size:18px; }
.ar-chips{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; }
.ar-chip{ border:2px solid rgba(255,255,255,.2); background:transparent; color:#fff; border-radius:999px; padding:9px 16px; font-weight:800; }
.ar-chip.an{ background:#ffe08a; color:#2f2a10; border-color:#ffe08a; }
.ar-los{ border:0; background:linear-gradient(#ffd75e, #f0a92b); color:#3b2a06; font-weight:900; font-size:26px; border-radius:22px; padding:16px 54px; box-shadow:0 6px 0 #9b6512; }
.ar-los:active{ transform:translateY(4px); box-shadow:0 2px 0 #9b6512; }
.ar-figuren{ display:grid; grid-template-columns:repeat(4, 74px); gap:10px; justify-content:center; }
.ar-fig{ height:74px; border-radius:18px; border:3px solid rgba(255,255,255,.14); background:rgba(255,255,255,.06); font-size:36px; color:#fff; position:relative; display:grid; place-items:center; }
.ar-fig.an{ border-color:#ffe08a; background:rgba(255,224,138,.15); }
.ar-fig small{ position:absolute; bottom:3px; left:0; right:0; font-size:12px; font-weight:900; color:#ffe08a; }
.ar-fig.zu{ filter:grayscale(1) brightness(.6); }
.ar-zu{ position:absolute; top:max(12px, env(safe-area-inset-top)); left:12px; z-index:5; width:46px; height:46px; border-radius:50%; border:0; background:rgba(255,255,255,.14); color:#fff; font-size:20px; }
.ar-hud{ position:absolute; top:0; left:0; right:0; z-index:4; padding:max(10px, env(safe-area-inset-top)) 12px 8px 68px; display:flex; gap:10px; align-items:center; pointer-events:none; }
.ar-hud .ar-wert{ font-size:16px; padding:6px 12px; background:rgba(0,0,0,.35); }
.ar-frage{ position:absolute; top:calc(max(10px, env(safe-area-inset-top)) + 54px); left:50%; transform:translateX(-50%); z-index:4; background:rgba(255,255,255,.95); color:#2d3530; border-radius:20px; padding:10px 22px;
    font-family:var(--wort); font-size:clamp(26px, 6vw, 44px); box-shadow:0 8px 24px rgba(0,0,0,.35); display:flex; gap:14px; align-items:center; max-width:94%; text-align:center; pointer-events:auto; }
.ar-frage.satz{ font-size:clamp(18px, 4vw, 28px); }
.ar-frage svg{ width:72px; height:72px; }
.ar-frage .ar-sag{ border:0; background:#edf2e3; border-radius:50%; width:48px; height:48px; font-size:20px; flex:0 0 auto; }
.ar-luecke{ display:inline-block; min-width:1.2em; color:#d9a23f; border-bottom:4px solid #d9a23f; }
.ar-hoer{ font-family:Nunito, sans-serif; font-size:20px; font-weight:800; }
.ar-feld{ position:absolute; inset:0; overflow:hidden; }
.ar-banner{ position:absolute; left:50%; top:42%; transform:translate(-50%, -50%); z-index:6; font-family:Fraunces, Georgia, serif; font-size:clamp(30px, 7vw, 54px); color:#ffe08a; text-shadow:0 4px 0 #6b4a12, 0 0 30px rgba(255,200,80,.5); white-space:nowrap; pointer-events:none; animation:ar-banner 1.4s forwards; }
@keyframes ar-banner{ 0%{ opacity:0; transform:translate(-50%, -50%) scale(.4); } 20%{ opacity:1; transform:translate(-50%, -50%) scale(1.1); } 80%{ opacity:1; transform:translate(-50%, -50%) scale(1); } 100%{ opacity:0; transform:translate(-50%, -60%) scale(1); } }
.ar-plus{ position:absolute; z-index:5; font-weight:900; font-size:26px; color:#ffe08a; pointer-events:none; animation:ar-plus .9s forwards; text-shadow:0 2px 0 #6b4a12; }
@keyframes ar-plus{ to{ transform:translateY(-60px); opacity:0; } }
.ar-loesung{ position:absolute; left:50%; bottom:20%; transform:translateX(-50%); z-index:6; background:#fff; color:#2d3530; border-radius:18px; padding:10px 20px; font-family:var(--wort); font-size:clamp(24px, 5vw, 36px); box-shadow:0 0 0 6px rgba(181,88,63,.5); pointer-events:none; white-space:nowrap; }
.ar-ende{ position:absolute; inset:0; z-index:8; background:rgba(5,12,6,.82); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; text-align:center; padding:20px; }
.ar-ende h2{ font-family:Fraunces, Georgia, serif; color:#ffe08a; font-size:clamp(34px, 7vw, 54px); margin:0; }
.ar-ende .rekord{ color:#9cff8a; font-weight:900; font-size:22px; animation:ar-hupf 1s infinite; }
.ar-schuettel{ animation:ar-schuettel .35s; }
@keyframes ar-schuettel{ 20%{ transform:translateX(-10px); } 40%{ transform:translateX(10px); } 60%{ transform:translateX(-6px); } 80%{ transform:translateX(6px); } }

/* Runner */
.ar-runner{ background:linear-gradient(#18301a, #24452a); }
.ar-strasse{ position:absolute; top:0; bottom:0; left:8%; right:8%; background:#3b3328; border-left:6px solid #6b5a43; border-right:6px solid #6b5a43;
    background-image:repeating-linear-gradient(to bottom, transparent 0 46px, rgba(255,255,255,.18) 46px 92px); background-size:6px 92px; background-repeat:repeat-y; }
.ar-strasse::before, .ar-strasse::after{ content:""; position:absolute; top:0; bottom:0; width:4px; background:inherit; background-image:repeating-linear-gradient(to bottom, rgba(255,255,255,.22) 0 40px, transparent 40px 92px); }
.ar-strasse::before{ left:33.3%; } .ar-strasse::after{ left:66.6%; }
.ar-baum{ position:absolute; font-size:34px; z-index:1; }
.ar-spieler{ position:absolute; bottom:12%; z-index:3; font-size:64px; transform:translateX(-50%); transition:left .14s ease-out; filter:drop-shadow(0 8px 6px rgba(0,0,0,.45)); }
.ar-spieler.lauf{ animation:ar-lauf .32s infinite alternate; }
@keyframes ar-lauf{ to{ margin-bottom:8px; } }
.ar-tore{ position:absolute; left:8%; right:8%; display:flex; z-index:2; }
.ar-tor{ flex:1; margin:0 6px; height:76px; border-radius:18px 18px 8px 8px; background:linear-gradient(#ffffff, #e9eee0); color:#2d3530; display:grid; place-items:center;
    font-family:var(--wort); font-size:clamp(24px, 5.5vw, 40px); box-shadow:0 6px 0 #a7b496; border:4px solid #d9a23f; overflow:hidden; white-space:nowrap; }
.ar-tor.ok{ background:#9cff8a; border-color:#3d9a2a; }
.ar-tor.nein{ background:#ffb4a0; border-color:#b5583f; }
.ar-muenze{ position:absolute; z-index:2; font-size:38px; transform:translateX(-50%); }

.ar-reihe .ar-zelle{ flex:1; margin:0 6px; height:76px; display:grid; place-items:center; font-size:54px; filter:drop-shadow(0 6px 4px rgba(0,0,0,.35)); }
.ar-ding{ position:absolute; z-index:2; transform:translate(-50%, -50%); font-size:clamp(46px, 10vw, 64px); cursor:pointer; filter:drop-shadow(0 6px 6px rgba(0,0,0,.3)); line-height:1; padding:8px; }
.ar-ding.fels{ font-size:var(--g); }
/* Weltall & Monster */
.ar-weltall{ background:radial-gradient(ellipse at 50% 120%, #22365e, #070b1a 70%); }
.ar-stern{ position:absolute; width:2px; height:2px; background:#fff; border-radius:50%; }
.ar-schiff{ position:absolute; bottom:4%; left:50%; width:86px; height:96px; margin-left:-43px; z-index:3; transform-origin:50% 70%; }
.ar-ast{ position:absolute; z-index:2; transform:translate(-50%, -50%); padding:14px 22px; border-radius:46% 54% 50% 50% / 55% 45% 55% 45%; background:radial-gradient(circle at 35% 30%, #a2958a, #5b5048);
    color:#fff; font-family:var(--wort); font-size:clamp(20px, 4.4vw, 30px); text-shadow:0 2px 3px rgba(0,0,0,.7); box-shadow:inset -6px -8px 0 rgba(0,0,0,.25), 0 0 0 3px rgba(255,255,255,.08); white-space:nowrap; cursor:pointer; text-align:center; }
.ar-ast svg{ display:block; width:58px; height:58px; margin:0 auto 2px; }
.ar-laser{ position:absolute; height:5px; transform-origin:0 50%; z-index:2; border-radius:3px; background:linear-gradient(90deg, rgba(255,255,255,.2), #fff); box-shadow:0 0 14px 3px var(--farbe, #7fd1ff); pointer-events:none; animation:ar-weg .25s forwards; }
@keyframes ar-weg{ to{ opacity:0; } }
.ar-funke{ position:absolute; width:9px; height:9px; border-radius:50%; z-index:3; pointer-events:none; }
.ar-regel{ position:absolute; top:calc(max(10px, env(safe-area-inset-top)) + 54px); left:50%; transform:translateX(-50%); z-index:4; background:rgba(255,255,255,.95); color:#2d3530; border-radius:18px; padding:10px 20px;
    font-weight:900; font-size:clamp(17px, 3.8vw, 24px); box-shadow:0 8px 24px rgba(0,0,0,.35); text-align:center; max-width:92%; pointer-events:auto; display:flex; gap:10px; align-items:center; }
.ar-regel small{ display:block; font-weight:700; color:#68745f; font-size:.75em; }
.ar-regel .ar-sag{ border:0; background:#edf2e3; border-radius:50%; width:42px; height:42px; font-size:18px; flex:0 0 auto; }
.ar-monsterwelt{ background:linear-gradient(#bfe3ff, #e8f6ff 60%, #a6d97f 60%, #7fbf5a); }
.ar-monsterwelt .ar-ast{ background:#fff; color:#2d3530; text-shadow:none; border-radius:20px; border:3px solid #d9e6cc; box-shadow:0 6px 0 rgba(0,0,0,.12); }
.ar-monster{ position:absolute; bottom:3%; left:50%; transform:translateX(-50%); z-index:3; width:170px; height:150px; transition:width .3s, height .3s; }
.ar-monster.bah{ animation:ar-schuettel .4s; }
`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
const box = document.createElement("div"); box.id = "arcade"; document.body.appendChild(box);

let LAUF = null;   // laufendes Spiel (für Stopp)
function stopp(){ if (LAUF){ LAUF.aus = true; cancelAnimationFrame(LAUF.raf); clearTimeout(LAUF.t); } LAUF = null; try { speechSynthesis.cancel(); } catch (e){} }
function schliessenAr(){ stopp(); box.classList.remove("an"); box.innerHTML = ""; document.body.style.overflow = ""; if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); arKarten(); }

function farbe(c){ return c === "regenbogen" ? "url(#ar-rb)" : c; }
function schiffSvg(c){ return `<svg viewBox="0 0 86 96"><defs><linearGradient id="ar-rb" x1="0" x2="1"><stop offset="0" stop-color="#ff6b6b"/><stop offset=".33" stop-color="#ffd166"/><stop offset=".66" stop-color="#5fb4ff"/><stop offset="1" stop-color="#c39bff"/></linearGradient></defs>
    <path d="M43 4 C60 22 64 46 62 70 L24 70 C22 46 26 22 43 4z" fill="${farbe(c)}"/><circle cx="43" cy="36" r="9" fill="#0d1a2e" stroke="#fff" stroke-width="3"/>
    <path d="M24 52 L6 76 L24 72z M62 52 L80 76 L62 72z" fill="${farbe(c)}" opacity=".8"/><path d="M30 72 L43 92 L56 72z" fill="#ffb347"><animate attributeName="opacity" values="1;.4;1" dur=".25s" repeatCount="indefinite"/></path></svg>`; }
function monsterSvg(c, mund = "auf"){
    const m = mund === "zu" ? `<path d="M55 104 q30 14 60 0" stroke="#2d1b2e" stroke-width="6" fill="none" stroke-linecap="round"/>`
        : mund === "bah" ? `<path d="M55 112 q30 -16 60 0" stroke="#2d1b2e" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M78 112 q7 14 14 0" fill="#ff6b9a"/>`
        : `<ellipse cx="85" cy="104" rx="34" ry="22" fill="#2d1b2e"/><path d="M58 96 l8 10 l8 -10 l8 10 l8 -10 l8 10 l8 -10" fill="#fff"/><ellipse cx="85" cy="118" rx="16" ry="6" fill="#ff6b9a"/>`;
    return `<svg viewBox="0 0 170 150"><defs><linearGradient id="ar-rb2" x1="0" x2="1"><stop offset="0" stop-color="#ff6b6b"/><stop offset=".33" stop-color="#ffd166"/><stop offset=".66" stop-color="#5fb4ff"/><stop offset="1" stop-color="#c39bff"/></linearGradient></defs>
        <path d="M20 150 C10 60 40 18 85 18 C130 18 160 60 150 150z" fill="${c === "regenbogen" ? "url(#ar-rb2)" : c}"/>
        <path d="M45 28 l-8 -22 l22 14z M125 28 l8 -22 l-22 14z" fill="${c === "regenbogen" ? "#c39bff" : c}"/>
        <circle cx="62" cy="62" r="18" fill="#fff"/><circle cx="108" cy="62" r="18" fill="#fff"/><circle cx="66" cy="66" r="8" fill="#2d1b2e"/><circle cx="104" cy="66" r="8" fill="#2d1b2e"/>${m}</svg>`;
}

/* ---------- Startbildschirm ---------- */
const STARTER = () => ({ runner: runnerStart, weltall: fallStart, monster: fallStart });
function startZeigen(id){
    stopp();
    const sp = AR_SPIELE[id], k = konto(), e = energie(), frei = freispiel(), genug = frei || e >= KOSTEN;
    const liste = figurenListe(id), aktivKey = id + (sek() ? "S" : ""), aktiv = k.aktiv[aktivKey] ?? 0;
    const zeigeFig = (f, i) => {
        const offen = i === 0 || (k.frei[aktivKey] || []).includes(i);
        const inhalt = id === "runner" ? f[0] : id === "weltall" ? `<div style="width:46px;height:52px">${schiffSvg(f[0])}</div>` : `<div style="width:52px;height:46px">${monsterSvg(f[0], "zu")}</div>`;
        return `<button class="ar-fig${i === aktiv ? " an" : ""}${offen ? "" : " zu"}" data-fig="${i}">${inhalt}${offen ? "" : `<small>🪙 ${f[1]}</small>`}</button>`;
    };
    box.innerHTML = `<button class="ar-zu" id="ar-zu">✕</button><div class="ar-start">
        <div class="gross">${sp.emoji}</div><h2>${esc(sp.titel)}</h2>
        <div class="ar-werte"><div class="ar-wert">⚡ ${e} Energie</div><div class="ar-wert">🪙 ${k.muenzen}</div><div class="ar-wert">🏆 Rekord ${k.best[id] || 0}</div></div>
        <div style="font-weight:800;opacity:.85;max-width:520px">${frei ? "Freispiel – heute ohne Energie." : `Eine Runde kostet <b style="color:#ffe08a">⚡ ${KOSTEN}</b>. Energie gibt es fürs Üben – in der Weltenreise und bei den ruhigen Spielen.`}</div>
        <div style="font-weight:800;opacity:.75">Deine Figur – mit Münzen freischalten:</div>
        <div class="ar-figuren">${liste.map(zeigeFig).join("")}</div>
        <button class="ar-los" id="ar-los"${genug ? "" : ' style="filter:grayscale(1);opacity:.6"'}>${genug ? "Los geht's!" : `Noch ⚡ ${KOSTEN - e} sammeln`}</button></div>`;
    box.querySelector("#ar-zu").onclick = schliessenAr;
    box.querySelectorAll("[data-fig]").forEach(b => b.onclick = () => {
        const i = +b.dataset.fig, kk = konto(), fr = kk.frei[aktivKey] || [];
        if (i !== 0 && !fr.includes(i)){
            const preis = liste[i][1];
            if (kk.muenzen < preis){ b.classList.remove("ar-schuettel"); void b.offsetWidth; b.classList.add("ar-schuettel"); sfx("au"); return; }
            kk.muenzen -= preis; kk.frei[aktivKey] = [...fr, i]; sfx("level");
        } else sfx("muenze");
        kk.aktiv[aktivKey] = i; kontoSpeichern(kk); startZeigen(id);
    });
    box.querySelector("#ar-los").onclick = () => {
        if (!genug){ sfx("au"); banner("Erst üben ⚡"); return; }
        if (!frei) merken(eKey(), energie() - KOSTEN);
        try { const el = document.documentElement; if (!document.fullscreenElement && el.requestFullscreen && matchMedia("(pointer:coarse)").matches) el.requestFullscreen().catch(() => {}); } catch (x){}
        STARTER()[id](id);
    };
}
function hud(id, extra = ""){
    return `<button class="ar-zu" id="ar-zu">✕</button><div class="ar-hud"><div class="ar-wert" id="ar-herzen"></div><div class="ar-wert" id="ar-punkte">⭐ 0</div><div class="ar-wert" id="ar-muenzen">🪙 0</div>${extra}</div>`;
}
function herzen(n){ const e = box.querySelector("#ar-herzen"); if (e) e.textContent = "❤️".repeat(Math.max(0, n)) + "🖤".repeat(Math.max(0, 3 - n)); }
function banner(t){ const b = document.createElement("div"); b.className = "ar-banner"; b.textContent = t; box.appendChild(b); setTimeout(() => b.remove(), 1500); }
function plus(x, y, t){ const p = document.createElement("div"); p.className = "ar-plus"; p.style.left = x + "px"; p.style.top = y + "px"; p.textContent = t; box.appendChild(p); setTimeout(() => p.remove(), 950); }
function spielEnde(id, punkte, muenzen){
    stopp();
    const k = konto(), rekord = punkte > (k.best[id] || 0);
    if (rekord) k.best[id] = punkte;
    k.muenzen += muenzen; kontoSpeichern(k);
    const e = document.createElement("div"); e.className = "ar-ende";
    e.innerHTML = `<h2>${punkte >= 150 ? "Wahnsinn!" : punkte >= 60 ? "Stark!" : "Geschafft!"}</h2>${rekord && punkte ? `<div class="rekord">🏆 Neuer Rekord!</div>` : ""}
        <div class="ar-werte"><div class="ar-wert">⭐ ${punkte} Punkte</div><div class="ar-wert">🪙 +${muenzen}</div><div class="ar-wert">🏆 ${k.best[id] || 0}</div></div>
        <div class="ar-chips" style="margin-top:12px"><button class="ar-los" id="ar-nochmal">Nochmal${freispiel() ? "" : ` (⚡ ${KOSTEN})`}</button><button class="ar-chip" id="ar-menue" style="font-size:18px">Figuren & Münzen</button></div>`;
    box.appendChild(e);
    if (rekord && punkte) sfx("level");
    e.querySelector("#ar-nochmal").onclick = () => startZeigen(id);
    e.querySelector("#ar-menue").onclick = () => startZeigen(id);
}

/* ---------- Runner: ausweichen und Münzen sammeln (reines Belohnungsspiel) ---------- */
function runnerStart(id){
    stopp();
    const L = LAUF = { aus: false };
    box.innerHTML = hud(id) + `<div class="ar-feld ar-runner" id="ar-feld"><div class="ar-strasse"></div><div class="ar-spieler lauf" id="ar-sp">${aktiveFigur("runner")}</div></div>`;
    box.querySelector("#ar-zu").onclick = schliessenAr;
    const feld = box.querySelector("#ar-feld"), spieler = box.querySelector("#ar-sp"), strasse = feld.querySelector(".ar-strasse");
    let spur = 1, leben = 3, punkte = 0, muenzen = 0, tempo = 26, reihen = [], bis = .6, roll = 0, geschafft = 0, unverwundbar = 0;
    const HINDERNIS = ["🪨", "🌵", "🪵", "🚧"];
    const baeume = [];
    for (let b = 0; b < 8; b++){ const e = document.createElement("div"); e.className = "ar-baum"; e.textContent = ["🌲", "🌳", "🌲", "🌿"][b % 4]; e.style.left = (b % 2 ? 93 : 1) + "%"; feld.appendChild(e); baeume.push({ e, y: b * 14 }); }
    const spurX = s => { const r = strasse.getBoundingClientRect(), f = feld.getBoundingClientRect(); return r.left - f.left + r.width * (s + .5) / 3; };
    const setzSpur = s => { spur = Math.max(0, Math.min(2, s)); spieler.style.left = spurX(spur) + "px"; };
    setzSpur(1); herzen(leben);
    const neueReihe = () => {
        const zwei = geschafft > 12 && Math.random() < .45, frei = Math.floor(Math.random() * 3);
        const zellen = [0, 1, 2].map(x => x === frei ? (Math.random() < .55 ? "🪙" : "") : (zwei || x === (frei + 1 + Math.floor(Math.random() * 2)) % 3 ? HINDERNIS[Math.floor(Math.random() * HINDERNIS.length)] : (Math.random() < .2 ? "🪙" : "")));
        const e = document.createElement("div"); e.className = "ar-tore ar-reihe";
        e.innerHTML = zellen.map(z => `<div class="ar-zelle">${z}</div>`).join("");
        feld.appendChild(e); reihen.push({ e, y: -12, zellen, geprueft: false });
    };
    let startX = null;
    feld.onpointerdown = ev => { startX = ev.clientX; const r = strasse.getBoundingClientRect(); const s2 = Math.floor((ev.clientX - r.left) / r.width * 3); setzSpur(s2 >= 0 && s2 <= 2 ? s2 : spur + (ev.clientX < r.left ? -1 : 1)); };
    feld.onpointermove = ev => { if (ev.buttons || ev.pointerType === "touch"){ const r = strasse.getBoundingClientRect(); const s2 = Math.floor((ev.clientX - r.left) / r.width * 3); if (s2 >= 0 && s2 <= 2 && s2 !== spur) setzSpur(s2); } };
    const taste = ev => { if (L.aus) return document.removeEventListener("keydown", taste); if (ev.key === "ArrowLeft") setzSpur(spur - 1); if (ev.key === "ArrowRight") setzSpur(spur + 1); };
    document.addEventListener("keydown", taste);
    let alt = performance.now();
    const schritt = jetzt => {
        if (L.aus) return;
        const dt = Math.min(.05, (jetzt - alt) / 1000); alt = jetzt;
        const fh = feld.clientHeight, py = 100 - 12 - 64 / fh * 100;
        roll = (roll + tempo * 4.6 * dt) % 92; strasse.style.backgroundPosition = `center ${roll}px`;
        baeume.forEach(b => { b.y += tempo * dt; if (b.y > 105) b.y -= 112; b.e.style.top = b.y + "%"; });
        bis -= dt; if (bis <= 0){ neueReihe(); bis = Math.max(.55, 1.25 - geschafft * .012) * (26 / tempo) * 1.2; }
        unverwundbar = Math.max(0, unverwundbar - dt); spieler.style.opacity = unverwundbar > 0 ? (Math.floor(jetzt / 90) % 2 ? .4 : 1) : 1;
        for (let n = reihen.length - 1; n >= 0; n--){
            const r = reihen[n]; r.y += tempo * dt; r.e.style.top = r.y + "%";
            if (!r.geprueft && r.y + 76 / fh * 100 >= py + 4){
                r.geprueft = true; const z = r.zellen[spur], zel = r.e.children[spur];
                if (z === "🪙"){ muenzen++; punkte += 5; sfx("muenze"); plus(spurX(spur), fh * .7, "🪙+1"); zel.textContent = ""; }
                else if (z && unverwundbar <= 0){ leben--; herzen(leben); sfx("au"); unverwundbar = 1.2; feld.classList.remove("ar-schuettel"); void feld.offsetWidth; feld.classList.add("ar-schuettel");
                    if (leben <= 0){ spieler.classList.remove("lauf"); return (L.t = setTimeout(() => spielEnde(id, punkte, muenzen), 700)); } }
                if (!z || z === "🪙"){ geschafft++; punkte += 2; box.querySelector("#ar-punkte").textContent = "⭐ " + punkte; box.querySelector("#ar-muenzen").textContent = "🪙 " + muenzen;
                    if (geschafft % 15 === 0){ tempo = Math.min(55, tempo + 4); banner(geschafft >= 45 ? "Unaufhaltsam! 🔥" : "Schneller! ⚡"); sfx("level"); } }
            }
            if (r.y > 112){ r.e.remove(); reihen.splice(n, 1); }
        }
        L.raf = requestAnimationFrame(schritt);
    };
    L.raf = requestAnimationFrame(schritt);
}

/* ---------- Asteroiden-Jagd & Monster füttern (reine Belohnungsspiele) ---------- */
function fallStart(id){
    stopp();
    const monster = id === "monster";
    const L = LAUF = { aus: false };
    const figur = aktiveFigur(id);
    box.innerHTML = hud(id, `<div class="ar-wert" id="ar-zeit">⏱ 60</div>`) + `<div class="ar-feld ${monster ? "ar-monsterwelt" : "ar-weltall"}" id="ar-feld">${monster ? `<div class="ar-monster" id="ar-mo">${monsterSvg(figur)}</div>` : `<div class="ar-schiff" id="ar-schiff">${schiffSvg(figur)}</div>`}</div>`;
    box.querySelector("#ar-zu").onclick = schliessenAr;
    const feld = box.querySelector("#ar-feld");
    if (!monster) for (let s = 0; s < 70; s++){ const e = document.createElement("div"); e.className = "ar-stern"; e.style.left = Math.random() * 100 + "%"; e.style.top = Math.random() * 100 + "%"; e.style.opacity = .3 + Math.random() * .7; feld.appendChild(e); }
    let leben = 3, punkte = 0, muenzen = 0, serie = 0, tempo = 12, takt = 1.0, naechster = .3, zeit = 60, gesamt = 0;
    const GUT = monster ? ["🍎", "🍌", "🍓", "🥕", "🍪", "🧁", "🍉", "🍐", "🥨"] : ["🪨"], SCHLECHT = monster ? ["🌶️", "🧦", "🪨"] : ["💣"], BONUS = "⭐";
    const steine = [];
    herzen(leben);
    banner(monster ? "Hunger! 😋" : "Los geht's! 🚀");
    const spawn = () => {
        const r = Math.random(), art = r < .18 ? "schlecht" : r < .26 ? "bonus" : "gut";
        const zeichen = art === "gut" ? GUT[Math.floor(Math.random() * GUT.length)] : art === "bonus" ? BONUS : SCHLECHT[Math.floor(Math.random() * SCHLECHT.length)];
        const e = document.createElement("div"); e.className = "ar-ding"; e.textContent = zeichen;
        if (!monster && art === "gut"){ e.classList.add("fels"); e.style.setProperty("--g", (54 + Math.random() * 36) + "px"); }
        const s = { art, e, x: 10 + Math.random() * 80, y: 14, vy: tempo * (.8 + Math.random() * .5), rot: (Math.random() - .5) * 120, weg: false };
        e.style.left = s.x + "%"; e.style.top = s.y + "%";
        e.onpointerdown = ev => { ev.stopPropagation(); treffen(s); };
        feld.appendChild(e); steine.push(s);
    };
    const funken = (x, y, farbe) => { for (let n = 0; n < 14; n++){ const f = document.createElement("div"); f.className = "ar-funke"; f.style.left = x + "px"; f.style.top = y + "px"; f.style.background = farbe;
        const a = Math.random() * Math.PI * 2, d = 40 + Math.random() * 60; f.animate([{ transform: "translate(0,0)", opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`, opacity: 0 }], { duration: 500 + Math.random() * 300, easing: "ease-out" });
        feld.appendChild(f); setTimeout(() => f.remove(), 820); } };
    const treffen = s => {
        if (s.weg || L.aus) return;
        const fr = feld.getBoundingClientRect(), er = s.e.getBoundingClientRect(), zx = er.left - fr.left + er.width / 2, zy = er.top - fr.top + er.height / 2;
        if (!monster){
            const sx = fr.width / 2, sy = fr.height * .96 - 70, dx = zx - sx, dy = zy - sy, len = Math.hypot(dx, dy);
            const las = document.createElement("div"); las.className = "ar-laser"; las.style.setProperty("--farbe", figur === "regenbogen" ? "#ffd166" : figur);
            las.style.left = sx + "px"; las.style.top = sy + "px"; las.style.width = len + "px"; las.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
            feld.appendChild(las); setTimeout(() => las.remove(), 260); sfx("pew");
            box.querySelector("#ar-schiff").style.transform = `rotate(${Math.atan2(dx, -dy)}rad)`;
        }
        s.weg = true;
        if (s.art !== "schlecht"){
            serie++; const p = s.art === "bonus" ? 25 : 10 + Math.min(20, serie * 2); punkte += p; plus(zx, zy, "+" + p);
            if (s.art === "bonus" || serie % 5 === 0){ muenzen++; box.querySelector("#ar-muenzen").textContent = "🪙 " + muenzen; sfx("muenze"); }
            box.querySelector("#ar-punkte").textContent = "⭐ " + punkte;
            if (monster){
                sfx("mampf"); const mo = box.querySelector("#ar-mo"), mr = mo.getBoundingClientRect();
                s.e.animate([{ left: s.e.style.left, top: s.e.style.top, transform: "translate(-50%,-50%) scale(1)" }, { left: (mr.left - fr.left + mr.width / 2) + "px", top: (mr.top - fr.top + mr.height * .68) + "px", transform: "translate(-50%,-50%) scale(.1)" }], { duration: 360, easing: "ease-in", fill: "forwards" });
                setTimeout(() => { s.e.remove(); mo.innerHTML = monsterSvg(figur, "zu"); setTimeout(() => { if (!L.aus) mo.innerHTML = monsterSvg(figur); }, 240); }, 360);
            } else { sfx("boom"); funken(zx, zy, "#ffd166"); funken(zx, zy, "#ff8f5a"); s.e.remove(); }
        } else {
            sfx("au"); leben--; herzen(leben); serie = 0;
            feld.classList.remove("ar-schuettel"); void feld.offsetWidth; feld.classList.add("ar-schuettel");
            if (monster){ const mo = box.querySelector("#ar-mo"); mo.innerHTML = monsterSvg(figur, "bah"); mo.classList.remove("bah"); void mo.offsetWidth; mo.classList.add("bah"); setTimeout(() => { if (!L.aus) mo.innerHTML = monsterSvg(figur); }, 700); }
            else funken(zx, zy, "#ff4d4d");
            s.e.animate([{ opacity: 1 }, { opacity: 0, transform: "translate(-50%,-50%) scale(1.6)" }], { duration: 500, fill: "forwards" }); setTimeout(() => s.e.remove(), 500);
            if (leben <= 0) L.t = setTimeout(() => spielEnde(id, punkte, muenzen), 700);
        }
    };
    let alt = performance.now();
    const schritt = jetzt => {
        if (L.aus) return;
        const dt = Math.min(.05, (jetzt - alt) / 1000); alt = jetzt;
        gesamt += dt; const rest = Math.max(0, Math.ceil(60 - gesamt)); if (rest !== zeit){ zeit = rest; box.querySelector("#ar-zeit").textContent = "⏱ " + zeit; if (zeit === 0) return spielEnde(id, punkte, muenzen + 2); }
        tempo = 12 + gesamt * .18; takt = Math.max(.45, 1 - gesamt * .009);
        naechster -= dt; if (naechster <= 0 && leben > 0){ spawn(); naechster = takt * (.7 + Math.random() * .5); }
        for (let n = steine.length - 1; n >= 0; n--){
            const s = steine[n]; if (s.weg){ steine.splice(n, 1); continue; }
            s.y += s.vy * dt; s.e.style.top = s.y + "%"; s.e.style.transform = `translate(-50%,-50%) rotate(${s.rot * s.y / 100}deg)`;
            if (s.y > (monster ? 72 : 94)){ if (s.art === "gut") serie = 0; s.e.remove(); steine.splice(n, 1); }
        }
        L.raf = requestAnimationFrame(schritt);
    };
    L.raf = requestAnimationFrame(schritt);
}

/* ---------- Karten auf der Auswahlseite ---------- */
function arKarten(){
    let ziel = document.getElementById("arcade-spiele");
    if (!ziel){
        document.getElementById("spiele").insertAdjacentHTML("beforebegin", `<div class="karte ar-karte"><div class="zeile" style="justify-content:space-between"><h2 style="margin:0">Weltenreise & Belohnung</h2><div class="ar-konto" id="ar-konto"></div></div>
            <p class="hilfe" style="margin-bottom:12px">Erst in Ruhe üben und ⚡ Energie sammeln – dann gibt es eine Runde Action als Belohnung. Mit Münzen werden neue Figuren freigeschaltet.</p><div class="spiele" id="arcade-spiele"></div></div>`);
        const s = document.createElement("style"); s.textContent = `.ar-karte{ background:linear-gradient(135deg, #2f4a1f, #1d3015); color:#fff; } .ar-karte h2{ color:#ffe08a !important; } .ar-karte .hilfe{ color:#d8e4c8; }
            .ar-karte .spiel{ background:rgba(255,255,255,.08); box-shadow:none; color:#fff; } .ar-karte .spiel b{ color:#ffe08a; } .ar-karte .spiel span{ color:#d8e4c8; }
            .ar-karte .spiel .ico{ background:rgba(255,224,138,.15); font-size:30px; } .ar-konto{ font-weight:900; font-size:17px; color:#ffe08a; }`;
        document.head.appendChild(s);
        ziel = document.getElementById("arcade-spiele");
    }
    const k = konto();
    document.getElementById("ar-konto").textContent = `⚡ ${energie()}  ·  🪙 ${k.muenzen}`;
    ziel.innerHTML = Object.entries(AR_SPIELE).filter(([, s]) => sek() ? s.sek : s.gs).map(([id, s]) => `<button class="spiel" data-ar="${id}"><div class="ico">${s.emoji}</div><div><b>${esc(s.titel)}</b><span>${esc(s.text)}<br><em>${freispiel() ? "Freispiel" : `⚡ ${KOSTEN} pro Runde`} · 🏆 ${k.best[id] || 0}</em></span></div></button>`).join("");
    ziel.querySelectorAll("[data-ar]").forEach(b => b.onclick = () => { box.classList.add("an"); document.body.style.overflow = "hidden"; startZeigen(b.dataset.ar); });
}
window.arKarten = arKarten;
window.AR = { konto, kontoSpeichern, aktiveFigur, sfx, energie };
})();
