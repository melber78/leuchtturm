/* ============================================================
   Leuchtturm – Sozialtraining: NOTFALL-STILLARBEIT
   Wenn die Gruppe zu unruhig für die Tafel ist, lesen und bearbeiten
   die Kinder 30 Minuten still drei Blätter zum Thema der Stunde.

   window.SOZIAL_NOTFALL[stunden-id] = { "12": [Blatt1, Blatt2, Blatt3], "34": [...] }
   Blatt = { titel, aufgaben: [...] } – Aufgabentypen wie bei den Arbeitsblättern
   (siehe sozial-einheiten.js). Blatt 1 bekommt automatisch die Geschichte der
   Stunde (lerntext12 / lerntext34) vor die Aufgaben.
   Diese Dateien kommen per Update und werden dabei ersetzt.
   ============================================================ */
window.SOZIAL_NOTFALL = window.SOZIAL_NOTFALL || {};
window.NF = {
    blatt:   (titel, ...aufgaben) => ({ titel, aufgaben }),
    schreib: (text, zeilen = 2) => ({ typ: "schreiben", text, zeilen }),
    kreuz:   (text, optionen, nebeneinander = false) => ({ typ: "ankreuzen", text, optionen, nebeneinander }),
    daumen:  (text, zeilen) => ({ typ: "daumen", text, zeilen, art: "daumen" }),
    luecken: (text, saetze, nummern = false) => ({ typ: "luecken", text, saetze, nummern }),
    zuordnen:(text, links, rechts) => ({ typ: "zuordnen", text, links, rechts }),
    tabelle: (text, spalten, zeilen, woerter) => ({ typ: "tabelle", text, spalten, zeilen, ...(woerter ? { woerter } : {}) }),
    // Stimmt das? – Tabelle mit Kästchen „ja“ / „nein“
    stimmt:  (text, saetze) => ({ typ: "tabelle", text, spalten: ["", "ja", "nein"], zeilen: saetze.map(s => [s, "", ""]) }),
    gesichter: (text, gefuehle, leer = false) => ({ typ: "gesichter", text, gefuehle, leer }),
    gefuehle:  (text, zeilen, gefuehle) => ({ typ: "gefuehle", text, zeilen, ...(gefuehle ? { gefuehle } : {}) }),
    malen:   (text) => ({ typ: "malen", text, bild: "" }),
    // eine Stunde eintragen
    stunde:  (id, d) => { window.SOZIAL_NOTFALL[id] = d; }
};
