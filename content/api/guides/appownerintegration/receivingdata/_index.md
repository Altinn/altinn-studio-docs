---
title: Motta data fra Altinn Apps
linktitle: Motta data
description: Denne guiden beskriver i detalj hvordan man som applikasjonseier/tjenesteier kan motta data som rapporteres inn til en Altinn 3 applikasjon.
tags: [architecture, devops, todo]
toc: false
hidden: false
---

## Overordnet konsept

Altinn tilbyr en platform for utvikling og drift av digitale tjenester. 

Hvis tjenestene er av en slik art at sluttbruker (innbygger/næringsliv) skal rapportere inn data så vil disse data i utgangspunktet bli lagret i Altinn. 

Tjenesteeier må hente disse mottatte dataene fra Altinns datalager. Dette gjøres ved hjelp av API integrasjon.

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
3. Sluttbruker validerer data og eventuelle vedlegg og sender sender applikasjonsprosessen videre til bekreftelse
4. Sluttbruker ser over data og bekrefter at han er ferdig med prosessen
5. Applikasjon publiserer en hendelse om at sluttbruker er ferdig med utfyllingsprosess
6. Tjenesteeier mottar informasjon om hendelse på sitt hendelsesmottak
7. Tjenesteier kaller Altinn API for å laste ned data for instanse.
8. Tjenesteeier bekrefter at data er nedlastet ok

![Receving data](recevingdata.drawio.svg)

## Hva kreves teknisk

Utvikling av applikasjon er dekket i Guide for applikasjonsutvikling
Aktivering av publisering av hendelser fra applikasjon er beskrevet i guide.

Krav til webhook for mottak av events finner du [her](/)

Tjenesteeier må ha registert en integrasjon i Maskinporten. 

Opprettelse av integrasjon er beskrevet i Guide her.

## Detaljert teknisk prosess

### Autentisering mot maskinporten


Tjenesteeiersystem kaller Maskinporten API med korrekt Scopes for tjenesteier.

Dette er beskrevet i detaljer [her](/api/authentication/maskinporten/#tilgang-som-tjenesteeier)



1. Tjenesteeiersystem kaller Altinn autentisering for å konvertere maskinporten token til Altinn token
2. Tjenesteiersystem benytter Altinn token når den kaller Instance endepunkt i aktuell applikasjon. Retur er informasjon om instance og alle dataelementer. Eksempel
3. Tjenesteiersystem kaller endepunkt for hvert av dataelementene som skal lastes ned. Dette er typisk skjemadata samt eventuelle vedlegg
4. Tjenesteiersystem kaller endepunkt for å bekrefte data.


{{<children />}}
