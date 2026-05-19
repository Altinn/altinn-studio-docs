<!-- Maskinporten automation notice -->
{{<notice info>}}
**Maskinporten automation in Altinn Studio**

- Apps using Altinn App v8.3 or newer can enable the default service owner scopes `altinn:serviceowner/instances.read` and `altinn:serviceowner/instances.write` from Altinn Studio. Use the button in the Maskinporten tab or add the scopes from the scopes view in app settings.
- Apps using Altinn App v9 require these service owner scopes. Altinn Studio adds them automatically if they are missing.
- The app must also authorise the service owner in [`App/config/authorization/policy.xml`](/en/altinn-studio/v8/reference/configuration/authorization/). Add a service owner authorisation rule for `[org]` with the actions the app client needs, for example `read` and `write`.
{{</notice>}}

The recommended setup is to add the scopes the app needs in Altinn Studio. When the app is built and deployed, the built-in Maskinporten client in the app can use the selected scopes.

To set this up:

1. [Ensure that your user can add Maskinporten scopes for the organisation](#access-to-maskinporten-scopes).
2. [Add the required scopes in Altinn Studio](#add-scopes-in-altinn-studio).
3. [Deploy the app so the selected scopes become available to the app](#deployment-and-credentials).
4. [Use the built-in Maskinporten client in application code](#application-setup).

## Access to Maskinporten scopes

Altinn Studio uses your signed-in Ansattporten access to find the Maskinporten scopes you can add for the service owner organisation.

If you cannot see any scopes in Altinn Studio, your user may not have access to administer clients for the organisation. Contact the person who administers Maskinporten access for your organisation or Altinn servicedesk.

## Add scopes in Altinn Studio

1. Open the app in Altinn Studio.
2. Go to **Settings** and open the **Maskinporten** tab.
3. Select **Add**.
4. Search for and select the scopes the app needs.
5. Select **Complete** to save the scope list.
{.floating-bullet-numbers}

Scope changes take effect the next time the app is built and deployed.

## Deployment and credentials

When an app with Maskinporten scopes is deployed, Altinn Studio includes the selected scopes in the app build. After deployment, the app can use the built-in Maskinporten client with the scopes selected in Altinn Studio.

You do not need to handle client credentials, JWKS generation, rotation, or app configuration yourself for the standard app setup.

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
