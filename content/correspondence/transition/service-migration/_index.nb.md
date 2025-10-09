---
title: Migrering av tjenestekonfigurasjon
linktitle: Tjenestemigrering
description: Migrering av tjenestekonfigurasjon for Altinn Melding
tags: []
toc: true
weight: 10
---

Grunnet en forenkling av tjenestekonfigurasjon i Altinn 3 for Melding, består migrering i praksis bare av:

- Opprette ny ressurs i [Ressursregisteret](../../../authorization/what-do-you-get/resourceregistry) basert på Altinn 2 tjenesten.
- Oversettelse av autorisasjonsregler til xacml-policy for tilgangstyring.
  - Merk at det er en forenkling av rettigheter for Melding mellom Altinn 2 og Altinn 3-versjonene.

## Automatisk migrering av tjenestekonfigurasjon for migrasjons-formål

Altinns "Flytt av data"-prosjekt vil ta ansvar for å migrere all nødvendig konfigurasjon for de Meldingstjenester som har data som skal migreres.
Prosjektet vil opprette dette på vegne av TjenesteEiere for å bruke dem til å styre tilgangen til historiske Meldingsdata.

- Disse "migreringsressursene" vil får en ressursId på følgende form: `<tjenesteeierkode>-migratedcorrespondence-<Altinn2-tjenestekode>-<Altinn2-tjenesteutgavekode>`.
- I tillegg vil flere beskrivende felt få et postfix slik at det kan skilles fra Altinn 2 versjonen av tjenesten, per nå er `- migrert fra Altinn 2` benyttet, men dette vurderes endret.

Migreringen av data er gjort uavhengig av oppsett av tjenestene, slik at datamigrering kan gjøres før dette må settes opp.

Den automatiske migreringen vil bruke de eksisterende Altinn 2-rollene spesifisert i de gamle autorisasjonsreglene, oversatt etter beste-innsats.
Disse rollene vil etter hvert bli faset ut til fordel for den nye [AccessLists](../../../authorization/what-do-you-get/resourceregistry/rrr/#access-lists)-funksjonaliteten, og det vil være et fremtidig prosjekt for å migrere alle policyer til den nye standarden i fremtiden, men dette er utenfor omfanget av Flytt av Data-prosjektet.

**Generelt sett er det _ikke_ ønskelig at tjenesteeiere endrer på de opprettede ressursene, eller bruker disse som nye meldingstjenester på Altinn 3. Men at ressursene forblir relativt uendret frem til migreringsprosessen er ferdig, og Altinn 2 skrus av. - Ett unntak vil være under endring til tilgangspakker.**

### Teknisk implementasjon

Det bygges en intern komponent i Altinn 2 kodebase som vil kjøre i Altinn 2 infrastruktur og som vil utføre migrering av tjenestekonfigurasjon til dette formålet.
Denne vil ikke tilgjengeliggjøres for eksterne parter, men kun brukes av Flytt av data prosjektet.

## Migrering av tjenestekonfigurasjon for reetablering av tjeneste

Det har blitt vurdert en funksjon i Altinn studio som tjenesteeier kan benytte for å manuelt migrere en Meldingstjeneste-konfigurasjon slik at man enkelt kan reetablere tjenesten i Altinn 3.
Dette kan følge samme mønster som benyttes for [Migrering av Lenketjenester](../../../authorization/what-do-you-get/resourceregistry/migration/)

Men dette er dessverre ikke blitt en prioritert funksjon på grunn av at det er meldt om få tjenester som skal reetableres, og det er lav kapasitet i relevante team.

Tjenesteeiere som skal re-etablere Altinn 2 Meldingstjenester som Altinn 3 Meldingstjenester, henvises derfor til å følge [vanlige skritt her](../../getting-started/developer-guides/serviceowner/).

Enkelte tjenesteeiere har uttrykt behov for å få en import av delegeringer fra gammel ressurs til ny, se [her](../delegation-migration/#manuell-import-av-delegeringer) for hvordan bestille dette.

{{<children />}}
