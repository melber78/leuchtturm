/* ===============================================================
   Tafelbild: Die kleine 1×1-Tabelle (1 · 1 bis 10 · 10)
   Antippen · Reihen · Kernaufgaben · Verdecken/Lücken · Blitzrechnen (Klasse gegen Ella)
   =============================================================== */
(function(){
"use strict";

const CSS = `
#ee{ position:fixed; inset:0; display:none; flex-direction:column; z-index:12; background:linear-gradient(160deg,#fff8e8 0%,#eef6fb 100%); color:#1f2d36; font-family:"Nunito",sans-serif; user-select:none; -webkit-user-select:none; }
#ee.an{ display:flex; }
#ee.gruen{ background:#2f5d46; color:#fff7e6; }
.ee-leiste{ display:flex; gap:8px; align-items:center; padding:8px 14px; flex-wrap:wrap; }
.ee-leiste .ee-titel{ font-weight:900; font-size:18px; color:#7c6a4f; margin-right:6px; }
#ee.gruen .ee-titel{ color:#fff7e6; }
#ee.gruen .tb-k{ background:rgba(255,255,255,.14); color:#fff7e6; }
.ee-punkte{ display:none; gap:10px; align-items:center; font-weight:900; font-size:18px; }
.ee-punkte.an{ display:flex; }
.ee-punkte i{ font-style:normal; }
.ee-punkte span{ background:white; border-radius:999px; padding:6px 14px; color:#16324a; box-shadow:0 3px 10px rgba(22,50,74,.1); }
.ee-haupt{ flex:1; min-height:0; display:flex; gap:2vmin; padding:0 2vmin 2vmin; align-items:stretch; justify-content:center; }
.ee-gitter-box{ flex:none; display:flex; align-items:center; justify-content:center; }
.ee-gitter{ display:grid; grid-template-columns:repeat(11, 1fr); grid-template-rows:repeat(11, 1fr); gap:3px; background:#c9d6e3; border:3px solid #16324a; border-radius:14px; overflow:hidden; }
#ee.gruen .ee-gitter{ background:rgba(255,255,255,.25); border-color:#fff7e6; }
.ee-z{ background:white; display:flex; align-items:center; justify-content:center; font-weight:800; color:#16324a; cursor:pointer; position:relative; transition:background .15s, opacity .15s; font-variant-numeric:tabular-nums; }
#ee.gruen .ee-z{ background:#3c6f55; color:#fff7e6; }
.ee-z.kopf{ background:#16324a; color:#ffd77a; font-weight:900; }
#ee.gruen .ee-z.kopf{ background:#1f4434; }
.ee-z.ecke{ background:#f2a93b; color:#16324a; cursor:default; font-weight:900; }
.ee-z.zu{ color:transparent; }
.ee-z.zu::after{ content:"?"; position:absolute; color:#c9d6e3; font-weight:900; }
#ee.gruen .ee-z.zu::after{ color:rgba(255,255,255,.35); }
.ee-z.kern{ background:#fff4d6; }
.ee-z.quadrat{ background:#e2f0ff; }
#ee.gruen .ee-z.kern{ background:#5d7f3a; } #ee.gruen .ee-z.quadrat{ background:#2f6a7a; }
.ee-z.reihe{ background:#ffe0a3 !important; color:#16324a !important; }
.ee-z.reihe.zu{ color:transparent !important; }
.ee-z.kopf.reihe{ background:#f2a93b !important; color:#16324a !important; }
.ee-z.weg{ background:#fff1c9 !important; }
#ee.gruen .ee-z.weg{ background:#7d8f3a !important; }
.ee-z.wahl{ background:#f2a93b !important; color:#16324a !important; box-shadow:inset 0 0 0 4px #16324a; z-index:1; }
.ee-z.wahl::after{ display:none; }
.ee-z.geschafft::before{ content:"✓"; position:absolute; top:2px; right:4px; font-size:.45em; color:#2e8b57; font-weight:900; }
.ee-z.gedimmt{ opacity:.35; }
.ee-panel{ flex:1; max-width:520px; min-width:260px; background:white; border-radius:22px; box-shadow:0 6px 24px rgba(22,50,74,.1); padding:2.4vmin 2.6vmin; display:flex; flex-direction:column; gap:1.6vmin; overflow:auto; color:#1f2d36; }
#ee.gruen .ee-panel{ background:rgba(255,255,255,.1); color:#fff7e6; box-shadow:none; }
.ee-leer{ color:#7c8a85; font-size:clamp(16px,2.2vmin,24px); line-height:1.4; }
#ee.gruen .ee-leer{ color:#e6eedf; }
.ee-aufgabe{ font-size:clamp(40px,8vmin,110px); font-weight:900; line-height:1; color:#16324a; text-align:center; white-space:nowrap; }
#ee.gruen .ee-aufgabe{ color:#fff7e6; }
.ee-aufgabe .erg{ color:#d1342b; }
.ee-aufgabe .erg.zu{ background:#eef2f6; color:transparent; border-radius:14px; padding:0 .2em; cursor:pointer; }
.ee-zeile{ font-size:clamp(16px,2.6vmin,30px); font-weight:800; text-align:center; }
.ee-zeile small{ display:block; font-size:.6em; font-weight:800; color:#7c8a85; text-transform:uppercase; letter-spacing:.06em; }
#ee.gruen .ee-zeile small{ color:#d6e3d0; }
.ee-trick{ background:#fff4d6; border-radius:14px; padding:1vmin 1.4vmin; }
#ee.gruen .ee-trick{ background:rgba(255,255,255,.12); }
.ee-punktfeld{ display:grid; gap:.5vmin; justify-content:center; margin:0 auto; }
.ee-punktfeld i{ display:block; border-radius:50%; background:#3d7ea6; }
.ee-punktfeld i.r5{ background:#d1342b; }
.ee-liste{ display:grid; grid-template-columns:1fr; gap:.4vmin; font-size:clamp(18px,3vmin,36px); font-weight:800; }
.ee-liste div{ display:flex; justify-content:space-between; padding:.2vmin 1vmin; border-radius:10px; cursor:pointer; }
.ee-liste div:nth-child(odd){ background:#f4f7fa; }
#ee.gruen .ee-liste div:nth-child(odd){ background:rgba(255,255,255,.08); }
.ee-liste b{ color:#d1342b; }
.ee-liste b.zu{ color:transparent; background:#eef2f6; border-radius:8px; min-width:2.2em; }
.ee-blitz{ position:absolute; inset:0; background:rgba(22,50,74,.55); display:none; align-items:center; justify-content:center; z-index:5; }
.ee-blitz.an{ display:flex; }
.ee-blitz-box{ background:white; color:#16324a; border-radius:28px; padding:4vmin 5vmin; text-align:center; box-shadow:0 20px 60px rgba(0,0,0,.25); min-width:min(90vw,560px); }
.ee-blitz-box .frage{ font-size:clamp(60px,16vmin,190px); font-weight:900; line-height:1.05; white-space:nowrap; }
.ee-blitz-box .frage .erg{ color:#d1342b; }
.ee-blitz-box .knoepfe{ display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:3vmin; }
.ee-blitz-box .knoepfe button{ font:900 clamp(18px,2.6vmin,28px) "Nunito",sans-serif; border:0; border-radius:999px; padding:1.4vmin 3vmin; cursor:pointer; background:#f1ece2; color:#16324a; }
.ee-blitz-box .knoepfe .k{ background:#2e8b57; color:white; }
.ee-blitz-box .knoepfe .e{ background:#7a5a9e; color:white; }
.ee-blitz-box .knoepfe .l{ background:#f2a93b; }
.ee-blitz-box .info{ margin-top:2vmin; font-weight:800; color:#7c8a85; font-size:clamp(14px,1.9vmin,20px); }
.ee-menue{ position:absolute; top:62px; right:14px; background:white; color:#16324a; border-radius:18px; box-shadow:0 12px 40px rgba(22,50,74,.2); padding:14px; display:none; flex-direction:column; gap:8px; z-index:6; min-width:250px; }
.ee-menue.an{ display:flex; }
.ee-menue h4{ margin:4px 0 0; font-size:12px; text-transform:uppercase; letter-spacing:.06em; color:#7c8a85; }
.ee-menue .reihe{ display:flex; gap:6px; flex-wrap:wrap; }
.ee-menue button{ font:800 15px "Nunito",sans-serif; border:2px solid #e3e8ee; background:#f7f9fb; color:#16324a; border-radius:12px; padding:8px 12px; cursor:pointer; }
.ee-menue button.an{ background:#16324a; border-color:#16324a; color:white; }
@media (max-width:900px), (orientation:portrait){
  #ee{ overflow-y:auto; -webkit-overflow-scrolling:touch; }
  .ee-haupt{ flex-direction:column; align-items:center; flex:none; }
  .ee-panel{ max-width:none; width:100%; min-width:0; flex:none; }
  .ee-leiste .tb-k .ee-txt{ display:none; }
  .ee-leiste{ padding:8px 10px; gap:6px; }
}
`;

let el, zustand = { modus: "zeigen", zu: new Set(), wahl: null, reihe: null, kern: false, quadrat: false, geschafft: new Set(), punkte: { k: 0, e: 0 }, blitz: null, bis: 10 };
const key = (a, b) => a + "," + b;
const KERN = [1, 2, 5, 10];

function aufbauen(){
    if (el) return;
    const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    el = document.createElement("div");
    el.id = "ee";
    el.innerHTML = `
        <div class="ee-leiste">
            <button class="tb-k rund" data-a="zu" title="Zurück zur Übersicht"><i class="fa-solid fa-arrow-left"></i></button>
            <span class="ee-titel">1 × 1</span>
            <button class="tb-k" data-a="zeigen" title="Alle Ergebnisse zeigen"><i class="fa-solid fa-eye"></i><span class="ee-txt"> Zeigen</span></button>
            <button class="tb-k" data-a="verdecken" title="Alle Ergebnisse verdecken – antippen deckt auf"><i class="fa-solid fa-eye-slash"></i><span class="ee-txt"> Verdecken</span></button>
            <button class="tb-k" data-a="luecken" title="Zufällige Lücken"><i class="fa-solid fa-shuffle"></i><span class="ee-txt"> Lücken</span></button>
            <button class="tb-k" data-a="kern" title="Kernaufgaben ×1, ×2, ×5, ×10 färben"><i class="fa-solid fa-star"></i><span class="ee-txt"> Kernaufgaben</span></button>
            <button class="tb-k" data-a="quadrat" title="Quadratzahlen (1·1, 2·2 …) färben"><i class="fa-solid fa-square"></i><span class="ee-txt"> Quadratzahlen</span></button>
            <button class="tb-k" data-a="blitz" title="Blitzrechnen mit Punkten"><i class="fa-solid fa-bolt"></i><span class="ee-txt"> Blitzrechnen</span></button>
            <span class="ee-punkte" id="eePunkte"><span><i id="eeNa">Klasse</i> <b id="eePk">0</b></span><span><i id="eeNb">🦉 Ella</i> <b id="eePe">0</b></span></span>
            <span class="tb-luft"></span>
            <button class="tb-k rund" data-a="menue" title="Einstellungen"><i class="fa-solid fa-sliders"></i></button>
            <button class="tb-k rund" data-a="voll" title="Vollbild"><i class="fa-solid fa-expand"></i></button>
        </div>
        <div class="ee-menue" id="eeMenue">
            <h4>Tabelle</h4>
            <div class="reihe" data-wahl="bis"><button data-w="5">bis 5 · 5</button><button data-w="10">bis 10 · 10</button></div>
            <h4>Hintergrund</h4>
            <div class="reihe" data-wahl="hg"><button data-w="hell">hell</button><button data-w="gruen">Kreidetafel grün</button></div>
            <h4>Blitzrechnen: Wer spielt?</h4>
            <div class="reihe" data-wahl="gegner"><button data-w="ella">Klasse gegen Ella</button><button data-w="teams">Team A gegen Team B</button><button data-w="lehrkraft">Klasse gegen Lehrkraft</button></div>
            <h4>Zurücksetzen</h4>
            <div class="reihe"><button data-a="neu">Häkchen und Punkte löschen</button></div>
        </div>
        <div class="ee-haupt">
            <div class="ee-gitter-box"><div class="ee-gitter" id="eeGitter"></div></div>
            <div class="ee-panel" id="eePanel"></div>
        </div>
        <div class="ee-blitz" id="eeBlitz"><div class="ee-blitz-box"></div></div>`;
    document.body.appendChild(el);
    el.addEventListener("click", klick);
    window.addEventListener("resize", () => { if (el.classList.contains("an")) groesse(); });
}

function groesse(){
    const g = el.querySelector("#eeGitter"), haupt = el.querySelector(".ee-haupt");
    const hoch = matchMedia("(max-width:900px), (orientation:portrait)").matches;
    const r = haupt.getBoundingClientRect();
    const n = zustand.bis + 1;
    let s;
    if (hoch) s = Math.min(window.innerWidth - 24, window.innerHeight * 0.72);
    else s = Math.min(r.height - 4, (r.width - 300) * 0.98);
    s = Math.max(220, Math.floor(s));
    g.style.width = g.style.height = s + "px";
    g.style.gridTemplateColumns = g.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    g.style.fontSize = Math.round(s / n * 0.42) + "px";
}

function gitter(){
    const g = el.querySelector("#eeGitter"), n = zustand.bis;
    let html = `<div class="ee-z ecke">·</div>`;
    for (let b = 1; b <= n; b++) html += `<div class="ee-z kopf" data-kopf="${b}">${b}</div>`;
    for (let a = 1; a <= n; a++){
        html += `<div class="ee-z kopf" data-kopf="${a}">${a}</div>`;
        for (let b = 1; b <= n; b++) html += `<div class="ee-z" data-a="${a}" data-b="${b}">${a * b}</div>`;
    }
    g.innerHTML = html;
    markieren();
}

function markieren(){
    const { wahl, reihe } = zustand;
    el.querySelectorAll("#eeGitter .ee-z").forEach(z => {
        const a = +z.dataset.a, b = +z.dataset.b, k = z.dataset.kopf ? +z.dataset.kopf : null;
        z.classList.remove("wahl", "reihe", "weg", "kern", "quadrat", "gedimmt", "zu", "geschafft");
        if (k != null){
            if ((reihe && k === reihe) || (wahl && (k === wahl[0] || k === wahl[1]))) z.classList.add("reihe");
            return;
        }
        if (!a) return;
        if (zustand.zu.has(key(a, b))) z.classList.add("zu");
        if (zustand.geschafft.has(key(a, b))) z.classList.add("geschafft");
        if (zustand.kern && (KERN.includes(a) || KERN.includes(b))) z.classList.add("kern");
        if (zustand.quadrat && a === b) z.classList.add("quadrat");
        if (reihe){ if (a === reihe || b === reihe) z.classList.add("reihe"); else z.classList.add("gedimmt"); }
        if (wahl){
            if (a === wahl[0] && b === wahl[1]) z.classList.add("wahl");
            else if ((a === wahl[0] && b < wahl[1]) || (b === wahl[1] && a < wahl[0])) z.classList.add("weg");
        }
    });
    el.querySelectorAll(".ee-leiste [data-a]").forEach(k => {
        const a = k.dataset.a;
        k.classList.toggle("an", (a === zustand.modus) || (a === "kern" && zustand.kern) || (a === "quadrat" && zustand.quadrat));
    });
    el.querySelectorAll("#eeMenue [data-wahl]").forEach(r => r.querySelectorAll("button").forEach(b => {
        const w = r.dataset.wahl;
        b.classList.toggle("an", w === "bis" ? +b.dataset.w === zustand.bis : w === "gegner" ? (window.tbGegner && window.tbGegner() === b.dataset.w) : (b.dataset.w === "gruen") === el.classList.contains("gruen"));
    }));
    panel();
}

function punktfeld(a, b){
    const schmal = window.innerWidth < 700;
    const gr = Math.max(8, Math.min(schmal ? 18 : 26, Math.floor((schmal ? 200 : 260) / Math.max(a, b))));
    const luecke = Math.round(gr * .7), abstand = Math.max(3, Math.round(gr * .22));
    let html = `<div class="ee-punktfeld" style="display:flex; flex-direction:column; gap:${abstand}px;">`;
    for (let i = 0; i < a; i++){
        if (i === 5) html += `<div style="height:${luecke - abstand}px;"></div>`;
        html += `<div style="display:flex; gap:${abstand}px; justify-content:center;">`;
        for (let j = 0; j < b; j++) html += (j === 5 ? `<span style="width:${luecke - abstand}px; flex:none;"></span>` : "") + `<i class="${i >= 5 ? "r5" : ""}" style="width:${gr}px; height:${gr}px; flex:none;"></i>`;
        html += "</div>";
    }
    return html + "</div>";
}
function trick(a, b){
    if (KERN.includes(a)) return `<b>${a} · ${b}</b> ist eine <b>Kernaufgabe</b> ⭐`;
    if (KERN.includes(b)) return `Tausche: <b>${b} · ${a}</b> ist eine <b>Kernaufgabe</b> ⭐`;
    if (a === 9) return `${a} · ${b} = 10 · ${b} − 1 · ${b} = ${10 * b} − ${b}`;
    if (a === 8) return `${a} · ${b} = 10 · ${b} − 2 · ${b} = ${10 * b} − ${2 * b}`;
    if (a >= 6) return `${a} · ${b} = 5 · ${b} + ${a - 5} · ${b} = ${5 * b} + ${(a - 5) * b}`;
    if (a === 4) return `${a} · ${b} = 2 · ${b} + 2 · ${b} = ${2 * b} + ${2 * b} (verdoppeln)`;
    return `${a} · ${b} = 2 · ${b} + 1 · ${b} = ${2 * b} + ${b}`;
}

function panel(){
    const p = el.querySelector("#eePanel"), { wahl, reihe } = zustand;
    if (wahl){
        const [a, b] = wahl, zu = zustand.zu.has(key(a, b));
        p.innerHTML = `
            <div class="ee-aufgabe">${a} · ${b} = <span class="erg${zu ? " zu" : ""}" data-aufdecken="1">${a * b}</span></div>
            ${zu ? `<div class="ee-zeile"><small>Tippe auf das Feld, um aufzudecken</small></div>` : `
            <div class="ee-zeile"><small>Tauschaufgabe</small>${b} · ${a} = ${a * b}</div>
            <div class="ee-zeile ee-trick"><small>So kannst du rechnen</small>${trick(a, b)}</div>`}
            <div class="ee-zeile"><small>${a} Reihen mit je ${b} Punkten</small></div>
            ${punktfeld(a, b)}`;
        return;
    }
    if (reihe){
        const zeilen = [...Array(zustand.bis).keys()].map(i => {
            const k = i + 1, zu = zustand.zu.has(key(k, reihe));
            return `<div data-a="${k}" data-b="${reihe}"><span>${k} · ${reihe}</span><b class="${zu ? "zu" : ""}">${k * reihe}</b></div>`;
        }).join("");
        p.innerHTML = `<div class="ee-aufgabe" style="font-size:clamp(34px,6vmin,80px);">Die ${reihe}er-Reihe</div><div class="ee-liste">${zeilen}</div>
            <div class="ee-leer">Die Reihe steht in der Tabelle zweimal: als Zeile und als Spalte. Tippe noch einmal auf die ${reihe}, um alles wieder zu zeigen.</div>`;
        return;
    }
    p.innerHTML = `<div class="ee-aufgabe" style="font-size:clamp(34px,6vmin,80px);">Das kleine 1 × 1</div>
        <div class="ee-leer"><b>Tippe auf ein Feld:</b> Die Aufgabe erscheint groß – mit Tauschaufgabe, Rechentrick und Punktefeld.<br><br>
        <b>Tippe auf eine Zahl am Rand:</b> Die ganze Reihe leuchtet auf.<br><br>
        <b>Verdecken</b> oder <b>Lücken</b>: Die Kinder rechnen, dann wird angetippt und aufgedeckt.<br><br>
        <b>Blitzrechnen</b>: ${(window.tbSeiten ? window.tbSeiten()[2] : "Klasse gegen Ella")} – richtig gelöste Aufgaben bekommen ein ✓ in der Tabelle.</div>`;
}

function blitzNeu(){
    const n = zustand.bis, pool = [];
    for (let a = 1; a <= n; a++) for (let b = 1; b <= n; b++){
        if (zustand.reihe && a !== zustand.reihe && b !== zustand.reihe) continue;
        if (!zustand.reihe && (a === 1 || b === 1) && Math.random() < 0.8) continue;   // ×1 selten
        pool.push([a, b]);
    }
    const offen = pool.filter(([a, b]) => !zustand.geschafft.has(key(a, b)));
    const liste = offen.length ? offen : pool;
    let x;
    do { x = liste[Math.floor(Math.random() * liste.length)]; } while (liste.length > 1 && zustand.blitz && x[0] === zustand.blitz[0] && x[1] === zustand.blitz[1]);
    zustand.blitz = x;
    blitzZeigen(false);
}
function blitzZeigen(loesung){
    const [sa, sb] = window.tbSeiten ? window.tbSeiten() : ["Klasse", "🦉 Ella"];
    const [a, b] = zustand.blitz, box = el.querySelector("#eeBlitz .ee-blitz-box");
    const offen = (() => { let n = 0; for (let i = 1; i <= zustand.bis; i++) for (let j = 1; j <= zustand.bis; j++) if ((!zustand.reihe || i === zustand.reihe || j === zustand.reihe) && !zustand.geschafft.has(key(i, j))) n++; return n; })();
    box.innerHTML = `<div class="frage">${a} · ${b} = <span class="erg">${loesung ? a * b : "?"}</span></div>
        <div class="knoepfe">${loesung
            ? `<button class="k" data-blitz="klasse">✓ Punkt für ${sa === "Klasse" ? "die Klasse" : sa}</button><button class="e" data-blitz="ella">Punkt für ${sb === "Lehrkraft" ? "die Lehrkraft" : sb}</button>`
            : `<button class="l" data-blitz="loesung">Lösung zeigen</button>`}
            <button data-blitz="ende">Beenden</button></div>
        <div class="info">${zustand.reihe ? `Nur die ${zustand.reihe}er-Reihe · ` : ""}noch ${offen} Aufgaben ohne ✓ · ${sa} ${zustand.punkte.k} : ${zustand.punkte.e} ${sb}</div>`;
    el.querySelector("#eeBlitz").classList.add("an");
}

function klick(e){
    const t = e.target.closest("[data-a],[data-kopf],[data-blitz],[data-w],[data-aufdecken]");
    if (!t){ el.querySelector("#eeMenue").classList.remove("an"); return; }
    if (t.dataset.blitz){
        const w = t.dataset.blitz;
        if (w === "loesung") return blitzZeigen(true);
        if (w === "klasse" || w === "ella"){
            zustand.punkte[w === "klasse" ? "k" : "e"]++;
            if (w === "klasse") zustand.geschafft.add(key(...zustand.blitz));
            punkteZeigen(); markieren(); return blitzNeu();
        }
        el.querySelector("#eeBlitz").classList.remove("an"); return;
    }
    if (t.dataset.w){
        const r = t.closest("[data-wahl]").dataset.wahl;
        if (r === "gegner"){ window.tbGegner && window.tbGegner(t.dataset.w); punkteZeigen(); markieren(); return; }
        if (r === "bis"){ zustand.bis = +t.dataset.w; zustand.wahl = zustand.reihe = null; if (zustand.modus === "verdecken") alleZu(); gitter(); groesse(); }
        else { el.classList.toggle("gruen", t.dataset.w === "gruen"); markieren(); }
        return;
    }
    if (t.dataset.aufdecken){ if (zustand.wahl){ zustand.zu.delete(key(...zustand.wahl)); markieren(); } return; }
    if (t.dataset.kopf){
        const k = +t.dataset.kopf;
        zustand.wahl = null;
        zustand.reihe = zustand.reihe === k ? null : k;
        return markieren();
    }
    const a = t.dataset.a;
    if (t.dataset.b){                       // Feld in der Tabelle oder Zeile in der Reihen-Liste
        const x = +a, y = +t.dataset.b, k = key(x, y);
        if (zustand.zu.has(k)){ zustand.zu.delete(k); if (!t.closest(".ee-liste")) zustand.wahl = [x, y]; return markieren(); }   // erst aufdecken
        if (!t.closest(".ee-liste")) zustand.wahl = (zustand.wahl && zustand.wahl[0] === x && zustand.wahl[1] === y) ? null : [x, y];
        return markieren();
    }
    if (a === "zu") return schliessen();
    if (a === "voll") return (window.vollbild ? window.vollbild() : null);
    if (a === "menue") return el.querySelector("#eeMenue").classList.toggle("an");
    if (a === "zeigen"){ zustand.modus = "zeigen"; zustand.zu.clear(); return markieren(); }
    if (a === "verdecken"){ zustand.modus = "verdecken"; alleZu(); return markieren(); }
    if (a === "luecken"){
        zustand.modus = "luecken"; zustand.zu.clear();
        const n = zustand.bis, alle = [];
        for (let i = 1; i <= n; i++) for (let j = 1; j <= n; j++) alle.push(key(i, j));
        alle.sort(() => Math.random() - .5).slice(0, Math.round(alle.length * 0.3)).forEach(k => zustand.zu.add(k));
        return markieren();
    }
    if (a === "kern"){ zustand.kern = !zustand.kern; return markieren(); }
    if (a === "quadrat"){ zustand.quadrat = !zustand.quadrat; return markieren(); }
    if (a === "blitz"){ el.querySelector("#eePunkte").classList.add("an"); punkteZeigen(); return blitzNeu(); }
    if (a === "neu"){ zustand.geschafft.clear(); zustand.punkte = { k: 0, e: 0 }; punkteZeigen(); el.querySelector("#eeMenue").classList.remove("an"); return markieren(); }
}
function alleZu(){ zustand.zu.clear(); for (let i = 1; i <= zustand.bis; i++) for (let j = 1; j <= zustand.bis; j++) zustand.zu.add(key(i, j)); }
function punkteZeigen(){ if (window.tbSeiten){ const [sa, sb] = window.tbSeiten(); el.querySelector("#eeNa").textContent = sa; el.querySelector("#eeNb").textContent = sb; } el.querySelector("#eePk").textContent = zustand.punkte.k; el.querySelector("#eePe").textContent = zustand.punkte.e; }

// eingebettet = Teil der Einmaleins-Tafel (tafel-1x1.js): eigene Reiterleiste, Schließen schließt alles
let eingebettet = false;
function oeffnen(opt){
    aufbauen();
    eingebettet = !!(opt && opt.tabs);
    let tabs = el.querySelector(".ew-tabs");
    if (eingebettet){
        if (!tabs){ tabs = document.createElement("div"); tabs.className = "ew-tabs"; el.querySelector(".ee-leiste").after(tabs);
            tabs.addEventListener("click", ev => { const b = ev.target.closest("[data-tab]"); if (b && b.dataset.tab !== "tabelle"){ ev.stopPropagation(); el.classList.remove("an"); window.tafel1x1.oeffnen(b.dataset.tab); } }); }
        tabs.innerHTML = opt.tabs;
        el.querySelector(".ee-titel").textContent = "Einmaleins";
    } else if (tabs) tabs.remove();
    el.classList.add("an");
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "none";
    if (!eingebettet) history.replaceState(null, "", "#einmaleins");
    gitter();
    requestAnimationFrame(groesse);
}
function schliessen(){
    el.classList.remove("an");
    if (eingebettet && window.tafel1x1){ eingebettet = false; return window.tafel1x1.schliessen(); }
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "";
    history.replaceState(null, "", location.pathname);
}
function verstecken(){ if (el) el.classList.remove("an"); }
window.tafelEinmaleins = { oeffnen, schliessen, verstecken };
// alte Adresse #einmaleins: öffnet die Einmaleins-Tafel mit der Tabelle
document.addEventListener("DOMContentLoaded", () => { if (location.hash === "#einmaleins") { if (window.tafel1x1) window.tafel1x1.oeffnen("tabelle"); else oeffnen(); } });
})();
