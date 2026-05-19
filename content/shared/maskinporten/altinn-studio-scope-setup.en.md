The recommended setup is to add the scopes the app needs in Altinn Studio. When the app is built and deployed, Altinn Studio provisions a Maskinporten client, stores the generated credentials in the app secret, and mounts the settings into the running app.

To set this up:

1. [Ensure that your user can administer Maskinporten clients for the organisation](#access-to-maskinporten-scopes).
2. [Add the required scopes in Altinn Studio](#add-scopes-in-altinn-studio).
3. [Deploy the app so the Maskinporten client is provisioned](#deployment-and-credentials).
4. [Use the built-in Maskinporten client in application code](#application-setup).

## Access to Maskinporten scopes

To add scopes in Altinn Studio you must log in on behalf of the service owner organisation with Ansattporten.

Your user must have organisation/service owner permissions for the service owner in Sjolvbetjeningsportalen, including permission to administer clients. If you cannot see any scopes in Altinn Studio, contact the person who administers Maskinporten access for your organisation or Altinn servicedesk.

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

The app automatically includes the built-in `IMaskinportenClient` which can be injected into your services.

### Configuration paths

The client automatically looks for a Maskinporten configuration at the default path _"MaskinportenSettings"_. With the Altinn Studio scope setup, this configuration is provided by the mounted runtime secret.

Use the default path when scopes are selected in Altinn Studio. The Maskinporten controller writes the generated credentials to the default configuration path and does not populate custom configuration sections.

Only configure a different path when you provide the Maskinporten configuration yourself, for example in a custom or legacy setup.

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
