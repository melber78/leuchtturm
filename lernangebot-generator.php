<?php $LT_GAST_BEREICH = "lernangebot"; require __DIR__ . "/gast-zugang.php"; ?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Arbeitsblätter – Lernangebot – Leuchtturm</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Andika:wght@400;700&family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<style>
:root{ --nacht:#16324a; --meer:#3d7ea6; --gold:#f2a93b; --schaum:#f4f6f4; --text:#1f2d36; --grau:#7c8a85; --linie:#dfe5e2; --schatten:0 6px 24px rgba(22,50,74,.1); }
*{ box-sizing:border-box; }
body{ margin:0; background:var(--schaum); color:var(--text); font-family:"Nunito",sans-serif; }
button, select, input{ font-family:inherit; font-size:15px; }
.kopf{ background:linear-gradient(135deg,var(--nacht),var(--meer)); color:#fff; }
.kopf-innen{ width:min(1250px,95%); margin:0 auto; padding:18px 0; display:flex; gap:14px; align-items:center; flex-wrap:wrap; }
.kopf a{ color:rgba(255,255,255,.8); text-decoration:none; font-weight:800; font-size:14px; }
.kopf h1{ margin:0; font-size:26px; font-weight:900; flex:1; }
.seite{ width:min(1250px,95%); margin:24px auto 60px; display:grid; grid-template-columns:360px minmax(0,1fr); gap:24px; align-items:start; }
@media (max-width:900px){ .seite{ grid-template-columns:1fr; } }
.karte{ background:#fff; border-radius:20px; box-shadow:var(--schatten); padding:20px 22px; }
.karte h2{ margin:0 0 10px; font-size:18px; font-weight:900; color:var(--nacht); }
label.feld{ display:block; font-weight:800; font-size:13px; color:var(--grau); margin:12px 0 4px; }
select, input[type=number]{ border:2px solid var(--linie); border-radius:10px; padding:8px 10px; background:#fff; width:100%; }
.reihe{ display:flex; gap:6px; flex-wrap:wrap; }
.wahl{ border:2px solid var(--linie); background:#fff; border-radius:10px; padding:8px 12px; font-weight:800; cursor:pointer; }
.wahl.an{ background:var(--meer); border-color:var(--meer); color:#fff; }
.btn{ border:0; border-radius:12px; padding:11px 16px; font-weight:800; cursor:pointer; background:#eef4f8; color:var(--nacht); display:inline-flex; align-items:center; gap:8px; }
.btn.gold{ background:var(--gold); }
.btn.blau{ background:var(--meer); color:#fff; }
.knoepfe{ display:flex; gap:8px; flex-wrap:wrap; margin-top:16px; }
.hilfe{ font-size:12.5px; color:var(--grau); font-weight:700; margin-top:8px; }
.check{ display:flex; gap:8px; align-items:center; font-weight:700; margin-top:10px; }
.vorschau-box{ position:sticky; top:12px; }
.vorschau{ position:relative; overflow:hidden; border-radius:6px; box-shadow:0 2px 14px rgba(22,50,74,.18); background:#fff; }
.vorschau > .blatt{ position:absolute; top:0; left:0; transform-origin:top left; }
.status{ font-weight:800; font-size:13px; margin-top:8px; color:#2e8b57; }
.status.voll{ color:#c0392b; }
/* ---------- A4-Blatt ---------- */
.blatt{ width:210mm; height:297mm; overflow:hidden; background:#fff; color:#1b1b1b; padding:12mm 14mm 9mm; display:flex; flex-direction:column; font-family:"Andika","Nunito",sans-serif; font-size:16pt; line-height:1.3; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
.blatt > *{ flex-shrink:0; }
.b-kopf{ display:flex; align-items:flex-end; justify-content:space-between; gap:4mm; border-bottom:.6mm solid var(--meer); padding-bottom:2mm; }
.b-titel{ font-size:1.5em; font-weight:700; color:var(--nacht); line-height:1.15; }
.b-meta{ font-family:"Nunito",sans-serif; font-size:8pt; font-weight:800; color:#8a979c; text-align:right; white-space:nowrap; }
.b-meta i{ color:var(--gold); }
.b-name{ display:flex; gap:2mm; align-items:flex-end; margin:3mm 0 2mm; font-size:.8em; }
.b-name .ln{ flex:1; border-bottom:.35mm solid #555; height:1.2em; }
.b-name .ln.kurz{ flex:0 0 30mm; }
.b-auftrag{ display:flex; gap:2.5mm; align-items:flex-start; font-weight:700; margin:1mm 0 3mm; }
.b-auftrag .nr{ flex:0 0 auto; width:1.45em; height:1.45em; border-radius:50%; background:var(--meer); color:#fff; font-family:"Nunito",sans-serif; font-weight:900; font-size:.8em; display:flex; align-items:center; justify-content:center; }
.b-inhalt{ flex:1 1 auto; min-height:0; overflow:hidden; display:grid; grid-template-columns:repeat(var(--sp,2),minmax(0,1fr)); gap:var(--gap,4mm) 8mm; align-content:space-evenly; }
.b-fuss{ margin-top:2mm; padding-top:1.5mm; border-top:.25mm solid #dfe5e2; font-family:"Nunito",sans-serif; font-size:7.5pt; font-weight:700; color:#8a979c; display:flex; justify-content:space-between; }
.blatt.loesung .lsg{ color:#c0392b; font-weight:700; }
.ae{ display:flex; align-items:flex-end; gap:.3em; white-space:nowrap; }
.feldl{ display:inline-block; min-width:2.6em; border-bottom:.35mm solid #555; text-align:center; flex:0 0 auto; height:1.25em; line-height:1.25em; }
.feldl.lang{ flex:1 1 auto; min-width:4em; }
.box{ display:inline-block; width:1.1em; height:1.1em; border:.35mm solid #333; border-radius:.15em; text-align:center; line-height:1.05em; vertical-align:middle; }
.bild{ display:inline-flex; width:2.4em; height:2.4em; flex:0 0 auto; }
.bild svg{ width:100%; height:100%; }
.zeile{ display:flex; align-items:center; gap:.5em; }
.punkte{ letter-spacing:.06em; font-size:1.05em; }
.mauer{ display:flex; flex-direction:column; align-items:center; gap:0; }
.mauer .r{ display:flex; }
.mauer .s{ width:2.6em; height:1.6em; border:.35mm solid #333; margin:-.175mm; display:flex; align-items:center; justify-content:center; font-size:.9em; background:#fff; }
.schrift{ display:grid; grid-template-columns:repeat(var(--st,4),1.2em); justify-content:end; font-family:"Nunito",monospace; font-weight:700; }
.schrift span{ text-align:center; height:1.3em; }
.schrift .strich{ grid-column:1 / -1; border-top:.45mm solid #333; height:0; }
.uhr svg{ width:3.6em; height:3.6em; }
.spur{ font-size:2.2em; letter-spacing:.35em; color:transparent; -webkit-text-stroke:.03em #7f8c8d; font-family:"Andika",sans-serif; }
.liste{ line-height:1.9; }
table.tab{ width:100%; border-collapse:collapse; font-size:.95em; }
table.tab th{ background:#eef4f8; border:.3mm solid #9aa9b2; padding:.25em .4em; text-align:left; }
table.tab td{ border:.3mm solid #9aa9b2; height:2.2em; padding:.2em .4em; }
.wortspeicher{ border:.4mm dashed #9aa9b2; border-radius:3mm; padding:.35em .6em; display:flex; flex-wrap:wrap; gap:.3em .6em; grid-column:1 / -1; }
.wortspeicher span{ background:#f3f6f8; border:.3mm solid #c9d6e3; border-radius:2mm; padding:.05em .45em; }
.voll-breit{ grid-column:1 / -1; }
.b-inhalt.ganz table.tab td{ height:2.9em; }
.b-inhalt.ganz .wortspeicher{ font-size:1.05em; padding:.6em .8em; }
#druck{ position:absolute; left:-10000px; top:0; visibility:hidden; }
@page{ size:A4; margin:0; }
@media print{ body{ background:#fff; } body > *:not(#druck){ display:none !important; } #druck{ position:static; visibility:visible; } #druck .blatt{ break-after:page; } #druck > :last-child{ break-after:auto; } }
</style>
</head>
<body>
<header class="kopf"><div class="kopf-innen">
    <a href="sozial-stunden.php?bereich=lernangebot"><i class="fa-solid fa-arrow-left"></i> Lernangebot</a>
    <h1><i class="fa-solid fa-wand-magic-sparkles"></i> Arbeitsblätter Deutsch &amp; Mathe</h1>
</div></header>

<main class="seite">
    <div class="karte">
        <h2>Einstellungen</h2>
        <label class="feld">Klasse</label>
        <div class="reihe" id="klasse"></div>
        <label class="feld">Fach</label>
        <div class="reihe" id="fach"></div>
        <label class="feld">Übung</label>
        <select id="art"></select>
        <div id="artText" class="hilfe"></div>
        <div id="optionen"></div>
        <label class="check"><input type="checkbox" id="loesung"> Lösungsblatt mitdrucken</label>
        <div class="knoepfe">
            <button class="btn blau" id="neu"><i class="fa-solid fa-shuffle"></i> Neu mischen</button>
            <label style="display:flex;align-items:center;gap:6px;font-weight:800">Anzahl <input type="number" id="anzahl" min="1" max="40" value="9" style="width:70px"></label>
            <button class="btn gold" id="drucken"><i class="fa-solid fa-print"></i> Drucken</button>
        </div>
        <p class="hilfe">Jedes Blatt füllt genau eine A4-Seite. „Neu mischen“ macht neue Aufgaben – praktisch für schnelle Kinder oder zum Wiederholen. Im Druckfenster „Als PDF sichern“ wählen, um ein Blatt abzulegen.</p>
    </div>
    <div class="vorschau-box">
        <div class="vorschau" id="vorschau"></div>
        <div class="status" id="status"></div>
    </div>
</main>
<div id="druck"></div>

<script src="bilder.js?v=<?= @filemtime(__DIR__ . "/bilder.js") ?: 1 ?>"></script>
<script src="lernangebot-woerter.js?v=<?= @filemtime(__DIR__ . "/lernangebot-woerter.js") ?: 1 ?>"></script>
<script>
"use strict";
const D = window.LERN_DATEN;
const FUSS = "Melanie Bernshausen · Diplomierte Mediendidaktikerin (EÖDL)";
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const z = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const wahl = l => l[Math.floor(Math.random() * l.length)];
const mischen = l => { const a = l.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const bild = b => `<span class="bild">${D.bildSvg(b)}</span>`;
const L = (wert, lang) => `<span class="feldl${lang ? " lang" : ""}"><span class="lsg">${esc(wert)}</span></span>`;   // Schreibfeld mit (versteckter) Lösung
const zr = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ---------- Übungen ----------
   Jede Übung: titel, fach, klassen, text (Auftrag), optionen, sp (Spalten), aufgabe(e, k) → html (Lösung steckt in .lsg) */
const RAUM = { 1: [10, 20], 2: [20, 100], 3: [100, 1000], 4: [1000] };
const raumOpt = { k: "bis", label: "Zahlenraum", werte: k => RAUM[k].map(v => [v, "bis " + zr(v)]) };
function rechnung(art, bis){
    const plus = art === "plus" || (art === "plusminus" && Math.random() < .5);
    const grob = bis >= 1000 ? wahl([1, 10]) : 1;
    if (plus) { const s = z(Math.min(bis, bis > 20 ? 20 : 3), bis); let a = z(1, s - 1), b = s - a; if (grob > 1) { a = Math.round(a / 10) * 10 || 10; b = Math.max(10, Math.round(b / 10) * 10); } return [`${zr(a)} + ${zr(b)}`, a + b]; }
    let a = z(bis > 20 ? 20 : 3, bis), b = z(1, a - 1); if (grob > 1) { a = Math.round(a / 10) * 10 || 20; b = Math.min(a - 10, Math.round(b / 10) * 10) || 10; } return [`${zr(a)} − ${zr(b)}`, a - b];
}
const U = {
    plusminus: { titel: "Plus und Minus", fach: "Mathe", klassen: [1, 2, 3, 4], sp: 2, text: "Rechne.",
        optionen: [raumOpt, { k: "art", label: "Rechenart", werte: () => [["plusminus", "gemischt"], ["plus", "nur Plus"], ["minus", "nur Minus"]] }],
        aufgabe(e){ const [t, l] = rechnung(e.art, +e.bis); return `<div class="ae">${t} = ${L(zr(l))}</div>`; } },
    ergaenzen: { titel: "Ergänzen", fach: "Mathe", klassen: [1, 2, 3, 4], sp: 2, text: "Wie viel fehlt? Ergänze.",
        optionen: [raumOpt],
        aufgabe(e){ const bis = +e.bis, ziel = bis <= 20 ? wahl(bis === 10 ? [10] : [10, 20]) : bis === 100 ? wahl([100, z(2, 9) * 10]) : wahl([1000, z(2, 9) * 100]); const a = ziel <= 20 ? z(1, ziel - 1) : ziel >= 200 && bis >= 1000 ? z(1, ziel / 10 - 1) * 10 : z(1, ziel - 1); return `<div class="ae">${zr(a)} + ${L(zr(ziel - a))} = ${zr(ziel)}</div>`; } },
    verdoppeln: { titel: "Verdoppeln und Halbieren", fach: "Mathe", klassen: [1, 2, 3, 4], sp: 2, text: "Verdopple oder halbiere.",
        optionen: [raumOpt],
        aufgabe(e){ const bis = +e.bis; if (Math.random() < .5) { const a = z(1, Math.floor(bis / 2)); return `<div class="ae">das Doppelte von ${zr(a)}: ${L(zr(2 * a))}</div>`; } const a = 2 * z(1, Math.floor(bis / 2)); return `<div class="ae">die Hälfte von ${zr(a)}: ${L(zr(a / 2))}</div>`; } },
    einmaleins: { titel: "Einmaleins", fach: "Mathe", klassen: [2, 3, 4], sp: 3, text: "Rechne.",
        optionen: [{ k: "reihen", label: "Reihen", werte: () => [["2,5,10", "2er, 5er, 10er"], ["3,4,6", "3er, 4er, 6er"], ["6,7,8,9", "6er bis 9er"], ["1,2,3,4,5,6,7,8,9,10", "alle"]] }, { k: "art", label: "Art", werte: () => [["mal", "Malaufgaben"], ["geteilt", "Geteiltaufgaben"], ["gemischt", "gemischt"], ["luecke", "Platzhalter (_ · 7 = 35)"]] }],
        aufgabe(e){ const r = String(e.reihen).split(",").map(Number), b = wahl(r), a = z(1, 10); const art = e.art === "gemischt" ? wahl(["mal", "geteilt"]) : e.art;
            if (art === "geteilt") return `<div class="ae">${a * b} : ${b} = ${L(a)}</div>`;
            if (art === "luecke") return `<div class="ae">${L(a)} · ${b} = ${a * b}</div>`;
            return Math.random() < .5 ? `<div class="ae">${a} · ${b} = ${L(a * b)}</div>` : `<div class="ae">${b} · ${a} = ${L(a * b)}</div>`; } },
    zahlenmauer: { titel: "Zahlenmauern", fach: "Mathe", klassen: [1, 2, 3, 4], sp: 2, gap: "6mm", text: "Zwei Steine nebeneinander ergeben zusammen den Stein darüber.",
        optionen: [raumOpt, { k: "stufen", label: "Mauer", werte: () => [[3, "3 Steine unten"], [4, "4 Steine unten"]] }],
        aufgabe(e){ const n = +e.stufen || 3, bis = +e.bis, max = Math.max(1, Math.floor(bis / (n === 3 ? 4 : 8)));
            let r = [Array.from({ length: n }, () => z(bis >= 1000 ? 10 : 1, Math.max(2, max)))]; if (bis >= 1000) r[0] = r[0].map(v => Math.round(v / 10) * 10);
            while (r[0].length > 1) r.unshift(r[0].slice(1).map((v, i) => v + r[0][i]));
            const zeigen = new Set(); r[r.length - 1].forEach((_, i) => zeigen.add((r.length - 1) + ":" + i)); if (Math.random() < .5) { zeigen.delete((r.length - 1) + ":" + z(0, n - 1)); zeigen.add("0:0"); }
            return `<div class="mauer">${r.map((zeile, ri) => `<div class="r">${zeile.map((v, i) => `<div class="s">${zeigen.has(ri + ":" + i) ? zr(v) : `<span class="lsg">${zr(v)}</span>`}</div>`).join("")}</div>`).join("")}</div>`; } },
    nachbarn: { titel: "Nachbarzahlen", fach: "Mathe", klassen: [1, 2, 3, 4], sp: 2, text: "Schreibe die Nachbarzahlen.",
        optionen: [raumOpt, { k: "art", label: "Nachbarn", werte: k => [["einer", "Vorgänger / Nachfolger"], ...(k >= 2 ? [["zehner", "Nachbarzehner"]] : []), ...(k >= 3 ? [["hunderter", "Nachbarhunderter"]] : [])] }],
        aufgabe(e){ const bis = +e.bis, s = e.art === "hunderter" ? 100 : e.art === "zehner" ? 10 : 1; let n = z(s + 1, bis - s - 1); if (s > 1 && n % s === 0) n += z(1, s - 1);
            const a = s === 1 ? n - 1 : Math.floor(n / s) * s, b = s === 1 ? n + 1 : a + s; return `<div class="ae">${L(zr(a))} &nbsp;${zr(n)}&nbsp; ${L(zr(b))}</div>`; } },
    vergleichen: { titel: "Größer, kleiner, gleich", fach: "Mathe", klassen: [1, 2, 3, 4], sp: 2, text: "Setze <, > oder = ein.",
        optionen: [raumOpt],
        aufgabe(e){ const bis = +e.bis; let a = z(0, bis), b = Math.random() < .2 ? a : z(0, bis); if (bis <= 20 && Math.random() < .5) { const [t, l] = rechnung("plusminus", bis); return `<div class="ae">${t} <span class="box"><span class="lsg">${l < b ? "<" : l > b ? ">" : "="}</span></span> ${b}</div>`; } return `<div class="ae">${zr(a)} <span class="box"><span class="lsg">${a < b ? "<" : a > b ? ">" : "="}</span></span> ${zr(b)}</div>`; } },
    mengen: { titel: "Mengen zählen", fach: "Mathe", klassen: [1], sp: 2, text: "Wie viele sind es? Schreibe die Zahl.",
        optionen: [{ k: "bis", label: "Zahlenraum", werte: () => [[10, "bis 10"], [20, "bis 20"]] }],
        aufgabe(e){ const n = z(1, +e.bis); const reihe = k => "●".repeat(Math.min(5, k)) + (k > 5 ? " " + "●".repeat(Math.min(5, k - 5)) : ""); return `<div class="zeile"><span class="punkte">${reihe(Math.min(10, n))}${n > 10 ? "<br>" + reihe(n - 10) : ""}</span>${L(n)}</div>`; } },
    uhr: { titel: "Uhrzeiten", fach: "Mathe", klassen: [2, 3, 4], sp: 3, gap: "5mm", text: "Wie spät ist es? Schreibe die Uhrzeit.",
        optionen: [{ k: "genau", label: "Genauigkeit", werte: k => [["stunde", "volle Stunden"], ["halb", "volle & halbe"], ...(k >= 3 ? [["viertel", "Viertelstunden"], ["fuenf", "5 Minuten"]] : [])] }],
        aufgabe(e){ const h = z(1, 12), m = { stunde: 0, halb: wahl([0, 30]), viertel: wahl([0, 15, 30, 45]), fuenf: z(0, 11) * 5 }[e.genau] ?? 0;
            const w = n => n * Math.PI / 180, wh = w(((h % 12) + m / 60) * 30), wm = w(m * 6);
            let s = `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#16324a" stroke-width="3"/>`;
            for (let i = 1; i <= 12; i++) s += `<text x="${50 + Math.sin(w(i * 30)) * 35}" y="${50 - Math.cos(w(i * 30)) * 35 + 4}" text-anchor="middle" font-size="11" font-weight="700" font-family="Nunito">${i}</text>`;
            s += `<line x1="50" y1="50" x2="${50 + Math.sin(wh) * 22}" y2="${50 - Math.cos(wh) * 22}" stroke="#e74c3c" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="50" x2="${50 + Math.sin(wm) * 36}" y2="${50 - Math.cos(wm) * 36}" stroke="#2f80c4" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="50" r="3"/></svg>`;
            return `<div class="zeile uhr">${s}${L(h + ":" + String(m).padStart(2, "0"))}</div>`; } },
    schriftlich: { titel: "Schriftlich rechnen", fach: "Mathe", klassen: [3, 4], sp: 4, gap: "7mm", text: "Rechne schriftlich.",
        optionen: [{ k: "art", label: "Rechenart", werte: () => [["plus", "Addition"], ["minus", "Subtraktion"], ["gemischt", "gemischt"]] }, { k: "bis", label: "Zahlen", werte: k => [[1000, "dreistellig"], ...(k >= 4 ? [[10000, "vierstellig"]] : [])] }],
        aufgabe(e){ const bis = +e.bis || 1000, plus = e.art === "plus" || (e.art === "gemischt" && Math.random() < .5);
            let a = z(bis / 10, bis - 1), b = z(bis / 10, bis - 1); if (!plus && b > a) [a, b] = [b, a]; if (plus && a + b >= bis * 1.9) b = Math.floor(b / 2);
            const l = plus ? a + b : a - b, st = String(Math.max(a, l)).length + 1;
            const zif = (n, mit) => { const t = String(n).padStart(st, " ").split(""); if (mit) t[0] = mit; return t.map(c => `<span>${c.trim()}</span>`).join(""); };
            return `<div class="schrift" style="--st:${st}">${zif(a)}${zif(b, plus ? "+" : "−")}<span class="strich"></span>${String(l).padStart(st, " ").split("").map(c => `<span class="lsg">${c.trim()}</span>`).join("")}</div>`; } },
    folgen: { titel: "Zahlenfolgen", fach: "Mathe", klassen: [2, 3, 4], sp: 1, text: "Setze die Zahlenfolge fort.",
        optionen: [],
        aufgabe(e, k){ const start = z(1, k >= 3 ? 50 : 20), d = z(2, k >= 3 ? 12 : 5), typ = wahl(k >= 3 ? ["plus", "minus", "mal", "wachsend"] : ["plus", "minus"]);
            let f = [start]; for (let i = 1; i < 8; i++) { const v = f[i - 1]; f.push(typ === "plus" ? v + d : typ === "minus" ? v - d : typ === "mal" ? v * 2 : v + i); }
            if (typ === "minus") f = f.map(v => v + 8 * d); if (typ === "mal") f = f.slice(0, 7);
            return `<div class="ae">${f.slice(0, 4).map(zr).join(", ")}, ${f.slice(4).map(v => L(zr(v))).join(", ")}</div>`; } },
    anlaute: { titel: "Anlaute", fach: "Deutsch", klassen: [1, 2], sp: 3, text: "Mit welchem Buchstaben fängt das Wort an? Schreibe ihn auf.",
        optionen: [],
        aufgabe(){ const x = wahl(D.woerter.filter(w => w.klar)); return `<div class="zeile">${bild(x.b)}<span class="box" style="width:1.6em;height:1.6em;line-height:1.5em"><span class="lsg">${x.an}</span></span></div>`; } },
    silben: { titel: "Silben", fach: "Deutsch", klassen: [1, 2], sp: 2, text: "Sprich das Wort und klatsche. Kreuze an, wie viele Silben es hat.",
        optionen: [{ k: "wort", label: "Wort", werte: k => [[k >= 2, k >= 2 ? "mit Wort" : "nur Bild"], [k < 2, k >= 2 ? "nur Bild" : "mit Wort"]] }],
        aufgabe(e){ const x = wahl(D.woerter.filter(w => w.n <= 4)); return `<div class="zeile">${bild(x.b)}${e.wort ? `<span style="min-width:4.5em">${esc(x.w)}</span>` : ""}${[1, 2, 3, 4].map(n => `<span style="font-family:Nunito;font-size:.75em;font-weight:800">${n}</span><span class="box"><span class="lsg">${n === x.n ? "✗" : ""}</span></span>`).join("")}</div>`; } },
    luecken: { titel: "Lückenwörter", fach: "Deutsch", klassen: [1, 2, 3], sp: 2, text: "Welcher Buchstabe fehlt? Schreibe das Wort fertig.",
        optionen: [{ k: "wo", label: "Lücke", werte: () => [["anfang", "am Anfang"], ["mitte", "irgendwo"]] }],
        aufgabe(e){ const x = wahl(D.woerter.filter(w => w.w.length >= 3 && w.w.length <= 8 && w.klar)); const i = e.wo === "anfang" ? 0 : z(0, x.w.length - 1);
            return `<div class="zeile">${bild(x.b)}<span style="font-size:1.1em;letter-spacing:.08em">${esc(x.w.slice(0, i))}<span class="feldl" style="min-width:1.2em"><span class="lsg">${esc(x.w[i])}</span></span>${esc(x.w.slice(i + 1))}</span></div>`; } },
    woerter: { titel: "Wörter lesen und schreiben", fach: "Deutsch", klassen: [1, 2], sp: 2, text: "Schreibe das Wort zum Bild. (Kl. 1: Schreibe die Buchstaben, die du hörst.)",
        optionen: [{ k: "laenge", label: "Wörter", werte: () => [["kurz", "kurz (1–2 Silben)"], ["alle", "auch länger"]] }],
        aufgabe(e){ const x = wahl(D.woerter.filter(w => e.laenge === "alle" ? w.n <= 3 : w.n <= 2 && w.w.length <= 6)); return `<div class="zeile">${bild(x.b)}${L(x.w, true)}</div>`; } },
    begleiter: { titel: "der, die oder das?", fach: "Deutsch", klassen: [1, 2, 3], sp: 2, text: "Schreibe den richtigen Begleiter vor das Wort.",
        optionen: [],
        aufgabe(){ const x = wahl(D.woerter.filter(w => !/^(Socken|Nudeln)$/.test(w.w))); return `<div class="zeile">${bild(x.b)}${L(x.a)}<span>${esc(x.w)}</span></div>`; } },
    reime: { titel: "Reimwörter", fach: "Deutsch", klassen: [1, 2], sp: 2, text: "Was reimt sich? Verbinde die Bilder, die sich reimen.", ganz: true,
        optionen: [],
        blatt(){ const f = b => D.woerter.find(x => x.b === b); const paare = mischen(D.reime.filter(([a, b]) => f(a) && f(b))).slice(0, 6); const rechts = mischen(paare.map(p => p[1]));
            return paare.map((p, i) => `<div class="zeile" style="justify-content:flex-end">${bild(p[0])}<span style="font-family:Nunito;font-size:.7em">${esc(f(p[0]).w)}</span> ●</div><div class="zeile">● ${bild(rechts[i])}<span style="font-family:Nunito;font-size:.7em">${esc(f(rechts[i]).w)}</span><span class="lsg" style="font-size:.6em">(${esc(f(paare.find(q => q[1] === rechts[i])[0]).w)})</span></div>`).join(""); } },
    abc: { titel: "ABC ordnen", fach: "Deutsch", klassen: [2, 3, 4], sp: 1, text: "Ordne die Wörter nach dem ABC.",
        optionen: [{ k: "schwer", label: "Schwierigkeit", werte: k => [["erster", "verschiedene Anfangsbuchstaben"], ...(k >= 3 ? [["zweiter", "gleicher Anfangsbuchstabe"]] : [])] }],
        aufgabe(e){ let w; if (e.schwer === "zweiter") { const b = wahl(["B", "K", "M", "S", "T", "P"]); w = mischen(D.woerter.filter(x => x.w[0] === b).map(x => x.w)).slice(0, 4); if (w.length < 3) w = mischen(D.woerter.map(x => x.w)).slice(0, 4); }
            else { const gesehen = new Set(); w = mischen(D.woerter).filter(x => !gesehen.has(x.w[0]) && gesehen.add(x.w[0])).slice(0, 4).map(x => x.w); }
            const s = w.slice().sort((a, b) => a.localeCompare(b, "de")); return `<div class="ae" style="white-space:normal;flex-wrap:wrap">${w.map(esc).join(", ")} → ${L(s.join(", "), true)}</div>`; } },
    wortarten: { titel: "Wortarten sortieren", fach: "Deutsch", klassen: [3, 4], sp: 1, text: "Sortiere die Wörter: Nomen, Verben, Adjektive. Nomen schreibst du groß!", ganz: true,
        optionen: [],
        blatt(){ const A = D.wortarten, w = { Nomen: mischen(A.Nomen).slice(0, 7), Verben: mischen(A.Verben).slice(0, 7), Adjektive: mischen(A.Adjektive).slice(0, 7) };
            const alle = mischen([...w.Nomen.map(x => x.toLowerCase()), ...w.Verben, ...w.Adjektive]);
            return `<div class="wortspeicher">${alle.map(x => `<span>${esc(x)}</span>`).join("")}</div><table class="tab voll-breit"><tr><th>Nomen</th><th>Verben</th><th>Adjektive</th></tr>${[0, 1, 2, 3, 4, 5, 6].map(i => `<tr>${["Nomen", "Verben", "Adjektive"].map(k => `<td><span class="lsg">${esc(w[k][i])}</span></td>`).join("")}</tr>`).join("")}</table>`; } },
    spuren: { titel: "Buchstaben nachspuren", fach: "Deutsch", klassen: [1], sp: 1, text: "Spure die Buchstaben nach und schreibe sie selbst weiter.",
        optionen: [{ k: "buchstaben", label: "Buchstaben", werte: () => [["M m", "M m"], ["A a", "A a"], ["O o", "O o"], ["L l", "L l"], ["S s", "S s"], ["E e", "E e"], ["I i", "I i"], ["T t", "T t"], ["N n", "N n"], ["R r", "R r"], ["U u", "U u"], ["H h", "H h"], ["D d", "D d"], ["mix", "gemischt"]] }],
        aufgabe(e){ const b = e.buchstaben === "mix" ? wahl(["M m", "A a", "O o", "L l", "S s", "E e", "I i", "T t"]) : e.buchstaben; const [g, k] = b.split(" ");
            return `<div><div class="spur">${(g + " " + k + " ").repeat(3)}</div><div style="border-bottom:.35mm solid #555;height:1.6em"></div></div>`; } }
};

/* ---------- Zustand ---------- */
let E = { klasse: 1, fach: "Mathe", art: "plusminus" };
try { Object.assign(E, JSON.parse(localStorage.getItem("lern-gen") || "{}")); } catch (x) {}
let blattDaten = null;
const merken = () => { try { localStorage.setItem("lern-gen", JSON.stringify(E)); } catch (x) {} };

function arten(){ return Object.entries(U).filter(([, u]) => u.fach === E.fach && u.klassen.includes(+E.klasse)); }
function oberflaeche(){
    document.getElementById("klasse").innerHTML = [1, 2, 3, 4].map(k => `<button class="wahl ${+E.klasse === k ? "an" : ""}" data-k="${k}">Klasse ${k}</button>`).join("");
    document.getElementById("fach").innerHTML = ["Mathe", "Deutsch"].map(f => `<button class="wahl ${E.fach === f ? "an" : ""}" data-f="${f}">${f}</button>`).join("");
    const a = arten(); if (!a.some(([id]) => id === E.art)) E.art = a[0][0];
    document.getElementById("art").innerHTML = a.map(([id, u]) => `<option value="${id}" ${id === E.art ? "selected" : ""}>${esc(u.titel)}</option>`).join("");
    const u = U[E.art];
    document.getElementById("artText").textContent = "Auftrag: " + u.text;
    document.getElementById("optionen").innerHTML = (u.optionen || []).map(o => { const w = o.werte(+E.klasse); const sch = E.art + "_" + o.k; if (!w.some(([v]) => String(v) === String(E[sch]))) E[sch] = w[0][0];
        return `<label class="feld">${esc(o.label)}</label><select data-o="${o.k}">${w.map(([v, l]) => `<option value="${esc(String(v))}" ${String(v) === String(E[sch]) ? "selected" : ""}>${esc(l)}</option>`).join("")}</select>`; }).join("");
    document.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { E.klasse = +b.dataset.k; merken(); oberflaeche(); neu(); });
    document.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { E.fach = b.dataset.f; merken(); oberflaeche(); neu(); });
    document.querySelectorAll("[data-o]").forEach(s => s.onchange = () => { E[E.art + "_" + s.dataset.o] = s.value; merken(); neu(); });
}
document.getElementById("art").onchange = ev => { E.art = ev.target.value; merken(); oberflaeche(); neu(); };
function einst(){ const u = U[E.art], e = {}; (u.optionen || []).forEach(o => { let v = E[E.art + "_" + o.k]; e[o.k] = v === "true" ? true : v === "false" ? false : v; }); return e; }

function blattBauen(loesung){
    const u = U[E.art], b = document.createElement("div");
    b.className = "blatt" + (loesung ? " loesung" : "");
    b.innerHTML = `<div class="b-kopf"><div class="b-titel">${esc(u.titel)}${loesung ? " – Lösung" : ""}</div><div class="b-meta"><i class="fa-solid fa-tower-observation"></i> Lernangebot · ${esc(u.fach)}<br>Klasse ${E.klasse}</div></div>
        <div class="b-name"><span>Name:</span><span class="ln"></span><span>Datum:</span><span class="ln kurz"></span></div>
        <div class="b-auftrag"><span class="nr">1</span><span>${esc(u.text)}</span></div>
        <div class="b-inhalt${u.ganz ? " ganz" : ""}" style="--sp:${u.sp};--gap:${u.gap || "4mm"}">${blattDaten.join("")}</div>
        <div class="b-fuss"><span>Lernangebot · ${esc(u.titel)}</span><span>${FUSS}</span></div>`;
    if (!loesung) b.querySelectorAll(".lsg").forEach(x => x.style.visibility = "hidden");
    return b;
}
const passt = b => b.querySelector(".b-inhalt").scrollHeight <= b.querySelector(".b-inhalt").clientHeight + 1;
// So viele Aufgaben, wie in schöner Größe auf die Seite passen – der Rest des Platzes wird gleichmäßig verteilt
async function neu(){
    const u = U[E.art], e = einst(), rahmen = document.getElementById("vorschau");
    rahmen.innerHTML = "";
    if (u.ganz) { blattDaten = [u.blatt(e, +E.klasse)]; }
    else {
        blattDaten = [];
        const probe = () => { const b = blattBauen(false); b.style.fontSize = (E.klasse <= 2 ? 18 : 16) + "pt"; rahmen.innerHTML = ""; rahmen.appendChild(b); return b; };
        const neueAufgabe = () => { for (let v = 0; v < 12; v++) { const h = u.aufgabe(e, +E.klasse); if (!blattDaten.includes(h)) return h; } return u.aufgabe(e, +E.klasse); };
        let b = probe();
        for (let i = 0; i < 80; i++) { blattDaten.push(neueAufgabe()); b.querySelector(".b-inhalt").innerHTML = blattDaten.join(""); if (!passt(b)) { blattDaten.pop(); break; } }
        // auf volle Reihen kürzen (sieht ruhiger aus)
        const sp = u.sp || 1; if (blattDaten.length > sp) blattDaten.length -= blattDaten.length % sp;
    }
    zeigen();
}
async function zeigen(){
    const rahmen = document.getElementById("vorschau");
    rahmen.innerHTML = "";
    const b = blattBauen(false); b.style.fontSize = (E.klasse <= 2 ? 18 : 16) + "pt"; rahmen.appendChild(b);
    const skal = () => { const f = (rahmen.clientWidth || 600) / b.offsetWidth; b.style.transform = `scale(${f})`; rahmen.style.height = (b.offsetHeight * f) + "px"; };
    skal(); window.onresize = skal;
    const ok = einpassen(b);
    const st = document.getElementById("status");
    st.className = "status" + (ok ? "" : " voll");
    st.innerHTML = ok ? `<i class="fa-solid fa-check"></i> Passt genau auf eine A4-Seite · ${blattDaten.length > 1 ? blattDaten.length + " Aufgaben" : "1 Blatt"}` : '<i class="fa-solid fa-triangle-exclamation"></i> Zu voll – bitte „Neu mischen“';
}
function einpassen(b){
    let lo = 10, hi = E.klasse <= 2 ? 18 : 16;
    b.style.fontSize = hi + "pt"; if (passt(b)) return true;
    for (let i = 0; i < 10; i++) { const m = (lo + hi) / 2; b.style.fontSize = m + "pt"; if (passt(b)) lo = m; else hi = m; }
    b.style.fontSize = lo + "pt"; return passt(b);
}
document.getElementById("neu").onclick = neu;
document.getElementById("drucken").onclick = () => {
    const ziel = document.getElementById("druck"), n = Math.max(1, Math.min(40, +document.getElementById("anzahl").value || 1));
    ziel.innerHTML = "";
    const erstes = blattBauen(false); ziel.appendChild(erstes); einpassen(erstes);
    for (let i = 1; i < n; i++) ziel.appendChild(erstes.cloneNode(true));
    if (document.getElementById("loesung").checked) { const l = blattBauen(true); ziel.appendChild(l); l.style.fontSize = erstes.style.fontSize; }
    const t = document.title; document.title = U[E.art].titel + " – Klasse " + E.klasse;
    window.addEventListener("afterprint", () => { ziel.innerHTML = ""; document.title = t; }, { once: true });
    setTimeout(() => window.print(), 60);
};
oberflaeche();
(document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 2000))]) : Promise.resolve()).then(neu);
</script>
</body>
</html>
