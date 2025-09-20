---
title: Beskyttede data
description: Ekstra tilgangskontroll for beskyttede datatyper
---

{{% notice info %}}
Tilgjengelig fra [v8.7.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v8.7.0)
{{% /notice %}}

## Hva er beskyttede data?
Beskyttede data er informasjon som krever ekstra tilgangskontroll, for eksempel personopplysninger eller konfidensiell/klassifisert informasjon.

Som standard trenger man handlingene `read` og/eller `write` for å få tilgang til applikasjonens data. [Policy.xml-filen](https://github.com/Altinn/app-template-dotnet/blob/main/src/App/config/authorization/policy.xml) er hovedkilden for reglene rundt autorisasjon, men rettigheter kan også [delegeres gjennom Altinn](/authorization/what-do-you-get/accessmanagement/#delegation-and-management-of-access-groups).

Hvis appen din inneholder data som krever ekstra beskyttelse, kan du bruke [applicationmetadata.json-filen](/api/models/app-metadata/#datatype) til å angi `actionRequiredToRead` og `actionRequiredToWrite` for spesifikke datatyper. Policyen må da inkludere disse handlingene, i tillegg til `read`/`write`, før brukere får tilgang til de beskyttede datatypene.

## Når bør jeg bruke dette?
Du bør legge til ekstra tilgangskontroller hvis appen din:
- Har flere brukere som ikke skal se hverandres data
- Samler inn sensitiv eller klassifisert informasjon om tredjeparter
- Inneholder data som kun skal være lesbare

## Les mer
- [Guide for konfigurasjon av beskyttede datatyper](/nb/altinn-studio/guides/development/restricted-data)
- [Mer om applicationmetadata.json](/nb/api/models/app-metadata/#complete-example)
- [Mer om autorisasjonspolicy og action attributter](/nb/altinn-studio/v8/reference/configuration/authorization/#action-attributter)