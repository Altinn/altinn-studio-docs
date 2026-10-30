---
draft: false
title: Sende hendelser til Altinn Events
linktitle: Hendelser
description: Slik slår du på hendelsene appen sender selv, og slik sender du dine egne hendelser til Altinn Events
weight: 70
toc: true
tags: [needsReview]
---

Appen kan sende hendelser til [Altinn Events]({{< relref "/events" >}}) når noe skjer med en instans, for eksempel når brukeren sender inn skjemaet. Andre systemer, for eksempel fagsystemet deres, kan abonnere på hendelsene og hente dataene når de er klare.

{{% notice info %}}
**I v9 kan appen bare sende hendelser, ikke ta imot dem.** Trenger du at appen venter på svar fra et annet system, se [Hvis du tok imot hendelser i v8](#fra-v8).
{{% /notice %}}

## Hendelsene appen sender selv

| Hendelse | Når appen sender den |
|---|---|
| `app.instance.created` | når en ny instans er opprettet |
| `app.instance.process.movedTo.{taskId}` | når prosessen går til en ny oppgave, for eksempel `app.instance.process.movedTo.Task_2` |
| `app.instance.process.completed` | når prosessen er ferdig |
| `app.instance.substatus.changed` | når tjenesteeieren endrer substatusen på instansen |

Appen sender ikke disse hendelsene før du slår dem på. Sett `RegisterEventsWithEventsComponent` til `true` i `AppSettings`:

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}

```json {hl_lines=[3]}
{
  "AppSettings": {
    "RegisterEventsWithEventsComponent": true
  }
}
```

Appmalen har innstillingen med verdien `false`. Endre verdien som står der.

De tre første hendelsene sender appen ved siden av prosessen. Feiler sendingen, prøver appen igjen uten at prosessen stopper. Hendelsen om substatus sender appen med en gang. Feiler den, prøver ikke appen igjen.

## Sende dine egne hendelser

Med `IEventsClient` kan du sende en hendelse med et navn du velger selv, for eksempel når et bestemt steg i prosessen er ferdig. Appen sender disse hendelsene uansett hva `RegisterEventsWithEventsComponent` står på.

`AddEvent` tar navnet på hendelsen og instansen den gjelder:

```csharp
Task<string> AddEvent(
    string eventType,
    Instance instance,
    StorageAuthenticationMethod? authenticationMethod = null,
    Guid? idempotencyKey = null,
    CancellationToken cancellationToken = default
);
```

- `authenticationMethod` bestemmer hvem appen sender hendelsen som. Standard er brukeren som er logget inn. Kjører koden i prosessmotoren, der det ikke finnes noen innlogget bruker, sender appen hendelsen som tjenesteeieren.
- `idempotencyKey` sørger for at Altinn Events bare registrerer én hendelse selv om appen sender den flere ganger med samme nøkkel. Nøkkelen gjelder på tvers av alle hendelser, så den må være unik for hver hendelse og instans. Bruker du GUID-en til instansen som nøkkel, kan du bare sende én hendelse for den instansen.
- Metoden returnerer ID-en til hendelsen. Feiler sendingen, kaster den `PlatformHttpException`.

Eksempelet sender en hendelse når prosessen er ferdig:

{{< code-title >}}
App/logic/SendFerdigEvent.cs
{{< /code-title >}}

```csharp
using System.Security.Cryptography;
using System.Text;
using Altinn.App.Core.Features;
using Altinn.App.Core.Features.Process;
using Altinn.App.Core.Internal.Events;
using Altinn.Platform.Storage.Interface.Models;

public sealed class SendFerdigEvent(IEventsClient eventsClient) : IOnProcessEndedHandler
{
    private const string EventType = "app.instance.saksbehandling.klar";

    public async Task<HandlerResult> Execute(OnProcessEndedContext context)
    {
        Instance instance = context.InstanceDataMutator.Instance;
        Guid idempotencyKey = new(MD5.HashData(Encoding.UTF8.GetBytes($"{EventType}/{instance.Id}")));

        await eventsClient.AddEvent(
            EventType,
            instance,
            StorageAuthenticationMethod.ServiceOwner(),
            idempotencyKey,
            context.CancellationToken
        );

        return HandlerResult.Success();
    }
}
```

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false,hl_lines=9" >}}
using Altinn.App.Core.Features.Process;

void RegisterCustomAppServices(
  IServiceCollection services,
  IConfiguration config,
  IWebHostEnvironment env
)
{
  services.AddTransient<IOnProcessEndedHandler, SendFerdigEvent>();
}
{{< / highlight >}}

Appen kan bare ha én `IOnProcessEndedHandler`. Prosess-hooken kan kjøre flere ganger hvis noe feiler. Derfor lager eksempelet nøkkelen ut fra navnet på hendelsen og ID-en til instansen. Da får hendelsen samme nøkkel hver gang hooken kjører for samme instans, og Altinn Events registrerer den bare én gang. Se [Prosess-hooks]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/process/pre-post-hooks" >}}) for mer om hookene.

Hendelsen inneholder ikke skjemadataene. Den sier hvilken instans det gjelder, og hvem som eier den. Den som abonnerer, henter dataene fra instansen.

## Abonnere på hendelsene

Abonnementet setter mottakeren opp i Altinn Events, ikke i appen. Se [Abonnere på hendelser]({{< relref "/events/subscribe-to-events" >}}).

Altinn Events lover ikke at hendelsene kommer i riktig rekkefølge, eller at hver hendelse kommer bare én gang. Mottakeren må tåle at samme hendelse kommer flere ganger, og at en senere hendelse kommer før en tidligere.

## Hvis du tok imot hendelser i v8 {#fra-v8}

I v8 kunne appen ta imot hendelser gjennom `IEventHandler` og endepunktet `eventsreceiver`. I v9 er dette fjernet, sammen med `IEventsSubscription` og `EventsSubscriptionClient`. `studioctl app upgrade v9` sier fra hvis appen bruker noe av dette, men endrer ikke koden for deg.

Hva du gjør i stedet, kommer an på hva appen brukte hendelsene til:

- **Appen abonnerte på sine egne hendelser for å gjøre noe senere.** Legg arbeidet i en systemoppgave i prosessen i stedet. Se [Systemoppgaver]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks" >}}).
- **Appen ventet på svar fra et annet system.** La systemoppgaven vente på svaret. Den kan spørre igjen etter en pause, eller ta imot svaret som en melding i en postkasse. Svaret kommer da inn gjennom et endepunkt dere lager selv i appen. Se [Systemoppgaver med flere steg]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}).

Å sende hendelser fungerer som i v8. `AddEvent(eventType, instance)` virker som før. De nye parameterne er valgfrie.

## Spørsmål du kan stille utviklerne

- Hvilke systemer abonnerer på hendelsene fra appen, og hvilke hendelser trenger de?
- Har vi slått på `RegisterEventsWithEventsComponent` i appen?
- Tok appen imot hendelser i v8, og hva gjør den i stedet nå?
