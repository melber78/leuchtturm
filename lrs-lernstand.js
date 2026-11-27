/* ============================================================
   Leuchtturm – Lernstand & Förderbericht (Tab in der Kinder-Akte)
   Kurztests mit festen Wortlisten (immer gleich → vergleichbar):
   Lesetempo (1 Minute), Mini-Diktat (12 Wörter), Buchstabenkenntnis.
   Verlauf als Grafik, Förderbericht zum Ausdrucken.
   Gespeichert wird nur unter dem Kürzel.
   ============================================================ */
(function(){
const root = document.getElementById("lernstand");
if (!root) return;

/* ---------- feste Testlisten ---------- */
const STUFEN = { A: "Kl. 1–2", B: "Kl. 3–4", C: "Kl. 5–9" };
const stufeVon = k => { k = parseInt(k, 10) || 0; return k >= 5 ? "C" : k >= 3 ? "B" : "A"; };
const LESELISTE = {
    A: "Oma Ball Hut Eis Maus Hund Sofa Nase Rose Tor Mond Sonne Hase Auto Tisch Ente Igel Brot Kind Baum Esel Rad Lampe Hose Wal Uhr Tomate Kuh Salz Dose Fisch Note Wolke Gabel Pilz Nest Ofen Tasse Limo Tafel Blume Haus Buch Ufer Kamel Ring Mantel Regen Puppe Wagen Insel Turm Tiger Seil Bus Leiter Kerze Feder Daumen Apfel Garten Löwe Zelt Banane Schule Rakete Schaf Biene Ameise Wurst Brille Hammer Stern Kirsche Schnee Pinsel Teppich Fenster Sessel Brücke".split(" "),
    B: "Fahrrad Schrank Spiegel Zucker Brief Fluss Kerze Wiese Pflaume Quelle Bäcker Zwerg Strumpf Kette Glocke Ziege Frosch Wolke Kissen Flasche Pflaster Schnecke Drachen Honig Trommel Schatten Kugel Leiter Socke Wecker Sprung Treppe Ritter Zauber Löffel Muschel Wetter Fenster Geschenk Gürtel Häuser Zwiebel Schwalbe Knopf Blitz Krone Mühle Sattel Pfeife Rätsel Stiefel Schlitten Höhle Kralle Wurzel Nadel Kamm Gras Busch Sturm Feuer Wagen Kreide Wippe Schwein Klavier Tunnel Eimer Kasten Brezel Futter Tempo Garage Kreisel Gabel Mütze Pinsel Fliege Balkon Wüste".split(" "),
    C: "Gewitter Bürgermeister Wissenschaft Verabredung Schwierigkeit Krankenhaus Überraschung Abenteuer Geschwindigkeit Rechtschreibung Fahrkarte Erfahrung Gesellschaft Mannschaft Wettbewerb Unterschrift Erinnerung Sehenswürdigkeit Zeitschrift Hausaufgabe Feuerwehr Bibliothek Taschenrechner Verkehr Entscheidung Möglichkeit Vorstellung Freundschaft Wirklichkeit Geschichte Kühlschrank Lautsprecher Klassenfahrt Wochenende Gleichgewicht Verantwortung Ergebnis Bewerbung Fernseher Mittagessen Spielplatz Wasserfall Schlüsselbund Umgebung Bedeutung Jahreszeit Werkstatt Turnhalle Schreibtisch Kopfhörer Regenschirm Briefkasten Luftballon Stundenplan Fußgänger Aufmerksamkeit Gewohnheit Unterhaltung Besonderheit Zusammenarbeit Haltestelle Eisenbahn Gemeinschaft Vergangenheit Zukunft Achterbahn Taschenlampe Bürgersteig Schwimmbad Erdbeere Geburtstag Kalender Rucksack Wörterbuch Pausenhof Ausflug Ferien".split(" "),
};
const DIKTAT = {
    A: [["Mama", "lautgetreu"], ["Sofa", "lautgetreu"], ["Limo", "lautgetreu"], ["Rose", "lautgetreu"], ["Nase", "lautgetreu"], ["Hund", "auslaut"], ["Ball", "schaerfung"], ["Sonne", "schaerfung"], ["Biene", "ie"], ["Schule", "lautgetreu"], ["Kind", "auslaut"], ["Fisch", "lautgetreu"]],
    B: [["Wald", "auslaut"], ["Kanne", "schaerfung"], ["Zucker", "cktz"], ["Katze", "cktz"], ["Fahne", "dehnung"], ["Brief", "ie"], ["Fluss", "sss"], ["Fuß", "sss"], ["Bäume", "aeau"], ["Spiegel", "spst"], ["Vogel", "vf"], ["fröhlich", "iglich"]],
    C: [["Schwimmbad", "schaerfung"], ["Brücke", "cktz"], ["verlieren", "vf"], ["Gießkanne", "sss"], ["gefährlich", "aeau"], ["Fahrzeug", "dehnung"], ["wiederholen", "ie"], ["plötzlich", "cktz"], ["Stängel", "aeau"], ["mutig", "iglich"], ["Spaziergang", "spst"], ["Taxi", "chsx"]],
};
const DIKTAT_NAMEN = { lautgetreu: "lautgetreu schreiben", ...AF_RS };
const BUCHSTABEN = "m a l i o e s n r t u d h ei w k au b f g sch p z ch ä ö ü eu j v ie pf st sp qu x y c".split(" ");
const ARTEN = {
    lesen: { name: "Lesetempo", einheit: "Wörter/Min.", farbe: "#557428", text: "Richtig gelesene Wörter in 1 Minute (feste Wortliste)" },
    diktat: { name: "Mini-Diktat", einheit: "von 12 richtig", farbe: "#d9a23f", text: "12 feste Diktatwörter – richtig geschriebene Wörter" },
    buchstaben: { name: "Buchstabenkenntnis", einheit: "von " + BUCHSTABEN.length, farbe: "#8a6a4b", text: "Sicher erkannte Buchstaben und Laute" },
    eigen: { name: "Eigene Messung", einheit: "", farbe: "#5f7f9a", text: "" },
};
const heute = () => new Date().toISOString().slice(0, 10);
const esc = af_esc;
const sprich = t => { try { const u = new SpeechSynthesisUtterance(t); u.lang = "de-DE"; u.rate = .8; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e){} };

/* ---------- Stil ---------- */
const fl = document.createElement("link"); fl.rel = "stylesheet"; fl.href = "https://fonts.googleapis.com/css2?family=Andika:wght@400;700&display=swap"; document.head.appendChild(fl);
const st = document.createElement("style");
st.textContent = `
@font-face{ font-family:"Playwrite DE Grund"; font-weight:400; font-display:block; src:url("schriften/playwrite-de-grund-400.woff2") format("woff2"); }
@font-face{ font-family:"Fraunces"; font-weight:700; src:url("schriften/fraunces-700.woff2") format("woff2"); }
.ls-raster{ display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:14px; }
.ls-test{ border:2px solid #e6ecdc; border-radius:18px; padding:16px; background:#fbfcf8; }
.ls-test h3{ margin:0 0 4px; font-size:17px; color:var(--nacht); }
.ls-test p{ margin:0 0 10px; font-size:13.5px; color:#68745f; font-weight:700; }
.ls-test .knopf{ margin-right:6px; }
.ls-verlauf{ display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:14px; }
.ls-kurve{ border:2px solid #eef1e8; border-radius:18px; padding:14px; }
.ls-kurve h3{ margin:0; font-size:16px; } .ls-kurve .diff{ font-weight:900; font-size:14px; }
.ls-kurve svg{ width:100%; height:auto; display:block; margin-top:6px; }
.ls-liste{ width:100%; border-collapse:collapse; font-size:14px; } .ls-liste td, .ls-liste th{ text-align:left; padding:7px 8px; border-bottom:1px solid #edf1f4; }
.ls-liste button{ border:0; background:none; color:#b5583f; cursor:pointer; font-size:15px; }
#ls-voll{ position:fixed; inset:0; background:#f8f4ec; z-index:100; display:none; flex-direction:column; }
#ls-voll.an{ display:flex; }
.lsv-kopf{ display:flex; gap:10px; align-items:center; padding:12px 16px; background:#edf2e3; flex-wrap:wrap; }
.lsv-kopf b{ flex:1; font-size:17px; color:var(--nacht); }
.lsv-zeit{ font-size:30px; font-weight:900; color:var(--nacht); min-width:80px; text-align:center; }
.lsv-inhalt{ flex:1; overflow:auto; padding:18px; }
.lsv-woerter{ display:grid; grid-template-columns:repeat(auto-fill, minmax(150px, 1fr)); gap:8px 12px; font-family:"Andika", sans-serif; font-size:30px; }
.lsv-woerter.gs{ font-family:"Playwrite DE Grund", "Andika", sans-serif; }
.lsv-woerter button{ border:0; background:#fff; border-radius:12px; padding:8px 6px; font:inherit; color:#2d3530; cursor:pointer; border-bottom:3px solid transparent; }
.lsv-woerter button.falsch{ background:#fbe4dc; color:#9b3d26; text-decoration:line-through; }
.lsv-woerter button.ende{ outline:4px solid #d9a23f; }
.lsv-woerter button.danach{ opacity:.35; }
.lsv-hilfe{ font-weight:800; color:#68745f; margin:0 0 12px; }
.lsv-bst{ display:grid; grid-template-columns:repeat(auto-fill, minmax(104px, 1fr)); gap:10px; font-family:"Andika", sans-serif; font-size:40px; }
.lsv-bst.gs{ font-family:"Playwrite DE Grund", "Andika", sans-serif; }
.lsv-bst button{ border:0; background:#fff; border-radius:16px; height:86px; font:inherit; cursor:pointer; color:#2d3530; white-space:nowrap; overflow:hidden; }
.lsv-bst button.lang{ font-size:26px; }
.lsv-bst button.falsch{ background:#fbe4dc; color:#9b3d26; }
.lsv-diktat td{ padding:10px 8px; border-bottom:1px solid #e6ecdc; font-size:18px; } .lsv-diktat td.w{ font-family:"Andika", sans-serif; font-size:26px; }
.lsv-diktat label{ display:inline-flex; gap:6px; align-items:center; text-transform:none; letter-spacing:0; font-size:15px; color:#2d3530; margin:0 10px 0 0; }
.lsv-diktat input{ width:22px; height:22px; }
.fb-feld{ width:100%; min-height:90px; border:2px solid #ececec; border-radius:12px; padding:10px 14px; font:inherit; font-size:14px; }
/* Druck: Förderbericht */
#druck-plan .fb{ font-family:"Nunito", sans-serif; color:#2d3530; font-size:12.2px; line-height:1.45; }
#druck-plan .fb-kopf{ display:flex; justify-content:space-between; align-items:flex-end; border-bottom:2.5px solid #557428; padding-bottom:8px; margin-bottom:12px; }
#druck-plan .fb-kopf h1{ font-family:Fraunces, Georgia, serif; color:#2f4a1f; font-size:24px; margin:0; }
#druck-plan .fb-kopf img{ height:44px; }
#druck-plan .fb h2{ font-family:Fraunces, Georgia, serif; color:#2f4a1f; font-size:14.5px; margin:14px 0 5px; padding:3px 10px; background:#edf2e3; border-radius:6px; }
#druck-plan .fb-felder{ display:grid; grid-template-columns:1fr 1fr; gap:4px 24px; }
#druck-plan .fb table{ width:100%; border-collapse:collapse; } #druck-plan .fb td, #druck-plan .fb th{ border-bottom:1px solid #d8e0cc; padding:4px 6px; text-align:left; vertical-align:top; }
#druck-plan .fb th{ color:#557428; font-size:11px; text-transform:uppercase; letter-spacing:.3px; }
#druck-plan .fb-text{ white-space:pre-wrap; }
#druck-plan .fb-sign{ display:grid; grid-template-columns:1fr 1fr; gap:40px; margin-top:34px; } #druck-plan .fb-sign div{ border-top:1px solid #2d3530; padding-top:4px; font-size:11px; }
#druck-plan .fb svg{ max-width:100%; }
`;
document.head.appendChild(st);
const voll = document.createElement("div"); voll.id = "ls-voll"; document.body.appendChild(voll);

/* ---------- Hauptansicht ---------- */
function messungen(){ return (AKTE.lernstand || []).slice().sort((a, b) => a.datum.localeCompare(b.datum)); }
function zeichnen(){
    const stufe = stufeVon(AKTE.klasse);
    const ms = messungen();
    const gruppen = {};
    ms.forEach(m => { const key = m.art === "eigen" ? "eigen:" + m.name : m.art + ":" + (m.stufe || ""); (gruppen[key] = gruppen[key] || []).push(m); });
    root.innerHTML = `
    <div class="karte">
        <h2>Lernstand erheben</h2>
        <p class="klein" style="color:#7c8a94;font-weight:700;margin:0 0 14px">Immer dieselben Wortlisten – so siehst du schwarz auf weiß, was sich verändert. Stufe nach Klasse: <b>${STUFEN[stufe]}</b>
            <select id="ls-stufe" style="width:auto;display:inline-block;margin-left:6px">${Object.entries(STUFEN).map(([k, v]) => `<option value="${k}"${k === stufe ? " selected" : ""}>Stufe ${k} · ${v}</option>`).join("")}</select></p>
        <div class="ls-raster">
            <div class="ls-test"><h3>📖 Lesetempo</h3><p>1 Minute laut lesen. Du tippst falsch gelesene Wörter an und am Ende das letzte Wort.</p><button class="knopf voll" data-test="lesen">Test starten</button></div>
            <div class="ls-test"><h3>✍️ Mini-Diktat</h3><p>12 feste Wörter diktieren (auch zum Vorlesen lassen) und die falschen ankreuzen.</p><button class="knopf voll" data-test="diktat">Test starten</button></div>
            <div class="ls-test"><h3>🔤 Buchstaben</h3><p>Alle ${BUCHSTABEN.length} Buchstaben und Laute – unbekannte antippen. Übernimmt das Ergebnis auf Wunsch in den Förderplan.</p><button class="knopf voll" data-test="buchstaben">Test starten</button></div>
            <div class="ls-test"><h3>✏️ Eigene Messung</h3><p>Ergebnis aus einem anderen Test eintragen (z. B. HSP, SLRT, Fehlerzahl im Aufsatz).</p><button class="knopf" data-test="eigen">Eintragen</button></div>
        </div>
    </div>
    <div class="karte">
        <h2>Verlauf</h2>
        ${Object.keys(gruppen).length ? `<div class="ls-verlauf">${Object.entries(gruppen).map(([key, l]) => kurve(l)).join("")}</div>` : `<p class="leer-text">Noch keine Messungen. Am besten gleich zu Beginn der Förderung einmal alles erheben – dann alle 6–8 Wochen wiederholen.</p>`}
        ${ms.length ? `<details style="margin-top:14px"><summary class="knopf" style="list-style:none">Alle Messungen (${ms.length})</summary><table class="ls-liste" style="margin-top:10px"><tr><th>Datum</th><th>Test</th><th>Ergebnis</th><th>Notiz</th><th></th></tr>
            ${ms.slice().reverse().map(m => `<tr><td>${af_datum(m.datum)}</td><td>${esc(m.art === "eigen" ? m.name : ARTEN[m.art].name)}${m.stufe ? ` <small>(Stufe ${esc(m.stufe)})</small>` : ""}</td><td><b>${wertText(m)}</b></td><td>${esc(m.notiz || "")}</td><td><button data-weg="${esc(m.id)}" title="Löschen">🗑</button></td></tr>`).join("")}</table></details>` : ""}
    </div>
    <div class="karte">
        <h2>Förderbericht</h2>
        <p class="klein" style="color:#7c8a94;font-weight:700;margin:0 0 6px">Für Zeugniskonferenz, Elterngespräch oder Förderplan-Fortschreibung: Stunden, Schwerpunkte, Ziele, Lernstand und Lernbox – automatisch zusammengestellt, du ergänzt nur deine Einschätzung.</p>
        <button class="knopf voll" id="fb-auf">Bericht erstellen</button>
        <div id="fb-editor"></div>
    </div>`;
    root.querySelectorAll("[data-test]").forEach(b => b.onclick = () => ({ lesen: testLesen, diktat: testDiktat, buchstaben: testBuchstaben, eigen: eigeneMessung })[b.dataset.test](root.querySelector("#ls-stufe").value));
    root.querySelectorAll("[data-weg]").forEach(b => b.onclick = async () => { if (!confirm("Diese Messung löschen?")) return; try { await akte_api({ aktion: "lernstand_loeschen", id: b.dataset.weg }); zeichnen(); } catch (e){ alert(e.message); } });
    root.querySelector("#fb-auf").onclick = berichtEditor;
}
function wertText(m){
    if (m.art === "lesen") return `${m.wert} Wörter/Min.${m.fehler ? ` <small>(${m.fehler} Fehler)</small>` : ""}`;
    if (m.art === "eigen") return `${m.wert}${m.max ? " / " + m.max : ""}`;
    return `${m.wert} ${ARTEN[m.art].einheit}`;
}
function kurve(l){
    const m0 = l[0], a = ARTEN[m0.art], titel = m0.art === "eigen" ? m0.name : a.name + (m0.stufe ? ` · Stufe ${m0.stufe}` : "");
    const max = Math.max(...l.map(m => m.max || m.wert), 1) * (l.some(m => m.max) ? 1 : 1.15);
    const W = 300, H = 120, p = 26;
    const x = i => l.length === 1 ? W / 2 : p + i * (W - 2 * p) / (l.length - 1), y = v => H - 18 - (v / max) * (H - 36);
    const pfad = l.map((m, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(m.wert).toFixed(1)}`).join(" ");
    const diff = l.length > 1 ? Math.round((l.at(-1).wert - l[0].wert) * 10) / 10 : null;
    return `<div class="ls-kurve"><h3>${esc(titel)}</h3>
        ${diff !== null ? `<div class="diff" style="color:${diff >= 0 ? "#3d6b2a" : "#b5583f"}">${diff >= 0 ? "+" : ""}${String(diff).replace(".", ",")} seit ${af_datum(l[0].datum)}</div>` : `<div class="diff" style="color:#7c8a94">erste Messung</div>`}
        <svg viewBox="0 0 ${W} ${H}"><line x1="${p}" x2="${W - p}" y1="${H - 18}" y2="${H - 18}" stroke="#dfe6d4" stroke-width="2"/>
        <path d="${pfad}" fill="none" stroke="${a.farbe}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        ${l.map((m, i) => `<circle cx="${x(i)}" cy="${y(m.wert)}" r="6" fill="#fff" stroke="${a.farbe}" stroke-width="3"/><text x="${x(i)}" y="${y(m.wert) - 11}" text-anchor="middle" font-size="12" font-weight="800" fill="#2d3530">${String(m.wert).replace(".", ",")}</text>
            <text x="${x(i)}" y="${H - 3}" text-anchor="middle" font-size="10" fill="#7c8a94">${af_datum(m.datum).slice(0, 6)}</text>`).join("")}</svg></div>`;
}
async function speichern(m){
    try { await akte_api({ aktion: "lernstand_hinzu", messung: { datum: heute(), ...m } }); zeichnen(); }
    catch (e){ alert(e.message); }
}
function vollAuf(titel, rechts = ""){ voll.innerHTML = `<div class="lsv-kopf"><button class="knopf" id="lsv-zu">✕ Abbrechen</button><b>${titel}</b>${rechts}</div><div class="lsv-inhalt" id="lsv-inhalt"></div>`;
    voll.classList.add("an"); document.body.style.overflow = "hidden"; voll.querySelector("#lsv-zu").onclick = vollZu; return voll.querySelector("#lsv-inhalt"); }
function vollZu(){ voll.classList.remove("an"); voll.innerHTML = ""; document.body.style.overflow = ""; clearInterval(voll._uhr); try { speechSynthesis.cancel(); } catch (e){} }

/* ---------- Test: Lesetempo ---------- */
function testLesen(stufe){
    const woerter = LESELISTE[stufe];
    const inhalt = vollAuf(`Lesetempo · Stufe ${stufe}`, `<div class="lsv-zeit" id="lsv-zeit">1:00</div><button class="knopf voll" id="lsv-start">▶ Start</button>`);
    const gs = (stufe === "A" || stufe === "B") && !((parseInt(AKTE.klasse, 10) || 0) >= 5);
    inhalt.innerHTML = `<p class="lsv-hilfe">Das Kind liest die Wörter von links nach rechts, Zeile für Zeile. Du tippst falsch gelesene Wörter an (noch mal tippen = doch richtig). Nach einer Minute tippst du das letzte gelesene Wort an.</p>
        <div class="lsv-woerter${gs ? " gs" : ""}" id="lsv-w">${woerter.map((w, i) => `<button data-i="${i}">${esc(w)}</button>`).join("")}</div>`;
    let phase = "warten", rest = 60, ende = -1;
    const zeit = voll.querySelector("#lsv-zeit");
    const fertig = () => {
        phase = "ende"; clearInterval(voll._uhr); zeit.textContent = "Stopp!"; zeit.style.color = "#b5583f";
        inhalt.querySelector(".lsv-hilfe").innerHTML = "<b>Zeit um!</b> Tippe jetzt das letzte Wort an, das das Kind gelesen hat.";
    };
    voll.querySelector("#lsv-start").onclick = ev => {
        if (phase !== "warten") return;
        phase = "laeuft"; ev.target.remove();
        voll._uhr = setInterval(() => { rest--; zeit.textContent = `0:${String(rest).padStart(2, "0")}`; if (rest <= 0) fertig(); }, 1000);
    };
    inhalt.querySelector("#lsv-w").onclick = ev => {
        const b = ev.target.closest("button[data-i]"); if (!b) return;
        const i = +b.dataset.i;
        if (phase === "ende"){
            ende = i; inhalt.querySelectorAll("#lsv-w button").forEach(x => { x.classList.toggle("ende", +x.dataset.i === i); x.classList.toggle("danach", +x.dataset.i > i); });
            const fehler = [...inhalt.querySelectorAll("#lsv-w button.falsch")].filter(x => +x.dataset.i <= i).length, gelesen = i + 1;
            let box = inhalt.querySelector(".lsv-ergebnis");
            if (!box){ box = document.createElement("div"); box.className = "karte lsv-ergebnis"; box.style.marginTop = "16px"; inhalt.appendChild(box); }
            box.innerHTML = `<h2>${gelesen - fehler} richtig gelesene Wörter pro Minute</h2><p class="klein" style="font-weight:700">${gelesen} gelesen · ${fehler} Fehler</p>
                <label>Notiz (z. B. „liest silbenweise“, „rät oft“)</label><input type="text" id="lsv-notiz">
                <button class="knopf voll" id="lsv-ok" style="margin-top:10px">Speichern</button>`;
            box.scrollIntoView({ behavior: "smooth" });
            box.querySelector("#lsv-ok").onclick = () => { const falsch = [...inhalt.querySelectorAll("#lsv-w button.falsch")].filter(x => +x.dataset.i <= i).map(x => x.textContent);
                vollZu(); speichern({ art: "lesen", wert: gelesen - fehler, fehler, stufe, details: { gelesen, falsch }, notiz: box.querySelector("#lsv-notiz")?.value || "" }); };
            return;
        }
        b.classList.toggle("falsch");
    };
}

/* ---------- Test: Mini-Diktat ---------- */
function testDiktat(stufe){
    const liste = DIKTAT[stufe];
    const inhalt = vollAuf(`Mini-Diktat · Stufe ${stufe}`);
    inhalt.innerHTML = `<p class="lsv-hilfe">Diktiere jedes Wort einzeln (oder lass es mit 🔊 vorlesen). Das Kind schreibt auf ein Blatt. Danach kreuzt du an, welche Wörter falsch geschrieben sind.</p>
        <table class="lsv-diktat" style="width:100%;border-collapse:collapse">${liste.map(([w, sp], i) => `<tr><td style="width:40px">${i + 1}.</td><td class="w">${esc(w)}</td>
            <td><button class="knopf" data-sag="${esc(w)}">🔊</button></td><td><label><input type="checkbox" data-f="${i}"> falsch</label><small style="color:#7c8a94">${esc(DIKTAT_NAMEN[sp] || sp)}</small></td></tr>`).join("")}</table>
        <label>Notiz</label><input type="text" id="lsv-notiz" placeholder="z. B. lässt Endungen weg">
        <button class="knopf voll" id="lsv-ok" style="margin-top:12px">Speichern</button>`;
    inhalt.querySelectorAll("[data-sag]").forEach(b => b.onclick = () => sprich(b.dataset.sag));
    inhalt.querySelector("#lsv-ok").onclick = () => {
        const falsch = [...inhalt.querySelectorAll("[data-f]:checked")].map(c => +c.dataset.f);
        const bereiche = {}; falsch.forEach(i => { const sp = liste[i][1]; bereiche[sp] = (bereiche[sp] || 0) + 1; });
        vollZu(); speichern({ art: "diktat", wert: liste.length - falsch.length, max: liste.length, fehler: falsch.length, stufe, details: { falsch: falsch.map(i => liste[i][0]), bereiche }, notiz: inhalt.querySelector("#lsv-notiz").value });
    };
}

/* ---------- Test: Buchstaben ---------- */
function testBuchstaben(){
    const reihe = BUCHSTABEN.slice().sort(() => Math.random() - .5);
    const inhalt = vollAuf("Buchstabenkenntnis");
    inhalt.innerHTML = `<p class="lsv-hilfe">Das Kind nennt zu jedem Buchstaben den Laut. Tippe die an, die es <b>nicht</b> sicher kann.</p>
        <div class="lsv-bst${(parseInt(AKTE.klasse, 10) || 1) < 5 ? " gs" : ""}">${reihe.map(z => `<button data-z="${esc(z)}"${z.length > 1 ? ' class="lang"' : ""}>${esc(z.length === 1 ? z.toUpperCase() + " " + z : z[0].toUpperCase() + z.slice(1) + " " + z)}</button>`).join("")}</div>
        <label style="margin-top:14px"><input type="checkbox" id="lsv-plan" checked style="width:auto"> Sichere Buchstaben in den Förderplan übernehmen (für Buchstabenkurs & Lernspiele)</label>
        <button class="knopf voll" id="lsv-ok" style="margin-top:12px">Speichern</button>`;
    inhalt.querySelectorAll("[data-z]").forEach(b => b.onclick = () => b.classList.toggle("falsch"));
    inhalt.querySelector("#lsv-ok").onclick = async () => {
        const unsicher = [...inhalt.querySelectorAll("[data-z].falsch")].map(b => b.dataset.z);
        const sicher = BUCHSTABEN.filter(z => !unsicher.includes(z));
        const plan = inhalt.querySelector("#lsv-plan").checked;
        vollZu();
        if (plan){ try { await akte_api({ aktion: "lesebuchstaben", lb: sicher.join(" ") }); } catch (e){ alert(e.message); } }
        speichern({ art: "buchstaben", wert: sicher.length, max: BUCHSTABEN.length, fehler: unsicher.length, details: { unsicher } });
    };
}

/* ---------- Eigene Messung ---------- */
function eigeneMessung(){
    const inhalt = vollAuf("Eigene Messung eintragen");
    const namen = [...new Set(messungen().filter(m => m.art === "eigen").map(m => m.name))];
    inhalt.innerHTML = `<div class="karte" style="max-width:560px">
        <label>Was wurde gemessen?</label><input type="text" id="e-name" list="e-namen" placeholder="z. B. HSP Graphemtreffer, Fehler im Aufsatz"><datalist id="e-namen">${namen.map(n => `<option value="${esc(n)}">`).join("")}</datalist>
        <label>Ergebnis (Zahl)</label><input type="text" id="e-wert" inputmode="decimal">
        <label>von höchstens (optional)</label><input type="text" id="e-max" inputmode="decimal">
        <label>Datum</label><input type="text" id="e-datum" value="${heute()}" placeholder="JJJJ-MM-TT">
        <label>Notiz</label><input type="text" id="e-notiz">
        <button class="knopf voll" id="e-ok" style="margin-top:12px">Speichern</button></div>`;
    inhalt.querySelector("#e-ok").onclick = () => {
        const name = inhalt.querySelector("#e-name").value.trim(), wert = parseFloat(inhalt.querySelector("#e-wert").value.replace(",", "."));
        if (!name || isNaN(wert)) return alert("Bitte Name und Ergebnis eintragen.");
        const max = parseFloat(inhalt.querySelector("#e-max").value.replace(",", "."));
        vollZu(); speichern({ art: "eigen", name, wert, max: isNaN(max) ? null : max, datum: inhalt.querySelector("#e-datum").value, notiz: inhalt.querySelector("#e-notiz").value });
    };
}

/* ---------- Förderbericht ---------- */
function berichtDaten(von, bis){
    const inZeit = d => d && (!von || d >= von) && (!bis || d <= bis);
    const stunden = (AKTE.stunden || []).filter(s => inZeit(s.datum) && (s.status || "erledigt") === "erledigt");
    const plan = AKTE.plan || {};
    const gruppen = {};
    messungen().filter(m => inZeit(m.datum)).forEach(m => { const key = m.art === "eigen" ? "eigen:" + m.name : m.art + ":" + (m.stufe || ""); (gruppen[key] = gruppen[key] || []).push(m); });
    const wo = AKTE_KARTEI.woerter || [];
    return { stunden, plan, gruppen, kartei: { gesamt: wo.length, sicher: wo.filter(w => w.f >= 5).length, offen: wo.filter(w => w.f < 5).length } };
}
function entwurf(d){
    const s = [];
    const z = d.plan.ziele || [];
    const erreicht = z.filter(x => x.stand === "erreicht"), teil = z.filter(x => x.stand === "teilweise"), offen = z.filter(x => x.stand !== "erreicht" && x.stand !== "teilweise");
    if (d.stunden.length) s.push(`Im Berichtszeitraum fanden ${d.stunden.length} Fördereinheiten statt.`);
    Object.values(d.gruppen).forEach(l => {
        if (l.length < 2) return;
        const a = l[0], b = l.at(-1), n = a.art === "eigen" ? a.name : ARTEN[a.art].name;
        if (a.art === "lesen") s.push(`Das Lesetempo ${b.wert > a.wert ? "hat sich von " + a.wert + " auf " + b.wert + " richtig gelesene Wörter pro Minute verbessert" : "liegt unverändert bei etwa " + b.wert + " richtig gelesenen Wörtern pro Minute"}.`);
        else if (a.art === "diktat") s.push(`Im Mini-Diktat wurden zuletzt ${b.wert} von ${b.max || 12} Wörtern richtig geschrieben (zu Beginn ${a.wert}).`);
        else if (a.art === "buchstaben") s.push(`Sicher bekannt sind inzwischen ${b.wert} von ${b.max} Buchstaben und Lauten (zu Beginn ${a.wert}).`);
        else s.push(`${n}: von ${a.wert} auf ${b.wert}.`);
    });
    if (erreicht.length) s.push(`Erreicht wurden die Ziele: ${erreicht.map(x => af_name(x.bereich)).join(", ")}.`);
    if (teil.length) s.push(`Teilweise erreicht: ${teil.map(x => af_name(x.bereich)).join(", ")}.`);
    if (d.kartei.sicher) s.push(`In der Lernbox sind ${d.kartei.sicher} Wörter sicher gelernt, ${d.kartei.offen} sind noch in Arbeit.`);
    const empf = [];
    if (offen.length || teil.length) empf.push(`Weiterarbeit an: ${[...teil, ...offen].map(x => af_name(x.bereich)).filter((v, i, a) => a.indexOf(v) === i).join(", ")}.`);
    empf.push("Die Förderung sollte fortgesetzt werden.");
    return { einschaetzung: s.join(" "), empfehlung: empf.join(" ") };
}
function berichtEditor(){
    const ed = root.querySelector("#fb-editor");
    const von = AKTE.plan?.von || (messungen()[0]?.datum) || "", bis = heute();
    const e = entwurf(berichtDaten(von, bis));
    ed.innerHTML = `<div class="plan-raster" style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px">
        <div><label>Anlass</label><select id="fb-anlass"><option>Halbjahresbericht</option><option>Zeugniskonferenz</option><option>Elterngespräch</option><option>Fortschreibung des Förderplans</option><option>Abschlussbericht</option></select></div>
        <div><label>Zeitraum von</label><input type="text" id="fb-von" value="${esc(von)}" placeholder="JJJJ-MM-TT"></div>
        <div><label>bis</label><input type="text" id="fb-bis" value="${esc(bis)}" placeholder="JJJJ-MM-TT"></div>
        <div><label>Name des Kindes (nur für den Druck – wird nicht gespeichert)</label><input type="text" id="fb-name" autocomplete="off"></div></div>
        <label>Einschätzung (Entwurf – bitte anpassen)</label><textarea class="fb-feld" id="fb-ein" style="min-height:140px">${esc(e.einschaetzung)}</textarea>
        <label>Empfehlungen</label><textarea class="fb-feld" id="fb-emp">${esc(e.empfehlung)}</textarea>
        <label style="text-transform:none;letter-spacing:0;font-size:14px;color:#2d3530"><input type="checkbox" id="fb-nta" style="width:auto"> Nachteilsausgleich weiterhin empfohlen</label>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="knopf voll" id="fb-druck">🖨 Drucken / als PDF speichern</button><button class="knopf" id="fb-neu">Entwurf neu erstellen</button></div>`;
    ed.querySelector("#fb-neu").onclick = () => { const n = entwurf(berichtDaten(ed.querySelector("#fb-von").value, ed.querySelector("#fb-bis").value)); ed.querySelector("#fb-ein").value = n.einschaetzung; ed.querySelector("#fb-emp").value = n.empfehlung; };
    ed.querySelector("#fb-druck").onclick = () => berichtDrucken(ed);
}
function berichtDrucken(ed){
    const v = id => ed.querySelector(id).value;
    const d = berichtDaten(v("#fb-von"), v("#fb-bis"));
    const sp = [...(d.plan.f || []), ...(d.plan.r || []), ...(d.plan.l || [])].map(af_name);
    const z = d.plan.ziele || [];
    const STAND = { offen: "offen", teilweise: "teilweise erreicht", erreicht: "erreicht" };
    let druck = document.getElementById("druck-plan");
    if (!druck){ druck = document.createElement("div"); druck.id = "druck-plan"; document.body.appendChild(druck); }
    if (druck.parentElement !== document.body) document.body.appendChild(druck);
    druck.innerHTML = `<div class="fb">
        <div class="fb-kopf"><div><h1>Förderbericht LRS</h1><div>${esc(v("#fb-anlass"))}</div></div><img src="marke/mewe-leuchtturm.svg" alt=""></div>
        <div class="fb-felder"><div>Name: <b>${esc(v("#fb-name")) || "____________________"}</b></div><div>Kürzel: <b>${esc(AKTE_KIND)}</b></div>
            <div>Klasse: <b>${esc(AKTE.klasse || "____")}</b></div><div>Zeitraum: <b>${af_datum(v("#fb-von")) || "________"} – ${af_datum(v("#fb-bis"))}</b></div>
            <div>Fördereinheiten: <b>${d.stunden.length}</b></div><div>Methode: <b>AFS-Methode (EÖDL)</b></div></div>
        <h2>Förderschwerpunkte</h2><div>${sp.length ? esc(sp.join(" · ")) : "–"}${d.plan.lb ? `<br>Sicher bekannte Buchstaben: ${esc(d.plan.lb)}` : ""}</div>
        ${z.length ? `<h2>Ziele und Stand</h2><table><tr><th style="width:22%">Bereich</th><th>Ziel</th><th style="width:16%">Stand</th><th style="width:30%">Beobachtung</th></tr>
            ${z.map(x => `<tr><td>${esc(af_name(x.bereich))}</td><td>${esc(x.ziel)}</td><td><b>${esc(STAND[x.stand] || x.stand)}</b></td><td>${esc(x.beobachtung || "")}</td></tr>`).join("")}</table>` : ""}
        ${Object.keys(d.gruppen).length ? `<h2>Lernstand im Vergleich</h2><table><tr><th>Test</th><th>erste Messung</th><th>letzte Messung</th><th>Veränderung</th></tr>
            ${Object.values(d.gruppen).map(l => { const a = l[0], b = l.at(-1), n = a.art === "eigen" ? a.name : ARTEN[a.art].name + (a.stufe ? ` (Stufe ${a.stufe})` : ""), dif = Math.round((b.wert - a.wert) * 10) / 10;
                return `<tr><td>${esc(n)}</td><td>${af_datum(a.datum)}: <b>${wertText(a)}</b></td><td>${l.length > 1 ? `${af_datum(b.datum)}: <b>${wertText(b)}</b>` : "–"}</td><td>${l.length > 1 ? `<b>${dif >= 0 ? "+" : ""}${String(dif).replace(".", ",")}</b>` : "–"}</td></tr>`; }).join("")}</table>` : ""}
        ${d.kartei.gesamt ? `<h2>Lernbox (Fehlerwörter)</h2><div>${d.kartei.sicher} von ${d.kartei.gesamt} Wörtern sicher gelernt · ${d.kartei.offen} in Arbeit</div>` : ""}
        <h2>Einschätzung</h2><div class="fb-text">${esc(v("#fb-ein"))}</div>
        <h2>Empfehlungen</h2><div class="fb-text">${esc(v("#fb-emp"))}${ed.querySelector("#fb-nta").checked ? "\nEin Nachteilsausgleich wird weiterhin empfohlen." : ""}</div>
        <div class="fb-sign"><div>Ort, Datum</div><div>Melanie Bernshausen · Diplomierte Legasthenietrainerin (EÖDL)</div></div></div>`;
    window.print();
}

zeichnen();
})();
