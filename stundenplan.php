<?php require __DIR__ . "/auth.php"; ?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Stundenplan · Leuchtturm</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<!--
  Leuchtturm – Stundenplan für LRS-Kinder, Fördergruppen & Co.
  Wochenraster Mo–Fr, in die Zellen kommen die Namen der Kinder statt Fächer.
  Es wird NICHTS gespeichert (weder Server noch Browser), weil echte Namen eingetragen werden.
  Zum Aufbewahren: drucken oder als PDF speichern.
-->
<style>
:root{
    --nacht:#16324a; --meer:#3d7ea6; --gold:#f2a93b; --schaum:#f4f6f4;
    --text:#1f2d36; --grau:#7c8a85; --linie:#e3e8ea;
    --schatten:0 6px 24px rgba(22,50,74,.1);
}
*{ box-sizing:border-box; }
body{ margin:0; background:var(--schaum); color:var(--text); font-family:"Nunito",sans-serif; }

.sp-wrap{ width:min(1100px,95%); margin:28px auto 60px; }

.sp-header{
    background:linear-gradient(135deg, var(--nacht), var(--meer));
    border-radius:24px; color:white; padding:24px 32px; box-shadow:var(--schatten); margin-bottom:18px;
}
.sp-header h1{ font-size:28px; font-weight:900; margin:0; }
.sp-header p{ font-size:14px; opacity:.9; font-weight:700; margin:4px 0 0; }

.sp-hinweis{
    background:#eef6fb; border:2px solid #cfe2ef; border-radius:16px; padding:10px 18px;
    font-size:14px; font-weight:700; color:var(--nacht); margin-bottom:18px; display:flex; gap:10px; align-items:center;
}
.sp-hinweis i{ color:var(--meer); }

.sp-toolbar{ display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin-bottom:18px; }
.sp-titel-feld{
    flex:1; min-width:220px; border:2px solid var(--linie); border-radius:14px; padding:12px 18px;
    font-family:"Nunito",sans-serif; font-size:20px; font-weight:900; color:var(--text); background:white;
}
.sp-btn{
    border:none; border-radius:999px; padding:11px 20px; font-family:"Nunito",sans-serif; font-weight:800; font-size:14px;
    cursor:pointer; transition:.2s; color:white; display:inline-flex; gap:8px; align-items:center;
}
.sp-btn:hover{ transform:translateY(-2px); }
.sp-btn.nacht{ background:var(--nacht); }
.sp-btn.meer{ background:var(--meer); }
.sp-btn.gold{ background:var(--gold); color:var(--nacht); }
.sp-btn.hell{ background:white; color:var(--nacht); box-shadow:0 3px 10px rgba(22,50,74,.08); }

.sp-namen-leiste{ background:white; border-radius:20px; box-shadow:var(--schatten); padding:16px 20px; margin-bottom:18px; }
.sp-namen-leiste h3{ font-size:13px; text-transform:uppercase; letter-spacing:.4px; color:var(--grau); margin:0 0 10px; font-weight:800; }
.sp-namen-eingabe{ display:flex; gap:10px; margin-bottom:12px; }
.sp-namen-eingabe input{
    flex:1; border:2px solid var(--linie); border-radius:12px; padding:8px 14px;
    font-family:"Nunito",sans-serif; font-size:14px; font-weight:700;
}
.sp-chips{ display:flex; gap:8px; flex-wrap:wrap; }
.sp-chip{
    display:inline-flex; align-items:center; gap:6px; background:#eef6fb; color:var(--meer); border:2px solid #cfe2ef;
    border-radius:999px; padding:6px 12px; font-weight:800; font-size:13px; cursor:pointer; transition:.15s;
}
.sp-chip:hover{ background:var(--meer); color:white; }
.sp-chip i{ cursor:pointer; opacity:.6; }
.sp-chip i:hover{ opacity:1; }
.sp-chip-hinweis{ font-size:12px; color:#a0a8a5; font-weight:700; margin-top:8px; }

.sp-card{ background:white; border-radius:24px; box-shadow:var(--schatten); padding:24px; overflow-x:auto; }
.sp-card h2{ font-weight:900; font-size:24px; margin:0 0 16px; text-align:center; color:var(--nacht); }

table.sp-tabelle{ width:100%; border-collapse:collapse; table-layout:fixed; }
table.sp-tabelle th{
    background:#eef3f6; font-size:13px; text-transform:uppercase; letter-spacing:.4px; color:var(--nacht);
    padding:10px 6px; text-align:center; font-weight:800; border:1px solid var(--linie);
}
table.sp-tabelle th:first-child{ width:11%; }
table.sp-tabelle td{ border:1px solid var(--linie); padding:0; vertical-align:top; }
table.sp-tabelle td.sp-std{ text-align:center; font-weight:900; color:var(--nacht); background:#fafbfa; padding:8px 4px; }
.sp-std .nr{ font-size:16px; }
.sp-std input{
    display:block; width:100%; margin-top:3px; border:none; background:transparent; text-align:center;
    font-family:"Nunito",sans-serif; font-size:11px; font-weight:700; color:var(--grau);
}
.sp-std input:focus{ outline:2px solid var(--meer); }
.sp-std .weg{ cursor:pointer; opacity:.35; margin-left:4px; font-size:12px; }
.sp-std .weg:hover{ opacity:1; color:#c0392b; }
table.sp-tabelle textarea{
    width:100%; min-height:48px; border:none; resize:none; overflow:hidden; display:block;
    font-family:"Nunito",sans-serif; font-size:14px; font-weight:700; color:var(--text); padding:8px; background:transparent;
}
table.sp-tabelle textarea:focus{ outline:2px solid var(--meer); outline-offset:-2px; }

.sp-fusszeile{ margin-top:16px; font-size:13px; color:#a0a8a5; font-weight:700; text-align:center; }

.sp-back{ text-align:center; margin-top:24px; }
.sp-back a{ display:inline-flex; align-items:center; gap:8px; text-decoration:none; color:var(--nacht); font-weight:800; font-size:14px; }

@media print{
    @page{ size:A4 landscape; margin:12mm; }
    .sp-header, .sp-hinweis, .sp-toolbar, .sp-back, .sp-namen-leiste, .sp-fusszeile{ display:none !important; }
    body{ background:white; }
    .sp-wrap{ width:100%; margin:0; }
    .sp-card{ box-shadow:none; padding:0; overflow:visible; }
    .sp-std .weg{ display:none !important; }
    table.sp-tabelle th{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
    table.sp-tabelle textarea::placeholder, .sp-std input::placeholder{ color:transparent !important; }
}
</style>
</head>
<body>

<div class="sp-wrap">

  <div class="sp-header">
    <h1><i class="fa-solid fa-table-cells"></i> Stundenplan</h1>
    <p>Für LRS-Kinder, Fördergruppen &amp; Co. — nichts wird gespeichert</p>
  </div>

  <div class="sp-hinweis">
    <i class="fa-solid fa-lock"></i>
    Diese Seite speichert nichts – weder auf dem Server noch im Browser. Die Namen sind weg, sobald du die Seite neu lädst oder schließt.
    Zum Aufbewahren: drucken oder als PDF speichern.
  </div>

  <div class="sp-toolbar">
    <input type="text" id="titelFeld" class="sp-titel-feld" value="LRS-Kinder" placeholder="z. B. LRS-Kinder, Fördergruppe …">
    <button class="sp-btn nacht" onclick="window.print()"><i class="fa-solid fa-print"></i> Drucken / als PDF</button>
    <button class="sp-btn meer" onclick="zeileHinzufuegen()"><i class="fa-solid fa-plus"></i> Zeile hinzufügen</button>
    <button class="sp-btn hell" onclick="allesLeeren()"><i class="fa-solid fa-eraser"></i> Alles leeren</button>
  </div>

  <div class="sp-namen-leiste">
    <h3><i class="fa-solid fa-user-group"></i> Kinder dieser Gruppe (einmal eintragen, dann anklicken zum Einfügen)</h3>
    <div class="sp-namen-eingabe">
      <input type="text" id="neuerName" placeholder="Name eintippen und Enter drücken …">
      <button class="sp-btn meer" onclick="nameHinzufuegen()" title="Hinzufügen"><i class="fa-solid fa-plus"></i></button>
    </div>
    <div class="sp-chips" id="chipListe"></div>
    <div class="sp-chip-hinweis">Klicke zuerst in eine Zelle der Tabelle, dann auf einen Namen – er wird dort eingefügt. Unter der Stundennummer kannst du die Uhrzeit eintragen.</div>
  </div>

  <div class="sp-card">
    <h2 id="titelAnzeige">LRS-Kinder</h2>
    <table class="sp-tabelle">
      <thead>
        <tr><th>Std.</th><th>Montag</th><th>Dienstag</th><th>Mittwoch</th><th>Donnerstag</th><th>Freitag</th></tr>
      </thead>
      <tbody id="planKoerper"></tbody>
    </table>
    <div class="sp-fusszeile">Leuchtturm · Stundenplan (lokal, nicht gespeichert)</div>
  </div>

  <div class="sp-back">
    <a href="index.php"><i class="fa-solid fa-arrow-left"></i> Zurück zum Leuchtturm</a>
  </div>

</div>

<script>
const planKoerper = document.getElementById("planKoerper");
const titelFeld = document.getElementById("titelFeld");
const titelAnzeige = document.getElementById("titelAnzeige");
const chipListe = document.getElementById("chipListe");
const neuerName = document.getElementById("neuerName");
let letzteAktiveZelle = null;

titelFeld.addEventListener("input", () => { titelAnzeige.textContent = titelFeld.value || "Stundenplan"; });

// ---- Namens-Chips ----
function nameHinzufuegen(){
    const name = neuerName.value.trim();
    if (!name) return;
    const chip = document.createElement("div");
    chip.className = "sp-chip";
    const span = document.createElement("span");
    span.textContent = name;
    const x = document.createElement("i");
    x.className = "fa-solid fa-xmark"; x.title = "entfernen";
    chip.append(span, " ", x);
    span.addEventListener("click", () => nameEinfuegen(name));
    x.addEventListener("click", e => { e.stopPropagation(); chip.remove(); });
    chipListe.appendChild(chip);
    neuerName.value = "";
    neuerName.focus();
}
neuerName.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); nameHinzufuegen(); } });

function nameEinfuegen(name){
    if (!letzteAktiveZelle){ alert("Bitte zuerst in eine Zelle der Tabelle klicken, dann den Namen anklicken."); return; }
    const bisher = letzteAktiveZelle.value.trim();
    letzteAktiveZelle.value = bisher ? bisher + "\n" + name : name;
    hoeheAnpassen(letzteAktiveZelle);
    letzteAktiveZelle.focus();
}

// ---- Tabellen-Zeilen ----
function nummerieren(){
    planKoerper.querySelectorAll("tr").forEach((tr, i) => tr.querySelector(".nr").textContent = i + 1);
}
function neueZeile(){
    const tr = document.createElement("tr");
    const std = document.createElement("td");
    std.className = "sp-std";
    std.innerHTML = `<span class="nr"></span><i class="fa-solid fa-xmark weg" title="Zeile löschen"></i><input type="text" placeholder="Uhrzeit">`;
    std.querySelector(".weg").addEventListener("click", () => { tr.remove(); nummerieren(); });
    tr.appendChild(std);
    for (let i = 0; i < 5; i++){
        const td = document.createElement("td");
        const ta = document.createElement("textarea");
        ta.placeholder = "Name(n) …";
        ta.rows = 1;
        ta.addEventListener("focus", () => letzteAktiveZelle = ta);
        ta.addEventListener("input", () => hoeheAnpassen(ta));
        td.appendChild(ta);
        tr.appendChild(td);
    }
    planKoerper.appendChild(tr);
    nummerieren();
}
function hoeheAnpassen(ta){ ta.style.height = "auto"; ta.style.height = ta.scrollHeight + "px"; }
function zeileHinzufuegen(){ neueZeile(); }
function allesLeeren(){
    if (!confirm("Wirklich alle Eingaben löschen?")) return;
    planKoerper.querySelectorAll("textarea, input").forEach(t => { t.value = ""; t.style.height = "auto"; });
}

// Start: 6 Stunden vorbelegen
for (let i = 0; i < 6; i++) neueZeile();
</script>

</body>
</html>
