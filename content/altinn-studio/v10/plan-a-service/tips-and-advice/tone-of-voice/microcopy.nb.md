---
title: Tekster i tjenesten
description: Mikrotekster er små, viktige tekster som hjelper brukerne gjennom tjenesten.
weight: 5
tags: [needsReview, translate-to-english]
---

De små tekstene i en tjeneste som oppfordrer brukerne til å gjøre noe, kalles mikrotekster. Det kan være ledetekster i skjema, knappetekster, hjelpetekster og feilmeldinger. Mikrotekster er viktige fordi de veileder brukerne godt og raskt gjennom tjenesten.

## Slik skriver du gode mikrotekster

God mikrotekst skal

- være så kort som mulig
- oppmuntre brukeren til å fortsette
- bare være der når den trengs
- ikke kunne misforstås
- være konsekvent
- følge kravene til universell utforming

## Skriv kort og tydelig

Ledetekster i skjema kan være korte og rett frem. I stedet for «Oppgi fødselsnummeret ditt:» kan du skrive «Fødselsnummer:».

## Oppmuntre brukeren til å fortsette

Veiledningstekster som viser brukeren hvor langt de har kommet, gjør tjenesten mer brukervennlig.

- ✅ «Da er du snart i mål! Bekreft at du godtar betingelsene og velg Signer.»

## Lag gode ledetekster

Ledetekster i skjema skal være korte og tydelige. Hvis brukeren trenger informasjon om formatet, kan du enten

- samle ledetekst og format-informasjon: «Fødselsnummer, 11 siffer:»
- bruke en beskrivelse i komponenten: Ledetekst «Fødselsnummer:» med beskrivelse «11 siffer»

## Skriv så det ikke kan misforstås

God mikrotekst kan få brukerne til å fullføre en oppgave. Hvis du for eksempel ber om bekreftelse for å signere et dokument, må du forklare tydelig hva brukeren skal gjøre:

«Vil du signere søknaden med BankID? Legg og hold fingeren på feltet til du får bekreftelse på at signeringen er OK.»

## Vær konsekvent

Bruk samme ord for samme handling gjennom hele tjenesten. Hvis du har navigeringsknapper, bruk konsekvent **Forrige** og **Neste** – ikke bland inn «Fortsett» eller «Videre».

Knappenavn bør ha ett til tre ord, helst ikke mer.

## Universell utforming

### Plasser teksten rett

Som hovedregel bør mikroteksten plasseres foran feltet der brukeren skal gjøre noe. Dette sikrer en logisk rekkefølge for folk som bruker tastaturnavigasjon eller skjermleser. Utviklere kan også styre rekkefølgen på felter i koden.

Plasser aldri viktig informasjon under en bekreftelsesknapp. Hvis du vil at brukerne skal akseptere betingelser før de bekrefter, må teksten eller avkryssingsboksen komme før knappen. Ellers går folk som bruker skjermleser glipp av viktig informasjon.

### Vær tydelig fremfor morsom

Humor kan være fint, men må ikke gå på bekostning av klarhet. I en tjeneste for kjøp av bilforsikring kan en lastetekst som «Et øyeblikk, du kan straks kjøre videre!» bli misforstått når den leses opp av en skjermleser.

Bedre: «Vi henter siden, vennligst vent.»

### Skriv tydelige lenketekster

Lenketekster skal være forståelige også når de leses utenfor sammenhengen. Skriv hele setninger som lenketekst, ikke bare «klikk her» eller «les mer».

- ❌ For mer informasjon, klikk her
- ✅ Les mer om hvordan du fyller ut skjemaet

### All tekst skal være aktiv tekst

Mikrotekster må alltid være aktiv tekst i koden, aldri en del av et bilde. Hvis tekst er en del av et bilde, kan ikke skjermlesere lese den.

Husk også alt-tekst for bilder og ikoner som formidler informasjon.

## Tips til arbeidet med mikrotekster

- Les alltid teksten høyt for deg selv før du tar den i bruk.
- Still spørsmål ved tekstene i teamet.
- Bruk gjerne en skjermleser for å teste om du har fulgt kravene til universell utforming.
- Gjør tekst til et like viktig vurderingskriterium som design og kode.
