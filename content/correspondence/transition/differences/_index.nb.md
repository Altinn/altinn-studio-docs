---
title: Forskjeller mellom Altinn 2 og Altinn 3
linktitle: Forskjeller
description: Forskjeller mellom Altinn 2 og Altinn 3 for Melding
tags: []
toc: false
weight: 40
---

For å forenkle overgangen fra Altinn 2 til Altinn 3 versjon av Melding-produktet, så tok man utgangspunkt i datamodell og prosessflyt for Altinn 2 Melding, men med noe forenklinger og forbedringer.

## Her er en oversikt over de største endringene

- Altinn 3 Melding har i stor grad lik datamodell som Altinn 2 for å muliggjøre mapping og migrering.
  - ReplyOptions har blitt forenklet til å kun være URL+beskrivende tekst, da dette er fleksibelt nok til å dekke behovene de separate typene i Altinn 2 tilbød.
- Vedlegg lastes opp strømmet og i et separat steg før man lager meldingen.
  - Vedlegg kan deles på tvers av flere meldinger for å redusere databruk ved masseforsendelse av samme vedlegg til mange parter.
- API tilrettelegger for masseforsendelser av meldinger ved bruk av maler/keywords og mottakerlister samt nevnte delte vedlegg.
  - Gjør det enkelt å sende 1 request med liste av mottakere og få laget opp til 200 meldinger som resultat.
- Varslingsmaler har blitt kraftig forenklet fra Altinn 2; det støttes kun predefinerte maler som representerer "majoritetsbruk".
  - Trenger man mer avansert funksjonalitet oppfordres man til å integrere seg direkte med [Altinn-Notifications](../../../notifications/)
- Prosessen er mer asynkron enn før, men publiserer Altinn-Events ved viktige prosess-steg slik at både sluttbruker-systemer som henter Meldinger for brukere, og avsender av Meldingene kan følge løpet uten å måtte polle webservicer for status.
- Alle Meldinger blir opprettet i Dialogporten og dermed tilgjengelig for Arbeidsflate og andre systemer som integreres seg mot Dialogporten, uten at avsender av Meldingene trenger å utføre bestemte aksjoner.

{{% notice warning  %}}
Denne delen av dokumentasjonen er under utarbeidelse.
{{% /notice %}}

{{<children />}}
