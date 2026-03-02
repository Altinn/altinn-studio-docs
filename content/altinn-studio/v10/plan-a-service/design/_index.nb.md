---
draft: true
title: Utforme en god tjeneste
weight: 1
tags: [needsReview, translate-to-english]
---

Tenk på brukerens reise gjennom skjemaet ditt og selve skjemaoppsettet, slik at tjenesten fungerer godt fra start til slutt.

## 1. Tenk på hvor brukeren starter

- Gi brukeren en tydelig inngang til tjenesten, gjerne en direkte lenke til skjemaet.
- Unngå mellomliggende sider som kan skape usikkerhet eller få brukeren til å tro at de har kommet feil.
- Gjør det klart at brukeren «kommer inn» i Altinn-tjenesten når de starter tjenesten.
  - Hvis tjenesten skal ligge i Altinn tjenestekatalog, må du huske på å lage en god og informativ "Om skjemaet"-side.
  - Hvis tjenesten tar i bruk Arbeidsflate, må du passe på at meldingsteksten som dukker opp i innboksen samsvarer med innholdet i tjenesten din, slik at brukerne får en helhetlig opplevelse.

{{% notice info %}}
**Kommer:** Bildeksempel på Altinn innboks og Tjenesteeieres nettsted.
{{% /notice %}}

## 2. Gi brukeren en god og trygg opplevelse

- Bruk første skjemaside som en introside for å gi en kort beskrivelse av hva tjenesten handler om og hva brukeren skal gjøre. Da sikrer du at brukeren får informasjonen de trenger i riktig kontekst.
- Oppgi gjerne hva de bør ha klart, slik at de slipper å stoppe underveis.
- Gi brukeren mulighet til å se svarene i en oppsummering før de sender inn, for å sjekke at informasjonen er korrekt.

{{% notice info %}}
**Kommer:** Lenke til hvordan bruke oppsummering i skjema.
{{% /notice %}}

{{% notice info %}}
**Kommer:** Bildeeksempel på oppbygning med infoside + innhold + oppsummering.
{{% /notice %}}

## 3. Strukturer skjemaet slik at det oppleves enkelt

- Del opp skjema i flere korte sideinndelinger, fremfor én lang side. Begrens antall felt per side til 4–6 felt per side, hvis mulig, og plasser feltene i én kolonne. Noen ganger kan vi sidestille felter som et unntak. Det gjelder for eksempel hvis feltene er korte og det gir mening å plassere dem i en kontekst (for eksempel når du bruker Adresse-komponenten der postnummer og by er sidestilte felter). (kilde [designsystem.gov.scot](https://designsystem.gov.scot/guidance/forms/form-structure) og [designsystem.gov.scot](https://designsystem.gov.scot/guidance/forms/form-design))

**Gjør slik:**

{{< figure src="/images/design-good-service/do-oppsett.png" alt="Eksempel på god layout med feltene i én kolonne" >}}

**Ikke gjør slik:**

{{< figure src="/images/design-good-service/dont-oppsett.png" alt="Eksempel på dårlig layout med feltene i to kolonner" caption="_Unngå å strukturere felter i kolonner ved siden av hverandre, hvis du kan._" >}}

- Still bare de spørsmålene du virkelig trenger. [Les mer om hvordan du lager gode spørsmål](../tone-of-voice/good-questions/).

- Bruk gode overskrifter for feltene og et tydelig språk som gjør det lett å forstå oppgaven. Strukturer sidene etter tema, slik at det er lett å følge flyten i bolker.

{{% notice info %}}
**Kommer:** Et eksempel på tydelige overskrifter i en god flyt.
{{% /notice %}}

- Vi anbefaler at du setter opp en navigasjonsmeny som viser hvor i skjemaet brukeren er. Det gjør det lettere for brukeren å se struktur og fremgang.

**Gjør slik:**

{{< figure src="/images/design-good-service/do-navigasjon.png" alt="Eksempel på god struktur med navigasjonsmeny" >}}

**Ikke gjør slik:**

{{< figure src="/images/design-good-service/dont-navigasjon.png" alt="Eksempel uten navigasjonsmeny" caption="_Gi punktene i navigasjonen gode navn, ikke bare Side 1, osv., slik at du lett kan se hva som er hvor._" >}}

## 4. Bruk våre standardkomponenter

- Bruk komponentene som er definert i Altinn Studio — da får du en konsekvent tjeneste som er tilgjengelig. Disse komponentene er basert på Designsystemet og blir vedlikeholdt.

{{% notice info %}}
**Kommer:** Du kan lese mer om komponentene og når og hvordan de skal brukes i en egen oversikt.
{{% /notice %}}

- Unngå å tilpasse komponentene for mye, med mindre det er helt nødvendig.

{{% notice warning %}}
**Merk!** Hvis du velger å tilpasse komponenter, kan vi ikke lenger garantere at de følger tilgjengelighetsprinsippene eller blir vedlikeholdt.
{{% /notice %}}

## 5. Test tjenesten før du publiserer den

- Test skjemaet med faktiske brukere, for å sjekke at innholdet er korrekt, at flyten fungerer, og at brukeropplevelsen er god. [Tips for brukertesting finner du her](../user-testing/).
- Du kan publisere tjenesten i testmiljøet vårt (TT02), for å dele tjenesten med andre.
