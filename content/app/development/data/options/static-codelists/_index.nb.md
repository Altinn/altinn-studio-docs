---
title: Statiske kodelister fra applikasjon
linktitle: Statiske kodelister
description: Hvordan konfigurere statiske kodelister levert fra applikasjonen?
toc: false
weight: 100
---

Ved å legge json-lister i options mappen i app repo vil appen automatisk lese denne filen og eksponere det gjennom options-apiet.
Options filene må ligge under `App/options/` og vil bli differensiert ved hjelp av navngivningen på json-filen. F.eks `land.json`. Her vil da optionsId være `land`, og vil være eksponert gjennom endepunktet `{org}/{app}/api/options/land`.
Kodelistene må være på et spesifikt format. Eksempel på en kodeliste som inneholder land (`App/options/land.json`):

```json
[
    {
        "value": "norway",
        "label": "Norge"
    },
    {
        "value": "denmark",
        "label": "Danmark"
    },
    {
        "value": "sweden",
        "label": "country.label.sweden"
    }
]
```

`label` feltet kan inneholde en tekstnøkkel til teskstressursene eller ren tekst.
