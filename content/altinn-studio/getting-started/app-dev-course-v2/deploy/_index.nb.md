---
title: Publiser tjenesten
description: Publiser tjenesten til et testmiljø
linktitle: Publiser tjenesten
tags: [apps, training, form, deploy, test]
weight: 40
toc: true
---

I denne modulen skal vi publisere tjenesten til et testmiljø for å kunne teste tjenesten ende-til-ende på samme måte
som en sluttbruker vil oppleve tjenesten.

{{% notice warning %}}
**OBS!** Testmiljø (og eventuelt produksjonsmiljø) er kun tilgjengelig for _organisasjoner_. Det vil ikke være mulig å 
publisere en tjeneste som er opprettet på vegne av egen bruker. Dersom du har opprettet tjenesten på egen bruker, 
kan du gå videre til neste modul.
{{% /notice %}}

### Temaer som dekkes i denne modulen
- Navigere til siden for publisering
- Tilgang til å publisere
- Bygge en versjon
- Publisere ønsket versjon til testmiljø

### Krav fra Sogndal kommune
Tjenesten må være tilgjengelig i testmiljø slik at tjenesten kan testes ende-til-ende.

## Navigere til publiserings-siden
1. Naviger til tjenestens publiserings-side ved å trykke på "Publiser"-knappen øverst i høyre hjørne.
2. Se at siden vises med 3 kolonner:
    - _Til venstre_: De forskjellige miljøene som er tilgengelig. Disse er: _Produksjon_ dersom organisasjonen har et
    et produksjonsmiljø, og _TT02_ som er organisasjonens testmiljø. Noen organisasjoner har flere testmiljø.
    - _I midten_: Oversikt over hvilke versjoner som er publisert til hvert miljø.  For en helt ny tjeneste vil det ikke
    vises noen historikk her før tjenesten faktisk er publisert.
    - _Til høyre_: Kolonne for å bygge en ny versjon av tjenesten, og oversikt over tidligere versjoner. 

## Tilgang til å publisere
Tilgang til å publisere en tjeneste settes opp av den som administrerer tilganger for din organisasjon. Dersom du ikke 
har tilgang til å publisere til et gitt miljø vil du få en melding som sier at 
`"Du har ikke rettigheter til å publisere til <ønsker miljø>. Tilgang kan delegeres av eiere i <din organisasjon>.`

Ta kontakt med den som administrerer tilganger for din organisasjon for å få tilgang til å publisere til testmiljø. 

## Bygge en version

1. Pass på at du har lastet opp alle endringer du har gjort på tjenesten til tjenestens sentrale filområde, ved å trykke
  på "Last opp dine endringer" i topp-menyen, og skrive inn en kort beskrivelse. Trykk så på "Valider endringer" for å 
  validere og laste opp alle endringer.
2. Skriv inn versjonsnavn i feltet "versjonsnummer", f.eks. `v1`.
3. Skriv inn en kort beskrivelse i feltet "Beskriv innholdet i versjonen", f.eks. `Første versjon av skjema`. 
4. Trykk på "Bygg versjon"

Se at versjonen dukker opp under "Tidligere bygg av applikasjonen" med en spinner som viser at byggingen er underveis. 
Versjonen er bygget ferdig når spinneren forsvinner og et grønt hake-ikon vises ved siden av "Bygglogg". Dette kan ta 1-2
minutter. 

## Publisere versjon til testmiljø
1. I kolonnen i midten på siden, i raden for TT02-miljøet, klikk på nedtrekkslisten "Velg versjon som skal publiseres".
2. Se at den versjonen som ble bygget i forrige steg nå ligger i listen. Klikk på denne for å velge den.
3. Klikk på "Publiser ny versjon" og klikk på "Ja" i dialogen for å bekrefte publiseringen. 
4. En ny rad dukker nå opp i oversikten over "Versjoner som er publisert til testmiljøet TT02". 
   - Denne raden er markert i blått, med en spinner i venstre kolonne og status "Publisering er satt i gang". 
5. Vent til spinneren forsvinner og raden blir markert med et grønt hake-ikon. Dette kan ta ca 1 minutt. 
6. Når tjenesten er publisert til miljøet vil både raden i tabellen "Versjoner som er publisert til testmiljøet TT02" og 
    miljøstatusen til venstre på siden bli markert i grønt. 
7. På miljøstatusen i venstre kolonne på siden vil du få en lenke til tjenesten i testmiljøet når publiseringen er fullført. Trykk på denne lenken.
8. Logg inn i testmiljøet ved å bruke Tenor testdata (Testbruker, velg "Hent tilfeldig bruker".)
9. Du kan nå teste tjenesten i testmiljøet TT02. Prøv å fylle ut tjenesten med noe data og send inn, og se hva som skjer!


### Nyttig dokumentasjon
- [Brukerveiledning - lag en enkel tjeneste](/nb/altinn-studio/user-guides/basic-form)

## Oppsummering

