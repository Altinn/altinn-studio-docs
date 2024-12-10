---
title: Overgangsløsning
linktitle: Overgangsløsning
description: Overgangsløsning for Altinn Melding
tags: []
toc: true
weight: 60
---

# Overordnet strategi

For å forenkle overgangen fra Altinn 2 til Altinn 3 versjon av Melding-produktet, så har man fulgt en overordnet strategi som har hatt som mål å balansere kompleksitet og brukervennlighet for alle parter.

- Altinn 3 Melding har i stor grad lik datamodell som Altinn 2 for å muliggjøre mapping/migrering.
- Alle Altinn 2 Meldinger og vedlegg migreres inn i Altinn 3 Melding.
- Alle Altinn 2 Meldingstjenester med data blir opprettet som Altinn 3 Meldingstjenester.
- Man migrerer data/metadata i en prosess som også tilgjengeliggjør elementene i Dialogporten og Arbeidsflate.
- Migrering av historiske data vil ta tid (uker/måneder), og overgangsløsning bygges med dette i mente.
- Til slutt vil migrerings-jobben «ta igjen» Live/Ferske data, slik at elementene kan tilgjengeliggjøres i Altinn 3 kort tid etter at de var opprettet i Altinn 2.
- For å gjøre seg uavhengig av produksjonsdato for nye Arbeidsflate, så tilgjengeliggjøres Altinn 3 Meldinger i Altinn 2 Portal for sluttbrukere.
- Det lages IKKE overgangsløsning for API-endepunkter:
  - Sluttbrukersystemer og Tjenesteeiersystemer må opprettholde integrasjon mot både Altinn 2 og Altinn 3 i en overgangsperiode.

## Visning av Altinn 3 Melding i Altinn 2 Portal

For å raskt ha på plass en GUI-løsning for sluttbrukere uavhengig av leveransen av Arbeidsflate, utvides dagens Altinn 2 portal til å kunne hente ut og vise Altinn 3 Meldinger.

Dette muliggjør en tilsvarende brukeropplevelse for sluttbrukere som ikke mottar meldinger via sluttbrukersystem.

Visningen blir i stor grad lik som eksisterende visning av Altinn 2 meldinger, men med enkelte differanser.

- Ingen "Arkiver" knapp

### Tiltak for gradvis økning av last

For å redusere unødvendig last vil Altinn 2 portal kun kalle API-endepunktene til Altinn 3 Melding dersom en gitt bruker/virksomhet har data i Altinn 3 Melding.
Altinn 3 Melding kaller SBLBridge-komponenten og setter et internt flagg per bruker ##PartyHasAltinn3Messages## i Altinn 2 sin database når det opprettes meldinger.
Dette medfører en gradvis økning av trafikken på tvers, basert på om det er data tilgjengelig fra enten nye tjenester, eller migrerte meldinger.

## Migrering av tjenestekonfigurasjon

Altinns "Flytt av data"-prosjekt vil ta ansvar for å migrere all nødvendig konfigurasjon fra Altinn 2 til Altinn 3, og vil opprette dette på vegne av TjenesteEiere.

Grunnet en forenkling av tjenestekonfigurasjon i Altinn 3 for melding, består dette kun av:

- Opprette ressurs i Ressursregisteret basert på Altinn 2 tjenesten
  - Autorisasjonsregler / policy for tilgangstyring.

Det er enkelte nye metadata-felter som tjenestebeskrivelse på forskjellige språk som ikke automatisk vil kunne fylles ut, og som TE selv bør fylle ut i etterkant.

## Migrering av Meldingsdata og vedlegg

"Flytt av data"-prosjektet vil ta ansvar for å migrere alle historiske meldinger og vedlegg til ny løsning.

- En batch-basert jobb vil migrere meldinger og tilhørende vedlegg fra Altinn 2 til Altinn 3.
- Den migrerte versjonen av et element vil ha en referanse til sin gamle Altinn 2 versjon, eksponert i feltet: "Altinn2CorrespondenceId" i CorrespondenceOverview endepunkt.
- Etter migrering vil elementene ikke lenger være tilgjengelig i Altinn 2 API.
  - Men de er nå tilgjengelige på lik linje med andre Altinn 3 Meldinger; via Altinn 3 API, Dialogporten, Arbeidsflate, samt Altinn 2 Portal.
- Ingen data saneres; meldingene blir kun flagget i databasen, og det er mulig å utføre migrering på nytt og/eller hente ut data manuelt ved spesielle behov.

Migreringen vil foregå over tid, og man har fleksibilitet til å styre hvilke tjenester man migrerer for, og hvilke kriterier man har for å prioritere elementene.

### Kriterier for migrering

For å unngå behovet for å bygge kompleks logikk for synkronisering på tvers har man valgt å forenkle prosessen ved å la TjenesteEier definere et minimum tidsintervall "**migreringsventetid**" per tjeneste.

Ut fra analyse av bruken av meldinger, så skjer majoriteten av aktiviteten på en melding kun kort tid etter den er opprettet og kort tid etter tilknyttede varslinger og re-varslinger har gått ut.
For de fleste; innenfor 14 dager etter opprettelse.

Ved å utsette migrering til etter dette tidsrommet slipper man å ivareta kompleks logikk for å synkronisere endringer på meldingen som: lesebekreftelse, sletting og arkivering på tvers.

Etter hvert som sluttbrukere og sluttbrukersystemer har integrert seg mot Altinn 3 og bruker det som sin hoved-kanal, kan man redusere **migreringsventetiden** slik at elementene kan migreres få minutter etter opprettelse.

### Migreringsprosess i detalj per element

Migreringsprosessen vil være delt opp i flere steg for å redusere risiko, og vil kunne styres per melding, med mulighet for å slette data og starte prosessen på nytt.
Ingen data saneres fra Altinn 2.

1. Migrering av meldingsdata og vedlegg fra Altinn 2 til Altinn 3, der vi benytter tjenestekonfigurasjon opprettet [over](#migrering-av-tjenestekonfigurasjon).
2. Opprettelse av migrert melding i Dialogporten / Arbeidsflate.
3. Sperring av tilgang til Altinn 2-versjonen av elementet.

Ved migrering inkluderes statushistorikk inkludert varslingsinformasjon frem til tidspunktet migrering skjer.

I starten vil hvert av disse stegene trigges manuelt av Flytt av data-teamet, men på sikt når man nærmer seg full produksjonssetting for alle komponenter, vil det kunne håndteres automatisk i en og samme prosess.

### Synkronisering av statusendringer mellom Altinn 2 og 3

Det vil ikke være noe synkronisering av statusendringer på melding eller varslinger mellom de 2 løsningene etter at migrering er utført.

Eksisterende status/historikk blir migrert over i steg 1, og etter steg 3 sperres Altinn 2 elementet for flere endringer.

Dette for å unngå stor teknisk kompleksitet og avhengighet på tvers.

## Konsekvenser for partene

Her er en kort oppsummering av hvilke konsekvenser valgt overgangs- og migreringsløsning har for de forskjellige partene:

### Tjenesteeier

- Ved opprettelse av meldingen i API, blir meldingen opprettet i miljøet som kalles («hjemstedet» til elementet).
  - Dersom i A2 vil migrering skje til A3 etter **migreringsventetid**, men varsling vil fullføres i A2 uavhengig av migrering.
  - Dersom i Altinn 3, så vil meldingen være tilgjengelig i Altinn 2 Portalen.
- Sjekk av status på Melding opprettet i A2 må gjøres mot A2 og eventuelt deretter mot A3 etter migrering.
  - Siden migrering først utføres etter **migreringsventetid**, antas det at TE ikke trenger å sjekke for samme element i både A2 og A3, men at endringer av interesse allerede har skjedd i A2.
- Man må integrere seg mot Altinn 3 API for å opprette/følge opp nye meldinger der.
  - De kan bruke de migrerte tjenestene, eller etablere helt nye.

### Sluttbrukere

Via Altinn 2 portal:

- Får en full oversikt i Altinn portal av både Altinn 2 og 3 elementer.
- Når de åpner et Altinn 3 element vises dette i Altinn 2 Portalen, tilnærmet likt som for et Altinn 2 element.

Via Sluttbrukersystem:

- Får først opp Altinn 3 elementer når Sluttbrukersystem har integrert seg mot A3.

Via Arbeidsflate:

- Får opp meldingene som er opprettet i Altinn 3, samt de som er blitt migrert.
- Meldinger i Altinn 2 som ikke er blitt migrert, vil ikke være tilgjengelig.

### SluttbrukerSystem

- For å få full oversikt over elementer vil man måtte integrere seg mot både Altinn 2 og Altinn 3 API.
- Når elementer blir migrert fra A2 til A3 vil det mulig å identifisere dette ved at A3-elementet inneholder Altinn 2 Correspondence ID.
  - Dette gjør det mulig å utelukke evt. duplikater.
- Når elementet er migrert, så må SBS være integrert mot Altinn 3 API for å jobbe videre med det.
  - Men gitt at det migreres etter forventet aktiv tidsrom, burde det ikke være behov.

### Dialogporten og Arbeidsflate

- Altinn 2 elementer blir ikke tilgjengeliggjort før de er migrert, men migrering kan skje relativt raskt etter at de er opprettet i Altinn 2 (styrt av **migreringsventetid**).

{{<children />}}