# Leuchtturm – Handy-Widget „Mein Tag“ (Android)

Kleine Android-App ohne Fremdbibliotheken. Zeigt die Stunden des Tages aus `widget.php` als Widget.
Gebaut wird automatisch bei GitHub (`.github/workflows/widget-app.yml`, Skript `build.sh`),
die fertige APK liegt im Branch `widget-app` und wird im Leuchtturm über `widget-app.php` geladen.
`schluessel.jks` ist der feste Signierschlüssel, damit neue Versionen über die alte installiert werden können.
Dieser Ordner wird von `update.php` nicht auf den Webspace kopiert.
