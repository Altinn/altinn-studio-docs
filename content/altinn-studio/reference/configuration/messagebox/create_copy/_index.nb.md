---
title: Lag ny kopi
linktitle: Lag kopi
description: Denne siden beskriver hvordan man konfigurerer lag ny kopi funksjonaliteten i en app.
weight: 200
---

## Beskrivelse
Hovedhensikten med **Lag ny kopi** funksjonaliteten er at det skal være enkelt for en bruker av portalen å starte på en ny innsending ved å kopiere en tidligere fullført innsending. Brukeren skal bare måtte navigere seg frem til instansen vedkommende ønsker å kopiere for så å klikke på linken Lag ny Kopi. Appen vil lage en kopi og åpne den i nettleseren klar for utfylling med felter ferdig utfylt med data fra orginalen.

{{%notice info%}}
Lag ny kopi funksjonaliteten ble introdusert i versjon 7.9.0 av nuget pakkene.
[Se hvordan du oppdaterer nugetreferanser for applikasjonen din her](/nb/altinn-studio/guides/administration/maintainance/dependencies/).
{{% /notice%}}

## Konfigurasjon

{{% notice info  %}}
Konfigurasjonen har tilbakevirkende kraft på tidligere arkiverte instanser.
{{% /notice %}}

I tillegg til at funksjonaliteten kan skrues av og på er det mulig å ekskludere data typer og data felter i et skjema fra å bli kopiert.

| Navn               | Beskrivelse                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| enabled            | true/false for å indikere om funksjonaliteten er skrudd på eller ikke. Standard verdi er av(false).  |
| excludedDataTypes  | Liste med navn på data typer som ikke skal kopieres over.                                            |
| excludedDataFields | Liste med navn på felter som ikke skal opieres over.                                                 |

### Ekskludering av data typer

Det er mulig å angi en liste over data typer man ikke ønsker at skal kopieres over i ny instans, men hva man kan kopiere av data typer er allerede meget begrenset. Listen med ekskluderte data typer har derfor begrenset funksjon i dagens løsning. Kopierings funksjonaliteten vil bare kopiere data elementer relatert til et skjema. Dette betyr at det ikke blir laget kopier av vedlegg. I tillegg må data typene være knyttet til første steg i prosessen til appen. 

### Ekskludering av felter

I listen med ekskluderte felter kan man angi navnene på felter man ikke ønsker å kopiere over i ny instans. Hensikten med denne funksjonaliteten er å få tømt data i felter man vet må variere fra en innsending til en annen. Det kan for eksempel være et felt som indikerer hvilke kvartal i året den nye innsendingen skal gjelde for. Her må apputvikler vurdere behovene og hva slags type bruk som blir mest vanlig. Felter angis ved hjelp av dot-notasjon på samme måte som man gjør ved data binding i layout filer.

## Eksempler

Konfigurasjon for å skru på *Lag ny kopi* uten ekskluderinger. Disse endringene gjøres i applicationmetadata.json.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true
}
```

Konfigurasjon hvor Lag ny kopi blir aktivert samtidig som det legges til ekskludering av to ulike felter fra to modeller i skjema.

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

Under kopiering av skjema vil logikken utføre metode kall mot **IInstantiationProcessor.DataCreation**. Dette skal gjøre det mulig å gjøre programatiske endringer i data som blir kopiert. [Programatisk prefill](/nb/altinn-studio/guides/development/prefill/custom/).
