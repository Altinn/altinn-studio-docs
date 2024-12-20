---
title: Integrate an Altinn app with Correspondence
linktitle: Correspondence
description: How to setup an integration between an Altinn App and Correspondence.
weight: 100
toc: true
---

This guide details how to integrate the correspondence messaging service with an Altinn application.
This integration enables an app to securely send digital messages and attachments to organisations and individuals.

## Prerequisites
1. A [Maskinporten client](#maskinporten) 
2. An applicable [Altinn resource](#altinn-resource)
3. [Altinn.App.Api](https://www.nuget.org/packages/Altinn.App.Api) and [Altinn.App.Core](https://www.nuget.org/packages/Altinn.App.Core) _v8.5.0_ or greater

### Maskinporten
In order to use the [correspondence service](/correspondence/), a [Maskinporten](/authentication/what-do-you-get/maskinporten/) client with the access to the following scopes is required:
- `altinn:serviceowner`
- `altinn:correspondence.read`
- `altinn:correspondence.write`
{.correspondence-custom-list}

To set this up, follow the general steps outlined in the [Maskinporten integration guide](../maskinporten/), with a couple of modifications described below.
- The correspondence client uses a new version of the Maskinporten client, which means the configuration object now looks like this:

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

### Altinn Resource
When sending a correspondence, it needs to be tied to an Altinn resource. This resource controls the access policy for
the Correspondence, which is evaluated for both senders and receivers.

Please refer to the [resource registration guide](/correspondence/getting-started/service-owner/#register-a-resource-in-altinn-resource-registry)
for more information on the setup process.

{{<notice info notice-paragraph-fix>}}
The resource needs to allow sender access for [your organisation](https://github.com/Altinn/altinn-cdn/blob/master/orgs/altinn-orgs.json)
and recipient access for the appropriate [role codes](https://github.com/Altinn/altinn-cdn/blob/master/authorization/subjectoptions.json).

Note that for messages sent to a person, the code `priv` should be used. For messages sent to an organisation, whichever roles
best describing your indented recipient should be used.
{{</notice>}}

## Usage
Using the dependency injection framework in .NET, you can inject an `ICorrespondenceClient` in your service.
This client can then be used to send correspondences and will be able to automatically handle the Maskinporten authorisation.

When sending a correspondence, there are a wealth of parameters available. While only a handful of these are required,
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

Both the `SendCorrespondencePayload` and `GetCorrespondenceStatusPayload` accepts such a parameter. The implementation would look something like this:

```cs
// ...

new SendCorrespondencePayload(
  request,
  async () =>
  {
    string accessToken = await someTokenService.GetAccessToken();
    return JwtToken.Parse(accessToken);
  }
);
```