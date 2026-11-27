---
title: Systemoppgaver med flere steg
linktitle: Flere steg
description: Slik deler du en systemoppgave i flere arbeidssteg, og lar den vente på svar utenfra
tags: [altinn-apps, process, bpmn, task, service task, systemoppgave, needsReview]
---

En systemoppgave setter du sammen i `DefineExecute`. En oppgave som gjør én ting, består av ett arbeidssteg: `pipeline.Stage(Execute)`. Se [Lage en egendefinert systemoppgave]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}).

Skal oppgaven gjøre flere ting etter hverandre, deler du den i flere **arbeidssteg** (`Stage` i koden). Det gjelder når oppgaven kaller flere systemer i rekkefølge, eller sender noe og venter på svar. Plattformen husker hvert arbeidssteg som er ferdig, slik at en feil sent i oppgaven ikke sender bestillingen din på nytt.

{{% notice info %}}
Denne siden gir oversikten. Utviklerne finner alle detaljene i [`docs/service-task-pipelines.md`](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/docs/service-task-pipelines.md) i kodebasen for app-biblioteket.
{{% /notice %}}

## Dele oppgaven i arbeidssteg

Du setter sammen arbeidsstegene i `DefineExecute`, i den rekkefølgen de skal kjøre: `Stage` for arbeid appen gjør selv, og `ExternalStage` for arbeid som venter på svar fra et annet system. Når det siste arbeidssteget er ferdig, er oppgaven ferdig, og prosessen går videre.

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

    public void DefineExecute(PipelineBuilder.ServiceTask pipeline) =>
        pipeline
            .Stage(SendToArchive)
            .Stage(
                AwaitConfirmation,
                new ProcessStepOptions { WaitBudget = TimeSpan.FromHours(6) }
            );

    private async Task<ServiceTaskResult> SendToArchive(StageContext context)
    {
        Datamodell? skjemadata = await context.InstanceDataMutator.GetFormData<Datamodell>();

        if (skjemadata is null)
        {
            return ServiceTaskResult.FailedPermanent("Instansen mangler skjemadata.");
        }

        // context.StepId er den samme gjennom alle forsøk på dette arbeidssteget.
        // Bruk den som nøkkel, slik at arkivet kjenner igjen en sending det har fått før,
        // og svarer med den samme referansen i stedet for å arkivere på nytt. Da får et nytt
        // forsøk tak i referansen selv om forrige forsøk stoppet før det fikk lagret den.
        string referanse = await _archive.Send(context.StepId, context.InstanceDataMutator.Instance);

        // Neste arbeidssteg kjører for seg, med sin egen StepId. Lagre referansen
        // fra arkivet i skjemadataene, så finner AwaitConfirmation den igjen.
        skjemadata.Arkivreferanse = referanse;

        return ServiceTaskResult.Completed();
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
            return ServiceTaskResult.Completed();
        }

        if (context.Wait.IsFinalCheck)
        {
            return ServiceTaskResult.FailedPermanent("Arkivet bekreftet ikke leveringen innen fristen.");
        }

        return ServiceTaskResult.Defer(TimeSpan.FromMinutes(2), "venter på bekreftelse fra arkivet");
    }
}
```

Du registrerer oppgaven på `IServiceTask`, som andre systemoppgaver:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp
services.AddTransient<IArchiveClient, ArchiveClient>();
services.AddTransient<IServiceTask, ArchiveServiceTask>();
```

`DefineExecute` kjører hver gang plattformen skal finne ut hva som er neste arbeidssteg, og når appen starter. Den skal derfor være billig og forutsigbar, og ikke gjøre noe arbeid selv. Selve arbeidet hører til inne i arbeidsstegene.

Arbeidsstegene kjører hver for seg, med hver sin `StepId`. Det et senere arbeidssteg trenger å vite, lagrer du i instansdataene gjennom `context.InstanceDataMutator`, slik eksempelet gjør med referansen fra arkivet. Plattformen lagrer endringene når arbeidssteget er ferdig, og alle senere arbeidssteg ser dem.

Setter du sammen noe ugyldig, for eksempel en `DefineExecute` uten arbeidssteg eller en frist på mer enn 21 døgn, feiler appen når den starter. Da får du feilen med en gang, ikke først når en bruker treffer oppgaven.

## Svare fra et arbeidssteg

Et arbeidssteg svarer med `ServiceTaskResult`:

| Svar | Dette skjer |
| --- | --- |
| `Completed()` | Arbeidssteget er ferdig, og oppgaven går videre til neste arbeidssteg. Var dette det siste, er oppgaven ferdig, og prosessen går videre langs standardflyten. Plattformen lagrer dataendringene, og et ferdig arbeidssteg kjører aldri om igjen. |
| `EndTask()` | Oppgaven er ferdig med en gang. Arbeidsstegene etter dette kjører ikke, og prosessen går videre langs standardflyten. |
| `EndTask("reject")` | Som `EndTask()`, men prosessen går videre med handlingen du oppgir, for eksempel tilbake til utfylling. |
| `Defer(delay, reason)` | Arbeidssteget gikk bra, men svaret det venter på har ikke kommet. Prosessen står på steget, og plattformen kjører arbeidssteget på nytt etter `delay`. |
| `FailedRetryable("melding")` | Noe gikk galt som kan gå bedre om litt. Plattformen prøver arbeidssteget på nytt. |
| `FailedPermanent("melding")` | Noe gikk galt som ikke retter seg selv. Plattformen gir opp. |

Alle arbeidssteg kan avslutte oppgaven med `EndTask`. Bruk det når et arbeidssteg finner ut at resten av oppgaven ikke trenger å kjøre, for eksempel fordi det ikke er noe å arkivere. Da beholder oppgaven den samme rekken av arbeidssteg hver gang, og avgjørelsen tar du inne i arbeidssteget. Se [Endre en oppgave mens instanser er underveis](#endre-en-oppgave-mens-instanser-er-underveis) for hvorfor det er tryggere enn å sette sammen ulike rekker.

## Gi hvert steg sine egne tidsrammer

Tidsavbrudd, nye forsøk og ventefrist gir du steget der du setter det sammen, som `options`-argumentet til `Stage` eller `ExternalStage`. Hvert steg får akkurat det kallet oppgir. Et felt du ikke setter, får standardverdien i plattformen, aldri verdien fra et annet steg. På et eksternt arbeidssteg gjelder valgene både for sendingen og for hvert svar. Skal flere steg ha de samme valgene, sender du det samme `ProcessStepOptions`-objektet til hvert av dem. Se [Styre tidsbruk og nye forsøk]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}#styre-tidsbruk-og-nye-forsøk) for hva feltene betyr.

## Vente på svar

`Defer` betyr «alt gikk bra, men svaret er ikke kommet». Plattformen holder ikke serveren opptatt mens oppgaven venter, og kjører arbeidssteget på nytt etter den pausen du oppgir.

- Ventetiden til sammen har en frist, `WaitBudget`. Sett fristen på arbeidssteget som venter. Arbeidssteg som ikke får en frist, arver ikke fristen fra andre steg.
- `context.Wait` forteller hvor langt ventingen er kommet: `DeferCount`, `StartedAt`, `Deadline`, `Remaining` og `IsFinalCheck`. Bruk dem til å spørre ofte i starten og sjeldnere etter hvert, og til å avslutte med en melding som sier hva som aldri kom.
- Teksten du sender med i `reason`, lagrer plattformen på steget, og den følger med i prosessdataene og driftsverktøyene. Ingen av standardvisningene viser den til brukeren, så skal brukeren se den, må du [lage din egen side]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/visning" >}}). Skriv den likevel for et menneske.
- Et forsøk som venter, lagrer ingenting, og endrer forsøket data mens det venter, avviser plattformen forsøket. Arbeid som skal etterlate et spor, hører til i sitt eget arbeidssteg foran ventingen.

## Få svaret som en melding

Kommer svaret som en melding utenfra i stedet for at appen spør igjen, bruker du et **eksternt arbeidssteg** (`ExternalStage` i koden). Det sender noe til et annet system og venter på svarene som kommer tilbake. Plattformen gir sendingen en **svaradresse** (`ReplyAddress` i koden): en id som er adressen svarene må komme tilbake til, og en frist for hvor lenge den tar imot svar.

{{< code-title >}}
App/logic/ServiceTasks/OrderServiceTask.cs
{{< /code-title >}}

```csharp
public void DefineExecute(PipelineBuilder.ServiceTask pipeline) =>
    pipeline.ExternalStage(
        SendOrder,
        HandleAnswer,
        timeout: TimeSpan.FromDays(3),
        onTimeout: HandleNoAnswer
    );

// _partner, LesSvar og Svar er dine egne, på samme måte som IArchiveClient over.
private async Task<ServiceTaskResult> SendOrder(StageContext context, ReplyAddress replyAddress)
{
    // Send replyAddress.Id med bestillingen, i det feltet mottakeren sender tilbake.
    // Uten den finner ikke svaret veien tilbake til oppgaven.
    await _partner.PlaceOrder(context.StepId, replyAddress.Id);

    return ServiceTaskResult.Completed();
}

private Task<ServiceTaskReplyResult> HandleAnswer(StageContext context, ServiceTaskReply reply)
{
    // reply.Payload kommer utenfra. Kontroller innholdet før du bruker det.
    Svar? svar = LesSvar(reply.Payload);

    if (svar is null)
    {
        return Task.FromResult(
            ServiceTaskReplyResult.FailedPermanent("Kunne ikke lese svaret fra samarbeidspartneren.")
        );
    }

    return Task.FromResult(
        svar.Ferdig ? ServiceTaskReplyResult.Completed() : ServiceTaskReplyResult.AwaitNextReply()
    );
}

private Task<ServiceTaskResult> HandleNoAnswer(StageContext context) =>
    Task.FromResult(ServiceTaskResult.FailedPermanent("Fikk aldri svar fra samarbeidspartneren."));
```

Slik henger delene sammen:

- **Sendingen** får svaradressen og må publisere `replyAddress.Id` i det feltet mottakeren svarer tilbake i. Id-en er adressen, og ingenting annet finner veien tilbake. Prøver plattformen sendingen på nytt, får den den samme svaradressen. `Completed()` fra sendingen betyr «sendt, vent på svar».
- **Kanalen som tar imot svaret** hos dere, for eksempel en lytter på en meldingskø eller et endepunkt, sender meldingen videre med `IServiceTaskReplyForwarder.ForwardReply(replyAddressId, serviceTaskType, payload, idempotencyKey)`, og gjør ikke noe arbeid selv. Bruk avsenderens egen meldings-id som `idempotencyKey`, siden samme melding kan komme flere ganger. Kommer en melding før oppgaven er klar for den, venter meldingen på tur.
- **Svarbehandleren**, `HandleAnswer` i eksempelet, kjører som et eget steg for hvert svar, ett svar om gangen og i den rekkefølgen svarene kom. Den kan kjøre flere ganger for det samme svaret, for eksempel etter en feil, så bruk `reply.IdempotencyKey` som nøkkel for arbeid som ikke skal skje to ganger. Den svarer med `ServiceTaskReplyResult`, som har de samme svarene som et arbeidssteg, og i tillegg `AwaitNextReply()`, som betyr «dette svaret er håndtert, vent på neste». `Completed()` betyr at oppgaven er ferdig med svarene og går videre til neste arbeidssteg. Plattformen lukker svaradressen først, slik at ingen senere melding lander etter at oppgaven har gått videre.
- **Fristen**, `timeout`, løper fra plattformen åpner svaradressen, og ingen melding forlenger den. Oppgir du ingen frist, er den 7 døgn. Plattformen godtar ikke mer enn 21 døgn, og en lengre frist gjør at appen ikke starter. Er arbeidsflytmotoren satt opp med en lavere grense, feiler steget som åpner svaradressen, før sendingen kjører.
- **Behandleren for tidsavbrudd**, `onTimeout`, kjører når svaradressen er lukket før svarbehandleren er ferdig, fordi fristen gikk ut eller fordi noen lukket den. Der bestemmer du hva som skal skje: `Completed()` går videre uten svaret, og `FailedPermanent` lar oppgaven feile. Uten `onTimeout` feiler oppgaven når fristen går ut.
- **Feil lukker ikke svaradressen.** Svarer sendingen eller svarbehandleren med en feil, står svaradressen åpen. Når noen har rettet feilen og gjenopptatt oppgaven, kjører steget som feilet på nytt, og svar som har kommet i mellomtiden, venter på tur. Fristen løper videre mens oppgaven står feilet, så rett feilen og gjenoppta oppgaven før fristen går ut.
- **Id-en er umulig å gjette, men den er ikke en hemmelighet.** Den er en adresse, ikke bevis for hvem som sendte meldingen.

Snakker oppgaven med to systemer, setter du sammen to eksterne arbeidssteg. Det andre sender først når det første er ferdig med svarene sine, så fristen til det andre løper ikke mens det første venter.

Arbeidsflytmotoren kaller svaradressen en postkasse (mailbox), så det ordet ser du i logger og i administrasjonspanelet i Altinn Studio.

Fiks Arkiv er det innebygde eksempelet i plattformen: oppgaven sender id-en til svaradressen som `klientKorrelasjonsId`, og lytteren leser den tilbake fra svaret og sender meldingen videre.

### Avslutte oppgaven fra sendingen

Sendingen kan avslutte hele oppgaven med `EndTask`, som andre arbeidssteg. Da venter ikke oppgaven på svar, plattformen lukker svaradressen, og arbeidsstegene etter kjører ikke.

{{< code-title >}}
App/logic/ServiceTasks/OrderServiceTask.cs
{{< /code-title >}}

```csharp
if (!await _partner.RecipientExists(recipient))
{
    // Det kommer aldri noe svar, så oppgaven er ferdig.
    return ServiceTaskResult.EndTask("reject");
}
```

Bruk `EndTask` bare når sendingen alene avgjør saken, for eksempel når mottakeren ikke finnes, slik at det ikke er noe poeng i å vente på et svar som aldri kommer. I to tilfeller skal du ikke avslutte:

- Vet du ikke om sendingen kom frem, for eksempel etter et tidsavbrudd, svarer du `FailedRetryable`. Sendingen kan ha gått, og en avslutning ville lukket svaradressen svaret trenger.
- Er feilen hos dere, for eksempel avviste påloggingsopplysninger eller feil konfigurasjon, svarer du `FailedPermanent`. Da står svaradressen åpen, og når noen har rettet feilen og gjenopptatt oppgaven, kjører sendingen på nytt.

## Navn på stegene

Der noen følger med på oppgaven, for eksempel i administrasjonspanelet i Altinn Studio, får hvert steg navnet på metoden du sendte inn som arbeidet, skrevet som ord: `SendToArchive` blir «Send to archive», og `StoreReceipt` blir «Store receipt». Et eksternt arbeidssteg kjører sendingen som ett steg og hvert svar som et eget steg. Foran sendingen kommer et steg uten navn som åpner svaradressen. Steget for et svar kjører én av to metoder, avhengig av om det kom et svar eller om fristen gikk ut, og får navnet på begge: «Handle answer / Handle no answer». Sender du inn en lambda i stedet for en metode, får steget ikke noe navn. Det får heller ikke en metode som heter `Execute`, siden navnet ikke sier mer enn oppgavetypen gjør.

Navnet er bare til visning. Bytter du navn på en metode, endrer det ingenting i hvordan steget kjører, heller ikke for instanser som er underveis, fordi plattformen kjenner igjen stegene på plasseringen i rekken.

## Arbeidssteg når en oppgave starter, avsluttes eller avbrytes

Arbeidet en oppgave gjør når den starter, avsluttes eller avbrytes, setter du sammen på samme måte, av arbeidssteg. Det gjelder alle oppgavetyper: `IProcessTask` har `DefineStart`, `DefineEnd` og `DefineAbandon`, som får en `PipelineBuilder.Lifecycle`. Hvert arbeidssteg får en `StageContext` og svarer med `StageResult`, som har de samme svarene som et arbeidssteg i en systemoppgave, bortsett fra `EndTask`. Stegene kjører inne i prosessovergangen og kan ikke avslutte noen oppgave. Et eksternt arbeidssteg kan du derfor ikke sette sammen her.

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

    public void DefineStart(PipelineBuilder.Lifecycle pipeline) =>
        pipeline
            .Stage(ReserveCaseNumber)
            .Stage(NotifyCaseWorker);

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

Arbeidsstegene i `DefineEnd` og `DefineAbandon` kjører før plattformen lagrer at prosessen har forlatt oppgaven, og arbeidsstegene i `DefineStart` etter at den har lagret den nye oppgaven. Et arbeidssteg kan derfor skrive data som hører til oppgaven det kjører for, men ikke data som hører til en annen oppgave.

Standardimplementasjonene setter ikke sammen noen arbeidssteg, så du lager bare dem oppgaven trenger. Hvert arbeidssteg kjører som sitt eget steg som lagrer for seg. Svarer et arbeidssteg `FailedRetryable`, prøver plattformen det på nytt uten å kjøre dem foran om igjen. Svarer det `FailedPermanent`, står overgangen til noen retter feilen og gjenopptar oppgaven, og da kjører bare arbeidssteget som feilet. Et arbeidssteg som venter (`Defer`), holder overgangen igjen: instansen står som `processing` til arbeidssteget er ferdig, på samme måte som når en systemoppgave venter.

Metodene må ha akkurat denne formen. En metode som heter `DefineStart`, men tar `PipelineBuilder.ServiceTask`, kompilerer, men appen kaller den aldri. Regelen [ALTINNAPP0704]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP0704" >}}) stopper bygget når det skjer.

Alle oppgavetyper kan sette sammen disse. En systemoppgave gjør det i tillegg til `DefineExecute`. Den innebygde signeringsoppgaven bruker `DefineStart` slik: når oppgaven starter, finner den dem som skal signere, delegerer rettigheter til dem og varsler dem, i hvert sitt arbeidssteg.

En egen oppgavetype registrerer du på `IProcessTask`:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp
services.AddTransient<ICaseSystem, CaseSystemClient>();
services.AddTransient<IProcessTask, CaseProcessTask>();
```

## Endre en oppgave mens instanser er underveis

Plattformen kjenner igjen arbeidsstegene og svarene på et eksternt arbeidssteg på plasseringen i rekken. Det gjelder både dem i `DefineExecute` og arbeidsstegene i `DefineStart`, `DefineEnd` og `DefineAbandon`. Ruller du ut en ny versjon som setter inn, fjerner eller bytter om på arbeidssteg, mister instansene som er underveis sporet. Noen feiler, og andre hopper over arbeid eller gjør det om igjen uten å feile.

Dette er samme problem som å endre en BPMN-fil mens instanser er i gang, og det er utviklerne som må håndtere det: la instansene som er underveis, bli ferdige på koden de startet på, eller avslutt dem bevisst før utrullingen.

Bruk derfor den samme rekken av arbeidssteg hver gang, i stedet for å sette sammen ulike rekker ut fra data eller innstillinger. Har et arbeidssteg ingenting å gjøre for en instans, svarer det `Completed()`. Er resten av oppgaven unødvendig, svarer det `EndTask()`.
