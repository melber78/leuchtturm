<?php
// Tafelbilder, die einzeln als App auf einer digitalen Tafel installiert werden können
// Schlüssel => [Name, kurze Beschreibung, Start-Hash, Erkennung der Kachel (onclick), Farbe]
const LT_BAUSTEINE = [
    "morgen"         => ["Guten Morgen! (Kl. 1–4)", "Tagesstart: Datum, Wetter, Stundenplan, Auspacken", "#morgen", "tafelMorgen.oeffnen('gs')", "#e2a72e"],
    "morgen-sek"     => ["Guten Morgen! (Kl. 5–9)", "Stundenplan, A-/B-Woche, Tests & Termine, Impuls", "#morgen-sek", "tafelMorgen.oeffnen('sek')", "#3d6e9e"],
    "startklar"      => ["Startklar!", "Checkliste vor dem Tag und vor jeder Stunde", "#startklar", "tafelMorgen.startklar()", "#2e9e5b"],
    "pause"          => ["Pause vorbei!", "Klingel, Checkliste und Countdown", "#pause", "lernTafel.starten('pausevorbei')", "#e2574c"],
    "leise"          => ["Leise-Wald", "Leise arbeiten mit dem Mikrofon", "#leise", "leiseWahl(true)", "#4d8a48"],
    "buchstabenkurs" => ["Buchstabenkurs", "Buchstaben in der Lineatur schreiben", "#buchstabenkurs", "kursOeffnen()", "#1e4f8c"],
    "einmaleins"     => ["Das Einmaleins", "Tabelle, Verstehen, Tricks, Geteilt, Üben, großes 1 × 1", "#1x1-tabelle", "tafel1x1.oeffnen(", "#f2a93b"],
    "ruhig"          => ["Ruhige Arbeitszeit", "Bild und leiser Klang für die Arbeitsphase", "#ruhig", "tafelRuhig.oeffnen(", "#28465f"],
    "taschenlampe"   => ["Taschenlampen-Lesen", "Mit dem Finger leuchten und lesen", "#taschenlampe", "tafelTaschenlampe.oeffnen()", "#ffd23f"],
    "brueche"        => ["Brüche", "Erklär-Tafel für Klasse 5/6", "#brueche", "tafelBrueche.oeffnen()", "#00897b"],
];
