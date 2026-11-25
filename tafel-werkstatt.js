/* ===============================================================
   Tafelbild: Werkstatt-Führerschein (Technik Kl. 5–7)
   Arbeiten mit Holz und Metall – sicher und richtig.
   Einstiegs-Quiz · Film · Unfall-Akten · Holz oder Metall? · Regeln & Führerschein
   Alles läuft über die Tafel, Punkte für Team A / Team B (keine Eule – für die Großen).
   =============================================================== */
(function(){
"use strict";

const CSS = `
#ws{ position:fixed; inset:0; display:none; flex-direction:column; z-index:12; background:#1f2328; color:#f1efe9; font-family:"Nunito",sans-serif; user-select:none; -webkit-user-select:none; }
#ws.an{ display:flex; }
#ws *{ box-sizing:border-box; }
.ws-leiste{ display:flex; gap:8px; align-items:center; padding:8px 12px; flex-wrap:wrap; background:repeating-linear-gradient(-45deg,#f2b705 0 18px,#1f2328 18px 36px); }
.ws-leiste > *{ background:#1f2328; }
.ws-titel{ font-weight:900; font-size:clamp(16px,2.2vmin,22px); padding:6px 12px; border-radius:10px; }
.ws-titel small{ color:#f2b705; font-weight:800; margin-left:6px; }
.ws-k{ font:800 15px "Nunito",sans-serif; border:2px solid #3a414a; background:#2a3038; color:#f1efe9; border-radius:999px; padding:8px 14px; cursor:pointer; min-height:42px; }
.ws-k:hover{ border-color:#f2b705; }
.ws-k.gelb{ background:#f2b705; border-color:#f2b705; color:#1f2328; }
.ws-k.gruen{ background:#2e8b57; border-color:#2e8b57; color:#fff; }
.ws-k.rot{ background:#c0392b; border-color:#c0392b; color:#fff; }
.ws-luecke{ flex:1; background:transparent !important; }
.ws-punkte{ display:flex; gap:8px; align-items:center; border-radius:14px; padding:4px; }
.ws-team{ display:flex; align-items:center; gap:4px; background:#2a3038; border-radius:12px; padding:3px 6px 3px 10px; border:2px solid transparent; }
.ws-team.dran{ border-color:#f2b705; }
.ws-team span{ font-weight:900; font-size:15px; white-space:nowrap; }
.ws-team b{ font-size:26px; min-width:1.4em; text-align:center; color:#f2b705; font-variant-numeric:tabular-nums; }
.ws-team button{ font:900 17px "Nunito",sans-serif; width:34px; height:34px; border-radius:50%; border:0; cursor:pointer; background:#3a414a; color:#fff; }
.ws-tabs{ display:flex; gap:6px; overflow-x:auto; padding:10px 12px; scrollbar-width:none; flex:none; }
.ws-tabs::-webkit-scrollbar{ display:none; }
.ws-tab{ font:800 15px "Nunito",sans-serif; border:2px solid #3a414a; background:transparent; color:#cfd3d8; border-radius:999px; padding:8px 15px; cursor:pointer; white-space:nowrap; min-height:44px; }
.ws-tab.an{ background:#f2b705; border-color:#f2b705; color:#1f2328; }
.ws-haupt{ flex:1; min-height:0; overflow:auto; padding:0 2.2vmin 2.2vmin; display:flex; flex-direction:column; }
.ws-karte{ background:#2a3038; border-radius:22px; padding:clamp(14px,3vmin,34px); flex:1; display:flex; flex-direction:column; gap:2vmin; min-height:0; }
.ws-kopf{ display:flex; gap:10px; align-items:center; flex-wrap:wrap; color:#aab2bb; font-weight:800; font-size:clamp(14px,1.9vmin,19px); }
.ws-kopf .ws-nr{ background:#f2b705; color:#1f2328; border-radius:999px; padding:3px 12px; font-weight:900; }
.ws-frage{ font-size:clamp(22px,4.6vmin,56px); font-weight:900; line-height:1.18; }
.ws-opt{ display:grid; grid-template-columns:1fr 1fr; gap:1.6vmin; }
.ws-o{ font:800 clamp(17px,2.9vmin,34px) "Nunito",sans-serif; text-align:left; background:#353c45; color:#f1efe9; border:3px solid #444c56; border-radius:18px; padding:1.6vmin 2vmin; cursor:pointer; display:flex; gap:.6em; align-items:center; min-height:64px; }
.ws-o i{ font-style:normal; background:#1f2328; color:#f2b705; border-radius:10px; min-width:1.7em; text-align:center; padding:2px 0; font-weight:900; }
.ws-o.richtig{ background:#2e8b57; border-color:#7fe0a6; }
.ws-o.falsch{ background:#7a2a22; border-color:#c0392b; opacity:.85; }
.ws-o.aus{ opacity:.45; }
.ws-info{ background:#1f2328; border-left:7px solid #f2b705; border-radius:12px; padding:1.4vmin 2vmin; font-size:clamp(16px,2.5vmin,28px); font-weight:700; line-height:1.4; }
.ws-info b:first-child{ display:block; color:#f2b705; font-size:.7em; letter-spacing:.08em; text-transform:uppercase; }
.ws-reihe{ display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
.ws-fall{ font-size:clamp(20px,3.6vmin,44px); font-weight:800; line-height:1.35; }
.ws-fall .emo{ font-size:1.5em; margin-right:.3em; }
.ws-zu{ display:none; }
.ws-gross{ font-size:clamp(60px,14vmin,160px); text-align:center; line-height:1; }
.ws-name{ font-size:clamp(26px,5.4vmin,64px); font-weight:900; text-align:center; }
.ws-wahl3{ display:grid; grid-template-columns:repeat(3,1fr); gap:1.6vmin; }
.ws-wahl3 .ws-o{ justify-content:center; text-align:center; }
.ws-regeln{ display:grid; grid-template-columns:1fr 1fr; gap:1.2vmin 2.4vmin; counter-reset:r; }
.ws-regel{ background:#353c45; border-radius:14px; padding:1.2vmin 1.6vmin; font-size:clamp(16px,2.4vmin,27px); font-weight:800; display:flex; gap:.6em; align-items:center; cursor:pointer; min-height:56px; }
.ws-regel .emo{ font-size:1.4em; }
.ws-regel.zu{ color:transparent; background:repeating-linear-gradient(-45deg,#353c45 0 14px,#30363e 14px 28px); }
.ws-regel.zu .emo{ visibility:hidden; }
.ws-regel.zu::after{ content:"Regel " counter(r) " aufdecken"; color:#8d96a0; position:absolute; }
.ws-regel{ position:relative; counter-increment:r; }
.ws-film{ flex:1; min-height:240px; background:#000; border-radius:16px; overflow:hidden; display:flex; align-items:center; justify-content:center; }
.ws-film iframe{ width:100%; height:100%; border:0; min-height:240px; }
.ws-film .leer{ color:#8d96a0; font-weight:800; text-align:center; padding:20px; font-size:clamp(15px,2.2vmin,22px); }
.ws-eingabe{ flex:1; min-width:220px; font:700 16px "Nunito",sans-serif; padding:10px 14px; border-radius:12px; border:2px solid #444c56; background:#1f2328; color:#f1efe9; }
.ws-auftrag{ display:grid; grid-template-columns:1fr 1fr; gap:1.4vmin; }
.ws-auftrag div{ background:#353c45; border-radius:14px; padding:1.4vmin 1.8vmin; font-size:clamp(15px,2.2vmin,24px); font-weight:800; }
.ws-auftrag div b{ color:#f2b705; display:block; }
.ws-tipps{ display:flex; flex-direction:column; gap:1vmin; }
.ws-tipp{ display:flex; gap:12px; align-items:center; background:#353c45; border-radius:14px; padding:1.2vmin 1.6vmin; font-size:clamp(15px,2.1vmin,22px); flex-wrap:wrap; }
.ws-tipp .emo{ font-size:1.8em; } .ws-tipp small{ color:#c3c9cf; font-weight:700; font-size:.82em; }
.ws-art{ background:#1f2328; color:#f2b705; border-radius:999px; padding:1px 10px; font-size:.75em; font-weight:900; }
.ws-hinweis{ color:#aab2bb; font-weight:700; font-size:clamp(13px,1.7vmin,17px); }
.ws-zeit{ font-weight:900; color:#f2b705; font-size:22px; min-width:2.4em; }
.ws-ende{ text-align:center; display:flex; flex-direction:column; gap:2vmin; align-items:center; justify-content:center; flex:1; }
@media (max-width:760px){
  .ws-opt, .ws-regeln, .ws-auftrag{ grid-template-columns:1fr; }
  .ws-wahl3{ grid-template-columns:1fr; }
  .ws-leiste{ gap:6px; } .ws-luecke{ display:none; }
  .ws-punkte{ order:5; width:100%; justify-content:center; }
  .ws-o{ min-height:52px; }
}
`;

/* ---------- Inhalte ---------- */
// Quiz: [Frage, [richtig, falsch, falsch, falsch], Erklärung, Position der richtigen Antwort 0–3]
const QUIZ = [
    ["Was ist ein „Grat“ an einem Werkstück aus Metall?", ["Ein scharfer, rauer Rand an der Schnittkante", "Die Zacken am Sägeblatt", "Die Linie, an der man absägen will", "Eine dünne Leiste zum Abstützen"],
        "Beim Sägen und Feilen bleibt an der Kante ein scharfer, rauer Rand stehen – der Grat. Daran schneidet man sich leicht. Deshalb wird jede Schnittkante sofort <b>entgratet</b> (mit Feile oder Entgrater).", 2],
    ["Womit entfernt man Metallspäne von der Werkbank?", ["Mit Handfeger oder Pinsel", "Mit einem feuchten Lappen", "Mit dem Ärmel abstreifen", "Kräftig wegpusten"],
        "Späne sind winzige, scharfe Splitter. Mit Lappen oder Ärmel drückt man sie in Stoff und Haut, beim Pusten fliegen sie in die Augen. Richtig: <b>Handfeger oder Pinsel</b>.", 1],
    ["Eine Japansäge (für Holz) sägt …", ["… auf Zug – also beim Ziehen", "… auf Stoß – also beim Schieben", "… in beide Richtungen gleich stark", "… nur, wenn man fest aufdrückt"],
        "Die Zähne der Japansäge zeigen zum Griff hin. Sie schneidet beim <b>Ziehen</b> – deshalb ist das Blatt so dünn und der Schnitt so fein. Druck braucht man kaum.", 3],
    ["Bei der Metallbügelsäge zeigen die Zähne …", ["… vom Griff weg nach vorn", "… zum Griff hin", "… nach oben", "Das ist egal, sie sägt immer"],
        "Die Metallsäge arbeitet <b>auf Stoß</b>: Sie schneidet beim Schieben vom Körper weg. Deshalb zeigen die Zähne nach vorn. Zurück zieht man sie ohne Druck.", 0],
    ["Warum darf man eine Feile nie ohne Griff (Heft) benutzen?", ["Das spitze hintere Ende kann in die Hand stechen", "Sie feilt dann schief", "Sie wird dann schnell stumpf", "Sie wird beim Feilen zu heiß"],
        "Hinten hat die Feile eine spitze Angel. Ohne festen Griff rammt man sie sich beim Feilen in die Handfläche. Vorher prüfen: <b>Sitzt der Griff fest?</b>", 1],
    ["Wann drückt man beim Feilen auf die Feile?", ["Nur beim Vorschieben", "Nur beim Zurückziehen", "Hin und zurück gleich stark", "Gar nicht, die Feile arbeitet allein"],
        "Die Feile schneidet nur <b>nach vorn</b>. Beim Zurückziehen wird sie nur leicht geführt – sonst wird sie stumpf und das Werkstück zerkratzt.", 2],
    ["Wie hält man ein Werkstück beim Sägen richtig fest?", ["Im Schraubstock oder mit einer Zwinge", "Mit der freien Hand fest auf den Tisch drücken", "Mit dem Knie gegen die Werkbank pressen", "Gar nicht – schwere Teile liegen von allein still"],
        "Ein Werkstück, das nur mit der Hand gehalten wird, rutscht weg – und die Säge springt auf die Finger. Darum: <b>immer einspannen</b>. Beide Hände bleiben dann am Werkzeug.", 0],
    ["Wozu legt man Schutzbacken in den Schraubstock?", ["Damit weiche Werkstücke keine Abdrücke bekommen", "Damit der Schraubstock nicht rostet", "Damit man weniger fest drehen muss", "Damit der Schraubstock leiser ist"],
        "Die Backen des Schraubstocks sind geriffelt und hart. Holz oder Aluminium bekommen davon hässliche Abdrücke. <b>Schutzbacken</b> aus Kunststoff, Holz oder Alu schonen das Werkstück.", 3],
    ["Wie schleift man Holz am glattesten?", ["In Richtung der Holzfasern", "Quer zu den Holzfasern", "In kleinen Kreisen", "So schnell wie möglich hin und her"],
        "Wer quer zur Faser schleift, reißt Kratzer ins Holz, die man später sieht. Glatt wird es <b>in Faserrichtung</b> – erst mit grobem, dann mit feinem Schleifpapier.", 1],
    ["Was macht man nach dem Arbeiten mit Metall immer?", ["Hände waschen", "Das Werkzeug einölen", "Das Werkstück mit Wasser abkühlen", "Die Fenster schließen"],
        "An den Händen klebt feiner Metallstaub. Ohne Waschen landet er im Mund (Pausenbrot!) oder in den Augen. Deshalb nach Metallarbeiten: <b>immer Hände waschen</b>.", 2]
];

// Unfall-Akten: [Emoji, Fall, Was ist schiefgelaufen?, Regel]
const FAELLE = [
    ["🩸", "Paul sägt ein Aluminiumrohr ab. Stolz fährt er mit dem Finger über die frische Schnittkante, um zu fühlen, ob sie glatt ist. Danach blutet sein Finger.",
        "An der Schnittkante war noch der scharfe Grat. Paul hat ihn nicht entfernt und mit dem Finger „getestet“.", "Metallkanten sofort <b>entgraten</b> – nie mit den Fingern prüfen."],
    ["✋", "Lena hat fertig gefeilt. Sie wischt die Metallspäne mit der flachen Hand von der Werkbank. Abends hat sie einen winzigen Splitter in der Hand, der weh tut.",
        "Späne sind scharfe Splitter. Mit der Hand drückt man sie direkt in die Haut.", "Späne nur mit <b>Handfeger oder Pinsel</b> entfernen."],
    ["💨", "Jonas schleift sein Holzstück. Damit er besser sieht, pustet er den Staub kräftig weg. Sein Nachbar reibt sich plötzlich das Auge.",
        "Beim Pusten fliegen Staub und Späne durch die Luft – direkt in Augen und Gesicht von anderen.", "<b>Nie pusten</b> – Staub und Späne mit dem Pinsel abkehren."],
    ["🪚", "Tim will schnell eine Holzleiste absägen. Er drückt sie mit der linken Hand auf den Tisch und sägt mit rechts. Die Leiste rutscht weg, die Säge springt ab – auf seinen Daumen.",
        "Das Werkstück war nicht eingespannt. Die Hand lag direkt neben dem Sägeblatt.", "Werkstücke immer <b>im Schraubstock oder mit Zwinge</b> festmachen."],
    ["🏃", "Leon holt sich am Werkzeugschrank eine Feinsäge. Auf dem Rückweg rennt er, weil er der Erste sein will, und dreht sich schnell zu seinem Kumpel um.",
        "Mit Werkzeug in der Hand rennen und sich umdrehen – die Zähne zeigen dabei auf andere.", "In der Werkstatt wird <b>nicht gerannt</b>. Werkzeug ruhig tragen, Zähne und Spitzen nach unten."],
    ["🔧", "Hannah nimmt eine Feile aus der Kiste. Der Griff wackelt, aber sie feilt trotzdem los. Beim kräftigen Schieben rutscht der Griff ab.",
        "Ohne festen Griff sticht das spitze hintere Ende der Feile in die Handfläche.", "Vor dem Feilen prüfen: <b>Sitzt der Griff fest?</b> Wackelt er – Lehrkraft Bescheid sagen."],
    ["💇", "Die Lehrerin zeigt an der Ständerbohrmaschine, wie man ein Loch bohrt. Mia will alles genau sehen, beugt sich ganz nah heran. Ihre langen Haare sind offen, die Kapuzenbänder baumeln.",
        "Lose Haare und Bänder können von drehenden Teilen erfasst und aufgewickelt werden.", "<b>Lange Haare zusammenbinden</b>, Schals und Bänder weg, Abstand zu Maschinen halten."],
    ["🦶", "Max legt seine Säge kurz auf die Kante der Werkbank, weil er etwas holen will. Jemand stößt gegen den Tisch – die Säge fällt herunter.",
        "Werkzeug lag am Rand und nicht sicher. Herunterfallendes Werkzeug trifft Füße und Beine.", "Werkzeug <b>sicher in die Mitte</b> legen – Ordnung am Arbeitsplatz."],
    ["🥪", "Felix hat eine Stunde lang ein Messingblech gefeilt. Gleich danach klingelt es zur Pause. Er holt sein Pausenbrot heraus und isst.",
        "An seinen Fingern klebte feiner Metallstaub – jetzt ist er im Mund gelandet.", "Nach Metallarbeiten <b>immer Hände waschen</b>."],
    ["😬", "Emma soll einen Holzklotz glatt schleifen. Sie schrubbt kreuz und quer, damit es schneller geht. Hinterher sieht das Holz zerkratzt aus.",
        "Kein Unfall – aber ein Arbeitsfehler: Quer zur Faser reißt das Schleifpapier Kratzer ins Holz.", "Holz immer <b>in Faserrichtung</b> schleifen – erst grob, dann fein."]
];

// Holz oder Metall? [Emoji, Werkzeug, Antwort 0=Holz 1=Metall 2=beides, Erklärung]
const WERKZEUG = [
    ["🪚", "Japansäge / Feinsäge", 0, "Für <b>Holz</b>. Sie sägt auf Zug und macht feine, gerade Schnitte."],
    ["🔩", "Metallbügelsäge", 1, "Für <b>Metall</b> (auch Kunststoff). Ganz feine Zähne, sägt auf Stoß."],
    ["🧽", "Schleifpapier", 2, "<b>Beides!</b> Es gibt Schleifpapier für Holz und für Metall – zum Glätten und Entgraten."],
    ["📍", "Reißnadel", 1, "Für <b>Metall</b>. Damit ritzt man die Linie ein – ein Bleistiftstrich wäre auf Metall kaum zu sehen."],
    ["✏️", "Bleistift und Anschlagwinkel", 0, "Für <b>Holz</b>: Linie anzeichnen, bevor gesägt wird. Der Winkel sorgt für rechte Winkel."],
    ["🗜️", "Schraubstock", 2, "<b>Beides!</b> Er hält jedes Werkstück fest. Für Holz und weiches Metall: Schutzbacken einlegen."],
    ["🪵", "Holzraspel", 0, "Für <b>Holz</b>. Grobe Zähne nehmen schnell viel Holz ab."],
    ["📏", "Feile", 2, "<b>Beides</b> – vor allem aber Metall: zum Formen und Entgraten. Für Holz gibt es eigene Holzfeilen."],
    ["🎯", "Körner", 1, "Für <b>Metall</b>: Er schlägt eine kleine Kuhle, damit der Bohrer beim Bohren nicht wegrutscht."],
    ["🪥", "Feilenbürste", 1, "Für <b>Metall</b>-Feilen: Sie bürstet die Späne aus den Rillen der Feile."],
    ["〰️", "Laubsäge", 2, "Gemein: <b>beides!</b> Mit Holzsägeblatt für Holz – mit Metallsägeblatt kann sie auch dünnes Blech sägen."],
    ["🔪", "Entgrater", 1, "Für <b>Metall</b>: Damit nimmt man den scharfen Grat von Kanten und Bohrlöchern."]
];
const WAHL = ["🪵 Holz", "🔩 Metall", "🤝 Beides"];

const REGELN = [
    ["🚪", "Werkstatt nur mit der Lehrkraft betreten."],
    ["🏃", "Nicht rennen, nicht schubsen, nicht toben."],
    ["🎒", "Taschen und Jacken weg – der Boden bleibt frei."],
    ["💇", "Lange Haare zusammenbinden, Schals und Bänder ab."],
    ["🗜️", "Werkstück immer einspannen – nie mit der Hand halten."],
    ["🔧", "Werkzeug nur wofür es gedacht ist – Griff prüfen."],
    ["🩸", "Metallkanten sofort entgraten."],
    ["🧹", "Späne mit Handfeger oder Pinsel – nie Hand, nie pusten."],
    ["🧼", "Nach Metallarbeiten Hände waschen."],
    ["🚑", "Jede Verletzung sofort der Lehrkraft melden."]
];

// Film-Tipps: Planet Schule „Handwerkskunst!“ (SWR) – Themenseite laut Planet Schule online bis Mai 2028.
// Die Filme sind lang (ca. 45 Min.) – nur einen Ausschnitt von 8–10 Minuten zeigen.
const PS = "https://www.planet-schule.de/schwerpunkt/handwerkskunst/";
const FILM_TIPPS = [
    ["🚲", "Wie man ein Fahrrad baut", "Metall", PS + "wie-man-ein-fahrrad-baut-film-100.html", "Ein Rahmenbauer in Pforzheim schweißt jedes Stahlrohr selbst und baut daraus Lastenräder – echte Metallwerkstatt."],
    ["⛵", "Wie man ein Boot baut", "Holz", PS + "wie-man-ein-boot-baut-film-100.html", "Bootsbau aus Holz – viel Handarbeit in der Holzwerkstatt."],
    ["🌶️", "Wie man eine Pfeffermühle drechselt", "Holz", PS + "wie-man-eine-pfeffermuehle-drechselt-film-100.html", "Aus einem Stück Holz wird an der Drechselbank eine Pfeffermühle."]
];
const FILM_SUCHE = [["▶️ Eigenen Film bei YouTube suchen", "https://www.youtube.com/results?search_query=Sicherheit+im+Werkraum+Schule"]];

/* ---------- Zustand ---------- */
const S = { kap: "quiz", a: 0, b: 0, dran: "a", q: 0, qWahl: null, f: 0, fStufe: 0, w: 0, wWahl: null, regeln: 0 };
function laden(){ try { Object.assign(S, JSON.parse(localStorage.getItem("ws_stand") || "{}")); } catch (x) {} S.qWahl = null; S.wWahl = null; }
function merken(){ try { const { qWahl, wWahl, ...rest } = S; localStorage.setItem("ws_stand", JSON.stringify(rest)); } catch (x) {} }
const filmUrl = v => { try { if (v !== undefined) localStorage.setItem("ws_film", v); return localStorage.getItem("ws_film") || ""; } catch (x) { return ""; } };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const team = t => t === "a" ? "Team A" : "Team B";

let el = null, uhr = null;
function aufbauen(){
    if (el) return;
    const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    el = document.createElement("div"); el.id = "ws";
    document.body.appendChild(el);
    el.addEventListener("click", klick);
    el.addEventListener("change", e => { if (e.target.id === "wsFilm") { filmUrl(e.target.value.trim()); zeichnen(); } });
    laden();
}

const TABS = [["quiz", "❓ Einstiegs-Quiz"], ["film", "🎬 Film"], ["faelle", "🚨 Unfall-Akten"], ["werkzeug", "🧰 Holz oder Metall?"], ["regeln", "🪪 Regeln & Führerschein"]];

function zeichnen(){
    merken();
    el.innerHTML = `
    <div class="ws-leiste">
        <div class="ws-titel">🛠️ Werkstatt-Führerschein<small>Holz & Metall</small></div>
        <div class="ws-luecke"></div>
        <div class="ws-punkte">
            ${["a", "b"].map(t => `<div class="ws-team${S.dran === t ? " dran" : ""}"><span data-a="dran" data-t="${t}" style="cursor:pointer">${team(t)}</span><button data-a="minus" data-t="${t}" title="Punkt abziehen (z. B. Zwischenruf)">−</button><b>${S[t]}</b><button data-a="plus" data-t="${t}" title="Punkt dazu">+</button></div>`).join("")}
        </div>
        <button class="ws-k" data-a="voll" title="Vollbild">⛶</button>
        <button class="ws-k" data-a="zu">✕ Schließen</button>
    </div>
    <div class="ws-tabs">${TABS.map(([k, n]) => `<button class="ws-tab${S.kap === k ? " an" : ""}" data-kap="${k}">${n}</button>`).join("")}</div>
    <div class="ws-haupt"><div class="ws-karte">${({ quiz, film, faelle, werkzeug, regeln })[S.kap]()}</div></div>`;
}

/* ---------- Quiz ---------- */
function reihenfolge(i){ const [, o, , pos] = QUIZ[i]; const r = o.slice(1); r.splice(pos, 0, o[0]); return r; }
function quiz(){
    if (S.q >= QUIZ.length) return `<div class="ws-ende"><div class="ws-gross">🏁</div><div class="ws-name">Quiz geschafft!</div>
        <div class="ws-frage" style="font-size:clamp(20px,3.4vmin,40px)">Team A: ${S.a} · Team B: ${S.b}</div>
        <div class="ws-reihe" style="justify-content:center"><button class="ws-k gelb" data-kap="film">Weiter zum Film ▶</button><button class="ws-k" data-a="qneu">↺ Quiz von vorn</button></div></div>`;
    const [frage, opts, erkl, pos] = QUIZ[S.q], r = reihenfolge(S.q), gew = S.qWahl;
    return `<div class="ws-kopf"><span class="ws-nr">Frage ${S.q + 1} / ${QUIZ.length}</span><span>🎯 ${team(S.dran)} ist dran – richtig = 1 Punkt</span>
            <span class="ws-luecke"></span><button class="ws-k" data-a="zeit">⏳ 15 Sekunden</button><span class="ws-zeit" id="wsZeit"></span></div>
        <div class="ws-frage">${esc(frage)}</div>
        <div class="ws-opt">${r.map((t, k) => {
            let c = ""; if (gew !== null) c = k === pos ? " richtig" : k === gew ? " falsch" : " aus";
            return `<button class="ws-o${c}" data-a="qwahl" data-k="${k}"${gew !== null ? " disabled" : ""}><i>${"ABCD"[k]}</i>${esc(t)}</button>`; }).join("")}</div>
        ${gew !== null ? `<div class="ws-info"><b>${gew === pos ? "✅ Richtig – Punkt für " + team(S.dran) : "❌ Leider falsch – kein Punkt"}</b>${erkl}</div>
        <div class="ws-reihe"><button class="ws-k gelb" data-a="qweiter">Nächste Frage ▶ (${team(S.dran === "a" ? "b" : "a")})</button></div>` :
        `<div class="ws-reihe"><button class="ws-k" data-a="qzurueck"${S.q ? "" : " disabled"}>◀ zurück</button><button class="ws-k" data-a="qskip">überspringen ▶</button></div>`}`;
}

/* ---------- Film ---------- */
function ytId(u){ const m = /(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/.exec(u); return m ? m[1] : ""; }
function film(){
    const u = filmUrl(), id = ytId(u);
    return `<div class="ws-kopf"><span class="ws-nr">Film</span><span>Beobachtungsauftrag: Jedes Team achtet auf etwas anderes. Danach gibt es Punkte für jede richtige Beobachtung.</span></div>
        <div class="ws-auftrag"><div><b>Team A</b>Welche Werkzeuge kommen vor? Für Holz oder Metall?</div><div><b>Team B</b>Welche Sicherheitsregeln seht ihr? Was wird richtig gemacht?</div></div>
        <div class="ws-film">${id ? `<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>` :
            u ? `<div class="leer">🎬<br><br><a class="ws-k gelb" href="${esc(u)}" target="_blank" rel="noopener" style="text-decoration:none;display:inline-block">Film öffnen ↗</a></div>` :
            `<div class="leer">Wähle unten einen Film-Tipp – er öffnet sich in einem neuen Fenster.<br>Oder füge einen eigenen Link ein (YouTube läuft dann direkt hier).</div>`}</div>
        <div class="ws-reihe"><input id="wsFilm" class="ws-eingabe" placeholder="Film-Link einfügen (YouTube wird direkt hier abgespielt)" value="${esc(u)}">${u ? `<button class="ws-k" data-a="filmweg">Link entfernen</button>` : ""}</div>
        <div class="ws-tipps">${FILM_TIPPS.map(([e, t, art, url, txt]) => `<div class="ws-tipp"><div class="emo">${e}</div><div style="flex:1"><b>${esc(t)}</b> <span class="ws-art">${art}</span><br><small>${esc(txt)}</small></div><a class="ws-k gelb" href="${url}" target="_blank" rel="noopener" style="text-decoration:none;white-space:nowrap">Film öffnen ↗</a></div>`).join("")}
            <div class="ws-hinweis">📺 Planet Schule (SWR) · Die Filme sind ca. 45 Minuten lang – zeig nur einen <b>Ausschnitt von 8–10 Minuten</b>. Vorher kurz reinschauen.</div></div>
        <div class="ws-reihe">${FILM_SUCHE.map(([n, l]) => `<a class="ws-k" href="${l}" target="_blank" rel="noopener" style="text-decoration:none">${n}</a>`).join("")}</div>`;
}

/* ---------- Unfall-Akten ---------- */
function faelle(){
    const [emo, fall, was, regel] = FAELLE[S.f];
    return `<div class="ws-kopf"><span class="ws-nr">Akte ${S.f + 1} / ${FAELLE.length}</span><span>🕵️ Was ist schiefgelaufen? Welche Regel hätte geholfen? – ${team(S.dran)} darf zuerst</span></div>
        <div class="ws-fall"><span class="emo">${emo}</span>${esc(fall)}</div>
        ${S.fStufe >= 1 ? `<div class="ws-info"><b>Was ist schiefgelaufen?</b>${esc(was)}</div>` : ""}
        ${S.fStufe >= 2 ? `<div class="ws-info" style="border-left-color:#2e8b57"><b style="color:#7fe0a6">Die Regel</b>${regel}</div>` : ""}
        <div class="ws-reihe">
            ${S.fStufe < 2 ? `<button class="ws-k gelb" data-a="faufdecken">${S.fStufe ? "Regel zeigen" : "Auflösung zeigen"}</button>` : ""}
            <button class="ws-k gruen" data-a="fpunkt">✔ Richtig erkannt: +1 ${team(S.dran)}</button>
            <button class="ws-k" data-a="fwechsel">↔ anderes Team versucht es</button>
            <span class="ws-luecke"></span>
            <button class="ws-k" data-a="fzurueck"${S.f ? "" : " disabled"}>◀</button>
            <button class="ws-k" data-a="fweiter"${S.f < FAELLE.length - 1 ? "" : " disabled"}>Nächste Akte ▶</button>
        </div>`;
}

/* ---------- Holz oder Metall? ---------- */
function werkzeug(){
    const [emo, name, ok, erkl] = WERKZEUG[S.w], gew = S.wWahl;
    return `<div class="ws-kopf"><span class="ws-nr">Werkzeug ${S.w + 1} / ${WERKZEUG.length}</span><span>🧰 Für Holz, für Metall – oder für beides? ${team(S.dran)} entscheidet</span></div>
        <div class="ws-gross">${emo}</div><div class="ws-name">${esc(name)}</div>
        <div class="ws-wahl3">${WAHL.map((t, k) => {
            let c = ""; if (gew !== null) c = k === ok ? " richtig" : k === gew ? " falsch" : " aus";
            return `<button class="ws-o${c}" data-a="wwahl" data-k="${k}"${gew !== null ? " disabled" : ""}>${t}</button>`; }).join("")}</div>
        ${gew !== null ? `<div class="ws-info"><b>${gew === ok ? "✅ Richtig – Punkt für " + team(S.dran) : "❌ Falsch – kein Punkt"}</b>${erkl}</div>` : ""}
        <div class="ws-reihe"><button class="ws-k" data-a="wzurueck"${S.w ? "" : " disabled"}>◀</button>
            ${S.w < WERKZEUG.length - 1 ? `<button class="ws-k gelb" data-a="wweiter">Nächstes Werkzeug ▶${gew !== null ? " (" + team(S.dran === "a" ? "b" : "a") + ")" : ""}</button>` : `<button class="ws-k gelb" data-kap="regeln">Weiter zu den Regeln ▶</button>`}</div>`;
}

/* ---------- Regeln & Führerschein ---------- */
function regeln(){
    return `<div class="ws-kopf"><span class="ws-nr">Die 10 Werkstattregeln</span><span>Erst raten lassen, dann antippen und aufdecken. Wer die Regel nennt, holt einen Punkt.</span></div>
        <div class="ws-regeln">${REGELN.map(([e, t], k) => `<div class="ws-regel${k < S.regeln ? "" : " zu"}" data-a="regel" data-k="${k}"><span class="emo">${e}</span>${esc(t)}</div>`).join("")}</div>
        <div class="ws-reihe"><button class="ws-k" data-a="ralle">Alle aufdecken</button><button class="ws-k" data-a="rzu">Alle verdecken</button><span class="ws-luecke"></span>
            <button class="ws-k gelb" data-a="druck">🖨️ Führerscheine drucken (4 pro A4-Seite)</button>
            <button class="ws-k" data-a="sieger">🏆 Siegerteam zeigen</button></div>`;
}

function siegerZeigen(){
    const t = S.a === S.b ? "Unentschieden!" : (S.a > S.b ? "Team A" : "Team B") + " gewinnt!";
    el.querySelector(".ws-karte").innerHTML = `<div class="ws-ende"><div class="ws-gross">🏆</div><div class="ws-name">${t}</div>
        <div class="ws-frage" style="font-size:clamp(20px,3.4vmin,40px)">Team A: ${S.a} · Team B: ${S.b}</div>
        <div class="ws-reihe" style="justify-content:center"><button class="ws-k" data-kap="regeln">◀ zurück</button><button class="ws-k rot" data-a="reset">Alles zurücksetzen (neue Klasse)</button></div></div>`;
}

function drucken(){
    const karte = `<div class="fs"><div class="kopf"><span>🛠️</span><div><b>Werkstatt-Führerschein</b><small>Technik · Holz &amp; Metall</small></div></div>
        <div class="z">Name: <i></i></div><div class="z">Klasse: <i style="max-width:30mm"></i></div>
        <p>hat die Werkstattregeln gelernt und darf mit <b>Säge, Feile und Schraubstock</b> arbeiten.</p>
        <ul><li>Werkstück einspannen</li><li>Metallkanten entgraten</li><li>Späne mit Pinsel – nie Hand, nie pusten</li><li>Nicht rennen, Haare zusammen</li><li>Hände waschen, Verletzung melden</li></ul>
        <div class="unter"><div><i></i>Datum</div><div><i></i>Lehrkraft</div></div></div>`;
    const w = window.open("", "_blank");
    if (!w) { alert("Bitte Pop-ups für den Leuchtturm erlauben, dann klappt das Drucken."); return; }
    w.document.write(`<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><title>Werkstatt-Führerschein</title><style>
        @page{ size:A4; margin:10mm; } *{ box-sizing:border-box; } body{ margin:0; font-family:"Nunito",Arial,sans-serif; color:#1f2328; }
        .blatt{ display:grid; grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; gap:6mm; height:277mm; }
        .fs{ border:2.5px dashed #555; border-radius:5mm; padding:5mm 6mm; display:flex; flex-direction:column; gap:2.6mm; font-size:11.5pt; }
        .kopf{ display:flex; gap:3mm; align-items:center; background:repeating-linear-gradient(-45deg,#f2b705 0 6px,#1f2328 6px 12px); padding:2mm; border-radius:3mm; }
        .kopf span{ font-size:22pt; background:#fff; border-radius:2mm; padding:0 2mm; } .kopf div{ background:#fff; border-radius:2mm; padding:1mm 3mm; flex:1; }
        .kopf b{ display:block; font-size:14pt; } .kopf small{ font-size:9pt; color:#555; }
        .z{ display:flex; gap:2mm; align-items:flex-end; font-weight:700; } .z i{ flex:1; border-bottom:1px solid #333; height:6mm; }
        p{ margin:1mm 0; } ul{ margin:0; padding-left:5mm; font-size:10.5pt; line-height:1.45; } li::marker{ content:"☐  "; }
        .unter{ margin-top:auto; display:flex; gap:6mm; font-size:9pt; color:#555; } .unter div{ flex:1; } .unter i{ display:block; border-bottom:1px solid #333; height:9mm; }
    </style></head><body><div class="blatt">${karte.repeat(4)}</div><script>window.onload=function(){setTimeout(function(){window.print();},300);};<\/script></body></html>`);
    w.document.close();
}

/* ---------- Bedienung ---------- */
function anderes(){ S.dran = S.dran === "a" ? "b" : "a"; }
function klick(e){
    const t = e.target.closest("[data-a],[data-kap]"); if (!t || t.disabled) return;
    if (t.dataset.kap){ S.kap = t.dataset.kap; S.qWahl = null; S.wWahl = null; return zeichnen(); }
    const a = t.dataset.a, k = +t.dataset.k;
    switch (a){
        case "zu": return schliessen();
        case "voll": return (window.vollbild ? window.vollbild() : null);
        case "plus": S[t.dataset.t]++; return zeichnen();
        case "minus": S[t.dataset.t]--; return zeichnen();
        case "dran": S.dran = t.dataset.t; return zeichnen();
        case "zeit": return countdown(15);
        case "qwahl": stopp(); S.qWahl = k; if (k === QUIZ[S.q][3]) S[S.dran]++; return zeichnen();
        case "qweiter": S.q++; S.qWahl = null; anderes(); return zeichnen();
        case "qskip": S.q++; S.qWahl = null; return zeichnen();
        case "qzurueck": S.q = Math.max(0, S.q - 1); S.qWahl = null; return zeichnen();
        case "qneu": S.q = 0; S.qWahl = null; return zeichnen();
        case "filmweg": filmUrl(""); return zeichnen();
        case "faufdecken": S.fStufe++; return zeichnen();
        case "fpunkt": S[S.dran]++; S.fStufe = 2; return zeichnen();
        case "fwechsel": anderes(); return zeichnen();
        case "fweiter": S.f++; S.fStufe = 0; anderes(); return zeichnen();
        case "fzurueck": S.f--; S.fStufe = 0; return zeichnen();
        case "wwahl": S.wWahl = k; if (k === WERKZEUG[S.w][2]) S[S.dran]++; return zeichnen();
        case "wweiter": if (S.wWahl !== null) anderes(); S.w++; S.wWahl = null; return zeichnen();
        case "wzurueck": S.w--; S.wWahl = null; return zeichnen();
        case "regel": S.regeln = Math.max(S.regeln, k + 1); return zeichnen();
        case "ralle": S.regeln = REGELN.length; return zeichnen();
        case "rzu": S.regeln = 0; return zeichnen();
        case "druck": return drucken();
        case "sieger": return siegerZeigen();
        case "reset": if (!confirm("Punkte und Fortschritt für eine neue Klasse zurücksetzen?")) return;
            Object.assign(S, { a: 0, b: 0, dran: "a", q: 0, qWahl: null, f: 0, fStufe: 0, w: 0, wWahl: null, regeln: 0, kap: "quiz" }); return zeichnen();
    }
}
function stopp(){ if (uhr){ clearInterval(uhr); uhr = null; } }
function countdown(n){
    stopp(); const z = () => { const f = el.querySelector("#wsZeit"); if (f) f.textContent = n > 0 ? n + " s" : "⏰ Zeit!"; };
    z(); uhr = setInterval(() => { n--; z(); if (n <= 0) stopp(); }, 1000);
}

function oeffnen(kap){
    aufbauen();
    if (kap && TABS.some(x => x[0] === kap)) S.kap = kap;
    el.classList.add("an");
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "none";
    history.replaceState(null, "", "#werkstatt");
    zeichnen();
}
function schliessen(){
    stopp();
    el.classList.remove("an");
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "";
    history.replaceState(null, "", location.pathname);
}
window.tafelWerkstatt = { oeffnen, schliessen, _S: S };
document.addEventListener("DOMContentLoaded", () => { if (location.hash === "#werkstatt") oeffnen(); });
})();
