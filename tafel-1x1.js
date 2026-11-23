/* ===============================================================
   Tafelbild: Einmaleins-Werkstatt
   Verstehen · Kernaufgaben & Nachbarn · Tricks · Geteilt (Division)
   Aufgabenfamilie · Üben (Klasse gegen Ella) · Das große 1 × 1
   Alles schrittweise zum Aufdecken – die Antworten kommen von der Klasse.
   =============================================================== */
(function(){
"use strict";

const CSS = `
#ew{ position:fixed; inset:0; display:none; flex-direction:column; z-index:12; background:linear-gradient(160deg,#fff8e8 0%,#eef6fb 100%); color:#1f2d36; font-family:"Nunito",sans-serif; user-select:none; -webkit-user-select:none; }
#ew.an{ display:flex; }
.ew-leiste{ display:flex; gap:8px; align-items:center; padding:8px 14px 6px; flex-wrap:wrap; }
.ew-titel{ font-weight:900; font-size:19px; color:#7c6a4f; margin-right:4px; }
.ew-punkte{ display:none; gap:8px; font-weight:900; font-size:17px; }
.ew-punkte.an{ display:flex; }
.ew-punkte i{ font-style:normal; }
.ew-punkte span{ background:white; border-radius:999px; padding:5px 13px; color:#16324a; box-shadow:0 3px 10px rgba(22,50,74,.1); }
.ew-tabs{ display:flex; gap:6px; overflow-x:auto; padding:0 14px 10px; scrollbar-width:none; flex:none; }
.ew-tabs::-webkit-scrollbar{ display:none; }
.ew-tab{ font:800 15px "Nunito",sans-serif; border:2px solid #e6dccb; background:white; color:#16324a; border-radius:999px; padding:8px 15px; cursor:pointer; white-space:nowrap; min-height:44px; }
.ew-tab.an{ background:#16324a; border-color:#16324a; color:white; }
.ew-haupt{ flex:1; min-height:0; display:flex; gap:2vmin; padding:0 2vmin 2vmin; }
.ew-buehne{ flex:1.3; min-width:0; background:white; border-radius:22px; box-shadow:0 6px 24px rgba(22,50,74,.08); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:2.2vmin 2.4vmin; gap:1.6vmin; overflow:auto; position:relative; }
.ew-panel{ flex:1; max-width:620px; min-width:300px; background:white; border-radius:22px; box-shadow:0 6px 24px rgba(22,50,74,.08); padding:2.2vmin 2.4vmin; display:flex; flex-direction:column; gap:1.3vmin; overflow:auto; }
.ew-gross{ font-size:clamp(36px,8vmin,110px); font-weight:900; color:#16324a; line-height:1.05; text-align:center; font-variant-numeric:tabular-nums; white-space:nowrap; }
.ew-mittel{ font-size:clamp(22px,4.2vmin,54px); font-weight:900; color:#16324a; text-align:center; line-height:1.2; font-variant-numeric:tabular-nums; }
.ew-rot{ color:#d1342b; }
.ew-zu{ display:inline-block; min-width:1.4em; border-radius:12px; background:#eef2f6; color:transparent !important; cursor:pointer; text-align:center; }
.ew-zu *{ visibility:hidden; }
.ew-h{ font-size:13px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; color:#8a7a60; margin:2px 0 -4px; }
.ew-merke{ background:#fff4d6; border-left:6px solid #f2a93b; border-radius:12px; padding:1.1vmin 1.5vmin; font-size:clamp(15px,2vmin,22px); line-height:1.45; font-weight:700; }
.ew-merke b:first-child{ display:block; font-size:.7em; letter-spacing:.08em; text-transform:uppercase; color:#b7791f; margin-bottom:2px; }
.ew-schritte{ display:flex; flex-direction:column; gap:.9vmin; }
.ew-schritt{ display:flex; gap:10px; align-items:flex-start; background:#f6f8fa; border-radius:14px; padding:.9vmin 1.2vmin; font-size:clamp(16px,2.4vmin,28px); font-weight:800; color:#16324a; cursor:pointer; line-height:1.3; }
.ew-schritt .nr{ flex:none; width:1.6em; height:1.6em; border-radius:50%; background:#16324a; color:white; display:flex; align-items:center; justify-content:center; font-size:.7em; margin-top:.1em; }
.ew-schritt small{ display:block; font-size:.62em; color:#7c8a96; font-weight:800; }
.ew-schritt.zu{ background:#eef2f6; }
.ew-schritt.zu .inhalt{ visibility:hidden; }
.ew-schritt.zu::after{ content:"antippen"; position:absolute; }
.ew-schritt.zu{ position:relative; justify-content:flex-start; }
.ew-schritt.zu::after{ left:3.4em; top:50%; transform:translateY(-50%); color:#9aa8b4; font-size:.7em; }
.ew-knoepfe{ display:flex; gap:8px; flex-wrap:wrap; }
.ew-k{ font:900 clamp(15px,1.9vmin,20px) "Nunito",sans-serif; border:0; border-radius:999px; padding:10px 18px; cursor:pointer; background:#f1ece2; color:#16324a; min-height:44px; }
.ew-k.blau{ background:#16324a; color:white; } .ew-k.gruen{ background:#2e8b57; color:white; } .ew-k.lila{ background:#7a5a9e; color:white; } .ew-k.gold{ background:#f2a93b; color:#16324a; }
.ew-st{ display:inline-flex; align-items:center; gap:4px; background:#f3efe6; border-radius:999px; padding:4px 4px 4px 12px; font-weight:800; font-size:15px; color:#6b5d45; }
.ew-st b{ min-width:1.6em; text-align:center; font-size:22px; color:#16324a; font-variant-numeric:tabular-nums; }
.ew-st button{ font:900 20px "Nunito",sans-serif; border:0; background:white; color:#16324a; width:40px; height:40px; border-radius:50%; cursor:pointer; box-shadow:0 2px 6px rgba(22,50,74,.12); }
.ew-chips{ display:flex; gap:6px; flex-wrap:wrap; }
.ew-chip{ font:900 17px "Nunito",sans-serif; border:2px solid #e6dccb; background:white; color:#16324a; border-radius:12px; min-width:46px; height:44px; padding:0 10px; cursor:pointer; }
.ew-chip.an{ background:#f2a93b; border-color:#f2a93b; }
.ew-feld{ display:inline-flex; flex-direction:column; align-items:center; }
.ew-feld .zr{ display:flex; justify-content:center; }
.ew-feld i{ display:block; border-radius:50%; background:#3d7ea6; flex:none; transition:background .3s, transform .3s; }
.ew-feld i.g1{ background:#3d7ea6; } .ew-feld i.g2{ background:#e2574c; } .ew-feld i.g3{ background:#3f9a5a; } .ew-feld i.g4{ background:#e6a13a; } .ew-feld i.g5{ background:#8e5bc7; }
.ew-feld i.g6{ background:#00897b; } .ew-feld i.g7{ background:#c0398b; } .ew-feld i.g8{ background:#5b6f84; } .ew-feld i.g9{ background:#8d6e63; } .ew-feld i.g10{ background:#1d5fa8; }
.ew-feld i.rest{ background:#c9d6e3; box-shadow:inset 0 0 0 3px #8fa3b8; }
.ew-feld .zr.mark{ background:#fff4d6; border-radius:999px; }
.ew-liste{ display:grid; grid-template-columns:1fr; gap:.4vmin; width:100%; max-width:640px; }
.ew-liste > div{ display:grid; grid-template-columns:auto 1fr auto; gap:1.4vmin; align-items:center; padding:.5vmin 1.2vmin; border-radius:12px; cursor:pointer; font-size:clamp(17px,3vmin,34px); font-weight:900; color:#16324a; }
.ew-liste > div:nth-child(odd){ background:#f6f8fa; }
.ew-liste > div.kern{ background:#fff4d6; }
.ew-liste .weg{ font-size:.58em; color:#6b7a86; font-weight:800; }
.ew-liste .erg{ color:#d1342b; min-width:2.2em; text-align:right; }
.ew-tricks{ display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:8px; }
.ew-trick{ border:2px solid #e6dccb; background:white; border-radius:14px; padding:10px 12px; text-align:left; cursor:pointer; font-family:"Nunito",sans-serif; color:#16324a; }
.ew-trick b{ display:block; font-size:17px; font-weight:900; } .ew-trick small{ font-size:13px; color:#7c8a96; font-weight:700; }
.ew-trick.an{ border-color:#16324a; background:#eef4fb; }
.ew-haus{ display:flex; flex-direction:column; align-items:center; }
.ew-dach{ width:0; height:0; border-left:min(22vmin,180px) solid transparent; border-right:min(22vmin,180px) solid transparent; border-bottom:min(13vmin,110px) solid #e2574c; position:relative; }
.ew-dach span{ position:absolute; left:50%; transform:translateX(-50%); top:min(5vmin,44px); font-size:clamp(26px,5vmin,60px); font-weight:900; color:white; }
.ew-hauswand{ width:min(44vmin,360px); background:#fff8e8; border:4px solid #e2574c; border-top:0; display:flex; flex-direction:column; }
.ew-hauswand .z{ display:flex; justify-content:center; gap:.3em; font-size:clamp(22px,4.4vmin,54px); font-weight:900; color:#16324a; padding:.4vmin 0; border-bottom:2px dashed #f0d9b8; cursor:pointer; font-variant-numeric:tabular-nums; }
.ew-hauswand .z:last-child{ border-bottom:0; }
.ew-hauswand .kopf{ display:flex; justify-content:space-around; font-size:clamp(24px,5vmin,60px); font-weight:900; color:#1d5fa8; background:#eef4fb; padding:.6vmin 0; }
.ew-blitz{ font-size:clamp(60px,15vmin,190px); font-weight:900; color:#16324a; text-align:center; line-height:1.05; white-space:nowrap; font-variant-numeric:tabular-nums; }
.ew-info{ color:#7c8a96; font-weight:800; font-size:clamp(14px,1.9vmin,20px); text-align:center; }
.ew-tab-gross{ display:grid; gap:2px; background:#c9d6e3; border:3px solid #16324a; border-radius:12px; overflow:hidden; }
.ew-tab-gross > div{ background:white; display:flex; align-items:center; justify-content:center; font-weight:800; color:#16324a; cursor:pointer; font-variant-numeric:tabular-nums; }
.ew-tab-gross > div.kopf{ background:#16324a; color:#ffd77a; font-weight:900; cursor:default; }
.ew-tab-gross > div.ecke{ background:#f2a93b; cursor:default; }
.ew-tab-gross > div.wahl{ background:#f2a93b; box-shadow:inset 0 0 0 3px #16324a; }
.ew-tab-gross > div.zu{ color:transparent; }
.ew-tab-gross > div.zu::after{ content:"?"; color:#c9d6e3; position:absolute; }
.ew-tab-gross > div{ position:relative; }
.ew-finger{ display:flex; align-items:flex-end; gap:min(1vmin,8px); }
.ew-finger span{ width:min(4.2vmin,34px); background:#f5c9a3; border:2px solid #c98b5e; border-radius:999px 999px 10px 10px; display:flex; align-items:flex-start; justify-content:center; font-weight:900; font-size:clamp(12px,1.8vmin,18px); color:#7a4b2a; padding-top:4px; }
.ew-finger span.weg{ background:#d7dee5; border-color:#9aa8b4; color:#5b6f84; }
.ew-finger .luecke{ width:min(3vmin,24px); border:0; background:none; }
@media (max-width:900px), (orientation:portrait){
  #ew{ overflow-y:auto; -webkit-overflow-scrolling:touch; }
  .ew-haupt{ flex-direction:column; flex:none; }
  .ew-panel{ max-width:none; min-width:0; }
  .ew-buehne{ min-height:44vh; }
}
`;

const TABS = [["verstehen", "🔵 Verstehen"], ["reihe", "⭐ Kernaufgaben & Nachbarn"], ["tricks", "💡 Tricks"], ["geteilt", "➗ Geteilt"], ["familie", "🏠 Aufgabenfamilie"], ["ueben", "⚡ Üben"], ["gross", "🔢 Das große 1 × 1"]];
const KERN = [1, 2, 5, 10];
const z = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const zufall = l => l[Math.floor(Math.random() * l.length)];
let el, S = { tab: "verstehen", a: 3, b: 4, schritt: 0, reihe: 6, trick: "x9", bsp: null, gt: { n: 24, g: 6, art: "auf", rest: false }, fam: null, ue: { art: "mal", reihen: [2, 3, 4, 5, 6, 7, 8, 9], aufgabe: null, zeigen: false, punkte: { k: 0, e: 0 }, n: 0 }, gr: { wahl: null, verdeckt: false, schritt: 0 } };

function aufbauen(){
    if (el) return;
    const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    el = document.createElement("div"); el.id = "ew";
    el.innerHTML = `<div class="ew-leiste">
            <button class="tb-k rund" data-x="zu" title="Zurück zur Übersicht"><i class="fa-solid fa-arrow-left"></i></button>
            <span class="ew-titel">Einmaleins-Werkstatt</span>
            <span class="ew-punkte" id="ewPunkte"><span><i id="ewNa">Klasse</i> <b id="ewPk">0</b></span><span><i id="ewNb">🦉 Ella</i> <b id="ewPe">0</b></span></span>
            <span class="tb-luft"></span>
            <button class="tb-k rund" data-x="voll" title="Vollbild"><i class="fa-solid fa-expand"></i></button>
        </div>
        <div class="ew-tabs">${TABS.map(([k, n]) => `<button class="ew-tab" data-tab="${k}">${n}</button>`).join("")}</div>
        <div class="ew-haupt"><div class="ew-buehne" id="ewB"></div><div class="ew-panel" id="ewP"></div></div>`;
    document.body.appendChild(el);
    el.addEventListener("click", klick);
    window.addEventListener("resize", () => { if (el.classList.contains("an")) zeichnen(); });
}

/* ---------- Bausteine ---------- */
// Punktefeld: a Reihen mit je b Punkten; farbe(i, j) → Klasse
function feld(a, b, farbe, maxPx){
    const B = el.querySelector("#ewB"), breite = Math.min(B.clientWidth || 600, 900) * 0.9, hoehe = (B.clientHeight || 400) * (maxPx || 0.62);
    const gr = Math.max(7, Math.min(40, Math.floor(Math.min(breite / (b * 1.35 + (b > 5 ? 1 : 0)), hoehe / (a * 1.35 + (a > 5 ? 1 : 0))))));
    const gap = Math.max(3, Math.round(gr * .3)), luecke = Math.round(gr * .8);
    let h = `<div class="ew-feld" style="gap:${gap}px">`;
    for (let i = 0; i < a; i++){
        if (i === 5) h += `<div style="height:${luecke - gap}px"></div>`;
        h += `<div class="zr" style="gap:${gap}px">`;
        for (let j = 0; j < b; j++) h += (j === 5 ? `<span style="width:${luecke - gap}px;flex:none"></span>` : "") + `<i class="${farbe ? farbe(i, j) : ""}" style="width:${gr}px;height:${gr}px"></i>`;
        h += `</div>`;
    }
    return h + `</div>`;
}
// Schritte zum Aufdecken
function schritte(liste){
    return `<div class="ew-schritte">${liste.map((s, i) => `<div class="ew-schritt ${i < S.schritt ? "" : "zu"}" data-schritt="${i}"><span class="nr">${i + 1}</span><div class="inhalt">${s}</div></div>`).join("")}</div>
        <div class="ew-knoepfe"><button class="ew-k blau" data-x="weiter">Weiter ▶</button><button class="ew-k" data-x="alle">Alles zeigen</button><button class="ew-k" data-x="zurueck">↺ von vorn</button><button class="ew-k gold" data-x="neu">🎲 Neue Aufgabe</button></div>`;
}
function stepper(name, wert, min, max, key){
    return `<span class="ew-st">${name}<button data-st="${key}" data-d="-1">−</button><b>${wert}</b><button data-st="${key}" data-d="1">+</button></span>`;
}
const erg = (x, offen) => offen ? `<span class="ew-rot">${x}</span>` : `<span class="ew-zu" data-x="weiter">${x}</span>`;

/* ---------- 1 · Verstehen: Malaufgabe, Plusaufgabe, Tausch, Geteilt ---------- */
function verstehen(B, P){
    const { a, b } = S, s = S.schritt;
    const tausch = s >= 4;
    B.innerHTML = `<div class="ew-mittel">${tausch ? `${b} Reihen mit je ${a} Punkten` : `${a} Reihen mit je ${b} Punkten`}</div>
        ${tausch ? feld(b, a, (i) => "g" + ((i % 10) + 1)) : feld(a, b, (i) => s >= 1 ? "g" + ((i % 10) + 1) : "")}
        <div class="ew-gross">${s >= 3 ? (tausch ? `${b} · ${a} = <span class="ew-rot">${a * b}</span>` : `${a} · ${b} = <span class="ew-rot">${a * b}</span>`) : s >= 2 ? `${a} · ${b} = ?` : "?"}</div>`;
    P.innerHTML = `<div class="ew-h">Aufgabe wählen</div><div class="ew-knoepfe">${stepper("Reihen", a, 1, 10, "a")}${stepper("je", b, 1, 10, "b")}</div>
        <div class="ew-merke"><b>Merke</b>Mal heißt: <b>gleich große Gruppen zusammenzählen</b>. ${a} · ${b} bedeutet ${a}-mal die ${b}.</div>
        ${schritte([
            `Wie viele Punkte sind es? <small>Zähl nicht einzeln – zähl in Reihen!</small>`,
            `Als Plusaufgabe: <span class="ew-rot">${Array(a).fill(b).join(" + ")} = ${a * b}</span>`,
            `Als Malaufgabe: <b>${a} · ${b}</b> <small>${a}-mal die ${b}</small>`,
            `Ergebnis: <b>${a} · ${b} = <span class="ew-rot">${a * b}</span></b>`,
            `Tauschaufgabe: Dreh das Feld! <b>${b} · ${a} = ${a * b}</b> <small>Gleich viele Punkte – nur anders hingestellt.</small>`,
            `Geteiltaufgaben: <b>${a * b} : ${b} = ${a}</b> und <b>${a * b} : ${a} = ${b}</b> <small>Wie viele Reihen mit je ${b}? – ${a}!</small>`,
        ])}`;
}

/* ---------- 2 · Kernaufgaben & Nachbaraufgaben einer Reihe ---------- */
function herleitung(k, n){
    if (KERN.includes(k)) return { weg: k === 1 ? "einmal" : k === 2 ? "verdoppeln" : k === 5 ? "Hälfte von 10 ·" : "Null anhängen", kern: true };
    const w = {
        3: `2 · ${n} + ${n} = ${2 * n} + ${n}`, 4: `2 · ${n} verdoppeln = ${2 * n} + ${2 * n}`, 6: `5 · ${n} + ${n} = ${5 * n} + ${n}`,
        7: `5 · ${n} + 2 · ${n} = ${5 * n} + ${2 * n}`, 8: `10 · ${n} − 2 · ${n} = ${10 * n} − ${2 * n}`, 9: `10 · ${n} − ${n} = ${10 * n} − ${n}`,
    }[k];
    return { weg: w, kern: false };
}
function reihe(B, P){
    const n = S.reihe; S.offen = S.offen || new Set();
    B.innerHTML = `<div class="ew-mittel">Die ${n}er-Reihe</div><div class="ew-liste">${[...Array(10).keys()].map(i => {
        const k = i + 1, h = herleitung(k, n), offen = S.offen.has(k) || (S.kernOffen && h.kern);
        return `<div class="${h.kern ? "kern" : ""}" data-zeile="${k}"><span>${h.kern ? "⭐" : "　"} ${k} · ${n}</span><span class="weg">${offen && S.wegeZeigen ? esc(h.weg) : ""}</span><span class="erg">${offen ? k * n : `<span class="ew-zu">${k * n}</span>`}</span></div>`;
    }).join("")}</div>`;
    P.innerHTML = `<div class="ew-h">Reihe</div><div class="ew-chips">${[...Array(10).keys()].map(i => `<button class="ew-chip ${S.reihe === i + 1 ? "an" : ""}" data-reihe="${i + 1}">${i + 1}</button>`).join("")}</div>
        <div class="ew-merke"><b>Kernaufgaben ⭐</b>1 ·, 2 ·, 5 · und 10 · sind leicht: <b>einmal</b>, <b>verdoppeln</b>, <b>Hälfte von 10 ·</b>, <b>Null anhängen</b>. Alle anderen Aufgaben sind ihre <b>Nachbarn</b>.</div>
        <div class="ew-merke" style="background:#eef4fb;border-left-color:#3d7ea6"><b style="color:#3d7ea6">Nachbaraufgaben</b>3 · = 2 · + einmal · 4 · = 2 · verdoppeln · 6 · = 5 · + einmal · 7 · = 5 · + 2 · · 8 · = 10 · − 2 · · 9 · = 10 · − einmal</div>
        <div class="ew-knoepfe"><button class="ew-k blau" data-x="kern">⭐ Kernaufgaben zeigen</button><button class="ew-k" data-x="wege">${S.wegeZeigen ? "Rechenwege aus" : "Rechenwege an"}</button><button class="ew-k" data-x="reiheAlle">Alles zeigen</button><button class="ew-k" data-x="reiheZu">Verdecken</button></div>
        <div class="ew-info" style="text-align:left">Tippe auf eine Zeile: Die Klasse sagt zuerst, wie man von der Kernaufgabe aus rechnet – dann aufdecken.</div>`;
}

/* ---------- 3 · Tricks ---------- */
const TRICKS = {
    x2: ["· 2", "verdoppeln", () => { const n = z(3, 10); return { aufgabe: `2 · ${n}`, s: [`2 · ${n} heißt: <b>${n} verdoppeln</b>`, `${n} + ${n} = <span class="ew-rot">${2 * n}</span>`], merke: "Mal 2 ist dasselbe wie verdoppeln." }; }],
    x4: ["· 4", "zweimal verdoppeln", () => { const n = z(3, 10); return { aufgabe: `4 · ${n}`, s: [`Erst verdoppeln: ${n} + ${n} = ${2 * n}`, `Noch einmal verdoppeln: ${2 * n} + ${2 * n} = <span class="ew-rot">${4 * n}</span>`], merke: "Mal 4 = verdoppeln und noch einmal verdoppeln." }; }],
    x8: ["· 8", "dreimal verdoppeln", () => { const n = z(3, 9); return { aufgabe: `8 · ${n}`, s: [`verdoppeln: ${2 * n}`, `verdoppeln: ${4 * n}`, `verdoppeln: <span class="ew-rot">${8 * n}</span>`, `oder: 10 · ${n} − 2 · ${n} = ${10 * n} − ${2 * n} = ${8 * n}`], merke: "Mal 8 = dreimal verdoppeln – oder 10 · minus 2 ·." }; }],
    x5: ["· 5", "Hälfte von · 10", () => { const n = z(3, 10); return { aufgabe: `5 · ${n}`, s: [`Erst 10 · ${n} = ${10 * n}`, `Davon die Hälfte: ${10 * n} : 2 = <span class="ew-rot">${5 * n}</span>`], merke: "Mal 5 ist die Hälfte von mal 10." }; }],
    x10: ["· 10", "Null anhängen", () => { const n = z(2, 10); return { aufgabe: `10 · ${n}`, s: [`Eine Null an die ${n} hängen: <span class="ew-rot">${10 * n}</span>`], merke: "Mal 10: Die Zahl rutscht eine Stelle nach links – hinten kommt eine Null." }; }],
    x9: ["· 9", "10 · minus einmal", () => { const n = z(3, 9); return { aufgabe: `9 · ${n}`, s: [`Erst 10 · ${n} = ${10 * n}`, `Einmal ${n} weg: ${10 * n} − ${n} = <span class="ew-rot">${9 * n}</span>`, `Probe: Quersumme ist immer 9 → ${String(9 * n).split("").join(" + ")} = 9`], merke: "Mal 9 = mal 10 und einmal wieder weg." }; }],
    finger: ["Finger-Trick", "die 9er-Reihe mit Händen", () => { const n = z(2, 9); return { aufgabe: `9 · ${n}`, finger: n, s: [`Beide Hände hinlegen. Den <b>${n}. Finger</b> von links umknicken.`, `Finger <b>links</b> davon = Zehner: <b>${n - 1}</b>`, `Finger <b>rechts</b> davon = Einer: <b>${10 - n}</b>`, `9 · ${n} = <span class="ew-rot">${9 * n}</span>`], merke: "Funktioniert für 9 · 1 bis 9 · 10." }; }],
    x6: ["· 6", "5 · plus einmal", () => { const n = z(3, 9); return { aufgabe: `6 · ${n}`, s: [`Erst 5 · ${n} = ${5 * n}`, `Einmal ${n} dazu: ${5 * n} + ${n} = <span class="ew-rot">${6 * n}</span>`], merke: "Mal 6 = mal 5 und einmal dazu. Tipp: 6 mal eine gerade Zahl endet auf dieselbe Ziffer (6 · 4 = 24)." }; }],
    x7: ["· 7", "5 · plus 2 ·", () => { const n = z(3, 9); return { aufgabe: `7 · ${n}`, s: [`5 · ${n} = ${5 * n}`, `2 · ${n} = ${2 * n}`, `Zusammen: ${5 * n} + ${2 * n} = <span class="ew-rot">${7 * n}</span>`], merke: "Mal 7 = mal 5 plus mal 2." }; }],
    x3: ["· 3", "2 · plus einmal", () => { const n = z(3, 10); return { aufgabe: `3 · ${n}`, s: [`2 · ${n} = ${2 * n}`, `Einmal dazu: ${2 * n} + ${n} = <span class="ew-rot">${3 * n}</span>`], merke: "Mal 3 = verdoppeln und einmal dazu." }; }],
    tausch: ["Tauschen", "spart die Hälfte", () => { let a = z(6, 9), b = z(2, 5); if (Math.random() < .5) b = 5; return { aufgabe: `${a} · ${b}`, s: [`Schwer? Tausch die Zahlen!`, `${b} · ${a} – das ist ${KERN.includes(b) ? "eine Kernaufgabe ⭐" : "leichter"}`, `${b} · ${a} = <span class="ew-rot">${a * b}</span> – also auch ${a} · ${b} = ${a * b}`], merke: "Beim Malnehmen darf man tauschen: 7 · 5 = 5 · 7. So muss man nur noch halb so viele Aufgaben lernen." }; }],
    quadrat: ["Quadratzahlen", "gleiche Zahlen", () => { const n = z(2, 10); return { aufgabe: `${n} · ${n}`, quadrat: n, s: [`Gleiche Zahlen mal sich selbst: Das Punktefeld ist ein <b>Quadrat</b>.`, `${n} · ${n} = <span class="ew-rot">${n * n}</span>`, `Alle Quadratzahlen: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100`], merke: "Quadratzahlen lohnt es sich auswendig zu lernen – sie helfen bei den Nachbarn: 7 · 8 = 7 · 7 + 7 = 56." }; }],
    geteilt: ["Geteilt", "Umkehraufgabe denken", () => { const a = z(3, 9), b = z(3, 9); return { aufgabe: `${a * b} : ${b}`, s: [`Frag dich: <b>Was mal ${b} ergibt ${a * b}?</b>`, `? · ${b} = ${a * b}`, `${a} · ${b} = ${a * b}, also ${a * b} : ${b} = <span class="ew-rot">${a}</span>`], merke: "Geteilt rechnet man mit der Malaufgabe rückwärts." }; }],
    halb: [": 2, : 5, : 10", "halbieren & Null weg", () => { const art = zufall(["2", "5", "10"]), n = z(2, 10), x = n * +art; return { aufgabe: `${x} : ${art}`, s: art === "2" ? [`Durch 2 heißt <b>halbieren</b>.`, `Die Hälfte von ${x} ist <span class="ew-rot">${n}</span>`] : art === "10" ? [`Durch 10: <b>die Null weglassen</b>.`, `${x} : 10 = <span class="ew-rot">${n}</span>`] : [`Durch 5: erst durch 10, dann verdoppeln.`, `${x} : 10 = ${x / 10}`, `${x / 10} · 2 = <span class="ew-rot">${n}</span>`], merke: ": 2 = halbieren · : 10 = Null weg · : 5 = durch 10 und verdoppeln." }; }],
    rest: ["Teilen mit Rest", "was übrig bleibt", () => { const b = z(3, 9), a = z(2, 9), r = z(1, b - 1), x = a * b + r; return { aufgabe: `${x} : ${b}`, rest: [x, b], s: [`Welche Zahl der ${b}er-Reihe ist knapp unter ${x}? → <b>${a * b}</b>`, `${a * b} = ${a} · ${b}, also passt die ${b} <b>${a}-mal</b>`, `Übrig: ${x} − ${a * b} = <b>${r}</b>`, `${x} : ${b} = <span class="ew-rot">${a} Rest ${r}</span>`], merke: "Der Rest muss immer kleiner sein als die Zahl, durch die man teilt." }; }],
};
function fingerBild(n){
    let h = `<div class="ew-finger">`;
    for (let i = 1; i <= 10; i++){ if (i === 6) h += `<span class="luecke"></span>`; const weg = S.schritt >= 1 && i === n; h += `<span class="${weg ? "weg" : ""}" style="height:${weg ? 6 : [12, 15, 17, 16, 10, 10, 16, 17, 15, 12][i - 1]}vmin">${i}</span>`; }
    return h + `</div>${S.schritt >= 2 ? `<div class="ew-mittel">${n - 1} Finger links · ${10 - n} Finger rechts → <span class="ew-rot">${9 * n}</span></div>` : ""}`;
}
function tricks(B, P){
    if (!S.bsp || S.bsp.key !== S.trick) S.bsp = Object.assign({ key: S.trick }, TRICKS[S.trick][2]());
    const x = S.bsp;
    let bild = "";
    if (x.finger) bild = fingerBild(x.finger);
    else if (x.quadrat) bild = feld(x.quadrat, x.quadrat, () => "g2");
    else if (x.rest) bild = restBild(x.rest[0], x.rest[1], S.schritt >= 2);
    const fertig = S.schritt >= x.s.findIndex(t => t.includes("ew-rot")) + 1;
    B.innerHTML = `<div class="ew-gross">${x.aufgabe} = ${fertig ? `<span class="ew-rot">${rechne(x)}</span>` : "?"}</div>${bild}`;
    P.innerHTML = `<div class="ew-tricks">${Object.entries(TRICKS).map(([k, t]) => `<button class="ew-trick ${k === S.trick ? "an" : ""}" data-trick="${k}"><b>${t[0]}</b><small>${t[1]}</small></button>`).join("")}</div>
        <div class="ew-merke"><b>Trick</b>${x.merke}</div>${schritte(x.s)}`;
}
function rechne(x){
    if (x.rest){ const [n, b] = x.rest; return `${Math.floor(n / b)} Rest ${n % b}`; }
    const m = /^(\d+) ([·:]) (\d+)$/.exec(x.aufgabe); if (!m) return "";
    return m[2] === "·" ? +m[1] * +m[3] : +m[1] / +m[3];
}
function restBild(n, b, gruppiert){
    const voll = Math.floor(n / b), reihen = voll + (n % b ? 1 : 0);
    return feld(reihen, b, (i, j) => i * b + j >= n ? "unsichtbar" : !gruppiert ? "g1" : i < voll ? "g" + ((i % 10) + 1) : "rest").replace(/<i class="unsichtbar"/g, '<i style="visibility:hidden"');
}

/* ---------- 4 · Geteilt: aufteilen und verteilen ---------- */
function geteilt(B, P){
    const { n, g, art, rest } = S.gt, voll = Math.floor(n / g), r = n % g, s = S.schritt;
    const auf = art === "auf";
    // aufteilen: Gruppen à g → Anzahl Gruppen; verteilen: auf g Kinder → wie viele pro Kind
    const zeilen = auf ? voll + (r ? 1 : 0) : g, spalten = auf ? g : voll + (r ? 1 : 0);
    let bild;
    if (auf) bild = feld(zeilen, spalten, (i, j) => i * g + j >= n ? "unsichtbar" : s >= 1 ? (i < voll ? "g" + ((i % 10) + 1) : "rest") : "g1");
    else bild = feld(zeilen, spalten, (i, j) => { const nr = j * g + i; return nr >= n ? "unsichtbar" : s >= 1 ? (j < voll ? "g" + ((i % 10) + 1) : "rest") : "g1"; });
    bild = bild.replace(/<i class="unsichtbar"/g, '<i style="visibility:hidden"');
    const ergebnis = r ? `${voll} Rest ${r}` : `${voll}`;
    B.innerHTML = `<div class="ew-mittel">${n} Punkte ${auf ? `– immer <b>${g}</b> in eine Gruppe` : `– gerecht auf <b>${g}</b> Kinder verteilt`}</div>${bild}
        <div class="ew-gross">${n} : ${g} = ${s >= 2 ? `<span class="ew-rot">${ergebnis}</span>` : "?"}</div>`;
    P.innerHTML = `<div class="ew-h">Art</div><div class="ew-chips"><button class="ew-chip ${auf ? "an" : ""}" data-gtart="auf">Aufteilen</button><button class="ew-chip ${!auf ? "an" : ""}" data-gtart="ver">Verteilen</button><button class="ew-chip ${rest ? "an" : ""}" data-gtrest="1">mit Rest</button></div>
        <div class="ew-knoepfe">${stepper("Punkte", n, 2, 100, "n")}${stepper("durch", g, 2, 10, "g")}</div>
        <div class="ew-merke"><b>Merke</b>${auf ? `<b>Aufteilen:</b> Wie oft passt die ${g} in die ${n}? Man bildet Gruppen mit je ${g}.` : `<b>Verteilen:</b> ${n} Dinge gerecht auf ${g} Kinder – jedes bekommt gleich viel.`} Beide Male rechnet man <b>${n} : ${g}</b>.</div>
        ${schritte([
            auf ? `Kreise immer <b>${g}</b> Punkte ein. <small>Jede Farbe ist eine Gruppe.</small>` : `Verteile reihum: jedes Kind bekommt einen, dann noch einen … <small>Jede Farbe ist ein Kind.</small>`,
            auf ? `Zähle die Gruppen: <b>${voll}</b>${r ? ` – und <b>${r}</b> bleiben übrig (grau).` : "."}` : `Jedes Kind bekommt <b>${voll}</b>${r ? ` – <b>${r}</b> bleiben übrig (grau).` : "."}`,
            `${n} : ${g} = <span class="ew-rot">${ergebnis}</span>`,
            `Probe mit der Malaufgabe: <b>${voll} · ${g}${r ? ` + ${r}` : ""} = ${n}</b> ✓`,
        ])}`;
}
function geteiltNeu(){
    const g = z(2, 9), a = z(2, 9), r = S.gt.rest ? z(1, g - 1) : 0;
    S.gt.g = g; S.gt.n = a * g + r;
}

/* ---------- 5 · Aufgabenfamilie (Rechenhaus) ---------- */
function familie(B, P){
    if (!S.fam) famNeu();
    const { a, b } = S.fam, c = a * b, s = S.schritt;
    const zeile = (t, x, i) => `<div class="z" data-x="weiter">${t} = ${s > i ? `<span class="ew-rot">${x}</span>` : `<span class="ew-zu">${x}</span>`}</div>`;
    B.innerHTML = `<div class="ew-haus"><div class="ew-dach"><span>${c}</span></div><div class="ew-hauswand"><div class="kopf"><span>${a}</span><span>${b}</span></div>
        ${zeile(`${a} · ${b}`, c, 0)}${zeile(`${b} · ${a}`, c, 1)}${zeile(`${c} : ${a}`, b, 2)}${zeile(`${c} : ${b}`, a, 3)}</div></div>`;
    P.innerHTML = `<div class="ew-merke"><b>Aufgabenfamilie</b>Drei Zahlen – vier Aufgaben: zwei Malaufgaben (Tauschaufgaben) und zwei Geteiltaufgaben (Umkehraufgaben). Wer eine kennt, kennt alle vier!</div>
        <div class="ew-knoepfe">${stepper("Zahl 1", a, 1, 10, "fa")}${stepper("Zahl 2", b, 1, 10, "fb")}</div>
        <div class="ew-info" style="text-align:left">Die Klasse nennt die Aufgaben – tippe auf eine Zeile im Haus, um aufzudecken.</div>
        <div class="ew-knoepfe"><button class="ew-k blau" data-x="weiter">Weiter ▶</button><button class="ew-k" data-x="alle">Alles zeigen</button><button class="ew-k gold" data-x="neu">🎲 Neues Haus</button></div>
        <div class="ew-merke" style="background:#eef4fb;border-left-color:#3d7ea6"><b style="color:#3d7ea6">Knobelaufgabe</b>Nur das Dach steht da: <b>${c}</b>. Welche Zahlen können unten stehen?
            <details style="margin-top:6px"><summary style="cursor:pointer;color:#3d7ea6">Lösung</summary>${teiler(c).map(([x, y]) => `${x} · ${y}`).join(" · ") || "–"}</details></div>`;
}
function teiler(c){ const l = []; for (let x = 1; x <= 10; x++) if (c % x === 0 && c / x <= 10 && x <= c / x) l.push([x, c / x]); return l; }
function famNeu(){ S.fam = { a: z(2, 9), b: z(2, 9) }; S.schritt = 0; }

/* ---------- 6 · Üben: Klasse gegen Ella ---------- */
const UE_ARTEN = [["mal", "Mal"], ["geteilt", "Geteilt"], ["luecke", "Lücken  ? · 4 = 28"], ["gemischt", "Gemischt"], ["rest", "Mit Rest"], ["gross", "Großes 1 × 1"]];
function ueAufgabe(){
    const u = S.ue, r = zufall(u.reihen.length ? u.reihen : [2, 3, 4, 5, 6, 7, 8, 9]), k = z(1, 10);
    let art = u.art === "gemischt" ? zufall(["mal", "geteilt", "luecke"]) : u.art;
    if (art === "mal") return Math.random() < .5 ? { t: `${k} · ${r}`, e: k * r } : { t: `${r} · ${k}`, e: k * r };
    if (art === "geteilt") return { t: `${k * r} : ${r}`, e: k };
    if (art === "luecke") return Math.random() < .5 ? { t: `<span class="ew-rot">?</span> · ${r} = ${k * r}`, e: k, luecke: true } : { t: `${k * r} : <span class="ew-rot">?</span> = ${k}`, e: r, luecke: true };
    if (art === "rest"){ const g = Math.max(2, r), a = z(2, 9), x = a * g + z(1, g - 1); return { t: `${x} : ${g}`, e: `${a} R ${x - a * g}` }; }
    const a = z(11, 19), b = z(2, 9); return { t: `${a} · ${b}`, e: a * b, gross: [a, b] };
}
function ueben(B, P){
    const u = S.ue;
    if (!u.aufgabe) u.aufgabe = ueAufgabe();
    const x = u.aufgabe, [sa, sb] = window.tbSeiten ? window.tbSeiten() : ["Klasse", "🦉 Ella"];
    B.innerHTML = `<div class="ew-blitz">${x.luecke ? x.t : `${x.t} = ${u.zeigen ? `<span class="ew-rot">${x.e}</span>` : `<span class="ew-rot">?</span>`}`}</div>
        ${x.luecke && u.zeigen ? `<div class="ew-gross ew-rot">${x.e}</div>` : ""}
        ${x.gross && u.zeigen ? `<div class="ew-mittel">${x.gross[0]} · ${x.gross[1]} = 10 · ${x.gross[1]} + ${x.gross[0] - 10} · ${x.gross[1]} = ${10 * x.gross[1]} + ${(x.gross[0] - 10) * x.gross[1]}</div>` : ""}
        <div class="ew-knoepfe" style="justify-content:center">${u.zeigen ? `<button class="ew-k gruen" data-ue="k">✓ Punkt für ${sa === "Klasse" ? "die Klasse" : sa}</button><button class="ew-k lila" data-ue="e">Punkt für ${sb === "Lehrkraft" ? "die Lehrkraft" : sb}</button>` : `<button class="ew-k gold" data-ue="zeigen">Lösung zeigen</button>`}<button class="ew-k" data-ue="weiter">Nächste ▶</button></div>
        <div class="ew-info">Aufgabe ${u.n + 1} · ${sa} ${u.punkte.k} : ${u.punkte.e} ${sb}</div>`;
    P.innerHTML = `<div class="ew-h">Was üben?</div><div class="ew-chips">${UE_ARTEN.map(([k, n]) => `<button class="ew-chip ${u.art === k ? "an" : ""}" data-ueart="${k}">${n}</button>`).join("")}</div>
        <div class="ew-h">Reihen</div><div class="ew-chips">${[...Array(10).keys()].map(i => `<button class="ew-chip ${u.reihen.includes(i + 1) ? "an" : ""}" data-uereihe="${i + 1}">${i + 1}</button>`).join("")}</div>
        <div class="ew-knoepfe"><button class="ew-k" data-uealle="1">alle</button><button class="ew-k" data-uealle="schwer">nur schwere (3, 4, 6, 7, 8, 9)</button><button class="ew-k" data-uealle="0">↺ Punkte auf 0</button></div>
        <div class="ew-h">Wer spielt?</div><div class="ew-chips">${Object.entries(window.TB_GEGNER || {}).map(([k, v]) => `<button class="ew-chip ${window.tbGegner() === k ? "an" : ""}" data-gegner="${k}">${v[2]}</button>`).join("")}</div>
        <div class="ew-merke"><b>So geht's</b>${sb.includes("Ella") ? "Die Aufgabe steht groß an der Tafel. Wer sie zuerst richtig sagt, holt den Punkt – für die Klasse oder für Eule Ella 🦉." : sa === "Team A" ? "Die Klasse ist in zwei Teams geteilt. Abwechselnd ist ein Team dran – richtig gelöst gibt einen Punkt." : "Die Klasse spielt gegen dich: Wer zuerst richtig antwortet, bekommt den Punkt."} Erst dann „Lösung zeigen“.</div>`;
}

/* ---------- 7 · Das große 1 × 1 (11–20 mal 1–10) ---------- */
function grosses(B, P){
    const g = S.gr, Bw = B.clientWidth || 700, Bh = B.clientHeight || 500;
    const zelle = Math.max(26, Math.floor(Math.min((Bw - 60) / 11, (Bh - 70) / 11)));
    let h = `<div class="ew-tab-gross" style="grid-template-columns:repeat(11,${zelle}px);grid-auto-rows:${zelle}px;font-size:${Math.round(zelle * .36)}px"><div class="ecke">·</div>`;
    for (let b = 1; b <= 10; b++) h += `<div class="kopf">${b}</div>`;
    for (let a = 11; a <= 20; a++){ h += `<div class="kopf">${a}</div>`; for (let b = 1; b <= 10; b++) h += `<div class="${g.wahl && g.wahl[0] === a && g.wahl[1] === b ? "wahl" : ""} ${g.verdeckt && !(g.auf || new Set()).has(a + "," + b) ? "zu" : ""}" data-gr="${a},${b}">${a * b}</div>`; }
    B.innerHTML = h + `</div>`;
    if (g.wahl){
        const [a, b] = g.wahl, e = a - 10;
        P.innerHTML = `<div class="ew-gross" style="font-size:clamp(34px,6vmin,80px)">${a} · ${b} = ${g.schritt >= 3 ? `<span class="ew-rot">${a * b}</span>` : "?"}</div>
            <div class="ew-merke"><b>Trick: zerlegen</b>Zerlege die große Zahl in <b>10</b> und den Rest. Rechne beide kleinen Aufgaben und zähle zusammen.</div>
            ${schrittListe([`${a} = 10 + ${e}`, `10 · ${b} = <b>${10 * b}</b> und ${e} · ${b} = <b>${e * b}</b>`, `${10 * b} + ${e * b} = <span class="ew-rot">${a * b}</span>`], g.schritt)}
            ${feld(b, a, (i, j) => j < 10 ? "g1" : "g2", .3)}
            <div class="ew-knoepfe"><button class="ew-k blau" data-gx="weiter">Weiter ▶</button><button class="ew-k" data-gx="alle">Alles zeigen</button><button class="ew-k gold" data-gx="zufall">🎲 Zufällige Aufgabe</button></div>`;
    } else {
        P.innerHTML = `<div class="ew-gross" style="font-size:clamp(30px,5vmin,64px)">Das große 1 × 1</div>
            <div class="ew-merke"><b>Merke</b>Das große Einmaleins sind die Aufgaben von <b>11 · 1 bis 20 · 10</b>. Keiner muss sie auswendig können – mit dem <b>Zerlege-Trick</b> rechnet man sie aus dem kleinen 1 × 1: <b>14 · 6 = 10 · 6 + 4 · 6 = 60 + 24 = 84</b>.</div>
            <div class="ew-merke" style="background:#eef4fb;border-left-color:#3d7ea6"><b style="color:#3d7ea6">Gut zu wissen</b>Quadratzahlen: 11 · 11 = 121 · 12 · 12 = 144 · 13 · 13 = 169 · 14 · 14 = 196 · 15 · 15 = 225 · 20 · 20 = 400</div>
            <div class="ew-knoepfe"><button class="ew-k gold" data-gx="zufall">🎲 Zufällige Aufgabe</button><button class="ew-k" data-gx="verdecken">${g.verdeckt ? "Alle zeigen" : "Ergebnisse verdecken"}</button></div>
            <div class="ew-info" style="text-align:left">Tippe auf ein Feld der Tabelle: Die Aufgabe wird Schritt für Schritt zerlegt.</div>`;
    }
}
function schrittListe(liste, n){ return `<div class="ew-schritte">${liste.map((s, i) => `<div class="ew-schritt ${i < n ? "" : "zu"}" data-gx="weiter"><span class="nr">${i + 1}</span><div class="inhalt">${s}</div></div>`).join("")}</div>`; }

/* ---------- Steuerung ---------- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function zeichnen(){
    el.querySelectorAll(".ew-tab").forEach(t => t.classList.toggle("an", t.dataset.tab === S.tab));
    el.querySelector("#ewPunkte").classList.toggle("an", S.tab === "ueben");
    if (window.tbSeiten){ const [sa, sb] = window.tbSeiten(); el.querySelector("#ewNa").textContent = sa; el.querySelector("#ewNb").textContent = sb; }
    el.querySelector("#ewPk").textContent = S.ue.punkte.k; el.querySelector("#ewPe").textContent = S.ue.punkte.e;
    const B = el.querySelector("#ewB"), P = el.querySelector("#ewP");
    ({ verstehen, reihe, tricks, geteilt, familie, ueben, gross: grosses })[S.tab](B, P);
}
function maxSchritte(){
    if (S.tab === "verstehen") return 6;
    if (S.tab === "tricks") return S.bsp ? S.bsp.s.length : 0;
    if (S.tab === "geteilt") return 4;
    if (S.tab === "familie") return 4;
    return 0;
}
function klick(e){
    const t = e.target.closest("[data-gegner],[data-x],[data-tab],[data-st],[data-schritt],[data-reihe],[data-zeile],[data-trick],[data-gtart],[data-gtrest],[data-ue],[data-ueart],[data-uereihe],[data-uealle],[data-gr],[data-gx]");
    if (!t) return;
    const d = t.dataset;
    if (d.gegner){ window.tbGegner(d.gegner); return zeichnen(); }
    if (d.tab){ S.tab = d.tab; S.schritt = 0; history.replaceState(null, "", location.pathname + location.search + "#1x1-" + S.tab); return zeichnen(); }
    if (d.st){
        const k = d.st, x = +d.d;
        if (k === "a") S.a = Math.max(1, Math.min(10, S.a + x));
        if (k === "b") S.b = Math.max(1, Math.min(10, S.b + x));
        if (k === "n") S.gt.n = Math.max(2, Math.min(100, S.gt.n + x));
        if (k === "g") S.gt.g = Math.max(2, Math.min(10, S.gt.g + x));
        if (k === "fa") S.fam.a = Math.max(1, Math.min(10, S.fam.a + x));
        if (k === "fb") S.fam.b = Math.max(1, Math.min(10, S.fam.b + x));
        S.schritt = 0; return zeichnen();
    }
    if (d.schritt !== undefined){ const i = +d.schritt; S.schritt = i < S.schritt ? i : i + 1; return zeichnen(); }
    if (d.reihe){ S.reihe = +d.reihe; S.offen = new Set(); S.kernOffen = false; return zeichnen(); }
    if (d.zeile){ const k = +d.zeile; S.offen = S.offen || new Set(); S.offen.has(k) ? S.offen.delete(k) : S.offen.add(k); return zeichnen(); }
    if (d.trick){ S.trick = d.trick; S.bsp = null; S.schritt = 0; return zeichnen(); }
    if (d.gtart){ S.gt.art = d.gtart; S.schritt = 0; return zeichnen(); }
    if (d.gtrest){ S.gt.rest = !S.gt.rest; geteiltNeu(); S.schritt = 0; return zeichnen(); }
    if (d.ueart){ S.ue.art = d.ueart; S.ue.aufgabe = null; S.ue.zeigen = false; return zeichnen(); }
    if (d.uereihe){ const r = +d.uereihe, l = S.ue.reihen; const i = l.indexOf(r); i >= 0 ? l.splice(i, 1) : l.push(r); S.ue.aufgabe = null; S.ue.zeigen = false; return zeichnen(); }
    if (d.uealle){ if (d.uealle === "1") S.ue.reihen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; else if (d.uealle === "schwer") S.ue.reihen = [3, 4, 6, 7, 8, 9]; else { S.ue.punkte = { k: 0, e: 0 }; S.ue.n = 0; } S.ue.aufgabe = null; S.ue.zeigen = false; return zeichnen(); }
    if (d.ue){
        if (d.ue === "zeigen") S.ue.zeigen = true;
        else { if (d.ue === "k") S.ue.punkte.k++; if (d.ue === "e") S.ue.punkte.e++; S.ue.n++; let n; do n = ueAufgabe(); while (S.ue.aufgabe && n.t === S.ue.aufgabe.t); S.ue.aufgabe = n; S.ue.zeigen = false; }
        return zeichnen();
    }
    if (d.gr){ const [a, b] = d.gr.split(",").map(Number); S.gr.auf = S.gr.auf || new Set(); S.gr.auf.add(d.gr); S.gr.wahl = S.gr.wahl && S.gr.wahl[0] === a && S.gr.wahl[1] === b ? null : [a, b]; S.gr.schritt = 0; return zeichnen(); }
    if (d.gx){
        const g = S.gr;
        if (d.gx === "weiter") g.schritt = Math.min(3, g.schritt + 1);
        if (d.gx === "alle") g.schritt = 3;
        if (d.gx === "zufall"){ g.wahl = [z(11, 19), z(2, 9)]; g.schritt = 0; }
        if (d.gx === "verdecken"){ g.verdeckt = !g.verdeckt; g.auf = new Set(); }
        return zeichnen();
    }
    const x = d.x;
    if (x === "zu") return schliessen();
    if (x === "voll") return window.vollbild && window.vollbild();
    if (x === "weiter"){ S.schritt = Math.min(maxSchritte(), S.schritt + 1); return zeichnen(); }
    if (x === "alle"){ S.schritt = maxSchritte(); return zeichnen(); }
    if (x === "zurueck"){ S.schritt = 0; return zeichnen(); }
    if (x === "neu"){
        S.schritt = 0;
        if (S.tab === "verstehen"){ S.a = z(2, 9); S.b = z(2, 9); }
        if (S.tab === "tricks") S.bsp = null;
        if (S.tab === "geteilt") geteiltNeu();
        if (S.tab === "familie") famNeu();
        return zeichnen();
    }
    if (x === "kern"){ S.kernOffen = true; return zeichnen(); }
    if (x === "wege"){ S.wegeZeigen = !S.wegeZeigen; return zeichnen(); }
    if (x === "reiheAlle"){ S.offen = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); return zeichnen(); }
    if (x === "reiheZu"){ S.offen = new Set(); S.kernOffen = false; return zeichnen(); }
}
function oeffnen(tab){
    aufbauen();
    if (tab && TABS.some(t => t[0] === tab)) S.tab = tab;
    S.schritt = 0;
    el.classList.add("an");
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "none";
    history.replaceState(null, "", location.pathname + location.search + "#1x1-" + S.tab);
    requestAnimationFrame(zeichnen);
}
function schliessen(){
    el.classList.remove("an");
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "";
    history.replaceState(null, "", location.pathname + location.search);
}
window.tafel1x1 = { oeffnen, schliessen };
document.addEventListener("DOMContentLoaded", () => { const m = /^#1x1-(\w+)$/.exec(location.hash); if (m) oeffnen(m[1]); });
})();
