<?php require __DIR__ . "/auth.php"; ?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gutachten · Leuchtturm</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

<!-- Erzeugt echte .docx-Dateien im Browser, direkt aus den beiden Word-Vorlagen -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/docxtemplater/3.66.4/docxtemplater.js"></script>
<script src="https://unpkg.com/[email protected]/dist/pizzip.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js"></script>

<style>
:root{
    --nacht:#16324a; --meer:#3d7ea6; --gold:#f2a93b; --schaum:#f4f6f4;
    --karte:#ffffff; --text:#1f2d36; --schatten:0 6px 24px rgba(22,50,74,.1);
}
*{ box-sizing:border-box; }
body{ margin:0; background:var(--schaum); color:var(--text); font-family:"Nunito",sans-serif; line-height:1.5; }
.wrap{ width:min(900px,95%); margin:30px auto 70px; }
.zurueck{ display:inline-block; margin-bottom:18px; color:#7c8a94; font-weight:800; font-size:13px; text-decoration:none; }

header.kopf{ background:linear-gradient(135deg, var(--nacht), var(--meer)); border-radius:24px; color:white; padding:26px 32px; box-shadow:var(--schatten); margin-bottom:18px; }
header.kopf h1{ font-size:28px; font-weight:900; margin:0 0 4px; }
header.kopf p{ font-size:14px; opacity:.9; font-weight:700; margin:0; }

.hinweis{ background:#fff8e6; border:2px solid var(--gold); border-radius:16px; padding:10px 18px; font-size:13px; font-weight:700; color:#7a5d00; margin-bottom:20px; display:flex; gap:10px; align-items:center; }
.fehler{ background:#fdeaea; border:2px solid #d9534f; border-radius:16px; padding:12px 18px; font-size:13px; font-weight:700; color:#8a2b26; margin-bottom:20px; display:none; gap:10px; align-items:flex-start; }
.fehler.zeigen{ display:flex; }

.karte{ background:var(--karte); border-radius:20px; box-shadow:var(--schatten); padding:22px 24px; margin-bottom:18px; }
.karte h2{ font-size:16px; font-weight:900; margin:0 0 14px; color:var(--nacht); text-transform:uppercase; letter-spacing:.4px; }
.karte h3{ font-size:14px; font-weight:800; margin:18px 0 8px; color:#3a4a55; }

label{ display:block; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:.3px; color:#7c8a94; margin:12px 0 4px; }
input[type="text"], input[type="date"], textarea, select{
    width:100%; border:2px solid #ececec; border-radius:12px; padding:9px 14px;
    font-family:"Nunito",sans-serif; font-size:14px; color:var(--text);
}
textarea{ min-height:90px; resize:vertical; font-weight:400; line-height:1.5; }

.zeile{ display:grid; gap:12px; }
.zeile.zwei{ grid-template-columns:1fr 1fr; }
.zeile.drei{ grid-template-columns:1fr 1fr 1fr; }
@media (max-width:700px){ .zeile.zwei, .zeile.drei{ grid-template-columns:1fr; } }

.checkliste{ display:grid; grid-template-columns:1fr 1fr; gap:6px 16px; margin:6px 0 10px; }
@media (max-width:600px){ .checkliste{ grid-template-columns:1fr; } }
.checkliste label{ display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600; text-transform:none; color:var(--text); margin:0; }
.checkliste input[type="checkbox"]{ width:16px; height:16px; flex:none; }

.gruppe{ border:1px solid #eee; border-radius:12px; padding:12px 14px; margin-bottom:10px; }
.gruppe-titel{ font-weight:800; font-size:13px; color:var(--meer); margin-bottom:6px; }

.btn{ border:none; border-radius:999px; padding:13px 28px; margin-top:10px; font-family:"Nunito",sans-serif; font-weight:800; font-size:15px; cursor:pointer; color:white; background:var(--nacht); transition:.15s; }
.btn:hover{ background:var(--gold); color:var(--nacht); }
.btn:disabled{ background:#c7cdd2; cursor:wait; }
.btn-leiste{ text-align:center; margin:24px 0; }

.klein-hinweis{ font-size:11px; color:#9aa5ab; margin-top:4px; }
</style>
</head>
<body>

<div class="wrap">

<a href="index.php" class="zurueck"><i class="fa-solid fa-arrow-left"></i> Zurück zum Leuchtturm</a>

<header class="kopf">
<h1><i class="fa-solid fa-file-signature"></i> Gutachten-Generator</h1>
<p>Pädagogisches Gutachten – Förderdiagnostik</p>
</header>

<div class="hinweis">
<i class="fa-solid fa-lock"></i>
Läuft komplett im Browser — nichts wird gespeichert oder irgendwohin geschickt. Nach dem Erstellen einfach die Seite neu laden, dann ist wieder alles leer.
</div>

<div class="fehler" id="fehler-box">
<i class="fa-solid fa-triangle-exclamation"></i>
<span id="fehler-text"></span>
</div>

<!-- Kopfdaten -->
<div class="karte">
    <h2><i class="fa-solid fa-child"></i> Kopfdaten</h2>
    <div class="zeile drei">
        <div>
            <label>Name des Kindes</label>
            <input type="text" id="kind-name" placeholder="Vorname Nachname">
        </div>
        <div>
            <label>Geburtsdatum</label>
            <input type="date" id="kind-geburtsdatum">
        </div>
        <div>
            <label>Datum der Testung</label>
            <input type="date" id="test-datum">
        </div>
    </div>
</div>

<!-- Anlass -->
<div class="karte">
    <h2><i class="fa-solid fa-circle-question"></i> Anlass der Überprüfung</h2>
    <textarea id="anlass" placeholder="Aufgrund vermuteter Auffälligkeiten im Bereich ... erfolgte eine Überprüfung hinsichtlich einer möglichen Legasthenie bzw. Lese-Rechtschreibproblematik.">Aufgrund vermuteter Auffälligkeiten im Bereich Lesen und Schreiben erfolgte eine Überprüfung hinsichtlich einer möglichen Legasthenie bzw. Lese-Rechtschreibproblematik.</textarea>
    <div class="klein-hinweis">Die rechtliche Einordnung ("keine medizinische Diagnostik" usw.) wird automatisch ergänzt.</div>
</div>

<!-- Testergebnis -->
<div class="karte">
    <h2><i class="fa-solid fa-clipboard-list"></i> Testergebnis</h2>

    <div class="gruppe" style="background:#f8fafb;">
        <div class="gruppe-titel"><i class="fa-solid fa-wand-magic-sparkles"></i> Baukasten: AFS-Ergebnistext generieren</div>
        <p class="klein-hinweis" style="margin:0 0 10px;">Stufe jeden der acht Wahrnehmungsbereiche genau wie auf deinem AFS-Auswertungsbogen ein (Training erforderlich / ratsam / nicht erforderlich). Diese Einstufung steuert automatisch sowohl den Testergebnis-Text hier als auch die Liste unter "Pädagogischer Förderbedarf".</p>
        <div id="afs-baukasten-felder"></div>
        <button class="btn" style="padding:9px 18px; font-size:13px;" onclick="afsTextGenerieren()"><i class="fa-solid fa-pen"></i> Testergebnis-Text einfügen</button>
    </div>

    <label>AFS-Testergebnis (Funktionsebene)</label>
    <textarea id="afs-ergebnis" placeholder="Die Überprüfung mittels AFS-Test erbrachte im ... Wahrnehmungsbereich einen auffälligen Befund ... Als besonders defizitär erwies sich hierbei ..."></textarea>

    <label>Symptomtest Lesen/Schreiben</label>
    <textarea id="symptomtest-ergebnis" placeholder="Auch der Symptomtest Lesen/Schreiben liegt ... Der Befund bestätigt die auf Funktionsebene festgestellte Auffälligkeit auch auf symptomatischer Ebene ..."></textarea>

    <label>Lesetest – Beobachtung</label>
    <textarea id="lesetest" placeholder="Im Lesetest liest [Name] ... Verlesungen treten ... auf, die Leseleistung liegt ... Das Textverständnis ist ..."></textarea>

    <div class="gruppe" style="background:#f8fafb;">
        <div class="gruppe-titel"><i class="fa-solid fa-wand-magic-sparkles"></i> Diktatanalyse-Tool: Fehler automatisch erkennen</div>
        <p class="klein-hinweis" style="margin:0 0 10px;">Zieltext und das, was das Kind geschrieben hat, eintragen. Das Tool erkennt typische Fehlermuster und schlägt einzelne Beispielzeilen vor (Format "Ziel / Kind") — diese fügst du unten mit "- " am Zeilenanfang ein, damit sie im Word-Dokument als Aufzählung erscheinen.</p>
        <div class="zeile zwei">
            <div>
                <label>Zieltext (korrekt)</label>
                <textarea id="diktat-ziel" style="min-height:80px;" placeholder="Draußen kommt bald ein Bild von ihr an."></textarea>
            </div>
            <div>
                <label>Text des Kindes</label>
                <textarea id="diktat-kind" style="min-height:80px;" placeholder="Trausen gamt balt ein Pilt fon ihr an."></textarea>
            </div>
        </div>
        <button class="btn" style="padding:9px 18px; font-size:13px;" onclick="diktatAnalysieren()"><i class="fa-solid fa-magnifying-glass"></i> Analysieren</button>
        <button class="btn" style="padding:9px 18px; font-size:13px; background:var(--meer);" onclick="foerderplanOeffnen()"><i class="fa-solid fa-compass"></i> Förderplan im Generator öffnen</button>
        <div id="diktat-vorschau" style="margin-top:12px; font-size:13px;"></div>
    </div>

    <label>Diktatanalyse</label>
    <textarea id="diktatanalyse" placeholder="Die Diktatanalyse bestätigt den Befund auf orthografischer Ebene: Der Fehlerschwerpunkt liegt ... (z. B. ...). Ergänzend zeigen sich ...">Die Diktatanalyse bestätigt den Befund auf orthografischer Ebene.</textarea>
    <div class="klein-hinweis">Zeilen, die mit "- " beginnen, erscheinen im Word-Dokument als Aufzählungspunkt.</div>

    <label>Einordnung des Befundes</label>
    <textarea id="gesamtschau" placeholder="In der Gesamtschau der Befunde aus Funktionstest, Symptomtest, Leseverhalten und Diktatanalyse ergibt sich im Rahmen der pädagogischen Förderdiagnostik nach dem AFS-Modell das Bild einer ... mit Schwerpunkt im ... [Name] befindet sich entsprechend der pädagogischen Einordnung derzeit in der ... Phase der Legasthenie und benötigt eine gezielte, individuelle Förderung im ...-Bereich."></textarea>
</div>

<!-- Förderbedarf -->
<div class="karte">
    <h2><i class="fa-solid fa-hands-holding-child"></i> Pädagogischer Förderbedarf</h2>

    <h3>1. Aufmerksamkeit</h3>
    <textarea id="foerder-aufmerksamkeit" placeholder="Es zeigt sich eine punktuelle, wiederkehrende Verminderung der Aufmerksamkeitsstabilität im mittleren Verlauf einzelner Testabschnitte. Empfohlen werden regelmäßige Übungen zur Aufmerksamkeitslenkung, Aufmerksamkeitsfokussierung und -stabilisierung, insbesondere im Zusammenhang mit dem Lesen und Schreiben."></textarea>

    <h3>2. Funktionelle Sinneswahrnehmungen (Grundlagenbereich)</h3>
    <textarea id="funktionen-intro" style="min-height:60px;">Zur Sicherstellung einer ganzheitlichen Förderung werden die relevanten funktionellen Wahrnehmungsbereiche in das Training einbezogen. Die Schwerpunktsetzung erfolgt entsprechend der im AFS-Test festgestellten Auffälligkeiten.</textarea>

    <div class="klein-hinweis" style="margin-bottom:10px;">Die Liste der betroffenen Bereiche ergibt sich automatisch aus deiner Einstufung im Baukasten weiter oben (Testergebnis-Abschnitt). Ein Bereich mit "nicht erforderlich" wird hier weggelassen; eine ganze Gruppe ohne betroffenen Bereich wird komplett ausgeblendet (auch die Überschrift).</div>

    <label>Abschlusssatz zu diesem Abschnitt</label>
    <textarea id="funktionen-outro" style="min-height:60px;">Die Förderung dieser Funktionen dient der Optimierung der Aufnahme, Verarbeitung und Speicherung visueller und auditiver Reize sowie der räumlichen Orientierung.</textarea>
    <div class="klein-hinweis">Der Satz zum Schwerpunkt bzw. zur vollumfänglichen Förderung wird automatisch ergänzt.</div>

    <h3>3. Symptombereich Lesen/Schreiben</h3>
    <div class="checkliste">
        <label><input type="checkbox" class="sy-check" value="Buchstabenkenntnis und sichere Lautzuordnung" checked> Buchstabenkenntnis und sichere Lautzuordnung</label>
        <label><input type="checkbox" class="sy-check" value="Wortdurchgliederung und Wortbilderarbeitung" checked> Wortdurchgliederung und Wortbilderarbeitung</label>
        <label><input type="checkbox" class="sy-check" value="Erkennen und Einhalten von Wortgrenzen" checked> Erkennen und Einhalten von Wortgrenzen</label>
        <label><input type="checkbox" class="sy-check" value="Satzdurchgliederung" checked> Satzdurchgliederung</label>
        <label><input type="checkbox" class="sy-check" value="Lesefertigkeit und sinnerfassendes Lesen" checked> Lesefertigkeit und sinnerfassendes Lesen</label>
        <label><input type="checkbox" class="sy-check" value="Leseflüssigkeit" checked> Leseflüssigkeit</label>
        <label><input type="checkbox" class="sy-check" value="Betonung und Lesetempo" checked> Betonung und Lesetempo</label>
        <label><input type="checkbox" class="sy-check" value="Groß- und Kleinschreibung" checked> Groß- und Kleinschreibung</label>
        <label><input type="checkbox" class="sy-check" value="Unterscheidung harter und weicher Konsonanten" checked> Unterscheidung harter und weicher Konsonanten</label>
        <label><input type="checkbox" class="sy-check" value="Auslautverhärtung" checked> Auslautverhärtung</label>
        <label><input type="checkbox" class="sy-check" value="Dehnung und Schärfung" checked> Dehnung und Schärfung</label>
        <label><input type="checkbox" class="sy-check" value="Festigung und Automatisierung geläufiger Wortbilder" checked> Festigung und Automatisierung geläufiger Wortbilder</label>
    </div>
    <label>Abschlusssatz zu diesem Abschnitt</label>
    <textarea id="symptom-outro" style="min-height:60px;">Das Symptomtraining ist parallel zum Funktionstraining vorzusehen. Es zielt auf den Aufbau tragfähiger Strategien, die Automatisierung von Teilfertigkeiten sowie eine zunehmende Sicherheit im Schriftsprachgebrauch ab.</textarea>
</div>

<!-- Empfehlung & Prognose -->
<div class="karte">
    <h2><i class="fa-solid fa-lightbulb"></i> Pädagogische Empfehlung</h2>
    <textarea id="empfehlung" style="min-height:220px;">Empfohlen wird ein kontinuierliches, individuell abgestimmtes und längerfristig angelegtes Fördertraining, das folgende Aspekte berücksichtigt:
- ganzheitlicher Einbezug der relevanten Wahrnehmungsfunktionen,
- gezielte Schwerpunktsetzung auf die festgestellte Schwäche,
- Übungen zur Aufmerksamkeitsfokussierung und -stabilisierung beim Lesen und Schreiben,
- systematische Begleitung des Schreibens, insbesondere im Hinblick auf die Unterscheidung harter und weicher Konsonanten und die sichere Erkennung von Wortgrenzen,
- gezielter Erhalt und Ausbau der bereits vorhandenen Lesefähigkeit hinsichtlich Leseflüssigkeit, Betonung und Lesetempo,
- Aufbau und Festigung orthografischer Strategien,
- regelmäßige Wiederholungs- und Festigungsphasen zur nachhaltigen Sicherung des Lernfortschritts,
- Vermittlung geeigneter Problemlösungsstrategien für den individuellen Umgang mit den bestehenden Schwierigkeiten,
- Erhalt und Förderung der Lernfreude sowie des Interesses am Lesen und Schreiben.</textarea>
    <div class="klein-hinweis">Der Schlusssatz mit dem Namen des Kindes wird automatisch ergänzt.</div>

    <h2 style="margin-top:20px;"><i class="fa-solid fa-school-flag"></i> Empfehlung hinsichtlich schulischer Unterstützung und Nachteilsausgleich</h2>
    <textarea id="schulische-unterstuetzung" style="min-height:120px;">Auf Grundlage der vorliegenden pädagogischen Förderdiagnostik sind bei [Name] nachvollziehbare und dokumentierte Beeinträchtigungen insbesondere im ...-Bereich sowie im Bereich der zugrunde liegenden ... Wahrnehmungsleistung festzustellen.
Aus pädagogischer Sicht wird daher empfohlen, im schulischen Kontext zu prüfen, welche individuellen Unterstützungsmaßnahmen und gegebenenfalls Formen des Nachteilsausgleichs aufgrund der festgestellten Beeinträchtigungen erforderlich und angemessen sind.
Die konkrete Entscheidung über Art und Umfang schulischer Unterstützungsmaßnahmen bzw. eines Nachteilsausgleichs obliegt der zuständigen Schule und dem hierfür zuständigen schulischen Gremium.
Die vorliegende Förderdiagnostik kann hierfür als pädagogische Grundlage und fachliche Dokumentation des individuellen Förderbedarfs herangezogen werden.</textarea>

    <h2 style="margin-top:20px;"><i class="fa-solid fa-chart-line"></i> Prognose</h2>
    <textarea id="prognose" style="min-height:140px;">Bei konsequenter, längerfristiger und individuell abgestimmter Förderung ist von einer deutlichen Stabilisierung der Wahrnehmungsleistung und der Aufmerksamkeit im Schriftsprachkontext sowie von einer signifikanten Reduktion des Fehleraufkommens beim Schreiben auszugehen.
In der Folge sind positive Auswirkungen auf die Rechtschreibleistung, die schriftsprachliche Sicherheit, die schulischen Leistungen sowie das Lern- und Arbeitsverhalten insgesamt zu erwarten.
Die Entwicklung sollte im Rahmen der weiteren Förderung regelmäßig beobachtet und dokumentiert werden, um die Fördermaßnahmen entsprechend dem individuellen Lernfortschritt anzupassen.</textarea>
</div>

<!-- Erläuterungen zum Förderaufbau -->
<div class="karte">
    <h2><i class="fa-solid fa-diagram-project"></i> Erläuterungen zum Förderaufbau</h2>
    <p class="klein-hinweis" style="margin-top:-8px; margin-bottom:12px;">Wird als zweite Word-Datei mit erstellt (Beilage). Die Einleitung mit dem Namen des Kindes wird automatisch ergänzt — hier trägst du nur den übrigen, meist gleichbleibenden Text ein.</p>
    <textarea id="foerderaufbau-text" style="min-height:420px;">## Grundprinzip: Funktion vor Symptom
Die Förderung folgt dem Grundsatz, dass ein sicherer Schriftspracherwerb auf intakten funktionellen Wahrnehmungsleistungen aufbaut. Bevor auf der Symptomebene – also direkt am Lesen und Schreiben – gearbeitet wird, werden daher gezielt jene Wahrnehmungsfunktionen trainiert und gefestigt, die im Testverfahren auffällig waren. Funktions- und Symptomtraining werden im weiteren Verlauf parallel fortgeführt, sodass die gefestigten Grundfunktionen unmittelbar auf das Lesen und Schreiben übertragen werden können.

## Aufbau in Bausteinen
Das Training gliedert sich in aufeinander abgestimmte Bausteine, die inhaltlich aufeinander aufbauen und sich in ihrem Schwierigkeitsgrad an den jeweiligen Lernfortschritt anpassen:
- Baustein 1 – Funktionstraining (Schwerpunktbereiche): gezielte Übungen zu den betroffenen Wahrnehmungsbereichen, ergänzt durch begleitende Übungen zu den übrigen Wahrnehmungsbereichen.
- Baustein 2 – Aufmerksamkeit: kurze, wiederkehrende Übungssequenzen zur Aufmerksamkeitslenkung, insbesondere zu Beginn einer Arbeitsphase, um eine stabile Ausgangslage für das anschließende Üben zu schaffen.
- Baustein 3 – Symptomtraining Lesen: systematischer Aufbau der Lesefertigkeit über Laut-, Silben- und Worterkennung hin zu flüssigem, sinnerfassendem Lesen; besonderer Fokus auf Leseflüssigkeit, Betonung und Lesetempo.
- Baustein 4 – Symptomtraining Schreiben: Arbeit an Wort- und Satzdurchgliederung, sicherer Erkennung von Wortgrenzen, Groß- und Kleinschreibung sowie den orthografischen Regelbereichen (harte/weiche Konsonanten, Dehnung und Schärfung).
- Baustein 5 – Strategieaufbau und Automatisierung: Übertragung der erarbeiteten Strategien in freies Lesen und Schreiben, mit dem Ziel einer zunehmenden Automatisierung und Sicherheit im Schriftsprachgebrauch.

## Methodische Prinzipien
- Kleinschrittigkeit: Neue Inhalte werden in kleinen, gut bewältigbaren Schritten eingeführt.
- Individuelle Anpassung: Tempo und Schwierigkeitsgrad orientieren sich am jeweiligen Lernfortschritt.
- Wiederholung und Festigung: Regelmäßige Wiederholungsphasen sichern den nachhaltigen Lerntransfer.
- Positive Verstärkung: Erfolgserlebnisse werden gezielt eingebaut, um Motivation und Lernfreude zu erhalten.
- Mehrkanaliges Lernen: Optische, akustische und motorische Reize werden kombiniert eingesetzt, um die Verankerung des Lernstoffs zu unterstützen.

## Rahmenbedingungen
Die Förderung findet regelmäßig, idealerweise ein- bis zweimal wöchentlich in Einzelsitzungen von etwa 45–60 Minuten statt. Der Trainingsverlauf wird fortlaufend dokumentiert und in angemessenen Abständen überprüft, um die Bausteine bei Bedarf anzupassen. Eine begleitende Unterstützung im schulischen und häuslichen Umfeld – etwa durch kurze, regelmäßige Übungseinheiten – wirkt sich erfahrungsgemäß positiv auf den Lernfortschritt aus.

## Zusammenarbeit mit Elternhaus und Schule
Ein enger Austausch zwischen Fördertraining, Elternhaus und Schule ist Teil des Förderkonzepts. Beobachtungen aus dem schulischen Alltag fließen in die Anpassung der Bausteine ein, während Rückmeldungen aus dem Training den Beteiligten helfen, den Lernstand realistisch einzuschätzen und im Alltag gezielt zu unterstützen.</textarea>
    <div class="klein-hinweis">Zeilen mit "## " werden zu Überschriften, Zeilen mit "- " zu Aufzählungspunkten, alles andere zu normalem Fließtext.</div>
</div>

<!-- Diktat-Auswertungsbogen -->
<div class="karte">
    <h2><i class="fa-solid fa-table-list"></i> Auswertungsbogen Diktattext</h2>
    <p class="klein-hinweis" style="margin-top:-8px; margin-bottom:12px;">Wird als dritte Word-Datei mit erstellt (Beilage). Zieltext und Kindtext eingeben und analysieren lassen — Anzahl und Beispielwörter je Bereich kannst du danach noch von Hand korrigieren, bevor du die Dateien erstellst.</p>

    <div class="zeile drei">
        <div>
            <label>Klassenstufe / Text</label>
            <input type="text" id="diktatbogen-klassenstufe" placeholder="z. B. 2. Klasse / Satzdiktat">
        </div>
        <div>
            <label>Datum</label>
            <input type="date" id="diktatbogen-datum">
        </div>
        <div></div>
    </div>

    <div class="zeile zwei">
        <div>
            <label>Zieltext (korrekt)</label>
            <textarea id="diktatbogen-ziel" style="min-height:100px;" placeholder="Der Hund holt ihn, sagte der Mann."></textarea>
        </div>
        <div>
            <label>Text des Kindes</label>
            <textarea id="diktatbogen-kind" style="min-height:100px;" placeholder="bed HuNb bim, sagte beaN Ndol."></textarea>
        </div>
    </div>
    <button class="btn" style="padding:9px 18px; font-size:13px;" onclick="diktatbogenAnalysieren()"><i class="fa-solid fa-magnifying-glass"></i> Analysieren</button>

    <h3>Symptomanalyse nach Wahrnehmungsbereichen</h3>
    <div id="diktatbogen-tabelle"></div>
    <div class="klein-hinweis">"Intermodalität" (Diskrepanz zwischen Gehörtem/Gesprochenem und Geschriebenem) sowie die Einordnung "Wahrnehmungsfehler vs. Rechtschreibfehler" lassen sich aus Zieltext/Kindtext allein nicht zuverlässig automatisch bestimmen — bitte bei Bedarf von Hand ergänzen (auch direkt im erzeugten Word-Dokument).</div>

    <div class="zeile zwei" style="margin-top:14px;">
        <div>
            <label>Gesamtzahl Fehler</label>
            <input type="text" id="diktatbogen-gesamt">
        </div>
        <div>
            <label>Auffälligster Bereich</label>
            <input type="text" id="diktatbogen-auffaelligster">
        </div>
    </div>
</div>

<!-- Förderplan im Arbeitsblatt-Generator -->
<div class="karte">
    <h2><i class="fa-solid fa-compass"></i> Förderplan &amp; Arbeitsblätter</h2>
    <p class="klein-hinweis" style="margin-top:-8px; margin-bottom:6px;">Öffnet den LRS-Generator in einem neuen Tab: Aus der AFS-Einstufung (Baukasten oben) und den Fehlerwörtern beider Diktat-Tools werden Funktionsbereiche und Rechtschreib-Schwerpunkte vorgeschlagen – mit einem Klick entsteht dort das passende Förderpaket.</p>
    <p class="klein-hinweis" style="margin:0 0 4px;"><i class="fa-solid fa-lock"></i> Übergeben werden nur die Einstufungen und die Fehlerwörter – kein Name, kein Geburtsdatum. Die Daten stehen nur im Anker der Adresse des neuen Tabs, werden nicht an den Server geschickt und nicht gespeichert.</p>
    <button class="btn" onclick="foerderplanOeffnen()"><i class="fa-solid fa-compass"></i> Förderplan im Generator öffnen</button>
</div>

<!-- Beilagen & Unterschrift -->
<div class="karte">
    <h2><i class="fa-solid fa-paperclip"></i> Beilagen</h2>
    <div id="beilagen-liste">
        <div class="checkliste" style="grid-template-columns:1fr;">
            <label><input type="checkbox" class="beilage-check" checked> Grafische Darstellung des Testergebnisses (AFS-Test)</label>
            <label><input type="checkbox" class="beilage-check" checked> Auswertungsbogen Diktattext</label>
            <label><input type="checkbox" class="beilage-check" checked> Erläuterungen zum Förderaufbau</label>
        </div>
    </div>

    <label>AFS-Auswertungsbogen hochladen (PDF)</label>
    <input type="file" id="afs-pdf-upload" accept="application/pdf">
    <div class="klein-hinweis">Dein Foto oben links wird beim Erstellen automatisch aus der PDF entfernt; die bereinigte Datei wird zusammen mit den Word-Dateien heruntergeladen. Ohne Upload wird einfach keine PDF mit erzeugt.</div>

    <h2 style="margin-top:20px;"><i class="fa-solid fa-signature"></i> Unterschrift</h2>
    <div class="zeile zwei">
        <div>
            <label>Name</label>
            <input type="text" id="unterschrift-name" value="Melanie Bernshausen">
        </div>
        <div>
            <label>Titel</label>
            <input type="text" id="unterschrift-titel" value="Diplomierte Legasthenietrainerin (EÖDL)">
        </div>
    </div>
</div>

<div class="btn-leiste">
    <button class="btn" id="erstellen-btn" onclick="erstelleGutachten()"><i class="fa-solid fa-file-word"></i> Word-Dateien erstellen &amp; herunterladen (Gutachten + Förderaufbau + Diktat-Auswertungsbogen + AFS-PDF)</button>
</div>

</div>

<script>

// ---------------------------
// Hilfsfunktionen
// ---------------------------

function formatiertesDatum(isoDatum){
    if (!isoDatum) return "______________";
    const [jahr, monat, tag] = isoDatum.split("-");
    return `${tag}.${monat}.${jahr}`;
}

// Zerlegt ein Textarea in eine Liste von Absätzen für die Word-Vorlage.
function zeilen(text){
    return (text || "")
        .split("\n")
        .map(z => z.trim())
        .filter(z => z.length > 0)
        .map(z => ({ text: z }));
}

function fehlerAnzeigen(nachricht){
    const box = document.getElementById("fehler-box");
    document.getElementById("fehler-text").textContent = nachricht;
    box.classList.add("zeigen");
}

function fehlerVerbergen(){
    document.getElementById("fehler-box").classList.remove("zeigen");
}

// Lädt eine Datei (Word-Vorlage) als Binärdaten, relativ zu dieser Seite.
async function ladeVorlage(dateiname){
    let antwort;
    try {
        antwort = await fetch(dateiname, { cache: "no-store" });
    } catch (netzwerkFehler) {
        throw new Error(`Vorlage "${dateiname}" konnte nicht geladen werden (Netzwerkfehler). Liegt die Datei im gleichen Ordner wie gutachten.php?`);
    }
    if (!antwort.ok) {
        throw new Error(`Vorlage "${dateiname}" konnte nicht geladen werden (HTTP ${antwort.status}). Liegt die Datei im gleichen Ordner wie gutachten.php?`);
    }
    return await antwort.arrayBuffer();
}

// ---------------------------
// Baukasten: AFS-Testergebnistext (8 Funktionsbereiche, 3 Stufen wie auf dem AFS-Auswertungsbogen)
// ---------------------------

// Reihenfolge und Gruppierung wie auf dem AFS-Auswertungsbogen (Optisch / Akustisch / Raum)
const AFS_BEREICHE = [
    { id: "optdiff", gruppe: "optisch", label: "Optische Differenzierung" },
    { id: "optged",  gruppe: "optisch", label: "Optisches Gedächtnis" },
    { id: "optser",  gruppe: "optisch", label: "Optische Serialität" },
    { id: "akdiff",  gruppe: "akustisch", label: "Akustische Differenzierung" },
    { id: "akged",   gruppe: "akustisch", label: "Akustisches Gedächtnis" },
    { id: "akser",   gruppe: "akustisch", label: "Akustische Serialität" },
    { id: "raum",    gruppe: "raum", label: "Raumorientierung" },
    { id: "koerper", gruppe: "raum", label: "Körperschema" },
];

const STUFEN_LABEL = {
    erforderlich: "Training erforderlich",
    ratsam: "Training ratsam",
    nicht: "Training nicht erforderlich",
};

(function afsBaukastenAufbauen(){
    const container = document.getElementById("afs-baukasten-felder");
    let html = '<div class="checkliste" style="grid-template-columns:1fr 1fr;">';
    AFS_BEREICHE.forEach(b => {
        html += `<div style="display:flex; flex-direction:column; gap:2px;">
            <label style="margin:4px 0 2px; font-size:11px;">${b.label}</label>
            <select id="afs-stufe-${b.id}" style="padding:6px 8px; font-size:12px;">
                <option value="erforderlich">Training erforderlich</option>
                <option value="ratsam">Training ratsam</option>
                <option value="nicht" selected>Training nicht erforderlich</option>
            </select>
        </div>`;
    });
    html += "</div>";
    container.innerHTML = html;
})();

// Liest die aktuelle Einstufung aller 8 Bereiche aus dem Baukasten aus.
function afsEinstufungLesen(){
    return AFS_BEREICHE.map(b => ({
        ...b,
        stufe: document.getElementById(`afs-stufe-${b.id}`).value,
    }));
}

function afsTextGenerieren(){
    const eingestuft = afsEinstufungLesen();
    const erforderlich = eingestuft.filter(b => b.stufe === "erforderlich");
    const ratsam = eingestuft.filter(b => b.stufe === "ratsam");
    const nicht = eingestuft.filter(b => b.stufe === "nicht");

    let saetze = [];

    if (erforderlich.length === 8){
        saetze.push(`Die Überprüfung mittels AFS-Test erbrachte in allen acht Sinneswahrnehmungsbereichen – Optik, Akustik und Raumverarbeitung gleichermaßen – übereinstimmend deutlich unterdurchschnittliche Ergebnisse mit ausgeprägtem Förderbedarf, also durchgehend deutlich unterhalb der Altersnorm.`);
        saetze.push(`Es handelt sich damit nicht um einen eng begrenzten Einzelbefund, sondern um eine breit gefächerte funktionelle Beeinträchtigung.`);
        saetze.push(`Die acht Bereiche sind nicht in exakt identischem Ausmaß betroffen; sämtliche liegen jedoch übereinstimmend deutlich unterhalb der Altersnorm und damit gleichermaßen im Bereich mit ausgeprägtem Förderbedarf.`);
    } else if (erforderlich.length === 0 && ratsam.length === 0){
        saetze.push(`Die Überprüfung mittels AFS-Test erbrachte in allen acht Sinneswahrnehmungsbereichen unauffällige, altersgemäße Ergebnisse.`);
    } else {
        if (erforderlich.length){
            saetze.push(`Die Überprüfung mittels AFS-Test erbrachte mit ausgewiesenem Trainingsbedarf einen auffälligen Befund im Bereich ${erforderlich.map(b => b.label).join(", ")}.`);
            if (erforderlich.length === 1){
                saetze.push(`Als besonders defizitär, das heißt deutlich unterhalb der Altersnorm liegend, erwies sich hierbei die ${erforderlich[0].label}.`);
            } else if (erforderlich.length <= 5){
                saetze.push(`Die betroffenen Bereiche sind nicht in exakt identischem Ausmaß beeinträchtigt; sämtliche liegen jedoch übereinstimmend unterhalb der Altersnorm und damit im Bereich mit Förderbedarf.`);
            }
        }
        if (ratsam.length){
            saetze.push(`Im Bereich ${ratsam.map(b => b.label).join(", ")} zeigten sich leichtere, gleichwohl förderrelevante Abweichungen.`);
        }
        if (nicht.length){
            saetze.push(`${nicht.map(b => b.label).join(", ")} lagen hingegen im unauffälligen, altersgemäßen Bereich.`);
        }
    }

    const text = saetze.join(" ");
    const feld = document.getElementById("afs-ergebnis");
    feld.value = feld.value.trim() ? feld.value.trim() + "\n\n" + text : text;
}

// ---------------------------
// Diktatanalyse-Tool
// ---------------------------

const KONSONANTEN_PAARE = [["b","p"],["d","t"],["g","k"],["w","f"],["s","z"],["m","n"]];

function istKonsonantenVerwechslung(zielWort, kindWort){
    if (zielWort.length !== kindWort.length) return null;
    let unterschiede = [];
    for (let i = 0; i < zielWort.length; i++){
        if (zielWort[i].toLowerCase() !== kindWort[i].toLowerCase()) unterschiede.push(i);
    }
    if (unterschiede.length !== 1) return null;
    const pos = unterschiede[0];
    const a = zielWort[pos].toLowerCase(), b = kindWort[pos].toLowerCase();
    const treffer = KONSONANTEN_PAARE.find(([x,y]) => (x===a && y===b) || (y===a && x===b));
    return treffer ? `${zielWort}/${kindWort}` : null;
}

function istBuchstabendreher(zielWort, kindWort){
    if (zielWort.length !== kindWort.length) return false;
    const sortiert = w => w.toLowerCase().split("").sort().join("");
    return zielWort.toLowerCase() !== kindWort.toLowerCase() && sortiert(zielWort) === sortiert(kindWort);
}

function diktatAnalysieren(){
    const ziel = document.getElementById("diktat-ziel").value.trim().split(/\s+/).filter(Boolean);
    const kind = document.getElementById("diktat-kind").value.trim().split(/\s+/).filter(Boolean);

    const konsonantenFehler = [];
    const buchstabendreher = [];
    const auslassungen = [];
    const sonstige = [];

    const bereinigen = w => w.replace(/[.,!?;:„"]/g, "");

    let wortgrenzenHinweis = ziel.length !== kind.length;

    for (let i = 0; i < Math.min(ziel.length, kind.length); i++){
        const z = bereinigen(ziel[i]);
        const k = bereinigen(kind[i]);
        if (z.toLowerCase() === k.toLowerCase()) continue;

        const konsFehler = istKonsonantenVerwechslung(z, k);
        if (konsFehler){ konsonantenFehler.push(konsFehler); continue; }

        if (istBuchstabendreher(z, k)){ buchstabendreher.push(`${z}/${k}`); continue; }

        if (Math.abs(z.length - k.length) === 1 && z.length > k.length){
            auslassungen.push(`${z}/${k}`);
            continue;
        }

        sonstige.push(`${z}/${k}`);
    }

    // Vorschau
    let vorschau = `<table style="width:100%; border-collapse:collapse; font-size:12px;">
        <tr style="background:#eef4f8;"><th style="padding:4px 8px; text-align:left;">Kategorie</th><th style="padding:4px 8px; text-align:left;">Beispiele</th></tr>`;
    if (konsonantenFehler.length) vorschau += `<tr><td style="padding:4px 8px;">Konsonanten-Verwechslung</td><td style="padding:4px 8px;">${konsonantenFehler.join(", ")}</td></tr>`;
    if (buchstabendreher.length) vorschau += `<tr><td style="padding:4px 8px;">Buchstabendreher</td><td style="padding:4px 8px;">${buchstabendreher.join(", ")}</td></tr>`;
    if (auslassungen.length) vorschau += `<tr><td style="padding:4px 8px;">Auslassung</td><td style="padding:4px 8px;">${auslassungen.join(", ")}</td></tr>`;
    if (sonstige.length) vorschau += `<tr><td style="padding:4px 8px;">Sonstige Abweichung</td><td style="padding:4px 8px;">${sonstige.join(", ")}</td></tr>`;
    if (wortgrenzenHinweis) vorschau += `<tr><td style="padding:4px 8px;">Wortanzahl</td><td style="padding:4px 8px;">Ziel: ${ziel.length} Wörter, Kind: ${kind.length} Wörter — evtl. Wortverschmelzung/-trennung, bitte manuell prüfen</td></tr>`;
    vorschau += "</table>";
    document.getElementById("diktat-vorschau").innerHTML = vorschau;

    // Textvorschlag (mit "- " je Beispielzeile, damit es in der Diktatanalyse als Aufzählung erscheint)
    let saetze = [];
    if (konsonantenFehler.length){
        saetze.push(`Der Fehlerschwerpunkt liegt eindeutig im Bereich der akustischen Wahrnehmung, erkennbar an der systematischen Vertauschung harter und weicher Konsonanten, beispielsweise:`);
        konsonantenFehler.forEach(bsp => saetze.push(`- ${bsp}`));
    }
    if (buchstabendreher.length){
        saetze.push(`Ergänzend zeigen sich Buchstabendreher (z. B. ${buchstabendreher.join(", ")}), die auf eine Unsicherheit in der optischen bzw. seriellen Verarbeitung hindeuten.`);
    }
    if (auslassungen.length){
        saetze.push(`Zudem treten Auslassungsfehler auf (z. B. ${auslassungen.join(", ")}).`);
    }
    if (wortgrenzenHinweis){
        saetze.push(`Ergänzend zeigen sich Schwierigkeiten bei der Wortgrenzenerkennung, also dem sicheren Erfassen, wo ein Wort endet und das nächste beginnt — bitte den Text manuell auf Wortverschmelzungen prüfen und ggf. ein Beispiel ergänzen.`);
    }
    if (sonstige.length && saetze.length === 0){
        saetze.push(`Es zeigen sich vereinzelte Abweichungen (z. B. ${sonstige.join(", ")}), die keinem der geprüften Muster eindeutig zuzuordnen sind — bitte manuell einordnen.`);
    }
    if (saetze.length === 0){
        saetze.push("Keine auffälligen Fehlermuster in den geprüften Kategorien (Konsonanten-Verwechslung, Buchstabendreher, Auslassung) gefunden.");
    }

    const feld = document.getElementById("diktatanalyse");
    const vorschlag = saetze.join("\n");
    feld.value = feld.value.trim() ? feld.value.trim() + "\n\n" + vorschlag : vorschlag;
}

// ---------------------------
// Diktat-Auswertungsbogen: Fehler nach Wahrnehmungsbereichen klassifizieren
// ---------------------------

const VISUELLE_PAARE = [["b","d"],["p","q"],["m","n"],["e","a"]];

function istVisuelleVerwechslung(zielWort, kindWort){
    if (zielWort.length !== kindWort.length) return false;
    let unterschiede = 0, pos = -1;
    for (let i = 0; i < zielWort.length; i++){
        if (zielWort[i].toLowerCase() !== kindWort[i].toLowerCase()){ unterschiede++; pos = i; }
    }
    if (unterschiede !== 1) return false;
    const a = zielWort[pos].toLowerCase(), b = kindWort[pos].toLowerCase();
    return VISUELLE_PAARE.some(([x,y]) => (x===a && y===b) || (y===a && x===b));
}

function istRaumSpiegelung(zielWort, kindWort){
    if (zielWort.length < 3) return false;
    return zielWort.toLowerCase() === kindWort.toLowerCase().split("").reverse().join("");
}

const DIKTATBOGEN_BEREICHE = [
    { id: "optik", label: "Optische Wahrnehmung" },
    { id: "akustik", label: "Akustische Wahrnehmung" },
    { id: "raumlage", label: "Raumlage" },
    { id: "serialitaet", label: "Serialität" },
    { id: "intermodalitaet", label: "Intermodalität" },
    { id: "aufmerksamkeit", label: "Aufmerksamkeit/Konzentration" },
];

function diktatbogenTabelleRendern(ergebnis){
    const container = document.getElementById("diktatbogen-tabelle");
    let html = '<table style="width:100%; border-collapse:collapse; font-size:13px;"><tr style="background:#eef4f8;"><th style="padding:6px 8px; text-align:left;">Bereich</th><th style="padding:6px 8px; width:70px;">Anzahl</th><th style="padding:6px 8px; text-align:left;">Auffällige Wörter</th></tr>';
    DIKTATBOGEN_BEREICHE.forEach(b => {
        const eintrag = ergebnis[b.id] || { anzahl: "", woerter: "" };
        html += `<tr>
            <td style="padding:6px 8px;">${b.label}</td>
            <td style="padding:6px 4px;"><input type="text" id="diktatbogen-anzahl-${b.id}" value="${eintrag.anzahl}" style="width:100%; padding:6px; text-align:center;"></td>
            <td style="padding:6px 4px;"><input type="text" id="diktatbogen-woerter-${b.id}" value="${eintrag.woerter}" style="width:100%; padding:6px;"></td>
        </tr>`;
    });
    html += "</table>";
    container.innerHTML = html;
}

// Erste Rendering direkt beim Laden, damit die Felder auch ohne Analyse von Hand befüllbar sind.
diktatbogenTabelleRendern({});

function diktatbogenAnalysieren(){
    const bereinigen = w => w.replace(/[.,!?;:„"]/g, "");
    const zielWoerter = document.getElementById("diktatbogen-ziel").value.trim().split(/\s+/).filter(Boolean).map(bereinigen);
    const kindWoerter = document.getElementById("diktatbogen-kind").value.trim().split(/\s+/).filter(Boolean).map(bereinigen);

    const treffer = { optik: [], akustik: [], raumlage: [], serialitaet: [], intermodalitaet: [], aufmerksamkeit: [] };

    for (let i = 0; i < Math.min(zielWoerter.length, kindWoerter.length); i++){
        const z = zielWoerter[i], k = kindWoerter[i];
        if (z.toLowerCase() === k.toLowerCase()) continue;

        if (istRaumSpiegelung(z, k)){ treffer.raumlage.push(`${z}/${k}`); continue; }
        if (istVisuelleVerwechslung(z, k)){ treffer.optik.push(`${z}/${k}`); continue; }
        if (istKonsonantenVerwechslung(z, k)){ treffer.akustik.push(`${z}/${k}`); continue; }
        if (istBuchstabendreher(z, k)){ treffer.serialitaet.push(`${z}/${k}`); continue; }
        if (Math.abs(z.length - k.length) === 1 && z.length > k.length){ treffer.optik.push(`${z}/${k}`); continue; }

        // Stark abweichende, nicht eindeutig zuordenbare Wörter (z.B. mehrere Fehler im selben Wort)
        // werden hier der Serialität zugeschlagen, da meist Buchstabenfolge/-anzahl betroffen ist —
        // bitte insbesondere diese Fälle von Hand gegenprüfen.
        treffer.serialitaet.push(`${z}/${k}`);
    }

    if (zielWoerter.length !== kindWoerter.length){
        treffer.aufmerksamkeit.push(`Wortanzahl weicht ab (Ziel: ${zielWoerter.length}, Kind: ${kindWoerter.length}) — auf Wortverschmelzungen/-auslassungen prüfen`);
    }

    const ergebnis = {};
    let gesamt = 0;
    let auffaelligsterId = null, auffaelligsteAnzahl = -1;
    DIKTATBOGEN_BEREICHE.forEach(b => {
        const liste = treffer[b.id];
        const anzahlZaehlbar = liste.filter(t => !t.includes("Wortanzahl weicht")).length;
        ergebnis[b.id] = { anzahl: liste.length ? String(anzahlZaehlbar || liste.length) : "0", woerter: liste.length ? liste.join(", ") : "-" };
        gesamt += anzahlZaehlbar;
        if (anzahlZaehlbar > auffaelligsteAnzahl){ auffaelligsteAnzahl = anzahlZaehlbar; auffaelligsterId = b.id; }
    });
    // Intermodalität lässt sich aus reinem Textvergleich nicht bestimmen.
    ergebnis.intermodalitaet = { anzahl: "-", woerter: "manuell prüfen" };

    diktatbogenTabelleRendern(ergebnis);
    document.getElementById("diktatbogen-gesamt").value = String(gesamt);
    if (auffaelligsteAnzahl > 0){
        document.getElementById("diktatbogen-auffaelligster").value = DIKTATBOGEN_BEREICHE.find(b => b.id === auffaelligsterId).label;
    }
}

// ---------------------------
// Test-Diktat aus dem Generator übernehmen (lrs.php → gutachten.php#diktat=…)
// Die Daten stehen nur im Adress-Anker und werden danach sofort entfernt.
// ---------------------------
(function diktatUebernehmen(){
    const m = /#diktat=([^&]+)/.exec(location.hash);
    if (!m) return;
    history.replaceState(null, "", location.pathname + location.search);
    let d;
    try {
        const bytes = Uint8Array.from(atob(m[1].replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));
        d = JSON.parse(new TextDecoder().decode(bytes));
    } catch (e) { return; }
    if (!d || !d.z) return;
    ["diktat-ziel", "diktatbogen-ziel"].forEach(id => { const el = document.getElementById(id); if (el) el.value = d.z; });
    const kl = document.getElementById("diktatbogen-klassenstufe");
    if (kl) kl.value = `${d.k}. Klasse / Testdiktat „${d.t}“${d.s ? " (" + d.s + ")" : ""}`;
    const datum = document.getElementById("diktatbogen-datum");
    if (datum && !datum.value){ const h = new Date(); datum.value = `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, "0")}-${String(h.getDate()).padStart(2, "0")}`; }
    const hinweis = document.createElement("div");
    hinweis.className = "hinweis";
    hinweis.innerHTML = `<i class="fa-solid fa-file-import"></i> Test-Diktat „${d.t.replace(/[<>&]/g, "")}“ als Zieltext übernommen. Jetzt nur noch das Geschriebene des Kindes in „Text des Kindes“ eintragen und analysieren.`;
    const ziel = document.getElementById("diktatbogen-ziel");
    if (ziel) ziel.closest(".karte").prepend(hinweis);
    setTimeout(() => ziel && ziel.closest(".karte").scrollIntoView({ behavior: "smooth" }), 300);
})();

// ---------------------------
// Förderplan: Einstufung und Fehlerwörter an den Generator übergeben
// (nur im Adress-Anker "#plan=…" – der wird vom Browser nie an den Server geschickt)
// ---------------------------

function foerderplanOeffnen(){
    fehlerVerbergen();
    const bereinigen = w => w.replace(/[.,!?;:„“”"»«()]/g, "");
    const paare = [];
    let wortanzahlWeichtAb = false;
    [["diktat-ziel", "diktat-kind"], ["diktatbogen-ziel", "diktatbogen-kind"]].forEach(([zielId, kindId]) => {
        const ziel = document.getElementById(zielId).value.trim().split(/\s+/).filter(Boolean).map(bereinigen);
        const kind = document.getElementById(kindId).value.trim().split(/\s+/).filter(Boolean).map(bereinigen);
        if (ziel.length && kind.length && ziel.length !== kind.length) wortanzahlWeichtAb = true;
        for (let i = 0; i < Math.min(ziel.length, kind.length); i++){
            if (ziel[i] && kind[i] && ziel[i] !== kind[i]) paare.push([ziel[i], kind[i]]);
        }
    });
    const stufen = {};
    afsEinstufungLesen().forEach(b => { if (b.stufe !== "nicht") stufen[b.id] = b.stufe === "erforderlich" ? "e" : "r"; });
    const bogen = {};
    DIKTATBOGEN_BEREICHE.forEach(b => {
        const feld = document.getElementById("diktatbogen-anzahl-" + b.id);
        const n = feld ? parseInt(feld.value, 10) : 0;
        if (n > 0) bogen[b.id] = n;
    });
    if (!paare.length && !Object.keys(stufen).length && !Object.keys(bogen).length){
        fehlerAnzeigen("Für den Förderplan bitte zuerst im Baukasten die AFS-Bereiche einstufen oder ein Diktat (Zieltext und Text des Kindes) eintragen.");
        return;
    }
    const klasse = (document.getElementById("diktatbogen-klassenstufe").value.match(/[1-8]/) || [])[0] || "";
    const daten = { f: stufen, w: paare.slice(0, 150), b: bogen, a: wortanzahlWeichtAb ? 1 : 0, k: klasse };
    const bytes = new TextEncoder().encode(JSON.stringify(daten));
    let binaer = "";
    bytes.forEach(b => binaer += String.fromCharCode(b));
    const anker = btoa(binaer).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    window.open("lrs.php#plan=" + anker, "_blank");
}

// ---------------------------
// Funktionsbereiche (Optisch/Akustisch/Raum) einsammeln
// ---------------------------

// Baut aus der AFS-Einstufung (Baukasten oben) die Förderbedarf-Liste für eine Gruppe.
// "nicht erforderlich" wird weggelassen; ab 6 von 8 betroffenen Bereichen wird nicht mehr
// einzeln "Schwerpunkt" hervorgehoben, weil dann ohnehin vollumfänglich trainiert wird.
function funktionsItems(gruppe, einstufung, breiterBefund){
    return einstufung
        .filter(b => b.gruppe === gruppe && b.stufe !== "nicht")
        .map(b => ({ text: b.label, is_schwerpunkt: b.stufe === "erforderlich" && !breiterBefund }));
}

// ---------------------------
// AFS-Auswertungsbogen (PDF): Foto oben links automatisch entfernen
// ---------------------------

// Position des Fotos auf dem AFS-Auswertungsbogen (DVLD-Layout, Seite 1, in PDF-Punkten).
// Passt zum Standard-Layout deines Auswertungsbogens; falls sich das Layout deines
// Testanbieters mal ändert, müssten diese Werte angepasst werden.
const AFS_FOTO_BEREICH = { x0: 28.35, top: 34.01, x1: 127.56, bottom: 161.57 };

async function afsPdfFotoEntfernen(datei){
    const bytes = await datei.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(bytes);
    const seite = pdfDoc.getPages()[0];
    const { height } = seite.getSize();

    const { x0, top, x1, bottom } = AFS_FOTO_BEREICH;
    const rand = 1; // kleiner Rand, damit auch der Fotorahmen sicher verdeckt wird
    seite.drawRectangle({
        x: x0 - rand,
        y: height - bottom - rand,
        width: (x1 - x0) + rand * 2,
        height: (bottom - top) + rand * 2,
        color: PDFLib.rgb(1, 1, 1),
    });

    const neueBytes = await pdfDoc.save();
    return new Blob([neueBytes], { type: "application/pdf" });
}

// ---------------------------
// Word-Dateien erstellen
// ---------------------------

async function erstelleGutachten(){
    fehlerVerbergen();
    const btn = document.getElementById("erstellen-btn");
    btn.disabled = true;
    const urspruenglicherText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Wird erstellt …';

    try {
        const kindName = document.getElementById("kind-name").value.trim() || "[Name des Kindes]";
        const geburtsdatum = formatiertesDatum(document.getElementById("kind-geburtsdatum").value);
        const testDatum = formatiertesDatum(document.getElementById("test-datum").value);
        const unterschriftName = document.getElementById("unterschrift-name").value;
        const unterschriftTitel = document.getElementById("unterschrift-titel").value;

        const einstufung = afsEinstufungLesen();
        const erforderlichBereiche = einstufung.filter(b => b.stufe === "erforderlich");
        const breiterBefund = erforderlichBereiche.length >= 6; // ab 6 von 8: vollumfänglich statt Einzel-Schwerpunkt

        const optischeItems = funktionsItems("optisch", einstufung, breiterBefund);
        const akustischeItems = funktionsItems("akustisch", einstufung, breiterBefund);
        const raumItems = funktionsItems("raum", einstufung, breiterBefund);

        let schwerpunktSatz = "";
        if (breiterBefund){
            schwerpunktSatz = `Da sämtliche acht Bereiche betroffen sind, erfolgt das Training vollumfänglich und parallel über alle Wahrnehmungsfunktionen hinweg, ohne Beschränkung auf einen einzelnen Ausgangsbereich.`;
        } else if (erforderlichBereiche.length > 0){
            schwerpunktSatz = `Der Schwerpunkt der Förderung liegt gezielt auf ${erforderlichBereiche.map(b => b.label).join(", ")}, während die übrigen Wahrnehmungsfunktionen entsprechend ihrem individuellen Förderbedarf begleitend gefestigt werden.`;
        }

        const symptomItems = [...document.querySelectorAll(".sy-check:checked")].map(cb => ({ text: cb.value }));
        const beilagenItems = [...document.querySelectorAll(".beilage-check:checked")].map(cb => ({ text: cb.parentElement.textContent.trim() }));

        const gutachtenData = {
            kind_name: kindName,
            geburtsdatum: geburtsdatum,
            test_datum: testDatum,
            anlass: zeilen(document.getElementById("anlass").value),
            afs_ergebnis: zeilen(document.getElementById("afs-ergebnis").value),
            symptomtest_ergebnis: zeilen(document.getElementById("symptomtest-ergebnis").value),
            lesetest: zeilen(document.getElementById("lesetest").value),
            diktatanalyse: zeilen(document.getElementById("diktatanalyse").value),
            gesamtschau: zeilen(document.getElementById("gesamtschau").value),
            foerder_aufmerksamkeit: zeilen(document.getElementById("foerder-aufmerksamkeit").value),
            funktionen_intro: zeilen(document.getElementById("funktionen-intro").value),
            has_optisch: optischeItems.length > 0,
            optische_items: optischeItems,
            has_akustisch: akustischeItems.length > 0,
            akustische_items: akustischeItems,
            has_raum: raumItems.length > 0,
            raum_items: raumItems,
            funktionen_outro: zeilen(document.getElementById("funktionen-outro").value),
            has_schwerpunkt: schwerpunktSatz.length > 0,
            schwerpunkt_satz: schwerpunktSatz,
            symptom_items: symptomItems,
            symptom_outro: zeilen(document.getElementById("symptom-outro").value),
            empfehlung: zeilen(document.getElementById("empfehlung").value),
            schulische_unterstuetzung: zeilen(document.getElementById("schulische-unterstuetzung").value),
            prognose: zeilen(document.getElementById("prognose").value),
            beilagen_items: beilagenItems,
            unterschrift_name: unterschriftName,
            unterschrift_titel: unterschriftTitel,
        };

        const dateiName = kindName.replace(/[^\p{L}\p{N}]+/gu, "_").replace(/^_+|_+$/g, "") || "Gutachten";

        // --- Dokument 1: Gutachten ---
        const vorlage1 = await ladeVorlage("gutachten-vorlage.docx");
        const zip1 = new PizZip(vorlage1);
        const doc1 = new window.docxtemplater(zip1, { paragraphLoop: true, linebreaks: true });
        doc1.render(gutachtenData);
        const blob1 = doc1.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            compression: "DEFLATE",
        });
        saveAs(blob1, `Gutachten_${dateiName}.docx`);

        // --- Dokument 2: Erläuterungen zum Förderaufbau ---
        const foerderaufbauItems = (document.getElementById("foerderaufbau-text").value || "")
            .split("\n")
            .map(z => z.trim())
            .filter(z => z.length > 0)
            .map(zeile => {
                if (zeile.startsWith("## ")) return { text: zeile.substring(3), is_heading: true };
                if (zeile.startsWith("- ")) return { text: zeile.substring(2), is_bullet: true };
                return { text: zeile, is_text: true };
            });

        const foerderaufbauData = {
            kind_name: kindName,
            foerderaufbau_items: foerderaufbauItems,
            unterschrift_name: unterschriftName,
            unterschrift_titel: unterschriftTitel,
        };

        const vorlage2 = await ladeVorlage("foerderaufbau-vorlage.docx");
        const zip2 = new PizZip(vorlage2);
        const doc2 = new window.docxtemplater(zip2, { paragraphLoop: true, linebreaks: true });
        doc2.render(foerderaufbauData);
        const blob2 = doc2.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            compression: "DEFLATE",
        });
        setTimeout(() => {
            saveAs(blob2, `Erlaeuterungen_zum_Foerderaufbau_${dateiName}.docx`);
        }, 400);

        // --- Dokument 3: Auswertungsbogen Diktattext ---
        const diktatbogenData = {
            kind_name: kindName,
            klassenstufe_text: document.getElementById("diktatbogen-klassenstufe").value || "-",
            datum: formatiertesDatum(document.getElementById("diktatbogen-datum").value),
            gesamtzahl_fehler: document.getElementById("diktatbogen-gesamt").value || "-",
            auffaelligster_bereich: document.getElementById("diktatbogen-auffaelligster").value || "-",
        };
        DIKTATBOGEN_BEREICHE.forEach(b => {
            diktatbogenData[`${b.id}_anzahl`] = document.getElementById(`diktatbogen-anzahl-${b.id}`).value || "-";
            diktatbogenData[`${b.id}_woerter`] = document.getElementById(`diktatbogen-woerter-${b.id}`).value || "-";
        });

        const vorlage3 = await ladeVorlage("diktat-vorlage.docx");
        const zip3 = new PizZip(vorlage3);
        const doc3 = new window.docxtemplater(zip3, { paragraphLoop: true, linebreaks: true });
        doc3.render(diktatbogenData);
        const blob3 = doc3.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            compression: "DEFLATE",
        });
        setTimeout(() => {
            saveAs(blob3, `Auswertungsbogen_Diktattext_${dateiName}.docx`);
        }, 800);

        // --- Beilage 4: AFS-Auswertungsbogen (PDF), Foto entfernt ---
        const pdfDatei = document.getElementById("afs-pdf-upload").files[0];
        if (pdfDatei){
            const pdfOhneFoto = await afsPdfFotoEntfernen(pdfDatei);
            setTimeout(() => {
                saveAs(pdfOhneFoto, `AFS_Auswertung_ohne_Foto_${dateiName}.pdf`);
            }, 1200);
        }

    } catch (fehler) {
        console.error(fehler);

        // docxtemplater wirft manchmal ein Array von Fehlern statt eines einzelnen Error-Objekts
        const fehlerListe = Array.isArray(fehler) ? fehler : [fehler];
        const roh = fehlerListe.map(f => {
            if (!f) return "";
            if (f.properties && f.properties.errors) {
                return f.properties.errors.map(e => (e.properties && e.properties.explanation) || e.message || JSON.stringify(e)).join(" / ");
            }
            if (f.properties && f.properties.explanation) return f.properties.explanation;
            return f.message || (typeof f === "string" ? f : JSON.stringify(f));
        }).filter(Boolean).join(" / ") || "unbekannter Fehler (siehe Browser-Konsole, F12)";

        let nachricht = "Beim Erstellen der Word-Dateien ist ein Fehler aufgetreten: " + roh;
        if (roh.indexOf("gutachten-vorlage.docx") !== -1) {
            nachricht = "Die Vorlage 'gutachten-vorlage.docx' wurde nicht gefunden. Bitte im gleichen Ordner wie gutachten.php ablegen.";
        } else if (roh.indexOf("foerderaufbau-vorlage.docx") !== -1) {
            nachricht = "Die Vorlage 'foerderaufbau-vorlage.docx' wurde nicht gefunden. Bitte im gleichen Ordner wie gutachten.php ablegen.";
        } else if (roh.indexOf("diktat-vorlage.docx") !== -1) {
            nachricht = "Die Vorlage 'diktat-vorlage.docx' wurde nicht gefunden. Bitte im gleichen Ordner wie gutachten.php ablegen.";
        }
        fehlerAnzeigen(nachricht);
    } finally {
        btn.disabled = false;
        btn.innerHTML = urspruenglicherText;
    }
}

</script>

</body>
</html>
