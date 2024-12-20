---
title: Bruke meldingstjenesten med Maskinporten-autorisasjon
linktitle: Med Maskinporten
weight: 100
toc: true
---

På [forrige side](../) gikk vi gjennom hvordan man setter opp en [ressurs](../#altinn-ressurs) og versjonskravene 
for meldingsklienten.

Vi kan nå gå videre til [oppsett av Maskinporten](#maskinporten) og [applikasjonskode](#applikasjonskode).

## Maskinporten
For å bruke [meldingstjenesten](/correspondence/) behøver man en [Maskinporten](/authentication/what-do-you-get/maskinporten/)-klient med tilgang til følgende scopes:
- `altinn:serviceowner`
- `altinn:correspondence.read`
- `altinn:correspondence.write`
{.correspondence-custom-list}

For å sette opp dette kan du følge de generelle stegene i [veiledningen for Maskinporten-integrasjons](../maskinporten/) med noen modifikasjoner beskrevet nedenfor.
- Meldingsklienten bruker en ny, intern klient for å kommunisere med Maskinporten. Derfor blir konfigurasjonsobjektet seende slik ut:

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
- Meldingsklienten finner og bruker automatisk Maskinporten-klienten, og forsøker å binde seg til standard konfigurasjonssti `MaskinportenSettings`.
- Hvis du trenger en annen konfigurasjonssti, kan du konfigurere den med hjelp av `ConfigureMaskinportenClient`:

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
          "DinUnikeMaskinportenSettingsSti"
      );
  }
  {{</highlight>}}
- Hvis du trenger et tilpasset konfigurasjonsoppsett, kan du bruke en delegatmetode:

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
          config.ClientId = "klient-id";
          config.JwkBase64 = "base64-kodet jwk";
      });
  }
  {{</highlight>}}
{.connected-bullets}

## Applikasjonskode
Ved å bruke avhengighetsinjeksjon i .NET, kan du registrere at tjenesten din trenger en `ICorrespondenceClient`.
Denne klienten kan deretter brukes til å sende meldinger og vil automatisk håndtere Maskinporten-autorisering.

Når du skal sende en melding, finnes det veldig mange tilgjengelige parametere. Selv om bare et fåtall er nødvendige,
kan selve prosessen med å bygge forespørselen være litt overveldende. For å hjelpe med dette, er det et `CorrespondenceRequestBuilder`-grensesnitt tilgjengelig.

Eksempelet nedenfor bruker dette grensenittet til å bygge en meldingsforespørsel med de vanligste alternativene:
selve meldingen, en varsling til mottakeren, og et vedlegg.

Du finner alle tilgjengelige alternativer og tilhørende dokumentasjon via IntelliSense i din foretrukne kodeeditor.

### Tjenesteregistrering

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

### Implementering av korrespondanseklient

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

### Notater om autorisering
I eksempelet ovenfor bruker vi enum-verdien `CorrespondenceAuthorisation.Maskinporten` for å indikere at autorisering automatisk
skal håndteres internt med Maskinporten. Dette er den enkleste og mest praktiske metoden for autorisasjon, men det er ikke den eneste tilgjengelige.

Hvis du trenger tilpasset autoriseringslogikk i forbindelse med sending av meldinger, kan du bruke din egen delegat til dette formålet.

Et eksempel på dette kan være hvis du av diverse årsaker foretrekker å bruke den [eksterne Maskinporten-klienten](https://github.com/Altinn/altinn-apiclient-maskinporten).

Både `SendCorrespondencePayload` og `GetCorrespondenceStatusPayload` aksepterer et delegatparameter. Implementasjonen kan se slik ut:

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