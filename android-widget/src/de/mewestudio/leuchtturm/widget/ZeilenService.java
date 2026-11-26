package de.mewestudio.leuchtturm.widget;

import android.content.Context;
import android.content.Intent;
import android.graphics.Typeface;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.style.StrikethroughSpan;
import android.text.style.StyleSpan;
import android.view.View;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;

/** Liefert die Zeilen (Stunden) für die Liste im Widget. */
public class ZeilenService extends RemoteViewsService {
    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {
        return new Fabrik(getApplicationContext());
    }

    static final class Fabrik implements RemoteViewsFactory {
        private final Context c;
        private Plan plan = new Plan();

        Fabrik(Context c) { this.c = c; }

        @Override public void onCreate() {}
        @Override public void onDataSetChanged() { plan = Plan.bauen(c); }
        @Override public void onDestroy() {}
        @Override public int getCount() { return plan.zeilen.size(); }
        @Override public RemoteViews getLoadingView() { return null; }
        @Override public int getViewTypeCount() { return 1; }
        @Override public long getItemId(int pos) { return pos; }
        @Override public boolean hasStableIds() { return false; }

        @Override
        public RemoteViews getViewAt(int pos) {
            RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget_zeile);
            if (pos < 0 || pos >= plan.zeilen.size()) return v;
            Plan.Zeile z = plan.zeilen.get(pos);

            int dunkel = 0xFF16324A, grau = 0xFF5B6B73, blass = 0xFFA3AFB4;
            boolean gedaempft = z.vorbei || z.aus;

            v.setTextViewText(R.id.nr, z.nr);
            v.setViewVisibility(R.id.nr, z.nr.isEmpty() ? View.GONE : View.VISIBLE);
            v.setTextColor(R.id.nr, gedaempft ? blass : dunkel);
            String zeit = z.von + (z.bis.isEmpty() ? "" : "\n" + z.bis);
            v.setTextViewText(R.id.zeit, zeit);
            v.setViewVisibility(R.id.zeit, zeit.isEmpty() ? View.GONE : View.VISIBLE);

            v.setInt(R.id.balken, "setBackgroundColor", z.frei ? 0xFFDFE5E2 : (gedaempft ? (z.farbe & 0x00FFFFFF) | 0x66000000 : z.farbe));

            SpannableString titel = new SpannableString(z.titel);
            if (!z.frei) titel.setSpan(new StyleSpan(Typeface.BOLD), 0, titel.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
            if (z.aus) titel.setSpan(new StrikethroughSpan(), 0, titel.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
            v.setTextViewText(R.id.titel, titel);
            v.setTextColor(R.id.titel, gedaempft ? blass : (z.frei ? 0xFF7C8A85 : dunkel));

            String info = z.info;
            if (z.aus) info = "fällt aus" + (info.isEmpty() ? "" : " · " + info);
            else if (z.jetzt) info = "● jetzt" + (info.isEmpty() ? "" : " · " + info);
            v.setTextViewText(R.id.info, info);
            v.setViewVisibility(R.id.info, info.isEmpty() ? View.GONE : View.VISIBLE);
            v.setTextColor(R.id.info, z.aus ? 0xFFC0392B : (z.jetzt ? 0xFFB5761A : (gedaempft ? blass : grau)));

            v.setInt(R.id.zeile, "setBackgroundColor", z.jetzt ? 0xFFFFF1D6 : 0x00000000);

            Intent fuellen = new Intent();
            fuellen.putExtra(MainActivity.OEFFNEN, plan.datum);
            v.setOnClickFillInIntent(R.id.zeile, fuellen);
            return v;
        }
    }
}
