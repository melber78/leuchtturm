/* ===============================================================
   Mathe-Tafelbilder (auf Basis von tafel-erklaer.js)
   Schriftlich rechnen · Stellenwerttafel · Uhr & Zeit · Größen umrechnen · Prozent & Dezimalzahlen
   =============================================================== */
(function(){
"use strict";
const ET = window.ErklaerTafel; if (!ET) return;
const { L, stepper, wahl } = ET;
const zuf = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const nimm = l => l[Math.floor(Math.random() * l.length)];
const grenze = (x, a, b) => Math.max(a, Math.min(b, x));
const rund = x => Math.round(x * 1e6) / 1e6;
// Zahl schreiben: Komma, ab 10 000 mit Leerzeichen gruppiert
function fz(x){
    x = rund(x); const neg = x < 0; x = Math.abs(x);
    let [g, d] = String(x).split(".");
    if (g.length > 4) g = g.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return (neg ? "−" : "") + g + (d ? "," + d : "");
}
const B = (z, n) => `<span class="bz"><span>${z}</span><span>${n}</span></span>`;
const STELLE = ["Einer", "Zehner", "Hunderter", "Tausender", "Zehntausender", "Hunderttausender"];
const KURZ = ["E", "Z", "H", "T", "ZT", "HT"];

/* ---------- Zahlwörter ---------- */
const E1 = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"];
const Z10 = ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];
function u100(n, ende){ if (n === 0) return ""; if (n === 1) return ende ? "eins" : "ein"; if (n < 20) return E1[n]; const e = n % 10, z = Math.floor(n / 10); return (e ? (e === 1 ? "ein" : E1[e]) + "und" : "") + Z10[z]; }
function u1000(n, ende){ const h = Math.floor(n / 100), r = n % 100; return (h ? (h === 1 ? "ein" : E1[h]) + "hundert" : "") + u100(r, ende); }
function zahlwort(n){ if (n === 0) return "null"; const t = Math.floor(n / 1000), r = n % 1000; return (t ? u1000(t, false) + "tausend" : "") + u1000(r, true); }

const ZUSATZ_CSS = `
.sr{ display:grid; gap:0; font-weight:900; font-variant-numeric:tabular-nums; font-size:clamp(26px,5.4vmin,72px); line-height:1.25; margin:auto; }
.sr > span{ display:flex; align-items:flex-end; justify-content:center; min-width:.9em; height:1.3em; position:relative; }
.sr .kl{ font-size:.5em; color:#d1342b; height:1.3em; align-items:flex-end; padding-bottom:.15em; }
.ek.kreide .sr .kl{ color:#ff9b8f; }
.sr .op{ color:#7c8a96; }
.sr .er{ color:#557428; }
.ek.kreide .sr .er{ color:#9fd0f0; }
.sr .tl{ color:#e08a2c; }
.sr .strich{ border-top:.07em solid currentColor; height:.18em; }
.sr .alt{ text-decoration:line-through; text-decoration-color:#d1342b; text-decoration-thickness:.08em; opacity:.7; }
.ek-bild .sr .frei.zu-s:not(.auf-s){ opacity:1; color:transparent; cursor:pointer; }
.ek-bild .sr .frei.zu-s:not(.auf-s)::before{ content:""; position:absolute; inset:.08em .04em; border:.045em dashed #b3c69a; border-radius:.14em; background:rgba(179,198,154,.12); }
.ek.kreide .ek-bild .sr .frei.zu-s:not(.auf-s)::before{ border-color:rgba(255,255,255,.4); background:rgba(255,255,255,.06); }
.ek-bild .sr .frei.wahl::before{ border-style:solid !important; border-color:#e08a2c !important; background:rgba(224,138,44,.15) !important; }
.ek-bild .sr .falsch::before{ animation:srW .35s; border-color:#d1342b !important; }
.ek-bild .sr .getroffen{ animation:srOk .7s; }
@keyframes srW{ 25%{ transform:translateX(-4px); } 75%{ transform:translateX(4px); } }
@keyframes srOk{ 0%{ transform:scale(1.35); } 100%{ transform:scale(1); } }
.sr-pad{ position:fixed; z-index:100; display:none; grid-template-columns:repeat(11, 1fr); gap:6px; padding:8px 10px calc(8px + env(safe-area-inset-bottom)); background:#fff; border-radius:20px 20px 0 0; box-shadow:0 -8px 30px rgba(0,0,0,.2); left:50%; bottom:0; transform:translateX(-50%); width:min(760px, 100vw); }
@media (max-width:600px){ .sr-pad{ grid-template-columns:repeat(6, 1fr); } }
.sr-pad.an{ display:grid; } .sr-pad.kreide{ background:#24403a; }
.sr-pad button{ font:900 clamp(24px,4vmin,34px) "Nunito",sans-serif; border:0; border-radius:14px; height:clamp(52px,8vmin,66px); background:#eef3e6; color:#2f4a1f; cursor:pointer; }
.sr-pad.kreide button{ background:rgba(255,255,255,.12); color:#f3efe3; }
.sr-pad button[data-z="✕"]{ background:#fbe9e4; color:#b5583f; }
.sr-pad.wackeln button{ animation:srW .35s; }
.sr .kopf{ font-size:.42em; color:#7c8a96; align-items:center; }
.swt{ display:grid; gap:10px; width:100%; height:100%; align-content:center; }
.swt-k{ background:#f4f7fa; border-radius:16px; padding:8px 6px 10px; display:flex; flex-direction:column; align-items:center; gap:6px; min-width:0; }
.ek.kreide .swt-k{ background:rgba(255,255,255,.07); }
.swt-k h5{ margin:0; font-size:clamp(15px,2.2vmin,24px); font-weight:900; }
.swt-k .pl{ display:grid; grid-template-columns:repeat(2,1fr); gap:5px; min-height:clamp(90px,22vmin,230px); align-content:end; }
.swt-k .pl i{ width:clamp(14px,2.6vmin,28px); aspect-ratio:1; border-radius:50%; display:block; }
.swt-k .pl i.viel{ outline:3px solid #d1342b; }
.swt-k .zf{ font-size:clamp(30px,6vmin,76px); font-weight:900; line-height:1; }
.swt-k .knopf{ display:flex; gap:4px; }
.swt-k .knopf button{ font:900 18px "Nunito",sans-serif; border:0; background:white; color:#2f4a1f; width:36px; height:36px; border-radius:50%; cursor:pointer; box-shadow:0 2px 6px rgba(47,74,31,.12); }
.swt-komma{ align-self:center; font-size:clamp(40px,8vmin,90px); font-weight:900; color:#d1342b; }
.swt-unter{ grid-column:1/-1; display:flex; flex-direction:column; align-items:center; gap:4px; font-weight:900; }
.swt-unter .gross{ font-size:clamp(30px,6vmin,72px); }
.swt-unter .wort{ font-size:clamp(16px,2.6vmin,30px); color:#52606b; }
.ek.kreide .swt-unter .wort{ color:#d8e3da; }
.hf{ display:grid; grid-template-columns:repeat(10,1fr); gap:3px; width:min(100%, 52vh); aspect-ratio:1; margin:auto; }
.hf i{ border-radius:3px; background:#e3e9ef; }
.ek.kreide .hf i{ background:rgba(255,255,255,.1); }
.hf i.an{ background:#557428; }
.hf i.an.b{ background:#e08a2c; }
`;
let cssDa = false;
function css(){ if (cssDa) return; const s = document.createElement("style"); s.textContent = ZUSATZ_CSS; document.head.appendChild(s); cssDa = true; }

/* Raster für schriftliche Verfahren: rows = [[{t, c, s}, …], …] (alle gleich lang) */
function raster(rows, C){
    return `<div class="sr" style="grid-template-columns:repeat(${C}, auto)">${rows.map(r => r.map(z => {
        if (!z) return `<span></span>`;
        return `<span class="${z.c || ""}"${z.s !== undefined ? ` data-s="${z.s}"` : ""}>${z.t ?? ""}</span>`;
    }).join("")).join("")}</div>`;
}
const leer = C => Array(C).fill(null);
const ziff = n => String(n).split("").map(Number);
// Ziffern rechtsbündig in eine Zeile setzen: endet in Spalte ende (einschließlich)
function setze(row, ende, text, c, s){ const t = String(text).split(""); t.forEach((z, i) => { row[ende - t.length + 1 + i] = { t: z, c, s }; }); return row; }

/* =====================================================================
   1) Schriftlich rechnen
   ===================================================================== */
const SR = { kap: "plus", plus: { a: 4738, b: 2595, st: "4" }, minus: { a: 7423, b: 2856, st: "4", v: "erg" }, mal: { a: 347, b: 6, st: "1" }, geteilt: { a: 846, b: 3, rest: "0" } };
const SK = {};
function neueZahl(st){ const n = +st; return zuf(Math.pow(10, n - 1), Math.pow(10, n) - 1); }

SK.plus = () => {
    const { a, b } = SR.plus, A = ziff(a).reverse(), Bz = ziff(b).reverse(), n = Math.max(A.length, Bz.length), s = a + b, C = n + 2;
    const r0 = setze(leer(C), C - 1, a), r1 = setze(leer(C), C - 1, b), ru = leer(C), rs = leer(C), re = leer(C);
    r1[0] = { t: "+", c: "op" };
    for (let i = 0; i < C; i++) rs[i] = { c: "strich" };
    const schritte = []; let u = 0;
    for (let i = 0; i < n; i++){
        const x = A[i] || 0, y = Bz[i] || 0, z = x + y + u, col = C - 1 - i;
        re[col] = { t: z % 10, c: "er", s: i };
        const neuU = Math.floor(z / 10);
        if (neuU){ ru[col - 1] = { t: neuU, c: "kl", s: i }; }
        schritte.push([`<b>${STELLE[i]}:</b> ${x} + ${y}${u ? ` + <span class="rot">${u}</span>` : ""} = ?`, z >= 10 ? `${z} → schreibe <b>${z % 10}</b>, merke <span class="rot">${neuU}</span>` : `${z} → schreibe <b>${z}</b>`]);
        u = neuU;
    }
    if (u){ re[C - 1 - n] = { t: u, c: "er", s: n }; schritte.push([`Der Übertrag <span class="rot">${u}</span> kommt nach vorn.`, `schreibe <b>${u}</b>`]); }
    schritte.push(["Ergebnis", `${fz(a)} + ${fz(b)} = <b>${fz(s)}</b>`]);
    return { frage: "Rechne schriftlich – von rechts nach links, Stelle für Stelle.", aufgabe: `${fz(a)} + ${fz(b)} = ${L(fz(s))}`,
        bild: raster([kopfzeile(C, n), r0, r1, ru, rs, re], C),
        merke: `<b>Merke</b>Die Zahlen stellengerecht untereinander schreiben: Einer unter Einer, Zehner unter Zehner. Wird eine Summe 10 oder mehr, schreibst du die Einer hin und merkst dir den <span class="rot">Übertrag</span> für die nächste Stelle.`,
        regler: wahl("st", [["2", "2-stellig"], ["3", "3-stellig"], ["4", "4-stellig"], ["5", "5-stellig"]], SR.plus.st) + eingabeFeld("z. B. 4738 + 2595"), schritte };
};
function kopfzeile(C, n){ const r = leer(C); for (let i = 0; i < n; i++) r[C - 1 - i] = { t: KURZ[i], c: "kopf" }; return r; }
SK.plus.set = () => SK.plus.neu();
SK.plus.neu = () => { const st = SR.plus.st; SR.plus.a = neueZahl(st); SR.plus.b = neueZahl(Math.random() < .3 && +st > 2 ? +st - 1 : st); };

SK.minus = () => {
    let { a, b, v } = SR.minus; if (b > a) [a, b] = [b, a];
    const A = ziff(a).reverse(), Bz = ziff(b).reverse(), n = A.length, d = a - b, C = n + 1;
    const rk = leer(C), r0 = setze(leer(C), C - 1, a), r1 = setze(leer(C), C - 1, b), ru = leer(C), rs = leer(C), re = leer(C);
    r1[0] = { t: "−", c: "op" };
    for (let i = 0; i < C; i++) rs[i] = { c: "strich" };
    const schritte = [], ergebnis = ziff(d).reverse();
    if (v === "erg"){
        let u = 0;
        for (let i = 0; i < n; i++){
            const o = A[i], y = (Bz[i] || 0), w = y + u, col = C - 1 - i;
            let z, neuU;
            if (w <= o){ z = o - w; neuU = 0; schritte.push([`<b>${STELLE[i]}:</b> ${y}${u ? ` + <span class="rot">${u}</span>` : ""} + ? = ${o}`, `${z} → schreibe <b>${z}</b>`]); }
            else { z = o + 10 - w; neuU = 1; schritte.push([`<b>${STELLE[i]}:</b> ${w} + ? = ${o} geht nicht.<br>${w} + ? = ${o + 10}`, `${z} → schreibe <b>${z}</b>, Übertrag <span class="rot">1</span>`]); }
            if (i < ergebnis.length || z) re[col] = { t: z, c: "er", s: i };
            if (neuU && i + 1 < n) ru[col - 1] = { t: 1, c: "kl", s: i };
            u = neuU;
        }
    } else {
        const M = A.slice();
        for (let i = 0; i < n; i++){
            const y = Bz[i] || 0, col = C - 1 - i;
            let text = `<b>${STELLE[i]}:</b> ${M[i]} − ${y}`;
            if (M[i] < y){
                let j = i + 1; while (M[j] === 0) j++;
                const vorher = M.slice();
                M[j]--; for (let k = j - 1; k > i; k--) M[k] = 9; M[i] += 10;
                for (let k = i; k <= j; k++){ rk[C - 1 - k] = { t: M[k], c: "kl", s: i }; }
                text = `<b>${STELLE[i]}:</b> ${vorher[i]} − ${y} geht nicht → entbündeln:<br>1 ${STELLE[j].replace(/er$/, "er")} wird zu 10 ${STELLE[j - 1]}${j - 1 > i ? " usw." : ""}. Jetzt ${M[i]} − ${y}`;
            }
            const z = M[i] - y;
            if (i < ergebnis.length || z) re[col] = { t: z, c: "er", s: i };
            schritte.push([text, `${z} → schreibe <b>${z}</b>`]);
        }
    }
    schritte.push(["Ergebnis", `${fz(a)} − ${fz(b)} = <b>${fz(d)}</b>`]);
    const merke = v === "erg"
        ? `<b>Merke – Ergänzen</b>Von unten nach oben ergänzen: „Wie viel fehlt bis …?“ Geht es nicht, ergänzt du bis zur nächsten Zahl mit 1 vorn (z. B. bis 13) und schreibst den <span class="rot">Übertrag</span> unten in die nächste Stelle.`
        : `<b>Merke – Abziehen mit Entbündeln</b>Oben minus unten. Ist die obere Ziffer zu klein, tauschst du 1 von der nächsten Stelle in 10 um (<span class="rot">entbündeln</span>) und rechnest dann.`;
    return { frage: "Rechne schriftlich – von rechts nach links.", aufgabe: `${fz(a)} − ${fz(b)} = ${L(fz(d))}`,
        bild: raster([kopfzeile(C, n), rk, r0, r1, ru, rs, re], C), merke,
        regler: wahl("v", [["erg", "Ergänzen"], ["ab", "Abziehen"]], v) + wahl("st", [["2", "2-stellig"], ["3", "3-stellig"], ["4", "4-stellig"], ["5", "5-stellig"]], SR.minus.st) + eingabeFeld("z. B. 7423 − 2856"), schritte };
};
SK.minus.set = k => { if (k === "st") SK.minus.neu(); };
SK.minus.neu = () => { const st = SR.minus.st; let a = neueZahl(st), b = neueZahl(Math.random() < .3 && +st > 2 ? +st - 1 : st); if (b > a) [a, b] = [b, a]; if (a === b) a += 7; SR.minus.a = a; SR.minus.b = b; };

SK.mal = () => {
    const { a, b } = SR.mal, M = ziff(b), la = String(a).length, lb = M.length;
    const C = la + 1 + lb + 2, opCol = 2 + la, ende = C - 1;
    const r0 = leer(C); setze(r0, opCol - 1, a); r0[opCol] = { t: "·", c: "op" }; setze(r0, ende, b);
    const rows = [r0], schritte = [];
    const strich = () => { const r = leer(C); for (let i = 0; i < C; i++) r[i] = { c: "strich" }; return r; };
    rows.push(strich());
    if (lb === 1){
        const A = ziff(a).reverse(), re = leer(C), ru = leer(C); let u = 0;
        for (let i = 0; i < A.length; i++){
            const p = A[i] * b + u, col = ende - i, neuU = Math.floor(p / 10);
            re[col] = { t: p % 10, c: "er", s: i };
            if (neuU && i < A.length - 1) ru[col - 1] = { t: neuU, c: "kl", s: i };
            schritte.push([`<b>${STELLE[i]}:</b> ${A[i]} · ${b}${u ? ` + <span class="rot">${u}</span>` : ""} = ?`, p >= 10 && i < A.length - 1 ? `${p} → schreibe <b>${p % 10}</b>, merke <span class="rot">${neuU}</span>` : i === A.length - 1 && p >= 10 ? `schreibe <b>${p}</b>` : `schreibe <b>${p}</b>`]);
            if (i === A.length - 1 && neuU) re[col - 1] = { t: neuU, c: "er", s: i };
            u = neuU;
        }
        rows.push(ru, re);
    } else {
        // zweistellig: mit der vorderen Ziffer beginnen, Teilergebnisse versetzt untereinander
        M.forEach((m, j) => {
            const p = a * m, col = ende - (lb - 1 - j), r = leer(C);
            setze(r, col, p, j ? "er" : "tl", j);
            rows.push(r);
            schritte.push([`${fz(a)} · <b>${m}</b> ${j === 0 ? `(die ${m} steht bei den ${STELLE[lb - 1 - j]}n – das Ergebnis endet unter der ${m})` : "(endet unter der " + m + ")"}`, `<b>${fz(p)}</b>`]);
        });
        rows.push(strich());
        const r = leer(C); setze(r, ende, a * b, "er", lb); rows.push(r);
        schritte.push(["Teilergebnisse addieren", `<b>${fz(a * b)}</b>`]);
    }
    schritte.push(["Ergebnis", `${fz(a)} · ${fz(b)} = <b>${fz(a * b)}</b>`]);
    return { frage: lb === 1 ? "Multipliziere jede Stelle – von rechts nach links." : "Erst mit jeder Ziffer einzeln malnehmen, dann addieren.", aufgabe: `${fz(a)} · ${fz(b)} = ${L(fz(a * b))}`,
        bild: raster(rows, C),
        merke: lb === 1 ? `<b>Merke</b>Jede Ziffer mit der Zahl malnehmen, von rechts beginnen. Den <span class="rot">Übertrag</span> addierst du zum nächsten Ergebnis.` : `<b>Merke</b>Mit der vorderen Ziffer beginnen. Jedes Teilergebnis endet genau unter der Ziffer, mit der du gerade malnimmst. Zum Schluss addieren.`,
        regler: wahl("st", [["1", "· einstellig"], ["2", "· zweistellig"]], SR.mal.st) + eingabeFeld("z. B. 347 · 26"), schritte };
};
SK.mal.set = () => SK.mal.neu();
SK.mal.neu = () => { const zw = SR.mal.st === "2"; SR.mal.a = zw ? zuf(112, 989) : zuf(23, 4987); SR.mal.b = zw ? zuf(12, 89) : zuf(3, 9); };

SK.geteilt = () => {
    const { a, b } = SR.geteilt, A = ziff(a), n = A.length, q = Math.floor(a / b), rest = a % b;
    let start = 1; while (start < n && Number(String(a).slice(0, start)) < b) start++;
    const Q = String(q), o = 1, C = o + n + 3 + Q.length + (rest ? 3 : 0) + 1;
    const r0 = leer(C); setze(r0, o + n - 1, a); r0[o + n] = { t: ":", c: "op" }; r0[o + n + 1] = { t: b }; r0[o + n + 2] = { t: "=", c: "op" };
    Q.split("").forEach((z, i) => { r0[o + n + 3 + i] = { t: z, c: "er", s: i }; });
    if (rest){ r0[o + n + 3 + Q.length] = { t: "R", c: "op", s: Q.length - 1 }; r0[o + n + 4 + Q.length] = { t: rest, c: "er", s: Q.length - 1 }; }
    const rows = [r0], schritte = [];
    let cur = Number(String(a).slice(0, start)), pos = o + start - 1;
    Q.split("").forEach((qz, i) => {
        const qq = Number(qz), prod = qq * b, r = cur - prod;
        const rp = leer(C); setze(rp, pos, prod, "", i); rp[pos - String(prod).length] = { t: "−", c: "op", s: i }; rows.push(rp);
        const rs = leer(C); for (let k = pos - Math.max(String(cur).length, String(prod).length) + 1; k <= pos; k++) rs[k] = { c: "strich", s: i }; rows.push(rs);
        const weiter = pos + 1 < o + n, naechste = A[pos + 1 - o];
        const rr = leer(C); setze(rr, pos, r, "", i); if (weiter) rr[pos + 1] = { t: naechste, c: "tl", s: i }; rows.push(rr);
        schritte.push([`<b>${cur} : ${b}</b> = ?`, `<b>${qq}</b>, denn ${qq} · ${b} = ${prod}. Rest: ${cur} − ${prod} = ${r}${weiter ? `. Die ${naechste} herunterholen → ${r * 10 + naechste}` : ""}`]);
        if (weiter){ cur = r * 10 + naechste; pos++; }
    });
    schritte.push(["Ergebnis", `${fz(a)} : ${b} = <b>${fz(q)}</b>${rest ? ` Rest <b>${rest}</b>` : ""}`]);
    return { frage: "Teile von links nach rechts. Nach jedem Schritt die nächste Ziffer herunterholen.", aufgabe: `${fz(a)} : ${b} = ${L(fz(q) + (rest ? " R " + rest : ""))}`,
        bild: raster(rows, C),
        merke: `<b>Merke</b>Nimm so viele Ziffern von vorn, bis du teilen kannst. Frage: „Wie oft passt ${b} hinein?“, rechne zurück (·), ziehe ab und hole die nächste Ziffer herunter. Bleibt am Ende etwas übrig, ist das der <span class="rot">Rest</span>.`,
        regler: wahl("rest", [["0", "ohne Rest"], ["1", "mit Rest"]], SR.geteilt.rest) + eingabeFeld("z. B. 846 : 3"), schritte };
};
SK.geteilt.set = () => SK.geteilt.neu();
SK.geteilt.neu = () => { for (let t = 0; t < 200; t++){ const b = zuf(2, 9), q = zuf(21, 1499), r = SR.geteilt.rest === "1" ? zuf(1, b - 1) : 0, a = q * b + r; if (a < 100 || a > 9999) continue; SR.geteilt.a = a; SR.geteilt.b = b; return; } };

function eingabeFeld(bsp){ return `<form class="ek-eingabe"><input type="text" autocomplete="off" placeholder="Eigene Aufgabe, ${bsp}" aria-label="Eigene Aufgabe"><button type="submit">Los</button></form>`; }
const zahlLesen = t => Number(String(t).replace(/[\s. ]/g, ""));
["plus", "minus", "mal", "geteilt"].forEach(k => {
    SK[k].fehlerText = "Bitte so eingeben: 4738 + 2595, 7423 − 2856, 347 · 26 oder 846 : 3 (ganze Zahlen bis 99 999).";
    SK[k].eingabe = txt => {
        const m = /^\s*([\d\s.]+)\s*([+\-−·*x×:\/])\s*([\d\s.]+)\s*$/.exec(txt); if (!m) return false;
        const a = zahlLesen(m[1]), b = zahlLesen(m[3]), op = m[2]; if (!a || !b || a > 99999 || b > 99999) return false;
        if (op === "+"){ SR.kap = "plus"; Object.assign(SR.plus, { a, b }); }
        else if (op === "-" || op === "−"){ SR.kap = "minus"; Object.assign(SR.minus, { a: Math.max(a, b), b: Math.min(a, b) }); }
        else if (op === ":" || op === "/"){ if (b > 9) return false; SR.kap = "geteilt"; Object.assign(SR.geteilt, { a, b }); }
        else { if (String(b).length > 2) return false; SR.kap = "mal"; Object.assign(SR.mal, { a, b, st: String(String(b).length) }); }
        return true;
    };
});

/* Direkt an der Tafel rechnen: leere Ziffernfelder antippen und die Ziffer eintragen.
   Stimmt sie, bleibt sie stehen; ist ein Schritt komplett, wird er im Rechenweg aufgedeckt. */
let srPad = null, srZiel = null, srApi = null;
function srPadZeigen(zelle){
    if (!srPad){
        srPad = document.createElement("div"); srPad.className = "sr-pad";
        srPad.innerHTML = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "✕"].map(z => `<button data-z="${z}">${z}</button>`).join("");
        document.body.appendChild(srPad);
        srPad.addEventListener("click", e => { const b = e.target.closest("[data-z]"); if (!b) return; e.stopPropagation(); if (b.dataset.z === "✕") return srPadZu(); srEingabe(b.dataset.z); });
        document.addEventListener("pointerdown", e => { if (srPad.classList.contains("an") && !e.target.closest(".sr-pad, .sr .frei")) srPadZu(); });
    }
    document.querySelectorAll(".sr .frei.wahl").forEach(x => x.classList.remove("wahl"));
    srZiel = zelle; zelle.classList.add("wahl");
    const host = zelle.closest(".ek"); if (srPad.parentElement !== host) host.appendChild(srPad);
    srPad.classList.toggle("kreide", host.classList.contains("kreide"));
    srPad.classList.add("an");
    // Ziffernblock unten am Rand – so bleibt die Rechnung sichtbar; das Feld wird bei Bedarf nach oben gescrollt
    const r = zelle.getBoundingClientRect(), ph = srPad.offsetHeight;
    if (r.bottom > innerHeight - ph - 16) { const sc = zelle.closest(".ek-bild, .ek-haupt, .ek") ; window.scrollBy(0, r.bottom - (innerHeight - ph - 24)); zelle.scrollIntoView({ block: "center" }); }
}
function srPadZu(){ if (srPad) srPad.classList.remove("an"); document.querySelectorAll(".sr .frei.wahl").forEach(x => x.classList.remove("wahl")); srZiel = null; }
function srEingabe(z){
    const c = srZiel; if (!c) return;
    if (c.textContent.trim() === String(z)){
        c.classList.remove("wahl", "frei"); c.classList.add("auf-s", "getroffen"); setTimeout(() => c.classList.remove("getroffen"), 700);
        const s = c.dataset.s, ek = c.closest(".ek");
        if (![...ek.querySelectorAll(`.ek-bild .ziel[data-s="${s}"]`)].some(x => !x.classList.contains("auf-s"))){
            const l = ek.querySelector(`.ek-panel .lsg.zu[data-i="${s}"]`); if (l && srApi) srApi.aufdecken(l);
            // alles gerechnet? Dann auch den Ergebnis-Schritt aufdecken
            if (![...ek.querySelectorAll(".ek-bild .sr .ziel")].some(x => !x.classList.contains("auf-s"))) ek.querySelectorAll(".ek-panel .lsg.zu").forEach(x => srApi && srApi.aufdecken(x));
        }
        srPadZu();
        // nächstes leeres Feld derselben Spalte oder weiter links vorschlagen
    } else {
        c.classList.remove("falsch"); void c.offsetWidth; c.classList.add("falsch");
        srPad.classList.remove("wackeln"); void srPad.offsetWidth; srPad.classList.add("wackeln");
    }
}
function tafelRechnen(el, api){
    srApi = api; srPadZu();
    // Überträge (kleine rote Ziffern) erscheinen von selbst, sobald die Stelle gerechnet ist – sonst würden leere Kästchen verraten, wo einer kommt
    el.querySelectorAll(".ek-bild .sr [data-s]").forEach(c => { if (/^\d$/.test(c.textContent.trim()) && !c.classList.contains("kl")){ c.classList.add("frei", "ziel"); c.onclick = e => { e.stopPropagation(); if (c.classList.contains("frei")) srPadZeigen(c); }; } });
}
["plus", "minus", "mal", "geteilt"].forEach(k => { const orig = SK[k]; SK[k] = Object.assign(() => { const d = orig(); d.nachher = tafelRechnen;
    d.frage = (d.frage || "") + ` <span style="font-size:.8em;opacity:.75">– tippe auf ein leeres Feld und trag die Ziffer ein.</span>`; return d; }, orig); });

const schriftlich = ET.neu({ id: "schriftlich", titel: "Schriftlich rechnen", unter: "Klasse 3–6", hash: "schriftlich", speicher: "lt-schriftlich", merkeZu: true,
    kapitel: [["plus", "Plus"], ["minus", "Minus"], ["mal", "Mal"], ["geteilt", "Geteilt"]], K: SK, S: SR, aufgebaut: css });

/* =====================================================================
   2) Stellenwerttafel
   ===================================================================== */
const WS = { kap: "zahl", zahl: { n: 3, d: [3, 4, 7, 0, 0] }, buendeln: { d: [7, 14, 3, 0] }, komma: { d: [3, 4, 7, 0] } };
const WK = {};
const FARBE = ["#557428", "#e08a2c", "#2e9e5b", "#8e44ad", "#d1342b"];
function spalte(name, kurz, wert, farbe, key, max, idx){
    const dots = Array.from({ length: wert }, (_, i) => `<i style="background:${farbe}" class="${i >= 10 ? "viel" : ""}"></i>`).join("");
    return `<div class="swt-k"><h5 style="color:${farbe}">${kurz}<br><small style="font-size:.6em;color:#7c8a96">${name}</small></h5><div class="pl" style="grid-template-columns:repeat(${wert > 10 ? 4 : 2},1fr)">${dots}</div><div class="zf" style="color:${farbe}">${wert}</div>
      <div class="knopf"><button data-st="${key}${idx}" data-d="-1">−</button><button data-st="${key}${idx}" data-d="1">+</button></div></div>`;
}
WK.zahl = () => {
    const s = WS.zahl, n = s.n, d = s.d.slice(0, n), wert = d.reduce((t, z, i) => t + z * Math.pow(10, i), 0);
    const spalten = d.map((z, i) => [i, z]).reverse().map(([i, z]) => spalte(STELLE[i], KURZ[i], z, FARBE[i], "d", 9, i)).join("");
    const teile = d.map((z, i) => [i, z]).reverse().filter(([, z]) => z).map(([i, z]) => `${z} ${KURZ[i]}`).join(" + ") || "0";
    return { frage: "Wie heißt die Zahl? Lies die Stellenwerttafel von links nach rechts.",
        bild: `<div class="swt" style="grid-template-columns:repeat(${n},minmax(0,1fr))">${spalten}<div class="swt-unter"><div class="gross" data-s="1">${fz(wert)}</div><div class="wort" data-s="2">${zahlwort(wert)}</div></div></div>`,
        merke: `<b>Merke</b>Jede Stelle ist zehnmal so viel wert wie die Stelle rechts daneben: 10 Einer = 1 Zehner, 10 Zehner = 1 Hunderter, 10 Hunderter = 1 Tausender. Eine leere Stelle schreibst du als <b>0</b>.`,
        regler: wahl("n", [[2, "bis 100"], [3, "bis 1 000"], [4, "bis 10 000"], [5, "bis 100 000"]], n),
        schritte: [["Was steht in den Stellen?", teile], ["Die Zahl", `<b>${fz(wert)}</b>`], ["Das Zahlwort", zahlwort(wert)]] };
};
WK.zahl.st = (k, dd) => { const i = +k.slice(1); WS.zahl.d[i] = grenze(WS.zahl.d[i] + dd, 0, 9); };
WK.zahl.set = () => { WS.zahl.n = +WS.zahl.n; WK.zahl.neu(); };
WK.zahl.neu = () => { const n = WS.zahl.n; WS.zahl.d = Array.from({ length: 5 }, (_, i) => i < n ? (i === n - 1 ? zuf(1, 9) : (Math.random() < .15 ? 0 : zuf(1, 9))) : 0); };

WK.buendeln = () => {
    const d = WS.buendeln.d, n = 4, wert = d.reduce((t, z, i) => t + z * Math.pow(10, i), 0);
    const spalten = d.map((z, i) => [i, z]).reverse().map(([i, z]) => spalte(STELLE[i], KURZ[i], z, FARBE[i], "d", 19, i)).join("");
    const schritte = []; const m = d.slice();
    for (let i = 0; i < n - 1; i++) if (m[i] >= 10){ const g = Math.floor(m[i] / 10); schritte.push([`${m[i]} ${STELLE[i]} – das sind mehr als 9.`, `${g * 10} ${STELLE[i]} = ${g} ${g === 1 ? STELLE[i + 1].replace(/er$/, "er") : STELLE[i + 1]} → bleiben ${m[i] % 10} ${STELLE[i]}`]); m[i + 1] += g; m[i] %= 10; }
    schritte.push(["Jetzt in jeder Stelle höchstens 9:", m.map((z, i) => [i, z]).reverse().filter(([, z]) => z).map(([i, z]) => `${z} ${KURZ[i]}`).join(" ")]);
    schritte.push(["Die Zahl", `<b>${fz(wert)}</b>`]);
    return { frage: "Hier sind zu viele Plättchen in einer Stelle. Bündle!",
        bild: `<div class="swt" style="grid-template-columns:repeat(${n},minmax(0,1fr))">${spalten}</div>`,
        merke: `<b>Merke</b>In jeder Stelle dürfen höchstens 9 stehen. Je <b>10</b> Plättchen bündelst du zu <b>1</b> Plättchen in der Stelle links daneben. Umgekehrt kannst du 1 Plättchen in 10 Plättchen rechts daneben <b>entbündeln</b> – das brauchst du beim Minusrechnen.`,
        regler: `<span class="ek-wahl"><button data-a="buendel">Einmal bündeln</button><button data-a="entbuendel">Einmal entbündeln</button></span>`, schritte, schritteTitel: "So wird gebündelt" };
};
WK.buendeln.st = (k, dd) => { const i = +k.slice(1); WS.buendeln.d[i] = grenze(WS.buendeln.d[i] + dd, 0, 19); };
WK.buendeln.neu = () => { WS.buendeln.d = [zuf(10, 18), zuf(3, 15), zuf(1, 9), zuf(0, 3)]; if (WS.buendeln.d[1] < 10 && Math.random() < .5) WS.buendeln.d[1] += 10; };
WK.buendeln.knopf = (a, t, api) => {
    const d = WS.buendeln.d;
    if (a === "buendel"){ for (let i = 0; i < 3; i++) if (d[i] >= 10){ d[i] -= 10; d[i + 1] += 1; break; } }
    if (a === "entbuendel"){ for (let i = 3; i > 0; i--) if (d[i] > 0 && d[i - 1] <= 9){ d[i] -= 1; d[i - 1] += 10; break; } }
    api.zeichnen();
};

WK.komma = () => {
    const d = WS.komma.d, namen = ["Einer", "Zehntel", "Hundertstel", "Tausendstel"], kurz = ["E", "z", "h", "t"], fb = ["#557428", "#e08a2c", "#2e9e5b", "#8e44ad"];
    let letzte = 0; d.forEach((z, i) => { if (i && z) letzte = i; });
    const text = d[0] + (letzte ? "," + d.slice(1, letzte + 1).join("") : "");
    const nenner = Math.pow(10, letzte), zaehler = Number(d.slice(1, letzte + 1).join("") || 0);
    const spalten = d.map((z, i) => (i === 1 ? `<div class="swt-komma">,</div>` : "") + spalte(namen[i], kurz[i], z, fb[i], "d", 9, i)).join("");
    return { frage: "Kommazahlen in der Stellenwerttafel: rechts vom Komma werden die Teile immer zehnmal kleiner.",
        bild: `<div class="swt" style="grid-template-columns:minmax(0,1fr) auto repeat(3,minmax(0,1fr))">${spalten}<div class="swt-unter"><div class="gross" data-s="1">${text}</div><div class="wort" data-s="2">${letzte ? `${d[0]} ${letzte ? "+ " + B(zaehler, nenner) : ""}` : ""}</div></div></div>`,
        merke: `<b>Merke</b>1 Einer = 10 Zehntel, 1 Zehntel = 10 Hundertstel, 1 Hundertstel = 10 Tausendstel. Nach dem Komma liest du die Ziffern einzeln: 3,47 = „drei Komma vier sieben“.`,
        schritte: [["Was steht in den Stellen?", d.map((z, i) => `${z} ${kurz[i]}`).join("  ")], ["Als Kommazahl", `<b>${text}</b>`], ["Gelesen", `${zahlwort(d[0])} Komma ${d.slice(1, letzte + 1).map(z => E1[z]).join(" ") || "null"}`], ["Als Bruch", letzte ? `${d[0] ? d[0] + " " : ""}${B(zaehler, nenner)}` : "–"]] };
};
WK.komma.st = (k, dd) => { const i = +k.slice(1); WS.komma.d[i] = grenze(WS.komma.d[i] + dd, 0, 9); };
WK.komma.neu = () => { WS.komma.d = [zuf(0, 9), zuf(0, 9), zuf(1, 9), Math.random() < .4 ? zuf(1, 9) : 0]; };

const stellen = ET.neu({ id: "stellen", titel: "Stellenwerttafel", unter: "Klasse 1–6", hash: "stellen", speicher: "lt-stellen",
    kapitel: [["zahl", "Zahlen darstellen"], ["buendeln", "Bündeln & Entbündeln"], ["komma", "Kommazahlen"]], K: WK, S: WS, aufgebaut: css });

/* =====================================================================
   3) Uhr & Zeit
   ===================================================================== */
const US = { kap: "lesen", lesen: { h: 8, m: 15, schritt: "5", sprache: "nach", zahlen: "1" }, spanne: { a: 8 * 60 + 40, b: 11 * 60 + 25 } };
const UK = {};
const STD = ["zwölf", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf"];
const zz = n => String(n).padStart(2, "0");
function gesprochen(h, m, regional){
    const h12 = h % 12 || 12, n12 = (h + 1) % 12 || 12, w = x => STD[x];
    const uhr = x => (x === 1 ? "ein" : STD[x]) + " Uhr";
    if (m === 0) return uhr(h12);
    if (regional){
        if (m === 15) return "viertel " + w(n12);
        if (m === 30) return "halb " + w(n12);
        if (m === 45) return "dreiviertel " + w(n12);
    }
    const T = { 5: "fünf nach " + w(h12), 10: "zehn nach " + w(h12), 15: "Viertel nach " + w(h12), 20: "zwanzig nach " + w(h12), 25: "fünf vor halb " + w(n12), 30: "halb " + w(n12), 35: "fünf nach halb " + w(n12), 40: "zwanzig vor " + w(n12), 45: "Viertel vor " + w(n12), 50: "zehn vor " + w(n12), 55: "fünf vor " + w(n12) };
    if (T[m]) return T[m];
    return m < 30 ? `${zahlwort(m)} Minuten nach ${w(h12)}` : `${zahlwort(60 - m)} Minuten vor ${w(n12)}`;
}
function uhrSvg(h, m, zahlen){
    const W = 400, c = 200, R = 170, wm = m * 6, wh = (h % 12) * 30 + m * .5;
    let s = `<svg viewBox="0 0 ${W} ${W}" class="uhr" style="touch-action:none;width:100%;height:100%" font-family="Nunito, sans-serif">
      <circle cx="${c}" cy="${c}" r="${R + 14}" fill="#fff" stroke="#2f4a1f" stroke-width="8"/>`;
    for (let i = 0; i < 60; i++){ const a = i * 6 * Math.PI / 180, l = i % 5 ? 8 : 18, r1 = R, r2 = R - l; s += `<line x1="${(c + r1 * Math.sin(a)).toFixed(1)}" y1="${(c - r1 * Math.cos(a)).toFixed(1)}" x2="${(c + r2 * Math.sin(a)).toFixed(1)}" y2="${(c - r2 * Math.cos(a)).toFixed(1)}" stroke="#2f4a1f" stroke-width="${i % 5 ? 2 : 5}" stroke-linecap="round"/>`; }
    for (let i = 1; i <= 12; i++){ const a = i * 30 * Math.PI / 180, r = R - 46; s += `<text x="${(c + r * Math.sin(a)).toFixed(1)}" y="${(c - r * Math.cos(a) + 13).toFixed(1)}" text-anchor="middle" font-size="38" font-weight="900" fill="#557428">${i}</text>`; }
    if (zahlen === "1") for (let i = 0; i < 12; i++){ const a = i * 30 * Math.PI / 180, r = R + 34; s += `<text x="${(c + r * Math.sin(a)).toFixed(1)}" y="${(c - r * Math.cos(a) + 7).toFixed(1)}" text-anchor="middle" font-size="19" font-weight="900" fill="#d1342b">${zz(i * 5)}</text>`; }
    s += `<g transform="rotate(${wh} ${c} ${c})"><line x1="${c}" y1="${c + 16}" x2="${c}" y2="${c - 92}" stroke="#557428" stroke-width="14" stroke-linecap="round"/></g>
      <g transform="rotate(${wm} ${c} ${c})" class="minzeiger" style="cursor:grab"><line x1="${c}" y1="${c + 20}" x2="${c}" y2="${c - 150}" stroke="#d1342b" stroke-width="9" stroke-linecap="round"/><circle cx="${c}" cy="${c - 150}" r="22" fill="#d1342b" opacity=".001"/></g>
      <circle cx="${c}" cy="${c}" r="11" fill="#2f4a1f"/></svg>`;
    return `<div style="width:min(100%,58vh);aspect-ratio:1;margin:auto;padding:${zahlen === "1" ? 18 : 0}px;box-sizing:border-box">${s}</div>`;
}
UK.lesen = () => {
    const { h, m, sprache, zahlen } = US.lesen, h12 = h % 12 || 12, regional = sprache === "regional";
    const stdText = m === 0 ? `genau auf der ${h12}` : m < 30 ? `kurz nach der ${h12}` : `zwischen ${h12} und ${(h12 % 12) + 1}, schon näher an der ${(h12 % 12) + 1}`;
    return { frage: "Wie spät ist es? Der lange Zeiger lässt sich mit dem Finger drehen.",
        bild: uhrSvg(h, m, zahlen),
        merke: `<b>Merke</b>Der <span class="blau">kurze Zeiger</span> zeigt die Stunden, der <span class="rot">lange Zeiger</span> die Minuten. Steht der lange Zeiger auf der 1, sind es 5 Minuten, auf der 3 sind es 15 Minuten, auf der 6 sind es 30 Minuten. Jede Uhrzeit gibt es zweimal am Tag: morgens und abends.`,
        regler: wahl("schritt", [["5", "5-Minuten-Schritte"], ["1", "jede Minute"]], US.lesen.schritt) + wahl("sprache", [["nach", "Viertel nach/vor"], ["regional", "viertel/dreiviertel"]], sprache) + wahl("zahlen", [["1", "Minuten außen"], ["0", "ohne"]], zahlen)
            + `<span class="ek-wahl"><button data-a="h-">− 1 Std.</button><button data-a="h+">+ 1 Std.</button><button data-a="m-">− ${US.lesen.schritt} Min.</button><button data-a="m+">+ ${US.lesen.schritt} Min.</button></span>`,
        schritte: [[`Der kurze Zeiger steht ${stdText}.`, `<b>${h12}</b> Uhr (Stunde)`], [`Der lange Zeiger zeigt auf ${m % 5 ? "einen Strich" : "die " + (m / 5 || 12)}.`, `<b>${m}</b> Minuten`],
                   ["Digital geschrieben", h12 === 12 ? `<b>12:${zz(m)} Uhr</b> oder <b>0:${zz(m)} Uhr</b> <small>(mittags / nachts)</small>` : `<b>${h12}:${zz(m)} Uhr</b> oder <b>${h12 + 12}:${zz(m)} Uhr</b> <small>(morgens / abends)</small>`], ["Man sagt", `„${gesprochen(h, m, regional)}“`]] };
};
UK.lesen.set = () => {};
UK.lesen.knopf = (a, t, api) => { const s = US.lesen, st = +s.schritt; let ges = s.h * 60 + s.m; if (a === "h+") ges += 60; if (a === "h-") ges -= 60; if (a === "m+") ges += st; if (a === "m-") ges -= st; ges = (ges + 1440) % 1440; s.h = Math.floor(ges / 60); s.m = ges % 60; api.zeichnen(); };
UK.lesen.neu = () => { const st = +US.lesen.schritt; US.lesen.h = zuf(1, 12); US.lesen.m = st === 1 ? zuf(0, 59) : zuf(0, 11) * 5; };
UK.lesen.nachher = undefined;
// Zeiger ziehen
function zeigerZiehen(el, api){
    const svg = el.querySelector(".ek-bild svg.uhr"); if (!svg) return;
    let zieht = false, letztM = US.lesen.m;
    const winkel = e => { const r = svg.getBoundingClientRect(), x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2); return (Math.atan2(x, -y) * 180 / Math.PI + 360) % 360; };
    svg.addEventListener("pointerdown", e => { zieht = true; svg.setPointerCapture(e.pointerId); bewege(e); });
    svg.addEventListener("pointermove", e => { if (zieht) bewege(e); });
    svg.addEventListener("pointerup", () => { if (zieht){ zieht = false; api.zeichnen(); } });
    function bewege(e){
        const st = +US.lesen.schritt; let m = Math.round(winkel(e) / 6 / st) * st % 60;
        if (letztM > 45 && m < 15) US.lesen.h = (US.lesen.h + 1) % 24; else if (letztM < 15 && m > 45) US.lesen.h = (US.lesen.h + 23) % 24;
        letztM = m; US.lesen.m = m;
        const c = 200, wm = m * 6, wh = (US.lesen.h % 12) * 30 + m * .5, g = svg.querySelectorAll("g");
        g[0].setAttribute("transform", `rotate(${wh} ${c} ${c})`); g[1].setAttribute("transform", `rotate(${wm} ${c} ${c})`);
    }
}
UK.spanne = () => {
    const { a, b } = US.spanne, fmt = t => `${Math.floor(t / 60)}:${zz(t % 60)} Uhr`, voll1 = Math.ceil(a / 60) * 60, voll2 = Math.floor(b / 60) * 60;
    const teile = [], schritte = [];
    if (voll1 <= voll2){
        if (voll1 > a) teile.push([a, voll1]);
        if (voll2 > voll1) teile.push([voll1, voll2]);
        if (b > voll2) teile.push([voll2, b]);
    } else teile.push([a, b]);
    const dauer = (x, y) => { const d = y - x, h = Math.floor(d / 60), m = d % 60; return [h ? h + " h" : "", m ? m + " min" : ""].filter(Boolean).join(" ") || "0 min"; };
    teile.forEach(([x, y], i) => schritte.push([`Von ${fmt(x)} bis ${fmt(y)}`, `<b>${dauer(x, y)}</b>`]));
    schritte.push(["Zusammen", `<b>${dauer(a, b)}</b>`]);
    // Zeitstrahl
    const W = 900, x0 = 40, x1 = 860, t0 = Math.floor(a / 60) * 60, t1 = Math.ceil(b / 60) * 60 || t0 + 60, X = t => x0 + (t - t0) / (t1 - t0) * (x1 - x0);
    let s = `<svg viewBox="0 0 ${W} 260" style="width:100%;height:100%" font-family="Nunito, sans-serif"><line x1="${x0}" y1="150" x2="${x1}" y2="150" stroke="#2f4a1f" stroke-width="5" stroke-linecap="round"/>`;
    for (let t = t0; t <= t1; t += 60) s += `<line x1="${X(t)}" y1="132" x2="${X(t)}" y2="168" stroke="#2f4a1f" stroke-width="4"/><text x="${X(t)}" y="200" text-anchor="middle" font-size="24" font-weight="900" fill="#52606b">${t / 60}:00</text>`;
    const F = ["#557428", "#e08a2c", "#2e9e5b"];
    teile.forEach(([x, y], i) => { const mx = (X(x) + X(y)) / 2, w = X(y) - X(x); s += `<g data-s="${i}"><path d="M${X(x)} 140 Q${mx} ${140 - Math.min(110, 30 + w * .35)} ${X(y)} 140" fill="none" stroke="${F[i]}" stroke-width="6"/><text x="${mx}" y="${140 - Math.min(110, 30 + w * .35) / 2 - 8}" text-anchor="middle" font-size="26" font-weight="900" fill="${F[i]}">${dauer(x, y)}</text></g>`; });
    [[a, "#d1342b", "Start"], [b, "#d1342b", "Ende"]].forEach(([t, f, n]) => { s += `<circle cx="${X(t)}" cy="150" r="10" fill="${f}"/><text x="${X(t)}" y="236" text-anchor="middle" font-size="22" font-weight="900" fill="${f}">${n} ${fmt(t)}</text>`; });
    s += `</svg>`;
    return { frage: `Wie lange dauert es von <b>${fmt(a)}</b> bis <b>${fmt(b)}</b>?`, bild: s,
        merke: `<b>Merke</b>Rechne in Etappen: erst bis zur <b>vollen Stunde</b>, dann die ganzen Stunden, dann die restlichen Minuten. 1 Stunde = 60 Minuten.`,
        schritte, schritteTitel: "In Etappen rechnen" };
};
UK.spanne.neu = () => { const a = zuf(7, 15) * 60 + zuf(1, 11) * 5, d = zuf(25, 260); US.spanne.a = a; US.spanne.b = Math.min(a + Math.round(d / 5) * 5, 23 * 60 + 55); };

const uhr = ET.neu({ id: "uhr", titel: "Uhr & Zeit", unter: "Klasse 1–4", hash: "uhr", speicher: "lt-uhr",
    kapitel: [["lesen", "Uhr lesen"], ["spanne", "Zeitspannen"]], K: UK, S: US, aufgebaut: css });
UK.lesen = (orig => { const f = () => { const d = orig(); d.nachher = zeigerZiehen; return d; }; Object.assign(f, orig); return f; })(UK.lesen);

/* =====================================================================
   4) Größen umrechnen
   ===================================================================== */
const GROESSEN = {
    laenge: { name: "Längen", e: ["km", "m", "dm", "cm", "mm"], f: [1000, 10, 10, 10] },
    gewicht: { name: "Gewichte", e: ["t", "kg", "g", "mg"], f: [1000, 1000, 1000] },
    hohl: { name: "Hohlmaße", e: ["l", "ml"], f: [1000] },
    geld: { name: "Geld", e: ["€", "ct"], f: [100] },
    zeit: { name: "Zeit", e: ["d", "h", "min", "s"], f: [24, 60, 60] }
};
const GS = { kap: "laenge", stufe: "ganz" };
Object.keys(GROESSEN).forEach(k => GS[k] = { w: 3.5, von: 1, nach: 3 });
GS.laenge = { w: 2, von: 1, nach: 3 };
const GK = {};
function treppe(g, von, nach){
    const n = g.e.length, W = 1000, H = 120 + n * 110, bw = 150, bh = 74, dx = Math.min(190, 760 / Math.max(1, n - 1)), dy = 108;
    const X = i => 90 + i * dx, Y = i => 30 + i * dy;
    const lo = Math.min(von, nach), hi = Math.max(von, nach), runter = nach > von;
    let s = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:100%" font-family="Nunito, sans-serif">
      <defs>${[["gr", "#2e9e5b"], ["ro", "#d1342b"], ["gx", "#b9c3cc"]].map(([k, f]) => `<marker id="gP${k}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="${f}"/></marker>`).join("")}</defs>`;
    for (let i = 0; i < n - 1; i++){
        const aktiv = i >= lo && i < hi;
        const ab = aktiv && runter, auf = aktiv && !runter;
        // nach unten (rechts): · Faktor
        const x1 = X(i) + bw - 10, y1 = Y(i) + bh, x2 = X(i + 1) + bw - 20, y2 = Y(i + 1);
        s += `<g${ab ? ` data-s="0"` : ""}><path d="M${x1} ${y1 + 4} C${x1 + 40} ${y1 + 10} ${x2 + 40} ${y2 - 18} ${x2 + 6} ${y2 - 4}" stroke="${ab ? "#2e9e5b" : "#b9c3cc"}" stroke-width="${ab ? 6 : 3}" fill="none" marker-end="url(#gP${ab ? "gr" : "gx"})"/>
              <text x="${x1 + 46}" y="${(y1 + y2) / 2 + 8}" font-size="${ab ? 28 : 22}" font-weight="900" fill="${ab ? "#2e9e5b" : "#9aa8b4"}">· ${g.f[i]}</text></g>`;
        // nach oben (links): : Faktor
        const u1 = X(i + 1) + 14, v1 = Y(i + 1), u2 = X(i) + 24, v2 = Y(i) + bh;
        s += `<g${auf ? ` data-s="0"` : ""}><path d="M${u1} ${v1 - 4} C${u1 - 46} ${v1 - 14} ${u2 - 46} ${v2 + 16} ${u2 - 6} ${v2 + 4}" stroke="${auf ? "#d1342b" : "#b9c3cc"}" stroke-width="${auf ? 6 : 3}" fill="none" marker-end="url(#gP${auf ? "ro" : "gx"})"/>
              <text x="${u2 - 58}" y="${(v1 + v2) / 2 + 8}" text-anchor="end" font-size="${auf ? 28 : 22}" font-weight="900" fill="${auf ? "#d1342b" : "#9aa8b4"}">: ${g.f[i]}</text></g>`;
    }
    for (let i = 0; i < n; i++){
        const f = i === von ? "#557428" : i === nach ? "#e08a2c" : "#fff", tc = i === von || i === nach ? "#fff" : "#2f4a1f";
        s += `<rect x="${X(i)}" y="${Y(i)}" width="${bw}" height="${bh}" rx="14" fill="${f}" stroke="#2f4a1f" stroke-width="3"/><text x="${X(i) + bw / 2}" y="${Y(i) + bh / 2 + 13}" text-anchor="middle" font-size="40" font-weight="900" fill="${tc}">${g.e[i]}</text>`;
    }
    return s + `</svg>`;
}
function groesse(art){
    const fn = () => {
        const g = GROESSEN[art], s = GS[art], { w, von, nach } = s;
        let faktor = 1; const lo = Math.min(von, nach), hi = Math.max(von, nach);
        for (let i = lo; i < hi; i++) faktor *= g.f[i];
        const runter = nach > von, erg = rund(runter ? w * faktor : w / faktor), stufen = hi - lo;
        const zeitGemischt = art === "zeit" && !runter && !Number.isInteger(erg);
        const schritte = [[`Von ${g.e[von]} zu ${g.e[nach]}: ${stufen} Stufe${stufen > 1 ? "n" : ""} ${runter ? "nach unten" : "nach oben"}`, runter ? `<b>· ${faktor}</b> <small>(${g.f.slice(lo, hi).join(" · ")})</small>` : `<b>: ${faktor}</b> <small>(${g.f.slice(lo, hi).join(" · ")})</small>`]];
        if (zeitGemischt){ const ganz = Math.floor(w / faktor), rest = rund(w - ganz * faktor); schritte.push([`${fz(w)} : ${faktor}`, `= ${ganz} Rest ${fz(rest)}`]); schritte.push(["Also", `<b>${fz(w)} ${g.e[von]} = ${ganz} ${g.e[nach]} ${fz(rest)} ${g.e[von]}</b>`]); }
        else { schritte.push([`${fz(w)} ${runter ? "·" : ":"} ${faktor}`, `= <b>${fz(erg)}</b>`]); schritte.push(["Also", `<b>${fz(w)} ${g.e[von]} = ${fz(erg)} ${g.e[nach]}</b>`]); }
        const ergText = zeitGemischt ? `${Math.floor(w / faktor)} ${g.e[nach]} ${fz(rund(w - Math.floor(w / faktor) * faktor))} ${g.e[von]}` : `${fz(erg)} ${g.e[nach]}`;
        return { frage: `Rechne um: ${g.name}`, aufgabe: `${fz(w)} ${g.e[von]} = ${L(ergText)}`, bild: treppe(g, von, nach),
            merke: `<b>Merke</b>Auf der Einheitentreppe geht es <span style="color:#2e9e5b">nach unten mit Malnehmen</span> (kleinere Einheit → mehr) und <span class="rot">nach oben mit Teilen</span> (größere Einheit → weniger). ${art === "zeit" ? "Bei der Zeit ist die Umrechnungszahl nicht immer 10: 1 d = 24 h, 1 h = 60 min, 1 min = 60 s." : "Mit Kommazahlen: Komma um so viele Stellen verschieben, wie die Umrechnungszahl Nullen hat."}`,
            regler: wahl("stufe", [["ganz", "ganze Zahlen"], ["komma", "mit Komma"]], GS.stufe) + `<span class="ek-wahl">${g.e.map((e, i) => `<button data-set="von=${i}" class="${i === von ? "an" : ""}">von ${e}</button>`).join("")}</span><span class="ek-wahl">${g.e.map((e, i) => `<button data-set="nach=${i}" class="${i === nach ? "an" : ""}">in ${e}</button>`).join("")}</span>`,
            schritte };
    };
    fn.set = k => { const s = GS[art]; s.von = +s.von; s.nach = +s.nach; if (k === "stufe"){ GS.stufe = s.stufe; delete s.stufe; } if (s.von === s.nach) s.nach = s.von ? s.von - 1 : 1; fn.neu(true); };
    fn.neu = (behalte) => {
        const g = GROESSEN[art], s = GS[art], n = g.e.length;
        if (!behalte){ s.von = zuf(0, n - 1); do { s.nach = zuf(0, n - 1); } while (s.nach === s.von || Math.abs(s.nach - s.von) > 2); }
        const runter = s.nach > s.von, komma = GS.stufe === "komma" && art !== "zeit";
        let faktor = 1; for (let i = Math.min(s.von, s.nach); i < Math.max(s.von, s.nach); i++) faktor *= g.f[i];
        if (runter) s.w = komma ? rund(zuf(11, 999) / (art === "geld" ? 100 : 10)) : zuf(2, 99);
        else s.w = komma ? zuf(1, 40) * faktor / 10 + zuf(0, 9) * faktor / 100 : zuf(1, 30) * faktor + (art === "zeit" && Math.random() < .5 ? zuf(1, faktor - 1) : 0);
        s.w = rund(s.w);
    };
    return fn;
}
Object.keys(GROESSEN).forEach(k => GK[k] = groesse(k));
GS.kap = "laenge";
const groessen = ET.neu({ id: "groessen", titel: "Größen umrechnen", unter: "Klasse 4–8", hash: "groessen", speicher: "lt-groessen",
    kapitel: Object.entries(GROESSEN).map(([k, g]) => [k, g.name]), K: GK, S: GS, aufgebaut: css });
// gemeinsame Stufe (ganz/komma) gilt für alle Größen
Object.keys(GROESSEN).forEach(k => { const orig = GK[k].set; GK[k].set = (key, v) => { if (key === "stufe"){ GS.stufe = v; delete GS[k].stufe; GK[k].neu(true); return; } orig(key, v); }; });

/* =====================================================================
   5) Prozent & Dezimalzahlen
   ===================================================================== */
const PS = { kap: "dezimal", dezimal: { h: 37 }, umw: { z: 3, n: 4 }, von: { p: 25, g: 80 }, satz: { w: 18, g: 72 } };
const PK = {};
const hf = (an, b) => `<div class="hf">${Array.from({ length: 100 }, (_, i) => `<i class="${i < an ? "an" : ""}${i < an && b ? " b" : ""}"></i>`).join("")}</div>`;
const dez = h => fz(h / 100);
PK.dezimal = () => {
    const h = PS.dezimal.h;
    return { frage: "Wie viel vom Hunderterfeld ist gefärbt? Schreibe es auf drei Arten.", bild: hf(h),
        merke: `<b>Merke</b>Prozent heißt „von Hundert“. ${B(h, 100)} = ${dez(h)} = ${h} %. Das ganze Feld sind 100 % = 1.`,
        regler: stepper("Felder", "h", h) + `<span class="ek-wahl"><button data-st="h" data-d="-10">− 10</button><button data-st="h" data-d="10">+ 10</button></span>`,
        schritte: [["Gefärbte Felder von 100", `<b>${h}</b> von 100`], ["Als Bruch", `${B(h, 100)}`], ["Als Dezimalzahl", `<b>${dez(h)}</b>`], ["In Prozent", `<b>${h} %</b>`]] };
};
PK.dezimal.st = (k, d) => { PS.dezimal.h = grenze(PS.dezimal.h + d, 0, 100); };
PK.dezimal.neu = () => { PS.dezimal.h = zuf(1, 99); };
const NENNER = [2, 4, 5, 10, 20, 25, 50];
PK.umw = () => {
    const { z, n } = PS.umw, k = 100 / n, h = z * k;
    return { frage: `Wandle ${B(z, n)} in eine Dezimalzahl und in Prozent um.`, aufgabe: `${B(z, n)} = ${L(dez(h))} = ${L(h + " %")}`, bild: hf(h, true),
        merke: `<b>Merke</b>Erweitere den Bruch so, dass unten <b>100</b> steht. Dann kannst du Dezimalzahl und Prozent direkt ablesen. Wichtige Werte: ${B(1, 2)} = 50 %, ${B(1, 4)} = 25 %, ${B(3, 4)} = 75 %, ${B(1, 5)} = 20 %, ${B(1, 10)} = 10 %.`,
        schritte: [[`Mit welcher Zahl erweitern, damit unten 100 steht?`, `100 : ${n} = <b>${k}</b>`], [`${B(z, n)} erweitert mit ${k}`, `${B(h, 100)}`], ["Als Dezimalzahl", `<b>${dez(h)}</b>`], ["In Prozent", `<b>${h} %</b>`]] };
};
PK.umw.neu = () => { const n = nimm(NENNER); PS.umw.n = n; PS.umw.z = zuf(1, n - 1); };
PK.von = () => {
    const { p, g } = PS.von, w = rund(p * g / 100);
    let weg;
    if (p === 50 || p === 25 || p === 75 || p === 20){ const [zz2, nn] = { 50: [1, 2], 25: [1, 4], 75: [3, 4], 20: [1, 5] }[p]; weg = [[`${p} % ist ${B(zz2, nn)}`, `${fz(g)} : ${nn}${zz2 > 1 ? ` · ${zz2}` : ""}`], ["Ergebnis", `<b>${fz(w)}</b>`]]; }
    else if (p % 10 === 0){ weg = [[`Zuerst 10 %: ${fz(g)} : 10`, `10 % = <b>${fz(g / 10)}</b>`], [`${p} % sind ${p / 10} · 10 %`, `${p / 10} · ${fz(g / 10)} = <b>${fz(w)}</b>`]]; }
    else { weg = [[`Zuerst 1 %: ${fz(g)} : 100`, `1 % = <b>${fz(g / 100)}</b>`], [`${p} % sind ${p} · 1 %`, `${p} · ${fz(g / 100)} = <b>${fz(w)}</b>`]]; }
    const W = 900, x0 = 40, x1 = 860, X = q => x0 + q / 100 * (x1 - x0);
    const bild = `<svg viewBox="0 0 ${W} 300" style="width:100%;height:100%" font-family="Nunito, sans-serif">
        <rect x="${x0}" y="110" width="${x1 - x0}" height="70" rx="10" fill="#eef2f6" stroke="#2f4a1f" stroke-width="3"/>
        <rect x="${x0}" y="110" width="${X(p) - x0}" height="70" rx="10" fill="#557428"/>
        ${[0, 25, 50, 75, 100].map(q => `<line x1="${X(q)}" y1="100" x2="${X(q)}" y2="190" stroke="#2f4a1f" stroke-width="${q % 50 ? 2 : 3}"/><text x="${X(q)}" y="88" text-anchor="middle" font-size="22" font-weight="800" fill="#7c8a96">${q} %</text><text x="${X(q)}" y="220" text-anchor="middle" font-size="22" font-weight="800" fill="#7c8a96">${fz(g * q / 100)}</text>`).join("")}
        <text x="${X(p)}" y="60" text-anchor="middle" font-size="30" font-weight="900" fill="#557428">${p} %</text>
        <text data-s="${weg.length - 1}" x="${X(p)}" y="262" text-anchor="middle" font-size="32" font-weight="900" fill="#e08a2c">${fz(w)}</text></svg>`;
    return { frage: `Wie viel sind <b>${p} %</b> von <b>${fz(g)}</b>?`, aufgabe: `${p} % von ${fz(g)} = ${L(fz(w))}`, bild,
        merke: `<b>Merke</b>Der <b>Grundwert</b> (hier ${fz(g)}) sind immer 100 %. Rechne über einen leichten Zwischenschritt: 1 %, 10 % oder einen bekannten Bruch.`, schritte: weg };
};
PK.von.neu = () => { const p = nimm([10, 20, 25, 30, 40, 50, 60, 75, 15, 5, 35, 12]); let g; do { g = nimm([40, 60, 80, 120, 150, 200, 240, 300, 360, 400, 500, 800]); } while (p * g % 100 && Math.random() < .8); PS.von.p = p; PS.von.g = g; };
PK.satz = () => {
    const { w, g } = PS.satz, p = rund(w / g * 100);
    const t = (a, b) => { let x = a, y = b; while (y) [x, y] = [y, x % y]; return x; }, k = t(w, g), z2 = w / k, n2 = g / k;
    return { frage: `Wie viel Prozent sind <b>${fz(w)}</b> von <b>${fz(g)}</b>?`, aufgabe: `${fz(w)} von ${fz(g)} = ${L(fz(p) + " %")}`, bild: hf(Math.round(p)),
        merke: `<b>Merke</b>Schreibe den Anteil als Bruch: Teil durch Ganzes. Kürze ihn und erweitere dann auf 100 – oder rechne Teil : Ganzes · 100.`,
        schritte: [["Anteil als Bruch", `${B(w, g)}`], [k > 1 ? `Kürzen mit ${k}` : "Der Bruch lässt sich nicht kürzen", `${B(z2, n2)}`], [`Auf 100 erweitern (oder ${z2} : ${n2} · 100)`, 100 % n2 === 0 ? `${B(z2 * 100 / n2, 100)}` : `${fz(z2)} : ${fz(n2)} · 100 = ${fz(p)}`], ["In Prozent", `<b>${fz(p)} %</b>`]] };
};
PK.satz.neu = () => { const n = nimm([2, 4, 5, 10, 20, 25]), z = zuf(1, n - 1), f = zuf(2, 12); PS.satz.w = z * f; PS.satz.g = n * f; };

const prozent = ET.neu({ id: "prozent", titel: "Prozent & Dezimalzahlen", unter: "Klasse 6–8", hash: "prozent", speicher: "lt-prozent",
    kapitel: [["dezimal", "Hunderterfeld"], ["umw", "Bruch → Dezimal → %"], ["von", "Prozent von …"], ["satz", "Wie viel Prozent?"]], K: PK, S: PS, aufgebaut: css });

window.tafelMathe = { schriftlich, stellen, uhr, groessen, prozent, _zahlwort: zahlwort, _gesprochen: gesprochen };
})();
