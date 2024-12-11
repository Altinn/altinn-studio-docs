---
title: Migrering av tjenestekonfigurasjon
linktitle: Tjenestemigrering
description: Migrering av tjenestekonfigurasjon for Altinn Melding
tags: []
toc: true
weight: 10
---

Grunnet en forenkling av tjenestekonfigurasjon i Altinn 3 for Melding, består migrering i praksis bare av:

- Opprette ny ressurs i [Ressursregisteret](../../../authorization/what-do-you-get/resourceregistry) basert på Altinn 2 tjenesten
- Oversettelse av autorisasjonsregler til xacml-policy for tilgangstyring.
  - Merk at det er en forenkling av rettigheter for Melding mellom Altinn 2 og Altinn 3-versjonene.  

## Automatisk migrering av tjenestekonfigurasjon

Altinns "Flytt av data"-prosjekt vil ta ansvar for å migrere all nødvendig konfigurasjon for de Meldingstjenester som har data som skal migreres.
Prosjektet vil opprette dette på vegne av TjenesteEiere slik at det kan brukes til migrering av historiske Meldingsdata.

Den automatiske migreringen vil bruke de eksisterende Altinn 2-rollene spesifisert i de gamle autorisasjonsreglene, oversatt etter beste-innsats.
Disse rollene vil etter hvert bli faset ut til fordel for den nye [AccessLists](../../../authorization/what-do-you-get/resourceregistry/rrr/#access-lists)-funksjonaliteten, og det vil være et fremtidig prosjekt for å migrere alle policyer til den nye standarden i fremtiden, men dette er utenfor omfanget av Flytt av Data-prosjektet.

NB: Det er enkelte nye metadata-felter som tjenestebeskrivelse på forskjellige språk som ikke automatisk vil kunne fylles ut, og som TE selv bør fylle ut i etterkant.

## Manuell migrering av tjenestekonfigurasjon

Det vurderes en funksjon i Altinn studio som tjenesteeier kan benytte for å manuelt migrere en Meldingstjeneste-konfigurasjon.
Den vil i så fall følge samme mønster som kan benyttes for [Migrering av Lenketjenester](../../../authorization/what-do-you-get/resourceregistry/migration/)

## Teknisk implementasjon

- Altinn 2 SBLBridge-komponenten utvides med metode som mapper en angitt meldingstjeneste fra Altinn 2 til Altinn 3 tjenesteressurs.
- Det bygges en intern komponent i Altinn 2 kodebase som vil kjøre i Altinn 2 infrastruktur og som vil utføre migrering av tjenestekonfigurasjon for data-migreringsformål.
  Denne vil ikke tilgjengeligjøres for eksterne parter, men kun brukes av Flytt av data prosjektet.

{{<children />}}
