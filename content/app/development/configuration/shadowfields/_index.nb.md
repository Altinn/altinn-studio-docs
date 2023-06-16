---
title: Hjelpefelter i skjemadata
linktitle: Hjelpefelter
description: Konfigurasjon av hjelpefelter for app.
weight: 200
---

I noen tilfeller kan det være nyttig å lagre ekstra informasjon for et skjema, som ikke nødvendigvis er
viktig å få med når man henter ut ferdige data til egne fagsystemer. Dette kan f.eks. gjelde verdier som er
brukt i forbindelse med dynamikk eller beregninger i skjema, men som ikke er en relevant del av innsendte data.

Ved å ta i bruk funksjonalitet for hjelpefelt kan man lagre all slike data sammen med øvrig skjemadata underveis, for å
så fjerne unødvendig data før det hentes ut til f.eks. fagsystem eller lignende.

{{% notice info %}}
For å kunne ta i bruk hjelpefelter-funksjonalitet må appen bruke version 7.9.0 eller nyere av pakkene Altinn.App.Api
og Altinn.App.Core.
{{% /notice %}}

## Konfigurasjon

### I datamodellen

Hjelpefelter settes opp på samme måte som øvrige skjemafelter i datamodellen, men med et _prefiks_ som man selv velger.
Det vil si at dersom man velger f.eks. `HF_` som prefiks, så vil et hjelpefelt i datamodellen kunne hete `HF_mittHjelpefelt`.

Dette gjøres ved å endre feltnavn i [datamodellerings-verktøyet](../../data/data-modeling/#altinn-studio-data-modeling). Pass på å trykke "Generer modeller" etter endringene
for å få med oppdateringer i C#-modellen og ev. XSD.

_OBS! Om man endrer på feltnavn i datamodell som allerede er i bruk i skjema, må man inn i den aktuelle skjema-komponenten
og oppdatere til nytt feltnavn, da dette ikke gjøres automatisk._

### Fjerne hjelpefeltdata direkte fra skjemadata

For å sikre at feltene som er satt opp som hjelpefelter i datamodellen blir fjernet fra innsendt data må man konfigurere
den aktuelle datatypen i `App/config/applicationMetadata.json`.

1. Finn frem til den datatypen som peker på den aktuelle datamodellen
2. I `appLogic`-objektet, legg til:
   ```json
   "shadowFields": {
       "prefix": <valgt prefiks>
   }
   ```

F.eks., med prefiksen som ble brukt i eksempelet over, ville datatypen bli:

```json {linenos=false,hl_lines=[10-12]}
"dataTypes": [
    {
        "id": "my-model",
        "allowedContentTypes": [
            "application/xml"
        ],
        "appLogic": {
            "autoCreate": true,
            "classRef": "Altinn.App.Models.myModel",
            "shadowFields": {
                "prefix": "HF_"
            }
        }
    }
]
```

Alle felter i datamodellen som starter med `HF_` vil da bli fjernet fra skjemadata ved innsending, slik at når man senere
skal hente ut dataene for behandling, så er de ikke med.

{{% notice warning %}}
Fjerning av data i hjelpefelter gjøres FØR generering av PDF. Dette er fordi skjemadataene låses før generering av PDF,
for å sikre at dataene ikke endres etter at PDF er generert.
Dersom det er data i hjelpefeltene som er nødvendig for å generere PDF, se avsnitt om å lagre en kopi av dataene uten
hjelpefelter under.
{{% /notice %}}

### Lagre en kopi av skjemadata uten hjelpefelter

Det kan være tilfeller der det er ønskelig å beholde skjemadataene sånn som de var ved innsending, og heller opprette en
kopi som inneholder dataene uten hjelpefelter. F.eks. i tilfeller der man bruker hjelpefelter for å styre dynamikk for å
vise/skjule komponenter og dette påvirker hvordan PDF-kvittering blir seende ut.

Dersom man ønsker å beholde skjemadata som ved innsending, og heller lagre en kopi med kun relevant data
(altså uten hjelpefelter) så kan man sette det opp i `applicationMetadata` på samme måte om over, men med en ekstra
konfigurasjon som sier hvilken datatype man ønsker å bruke for å lagre kopien.
Man kan da enten opprette en egen datatype (dette kan gjøre det enklere å f.eks. finne riktig dataelement å hente ut
senere), eller oppgi den samme datatypen som man konfigurerer.

1. Finn frem til den datatypen som peker på den aktuelle datamodellen
2. I `appLogic`-objektet, legg til:
   ```json
   "shadowFields": {
       "prefix": <valgt prefiks>,
       "saveToDataType": <valgt datatype>
   }
   ```

#### Eksempel med samme datatype

```json {linenos=false,hl_lines=[10-12]}
"dataTypes": [
    {
        "id": "my-model",
        "allowedContentTypes": [
            "application/xml"
        ],
        "appLogic": {
            "autoCreate": true,
            "classRef": "Altinn.App.Models.myModel",
            "shadowFields": {
                "prefix": "HF_",
                "saveToDataType": "my-model"
            }
        }
    }
]
```

#### Eksempel med en annen datatype

```json {linenos=false,hl_lines=[10-13,17-27]}
"dataTypes": [
    {
        "id": "my-model",
        "allowedContentTypes": [
            "application/xml"
        ],
        "appLogic": {
            "autoCreate": true,
            "classRef": "Altinn.App.Models.myModel",
            "shadowFields": {
                "prefix": "HF_",
                "saveToDataType": "my-model-copy"
            }
        },
        ...
    },
    {
        "id": "my-model-copy",
        "allowedContentTypes": [
            "application/xml"
        ],
        "appLogic": {
            "autoCreate": false,
            "classRef": "Altinn.App.Models.myModel",
        },
        ...
    }
]
```
