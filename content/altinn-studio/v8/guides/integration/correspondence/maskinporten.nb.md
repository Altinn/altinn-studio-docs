---
title: Bruke meldingstjenesten med Maskinporten-autorisasjon
linktitle: Med Maskinporten
weight: 100
toc: true
---

På [forrige side](/nb/altinn-studio/v8/guides/integration/) gikk vi gjennom hvordan man setter opp en [ressurs](/nb/altinn-studio/v8/guides/integration/correspondence/#altinn-ressurs) og versjonskravene
for meldingsklienten.

Vi kan nå gå videre til [oppsett av Maskinporten](#maskinporten) og [applikasjonskode](#applikasjonskode).

## Maskinporten

For å bruke [meldingstjenesten](/nb/correspondence/) behøver man en [Maskinporten](/nb/authorization/getting-started/authentication/maskinporten/)-klient med tilgang til følgende scopes:

- `altinn:serviceowner`
- `altinn:correspondence.read`
- `altinn:correspondence.write`
{.correspondence-custom-list}

For å sette opp dette legger du til scopene i Altinn Studio som beskrevet i [veiledningen for Maskinporten-integrasjon](/nb/altinn-studio/v8/guides/integration/maskinporten/). Når appen publiseres, oppretter Altinn Studio Maskinporten-klienten og monterer generert `MaskinportenSettings` i appen.

Meldingsklienten finner og bruker automatisk den innebygde Maskinporten-klienten med standard konfigurasjonssti `MaskinportenSettings`.

{{% expandlarge id="legacy-correspondence-maskinporten-config" header="Vis eldre egendefinert Maskinporten-konfigurasjon" %}}

Hvis du trenger en annen konfigurasjonssti, kan du konfigurere den med hjelp av `ConfigureMaskinportenClient`:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{<highlight csharp "linenos=false,hl_lines=5">}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  services.ConfigureMaskinportenClient("DinUnikeMaskinportenSettingsSti");
}
{{</highlight>}}

Hvis du trenger et tilpasset konfigurasjonsoppsett, kan du bruke en delegatmetode:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{<highlight csharp "linenos=false,hl_lines=5-10">}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  services.ConfigureMaskinportenClient(maskinportenConfig =>
  {
    maskinportenConfig.Authority = "https://[test.]maskinporten.no/";
    maskinportenConfig.ClientId = "klient-id";
    maskinportenConfig.JwkBase64 = "base64-kodet jwk";
  });
}
{{</highlight>}}

{{% /expandlarge %}}

## Applikasjonskode

Ved å bruke avhengighetsinjeksjon i .NET, kan du registrere at tjenesten din trenger en `ICorrespondenceClient`.
Denne klienten kan deretter brukes til å sende meldinger og vil automatisk håndtere Maskinporten-autorisering.

Når du skal sende en melding, finnes det veldig mange tilgjengelige parametere. Selv om bare et fåtall er nødvendige,
kan selve prosessen med å bygge forespørselen være litt overveldende. For å hjelpe med dette, er det et `CorrespondenceRequestBuilder`-grensesnitt tilgjengelig.

Eksempelet nedenfor bruker dette grensenittet til å bygge en meldingsforespørsel med de vanligste alternativene:
selve meldingen, en varsling til mottakeren, og et vedlegg.

Du finner alle tilgjengelige alternativer og tilhørende dokumentasjon via IntelliSense i din foretrukne kodeeditor.

{{<notice info>}}
Vedleggsdata kan oppgis enten som en `Stream` med `WithData(Stream)` eller som en byte-array med `WithData(ReadOnlyMemory<byte>)`. Klienten laster opp vedlegget til meldingstjenesten som en strøm i begge tilfeller, men vi anbefaler at du sender en `Stream` (slik eksempelet nedenfor viser): da kan du strømme dataene hele veien, for eksempel direkte fra en fil, uten å holde hele vedlegget i minnet. Dette er viktig for store vedlegg.

Når du sender en `Stream`, overtar klienten ansvaret for den og lukker den når opplastingen er fullført, så du skal ikke lukke den selv.
{{</notice>}}

### Tjenesteregistrering

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

### Implementering av korrespondanseklient

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

    // Vedleggsdataene strømmes til meldingstjenesten.
    // Ikke lukk strømmen selv: klienten overtar ansvaret og lukker den når opplastingen er fullført.
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
