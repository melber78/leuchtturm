package de.mewestudio.leuchtturm.widget;

import android.content.Context;
import android.content.SharedPreferences;

/** Einstellungen und zuletzt geladene Daten (bleiben auch ohne Internet erhalten). */
final class Speicher {
    private Speicher() {}

    static SharedPreferences p(Context c) {
        return c.getSharedPreferences("leuchtturm", Context.MODE_PRIVATE);
    }

    static String adresse(Context c) { return p(c).getString("adresse", ""); }
    static String code(Context c) { return p(c).getString("code", ""); }
    static boolean verbunden(Context c) { return !adresse(c).isEmpty() && !code(c).isEmpty(); }
    static String daten(Context c) { return p(c).getString("daten", ""); }
    static long stand(Context c) { return p(c).getLong("stand", 0L); }
    static String fehler(Context c) { return p(c).getString("fehler", ""); }
    static boolean laedt(Context c) { return p(c).getBoolean("laedt", false); }

    static void verbinden(Context c, String adresse, String code) {
        p(c).edit()
            .putString("adresse", basis(adresse))
            .putString("code", code.trim())
            .remove("daten").remove("stand").remove("fehler")
            .apply();
    }

    /** Macht aus jeder Leuchtturm-Adresse den Ordner, z. B. https://mewe-studio.de/leuchtturm/ */
    static String basis(String a) {
        a = a.trim();
        if (a.isEmpty()) return a;
        if (!a.startsWith("http://") && !a.startsWith("https://")) a = "https://" + a;
        int i = a.indexOf('#'); if (i > 0) a = a.substring(0, i);
        i = a.indexOf('?'); if (i > 0) a = a.substring(0, i);
        int schraeg = a.lastIndexOf('/');
        if (schraeg > 8 && a.substring(schraeg).contains(".php")) a = a.substring(0, schraeg + 1);
        if (!a.endsWith("/")) a = a + "/";
        return a;
    }
}
