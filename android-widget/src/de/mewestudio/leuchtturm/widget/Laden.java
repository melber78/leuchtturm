package de.mewestudio.leuchtturm.widget;

import android.content.Context;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

/** Holt die Stunden vom Leuchtturm (widget.php). Nie im Haupt-Thread aufrufen. */
final class Laden {
    private Laden() {}

    /** @return null, wenn alles geklappt hat – sonst eine Fehlermeldung. */
    static String jetzt(Context c) {
        if (!Speicher.verbunden(c)) return "Noch nicht verbunden.";
        HttpURLConnection v = null;
        try {
            URL u = new URL(Speicher.adresse(c) + "widget.php?k=" + URLEncoder.encode(Speicher.code(c), "UTF-8"));
            v = (HttpURLConnection) u.openConnection();
            v.setConnectTimeout(15000);
            v.setReadTimeout(20000);
            v.setUseCaches(false);
            v.setRequestProperty("Accept", "application/json");
            int code = v.getResponseCode();
            InputStream in = code >= 400 ? v.getErrorStream() : v.getInputStream();
            String text = in == null ? "" : lesen(in);
            JSONObject o;
            try {
                o = new JSONObject(text);
            } catch (JSONException e) {
                if (code == 404) return fehler(c, "widget.php wurde nicht gefunden – ist das Leuchtturm-Update installiert?");
                return fehler(c, "Unerwartete Antwort vom Leuchtturm (" + code + "). Stimmt die Adresse?");
            }
            if (!o.optBoolean("ok", false)) return fehler(c, o.optString("fehler", "Fehler " + code));
            Speicher.p(c).edit()
                .putString("daten", text)
                .putLong("stand", System.currentTimeMillis())
                .remove("fehler")
                .apply();
            return null;
        } catch (IOException e) {
            return fehler(c, "Keine Verbindung – es wird der letzte Stand gezeigt.");
        } finally {
            if (v != null) v.disconnect();
        }
    }

    private static String fehler(Context c, String f) {
        Speicher.p(c).edit().putString("fehler", f).apply();
        return f;
    }

    private static String lesen(InputStream in) throws IOException {
        ByteArrayOutputStream b = new ByteArrayOutputStream();
        byte[] puffer = new byte[8192];
        int n;
        while ((n = in.read(puffer)) > 0) b.write(puffer, 0, n);
        in.close();
        return b.toString("UTF-8");
    }
}
