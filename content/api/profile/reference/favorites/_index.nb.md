---
title: Favoritter
description: Dette API-et gir mulighet til å administrere hvilke aktører som er registrert som favoritter
weight: 20
---

## Hva er favoritter
Når en bruker er logget inn på Altinns nettside vises det en oversikt over hvilke aktører en bruker kan representere.
For brukere med mange valg vil det kunne være hensiktsmessig å velge noen av disse som favoritter. Dette vil kun gi brukeren en snarvei til å velge denne aktøren. 

## Hvordan bruker man API-et?
I løsningen tilbys det endepunkter for å lese, legge til og fjerne favoritter. 
Alle tilgjengelige endepunkter krever autentisering. For å bruke API-et må man være en innlogget sluttbruker. Det er viktig at tilgangs-token som brukes inneholder userId for å indikere hvem som er innlogget bruker. 

I stien for favoritter må man indikere hvilken aktør man ønsker å legge til eller slette. Denne identifiseres med `partyUuid`, som må være en gyldig verdi og som brukeren må ha i sin aktørliste. 

### Respons-modell
```json
{
  "name": "__favoritter__",
  "isFavorite": true,
  "parties": ["uuid1", "uuid2"]
}
```

* **name** (string) Navnet på gruppen. For favoritter vil dette alltid være `__favoritter__`. 
* **isFavorite** (bool) Et flagg som indikerer at dette er listen over favoritter. 
* **parties** (Liste av GUID) En liste med partyUUid som er lagt til i favoritter. 
