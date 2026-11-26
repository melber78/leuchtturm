package de.mewestudio.leuchtturm.widget;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.view.View;
import android.widget.RemoteViews;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/** Das Widget „Mein Tag“ auf dem Startbildschirm. */
public class WidgetProvider extends AppWidgetProvider {
    static final String NEU = "de.mewestudio.leuchtturm.widget.NEU";
    static final String TICK = "de.mewestudio.leuchtturm.widget.TICK";
    private static final long ALT = 10 * 60 * 1000L;        // Daten älter als 10 Min. → neu holen
    private static final long SEHR_ALT = 60 * 60 * 1000L;   // beim Stundenwechsel nur, wenn älter als 1 Std.

    @Override
    public void onReceive(Context c, Intent i) {
        String a = i.getAction();
        if (NEU.equals(a)) { holen(c, true, 0); return; }
        if (TICK.equals(a)) { zeichnen(c); holen(c, false, SEHR_ALT); return; }
        super.onReceive(c, i);
    }

    @Override
    public void onUpdate(Context c, AppWidgetManager m, int[] ids) {
        zeichnen(c);
        holen(c, false, ALT);
    }

    @Override
    public void onAppWidgetOptionsChanged(Context c, AppWidgetManager m, int id, android.os.Bundle o) {
        zeichnen(c);
    }

    /** Lädt im Hintergrund neu (sofort = Knopf gedrückt). */
    private void holen(Context c, boolean sofort, long wennAelterAls) {
        final Context app = c.getApplicationContext();
        if (!Speicher.verbunden(app)) { zeichnen(app); return; }
        if (!sofort && System.currentTimeMillis() - Speicher.stand(app) < wennAelterAls) return;
        Speicher.p(app).edit().putBoolean("laedt", true).apply();
        if (sofort) zeichnen(app);
        final PendingResult r = goAsync();
        new Thread(() -> {
            try {
                Laden.jetzt(app);
            } finally {
                Speicher.p(app).edit().putBoolean("laedt", false).apply();
                zeichnen(app);
                r.finish();
            }
        }).start();
    }

    /** Alle Widgets neu zeichnen (aus den gespeicherten Daten, ohne Internet). */
    static void zeichnen(Context c) {
        AppWidgetManager m = AppWidgetManager.getInstance(c);
        int[] ids = m.getAppWidgetIds(new ComponentName(c, WidgetProvider.class));
        if (ids == null || ids.length == 0) return;
        Plan p = Plan.bauen(c);
        for (int id : ids) {
            RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget);
            v.setTextViewText(R.id.tag, p.kopf);
            v.setTextViewText(R.id.unter, p.unter);
            v.setViewVisibility(R.id.unter, p.unter.isEmpty() ? View.GONE : View.VISIBLE);
            v.setTextViewText(R.id.stand, standText(c));

            Intent dienst = new Intent(c, ZeilenService.class);
            dienst.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, id);
            dienst.setData(Uri.parse(dienst.toUri(Intent.URI_INTENT_SCHEME)));
            v.setRemoteAdapter(R.id.liste, dienst);
            v.setEmptyView(R.id.liste, R.id.leer);
            v.setTextViewText(R.id.leer, p.leer.isEmpty() ? "Keine Stunden" : p.leer);

            v.setOnClickPendingIntent(R.id.neu, rundruf(c, NEU, 1));
            v.setOnClickPendingIntent(R.id.kopf, oeffnen(c, p.datum, 2));
            v.setOnClickPendingIntent(R.id.leer, oeffnen(c, p.datum, 3));
            v.setPendingIntentTemplate(R.id.liste, vorlage(c));
            m.updateAppWidget(id, v);
        }
        m.notifyAppWidgetViewDataChanged(ids, R.id.liste);
        wecker(c, p.naechsteAenderung);
    }

    private static String standText(Context c) {
        if (Speicher.laedt(c)) return "lädt …";
        long st = Speicher.stand(c);
        if (st == 0) return "";
        Calendar k = Calendar.getInstance();
        Calendar s = Calendar.getInstance();
        s.setTimeInMillis(st);
        boolean heute = k.get(Calendar.YEAR) == s.get(Calendar.YEAR) && k.get(Calendar.DAY_OF_YEAR) == s.get(Calendar.DAY_OF_YEAR);
        String zeit = new SimpleDateFormat(heute ? "HH:mm" : "dd.MM.", Locale.GERMANY).format(new Date(st));
        return (Speicher.fehler(c).isEmpty() ? "" : "offline · ") + zeit;
    }

    private static PendingIntent rundruf(Context c, String aktion, int nr) {
        Intent i = new Intent(c, WidgetProvider.class).setAction(aktion);
        return PendingIntent.getBroadcast(c, nr, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    /** Öffnet die App, die dann Mein Tag im Browser zeigt (oder die Einrichtung). */
    private static PendingIntent oeffnen(Context c, String datum, int nr) {
        Intent i = new Intent(c, MainActivity.class)
            .setAction("de.mewestudio.leuchtturm.widget.OEFFNEN" + nr)
            .putExtra(MainActivity.OEFFNEN, datum)
            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        return PendingIntent.getActivity(c, nr, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    /** Vorlage für Klicks auf eine Zeile – die Zeile ergänzt das Datum. */
    private static PendingIntent vorlage(Context c) {
        Intent i = new Intent(c, MainActivity.class)
            .setAction("de.mewestudio.leuchtturm.widget.ZEILE")
            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        return PendingIntent.getActivity(c, 4, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_MUTABLE);
    }

    /** Beim nächsten Stundenwechsel neu zeichnen (ungefähr pünktlich, schont den Akku). */
    private static void wecker(Context c, long wann) {
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;
        PendingIntent pi = rundruf(c, TICK, 5);
        long jetzt = System.currentTimeMillis();
        if (wann <= jetzt) wann = jetzt + 60 * 1000L;
        am.setWindow(AlarmManager.RTC, wann, 2 * 60 * 1000L, pi);
    }

    @Override
    public void onDisabled(Context c) {
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        if (am != null) am.cancel(rundruf(c, TICK, 5));
    }
}
