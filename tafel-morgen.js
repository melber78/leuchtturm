/* ============================================================
   Leuchtturm – Tafelbild „Guten Morgen!“ (Stundenanfang)
   Alles Wichtige für den Tag auf einen Blick: Begrüßung, Datum,
   Wetter, Stundenplan (Fach + Lehrkraft), was auspacken, was beachten.
   Klassenstufengerecht: Kl. 1/2 mit großen Bildern und wenig Text,
   Kl. 3/4 mit Uhrzeiten, vollem Datum und Temperaturen.
   Daten (Klassen, Stundenplan, Material, Hinweise) werden über
   tafelbilder-speichern.php im Leuchtturm gespeichert.
   ============================================================ */
"use strict";
(function () {

const FAECHER = {
    deutsch:   { n: "Deutsch", e: "📖", f: "#e2574c", m: ["fibel", "heft", "federtasche"] },
    mathe:     { n: "Mathe", e: "🔢", f: "#3d7ea6", m: ["mathebuch", "heft", "federtasche", "lineal"] },
    sachunterricht: { n: "Sachunterricht", e: "🌱", f: "#3f9a5a", m: ["hefter", "federtasche"] },
    englisch:  { n: "Englisch", e: "🇬🇧", f: "#6c5ce7", m: ["heft", "federtasche"] },
    kunst:     { n: "Kunst", e: "🎨", f: "#e67e22", m: ["malkasten", "schere", "kleber", "federtasche"] },
    musik:     { n: "Musik", e: "🎵", f: "#c0398b", m: ["hefter"] },
    sport:     { n: "Sport", e: "⚽", f: "#16a085", m: ["sportbeutel", "trinkflasche"] },
    religion:  { n: "Religion", e: "🕊️", f: "#8e7cc3", m: ["hefter"] },
    ethik:     { n: "Ethik", e: "🤝", f: "#8e7cc3", m: ["hefter"] },
    werken:    { n: "Werken", e: "🔨", f: "#a0522d", m: ["schere", "kleber"] },
    lernangebot: { n: "Lernzeit", e: "🦉", f: "#2f6b50", m: ["federtasche"] },
    sozial:    { n: "Sozialtraining", e: "💛", f: "#d4a017", m: [] },
    foerder:   { n: "Förderunterricht", e: "⭐", f: "#5b8def", m: ["federtasche"] },
    lesen:     { n: "Lesezeit", e: "📚", f: "#b5651d", m: ["lesebuch"] },
    wochenplan: { n: "Wochenplan", e: "🗂️", f: "#607d8b", m: ["wochenplan", "federtasche"] },
    schwimmen: { n: "Schwimmen", e: "🏊", f: "#0097a7", m: ["schwimmsachen"] },
    klassenrat: { n: "Klassenrat", e: "🗣️", f: "#795548", m: [] },
    ausflug:   { n: "Ausflug", e: "🚌", f: "#ef6c00", m: ["trinkflasche", "fruehstueck"] },
    frei:      { n: "frei", e: "🏠", f: "#9aa5ad", m: [] },
};
const MATERIAL = {
    federtasche: ["✏️", "Federtasche"], heft: ["📒", "Heft"], fibel: ["📗", "Fibel"], lesebuch: ["📖", "Lesebuch"], mathebuch: ["📘", "Mathebuch"],
    arbeitsheft: ["📓", "Arbeitsheft"], hefter: ["🗂️", "Hefter"], hausaufgabenheft: ["📔", "Hausaufgabenheft"], wochenplan: ["📋", "Wochenplan"],
    lineal: ["📏", "Lineal"], schere: ["✂️", "Schere"], kleber: ["🧴", "Kleber"], malkasten: ["🎨", "Malkasten"], buntstifte: ["🖍️", "Buntstifte"],
    sportbeutel: ["🎽", "Sportbeutel"], schwimmsachen: ["🩱", "Schwimmsachen"], trinkflasche: ["🥤", "Trinkflasche"], fruehstueck: ["🍎", "Frühstück"],
    floete: ["🎶", "Flöte"], tablet: ["📱", "Tablet"], woerterbuch: ["📕", "Wörterbuch"],
};
const WETTER = {
    sonnig: ["☀️", "sonnig"], heiter: ["🌤️", "heiter"], wolkig: ["⛅", "wolkig"], bedeckt: ["☁️", "bewölkt"], nebel: ["🌫️", "neblig"],
    niesel: ["🌦️", "Nieselregen"], regen: ["🌧️", "Regen"], schnee: ["❄️", "Schnee"], gewitter: ["⛈️", "Gewitter"], wind: ["🌬️", "windig"],
};
// Buchstabe der Woche: Anlautbild (Bild + Wort)
const ANLAUT = { a: ["🐒", "Affe"], b: ["🍌", "Banane"], c: ["🤡", "Clown"], d: ["🦖", "Dino"], e: ["🦆", "Ente"], f: ["🐟", "Fisch"], g: ["🦒", "Giraffe"], h: ["🐇", "Hase"],
    i: ["🦔", "Igel"], j: ["🧥", "Jacke"], k: ["🐈", "Katze"], l: ["🦁", "Löwe"], m: ["🐭", "Maus"], n: ["👃", "Nase"], o: ["👂", "Ohr"], p: ["🐧", "Pinguin"], q: ["🪼", "Qualle"], qu: ["🪼", "Qualle"],
    r: ["🌹", "Rose"], s: ["☀️", "Sonne"], t: ["🍅", "Tomate"], u: ["🦉", "Uhu"], v: ["🐦", "Vogel"], w: ["🐋", "Wal"], x: ["🎷", "Saxofon"], y: ["🧘", "Yoga"], z: ["🦓", "Zebra"],
    "ä": ["🍏", "Äpfel"], "ö": ["🛢️", "Öl"], "ü": ["🎁", "Überraschung"], "ß": ["⚽", "Fußball"], au: ["🚗", "Auto"], ei: ["🥚", "Ei"], eu: ["🦉", "Eule"], ie: ["🐝", "Biene"],
    sch: ["🐑", "Schaf"], ch: ["🐉", "Drache"], sp: ["🕷️", "Spinne"], st: ["⭐", "Stern"], pf: ["🐴", "Pferd"], ck: ["🔔", "Glocke"], ng: ["💍", "Ring"], nk: ["🏦", "Bank"] };
const grossK = b => b === "ß" ? "" : b.charAt(0).toUpperCase() + b.slice(1);
// Wort mit hervorgehobenem Buchstaben
function wortMarkiert(wort, b){ const i = wort.toLowerCase().indexOf(b); return i < 0 ? esc(wort) : esc(wort.slice(0, i)) + `<em>${esc(wort.slice(i, i + b.length))}</em>` + esc(wort.slice(i + b.length)); }
const HINWEIS_ICONS = ["📢", "⚠️", "🎂", "✉️", "📝", "🏃", "🍎", "🎉", "🧑‍🏫", "🏫", "🚌", "⏰", "💡", "❤️"];
const TAGE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const TAGE_FARBE = ["#e2574c", "#3d7ea6", "#e67e22", "#3f9a5a", "#8e44ad", "#d4a017", "#e2574c"];
const MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const JAHRESZEIT = m => m <= 1 || m === 11 ? ["⛄", "Winter"] : m <= 4 ? ["🌷", "Frühling"] : m <= 7 ? ["🌻", "Sommer"] : ["🍂", "Herbst"];
const ZEITEN = [["07:45", "08:30"], ["08:35", "09:20"], ["09:40", "10:25"], ["10:30", "11:15"], ["11:35", "12:20"], ["12:25", "13:10"]];

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const neueId = () => Math.random().toString(36).slice(2, 9);
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
function kw(d){ const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); const tag = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - tag); const j = new Date(Date.UTC(t.getUTCFullYear(), 0, 1)); return Math.ceil(((t - j) / 864e5 + 1) / 7); }

function neueKlasse(name, stufe){
    return { id: neueId(), name: name || "1a", stufe: stufe || "12", lehrkraft: "", gruss: "", ort: { name: "Weißenfels", lat: 51.2, lon: 11.97 },
        zeiten: ZEITEN.map(z => z.slice()), pausen: [{ nach: 2, name: "Frühstück & Hofpause", e: "🍎" }, { nach: 4, name: "Hofpause", e: "🛝" }],
        plan: { 1: [], 2: [], 3: [], 4: [], 5: [] }, material: {}, extra: {}, hinweise: [] };
}
let D = window.TAFEL_DATEN && window.TAFEL_DATEN.morgen;
if (!D || !Array.isArray(D.klassen) || !D.klassen.length) {
    try { D = JSON.parse(localStorage.getItem("tb_morgen") || "null"); } catch (x) { D = null; }
}
if (!D || !Array.isArray(D.klassen) || !D.klassen.length) { const k = neueKlasse("1a", "12"); k.beispiel = true;
    k.plan = { 1: [{ f: "deutsch", l: "" }, { f: "mathe", l: "" }, { f: "sachunterricht", l: "" }, { f: "sport", l: "" }], 2: [{ f: "mathe", l: "" }, { f: "deutsch", l: "" }, { f: "kunst", l: "" }, { f: "kunst", l: "" }], 3: [{ f: "deutsch", l: "" }, { f: "mathe", l: "" }, { f: "musik", l: "" }, { f: "lernangebot", l: "" }], 4: [{ f: "mathe", l: "" }, { f: "deutsch", l: "" }, { f: "englisch", l: "" }, { f: "sport", l: "" }], 5: [{ f: "deutsch", l: "" }, { f: "mathe", l: "" }, { f: "religion", l: "" }] };
    D = { klassen: [k], aktiv: k.id }; }
let tagVersatz = 0, wetterLive = null, abgehakt = {};
const klasse = () => D.klassen.find(k => k.id === D.aktiv) || D.klassen[0];
const tag = () => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + tagVersatz); return d; };

/* ---------- Speichern ---------- */
let speicherTimer = null;
function speichern(){
    try { localStorage.setItem("tb_morgen", JSON.stringify(D)); } catch (x) {}
    clearTimeout(speicherTimer);
    speicherTimer = setTimeout(async () => {
        const st = document.getElementById("mgStatus");
        try {
            const r = await fetch("tafelbilder-speichern.php", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json", "X-CSRF": window.TAFEL_CSRF || "" }, body: JSON.stringify({ bild: "morgen", daten: D }) });
            const j = await r.json();
            if (st) st.textContent = j.ok ? "✓ gespeichert" : "⚠ " + (j.fehler || "nicht gespeichert");
        } catch (x) { if (st) st.textContent = "⚠ offline – nur auf diesem Gerät gespeichert"; }
    }, 600);
}

/* ---------- Wetter (Open-Meteo, ohne Anmeldung) ---------- */
function wetterAusCode(c){
    if (c === 0) return "sonnig"; if (c === 1) return "heiter"; if (c === 2) return "wolkig"; if (c === 3) return "bedeckt";
    if (c === 45 || c === 48) return "nebel"; if (c >= 51 && c <= 57) return "niesel"; if ((c >= 61 && c <= 67) || (c >= 80 && c <= 82)) return "regen";
    if ((c >= 71 && c <= 77) || c === 85 || c === 86) return "schnee"; if (c >= 95) return "gewitter"; return "wolkig";
}
async function wetterLaden(){
    const k = klasse(), o = k.ort || {};
    if (!o.lat || tagVersatz < -1 || tagVersatz > 6) { wetterLive = null; return; }
    try {
        const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${o.lat}&longitude=${o.lon}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FBerlin&forecast_days=8`);
        const j = await r.json();
        const i = Math.max(0, tagVersatz);
        wetterLive = { art: tagVersatz === 0 && j.current ? wetterAusCode(j.current.weather_code) : wetterAusCode(j.daily.weather_code[i]),
            jetzt: tagVersatz === 0 && j.current ? Math.round(j.current.temperature_2m) : null, wind: j.current ? j.current.wind_speed_10m : 0,
            max: Math.round(j.daily.temperature_2m_max[i]), min: Math.round(j.daily.temperature_2m_min[i]), regen: j.daily.precipitation_probability_max ? j.daily.precipitation_probability_max[i] : null };
        if (wetterLive.wind >= 35 && ["sonnig", "heiter", "wolkig", "bedeckt"].includes(wetterLive.art)) wetterLive.art = "wind";
    } catch (x) { wetterLive = null; }
    zeichnen();
}
function wetterHeute(){
    const k = klasse(), manuell = (k.wetterManuell || {})[iso(tag())];
    if (manuell) return Object.assign({}, wetterLive || {}, { art: manuell, manuell: true });
    return wetterLive;
}
function kleidung(w){
    if (!w) return null;
    const t = w.jetzt != null ? w.jetzt : w.max;
    if (["regen", "niesel", "gewitter"].includes(w.art) || (w.regen != null && w.regen >= 60)) return ["☂️", "Regenjacke"];
    if (w.art === "schnee" || (t != null && t <= 3)) return ["🧤", "Mütze & Handschuhe"];
    if (t != null && t <= 12) return ["🧥", "Jacke anziehen"];
    if (t != null && t >= 25) return ["🧢", "Sonnenschutz & viel trinken"];
    return null;
}

/* ---------- Anzeige ---------- */
function stundenHeute(k, d){
    const wt = d.getDay(); if (wt === 0 || wt === 6) return [];
    return (k.plan[wt] || []).map((s, i) => Object.assign({ nr: i + 1, von: (k.zeiten[i] || [])[0] || "", bis: (k.zeiten[i] || [])[1] || "" }, s)).filter(s => s.f);
}
function jetztNr(k, d){
    if (tagVersatz !== 0) return 0;
    const n = new Date(), hm = String(n.getHours()).padStart(2, "0") + ":" + String(n.getMinutes()).padStart(2, "0");
    const st = stundenHeute(k, d);
    const s = st.find(x => x.von && x.bis && hm >= x.von && hm <= x.bis) || st.find(x => x.von && hm < x.von);
    return s ? s.nr : 0;
}
function materialHeute(k, d){
    const set = [];
    stundenHeute(k, d).forEach(s => { const liste = k.material[s.f] || (FAECHER[s.f] || {}).m || []; liste.forEach(m => { if (!set.includes(m)) set.push(m); }); });
    (k.extra[d.getDay()] || []).forEach(m => { if (!set.includes(m)) set.push(m); });
    return set.filter(m => MATERIAL[m]);
}
function hinweiseHeute(k, d){
    const t = iso(d), wt = String(d.getDay());
    return (k.hinweise || []).filter(h => h.wann === "immer" || h.wann === t || h.wann === "wt" + wt);
}
function gruss(k){
    if (k.gruss) return k.gruss;
    const h = new Date().getHours();
    return (tagVersatz !== 0 || h < 11 ? "Guten Morgen" : h < 17 ? "Hallo" : "Guten Abend") + ", liebe Klasse " + k.name + "!";
}

function zeichnen(){
    const wurzel = document.getElementById("morgen"); if (!wurzel || !wurzel.classList.contains("an")) return;
    const k = klasse(), d = tag(), klein = k.stufe === "12", wt = d.getDay();
    wurzel.classList.toggle("klein", klein);
    const st = stundenHeute(k, d), jetzt = jetztNr(k, d), mat = materialHeute(k, d), hin = hinweiseHeute(k, d);
    const w = wetterHeute(), wi = w ? WETTER[w.art] : null, kl = kleidung(w), jz = JAHRESZEIT(d.getMonth());
    const pausen = k.pausen || [];
    const wochenende = wt === 0 || wt === 6;
    const istHeute = tagVersatz === 0;
    document.getElementById("mgInhalt").innerHTML = `
    <div class="mg-gruss"><span class="mg-sonne">${wochenende ? "🎈" : "☀️"}</span><h1>${esc(gruss(k))}</h1><div class="mg-uhr" id="mgUhr"></div></div>
    <div class="mg-raster">
      <div class="mg-spalte">
        <section class="mg-karte mg-datum" style="--tf:${TAGE_FARBE[wt]}">
          <div class="mg-kopfzeile"><button class="mg-pfeil" data-tag="-1" title="Tag zurück">‹</button><h2>${istHeute ? "Heute ist" : tagVersatz === 1 ? "Morgen ist" : tagVersatz === -1 ? "Gestern war" : "Am"}</h2><button class="mg-pfeil" data-tag="1" title="Tag vor">›</button></div>
          <div class="mg-wtag">${TAGE[wt]}</div>
          <div class="mg-tagzahl"><b>${d.getDate()}.</b> <span>${MONATE[d.getMonth()]}${klein ? "" : " " + d.getFullYear()}</span></div>
          ${klein ? `<div class="mg-woche">${[1, 2, 3, 4, 5].map(i => `<span class="${i === wt ? "an" : ""}" style="--tf:${TAGE_FARBE[i]}">${TAGE[i].slice(0, 2)}</span>`).join("")}</div>${k.buchstabe ? "" : `<div class="mg-jz"><span>${jz[0]}</span>${jz[1]}</div>`}`
                  : `<div class="mg-info">${jz[0]} ${jz[1]} · Kalenderwoche ${kw(d)}</div>`}
          ${!istHeute ? `<button class="mg-heute" data-tag="0">↺ zurück zu heute</button>` : ""}
        </section>
        ${k.buchstabe ? (() => { const b = k.buchstabe.toLowerCase(), an = ANLAUT[b];
            return `<section class="mg-karte mg-bdw" data-bdw="${esc(b)}" title="Im Buchstabenkurs öffnen">
            <h2>Buchstabe der Woche</h2>
            <div class="mg-bdw-reihe"><div class="mg-bdw-b ${b.length > 1 ? "lang" : ""}">${esc(grossK(b))}<span>${esc(b)}</span></div>
            ${an ? `<div class="mg-bdw-bild"><span>${an[0]}</span><b>${wortMarkiert(an[1], b)}</b></div>` : ""}</div></section>`; })() : ""}
        <section class="mg-karte mg-wetter ${k.buchstabe ? "kompakt" : ""}" data-wetter>
          <h2>Das Wetter</h2>
          ${wi ? `<div class="mg-wbild">${wi[0]}</div><div class="mg-wtext">${esc(wi[1])}${w.jetzt != null && !klein ? ` · ${w.jetzt} °C` : ""}</div>
            ${w.max != null ? `<div class="mg-temp">${klein ? `🌡️ ${w.jetzt != null ? w.jetzt : w.max} Grad` : `↓ ${w.min} °C &nbsp; ↑ ${w.max} °C`}</div>` : ""}
            ${kl ? `<div class="mg-kleidung">${kl[0]} ${kl[1]}</div>` : ""}`
               : `<div class="mg-wbild">❔</div><div class="mg-wtext">Wie ist das Wetter?</div><div class="mg-tipp">antippen und auswählen</div>`}
        </section>
      </div>
      <section class="mg-karte mg-plan">
        <h2>${klein ? "Unser Tag" : "Stundenplan"}</h2>
        ${wochenende ? `<div class="mg-leer">🎈 Heute ist keine Schule.<br>Schönes Wochenende!</div>` : !st.length ? `<div class="mg-leer">Für ${TAGE[wt]} ist noch kein Stundenplan eingetragen.<br><button class="mg-k" data-bearbeiten="plan">✏️ Stundenplan eintragen</button></div>` :
          `<ol class="mg-stunden">${st.map((s, i) => { const f = FAECHER[s.f] || { n: s.f, e: "📌", f: "#888" };
            const pause = pausen.find(p => +p.nach === s.nr && st.some(x => x.nr > s.nr));
            return `<li class="${s.nr === jetzt ? "jetzt" : ""} ${istHeute && jetzt && s.nr < jetzt ? "vorbei" : ""}" style="--ff:${f.f}">
              <span class="mg-nr">${s.nr}</span><span class="mg-fe">${f.e}</span>
              <span class="mg-fach"><b>${esc(s.n || f.n)}</b>${s.l ? `<small>${esc(s.l)}</small>` : ""}</span>
              ${!klein && s.von ? `<span class="mg-zeit">${esc(s.von)}–${esc(s.bis)}</span>` : ""}
              ${s.nr === jetzt ? `<span class="mg-jetzt">${klein ? "👉" : "jetzt"}</span>` : ""}</li>` +
              (pause ? `<li class="mg-pause"><span>${esc(pause.e || "🛝")}</span> ${esc(pause.name)}${!klein && k.zeiten[s.nr - 1] && k.zeiten[s.nr] ? ` <small>${esc(k.zeiten[s.nr - 1][1])}–${esc(k.zeiten[s.nr][0])}</small>` : ""}</li>` : ""); }).join("")}</ol>`}
      </section>
      <div class="mg-spalte">
        <section class="mg-karte mg-pack">
          <h2>${klein ? "Das brauche ich heute" : "Bitte auspacken"}</h2>
          ${mat.length ? `<div class="mg-dinge ${mat.length > 9 ? "sehr-viele" : mat.length > 6 ? "viele" : ""}">${mat.map(m => `<button class="mg-ding ${abgehakt[m] ? "ok" : ""}" data-ding="${m}"><span>${MATERIAL[m][0]}</span><b>${esc(MATERIAL[m][1])}</b></button>`).join("")}</div>` : `<div class="mg-leer klein">–</div>`}
        </section>
        <section class="mg-karte mg-achtung">
          <h2>${klein ? "Denk daran!" : "Heute beachten"}</h2>
          ${hin.length ? `<ul class="mg-hinweise">${hin.map(h => `<li><span>${esc(h.e || "📢")}</span>${esc(h.t)}</li>`).join("")}</ul>` : `<div class="mg-leer klein">Heute nichts Besonderes 🙂</div>`}
        </section>
      </div>
    </div>`;
    uhr();
}
function uhr(){
    const el = document.getElementById("mgUhr"); if (!el) return;
    const n = new Date();
    el.textContent = String(n.getHours()).padStart(2, "0") + ":" + String(n.getMinutes()).padStart(2, "0");
}

/* ---------- Bedienung auf der Tafel ---------- */
function klick(ev){
    const t = ev.target.closest("[data-tag],[data-wetter],[data-ding],[data-bearbeiten],[data-bdw]"); if (!t) return;
    if (t.dataset.bdw) { if (window.kursMitBuchstabe) window.kursMitBuchstabe(t.dataset.bdw); return; }
    if (t.dataset.tag !== undefined) { tagVersatz = t.dataset.tag === "0" ? 0 : tagVersatz + +t.dataset.tag; abgehakt = {}; wetterLive = null; zeichnen(); wetterLaden(); return; }
    if (t.dataset.ding) { abgehakt[t.dataset.ding] = !abgehakt[t.dataset.ding]; t.classList.toggle("ok"); return; }
    if (t.dataset.bearbeiten) { bearbeiten(t.dataset.bearbeiten); return; }
    if (t.hasAttribute("data-wetter")) wetterWahl();
}
function wetterWahl(){
    const k = klasse(), heute = iso(tag());
    const o = overlay(`<h2>Wie ist das Wetter?</h2><div class="mg-wwahl">${Object.entries(WETTER).map(([key, [e, n]]) => `<button data-w="${key}"><span>${e}</span>${n}</button>`).join("")}</div>
        <div class="mg-reihe"><button class="mg-k hell" data-w="">🔄 automatisch (Wetterdienst)</button><button class="mg-k hell" data-zu>Schließen</button></div>`);
    o.querySelectorAll("[data-w]").forEach(b => b.addEventListener("click", () => {
        k.wetterManuell = k.wetterManuell || {};
        if (b.dataset.w) k.wetterManuell[heute] = b.dataset.w; else delete k.wetterManuell[heute];
        Object.keys(k.wetterManuell).forEach(x => { if (x < iso(new Date(Date.now() - 7 * 864e5))) delete k.wetterManuell[x]; });
        speichern(); o.remove(); zeichnen();
    }));
}
function overlay(html){
    const o = document.createElement("div"); o.className = "mg-overlay";
    o.innerHTML = `<div class="mg-dialog">${html}</div>`;
    o.addEventListener("click", ev => { if (ev.target === o || ev.target.closest("[data-zu]")) o.remove(); });
    document.getElementById("morgen").appendChild(o);
    return o;
}

/* ---------- Bearbeiten ---------- */
let reiter = "klasse";
function bearbeiten(r){
    if (r) reiter = r;
    const p = document.getElementById("mgEditor"); p.classList.add("an");
    const k = klasse();
    const R = { klasse: "🏫 Klasse", plan: "🗓️ Stundenplan", material: "🎒 Auspacken", hinweise: "📢 Hinweise" };
    const fachOpt = sel => `<option value="">–</option>` + Object.entries(FAECHER).map(([key, f]) => `<option value="${key}" ${key === sel ? "selected" : ""}>${f.e} ${esc(f.n)}</option>`).join("");
    let html = `<div class="mg-ed-kopf"><div class="mg-reiter">${Object.entries(R).map(([key, n]) => `<button class="${key === reiter ? "an" : ""}" data-reiter="${key}">${n}</button>`).join("")}</div>
        <span id="mgStatus" class="mg-status"></span><button class="mg-k" data-schliessen>✓ Fertig</button></div><div class="mg-ed-inhalt">`;
    if (reiter === "klasse") {
        html += `<label>Klasse</label><div class="mg-reihe">${D.klassen.map(x => `<button class="mg-chip ${x.id === k.id ? "an" : ""}" data-klasse="${x.id}">${esc(x.name)}</button>`).join("")}<button class="mg-chip" data-neu>+ neue Klasse</button></div>
        <div class="mg-felder">
          <div><label>Name der Klasse</label><input data-feld="name" value="${esc(k.name)}" maxlength="20"></div>
          <div><label>Klassenstufe (Darstellung)</label><select data-feld="stufe"><option value="12" ${k.stufe === "12" ? "selected" : ""}>Klasse 1/2 – große Bilder, wenig Text</option><option value="34" ${k.stufe === "34" ? "selected" : ""}>Klasse 3/4 – mit Uhrzeiten und Temperaturen</option></select></div>
          <div style="grid-column:1/-1"><label>Begrüßung (leer = automatisch „Guten Morgen, liebe Klasse ${esc(k.name)}!“)</label><input data-feld="gruss" value="${esc(k.gruss)}" maxlength="80" placeholder="Guten Morgen, liebe Klasse ${esc(k.name)}!"></div>
          <div><label>Buchstabe der Woche (leer = Feld ausblenden)</label><div class="mg-reihe"><input data-feld="buchstabe" value="${esc(k.buchstabe || "")}" maxlength="3" placeholder="z. B. m, ei, sch" style="flex:1">${kursBuchstabe() ? `<button class="mg-k hell" data-ausKurs>aus dem Buchstabenkurs: ${esc(kursBuchstabe())}</button>` : ""}</div><small class="mg-hilfe">Auch Laute wie au, ei, sch. Antippen auf der Tafel öffnet den Buchstabenkurs.</small></div>
          <div><label>Ort fürs Wetter</label><div class="mg-reihe"><input data-ort value="${esc((k.ort || {}).name || "")}" style="flex:1"><button class="mg-k hell" data-ortsuche>suchen</button></div><small class="mg-hilfe" id="mgOrt">${k.ort && k.ort.lat ? `📍 ${esc(k.ort.name)} (${(+k.ort.lat).toFixed(2)}, ${(+k.ort.lon).toFixed(2)})` : ""}</small></div>
        </div>
        ${D.klassen.length > 1 ? `<button class="mg-k rot" data-loeschen>🗑 Klasse ${esc(k.name)} löschen</button>` : ""}`;
    } else if (reiter === "plan") {
        html += `<p class="mg-hilfe">Fach und Lehrkraft je Stunde. Leere Stunden werden nicht angezeigt. Die aktuelle Stunde wird nach der Uhrzeit hervorgehoben.</p>
        <div class="mg-tabelle"><table><tr><th>Std.</th><th>Zeit</th>${[1, 2, 3, 4, 5].map(i => `<th>${TAGE[i]}</th>`).join("")}</tr>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<tr><td><b>${i + 1}.</b></td><td class="mg-zeiten"><input data-zeit="${i}|0" value="${esc((k.zeiten[i] || [])[0] || "")}" placeholder="08:00"><input data-zeit="${i}|1" value="${esc((k.zeiten[i] || [])[1] || "")}" placeholder="08:45"></td>
            ${[1, 2, 3, 4, 5].map(t => { const s = (k.plan[t] || [])[i] || {}; return `<td><select data-plan="${t}|${i}|f">${fachOpt(s.f)}</select><input data-plan="${t}|${i}|l" value="${esc(s.l || "")}" placeholder="Lehrkraft" maxlength="30"></td>`; }).join("")}</tr>`).join("")}
        </table></div>
        <label>Pausen (nach welcher Stunde?)</label>
        <div class="mg-pausen">${(k.pausen || []).map((p, i) => `<div class="mg-reihe"><span>nach der</span><select data-pause="${i}|nach">${[1, 2, 3, 4, 5, 6, 7].map(n => `<option ${+p.nach === n ? "selected" : ""}>${n}</option>`).join("")}</select><span>. Stunde:</span><input data-pause="${i}|e" value="${esc(p.e || "")}" style="width:60px"><input data-pause="${i}|name" value="${esc(p.name)}" style="flex:1"><button class="mg-k hell" data-pauseweg="${i}">✕</button></div>`).join("")}
        <button class="mg-k hell" data-pauseplus>+ Pause</button></div>`;
    } else if (reiter === "material") {
        html += `<p class="mg-hilfe">Was die Kinder für jedes Fach auspacken. Auf der Tafel erscheint alles, was für die Fächer des Tages gebraucht wird – die Kinder können es abhaken.</p>
        <div class="mg-matliste">${[...new Set(Object.values(k.plan).flat().map(s => s && s.f).filter(Boolean))].concat(Object.keys(FAECHER)).filter((v, i, a) => a.indexOf(v) === i && v !== "frei").map(fk => { const f = FAECHER[fk], an = k.material[fk] || f.m;
            return `<div class="mg-mat"><b>${f.e} ${esc(f.n)}</b><div>${Object.entries(MATERIAL).map(([m, [e, n]]) => `<button class="mg-mini ${an.includes(m) ? "an" : ""}" data-mat="${fk}|${m}" title="${esc(n)}">${e}</button>`).join("")}</div></div>`; }).join("")}</div>
        <label>Zusätzlich an bestimmten Tagen</label>
        <div class="mg-matliste">${[1, 2, 3, 4, 5].map(t => `<div class="mg-mat"><b>${TAGE[t]}</b><div>${Object.entries(MATERIAL).map(([m, [e, n]]) => `<button class="mg-mini ${(k.extra[t] || []).includes(m) ? "an" : ""}" data-extra="${t}|${m}" title="${esc(n)}">${e}</button>`).join("")}</div></div>`).join("")}</div>`;
    } else {
        const heute = iso(tag());
        html += `<p class="mg-hilfe">Hinweise erscheinen unter „${k.stufe === "12" ? "Denk daran!" : "Heute beachten"}“ – nur an einem Tag, jede Woche am selben Tag oder immer. Kurze Sätze sind für Erstklässler am besten.</p>
        <div class="mg-neuhinweis"><select id="mgHE">${HINWEIS_ICONS.map(e => `<option>${e}</option>`).join("")}</select><input id="mgHT" placeholder="z. B. Elternbrief abgeben" maxlength="80">
          <select id="mgHW"><option value="${heute}">nur am ${tag().toLocaleDateString("de-DE")}</option>${[1, 2, 3, 4, 5].map(t => `<option value="wt${t}">jeden ${TAGE[t]}</option>`).join("")}<option value="immer">immer</option></select>
          <button class="mg-k" data-hplus>+ Hinzufügen</button></div>
        <ul class="mg-hliste">${(k.hinweise || []).map(h => `<li><span>${esc(h.e)}</span><b>${esc(h.t)}</b><small>${h.wann === "immer" ? "immer" : h.wann.startsWith("wt") ? "jeden " + TAGE[+h.wann.slice(2)] : new Date(h.wann + "T12:00").toLocaleDateString("de-DE")}</small><button class="mg-k hell" data-hweg="${h.id}">✕</button></li>`).join("") || "<li class='mg-hilfe'>Noch keine Hinweise.</li>"}</ul>`;
    }
    p.innerHTML = html + "</div>";
    editorAktivieren(p, k);
}
function editorAktivieren(p, k){
    const neu = () => { speichern(); bearbeiten(); zeichnen(); };
    p.querySelectorAll("[data-reiter]").forEach(b => b.addEventListener("click", () => bearbeiten(b.dataset.reiter)));
    p.querySelector("[data-schliessen]").addEventListener("click", () => { p.classList.remove("an"); zeichnen(); });
    p.querySelectorAll("[data-klasse]").forEach(b => b.addEventListener("click", () => { D.aktiv = b.dataset.klasse; abgehakt = {}; wetterLive = null; neu(); wetterLaden(); }));
    const nb = p.querySelector("[data-neu]"); if (nb) nb.addEventListener("click", () => { const name = prompt("Name der neuen Klasse (z. B. 2b):"); if (!name) return; const x = neueKlasse(name.trim().slice(0, 20), klasse().stufe); x.ort = Object.assign({}, klasse().ort); x.zeiten = klasse().zeiten.map(z => z.slice()); D.klassen.push(x); D.aktiv = x.id; neu(); });
    const lb = p.querySelector("[data-loeschen]"); if (lb) lb.addEventListener("click", () => { if (!confirm(`Klasse ${k.name} mit Stundenplan und Hinweisen löschen?`)) return; D.klassen = D.klassen.filter(x => x.id !== k.id); D.aktiv = D.klassen[0].id; neu(); });
    p.querySelectorAll("[data-feld]").forEach(i => i.addEventListener("change", () => { k[i.dataset.feld] = i.dataset.feld === "buchstabe" ? i.value.trim().toLowerCase() : i.value.trim(); delete k.beispiel; speichern(); zeichnen(); }));
    const ak = p.querySelector("[data-ausKurs]"); if (ak) ak.addEventListener("click", () => { k.buchstabe = kursBuchstabe(); p.querySelector('[data-feld="buchstabe"]').value = k.buchstabe; speichern(); zeichnen(); });
    const os = p.querySelector("[data-ortsuche]");
    if (os) os.addEventListener("click", async () => {
        const name = p.querySelector("[data-ort]").value.trim(); if (!name) return;
        const info = p.querySelector("#mgOrt"); info.textContent = "suche …";
        try { const r = await fetch("https://geocoding-api.open-meteo.com/v1/search?count=1&language=de&name=" + encodeURIComponent(name)); const j = await r.json(); const t = j.results && j.results[0];
            if (!t) { info.textContent = "Ort nicht gefunden."; return; }
            k.ort = { name: t.name, lat: t.latitude, lon: t.longitude }; info.textContent = `📍 ${t.name} (${t.admin1 || ""})`; speichern(); wetterLaden();
        } catch (x) { info.textContent = "Wetterdienst nicht erreichbar."; }
    });
    p.querySelectorAll("[data-zeit]").forEach(i => i.addEventListener("change", () => { const [z, s] = i.dataset.zeit.split("|").map(Number); while (k.zeiten.length <= z) k.zeiten.push(["", ""]); k.zeiten[z][s] = i.value.trim(); speichern(); }));
    p.querySelectorAll("[data-plan]").forEach(i => i.addEventListener("change", () => {
        const [t, z, feld] = i.dataset.plan.split("|"); const l = k.plan[t] = k.plan[t] || [];
        while (l.length <= +z) l.push({ f: "", l: "" });
        l[+z][feld] = i.value.trim(); delete k.beispiel;
        // Lehrkraft beim Fach merken und in leeren Feldern vorschlagen
        if (feld === "f" && !l[+z].l) { const gleich = Object.values(k.plan).flat().find(s => s && s.f === i.value && s.l); if (gleich) { l[+z].l = gleich.l; const li = p.querySelector(`[data-plan="${t}|${z}|l"]`); if (li) li.value = gleich.l; } }
        while (l.length && !l[l.length - 1].f && !l[l.length - 1].l) l.pop();
        speichern(); zeichnen();
    }));
    p.querySelectorAll("[data-pause]").forEach(i => i.addEventListener("change", () => { const [n, feld] = i.dataset.pause.split("|"); k.pausen[+n][feld] = feld === "nach" ? +i.value : i.value.trim(); speichern(); zeichnen(); }));
    p.querySelectorAll("[data-pauseweg]").forEach(b => b.addEventListener("click", () => { k.pausen.splice(+b.dataset.pauseweg, 1); neu(); }));
    const pp = p.querySelector("[data-pauseplus]"); if (pp) pp.addEventListener("click", () => { (k.pausen = k.pausen || []).push({ nach: 3, name: "Hofpause", e: "🛝" }); neu(); });
    p.querySelectorAll("[data-mat]").forEach(b => b.addEventListener("click", () => { const [f, m] = b.dataset.mat.split("|"); const l = k.material[f] = (k.material[f] || FAECHER[f].m).slice(); const i = l.indexOf(m); i >= 0 ? l.splice(i, 1) : l.push(m); b.classList.toggle("an"); speichern(); }));
    p.querySelectorAll("[data-extra]").forEach(b => b.addEventListener("click", () => { const [t, m] = b.dataset.extra.split("|"); const l = k.extra[t] = k.extra[t] || []; const i = l.indexOf(m); i >= 0 ? l.splice(i, 1) : l.push(m); b.classList.toggle("an"); speichern(); }));
    const hp = p.querySelector("[data-hplus]");
    if (hp) hp.addEventListener("click", () => { const t = p.querySelector("#mgHT").value.trim(); if (!t) return; (k.hinweise = k.hinweise || []).push({ id: neueId(), e: p.querySelector("#mgHE").value, t, wann: p.querySelector("#mgHW").value }); aufraeumen(k); neu(); });
    p.querySelectorAll("[data-hweg]").forEach(b => b.addEventListener("click", () => { k.hinweise = k.hinweise.filter(h => h.id !== b.dataset.hweg); neu(); }));
}
// Buchstabe der Stunde aus dem Buchstabenkurs (auf diesem Gerät)
function kursBuchstabe(){ try { return (JSON.parse(localStorage.getItem("tb_buchstabenkurs") || "{}").aktuell) || ""; } catch (x) { return ""; } }
// Alte Tages-Hinweise (älter als 2 Wochen) entfernen
function aufraeumen(k){ const grenze = iso(new Date(Date.now() - 14 * 864e5)); k.hinweise = (k.hinweise || []).filter(h => !/^\d{4}-/.test(h.wann) || h.wann >= grenze); }

/* ---------- Öffnen / Schließen ---------- */
function oeffnen(){
    const w = document.getElementById("morgen");
    w.classList.add("an"); document.getElementById("uebersicht").style.display = "none";
    history.replaceState(null, "", "#morgen");
    D.klassen.forEach(aufraeumen);
    zeichnen(); wetterLaden();
    if (klasse().beispiel) setTimeout(() => bearbeiten("klasse"), 400);
}
function schliessen(){ document.getElementById("morgen").classList.remove("an"); document.getElementById("uebersicht").style.display = ""; history.replaceState(null, "", location.pathname); }
document.addEventListener("DOMContentLoaded", () => {
    const w = document.getElementById("morgen"); if (!w) return;
    w.addEventListener("click", klick);
    setInterval(() => { if (w.classList.contains("an")) { uhr(); const n = new Date(); if (n.getSeconds() < 1 || n.getMinutes() % 5 === 0 && n.getSeconds() < 1) zeichnen(); } }, 1000);
    setInterval(() => { if (w.classList.contains("an")) wetterLaden(); }, 30 * 60 * 1000);
    if (location.hash === "#morgen") oeffnen();
    window.addEventListener("hashchange", () => { if (location.hash === "#morgen") oeffnen(); });
});
window.tafelMorgen = { oeffnen, schliessen, bearbeiten: () => bearbeiten() };
})();
