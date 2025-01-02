---
title: Forhåndsvalg
description: Gjør et av alternativene forhåndsvalgt
weight: 250
---

Noen ganger er det ønskelig at et av svaralternativene er forhåndsvalgt. Det finnes ulike måter å oppnå dette på.

1. I datamodellen kan du [forhåndsutfylle feltet](../../../prefill) med verdien som ønskes. Legg merke til at
   verdien også må tilhøre en av de gyldige svaralternativene for komponenter knyttet mot dette feltet i datamodellen,
   ellers vil [verdien bli ryddet bort automatisk](../automatic-cleanup).
2. Underveis i utfyllingen av et skjema kan man også bruke [dataprosessering](../../../../../reference/logic/dataprocessing)
   for å sette feltet til en ønsket forhåndsvalgt verdi. I noen tilfeller er det riktignok viktig å tillate brukeren
   å _ikke velge et alternativ_. Hvis feltet bare skrives over om det mangler en verdi, vil brukeren ikke kunne
   fjerne et forhåndsvalgt alternativ.
3. Bruk av `preselectedOptionIndex`-egenskapen, som beskrevet her. Denne lar komponenten selv automatisk velge e
   nummerert posisjon i listen av svaralternativer som forhåndsvalgt.

### `preselectedOptionIndex`-egenskapen

{{% notice info %}}
Denne egenskapen er tilgjengelig for de fleste komponenter som støtter svaralternativer, med unntak
av `FileUploadWithTag`-komponenten. Kun ett alternativ kan være forhåndsvalgt til enhver tid, og det er ikke mulig
å velge hvilket alternativ som skal være forhåndsvalgt basert på `value`-egenskapen til alternativet.
{{% /notice %}}

Med denne egenskapen kan du forhåndsvelge et svaralternativ. Den tar et heltall som argument, som er indeksen
til svaralternativet som skal være forhåndsvalgt. Indeksen starter på 0 for det første svaralternativet, 1 for det andre
osv.

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

I konfigurasjonen over vil "Blå" være forhåndsvalgt når komponenten vises. Brukeren kan fortsatt velge et annet
alternativ, og ettersom dette er en flervalgskomponent, kan brukeren også fjerne forhåndsvalget ved å klikke på
det forhåndsvalgte alternativet igjen.

Denne funksjonaliteten følger et sett med regler:

1. Dersom datamodellen allerede har en verdi for feltet, vil ikke forhåndsvalget bli satt.
2. Dersom en forhåndsvalgt verdi allerede har blitt satt tidligere (og f.eks. valgt bort), vil dette ikke skje igjen så
   lenge appen er åpen i nettleseren. Dersom brukeren laster siden på nytt, vil forhåndsvalget kunne bli satt igjen.
3. Forhåndsvalget settes med en gang siden har lastet og komponentene er klare, uavhengig av om komponenten vises
   på skjermen eller ikke.
4. Forhåndsvalgte verdier blir ikke satt for komponenter som er skjult ved hjelp av [dynamikk](../../../dynamics). Om
   komponenten senere blir vist igjen, vil forhåndsvalget kunne bli satt.
5. Det forhåndsvalgte alternativet blir bestemt etter [filtrering](../filtering), men før [sortering](../sorting) blir
   utført.


{{% notice warning %}}
Det finnes situasjoner hvor forhåndsvalg med denne egenskapen ikke er optimalt, og kan føre til
situasjoner som kan oppleves som feil:

1. Dersom et alternativ blir valgt, brukeren velger det bort igjen, og så laster skjemaet på nytt senere, vil forhåndsvalget
   bli satt igjen - selv om komponenten er på en side lenge før den brukeren ser på, og ikke vil se igjen.
2. Når skjemaet sendes inn via API-et vil forhåndsvalg satt med denne egenskapen ikke ha noen effekt. Denne egenskapen
   krever at skjemaet er åpent i nettleseren for å fungere.
3. Om skjemaet er i en tilstand hvor datamodellen ikke er skrivbar (f.eks. i PDF-generatoren), vil forhåndsvalget ikke
   setting av forhåndsvalgte verdier potensielt føre til feilmeldinger og mislykket innsending dersom datamodellen ikke
   allerede hadde en verdi.

Av disse grunnene anbefales det å bruke denne egenskapen med forsiktighet, og å vurdere et av de andre alternativene
for forhåndsvalg som er beskrevet over.
{{% /notice %}}