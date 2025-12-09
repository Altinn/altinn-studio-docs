---
title: Access Token
linktitle: Access Token
description: Altinn bruker et ekstra access token når vi må autentisere applikasjoner eller kalle andre komponenter i Altinn-plattformen.
tags: [architecture, security, needstranslation]
toc: false
---

## AccessToken klient

.NET-applikasjoner bruker AccessToken-klienten når de skal kalle beskyttede API-er i Altinn-plattformen.

AccessToken-klienten har en [token-generator](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessTokenClient/Services/AccessTokenGenerator.cs)  
som genererer et JWT basert på et unikt sertifikat [tilgjengeliggjort](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessTokenClient/Services/SigningCredentialsResolver.cs) i Kubernetes-klyngene.

### Eksempler på bruk

- [App-mal som kaller register](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Infrastructure/Clients/Register/RegisterClient.cs)
- [App-mal som kaller Altinn Events](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Infrastructure/Clients/Events/EventsClient.cs)
- [Altinn Events-funksjon som kaller Altinn Events](https://github.com/Altinn/altinn-events/blob/main/src/Events.Functions/Clients/EventsClient.cs)

### Konfigurasjon

For å bruke AccessToken-klienten må du legge til følgende i `Program.cs`:

```c#
    // The Access Token service
    services.AddSingleton<IAccessTokenGenerator, AccessTokenGenerator>();
    // The Signing credential resolver that finds the correct certificate on disk
    services.AddTransient<ISigningCredentialsResolver, SigningCredentialsResolver>();
```

[Example from Altinn Events](https://github.com/Altinn/altinn-events/blob/main/src/Events/Program.cs)

## AccessToken

Plattformkomponentene bruker AccessToken for å beskytte API mot uautorisert bruk.

De benytter en [AltinnTokenValidator](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessToken/Services/AccessTokenValidator.cs) for å verifisere at en spesialheader inneholder et bearer-token.

Sertifikatet som brukes til validering hentes fra KeyVault via [SigningKeyResolver](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessToken/Services/SigningKeysResolver.cs).

Hver plattformklynge og app-klynge har sitt eget sertifikat.

### Konfigurasjon av AccessToken

Legg til følgende i `Program.cs` for å ta i bruk AccessToken:

```c#
    // The handler to validate token
    services.AddSingleton<IAuthorizationHandler, AccessTokenHandler>();
    // The resolver to get the certificate from KeyVault
    services.AddSingleton<ISigningKeysResolver, SigningKeysResolver>();

      services.AddAuthorization(options =>
    {
        // The policy to be used by API controllers
        options.AddPolicy("PlatformAccess", policy => policy.Requirements.Add(new AccessTokenRequirement()));
    });
```

[Example from register](https://github.com/Altinn/altinn-register/blob/main/src/Program.cs)

API-utvikleren kan konfigurere policyen for hvert endepunkt eller controller.

```c#
    [Authorize]
    [Authorize(Policy = "PlatformAccess")]
    [Route("register/api/v1/parties")]
    public class PartiesController : Controller
```

Eksempel fra [Register](https://github.com/Altinn/altinn-register/blob/main/src/Controllers/PartiesController.cs)
