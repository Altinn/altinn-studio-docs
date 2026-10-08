---
draft: true
title: Definere egne prosess-hooks
linktitle: Prosess-hooks
description: Slik kjører du egen kode når en oppgave starter, avsluttes eller avbrytes, og etter at prosessen er avsluttet.
toc: true
tags: [needsReview]
---

Med prosess-hooks kan appen kjøre egen kode på faste punkter i prosessen. Det finnes fire:

| Hook | Kjører | Gjelder |
| --- | --- | --- |
| `IOnTaskStartingHandler` | når en oppgave starter | oppgavene du velger |
| `IOnTaskEndingHandler` | når en oppgave avsluttes, før prosessen går videre | oppgavene du velger |
| `IOnTaskAbandonHandler` | når en oppgave avbrytes, for eksempel når brukeren avviser | oppgavene du velger |
| `IOnProcessEndedHandler` | etter at prosessen er avsluttet og lagret | hele instansen |

Alle grensesnittene ligger i `Altinn.App.Core.Features.Process`.

## Slik fungerer hookene

Du lager en klasse som implementerer grensesnittet, og registrerer den som en transient tjeneste i `Program.cs`. Hver hook kjører som et eget steg i arbeidsflytmotoren, og metoden `Execute` får et kontekstobjekt med:

- en `IInstanceDataMutator` som du leser og endrer instansdata med
- en `CancellationToken`
- id-en til oppgaven, for de tre oppgave-hookene

Endringer du gjør gjennom `context.InstanceDataMutator`, blir lagret når hooken er ferdig uten feil. Skriv alle endringer gjennom den. Mens arbeidsflyten behandler instansen, avviser Storage endringer som kommer direkte gjennom `IDataClient` eller `IInstanceClient`.

`Execute` returnerer et `HookResult`:

- `HookResult.Success()` når alt gikk bra.
- `HookResult.FailedRetryable("melding")` når feilen er forbigående, for eksempel at en ekstern tjeneste ikke svarer. Plattformen prøver steget på nytt.
- `HookResult.FailedPermanent("melding")` når feilen ikke går over av seg selv. Plattformen prøver ikke på nytt.

Kaster `Execute` et unntak som koden din ikke håndterer, regnes det som `FailedRetryable`. Hvor ofte og hvor lenge plattformen prøver på nytt, står i [Overstyre tidsavbrudd og gjenforsøksstrategi](#overstyre-tidsavbrudd-og-gjenforsøksstrategi).

Fordi en hook kan bli kjørt flere ganger, må koden tåle det. Den skal gi samme resultat hver gang, og for eksempel ikke sende den samme e-posten eller opprette de samme dataene to ganger.

## Kjøre kode når en oppgave starter

Implementer `IOnTaskStartingHandler`. `ShouldRunForTask` bestemmer hvilke oppgaver hooken gjelder for, og `Execute` inneholder koden.

```csharp
public class MyTaskStartHandler : IOnTaskStartingHandler
{
    public bool ShouldRunForTask(string taskId) => taskId == "Task_1";

    public async Task<HookResult> Execute(OnTaskStartingContext context)
    {
        // Les og endre data gjennom context.InstanceDataMutator

        return HookResult.Success();
    }
}
```

```csharp
services.AddTransient<IOnTaskStartingHandler, MyTaskStartHandler>();
```

Du kan registrere flere klasser for samme hook, så lenge de gjelder for ulike oppgaver.

{{% notice warning %}}
Bare én hook av hver type kan gjelde for samme oppgave. Svarer to registrerte `IOnTaskStartingHandler` `true` for samme oppgave, feiler prosessovergangen permanent. Det samme gjelder `IOnTaskEndingHandler` og `IOnTaskAbandonHandler`.
{{% /notice %}}

[Se grensesnittet IOnTaskStartingHandler på GitHub](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/Process/IOnTaskStartingHandler.cs)

## Kjøre kode når en oppgave avsluttes

Implementer `IOnTaskEndingHandler`. Den følger samme mønster som `IOnTaskStartingHandler`, med `Execute(OnTaskEndingContext context)`.

```csharp
services.AddTransient<IOnTaskEndingHandler, MyTaskEndHandler>();
```

Hooken kjører før dataene i oppgaven blir låst, så det er siste mulighet til å endre dem. Er oppgaven den siste i prosessen, kjører hooken også før prosessen avsluttes. Feiler den, blir ikke prosessen avsluttet. Kode som skal kunne stoppe avslutningen, hører derfor hjemme her.

[Se grensesnittet IOnTaskEndingHandler på GitHub](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/Process/IOnTaskEndingHandler.cs)

## Kjøre kode når en oppgave avbrytes

Implementer `IOnTaskAbandonHandler`. Den følger samme mønster, med `Execute(OnTaskAbandonContext context)`.

```csharp
services.AddTransient<IOnTaskAbandonHandler, MyTaskAbandonHandler>();
```

Når brukeren avviser en oppgave, kjører denne hooken i stedet for `IOnTaskEndingHandler`. Kan avvisningen føre til slutten av prosessen, trenger du begge hookene for å fange alle måter oppgaven kan forlates på.

[Se grensesnittet IOnTaskAbandonHandler på GitHub](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/Process/IOnTaskAbandonHandler.cs)

## Kjøre kode etter at prosessen er avsluttet

Implementer `IOnProcessEndedHandler`. Hooken kjører én gang for hele instansen, når prosessen har nådd en sluttilstand (`endEvent`) og dette er lagret. Den kjører uansett hvilken vei prosessen tok til slutten. Bruk den til kode som først skal kjøre når avslutningen er lagret, for eksempel for å varsle et eksternt system.

```csharp
public class MyProcessEndedHandler : IOnProcessEndedHandler
{
    public async Task<HookResult> Execute(OnProcessEndedContext context)
    {
        // Les og endre data gjennom context.InstanceDataMutator

        return HookResult.Success();
    }
}
```

```csharp
services.AddTransient<IOnProcessEndedHandler, MyProcessEndedHandler>();
```

Du kan bare registrere én `IOnProcessEndedHandler`. Hooken har ingen `ShouldRunForTask`, og konteksten har ingen oppgave-id. Hvilken sluttilstand prosessen nådde, finner du i `context.InstanceDataMutator.Instance.Process.EndEvent`.

Hooken kjører før datatyper med `autoDeleteOnProcessEnd` blir slettet, så den ser alle dataene. Er `autoDeleteOnProcessEnd` slått på for hele appen, blir instansen slettet etter at hooken er ferdig.

Feiler hooken, er prosessen likevel avsluttet. Instansen blir værende under behandling til arbeidsflyten blir startet på nytt fra arbeidsflytmotoren. Skal en feil kunne stoppe avslutningen, bruk `IOnTaskEndingHandler` for den siste oppgaven i stedet.

[Se grensesnittet IOnProcessEndedHandler på GitHub](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/Process/IOnProcessEndedHandler.cs)

{{% notice info %}}
`IProcessEnd` fra v8 finnes ikke i v9. Flytt koden til `IOnProcessEndedHandler`, eller til en `IOnTaskEndingHandler` for den siste oppgaven hvis den skal kjøre før avslutningen er lagret. `studioctl app upgrade v9` viser hvilke klasser og registreringer du må flytte.
{{% /notice %}}

## Overstyre tidsavbrudd og gjenforsøksstrategi

Alle fire hookene kan overstyre standard tidsavbrudd og gjenforsøk for steget sitt med egenskapen `StepOptions`. Setter du den ikke, gjelder standardverdiene i plattformen. De kan avvike mellom miljøene:

| Verdi | Standard | Grense |
| --- | --- | --- |
| `MaxExecutionTime` for en hook | 100 sekunder | 2 timer |
| Nye forsøk etter `FailedRetryable` eller et uhåndtert unntak | økende pause fra ett sekund, maks fem minutter mellom forsøkene, i opptil ett døgn | — |

Eksempelet under gir hooken to minutter per forsøk, og prøver på nytt opptil fem ganger med økende pause:

```csharp
public class MyTaskStartHandler : IOnTaskStartingHandler
{
    public ProcessStepOptions? StepOptions =>
        new()
        {
            MaxExecutionTime = TimeSpan.FromMinutes(2),
            RetryStrategy = ProcessStepRetryStrategy.Exponential(
                baseInterval: TimeSpan.FromSeconds(5),
                maxRetries: 5,
                maxDelay: TimeSpan.FromMinutes(1)
            ),
        };

    public bool ShouldRunForTask(string taskId) => taskId == "Task_1";

    public async Task<HookResult> Execute(OnTaskStartingContext context)
    {
        // Egendefinert logikk her

        return HookResult.Success();
    }
}
```

- `MaxExecutionTime` er hvor lenge ett forsøk får bruke før plattformen avbryter det og regner det som feilet.
- `RetryStrategy` styrer hvor mange nye forsøk plattformen gjør, og hvor lang pausen mellom dem er. Du kan velge `Exponential`, `Linear` eller `Constant`. `ProcessStepRetryStrategy.None()` slår av nye forsøk.

Felt du ikke setter, får standardverdien.

Systemoppgaver bruker den samme egenskapen, men har et lengre standard tidsavbrudd. Se [Lage en egendefinert systemoppgave]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}#styre-tidsbruk-og-nye-forsøk).
