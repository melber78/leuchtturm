/* ============================================================
   Leuchtturm – Sozialtraining: Arbeitsmaterial zum Ausdrucken
   Karten zum Ausschneiden, Plakate und Urkunden – jede Seite wird
   automatisch auf A4 eingepasst. Situationskarten entstehen
   automatisch aus den Übungen einer Stunde (Aufzählungen).
   Benötigt Funktionen aus sozial-stunden.php (inline, esc,
   gesichtSvg, gefuehlArt, ltBild, schriften).
   ============================================================ */
"use strict";
(function () {

/* ---------------- Gestaltung ---------------- */
const CSS = `
.mseite{ width:210mm; height:297mm; overflow:hidden; background:white; color:#1b1b1b; padding:9mm; display:flex; flex-direction:column;
    font-family:"Andika","Nunito",sans-serif; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
.mseite .m-fuss{ flex:0 0 auto; font-family:"Nunito",sans-serif; font-size:7.5pt; font-weight:800; color:#9aa6ab; display:flex; justify-content:space-between; padding-top:2mm; }
.m-raster{ flex:1 1 auto; display:grid; min-height:0; }
.mkarte{ position:relative; border:.35mm dashed #9aa6ab; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; overflow:hidden; padding:4% 5%; gap:2%; --f:1; }
.mkarte .mk-kopf{ position:absolute; top:2.2mm; left:3mm; right:3mm; font-family:"Nunito",sans-serif; font-weight:900; font-size:calc(var(--kopf) * 1pt); color:#7c8a85; text-transform:uppercase; letter-spacing:.04em; text-align:left; }
.mkarte .mk-symbol{ flex:0 1 auto; height:calc(var(--sym) * var(--f)); display:flex; align-items:center; justify-content:center; font-size:calc(var(--sym) * var(--f) * .82); line-height:1; }
.mkarte .mk-symbol svg{ height:100%; width:auto; max-width:100%; }
.mkarte .mk-symbol .bild{ width:auto; height:100%; aspect-ratio:1; display:block; }
.mkarte .mk-symbol .bild svg{ width:100%; height:100%; }
.mkarte .mk-text{ font-weight:700; font-size:calc(var(--txt) * var(--f) * 1pt); line-height:1.2; }
.mkarte.nur-text .mk-text{ font-size:calc(var(--txt) * var(--f) * 1.5pt); line-height:1.25; }
.mkarte .mk-klein{ font-family:"Nunito",sans-serif; font-weight:700; font-size:calc(var(--txt) * var(--f) * .5pt); color:#55636a; line-height:1.3; }
.mkarte .mk-linien{ width:92%; display:flex; flex-direction:column; }
.mkarte .mk-linie{ border-bottom:.35mm solid #777; height:calc(var(--txt) * var(--f) * 2pt); }
.mkarte.leer{ border-color:transparent; }
.mkarte.text-links{ align-items:stretch; text-align:left; }

/* Plakat */
.mplakat{ padding:12mm 13mm 9mm; }
.mplakat .mp-titel{ font-family:"Nunito",sans-serif; font-weight:900; font-size:2.1em; line-height:1.1; color:#16324a; text-align:center; margin-bottom:.5em; }
.mplakat .mp-liste{ flex:1 1 auto; display:flex; flex-direction:column; min-height:0; }
.mplakat .mp-punkt{ flex:1 1 0; display:flex; align-items:center; gap:.55em; border:.6mm solid #dfe5e2; border-radius:5mm; padding:.25em .6em; margin:.18em 0; background:#fbfcfb; min-height:0; }
.mplakat .mp-zeichen{ flex:0 0 auto; width:1.55em; height:1.55em; border-radius:50%; background:#f9eeda; display:flex; align-items:center; justify-content:center; font-family:"Nunito",sans-serif; font-weight:900; color:#16324a; font-size:1.25em; line-height:1; }
.mplakat .mp-text{ flex:1; font-weight:700; font-size:1.15em; line-height:1.25; }
.mplakat .mp-linie{ flex:1; border-bottom:.5mm solid #777; align-self:flex-end; margin-bottom:.4em; }
.mplakat .mp-symbolfeld{ flex:0 0 auto; width:2.6em; height:2.2em; border:.4mm dashed #9aa6ab; border-radius:3mm; }
.mplakat .mp-fuss{ text-align:center; font-weight:700; font-size:1em; color:#3d7ea6; margin-top:.5em; }
.mplakat .mp-unterschrift{ margin-top:.6em; font-family:"Nunito",sans-serif; font-weight:800; font-size:.8em; color:#55636a; }
.mplakat .mp-unterschrift .linien{ display:flex; gap:4mm; margin-top:2mm; }
.mplakat .mp-unterschrift .linien span{ flex:1; border-bottom:.4mm solid #999; height:9mm; }

/* Urkunde */
.murkunde{ padding:10mm; }
.murkunde .mu-rahmen{ flex:1; border:2.2mm double #f2a93b; border-radius:6mm; padding:12mm 12mm 10mm; display:flex; flex-direction:column; align-items:center; text-align:center; gap:7mm; outline:.6mm solid #16324a; outline-offset:-5mm; }
.murkunde .mu-sterne{ font-size:16pt; letter-spacing:.5em; color:#f2a93b; }
.murkunde .mu-titel{ font-family:"Nunito",sans-serif; font-weight:900; font-size:40pt; color:#16324a; line-height:1.05; }
.murkunde .mu-bild{ width:55mm; height:55mm; }
.murkunde .mu-bild .bild{ width:100%; height:100%; }
.murkunde .mu-zeile{ width:85%; display:flex; gap:3mm; align-items:flex-end; font-weight:700; font-size:17pt; }
.murkunde .mu-zeile span.l{ flex:1; border-bottom:.45mm solid #555; height:12mm; }
.murkunde .mu-text{ font-size:19pt; font-weight:700; color:#16324a; }
.murkunde .mu-linien{ width:85%; }
.murkunde .mu-linien span{ display:block; border-bottom:.45mm solid #999; height:13mm; }
.murkunde .mu-unten{ margin-top:auto; width:85%; display:flex; justify-content:space-between; gap:10mm; font-family:"Nunito",sans-serif; font-weight:800; color:#55636a; font-size:11pt; }
.murkunde .mu-unten div{ flex:1; border-top:.4mm solid #999; padding-top:2mm; }

/* Vorschau auf der Stundenseite */
.m-uebersicht{ display:grid; grid-template-columns:repeat(auto-fill,minmax(190px,1fr)); gap:18px; }
.m-eintrag{ display:flex; flex-direction:column; gap:6px; }
.m-eintrag .vorschau{ border-radius:5px; }
.m-eintrag strong{ font-size:14.5px; line-height:1.25; }
.m-eintrag small{ color:#7c8a85; font-weight:700; font-size:12px; line-height:1.35; }
.mliste{ position:relative; }
.mliste .ml-band{ position:absolute; left:0; right:0; top:0; height:7mm; background:linear-gradient(90deg,#2e8b57,#3d7ea6,#c98a1b,#8e44ad); }
.mliste .ml-kopf{ display:flex; align-items:center; gap:5mm; margin:6mm 0 6mm; }
.mliste .ml-icon{ font-size:24mm; line-height:1; }
.mliste .ml-titel{ font-family:"Nunito",sans-serif; font-weight:900; font-size:32pt; line-height:1.05; color:#16324a; }
.mliste .ml-unter{ font-family:"Nunito",sans-serif; font-weight:700; font-size:14pt; color:#55636a; margin-top:1.5mm; }
.mliste .ml-tab{ width:100%; border-collapse:separate; border-spacing:0; font-family:"Nunito",sans-serif; border:.6mm solid #16324a; border-radius:4mm; overflow:hidden; }
.mliste .ml-tab th{ color:white; font-size:13pt; font-weight:900; padding:3mm; text-align:left; border:0; }
.mliste .ml-tab td{ height:17.5mm; border:0; border-top:.3mm solid #c9d6e3; border-left:.3mm solid #e1e8ee; padding:0 3mm; font-size:15pt; font-weight:700; color:#16324a; }
.mliste .ml-tab td:first-child{ border-left:0; font-weight:900; }
.mliste .ml-tab tr:nth-child(odd) td{ background:#f6f9fb; }
.mliste .ml-fuss{ margin-top:5mm; background:#fff4dc; border-radius:4mm; padding:3mm 5mm; font-family:"Nunito",sans-serif; font-weight:900; font-size:16pt; color:#16324a; text-align:center; }
.ml-dialog-hg{ position:fixed; inset:0; background:rgba(22,50,74,.55); z-index:200; display:flex; align-items:center; justify-content:center; padding:12px; }
.ml-dialog{ background:white; border-radius:18px; padding:18px; max-width:960px; width:100%; max-height:calc(100vh - 24px); display:flex; flex-direction:column; box-shadow:0 20px 60px rgba(0,0,0,.3); }
.ml-dialog h2{ margin:0 0 6px; }
.ml-hinweis{ margin:0 0 10px; font-size:14px; color:#55636a; font-weight:700; }
.ml-scroll{ overflow:auto; flex:1; }
.ml-form{ width:100%; border-collapse:collapse; min-width:560px; }
.ml-form th{ text-align:left; font-size:13px; padding:4px; color:#16324a; }
.ml-form td{ padding:3px; }
.ml-form input{ box-sizing:border-box; width:100%; padding:8px; border:2px solid #dfe5e2; border-radius:8px; font:inherit; font-size:15px; }
.ml-knoepfe{ display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
.mliste .ml-tab th{ background:#eef4f8; border:.4mm solid #9aa9b2; padding:2.5mm; font-size:13pt; text-align:left; }
.mliste .ml-tab td{ border:.4mm solid #9aa9b2; }
.mliste .mp-fuss{ margin-top:4mm; }
@media print{ #druck .mseite{ break-after:page; } #druck > .mseite:last-child{ break-after:auto; } }
`;

/* ---------------- Grafiken ---------------- */
const STOPP_ROT = `<svg viewBox="0 0 120 172" xmlns="http://www.w3.org/2000/svg"><rect x="55" y="112" width="10" height="58" rx="2" fill="#9aa6ab" stroke="#555" stroke-width="1.5"/><polygon points="38,4 82,4 116,38 116,82 82,116 38,116 4,82 4,38" fill="#d62c1f" stroke="#7a130b" stroke-width="2"/><polygon points="40.5,10 79.5,10 110,40.5 110,79.5 79.5,110 40.5,110 10,79.5 10,40.5" fill="none" stroke="white" stroke-width="3"/><text x="60" y="71" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="27" fill="white">STOPP</text></svg>`;
const BRILLE = `<svg viewBox="0 0 220 90" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#222" stroke-width="2.6" stroke-linejoin="round"><rect x="14" y="16" width="80" height="58" rx="24"/><rect x="126" y="16" width="80" height="58" rx="24"/><rect x="28" y="28" width="52" height="34" rx="14" stroke-dasharray="5 4"/><rect x="140" y="28" width="52" height="34" rx="14" stroke-dasharray="5 4"/><path d="M94 38 Q110 26 126 38"/><path d="M14 34 L2 30 M206 34 L218 30"/><text x="110" y="88" text-anchor="middle" font-family="Arial" font-size="9" stroke="none" fill="#777">gestrichelt = Gucklöcher ausschneiden</text></svg>`;
const PIZZA = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#222" stroke-width="2.4"><circle cx="60" cy="60" r="56"/><circle cx="60" cy="60" r="46" stroke-dasharray="3 4"/><circle cx="42" cy="44" r="8"/><circle cx="76" cy="40" r="7"/><circle cx="62" cy="70" r="8"/><circle cx="38" cy="76" r="6"/><circle cx="84" cy="74" r="7"/><path d="M50 58 l6 3 M80 58 l-4 5 M58 32 l5 4"/></svg>`;
const PFLASTER = `<svg viewBox="0 0 200 76" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="194" height="70" rx="34" fill="#f6d7b9" stroke="#b7865a" stroke-width="2.4"/><rect x="66" y="12" width="68" height="52" rx="10" fill="#fff4e8" stroke="#b7865a" stroke-width="2"/>${[0,1,2,3].map(r => [0,1,2,3,4,5].map(c => `<circle cx="${18 + c * 7 + (c > 2 ? 108 : 0) - (c > 2 ? 21 : 0)}" cy="${22 + r * 11}" r="1.6" fill="#b7865a"/>`).join("")).join("")}</svg>`;
const GLAS = `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg"><rect x="52" y="8" width="96" height="22" rx="6" fill="#c9d6e3" stroke="#16324a" stroke-width="3"/><path d="M60 30 Q40 46 40 70 L40 210 Q40 232 62 232 L138 232 Q160 232 160 210 L160 70 Q160 46 140 30 Z" fill="#eef6fb" stroke="#16324a" stroke-width="4"/>${[[70,205],[100,205],[130,205],[70,175],[100,175],[130,175],[70,145],[100,145],[130,145],[100,115]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="13" fill="white" stroke="#3d7ea6" stroke-width="2.5" stroke-dasharray="4 3"/><text x="${x}" y="${y+5}" text-anchor="middle" font-family="Arial" font-weight="700" font-size="13" fill="#9aa6ab">${i+1}</text>`).join("")}<path d="M52 60 L52 200" stroke="white" stroke-width="6" stroke-linecap="round" opacity=".8"/></svg>`;
const KASTEN = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" font-family="Arial" font-weight="700"><rect x="35" y="35" width="130" height="130" rx="8" fill="#e7f1fb" stroke="#3d7ea6" stroke-width="5"/><g fill="#16324a" font-size="13" text-anchor="middle"><text x="100" y="26">1 · einatmen (4)</text><text x="100" y="186">3 · ausatmen (4)</text><text x="186" y="104" transform="rotate(90 186 100)">2 · halten (4)</text><text x="14" y="104" transform="rotate(-90 14 100)">4 · halten (4)</text></g><g fill="#f2a93b"><polygon points="150,27 162,35 150,43"/><polygon points="173,150 165,162 157,150"/><polygon points="50,173 38,165 50,157"/><polygon points="27,50 35,38 43,50"/></g><text x="100" y="108" text-anchor="middle" font-size="16" fill="#3d7ea6">Kasten-Atmen</text></svg>`;

const FARBE = { cool: "#9fd8e8", froh: "#ffe08a", traurig: "#a9cff0", wuetend: "#f5a3a3", angst: "#d5c4f0", ruhig: "#bfe6c3", ueberrascht: "#ffd1a3", stolz: "#f9d56e", muede: "#d8dde0", gelangweilt: "#e3e0d7", neutral: "#eeeeee" };
function gesichtBunt(g){
    const art = gefuehlArt(g);
    return gesichtSvg(art, false).replace('<circle cx="50" cy="50" r="45" fill="none"', `<circle cx="50" cy="50" r="45" fill="${FARBE[art] || "#eee"}"`);
}

/* ---------------- Bibliothek ---------------- */
const G = (g, extra) => Object.assign({ gesicht: g, text: g }, extra || {});
const leer = (n, vorlage) => Array.from({ length: n }, () => Object.assign({}, vorlage));
const B = {
    /* --- Für jede Stunde --- */
    "gefuehlsbarometer": { titel: "Gefühlsbarometer (5 Gesichter)", gruppe: "Rituale", art: "karten", proSeite: 2,
        items: ["fröhlich", "traurig", "wütend", "ängstlich", "cool"].map(g => G(g)), hinweis: "Farbig drucken und an Tafel oder Plakat hängen; daneben die Namensklammern." },
    "gespraechsregeln": { titel: "Plakat: Gesprächsregeln", gruppe: "Rituale", art: "plakat",
        punkte: [{ emoji: "🪨", text: "Wer den Redestein hat, spricht." }, { emoji: "👂", text: "Wir hören zu und lachen niemanden aus." }, { emoji: "✋", text: "Ich darf „Ich passe“ sagen." }, { emoji: "🤫", text: "Was hier gesagt wird, bleibt hier." }] },
    "namenszettel": { titel: "Namenszettel (8 pro Seite)", gruppe: "Rituale", art: "karten", proSeite: 8,
        items: leer(8, { emoji: "🙂", text: "Name:", linien: 1 }), hinweis: "Die Namen schreibst du von Hand – sie werden nirgends gespeichert." },
    "ablauf-karten": { titel: "Stundenablauf: Bildkarten für die Tafel", gruppe: "Rituale", art: "karten", proSeite: 6,
        items: [{ emoji: "👋", text: "Ankommen", klein: "Hallo & Gefühlsbarometer" }, { emoji: "📖", text: "Geschichte", klein: "zuhören & reden" }, { emoji: "🎲", text: "Spiel & Übung", klein: "mitmachen" },
            { emoji: "✏️", text: "Arbeitsblatt", klein: "jeder an seinem Platz" }, { emoji: "👏", text: "Abschluss", klein: "Das nehme ich mit" }, { emoji: "📍", text: "Wir sind hier!", klein: "Zeiger zum Umhängen" }],
        hinweis: "Mit Magneten untereinander an die Tafel – der Zeiger wandert mit. Kinder sehen jederzeit, wie lange es noch geht." },
    "ruhezeichen": { titel: "Ruhezeichen-Karte", gruppe: "Rituale", art: "karten", proSeite: 1,
        items: [{ emoji: "✋", text: "Hand hoch = leise", klein: "Ich sehe die Hand · ich hebe auch meine Hand · Mund zu · Augen nach vorn" }],
        hinweis: "Ins Blickfeld hängen. Du hebst die Hand und wartest – nicht reinrufen." },
    "redekarte": { titel: "Redekarte (statt Redestein)", gruppe: "Rituale", art: "karten", proSeite: 2,
        items: leer(2, { emoji: "🪨", text: "Ich bin dran!", klein: "Wer die Karte hat, spricht. Die anderen hören zu." }),
        hinweis: "Laminiert wird sie zum Redestein-Ersatz – wird von Platz zu Platz weitergegeben." },
    "begruessung-plakat": { titel: "Plakat: So begrüßen wir uns", gruppe: "Rituale", art: "plakat",
        punkte: [{ emoji: "🪨", text: "Der Redestein kommt zu mir." }, { emoji: "🙋", text: "Ich stehe kurz auf: „Hallo, ich bin da!“" }, { emoji: "😊", text: "Kl. 3/4: „… und heute freue ich mich auf …“" }, { emoji: "👋", text: "Alle anderen winken zurück." }] },
    "klammer-etiketten": { titel: "Namensschilder für die Barometer-Klammern", gruppe: "Rituale", art: "karten", proSeite: 12,
        items: leer(12, { emoji: "📎", linien: 1 }), hinweis: "Ausschneiden, Namen von Hand eintragen und auf Wäscheklammern kleben – nichts wird gespeichert." },
    "barometer-plakat": { titel: "Plakat: Wie geht es mir heute?", gruppe: "Rituale", art: "plakat",
        punkte: [{ emoji: "😄", text: "fröhlich", symbolfeld: true }, { emoji: "😢", text: "traurig", symbolfeld: true }, { emoji: "😠", text: "wütend", symbolfeld: true }, { emoji: "😨", text: "ängstlich", symbolfeld: true }, { emoji: "😎", text: "cool", symbolfeld: true }],
        fuss: "Steck deine Klammer dahin, wo du gerade bist. Du musst nichts erklären." },
    "abschluss-saetze": { titel: "Satzstreifen für die Abschlussrunde", gruppe: "Rituale", art: "karten", proSeite: 6,
        items: [{ emoji: "💡", text: "Heute habe ich gelernt …" }, { emoji: "😊", text: "Mir hat gefallen …" }, { emoji: "🧗", text: "Schwierig war …" }, { emoji: "🎒", text: "Ich nehme mit …" }, { emoji: "⭐", text: "Ich bin stolz, weil …" }, { emoji: "🔜", text: "Nächstes Mal will ich …" }],
        hinweis: "Kl. 3/4: Ein Kind zieht verdeckt einen Satzanfang und beendet ihn." },
    "abschluss-gesichter": { titel: "Abschluss-Karten: Wie war die Stunde?", gruppe: "Rituale", art: "karten", proSeite: 6,
        items: [G("froh", { text: "super" }), G("neutral", { text: "geht so" }), G("traurig", { text: "schwierig" }), G("froh", { text: "super" }), G("neutral", { text: "geht so" }), G("traurig", { text: "schwierig" })],
        hinweis: "Für Kl. 1/2 statt Worten – Karte hochhalten. Zwei Sätze pro Seite." },
    "murmelglas": { titel: "Murmelglas zum Ausmalen", gruppe: "Rituale", art: "karten", proSeite: 1,
        items: [{ svg: GLAS, text: "Unser Murmelglas", klein: "Für jede gelungene Stunde malen wir eine Murmel aus. Bei 10 Murmeln: Gruppenspiel nach Wahl!" }],
        hinweis: "Falls kein echtes Glas da ist – an die Tür hängen." },
    "gutschein-spiel": { titel: "Gutschein: Gruppenspiel nach Wahl", gruppe: "Rituale", art: "karten", proSeite: 4,
        items: leer(4, { emoji: "🎉", text: "Gutschein", klein: "Unser Murmelglas ist voll! Wir dürfen ein Gruppenspiel aussuchen.", linien: 1 }) },
    "gefuehlskarten-gross": { titel: "Gefühlskarten groß (4 Grundgefühle)", gruppe: "Gefühle", art: "karten", proSeite: 1,
        items: ["froh", "traurig", "wütend", "ängstlich"].map(g => G(g)), hinweis: "Eine Karte pro Seite – zum Hochhalten und für die Tafel." },
    "gefuehlskarten-klein": { titel: "Gefühlskarten klein (8 Gefühle)", gruppe: "Gefühle", art: "karten", proSeite: 8,
        items: ["froh", "traurig", "wütend", "ängstlich", "ruhig", "überrascht", "stolz", "müde"].map(g => G(g)), hinweis: "Für Pantomime und Gefühlsdetektiv – verdeckt ziehen." },
    "rot-gruen": { titel: "Rote und grüne Karten", gruppe: "Rituale", art: "karten", proSeite: 4,
        items: [{ farbe: "#e74c3c", textfarbe: "#fff", emoji: "✋", text: "Rot" }, { farbe: "#2e8b57", textfarbe: "#fff", emoji: "👍", text: "Grün" }, { farbe: "#e74c3c", textfarbe: "#fff", emoji: "✋", text: "Rot" }, { farbe: "#2e8b57", textfarbe: "#fff", emoji: "👍", text: "Grün" }],
        hinweis: "Farbig drucken (oder schwarz-weiß auf rotes/grünes Papier). Pro Seite zwei Kinder – für 9 Kinder 5 Seiten." },
    "zahlenkarten": { titel: "Zahlenkarten 1–4 (1 Seite = 1 Kind)", gruppe: "Rituale", art: "karten", proSeite: 4,
        items: [{ farbe: "#fde7c2", zahl: "1" }, { farbe: "#d8ebf7", zahl: "2" }, { farbe: "#e3f3e6", zahl: "3" }, { farbe: "#efe3f6", zahl: "4" }],
        hinweis: "Einmal für alle Themen: pro Kind eine Seite drucken, ausschneiden, laminieren – zusammen mit der roten und grünen Karte in einen Umschlag. Was 1–4 jeweils bedeutet, steht auf der Folie." },

    /* --- Gefühle --- */
    "vulkan-bild": { titel: "Bild: Vulki, der Vulkan", gruppe: "Gefühle", art: "karten", proSeite: 1, items: [{ bild: "vulkan", text: "Vulki" }], hinweis: "Für die Tafel beim Lerntext Kl. 1/2." },
    "wut-werkzeuge": { titel: "Kärtchen: Wut-Werkzeuge", gruppe: "Gefühle", art: "karten", proSeite: 8, uebung: "Werkzeugkasten sortieren",
        items: [{ emoji: "🌬️", text: "tief atmen" }, { emoji: "🔟", text: "bis 10 zählen" }, { emoji: "🚶", text: "kurz weggehen" }, { emoji: "🗣️", text: "jemandem erzählen" }, { emoji: "🧸", text: "Kissen fest drücken" }, { emoji: "🖍️", text: "die Wut malen" }, { emoji: "👊", text: "hauen" }, { emoji: "📢", text: "schreien" }],
        hinweis: "Ein Satz pro Tischpaar. Die Kinder sortieren: hilft – macht es schlimmer." },
    "trost-karten": { titel: "Trost-Karten", gruppe: "Gefühle", art: "karten", proSeite: 4, items: leer(4, { emoji: "💙", text: "Für dich!", linien: 3 }) },
    "mutmacher": { titel: "Mutmacher-Karten", gruppe: "Gefühle", art: "karten", proSeite: 8,
        items: [{ emoji: "💪", text: "Ich schaff das!" }, { emoji: "🪜", text: "Eins nach dem anderen." }, { emoji: "🌱", text: "Ich darf es versuchen." }, { emoji: "🫶", text: "Angst haben ist okay." }, { emoji: "🦁", text: "Ich bin mutig!" }, { emoji: "🌬️", text: "Tief atmen – los geht's!" }, { emoji: "⭐", text: "Mein Satz:", linien: 1 }, { emoji: "⭐", text: "Mein Satz:", linien: 1 }] },
    "perspektiv-brille": { titel: "Bastelvorlage: Perspektiv-Brille", gruppe: "Gefühle", art: "karten", proSeite: 2,
        items: leer(2, { svg: BRILLE, text: "Perspektiv-Brille", klein: "Ausschneiden, auf Pappe kleben, Gucklöcher ausschneiden, Bügel aus Pappstreifen ankleben." }) },

    /* --- Konflikte --- */
    "stopp-schild": { titel: "Stopp-Schild (rot)", gruppe: "Konflikte lösen", art: "karten", proSeite: 1, items: [{ svg: STOPP_ROT, klein: "Ausschneiden, auf Pappe kleben und an einem Stab befestigen." }] },
    "friedensweg": { titel: "Friedensweg: 4 Bodenkarten", gruppe: "Konflikte lösen", art: "karten", proSeite: 1,
        items: [{ svg: STOPP_ROT, text: "1 · Stopp!" }, { emoji: "🗣️", text: "2 · Ich sage, wie ich mich fühle." }, { emoji: "👂", text: "3 · Du sagst, wie du dich fühlst." }, { emoji: "🤝", text: "4 · Wir finden eine Lösung." }],
        hinweis: "Hintereinander auf den Boden legen – die Kinder gehen Schritt für Schritt." },
    "loesungskarten": { titel: "Lösungskarten (2 Sätze pro Seite)", gruppe: "Konflikte lösen", art: "karten", proSeite: 8, uebung: "Lösungs-Karten",
        items: [1, 2].flatMap(() => [{ emoji: "🔄", text: "Abwechseln" }, { emoji: "🍕", text: "Teilen" }, { emoji: "🤝", text: "Zusammen machen" }, { emoji: "🙋", text: "Hilfe holen" }]),
        hinweis: "Ausschneiden – jedes Kind bekommt einen Satz mit 4 Karten." },
    "ruheplaetze-liste": { titel: "Liste: Unsere Ruheplätze", gruppe: "Konflikte lösen", art: "liste", zeilen: 10, icon: "🪑", unter: "Hier kann ich runterkommen, wenn es in mir kocht.",
        spalten: ["Name", "🪑 Mein Ruheplatz im Raum", "🌳 Auf dem Schulhof", "🙋 Mein Erwachsener"],
        fuss: "Wer am Ruheplatz ist, wird in Ruhe gelassen." },
    "ruheplatz-karten": { titel: "Kärtchen: Mein Ruheplatz (4 pro Seite)", gruppe: "Konflikte lösen", art: "karten", proSeite: 4,
        items: Array.from({ length: 4 }, () => ({ emoji: "🪑", text: "Mein Ruheplatz:", linien: 2 })) },
    "kompromiss-plakat": { titel: "Plakat: So finden wir einen Kompromiss", gruppe: "Konflikte lösen", art: "plakat",
        punkte: [{ emoji: "🔄", text: "1 · Abwechseln – erst du, dann ich." }, { emoji: "✂️", text: "2 · Teilen – jeder bekommt die Hälfte." }, { emoji: "🤝", text: "3 · Zusammen machen – wir spielen es gemeinsam." }, { emoji: "🎲", text: "4 · Losen – Münze oder Würfel entscheidet." }],
        fuss: "Fair ist es, wenn beide etwas bekommen." },
    "erst-raus": { titel: "Plakat: Die Streit-Ampel", gruppe: "Konflikte lösen", art: "plakat",
        punkte: [{ emoji: "🟢", text: "1 · Kleiner Ärger: „Stopp“ sagen oder nicht beachten." }, { emoji: "🟡", text: "2 · Es kocht in mir: weggehen." }, { emoji: "🔴", text: "3 · Jemand tut weh oder droht: Erwachsenen holen." }, { emoji: "🗣️", text: "Später, wenn alle ruhig sind: reden." }],
        fuss: "Hauptsache: nicht zuhauen!" },
    "ich-botschaft": { titel: "Plakat: Ich-Botschaft", gruppe: "Konflikte lösen", art: "plakat",
        punkte: [{ emoji: "💭", text: "Ich fühle mich …" }, { emoji: "❓", text: "… weil …" }, { emoji: "🌟", text: "Ich wünsche mir, dass …" }], fuss: "Statt „Du bist so gemein!“ – sag, wie es dir geht." },
    "hilfe-fragen": { titel: "Plakat: Die drei Hilfe-Fragen", gruppe: "Konflikte lösen", art: "plakat", nummern: true,
        punkte: [{ emoji: "⚠️", text: "Ist jemand in Gefahr?" }, { emoji: "🤕", text: "Wird jemandem wehgetan?" }, { emoji: "🤔", text: "Kann ich es allein lösen?" }], fuss: "Gefahr oder Weh – dann hole ich Hilfe!" },
    "entschuldigungs-treppe": { titel: "Plakat: Die Entschuldigungs-Treppe", gruppe: "Konflikte lösen", art: "plakat", nummern: true,
        punkte: [{ text: "Ich sage, was ich getan habe." }, { text: "Ich sage, dass es falsch war." }, { text: "Ich verstehe, wie du dich fühlst." }, { text: "Ich mache es wieder gut." }] },
    "entschuldigung-situationen": { titel: "Situationskarten: Entschuldigung üben", gruppe: "Konflikte lösen", art: "karten", proSeite: 8, kopf: "Entschuldigung üben",
        items: ["Du hast den Radiergummi deines Nachbarn kaputt gemacht.", "Du hast jemanden in der Schlange geschubst.", "Du hast über ein Bild gelacht.", "Du hast ein Geheimnis weitererzählt.", "Du hast beim Spiel geschummelt.", "Du hast jemanden nicht mitspielen lassen.", "Du hast ein geliehenes Buch nass gemacht.", "Du hast „Blödmann“ gesagt."].map(t => ({ text: t })) },
    "konfliktkarten": { titel: "Konfliktkarten für die Kompromiss-Werkstatt", gruppe: "Konflikte lösen", art: "karten", proSeite: 8, kopf: "Konflikt", uebung: "Kompromiss-Werkstatt",
        items: ["Beide wollen am Fenster sitzen.", "Einer will Fußball spielen, der andere Fangen.", "Es gibt nur noch ein Stück Kuchen.", "Beide wollen die rote Schaufel.", "Beide wollen zuerst an den Computer.", "Beide wollen zuerst schaukeln.", "Einer will laute Musik, der andere Ruhe.", "Beide wollen beim Theater die Hauptrolle."].map(t => ({ text: t })) },
    "nein-karten": { titel: "NEIN-Karten zum Üben", gruppe: "Konflikte lösen", art: "karten", proSeite: 2, items: leer(2, { farbe: "#e74c3c", textfarbe: "#fff", emoji: "✋", text: "NEIN!", klein: "Das will ich nicht." }) },
    "nein-saetze": { titel: "Plakat: So kann ich Nein sagen", gruppe: "Konflikte lösen", art: "plakat",
        punkte: [{ emoji: "✋", text: "„Nein, das will ich nicht.“" }, { emoji: "🙅", text: "„Ohne mich.“" }, { emoji: "🚫", text: "„Da mache ich nicht mit.“" }, { emoji: "💡", text: "„Ich hab keine Lust darauf – lass uns lieber …“" }] },

    /* --- Freundschaft --- */
    "kompliment-zettel": { titel: "Kompliment-Zettel", gruppe: "Freundschaft", art: "karten", proSeite: 8, items: leer(8, { emoji: "💛", klein: "Für: ____________", text: "Ich finde toll, dass du …", linien: 2 }) },
    "einladungssaetze": { titel: "Plakat: Komm, spiel mit!", gruppe: "Freundschaft", art: "plakat",
        punkte: [{ emoji: "🤗", text: "„Willst du mitspielen?“" }, { emoji: "🙌", text: "„Komm, wir brauchen noch jemanden!“" }, { emoji: "⚽", text: "„Du kannst in unser Team.“" }, { emoji: "💡", text: "Unsere Regel: Wer fragt, darf mitmachen." }] },
    "pizza": { titel: "Pizza-Kreise zum Teilen", gruppe: "Freundschaft", art: "karten", proSeite: 4, sym: 92, items: leer(4, { svg: PIZZA, klein: "Ausschneiden und falten" }), hinweis: "Eine Pizza pro Kind." },
    "teilen-bildkarten": { titel: "Bildkarten: Kann man das teilen?", gruppe: "Freundschaft", art: "karten", proSeite: 8, uebung: "Teilen – ja oder nein?",
        items: [{ bild: "wachsmal", text: "Buntstifte" }, { bild: "zahnbuerste", text: "Zahnbürste" }, { bild: "teddy", text: "Kuscheltier" }, { bild: "keks", text: "Kekse" }, { bild: "fussball", text: "Ball" }, { bild: "buch", text: "Buch" }, { bild: "brot", text: "Pausenbrot" }, { emoji: "🤫", text: "ein Geheimnis" }] },
    "steh-auf-karten": { titel: "Fragekarten: Steh auf, wenn …", gruppe: "Freundschaft", art: "karten", proSeite: 8, kopf: "Steh auf, wenn …",
        items: [{ emoji: "🍕", text: "… du gern Pizza isst." }, { emoji: "🐶", text: "… du ein Haustier hast." }, { emoji: "⚽", text: "… du Fußball magst." }, { emoji: "👫", text: "… du Geschwister hast." }, { emoji: "🎨", text: "… du gern malst." }, { emoji: "📦", text: "… du schon einmal umgezogen bist." }, { emoji: "🌍", text: "… du mehr als eine Sprache sprichst." }, { emoji: "🎵", text: "… du gern singst." }] },
    "gespraechsstarter": { titel: "Plakat: Gute Fragen zum Kennenlernen", gruppe: "Freundschaft", art: "plakat",
        punkte: [{ emoji: "🎲", text: "„Was spielst du gern?“" }, { emoji: "🐶", text: "„Hast du ein Haustier?“" }, { emoji: "🍕", text: "„Was ist dein Lieblingsessen?“" }, { emoji: "⭐", text: "„Was kannst du richtig gut?“" }, { emoji: "📚", text: "„Was ist dein Lieblingsbuch oder -film?“" }] },

    /* --- Regeln & Miteinander --- */
    "gruppenregeln-leer": { titel: "Plakat: Unsere Gruppenregeln (leer)", gruppe: "Regeln & Miteinander", art: "plakat", unterschrift: true,
        punkte: leer(5, { text: "", linien: 1, symbolfeld: true }), hinweis: "Regeln eintragen, Symbole malen, alle unterschreiben." },
    "regel-vorschlag": { titel: "Zettel: Mein Regel-Vorschlag", gruppe: "Regeln & Miteinander", art: "karten", proSeite: 8, items: leer(8, { emoji: "📜", text: "Meine Regel:", linien: 2 }) },
    "zauberwoerter": { titel: "Karten: Zauberwörter", gruppe: "Regeln & Miteinander", art: "karten", proSeite: 6,
        items: [{ emoji: "🙏", text: "Bitte!" }, { emoji: "💐", text: "Danke!" }, { emoji: "👋", text: "Hallo!" }, { emoji: "😔", text: "Entschuldigung!" }, { emoji: "😊", text: "Gern geschehen!" }, { emoji: "🙋", text: "Tschüss!" }] },
    "dienste": { titel: "Dienste-Karten", gruppe: "Regeln & Miteinander", art: "karten", proSeite: 6,
        items: [{ emoji: "🪨", text: "Redestein-Wächter", linien: 1 }, { emoji: "🌡️", text: "Barometer-Helfer", linien: 1 }, { emoji: "🧽", text: "Tafel-Dienst", linien: 1 }, { emoji: "📄", text: "Austeil-Dienst", linien: 1 }, { emoji: "💡", text: "Fenster & Licht", linien: 1 }, { emoji: "⏰", text: "Zeitwächter", linien: 1 }],
        hinweis: "Fürs Plakat „Unsere Dienste“ – Namen von Hand eintragen." },
    "pausen-plakat": { titel: "Plakat: Unsere Pausen-Ideen (leer)", gruppe: "Regeln & Miteinander", art: "plakat", punkte: leer(5, { text: "", linien: 1, symbolfeld: true }) },

    /* --- Selbstwert & Stärken --- */
    "staerken-karten": { titel: "Karten für die Stärken-Dusche", gruppe: "Selbstwert & Stärken", art: "karten", proSeite: 4, items: leer(4, { emoji: "⭐", klein: "Für: ____________", text: "Deine Stärken:", linien: 4 }) },
    "mut-gesichter": { titel: "Plakat: Mut hat viele Gesichter", gruppe: "Selbstwert & Stärken", art: "plakat",
        punkte: [{ emoji: "🆕", text: "Etwas Neues probieren" }, { emoji: "🙋", text: "Einen Fehler zugeben" }, { emoji: "✋", text: "Nein sagen" }, { emoji: "🤝", text: "Jemandem helfen" }, { emoji: "🎤", text: "Vor anderen sprechen" }, { emoji: "🙏", text: "Um Entschuldigung bitten" }] },
    "noch-plakat": { titel: "Plakat: Ich kann das NOCH nicht!", gruppe: "Selbstwert & Stärken", art: "plakat",
        punkte: [{ emoji: "🌱", text: "„Ich übe weiter.“" }, { emoji: "🧩", text: "„Fehler zeigen mir, was ich üben kann.“" }, { emoji: "🙋", text: "„Ich frage um Hilfe.“" }, { emoji: "🪜", text: "„Schritt für Schritt.“" }], fuss: "Aus „Ich kann das nicht“ wird: „Ich kann das NOCH nicht.“" },
    "urkunde-stolz": { titel: "Stolz-Urkunde", gruppe: "Selbstwert & Stärken", art: "urkunde", bild: "medaille", text: "… kann stolz auf sich sein, weil:" },

    /* --- Kommunikation --- */
    "zuhoer-regeln": { titel: "Plakat: So höre ich gut zu", gruppe: "Kommunikation", art: "plakat",
        punkte: [{ emoji: "👀", text: "Augen schauen." }, { emoji: "👂", text: "Ohren hören." }, { emoji: "🤐", text: "Mund ist still." }, { emoji: "🧘", text: "Körper ist ruhig." }] },
    "statuen-karten": { titel: "Gefühls-Statuen (Körpersprache)", gruppe: "Kommunikation", art: "karten", proSeite: 6,
        items: ["müde", "stolz", "ängstlich", "gelangweilt", "froh", "wütend"].map(g => G(g)), hinweis: "Verdeckt ziehen und nur mit dem Körper zeigen." },
    "hilfe-saetze": { titel: "Plakat: So bitte ich um Hilfe", gruppe: "Kommunikation", art: "plakat",
        punkte: [{ emoji: "🙋", text: "„Kannst du mir bitte helfen?“" }, { emoji: "🤔", text: "„Ich verstehe … nicht.“" }, { emoji: "🧱", text: "„Ich komme hier nicht weiter.“" }, { emoji: "🔁", text: "„Ich habe schon … versucht.“" }] },

    /* --- Kooperation & Teamgeist --- */
    "team-regeln": { titel: "Plakat: So klappt Teamarbeit", gruppe: "Kooperation & Teamgeist", art: "plakat", nummern: true,
        punkte: [{ emoji: "🗺️", text: "Erst planen." }, { emoji: "👂", text: "Alle Ideen anhören." }, { emoji: "🧩", text: "Aufgaben verteilen." }, { emoji: "🤝", text: "Einander helfen." }] },
    "fairplay-saetze": { titel: "Plakat: Fair Play", gruppe: "Kooperation & Teamgeist", art: "plakat",
        punkte: [{ emoji: "🏆", text: "Gewinner: „Du warst auch gut.“" }, { emoji: "⚖️", text: "Gewinner: „Das war knapp!“" }, { emoji: "🤝", text: "Verlierer: „Glückwunsch!“" }, { emoji: "😄", text: "Verlierer: „Nächstes Mal krieg ich dich!“" }] },
    "urkunde-fairplay": { titel: "Fair-Play-Urkunde", gruppe: "Kooperation & Teamgeist", art: "urkunde", bild: "pokal", text: "… hat heute besonders fair gespielt." },
    "orchester-karten": { titel: "Klang-Karten fürs Orchester", gruppe: "Kooperation & Teamgeist", art: "karten", proSeite: 6,
        items: [{ emoji: "👏", text: "klatschen" }, { emoji: "🫰", text: "schnipsen" }, { emoji: "🥁", text: "auf den Tisch trommeln" }, { emoji: "🎵", text: "summen" }, { emoji: "🦶", text: "stampfen" }, { emoji: "🙌", text: "Hände reiben" }] },

    /* --- Achtsamkeit & Ruhe --- */
    "kasten-atmen": { titel: "Bild: Kasten-Atmen", gruppe: "Achtsamkeit & Ruhe", art: "karten", proSeite: 1, items: [{ svg: KASTEN, klein: "Mit dem Finger am Quadrat entlangfahren: einatmen – halten – ausatmen – halten (je bis 4 zählen)." }] },
    "ruhe-karten": { titel: "Ruhe-Karten", gruppe: "Achtsamkeit & Ruhe", art: "karten", proSeite: 4,
        items: [{ emoji: "🐢", text: "Schildkröten-Trick", klein: "Kopf auf die Arme, dreimal langsam atmen, wieder herauskommen." }, { emoji: "⬜", text: "Kasten-Atmen", klein: "4 ein – 4 halten – 4 aus – 4 halten." }, { emoji: "🔔", text: "Stille-Minute", klein: "Ganz still sein, bis der Ton verklungen ist." }, { emoji: "🖐️", text: "5-4-3-2-1", klein: "5 Dinge sehen, 4 spüren, 3 hören, 2 riechen, 1 schmecken." }] },
    "sinne-karten": { titel: "Karten: Meine fünf Sinne", gruppe: "Achtsamkeit & Ruhe", art: "karten", proSeite: 6,
        items: [{ emoji: "👀", text: "sehen", klein: "Augen" }, { emoji: "👂", text: "hören", klein: "Ohren" }, { emoji: "👃", text: "riechen", klein: "Nase" }, { emoji: "👅", text: "schmecken", klein: "Mund" }, { emoji: "✋", text: "fühlen", klein: "Hände" }, { leer: true }] },
    "danke-karten": { titel: "Danke-Karten", gruppe: "Achtsamkeit & Ruhe", art: "karten", proSeite: 4, items: leer(4, { emoji: "🌞", klein: "Für: ____________", text: "Danke, dass …", linien: 3 }) },
    "gluecksglas-zettel": { titel: "Zettel fürs Glücksglas", gruppe: "Achtsamkeit & Ruhe", art: "karten", proSeite: 12, items: leer(12, { emoji: "✨", text: "Ein schöner Moment:", linien: 2 }) },

    /* --- Vielfalt & Respekt --- */
    "sprachen-hallo": { titel: "Karten: Hallo in vielen Sprachen", gruppe: "Vielfalt & Respekt", art: "karten", proSeite: 8,
        items: [["Hallo!", "Deutsch"], ["Hello!", "Englisch"], ["¡Hola!", "Spanisch"], ["Merhaba!", "Türkisch"], ["مرحبا (Marhaban)", "Arabisch"], ["Привет (Priwet)", "Russisch"], ["Cześć!", "Polnisch"], ["Привіт (Pryvit)", "Ukrainisch"]].map(([t, s]) => ({ emoji: "👋", text: t, klein: s })),
        hinweis: "Kinder, die weitere Sprachen sprechen, ergänzen eigene Karten." },
    "zuschauer-plakat": { titel: "Plakat: Das können Zuschauer tun", gruppe: "Vielfalt & Respekt", art: "plakat",
        punkte: [{ emoji: "🙅", text: "Nicht mitlachen." }, { emoji: "🧍", text: "Mich zu dem Kind stellen." }, { emoji: "✋", text: "„Hör auf, das ist gemein!“ sagen." }, { emoji: "🧑‍🏫", text: "Hilfe holen." }, { emoji: "💙", text: "Das Kind später trösten." }] },
    "helfer-auftrag": { titel: "Karten: Geheimer Helfer-Auftrag", gruppe: "Vielfalt & Respekt", art: "karten", proSeite: 8,
        items: leer(8, { emoji: "🕵️", text: "Geheimer Auftrag", klein: "Tu diesem Kind diese Woche heimlich etwas Gutes:", linien: 1 }) },
    /* --- Vertretung --- */
    "geschichten-bildkarten": { titel: "Bildkarten für den Geschichten-Würfel", gruppe: "Vertretung", art: "karten", proSeite: 12,
        items: ["einhorn", "rakete", "schluessel", "krone", "schiff", "dino", "geschenk", "lupe", "ufo", "regenbogen", "pinguin", "kuchen"].map(b => ({ bild: b })), hinweis: "Ausschneiden; verdeckt drei Karten ziehen lassen." },
    "montagsmaler-begriffe": { titel: "Begriffskarten für Montagsmaler", gruppe: "Vertretung", art: "karten", proSeite: 12,
        items: [["☀️", "Sonne"], ["🏠", "Haus"], ["🐱", "Katze"], ["🌳", "Baum"], ["🚗", "Auto"], ["🐟", "Fisch"], ["⛄", "Schneemann"], ["🍦", "Eis"], ["🌷", "Blume"], ["🚀", "Rakete"], ["👓", "Brille"], ["🎂", "Kuchen"]].map(([e, t]) => ({ emoji: e, text: t })),
        hinweis: "Das Bild hilft Kindern, die noch nicht lesen. Verdeckt ziehen." },
    "bewegungs-karten": { titel: "Bewegungskarten", gruppe: "Vertretung", art: "karten", proSeite: 8,
        items: [{ emoji: "🐸", text: "5-mal hüpfen wie ein Frosch" }, { emoji: "🦩", text: "Auf einem Bein stehen bis 10" }, { emoji: "🌀", text: "Arme kreisen – vorwärts und rückwärts" }, { emoji: "🐢", text: "In Zeitlupe aufstehen und hinsetzen" }, { emoji: "🏃", text: "10 Sekunden auf der Stelle rennen" }, { emoji: "🙆", text: "Ganz groß machen – ganz klein machen" }, { emoji: "👏", text: "3-mal klatschen, 3-mal stampfen" }, { emoji: "🌳", text: "Baum-Stellung: still wie ein Baum" }] },
    "tier-karten": { titel: "Tierkarten für „Wer bin ich?“", gruppe: "Vertretung", art: "karten", proSeite: 12,
        items: ["elefant", "giraffe", "pinguin", "krokodil", "affe", "loewe", "schildkroete", "hase", "eule", "frosch", "kaenguru", "igel"].map(b => ({ bild: b, text: (window.LT_BILDER && window.LT_BILDER[b] ? window.LT_BILDER[b][0] : b) })) },
    "schatz-hinweise": { titel: "Hinweiskarten für die Schatzsuche", gruppe: "Vertretung", art: "karten", proSeite: 8,
        items: Array.from({ length: 8 }, (_, i) => ({ emoji: "🗺️", text: "Hinweis " + (i + 1), linien: 2 })), hinweis: "Hinweise von Hand eintragen und im Raum verstecken." },
    "schutzsaetze-familie": { titel: "Plakat: Familie ist tabu – meine Schutzsätze", gruppe: "Klartext (Kl. 3/4)", art: "plakat",
        punkte: [{ emoji: "🛡️", text: "„Meine Mutter kennst du gar nicht.“" }, { emoji: "🚫", text: "„Lass meine Familie da raus.“" }, { emoji: "🪞", text: "„Das sagt mehr über dich als über sie.“" }, { emoji: "🧊", text: "„Ich geb dir nicht, was du willst.“" }, { emoji: "🚶", text: "Umdrehen, weggehen, Aufsicht holen." }],
        fuss: "Wer auf Familie geht, will dich ausrasten sehen. Gib ihm das nicht." },
    "grenzen-gewalt": { titel: "Plakat: Die absoluten Grenzen", gruppe: "Klartext (Kl. 3/4)", art: "plakat",
        punkte: [{ emoji: "🧠", text: "Nie gegen den Kopf – kein Schlag, kein Tritt." }, { emoji: "🛑", text: "Wer am Boden liegt: sofort Schluss." }, { emoji: "🔪", text: "Keine Gegenstände, keine Waffen." }, { emoji: "👥", text: "Nie zu mehreren auf einen." }, { emoji: "📵", text: "Zuschauer filmen nicht – sie holen Hilfe." }],
        fuss: "Notfall: 112 · Diese Grenzen gelten immer – auch wenn du wütend bist." },
    "pflaster": { titel: "Papier-Pflaster fürs Pflaster-Spiel", gruppe: "Vielfalt & Respekt", art: "karten", proSeite: 8, sym: 34, items: leer(8, { svg: PFLASTER }), hinweis: "Ausschneiden; mit etwas Klebeband aufkleben." }
};

/* Welche Vorlagen gehören zu welcher fertigen Stunde */
const ZUORDNUNG = {
    "v-gefuehle-erkennen": ["gefuehlskarten-gross", "gefuehlskarten-klein"],
    "v-streit-loesen": ["erst-raus", "zahlenkarten", "ruheplaetze-liste", "ruheplatz-karten"],
    "v-freundschaft": ["namenszettel", "kompliment-zettel"],
    "v-regeln-miteinander": ["gruppenregeln-leer", "regel-vorschlag"],
    "v-wut-werkzeugkasten": ["vulkan-bild", "wut-werkzeuge"],
    "v-traurig-troesten": ["trost-karten"],
    "v-angst-okay": ["mutmacher"],
    "v-empathie": ["perspektiv-brille", "gefuehlskarten-klein"],
    "v-petzen-hilfe": ["rot-gruen", "hilfe-fragen"],
    "v-entschuldigen": ["entschuldigungs-treppe", "entschuldigung-situationen"],
    "v-kompromisse": ["kompromiss-plakat", "zahlenkarten"],
    "v-nein-sagen": ["nein-karten", "nein-saetze"],
    "v-mitspielen-lassen": ["einladungssaetze"],
    "v-teilen": ["pizza", "teilen-bildkarten"],
    "v-neue-freunde": ["steh-auf-karten", "gespraechsstarter"],
    "v-hoeflichkeit": ["zauberwoerter"],
    "v-verantwortung": ["dienste"],
    "v-pause-fair": ["rot-gruen", "pausen-plakat"],
    "v-meine-staerken": ["staerken-karten"],
    "v-mutig-sein": ["mut-gesichter"],
    "v-fehler-lernhelfer": ["noch-plakat"],
    "v-stolz-auf-mich": ["urkunde-stolz"],
    "v-zuhoeren": ["zuhoer-regeln"],
    "v-komplimente": ["namenszettel", "kompliment-zettel"],
    "v-koerpersprache": ["statuen-karten"],
    "v-um-hilfe-bitten": ["hilfe-saetze"],
    "v-gemeinsam": ["team-regeln"],
    "v-gewinnen-verlieren": ["fairplay-saetze", "urkunde-fairplay"],
    "v-jeder-ist-wichtig": ["orchester-karten"],
    "v-ruhig-werden": ["kasten-atmen", "ruhe-karten", "ruheplaetze-liste"],
    "v-alle-sinne": ["sinne-karten"],
    "v-dankbarkeit": ["danke-karten", "gluecksglas-zettel"],
    "v-alle-verschieden": ["sprachen-hallo"],
    "v-auslachen": ["zuschauer-plakat"],
    "v-hilfsbereitschaft": ["helfer-auftrag", "namenszettel"],
    "v-gerecht": ["pflaster"]
};
// Wofür ist das Material? (wird beim Material angezeigt)
const WOZU = {
"ruheplaetze-liste": "Für „Unser Ruheplatz“: Trag ein, wo jedes Kind hingeht, wenn es kocht – und welchen Erwachsenen es holt. Entweder von Hand auf dem Ausdruck oder mit „Digital ausfüllen“ (wird nicht gespeichert). Dann im Klassenraum aufhängen.",
"ruheplatz-karten": "Jedes Kind schreibt oder malt seinen Ruheplatz auf ein Kärtchen – für die Mappe oder das Mäppchen.",
"erst-raus": "Hängt die ganze Stunde an der Tafel: Bei „Was jetzt?“ zeigen die Kinder 1, 2 oder 3 – das Plakat erklärt, was die Zahlen heißen. Danach dauerhaft im Raum lassen.",
"gefuehlsbarometer": "Für das Ritual am Anfang: Die Gesichter hängen an der Tafel, jedes Kind steckt seine Klammer an sein Gefühl.",
"gespraechsregeln": "Hängt dauerhaft im Raum. Wenn es laut wird: Kurz auf das Plakat zeigen, statt zu ermahnen.",
"namenszettel": "Für Übungen, bei denen Namen gezogen werden (z. B. Kompliment-Post). Einmal ausfüllen lassen und aufbewahren.",
"ablauf-karten": "Hängen die ganze Stunde an der Tafel. Was erledigt ist, drehst du um – die Kinder sehen, wo ihr gerade seid.",
"ruhezeichen": "Hältst du hoch, wenn es ruhig werden soll – statt laut zu rufen. Vorher einmal mit der Gruppe vereinbaren.",
"redekarte": "Wer die Karte hat, spricht – die anderen hören zu. Wandert im Gesprächskreis weiter.",
"begruessung-plakat": "Hängt beim Ankommen an der Tafel. Die Kinder wählen, wie sie begrüßt werden möchten.",
"klammer-etiketten": "Auf Wäscheklammern kleben – jedes Kind hat seine Klammer fürs Gefühlsbarometer.",
"barometer-plakat": "Alternative zu den Gesichtern: ein Plakat für das Gefühlsbarometer, die Kinder stecken ihre Klammer daneben.",
"abschluss-saetze": "Für die Abschlussrunde Kl. 3/4: Ein Satzstreifen an die Tafel, jedes Kind ergänzt ihn.",
"abschluss-gesichter": "Für die Abschlussrunde Kl. 1/2: Jedes Kind zeigt, wie die Stunde für es war.",
"murmelglas": "Belohnungssystem: Für gutes Miteinander kommt eine Murmel (oder ein Kreuz) ins Glas. Volles Glas = Gruppenspiel.",
"gutschein-spiel": "Die Belohnung, wenn das Murmelglas voll ist.",
"gefuehlskarten-gross": "Hältst du beim Vorlesen hoch, wenn ein Gefühl vorkommt – oder hängst sie an die Tafel.",
"gefuehlskarten-klein": "Verdeckt ziehen für Pantomime und Gefühls-Raten.",
"rot-gruen": "Pro Kind eine rote und eine grüne Karte – für alle Abstimmungen, bei denen die Folie Rot und Grün zeigt.",
"zahlenkarten": "Pro Kind ein Satz 1–4 – für alle Abstimmungen, bei denen die Folie Zahlen zeigt (z. B. 1 = Abwechseln, 2 = Teilen …).",
"vulkan-bild": "Zeigst du beim Vorlesen der Geschichte von Vulki – oder hängst es an die Tafel.",
"wut-werkzeuge": "Für die Übung „Werkzeugkasten sortieren“: Jedes Tischpaar bekommt einen Satz und sortiert.",
"trost-karten": "Für die Trost-Post: Die Kinder malen oder schreiben darauf.",
"mutmacher": "Jedes Kind sucht sich eine Karte aus und nimmt sie mit – als Mutmacher für die Hosentasche.",
"perspektiv-brille": "Ausschneiden und basteln – wer die Brille aufsetzt, spricht als die andere Person.",
"stopp-schild": "Hältst du hoch, wenn in der Geschichte „Stopp!“ gesagt wird, und beim Stopp-Chor als Zeichen: Jetzt aufstehen und Stopp-Hand zeigen.",
"friedensweg": "Wird in der aktuellen Fassung nicht mehr gebraucht – nur falls du den Friedensweg trotzdem machen möchtest.",
"loesungskarten": "Wird nicht mehr gebraucht – die Lösungen zeigen die Kinder jetzt mit den Zahlenkarten 1–4.",
"ich-botschaft": "Hängt an der Tafel, solange ihr Ich-Botschaften übt. Die Kinder schauen darauf, wenn sie einen Satz bilden.",
"hilfe-fragen": "Hängt an der Tafel bei „Petzen oder Hilfe holen?“ – die Kinder prüfen damit jede Situation.",
"entschuldigungs-treppe": "Hängt an der Tafel, während die Tischpaare die Entschuldigung üben.",
"entschuldigung-situationen": "Für die Entschuldigungs-Treppe: Jedes Tischpaar zieht eine Karte und übt damit.",
"konfliktkarten": "Für die Kompromiss-Werkstatt: Jedes Tischpaar zieht eine Karte und sucht eine Lösung.",
"kompromiss-plakat": "Für die Kompromiss-Werkstatt: Hängt an der Tafel, während die Kinder mit den Zahlenkarten 1–4 abstimmen. Kann danach dauerhaft hängen bleiben – bei echtem Streit zeigst du einfach drauf.",
"nein-karten": "Die Kinder halten die Karte hoch, während sie laut „Nein!“ sagen.",
"nein-saetze": "Hängt an der Tafel – die Kinder suchen sich daraus ihren Nein-Satz aus.",
"kompliment-zettel": "Für die Kompliment-Post: Jedes Kind malt oder schreibt sein Kompliment darauf.",
"einladungssaetze": "Hängt an der Tafel, während die Tischpaare das Einladen üben.",
"pizza": "Für „Pizza teilen“: Jedes Kind bekommt einen Kreis zum Falten.",
"teilen-bildkarten": "Optional – die Dinge stehen auch einzeln auf den Folien.",
"steh-auf-karten": "Optional – die Sätze stehen auch einzeln auf den Folien.",
"gespraechsstarter": "Hängt an der Tafel – Ideen für gute Fragen beim Kennenlernen.",
"gruppenregeln-leer": "Für das Regelplakat: Hier tragt ihr eure abgestimmten Regeln ein.",
"regel-vorschlag": "Jedes Kind schreibt oder malt seinen Regel-Vorschlag darauf.",
"zauberwoerter": "Hängen an der Tafel als Erinnerung an die Zauberwörter.",
"dienste": "Für „Unsere Dienste“: Jedes Kind wählt eine Karte, die Karten hängen am Plakat.",
"pausen-plakat": "Für den Pausen-Plan: Hier kommen die Ideen der Kinder drauf.",
"staerken-karten": "Für die Stärken-Dusche: Du schreibst die Stärken darauf, das Kind darf die Karte behalten.",
"mut-gesichter": "Hängt an der Tafel – zeigt die verschiedenen Arten von Mut.",
"noch-plakat": "Hängt an der Tafel – Erinnerung an das Wort „noch“.",
"urkunde-stolz": "Zum Verschenken am Ende der Stunde.",
"zuhoer-regeln": "Hängt an der Tafel – so sieht ein Zuhör-Körper aus.",
"statuen-karten": "Verdeckt ziehen für „Statuen raten“.",
"hilfe-saetze": "Hängt an der Tafel – die Kinder suchen sich ihren Hilfe-Satz aus.",
"team-regeln": "Hängt an der Tafel bei der Teamarbeit.",
"fairplay-saetze": "Hängt an der Tafel – Sätze für gute Gewinner und Verlierer.",
"urkunde-fairplay": "Zum Verschenken an ein Kind, das besonders fair war.",
"orchester-karten": "Für das Klang-Orchester: Jedes Kind zieht seinen Klang.",
"kasten-atmen": "Hängt an der Tafel – die Kinder fahren das Quadrat beim Atmen mit dem Finger nach.",
"ruhe-karten": "Zum Mitnehmen: kleine Erinnerung an die Ruhe-Tricks.",
"sinne-karten": "Hängen an der Tafel – die fünf Sinne zum Zeigen.",
"danke-karten": "Für die Danke-Karte: Die Kinder malen oder schreiben darauf.",
"gluecksglas-zettel": "Für die Glücksmomente: Jeder Moment kommt auf einen Zettel ins Glas.",
"sprachen-hallo": "Hängen an der Tafel – „Hallo“ in vielen Sprachen.",
"zuschauer-plakat": "Hängt an der Tafel – was Zuschauer tun können.",
"helfer-auftrag": "Für die Geheimen Helfer: Jedes Kind zieht einen Auftrag.",
"geschichten-bildkarten": "Für die Geschichten-Kette und „Meine drei Bilder“: verdeckt ziehen.",
"montagsmaler-begriffe": "Für Montagsmaler: verdeckt ziehen und malen.",
"bewegungs-karten": "Für den Bewegungs-Würfel: Ein Kind zieht, die Augenzahl sagt, wie oft.",
"tier-karten": "Für „Wer bin ich?“: verdeckt ziehen.",
"schatz-hinweise": "Für die Schatzsuche: vor der Stunde im Raum verstecken.",
"schutzsaetze-familie": "Hängt an der Tafel – die Kinder suchen sich daraus ihren Schutzsatz aus.",
"grenzen-gewalt": "Hängt dauerhaft im Raum – die Grenzen, die immer gelten.",
"pflaster": "Für das Pflaster-Spiel: Du klebst jedem Kind eins auf."
};
Object.keys(WOZU).forEach(k => { if (B[k]) B[k].wozu = WOZU[k]; });
const ALLGEMEIN = ["ablauf-karten", "ruhezeichen", "redekarte", "begruessung-plakat", "namenszettel", "gefuehlsbarometer", "barometer-plakat", "klammer-etiketten",
    "gespraechsregeln", "rot-gruen", "zahlenkarten", "abschluss-saetze", "abschluss-gesichter", "murmelglas", "gutschein-spiel"];
/* Material je Ritual (Reihenfolge wie in der Stunde) */
const RITUAL_MATERIAL = [
    { ritual: "Stundenablauf & Ruhezeichen", text: "Hängt die ganze Stunde sichtbar – die Kinder wissen immer, wo ihr seid.", ids: ["ablauf-karten", "ruhezeichen"] },
    { ritual: "Begrüßung", text: "Redestein oder Redekarte, Ablauf als Plakat.", ids: ["redekarte", "begruessung-plakat", "namenszettel"] },
    { ritual: "Gefühlsbarometer", text: "Gesichter oder Plakat an die Tafel, dazu eine Klammer pro Kind.", ids: ["gefuehlsbarometer", "barometer-plakat", "klammer-etiketten"] },
    { ritual: "Gesprächsregeln", text: "Hängen dauerhaft im Raum.", ids: ["gespraechsregeln"] },
    { ritual: "Antwortkarten", text: "Ein Set pro Kind für alle Themen: rote und grüne Karte plus Zahlenkarten 1–4. Einmal laminieren, im Umschlag aufbewahren.", ids: ["rot-gruen", "zahlenkarten"] },
    { ritual: "Abschluss", text: "Satzanfänge für Kl. 3/4, Gesichter für Kl. 1/2.", ids: ["abschluss-saetze", "abschluss-gesichter"] },
    { ritual: "Belohnung", text: "Murmelglas und Gutschein für das Gruppenspiel.", ids: ["murmelglas", "gutschein-spiel"] },
];

/* ---------------- Material einer Stunde ---------------- */
function aufzaehlung(text){ return String(text || "").split("\n").filter(z => /^\s*[-•]\s+/.test(z)).map(z => z.replace(/^\s*[-•]\s+/, "").trim()); }
function bibIds(e){
    if (e.materialien && Array.isArray(e.materialien.bib)) return e.materialien.bib.filter(id => B[id]);
    if (Array.isArray(e.materialIds)) return e.materialIds.filter(id => B[id]);
    return ZUORDNUNG[e.ersetzt || e.id] || [];
}
function materialFuer(e){
    const ids = bibIds(e);
    const liste = ids.map(id => Object.assign({ id }, B[id]));
    // eigene Kartensätze aus dem Editor
    ((e.materialien && e.materialien.eigene) || []).forEach((k, i) => {
        if (k && Array.isArray(k.karten) && k.karten.length) liste.push({ id: "eigen-" + i, titel: k.titel || "Eigene Karten", art: "karten", proSeite: 8, kopf: k.titel || "", items: k.karten.map(t => ({ text: t })), eigen: true });
    });
    // Situationskarten automatisch aus Übungen mit Aufzählung (außer es gibt dafür schon passende Karten)
    const abgedeckt = new Set(liste.map(m => m.uebung).filter(Boolean));
    // Situationen stehen jetzt einzeln auf den Folien – automatische Situationskarten nur noch auf ausdrücklichen Wunsch
    if (e.materialien && e.materialien.autoKarten) (e.uebungen || []).forEach((u, i) => {
        const punkte = aufzaehlung(u.text);
        if (punkte.length >= 3 && !abgedeckt.has(u.titel)) liste.push({ id: "auto-" + i, titel: "Situationskarten: " + u.titel, art: "karten", proSeite: 8, kopf: u.titel, items: punkte.map(t => ({ text: t })), auto: true, hinweis: "Aus der Übung erzeugt – zum Vorlesen oder verdeckt Ziehen." });
    });
    return liste;
}

/* ---------------- Seiten bauen ---------------- */
const RASTER = { 1: [1, 1], 2: [1, 2], 4: [2, 2], 6: [2, 3], 8: [2, 4], 12: [3, 4] };
const GROESSE = { 1: { sym: 150, txt: 46, kopf: 11 }, 2: { sym: 78, txt: 34, kopf: 10 }, 4: { sym: 46, txt: 22, kopf: 9 }, 6: { sym: 36, txt: 18, kopf: 8 }, 8: { sym: 28, txt: 15, kopf: 7.5 }, 12: { sym: 20, txt: 12, kopf: 7 } };
function seite(klasse){ const s = document.createElement("div"); s.className = "mseite " + (klasse || ""); return s; }
function fussHtml(m, nr, von){ return `<div class="m-fuss"><span>${esc((window.BEREICH && window.BEREICH.name) || "Sozialtraining")} · ${esc(m.titel)}</span><span>${von > 1 ? nr + " / " + von : ""}</span></div>`; }
function symbolHtml(it){
    if (it.svg) return it.svg;
    if (it.gesicht) return gesichtBunt(it.gesicht);
    if (it.bild) return ltBild(it.bild);
    if (it.emoji) return `<span>${it.emoji}</span>`;
    if (it.zahl) return `<span style="font-family:Nunito,sans-serif;font-weight:900;color:#16324a">${esc(it.zahl)}</span>`;
    return "";
}
function kartenSeiten(m){
    const pro = RASTER[m.proSeite] ? m.proSeite : 8;
    const [sp, ze] = RASTER[pro], gr = GROESSE[pro];
    const items = m.items || [];
    const seiten = [];
    for (let i = 0; i < Math.max(1, items.length); i += pro) {
        const teil = items.slice(i, i + pro);
        while (teil.length < pro && pro > 1 && items.length > pro) teil.push({ leer: true });
        const s = seite("mkarten pro" + pro);
        s.innerHTML = `<div class="m-raster" style="grid-template-columns:repeat(${sp},1fr);grid-template-rows:repeat(${ze},1fr);--sym:${m.sym || gr.sym}mm;--txt:${gr.txt};--kopf:${gr.kopf}">` +
            teil.map(it => {
                if (it.leer && !it.text && !it.emoji && !it.svg) return `<div class="mkarte leer"></div>`;
                const nurText = !it.svg && !it.gesicht && !it.bild && !it.emoji && !it.zahl && !it.linien;
                const stil = it.farbe ? ` style="background:${it.farbe};color:${it.textfarbe || "#1b1b1b"}"` : "";
                const sym = symbolHtml(it);
                return `<div class="mkarte${nurText ? " nur-text" : ""}"${stil}>` +
                    (m.kopf ? `<div class="mk-kopf"${it.textfarbe ? ` style="color:${it.textfarbe}"` : ""}>${esc(m.kopf)}</div>` : "") +
                    (sym ? `<div class="mk-symbol">${sym}</div>` : "") +
                    (it.klein && it.text ? `<div class="mk-klein"${it.textfarbe ? ` style="color:${it.textfarbe}"` : ""}>${esc(it.klein)}</div>` : "") +
                    (it.text ? `<div class="mk-text">${inline(it.text)}</div>` : "") +
                    (it.klein && !it.text ? `<div class="mk-klein">${esc(it.klein)}</div>` : "") +
                    (it.linien ? `<div class="mk-linien">${'<div class="mk-linie"></div>'.repeat(it.linien)}</div>` : "") +
                    `</div>`;
            }).join("") + `</div>`;
        seiten.push(s);
    }
    const von = seiten.length;
    seiten.forEach((s, k) => s.insertAdjacentHTML("beforeend", fussHtml(m, k + 1, von)));
    return seiten;
}
function plakatSeite(m){
    const s = seite("mplakat");
    s.innerHTML = `<div class="mp-titel">${esc(String(m.titel).replace(/^Plakat:\s*/, "").replace(/\s*\(leer\)\s*$/, ""))}</div>
        <div class="mp-liste">${(m.punkte || []).map((p, i) => `<div class="mp-punkt">
            <span class="mp-zeichen">${m.nummern ? (i + 1) : (p.emoji || "•")}</span>${m.nummern && p.emoji ? `<span style="font-size:1.6em;line-height:1">${p.emoji}</span>` : ""}
            ${p.text ? `<span class="mp-text">${inline(p.text)}</span>` : ""}${p.linien ? '<span class="mp-linie"></span>' : ""}${p.symbolfeld ? '<span class="mp-symbolfeld"></span>' : ""}</div>`).join("")}</div>
        ${m.fuss ? `<div class="mp-fuss">${inline(m.fuss)}</div>` : ""}
        ${m.unterschrift ? `<div class="mp-unterschrift">Unsere Unterschriften:<div class="linien"><span></span><span></span><span></span></div><div class="linien"><span></span><span></span><span></span></div><div class="linien"><span></span><span></span><span></span></div></div>` : ""}` + fussHtml(m, 1, 1);
    return s;
}
function urkundeSeite(m){
    const s = seite("murkunde");
    s.innerHTML = `<div class="mu-rahmen"><div class="mu-sterne">★ ★ ★ ★ ★</div><div class="mu-titel">${esc(m.titel)}</div>
        <div class="mu-bild">${ltBild(m.bild || "pokal")}</div>
        <div class="mu-zeile"><span>Für</span><span class="l"></span></div>
        <div class="mu-text">${esc(m.text || "")}</div>
        <div class="mu-linien"><span></span><span></span></div>
        <div class="mu-unten"><div>Datum</div><div>Unterschrift</div></div></div>`;
    return s;
}
// Liste zum Aufhängen: Tabelle – auf Papier von Hand oder hier digital ausfüllen.
// Digital eingetragene Werte (z. B. Vornamen) bleiben NUR im Arbeitsspeicher dieser Seite – nie gespeichert oder gesendet.
const listenWerte = {};
const LISTEN_FARBEN = ["#16324a", "#2e8b57", "#3d7ea6", "#c98a1b", "#8e44ad"];
function listeSeite(m){
    const s = seite("mliste");
    const sp = m.spalten || [], werte = listenWerte[m.id] || [];
    const n = Math.max(m.zeilen || 10, werte.filter(z => z && z.some(Boolean)).length);
    s.innerHTML = `<div class="ml-band"></div>
        <div class="ml-kopf"><span class="ml-icon">${esc(m.icon || "🪑")}</span><div><div class="ml-titel">${esc(m.titel.replace(/^Liste:\s*/, ""))}</div>${m.unter ? `<div class="ml-unter">${inline(m.unter)}</div>` : ""}</div></div>
        <table class="ml-tab"><tr>${sp.map((c, i) => `<th style="background:${LISTEN_FARBEN[i % LISTEN_FARBEN.length]}${i === 0 ? ";width:22%" : ""}">${inline(c)}</th>`).join("")}</tr>
        ${Array.from({ length: n }, (_, z) => "<tr>" + sp.map((_, i) => `<td>${esc((werte[z] || [])[i] || "")}</td>`).join("") + "</tr>").join("")}</table>
        ${m.fuss ? `<div class="ml-fuss">🤫 ${inline(m.fuss)}</div>` : ""}` + fussHtml(m, 1, 1);
    return s;
}
function ausfuellen(m, fertig){
    cssLaden();
    const sp = m.spalten || [], n = m.zeilen || 10;
    const werte = listenWerte[m.id] = listenWerte[m.id] || [];
    const o = document.createElement("div");
    o.className = "ml-dialog-hg";
    o.innerHTML = `<div class="ml-dialog" role="dialog" aria-modal="true">
        <h2>${esc(m.icon || "")} ${esc(m.titel.replace(/^Liste:\s*/, ""))} ausfüllen</h2>
        <p class="ml-hinweis">🔒 Wird nicht gespeichert – die Einträge bleiben nur, solange diese Seite offen ist. Danach einfach drucken.</p>
        <div class="ml-scroll"><table class="ml-form"><tr>${sp.map(c => `<th>${inline(c)}</th>`).join("")}</tr>
        ${Array.from({ length: n }, (_, z) => "<tr>" + sp.map((_, i) => `<td><input type="text" data-z="${z}" data-s="${i}" value="${esc((werte[z] || [])[i] || "")}" maxlength="40"></td>`).join("") + "</tr>").join("")}</table></div>
        <div class="ml-knoepfe"><button class="btn gold" data-ml="drucken"><i class="fa-solid fa-print"></i> Drucken</button><button class="btn" data-ml="fertig">Fertig</button><button class="btn rot" data-ml="leeren">Alles leeren</button></div></div>`;
    o.addEventListener("input", ev => { const t = ev.target; if (!t.dataset.z) return; (werte[+t.dataset.z] = werte[+t.dataset.z] || [])[+t.dataset.s] = t.value; });
    o.addEventListener("click", ev => {
        const a = ev.target.closest("[data-ml]"); if (ev.target === o) { o.remove(); fertig && fertig(); return; } if (!a) return;
        if (a.dataset.ml === "leeren") { if (!confirm("Alle Einträge löschen?")) return; werte.length = 0; o.querySelectorAll("input").forEach(x => x.value = ""); return; }
        o.remove(); fertig && fertig();
        if (a.dataset.ml === "drucken") drucken([m], m.titel);
    });
    document.body.appendChild(o);
    const erstes = o.querySelector("input"); if (erstes) erstes.focus();
}
function seitenBauen(m){
    if (m.art === "liste") return [listeSeite(m)];
    if (m.art === "plakat") return [plakatSeite(m)];
    if (m.art === "urkunde") return [urkundeSeite(m)];
    return kartenSeiten(m);
}

/* ---------------- Einpassen (Seite muss im Dokument hängen) ---------------- */
function passt(el){ return el.scrollHeight <= el.clientHeight + 1 && el.scrollWidth <= el.clientWidth + 1; }
function einpassen(s){
    if (s.classList.contains("mplakat")) {
        // Seite UND jeder einzelne Punkt müssen passen (Punkte schrumpfen sonst unbemerkt)
        const ok = () => passt(s) && [...s.querySelectorAll(".mp-punkt")].every(passt);
        let lo = 9, hi = 30;
        s.style.fontSize = hi + "pt";
        if (!ok()) { for (let i = 0; i < 10; i++) { const m = (lo + hi) / 2; s.style.fontSize = m + "pt"; if (ok()) lo = m; else hi = m; } s.style.fontSize = lo + "pt"; }
        return;
    }
    s.querySelectorAll(".mkarte").forEach(k => {
        let f = 1;
        k.style.setProperty("--f", "1");
        while (!passt(k) && f > .35) { f -= .05; k.style.setProperty("--f", f.toFixed(2)); }
    });
}

/* ---------------- Vorschau und Druck ---------------- */
function cssLaden(){ if (!document.getElementById("materialCss")) { const st = document.createElement("style"); st.id = "materialCss"; st.textContent = CSS; document.head.appendChild(st); } }
async function vorschau(rahmen, m){
    cssLaden();
    rahmen.innerHTML = "";
    const s = seitenBauen(m)[0];
    s.style.position = "absolute"; s.style.top = "0"; s.style.left = "0"; s.style.transformOrigin = "top left";
    rahmen.appendChild(s);
    const skal = () => { const f = (rahmen.clientWidth || 190) / s.offsetWidth; s.style.transform = `scale(${f})`; rahmen.style.height = (s.offsetHeight * f) + "px"; };
    skal();
    einpassen(s);
    await schriften();
    einpassen(s); skal();
}
async function drucken(liste, titel){
    cssLaden();
    const ziel = document.getElementById("druck");
    ziel.innerHTML = "";
    const seiten = [];
    liste.forEach(m => seitenBauen(m).forEach(s => { ziel.appendChild(s); seiten.push(s); }));
    await schriften();
    seiten.forEach(einpassen);
    const alt = document.title;
    document.title = titel || "Arbeitsmaterial";
    window.addEventListener("afterprint", () => { ziel.innerHTML = ""; document.title = alt; }, { once: true });
    setTimeout(() => window.print(), 80);
}
function seitenZahl(m){ return m.art === "karten" ? Math.max(1, Math.ceil((m.items || []).length / (RASTER[m.proSeite] ? m.proSeite : 8))) : 1; }

window.sozialMaterial = { ausfuellen, bibliothek: B, zuordnung: ZUORDNUNG, allgemein: ALLGEMEIN, rituale: RITUAL_MATERIAL, fuer: materialFuer, bibIds, vorschau, drucken, seitenZahl, seitenBauen, einpassen, cssLaden };
})();
