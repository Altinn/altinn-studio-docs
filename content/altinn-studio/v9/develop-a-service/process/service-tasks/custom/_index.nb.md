---
draft: true
title: Lage en egendefinert systemoppgave
linktitle: Egendefinert
description: Slik lager du en systemoppgave som kjører egen kode i prosessen
tags: [altinn-apps, process, bpmn, task, service task, systemoppgave, needsReview, translate-to-english]
---

En egendefinert systemoppgave lar appen gjøre arbeid på serveren midt i prosessen, uten at brukeren gjør noe. Oppgaven består av

- en C#-klasse som oppfyller grensesnittet `IServiceTask`
- et nytt steg i prosessen (BPMN)
- en tilgangsregel som lar brukeren kjøre steget

{{% notice info %}}
Grensesnittet endret seg mellom v8 og v9. Har du en egendefinert systemoppgave fra før, se avsnittet om systemoppgaver i [oppgraderingsveiledningen]({{< relref "/altinn-studio/v9/new-in-v9/upgrade" >}}). Veiledningen for v8 ligger [her](/nb/altinn-studio/v8/guides/development/service-tasks/custom/).
{{% /notice %}}

## Skrive systemoppgaven i C#

Klassen forteller to ting: hvilken oppgavetype den svarer for (`Type`), og hva den skal gjøre (`Execute`). Verdien i `Type` er navnet du bruker i prosessen og i tilgangsregelen.

{{< code-title >}}
App/logic/ServiceTasks/ExampleServiceTask.cs
{{< /code-title >}}

```csharp
using Altinn.App.Core.Features;
using Altinn.App.Core.Features.Process;
using Altinn.App.Models;

namespace Altinn.App.Logic.ServiceTasks;

public class ExampleServiceTask : IServiceTask
{
    public string Type => "exampleServiceTask";

    public async Task<ServiceTaskResult> Execute(ServiceTaskContext context)
    {
        Datamodell? skjemadata = await context.InstanceDataMutator.GetFormData<Datamodell>();

        if (skjemadata is null)
        {
            return ServiceTaskResult.FailedPermanent("Instansen mangler skjemadata.");
        }

        if (skjemadata.Godkjent != true)
        {
            return ServiceTaskResult.FailedPermanent("Skjemaet er ikke godkjent, og prosessen kan ikke fortsette.");
        }

        return ServiceTaskResult.Success();
    }
}
```

Du leser og endrer data gjennom `context.InstanceDataMutator`. Plattformen lagrer endringene når oppgaven svarer at den gikk bra. Husk at dataelementer fra tidligere oppgaver er låst.

## Registrere systemoppgaven

Plattformen finner oppgaven gjennom tjenesteregisteret i `Program.cs`:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Register your apps custom service implementations here.
    services.AddTransient<IServiceTask, ExampleServiceTask>();
}
```

## Legge til oppgaven i prosessen

Legg inn en `serviceTask`-node der du vil at arbeidet skal skje. Verdien i `taskType` må være den samme som `Type` i C#-klassen.

{{< code-title >}}
App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:serviceTask id="ExampleServiceTask" name="Example service task">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>exampleServiceTask</altinn:taskType>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>Flow_1yq6g64</bpmn:incoming>
    <bpmn:outgoing>Flow_1xowpt0</bpmn:outgoing>
</bpmn:serviceTask>
```

## Gi brukeren tilgang til oppgaven

Systemoppgaver kjører med rettighetene til den som driver prosessen videre (`process/next`). De ferdige systemoppgavene autoriserer plattformen som `write`-operasjoner, men en egendefinert oppgave krever en handling med samme navn som `Type`. Legg handlingen på samme sted som de andre handlingene den aktuelle brukeren skal ha tilgang til.

{{< code-title >}}
App/config/authorization/policy.xml
{{< /code-title >}}

```xml
<xacml:AllOf>
    <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">exampleServiceTask</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
    </xacml:Match>
</xacml:AllOf>
```

## Svare fra systemoppgaven

`Execute` svarer alltid med et `ServiceTaskResult`. Svaret bestemmer hva plattformen gjør videre:

| Svar | Dette skjer |
| --- | --- |
| `ServiceTaskResult.Success()` | Oppgaven er ferdig, og prosessen går videre langs standardflyten. |
| `ServiceTaskResult.Success("reject")` | Oppgaven er ferdig, og prosessen går videre med handlingen `reject` — for eksempel tilbake til utfylling. |
| `ServiceTaskResult.SuccessWithoutAutoAdvance()` | Oppgaven er ferdig, men prosessen står i steget til noen flytter den videre. |
| `ServiceTaskResult.FailedRetryable("melding")` | Noe gikk galt, men det kan gå bedre om litt. Plattformen kjører oppgaven på nytt med økende pause mellom forsøkene. |
| `ServiceTaskResult.FailedPermanent("melding")` | Noe gikk galt som ikke retter seg selv. Plattformen gir opp med en gang, og steget står som feilet. |
| `ServiceTaskResult.Defer(TimeSpan.FromMinutes(5), "venter på svar fra fagsystemet")` | Oppgaven gikk bra, men svaret den venter på har ikke kommet. Plattformen parkerer prosessen og kjører oppgaven på nytt om fem minutter. |

Kaster koden en feil du ikke håndterer selv, tolker plattformen det som en feil den kan prøve på nytt. Skriv derfor `FailedPermanent` selv når du vet at nye forsøk er nytteløse — da slipper både brukeren og driftsmiljøet en lang rekke forsøk.

Et forsøk som venter (`Defer`), lagrer ingenting. Skal oppgaven huske noe, må den lagre det i et forsøk som svarer `Success` — eller i et eget steg, se [Systemoppgaver med flere steg]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}).

## Sørge for at oppgaven tåler flere kjøringer

Plattformen kan kjøre oppgaven på nytt etter en feil. Sender oppgaven en melding, oppretter en sak eller trekker et beløp, må den kjenne igjen arbeid den allerede har gjort:

- Bruk `context.StepId` som nøkkel mot systemet du kaller. Verdien er den samme gjennom alle forsøk på det samme steget, og ny neste gang prosessen kommer til oppgaven.
- Bruk `context.WorkflowId` når du trenger å skille et nytt besøk i oppgaven fra et nytt forsøk på det samme besøket.
- Ikke la koden avgjøre noe ut fra `context.Attempt` eller `context.Wait` for å hindre dobbeltarbeid. Et forsøk som rakk å sende noe før det stoppet, kjører på nytt med de samme verdiene.
- Trenger oppgaven varig spor av noe den har gjort, lagrer du det i instansdataene gjennom `context.InstanceDataMutator`.

## Styre tid og gjentakelser

Trenger oppgaven andre tidsrammer enn standard, overstyrer du `StepOptions`:

```csharp
public ProcessStepOptions? StepOptions =>
    new()
    {
        MaxExecutionTime = TimeSpan.FromMinutes(2),
        WaitBudget = TimeSpan.FromHours(6),
    };
```

- `MaxExecutionTime` er hvor lenge ett forsøk får bruke før plattformen avbryter det og regner forsøket som feilet. Hold den nær det kallet realistisk trenger. Et langt tidsavbrudd på et tregt kall kan forsinke andre instanser.
- `WaitBudget` er hvor lenge oppgaven til sammen får vente når den svarer `Defer`. Når fristen er ute, feiler steget.
- `RetryStrategy` styrer hvor mange nye forsøk plattformen gjør, og hvor lang pausen mellom dem er.

## Oppgaver med flere steg

Skal oppgaven gjøre flere ting etter hverandre — for eksempel sende noe først og vente på svar etterpå — bør hvert arbeidsstykke få sitt eget steg. Se [Systemoppgaver med flere steg]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}).
