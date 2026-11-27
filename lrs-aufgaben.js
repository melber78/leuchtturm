/* ============================================================
   Leuchtturm – Aufgaben-Kern für alle Lernspiele
   Didaktische Leitlinien:
   · Nie ein falsch geschriebenes Wort zeigen – nur Lücken und richtige Wörter.
   · Jede Rechtschreib-Aufgabe ist ein Strategie-Schritt (Schwingen,
     Verlängern, Ableiten, Merkwort, Artikel-/Ersatzprobe).
   · Fehler → erst ein Tipp, dann noch ein Versuch; erst danach die Lösung.
     Die Aufgabe kommt später noch einmal.
   · Ohne Zeitdruck. Am Ende steht immer das richtige Wort (mit Silben).
   ============================================================ */
(function(){
const STRATEGIE = {
    schwingen: { name: "Schwingen", ico: "〰️", kurz: "Schwing das Wort in Silben und hör auf den Selbstlaut." },
    verlaengern: { name: "Verlängern", ico: "↔️", kurz: "Verlängere das Wort – dann hörst du es deutlich." },
    ableiten: { name: "Ableiten", ico: "🌳", kurz: "Gibt es ein verwandtes Wort mit a oder au?" },
    merken: { name: "Merkwort", ico: "👁️", kurz: "Merkwort: genau ansehen, merken, aufbauen." },
    artikel: { name: "Artikelprobe", ico: "🏷️", kurz: "Passt der, die oder das davor? Dann groß." },
    ersatz: { name: "Ersatzprobe", ico: "🔁", kurz: "Kannst du „dieses“ oder „welches“ einsetzen?" },
};
const STRAT_VON = { schaerfung: "schwingen", ie: "schwingen", sss: "schwingen", cktz: "schwingen", auslaut: "verlaengern", iglich: "verlaengern", silbenh: "verlaengern",
    aeau: "ableiten", dehnung: "merken", doppelvokal: "merken", vf: "merken", chsx: "merken", spst: "merken", grossklein: "artikel", dasdass: "ersatz" };
// Vorfrage „kurz oder lang?“ – der eigentliche Strategieschritt beim Schwingen
function laenge(k, w, ausTreffer){
    // aus dem Wort selbst bestimmen (auch für Fehlerwörter aus der Förderkartei)
    if (k === "schaerfung") return /(bb|dd|ff|gg|ll|mm|nn|pp|rr|tt|ss)/.test(w) ? "kurz" : "lang";
    if (k === "ie") return /ie/i.test(w) ? "lang" : "kurz";
    if (k === "sss") return /ss/.test(w) ? "kurz" : "lang";
    if (k === "cktz") return /ck|tz/.test(w) ? "kurz" : null;
    return null;
}
function vokalVor(a){ const m = /([aeiouäöü]|ei|au|eu|ie)$/i.exec(a.vor); return m ? m[1] : ""; }
// Tipp je Schwerpunkt (ohne die Lösung zu verraten)
function tipp(k, a){
    const v = vokalVor(a), h = SP_HILFE[a.w];
    switch (k){
        case "schaerfung": return `Schwing: <b>${esc(a.vor)}·${esc(a.nach)}</b>. Klingt das <b>${esc(v || "Vokal")}</b> kurz? Dann kommen <b>zwei gleiche</b> Mitlaute. Klingt es lang, nur einer.`;
        case "ie": return `Hör genau auf das i: Klingt es <b>lang</b> wie in Bie-ne? Dann meistens <b>ie</b>. Kurz wie in Kis-te? Dann <b>i</b>.`;
        case "sss": return `Klingt der Vokal davor <b>kurz</b>? Dann <b>ss</b>. Lang und das s <b>zischt</b> (Fü-ße)? Dann <b>ß</b>. Lang und es <b>summt</b> (Ho-se)? Dann <b>s</b>.`;
        case "cktz": return `Was steht vor dem Laut? Ein <b>l, n oder r</b>? Dann nur k oder z. Ein <b>kurzer Vokal</b>? Dann ck oder tz.`;
        case "auslaut": return h ? `Verlängere: <button class="ag-sag" data-sag="${esc(h)}">🔊 ${esc(sek() ? "Mehrzahl / Grundform" : "Hör mal")}</button> – was hörst du jetzt am Silbenanfang?` : `Verlängere das Wort (Mehrzahl oder „er“-Form) und sprich es laut.`;
        case "iglich": return h ? `Verlängere: <button class="ag-sag" data-sag="${esc(h)}">🔊 Hör mal</button> – hörst du <b>-i-ger</b> oder <b>-li-cher</b>?` : `Verlängere: lustig → lus-ti-ger, fröhlich → fröh-li-cher.`;
        case "silbenh": return `Schwing langsam. Hörst du zwei Silben, die direkt aneinanderstoßen (ge-hen)? Dann trennt sie oft ein <b>h</b>.`;
        case "aeau": return h ? `Verwandtes Wort: <b>${esc(h)}</b>. Steht da ein a oder au? Dann schreibst du ä oder äu.` : `Findest du kein verwandtes Wort mit a oder au? Dann schreibst du e oder eu.`;
        case "dasdass": return `Setz <b>„dieses“</b> oder <b>„welches“</b> ein. Passt es? Dann <b>das</b>. Passt es nicht? Dann <b>dass</b>.`;
        case "grossklein": return `Artikelprobe: Kannst du <b>der, die, das</b> oder <b>beim/zum</b> davorsetzen? Dann ist es ein Nomen – groß!`;
    }
    return STRATEGIE[STRAT_VON[k]]?.kurz || "";
}

/* ---------- Wortschatz nur aus richtigen Wörtern ---------- */
let LEXIKON = null;
function lexikon(){
    if (LEXIKON) return LEXIKON;
    const set = new Set();
    bilder().forEach(b => set.add(b.w));
    Object.values(SP_RS).forEach(d => [...d.treffer, ...d.kontrast].forEach(w => { if (/^[A-Za-zÄÖÜäöüß]+$/.test(w)) set.add(w); }));
    SP_MINIMAL.flat().forEach(w => set.add(w)); SP_REIME.flat().forEach(w => set.add(w));
    return LEXIKON = [...set];
}
function abstand(a, b){ a = a.toLowerCase(); b = b.toLowerCase(); const d = Array.from({ length: a.length + 1 }, (_, i) => [i]); for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[a.length][b.length]; }
// ähnliche ECHTE Wörter (zum genauen Lesen) – nie Fantasie- oder Fehlerschreibungen
function aehnlicheEchte(w, n = 2, pruef = lesbar){
    const kandidaten = lexikon().filter(x => x !== w && pruef(x) && Math.abs(x.length - w.length) <= 2);
    const nah = kandidaten.map(x => [x, abstand(w, x) + (x[0].toLowerCase() === w[0].toLowerCase() ? 0 : .6)]).filter(x => x[1] <= 2.6).sort((a, b) => a[1] - b[1]);
    return mischen(nah.slice(0, 8)).slice(0, n).map(x => x[0]);
}

/* ---------- Aufgaben-Erzeuger ---------- */
// Rechtschreibung mit Strategie (Lücke, ggf. mit Vorfrage kurz/lang). Merkwort-Schwerpunkte → Bauen.
function rsAufgaben(k, n){
    if (STRAT_VON[k] === "merken") return merkAufgaben(n, k);
    const d = SP_RS[k], f = LUECKE[k], eigene = kindWoerter(k), aus = new Set(d.treffer);
    const quelle = [...mischen(eigene), ...mischen([...d.treffer, ...d.kontrast].filter(w => !eigene.includes(w)))], gesehen = new Set(), liste = [];
    for (const w of quelle){
        if (!w || w === "–" || gesehen.has(w)) continue; gesehen.add(w);
        const l = f(w); if (!l) continue;
        const ganz = w.replace(/\*/g, "");
        liste.push({ typ: "luecke", k, w: ganz, roh: w, vor: l.vor, nach: l.nach, richtig: l.richtig, opts: l.opts, satz: !!l.satz,
            vorfrage: laenge(k, w, aus.has(w)), strategie: STRAT_VON[k], sag: l.satz ? "" : ganz });
        if (liste.length >= n) break;
    }
    return liste;
}
// Merkwörter & Fehlerwörter: richtiges Wortbild ansehen → abdecken → aufbauen
function merkAufgaben(n, k){
    let pool = mischen(kindWoerter(k));
    if (k) pool = [...pool, ...mischen(SP_RS[k].treffer.filter(w => /^[A-Za-zÄÖÜäöüß]+$/.test(w)))];
    else pool = [...pool, ...mischen(sek() ? Object.keys(SP_RS).flatMap(rsWoerter) : bilder().filter(b => lesbar(b.w)).map(b => b.w))];
    const set = new Set();
    return pool.filter(w => /^[A-Za-zÄÖÜäöüß]+$/.test(w) && w.length >= 3 && w.length <= (sek() ? 13 : 8) && !set.has(w) && set.add(w)).slice(0, n)
        .map(w => ({ typ: "bauen", w, sag: w, strategie: "merken", k: k || "" }));
}
function anlautAufg(n){
    return anlautAufgaben(n).map(a => ({ typ: "wahl", w: a.w, svg: a.svg, sag: a.w, frage: "Womit fängt das Wort an?", opts: a.opts, richtig: a.richtig,
        optHtml: z => z[0].toUpperCase() + z.slice(1) + " " + z, tipp: `Sprich das Wort langsam und hör auf den <b>ersten Laut</b>.`, loesung: a.w }));
}
function bildWortAufg(n){
    return mischen(bilder().filter(b => lesbar(b.w) && b.w.length <= 9)).map(b => { const v = aehnlicheEchte(b.w, 2); if (v.length < 2) return null;
        return { typ: "wahl", w: b.w, svg: b.svg, frage: "Welches Wort passt zum Bild?", opts: mischen([b.w, ...v]), richtig: b.w, tipp: "Lies jedes Wort langsam in Silben – und schau auf den Anfang und das Ende.", loesung: b.w, lesen: true }; })
        .filter(Boolean).slice(0, n);
}
function blitzAufg(n){
    const pool = mischen(bilder().filter(b => lesbar(b.w) && b.w.length <= 9));
    return pool.slice(0, n).map(b => { const andere = mischen(pool.filter(x => x.w !== b.w && x.w[0] === b.w[0])).slice(0, 2);
        while (andere.length < 2){ const x = pool[Math.floor(Math.random() * pool.length)]; if (x.w !== b.w && !andere.includes(x)) andere.push(x); }
        return { typ: "blitz", w: b.w, opts: mischen([b, ...andere]), richtig: b.w, loesung: b.w }; });
}
function reimAufg(n){
    return mischen(SP_REIME.filter(p => p.every(lesbar))).slice(0, n).map(([a, b]) => {
        const andere = mischen(lexikon().filter(x => lesbar(x) && x !== b && x !== a && x.slice(-3).toLowerCase() !== a.slice(-3).toLowerCase() && x[0] === b[0])).slice(0, 2);
        if (andere.length < 2) andere.push(...mischen(lexikon().filter(x => lesbar(x) && x.slice(-2) !== a.slice(-2))).slice(0, 2 - andere.length));
        return { typ: "wahl", w: a, sag: a, html: `Was reimt sich auf <b>${esc(a)}</b>?`, opts: mischen([b, ...andere]), richtig: b, tipp: `Sprich beide Wörter laut. Klingt das <b>Ende</b> gleich?`, loesung: `${a} – ${b}`, sagOpts: true };
    });
}
function silbenAufg(n){
    return silbenAufgaben(n).map(a => ({ typ: "silben", w: a.w, svg: a.svg, sag: a.w, teile: a.teile, loesung: a.w }));
}
/* ---------- Für Anfänger, die (noch) nicht lesen: nur Hören und Bilder ----------
   Vorläuferfähigkeiten: Reime hören, Silben klatschen, Anlaute hören, Silben zusammenziehen,
   Laut am Anfang ja/nein. Alles wird vorgelesen – es steht nichts da, was man lesen müsste. */
const REIMBILD = [["Maus", "Haus"], ["Hose", "Rose"], ["Igel", "Spiegel"], ["Schwein", "Stein"], ["Wal", "Schal"], ["Raupe", "Lupe"], ["Taube", "Schraube"], ["Zitrone", "Krone"], ["Melone", "Krone"],
    ["Rakete", "Trompete"], ["Papagei", "Ei"], ["Giraffe", "Affe"], ["Erdbeere", "Schere"], ["Taube", "Traube"], ["Schlange", "Zange"], ["Hai", "Ei"], ["Mais", "Eis"], ["Kanne", "Tanne"], ["Hund", "Mund"], ["Tisch", "Fisch"], ["Ball", "Stall"], ["Topf", "Kopf"], ["Sonne", "Tonne"], ["Baum", "Traum"]];
// Wörter, deren Aussprache nicht zur Schrift passt (Fremdwörter, G wie in Giraffe …) – für Hörspiele ungeeignet
const FREMD = new Set(["Keyboard", "Skateboard", "Croissant", "Burger", "Bowling", "Popcorn", "Shorts", "Muffin", "Aubergine", "Giraffe", "Genie", "Jeans", "Chips", "Hotdog", "Sandwich", "Laptop", "Computer", "Baseball", "Hamburger", "Cowboy", "T-Rex", "Smartphone", "Handy", "Teddy", "Brokkoli", "Zucchini", "Avocado", "Pommes", "Pizza", "Joghurt", "Rechenschieber", "Karussellpferd", "Schraubzwinge", "Medaille", "Champignon", "Trikot", "Jacke"]);
const hoerBilder = () => bilder().filter(b => !FREMD.has(b.w) && !/^(sh|ch|c|y|j|ph)/i.test(b.w));
const bildMap = () => { const m = {}; hoerBilder().forEach(b => { if (!m[b.w]) m[b.w] = b; }); return m; };
const ANFANG_LAUT = g => ({ sch: "sch", ch: "ch", ei: "ei", au: "au", eu: "eu", pf: "pf" })[g] || g;
function lautName(z){ return ({ a: "a", e: "e", i: "i", o: "o", u: "u", ei: "ei", au: "au", eu: "eu", sch: "sch", m: "mmm", s: "sss", f: "fff", l: "lll", n: "nnn", r: "rrr", w: "www" })[z] || z; }
// 1) Reime hören: Bild + gesprochenes Wort → welches Bild reimt sich?
function reimHoerAufg(n){
    const m = bildMap(), paare = mischen(REIMBILD.filter(p => m[p[0]] && m[p[1]]));
    const alle = hoerBilder();
    return paare.slice(0, n).map(([a, b]) => {
        const andere = mischen(alle.filter(x => x.w !== a && x.w !== b && x.w.slice(-2) !== b.slice(-2) && x.w.length <= 8)).slice(0, 2);
        const opts = mischen([m[b], ...andere]);
        return { typ: "bildwahl", w: b, ziel: m[a], frage: `Was reimt sich auf ${a}?`, sag: `Was reimt sich auf ${a}? … ${opts.map(o => o.w).join(" … ")}`, opts, richtig: b,
            tipp: `Sprich langsam: ${a} … und jetzt jedes Bild. Was klingt am Ende genauso?`, tippSag: `${a} … ${opts.map(o => o.w).join(" … ")}`, loesung: `${a} – ${b}` };
    });
}
// 2) Silben klatschen: Bild + Wort → wie oft klatschst du?
function klatschAufg(n){
    const pool = mischen(hoerBilder().filter(b => b.w.length <= 10 && silben(b.w).length <= 4));
    const proZahl = { 1: [], 2: [], 3: [], 4: [] }; pool.forEach(b => { const k = silben(b.w).length; if (proZahl[k] && proZahl[k].length < 6) proZahl[k].push(b); });
    const auswahl = mischen([...proZahl[1].slice(0, 2), ...proZahl[2].slice(0, 3), ...proZahl[3].slice(0, 3), ...proZahl[4].slice(0, 2)]).slice(0, n);
    return auswahl.map(b => { const sb = silben(b.w); return { typ: "klatschen", w: b.w, ziel: b, n: sb.length, sag: `${b.w}. Wie oft klatschst du?`, tippSag: sb.join(" … "), tipp: "Sprich das Wort ganz langsam und klatsch bei jeder Silbe.", loesung: b.w }; });
}
// 3) Anlaut hören: Welches Bild fängt genauso an wie …?
function anlautHoerAufg(n){
    const pool = hoerBilder().filter(b => !/^(sp|st|ch|qu|c|y|x|v|ph)/i.test(b.w) && b.w.length <= 9);
    const nach = {}; pool.forEach(b => { const a = anlaut(b.w); (nach[a] = nach[a] || []).push(b); });
    const laute = mischen(Object.keys(nach).filter(a => nach[a].length >= 2));
    return laute.slice(0, n).map(a => {
        const [z, r] = mischen(nach[a]).slice(0, 2), andere = mischen(pool.filter(x => anlaut(x.w) !== a && !"aeiouäöü".includes(anlaut(x.w)[0]) === !"aeiouäöü".includes(a[0]))).slice(0, 2);
        const opts = mischen([r, ...andere]);
        return { typ: "bildwahl", w: r.w, ziel: z, frage: `Was fängt so an wie ${z.w}?`, sag: `Welches Bild fängt so an wie ${z.w}? … ${opts.map(o => o.w).join(" … ")}`, opts, richtig: r.w,
            tipp: `Hör auf den ersten Laut: ${lautName(a)} … ${z.w}.`, tippSag: `${lautName(a)} … ${z.w} … ${opts.map(o => o.w).join(" … ")}`, loesung: `${z.w} – ${r.w}` };
    });
}
// 4) Roboter-Sprache: Silben zusammenziehen (Synthese)
function syntheseAufg(n){
    const pool = mischen(hoerBilder().filter(b => { const k = silben(b.w).length; return k >= 2 && k <= 4 && b.w.length <= 10; }));
    return pool.slice(0, n).map(b => { const andere = mischen(hoerBilder().filter(x => x.w !== b.w && x.w.length <= 10)).slice(0, 2), opts = mischen([b, ...andere]), sb = silben(b.w);
        return { typ: "bildwahl", w: b.w, frage: "Robo spricht in Silben. Welches Bild meint er?", sag: `Robo sagt: ${sb.join(" …… ")}. Welches Bild ist das?`, opts, richtig: b.w, robo: true,
            tipp: "Sag die Silben schneller hintereinander – dann hörst du das Wort.", tippSag: sb.join(" … "), loesung: b.w }; });
}
// 5) Laut-Detektiv: Hörst du am Anfang ein …?
function lautJaNeinAufg(n){
    const pool = hoerBilder().filter(b => !/^(sp|st|ch|qu|c|y|x|v|ph)/i.test(b.w) && b.w.length <= 9);
    const laute = ["m", "s", "l", "a", "o", "f", "r", "n", "e", "i", "u", "w"];
    return mischen(pool).slice(0, n).map(b => { const ja = Math.random() < .5, l = ja ? anlaut(b.w) : mischen(laute.filter(x => x !== anlaut(b.w)))[0];
        return { typ: "janein", w: b.w, ziel: b, laut: l, richtig: anlaut(b.w) === l ? "ja" : "nein", sag: `${b.w}. Hörst du am Anfang ein ${lautName(l)}?`, tipp: `Sprich ganz langsam und dehne den Anfang: ${b.w}.`, tippSag: `${lautName(anlaut(b.w))} … ${b.w}`, loesung: b.w }; });
}
function vorlesePassend(n){ return mischen([...reimHoerAufg(3), ...klatschAufg(3), ...anlautHoerAufg(3), ...syntheseAufg(2)]).slice(0, n); }

// Mischung nach Kind
function passendeAufgaben(n){
    if (!sek() && (!S.kind || !S.kind.r.length) && (buchstaben() || S.klasse <= 1)) return mischen([...anlautAufg(4), ...bildWortAufg(3), ...silbenAufg(3)]).slice(0, n);
    return rsAufgaben(S.rs, n);
}

/* ---------- Darstellung einer Aufgabe ---------- */
const css = `
.ag{ display:flex; flex-direction:column; align-items:center; gap:16px; width:100%; text-align:center; }
.ag-strat{ display:inline-flex; gap:8px; align-items:center; background:#edf2e3; color:#2f4a1f; border-radius:999px; padding:6px 14px; font-weight:900; font-size:14px; font-family:Nunito, sans-serif; }
.ag-frage{ font-family:Nunito, sans-serif; font-weight:800; font-size:clamp(17px, 3.8vw, 21px); color:#3d4a38; }
.ag-wort{ font-family:var(--wort); font-size:clamp(38px, 9vw, 68px); line-height:1.3; color:#2d3530; letter-spacing:.02em; }
.ag-wort.satz{ font-size:clamp(22px, 5vw, 34px); line-height:1.5; }
.ag-luecke{ display:inline-block; min-width:1.3em; border-bottom:5px solid #b3c69a; color:#557428; }
.ag-luecke.ok{ background:#edf2e3; border-color:#557428; border-radius:8px 8px 0 0; }
.ag-zeile{ display:flex; gap:12px; flex-wrap:wrap; justify-content:center; width:100%; }
.ag-knopf{ min-width:110px; min-height:74px; padding:10px 22px; border-radius:20px; border:3px solid #dfe6d4; background:#fff; color:#2d3530; font-family:var(--wort); font-size:clamp(24px, 5vw, 34px); box-shadow:0 4px 0 #dfe6d4; cursor:pointer; }
.ag-knopf.text{ font-family:Nunito, sans-serif; font-weight:900; font-size:20px; }
.ag-knopf.ok{ border-color:#557428; background:#edf2e3; box-shadow:0 4px 0 #557428; }
.ag-knopf.nein{ border-color:#e6c3b5; background:#fbf1ec; animation:ag-w .35s; }
.ag-knopf.bild{ padding:8px; min-width:0; width:clamp(96px, 26vw, 150px); height:clamp(96px, 26vw, 150px); } .ag-knopf.bild svg{ width:100%; height:100%; }
@keyframes ag-w{ 25%{ transform:translateX(-6px); } 75%{ transform:translateX(6px); } }
.ag-tipp{ background:#fff7e6; border:2px solid #f0dfb8; border-radius:16px; padding:12px 16px; font-family:Nunito, sans-serif; font-weight:700; font-size:16.5px; color:#5b4a22; max-width:620px; line-height:1.45; text-align:left; }
.ag-tipp b{ color:#2f4a1f; }
.ag-sag, .ag-hoer{ border:0; background:#fff; border-radius:999px; padding:8px 14px; font:inherit; font-weight:900; color:#557428; box-shadow:0 3px 10px rgba(47,74,31,.12); cursor:pointer; }
.ag-hoer{ width:58px; height:58px; padding:0; font-size:22px; border-radius:50%; }
.ag-tippknopf{ border:0; background:none; color:#8a6a4b; font-family:Nunito, sans-serif; font-weight:900; font-size:15px; cursor:pointer; text-decoration:underline; }
.ag-bild{ width:min(40vw, 170px); height:min(40vw, 170px); } .ag-bild svg{ width:100%; height:100%; }
.ag-loesung{ font-family:var(--wort); font-size:clamp(34px, 8vw, 58px); color:#2f4a1f; }
.ag-loesung .sb{ display:inline-block; padding:0 .06em 6px; background:radial-gradient(ellipse at 50% 100%, transparent 58%, #b3c69a 60%, #b3c69a 66%, transparent 68%) no-repeat bottom / 100% 14px; }
.ag-plaetze{ display:flex; gap:6px; flex-wrap:wrap; justify-content:center; min-height:80px; align-items:flex-end; }
.ag-platz{ min-width:44px; height:72px; border-bottom:4px solid #b3c69a; font-family:var(--wort); font-size:40px; display:flex; align-items:flex-end; justify-content:center; padding:0 4px; color:#2d3530; }
.ag-platz.silbe{ min-width:86px; }
.ag-kachel{ min-width:62px; height:70px; padding:0 14px; border-radius:16px; border:3px solid #dfe6d4; background:#fff; font-family:var(--wort); font-size:32px; box-shadow:0 4px 0 #dfe6d4; cursor:pointer; color:#2d3530; }
.ag-kachel.weg{ visibility:hidden; } .ag-kachel.nein{ animation:ag-w .35s; border-color:#e6c3b5; }
.ag-merk{ font-family:var(--wort); font-size:clamp(40px, 10vw, 72px); color:#2d3530; background:#fff; border-radius:22px; padding:10px 28px; box-shadow:0 6px 20px rgba(47,74,31,.1); }
.ag-weiter{ border:0; background:#557428; color:#fff; border-radius:18px; padding:14px 28px; font-family:Nunito, sans-serif; font-weight:900; font-size:18px; box-shadow:0 4px 0 #2f4a1f; cursor:pointer; }
.ag-hoer.gross{ width:78px; height:78px; font-size:32px; }
.ag-frage.ag-klein{ font-size:15px; color:#8a957f; }
.ag-knopf.gross{ font-size:44px; min-width:130px; display:flex; flex-direction:column; align-items:center; } .ag-knopf.gross small{ font-size:15px; font-family:Nunito, sans-serif; }
.ag-knopf.klatsch{ font-size:clamp(22px, 5vw, 30px); letter-spacing:-2px; min-width:90px; }
.ag-blitz{ min-height:110px; display:flex; align-items:center; justify-content:center; }
.ag-dunkel .ag-frage, .ag-dunkel .ag-tippknopf{ color:#fff; }
`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

function silbenHtml(w){ return silben(w).map(s => `<span class="sb">${esc(s)}</span>`).join(""); }
function hoerKnopf(t){ return t ? `<button class="ag-hoer" data-sag="${esc(t)}" title="Vorlesen">🔊</button>` : ""; }
function sagVerbinden(el){ el.querySelectorAll("[data-sag]").forEach(b => b.onclick = ev => { ev.stopPropagation(); sprechen(b.dataset.sag); }); }

// Zeigt eine Aufgabe; fertig({ versuche, hilfe }) wird erst gerufen, wenn das Kind sie (ggf. mit Hilfe) richtig gelöst hat
function zeigen(feld, a, fertig, opt = {}){
    const box = document.createElement("div"); box.className = "ag" + (opt.dunkel ? " ag-dunkel" : "");
    feld.innerHTML = ""; feld.appendChild(box);
    let versuche = 0, hilfe = false;
    const ende = () => { const r = { versuche, hilfe, erst: versuche === 0 && !hilfe }; setTimeout(() => fertig(r), opt.pause ?? 1100); };
    const tippZeigen = html => { let t = box.querySelector(".ag-tipp"); if (!t){ t = document.createElement("div"); t.className = "ag-tipp"; box.appendChild(t); } t.innerHTML = "💡 " + html; sagVerbinden(t); hilfe = true; };
    const loesungZeigen = () => { const l = document.createElement("div"); l.className = "ag-loesung"; l.innerHTML = a.satz ? esc(a.w) : silbenHtml(a.w); box.appendChild(l); };
    const falsch = (tippHtml, b) => {
        versuche++;
        if (b){ b.classList.remove("nein"); void b.offsetWidth; b.classList.add("nein"); }
        opt.beiFehler && opt.beiFehler(versuche);
        if (versuche === 1 && tippHtml){ tippZeigen(tippHtml); return false; }
        return true;   // zweiter Fehler: Lösung zeigen
    };
    if (a.typ === "luecke"){
        const s = STRATEGIE[a.strategie];
        const wortHtml = r => `${esc(a.vor)}<span class="ag-luecke${r ? " ok" : ""}">${r ? (a.richtig === "–" ? "✓" : esc(a.richtig)) : "&nbsp;&nbsp;"}</span>${esc(a.nach)}`;
        box.innerHTML = `<div class="ag-strat">${s.ico} ${esc(s.name)}</div>${a.sag ? hoerKnopf(a.sag) : ""}<div class="ag-wort${a.satz ? " satz" : ""}" id="ag-w">${wortHtml(false)}</div><div class="ag-frage" id="ag-f"></div><div class="ag-zeile" id="ag-z"></div>
            <button class="ag-tippknopf" id="ag-t">Tipp</button>`;
        sagVerbinden(box);
        if (a.sag && !sek()) setTimeout(() => sprechen(a.sag), 200);
        box.querySelector("#ag-t").onclick = () => tippZeigen(tipp(a.k, a));
        const lueckeFragen = () => {
            box.querySelector("#ag-f").textContent = a.satz ? "Was gehört in die Lücke?" : "Welcher Baustein fehlt?";
            const z = box.querySelector("#ag-z"); z.innerHTML = "";
            a.opts.forEach(o => { const b = document.createElement("button"); b.className = "ag-knopf"; b.textContent = o; z.appendChild(b);
                b.onclick = () => { if (z.dataset.fertig) return;
                    if (o === a.richtig){ z.dataset.fertig = 1; b.classList.add("ok"); box.querySelector("#ag-w").innerHTML = wortHtml(true); if (!a.satz) loesungZeigen(); if (a.sag) sprechen(a.sag); ende(); }
                    else if (falsch(tipp(a.k, a), b)){ z.dataset.fertig = 1; [...z.children].find(x => x.textContent === a.richtig)?.classList.add("ok"); box.querySelector("#ag-w").innerHTML = wortHtml(true); if (!a.satz) loesungZeigen(); if (a.sag) sprechen(a.sag); ende(); }
                }; });
        };
        if (a.vorfrage){
            box.querySelector("#ag-f").textContent = `Schwing das Wort. Klingt der Selbstlaut ${vokalVor(a) ? `„${vokalVor(a)}“ ` : ""}kurz oder lang?`;
            const z = box.querySelector("#ag-z");
            ["kurz", "lang"].forEach(o => { const b = document.createElement("button"); b.className = "ag-knopf text"; b.textContent = o === "kurz" ? (sek() ? "kurz" : "kurz ⚡") : (sek() ? "lang" : "lang 〰️"); z.appendChild(b);
                b.onclick = () => { if (o === a.vorfrage){ b.classList.add("ok"); setTimeout(lueckeFragen, 450); }
                    else { versuche++; b.classList.remove("nein"); void b.offsetWidth; b.classList.add("nein"); opt.beiFehler && opt.beiFehler(versuche);
                        tippZeigen(`Sprich langsam: ${a.sag ? `<button class="ag-sag" data-sag="${esc(a.sag)}">🔊 noch mal</button>` : ""} Bei einem <b>kurzen</b> Selbstlaut ist der Mund schnell wieder zu, ein <b>langer</b> klingt gedehnt.`); } }; });
        } else lueckeFragen();
    }
    if (a.typ === "wahl"){
        box.innerHTML = `${a.svg ? `<div class="ag-bild">${a.svg}</div>` : ""}${a.sag && !a.html ? hoerKnopf(a.sag) : ""}${a.html ? `<div class="ag-wort satz">${a.html} ${a.sag ? `<button class="ag-sag" data-sag="${esc(a.sag)}">🔊</button>` : ""}</div>` : ""}
            <div class="ag-frage">${esc(a.frage || "")}</div><div class="ag-zeile" id="ag-z"></div><button class="ag-tippknopf" id="ag-t">Tipp</button>`;
        sagVerbinden(box);
        if (a.sag && !a.html) setTimeout(() => sprechen(a.sag), 200);
        box.querySelector("#ag-t").onclick = () => tippZeigen(a.tipp);
        const z = box.querySelector("#ag-z");
        a.opts.forEach(o => { const b = document.createElement("button"); b.className = "ag-knopf"; b.innerHTML = a.optHtml ? a.optHtml(o) : esc(o); z.appendChild(b);
            b.onclick = () => { if (z.dataset.fertig) return; if (a.sagOpts) sprechen(o);
                if (o === a.richtig){ z.dataset.fertig = 1; b.classList.add("ok"); if (a.lesen) sprechen(o); ende(); }
                else if (falsch(a.tipp, b)){ z.dataset.fertig = 1; [...z.children][a.opts.indexOf(a.richtig)].classList.add("ok"); if (a.sag) sprechen(a.sag); ende(); } }; });
    }
    if (a.typ === "bildwahl" || a.typ === "janein" || a.typ === "klatschen"){
        const optHtml = a.typ === "bildwahl" ? a.opts.map((o, i) => `<button class="ag-knopf bild" data-o="${i}">${o.svg}</button>`).join("")
            : a.typ === "janein" ? `<button class="ag-knopf text gross" data-o="ja">👍<small>ja</small></button><button class="ag-knopf text gross" data-o="nein">👎<small>nein</small></button>`
            : [1, 2, 3, 4].map(k => `<button class="ag-knopf text klatsch" data-o="${k}">${"👏".repeat(k)}</button>`).join("");
        box.innerHTML = `${a.ziel ? `<div class="ag-bild">${a.ziel.svg}</div>` : a.robo ? `<div style="font-size:84px;line-height:1">🤖</div>` : ""}
            <button class="ag-hoer gross" id="ag-nochmal" title="Noch mal hören">🔊</button><div class="ag-frage ag-klein">${esc(a.frage || "")}</div>
            <div class="ag-zeile" id="ag-z">${optHtml}</div><button class="ag-tippknopf" id="ag-t">💡 Tipp</button>`;
        const z = box.querySelector("#ag-z");
        const sagen = () => sprechen(a.sag);
        box.querySelector("#ag-nochmal").onclick = sagen; setTimeout(sagen, 250);
        box.querySelector("#ag-t").onclick = () => { tippZeigen(esc(a.tipp)); sprechen(a.tippSag || a.tipp); };
        const richtigIst = b => a.typ === "bildwahl" ? a.opts[+b.dataset.o].w === a.richtig : String(b.dataset.o) === String(a.typ === "klatschen" ? a.n : a.richtig);
        z.querySelectorAll("button").forEach(b => b.onclick = () => {
            if (z.dataset.fertig) return;
            if (richtigIst(b)){ z.dataset.fertig = 1; b.classList.add("ok"); sprechen(a.typ === "klatschen" ? silben(a.w).join(" … ") : a.loesung.replace("–", "und")); ende(); }
            else { if (a.typ === "bildwahl") sprechen(a.opts[+b.dataset.o].w);
                if (falsch(esc(a.tipp), b)){ z.dataset.fertig = 1; [...z.children].find(richtigIst)?.classList.add("ok"); sprechen(a.typ === "klatschen" ? silben(a.w).join(" … ") : a.loesung.replace("–", "und")); ende(); }
                else setTimeout(() => sprechen(a.tippSag || a.tipp), 700); }
        });
    }
    if (a.typ === "blitz"){
        const ms = laden("sp-blitz", sek() ? 700 : 1300);
        box.innerHTML = `<div class="ag-frage">Lies das Wort – dann tippe auf das passende Bild.</div><div class="ag-blitz ag-wort" id="ag-b">·</div><button class="ag-weiter" id="ag-los">Zeig das Wort</button><div class="ag-zeile" id="ag-z"></div>`;
        box.querySelector("#ag-los").onclick = ev => { ev.target.remove(); const bz = box.querySelector("#ag-b"); bz.textContent = a.w;
            setTimeout(() => { bz.textContent = "·"; const z = box.querySelector("#ag-z");
                a.opts.forEach(o => { const b = document.createElement("button"); b.className = "ag-knopf bild"; b.innerHTML = o.svg; z.appendChild(b);
                    b.onclick = () => { if (z.dataset.fertig) return;
                        if (o.w === a.richtig){ z.dataset.fertig = 1; b.classList.add("ok"); bz.textContent = a.w; sprechen(a.w); ende(); }
                        else if (falsch(`Das Wort war kurz zu sehen. <button class="ag-sag" id="ag-nochmal">👁️ noch mal zeigen</button>`, b)){ z.dataset.fertig = 1; [...z.children][a.opts.findIndex(x => x.w === a.richtig)].classList.add("ok"); bz.textContent = a.w; ende(); }
                        const n = box.querySelector("#ag-nochmal"); if (n) n.onclick = () => { bz.textContent = a.w; setTimeout(() => { if (!z.dataset.fertig) bz.textContent = "·"; }, ms); };
                    }; });
            }, ms); };
    }
    if (a.typ === "bauen" || a.typ === "silben"){
        const teile = a.typ === "silben" ? a.teile : grapheme(a.w);
        const bauenStart = () => {
            let pos = 0;
            let kacheln = teile.map((t, i) => ({ t, i })); kacheln = mischen(kacheln); if (kacheln.length > 1 && kacheln.every((x, i) => x.i === i)) kacheln.reverse();
            box.innerHTML = `${a.svg && a.typ === "silben" ? `<div class="ag-bild">${a.svg}</div>` : ""}${hoerKnopf(a.sag)}<div class="ag-frage">${a.typ === "silben" ? "Leg die Silben in die richtige Reihenfolge." : "Bau das Wort wieder auf."}</div>
                <div class="ag-plaetze" id="ag-p">${teile.map(() => `<div class="ag-platz${a.typ === "silben" ? " silbe" : ""}"></div>`).join("")}</div><div class="ag-zeile" id="ag-k"></div>
                ${a.typ === "bauen" ? `<button class="ag-tippknopf" id="ag-t">👁️ Noch mal ansehen</button>` : ""}`;
            sagVerbinden(box);
            const t = box.querySelector("#ag-t");
            if (t) t.onclick = () => { hilfe = true; const p = box.querySelector("#ag-p"), alt = p.innerHTML; p.innerHTML = `<div class="ag-merk">${esc(a.w)}</div>`; setTimeout(() => { p.innerHTML = alt; }, 1600); };
            kacheln.forEach(x => { const b = document.createElement("button"); b.className = "ag-kachel"; b.textContent = x.t; box.querySelector("#ag-k").appendChild(b);
                b.onclick = () => {
                    if (teile[pos] === x.t){ const p = box.querySelector("#ag-p").children[pos]; p.textContent = x.t; b.classList.add("weg"); pos++;
                        if (pos === teile.length){ const l = document.createElement("div"); l.className = "ag-loesung"; l.innerHTML = silbenHtml(a.w); box.appendChild(l); sprechen(a.w); ende(); } }
                    else { versuche++; b.classList.remove("nein"); void b.offsetWidth; b.classList.add("nein"); opt.beiFehler && opt.beiFehler(versuche);
                        if (versuche === 2 && a.typ === "bauen" && t) t.click(); }
                }; });
        };
        if (a.typ === "bauen"){
            box.innerHTML = `<div class="ag-strat">${STRATEGIE.merken.ico} ${a.k ? esc(STRATEGIE[STRAT_VON[a.k]]?.name || "Merkwort") : "Merkwort"}</div><div class="ag-frage">Schau dir das Wort genau an. Sprich es in Silben mit.</div>
                <div class="ag-merk">${silbenHtml(a.w)}</div>${hoerKnopf(a.sag)}<button class="ag-weiter" id="ag-ok">Gemerkt – abdecken!</button>`;
            sagVerbinden(box); if (!sek()) setTimeout(() => sprechen(a.w), 200);
            box.querySelector("#ag-ok").onclick = bauenStart;
        } else bauenStart();
    }
    return box;
}
window.AG = { zeigen, reimHoerAufg, klatschAufg, anlautHoerAufg, syntheseAufg, lautJaNeinAufg, vorlesePassend, rsAufgaben, merkAufgaben, anlautAufg, bildWortAufg, blitzAufg, reimAufg, silbenAufg, passendeAufgaben, STRATEGIE, STRAT_VON, silbenHtml };
})();
