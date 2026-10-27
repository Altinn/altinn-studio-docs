---
draft: true
title: Innstillinger i appsettings.json
linktitle: Innstillinger
description: Slik legger du inn innstillinger for appen og ser hvilke standardverdier som er endret i v9.
toc: true
tags: [needsReview]
---

Appen leser innstillinger på samme måte som andre ASP.NET Core-applikasjoner. Les mer om [konfigurasjon i ASP.NET Core hos Microsoft](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/).

## appsettings.json og filer for hvert miljø

`App/appsettings.json` gjelder i alle miljøer. I tillegg har appen én fil per miljø, som overstyrer verdiene i `appsettings.json`:

- `appsettings.Development.json` når du kjører appen lokalt
- `appsettings.Staging.json` i testmiljøet TT02
- `appsettings.Production.json` i produksjon

Legg dine egne innstillinger i en egen seksjon. Altinn bruker selv flere seksjoner, blant annet `Kestrel`, `AppSettings`, `GeneralSettings`, `PlatformSettings`, `PEPSettings`, `AccessTokenSettings`, `CacheSettings`, `kvSetting` og `ApplicationInsights`.

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}

```json
{
  "ExampleSection": {
    "ExampleValue": "Verdi som gjelder i alle miljøer"
  }
}
```

{{< code-title >}}
App/appsettings.Staging.json
{{< /code-title >}}

```json
{
  "ExampleSection": {
    "ExampleValue": "Verdi som bare gjelder i TT02"
  }
}
```

## appsettings.Local.json

`App/appsettings.Local.json` er for innstillinger som bare skal gjelde på din egen maskin. Appen leser filen sist, så verdiene overstyrer alle de andre filene. Filen står i `.gitignore`, så den havner ikke i repoet.

## Innstillinger med nye standardverdier i v9

Disse innstillingene under `AppSettings` er nå slått på som standard:

| Innstilling | Hva den gjør |
|---|---|
| `RequiredValidation` | Kontrollerer på serveren at felt som må fylles ut, er fylt ut. |
| `ExpressionValidation` | Kjører valideringer med uttrykk på serveren. |
| `RemoveHiddenData` | Fjerner data fra skjulte komponenter før oppgaven avsluttes. |
| `EnforceDataTypeTaskId` | Lar appen endre en datatype med `taskId` bare mens instansen er i den oppgaven. Andre forsøk får svaret `409 Conflict`. |

Er appen ikke klar for en av dem, setter du den til `false`:

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}

```json
{
  "AppSettings": {
    "RequiredValidation": false
  }
}
```

Vi fjerner `EnforceDataTypeTaskId` i neste hovedversjon.

## Innstillinger som er fjernet

Appen ignorerer disse innstillingene i v9. Du kan slette dem fra `appsettings.json`:

- `AppSettings`: `BaseResourceFolderContainer`, `DefaultBootstrapUrl`, `AppBasePath` og innstillingene for mapper og filnavn, for eksempel `UiFolder` og `ApplicationMetadataFileName`
- `MaskinportenSettings`, fordi plattformen gir appen Maskinporten-klienten
- `AppCodes`

`studioctl app upgrade v9` finner fjernede innstillinger.

## Funksjonsflagg

Funksjonsflagg står i seksjonen `FeatureManagement`. Hvert flagg må være `true` eller `false`. Appen starter ikke hvis et flagg har en annen verdi, for eksempel et filter med `EnabledFor`.

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}

```json
{
  "FeatureManagement": {
    "JsonObjectInDataResponse": true
  }
}
```

## Hemmeligheter og verdier for hvert miljø

- Passord, nøkler og andre hemmeligheter legger du i Azure Key Vault. Les mer på siden om [hemmeligheter]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/secrets" >}}).
- Innstillinger som Altinn setter når du publiserer appen, finner du på siden om [innstillinger for publisering]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/deployment" >}}).
