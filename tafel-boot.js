/* ===============================================================
   Bootsfahrt zum Leuchtturm – Lernspiel für die Grundschule (Kl. 1–4)
   Mathe und Deutsch. Jede richtige Antwort bringt das Boot eine Boje weiter.
   Zwei Arten: an der Tafel (Klasse gegen Eule Ella) oder allein am iPad/Handy.
   Wörter und Bilder kommen aus lernangebot-woerter.js / bilder.js.
   =============================================================== */
(function(){
"use strict";
const zuf = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const nimm = l => l[Math.floor(Math.random() * l.length)];
const mischen = l => { const a = l.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const BILD = k => (window.LT_BILDER && window.LT_BILDER[k]) ? window.LT_BILDER[k][2] : "";
const D = () => window.LERN_DATEN || { woerter: [], reime: [], wortarten: { Nomen: [], Verben: [], Adjektive: [] } };
const fz = n => n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") : String(n);

/* ---------------- Aufgaben ---------------- */
const BEREICHE = {
    mathe: {
        1: [["pm10", "Plus & Minus bis 10"], ["pm20", "Plus & Minus bis 20"], ["mix", "Gemischt"]],
        2: [["pm100", "Plus & Minus bis 100"], ["mal", "Einmaleins"], ["geteilt", "Geteilt"], ["doppel", "Verdoppeln & Halbieren"], ["mix", "Gemischt"]],
        3: [["pm1000", "Plus & Minus bis 1 000"], ["mal", "Einmaleins"], ["geteilt", "Geteilt"], ["mix", "Gemischt"]],
        4: [["pm10000", "Plus & Minus bis 10 000"], ["mal", "Mal mit Zehnern"], ["geteilt", "Geteilt"], ["mix", "Gemischt"]]
    },
    deutsch: {
        1: [["anlaut", "Anlaute"], ["silben", "Silben klatschen"], ["reim", "Reime"], ["artikel", "der, die, das"], ["mix", "Gemischt"]],
        2: [["anlaut", "Anlaute"], ["silben", "Silben"], ["reim", "Reime"], ["artikel", "der, die, das"], ["nomen", "Nomen finden"], ["gross", "Groß oder klein?"], ["mix", "Gemischt"]],
        3: [["silben", "Silben"], ["artikel", "der, die, das"], ["nomen", "Wortarten"], ["gross", "Groß oder klein?"], ["mix", "Gemischt"]],
        4: [["silben", "Silben"], ["artikel", "der, die, das"], ["nomen", "Wortarten"], ["gross", "Groß oder klein?"], ["mix", "Gemischt"]]
    }
};
// falsche Antworten, die nicht sofort auffallen (nahe dran, typische Fehler)
function zahlOptionen(richtig, n, typisch){
    const set = new Set([richtig]);
    (typisch || []).forEach(t => { if (t > 0 && t !== richtig && set.size < n) set.add(t); });
    const nahe = [1, -1, 2, -2, 10, -10, 3, -3];
    let g = 0; while (set.size < n && g++ < 60){ const t = richtig + nimm(nahe) * (richtig > 40 && Math.random() < .5 ? 10 : 1); if (t >= 0) set.add(t); }
    return mischen([...set]).map(String);
}
function mathe(kl, b){
    if (b === "mix") b = nimm(BEREICHE.mathe[kl].map(x => x[0]).filter(x => x !== "mix"));
    const n = kl <= 2 ? 3 : 4;
    let a, c, r, text, typ = [];
    if (b === "pm10" || b === "pm20"){
        const max = b === "pm10" ? 10 : 20;
        if (Math.random() < .5){ a = zuf(1, max - 1); c = zuf(1, max - a); r = a + c; text = `${a} + ${c}`; }
        else { a = zuf(2, max); c = zuf(1, a - 1); r = a - c; text = `${a} − ${c}`; }
        typ = [r + 1, r - 1];
    } else if (b === "pm100"){
        if (Math.random() < .5){ a = zuf(11, 79); c = zuf(5, 99 - a); r = a + c; text = `${a} + ${c}`; typ = [r + 10, r - 10, r - 1]; }
        else { a = zuf(30, 99); c = zuf(5, a - 10); r = a - c; text = `${a} − ${c}`; typ = [r + 10, r + 1, r - 10]; }
    } else if (b === "pm1000"){
        if (Math.random() < .5){ a = zuf(12, 79) * 10 + (Math.random() < .5 ? 0 : zuf(1, 9)); c = zuf(2, 99) * (Math.random() < .5 ? 10 : 1); if (a + c > 999) c = 999 - a; r = a + c; text = `${a} + ${c}`; }
        else { a = zuf(30, 99) * 10 + zuf(0, 9); c = zuf(1, Math.floor(a / 10) - 1) * 10; r = a - c; text = `${a} − ${c}`; }
        typ = [r + 100, r - 10, r + 10];
    } else if (b === "pm10000"){
        if (Math.random() < .5){ a = zuf(12, 89) * 100; c = zuf(2, 99) * 10; r = a + c; text = `${fz(a)} + ${c}`; }
        else { a = zuf(20, 99) * 100; c = zuf(1, 19) * 100; r = a - c; text = `${fz(a)} − ${fz(c)}`; }
        typ = [r + 100, r - 100, r + 1000];
    } else if (b === "mal"){
        if (kl === 2){ a = nimm([2, 5, 10, 2, 5, 10, 3, 4]); c = zuf(1, 10); }
        else if (kl === 3){ a = zuf(2, 10); c = zuf(2, 10); }
        else { a = zuf(2, 9) * 10; c = zuf(2, 9); }
        r = a * c; text = `${a} · ${c}`; typ = [a * (c + 1), a * (c - 1), r + 1];
    } else if (b === "geteilt"){
        if (kl === 2){ c = nimm([2, 5, 10]); r = zuf(1, 10); }
        else if (kl === 3){ c = zuf(2, 10); r = zuf(2, 10); }
        else { c = zuf(2, 9); r = zuf(2, 9) * 10; }
        a = c * r; text = `${a} : ${c}`; typ = [r + 1, r - 1, kl === 4 ? r / 10 : r + 2];
    } else if (b === "doppel"){
        if (Math.random() < .5){ a = zuf(6, 45); r = a * 2; text = `Verdopple ${a}`; typ = [r + 10, r - 1]; }
        else { r = zuf(6, 45); a = r * 2; text = `Halbiere ${a}`; typ = [r + 5, r - 1]; }
    }
    return { art: "zahl", text, antwort: String(r), optionen: zahlOptionen(r, n, typ.filter(Number.isInteger)), sprech: text.replace("·", "mal").replace(":", "geteilt durch").replace("−", "minus").replace("+", "plus") };
}
const VERWECHSEL = { B: ["D", "P"], D: ["B", "T"], P: ["B", "T"], M: ["N", "W"], N: ["M", "L"], F: ["W", "V"], W: ["F", "M"], G: ["K", "D"], K: ["G", "T"], T: ["D", "K"], L: ["N", "R"], R: ["L", "N"], S: ["Z", "F"], Z: ["S", "T"], H: ["K", "F"], A: ["E", "O"], E: ["A", "I"], I: ["E", "L"], O: ["U", "A"], U: ["O", "A"] };
function deutsch(kl, b){
    if (b === "mix") b = nimm(BEREICHE.deutsch[kl].map(x => x[0]).filter(x => x !== "mix"));
    const W = D().woerter;
    if (!W.length) return mathe(kl, "mix");
    const mitBild = kl === 1;   // Kl. 1 kann im Herbst noch nicht lesen: Bild statt Wort
    if (b === "anlaut"){
        const w = nimm(W.filter(x => x.klar));
        const falsch = mischen(VERWECHSEL[w.an] || ["M", "S"]).slice(0, 2);
        return { art: "wahl", frage: "Womit fängt das Wort an?", bild: w.b, wort: kl > 1 ? null : null, antwort: w.an, optionen: mischen([w.an, ...falsch]), sprech: `Womit fängt ${w.w} an?`, loesung: w.w };
    }
    if (b === "silben"){
        const w = nimm(W.filter(x => x.n <= 4));
        return { art: "wahl", frage: "Wie viele Silben hat das Wort? Klatscht mit!", bild: w.b, wort: mitBild ? null : w.w, antwort: String(w.n), optionen: ["1", "2", "3", "4"], sprech: mitBild ? `Wie viele Silben hat ${w.w}?` : "Wie viele Silben hat das Wort?", loesung: w.s.replace(/-/g, " – ") };
    }
    if (b === "reim"){
        const R = D().reime.filter(([x, y]) => BILD(x) && BILD(y)); if (!R.length) return deutsch(kl, "silben");
        const [x, y] = mischen(nimm(R)), andere = mischen(W.filter(w => w.b !== x && w.b !== y)).slice(0, 2).map(w => w.b);
        const name = k => (W.find(w => w.b === k) || { w: k }).w;
        return { art: "wahl", bilder: true, frage: "Was reimt sich darauf?", bild: x, wort: mitBild ? null : name(x), antwort: y, optionen: mischen([y, ...andere]), sprech: `Was reimt sich auf ${name(x)}?`, loesung: `${name(x)} – ${name(y)}` };
    }
    if (b === "artikel"){
        const w = nimm(W.filter(x => x.a));
        return { art: "wahl", frage: "der, die oder das?", bild: w.b, wort: mitBild ? null : w.w, antwort: w.a, optionen: ["der", "die", "das"], sprech: mitBild ? `Heißt es der, die oder das ${w.w}?` : "der, die oder das?", loesung: `${w.a} ${w.w}` };
    }
    const WA = D().wortarten;
    if (b === "nomen"){
        const art = kl <= 2 ? "Nomen" : nimm(["Nomen", "Verben", "Adjektive"]), anders = ["Nomen", "Verben", "Adjektive"].filter(x => x !== art);
        const richtig = nimm(WA[art]), falsch = anders.map(x => nimm(WA[x]));
        const name = { Nomen: "ein Nomen", Verben: "ein Verb", Adjektive: "ein Adjektiv" }[art];
        // alles klein geschrieben, sonst verrät der große Anfangsbuchstabe das Nomen
        return { art: "wahl", frage: `Welches Wort ist ${name}?`, antwort: richtig.toLowerCase(), optionen: mischen([richtig, ...falsch].map(x => x.toLowerCase())), sprech: `Welches Wort ist ${name}?`, loesung: art === "Nomen" ? richtig : richtig.toLowerCase() };
    }
    if (b === "gross"){
        const nom = Math.random() < .5, wort = nom ? nimm(WA.Nomen) : nimm(nimm([WA.Verben, WA.Adjektive]));
        return { art: "wahl", frage: "Schreibt man dieses Wort groß oder klein?", wort: wort.toLowerCase(), antwort: nom ? "groß" : "klein", optionen: ["groß", "klein"], sprech: "Schreibt man dieses Wort groß oder klein?", loesung: nom ? `${wort} – ein Nomen, also groß` : `${wort.toLowerCase()} – kein Nomen, also klein` };
    }
    return deutsch(kl, "silben");
}

/* ---------------- Aussehen ---------------- */
const CSS = `
#bt{ position:fixed; inset:0; z-index:14; display:none; flex-direction:column; background:#0f2a44; font-family:"Nunito",sans-serif; user-select:none; -webkit-user-select:none; overflow:hidden; color:#fff; }
#bt.an{ display:flex; }
.bt-kopf{ display:flex; align-items:center; gap:8px; padding:8px 12px; flex:none; z-index:5; }
.bt-kopf .titel{ font-weight:900; font-size:18px; margin-right:auto; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.bt-k{ font:800 15px "Nunito",sans-serif; border:0; border-radius:999px; min-width:44px; height:44px; padding:0 14px; background:rgba(255,255,255,.16); color:#fff; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:6px; white-space:nowrap; }
.bt-stand{ display:flex; align-items:center; gap:10px; font-weight:900; font-size:clamp(16px,2.6vmin,26px); background:rgba(255,255,255,.12); border-radius:999px; padding:4px 14px; }
.bt-stand b{ font-size:1.25em; }
.bt-szene{ position:relative; flex:1; min-height:0; overflow:hidden; border-radius:0 0 26px 26px; }
.bt-szene svg.himmel{ position:absolute; inset:0; width:100%; height:100%; }
.bt-wellen{ position:absolute; left:-10%; right:-10%; height:14%; }
.bt-wellen svg{ width:100%; height:100%; }
.bt-wellen.w1{ bottom:30%; animation:btWelle 9s ease-in-out infinite alternate; opacity:.7; }
.bt-wellen.w2{ bottom:14%; animation:btWelle 7s ease-in-out infinite alternate-reverse; }
.bt-wellen.w3{ bottom:-2%; animation:btWelle 6s ease-in-out infinite alternate; }
@keyframes btWelle{ from{ transform:translateX(-3%); } to{ transform:translateX(3%); } }
.bt-turm{ position:absolute; left:70%; bottom:46%; transform-origin:50% 100%; transition:transform 1.6s ease; width:min(30vh,40vw); }
.bt-turm svg{ width:100%; display:block; overflow:visible; }
.bt-strahl{ transform-origin:150px 62px; animation:btDreh 6s linear infinite; opacity:0; transition:opacity 1s; }
#bt.da .bt-strahl{ opacity:1; }
@keyframes btDreh{ from{ transform:rotate(0deg); } to{ transform:rotate(360deg); } }
.bt-boot{ position:absolute; left:50%; bottom:2%; width:min(34vh,46vw); transform:translateX(-50%); animation:btSchaukel 3.2s ease-in-out infinite; }
.bt-boot svg{ width:100%; display:block; overflow:visible; filter:drop-shadow(0 10px 12px rgba(0,30,60,.35)); }
@keyframes btSchaukel{ 0%,100%{ transform:translateX(-50%) rotate(-2.5deg) translateY(0); } 50%{ transform:translateX(-50%) rotate(2.5deg) translateY(-6px); } }
#bt.falsch .bt-boot{ animation:btWackel .5s ease; }
@keyframes btWackel{ 0%,100%{ transform:translateX(-50%); } 25%{ transform:translateX(-54%) rotate(-6deg); } 75%{ transform:translateX(-46%) rotate(6deg); } }
.bt-boje{ position:absolute; left:50%; top:9%; transform:translateX(-50%) scale(1); transform-origin:50% 100%; transition:transform 1.1s cubic-bezier(.3,1.2,.5,1), opacity .9s, top 1.1s; display:flex; flex-direction:column; align-items:center; }
.bt-boje.kommt{ transform:translateX(-50%) scale(.25); top:34%; opacity:0; }
.bt-boje.weg{ transform:translateX(-150%) translateY(60%) scale(1.4) rotate(-12deg); opacity:0; }
.bt-schild{ background:linear-gradient(#fffdf6,#f3ead6); color:#1f2d36; border:5px solid #8a5f3c; border-radius:22px; padding:.35em .7em; font-weight:900; font-size:clamp(30px,7vmin,92px); line-height:1.1; text-align:center; box-shadow:0 14px 30px rgba(0,20,40,.35); max-width:86vw; display:flex; flex-direction:column; align-items:center; gap:.15em; }
.bt-schild .frage{ font-size:.32em; color:#52606b; font-weight:800; max-width:24em; }
.bt-schild .bild{ width:clamp(90px,20vmin,220px); aspect-ratio:1; }
.bt-schild .bild svg{ width:100%; height:100%; }
.bt-schild .wort{ font-family:"Andika","Nunito",sans-serif; font-weight:700; }
.bt-pfahl{ width:10px; height:clamp(20px,4vmin,50px); background:#8a5f3c; }
.bt-tonne svg{ width:clamp(60px,10vmin,110px); display:block; }
.bt-fahrt{ position:absolute; left:50%; top:10px; transform:translateX(-50%); display:flex; gap:6px; z-index:3; }
.bt-fahrt i{ width:12px; height:12px; border-radius:50%; background:rgba(255,255,255,.4); }
.bt-fahrt i.ok{ background:#ffd84d; box-shadow:0 0 8px #ffd84d; }
.bt-fahrt i.nein{ background:#ff8a80; }
.bt-fahrt i.jetzt{ outline:3px solid #fff; }
.bt-haupt{ flex:1; min-height:0; display:flex; flex-direction:column; }
@media (orientation:landscape){ #bt.allein .bt-haupt{ flex-direction:row; } #bt.allein .bt-szene{ border-radius:0 26px 26px 0; } #bt.allein .bt-antwort{ width:min(460px,40%); justify-content:center; } }
.bt-antwort{ flex:none; padding:12px; display:flex; flex-direction:column; align-items:center; gap:10px; }
.bt-wahl{ display:flex; flex-wrap:wrap; gap:12px; justify-content:center; width:100%; max-width:1100px; }
.bt-wahl button{ flex:1 1 0; min-width:120px; max-width:300px; font:900 clamp(26px,5vmin,56px) "Nunito",sans-serif; border:0; border-radius:22px; padding:.35em .4em; background:#4a3f8f; color:#fff; cursor:pointer; box-shadow:0 6px 0 #2e2766; transition:transform .1s; min-height:1.8em; }
.bt-wahl button.wort{ font-family:"Andika","Nunito",sans-serif; font-weight:700; }
.bt-wahl button:active{ transform:translateY(4px); box-shadow:0 2px 0 #2e2766; }
.bt-wahl button.richtig{ background:#2e9e5b; box-shadow:0 6px 0 #1d6b3c; }
.bt-wahl button.falsch{ background:#c0392b; box-shadow:0 6px 0 #7f241b; opacity:.75; }
.bt-wahl button.bild{ background:#fff; box-shadow:0 6px 0 #c9c2e6; padding:.15em; }
.bt-wahl button.bild svg{ width:clamp(70px,14vmin,150px); height:clamp(70px,14vmin,150px); display:block; margin:auto; }
.bt-wahl button.bild.richtig{ outline:6px solid #2e9e5b; } .bt-wahl button.bild.falsch{ outline:6px solid #c0392b; }
.bt-feld{ display:flex; align-items:center; gap:10px; }
.bt-feld .eingabe{ min-width:4.5em; text-align:center; font:900 clamp(30px,6vmin,60px) "Nunito",sans-serif; background:#fff; color:#1f2d36; border-radius:18px; padding:.1em .4em; }
.bt-tasten{ display:grid; grid-template-columns:repeat(3, minmax(70px,1fr)); gap:10px; width:min(420px,92vw); }
.bt-tasten button{ font:900 clamp(26px,5vmin,40px) "Nunito",sans-serif; border:0; border-radius:18px; height:clamp(54px,9vmin,76px); background:#4a3f8f; color:#fff; box-shadow:0 5px 0 #2e2766; cursor:pointer; }
.bt-tasten button.ok{ background:#2e9e5b; box-shadow:0 5px 0 #1d6b3c; }
.bt-tasten button.weg{ background:#6a6290; }
.bt-hinweis{ font-weight:800; font-size:clamp(15px,2.4vmin,24px); min-height:1.4em; text-align:center; }
.bt-start, .bt-ende{ position:absolute; inset:0; z-index:8; display:flex; align-items:center; justify-content:center; background:rgba(8,20,40,.45); padding:14px; }
.bt-start > div, .bt-ende > div{ background:#fffdf8; color:#1f2d36; border-radius:28px; padding:20px 22px; width:min(640px,100%); max-height:100%; overflow:auto; box-shadow:0 24px 60px rgba(0,0,0,.35); }
.bt-start h2, .bt-ende h2{ margin:0 0 6px; font-size:clamp(22px,3.6vmin,34px); font-weight:900; }
.bt-start h4{ margin:12px 0 6px; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:#7c8a96; }
.bt-reihe{ display:flex; flex-wrap:wrap; gap:6px; }
.bt-reihe button{ font:800 15px "Nunito",sans-serif; border:2px solid #dfe5ea; background:#fff; color:#1f2d36; border-radius:999px; padding:8px 13px; cursor:pointer; min-height:42px; }
.bt-reihe button.an{ background:#28465f; border-color:#28465f; color:#fff; }
.bt-los{ margin-top:16px; width:100%; font:900 22px "Nunito",sans-serif; border:0; border-radius:999px; padding:14px; background:#e08a2c; color:#fff; cursor:pointer; }
.bt-ende .gross{ font-size:clamp(40px,8vmin,80px); font-weight:900; text-align:center; }
@media (orientation:landscape) and (min-width:900px){ .bt-antwort{ padding:14px 20px 18px; } }
`;

/* Bilder der Szene */
const TURM = `<svg viewBox="0 0 300 330" aria-hidden="true">
  <defs><linearGradient id="btT" x1="0" x2="1"><stop offset="0" stop-color="#f4f4f2"/><stop offset=".6" stop-color="#ffffff"/><stop offset="1" stop-color="#c9d2da"/></linearGradient>
    <linearGradient id="btR" x1="0" x2="1"><stop offset="0" stop-color="#e2574c"/><stop offset=".6" stop-color="#f06a5e"/><stop offset="1" stop-color="#a8352c"/></linearGradient>
    <radialGradient id="btL" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6c8"/><stop offset="1" stop-color="#ffd84d" stop-opacity="0"/></radialGradient>
    <linearGradient id="btS" x1="0" x2="1"><stop offset="0" stop-color="#fff6c8" stop-opacity=".9"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></linearGradient></defs>
  <path d="M40 330 Q150 270 260 330Z" fill="#6f8a62"/><path d="M70 330 Q150 290 230 330Z" fill="#8aa877"/>
  <path d="M118 300 L128 90 L172 90 L182 300Z" fill="url(#btT)"/>
  <path d="M121 240 L179 240 L181 270 L119 270Z M124 170 L176 170 L178 200 L122 200Z M127 110 L173 110 L175 135 L125 135Z" fill="url(#btR)"/>
  <rect x="140" y="250" width="20" height="40" rx="10" fill="#4a3a30"/>
  <rect x="116" y="80" width="68" height="12" rx="3" fill="#2f3a45"/>
  <rect x="126" y="50" width="48" height="32" rx="4" fill="#fff6c8" stroke="#2f3a45" stroke-width="5"/>
  <path d="M120 52 L150 26 L180 52Z" fill="url(#btR)"/>
  <circle cx="150" cy="66" r="40" fill="url(#btL)"/>
  <g class="bt-strahl"><path d="M150 62 L300 40 L300 84Z" fill="url(#btS)"/><path d="M150 62 L0 40 L0 84Z" fill="url(#btS)" transform="rotate(180 150 62) scale(-1 1) translate(-300 0)"/></g>
</svg>`;
const BOOT = () => `<svg viewBox="0 0 300 260" aria-hidden="true">
  <defs><linearGradient id="btH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9784a"/><stop offset="1" stop-color="#6e4428"/></linearGradient>
    <linearGradient id="btSeg" x1="0" x2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe6ee"/></linearGradient></defs>
  <rect x="146" y="20" width="8" height="170" rx="3" fill="#6e4428"/>
  <path d="M154 26 C210 70 228 130 230 176 L154 176Z" fill="url(#btSeg)"/>
  <path d="M154 70 C196 96 214 120 220 140 L154 140Z" fill="#e2574c" opacity=".9"/>
  <path d="M146 40 C110 80 96 130 96 170 L146 170Z" fill="url(#btSeg)" opacity=".95"/>
  <path d="M154 20 L190 30 L154 40Z" fill="#ffd84d"/>
  <g transform="translate(108 120) scale(.62)">${BILD("pinguin")}</g>
  <path d="M30 180 L270 180 C258 222 220 246 150 246 C80 246 42 222 30 180Z" fill="url(#btH)"/>
  <path d="M34 186 L266 186" stroke="#e8c79a" stroke-width="6"/>
  <circle cx="90" cy="208" r="8" fill="#e8f4ff" stroke="#6e4428" stroke-width="3"/><circle cx="150" cy="212" r="8" fill="#e8f4ff" stroke="#6e4428" stroke-width="3"/><circle cx="210" cy="208" r="8" fill="#e8f4ff" stroke="#6e4428" stroke-width="3"/>
</svg>`;
const TONNE = `<svg viewBox="0 0 100 90" aria-hidden="true"><path d="M20 30 L80 30 L72 80 L28 80Z" fill="#e2574c"/><path d="M23 48 L77 48 L75 60 L25 60Z" fill="#fff"/><ellipse cx="50" cy="82" rx="40" ry="8" fill="#fff" opacity=".35"/></svg>`;
const WELLE = (f, o) => `<svg viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 60 ${Array.from({ length: 12 }, (_, i) => `Q${i * 100 + 50} ${i % 2 ? 30 : 90} ${i * 100 + 100} 60`).join(" ")} V120 H0Z" fill="${f}" opacity="${o}"/></svg>`;

/* ---------------- Ablauf ---------------- */
const E = { fach: "mathe", kl: 2, bereich: "mix", laenge: 10, modus: "tafel", ton: true };
try { Object.assign(E, JSON.parse(localStorage.getItem("lt-boot") || "{}")); } catch (x) {}
const merken = () => { try { localStorage.setItem("lt-boot", JSON.stringify(E)); } catch (x) {} };
let el, A = null, nr = 0, versuch = 0, ergebnisse = [], punkte = { k: 0, e: 0 }, eingabe = "", ctx = null, gesperrt = false;

function ton(f, d = .15, typ = "sine"){
    if (!E.ton) return;
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); const o = ctx.createOscillator(), g = ctx.createGain(); o.type = typ; o.frequency.value = f; g.gain.setValueAtTime(.0001, ctx.currentTime); g.gain.exponentialRampToValueAtTime(.15, ctx.currentTime + .02); g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + d + .25); o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + d + .3); } catch (x) {}
}
function vorlesen(t){ try { if (!window.speechSynthesis || !t) return; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = "de-DE"; u.rate = .9; speechSynthesis.speak(u); } catch (x) {} }
const seiten = () => (window.tbSeiten && window.tbSeiten()) || ["Klasse", "🦉 Ella"];

function aufbauen(){
    if (el) return;
    const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    el = document.createElement("div"); el.id = "bt"; document.body.appendChild(el);
    el.addEventListener("click", klick);
    document.addEventListener("keydown", e => { if (!el.classList.contains("an") || !A || A.art !== "zahl" || E.modus !== "allein") return; if (/^\d$/.test(e.key)) taste(e.key); else if (e.key === "Backspace") taste("weg"); else if (e.key === "Enter") taste("ok"); });
}

function startZeigen(){
    const ber = BEREICHE[E.fach][E.kl];
    if (!ber.some(b => b[0] === E.bereich)) E.bereich = "mix";
    el.querySelector(".bt-start") && el.querySelector(".bt-start").remove();
    el.querySelector(".bt-szene").insertAdjacentHTML("beforeend", `<div class="bt-start"><div>
      <h2>⛵ Bootsfahrt zum Leuchtturm</h2>
      <div style="color:#5b6670;font-weight:700">Jede richtige Antwort bringt das Boot eine Boje weiter – bis zum Leuchtturm.</div>
      <h4>Fach</h4><div class="bt-reihe">${[["mathe", "🔢 Mathe"], ["deutsch", "🔤 Deutsch"]].map(([k, t]) => `<button data-e="fach=${k}" class="${E.fach === k ? "an" : ""}">${t}</button>`).join("")}</div>
      <h4>Klasse</h4><div class="bt-reihe">${[1, 2, 3, 4].map(k => `<button data-e="kl=${k}" class="${E.kl === k ? "an" : ""}">Klasse ${k}</button>`).join("")}</div>
      <h4>Aufgaben</h4><div class="bt-reihe">${ber.map(([k, t]) => `<button data-e="bereich=${k}" class="${E.bereich === k ? "an" : ""}">${t}</button>`).join("")}</div>
      <h4>Wie weit?</h4><div class="bt-reihe">${[5, 10, 15, 20].map(k => `<button data-e="laenge=${k}" class="${E.laenge === k ? "an" : ""}">${k} Bojen</button>`).join("")}</div>
      <h4>Wie wird gespielt?</h4><div class="bt-reihe"><button data-e="modus=tafel" class="${E.modus === "tafel" ? "an" : ""}">An der Tafel: ${seiten()[2] || "Klasse gegen Ella"}</button><button data-e="modus=allein" class="${E.modus === "allein" ? "an" : ""}">Allein am iPad / Handy</button></div>
      <button class="bt-los" data-a="los">Leinen los! ⛵</button></div></div>`);
}

function geruest(){
    el.innerHTML = `
      <div class="bt-kopf"><span class="titel">⛵ Bootsfahrt</span><span class="bt-stand"></span>
        <button class="bt-k" data-a="vorlesen" title="Aufgabe vorlesen">🔊</button><button class="bt-k" data-a="ton" title="Töne an/aus">${E.ton ? "🔔" : "🔕"}</button>
        <button class="bt-k" data-a="neu" title="Neue Fahrt">⚙️</button><button class="bt-k" data-a="voll" title="Vollbild">⛶</button><button class="bt-k" data-a="zu" title="Schließen">✕</button></div>
      <div class="bt-haupt"><div class="bt-szene">
        <svg class="himmel" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs><linearGradient id="btHi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5d7fd1"/><stop offset=".35" stop-color="#a6b8ea"/><stop offset=".52" stop-color="#ffd2a6"/><stop offset=".56" stop-color="#7fc4dc"/><stop offset="1" stop-color="#1d6f9c"/></linearGradient>
            <radialGradient id="btSo" cx=".5" cy=".52" r=".35"><stop offset="0" stop-color="#fff4cf" stop-opacity=".95"/><stop offset=".3" stop-color="#ffe2a8" stop-opacity=".45"/><stop offset="1" stop-color="#ffe2a8" stop-opacity="0"/></radialGradient>
            <filter id="btWo"><feGaussianBlur stdDeviation="3"/></filter></defs>
          <rect width="1000" height="600" fill="url(#btHi)"/><rect width="1000" height="600" fill="url(#btSo)"/>
          <g fill="#fff" opacity=".85" filter="url(#btWo)"><ellipse cx="180" cy="90" rx="90" ry="24"/><ellipse cx="230" cy="78" rx="60" ry="22"/><ellipse cx="800" cy="130" rx="110" ry="22"/><ellipse cx="760" cy="118" rx="60" ry="20"/></g>
          <path d="M0 316 Q250 300 500 312 T1000 308 V340 H0Z" fill="#6a8fb8" opacity=".6"/>
          <g stroke="#2f3a45" stroke-width="3" fill="none" stroke-linecap="round"><path d="M640 170 q10 -8 20 0 q10 -8 20 0"/><path d="M700 200 q8 -6 16 0 q8 -6 16 0"/></g>
        </svg>
        <div class="bt-turm">${TURM}</div>
        <div class="bt-wellen w1">${WELLE("#4aa3c8", .8)}</div>
        <div class="bt-boje kommt"></div>
        <div class="bt-wellen w2">${WELLE("#2d86b4", .9)}</div>
        <div class="bt-boot">${BOOT()}</div>
        <div class="bt-wellen w3">${WELLE("#1d6f9c", 1)}</div>
        <div class="bt-fahrt"></div>
      </div>
      <div class="bt-antwort"></div></div>`;
}

function turmStellen(){
    const p = Math.min(1, ergebnisse.filter(Boolean).length / Math.max(1, E.laenge)), t = el.querySelector(".bt-turm");
    // je näher am Ziel, desto größer der Leuchtturm
    t.style.transform = `translateX(-50%) scale(${(.35 + p * .75).toFixed(3)})`;
}
function standZeigen(){
    const s = el.querySelector(".bt-stand"), [k, e] = seiten();
    s.innerHTML = E.modus === "tafel" ? `${k} <b>${punkte.k}</b> : <b>${punkte.e}</b> ${e}` : `🐚 <b>${ergebnisse.filter(x => x === true).length}</b>`;
    el.querySelector(".bt-fahrt").innerHTML = Array.from({ length: E.laenge }, (_, i) => `<i class="${i < ergebnisse.length ? (ergebnisse[i] ? "ok" : "nein") : i === nr ? "jetzt" : ""}"></i>`).join("");
}

function naechste(){
    if (nr >= E.laenge) return ende();
    A = E.fach === "mathe" ? mathe(E.kl, E.bereich) : deutsch(E.kl, E.bereich);
    versuch = 0; eingabe = ""; gesperrt = false;
    const b = el.querySelector(".bt-boje");
    b.className = "bt-boje kommt";
    const schild = A.art === "zahl"
        ? `<div class="bt-schild">${A.text}${E.modus === "allein" ? "" : " = ?"}</div>`
        : `<div class="bt-schild"><div class="frage">${A.frage}</div>${A.bild ? `<div class="bild">${BILD(A.bild)}</div>` : ""}${A.wort ? `<div class="wort">${A.wort}</div>` : ""}</div>`;
    b.innerHTML = `${schild}<div class="bt-pfahl"></div><div class="bt-tonne">${TONNE}</div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => b.classList.remove("kommt")));
    antwortFeld();
    standZeigen();
    if (E.kl === 1 && E.modus === "allein") setTimeout(() => vorlesen(A.sprech), 600);
}

function antwortFeld(hinweis){
    const f = el.querySelector(".bt-antwort");
    if (A.art === "zahl" && E.modus === "allein"){
        f.innerHTML = `<div class="bt-feld"><span class="eingabe">${eingabe || "&nbsp;"}</span></div>
          <div class="bt-tasten">${["1", "2", "3", "4", "5", "6", "7", "8", "9", "weg", "0", "ok"].map(t => `<button data-t="${t}" class="${t === "ok" ? "ok" : t === "weg" ? "weg" : ""}">${t === "ok" ? "✓" : t === "weg" ? "⌫" : t}</button>`).join("")}</div>
          <div class="bt-hinweis">${hinweis || ""}</div>`;
    } else {
        f.innerHTML = `<div class="bt-wahl">${A.optionen.map(o => A.bilder ? `<button class="bild" data-o="${o}">${BILD(o)}</button>` : `<button data-o="${o}" class="${/[a-zäöüß]/i.test(o) && o.length > 3 ? "wort" : ""}">${o}</button>`).join("")}</div><div class="bt-hinweis">${hinweis || ""}</div>`;
    }
}

function taste(t){
    if (gesperrt) return;
    if (t === "weg") eingabe = eingabe.slice(0, -1);
    else if (t === "ok"){ if (eingabe) pruefen(eingabe); return; }
    else if (eingabe.length < 6) eingabe += t;
    el.querySelector(".bt-feld .eingabe").innerHTML = eingabe || "&nbsp;";
}

function pruefen(wert, knopf){
    if (gesperrt) return;
    const richtig = String(wert) === A.antwort;
    if (richtig){
        gesperrt = true;
        if (knopf) knopf.classList.add("richtig");
        const erste = versuch === 0;
        ergebnisse.push(erste);
        if (E.modus === "tafel") erste ? punkte.k++ : null;
        [660, 880, 1100].forEach((f, i) => setTimeout(() => ton(f, .12, "triangle"), i * 110));
        const h = el.querySelector(".bt-hinweis"); if (h) h.textContent = nimm(["Super!", "Richtig!", "Genau!", "Prima!", "Weiter so!"]) + (A.loesung ? "  " + A.loesung : "");
        setTimeout(() => { const b = el.querySelector(".bt-boje"); b.classList.add("weg"); turmStellen(); }, 700);
        nr++;
        setTimeout(naechste, 1900);
        standZeigen();
        return;
    }
    versuch++;
    ton(190, .25, "sine");
    el.classList.add("falsch"); setTimeout(() => el.classList.remove("falsch"), 520);
    if (knopf){ knopf.classList.add("falsch"); knopf.disabled = true; }
    if (E.modus === "tafel"){
        // an der Tafel: ein Fehlversuch = Punkt für Ella, dann die Lösung zeigen
        punkte.e++; gesperrt = true; ergebnisse.push(false);
        const ok = el.querySelector(`.bt-wahl [data-o="${CSS.escape ? CSS.escape(A.antwort) : A.antwort}"]`); if (ok) ok.classList.add("richtig");
        const h = el.querySelector(".bt-hinweis"); if (h) h.textContent = `Punkt für ${seiten()[1]}. Richtig ist: ${A.bilder ? (A.loesung || "") : A.antwort}${A.loesung && !A.bilder ? "  (" + A.loesung + ")" : ""}`;
        nr++; standZeigen();
        setTimeout(() => { const b = el.querySelector(".bt-boje"); b.classList.add("weg"); }, 1400);
        setTimeout(naechste, 2600);
        return;
    }
    if (versuch >= 2){
        gesperrt = true; ergebnisse.push(false); nr++;
        const ok = el.querySelector(`.bt-wahl [data-o="${A.antwort}"]`); if (ok) ok.classList.add("richtig");
        const h = el.querySelector(".bt-hinweis"); if (h) h.textContent = `Richtig ist: ${A.bilder ? A.loesung : A.antwort}`;
        if (A.art === "zahl"){ eingabe = A.antwort; const e = el.querySelector(".bt-feld .eingabe"); if (e) e.textContent = A.antwort; }
        standZeigen();
        setTimeout(() => { const b = el.querySelector(".bt-boje"); b.classList.add("weg"); }, 1300);
        setTimeout(naechste, 2600);
        return;
    }
    eingabe = "";
    if (A.art === "zahl") antwortFeld("Noch nicht – versuch es noch einmal!");
    else { const h = el.querySelector(".bt-hinweis"); if (h) h.textContent = "Noch nicht – versuch es noch einmal!"; }
}

function ende(){
    el.classList.add("da"); turmStellen();
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => ton(f, .3, "triangle"), i * 170));
    const ok = ergebnisse.filter(Boolean).length, [k, e] = seiten();
    const zeile = E.modus === "tafel"
        ? `<div class="gross">${punkte.k} : ${punkte.e}</div><div style="text-align:center;font-weight:800;color:#5b6670">${k} gegen ${e} – ${punkte.k > punkte.e ? `${k} gewinnt! 🎉` : punkte.k === punkte.e ? "Unentschieden!" : `${e} gewinnt diesmal.`}</div>`
        : `<div class="gross">🐚 ${ok} von ${E.laenge}</div><div style="text-align:center;font-weight:800;color:#5b6670">${ok === E.laenge ? "Alles richtig – super!" : ok >= E.laenge * .7 ? "Toll gemacht!" : "Gut gemacht – beim nächsten Mal schaffst du noch mehr!"}</div>`;
    el.querySelector(".bt-antwort").innerHTML = "";
    el.querySelector(".bt-szene").insertAdjacentHTML("beforeend", `<div class="bt-ende"><div><h2>🗼 Angekommen am Leuchtturm!</h2>${zeile}<button class="bt-los" data-a="nochmal">Noch eine Fahrt</button><button class="bt-los" style="background:#28465f" data-a="neu">Andere Aufgaben</button></div></div>`);
}

function fahrtStarten(){
    el.classList.toggle("allein", E.modus === "allein");
    nr = 0; ergebnisse = []; punkte = { k: 0, e: 0 }; el.classList.remove("da");
    ["bt-start", "bt-ende"].forEach(c => { const x = el.querySelector("." + c); if (x) x.remove(); });
    turmStellen(); naechste();
}

function klick(e){
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.e){ const [k, v] = t.dataset.e.split("="); E[k] = ["kl", "laenge"].includes(k) ? +v : v; if (k === "fach" || k === "kl") E.bereich = "mix"; merken(); return startZeigen(); }
    if (t.dataset.o !== undefined) return pruefen(t.dataset.o, t);
    if (t.dataset.t) return taste(t.dataset.t);
    const a = t.dataset.a;
    if (a === "los" || a === "nochmal") return fahrtStarten();
    if (a === "neu"){ const x = el.querySelector(".bt-ende"); if (x) x.remove(); return startZeigen(); }
    if (a === "vorlesen") return A && vorlesen(A.sprech);
    if (a === "ton"){ E.ton = !E.ton; merken(); t.textContent = E.ton ? "🔔" : "🔕"; return; }
    if (a === "voll") return window.vollbild ? window.vollbild() : null;
    if (a === "zu") return schliessen();
}

function oeffnen(){
    aufbauen(); geruest(); el.classList.add("an"); el.classList.remove("da");
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "none";
    try { history.replaceState(null, "", "#boot"); } catch (x) {}
    A = null; turmStellen(); standZeigen(); el.querySelector(".bt-antwort").innerHTML = ""; startZeigen();
}
function schliessen(){
    el.classList.remove("an"); el.innerHTML = ""; try { speechSynthesis.cancel(); } catch (x) {}
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "";
    try { history.replaceState(null, "", location.pathname); } catch (x) {}
}
window.tafelBoot = { oeffnen, schliessen, _mathe: mathe, _deutsch: deutsch };
document.addEventListener("DOMContentLoaded", () => { if (location.hash === "#boot") oeffnen(); });
})();
