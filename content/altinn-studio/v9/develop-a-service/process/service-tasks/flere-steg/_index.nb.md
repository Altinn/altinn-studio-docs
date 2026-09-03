---
draft: true
title: Systemoppgaver med flere steg
linktitle: Flere steg
description: Slik deler du en systemoppgave i flere arbeidssteg, og lar den vente på svar utenfra
tags: [altinn-apps, process, bpmn, task, service task, systemoppgave, needsReview, translate-to-english]
---

En systemoppgave som gjør én ting, skriver du med `IServiceTask`. Se [Lage en egendefinert systemoppgave]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}).

Skal oppgaven gjøre flere ting etter hverandre, deler du den i **arbeidssteg** (`Stage` i koden) med `IPipelineServiceTask`. Det gjelder når oppgaven sender noe og venter på svar, eller kaller flere systemer i rekkefølge. Plattformen husker hvert arbeidssteg som er ferdig, slik at en feil sent i oppgaven ikke sender bestillingen din på nytt.

{{% notice info %}}
Denne siden gir oversikten. Utviklerne finner alle detaljene i [`docs/service-task-pipelines.md`](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/docs/service-task-pipelines.md) i kodebasen for app-biblioteket.
{{% /notice %}}

## Dele oppgaven i arbeidssteg

Du setter sammen arbeidsstegene i `Define`. Sammensetningen må slutte med én avslutning: `Finally` for arbeid som blir ferdig av seg selv eller ved å spørre igjen, eller `ConcludeOnReplies` for arbeid som en melding svarer på.

{{< code-title >}}
App/logic/ServiceTasks/ArchiveServiceTask.cs
{{< /code-title >}}

```csharp
using Altinn.App.Core.Features.Process;

namespace Altinn.App.Logic.ServiceTasks;

public class ArchiveServiceTask : IPipelineServiceTask
{
    // IArchiveClient er ditt eget grensesnitt mot arkivet, ikke noe plattformen har.
    private readonly IArchiveClient _archive;

    public ArchiveServiceTask(IArchiveClient archive)
    {
        _archive = archive;
    }

    public string Type => "archive";

    public ServiceTaskPipeline Define(ServiceTaskPipelineBuilder pipeline) =>
        pipeline
            .Stage(SendToArchive)
            .Finally(AwaitConfirmation, new ProcessStepOptions { WaitBudget = TimeSpan.FromHours(6) });

    private async Task<ServiceTaskStageResult> SendToArchive(ServiceTaskContext context)
    {
        // context.StepId er den samme gjennom alle forsøk på dette arbeidssteget.
        // Bruk den som nøkkel, slik at arkivet kjenner igjen en sending det har fått før.
        await _archive.Send(context.StepId, context.InstanceDataMutator.Instance);

        return ServiceTaskStageResult.Completed();
    }

    private async Task<ServiceTaskResult> AwaitConfirmation(ServiceTaskContext context)
    {
        if (await _archive.IsDelivered(context.StepId))
        {
            return ServiceTaskResult.Success();
        }

        if (context.Wait.IsFinalCheck)
        {
            return ServiceTaskResult.FailedPermanent("Arkivet bekreftet ikke leveringen innen fristen.");
        }

        return ServiceTaskResult.Defer(TimeSpan.FromMinutes(2), "venter på bekreftelse fra arkivet");
    }
}
```

Oppgaver med flere arbeidssteg registrerer du på `IPipelineServiceTask`:

```csharp
services.AddTransient<IArchiveClient, ArchiveClient>();
services.AddTransient<IPipelineServiceTask, ArchiveServiceTask>();
```

`Define` kjører hver gang plattformen skal finne ut hva som er neste arbeidssteg, og når appen starter. Den skal derfor være billig og forutsigbar, og ikke gjøre noe arbeid selv. Selve arbeidet hører til inne i arbeidsstegene.

Setter du sammen noe ugyldig, for eksempel et arbeidssteg uten avslutning eller en postkasse ingen svarer på, feiler appen når den starter. Da får du feilen med en gang, ikke først når en bruker treffer oppgaven.

## Svare fra et arbeidssteg

Et arbeidssteg svarer med `ServiceTaskStageResult`:

| Svar | Dette skjer |
| --- | --- |
| `Completed()` | Arbeidssteget er ferdig, og oppgaven går videre til neste. Plattformen lagrer dataendringene, og senere arbeidssteg ser dem. Et ferdig arbeidssteg kjører aldri om igjen. |
| `Defer(delay, reason)` | Arbeidssteget gikk bra, men svaret det venter på har ikke kommet. Plattformen parkerer prosessen og kjører arbeidssteget på nytt etter `delay`. |
| `FailedRetryable("melding")` | Noe gikk galt som kan gå bedre om litt. Plattformen prøver arbeidssteget på nytt. |
| `FailedPermanent("melding")` | Noe gikk galt som ikke retter seg selv. Plattformen gir opp. |

Bare avslutningen kan si at hele oppgaven er ferdig og at prosessen skal gå videre. Derfor svarer `Finally` med `ServiceTaskResult`, som i tillegg har `Success(action)` og `SuccessWithoutAutoAdvance()`.

## Vente på svar

`Defer` betyr «alt gikk bra, men svaret er ikke kommet». Plattformen holder ikke serveren opptatt mens oppgaven venter, og kjører oppgaven på nytt etter den pausen du oppgir.

- Ventetiden til sammen har en frist, `WaitBudget`. Sett fristen på avslutningen, ikke på hele oppgaven, slik at arbeidssteg som aldri venter, ikke arver den.
- `context.Wait` forteller hvor langt ventingen er kommet: `DeferCount`, `StartedAt`, `Deadline`, `Remaining` og `IsFinalCheck`. Bruk dem til å spørre ofte i starten og sjeldnere etter hvert, og til å avslutte med en melding som sier hva som aldri kom.
- Teksten du sender med i `reason`, lagrer plattformen på steget og viser den videre, blant annet i ventevisningen brukeren ser. Skriv den for et menneske.
- Et forsøk som venter, lagrer ingenting. Arbeid som skal etterlate et spor, hører til i sitt eget arbeidssteg foran ventingen.

## Få svaret som en melding

Kommer svaret som en melding utenfra i stedet for at appen spør igjen, åpner arbeidssteget en **postkasse** (mailbox i koden). Postkassen har en id som er adressen svaret må komme tilbake til, og en frist for hvor lenge den tar imot meldinger.

```csharp
public ServiceTaskPipeline Define(ServiceTaskPipelineBuilder pipeline) =>
    pipeline
        .Stage(SendOrder, new MailboxOptions { Timeout = TimeSpan.FromDays(14) }, out MailboxHandle svar)
        .ConcludeOnReplies(svar, onMessage: HandleAnswer, onClosed: HandleClosed);

private async Task<ServiceTaskOpeningStageResult> SendOrder(ServiceTaskContext context, ServiceTaskMailbox mailbox)
{
    // Send mailbox.Id med bestillingen, i det feltet mottakeren sender tilbake.
    // Uten den finner ikke svaret veien tilbake til oppgaven.
    await _partner.PlaceOrder(context.StepId, mailbox.Id);

    return ServiceTaskOpeningStageResult.Completed();
}

private async Task<ServiceTaskExchangeResult> HandleAnswer(ServiceTaskContext context, ServiceTaskReply reply)
{
    // reply.Payload kommer utenfra. Kontroller innholdet før du bruker det.
    if (!TryLesSvar(reply.Payload, out Svar? svar))
    {
        return ServiceTaskResult.FailedPermanent("Kunne ikke lese svaret fra samarbeidspartneren.");
    }

    return svar.Ferdig ? ServiceTaskResult.Success() : ServiceTaskExchangeResult.AwaitNextReply();
}

private Task<ServiceTaskResult> HandleClosed(ServiceTaskContext context, MailboxClosedReason reason) =>
    Task.FromResult(ServiceTaskResult.FailedPermanent("Fikk aldri svar fra samarbeidspartneren."));
```

Slik henger delene sammen:

- Arbeidssteget som åpner postkassen, må publisere `mailbox.Id` i det feltet mottakeren svarer tilbake i. Id-en er adressen, og ingenting annet finner veien tilbake.
- Fristen i `MailboxOptions.Timeout` løper fra oppgaven åpner postkassen, og ingen melding forlenger den. Fristen kan godt være flere dager.
- Kanalen som tar imot svaret hos dere, for eksempel en lytter på en meldingskø eller et endepunkt, sender meldingen videre med `IServiceTaskReplyForwarder.ForwardReply(mailboxId, serviceTaskType, payload, idempotencyKey)`, og gjør ikke noe arbeid selv. Bruk avsenderens egen meldings-id som `idempotencyKey`, siden samme melding kan komme flere ganger.
- `onMessage` kjører én gang per melding. `AwaitNextReply()` betyr «denne er håndtert, vent på neste». `Success()` avslutter utvekslingen, og plattformen lukker postkassen først, slik at ingen senere melding lander i en utveksling som allerede er svart på.
- `onClosed` kjører når postkassen er lukket uten at oppgaven har konkludert, fordi fristen gikk ut eller fordi noen lukket den. Der bestemmer du om det er kritisk (`FailedPermanent`) eller noe oppgaven kan leve med.
- Id-en til postkassen er umulig å gjette, men den er ikke en hemmelighet. Den er en adresse, ikke bevis for hvem som sendte meldingen.

Fiks Arkiv er det ferdige eksempelet i plattformen: oppgaven sender id-en til postkassen som `klientKorrelasjonsId`, og lytteren leser den tilbake fra svaret og sender meldingen videre.

## Endre en oppgave mens instanser er underveis

Formen på oppgaven låser seg når prosessen starter overgangen, og plattformen kjenner igjen arbeidsstegene på plasseringen i rekken. Ruller du ut en ny versjon som setter inn, fjerner eller bytter om på arbeidssteg, mister instansene som er underveis sporet. De feiler, eller de hopper over arbeid uten å feile.

Dette er samme problem som å endre en BPMN-fil mens instanser er i gang, og det er utviklerne som må håndtere det: la instansene som er underveis, bli ferdige på koden de startet på, eller avslutt dem bevisst før utrullingen.

## Ikke overstyr `Define` i en enkel oppgave

`IServiceTask` er en oppgave med bare én avslutning: plattformen svarer `Finally(Execute)` for deg. Skriver du din egen `Define` i en klasse som implementerer `IServiceTask`, blir `Execute` død kode, og det får du en byggefeil for. Trenger du flere arbeidssteg, bruker du `IPipelineServiceTask` i stedet.
