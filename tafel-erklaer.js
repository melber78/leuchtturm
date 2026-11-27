/* ===============================================================
   Leuchtturm – gemeinsame Technik für Erklär-Tafeln
   (wie „Brüche“: Reiter, Bild, Merksatz, Schritte zum Aufdecken)
   Genutzt von tafel-mathe.js und tafel-deutsch.js.
   Jede Tafel: ErklaerTafel.neu({ id, titel, unter, hash, kapitel, K, S, speicher })
   K[kap]() liefert { frage, aufgabe, bild, merke, regler, schritte: [[Text, Lösung]], unten }
   Teile im Bild mit data-s="i" werden zusammen mit Schritt i aufgedeckt.
   =============================================================== */
(function(){
"use strict";
const CSS = `
.ek{ position:fixed; inset:0; display:none; flex-direction:column; z-index:12; background:#eef2f6; color:#1f2d36; font-family:"Nunito",sans-serif; user-select:none; -webkit-user-select:none; }
.ek.an{ display:flex; }
.ek.kreide{ background:#24403a; color:#f3efe3; }
.ek-leiste{ display:flex; gap:8px; align-items:center; padding:8px 14px 6px; flex-wrap:wrap; }
.ek-titel{ font-weight:900; font-size:19px; color:#2f4a1f; margin-right:4px; }
.ek-titel small{ font-weight:800; color:#7c8a96; font-size:14px; margin-left:4px; }
.ek.kreide .ek-titel{ color:#f3efe3; } .ek.kreide .ek-titel small{ color:#b9c9bf; }
.ek.kreide .tb-k{ background:rgba(255,255,255,.12); color:#f3efe3; }
.ek .tb-k.an{ background:#2f4a1f !important; color:#fff !important; }
.ek.kreide .tb-k.an{ background:#f3efe3 !important; color:#24403a !important; }
.ek-tabs{ display:flex; gap:6px; overflow-x:auto; padding:0 14px 10px; scrollbar-width:none; flex:none; }
.ek-tabs::-webkit-scrollbar{ display:none; }
.ek-tab{ font:800 15px "Nunito",sans-serif; border:2px solid #d6dee6; background:white; color:#2f4a1f; border-radius:999px; padding:8px 15px; cursor:pointer; white-space:nowrap; min-height:44px; }
.ek-tab.an{ background:#2f4a1f; border-color:#2f4a1f; color:white; }
.ek.kreide .ek-tab{ background:rgba(255,255,255,.07); border-color:rgba(255,255,255,.2); color:#f3efe3; }
.ek.kreide .ek-tab.an{ background:#f3efe3; color:#24403a; border-color:#f3efe3; }
.ek-haupt{ flex:1; min-height:0; display:flex; gap:2vmin; padding:0 2vmin 2vmin; }
.ek-buehne{ flex:1.35; min-width:0; background:white; border-radius:22px; box-shadow:0 6px 24px rgba(47,74,31,.08); display:flex; flex-direction:column; padding:2.2vmin 2.4vmin; gap:1.5vmin; }
.ek.kreide .ek-buehne, .ek.kreide .ek-panel{ background:rgba(255,255,255,.06); box-shadow:none; }
.ek-frage{ text-align:center; font-weight:800; color:#6b7a86; font-size:clamp(15px,2.2vmin,24px); }
.ek.kreide .ek-frage{ color:#c9d8cd; }
.ek-aufgabe{ font-size:clamp(30px,6.4vmin,90px); font-weight:900; display:flex; align-items:center; justify-content:center; gap:.3em; flex-wrap:wrap; color:#2f4a1f; line-height:1.1; font-variant-numeric:tabular-nums; }
.ek.kreide .ek-aufgabe{ color:#fdfaf1; }
.ek-aufgabe .op{ color:#7c8a96; font-weight:800; }
.ek-bild{ flex:1; min-height:0; display:flex; align-items:center; justify-content:center; }
.ek-bild svg{ width:100%; height:100%; max-height:100%; overflow:visible; }
.ek-bild .ek-ohne{ color:#9aa8b4; font-weight:800; font-size:clamp(15px,2vmin,22px); text-align:center; }
.ek-panel{ flex:1; max-width:660px; min-width:300px; background:white; border-radius:22px; box-shadow:0 6px 24px rgba(47,74,31,.08); padding:2.2vmin 2.4vmin; display:flex; flex-direction:column; gap:1.5vmin; overflow:auto; }
.ek-merke{ background:#eaf2f9; border-left:6px solid #557428; border-radius:12px; padding:1.1vmin 1.5vmin; font-size:clamp(15px,1.95vmin,21px); line-height:1.4; font-weight:700; }
.ek-merke b:first-child{ display:block; font-size:.72em; letter-spacing:.08em; text-transform:uppercase; color:#557428; margin-bottom:2px; }
.ek.kreide .ek-merke{ background:rgba(255,255,255,.08); border-left-color:#f2c14e; }
.ek.kreide .ek-merke b:first-child{ color:#f2c14e; }
.ek-regler{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
.ek-st{ display:inline-flex; align-items:center; gap:4px; background:#eef2f6; border-radius:999px; padding:4px 4px 4px 12px; font-weight:800; font-size:14px; color:#52606b; }
.ek-st b{ min-width:1.7em; text-align:center; font-size:20px; color:#2f4a1f; font-variant-numeric:tabular-nums; }
.ek-st button, .ek-wahl button{ font:900 18px "Nunito",sans-serif; border:0; background:white; color:#2f4a1f; width:38px; height:38px; border-radius:50%; cursor:pointer; box-shadow:0 2px 6px rgba(47,74,31,.1); }
.ek-wahl{ display:inline-flex; background:#eef2f6; border-radius:999px; padding:4px; gap:3px; }
.ek-wahl button{ width:auto; border-radius:999px; padding:0 13px; font-size:15px; font-weight:800; box-shadow:none; background:transparent; }
.ek-wahl button.an{ background:#2f4a1f; color:white; }
.ek.kreide .ek-st, .ek.kreide .ek-wahl{ background:rgba(255,255,255,.1); color:#d8e3da; }
.ek.kreide .ek-st b{ color:#fdfaf1; }
.ek.kreide .ek-st button{ background:rgba(255,255,255,.16); color:#fdfaf1; box-shadow:none; }
.ek.kreide .ek-wahl button{ color:#f3efe3; }
.ek.kreide .ek-wahl button.an{ background:#f3efe3; color:#24403a; }
.ek-eingabe{ display:flex; gap:6px; width:100%; }
.ek-eingabe input{ flex:1; min-width:0; font:800 17px "Nunito",sans-serif; border:2px solid #d6dee6; border-radius:12px; padding:9px 12px; color:#2f4a1f; background:white; }
.ek-eingabe button{ font:900 15px "Nunito",sans-serif; border:0; border-radius:12px; background:#557428; color:white; padding:0 16px; cursor:pointer; }
.ek-fehler{ color:#d1342b; font-weight:800; font-size:14px; width:100%; }
.ek-h{ font-size:13px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; color:#7c8a96; margin:2px 0 -4px; }
.ek.kreide .ek-h{ color:#b9c9bf; }
.ek-schritte{ display:flex; flex-direction:column; gap:1.1vmin; }
.ek-s{ display:grid; grid-template-columns:auto 1fr; gap:.5vmin 1.2vmin; align-items:start; }
.ek-s .nr{ width:clamp(26px,3.4vmin,38px); height:clamp(26px,3.4vmin,38px); border-radius:50%; background:#2f4a1f; color:white; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:clamp(14px,1.9vmin,20px); grid-row:span 2; }
.ek.kreide .ek-s .nr{ background:#f3efe3; color:#24403a; }
.ek-s .f{ font-size:clamp(15px,2vmin,22px); font-weight:800; line-height:1.3; padding-top:.15em; }
.ek-s .a{ font-size:clamp(20px,3.1vmin,38px); font-weight:900; color:#2f4a1f; line-height:1.15; font-variant-numeric:tabular-nums; }
.ek.kreide .ek-s .a{ color:#fdfaf1; }
.ek-s .a small{ font-size:.55em; font-weight:800; color:#52606b; }
.ek.kreide .ek-s .a small{ color:#d8e3da; }
.ek-knoepfe{ display:flex; gap:8px; flex-wrap:wrap; margin-top:auto; padding-top:.6vmin; }
.ek-knoepfe button{ font:900 clamp(15px,1.9vmin,19px) "Nunito",sans-serif; border:0; border-radius:999px; padding:11px 18px; cursor:pointer; background:#eef2f6; color:#2f4a1f; display:inline-flex; gap:8px; align-items:center; min-height:46px; }
.ek-knoepfe .haupt{ background:#2f4a1f; color:white; }
.ek-knoepfe .neu{ background:#e08a2c; color:white; }
.ek.kreide .ek-knoepfe button{ background:rgba(255,255,255,.12); color:#f3efe3; }
.ek.kreide .ek-knoepfe .haupt{ background:#f3efe3; color:#24403a; }
.ek.kreide .ek-knoepfe .neu{ background:#e08a2c; color:white; }

/* Brüche schreiben */
.bz{ display:inline-flex; flex-direction:column; align-items:center; vertical-align:middle; line-height:1.02; font-size:.8em; margin:0 .06em; font-variant-numeric:tabular-nums; }
.bz > span{ padding:0 .14em; }
.bz > span:first-child{ border-bottom:.075em solid currentColor; }
.gz{ display:inline-flex; align-items:center; gap:.06em; }
.bz-g{ display:inline-block; }
.lsg{ display:inline-flex; align-items:center; gap:.25em; flex-wrap:wrap; border-radius:12px; }
.lsg.zu{ position:relative; background:#e3e9ef; cursor:pointer; color:transparent; min-width:1.7em; min-height:1.25em; justify-content:center; }
.lsg.zu *{ visibility:hidden; }
.lsg.zu::after{ content:"?"; position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#9aa8b4; font-weight:900; }
.ek-s .lsg.zu{ display:flex; width:100%; min-height:1.5em; }
.ek-s .lsg.zu::after{ content:"antippen"; font-size:clamp(13px,1.6vmin,17px); letter-spacing:.06em; text-transform:uppercase; }
.ek.kreide .lsg.zu{ background:rgba(255,255,255,.12); }
.ek.kreide .lsg.zu::after{ color:rgba(255,255,255,.45); }
.lsg.neu{ animation:ekAuf .7s ease; }
@keyframes ekAuf{ 0%{ background:#ffe39a; } 100%{ background:transparent; } }
.rot{ color:#d1342b; } .blau{ color:#557428; } .orange{ color:#d17a1c; }
.ek.kreide .rot{ color:#ff9b8f; } .ek.kreide .blau{ color:#9fd0f0; } .ek.kreide .orange{ color:#ffc27a; }

/* Farben im Bild */
.ek svg .st{ stroke:#2f4a1f; } .ek.kreide svg .st{ stroke:#f3efe3; }
.ek svg .tx{ fill:#2f4a1f; } .ek.kreide svg .tx{ fill:#f3efe3; }
.ek svg .txg{ fill:#7c8a96; } .ek.kreide svg .txg{ fill:#b9c9bf; }
.ek svg .f0{ fill:#ffffff; } .ek.kreide svg .f0{ fill:rgba(255,255,255,.05); }
.ek svg .fa{ fill:#557428; } .ek svg .fb{ fill:#e08a2c; } .ek svg .fab{ fill:#6a4c93; }
.ek svg .fa2{ fill:#cfe3f1; } .ek svg .fb2{ fill:#f8dcb8; }
.ek.kreide svg .fa{ fill:#5ea6d6; } .ek.kreide svg .fa2{ fill:rgba(94,166,214,.3); } .ek.kreide svg .fb2{ fill:rgba(224,138,44,.32); }
.ek svg .fr{ fill:url(.ekSchraffur); }
.ek svg .txa{ fill:#557428; } .ek svg .txb{ fill:#d17a1c; } .ek svg .txr{ fill:#d1342b; }
.ek.kreide svg .txa{ fill:#9fd0f0; } .ek.kreide svg .txb{ fill:#ffc27a; } .ek.kreide svg .txr{ fill:#ff9b8f; }
.ek svg .la{ stroke:#557428; } .ek svg .lb{ stroke:#d17a1c; } .ek svg .lr{ stroke:#d1342b; }
.ek.kreide svg .la{ stroke:#9fd0f0; } .ek.kreide svg .lb{ stroke:#ffc27a; } .ek.kreide svg .lr{ stroke:#ff9b8f; }

.ek-menue{ position:absolute; top:62px; right:14px; background:white; color:#2f4a1f; border-radius:18px; box-shadow:0 12px 40px rgba(47,74,31,.2); padding:14px; display:none; flex-direction:column; gap:8px; z-index:6; min-width:240px; }
.ek-menue.an{ display:flex; }
.ek-menue h4{ margin:4px 0 0; font-size:12px; text-transform:uppercase; letter-spacing:.06em; color:#7c8a96; }
.ek-menue .reihe{ display:flex; gap:6px; flex-wrap:wrap; }
.ek-menue button{ font:800 15px "Nunito",sans-serif; border:2px solid #e3e8ee; background:#f7f9fb; color:#2f4a1f; border-radius:12px; padding:8px 12px; cursor:pointer; }
.ek-menue button.an{ background:#2f4a1f; border-color:#2f4a1f; color:white; }

@media (max-width:900px), (orientation:portrait){
  .ek{ overflow-y:auto; -webkit-overflow-scrolling:touch; }
  .ek-haupt{ flex-direction:column; flex:none; padding:0 10px 14px; gap:10px; }
  .ek-buehne{ flex:none; padding:14px; }
  .ek-bild{ flex:none; height:min(62vw, 46vh); min-height:170px; }
  .ek-panel{ flex:none; max-width:none; min-width:0; padding:14px; }
  .ek-leiste .tb-k .ek-txt{ display:none; }
  .ek-leiste{ padding:8px 10px 6px; gap:6px; }
  .ek-tabs{ padding:0 10px 8px; }
  .ek-titel small{ display:none; }
  .ek-knoepfe button{ flex:1 1 auto; justify-content:center; }
}

.ek-bild .zu-s{ opacity:0; transition:opacity .4s; }
.ek-bild .auf-s{ opacity:1; }
.ek-aufgabe .lsg.zu{ min-width:2.2em; }
.ek-wahl.gross button{ font-size:17px; padding:0 16px; min-height:44px; }
.ek-tasten{ display:flex; flex-wrap:wrap; gap:6px; }
.ek-tasten button{ font:900 15px "Nunito",sans-serif; border:0; border-radius:12px; padding:9px 13px; cursor:pointer; color:#fff; min-height:42px; }
.ek-tasten button.an{ outline:4px solid #2f4a1f; outline-offset:2px; }
.ek.kreide .ek-tasten button.an{ outline-color:#f3efe3; }
`;
let cssDa = false;
const L = (html, cls) => `<span class="lsg zu ${cls || ""}" data-l="1"><span>${html}</span></span>`;
const stepper = (label, key, wert) => `<span class="ek-st">${label}<button data-st="${key}" data-d="-1" title="weniger">−</button><b>${wert}</b><button data-st="${key}" data-d="1" title="mehr">+</button></span>`;
const wahl = (key, liste, akt, gross) => `<span class="ek-wahl${gross ? " gross" : ""}">${liste.map(([w, t]) => `<button data-set="${key}=${w}" class="${String(akt) === String(w) ? "an" : ""}">${t}</button>`).join("")}</span>`;

function neu(cfg){
    const S = cfg.S, K = cfg.K;
    let el;
    try { const m = JSON.parse(localStorage.getItem(cfg.speicher) || "{}"); if (m.kap && K[m.kap]) S.kap = m.kap; if (m.hg) S.hg = m.hg; if (m.bild === false) S.bild = false; } catch (x) {}
    S.hg = S.hg || "hell"; if (S.bild === undefined) S.bild = true;
    const merken = () => { try { localStorage.setItem(cfg.speicher, JSON.stringify({ kap: S.kap, hg: S.hg, bild: S.bild })); } catch (x) {} };

    function aufbauen(){
        if (el) return;
        if (!cssDa){ const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st); cssDa = true; }
        el = document.createElement("div");
        el.className = "ek"; el.id = "ek-" + cfg.id;
        el.innerHTML = `
            <div class="ek-leiste">
                <button class="tb-k rund" data-a="zu" title="Zurück zur Übersicht"><i class="fa-solid fa-arrow-left"></i></button>
                <span class="ek-titel">${cfg.titel} <small>${cfg.unter || ""}</small></span>
                <span style="flex:1"></span>
                <button class="tb-k" data-a="bild" data-bildk="1" title="Bild ein- oder ausblenden"><i class="fa-solid fa-image"></i><span class="ek-txt"> Bild</span></button>
                <button class="tb-k rund" data-a="menue" title="Einstellungen"><i class="fa-solid fa-sliders"></i></button>
                <button class="tb-k rund" data-a="voll" title="Vollbild"><i class="fa-solid fa-expand"></i></button>
            </div>
            <div class="ek-tabs">${cfg.kapitel.map(([k, t], i) => `<button class="ek-tab" data-kap="${k}">${i + 1} · ${t}</button>`).join("")}</div>
            <div class="ek-menue"><h4>Hintergrund</h4><div class="reihe"><button data-hg="hell">hell</button><button data-hg="kreide">Kreidetafel</button></div></div>
            <div class="ek-haupt">
                <div class="ek-buehne"><div class="ek-frage"></div><div class="ek-aufgabe"></div><div class="ek-bild"></div></div>
                <div class="ek-panel"></div>
            </div>`;
        document.body.appendChild(el);
        el.addEventListener("click", klick);
        el.addEventListener("submit", e => { e.preventDefault(); const k = K[S.kap]; if (k && k.eingabe){ const r = k.eingabe(e.target.querySelector("input").value || ""); S.fehler = r === false ? (k.fehlerText || "Das habe ich nicht verstanden.") : ""; zeichnen(); } });
        if (cfg.aufgebaut) cfg.aufgebaut(el, api);
    }

    function zeichnen(){
        el.classList.toggle("kreide", S.hg === "kreide");
        el.querySelectorAll("[data-kap]").forEach(b => b.classList.toggle("an", b.dataset.kap === S.kap));
        el.querySelectorAll("[data-hg]").forEach(b => b.classList.toggle("an", b.dataset.hg === S.hg));
        el.querySelector("[data-bildk]").classList.toggle("an", !S.bild);
        const d = K[S.kap]();
        el.querySelector(".ek-frage").innerHTML = d.frage || "";
        el.querySelector(".ek-aufgabe").innerHTML = d.aufgabe || "";
        el.querySelector(".ek-aufgabe").style.display = d.aufgabe ? "" : "none";
        el.querySelector(".ek-bild").innerHTML = !S.bild ? `<div class="ek-ohne"><i class="fa-solid fa-eye-slash"></i> Bild ausgeblendet – oben auf „Bild“ tippen</div>` : (d.bild || "");
        const sch = d.schritte || [];
        el.querySelector(".ek-panel").innerHTML = `
            ${d.merke ? `<div class="ek-merke">${d.merke}</div>` : ""}
            ${d.regler ? `<div class="ek-regler">${d.regler}</div>` : ""}
            ${S.fehler ? `<div class="ek-fehler">${S.fehler}</div>` : ""}
            ${sch.length ? `<div class="ek-h">${d.schritteTitel || "Rechenweg"}</div>
            <div class="ek-schritte">${sch.map((s, i) => `<div class="ek-s"><span class="nr">${i + 1}</span><div class="f">${s[0]}</div><div class="a">${s[1] === "" ? "" : `<span class="lsg zu" data-l="1" data-i="${i}"><span>${s[1]}</span></span>`}</div></div>`).join("")}</div>` : ""}
            ${d.unten || ""}
            <div class="ek-knoepfe">
                ${sch.length ? `<button class="haupt" data-a="weiter"><i class="fa-solid fa-forward-step"></i> Nächster Schritt</button>` : ""}
                ${sch.length || d.loesbar ? `<button data-a="alle"><i class="fa-solid fa-eye"></i> Alles zeigen</button><button data-a="verdecken"><i class="fa-solid fa-eye-slash"></i> Verdecken</button>` : ""}
                ${K[S.kap].neu ? `<button class="neu" data-a="neu"><i class="fa-solid fa-dice"></i> Neues Beispiel</button>` : ""}
            </div>`;
        el.querySelectorAll(".ek-bild [data-s]").forEach(x => x.classList.add("zu-s"));
        if (d.nachher) d.nachher(el, api);
        const tab = el.querySelector(`[data-kap="${S.kap}"]`); if (tab && tab.scrollIntoView) tab.scrollIntoView({ block: "nearest", inline: "nearest" });
    }

    function bildTeile(i, an){ el.querySelectorAll(`.ek-bild [data-s="${i}"]`).forEach(x => { x.classList.toggle("auf-s", an); }); }
    function aufdecken(x){ x.classList.remove("zu"); x.classList.add("neu"); setTimeout(() => x.classList.remove("neu"), 800); if (x.dataset.i !== undefined) bildTeile(x.dataset.i, true); }
    function zudecken(x){ x.classList.add("zu"); if (x.dataset.i !== undefined) bildTeile(x.dataset.i, false); }

    function klick(e){
        const t = e.target.closest("button, .lsg, [data-x]");
        if (!t){ if (!e.target.closest(".ek-menue")) el.querySelector(".ek-menue").classList.remove("an"); return; }
        if (t.dataset.x !== undefined && K[S.kap].x){ K[S.kap].x(t.dataset.x, t, api); return; }
        if (t.classList.contains("lsg")){ t.classList.contains("zu") ? aufdecken(t) : zudecken(t); return; }
        if (t.dataset.kap){ S.kap = t.dataset.kap; S.fehler = ""; merken(); return zeichnen(); }
        if (t.dataset.hg){ S.hg = t.dataset.hg; merken(); return zeichnen(); }
        if (t.dataset.st){ K[S.kap].st(t.dataset.st, +t.dataset.d); S.fehler = ""; return zeichnen(); }
        if (t.dataset.set){ const [k, v] = t.dataset.set.split("="); S[S.kap][k] = v; if (K[S.kap].set) K[S.kap].set(k, v); S.fehler = ""; return zeichnen(); }
        const a = t.dataset.a;
        if (a === "zu") return schliessen();
        if (a === "voll") return window.vollbild ? window.vollbild() : null;
        if (a === "menue") return el.querySelector(".ek-menue").classList.toggle("an");
        if (a === "bild"){ S.bild = !S.bild; merken(); return zeichnen(); }
        if (a === "neu"){ S.fehler = ""; K[S.kap].neu(); return zeichnen(); }
        if (a === "weiter"){ const n = el.querySelector(".ek-panel .lsg.zu"); if (n){ aufdecken(n); if (n.scrollIntoView) n.scrollIntoView({ block: "nearest", behavior: "smooth" }); } else if (K[S.kap].allesAuf) K[S.kap].allesAuf(el, api); return; }
        if (a === "alle"){ el.querySelectorAll(".lsg.zu").forEach(aufdecken); if (K[S.kap].allesAuf) K[S.kap].allesAuf(el, api); return; }
        if (a === "verdecken"){ el.querySelectorAll(".lsg").forEach(zudecken); if (K[S.kap].allesZu) K[S.kap].allesZu(el, api); return; }
        if (K[S.kap].knopf) K[S.kap].knopf(a, t, api);
    }

    function oeffnen(kap){
        aufbauen();
        if (kap && K[kap]) S.kap = kap;
        el.classList.add("an");
        const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "none";
        try { history.replaceState(null, "", "#" + cfg.hash); } catch (x) {}
        zeichnen();
    }
    function schliessen(){
        el.classList.remove("an");
        const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "";
        try { history.replaceState(null, "", location.pathname); } catch (x) {}
    }
    const api = { oeffnen, schliessen, zeichnen, S, el: () => el };
    document.addEventListener("DOMContentLoaded", () => { if (location.hash === "#" + cfg.hash) oeffnen(); });
    return api;
}
window.ErklaerTafel = { neu, L, stepper, wahl };
})();
