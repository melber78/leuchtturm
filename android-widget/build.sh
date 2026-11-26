#!/usr/bin/env bash
# Baut die Widget-App ohne Gradle – nur mit den Werkzeugen aus dem Android-SDK.
# Läuft automatisch bei GitHub (.github/workflows/widget-app.yml).
set -euo pipefail
cd "$(dirname "$0")"
SDK="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-/usr/local/lib/android/sdk}}"
BT="$SDK/build-tools/$(ls "$SDK/build-tools" | sort -V | tail -1)"
PLATFORM="$SDK/platforms/$(ls "$SDK/platforms" | grep -E '^android-[0-9]+$' | sort -V | tail -1)"
JAR="$PLATFORM/android.jar"
echo "Build-Tools: $BT"; echo "Plattform:   $PLATFORM"
VERSION_CODE="${VERSION_CODE:-1}"
VERSION_NAME="${VERSION_NAME:-1.0}"

rm -rf build; mkdir -p build/gen build/obj build/dex
"$BT/aapt2" compile --dir res -o build/res.zip
"$BT/aapt2" link -I "$JAR" --manifest AndroidManifest.xml -o build/basis.apk build/res.zip \
    --java build/gen --min-sdk-version 26 --target-sdk-version 34 \
    --version-code "$VERSION_CODE" --version-name "$VERSION_NAME"
javac -encoding UTF-8 -source 11 -target 11 -Xlint:-options -Xlint:deprecation -classpath "$JAR" -d build/obj $(find src build/gen -name '*.java')
"$BT/d8" --release --min-api 26 --lib "$JAR" --output build/dex $(find build/obj -name '*.class')
cp build/basis.apk build/roh.apk
(cd build/dex && zip -q -j ../roh.apk classes.dex)
"$BT/zipalign" -f -p 4 build/roh.apk build/ausgerichtet.apk
"$BT/apksigner" sign --ks schluessel.jks --ks-pass pass:leuchtturm --key-pass pass:leuchtturm --ks-key-alias widget \
    --out build/leuchtturm-widget.apk build/ausgerichtet.apk
"$BT/apksigner" verify --print-certs build/leuchtturm-widget.apk | head -2
ls -la build/leuchtturm-widget.apk
