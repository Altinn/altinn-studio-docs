---
title: OpenAPI (swagger) for Apps
linktitle: OpenAPI
type: openapi
spec: "/swagger/altinn-app-v1.json"
tags: [swagger, openapi]
---

Altinn 3 apper bruker altinn sine nuget pakker og tilbyr defor et standard API som er likt på tvers av apper. I en app kan man opprette en instans som går gjennom en prosess med ulike steg der man kan jobbe med data elementer som tilhører en data type.
Data typene er unike per app, og for å kunne lage en api klient for en app, er det ofte behov for å forholde seg til schema for datamodeller og content types for vedleggstyper.
For å kunne møte dette behovet har vi etter versjon 8.6.0 av nuget pakkene 2 ulike openapi spesifikasjoner. En tradisjonell auto generert som inneholder alle apier, men ingen info om ulike data typer, og en app spesifkk spesifikasjon. Under kan du se hvordan den generelle spesifikasjonen ser ut, men for å se den app spesifikke spesifikasjonen må du besøke ``{org}.apps.altinn.no/{org}/{app}/swagger`` i en nettleser.