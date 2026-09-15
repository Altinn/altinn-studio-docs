---
draft: true
title: Innstillinger for felt
linktitle: Innstillinger
description: Slik viser du at et felt er valgfritt, setter en tegngrense og styrer autolagring
tags: [needsReview]
---

Du setter opp disse innstillingene manuelt i layoutfilen for feltet.

## Indikere at felt er valgfritt

{{% notice info %}}
Denne delen oppdateres. Vi vurderer å følge designsystemet.no sin praksis med etikettene **Må fylles ut** og **Valgfritt** i stedet for markeringen beskrevet under.
{{% /notice %}}

Du kan styre om et felt ser valgfritt ut eller ikke. Vanlig oppførsel er at påkrevde felt får en markering med `*`, mens valgfrie felt ikke får noen markering.

![Optional default](optional-default.png "Vanlig oppførsel for valgfritt felt (ingen markering).")

![Required default](required.png "Vanlig oppførsel for påkrevd felt (markert med *).")

Du kan overstyre denne oppførselen for valgfrie felt med `labelSettings` på en komponent i layoutfilen.

```json
{
  {
    "id": "input-felt1",
    "type": "Input",
    ...
    "labelSettings": {
      "optionalIndicator": true
    }
  }
}
```

Når du setter `optionalIndicator` til `true`, viser appen teksten `(Valgfri)` etter ledeteksten til feltet.

![Valgfritt](optional.png "Markering av valgfritt felt.")

Du kan ikke tvinge frem `(Valgfri)`-teksten på et felt som er obligatorisk. Denne innstillingen styrer bare visningen, ikke om feltet faktisk er påkrevd.

## Aktivere tegngrense

Du kan sette en tegngrense for et tekstfelt ved å legge til `maxLength`-egenskapen på en komponent i layoutfilen. Da viser appen en teller med antall gjenværende tegn. Her er et eksempel på en `Input`-komponent med en tegngrense på 10 tegn:

```json
{
  {
    "id": "input-felt1",
    "type": "Input",
    ...
    "maxLength": 10
  }
}
```

_Merk_: `maxLength` i layoutfilen viser bare hvor mange tegn som gjenstår. Den kontrollerer ikke antallet tegn, så brukeren kan fortsatt sende inn skjemaet selv om teksten er lengre enn grensen.
Skal du kontrollere selve antallet tegn, må du også legge til `maxLength`-egenskapen i datamodellen til skjemaet. Se [validering](/nb/altinn-studio/v9/develop-a-service/data/validation/) for mer informasjon.

## Konfigurere automatisk lagring

`Input`-komponenter, `TextArea`-komponenter og `Address`-komponenter (`AddressComponent` i v3) lagrer endringer automatisk mens brukeren skriver. Som standard skjer dette 400 millisekunder etter at brukeren sist skrev noe. Når appen lagrer feltet, kjører den også valideringer og eventuelle triggere. Hvis disse valideringene og triggerne bruker mye ressurser, kan du øke tiden det tar før appen lagrer feltet automatisk, eller skru av funksjonaliteten helt.

Du styrer dette med `saveWhileTyping`-egenskapen på en komponent i layoutfilen. I eksempelet under lagrer appen dataene to sekunder etter at brukeren slutter å skrive i feltet.

```json {hl_lines=[6]}
{
  {
    "id": "input-felt1",
    "type": "Input",
    ...
    "saveWhileTyping": 2000
  }
}
```

Hvis du setter denne egenskapen til `false`, skrur du av funksjonaliteten. Da lagrer appen dataene først når brukeren forlater feltet.
