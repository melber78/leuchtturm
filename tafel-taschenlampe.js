/* ===============================================================
   Tafelbild: Taschenlampen-Lesen (Klasse 1–4)
   Die Tafel ist dunkel. Ein Kind führt mit dem Finger eine
   Taschenlampe über die Tafel – im Lichtkegel tauchen Buchstaben,
   Silben, Wörter oder Sätze auf und werden laut vorgelesen.
   Zwei Arten: Freies Lesen · Wort suchen („Finde: Sofa“)
   =============================================================== */
(function(){
"use strict";

/* ---------- Inhalte (Silben mit „-“ getrennt) ---------- */
const INHALT = {
    buchstaben: { name: "Buchstaben", kl: "Kl. 1", n: 14, art: "b",
        liste: "A a M m O o I i L l S s E e U u N n R r T t F f D d H h W w K k B b P p G g Z z".split(" ") },
    silben: { name: "Silben", kl: "Kl. 1", n: 14, art: "s",
        liste: "Ma Mi Mo Mu Me La Li Lo Le Lu Sa Si So Se Su Na Ni No Ne Ra Ri Ro Re Ta Ti To Te Tu Fa Fi Fo Wa Wi Wo Ha Hu Ho Bo Ba Bi Da Do Di Pa Po Pi Ka Ko Ki Ge Gu".split(" ") },
    woerter12: { name: "Kurze Wörter", kl: "Kl. 1/2", n: 10, art: "w",
        liste: ["Ma-ma", "O-ma", "O-pa", "So-fa", "Ro-se", "Na-se", "Ho-se", "Li-mo", "I-gel", "E-sel", "Au-to", "La-ma", "Na-me", "Ta-fel", "Mo-fa", "Do-se", "Ha-se", "Ki-no", "Mo-tor", "Pi-lot", "Ro-bo-ter", "Me-lo-ne", "To-ma-te", "Ro-si-ne", "Ba-na-ne", "Sa-la-mi", "Eis", "Maus", "Haus", "Mond", "Wal", "Ball", "Hund", "Nest", "Fisch", "Baum", "Son-ne", "Lö-we", "Ra-be", "Ne-bel", "Ha-fen", "Su-pe", "Wol-ke", "Müt-ze", "Wo-che", "Ka-me-ra", "Ga-bel"] },
    woerter34: { name: "Lange Wörter", kl: "Kl. 3/4", n: 8, art: "w",
        liste: ["Ta-schen-lam-pe", "Schmet-ter-ling", "Ge-burts-tag", "Fahr-rad-helm", "Klas-sen-zim-mer", "Scho-ko-la-de", "Re-gen-bo-gen", "Turn-schu-he", "Bus-hal-te-stel-le", "Som-mer-fe-ri-en", "Haus-auf-ga-ben", "Feu-er-wehr-au-to", "Kin-der-zim-mer", "Son-nen-blu-me", "Pau-sen-hof", "Erd-beer-eis", "Zahn-bürs-te", "Schul-ran-zen", "Fe-der-map-pe", "Spiel-platz", "Lö-wen-zahn", "Kar-tof-fel-sa-lat", "Hub-schrau-ber", "Schwimm-bad", "Was-ser-rut-sche", "Lieb-lings-buch", "Pi-ra-ten-schiff", "Dra-chen-schnur", "Gum-mi-stie-fel", "Ku-schel-tier"] },
    advent12: { name: "Advent & Winter", kl: "Kl. 1/2", n: 10, art: "w",
        liste: ["Stern", "Ker-ze", "Schnee", "Baum", "Ge-schenk", "Müt-ze", "Schal", "Ro-del", "Ni-ko-laus", "En-gel", "Ku-gel", "Win-ter", "Plätz-chen", "Glo-cke", "Tan-ne", "Stie-fel", "Schlit-ten", "Ren-tier", "Zimt", "Ap-fel", "Nuss", "Ka-kao", "Hand-schu-he"] },
    advent34: { name: "Advent & Winter", kl: "Kl. 3/4", n: 8, art: "w",
        liste: ["Ad-vents-kranz", "Weih-nachts-baum", "Leb-ku-chen", "Schnee-mann", "Ad-vents-ka-len-der", "Weih-nachts-markt", "Schlit-ten-fahrt", "Lich-ter-ket-te", "Ge-schenk-pa-pier", "Schnee-flo-cke", "Zimt-stern", "Weih-nachts-mann", "Win-ter-ja-cke", "Eis-zap-fen", "Back-blech", "Wunsch-zet-tel", "Ker-zen-schein", "Weih-nachts-fe-ri-en", "Schnee-ball-schlacht", "Tan-nen-zap-fen"] },
    saetze12: { name: "Kurze Sätze", kl: "Kl. 1/2", n: 5, art: "z",
        liste: ["Ma-ma malt.", "O-ma ist da.", "Tim isst ein Eis.", "Der Hund rennt.", "Die Maus ist klein.", "O-pa liest ein Buch.", "Die Son-ne lacht.", "O-le malt ein Haus.", "Das So-fa ist rot.", "Le-a hat ei-ne Ro-se.", "Im Nest sind Ei-er.", "Der I-gel schläft.", "Wir ma-len ein Bild.", "Der Ha-se hüpft.", "Mi-a mag Me-lo-ne.", "Das Au-to ist neu."] },
    saetze34: { name: "Lange Sätze", kl: "Kl. 3/4", n: 4, art: "z",
        liste: ["Nach der Schu-le spie-len wir Fuß-ball.", "Der I-gel schläft un-ter dem Laub.", "Im Win-ter baut Mi-a ei-nen Schnee-mann.", "Mein Bru-der fährt mit dem Fahr-rad zum Sport.", "Die Kat-ze klet-tert auf den ho-hen Baum.", "Am Wo-chen-en-de ba-cken wir ei-nen Ku-chen.", "In der Pau-se es-sen al-le ihr Pau-sen-brot.", "Der Bus kommt heu-te zehn Mi-nu-ten zu spät.", "Mit der Ta-schen-lam-pe le-sen wir im Dun-keln.", "Am Ad-vents-kranz brennt die ers-te Ker-ze."] },
    eigene: { name: "Eigene Wörter", kl: "", n: 10, art: "w", liste: [] }
};
const REIHE = ["buchstaben", "silben", "woerter12", "woerter34", "advent12", "advent34", "saetze12", "saetze34", "eigene"];
const GROESSE = { klein: 12, mittel: 17, gross: 23 };   // Lichtkreis-Radius in vmin

/* ---------- Zustand ---------- */
const S = { inhalt: "woerter12", art: "lesen", anzahl: {}, lampe: "mittel", silben: "boegen", gross: false, filter: "", eigene: "So-fa\nO-ma\nMo-fa", licht: false };
try { Object.assign(S, JSON.parse(localStorage.getItem("tb_taschenlampe") || "{}")); } catch (x) {}
S.licht = false;
if (!INHALT[S.inhalt]) S.inhalt = "woerter12";
function merken(){ try { const k = Object.assign({}, S); delete k.licht; localStorage.setItem("tb_taschenlampe", JSON.stringify(k)); } catch (x) {} }

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const mischen = l => { const a = l.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const anzahl = () => S.anzahl[S.inhalt] || INHALT[S.inhalt].n;
const klar = w => w.replace(/-/g, "");

function liste(){
    let l = S.inhalt === "eigene" ? S.eigene.split(/\n|;/).map(x => x.trim()).filter(Boolean) : INHALT[S.inhalt].liste.slice();
    if (S.filter.trim() && INHALT[S.inhalt].art !== "z" && S.inhalt !== "buchstaben"){
        const erlaubt = new Set(S.filter.toLowerCase().replace(/[^a-zäöüß]/g, "").split(""));
        const ok = l.filter(w => klar(w).toLowerCase().split("").every(c => erlaubt.has(c)));
        if (ok.length) l = ok;
    }
    return [...new Set(l)];
}

/* ---------- Aufbau ---------- */
const CSS = `
#tl{ position:fixed; inset:0; display:none; flex-direction:column; z-index:12; background:#0b1222; color:#e9eef7; font-family:"Nunito",sans-serif; user-select:none; -webkit-user-select:none; }
#tl.an{ display:flex; }
.tl-leiste{ display:flex; gap:8px; align-items:center; padding:8px 12px; flex-wrap:wrap; background:#0b1222; position:relative; z-index:6; }
.tl-titel{ font-weight:900; font-size:19px; color:#ffd866; margin-right:4px; white-space:nowrap; }
.tl-titel small{ font-weight:800; color:#8794ad; font-size:14px; margin-left:4px; }
#tl .tb-k{ background:rgba(255,255,255,.1); color:#e9eef7; }
#tl .tb-k:hover{ background:rgba(255,255,255,.18); }
#tl .tb-k.an{ background:#ffd866 !important; color:#16233d !important; }
.tl-art{ display:inline-flex; background:rgba(255,255,255,.08); border-radius:999px; padding:4px; gap:3px; }
.tl-art button{ font:800 15px "Nunito",sans-serif; border:0; background:transparent; color:#cfd7e6; border-radius:999px; padding:0 14px; min-height:40px; cursor:pointer; white-space:nowrap; }
.tl-art button.an{ background:#ffd866; color:#16233d; }
.tl-buehne{ flex:1; min-height:0; position:relative; overflow:hidden; touch-action:none; cursor:none; margin:0 1.2vmin 1.2vmin; border-radius:20px;
  background:radial-gradient(ellipse at 30% 20%, #34445f 0%, #26344b 55%, #1d283b 100%); }
.tl-fleck{ position:absolute; left:0; top:0; border-radius:50%; pointer-events:none; will-change:transform;
  background:radial-gradient(circle, rgba(255,247,214,.98) 0%, rgba(255,240,196,.92) 45%, rgba(255,232,170,.55) 68%, rgba(255,230,160,0) 76%); }
.tl-woerter{ position:absolute; inset:0; pointer-events:none; }
.tl-w{ position:absolute; left:0; top:0; font-family:"Andika","Nunito",sans-serif; font-weight:700; color:#15213a; line-height:1.15; white-space:nowrap; padding:.08em .18em .34em; border-radius:.35em; }
.tl-w.b{ font-size:clamp(38px,9vmin,130px); }
.tl-w.s{ font-size:clamp(30px,7vmin,100px); }
.tl-w.w{ font-size:clamp(24px,5.6vmin,80px); }
.tl-w.z{ font-size:clamp(20px,4.3vmin,60px); white-space:normal; text-align:left; line-height:1.5; }
.tl-w.lang{ font-size:clamp(20px,4.6vmin,66px); }
.tl-w.gefunden{ background:#d9f5df; color:#0f5a2a; box-shadow:0 0 0 4px #5fd17d, 0 0 40px rgba(95,209,125,.7); }
.tl-w.gefunden .sb::after{ border-color:#2f9d55; }
.tl-sb{ display:inline-block; position:relative; }
#tl.boegen .tl-sb::after{ content:""; position:absolute; left:6%; right:6%; bottom:-.26em; height:.32em; border:.08em solid #c0392b; border-top:0; border-radius:0 0 50% 50% / 0 0 100% 100%; }
#tl.boegen .tl-w.b .tl-sb::after{ display:none; }
#tl.farbig .tl-sb.g{ color:#1d4fd8; } #tl.farbig .tl-sb.u{ color:#c62828; }
.tl-wort{ white-space:nowrap; display:inline-block; margin-right:.12em; }
.tl-nacht{ position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
.tl-lampe{ position:absolute; left:0; top:0; width:0; height:0; pointer-events:none; will-change:transform; z-index:3; }
.tl-lampe svg{ position:absolute; left:-24px; top:-8px; width:48px; height:120px; overflow:visible; filter:drop-shadow(0 4px 8px rgba(0,0,0,.45)); }
#tl.licht .tl-nacht, #tl.licht .tl-fleck, #tl.licht .tl-lampe{ display:none; }
#tl.licht .tl-buehne{ background:#f6f1df; cursor:default; }
.tl-auftrag{ position:absolute; left:50%; top:1.6vmin; transform:translateX(-50%); z-index:4; background:#ffd866; color:#16233d; border-radius:18px; padding:.5vmin 2.2vmin .9vmin; font-weight:900; font-size:clamp(18px,3.4vmin,44px); display:none; align-items:baseline; gap:.45em; box-shadow:0 8px 30px rgba(0,0,0,.4); pointer-events:none; white-space:nowrap; max-width:92%; box-sizing:border-box; }
@media (max-width:640px){ .tl-auftrag{ white-space:normal; flex-wrap:wrap; justify-content:center; font-size:17px; text-align:center; } }
.tl-auftrag .wort{ font-family:"Andika","Nunito",sans-serif; font-size:1.35em; }
.tl-auftrag small{ font-size:.55em; font-weight:800; opacity:.7; margin-left:.4em; }
#tl.suchen .tl-auftrag{ display:flex; }
.tl-auftrag.juhu{ animation:tlJuhu .9s ease; background:#7ee29a; }
@keyframes tlJuhu{ 0%{ transform:translateX(-50%) scale(1); } 40%{ transform:translateX(-50%) scale(1.15); } 100%{ transform:translateX(-50%) scale(1); } }
.tl-ende{ position:absolute; inset:0; z-index:5; display:none; align-items:center; justify-content:center; flex-direction:column; gap:2vmin; background:rgba(11,18,34,.55); }
.tl-ende.an{ display:flex; }
.tl-ende b{ font-size:clamp(30px,7vmin,96px); color:#ffd866; font-weight:900; text-shadow:0 4px 30px rgba(255,216,102,.5); }
.tl-ende button{ font:900 20px "Nunito",sans-serif; border:0; background:#ffd866; color:#16233d; border-radius:999px; padding:14px 26px; cursor:pointer; }
.tl-hinweis{ position:absolute; left:50%; bottom:3vmin; transform:translateX(-50%); z-index:4; color:#aab6cc; font-weight:800; font-size:clamp(14px,2.2vmin,24px); pointer-events:none; transition:opacity .6s; white-space:nowrap; }
.tl-menue{ position:absolute; right:12px; top:62px; z-index:8; width:min(440px, calc(100vw - 24px)); max-height:calc(100% - 74px); overflow:auto; background:#16233d; border:1px solid rgba(255,255,255,.12); border-radius:18px; padding:14px 16px 16px; box-shadow:0 20px 50px rgba(0,0,0,.5); display:none; }
.tl-menue.an{ display:block; }
.tl-menue h4{ margin:12px 0 6px; font-size:13px; letter-spacing:.08em; text-transform:uppercase; color:#8794ad; }
.tl-menue h4:first-child{ margin-top:0; }
.tl-reihe{ display:flex; flex-wrap:wrap; gap:6px; }
.tl-reihe button{ font:800 14px "Nunito",sans-serif; border:2px solid rgba(255,255,255,.14); background:transparent; color:#e9eef7; border-radius:999px; padding:7px 12px; cursor:pointer; min-height:40px; }
.tl-reihe button small{ color:#8794ad; font-weight:800; margin-left:3px; }
.tl-reihe button.an{ background:#ffd866; border-color:#ffd866; color:#16233d; }
.tl-reihe button.an small{ color:#5b5130; }
.tl-st{ display:inline-flex; align-items:center; gap:6px; background:rgba(255,255,255,.08); border-radius:999px; padding:4px; }
.tl-st b{ min-width:2em; text-align:center; font-size:20px; }
.tl-st button{ font:900 18px "Nunito",sans-serif; border:0; width:38px; height:38px; border-radius:50%; background:rgba(255,255,255,.14); color:#fff; cursor:pointer; }
.tl-menue textarea, .tl-menue input{ width:100%; box-sizing:border-box; font:700 16px "Andika","Nunito",sans-serif; border:2px solid rgba(255,255,255,.16); background:#0f192d; color:#fff; border-radius:12px; padding:9px 11px; }
.tl-menue textarea{ min-height:120px; resize:vertical; }
.tl-menue p{ margin:4px 0 0; color:#8794ad; font-size:13px; font-weight:700; line-height:1.35; }
@media (max-width:640px){ .tl-txt{ display:none; } .tl-titel small{ display:none; } .tl-art button{ padding:0 10px; font-size:14px; } }
`;

let el, buehne, fleck, nacht, lampe, woerterEl, W = [], ziel = -1, gefunden = new Set(), haltSeit = 0, fertig = false;
const P = { fx: 0, fy: 0, lx: 0, ly: 0, ox: 0, oy: 0, tox: 0, toy: 0, da: false };
let raf = 0, hinweisWeg = false;

function aufbauen(){
    if (el) return;
    const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    el = document.createElement("div");
    el.id = "tl";
    el.innerHTML = `
        <div class="tl-leiste">
            <button class="tb-k rund" data-a="zu" title="Zurück zur Übersicht"><i class="fa-solid fa-arrow-left"></i></button>
            <span class="tl-titel">🔦 Taschenlampen-Lesen <small id="tlUnter"></small></span>
            <span class="tl-art"><button data-art="lesen">Lesen</button><button data-art="suchen">Wort suchen</button></span>
            <span style="flex:1"></span>
            <button class="tb-k" data-a="neu" title="Neu mischen"><i class="fa-solid fa-shuffle"></i><span class="tl-txt"> Neu</span></button>
            <button class="tb-k" data-a="licht" id="tlLicht" title="Licht an – alles zeigen zum Kontrollieren"><i class="fa-solid fa-lightbulb"></i><span class="tl-txt"> Licht an</span></button>
            <button class="tb-k rund" data-a="menue" title="Einstellungen"><i class="fa-solid fa-sliders"></i></button>
            <button class="tb-k rund" data-a="voll" title="Vollbild"><i class="fa-solid fa-expand"></i></button>
        </div>
        <div class="tl-menue" id="tlMenue"></div>
        <div class="tl-buehne" id="tlBuehne">
            <div class="tl-fleck" id="tlFleck"></div>
            <div class="tl-woerter" id="tlWoerter"></div>
            <svg class="tl-nacht" id="tlNacht"></svg>
            <div class="tl-lampe" id="tlLampe"><svg viewBox="0 0 48 120" aria-hidden="true">
                <defs><linearGradient id="tlGriff" x1="0" x2="1"><stop offset="0" stop-color="#1f5fbf"/><stop offset=".5" stop-color="#3f86ea"/><stop offset="1" stop-color="#1a4fa0"/></linearGradient>
                <linearGradient id="tlKopf" x1="0" x2="1"><stop offset="0" stop-color="#e0a800"/><stop offset=".5" stop-color="#ffd23f"/><stop offset="1" stop-color="#d49b00"/></linearGradient></defs>
                <path d="M4 8 H44 L36 38 H12 Z" fill="url(#tlKopf)" stroke="#9a7000" stroke-width="1.5"/>
                <ellipse cx="24" cy="8" rx="20" ry="5" fill="#fff6c8" stroke="#c99400" stroke-width="1.5"/>
                <rect x="12" y="37" width="24" height="76" rx="7" fill="url(#tlGriff)" stroke="#123c7a" stroke-width="1.5"/>
                <rect x="19" y="52" width="10" height="16" rx="4" fill="#ffd23f" stroke="#9a7000" stroke-width="1.2"/>
                <rect x="12" y="92" width="24" height="5" fill="#123c7a" opacity=".35"/>
            </svg></div>
            <div class="tl-auftrag" id="tlAuftrag"></div>
            <div class="tl-hinweis" id="tlHinweis">☝️ Mit dem Finger die Lampe über die Tafel führen</div>
            <div class="tl-ende" id="tlEnde"><b>Alle gefunden! 🎉</b><button data-a="neu">Nochmal</button></div>
        </div>`;
    document.body.appendChild(el);
    buehne = el.querySelector("#tlBuehne"); fleck = el.querySelector("#tlFleck"); nacht = el.querySelector("#tlNacht");
    lampe = el.querySelector("#tlLampe"); woerterEl = el.querySelector("#tlWoerter");
    el.addEventListener("click", klick);
    el.addEventListener("input", eingabe);
    const zeig = e => {
        if (S.licht) return;
        const r = buehne.getBoundingClientRect();
        P.fx = e.clientX - r.left; P.fy = e.clientY - r.top; P.da = true;
        if (!hinweisWeg){ hinweisWeg = true; el.querySelector("#tlHinweis").style.opacity = 0; }
        el.querySelector("#tlMenue").classList.remove("an");
    };
    buehne.addEventListener("pointerdown", e => { zeig(e); try { buehne.setPointerCapture(e.pointerId); } catch (x) {} });
    buehne.addEventListener("pointermove", zeig);
    window.addEventListener("resize", () => { if (el.classList.contains("an")) { nachtGroesse(); verteilen(); } });
}

/* ---------- Wörter darstellen und verteilen ---------- */
function wortHtml(w, art){
    if (art === "b") return `<span class="tl-sb">${esc(S.gross ? w.toUpperCase() : w)}</span>`;
    let i = 0;
    return w.split(" ").map(teil => `<span class="tl-wort">${teil.split("-").map(sb => `<span class="tl-sb ${(i++) % 2 ? "u" : "g"}">${esc(S.gross ? sb.toUpperCase() : sb)}</span>`).join("")}</span>`).join(" ");
}

function neu(){
    const l = liste(), n = Math.min(anzahl(), l.length), art = INHALT[S.inhalt].art;
    W = mischen(l).slice(0, n);
    gefunden = new Set(); fertig = false; haltSeit = 0;
    el.querySelector("#tlEnde").classList.remove("an");
    woerterEl.innerHTML = W.map((w, i) => `<div class="tl-w ${art}${art === "w" && klar(w).length > 11 ? " lang" : ""}" data-i="${i}">${wortHtml(w, art)}</div>`).join("");
    verteilen();
    zielNeu();
}

function verteilen(){
    const bw = buehne.clientWidth, bh = buehne.clientHeight;
    if (!bw || !bh) return;
    const kn = [...woerterEl.children], platz = [];
    const oben = S.art === "suchen" ? Math.min(bh * .2, 110) : bh * .04;
    kn.forEach(k => { if (k.classList.contains("z")) k.style.maxWidth = Math.round(bw * (bw < 700 ? .82 : .46)) + "px"; });
    // größte zuerst
    const reihen = kn.map(k => ({ k, w: k.offsetWidth, h: k.offsetHeight })).sort((a, b) => b.w * b.h - a.w * a.h);
    reihen.forEach(({ k, w, h }) => {
        let best = null, bestAbst = -1;
        for (let t = 0; t < 160; t++){
            const x = bw * .03 + Math.random() * Math.max(1, bw * .94 - w), y = oben + Math.random() * Math.max(1, bh * .95 - h - oben);
            const r = { x, y, w, h };
            // Abstand zum nächsten schon platzierten Wort
            let min = Infinity;
            for (const p of platz){
                const dx = Math.max(0, Math.max(p.x - (x + w), x - (p.x + p.w))), dy = Math.max(0, Math.max(p.y - (y + h), y - (p.y + p.h)));
                if (dx === 0 && dy === 0) { min = -1; break; }
                min = Math.min(min, Math.hypot(dx, dy));
            }
            if (min > bestAbst){ bestAbst = min; best = r; if (min > Math.min(bw, bh) * .08) break; }
        }
        if (!best) best = { x: bw * .05, y: oben, w, h };
        platz.push(best);
        const dreh = (Math.random() * 10 - 5).toFixed(1);
        k.style.transform = `translate(${best.x.toFixed(0)}px, ${best.y.toFixed(0)}px) rotate(${k.classList.contains("z") ? (dreh / 3).toFixed(1) : dreh}deg)`;
        k._r = best;
    });
    nachtGroesse();
}

/* ---------- Wort suchen ---------- */
function zielNeu(){
    const a = el.querySelector("#tlAuftrag");
    const offen = W.map((w, i) => i).filter(i => !gefunden.has(i));
    if (S.art !== "suchen"){ ziel = -1; return; }
    if (!offen.length){ ziel = -1; fertig = true; el.querySelector("#tlEnde").classList.add("an"); a.innerHTML = `Alle gefunden!`; return; }
    ziel = offen[Math.floor(Math.random() * offen.length)];
    const art = INHALT[S.inhalt].art, wort = klar(W[ziel]);
    a.innerHTML = `Finde: <span class="wort">${esc(S.gross ? wort.toUpperCase() : wort)}</span><small>${gefunden.size} von ${W.length}</small>`;
    if (art === "z") a.innerHTML = `Finde den Satz mit: <span class="wort">${esc(schluesselwort(W[ziel]))}</span><small>${gefunden.size} von ${W.length}</small>`;
}
function schluesselwort(satz){
    const ws = klar(satz).replace(/[.!?,]/g, "").split(" ");
    return ws.slice().sort((a, b) => b.length - a.length)[0];
}

/* ---------- Licht ---------- */
function nachtGroesse(){
    const bw = buehne.clientWidth, bh = buehne.clientHeight;
    nacht.setAttribute("viewBox", `0 0 ${bw} ${bh}`);
    if (!P.da){ P.fx = bw * .5; P.fy = bh * .78; }
}
function radius(){ return Math.min(buehne.clientWidth, buehne.clientHeight) / 100 * GROESSE[S.lampe] * (Math.min(buehne.clientWidth, buehne.clientHeight) < 500 ? 1.35 : 1); }

function schritt(){
    raf = requestAnimationFrame(schritt);
    if (!el.classList.contains("an") || S.licht) return;
    const bw = buehne.clientWidth, bh = buehne.clientHeight, R = radius();
    // Licht liegt schräg über dem Finger, damit die Hand nichts verdeckt
    let tox = R * .55, toy = -R * 1.3;
    if (P.fx > bw - R * 1.1) tox = -R * .55;
    if (P.fy < R * 1.5) toy = R * 1.1;
    P.tox = tox; P.toy = toy;
    P.ox += (P.tox - P.ox) * .15; P.oy += (P.toy - P.oy) * .15;
    if (!P.lx && !P.ly){ P.lx = P.fx + P.ox; P.ly = P.fy + P.oy; }
    P.lx += (P.fx + P.ox - P.lx) * .55; P.ly += (P.fy + P.oy - P.ly) * .55;
    const lx = P.lx, ly = P.ly;
    // Lichtfleck
    const d = R * 2.6;
    fleck.style.width = fleck.style.height = d + "px";
    fleck.style.transform = `translate(${(lx - d / 2).toFixed(1)}px, ${(ly - d / 2).toFixed(1)}px)`;
    // Lampe: zeigt vom Finger zum Licht
    const wink = Math.atan2(ly - P.fy, lx - P.fx) * 180 / Math.PI + 90;
    lampe.style.transform = `translate(${P.fx.toFixed(1)}px, ${P.fy.toFixed(1)}px) rotate(${wink.toFixed(1)}deg) translate(0, -46px)`;
    // Kegel von der Lampe zum Lichtkreis
    const kx = P.fx + (lx - P.fx) * .28, ky = P.fy + (ly - P.fy) * .28;
    const a = Math.atan2(ly - ky, lx - kx), nx = -Math.sin(a), ny = Math.cos(a);
    const kegel = `${(kx + nx * 14).toFixed(1)},${(ky + ny * 14).toFixed(1)} ${(lx + nx * R).toFixed(1)},${(ly + ny * R).toFixed(1)} ${(lx - nx * R).toFixed(1)},${(ly - ny * R).toFixed(1)} ${(kx - nx * 14).toFixed(1)},${(ky - ny * 14).toFixed(1)}`;
    const loecher = [...gefunden].map(i => { const k = woerterEl.children[i]; return k && k._r ? `<rect x="${(k._r.x - 8).toFixed(0)}" y="${(k._r.y - 8).toFixed(0)}" width="${(k._r.w + 16).toFixed(0)}" height="${(k._r.h + 16).toFixed(0)}" rx="18" fill="black"/>` : ""; }).join("");
    nacht.innerHTML = `<defs><filter id="tlWeich" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${(R * .14).toFixed(1)}"/></filter>
        <mask id="tlMaske" maskUnits="userSpaceOnUse" x="0" y="0" width="${bw}" height="${bh}"><rect width="${bw}" height="${bh}" fill="white"/>
        <g filter="url(#tlWeich)"><polygon points="${kegel}" fill="#3a3a3a"/><circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="${(R * 1.02).toFixed(1)}" fill="black"/></g>${loecher}</mask></defs>
        <rect width="${bw}" height="${bh}" fill="#070c18" mask="url(#tlMaske)"/>`;
    // Wort suchen: steht das Ziel lange genug im Licht?
    if (S.art === "suchen" && ziel >= 0 && !fertig){
        const k = woerterEl.children[ziel];
        if (k && k._r){
            const cx = k._r.x + k._r.w / 2, cy = k._r.y + k._r.h / 2;
            const drin = Math.abs(cx - lx) < Math.max(R * .55, k._r.w * .25) && Math.abs(cy - ly) < R * .5 && (k._r.w < R * 2.2 || Math.abs(cx - lx) < k._r.w * .4);
            if (drin){ if (!haltSeit) haltSeit = performance.now(); else if (performance.now() - haltSeit > 650) treffer(ziel); }
            else haltSeit = 0;
        }
    }
}

function treffer(i){
    haltSeit = 0;
    gefunden.add(i);
    woerterEl.children[i].classList.add("gefunden");
    const a = el.querySelector("#tlAuftrag");
    a.classList.remove("juhu"); void a.offsetWidth; a.classList.add("juhu");
    a.innerHTML = `✓ Gefunden!<small>${gefunden.size} von ${W.length}</small>`;
    ziel = -1;
    setTimeout(zielNeu, 1100);
}

/* ---------- Einstellungen ---------- */
function menue(){
    const m = el.querySelector("#tlMenue"), art = INHALT[S.inhalt].art;
    m.innerHTML = `
        <h4>Was steht an der Tafel?</h4>
        <div class="tl-reihe">${REIHE.map(k => `<button data-inhalt="${k}" class="${S.inhalt === k ? "an" : ""}">${INHALT[k].name}${INHALT[k].kl ? `<small>${INHALT[k].kl}</small>` : ""}</button>`).join("")}</div>
        ${S.inhalt === "eigene" ? `<h4>Eigene Wörter oder Sätze</h4><textarea id="tlEigene" placeholder="Ein Wort pro Zeile">${esc(S.eigene)}</textarea><p>Ein Wort (oder Satz) pro Zeile. Mit Bindestrich in Silben teilen, z. B. <b>So-fa</b> – dann gibt es Silbenbögen.</p>` : ""}
        ${art !== "z" && S.inhalt !== "buchstaben" ? `<h4>Nur diese Buchstaben (freiwillig)</h4><input id="tlFilter" value="${esc(S.filter)}" placeholder="z. B. m a o i l s"><p>Für Klasse 1: Es kommen nur Wörter, die aus diesen Buchstaben bestehen. Leer = alle.</p>` : ""}
        <h4>Wie viele?</h4>
        <div class="tl-st"><button data-anz="-1">−</button><b>${Math.min(anzahl(), liste().length)}</b><button data-anz="1">+</button></div>
        <h4>Größe der Lampe</h4>
        <div class="tl-reihe">${[["klein", "klein"], ["mittel", "mittel"], ["gross", "groß"]].map(([k, t]) => `<button data-lampe="${k}" class="${S.lampe === k ? "an" : ""}">${t}</button>`).join("")}</div>
        <h4>Silben</h4>
        <div class="tl-reihe">${[["boegen", "Silbenbögen"], ["farbig", "Silben farbig"], ["ohne", "ohne"]].map(([k, t]) => `<button data-silben="${k}" class="${S.silben === k ? "an" : ""}">${t}</button>`).join("")}</div>
        <h4>Schrift</h4>
        <div class="tl-reihe"><button data-gross="0" class="${!S.gross ? "an" : ""}">normal</button><button data-gross="1" class="${S.gross ? "an" : ""}">GROSSBUCHSTABEN</button></div>`;
}
function eingabe(e){
    if (e.target.id === "tlEigene"){ S.eigene = e.target.value; merken(); clearTimeout(eingabe.t); eingabe.t = setTimeout(neu, 500); }
    if (e.target.id === "tlFilter"){ S.filter = e.target.value; merken(); clearTimeout(eingabe.t); eingabe.t = setTimeout(() => { neu(); const b = el.querySelector(".tl-st b"); if (b) b.textContent = Math.min(anzahl(), liste().length); }, 500); }
}

function zeichnen(){
    el.classList.toggle("boegen", S.silben === "boegen");
    el.classList.toggle("farbig", S.silben === "farbig");
    el.classList.toggle("suchen", S.art === "suchen");
    el.classList.toggle("licht", S.licht);
    el.querySelector("#tlLicht").classList.toggle("an", S.licht);
    el.querySelectorAll("[data-art]").forEach(b => b.classList.toggle("an", b.dataset.art === S.art));
    el.querySelector("#tlUnter").textContent = INHALT[S.inhalt].name + (INHALT[S.inhalt].kl ? " · " + INHALT[S.inhalt].kl : "");
    menue();
}

function klick(e){
    const t = e.target.closest("button");
    if (!t){ if (!e.target.closest("#tlMenue")) el.querySelector("#tlMenue").classList.remove("an"); return; }
    if (t.dataset.art){ S.art = t.dataset.art; S.licht = false; merken(); zeichnen(); return neu(); }
    if (t.dataset.inhalt){ S.inhalt = t.dataset.inhalt; merken(); zeichnen(); return neu(); }
    if (t.dataset.anz){ S.anzahl[S.inhalt] = Math.max(1, Math.min(30, Math.min(anzahl(), liste().length) + +t.dataset.anz)); merken(); zeichnen(); return neu(); }
    if (t.dataset.lampe){ S.lampe = t.dataset.lampe; merken(); return zeichnen(); }
    if (t.dataset.silben){ S.silben = t.dataset.silben; merken(); zeichnen(); return verteilen(); }
    if (t.dataset.gross){ S.gross = t.dataset.gross === "1"; merken(); zeichnen(); return neu(); }
    const a = t.dataset.a;
    if (a === "zu") return schliessen();
    if (a === "voll") return (window.vollbild ? window.vollbild() : null);
    if (a === "menue"){ const m = el.querySelector("#tlMenue"); m.style.top = (el.querySelector(".tl-leiste").offsetHeight + 4) + "px"; m.style.maxHeight = `calc(100% - ${el.querySelector(".tl-leiste").offsetHeight + 14}px)`; return m.classList.toggle("an"); }
    if (a === "licht"){ S.licht = !S.licht; return zeichnen(); }
    if (a === "neu"){ S.licht = false; zeichnen(); return neu(); }
}

function oeffnen(art){
    aufbauen();
    if (art === "suchen" || art === "lesen") S.art = art;
    el.classList.add("an");
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "none";
    history.replaceState(null, "", "#taschenlampe");
    zeichnen();
    requestAnimationFrame(() => { nachtGroesse(); neu(); if (!raf) schritt(); });
}
function schliessen(){
    el.classList.remove("an");
    cancelAnimationFrame(raf); raf = 0;
    const ue = document.getElementById("uebersicht"); if (ue) ue.style.display = "";
    history.replaceState(null, "", location.pathname);
}
window.tafelTaschenlampe = { oeffnen, schliessen, _S: S, _INHALT: INHALT, _treffer: i => treffer(i) };
document.addEventListener("DOMContentLoaded", () => { if (location.hash === "#taschenlampe") oeffnen(); });
})();
