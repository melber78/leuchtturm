/* ===============================================================
   Tafelbild: Holz & Metall – Werkstoff-Duell (Technik Kl. 5–7)
   Passend zu den Arbeitsblättern: Stahl & Werkzeugkunde, Fe- und NE-Metalle,
   Laub-/Nadelholz, heimisch/exotisch, Holzschutz, Aufbau des Stammes, Holzwerkstoffe.
   Quiz · Fe oder NE? · Holzarten · Baumstamm · Holz arbeitet · Werkzeug · Film · Werkstatt-Regeln
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
    ["Woraus besteht Stahl?", ["Aus Eisen und ganz wenig Kohlenstoff", "Aus Eisen und Aluminium", "Aus Eisen und Kupfer", "Aus besonders reinem Eisen"],
        "Dem geschmolzenen Eisen wird <b>weniger als 2 % Kohlenstoff</b> beigemischt. Dadurch wird aus dem weichen Eisen der harte, belastbare Stahl.", 2],
    ["Was ist eine „Legierung“?", ["Eine Mischung aus verschiedenen Stoffen", "Ein Schutzlack gegen Rost", "Ein besonders reines Metall", "Ein Werkzeug zum Entgraten"],
        "Eine Legierung ist eine <b>Mischung</b> – zum Beispiel Eisen + Kohlenstoff = Stahl, oder Kupfer + Zink = Messing.", 1],
    ["Welches davon ist ein Eisenmetall (Fe)?", ["Stahl", "Messing", "Zink", "Kupfer"],
        "<b>Stahl</b> besteht hauptsächlich aus Eisen. Messing, Zink und Kupfer enthalten kein Eisen – das sind NE-Metalle.", 3],
    ["Wie findest du am schnellsten heraus, ob eine Schraube aus Eisen ist?", ["Mit einem Magneten", "Man legt sie ins Wasser", "Man prüft, wie sie glänzt", "Man biegt sie mit der Hand"],
        "Eisenmetalle sind <b>magnetisch</b> – die Schraube bleibt am Magneten hängen. Messing oder Aluminium nicht.", 0],
    ["Warum sind fast alle Stromkabel aus Kupfer?", ["Kupfer leitet den Strom sehr gut", "Kupfer ist magnetisch", "Kupfer ist das leichteste Metall", "Kupfer ist das billigste Metall"],
        "Kupfer ist ein NE-Metall und <b>leitet Strom hervorragend</b> – deshalb steckt es in fast jedem Kabel.", 2],
    ["Was ist der größte Feind von Eisen?", ["Feuchtigkeit – Eisen rostet", "Hitze – Eisen schmilzt schnell", "Kälte – Eisen wird brüchig", "Licht – Eisen bleicht aus"],
        "Eisen kann <b>rosten</b>, wenn es nass wird. NE-Metalle wie Aluminium oder Zink rosten nicht – darum sind Dachrinnen oft aus Zink.", 1],
    ["Welches Holz ist ein Nadelholz (Weichholz)?", ["Kiefer", "Buche", "Eiche", "Ahorn"],
        "<b>Kiefer</b>, Fichte und Tanne sind Nadelhölzer: Sie wachsen schneller, sind weicher und enthalten viel Harz. Buche, Eiche und Ahorn sind harte Laubhölzer.", 3],
    ["Was passiert, wenn Holz Feuchtigkeit aufnimmt?", ["Es dehnt sich aus – es quillt", "Es zieht sich zusammen – es schwindet", "Es wird härter", "Es verändert sich gar nicht"],
        "Nasses Holz <b>quillt</b> (dehnt sich aus), trockenes Holz <b>schwindet</b> (zieht sich zusammen). Passiert das ungleichmäßig, <b>verzieht</b> sich das Brett. Man sagt: Holz arbeitet.", 0],
    ["Woraus besteht eine Spanplatte?", ["Aus gepressten, verleimten Holzspänen", "Aus kreuzweise verleimten Holzschichten", "Aus feinsten gepressten Holzfasern", "Aus einem einzigen Stück Baumstamm"],
        "Spanplatte = <b>gepresste Späne</b> (oft mit Kunststoff beschichtet). Kreuzweise Schichten = Sperrholz. Feinste Fasern = MDF-Platte.", 2],
    ["Was bedeutet „konstruktiver Holzschutz“?", ["Holz so verbauen, dass Regenwasser sofort abfließt", "Holz mit Lack oder Öl anstreichen", "Holz mit Chemie gegen Holzwürmer spritzen", "Holz im Ofen trocknen"],
        "Konstruktiv = durch die <b>Bauweise</b> schützen: Das Wasser kann ablaufen. Lack, Öl und Lasur sind dagegen <b>chemischer</b> Holzschutz.", 1]
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

// Sortier-Spiele: Einträge [Emoji, Name, richtige Option, Erklärung]
const SPIELE = {
    metall: { titel: "Werkstoff", frage: "Eisenmetall (Fe) oder Nichteisenmetall (NE)?", wahl: ["🧲 Eisenmetall (Fe)", "✨ Nichteisenmetall (NE)"], liste: [
        ["🥫", "Getränkedose aus Aluminium", 1, "<b>NE</b> – Aluminium ist federleicht und rostet nicht."],
        ["🔌", "Stromkabel", 1, "<b>NE</b> – innen steckt Kupfer, das leitet Strom perfekt."],
        ["🔩", "Eiserne Bastelschraube", 0, "<b>Fe</b> – sie ist aus Eisen und bleibt am Magneten hängen."],
        ["🛤️", "Eisenbahnschiene", 0, "<b>Fe</b> – aus Stahl, weil sie riesige Lasten tragen muss."],
        ["🏠", "Dachrinne", 1, "<b>NE</b> – meist aus Zink, das hält Wind und Wetter stand."],
        ["✈️", "Flugzeug", 1, "<b>NE</b> – Aluminium, weil es viel leichter ist als Eisen."],
        ["🔨", "Hammerkopf", 0, "<b>Fe</b> – aus Stahl: extrem hart und belastbar."],
        ["🎺", "Trompete", 1, "<b>NE</b> – aus Messing (Kupfer + Zink)."],
        ["🌉", "Große Brücke", 0, "<b>Fe</b> – Stahl ist hart, elastisch und unfassbar belastbar."],
        ["🧻", "Alufolie", 1, "<b>NE</b> – Aluminium, das Wort steckt schon im Namen."],
        ["🛞", "Autofelge aus Stahl", 0, "<b>Fe</b> – Stahl ist stark und hält große Belastungen aus."],
        ["🔑", "Goldfarbener Schlüssel aus Messing", 1, "<b>NE</b> – Messing ist eine Kupfer-Zink-Legierung, ein Magnet zieht ihn nicht an."]
    ]},
    holz: { titel: "Holzart", frage: "Nadelholz, heimisches Laubholz – oder exotisches Tropenholz?", wahl: ["🌲 Nadelholz (weich)", "🌳 Laubholz (hart)", "🌴 Exotisch"], liste: [
        ["🌲", "Fichte", 0, "<b>Nadelholz</b> – heimisch, wächst schnell, weich, viel Harz."],
        ["🌳", "Eiche", 1, "<b>Laubholz</b> – heimisch, hart, schwer, hält sehr lange."],
        ["🌴", "Teak", 2, "<b>Exotisch</b> – Tropenholz, von Natur aus wasserfest. Beliebt für Gartenmöbel und Schiffsdecks."],
        ["🌲", "Kiefer", 0, "<b>Nadelholz</b> – heimisch und weich, leicht zu verarbeiten."],
        ["🌳", "Buche", 1, "<b>Laubholz</b> – heimisch und hart, z. B. für Möbel und Parkett."],
        ["🌴", "Mahagoni", 2, "<b>Exotisch</b> – rötlich-braunes Tropenholz für teure Möbel."],
        ["🌳", "Ahorn", 1, "<b>Laubholz</b> – heimisches Hartholz."],
        ["🌲", "Tanne", 0, "<b>Nadelholz</b> – heimisches Weichholz."],
        ["🌴", "Ebenholz", 2, "<b>Exotisch</b> – tiefschwarzes, extrem hartes Tropenholz."],
        ["🌳", "Birke", 1, "<b>Laubholz</b> – heimisch, mitteleuropäischer Baum mit weißer Rinde."],
        ["🌴", "Palisander", 2, "<b>Exotisch</b> – Tropenholz, z. B. für Musikinstrumente."]
    ]},
    platte: { titel: "Holzwerkstoff", frage: "Welcher Holzwerkstoff ist das?", wahl: ["🧩 Spanplatte", "📚 Sperrholz", "⬜ MDF-Platte"], liste: [
        ["🗄️", "Günstiges Regal aus gepressten, verleimten Holzspänen, mit Kunststoff beschichtet", 0, "<b>Spanplatte</b> – aus Spänen gepresst und verleimt."],
        ["🚪", "Rückwand eines Schranks aus dünnen, kreuzweise verleimten Holzschichten", 1, "<b>Sperrholz</b> – die Schichten liegen kreuzweise, damit es sich nicht verzieht."],
        ["🍽️", "Glatte, schwere Küchenschrank-Front aus feinsten gepressten Holzfasern", 2, "<b>MDF-Platte</b> – aus feinsten Fasern, ganz glatt."]
    ]},
    werkzeug: { titel: "Werkzeug", frage: "Für Holz, für Metall – oder für beides?", wahl: ["🪵 Holz", "🔩 Metall", "🤝 Beides"], liste: [
        ["🔩", "Metallsäge", 1, "<b>Metall</b> – feines Sägeblatt, schneidet das harte Metall präzise in Form."],
        ["📏", "Metallfeile", 1, "<b>Metall</b> – raue Oberfläche, glättet scharfe Kanten nach dem Schnitt (Entgraten)."],
        ["📍", "Anreißnadel", 1, "<b>Metall</b> – ritzt feine Linien ein. Ein Bleistift würde auf Metall verschmieren."],
        ["🪚", "Feinsäge / Japansäge", 0, "<b>Holz</b> – macht feine, gerade Schnitte im Holz."],
        ["✏️", "Bleistift zum Anzeichnen", 0, "<b>Holz</b> – auf Holz sieht man den Strich gut. Auf Metall nimmt man die Anreißnadel."],
        ["🪵", "Holzraspel", 0, "<b>Holz</b> – grobe Zähne nehmen schnell viel Holz ab."],
        ["🧽", "Schleifpapier", 2, "<b>Beides!</b> Es gibt Schleifpapier für Holz und für Metall."],
        ["🗜️", "Schraubstock", 2, "<b>Beides!</b> Er hält jedes Werkstück fest – auch das Metallrohr beim Sägen."],
        ["〰️", "Laubsäge", 2, "Gemein: <b>beides!</b> Mit Metallsägeblatt sägt sie auch dünnes Blech."]
    ]}
};

// Aufbau des Baumstamms (von außen nach innen): [Name, Beschreibung, Farbe, Radius]
const STAMM = [
    ["Borke", "Die äußerste, harte Schicht. Sie schützt den Baum vor Kälte und Verletzungen.", "#5b3a22", 150],
    ["Bast", "Leitet die in den Blättern hergestellten Nährstoffe nach unten.", "#9c6b3f", 136],
    ["Kambium", "Die hauchdünne Wachstumsschicht – hier entstehen neue Holzzellen.", "#7fb069", 129],
    ["Splintholz", "Das hellere, äußere Holz. Es transportiert Wasser und Nährstoffe nach oben.", "#f1d9a6", 124],
    ["Kernholz", "Das dunklere, innere Holz. Es ist abgestorben und gibt dem Baum seine Stabilität.", "#c48a4f", 74],
    ["Markröhre", "Das innerste Zentrum. Sie ist beim jungen Trieb entstanden.", "#6e4a2a", 9]
];

// Holz arbeitet – Lückentext
const LUECKEN = [
    ["Wenn Holz Feuchtigkeit aufnimmt, dehnt es sich aus. Das nennt man", "quellen", "💧"],
    ["Gibt das Holz bei trockener Luft Wasser ab, zieht es sich zusammen. Das nennt man", "schwinden", "☀️"],
    ["Passiert das ungleichmäßig, kann sich ein Brett dauerhaft", "verziehen", "〰️"],
    ["Holz lässt sich entlang der … viel leichter spalten als quer zu ihr:", "Faserrichtung", "🪓"]
];

// Arbeitsschritte Metallrohr (richtige Reihenfolge)
const SCHRITTE = [
    ["📍", "Ich zeichne die Schnittlinie mit der Anreißnadel auf dem Rohr an."],
    ["🗜️", "Ich spanne das Rohr ein und schneide es mit der Metallsäge durch."],
    ["📏", "Ich benutze die Metallfeile, um das Rohr sauber zu entgraten."]
];
const SCHRITT_MISCH = [2, 0, 1];

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

// Film-Tipps (YouTube, laufen direkt in der Präsentation). Vor der Stunde kurz reinschauen.
const YT = id => "https://www.youtube.com/watch?v=" + id;
const FILM_TIPPS = [
    ["🔩", "Metallbearbeitung in der Schule", "Metall", YT("SzvKnzW9Ksw"), "Werkzeuge aus Arbeitsblatt 3 in Aktion: Metall sägen, schneiden, schleifen und entgraten."],
    ["🌳", "Wunderwerkstoff Holz", "Holz", YT("i_SoteRa1fM"), "Kurzfilm der Empa (Schweizer Forschungsinstitut): Holz – belastbar, vielseitig und nachwachsend."]
];
const FILM_SUCHE = [["▶️ Eigenen Film bei YouTube suchen", "https://www.youtube.com/results?search_query=Sicherheit+im+Werkraum+Schule"]];

/* ---------- Zustand ---------- */
const S = { kap: "quiz", a: 0, b: 0, dran: "a", q: 0, qWahl: null, f: 0, fStufe: 0, sp: {}, wWahl: null, regeln: 0, stamm: 0, luecke: 0, schritt: [] };
function laden(){ try { Object.assign(S, JSON.parse(localStorage.getItem("ws_stand2") || "{}")); } catch (x) {} if (!S.sp || typeof S.sp !== "object") S.sp = {}; if (!Array.isArray(S.schritt)) S.schritt = []; S.qWahl = null; S.wWahl = null; }
function merken(){ try { const { qWahl, wWahl, ...rest } = S; localStorage.setItem("ws_stand2", JSON.stringify(rest)); } catch (x) {} }
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

const TABS = [["quiz", "❓ Einstiegs-Quiz"], ["metall", "🧲 Fe oder NE?"], ["werkzeug", "🧰 Werkzeug"], ["schritte", "🔢 Metallrohr"], ["holz", "🌲 Holzarten"], ["stamm", "🪵 Baumstamm"], ["arbeiten", "💧 Holz arbeitet"], ["platte", "🧩 Holzwerkstoffe"], ["film", "🎬 Film"], ["faelle", "🚨 Unfall-Akten"], ["regeln", "🏆 Regeln & Sieger"]];

function zeichnen(){
    merken();
    el.innerHTML = `
    <div class="ws-leiste">
        <div class="ws-titel">🛠️ Holz & Metall<small>Werkstoff-Duell</small></div>
        <div class="ws-luecke"></div>
        <div class="ws-punkte">
            ${["a", "b"].map(t => `<div class="ws-team${S.dran === t ? " dran" : ""}"><span data-a="dran" data-t="${t}" style="cursor:pointer">${team(t)}</span><button data-a="minus" data-t="${t}" title="Punkt abziehen (z. B. Zwischenruf)">−</button><b>${S[t]}</b><button data-a="plus" data-t="${t}" title="Punkt dazu">+</button></div>`).join("")}
        </div>
        <button class="ws-k" data-a="ablauf" title="Stundenablauf zum Abhaken drucken – für die Fachlehrkraft">📋 Ablaufplan</button>
        <button class="ws-k" data-a="voll" title="Vollbild">⛶</button>
        <button class="ws-k" data-a="zu">✕ Schließen</button>
    </div>
    <div class="ws-tabs">${TABS.map(([k, n]) => `<button class="ws-tab${S.kap === k ? " an" : ""}" data-kap="${k}">${n}</button>`).join("")}</div>
    <div class="ws-haupt"><div class="ws-karte">${SPIELE[S.kap] ? spiel(S.kap) : ({ quiz, film, faelle, regeln, stamm, arbeiten, schritte })[S.kap]()}</div></div>`;
}

/* ---------- Quiz ---------- */
function reihenfolge(i){ const [, o, , pos] = QUIZ[i]; const r = o.slice(1); r.splice(pos, 0, o[0]); return r; }
function quiz(){
    if (S.q >= QUIZ.length) return `<div class="ws-ende"><div class="ws-gross">🏁</div><div class="ws-name">Quiz geschafft!</div>
        <div class="ws-frage" style="font-size:clamp(20px,3.4vmin,40px)">Team A: ${S.a} · Team B: ${S.b}</div>
        <div class="ws-reihe" style="justify-content:center"><button class="ws-k gelb" data-kap="metall">Weiter: Fe oder NE? ▶</button><button class="ws-k" data-a="qneu">↺ Quiz von vorn</button></div></div>`;
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
        <div class="ws-auftrag"><div><b>Team A</b>Welche Werkzeuge und Werkstoffe kommen vor?</div><div><b>Team B</b>Welche Eigenschaften werden genannt? Was wird worauf geachtet?</div></div>
        <div class="ws-film">${id ? `<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>` :
            u ? `<div class="leer">🎬<br><br><a class="ws-k gelb" href="${esc(u)}" target="_blank" rel="noopener" style="text-decoration:none;display:inline-block">Film öffnen ↗</a></div>` :
            `<div class="leer">Wähle unten einen Film-Tipp – er läuft dann hier.<br>Oder füge einen eigenen YouTube-Link ein.</div>`}</div>
        <div class="ws-reihe"><input id="wsFilm" class="ws-eingabe" placeholder="Film-Link einfügen (YouTube wird direkt hier abgespielt)" value="${esc(u)}">${u ? `<button class="ws-k" data-a="filmweg">Link entfernen</button>` : ""}</div>
        <div class="ws-tipps">${FILM_TIPPS.map(([e, t, art, url, txt]) => `<div class="ws-tipp"><div class="emo">${e}</div><div style="flex:1"><b>${esc(t)}</b> <span class="ws-art">${art}</span><br><small>${esc(txt)}</small></div><button class="ws-k ${filmUrl() === url ? "gruen" : "gelb"}" data-a="filmtipp" data-u="${url}" style="white-space:nowrap">${filmUrl() === url ? "▶ läuft oben" : "▶ Abspielen"}</button></div>`).join("")}
            <div class="ws-hinweis">📺 YouTube · Tipp antippen – der Film läuft oben in der Präsentation. Vorher kurz reinschauen und ggf. nur einen Ausschnitt zeigen.</div></div>
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

/* ---------- Sortier-Spiele ---------- */
function spiel(key){
    const G = SPIELE[key], i = Math.min(S.sp[key] || 0, G.liste.length - 1), [emo, name, ok, erkl] = G.liste[i], gew = S.wWahl, letzte = i >= G.liste.length - 1;
    const naechst = TABS[TABS.findIndex(x => x[0] === key) + 1];
    return `<div class="ws-kopf"><span class="ws-nr">${G.titel} ${i + 1} / ${G.liste.length}</span><span>${G.frage} – ${team(S.dran)} entscheidet</span></div>
        <div class="ws-gross">${emo}</div><div class="ws-name">${esc(name)}</div>
        <div class="ws-wahl3" style="grid-template-columns:repeat(${G.wahl.length},1fr)">${G.wahl.map((t, k) => {
            let c = ""; if (gew !== null) c = k === ok ? " richtig" : k === gew ? " falsch" : " aus";
            return `<button class="ws-o${c}" data-a="wwahl" data-k="${k}"${gew !== null ? " disabled" : ""}>${t}</button>`; }).join("")}</div>
        ${gew !== null ? `<div class="ws-info"><b>${gew === ok ? "✅ Richtig – Punkt für " + team(S.dran) : "❌ Falsch – kein Punkt"}</b>${erkl}</div>` : ""}
        <div class="ws-reihe"><button class="ws-k" data-a="wzurueck"${i ? "" : " disabled"}>◀</button>
            ${!letzte ? `<button class="ws-k gelb" data-a="wweiter">Weiter ▶${gew !== null ? " (" + team(S.dran === "a" ? "b" : "a") + ")" : ""}</button>` : naechst ? `<button class="ws-k gelb" data-kap="${naechst[0]}">Weiter: ${naechst[1]} ▶</button>` : ""}</div>`;
}

/* ---------- Baumstamm ---------- */
function stamm(){
    const n = S.stamm, aktuell = STAMM[Math.min(n, STAMM.length - 1)];
    const ringe = STAMM.map(([name, , farbe, r], k) => `<circle cx="160" cy="160" r="${r}" fill="${k < n ? farbe : "#3a414a"}" stroke="${k < n ? "#2a1a0e" : "#555d67"}" stroke-width="${k === 2 ? 1 : 2}"/>`).join("")
        + (n >= 5 ? [36, 52, 64].map(r => `<circle cx="160" cy="160" r="${r}" fill="none" stroke="#a8743f" stroke-width="2"/>`).join("") : "")
        + (n >= 4 ? [88, 100, 112].map(r => `<circle cx="160" cy="160" r="${r}" fill="none" stroke="#e2c58a" stroke-width="2"/>`).join("") : "");
    const schilder = STAMM.map(([name], k) => k < n ? `<div class="ws-regel" style="min-height:44px;cursor:default"><span class="emo" style="font-size:1em;background:${STAMM[k][2]};width:1.3em;height:1.3em;border-radius:50%;display:inline-block;border:2px solid #1f2328"></span>${k + 1}. ${esc(name)}</div>` : "").join("");
    return `<div class="ws-kopf"><span class="ws-nr">Aufbau des Stammes</span><span>Von außen nach innen – welche Schicht ist gemeint? ${team(S.dran)} rät</span></div>
        <div style="display:flex;gap:3vmin;flex-wrap:wrap;align-items:center;justify-content:center;flex:1">
            <svg viewBox="0 0 320 320" style="width:min(44vmin,320px);min-width:200px;height:auto">${ringe}</svg>
            <div style="flex:1;min-width:260px;display:flex;flex-direction:column;gap:1.4vmin">
                ${n < STAMM.length ? `<div class="ws-info"><b>Schicht ${n + 1} von 6 – wie heißt sie?</b>${esc(aktuell[1])}</div>
                <div class="ws-hinweis">Wortspeicher: Markröhre · Bast · Borke · Kambium · Splintholz · Kernholz</div>` : `<div class="ws-info" style="border-left-color:#2e8b57"><b style="color:#7fe0a6">Geschafft!</b>Alle sechs Schichten des Baumstamms sind aufgedeckt.</div>`}
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${schilder}</div>
            </div>
        </div>
        <div class="ws-reihe">${n < STAMM.length ? `<button class="ws-k gelb" data-a="stammauf">Auflösen: ${n + 1}. Schicht</button><button class="ws-k gruen" data-a="stammpunkt">✔ Richtig: +1 ${team(S.dran)} und auflösen</button><button class="ws-k" data-a="fwechsel">↔ anderes Team</button>` : ""}
            <span class="ws-luecke"></span><button class="ws-k" data-a="stammneu">↺ von vorn</button></div>`;
}

/* ---------- Holz arbeitet ---------- */
function arbeiten(){
    return `<div class="ws-kopf"><span class="ws-nr">Holz arbeitet</span><span>Wortspeicher: quellen · schwinden · verziehen · Faserrichtung – ${team(S.dran)} beginnt</span></div>
        <div style="display:flex;flex-direction:column;gap:1.6vmin">${LUECKEN.map(([satz, wort, e], k) => `<div class="ws-fall" style="font-size:clamp(18px,3vmin,36px)"><span class="emo">${e}</span>${esc(satz)} <button class="ws-k ${k < S.luecke ? "gruen" : ""}" data-a="luecke" data-k="${k}" style="font-size:clamp(17px,2.8vmin,32px);min-width:7em">${k < S.luecke ? esc(wort) : "❓ aufdecken"}</button></div>`).join("")}</div>
        <div class="ws-info"><b>Merke</b>Holz nimmt Feuchtigkeit auf und gibt sie wieder ab – es verändert ständig seine Form. Deshalb gibt es <b>Holzwerkstoffe</b> wie Sperrholz, Spanplatte und MDF: Sie verziehen sich viel weniger.</div>
        <div class="ws-reihe"><button class="ws-k gruen" data-a="fpunkt">✔ +1 ${team(S.dran)}</button><button class="ws-k" data-a="fwechsel">↔ anderes Team</button><span class="ws-luecke"></span><button class="ws-k" data-a="lueckezu">Alle verdecken</button></div>`;
}

/* ---------- Arbeitsschritte Metallrohr ---------- */
function schritte(){
    const fertig = S.schritt.length === SCHRITTE.length;
    return `<div class="ws-kopf"><span class="ws-nr">Ein Metallrohr vorbereiten</span><span>Tippe die Schritte in der richtigen Reihenfolge an – ${team(S.dran)} ist dran</span></div>
        <div style="display:flex;flex-direction:column;gap:1.6vmin">${SCHRITT_MISCH.map(k => { const pos = S.schritt.indexOf(k);
            return `<button class="ws-o${pos >= 0 ? " richtig" : ""}" data-a="schritt" data-k="${k}"${pos >= 0 ? " disabled" : ""}><i>${pos >= 0 ? pos + 1 : "?"}</i>${SCHRITTE[k][0]} ${esc(SCHRITTE[k][1])}</button>`; }).join("")}</div>
        <div id="wsSchrittMeld"></div>
        ${fertig ? `<div class="ws-info" style="border-left-color:#2e8b57"><b style="color:#7fe0a6">✅ Richtig – Punkt für ${team(S.dran)}</b>Erst <b>anreißen</b>, dann <b>einspannen und sägen</b>, zum Schluss <b>entgraten</b> – sonst schneidet man sich am scharfen Grat.</div>` : ""}
        <div class="ws-reihe"><button class="ws-k" data-a="schrittneu">↺ Nochmal</button>${fertig ? `<button class="ws-k gelb" data-kap="holz">Weiter: 🌲 Holzarten ▶</button>` : ""}</div>`;
}

/* ---------- Regeln & Führerschein ---------- */
function regeln(){
    return `<div class="ws-kopf"><span class="ws-nr">Bonus: die 10 Werkstattregeln</span><span>Erst raten lassen, dann antippen und aufdecken. Wer die Regel nennt, holt einen Punkt.</span></div>
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

/* ---------- Stundenablaufplan (für die Fachlehrkraft, zum Abhaken) ---------- */
const ABLAUF = [
    ["0–5", "Ankommen", "Zwei Teams bilden (Team A / Team B). Punkte gibt es an der Tafel, Zwischenrufe kosten einen Punkt.", ""],
    ["5–15", "Einstiegs-Quiz", "10 Fragen: Stahl & Legierung, Fe-/NE-Metalle, Magnet, Kupfer, Rost, Weichholz, Quellen, Spanplatte, Holzschutz", "Tafel"],
    ["15–25", "Fe oder NE? · Werkzeug", "12 Gegenstände Eisen-/Nichteisenmetall zuordnen · Werkzeuge: für Holz, Metall oder beides (Metallsäge, Metallfeile, Anreißnadel …)", "Tafel"],
    ["25–30", "Metallrohr", "Arbeitsschritte ordnen: anreißen → einspannen und sägen → entgraten", "Tafel"],
    ["30–45", "Arbeitsblätter Metall", "AB 2 „Eisen- vs. Nichteisenmetalle“ · AB 3 „Der Super-Werkstoff Stahl & Werkzeugkunde“ (Zusatz: Suchrätsel)", "AB"],
    ["45–55", "Holzarten · Baumstamm", "Nadelholz / Laubholz / exotisch zuordnen · Aufbau des Stammes von außen nach innen aufdecken", "Tafel"],
    ["55–60", "Holz arbeitet · Holzwerkstoffe", "quellen, schwinden, verziehen, Faserrichtung · Spanplatte, Sperrholz, MDF", "Tafel"],
    ["60–80", "Arbeitsblätter Holz", "AB 3 Laubholz & Nadelholz · AB 4 Werkstoff Holz & Holzschutz · AB 5 Heimische & exotische Holzarten · AB „Der Werkstoff Holz“", "AB"],
    ["80–85", "Film (optional)", "mit Beobachtungsauftrag für beide Teams", "Tafel"],
    ["85–90", "Abschluss", "Punkte zählen, Siegerteam, Arbeitsplätze aufräumen", ""]
];
const ABLAUF_AB = ["AB 2: Eisen- vs. Nichteisenmetalle (Fe & NE)", "AB 3: Der Super-Werkstoff Stahl & Werkzeugkunde", "Zusatz: Metall-Suchrätsel / Expertenfrage", "AB 3: Laubholz und Nadelholz", "AB 4: Der Werkstoff Holz & Holzschutz", "AB 5: Heimische und exotische Holzarten (mit Quiz)", "AB: Der Werkstoff Holz (2 Seiten)"];
function ablaufplan(){
    const w = window.open("", "_blank");
    if (!w) { alert("Bitte Pop-ups für den Leuchtturm erlauben, dann klappt das Drucken."); return; }
    const heute = new Date().toLocaleDateString("de-DE");
    const box = `<input type="checkbox">`;
    w.document.write(`<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Stundenablauf Technik – Holz & Metall</title><style>
        @page{ size:A4; margin:12mm 13mm; } *{ box-sizing:border-box; }
        body{ margin:0; font-family:"Nunito",Arial,sans-serif; color:#1f2328; font-size:10.5pt; background:#eef0f2; }
        .blatt{ background:#fff; width:210mm; min-height:297mm; margin:12px auto; padding:12mm 13mm; display:flex; flex-direction:column; gap:2.6mm; }
        h1{ margin:0; font-size:17pt; } h1 small{ display:block; font-size:10pt; color:#555; font-weight:700; margin-top:1mm; }
        .kopf{ display:flex; justify-content:space-between; gap:6mm; align-items:flex-start; border-bottom:3px solid #f2b705; padding-bottom:2.5mm; }
        .felder{ display:grid; grid-template-columns:auto 1fr auto 1fr; gap:1.6mm 3mm; font-weight:700; align-items:end; }
        .felder input{ font:inherit; font-weight:400; border:0; border-bottom:1px solid #999; padding:0 1mm; min-width:30mm; background:transparent; }
        h2{ margin:1.5mm 0 0; font-size:11.5pt; background:#1f2328; color:#fff; padding:1.2mm 3mm; border-radius:2mm; }
        table{ width:100%; border-collapse:collapse; }
        td,th{ border:1px solid #c9ced3; padding:1mm 2mm; vertical-align:top; text-align:left; }
        th{ background:#f4f5f6; font-size:9.5pt; }
        td.z{ white-space:nowrap; font-weight:800; width:15mm; } td.c{ width:9mm; text-align:center; } td.m{ width:12mm; font-size:9pt; color:#555; }
        td b{ display:block; }
        input[type=checkbox]{ width:4.2mm; height:4.2mm; margin:0; accent-color:#2e8b57; }
        .abl{ display:grid; grid-template-columns:1fr auto auto; gap:1.3mm 4mm; align-items:center; }
        .abl span.k{ font-size:9pt; color:#555; display:flex; gap:1.5mm; align-items:center; }
        .punkte{ display:flex; gap:8mm; font-weight:800; align-items:center; }
        .punkte input{ width:14mm; font:inherit; text-align:center; border:0; border-bottom:1px solid #999; }
        .notiz{ border:1px solid #c9ced3; border-radius:2mm; min-height:15mm; padding:2mm 3mm; outline:none; background:repeating-linear-gradient(#fff 0 6.4mm,#dde1e5 6.4mm calc(6.4mm + 1px)); line-height:6.5mm; }
        .knopf{ position:fixed; right:16px; bottom:16px; font:800 15px Arial,sans-serif; padding:12px 18px; border:0; border-radius:999px; background:#f2b705; color:#1f2328; cursor:pointer; box-shadow:0 4px 14px rgba(0,0,0,.2); }
        .tipp{ text-align:center; color:#555; font-size:12px; margin-top:10px; }
        @media print{ body{ background:#fff; } .blatt{ margin:0; width:auto; min-height:0; padding:0; } .knopf,.tipp{ display:none; } }
        @media screen and (max-width:820px){ .blatt{ width:auto; min-height:0; margin:8px; padding:14px; } .felder{ grid-template-columns:auto 1fr; } }
    </style></head><body>
    <div class="tipp">Tipp: Kästchen hier anklicken und Felder ausfüllen – dann drucken. Oder leer drucken und mit Stift abhaken.</div>
    <div class="blatt">
        <div class="kopf"><h1>Stundenablauf Technik – Holz & Metall<small>Doppelstunde (90 Minuten) · Klasse 5 · Vertretung</small></h1></div>
        <div class="felder"><span>Datum:</span><input value="${heute}"><span>Klasse:</span><input placeholder="z. B. 5a">
            <span>Vertretung:</span><input value="Melanie Bernshausen"><span>für:</span><input placeholder="Fachlehrkraft"></div>
        <h2>Ablauf der Stunde</h2>
        <table><tr><th>Min.</th><th>Was wir gemacht haben</th><th>Wo</th><th>✔</th></tr>
            ${ABLAUF.map(([z, t, x, m]) => `<tr><td class="z">${z}</td><td><b>${esc(t)}</b>${esc(x)}</td><td class="m">${m}</td><td class="c">${box}</td></tr>`).join("")}
        </table>
        <h2>Arbeitsblätter</h2>
        <div class="abl">${ABLAUF_AB.map(t => `<span>${esc(t)}</span><span class="k">${box} fertig</span><span class="k">${box} angefangen</span>`).join("")}</div>
        <h2>Ergebnis & Hinweise</h2>
        <div class="punkte">Punkte Team A: <input value="${S.a}"> Team B: <input value="${S.b}"></div>
        <div class="notiz" contenteditable="true" spellcheck="false"></div>
    </div>
    <button class="knopf" onclick="window.print()">🖨️ Drucken</button>
    </body></html>`);
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
        case "filmtipp": filmUrl(t.dataset.u); return zeichnen();
        case "faufdecken": S.fStufe++; return zeichnen();
        case "fpunkt": S[S.dran]++; S.fStufe = 2; return zeichnen();
        case "fwechsel": anderes(); return zeichnen();
        case "fweiter": S.f++; S.fStufe = 0; anderes(); return zeichnen();
        case "fzurueck": S.f--; S.fStufe = 0; return zeichnen();
        case "wwahl": { const G = SPIELE[S.kap], i = S.sp[S.kap] || 0; S.wWahl = k; if (k === G.liste[i][2]) S[S.dran]++; return zeichnen(); }
        case "wweiter": if (S.wWahl !== null) anderes(); S.sp[S.kap] = (S.sp[S.kap] || 0) + 1; S.wWahl = null; return zeichnen();
        case "wzurueck": S.sp[S.kap] = Math.max(0, (S.sp[S.kap] || 0) - 1); S.wWahl = null; return zeichnen();
        case "stammauf": S.stamm++; anderes(); return zeichnen();
        case "stammpunkt": S[S.dran]++; S.stamm++; anderes(); return zeichnen();
        case "stammneu": S.stamm = 0; return zeichnen();
        case "luecke": S.luecke = Math.max(S.luecke, k + 1); return zeichnen();
        case "lueckezu": S.luecke = 0; return zeichnen();
        case "schritt": { const soll = S.schritt.length; if (k === soll){ S.schritt.push(k); if (S.schritt.length === SCHRITTE.length) S[S.dran]++; return zeichnen(); }
            const m = el.querySelector("#wsSchrittMeld"); if (m) m.innerHTML = `<div class="ws-info" style="border-left-color:#c0392b"><b style="color:#ff9b8f">❌ Noch nicht – was kommt davor?</b>Das andere Team ist dran.</div>`; anderes(); S.schritt = []; setTimeout(zeichnen, 1600); return; }
        case "schrittneu": S.schritt = []; return zeichnen();
        case "regel": S.regeln = Math.max(S.regeln, k + 1); return zeichnen();
        case "ralle": S.regeln = REGELN.length; return zeichnen();
        case "rzu": S.regeln = 0; return zeichnen();
        case "druck": return drucken();
        case "ablauf": return ablaufplan();
        case "sieger": return siegerZeigen();
        case "reset": if (!confirm("Punkte und Fortschritt für eine neue Klasse zurücksetzen?")) return;
            Object.assign(S, { a: 0, b: 0, dran: "a", q: 0, qWahl: null, f: 0, fStufe: 0, sp: {}, wWahl: null, regeln: 0, stamm: 0, luecke: 0, schritt: [], kap: "quiz" }); return zeichnen();
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
