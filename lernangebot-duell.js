/* ============================================================
   Leuchtturm – Lernangebot: Quiz-Duell „Klasse gegen Eule Ella“
   Tafel-Übung zur Auswahl (nicht in jeder Stunde): Thema und
   Klassenstufe wählen, Fragen mit Antworten zum Antippen, Zeitbalken,
   Ellas Energie-Balken (Boss), Serien-Bonus. Oder: Team gegen Team.
   Fragen: richtige Antwort steht in den Daten immer ZUERST –
   auf der Tafel wird gemischt. Mathe-Aufgaben werden neu erzeugt.
   ============================================================ */
"use strict";
(function () {
const T = window.lernTafel;
if (!T || !T.werkzeuge) return;
const W = T.werkzeuge;
const z = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const mischen = liste => { const a = liste.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fett = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");

/* ---------------- Fragen ---------------- */
// [Frage, [richtig, falsch, falsch], Bild (optional)]
const FRAGEN = {
  deutsch: {
    "12": [
      ["Mit welchem Buchstaben beginnt **Fisch**?", ["F", "W", "V"], "🐟"],
      ["Mit welchem Buchstaben beginnt **Vogel**?", ["V", "F", "W"], "🐦"],
      ["Mit welchem Buchstaben beginnt **Ente**?", ["E", "Ä", "A"], "🦆"],
      ["Mit welchem Laut beginnt **Schaf**?", ["Sch", "S", "Ch"], "🐑"],
      ["Was reimt sich auf **Maus**?", ["Haus", "Mais", "Mus"]],
      ["Was reimt sich auf **Hose**?", ["Rose", "Hase", "Rasen"]],
      ["Was reimt sich auf **Bein**?", ["Stein", "Bahn", "Beet"]],
      ["Wie viele Silben hat **Banane**?", ["3", "2", "4"], "🍌"],
      ["Wie viele Silben hat **Hund**?", ["1", "2", "3"], "🐶"],
      ["Wie viele Silben hat **Elefant**?", ["3", "2", "4"], "🐘"],
      ["Wie viele Silben hat **Schmetterling**?", ["3", "2", "4"], "🦋"],
      ["Welcher Begleiter passt? ___ Ball", ["der", "die", "das"], "⚽"],
      ["Welcher Begleiter passt? ___ Gabel", ["die", "der", "das"], "🍴"],
      ["Welcher Begleiter passt? ___ Messer", ["das", "der", "die"], "🔪"],
      ["Welches Wort schreibt man **groß**?", ["tisch", "laufen", "rot"]],
      ["Welches Wort schreibt man **groß**?", ["freude", "fröhlich", "freuen"]],
      ["Welches Wort schreibt man **klein**?", ["springen", "sprung", "springbrunnen"]],
      ["Was kommt nach **K**?", ["L", "J", "M"]],
      ["Was kommt vor **R**?", ["Q", "S", "P"]],
      ["Mit welchem Laut **endet** Bus?", ["s", "u", "b"], "🚌"],
      ["Welches Wort hat ein **ei**?", ["Seil", "Segel", "Sieb"]],
      ["Welches Wort hat ein **au**?", ["Baum", "Bein", "Boot"]],
      ["Was ist das Gegenteil von **schwer**?", ["leicht", "dünn", "klein"]],
      ["Was ist das Gegenteil von **früh**?", ["spät", "abends", "langsam"]],
      ["Welcher Buchstabe fehlt? H _ n d", ["u", "a", "o"], "🐶"],
      ["Welcher Buchstabe fehlt? T _ sch", ["i", "e", "a"], "🪑"],
      ["Ein Ball – zwei …", ["Bälle", "Balle", "Bällen"]],
      ["Ein Baum – zwei …", ["Bäume", "Baume", "Bäumen"]],
      ["Welches Wort beginnt wie **Maus**?", ["Mond", "Nase", "Haus"], "🐭"],
      ["Welches Wort ist ein **Tu-Wort**?", ["rennen", "renner", "rennbahn"]],
      ["Welcher Satz ist richtig geschrieben?", ["Der Hund bellt.", "der Hund bellt.", "Der hund bellt."]],
      ["Welches Wort ist richtig geschrieben?", ["Blume", "Bume", "Blumme"], "🌷"]
    ],
    "34": [
      ["Welche Wortart ist **freundschaft**?", ["Nomen", "Verb", "Adjektiv"]],
      ["Welche Wortart ist **schnell**?", ["Adjektiv", "Nomen", "Verb"]],
      ["Welche Wortart ist **schwimmen**?", ["Verb", "Nomen", "Adjektiv"]],
      ["Welche Wortart ist **angst**?", ["Nomen", "Adjektiv", "Verb"]],
      ["Mehrzahl von **Maus**?", ["Mäuse", "Mause", "Mäuser"]],
      ["Mehrzahl von **Rad**?", ["Räder", "Rade", "Räde"]],
      ["Vergangenheit: ich gehe → …", ["ich ging", "ich gehte", "ich gang"]],
      ["Vergangenheit: wir singen → …", ["wir sangen", "wir singten", "wir sungen"]],
      ["Vergangenheit: er bringt → …", ["er brachte", "er bringte", "er brang"]],
      ["Welches Wort ist richtig geschrieben?", ["Fahrrad", "Farrad", "Fahrad"]],
      ["Welches Wort ist richtig geschrieben?", ["Straße", "Strasse", "Strahse"]],
      ["Welches Wort ist richtig geschrieben?", ["Wald", "Walt", "Wahld"]],
      ["Welches Wort ist richtig geschrieben?", ["Bäume", "Beume", "Bäumme"]],
      ["Wie trennt man **Wecker**?", ["We-cker", "Wec-ker", "Weck-er"]],
      ["Wie viele Silben hat **Taschenlampe**?", ["4", "3", "5"]],
      ["Gegenteil von **mutig**?", ["ängstlich", "frech", "vorsichtig"]],
      ["Welches Wort ist ein zusammengesetztes Nomen?", ["Haustür", "Häuser", "Häuschen"]],
      ["Welches Wort steht im ABC zuerst?", ["Ameise", "Apfel", "Ampel"]],
      ["Welches Wort steht im ABC zuerst?", ["Schal", "Schere", "Schaukel"]],
      ["Welches Zeichen fehlt? „Kommst du mit _“", ["?", ".", "!"]],
      ["Welches Zeichen fehlt? „Hol bitte die Schere _“", ["!", "?", "."]],
      ["Welches Wort ist ein Adjektiv?", ["freundlich", "freund", "befreunden"]],
      ["gut – besser – …", ["am besten", "am gutesten", "am bessersten"]],
      ["viel – mehr – …", ["am meisten", "am mehrsten", "am vielsten"]],
      ["ie oder i? L _ d (das Lied)", ["Lied", "Lid", "Lihd"]],
      ["d oder t? Hem _ (verlängere!)", ["d", "t"]],
      ["e oder ä? K _ lte (von kalt)", ["ä", "e"]],
      ["Welches Wort gehört zur Wortfamilie **fahren**?", ["Fahrer", "Farbe", "Fähre"]],
      ["Welches Wort ist ein Verb?", ["lesen", "leser", "lesbar"]],
      ["Wer tut etwas? „Der Hund bellt laut.“", ["Der Hund", "bellt", "laut"]],
      ["Welcher Begleiter? ___ Mädchen", ["das", "die", "der"]],
      ["Welcher Begleiter? ___ Butter", ["die", "der", "das"]],
      ["Ein anderes Wort für **sagen**?", ["erzählen", "hören", "schweigen"]],
      ["Welcher Satz ist richtig geschrieben?", ["Wir gehen in den Park.", "Wir gehen in den park.", "Wir Gehen in den Park."]]
    ]
  },
  sach: {
    "12": [
      ["Welches Tier legt Eier?", ["🦆 Ente", "🐰 Hase", "🦇 Fledermaus"]],
      ["Wie viele Beine hat eine Spinne?", ["8", "6", "10"], "🕷️"],
      ["Wie viele Beine hat ein Käfer?", ["6", "8", "4"], "🐞"],
      ["Welche Jahreszeit kommt nach dem Winter?", ["Frühling", "Sommer", "Herbst"]],
      ["Wann fallen die Blätter von den Bäumen?", ["im Herbst", "im Winter", "im Sommer"], "🍂"],
      ["Was brauchen Pflanzen zum Wachsen?", ["Wasser und Licht", "nur Wasser", "nur Erde"], "🌱"],
      ["Bei welcher Ampelfarbe darfst du gehen?", ["🟢 Grün", "🟡 Gelb", "🔴 Rot"], "🚦"],
      ["Wo wohnt der Fuchs?", ["im Bau", "im Nest", "im Kobel"], "🦊"],
      ["Wie heißt das Nest vom Eichhörnchen?", ["Kobel", "Bau", "Horst"], "🐿️"],
      ["Womit schmeckst du?", ["👅 Zunge", "👃 Nase", "👄 Lippen"]],
      ["Wie viele Tage hat eine Woche?", ["7", "5", "6"]],
      ["Welcher Tag kommt nach Mittwoch?", ["Donnerstag", "Dienstag", "Freitag"]],
      ["Was hat am wenigsten Zucker?", ["💧 Wasser", "🧃 Apfelsaft", "🥛 Kakao"]],
      ["Woraus wird Butter gemacht?", ["aus Milch", "aus Öl", "aus Mehl"], "🧈"],
      ["Welches Tier hält Winterschlaf?", ["🦔 Igel", "🦊 Fuchs", "🦌 Reh"]],
      ["Wie heißt das Kind vom Pferd?", ["Fohlen", "Kalb", "Lamm"], "🐴"],
      ["Wie heißt das Kind von der Ziege?", ["Zicklein", "Lamm", "Kitz"], "🐐"],
      ["Wie viele Monate hat ein Jahr?", ["12", "10", "11"]],
      ["Welche Nummer rufst du, wenn es brennt?", ["112", "110", "115"], "🚒"],
      ["Woraus wird ein Schmetterling?", ["aus einer Raupe", "aus einer Larve im Wasser", "aus einer Kaulquappe"], "🦋"],
      ["Was sammeln Bienen in den Blüten?", ["Nektar", "Wasser", "Samen"], "🐝"],
      ["Was ist ein Gemüse?", ["🥕 Möhre", "🍓 Erdbeere", "🍒 Kirsche"]],
      ["Welcher Vogel fliegt im Herbst in den Süden?", ["Storch", "Spatz", "Amsel"], "🕊️"]
    ],
    "34": [
      ["Welcher Planet ist der Sonne am nächsten?", ["Merkur", "Venus", "Mars"], "☀️"],
      ["Wie viele Planeten hat unser Sonnensystem?", ["8", "9", "7"], "🪐"],
      ["Bei wie viel Grad gefriert Wasser?", ["0 °C", "4 °C", "-10 °C"], "🧊"],
      ["Bei wie viel Grad kocht Wasser?", ["100 °C", "80 °C", "120 °C"]],
      ["Wie heißt die Hauptstadt von Sachsen-Anhalt?", ["Magdeburg", "Halle", "Dessau"]],
      ["In welchem Bundesland liegt Weißenfels?", ["Sachsen-Anhalt", "Sachsen", "Thüringen"]],
      ["Welcher Fluss fließt durch Weißenfels?", ["Saale", "Elbe", "Unstrut"]],
      ["Welches Organ pumpt das Blut?", ["Herz", "Lunge", "Leber"], "❤️"],
      ["Wo wird die Luft beim Atmen hingeleitet?", ["in die Lunge", "in den Magen", "ins Herz"]],
      ["Was geben Pflanzen an die Luft ab?", ["Sauerstoff", "Kohlendioxid", "Stickstoff"], "🌳"],
      ["Wo geht die Sonne auf?", ["im Osten", "im Westen", "im Süden"], "🌅"],
      ["Wasserdampf ist …", ["gasförmig", "flüssig", "fest"]],
      ["Welches Tier ist ein Säugetier?", ["Wal", "Hai", "Pinguin"], "🐋"],
      ["Welches Tier ist ein Insekt?", ["Ameise", "Spinne", "Assel"]],
      ["Wohin gehört der Joghurtbecher?", ["gelbe Tonne", "Restmüll", "Papiertonne"], "♻️"],
      ["Wohin gehören Kartoffelschalen?", ["Biotonne", "gelbe Tonne", "Restmüll"]],
      ["Wie lange braucht die Erde einmal um die Sonne?", ["1 Jahr", "1 Monat", "1 Tag"]],
      ["Was zeigt ein Kompass?", ["die Himmelsrichtung", "die Uhrzeit", "die Höhe"], "🧭"],
      ["Welcher Stoff leitet Strom?", ["Kupfer", "Glas", "Gummi"], "⚡"],
      ["Was muss an jedem Fahrrad sein?", ["zwei Bremsen, Licht, Klingel", "nur Licht und Klingel", "ein Tacho"], "🚲"],
      ["Wie heißt der größte Ozean?", ["Pazifik", "Atlantik", "Indischer Ozean"], "🌊"],
      ["Wie viele Kontinente gibt es?", ["7", "5", "6"]],
      ["Wie heißt das höchste Gebirge in Sachsen-Anhalt?", ["Harz", "Erzgebirge", "Thüringer Wald"]],
      ["Wie viele Knochen hat ein Erwachsener ungefähr?", ["über 200", "etwa 100", "etwa 50"], "🦴"]
    ]
  },
  spass: {
    "12": [
      ["Was ist gelb und krumm?", ["🍌 Banane", "🍋 Zitrone", "🌽 Mais"]],
      ["Welches Tier macht „Mäh“?", ["🐑 Schaf", "🐐 Ziege", "🐮 Kuh"]],
      ["Was hat Zähne, kann aber nicht beißen?", ["ein Kamm", "ein Messer", "eine Schere"]],
      ["Welches Tier ist am größten?", ["🦒 Giraffe", "🐘 Elefant", "🦛 Nilpferd"]],
      ["Wie viele Finger hast du an zwei Händen?", ["10", "8", "12"], "🙌"],
      ["Blau und Gelb gemischt ergibt …", ["Grün", "Lila", "Orange"], "🎨"],
      ["Rot und Blau gemischt ergibt …", ["Lila", "Grün", "Orange"], "🎨"],
      ["Welches Tier kann fliegen, ist aber kein Vogel?", ["🦇 Fledermaus", "🐧 Pinguin", "🦉 Eule"]],
      ["Was sagt der Hahn?", ["Kikeriki", "Gack gack", "Kuckuck"], "🐓"],
      ["Wo ist der Pinguin zu Hause?", ["am Südpol", "am Nordpol", "im Wald"], "🐧"],
      ["Welches Instrument hat Saiten?", ["🎸 Gitarre", "🥁 Trommel", "🎺 Trompete"]],
      ["Wie viele Räder hat ein Dreirad?", ["3", "2", "4"], "🚲"],
      ["Was hat einen Hals, aber keinen Kopf?", ["eine Flasche", "eine Giraffe", "ein Schwan"]],
      ["Welches Tier ist am schnellsten?", ["🐆 Gepard", "🐎 Pferd", "🐕 Hund"]],
      ["Welches Tier schläft am Tag und jagt in der Nacht?", ["🦉 Eule", "🐿️ Eichhörnchen", "🦆 Ente"]]
    ],
    "34": [
      ["Was wird nasser, je mehr es trocknet?", ["ein Handtuch", "ein Schwamm", "ein Regenschirm"]],
      ["Was hat ein Kopfende und ein Fußende, aber keine Beine?", ["ein Bett", "ein Tisch", "ein Stuhl"]],
      ["Welches Tier kann im Stehen schlafen?", ["Pferd", "Katze", "Hund"], "🐴"],
      ["Was ist schwerer: 1 kg Federn oder 1 kg Steine?", ["gleich schwer", "die Steine", "die Federn"]],
      ["Wie viele Monate haben 28 Tage?", ["alle 12", "nur einer", "sechs"]],
      ["Wie viele Arme hat ein Krake?", ["8", "6", "10"], "🐙"],
      ["Welches ist das größte Tier der Welt?", ["Blauwal", "Elefant", "Pottwal"]],
      ["Welcher Name ist vorwärts und rückwärts gleich?", ["Otto", "Olli", "Emma"]],
      ["Welche Zahl liegt beim Würfel gegenüber der 1?", ["6", "2", "5"], "🎲"],
      ["Welches Tier kann seine Farbe wechseln?", ["Chamäleon", "Leguan", "Gecko"], "🦎"],
      ["Wo leben Kängurus?", ["in Australien", "in Afrika", "in Südamerika"], "🦘"],
      ["Was kann man fangen, aber nicht werfen?", ["einen Schnupfen", "einen Ball", "ein Frisbee"]],
      ["Wie viele Spieler einer Fußballmannschaft stehen auf dem Feld?", ["11", "10", "12"], "⚽"],
      ["Welches Land sieht auf der Karte aus wie ein Stiefel?", ["Italien", "Spanien", "Griechenland"]],
      ["Ich habe Städte, aber keine Häuser, Wälder, aber keine Bäume. Was bin ich?", ["eine Landkarte", "ein Bild", "ein Buch"], "🗺️"],
      ["Welcher Buchstabe steht in der Mitte von PARIS?", ["R", "A", "I"]],
      ["Was gehört dir, aber andere benutzen es öfter als du?", ["dein Name", "dein Fahrrad", "deine Jacke"]],
      ["Je mehr du davon wegnimmst, desto größer wird es. Was ist es?", ["ein Loch", "ein Berg", "ein Schatten"]]
    ]
  },
  matheFest: {
    "12": [
      ["Wie viele Ecken hat ein Viereck?", ["4", "3", "5"], "🟥"],
      ["Welche Form hat ein Teller von oben?", ["Kreis", "Rechteck", "Dreieck"], "🍽️"],
      ["Welche Zahl ist am größten?", ["21", "12", "19"]],
      ["Welche Zahl ist am kleinsten?", ["15", "51", "50"]],
      ["Wie viele Ecken hat ein Dreieck?", ["3", "4", "2"], "🔺"]
    ],
    "34": [
      ["Wie viele Minuten hat eine Stunde?", ["60", "100", "50"], "⏰"],
      ["1 Meter sind …", ["100 cm", "10 cm", "1000 cm"], "📏"],
      ["1 Kilogramm sind …", ["1000 g", "100 g", "10 000 g"], "⚖️"],
      ["Wie viele Flächen hat ein Würfel?", ["6", "8", "4"], "🎲"],
      ["Eine Dreiviertelstunde sind …", ["45 Minuten", "30 Minuten", "75 Minuten"]],
      ["Wie viele Cent sind 2,50 €?", ["250", "25", "2500"], "💶"]
    ]
  }
};
const THEMEN = { gemischt: "🎲 Gemischt", mathe: "🔢 Mathe", deutsch: "📖 Deutsch", sach: "🌍 Sachunterricht", spass: "🤪 Rätsel & Spaß" };

/* Mathe: Aufgaben neu erzeugen (falsche Antworten nah dran) */
function matheAufgabe(st){
    let f, r;
    const art = z(0, st === "34" ? 5 : 4);
    if (st === "34") {
        if (art === 0) { const a = z(3, 9), b = z(3, 9); f = `${a} · ${b} = ?`; r = a * b; }
        else if (art === 1) { const a = z(21, 79), b = z(11, 99 - a); f = `${a} + ${b} = ?`; r = a + b; }
        else if (art === 2) { const a = z(41, 99), b = z(11, a - 5); f = `${a} − ${b} = ?`; r = a - b; }
        else if (art === 3) { const b = z(3, 9), r0 = z(3, 9); f = `${b * r0} : ${b} = ?`; r = r0; }
        else if (art === 4) { const a = z(12, 40), b = z(5, 20), c = z(2, 9); f = `${a} − ${b} + ${c} = ?`; r = a - b + c; }
        else { const a = z(2, 9) * 100, b = z(1, 9) * 10; f = `${a} + ${b} = ?`; r = a + b; }
    } else {
        if (art === 0) { const a = z(1, 9), b = z(1, 10 - a); f = `${a} + ${b} = ?`; r = a + b; }
        else if (art === 1) { const a = z(3, 10), b = z(1, a); f = `${a} − ${b} = ?`; r = a - b; }
        else if (art === 2) { const a = z(1, 9); f = `${a} + ? = 10`; r = 10 - a; }
        else if (art === 3) { const a = z(2, 10); f = `Das Doppelte von ${a} = ?`; r = 2 * a; }
        else { const a = z(11, 15), b = z(1, 4); f = `${a} + ${b} = ?`; r = a + b; }
    }
    const falsch = new Set();
    [r + 1, r - 1, r + 2, r - 2, r + 10, r - 10].filter(x => x >= 0 && x !== r).sort(() => Math.random() - .5).forEach(x => { if (falsch.size < 2) falsch.add(x); });
    return [f, [String(r), ...[...falsch].map(String)]];
}
function fragenListe(thema, st, n){
    const nimm = (k) => mischen((FRAGEN[k] && FRAGEN[k][st]) || []);
    let liste;
    if (thema === "mathe") liste = Array.from({ length: n }, (_, i) => i % 4 === 3 && FRAGEN.matheFest[st][i % FRAGEN.matheFest[st].length] ? mischen(FRAGEN.matheFest[st])[0] : matheAufgabe(st));
    else if (thema === "gemischt") {
        const toepfe = [nimm("deutsch"), nimm("sach"), nimm("spass")];
        liste = Array.from({ length: n }, (_, i) => i % 4 === 0 ? matheAufgabe(st) : toepfe[i % 3].pop() || matheAufgabe(st));
    } else liste = nimm(thema).slice(0, n);
    return liste.map(([f0, ant0, b]) => {
        const { f, a: ant } = window.ltNeutral ? window.ltNeutral(f0, ant0) : { f: f0, a: ant0 };
        const zahl = ant.every(a => /^\d+$/.test(a));
        const ant2 = zahl ? ant.slice().sort((x, y) => x - y) : mischen(ant);
        return { f, b: b || "", a: ant2, r: ant2.indexOf(ant[0]) };
    });
}

/* ---------------- Werkzeug ---------------- */
const ELLA = `<svg viewBox="0 0 140 160"><path d="M30 40 L22 8 L52 30 Z M110 40 L118 8 L88 30 Z" fill="#7b5236"/><ellipse cx="70" cy="92" rx="52" ry="60" fill="#9c6b45"/><ellipse cx="70" cy="108" rx="34" ry="40" fill="#e9d3b4"/><circle cx="50" cy="62" r="22" fill="#fffdf5" stroke="#ffe066" stroke-width="5"/><circle cx="90" cy="62" r="22" fill="#fffdf5" stroke="#ffe066" stroke-width="5"/><circle class="dl-pupille" cx="53" cy="64" r="10" fill="#1d2b22"/><circle class="dl-pupille" cx="87" cy="64" r="10" fill="#1d2b22"/><path d="M63 76 L77 76 L70 90 Z" fill="#f4a03a"/></svg>`;
W.duell = {
    titel: "Quiz-Duell", emoji: "🏆", gruppe: "Duell", klasse: "lt-duell",
    text: "Klasse gegen Eule Ella (oder Team gegen Team): Thema wählen, Antworten an der Tafel antippen, Ellas Energie runterspielen!",
    optionen: [
        { k: "thema", label: "Thema", werte: Object.entries(THEMEN) },
        { k: "stufe", label: "Klasse", werte: [["12", "1/2"], ["34", "3/4"]] },
        { k: "modus", label: "Spiel", werte: [["ella", "Klasse gegen Ella"], ["teams", "Team gegen Team"]] },
        { k: "anzahl", label: "Fragen", werte: [[8, "8"], [10, "10"], [15, "15"], [20, "20"]] },
        { k: "zeit", label: "Zeit", werte: [[20, "20 s"], [30, "30 s"], [45, "45 s"], [0, "ohne"]] },
        { k: "vorlesen", label: "Vorlesen", werte: [[false, "aus"], [true, "an"]] }
    ],
    std: { thema: "gemischt", stufe: "12", modus: "ella", anzahl: 10, zeit: 30, vorlesen: false },
    gemerkt(){ try { return JSON.parse(localStorage.getItem("lt-duell-wahl") || "{}"); } catch (x) { return {}; } },
    eigen(el, e, api){
        const st = e.stufe === "34" ? "34" : "12", teams = e.modus === "teams", n = +e.anzahl || 10, zeit = +e.zeit || 0;
        try { localStorage.setItem("lt-duell-wahl", JSON.stringify({ thema: e.thema, stufe: st, modus: e.modus, anzahl: n, zeit, vorlesen: !!e.vorlesen })); } catch (x) {}
        const fragen = fragenListe(e.thema, st, n);
        const schaden = 100 / Math.max(1, Math.ceil(fragen.length * .6));   // 60 % richtig = Ella besiegt
        let i = -1, P = { a: 0, b: 0 }, energie = 100, serie = 0, beste = 0, beantwortet = false, rest = zeit, team = 0;
        const TEAM = [["🦊", "Team Fuchs"], ["🐻", "Team Bär"]];
        el.innerHTML = `<div class="dl">
            <div class="dl-kopf">${teams
                ? `<div class="dl-seite a"><span class="dl-av">🦊</span><div><small>Team Fuchs</small><b class="dl-pa">0</b></div></div><div class="dl-vs">VS</div><div class="dl-seite b"><div><small>Team Bär</small><b class="dl-pb">0</b></div><span class="dl-av">🐻</span></div>`
                : `<div class="dl-seite a"><span class="dl-av">🧒</span><div><small>Klasse</small><b class="dl-pa">0</b></div></div>
                   <div class="dl-boss"><div class="dl-boss-kopf"><span class="dl-ella">${ELLA}</span><b>Eule Ella</b><span class="dl-serie" hidden></span></div><div class="dl-balken"><i style="width:100%"></i><span>100 / 100 Energie</span></div><small class="dl-regel">Jede richtige Antwort trifft Ella · ${Math.ceil(fragen.length * .6)} Treffer besiegen sie</small></div>
                   <div class="dl-seite b"><div><small>Ella</small><b class="dl-pb">0</b></div><span class="dl-av">🦉</span></div>`}</div>
            <div class="dl-karte"><div class="dl-kk"><span class="dl-nr"></span><span class="dl-thema">${esc(THEMEN[e.thema] || "")} · Kl. ${st === "34" ? "3/4" : "1/2"}</span><span class="dl-sek"></span></div>
                <div class="dl-bild"></div><div class="dl-frage"></div><div class="dl-zeit"><i></i></div></div>
            <div class="dl-antworten"></div>
            <div class="dl-meldung"></div>
        </div>`;
        const $ = s => el.querySelector(s);
        const sprechen = t => { try { if (!window.speechSynthesis) return; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t.replace(/\*\*/g, "").replace(/_+/g, "Lücke")); u.lang = "de-DE"; u.rate = .9; speechSynthesis.speak(u); } catch (x) {} };
        api.aufraeumen(() => { try { speechSynthesis.cancel(); } catch (x) {} });
        const kopfZeigen = () => {
            $(".dl-pa").textContent = P.a; $(".dl-pb").textContent = P.b;
            if (!teams) { const b = $(".dl-balken i"); b.style.width = Math.max(0, energie) + "%"; b.classList.toggle("tief", energie <= 30); $(".dl-balken span").textContent = Math.max(0, Math.round(energie)) + " / 100 Energie";
                const s = $(".dl-serie"); s.hidden = serie < 2; s.textContent = "🔥 " + serie + "er-Serie" + (serie >= 3 ? " · Doppel-Treffer!" : ""); }
            else el.querySelectorAll(".dl-seite").forEach((x, k) => x.classList.toggle("dran", k === team && !beantwortet));
        };
        const konfetti = () => { const box = $(".dl"); for (let k = 0; k < 40; k++) { const c = document.createElement("i"); c.className = "dl-konf"; c.style.left = Math.random() * 100 + "%"; c.style.background = ["#ffd93d", "#6bcB77", "#4d96ff", "#ff6b6b", "#c77dff"][k % 5]; c.style.animationDelay = Math.random() * .4 + "s"; box.appendChild(c); setTimeout(() => c.remove(), 2200); } };
        const fanfare = () => [523, 659, 784, 1047].forEach((f, k) => setTimeout(() => api.klang(f, .2, "triangle"), k * 110));
        const ellaLacht = () => { api.klang(392, .25); setTimeout(() => api.klang(330, .3), 250); const e2 = $(".dl-ella"); if (e2) { e2.classList.remove("lacht"); void e2.offsetWidth; e2.classList.add("lacht"); } };
        const treffer = () => { const e2 = $(".dl-ella"); if (e2) { e2.classList.remove("getroffen"); void e2.offsetWidth; e2.classList.add("getroffen"); } };
        function antworten(k){
            if (beantwortet || i < 0 || i >= fragen.length) return;
            beantwortet = true; const q = fragen[i], ok = k === q.r;
            el.querySelectorAll(".dl-a").forEach((b, j) => { b.disabled = true; b.classList.toggle("richtig", j === q.r); b.classList.toggle("falsch", j === k && !ok); b.classList.toggle("weg", j !== q.r && j !== k); });
            const m = $(".dl-meldung"), richtigText = q.a[q.r];
            if (k === -2) { m.className = "dl-meldung"; m.innerHTML = `⏭ Übersprungen – kein Punkt.<small>Richtig ist: ${fett(richtigText)}</small>`; }
            else if (teams) {
                if (ok) { (team ? P.b++ : P.a++); fanfare(); konfetti(); m.className = "dl-meldung gut"; m.innerHTML = `🎉 Richtig! Punkt für ${TEAM[team][0]} ${TEAM[team][1]}!`; }
                else { m.className = "dl-meldung schlecht"; m.innerHTML = k < 0 ? `⏰ Zeit vorbei!<small>Richtig ist: ${fett(richtigText)}</small>` : `❌ Leider daneben.<small>Richtig ist: ${fett(richtigText)}</small>`; api.klang(220, .3); }
            } else if (ok) {
                serie++; beste = Math.max(beste, serie); P.a++;
                energie -= schaden * (serie >= 3 ? 2 : 1); treffer(); fanfare(); konfetti();
                m.className = "dl-meldung gut"; m.innerHTML = serie >= 3 ? `🔥 Doppel-Treffer! ${serie} richtig hintereinander!` : "🎉 Richtig! Treffer gegen Ella!";
            } else {
                serie = 0; P.b++; energie = Math.min(100, energie + schaden / 2); ellaLacht();
                m.className = "dl-meldung schlecht"; m.innerHTML = `🦉 ${k < 0 ? "Zeit vorbei! " : ""}Hu-hu! Punkt für Ella.<small>Richtig ist: ${fett(richtigText)}</small>`;
            }
            kopfZeigen();
            if (!teams && energie <= 0) { setTimeout(ende, 1400); api.weiterText("🏆 Zum Ergebnis"); return; }
            api.weiterText(i + 1 >= fragen.length ? "🏆 Zum Ergebnis" : "Nächste Frage ▶");
        }
        function zeigen(){
            const q = fragen[i]; beantwortet = false; rest = zeit;
            if (teams) team = i % 2;
            $(".dl-nr").textContent = `Frage ${i + 1} / ${fragen.length}${teams ? " · " + TEAM[team][0] + " " + TEAM[team][1] + " ist dran" : ""}`;
            $(".dl-bild").textContent = q.b; $(".dl-bild").hidden = !q.b;
            $(".dl-frage").innerHTML = fett(q.f);
            $(".dl-frage").style.fontSize = q.f.length > 60 ? "clamp(22px,min(3vw,5vh),46px)" : "";
            $(".dl-meldung").className = "dl-meldung"; $(".dl-meldung").innerHTML = "";
            const box = $(".dl-antworten"); box.className = "dl-antworten" + (q.a.some(a => a.length > 16) ? " lang" : "");
            box.innerHTML = q.a.map((a, k) => `<button class="dl-a" data-k="${k}"><span class="dl-buchst">${"ABCD"[k]}</span><span>${fett(a)}</span></button>`).join("");
            const alt = $(".dl-kk .dl-vorlesen"); if (alt) alt.remove();
            if (e.vorlesen || st === "12") $(".dl-sek").insertAdjacentHTML("beforebegin", `<button class="dl-vorlesen" title="Frage und Antworten vorlesen">🔊</button>`);
            box.querySelectorAll(".dl-a").forEach(b => b.addEventListener("click", () => antworten(+b.dataset.k)));
            const vl = $(".dl-kk .dl-vorlesen"); if (vl) vl.addEventListener("click", () => sprechen(q.f + ". " + q.a.map((a, k) => "ABCD"[k] + ": " + a).join(". ")));
            $(".dl-zeit").hidden = !zeit; $(".dl-sek").textContent = zeit ? zeit + " s" : "";
            $(".dl-zeit i").style.transition = "none"; $(".dl-zeit i").style.width = "100%";
            kopfZeigen(); api.weiterText("⏭ Überspringen");
            if (e.vorlesen) sprechen(q.f + ". " + q.a.map((a, k) => "ABCD"[k] + ": " + a).join(". "));
            const karte = $(".dl-karte"); karte.classList.remove("neu"); void karte.offsetWidth; karte.classList.add("neu");
        }
        function ende(){
            i = fragen.length; beantwortet = true;
            const sieg = teams ? (P.a === P.b ? "Unentschieden – beide Teams waren super! 🤝" : (P.a > P.b ? "🦊 Team Fuchs gewinnt!" : "🐻 Team Bär gewinnt!")) : (energie <= 0 ? "Ihr habt Eule Ella besiegt! 🏆" : P.a > P.b ? "Knapp! Ella hat noch " + Math.round(energie) + " % Energie – aber ihr habt mehr Punkte! 💪" : "Diesmal gewinnt Ella – nächstes Mal schafft ihr sie!");
            const gut = teams || energie <= 0 || P.a > P.b;
            el.querySelector(".dl-karte").outerHTML = `<div class="dl-karte dl-ende"><div class="dl-pokal">${gut ? "🏆" : "🦉"}</div><div class="dl-frage">${sieg}</div>
                <div class="dl-endstand"><div><small>${teams ? "🦊 Team Fuchs" : "🧒 Klasse"}</small><b>${P.a}</b></div><span>:</span><div><small>${teams ? "🐻 Team Bär" : "🦉 Ella"}</small><b>${P.b}</b></div></div>
                ${!teams && beste >= 3 ? `<div class="dl-klein">🔥 Längste Serie: ${beste} richtig hintereinander</div>` : ""}</div>`;
            el.querySelector(".dl-antworten").innerHTML = ""; el.querySelector(".dl-meldung").innerHTML = "";
            if (gut) { fanfare(); konfetti(); setTimeout(konfetti, 600); } else ellaLacht();
            api.weiterText("🔄 Neues Duell");
        }
        // Start-Bildschirm
        $(".dl-karte").innerHTML = `<div class="dl-start"><div class="dl-start-ella">${teams ? "🦊 ⚔️ 🐻" : `<span class="dl-ella gross">${ELLA}</span>`}</div>
            <div class="dl-frage">${teams ? "Team gegen Team!" : "Klasse gegen Eule Ella!"}</div>
            <div class="dl-regeln">${teams
                ? "<div>🦊 und 🐻 sind abwechselnd dran.</div><div>✋ Das Team überlegt kurz – ein Kind tippt die Antwort an.</div><div>✅ Richtig = 1 Punkt für das Team.</div>"
                : `<div>✋ Überlegt kurz – ein Kind tippt die Antwort an der Tafel an.</div><div>✅ Richtig = Treffer! Ellas Energie sinkt.</div><div>❌ Falsch oder Zeit vorbei = Punkt für Ella.</div><div>🔥 3 richtig hintereinander = Doppel-Treffer!</div>`}</div></div>`;
        el.querySelector(".dl-antworten").innerHTML = ""; api.ohneLoesung(); api.weiterText("▶ Los geht's!");
        api.intervall(() => {
            if (!zeit || i < 0 || i >= fragen.length || beantwortet) return;
            rest = Math.max(0, rest - .1);
            const bar = el.querySelector(".dl-zeit i"); if (bar) { bar.style.transition = "width .1s linear"; bar.style.width = (rest / zeit * 100) + "%"; bar.classList.toggle("knapp", rest <= 5); }
            const s = el.querySelector(".dl-sek"); if (s) s.textContent = Math.ceil(rest) + " s";
            if (rest <= 3 && rest > 2.9 || rest <= 2 && rest > 1.9 || rest <= 1 && rest > .9) api.klang(880, .06);
            if (rest <= 0) antworten(-1);
        }, 100);
        api.weiter = () => {
            if (i >= fragen.length) { api.stop(); W.duell.eigen(el, e, api); return; }
            if (i >= 0 && !beantwortet) { antworten(-2); return; }   // Überspringen: nur auflösen, kein Punkt
            if (i + 1 >= fragen.length || (!teams && energie <= 0)) { ende(); return; }
            if (i < 0) { el.querySelector(".dl-karte").innerHTML = `<div class="dl-kk"><span class="dl-nr"></span><span class="dl-thema">${esc(THEMEN[e.thema] || "")} · Kl. ${st === "34" ? "3/4" : "1/2"}</span><span class="dl-sek"></span></div><div class="dl-bild"></div><div class="dl-frage"></div><div class="dl-zeit"><i></i></div>`; }
            i++; zeigen();
        };
        // Tasten 1–4 = Antwort A–D
        const taste = ev => { if (/^[1-4]$/.test(ev.key) && i >= 0 && i < fragen.length) { const b = el.querySelectorAll(".dl-a")[+ev.key - 1]; if (b) { ev.stopPropagation(); b.click(); } } };
        document.addEventListener("keydown", taste, true); api.aufraeumen(() => document.removeEventListener("keydown", taste, true));
        kopfZeigen();
    }
};

/* ---------------- Aussehen: Quiz-Show ---------------- */
const CSS = `
.lt-voll.lt-duell{ background:radial-gradient(ellipse at 50% 0%, #2a2f7a 0%, #141a4a 55%, #0b0f2e 100%); font-family:"Nunito","Andika",sans-serif; }
.lt-duell .lt-leiste h2{ font-family:"Nunito",sans-serif; font-weight:900; color:#ffe066; }
.lt-duell .lt-leiste select{ background:rgba(255,255,255,.1); color:#fff; border:1px solid rgba(255,255,255,.25); font-family:"Nunito",sans-serif; }
.lt-duell .lt-leiste select option{ color:#111; }
.lt-duell .lt-x, .lt-duell .lt-knopf{ background:rgba(255,255,255,.12); color:#fff; box-shadow:none; font-family:"Nunito",sans-serif; font-weight:900; border-radius:16px; border:1px solid rgba(255,255,255,.2); }
.lt-duell .lt-knopf.gold{ background:linear-gradient(135deg,#ffd93d,#ffb020); color:#1b1f4a; border:0; box-shadow:0 6px 20px rgba(255,200,40,.35); }
.lt-duell .lt-buehne{ background:none; box-shadow:none; padding:0 2vw; justify-content:flex-start; }
.lt-duell .lt-inhalt{ width:100%; flex:1; min-height:0; display:flex; }
.lt-duell .lt-antworten, .lt-duell .lt-loesung, .lt-duell .lt-zaehler{ display:none; }
.dl{ position:relative; width:min(100%,1300px); margin:0 auto; display:flex; flex-direction:column; gap:1.4vh; flex:1; min-height:0; color:#fff; overflow-x:hidden; overflow-y:auto; }
.dl-seite.a{ justify-self:start; } .dl-seite.b{ justify-self:end; }
.dl-kopf{ display:grid; grid-template-columns:auto 1fr auto; gap:1.2vw; align-items:center; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.14); border-radius:20px; padding:1vh 1.4vw; }
.dl-kopf:has(.dl-vs){ grid-template-columns:1fr auto 1fr; }
.dl-seite{ display:flex; align-items:center; gap:.6vw; }
.dl-seite.b{ justify-content:flex-end; text-align:right; }
.dl-seite small{ display:block; font-weight:800; opacity:.8; font-size:clamp(12px,1.2vw,18px); }
.dl-seite b{ font-size:clamp(28px,3.6vw,58px); line-height:1; color:#ffe066; font-variant-numeric:tabular-nums; }
.dl-seite.b b{ color:#ff9db5; }
.dl-av{ font-size:clamp(30px,3.6vw,58px); line-height:1; }
.dl-seite.dran{ background:rgba(255,224,102,.14); border-radius:14px; outline:3px solid #ffe066; padding:.3em .6em; }
.dl-vs{ font-weight:900; font-size:clamp(20px,2.4vw,38px); color:#ff9db5; }
.dl-boss{ min-width:0; }
.dl-boss-kopf{ display:flex; align-items:center; gap:.5vw; font-size:clamp(14px,1.5vw,22px); }
.dl-ella svg{ width:clamp(28px,3vw,46px); height:auto; display:block; }
.dl-ella.gross svg{ width:clamp(90px,11vw,170px); }
.dl-ella.getroffen{ animation:dlTreffer .6s; } .dl-ella.lacht{ animation:dlLacht .7s; }
@keyframes dlTreffer{ 0%,100%{ transform:none; filter:none; } 20%{ transform:translateX(-6px) rotate(-8deg); filter:brightness(2) saturate(0); } 50%{ transform:translateX(6px) rotate(6deg); } }
@keyframes dlLacht{ 0%,100%{ transform:none; } 30%{ transform:translateY(-8px) scale(1.15); } 60%{ transform:translateY(0) scale(1.05); } }
.dl-serie{ margin-left:auto; background:#ff7a3d; color:#fff; border-radius:999px; padding:.1em .7em; font-weight:900; font-size:.85em; animation:dlPuls 1s infinite alternate; }
@keyframes dlPuls{ to{ transform:scale(1.08); } }
.dl-balken{ position:relative; height:clamp(18px,2.4vh,28px); background:rgba(0,0,0,.35); border-radius:999px; overflow:hidden; margin-top:.6vh; border:1px solid rgba(255,255,255,.2); }
.dl-balken i{ position:absolute; inset:0 auto 0 0; background:linear-gradient(90deg,#4d96ff,#6bcB77); border-radius:999px; transition:width .8s cubic-bezier(.3,1.4,.5,1); }
.dl-balken i.tief{ background:linear-gradient(90deg,#ff6b6b,#ffb020); }
.dl-balken span{ position:relative; display:block; text-align:center; font-weight:900; font-size:clamp(11px,1.1vw,16px); line-height:clamp(18px,2.4vh,28px); text-shadow:0 1px 2px rgba(0,0,0,.6); }
.dl-regel{ display:block; opacity:.7; font-size:clamp(11px,1vw,15px); margin-top:.3vh; font-weight:700; }
.dl-karte{ background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.16); border-radius:22px; padding:1.4vh 2vw 1.6vh; text-align:center; }
.dl-karte.neu{ animation:dlRein .45s cubic-bezier(.2,1.3,.4,1); }
@keyframes dlRein{ from{ transform:scale(.92); opacity:0; } }
.dl-kk{ display:flex; justify-content:space-between; gap:10px; font-weight:900; letter-spacing:.05em; color:#7ee0ff; font-size:clamp(13px,1.4vw,22px); text-transform:uppercase; }
.dl-thema{ color:#fff; opacity:.6; text-transform:none; letter-spacing:0; }
.dl-sek{ color:#ffe066; font-variant-numeric:tabular-nums; }
.dl-bild{ font-size:clamp(40px,min(6vw,10vh),100px); line-height:1.15; margin-top:.6vh; letter-spacing:.06em; }
.dl-frage{ font-weight:900; font-size:clamp(26px,min(4vw,7vh),68px); line-height:1.15; margin:.8vh 0 1.2vh; }
.dl-frage b{ color:#ffe066; }
.dl-zeit{ height:10px; background:rgba(255,255,255,.12); border-radius:6px; overflow:hidden; }
.dl-zeit i{ display:block; height:100%; width:100%; background:#3fe0c5; border-radius:6px; }
.dl-zeit i.knapp{ background:#ff6b6b; }
.dl-zeit[hidden]{ display:none; }
.dl-antworten{ display:grid; grid-template-columns:repeat(3,1fr); gap:1.2vw; position:relative; }
.dl-antworten.lang{ grid-template-columns:1fr; gap:1vh; width:min(100%,900px); margin:0 auto; }
.dl-a{ display:flex; align-items:center; gap:.6em; justify-content:center; min-height:clamp(64px,11vh,120px); border-radius:18px; border:2px solid rgba(255,255,255,.25); background:linear-gradient(180deg,rgba(255,255,255,.14),rgba(255,255,255,.05)); color:#fff; font:900 clamp(22px,min(3vw,5vh),48px) "Nunito",sans-serif; cursor:pointer; padding:.2em .6em; transition:transform .15s, background .2s, opacity .3s; }
.dl-antworten.lang .dl-a{ justify-content:flex-start; min-height:clamp(52px,8vh,90px); font-size:clamp(18px,min(2.4vw,4vh),38px); text-align:left; }
.dl-a:hover:not(:disabled){ transform:translateY(-3px); border-color:#ffe066; background:rgba(255,224,102,.16); }
.dl-buchst{ width:1.5em; height:1.5em; flex:none; border-radius:10px; background:#ffe066; color:#1b1f4a; display:flex; align-items:center; justify-content:center; font-size:.7em; }
.dl-a.richtig{ border-color:#6bcB77; background:rgba(107,203,119,.3); transform:scale(1.04); box-shadow:0 0 30px rgba(107,203,119,.45); }
.dl-a.falsch{ border-color:#ff6b6b; background:rgba(255,107,107,.28); animation:dlWackel .45s; }
.dl-a.weg{ opacity:.3; }
@keyframes dlWackel{ 0%,100%{ transform:none; } 25%{ transform:translateX(-10px); } 75%{ transform:translateX(10px); } }
.dl-kk{ align-items:center; }
.dl-vorlesen{ margin-left:auto; margin-right:10px; width:clamp(38px,3.4vw,54px); height:clamp(38px,3.4vw,54px); border-radius:50%; border:0; background:#ffe066; font-size:clamp(18px,1.8vw,28px); cursor:pointer; flex:none; }
.dl-meldung{ min-height:clamp(40px,7vh,80px); text-align:center; font-weight:900; font-size:clamp(22px,min(3vw,5vh),46px); }
.dl-meldung.gut{ color:#8cf09a; } .dl-meldung.schlecht{ color:#ff9db5; }
.dl-meldung small{ display:block; color:#fff; opacity:.85; font-size:.55em; font-weight:800; }
.dl-start{ display:flex; flex-direction:column; align-items:center; gap:1vh; padding:1vh 0; }
.dl-start-ella{ font-size:clamp(50px,min(7vw,11vh),110px); line-height:1; }
.dl-start .dl-ella.gross svg{ width:clamp(70px,min(9vw,15vh),150px); }
.dl-start .dl-frage{ margin:.4vh 0; }
.dl-regeln{ display:flex; flex-direction:column; gap:.6vh; font-weight:800; font-size:clamp(16px,min(2vw,3.4vh),30px); text-align:left; background:rgba(0,0,0,.2); border-radius:16px; padding:1.2vh 1.6vw; }
.dl-ende .dl-pokal{ font-size:clamp(56px,min(8vw,12vh),130px); line-height:1; animation:dlPuls .8s infinite alternate; }
.dl-endstand{ display:flex; justify-content:center; align-items:center; gap:3vw; margin:1vh 0; }
.dl-endstand small{ display:block; font-weight:800; opacity:.8; font-size:clamp(14px,1.6vw,24px); }
.dl-endstand b{ font-size:clamp(50px,7vw,110px); line-height:1; color:#ffe066; }
.dl-endstand > div:last-child b{ color:#ff9db5; }
.dl-endstand > span{ font-size:clamp(40px,5vw,80px); opacity:.5; }
.dl-klein{ font-weight:800; opacity:.85; }
.dl-konf{ position:absolute; top:-12px; width:10px; height:16px; border-radius:2px; animation:dlKonf 2s linear forwards; z-index:5; pointer-events:none; }
@keyframes dlKonf{ to{ transform:translateY(110vh) rotate(720deg); opacity:.7; } }
@media (max-width:700px){
  .dl-kopf{ grid-template-columns:1fr 1fr; gap:8px; padding:8px 10px; }
  .dl-kopf:has(.dl-vs){ grid-template-columns:1fr auto 1fr; }
  .dl-boss{ grid-column:1 / -1; grid-row:2; }
  .dl-antworten{ grid-template-columns:1fr; gap:8px; }
  .dl-a{ justify-content:flex-start; min-height:56px; font-size:22px; }
  .dl-karte{ padding:10px 12px; }
  .dl-regeln{ font-size:15px; padding:10px 12px; }
}
@media (prefers-reduced-motion:reduce){ .dl-konf, .dl-serie, .dl-pokal{ animation:none; } }
`;
if (!document.getElementById("lernDuellCss")) { const s = document.createElement("style"); s.id = "lernDuellCss"; s.textContent = CSS; document.head.appendChild(s); }
})();
