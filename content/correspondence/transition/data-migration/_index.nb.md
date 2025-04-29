---
title: Migrering av Meldingsdata
linktitle: Datamigrering
description: Migrering av Meldingsdata for Altinn Melding
tags: []
toc: true
weight: 20
---

"Flytt av data"-prosjektet vil ta ansvar for å migrere alle historiske Meldinger og vedlegg til ny løsning.

- En automatisk jobb migrerer Meldinger og tilhørende vedlegg fra Altinn 2 til Altinn 3 ved bruk av et dedikert API-endepunkt.
- Den migrerte versjonen av et element vil ha en referanse til sin gamle Altinn 2 versjon, eksponert i feltet: "Altinn2CorrespondenceId" i CorrespondenceOverview endepunkt.
- Etter migrering vil elementene fremdeles være tilgjengelig i Altinn 2 API.
  - Men de er nå tilgjengelige på lik linje med andre Altinn 3 Meldinger;
    - Altinn 3 Melding API.
    - Dialogporten.
    - Arbeidsflate.
    - Visning i Altinn 2 Portal.
- Etter at migrering er utført vil endringer på Altinn 2-versjonen av elementet synkroniseres til Altinn 3 versjonen av elementet, **men ikke motsatt vei**.
- Ingen data saneres som resultat av migrering; Meldingene blir kun flagget i databasen, og det er mulig å utføre migrering på nytt og/eller hente ut data manuelt ved spesielle behov.

Migreringen vil foregå over tid, og man har fleksibilitet til å styre hvilke tjenester man migrerer for, og hvilke kriterier man har for å prioritere elementene.

## Volum og migreringsrate

Det er estimert over 500 millioner Meldinger med vedlegg som skal migreres fra Altinn 2 til Altinn 3.
Det er derfor planlagt at man vil gjøre migrering skånsomt, og starte med mindre volumer over tid for å sanke erfaring og unngå forstyrrelse av miljø.

Over tid vil man øke raten og til slutt kunne bli tilnærmet à jour med live trafikk i Altinn 2 mens det sakte reduseres og Altinn 2 tas ut av bruk.

## Kriterier for migrering

Migreringskomponenten vil per kjøring gjøre uttrekk av x antall elementer for alle tjenester, sortert etter eldste Melding først, men kan evt. ta nyeste.

## Migreringsprosess i detalj per element

Migreringsprosessen per Melding vil være delt opp i flere steg for å redusere risiko, og vil kunne styres per Melding, med mulighet for å slette data og starte prosessen på nytt.
Ingen data saneres fra Altinn 2.

1. Migrering av Meldingsdata og vedlegg fra Altinn 2 til Altinn 3, der vi ikke er avhengig av [tjenestekonfigurasjon](../service-migration/).
2. Migrering av nødvendig [tjenestekonfigurasjon](../service-migration/) og tilgangsrelger.
3. Migrerering av tilhørende instans- og tjenestedelgeringer.
4. Opprettelse av migrert Melding i Dialogporten / Arbeidsflate.

I starten vil steg 1,2 og 3 trigges manuelt som separate aksjoner av Flytt av data-teamet, og steg 4 trigges av Dialogporten/Arbeidsflate.

På sikt når man nærmer seg full produksjonssetting for alle komponenter, vil dette kunne håndteres automatisk i en og samme prosess for nye meldinger.

## Hvilke data blir migrert?

- Kun Meldinger som hverken er Arkiverte eller markert som slettet.
- Meldingsinnholdet, inkludert tekst og alle vedlegg og metadata.
- En begrenset form av varslingshistorikk: Tidspunkt og mottakeradresse, men ikke tekstinnhold.
- Endringshistorikk; inkludert åpning og lesebekreftelse og informasjon om videresending og instansdelegering.
- Altinn 2 CorrespondenceId og NotificationId som gjør det mulig å gjøre oppslag i Altinn 2 i tilfeller der man må gjøre mer detaljerte undersøkelser.
- Tjeneste og instans-delegeringer gjøres som et separat steg, se [egen dokumentasjon](../delegation-migration/).

## Synkronisering av statusendringer mellom Altinn 2 og 3

Det vil være en 1-veis synkronisering av statusendringer på Meldinger fra Altinn 2 til 3 etter at migrering er utført.

Eksisterende status/historikk blir migrert over i steg 1, men blir fortløpende synkronisert etterhvert som det inntreffer.

## Teknisk implementasjon

- Det lages et dedikert endepunkt i Altinn 3 Melding som kun gir tilgang til Migreringskomponenten; [MigrationController](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Controllers/MigrationController.cs).
- Det lages en Altinn 2 AltinnBatch-basert migreringskomponent "MigrateCorrespondence"
  - Konsumerer migreringsendepunktet.
  - Benytter konfigurasjon i Altinn 2 databasen for å styre migrering
  - Kan trigges manuelt med parametre, men vil over tid kjøre mer-eller-mindre kontinuerlig  
- Det opprettes en synkroniseringsjobb for å synkronisere status fra Altinn 2 til 3 for meldinger.
- Det opprettes et dedikert endepunkt i Altinn 3 Melding som gir Dialogporten tilgang til å hente ut migrerte elementer og trigge opprettelse av dialoger basert på dem, samt synliggjøre elementene i Altinn 3 API.

{{<children />}}
