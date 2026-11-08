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
    "l-ziele": ["lern-zielkarten"]
});
})();
