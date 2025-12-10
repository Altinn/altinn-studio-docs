---
title: Tilgjengelighet
description: God tilgjengelighet gjør at mennesker med funksjonsnedsettelser kan bruke digitale tjenester.  Med Altinn Studio får du mye gratis, men du har ansvar for innhold, testing og tilgjengelighetserklæring.
weight: 10
toc: true
tags: [needsReview, translate-to-english]
---

Forskrift om universell utforming av IKT-løsninger krever at tjenester i Altinn Studio følger [WCAG-standarden](https://www.uutilsynet.no/wcag-standarden/). Du må også lage og publisere en [tilgjengelighetserklæring](https://uustatus.no/). 

## Hva får du med Altinn Studio? 

Alle som har laget webløsninger vet at tilgjengelighet krever ekstra innsats. Med Altinn Studio får du: 

- **WCAG- og ELMER 3-standardene** – mange tekniske krav er automatisk oppfylt
- **Responsivt design** – tjenesten fungerer på ulike skjermstørrelser
- **Komponenter fra Felles Designsystem** – god brukeropplevelse er innebygd

Mye av det tekniske er håndtert for deg.  **Men du har ansvar for innholdet du lager.**

## Enkel sjekkliste for saksbehandlere

Du har ansvar for at innholdet i tjenesten din er tilgjengelig.  Sjekk disse punktene:

### 1. Overskrifter og struktur

**Sjekk dette:**
- Bruker du overskrifter (H1, H2, H3, H4) i riktig rekkefølge?
- Hopper du over nivåer (f.eks. fra H2 til H4)?
- Beskriver overskriftene innholdet godt?

**Hvorfor:** Skjermlesere bruker overskrifter til å navigere.  God struktur gjør det lettere å finne frem.  

**Verktøy:** [Wave](https://wave.webaim.org/) (Chrome-utvidelse) viser alle overskrifter og strukturfeil.

### 2. Lenker og knapptekster

**Sjekk dette:**
- Er alle lenker og knapper forklarende?
- Forstår du hva som skjer når du klikker? 

Unngå tekster som «Klikk her» eller «Les mer». 

**Hvorfor:** Skjermleserbrukere får ofte bare lenketeksten uten sammenheng. 

**Eksempel:**
- ❌ «Klikk her for mer informasjon»
- ✅ «Les mer om skattefradrag for pendlere»

### 3. Hjelpetekster og ledetekster

**Sjekk dette:**
- Har alle inputfelt tydelige ledetekster?
- Trenger brukeren ekstra hjelpetekst? 
- Er det klart hva som er obligatorisk?

**Hvorfor:** God veiledning reduserer feil.  Tjenesten blir lettere å bruke.

### 4. Feilmeldinger

**Sjekk dette:**
- Har du lagt inn forståelige feilmeldinger for alle felt?
- Forklarer feilmeldingen hva som er feil og hvordan det kan rettes?

**Hvorfor:** Brukere må få klar beskjed om hva som er galt.

**Eksempel:**
- ❌ «Feil format»
- ✅ «Fødselsnummer må være 11 siffer»

Les mer om [gode feilmeldinger](/nb/altinn-studio/v8/guides/design/guidelines/components/error-message/).

### 5. Knapp eller lenke? 

**Sjekk dette:**
- Bruker du knapper for handlinger?  (f.eks. «Send inn», «Lagre»)
- Bruker du lenker for navigasjon? (f.eks.  «Gå til side 2», «Les mer»)

**Hvorfor:** Skjermlesere og tastaturbrukere forventer ulik oppførsel fra knapper og lenker.

### 6. Kontrast

**Sjekk dette:**
- Er kontrasten god mellom tekst og bakgrunn? 
- Er viktige elementer tydelig synlige?  (knapper, ikoner)

**Hvorfor:** Svak kontrast gjør det vanskelig å lese.  Spesielt for personer med synshemming.

**Verktøy:** Bruk kontrastsjekken under: 

{{% colorcontrast %}}

### 7. Tastaturnavigasjon

**Sjekk dette:**
- Kan du bruke hele tjenesten med kun tastatur?  (Tab, Shift+Tab, Enter)
- Kommer du til alle knapper, lenker og inputfelt? 
- Ser du hvor du er?  (fokusmarkering)

**Hvorfor:** Mange brukere navigerer uten mus. De må kunne bruke tjenesten med tastatur.

**Slik tester du:** Legg bort musen.  Prøv å fylle ut hele skjemaet med kun tastatur.

### 8. Test med skjermleser

**Sjekk dette:**
- Blir innholdet lest opp i riktig rekkefølge? 
- Får du med deg alle overskrifter, ledetekster og feilmeldinger?
- Forstår du hva som skjer når du navigerer?

**Hvorfor:** Skjermleserbrukere får ikke med seg visuell informasjon. Alt må være tilgjengelig via lyd.

**Verktøy:**
- [VoiceOver](https://support.apple.com/no-no/guide/voiceover/welcome/mac) (Mac og iOS – innebygd)
- [NVDA](https://www.nvaccess.org/) (Windows – gratis)
- [Assistiv Labs](https://assistivlabs.com/) (tilgang til flere verktøy på nett)

**Tips:** Begynn enkelt. Test én side eller ett felt om gangen. 

## Mer omfattende testing

Har du gjort de enkle sjekkene?  Da kan du gå dypere med en fullstendig WCAG-sjekk. 

**Bruk UU-tilsynets guide:** [Minimumskrav for tilgjengelighet](https://www.uutilsynet.no/minimumskrav/)  
Her finner du alle 35 suksesskriteriene du må oppfylle.  Med forklaringer og eksempler. 

**Lag tilgjengelighetserklæring:** Når du har testet, dokumenter status og publiser en erklæring på [uustatus.no](https://uustatus.no/).  
Bruk vår [Excel-guide](EXCEL_GUIDE_LINK_HER) til å kartlegge og dokumentere. 

## Få hjelp og veiledning

Du trenger ikke gjøre dette alene. Vi tilbyr: 

- **Testlab for universell utforming på Økern i Oslo** – få praktisk hjelp til testing  
  [Les mer og book tid](https://www.digdir.no/tjenester/testlab-universell-utforming/2517)

- **Bistand fra teamet** – ta kontakt for gjennomgang og råd

{{% panel theme="info" %}}
**Viktig:**  
Lager du tjenester i egen løsning uten Altinns brukergrensesnitt?  Da må du forholde deg til alle [WCAG-kravene](https://www.uutilsynet.no/wcag-standarden/nettsteder/711) selv.
{{% /panel %}}

## Ressurser og lenker

### Veiledning og standarder
- [WCAG-standarden hos UU-tilsynet](https://www.uutilsynet.no/wcag-standarden/)
- [Minimumskravene hos UU-tilsynet](https://www.uutilsynet.no/minimumskrav/)
- [ELMER 3 – Etablering og forvaltning av løsninger med brukergrensesnitt](https://brukskvalitet.brreg.no/elmer3/)
- [Felles Designsystem](https://www.designsystemet.no/)

### Testing og verktøy
- [Wave verktøy](https://wave.webaim.org/) (Chrome-utvidelse for strukturtesting)
- [NVDA skjermleser](https://www.nvaccess.org/) (Windows, gratis)
- [VoiceOver brukerveiledning](https://support.apple.com/no-no/guide/voiceover/welcome/mac) (Mac/iOS)
- [Assistiv Labs testing](https://assistivlabs.com/) (samlet tilgang på nett)

### Tilgjengelighetserklæring
- [Tilgjengelighetserklæring på uustatus.no](https://uustatus.no/)
- [Excel-guide for tilgjengelighetserklæring](EXCEL_GUIDE_LINK_HER)

### Få hjelp
- [Testlab for universell utforming på Økern](https://www.digdir.no/tjenester/testlab-universell-utforming/2517)
- Kontakt oss for bistand med tilgjengelighetstesting

---

Har du spørsmål om universell utforming?  Ønsker du bistand med tilgjengelighetstesting? Ta kontakt! 