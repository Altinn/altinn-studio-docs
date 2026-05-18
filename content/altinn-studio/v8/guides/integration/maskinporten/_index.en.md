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

This guide details how to set up an Altinn application to use the built-in Maskinporten authentication client (`IMaskinportenClient`) for making authorized requests on behalf of the app owner, as opposed to the active user.

The recommended setup is to add the scopes the app needs in Altinn Studio. When the app is built and deployed, Altinn Studio provisions a Maskinporten client, stores the generated credentials in the app secret, and mounts the settings into the running app.

In order to set this up, the following must be done:

1. [Ensure that your user can administer Maskinporten clients for the organization](#access-to-maskinporten-scopes).
2. [Add the required scopes in Altinn Studio](#add-scopes-in-altinn-studio).
3. [Deploy the app so the Maskinporten client is provisioned](#deployment-and-credentials).
4. [Use the built-in Maskinporten client in application code](#application-setup).

## Access to Maskinporten scopes

To add scopes in Altinn Studio you must log in on behalf of the service owner organization with Ansattporten.

Your user must have organization/service owner permissions for the service owner in Sjolvbetjeningsportalen, including permission to administer clients. If you cannot see any scopes in Altinn Studio, contact the person who administers Maskinporten access for your organization or Altinn servicedesk.

## Add scopes in Altinn Studio

1. Open the app in Altinn Studio.
2. Go to **Settings** and open the **Maskinporten** tab.
3. Log in with Ansattporten when prompted.
4. Select **Add**.
5. Search for and select the scopes the app needs.
6. Select **Complete** to save the scope list.
{.floating-bullet-numbers}

Scope changes take effect the next time the app is built and deployed.

## Deployment and credentials

When an app with Maskinporten scopes is deployed, Altinn Studio includes the selected scopes in the app build. The deploy pipeline creates a `MaskinportenClient` resource for the app, and the Maskinporten controller in the runtime cluster reconciles that resource against Maskinporten.

The controller creates or updates the Maskinporten client, generates the client credentials, and writes the client ID and JWKS to the app secret. The credentials are mounted into the app deployment and loaded by the app as `MaskinportenSettings`.

You do not need to manually create a Maskinporten client, generate a JWKS, or store `ClientId`/`JwkBase64` in Azure Key Vault for the standard app setup. The JWKS used by the generated client is rotated automatically.

## Application Setup

The application automatically includes the built-in `IMaskinportenClient` which can be injected into your services.

### Configuration Paths

The client automatically looks for a Maskinporten configuration at the default path _"MaskinportenSettings"_. With the Altinn Studio scope setup, this configuration is provided by the mounted runtime secret.

If you need a different path for custom or legacy configuration, you can configure it via the `ConfigureMaskinportenClient` method.

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false,hl_lines=5-7" >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  services.ConfigureMaskinportenClient(
      "YourCustomMaskinportenSettingsPath"
  );
}
{{< / highlight >}}

### Authorizing Http Clients

Typed and named Http clients can be authorized with the available extension methods, as illustrated below.

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

### Manual Usage
If you need to fetch a Maskinporten token manually, you can inject the `IMaskinportenClient` in your service and retrieve tokens with the `GetAccessToken` and `GetAltinnExchangedToken` methods.

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

## Legacy manual setup

The following manual setup is only needed for legacy apps or special cases where Altinn Studio should not provision the Maskinporten client.

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

   ```
   MaskinportenSettings--Authority
   MaskinportenSettings--ClientId
   MaskinportenSettings--JwkBase64
   ```
2. For the application to be able to read the secrets from Azure Key Vault, it needs to be configured to do so.
   See the [secrets section](/en/altinn-studio/v8/reference/configuration/secrets/) to achieve this.
3. Add the appsettings section example from above into the `appsettings.{env}.json` file.
{.floating-bullet-numbers}

_Note: The secrets are read by the application on launch so if you make changes after the application is deployed, you will need to redeploy the application for them to come into effect._

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
