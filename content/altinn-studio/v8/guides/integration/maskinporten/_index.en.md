---
title: Integrate an Altinn app with Maskinporten
linktitle: Maskinporten
description: How to setup an integration between an Altinn App and Maskinporten.
weight: 100
toc: true
aliases:
- /app/maskinporten-app-integration/
- /altinn-studio/guides/integration/maskinporten-app-integration
---

This guide shows how to set up an Altinn app to make authorised requests with Maskinporten on behalf of the app owner, as opposed to the active user.

{{% insert "content/shared/maskinporten/altinn-studio-scope-setup.en.md" %}}

## Legacy manual setup

The following manual setup is only needed for legacy apps or special cases where Altinn Studio should not provision the Maskinporten client.

{{% insert "content/shared/maskinporten/altinn-studio-scope-migration.en.md" %}}

{{% expandlarge id="legacy-manual-maskinporten-setup" header="Show manual setup with Samarbeidsportalen and Azure Key Vault" %}}

### Azure Key Vault Access

Before proceeding with the manual setup, make sure you have access to Azure Key Vault for your organization.
This ensures that the keys created further on in the guide can be stored properly as secrets in Azure.

If access is missing, please refer to [Access to logs and secrets](/en/altinn-studio/v8/guides/administration/access-management/apps/).

### Maskinporten Integration

When access to creating secrets in Azure Key Vault is confirmed, create the integration manually.

{{% expandlarge id="guide-mp-int-samarbeid" header="Guide on how to register a new Maskinporten integration in Samarbeidsportalen" %}}
{{% insert "content/shared/maskinporten/maskinporten-client-create.en.md" %}}
{{% /expandlarge %}}

### Azure Key Vault Configuration

When preparing the application to use secrets from Azure Key Vault, there are some steps that need to be done:

1. Add the secrets retrieved during the Maskinporten client configuration to Azure Key Vault:
   - The base64 encoded JWT public and private key pair
   - The client ID for the integration

It is important that the name of these secrets in Azure Key Vault corresponds with the name of the section in the
appsettings file in the application repository. E.g. if your appsettings section for the Maskinporten integration section looks like this:

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

The secrets in Azure Key Vault should have names like this:

```text
MaskinportenSettings--Authority
MaskinportenSettings--ClientId
MaskinportenSettings--JwkBase64
```
2. For the application to be able to read the secrets from Azure Key Vault, it needs to be configured to do so.
   See the [secrets section](/en/altinn-studio/v8/reference/configuration/secrets/) to achieve this.
3. Add the appsettings section example from above into the `appsettings.{env}.json` file.
{.floating-bullet-numbers}

_Note: The secrets are read by the application on launch, so if you make changes after the application is deployed, you will need to redeploy the application for them to come into effect._

### Key Vault Configuration

Lastly, we need to add the Azure Key Vault configuration provider to our host. This is done by adding the highlighted code _after_ the `ConfigureWebHostBuilder` method.

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

{{% /expandlarge %}}

## Legacy Compatibility

{{% expandlarge id="legacy-compatibility-expander" header="Show details" %}}

### IMaskinportenTokenProvider
Certain legacy services require an implementation of `IMaskinportenTokenProvider` to retrieve access tokens. The `MaskinportenClient` will automatically register this service if it has not already been supplied elsewhere.

### Altinn.ApiClients.Maskinporten
If you need to support existing usage of the [standalone Maskinporten client](https://github.com/Altinn/altinn-apiclient-maskinporten), while simultaneously wanting to use the built-in client for new features, it usually makes sense to leverage a single [legacy manual setup](#legacy-manual-setup).

The example below illustrates how to map an `Altinn.ApiClients.Maskinporten.Config.MaskinportenSettings` object to the format required by the built-in client.

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
If your MaskinportenSettings is [configured in Key Vault](#key-vault-configuration), the mapping described in this step needs to take place either lazily or _after_ Key Vault has been added as an options provider. If the configuration delegate runs too early, not all values are loaded yet.
{{% /notice %}}

{{% /expandlarge %}}

## Migration Paths

{{% expandlarge id="migration-paths-expander" header="Show details" %}}

In this section you will find couple of brief examples of how to migrate your existing configuration from the [standalone Maskinporten client](https://github.com/Altinn/altinn-apiclient-maskinporten) to the built-in one.

### Use of AddMaskinportenHttpClient
The following example shows how an `EventSubscriptionClient` has traditionally been configured, and how you can achieve the same result using the built-in Maskinporten client.

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

### Use of AddMaskinportenHttpMessageHandler
The following example shows how `Altinn.ApiClients.Dan` has typically been configured, and how you can achieve the same result using the built-in Maskinporten client.

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
