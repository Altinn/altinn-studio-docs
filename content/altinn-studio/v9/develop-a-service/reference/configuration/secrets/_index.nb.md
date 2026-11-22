---
title: Hemmeligheter
linktitle: Hemmeligheter
description: Slik gir du appen tilgang til hemmeligheter i Azure Key Vault
weight: 300
tags: [needsReview]
---

Hemmeligheter er opplysninger som appen trenger, men som ingen andre skal se, for eksempel API-nøkler og passord til tjenester appen kobler seg til. Du skal ikke lagre hemmeligheter i koden eller i app-repoet. Du lagrer dem i Azure Key Vault, og appen henter dem derfra når den kjører.

Plattformen tar seg selv av hemmelighetene til Maskinporten-klienten som Altinn setter opp for appen. Denne siden gjelder hemmeligheter som du som app-eier har ansvar for selv.

## Få tilgang til Key Vault

Du administrerer selv hemmelighetene som appen bruker, i Azure Key Vault. [Les hvordan du bestiller tilgang til hemmelighetene for appene til virksomheten din]({{< relref "/altinn-studio/v9/manage-a-service/access-management/apps" >}}).

## Gi appen tilgang til hemmelighetene

Appen trenger innstillingene for å koble seg til Key Vault. Disse ligger i en egen fil, og appen får bare tilgang til den hvis du kobler den til appen i `deployment/values.yaml` i app-repoet. Det gjelder begge måtene å hente hemmeligheter på, som du finner lenger ned på siden.

Legg til `altinn-appsettings-secret` under både `volumeMounts` og `volumes`. Når du er ferdig, ser filen omtrent slik ut:

{{< code-title >}}
deployment/values.yaml
{{< /code-title >}}

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

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

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

Navnet på hemmeligheten i Key Vault bestemmer hvilken innstilling den blir. Key Vault tillater ikke kolon i navn, så du skriver to bindestreker der innstillingen har kolon. Hemmeligheten `MinTjeneste--ApiKey` i Key Vault blir innstillingen `MinTjeneste:ApiKey` i appen.

Rekkefølgen avgjør hvilken verdi som gjelder når samme innstilling finnes flere steder. `ConfigureWebHostBuilder` legger til andre konfigurasjonskilder, for eksempel miljøvariabler og `appsettings.Local.json`. Når du kaller `AddAzureKeyVaultAsConfigProvider` etterpå, er det verdiene fra Key Vault som gjelder.

Appen henter verdiene fra Key Vault på nytt hvert femte minutt. Om en endret verdi tar effekt uten at du starter appen på nytt, avhenger av hvordan koden leser den. Kode som leser innstillingen med `IOptions<T>`, ser bare verdien fra da appen startet.

Mangler innstillingene for å koble seg til Key Vault, starter ikke appen. Det skjer for eksempel hvis du har glemt endringen i `values.yaml`.

### Alternativ 2: `ISecretsClient`

`ISecretsClient` henter én hemmelighet om gangen fra Key Vault. Du ber om tjenesten i konstruktøren til klassen der du trenger den, og kaller `GetSecret` med navnet på hemmeligheten i Key Vault.

Eksempelet under henter en API-nøkkel fra Key Vault og sender den med når appen henter data fra et eksternt system. Nøkkelen havner bare i forespørselen til det eksterne systemet, ikke i dataene i appen:

```csharp {hl_lines=[18,21]}
using Altinn.App.Core.Internal.Secrets;

namespace Altinn.App.Logic;

public class MinTjenesteKlient
{
    private readonly HttpClient _httpClient;
    private readonly ISecretsClient _secretsClient;

    public MinTjenesteKlient(HttpClient httpClient, ISecretsClient secretsClient)
    {
        _httpClient = httpClient;
        _secretsClient = secretsClient;
    }

    public async Task<string> HentStatus()
    {
        string apiKey = await _secretsClient.GetSecret("secretId");

        using var request = new HttpRequestMessage(HttpMethod.Get, "https://api.eksempel.no/status");
        request.Headers.Add("X-Api-Key", apiKey);

        using HttpResponseMessage response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
}
```

`secretId` er navnet på hemmeligheten i Key Vault. Adressen og `X-Api-Key` er eksempler. Bruk adressen og formatet som systemet du kobler deg til, krever.

{{% notice warning %}}
Ikke legg hemmeligheter i datamodellen. Det som står i datamodellen, kan brukeren se, og Altinn lagrer det sammen med instansen.
{{% /notice %}}

Registrer klassen i `RegisterCustomAppServices` i `App/Program.cs`. `AddHttpClient` gir klassen en egen `HttpClient`:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp
using Altinn.App.Logic;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.AddHttpClient<MinTjenesteKlient>();
}
```

Deretter kan du be om `MinTjenesteKlient` i konstruktøren til klassen som skal bruke dataene fra det eksterne systemet.

## Kjøre appen lokalt

Når du kjører appen på egen maskin, kobler den seg ikke til Key Vault. Du legger i stedet inn testverdier lokalt. Bruk aldri ekte hemmeligheter fra produksjon.

I v9 får appen oppsettet for lokal kjøring fra `studioctl`. Det gjelder både når du starter appen med `studioctl app run`, og når du starter den med `dotnet run` eller fra et utviklingsverktøy. Starter du appen uten `studioctl app run`, må appen kjøre i miljøet `Development`, og `studioctl` må være installert slik at kommandoen `studioctl` virker i terminalen. App-malen kjører appen i `Development` som standard. [Les hvordan du installerer og bruker `studioctl`]({{< relref "/altinn-studio/v9/getting-started/development/localtest/local-dev" >}}). Du kan legge inn testverdiene på tre måter.

### I hemmelighetsmappen til `studioctl`

Appen leser JSON-filene i hemmelighetsmappen som `studioctl` bruker for appen, og verdiene blir en del av konfigurasjonen. Det virker for begge alternativene over. Mappen ligger her:

- macOS: `~/Library/Application Support/altinn-studio/apps/{org}/{app}/secrets`
- Linux: `~/.config/altinn-studio/apps/{org}/{app}/secrets` (eller under `$XDG_CONFIG_HOME/altinn-studio` hvis du har satt miljøvariabelen `XDG_CONFIG_HOME`)
- Windows: `%APPDATA%\altinn-studio\apps\{org}\{app}\secrets`

Hvis du har satt miljøvariabelen `STUDIOCTL_HOME`, ligger mappen under den i stedet.

Eksempel på en fil i mappen, for eksempel `minehemmeligheter.json`:

{{< code-title >}}
{studioctl-home}/apps/{org}/{app}/secrets/minehemmeligheter.json
{{< /code-title >}}

```json
{
  "MinTjeneste": {
    "ApiKey": "lokal testverdi"
  },
  "secretId": "lokal testverdi"
}
```

Endrer du en fil som fantes da appen startet, leser appen endringen uten omstart. Samme forbehold om `IOptions<T>` gjelder som for Key Vault. Legger du til en ny fil, må du starte appen på nytt.

`studioctl` legger selv filen `app-codes.json` i mappen, og `maskinporten-settings.json` hvis du setter opp en Maskinporten-klient med `studioctl app maskinporten set`. Ikke endre disse filene. Appen leser dem ikke som vanlig konfigurasjon.

### Med brukerhemmeligheter i .NET (user secrets)

Du kan også bruke [brukerhemmeligheter i .NET](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets). Kjør kommandoene i mappen `App`:

```bash
dotnet user-secrets init
dotnet user-secrets set "MinTjeneste:ApiKey" "lokal testverdi"
dotnet user-secrets set "secretId" "lokal testverdi"
```

Verdiene blir en del av konfigurasjonen. `ISecretsClient` finner dem også, så lenge navnet er det samme som navnet du sender til `GetSecret`.

### Med `secrets.json` (alternativ 2)

Lokalt ser `ISecretsClient` først etter hemmeligheten i filen `secrets.json` i mappen appen kjører fra, og deretter i konfigurasjonen til appen. Når du starter appen med `studioctl app run` eller `dotnet run`, er det mappen `App`. Har du en hemmelighet med navnet `secretId` i Key Vault, ser `App/secrets.json` slik ut:

{{< code-title >}}
App/secrets.json
{{< /code-title >}}

```json
{
  "secretId": "lokal testverdi"
}
```

{{% notice warning %}}
App-malen hindrer ikke at `secrets.json` blir lagret i app-repoet. Legg til `secrets.json` i `.gitignore`, slik at filen ikke blir med når du lagrer endringene dine. Blir filen lagret i app-repoet, blir den også med i appen når du publiserer den.
{{% /notice %}}
