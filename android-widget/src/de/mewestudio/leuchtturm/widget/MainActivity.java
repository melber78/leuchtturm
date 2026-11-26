package de.mewestudio.leuchtturm.widget;

import android.app.Activity;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.text.InputType;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

/** Einrichtung (Verbinden, Widget hinzufügen) – und Weiterleitung zu „Mein Tag“ im Browser. */
public class MainActivity extends Activity {
    static final String OEFFNEN = "oeffnen";
    private static final int NACHT = 0xFF16324A, MEER = 0xFF3D7EA6, GOLD = 0xFFF2A93B, SCHAUM = 0xFFF4F6F4, GRAU = 0xFF7C8A85;

    private LinearLayout inhalt;
    private TextView status;
    private LinearLayout vorschau;
    private EditText adresse, code;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        getWindow().setStatusBarColor(NACHT);
        if (weiterleiten(getIntent())) return;
        aufbauen();
        verbindungslink(getIntent());
        fuellen();
    }

    @Override
    protected void onNewIntent(Intent i) {
        super.onNewIntent(i);
        setIntent(i);
        if (weiterleiten(i)) return;
        if (inhalt == null) aufbauen();
        verbindungslink(i);
        fuellen();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (inhalt != null) fuellen();
    }

    /** Klick im Widget: Mein Tag im Browser öffnen. */
    private boolean weiterleiten(Intent i) {
        if (i == null || !i.hasExtra(OEFFNEN) || !Speicher.verbunden(this)) return false;
        String d = i.getStringExtra(OEFFNEN);
        String url = Speicher.adresse(this) + "tagesplan.php" + (d == null || d.isEmpty() ? "" : "#tag/" + d);
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
        } catch (Exception e) {
            Toast.makeText(this, "Kein Browser gefunden.", Toast.LENGTH_LONG).show();
        }
        finish();
        return true;
    }

    /** Link aus dem Leuchtturm: leuchtturm-widget://verbinden?url=…&k=… */
    private void verbindungslink(Intent i) {
        Uri u = i == null ? null : i.getData();
        if (u == null || !"leuchtturm-widget".equals(u.getScheme())) return;
        String a = u.getQueryParameter("url"), k = u.getQueryParameter("k");
        if (a == null || k == null || a.isEmpty() || k.isEmpty()) return;
        Speicher.verbinden(this, a, k);
        laden(true);
        setIntent(new Intent(this, MainActivity.class));
    }

    private void laden(final boolean meldung) {
        status.setText("Wird geladen …");
        new Thread(() -> {
            final String f = Laden.jetzt(getApplicationContext());
            runOnUiThread(() -> {
                WidgetProvider.zeichnen(getApplicationContext());
                fuellen();
                if (meldung) Toast.makeText(this, f == null ? "Verbunden ✓" : f, Toast.LENGTH_LONG).show();
            });
        }).start();
    }

    /* ---------------- Oberfläche ---------------- */

    private int dp(float x) {
        return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, x, getResources().getDisplayMetrics());
    }

    private GradientDrawable form(int farbe, float radius) {
        GradientDrawable g = new GradientDrawable();
        g.setColor(farbe);
        g.setCornerRadius(dp(radius));
        return g;
    }

    private TextView text(String t, float sp, int farbe, boolean fett) {
        TextView v = new TextView(this);
        v.setText(t);
        v.setTextSize(TypedValue.COMPLEX_UNIT_SP, sp);
        v.setTextColor(farbe);
        if (fett) v.setTypeface(Typeface.DEFAULT_BOLD);
        v.setLineSpacing(0, 1.15f);
        return v;
    }

    private LinearLayout karte() {
        LinearLayout k = new LinearLayout(this);
        k.setOrientation(LinearLayout.VERTICAL);
        k.setBackground(form(Color.WHITE, 18));
        k.setPadding(dp(18), dp(16), dp(18), dp(16));
        k.setElevation(dp(2));
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        lp.bottomMargin = dp(14);
        k.setLayoutParams(lp);
        inhalt.addView(k);
        return k;
    }

    private Button knopf(LinearLayout ziel, String t, int farbe, int schrift, View.OnClickListener l) {
        Button b = new Button(this);
        b.setText(t);
        b.setAllCaps(false);
        b.setTextColor(schrift);
        b.setTextSize(TypedValue.COMPLEX_UNIT_SP, 15);
        b.setTypeface(Typeface.DEFAULT_BOLD);
        b.setBackground(form(farbe, 12));
        b.setStateListAnimator(null);
        b.setPadding(dp(14), dp(12), dp(14), dp(12));
        b.setOnClickListener(l);
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        lp.topMargin = dp(10);
        ziel.addView(b, lp);
        return b;
    }

    private EditText feld(LinearLayout ziel, String hinweis, int typ) {
        EditText e = new EditText(this);
        e.setHint(hinweis);
        e.setInputType(typ);
        e.setSingleLine(true);
        e.setTextSize(TypedValue.COMPLEX_UNIT_SP, 15);
        e.setTextColor(NACHT);
        e.setBackground(form(SCHAUM, 10));
        e.setPadding(dp(12), dp(10), dp(12), dp(10));
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        lp.topMargin = dp(8);
        ziel.addView(e, lp);
        return e;
    }

    private void aufbauen() {
        ScrollView sv = new ScrollView(this);
        sv.setBackgroundColor(SCHAUM);
        sv.setFillViewport(true);
        LinearLayout aussen = new LinearLayout(this);
        aussen.setOrientation(LinearLayout.VERTICAL);
        sv.addView(aussen);

        // Kopf
        LinearLayout kopf = new LinearLayout(this);
        kopf.setOrientation(LinearLayout.VERTICAL);
        kopf.setBackgroundColor(NACHT);
        kopf.setPadding(dp(22), dp(26), dp(22), dp(24));
        kopf.addView(text("Leuchtturm · Mein Tag", 22, Color.WHITE, true));
        TextView sub = text("Deine Stunden als Widget auf dem Startbildschirm", 14, 0xFFCFE0EA, false);
        sub.setPadding(0, dp(4), 0, 0);
        kopf.addView(sub);
        aussen.addView(kopf);

        inhalt = new LinearLayout(this);
        inhalt.setOrientation(LinearLayout.VERTICAL);
        inhalt.setPadding(dp(16), dp(16), dp(16), dp(24));
        aussen.addView(inhalt);

        // Status + Vorschau
        LinearLayout k1 = karte();
        status = text("", 15, NACHT, true);
        k1.addView(status);
        vorschau = new LinearLayout(this);
        vorschau.setOrientation(LinearLayout.VERTICAL);
        vorschau.setPadding(0, dp(6), 0, 0);
        k1.addView(vorschau);
        knopf(k1, "Jetzt aktualisieren", MEER, Color.WHITE, v -> {
            if (!Speicher.verbunden(this)) { Toast.makeText(this, "Bitte zuerst verbinden.", Toast.LENGTH_SHORT).show(); return; }
            laden(true);
        });

        // Widget hinzufügen
        LinearLayout k2 = karte();
        k2.addView(text("Widget auf den Startbildschirm", 17, NACHT, true));
        AppWidgetManager m = AppWidgetManager.getInstance(this);
        if (Build.VERSION.SDK_INT >= 26 && m.isRequestPinAppWidgetSupported()) {
            knopf(k2, "Widget jetzt hinzufügen", GOLD, NACHT, v ->
                m.requestPinAppWidget(new ComponentName(this, WidgetProvider.class), null, null));
            TextView t = text("Oder: Startbildschirm lange gedrückt halten → Widgets → Leuchtturm → „Mein Tag“ an die gewünschte Stelle ziehen. Die Größe kannst du danach durch langes Drücken anpassen.", 13, GRAU, false);
            t.setPadding(0, dp(10), 0, 0);
            k2.addView(t);
        } else {
            TextView t = text("Startbildschirm lange gedrückt halten → Widgets → Leuchtturm → „Mein Tag“ an die gewünschte Stelle ziehen.", 14, GRAU, false);
            t.setPadding(0, dp(6), 0, 0);
            k2.addView(t);
        }

        // Verbindung
        LinearLayout k3 = karte();
        k3.addView(text("Verbindung", 17, NACHT, true));
        TextView h = text("Am einfachsten im Leuchtturm am Handy: Mein Tag → Mein Stundenplan → Handy-Widget → „Mit dem Handy verbinden“. Oder hier von Hand eintragen:", 13, GRAU, false);
        h.setPadding(0, dp(6), 0, 0);
        k3.addView(h);
        adresse = feld(k3, "Adresse, z. B. https://mewe-studio.de/leuchtturm/", InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_URI);
        code = feld(k3, "Widget-Code", InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
        knopf(k3, "Verbinden", NACHT, Color.WHITE, v -> {
            String a = adresse.getText().toString().trim(), c = code.getText().toString().trim();
            if (a.isEmpty() || c.isEmpty()) { Toast.makeText(this, "Bitte Adresse und Code eintragen.", Toast.LENGTH_SHORT).show(); return; }
            Speicher.verbinden(this, a, c);
            laden(true);
        });

        setContentView(sv);
    }

    private void fuellen() {
        if (inhalt == null) return;
        if (Speicher.verbunden(this)) {
            String host = Uri.parse(Speicher.adresse(this)).getHost();
            String f = Speicher.fehler(this);
            status.setText(f.isEmpty() ? "✓ Verbunden mit " + host : "⚠ " + f);
            status.setTextColor(f.isEmpty() ? 0xFF2E8B57 : 0xFFC0392B);
            if (adresse.getText().length() == 0) adresse.setText(Speicher.adresse(this));
            if (code.getText().length() == 0) code.setText(Speicher.code(this));
        } else {
            status.setText("Noch nicht verbunden");
            status.setTextColor(0xFFC0392B);
        }
        vorschau.removeAllViews();
        Plan p = Plan.bauen(this);
        if (!Speicher.verbunden(this)) return;
        TextView kopf = text(p.kopf + (p.unter.isEmpty() ? "" : "  ·  " + p.unter), 13, GRAU, true);
        kopf.setPadding(0, dp(8), 0, dp(4));
        vorschau.addView(kopf);
        if (p.zeilen.isEmpty() && !p.leer.isEmpty()) vorschau.addView(text(p.leer, 14, GRAU, false));
        for (Plan.Zeile z : p.zeilen) {
            LinearLayout r = new LinearLayout(this);
            r.setOrientation(LinearLayout.HORIZONTAL);
            r.setGravity(Gravity.CENTER_VERTICAL);
            r.setPadding(dp(6), dp(5), dp(6), dp(5));
            if (z.jetzt) r.setBackground(form(0xFFFFF1D6, 8));
            TextView zeit = text(z.von, 12, GRAU, true);
            zeit.setMinWidth(dp(46));
            r.addView(zeit);
            View balken = new View(this);
            balken.setBackgroundColor(z.frei ? 0xFFDFE5E2 : z.farbe);
            LinearLayout.LayoutParams bl = new LinearLayout.LayoutParams(dp(4), dp(22));
            bl.rightMargin = dp(10);
            r.addView(balken, bl);
            TextView t = text(z.titel + (z.aus ? " (fällt aus)" : ""), 14, z.aus || z.vorbei ? 0xFFA3AFB4 : NACHT, !z.frei);
            r.addView(t, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));
            vorschau.addView(r);
        }
    }
}
