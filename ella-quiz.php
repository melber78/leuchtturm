<?php $LT_GAST_BEREICH = ["quiz", "lernangebot"]; require __DIR__ . "/gast-zugang.php"; ?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- App (Home-Bildschirm) -->
<link rel="manifest" href="manifest.php">
<meta name="theme-color" content="#2f4a1f">
<link rel="apple-touch-icon" href="app-icon-192.png">
<link rel="icon" type="image/png" href="app-icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Leuchtturm">
<script>if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(function(){});</script>

<title>Ella-Quiz · Leuchtturm</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&family=Andika:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<!--
  Leuchtturm – Ella-Quiz: Üben nach Klasse, Fach und Thema (Klasse 1–4)
  Allein am Gerät oder an der Tafel (Klasse gegen Eule Ella). Fragen kommen aus quiz-fragen.js,
  Mathe und viele Deutsch-Themen werden jedes Mal neu erzeugt. Fortschritt (Sterne je Thema)
  wird nur im Browser dieses Geräts gemerkt – keine Namen, nichts wird gesendet.
-->
<style>
:root{ --nacht:#2f4a1f; --meer:#557428; --gold:#d9a23f; --gruen:#2e9e5b; --rot:#d64541; --text:#1f2d36; --grau:#7c8a85; --fach:#557428; }
*{ box-sizing:border-box; }
html, body{ min-height:100%; }
body{ margin:0; background:linear-gradient(160deg,#fbf7ee,#eaf3f9); color:var(--text); font-family:"Nunito",sans-serif; }
button{ font-family:inherit; }
.kopf{ display:flex; align-items:center; gap:10px; padding:12px 18px; flex-wrap:wrap; }
.kopf a, .k{ font:800 15px "Nunito",sans-serif; border:0; border-radius:999px; padding:10px 16px; background:white; color:var(--nacht); cursor:pointer; display:inline-flex; gap:8px; align-items:center; text-decoration:none; box-shadow:0 3px 10px rgba(47,74,31,.08); }
.k.rund{ width:44px; height:44px; padding:0; justify-content:center; }
.k.gold{ background:var(--gold); color:var(--nacht); }
.k.dunkel{ background:var(--nacht); color:white; }
.kopf h1{ margin:0; font-size:22px; font-weight:900; color:var(--nacht); display:flex; align-items:center; gap:8px; }
.luft{ flex:1; }
main{ max-width:1180px; margin:0 auto; padding:0 18px 40px; }
/* Auswahl */
.zeile{ display:flex; gap:8px; flex-wrap:wrap; align-items:center; margin:14px 0 8px; }
.zeile > b{ font:900 13px "Nunito",sans-serif; text-transform:uppercase; letter-spacing:.05em; color:#8a7a60; margin-right:6px; min-width:80px; }
.chip{ border:3px solid transparent; background:white; border-radius:999px; padding:10px 18px; font:900 17px "Nunito",sans-serif; color:var(--nacht); cursor:pointer; box-shadow:0 3px 10px rgba(47,74,31,.07); }
.chip.an{ background:var(--nacht); color:white; }
.chip.fach.an{ background:var(--fc); border-color:var(--fc); }
.themen{ display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:12px; margin-top:16px; }
.thema{ border:0; background:white; border-radius:22px; padding:18px 14px 14px; text-align:left; cursor:pointer; box-shadow:0 8px 22px rgba(47,74,31,.08); display:flex; flex-direction:column; gap:6px; border-top:6px solid var(--fach); transition:transform .15s; }
.thema:hover{ transform:translateY(-3px); }
.thema .em{ font-size:38px; line-height:1; }
.thema b{ font:900 18px "Nunito",sans-serif; color:var(--nacht); }
.thema small{ color:var(--grau); font-weight:800; }
.thema.misch{ background:linear-gradient(135deg,#fff,#fff6e3); }
.sterne{ color:#e0a500; letter-spacing:2px; font-size:16px; min-height:20px; }
.sterne .leer{ color:#dde3e7; }
.hinweis{ background:#f3f7ec; border-radius:16px; padding:12px 16px; font-weight:700; color:#3a5566; margin-top:18px; }
/* Quiz */
#quiz{ display:none; min-height:100vh; flex-direction:column; }
body.spielt #quiz{ display:flex; }
body.spielt #wahl{ display:none; }
.q-leiste{ display:flex; align-items:center; gap:10px; padding:12px 18px; }
.q-fort{ flex:1; height:14px; background:rgba(47,74,31,.08); border-radius:999px; overflow:hidden; }
.q-fort i{ display:block; height:100%; width:0; background:var(--fach); border-radius:999px; transition:width .4s; }
.q-nr{ font:900 16px "Nunito",sans-serif; color:var(--nacht); min-width:62px; text-align:center; }
.q-stand{ display:flex; gap:8px; }
.q-stand span{ white-space:nowrap; background:white; border-radius:999px; padding:8px 14px; font:900 17px "Nunito",sans-serif; box-shadow:0 3px 10px rgba(47,74,31,.08); }
.q-stand .kl{ color:var(--gruen); } .q-stand .el{ color:#8e44ad; }
.q-buehne{ flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2.2vh; padding:1vh 4vw 3vh; }
.q-frage{ font:900 clamp(24px,min(4.2vw,6.4vh),62px)/1.2 "Andika","Nunito",sans-serif; color:var(--nacht); text-align:center; max-width:1100px; }
.q-frage b{ color:var(--fach); }
.q-bild{ display:flex; justify-content:center; align-items:center; }
.q-bild svg{ width:clamp(120px,22vh,220px); height:auto; max-height:24vh; }
.q-bild .q-uhr{ width:clamp(170px,30vh,300px); max-height:32vh; }
.q-bild .gross{ font-size:clamp(70px,14vh,140px); line-height:1; }
.q-menge{ display:flex; flex-wrap:wrap; gap:.3em; justify-content:center; max-width:min(720px,90vw); font-size:clamp(34px,6vh,60px); }
.q-ant{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; width:min(1000px,100%); }
.q-ant.drei{ grid-template-columns:repeat(3,minmax(0,1fr)); }
.q-ant.bilder{ grid-template-columns:repeat(3,minmax(0,1fr)); }
.q-ant button{ border:4px solid #e7ecef; background:white; border-radius:24px; padding:18px 14px; min-height:84px; font:900 clamp(20px,min(3vw,4.6vh),40px) "Andika","Nunito",sans-serif; color:var(--nacht); cursor:pointer; box-shadow:0 6px 16px rgba(47,74,31,.07); display:flex; align-items:center; justify-content:center; gap:10px; position:relative; transition:transform .1s; }
.q-ant button:hover:not(:disabled){ transform:translateY(-2px); border-color:var(--fach); }
.q-ant button .nr{ position:absolute; left:12px; top:8px; font:900 15px "Nunito",sans-serif; color:#b8c3ca; }
.q-ant button svg{ width:clamp(80px,15vh,150px); height:auto; }
.q-ant button.richtig{ border-color:var(--gruen); background:#e9f7ee; }
.q-ant button.falsch{ border-color:var(--rot); background:#fdecea; }
.q-ant button.blass{ opacity:.45; }
.q-rueck{ min-height:64px; display:flex; flex-direction:column; align-items:center; gap:4px; text-align:center; }
.q-rueck .ja{ font:900 clamp(24px,3.4vw,40px) "Nunito",sans-serif; color:var(--gruen); animation:hupf .5s; }
.q-rueck .nein{ font:900 clamp(20px,2.8vw,34px) "Nunito",sans-serif; color:var(--rot); animation:hupf .5s; }
.q-rueck small{ font:700 clamp(15px,1.8vw,22px) "Nunito",sans-serif; color:#3a5566; max-width:900px; }
@keyframes hupf{ 0%{ transform:scale(.6); opacity:0; } 70%{ transform:scale(1.08); } 100%{ transform:scale(1); opacity:1; } }
.q-unten{ display:flex; gap:10px; justify-content:center; padding:0 0 3vh; }
/* Ergebnis */
.erg{ display:flex; flex-direction:column; align-items:center; gap:14px; text-align:center; padding:4vh 4vw; }
.erg .eule{ font-size:clamp(70px,14vh,130px); line-height:1; animation:hupf .6s; }
.erg h2{ margin:0; font:900 clamp(30px,5vw,60px) "Nunito",sans-serif; color:var(--nacht); }
.erg .gross-sterne{ font-size:clamp(44px,8vh,80px); letter-spacing:6px; color:#e0a500; }
.erg .gross-sterne .leer{ color:#dde3e7; }
.erg p{ font:800 clamp(18px,2.4vw,28px) "Nunito",sans-serif; color:#3a5566; margin:0; }
.erg .fehlerliste{ background:white; border-radius:18px; padding:12px 18px; text-align:left; max-width:760px; width:100%; box-shadow:0 6px 16px rgba(47,74,31,.07); }
.erg .fehlerliste div{ padding:6px 0; border-bottom:1px solid #eef1f4; font-weight:700; }
.erg .fehlerliste div:last-child{ border:0; }
.erg .fehlerliste .mini{ display:inline-flex; vertical-align:middle; margin-right:6px; }
.erg .fehlerliste .mini svg{ width:44px; height:44px; }
.erg .fehlerliste .mini .q-menge{ font-size:14px; max-width:160px; }
.erg .fehlerliste .mini .gross{ font-size:30px; }
.erg .fehlerliste em{ font-style:normal; color:var(--gruen); font-weight:900; }
@media (max-width:700px){
  .q-ant, .q-ant.drei{ grid-template-columns:1fr; }
  .q-ant.bilder{ grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px; }
  .q-ant button{ min-height:64px; padding:12px; border-radius:18px; }
  .q-ant.bilder button{ padding:8px 4px; }
  .q-ant.bilder button svg{ width:80px; }
  .themen{ grid-template-columns:1fr 1fr; gap:10px; }
  .thema{ padding:14px 10px 10px; }
  .thema b{ font-size:16px; }
  .zeile > b{ min-width:0; width:100%; }
  .q-stand span{ padding:6px 10px; font-size:15px; }
  .q-leiste{ flex-wrap:wrap; }
  .q-fort{ order:9; flex:1 1 100%; }
  .q-nr{ margin-right:auto; }
}
</style>
<link rel="stylesheet" href="marke/mewe.css">
</head>
<body>
<div id="wahl">
  <div class="kopf">
    <a href="<?= $LT_GAST ? "gast.php" : "index.php" ?>"><i class="fa-solid fa-arrow-left"></i> Leuchtturm</a>
    <h1>🦉 Ella-Quiz</h1>
    <span class="luft"></span>
    <button class="k rund" onclick="vollbild()" title="Vollbild"><i class="fa-solid fa-expand"></i></button>
  </div>
  <main>
    <div class="zeile" id="zKlasse"><b>Klasse</b></div>
    <div class="zeile" id="zFach"><b>Fach</b></div>
    <div class="zeile" id="zEinst"></div>
    <div class="themen" id="themen"></div>
    <div class="hinweis">💡 <b>Allein üben</b>: Jedes Kind übt am iPad oder Laptop, die Sterne merkt sich das Gerät. <b>An der Tafel</b>: Ein Kind tippt die Antwort an – richtig = Punkt für die Klasse, daneben = Punkt für Ella. Mathe und viele Deutsch-Themen werden jedes Mal neu gemischt.</div>
  </main>
</div>

<div id="quiz">
  <div class="q-leiste">
    <button class="k rund" onclick="abbrechen()" title="Quiz beenden"><i class="fa-solid fa-xmark"></i></button>
    <div class="q-fort"><i id="qFort"></i></div>
    <span class="q-nr" id="qNr"></span>
    <div class="q-stand" id="qStand"></div>
    <button class="k rund" onclick="vorlesen()" title="Vorlesen">🔊</button>
    <button class="k rund" onclick="vollbild()" title="Vollbild"><i class="fa-solid fa-expand"></i></button>
  </div>
  <div class="q-buehne" id="qBuehne"></div>
</div>

<script src="bilder.js?v=<?= @filemtime(__DIR__ . "/bilder.js") ?: 1 ?>"></script>
<script src="lernangebot-woerter.js?v=<?= @filemtime(__DIR__ . "/lernangebot-woerter.js") ?: 1 ?>"></script>
<script src="quiz-fragen.js?v=<?= @filemtime(__DIR__ . "/quiz-fragen.js") ?: 1 ?>"></script>
<script>
"use strict";
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
const mischen = l => { const a = l.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
let E = { klasse: "1", fach: "Deutsch", anzahl: 10, modus: "allein", auto: true };
try { Object.assign(E, JSON.parse(localStorage.getItem("ella_quiz_einst") || "{}")); } catch (x) {}
let STERNE = {}; try { STERNE = JSON.parse(localStorage.getItem("ella_quiz_sterne") || "{}"); } catch (x) {}
const merken = () => { try { localStorage.setItem("ella_quiz_einst", JSON.stringify(E)); localStorage.setItem("ella_quiz_sterne", JSON.stringify(STERNE)); } catch (x) {} };
const fachFarbe = f => (window.QUIZ_FACH[f] || ["", "#557428"])[1];
const sterneHtml = n => [1, 2, 3].map(i => `<span class="${i <= n ? "" : "leer"}">★</span>`).join("");

/* ---------- Auswahl ---------- */
function wahlZeichnen(){
    if (!QUIZ[E.klasse]) E.klasse = "1";
    if (!QUIZ[E.klasse][E.fach]) E.fach = "Deutsch";
    document.documentElement.style.setProperty("--fach", fachFarbe(E.fach));
    document.getElementById("zKlasse").innerHTML = "<b>Klasse</b>" + ["1", "2", "3", "4"].map(k => `<button class="chip ${k === E.klasse ? "an" : ""}" onclick="E.klasse='${k}';merken();wahlZeichnen()">Klasse ${k}</button>`).join("");
    document.getElementById("zFach").innerHTML = "<b>Fach</b>" + Object.keys(QUIZ[E.klasse]).map(f => `<button class="chip fach ${f === E.fach ? "an" : ""}" style="--fc:${fachFarbe(f)}" onclick="E.fach='${f}';merken();wahlZeichnen()">${QUIZ_FACH[f][0]} ${esc(f)}</button>`).join("");
    document.getElementById("zEinst").innerHTML = `<b>So spielen</b>
        <button class="chip ${E.modus === "allein" ? "an" : ""}" onclick="E.modus='allein';merken();wahlZeichnen()">👤 Allein üben</button>
        <button class="chip ${E.modus === "tafel" ? "an" : ""}" onclick="E.modus='tafel';merken();wahlZeichnen()">🏫 Tafel: Klasse gegen Ella</button>
        <span style="width:12px"></span>
        ${[10, 15, 20].map(n => `<button class="chip ${E.anzahl === n ? "an" : ""}" onclick="E.anzahl=${n};merken();wahlZeichnen()">${n} Fragen</button>`).join("")}
        <button class="chip ${E.auto ? "an" : ""}" onclick="E.auto=!E.auto;merken();wahlZeichnen()" title="Nach der Antwort automatisch weiter">${E.auto ? "⏩ automatisch weiter" : "⏸ weiter mit Knopf"}</button>`;
    const th = QUIZ[E.klasse][E.fach];
    document.getElementById("themen").innerHTML = th.map(t => { const s = STERNE[E.klasse + "|" + E.fach + "|" + t.id] || 0;
        return `<button class="thema" onclick="starten('${t.id}')"><span class="em">${t.emoji}</span><b>${esc(t.titel)}</b><span class="sterne">${sterneHtml(s)}</span></button>`; }).join("")
        + (th.length > 1 ? `<button class="thema misch" onclick="starten('*')"><span class="em">🎲</span><b>Alles gemischt</b><small>${esc(E.fach)} – alle Themen</small></button>` : "");
}

/* ---------- Quiz ---------- */
let Q = null;
function starten(id, nurFragen){
    const th = QUIZ[E.klasse][E.fach];
    let fragen;
    if (nurFragen) fragen = nurFragen;
    else if (id === "*") { const n = E.anzahl, je = Math.ceil(n / th.length); fragen = mischen(th.flatMap(t => t.gen(je).map(q => Object.assign({ thema: t.titel }, q)))).slice(0, n); }
    else fragen = th.find(t => t.id === id).gen(E.anzahl);
    if (!fragen.length) return;
    Q = { id, fragen, i: 0, richtig: 0, ella: 0, fehler: [], gewaehlt: false };
    document.body.classList.add("spielt");
    frageZeigen();
}
function antwortHtml(a){
    if (a.startsWith("bild:")) { const b = window.LT_BILDER && window.LT_BILDER[a.slice(5)]; return b ? b[2] : "❔"; }
    return md(a);
}
function bildHtml(b){
    if (!b) return "";
    if (b.startsWith("bild:")) { const x = window.LT_BILDER && window.LT_BILDER[b.slice(5)]; return x ? x[2] : ""; }
    if (b.startsWith("<")) return b;
    return `<span class="gross">${esc(b)}</span>`;
}
function frageZeigen(){
    const q = Q.fragen[Q.i];
    if (window.ltNeutral && !q.neutral) { const n = window.ltNeutral(q.f, q.a); q.f = n.f; q.a = n.a; q.neutral = true; }
    Q.opt = mischen(q.a.map((a, k) => ({ a, ok: k === 0 })));
    Q.gewaehlt = false;
    document.getElementById("qFort").style.width = (Q.i / Q.fragen.length * 100) + "%";
    document.getElementById("qNr").textContent = (Q.i + 1) + " / " + Q.fragen.length;
    standZeigen();
    const bilder = Q.opt.every(o => o.a.startsWith("bild:")), drei = !bilder && Q.opt.length === 3 && Q.opt.every(o => o.a.length <= 14);
    document.getElementById("qBuehne").innerHTML = `
        ${q.thema ? `<div class="sterne" style="color:var(--grau);font-weight:800;letter-spacing:0">${esc(q.thema)}</div>` : ""}
        <div class="q-frage">${md(q.f)}</div>
        ${q.bild ? `<div class="q-bild">${bildHtml(q.bild)}</div>` : ""}
        <div class="q-ant ${bilder ? "bilder" : drei ? "drei" : ""}">${Q.opt.map((o, k) => `<button data-k="${k}"><span class="nr">${k + 1}</span>${antwortHtml(o.a)}</button>`).join("")}</div>
        <div class="q-rueck" id="qRueck"></div>
        <div class="q-unten" id="qUnten"></div>`;
    document.querySelectorAll(".q-ant button").forEach(b => b.addEventListener("click", () => waehlen(+b.dataset.k)));
    if (E.klasse === "1" && q.h) setTimeout(vorlesen, 300);   // Klasse 1: Wort vorlesen
}
function standZeigen(){
    document.getElementById("qStand").innerHTML = E.modus === "tafel"
        ? `<span class="kl">🧒 Klasse ${Q.richtig}</span><span class="el">🦉 Ella ${Q.ella}</span>`
        : `<span class="kl">✓ ${Q.richtig}</span>`;
}
function waehlen(k){
    if (Q.gewaehlt) return; Q.gewaehlt = true;
    const q = Q.fragen[Q.i], o = Q.opt[k], ok = o.ok, richtigText = q.a[0];
    document.querySelectorAll(".q-ant button").forEach((b, j) => { b.disabled = true; if (Q.opt[j].ok) b.classList.add("richtig"); else if (j === k) b.classList.add("falsch"); else b.classList.add("blass"); });
    if (ok) Q.richtig++; else { Q.ella++; Q.fehler.push(q); }
    standZeigen(); ton(ok);
    const lob = ["🎉 Richtig!", "⭐ Super!", "👏 Genau!", "💪 Stark!", "✅ Richtig!"];
    document.getElementById("qRueck").innerHTML = ok
        ? `<div class="ja">${lob[Math.floor(Math.random() * lob.length)]}${E.modus === "tafel" ? " Punkt für die Klasse!" : ""}</div>${q.e ? `<small>${md(q.e)}</small>` : ""}`
        : `<div class="nein">${E.modus === "tafel" ? "🦉 Punkt für Ella!" : "Leider nicht."} Richtig ist: ${richtigText.startsWith("bild:") ? "das grüne Bild" : md(richtigText)}</div>${q.e ? `<small>${md(q.e)}</small>` : ""}`;
    const letzte = Q.i === Q.fragen.length - 1;
    document.getElementById("qUnten").innerHTML = `<button class="k dunkel" id="qWeiter">${letzte ? "🏁 Ergebnis" : "Weiter ▶"}</button>`;
    document.getElementById("qWeiter").addEventListener("click", weiter);
    clearTimeout(Q.timer);
    if (E.auto) Q.timer = setTimeout(weiter, ok ? 1800 : 3800);   // falsch: länger Zeit zum Nachlesen
}
function weiter(){
    clearTimeout(Q.timer);
    if (!Q || !Q.gewaehlt) return;
    if (Q.i < Q.fragen.length - 1) { Q.i++; frageZeigen(); } else ergebnis();
}
function ergebnis(){
    if (window.speechSynthesis) speechSynthesis.cancel();
    const n = Q.fragen.length, quote = Q.richtig / n, sterne = quote >= .9 ? 3 : quote >= .7 ? 2 : quote >= .5 ? 1 : 0;
    document.getElementById("qFort").style.width = "100%";
    if (Q.id !== "*" && !Q.wiederholung) { const key = E.klasse + "|" + E.fach + "|" + Q.id; STERNE[key] = Math.max(STERNE[key] || 0, sterne); merken(); }
    const tafel = E.modus === "tafel";
    const titel = tafel ? (Q.richtig > Q.ella ? "Die Klasse gewinnt! 🏆" : Q.richtig === Q.ella ? "Unentschieden! 🤝" : "Ella gewinnt diesmal! 🦉") : ["Weiter üben – du schaffst das!", "Gut gemacht!", "Toll gemacht!", "Super – ein echter Schlaukopf!"][sterne];
    document.getElementById("qBuehne").innerHTML = `<div class="erg">
        <div class="eule">${tafel ? (Q.richtig >= Q.ella ? "🏆" : "🦉") : ["🦉", "👍", "🌟", "🏆"][sterne]}</div>
        <h2>${titel}</h2>
        ${tafel ? "" : `<div class="gross-sterne">${sterneHtml(sterne)}</div>`}
        <p>${tafel ? `Klasse ${Q.richtig} : ${Q.ella} Ella` : `${Q.richtig} von ${n} richtig`}</p>
        ${Q.fehler.length ? `<div class="fehlerliste"><b>Das üben wir noch:</b>${Q.fehler.map(q => `<div>${q.bild ? `<span class="mini">${bildHtml(q.bild)}</span>` : ""}${md(q.f.replace(/\n/g, " "))} → <em>${q.a[0].startsWith("bild:") ? "🖼️" : md(q.a[0])}</em></div>`).join("")}</div>` : ""}
        <div class="q-unten" style="flex-wrap:wrap">
            ${Q.fehler.length ? `<button class="k gold" onclick="fehlerUeben()">🔁 Fehler nochmal üben</button>` : ""}
            <button class="k dunkel" onclick="nochmal()">🎲 Neue Fragen</button>
            <button class="k" onclick="abbrechen()">📚 Andere Themen</button>
        </div></div>`;
    document.getElementById("qUnten") && (document.getElementById("qUnten").innerHTML = "");
    if (sterne >= 2 || (tafel && Q.richtig > Q.ella)) ton(true, true);
}
function fehlerUeben(){ const f = Q.fehler.slice(); starten(Q.id, mischen(f)); Q.wiederholung = true; }
function nochmal(){ starten(Q.id); }
function abbrechen(){ if (Q) clearTimeout(Q.timer); if (window.speechSynthesis) speechSynthesis.cancel(); Q = null; document.body.classList.remove("spielt"); wahlZeichnen(); }

/* ---------- Ton & Vorlesen ---------- */
let ac = null;
function ton(ok, fanfare){
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)();
        const noten = fanfare ? [523, 659, 784, 1047] : ok ? [660, 880] : [300, 220];
        noten.forEach((f, i) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = ok ? "triangle" : "sine"; o.frequency.value = f; o.connect(g); g.connect(ac.destination);
            const t = ac.currentTime + i * .12; g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.18, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + .25); o.start(t); o.stop(t + .3); });
    } catch (x) {}
}
function vorlesen(){
    if (!Q || !window.speechSynthesis) return;
    const q = Q.fragen[Q.i], f = q.f.replace(/\*\*/g, "").replace(/_+/g, " Lücke ").replace(/·/g, " mal ").replace(/−/g, " minus ").replace(/ : /g, " geteilt durch ");
    const text = q.h ? (q.bild ? f + " " + q.h : q.h) : f;
    speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE"; u.rate = .9; const v = speechSynthesis.getVoices().find(x => /^de/i.test(x.lang)); if (v) u.voice = v; speechSynthesis.speak(u);
}
function vollbild(){ if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); else document.exitFullscreen && document.exitFullscreen(); }
document.addEventListener("keydown", ev => {
    if (!Q) return;
    if (/^[1-4]$/.test(ev.key) && !Q.gewaehlt) { const b = document.querySelector(`.q-ant button[data-k="${+ev.key - 1}"]`); if (b) b.click(); }
    else if ((ev.key === "Enter" || ev.key === " " || ev.key === "ArrowRight") && Q.gewaehlt) { ev.preventDefault(); weiter(); }
});
wahlZeichnen();
</script>
</body>
</html>
