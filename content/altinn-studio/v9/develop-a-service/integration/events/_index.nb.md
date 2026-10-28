---
draft: true
title: Sende events fra appen
linktitle: Events
description: Slik slår du på eventene appen sender selv, og slik sender du dine egne events til Altinn Events
weight: 70
toc: true
tags: [needsReview]
---

Appen kan sende events til [Altinn Events]({{< relref "/events" >}}) når noe skjer med en instans, for eksempel når brukeren sender inn skjemaet. Andre systemer, for eksempel fagsystemet deres, kan abonnere på eventene og hente dataene når de er klare.

{{% notice info %}}
**I v9 kan appen bare sende events, ikke ta imot dem.** Trenger du at appen venter på svar fra et annet system, se [Hvis du tok imot events i v8](#fra-v8).
{{% /notice %}}

## Eventene appen sender selv

| Event | Når appen sender den |
|---|---|
| `app.instance.created` | når brukeren har startet en ny instans |
| `app.instance.process.movedTo.{taskId}` | når prosessen går til en ny oppgave, for eksempel `app.instance.process.movedTo.Task_2` |
| `app.instance.process.completed` | når prosessen er ferdig |
| `app.instance.substatus.changed` | når tjenesteeieren endrer substatusen på instansen |

Appen sender ikke disse eventene før du slår dem på. Sett `RegisterEventsWithEventsComponent` til `true` i `AppSettings`:

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

De tre første eventene sender appen ved siden av prosessen. Feiler sendingen, prøver appen igjen uten at prosessen stopper. Eventen om substatus sender appen med en gang. Feiler den, prøver ikke appen igjen.

## Sende dine egne events

Med `IEventsClient` kan du sende en event med et navn du velger selv, for eksempel når et bestemt steg i prosessen er ferdig. Appen sender disse eventene uansett hva `RegisterEventsWithEventsComponent` står på.

`AddEvent` tar navnet på eventen og instansen den gjelder:

```csharp
Task<string> AddEvent(
    string eventType,
    Instance instance,
    StorageAuthenticationMethod? authenticationMethod = null,
    Guid? idempotencyKey = null,
    CancellationToken cancellationToken = default
);
```

- `authenticationMethod` bestemmer hvem appen sender eventen som. Standard er brukeren som er logget inn. Kjører koden i prosessmotoren, der det ikke finnes noen innlogget bruker, sender appen eventen som tjenesteeieren.
- `idempotencyKey` sørger for at Altinn Events bare registrerer én event selv om appen sender den flere ganger med samme nøkkel.
- Metoden returnerer ID-en til eventen. Feiler sendingen, kaster den `PlatformHttpException`.

Eksempelet sender en event når prosessen er ferdig:

{{< code-title >}}
App/logic/SendFerdigEvent.cs
{{< /code-title >}}

```csharp
using Altinn.App.Core.Features;
using Altinn.App.Core.Features.Process;
using Altinn.App.Core.Internal.Events;

public sealed class SendFerdigEvent(IEventsClient eventsClient) : IOnProcessEndedHandler
{
    public async Task<HandlerResult> Execute(OnProcessEndedContext context)
    {
        await eventsClient.AddEvent(
            "app.instance.saksbehandling.klar",
            context.InstanceDataMutator.Instance,
            StorageAuthenticationMethod.ServiceOwner(),
            cancellationToken: context.CancellationToken
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

Appen kan bare ha én `IOnProcessEndedHandler`. Prosess-hooken kan kjøre flere ganger hvis noe feiler. Da kan appen sende eventen mer enn én gang, med mindre du gir `AddEvent` en `idempotencyKey` som er den samme hver gang hooken kjører for samme instans. Se [Prosess-hooks]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/process/pre-post-hooks" >}}) for mer om hookene.

Eventen inneholder ikke skjemadataene. Den sier hvilken instans det gjelder, og hvem som eier den. Den som abonnerer, henter dataene fra instansen.

## Abonnere på eventene

Abonnementet setter mottakeren opp i Altinn Events, ikke i appen. Se [Abonnere på events]({{< relref "/events/subscribe-to-events" >}}).

## Hvis du tok imot events i v8 {#fra-v8}

I v8 kunne appen ta imot events gjennom `IEventHandler` og endepunktet `eventsreceiver`. I v9 er dette fjernet, sammen med `IEventsSubscription` og `EventsSubscriptionClient`. `studioctl app upgrade v9` sier fra hvis appen bruker noe av dette, men endrer ikke koden for deg.

Hva du gjør i stedet, kommer an på hva appen brukte eventene til:

- **Appen abonnerte på sine egne events for å gjøre noe senere.** Legg arbeidet i en systemoppgave i prosessen i stedet. Se [Systemoppgaver]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks" >}}).
- **Appen ventet på svar fra et annet system.** La systemoppgaven vente på svaret. Den kan spørre igjen etter en pause, eller ta imot svaret som en melding i en postkasse. Svaret kommer da inn gjennom et endepunkt dere lager selv i appen. Se [Systemoppgaver med flere steg]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}).

Å sende events fungerer som i v8. `AddEvent(eventType, instance)` virker som før. De nye parameterne er valgfrie.

## Spørsmål du kan stille utviklerne

- Hvilke systemer abonnerer på eventene fra appen, og hvilke events trenger de?
- Har vi slått på `RegisterEventsWithEventsComponent` i appen?
- Tok appen imot events i v8, og hva gjør den i stedet nå?
