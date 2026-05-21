---
headless: true
---

{{% expandlarge id="migrate-from-manual-maskinporten-setup" header="Migrate from manually managed credentials" %}}

Some existing apps use a manually created Maskinporten client from Samarbeidsportalen and read the client credentials from the service owner Azure Key Vault. This setup often uses app-specific secret prefixes because the Key Vault is shared by several apps, for example `myapp--MaskinportenSettings--ClientId`, and app code may bind the built-in client to a custom configuration path such as `myapp:MaskinportenSettings`.

To move such an app to Altinn Studio-managed credentials:

1. Check which scopes the existing Maskinporten client is configured with in Samarbeidsportalen, and which scopes the app requests in code.
2. Add the same scopes to the app in Altinn Studio. If the app only needs service owner access to Altinn instances, use the default service owner scopes.
3. Update app code that explicitly binds Maskinporten configuration to a custom path. Remove the custom `ConfigureMaskinportenClient("...")` call, or change it to use `MaskinportenSettings`, so the app uses the configuration supplied by Altinn Studio.
4. Build and deploy the app to TT02. The deployed app will receive credentials for the selected scopes at the default `MaskinportenSettings` configuration path.
5. Verify the app in TT02. Test that it can retrieve a Maskinporten token, and that calls requiring exchanged Altinn tokens still work.
6. Repeat the deployment and verification in production.
7. After production is verified, remove the old app-specific Key Vault secrets and the custom Key Vault configuration if they are no longer used. Do not delete the old Maskinporten client before you have verified that no other app or integration uses it.
{.floating-bullet-numbers}

Keep any Azure Key Vault setup that the app uses for other secrets. If Maskinporten credentials were the only values the app read from Azure Key Vault, the Azure Key Vault configuration provider and related app settings can be removed after the migration is verified.

{{% notice warning %}}
**If the app already uses `MaskinportenSettings` from Azure Key Vault**

After deployment, the app can temporarily have two configuration sources for the same keys:

- the configuration Altinn Studio adds to the app during deployment
- Azure Key Vault

While the app should still use the old Key Vault values, Azure Key Vault must override the configuration from Altinn Studio. Ensure that the Azure Key Vault provider is registered after the call to `ConfigureAppWebHost`.

When the app should use the Altinn Studio-managed credentials:

- remove or rename the old `MaskinportenSettings--...` Key Vault secrets
- remove the Azure Key Vault setup entirely if the app does not use Azure Key Vault for anything else
- redeploy the app
{{% /notice %}}

{{% /expandlarge %}}
