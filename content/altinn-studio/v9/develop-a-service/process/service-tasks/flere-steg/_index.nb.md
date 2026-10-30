---
title: Systemoppgaver med flere steg
linktitle: Flere steg
description: Slik deler du en systemoppgave i flere arbeidssteg, og lar den vente på svar utenfra
tags: [altinn-apps, process, bpmn, task, service task, systemoppgave, needsReview]
---

En systemoppgave setter du sammen i `DefineExecute`. En oppgave som gjør én ting, består bare av avslutningen: `pipeline.Finally(Execute)`. Se [Lage en egendefinert systemoppgave]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}).

Skal oppgaven gjøre flere ting etter hverandre, deler du den i **arbeidssteg** (`Stage` i koden) foran avslutningen. Det gjelder når oppgaven sender noe og venter på svar, eller kaller flere systemer i rekkefølge. Plattformen husker hvert arbeidssteg som er ferdig, slik at en feil sent i oppgaven ikke sender bestillingen din på nytt.

{{% notice info %}}
Denne siden gir oversikten. Utviklerne finner alle detaljene i [`docs/service-task-pipelines.md`](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/docs/service-task-pipelines.md) i kodebasen for app-biblioteket.
{{% /notice %}}

## Dele oppgaven i arbeidssteg

Du setter sammen arbeidsstegene i `DefineExecute`. Sammensetningen må slutte med én avslutning: `Finally` for arbeid som blir ferdig av seg selv eller ved å spørre igjen, eller `ConcludeOnReplies` for arbeid som en melding svarer på.

{{< code-title >}}
App/logic/ServiceTasks/ArchiveServiceTask.cs
{{< /code-title >}}

```csharp
using Altinn.App.Core.Features;
using Altinn.App.Core.Features.Process;
using Altinn.App.Models;

namespace Altinn.App.Logic.ServiceTasks;

public class ArchiveServiceTask : IServiceTask
{
    // IArchiveClient er ditt eget grensesnitt mot arkivet, ikke noe plattformen har.
    private readonly IArchiveClient _archive;

    public ArchiveServiceTask(IArchiveClient archive)
    {
        _archive = archive;
    }

    public string Type => "archive";

    public ServiceTaskPipeline DefineExecute(PipelineBuilder pipeline) =>
        pipeline
            .Stage(SendToArchive)
            .Finally(AwaitConfirmation, new ProcessStepOptions { WaitBudget = TimeSpan.FromHours(6) });

    private async Task<StageResult> SendToArchive(StageContext context)
    {
        Datamodell? skjemadata = await context.InstanceDataMutator.GetFormData<Datamodell>();

        if (skjemadata is null)
        {
            return StageResult.FailedPermanent("Instansen mangler skjemadata.");
        }

        // context.StepId er den samme gjennom alle forsøk på dette arbeidssteget.
        // Bruk den som nøkkel, slik at arkivet kjenner igjen en sending det har fått før.
        string referanse = await _archive.Send(context.StepId, context.InstanceDataMutator.Instance);

        // Avslutningen kjører som sitt eget steg, med sin egen StepId. Lagre referansen
        // fra arkivet i skjemadataene, så finner AwaitConfirmation den igjen.
        skjemadata.Arkivreferanse = referanse;

        return StageResult.Completed();
    }

    private async Task<ServiceTaskResult> AwaitConfirmation(StageContext context)
    {
        Datamodell? skjemadata = await context.InstanceDataMutator.GetFormData<Datamodell>();

        if (skjemadata?.Arkivreferanse is null)
        {
            return ServiceTaskResult.FailedPermanent("Instansen mangler referansen fra arkivet.");
        }

        if (await _archive.IsDelivered(skjemadata.Arkivreferanse))
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

Oppgaven registrerer du på `IServiceTask`, som alle andre systemoppgaver:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp
services.AddTransient<IArchiveClient, ArchiveClient>();
services.AddTransient<IServiceTask, ArchiveServiceTask>();
```

`DefineExecute` kjører hver gang plattformen skal finne ut hva som er neste arbeidssteg, og når appen starter. Den skal derfor være billig og forutsigbar, og ikke gjøre noe arbeid selv. Selve arbeidet hører til inne i arbeidsstegene.

Arbeidsstegene og avslutningen kjører som hvert sitt steg, med hver sin `StepId`. Det et senere steg trenger å vite, lagrer du i instansdataene gjennom `context.InstanceDataMutator`, slik eksempelet gjør med referansen fra arkivet. Plattformen lagrer endringene når arbeidssteget er ferdig, og alle senere steg ser dem.

Setter du sammen noe ugyldig, for eksempel et arbeidssteg uten avslutning eller en postkasse ingen svarer på, feiler appen når den starter. Da får du feilen med en gang, ikke først når en bruker treffer oppgaven.

## Svare fra et arbeidssteg

Et arbeidssteg svarer med `StageResult`:

| Svar | Dette skjer |
| --- | --- |
| `Completed()` | Arbeidssteget er ferdig, og oppgaven går videre til neste. Plattformen lagrer dataendringene, og senere arbeidssteg ser dem. Et ferdig arbeidssteg kjører aldri om igjen. |
| `Defer(delay, reason)` | Arbeidssteget gikk bra, men svaret det venter på har ikke kommet. Prosessen står på steget, og plattformen kjører arbeidssteget på nytt etter `delay`. |
| `FailedRetryable("melding")` | Noe gikk galt som kan gå bedre om litt. Plattformen prøver arbeidssteget på nytt. |
| `FailedPermanent("melding")` | Noe gikk galt som ikke retter seg selv. Plattformen gir opp. |

Bare avslutningen kan si at hele oppgaven er ferdig og at prosessen skal gå videre. Derfor svarer `Finally` med `ServiceTaskResult`, som i tillegg har `Success(action)`. `Success` flytter alltid prosessen videre. Det ene unntaket er et arbeidssteg som åpner en postkasse: det kan [avslutte hele oppgaven fra sendingen](#avslutte-oppgaven-fra-sendingen).

## Gi hvert steg sine egne tidsrammer

Tidsavbrudd, nye forsøk og ventefrist gir du steget der du setter det sammen, som `options`-argumentet til `Stage`, `HandleReplies`, `Finally` eller `ConcludeOnReplies`. Hvert steg får akkurat det kallet oppgir. Et felt du ikke setter, får standardverdien i plattformen, aldri verdien fra et annet steg. Skal flere steg ha de samme valgene, sender du det samme `ProcessStepOptions`-objektet til hvert av dem. Se [Styre tidsbruk og nye forsøk]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}#styre-tidsbruk-og-nye-forsøk) for hva feltene betyr.

## Vente på svar

`Defer` betyr «alt gikk bra, men svaret er ikke kommet». Plattformen holder ikke serveren opptatt mens oppgaven venter, og kjører oppgaven på nytt etter den pausen du oppgir.

- Ventetiden til sammen har en frist, `WaitBudget`. Sett fristen på `Finally`, steget som venter.
- `context.Wait` forteller hvor langt ventingen er kommet: `DeferCount`, `StartedAt`, `Deadline`, `Remaining` og `IsFinalCheck`. Bruk dem til å spørre ofte i starten og sjeldnere etter hvert, og til å avslutte med en melding som sier hva som aldri kom.
- Teksten du sender med i `reason`, lagrer plattformen på steget, og den følger med i prosessdataene og driftsverktøyene. Ingen av standardvisningene viser den til brukeren, så skal brukeren se den, må du [lage din egen side]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/visning" >}}). Skriv den likevel for et menneske.
- Et forsøk som venter, lagrer ingenting, og endrer forsøket data mens det venter, avviser plattformen forsøket. Arbeid som skal etterlate et spor, hører til i sitt eget arbeidssteg foran ventingen.

## Få svaret som en melding

Kommer svaret som en melding utenfra i stedet for at appen spør igjen, åpner arbeidssteget en **postkasse** (mailbox i koden). Postkassen har en id som er adressen svaret må komme tilbake til, og en frist for hvor lenge den tar imot meldinger.

{{< code-title >}}
App/logic/ServiceTasks/ArchiveServiceTask.cs
{{< /code-title >}}

```csharp
public ServiceTaskPipeline DefineExecute(PipelineBuilder pipeline) =>
    pipeline
        .Stage(SendOrder, new MailboxOptions { Timeout = TimeSpan.FromDays(14) }, out MailboxHandle svar)
        .ConcludeOnReplies(svar, onMessage: HandleAnswer, onClosed: HandleClosed);

// _partner, TryLesSvar og Svar er dine egne, på samme måte som IArchiveClient over.
private async Task<ServiceTaskOpeningStageResult> SendOrder(StageContext context, ServiceTaskMailbox mailbox)
{
    // Send mailbox.Id med bestillingen, i det feltet mottakeren sender tilbake.
    // Uten den finner ikke svaret veien tilbake til oppgaven.
    await _partner.PlaceOrder(context.StepId, mailbox.Id);

    return ServiceTaskOpeningStageResult.Completed();
}

private async Task<ServiceTaskExchangeResult> HandleAnswer(StageContext context, ServiceTaskReply reply)
{
    // reply.Payload kommer utenfra. Kontroller innholdet før du bruker det.
    if (!TryLesSvar(reply.Payload, out Svar? svar))
    {
        return ServiceTaskResult.FailedPermanent("Kunne ikke lese svaret fra samarbeidspartneren.");
    }

    return svar.Ferdig ? ServiceTaskResult.Success() : ServiceTaskExchangeResult.AwaitNextReply();
}

private Task<ServiceTaskResult> HandleClosed(StageContext context, MailboxClosedReason reason) =>
    // Typeargumentet er nødvendig: uten det blir returtypen Task<FailedServiceTaskResult>, som ikke kompilerer.
    Task.FromResult<ServiceTaskResult>(ServiceTaskResult.FailedPermanent("Fikk aldri svar fra samarbeidspartneren."));
```

Slik henger delene sammen:

- Arbeidssteget som åpner postkassen, må publisere `mailbox.Id` i det feltet mottakeren svarer tilbake i. Id-en er adressen, og ingenting annet finner veien tilbake.
- Fristen i `MailboxOptions.Timeout` løper fra oppgaven åpner postkassen, og ingen melding forlenger den. Fristen kan godt være flere dager, men plattformen godtar ikke mer enn 21 døgn. Den grensen kan du ikke oppdage ved oppstart: avvisningen kommer når oppgaven prøver å åpne postkassen.
- Kanalen som tar imot svaret hos dere, for eksempel en lytter på en meldingskø eller et endepunkt, sender meldingen videre med `IServiceTaskReplyForwarder.ForwardReply(mailboxId, serviceTaskType, payload, idempotencyKey)`, og gjør ikke noe arbeid selv. Bruk avsenderens egen meldings-id som `idempotencyKey`, siden samme melding kan komme flere ganger.
- `onMessage` kjører én gang per melding. `AwaitNextReply()` betyr «denne er håndtert, vent på neste». `Success()` avslutter utvekslingen, og plattformen lukker postkassen først, slik at ingen senere melding lander i en utveksling som allerede er svart på.
- `onClosed` kjører når postkassen er lukket uten at oppgaven har konkludert, fordi fristen gikk ut eller fordi noen lukket den. Der bestemmer du om det er kritisk (`FailedPermanent`) eller noe oppgaven kan leve med.
- Id-en til postkassen er umulig å gjette, men den er ikke en hemmelighet. Den er en adresse, ikke bevis for hvem som sendte meldingen.

Fiks Arkiv er det innebygde eksempelet i plattformen: oppgaven sender id-en til postkassen som `klientKorrelasjonsId`, og lytteren leser den tilbake fra svaret og sender meldingen videre.

### Avslutte oppgaven fra sendingen

Arbeidssteget som åpner postkassen, svarer med `ServiceTaskOpeningStageResult`. Det har de samme svarene som et vanlig arbeidssteg, og i tillegg `Conclude(result)`, som avslutter hele oppgaven fra sendingen. Plattformen lukker alle postkassene oppgaven har åpnet, og ingenting av det du satte sammen etter arbeidssteget, kjører. Resultatet du sender med, avgjør hva som skjer videre: `Success(action)` flytter prosessen videre, og `FailedPermanent("melding")` lar oppgaven feile med postkassene lukket. Sender du med `FailedRetryable` eller `Defer`, avslutter det ingenting og virker som det vanlige svaret fra et arbeidssteg.

{{< code-title >}}
App/logic/ServiceTasks/ArchiveServiceTask.cs
{{< /code-title >}}

```csharp
if (!await _partner.RecipientExists(recipient))
{
    return ServiceTaskOpeningStageResult.Conclude(
        ServiceTaskResult.FailedPermanent("Mottakeren finnes ikke hos samarbeidspartneren.")
    );
}
```

Bruk `Conclude` bare når sendingen alene avgjør saken, for eksempel når mottakeren ikke finnes, slik at det ikke er noe poeng i å vente på et svar som aldri kommer. I to tilfeller skal du ikke avslutte:

- Vet du ikke om sendingen kom frem, for eksempel etter et tidsavbrudd, svarer du `FailedRetryable`. Sendingen kan ha gått, og en avslutning ville lukket postkassen svaret trenger.
- Er feilen hos dere, for eksempel avviste påloggingsopplysninger eller feil konfigurasjon, svarer du `FailedPermanent` uten `Conclude`. Da står postkassen åpen, og når noen har rettet feilen og gjenopptatt oppgaven, kjører sendingen på nytt, og oppgaven kan fullføre utvekslingen.

## Navn på stegene

Der noen følger med på oppgaven, for eksempel i administrasjonspanelet i Altinn Studio, får hvert steg navnet på metoden du sendte inn som arbeidet, skrevet som ord: `SendToArchive` blir «Send to archive», og `StoreReceipt` blir «Store receipt». Behandleren som svarer på en postkasse, kjører én av to metoder, avhengig av om det kom en melding eller om postkassen ble lukket, og får navnet på begge: «Handle answer / Handle closed». Sender du inn en lambda i stedet for en metode, får steget ikke noe navn. Det får heller ikke `Execute` i en oppgave som bare består av avslutningen, siden navnet ikke sier mer enn oppgavetypen gjør.

Navnet er bare til visning. Bytter du navn på en metode, endrer det ingenting i hvordan steget kjører, heller ikke for instanser som er underveis, fordi plattformen kjenner igjen stegene på plasseringen i rekken.

## Arbeidssteg når en oppgave starter, avsluttes eller avbrytes

Arbeidet en oppgave gjør når den starter, avsluttes eller avbrytes, setter du sammen på samme måte, av de samme arbeidsstegene. Det gjelder alle oppgavetyper: `IProcessTask` har `DefineStart`, `DefineEnd` og `DefineAbandon`, som får den samme `PipelineBuilder`. Hvert arbeidssteg får en `StageContext` og svarer med `StageResult`, akkurat som i en systemoppgave. Sammensetningen slutter med `Build()`, ikke med en avslutning: stegene kjører inne i prosessovergangen, før plattformen lagrer den, og flytter aldri prosessen videre. En postkasse kan du derfor ikke åpne her.

{{< code-title >}}
App/logic/ProcessTasks/CaseProcessTask.cs
{{< /code-title >}}

```csharp
using Altinn.App.Core.Features.Process;
using Altinn.App.Core.Internal.Process.ProcessTasks;

namespace Altinn.App.Logic.ProcessTasks;

public class CaseProcessTask : IProcessTask
{
    // ICaseSystem er ditt eget grensesnitt mot fagsystemet, ikke noe plattformen har.
    private readonly ICaseSystem _caseSystem;

    public CaseProcessTask(ICaseSystem caseSystem)
    {
        _caseSystem = caseSystem;
    }

    public string Type => "case";

    public ProcessTaskPipeline DefineStart(PipelineBuilder pipeline) =>
        pipeline
            .Stage(ReserveCaseNumber)
            .Stage(NotifyCaseWorker)
            .Build();

    private async Task<StageResult> ReserveCaseNumber(StageContext context)
    {
        await _caseSystem.ReserveCaseNumber(context.StepId, context.InstanceDataMutator.Instance);

        return StageResult.Completed();
    }

    private async Task<StageResult> NotifyCaseWorker(StageContext context)
    {
        await _caseSystem.NotifyCaseWorker(context.StepId, context.InstanceDataMutator.Instance);

        return StageResult.Completed();
    }
}
```

Standardimplementasjonene setter ikke sammen noen arbeidssteg, så du overstyrer bare dem oppgaven trenger. Hvert arbeidssteg kjører som sitt eget steg som lagrer for seg, og feiler et arbeidssteg, prøver plattformen det på nytt uten å kjøre dem foran om igjen. Et arbeidssteg som venter (`Defer`), holder overgangen igjen: instansen står som `processing` til arbeidssteget er ferdig, på samme måte som når en systemoppgave venter.

En systemoppgave er også en oppgavetype, så den kan sette sammen disse i tillegg til `DefineExecute`. Den innebygde signeringsoppgaven gjør det slik: når oppgaven starter, finner den dem som skal signere, delegerer rettigheter til dem og varsler dem, i hvert sitt arbeidssteg.

En egen oppgavetype registrerer du på `IProcessTask`:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp
services.AddTransient<ICaseSystem, CaseSystemClient>();
services.AddTransient<IProcessTask, CaseProcessTask>();
```

## Endre en oppgave mens instanser er underveis

Formen på oppgaven låser seg når prosessen starter overgangen, og plattformen kjenner igjen arbeidsstegene, og behandlerne som svarer på en postkasse (`HandleReplies` og `ConcludeOnReplies`), på plasseringen i rekken. Det gjelder både dem i `DefineExecute` og arbeidsstegene i `DefineStart`, `DefineEnd` og `DefineAbandon`. Ruller du ut en ny versjon som setter inn, fjerner eller bytter om på arbeidssteg eller behandlere, mister instansene som er underveis sporet. De feiler, eller de hopper over arbeid uten å feile.

Dette er samme problem som å endre en BPMN-fil mens instanser er i gang, og det er utviklerne som må håndtere det: la instansene som er underveis, bli ferdige på koden de startet på, eller avslutt dem bevisst før utrullingen.
