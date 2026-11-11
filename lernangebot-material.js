/* ============================================================
   Leuchtturm – Lernangebot: Arbeitsmaterial zum Ausdrucken
   Ergänzt die Material-Bibliothek (sozial-material.js) um die
   Gruppe „Lernangebot“. Jede Seite füllt genau eine A4-Seite.
   ============================================================ */
"use strict";
(function () {
const SM = window.sozialMaterial;
if (!SM) return;
const B = SM.bibliothek;
const name = b => (window.LT_BILDER && window.LT_BILDER[b] ? window.LT_BILDER[b][0] : b);

const NEU = {
    "lern-silben-bildkarten": { titel: "Bildkarten „Silben“", gruppe: "Lernangebot", art: "karten", proSeite: 12,
        items: ["hund", "maus", "sonne", "banane", "tomate", "elefant", "katze", "rakete", "auto", "igel", "schmetterling", "giraffe"].filter(b => window.LT_BILDER && window.LT_BILDER[b]).map(b => ({ bild: b, text: name(b) })),
        hinweis: "Ausschneiden; verdeckt ziehen und in Silben sprechen.", wozu: "Für den Silben-Roboter und das Klatsch-Quiz: ziehen, klatschen, zählen." },
    "lern-anlaut-karten": { titel: "Anlaut-Bildkarten", gruppe: "Lernangebot", art: "karten", proSeite: 12,
        items: ["apfel", "banane", "ente", "fisch", "igel", "lama", "maus", "nudeln", "ufo", "rose", "sonne", "tiger"].map(b => ({ bild: b, text: name(b) })),
        hinweis: "Bild zeigen, Anfangslaut sprechen lassen.", wozu: "Für Anlaut-Spiele: Bild zeigen – mit welchem Laut fängt es an?" },
    "lern-reim-karten": { titel: "Reim-Bildkarten (Memory)", gruppe: "Lernangebot", art: "karten", proSeite: 12,
        items: ["maus", "haus", "hose", "rose", "schal", "wal", "schwein", "stein", "mais", "eis", "igel", "spiegel"].map(b => ({ bild: b, text: name(b) })),
        hinweis: "Zweimal drucken = mehr Paare. Verdeckt an die Tafel hängen.", wozu: "Für Reim-Memory: Paare finden, die sich reimen." },
    "lern-satz-karten": { titel: "Wortkarten „Satz-Baumeister“", gruppe: "Lernangebot", art: "karten", proSeite: 12,
        items: ["Tom", "spielt", "Ball.", "Die", "Katze", "schläft.", "Mama", "liest", "ein", "Buch.", "Der", "Hund"].map(t => ({ text: t })),
        hinweis: "Ausschneiden; die Kinder halten die Wörter vorn und tauschen, bis der Satz stimmt.", wozu: "Für „Lebende Sätze“: Wörter in die richtige Reihenfolge bringen." },
    "lern-zahlenkarten-20": { titel: "Zahlenkarten 0–20", gruppe: "Lernangebot", art: "karten", proSeite: 12,
        items: Array.from({ length: 21 }, (_, i) => ({ zahl: String(i) })),
        hinweis: "Für Nachbarzahlen, Zahlen ordnen und Rechenspiele.", wozu: "Zahlen ordnen, Nachbarn finden, Aufgaben legen." },
    "lern-buchstaben": { titel: "Buchstabenkarten A–Z", gruppe: "Lernangebot", art: "karten", proSeite: 12,
        items: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(b => ({ zahl: b + " " + b.toLowerCase() })),
        hinweis: "Für das ABC-Training und Anlaut-Spiele.", wozu: "ABC ordnen, Anlaute zuordnen." },
    "lern-plakat-startklar": { titel: "Plakat: Startklar!", gruppe: "Lernangebot", art: "plakat", nummern: true,
        punkte: [{ emoji: "🧹", text: "Tisch frei – nur, was ich brauche." }, { emoji: "✏️", text: "Material bereit." }, { emoji: "👀", text: "Aufgabe lesen: Was soll ich tun?" }, { emoji: "🚀", text: "Los geht’s!" }, { emoji: "✅", text: "Fertig? Kontrollieren!" }],
        fuss: "Ein guter Start ist schon die halbe Arbeit.", wozu: "Hängt dauerhaft – zur Stunde „Startklar!“ und für jede Arbeitsphase." },
    "lern-plakat-konzentration": { titel: "Plakat: Das hilft mir beim Konzentrieren", gruppe: "Lernangebot", art: "plakat",
        punkte: [{ emoji: "📵", text: "Ablenkungen weg." }, { emoji: "🎯", text: "Eine Aufgabe nach der anderen." }, { emoji: "💧", text: "Kurz trinken, tief atmen." }, { emoji: "🙋", text: "Hilfe holen, wenn ich feststecke." }, { emoji: "⏸️", text: "Kleine Pause – dann weiter." }],
        fuss: "Konzentration kann man trainieren – wie einen Muskel.", wozu: "Zur Stunde „Konzentrations-Training“." },
    "lern-plakat-kontrolle": { titel: "Plakat: So kontrolliere ich", gruppe: "Lernangebot", art: "plakat",
        punkte: [{ emoji: "👆", text: "Mit dem Finger nachzeigen und nachzählen." }, { emoji: "🔁", text: "Umkehraufgabe rechnen: 7 + 5 = 12 → 12 − 5 = 7" }, { emoji: "🗣️", text: "Wörter in Silben mitsprechen." }, { emoji: "🐢", text: "Langsam ein zweites Mal lesen." }, { emoji: "🤝", text: "Mit dem Nachbarn vergleichen." }],
        fuss: "Fehler sind Helfer – sie zeigen mir, was ich noch übe.", wozu: "Zur Stunde „Fehler sind Helfer“ und für jede Arbeitsphase." },
    "lern-plakat-lerndaumen": { titel: "Plakat: Lern-Daumen", gruppe: "Lernangebot", art: "plakat",
        punkte: [{ emoji: "👍", text: "Das kann ich schon sicher." }, { emoji: "👉", text: "Das klappt schon ein bisschen." }, { emoji: "👎", text: "Das übe ich noch." }],
        fuss: "Am Ende jeder Stunde: Wie gut kann ich das jetzt?", wozu: "Für den Abschluss jeder Lernangebot-Stunde." },
    "lern-plakat-auftraege": { titel: "Plakat: Auftrags-Zeichen", gruppe: "Lernangebot", art: "plakat",
        punkte: [{ emoji: "☑️", text: "Kreuze an." }, { emoji: "🔗", text: "Verbinde." }, { emoji: "⭕", text: "Kreise ein." }, { emoji: "✏️", text: "Schreibe." }, { emoji: "🖍️", text: "Male aus." }, { emoji: "〰️", text: "Unterstreiche." }],
        fuss: "Erst schauen: Was soll ich tun? Dann loslegen.", wozu: "Zur Stunde „Aufträge verstehen“ – und dauerhaft neben der Tafel." },
    "lern-plakat-hilfe": { titel: "Plakat: Die Hilfe-Treppe", gruppe: "Lernangebot", art: "plakat", nummern: true,
        punkte: [{ emoji: "👀", text: "Noch einmal genau lesen und schauen." }, { emoji: "🧰", text: "Ein Hilfsmittel nehmen (Rechenkette, Wörterbuch, Beispiel im Heft)." }, { emoji: "🤫", text: "Den Nachbarn leise fragen." }, { emoji: "🙋", text: "Hand heben – die Lehrerin kommt." }],
        fuss: "Feststecken ist normal. Wichtig ist, was du dann machst.", wozu: "Zur Stunde „Ich weiß nicht weiter“ – hängt dauerhaft im Raum." },
    "lern-plakat-pausen": { titel: "Plakat: Pausen-Ideen für den Kopf", gruppe: "Lernangebot", art: "plakat",
        punkte: [{ emoji: "🙆", text: "Aufstehen und strecken." }, { emoji: "💧", text: "Wasser trinken." }, { emoji: "🪟", text: "Fenster auf, frische Luft." }, { emoji: "🌬️", text: "Dreimal tief atmen." }, { emoji: "✖️", text: "Überkreuz-Bewegung." }],
        fuss: "Kurze Pause – dann geht es wieder viel besser.", wozu: "Zur Stunde „Pause fürs Gehirn“." },
    "lern-plakat-mut": { titel: "Plakat: Mut-Sätze", gruppe: "Lernangebot", art: "plakat",
        punkte: [{ emoji: "🌱", text: "Ich kann das NOCH nicht." }, { emoji: "🔁", text: "Ich probiere es noch einmal." }, { emoji: "🪜", text: "Ich mache einen kleinen Schritt nach dem anderen." }, { emoji: "🙋", text: "Ich darf um Hilfe fragen." }, { emoji: "🔍", text: "Fehler zeigen mir, was ich noch übe." }],
        fuss: "Was du zu dir selbst sagst, macht dich stark.", wozu: "Zur Stunde „Dranbleiben“ – hängt dauerhaft im Raum." },
    "lern-zielkarten": { titel: "Ziel-Karten", gruppe: "Lernangebot", art: "karten", proSeite: 4, kopf: "🎯 Mein Ziel bis nächste Woche",
        items: Array.from({ length: 4 }, () => ({ text: "Ich übe: …… · So oft: …… · Geschafft? ☐", linien: 3 })),
        hinweis: "Eine Karte pro Kind; nächste Woche gemeinsam nachschauen.", wozu: "Zur Stunde „Mein Ziel für diese Woche“." }
};
/* Lernuhr zum Basteln: Zifferblatt + Zeiger (Musterbeutelklammer in die Mitte) */
const ZIFFERBLATT = (() => {
    let t = "";
    for (let i = 0; i < 60; i++) { const w = i * 6 * Math.PI / 180, r1 = i % 5 ? 88 : 82, x1 = 100 + Math.sin(w) * r1, y1 = 100 - Math.cos(w) * r1, x2 = 100 + Math.sin(w) * 94, y2 = 100 - Math.cos(w) * 94; t += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#16324a" stroke-width="${i % 5 ? 1 : 2.4}"/>`; }
    for (let h = 1; h <= 12; h++) { const w = h * 30 * Math.PI / 180; t += `<text x="${(100 + Math.sin(w) * 68).toFixed(1)}" y="${(100 - Math.cos(w) * 68 + 7).toFixed(1)}" font-family="Nunito,Arial" font-weight="900" font-size="20" text-anchor="middle" fill="#16324a">${h}</text>`;
        const m = (h * 5) % 60; t += `<text x="${(100 + Math.sin(w) * 108).toFixed(1)}" y="${(100 - Math.cos(w) * 108 + 4).toFixed(1)}" font-family="Nunito,Arial" font-size="9" text-anchor="middle" fill="#7c8a85">${m}</text>`; }
    return `<svg viewBox="-20 -20 240 240" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="96" fill="#fff" stroke="#16324a" stroke-width="4"/>${t}<circle cx="100" cy="100" r="4" fill="#16324a"/></svg>`;
})();
const ZEIGER = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${[0, 1].map(k => `<g transform="translate(${30 + k * 90} 10)">
    <path d="M18 0 L30 22 L23 22 L23 120 Q18 128 13 120 L13 22 L6 22 Z" fill="none" stroke="#16324a" stroke-width="2"/><circle cx="18" cy="112" r="3" fill="#16324a"/><text x="18" y="145" font-size="10" text-anchor="middle" font-family="Nunito,Arial">langer Zeiger</text>
    <path d="M58 40 L70 60 L63 60 L63 120 Q58 128 53 120 L53 60 L46 60 Z" fill="none" stroke="#16324a" stroke-width="2"/><circle cx="58" cy="112" r="3" fill="#16324a"/><text x="58" y="160" font-size="10" text-anchor="middle" font-family="Nunito,Arial">kurzer Zeiger</text></g>`).join("")}</svg>`;
const MUENZE = (w, farbe) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="${farbe}" stroke="#7a5a1a" stroke-width="3"/><circle cx="50" cy="50" r="38" fill="none" stroke="#7a5a1a" stroke-width="1.5" stroke-dasharray="3 3"/><text x="50" y="${/ct/.test(w) ? 58 : 60}" font-family="Nunito,Arial" font-weight="900" font-size="${/ct/.test(w) ? 22 : 30}" text-anchor="middle" fill="#3b2a08">${w}</text></svg>`;
const SCHEIN = (w, farbe) => `<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="154" height="84" rx="8" fill="${farbe}" stroke="#16324a" stroke-width="3"/><rect x="12" y="12" width="136" height="66" rx="5" fill="none" stroke="#16324a" stroke-width="1" stroke-dasharray="4 3"/><text x="80" y="58" font-family="Nunito,Arial" font-weight="900" font-size="34" text-anchor="middle" fill="#16324a">${w}</text><text x="80" y="76" font-family="Nunito,Arial" font-size="9" text-anchor="middle" fill="#16324a">SPIELGELD</text></svg>`;
Object.assign(NEU, {
    "lern-lernuhr": { titel: "Lernuhr zum Basteln", gruppe: "Lernangebot", art: "karten", proSeite: 1, sym: 165,
        items: [{ svg: ZIFFERBLATT, klein: "Ausschneiden, auf Pappe kleben, Zeiger mit einer Musterbeutelklammer in der Mitte befestigen." }, { svg: ZEIGER, klein: "Zwei Zeiger-Paare: ausschneiden und am Punkt lochen." }],
        hinweis: "Eine Uhr pro Kind – oder eine große Uhr für die Tafel.", wozu: "Zur Stunde „Wie spät ist es?“: Uhrzeiten selbst einstellen und ablesen." },
    "lern-spielgeld": { titel: "Spielgeld: Münzen und Scheine", gruppe: "Lernangebot", art: "karten", proSeite: 12, sym: 40,
        items: [["1 ct", "#e8b07a"], ["2 ct", "#e8b07a"], ["5 ct", "#e8b07a"], ["10 ct", "#f2d27a"], ["20 ct", "#f2d27a"], ["50 ct", "#f2d27a"], ["1 €", "#f2e2a0"], ["2 €", "#f2e2a0"], ["1 €", "#f2e2a0"], ["2 €", "#f2e2a0"], ["50 ct", "#f2d27a"], ["10 ct", "#f2d27a"]].map(([w, f]) => ({ svg: MUENZE(w, f) }))
            .concat([["5 €", "#d9dde0"], ["10 €", "#f4c6c0"], ["20 €", "#c6dcf4"], ["50 €", "#f6dcb4"], ["5 €", "#d9dde0"], ["10 €", "#f4c6c0"], ["20 €", "#c6dcf4"], ["5 €", "#d9dde0"], ["10 €", "#f4c6c0"], ["5 €", "#d9dde0"], ["10 €", "#f4c6c0"], ["20 €", "#c6dcf4"]].map(([w, f]) => ({ svg: SCHEIN(w, f) }))),
        hinweis: "Seite 1 = Münzen, Seite 2 = Scheine. Mehrfach drucken für mehr Geld.", wozu: "Zur Stunde „Einkaufen mit Geld“: Beträge legen, bezahlen, Rückgeld." },
    "lern-uebekarten": { titel: "Übe-Kärtchen (vorne Aufgabe, hinten Lösung)", gruppe: "Lernangebot", art: "karten", proSeite: 8, kopf: "🃏 Übe-Karte",
        items: Array.from({ length: 8 }, () => ({ klein: "Vorne: Aufgabe · Hinten: Lösung", linien: 2 })),
        hinweis: "6 Karten pro Kind. Für das Zwei-Stapel-Training: „kann ich“ und „übe ich noch“.", wozu: "Zur Stunde „Üben in kleinen Portionen“." },
    "lern-stapelkarten": { titel: "Stapel-Schilder „kann ich“ / „übe ich noch“", gruppe: "Lernangebot", art: "karten", proSeite: 4,
        items: [{ emoji: "✅", text: "kann ich" }, { emoji: "🔁", text: "übe ich noch" }, { emoji: "✅", text: "kann ich" }, { emoji: "🔁", text: "übe ich noch" }],
        hinweis: "Ein Paar pro Tisch.", wozu: "Zur Stunde „Üben in kleinen Portionen“: Karten auf zwei Stapel sortieren." }
});
Object.assign(B, NEU);
Object.assign(SM.zuordnung || {}, {
    "l-konzentration": ["lern-plakat-konzentration"],
    "l-arbeitsplatz": ["lern-plakat-startklar"],
    "l-fehler-helfer": ["lern-plakat-kontrolle"],
    "l-zahlenland": ["lern-zahlenkarten-20"],
    "l-abc-training": ["lern-buchstaben"],
    "l-auftraege-verstehen": ["lern-plakat-auftraege"],
    "l-hilfe-holen": ["lern-plakat-hilfe"],
    "l-pausen": ["lern-plakat-pausen"],
    "l-dranbleiben": ["lern-plakat-mut"],
    "l-ziele": ["lern-zielkarten"],
    "l-uhr": ["lern-lernuhr"],
    "l-geld": ["lern-spielgeld"],
    "l-ueben-portionen": ["lern-uebekarten", "lern-stapelkarten"],
    "l-lesen-malen": ["lern-anlaut-karten"]
});
})();
