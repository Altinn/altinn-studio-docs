---
draft: false
title: Automatisk opprydding
description: Slik fjernes ukjente svaralternativer automatisk fra datamodellen
weight: 100
tags: [needsReview, translate]
---

Noen svaralternativer for komponenter kan være dynamiske. Enten direkte via [dynamiske svaralternativer](/nb/altinn-studio/v8/guides/development/options/sources/dynamic/), [svaralternativer hentet fra en endrende datamodell](/nb/altinn-studio/v8/guides/development/options/sources/from-data-model/), eller ved [statiske svaralternativer](/nb/altinn-studio/v8/guides/development/options/sources/static/) hvor noen verdier kan være [filtrert](/nb/altinn-studio/v8/guides/development/options/functionality/filtering/) bort.

Når svaralternativene er dynamiske, kan datamodellen inneholde verdier som ikke lenger er gyldige. Dette kan skje hvis brukeren (eller forhåndsutfyllingen) har valgt et alternativ som ikke lenger er tilgjengelig. I slike tilfeller fjernes ukjente svaralternativer automatisk for å forhindre at datamodellen inneholder ugyldige verdier.

## Slik fungerer det

Når skjemaet lastes, hentes svaralternativene for alle komponenter og sammenlignes med verdiene i datamodellen. Selv om en komponent ikke er synlig (her mener vi at den er på en side som for øyeblikket ikke vises, _ikke_ at den er aktivt skjult via `hidden`-egenskapen), vil app-frontend fortsatt sjekke svaralternativene for den komponenten og fjerne eventuelle verdier som ikke er i svaralternativlisten.

Dette har noen implikasjoner som du bør være klar over:
- Hvis du konfigurerer flere komponenter som peker på det samme feltet i datamodellen, bør svaralternativene for alle disse komponentene være de samme. Hvis de ikke er det, vil feltet i datamodellen ryddes opp slik at det kun inneholder svaralternativene som er gyldige for alle komponentene.
- Hvis komponenten ikke er merket som `required`, kan brukeren sende inn skjemaet selv om verdien fjernes fra datamodellen. Hvis du vil sikre at brukeren velger et gyldig alternativ, bør du merke komponenten som påkrevd.

## Når det _ikke_ skjer

- Den automatiske oppryddingen av ukjente svaralternativer skjer for øyeblikket bare når skjemaet lastes via app-frontend, dvs. når brukeren åpner skjemaet i en nettleser.
- Automatisk opprydding skjer ikke når komponenten er merket som `hidden`. Derfor kan du også ha flere komponenter som peker på det samme feltet i datamodellen, hvor noen er skjulte og noen er synlige. I slike tilfeller vil bare de synlige komponentene ha svaralternativene sjekket og ryddet opp. Dette er også tilfellet hvis en komponent er skjult fordi den er på en skjult side, eller inne i en annen skjult komponent. Begrepet 'skjult' i denne sammenhengen refererer til [dynamiske uttrykk](/nb/altinn-studio/v8/guides/development/dynamics/) brukt for å skjule komponenter, ikke hvilke komponenter som for øyeblikket er synlige på siden.
- Fjerning av ukjente verdier skjer ikke for komponenten `FileUploadWithTag`.
- Fjerning av ukjente verdier skjer ikke for komponenter konfigurert med `renderAsSummary` satt til `true`.
