[x] Komponente rauslösen und verlinken 
[x] Komponenten für trail-Ergebnisse anlegen
 []routesPart
            [x]etappenPart 
            [x] calculationResults
                - Position des Suchenden 
                - Reiseart
                - Anreisezeit berechnet für Startpunkt der ersten Etappe
                - Reisedauer/Etappenanzahl in Tagen

                [x]etappenErgebnisse
                    [x] etappenName
                    [x] etappenBild
                    [x] etappenDescription
## BE Set Up               
[x] Daten der Trails aus Python BE holen (Fetch Request + JSON Format bereit stellen und aus JSON Infos zum Trail auslesen und im FE anzeigen)
    [x] Ergebnisse von Datenbank via Python in JSON ausgeben (09.02.2025)
    [x] Endpunkt aufrufen und aus jedem JSON ein Etappenpart in DIVS machen 
    [x] Fotos zu Etappen in Datenbank als BLOB hinzufügen
        [x] Spalte hinzufügen "image01"
        [x] Beispielfoto für jede Strecke hinzufügen via Python Skript
        [x] Ziel: Unteren Bereich bei "Suchen" ohne Filter komplett anzeigen lassen mit Fotos und Etappen

# Suchbarkeit erhöhen bzw. Suchleiste ausbauen
Auf ein Klicken des Suchbuttons hin ohne Angabe von Filtern, werden alle Etappen aus der Datenbank angezeigt. Nu ist das Ziel, mit diesme Stand die Filter weiter auszubauen, da nun prüfbar ist, ob diese funktionieren.        

## "Dein Standort 
[] Ermittelbarkeit durch Valhalla API nutzbar machen 

[] 
[]
