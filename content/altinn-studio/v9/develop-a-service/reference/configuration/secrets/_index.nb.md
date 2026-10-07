---
draft: true
title: Hemmeligheter
linktitle: Hemmeligheter
description: Slik gir du appen tilgang til hemmeligheter i Azure Key Vault
weight: 300
tags: [needsReview]
---

Hemmeligheter er opplysninger som appen trenger, men som ingen andre skal se, for eksempel API-nøkler og passord til tjenester appen kobler seg til. Du skal ikke lagre hemmeligheter i koden eller i app-repoet. Du lagrer dem i Azure Key Vault, og appen henter dem derfra når den kjører.

Plattformen tar seg selv av hemmelighetene til Maskinporten-klienten som Altinn setter opp for appen. Denne siden gjelder hemmeligheter som du som app-eier har ansvar for selv.

## Få tilgang til Key Vault

Du administrerer selv hemmelighetene som appen bruker, i Azure Key Vault. Slik bestiller du tilgang til ressursene til virksomheten din: [Tilgangsstyring for apper]({{< relref "/altinn-studio/v9/develop-a-service/reference/administration/access-management/apps" >}}).

## Gi appen tilgang til hemmelighetene

Appen trenger innstillingene for å koble seg til Key Vault. Disse ligger i en egen fil, og appen får bare tilgang til den hvis du legger den til i filen `deployment/values.yaml` i app-repoet. Det gjelder begge måtene å hente hemmeligheter på, som du finner lenger ned på siden.

Legg til `altinn-appsettings-secret` under både `volumeMounts` og `volumes`. Når du er ferdig, ser filen omtrent slik ut:

```yaml {hl_lines=[8,9,18,19,20]}
deployment:

  volumeMounts:
    - name: datakeys
      mountPath: /mnt/keys
    - name: accesstoken
      mountPath: "/accesstoken"
    - name: altinn-appsettings-secret
      mountPath: "/altinn-appsettings-secret"

  volumes:
    - name : datakeys
      persistentVolumeClaim:
        claimName: keys
    - name: accesstoken
      secret:
        secretName: accesstoken
    - name: altinn-appsettings-secret
      secret:
        secretName: altinn-appsettings-secret

  readiness:
    enabled: true

  liveness:
    enabled: true
```

{{% notice warning %}}
Pass på innrykkene i `values.yaml`. YAML krever mellomrom, ikke tabulator. Bruker du tabulator, blir filen ugyldig.
{{% /notice %}}

## Bruke hemmelighetene i appen

Du kan hente hemmelighetene på to måter:

- **Key Vault som konfigurasjonskilde (anbefalt):** Hemmelighetene blir en del av den vanlige konfigurasjonen til appen, og du leser dem med [Options-mønsteret](https://learn.microsoft.com/en-us/dotnet/core/extensions/options), på samme måte som innstillinger fra `appsettings.json`.
- **`ISecretsClient`:** Du henter én og én hemmelighet i koden der du trenger den.

### Alternativ 1: Key Vault som konfigurasjonskilde

Kall `AddAzureKeyVaultAsConfigProvider` i `App/Program.cs`, rett etter `ConfigureWebHostBuilder(builder.WebHost)`:

```csharp {hl_lines=["7-10"]}
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

ConfigureServices(builder.Services, builder.Configuration);

ConfigureWebHostBuilder(builder.WebHost);

if (!builder.Environment.IsDevelopment())
{
    builder.AddAzureKeyVaultAsConfigProvider();
}

WebApplication app = builder.Build();
```

Metoden ligger i navnerommet `Altinn.App.Api.Extensions`, som malen allerede tar med i `Program.cs`.

Rekkefølgen avgjør hvilken verdi som gjelder når samme innstilling finnes flere steder. `ConfigureWebHostBuilder` legger til andre konfigurasjonskilder, for eksempel miljøvariabler og `appsettings.Local.json`. Når du kaller `AddAzureKeyVaultAsConfigProvider` etterpå, er det verdiene fra Key Vault som gjelder.

Appen henter verdiene fra Key Vault på nytt hvert femte minutt. Mangler innstillingene for å koble seg til Key Vault, starter ikke appen. Det skjer for eksempel hvis du har glemt endringen i `values.yaml`.

### Alternativ 2: `ISecretsClient`

`ISecretsClient` henter én hemmelighet om gangen fra Key Vault. Du ber om tjenesten i konstruktøren til klassen der du trenger den, og kaller `GetSecretAsync` med navnet på hemmeligheten i Key Vault.

Eksempelet under fyller ut et felt i datamodellen med en hemmelighet når brukeren starter en ny instans:

```csharp
using Altinn.App.Core.Internal.Secrets;
using Altinn.App.Models.model; // Navnerommet til datamodellen din, vanligvis Altinn.App.Models.<modellnavn>
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Logic;

public class InstantiationProcessor : IInstantiationProcessor
{
    private readonly ISecretsClient _secretsClient;

    public InstantiationProcessor(ISecretsClient secretsClient)
    {
        _secretsClient = secretsClient;
    }

    public async Task DataCreation(Instance instance, object data, Dictionary<string, string>? prefill)
    {
        if (data is Skjema model)
        {
            model.etatid = await _secretsClient.GetSecretAsync("secretId");
        }
    }
}
```

`secretId` er navnet på hemmeligheten i Key Vault. `Skjema` og `etatid` er eksempler. Bytt dem ut med klassen og feltet i datamodellen din.

Registrer klassen i `RegisterCustomAppServices` i `App/Program.cs`:

```csharp
using Altinn.App.Logic;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.AddTransient<IInstantiationProcessor, InstantiationProcessor>();
}
```

## Kjøre appen lokalt

Når du kjører appen på egen maskin, kobler den seg ikke til Key Vault. Du legger i stedet inn testverdier lokalt. Bruk aldri ekte hemmeligheter fra produksjon.

### Med studioctl

Kjører du appen med studioctl, leser appen alle JSON-filer i hemmelighetsmappen som studioctl bruker for appen. Verdiene blir en del av konfigurasjonen, slik at begge alternativene over virker. Mappen ligger her:

- macOS: `~/Library/Application Support/altinn-studio/apps/{org}/{app}/secrets`
- Linux: `~/.config/altinn-studio/apps/{org}/{app}/secrets`
- Windows: `%APPDATA%\altinn-studio\apps\{org}\{app}\secrets`

Hvis du har satt miljøvariabelen `STUDIOCTL_HOME`, ligger mappen under den i stedet.

Eksempel på en fil i mappen, for eksempel `minehemmeligheter.json`:

```json
{
  "NetsPaymentSettings": {
    "SecretApiKey": "test-secret-key-used-for-documentation"
  },
  "secretId": "lokal testverdi"
}
```

Appen leser endringer i filene uten at du må starte den på nytt.

### Med user secrets (alternativ 1)

Du kan også bruke [user secrets](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets) i .NET. Kjør kommandoene i mappen `App`:

```bash
dotnet user-secrets init
dotnet user-secrets set "NetsPaymentSettings:SecretApiKey" "test-secret-key-used-for-documentation"
```

### Med `secrets.json` (alternativ 2)

Lokalt ser `ISecretsClient` først etter hemmeligheten i filen `App/secrets.json`, og deretter i konfigurasjonen til appen. Har du en hemmelighet med navnet `secretId` i Key Vault, ser filen slik ut:

```json
{
  "secretId": "lokal testverdi"
}
```

{{% notice warning %}}
App-malen hindrer ikke at `secrets.json` blir lagret i app-repoet. Legg til `secrets.json` i `.gitignore`, slik at filen ikke blir med når du lagrer endringene dine.
{{% /notice %}}
