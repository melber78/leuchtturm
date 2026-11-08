# Leuchtturm

Dateien des Leuchtturm-Portals (LRS-Förderung nach AFS).

Installation auf dem Webspace: im Leuchtturm `update.php` öffnen → „Nach Updates suchen“ → „Jetzt installieren“.
Sozialtraining-Stunden: `sozial-stunden.php` (Bibliothek, Editor, Jahresplan, Druck), fertige Stunden in `sozial-einheiten.js`, eigene Stunden in `material-daten/sozialtraining.json`.

Vertretungsstunden: `sozial-stunden.php?bereich=vertretung` (gleiche Seite, eigener Bereich mit Zufallsstunde und Filter „ohne Vorbereitung“), fertige Stunden in `vertretung-einheiten*.js` (weitere Dateien `vertretung-einheiten-N.js` werden automatisch geladen), eigene Stunden in `material-daten/vertretung.json`.
Lernangebot (Grundschule, 40 Min, Deutsch/Mathe/Lernen lernen): `sozial-stunden.php?bereich=lernangebot` (Stunden, Jahresplan GS1–GS4, Methoden & Planer, Tafel, Material), fertige Stunden in `lernangebot-einheiten*.js`, eigene Stunden in `material-daten/lernangebot.json`. Methodenpool + Stundenplaner: `lernangebot-methoden.js`, Tafel-Übungen: `lernangebot-tafel.js`, Material: `lernangebot-material.js`, Wörter/Bilder-Daten: `lernangebot-woerter.js`, Arbeitsblatt-Generator Deutsch/Mathe Kl. 1–4: `lernangebot-generator.php`.
Tafel-Präsentation und PowerPoint-Export: `sozial-praesentation.js` (PowerPoint über `pptxgen.bundle.js`, PptxGenJS, MIT-Lizenz). Filme zu den Stunden: `sozial-medien.js`. Arbeitsmaterial (Karten, Plakate, Urkunden): `sozial-material.js`.

Daten (`material-daten/`, `material-dateien/`) und `auth.php` liegen nur auf dem Server und werden nie überschrieben.

Bilder in `bilder.js`: Microsoft Fluent Emoji (MIT-Lizenz, Hinweis in der Datei).
