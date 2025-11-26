---
title: Innhold i skjema
description: Forklar brukeren hva som skal til for å fylle ut skjemaet riktig, og fordel innholdet i flere steg.
weight: 4
tags: [needsReview, translate-to-english]
---

{{< notice warning >}}
**Under arbeid** - Denne artikkelen er under oppdatering.
{{< /notice >}}

## Vær tydelig på hva brukeren skal gjøre

Brukeren skal ikke trenge å få feilmelding for å forstå hva som skal til for å fylle ut skjemaet riktig. Dette bør tydelig komme frem

- i informasjonstekst i begynnelsen av skjemaet
- i ledetekster som tilhører hvert enkelt skjemafelt

Som hovedregel bør du kun spørre om informasjon som er helt nødvendig å innhente. Du kan opplyse i starten av skjemaet om at alle felt er påkrevde og må fylles ut (for å slippe å markere alle som påkrevde). Frivillige felt kan eventuelt markeres med «frivillig» i selve ledeteksten til feltet.

## Fordel innholdet i flere steg og bruk sporvalg

En side med mye informasjon og flere oppgaver kan fort bli overveldende for brukeren. Prøv å dele opp tjenesten slik at brukeren bare har én oppgave per side. Dette kan for eksempel være

- et spørsmål brukeren må svare på
- viktig informasjon brukeren må lese

Dette gjør det lettere for brukeren å fokusere på og forstå det du ber dem om.

Designet vi tilbyr nå er laget med utgangspunkt i dette konseptet. Et større antall komponenter kan føre til mye scrolling og en mer uoversiktlig opplevelse for brukeren. Se eksempel:
[Starte enkeltpersonforetak](https://brg.apps.altinn.no/brg/anonym-oppstartsveilederen/).

Brukeren skal slippe å svare på mer enn nødvendig. Dersom brukeren har svart nei på et spørsmål og du dermed kan skjule flere oppfølgingsspørsmål (eller hele sider), kan du gjøre dette med
[dynamiske uttrykk](/nb/altinn-studio/v8/reference/logic/expressions/).

## Unngå deaktiverte felt

Ved å vise skjemafelt som deaktiverte («disabled») forventer du at brukeren skal vite hvorfor de ikke kan bruke elementet, men dette er ikke alltid tilfellet. Noen brukere forstår heller ikke at feltet er deaktivert, som igjen kan føre til forvirring.

Unngå derfor å bruke deaktiverte felt. Dersom en handling av en eller annen grunn ikke er tillatt, kan du i stedet forklare dette i en informasjonstekst.

