---
title: Din kontaktinformasjon for virksomheten
description: Dette API-et gir mulighet til å administrere en brukers kontaktinformasjon for en virksomhet
weight: 40
---

## Hva er din kontaktinformasjon for virksomheten?
Dersom en bruker ønsker å få personlige varslinger på vegne av en virksomhet kan de velge å sette opp dette. Dette vil typisk være til en brukers eget telefon-nummer eller firma-e-post. Man kan sette opp begge deler, men kun en av hver.
Noen brukere ønsker å sette opp varslinger kun for enkelttjenester i altinn. Dette er det mulig å legge til i en liste over tjenester man ønsker varsel på kalt `resourceIncludeList`. Det er per i dag ikke mulig å filtrere ut enkelttjenester man *ikke* ønsker varsel på. 

## Hvordan bruker man API-et?
For å bruke API-et må man være en innlogget sluttbruker. Det er viktig at tilgangs-token som brukes inneholder userId for å indikere hvem som er innlogget bruker. 

I sti må man indikere hvilken aktør man ønsker å administrere adresser på vegne av. Denne identifiseres med `partUuid`. 