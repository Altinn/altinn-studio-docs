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

This guide details how to set up an Altinn application to use the built-in Maskinporten client (`IMaskinportenClient`) for making authorized requests on behalf of the app owner, as opposed to the active user.

In order to set this up, the following must be done:

1. Ensure organization has access to Azure Key Vault.
2. Create the integration to Maskinporten at [Samarbeidsportalen](https://samarbeid.digdir.no/).
3. Store the authentication key for the integration in Azure Key Vault.
4. Set up the application to use the Maskinporten client and retrieve secrets from Azure Key Vault.

## Azure Key Vault Access
Before proceeding with this guide, make sure you have access to Azure Key Vault for your organization.
This ensures that the keys created further on in the guide can be stored properly as secrets in Azure.

If access is missing, please refer to [Access to logs and secrets](/altinn-studio/guides/administration/access-management/apps).

## Maskinporten Integration

In this section we will set up the Maskinporten client. A part of setting up the client includes creating keys that
should be stored in Azure Key Vault later on in the guide. If different people in the organization have access to
different resources needed in this process, please cooperate and do the following steps on the same machine. This is
recommended to avoid sending secrets between machines.

When access to creating secrets in Azure Key Vault is confirmed, please proceed to create the integration.

{{% expandlarge id="guide-mp-int-samarbeid" header="Guide on how to register a new Maskinporten integration in Samarbeidsportalen" %}}

{{% insert "/content/altinn-studio/guides/shared/maskinporten-integration/maskinporten-integration-samarbeidsportal.md" %}}
{{% /expandlarge %}}

## Azure Key Vault Configuration

When preparing the application to use secrets from Azure Key Vault, there are some steps that need to be done:

1. Add the secrets retrieved during the Maskinporten client configuration to Azure Key Vault:
   - The base64 encoded JWT public and private key pair
   - The client ID for the integration

   It is important that the name of these secrets in Azure Key Vault corresponds with the name of the section in the 
   appsettings file in the application repository. E.g. if your appsettings section for the Maskinporten integration section looks like this:

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
   See the [secrets section](../../../reference/configuration/secrets) to achieve this.
3. Add the appsettings section example from above into the `appsettings.{env}.json` file.
{.floating-bullet-numbers}

_Note: The secrets are read by the application on launch so
if you make changes after the application is deployed, you
will need to redeploy the application for them to come into effect._

## Setup Application to use Maskinporten Integration

The application automatically includes the built-in `IMaskinportenClient` which can be injected into your services. The client will automatically find and use the `MaskinportenSettings` configuration.

If you need to use a different configuration path than the default, you can configure it in the `RegisterCustomAppServices` method:

{{< highlight csharp "linenos=false,hl_lines=5-7" >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // ...

    services.ConfigureMaskinportenClient(
        "YourCustomMaskinportenSettingsPath"
    );
}
{{< / highlight >}}

For typed HTTP clients that need Maskinporten authorization, you can use the extension methods:

{{< highlight csharp "linenos=false,hl_lines=5-6,8-9" >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // ...

    // For external APIs that require raw Maskinporten tokens
    services.AddHttpClient<YourCustomClient>().UseMaskinportenAuthorisation("scope:1", "scope:2");
    
    // For Altinn APIs that require Altinn tokens (exchanges Maskinporten token)
    services.AddHttpClient<YourCustomClient2>().UseMaskinportenAltinnAuthorisation("scope:1", "scope:2");
}
{{< / highlight >}}

Then we need to add the Azure Key Vault configuration provider to our host. This is done by adding the highlighted code after the `ConfigureWebHostBuilder` method:

{{< highlight csharp "linenos=false,hl_lines=4-9" >}}

ConfigureWebHostBuilder(IWebHostBuilder builder);

// Add Azure KV provider for TT02 & Prod environments
if (!builder.Environment.IsDevelopment())
{
    builder.AddAzureKeyVaultAsConfigProvider();
}

{{< / highlight >}}

