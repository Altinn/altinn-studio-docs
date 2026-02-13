---
draft: true
title: Forhåndsvalg
description: Slik gjør du et av alternativene forhåndsvalgt
weight: 250
tags: [needsReview, translate]
---

Noen ganger er det ønskelig at et av svaralternativene er forhåndsvalgt. Det finnes ulike måter å oppnå dette på:

- I datamodellen kan du [forhåndsutfylle feltet]({{< relref "../../../../prefill" >}}) med verdien som ønskes. Legg merke til at verdien også må tilhøre en av de gyldige svaralternativene for komponenter knyttet mot dette feltet i datamodellen, ellers [rydder systemet bort verdien automatisk](../automatic-cleanup/).
- Underveis i utfyllingen av et skjema kan du også bruke [dataprosessering]({{< relref "../../../../logic/dataprocessing" >}}) for å sette feltet til en ønsket forhåndsvalgt verdi. I noen tilfeller er det riktignok viktig å tillate brukeren å _ikke velge et alternativ_. Hvis feltet bare skrives over når det mangler en verdi, kan brukeren ikke fjerne et forhåndsvalgt alternativ.
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

I konfigurasjonen over vil "Blå" være forhåndsvalgt når systemet viser komponenten. Brukeren kan fortsatt velge et annet alternativ, og ettersom dette er en flervalgskomponent, kan brukeren også fjerne forhåndsvalget ved å klikke på det forhåndsvalgte alternativet igjen.

Denne funksjonaliteten følger et sett med regler:

- Hvis datamodellen allerede har en verdi for feltet, setter ikke systemet forhåndsvalget.
- Hvis systemet allerede har satt en forhåndsvalgt verdi tidligere (og f.eks. valgt bort), skjer ikke dette igjen så lenge appen er åpen i nettleseren. Hvis brukeren laster siden på nytt, kan systemet sette forhåndsvalget igjen.
- Systemet setter forhåndsvalget med en gang siden har lastet og komponentene er klare, uavhengig av om komponenten er synlig på skjermen eller ikke.
- Systemet setter ikke forhåndsvalgte verdier for komponenter som er skjult via [dynamikk]({{< relref "../../../dynamics" >}}). Hvis komponenten senere vises igjen, kan systemet sette forhåndsvalget.
- Systemet bestemmer det forhåndsvalgte alternativet etter [filtrering](../filtering/), men før [sortering](../sorting/).


{{% notice warning %}}
I noen tilfeller fungerer ikke forhåndsvalg med denne egenskapen optimalt, og kan føre til situasjoner brukeren opplever som feil:

- Hvis systemet setter et forhåndsvalg, brukeren fjerner det, og skjemaet laster på nytt senere, setter systemet forhåndsvalget igjen - selv om komponenten er på en side som brukeren var innom lenge før, og som brukeren ikke vil se igjen.
- Når brukeren sender inn skjemaet via API-et, har ikke forhåndsvalg du setter med denne egenskapen noen effekt. Denne egenskapen krever at skjemaet er åpent i nettleseren for å fungere.
- Hvis skjemaet er i en tilstand hvor systemet ikke kan skrive til datamodellen (f.eks. i PDF-generatoren), kan forhåndsvalgte verdier potensielt føre til feilmeldinger og mislykket innsending hvis datamodellen ikke allerede hadde en verdi.

Derfor bør du bruke denne egenskapen med forsiktighet, og vurdere et av de andre alternativene for forhåndsvalg som er beskrevet over.
{{% /notice %}}
