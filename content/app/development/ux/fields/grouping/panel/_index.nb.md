---
title: Gruppe vist som panel
linktitle: Panel
description: Konfigurasjonsdetaljer for grupper vist som panel, og referanser til gruppeverdier i et panel
---

## Vise gruppen som del av Panel

Gruppe-komponenter kan også sette en parameter, `panel`.
Denne sier at gruppen skal vises som en del av [Panel-komponenten](../../../components/panel).

Her vil du kjenne igjen utseende og innstillinger som kan settes på panel-komponenten. Eksempeloppsett:

```json
{
  "id": "input-panel-group",
  "type": "Group",
  "children": [
    "child1",
    "child2"
  ],
  "dataModelBindings": {},
  "textResourceBindings": {
    "title": "Dette er bare en demo av input panel utenfor repeterende gruppe.",
    "body": "Her ser jeg bare at ting fungerer som forventet."
  },
  "panel": {
    "variant": "info"
  }
}
```

Her har man satt opp gruppen til å vises som panel med variant "info". Oppsettet er ellers helt likt som en vanlig gruppe.

Dette vil gi følgende output:

![Gruppe med panel](input-panel.jpeg "Gruppe med panel")

Det er mulig å konfigurere følgende settings i `panel` feltet på en gruppe:

| Parameter      | Påkrevd | Beskrivelse                                                                                                                                                                                              |
|----------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| variant        | Ja      | Hvilken variant av panel gruppen skal ligge i. Tilgjengelige verdier er "info", "success" og "warning"                                                                                                   |
| iconUrl        | Nei     | Om man ønsker eget ikon som del av panel kan dette settes. Relativ eller full path, f.eks "awesomeIcon.png" eller "http://cdn.example.com/awesomeIcon.png"                                               |                                                                                           |
| iconAlt        | Nei     | Alternativ tekst til custom icon. Kan kun settes om iconUrl er satt. Kan være ren tekst eller en refereanse til en tekstressurs.                                                                         |

Eksempel:

```json
{
  "panel": {
    "variant": "info",
    "iconUrl": "kort.svg",
    "iconAlt": "Betalingskort ikon"
  }
}
```
