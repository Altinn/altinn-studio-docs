---
title: Migrering av Meldingsdata
linktitle: Datamigrering
description: Migrering av Meldingsdata for Altinn Melding
tags: []
toc: true
weight: 20
---

"Flytt av data"-prosjektet vil ta ansvar for å migrere alle historiske meldinger og vedlegg til ny løsning.

- En automatisk jobb migrerer meldinger og tilhørende vedlegg fra Altinn 2 til Altinn 3 ved bruk av et dedikert API-endepunkt.
- Den migrerte versjonen av et element vil ha en referanse til sin gamle Altinn 2 versjon, eksponert i feltet: "Altinn2CorrespondenceId" i CorrespondenceOverview endepunkt.
- Etter migrering vil elementene ikke lenger være tilgjengelig i Altinn 2 API.
  - Men de er nå tilgjengelige på lik linje med andre Altinn 3 Meldinger;
    - Altinn 3 Melding API.
    - Dialogporten.
    - Arbeidsflate.
    - Visning i Altinn 2 Portal.
- Ingen data saneres som resultat av migrering; Meldingene blir kun flagget i databasen, og det er mulig å utføre migrering på nytt og/eller hente ut data manuelt ved spesielle behov.

Migreringen vil foregå over tid, og man har fleksibilitet til å styre hvilke tjenester man migrerer for, og hvilke kriterier man har for å prioritere elementene.

## Volum og migreringsrate

Det er estimert over 500 millioner meldinger med vedlegg som skal migreres fra Altinn 2 til Altinn 3.
Det er derfor planlagt at man vi gjøre migrering skånsomt, og starte med mindre volumer over tid for å sanke erfaring og unngå forstyrrelse av miljø.

Over tid vil man øke raten og til slutt kunne bli tilnærmet ajour med live trafikk i Altinn 2 mens det sakte reduseres og Altinn 2 tas ut av bruk.

## Kriterier for migrering

For å unngå behovet for å bygge kompleks logikk for synkronisering på tvers har man valgt å forenkle prosessen ved å la TjenesteEier definere et minimum tidsintervall "**migreringsventetid**" per tjeneste.

Ut fra analyse av bruken av Meldinger, så skjer majoriteten av aktiviteten på en Melding kun kort tid etter den er opprettet og kort tid etter tilknyttede varslinger og re-varslinger har gått ut.
For de fleste; innenfor 14 dager etter opprettelse.

Ved å utsette migrering til etter dette tidsrommet slipper man å ivareta en kompleks løsning for å synkronisere endringer på meldingen som: åpning, lesebekreftelse og sletting på tvers.

Etter hvert som sluttbrukere og sluttbrukersystemer har integrert seg mot Altinn 3 og bruker det som sin hoved-kanal, kan man redusere **migreringsventetiden** slik at elementene kan migreres få minutter etter opprettelse.

Migreringskomponenten vil jobbe med en whitelist over hvilke tjenester som kan migreres, og vil per kjøring gjøre uttrekk av x antall elementer per tjeneste der:

- Alder er eldre enn **migreringsventetiden** satt på den aktuelle tjenesten.
- Sortert etter eldste Melding først, men kan evt. ta nyeste.

## Migreringsprosess i detalj per element

Migreringsprosessen per Melding vil være delt opp i flere steg for å redusere risiko, og vil kunne styres per Melding, med mulighet for å slette data og starte prosessen på nytt.
Ingen data saneres fra Altinn 2.

1. Migrering av Meldingsdata og vedlegg fra Altinn 2 til Altinn 3, der vi benytter [tjenestekonfigurasjon som er migrert](../service-migration/).
2. Opprettelse av migrert Melding i Dialogporten / Arbeidsflate.
3. Sperring av tilgang til Altinn 2-versjonen av elementet.

I starten vil hvert av disse stegene trigges manuelt av Flytt av data-teamet, men på sikt når man nærmer seg full produksjonssetting for alle komponenter, vil det kunne håndteres automatisk i en og samme prosess.

## Hvilke data blir migrert?

- Kun Meldinger som hverken er Arkiverte eller markert som slettet.
- Meldingsinnholdet, inkludert tekst og alle vedlegg og metadata.
- En begrenset form av varslingshistorikk: Tidspunkt og mottakeradresse, men ikke tekstinnhold.
- Endringshistorikk; inkludert åpning og lesebekreftelse.
- Altinn 2 CorrespondenceId og NotificationId som gjør det mulig å gjøre oppslag i Altinn 2 i tilfeller der man må gjøre mer detaljerte undersøkelser.

## Synkronisering av statusendringer mellom Altinn 2 og 3

Det vil **ikke** være noen form for synkronisering av statusendringer på melding eller varslinger mellom de 2 løsningene etter at migrering er utført.

Eksisterende status/historikk blir migrert over i steg 1, og etter steg 3 sperres Altinn 2 elementet for flere endringer, og er ikke lenger tilgjengelig eksternt. Data blir ikke slettet fra Altinn 2.

Dette for å unngå stor teknisk kompleksitet og avhengighet på tvers.

## Teknisk implementasjon

- Det lages et dedikert endepunkt i Altinn 3 Melding som kun gir tilgang til Migreringskomponenten; [MigrationController](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Controllers/MigrationController.cs).
- Det lages en Altinn 2 AltinnBatch-basert migreringskomponent "MigrateCorrespondence"
  - Konsumerer migreringsendepunktet.
  - Benytter konfigurasjon i Altinn 2 databasen for å styre migrering
  - Kan trigges manuelt med parametre, men vil over tid kjøre mer-eller-mindre kontinuerlig  

{{<children />}}
