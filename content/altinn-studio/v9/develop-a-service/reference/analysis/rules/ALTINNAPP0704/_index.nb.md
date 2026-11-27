---
title: "ALTINNAPP0704: metoden implementerer ikke medlemmet den er oppkalt etter"
description: "En metode i en oppgaveklasse heter det samme som et medlem i IProcessTask, men appen kaller den aldri"
weight: 74
---

Denne diagnostikken melder fra når en klasse som implementerer `IProcessTask` eller
`IServiceTask`, har en metode som heter `DefineStart`, `DefineEnd`, `DefineAbandon` eller
`ValidateConfiguration`, men som ikke implementerer medlemmet med samme navn i `IProcessTask`,
og som ingen kode i appen kaller. Meldingen navngir metoden og medlemmet, og viser signaturen
metoden skal ha. Regelen ser på hele appen, så den melder fra når appen bygges.

`IProcessTask` har en standardimplementasjon av alle de fire medlemmene, så klassen kompilerer
likevel. Appen kaller aldri metoden din, men kjører standardimplementasjonen i stedet.
Standardimplementasjonene av `DefineStart`, `DefineEnd` og `DefineAbandon` setter ikke sammen
noen arbeidssteg, og den av `ValidateConfiguration` godtar all konfigurasjon.

Metoden implementerer ikke medlemmet hvis den for eksempel

- tar andre parametere, som `PipelineBuilder.ServiceTask` i stedet for `PipelineBuilder.Lifecycle`
- har en annen returtype
- ikke er `public`
- er `static`

Arver klassen grensesnittet fra en baseklasse, må klassen også oppgi grensesnittet selv. Ellers
kaller appen ikke metodene i klassen, selv om signaturen er riktig.

Kategori `Contracts`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Slik retter du feilen:

- Gi metoden den signaturen meldingen viser, altså `public`, ikke `static`, og med samme
  returtype og parametere som medlemmet i `IProcessTask`. Du kan også implementere medlemmet
  eksplisitt, for eksempel med `void IProcessTask.DefineStart(PipelineBuilder.Lifecycle pipeline)`.
- Arver klassen grensesnittet fra en baseklasse, tar du med `IProcessTask` blant grensesnittene
  klassen oppgir. En systemoppgave kan like gjerne oppgi `IServiceTask`.
- Er metoden ment for noe annet, gir du den et annet navn.

`DefineStart`, `DefineEnd` og `DefineAbandon` tar `PipelineBuilder.Lifecycle`, også i en
systemoppgave, der `DefineExecute` tar `PipelineBuilder.ServiceTask`. Arbeidsstegene der svarer med
`StageResult`. I eksempelet under skal en systemoppgave kjøre arbeidssteget `Prepare` når den starter.

Feil:

```csharp
public void DefineStart(
    PipelineBuilder.ServiceTask pipeline
) => pipeline.Stage(Prepare);

private Task<ServiceTaskResult> Prepare(
    StageContext context
) => /* ... */;
```

Riktig:

```csharp
public void DefineStart(
    PipelineBuilder.Lifecycle pipeline
) => pipeline.Stage(Prepare);

private Task<StageResult> Prepare(
    StageContext context
) => /* ... */;
```

I eksempelet under arver `ArchiveTask` grensesnittet fra baseklassen `TaskBase`, som
implementerer `IServiceTask`. Signaturen til `DefineEnd` er riktig, men appen kaller metoden
først når klassen oppgir grensesnittet selv.

Feil:

```csharp
public class ArchiveTask : TaskBase
{
    public void DefineEnd(
        PipelineBuilder.Lifecycle pipeline
    ) => pipeline.Stage(Notify);
}
```

Riktig:

```csharp
public class ArchiveTask : TaskBase, IProcessTask
{
    public void DefineEnd(
        PipelineBuilder.Lifecycle pipeline
    ) => pipeline.Stage(Notify);
}
```

Regelen melder ikke fra om en metode som noe i appen kaller, for eksempel en hjelpemetode
`ValidateConfiguration(ArchiveSettings settings)` som `DefineExecute` bruker, eller en beskyttet
hjelpemetode i en baseklasse som en avledet oppgave kaller. Den melder heller ikke fra om
andre metoder med samme navn når klassen allerede implementerer medlemmet, for eksempel en
privat hjelpemetode med flere parametere.

Regelen melder heller ikke fra om en metode som overstyrer en metode i en baseklasse (`override`), eller
som implementerer et medlem med samme navn i et annet grensesnitt. Signaturen til en slik metode
er bestemt et annet sted. Overstyrer du en metode i en baseklasse i appen som selv implementerer
`IProcessTask` eller `IServiceTask`, melder regelen fra om metoden i baseklassen i stedet.

Se [hvordan du lager en egendefinert systemoppgave]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}).
