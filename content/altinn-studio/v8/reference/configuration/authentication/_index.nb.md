---
title: Konfigurasjon av autentisering
linktitle: Autentisering
description: Konfigurer autentiseringsnivå og ID-provider for appen.
weight: 800
tags:
---
## Autentiseringsnivå

Påkrevd autentiseringsnivå settes i [XACML Policy](/nb/altinn-studio/v8/reference/configuration/authorization/) som obligation.

## ID-provider

Standardvalget for innlogging er ID-porten. Du kan konfigurere appen til å bruke en annen ID-provider (identitetsleverandør) ved å sette `AppOidcProvider`.

Når en bruker åpner en app som krever innlogging, og ikke allerede er innlogget, videresendes brukeren til Altinn Platform Authentication. Appen sender med den konfigurerte provideren i parameteren `iss`, for eksempel `iss=uidp`. Altinn Platform Authentication sender deretter brukeren til denne provideren for innlogging. Etter innlogging sendes brukeren tilbake til appen.

Innstillingen velger en provider som allerede er konfigurert og godkjent i Altinn Platform Authentication. Verdien er providerens identifikator, ikke en URL til en valgfri innloggingstjeneste. Dokumenterte alternativer er:

- [FEIDE](https://www.feide.no/)
- [UIDP](https://www.udir.no/verktoy/uidp/)

### Konfigurer appen

Åpne `App/appsettings.json` i appens repository, og legg til `AppOidcProvider` i den eksisterende `AppSettings`-seksjonen. Eksempelet under velger UIDP:

```json
{
  "AppSettings": {
    "AppOidcProvider": "uidp"
  }
}
```

Behold de øvrige innstillingene i filen og i `AppSettings`-seksjonen. Hvis `AppOidcProvider` ikke er satt eller er en tom streng, brukes standardvalget ID-porten.

Hvis provideren skal variere mellom miljøer, kan du sette innstillingen under `AppSettings` i `App/appsettings.Staging.json` for TT02 eller `App/appsettings.Production.json` for produksjon. Miljøspesifikke innstillinger overstyrer verdien i `App/appsettings.json`. Provideren må være tilgjengelig i det aktuelle miljøet. Se [Settings og miljøvariabler](/nb/altinn-studio/v8/reference/configuration/settings/).

Innstillingen tvinger ikke en bruker som allerede er innlogget til å logge inn på nytt hos den valgte provideren. Stateless-apper som tillater anonym tilgang, videresender heller ikke brukeren til innlogging ved åpning.

Les mer om oppsett av providere i Altinn Platform Authentication under [OIDC Providers](/nb/technology/architecture/capabilities/runtime/security/authentication/oidcproviders/).
