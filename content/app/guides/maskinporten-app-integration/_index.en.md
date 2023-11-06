---
title: Integrate Altinn app with Maskinporten
linktitle: Maskinporten-App integration
description: How to setup an integration between an Altinn App and Maskinporten.
weight: 100
toc: true
aliases:

- /app/maskinporten-app-integration/

---

TODO: Rewrite this to be independent from multi-app solution

By nature, the request will have credentials from the private user who
logged in to the application A form, thus is not allowed to start
a new instance on behalf of the organisation that owns application B.
As a way to bypass this obstacle, we
can use a Maskinporten integration to authenticate the
request on behalf of the organisation owning
application B. In order to achieve this we need to;

1. Ensure organization has access to Azure key vault
2. Create the integration
   at [Samarbeidsportalen](https://samarbeid.digdir.no/)
3. Store the keys from the integration in Azure key vault for
   the organisation
4. Set up the application to use Azure key vault and the
   client to use Maskinporten

## Azure Key Vault Access
Before going forward in this guide, make sure you have access
to Azure key vault for your organization, so the keys
created in the following guide can be added directly into
the secrets in Azure.

If access is missing, please refer to [Access to logs and secrets](../access-management/apps).

## Maskinporten Integration

If different people in the
organization have access to different resources needed in
this process, please cooperate and do the following steps on
the same machine. This is recommended to avoid sending
secrets between machines.

When access to creating secrets in Azure key vault is
confirmed, please proceed to create the integration;
navigate to
the [Maskinporten Setup guide](../../../technology/solutions/cli/configuration/maskinporten-setup)
.

## Key Vault Usage

When the integration is created two secrets have to be
placed in Azure key vault:

1. The base64 encoded JWT public and private key pair
2. The clientID for the integration

It is important that the name of these secrets corresponds
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

_NB: The secrets is read by the application on start up so
if
changing the secrets after the application is deployed, you
will need to redeploy the application._

## Setup app to use Maskinporten Integration

In the process of setting up the application to use the
integration there are three things that needs to be done;

1. For the application to be able to read the secrets from
   Azure key vault the application need to be configured to
   do so. See
   the [secrets section](../../development/configuration/secrets)
   to achieve this.
2. Add the appsettings section example
   from [Key Vault Usage](#key-vault-usage) into
   the `appsettings.json` file in the application that
   should perform the instantiation of
   application B. Remember to adapt the section
   name `MaskinportenSettings` to the name you chose for the
   secrets in Azure key vault.
3. Modify the `program.cs` file for the same application to
   connect to Azure key vault. Continue reading for a
   detailed explanation.

### Modifying `program.cs` to use Key Vault

First of all you need to add the MaskinportenHttpClient
service in the function `RegisterCustomAppServices`:

```csharp
services.AddMaskinportenHttpClient<SettingsJwkClientDefinition, AppClient>(config.GetSection("MaskinportenSettings"));
```

Then you need to add the following
function `ConnectToKeyVault` in the bottom of the file:

```csharp
static void ConnectToKeyVault(IConfigurationBuilder config)
{
    IConfiguration stageOneConfig = config.Build();
    KeyVaultSettings keyVaultSettings = new KeyVaultSettings();
    stageOneConfig.GetSection("kvSetting").Bind(keyVaultSettings);
    if (!string.IsNullOrEmpty(keyVaultSettings.ClientId) &&
        !string.IsNullOrEmpty(keyVaultSettings.TenantId) &&
        !string.IsNullOrEmpty(keyVaultSettings.ClientSecret) &&
        !string.IsNullOrEmpty(keyVaultSettings.SecretUri))
    {
        string connectionString = $"RunAs=App;AppId={keyVaultSettings.ClientId};" +
                                  $"TenantId={keyVaultSettings.TenantId};" +
                                  $"AppKey={keyVaultSettings.ClientSecret}";
        AzureServiceTokenProvider azureServiceTokenProvider = new AzureServiceTokenProvider(connectionString);
        KeyVaultClient keyVaultClient = new KeyVaultClient(
            new KeyVaultClient.AuthenticationCallback(
                azureServiceTokenProvider.KeyVaultTokenCallback));
        config.AddAzureKeyVault(
            keyVaultSettings.SecretUri, keyVaultClient, new DefaultKeyVaultSecretManager());
    }
}
```

This function can then be used in the
function `ConfigureWebHostBuilder`. The function already
exist, so just change the content to the following:

```csharp
void ConfigureWebHostBuilder(IWebHostBuilder builder)
{
    builder.ConfigureAppConfiguration((_, configBuilder) =>
    {
        configBuilder.LoadAppConfig(args);
        ConnectToKeyVault(configBuilder);
    });
}
```
