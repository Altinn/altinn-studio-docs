---
title: Innhold i skjema
description: Forklar brukeren hva som skal til for å fylle ut skjemaet riktig og fordel innholdet i flere steg.
weight: 10
tags: [translate-to-english]
---

Brukeren skal ikke trenge å få feilmelding for å forstå hva som skal til for å fylle ut skjemaet riktig. Dette bør 
tydelig komme frem i informasjonstekst i begynnelsen av skjemaet og i labels som tilhører hvert enkelt skjemafelt. 

Som hovedregel bør man kun spørre om informasjon som er helt nødvendig å innhente. Du kan derfor opplyse i starten 
av skjemaet om at alle felt er påkrevde og må fylles ut (for å slippe å markere alle som påkrevde). Frivillige 
felt kan eventuelt markeres med "frivillig" i selve labelen til feltet.

### Fordel innholdet i flere steg og bruk sporvalg
En side med mye informasjon og flere oppgaver kan fort bli overveldende for en bruker. Prøv å del opp tjenesten 
slik at brukeren bare har en oppgave per side. Dette kan for eksempel være et spørsmål brukeren må svare på eller 
viktig informasjon som må leses. Dette kan gjøre det lettere for brukeren å fokusere på og forstå det du ber dem om.

Designet vi tilbyr nå er laget med utgangspunkt i dette konseptet. Et større antall komponenter kan føre til mye 
scrolling og en mer uoversiktlig opplevelse for brukeren. 
Se eksempel: [Starte enkeltpersonforetak](https://brg.apps.altinn.no/brg/anonym-oppstartsveilederen/).

Brukeren skal slippe å svare på mer enn nødvendig. Dersom brukeren har svart nei på et spørsmål og du dermed kan 
skjule flere av stegene for ham, kan du gjøre dette med 
[dynamisk sporvalg](https://altinn.github.io/docs/altinn-studio/app-creation/ux/sporvalg/).

### Disabled
Ved å vise skjemafelt som disabled forventer man at brukeren skal vite hvorfor de ikke kan bruke elementet, 
men dette er ikke alltid tilfellet. Noen brukerer forstår heller ikke at feltet er deaktivert, som igjen kan 
føre til forvirring. Bruk av disabled bør derfor unngås. Dersom en handlingen av en eller annen grunn ikke er 
tillatt, kan dette i stedet forklares i en informasjonstekst.

