---
title: Lage en egendefinert systemoppgave
linktitle: Egendefinert
description: Slik lager du en systemoppgave som kjører egen kode i prosessen
tags: [altinn-apps, process, bpmn, task, service task, systemoppgave, needsReview]
---

En egendefinert systemoppgave lar appen gjøre arbeid på serveren midt i prosessen, uten at brukeren gjør noe. Oppgaven består av

- en C#-klasse som implementerer grensesnittet `IServiceTask`
- et nytt steg i prosessen (BPMN)

{{% notice info %}}
Grensesnittet endret seg mellom v8 og v9. Har du en egendefinert systemoppgave fra før, se avsnittet om systemoppgaver i [oppgraderingsveiledningen]({{< relref "/altinn-studio/v9/new-in-v9/upgrade" >}}). Du finner [den tilsvarende veiledningen for v8](/nb/altinn-studio/v8/guides/development/service-tasks/custom/) i dokumentasjonen for gjeldende versjon.
{{% /notice %}}

## Skrive systemoppgaven i C\#

Klassen sier hvilken oppgavetype den håndterer, gjennom `Type`-egenskapen, og hva oppgaven skal gjøre, gjennom `DefineExecute`. En oppgave som gjør én ting, svarer `pipeline.Finally(Execute)` og gjør arbeidet i `Execute`. Verdien du gir `Type`-egenskapen, er navnet du bruker i prosessen.

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

    public ServiceTaskPipeline DefineExecute(PipelineBuilder pipeline) => pipeline.Finally(Execute);

    public async Task<ServiceTaskResult> Execute(StageContext context)
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

Registrer klassen i `Program.cs`, slik at plattformen finner den:

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

Legg inn en `serviceTask`-node der du vil at arbeidet skal skje. Verdien i `taskType` må være den samme som i `Type`-egenskapen på klassen.

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

## Gi tilgang til oppgaven

Når plattformen kjører systemoppgaven og flytter prosessen ut av den, gjør den det som tjenesteeier, ikke som brukeren. Det gjelder også når oppgaven svarer `Success("reject")`. Tjenesteeieren trenger ingen handling for oppgavetypen eller for `reject`, bare `read` og `write`. Tilgangsfilen fra app-malen gir tjenesteeieren begge.

Appen kontrollerer tilgangene til tjenesteeieren når du bygger, gjennom regelen [ALTINNAPP0800]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP0800" >}}). Oppgraderingen fra v8 legger inn de reglene tjenesteeieren mangler. Se [tilgangsregler]({{< relref "/altinn-studio/v9/develop-a-service/configuration/authorization" >}}) for mer om filen.

### Når brukeren skal kunne prøve igjen

Feiler oppgaven, kan brukeren klikke på **Prøv igjen**. Da trenger brukeren `write` på oppgaven. Tilgangsfilen fra app-malen gir brukeren `write` i hele tjenesten. Gir tilgangsfilen din brukeren `write` bare i bestemte oppgaver, må du ta med systemoppgaven i den regelen.

Brukeren kan ikke hoppe over oppgaven. Så lenge oppgaven jobber, venter eller har feilet, svarer plattformen 409 på `process/next`, også når brukeren sender handlingen `reject`. Når oppgaven er ferdig, flytter plattformen prosessen videre selv.

## Hva oppgaven kan svare

`Execute` svarer alltid med et `ServiceTaskResult`. Svaret bestemmer hva plattformen gjør videre. Et svar som sier at oppgaven er ferdig, flytter alltid prosessen videre:

| Svar | Dette skjer |
| --- | --- |
| `ServiceTaskResult.Success()` | Oppgaven er ferdig, og prosessen går videre langs standardflyten. |
| `ServiceTaskResult.Success("reject")` | Oppgaven er ferdig, og prosessen går videre med handlingen `reject` — for eksempel tilbake til utfylling. |
| `ServiceTaskResult.FailedRetryable("melding")` | Noe gikk galt, men det kan gå bedre om litt. Plattformen kjører oppgaven på nytt med økende pause mellom forsøkene. |
| `ServiceTaskResult.FailedPermanent("melding")` | Noe gikk galt som ikke retter seg selv. Plattformen gir opp med en gang, og steget står som feilet. |
| `ServiceTaskResult.Defer(TimeSpan.FromMinutes(5), "venter på svar fra fagsystemet")` | Oppgaven gikk bra, men svaret den venter på har ikke kommet. Prosessen står på steget, og plattformen kjører oppgaven på nytt om fem minutter. |

Kaster koden en feil du ikke håndterer selv, tolker plattformen det som en feil den kan prøve på nytt. Skriv derfor `FailedPermanent` selv når du vet at nye forsøk er nytteløse. Da slipper du en lang rekke forsøk som likevel ikke fører noe sted.

Et forsøk som venter (`Defer`), lagrer ingenting. Endrer oppgaven data og venter i samme forsøk, avviser plattformen forsøket som et brudd på kontrakten. Skal oppgaven huske noe, må den lagre det i et forsøk som svarer `Success`, eller i et eget arbeidssteg. Se [Systemoppgaver med flere steg]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}).

## Vente på svar fra et annet system

Venter oppgaven på et annet system, har du to mekanismer å velge mellom. Valget kommer an på om det andre systemet kan si fra selv, eller om oppgaven må gå og se etter.

**Få svaret som en melding.** Oppgaven åpner en postkasse, sender adressen til postkassen med forespørselen, og venter på meldingen som kommer tilbake. Dette passer når det andre systemet kan svare. Prosessen står på steget til oppgaven har konkludert ut fra svaret, eller til fristen i `MailboxOptions.Timeout` går ut. En postkasse krever en oppgave med flere arbeidssteg. Se [Få svaret som en melding]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}#få-svaret-som-en-melding).

**Sjekke selv.** Svar `Defer(delay, reason)`. Prosessen står på steget, og plattformen kjører oppgaven på nytt etter pausen du oppgir, så mange ganger som den trenger. Dette passer når ingenting kan kalle tilbake. `WaitBudget` setter tak på ventetiden til sammen, og steget feiler når taket er nådd. Bruk `context.Wait.IsFinalCheck` til å gi din egen forklaring på hva som aldri kom, i stedet for et generisk tidsavbrudd.

Et forsøk som venter, lagrer ingenting, og oppgaven kjører fra starten hver gang. Det oppgaven må huske mellom sjekkene, først og fremst at forespørselen alt er sendt, hører derfor i et eget arbeidssteg som fullfører. Se [Systemoppgaver med flere steg]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}).

eFormidling-oppgaven er det innebygde eksempelet: den sender meldingen i ett arbeidssteg, og venter deretter til integrasjonspunktet bekrefter at meldingen er levert.

Uansett hvilken av dem du velger, kan ingen hoppe over ventingen. Brukeren ser lastevisningen eller din egen side, og appen sender brukeren videre av seg selv når oppgaven er ferdig. Se [Hva brukeren ser mens en systemoppgave kjører]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/visning" >}}).

## Gjøre oppgaven trygg å kjøre om igjen

Plattformen kan kjøre oppgaven på nytt etter en feil. Sender oppgaven en melding, oppretter en sak eller trekker et beløp, må den kjenne igjen arbeid den allerede har gjort:

- Bruk `context.StepId` som nøkkel mot systemet du kaller. Verdien er den samme gjennom alle forsøk på det samme steget, og ny neste gang prosessen kommer til oppgaven.
- Bruk `context.WorkflowId` når du trenger å skille et nytt besøk i oppgaven fra et nytt forsøk på det samme besøket.
- Ikke la koden avgjøre noe ut fra `context.Attempt` eller `context.Wait` for å hindre dobbeltarbeid. Et forsøk som rakk å sende noe før det stoppet, kjører på nytt med de samme verdiene.
- Trenger oppgaven varig spor av noe den har gjort, lagrer du det i instansdataene gjennom `context.InstanceDataMutator`.

## Styre tidsbruk og nye forsøk

Trenger oppgaven andre tidsrammer enn standard, gir du et `ProcessStepOptions` til steget i `DefineExecute`, der du setter sammen oppgaven. En oppgave som gjør én ting, har bare ett steg, `Finally`:

{{< code-title >}}
App/logic/ServiceTasks/ExampleServiceTask.cs
{{< /code-title >}}

```csharp
public ServiceTaskPipeline DefineExecute(PipelineBuilder pipeline) =>
    pipeline.Finally(
        Execute,
        new ProcessStepOptions
        {
            MaxExecutionTime = TimeSpan.FromMinutes(2),
            RetryStrategy = ProcessStepRetryStrategy.Exponential(
                baseInterval: TimeSpan.FromSeconds(5),
                maxRetries: 5,
                maxDelay: TimeSpan.FromMinutes(1)
            ),
            WaitBudget = TimeSpan.FromHours(6),
        }
    );
```

Feltene betyr dette:

- `MaxExecutionTime` er hvor lenge ett forsøk får bruke før plattformen avbryter det og regner forsøket som feilet. Hold den nær det kallet realistisk trenger. Et langt tidsavbrudd på et tregt kall kan forsinke andre instanser.
- `RetryStrategy` styrer hvor mange nye forsøk plattformen gjør, og hvor lang pausen mellom dem er. Du kan velge `Exponential`, `Linear` eller `Constant`. `ProcessStepRetryStrategy.None()` slår av nye forsøk.
- `WaitBudget` er hvor lenge steget til sammen får vente når det svarer `Defer`. Når fristen er ute, feiler steget.

Felt du ikke setter, får standardverdien. Har oppgaven flere arbeidssteg, gir du tidsrammene til `Stage`, `HandleReplies` eller `ConcludeOnReplies` på samme måte. Hvert steg får bare det du gir det, og arver ingenting fra de andre stegene.

Standardverdiene og grensene ligger i plattformen, og kan avvike mellom miljøene:

| Verdi | Standard | Grense |
| --- | --- | --- |
| `MaxExecutionTime` for en systemoppgave | 10 minutter | 2 timer |
| `WaitBudget` | ett døgn | 14 døgn |
| Nye forsøk etter `FailedRetryable` | økende pause fra ett sekund, maks fem minutter mellom forsøkene, i opptil ett døgn | — |
| Pausen du oppgir i `Defer` | — | Minst ett sekund |
| `MailboxOptions.Timeout` | — | 21 døgn |

Setter du `MaxExecutionTime` eller `WaitBudget` til 0 eller lavere, starter ikke appen. Setter du dem høyere enn grensen, avviser plattformen overgangen med en gang. Det samme gjelder en postkassefrist over 21 døgn, men den avvisningen kommer først når oppgaven prøver å åpne postkassen. Oppgir du en kortere pause i `Defer` enn ett sekund, venter plattformen ett sekund likevel.

## Oppgaver med flere steg

Skal oppgaven gjøre flere ting etter hverandre, for eksempel sende noe først og vente på svar etterpå, bør hvert arbeidsstykke få sitt eget arbeidssteg. Se [Systemoppgaver med flere steg]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}).
