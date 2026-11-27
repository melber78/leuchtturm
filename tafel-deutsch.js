/* ===============================================================
   Deutsch-Tafelbild: Wortarten & Satzglieder (Klasse 3–7)
   Wörter/Satzglieder an der Tafel antippen und einfärben,
   Prüffragen Schritt für Schritt aufdecken, Umstellprobe.
   =============================================================== */
(function(){
"use strict";
const ET = window.ErklaerTafel; if (!ET) return;
const { wahl } = ET;
const nimm = l => l[Math.floor(Math.random() * l.length)];

/* ---------- Wortarten ---------- */
const WA = {
    N:  { n: "Nomen", f: "#557428", frage: "Kann ich <i>der, die, das</i> davorsetzen? Gibt es eine Mehrzahl?", stufe: 1 },
    V:  { n: "Verb", f: "#d1342b", frage: "Kann ich <i>ich, du, er</i> davorsetzen? Was tut jemand?", stufe: 1 },
    A:  { n: "Adjektiv", f: "#2e9e5b", frage: "<i>Wie</i> ist etwas? Kann ich steigern (groß – größer – am größten)?", stufe: 1 },
    Ar: { n: "Artikel", f: "#e0a800", frage: "Begleiter des Nomens: <i>der, die, das, ein, eine</i> …", stufe: 1 },
    P:  { n: "Pronomen", f: "#8e44ad", frage: "Steht für ein Nomen oder begleitet es: <i>ich, du, wir, sie, mein, sein</i> …", stufe: 2 },
    Pr: { n: "Präposition", f: "#e67e22", frage: "Verhältniswort: <i>auf, in, unter, durch, hinter, über, an</i> …", stufe: 2 },
    K:  { n: "Konjunktion", f: "#607d8b", frage: "Verbindet Wörter oder Sätze: <i>und, oder, aber, weil, denn, dass</i> …", stufe: 2 },
    Av: { n: "Adverb", f: "#16a085", frage: "Sagt <i>wann, wo, wie oft</i>: <i>heute, gestern, dort, oft, morgen</i> …", stufe: 2 }
};
// Wort|Wortart, Satzzeichen hängen am Wort
const SAETZE = [
    "Der|Ar kleine|A Hund|N spielt|V auf|Pr der|Ar Wiese.|N",
    "Die|Ar Kinder|N bauen|V einen|Ar großen|A Schneemann.|N",
    "Paul|N liest|V heute|Av ein|Ar spannendes|A Buch.|N",
    "Wir|P backen|V morgen|Av einen|Ar leckeren|A Kuchen.|N",
    "Lea|N trinkt|V warmen|A Kakao|N und|K isst|V ein|Ar Brötchen.|N",
    "Der|Ar Zug|N fährt|V schnell|A durch|Pr den|Ar dunklen|A Tunnel.|N",
    "Die|Ar Sonne|N scheint|V hell|A über|Pr dem|Ar Wald.|N",
    "Er|P schreibt|V einen|Ar Brief|N an|Pr seine|P Oma.|N",
    "Weil|K es|P regnet,|V bleiben|V wir|P drinnen.|Av",
    "Die|Ar müde|A Katze|N schläft|V auf|Pr dem|Ar weichen|A Sofa.|N",
    "Ben|N und|K Emma|N gehen|V oft|Av in|Pr den|Ar Park.|N",
    "Der|Ar Lehrer|N erklärt|V den|Ar Kindern|N eine|Ar schwierige|A Aufgabe.|N",
    "Sie|P hat|V gestern|Av ihr|P Fahrrad|N repariert.|V",
    "Der|Ar Vogel|N baut|V sein|P Nest|N in|Pr der|Ar alten|A Eiche.|N",
    "Max|N lacht|V laut,|A denn|K der|Ar Film|N ist|V lustig.|A",
    "Ein|Ar großer|A Hund|N bellt|V hinter|Pr dem|Ar Zaun.|N",
    "Die|Ar Klasse|N fährt|V morgen|Av mit|Pr dem|Ar Bus|N nach|Pr Halle.|N"
].map(s => s.split(" ").map(w => { const [t, a] = w.split("|"); return { t, a }; }));

/* ---------- Satzglieder ---------- */
const SG = {
    S:    { n: "Subjekt", kurz: "Subjekt", f: "#557428", frage: "Wer oder was …?" },
    P:    { n: "Prädikat", kurz: "Prädikat", f: "#d1342b", frage: "Was tut / geschieht?" },
    AO:   { n: "Akkusativobjekt", kurz: "Akk.-Objekt", f: "#2e9e5b", frage: "Wen oder was …?" },
    DO:   { n: "Dativobjekt", kurz: "Dat.-Objekt", f: "#16a085", frage: "Wem …?" },
    AdvZ: { n: "Adverbiale der Zeit", kurz: "Zeit", f: "#e67e22", frage: "Wann …?" },
    AdvO: { n: "Adverbiale des Ortes", kurz: "Ort", f: "#c0703a", frage: "Wo / wohin …?" },
    AdvA: { n: "Adverbiale der Art und Weise", kurz: "Art & Weise", f: "#b8860b", frage: "Wie …?" },
    AdvK: { n: "Adverbiale des Grundes", kurz: "Grund", f: "#a0522d", frage: "Warum …?" }
};
// Satzglieder in Satzmitte-Schreibweise (Großschreibung nur bei Nomen/Namen); u = weitere richtige Stellungen
const SG_SAETZE = [
    { b: [["der Hund", "S"], ["bellt", "P"], ["laut", "AdvA"]], u: [[2, 1, 0]] },
    { b: [["Lea", "S"], ["schenkt", "P"], ["ihrer Oma", "DO"], ["einen Blumenstrauß", "AO"]], u: [[3, 1, 0, 2], [2, 1, 0, 3]] },
    { b: [["am Morgen", "AdvZ"], ["fährt", "P"], ["der Bus", "S"], ["zur Schule", "AdvO"]], u: [[2, 1, 0, 3], [3, 1, 2, 0]] },
    { b: [["die Kinder", "S"], ["spielen", "P"], ["auf dem Hof", "AdvO"], ["Fußball", "AO"]], u: [[3, 1, 0, 2], [2, 1, 0, 3]] },
    { b: [["Paul", "S"], ["hilft", "P"], ["seinem Freund", "DO"]], u: [[2, 1, 0]] },
    { b: [["wegen des Regens", "AdvK"], ["bleiben", "P"], ["wir", "S"], ["im Haus", "AdvO"]], u: [[2, 1, 0, 3], [3, 1, 2, 0]] },
    { b: [["der Lehrer", "S"], ["erklärt", "P"], ["den Schülern", "DO"], ["die Aufgabe", "AO"]], u: [[3, 1, 0, 2], [2, 1, 0, 3]] },
    { b: [["gestern", "AdvZ"], ["fand", "P"], ["Emma", "S"], ["einen Igel", "AO"], ["im Garten", "AdvO"]], u: [[2, 1, 0, 3, 4], [4, 1, 2, 0, 3]] },
    { b: [["der Zug", "S"], ["fährt", "P"], ["sehr schnell", "AdvA"], ["durch den Tunnel", "AdvO"]], u: [[3, 1, 0, 2], [2, 1, 0, 3]] },
    { b: [["meine Schwester", "S"], ["kauft", "P"], ["dem Baby", "DO"], ["eine Mütze", "AO"]], u: [[3, 1, 0, 2], [2, 1, 0, 3]] },
    { b: [["im Herbst", "AdvZ"], ["sammeln", "P"], ["die Eichhörnchen", "S"], ["Nüsse", "AO"]], u: [[2, 1, 0, 3], [3, 1, 2, 0]] },
    { b: [["Ben", "S"], ["wartet", "P"], ["geduldig", "AdvA"], ["vor dem Kino", "AdvO"]], u: [[3, 1, 0, 2], [2, 1, 0, 3]] },
    { b: [["nach der Schule", "AdvZ"], ["besucht", "P"], ["Anna", "S"], ["ihren Opa", "AO"]], u: [[2, 1, 0, 3], [3, 1, 2, 0]] },
    { b: [["der Arzt", "S"], ["gibt", "P"], ["dem Jungen", "DO"], ["ein Pflaster", "AO"]], u: [[3, 1, 0, 2], [2, 1, 0, 3]] }
];

const CSS = `
.wa-satz{ display:flex; flex-wrap:wrap; gap:clamp(8px,1.6vmin,18px); justify-content:center; align-content:center; height:100%; padding:1vmin; }
.wa-w{ position:relative; font-family:"Andika","Nunito",sans-serif; font-weight:700; font-size:clamp(24px,5vmin,64px); padding:.12em .32em .5em; border-radius:.3em; background:#fff; border:3px solid #dfe5ea; cursor:pointer; transition:background .25s, border-color .25s, color .25s; line-height:1.1; }
.ek.kreide .wa-w{ background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.2); color:#fdfaf1; }
.wa-w .lab{ position:absolute; left:0; right:0; bottom:.08em; text-align:center; font-family:"Nunito",sans-serif; font-size:.3em; font-weight:900; letter-spacing:.02em; opacity:.9; }
.wa-w.gefaerbt{ color:#fff !important; }
.wa-w.falsch{ outline:4px dashed #d1342b; outline-offset:3px; }
.wa-w.richtig::after{ content:"✓"; position:absolute; top:-.45em; right:-.3em; font-size:.45em; background:#2e9e5b; color:#fff; border-radius:50%; width:1.3em; height:1.3em; display:flex; align-items:center; justify-content:center; }
.wa-w.andere{ opacity:.55; cursor:default; }
.ek-tasten .t-weg{ background:#9aa8b4; }
.sg-satz{ display:flex; flex-wrap:wrap; gap:clamp(10px,1.8vmin,22px); justify-content:center; align-content:center; height:100%; padding:1vmin; }
.sg-b{ position:relative; font-family:"Andika","Nunito",sans-serif; font-weight:700; font-size:clamp(24px,4.8vmin,60px); padding:.14em .4em .62em; border-radius:.35em; background:#fff; border:3px solid #2f4a1f; cursor:pointer; transition:transform .5s, background .25s; line-height:1.1; }
.ek.kreide .sg-b{ background:rgba(255,255,255,.08); border-color:#f3efe3; color:#fdfaf1; }
.sg-b .lab{ position:absolute; left:0; right:0; bottom:.1em; text-align:center; font-family:"Nunito",sans-serif; font-size:.28em; font-weight:900; }
.sg-b.gefaerbt{ color:#fff !important; border-color:transparent; }
.sg-b.falsch{ outline:4px dashed #d1342b; outline-offset:3px; }
.sg-b.richtig::after{ content:"✓"; position:absolute; top:-.45em; right:-.3em; font-size:.45em; background:#2e9e5b; color:#fff; border-radius:50%; width:1.3em; height:1.3em; display:flex; align-items:center; justify-content:center; }
.sg-satz.dreh .sg-b{ animation:sgWackel .6s ease; }
@keyframes sgWackel{ 0%{ transform:translateY(0); } 40%{ transform:translateY(-14px); } 100%{ transform:translateY(0); } }
.sg-punkt{ font-size:clamp(24px,4.8vmin,60px); font-weight:900; align-self:center; margin-left:-.3em; }
`;
let cssDa = false;
function css(){ if (cssDa) return; const s = document.createElement("style"); s.textContent = CSS; document.head.appendChild(s); cssDa = true; }

const DS = { kap: "wortarten", wortarten: { i: 0, stufe: "1", stift: "N", zu: {}, zeigen: false }, satzglieder: { i: 0, stufe: "2", stift: "S", zu: {}, zeigen: false, ord: null } };
const DK = {};
const aktivWA = () => Object.entries(WA).filter(([, w]) => DS.wortarten.stufe === "2" || w.stufe === 1);

DK.wortarten = () => {
    const s = DS.wortarten, satz = SAETZE[s.i], aktiv = new Set(aktivWA().map(([k]) => k));
    const woerter = satz.map((w, j) => {
        const zaehlt = aktiv.has(w.a), gesetzt = s.zu[j], richtig = WA[w.a], zeig = s.zeigen && zaehlt;
        const farbe = zeig ? richtig.f : gesetzt ? WA[gesetzt].f : "";
        const lab = zeig ? richtig.n : gesetzt ? WA[gesetzt].n : "";
        const cls = [!zaehlt ? "andere" : "", farbe ? "gefaerbt" : "", s.zeigen && gesetzt && zaehlt ? (gesetzt === w.a ? "richtig" : "falsch") : ""].join(" ");
        return `<span class="wa-w ${cls}" data-x="w${j}" style="${farbe ? `background:${farbe};border-color:${farbe}` : ""}">${w.t}<span class="lab">${lab}</span></span>`;
    }).join("");
    const vorhanden = [...new Set(satz.map(w => w.a))].filter(a => aktiv.has(a));
    return { frage: "Welche Wortart ist das? Wortart unten wählen, dann das Wort antippen.",
        bild: `<div class="wa-satz">${woerter}</div>`,
        merke: `<b>Wortarten</b>${aktivWA().map(([, w]) => `<span style="color:${w.f};font-weight:900">${w.n}</span>`).join(" · ")}${s.stufe === "1" ? ` <small style="color:#7c8a96">(graue Wörter gehören zu anderen Wortarten)</small>` : ""}`,
        regler: wahl("stufe", [["1", "Kl. 3/4: 4 Wortarten"], ["2", "Kl. 5–7: 8 Wortarten"]], s.stufe) +
            `<div class="ek-tasten">${aktivWA().map(([k, w]) => `<button data-a="stift-${k}" class="${s.stift === k ? "an" : ""}" style="background:${w.f}">${w.n}</button>`).join("")}<button class="t-weg ${s.stift === "weg" ? "an" : ""}" data-a="stift-weg">Radiergummi</button></div>`,
        schritteTitel: "Prüffragen", loesbar: true,
        schritte: vorhanden.map(a => [`<b style="color:${WA[a].f}">${WA[a].n}:</b> ${WA[a].frage}`, satz.filter(w => w.a === a).map(w => w.t.replace(/[.,!?]$/, "")).join(", ")]) };
};
DK.wortarten.x = (x, t, api) => { const s = DS.wortarten, j = +x.slice(1), w = SAETZE[s.i][j]; if (!aktivWA().some(([k]) => k === w.a)) return; if (s.stift === "weg") delete s.zu[j]; else s.zu[j] = s.stift; api.zeichnen(); };
DK.wortarten.knopf = (a, t, api) => { if (a.startsWith("stift-")){ DS.wortarten.stift = a.slice(6); api.zeichnen(); } };
DK.wortarten.allesAuf = (el, api) => { DS.wortarten.zeigen = true; api.zeichnen(); el.querySelectorAll(".ek-panel .lsg.zu").forEach(x => x.classList.remove("zu")); };
DK.wortarten.allesZu = (el, api) => { DS.wortarten.zeigen = false; DS.wortarten.zu = {}; api.zeichnen(); };
DK.wortarten.set = () => { const s = DS.wortarten; if (!aktivWA().some(([k]) => k === s.stift)) s.stift = "N"; };
DK.wortarten.neu = () => { const s = DS.wortarten; let i; do { i = Math.floor(Math.random() * SAETZE.length); } while (i === s.i); s.i = i; s.zu = {}; s.zeigen = false; };

// Satzglieder: Rollen je Stufe (Kl. 3/4: Subjekt, Prädikat und „Ergänzung“)
const rolle = r => DS.satzglieder.stufe === "1" && !["S", "P"].includes(r) ? "E" : r;
const ROLLEN = () => DS.satzglieder.stufe === "1" ? [["S", SG.S], ["P", SG.P], ["E", { n: "Ergänzung", kurz: "Ergänzung", f: "#e67e22", frage: "Wen? Wem? Wann? Wo? Wie?" }]] : Object.entries(SG);
const rinfo = r => (ROLLEN().find(([k]) => k === r) || [null, SG[r]])[1];
DK.satzglieder = () => {
    const s = DS.satzglieder, satz = SG_SAETZE[s.i], ord = s.ord || satz.b.map((_, j) => j);
    const text = (j, erst) => { const t = satz.b[j][0]; return erst ? t[0].toUpperCase() + t.slice(1) : t; };
    const bloecke = ord.map((j, pos) => {
        const r = rolle(satz.b[j][1]), gesetzt = s.zu[j], zeig = s.zeigen, info = zeig ? rinfo(r) : gesetzt ? rinfo(gesetzt) : null;
        const cls = [info ? "gefaerbt" : "", zeig && gesetzt ? (gesetzt === r ? "richtig" : "falsch") : ""].join(" ");
        return `<span class="sg-b ${cls}" data-x="b${j}" style="${info ? `background:${info.f}` : ""}">${text(j, pos === 0)}<span class="lab">${info ? info.kurz : ""}</span></span>`;
    }).join("");
    const sub = satz.b.find(b => b[1] === "S")[0], pra = satz.b.find(b => b[1] === "P")[0];
    const schritte = [["<b>Umstellprobe:</b> Was beim Umstellen zusammenbleibt, ist ein Satzglied.", `${satz.b.length} Satzglieder`],
        [`<b style="color:${SG.P.f}">Prädikat:</b> Was tut / geschieht? (steht im Aussagesatz an 2. Stelle)`, pra],
        [`<b style="color:${SG.S.f}">Subjekt:</b> Wer oder was ${pra}?`, sub]];
    satz.b.forEach(([t, r]) => { if (r === "S" || r === "P") return; const i = rinfo(rolle(r)), fr = SG[r].frage.replace(" …?", " "); schritte.push([`<b style="color:${i.f}">${s.stufe === "1" ? "Ergänzung" : SG[r].n}:</b> ${fr}${pra} ${sub}?`, t]); });
    return { frage: "Bestimme die Satzglieder. Mit „Umstellen“ siehst du, was zusammengehört.",
        bild: `<div class="sg-satz">${bloecke}<span class="sg-punkt">.</span></div>`,
        merke: `<b>Merke</b>Ein Satzglied kann aus einem oder mehreren Wörtern bestehen. Das <span style="color:${SG.P.f};font-weight:900">Prädikat</span> steht im Aussagesatz immer an zweiter Stelle. Nach dem <span style="color:${SG.S.f};font-weight:900">Subjekt</span> fragst du mit „Wer oder was?“.`,
        regler: wahl("stufe", [["1", "Kl. 3/4"], ["2", "Kl. 5–7"]], s.stufe) + `<span class="ek-wahl"><button data-a="umstellen">↻ Umstellen</button></span>` +
            `<div class="ek-tasten">${ROLLEN().map(([k, r]) => `<button data-a="stift-${k}" class="${s.stift === k ? "an" : ""}" style="background:${r.f}" title="${r.frage}">${r.kurz}</button>`).join("")}<button class="t-weg ${s.stift === "weg" ? "an" : ""}" data-a="stift-weg">Radiergummi</button></div>`,
        schritteTitel: "So findest du die Satzglieder", loesbar: true, schritte };
};
DK.satzglieder.x = (x, t, api) => { const s = DS.satzglieder, j = +x.slice(1); if (s.stift === "weg") delete s.zu[j]; else s.zu[j] = s.stift; api.zeichnen(); };
DK.satzglieder.knopf = (a, t, api) => {
    const s = DS.satzglieder;
    if (a.startsWith("stift-")){ s.stift = a.slice(6); return api.zeichnen(); }
    if (a === "umstellen"){
        const satz = SG_SAETZE[s.i], alle = [satz.b.map((_, j) => j), ...satz.u], akt = JSON.stringify(s.ord || alle[0]);
        const i = alle.findIndex(o => JSON.stringify(o) === akt); s.ord = alle[(i + 1) % alle.length];
        api.zeichnen(); const el = api.el().querySelector(".sg-satz"); if (el) el.classList.add("dreh");
    }
};
DK.satzglieder.allesAuf = (el, api) => { DS.satzglieder.zeigen = true; api.zeichnen(); el.querySelectorAll(".ek-panel .lsg.zu").forEach(x => x.classList.remove("zu")); };
DK.satzglieder.allesZu = (el, api) => { DS.satzglieder.zeigen = false; DS.satzglieder.zu = {}; api.zeichnen(); };
DK.satzglieder.set = () => { const s = DS.satzglieder; s.zu = {}; s.zeigen = false; if (!ROLLEN().some(([k]) => k === s.stift)) s.stift = "S"; };
DK.satzglieder.neu = () => { const s = DS.satzglieder; let i; do { i = Math.floor(Math.random() * SG_SAETZE.length); } while (i === s.i); s.i = i; s.zu = {}; s.zeigen = false; s.ord = null; };

const wortarten = ET.neu({ id: "wortarten", titel: "Wortarten & Satzglieder", unter: "Klasse 3–7", hash: "wortarten", speicher: "lt-wortarten",
    kapitel: [["wortarten", "Wortarten"], ["satzglieder", "Satzglieder"]], K: DK, S: DS, aufgebaut: css });
window.tafelDeutsch = { wortarten };
})();
