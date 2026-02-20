---
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

{{% notice info  %}}
Konfigurasjonen har tilbakevirkende kraft på tidligere arkiverte instanser.
{{% /notice %}}

I tillegg til å slå funksjonaliteten av og på, er det mulig å ekskludere datatyper og datafelter i et skjema fra å bli kopiert.

| Navn               | Beskrivelse                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| enabled            | true/false for å indikere om funksjonaliteten er slått på eller ikke. Standardverdi er av (false).  |
| excludedDataTypes  | Liste med navn på datatyper som ikke skal kopieres over.                                            |
| excludedDataFields | Liste med navn på felter som ikke skal kopieres over.                                                 |

### Ekskludere datatyper

Det er mulig å angi en liste over datatyper du ikke ønsker at skal kopieres over i ny instans, men hva du kan kopiere av datatyper er allerede svært begrenset. Listen med ekskluderte datatyper har derfor begrenset funksjon i dagens løsning. Kopieringsfunksjonaliteten vil bare kopiere dataelementer relatert til et skjema. Dette betyr at det ikke blir laget kopier av vedlegg. I tillegg må datatypene være knyttet til første steg i prosessen til appen.

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

## Programatiske endringer

Under kopiering av skjema utfører logikken metodekall mot **IInstantiationProcessor.DataCreation**. Dette gjør det mulig å gjøre programatiske endringer i data som blir kopiert. [Les mer om egendefinert forhåndsutfylling](/nb/altinn-studio/v8/guides/development/prefill/custom/).
