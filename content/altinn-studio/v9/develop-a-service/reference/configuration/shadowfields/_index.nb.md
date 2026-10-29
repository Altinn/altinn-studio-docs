---
title: Hjelpefelter i skjemadata
linktitle: Hjelpefelter
description: Slik bruker du hjelpefelter for data som skjemaet trenger underveis, men som ikke skal være med i de ferdige dataene.
toc: true
tags: [needsReview]
---

Hjelpefelter er felt i datamodellen som skjemaet bare trenger underveis, for eksempel til dynamikk eller beregninger. Appen fjerner dem når oppgaven er ferdig, eller lagrer en kopi uten dem, slik at de ikke er med når du henter ut dataene.

## Lage hjelpefelter i datamodellen

Gi hjelpefeltene et felles prefiks i navnet, for eksempel `HF_`. Med dette prefikset kan et hjelpefelt hete `HF_mittHjelpefelt`. Appen skiller mellom store og små bokstaver i prefikset.

Du endrer feltnavnene i [verktøyet for datamodellering]({{< relref "/altinn-studio/v9/develop-a-service/reference/data/data-modeling" >}}). Klikk på **Generer modell** etter at du har endret datamodellen.

## Fjerne hjelpefeltene når oppgaven er ferdig

Legg til `shadowFields` under `appLogic` for datatypen i `App/config/applicationmetadata.json`. Datatypen må ha `taskId` og `classRef`, ellers fjerner ikke appen feltene.

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json {linenos=false,hl_lines=["4","8-10"]}
"dataTypes": [
  {
    "id": "model",
    "taskId": "Task_1",
    "appLogic": {
      "autoCreate": true,
      "classRef": "Altinn.App.Models.Model",
      "shadowFields": {
        "prefix": "HF_"
      }
    }
  }
]
```

Når oppgaven `Task_1` er ferdig, fjerner appen alle felt som starter med `HF_`.

{{% notice warning %}}
Appen fjerner hjelpefeltene før den lager PDF-en. Trenger PDF-en dataene i hjelpefeltene, kan du heller lagre en kopi uten hjelpefelter.
{{% /notice %}}

## Lagre en kopi uten hjelpefelter

Med `saveToDataType` beholder appen dataene som de er, og lagrer en kopi uten hjelpefelter i en annen datatype. Kopi-datatypen må finnes i `applicationmetadata.json` og ha `appLogic` med `classRef`, ellers feiler prosessen. Bruk samme modell som originalen, med en annen modell mister kopien feltene som ikke finnes i den modellen.

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json {linenos=false,hl_lines=["8-11","14-20"]}
"dataTypes": [
  {
    "id": "model",
    "taskId": "Task_1",
    "appLogic": {
      "autoCreate": true,
      "classRef": "Altinn.App.Models.Model",
      "shadowFields": {
        "prefix": "HF_",
        "saveToDataType": "model-copy"
      }
    }
  },
  {
    "id": "model-copy",
    "appLogic": {
      "autoCreate": false,
      "classRef": "Altinn.App.Models.Model"
    }
  }
]
```
