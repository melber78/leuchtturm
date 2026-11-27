/* ============================================================
   Leuchtturm – Weltenreise (didaktisch: Lehrgang statt Reaktionsspiel)
   Jede Welt steht für eine Rechtschreibstrategie – bzw. für die
   Buchstaben-/Lese-Kinder für einen Lese-Baustein.
   Gelöst wird immer in Ruhe (Aufgaben-Kern lrs-aufgaben.js):
   Tipp nach Fehler, zweiter Versuch, nie ein falsches Wortbild.
   Das Abenteuer (Weg, Schatzsuche, Wächter) zeigt nur den Fortschritt.
   Sterne nach „gleich beim ersten Mal“, ⚡ Energie für die Belohnungsspiele.
   ============================================================ */
(function(){
const WELTEN = [
    { id: "wald", name: "Zauberwald", emoji: "🌳", hg: "linear-gradient(#1f4d2b, #3f7a3a 60%, #5d8f3e)", begleiter: ["🦊", "Fuchs Finn"], weg: "🪷", schatzKiste: "🍄",
      rs: { strategie: "schwingen", keys: ["schaerfung", "ie", "sss", "cktz"], text: "Im Zauberwald musst du genau hinhören! Schwing jedes Wort in Silben und hör auf den Selbstlaut: kurz oder lang?" },
      vor: { art: "reim", text: "Im Zauberwald reimen sich die Dinge! Hör genau hin: Welches Bild klingt am Ende genauso?" },
      le: { art: "anlaut", text: "Im Zauberwald haben alle Dinge ihren Anfangslaut verloren. Hör genau hin: Womit fängt das Wort an?" },
      waechter: ["🧌", "Trollkönig Brumm"], schatz: ["✨", "Waldlicht"] },
    { id: "eis", name: "Eisreich", emoji: "❄️", hg: "linear-gradient(#bfe3f5, #e9f6fc 60%, #ffffff)", hell: true, begleiter: ["🐧", "Pinguin Paul"], weg: "🧊", schatzKiste: "🧊",
      rs: { strategie: "verlaengern", keys: ["auslaut", "iglich", "silbenh"], text: "Im Eisreich ist alles eingefroren – und kurz! Verlängere die Wörter (Hund → Hun-de), dann hörst du, wie man sie schreibt." },
      vor: { art: "klatsch", text: "Im Eisreich klatschen wir, damit uns warm wird! Klatsch jedes Wort in Silben." },
      le: { art: "silben", text: "Das Eis ist in Silben zersprungen! Leg die Silben wieder richtig zusammen." },
      waechter: ["🐻‍❄️", "Eisbär Frost"], schatz: ["💎", "Eisdiamant"] },
    { id: "wueste", name: "Sandwüste", emoji: "🏜️", hg: "linear-gradient(#ffcf7a, #f5b45a 55%, #e39a43)", hell: true, begleiter: ["🐪", "Kamel Karl"], weg: "🟫", schatzKiste: "🏺",
      rs: { strategie: "ableiten", keys: ["aeau"], text: "In der Wüste haben Wörter Verwandte. Such das verwandte Wort mit a oder au (Bäume → Baum) – dann weißt du: ä oder e?" },
      vor: { art: "anlaut", text: "In der Wüste hört man jeden Laut ganz deutlich. Welches Bild fängt genauso an?" },
      le: { art: "bildwort", text: "In der Wüste sehen viele Wörter fast gleich aus. Lies ganz genau: Welches Wort passt zum Bild?" },
      waechter: ["🦂", "Skorpionkönig Zack"], schatz: ["🧭", "Goldener Kompass"] },
    { id: "meer", name: "Meerestiefe", emoji: "🌊", hg: "linear-gradient(#1b6ca8, #12467a 60%, #0c2f55)", begleiter: ["🐢", "Schildkröte Tilda"], weg: "🐚", schatzKiste: "🦪",
      rs: { strategie: "merken", keys: ["dehnung", "doppelvokal", "vf", "chsx", "spst"], text: "Manche Wörter muss man sich einfach merken – wie die Muster der Muscheln. Schau genau hin, merk dir das Wort und bau es wieder auf." },
      vor: { art: "janein", text: "Unter Wasser sind wir Laut-Detektive. Hörst du den Laut am Anfang? Daumen hoch oder runter!" },
      le: { art: "reim", text: "Unter Wasser klingen Wörter wie ein Echo. Welche Wörter reimen sich?" },
      waechter: ["🐙", "Krake Kalle"], schatz: ["🫧", "Zauberperle"] },
    { id: "dino", name: "Dinotal", emoji: "🦕", hg: "linear-gradient(#a8d672, #7fb64e 55%, #5f8f38)", hell: true, begleiter: ["🦕", "Dino Rudi"], weg: "🪨", schatzKiste: "🥚",
      rs: { strategie: "artikel", keys: ["grossklein"], text: "Im Dinotal sind die großen Dinge Nomen! Mach die Artikelprobe: Passt der, die oder das davor? Dann schreibst du groß." },
      vor: { art: "anlautmix", text: "Die Dinos rufen laut! Hör auf den ersten Laut jedes Wortes." },
      le: { art: "blitz", text: "Die Dinos sind schnell! Das Wort blitzt nur kurz auf – lies es und finde das passende Bild." },
      waechter: ["🦖", "T-Rex Rex"], schatz: ["🥚", "Goldenes Dino-Ei"] },
    { id: "vulkan", name: "Vulkaninsel", emoji: "🌋", hg: "linear-gradient(#3a1d1d, #6b2a1f 55%, #a33b1f)", begleiter: ["🐦‍🔥", "Feuervogel Funke"], weg: "🪨", schatzKiste: "💎",
      rs: { strategie: "ersatz", keys: ["dasdass"], ab: 4, text: "Auf der Vulkaninsel brodeln die Sätze. das oder dass? Setz „dieses“ oder „welches“ ein – passt es, schreibst du das." },
      vor: { art: "reimklatsch", text: "Am Vulkan brodelt es: Reime und Silben – du schaffst beides!" },
      le: { art: "merk", text: "Am Vulkan liegen Wörter in Stücken. Schau dir das Wort genau an und bau es wieder auf." },
      waechter: ["🐉", "Feuerdrache Glut"], schatz: ["🔥", "Feuerkristall"] },
    { id: "all", name: "Weltraum", emoji: "🪐", hg: "radial-gradient(ellipse at 50% 120%, #2a3f73, #0a0f24 70%)", begleiter: ["🤖", "Roboter Robo"], weg: "🪨", schatzKiste: "⭐",
      rs: { strategie: "fehler", keys: [], text: "Piep! Im Weltraum fliegen deine eigenen Fehlerwörter herum. Wir sammeln sie ein: genau ansehen, merken, aufbauen." },
      vor: { art: "robo", text: "Piep! Ich spreche Robo-Sprache, in Silben. Kannst du mich verstehen? Welches Bild meine ich?" },
      le: { art: "bildwort", text: "Piep! Die Raketenteile sind beschriftet. Lies genau, damit wir die richtigen Teile einbauen." },
      waechter: ["👾", "Alien-Kommandant Zork"], schatz: ["🚀", "Sternenrakete"] },
    { id: "wolke", name: "Wolkenschloss", emoji: "🏰", hg: "linear-gradient(#f7c6e6, #c9d8ff 55%, #eef3ff)", hell: true, begleiter: ["🦄", "Einhorn Wolke"], weg: "☁️", schatzKiste: "🌈",
      rs: { strategie: "mix", keys: [], text: "Im Wolkenschloss brauchst du alles, was du gelernt hast: Schwingen, Verlängern, Ableiten und Merken." },
      vor: { art: "mix", text: "Im Wolkenschloss brauchst du alles: Reime, Silben, Anfangslaute und Robo-Sprache." },
      le: { art: "mix", text: "Im Wolkenschloss brauchst du alles: Laute hören, Silben legen und genau lesen." },
      waechter: ["🧙", "Schattenzauberer Nebel"], schatz: ["👑", "Krone der Weltenreise"] },
];
const STUFEN = [
    { name: "Der Weg", ico: "👣", n: 6, text: "Geh Schritt für Schritt – jede gelöste Aufgabe bringt dich einen Stein weiter." },
    { name: "Die Schatzsuche", ico: "🗝️", n: 6, text: "Jede gelöste Aufgabe öffnet ein Versteck." },
    { name: "Der Wächter", ico: "⚔️", n: 8, text: "Jede richtige Antwort trifft den Wächter." },
];

/* ---------- Pfad: Rechtschreib-Lehrgang oder Buchstaben-/Lesepfad ---------- */
const vorPfad = () => typeof vorleser === "function" && vorleser();
const lesePfad = () => !sek() && (vorPfad() || ((!S.kind || !S.kind.r.length) && (!!buchstaben() || S.klasse <= 2)));
function inhalt(w){ return vorPfad() ? w.vor : lesePfad() ? w.le : w.rs; }
function istSchwerpunkt(w){ if (!S.kind || lesePfad()) return false; const r = S.kind.r; return w.rs.keys.some(k => r.includes(k)) || (w.id === "all" && S.kind.woerter.length > 0); }
// Reiseroute: Welten mit Förderplan-Schwerpunkt zuerst, das Wolkenschloss immer zum Schluss
function route(){
    const alle = WELTEN.filter(w => w.id !== "wolke"), vorn = alle.filter(istSchwerpunkt), rest = alle.filter(w => !istSchwerpunkt(w));
    return [...vorn, ...rest, WELTEN.find(w => w.id === "wolke")];
}
function aufgabenFuer(w, n){
    const c = inhalt(w);
    if (vorPfad()){
        const f = { reim: AG.reimHoerAufg, klatsch: AG.klatschAufg, anlaut: AG.anlautHoerAufg, janein: AG.lautJaNeinAufg, robo: AG.syntheseAufg,
            anlautmix: x => mischen([...AG.anlautHoerAufg(Math.ceil(x / 2)), ...AG.lautJaNeinAufg(Math.ceil(x / 2))]).slice(0, x),
            reimklatsch: x => mischen([...AG.reimHoerAufg(Math.ceil(x / 2)), ...AG.klatschAufg(Math.ceil(x / 2))]).slice(0, x), mix: AG.vorlesePassend }[c.art];
        return (f || AG.vorlesePassend)(n);
    }
    if (lesePfad()){
        const f = { anlaut: AG.anlautAufg, silben: AG.silbenAufg, bildwort: AG.bildWortAufg, reim: AG.reimAufg, blitz: AG.blitzAufg, merk: x => AG.merkAufgaben(x) }[c.art];
        if (f) return f(n);
        return mischen([...AG.anlautAufg(3), ...AG.silbenAufg(3), ...AG.bildWortAufg(3)]).slice(0, n);
    }
    if (c.strategie === "fehler"){ const a = AG.merkAufgaben(n); return a.length >= 3 ? a : AG.rsAufgaben(S.rs, n); }
    let keys = c.keys;
    if (c.strategie === "mix") keys = (S.kind && S.kind.r.length ? S.kind.r : ["schaerfung", "auslaut", "aeau", "ie", "dehnung"]).filter(k => SP_RS[k]);
    if (c.ab && S.klasse < c.ab) keys = [S.rs];
    const eigene = S.kind ? keys.filter(k => S.kind.r.includes(k)) : [];
    const nutzen = eigene.length ? eigene : keys;
    const liste = mischen(nutzen.flatMap(k => AG.rsAufgaben(k, Math.ceil(n / nutzen.length) + 1)));
    return liste.length >= 3 ? liste.slice(0, n) : AG.rsAufgaben(S.rs, n);
}

/* ---------- Speicher ---------- */
const sk = () => "sp-welten2-" + (S.kind?.code || "_") + (vorPfad() ? "-vor" : lesePfad() ? "-le" : "-rs");
function stand(){ const s = laden(sk(), null) || {}; s.sterne = s.sterne || {}; s.schaetze = s.schaetze || []; return s; }
function standSpeichern(s){ merken(sk(), s); }
const alleOffen = () => !!laden("sp-alle-welten", false);
function weltFrei(i){ if (i === 0 || alleOffen()) return true; return stand().schaetze.includes(route()[i - 1].id); }
function stufeFrei(i, si){ if (!weltFrei(i)) return false; if (si === 0 || alleOffen()) return true; return (stand().sterne[`${route()[i].id}-${si - 1}`] || 0) > 0; }
const eKey = () => "sp-energie-" + (S.kind?.code || "_");
const energieDazu = n => merken(eKey(), Math.min(99, laden(eKey(), 0) + n));

/* ---------- Stil ---------- */
const css = `
#welten{ position:fixed; inset:0; z-index:70; display:none; background:#0d1a10; color:#fff; font-family:Nunito, sans-serif; overflow:hidden; }
#welten.an{ display:block; }
.wt-zu{ position:absolute; top:max(12px, env(safe-area-inset-top)); left:12px; z-index:20; width:46px; height:46px; border-radius:50%; border:0; background:rgba(0,0,0,.3); color:#fff; font-size:20px; cursor:pointer; }
.wt-karte{ position:absolute; inset:0; overflow-y:auto; background:linear-gradient(#0d2a3a, #1b4a3a 40%, #2f4a1f); }
.wt-titel{ text-align:center; padding:max(18px, env(safe-area-inset-top)) 60px 8px; }
.wt-titel h2{ font-family:Fraunces, Georgia, serif; font-size:clamp(30px, 7vw, 48px); margin:6px 0 2px; color:#ffe08a; text-shadow:0 4px 0 #6b4a12; }
.wt-leiste{ display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin:8px 0; }
.wt-pill{ background:rgba(255,255,255,.1); border:2px solid rgba(255,255,255,.15); border-radius:999px; padding:7px 14px; font-weight:900; }
.wt-pfadname{ font-weight:800; opacity:.85; font-size:15px; }
.wt-pfad{ max-width:560px; margin:10px auto 40px; padding:10px 14px 30px; }
.wt-insel{ display:flex; align-items:center; gap:14px; margin:0 0 30px; border:0; background:none; color:#fff; text-align:left; padding:0; width:100%; cursor:pointer; }
.wt-insel:nth-child(even){ flex-direction:row-reverse; text-align:right; }
.wt-kreis{ flex:0 0 auto; width:108px; height:108px; border-radius:50%; display:grid; place-items:center; font-size:54px; box-shadow:0 10px 0 rgba(0,0,0,.25), inset 0 -10px 0 rgba(0,0,0,.15); border:5px solid rgba(255,255,255,.7); position:relative; }
.wt-insel.zu .wt-kreis{ filter:grayscale(1) brightness(.55); }
.wt-insel.jetzt .wt-kreis{ animation:wt-puls 1.6s infinite; border-color:#ffe08a; }
@keyframes wt-puls{ 50%{ transform:scale(1.06); box-shadow:0 10px 0 rgba(0,0,0,.25), 0 0 0 12px rgba(255,224,138,.25); } }
.wt-kreis .marke{ position:absolute; font-size:28px; bottom:-6px; right:-6px; }
.wt-kreis .held{ position:absolute; font-size:40px; top:-30px; left:50%; transform:translateX(-50%); animation:wt-hupf 1s infinite; }
@keyframes wt-hupf{ 50%{ transform:translate(-50%, -8px); } }
.wt-info b{ display:block; font-family:Fraunces, Georgia, serif; font-size:22px; color:#ffe08a; }
.wt-info span{ font-weight:800; opacity:.88; font-size:14.5px; }
.wt-info .sp{ display:inline-block; background:#ffe08a; color:#3b2a06; border-radius:999px; padding:1px 9px; font-size:12.5px; font-weight:900; margin-top:3px; }
.wt-welt{ position:absolute; inset:0; overflow-y:auto; display:flex; flex-direction:column; align-items:center; padding:max(70px, env(safe-area-inset-top)) 18px 30px; gap:16px; text-align:center; }
.wt-welt.hell{ color:#2d3530; }
.wt-welt h2{ font-family:Fraunces, Georgia, serif; font-size:clamp(32px, 7vw, 50px); margin:0; }
.wt-sprecher{ display:flex; gap:14px; align-items:flex-end; max-width:640px; }
.wt-sprecher .fig{ font-size:72px; flex:0 0 auto; }
.wt-blase{ background:#fff; color:#2d3530; border-radius:22px 22px 22px 4px; padding:14px 18px; font-size:18px; font-weight:700; text-align:left; box-shadow:0 8px 20px rgba(0,0,0,.2); }
.wt-blase b{ color:#557428; display:block; font-size:14px; margin-bottom:2px; }
.wt-blase button{ border:0; background:#edf2e3; border-radius:50%; width:40px; height:40px; float:right; margin:0 0 4px 8px; font-size:17px; cursor:pointer; }
.wt-stufen{ display:grid; gap:12px; width:100%; max-width:560px; }
.wt-stufe{ display:flex; gap:14px; align-items:center; text-align:left; border:0; border-radius:22px; padding:14px 16px; background:rgba(255,255,255,.94); color:#2d3530; box-shadow:0 6px 0 rgba(0,0,0,.2); cursor:pointer; }
.wt-stufe .ic{ font-size:38px; width:54px; text-align:center; }
.wt-stufe b{ display:block; font-size:19px; font-family:Fraunces, Georgia, serif; color:#2f4a1f; }
.wt-stufe span{ font-weight:700; color:#68745f; font-size:14px; }
.wt-stufe .st{ margin-left:auto; font-size:21px; white-space:nowrap; }
.wt-stufe.zu{ opacity:.55; filter:grayscale(.8); }
.wt-stufe.boss{ background:linear-gradient(135deg, #3b2a06, #6b4a12); color:#fff; } .wt-stufe.boss b{ color:#ffe08a; } .wt-stufe.boss span{ color:#f3dfb0; }
/* Spiel: oben die Szene (Fortschritt), unten die Aufgabe in Ruhe */
.wt-spiel{ position:absolute; inset:0; display:flex; flex-direction:column; }
.wt-szene{ flex:0 0 auto; height:min(34vh, 260px); position:relative; overflow:hidden; }
.wt-hud{ position:absolute; top:max(10px, env(safe-area-inset-top)); left:68px; right:12px; z-index:5; display:flex; gap:8px; align-items:center; pointer-events:none; }
.wt-hud .wt-pill{ background:rgba(0,0,0,.35); color:#fff; font-size:15px; padding:5px 12px; }
.wt-aufgabe{ flex:1; overflow-y:auto; background:#f8f4ec; border-radius:26px 26px 0 0; margin-top:-22px; position:relative; z-index:6; padding:22px 16px 30px; display:flex; justify-content:center; color:#2d3530; }
.wt-aufgabe > div{ width:100%; max-width:760px; }
.wt-steine{ position:absolute; left:4%; right:4%; bottom:16%; display:flex; justify-content:space-between; align-items:flex-end; }
.wt-steine span{ font-size:clamp(30px, 7vw, 48px); filter:drop-shadow(0 4px 3px rgba(0,0,0,.3)); }
.wt-steine span.ziel{ font-size:clamp(36px, 8vw, 54px); }
.wt-held{ position:absolute; bottom:calc(16% + 30px); font-size:clamp(46px, 10vw, 66px); transform:translateX(-50%); transition:left .55s cubic-bezier(.3,1.5,.6,1); filter:drop-shadow(0 8px 6px rgba(0,0,0,.35)); z-index:3; }
.wt-held.hops{ animation:wt-hop .55s; } @keyframes wt-hop{ 40%{ margin-bottom:46px; } }
.wt-kisten{ position:absolute; left:50%; top:58%; transform:translate(-50%, -50%); display:flex; gap:clamp(8px, 2vw, 16px); }
.wt-kiste{ width:clamp(48px, 12vw, 74px); height:clamp(48px, 12vw, 74px); border-radius:18px; background:rgba(0,0,0,.25); display:grid; place-items:center; font-size:clamp(28px, 7vw, 44px); border:3px dashed rgba(255,255,255,.45); }
.wt-kiste.auf{ background:#ffe08a; border:3px solid #fff; animation:wt-glanz .7s; } @keyframes wt-glanz{ 50%{ transform:scale(1.18) rotate(-6deg); } }
.wt-arena{ position:absolute; inset:0; }
.wt-boss{ position:absolute; right:12%; bottom:14%; font-size:clamp(80px, 20vw, 130px); filter:drop-shadow(0 10px 8px rgba(0,0,0,.4)); animation:wt-schweben 2.2s ease-in-out infinite; }
@keyframes wt-schweben{ 50%{ transform:translateY(-10px); } }
.wt-boss.au{ animation:wt-wackel .45s; filter:drop-shadow(0 0 22px #fff) brightness(1.5); }
.wt-boss.lacht{ animation:wt-lach .6s; } @keyframes wt-lach{ 30%{ transform:scale(1.12) rotate(6deg); } 60%{ transform:scale(1.06) rotate(-6deg); } }
@keyframes wt-wackel{ 25%{ transform:translateX(-8px); } 75%{ transform:translateX(8px); } }
.wt-kaempfer{ position:absolute; left:12%; bottom:14%; font-size:clamp(56px, 13vw, 88px); }
.wt-hp{ position:absolute; right:6%; top:calc(max(10px, env(safe-area-inset-top)) + 52px); width:min(46%, 280px); height:18px; background:rgba(0,0,0,.4); border-radius:10px; overflow:hidden; border:2px solid rgba(255,255,255,.5); }
.wt-hp i{ display:block; height:100%; background:linear-gradient(90deg, #ff6b6b, #ffb347); transition:width .5s; }
.wt-bossname{ position:absolute; right:6%; top:calc(max(10px, env(safe-area-inset-top)) + 74px); font-weight:900; font-family:Fraunces, Georgia, serif; font-size:16px; color:#fff; text-shadow:0 2px 4px rgba(0,0,0,.7); }
.wt-geschoss{ position:absolute; z-index:8; font-size:42px; pointer-events:none; }
.wt-meldung{ position:fixed; left:50%; top:28%; transform:translate(-50%, -50%); z-index:15; font-family:Fraunces, Georgia, serif; font-size:clamp(28px, 7vw, 50px); color:#ffe08a; text-shadow:0 4px 0 #6b4a12, 0 0 30px rgba(255,200,80,.5); white-space:nowrap; pointer-events:none; animation:wt-meld 1.5s forwards; }
@keyframes wt-meld{ 0%{ opacity:0; transform:translate(-50%, -50%) scale(.4); } 20%{ opacity:1; transform:translate(-50%, -50%) scale(1.1); } 80%{ opacity:1; } 100%{ opacity:0; transform:translate(-50%, -62%); } }
.wt-ende{ position:absolute; inset:0; z-index:18; background:rgba(5,12,6,.85); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; text-align:center; padding:20px; color:#fff; overflow:auto; }
.wt-ende h2{ font-family:Fraunces, Georgia, serif; color:#ffe08a; font-size:clamp(32px, 7vw, 54px); margin:0; }
.wt-ende .gross{ font-size:92px; animation:wt-glanz 1.2s infinite; }
.wt-knopf{ border:0; background:linear-gradient(#ffd75e, #f0a92b); color:#3b2a06; font-weight:900; font-size:20px; border-radius:18px; padding:12px 28px; box-shadow:0 5px 0 #9b6512; cursor:pointer; }
.wt-chip{ border:2px solid rgba(255,255,255,.3); background:transparent; color:#fff; border-radius:999px; padding:10px 16px; font-weight:800; font-size:16px; cursor:pointer; }
.wt-konfetti{ position:fixed; top:-20px; width:10px; height:16px; z-index:19; pointer-events:none; }
`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
const box = document.createElement("div"); box.id = "welten"; document.body.appendChild(box);

const sfx = a => window.AR && AR.sfx(a);
const held = () => window.AR ? AR.aktiveFigur("runner") : "🦊";
function meldung(t){ const m = document.createElement("div"); m.className = "wt-meldung"; m.textContent = t; box.appendChild(m); setTimeout(() => m.remove(), 1600); }
function konfetti(){ const f = ["#ffe08a", "#ff6b9a", "#5fb4ff", "#9cff8a", "#c39bff", "#ffb347"];
    for (let i = 0; i < 60; i++){ const k = document.createElement("div"); k.className = "wt-konfetti"; k.style.left = Math.random() * 100 + "%"; k.style.background = f[i % f.length];
        k.animate([{ transform: "translateY(0) rotate(0)" }, { transform: `translateY(${innerHeight + 40}px) rotate(${720 * Math.random()}deg)` }], { duration: 1800 + Math.random() * 1800, delay: Math.random() * 600, easing: "ease-in" });
        box.appendChild(k); setTimeout(() => k.remove(), 4200); } }
function zu(){ try { speechSynthesis.cancel(); } catch (e){} box.classList.remove("an"); box.innerHTML = ""; document.body.style.overflow = ""; if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); if (window.arKarten) arKarten(); }

/* ---------- Weltkarte ---------- */
function weltenKarte(){
    try { speechSynthesis.cancel(); } catch (e){}
    const s = stand(), k = window.AR ? AR.konto() : { muenzen: 0 }, R = route();
    const jetzt = R.findIndex((w, i) => weltFrei(i) && !s.schaetze.includes(w.id));
    box.innerHTML = `<button class="wt-zu" id="wt-zu">✕</button><div class="wt-karte">
        <div class="wt-titel"><div style="font-size:50px">🗺️</div><h2>Weltenreise</h2>
            <div class="wt-pfadname">${vorPfad() ? "Hörpfad: Reime, Silben und Laute – ganz ohne Lesen" : lesePfad() ? "Lesepfad: Laute, Silben und Wörter" : "Rechtschreib-Lehrgang: eine Strategie pro Welt"}${S.kind ? ` · ${esc(S.kind.code)}` : ""}</div>
            <div class="wt-leiste"><span class="wt-pill">⚡ ${laden(eKey(), 0)}</span><span class="wt-pill">🪙 ${k.muenzen}</span><span class="wt-pill">⭐ ${Object.values(s.sterne).reduce((a, b) => a + b, 0)} / ${R.length * 9}</span></div>
            <div class="wt-leiste"><span class="wt-pill" style="font-size:24px">${R.map(w => s.schaetze.includes(w.id) ? w.schatz[0] : "▫️").join(" ")}</span></div></div>
        <div class="wt-pfad">${R.map((w, i) => { const frei = weltFrei(i), fertig = s.schaetze.includes(w.id), sterne = [0, 1, 2].reduce((a, x) => a + (s.sterne[`${w.id}-${x}`] || 0), 0);
            const c = inhalt(w), was = lesePfad() ? "" : (AG.STRATEGIE[c.strategie]?.name || (c.strategie === "fehler" ? "Deine Fehlerwörter" : "Alles gemischt"));
            return `<button class="wt-insel${frei ? "" : " zu"}${i === jetzt ? " jetzt" : ""}" data-w="${i}"><div class="wt-kreis" style="background:${w.hg}">${w.emoji}${frei ? "" : `<span class="marke">🔒</span>`}${fertig ? `<span class="marke">${w.schatz[0]}</span>` : ""}${i === jetzt ? `<span class="held">${held()}</span>` : ""}</div>
                <div class="wt-info"><b>${i + 1}. ${esc(w.name)}</b><span>${was ? esc(was) + " · " : ""}${frei ? (sterne ? "⭐".repeat(Math.min(9, sterne)) : "Neues Abenteuer!") : "Noch verschlossen"}</span>${istSchwerpunkt(w) ? `<br><span class="sp">★ dein Schwerpunkt</span>` : ""}</div></button>`; }).join("")}</div></div>`;
    box.querySelector("#wt-zu").onclick = zu;
    box.querySelectorAll("[data-w]").forEach(b => b.onclick = () => { const i = +b.dataset.w; if (!weltFrei(i)){ sfx("au"); b.animate([{ transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "none" }], { duration: 300 }); return; } sfx("muenze"); weltZeigen(i); });
    const j = box.querySelector(".wt-insel.jetzt"); if (j) setTimeout(() => j.scrollIntoView({ block: "center", behavior: "smooth" }), 60);
}

/* ---------- Welt ---------- */
function weltZeigen(i){
    try { speechSynthesis.cancel(); } catch (e){}
    const w = route()[i], s = stand(), text = inhalt(w).text;
    box.innerHTML = `<button class="wt-zu" id="wt-zu">←</button><div class="wt-welt${w.hell ? " hell" : ""}" style="background:${w.hg}">
        <div style="font-size:62px">${w.emoji}</div><h2>${esc(w.name)}</h2>
        <div class="wt-sprecher"><div class="fig">${w.begleiter[0]}</div><div class="wt-blase"><button id="wt-sag">🔊</button><b>${esc(w.begleiter[1])}</b>${esc(text)}</div></div>
        <div class="wt-stufen">${STUFEN.map((x, si) => { const frei = stufeFrei(i, si), sterne = s.sterne[`${w.id}-${si}`] || 0, boss = si === 2;
            return `<button class="wt-stufe${boss ? " boss" : ""}${frei ? "" : " zu"}" data-s="${si}"><div class="ic">${frei ? (boss ? w.waechter[0] : x.ico) : "🔒"}</div>
                <div><b>${boss ? `Wächter: ${esc(w.waechter[1])}` : esc(x.name)}</b><span>${boss ? `Besiege den Wächter und hol dir: ${esc(w.schatz[1])} ${w.schatz[0]}` : esc(x.text)}</span></div><div class="st">${"⭐".repeat(sterne)}${"☆".repeat(3 - sterne)}</div></button>`; }).join("")}</div></div>`;
    box.querySelector("#wt-zu").onclick = weltenKarte;
    box.querySelector("#wt-sag").onclick = () => sprechen(text);
    if (vorPfad()) setTimeout(() => sprechen(text), 300);
    box.querySelectorAll("[data-s]").forEach(b => b.onclick = () => { const si = +b.dataset.s; if (!stufeFrei(i, si)){ sfx("au"); return; } stufeSpielen(i, si); });
}

/* ---------- Eine Stufe: Aufgaben in Ruhe, das Abenteuer zeigt den Fortschritt ---------- */
function stufeSpielen(i, si){
    const w = route()[i], stufe = STUFEN[si], aufgaben = aufgabenFuer(w, stufe.n);
    if (aufgaben.length < 3){ alert("Dafür gibt es gerade zu wenig passende Wörter. Wähle auf der Lernspiel-Seite einen anderen Schwerpunkt."); return weltZeigen(i); }
    const n = aufgaben.length, warte = aufgaben.slice();
    let geloest = 0, erst = 0, energie = 0, nochmal = [];
    const szene = si === 0
        ? `<div class="wt-steine">${Array.from({ length: n }, () => `<span>${w.weg}</span>`).join("")}<span class="ziel">🏁</span></div><div class="wt-held" id="wt-held">${held()}</div>`
        : si === 1 ? `<div class="wt-kisten">${Array.from({ length: n }, () => `<div class="wt-kiste">❔</div>`).join("")}</div>`
        : `<div class="wt-arena"><div class="wt-hp"><i id="wt-hp" style="width:100%"></i></div><div class="wt-bossname">${esc(w.waechter[1])}</div><div class="wt-boss" id="wt-boss">${w.waechter[0]}</div><div class="wt-kaempfer" id="wt-kaempfer">${held()}</div></div>`;
    box.innerHTML = `<button class="wt-zu" id="wt-zu">←</button><div class="wt-spiel"><div class="wt-szene" style="background:${w.hg}">${szene}
        <div class="wt-hud"><span class="wt-pill" id="wt-stand">0 / ${n}</span><span class="wt-pill" id="wt-en">⚡ +0</span></div></div><div class="wt-aufgabe"><div id="wt-a"></div></div></div>`;
    box.querySelector("#wt-zu").onclick = () => weltZeigen(i);
    const heldEl = box.querySelector("#wt-held");
    const heldSetzen = k => { if (!heldEl) return; const steine = box.querySelectorAll(".wt-steine span"), f = box.querySelector(".wt-szene").getBoundingClientRect(), r = steine[Math.min(k, steine.length - 1)].getBoundingClientRect();
        heldEl.style.left = (r.left - f.left + r.width / 2) + "px"; heldEl.classList.remove("hops"); void heldEl.offsetWidth; heldEl.classList.add("hops"); };
    if (heldEl){ heldEl.style.transition = "none"; heldEl.style.left = "5%"; heldEl.offsetWidth; heldEl.style.transition = ""; heldEl.style.bottom = "calc(16% + 46px)"; }
    const geschoss = (von, nach, zeichen) => { const f = box.getBoundingClientRect(), a = von.getBoundingClientRect(), b = nach.getBoundingClientRect();
        const g = document.createElement("div"); g.className = "wt-geschoss"; g.textContent = zeichen; box.appendChild(g);
        g.animate([{ left: a.left - f.left + a.width / 2 + "px", top: a.top - f.top + a.height / 3 + "px", transform: "scale(.6)" }, { left: b.left - f.left + b.width / 2 + "px", top: b.top - f.top + b.height / 3 + "px", transform: "scale(1.3)" }], { duration: 450, easing: "ease-in", fill: "forwards" });
        setTimeout(() => g.remove(), 470); };
    if (si === 2) setTimeout(() => meldung(sek() ? "Duell!" : "Auf in den Kampf! ⚔️"), 200);
    const fortschritt = r => {
        geloest++;
        box.querySelector("#wt-stand").textContent = `${geloest} / ${n}`;
        if (si === 0) heldSetzen(geloest === n ? n : geloest - 1 + 1);
        if (si === 1){ const k = box.querySelectorAll(".wt-kiste")[geloest - 1]; if (k){ k.classList.add("auf"); k.textContent = w.schatzKiste; } }
        if (si === 2){ const bo = box.querySelector("#wt-boss"), ka = box.querySelector("#wt-kaempfer");
            geschoss(ka, bo, r.erst ? ["⚡", "⭐", "💥", "✨"][geloest % 4] : "✨"); sfx("pew");
            setTimeout(() => { bo.classList.remove("au"); void bo.offsetWidth; bo.classList.add("au"); sfx("boom"); }, 430);
            box.querySelector("#wt-hp").style.width = ((n - geloest) / n * 100) + "%"; }
        sfx("gut");
    };
    const naechste = () => {
        if (!warte.length) return abschluss(i, si, { n, erst, energie, nochmal });
        const a = warte.shift();
        AG.zeigen(box.querySelector("#wt-a"), a, r => {
            const e = r.erst ? 2 : 1; energie += e; energieDazu(e); box.querySelector("#wt-en").textContent = "⚡ +" + energie;
            if (r.erst) erst++; else if (!nochmal.includes(a.w)) nochmal.push(a.w);
            fortschritt(r);
            setTimeout(naechste, 650);
        }, { beiFehler: () => { sfx("au"); if (si === 2){ const bo = box.querySelector("#wt-boss"); bo.classList.remove("lacht"); void bo.offsetWidth; bo.classList.add("lacht"); } } });
        box.querySelector(".wt-aufgabe").scrollTop = 0;
    };
    naechste();
}

/* ---------- Abschluss ---------- */
function abschluss(i, si, z){
    const R = route(), w = R[i], s = stand(), key = `${w.id}-${si}`;
    const anteil = z.erst / z.n, sterne = anteil >= .85 ? 3 : anteil >= .5 ? 2 : 1;
    s.sterne[key] = Math.max(s.sterne[key] || 0, sterne);
    let neuerSchatz = false, muenzen = sterne * 2;
    if (si === 2 && !s.schaetze.includes(w.id)){ s.schaetze.push(w.id); neuerSchatz = true; muenzen += 15; }
    standSpeichern(s);
    if (window.AR){ const k = AR.konto(); k.muenzen += muenzen; AR.kontoSpeichern(k); }
    if (si === 2){ const bo = box.querySelector("#wt-boss"); if (bo) bo.animate([{ transform: "scale(1) rotate(0)", opacity: 1 }, { transform: "scale(.2) rotate(540deg)", opacity: 0 }], { duration: 900, fill: "forwards" }); }
    const weiter = si < 2 ? { t: `Weiter: ${si === 0 ? "Die Schatzsuche 🗝️" : `Wächter ${w.waechter[0]}`}`, f: () => stufeSpielen(i, si + 1) }
        : i + 1 < R.length ? { t: `Weiter: ${R[i + 1].name} ${R[i + 1].emoji}`, f: () => weltZeigen(i + 1) } : { t: "Zur Weltkarte", f: weltenKarte };
    const fertigAlles = neuerSchatz && i === R.length - 1;
    setTimeout(() => {
        const e = document.createElement("div"); e.className = "wt-ende";
        e.innerHTML = `<div class="gross">${neuerSchatz ? w.schatz[0] : "⭐"}</div><h2>${fertigAlles ? "Weltenreise geschafft!" : neuerSchatz ? esc(w.schatz[1]) + "!" : "Geschafft!"}</h2>
            <div style="font-size:40px">${"⭐".repeat(sterne)}${"☆".repeat(3 - sterne)}</div>
            <div style="font-weight:800;font-size:18px">${z.erst} von ${z.n} gleich beim ersten Mal</div>
            ${neuerSchatz ? `<div style="font-weight:800;font-size:18px;max-width:520px">${esc(w.begleiter[1])}: ${sek() ? "Stark gemacht. Die nächste Welt ist offen." : "Danke, du bist ein echter Held! Die nächste Welt ist jetzt offen."}</div>` : ""}
            <div class="wt-leiste"><span class="wt-pill">⚡ +${z.energie} Energie</span><span class="wt-pill">🪙 +${muenzen}</span></div>
            ${z.nochmal.length ? `<div style="font-weight:800;opacity:.85">Mit Tipp geschafft:</div><div style="font-family:var(--wort);font-size:24px;max-width:640px">${z.nochmal.slice(0, 8).map(esc).join(" · ")}</div>` : ""}
            <div class="wt-leiste" style="margin-top:10px"><button class="wt-knopf" id="wt-weiter">${esc(weiter.t)}</button><button class="wt-chip" id="wt-karte">🗺️ Weltkarte</button></div>`;
        box.appendChild(e);
        konfetti(); sfx("level");
        e.querySelector("#wt-weiter").onclick = weiter.f;
        e.querySelector("#wt-karte").onclick = weltenKarte;
    }, si === 2 ? 1000 : 500);
}

/* ---------- Kachel auf der Auswahlseite ---------- */
function weltenKachel(){
    const ziel = document.getElementById("arcade-spiele"); if (!ziel) return;
    const s = stand(), R = route();
    let k = document.getElementById("wt-kachel");
    if (!k){ ziel.insertAdjacentHTML("beforebegin", `<button class="spiel" id="wt-kachel" style="width:100%;margin-bottom:14px;background:linear-gradient(120deg, rgba(255,224,138,.22), rgba(255,255,255,.06));border:2px solid rgba(255,224,138,.5)"></button>`); k = document.getElementById("wt-kachel"); }
    k.innerHTML = `<div class="ico" style="font-size:34px">🗺️</div><div><b style="font-size:22px">Weltenreise</b><span>${vorPfad() ? "Hörpfad für Anfänger: Reime, Silben klatschen, Anfangslaute, Robo-Sprache – alles wird vorgelesen." : lesePfad() ? "Lesepfad: Laute hören, Silben legen, genau lesen – Welt für Welt." : "Rechtschreib-Lehrgang: In jeder Welt eine Strategie – Schwingen, Verlängern, Ableiten, Merkwörter …"} In Ruhe lösen, Tipps bei Fehlern, Energie sammeln.<br><em>${s.schaetze.length ? `${s.schaetze.length} von ${R.length} Schätzen: ${R.filter(w => s.schaetze.includes(w.id)).map(w => w.schatz[0]).join(" ")}` : `Die Reise beginnt: ${R[0].name} ${R[0].emoji}`}</em></span></div>`;
    k.onclick = () => { box.classList.add("an"); document.body.style.overflow = "hidden"; try { const e = document.documentElement; if (!document.fullscreenElement && e.requestFullscreen && matchMedia("(pointer:coarse)").matches) e.requestFullscreen().catch(() => {}); } catch (x){} weltenKarte(); };
}
const alt = window.arKarten;
window.arKarten = function(){ alt && alt(); weltenKachel(); };
weltenKachel();
})();
