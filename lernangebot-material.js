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
        fuss: "Am Ende jeder Stunde: Wie gut kann ich das jetzt?", wozu: "Für den Abschluss jeder Lernangebot-Stunde." }
};
Object.assign(B, NEU);
Object.assign(SM.zuordnung || {}, {
    "l-konzentration": ["lern-plakat-konzentration"],
    "l-arbeitsplatz": ["lern-plakat-startklar"],
    "l-fehler-helfer": ["lern-plakat-kontrolle"],
    "l-zahlenland": ["lern-zahlenkarten-20"],
    "l-abc-training": ["lern-buchstaben"]
});
})();
