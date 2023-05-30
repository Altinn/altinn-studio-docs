---
title: Tilgjengelighet
description: God tilgjengelighet hjelper mennesker med funksjonshemninger å oppfatte innholdet vårt på en meningsfull måte. Ved å bruke Altinn 3 får du mye på kjøpet, men noen ting må du fortsatt huske på selv. 
weight: 7
weight: 30
toc: true
---

Forskrift om universell utforming av IKT-løsninger stiller krav om at nettsider må oppfylle 35 av 61 suksesskriterier 
i standarden [Retningslinjer for tilgjengelig webinnhold (WCAG) 2.0](https://www.w3.org/Translations/WCAG20-no/). Sjekk 
ut [minimumskravene](https://www.uutilsynet.no/wcag-standarden/wcag-20-standarden/86) på UU-tilsynet som er omfattet 
av forskriften.
## Sjekkliste

- **Innholdsstruktur** Sjekk at du har en logisk struktur på overskrifter (H1 - H4), og at du ikke har noen tomme 
overskriftselementer. Det er fort gjort å glemme et nivå. For å oppdage feil i innholdstrukturen kan det være nyttig å 
benytte “Wave” som er et utvidelsesverktøy til chrome. [Last ned Wave til Chrome], installer og ikonet vil dukke opp 
øverst til høyre i nettleseren.

[Last ned Wave til Chrome]: https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh

- **Forklarende tekster og hjelpetekst** Sjekk at lenker, label og knapper har forklarende tekster. Ta en vurdering på 
om ekstra beskrivelser og hjelpetekster må kobles til input elementet.

- **Knapp vs lenke** Det er viktig at man er bevisst på om det blir brukt knapper eller lenker, da skjermlesere kan 
få problemer med å tolke funksjonaliteten. 

- **Feilmeldinger** Du er selv ansvarlig for at 
[korrekte feilmeldinger](../components/error-message/) 
blir lagt inn på hvert av skjemafeltene. 


{{% panel theme="warning" %}}
**NB:** Skal du lage tjenester i egen løsning, der Altinns grensesnitt er usynlig for brukeren, må du selv huske på å 
ta hensyn til øvrige [WCAG-krav](https://www.uutilsynet.no/wcag-standarden/nettsteder/711). 
{{% /panel %}}

## Hvordan teste
Det er viktig at dere tester at tjenesten deres er tilgjengelig for alle. Dette vil ikke bare hjelpe deres tjeneste, 
men det kan også belyse feil som har oppstått eller blitt oversett hos oss. Her er noen verktøy som kan brukes til 
å gjøre enkle tester.
### Tastaturnavigasjon
Sjekk at alle knapper og inputfelter kan nåes ved tastaturnavigasjon.

### Skjermleser
Gå gjennom flyten med en skjermleser som hjelpemiddel. Her kan du forsikre deg om at alt blir lest opp riktig og at 
tekstene er beskrivende nok. 

- **Mac:** VoiceOver er forhåndsinstallert på Apples mobiler og PCer. 
[VoiceOver Brukerveiledning](https://support.apple.com/no-no/guide/voiceover/welcome/mac)

- **Windows:** NVDA Screenreader er et gratis skjermleser verktøy laget av NV Access 
[Om NVDA Screenreader](https://www.nvaccess.org/about-nvda/)

## Kontrast

Følgende fargekombinasjoner som er brukt på Altinn oppfyller kravene til kontrast i liten tekst. AA er minstekravet, 
mens AAA er anbefalt, særlig for løpende tekst.

{{% colorcontrast %}}