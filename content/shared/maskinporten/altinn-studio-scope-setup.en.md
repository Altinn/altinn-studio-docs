<!-- Maskinporten automation notice -->
{{<notice info>}}
**Maskinporten automation in Altinn Studio**

- Apps using Altinn App v8.3 or newer can enable the default service owner scopes `altinn:serviceowner`, `altinn:serviceowner/instances.read` and `altinn:serviceowner/instances.write` from Altinn Studio. Use the button in the Maskinporten tab or add the scopes from the scopes view in app settings.
- `altinn:serviceowner` indicates that the client is a service owner system, while `altinn:serviceowner/instances.read` and `altinn:serviceowner/instances.write` grant access to read and write instances as service owner.
- Apps using Altinn App v9 require these default scopes. Altinn Studio adds them automatically if they are missing.
- New apps created in Altinn Studio get these default service owner scopes automatically.
- The app must also authorise the service owner in [`App/config/authorization/policy.xml`](/en/altinn-studio/v8/reference/configuration/authorization/). New apps include this rule in the app template. For existing apps, add or update the `[org]` rule so it grants `read` and `write`.
{{</notice>}}

To set this up:

1. [Check that your user has access to Maskinporten scopes](#access-to-maskinporten-scopes).
2. [Add the required scopes in Altinn Studio](/en/altinn-studio/v8/guides/integration/maskinporten/add-scopes/).
3. [Deploy the app so the selected scopes become available to the app](#deployment-and-credentials).
4. [Use the built-in Maskinporten client in application code](#application-setup).

## Access to Maskinporten scopes

Altinn Studio uses your signed-in Ansattporten access to find the Maskinporten scopes you can add for the service owner organisation.

If you cannot see any scopes in Altinn Studio, your user may not have access to administer clients for the organisation. See [what to do if you do not have access](/en/altinn-studio/v8/guides/integration/maskinporten/add-scopes/#if-you-do-not-have-access), contact the person who administers Maskinporten access for your organisation, or contact Altinn servicedesk.

## Add scopes in Altinn Studio

See the [step-by-step guide for adding Maskinporten scopes to an app](/en/altinn-studio/v8/guides/integration/maskinporten/add-scopes/) for screenshots of the flow in Altinn Studio.

Scope changes take effect the next time the app is built and deployed.

## Deployment and credentials

When an app with Maskinporten scopes is deployed, Altinn Studio includes the selected scopes in the app build. After deployment, the app can use the built-in Maskinporten client with the scopes selected in Altinn Studio.

You do not need to handle client credentials, JWKS generation, rotation, or app configuration yourself for the standard app setup.

## Usage {#application-setup}

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
