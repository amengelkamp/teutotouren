[x] Komponente rauslösen und verlinken 
[] Komponent für trail-Ergebnisse anlegen
    [] HTML & CSS dafür bauen
    
        []routesPart
            []etappenPart 
            [] calculationResults
                - Position des Suchenden 
                - Reiseart
                - Anreisezeit berechnet für Startpunkt der ersten Etappe
                - Reisedauer/Etappenanzahl in Tagen

                []etappenErgebnisse
                    [] etappenName
                    [] etappenBild
                    [] etappenDescription
                    
    [] Daten der Trails aus Python BE holen (Fetch Request + JSON Format bereit stellen und aus JSON Infos zum Trail auslesen und im FE anzeigen)
    [] 
[]
[]
[]
[]
[]
[] 
[]


# Struktur 

App.jsx 
        SearchbarPart
            FindPosition     
            FormOfTravel
            Anreisezeit
            TravelLength
        CalculationResults
            gewaehltePositionAnzeige
            gewaehlteReiseArtAnzeige'
            berechneteAnreisezeitAnzeige
            gewaehlteEtappentage
        RoutesPart
            EtappenPart
                EtappenErgebnisse
                    einzelneEtappe
                    etappenName
                    etappenBildPlusDescription
                    etappenBild
                    etappenDescription