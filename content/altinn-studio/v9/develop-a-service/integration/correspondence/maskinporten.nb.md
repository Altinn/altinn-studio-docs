---
draft: true
title: Sende meldinger med Maskinporten-autorisasjon
linktitle: Med Maskinporten
description: Slik sender du meldinger fra appen med appens Maskinporten-klient
weight: 100
toc: true
tags: [needsReview]
---

Appen sender meldinger på vegne av tjenesteeieren, ikke på vegne av brukeren som er logget inn. Derfor bruker appen Maskinporten når den snakker med meldingstjenesten.

Før du starter, må du ha satt opp en [Altinn-ressurs]({{< relref "/altinn-studio/v9/develop-a-service/integration/correspondence#altinn-ressurs" >}}) for meldingene.

## Legg til scopet for meldingstjenesten

Appens Maskinporten-klient må ha scopet `altinn:correspondence.write`.

1. Legg til `altinn:correspondence.write` i Altinn Studio. Se [Legge til Maskinporten-scopes]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten/add-scopes" >}}).
2. Publiser appen. Endringen trer i kraft neste gang du publiserer.
{.floating-bullet-numbers}

Standardscopene for tjenesteeier, som `altinn:serviceowner`, har alle v9-apper allerede. Dem trenger du ikke legge til.

Meldingsklienten bruker appens innebygde Maskinporten-klient. Du konfigurerer ikke noe i koden for å få et token. Se [Integrere Altinn-app med Maskinporten]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten" >}}) for hvordan appens Maskinporten-identitet fungerer.

## Sende en melding fra appkoden

Appen har meldingsklienten `ICorrespondenceClient` innebygd. Du trenger ikke registrere den selv, bare be om den i konstruktøren til klassen din.

En melding har mange mulige innstillinger, men bare noen få er påkrevd. `CorrespondenceRequestBuilder` hjelper deg å bygge meldingen steg for steg. Eksempelet under bygger en melding med

- selve meldingsteksten
- et varsel til mottakeren på e-post eller SMS
- et vedlegg

Du finner alle innstillingene og forklaringen til dem via IntelliSense i kodeeditoren din.

Når du sender meldingen, angir du hvordan appen skal hente token. Med `CorrespondenceAuthenticationMethod.Default()` henter appen et token fra Maskinporten og veksler det inn i et tjenesteeiertoken fra Altinn med scopet `altinn:correspondence.write`.

{{< code-title >}}
App/CorrespondenceClientDemo.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false,hl_lines=50 59" >}}
using System;
using System.IO;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
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
    // Ikke lukk strømmen selv. Klienten lukker den når opplastingen er ferdig.
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
          .WithEmailBody("You have a new message in your Altinn inbox, log in to see what's new.")
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
      new SendCorrespondencePayload(request, CorrespondenceAuthenticationMethod.Default())
    );
  }

  public async Task<GetCorrespondenceStatusResponse> GetMessageStatus(Guid correspondenceId)
  {
    return await correspondenceClient.GetStatus(
      new GetCorrespondenceStatusPayload(
        correspondenceId,
        CorrespondenceAuthenticationMethod.Default()
      )
    );
  }
}
{{< / highlight >}}

Når `Send` er ferdig, har meldingstjenesten godtatt meldingen, men den er ikke nødvendigvis levert til mottakeren ennå. Med `GetStatus` kan du sjekke om meldingen er publisert.

### Legge ved filer

Du gir vedlegget til `WithData` som en `Stream`, for eksempel rett fra en fil. Da holder ikke appen hele vedlegget i minnet, noe som er viktig for store vedlegg. Har du vedlegget som en byte-array, pakker du den inn selv med `WithData(new MemoryStream(bytes))`.

Klienten overtar strømmen og lukker den når opplastingen er ferdig. Du skal ikke lukke den selv.

### Hindre at meldingen blir sendt to ganger

Hvis koden din prøver å sende på nytt etter en feil, kan meldingen bli sendt to ganger. Det gjelder for eksempel kode i en prosess-hook, som kan kjøre flere ganger. Gi meldingen en fast nøkkel med `WithIdempotentKey(Guid)`, og bruk den samme nøkkelen hver gang du prøver på nytt. Lag nøkkelen ut fra noe som ikke endrer seg, for eksempel instansen og hva meldingen gjelder. En ny `Guid.NewGuid()` for hvert forsøk hindrer ingenting. Finnes meldingen allerede, får du en `CorrespondenceRequestException` med statuskoden `409 Conflict`. Da vet du at meldingen allerede er sendt.

Du kan ikke bruke nøkkelen når meldingen har flere mottakere.

### Registrere klassen

Registrer klassen din i `Program.cs`. I eksempelet heter grensesnittet `ITheInterfaceYouAreImplementing`. Bytt det ut med grensesnittet klassen din faktisk implementerer.

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false,hl_lines=5" >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  services.AddTransient<ITheInterfaceYouAreImplementing, CorrespondenceClientDemo>();
}
{{< / highlight >}}

## Bruke et eget token

`CorrespondenceAuthenticationMethod.Default()` passer for de fleste. Trenger du å hente tokenet på en annen måte, for eksempel med en egen Maskinporten-klient, kan du bruke `CorrespondenceAuthenticationMethod.Custom` med en delegat som returnerer tokenet.

Delegaten skal returnere et tjenesteeiertoken fra Altinn med scopet `altinn:correspondence.write`. Appen bruker tokenet til alle kallene den gjør mot meldingstjenesten for meldingen, også når den laster opp vedlegg.

```cs
new SendCorrespondencePayload(
  request,
  CorrespondenceAuthenticationMethod.Custom(async () =>
  {
    // Hent et Altinn-token med scopet altinn:correspondence.write
    string accessToken = await GetTokenFromYourOwnClient();
    return JwtToken.Parse(accessToken);
  })
);
```

`JwtToken` ligger i navnerommet `Altinn.App.Core.Models`. `GetCorrespondenceStatusPayload` tar imot `CorrespondenceAuthenticationMethod.Custom` på samme måte.

## Kommer du fra v8?

Dette er endret fra v8:

- **`CorrespondenceAuthorisation` finnes ikke lenger.** Bruk `CorrespondenceAuthenticationMethod.Default()` i stedet for `CorrespondenceAuthorisation.Maskinporten`.
- **Payloadene tar ikke lenger imot en delegat direkte.** Pakk delegaten inn i `CorrespondenceAuthenticationMethod.Custom(...)`.
- **`WithData(ReadOnlyMemory<byte>)` finnes ikke lenger.** Bruk `WithData(Stream)`. Har du en byte-array, bruker du `WithData(new MemoryStream(bytes))`.
- **`CorrespondenceAuthenticationMethod.Default()` ber også om scopene `altinn:serviceowner/instances.read` og `altinn:serviceowner/instances.write`.** Appens Maskinporten-klient må derfor ha dem. Alle v9-apper har dem automatisk.

`studioctl app upgrade v9` skriver om noen av disse kallene for deg og lister opp hver endring, slik at du kan se over dem:

- `CorrespondenceAuthorisation.Maskinporten` blir til `CorrespondenceAuthenticationMethod.Default()` når verdien står rett i kallet til payload-konstruktøren.
- En delegat som står rett i kallet, blir pakket inn i `CorrespondenceAuthenticationMethod.Custom(...)`.
- `WithData` med en byte-array blir til `WithData(new MemoryStream(...))` når verktøyet kan se at det er en byte-array.

Kall verktøyet ikke kan skrive om trygt, for eksempel når `CorrespondenceAuthorisation` ligger i en egen variabel, sier det fra om. Dem retter du selv.
