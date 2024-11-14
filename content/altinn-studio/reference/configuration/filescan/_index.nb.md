---
title: Virus skanning
description: Hvordan konfigurere virus-skanning for en app
toc: true
weight: 400
---

Hver applikasjonseier sin storage er beskyttet av Windows Defender. Hvis din applikasjon krever sanntids tilbakemelding om hvorvidt en opplastet fil er infisert eller ikke, kan du aktivere virus-skanning for spesifikke eller alle datatyper. Når virus-skanning er aktivert, blir filen umiddelbart skannet etter opplasting til storage. Resultatet av skanningen legges til senere i metadataene for dataelementet og kan gjennomgås av enhver autorisert enhet.

## Aktiver filskanning i applikasjonen din. 

{{%notice info%}}
For å tillate generering av hendelser for din applikasjon, må den henvise til nuget-versjon >= 7.4.0. Se hvordan du oppdaterer nuget-referanser for din applikasjon [her](/nb/altinn-studio/guides/administration/maintainance/dependencies/).
{{% /notice%}}

Dyp skanning av filer er ikke aktivert som standard. For å aktivere dette, kreves en manuell handling. Hvis en fil skannes og blir funnet infisert før prosessen er fullført, vil dette forårsake en valideringsfeil.

I filen `applicationmetadata.json` i mappen _App/config_ skal følgende legges til for hver datatype som skal skannes:

```json
"enableFileScan": true
```

Hvis du ønsker å tilpasse feilmeldingen for infiserte filer, kan du gjøre det ved å legge til en tekst med nøkkelen `DataElementFileInfected`.

## Valideringsfeil ved venting på filskanning

Hvis ValidationService skal utløse en valideringsfeil og forhindre fullføring av prosessen før skanningen er fullført, bør det legges til en annen verdi for datatypen.
.
```json
      "validationErrorOnPendingFileScan": true
```
Hvis du ønsker å tilpasse feilmeldingen for ventende filer, kan du gjøre det ved å legge til en tekst med nøkkelen `DataElementFileScanPending`.

Eksempel på `applicationmetadata.json` med filskanning aktivert for datatypen _egenerklaring_, uten valideringsfeil for ventende skanning.

```json
{
  "id": "digdir/egenerklaring-2022",
  "org": "digdir",
  "title": {
    "nb": "egenerklaring-2022"
  },
  "dataTypes": [
    {
      "id": "ref-data-as-pdf",
      "allowedContentTypes": [
        "application/pdf"
      ],
      "maxCount": 0,
      "minCount": 0,
      "enablePdfCreation": true,
      "enableFileScan": false,
      "validationErrorOnPendingFileScan": false
    },
    {
      "id": "egenerklaring",
      "allowedContentTypes": [
        "application/xml"
      ],
      "appLogic": {
        "autoCreate": true,
        "classRef": "Altinn.App.Models.egenerklaring",
        "allowAnonymousOnStateless": false,
        "autoDeleteOnProcessEnd": false
      },
      "taskId": "Task_1",
      "maxCount": 1,
      "minCount": 1,
      "enablePdfCreation": true,
      "enableFileScan": true,
      "validationErrorOnPendingFileScan": false
    }
  ],
  "partyTypesAllowed": {
    "bankruptcyEstate": false,
    "organisation": false,
    "person": false,
    "subUnit": false
  },
  "autoDeleteOnProcessEnd": false,
  "created": "2023-02-01T13:16:50.1330774Z",
  "createdBy": "altinn",
  "lastChanged": "2023-02-01T13:16:50.1330784Z",
  "lastChangedBy": "altinn"
}
```
