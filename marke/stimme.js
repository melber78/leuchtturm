/* ============================================================
   Leuchtturm – Vorlesestimme für alle Seiten
   Die Stimme kommt vom Gerät (Android, iPad, Windows …). Dieses Skript
   · wählt automatisch die beste deutsche Stimme (Natural/Neural/Premium/Google …),
   · merkt sich eine selbst gewählte Stimme und das Tempo (pro Gerät),
   · gilt für jedes Vorlesen im Leuchtturm, ohne dass jede Seite etwas ändern muss.
   Auswahl-Feld: LT_STIMME.auswahl(element)
   ============================================================ */
(function(){
if (!("speechSynthesis" in window) || window.LT_STIMME) return;
const KEY = "lt-stimme";
const einst = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e){ return {}; } };
const speichern = e => { try { localStorage.setItem(KEY, JSON.stringify(e)); } catch (x){} };
let stimmen = [];
function laden(){ stimmen = speechSynthesis.getVoices().filter(v => /^de(-|_|$)/i.test(v.lang)); }
laden(); try { speechSynthesis.addEventListener("voiceschanged", laden); } catch (e){ speechSynthesis.onvoiceschanged = laden; }
function punkte(v){
    const n = v.name || "";
    let p = 0;
    if (/natural|neural|online/i.test(n)) p += 6;          // Edge/Windows: sehr gute Online-Stimmen
    if (/premium|enhanced|erweitert|verbessert/i.test(n)) p += 5;  // iPad/Mac: heruntergeladene Qualitätsstimmen
    if (/google/i.test(n)) p += 3;                          // Chrome/Android
    if (/network/i.test(n) || v.localService === false) p += 2;   // Android: Online-Stimmen klingen deutlich besser als die lokalen
    if (/de-DE|Deutschland/i.test(v.lang + n)) p += 1;
    if (/anna|petra|helena|katja|vicki|marlene|amala/i.test(n)) p += 1;
    if (/compact|eSpeak|robot/i.test(n)) p -= 6;
    return p;
}
function beste(){ return stimmen.slice().sort((a, b) => punkte(b) - punkte(a))[0] || null; }
function gewaehlt(){ const e = einst(); return (e.name && stimmen.find(v => v.name === e.name)) || beste(); }
// jedes deutsche Vorlesen bekommt die gewählte Stimme und das gewählte Tempo
const orig = SpeechSynthesis.prototype.speak;
SpeechSynthesis.prototype.speak = function(u){
    try {
        if (u && (!u.lang || /^de/i.test(u.lang))){
            if (!stimmen.length) laden();
            const v = gewaehlt(); if (v){ u.voice = v; u.lang = v.lang; }
            const e = einst(); if (e.tempo) u.rate = Math.max(.5, Math.min(1.6, (u.rate || 1) * e.tempo));
            if (e.hoehe) u.pitch = e.hoehe;
        }
    } catch (x){}
    return orig.call(this, u);
};
function probe(){ try { const u = new SpeechSynthesisUtterance("Hallo! Ich lese dir die Aufgaben vor. Son-ne, Ta-sche, Lö-we."); u.lang = "de-DE"; u.rate = .9; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e){} }
function auswahl(el){
    const zeichnen = () => {
        laden();
        const e = einst(), akt = gewaehlt();
        el.innerHTML = stimmen.length ? `<label class="hilfe" style="display:block;margin-top:8px">🔊 Vorlesestimme</label>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:4px">
                <select id="lt-st-wahl" style="flex:1 1 220px;min-width:0">${stimmen.slice().sort((a, b) => punkte(b) - punkte(a)).map(v => `<option value="${v.name.replace(/"/g, "&quot;")}"${akt && v.name === akt.name ? " selected" : ""}>${v.name}${punkte(v) >= 5 ? " ★" : ""}</option>`).join("")}</select>
                <button type="button" id="lt-st-probe" style="border:2px solid #dfe6d4;background:#fff;border-radius:12px;padding:8px 12px;font:inherit;font-weight:800;cursor:pointer">▶ Probe</button></div>
            <div style="display:flex;gap:8px;align-items:center;margin-top:8px;font-weight:700;color:#68745f;font-size:14px">Tempo
                <input type="range" id="lt-st-tempo" min="0.7" max="1.3" step="0.05" value="${e.tempo || 1}" style="flex:1"> <span id="lt-st-tw">${Math.round((e.tempo || 1) * 100)} %</span></div>
            <p class="hilfe" style="margin:6px 0 0;font-size:13px">★ = besonders natürlich. Klingen alle Stimmen schlecht? Dann auf dem Gerät eine bessere deutsche Stimme laden (siehe Anleitung im Leuchtturm).</p>`
            : `<p class="hilfe">Auf diesem Gerät wurde noch keine deutsche Vorlesestimme gefunden.</p>`;
        const w = el.querySelector("#lt-st-wahl"), t = el.querySelector("#lt-st-tempo");
        if (w) w.onchange = () => { speichern({ ...einst(), name: w.value }); probe(); };
        if (t) t.oninput = () => { speichern({ ...einst(), tempo: +t.value }); el.querySelector("#lt-st-tw").textContent = Math.round(t.value * 100) + " %"; };
        if (t) t.onchange = probe;
        const p = el.querySelector("#lt-st-probe"); if (p) p.onclick = probe;
    };
    zeichnen();
    try { speechSynthesis.addEventListener("voiceschanged", zeichnen); } catch (e){}
}
window.LT_STIMME = { auswahl, probe, gewaehlt, beste };
})();
