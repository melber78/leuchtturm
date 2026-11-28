/* ============================================================
   Leuchtturm – Vertretung: bisherige Stunden als Stationen
   Die fertigen Vertretungsstunden (vertretung-einheiten*.js) und die
   eigenen Stunden werden automatisch zu Stationen für die Schatzkarte
   (Kl. 1/2) und den Escape-Fall (Kl. 3/4) umgebaut:
   · jede Übung ohne Material → eine Station (Aufträge an der Tafel)
   · jede Geschichte mit Fragen → eine Lese-Station
   Dazu: die Fälle für den Escape-Fall.
   ============================================================ */
(function(){

const KAT_TYP = {
    "Deutsch entspannt": "woerter", "Mathe entspannt": "rechnen", "Sachunterricht entspannt": "wissen",
    "Kreativ & Gestalten": "kreativ", "Spiele & Bewegung": "bewegung", "Konzentration & Ruhe": "stille",
    "Gemischt: Deutsch & Mathe": "raetsel", "Englisch (Kl. 3/4)": "englisch"
};
const MATERIAL = /Arbeitsblatt|Zettel|Schere|Kleber|Würfel|Papierstreifen|ausdrucken|Karten verteilen/i;
// Aufgaben, bei denen die Lehrkraft eine Bewegung, Übung oder Szene selbst vormachen/vorspielen müsste → nicht übernehmen.
// Vorlesen, sagen, fragen, an die Tafel schreiben ist in Ordnung.
const SELBST_MACHEN = /vormach|Vormachen|machst (es|sie|das|die Bewegung)? ?vor|zeigst .{0,25}\bvor\b|Zeige den Trick|klatschst|\bDu (spielst|tanzt|turnst)\b/;
const VORBEREITUNG = /An der Tafel (steht|stehen|sind)|Bilder an der Tafel|an die Tafel (malen|zeichnen|schreiben)|Kästen|Vorlese-Kino|Nach dem Vorlesen|flüster|Dirigent|vorlesen|liest .{0,30}vor|Bild hoch|ihr Bild|dein Bild|Zeig dein/i;
const SAGT = /\b(Du|du) (sagst|rufst|nennst|fragst|liest|stellst|diktierst|denkst)\b|\bLies\b|Zeige das Bild|Ich sehe was/;
const ohneMd = t => String(t || "").replace(/\*\*/g, "").trim();
const punkte = t => String(t || "").split("\n").filter(z => /^\s*[-•]\s+/.test(z)).map(z => z.replace(/^\s*[-•]\s+/, "").trim());
const ohnePunkte = t => String(t || "").split("\n").filter(z => !/^\s*[-•]\s+/.test(z)).join("\n").trim();

// Ein Satz für die Lehrkraft – ohne „vormachen“: das macht die Tafel
function lkSatz(text, typ){
    const t = ohneMd(ohnePunkte(text)).replace(/\s+/g, " ");
    if (typ === "englisch" && /Wort zeigen|sprichst/.test(t)) return "Tippe auf „Lösung“ und dann auf 🔊 – die Tafel spricht das Wort vor, die Klasse spricht im Chor nach.";
    let satz = (t.match(/^.*?[.!?](\s|$)/) || [t])[0].trim();
    if (satz.length > 190) satz = satz.slice(0, 185).replace(/\s\S*$/, "") + " …";
    if (/\b(liest|lies|Lies)\b.*\bvor\b/.test(satz)) satz += " (Oder 🔊 antippen – die Tafel liest vor.)";
    return satz;
}
// Zahlen-/Wortlisten im Text („Kl. 1/2: 4 · 7 · 10 …“) → je Eintrag eine Aufgabe an der Tafel
function listeAus(text, stufe){
    const zeilen = String(text || "").split("\n").filter(z => (z.match(/·/g) || []).length >= 2);
    if (!zeilen.length) return [];
    const kl = zeilen.find(z => stufe === "34" ? /Kl\.\s*3\/4/.test(z) : /Kl\.\s*1\/2/.test(z)) || zeilen.find(z => !/Kl\.\s*\d\/\d/.test(z));
    if (!kl) return [];
    return kl.replace(/^.*?Kl\.\s*\d\/\d\s*:?\s*/, "").split("·").map(x => ohneMd(x).replace(/^[„"]|[“"]$/g, "")).filter(x => x && x.length < 80).slice(0, 12).map(f => ({ f }));
}
function itemsAus(u, text, stufe){
    const p = punkte(text);
    if (!p.length) return listeAus(text, stufe);
    const ant = Array.isArray(u.antworten) ? u.antworten.map(a => String(a).replace(/^\S+\s+/, "")) : null;
    const loes = u.loesungen || [];
    return p.slice(0, 10).map((z, i) => {
        let f = z, a = "";
        const m = /^(.*?)\s*\(([^()]+)\)\s*$/.exec(z);
        if (m) { f = m[1]; a = m[2]; }
        else if (/\s→\s/.test(z)) { const [x, ...rest] = z.split(/\s→\s/); f = x; a = rest.join(" → "); }
        if (!a && ant && loes[i]) a = String(loes[i]).split(/[,\s]+/).map(n => ant[+n - 1]).filter(Boolean).join(" / ");
        return a ? { f, a } : { f };
    });
}
function leseStation(e, stufe){
    const lt = e["lerntext" + stufe]; if (!lt || !lt.text) return null;
    const teile = String(lt.text).split(/\*\*\s*(?:Nach dem Vorlesen|Fragen zum Gespräch)[^*]*\*\*/i);
    const text = teile[0].trim(); if (text.length < 80) return null;
    const fragen = String(teile[1] || "").split("\n").map(z => z.match(/^\s*\d+\.\s*(.+)$/)).filter(Boolean).map(m => {
        const q = m[1].trim(), k = /^(.*?)\s*\(([^()]+)\)\s*$/.exec(q);
        return k ? { f: k[1], a: k[2] } : { f: q };
    });
    return { id: "alt-" + e.id + "-lesen-" + stufe, typ: "lesen", stufe, titel: lt.titel || e.titel, quelle: e.titel,
        lk: stufe === "12" ? "Lies die Geschichte vor oder tippe auf 🔊 – danach kommen die Fragen." : "Kinder lesen reihum je einen Satz laut vor – danach kommen die Fragen.",
        auftrag: stufe === "12" ? "Hört gut zu. Danach beantwortet ihr die Fragen." : "Lest den Text genau. Danach beantwortet ihr die Fragen.",
        text, items: fragen.length ? fragen : [{ f: "Worum ging es in der Geschichte?" }] };
}

window.VK_UMBAU = function(vorlagen){
    const out = [];
    (vorlagen || []).forEach(e => {
        if (!e || !e.id) return;
        const typ = KAT_TYP[e.kategorie] || "raetsel";
        const stufen = typ === "englisch" || e.nur34 ? ["34"] : ["12", "34"];
        stufen.forEach(stufe => {
            if (typ !== "englisch") { const l = leseStation(e, stufe); if (l) out.push(l); }
            (e.uebungen || []).forEach((u, k) => {
                if (u.fuer && u.fuer !== "alle" && u.fuer !== stufe) return;
                const text = u["text" + stufe] || u.text || "";
                if (MATERIAL.test(text)) return;
                const folie = u["folie" + stufe] || u.folie || ohnePunkte(text);
                const items = itemsAus(u, text, stufe);
                // Die Lehrkraft macht NICHTS vor und spielt keine Rolle – alles kommt von der Tafel.
                const nurLk = t => String(t).replace(/[^.!?\n]*\b(dürfen|darf|Kinder|Kind)\b[^.!?\n]*vormachen[^.!?\n]*[.!?]?/g, "");   // Kinder dürfen vormachen – das ist okay
                if (SELBST_MACHEN.test(nurLk(text)) || SELBST_MACHEN.test(nurLk(folie))) return;
                // Was die Lehrkraft sagen/vorlesen soll, muss an der Tafel stehen – sonst fehlt der Inhalt
                if (SAGT.test(text) && items.length < 2) return;
                // Offene Aufgabe ohne Einzelschritte: nur, wenn nichts vorbereitet oder gezeichnet werden muss
                if (!items.length && VORBEREITUNG.test(text + "\n" + folie)) return;
                const lk = lkSatz(text, typ);
                out.push({ id: "alt-" + e.id + "-" + k + "-" + stufe, typ, stufe, titel: u.titel, quelle: e.titel,
                    lk, auftrag: folie, items, dauer: u.dauer || "", lang: typ === "englisch" ? "en" : "" });
            });
        });
    });
    return out;
};

/* ---------- Escape-Fall (Kl. 3/4) ---------- */
window.VK_FAELLE = [
    { id: "tresor", titel: "Der Tresor im Hausmeisterkeller", nr: "0417",
      intro: "Herr Becker, der Hausmeister, hat das Geld für das Schulfest in einen alten Tresor im Keller gesperrt. Den Code hat er sich auf Zettel geschrieben – doch die Zettel sind beim Aufräumen in der ganzen Schule verloren gegangen. Morgen ist das Fest. Ihr seid das Ermittler-Team: Jeder gelöste Hinweis bringt eine Ziffer des Codes.",
      geloest: "Klack! Der Tresor springt auf. Das Geld für das Schulfest ist gerettet – Herr Becker bedankt sich beim besten Ermittler-Team der Schule." },
    { id: "museum", titel: "Die verschlossene Kiste im Museum", nr: "1209",
      intro: "Im Stadtmuseum steht eine uralte Holzkiste mit einem Zahlenschloss. Die Direktorin weiß nur: Der Code steht in alten Aufzeichnungen, die in mehrere Teile zerrissen wurden. Jedes Teil ist mit einer Aufgabe verschlüsselt. Löst ihr sie, bekommt ihr die Ziffern.",
      geloest: "Das Schloss öffnet sich. In der Kiste liegt eine Klinge aus Feuerstein – über 5000 Jahre alt! Ab morgen steht sie in der Ausstellung, mit einem Schild: „Gefunden vom Ermittler-Team“." },
    { id: "wetter", titel: "Funkstille in der Wetterstation", nr: "0731",
      intro: "Die Wetterstation auf dem Berg sendet keine Daten mehr. Der Computer ist gesperrt, und nur ein Zahlencode startet ihn wieder. Die Forscherin hat die Ziffern zur Sicherheit in Aufgaben versteckt. Ohne euch gibt es morgen keinen Wetterbericht!",
      geloest: "Der Bildschirm flackert, die Antenne dreht sich wieder: Die Wetterstation sendet! Morgen gibt es wieder einen Wetterbericht – dank eures Teams." },
    { id: "labor", titel: "Das gesperrte Schul-Labor", nr: "1122",
      intro: "Im Physikraum der großen Schule ist der Schrank mit den Experimenten verschlossen. Der Lehrer ist krank, und nur er kennt den Code. Zum Glück hat er Hinweise hinterlassen – jeder ist eine Aufgabe. Wer sie löst, findet die Ziffern.",
      geloest: "Der Schrank geht auf! Darin: Magnete, Lupen und ein Brief: „Gut gemacht! Wer so gut zusammenarbeitet, darf als Erstes experimentieren.“" }
];
})();
