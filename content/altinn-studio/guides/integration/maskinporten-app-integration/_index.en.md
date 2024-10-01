---
title: Integrate Altinn app with Maskinporten
linktitle: Maskinporten-App integration
description: How to setup an integration between an Altinn App and Maskinporten.
weight: 100
toc: true
aliases:

- /app/maskinporten-app-integration/

---

This is a guide on how to set up an Altinn application to create a client that utilizes a Maskinporten integration for
its requests. This is a use case that is relevant when the application are going to perform requests that needs to
be authorized on behalf of the organization owning the application and not the end user owning the instance. By nature,
these requests will have credentials from the private user who logged in to the application and created the new
instance. In order to send these requests on behalf of the organization the following must be done;

1. Ensure organization has access to Azure key vault
2. Create the integration to Maskinporten
   at [Samarbeidsportalen](https://samarbeid.digdir.no/)
3. Store the keys from the integration in Azure key vault for
   the organisation
4. Set up the application to use the Maskinporten client by retrieving the secrets/keys from Azure key vault.

## Azure Key Vault Access
Before going forward in this guide, make sure you have access
to Azure key vault for your organization, so the keys
created further on in the guide can be added directly into
the secrets in Azure.

If access is missing, please refer to [Access to logs and secrets](/altinn-studio/guides/administration/access-management/apps).

## Maskinporten Integration

In this section the Maskinporten client will be set up. A part of setting up the client includes creating keys that
should be stored in Azure Key vault later on in the guide. If different people in the organization have access to
different resources needed in this process, please cooperate and do the following steps on the same machine. This is
recommended to avoid sending secrets between machines.

When access to creating secrets in Azure key vault is
confirmed, please proceed to create the integration.

{{% expandlarge id="guide-mp-int-samarbeid" header="Guide on how to register a new Maskinporten integration in Samarbeidsportalen" %}}

{{% insert "content/altinn-studio/guides/shared/maskinporten-integration/maskinporten-integration-samarbeidsportal.md" %}}
{{% /expandlarge %}}

## Azure Key Vault Configuration

When preparing the application to use the secrets from Azure Key vault, there are some steps that needs to be done:

1. Add the secrets retrieved during the Maskinporten client configuration to Azure Key vault:
   - The base64 encoded JWT public and private key pair
   - The clientID for the integration

   It is important that the name of these secrets in Azure key vault corresponds
   with the name of the section in the appsettings file in the
   application repository. E.g. if your appsettings section for
   the Maskinporten integration section looks like this:

   ```json
   {
     "MaskinportenSettings": {
       "Environment": "ver2",
       "ClientId": "",
       "Scope": "altinn:serviceowner/instances.read",
       "EncodedJwk": "",
       "ExhangeToAltinnToken": true,
       "EnableDebugLog": true
     }
   }
   ```

   The secrets in Azure key vault should have names like this:

   ```
   MaskinportenSettings--ClientId
   MaskinportenSettings--EncodedJwk
   ```
2. For the application to be able to read the secrets from
   Azure key vault the application need to be configured to
   do so. See
   the [secrets section](../../../reference/configuration/secrets)
   to achieve this.
3. Add the appsettings section example
   from above into the `appsettings.{env}.json` file.

_NB: The secrets are read by the application on start up so
if changing the secrets after the application is deployed, you
will need to redeploy the application._

## Setup Application to use Maskinporten Integration

When modifying the application to use the Maskinporten integration, we need to adapt the `Program.cs` file.

First of all we need to add the MaskinportenHttpClient
service with the appropriate configuration in the function `RegisterCustomAppServices`:

```csharp
services.AddMaskinportenHttpClient<SettingsJwkClientDefinition, AppClient>(config.GetSection("MaskinportenSettings"));
```

Then we need to add the Azure Key Vault configuration provider to our host.
Start by adding these package references in the project file (`App.csproj`) - get the latest version from NuGet.org:

{{< highlight csproj "linenos=false" >}}
<PackageReference Include="Azure.Extensions.AspNetCore.Configuration.Secrets" Version="1.3.1" />
<PackageReference Include="Azure.Identity" Version="1.11.4" />
{{< / highlight >}}

Then we can complete the configuration by adding the Azure Key Vault configuration provider:

{{< highlight csharp "linenos=false,hl_lines=1 8-30" >}}
using Azure.Identity;

// ...

void ConfigureWebHostBuilder(IWebHostBuilder builder)
{
    builder.ConfigureAppWebHost(args);
    builder.ConfigureAppConfiguration(
        (context, configuration) =>
        {
            var section = context.Configuration.GetSection("kvSetting");
            var keyVaultUri = section.GetValue<string>("SecretUri");
            var clientId = section.GetValue<string>("ClientId");
            var clientSecret = section.GetValue<string>("ClientSecret");
            var tenantId = section.GetValue<string>("TenantId");

            if (
                string.IsNullOrWhiteSpace(keyVaultUri)
                || string.IsNullOrWhiteSpace(clientId)
                || string.IsNullOrWhiteSpace(clientSecret)
                || string.IsNullOrWhiteSpace(tenantId)
            )
                return;

            configuration.AddAzureKeyVault(
                new Uri(keyVaultUri),
                new ClientSecretCredential(tenantId, clientId, clientSecret)
            );
        }
    );
}
{{< / highlight >}}

