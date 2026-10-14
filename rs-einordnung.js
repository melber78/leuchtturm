/* ===============================================================
   Leuchtturm · Fehlerwörter automatisch einem Rechtschreib-Schwerpunkt zuordnen
   Wird von foerderkartei.php und lrs.php gemeinsam genutzt.
   =============================================================== */

// Kurznamen der 15 Schwerpunkte (Schlüssel wie RS_SCHWERPUNKTE in lrs.php)
const RS_NAMEN = {
    schaerfung:  { name: "Schärfung (Doppelkonsonant)", kurz: "Schärfung",   tipp: "Kurzer Vokal? Silben schwingen!" },
    cktz:        { name: "ck und tz",                   kurz: "ck/tz",       tipp: "Nach l, n, r nie ck/tz!" },
    dehnung:     { name: "Dehnungs-h",                  kurz: "Dehnungs-h",  tipp: "Merkwort – vor l, m, n, r" },
    ie:          { name: "Langes i: ie",                kurz: "ie",          tipp: "Langes i → ie" },
    sss:         { name: "s, ss oder ß",                kurz: "s/ss/ß",      tipp: "kurz → ss · lang+scharf → ß" },
    auslaut:     { name: "Auslautverhärtung (b/d/g)",   kurz: "Auslaut",     tipp: "Verlängern: Hund → Hunde" },
    aeau:        { name: "ä/äu – Ableiten",             kurz: "ä/äu",        tipp: "Verwandtes Wort mit a/au?" },
    dasdass:     { name: "das oder dass",               kurz: "das/dass",    tipp: "Ersatzprobe: dieses/welches?" },
    grossklein:  { name: "Groß- und Kleinschreibung",   kurz: "groß/klein",  tipp: "Artikelprobe!" },
    vf:          { name: "v oder f",                    kurz: "v/f",         tipp: "ver-/vor- und Merkwörter mit v" },
    doppelvokal: { name: "Doppelvokale aa, ee, oo",     kurz: "aa/ee/oo",    tipp: "Merkwort!" },
    iglich:      { name: "Endungen -ig und -lich",      kurz: "-ig/-lich",   tipp: "Verlängern: lustiger" },
    spst:        { name: "sp und st am Wortanfang",     kurz: "sp/st",       tipp: "schp/scht → sp/st" },
    silbenh:     { name: "Silbentrennendes h",          kurz: "Silben-h",    tipp: "Verlängern: Schuh → Schuhe" },
    chsx:        { name: "chs, x oder ks",              kurz: "chs/x",       tipp: "Merkwort – meist chs" },
    sonstige:    { name: "Merkwort (ohne Regel)",       kurz: "Merkwort",    tipp: "Wortbild einprägen" },
};

// Muster je Schwerpunkt: wo im (richtig geschriebenen) Wort die Rechtschreibstelle liegt
const RS_MUSTER = {
    schaerfung:  /(bb|dd|ff|gg|ll|mm|nn|pp|rr|tt)/gi,
    cktz:        /(ck|tz)/gi,
    dehnung:     /[aeiouäöü]h(?=[lmnr])/gi,
    ie:          /ie/gi,
    sss:         /(ß|ss)/gi,
    auslaut:     /(?<![n])g(?=$|[^aeiouäöüylrnh])|[bd](?=$|[^aeiouäöüylrh])/gi,
    aeau:        /(äu|ä)/gi,
    vf:          /v/gi,
    doppelvokal: /(aa|ee|oo)/gi,
    iglich:      /(ig|lich)(?=(e|en|er|es|em|ere|eren|s|st|t)?$)/gi,
    spst:        /^(sp|st)|^(be|ge|ver|ent|zer|vor|auf|an|aus|ab|ein|um|unter|über|zu|mit)(sp|st)/gi,
    silbenh:     /[aeiouäöü]h(?=[aeiouäöü]|$|t$|st$)/gi,
    chsx:        /(chs|cks|ks|x)/gi,
};

function rs_treffer(wort){
    const liste = [];
    Object.entries(RS_MUSTER).forEach(([key, re]) => {
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(wort))){
            liste.push({ key, start: m.index, ende: m.index + m[0].length });
            if (!re.global) break;
            if (m[0].length === 0) re.lastIndex++;
        }
    });
    // Sonderfälle: "ie" am Wortende nach l (Familie, Lilie) ist kein langes i
    const ig = liste.filter(t => t.key === "iglich");
    return liste.filter(t => !(t.key === "ie" && wort.length > 5 && /lie$/i.test(wort) && t.start === wort.length - 2))
        .filter(t => !(t.key === "auslaut" && ig.some(i => t.start >= i.start && t.start < i.ende)));   // lustig: -ig, nicht Auslaut
}

// Liefert die Schwerpunkt-Schlüssel (wichtigster zuerst). Mit Fehlschreibung wird genau die Fehlerstelle bewertet.
function rs_einordnen(richtig, falsch){
    richtig = String(richtig || "").trim();
    falsch = String(falsch || "").trim();
    if (!richtig) return ["sonstige"];
    const klein = richtig.toLowerCase();
    if (klein === "das" || klein === "dass") return ["dasdass"];

    if (falsch && falsch !== richtig){
        if (falsch.toLowerCase() === klein) return ["grossklein"];
        if (/^(das|dass)$/i.test(falsch)) return ["dasdass"];
    }

    const treffer = rs_treffer(richtig);

    if (falsch && falsch !== richtig){
        // Fehlerbereich im richtigen Wort bestimmen (gemeinsamer Anfang und gemeinsames Ende abziehen)
        const a = richtig.toLowerCase(), b = falsch.toLowerCase();
        let p = 0;
        while (p < a.length && p < b.length && a[p] === b[p]) p++;
        let s = 0;
        while (s < a.length - p && s < b.length - p && a[a.length - 1 - s] === b[b.length - 1 - s]) s++;
        const von = p, bis = a.length - s;           // [von, bis) im richtigen Wort; leer = Einfügung im Kindwort
        const passend = treffer.filter(t => t.start <= Math.max(bis, von + 1) && t.ende >= von);
        // auch Fehler, die eine Schreibung hinzufügen (Schuhle, Botte): Muster im Kindwort an der Fehlerstelle
        const bisF = b.length - s;
        rs_treffer(falsch).forEach(t => { if (t.start <= Math.max(bisF, von + 1) && t.ende >= von) passend.push(t); });
        // Groß-/Kleinschreibung zusätzlich, wenn auch der Anfangsbuchstabe falsch ist
        const extra = (richtig[0] !== falsch[0] && richtig[0].toLowerCase() === falsch[0].toLowerCase()) ? ["grossklein"] : [];
        const keys = [...new Set([...passend.map(t => t.key), ...extra])];
        if (keys.length) return rs_sortieren(keys);
        // Sonderregel: zusätzlich geschriebenes h nach langem Vokal (Tomahte) → Dehnung
        if (b.slice(von, bisF) === "h" && a.slice(von, bis) === "" && /[aeiouäöü]$/i.test(a.slice(0, von))) return ["dehnung"];
        // Sonderregel: Verwechslung b/p, d/t, g/k am Wortende → Auslaut
        if (/[bdg]$/i.test(richtig) && /[ptk]$/i.test(falsch)) return ["auslaut"];
        return ["sonstige"];
    }
    const keys = [...new Set(treffer.map(t => t.key))];
    return keys.length ? rs_sortieren(keys) : ["sonstige"];
}

// Reihenfolge: speziellere Phänomene vor allgemeinen (z. B. "ss" → s/ss/ß statt Schärfung)
const RS_RANG = ["dasdass", "grossklein", "iglich", "cktz", "chsx", "sss", "silbenh", "dehnung", "doppelvokal", "ie", "aeau", "spst", "auslaut", "vf", "schaerfung"];
function rs_sortieren(keys){
    return keys.sort((x, y) => RS_RANG.indexOf(x) - RS_RANG.indexOf(y));
}

// Liest eine Eingabe wie "Fahne (Fane)", "Fane → Fahne", "Fane > Fahne", "Fahne=Fane" oder nur "Fahne"
function rs_eingabeLesen(text){
    return String(text || "").split(/[\n,;]+/).map(z => z.trim()).filter(Boolean).map(z => {
        let richtig = z, falsch = "";
        let m;
        if ((m = /^(.+?)\s*\((.+?)\)\s*$/.exec(z))){ richtig = m[1]; falsch = m[2]; }
        else if ((m = /^(.+?)\s*(?:→|->|>)\s*(.+)$/.exec(z))){ falsch = m[1]; richtig = m[2]; }
        else if ((m = /^(.+?)\s*=\s*(.+)$/.exec(z))){ richtig = m[1]; falsch = m[2]; }
        else if ((m = /^(.+?)\s*\/\s*(.+)$/.exec(z))){ richtig = m[1]; falsch = m[2]; }   // Format aus dem Gutachten: Ziel/Kind
        richtig = richtig.replace(/[.,!?;:„“"]/g, "").trim();
        falsch = falsch.replace(/[.,!?;:„“"]/g, "").trim();
        if (falsch === richtig) falsch = "";
        return { wort: richtig, falsch, sp: rs_einordnen(richtig, falsch) };
    }).filter(e => e.wort && e.wort.length <= 40 && !/\s/.test(e.wort));
}
