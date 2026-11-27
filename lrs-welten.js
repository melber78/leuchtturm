/* ============================================================
   Leuchtturm – Weltenreise
   Von Welt zu Welt: jede Welt hat eine Geschichte, eine Begleitfigur,
   zwei Abenteuer (Springen · Suchen · Bauen) und einen Wächter.
   Sterne, Schätze und Münzen (gemeinsam mit den Action-Spielen).
   Lerninhalt aus lrs-spiele.php / lrs-arcade.js.
   ============================================================ */
(function(){
const WELTEN = [
    { id: "wald", name: "Zauberwald", emoji: "🌳", hg: "linear-gradient(#1f4d2b, #3f7a3a 60%, #5d8f3e)", boden: "#3b5e2a", begleiter: ["🦊", "Fuchs Finn"],
      geschichte: "Der Trollkönig hat die Lichter des Zauberwaldes gestohlen! Ohne sie finden die Tiere nachts nicht nach Hause. Hilfst du mir, sie zurückzuholen?",
      sek: "Im Zauberwald sind alle Lichter erloschen. Der Trollkönig hält sie gefangen. Deine erste Expedition beginnt hier.",
      abenteuer: [["springen", "Über den Bach", "Spring über die Seerosen ans andere Ufer.", "🪷", "#2f6f8f"], ["suchen", "Leuchtpilze", "Finde die leuchtenden Pilze.", "🍄"]],
      waechter: ["🧌", "Trollkönig Brumm"], schatz: ["✨", "Waldlicht"] },
    { id: "eis", name: "Eisreich", emoji: "❄️", hg: "linear-gradient(#bfe3f5, #e9f6fc 60%, #ffffff)", boden: "#dff1fa", dunkel: false, begleiter: ["🐧", "Pinguin Paul"],
      geschichte: "Brrr! Der Eisbär hat alle Fische im Eis eingefroren. Meine Familie hat großen Hunger. Kannst du uns helfen?",
      sek: "Im Eisreich ist alles erstarrt. Nur wer genau hinschaut, kommt über das brüchige Eis.",
      abenteuer: [["suchen", "Eisblöcke knacken", "Knack die richtigen Eisblöcke.", "🧊"], ["springen", "Eisschollen", "Spring von Scholle zu Scholle.", "🧊", "#5aa9d6"]],
      waechter: ["🐻‍❄️", "Eisbär Frost"], schatz: ["💎", "Eisdiamant"] },
    { id: "wueste", name: "Sandwüste", emoji: "🏜️", hg: "linear-gradient(#ffcf7a, #f5b45a 55%, #e39a43)", boden: "#e8a957", begleiter: ["🐪", "Kamel Karl"],
      geschichte: "Irgendwo unter dem Sand liegt der goldene Kompass. Aber ein Sandsturm zieht auf! Wir müssen schnell eine Brücke bauen.",
      sek: "Ein Sandsturm zieht über die Wüste. Irgendwo unter den Dünen liegt der goldene Kompass.",
      abenteuer: [["bauen", "Sandsturm-Brücke", "Bau Wörter, bevor der Sand alles zudeckt.", "🟫", "#d9963e"], ["suchen", "Schatzsuche", "Grab an den richtigen Stellen.", "🏺"]],
      waechter: ["🦂", "Skorpionkönig Zack"], schatz: ["🧭", "Goldener Kompass"] },
    { id: "meer", name: "Meerestiefe", emoji: "🌊", hg: "linear-gradient(#1b6ca8, #12467a 60%, #0c2f55)", boden: "#0c2f55", begleiter: ["🐢", "Schildkröte Tilda"],
      geschichte: "Tief unten im Meer liegt die Zauberperle. Ohne sie verlieren die Korallen ihre Farben. Tauchst du mit mir?",
      sek: "In der Tiefe verblassen die Korallen. Die Zauberperle muss zurück an ihren Platz.",
      abenteuer: [["suchen", "Perlenblasen", "Fang die richtigen Luftblasen.", "🫧"], ["springen", "Muschelweg", "Spring über die Muscheln.", "🐚", "#0f3d6b"]],
      waechter: ["🐙", "Krake Kalle"], schatz: ["🦪", "Zauberperle"] },
    { id: "dino", name: "Dinotal", emoji: "🦕", hg: "linear-gradient(#a8d672, #7fb64e 55%, #5f8f38)", boden: "#6b8f3a", begleiter: ["🦕", "Dino Rudi"],
      geschichte: "Meine Dino-Eier sind ins Tal gerollt! Bald schlüpfen die Babys. Wir müssen ein sicheres Nest bauen.",
      sek: "Im Dinotal herrscht Aufregung: Die Eier sind ins Tal gerollt, und der T-Rex ist unterwegs.",
      abenteuer: [["springen", "Über den Lavabach", "Spring über die heißen Steine.", "🪨", "#d9542c"], ["bauen", "Nest bauen", "Bau mit Wörtern ein Nest.", "🪺", "#8a6a4b"]],
      waechter: ["🦖", "T-Rex Rex"], schatz: ["🥚", "Goldenes Dino-Ei"] },
    { id: "vulkan", name: "Vulkaninsel", emoji: "🌋", hg: "linear-gradient(#3a1d1d, #6b2a1f 55%, #a33b1f)", boden: "#3a1d1d", begleiter: ["🐦‍🔥", "Feuervogel Funke"],
      geschichte: "Der Vulkan grummelt! Der Feuerdrache will den Feuerkristall für sich behalten. Nur mutige Abenteurer kommen hier weiter.",
      sek: "Der Vulkan ist aktiv. Im Krater bewacht der Feuerdrache den Feuerkristall.",
      abenteuer: [["bauen", "Brücke über die Lava", "Bau die Brücke, bevor die Lava steigt.", "🧱", "#e0552a"], ["suchen", "Kristallhöhle", "Finde die richtigen Kristalle.", "💎"]],
      waechter: ["🐉", "Feuerdrache Glut"], schatz: ["🔥", "Feuerkristall"] },
    { id: "all", name: "Weltraum", emoji: "🪐", hg: "radial-gradient(ellipse at 50% 120%, #2a3f73, #0a0f24 70%)", boden: "#0a0f24", begleiter: ["🤖", "Roboter Robo"],
      geschichte: "Piep! Meine Rakete ist kaputt und die Teile schweben im All. Ohne sie kommen wir nie zum Wolkenschloss!",
      sek: "Funkspruch von Robo: Raketenteile im Asteroidengürtel verstreut. Bergung erforderlich.",
      abenteuer: [["suchen", "Sternenfang", "Sammle die richtigen Sterne.", "⭐"], ["springen", "Asteroidenhüpfen", "Spring von Asteroid zu Asteroid.", "🪨", "#101836"]],
      waechter: ["👾", "Alien-Kommandant Zork"], schatz: ["🚀", "Sternenrakete"] },
    { id: "wolke", name: "Wolkenschloss", emoji: "🏰", hg: "linear-gradient(#f7c6e6, #c9d8ff 55%, #eef3ff)", boden: "#eef3ff", begleiter: ["🦄", "Einhorn Wolke"],
      geschichte: "Du hast es fast geschafft! Im Wolkenschloss wartet der Schattenzauberer. Mit allen Schätzen kannst du ihn besiegen!",
      sek: "Letzte Station: das Wolkenschloss. Der Schattenzauberer wartet – zeig, was du gelernt hast.",
      abenteuer: [["bauen", "Regenbogenbrücke", "Bau die Regenbogenbrücke.", "🌈", "#c39bff"], ["springen", "Wolkenhüpfen", "Hüpf über die Wolken.", "☁️", "#9fb8ff"]],
      waechter: ["🧙", "Schattenzauberer Nebel"], schatz: ["👑", "Krone der Weltenreise"] },
];
const hell = w => ["eis", "wolke", "dino", "wueste"].includes(w.id);

/* ---------- Speicher ---------- */
const sk = () => "sp-welten-" + (S.kind?.code || "_");
function stand(){ const s = laden(sk(), null) || {}; s.sterne = s.sterne || {}; s.schaetze = s.schaetze || []; s.quelle = s.quelle || ""; return s; }
function standSpeichern(s){ merken(sk(), s); }
function weltFrei(i){ if (i === 0) return true; const st = stand(); return st.schaetze.includes(WELTEN[i - 1].id); }
function stufeFrei(wi, si){ if (!weltFrei(wi)) return false; if (si === 0) return true; return (stand().sterne[`${wi}-${si - 1}`] || 0) > 0; }

/* ---------- Stil ---------- */
const css = `
#welten{ position:fixed; inset:0; z-index:70; display:none; background:#0d1a10; color:#fff; font-family:Nunito, sans-serif; user-select:none; -webkit-user-select:none; overflow:hidden; }
#welten.an{ display:block; }
.wt-zu{ position:absolute; top:max(12px, env(safe-area-inset-top)); left:12px; z-index:20; width:46px; height:46px; border-radius:50%; border:0; background:rgba(0,0,0,.3); color:#fff; font-size:20px; }
.wt-karte{ position:absolute; inset:0; overflow-y:auto; background:linear-gradient(#0d2a3a, #1b4a3a 40%, #2f4a1f); }
.wt-titel{ text-align:center; padding:max(18px, env(safe-area-inset-top)) 60px 8px; }
.wt-titel h2{ font-family:Fraunces, Georgia, serif; font-size:clamp(30px, 7vw, 48px); margin:6px 0 2px; color:#ffe08a; text-shadow:0 4px 0 #6b4a12; }
.wt-leiste{ display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin:8px 0; }
.wt-pill{ background:rgba(255,255,255,.1); border:2px solid rgba(255,255,255,.15); border-radius:999px; padding:7px 14px; font-weight:900; }
.wt-chip{ border:2px solid rgba(255,255,255,.25); background:transparent; color:#fff; border-radius:999px; padding:8px 14px; font-weight:800; font-size:14px; }
.wt-chip.an{ background:#ffe08a; color:#2f2a10; border-color:#ffe08a; }
.wt-pfad{ position:relative; max-width:560px; margin:10px auto 40px; padding:10px 0 30px; }
.wt-pfad svg.weg{ position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
.wt-insel{ position:relative; display:flex; align-items:center; gap:14px; margin:0 0 34px; border:0; background:none; color:#fff; text-align:left; padding:0; width:100%; }
.wt-insel:nth-child(even){ flex-direction:row-reverse; text-align:right; }
.wt-kreis{ flex:0 0 auto; width:112px; height:112px; border-radius:50%; display:grid; place-items:center; font-size:56px; box-shadow:0 10px 0 rgba(0,0,0,.25), inset 0 -10px 0 rgba(0,0,0,.15); border:5px solid rgba(255,255,255,.7); position:relative; }
.wt-insel.zu .wt-kreis{ filter:grayscale(1) brightness(.55); }
.wt-insel.jetzt .wt-kreis{ animation:wt-puls 1.6s infinite; border-color:#ffe08a; }
@keyframes wt-puls{ 50%{ transform:scale(1.07); box-shadow:0 10px 0 rgba(0,0,0,.25), 0 0 0 12px rgba(255,224,138,.25); } }
.wt-kreis .schloss{ position:absolute; font-size:30px; bottom:-6px; right:-6px; }
.wt-kreis .held{ position:absolute; font-size:40px; top:-30px; left:50%; transform:translateX(-50%); animation:wt-hupf 1s infinite; }
@keyframes wt-hupf{ 50%{ transform:translate(-50%, -8px); } }
.wt-info b{ display:block; font-family:Fraunces, Georgia, serif; font-size:22px; color:#ffe08a; }
.wt-info span{ font-weight:800; opacity:.85; }
.wt-schatz{ font-size:26px; }
/* Welt */
.wt-welt{ position:absolute; inset:0; overflow-y:auto; display:flex; flex-direction:column; align-items:center; padding:max(70px, env(safe-area-inset-top)) 18px 30px; gap:16px; text-align:center; }
.wt-welt.hell{ color:#2d3530; } .wt-welt.hell .wt-pill{ background:rgba(255,255,255,.6); border-color:rgba(0,0,0,.08); }
.wt-welt h2{ font-family:Fraunces, Georgia, serif; font-size:clamp(32px, 7vw, 50px); margin:0; text-shadow:0 3px 0 rgba(0,0,0,.25); }
.wt-sprecher{ display:flex; gap:14px; align-items:flex-end; max-width:640px; }
.wt-sprecher .fig{ font-size:76px; flex:0 0 auto; animation:wt-hupf2 2.4s infinite; }
@keyframes wt-hupf2{ 50%{ transform:translateY(-6px) rotate(-3deg); } }
.wt-blase{ background:#fff; color:#2d3530; border-radius:22px 22px 22px 4px; padding:14px 18px; font-size:18px; font-weight:700; text-align:left; box-shadow:0 8px 20px rgba(0,0,0,.2); position:relative; }
.wt-blase b{ color:#557428; display:block; font-size:14px; margin-bottom:2px; }
.wt-blase button{ border:0; background:#edf2e3; border-radius:50%; width:40px; height:40px; float:right; margin:0 0 4px 8px; font-size:17px; }
.wt-stufen{ display:grid; gap:12px; width:100%; max-width:560px; }
.wt-stufe{ display:flex; gap:14px; align-items:center; text-align:left; border:0; border-radius:22px; padding:14px 16px; background:rgba(255,255,255,.92); color:#2d3530; box-shadow:0 6px 0 rgba(0,0,0,.2); }
.wt-stufe .ic{ font-size:40px; width:56px; text-align:center; }
.wt-stufe b{ display:block; font-size:19px; font-family:Fraunces, Georgia, serif; color:#2f4a1f; }
.wt-stufe span{ font-weight:700; color:#68745f; font-size:14px; }
.wt-stufe .st{ margin-left:auto; font-size:22px; white-space:nowrap; }
.wt-stufe.zu{ opacity:.55; filter:grayscale(.8); }
.wt-stufe.boss{ background:linear-gradient(135deg, #3b2a06, #6b4a12); color:#fff; } .wt-stufe.boss b{ color:#ffe08a; } .wt-stufe.boss span{ color:#f3dfb0; }
/* Spielfläche */
.wt-spiel{ position:absolute; inset:0; overflow:hidden; touch-action:manipulation; }
.wt-hud{ position:absolute; top:0; left:0; right:0; z-index:10; display:flex; gap:8px; align-items:center; padding:max(10px, env(safe-area-inset-top)) 12px 8px 68px; pointer-events:none; }
.wt-hud .wt-pill{ background:rgba(0,0,0,.35); color:#fff; font-size:15px; padding:5px 12px; }
.wt-fort{ flex:1; height:14px; border-radius:7px; background:rgba(0,0,0,.3); overflow:hidden; max-width:260px; } .wt-fort i{ display:block; height:100%; background:#ffe08a; border-radius:7px; transition:width .4s; }
.wt-frage{ position:absolute; top:calc(max(10px, env(safe-area-inset-top)) + 54px); left:50%; transform:translateX(-50%); z-index:9; background:#fff; color:#2d3530; border-radius:20px; padding:10px 20px; min-height:60px;
    font-family:var(--wort); font-size:clamp(26px, 6vw, 44px); box-shadow:0 8px 24px rgba(0,0,0,.3); display:flex; gap:12px; align-items:center; max-width:94%; text-align:center; }
.wt-frage.satz{ font-size:clamp(17px, 4vw, 28px); } .wt-frage.regel{ font-family:Nunito, sans-serif; font-weight:900; font-size:clamp(17px, 4vw, 24px); }
.wt-frage svg{ width:64px; height:64px; } .wt-frage .sag{ border:0; background:#edf2e3; border-radius:50%; width:44px; height:44px; font-size:18px; flex:0 0 auto; }
.ar-luecke{ display:inline-block; min-width:1.2em; color:#d9a23f; border-bottom:4px solid #d9a23f; }
.wt-held{ position:absolute; z-index:6; font-size:62px; transform:translate(-50%, -100%); transition:left .45s cubic-bezier(.3,1.4,.6,1), top .45s cubic-bezier(.3,1.4,.6,1); filter:drop-shadow(0 8px 6px rgba(0,0,0,.35)); }
.wt-wasser{ position:absolute; left:0; right:0; top:36%; bottom:20%; }
.wt-ufer{ position:absolute; left:0; right:0; bottom:0; height:20%; }
.wt-steine{ position:absolute; left:0; right:0; top:44%; display:flex; justify-content:center; gap:4%; z-index:5; }
.wt-stein{ width:28%; max-width:190px; aspect-ratio:1.5; border:0; border-radius:50%; display:grid; place-items:center; background:rgba(255,255,255,.95); color:#2d3530; font-family:var(--wort); font-size:clamp(22px, 5vw, 36px);
    box-shadow:0 10px 0 rgba(0,0,0,.25); position:relative; overflow:hidden; white-space:nowrap; }
.wt-stein .deko{ position:absolute; font-size:44px; opacity:.25; } .wt-stein span{ position:relative; }
.wt-stein.ok{ background:#9cff8a; } .wt-stein.nein{ animation:wt-sinken .9s forwards; }
@keyframes wt-sinken{ 30%{ transform:rotate(-8deg); } 100%{ transform:translateY(60px) scale(.6); opacity:0; } }
.wt-ziel{ position:absolute; top:24%; left:50%; transform:translateX(-50%); font-size:54px; z-index:4; }
.wt-gitter{ position:absolute; top:calc(max(10px, env(safe-area-inset-top)) + 140px); left:50%; transform:translateX(-50%); width:min(94%, 640px); display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; z-index:5; }
@media (min-width:700px){ .wt-gitter{ grid-template-columns:repeat(4, 1fr); } }
.wt-ding{ border:0; border-radius:22px; min-height:92px; background:rgba(255,255,255,.93); color:#2d3530; font-family:var(--wort); font-size:clamp(17px, 4vw, 26px); box-shadow:0 6px 0 rgba(0,0,0,.2); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:6px; position:relative; overflow:hidden; }
.wt-ding .deko{ font-size:30px; line-height:1; } .wt-ding svg{ width:46px; height:46px; }
.wt-ding.ok{ background:#ffe08a; animation:wt-glanz .6s; } .wt-ding.ok::after{ content:"✨"; position:absolute; top:4px; right:8px; }
.wt-ding.nein{ animation:wt-wackel .4s; background:#ffc9b8; }
@keyframes wt-glanz{ 50%{ transform:scale(1.12); } } @keyframes wt-wackel{ 25%{ transform:translateX(-7px); } 75%{ transform:translateX(7px); } }
.wt-gefahr{ position:absolute; left:0; right:0; bottom:0; z-index:2; transition:height .5s linear; }
.wt-bruecke{ position:absolute; bottom:32%; left:4%; right:4%; display:flex; gap:4px; z-index:3; height:30px; }
.wt-bruecke i{ flex:1; border-radius:6px; background:rgba(255,255,255,.14); border:2px dashed rgba(255,255,255,.35); }
.wt-bruecke i.fest{ border:0; box-shadow:0 5px 0 rgba(0,0,0,.25); animation:wt-glanz .5s; }
.wt-bau{ position:absolute; top:calc(max(10px, env(safe-area-inset-top)) + 130px); left:50%; transform:translateX(-50%); z-index:6; width:min(96%, 680px); display:flex; flex-direction:column; align-items:center; gap:12px; }
.wt-plaetze{ display:flex; gap:5px; flex-wrap:wrap; justify-content:center; background:rgba(255,255,255,.9); border-radius:18px; padding:10px 14px; min-height:74px; }
.wt-platz{ min-width:38px; height:56px; border-bottom:4px solid #b3c69a; font-family:var(--wort); font-size:36px; color:#2d3530; display:flex; align-items:flex-end; justify-content:center; }
.wt-kacheln{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; }
.wt-kachel{ min-width:58px; height:64px; padding:0 12px; border:0; border-radius:16px; background:#fff; color:#2d3530; font-family:var(--wort); font-size:30px; box-shadow:0 5px 0 rgba(0,0,0,.25); }
.wt-kachel.weg{ visibility:hidden; } .wt-kachel.nein{ animation:wt-wackel .35s; background:#ffc9b8; }
.wt-merk{ background:#fff; color:#2d3530; border-radius:20px; padding:12px 26px; font-family:var(--wort); font-size:clamp(34px, 8vw, 56px); box-shadow:0 8px 24px rgba(0,0,0,.3); }
.wt-knopf{ border:0; background:linear-gradient(#ffd75e, #f0a92b); color:#3b2a06; font-weight:900; font-size:20px; border-radius:18px; padding:12px 28px; box-shadow:0 5px 0 #9b6512; }
.wt-arena{ position:absolute; left:0; right:0; top:30%; height:32%; z-index:4; }
.wt-boss{ position:absolute; right:10%; top:0; font-size:clamp(90px, 22vw, 150px); filter:drop-shadow(0 10px 8px rgba(0,0,0,.4)); animation:wt-schweben 2.2s ease-in-out infinite; }
@keyframes wt-schweben{ 50%{ transform:translateY(-12px); } }
.wt-boss.au{ animation:wt-wackel .4s; filter:drop-shadow(0 0 20px #fff) brightness(1.6); }
.wt-kaempfer{ position:absolute; left:12%; bottom:0; font-size:clamp(64px, 15vw, 100px); }
.wt-kaempfer.au{ animation:wt-wackel .4s; }
.wt-hp{ position:absolute; right:6%; top:-34px; width:min(46%, 280px); height:20px; background:rgba(0,0,0,.4); border-radius:10px; overflow:hidden; border:2px solid rgba(255,255,255,.4); }
.wt-hp i{ display:block; height:100%; background:linear-gradient(90deg, #ff6b6b, #ffb347); transition:width .4s; }
.wt-bossname{ position:absolute; right:6%; top:-62px; font-weight:900; font-family:Fraunces, Georgia, serif; font-size:18px; text-shadow:0 2px 4px rgba(0,0,0,.6); }
.wt-antworten{ position:absolute; left:0; right:0; bottom:max(24px, env(safe-area-inset-bottom)); display:flex; gap:12px; justify-content:center; flex-wrap:wrap; z-index:6; padding:0 12px; }
.wt-antwort{ min-width:110px; min-height:72px; padding:10px 22px; border:0; border-radius:20px; background:#fff; color:#2d3530; font-family:var(--wort); font-size:clamp(22px, 5vw, 34px); box-shadow:0 6px 0 rgba(0,0,0,.25); }
.wt-antwort.ok{ background:#9cff8a; } .wt-antwort.nein{ background:#ffc9b8; animation:wt-wackel .35s; }
.wt-geschoss{ position:absolute; z-index:8; font-size:46px; pointer-events:none; }
.wt-meldung{ position:absolute; left:50%; top:46%; transform:translate(-50%, -50%); z-index:15; font-family:Fraunces, Georgia, serif; font-size:clamp(30px, 7vw, 54px); color:#ffe08a; text-shadow:0 4px 0 #6b4a12, 0 0 30px rgba(255,200,80,.5); white-space:nowrap; pointer-events:none; animation:wt-meld 1.5s forwards; }
@keyframes wt-meld{ 0%{ opacity:0; transform:translate(-50%, -50%) scale(.4); } 20%{ opacity:1; transform:translate(-50%, -50%) scale(1.1); } 80%{ opacity:1; } 100%{ opacity:0; transform:translate(-50%, -62%); } }
.wt-loesung{ position:absolute; left:50%; bottom:28%; transform:translateX(-50%); z-index:15; background:#fff; color:#2d3530; border-radius:18px; padding:10px 20px; font-family:var(--wort); font-size:clamp(24px, 5vw, 36px); box-shadow:0 0 0 6px rgba(181,88,63,.5); white-space:nowrap; pointer-events:none; }
.wt-ende{ position:absolute; inset:0; z-index:18; background:rgba(5,12,6,.8); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; text-align:center; padding:20px; color:#fff; }
.wt-ende h2{ font-family:Fraunces, Georgia, serif; color:#ffe08a; font-size:clamp(34px, 7vw, 56px); margin:0; }
.wt-ende .gross{ font-size:96px; animation:wt-glanz 1.2s infinite; }
.wt-konfetti{ position:absolute; top:-20px; width:10px; height:16px; z-index:19; pointer-events:none; }
`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
const box = document.createElement("div"); box.id = "welten"; document.body.appendChild(box);

let LAUF = null;
function stopp(){ if (LAUF){ LAUF.aus = true; LAUF.timer.forEach(clearTimeout); clearInterval(LAUF.uhr); } LAUF = null; try { speechSynthesis.cancel(); } catch (e){} }
function neuerLauf(){ stopp(); LAUF = { aus: false, timer: [] }; return LAUF; }
const spaeter = (f, ms) => { const L = LAUF; const t = setTimeout(() => { if (L && !L.aus) f(); }, ms); L?.timer.push(t); };
const sfx = a => window.AR && AR.sfx(a);
const held = () => window.AR ? AR.aktiveFigur("runner") : "🦊";
function meldung(t){ const m = document.createElement("div"); m.className = "wt-meldung"; m.textContent = t; box.appendChild(m); setTimeout(() => m.remove(), 1600); }
function konfetti(){ const f = ["#ffe08a", "#ff6b9a", "#5fb4ff", "#9cff8a", "#c39bff", "#ffb347"];
    for (let i = 0; i < 60; i++){ const k = document.createElement("div"); k.className = "wt-konfetti"; k.style.left = Math.random() * 100 + "%"; k.style.background = f[i % f.length];
        k.animate([{ transform: "translateY(0) rotate(0)" }, { transform: `translateY(${innerHeight + 40}px) rotate(${720 * Math.random()}deg)` }], { duration: 1800 + Math.random() * 1800, delay: Math.random() * 600, easing: "ease-in" });
        box.appendChild(k); setTimeout(() => k.remove(), 4200); } }
function schliessen(){ stopp(); box.classList.remove("an"); box.innerHTML = ""; document.body.style.overflow = ""; if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); if (window.arKarten) arKarten(); weltenKarte(); }

/* ---------- Lerninhalt ---------- */
function quelle(){ const q = AR.quellenFuer("runner"), s = stand().quelle; return q.includes(s) ? s : (S.kind && buchstaben() && !sek() && !S.kind.r.length && q.includes("anlaut") ? "anlaut" : q[0]); }
function fragen(n){ const a = AR.runnerAufgaben(quelle()); return mischen(a).slice(0, n); }
function bauWoerter(n){ return baumeisterAufgaben(n).map(a => a.w); }
function frageHtml(a){ return `${a.svg || ""}${a.sag ? `<button class="sag">🔊</button>` : ""}${a.html ? `<span>${a.html}</span>` : ""}`; }
function frageZeigen(el, a){ el.className = "wt-frage" + (a.satz ? " satz" : ""); el.innerHTML = frageHtml(a); const s = el.querySelector(".sag"); if (s){ s.onclick = () => sprechen(a.sag); sprechen(a.sag); } }

/* ---------- Weltkarte ---------- */
function weltenKarte(){
    stopp();
    if (!box.classList.contains("an")) return;
    const s = stand(), k = AR.konto();
    const jetzt = WELTEN.findIndex((w, i) => weltFrei(i) && !s.schaetze.includes(w.id));
    const q = quelle();
    box.innerHTML = `<button class="wt-zu" id="wt-zu">✕</button><div class="wt-karte">
        <div class="wt-titel"><div style="font-size:50px">🗺️</div><h2>Weltenreise</h2>
            <div class="wt-leiste"><span class="wt-pill">🪙 ${k.muenzen}</span><span class="wt-pill">⭐ ${Object.values(s.sterne).reduce((a, b) => a + b, 0)} / ${WELTEN.length * 9}</span></div>
            <div class="wt-leiste"><span class="wt-pill wt-schatz" title="Schätze">${WELTEN.map(w => s.schaetze.includes(w.id) ? w.schatz[0] : "▫️").join(" ")}</span></div>
            <div class="wt-leiste">${AR.quellenFuer("runner").map(x => `<button class="wt-chip${x === q ? " an" : ""}" data-q="${x}">${esc(AR.QUELLEN[x]())}</button>`).join("")}</div></div>
        <div class="wt-pfad">${WELTEN.map((w, i) => { const frei = weltFrei(i), fertig = s.schaetze.includes(w.id), sterne = [0, 1, 2].reduce((a, x) => a + (s.sterne[`${i}-${x}`] || 0), 0);
            return `<button class="wt-insel${frei ? "" : " zu"}${i === jetzt ? " jetzt" : ""}" data-w="${i}"><div class="wt-kreis" style="background:${w.hg}">${w.emoji}${frei ? "" : `<span class="schloss">🔒</span>`}${i === jetzt ? `<span class="held">${held()}</span>` : ""}${fertig ? `<span class="schloss">${w.schatz[0]}</span>` : ""}</div>
                <div class="wt-info"><b>${i + 1}. ${esc(w.name)}</b><span>${frei ? `${"⭐".repeat(Math.min(9, sterne))}${sterne ? ` ${sterne}/9` : "Neues Abenteuer!"}` : "Noch verschlossen"}</span></div></button>`; }).join("")}</div></div>`;
    box.querySelector("#wt-zu").onclick = () => { box.classList.remove("an"); box.innerHTML = ""; document.body.style.overflow = ""; if (window.arKarten) arKarten(); };
    box.querySelectorAll("[data-q]").forEach(b => b.onclick = () => { const s2 = stand(); s2.quelle = b.dataset.q; standSpeichern(s2); weltenKarte(); });
    box.querySelectorAll("[data-w]").forEach(b => b.onclick = () => { const i = +b.dataset.w; if (!weltFrei(i)){ b.animate([{ transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "none" }], { duration: 300 }); sfx("au"); return; } sfx("muenze"); weltZeigen(i); });
    const j = box.querySelector(".wt-insel.jetzt"); if (j) setTimeout(() => j.scrollIntoView({ block: "center", behavior: "smooth" }), 50);
}

/* ---------- Welt: Geschichte & Abenteuer ---------- */
function weltZeigen(wi){
    stopp();
    const w = WELTEN[wi], s = stand();
    const text = sek() ? w.sek : w.geschichte;
    const stufen = [...w.abenteuer.map(a => ({ ic: a[3], titel: a[1], text: a[2] })), { ic: w.waechter[0], titel: `Wächter: ${w.waechter[1]}`, text: `Besiege den Wächter und hol dir: ${w.schatz[1]} ${w.schatz[0]}`, boss: true }];
    box.innerHTML = `<button class="wt-zu" id="wt-zu">←</button><div class="wt-welt${hell(w) ? " hell" : ""}" style="background:${w.hg}">
        <div style="font-size:64px">${w.emoji}</div><h2>${esc(w.name)}</h2>
        <div class="wt-sprecher"><div class="fig">${w.begleiter[0]}</div><div class="wt-blase"><button id="wt-sag">🔊</button><b>${esc(w.begleiter[1])}</b>${esc(text)}</div></div>
        <div class="wt-stufen">${stufen.map((x, si) => { const frei = stufeFrei(wi, si), sterne = s.sterne[`${wi}-${si}`] || 0;
            return `<button class="wt-stufe${x.boss ? " boss" : ""}${frei ? "" : " zu"}" data-s="${si}"><div class="ic">${frei ? x.ic : "🔒"}</div><div><b>${esc(x.titel)}</b><span>${esc(x.text)}</span></div><div class="st">${"⭐".repeat(sterne)}${"☆".repeat(3 - sterne)}</div></button>`; }).join("")}</div></div>`;
    box.querySelector("#wt-zu").onclick = weltenKarte;
    box.querySelector("#wt-sag").onclick = () => sprechen(text);
    box.querySelectorAll("[data-s]").forEach(b => b.onclick = () => { const si = +b.dataset.s; if (!stufeFrei(wi, si)){ sfx("au"); return; }
        try { const e = document.documentElement; if (!document.fullscreenElement && e.requestFullscreen && matchMedia("(pointer:coarse)").matches) e.requestFullscreen().catch(() => {}); } catch (x){}
        const art = si === 2 ? "boss" : w.abenteuer[si][0];
        ({ springen, suchen, bauen, boss })[art](wi, si); });
}
function spielRahmen(wi, extra = ""){
    const w = WELTEN[wi];
    box.innerHTML = `<button class="wt-zu" id="wt-zu">←</button><div class="wt-spiel" id="wt-spiel" style="background:${w.hg}">
        <div class="wt-hud"><span class="wt-pill" id="wt-herzen">❤️❤️❤️</span><div class="wt-fort"><i id="wt-fort" style="width:0%"></i></div><span class="wt-pill" id="wt-muenzen">🪙 0</span></div>${extra}</div>`;
    box.querySelector("#wt-zu").onclick = () => weltZeigen(wi);
    return box.querySelector("#wt-spiel");
}
function zaehler(wi, si, ziel){
    const z = { leben: 3, gut: 0, muenzen: 0, fehler: [], ziel };
    z.herz = () => { box.querySelector("#wt-herzen").textContent = "❤️".repeat(Math.max(0, z.leben)) + "🖤".repeat(Math.max(0, 3 - z.leben)); };
    z.fort = () => { box.querySelector("#wt-fort").style.width = Math.min(100, z.gut / ziel * 100) + "%"; };
    z.muenze = n => { z.muenzen += n; box.querySelector("#wt-muenzen").textContent = "🪙 " + z.muenzen; };
    z.richtig = () => { z.gut++; z.fort(); z.muenze(1); sfx("gut"); return z.gut >= ziel; };
    z.falsch = t => { z.leben--; z.herz(); if (t) z.fehler.push(t); sfx("au"); return z.leben <= 0; };
    z.ende = gewonnen => abschluss(wi, si, gewonnen, z);
    return z;
}
function loesungZeigen(t, ms = 1600){ const l = document.createElement("div"); l.className = "wt-loesung"; l.textContent = t; box.appendChild(l); setTimeout(() => l.remove(), ms); }

/* ---------- Abenteuer 1: Springen ---------- */
function springen(wi, si){
    const L = neuerLauf(), w = WELTEN[wi], a = w.abenteuer[si];
    const feld = spielRahmen(wi, `<div class="wt-wasser" style="background:${a[4]}"></div><div class="wt-ufer" style="background:${w.boden}"></div><div class="wt-ziel">🏁</div><div class="wt-frage" id="wt-frage"></div><div class="wt-steine" id="wt-steine"></div><div class="wt-held" id="wt-held">${held()}</div>`);
    const liste = fragen(12); if (liste.length < 4) return zuWenig(wi);
    const z = zaehler(wi, si, 8); let i = 0, sperre = false;
    const h = box.querySelector("#wt-held"); h.style.left = "50%"; h.style.top = "92%";
    const runde = () => {
        const f = liste[i++ % liste.length];
        frageZeigen(box.querySelector("#wt-frage"), f);
        const opts = f.opts.slice(0, 3);
        box.querySelector("#wt-steine").innerHTML = opts.map(o => `<button class="wt-stein"><span class="deko">${a[3]}</span><span>${esc(o)}</span></button>`).join("");
        [...box.querySelectorAll(".wt-stein")].forEach((b, k) => b.onclick = () => {
            if (sperre) return; sperre = true;
            const r = b.getBoundingClientRect(), fr = feld.getBoundingClientRect();
            h.style.left = (r.left - fr.left + r.width / 2) + "px"; h.style.top = (r.top - fr.top + r.height * .55) + "px";
            if (opts[k] === f.richtig){
                b.classList.add("ok"); sfx("muenze");
                const fertig = z.richtig();
                spaeter(() => { if (fertig){ h.style.left = "50%"; h.style.top = "30%"; spaeter(() => z.ende(true), 600); return; } h.style.left = "50%"; h.style.top = "92%"; sperre = false; meldungZwischen(z.gut); runde(); }, 650);
            } else {
                b.classList.add("nein"); [...box.querySelectorAll(".wt-stein")][opts.indexOf(f.richtig)]?.classList.add("ok");
                const aus = z.falsch(f.loesung); loesungZeigen(f.loesung); if (f.sag) sprechen(f.sag);
                spaeter(() => { h.style.left = "50%"; h.style.top = "92%"; if (aus) return z.ende(false); liste.splice(i + 2, 0, f); sperre = false; runde(); }, 1700);
            }
        });
    };
    z.herz(); runde();
}
function meldungZwischen(n){ if (n === 4) meldung(sek() ? "Halbzeit." : "Halbzeit! 💪"); if (n === 6) meldung("Fast da!"); }

/* ---------- Abenteuer 2: Suchen ---------- */
function suchen(wi, si){
    const L = neuerLauf(), w = WELTEN[wi], a = w.abenteuer[si];
    spielRahmen(wi, `<div class="wt-frage regel" id="wt-frage"></div><div class="wt-gitter" id="wt-gitter"></div>`);
    const z = zaehler(wi, si, 12);
    const runde = () => {
        const r = AR.regelMachen(quelle());
        if (r.gut.length < 3 || r.schlecht.length < 3) return zuWenig(wi);
        const anzahl = matchMedia("(min-width:700px)").matches ? 12 : 9, gutN = 4;
        const dinge = mischen([...mischen(r.gut).slice(0, gutN).map(x => ({ ...x, gut: true })), ...mischen(r.schlecht).slice(0, anzahl - gutN).map(x => ({ ...x, gut: false }))]);
        const fr = box.querySelector("#wt-frage");
        fr.innerHTML = `<button class="sag">🔊</button><div>${sek() ? "Finde" : "Finde alle"}: ${esc(r.text)}${r.beispiel ? `<div style="font-weight:700;color:#68745f;font-size:.75em">z. B. ${esc(r.beispiel)}</div>` : ""}</div>`;
        fr.querySelector(".sag").onclick = () => sprechen("Finde " + (r.sag || r.text));
        let gefunden = 0;
        box.querySelector("#wt-gitter").innerHTML = dinge.map((d, k) => `<button class="wt-ding" data-k="${k}">${d.svg && quelle() !== "rs" ? d.svg : `<span class="deko">${a[3]}</span>`}<span>${esc(d.text)}</span></button>`).join("");
        box.querySelectorAll(".wt-ding").forEach(b => b.onclick = () => {
            if (b.classList.contains("ok")) return;
            const d = dinge[+b.dataset.k];
            if (d.gut){
                b.classList.add("ok"); gefunden++;
                if (z.richtig()){ return spaeter(() => z.ende(true), 700); }
                if (gefunden === gutN){ meldung(sek() ? "Alle gefunden." : "Alle gefunden! 🎉"); sfx("level"); spaeter(runde, 1300); }
            } else {
                b.classList.remove("nein"); void b.offsetWidth; b.classList.add("nein");
                if (z.falsch(d.text)) spaeter(() => z.ende(false), 700);
            }
        });
    };
    z.herz(); runde();
}

/* ---------- Abenteuer 3: Bauen ---------- */
function bauen(wi, si){
    const L = neuerLauf(), w = WELTEN[wi], a = w.abenteuer[si];
    const woerter = bauWoerter(8); if (woerter.length < 3) return zuWenig(wi);
    const ziel = Math.min(5, woerter.length);
    const feld = spielRahmen(wi, `<div class="wt-gefahr" id="wt-gefahr" style="background:${a[4]};height:8%;opacity:.85"></div><div class="wt-bruecke" id="wt-bruecke">${"<i></i>".repeat(ziel)}</div><div class="wt-bau" id="wt-bau"></div>`);
    const z = zaehler(wi, si, ziel); let i = 0, gefahr = 8;
    const gefahrSetzen = v => { gefahr = Math.max(8, Math.min(60, v)); box.querySelector("#wt-gefahr").style.height = gefahr + "%"; };
    L.uhr = setInterval(() => { if (L.aus || L.pause) return; gefahrSetzen(gefahr + (sek() ? 1.4 : 1)); if (gefahr >= 60){ L.pause = true; const aus = z.falsch(woerter[(i - 1) % woerter.length]);
        meldung(sek() ? "Zu langsam – weiter!" : "Oh nein! 🌊"); spaeter(() => { gefahrSetzen(20); L.pause = false; if (aus) z.ende(false); }, 1200); } }, 1000);
    const runde = () => {
        const wort = woerter[i++ % woerter.length], teile = grapheme(wort);
        L.pause = true;
        const bau = box.querySelector("#wt-bau");
        bau.innerHTML = `<div class="wt-merk">${esc(wort)}</div><button class="wt-knopf" id="wt-ok">Gemerkt – los!</button>`;
        if (!sek()) sprechen(wort);
        bau.querySelector("#wt-ok").onclick = () => {
            L.pause = false;
            let pos = 0;
            const kacheln = mischen(teile.map(t => t));
            bau.innerHTML = `<div class="wt-plaetze" id="wt-pl">${teile.map(() => `<div class="wt-platz"></div>`).join("")}</div><div class="wt-kacheln" id="wt-ka"></div>`;
            kacheln.forEach(t => { const b = document.createElement("button"); b.className = "wt-kachel"; b.textContent = t;
                b.onclick = () => {
                    if (teile[pos] === t){ const p = bau.querySelector("#wt-pl").children[pos]; p.textContent = t; b.classList.add("weg"); pos++; sfx("muenze");
                        if (pos === teile.length){
                            box.querySelectorAll("#wt-bruecke i")[z.gut]?.classList.add("fest"); const sb = box.querySelectorAll("#wt-bruecke i")[z.gut]; if (sb) sb.style.background = a[4];
                            gefahrSetzen(gefahr - 18);
                            if (z.richtig()){ clearInterval(L.uhr); return spaeter(() => z.ende(true), 800); }
                            meldung(["Stark!", "Weiter so!", "Super gebaut!", "Klasse!"][z.gut % 4]); spaeter(runde, 900);
                        } }
                    else { b.classList.remove("nein"); void b.offsetWidth; b.classList.add("nein"); sfx("au"); gefahrSetzen(gefahr + 4); }
                };
                bau.querySelector("#wt-ka").appendChild(b); });
        };
    };
    z.herz(); runde();
}

/* ---------- Wächter-Kampf ---------- */
function boss(wi, si){
    const L = neuerLauf(), w = WELTEN[wi];
    const hp = 8;
    spielRahmen(wi, `<div class="wt-frage" id="wt-frage"></div><div class="wt-arena"><div class="wt-bossname">${esc(w.waechter[1])}</div><div class="wt-hp"><i id="wt-hp" style="width:100%"></i></div>
        <div class="wt-boss" id="wt-boss">${w.waechter[0]}</div><div class="wt-kaempfer" id="wt-kaempfer">${held()}</div></div><div class="wt-antworten" id="wt-antw"></div>`);
    const liste = fragen(16); if (liste.length < 4) return zuWenig(wi);
    const z = zaehler(wi, si, hp); let i = 0, sperre = false;
    meldung(sek() ? "Duell!" : "Auf in den Kampf! ⚔️");
    const geschoss = (von, nach, zeichen) => { const f = box.getBoundingClientRect(), a = von.getBoundingClientRect(), b = nach.getBoundingClientRect();
        const g = document.createElement("div"); g.className = "wt-geschoss"; g.textContent = zeichen; box.appendChild(g);
        g.animate([{ left: a.left - f.left + a.width / 2 + "px", top: a.top - f.top + a.height / 3 + "px", transform: "scale(.6)" }, { left: b.left - f.left + b.width / 2 + "px", top: b.top - f.top + b.height / 3 + "px", transform: "scale(1.3)" }], { duration: 450, easing: "ease-in", fill: "forwards" });
        setTimeout(() => g.remove(), 470); };
    const runde = () => {
        const f = liste[i++ % liste.length];
        frageZeigen(box.querySelector("#wt-frage"), f);
        const an = box.querySelector("#wt-antw");
        an.innerHTML = f.opts.slice(0, 3).map(o => `<button class="wt-antwort">${esc(o)}</button>`).join("");
        [...an.children].forEach(b => b.onclick = () => {
            if (sperre) return; sperre = true;
            const bo = box.querySelector("#wt-boss"), ka = box.querySelector("#wt-kaempfer");
            if (b.textContent === f.richtig){
                b.classList.add("ok"); geschoss(ka, bo, ["⚡", "⭐", "💥", "✨"][i % 4]); sfx("pew");
                spaeter(() => { bo.classList.remove("au"); void bo.offsetWidth; bo.classList.add("au"); sfx("boom"); }, 430);
                const fertig = z.richtig(); box.querySelector("#wt-hp").style.width = ((hp - z.gut) / hp * 100) + "%";
                spaeter(() => { if (fertig){ bo.animate([{ transform: "scale(1) rotate(0)", opacity: 1 }, { transform: "scale(.2) rotate(540deg)", opacity: 0 }], { duration: 900, fill: "forwards" }); return spaeter(() => z.ende(true), 1000); } sperre = false; runde(); }, 900);
            } else {
                b.classList.add("nein"); [...an.children].find(x => x.textContent === f.richtig)?.classList.add("ok");
                geschoss(bo, ka, w.id === "eis" ? "❄️" : w.id === "meer" ? "💧" : "🔥");
                spaeter(() => { ka.classList.remove("au"); void ka.offsetWidth; ka.classList.add("au"); }, 430);
                const aus = z.falsch(f.loesung); loesungZeigen(f.loesung); if (f.sag) sprechen(f.sag);
                spaeter(() => { if (aus) return z.ende(false); liste.splice(i + 2, 0, f); sperre = false; runde(); }, 1800);
            }
        });
    };
    z.herz(); runde();
}

/* ---------- Abschluss einer Stufe ---------- */
function abschluss(wi, si, gewonnen, z){
    const L = LAUF; stopp();
    const w = WELTEN[wi], s = stand(), key = `${wi}-${si}`;
    const sterne = gewonnen ? (z.leben >= 3 ? 3 : z.leben === 2 ? 2 : 1) : 0;
    let neuerSchatz = false;
    if (gewonnen){
        s.sterne[key] = Math.max(s.sterne[key] || 0, sterne);
        if (si === 2 && !s.schaetze.includes(w.id)){ s.schaetze.push(w.id); neuerSchatz = true; z.muenzen += 20; }
        z.muenzen += sterne * 2;
    }
    standSpeichern(s);
    const k = AR.konto(); k.muenzen += z.muenzen; AR.kontoSpeichern(k);
    const e = document.createElement("div"); e.className = "wt-ende";
    const weiter = gewonnen ? (si < 2 ? { t: "Nächstes Abenteuer", f: () => ({ springen, suchen, bauen, boss })[si + 1 === 2 ? "boss" : w.abenteuer[si + 1][0]](wi, si + 1) }
        : wi + 1 < WELTEN.length ? { t: `Weiter: ${WELTEN[wi + 1].name} ${WELTEN[wi + 1].emoji}`, f: () => weltZeigen(wi + 1) } : { t: "Zur Weltkarte", f: weltenKarte }) : { t: "Nochmal versuchen", f: () => ({ springen, suchen, bauen, boss })[si === 2 ? "boss" : w.abenteuer[si][0]](wi, si) };
    const fertigAlles = neuerSchatz && wi === WELTEN.length - 1;
    e.innerHTML = gewonnen
        ? `<div class="gross">${neuerSchatz ? w.schatz[0] : "⭐"}</div><h2>${fertigAlles ? "Weltenreise geschafft!" : neuerSchatz ? `${esc(w.schatz[1])}!` : "Geschafft!"}</h2>
           <div style="font-size:42px">${"⭐".repeat(sterne)}${"☆".repeat(3 - sterne)}</div>
           ${neuerSchatz ? `<div style="font-weight:800;font-size:19px;max-width:520px">${esc(w.begleiter[1])}: ${sek() ? "Stark gemacht. Die nächste Welt ist offen." : "Danke, du bist ein echter Held! Die nächste Welt ist jetzt offen."}</div>` : ""}
           <div class="wt-leiste"><span class="wt-pill">🪙 +${z.muenzen}</span></div>`
        : `<div class="gross">${w.begleiter[0]}</div><h2>${sek() ? "Knapp." : "Fast geschafft!"}</h2><div style="font-weight:800;font-size:19px">${esc(w.begleiter[1])}: „${sek() ? "Nächster Versuch." : "Nicht aufgeben – gleich nochmal!"}“</div><div class="wt-leiste"><span class="wt-pill">🪙 +${z.muenzen}</span></div>`;
    if (z.fehler.length) e.insertAdjacentHTML("beforeend", `<div style="font-weight:800;opacity:.85">Die merken wir uns:</div><div style="font-family:var(--wort);font-size:24px;max-width:640px">${[...new Set(z.fehler)].slice(0, 8).map(esc).join(" · ")}</div>`);
    e.insertAdjacentHTML("beforeend", `<div class="wt-leiste" style="margin-top:10px"><button class="wt-knopf" id="wt-weiter">${esc(weiter.t)}</button><button class="wt-chip" id="wt-karte" style="font-size:16px">🗺️ Weltkarte</button></div>`);
    box.appendChild(e);
    if (gewonnen){ konfetti(); sfx("level"); }
    e.querySelector("#wt-weiter").onclick = weiter.f;
    e.querySelector("#wt-karte").onclick = weltenKarte;
}
function zuWenig(wi){ stopp(); alert("Dafür gibt es gerade zu wenig passende Wörter. Wähle auf der Weltkarte etwas anderes zum Üben."); weltenKarte(); }

/* ---------- Karte auf der Auswahlseite ---------- */
function weltenKachel(){
    const ziel = document.getElementById("arcade-spiele"); if (!ziel || !window.AR) return;
    const s = stand(), n = s.schaetze.length;
    let k = document.getElementById("wt-kachel");
    if (!k){ ziel.insertAdjacentHTML("beforebegin", `<button class="spiel" id="wt-kachel" style="width:100%;margin-bottom:14px;background:linear-gradient(120deg, rgba(255,224,138,.22), rgba(255,255,255,.06));border:2px solid rgba(255,224,138,.5)"></button>`); k = document.getElementById("wt-kachel"); }
    k.innerHTML = `<div class="ico" style="font-size:34px">🗺️</div><div><b style="font-size:22px">Weltenreise</b><span>Von Welt zu Welt: Zauberwald, Eisreich, Wüste, Meerestiefe, Dinotal, Vulkan, Weltraum und Wolkenschloss. In jeder Welt warten Abenteuer und ein Wächter.<br><em>${n ? `${n} von ${WELTEN.length} Schätzen: ${WELTEN.filter(w => s.schaetze.includes(w.id)).map(w => w.schatz[0]).join(" ")}` : "Die Reise beginnt im Zauberwald 🌳"}</em></span></div>`;
    k.onclick = () => { box.classList.add("an"); document.body.style.overflow = "hidden"; weltenKarte(); };
}
const alt = window.arKarten;
window.arKarten = function(){ alt && alt(); weltenKachel(); };
weltenKachel();
})();
