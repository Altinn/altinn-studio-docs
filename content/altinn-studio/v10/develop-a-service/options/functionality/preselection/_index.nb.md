---
title: Forhåndsvalg
description: Slik gjør du et av alternativene forhåndsvalgt
weight: 250
tags: [needsReview, translate]
---

Noen ganger er det ønskelig at et av svaralternativene er forhåndsvalgt. Det finnes ulike måter å oppnå dette på:

- I datamodellen kan du [forhåndsutfylle feltet](/nb/altinn-studio/v8/guides/development/prefill/) med verdien som ønskes. Legg merke til at verdien også må tilhøre en av de gyldige svaralternativene for komponenter knyttet mot dette feltet i datamodellen, ellers blir [verdien ryddet bort automatisk](/nb/altinn-studio/v8/guides/development/options/functionality/automatic-cleanup/).
- Underveis i utfyllingen av et skjema kan du også bruke [dataprosessering](/nb/altinn-studio/v8/reference/logic/dataprocessing/) for å sette feltet til en ønsket forhåndsvalgt verdi. I noen tilfeller er det riktignok viktig å tillate brukeren å _ikke velge et alternativ_. Hvis feltet bare skrives over når det mangler en verdi, kan brukeren ikke fjerne et forhåndsvalgt alternativ.
- Bruk av `preselectedOptionIndex`-egenskapen, som beskrevet her. Denne lar komponenten selv automatisk velge en nummerert posisjon i listen av svaralternativer som forhåndsvalgt.

### `preselectedOptionIndex`-egenskapen

{{% notice info %}}
Denne egenskapen er tilgjengelig for de fleste komponenter som støtter svaralternativer, med unntak av `FileUploadWithTag`-komponenten. Kun ett alternativ kan være forhåndsvalgt til enhver tid, og det er ikke mulig å velge hvilket alternativ som skal være forhåndsvalgt basert på `value`-egenskapen til alternativet.
{{% /notice %}}

Med denne egenskapen kan du forhåndsvelge et svaralternativ. Den tar et heltall som argument, som er indeksen til svaralternativet som skal være forhåndsvalgt. Indeksen starter på 0 for det første svaralternativet, 1 for det andre osv.

```json
{
  "id": "my-component-id",
  "type": "Checkboxes",
  ...
  "options": [
    { "value": "red", "label": "Rød" },
    { "value": "blue", "label": "Blå" },
    { "value": "green", "label": "Grønn" }
  ],
  "preselectedOptionIndex": 1
}
```

I konfigurasjonen over vil "Blå" være forhåndsvalgt når komponenten vises. Brukeren kan fortsatt velge et annet alternativ, og ettersom dette er en flervalgskomponent, kan brukeren også fjerne forhåndsvalget ved å klikke på det forhåndsvalgte alternativet igjen.

Denne funksjonaliteten følger et sett med regler:

- Hvis datamodellen allerede har en verdi for feltet, blir ikke forhåndsvalget satt.
- Hvis en forhåndsvalgt verdi allerede har blitt satt tidligere (og f.eks. valgt bort), skjer ikke dette igjen så lenge appen er åpen i nettleseren. Hvis brukeren laster siden på nytt, kan forhåndsvalget bli satt igjen.
- Forhåndsvalget settes med en gang siden har lastet og komponentene er klare, uavhengig av om komponenten vises på skjermen eller ikke.
- Forhåndsvalgte verdier blir ikke satt for komponenter som er skjult ved hjelp av [dynamikk](/nb/altinn-studio/v8/guides/development/dynamics/). Hvis komponenten senere blir vist igjen, kan forhåndsvalget bli satt.
- Det forhåndsvalgte alternativet blir bestemt etter [filtrering](/nb/altinn-studio/v8/guides/development/options/functionality/filtering/), men før [sortering](/nb/altinn-studio/v8/guides/development/options/functionality/sorting/) blir utført.


{{% notice warning %}}
Det finnes situasjoner hvor forhåndsvalg med denne egenskapen ikke er optimalt, og kan føre til situasjoner som kan oppleves som feil:

- Hvis et alternativ blir valgt, brukeren velger det bort igjen, og så laster skjemaet på nytt senere, blir forhåndsvalget satt igjen - selv om komponenten er på en side lenge før den brukeren ser på, og ikke vil se igjen.
- Når skjemaet sendes inn via API-et, har ikke forhåndsvalg satt med denne egenskapen noen effekt. Denne egenskapen krever at skjemaet er åpent i nettleseren for å fungere.
- Hvis skjemaet er i en tilstand hvor datamodellen ikke er skrivbar (f.eks. i PDF-generatoren), kan setting av forhåndsvalgte verdier potensielt føre til feilmeldinger og mislykket innsending hvis datamodellen ikke allerede hadde en verdi.

Av disse grunnene anbefaler vi at du bruker denne egenskapen med forsiktighet, og vurderer et av de andre alternativene for forhåndsvalg som er beskrevet over.
{{% /notice %}}