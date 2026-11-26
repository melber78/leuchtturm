package de.mewestudio.leuchtturm.widget;

import android.content.Context;
import android.graphics.Color;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

/** Was das Widget gerade zeigen soll: welcher Tag, welche Zeilen, wann sich etwas ändert. */
final class Plan {
    static final class Zeile {
        String nr = "", von = "", bis = "", titel = "", info = "", art = "";
        int farbe = 0xFF3D7EA6;
        boolean aus, frei, jetzt, vorbei;
    }

    static final String[] TAGE = {"", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"};
    static final String[] KURZ = {"", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"};

    String datum = "";
    String kopf = "Mein Tag";
    String unter = "";
    String leer = "";
    final List<Zeile> zeilen = new ArrayList<>();
    long naechsteAenderung;

    static String iso(Calendar k) {
        return String.format(Locale.GERMANY, "%04d-%02d-%02d", k.get(Calendar.YEAR), k.get(Calendar.MONTH) + 1, k.get(Calendar.DAY_OF_MONTH));
    }

    /** "07:45" → 465, sonst -1 */
    static int minuten(String s) {
        if (s == null || s.length() < 4) return -1;
        try {
            int d = s.indexOf(':');
            if (d < 1) return -1;
            return Integer.parseInt(s.substring(0, d).trim()) * 60 + Integer.parseInt(s.substring(d + 1, Math.min(s.length(), d + 3)).trim());
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    private static int ende(JSONObject e) {
        int bis = minuten(e.optString("bis")), von = minuten(e.optString("von"));
        if (bis >= 0) return bis;
        if (von >= 0) return von + 45;
        return 24 * 60;
    }

    static Plan bauen(Context c) {
        Plan p = new Plan();
        Calendar jetzt = Calendar.getInstance();
        String heute = iso(jetzt);
        Calendar morgenK = (Calendar) jetzt.clone();
        morgenK.add(Calendar.DAY_OF_MONTH, 1);
        String morgen = iso(morgenK);
        int minJetzt = jetzt.get(Calendar.HOUR_OF_DAY) * 60 + jetzt.get(Calendar.MINUTE);

        // Spätestens morgen früh neu zeichnen
        Calendar frueh = (Calendar) morgenK.clone();
        frueh.set(Calendar.HOUR_OF_DAY, 5);
        frueh.set(Calendar.MINUTE, 0);
        frueh.set(Calendar.SECOND, 0);
        frueh.set(Calendar.MILLISECOND, 0);
        p.naechsteAenderung = frueh.getTimeInMillis();

        if (!Speicher.verbunden(c)) {
            p.leer = "Tippe hier, um das Widget mit deinem Leuchtturm zu verbinden.";
            return p;
        }
        String roh = Speicher.daten(c);
        if (roh.isEmpty()) {
            String f = Speicher.fehler(c);
            p.leer = f.isEmpty() ? "Wird geladen …" : f;
            return p;
        }
        try {
            JSONArray tage = new JSONObject(roh).getJSONArray("tage");
            JSONObject gewaehlt = null;
            for (int i = 0; i < tage.length(); i++) {
                JSONObject t = tage.getJSONObject(i);
                String d = t.optString("datum");
                if (d.compareTo(heute) < 0) continue;
                JSONArray e = t.optJSONArray("eintraege");
                if (e == null || e.length() == 0) continue;
                if (d.equals(heute)) {
                    int tagesende = 0;
                    for (int j = 0; j < e.length(); j++) tagesende = Math.max(tagesende, ende(e.getJSONObject(j)));
                    if (minJetzt >= tagesende) continue;   // heute ist vorbei → nächster Tag
                }
                gewaehlt = t;
                break;
            }
            if (gewaehlt == null) {
                p.kopf = "Mein Tag";
                p.leer = "In den nächsten Tagen steht nichts im Plan.";
                return p;
            }
            p.datum = gewaehlt.optString("datum");
            boolean istHeute = p.datum.equals(heute);
            int wt = gewaehlt.optInt("wochentag", 0);
            if (wt < 1 || wt > 7) wt = 0;
            String tagMonat = p.datum.length() == 10 ? p.datum.substring(8, 10) + "." + p.datum.substring(5, 7) + "." : p.datum;
            if (istHeute) p.kopf = "Heute · " + KURZ[wt] + " " + tagMonat;
            else if (p.datum.equals(morgen)) p.kopf = "Morgen · " + KURZ[wt] + " " + tagMonat;
            else p.kopf = TAGE[wt] + " · " + tagMonat;

            JSONArray e = gewaehlt.getJSONArray("eintraege");
            int stunden = 0;
            int naechste = Integer.MAX_VALUE;
            for (int j = 0; j < e.length(); j++) {
                JSONObject o = e.getJSONObject(j);
                Zeile z = new Zeile();
                z.nr = o.optString("nr");
                z.von = o.optString("von");
                z.bis = o.optString("bis");
                z.titel = o.optString("titel");
                z.info = o.optString("info");
                z.art = o.optString("art");
                z.aus = o.optBoolean("aus", false);
                z.frei = o.optBoolean("frei", false);
                try { z.farbe = Color.parseColor(o.optString("farbe", "#3d7ea6")); } catch (IllegalArgumentException x) { z.farbe = 0xFF3D7EA6; }
                if (!z.frei && !z.aus && !z.nr.isEmpty()) stunden++;
                if (istHeute) {
                    int von = minuten(z.von), bis = ende(o);
                    if (von >= 0) {
                        z.vorbei = bis <= minJetzt;
                        z.jetzt = von <= minJetzt && minJetzt < bis;
                        if (von > minJetzt) naechste = Math.min(naechste, von);
                        if (bis > minJetzt && bis < 24 * 60) naechste = Math.min(naechste, bis);
                    }
                }
                p.zeilen.add(z);
            }
            if (naechste != Integer.MAX_VALUE) {
                Calendar k = (Calendar) jetzt.clone();
                k.set(Calendar.HOUR_OF_DAY, naechste / 60);
                k.set(Calendar.MINUTE, naechste % 60);
                k.set(Calendar.SECOND, 5);
                k.set(Calendar.MILLISECOND, 0);
                p.naechsteAenderung = k.getTimeInMillis();
            }
            StringBuilder u = new StringBuilder();
            String ab = gewaehlt.optString("ab");
            if (!ab.isEmpty()) u.append(ab).append("-Woche");
            if (stunden > 0) { if (u.length() > 0) u.append(" · "); u.append(stunden).append(stunden == 1 ? " Stunde" : " Stunden"); }
            int todos = gewaehlt.optInt("todos", 0);
            if (todos > 0) { if (u.length() > 0) u.append(" · "); u.append(todos).append(todos == 1 ? " To-do" : " To-dos"); }
            p.unter = u.toString();
        } catch (Exception x) {
            p.leer = "Die Daten konnten nicht gelesen werden. Bitte aktualisieren.";
            p.zeilen.clear();
        }
        return p;
    }
}
