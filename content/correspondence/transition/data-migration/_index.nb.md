---
title: Migrering av meldingsdata
linktitle: Datamigrering
description: Migrering av meldingsdata for Altinn Melding
tags: []
toc: true
weight: 20
---

"Flytt av data"-prosjektet vil ta ansvar for å migrere alle historiske meldinger og vedlegg til ny løsning.

- En automatisk jobb migrerer meldinger og tilhørende vedlegg fra Altinn 2 til Altinn 3 ved bruk av et dedikert API-endepunkt.
- Den migrerte versjonen av et element vil ha en referanse til sin gamle Altinn 2 versjon, eksponert i feltet: "Altinn2CorrespondenceId" i CorrespondenceOverview endepunkt.
- Etter migrering vil elementene fremdeles være tilgjengelig i Altinn 2 API.
- Etter at migrering er utført vil endringer på elementet synkroniseres begge veier slik at både Altinn 2 og Altinn 3 versjonen av elementet holdes à jour.
- Altinn 3 versjonen av det migrerte elementet vil umiddelbart etter migrering ha et internt flagg "IsMigrating" som holder det skjult fra å vises via de vanlige API-kallene.
- Når flagget "IsMigrating" fjernes, blir de migrerte meldingene tilgjengelige på lik linje med andre Altinn 3 Meldinger;
  - Altinn 3 Melding API.
  - Visning i Altinn 2 Portal.
  - Kan opprettes i Dialogporten/Arbeidsflate.
- Ingen data saneres som resultat av migrering; meldingene blir kun flagget i databasen, og det er mulig å utføre migrering på nytt og/eller hente ut data manuelt ved spesielle behov.

Migreringen vil foregå over tid, med muligheter for å re-migrere elementer på nytt.

## Volum og migreringsrate

Det er estimert over 500 millioner meldinger med vedlegg som migreres fra Altinn 2 til Altinn 3.
Det er derfor planlagt at man vil gjøre migrering skånsomt, og starte med lavere rate for å sanke erfaring og unngå forstyrrelse av miljø.

Over tid vil man øke raten og til slutt kunne bli tilnærmet à jour med live trafikk i Altinn 2 mens det sakte reduseres og Altinn 2 tas ut av bruk.

## Kriterier for migrering

Migreringskomponenten vil per kjøring gjøre uttrekk av x antall elementer for alle tjenester, sortert etter eldste melding først.

## Migreringsprosess i detalj per element

Migreringsprosessen per melding vil være delt opp i flere steg for å redusere risiko, og vil kunne styres per melding, med mulighet for å slette data og starte prosessen på nytt.
Ingen data saneres fra Altinn 2.

1. Migrering av meldingsdata og vedlegg fra Altinn 2 til Altinn 3, der vi ikke er avhengig av [tjenestekonfigurasjon](../service-migration/).
2. Migrering av nødvendig [tjenestekonfigurasjon](../service-migration/) og tilgangsregler.
3. Migrering av tilhørende instans- og tjenestedelegeringer.
4. Tilgjengeliggjøring av melding i Altinn 3 Melding API.
5. Opprettelse av migrert melding i Dialogporten/Arbeidsflate.

I starten vil steg 1,2 og 3 trigges manuelt som separate aksjoner av Flytt av data-teamet, og steg 4 og 5 trigges av Dialogporten/Arbeidsflate som én operasjon.

Inntil steg 4 er utført så er ikke den migrerte Altinn 3-versjonen av meldingen tilgjengelig via vanlige API-kall.
Inntil steg 5 er utført så er ikke den migrerte meldingen tilgjengelig via Dialogporten og Arbeidsflate.

På sikt når man nærmer seg full produksjonssetting for alle komponenter, vil dette kunne håndteres automatisk i en og samme prosess for nye meldinger.

### Tilgjengeliggjøring av melding i Altinn 3 Melding API og Dialogporten

Det vil være noen differanser i detaljene for disse stegene avhengig meldinger som regnes som "nye" kontra meldinger som er "historiske".

- For "historiske" meldinger, opprettes det ikke noen Altinn Events, da det skaper unødvendig støy.
- For "ferske" meldinger opprettes Altinn Events på samme måte som for meldinger som opprettes som nye i Altinn 3 Melding.

Dette så det blir mulig for SluttbrukereSystemer å konsumere de ferske migrerte meldingene via Altinn 3 API og Dialogporten så fort de er tilgjengelige.

## Hvilke data blir migrert?

- Kun meldinger som ikke er slettet (lagt i papirkurv eller permanent slettet)
- Ikke meldinger for døde personer.
- Meldingsinnholdet, inkludert tekst og alle vedlegg og metadata.
- En begrenset form av varslingshistorikk: Tidspunkt og mottakeradresse, men ikke tekstinnhold.
- Endringshistorikk; inkludert åpning og lesebekreftelse og informasjon om videresending og instansdelegering.
- Altinn 2 CorrespondenceId og NotificationId som gjør det mulig å gjøre oppslag i Altinn 2 i tilfeller der man må gjøre mer detaljerte undersøkelser.
- Tjeneste og instans-delegeringer gjøres som et separat steg, se [egen dokumentasjon](../delegation-migration/).

## Synkronisering av statusendringer mellom Altinn 2 og 3

Det vil være en 2-veis synkronisering av hendelser og statusendringer på meldinger mellom Altinn 2 og 3 etter at migrering er utført slik at dette holdes à jour.
Denne løsningen refereres til som "CorrespondenceSync".
Eksisterende status/historikk blir migrert over i steg 1, men blir fortløpende synkronisert etterhvert som det inntreffer.

Da det er noen differanser og tekniske begrensinger så består synkronisering av følgende hendelser:

### Hendelser som synkroniseres begge veier

- Åpnet / lest
- Bekreftet
- Permanent Sletting

### Hendelser som synkroniseres kun fra Altinn 2 til 3

- Arkivering
- Legg i papirkurv / fjern fra papirkurv
- Varsling sendt
- Videresending

## Teknisk implementasjon

- Det lages et dedikert endepunkt i Altinn 3 Melding som kun gir tilgang til Migreringskomponenten; [MigrationController](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Controllers/MigrationController.cs).
- Det lages en Altinn 2 AltinnBatch-basert migreringskomponent "MigrateCorrespondence"
  - Konsumerer migreringsendepunktet.
  - Benytter konfigurasjon i Altinn 2 databasen for å styre migrering
  - Kan trigges manuelt med parametre, men vil over tid kjøre mer-eller-mindre kontinuerlig  
- Det opprettes en synkroniseringsjobb "AltinnCorrespondenceSync" for å synkronisere statushendelser for meldinger fra Altinn 2 til 3.
  - Denne kaller dedikerte Sync-endepunkter i Altinn 3 Correspondence APIet
- I Altinn 3 Correspondence utvides handlere for "Åpnet", "Bekreftet" og "Permanent Sletting"
  - Disse kaller dedikerte "Sync"-endepunkter i Altinn 2 SBLBridge APIet

{{<children />}}
