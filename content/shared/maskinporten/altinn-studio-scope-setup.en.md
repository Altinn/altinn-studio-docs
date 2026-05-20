<!-- Maskinporten automation notice -->
{{<notice info>}}
**Maskinporten automation in Altinn Studio**

- Apps using Altinn App v8.3 or newer can enable the default service owner scopes `altinn:serviceowner`, `altinn:serviceowner/instances.read` and `altinn:serviceowner/instances.write` from Altinn Studio. Use the button in the Maskinporten tab or add the scopes from the scopes view in app settings.
- `altinn:serviceowner` indicates that the client is a service owner system, while `altinn:serviceowner/instances.read` and `altinn:serviceowner/instances.write` grant access to read and write instances as service owner.
- Apps using Altinn App v9 require these default scopes. Altinn Studio adds them automatically if they are missing.
- New apps created in Altinn Studio get these default service owner scopes automatically.
- The app must also authorise the service owner in [`App/config/authorization/policy.xml`](/en/altinn-studio/v8/reference/configuration/authorization/). New apps include this rule in the app template. For existing apps, add or update the `[org]` rule so it grants `read` and `write`.
{{</notice>}}

The recommended setup is to add the scopes the app needs in Altinn Studio. When the app is built and deployed, the built-in Maskinporten client in the app can use the selected scopes.

To set this up:

1. [Ensure that your user can add Maskinporten scopes for the organisation](#access-to-maskinporten-scopes).
2. [Add the required scopes in Altinn Studio](/en/altinn-studio/v8/guides/integration/maskinporten/add-scopes/).
3. [Deploy the app so the selected scopes become available to the app](#deployment-and-credentials).
4. [Use the built-in Maskinporten client in application code](#application-setup).

## Access to Maskinporten scopes

Altinn Studio uses your signed-in Ansattporten access to find the Maskinporten scopes you can add for the service owner organisation.

If you cannot see any scopes in Altinn Studio, your user may not have access to administer clients for the organisation. Contact the person who administers Maskinporten access for your organisation or Altinn servicedesk.

## Add scopes in Altinn Studio

See the [step-by-step guide for adding Maskinporten scopes to an app](/en/altinn-studio/v8/guides/integration/maskinporten/add-scopes/) for screenshots of the flow in Altinn Studio.

Scope changes take effect the next time the app is built and deployed.

## Deployment and credentials

When an app with Maskinporten scopes is deployed, Altinn Studio includes the selected scopes in the app build. After deployment, the app can use the built-in Maskinporten client with the scopes selected in Altinn Studio.

You do not need to handle client credentials, JWKS generation, rotation, or app configuration yourself for the standard app setup.

## Migrate from manually managed credentials

Some existing apps use a manually created Maskinporten client from Samarbeidsportalen and read the client credentials from the service owner Azure Key Vault. This setup often uses app-specific secret prefixes because the Key Vault is shared by several apps, for example `myapp--MaskinportenSettings--ClientId`, and app code may bind the built-in client to a custom configuration path such as `myapp:MaskinportenSettings`.

To move such an app to Altinn Studio-managed credentials:

1. Check which scopes the existing Maskinporten client is configured with in Samarbeidsportalen, and which scopes the app requests in code.
2. Add the same scopes to the app in Altinn Studio. If the app only needs service owner access to Altinn instances, use the default service owner scopes.
3. Build and deploy the app to TT02. The deployed app will receive credentials for the selected scopes at the default `MaskinportenSettings` configuration path.
4. Update app code that explicitly binds Maskinporten configuration to a custom path. Remove the custom `ConfigureMaskinportenClient("...")` call, or change it to use `MaskinportenSettings`, so the app uses the configuration supplied by Altinn Studio.
5. Verify the app in TT02. Test that it can retrieve a Maskinporten token, and that calls requiring exchanged Altinn tokens still work if the app uses `UseMaskinportenAltinnAuthorization` or `GetAltinnExchangedToken`.
6. Repeat the deployment and verification in production.
7. After production is verified, remove the old app-specific Key Vault secrets and the custom Key Vault configuration if they are no longer used. Do not delete the old Maskinporten client before you have verified that no other app or integration uses it.
{.floating-bullet-numbers}

Keep any Azure Key Vault setup that the app uses for other secrets. If Maskinporten credentials were the only values the app read from Azure Key Vault, the Azure Key Vault configuration provider and related app settings can be removed after the migration is verified.

{{% notice warning %}}
If the app already uses the default `MaskinportenSettings` configuration path and reads those values from Azure Key Vault, the app will temporarily have two configuration sources for the same keys after Studio-managed credentials are deployed: the runtime secrets file added by `ConfigureAppWebHost`, and Azure Key Vault.

Configuration providers added later override earlier providers. Ensure that the Azure Key Vault provider is registered after the call to `ConfigureAppWebHost`, so the existing Key Vault values keep taking precedence until you intentionally remove them. When you want the app to use the Studio-managed credentials, remove or rename the old `MaskinportenSettings--...` Key Vault secrets, or remove the Azure Key Vault setup entirely if the app does not use it for anything else, and redeploy the app.
{{% /notice %}}

## Application Setup

The app automatically includes the built-in `IMaskinportenClient` which can be injected into your services.

### Configuration paths

The client automatically looks for a Maskinporten configuration at the default path _"MaskinportenSettings"_. With the Altinn Studio scope setup, this configuration is available to the app after deployment.

Use the default path when scopes are selected in Altinn Studio. Custom configuration sections are not populated by the Altinn Studio scope setup, and should only be used with manual or legacy setup.

### Authorising HTTP clients

Typed and named HTTP clients can be authorised with the available extension methods, as illustrated below.

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

### Manual usage

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
