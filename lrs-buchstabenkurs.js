/* Leuchtturm – Buchstabenkurs für LRS-Kinder
   Ein Buchstabe nach dem anderen in fester Reihenfolge (lautgetreu, wie in der Fibel).
   Gelernte Buchstaben stehen im Förderplan der Kinder-Akte („Bekannte Buchstaben“) –
   der Kurs schlägt automatisch den nächsten vor, und die Lese-Blätter nutzen nur
   Silben und Wörter aus den Buchstaben, die das Kind schon kann.
   Wird von lrs.php geladen (nutzt dessen Bausteine bs_*, le_*, ws_*). */
"use strict";

const BK_FOLGE = ["m", "a", "l", "i", "o", "e", "s", "n", "r", "t", "u", "d", "h", "ei", "w", "k", "au", "b", "f", "g", "sch", "p", "z", "ch",
    "ä", "ö", "ü", "eu", "j", "v", "ie", "pf", "st", "sp", "qu", "x", "y", "c"];

// Anlautwort zum Merken (kurz, eindeutig, wenn möglich mit Bild aus der Sammlung)
const BK_MERKWORT = { m: "Maus", a: "Affe", l: "Löwe", i: "Igel", o: "Ofen", e: "Ente", s: "Sonne", n: "Nase", r: "Rakete", t: "Tomate", u: "Uhu",
    d: "Dino", h: "Hund", ei: "Eis", w: "Wal", k: "Kuh", au: "Auto", b: "Banane", f: "Fisch", g: "Gurke", sch: "Schaf", p: "Pinsel", z: "Zebra",
    ch: "Drache", "ä": "Käse", "ö": "Möhre", "ü": "Mütze", eu: "Eule", j: "Jo-Jo", v: "Vogel", ie: "Biene", pf: "Pferd", st: "Stern", sp: "Spinne",
    qu: "Qualle", x: "Taxi", y: "Pony", c: "Clown" };

function bk_gross(z){ return z === "ß" ? "ß" : z[0].toUpperCase() + z.slice(1); }
function bk_gelernt(code){ return le_buchstabenLesen((LRS_AKTEN[code] || {}).lb || ""); }
function bk_naechster(code){
    const g = new Set(bk_gelernt(code));
    return BK_FOLGE.find(z => !g.has(z)) || BK_FOLGE[0];
}
function bk_nummer(z){ return BK_FOLGE.indexOf(z) + 1; }

/* ---------- Schreibweg: Buchstaben aus den Strichdaten zeichnen ---------- */
function bk_wege(){ const W = window.BK_WEGE || {}; return ws_druckschrift() ? W.DRUCK : W.GRUND; }
function bk_glyphen(text){
    const W = bk_wege() || {};
    return [...text].map(ch => W[ch] || null).filter(Boolean);
}
// Ein Wort/Zeichen als SVG-Gruppe: art "vorlage" (mit Startpunkt und Nummer), "spur" (grau gestrichelt), "fertig" (schwarz)
function bk_zeichenSvg(text, x0, u, art){
    const gl = bk_glyphen(text);
    let x = x0, h = "";
    const stil = art === "spur" ? `stroke="#9fb0c0" stroke-dasharray="${u * 0.09} ${u * 0.11}"` : art === "vorlage" ? `stroke="#1e4f8c"` : `stroke="#1E2A36"`;
    const breite = art === "vorlage" ? u * 0.1 : u * 0.07;
    let nr = 0;
    gl.forEach(g => {
        g.s.forEach(s => {
            if (s[0] === "."){
                const [px, py] = s.slice(1).split(",").map(Number);
                if (art === "leer") return;
                h += `<circle cx="${(x + px * u).toFixed(1)}" cy="${(py * u).toFixed(1)}" r="${breite * 0.75}" fill="${art === "spur" ? "#9fb0c0" : art === "vorlage" ? "#1e4f8c" : "#1E2A36"}"/>`;
                if (art === "vorlage"){ nr++; h += bk_nummerSvg(x + px * u, py * u, nr, u); }
                return;
            }
            if (art !== "leer") h += `<path d="${bk_skalieren(s, x, u)}" fill="none" ${stil} stroke-width="${breite}" stroke-linecap="round" stroke-linejoin="round"${art === "vorlage" ? ` marker-end="url(#bk-pfeil)"` : ""}/>`;
            const m = /^M\s*([-\d.]+)[ ,]([-\d.]+)/.exec(s);
            if (m && art !== "fertig"){
                const sx = x + parseFloat(m[1]) * u, sy = parseFloat(m[2]) * u;
                h += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${art === "vorlage" ? u * 0.075 : u * 0.06}" fill="#2e9e5b"/>`;
                if (art === "vorlage"){ nr++; h += bk_nummerSvg(sx, sy, nr, u); }
            }
        });
        x += g.w * u + u * 0.28;
    });
    return { svg: h, breite: x - x0 - u * 0.28 };
}
function bk_nummerSvg(x, y, nr, u){
    const r = u * 0.16, dx = -u * 0.26, dy = -u * 0.2;
    return `<circle cx="${(x + dx).toFixed(1)}" cy="${(y + dy).toFixed(1)}" r="${r.toFixed(1)}" fill="#fff" stroke="#2e9e5b" stroke-width="${u * 0.03}"/>` +
        `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + r * 0.38).toFixed(1)}" font-size="${(r * 1.15).toFixed(1)}" font-weight="700" text-anchor="middle" fill="#2e9e5b" font-family="Nunito, Arial, sans-serif">${nr}</text>`;
}
// Pfaddaten (Einheit = Band) in Pixel umrechnen – Befehle M L Q C A
function bk_skalieren(d, x0, u){
    const t = d.match(/[MLQCA]|-?\d*\.?\d+/g) || [];
    let out = [], cmd = "", idx = 0;
    for (const tok of t){
        if (/[MLQCA]/.test(tok)){ cmd = tok; idx = 0; out.push(tok); continue; }
        const v = parseFloat(tok);
        if (cmd === "A"){
            // rx ry rot large sweep x y
            const pos = idx % 7;
            if (pos === 0 || pos === 1) out.push((v * u).toFixed(2));
            else if (pos === 5) out.push((x0 + v * u).toFixed(2));
            else if (pos === 6) out.push((v * u).toFixed(2));
            else out.push(String(v));
        } else out.push(((idx % 2 === 0) ? x0 + v * u : v * u).toFixed(2));
        idx++;
    }
    return out.join(" ").replace(/ ([MLQCA]) /g, " $1");
}
// Eine Lineatur-Zeile (4 Linien: Ober-, Mittel-, Grund-, Unterlinie) mit Inhalt
function bk_zeile(u, breite, inhalt, oben = 0.35){
    const H = (3 + oben + 0.25) * u, y = k => (oben + k) * u;
    return `<svg class="bk-zeile" viewBox="0 0 ${breite} ${H.toFixed(1)}" width="${breite}" height="${H.toFixed(0)}" style="display:block;">
        <rect x="0" y="${y(1)}" width="${breite}" height="${u}" fill="#fff6d6"/>
        <line x1="0" x2="${breite}" y1="${y(0)}" y2="${y(0)}" stroke="#b7c6d4" stroke-width="1.2"/>
        <line x1="0" x2="${breite}" y1="${y(1)}" y2="${y(1)}" stroke="#b7c6d4" stroke-width="1.2" stroke-dasharray="6 5"/>
        <line x1="0" x2="${breite}" y1="${y(2)}" y2="${y(2)}" stroke="#2f5d86" stroke-width="2"/>
        <line x1="0" x2="${breite}" y1="${y(3)}" y2="${y(3)}" stroke="#b7c6d4" stroke-width="1.2"/>
        <g transform="translate(0 ${y(0)})">${inhalt}</g></svg>`;
}
const BK_PFEIL = `<svg width="0" height="0" style="position:absolute"><defs><marker id="bk-pfeil" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3.2" markerHeight="3.2" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" fill="#1e4f8c"/></marker></defs></svg>`;

function bk_reihe(text, u, breite, art, erstesVorlage){
    let x = u * 0.3, h = "";
    const probe = bk_zeichenSvg(text, 0, u, "fertig").breite;
    let i = 0;
    while (x + probe < breite - u * 0.2){
        h += bk_zeichenSvg(text, x, u, i === 0 && erstesVorlage ? "fertig" : art).svg;
        x += probe + u * 0.9; i++;
    }
    return bk_zeile(u, breite, h);
}

function bkB_schreibweg(ctx){
    const z = ctx.bk.z, Z = bk_gross(z);
    const W = bk_wege();
    if (!W || !bk_glyphen(z).length) return bsB_kennenlernen(ctx);
    const U = 70, B = 680;
    const gross = Z !== z && bk_glyphen(Z).length ? Z : null;
    const vk = bk_zeichenSvg(z, 0, U, "vorlage"), vg = gross ? bk_zeichenSvg(gross, 0, U, "vorlage") : null;
    const kopfB = Math.round((vg ? vg.breite + U * 1.6 : 0) + vk.breite + U * 1.0);
    const kopf = bk_zeile(U, kopfB, (vg ? `<g transform="translate(${U * 0.5} 0)">${vg.svg}</g>` : "") +
        `<g transform="translate(${(vg ? vg.breite + U * 1.6 : U * 0.5).toFixed(1)} 0)">${vk.svg}</g>`, 0.45)
;
    const u = 36;
    const wort = BK_MERKWORT[z] || (Z + z);
    const zeilen = [];
    if (gross) zeilen.push(["Großbuchstabe nachspuren", bk_reihe(gross, u, B, "spur", true)]);
    zeilen.push(["Kleinbuchstabe nachspuren", bk_reihe(z, u, B, "spur", true)]);
    zeilen.push(["Jetzt allein – fang immer am grünen Punkt an", bk_reihe(z, u, B, "leer", true)]);
    zeilen.push([`Spure das Wort nach: ${wort}`, bk_zeile(u, B, bk_zeichenSvg(wort, u * 0.4, u, "spur").svg)]);
    zeilen.push(["Schreibe das Wort selbst", bk_zeile(u, B, "")]);
    return { titel: `So schreibe ich ${Z === z ? z : Z + " und " + z}`, max: 1, html: `${BK_PFEIL}
        ${ws_aufgabe(1, `Fahre den Buchstaben zuerst mit dem Finger nach: Fang am <b style="color:#2e9e5b;">grünen Punkt</b> an und folge den Zahlen und Pfeilen. Sprich dabei den Laut.`)}
        <div class="bk-kopf">${kopf}</div>
        ${zeilen.map(([t, row]) => `${t ? `<div class="bk-zt">${ws_esc(t)}</div>` : ""}<div class="bk-reihe">${row}</div>`).join("")}` };
}

/* ---------- Buchstabenpass: alle Buchstaben des Kurses ---------- */
function bkB_pass(ctx){
    const gel = new Set(ctx.bk.gelernt), jetzt = ctx.bk.z;
    const felder = BK_FOLGE.map((z, i) => {
        const st = gel.has(z) ? "ok" : z === jetzt ? "jetzt" : "";
        return `<div class="bk-feld ${st}"><span class="bk-nr">${i + 1}</span><b>${ws_esc(bk_gross(z))}${z.length === 1 && bk_gross(z) !== z ? " " + ws_esc(z) : ""}</b><i>${st === "ok" ? "✓" : st === "jetzt" ? "★" : ""}</i></div>`;
    }).join("");
    return { titel: "Mein Buchstabenpass", max: 1, html: `
        ${ws_aufgabe(1, "Für jeden Buchstaben, den du sicher kannst, bekommst du einen Stempel. Der Stern zeigt deinen neuen Buchstaben.")}
        <div class="bk-pass">${felder}</div>
        <div class="bk-pass-fuss"><span>✓ kann ich</span><span>★ lerne ich gerade</span><span>Stempel: _______</span></div>` };
}

/* ---------- Kurs-Blätter je Buchstabe ---------- */
const BK_BLAETTER = [
    { nr: "1", kurz: "Kennenlernen", name: "Mein neuer Buchstabe", bau: c => bsB_kennenlernen(c) },
    { nr: "2", kurz: "Schreibweg", name: "So schreibe ich den Buchstaben", bau: c => bkB_schreibweg(c) },
    { nr: "3", kurz: "Detektiv", name: "Buchstaben-Detektiv", bau: c => bsB_detektiv(c) },
    { nr: "4", kurz: "Anlaut", name: "Wie fängt das Wort an?", bau: c => c.bs.anlaut.length >= 4 ? bsB_anlaut(c) : bsB_imWort(c) },
    { nr: "5", kurz: "Lautposition", name: "Anfang, Mitte oder Ende?", bau: c => c.bs.enthalten.length >= 6 ? bsB_position(c) : bsB_detektiv(c) },
    { nr: "6", kurz: "Groß/klein", name: "Groß und klein", bau: c => bsB_grossKlein(c) },
    { nr: "7", kurz: "Silbenteppich", name: "Silbenteppich mit meinen Buchstaben", le: ["silben", 0] },
    { nr: "8", kurz: "Silben zum Wort", name: "Silben zum Wort (meine Buchstaben)", le: ["silben", 2] },
    { nr: "9", kurz: "Wort und Bild", name: "Wörter lesen (meine Buchstaben)", le: ["woerter", 0] },
    { nr: "10", kurz: "Buchstabenpass", name: "Mein Buchstabenpass", bau: c => bkB_pass(c) },
];
// der Reihe nach ab dem gewählten Blatt (wie im Kurs vorgesehen)
function bk_reiheAb(nr, n){
    const i0 = Math.max(0, BK_BLAETTER.findIndex(b => b.nr === nr));
    const aus = [];
    for (let i = 0; i < n; i++) aus.push(BK_BLAETTER[(i0 + i) % BK_BLAETTER.length]);
    return aus;
}
// Kontext für ein Kind: Buchstabe, bisher gelernte Buchstaben
function bk_ctx(z, code){
    const gelernt = bk_gelernt(code);
    return { z, gelernt, bs: bs_kontext("einzeln", [z]) };
}
// Eintrag für die Blattliste der Stunde
function bk_eintrag(it, code){
    const b = BK_BLAETTER.find(x => x.nr === it.nr) || BK_BLAETTER[0];
    const z = it.z || bk_naechster(code), Z = bk_gross(z);
    const kurz = `Buchstabe ${Z}: ${b.kurz}`, name = `Buchstabenkurs ${bk_nummer(z)} · ${Z} ${z} – ${b.name}`;
    if (b.le){
        const [st, i] = b.le, lb = [...new Set([...bk_gelernt(code), z])];
        const le = { bekannt: lb, set: new Set(lb), farbig: true, texte: null };
        const lb2 = LE_BLAETTER[st][i];
        return { nr: "0", kurz, name, bau: c => lb2.bau({ ...c, le }), extra: { label: `Buchstabenkurs · ${Z} ${z}`, afs: "Symptomtraining: Buchstaben & Laute" } };
    }
    return { nr: "0", kurz, name, bau: c => { const k = bk_ctx(z, code); return b.bau({ ...c, bs: k.bs, bk: k }); }, extra: { label: `Buchstabenkurs · ${Z} ${z}`, afs: "Symptomtraining: Buchstaben & Laute" } };
}
function bk_info(it){
    const b = BK_BLAETTER.find(x => x.nr === it.nr);
    return b ? { name: `${bk_gross(it.z || "?")}: ${b.name}`, gruppe: "Buchstabenkurs", ok: true } : { name: "?", ok: false };
}

/* ---------- Stundenplanung: Auswahl des Buchstabens ---------- */
function bk_optionen(code, gewaehlt){
    const g = new Set(bk_gelernt(code)), n = code ? bk_naechster(code) : "m";
    return BK_FOLGE.map((z, i) => `<option value="${z}"${z === (gewaehlt || n) ? " selected" : ""}>${i + 1}. ${bk_gross(z)} ${z}${g.has(z) ? " ✓ gelernt" : z === n && code ? " ← als Nächstes" : ""}</option>`).join("");
}
function bk_zeileZeigen(){
    const box = document.getElementById("std-bk");
    if (!box) return;
    const an = lt_wert("std-symptom") === "bk";
    box.style.display = an ? "" : "none";
    if (!an) return;
    const code = lt_wert("std-kind"), sel = document.getElementById("std-bk-zeichen");
    const alt = sel.value;
    sel.innerHTML = bk_optionen(code, sel.dataset.kind === code ? alt : "");
    sel.dataset.kind = code;
    bk_infoZeigen();
}
function bk_infoZeigen(){
    const code = lt_wert("std-kind"), z = lt_wert("std-bk-zeichen"), el = document.getElementById("std-bk-info");
    if (!el) return;
    const g = bk_gelernt(code);
    el.innerHTML = code
        ? `${g.length ? `<b>${ws_esc(code)}</b> kann schon: ${g.map(x => `<span class="bk-chip">${ws_esc(x)}</span>`).join(" ")}` : `Für <b>${ws_esc(code)}</b> ist noch kein Buchstabe als gelernt eingetragen.`}
           <button type="button" class="btn klein" onclick="bk_gelerntEintragen()" ${g.includes(z) ? "disabled" : ""}><i class="fa-solid fa-check"></i> ${ws_esc(bk_gross(z))} ${ws_esc(z)} als gelernt eintragen</button>`
        : "Mit Kürzel weiß der Kurs, welche Buchstaben das Kind schon kann – dann kommt automatisch der nächste dran, und die Lese-Blätter nutzen nur bekannte Buchstaben.";
}
async function bk_gelerntEintragen(){
    const code = lt_wert("std-kind"), z = lt_wert("std-bk-zeichen");
    const akte = LRS_AKTEN[code];
    if (!code || !akte) return;
    const neu = [...new Set([...bk_gelernt(code), z])];
    const lb = BK_FOLGE.filter(x => neu.includes(x)).concat(neu.filter(x => !BK_FOLGE.includes(x))).join(" ");
    try {
        const a = await fetch("akte.php", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ aktion: "lesebuchstaben", kind: code, lb }) });
        const j = await a.json().catch(() => ({ ok: false }));
        if (!j.ok) throw new Error(j.fehler || "Speichern ging nicht.");
        akte.lb = lb;
        const sel = document.getElementById("std-bk-zeichen"); sel.innerHTML = bk_optionen(code, ""); bk_infoZeigen();
        const el = document.getElementById("std-bk-info"); if (el) el.insertAdjacentHTML("afterbegin", `✅ ${ws_esc(bk_gross(z))} ist im Förderplan von ${ws_esc(code)} als gelernt eingetragen. `);
    } catch (e){ alert(e.message); }
}
