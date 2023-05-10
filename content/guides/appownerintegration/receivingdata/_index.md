---
title: Motta data fra Altinn Apps
linktitle: Motta data
description: Denne guiden beskriver i detalj hvordan man som applikasjonseier/tjenesteier kan motta data som innleveres til Altinn
tags: [architecture, devops, todo]
toc: false
---

## Overordnet konsept

Altinn tilbyr en platform for utvikling av tjenester og hosting av disse. Hvis tjenestene er av en slik art at sluttbruker (innbygger/næringsliv) skal rapportere inn data så vil disse data i utgangspunktet bli lagret i Altinn. 
Tjenesteeier må aktivt hente disse dataene. 

Denne guiden beskriver hvordan en slik integrasjon kan settes opp. 

## Om prosessflyt i applikasjoner

En applikasjon utviklet i Altinn studio kan ha forskjellige prosser avhengig av behovet til tjenesteeier. For en tjeneste som skal hente inn data vil man typisk ha minst et datasteg hvor sluttbruker får mulighet til å skrive inn data. 

I tilegg kan det f.eks være aktuelt med et bekreftelsteg hvor sluttbruker får mulighet til å se over data før man endelig bekrefter at de er korrekt.

For en slik tjeneste vil prosessen i selve appen være avsluttet i det sluttbruker trykker bekreft. Denne prosessen kan være del av en større prosess som tjenesteeier orkestrerer. 

## Instansiering av tjeneste

Instansiering betyr i Altinn sammenheng at det opprettes en dialog i en avgiver/parts innboks i Altinn.

Denne instansiering kan trigges av sluttbruker eller av tjenesteier. I denne guiden forutsetter vi at den er instansiert av sluttbruker. Guide for tjenesteeier instansiering finner du her (TODO).


## Overordnet prosess sluttbruker

Prosessen overordnet

1. Sluttbruker instansierer tjeneste i parts meldingsboks i Altinn. Dette kan gjøres via API eller fra browser på Altinn.no

2. Skjema fylles ut og eventuelle vedleggsdata lastes opp.

3. 




{{<children />}}
