/* ============================================================
   Leuchtturm – Lernangebot: gemeinsame Wörter- und Zahlendaten
   für Tafel-Übungen und den Arbeitsblatt-Generator.
   Bilder kommen aus bilder.js (window.LT_BILDER, Schlüssel b).
   w = Wort, s = Silben (mit „-“ getrennt), a = Begleiter
   ============================================================ */
"use strict";
(function () {

const W = [
    ["hund", "Hund", "Hund", "der"], ["katze", "Katze", "Kat-ze", "die"], ["maus", "Maus", "Maus", "die"], ["hase", "Hase", "Ha-se", "der"],
    ["baer", "Bär", "Bär", "der"], ["fuchs", "Fuchs", "Fuchs", "der"], ["loewe", "Löwe", "Lö-we", "der"], ["tiger", "Tiger", "Ti-ger", "der"],
    ["kuh", "Kuh", "Kuh", "die"], ["schwein", "Schwein", "Schwein", "das"], ["pferd", "Pferd", "Pferd", "das"], ["schaf", "Schaf", "Schaf", "das"],
    ["ziege", "Ziege", "Zie-ge", "die"], ["huhn", "Huhn", "Huhn", "das"], ["ente", "Ente", "En-te", "die"], ["eule", "Eule", "Eu-le", "die"],
    ["pinguin", "Pinguin", "Pin-gu-in", "der"], ["frosch", "Frosch", "Frosch", "der"], ["schildkroete", "Schildkröte", "Schild-krö-te", "die"],
    ["schlange", "Schlange", "Schlan-ge", "die"], ["fisch", "Fisch", "Fisch", "der"], ["wal", "Wal", "Wal", "der"], ["delfin", "Delfin", "Del-fin", "der"],
    ["krake", "Krake", "Kra-ke", "der"], ["hai", "Hai", "Hai", "der"], ["robbe", "Robbe", "Rob-be", "die"], ["schnecke", "Schnecke", "Schne-cke", "die"],
    ["schmetterling", "Schmetterling", "Schmet-ter-ling", "der"], ["biene", "Biene", "Bie-ne", "die"], ["marienkaefer", "Marienkäfer", "Ma-ri-en-kä-fer", "der"],
    ["ameise", "Ameise", "A-mei-se", "die"], ["raupe", "Raupe", "Rau-pe", "die"], ["spinne", "Spinne", "Spin-ne", "die"], ["elefant", "Elefant", "E-le-fant", "der"],
    ["giraffe", "Giraffe", "Gi-raf-fe", "die"], ["zebra", "Zebra", "Ze-bra", "das"], ["affe", "Affe", "Af-fe", "der"], ["kamel", "Kamel", "Ka-mel", "das"],
    ["igel", "Igel", "I-gel", "der"], ["papagei", "Papagei", "Pa-pa-gei", "der"], ["krokodil", "Krokodil", "Kro-ko-dil", "das"], ["koala", "Koala", "Ko-a-la", "der"],
    ["panda", "Panda", "Pan-da", "der"], ["einhorn", "Einhorn", "Ein-horn", "das"], ["taube", "Taube", "Tau-be", "die"], ["vogel", "Vogel", "Vo-gel", "der"],
    ["hamster", "Hamster", "Hams-ter", "der"], ["kaenguru", "Känguru", "Kän-gu-ru", "das"], ["nashorn", "Nashorn", "Nas-horn", "das"], ["wolf", "Wolf", "Wolf", "der"],
    ["lama", "Lama", "La-ma", "das"], ["fledermaus", "Fledermaus", "Fle-der-maus", "die"],
    ["apfel", "Apfel", "Ap-fel", "der"], ["birne", "Birne", "Bir-ne", "die"], ["banane", "Banane", "Ba-na-ne", "die"], ["erdbeere", "Erdbeere", "Erd-bee-re", "die"],
    ["zitrone", "Zitrone", "Zi-tro-ne", "die"], ["orange", "Orange", "O-ran-ge", "die"], ["ananas", "Ananas", "A-na-nas", "die"], ["melone", "Melone", "Me-lo-ne", "die"],
    ["kiwi", "Kiwi", "Ki-wi", "die"], ["tomate", "Tomate", "To-ma-te", "die"], ["gurke", "Gurke", "Gur-ke", "die"], ["paprika", "Paprika", "Pa-pri-ka", "die"],
    ["kartoffel", "Kartoffel", "Kar-tof-fel", "die"], ["zwiebel", "Zwiebel", "Zwie-bel", "die"], ["salat", "Salat", "Sa-lat", "der"], ["mais", "Mais", "Mais", "der"],
    ["brot", "Brot", "Brot", "das"], ["kaese", "Käse", "Kä-se", "der"], ["pizza", "Pizza", "Piz-za", "die"], ["eis", "Eis", "Eis", "das"],
    ["kuchen", "Kuchen", "Ku-chen", "der"], ["torte", "Torte", "Tor-te", "die"], ["keks", "Keks", "Keks", "der"], ["ei", "Ei", "Ei", "das"],
    ["nudeln", "Nudeln", "Nu-deln", "die"], ["waffel", "Waffel", "Waf-fel", "die"], ["milch", "Milch", "Milch", "die"], ["honig", "Honig", "Ho-nig", "der"],
    ["auto", "Auto", "Au-to", "das"], ["bus", "Bus", "Bus", "der"], ["fahrrad", "Fahrrad", "Fahr-rad", "das"], ["flugzeug", "Flugzeug", "Flug-zeug", "das"],
    ["schiff", "Schiff", "Schiff", "das"], ["rakete", "Rakete", "Ra-ke-te", "die"], ["traktor", "Traktor", "Trak-tor", "der"], ["roller", "Roller", "Rol-ler", "der"],
    ["taxi", "Taxi", "Ta-xi", "das"], ["kanu", "Kanu", "Ka-nu", "das"], ["ufo", "Ufo", "U-fo", "das"],
    ["sonne", "Sonne", "Son-ne", "die"], ["mond", "Mond", "Mond", "der"], ["stern", "Stern", "Stern", "der"], ["wolke", "Wolke", "Wol-ke", "die"],
    ["regenbogen", "Regenbogen", "Re-gen-bo-gen", "der"], ["blitz", "Blitz", "Blitz", "der"], ["schneemann", "Schneemann", "Schnee-mann", "der"],
    ["baum", "Baum", "Baum", "der"], ["tanne", "Tanne", "Tan-ne", "die"], ["palme", "Palme", "Pal-me", "die"], ["tulpe", "Tulpe", "Tul-pe", "die"],
    ["rose", "Rose", "Ro-se", "die"], ["kaktus", "Kaktus", "Kak-tus", "der"], ["pilz", "Pilz", "Pilz", "der"], ["feuer", "Feuer", "Feu-er", "das"],
    ["vulkan", "Vulkan", "Vul-kan", "der"], ["berg", "Berg", "Berg", "der"], ["muschel", "Muschel", "Mu-schel", "die"], ["stein", "Stein", "Stein", "der"],
    ["hose", "Hose", "Ho-se", "die"], ["kleid", "Kleid", "Kleid", "das"], ["socken", "Socken", "So-cken", "die"], ["schal", "Schal", "Schal", "der"],
    ["stiefel", "Stiefel", "Stie-fel", "der"], ["mantel", "Mantel", "Man-tel", "der"], ["brille", "Brille", "Bril-le", "die"], ["krone", "Krone", "Kro-ne", "die"],
    ["gitarre", "Gitarre", "Gi-tar-re", "die"], ["trommel", "Trommel", "Trom-mel", "die"], ["geige", "Geige", "Gei-ge", "die"], ["trompete", "Trompete", "Trom-pe-te", "die"],
    ["buch", "Buch", "Buch", "das"], ["stift", "Stift", "Stift", "der"], ["schere", "Schere", "Sche-re", "die"], ["lineal", "Lineal", "Li-ne-al", "das"],
    ["pinsel", "Pinsel", "Pin-sel", "der"], ["heft", "Heft", "Heft", "das"], ["globus", "Globus", "Glo-bus", "der"], ["lupe", "Lupe", "Lu-pe", "die"],
    ["teddy", "Teddy", "Ted-dy", "der"], ["wuerfel", "Würfel", "Wür-fel", "der"], ["drachen", "Drachen", "Dra-chen", "der"], ["geschenk", "Geschenk", "Ge-schenk", "das"],
    ["pokal", "Pokal", "Po-kal", "der"], ["medaille", "Medaille", "Me-dail-le", "die"], ["schlitten", "Schlitten", "Schlit-ten", "der"], ["rutsche", "Rutsche", "Rut-sche", "die"],
    ["hammer", "Hammer", "Ham-mer", "der"], ["leiter", "Leiter", "Lei-ter", "die"], ["magnet", "Magnet", "Ma-gnet", "der"], ["zange", "Zange", "Zan-ge", "die"],
    ["tasse", "Tasse", "Tas-se", "die"], ["loeffel", "Löffel", "Löf-fel", "der"], ["besen", "Besen", "Be-sen", "der"], ["eimer", "Eimer", "Ei-mer", "der"],
    ["schluessel", "Schlüssel", "Schlüs-sel", "der"], ["kerze", "Kerze", "Ker-ze", "die"], ["uhr", "Uhr", "Uhr", "die"], ["glocke", "Glocke", "Glo-cke", "die"],
    ["schirm", "Schirm", "Schirm", "der"], ["seife", "Seife", "Sei-fe", "die"], ["telefon", "Telefon", "Te-le-fon", "das"], ["stuhl", "Stuhl", "Stuhl", "der"],
    ["bett", "Bett", "Bett", "das"], ["tuer", "Tür", "Tür", "die"], ["haus", "Haus", "Haus", "das"], ["zelt", "Zelt", "Zelt", "das"],
    ["brief", "Brief", "Brief", "der"], ["paket", "Paket", "Pa-ket", "das"], ["korb", "Korb", "Korb", "der"], ["spiegel", "Spiegel", "Spie-gel", "der"],
    ["anker", "Anker", "An-ker", "der"], ["sanduhr", "Sanduhr", "Sand-uhr", "die"], ["laptop", "Laptop", "Lap-top", "der"], ["kamera", "Kamera", "Ka-me-ra", "die"]
].map(([b, w, s, a]) => ({ b, w, s, a, n: s.split("-").length }));

// Anlaut: Mehrbuchstaben-Laute am Wortanfang erkennen (für Kl. 1 nur Wörter mit klarem Einzel-Anlaut)
const MEHR = ["Sch", "Ch", "Pf", "Qu", "Ei", "Eu", "Au", "Sp", "St"];
W.forEach(x => {
    const m = MEHR.find(p => x.w.startsWith(p));
    x.an = m || x.w[0].toUpperCase();
    x.klar = !m && !/^[ÄÖÜCQXYV]/.test(x.w);   // ein Buchstabe = ein klarer Laut
    x.vokal = /^[AEIOUÄÖÜ]/.test(x.w);
});

const REIME = [["maus", "haus"], ["hose", "rose"], ["schal", "wal"], ["taube", "traube"], ["schlange", "zange"], ["hai", "ei"], ["schwein", "stein"], ["mais", "eis"], ["igel", "spiegel"]];

// Kl. 3/4: Wortarten (ohne Bilder)
const WORTARTEN = {
    Nomen: ["Hund", "Schule", "Freund", "Fahrrad", "Wald", "Ball", "Mutter", "Pause", "Tafel", "Apfel", "Garten", "Sonne", "Lehrerin", "Zimmer", "Brot", "Stadt", "Kino", "Ferien"],
    Verben: ["laufen", "lesen", "spielen", "schreiben", "lachen", "springen", "essen", "malen", "singen", "fahren", "rechnen", "schlafen", "rufen", "bauen", "tanzen", "denken", "helfen", "trinken"],
    Adjektive: ["groß", "klein", "schnell", "langsam", "bunt", "laut", "leise", "lustig", "müde", "warm", "kalt", "neu", "alt", "stark", "hell", "dunkel", "süß", "leicht"]
};

// Kurze Lese-Wörter und Sätze für das Blitzlesen
const LESEN = {
    silben12: ["ma", "mi", "mo", "mu", "me", "la", "li", "lo", "le", "lu", "sa", "si", "so", "se", "na", "ni", "no", "ra", "ri", "ro", "ta", "ti", "to", "fa", "fi", "fo", "wa", "wi", "wo", "ho", "ha", "hu", "bo", "ba", "bi", "da", "do", "di"],
    woerter12: ["Mama", "Oma", "Opa", "Mimi", "Tomate", "Sofa", "Rose", "Nase", "Hose", "Limo", "Igel", "Esel", "Auto", "Maus", "Haus", "Ball", "Hund", "Lama", "Sonne", "Name", "Tafel", "Wal", "Mond", "Eis"],
    woerter34: ["Schmetterling", "Geburtstag", "Fahrradhelm", "Klassenzimmer", "Schokolade", "Regenbogen", "Turnschuhe", "Bushaltestelle", "Taschenlampe", "Sommerferien", "Weihnachtsbaum", "Hausaufgaben", "Feuerwehrauto", "Kinderzimmer", "Sonnenblume", "Pausenhof", "Erdbeereis", "Zahnbürste"],
    saetze12: ["Mama malt.", "Oma ist da.", "Tim isst ein Eis.", "Der Hund rennt.", "Lea hat ein Auto.", "Die Maus ist klein.", "Ich mag Tomaten.", "Opa liest.", "Die Sonne lacht.", "Ole malt ein Haus."],
    saetze34: ["Nach der Schule spielen wir Fußball.", "Der Igel schläft unter dem Laub.", "Im Winter baut Mia einen Schneemann.", "Mein Bruder fährt mit dem Fahrrad zum Sport.", "Die Katze klettert auf den hohen Baum.", "Am Wochenende backen wir einen Kuchen.", "In der Pause essen alle ihr Pausenbrot.", "Der Bus kommt heute zehn Minuten zu spät."]
};

const bildDa = b => !!(window.LT_BILDER && window.LT_BILDER[b]);
function bildSvg(b){ const x = window.LT_BILDER && window.LT_BILDER[b]; return x ? x[2] : ""; }
function mischen(liste){ const a = liste.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function ziehen(liste, n){ return mischen(liste).slice(0, n); }
function zufall(min, max){ return min + Math.floor(Math.random() * (max - min + 1)); }

window.LERN_DATEN = { woerter: W.filter(x => bildDa(x.b)), reime: REIME, wortarten: WORTARTEN, lesen: LESEN, bildSvg, mischen, ziehen, zufall };
})();
