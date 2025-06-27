---
title: Favoritter
description: Dette API-et gir mulighet til å administrere hvilke aktører som er registert som favoritter
weight: 20
---

## Hva er favoritter
Når en bruker er logget inn på altinn sin nettside vises det en oversikt over hvilke aktører en bruker kan representere.
For brukere med mange valg vil det kunne være hensiktsmessig å velge noen av disse som favoritter. Dette vil ikke gjøre noe annet enn å gi brukeren en snarvei til å velge denne aktøren. 

## Hvordan bruker man API-et?
For å bruke API-et må man være en innlogget sluttbruker. Det er viktig at tilgangs-token som brukes inneholder userId for å indikere hvem som er innlogget bruker. 

I sti for favoritter må man indikere hvilken aktør man ønsker å legge til eller slette. Denne identifiseres med `partUuid`. 