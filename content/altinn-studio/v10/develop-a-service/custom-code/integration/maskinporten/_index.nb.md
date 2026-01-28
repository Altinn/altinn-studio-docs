---
draft: false
title: Integrere Altinn-app med Maskinporten
linktitle: Maskinporten
description: Hvordan sette opp en integrasjon mellom en Altinn-app og Maskinporten.
tags: [needsReview, needsTranslation]
weight: 100
toc: true
---

Denne veiledningen viser hvordan du setter opp en Altinn-app til å bruke den innebygde Maskinporten-klienten (`IMaskinportenClient`) for å utføre autoriserte forespørsler på vegne av eieren av appen, i stedet for den aktive brukeren.

For å sette dette opp må du:

1. [Sørge for at organisasjonen har tilgang til Azure Key Vault](#tilgang-til-azure-key-vault).
2. [Opprette en Maskinporten-integrasjon i selvbetjeningsportalen](#maskinporten-integrasjon).
3. [Lagre autentiseringsnøkkelen for integrasjonen i Azure Key Vault](#konfigurasjon-av-azure-key-vault).
4. [Sette opp appen til å bruke Maskinporten-klienten og hente hemmeligheter fra Azure Key Vault](#appoppsett).

## Tilgang til Azure Key Vault
Før du går videre med denne veiledningen, må du forsikre deg om at du har tilgang til Azure Key Vault for organisasjonen din. Dette sikrer at nøklene som opprettes senere i veiledningen kan lagres riktig som hemmeligheter i Azure.

Hvis tilgang mangler, se
[Tilgang til logger og hemmeligheter](/nb/altinn-studio/v10/develop-a-service/_temp/reference/administration/access-management/apps/).

## Maskinporten-integrasjon
I denne delen skal vi sette opp Maskinporten-klienten. En del av oppsettet inkluderer opprettelse av nøkler som senere skal lagres i Azure Key Vault. Hvis ulike personer i organisasjonen har tilgang til forskjellige ressurser som trengs i forbindelse med dette, anbefaler vi at dere samarbeider og utfører disse trinnene på samme maskin. På den måten unngår dere å sende hemmeligheter mellom personer og maskiner.

Når tilgang til å opprette hemmeligheter i Azure Key Vault er bekreftet, kan du fortsette med å opprette integrasjonen.

{{% expandlarge id="guide-mp-int-samarbeid" header="Veiledning om hvordan du registrerer en ny Maskinporten-integrasjon i Samarbeidsportalen" %}}
{{% insert "content/shared/maskinporten/maskinporten-client-create.nb.md" %}}
{{% /expandlarge %}}

## Konfigurere Azure Key Vault
Når appen forberedes til å bruke hemmeligheter fra Azure Key Vault, må du:

1. Legge til hemmelighetene som ble hentet under konfigurasjon av Maskinporten-klienten i Azure Key Vault:
    - Base64-kodet JWT offentlig og privat nøkkelpar
    - Klient-ID for integrasjonen

   Det er viktig at navnet på disse hemmelighetene i Azure Key Vault tilsvarer navnet på seksjonen i appsettings-filen i kodebasen til appen. For eksempel, hvis din appsettings-seksjon for Maskinporten-integrasjonen ser slik ut:

   {{< code-title >}}
   App/appsettings.json
   {{< /code-title >}}

   ```json
   {
     "MaskinportenSettings": {
       "Authority": "https://test.maskinporten.no/",
       "ClientId": "",
       "JwkBase64": ""
     }
   }
   ```

   Skal hemmelighetene i Azure Key Vault ha navn som dette:

   ```
   MaskinportenSettings--Authority
   MaskinportenSettings--ClientId
   MaskinportenSettings--JwkBase64
   ```
2. For at appen skal kunne lese hemmelighetene fra Azure Key Vault, må den konfigureres til å gjøre det. Se
[secrets-seksjonen](/nb/altinn-studio/v8/reference/configuration/secrets/) for å få dette til.
3. Legge til appsettings-eksempelet ovenfor i `appsettings.{env}.json`-filen.
{.floating-bullet-numbers}

_Merk: Hemmelighetene leses av appen ved oppstart, så hvis du gjør endringer etter at appen er publisert, må du publisere appen på nytt for at de skal tre i kraft._

## Appoppsett
Appen inkluderer automatisk den innebygde `IMaskinportenClient` som kan brukes i tjenestene dine.

### Konfigurasjonsstier
Klienten vil automatisk lete etter en Maskinporten-konfigurasjon på standardstien _"MaskinportenSettings"_. Hvis du ønsker å bruke en annen sti, kanskje fordi du administrerer flere apper og hver av dem trenger ulik autorisasjon, kan du konfigurere dette via `ConfigureMaskinportenClient`-metoden.

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false,hl_lines=5" >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  services.ConfigureMaskinportenClient("YourCustomMaskinportenSettingsPath");
}
{{< / highlight >}}

### Autorisere Http-klienter

Typede og navngitte Http-klienter kan autoriseres med de tilgjengelige utvidelsesmetodene, som illustrert nedenfor.

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false,hl_lines=6-7 10-11" >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  // For external APIs that require raw Maskinporten tokens
  services.AddHttpClient<CustomClient1>().UseMaskinportenAuthorization("scope1", "scope2");
  services.AddHttpClient("named-client1").UseMaskinportenAuthorization("scope1", "scope2");

  // For Altinn APIs that require Altinn tokens (exchanges Maskinporten token)
  services.AddHttpClient<CustomClient2>().UseMaskinportenAltinnAuthorization("scope1", "scope2");
  services.AddHttpClient("named-client2").UseMaskinportenAltinnAuthorization("scope1", "scope2");
}
{{< / highlight >}}

### Manuell bruk
Hvis du trenger å hente et Maskinporten-token manuelt, kan du bruke `IMaskinportenClient` i tjenesten din og hente tokens med `GetAccessToken`- og `GetAltinnExchangedToken`-metodene.

{{< highlight csharp "linenos=false,hl_lines=5-6" >}}
public class Example(IMaskinportenClient maskinportenClient) : IProcessTaskEnd
{
  public async Task End(string taskId, Instance instance)
  {
    var maskinportenToken = await maskinportenClient.GetAccessToken(["scope1", "scope2"]);
    var altinnExchangedToken = await maskinportenClient.GetAltinnExchangedToken(["scope1", "scope2"]);

    // Do something with the tokens...
  }
}
{{< / highlight >}}

### Key Vault-konfigurasjon

Til slutt må vi legge til Azure Key Vault-konfigurasjonsleverandøren til vår host. Dette gjøres ved å legge til den markerte koden _etter_ `ConfigureWebHostBuilder`-metoden.

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false,hl_lines=6-9" >}}
//...

ConfigureWebHostBuilder(IWebHostBuilder builder);

// Add Azure KV provider for TT02 & Prod environments
if (!builder.Environment.IsDevelopment())
{
  builder.AddAzureKeyVaultAsConfigProvider();
}
{{< / highlight >}}

## Bakoverkompatibilitet

{{% expandlarge id="bakoverkompatibilitet-expander" header="Vis detaljer" %}}

### IMaskinportenTokenProvider
Visse eldre tjenester krever en implementering av `IMaskinportenTokenProvider` for å hente tokens. `MaskinportenClient` vil automatisk registrere denne tjenesten hvis den ikke allerede er registrert andre steder.

### Altinn.ApiClients.Maskinporten
Hvis du trenger å støtte eksisterende bruk av den
[frittstående Maskinporten-klienten](https://github.com/Altinn/altinn-apiclient-maskinporten), mens du samtidig vil bruke den innebygde klienten for nye funksjoner, gir det vanligvis mening å utnytte én enkelt
[Azure Key Vault-konfigurasjon](#konfigurasjon-av-azure-key-vault).

Eksempelet nedenfor illustrerer hvordan du kan omforme et `Altinn.ApiClients.Maskinporten.Config.MaskinportenSettings`-objekt til formatet som kreves av den innebygde klienten.

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp  >}}
using Altinn.App.Core.Features.Maskinporten.Exceptions;
using LegacyMaskinportenSettings = Altinn.ApiClients.Maskinporten.Config.MaskinportenSettings;
// ...

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  var legacySettings =
    config.GetSection("Maskinporten-Config-Path").Get<LegacyMaskinportenSettings>()
    ?? throw new MaskinportenConfigurationException("Maskinporten settings not found in config.");

  services.ConfigureMaskinportenClient(options =>
  {
    options.ClientId = legacySettings.ClientId;
    options.JwkBase64 = legacySettings.EncodedJwk;
    options.Authority = legacySettings.Environment switch
    {
      "prod" => "https://maskinporten.no/",
      "test" => "https://test.maskinporten.no/",
      "dev" => "https://maskinporten.dev/",
      _ => throw new MaskinportenConfigurationException($"Unknown Maskinporten environment value {legacySettings.Environment}")
    };
  });

  // More information about the Maskinporten environment mapping:
  // https://github.com/Altinn/altinn-apiclient-maskinporten/blob/main/src/Altinn.ApiClients.Maskinporten/Services/MaskinportenService.cs#L343
}
{{< / highlight >}}

{{% notice warning %}}
Hvis du har [konfigurert MaskinportenSettings i Key Vault](#key-vault-konfigurasjon), må mappingen som er beskrevet i dette steget enten gjøres via forsinket utførelse eller _etter_ at Key Vault er lagt til som en options provider. Hvis konfigurasjonsdelegaten kjøres for tidlig, er ikke alle verdier lastet inn ennå.
{{% /notice %}}

{{% /expandlarge %}}

## Migreringsveier

{{% expandlarge id="migreringsveier-expander" header="Vis detaljer" %}}

I denne seksjonen finner du noen korte eksempler på hvordan du kan migrere din eksisterende konfigurasjon fra den
[frittstående Maskinporten-klienten](https://github.com/Altinn/altinn-apiclient-maskinporten) til den innebygde.

### Bruk av AddMaskinportenHttpClient
Følgende eksempel viser hvordan en `EventSubscriptionClient` tradisjonelt har blitt konfigurert, og hvordan du kan oppnå samme resultat ved å bruke den innebygde Maskinporten-klienten.

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp  >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  // Before: Altinn.ApiClients.Maskinporten client configuration
  services
    .AddMaskinportenHttpClient<SettingsJwkClientDefinition, EventsSubscriptionClient>(
      config.GetSection("Maskinporten-Config-Path"),
      clientDefinition =>
      {
        clientDefinition.ClientSettings.Scope = "altinn:serviceowner/instances.read";
        clientDefinition.ClientSettings.ExhangeToAltinnToken = true;
      }
    )
    .AddTypedClient<IEventsSubscription, EventsSubscriptionClient>();

  // After: Built-in client configuration
  services.ConfigureMaskinportenClient("Maskinporten-Config-Path");
  services
    .AddHttpClient<IEventsSubscription, EventsSubscriptionClient>()
    .UseMaskinportenAltinnAuthorization("altinn:serviceowner/instances.read");
}
{{< / highlight >}}

### Bruk av AddMaskinportenHttpMessageHandler
Følgende eksempel viser hvordan `Altinn.ApiClients.Dan` typisk har blitt konfigurert, og hvordan du kan oppnå samme resultat ved å bruke den innebygde Maskinporten-klienten.

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp  >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  // Before: Altinn.ApiClients.Maskinporten client configuration
  services.RegisterMaskinportenClientDefinition<SettingsJwkClientDefinition>(
    "client-name",
    config.GetSection("Maskinporten-Config-Path")
  );

  services
    .AddDanClient(config.GetSection("Dan-Config-Path"))
    .AddMaskinportenHttpMessageHandler<SettingsJwkClientDefinition>(
      "client-name",
      clientDefinition =>
      {
        clientDefinition.ClientSettings.Scope = "altinn:dataaltinnno";
      }
    );

  // After: Built-in client configuration
  services.ConfigureMaskinportenClient("Maskinporten-Config-Path");
  services
    .AddDanClient(config.GetSection("Dan-Config-Path"))
    .UseMaskinportenAuthorization("altinn:dataaltinnno");
}
{{< / highlight >}}

{{% /expandlarge %}}
