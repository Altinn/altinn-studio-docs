---
draft: true
title: Sende meldinger med Maskinporten-autorisasjon
linktitle: Med Maskinporten
description: Slik sender du meldinger fra appen med appens Maskinporten-klient.
weight: 100
toc: true
tags: [needsReview]
---

Appen sender meldinger på vegne av tjenesteeieren, ikke på vegne av brukeren som er logget inn. Derfor bruker appen Maskinporten når den snakker med meldingstjenesten.

Før du starter, må du ha satt opp en [Altinn-ressurs]({{< relref "/altinn-studio/v9/develop-a-service/integration/correspondence#altinn-ressurs" >}}) for meldingene.

## Legge til scopet for meldingstjenesten

Appens Maskinporten-klient må ha scopet `altinn:correspondence.write`.

1. Legg til `altinn:correspondence.write` i Altinn Studio. Se [Legge til Maskinporten-scopes]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten/add-scopes" >}}). Dialogen viser bare scopes virksomheten har tilgang til. Finner du ikke `altinn:correspondence.write`, må virksomheten først få tilgang til scopet.
2. Bygg en ny versjon av appen, og publiser den. Scopene blir med i versjonen når du bygger den. Publiserer du en eldre versjon på nytt, får den ikke det nye scopet.
{.floating-bullet-numbers}

Standardscopene for tjenesteeier, som `altinn:serviceowner`, legger Altinn Studio til automatisk når du bygger en v9-app. Dem trenger du ikke legge til.

Med `CorrespondenceAuthenticationMethod.Default()` bruker meldingsklienten appens innebygde Maskinporten-klient. Du konfigurerer ikke noe i koden for å få et token. Se [Integrere Altinn-app med Maskinporten]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten" >}}) for hvordan appens Maskinporten-identitet fungerer.

## Sende en melding fra appkoden

Appen har meldingsklienten `ICorrespondenceClient` innebygd. Du trenger ikke registrere den selv, bare be om den i konstruktøren til klassen din.

En melding har mange mulige innstillinger, men bare noen få er påkrevd. `CorrespondenceRequestBuilder` hjelper deg å bygge meldingen steg for steg. Eksempelet under bygger en melding med

- selve meldingsteksten
- et varsel til mottakeren på e-post eller SMS
- et vedlegg

Du finner alle innstillingene og forklaringen til dem via IntelliSense i kodeeditoren din.

Når du sender meldingen, angir du hvordan appen skal hente tokenet. Med `CorrespondenceAuthenticationMethod.Default()` henter appen et token fra Maskinporten og veksler det inn i et tjenesteeiertoken fra Altinn med scopet `altinn:correspondence.write`.

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
    // await using lukker strømmen hvis sendingen feiler før opplastingen.
    await using Stream attachmentData = File.OpenRead("path/to/attachment.txt");

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

Klienten lukker strømmen når den har lastet opp vedlegget. Feiler sendingen før det, for eksempel når appen ikke får token, lukker ikke klienten strømmen. Da må du lukke den selv, for eksempel med `await using` som i eksempelet. Det gjør ingenting om strømmen allerede er lukket.

Prøver du å sende på nytt, må du lage både meldingen og strømmen på nytt. Strømmen fra et tidligere forsøk kan allerede være lukket.

### Hindre at meldingen blir sendt to ganger

Hvis koden din prøver å sende på nytt etter en feil, kan meldingen bli sendt to ganger. Det gjelder for eksempel kode i en prosess-hook, som kan kjøre flere ganger. Gi meldingen en fast nøkkel med `WithIdempotentKey(Guid)`, og bruk den samme nøkkelen hver gang du prøver på nytt. En ny `Guid.NewGuid()` for hvert forsøk hindrer ingenting.

Nøkkelen må være unik i hele meldingstjenesten, ikke bare i appen din, og den må være den samme hver gang du prøver på nytt. Sender du meldingen fra en systemoppgave, kan du bruke `context.StepId` som nøkkel. Se [Gjøre oppgaven trygg å kjøre om igjen]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom#gjøre-oppgaven-trygg-å-kjøre-om-igjen" >}}). Sender appen bare én melding per instans, kan du bruke GUID-en til instansen.

Finnes det allerede en melding med samme nøkkel, får du en `CorrespondenceRequestException` med statuskoden `409 Conflict`. Det betyr bare at meldingstjenesten har tatt imot en melding med denne nøkkelen tidligere, ikke at den er publisert. Svaret inneholder ikke ID-en til meldingen. Vil du sjekke status, må du ha lagret meldings-ID-en (`CorrespondenceId`) fra svaret på det første forsøket, og kalle `GetStatus` med den. Meldingsklienten i appen kan ikke slå opp en melding ut fra nøkkelen.

Klienten laster opp vedleggene før den oppretter meldingen. Prøver du på nytt, laster den derfor opp vedleggene en gang til, også når du får `409 Conflict`. Disse vedleggene hører ikke til noen melding.

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

Delegaten skal returnere et tjenesteeiertoken fra Altinn. Tokenet må ha scopet `altinn:correspondence.write`, og bør ha `altinn:serviceowner`. Mangler tokenet `altinn:serviceowner`, må policyen til ressursen gi virksomheten din `write`, også når virksomheten din eier ressursen.

Appen kaller delegaten før hvert kall til meldingstjenesten. For en melding med vedlegg kan det bli mange kall, fordi appen sjekker status for hvert vedlegg opptil 60 ganger. Lagre derfor tokenet mellom kallene, og hent et nytt først når det er i ferd med å gå ut.

```cs
new SendCorrespondencePayload(
  request,
  CorrespondenceAuthenticationMethod.Custom(async () =>
  {
    // Hent et Altinn-token med scopene altinn:serviceowner og altinn:correspondence.write.
    // Gjenbruk tokenet til det er i ferd med å gå ut.
    string accessToken = await GetTokenFromYourOwnClient();
    return JwtToken.Parse(accessToken);
  })
);
```

`JwtToken` ligger i navnerommet `Altinn.App.Core.Models`. `GetCorrespondenceStatusPayload` tar imot `CorrespondenceAuthenticationMethod.Custom` på samme måte.

## Kommer du fra v8?

De viktigste endringene fra v8:

- **`CorrespondenceAuthorisation` finnes ikke lenger.** Bruk `CorrespondenceAuthenticationMethod.Default()` i stedet for `CorrespondenceAuthorisation.Maskinporten`.
- **Payloadene tar ikke lenger imot en delegat direkte.** Pakk delegaten inn i `CorrespondenceAuthenticationMethod.Custom(...)`.
- **`WithData(ReadOnlyMemory<byte>)` finnes ikke lenger.** Bruk `WithData(Stream)`. Har du en byte-array, bruker du `WithData(new MemoryStream(bytes))`.
- **`CorrespondenceAuthenticationMethod.Default()` ber også om scopene `altinn:serviceowner/instances.read` og `altinn:serviceowner/instances.write`.** Appens Maskinporten-klient må derfor ha dem. Altinn Studio legger dem til automatisk når du bygger en v9-app.
- **`ConfigureMaskinportenClient` finnes ikke lenger, og `MaskinportenSettings` er ikke lenger offentlig.** Du kan ikke lenger peke appens innebygde Maskinporten-klient mot egne innstillinger. Med `Default()` bruker meldingsklienten denne klienten, så `altinn:correspondence.write` må ligge på den.
- **Noen builder-metoder finnes ikke lenger:** `WithSender`, `WithRequestedSendTime`, `WithAllowSystemDeleteAfter`, `WithDataLocationType` og `WithRecipientToOverride`.
- **`CustomRecipient` heter nå `CustomRecipients`** og er en liste.

`studioctl app upgrade v9` skriver om noen av disse kallene for deg og lister opp hver endring, slik at du kan se over dem:

- `CorrespondenceAuthorisation.Maskinporten` blir til `CorrespondenceAuthenticationMethod.Default()` når verdien står rett i kallet til payload-konstruktøren.
- Et lambdauttrykk som står rett i kallet, blir pakket inn i `CorrespondenceAuthenticationMethod.Custom(...)`. Er delegaten en metode eller en variabel, sier verktøyet bare fra om kallet.
- `WithData` med en byte-array blir til `WithData(new MemoryStream(...))` når verktøyet kan se at det er en byte-array.
- Verktøyet fjerner kall til `WithSender`, `WithRequestedSendTime`, `WithAllowSystemDeleteAfter` og `WithDataLocationType`. v8 brukte ikke verdiene, så meldingen blir den samme. `CustomRecipient` blir til listen `CustomRecipients`, og `ICorrespondenceRequestBuilderSender` blir til `ICorrespondenceRequestBuilderSendersReference`. Kall til `WithRecipientToOverride` skriver ikke verktøyet om. Det sier bare fra om dem.

Verktøyet sier fra om kall det ikke trygt kan skrive om, for eksempel når `CorrespondenceAuthorisation` ligger i en egen variabel. Dem retter du selv.
