---
title: Beskyttede data
description: Beskyttede data krever ekstra tilgangskontroll utover vanlig autorisasjon.
tags: [needsReview]
---

{{% notice info %}}
Tilgjengelig fra [v8.7.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v8.7.0)
{{% /notice %}}

## Beskyttede data i Altinn Studio

Beskyttede data er informasjon som krever ekstra tilgangskontroll utover vanlig autorisasjon. I denne artikkelen forklarer vi hva beskyttede data er, hvordan det fungerer, og når du bør bruke det.

### Hva er beskyttede data?

Beskyttede data er informasjon som krever ekstra tilgangskontroll, for eksempel personopplysninger eller konfidensiell/klassifisert informasjon.

Som standard trenger brukere handlingene `read` og/eller `write` for å få tilgang til applikasjonens data. [Policy.xml-filen](https://github.com/Altinn/app-template-dotnet/blob/main/src/App/config/authorization/policy.xml) er hovedkilden for reglene rundt autorisasjon, men rettigheter kan også [delegeres gjennom Altinn](/nb/authorization/what-do-you-get/accessmanagement/#delegering-og-administrasjon-av-tilgangspakker).

### Hvordan fungerer beskyttede data?

Hvis appen din inneholder data som krever ekstra beskyttelse, kan du bruke [applicationmetadata.json-filen](/nb/api/models/app-metadata/#datatype) til å angi `actionRequiredToRead` og `actionRequiredToWrite` for spesifikke datatyper.

Policyen må da inkludere disse handlingene, i tillegg til `read`/`write`, før brukere får tilgang til de beskyttede datatypene.

### Når bør du bruke dette?

Du bør legge til ekstra tilgangskontroller hvis appen din:
- Har flere brukere som ikke skal se hverandres data
- Samler inn sensitiv eller klassifisert informasjon om tredjeparter
- Inneholder data som kun skal være lesbare

### Les mer
- [Guide for konfigurasjon av beskyttede datatyper](/nb/altinn-studio/v8/guides/development/restricted-data/)
- [Mer om applicationmetadata.json](/nb/api/models/app-metadata/#complete-example)
- [Mer om autorisasjonspolicy og action-attributter](/nb/altinn-studio/v8/reference/configuration/authorization/#action-attributter)
