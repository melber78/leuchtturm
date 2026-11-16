/* ============================================================
   Leuchtturm – Ella-Quiz: Fragen nach Klasse, Fach und Thema
   Jedes Thema hat einen Generator gen(n) → n Fragen.
   Frage: { f: "Text", a: ["richtig", "falsch", …], bild: "SVG/Emoji", e: "Erklärung", h: "Vorlesetext" }
   Die richtige Antwort steht in den Daten immer ZUERST, gemischt wird beim Anzeigen.
   Antworten, die mit "bild:" beginnen, werden als Bild angezeigt (bild:hund → Bild aus bilder.js).
   Mathe und viele Deutsch-Themen werden immer neu erzeugt – so gibt es unbegrenzt Fragen.
   ============================================================ */
"use strict";
(function () {

/* ---------- Helfer ---------- */
const zufall = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const mischen = l => { const a = l.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const ziehe = (l, n) => mischen(l).slice(0, n);
const eins = l => l[Math.floor(Math.random() * l.length)];
// Zahlen-Antworten: die richtige + 2–3 nahe, verschiedene, nicht negative
function zahlen(r, streu, anzahl){
    const s = new Set([r]); let n = 0; anzahl = anzahl || 4; streu = streu || 3;
    while (s.size < anzahl && n++ < 200) { const d = zufall(1, streu) * (Math.random() < .5 ? -1 : 1); if (r + d >= 0) s.add(r + d); }
    return [...s].map(String);
}
// Aus einer festen Liste: [Frage, richtig, falsch…, {e, bild, h}?] → Fragen
function liste(daten){ return n => ziehe(daten, n).map(x => { const extra = typeof x[x.length - 1] === "object" ? x[x.length - 1] : null; const ant = x.slice(1, extra ? -1 : undefined); return Object.assign({ f: x[0], a: ant }, extra || {}); }); }
// Generator aus einer Funktion, die EINE Frage erzeugt (ohne doppelte Fragen)
function viele(eine){ return n => { const l = [], gesehen = new Set(); let v = 0; while (l.length < n && v++ < n * 30) { const q = eine(); const key = q.f + (q.bild || "") + q.a.join("|"); if (gesehen.has(key)) continue; gesehen.add(key); l.push(q); } return l; }; }
const W = () => (window.LERN_DATEN && window.LERN_DATEN.woerter) || [];
const bild = b => "bild:" + b;
const gz = x => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, " ");   // 21 128 – Tausender mit Leerzeichen wie in der Schule

/* ---------- Bilder: Uhr, Mengen, Rechteck ---------- */
function uhrSvg(h, m){
    const w = (m / 60) * 360, s = ((h % 12) + m / 60) * 30;
    const zahl = i => { const a = (i * 30 - 90) * Math.PI / 180; return `<text x="${50 + 36 * Math.cos(a)}" y="${54 + 36 * Math.sin(a)}" text-anchor="middle" font-size="11" font-weight="700" font-family="Nunito,Arial" fill="#16324a">${i}</text>`; };
    const strich = i => { const a = (i * 6) * Math.PI / 180, r1 = i % 5 ? 44 : 41; return `<line x1="${50 + r1 * Math.sin(a)}" y1="${50 - r1 * Math.cos(a)}" x2="${50 + 46 * Math.sin(a)}" y2="${50 - 46 * Math.cos(a)}" stroke="#16324a" stroke-width="${i % 5 ? .8 : 1.8}"/>`; };
    return `<svg viewBox="0 0 100 100" class="q-uhr"><circle cx="50" cy="50" r="48" fill="#fff" stroke="#16324a" stroke-width="3"/>${Array.from({ length: 60 }, (_, i) => strich(i)).join("")}${Array.from({ length: 12 }, (_, i) => zahl(i + 1)).join("")}
        <line x1="50" y1="50" x2="${50 + 22 * Math.sin(s * Math.PI / 180)}" y2="${50 - 22 * Math.cos(s * Math.PI / 180)}" stroke="#e2574c" stroke-width="5" stroke-linecap="round"/>
        <line x1="50" y1="50" x2="${50 + 34 * Math.sin(w * Math.PI / 180)}" y2="${50 - 34 * Math.cos(w * Math.PI / 180)}" stroke="#16324a" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="50" r="3" fill="#16324a"/></svg>`;
}
const menge = (e, k) => `<div class="q-menge">${Array.from({ length: k }, () => `<span>${e}</span>`).join("")}</div>`;
const zeit = (h, m) => h + ":" + String(m).padStart(2, "0") + " Uhr";
function uhrWorte(h, m){
    const n = h % 12 || 12, n1 = (h % 12) + 1 || 1;
    if (m === 0) return n + " Uhr"; if (m === 30) return "halb " + n1; if (m === 15) return "Viertel nach " + n; if (m === 45) return "Viertel vor " + n1;
    return m < 30 ? m + " nach " + n : (60 - m) + " vor " + n1;
}

/* ============================== MATHE ============================== */
const M = {
    zaehlen: max => viele(() => { const k = zufall(2, max), e = eins(["🍎", "⭐", "🐟", "🎈", "🐞", "🌸", "⚽", "🍓"]); return { f: "Wie viele sind es?", bild: menge(e, k), a: zahlen(k, 2, 3), h: "Wie viele sind es? Zähle genau." }; }),
    plus: (max, ohneUeber) => viele(() => { let a, b; do { a = zufall(0, max); b = zufall(0, max - a); } while (ohneUeber && (a % 10) + (b % 10) >= 10); return { f: `${a} + ${b} = ?`, a: zahlen(a + b, 3), h: `${a} plus ${b}` }; }),
    minus: (max, ohneUeber) => viele(() => { let a, b; do { a = zufall(1, max); b = zufall(0, a); } while (ohneUeber && (a % 10) < (b % 10)); return { f: `${a} − ${b} = ?`, a: zahlen(a - b, 3), h: `${a} minus ${b}` }; }),
    ergaenzen: ziel => viele(() => { const a = ziel === 10 ? zufall(1, 9) : zufall(1, 19) * 5 - zufall(0, 4); return { f: `${a} + ? = ${ziel}`, a: zahlen(ziel - a, 3), h: `${a} plus wie viel gleich ${ziel}?` }; }),
    vergleich: max => viele(() => { const a = zufall(0, max), b = Math.random() < .2 ? a : zufall(0, max); const r = a < b ? "<" : a > b ? ">" : "="; return { f: `${a}  ?  ${b}`, a: [r].concat(["<", ">", "="].filter(x => x !== r)), e: "Das Krokodil frisst immer die größere Zahl: Das Maul zeigt zur größeren Zahl.", h: `Welches Zeichen passt zwischen ${a} und ${b}?` }; }),
    nachbar: max => viele(() => { const z = zufall(1, max - 1), vor = Math.random() < .5; return { f: `Welche Zahl kommt ${vor ? "vor" : "nach"} ${z}?`, a: [String(vor ? z - 1 : z + 1), String(vor ? z + 1 : z - 1), String(vor ? z - 2 : z + 2)], h: `Welche Zahl kommt ${vor ? "vor" : "nach"} ${z}?` }; }),
    verdoppeln: max => viele(() => { const z = zufall(1, max), d = Math.random() < .5; return d ? { f: `Verdopple ${z}.`, a: zahlen(2 * z, 3), e: `${z} + ${z} = ${2 * z}` } : { f: `Was ist die Hälfte von ${2 * z}?`, a: zahlen(z, 3), e: `${z} + ${z} = ${2 * z}` }; }),
    mal: reihen => viele(() => { const r = eins(reihen), k = zufall(1, 10); return Math.random() < .5 ? { f: `${k} · ${r} = ?`, a: zahlen(k * r, r <= 2 ? 2 : 4).map(String), h: `${k} mal ${r}` } : { f: `${r} · ${k} = ?`, a: zahlen(k * r, r <= 2 ? 2 : 4), h: `${r} mal ${k}` }; }),
    geteilt: reihen => viele(() => { const r = eins(reihen), k = zufall(1, 10); return { f: `${k * r} : ${r} = ?`, a: zahlen(k, 2), e: `${k} · ${r} = ${k * r}`, h: `${k * r} geteilt durch ${r}` }; }),
    zehner: max => viele(() => { const z = zufall(11, max), z10 = Math.floor(z / 10) % 10, e = z % 10, art = eins(["Z", "E"]);
        return { f: `Wie viele ${art === "Z" ? "Zehner" : "Einer"} hat die Zahl ${z}?`, a: [String(art === "Z" ? z10 : e)].concat(zahlen(art === "Z" ? z10 : e, 3).slice(1)), e: `${z} = ${z10} Zehner und ${e} Einer` }; }),
    stellen: max => viele(() => { const z = zufall(101, max), s = String(z), n = s.length, h = +s[n - 3], zz = +s[n - 2], e = +s[n - 1], t = Math.floor(z / 1000);
        const tausch = (i, j) => { const a = s.split(""); [a[i], a[j]] = [a[j], a[i]]; return a.join("").replace(/^0+/, "") || "0"; };
        const fmt = x => gz(+x);
        const falsch = [...new Set([tausch(n - 2, n - 1), tausch(n - 3, n - 2), String(z + (zz === 9 ? -10 : 10)), String(z + 100)])].filter(x => x !== s);
        return { f: `${t ? fmt(t) + " T, " : ""}${h} H, ${zz} Z, ${e} E – welche Zahl ist das?`, a: [fmt(s)].concat(falsch.slice(0, 3).map(fmt)), e: "T = Tausender, H = Hunderter, Z = Zehner, E = Einer" }; }),
    plus100: (max, step) => viele(() => { const a = zufall(10, max - 10), b = zufall(1, Math.min(max - a, step || 50)); return { f: `${a} + ${b} = ?`, a: zahlen(a + b, 10).map(String), h: `${a} plus ${b}` }; }),
    minus100: (max, step) => viele(() => { const a = zufall(20, max), b = zufall(1, Math.min(a, step || 50)); return { f: `${a} − ${b} = ?`, a: zahlen(a - b, 10), h: `${a} minus ${b}` }; }),
    uhr: art => viele(() => { const h = zufall(1, 12); const m = art === "voll" ? eins([0, 0, 30]) : art === "viertel" ? eins([0, 15, 30, 45]) : zufall(0, 11) * 5;
        const falsch = [[h, (m + 30) % 60], [(h % 12) + 1, m], [h, m === 0 ? 30 : 0], [(h + 10) % 12 + 1, m]].filter(([a, b]) => !(a === h && b === m));
        const w = art === "fuenf" ? (a, b) => zeit(a, b) : uhrWorte;
        const opts = [...new Set([w(h, m)].concat(falsch.map(([a, b]) => w(a, b))))].slice(0, 4);
        return { f: "Wie spät ist es?", bild: uhrSvg(h, m), a: opts, e: "Der kurze rote Zeiger zeigt die Stunden, der lange die Minuten." }; }),
    zeitspanne: viele(() => { const h = zufall(7, 15), m = zufall(0, 11) * 5, d = eins([15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 90]); const e = (h * 60 + m + d), eh = Math.floor(e / 60), em = e % 60;
        return { f: `Von ${zeit(h, m)} bis ${zeit(eh, em)} – wie lange dauert das?`, a: [d + " min", (d + 10) + " min", (d - 5 > 0 ? d - 5 : d + 20) + " min", (d + 30) + " min"] }; }),
    geld: stufe => viele(() => { if (stufe === 2) { const a = zufall(1, 10), b = zufall(1, 10); return { f: `${a} € + ${b} € = ?`, a: zahlen(a + b, 3).map(x => x + " €") }; }
        const p = zufall(1, 19) * 5 + zufall(0, 4) * 100, g = (Math.floor(p / 100) + 1) * 100 + (Math.random() < .5 ? 0 : 500), r = g - p, ct = x => (x / 100).toFixed(2).replace(".", ",") + " €";
        return { f: `Du kaufst etwas für ${ct(p)} und zahlst mit ${ct(g)}. Wie viel Rückgeld bekommst du?`, a: [ct(r), ct(r + 10), ct(Math.max(5, r - 10)), ct(r + 100)].filter((x, i, l) => l.indexOf(x) === i) }; }),
    groessen: stufe => liste(stufe === 3 ? [
        ["1 m = ? cm", "100 cm", "10 cm", "1000 cm"], ["1 cm = ? mm", "10 mm", "100 mm", "1 mm"], ["1 km = ? m", "1000 m", "100 m", "10 m"], ["1 kg = ? g", "1000 g", "100 g", "10 g"],
        ["1 h = ? min", "60 min", "100 min", "30 min"], ["1 min = ? s", "60 s", "100 s", "10 s"], ["3 m = ? cm", "300 cm", "30 cm", "3000 cm"], ["2 kg = ? g", "2000 g", "200 g", "20 g"],
        ["Was ist länger?", "1 km", "100 m", "800 m"], ["Was ist schwerer?", "1 kg", "500 g", "900 g"], ["Ein Tag hat … Stunden.", "24", "12", "60"], ["Ein Jahr hat … Monate.", "12", "10", "52"],
        ["Wie lang ist ungefähr ein Bleistift?", "15 cm", "15 m", "15 mm"], ["Wie schwer ist ungefähr eine Tafel Schokolade?", "100 g", "100 kg", "1 g"]
    ] : [
        ["2,5 m = ? cm", "250 cm", "25 cm", "2500 cm"], ["3 km 500 m = ? m", "3500 m", "350 m", "3050 m"], ["1 l = ? ml", "1000 ml", "100 ml", "10 ml"], ["750 g + 250 g = ?", "1 kg", "1000 kg", "10 kg"],
        ["1 t = ? kg", "1000 kg", "100 kg", "10 000 kg"], ["4 000 g = ? kg", "4 kg", "40 kg", "400 kg"], ["90 min = ?", "1 h 30 min", "1 h 50 min", "1 h 9 min"], ["Ein halber Liter sind …", "500 ml", "50 ml", "250 ml"],
        ["120 s = ? min", "2 min", "12 min", "1 min 20 s"], ["0,5 km = ? m", "500 m", "50 m", "5000 m"], ["Wie viel wiegt ungefähr ein Auto?", "1 t", "1 kg", "100 g"], ["Wie viel passt ungefähr in einen Eimer?", "10 l", "10 ml", "1000 l"],
        ["365 Tage sind …", "1 Jahr", "1 Monat", "10 Wochen"], ["Eine Woche hat … Stunden.", "168", "24", "70"]
    ]),
    runden: viele(() => { const z = zufall(1001, 99999), stelle = eins([10, 100, 1000]), r = Math.round(z / stelle) * stelle, f = Math.floor(z / stelle) * stelle, c = Math.ceil(z / stelle) * stelle;
        const fmt = gz; return { f: `Runde ${fmt(z)} auf ${stelle === 10 ? "Zehner" : stelle === 100 ? "Hunderter" : "Tausender"}.`, a: [...new Set([fmt(r), fmt(r === f ? c : f), fmt(r + stelle), fmt(Math.max(0, r - stelle)), fmt(r + 2 * stelle)])].slice(0, 4), e: "Ab 5 wird aufgerundet, bis 4 abgerundet." }; }),
    schriftlich: viele(() => { const art = eins(["+", "−", "·", ":"]); let a, b, r;
        if (art === "+") { a = zufall(120, 700); b = zufall(110, 980 - a); r = a + b; } else if (art === "−") { a = zufall(400, 999); b = zufall(101, a - 50); r = a - b; }
        else if (art === "·") { a = zufall(12, 250); b = zufall(2, 9); r = a * b; } else { b = zufall(2, 9); r = zufall(12, 150); a = r * b; }
        return { f: `${a} ${art} ${b} = ?`, a: [String(r), String(r + 10), String(r - 1 > 0 ? r - 1 : r + 1), String(r + 100)] }; }),
    formen: liste([
        ["Wie heißt diese Form? 🔺", "Dreieck", "Viereck", "Kreis"], ["Wie heißt diese Form? ⚪", "Kreis", "Dreieck", "Quadrat"], ["Wie heißt diese Form? 🟦", "Quadrat", "Kreis", "Dreieck"],
        ["Wie viele Ecken hat ein Dreieck?", "3", "4", "0"], ["Wie viele Ecken hat ein Quadrat?", "4", "3", "5"], ["Wie viele Ecken hat ein Kreis?", "0", "1", "4"],
        ["Welche Form hat ein Fußball?", "Kugel", "Würfel", "Quader"], ["Welche Form hat ein Spielwürfel?", "Würfel", "Kugel", "Zylinder"], ["Welche Form hat eine Dose?", "Zylinder", "Kugel", "Würfel"],
        ["Ein Rechteck hat … Seiten.", "4", "3", "6"], ["Welche Form rollt am besten?", "Kugel", "Würfel", "Quader"], ["Wie viele Flächen hat ein Würfel?", "6", "4", "8"]
    ]),
    geometrie: liste([
        ["Ein Rechteck ist 5 cm lang und 3 cm breit. Wie groß ist der Umfang?", "16 cm", "15 cm", "8 cm"], ["Ein Quadrat hat 4 cm lange Seiten. Wie groß ist der Umfang?", "16 cm", "8 cm", "12 cm"],
        ["Ein Rechteck ist 6 Kästchen lang und 4 breit. Wie viele Kästchen passen hinein?", "24", "20", "10"], ["Wie viele Symmetrieachsen hat ein Quadrat?", "4", "2", "1"],
        ["Wie viele Kanten hat ein Würfel?", "12", "8", "6"], ["Wie viele Ecken hat ein Würfel?", "8", "6", "12"], ["Ein rechter Winkel hat …", "90°", "45°", "180°"],
        ["Welche Form hat keine Ecken?", "Kreis", "Quadrat", "Dreieck"], ["Ein Quadrat ist auch ein …", "Rechteck", "Dreieck", "Kreis"], ["Welcher Körper hat nur eine Spitze?", "Kegel", "Würfel", "Zylinder"]
    ]),
    sachaufgaben: stufe => liste(stufe <= 2 ? [
        ["Tim hat 5 Murmeln. Er bekommt 3 dazu. Wie viele hat er jetzt?", "8", "2", "9"], ["Auf dem Baum sitzen 7 Vögel. 4 fliegen weg. Wie viele bleiben?", "3", "11", "4"],
        ["Mia hat 10 Bonbons. Sie gibt 6 ab. Wie viele hat sie noch?", "4", "16", "5"], ["In der Kiste sind 6 Äpfel. Mama legt 6 dazu. Wie viele sind es?", "12", "0", "10"],
        ["3 Kinder haben je 2 Stifte. Wie viele Stifte sind das?", "6", "5", "8"], ["Ein Eis kostet 2 €. Wie viel kosten 4 Eis?", "8 €", "6 €", "2 €"],
        ["Im Bus sitzen 12 Kinder. 5 steigen aus. Wie viele sind noch im Bus?", "7", "17", "8"], ["Oma backt 20 Kekse. Die Hälfte wird gegessen. Wie viele sind übrig?", "10", "5", "15"]
    ] : [
        ["Ein Buch hat 120 Seiten. Lena hat 75 gelesen. Wie viele fehlen noch?", "45", "55", "195"], ["36 Kinder fahren in 4 gleich großen Gruppen. Wie viele sind in einer Gruppe?", "9", "8", "32"],
        ["Eine Kinokarte kostet 7 €. Wie viel kosten 6 Karten?", "42 €", "13 €", "48 €"], ["Der Zug fährt um 9:45 Uhr ab und ist 25 min unterwegs. Wann kommt er an?", "10:10 Uhr", "10:20 Uhr", "9:70 Uhr"],
        ["Ein Fahrrad kostet 240 €. Paul hat schon 185 €. Wie viel fehlt?", "55 €", "65 €", "425 €"], ["5 Freunde teilen 45 € gerecht. Wie viel bekommt jeder?", "9 €", "8 €", "40 €"],
        ["Ein Garten ist 8 m lang und 5 m breit. Wie lang ist der Zaun rundherum?", "26 m", "40 m", "13 m"], ["In einer Packung sind 12 Eier. Wie viele Eier sind in 5 Packungen?", "60", "17", "50"]
    ]),
};

/* ============================== DEUTSCH ============================== */
const LAUTE = "ABDEFGHIKLMNOPRSTUWZ".split("");
const D = {
    anlaut: viele(() => { const x = eins(W().filter(w => w.klar && w.w.length <= 8)); const r = x.an; return { f: "Womit fängt das Wort an?", bild: bild(x.b), a: [r].concat(ziehe(LAUTE.filter(l => l !== r), 2)), h: x.w, e: x.w + " fängt mit " + r + " an." }; }),
    silben: viele(() => { const x = eins(W()); const r = x.n; return { f: "Wie viele Silben?", bild: bild(x.b), a: [String(r)].concat([1, 2, 3, 4].filter(n => n !== r).slice(0, 2).map(String)), h: x.w, e: x.s.replace(/-/g, " – ") }; }),
    lesen: viele(() => { const l = W().filter(w => w.w.length <= 6), x = eins(l); const falsch = ziehe(l.filter(w => w.b !== x.b), 2); return { f: `Lies: **${x.w}**`, a: [bild(x.b)].concat(falsch.map(w => bild(w.b))) }; }),
    reime: viele(() => { const R = (window.LERN_DATEN && window.LERN_DATEN.reime) || []; const [a, b] = eins(R), L = W(), wb = L.find(w => w.b === b); const falsch = ziehe(L.filter(w => w.b !== a && w.b !== b), 2);
        return { f: "Was reimt sich?", bild: bild(a), a: [bild(b)].concat(falsch.map(w => bild(w.b))), h: (L.find(w => w.b === a) || {}).w || "", e: wb ? "Es reimt sich auf " + wb.w + "." : "" }; }),
    artikel: viele(() => { const x = eins(W()); return { f: `__ ${x.w}`, bild: bild(x.b), a: [x.a].concat(["der", "die", "das"].filter(y => y !== x.a)), h: x.w, e: x.a + " " + x.w }; }),
    gross: viele(() => { const WA = (window.LERN_DATEN && window.LERN_DATEN.wortarten) || { Nomen: [], Verben: [], Adjektive: [] }; const nomen = Math.random() < .5;
        const w = nomen ? eins(WA.Nomen) : eins(WA.Verben.concat(WA.Adjektive)); return { f: `Groß oder klein? **${w.toLowerCase()}**`, a: nomen ? ["groß", "klein"] : ["klein", "groß"], e: nomen ? `Begleiter-Probe: der/die/das ${w} ✓ → groß` : "Kein Begleiter möglich → klein" }; }),
    wortarten: viele(() => { const WA = (window.LERN_DATEN && window.LERN_DATEN.wortarten) || {}; const art = eins(["Nomen", "Verben", "Adjektive"]), w = eins(WA[art] || ["Hund"]);
        const name = { Nomen: "Nomen", Verben: "Verb", Adjektive: "Adjektiv" }[art]; return { f: `Welche Wortart ist **${w}**?`, a: [name].concat(["Nomen", "Verb", "Adjektiv"].filter(x => x !== name)), e: "Proben: der/die/das … → Nomen · ich … → Verb · ganz … → Adjektiv" }; }),
    abc: viele(() => { const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; const i = zufall(1, 24), nach = Math.random() < .5; const r = ABC[nach ? i + 1 : i - 1];
        return { f: `Welcher Buchstabe kommt ${nach ? "nach" : "vor"} **${ABC[i]}**?`, a: [r, ABC[nach ? i - 1 : i + 1], ABC[(i + 3) % 26]] }; }),
    abcWoerter: stufe => viele(() => { const L = W().map(w => w.w); let ws;
        if (stufe === 2) { do { ws = ziehe(L, 3); } while (new Set(ws.map(w => w[0])).size < 3); } else { const gr = {}; L.forEach(w => { const k = w.slice(0, 2); (gr[k] = gr[k] || []).push(w); }); const ok = Object.values(gr).filter(g => g.length >= 3); ws = ziehe(eins(ok), 3); }
        const r = ws.slice().sort((a, b) => a.localeCompare(b, "de"))[0]; return { f: "Welches Wort steht im ABC zuerst?", a: [r].concat(ws.filter(w => w !== r)), e: stufe === 2 ? "Schau auf den ersten Buchstaben." : "Gleicher Anfang? Dann entscheidet der nächste Buchstabe." }; }),
    mehrzahl: liste([["der Baum – die …", "Bäume", "Baums", "Baumen"], ["das Haus – die …", "Häuser", "Hause", "Hauses"], ["die Maus – die …", "Mäuse", "Mause", "Mäusen"], ["der Ball – die …", "Bälle", "Balle", "Balls"],
        ["das Kind – die …", "Kinder", "Kinde", "Kinds"], ["die Blume – die …", "Blumen", "Blumes", "Blümer"], ["der Hund – die …", "Hunde", "Hünde", "Hunds"], ["das Buch – die …", "Bücher", "Buche", "Buchs"],
        ["der Apfel – die …", "Äpfel", "Apfels", "Apfeln"], ["die Hand – die …", "Hände", "Handen", "Hands"], ["der Vogel – die …", "Vögel", "Vogels", "Vogeln"], ["das Auto – die …", "Autos", "Autoen", "Auten"],
        ["die Nacht – die …", "Nächte", "Nachten", "Nachts"], ["der Zahn – die …", "Zähne", "Zahnen", "Zahns"], ["das Rad – die …", "Räder", "Rade", "Radde"]]),
    gegenteil: liste([["Was ist das Gegenteil von **groß**?", "klein", "lang", "dick"], ["Was ist das Gegenteil von **laut**?", "leise", "langsam", "leer"], ["Was ist das Gegenteil von **warm**?", "kalt", "nass", "hell"],
        ["Was ist das Gegenteil von **schnell**?", "langsam", "leise", "schwer"], ["Was ist das Gegenteil von **hell**?", "dunkel", "leicht", "kalt"], ["Was ist das Gegenteil von **alt**?", "neu", "klein", "gut"],
        ["Was ist das Gegenteil von **voll**?", "leer", "rund", "weich"], ["Was ist das Gegenteil von **oben**?", "unten", "hinten", "drinnen"], ["Was ist das Gegenteil von **lachen**?", "weinen", "rufen", "singen"],
        ["Was ist das Gegenteil von **Tag**?", "Nacht", "Abend", "Woche"], ["Was ist das Gegenteil von **hart**?", "weich", "schwer", "kurz"], ["Was ist das Gegenteil von **nass**?", "trocken", "kalt", "sauber"]]),
    satzzeichen: liste([["Kommst du mit ins Kino", "?", ".", "!"], ["Heute ist Montag", ".", "?", "!"], ["Pass auf", "!", "?", "."], ["Wie heißt du", "?", ".", "!"], ["Der Hund schläft", ".", "!", "?"],
        ["Räum dein Zimmer auf", "!", "?", "."], ["Wann beginnt das Spiel", "?", "!", "."], ["Morgen fahren wir ans Meer", ".", "?", "!"], ["Hilfe, mein Fahrrad ist weg", "!", ".", "?"], ["Hast du Hunger", "?", ".", "!"]].map(x => ["Welches Zeichen fehlt? **" + x[0] + "**", ...x.slice(1)])),
    verlaengern: liste([["Kor_ – b oder p?", "b", "p", { e: "Kör-be" }], ["Hun_ – d oder t?", "d", "t", { e: "Hun-de" }], ["Zwer_ – g oder k?", "g", "k", { e: "Zwer-ge" }], ["Bro_ – d oder t?", "t", "d", { e: "Bro-te" }],
        ["Wal_ – d oder t?", "d", "t", { e: "Wäl-der" }], ["Die_ – b oder p?", "b", "p", { e: "Die-be" }], ["Ber_ – g oder k?", "g", "k", { e: "Ber-ge" }], ["Zu_ – g oder k?", "g", "k", { e: "Zü-ge" }],
        ["Ra_ – d oder t?", "d", "t", { e: "Rä-der" }], ["Kal_ – b oder p?", "b", "p", { e: "Käl-ber" }], ["Hem_ – d oder t?", "d", "t", { e: "Hem-den" }], ["Ta_ – g oder k?", "g", "k", { e: "Ta-ge" }],
        ["Mon_ – d oder t?", "d", "t", { e: "Mon-de" }], ["Gel_ – d oder t?", "d", "t", { e: "Gel-der" }], ["lie_ – b oder p?", "b", "p", { e: "der lie-be Hund" }], ["klu_ – g oder k?", "g", "k", { e: "die klu-ge Eule" }]]),
    wortfamilie: liste([["Welches Wort gehört zur Familie **fahren**?", "Fahrrad", "Farbe", "Ferien"], ["Welches Wort gehört zur Familie **spielen**?", "Spielplatz", "Spiegel", "Spinne"],
        ["Welches Wort gehört zur Familie **Haus**?", "Haustür", "Hase", "Haut"], ["Welches Wort gehört zur Familie **backen**?", "Bäcker", "Backe", "Bach"], ["Welches Wort gehört zur Familie **lesen**?", "Leser", "leise", "Löwe", { e: "Leser kommt von lesen – leise klingt nur ähnlich." }],
        ["Welches Wort gehört zur Familie **Schule**?", "Schüler", "Schuh", "Schaukel"], ["Welches Wort gehört zur Familie **malen**?", "Maler", "Mahlzeit", "Mal"], ["Welches Wort gehört zur Familie **Kälte**?", "kalt", "Kelle", "Keller", { e: "Kälte kommt von kalt – darum ä." }]]),
    ableiten: liste([["H_user (Haus) – e oder ä?", "ä", "e", { e: "Häuser kommt von Haus → äu" }], ["B_ume (Baum) – eu oder äu?", "äu", "eu", { e: "Bäume kommt von Baum" }], ["K_lte (kalt) – e oder ä?", "ä", "e"],
        ["L_ute (Leute) – eu oder äu?", "eu", "äu", { e: "Leute – kein Wort mit au, darum eu" }], ["M_use (Maus) – eu oder äu?", "äu", "eu"], ["F_ld (Feld) – e oder ä?", "e", "ä"], ["W_lder (Wald) – e oder ä?", "ä", "e"],
        ["H_nde (Hand) – e oder ä?", "ä", "e"], ["Fr_unde (Freund) – eu oder äu?", "eu", "äu"], ["l_uft (laufen) – eu oder äu?", "äu", "eu"]]),
    zeitformen3: liste([["Vergangenheit von **gehen**: ich …", "ging", "gehe", "gegeht"], ["Vergangenheit von **laufen**: er …", "lief", "laufte", "läuft"], ["Vergangenheit von **spielen**: wir …", "spielten", "spielen", "spielden"],
        ["Vergangenheit von **essen**: sie …", "aß", "esste", "isst"], ["Vergangenheit von **sehen**: ich …", "sah", "sehte", "sehe"], ["Vergangenheit von **schreiben**: du …", "schriebst", "schreibtest", "schreibst"],
        ["Vergangenheit von **singen**: er …", "sang", "singte", "sing"], ["Vergangenheit von **lachen**: wir …", "lachten", "lachen", "luchen"], ["Vergangenheit von **trinken**: ich …", "trank", "trinkte", "trunk"],
        ["Vergangenheit von **kommen**: sie …", "kam", "kommte", "kommt"]]),
    zeitformen4: liste([["**Ich bin gelaufen.** – Welche Zeitform?", "Perfekt", "Präteritum", "Präsens", "Futur"], ["**Er spielt Fußball.** – Welche Zeitform?", "Präsens", "Perfekt", "Futur", "Präteritum"],
        ["**Wir werden morgen schwimmen.** – Welche Zeitform?", "Futur", "Präsens", "Perfekt", "Präteritum"], ["**Sie las ein Buch.** – Welche Zeitform?", "Präteritum", "Präsens", "Perfekt", "Futur"],
        ["**Du hast gelacht.** – Welche Zeitform?", "Perfekt", "Präteritum", "Futur", "Präsens"], ["**Ich werde dir helfen.** – Welche Zeitform?", "Futur", "Perfekt", "Präsens", "Präteritum"],
        ["**Der Hund bellte laut.** – Welche Zeitform?", "Präteritum", "Präsens", "Perfekt", "Futur"], ["**Wir sind nach Hause gegangen.** – Welche Zeitform?", "Perfekt", "Präteritum", "Futur", "Präsens"],
        ["Perfekt von **fahren**: ich …", "bin gefahren", "habe gefahren", "fuhr"], ["Perfekt von **essen**: wir …", "haben gegessen", "sind gegessen", "aßen"]]),
    satzglieder: liste([["**Der Hund** bellt laut. – Was ist das?", "Subjekt (Wer?)", "Prädikat", "Ort"], ["Die Kinder **spielen** im Hof. – Was ist das?", "Prädikat (Was tun sie?)", "Subjekt", "Zeit"],
        ["Morgen fahren **wir** ans Meer. – Was ist das?", "Subjekt (Wer?)", "Prädikat", "Zeit"], ["Lena **liest** ein Buch. – Was ist das?", "Prädikat", "Subjekt", "Ort"],
        ["Wer oder was? **Der Bus** kommt zu spät.", "Der Bus", "kommt", "zu spät"], ["Wo? Die Katze schläft **auf dem Sofa**.", "auf dem Sofa", "Die Katze", "schläft"],
        ["Wann? **Am Montag** haben wir Sport.", "Am Montag", "wir", "Sport"], ["Wie viele Satzglieder hat der Satz: **Tom | isst | einen Apfel.**", "3", "4", "2"]]),
    rechtschreibung4: liste([["Stra_e", "ß", "ss", "s", { e: "Langes a → ß" }], ["Wa_er", "ss", "ß", "s", { e: "Kurzes a → ss" }], ["Fu_ball", "ß", "ss", "s", { e: "Langes u → ß" }], ["Schlü_el", "ss", "ß", "s", { e: "Kurzes ü → ss" }],
        ["B_ne (Biene)", "ie", "i", "ih", { e: "Langes i → meist ie" }], ["T_sch", "i", "ie", "ih", { e: "Kurzes i → i" }], ["So_e (Sonne)", "nn", "n", "hn", { e: "Kurzer Vokal → doppelter Mitlaut" }], ["Ze_ung (Zeitung)", "it", "id", "itt"],
        ["Ich hoffe, ___ du kommst.", "dass", "das", "daß", { e: "Kann man „welches“ einsetzen? Nein → dass" }], ["Das Buch, ___ auf dem Tisch liegt.", "das", "dass", "daß", { e: "„welches“ passt → das" }],
        ["Sto_ (der Stoff)", "ff", "f", "ph"], ["Bä_er (Bäcker)", "ck", "k", "kk", { e: "Nach kurzem Vokal → ck" }]]),
    genauLesen: liste([["Mia hat keinen Hund, aber zwei Katzen. Was hat Mia?", "zwei Katzen", "einen Hund", "einen Hund und zwei Katzen"], ["Der Ball liegt nicht unter dem Bett, sondern hinter dem Schrank. Wo liegt der Ball?", "hinter dem Schrank", "unter dem Bett", "im Schrank"],
        ["Ben ist größer als Max, aber kleiner als Lea. Wer ist am größten?", "Lea", "Ben", "Max"], ["Nur Lena und Paul dürfen an den Computer. Wer darf an den Computer?", "Lena und Paul", "alle Kinder", "nur Lena"],
        ["Das Spiel fällt aus, weil es regnet. Warum fällt es aus?", "Es regnet.", "Es ist kalt.", "Keiner hat Zeit."], ["Opa trinkt morgens Tee, abends Kakao. Was trinkt er am Abend?", "Kakao", "Tee", "Saft"],
        ["Tom kommt erst nach der Pause. Wann ist Tom da?", "nach der Pause", "vor der Pause", "in der Pause"], ["Die Bücherei hat montags geschlossen. Wann kannst du NICHT hin?", "am Montag", "am Dienstag", "am Samstag"],
        ["Lisa ist älter als Jan. Jan ist älter als Ole. Wer ist am jüngsten?", "Ole", "Jan", "Lisa"], ["Im Korb liegen 3 Äpfel und doppelt so viele Birnen. Wie viele Birnen?", "6", "3", "5"]]),
    sinnLesen: liste([["Im Winter trage ich eine warme ___.", "Mütze", "Sonnenbrille", "Badehose"], ["Der Bäcker backt frisches ___.", "Brot", "Gemüse", "Papier"], ["Weil Mila Fieber hat, bleibt sie im ___.", "Bett", "Schwimmbad", "Kino"],
        ["Im Herbst fallen die ___ von den Bäumen.", "Blätter", "Blüten", "Vögel"], ["Nach dem Sport habe ich großen ___.", "Durst", "Schnupfen", "Ärger"], ["Die Kuh gibt ___.", "Milch", "Eier", "Wolle"],
        ["Mit dem Schlüssel öffne ich die ___.", "Tür", "Banane", "Wolke"], ["Der Igel hat viele ___.", "Stacheln", "Federn", "Flossen"], ["Wenn es regnet, nehme ich einen ___.", "Schirm", "Ball", "Teller"]]),
};

/* ============================== SACHUNTERRICHT ============================== */
const S = {
    jahreszeiten: liste([["Wann baut man einen Schneemann?", "Winter", "Sommer", "Frühling"], ["Wann geht man ins Freibad?", "Sommer", "Winter", "Herbst"], ["Wann fallen die Blätter von den Bäumen?", "Herbst", "Frühling", "Sommer"],
        ["Wann blühen die ersten Blumen?", "Frühling", "Herbst", "Winter"], ["Wann ist Weihnachten?", "Winter", "Sommer", "Frühling"], ["Wann sammelt man Kastanien?", "Herbst", "Sommer", "Winter"],
        ["Wann sucht man Ostereier?", "Frühling", "Herbst", "Winter"], ["Wann ist es draußen am heißesten?", "Sommer", "Frühling", "Winter"], ["Wann lässt man Drachen steigen?", "Herbst", "Sommer", "Winter"],
        ["Wie viele Jahreszeiten gibt es?", "4", "3", "12"], ["Was kommt nach dem Winter?", "Frühling", "Herbst", "Sommer"], ["Was kommt nach dem Sommer?", "Herbst", "Winter", "Frühling"]]),
    koerper1: liste([["Womit siehst du?", "mit den Augen", "mit den Ohren", "mit der Nase"], ["Womit hörst du?", "mit den Ohren", "mit den Augen", "mit dem Mund"], ["Womit riechst du?", "mit der Nase", "mit den Ohren", "mit den Händen"],
        ["Womit schmeckst du?", "mit der Zunge", "mit der Nase", "mit den Augen"], ["Wie viele Finger hat eine Hand?", "5", "4", "10"], ["Wie lange solltest du Zähne putzen?", "etwa 2 Minuten", "30 Sekunden", "10 Minuten"],
        ["Wann trägst du beim Radfahren einen Helm?", "immer", "nur auf der Straße", "nur bei langen Fahrten"], ["Wie lange solltest du deine Hände waschen?", "etwa 30 Sekunden mit Seife", "kurz unter Wasser halten", "5 Minuten"],
        ["Wie viele Sinne hat der Mensch?", "5", "3", "10"], ["Womit fühlst du, ob etwas weich ist?", "mit der Haut", "mit den Ohren", "mit der Nase"]]),
    verkehr: liste([["Bei welcher Ampelfarbe darfst du gehen?", "grün", "rot", "gelb"], ["Was bedeutet rot an der Ampel?", "stehen bleiben", "gehen", "rennen"], ["Wo gehst du sicher über die Straße?", "am Zebrastreifen", "zwischen parkenden Autos", "hinter dem Bus"],
        ["Was machst du am Bordstein, bevor du über die Straße gehst?", "stehen bleiben und links – rechts – links schauen", "nur nach links schauen", "loslaufen, wenn kein Auto hupt"], ["Was macht dich im Dunkeln gut sichtbar?", "Reflektoren und helle Kleidung", "eine dunkle Jacke", "eine Mütze"],
        ["Auf welcher Seite des Gehwegs gehst du am sichersten?", "möglichst weit weg von der Straße", "direkt am Bordstein", "auf der Straße"], ["Was muss an jedem Fahrrad sein?", "zwei Bremsen, Licht und Klingel", "nur Licht und Klingel", "Gepäckträger und Klingel"],
        ["Was zeigt das Verkehrszeichen mit dem roten Achteck?", "Stopp!", "Vorfahrt", "Schule"], ["Wo wartest du auf den Schulbus?", "an der Haltestelle, mit Abstand", "auf der Straße", "direkt an der Bustür"]]),
    tierkinder: liste([["Wie heißt das Kind der Kuh?", "Kalb", "Fohlen", "Ferkel"], ["Wie heißt das Kind des Pferdes?", "Fohlen", "Lamm", "Kalb"], ["Wie heißt das Kind des Schweins?", "Ferkel", "Küken", "Welpe"],
        ["Wie heißt das Kind des Huhns?", "Küken", "Kitz", "Lamm"], ["Wie heißt das Kind des Hundes?", "Welpe", "Kätzchen", "Fohlen"], ["Wie heißt das Kind des Schafs?", "Lamm", "Zicklein", "Kalb"],
        ["Wie heißt das Kind des Rehs?", "Kitz", "Ferkel", "Küken"], ["Wie heißt das Kind des Frosches?", "Kaulquappe", "Raupe", "Larve"], ["Wie heißt das Kind des Schmetterlings?", "Raupe", "Kaulquappe", "Küken"],
        ["Welches Tier legt Eier?", "Huhn", "Kuh", "Hund"]]),
    zeit2: viele(() => { const T = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"], Mo = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        if (Math.random() < .5) { const i = zufall(0, 6), nach = Math.random() < .5; return { f: `Welcher Tag kommt ${nach ? "nach" : "vor"} **${T[i]}**?`, a: [T[(i + (nach ? 1 : 6)) % 7], T[(i + (nach ? 6 : 1)) % 7], T[(i + 3) % 7]] }; }
        const i = zufall(0, 11), nach = Math.random() < .5; return { f: `Welcher Monat kommt ${nach ? "nach" : "vor"} **${Mo[i]}**?`, a: [Mo[(i + (nach ? 1 : 11)) % 12], Mo[(i + (nach ? 11 : 1)) % 12], Mo[(i + 5) % 12]] }; }),
    sinne: liste([["Mit welchem Sinn erkennst du, ob die Milch sauer ist?", "Riechen oder Schmecken", "Hören", "Sehen"], ["Welches Organ gehört zum Hören?", "Ohr", "Auge", "Zunge"],
        ["Welcher Sinn warnt dich vor einer heißen Herdplatte?", "Fühlen (Tasten)", "Hören", "Riechen"], ["Wie schmeckt eine Zitrone?", "sauer", "süß", "salzig"], ["Wie schmeckt Honig?", "süß", "bitter", "salzig"],
        ["Was solltest du NIE tun?", "direkt in die Sonne schauen", "bei Sonne eine Mütze tragen", "im Schatten spielen"], ["Welcher Sinn hilft dir im Dunkeln den Weg zu ertasten?", "Tasten", "Sehen", "Schmecken"],
        ["Was solltest du NICHT tun?", "Laute Musik direkt am Ohr hören", "Augen beim Lesen ausruhen", "Hände waschen"]]),
    wetter: liste([["Womit misst man die Temperatur?", "Thermometer", "Lineal", "Waage"], ["Was entsteht, wenn Regen und Sonne zusammenkommen?", "Regenbogen", "Schnee", "Nebel"],
        ["Was ist gefrorenes Wasser, das vom Himmel fällt?", "Schnee", "Tau", "Nebel"], ["Was hörst du bei einem Gewitter?", "Donner", "Wind", "Regen"], ["Was machst du bei Gewitter draußen?", "Schnell in ein Haus gehen", "Unter einen Baum stellen", "Auf eine Wiese legen"],
        ["Wann ist es meist am kältesten?", "in der Nacht", "mittags", "nachmittags"], ["Wie nennt man eine Wolke ganz unten am Boden?", "Nebel", "Gewitter", "Hagel"], ["Bei wie viel Grad gefriert Wasser?", "0 °C", "10 °C", "100 °C"]]),
    wald: liste([["Welcher Baum hat Nadeln?", "Tanne", "Eiche", "Buche"], ["Welche Frucht hat die Eiche?", "Eicheln", "Kastanien", "Zapfen"], ["Welches Tier hält Winterschlaf?", "Igel", "Reh", "Fuchs"],
        ["Was frisst ein Eichhörnchen gern?", "Nüsse", "Gras", "Fleisch"], ["Welches Tier trägt ein großes Geweih?", "Hirsch", "Wildschwein", "Fuchs"], ["Welches Tier jagt nachts im Wald?", "Eule", "Specht", "Amsel"],
        ["Was ist die oberste Schicht im Wald?", "Baumschicht", "Moosschicht", "Wurzelschicht"], ["Was geben die Bäume an die Luft ab?", "Sauerstoff", "Kohlendioxid", "Wasserdampf und Rauch"],
        ["Was ist im Wald verboten?", "Feuer machen", "Pilze anschauen", "auf den Wegen laufen"], ["Wie erkennt man das Alter eines gefällten Baumes?", "an den Jahresringen", "an der Rinde", "an den Blättern"]]),
    wasser: liste([["Wasser wird bei 0 °C zu …", "Eis", "Dampf", "Saft"], ["Wasser wird beim Kochen zu …", "Wasserdampf", "Eis", "Schnee"], ["Wie nennt man den Weg des Wassers von Meer zu Wolke zu Regen?", "Wasserkreislauf", "Wasserfall", "Wasserturm"],
        ["Wo verdunstet Wasser besonders schnell?", "in der Sonne", "im Kühlschrank", "im Keller"], ["Was schwimmt auf dem Wasser?", "Holz", "Stein", "Schlüssel"], ["Wie viel Wasser sollte ein Kind etwa am Tag trinken?", "etwa 1 Liter", "1 Glas", "10 Liter"],
        ["Woher kommt unser Leitungswasser meist?", "aus dem Grundwasser", "aus dem Meer", "aus Pfützen"], ["Was spart am meisten Wasser?", "Kurz duschen statt baden", "Beim Zähneputzen das Wasser laufen lassen", "Jeden Tag baden"]]),
    ernaehrung: liste([["Was gehört in die Ernährungspyramide ganz unten (am meisten essen/trinken)?", "Wasser und Getränke ohne Zucker", "Süßigkeiten", "Fleisch"], ["Was sollte man nur selten essen?", "Süßigkeiten", "Gemüse", "Obst"],
        ["Welches Getränk ist am gesündesten?", "Wasser", "Cola", "Limonade"], ["Wie viele Portionen Obst und Gemüse am Tag sind gut?", "5", "1", "10"], ["Was enthält viel Kalzium für die Knochen?", "Milch und Käse", "Chips", "Gummibärchen"],
        ["Was hält in der Pause am längsten satt?", "Vollkornbrot mit Käse", "Weißbrot mit Marmelade", "ein Fruchtjoghurt"], ["Was ist das gesündeste Getränk zum Frühstück?", "Wasser oder Milch", "Kakao", "Orangensaft"]]),
    heimat: liste([["Wie heißt die Hauptstadt von Sachsen-Anhalt?", "Magdeburg", "Halle", "Leipzig"], ["An welchem Fluss liegt Weißenfels?", "Saale", "Elbe", "Rhein"], ["An welchem Fluss liegt Magdeburg?", "Elbe", "Saale", "Donau"],
        ["Wie heißt die Hauptstadt von Deutschland?", "Berlin", "Hamburg", "München"], ["Welches Bundesland ist unser Nachbar im Süden?", "Thüringen", "Bayern", "Hessen"], ["Wie heißt das höchste Gebirge in Sachsen-Anhalt?", "Harz", "Alpen", "Erzgebirge"],
        ["Wie viele Bundesländer hat Deutschland?", "16", "12", "20"], ["Welche Farben hat die deutsche Flagge?", "Schwarz-Rot-Gold", "Rot-Weiß-Rot", "Blau-Weiß-Rot"]]),
    bundeslaender: viele(() => { const B = [["Sachsen-Anhalt", "Magdeburg"], ["Sachsen", "Dresden"], ["Thüringen", "Erfurt"], ["Brandenburg", "Potsdam"], ["Berlin", "Berlin"], ["Bayern", "München"], ["Baden-Württemberg", "Stuttgart"], ["Hessen", "Wiesbaden"],
        ["Niedersachsen", "Hannover"], ["Nordrhein-Westfalen", "Düsseldorf"], ["Rheinland-Pfalz", "Mainz"], ["Saarland", "Saarbrücken"], ["Schleswig-Holstein", "Kiel"], ["Hamburg", "Hamburg"], ["Bremen", "Bremen"], ["Mecklenburg-Vorpommern", "Schwerin"]];
        const x = eins(B); return { f: `Wie heißt die Hauptstadt von **${x[0]}**?`, a: [x[1]].concat(ziehe(B.filter(y => y[1] !== x[1]), 2).map(y => y[1])) }; }),
    weltall: liste([["Welcher Planet ist unsere Erde?", "der dritte von der Sonne aus", "der erste", "der letzte"], ["Wie viele Planeten hat unser Sonnensystem?", "8", "9", "12"], ["Welcher Planet ist der größte?", "Jupiter", "Mars", "Erde"],
        ["Welcher Planet heißt „roter Planet“?", "Mars", "Venus", "Saturn"], ["Welcher Planet hat große Ringe?", "Saturn", "Merkur", "Mars"], ["Wie lange braucht die Erde einmal um die Sonne?", "1 Jahr", "1 Tag", "1 Monat"],
        ["Wie lange braucht die Erde, um sich einmal um sich selbst zu drehen?", "1 Tag", "1 Jahr", "1 Woche"], ["Was ist die Sonne?", "ein Stern", "ein Planet", "ein Komet"], ["Was kreist um die Erde?", "der Mond", "die Sonne", "der Mars"]]),
    strom: liste([["Was leitet Strom gut?", "Metall", "Holz", "Plastik"], ["Was leitet Strom NICHT?", "Gummi", "Kupfer", "Eisen"], ["Wie viele Pole hat eine Batterie?", "2", "1", "4"],
        ["Was braucht ein einfacher Stromkreis?", "Batterie, Kabel und Lämpchen", "nur ein Kabel", "nur eine Batterie"], ["Warum darf man nie in die Steckdose fassen?", "Lebensgefahr durch Strom", "Sie ist heiß", "Sie ist schmutzig"],
        ["Was spart Strom?", "Geräte ganz ausschalten statt Stand-by", "Licht nur halb ausmachen", "Den Kühlschrank kälter stellen"], ["Woher kommt Strom aus Wind?", "aus Windrädern", "aus Batterien", "aus Steckdosen"]]),
    koerper4: liste([["Welches Organ pumpt das Blut?", "das Herz", "die Lunge", "der Magen"], ["Womit atmen wir?", "mit der Lunge", "mit dem Herzen", "mit der Leber"], ["Wie viele Knochen hat ein Erwachsener ungefähr?", "über 200", "etwa 50", "über 1000"],
        ["Was schützt das Gehirn?", "der Schädel", "die Rippen", "das Becken"], ["Was schützt Herz und Lunge?", "der Brustkorb (Rippen)", "der Schädel", "die Wirbelsäule"], ["Wohin kommt das Essen nach dem Schlucken?", "in den Magen", "in die Lunge", "ins Herz"],
        ["Was verbindet Knochen beweglich?", "Gelenke", "Haare", "Nägel"], ["Wie viel Schlaf brauchen Grundschulkinder ungefähr?", "10 bis 11 Stunden", "6 Stunden", "15 Stunden"]]),
};

/* ============================== LERNEN LERNEN ============================== */
const L = {
    lernen: liste([["Was hilft dir beim Konzentrieren am meisten?", "nur das Material für die Aufgabe auf dem Tisch", "leise Musik nebenbei", "alle Stifte bereitlegen, falls man sie braucht"], ["Du verstehst eine Aufgabe nicht. Was tust du zuerst?", "noch einmal genau lesen", "sofort die Lehrerin fragen", "die Aufgabe überspringen"],
        ["Was ist besser?", "jeden Tag 10 Minuten üben", "einmal die Woche 2 Stunden", "nur vor einer Arbeit üben"], ["Was machst du, wenn du einen Fehler entdeckst?", "verbessern und überlegen, warum er passiert ist", "schnell wegradieren", "weitermachen, Hauptsache fertig"],
        ["Was bedeutet „kreise ein“?", "einen Kreis um etwas malen", "etwas unterstreichen", "etwas ankreuzen"], ["Was bedeutet „verbinde“?", "eine Linie ziehen", "einen Kreis darum malen", "ein Kreuz setzen"],
        ["Was hilft gegen einen müden Kopf?", "kurze Bewegungspause und Wasser trinken", "etwas Süßes essen", "Kopf auf den Tisch legen"], ["Welches Ziel ist gut?", "Bis Freitag kann ich die 7er-Reihe.", "Ich werde besser in Mathe.", "Ich lerne mehr."]])
};

/* ============================== Aufbau: Klasse → Fach → Themen ============================== */
const T = (id, titel, emoji, gen, info) => ({ id, titel, emoji, gen, info: info || "" });
window.QUIZ = {
    "1": {
        "Deutsch": [T("anlaut", "Anfangsbuchstaben", "🔤", D.anlaut), T("silben", "Silben zählen", "👏", D.silben), T("lesen", "Wörter lesen", "📖", D.lesen), T("reime", "Reime", "🪄", D.reime)],
        "Mathe": [T("zaehlen", "Zählen", "🍎", M.zaehlen(10)), T("plus10", "Plus bis 10", "➕", M.plus(10)), T("minus10", "Minus bis 10", "➖", M.minus(10)), T("ergaenzen10", "Ergänzen bis 10", "🔟", M.ergaenzen(10)),
            T("vergleich20", "Größer, kleiner, gleich", "🐊", M.vergleich(20)), T("nachbar20", "Nachbarzahlen bis 20", "🏘️", M.nachbar(20)), T("plus20", "Plus und Minus bis 20", "🧮", n => mischen(M.plus(20)(Math.ceil(n / 2)).concat(M.minus(20)(Math.floor(n / 2))))), T("formen", "Formen", "🔺", M.formen)],
        "Sachunterricht": [T("jahreszeiten", "Jahreszeiten", "🍂", S.jahreszeiten), T("koerper", "Mein Körper", "🧍", S.koerper1), T("verkehr", "Verkehr", "🚦", S.verkehr), T("tierkinder", "Tierkinder", "🐣", S.tierkinder)]
    },
    "2": {
        "Deutsch": [T("artikel", "der, die oder das?", "🏷️", D.artikel), T("gross", "Groß oder klein?", "🔠", D.gross), T("mehrzahl", "Einzahl & Mehrzahl", "👥", D.mehrzahl), T("abc", "ABC", "🔤", D.abc),
            T("abcwoerter", "Wörter nach ABC", "📚", D.abcWoerter(2)), T("gegenteil", "Gegenteile", "↔️", D.gegenteil), T("satzzeichen", "Satzzeichen", "❓", D.satzzeichen), T("sinn", "Sinn-Lesen", "🧠", D.sinnLesen)],
        "Mathe": [T("plus100", "Plus bis 100", "➕", M.plus100(100, 40)), T("minus100", "Minus bis 100", "➖", M.minus100(100, 40)), T("zehner", "Zehner und Einer", "🧱", M.zehner(99)), T("ergaenzen100", "Ergänzen bis 100", "💯", M.ergaenzen(100)),
            T("mal2510", "Einmaleins 2, 5, 10", "✖️", M.mal([2, 5, 10])), T("verdoppeln", "Verdoppeln & Halbieren", "🪞", M.verdoppeln(20)), T("uhr", "Uhr: volle & halbe Stunden", "🕐", M.uhr("voll")), T("geld", "Geld", "💶", M.geld(2)), T("sach2", "Sachaufgaben", "📝", M.sachaufgaben(2))],
        "Sachunterricht": [T("zeit", "Tage & Monate", "🗓️", S.zeit2), T("sinne", "Die Sinne", "👃", S.sinne), T("wetter", "Wetter", "🌦️", S.wetter), T("verkehr", "Verkehr", "🚦", S.verkehr)]
    },
    "3": {
        "Deutsch": [T("wortarten", "Wortarten", "🧪", D.wortarten), T("verlaengern", "Verlängern (b/p, d/t, g/k)", "🔊", D.verlaengern), T("ableiten", "Ableiten (ä/äu)", "🌳", D.ableiten), T("zeitformen", "Vergangenheit", "⏪", D.zeitformen3),
            T("abcwoerter", "Wörterbuch-Ordnung", "📖", D.abcWoerter(3)), T("wortfamilie", "Wortfamilien", "👨‍👩‍👧", D.wortfamilie), T("genau", "Genau lesen", "🔎", D.genauLesen), T("mehrzahl", "Mehrzahl", "👥", D.mehrzahl)],
        "Mathe": [T("einmaleins", "Einmaleins", "✖️", M.mal([2, 3, 4, 5, 6, 7, 8, 9, 10])), T("geteilt", "Geteilt", "➗", M.geteilt([2, 3, 4, 5, 6, 7, 8, 9, 10])), T("plus1000", "Plus bis 1000", "➕", M.plus100(1000, 300)), T("minus1000", "Minus bis 1000", "➖", M.minus100(1000, 300)),
            T("stellen", "Stellenwerte bis 1000", "🔢", M.stellen(999)), T("uhr", "Uhrzeit", "🕐", M.uhr("viertel")), T("zeitspanne", "Zeitspannen", "⏱️", M.zeitspanne), T("groessen", "Größen", "📏", M.groessen(3)), T("geld", "Rückgeld", "💶", M.geld(3)), T("sach3", "Sachaufgaben", "📝", M.sachaufgaben(3))],
        "Sachunterricht": [T("wald", "Der Wald", "🌲", S.wald), T("wasser", "Wasser", "💧", S.wasser), T("ernaehrung", "Gesunde Ernährung", "🥦", S.ernaehrung), T("heimat", "Unsere Heimat", "🏰", S.heimat)]
    },
    "4": {
        "Deutsch": [T("zeitformen", "Zeitformen", "⏳", D.zeitformen4), T("satzglieder", "Satzglieder", "🧩", D.satzglieder), T("rechtschreibung", "Rechtschreibung (ss/ß, ie, dass)", "✍️", D.rechtschreibung4), T("wortarten", "Wortarten", "🧪", D.wortarten),
            T("verlaengern", "Verlängern", "🔊", D.verlaengern), T("ableiten", "Ableiten", "🌳", D.ableiten), T("genau", "Genau lesen", "🔎", D.genauLesen)],
        "Mathe": [T("schriftlich", "Rechnen mit großen Zahlen", "🧮", M.schriftlich), T("stellen", "Stellenwerte bis 100 000", "🔢", M.stellen(99999)), T("runden", "Runden", "🎯", M.runden), T("groessen", "Größen umrechnen", "⚖️", M.groessen(4)),
            T("einmaleins", "Einmaleins-Blitz", "✖️", M.mal([3, 4, 6, 7, 8, 9])), T("geteilt", "Geteilt-Blitz", "➗", M.geteilt([3, 4, 6, 7, 8, 9])), T("uhr", "Uhrzeit (5 Minuten)", "🕐", M.uhr("fuenf")), T("geometrie", "Geometrie", "📐", M.geometrie), T("sach4", "Sachaufgaben", "📝", M.sachaufgaben(4))],
        "Sachunterricht": [T("bundeslaender", "Bundesländer & Hauptstädte", "🗺️", S.bundeslaender), T("weltall", "Sonne, Erde, Planeten", "🪐", S.weltall), T("strom", "Strom", "⚡", S.strom), T("koerper", "Der Körper", "❤️", S.koerper4)]
    }
};
// Lernen lernen in allen Klassen
Object.values(window.QUIZ).forEach(k => { k["Lernen lernen"] = [T("lernen", "Clever lernen", "🦉", L.lernen)]; });
window.QUIZ_FACH = { "Deutsch": ["📖", "#e2574c"], "Mathe": ["🔢", "#3d7ea6"], "Sachunterricht": ["🌱", "#3f9a5a"], "Lernen lernen": ["🦉", "#8e7cc3"] };
window.QUIZ_UHR = uhrSvg;
})();
