---
draft: true
title: Lage en egendefinert systemoppgave
linktitle: Egendefinert
description: Slik lager du en systemoppgave som kjører egen kode i prosessen
tags: [altinn-apps, process, bpmn, task, service task, systemoppgave, needsReview, translate-to-english]
---

En egendefinert systemoppgave lar appen gjøre arbeid på serveren midt i prosessen, uten at brukeren gjør noe. Oppgaven består av

- en C#-klasse som implementerer grensesnittet `IServiceTask`
- et nytt steg i prosessen (BPMN)
- en tilgangsregel som lar appen flytte prosessen forbi steget

{{% notice info %}}
Grensesnittet endret seg mellom v8 og v9. Har du en egendefinert systemoppgave fra før, se avsnittet om systemoppgaver i [oppgraderingsveiledningen]({{< relref "/altinn-studio/v9/new-in-v9/upgrade" >}}). Du finner [den tilsvarende veiledningen for v8](/nb/altinn-studio/v8/guides/development/service-tasks/custom/) i dokumentasjonen for gjeldende versjon.
{{% /notice %}}

## Skrive systemoppgaven i C#

Klassen sier hvilken oppgavetype den håndterer (`Type`), og hva oppgaven skal gjøre (`Execute`). Verdien i `Type` er navnet du bruker i prosessen og i tilgangsregelen.

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

## Gi tilgang til oppgaven

Når plattformen flytter prosessen ut av en systemoppgave, gjør den det som tjenesteeier, ikke som brukeren. Kaller en bruker eller et annet system `process/next` selv, kontrollerer appen i tillegg at den som kaller, har handlingen for oppgaven den står på.

Tjenesteeieren må derfor ha tilgang til handlingen som hører til oppgavetypen. Mangler den, feiler overgangen ut av steget. Plattformen prøver på nytt i opptil ett døgn mens brukeren ser ventesiden, og loggen forteller hvilken rettighet tjenesteeieren mangler.

Tilgangsfilen fra appmalen gir tjenesteeieren de grunnleggende handlingene, blant annet `read`, `write`, `instantiate` og `complete`. Den gir ingen egendefinert handling, så en egen oppgavetype må du åpne selv.

### Handlingen prosessen krever

| Oppgavetype | Handlingen prosessen krever |
| --- | --- |
| `data`, `feedback`, `pdf`, `eFormidling`, `fiksArkiv`, `subformPdf` | `write` |
| `payment` | `pay` eller `write` |
| `signing` | `sign` eller `write` |
| `confirmation` | `confirm` |
| Egendefinert oppgavetype | Handling med samme navn som oppgavetypen |

Oppgraderingen fra v8 legger inn de grunnleggende reglene for tjenesteeieren, men gir ikke tilgang til egendefinerte oppgavetyper automatisk. Den leser prosessen og sier fra om handlingene du må legge inn selv. Appen kontrollerer det samme når du bygger, gjennom regelen `ALTINNAPP0800`.

### Regelen tjenesteeieren trenger

Bytt ut `[ORG]`, `[APP]`, `[RULE_ID]` og `[TASK_TYPE]` med verdiene for appen din, der `[TASK_TYPE]` er den samme som `Type` i C#-klassen:

{{< code-title >}}
App/config/authorization/policy.xml
{{< /code-title >}}

```xml
<xacml:Rule RuleId="urn:altinn:example:ruleid:[RULE_ID]" Effect="Permit">
  <xacml:Description>Tjenesteeier kan flytte prosessen forbi systemoppgaven [TASK_TYPE].</xacml:Description>
  <xacml:Target>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[APP]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[TASK_TYPE]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
  </xacml:Target>
</xacml:Rule>
```

Se [tilgangsregler]({{< relref "/altinn-studio/v9/develop-a-service/configuration/authorization" >}}) for mer om filen.

### Når brukeren også skal kunne flytte prosessen

Skal en person kunne flytte prosessen forbi oppgaven selv, eller kunne trykke **Prøv igjen** på en oppgave som har feilet, trenger brukeren den samme handlingen. Legg den på samme sted som de andre handlingene brukeren skal ha tilgang til.

```xml
<xacml:AllOf>
    <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">exampleServiceTask</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
    </xacml:Match>
</xacml:AllOf>
```

{{% notice warning %}}
En oppgave som er parkert med `SuccessWithoutAutoAdvance()`, er bare beskyttet av tilgangsreglene. Alle som har handlingen, kan flytte prosessen forbi ventingen med et kall til `process/next`. Skal ikke sluttbrukeren kunne det, gi bare tjenesteeieren tilgang.

En oppgave som venter med `Defer` eller på en postkasse, kan ingen hoppe over. Plattformen svarer 409 så lenge oppgaven fortsatt jobber.
{{% /notice %}}

### Slippe prosessen videre fra et annet system

Parkerer oppgaven prosessen med `SuccessWithoutAutoAdvance()`, går prosessen videre først når noen kaller

```http
PUT /{org}/{app}/instances/{instanceOwnerPartyId}/{instanceGuid}/process/next
```

Vanligvis er det det andre systemet som kaller, med et Maskinporten-token for tjenesteeieren. Da holder det med regelen tjenesteeieren trenger, som står over: den dekker både kallet og lagringen etterpå.

## Hva oppgaven kan svare

`Execute` svarer alltid med et `ServiceTaskResult`. Svaret bestemmer hva plattformen gjør videre:

| Svar | Dette skjer |
| --- | --- |
| `ServiceTaskResult.Success()` | Oppgaven er ferdig, og prosessen går videre langs standardflyten. |
| `ServiceTaskResult.Success("reject")` | Oppgaven er ferdig, og prosessen går videre med handlingen `reject` — for eksempel tilbake til utfylling. |
| `ServiceTaskResult.SuccessWithoutAutoAdvance()` | Oppgaven er ferdig, men prosessen står i steget til noen flytter den videre. |
| `ServiceTaskResult.FailedRetryable("melding")` | Noe gikk galt, men det kan gå bedre om litt. Plattformen kjører oppgaven på nytt med økende pause mellom forsøkene. |
| `ServiceTaskResult.FailedPermanent("melding")` | Noe gikk galt som ikke retter seg selv. Plattformen gir opp med en gang, og steget står som feilet. |
| `ServiceTaskResult.Defer(TimeSpan.FromMinutes(5), "venter på svar fra fagsystemet")` | Oppgaven gikk bra, men svaret den venter på har ikke kommet. Plattformen parkerer prosessen og kjører oppgaven på nytt om fem minutter. |

Kaster koden en feil du ikke håndterer selv, tolker plattformen det som en feil den kan prøve på nytt. Skriv derfor `FailedPermanent` selv når du vet at nye forsøk er nytteløse. Da slipper du en lang rekke forsøk som likevel ikke fører noe sted.

Et forsøk som venter (`Defer`), lagrer ingenting. Endrer oppgaven data og venter i samme forsøk, avviser plattformen forsøket som et brudd på kontrakten. Skal oppgaven huske noe, må den lagre det i et forsøk som svarer `Success`, eller i et eget arbeidssteg. Se [Systemoppgaver med flere steg]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}).

## Vente på svar fra et annet system

Venter oppgaven på et annet system, har du to mekanismer å velge mellom. Valget kommer an på om det andre systemet kan si fra selv, eller om oppgaven må gå og se etter.

**Parkere prosessen.** Svar `SuccessWithoutAutoAdvance()`. Oppgaven er ferdig, men prosessen står på steget til noen driver den videre med et autorisert kall til `process/next`. Dette passer når det andre systemet kan kalle tilbake til appen. Ingenting driver prosessen videre av seg selv, så kommer kallet aldri, står instansen på oppgaven i det uendelige.

**Sjekke selv.** Svar `Defer(delay, reason)`. Prosessen står på steget, og plattformen kjører oppgaven på nytt etter pausen du oppgir, så mange ganger som den trenger. Dette passer når ingenting kan kalle tilbake. `WaitBudget` setter tak på ventetiden til sammen, og steget feiler når taket er nådd. Bruk `context.Wait.IsFinalCheck` til å gi din egen forklaring på hva som aldri kom, i stedet for et generisk tidsavbrudd.

Et forsøk som venter, lagrer ingenting, og oppgaven kjører fra starten hver gang. Det oppgaven må huske mellom sjekkene, først og fremst at forespørselen alt er sendt, hører derfor i et eget arbeidssteg som fullfører. Se [Systemoppgaver med flere steg]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}).

eFormidling-oppgaven er det innebygde eksempelet: den sender meldingen i ett arbeidssteg, og venter deretter til integrasjonspunktet bekrefter at meldingen er levert.

Uansett hvilken av dem du velger, ser brukeren en side som venter, og appen sender brukeren videre av seg selv. Se [Hva brukeren ser mens en systemoppgave kjører]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/visning" >}}).

## Gjøre oppgaven trygg å kjøre om igjen

Plattformen kan kjøre oppgaven på nytt etter en feil. Sender oppgaven en melding, oppretter en sak eller trekker et beløp, må den kjenne igjen arbeid den allerede har gjort:

- Bruk `context.StepId` som nøkkel mot systemet du kaller. Verdien er den samme gjennom alle forsøk på det samme steget, og ny neste gang prosessen kommer til oppgaven.
- Bruk `context.WorkflowId` når du trenger å skille et nytt besøk i oppgaven fra et nytt forsøk på det samme besøket.
- Ikke la koden avgjøre noe ut fra `context.Attempt` eller `context.Wait` for å hindre dobbeltarbeid. Et forsøk som rakk å sende noe før det stoppet, kjører på nytt med de samme verdiene.
- Trenger oppgaven varig spor av noe den har gjort, lagrer du det i instansdataene gjennom `context.InstanceDataMutator`.

## Styre tidsbruk og nye forsøk

Trenger oppgaven andre tidsrammer enn standard, overstyrer du `StepOptions`:

```csharp
public ProcessStepOptions? StepOptions =>
    new()
    {
        MaxExecutionTime = TimeSpan.FromMinutes(2),
        WaitBudget = TimeSpan.FromHours(6),
    };
```

Feltene betyr dette:

- `MaxExecutionTime` er hvor lenge ett forsøk får bruke før plattformen avbryter det og regner forsøket som feilet. Hold den nær det kallet realistisk trenger. Et langt tidsavbrudd på et tregt kall kan forsinke andre instanser.
- `WaitBudget` er hvor lenge oppgaven til sammen får vente når den svarer `Defer`. Når fristen er ute, feiler steget.
- `RetryStrategy` styrer hvor mange nye forsøk plattformen gjør, og hvor lang pausen mellom dem er.

Standardverdiene og grensene ligger i plattformen, og kan avvike mellom miljøene:

| Verdi | Standard | Grense |
| --- | --- | --- |
| `MaxExecutionTime` for en systemoppgave | 10 minutter | 2 timer |
| `WaitBudget` | ett døgn | 14 døgn |
| Nye forsøk etter `FailedRetryable` | økende pause fra ett sekund, maks fem minutter mellom forsøkene, i opptil ett døgn | — |
| Pausen du oppgir i `Defer` | — | Minst ett sekund |
| `MailboxOptions.Timeout` | — | 21 døgn |

Setter du `MaxExecutionTime` eller `WaitBudget` høyere enn grensen, avviser plattformen overgangen med en gang. Det samme gjelder en postkassefrist over 21 døgn, men den avvisningen kommer først når oppgaven prøver å åpne postkassen. Oppgir du en kortere pause i `Defer` enn ett sekund, venter plattformen ett sekund likevel.

## Oppgaver med flere steg

Skal oppgaven gjøre flere ting etter hverandre, for eksempel sende noe først og vente på svar etterpå, bør hvert arbeidsstykke få sitt eget arbeidssteg. Se [Systemoppgaver med flere steg]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}).
