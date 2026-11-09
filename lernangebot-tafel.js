/* ============================================================
   Leuchtturm – Lernangebot: Tafel-Übungen
   Interaktive Vollbild-Übungen für die digitale Tafel.
   Steuerung: Tippen auf die Knöpfe, Leertaste / Pfeil rechts
   (erst Lösung, dann nächste Aufgabe), L = Lösung, Esc = schließen.
   Benötigt: bilder.js (LT_BILDER), lernangebot-woerter.js (LERN_DATEN).
   window.lernTafel = { info, starten, uebersicht, werkzeuge }
   ============================================================ */
"use strict";
(function () {

const D = () => window.LERN_DATEN || { woerter: [], reime: [], wortarten: {}, lesen: {}, bildSvg: () => "", mischen: a => a, ziehen: a => a, zufall: (a) => a };
const z = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const wahl = liste => liste[Math.floor(Math.random() * liste.length)];
const mischen = liste => { const a = liste.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const bild = b => `<span class="lt-bild">${(window.LT_BILDER && window.LT_BILDER[b] && window.LT_BILDER[b][2]) || ""}</span>`;
const zahl = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// Antwort-Optionen: richtige + falsche, gemischt; liefert { antworten, richtig }
function optionen(richtig, falsche, n = 3){
    const liste = mischen([richtig, ...mischen([...new Set(falsche.filter(f => String(f) !== String(richtig)))]).slice(0, n - 1)]);
    return { antworten: liste.map(String), richtig: liste.findIndex(x => String(x) === String(richtig)) };
}

/* ---------------- Werkzeuge ---------------- */
const W = {};

W.blitzrechnen = {
    titel: "Blitzrechnen", emoji: "⚡", gruppe: "Mathe",
    text: "Kopfrechnen: Plus, Minus, Ergänzen, Verdoppeln, Halbieren, Einmaleins – Lösung auf Tipp.",
    optionen: [
        { k: "art", label: "Art", werte: [["plus", "Plus"], ["minus", "Minus"], ["plusminus", "Plus & Minus"], ["ergaenzen", "Ergänzen"], ["verdoppeln", "Verdoppeln"], ["halbieren", "Halbieren"], ["mal", "Einmaleins"], ["geteilt", "Geteilt"]] },
        { k: "bis", label: "Zahlenraum", werte: [[10, "bis 10"], [20, "bis 20"], [100, "bis 100"], [1000, "bis 1000"]] },
        { k: "fehler", label: "Modus", werte: [[false, "Lösung zeigen"], [true, "Stimmt das? (grün/rot)"]] }
    ],
    std: { art: "plusminus", bis: 10, fehler: false },
    aufgabe(e){
        const bis = +e.bis || 10, reihen = Array.isArray(e.reihen) && e.reihen.length ? e.reihen : [2, 3, 4, 5, 6, 7, 8, 9, 10];
        let art = e.art === "plusminus" ? wahl(["plus", "minus"]) : e.art, a, b, text, l;
        const schritt = bis >= 1000 ? wahl([1, 10, 10, 100]) : 1;
        if (art === "plus") { const s = z(bis > 20 ? 10 : 2, bis); a = z(1, s - 1); b = s - a; if (schritt > 1) { a = Math.round(a / schritt) * schritt; b = Math.round(b / schritt) * schritt; } text = `${zahl(a)} + ${zahl(b)}`; l = a + b; }
        else if (art === "minus") { a = z(bis > 20 ? 10 : 2, bis); b = z(1, a); if (schritt > 1) { a = Math.round(a / schritt) * schritt; b = Math.min(a, Math.round(b / schritt) * schritt); } text = `${zahl(a)} − ${zahl(b)}`; l = a - b; }
        else if (art === "ergaenzen") { const ziel = bis <= 20 ? bis : wahl(bis >= 1000 ? [100, 1000, 500] : [100, 50, z(2, 9) * 10]); a = bis <= 20 ? z(0, ziel) : (ziel === 1000 ? z(1, 99) * 10 : z(1, ziel - 1)); text = `${zahl(a)} + ? = ${zahl(ziel)}`; l = ziel - a; }
        else if (art === "verdoppeln") { a = z(1, Math.floor(bis / 2)); text = `Das Doppelte von ${zahl(a)}`; l = 2 * a; }
        else if (art === "halbieren") { a = 2 * z(1, Math.floor(bis / 2)); text = `Die Hälfte von ${zahl(a)}`; l = a / 2; }
        else if (art === "mal") { a = z(1, 10); b = wahl(reihen); if (Math.random() < .5) [a, b] = [b, a]; text = `${a} · ${b}`; l = a * b; }
        else { b = wahl(reihen); l = z(1, 10); a = b * l; text = `${a} : ${b}`; }
        if (e.fehler) {
            const stimmt = Math.random() < .5;
            const falsch = l + wahl([-2, -1, 1, 2, 10, -10].filter(d => l + d >= 0));
            return { html: `<div class="lt-gross">${text} = ${zahl(stimmt ? l : falsch)}</div><div class="lt-frage">Stimmt das?</div>`,
                antworten: ["🟢 stimmt", "🔴 falsch"], richtig: stimmt ? 0 : 1, loesung: stimmt ? "Richtig! ✅" : `Falsch – richtig ist <b>${zahl(l)}</b>` };
        }
        return { html: `<div class="lt-gross">${text}${/[?]|Doppelte|Hälfte/.test(text) ? "" : " = ?"}</div>`, loesung: `<span class="lt-loes-zahl">${zahl(l)}</span>` };
    }
};

function zwanzigerSvg(n, bis){
    const sp = 10, zeilen = bis > 10 ? 2 : 1, r = 17, w = 46;
    let s = `<svg viewBox="0 0 ${sp * w + 20} ${zeilen * w + 20}" class="lt-svg">`;
    for (let zei = 0; zei < zeilen; zei++) for (let i = 0; i < sp; i++) {
        const x = 10 + i * w, y = 10 + zei * w, k = zei * 10 + i;
        s += `<rect x="${x}" y="${y}" width="${w}" height="${w}" fill="none" stroke="#9fb4c4" stroke-width="2"/>`;
        if (k < n) s += `<circle cx="${x + w / 2}" cy="${y + w / 2}" r="${r}" fill="${i < 5 ? "#e74c3c" : "#2f80c4"}"/>`;
    }
    s += `<line x1="${10 + 5 * w}" y1="6" x2="${10 + 5 * w}" y2="${zeilen * w + 14}" stroke="#16324a" stroke-width="4"/>`;
    return s + "</svg>";
}
W.zwanzigerfeld = {
    titel: "Blitzblick: Zwanzigerfeld", emoji: "🔴", gruppe: "Mathe",
    text: "Punkte erscheinen kurz – wie viele waren es? Mengen „sehen“ statt zählen.",
    optionen: [
        { k: "bis", label: "Zahlenraum", werte: [[10, "bis 10"], [20, "bis 20"]] },
        { k: "zeit", label: "Zeigen", werte: [[1500, "1,5 Sek."], [2500, "2,5 Sek."], [4000, "4 Sek."], [0, "immer"]] }
    ],
    std: { bis: 10, zeit: 2500 },
    aufgabe(e){
        const bis = +e.bis || 10, n = z(1, bis);
        // Bis 20: erst die obere Reihe voll, dann die untere
        return { html: `<div class="lt-blitz">${zwanzigerSvg(n, bis)}</div><div class="lt-frage">Wie viele Punkte?</div>`, blitz: +e.zeit, loesung: `<span class="lt-loes-zahl">${n}</span><div class="lt-klein">${n > 5 && n <= 10 ? "5 und " + (n - 5) : n > 10 ? "10 und " + (n - 10) : ""}</div>` };
    }
};

W.zahlenstrahl = {
    titel: "Zahlenstrahl", emoji: "📏", gruppe: "Mathe",
    text: "Auf welche Zahl zeigt der Pfeil? Schätzen und genau ablesen.",
    optionen: [{ k: "bis", label: "Zahlenraum", werte: [[20, "bis 20"], [100, "bis 100"], [1000, "bis 1000"]] }],
    std: { bis: 20 },
    aufgabe(e){
        const bis = +e.bis || 20;
        const fein = bis === 20 ? 1 : bis === 100 ? 5 : 50, grob = bis === 20 ? 5 : bis === 100 ? 10 : 100;
        const n = bis === 20 ? z(1, 19) : bis === 100 ? z(1, 99) : z(1, 99) * 10;
        const X = v => 30 + v / bis * 940;
        let s = `<svg viewBox="0 0 1000 170" class="lt-svg"><line x1="20" y1="100" x2="985" y2="100" stroke="#16324a" stroke-width="4"/><polygon points="985,92 1000,100 985,108" fill="#16324a"/>`;
        for (let v = 0; v <= bis; v += fein) { const g = v % grob === 0; s += `<line x1="${X(v)}" y1="${g ? 82 : 90}" x2="${X(v)}" y2="${g ? 118 : 110}" stroke="#16324a" stroke-width="${g ? 3 : 2}"/>`; if (g) s += `<text x="${X(v)}" y="148" text-anchor="middle" font-size="22" font-weight="800" fill="#16324a">${zahl(v)}</text>`; }
        s += `<polygon points="${X(n) - 14},20 ${X(n) + 14},20 ${X(n)},70" fill="#f2a93b"/></svg>`;
        return { html: `<div class="lt-breit">${s}</div><div class="lt-frage">Welche Zahl ist das?</div>`, loesung: `<span class="lt-loes-zahl">${zahl(n)}</span>` };
    }
};

function stellenSvg(h, zz, ee){
    let s = "", x = 10;
    for (let i = 0; i < h; i++) { s += `<g transform="translate(${x},10)"><rect width="100" height="100" fill="#ffe2a8" stroke="#b07a12" stroke-width="2"/>${Array.from({ length: 9 }, (_, k) => `<line x1="${(k + 1) * 10}" y1="0" x2="${(k + 1) * 10}" y2="100" stroke="#d9a441"/><line x1="0" y1="${(k + 1) * 10}" x2="100" y2="${(k + 1) * 10}" stroke="#d9a441"/>`).join("")}</g>`; x += 112; }
    if (h) x += 14;
    for (let i = 0; i < zz; i++) { s += `<g transform="translate(${x},10)"><rect width="10" height="100" fill="#cfe5f7" stroke="#2f80c4" stroke-width="2"/>${Array.from({ length: 9 }, (_, k) => `<line x1="0" y1="${(k + 1) * 10}" x2="10" y2="${(k + 1) * 10}" stroke="#2f80c4"/>`).join("")}</g>`; x += 16; }
    if (zz) x += 14;
    for (let i = 0; i < ee; i++) { s += `<rect x="${x + (i % 5) * 16}" y="${10 + Math.floor(i / 5) * 16 + 68}" width="10" height="10" fill="#c8eccd" stroke="#2e8b57" stroke-width="2"/>`; }
    if (ee) x += 80;
    return `<svg viewBox="0 0 ${Math.max(x, 200)} 120" class="lt-svg">${s}</svg>`;
}
W.stellenwert = {
    titel: "Stellenwert: H, Z, E", emoji: "🧱", gruppe: "Mathe",
    text: "Hunderterplatten, Zehnerstangen, Einerwürfel – welche Zahl ist das?",
    optionen: [{ k: "bis", label: "Zahlenraum", werte: [[100, "bis 100"], [1000, "bis 1000"]] }],
    std: { bis: 1000 },
    aufgabe(e){
        const h = +e.bis >= 1000 ? z(1, 5) : 0, zz = z(0, 9), ee = z(0, 9), n = h * 100 + zz * 10 + ee;
        return { html: `<div class="lt-breit">${stellenSvg(h, zz, ee)}</div><div class="lt-frage">Welche Zahl ist das?</div>`, loesung: `<span class="lt-loes-zahl">${zahl(n)}</span><div class="lt-klein">${h ? h + " H · " : ""}${zz} Z · ${ee} E</div>` };
    }
};

const STUNDEN = ["zwölf", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf"];
function uhrSvg(h, m){
    let s = `<svg viewBox="0 0 300 300" class="lt-svg lt-uhr"><circle cx="150" cy="150" r="140" fill="#fff" stroke="#16324a" stroke-width="8"/>`;
    for (let i = 0; i < 60; i++) { const w = i * 6 * Math.PI / 180, g = i % 5 === 0; s += `<line x1="${150 + Math.sin(w) * (g ? 118 : 126)}" y1="${150 - Math.cos(w) * (g ? 118 : 126)}" x2="${150 + Math.sin(w) * 132}" y2="${150 - Math.cos(w) * 132}" stroke="#16324a" stroke-width="${g ? 4 : 1.5}"/>`; }
    for (let i = 1; i <= 12; i++) { const w = i * 30 * Math.PI / 180; s += `<text x="${150 + Math.sin(w) * 98}" y="${150 - Math.cos(w) * 98 + 11}" text-anchor="middle" font-size="30" font-weight="900" fill="#16324a">${i}</text>`; }
    const wh = ((h % 12) + m / 60) * 30 * Math.PI / 180, wm = m * 6 * Math.PI / 180;
    s += `<line x1="150" y1="150" x2="${150 + Math.sin(wh) * 62}" y2="${150 - Math.cos(wh) * 62}" stroke="#e74c3c" stroke-width="11" stroke-linecap="round"/>`;
    s += `<line x1="150" y1="150" x2="${150 + Math.sin(wm) * 104}" y2="${150 - Math.cos(wm) * 104}" stroke="#2f80c4" stroke-width="7" stroke-linecap="round"/><circle cx="150" cy="150" r="9" fill="#16324a"/></svg>`;
    return s;
}
function uhrText(h, m){
    const n = (h % 12) + 1;
    if (m === 0) return STUNDEN[h % 12 || 12] + " Uhr";
    if (m === 30) return "halb " + STUNDEN[n];
    if (m === 15) return "Viertel nach " + STUNDEN[h % 12 || 12];
    if (m === 45) return "Viertel vor " + STUNDEN[n];
    if (m < 30) return m + " nach " + STUNDEN[h % 12 || 12];
    return (60 - m) + " vor " + STUNDEN[n];
}
W.uhr = {
    titel: "Uhr lesen", emoji: "🕐", gruppe: "Mathe",
    text: "Analoge Uhr: volle und halbe Stunden, Viertelstunden oder minutengenau.",
    optionen: [{ k: "genau", label: "Genauigkeit", werte: [["stunde", "volle Stunden"], ["halb", "volle & halbe"], ["viertel", "Viertelstunden"], ["fuenf", "5 Minuten"], ["minuten", "minutengenau"]] }],
    std: { genau: "halb" },
    aufgabe(e){
        const h = z(1, 12);
        const m = { stunde: 0, halb: wahl([0, 30]), viertel: wahl([0, 15, 30, 45]), fuenf: z(0, 11) * 5, minuten: z(0, 59) }[e.genau || "halb"] ?? 0;
        const dig = (hh) => `${hh}:${String(m).padStart(2, "0")}`;
        return { html: `<div class="lt-uhr-box">${uhrSvg(h, m)}</div><div class="lt-frage">Wie spät ist es?</div>`, loesung: `<span class="lt-loes-zahl">${dig(h)} / ${dig(h + 12 === 24 ? 0 : h + 12)}</span><div class="lt-klein">${uhrText(h, m)}</div>` };
    }
};

const MUENZEN = [[1, "1 ct"], [2, "2 ct"], [5, "5 ct"], [10, "10 ct"], [20, "20 ct"], [50, "50 ct"], [100, "1 €"], [200, "2 €"]];
const SCHEINE = [[500, "5 €", "#c9c1b6"], [1000, "10 €", "#e8a7a1"], [2000, "20 €", "#9cc3e6"], [5000, "50 €", "#f2c48b"]];
function geldHtml(teile){
    return `<div class="lt-geld">${teile.map(([w, t, f]) => w >= 500
        ? `<span class="lt-schein" style="background:${f}">${t}</span>`
        : `<span class="lt-muenze ${w >= 100 ? "euro" : w >= 10 ? "gold" : "kupfer"}" style="--g:${w === 200 ? 1.15 : w === 100 ? 1.05 : w >= 10 ? .9 + (w / 200) : .72 + w / 30}">${t}</span>`).join("")}</div>`;
}
function betrag(ct){ return ct % 100 === 0 ? (ct / 100) + " €" : (ct / 100).toFixed(2).replace(".", ",") + " €"; }
W.geld = {
    titel: "Geld-Blitz", emoji: "💶", gruppe: "Mathe",
    text: "Münzen und Scheine – wie viel Geld ist das?",
    optionen: [
        { k: "bis", label: "Betrag", werte: [[10, "bis 10 €"], [20, "bis 20 €"], [50, "bis 50 €"], [100, "bis 100 €"]] },
        { k: "cent", label: "Cent", werte: [[false, "ohne Cent"], [true, "mit Cent"]] }
    ],
    std: { bis: 20, cent: false },
    aufgabe(e){
        const max = (+e.bis || 20) * 100;
        const pool = [...(e.cent ? MUENZEN : MUENZEN.filter(m => m[0] >= 100)), ...SCHEINE.filter(s => s[0] <= max)];
        let teile = [], summe = 0;
        const anzahl = z(2, e.cent ? 6 : 5);
        for (let i = 0; i < 30 && teile.length < anzahl; i++) { const t = wahl(pool); if (summe + t[0] <= max) { teile.push(t); summe += t[0]; } }
        teile.sort((a, b) => b[0] - a[0]);
        return { html: geldHtml(teile) + `<div class="lt-frage">Wie viel Geld ist das?</div>`, loesung: `<span class="lt-loes-zahl">${betrag(summe)}</span>` };
    }
};

W.formen = {
    titel: "Formen-Blitz", emoji: "🔺", gruppe: "Mathe",
    text: "Welche Form ist das? Mit Antwortkarten 1–3 (oder 1–4).",
    optionen: [{ k: "stufe", label: "Stufe", werte: [["12", "Kl. 1/2: Flächen"], ["34", "Kl. 3/4: mit Körpern"]] }],
    std: { stufe: "12" },
    aufgabe(e){
        const F = {
            Kreis: `<circle cx="100" cy="100" r="80"/>`, Dreieck: `<polygon points="100,18 185,175 15,175"/>`,
            Quadrat: `<rect x="25" y="25" width="150" height="150"/>`, Rechteck: `<rect x="5" y="50" width="190" height="100"/>`,
            Sechseck: `<polygon points="100,15 175,57 175,143 100,185 25,143 25,57"/>`,
            Würfel: `<polygon points="40,70 120,70 120,170 40,170"/><polygon points="40,70 80,30 160,30 120,70"/><polygon points="120,70 160,30 160,130 120,170"/>`,
            Kugel: `<circle cx="100" cy="100" r="80"/><ellipse cx="100" cy="100" rx="80" ry="24" fill="none" stroke-dasharray="8 6"/>`,
            Zylinder: `<path d="M40 50 V150 A60 18 0 0 0 160 150 V50"/><ellipse cx="100" cy="50" rx="60" ry="18"/>`,
            Kegel: `<path d="M100 20 L40 160 A60 18 0 0 0 160 160 Z"/><ellipse cx="100" cy="160" rx="60" ry="18" fill="none" stroke-dasharray="8 6"/>`
        };
        const namen = e.stufe === "34" ? Object.keys(F) : ["Kreis", "Dreieck", "Quadrat", "Rechteck"];
        const r = wahl(namen), o = optionen(r, namen, e.stufe === "34" ? 4 : 3);
        return { html: `<svg viewBox="0 0 200 200" class="lt-svg lt-form" fill="#cfe5f7" stroke="#16324a" stroke-width="5" stroke-linejoin="round">${F[r]}</svg><div class="lt-frage">Welche Form ist das?</div>`, ...o, loesung: `<b>${r}</b>` };
    }
};

W.muster = {
    titel: "Muster & Folgen", emoji: "🔁", gruppe: "Mathe",
    text: "Was kommt als Nächstes? Bild-Muster (Kl. 1/2) oder Zahlenfolgen (Kl. 3/4).",
    optionen: [{ k: "stufe", label: "Stufe", werte: [["12", "Kl. 1/2: Bilder"], ["34", "Kl. 3/4: Zahlen"]] }],
    std: { stufe: "12" },
    aufgabe(e){
        if (e.stufe === "34") {
            const start = z(1, 20), k = z(2, 9), typ = wahl(["plus", "minus", "mal", "wachsend"]);
            let f = [start];
            for (let i = 1; i < 6; i++) { const v = f[i - 1]; f.push(typ === "plus" ? v + k : typ === "minus" ? v - k : typ === "mal" ? v * 2 : v + i); }
            if (typ === "minus") f = f.map(v => v + 6 * k);
            const r = f.pop(), o = optionen(r, [r + 1, r - 1, r + k, r - k, r + 2]);
            const regel = { plus: "immer + " + k, minus: "immer − " + k, mal: "immer · 2", wachsend: "+1, +2, +3 …" }[typ];
            return { html: `<div class="lt-gross">${f.join(", ")}, ?</div>`, ...o, loesung: `<b>${r}</b> <span class="lt-klein">(${regel})</span>` };
        }
        const sets = [["🔴", "🔵", "🟡"], ["⭐", "🌙"], ["🍎", "🍌", "🍇"], ["🐱", "🐶"], ["🟩", "🟥", "🟦"], ["🌸", "🍀"]];
        const s = wahl(sets), laenge = Math.min(s.length, z(2, 3));
        const einheit = Array.from({ length: wahl([laenge, laenge + 1]) }, (_, i) => s[i % laenge]);
        if (einheit.length === 3 && laenge === 2 && Math.random() < .5) einheit.splice(0, 3, s[0], s[0], s[1]);
        const folge = [], n = einheit.length * 2 + z(1, einheit.length - 1);
        for (let i = 0; i < n; i++) folge.push(einheit[i % einheit.length]);
        const r = einheit[n % einheit.length], o = optionen(r, s, Math.min(3, s.length));
        return { html: `<div class="lt-gross lt-emoji">${folge.join(" ")} ❓</div>`, ...o, loesung: `<span class="lt-emoji">${r}</span>` };
    }
};

W.blitzlesen = {
    titel: "Blitzlesen", emoji: "👀", gruppe: "Deutsch",
    text: "Silben, Wörter oder Sätze blitzen kurz auf – wer hat es gelesen?",
    optionen: [
        { k: "art", label: "Was?", werte: [["silben12", "Silben (Kl. 1)"], ["woerter12", "Wörter (Kl. 1/2)"], ["saetze12", "Sätze (Kl. 2)"], ["woerter34", "lange Wörter (Kl. 3/4)"], ["saetze34", "Sätze (Kl. 3/4)"]] },
        { k: "zeit", label: "Zeigen", werte: [[1000, "1 Sek."], [2000, "2 Sek."], [3500, "3,5 Sek."], [0, "immer"]] }
    ],
    std: { art: "woerter12", zeit: 2000 },
    aufgabe(e){
        const liste = D().lesen[e.art || "woerter12"] || ["Lesen"];
        const t = wahl(liste);
        return { html: `<div class="lt-blitz"><div class="lt-gross lt-lesen${t.length > 22 ? " lang" : ""}">${esc(t)}</div></div><div class="lt-frage">Was stand da?</div>`, blitz: +e.zeit, loesung: `<b>${esc(t)}</b>` };
    }
};

W.anlaute = {
    titel: "Anlaut-Raten", emoji: "🔤", gruppe: "Deutsch",
    text: "Bild zeigen – mit welchem Laut fängt das Wort an? Mit Auswahl (1–3) oder frei.",
    optionen: [{ k: "modus", label: "Modus", werte: [["auswahl", "3 Buchstaben zur Wahl"], ["blitz", "frei nennen"]] }],
    std: { modus: "auswahl" },
    aufgabe(e){
        const pool = e.modus === "blitz" ? D().woerter : D().woerter.filter(x => x.klar);
        const x = wahl(pool);
        const r = { html: `<div class="lt-bild-gross">${bild(x.b)}</div><div class="lt-frage">Mit welchem Laut fängt das Wort an?</div>`, loesung: `<b class="lt-loes-zahl">${x.an}</b> <span class="lt-klein">wie ${esc(x.w)}</span>` };
        if (e.modus !== "blitz") Object.assign(r, optionen(x.an, mischen(pool.map(y => y.an)), 3));
        return r;
    }
};

function silbenHtml(s){ const t = s.split("-"); return `<span class="lt-silben">${t.map(x => `<span class="lt-silbe">${esc(x)}</span>`).join("")}</span>`; }
W.silben = {
    titel: "Silben zählen", emoji: "👏", gruppe: "Deutsch",
    text: "Bild zeigen, Wort klatschen – wie viele Silben? Antwort mit Zahlenkarten 1–4.",
    optionen: [{ k: "wort", label: "Wort zeigen", werte: [[false, "nur Bild"], [true, "Bild und Wort"]] }],
    std: { wort: false },
    aufgabe(e){
        const x = wahl(D().woerter.filter(w => w.n <= 4));
        return { html: `<div class="lt-bild-gross">${bild(x.b)}</div>${e.wort ? `<div class="lt-gross lt-lesen">${esc(x.w)}</div>` : ""}<div class="lt-frage">Klatsche das Wort. Wie viele Silben?</div>`,
            antworten: ["1", "2", "3", "4"], richtig: x.n - 1, loesung: `${silbenHtml(x.s)} <span class="lt-klein">${x.n} Silbe${x.n > 1 ? "n" : ""}</span>` };
    }
};

W.reime = {
    titel: "Reimt sich das?", emoji: "🪄", gruppe: "Deutsch",
    text: "Zwei Bilder – reimen sich die Wörter? Mit roten und grünen Karten.",
    optionen: [{ k: "wort", label: "Wörter zeigen", werte: [[false, "nur Bilder"], [true, "Bilder und Wörter"]] }],
    std: { wort: false },
    aufgabe(e){
        const W2 = D().woerter, finde = b => W2.find(x => x.b === b);
        const reime = D().reime.filter(([a, b]) => finde(a) && finde(b));
        let a, b, stimmt = Math.random() < .5 && reime.length;
        if (stimmt) { [a, b] = wahl(reime).map(finde); if (Math.random() < .5) [a, b] = [b, a]; }
        else { a = wahl(W2); do { b = wahl(W2); } while (b === a || reime.some(([p, q]) => (p === a.b && q === b.b) || (p === b.b && q === a.b))); }
        return { html: `<div class="lt-paar">${bild(a.b)}<span class="lt-plus">?</span>${bild(b.b)}</div>${e.wort ? `<div class="lt-gross lt-lesen">${esc(a.w)} – ${esc(b.w)}</div>` : ""}<div class="lt-frage">Reimen sich die Wörter?</div>`,
            antworten: ["🟢 ja", "🔴 nein"], richtig: stimmt ? 0 : 1, loesung: `<b>${esc(a.w)} – ${esc(b.w)}</b>: ${stimmt ? "reimt sich ✅" : "reimt sich nicht"}` };
    }
};

const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
W.abc = {
    titel: "ABC-Blitz", emoji: "🔠", gruppe: "Deutsch",
    text: "Welcher Buchstabe kommt vorher – welcher danach?",
    optionen: [{ k: "art", label: "Frage", werte: [["beide", "vorher und nachher"], ["vorher", "nur vorher"], ["nachher", "nur nachher"]] }],
    std: { art: "beide" },
    aufgabe(e){
        const i = z(1, 24), b = ABC[i];
        const f = e.art === "vorher" ? `<span class="lt-luecke">?</span> ${b}` : e.art === "nachher" ? `${b} <span class="lt-luecke">?</span>` : `<span class="lt-luecke">?</span> ${b} <span class="lt-luecke">?</span>`;
        const l = e.art === "vorher" ? `${ABC[i - 1]} ${b}` : e.art === "nachher" ? `${b} ${ABC[i + 1]}` : `${ABC[i - 1]} ${b} ${ABC[i + 1]}`;
        return { html: `<div class="lt-gross lt-abc">${f}</div>`, loesung: `<span class="lt-loes-zahl">${l}</span>` };
    }
};

W.wortarten = {
    titel: "Wortarten-Sortiermaschine", emoji: "🎮", gruppe: "Deutsch",
    text: "Nomen, Verb oder Adjektiv? Antwort mit Zahlenkarten 1–3.",
    optionen: [{ k: "satz", label: "Hilfe", werte: [[false, "ohne Hilfe"], [true, "mit Test-Frage"]] }],
    std: { satz: true },
    aufgabe(e){
        const arten = Object.keys(D().wortarten), art = wahl(arten), w = wahl(D().wortarten[art]);
        const anzeige = art === "Nomen" ? w : w.toLowerCase();
        return { html: `<div class="lt-gross lt-lesen">${esc(art === "Nomen" ? w.toUpperCase() : anzeige.toUpperCase())}</div>${e.satz ? `<div class="lt-klein">Test: „der/die/das …“? · „ich …“? · „ganz …“?</div>` : ""}`,
            antworten: ["Nomen", "Verb", "Adjektiv"], richtig: ["Nomen", "Verben", "Adjektive"].indexOf(art), loesung: `<b>${esc(anzeige)}</b> ist ein${art === "Nomen" ? " Nomen" : art === "Verben" ? " Verb" : " Adjektiv"}` };
    }
};

W.begleiter = {
    titel: "der, die oder das?", emoji: "🏷️", gruppe: "Deutsch",
    text: "Bild zeigen – welcher Begleiter passt? Antwort mit Zahlenkarten 1–3.",
    optionen: [{ k: "wort", label: "Wort zeigen", werte: [[true, "Bild und Wort"], [false, "nur Bild"]] }],
    std: { wort: true },
    aufgabe(e){
        const x = wahl(D().woerter.filter(w => !/^(Socken|Nudeln)$/.test(w.w)));
        return { html: `<div class="lt-bild-gross">${bild(x.b)}</div>${e.wort ? `<div class="lt-gross lt-lesen">___ ${esc(x.w)}</div>` : ""}`,
            antworten: ["der", "die", "das"], richtig: ["der", "die", "das"].indexOf(x.a), loesung: `<b>${x.a} ${esc(x.w)}</b>` };
    }
};

W.kim = {
    titel: "Kim-Spiel: Was fehlt?", emoji: "🧠", gruppe: "Allgemein",
    text: "Bilder einprägen – eins verschwindet. Welches fehlt?",
    optionen: [
        { k: "anzahl", label: "Bilder", werte: [[4, "4"], [5, "5"], [6, "6"], [8, "8"]] },
        { k: "zeit", label: "Anschauen", werte: [[10000, "10 Sek."], [20000, "20 Sek."], [30000, "30 Sek."]] }
    ],
    std: { anzahl: 5, zeit: 20000 },
    eigen(el, e, api){
        const n = +e.anzahl || 5, liste = D().ziehen(D().woerter, n), weg = z(0, n - 1);
        const raster = (fehlt) => `<div class="lt-kim" style="--n:${n > 6 ? 4 : n > 4 ? 3 : n}">${liste.map((x, i) => `<div class="lt-kim-feld">${fehlt && i === weg ? '<span class="lt-luecke gross">?</span>' : bild(x.b)}</div>`).join("")}</div>`;
        el.innerHTML = raster(false) + `<div class="lt-frage">Merk dir alle Bilder! <span class="lt-countdown"></span></div>`;
        let rest = Math.round((+e.zeit || 20000) / 1000);
        const cd = el.querySelector(".lt-countdown");
        const tick = () => { cd.textContent = rest + " Sek."; if (rest-- <= 0) { api.stop(); el.innerHTML = raster(true) + `<div class="lt-frage">Was fehlt?</div>`; api.loesungSetzen(`${bild(liste[weg].b)} <b>${esc(liste[weg].w)}</b>`); } };
        tick(); api.intervall(tick, 1000);
    }
};

const AUGEN = { 1: [[50, 50]], 2: [[28, 28], [72, 72]], 3: [[28, 28], [50, 50], [72, 72]], 4: [[28, 28], [72, 28], [28, 72], [72, 72]], 5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]], 6: [[28, 26], [72, 26], [28, 50], [72, 50], [28, 74], [72, 74]] };
const wuerfelSvg = n => `<svg viewBox="0 0 100 100" class="lt-wuerfel"><rect x="4" y="4" width="92" height="92" rx="18" fill="#fff" stroke="#16324a" stroke-width="5"/>${AUGEN[n].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#16324a"/>`).join("")}</svg>`;
W.wuerfel = {
    titel: "Würfel", emoji: "🎲", gruppe: "Allgemein",
    text: "Ein oder zwei große Würfel – für Rechenspiele, Bewegung oder „Wer ist dran?“.",
    optionen: [{ k: "anzahl", label: "Würfel", werte: [[1, "1 Würfel"], [2, "2 Würfel"], [3, "3 Würfel"]] }],
    std: { anzahl: 1 },
    eigen(el, e, api){
        const n = +e.anzahl || 1;
        const werfen = () => {
            let k = 0; api.stop();
            api.intervall(() => {
                const w = Array.from({ length: n }, () => z(1, 6));
                el.innerHTML = `<div class="lt-wuerfel-reihe">${w.map(wuerfelSvg).join("")}</div><div class="lt-frage">${k >= 9 ? (n > 1 ? "Rechne!" : "") : "…"}</div>`;
                if (++k > 9) { api.stop(); api.klang(660, .12); api.loesungSetzen(n > 1 ? `Summe <b>${w.reduce((a, b) => a + b, 0)}</b>${n === 2 ? ` · Produkt <b>${w[0] * w[1]}</b> · Unterschied <b>${Math.abs(w[0] - w[1])}</b>` : ""}` : `<b class="lt-loes-zahl">${w[0]}</b>`, n === 1); }
            }, 70);
        };
        api.weiterText("🎲 Würfeln"); api.weiter = werfen; werfen();
    }
};

/* Leise-Wald / Leise-Meer: Je leiser die Klasse, desto mehr Tiere kommen in die Szene.
   Die Tiere laufen, hüpfen, fliegen und schwimmen herum; bei Lärm laufen sie davon.
   Das Mikrofon misst nur die Lautstärke – es wird nichts aufgenommen, gespeichert oder verschickt. */
const WALD_TIERE = ["hase", "igel", "fuchs", "eule", "eichhoernchen", "maus", "baer", "hirsch", "frosch", "schnecke", "vogel", "schmetterling"];
const MEER_TIERE = ["fisch", "delfin", "krebs", "ente", "qualle", "wal", "tropenfisch", "schildkroete", "krake", "robbe", "kugelfisch", "pinguin"];
const TURM = `<svg viewBox="0 0 60 120"><path d="M18 112 L24 34 L36 34 L42 112 Z" fill="#fffdf5"/><path d="M20.5 84 L39.5 84 L40.6 98 L19.4 98 Z M22.5 58 L37.5 58 L38.4 70 L21.6 70 Z" fill="#e74c3c"/><rect x="21" y="22" width="18" height="12" rx="2" fill="#f2c97b"/><path d="M18 22 L30 10 L42 22 Z" fill="#e74c3c"/><rect x="14" y="110" width="32" height="8" rx="2" fill="#7c8a85"/></svg>`;
// art: lauf · huepf · kriech · flieg · flatter (Wald) – schwimm · oben · spring · treib · sand (Meer); v = Tempo (Bildbreiten pro Sekunde), g = Größe
const VERHALTEN = {
    hase: { art: "huepf", v: .16, g: .95 }, igel: { art: "lauf", v: .05, g: .75 }, fuchs: { art: "lauf", v: .12, g: 1.05 }, eule: { art: "flieg", v: .07, g: .85 },
    eichhoernchen: { art: "huepf", v: .2, g: .75 }, maus: { art: "lauf", v: .17, g: .55 }, baer: { art: "lauf", v: .05, g: 1.4 }, hirsch: { art: "lauf", v: .08, g: 1.35 },
    frosch: { art: "huepf", v: .1, g: .7 }, schnecke: { art: "kriech", v: .015, g: .6 }, vogel: { art: "flieg", v: .13, g: .65 }, schmetterling: { art: "flatter", v: .07, g: .55 },
    fisch: { art: "schwimm", v: .09, g: .75 }, tropenfisch: { art: "schwimm", v: .11, g: .7 }, kugelfisch: { art: "schwimm", v: .05, g: .75 }, schildkroete: { art: "schwimm", v: .035, g: 1 },
    delfin: { art: "spring", v: .14, g: 1.15 }, pinguin: { art: "spring", v: .1, g: .85 }, wal: { art: "oben", v: .035, g: 1.7 }, robbe: { art: "oben", v: .06, g: 1 }, ente: { art: "oben", v: .05, g: .75 },
    krake: { art: "treib", v: .025, g: 1 }, qualle: { art: "treib", v: .02, g: .8 }, krebs: { art: "sand", v: .06, g: .7 }
};
const FLIEGT = a => a === "flieg" || a === "flatter";
// Gezeichneter Wald (Himmel, Sonne, Hügel, Tannen und Laubbäume in drei Ebenen, Blumenwiese)
const WOLKE = `<svg viewBox="0 0 220 90"><g fill="#fff"><ellipse cx="70" cy="58" rx="58" ry="26"/><ellipse cx="118" cy="42" rx="46" ry="34"/><ellipse cx="160" cy="60" rx="44" ry="24"/><rect x="40" y="58" width="150" height="26" rx="13"/></g></svg>`;
function WALD_SVG(){
    const zz = (i, a, b) => a + ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1 * (b - a);   // feste „Zufallswerte“
    const tanne = (x, y, h, f) => { const w = h * .42; return `<g><rect x="${x - h * .035}" y="${y - h * .12}" width="${h * .07}" height="${h * .14}" fill="#7a5532"/>` +
        [0, 1, 2].map(k => { const t = y - h * .1 - k * h * .27, bw = w * (1 - k * .22); return `<path d="M${x - bw} ${t} L${x} ${t - h * .42} L${x + bw} ${t} Z" fill="${f}"/>`; }).join("") + `</g>`; };
    const laub = (x, y, h, f, hell) => `<g><rect x="${x - h * .05}" y="${y - h * .45}" width="${h * .1}" height="${h * .45}" rx="${h * .03}" fill="#8a5a2e"/>
        <circle cx="${x - h * .2}" cy="${y - h * .55}" r="${h * .26}" fill="${f}"/><circle cx="${x + h * .2}" cy="${y - h * .58}" r="${h * .25}" fill="${f}"/><circle cx="${x}" cy="${y - h * .8}" r="${h * .3}" fill="${f}"/>
        <circle cx="${x - h * .08}" cy="${y - h * .9}" r="${h * .12}" fill="${hell}" opacity=".7"/></g>`;
    let hinten = "", mitte = "", blumen = "";
    for (let i = 0; i < 22; i++) hinten += tanne(i * 76 + zz(i, -18, 18), 452 + zz(i + 3, -8, 8), zz(i + 7, 90, 150), i % 3 ? "#7fae76" : "#8bb882");
    [[90, 1], [330, 0], [560, 1], [800, 0], [1040, 1], [1290, 0], [1520, 1]].forEach(([x, art], i) => { const h = zz(i + 20, 150, 200);
        mitte += art ? laub(x + zz(i, -30, 30), 512, h, i % 2 ? "#5e9e52" : "#4f8f45", "#86c272") : tanne(x + zz(i, -30, 30), 512, h * 1.15, "#4d8a48"); });
    const farben = ["#ffffff", "#ffd84d", "#f48fb1", "#ffb74d", "#b39ddb"];
    for (let i = 0; i < 60; i++) { const x = zz(i + 40, 0, 1600), y = zz(i + 90, 560, 690); blumen += `<circle cx="${x}" cy="${y}" r="${zz(i + 5, 3, 6)}" fill="${farben[i % 5]}" opacity=".9"/>`; }
    return `<svg class="lw-wald" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs><linearGradient id="lwHimmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd6f5"/><stop offset=".6" stop-color="#d4eefc"/><stop offset="1" stop-color="#fdf3d8"/></linearGradient>
        <radialGradient id="lwSonne"><stop offset="0" stop-color="#fff3b0" stop-opacity=".9"/><stop offset="1" stop-color="#fff3b0" stop-opacity="0"/></radialGradient>
        <linearGradient id="lwWiese" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#84c26b"/><stop offset="1" stop-color="#5d9b47"/></linearGradient></defs>
      <rect width="1600" height="700" fill="url(#lwHimmel)"/>
      <circle cx="1330" cy="120" r="170" fill="url(#lwSonne)"/><circle class="lw-sonne2" cx="1330" cy="120" r="62" fill="#ffd45c"/>
      <path d="M0 440 Q180 360 400 410 T 820 390 T 1240 405 T 1600 370 V700 H0 Z" fill="#bcdcae"/>
      ${hinten}
      <path d="M0 482 Q300 440 620 476 T 1200 466 T 1600 458 V700 H0 Z" fill="#9ccd88"/>
      ${mitte}
      <path d="M0 548 Q380 512 800 538 T 1600 526 V700 H0 Z" fill="url(#lwWiese)"/>
      ${blumen}
    </svg>`;
}
W.leise = {
    titel: "Leise-Wald", emoji: "🌳", gruppe: "Allgemein",
    text: "Je leiser ihr seid, desto mehr Tiere kommen in den Wald und spielen dort. Wird es laut, laufen sie davon. (Mikrofon nötig – es wird nichts aufgenommen.)",
    optionen: [
        { k: "minuten", label: "Alle Tiere nach", zeigen: e => e.modus === "zuschauen", werte: [[1, "1 Min. Ruhe"], [2, "2 Min. Ruhe"], [3, "3 Min. Ruhe"], [5, "5 Min. Ruhe"], [10, "10 Min. Ruhe"]] },
        { k: "tiere", label: "Tiere", zeigen: e => e.modus === "zuschauen" || e.modus === "ende", werte: [[6, "6 Tiere"], [9, "9 Tiere"], [12, "12 Tiere"]] },
        { k: "modus", label: "Art", werte: [["ende", "Überraschung am Ende"], ["melden", "Nur melden, wenn's laut wird"], ["sterne", "Stille-Sterne sammeln"], ["zuschauen", "Tiere kommen live (zum Zuschauen)"]] },
        { k: "arbeitszeit", label: "Arbeitszeit", zeigen: e => e.modus !== "zuschauen", werte: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20, 25, 30].map(m => [m, m + " Min."]) }
    ],
    std: { minuten: 3, tiere: 9, modus: "ende", arbeitszeit: 10 },
    // zuletzt gewählte Art und Arbeitszeit merken (auf diesem Gerät)
    gemerkt(){ try { return JSON.parse(localStorage.getItem("lt-leise-wahl") || "{}"); } catch (x) { return {}; } },
    eigen(el, e, api){
        const meer = e.thema === "meer";
        const n = +e.tiere || 9, proTier = (+e.minuten || 3) * 60 / n;
        // Art: live zuschauen – oder ruhiger Bildschirm während der Arbeit (Überraschung am Ende, nur melden, Sterne)
        const modus = ["ende", "melden", "sterne", "zuschauen"].includes(e.modus) ? e.modus : "ende";
        const dauer = Math.max(60, (+e.arbeitszeit || 10) * 60);
        const ruhigerModus = modus !== "zuschauen";
        try { localStorage.setItem("lt-leise-wahl", JSON.stringify({ modus, arbeitszeit: Math.round(dauer / 60), tiere: n, minuten: +e.minuten || 3 })); } catch (x) {}
        let schwelle = 45; try { schwelle = +localStorage.getItem("lt-leise-schwelle") || 45; } catch (x) {}
        const reihe = (meer ? MEER_TIERE : WALD_TIERE).slice();
        const liste = [...reihe.slice(0, 4), ...mischen(reihe.slice(4))].slice(0, n);   // abwechslungsreicher Start: laufen, fliegen, hüpfen …
        const deko = meer
            ? `<div class="lw-wolke" style="top:8%;--t:70s">☁️</div><div class="lw-wolke" style="top:18%;--t:95s;animation-delay:-40s">☁️</div>
               <div class="lw-turm">${TURM}</div><div class="lw-strahl"></div>
               <div class="lw-wasser"></div><div class="lw-sand"></div>
               ${[8, 22, 47, 63, 81, 93].map((x, i) => `<div class="lw-tang" style="left:${x}%;animation-delay:${-i * .7}s">🌿</div>`).join("")}
               ${Array.from({ length: 10 }, (_, i) => `<i class="lw-blase-luft" style="left:${5 + i * 9.5}%;--t:${5 + (i % 4) * 2}s;animation-delay:${-i * 1.3}s"></i>`).join("")}`
            : `${WALD_SVG()}${[[7, 80, 0, 1], [17, 120, -60, .8], [10, 150, -110, .6]].map(([y, t, d, g]) => `<div class="lw-wolke2" style="top:${y}%;--t:${t}s;animation-delay:${d}s;--g:${g}">${WOLKE}</div>`).join("")}`;
        const ziel = meer ? "am Leuchtturm" : "im Wald";
        const ruheText = { ende: `🤫 Arbeitet leise – am Ende wartet eine Überraschung ${ziel}!`, melden: "🤫 Jetzt wird leise gearbeitet.", sterne: "🤫 Jede leise Minute bringt einen Stern ins Glas." }[modus] || "";
        const ruhe = ruhigerModus ? `<div class="lw-ruhe ${modus}${meer ? " meer" : ""}">
            <div class="lw-r-karte">
              ${modus === "sterne" ? `<div class="lw-r-reihe"><div class="lw-glas"><div class="lw-glas-sterne"></div></div><div><div class="lw-r-uhr">${Math.floor(dauer / 60)}:00</div><div class="lw-r-zahl">⭐ <b>0</b> Sterne</div></div></div>`
                : `<div class="lw-r-symbol">${modus === "ende" ? "🎁" : "🦉"}</div><div class="lw-r-uhr">${Math.floor(dauer / 60)}:00</div>`}
              <div class="lw-r-text">${ruheText}</div>
            </div>
            <div class="lw-r-pssst" hidden><div><span>🦉</span><b>Pssst!</b><small>Bitte leise arbeiten.</small></div></div>
          </div>` : "";
        el.innerHTML = `<div class="lw-szene${meer ? " lw-meer" : ""}">${deko}<div class="lw-tiere"></div><div class="lw-blase" hidden></div>${ruhe}</div>
        <div class="lw-anzeige">
            <span class="lw-zahl" ${ruhigerModus ? "hidden" : ""}><b>0</b> / ${n} Tiere</span>
            <div class="lw-messer"><div class="lw-pegel"></div><div class="lw-grenze"></div></div>
            <label class="lw-regler" title="Wie laut darf es sein, bevor die Tiere weglaufen?">streng <input type="range" min="15" max="85" value="${schwelle}"> locker</label>
        </div>
        <div class="lt-frage lw-hinweis">Tippe auf „Start“ und erlaube das Mikrofon.</div>`;
        const szene = el.querySelector(".lw-szene"), ebene = el.querySelector(".lw-tiere");
        if (ruhigerModus) szene.classList.add("still");
        const kopf = el.querySelector(".lw-zahl b"), pegel = el.querySelector(".lw-pegel"), grenze = el.querySelector(".lw-grenze"), blase = el.querySelector(".lw-blase"), hinweis = el.querySelector(".lw-hinweis");
        const regler = el.querySelector(".lw-regler input");
        const grenzeSetzen = () => { grenze.style.left = schwelle + "%"; };
        grenzeSetzen();
        regler.addEventListener("input", () => { schwelle = +regler.value; grenzeSetzen(); try { localStorage.setItem("lt-leise-schwelle", schwelle); } catch (x) {} });

        /* ---------- Tiere: Position in Anteilen der Szene (0–1), Füße bei y ---------- */
        const SPIEGEL = meer ? .4 : 0;          // Wasseroberfläche im Meer
        const tiere = liste.map((b, i) => {
            const c = VERHALTEN[b] || { art: meer ? "schwimm" : "lauf", v: .08, g: .9 };
            const d = document.createElement("div");
            d.className = "lw-tier"; d.innerHTML = `<div class="lw-koerper">${bild(b)}</div>`;
            ebene.appendChild(d);
            return { b, c, d, zust: "weg", x: 0, y: 0, zx: .5, zy: .5, dir: 1, t: Math.random() * 10, pause: 0, vorn: i % 2, sprung: 0, sprungIn: 3 + Math.random() * 4 };
        });
        const basisY = t => {
            const a = t.c.art;
            if (!meer) return FLIEGT(a) ? .14 + Math.random() * .26 : (t.vorn ? .9 : .76);
            if (a === "oben") return SPIEGEL + .04;
            if (a === "sand") return .95;
            if (a === "treib") return .55 + Math.random() * .3;
            if (a === "spring") return SPIEGEL + .14;
            return .5 + Math.random() * .38;
        };
        function kommen(t){
            t.zust = "kommt"; t.d.classList.add("da"); t.d.classList.remove("flieht");
            const links = Math.random() < .5;
            t.x = links ? -.12 : 1.12; t.dir = links ? 1 : -1;
            t.y = basisY(t); t.zy = t.y;
            if (FLIEGT(t.c.art)) t.y = -.15;
            if (meer && t.c.art === "treib") { t.x = .15 + Math.random() * .7; t.y = 1.25; }
            t.zx = .12 + Math.random() * .76;
            api.klang(560 + Math.random() * 300, .12);
        }
        function fliehen(t){
            t.zust = "flieht"; t.d.classList.add("flieht");
            t.dir = t.x < .5 ? -1 : 1; t.zx = t.dir < 0 ? -.25 : 1.25;
            if (FLIEGT(t.c.art)) t.zy = -.3;
            if (meer && (t.c.art === "treib" || t.c.art === "sand")) t.zy = 1.3;
        }
        let W0 = szene.clientWidth || 800, H0 = szene.clientHeight || 400;
        const groesse = () => Math.min(W0 * .1, H0 * .2);
        let letzte = performance.now(), raf = 0, feier = false;
        function schritt(jetzt){
            const dt = Math.min(.05, (jetzt - letzte) / 1000); letzte = jetzt;
            W0 = szene.clientWidth || W0; H0 = szene.clientHeight || H0;
            const S = groesse();
            for (const t of tiere) {
                if (t.zust === "weg") continue;
                const a = t.c.art, flieht = t.zust === "flieht";
                const v = t.c.v * (flieht ? 4.5 : 1) * (W0 > 0 ? 1 : 0);
                t.t += dt;
                // waagerecht laufen/schwimmen, am Ziel kurz warten und ein neues Ziel suchen
                if (t.pause > 0 && !flieht) t.pause -= dt;
                else {
                    const dx = t.zx - t.x;
                    if (Math.abs(dx) < .01 && !flieht) {
                        t.zust = "da"; t.pause = .4 + Math.random() * (a === "kriech" ? 1 : 2.5);
                        t.zx = .08 + Math.random() * .84;
                        if (meer && a === "treib") t.zy = .55 + Math.random() * .3;
                        if (FLIEGT(a)) t.zy = .12 + Math.random() * .28;
                    } else { t.dir = Math.sign(dx) || t.dir; t.x += Math.sign(dx) * Math.min(Math.abs(dx), v * dt); }
                }
                // senkrecht: sanft zum Ziel (Fliegen, Treiben, Ankommen von oben/unten, Weglaufen)
                if (FLIEGT(a) || (meer && (a === "treib" || flieht))) t.y += (t.zy - t.y) * Math.min(1, dt * (flieht ? 2.5 : .8));
                else if (t.zust === "kommt" && Math.abs(t.y - t.zy) > .005) t.y += (t.zy - t.y) * Math.min(1, dt * 2);
                // Bewegungsart → Versatz, Drehung, Quetschen
                let oy = 0, rot = 0, sy = 1;
                const laeuft = t.pause <= 0 || flieht;
                if (a === "huepf" && laeuft) oy = -Math.abs(Math.sin(t.t * (flieht ? 14 : 7))) * .09;
                else if (a === "lauf" && laeuft) oy = -Math.abs(Math.sin(t.t * (flieht ? 22 : 11))) * .012;
                else if (a === "kriech") sy = 1 + Math.sin(t.t * 3) * .06;
                else if (a === "flieg") { oy = Math.sin(t.t * 2.2) * .03; rot = Math.sin(t.t * 2.2) * 6; }
                else if (a === "flatter") { oy = Math.sin(t.t * 4.5) * .05 + Math.sin(t.t * 1.3) * .03; rot = Math.sin(t.t * 9) * 10; }
                else if (a === "oben") { oy = Math.sin(t.t * 1.8) * .008; rot = Math.sin(t.t * 1.8) * 4; }
                else if (a === "schwimm") { oy = Math.sin(t.t * 2) * .012; rot = Math.sin(t.t * 2) * 5; }
                else if (a === "treib") { oy = Math.sin(t.t * 1.2) * .03; sy = 1 + Math.sin(t.t * 2.4) * .08; }
                else if (a === "spring" && !flieht) {
                    // ab und zu ein Sprung über die Wellen
                    if (t.sprung <= 0) { t.sprungIn -= dt; if (t.sprungIn <= 0 && t.pause <= 0) { t.sprung = 1.3; t.sprungIn = 4 + Math.random() * 5; api.klang(900, .08); } oy = Math.sin(t.t * 2) * .01; }
                    else { t.sprung -= dt; const p = 1 - t.sprung / 1.3; oy = -Math.sin(p * Math.PI) * .32; rot = (p - .5) * 70 * -t.dir; }
                }
                if (a === "sand" && laeuft) oy = -Math.abs(Math.sin(t.t * 16)) * .008;
                const g = t.c.g * S * (meer ? 1 : (FLIEGT(a) ? 1 : (t.vorn ? 1 : .8)));
                const px = t.x * W0 - g / 2, py = (t.y + oy) * H0 - g;
                t.d.style.width = t.d.style.height = g + "px";
                t.d.style.zIndex = FLIEGT(a) ? 6 : (t.vorn ? 5 : 3);
                t.d.style.transform = `translate(${px}px, ${py}px) rotate(${rot}deg)`;
                t.d.firstChild.style.transform = `scale(${t.dir > 0 ? -1 : 1}, ${sy})`;   // Bilder schauen nach links → beim Laufen nach rechts spiegeln
                if (flieht && (t.x < -.2 || t.x > 1.2 || t.y < -.25 || t.y > 1.25)) { t.zust = "weg"; t.d.classList.remove("da", "flieht"); }
            }
            raf = requestAnimationFrame(schritt);
        }
        raf = requestAnimationFrame(schritt);

        let sichtbar = 0, ruhig = 0, laut = 0, sperre = 0, laeuft = false, fertig = false, stream = null, ctx = null, analyser = null, puffer = null, glatt = 0;
        const anzahlZeigen = () => { kopf.textContent = sichtbar; };
        const erschrecken = () => { szene.classList.remove("schreck"); void szene.offsetWidth; szene.classList.add("schreck"); };
        const jubeln = (an) => { szene.classList.toggle("jubel", an); };
        const starten = async () => {
            if (laeuft) return;
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { hinweis.textContent = "Dieses Gerät oder dieser Browser erlaubt kein Mikrofon (die Seite muss über https geöffnet sein)."; return; }
            try { stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } }); }
            catch (x) { hinweis.textContent = "Kein Zugriff aufs Mikrofon – bitte im Browser erlauben und noch einmal „Start“ tippen."; return; }
            ctx = new (window.AudioContext || window.webkitAudioContext)();
            const quelle = ctx.createMediaStreamSource(stream);
            analyser = ctx.createAnalyser(); analyser.fftSize = 1024; puffer = new Float32Array(analyser.fftSize);
            quelle.connect(analyser);
            laeuft = true; hinweis.textContent = ruhigerModus ? "" : meer ? "Psst … wer kommt wohl als Erstes zum Leuchtturm geschwommen?" : "Psst … wer kommt wohl als Erstes in den Wald?";
            api.weiterText("🔄 Neu starten");
        };
        api.aufraeumen(() => { cancelAnimationFrame(raf); if (stream) stream.getTracks().forEach(t => t.stop()); if (ctx) ctx.close(); });
        // 10-mal pro Sekunde messen
        api.intervall(() => {
            if (!laeuft || !analyser) return;
            analyser.getFloatTimeDomainData(puffer);
            let q = 0; for (let i = 0; i < puffer.length; i++) q += puffer[i] * puffer[i];
            const db = 20 * Math.log10(Math.sqrt(q / puffer.length) + 1e-8);   // etwa −80 (still) bis 0 (sehr laut)
            const wert = Math.max(0, Math.min(100, (db + 70) * 1.6));
            glatt = glatt * .7 + wert * .3;
            pegel.style.width = glatt + "%";
            pegel.classList.toggle("laut", glatt > schwelle);
            if (fertig) return;
            if (ruhigerModus) { ruhigMessen(glatt > schwelle); return; }
            if (glatt > schwelle) {
                laut += .1; ruhig = Math.max(0, ruhig - .3);
                if (laut >= .6 && Date.now() > sperre && sichtbar > 0) {
                    sichtbar--; fliehen(tiere[sichtbar]); anzahlZeigen(); erschrecken(); sperre = Date.now() + 1500; laut = 0;
                    blase.textContent = meer ? "Huch! Zu laut – " + (window.LT_BILDER[tiere[sichtbar].b] || [""])[0] + " taucht weg! 🫧" : "Huch! Zu laut – " + (window.LT_BILDER[tiere[sichtbar].b] || [""])[0] + " läuft weg! 🙉";
                    blase.hidden = false; setTimeout(() => { blase.hidden = true; }, 1600);
                    hinweis.textContent = "Wenn ihr wieder leise seid, kommt es zurück …";
                    api.klang(220, .25, "triangle");
                }
            } else {
                laut = Math.max(0, laut - .05); ruhig += .1;
                if (ruhig >= proTier && sichtbar < n) {
                    ruhig = 0; kommen(tiere[sichtbar]); sichtbar++; anzahlZeigen();
                    const name = (window.LT_BILDER[tiere[sichtbar - 1].b] || [""])[0];
                    hinweis.textContent = sichtbar === n ? "" : (meer ? name + " ist aufgetaucht! Wer kommt als Nächstes?" : name + " ist da! Wer kommt als Nächstes?");
                    if (sichtbar === n) { fertig = true; jubeln(true); hinweis.textContent = meer ? "Geschafft! Alle Tiere sind am Leuchtturm – ihr wart super leise! 🎉" : "Geschafft! Alle Tiere sind im Wald – ihr wart super leise! 🎉"; api.gong(); }
                }
            }
        }, 100);
        /* ---------- Ruhige Modi: der Bildschirm bleibt während der Arbeit ruhig ---------- */
        const ruheEl = el.querySelector(".lw-ruhe");
        let zeit = 0, stillZeit = 0, lautAm = 0, pssstN = 0, sterne = 0, minLaut = 0, minZeit = 0, pssstSperre = 0;
        const uhrEl = ruheEl && ruheEl.querySelector(".lw-r-uhr"), pssstEl = ruheEl && ruheEl.querySelector(".lw-r-pssst");
        const mmss = sek => Math.floor(sek / 60) + ":" + String(Math.floor(sek % 60)).padStart(2, "0");
        function pssst(){
            pssstN++; pssstSperre = Date.now() + 5000;
            pssstEl.hidden = false; pssstEl.classList.remove("an"); void pssstEl.offsetWidth; pssstEl.classList.add("an");
            api.klang(330, .3, "sine"); setTimeout(() => api.klang(262, .4, "sine"), 260);
            setTimeout(() => { pssstEl.hidden = true; }, 2200);
        }
        function sternDazu(){
            sterne++; ruheEl.querySelector(".lw-r-zahl b").textContent = sterne;
            const st = document.createElement("i"); st.textContent = "⭐";
            st.style.left = (12 + Math.random() * 70) + "%"; st.style.setProperty("--y", (Math.floor((sterne - 1) / 6) * 16) + "%");
            ruheEl.querySelector(".lw-glas-sterne").appendChild(st); api.klang(880, .15);
        }
        function ruhigMessen(istLaut){
            zeit += .1; minZeit += .1;
            if (istLaut) { lautAm += .1; minLaut += .1; } else { stillZeit += .1; lautAm = Math.max(0, lautAm - .05); }
            if (lautAm >= .8 && Date.now() > pssstSperre && modus !== "ende") { pssst(); lautAm = 0; }
            if (lautAm >= 1.5 && Date.now() > pssstSperre && modus === "ende") { pssst(); lautAm = 0; }
            if (modus === "sterne" && minZeit >= 60) { if (minLaut < 4) sternDazu(); minZeit = 0; minLaut = 0; }
            if (uhrEl) uhrEl.textContent = mmss(Math.max(0, dauer - zeit));
            if (zeit >= dauer) ruhigFertig();
        }
        function ruhigFertig(){
            fertig = true; api.gong();
            const anteil = zeit ? stillZeit / zeit : 0;
            if (modus === "ende") {
                const k = Math.max(anteil > .25 ? 1 : 0, Math.min(n, Math.round(n * anteil / .9)));
                ruheEl.classList.add("weg"); szene.classList.remove("still");
                hinweis.textContent = "Ihr habt " + Math.round(anteil * 100) + " % der Zeit leise gearbeitet …";
                kopf.parentNode.hidden = false;
                for (let i = 0; i < k; i++) setTimeout(() => { kommen(tiere[sichtbar]); sichtbar++; anzahlZeigen();
                    if (sichtbar === k) { hinweis.textContent = k === n ? `Geschafft! Alle ${n} Tiere sind ${ziel} – ihr wart super leise! 🎉` : `${k} von ${n} Tieren sind ${ziel}! Nächstes Mal schafft ihr noch mehr. 🌱`; if (k === n) jubeln(true); } }, 900 + i * 700);
                if (!k) hinweis.textContent = `Heute hat sich kein Tier ${ziel} getraut – es war zu laut. Nächstes Mal klappt's! 🍀`;
            } else if (modus === "sterne") {
                uhrEl.textContent = "Fertig!"; ruheEl.querySelector(".lw-r-text").textContent = sterne === 1 ? "Ihr habt 1 Stern gesammelt! ⭐" : `Ihr habt ${sterne} Sterne gesammelt! 🎉`;
            } else {
                uhrEl.textContent = "Fertig! 🎉"; ruheEl.querySelector(".lw-r-text").textContent = pssstN === 0 ? "Super – kein einziges Mal „Pssst“! 🌟" : pssstN === 1 ? "Nur 1-mal „Pssst“ – gut gemacht!" : `${pssstN}-mal „Pssst“ – nächstes Mal schafft ihr weniger!`;
            }
        }
        if (ruhigerModus) hinweis.textContent = "Tippe auf „Start“, erlaube das Mikrofon – dann wird " + Math.round(dauer / 60) + " Minuten leise gearbeitet.";
        api.weiter = () => {
            if (!laeuft) { starten(); return; }
            if (ruhigerModus) {   // neue Runde
                zeit = stillZeit = lautAm = pssstN = sterne = minLaut = minZeit = 0; fertig = false; jubeln(false);
                tiere.forEach(t => { if (t.zust !== "weg") fliehen(t); }); sichtbar = 0; anzahlZeigen(); kopf.parentNode.hidden = true;
                ruheEl.classList.remove("weg"); szene.classList.add("still"); ruheEl.querySelector(".lw-r-text").textContent = ruheText;
                if (modus === "sterne") { ruheEl.querySelector(".lw-glas-sterne").innerHTML = ""; ruheEl.querySelector(".lw-r-zahl b").textContent = "0"; }
                hinweis.textContent = "Neue Runde – leise arbeiten!"; return;
            }
            tiere.forEach(t => { if (t.zust !== "weg") fliehen(t); });
            sichtbar = 0; ruhig = 0; laut = 0; fertig = false; jubeln(false); anzahlZeigen();
            hinweis.textContent = "Neue Runde – wer schafft es, ganz leise zu sein?";
        };
        api.weiterText("🎤 Start");
        api.ohneLoesung();
    }
};

W.timer = {
    titel: "Timer", emoji: "⏱️", gruppe: "Allgemein",
    text: "Großer Countdown mit Ring und Gong – für Arbeitsphasen, Stationen und Aufräumen.",
    optionen: [{ k: "minuten", label: "Zeit", werte: [[1, "1 Min."], [2, "2 Min."], [3, "3 Min."], [5, "5 Min."], [6, "6 Min."], [8, "8 Min."], [10, "10 Min."], [15, "15 Min."]] }],
    std: { minuten: 5 },
    eigen(el, e, api){
        const gesamt = (+e.minuten || 5) * 60; let rest = gesamt, laeuft = true;
        el.innerHTML = `<div class="lt-timer"><svg viewBox="0 0 220 220"><circle cx="110" cy="110" r="96" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="16"/><circle class="lt-ring" cx="110" cy="110" r="96" fill="none" stroke="#ffe066" stroke-width="16" stroke-linecap="round" transform="rotate(-90 110 110)" stroke-dasharray="603" stroke-dashoffset="0"/></svg><div class="lt-zeit"></div></div>`;
        const zeit = el.querySelector(".lt-zeit"), ring = el.querySelector(".lt-ring");
        const zeigen = () => { zeit.textContent = Math.floor(rest / 60) + ":" + String(rest % 60).padStart(2, "0"); ring.setAttribute("stroke-dashoffset", String(603 * (1 - rest / gesamt))); ring.setAttribute("stroke", rest <= 10 ? "#ff8fab" : "#ffe066"); };
        zeigen();
        api.intervall(() => { if (!laeuft || rest <= 0) return; rest--; zeigen(); if (rest === 0) { api.gong(); zeit.textContent = "Fertig! 🔔"; } }, 1000);
        api.weiterText("⏸ Pause"); api.weiter = () => { laeuft = !laeuft; if (rest === 0) { rest = gesamt; laeuft = true; zeigen(); } api.weiterText(laeuft ? "⏸ Pause" : "▶ Weiter"); };
        api.ohneLoesung();
    }
};

W.gluecksrad = {
    titel: "Glücksrad", emoji: "🎡", gruppe: "Allgemein",
    text: "Dreht und bestimmt: Platznummer, Kategorie oder eigene Felder.",
    optionen: [{ k: "art", label: "Felder", werte: [["plaetze", "Plätze 1–9"], ["kategorien", "Lern-Kategorien"], ["eigen", "eigene Felder …"]] }],
    std: { art: "plaetze" },
    eigen(el, e, api){
        let felder = Array.isArray(e.felder) && e.felder.length ? e.felder
            : e.art === "kategorien" ? ["Rechnen", "Lesen", "Reimen", "Formen", "Silben", "Joker"]
            : e.art === "eigen" ? (() => { let t = ""; try { t = localStorage.getItem("lt-rad-felder") || ""; } catch (x) {} t = prompt("Felder, durch Komma getrennt (keine Namen von Kindern nötig – Platznummern gehen auch):", t || "Rot, Blau, Grün, Gelb") || t; try { localStorage.setItem("lt-rad-felder", t); } catch (x) {} return t.split(",").map(s => s.trim()).filter(Boolean); })()
            : ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        if (felder.length < 2) felder = ["1", "2"];
        const FARBEN = ["#3d7ea6", "#f2a93b", "#2e8b57", "#c0399b", "#e67e22", "#16324a", "#17a2b8", "#e74c3c", "#7f8c8d"];
        const n = felder.length, w = 360 / n;
        const pfad = i => { const a1 = (i * w - 90) * Math.PI / 180, a2 = ((i + 1) * w - 90) * Math.PI / 180; return `M150 150 L${150 + 140 * Math.cos(a1)} ${150 + 140 * Math.sin(a1)} A140 140 0 ${w > 180 ? 1 : 0} 1 ${150 + 140 * Math.cos(a2)} ${150 + 140 * Math.sin(a2)} Z`; };
        el.innerHTML = `<div class="lt-rad-box"><svg viewBox="0 0 300 300" class="lt-rad"><g class="lt-rad-dreh">${felder.map((f, i) => { const m = ((i + .5) * w - 90) * Math.PI / 180; return `<path d="${pfad(i)}" fill="${FARBEN[i % FARBEN.length]}" stroke="#fff" stroke-width="3"/><text x="${150 + 92 * Math.cos(m)}" y="${150 + 92 * Math.sin(m) + 8}" text-anchor="middle" font-size="${n > 8 ? 18 : 22}" font-weight="900" fill="#fff">${esc(String(f).slice(0, 10))}</text>`; }).join("")}</g><circle cx="150" cy="150" r="20" fill="#fff" stroke="#16324a" stroke-width="4"/></svg><div class="lt-rad-zeiger">▼</div></div>`;
        const g = el.querySelector(".lt-rad-dreh"); let winkel = 0;
        const drehen = () => {
            const ziel = z(0, n - 1); winkel += 360 * 5 + (360 - (ziel + .5) * w) - (winkel % 360);
            g.style.transition = "transform 3.2s cubic-bezier(.17,.67,.21,1)"; g.style.transformOrigin = "150px 150px"; g.style.transform = `rotate(${winkel}deg)`;
            api.loesungSetzen("");
            setTimeout(() => { api.klang(880, .15); api.loesungSetzen(`<b class="lt-loes-zahl">${esc(felder[ziel])}</b>`, true); }, 3300);
        };
        api.weiterText("🎡 Drehen"); api.weiter = drehen;
    }
};

const AUFTRAEGE = ["Heb die rechte Hand.", "Klopf zweimal auf den Tisch.", "Leg deinen Stift auf dein Heft.", "Schließ kurz die Augen.", "Zeig auf die Tür.", "Steh auf und setz dich wieder.", "Klatsch dreimal.", "Leg beide Hände auf den Kopf.", "Zeig deinem Nachbarn drei Finger.", "Dreh dich einmal um.", "Tipp dir auf die Nase.", "Halte dein Heft hoch.", "Stampf einmal mit dem Fuß.", "Zeig zum Fenster.", "Mach dich ganz klein.", "Winke deinem Nachbarn.", "Leg deinen Radiergummi in die Mitte vom Tisch.", "Heb die linke Hand und den rechten Fuß."];
W.auftraege = {
    titel: "Merk-Aufträge", emoji: "📋", gruppe: "Allgemein",
    text: "Mehrere Aufträge erscheinen kurz – dann aus dem Kopf am Platz ausführen. Trainiert Zuhören, Lesen und Merken.",
    optionen: [
        { k: "schritte", label: "Schritte", werte: [[2, "2 Aufträge"], [3, "3 Aufträge"], [4, "4 Aufträge"]] },
        { k: "zeit", label: "Zeigen", werte: [[5000, "5 Sek."], [8000, "8 Sek."], [12000, "12 Sek."], [0, "vorlesen (immer sichtbar)"]] }
    ],
    std: { schritte: 2, zeit: 8000 },
    aufgabe(e){
        const liste = mischen(AUFTRAEGE).slice(0, +e.schritte || 2);
        const html = liste.map((t, i) => `<div><span class="lt-nr">${i + 1}</span>${esc(t)}</div>`).join("");
        return { html: `<div class="lt-blitz"><div class="lt-auftraege">${html}</div></div><div class="lt-frage">${+e.zeit ? "Merk dir die Aufträge – gleich sind sie weg!" : "Hör gut zu – auf „Los!“ machen alle mit."}</div>`, blitz: +e.zeit, loesung: `<div class="lt-auftraege klein">${html}</div>` };
    }
};

const BEWEGUNG = [["🙆", "Ganz groß strecken – und wieder klein machen"], ["🔄", "Arme kreisen – vorwärts und rückwärts"], ["✖️", "Überkreuz: rechter Ellbogen zum linken Knie – und andersrum"], ["∞", "Mit dem Finger eine liegende Acht in die Luft malen"], ["🦩", "Auf einem Bein stehen – wie ein Flamingo"], ["🏃", "Auf der Stelle laufen"], ["🤷", "Schultern hoch zu den Ohren – und fallen lassen"], ["👐", "Hände ausschütteln, als wären sie nass"], ["🌬️", "Dreimal tief einatmen – und langsam ausatmen"], ["👀", "Augen-Yoga: nach oben, unten, links, rechts schauen"], ["🧘", "Hände vor der Brust zusammendrücken – 5 Sekunden"], ["🐢", "In Zeitlupe hinsetzen und wieder aufstehen"]];
W.bewegung = {
    titel: "Bewegungspause", emoji: "🤸", gruppe: "Allgemein",
    text: "Übungen am Platz – wechseln automatisch. Lädt den Kopf-Akku wieder auf.",
    optionen: [{ k: "sekunden", label: "Dauer", werte: [[60, "1 Minute"], [120, "2 Minuten"], [180, "3 Minuten"]] }],
    std: { sekunden: 60 },
    eigen(el, e, api){
        const liste = mischen(BEWEGUNG), proUebung = 15, gesamt = +e.sekunden || 60; let t = 0;
        const zeigen = () => { const u = liste[Math.floor(t / proUebung) % liste.length], rest = proUebung - (t % proUebung);
            el.innerHTML = `<div style="font-size:clamp(80px,min(14vw,22vh),240px);line-height:1">${u[0]}</div><div class="lt-gross" style="font-size:clamp(30px,min(5vw,8vh),80px)">${esc(u[1])}</div><div class="lt-frage">noch ${rest} Sek. · gesamt ${Math.max(0, gesamt - t)} Sek.</div>`; };
        zeigen();
        api.intervall(() => { t++; if (t >= gesamt) { api.stop(); api.gong(); el.innerHTML = `<div style="font-size:clamp(80px,14vw,240px)">🔋</div><div class="lt-gross">Akku voll!</div><div class="lt-frage">Setzt euch leise hin.</div>`; return; } if (t % proUebung === 0) api.klang(740, .15); zeigen(); }, 1000);
        api.ohneLoesung();
    }
};

/* ---------------- Vollbild-Ansicht ---------------- */
/* Gleiche Welt wie die Lernzeit-Präsentation: grüne Kreidetafel im Holzrahmen, Kreideschrift, Eule Ella */
const CSS = `
.lt-voll{ position:fixed; inset:0; z-index:9999; background:#6b4423; color:#fffdf5; font-family:"Andika","Nunito",sans-serif; display:flex; flex-direction:column; user-select:none; padding:1vh 1vw 0; }
.lt-leiste{ display:flex; align-items:center; gap:10px; padding:6px 10px 10px; flex-wrap:wrap; }
.lt-leiste h2{ margin:0; font:400 clamp(22px,2.6vw,34px) "Patrick Hand","Andika",sans-serif; flex:1 1 200px; color:#ffe066; display:flex; align-items:center; gap:.4em; }
.lt-leiste h2 svg{ width:1.6em; height:1.6em; }
@media (max-width:700px){
  .lt-leiste{ display:grid; grid-template-columns:1fr 1fr; gap:6px; padding:4px 4px 8px; position:relative; }
  .lt-leiste h2{ grid-column:1 / -1; padding-right:110px; font-size:24px; }
  .lt-leiste label{ min-width:0; } .lt-leiste label select{ width:100%; font-size:13px; padding:7px 8px; }
  .lt-leiste label[data-optlabel="modus"]{ grid-column:1 / -1; }
  .lt-leiste .lt-x{ position:absolute; top:4px; } .lt-leiste [data-voll]{ right:58px; } .lt-leiste [data-zu]{ right:4px; }
  .lw-anzeige{ gap:8px; } .lw-regler{ font-size:14px; }
}
.lt-leiste select{ font:700 15px "Andika","Nunito",sans-serif; border-radius:10px; border:0; padding:8px 10px; background:#fff3dc; color:#4a2e15; }
.lt-x{ border:0; background:#8a5a2e; color:#fff3dc; width:44px; height:44px; border-radius:12px; font-size:22px; cursor:pointer; box-shadow:inset 0 -3px 0 rgba(0,0,0,.25); }
.lt-buehne{ flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2.2vh; padding:2vh 3vw; text-align:center; min-height:0; overflow:hidden; position:relative; border-radius:14px;
    box-shadow:inset 0 0 0 .6vh #4a2e15, inset 0 0 60px rgba(0,0,0,.45);
    background:radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.07), transparent 55%), linear-gradient(160deg, #2f6b50, #23533e 60%, #1d4634); }
.lt-gross{ font-size:clamp(44px,min(9vw,14vh),160px); font-family:"Patrick Hand","Andika",sans-serif; font-weight:400; line-height:1.1; text-shadow:0 0 1px rgba(255,255,255,.6); }
.lt-lesen{ font-family:"Andika","Nunito",sans-serif; font-weight:700; letter-spacing:.02em; }
.lt-lesen.lang{ font-size:clamp(28px,min(5vw,9vh),90px); }
.lt-emoji{ letter-spacing:.1em; }
.lt-frage{ font-size:clamp(22px,min(3.2vw,4.8vh),46px); font-family:"Patrick Hand","Andika",sans-serif; color:#ffe066; }
.lt-klein{ font-size:clamp(16px,min(2.2vw,3.4vh),32px); font-weight:700; opacity:.85; }
.lt-svg{ max-width:min(90vw,1100px); max-height:46vh; width:100%; }
.lt-breit, .lt-blitz{ width:min(88vw,1000px); }
.lt-breit .lt-svg{ background:#fff; border-radius:18px; padding:10px; }
.lt-blitz .lt-svg{ background:#fff; border-radius:18px; padding:10px; max-width:min(86vw,900px); }
.lt-blitz.weg{ visibility:hidden; }
.lt-uhr-box .lt-svg{ max-height:50vh; width:auto; height:50vh; }
.lt-form{ max-height:40vh; width:auto; height:40vh; }
.lt-bild{ display:inline-flex; width:clamp(90px,min(18vw,26vh),300px); height:clamp(90px,min(18vw,26vh),300px); }
.lt-bild svg{ width:100%; height:100%; }
.lt-bild-gross .lt-bild{ width:clamp(120px,min(26vw,36vh),420px); height:clamp(120px,min(26vw,36vh),420px); background:#fff; border-radius:30px; padding:2vh; }
.lt-paar{ display:flex; align-items:center; gap:3vw; }
.lt-paar .lt-bild{ background:#fff; border-radius:26px; padding:1.6vh; }
.lt-plus{ font-size:clamp(40px,6vw,90px); font-weight:900; opacity:.7; }
.lt-luecke{ display:inline-block; min-width:1.1em; border-bottom:.08em solid #ffe066; color:#ffe066; }
.lt-luecke.gross{ font-size:clamp(60px,8vw,140px); border:0; }
.lt-abc{ letter-spacing:.25em; }
.lt-auftraege{ display:flex; flex-direction:column; gap:1.6vh; text-align:left; font-size:clamp(26px,min(4.2vw,6.4vh),64px); font-weight:800; background:rgba(255,255,255,.08); border-radius:24px; padding:2.4vh 3vw; }
.lt-auftraege.klein{ font-size:clamp(18px,min(2.4vw,3.6vh),36px); padding:1vh 2vw; }
.lt-nr{ display:inline-flex; align-items:center; justify-content:center; width:1.4em; height:1.4em; border-radius:50%; background:#f2a93b; color:#16324a; font-weight:900; margin-right:.5em; font-size:.8em; vertical-align:middle; }
.lt-antworten{ display:flex; gap:1.6vw; flex-wrap:wrap; justify-content:center; }
.lt-antwort{ border:4px solid rgba(255,255,255,.75); background:rgba(255,255,255,.06); color:#fff; border-radius:16px 26px 18px 30px; padding:1.4vh 2.4vw; font:400 clamp(24px,min(3.6vw,5.2vh),56px) "Patrick Hand","Andika",sans-serif; cursor:pointer; display:flex; align-items:center; gap:.5em; transition:.15s; }
.lt-antwort .nr{ background:#ffe066; color:#1d4634; border-radius:12px; width:1.4em; height:1.4em; display:inline-flex; align-items:center; justify-content:center; font-size:.8em; }
.lt-antwort.gewaehlt{ border-color:#ffe066; background:rgba(255,224,102,.2); }
.lt-antwort.richtig{ border-color:#b5e48c; background:rgba(181,228,140,.3); }
.lt-antwort.falsch{ opacity:.35; }
.lt-loesung{ min-height:1.4em; font-size:clamp(24px,min(3.6vw,5.4vh),56px); font-weight:800; display:flex; align-items:center; gap:.5em; flex-wrap:wrap; justify-content:center; }
.lt-loesung .lt-bild{ width:1.8em; height:1.8em; background:#fff; border-radius:12px; padding:4px; }
.lt-loes-zahl{ font-size:1.5em; font-family:"Patrick Hand","Andika",sans-serif; font-weight:400; color:#ffe066; }
.lt-steuer{ display:flex; gap:12px; justify-content:center; padding:10px; flex-wrap:wrap; }
.lt-knopf{ border:0; border-radius:12px 18px 14px 20px; padding:12px 24px; font:400 clamp(18px,2vw,28px) "Patrick Hand","Andika",sans-serif; cursor:pointer; background:#8a5a2e; color:#fff3dc; box-shadow:inset 0 -3px 0 rgba(0,0,0,.25); }
.lt-knopf.gold{ background:#ffe066; color:#1d4634; box-shadow:0 5px 0 #c9a72e; }
.lt-zaehler{ align-self:center; color:#f1d9b5; font-family:"Patrick Hand","Andika",sans-serif; font-size:18px; }
.lt-silben{ display:inline-flex; gap:.15em; font-family:"Andika","Nunito",sans-serif; }
.lt-silbe{ border-bottom:.12em solid #ffe066; border-radius:0 0 50% 50%; padding:0 .12em .1em; }
.lt-geld{ display:flex; flex-wrap:wrap; gap:1.6vw; justify-content:center; align-items:center; max-width:90vw; }
.lt-muenze{ --g:1; width:calc(clamp(70px,9vw,150px) * var(--g)); height:calc(clamp(70px,9vw,150px) * var(--g)); border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-weight:900; font-size:calc(clamp(18px,2.2vw,36px) * var(--g)); color:#3b2a06; box-shadow:inset 0 0 0 6px rgba(0,0,0,.12), 0 6px 14px rgba(0,0,0,.3); }
.lt-muenze.kupfer{ background:radial-gradient(circle at 35% 30%, #f0b08a, #b86b3f); }
.lt-muenze.gold{ background:radial-gradient(circle at 35% 30%, #ffe7a3, #d6a93b); }
.lt-muenze.euro{ background:radial-gradient(circle at 50% 50%, #ffe39a 0 46%, #d9dde0 47% 100%); }
.lt-schein{ display:inline-flex; align-items:center; justify-content:center; width:clamp(150px,18vw,300px); height:clamp(78px,9vw,150px); border-radius:12px; font-weight:900; font-size:clamp(26px,3.4vw,56px); color:#16324a; box-shadow:0 6px 14px rgba(0,0,0,.3); border:4px solid rgba(255,255,255,.6); }
.lt-kim{ display:grid; grid-template-columns:repeat(var(--n),auto); gap:2vw; }
.lt-kim-feld{ background:#fff; border-radius:22px; padding:1.4vh; display:flex; align-items:center; justify-content:center; width:clamp(90px,min(15vw,22vh),220px); height:clamp(90px,min(15vw,22vh),220px); }
.lt-kim-feld .lt-bild{ width:100%; height:100%; }
.lt-kim-feld .lt-luecke{ color:#16324a; }
.lt-wuerfel-reihe{ display:flex; gap:3vw; }
.lt-wuerfel{ width:clamp(120px,min(22vw,36vh),340px); }
.lt-timer{ position:relative; width:min(60vh,70vw); }
.lt-timer svg{ width:100%; }
.lt-zeit{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:clamp(50px,min(11vw,16vh),200px); font-family:"Patrick Hand","Andika",sans-serif; }
.lt-rad-box{ position:relative; width:min(62vh,80vw); }
.lt-rad{ width:100%; }
.lt-rad-zeiger{ position:absolute; top:-2.5vh; left:50%; transform:translateX(-50%); font-size:clamp(34px,5vh,60px); color:#ffe066; text-shadow:0 2px 6px rgba(0,0,0,.4); }
/* Geöffnet aus einer Präsentation (#praes): deren Überschrift-Stil nicht übernehmen */
#praes .lt-voll .lt-leiste h2{ margin:0; font:400 clamp(22px,2.6vw,34px) "Patrick Hand","Andika",sans-serif; color:#ffe066; text-shadow:none; line-height:1.2; }
#praes .lt-voll.lt-meer .lt-leiste h2{ font-family:"Nunito",sans-serif; font-weight:900; color:#f2c97b; }
/* Leise-Meer (Sozialtraining & Vertretung): Leuchtturm-Welt */
.lt-voll.lt-meer{ background:#16324a; font-family:"Nunito",sans-serif; }
.lt-meer .lt-leiste h2{ font-family:"Nunito",sans-serif; font-weight:900; color:#f2c97b; }
.lt-meer .lt-leiste h2 svg{ display:none; }
.lt-meer .lt-leiste select{ background:#fff; color:#16324a; font-family:"Nunito",sans-serif; }
.lt-meer .lt-x, .lt-meer .lt-knopf{ background:rgba(255,255,255,.14); color:#fff; box-shadow:none; font-family:"Nunito",sans-serif; font-weight:900; border-radius:16px; }
.lt-meer .lt-knopf.gold{ background:#f2a93b; color:#16324a; }
.lt-meer .lt-buehne{ box-shadow:none; background:radial-gradient(circle at 50% 30%, #23507a, #16324a 70%); }
.lt-meer .lt-frage, .lt-meer .lw-zahl, .lt-meer .lw-regler{ font-family:"Nunito",sans-serif; font-weight:800; }
.lt-meer .lt-frage, .lt-meer .lw-zahl{ color:#f2c97b; }
.lt-meer .lw-blase{ font-family:"Nunito",sans-serif; font-weight:900; color:#16324a; }

/* Szene (Wald und Meer) */
.lw-szene{ position:relative; width:min(94vw,1400px); height:min(58vh,620px); overflow:hidden; border-radius:22px; background:linear-gradient(#9fd3f0, #cfe9f7 45%, #b9dc9c 46%, #6fa04a); }
.lw-tiere{ position:absolute; inset:0; z-index:4; }
.lw-tier{ position:absolute; left:0; top:0; display:none; will-change:transform; }
.lw-tier.da{ display:block; }
.lw-koerper{ width:100%; height:100%; transform-origin:50% 100%; }
.lw-koerper .lt-bild{ width:100%; height:100%; }
.lw-tier.flieht .lw-koerper .lt-bild{ animation:lwZitter .12s infinite; }
@keyframes lwZitter{ 50%{ transform:translateX(3px); } }
.lw-szene.schreck .lw-tier.da:not(.flieht) .lw-koerper .lt-bild{ animation:lwSchreck .45s; }
@keyframes lwSchreck{ 30%{ transform:translateY(-22%) scale(1.08); } 60%{ transform:translateY(0); } }
.lw-szene.jubel .lw-tier.da .lw-koerper .lt-bild{ animation:lwJubel .7s ease-in-out infinite; }
.lw-szene.jubel .lw-tier.da:nth-child(2n) .lw-koerper .lt-bild{ animation-delay:.35s; }
@keyframes lwJubel{ 50%{ transform:translateY(-28%) rotate(6deg); } }
.lw-sonne{ position:absolute; right:7%; top:6%; font-size:clamp(50px,7vw,110px); animation:lwDreh 30s linear infinite; z-index:1; }
@keyframes lwDreh{ to{ transform:rotate(360deg); } }
.lw-wolke{ position:absolute; left:-15%; font-size:clamp(50px,7vw,110px); opacity:.95; animation:lwZiehen var(--t,80s) linear infinite; z-index:1; }
@keyframes lwZiehen{ to{ transform:translateX(130vw); } }
.lw-baeume{ position:absolute; left:-2%; right:-2%; bottom:30%; text-align:center; font-size:clamp(56px,min(9vw,14vh),160px); letter-spacing:-.18em; white-space:nowrap; z-index:2; }
.lw-baeume.hinten{ bottom:38%; font-size:clamp(36px,min(6vw,9vh),100px); opacity:.6; filter:saturate(.6) brightness(.85); z-index:1; }
.lw-boden{ position:absolute; left:0; right:0; bottom:0; height:34%; background:linear-gradient(#7fb352, #5e8c3a); z-index:2; }
.lw-busch{ position:absolute; bottom:-2%; font-size:clamp(46px,7vw,110px); z-index:4; transform-origin:50% 100%; animation:lwWiegen 3.5s ease-in-out infinite; }
.lw-blatt{ position:absolute; top:-10%; font-size:clamp(20px,2.4vw,36px); z-index:7; animation:lwFallen var(--t,8s) linear infinite; }
@keyframes lwFallen{ 0%{ transform:translate(0,0) rotate(0); opacity:0; } 10%{ opacity:1; } 100%{ transform:translate(6vw, 70vh) rotate(540deg); opacity:.2; } }
@keyframes lwWiegen{ 0%,100%{ transform:rotate(-5deg); } 50%{ transform:rotate(5deg); } }
.lw-blase{ position:absolute; top:7%; left:50%; transform:translateX(-50%); z-index:9; background:#fffdf5; color:#1d4634; border-radius:24px; padding:.3em .9em; font:400 clamp(24px,3.4vw,50px) "Patrick Hand","Andika",sans-serif; animation:lwWackel .3s 3; white-space:nowrap; }
.lw-blase[hidden]{ display:none; }
@keyframes lwWackel{ 50%{ transform:translateX(-50%) rotate(3deg) scale(1.06); } }
/* Meer */
.lw-szene.lw-meer{ background:linear-gradient(#f7d9a8, #f2b880 39%, #4f97c4 40%, #2b6e9c 75%, #1e5880); }
.lw-wasser{ position:absolute; left:-10%; right:-10%; top:calc(40% - 18px); height:36px; z-index:5; background:radial-gradient(circle at 20px -4px, transparent 21px, rgba(79,151,196,.85) 22px) 0 0 / 40px 36px repeat-x; animation:lwWelle 4s linear infinite; pointer-events:none; }
@keyframes lwWelle{ to{ background-position:40px 0; } }
.lw-sand{ position:absolute; left:0; right:0; bottom:0; height:8%; background:#e8c98f; border-radius:50% 50% 0 0 / 30% 30% 0 0; z-index:2; }
.lw-tang{ position:absolute; bottom:4%; font-size:clamp(40px,6vw,90px); z-index:3; transform-origin:50% 100%; animation:lwWiegen 4s ease-in-out infinite; filter:hue-rotate(-20deg); }
.lw-blase-luft{ position:absolute; bottom:6%; width:10px; height:10px; border-radius:50%; border:2px solid rgba(255,255,255,.7); z-index:3; animation:lwAufsteigen var(--t,6s) linear infinite; }
@keyframes lwAufsteigen{ 0%{ transform:translateY(0); opacity:0; } 15%{ opacity:1; } 100%{ transform:translateY(-34vh) translateX(10px); opacity:0; } }
.lw-turm{ position:absolute; right:5%; top:calc(40% - clamp(70px,10vw,140px)); width:clamp(36px,5vw,70px); z-index:2; }
.lw-strahl{ position:absolute; right:calc(5% + clamp(18px,2.5vw,35px)); top:calc(40% - clamp(60px,8.6vw,120px)); width:60vw; height:30px; transform-origin:100% 50%; background:linear-gradient(270deg, rgba(255,240,190,.8), transparent); clip-path:polygon(0 0, 100% 45%, 100% 55%, 0 100%); animation:lwStrahl 6s ease-in-out infinite; z-index:1; }
@keyframes lwStrahl{ 0%,100%{ transform:rotate(-6deg); } 50%{ transform:rotate(8deg); } }
/* Anzeige */
.lw-wald{ position:absolute; inset:0; width:100%; height:100%; z-index:0; }
.lw-wolke2{ position:absolute; left:-20%; width:calc(16% * var(--g,1)); min-width:90px; opacity:.92; animation:lwZiehen var(--t,90s) linear infinite; z-index:1; filter:drop-shadow(0 6px 10px rgba(80,120,160,.15)); }
.lw-wolke2 svg{ width:100%; display:block; }
.lw-szene.still *, .lw-szene.still{ animation-play-state:paused !important; }
.lw-ruhe{ position:absolute; inset:0; z-index:20; display:flex; align-items:center; justify-content:center; background:rgba(240,248,236,.35); backdrop-filter:blur(9px) saturate(1.05); -webkit-backdrop-filter:blur(9px); color:#1d4634; text-align:center; transition:opacity 1.4s; }
.lw-ruhe.meer{ background:rgba(225,240,248,.4); color:#16324a; }
.lw-r-karte{ background:rgba(255,253,245,.9); border-radius:36px; padding:3vh 4vw 3.4vh; box-shadow:0 20px 50px rgba(30,60,40,.18); display:flex; flex-direction:column; align-items:center; gap:1.2vh; max-width:86%; }
.lw-r-symbol{ font-size:clamp(40px,min(5vw,8vh),90px); line-height:1; }
.lw-r-reihe{ display:flex; align-items:center; gap:3vw; }
.lw-ruhe.sterne{ background:linear-gradient(#141d45,#2b3a7e); backdrop-filter:none; }
.lw-ruhe.sterne::before{ content:""; position:absolute; inset:0; background-image:radial-gradient(2px 2px at 10% 20%,#fff,transparent),radial-gradient(1.5px 1.5px at 30% 70%,#fff,transparent),radial-gradient(2px 2px at 55% 15%,#fff,transparent),radial-gradient(1.5px 1.5px at 75% 45%,#fff,transparent),radial-gradient(2px 2px at 90% 25%,#fff,transparent),radial-gradient(1.5px 1.5px at 20% 85%,#fff,transparent),radial-gradient(1.5px 1.5px at 65% 85%,#fff,transparent),radial-gradient(2px 2px at 45% 40%,#fff,transparent); opacity:.7; }
.lw-ruhe.sterne .lw-r-karte{ background:rgba(255,255,255,.07); box-shadow:none; color:#fff8dc; position:relative; border:1px solid rgba(255,255,255,.12); }
.lw-ruhe.weg{ opacity:0; pointer-events:none; }
.lw-r-uhr{ font:900 clamp(56px,min(10vw,17vh),190px)/1 "Nunito",sans-serif; font-variant-numeric:tabular-nums; letter-spacing:-.02em; }
.lw-r-text{ font:400 clamp(22px,min(2.8vw,5vh),48px) "Patrick Hand","Andika",sans-serif; max-width:90%; }
.lw-r-pssst{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(255,253,245,.55); backdrop-filter:blur(6px); z-index:3; }
.lw-r-pssst > div{ background:#fffdf5; border-radius:40px; padding:2vh 5vw 3vh; display:flex; flex-direction:column; align-items:center; box-shadow:0 20px 60px rgba(0,0,0,.2); }
.lw-r-pssst span{ font-size:clamp(90px,min(16vw,26vh),280px); line-height:1; }
.lw-r-pssst b{ font:900 clamp(50px,min(8vw,13vh),140px) "Nunito",sans-serif; color:#c0392b; }
.lw-r-pssst small{ font:800 clamp(20px,min(2.4vw,4vh),40px) "Nunito",sans-serif; color:#1d4634; }
.lw-r-pssst.an span{ animation:lwPssst .35s 3; }
@keyframes lwPssst{ 50%{ transform:rotate(6deg) scale(1.08); } }
.lw-r-pssst[hidden], .lw-zahl[hidden]{ display:none; }
.lw-glas{ position:relative; width:clamp(120px,13vw,220px); height:clamp(150px,24vh,270px); border:5px solid rgba(255,255,255,.75); border-radius:28px 28px 60px 60px / 22px 22px 70px 70px; background:linear-gradient(90deg, rgba(255,255,255,.22), rgba(255,255,255,.06) 40%, rgba(255,255,255,.16)); overflow:hidden; box-shadow:inset 0 -10px 30px rgba(255,224,102,.15); }
.lw-glas::before{ content:""; position:absolute; left:12%; right:12%; top:-2px; height:16px; border-radius:6px; background:#c8963e; box-shadow:0 3px 0 #9c6f26; z-index:2; }
.lw-glas::after{ content:""; position:absolute; left:14%; top:16%; width:10%; height:55%; border-radius:20px; background:rgba(255,255,255,.35); }
.lw-glas-sterne i{ position:absolute; bottom:var(--y); font-style:normal; font-size:clamp(22px,2.6vw,44px); animation:lwStern 1.6s ease-in both; }
@keyframes lwStern{ from{ transform:translateY(-260px) rotate(-90deg); opacity:0; } 30%{ opacity:1; } to{ transform:none; } }
.lw-r-zahl{ font:900 clamp(24px,2.8vw,48px) "Nunito",sans-serif; color:#ffe066; margin-top:1vh; }
.lw-anzeige{ display:flex; align-items:center; gap:2vw; flex-wrap:wrap; justify-content:center; width:min(94vw,1400px); }
.lw-zahl{ font:400 clamp(24px,3vw,44px) "Patrick Hand","Andika",sans-serif; color:#ffe066; }
.lw-messer{ position:relative; flex:1 1 260px; height:22px; border-radius:11px; background:rgba(255,255,255,.12); overflow:hidden; border:2px solid rgba(255,255,255,.4); }
.lw-pegel{ height:100%; width:0; background:#b5e48c; transition:width .1s; }
.lw-pegel.laut{ background:#ff8fab; }
.lw-grenze{ position:absolute; top:-2px; bottom:-2px; width:4px; background:#ffe066; }
.lw-regler{ display:flex; align-items:center; gap:.5em; font:400 18px "Patrick Hand","Andika",sans-serif; color:#f1d9b5; }
.lw-regler input{ width:160px; accent-color:#ffe066; }
/* Übersicht im Leuchtturm */
.lt-uebersicht h3{ font-size:15px; font-weight:900; color:#7c8a85; text-transform:uppercase; letter-spacing:.04em; margin:22px 0 10px; }
.lt-karten{ display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:14px; }
.lt-karte{ background:#fff; border-radius:18px; box-shadow:0 6px 24px rgba(22,50,74,.1); padding:16px 18px; display:flex; flex-direction:column; gap:8px; cursor:pointer; border:2px solid transparent; text-align:left; font:inherit; color:inherit; }
.lt-karte:hover{ border-color:#e7f1fb; transform:translateY(-2px); }
.lt-karte .em{ font-size:34px; line-height:1; }
.lt-karte b{ font-size:17px; font-weight:900; }
.lt-karte span{ font-size:13.5px; color:#55636a; }
`;
const EULE_MINI = `<svg viewBox="0 0 140 160"><path d="M30 40 L22 8 L52 30 Z M110 40 L118 8 L88 30 Z" fill="#7b5236"/><ellipse cx="70" cy="92" rx="52" ry="60" fill="#9c6b45"/><ellipse cx="70" cy="108" rx="34" ry="40" fill="#e9d3b4"/><circle cx="50" cy="62" r="22" fill="#fffdf5" stroke="#ffe066" stroke-width="5"/><circle cx="90" cy="62" r="22" fill="#fffdf5" stroke="#ffe066" stroke-width="5"/><circle cx="53" cy="64" r="10" fill="#1d2b22"/><circle cx="87" cy="64" r="10" fill="#1d2b22"/><path d="M63 76 L77 76 L70 90 Z" fill="#f4a03a"/></svg>`;
function cssLaden(){
    if (!document.getElementById("lernSchrift")) { const l = document.createElement("link"); l.id = "lernSchrift"; l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap"; document.head.appendChild(l); }
    if (!document.getElementById("lernTafelCss")) { const s = document.createElement("style"); s.id = "lernTafelCss"; s.textContent = CSS; document.head.appendChild(s); } }

let audio = null;
function klang(f = 660, d = .2, typ = "sine"){
    try {
        audio = audio || new (window.AudioContext || window.webkitAudioContext)();
        const o = audio.createOscillator(), g = audio.createGain();
        o.type = typ; o.frequency.value = f; g.gain.setValueAtTime(.25, audio.currentTime); g.gain.exponentialRampToValueAtTime(.001, audio.currentTime + d);
        o.connect(g); g.connect(audio.destination); o.start(); o.stop(audio.currentTime + d);
    } catch (e) {}
}
function gong(){ klang(523, 1.2, "triangle"); setTimeout(() => klang(392, 1.6, "triangle"), 500); }

let offen = null;
function starten(id, einstellung = {}){
    const w = W[id]; if (!w) return;
    cssLaden(); schliessen();
    const e = Object.assign({}, w.std, w.gemerkt ? w.gemerkt() : {}, einstellung);
    const el = document.createElement("div");
    el.className = "lt-voll" + (e.thema === "meer" ? " lt-meer" : "");
    const kopf = e.thema === "meer" && id === "leise" ? "🌊 Leise-Meer" : w.emoji + " " + w.titel;
    el.innerHTML = `<div class="lt-leiste"><h2>${EULE_MINI}<span>${esc(kopf)}</span></h2>
        ${(w.optionen || []).map(o => `<label data-optlabel="${o.k}" ${o.zeigen && !o.zeigen(e) ? 'style="display:none"' : ""}><select data-opt="${o.k}" title="${esc(o.label)}">${o.werte.map(([v, l]) => `<option value="${esc(JSON.stringify(v))}" ${JSON.stringify(v) === JSON.stringify(e[o.k]) ? "selected" : ""}>${esc(o.label)}: ${esc(l)}</option>`).join("")}</select></label>`).join("")}
        <button class="lt-x" data-voll title="Vollbild an/aus">⛶</button><button class="lt-x" data-zu title="Schließen (Esc)">✕</button></div>
        <div class="lt-buehne"><div class="lt-inhalt"></div><div class="lt-antworten"></div><div class="lt-loesung"></div></div>
        <div class="lt-steuer"><span class="lt-zaehler"></span><button class="lt-knopf" data-loes>👁 Lösung</button><button class="lt-knopf" data-nochmal hidden>🔁 Nochmal zeigen</button><button class="lt-knopf gold" data-weiter>Nächste ▶</button></div>`;
    const schonVoll = !!document.fullscreenElement;
    (document.fullscreenElement || document.body).appendChild(el);
    const inhalt = el.querySelector(".lt-inhalt"), antw = el.querySelector(".lt-antworten"), loes = el.querySelector(".lt-loesung");
    const kWeiter = el.querySelector("[data-weiter]"), kLoes = el.querySelector("[data-loes]"), kNochmal = el.querySelector("[data-nochmal]");
    let aufgabe = null, gezeigt = false, nr = 0, timer = [], blitzT = null;
    let aufr = [];
    const stop = () => { timer.forEach(clearInterval); timer = []; aufr.forEach(f => { try { f(); } catch (x) {} }); aufr = []; };
    const api = {
        stop, klang, gong,
        intervall: (f, ms) => timer.push(setInterval(f, ms)),
        aufraeumen: f => aufr.push(f),
        loesungSetzen: (html, sofort) => { aufgabe = html ? { loesung: html } : null; loes.innerHTML = ""; gezeigt = false; kLoes.hidden = !html || !!sofort; if (html && sofort) { gezeigt = true; loes.innerHTML = html; } },
        weiterText: t => { kWeiter.textContent = t; },
        ohneLoesung: () => { kLoes.hidden = true; },
        weiter: null
    };
    const zeigeLoesung = () => {
        if (!aufgabe || gezeigt) return; gezeigt = true;
        loes.innerHTML = aufgabe.loesung || "";
        if (aufgabe.richtig != null) antw.querySelectorAll(".lt-antwort").forEach((b, k) => b.classList.add(k === aufgabe.richtig ? "richtig" : "falsch"));
        const blitz = inhalt.querySelector(".lt-blitz"); if (blitz) blitz.classList.remove("weg");
        klang(880, .12);
    };
    const neu = () => {
        stop(); clearTimeout(blitzT); gezeigt = false; loes.innerHTML = ""; antw.innerHTML = ""; kNochmal.hidden = true;
        if (w.eigen) { aufgabe = null; kLoes.hidden = true; api.weiter = null; kWeiter.textContent = "Nochmal ▶"; w.eigen(inhalt, e, api); el.querySelector(".lt-zaehler").textContent = ""; return; }
        aufgabe = w.aufgabe(e); nr++;
        inhalt.innerHTML = aufgabe.html;
        el.querySelector(".lt-zaehler").textContent = "Aufgabe " + nr;
        if (aufgabe.antworten) antw.innerHTML = aufgabe.antworten.map((a, k) => `<button class="lt-antwort" data-a="${k}"><span class="nr">${k + 1}</span>${esc(a)}</button>`).join("");
        antw.querySelectorAll(".lt-antwort").forEach(b => b.addEventListener("click", () => { antw.querySelectorAll(".lt-antwort").forEach(x => x.classList.toggle("gewaehlt", x === b)); }));
        if (aufgabe.blitz) {
            kNochmal.hidden = false;
            blitzT = setTimeout(() => { const b = inhalt.querySelector(".lt-blitz"); if (b && !gezeigt) b.classList.add("weg"); }, aufgabe.blitz);
        }
    };
    kNochmal.addEventListener("click", () => { const b = inhalt.querySelector(".lt-blitz"); if (!b) return; b.classList.remove("weg"); clearTimeout(blitzT); blitzT = setTimeout(() => { if (!gezeigt) b.classList.add("weg"); }, aufgabe.blitz || 2000); });
    const schritt = () => { if (api.weiter) return api.weiter(); if (!gezeigt && aufgabe && aufgabe.loesung) return zeigeLoesung(); neu(); };
    kWeiter.addEventListener("click", () => { if (api.weiter) api.weiter(); else neu(); });
    kLoes.addEventListener("click", zeigeLoesung);
    const optSichtbar = () => (w.optionen || []).forEach(o => { const l = el.querySelector(`[data-optlabel="${o.k}"]`); if (l) l.style.display = o.zeigen && !o.zeigen(e) ? "none" : ""; });
    el.querySelectorAll("[data-opt]").forEach(s => s.addEventListener("change", () => { e[s.dataset.opt] = JSON.parse(s.value); nr = 0; optSichtbar(); neu(); }));
    el.querySelector("[data-zu]").addEventListener("click", schliessen);
    el.querySelector("[data-voll]").addEventListener("click", () => { try { document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen(); } catch (x) {} });
    const tasten = ev => {
        if (ev.target.tagName === "SELECT") return;
        if (ev.key === "Escape") { ev.stopImmediatePropagation(); schliessen(); }
        else if (ev.key === " " || ev.key === "ArrowRight" || ev.key === "PageDown" || ev.key === "Enter") { ev.preventDefault(); schritt(); }
        else if (ev.key.toLowerCase() === "l") zeigeLoesung();
        else if (/^[1-4]$/.test(ev.key)) { const b = antw.querySelectorAll(".lt-antwort")[+ev.key - 1]; if (b) b.click(); }
    };
    document.addEventListener("keydown", tasten);
    offen = { el, stop, tasten, eigenesVoll: !schonVoll };
    if (!schonVoll) try { el.requestFullscreen && el.requestFullscreen().catch(() => {}); } catch (x) {}
    neu();
}
function schliessen(){
    if (!offen) return;
    const eigen = offen.eigenesVoll;
    offen.stop(); document.removeEventListener("keydown", offen.tasten); offen.el.remove(); offen = null;
    try { if (eigen && document.fullscreenElement) document.exitFullscreen(); } catch (x) {}
}

function info(id){ const w = W[id]; return w ? { titel: w.titel, emoji: w.emoji, text: w.text, gruppe: w.gruppe } : null; }

function uebersicht(ziel){
    cssLaden();
    const gruppen = ["Mathe", "Deutsch", "Allgemein"];
    ziel.innerHTML = `<div class="karte"><h2 style="margin:0 0 6px"><i class="fa-solid fa-chalkboard"></i> Tafel-Übungen</h2>
        <p style="margin:0;color:#7c8a85;font-weight:700">Laptop mit der digitalen Tafel verbinden, Übung antippen – sie startet im Vollbild. Oben stellst du Zahlenraum, Stufe oder Zeit ein. Steuerung: <b>Leertaste</b> = erst Lösung, dann nächste Aufgabe · <b>1–4</b> = Antwort markieren (passt zu den Zahlenkarten) · <b>Esc</b> = schließen.</p></div>
        <div class="lt-uebersicht">${gruppen.map(g => `<h3>${g === "Allgemein" ? "Für jede Stunde" : g}</h3><div class="lt-karten">${Object.entries(W).filter(([, w]) => w.gruppe === g).map(([id, w]) =>
            `<button class="lt-karte" data-start="${id}"><span class="em">${w.emoji}</span><b>${esc(w.titel)}</b><span>${esc(w.text)}</span></button>`).join("")}</div>`).join("")}</div>`;
    ziel.querySelectorAll("[data-start]").forEach(b => b.addEventListener("click", () => starten(b.dataset.start)));
}

window.lernTafel = { info, starten, schliessen, uebersicht, werkzeuge: W };
})();
