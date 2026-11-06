---
title: applicationmetadata.json
description: Formatet til applikasjonsmetadataene i appen.
tags: [app-structure]
---

## Oversikt

`applicationmetadata.json` beskriver appen: hvem som eier den, hvilke data den lagrer, og hvem som kan starte den. Altinn Studio lager filen når du oppretter appen, og oppdaterer den når du for eksempel legger til en datamodell eller en komponent for vedlegg. Filen ligger i `App/config/applicationmetadata.json` i app-repoet.

Når du publiserer appen til et miljø, leser plattformen filen og lagrer metadataene i Altinn Storage.

## Eksempel

Slik ser filen ut i en ny app med én datamodell:

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/application/application-metadata.schema.v1.json",
  "id": "ttd/min-app",
  "org": "ttd",
  "title": { "nb": "Min app" },
  "dataTypes": [
    {
      "id": "ref-data-as-pdf",
      "allowedContentTypes": ["application/pdf"],
      "maxCount": 0,
      "minCount": 0
    },
    {
      "id": "model",
      "allowedContentTypes": ["application/xml"],
      "appLogic": {
        "autoCreate": true,
        "classRef": "Altinn.App.Models.model.model"
      },
      "taskId": "Task_1",
      "maxCount": 1,
      "minCount": 1
    }
  ],
  "partyTypesAllowed": {
    "bankruptcyEstate": true,
    "organisation": true,
    "person": true,
    "subUnit": true
  },
  "autoDeleteOnProcessEnd": false
}
```

## Egenskaper

| Egenskap | Beskrivelse |
| --- | --- |
| `id` | ID-en til appen, på formen `{org}/{app}`. |
| `org` | Organisasjonen som eier appen. |
| `title` | Navnet på appen, for hvert språk. |
| `dataTypes` | Dataene appen lagrer: skjemadata, vedlegg og PDF-er. Hver datatype sier hvilke filtyper den tar imot (`allowedContentTypes`), hvor mange elementer en instans kan ha (`minCount` og `maxCount`), og hvilken oppgave i prosessen den hører til (`taskId`). Skjemadata har `appLogic` med klassen for datamodellen i `classRef`. Se [vedlegg](/nb/altinn-studio/v8/reference/data/attachments/). |
| `partyTypesAllowed` | Hvilke aktørtyper som kan starte appen. Se [aktørtyper](/nb/altinn-studio/v8/reference/configuration/partytype/). |
| `onEntry` | Hva brukeren ser når appen starter. Se [oppstart](/nb/altinn-studio/v8/reference/configuration/startup/). |
| `autoDeleteOnProcessEnd` | Om plattformen sletter instansen når prosessen er ferdig. Se [automatisk sletting](/nb/altinn-studio/v8/reference/configuration/process/auto-delete/). |
| `presentationFields` og `messageBoxConfig` | Hva meldingsboksen viser om instansen. Se [meldingsboks](/nb/altinn-studio/v8/reference/configuration/messagebox/). |
