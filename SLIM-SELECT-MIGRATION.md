# Slim Select Migration Plan

## Ziel
- Select2 (jQuery-basiert) vollständig durch Slim Select (Vanilla JS, MIT) ersetzen
- Nur noch eine zentrale Select-Bibliothek im Plugin
- Alle Select2-Funktionen (Suchen, Mehrfach, Tagging, Optgroups, Platzhalter, Events) erhalten

## Schritte

1. **Slim Select einbinden**
   - JS/CSS nach /ui/slim-select/ legen
   - In Admin und Frontend einbinden (enqueue)

2. **Test-Integration**
   - Einfache Demo-Selectbox im Backend/Frontend mit Slim Select initialisieren
   - Styling und Funktion prüfen

3. **Metaboxes & Felder migrieren**
   - WPMUDEV-Metaboxes: advanced_select, taxonomy_select, post_select
   - Frontend: mp_select2/mp-select2 ersetzen
   - Alle Select2-Initialisierungen auf Slim Select umstellen

4. **Alte Select2-Assets entfernen**
   - /ui/select2/ und /includes/wpmudev-metaboxes/ui/select2/ löschen
   - jQuery-Abhängigkeit für Selects entfernen

5. **Testen & Feinschliff**
   - Alle Selects auf Funktion, Optgroups, Suchen, Events, Barrierefreiheit prüfen
   - Styling ggf. anpassen

## Hinweise
- Slim Select ist MIT-lizenziert und kann frei verwendet werden
- Dokumentation: https://slimselectjs.com/
- Bei Problemen: https://github.com/brianvoe/slim-select
