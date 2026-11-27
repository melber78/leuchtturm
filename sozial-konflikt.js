/* ============================================================
   Leuchtturm – Sozialtraining: Konflikt-Werkzeuge
   · Streitschlichtung an der Tafel (6 Schritte, im Vollbild)
   · Druckvorlagen: Reflexionsbogen (Kl. 1/2 und 3/4), Abmachung,
     Ich-Botschaft-Karten, Beobachtungsbogen für die Lehrkraft
   ============================================================ */
(function(){
const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const GEFUEHLE = [["😠", "wütend"], ["😢", "traurig"], ["😞", "enttäuscht"], ["😨", "ängstlich"], ["😳", "peinlich berührt"], ["😤", "ungerecht behandelt"], ["😔", "allein gelassen"], ["🤕", "verletzt"]];
const LOESUNGEN = [["🙏", "Wir entschuldigen uns."], ["🔁", "Wir wechseln uns ab."], ["🤲", "Wir teilen."], ["🧩", "Wir spielen zusammen."], ["🛠️", "Ich mache es wieder gut."], ["⏸️", "Wir machen eine Pause voneinander."], ["🙋", "Wir holen uns Hilfe bei einem Erwachsenen."], ["🎲", "Wir losen aus, wer anfängt."]];
const SCHRITTE = [
    { ico: "🛑", titel: "Stopp – erst mal durchatmen", text: "Wir hören auf zu streiten. Jeder atmet dreimal tief ein und aus." },
    { ico: "🗣️", titel: "Was ist passiert?", text: "Jeder erzählt der Reihe nach. Nur wer den Redestein hat, spricht – der andere hört zu und unterbricht nicht." },
    { ico: "💛", titel: "Wie fühlst du dich?", text: "Jeder zeigt sein Gefühl." },
    { ico: "🧩", titel: "Sag es mit einer Ich-Botschaft", text: "Ohne Schimpfwörter, ohne „Du bist …“." },
    { ico: "💡", titel: "Was können wir tun?", text: "Sammelt Ideen. Eine Lösung muss für beide fair sein." },
    { ico: "🤝", titel: "Unsere Abmachung", text: "Ihr habt eine Lösung gefunden." },
];

/* ---------- Übersicht im Reiter ---------- */
function zeigen(inhalt){
    inhalt.innerHTML = `
    <div class="karte" style="background:linear-gradient(135deg,#2f4a1f,#557428);color:white">
        <h2 style="color:white"><i class="fa-solid fa-handshake-angle"></i> Streitschlichtung an der Tafel</h2>
        <p style="margin:0 0 14px;font-weight:700;opacity:.9">Sechs Schritte im Vollbild: Stopp & Atmen · Was ist passiert? (mit Redestein und Redezeit) · Gefühle zeigen · Ich-Botschaft · Lösungen sammeln · Abmachung. Mit den Kindern direkt an der Tafel oder am iPad.</p>
        <div class="knopfleiste"><button class="btn gold" id="sk-start"><i class="fa-solid fa-play"></i> Streitschlichtung starten</button></div>
    </div>
    <div class="karte"><h2><i class="fa-solid fa-print"></i> Vorlagen zum Drucken</h2>
        <p class="ed-hilfe" style="margin:0 0 12px">Jede Vorlage füllt genau eine A4-Seite.</p>
        <div class="knopfleiste" style="flex-wrap:wrap">
            <button class="btn" data-sk="refl12"><i class="fa-solid fa-face-smile"></i> Reflexionsbogen Kl. 1/2</button>
            <button class="btn" data-sk="refl34"><i class="fa-solid fa-pen"></i> Reflexionsbogen Kl. 3/4</button>
            <button class="btn" data-sk="abmachung"><i class="fa-solid fa-file-signature"></i> Abmachung</button>
            <button class="btn" data-sk="ich"><i class="fa-solid fa-comment-dots"></i> Ich-Botschaft-Karten</button>
            <button class="btn" data-sk="beob"><i class="fa-solid fa-clipboard-list"></i> Beobachtungsbogen (für dich)</button>
        </div></div>
    <div class="karte"><h2><i class="fa-solid fa-lightbulb"></i> So setzt du es ein</h2>
        <ul style="margin:0;padding-left:20px;font-weight:600;line-height:1.6">
            <li><b>Akuter Streit:</b> erst trennen und beruhigen, dann die Streitschlichtung an der Tafel – am besten mit beiden Kindern allein oder in kleiner Runde.</li>
            <li><b>Danach:</b> Reflexionsbogen in Ruhe ausfüllen lassen (Kl. 1/2 mit Gesichtern und Malfeld, Kl. 3/4 mit Schreiblinien).</li>
            <li><b>Abmachung:</b> gemeinsam ausfüllen und unterschreiben – nach einer Woche nachfragen, ob sie gehalten hat.</li>
            <li><b>Beobachtungsbogen:</b> wenn ein Kind öfter auffällt – über 2–4 Wochen Situationen notieren. Hilfreich für Elterngespräche und die Klassenkonferenz.</li>
        </ul></div>`;
    inhalt.querySelector("#sk-start").onclick = schlichtung;
    inhalt.querySelectorAll("[data-sk]").forEach(b => b.onclick = () => drucken(b.dataset.sk));
}

/* ---------- Streitschlichtung (Vollbild) ---------- */
let box = null, S = null;
const css = `
#sk{ position:fixed; inset:0; z-index:200; background:linear-gradient(160deg,#f8f4ec,#edf2e3); display:flex; flex-direction:column; font-family:Nunito, sans-serif; color:#2d3530; }
.sk-kopf{ display:flex; gap:10px; align-items:center; padding:max(10px, env(safe-area-inset-top)) 14px 10px; }
.sk-kopf .wege{ flex:1; display:flex; gap:6px; justify-content:center; flex-wrap:wrap; }
.sk-kopf .wege span{ width:44px; height:44px; border-radius:50%; display:grid; place-items:center; font-size:22px; background:#fff; opacity:.45; border:3px solid transparent; }
.sk-kopf .wege span.an{ opacity:1; border-color:#557428; } .sk-kopf .wege span.fertig{ opacity:.9; background:#e3f1d8; }
.sk-k{ border:0; background:#fff; border-radius:50%; width:48px; height:48px; font-size:20px; cursor:pointer; box-shadow:0 3px 10px rgba(47,74,31,.12); }
.sk-haupt{ flex:1; overflow:auto; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2.4vmin; padding:2vmin 4vmin; text-align:center; }
.sk-ico{ font-size:clamp(60px, 12vmin, 120px); }
.sk-haupt h2{ font-family:Fraunces, Georgia, serif; color:#2f4a1f; font-size:clamp(30px, 6vmin, 62px); margin:0; }
.sk-text{ font-weight:800; font-size:clamp(18px, 3vmin, 30px); max-width:900px; color:#4b5a44; }
.sk-fuss{ display:flex; gap:12px; justify-content:center; padding:12px 14px max(14px, env(safe-area-inset-bottom)); }
.sk-btn{ border:0; border-radius:20px; padding:14px 26px; font:900 clamp(18px, 2.6vmin, 26px) Nunito, sans-serif; cursor:pointer; background:#fff; color:#2f4a1f; box-shadow:0 4px 0 #c9d4b8; }
.sk-btn.haupt{ background:#557428; color:#fff; box-shadow:0 4px 0 #2f4a1f; }
.sk-atem{ width:clamp(140px, 30vmin, 300px); height:clamp(140px, 30vmin, 300px); border-radius:50%; background:radial-gradient(circle, #b3c69a, #557428); display:grid; place-items:center; color:#fff; font-weight:900; font-size:clamp(20px, 3.4vmin, 34px); transition:transform 4s ease-in-out; }
.sk-zwei{ display:grid; grid-template-columns:1fr 1fr; gap:3vmin; width:100%; max-width:1100px; }
@media (max-width:700px){ .sk-zwei{ grid-template-columns:1fr; } }
.sk-kind{ background:#fff; border-radius:24px; padding:2.4vmin; box-shadow:0 6px 20px rgba(47,74,31,.08); border:4px solid transparent; }
.sk-kind.spricht{ border-color:#d9a23f; }
.sk-kind h3{ margin:0 0 1vmin; font-size:clamp(20px, 3.2vmin, 32px); color:#2f4a1f; display:flex; gap:8px; justify-content:center; align-items:center; }
.sk-kind input{ font:inherit; font-weight:900; font-size:clamp(18px, 2.8vmin, 28px); border:0; border-bottom:3px dashed #c9d4b8; text-align:center; width:60%; background:transparent; color:#2f4a1f; }
.sk-zeit{ font-size:clamp(36px, 7vmin, 70px); font-weight:900; color:#557428; font-variant-numeric:tabular-nums; }
.sk-stein{ font-size:clamp(40px, 7vmin, 70px); cursor:pointer; filter:grayscale(1); opacity:.4; transition:.2s; background:none; border:0; }
.sk-kind.spricht .sk-stein{ filter:none; opacity:1; transform:scale(1.15); }
.sk-gefuehle{ display:grid; grid-template-columns:repeat(4, 1fr); gap:1.2vmin; }
.sk-gefuehle button{ border:3px solid #edf2e3; background:#f8faf5; border-radius:18px; padding:1vmin .5vmin; font:800 clamp(12px, 1.8vmin, 17px) Nunito, sans-serif; cursor:pointer; color:#2d3530; }
.sk-gefuehle button span{ display:block; font-size:clamp(30px, 5vmin, 52px); }
.sk-gefuehle button.an{ border-color:#d9a23f; background:#fff3d6; }
.sk-satz{ background:#fff; border-radius:24px; padding:3vmin; font-size:clamp(24px, 4.4vmin, 48px); font-weight:800; line-height:1.6; max-width:1000px; box-shadow:0 6px 20px rgba(47,74,31,.08); }
.sk-satz .l{ display:inline-block; min-width:5em; border-bottom:4px solid #d9a23f; color:#b07a12; }
.sk-satz small{ display:block; font-size:.45em; color:#7c8a72; font-weight:700; margin-top:1.4vmin; }
.sk-loesungen{ display:grid; grid-template-columns:repeat(4, 1fr); gap:1.4vmin; max-width:1100px; width:100%; }
@media (max-width:700px){ .sk-loesungen, .sk-gefuehle{ grid-template-columns:repeat(2, 1fr); } }
.sk-loesungen button{ border:3px solid #edf2e3; background:#fff; border-radius:20px; padding:2vmin 1vmin; font:800 clamp(14px, 2.2vmin, 22px) Nunito, sans-serif; cursor:pointer; color:#2d3530; }
.sk-loesungen button span{ display:block; font-size:clamp(34px, 6vmin, 60px); }
.sk-loesungen button.an{ border-color:#557428; background:#e3f1d8; }
.sk-eigen{ font:800 clamp(16px, 2.4vmin, 24px) Nunito, sans-serif; border:3px solid #edf2e3; border-radius:16px; padding:1.2vmin 2vmin; width:min(700px, 90%); }
.sk-fair{ display:flex; gap:2vmin; justify-content:center; } .sk-fair button{ font-size:clamp(40px, 7vmin, 70px); border:0; background:#fff; border-radius:24px; padding:1vmin 3vmin; cursor:pointer; box-shadow:0 4px 0 #c9d4b8; }
.sk-fair button.an{ background:#e3f1d8; }
.sk-abm{ background:#fff; border-radius:24px; padding:3vmin; max-width:900px; font-size:clamp(20px, 3.2vmin, 34px); font-weight:800; line-height:1.5; box-shadow:0 6px 20px rgba(47,74,31,.08); }
.sk-konf{ position:fixed; top:-20px; width:10px; height:16px; z-index:210; pointer-events:none; }
`;
function namen(){ return [S.n[0] || "Kind 1", S.n[1] || "Kind 2"]; }
function schlichtung(){
    if (!box){ const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st); box = document.createElement("div"); box.id = "sk"; document.body.appendChild(box); }
    S = { i: 0, n: ["", ""], g: [[], []], loes: [], eigen: "", fair: [null, null], spricht: 0, zeit: 60, uhr: null };
    box.style.display = "flex"; document.body.style.overflow = "hidden";
    try { if (document.documentElement.requestFullscreen && !document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {}); } catch (e){}
    schritt();
}
function zu(){ clearInterval(S.uhr); clearTimeout(S.atem); box.style.display = "none"; box.innerHTML = ""; document.body.style.overflow = ""; if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); }
function sprich(t){ try { const u = new SpeechSynthesisUtterance(t); u.lang = "de-DE"; u.rate = .9; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e){} }
function schritt(){
    clearInterval(S.uhr); clearTimeout(S.atem);
    const s = SCHRITTE[S.i], [a, b] = namen();
    let mitte = "";
    if (S.i === 0) mitte = `<div class="sk-atem" id="sk-atem">Bereit?</div><button class="sk-btn" id="sk-atmen">🌬️ Zusammen atmen</button>`;
    if (S.i === 1) mitte = `<div class="sk-zwei">${[0, 1].map(k => `<div class="sk-kind${S.spricht === k ? " spricht" : ""}" data-k="${k}"><h3><input value="${esc(S.n[k])}" placeholder="Kind ${k + 1}" data-name="${k}" aria-label="Name"></h3>
            <button class="sk-stein" data-stein="${k}" title="Redestein">🪨</button><div class="sk-zeit" id="sk-zeit-${k}">${S.spricht === k ? fmt(S.zeit) : "1:00"}</div>
            <div style="font-weight:800;color:#7c8a72">${S.spricht === k ? "erzählt – der andere hört zu" : "hört zu"}</div></div>`).join("")}</div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button class="sk-btn" id="sk-uhr">⏱ Redezeit starten</button><button class="sk-btn" id="sk-wechsel">🔁 Redestein weitergeben</button></div>`;
    if (S.i === 2) mitte = `<div class="sk-zwei">${[0, 1].map(k => `<div class="sk-kind"><h3>${esc(namen()[k])} fühlt sich …</h3><div class="sk-gefuehle">${GEFUEHLE.map(([e, t], j) => `<button data-g="${k}-${j}" class="${S.g[k].includes(j) ? "an" : ""}"><span>${e}</span>${esc(t)}</button>`).join("")}</div></div>`).join("")}</div>`;
    if (S.i === 3) mitte = `<div class="sk-satz">Ich fühle mich <span class="l">${esc(S.g[S.spricht].map(j => GEFUEHLE[j][1]).join(" und ") || "…")}</span>,<br>weil <span class="l">&nbsp;</span>.<br>Ich wünsche mir, dass <span class="l">&nbsp;</span>.<small>Jetzt spricht: <b>${esc(namen()[S.spricht])}</b> – dann wechseln.</small></div>
            <button class="sk-btn" id="sk-wechsel">🔁 Jetzt spricht ${esc(namen()[1 - S.spricht])}</button>`;
    if (S.i === 4) mitte = `<div class="sk-loesungen">${LOESUNGEN.map(([e, t], j) => `<button data-l="${j}" class="${S.loes.includes(j) ? "an" : ""}"><span>${e}</span>${esc(t)}</button>`).join("")}</div>
            <input class="sk-eigen" id="sk-eigen" placeholder="Eigene Idee …" value="${esc(S.eigen)}">
            <div style="font-weight:900;font-size:clamp(18px,2.8vmin,28px)">Ist das für euch beide fair?</div>
            <div class="sk-zwei" style="max-width:700px">${[0, 1].map(k => `<div class="sk-kind" style="padding:1.4vmin"><h3 style="margin:0">${esc(namen()[k])}</h3><div class="sk-fair">${["👍", "👎"].map((d, j) => `<button data-f="${k}-${j}" class="${S.fair[k] === j ? "an" : ""}">${d}</button>`).join("")}</div></div>`).join("")}</div>`;
    if (S.i === 5){
        const l = [...S.loes.map(j => LOESUNGEN[j][1]), S.eigen].filter(Boolean);
        mitte = `<div class="sk-abm">${esc(a)} und ${esc(b)} haben sich geeinigt:<br>${l.length ? l.map(x => `✅ ${esc(x)}`).join("<br>") : "✅ …"}<br><br>Zum Abschluss: <b>Handschlag, Faustgruß oder Daumen hoch</b> – ihr entscheidet. 🤝</div>
            <button class="sk-btn" id="sk-druck">🖨 Abmachung drucken</button>`;
        setTimeout(konfetti, 200);
    }
    box.innerHTML = `<div class="sk-kopf"><button class="sk-k" id="sk-zu" title="Schließen">✕</button><div class="wege">${SCHRITTE.map((x, k) => `<span class="${k === S.i ? "an" : k < S.i ? "fertig" : ""}" data-sprung="${k}" title="${esc(x.titel)}">${x.ico}</span>`).join("")}</div><button class="sk-k" id="sk-sag" title="Vorlesen">🔊</button></div>
        <div class="sk-haupt"><div class="sk-ico">${s.ico}</div><h2>${esc(s.titel)}</h2><div class="sk-text">${esc(s.text)}</div>${mitte}</div>
        <div class="sk-fuss">${S.i > 0 ? `<button class="sk-btn" id="sk-zur">← Zurück</button>` : ""}${S.i < SCHRITTE.length - 1 ? `<button class="sk-btn haupt" id="sk-vor">Weiter →</button>` : `<button class="sk-btn haupt" id="sk-ende">Fertig</button>`}</div>`;
    const $ = q => box.querySelector(q);
    $("#sk-zu").onclick = zu; $("#sk-sag").onclick = () => sprich(s.titel + ". " + s.text);
    if ($("#sk-vor")) $("#sk-vor").onclick = () => { S.i++; schritt(); };
    if ($("#sk-zur")) $("#sk-zur").onclick = () => { S.i--; schritt(); };
    if ($("#sk-ende")) $("#sk-ende").onclick = zu;
    box.querySelectorAll("[data-sprung]").forEach(x => x.onclick = () => { S.i = +x.dataset.sprung; schritt(); });
    box.querySelectorAll("[data-name]").forEach(x => x.oninput = () => { S.n[+x.dataset.name] = x.value.trim(); });
    if ($("#sk-atmen")) $("#sk-atmen").onclick = () => atmen($("#sk-atem"), 3);
    if (S.i === 1){
        box.querySelectorAll("[data-stein]").forEach(x => x.onclick = () => { S.spricht = +x.dataset.stein; S.zeit = 60; schritt(); });
        $("#sk-wechsel").onclick = () => { S.spricht = 1 - S.spricht; S.zeit = 60; schritt(); };
        $("#sk-uhr").onclick = () => { clearInterval(S.uhr); S.zeit = 60; S.uhr = setInterval(() => { S.zeit--; const z = box.querySelector(`#sk-zeit-${S.spricht}`); if (z) z.textContent = fmt(S.zeit); if (S.zeit <= 0){ clearInterval(S.uhr); sprich("Die Redezeit ist um."); } }, 1000); };
    }
    if (S.i === 3) $("#sk-wechsel").onclick = () => { S.spricht = 1 - S.spricht; schritt(); };
    box.querySelectorAll("[data-g]").forEach(x => x.onclick = () => { const [k, j] = x.dataset.g.split("-").map(Number), l = S.g[k]; const p = l.indexOf(j); if (p >= 0) l.splice(p, 1); else l.push(j); x.classList.toggle("an"); });
    box.querySelectorAll("[data-l]").forEach(x => x.onclick = () => { const j = +x.dataset.l, p = S.loes.indexOf(j); if (p >= 0) S.loes.splice(p, 1); else S.loes.push(j); x.classList.toggle("an"); });
    if ($("#sk-eigen")) $("#sk-eigen").oninput = e => { S.eigen = e.target.value; };
    box.querySelectorAll("[data-f]").forEach(x => x.onclick = () => { const [k, j] = x.dataset.f.split("-").map(Number); S.fair[k] = j; schritt(); if (j === 1) sprich("Dann sucht ihr noch eine andere Lösung."); });
    if ($("#sk-druck")) $("#sk-druck").onclick = () => { zu(); drucken("abmachung", { namen: namen(), loes: [...S.loes.map(j => LOESUNGEN[j][1]), S.eigen].filter(Boolean) }); };
}
const fmt = z => `${Math.floor(Math.max(0, z) / 60)}:${String(Math.max(0, z) % 60).padStart(2, "0")}`;
function atmen(el, runden){
    let n = 0;
    const ein = () => { if (n >= runden){ el.textContent = "Gut gemacht 💚"; el.style.transform = "scale(1)"; return; } el.textContent = "Einatmen …"; el.style.transform = "scale(1.35)"; S.atem = setTimeout(aus, 4000); };
    const aus = () => { el.textContent = "Ausatmen …"; el.style.transform = "scale(.85)"; n++; S.atem = setTimeout(ein, 4000); };
    ein();
}
function konfetti(){ const f = ["#ffe08a", "#ff6b9a", "#5fb4ff", "#9cff8a", "#c39bff"]; for (let i = 0; i < 50; i++){ const k = document.createElement("div"); k.className = "sk-konf"; k.style.left = Math.random() * 100 + "%"; k.style.background = f[i % f.length];
    k.animate([{ transform: "translateY(0) rotate(0)" }, { transform: `translateY(${innerHeight + 40}px) rotate(${720 * Math.random()}deg)` }], { duration: 1800 + Math.random() * 1600, delay: Math.random() * 500, easing: "ease-in" }); document.body.appendChild(k); setTimeout(() => k.remove(), 4000); } }

/* ---------- Druckvorlagen (je genau eine A4-Seite) ---------- */
const kopf = (titel, meta) => `<div class="blatt-kopf"><div class="blatt-titel">${titel}</div><div class="blatt-meta"><i class="fa-solid fa-handshake-angle"></i> Sozialtraining${meta ? "<br>" + meta : ""}</div></div>`;
const name = (zweit = "Datum") => `<div class="blatt-name">Name: <span class="ln"></span> ${zweit}: <span class="ln kurz"></span></div>`;
const fuss = () => `<div class="blatt-fuss">Leuchtturm · Sozialtraining</div>`;
const linien = (n, h = 11) => Array.from({ length: n }, () => `<div style="border-bottom:.35mm solid #888;height:${h}mm"></div>`).join("");
const KS = `<style id="sk-druckstil">
.skd h3{ font-family:"Nunito",sans-serif; font-size:12.5pt; color:var(--nacht,#2f4a1f); margin:4.5mm 0 1.5mm; display:flex; gap:2.5mm; align-items:center; }
.skd h3 .n{ width:7mm; height:7mm; border-radius:50%; background:var(--meer,#557428); color:#fff; display:grid; place-items:center; font-size:10pt; flex:0 0 auto; }
.skd .gesichter{ display:flex; justify-content:space-around; gap:3mm; margin:1mm 0; }
.skd .gesichter div{ text-align:center; font-size:10pt; font-family:"Nunito",sans-serif; font-weight:700; } .skd .gesichter span{ display:block; font-size:28pt; } .skd .gesichter i{ display:block; width:6mm; height:6mm; border:.4mm solid #555; border-radius:1.2mm; margin:1mm auto 0; }
.skd .mal{ border:.5mm dashed #9aa98a; border-radius:4mm; flex:1 1 auto; min-height:50mm; display:flex; align-items:flex-start; padding:2mm 3mm; font-size:10pt; color:#7c8a72; font-family:"Nunito",sans-serif; font-weight:700; }
.skd .wahl{ display:grid; grid-template-columns:1fr 1fr; gap:1.5mm 5mm; font-size:12pt; } .skd .wahl div::before{ content:""; display:inline-block; width:4.5mm; height:4.5mm; border:.4mm solid #555; border-radius:1mm; margin-right:2mm; vertical-align:-.6mm; }
.skd table{ width:100%; border-collapse:collapse; font-size:9.5pt; font-family:"Nunito",sans-serif; } .skd th, .skd td{ border:.3mm solid #b8c4ad; padding:1.5mm; vertical-align:top; text-align:left; } .skd th{ background:#edf2e3; color:#2f4a1f; }
.skd .karte4{ display:grid; grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; gap:6mm; flex:1 1 auto; }
.skd .ichk{ border:.6mm dashed #9aa98a; border-radius:5mm; padding:5mm; display:flex; flex-direction:column; justify-content:space-around; gap:3mm; font-size:13pt; font-weight:700; }
.skd .ichk .lz2{ display:flex; gap:2mm; align-items:flex-end; } .skd .ichk .lz2 .ln{ flex:1; }
.skd .sign{ display:grid; grid-template-columns:1fr 1fr; gap:12mm; margin-top:auto; padding-top:10mm; font-size:10pt; font-family:"Nunito",sans-serif; } .skd .sign div{ border-top:.35mm solid #333; padding-top:1.5mm; }
</style>`;
function blatt(html){ const d = document.createElement("div"); d.className = "blatt skd"; d.innerHTML = html; return d; }
function drucken(was, daten = {}){
    const ziel = document.getElementById("druck"); ziel.innerHTML = KS;
    let b;
    if (was === "refl12") b = blatt(kopf("Nach dem Streit", "Kl. 1/2") + name() + `<div class="blatt-inhalt">
        <h3><span class="n">1</span>So habe ich mich gefühlt:</h3><div class="gesichter">${GEFUEHLE.slice(0, 6).map(([e, t]) => `<div><span>${e}</span>${t}<i></i></div>`).join("")}</div>
        <h3><span class="n">2</span>Wie geht es mir jetzt?</h3><div class="gesichter">${[["😊", "gut"], ["😐", "es geht"], ["☹️", "noch nicht gut"]].map(([e, t]) => `<div><span>${e}</span>${t}<i></i></div>`).join("")}</div>
        <h3><span class="n">3</span>Das mache ich nächstes Mal:</h3><div class="wahl">${["Stopp sagen", "tief atmen", "weggehen", "Hilfe holen", "mit Worten sagen, was mich stört", "abwechseln"].map(t => `<div>${t}</div>`).join("")}</div>
        <h3><span class="n">4</span>Male, wie wir uns wieder vertragen:</h3><div class="mal">Malfeld</div></div>` + fuss());
    if (was === "refl34") b = blatt(kopf("Nach dem Streit – ich denke nach", "Kl. 3/4") + name() + `<div class="blatt-inhalt">
        ${[["Was ist passiert?", 3], ["Wie habe ich mich gefühlt? Warum?", 2], ["Wie hat sich das andere Kind wohl gefühlt?", 2], ["Was war mein Anteil am Streit?", 2], ["Was mache ich nächstes Mal anders?", 2], ["Wie kann ich es wiedergutmachen?", 2]]
            .map(([f, n], i) => `<h3><span class="n">${i + 1}</span>${f}</h3>${linien(n, 10)}`).join("")}
        <h3><span class="n">7</span>Wie geht es mir jetzt?</h3><div class="gesichter">${[["😊", "gut"], ["😐", "es geht"], ["☹️", "noch nicht gut"]].map(([e, t]) => `<div><span>${e}</span>${t}<i></i></div>`).join("")}</div></div>` + fuss());
    if (was === "abmachung"){
        const [a, c] = daten.namen || ["", ""], l = daten.loes || [];
        b = blatt(kopf("Unsere Abmachung", "") + `<div class="blatt-inhalt" style="font-size:14pt">
            <p style="margin:6mm 0 2mm">Wir, <b style="display:inline-block;min-width:45mm;border-bottom:.35mm solid #555">${esc(a)}</b> und <b style="display:inline-block;min-width:45mm;border-bottom:.35mm solid #555">${esc(c)}</b>,</p>
            <p style="margin:0 0 4mm">hatten einen Streit. Wir haben darüber gesprochen und uns so geeinigt:</p>
            ${l.length ? l.map(x => `<div style="font-weight:800;margin:2mm 0">✅ ${esc(x)}</div>`).join("") + linien(2, 11) : linien(5, 12)}
            <h3><span class="n">!</span>Wenn es wieder Streit gibt, dann …</h3>${linien(2, 11)}
            <h3><span class="n">✓</span>Wir schauen nach einer Woche nach, ob es klappt:</h3><div class="gesichter">${[["👍", "hat geklappt"], ["🤏", "ein bisschen"], ["👎", "noch nicht"]].map(([e, t]) => `<div><span>${e}</span>${t}<i></i></div>`).join("")}</div>
            <div class="sign"><div>Unterschrift</div><div>Unterschrift</div><div>Datum</div><div>Streitschlichter/in bzw. Lehrkraft</div></div></div>` + fuss());
    }
    if (was === "ich") b = blatt(kopf("Ich-Botschaft-Karten", "zum Ausschneiden") + `<div class="blatt-inhalt"><div class="karte4">${Array.from({ length: 4 }, () => `<div class="ichk"><div style="font-size:24pt;text-align:center">💬</div>
        <div class="lz2">Ich fühle mich <span class="ln"></span></div><div class="lz2">wenn du <span class="ln"></span></div><div class="lz2"><span class="ln"></span></div><div class="lz2">weil <span class="ln"></span></div><div class="lz2">Ich wünsche mir, <span class="ln"></span></div><div class="lz2"><span class="ln"></span></div></div>`).join("")}</div></div>` + fuss());
    if (was === "beob") b = blatt(kopf("Beobachtungsbogen Sozialverhalten", "für die Lehrkraft") + `<div class="blatt-name">Kürzel: <span class="ln kurz"></span> Klasse: <span class="ln kurz"></span> Zeitraum: <span class="ln"></span></div>
        <div class="blatt-inhalt"><table><tr><th style="width:15mm">Datum</th><th>Situation / Ort</th><th>Auslöser</th><th>Verhalten des Kindes</th><th>Reaktion / Maßnahme</th><th style="width:22mm">Ergebnis</th></tr>
        ${Array.from({ length: 9 }, () => `<tr style="height:15mm"><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}</table>
        <h3><span class="n">Σ</span>Häufigkeit pro Woche (Strichliste)</h3><table><tr><th>Woche</th>${["1", "2", "3", "4"].map(w => `<th>${w}</th>`).join("")}</tr>${["Streit / Konflikt", "Hilfe geholt", "selbst gelöst"].map(r => `<tr style="height:9mm"><td>${r}</td><td></td><td></td><td></td><td></td></tr>`).join("")}</table>
        <h3><span class="n">+</span>Stärken & was gut klappt</h3>${linien(2, 9)}</div>` + fuss());
    ziel.appendChild(b);
    setTimeout(() => window.print(), 80);
}
window.sozialKonflikt = { zeigen, schlichtung, drucken };
})();
