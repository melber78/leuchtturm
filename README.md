# Leuchtturm

Dateien des Leuchtturm-Portals (LRS-Förderung nach AFS).

Installation auf dem Webspace: im Leuchtturm `update.php` öffnen → „Nach Updates suchen“ → „Jetzt installieren“.
Sozialtraining-Stunden: `sozial-stunden.php` (Bibliothek, Editor, Jahresplan, Druck), fertige Stunden in `sozial-einheiten.js`, eigene Stunden in `material-daten/sozialtraining.json`.
Tafel-Präsentation und PowerPoint-Export: `sozial-praesentation.js` (PowerPoint über `pptxgen.bundle.js`, PptxGenJS, MIT-Lizenz). Filme zu den Stunden: `sozial-medien.js`.

Daten (`material-daten/`, `material-dateien/`) und `auth.php` liegen nur auf dem Server und werden nie überschrieben.

Bilder in `bilder.js`: Microsoft Fluent Emoji (MIT-Lizenz, Hinweis in der Datei).
