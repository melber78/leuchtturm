<?php $LT_GAST_BEREICH = "timer"; require __DIR__ . "/gast-zugang.php"; ?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Stunden-Timer · LRS · Leuchtturm</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<!--
  Leuchtturm – Stunden-Timer für die LRS-Stunde (AFS)
  Phasen: Ankommen – Aufmerksamkeit – Funktionstraining – Symptomtraining – Abschluss.
  Dauer wählen, Minuten je Phase werden verteilt (wie beim Stundenplaner) und lassen sich anpassen.
  Aus der Stundenplanung (lrs.php) mit den Zeiten der geplanten Stunde aufrufbar: lrs-timer.php?p=Ankommen:3,Aufmerksamkeit:7,…
  Der Stand bleibt beim Neuladen erhalten (wird nur im Browser gemerkt).
-->
<style>
:root{ --nacht:#16324a; --meer:#3d7ea6; --gold:#f2a93b; --text:#1f2d36; --grau:#7c8a85; --pf:#3d7ea6; }
*{ box-sizing:border-box; }
html, body{ height:100%; }
body{ margin:0; background:linear-gradient(160deg,#fbf7ee,#eaf3f9); color:var(--text); font-family:"Nunito",sans-serif; display:flex; flex-direction:column; user-select:none; -webkit-user-select:none; }
.kopf{ display:flex; align-items:center; gap:10px; padding:10px 18px; }
.kopf a, .k{ font:800 15px "Nunito",sans-serif; border:0; border-radius:999px; padding:10px 16px; background:white; color:var(--nacht); cursor:pointer; display:inline-flex; gap:8px; align-items:center; text-decoration:none; box-shadow:0 3px 10px rgba(22,50,74,.08); min-height:44px; }
.k.rund{ width:46px; padding:0; justify-content:center; }
.kopf h1{ margin:0; font-size:20px; font-weight:900; color:#7c6a4f; }
.luft{ flex:1; }
.ende{ font-weight:900; color:var(--nacht); background:white; border-radius:999px; padding:10px 16px; box-shadow:0 3px 10px rgba(22,50,74,.08); font-variant-numeric:tabular-nums; }
main{ flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2.4vh; padding:0 3vw 2vh; min-height:0; }
/* großer Ring */
.ring{ position:relative; width:min(46vh,60vw); aspect-ratio:1; }
.ring svg{ width:100%; height:100%; transform:rotate(-90deg); }
.ring .bahn{ fill:none; stroke:rgba(22,50,74,.08); stroke-width:9; }
.ring .rest{ fill:none; stroke:var(--pf); stroke-width:9; stroke-linecap:round; transition:stroke-dashoffset .4s linear, stroke .4s; }
.ring-innen{ position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
.p-emoji{ font-size:min(9vh,11vw); line-height:1; }
.p-name{ font:900 min(4.4vh,5.4vw) "Nunito",sans-serif; color:var(--pf); margin-top:.6vh; }
.zeit{ font:900 min(11vh,13vw)/1 "Nunito",sans-serif; color:var(--nacht); font-variant-numeric:tabular-nums; letter-spacing:-.02em; margin-top:.4vh; }
.p-text{ font:700 min(2.2vh,3.4vw) "Nunito",sans-serif; color:var(--grau); max-width:80%; margin-top:.4vh; }
body.bald .zeit{ color:#d97706; }
body.vorbei .zeit{ color:#c0392b; animation:blink 1s steps(2) infinite; }
body.vorbei .ring .rest{ stroke:#c0392b; }
@keyframes blink{ 50%{ opacity:.35; } }
.hinweis{ min-height:1.6em; font:900 min(2.6vh,4vw) "Nunito",sans-serif; color:#c0392b; text-align:center; }
.hinweis.gut{ color:#2e9e5b; }
body.vorbei .hinweis{ cursor:pointer; text-decoration:underline; text-underline-offset:4px; }
/* Steuerung */
.steuer{ display:flex; gap:12px; align-items:center; flex-wrap:wrap; justify-content:center; }
.steuer .k{ font-size:17px; padding:12px 20px; min-height:56px; }
.steuer .start{ background:var(--nacht); color:white; font-size:22px; padding:14px 34px; min-height:64px; }
.steuer .start.pause{ background:var(--gold); color:var(--nacht); }
/* Phasen-Leiste */
.leiste{ width:min(1300px,100%); display:flex; gap:6px; }
.seg{ position:relative; border-radius:16px; background:white; padding:10px 8px 12px; text-align:center; cursor:pointer; box-shadow:0 3px 10px rgba(22,50,74,.06); overflow:hidden; min-width:0; border:3px solid transparent; transition:.2s; }
.seg .voll{ position:absolute; left:0; top:0; bottom:0; background:var(--sf); opacity:.16; width:0; }
.seg b{ position:relative; display:block; font-size:clamp(12px,1.3vw,18px); font-weight:900; color:var(--sf); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.seg span{ position:relative; display:block; font-size:clamp(18px,2vw,30px); }
.seg small{ position:relative; display:block; font-weight:800; color:var(--grau); font-size:clamp(11px,1.1vw,15px); font-variant-numeric:tabular-nums; }
.seg.an{ border-color:var(--sf); transform:translateY(-4px); box-shadow:0 8px 20px rgba(22,50,74,.14); }
.seg.fertig{ opacity:.55; } .seg.fertig b::after{ content:" ✓"; }
.gesamt{ font-weight:800; color:var(--grau); font-size:15px; font-variant-numeric:tabular-nums; }
/* Einstellungen */
#einst{ position:fixed; inset:0; background:rgba(22,50,74,.45); display:none; align-items:center; justify-content:center; z-index:10; }
#einst.an{ display:flex; }
.dialog{ background:white; border-radius:24px; padding:22px 26px; width:min(640px,94vw); max-height:92vh; overflow:auto; box-shadow:0 20px 60px rgba(0,0,0,.3); user-select:text; }
.dialog h2{ margin:0 0 12px; font-size:24px; font-weight:900; color:var(--nacht); }
.dialog label.t{ display:block; font-weight:900; font-size:13px; text-transform:uppercase; letter-spacing:.04em; color:#8a7a60; margin:14px 0 6px; }
.wahl{ display:flex; flex-wrap:wrap; gap:6px; }
.wahl button{ font:800 15px "Nunito",sans-serif; border:2px solid #e2ddd2; background:white; border-radius:999px; padding:8px 14px; cursor:pointer; }
.wahl button.an{ background:var(--nacht); color:white; border-color:var(--nacht); }
.zeile{ display:flex; gap:8px; align-items:center; padding:6px 0; border-bottom:1px solid #f0ece4; }
.zeile .e{ font-size:24px; width:34px; text-align:center; }
.zeile input[type=text]{ flex:1; font:700 15px "Nunito",sans-serif; padding:7px 10px; border:2px solid #e2ddd2; border-radius:10px; min-width:0; }
.zeile input[type=number]{ width:70px; font:800 16px "Nunito",sans-serif; padding:7px 8px; border:2px solid #e2ddd2; border-radius:10px; }
.zeile .x{ border:0; background:#fdecea; color:#a3261c; border-radius:10px; width:38px; height:38px; cursor:pointer; font-weight:900; }
.schalter{ display:flex; gap:10px; align-items:center; font-weight:800; margin:6px 0; cursor:pointer; }
.schalter input{ width:22px; height:22px; }
.summe{ font-weight:900; color:var(--nacht); margin-top:8px; }
.summe.falsch{ color:#c0392b; }
@media (max-width:700px){ .leiste{ flex-wrap:wrap; } .seg{ flex:1 1 30% !important; } .kopf h1{ display:none; } }
</style>
</head>
<body>
<div class="kopf">
    <a href="lrs.php#stunde" title="Zurück zur LRS-Förderung"><i class="fa-solid fa-arrow-left"></i></a>
    <h1>⏱ Stunden-Timer</h1>
    <span class="luft"></span>
    <span class="ende" id="ende"></span>
    <button class="k" onclick="einstellungen(true)"><i class="fa-solid fa-sliders"></i> Stunde einstellen</button>
    <button class="k rund" onclick="vollbild()" title="Vollbild"><i class="fa-solid fa-expand"></i></button>
</div>
<main>
    <div class="ring">
        <svg viewBox="0 0 100 100"><circle class="bahn" cx="50" cy="50" r="44"/><circle class="rest" id="ringRest" cx="50" cy="50" r="44"/></svg>
        <div class="ring-innen">
            <div class="p-emoji" id="pEmoji"></div>
            <div class="p-name" id="pName"></div>
            <div class="zeit" id="zeit"></div>
            <div class="p-text" id="pText"></div>
        </div>
    </div>
    <div class="hinweis" id="hinweis" onclick="if (!Z.fertig && restJetzt() <= 0) schritt(1)"></div>
    <div class="steuer">
        <button class="k" onclick="schritt(-1)" title="vorige Phase"><i class="fa-solid fa-backward-step"></i></button>
        <button class="k" onclick="plusMinute(-1)" title="1 Minute weniger">− 1 Min</button>
        <button class="k start" id="kStart" onclick="startPause()"></button>
        <button class="k" onclick="plusMinute(1)" title="1 Minute mehr">+ 1 Min</button>
        <button class="k" id="kWeiter" onclick="schritt(1)" title="nächste Phase"><i class="fa-solid fa-forward-step"></i> weiter</button>
    </div>
    <div class="leiste" id="leiste"></div>
    <div class="gesamt" id="gesamt"></div>
</main>

<div id="einst" onclick="if (event.target === this) einstellungen(false)">
    <div class="dialog">
        <h2>Stunde einstellen</h2>
        <label class="t">Dauer der Stunde</label>
        <div class="wahl" id="wahlDauer"></div>
        <label class="t">Phasen und Minuten</label>
        <div id="phasenListe"></div>
        <div class="wahl" style="margin-top:10px"><button onclick="phaseDazu('Bewegungspause')">+ 🤸 Bewegungspause</button><button onclick="phaseDazu('Spiel')">+ 🎲 Spiel</button><button onclick="phaseDazu('Lesen')">+ 📖 Lesen</button><button onclick="phaseDazu('')">+ eigene Phase</button></div>
        <div class="summe" id="summe"></div>
        <label class="t">Ablauf</label>
        <label class="schalter"><input type="checkbox" id="optAuto"> Nach Ablauf automatisch zur nächsten Phase</label>
        <label class="schalter"><input type="checkbox" id="optGong"> Gong am Ende jeder Phase (und leiser Ton 1 Minute vorher)</label>
        <div class="wahl" style="margin-top:16px"><button onclick="neuStarten()">↺ Stunde von vorn</button><button class="an" onclick="einstellungen(false)">✓ Fertig</button></div>
    </div>
</div>

<script>
"use strict";
const ARTEN = {
    "Ankommen":          { e: "👋", f: "#e09a2c", t: "Begrüßen, kurz erzählen, Lernbox" , g: 3 },
    "Aufmerksamkeit":    { e: "🎯", f: "#e2574c", t: "Konzentration wecken", g: 7 },
    "Funktionstraining": { e: "🧩", f: "#3d7ea6", t: "Sinneswahrnehmung üben", g: 14 },
    "Symptomtraining":   { e: "✏️", f: "#2e9e5b", t: "Lesen und Schreiben üben", g: 15 },
    "Abschluss":         { e: "⭐", f: "#8e44ad", t: "Rückblick, Stempel, kleines Spiel", g: 5 },
    "Bewegungspause":    { e: "🤸", f: "#16a085", t: "Kurz bewegen, durchatmen", g: 2 },
    "Spiel":             { e: "🎲", f: "#d35400", t: "Lernspiel", g: 5 },
    "Lesen":             { e: "📖", f: "#b5651d", t: "Gemeinsam lesen", g: 5 },
};
const STANDARD = ["Ankommen", "Aufmerksamkeit", "Funktionstraining", "Symptomtraining", "Abschluss"];
const info = name => ARTEN[name] || { e: "⏱", f: "#607d8b", t: "", g: 5 };

// Minuten anteilig verteilen (wie der Stundenplaner in lrs.php)
function verteilen(namen, gesamt){
    const roh = namen.map(n => Math.max(2, gesamt * info(n).g / namen.reduce((a, x) => a + info(x).g, 0)));
    const min = roh.map(Math.floor); let rest = gesamt - min.reduce((a, b) => a + b, 0);
    const folge = roh.map((r, i) => [r - Math.floor(r), i]).sort((a, b) => b[0] - a[0]).map(x => x[1]);
    for (let k = 0; rest > 0; k++, rest--) min[folge[k % folge.length]]++;
    while (rest < 0){ const i = min.indexOf(Math.max(...min)); if (min[i] <= 1) break; min[i]--; rest++; }
    return namen.map((n, i) => ({ name: n, min: min[i] }));
}

/* Zustand: läuft, Phase, Restzeit; bleibt beim Neuladen erhalten */
let Z = null;
try { Z = JSON.parse(localStorage.getItem("lrs_timer") || "null"); } catch (x) {}
const url = new URLSearchParams(location.search);
if (url.get("p")) {   // aus der Stundenplanung übernommen
    const ph = url.get("p").split(",").map(t => { const [n, m] = t.split(":"); return { name: decodeURIComponent(n).slice(0, 40), min: Math.max(1, Math.min(120, parseInt(m, 10) || 5)) }; }).filter(p => p.name);
    if (ph.length) Z = { phasen: ph, dauer: ph.reduce((a, p) => a + p.min, 0), auto: Z ? Z.auto : false, gong: Z ? Z.gong !== false : true };
    history.replaceState(null, "", location.pathname);
}
if (!Z || !Array.isArray(Z.phasen) || !Z.phasen.length) Z = { phasen: verteilen(STANDARD, 45), dauer: 45, auto: false, gong: true };
if (Z.i == null) zuruecksetzen(false);
function merken(){ try { localStorage.setItem("lrs_timer", JSON.stringify(Z)); } catch (x) {} }
function zuruecksetzen(m = true){ Z.i = 0; Z.laeuft = false; Z.rest = Z.phasen[0].min * 60000; Z.bis = 0; Z.gewarnt = false; Z.fertig = false; if (m) merken(); }
function restJetzt(){ return Z.laeuft ? Z.bis - Date.now() : Z.rest; }

/* ---------- Ton ---------- */
let audio = null;
function ton(stark){
    if (!Z.gong) return;
    try {
        audio = audio || new (window.AudioContext || window.webkitAudioContext)();
        const t0 = audio.currentTime;
        (stark ? [523.25, 659.25, 783.99] : [880]).forEach((f, i) => {
            const o = audio.createOscillator(), g = audio.createGain();
            o.type = "sine"; o.frequency.value = f;
            const s = t0 + i * 0.22;
            g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(stark ? .35 : .12, s + .02); g.gain.exponentialRampToValueAtTime(.001, s + (stark ? 2.2 : .6));
            o.connect(g); g.connect(audio.destination); o.start(s); o.stop(s + 2.4);
        });
    } catch (x) {}
}
/* Bildschirm bleibt an, solange der Timer läuft */
let sperre = null;
async function wachHalten(an){
    try { if (an && "wakeLock" in navigator && !sperre) { sperre = await navigator.wakeLock.request("screen"); sperre.addEventListener("release", () => sperre = null); } if (!an && sperre) { sperre.release(); sperre = null; } } catch (x) {}
}
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && Z.laeuft) wachHalten(true); });

/* ---------- Bedienung ---------- */
function startPause(){
    if (Z.fertig) { zuruecksetzen(); }
    if (Z.laeuft) { Z.rest = restJetzt(); Z.laeuft = false; }
    else { Z.bis = Date.now() + Z.rest; Z.laeuft = true; if (audio && audio.state === "suspended") audio.resume(); else if (!audio && Z.gong) { try { audio = new (window.AudioContext || window.webkitAudioContext)(); } catch (x) {} } }
    wachHalten(Z.laeuft); merken(); zeichnen();
}
function schritt(d){
    const i = Z.i + d;
    if (i < 0) return;
    if (i >= Z.phasen.length) { Z.fertig = true; Z.laeuft = false; Z.rest = 0; wachHalten(false); merken(); zeichnen(); return; }
    const lief = Z.laeuft || d > 0 && restJetzt() <= 0;
    Z.i = i; Z.rest = Z.phasen[i].min * 60000; Z.gewarnt = false; Z.fertig = false;
    Z.laeuft = lief; if (lief) Z.bis = Date.now() + Z.rest;
    merken(); zeichnen();
}
function plusMinute(m){
    if (Z.laeuft) Z.bis = Math.max(Date.now() + 1000, Z.bis + m * 60000); else Z.rest = Math.max(1000, Z.rest + m * 60000);
    if (restJetzt() > 60000) Z.gewarnt = false;
    merken(); zeichnen();
}
function neuStarten(){ zuruecksetzen(); einstellungen(false); zeichnen(); }

/* ---------- Anzeige ---------- */
const mmss = ms => { const neg = ms < 0, s = Math.round(Math.abs(ms) / 1000); return (neg ? "+" : "") + Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
const uhr = d => String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
function zeichnen(){
    const p = Z.phasen[Z.i] || Z.phasen[Z.phasen.length - 1], I = info(p.name), rest = restJetzt(), gesamtMs = p.min * 60000;
    document.documentElement.style.setProperty("--pf", I.f);
    document.getElementById("pEmoji").textContent = Z.fertig ? "🎉" : I.e;
    document.getElementById("pName").textContent = Z.fertig ? "Geschafft!" : p.name;
    document.getElementById("pText").textContent = Z.fertig ? "Die Stunde ist vorbei." : I.t;
    document.getElementById("zeit").textContent = Z.fertig ? "✓" : mmss(rest);
    const U = 2 * Math.PI * 44, ring = document.getElementById("ringRest");
    ring.style.strokeDasharray = U; ring.style.strokeDashoffset = Z.fertig ? 0 : U * (1 - Math.max(0, Math.min(1, rest / gesamtMs)));
    document.body.classList.toggle("bald", !Z.fertig && rest > 0 && rest <= 60000);
    document.body.classList.toggle("vorbei", !Z.fertig && rest <= 0);
    const h = document.getElementById("hinweis");
    h.className = "hinweis" + (Z.fertig ? " gut" : "");
    h.textContent = Z.fertig ? "🎉 Gut gemacht!" : rest <= 0 ? (Z.i < Z.phasen.length - 1 ? `Zeit um – weiter mit ${Z.phasen[Z.i + 1].name}?` : "Zeit um – Stunde beenden?") : !Z.laeuft && rest < gesamtMs ? "⏸ angehalten" : "";
    const ks = document.getElementById("kStart");
    ks.innerHTML = Z.laeuft ? '<i class="fa-solid fa-pause"></i> Pause' : (Z.fertig ? '<i class="fa-solid fa-rotate-left"></i> Neu' : '<i class="fa-solid fa-play"></i> ' + (rest < gesamtMs || Z.i ? "Weiter" : "Start"));
    ks.classList.toggle("pause", Z.laeuft);
    // Phasen-Leiste
    document.getElementById("leiste").innerHTML = Z.phasen.map((x, k) => { const J = info(x.name), an = k === Z.i && !Z.fertig;
        const anteil = an ? Math.max(0, Math.min(1, 1 - rest / (x.min * 60000))) : (k < Z.i || Z.fertig ? 1 : 0);
        return `<div class="seg ${an ? "an" : ""} ${k < Z.i || Z.fertig ? "fertig" : ""}" style="flex:${Math.max(x.min, 6)} 1 0; --sf:${J.f}" data-k="${k}"><div class="voll" style="width:${anteil * 100}%"></div><span>${J.e}</span><b>${x.name}</b><small>${an ? mmss(rest) : x.min + " Min"}</small></div>`; }).join("");
    // Gesamtzeit und Ende
    const danach = Z.phasen.slice(Z.i + 1).reduce((a, x) => a + x.min * 60000, 0);
    const restGesamt = Z.fertig ? 0 : Math.max(0, rest) + danach;
    const summe = Z.phasen.reduce((a, x) => a + x.min, 0);
    document.getElementById("gesamt").textContent = Z.fertig ? `${summe} Minuten geschafft` : `Noch ${Math.ceil(restGesamt / 60000)} von ${summe} Minuten`;
    document.getElementById("ende").textContent = Z.fertig ? "✓ fertig" : (Z.laeuft ? "Ende ca. " : "Ende bei Start jetzt: ") + uhr(new Date(Date.now() + restGesamt));
    document.title = (Z.laeuft ? mmss(rest) + " · " : "") + "Stunden-Timer";
}
document.getElementById("leiste").addEventListener("click", ev => { const s = ev.target.closest("[data-k]"); if (!s) return; const k = +s.dataset.k; if (k === Z.i) return; if (confirm(`Zur Phase „${Z.phasen[k].name}“ springen?`)) schritt(k - Z.i); });
setInterval(() => {
    if (Z.laeuft) {
        const r = restJetzt();
        if (!Z.gewarnt && r <= 60000 && r > 0 && Z.phasen[Z.i].min > 2) { Z.gewarnt = true; ton(false); merken(); }
        if (r <= 0 && !Z.abgelaufen) {
            Z.abgelaufen = true; ton(true);
            if (Z.auto) { Z.abgelaufen = false; schritt(1); return; }
            merken();
        }
        if (r > 0) Z.abgelaufen = false;
    }
    zeichnen();
}, 250);

/* ---------- Einstellungen ---------- */
function einstellungen(an){
    document.getElementById("einst").classList.toggle("an", an);
    if (an) einstZeigen();
}
function einstZeigen(){
    const summe = Z.phasen.reduce((a, x) => a + x.min, 0);
    document.getElementById("wahlDauer").innerHTML = [20, 25, 30, 35, 40, 45, 50, 60, 90].map(m => `<button class="${m === Z.dauer ? "an" : ""}" onclick="dauerSetzen(${m})">${m} Min</button>`).join("");
    document.getElementById("phasenListe").innerHTML = Z.phasen.map((p, k) => `<div class="zeile"><span class="e">${info(p.name).e}</span><input type="text" value="${p.name.replace(/"/g, "&quot;")}" onchange="phaseAendern(${k}, 'name', this.value)"><input type="number" min="1" max="120" value="${p.min}" onchange="phaseAendern(${k}, 'min', this.value)"> Min<button class="x" onclick="phaseWeg(${k})" title="entfernen">✕</button></div>`).join("");
    const s = document.getElementById("summe");
    s.textContent = `Zusammen: ${summe} Minuten` + (summe !== Z.dauer ? ` (gewählte Dauer: ${Z.dauer} Min)` : "");
    s.className = "summe" + (summe !== Z.dauer ? " falsch" : "");
    document.getElementById("optAuto").checked = !!Z.auto;
    document.getElementById("optGong").checked = Z.gong !== false;
}
function dauerSetzen(m){ Z.dauer = m; Z.phasen = verteilen(Z.phasen.map(p => p.name), m); zuruecksetzen(); einstZeigen(); zeichnen(); }
function phaseAendern(k, feld, wert){
    if (feld === "min") Z.phasen[k].min = Math.max(1, Math.min(120, parseInt(wert, 10) || 1)); else Z.phasen[k].name = String(wert).trim().slice(0, 40) || Z.phasen[k].name;
    Z.dauer = Z.phasen.reduce((a, x) => a + x.min, 0);
    if (k === Z.i && !Z.laeuft) Z.rest = Z.phasen[k].min * 60000;
    merken(); einstZeigen(); zeichnen();
}
function phaseWeg(k){ if (Z.phasen.length < 2) return; Z.phasen.splice(k, 1); Z.dauer = Z.phasen.reduce((a, x) => a + x.min, 0); if (Z.i >= Z.phasen.length) Z.i = Z.phasen.length - 1; if (k <= Z.i && !Z.laeuft) Z.rest = Z.phasen[Z.i].min * 60000; merken(); einstZeigen(); zeichnen(); }
function phaseDazu(name){
    if (!name) name = prompt("Name der Phase:") || ""; if (!name.trim()) return;
    const vor = Z.phasen.findIndex(p => p.name === "Abschluss");
    Z.phasen.splice(vor >= 0 ? vor : Z.phasen.length, 0, { name: name.trim().slice(0, 40), min: info(name).g });
    Z.dauer = Z.phasen.reduce((a, x) => a + x.min, 0); merken(); einstZeigen(); zeichnen();
}
document.getElementById("optAuto").addEventListener("change", e => { Z.auto = e.target.checked; merken(); });
document.getElementById("optGong").addEventListener("change", e => { Z.gong = e.target.checked; merken(); if (Z.gong) ton(false); });
function vollbild(){ try { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); } catch (x) {} }
document.addEventListener("keydown", ev => {
    if (document.getElementById("einst").classList.contains("an") || /INPUT/.test(ev.target.tagName)) return;
    if (ev.key === " ") { ev.preventDefault(); startPause(); } else if (ev.key === "ArrowRight") schritt(1); else if (ev.key === "ArrowLeft") schritt(-1);
});
if (Z.laeuft) wachHalten(true);
zeichnen();
</script>
</body>
</html>
