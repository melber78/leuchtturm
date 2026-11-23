/* ===============================================================
   Tafelbild: Brüche (Klasse 5/6)
   Was ist ein Bruch · Gemischte Zahlen · Erweitern & Kürzen · Vergleichen
   Zahlenstrahl · Plus & Minus · Mal & Geteilt
   Bild + Merksatz + Rechenweg zum schrittweisen Aufdecken an der Tafel
   =============================================================== */
(function(){
"use strict";

const CSS = `
#br{ position:fixed; inset:0; display:none; flex-direction:column; z-index:12; background:#eef2f6; color:#1f2d36; font-family:"Nunito",sans-serif; user-select:none; -webkit-user-select:none; }
#br.an{ display:flex; }
#br.kreide{ background:#24403a; color:#f3efe3; }
.br-leiste{ display:flex; gap:8px; align-items:center; padding:8px 14px 6px; flex-wrap:wrap; }
.br-titel{ font-weight:900; font-size:19px; color:#16324a; margin-right:4px; }
.br-titel small{ font-weight:800; color:#7c8a96; font-size:14px; margin-left:4px; }
#br.kreide .br-titel{ color:#f3efe3; } #br.kreide .br-titel small{ color:#b9c9bf; }
#br.kreide .tb-k{ background:rgba(255,255,255,.12); color:#f3efe3; }
#br .tb-k.an{ background:#16324a !important; color:#fff !important; }
#br.kreide .tb-k.an{ background:#f3efe3 !important; color:#24403a !important; }
.br-tabs{ display:flex; gap:6px; overflow-x:auto; padding:0 14px 10px; scrollbar-width:none; flex:none; }
.br-tabs::-webkit-scrollbar{ display:none; }
.br-tab{ font:800 15px "Nunito",sans-serif; border:2px solid #d6dee6; background:white; color:#16324a; border-radius:999px; padding:8px 15px; cursor:pointer; white-space:nowrap; min-height:44px; }
.br-tab.an{ background:#16324a; border-color:#16324a; color:white; }
#br.kreide .br-tab{ background:rgba(255,255,255,.07); border-color:rgba(255,255,255,.2); color:#f3efe3; }
#br.kreide .br-tab.an{ background:#f3efe3; color:#24403a; border-color:#f3efe3; }
.br-haupt{ flex:1; min-height:0; display:flex; gap:2vmin; padding:0 2vmin 2vmin; }
.br-buehne{ flex:1.35; min-width:0; background:white; border-radius:22px; box-shadow:0 6px 24px rgba(22,50,74,.08); display:flex; flex-direction:column; padding:2.2vmin 2.4vmin; gap:1.5vmin; }
#br.kreide .br-buehne, #br.kreide .br-panel{ background:rgba(255,255,255,.06); box-shadow:none; }
.br-frage{ text-align:center; font-weight:800; color:#6b7a86; font-size:clamp(15px,2.2vmin,24px); }
#br.kreide .br-frage{ color:#c9d8cd; }
.br-aufgabe{ font-size:clamp(30px,6.4vmin,90px); font-weight:900; display:flex; align-items:center; justify-content:center; gap:.3em; flex-wrap:wrap; color:#16324a; line-height:1.1; font-variant-numeric:tabular-nums; }
#br.kreide .br-aufgabe{ color:#fdfaf1; }
.br-aufgabe .op{ color:#7c8a96; font-weight:800; }
.br-bild{ flex:1; min-height:0; display:flex; align-items:center; justify-content:center; }
.br-bild svg{ width:100%; height:100%; max-height:100%; overflow:visible; }
.br-bild .br-ohne{ color:#9aa8b4; font-weight:800; font-size:clamp(15px,2vmin,22px); text-align:center; }
.br-panel{ flex:1; max-width:660px; min-width:300px; background:white; border-radius:22px; box-shadow:0 6px 24px rgba(22,50,74,.08); padding:2.2vmin 2.4vmin; display:flex; flex-direction:column; gap:1.5vmin; overflow:auto; }
.br-merke{ background:#eaf2f9; border-left:6px solid #3d7ea6; border-radius:12px; padding:1.1vmin 1.5vmin; font-size:clamp(15px,1.95vmin,21px); line-height:1.4; font-weight:700; }
.br-merke b:first-child{ display:block; font-size:.72em; letter-spacing:.08em; text-transform:uppercase; color:#3d7ea6; margin-bottom:2px; }
#br.kreide .br-merke{ background:rgba(255,255,255,.08); border-left-color:#f2c14e; }
#br.kreide .br-merke b:first-child{ color:#f2c14e; }
.br-regler{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
.br-st{ display:inline-flex; align-items:center; gap:4px; background:#eef2f6; border-radius:999px; padding:4px 4px 4px 12px; font-weight:800; font-size:14px; color:#52606b; }
.br-st b{ min-width:1.7em; text-align:center; font-size:20px; color:#16324a; font-variant-numeric:tabular-nums; }
.br-st button, .br-wahl button{ font:900 18px "Nunito",sans-serif; border:0; background:white; color:#16324a; width:38px; height:38px; border-radius:50%; cursor:pointer; box-shadow:0 2px 6px rgba(22,50,74,.1); }
.br-wahl{ display:inline-flex; background:#eef2f6; border-radius:999px; padding:4px; gap:3px; }
.br-wahl button{ width:auto; border-radius:999px; padding:0 13px; font-size:15px; font-weight:800; box-shadow:none; background:transparent; }
.br-wahl button.an{ background:#16324a; color:white; }
#br.kreide .br-st, #br.kreide .br-wahl{ background:rgba(255,255,255,.1); color:#d8e3da; }
#br.kreide .br-st b{ color:#fdfaf1; }
#br.kreide .br-st button{ background:rgba(255,255,255,.16); color:#fdfaf1; box-shadow:none; }
#br.kreide .br-wahl button{ color:#f3efe3; }
#br.kreide .br-wahl button.an{ background:#f3efe3; color:#24403a; }
.br-eingabe{ display:flex; gap:6px; width:100%; }
.br-eingabe input{ flex:1; min-width:0; font:800 17px "Nunito",sans-serif; border:2px solid #d6dee6; border-radius:12px; padding:9px 12px; color:#16324a; background:white; }
.br-eingabe button{ font:900 15px "Nunito",sans-serif; border:0; border-radius:12px; background:#3d7ea6; color:white; padding:0 16px; cursor:pointer; }
.br-fehler{ color:#d1342b; font-weight:800; font-size:14px; width:100%; }
.br-h{ font-size:13px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; color:#7c8a96; margin:2px 0 -4px; }
#br.kreide .br-h{ color:#b9c9bf; }
.br-schritte{ display:flex; flex-direction:column; gap:1.1vmin; }
.br-s{ display:grid; grid-template-columns:auto 1fr; gap:.5vmin 1.2vmin; align-items:start; }
.br-s .nr{ width:clamp(26px,3.4vmin,38px); height:clamp(26px,3.4vmin,38px); border-radius:50%; background:#16324a; color:white; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:clamp(14px,1.9vmin,20px); grid-row:span 2; }
#br.kreide .br-s .nr{ background:#f3efe3; color:#24403a; }
.br-s .f{ font-size:clamp(15px,2vmin,22px); font-weight:800; line-height:1.3; padding-top:.15em; }
.br-s .a{ font-size:clamp(20px,3.1vmin,38px); font-weight:900; color:#16324a; line-height:1.15; font-variant-numeric:tabular-nums; }
#br.kreide .br-s .a{ color:#fdfaf1; }
.br-s .a small{ font-size:.55em; font-weight:800; color:#52606b; }
#br.kreide .br-s .a small{ color:#d8e3da; }
.br-knoepfe{ display:flex; gap:8px; flex-wrap:wrap; margin-top:auto; padding-top:.6vmin; }
.br-knoepfe button{ font:900 clamp(15px,1.9vmin,19px) "Nunito",sans-serif; border:0; border-radius:999px; padding:11px 18px; cursor:pointer; background:#eef2f6; color:#16324a; display:inline-flex; gap:8px; align-items:center; min-height:46px; }
.br-knoepfe .haupt{ background:#16324a; color:white; }
.br-knoepfe .neu{ background:#e08a2c; color:white; }
#br.kreide .br-knoepfe button{ background:rgba(255,255,255,.12); color:#f3efe3; }
#br.kreide .br-knoepfe .haupt{ background:#f3efe3; color:#24403a; }
#br.kreide .br-knoepfe .neu{ background:#e08a2c; color:white; }

/* Brüche schreiben */
.bz{ display:inline-flex; flex-direction:column; align-items:center; vertical-align:middle; line-height:1.02; font-size:.8em; margin:0 .06em; font-variant-numeric:tabular-nums; }
.bz > span{ padding:0 .14em; }
.bz > span:first-child{ border-bottom:.075em solid currentColor; }
.gz{ display:inline-flex; align-items:center; gap:.06em; }
.bz-g{ display:inline-block; }
.lsg{ display:inline-flex; align-items:center; gap:.25em; flex-wrap:wrap; border-radius:12px; }
.lsg.zu{ position:relative; background:#e3e9ef; cursor:pointer; color:transparent; min-width:1.7em; min-height:1.25em; justify-content:center; }
.lsg.zu *{ visibility:hidden; }
.lsg.zu::after{ content:"?"; position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#9aa8b4; font-weight:900; }
.br-s .lsg.zu{ display:flex; width:100%; min-height:1.5em; }
.br-s .lsg.zu::after{ content:"antippen"; font-size:clamp(13px,1.6vmin,17px); letter-spacing:.06em; text-transform:uppercase; }
#br.kreide .lsg.zu{ background:rgba(255,255,255,.12); }
#br.kreide .lsg.zu::after{ color:rgba(255,255,255,.45); }
.lsg.neu{ animation:brAuf .7s ease; }
@keyframes brAuf{ 0%{ background:#ffe39a; } 100%{ background:transparent; } }
.rot{ color:#d1342b; } .blau{ color:#3d7ea6; } .orange{ color:#d17a1c; }
#br.kreide .rot{ color:#ff9b8f; } #br.kreide .blau{ color:#9fd0f0; } #br.kreide .orange{ color:#ffc27a; }

/* Farben im Bild */
#br svg .st{ stroke:#16324a; } #br.kreide svg .st{ stroke:#f3efe3; }
#br svg .tx{ fill:#16324a; } #br.kreide svg .tx{ fill:#f3efe3; }
#br svg .txg{ fill:#7c8a96; } #br.kreide svg .txg{ fill:#b9c9bf; }
#br svg .f0{ fill:#ffffff; } #br.kreide svg .f0{ fill:rgba(255,255,255,.05); }
#br svg .fa{ fill:#3d7ea6; } #br svg .fb{ fill:#e08a2c; } #br svg .fab{ fill:#6a4c93; }
#br svg .fa2{ fill:#cfe3f1; } #br svg .fb2{ fill:#f8dcb8; }
#br.kreide svg .fa{ fill:#5ea6d6; } #br.kreide svg .fa2{ fill:rgba(94,166,214,.3); } #br.kreide svg .fb2{ fill:rgba(224,138,44,.32); }
#br svg .fr{ fill:url(#brSchraffur); }
#br svg .txa{ fill:#3d7ea6; } #br svg .txb{ fill:#d17a1c; } #br svg .txr{ fill:#d1342b; }
#br.kreide svg .txa{ fill:#9fd0f0; } #br.kreide svg .txb{ fill:#ffc27a; } #br.kreide svg .txr{ fill:#ff9b8f; }
#br svg .la{ stroke:#3d7ea6; } #br svg .lb{ stroke:#d17a1c; } #br svg .lr{ stroke:#d1342b; }
#br.kreide svg .la{ stroke:#9fd0f0; } #br.kreide svg .lb{ stroke:#ffc27a; } #br.kreide svg .lr{ stroke:#ff9b8f; }

.br-menue{ position:absolute; top:62px; right:14px; background:white; color:#16324a; border-radius:18px; box-shadow:0 12px 40px rgba(22,50,74,.2); padding:14px; display:none; flex-direction:column; gap:8px; z-index:6; min-width:240px; }
.br-menue.an{ display:flex; }
.br-menue h4{ margin:4px 0 0; font-size:12px; text-transform:uppercase; letter-spacing:.06em; color:#7c8a96; }
.br-menue .reihe{ display:flex; gap:6px; flex-wrap:wrap; }
.br-menue button{ font:800 15px "Nunito",sans-serif; border:2px solid #e3e8ee; background:#f7f9fb; color:#16324a; border-radius:12px; padding:8px 12px; cursor:pointer; }
.br-menue button.an{ background:#16324a; border-color:#16324a; color:white; }

@media (max-width:900px), (orientation:portrait){
  #br{ overflow-y:auto; -webkit-overflow-scrolling:touch; }
  .br-haupt{ flex-direction:column; flex:none; padding:0 10px 14px; gap:10px; }
  .br-buehne{ flex:none; padding:14px; }
  .br-bild{ flex:none; height:min(62vw, 46vh); min-height:170px; }
  .br-panel{ flex:none; max-width:none; min-width:0; padding:14px; }
  .br-leiste .tb-k .br-txt{ display:none; }
  .br-leiste{ padding:8px 10px 6px; gap:6px; }
  .br-tabs{ padding:0 10px 8px; }
  .br-titel small{ display:none; }
  .br-knoepfe button{ flex:1 1 auto; justify-content:center; }
}
`;

/* ---------- Rechnen ---------- */
const ggt = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
const kgv = (a, b) => a / ggt(a, b) * b;
const zuf = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const nimm = l => l[Math.floor(Math.random() * l.length)];
const begrenze = (x, a, b) => Math.max(a, Math.min(b, x));
const NAMEN = ["", "Ganze", "Halbe", "Drittel", "Viertel", "Fünftel", "Sechstel", "Siebtel", "Achtel", "Neuntel", "Zehntel", "Elftel", "Zwölftel"];
const ZW = ["null", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf"];
const nName = n => n <= 12 ? NAMEN[n] : n + (n < 20 ? "tel" : "stel");
function gelesen(z, n){
    if (n === 2) return z === 1 ? "ein Halbes" : (ZW[z] || z) + " Halbe";
    return (ZW[z] || z) + " " + nName(n);
}

/* ---------- Schreiben ---------- */
function B(z, n, o){
    o = o || {};
    if (n === 1) return `<span class="bz-g">${z}</span>`;
    if (o.gem && typeof z === "number" && z >= n){
        const g = Math.floor(z / n), r = z % n;
        if (r === 0) return `<span class="bz-g">${g}</span>`;
        return `<span class="gz"><span class="bz-g">${g}</span>${B(r, n)}</span>`;
    }
    return `<span class="bz"><span>${z}</span><span>${n}</span></span>`;
}
const BF = f => B(f.z, f.n, { gem: f.gem });
const L = (html, cls) => `<span class="lsg zu ${cls || ""}" data-l="1">${html}</span>`;
const OP = s => `<span class="op">${s}</span>`;

/* ---------- Bild-Bausteine (SVG) ---------- */
const f1 = x => Math.round(x * 10) / 10;
function svg(w, h, inhalt){
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" font-family="Nunito, sans-serif">
        <defs><pattern id="brSchraffur" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="10" fill="#fbe1de"/><line x1="0" y1="0" x2="0" y2="10" stroke="#d1342b" stroke-width="4"/></pattern></defs>${inhalt}</svg>`;
}
function torte(cx, cy, r, n, gef, cl){
    cl = cl || "fa";
    let s = "";
    if (n === 1) return `<circle cx="${cx}" cy="${cy}" r="${r}" class="${gef >= 1 ? cl : "f0"} st" stroke-width="4"/>`;
    for (let i = 0; i < n; i++){
        const a0 = -Math.PI / 2 + i * 2 * Math.PI / n, a1 = a0 + 2 * Math.PI / n;
        s += `<path d="M${cx} ${cy} L${f1(cx + r * Math.cos(a0))} ${f1(cy + r * Math.sin(a0))} A${r} ${r} 0 0 1 ${f1(cx + r * Math.cos(a1))} ${f1(cy + r * Math.sin(a1))}Z" class="${i < gef ? cl : "f0"} st" stroke-width="${n > 16 ? 1.5 : 2.5}" stroke-linejoin="round"/>`;
    }
    return s + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" class="st" stroke-width="4"/>`;
}
function balken(x, y, w, h, n, farbe, gruppe){
    let s = "";
    const tw = w / n, duenn = n > 40 ? 1 : n > 20 ? 1.5 : 2.5;
    for (let i = 0; i < n; i++) s += `<rect x="${f1(x + i * tw)}" y="${y}" width="${f1(tw)}" height="${h}" class="${farbe(i)} st" stroke-width="${duenn}"/>`;
    if (gruppe && gruppe < n) for (let i = gruppe; i < n; i += gruppe) s += `<line x1="${f1(x + i * tw)}" y1="${y}" x2="${f1(x + i * tw)}" y2="${y + h}" class="st" stroke-width="4.5"/>`;
    return s + `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" class="st" stroke-width="4" rx="2"/>`;
}
function svgB(x, y, z, n, fs, cls){
    fs = fs || 28; cls = cls || "tx";
    if (n === 1) return `<text x="${x}" y="${f1(y + fs * .35)}" text-anchor="middle" font-size="${fs}" font-weight="900" class="${cls}">${z}</text>`;
    const w = Math.max(String(z).length, String(n).length) * fs * .6 + fs * .35;
    const lc = cls === "tx" ? "st" : cls.replace("tx", "l");
    return `<text x="${x}" y="${f1(y - fs * .2)}" text-anchor="middle" font-size="${fs}" font-weight="900" class="${cls}">${z}</text>
        <line x1="${f1(x - w / 2)}" y1="${y}" x2="${f1(x + w / 2)}" y2="${y}" class="${lc}" stroke-width="${f1(fs * .09)}" stroke-linecap="round"/>
        <text x="${x}" y="${f1(y + fs * .9)}" text-anchor="middle" font-size="${fs}" font-weight="900" class="${cls}">${n}</text>`;
}
function svgGem(x, y, z, n, fs, cls){
    if (n === 1 || z < n) return svgB(x, y, z, n, fs, cls);
    const g = Math.floor(z / n), r = z % n;
    if (!r) return svgB(x, y, g, 1, fs, cls);
    return `<text x="${f1(x - fs * .45)}" y="${f1(y + fs * .38)}" text-anchor="end" font-size="${fs * 1.15}" font-weight="900" class="${cls || "tx"}">${g}</text>` + svgB(x + fs * .1, y, r, n, fs, cls);
}
function strahlZahlen(x, y, w, ganze, fs){
    let s = "";
    for (let i = 0; i <= ganze; i++) s += `<text x="${f1(x + w * i / ganze)}" y="${y}" text-anchor="middle" font-size="${fs || 24}" font-weight="900" class="txg">${i}</text>`;
    return s;
}

/* ---------- Zustand ---------- */
const KAPITEL = [
    ["bruch", "Was ist ein Bruch?"],
    ["gem", "Umwandeln"],
    ["erw", "Erweitern & Kürzen"],
    ["ver", "Vergleichen"],
    ["zs", "Zahlenstrahl"],
    ["pm", "Plus & Minus"],
    ["md", "Mal & Geteilt"]
];
let el;
const S = {
    kap: "bruch", hg: "hell", bild: true, fehler: "",
    bruch: { z: 3, n: 4, form: "beide" },
    gem: { z: 11, n: 4, r: "u2g" },
    erw: { z: 2, n: 3, k: 2, m: "erw" },
    ver: { z1: 2, n1: 3, z2: 3, n2: 4 },
    zs: { n: 4, L: 2, p: 5, alle: false },
    pm: { a: { z: 11, n: 4, gem: true }, b: { z: 7, n: 6, gem: true }, op: "+", modus: "gem" },
    md: { a: { z: 3, n: 4 }, b: { z: 2, n: 3 }, op: "·", modus: "bruch" }
};
try { const m = JSON.parse(localStorage.getItem("lt-brueche") || "{}"); if (m.kap) S.kap = m.kap; if (m.hg) S.hg = m.hg; if (m.bild === false) S.bild = false; } catch (x) {}
function merken(){ try { localStorage.setItem("lt-brueche", JSON.stringify({ kap: S.kap, hg: S.hg, bild: S.bild })); } catch (x) {} }

/* ---------- Bedienelemente ---------- */
const stepper = (label, key, wert) => `<span class="br-st">${label}<button data-st="${key}" data-d="-1" title="weniger">−</button><b>${wert}</b><button data-st="${key}" data-d="1" title="mehr">+</button></span>`;
const wahl = (key, liste, akt) => `<span class="br-wahl">${liste.map(([w, t]) => `<button data-set="${key}=${w}" class="${String(akt) === String(w) ? "an" : ""}">${t}</button>`).join("")}</span>`;
const eingabe = bsp => `<form class="br-eingabe" data-eingabe="1"><input type="text" inputmode="text" autocomplete="off" placeholder="Eigene Aufgabe, z. B. ${bsp}" aria-label="Eigene Aufgabe"><button type="submit">Los</button></form>${S.fehler ? `<div class="br-fehler">${S.fehler}</div>` : ""}`;

/* ===============================================================
   Kapitel
   =============================================================== */
const K = {};

/* 1 · Was ist ein Bruch? */
K.bruch = () => {
    const { z, n, form } = S.bruch;
    let bild;
    if (form === "kreis") bild = svg(640, 380, torte(320, 190, 175, n, z));
    else if (form === "streifen") bild = svg(640, 200, balken(30, 50, 580, 100, n, i => i < z ? "fa" : "f0"));
    else bild = svg(640, 470, torte(320, 165, 150, n, z) + balken(40, 358, 560, 80, n, i => i < z ? "fa" : "f0"));
    return {
        frage: "Welcher Teil des Ganzen ist gefärbt?",
        aufgabe: L(B(z, n), "ende"),
        bild,
        merke: `<b>Merke</b>Der <b class="blau">Nenner</b> (unten) sagt, in wie viele <u>gleich große</u> Teile das Ganze geteilt ist. Der <b class="blau">Zähler</b> (oben) sagt, wie viele Teile man nimmt. Der Bruchstrich heißt „geteilt durch“: ${B(3, 4)} = 3 : 4.`,
        regler: stepper("Zähler", "z", z) + stepper("Nenner", "n", n) + wahl("form", [["kreis", "Kreis"], ["streifen", "Streifen"], ["beide", "beides"]], form),
        schritte: [
            ["In wie viele gleich große Teile ist das Ganze geteilt?", `${n} Teile <small>→ der Nenner ist ${n}</small>`],
            ["Wie viele Teile sind gefärbt?", `${z} Teile <small>→ der Zähler ist ${z}</small>`],
            ["Wie heißt der Bruch, und wie liest man ihn?", `${B(z, n)} <small>„${gelesen(z, n)}“</small>`],
            ["Wie viel fehlt noch bis zum Ganzen?", z === n ? `nichts <small>– ${B(n, n)} sind genau 1 Ganzes</small>` : `${B(n - z, n)} <small>denn ${B(z, n)} + ${B(n - z, n)} = ${B(n, n)} = 1</small>`]
        ]
    };
};
K.bruch.st = (k, d) => { const b = S.bruch; if (k === "n"){ b.n = begrenze(b.n + d, 2, 12); b.z = Math.min(b.z, b.n); } else b.z = begrenze(b.z + d, 0, b.n); };
K.bruch.neu = () => { const n = zuf(2, 12); S.bruch.n = n; S.bruch.z = zuf(1, n - 1); };

/* 2 · Gemischte Zahlen */
K.gem = () => {
    const { z, n, r } = S.gem, g = Math.floor(z / n), rest = z % n, NN = nName(n);
    const c = Math.max(1, Math.ceil(z / n));
    const rad = Math.min(105, (620 / c - 18) / 2), schritt = 640 / c;
    let kreise = "";
    for (let i = 0; i < c; i++) kreise += torte(f1(schritt * (i + .5)), 140, f1(rad), n, Math.min(n, z - i * n));
    const bild = svg(640, 280, kreise);
    const u2g = r === "u2g";
    return {
        frage: u2g ? "Schreibe als gemischte Zahl." : "Schreibe als unechten Bruch.",
        aufgabe: u2g ? `${B(z, n)} ${OP("=")} ${L(B(z, n, { gem: 1 }), "ende")}` : `${B(z, n, { gem: 1 })} ${OP("=")} ${L(B(z, n), "ende")}`,
        bild,
        merke: `<b>Merke</b><b>Echter Bruch:</b> Zähler kleiner als Nenner, z. B. ${B(3, 4)} – weniger als 1 Ganzes.<br><b>Unechter Bruch:</b> Zähler gleich groß oder größer, z. B. ${B(7, 4)}.<br><b>Gemischte Zahl:</b> Ganze und ein Bruch, z. B. ${B(7, 4, { gem: 1 })} = 1 + ${B(3, 4)}.`,
        regler: wahl("r", [["u2g", "unecht → gemischt"], ["g2u", "gemischt → unecht"]], r) + (u2g
            ? stepper("Zähler", "z", z) + stepper("Nenner", "n", n)
            : stepper("Ganze", "g", g) + stepper("Zähler", "rest", rest) + stepper("Nenner", "n", n)),
        schritte: u2g ? [
            [`Wie viele Ganze sind voll? Rechne: oben : unten.`, `${z} : ${n} = ${g} Rest ${rest} <small>→ ${g} ${g === 1 ? "Ganzes" : "Ganze"}</small>`],
            ["Wie viele Teile bleiben übrig?", rest ? `${rest} ${rest === 1 && n === 2 ? "Halbes" : NN} <small>→ ${B(rest, n)}</small>` : `keine <small>– es geht genau auf</small>`],
            ["Als gemischte Zahl:", `${B(z, n)} = ${B(z, n, { gem: 1 })}`]
        ] : [
            [`Wie viele ${NN} sind ${g} ${g === 1 ? "Ganzes" : "Ganze"}? Rechne: Ganze · unten.`, `${g} · ${n} = ${g * n} <small>→ ${B(g * n, n)}</small>`],
            [`Dazu kommen noch ${B(rest, n)}.`, `${g * n} + ${rest} = ${z}`],
            ["Als unechter Bruch:", `${B(z, n, { gem: 1 })} = ${B(z, n)}`]
        ]
    };
};
K.gem.st = (k, d) => {
    const s = S.gem; let g = Math.floor(s.z / s.n), rest = s.z % s.n;
    if (k === "n"){ s.n = begrenze(s.n + d, 2, 10); if (s.r === "g2u"){ rest = Math.min(Math.max(rest, 1), s.n - 1); s.z = g * s.n + rest; } else s.z = begrenze(s.z, s.n + 1, 5 * s.n); }
    else if (k === "z") s.z = begrenze(s.z + d, s.n + 1, 5 * s.n);
    else if (k === "g") s.z = begrenze(g + d, 1, 4) * s.n + rest;
    else if (k === "rest") s.z = g * s.n + begrenze(rest + d, 1, s.n - 1);
};
K.gem.set = () => { const s = S.gem; if (s.r === "g2u" && s.z % s.n === 0) s.z += 1; };
K.gem.neu = () => { const n = zuf(2, 8); S.gem.n = n; S.gem.z = zuf(1, 4) * n + zuf(1, n - 1); };

/* 3 · Erweitern & Kürzen */
K.erw = () => {
    const { z, n, k, m } = S.erw, zk = z * k, nk = n * k;
    const erw = m === "erw";
    const g = ggt(zk, nk), zr = zk / g, nr = nk / g;
    const oben = erw ? [z, n] : [zk, nk], unten = erw ? [zk, nk] : [zr, nr];
    const xs = 130 + 480 * z / n;
    const bild = svg(640, 330,
        svgB(62, 84, oben[0], oben[1], 30) +
        balken(130, 40, 480, 90, oben[1], i => i < oben[0] ? "fa" : "f0", erw ? 0 : nr === oben[1] ? 0 : oben[1] / nr) +
        `<text x="62" y="180" text-anchor="middle" font-size="26" font-weight="900" class="txr">${erw ? "· " + k : ": " + g}</text><text x="62" y="208" text-anchor="middle" font-size="26" font-weight="900" class="txr">↓</text>` +
        balken(130, 210, 480, 90, unten[1], i => i < unten[0] ? "fa" : "f0", erw ? k : 0) +
        `<line x1="${f1(xs)}" y1="24" x2="${f1(xs)}" y2="318" class="lr" stroke-width="3" stroke-dasharray="8 7"/>`);
    return erw ? {
        frage: `Erweitere mit ${k}.`,
        aufgabe: `${B(z, n)} ${OP("=")} ${L(B(zk, nk), "ende")}`,
        bild,
        merke: `<b>Merke</b><b>Erweitern:</b> oben und unten mit derselben Zahl <u>mal</u> nehmen.<br><b>Kürzen:</b> oben und unten durch dieselbe Zahl <u>teilen</u>.<br>Der Bruch bleibt genauso groß – die Stücke werden nur kleiner oder größer.`,
        regler: wahl("m", [["erw", "Erweitern"], ["kuerz", "Kürzen"]], m) + stepper("Zähler", "z", z) + stepper("Nenner", "n", n) + stepper("mit", "k", k),
        schritte: [
            ["Oben und unten mit derselben Zahl malnehmen:", `${B(`${z} · ${k}`, `${n} · ${k}`)} = ${B(zk, nk)}`],
            ["Was passiert mit den Teilen im Bild?", `<small>Jedes Teil wird in ${k} kleinere Teile geschnitten: ${k}-mal so viele Teile, jedes ${k}-mal so klein.</small>`],
            ["Ist der Bruch dadurch größer geworden?", `Nein: ${B(z, n)} = ${B(zk, nk)} <small>– die gefärbte Fläche bleibt gleich groß.</small>`]
        ]
    } : {
        frage: "Kürze so weit wie möglich.",
        aufgabe: `${B(zk, nk)} ${OP("=")} ${L(B(zr, nr), "ende")}`,
        bild,
        merke: `<b>Merke</b><b>Kürzen:</b> oben und unten durch dieselbe Zahl <u>teilen</u>. Nimm die <u>größte</u> Zahl, die bei beiden passt – dann bist du sofort fertig.<br>Der Bruch bleibt genauso groß – die Stücke werden nur größer.`,
        regler: wahl("m", [["erw", "Erweitern"], ["kuerz", "Kürzen"]], m) + stepper("Zähler", "z", z) + stepper("Nenner", "n", n) + stepper("mal", "k", k),
        schritte: [
            [`Durch welche Zahl sind ${zk} und ${nk} beide teilbar? Such die größte.`, g > 1 ? `${g} <small>(${zk} = ${g} · ${zr} und ${nk} = ${g} · ${nr})</small>` : `<small>Durch keine – ${B(zk, nk)} kann man nicht kürzen.</small>`],
            [`Oben und unten durch diese Zahl teilen:`, g > 1 ? `${B(`${zk} : ${g}`, `${nk} : ${g}`)} = ${B(zr, nr)}` : B(zk, nk)],
            ["Kann man noch weiter kürzen?", `Nein <small>– ${zr} und ${nr} haben keinen gemeinsamen Teiler mehr.</small>`]
        ]
    };
};
K.erw.st = (k, d) => {
    const s = S.erw;
    if (k === "n"){ s.n = begrenze(s.n + d, 2, 12); s.z = Math.min(s.z, s.n - 1); }
    else if (k === "z") s.z = begrenze(s.z + d, 1, s.n - 1);
    else s.k = begrenze(s.k + d, 2, 6);
    while (s.n * s.k > 60 && s.k > 2) s.k--;
};
K.erw.neu = () => {
    const s = S.erw;
    do { s.n = zuf(2, 10); s.z = zuf(1, s.n - 1); } while (ggt(s.z, s.n) > 1);
    s.k = zuf(2, s.n <= 5 ? 5 : 4);
};

/* 4 · Vergleichen */
K.ver = () => {
    const { z1, n1, z2, n2 } = S.ver;
    const l = z1 * n2, r = z2 * n1, sym = l < r ? "&lt;" : l > r ? "&gt;" : "=";
    const H = kgv(n1, n2), A = z1 * H / n1, Bz = z2 * H / n2;
    const groesser = l > r ? B(z1, n1) : B(z2, n2);
    const x0 = 120, w = 480;
    const xa = x0 + w * z1 / n1, xb = x0 + w * z2 / n2;
    const bild = svg(640, 360,
        svgB(58, 70, z1, n1, 30, "txa") + balken(x0, 28, w, 74, n1, i => i < z1 ? "fa" : "f0") +
        svgB(58, 172, z2, n2, 30, "txb") + balken(x0, 130, w, 74, n2, i => i < z2 ? "fb" : "f0") +
        `<line x1="${f1(xa)}" y1="102" x2="${f1(xa)}" y2="282" class="la" stroke-width="3" stroke-dasharray="7 6"/>` +
        `<line x1="${f1(xb)}" y1="204" x2="${f1(xb)}" y2="282" class="lb" stroke-width="3" stroke-dasharray="7 6"/>` +
        `<line x1="${x0 - 10}" y1="282" x2="${x0 + w + 16}" y2="282" class="st" stroke-width="4"/>` +
        `<line x1="${x0}" y1="270" x2="${x0}" y2="294" class="st" stroke-width="4"/><line x1="${x0 + w}" y1="270" x2="${x0 + w}" y2="294" class="st" stroke-width="4"/>` +
        `<circle cx="${f1(xa)}" cy="282" r="10" class="fa"/><circle cx="${f1(xb)}" cy="282" r="10" class="fb"/>` +
        strahlZahlen(x0, 330, w, 1, 28));
    const vielfache = n => { const v = []; for (let i = n; i <= H; i += n) v.push(i === H ? `<b>${i}</b>` : i); return v.join(", "); };
    let schritte;
    if (n1 === n2) schritte = [
        ["Haben beide Brüche denselben Nenner?", `Ja <small>– die Teile sind gleich groß. Dann vergleicht man nur die Zähler.</small>`],
        ["Zähler vergleichen:", `${z1} ${sym} ${z2}`],
        ["Also:", `${B(z1, n1)} ${sym} ${B(z2, n2)}`]
    ];
    else if (z1 === z2) schritte = [
        ["Haben beide Brüche denselben Zähler?", `Ja <small>– man hat gleich viele Teile. Dann gewinnt der Bruch mit den <u>größeren</u> Teilen, also dem <u>kleineren</u> Nenner.</small>`],
        ["Welcher Bruch hat den kleineren Nenner?", `${groesser} <small>– Nenner ${Math.min(n1, n2)}</small>`],
        ["Also:", `${B(z1, n1)} ${sym} ${B(z2, n2)}`]
    ];
    else schritte = [
        ["Gleiche Nenner? Nein. Also gemeinsamen Nenner suchen: die kleinste Zahl, die in beiden Einmaleins-Reihen vorkommt.", `<small>${n1}er: ${vielfache(n1)}<br>${n2}er: ${vielfache(n2)}</small><br>Gemeinsamer Nenner: ${H}`],
        ["Beide Brüche erweitern, bis unten diese Zahl steht:", `${B(z1, n1)} = ${B(A, H)} <small>und</small> ${B(z2, n2)} = ${B(Bz, H)}`],
        ["Jetzt die Zähler vergleichen:", `${A} ${sym} ${Bz}`],
        ["Also:", `${B(z1, n1)} ${sym} ${B(z2, n2)}`]
    ];
    return {
        frage: "Setze ein: &lt;, &gt; oder =",
        aufgabe: `<span class="blau">${B(z1, n1)}</span> ${L(sym, "ende")} <span class="orange">${B(z2, n2)}</span>`,
        bild,
        merke: `<b>Merke</b><b>Gleiche Nenner:</b> Der größere Zähler gewinnt.<br><b>Gleiche Zähler:</b> Der kleinere Nenner gewinnt (größere Teile).<br><b>Sonst:</b> erst auf einen gemeinsamen Nenner erweitern, dann die Zähler vergleichen.`,
        regler: `<span class="blau" style="font-weight:900">1. Bruch</span>` + stepper("Zähler", "z1", z1) + stepper("Nenner", "n1", n1) + `<span class="orange" style="font-weight:900">2. Bruch</span>` + stepper("Zähler", "z2", z2) + stepper("Nenner", "n2", n2),
        schritte
    };
};
K.ver.st = (k, d) => {
    const s = S.ver;
    if (k === "n1"){ s.n1 = begrenze(s.n1 + d, 2, 12); s.z1 = Math.min(s.z1, s.n1); }
    else if (k === "n2"){ s.n2 = begrenze(s.n2 + d, 2, 12); s.z2 = Math.min(s.z2, s.n2); }
    else if (k === "z1") s.z1 = begrenze(s.z1 + d, 1, s.n1);
    else s.z2 = begrenze(s.z2 + d, 1, s.n2);
};
K.ver.neu = () => {
    const s = S.ver, art = Math.random();
    for (let t = 0; t < 100; t++){
        if (art < .2){ const n = zuf(3, 12); s.n1 = s.n2 = n; s.z1 = zuf(1, n - 1); s.z2 = zuf(1, n - 1); }
        else if (art < .35){ s.n1 = zuf(3, 12); s.n2 = zuf(3, 12); s.z1 = s.z2 = zuf(1, Math.min(s.n1, s.n2) - 1); }
        else { s.n1 = zuf(2, 12); s.n2 = zuf(2, 12); s.z1 = zuf(1, s.n1 - 1); s.z2 = zuf(1, s.n2 - 1); if (kgv(s.n1, s.n2) > 36 || ggt(s.z1, s.n1) > 1 || ggt(s.z2, s.n2) > 1) continue; }
        if (s.z1 * s.n2 !== s.z2 * s.n1 && !(s.n1 === s.n2 && s.z1 === s.z2)) return;
    }
};

/* 5 · Zahlenstrahl */
K.zs = () => {
    const { n, L: G, p, alle } = S.zs, T = G * n, x0 = 40, w = 560, y = 160;
    let s = `<line x1="${x0 - 14}" y1="${y}" x2="${x0 + w + 26}" y2="${y}" class="st" stroke-width="4"/><path d="M${x0 + w + 34} ${y} l-16 -9 v18z" class="tx"/>`;
    for (let i = 0; i <= T; i++){
        const x = f1(x0 + w * i / T), ganz = i % n === 0;
        s += `<line x1="${x}" y1="${y - (ganz ? 16 : 10)}" x2="${x}" y2="${y + (ganz ? 16 : 10)}" class="st" stroke-width="${ganz ? 4 : 2.5}"/>`;
        if (alle && !ganz && i !== p) s += svgB(x, y - 44, i, n, T > 24 ? 13 : 18, "txg");
    }
    const xp = f1(x0 + w * p / T);
    s += `<line x1="${xp}" y1="${y - 8}" x2="${xp}" y2="56" class="lr" stroke-width="3.5"/><circle cx="${xp}" cy="${y}" r="10" fill="#d1342b"/><text x="${xp}" y="44" text-anchor="middle" font-size="34" font-weight="900" class="txr">?</text>`;
    s += strahlZahlen(x0, y + 50, w, G, 30);
    const g = ggt(p, n), schritte = [
        ["In wie viele gleich große Abschnitte ist ein Ganzes (von 0 bis 1) geteilt?", `${n} Abschnitte <small>→ ${nName(n)}</small>`],
        ["Wie viele Abschnitte sind es von 0 bis zum Punkt?", `${p} Abschnitte <small>→</small> ${B(p, n)}`]
    ];
    if (p > n && p % n) schritte.push(["Als gemischte Zahl:", `${B(p, n)} = ${B(p, n, { gem: 1 })}`]);
    if (g > 1) schritte.push(["Kann man den Bruch kürzen?", `${B(p, n)} = ${B(p / g, n / g, { gem: p / g > n / g })}`]);
    return {
        frage: "Welche Zahl gehört an den roten Punkt?",
        aufgabe: L(p > n && p % n ? `${B(p, n)} = ${B(p, n, { gem: 1 })}` : B(p, n), "ende"),
        bild: svg(640, 230, s),
        merke: `<b>Merke</b>Von 0 bis 1 ist <u>ein Ganzes</u>. Zähle, in wie viele gleiche Abschnitte ein Ganzes geteilt ist – das ist der <b class="blau">Nenner</b>. Dann zähle die Abschnitte von 0 bis zum Punkt – das ist der <b class="blau">Zähler</b>.`,
        regler: stepper("Nenner", "n", n) + stepper("Ganze", "G", G) + stepper("Punkt", "p", "◀▶") + wahl("alle", [["0", "ohne Beschriftung"], ["1", "alle beschriften"]], alle ? 1 : 0),
        schritte
    };
};
K.zs.st = (k, d) => {
    const s = S.zs;
    if (k === "n"){ const v = s.p / s.n; s.n = begrenze(s.n + d, 2, 12); s.p = begrenze(Math.round(v * s.n), 1, s.L * s.n - 1); }
    else if (k === "G"){ s.L = begrenze(s.L + d, 1, 4); s.p = Math.min(s.p, s.L * s.n - 1); }
    else s.p = begrenze(s.p + d, 1, s.L * s.n - 1);
};
K.zs.set = () => { S.zs.alle = S.zs.alle === "1" || S.zs.alle === true; };
K.zs.neu = () => {
    const s = S.zs; s.n = nimm([2, 3, 4, 5, 6, 8, 10]); s.L = zuf(1, 3);
    do { s.p = zuf(1, s.L * s.n - 1); } while (s.p % s.n === 0);
};

/* ---------- Rechnen mit Rechenweg (Plus/Minus, Mal/Geteilt) ---------- */
function rechenweg(a, op, b){
    const sch = [];
    const umw = [];
    [a, b].forEach(f => {
        if (f.gem && f.n > 1 && f.z >= f.n) umw.push(`${B(f.z, f.n, { gem: 1 })} = ${B(f.z, f.n)}`);
    });
    if (umw.length) sch.push(["Gemischte Zahl zuerst umwandeln. Rechne: Ganze · Nenner + Zähler.", umw.join(" <small>und</small> ")]);
    let P, Q;
    if (op === "+" || op === "−"){
        if (a.n === 1 && b.n === 1){ P = op === "+" ? a.z + b.z : a.z - b.z; Q = 1; }
        else {
            const H = kgv(a.n, b.n), A = a.z * H / a.n, Bz = b.z * H / b.n;
            if (a.n !== b.n){
                sch.push(["Die Nenner sind verschieden. Sie müssen gleich werden! Suche die kleinste Zahl, die in beiden Einmaleins-Reihen vorkommt.", `Gemeinsamer Nenner: ${H} <small>(${a.n}er- und ${b.n}er-Reihe)</small>`]);
                sch.push(["Beide Brüche erweitern, bis unten diese Zahl steht:", `${B(a.z, a.n)} = ${B(A, H)} <small>und</small> ${B(b.z, b.n)} = ${B(Bz, H)}`]);
            }
            P = op === "+" ? A + Bz : A - Bz; Q = H;
            sch.push([op === "+" ? "Jetzt nur die oberen Zahlen plus rechnen. Die untere Zahl bleibt gleich!" : "Jetzt nur die oberen Zahlen minus rechnen. Die untere Zahl bleibt gleich!", `${B(`${A} ${op} ${Bz}`, H)} = ${B(P, H)}`]);
        }
    } else {
        let c = b;
        if (a.n === 1 || b.n === 1){
            const nat = [a, b].filter(f => f.n === 1).map(f => `${f.z} = ${B(f.z, "1")}`);
            sch.push(["Natürliche Zahl als Bruch schreiben:", nat.join(" <small>und</small> ")]);
        }
        if (op === ":"){
            c = { z: b.n, n: b.z };
            sch.push(["Trick: Den zweiten Bruch <u>umdrehen</u> (oben und unten tauschen) – und aus : wird ·", `${B(a.z, a.n === 1 ? "1" : a.n)} : ${B(b.z, b.n === 1 ? "1" : b.n)} = ${B(a.z, a.n === 1 ? "1" : a.n)} · ${B(c.z, c.n === 1 ? "1" : c.n)}`]);
        }
        P = a.z * c.z; Q = a.n * c.n;
        sch.push(["Oben mal oben, unten mal unten:", `${B(`${a.z} · ${c.z}`, `${a.n} · ${c.n}`)} = ${B(P, Q === 1 ? "1" : Q)}`]);
    }
    const g = ggt(P, Q);
    if (g > 1 && P !== 0) sch.push([`Kürzen: oben und unten durch ${g} teilen:`, `${B(P, Q)} = ${B(P / g, Q / g === 1 ? "1" : Q / g)}${Q / g === 1 ? ` = ${P / g}` : ""}`]);
    const pz = P / g, qz = Q / g;
    if (qz > 1 && pz > qz) sch.push(["Oben ist größer als unten → in eine gemischte Zahl umwandeln:", `${B(pz, qz)} = ${B(pz, qz, { gem: 1 })} <small>(${pz} : ${qz} = ${Math.floor(pz / qz)} Rest ${pz % qz})</small>`]);
    return { sch, erg: P === 0 ? "0" : B(pz, qz, { gem: 1 }), P, Q, pz, qz };
}
const istGroesser = (a, b) => a.z * b.n > b.z * a.n;

/* Bild: Balkenmodell für Plus/Minus */
function bildPM(a, op, b){
    const H = kgv(a.n, b.n), A = a.z * H / a.n, Bz = b.z * H / b.n;
    const T = op === "+" ? A + Bz : A, W = Math.max(1, Math.ceil(T / H));
    if (W * H > 150) return null;
    const x = 30, w = 580;
    const farbe = op === "+" ? (i => i < A ? "fa" : i < A + Bz ? "fb" : "f0") : (i => i < A - Bz ? "fa" : i < A ? "fr" : "f0");
    const leg = op === "+"
        ? `<rect x="30" y="16" width="22" height="22" class="fa"/><text x="60" y="34" font-size="20" font-weight="800" class="tx">1. Zahl</text><rect x="160" y="16" width="22" height="22" class="fb"/><text x="190" y="34" font-size="20" font-weight="800" class="tx">2. Zahl</text>`
        : `<rect x="30" y="16" width="22" height="22" class="fa"/><text x="60" y="34" font-size="20" font-weight="800" class="tx">bleibt übrig</text><rect x="210" y="16" width="22" height="22" class="fr"/><text x="240" y="34" font-size="20" font-weight="800" class="tx">wird weggenommen</text>`;
    return svg(640, 220, leg + balken(x, 60, w, 96, W * H, farbe, H) + strahlZahlen(x, 196, w, W, 24) +
        `<text x="${x + w}" y="34" text-anchor="end" font-size="18" font-weight="800" class="txg">1 Ganzes = ${H} Teile</text>`);
}
/* Bild: Flächenmodell für Mal */
function bildMal(a, b){
    const W = Math.max(1, Math.ceil(a.z / a.n)), Hh = Math.max(1, Math.ceil(b.z / b.n));
    const sp = W * a.n, ze = Hh * b.n;
    if (sp > 40 || ze > 40 || sp * ze > 900) return null;
    const u = Math.min(440 / W, 300 / Hh), x0 = f1((640 - W * u) / 2 + 20), y0 = 20, cw = u / a.n, ch = u / b.n;
    let s = "";
    for (let c = 0; c < sp; c++) for (let r = 0; r < ze; r++){
        const inA = c < a.z, inB = r < b.z;
        s += `<rect x="${f1(x0 + c * cw)}" y="${f1(y0 + r * ch)}" width="${f1(cw)}" height="${f1(ch)}" class="${inA && inB ? "fab" : inA ? "fa2" : inB ? "fb2" : "f0"} st" stroke-width="1.2"/>`;
    }
    for (let i = 0; i <= W; i++) s += `<line x1="${f1(x0 + i * u)}" y1="${y0}" x2="${f1(x0 + i * u)}" y2="${f1(y0 + Hh * u)}" class="st" stroke-width="4"/>`;
    for (let i = 0; i <= Hh; i++) s += `<line x1="${x0}" y1="${f1(y0 + i * u)}" x2="${f1(x0 + W * u)}" y2="${f1(y0 + i * u)}" class="st" stroke-width="4"/>`;
    const ax = x0 + a.z * cw, by = y0 + b.z * ch;
    s += `<line x1="${x0}" y1="${f1(y0 + Hh * u + 14)}" x2="${f1(ax)}" y2="${f1(y0 + Hh * u + 14)}" class="la" stroke-width="5" stroke-linecap="round"/>`;
    s += svgGem(f1((x0 + ax) / 2), f1(y0 + Hh * u + 48), a.z, a.n, 24, "txa");
    s += `<line x1="${f1(x0 - 14)}" y1="${y0}" x2="${f1(x0 - 14)}" y2="${f1(by)}" class="lb" stroke-width="5" stroke-linecap="round"/>`;
    s += svgGem(f1(x0 - 56), f1((y0 + by) / 2), b.z, b.n, 24, "txb");
    return svg(640, f1(y0 + Hh * u + 92), s);
}
/* Bild: Wie oft passt b in a? (Geteilt) */
function bildDurch(a, b){
    const H = kgv(a.n, b.n), A = a.z * H / a.n, Bz = b.z * H / b.n;
    const W = Math.max(1, Math.ceil(Math.max(A, Bz) / H));
    if (W * H > 150 || A / Bz > 24) return null;
    const x = 30, w = 580, tw = w / (W * H);
    let s = balken(x, 130, w, 80, W * H, i => i < A ? "fa" : "f0", H);
    let k = 0;
    for (let st = 0; st < A && k < 30; st += Bz, k++){
        const ende = st + Bz, voll = ende <= A;
        const x1 = x + st * tw, x2 = x + ende * tw;
        s += `<rect x="${f1(x1 + 2)}" y="58" width="${f1(x2 - x1 - 4)}" height="52" rx="10" class="${voll ? (k % 2 ? "fb" : "fb2") : "f0"} ${voll ? "" : "lb"}" ${voll ? "" : `fill="none" stroke-width="3" stroke-dasharray="8 6"`}/>`;
        if (!voll) s += `<rect x="${f1(x1 + 2)}" y="58" width="${f1((A - st) * tw - 4)}" height="52" rx="10" class="fb2"/>`;
        s += `<text x="${f1(voll ? (x1 + x2) / 2 : x1 + Math.max(16, (A - st) * tw / 2))}" y="93" text-anchor="middle" font-size="${tw * Bz < 34 ? 16 : 24}" font-weight="900" class="tx">${voll ? k + 1 : "Rest"}</text>`;
    }
    s += strahlZahlen(x, 248, w, W, 24);
    s += `<text x="30" y="34" font-size="20" font-weight="800" class="tx">Wie oft passt die 2. Zahl (orange) in die 1. Zahl (blau)?</text>`;
    return svg(640, 262, s);
}

function eingabeLesen(txt){
    const t = txt.replace(/[−–]/g, "-").replace(/[×*xX]/g, "·").replace(/÷/g, ":").replace(/,/g, ".").trim();
    const m = t.match(/^(.+?)\s*([+\-·:])\s*(.+)$/);
    if (!m) return null;
    const zahl = s => {
        s = s.trim();
        let r = s.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
        if (r){ const g = +r[1], z = +r[2], n = +r[3]; if (!n || z >= n) return null; return { z: g * n + z, n, gem: true }; }
        r = s.match(/^(\d+)\s*\/\s*(\d+)$/);
        if (r){ const z = +r[1], n = +r[2]; if (!n) return null; return { z, n }; }
        r = s.match(/^(\d+)$/);
        if (r) return { z: +r[1], n: 1 };
        return null;
    };
    const a = zahl(m[1]), b = zahl(m[3]);
    if (!a || !b) return null;
    const op = m[2] === "-" ? "−" : m[2];
    if (a.n > 60 || b.n > 60 || a.z > 999 || b.z > 999) return null;
    return { a, b, op };
}

/* 6 · Plus & Minus */
K.pm = () => {
    const { a, b, op } = S.pm;
    const rw = rechenweg(a, op, b);
    const neg = op === "−" && istGroesser(b, a);
    const bild = neg ? null : bildPM(a, op, b);
    return {
        frage: op === "+" ? "Addiere." : "Subtrahiere.",
        aufgabe: `${BF(a)} ${OP(op)} ${BF(b)} ${OP("=")} ${neg ? `<small class="rot" style="font-size:.4em">nicht lösbar (Ergebnis wäre kleiner als 0)</small>` : L(rw.erg, "ende")}`,
        bild,
        merke: `<b>Merke</b>Plus und Minus geht nur, wenn <u>unten die gleiche Zahl</u> steht. Dann rechnet man nur oben – unten bleibt gleich.<br>Unten verschieden? → Erst erweitern, bis unten gleich ist.<br>Gemischte Zahl? → Erst umwandeln. Am Ende kürzen.`,
        regler: wahl("op", [["+", "Plus +"], ["−", "Minus −"]], op) + wahl("modus", [["gleich", "gleiche Nenner"], ["versch", "verschiedene Nenner"], ["gem", "gemischte Zahlen"]], S.pm.modus) + eingabe("2 3/4 + 1 5/6"),
        schritte: neg ? [] : rw.sch
    };
};
K.pm.set = (key) => { if (key === "modus" || key === "op") K.pm.neu(); };
K.pm.neu = () => {
    const s = S.pm, NEN = [2, 3, 4, 5, 6, 8, 10, 12];
    for (let t = 0; t < 300; t++){
        let a, b;
        if (s.modus === "gleich"){ const n = zuf(3, 12); a = { z: zuf(1, n - 1), n }; b = { z: zuf(1, n - 1), n }; }
        else if (s.modus === "versch"){
            const n1 = nimm(NEN), n2 = nimm(NEN);
            if (n1 === n2 || kgv(n1, n2) > 24) continue;
            a = { z: zuf(1, n1 - 1), n: n1 }; b = { z: zuf(1, n2 - 1), n: n2 };
            if (ggt(a.z, a.n) > 1 || ggt(b.z, b.n) > 1) continue;
        } else {
            const n1 = nimm([2, 3, 4, 5, 6, 8]), n2 = nimm([2, 3, 4, 5, 6, 8]);
            if (kgv(n1, n2) > 24) continue;
            const r1 = zuf(1, n1 - 1), r2 = zuf(1, n2 - 1);
            if (ggt(r1, n1) > 1 || ggt(r2, n2) > 1) continue;
            a = { z: zuf(1, 3) * n1 + r1, n: n1, gem: true }; b = { z: zuf(1, 2) * n2 + r2, n: n2, gem: true };
        }
        if (s.op === "−"){
            if (a.z * b.n === b.z * a.n) continue;
            if (istGroesser(b, a)) [a, b] = [b, a];
        }
        s.a = a; s.b = b; return;
    }
};

/* 7 · Mal & Geteilt */
K.md = () => {
    const { a, b, op } = S.md;
    const null0 = op === ":" && b.z === 0;
    const rw = null0 ? null : rechenweg(a, op, b);
    const bild = null0 ? null : op === "·" ? bildMal(a, b) : bildDurch(a, b);
    return {
        frage: op === "·" ? "Multipliziere." : "Dividiere.",
        aufgabe: `${BF(a)} ${OP(op)} ${BF(b)} ${OP("=")} ${null0 ? `<small class="rot" style="font-size:.4em">durch 0 kann man nicht teilen</small>` : L(rw.erg, "ende")}`,
        bild,
        merke: op === "·"
            ? `<b>Merke</b><b>Mal:</b> oben mal oben, unten mal unten. Fertig! Gleiche Nenner braucht man hier <u>nicht</u>.<br>Gemischte Zahl? → Erst umwandeln. Am Ende kürzen.<br><small>Im Bild: Die lila Fläche ist das Ergebnis.</small>`
            : `<b>Merke</b><b>Geteilt:</b> Den zweiten Bruch umdrehen und mal rechnen.<br>Eselsbrücke: <i>„Teilen durch einen Bruch? Dreh ihn um und nimm ihn mal!“</i><br>Gemischte Zahl? → Erst umwandeln. Am Ende kürzen.`,
        regler: wahl("op", [["·", "Mal ·"], [":", "Geteilt :"]], op) + wahl("modus", [["bruch", "Bruch und Bruch"], ["nat", "mit natürlicher Zahl"], ["gem", "gemischte Zahlen"]], S.md.modus) + eingabe(op === "·" ? "2/3 · 3/4" : "3/4 : 1/2"),
        schritte: null0 ? [] : rw.sch
    };
};
K.md.set = (key) => { if (key === "modus" || key === "op") K.md.neu(); };
K.md.neu = () => {
    const s = S.md;
    for (let t = 0; t < 300; t++){
        let a, b;
        const echt = () => { const n = zuf(2, 9); let z; do { z = zuf(1, n - 1); } while (ggt(z, n) > 1); return { z, n }; };
        if (s.modus === "bruch"){ a = echt(); b = echt(); }
        else if (s.modus === "nat"){ const f = echt(), k = zuf(2, 6); if (s.op === "·"){ if (Math.random() < .5){ a = { z: k, n: 1 }; b = f; } else { a = f; b = { z: k, n: 1 }; } } else { if (Math.random() < .5){ a = { z: k, n: 1 }; b = f; } else { a = f; b = { z: k, n: 1 }; } } }
        else { const n1 = zuf(2, 5), n2 = zuf(2, 5); const r1 = zuf(1, n1 - 1); if (ggt(r1, n1) > 1) continue; a = { z: zuf(1, 2) * n1 + r1, n: n1, gem: true }; if (Math.random() < .5){ const r2 = zuf(1, n2 - 1); if (ggt(r2, n2) > 1) continue; b = { z: zuf(1, 2) * n2 + r2, n: n2, gem: true }; } else b = echt(); }
        if (s.op === ":" && s.modus === "bruch" && a.z * b.n < b.z * a.n && Math.random() < .6) [a, b] = [b, a];
        const rw = rechenweg(a, s.op, b);
        if (rw.P > 300 || rw.Q > 300) continue;
        s.a = a; s.b = b; return;
    }
};

/* ===============================================================
   Aufbau & Darstellung
   =============================================================== */
function aufbauen(){
    if (el) return;
    const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    el = document.createElement("div");
    el.id = "br";
    el.innerHTML = `
        <div class="br-leiste">
            <button class="tb-k rund" data-a="zu" title="Zurück zur Übersicht"><i class="fa-solid fa-arrow-left"></i></button>
            <span class="br-titel">Brüche <small>Klasse 5/6</small></span>
            <span class="tb-luft" style="flex:1"></span>
            <button class="tb-k" data-a="bild" id="brBildK" title="Bild ein- oder ausblenden – z. B. erst rechnen, dann das Bild zeigen"><i class="fa-solid fa-image"></i><span class="br-txt"> Bild</span></button>
            <button class="tb-k rund" data-a="menue" title="Einstellungen"><i class="fa-solid fa-sliders"></i></button>
            <button class="tb-k rund" data-a="voll" title="Vollbild"><i class="fa-solid fa-expand"></i></button>
        </div>
        <div class="br-tabs" id="brTabs">${KAPITEL.map(([k, t], i) => `<button class="br-tab" data-kap="${k}">${i + 1} · ${t}</button>`).join("")}</div>
        <div class="br-menue" id="brMenue">
            <h4>Hintergrund</h4>
            <div class="reihe"><button data-hg="hell">hell</button><button data-hg="kreide">Kreidetafel</button></div>
        </div>
        <div class="br-haupt">
            <div class="br-buehne"><div class="br-frage" id="brFrage"></div><div class="br-aufgabe" id="brAufgabe"></div><div class="br-bild" id="brBild"></div></div>
            <div class="br-panel" id="brPanel"></div>
        </div>`;
    document.body.appendChild(el);
    el.addEventListener("click", klick);
    el.addEventListener("submit", e => {
        e.preventDefault();
        const inp = e.target.querySelector("input"), r = eingabeLesen(inp.value || "");
        if (!r){ S.fehler = "Das habe ich nicht verstanden. Schreibe z. B. 2 3/4 + 1 5/6 oder 3/4 : 1/2 (gemischte Zahl mit Leerzeichen)."; return zeichnen(); }
        S.fehler = "";
        if (r.op === "+" || r.op === "−"){ S.kap = "pm"; Object.assign(S.pm, r); }
        else { S.kap = "md"; Object.assign(S.md, r); }
        merken(); zeichnen();
    });
}

function zeichnen(){
    el.classList.toggle("kreide", S.hg === "kreide");
    el.querySelectorAll("[data-kap]").forEach(b => b.classList.toggle("an", b.dataset.kap === S.kap));
    el.querySelectorAll("[data-hg]").forEach(b => b.classList.toggle("an", b.dataset.hg === S.hg));
    el.querySelector("#brBildK").classList.toggle("an", !S.bild);
    const d = K[S.kap]();
    el.querySelector("#brFrage").innerHTML = d.frage;
    el.querySelector("#brAufgabe").innerHTML = d.aufgabe;
    el.querySelector("#brBild").innerHTML = !S.bild
        ? `<div class="br-ohne"><i class="fa-solid fa-eye-slash"></i> Bild ausgeblendet – oben auf „Bild“ tippen</div>`
        : d.bild || `<div class="br-ohne">Für diese Aufgabe gibt es kein Bild – die Zahlen sind zu groß zum Zeichnen.</div>`;
    el.querySelector("#brPanel").innerHTML = `
        <div class="br-merke">${d.merke}</div>
        <div class="br-regler">${d.regler}</div>
        ${d.schritte.length ? `<div class="br-h">Rechenweg</div>
        <div class="br-schritte">${d.schritte.map((s, i) => `<div class="br-s"><span class="nr">${i + 1}</span><div class="f">${s[0]}</div><div class="a">${L(s[1])}</div></div>`).join("")}</div>` : ""}
        <div class="br-knoepfe">
            ${d.schritte.length ? `<button class="haupt" data-a="weiter"><i class="fa-solid fa-forward-step"></i> Nächster Schritt</button>` : ""}
            <button data-a="alle"><i class="fa-solid fa-eye"></i> Alles zeigen</button>
            <button data-a="verdecken"><i class="fa-solid fa-eye-slash"></i> Verdecken</button>
            <button class="neu" data-a="neu"><i class="fa-solid fa-dice"></i> Neues Beispiel</button>
        </div>`;
    const tab = el.querySelector(`[data-kap="${S.kap}"]`);
    if (tab && tab.scrollIntoView) tab.scrollIntoView({ block: "nearest", inline: "nearest" });
}

function aufdecken(x){ x.classList.remove("zu"); x.classList.add("neu"); setTimeout(() => x.classList.remove("neu"), 800); }

function klick(e){
    const t = e.target.closest("button, .lsg");
    if (!t) { if (!e.target.closest("#brMenue")) el.querySelector("#brMenue").classList.remove("an"); return; }
    if (t.classList.contains("lsg")){
        if (t.classList.contains("zu")) aufdecken(t); else t.classList.add("zu");
        if (!el.querySelector("#brPanel .lsg.zu")){ const ende = el.querySelector(".lsg.ende.zu"); if (ende) aufdecken(ende); }
        return;
    }
    if (t.dataset.kap){ S.kap = t.dataset.kap; S.fehler = ""; merken(); return zeichnen(); }
    if (t.dataset.hg){ S.hg = t.dataset.hg; merken(); return zeichnen(); }
    if (t.dataset.st){ K[S.kap].st(t.dataset.st, +t.dataset.d); return zeichnen(); }
    if (t.dataset.set){
        const [k, v] = t.dataset.set.split("=");
        S[S.kap][k] = v;
        if (K[S.kap].set) K[S.kap].set(k);
        S.fehler = "";
        return zeichnen();
    }
    const a = t.dataset.a;
    if (a === "zu") return schliessen();
    if (a === "voll") return (window.vollbild ? window.vollbild() : null);
    if (a === "menue") return el.querySelector("#brMenue").classList.toggle("an");
    if (a === "bild"){ S.bild = !S.bild; merken(); return zeichnen(); }
    if (a === "neu"){ S.fehler = ""; K[S.kap].neu(); return zeichnen(); }
    if (a === "weiter"){
        const n = el.querySelector("#brPanel .lsg.zu");
        if (n){ aufdecken(n); if (n.scrollIntoView) n.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
        if (!el.querySelector("#brPanel .lsg.zu")){ const ende = el.querySelector(".lsg.ende.zu"); if (ende) aufdecken(ende); }
        return;
    }
    if (a === "alle"){ el.querySelectorAll(".lsg.zu").forEach(aufdecken); return; }
    if (a === "verdecken"){ el.querySelectorAll(".lsg").forEach(x => x.classList.add("zu")); return; }
}

function oeffnen(kap){
    aufbauen();
    if (kap && K[kap]) S.kap = kap;
    el.classList.add("an");
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "none";
    history.replaceState(null, "", "#brueche");
    zeichnen();
}
function schliessen(){
    el.classList.remove("an");
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "";
    history.replaceState(null, "", location.pathname);
}
window.tafelBrueche = { oeffnen, schliessen, _S: S, _K: K, _rechenweg: rechenweg, _lesen: eingabeLesen };
document.addEventListener("DOMContentLoaded", () => { if (location.hash === "#brueche") oeffnen(); });
})();
