---
draft: true
title: Definere egne prosess-hooks
linktitle: Prosess-hooks
description: Slik skriver du kode som skal kjøres når en oppgave starter, avsluttes eller avbrytes, og når hele prosessen avsluttes.
toc: true
tags: [needsReview]
---

Du kan skrive egendefinert kode som kjøres når en oppgave i prosessen starter, avsluttes eller avbrytes, og når hele prosessen avsluttes, enten før eller etter at avslutningen er lagret. De tre oppgave-hookene avgjør selv hvilken oppgave de gjelder for, og bare én hook av hver type kan gjelde for samme oppgave. De to hookene for slutten av prosessen gjelder alltid for hele instansen, og du kan bare registrere én av hver.

Alle fem hookene kjører som et steg i arbeidsflytmotoren. Hvis det oppstår feil, kan hooken bli forsøkt kjørt på nytt automatisk, så koden din må være idempotent. Det vil si at den må tåle å kjøre flere ganger uten at det gir uønskede dobbeltoppføringer.

## Kjøre egendefinert kode når en oppgave starter

Opprett en klasse som implementerer `Altinn.App.Core.Features.Process.IOnTaskStartingHandler`, og registrer den som en transient tjeneste.

```csharp
public class MyTaskStartHandler : IOnTaskStartingHandler
{
    public bool ShouldRunForTask(string taskId) => taskId == "Task_1";

    public async Task<HookResult> Execute(OnTaskStartingContext context)
    {
        // Egendefinert logikk her, f.eks. context.InstanceDataMutator

        return HookResult.Success();
    }
}
```

```csharp
services.AddTransient<IOnTaskStartingHandler, MyTaskStartHandler>();
```

`ShouldRunForTask` avgjør hvilken oppgave hooken gjelder for. Du kan registrere flere klasser som implementerer `IOnTaskStartingHandler`, så lenge implementasjonene av `ShouldRunForTask` ikke overlapper.

{{% notice warning %}}
Bare én matchende handler er tillatt per oppgave. Svarer to registrerte `IOnTaskStartingHandler`-implementasjoner `true` for samme oppgave, feiler prosessovergangen permanent.
{{% /notice %}}

`Execute` får et kontekstobjekt med oppgavens id, en `IInstanceDataMutator` for å lese og endre instansdata, og en cancellation token. Endringer du gjør gjennom mutatoren, lagres automatisk hvis hooken fullfører uten feil. Returner `HookResult.Success()` ved suksess, `HookResult.FailedRetryable("melding")` for en forbigående feil du vil at plattformen skal forsøke på nytt, eller `HookResult.FailedPermanent("melding")` for en feil som trenger en rettelse før den kan lykkes.

Kaster `Execute` et unntak som koden din ikke håndterer, fanger arbeidsflytmotoren det og behandler det som `FailedRetryable`. Hooken blir da kjørt på nytt etter gjenforsøksstrategien for steget. Returnerer du `FailedPermanent`, prøver ikke motoren på nytt. Se [Overstyre tidsavbrudd og gjenforsøksstrategi](#overstyre-tidsavbrudd-og-gjenforsøksstrategi) for standardverdiene og hvordan du endrer dem.

[Se grensesnittet IOnTaskStartingHandler på GitHub](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/Process/IOnTaskStartingHandler.cs)

## Kjøre egendefinert kode når en oppgave avsluttes

Opprett en klasse som implementerer `Altinn.App.Core.Features.Process.IOnTaskEndingHandler`, og registrer den som en transient tjeneste. Grensesnittet følger samme mønster som `IOnTaskStartingHandler` over, med `Execute(OnTaskEndingContext context)`.

```csharp
services.AddTransient<IOnTaskEndingHandler, MyTaskEndHandler>();
```

[Se grensesnittet IOnTaskEndingHandler på GitHub](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/Process/IOnTaskEndingHandler.cs)

## Kjøre egendefinert kode når en oppgave avbrytes

Opprett en klasse som implementerer `Altinn.App.Core.Features.Process.IOnTaskAbandonHandler`, og registrer den som en transient tjeneste. Grensesnittet følger samme mønster som `IOnTaskStartingHandler` over, med `Execute(OnTaskAbandonContext context)`.

```csharp
services.AddTransient<IOnTaskAbandonHandler, MyTaskAbandonHandler>();
```

[Se grensesnittet IOnTaskAbandonHandler på GitHub](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/Process/IOnTaskAbandonHandler.cs)

## Kjøre egendefinert kode når hele prosessen avsluttes

Opprett en klasse som implementerer `Altinn.App.Core.Features.Process.IOnProcessEndingHandler`, og registrer den som en transient tjeneste. Den kjører når prosessen når et `endEvent` i BPMN-modellen — altså for hele instansen, ikke for en enkelt oppgave. Hooken kjører før avslutningen er lagret, så feiler den, blir prosessen ikke avsluttet.

```csharp
public class MyProcessEndHandler : IOnProcessEndingHandler
{
    public async Task<HookResult> Execute(OnProcessEndingContext context)
    {
        // Egendefinert logikk her, f.eks. context.InstanceDataMutator

        return HookResult.Success();
    }
}
```

```csharp
services.AddTransient<IOnProcessEndingHandler, MyProcessEndHandler>();
```

I motsetning til de tre oppgave-hookene over har `IOnProcessEndingHandler` ingen `ShouldRunForTask` — den gjelder alltid for hele prosessen, og du kan bare registrere én implementasjon. `Execute` og `HookResult` fungerer likt som for oppgave-hookene, bortsett fra at konteksten (`OnProcessEndingContext`) ikke har noen oppgave-ID.

[Se grensesnittet IOnProcessEndingHandler på GitHub](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/Process/IOnProcessEndingHandler.cs)

## Kjøre egendefinert kode etter at prosessen er avsluttet

Opprett en klasse som implementerer `Altinn.App.Core.Features.Process.IOnProcessEndedHandler`, og registrer den som en transient tjeneste. Den kjører etter at den avsluttede prosessen er lagret, og før datatyper med `autoDeleteOnProcessEnd` blir slettet og instansen er ferdig behandlet. Bruk den når koden skal kjøre først når avslutningen er lagret, for eksempel for å varsle et eksternt system.

```csharp
public class MyProcessEndedHandler : IOnProcessEndedHandler
{
    public async Task<HookResult> Execute(OnProcessEndedContext context)
    {
        // Egendefinert logikk her, f.eks. context.InstanceDataMutator

        return HookResult.Success();
    }
}
```

```csharp
services.AddTransient<IOnProcessEndedHandler, MyProcessEndedHandler>();
```

Hooken fungerer som `IOnProcessEndingHandler`: den gjelder hele prosessen, du kan bare registrere én implementasjon, og `Execute` kan lese og endre instansdata gjennom `context.InstanceDataMutator`. Forskjellen er hva som skjer når den feiler. Prosessen er da allerede avsluttet, men instansen blir værende under behandling til noen starter arbeidsflyten på nytt.

[Se grensesnittet IOnProcessEndedHandler på GitHub](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/Process/IOnProcessEndedHandler.cs)

{{% notice info %}}
`IProcessEnd` fra v8 finnes ikke i v9. Flytt koden til `IOnProcessEndedHandler`, eller til `IOnProcessEndingHandler` hvis den skal kjøre før avslutningen er lagret. `studioctl app upgrade v9` viser hvilke klasser og registreringer du må flytte.
{{% /notice %}}

## Overstyre tidsavbrudd og gjenforsøksstrategi

Alle fem hook-typene implementerer `IProcessStepConfigurable`, som gjør at du kan velge å overstyre arbeidsflytmotorens standard tidsavbrudd og gjenforsøksstrategi for steget, med egenskapen `StepOptions`.

Setter du ikke `StepOptions`, bruker hooken standardverdiene i plattformen. De kan avvike mellom miljøene:

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

Feltene betyr dette:

- `MaxExecutionTime` er hvor lenge ett forsøk får bruke før plattformen avbryter det og regner forsøket som feilet.
- `RetryStrategy` styrer hvor mange nye forsøk plattformen gjør, og hvor lang pausen mellom dem er. Du kan velge `Exponential`, `Linear` eller `Constant`. `ProcessStepRetryStrategy.None()` slår av nye forsøk.

Felt du ikke setter, får standardverdien.

Systemoppgaver bruker den samme egenskapen, men har et lengre standard tidsavbrudd. Se [Lage en egendefinert systemoppgave]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}#styre-tidsbruk-og-nye-forsøk).
