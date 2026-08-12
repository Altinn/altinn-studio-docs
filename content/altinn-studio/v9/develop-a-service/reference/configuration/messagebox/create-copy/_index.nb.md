---
draft: true
title: Lage ny kopi
linktitle: Lag kopi
description: Slik lar du brukere kopiere en tidligere instans.
weight: 200
tags: [needsReview]
---

## Beskrivelse

Hovedhensikten med **Lag ny kopi**-funksjonaliteten er å gjøre det enkelt for brukeren å starte en ny instans ved å kopiere en tidligere fullført instans (et tidligere innsendt eksemplar). Brukeren må bare navigere frem til instansen som skal kopieres, og klikke på lenken **Lag ny kopi**. Appen lager en kopi og åpner den i nettleseren klar for utfylling, med felter ferdig utfylt med data fra originalen.

{{%notice info%}}
Lag ny kopi-funksjonaliteten ble introdusert i versjon 7.9.0 av nuget-pakkene.
[Les hvordan du oppdaterer nugetreferanser for appen din](/nb/altinn-studio/v8/guides/administration/maintainance/dependencies/).
{{% /notice%}}

## Konfigurasjon

{{%notice info%}}
Konfigurasjonen har tilbakevirkende kraft på tidligere arkiverte instanser.
{{% /notice%}}

I tillegg til å slå funksjonaliteten av og på, er det mulig å velge om vedlegg skal kopieres og å ekskludere datatyper og datafelter fra kopien.

| Navn               | Beskrivelse                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| enabled            | true/false for å indikere om funksjonaliteten er slått på eller ikke. Standardverdi er av (false).        |
| excludedDataTypes  | Liste med navn på datatyper som ikke skal kopieres over. Gjelder både skjemadata og vedlegg.              |
| excludedDataFields | Liste med navn på felter som ikke skal kopieres over.                                                    |
| includeAttachments | true/false for å indikere om vedlegg skal kopieres over. Standardverdi er av (false).                     |

### Ekskludere datatyper

Det er mulig å angi en liste over datatyper du ikke ønsker at skal kopieres over i den nye instansen. Ekskluderingen gjelder både skjemadata og vedlegg. Alle datatyper som skal kopieres, må være knyttet til første steg i prosessen til appen.

### Kopiere vedlegg

Vedlegg kopieres bare når `includeAttachments` er satt til `true`. Hvis innstillingen er `false` eller utelatt, blir vedlegg ikke kopiert. Vedlegg med en datatype som er oppført i `excludedDataTypes`, blir heller ikke kopiert.

### Ekskludere felter

I listen med ekskluderte felter kan du angi navnene på felter du ikke ønsker å kopiere over i ny instans. Hensikten med denne funksjonaliteten er å tømme data i felter du vet må variere fra en instans til en annen. Det kan for eksempel være et felt som indikerer hvilket kvartal i året den nye instansen skal gjelde for. Her må apputvikler vurdere behovene og hva slags type bruk som blir mest vanlig. Felter angis ved hjelp av dot-notasjon på samme måte som du gjør ved databinding i layoutfiler.

## Eksempler

Konfigurasjon for å slå på **Lag ny kopi** uten ekskluderinger. Disse endringene gjøres i `applicationmetadata.json`.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true
}
```

Konfigurasjon hvor **Lag ny kopi** blir aktivert og vedlegg blir kopiert til den nye instansen.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true,
    "includeAttachments": true
}
```

Konfigurasjon hvor **Lag ny kopi** blir aktivert samtidig som det legges til ekskludering av to ulike felter fra to modeller i skjema.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true,
    "excludedDataFields": [
        "group1.felt2",
        "group23.felt21"
    ]
}
```

## Programmatiske endringer

Under kopiering av skjema utfører logikken metodekall mot **IInstantiationProcessor.DataCreation**. Dette gjør det mulig å gjøre programmatiske endringer i data som kopieres. [Les mer om egendefinert forhåndsutfylling](/nb/altinn-studio/v8/guides/development/prefill/custom/).
