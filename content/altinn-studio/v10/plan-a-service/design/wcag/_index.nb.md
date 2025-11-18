---
title: Tilgjengelighet
description: God tilgjengelighet hjelper mennesker med funksjonshemninger å oppfatte innholdet på en meningsfull måte. Ved å bruke Altinn 3 får du mye på kjøpet, men noen ting må du fortsatt huske på selv.
weight: 30
toc: true
tags: [needsReview, translate-to-english]
---

Forskrift om universell utforming av IKT-løsninger stiller krav om at nettsider må oppfylle 35 av 61 suksesskriterier i standarden
[Retningslinjer for tilgjengelig webinnhold (WCAG) 2.0](https://www.w3.org/Translations/WCAG20-no/).

Sjekk ut [minimumskravene](https://www.uutilsynet.no/wcag-standarden/wcag-20-standarden/86) på UU-tilsynet som er omfattet av forskriften.
## Sjekkliste for tilgjengelighet

### Innholdsstruktur

Sjekk at du har en logisk struktur på overskrifter (H1–H4), og at du ikke har tomme overskriftselementer. Det er fort gjort å glemme et nivå.

For å oppdage feil i innholdstrukturen kan du bruke [Wave](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh), som er et utvidelsesverktøy til Chrome. Når du installerer det, dukker ikonet opp øverst til høyre i nettleseren.

### Forklarende tekster og hjelpetekst

Sjekk at lenker, ledetekster og knapper har forklarende tekster. Vurder om du må koble ekstra beskrivelser og hjelpetekster til inputelementet.

### Knapp eller lenke

Vær bevisst på om du bruker knapper eller lenker, da skjermlesere kan få problemer med å tolke funksjonaliteten.

### Feilmeldinger

Du er selv ansvarlig for at [korrekte feilmeldinger](/nb/altinn-studio/v8/guides/design/guidelines/components/error-message/) blir lagt inn på hvert skjemafelt. 


{{% panel theme="warning" %}}
**NB:** Skal du lage tjenester i egen løsning, der Altinns grensesnitt er usynlig for brukeren, må du selv ta hensyn til øvrige
[WCAG-krav](https://www.uutilsynet.no/wcag-standarden/nettsteder/711).
{{% /panel %}}

## Slik tester du tilgjengelighet

Test at tjenesten er tilgjengelig for alle. Dette hjelper ikke bare din tjeneste, men kan også belyse feil som har oppstått eller blitt oversett hos oss. Her er noen verktøy du kan bruke til å gjøre enkle tester.

### Tastaturnavigasjon

Sjekk at du kan nå alle knapper og inputfelter med tastaturnavigasjon.

### Skjermleser

Gå gjennom flyten med en skjermleser som hjelpemiddel. Her kan du forsikre deg om at alt blir lest opp riktig og at tekstene er beskrivende nok.

- **Mac:** VoiceOver er forhåndsinstallert på Apples mobiler og PCer.
  [VoiceOver Brukerveiledning](https://support.apple.com/no-no/guide/voiceover/welcome/mac)
- **Windows:** NVDA Screenreader er et gratis skjermleserverktøy laget av NV Access.
  [Om NVDA Screenreader](https://www.nvaccess.org/about-nvda/)

## Kontrast

Følgende fargekombinasjoner som brukes i Altinn oppfyller kravene til kontrast i liten tekst. AA er minstekravet, mens AAA er anbefalt, særlig for løpende tekst.

{{% colorcontrast %}}