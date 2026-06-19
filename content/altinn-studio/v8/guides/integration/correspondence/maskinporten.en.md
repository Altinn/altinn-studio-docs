---
title: Using Maskinporten Authorisation with the Correspondence Service
linktitle: Using Maskinporten
weight: 100
toc: true
---

On the [previous page](/en/altinn-studio/v8/guides/integration/), we went through how to set up a [resource](/en/altinn-studio/v8/guides/integration/correspondence/#altinn-resource) and the versioning requirements
for the correspondence client.

We can now proceed to the [Maskinporten setup](#maskinporten-setup) and the [application code](#application-code).

## Maskinporten Setup

In order to use the [correspondence service](/en/correspondence/), a [Maskinporten](/en/authorization/getting-started/authentication/maskinporten/) client with the access to the following scopes is required:

- `altinn:serviceowner`
- `altinn:correspondence.read`
- `altinn:correspondence.write`
{.correspondence-custom-list}

To set this up, add these scopes in Altinn Studio as described in the [Maskinporten integration guide](/en/altinn-studio/v8/guides/integration/maskinporten/). When the app is deployed, Altinn Studio provisions the Maskinporten client and mounts the generated `MaskinportenSettings` into the app.

The correspondence client automatically finds and uses the built-in Maskinporten client with the default `MaskinportenSettings` configuration path.

{{% expandlarge id="legacy-correspondence-maskinporten-config" header="Show legacy custom Maskinporten configuration" %}}

If you require a different configuration path, you can configure it with the `ConfigureMaskinportenClient` extension method:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{<highlight csharp "linenos=false,hl_lines=5">}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  services.ConfigureMaskinportenClient("UniqueMaskinportenSettingsPath");
}
{{</highlight>}}

If you require a custom configuration flow, you can make use of the available configuration delegate:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{<highlight csharp "linenos=false,hl_lines=5-10">}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  services.ConfigureMaskinportenClient(config =>
  {
    config.Authority = "https://[test.]maskinporten.no/";
    config.ClientId = "the client id";
    config.JwkBase64 = "base64 encoded jwk";
  });
}
{{</highlight>}}

{{% /expandlarge %}}

## Application code

Using the dependency injection framework in .NET, you can inject an `ICorrespondenceClient` in your service.
This client can then be used to send correspondences and will be able to automatically handle the Maskinporten authorisation.

When sending a correspondence, there are a wealth of properties available. While only a handful of these are required,
the process of constructing the request itself can be a bit daunting. To assist with this, there is a
`CorrespondenceRequestBuilder` interface available.

The example below uses the builder to construct a correspondence request using the most common options: the message itself,
a notification to the recipient, and an attached file.

You will find all available options and associated documentation through IntelliSense in your favorite code editor.

{{<notice info>}}
The example below reflects the recommended usage as of [Altinn.App.Core](https://www.nuget.org/packages/Altinn.App.Core) and [Altinn.App.Api](https://www.nuget.org/packages/Altinn.App.Api) **v8.12.2**:

- **Attachment data is streamed**: pass a `Stream` to `WithData(...)` instead of a byte array. This is far more efficient for large attachments. The client takes ownership of the stream and disposes it once the upload completes, so you should not dispose it yourself.
- **The sender is resolved automatically** from the Altinn resource. `WithSender(...)` is no longer required and has been deprecated.
- **`WithAllowSystemDeleteAfter(...)` has been deprecated** as it is no longer supported by the Correspondence API.

The deprecated methods still compile, but will be removed in a future major version.
{{</notice>}}

### Service registration

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{<highlight csharp "linenos=false,hl_lines=5">}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  services.AddTransient<ITheInterfaceYouAreImplementing, CorrespondenceClientDemo>();
}
{{</highlight>}}

### Correspondence client implementation

{{< code-title >}}
App/CorrespondenceClientDemo.cs
{{< /code-title >}}

```cs
using System;
using System.IO;
using System.Threading.Tasks;
using Altinn.App.Core.Features.Correspondence;
using Altinn.App.Core.Features.Correspondence.Builder;
using Altinn.App.Core.Features.Correspondence.Models;

namespace Altinn.App;

internal sealed class CorrespondenceClientDemo(
  ICorrespondenceClient correspondenceClient
) : ITheInterfaceYouAreImplementing
{
  public async Task<SendCorrespondenceResponse> SendMessage()
  {
    CorrespondenceAuthorisation authorisation = CorrespondenceAuthorisation.Maskinporten;

    // The attachment data is streamed to the Correspondence service.
    // Don't dispose the stream yourself: the client takes ownership and disposes it once the upload completes.
    Stream attachmentData = File.OpenRead("path/to/attachment.txt");

    CorrespondenceRequest request = CorrespondenceRequestBuilder
      .Create()
      .WithResourceId("A valid resource registry identifier")
      .WithSendersReference("Sender's arbitrary reference for the correspondence")
      .WithRecipient("Recipient's organisation number")
      .WithContent(
        language: "en",
        title: "Hello from .NET 👋🏻",
        summary: "The message summary",
        body: "The message body with markdown support"
      )
      .WithNotification(
        CorrespondenceNotificationBuilder
          .Create()
          .WithNotificationTemplate(CorrespondenceNotificationTemplate.CustomMessage)
          .WithEmailSubject("New Altinn message")
          .WithEmailBody(
            "You have a new message in your Altinn inbox, log in to see what's new."
          )
          .WithSmsBody("Got 📨 in Altinn")
          .WithNotificationChannel(CorrespondenceNotificationChannel.EmailPreferred)
      )
      .WithAttachment(
        CorrespondenceAttachmentBuilder
          .Create()
          .WithFilename("attachment.txt")
          .WithSendersReference("Sender's arbitrary reference for the attachment")
          .WithData(attachmentData)
      )
      .Build();

    return await correspondenceClient.Send(
      new SendCorrespondencePayload(request, authorisation)
    );
  }

  public async Task<GetCorrespondenceStatusResponse> GetMessageStatus(Guid correspondenceId)
  {
    return await correspondenceClient.GetStatus(
      new GetCorrespondenceStatusPayload(
        correspondenceId,
        CorrespondenceAuthorisation.Maskinporten
      )
    );
  }
}
```

### Notes on authorisation

In the example above, we are using the `CorrespondenceAuthorisation.Maskinporten` enum to indicate that authorisation should
be automatically handled internally with Maskinporten. This is by far the easiest and most convenient authorisation method, but
it's not the only option available.

If you require custom authorisation logic while sending correspondences, you are able to supply your own delegate for this purpose.

An example of this could be if you for some reason preferred to use the legacy [external Maskinporten client](https://github.com/Altinn/altinn-apiclient-maskinporten).

Both the `SendCorrespondencePayload` and `GetCorrespondenceStatusPayload` accepts a delegate parameter. The implementation would look something like this:

```cs
// ...

new SendCorrespondencePayload(
  request,
  async () =>
  {
    TokenResponse maskinportenResponse = await maskinportenService.GetToken(
      base64EncodedJwk: "...",
      environment: "test|prod",
      clientId: "the client id",
      scope: "altinn:serviceowner altinn:correspondence.write",
      resource: null
    );

    TokenResponse altinnResponse = await maskinportenService.ExchangeToAltinnToken(
      maskinportenResponse,
      "test|prod"
    );

    return JwtToken.Parse(altinnResponse.AccessToken);
  }
);
```
