---
title: Using Maskinporten Authorisation with the Correspondence Service
linktitle: Using Maskinporten
weight: 100
toc: true
---

On the [previous page](../), we went through how to set up a [resource](../#altinn-resource) and the versioning requirements
for the correspondence client.

We can now proceed to the [Maskinporten setup](#maskinporten-setup) and the [application code](#application-code).

## Maskinporten Setup
In order to use the [correspondence service](/correspondence/), a [Maskinporten](/authentication/what-do-you-get/maskinporten/) client with the access to the following scopes is required:
- `altinn:serviceowner`
- `altinn:correspondence.read`
- `altinn:correspondence.write`
{.correspondence-custom-list}

To set this up, follow the general steps outlined in the [Maskinporten integration guide](../maskinporten/), with a couple of modifications described below.
- The correspondence client uses a new, internal, client to communicate with Maskinporten. Because of this, the configuration object now looks like this:

  {{< code-title >}}
  App/appsettings.json
  {{< /code-title >}}

  ```json
  "MaskinportenSettings": {
      "authority": "https://[test.]maskinporten.no/",
      "clientId": "the client id",
      "jwkBase64": "base64 encoded jwk"
  }
  ```
- The correspondence client will automatically find and use the Maskinporten client, and attempt to bind to the default 
  `MaskinportenSettings` configuration path.
- If you require a different configuration path, you can configure it with the `ConfigureMaskinportenClient` extension method:

  {{< code-title >}}
  App/Program.cs
  {{< /code-title >}}

  {{<highlight csharp "linenos=false,hl_lines=7-9">}}
  void RegisterCustomAppServices(
     IServiceCollection services,
     IConfiguration config,
     IWebHostEnvironment env
  )
  {
      services.ConfigureMaskinportenClient(
          "UniqueMaskinportenSettingsPath"
      );
  }
  {{</highlight>}}
- If you require a custom configuration flow, you can make use of the available configuration delegate:

  {{< code-title >}}
  App/Program.cs
  {{< /code-title >}}
  
  {{<highlight csharp "linenos=false,hl_lines=7-12">}}
  void RegisterCustomAppServices(
     IServiceCollection services,
     IConfiguration config,
     IWebHostEnvironment env
  )
  {
      services.ConfigureMaskinportenClient(config =>
      {
          config.Authority = "https://[test.]maskinporten.no/";
          config.ClientId = "the client id";
          config.JwkBase64 = "base64 encoded jwk";
      });
  }
  {{</highlight>}}
{.connected-bullets}

## Application code
Using the dependency injection framework in .NET, you can inject an `ICorrespondenceClient` in your service.
This client can then be used to send correspondences and will be able to automatically handle the Maskinporten authorisation.

When sending a correspondence, there are a wealth of properties available. While only a handful of these are required,
the process of constructing the request itself can be a bit daunting. To assist with this, there is a
`CorrespondenceRequestBuilder` interface available.

The example below uses the builder to construct a correspondence request using the most common options: the message itself,
a notification to the recipient, and an attached file.

You will find all available options and associated documentation through IntelliSense in your favorite code editor.

### Service registration

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{<highlight csharp "linenos=false,hl_lines=9">}}
// ...

void RegisterCustomAppServices(
    IServiceCollection services,
    IConfiguration config,
    IWebHostEnvironment env
)
{
    services.AddTransient<ITheInterfaceYouAreImplementing, CorrespondenceClientDemo>();
}
{{</highlight>}}

### Correspondence client implementation

{{< code-title >}}
App/CorrespondenceClientDemo.cs
{{< /code-title >}}

```cs
using System;
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
    CorrespondenceRequest request = CorrespondenceRequestBuilder
      .Create()
      .WithResourceId("A valid resource registry identifier")
      .WithSender("Sender's organisation number")
      .WithSendersReference("Sender's arbitrary reference for the correspondence")
      .WithRecipient("Recipient's organisation number")
      .WithAllowSystemDeleteAfter(DateTime.Now.AddYears(1))
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
          .WithName("The attachment 📎")
          .WithSendersReference("Sender's arbitrary reference for the attachment")
          .WithDataType("text/plain")
          .WithData("This is the attachment content"u8.ToArray())
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
      "base64 encoded jwk",
      "test|prod",
      "the client id",
      "altinn:serviceowner altinn:correspondence.write",
      null
    );

    TokenResponse altinnResponse = await maskinportenService.ExchangeToAltinnToken(
      maskinportenResponse,
      "test|prod"
    );

    return JwtToken.Parse(altinnResponse.AccessToken);
  }
);
```