---
title: Serverhandlinger
linktitle: Serverhandlinger
description: Slik skriver du egendefinerte serverhandlinger som kan utføres av en API-bruker eller via en generisk knapp.
toc: true
tags: [needsReview]
weight: 20
---

## Oversikt

Serverhandlinger er en måte å skrive egendefinert backend-kode som sluttbrukere kan utløse enten ved å trykke på en knapp eller gjøre en API-forespørsel.

De er nesten identiske med prosesshandlinger, den eneste forskjellen er at de ikke automatisk endrer prosessstatusen når de utløses.

En serverhandling er knyttet til én eller flere prosessoppgaver og trenger eksplisitte autorisasjonsregler for å gi sluttbrukere rettigheter til å utføre dem.

## Slik oppretter og konfigurerer du en serverhandling

### Slik konfigurerer du tilgjengelige serverhandlinger for en prosessoppgave

For å registrere hvilke serverhandlinger som er tilgjengelige for en prosessoppgave må du legge dem til i oppgavekonfigurasjonen i process.bpmn-filen.

Eksempel på en prosessoppgave med en serverhandling kalt `myServerAction`:

{{< code-title >}}
App/config/process/process.bpmn
{{< /code-title >}}

```xml
<!-- Beginning of process definition omitted for brevity -->
        <bpmn:task id="Task_1" name="Utfylling">
            <bpmn:incoming>SequenceFlow_1</bpmn:incoming>
            <bpmn:outgoing>SequenceFlow_2</bpmn:outgoing>
            <bpmn:extensionElements>
                <altinn:taskExtension>
                    <altinn:taskType>data</altinn:taskType>
                    <altinn:actions>
                        <altinn:action type="serverAction">myServerAction</altinn:action>
                    </altinn:actions>
                </altinn:taskExtension>
            </bpmn:extensionElements>
        </bpmn:task>
<!-- End of process definition omitted for brevity -->
```

### Slik legger du til tilgangspolicy

For å tillate brukere å utløse serverhandlingen må du legge til autorisasjonspolicyer i policy.xml-filen.

Eksempel på en tilgangspolicyregel som gir brukere med rollen `DAGL` tilgang til å utløse serverhandlingen `myServerAction` når prosessen er i `Task_1`:

{{< code-title >}}
App/config/authorization/policy.xml
{{< /code-title >}}

```xml
<!-- Beginning of policy.xml definition omitted for brevity -->
    <xacml:Rule RuleId="urn:altinn:example:ruleid:2" Effect="Permit">
        <xacml:Description>Rule that defines that user with role DAGL can execute myServerAction for
            [ORG]/[APP] when it is in Task_1
        </xacml:Description>
        <xacml:Target>
            <xacml:AnyOf>
                <xacml:AllOf>
                    <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">DAGL</xacml:AttributeValue>
                        <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode"
                                                   Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject"
                                                   DataType="http://www.w3.org/2001/XMLSchema#string"
                                                   MustBePresent="false"/>
                    </xacml:Match>
                </xacml:AllOf>
            </xacml:AnyOf>
            <xacml:AnyOf>
                <xacml:AllOf>
                    <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
                        <xacml:AttributeDesignator AttributeId="urn:altinn:org"
                                                   Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource"
                                                   DataType="http://www.w3.org/2001/XMLSchema#string"
                                                   MustBePresent="false"/>
                    </xacml:Match>
                    <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[APP]</xacml:AttributeValue>
                        <xacml:AttributeDesignator AttributeId="urn:altinn:app"
                                                   Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource"
                                                   DataType="http://www.w3.org/2001/XMLSchema#string"
                                                   MustBePresent="false"/>
                    </xacml:Match>
                    <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">Task_1</xacml:AttributeValue>
                        <xacml:AttributeDesignator AttributeId="urn:altinn:task"
                                                   Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource"
                                                   DataType="http://www.w3.org/2001/XMLSchema#string"
                                                   MustBePresent="false"/>
                    </xacml:Match>
                </xacml:AllOf>
            </xacml:AnyOf>
            <xacml:AnyOf>
                <xacml:AllOf>
                    <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">myServerAction</xacml:AttributeValue>
                        <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id"
                                                   Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action"
                                                   DataType="http://www.w3.org/2001/XMLSchema#string"
                                                   MustBePresent="false"/>
                    </xacml:Match>
                </xacml:AllOf>
            </xacml:AnyOf>
        </xacml:Target>
    </xacml:Rule>
<!-- End of policy.xml definition omitted for brevity -->
```

### Slik skriver du tilpasset kode og registrerer den som tjeneste

For å skrive tilpasset logikk, opprett en ny klasse som implementerer `Altinn.App.Core.Features.IUserAction`.

Dette grensesnittet krever at du definerer en `Id` og en implementasjon av `Task<UserActionResult> HandleAction(UserActionContext context)`. Systemet bruker ID-en for å finne riktig C#-implementasjon av handlingen som er definert i prosessfilen.

Et enkelt eksempel på serverhandlingen `myServerAction` som logger brukerens bruker-ID og instans-ID:

{{< code-title >}}
App/logic/MyServerAction.cs
{{< /code-title >}}

```csharp
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Models.UserAction;
using Microsoft.Extensions.Logging;

namespace Altinn.App.Logic;

public class MyServerAction(ILogger<MyServerAction> logger) : IUserAction
{
    public string Id => "myServerAction";

    public Task<UserActionResult> HandleAction(UserActionContext context)
    {
        logger.LogInformation("UserId: {UserId}, InstanceId: {InstanceId}", context.UserId, context.Instance.Id);
        return Task.FromResult(UserActionResult.SuccessResult());
    }
}
```

`context.UserId` er bare satt når en person utfører handlingen. Hvis for eksempel en systembruker utfører handlingen, er den `null`. Bruk `context.Authentication` hvis du trenger å vite hvem som utførte handlingen.

Registrer klassen som `IUserAction` i `Program.cs`:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp
using Altinn.App.Core.Features;
using Altinn.App.Logic;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.AddTransient<IUserAction, MyServerAction>();
}
```

### Resultatet av handlingen

`HandleAction` returnerer en `UserActionResult`. Bruk en av disse metodene for å lage resultatet:

- `UserActionResult.SuccessResult()`: Handlingen lyktes.
- `UserActionResult.FailureResult(new ActionError { Message = "..." })`: Handlingen mislyktes, og API-et returnerer en feil til brukeren. `errorType` bestemmer statuskoden, for eksempel `ProcessErrorType.BadRequest` for 400. Standard er 500.
- `UserActionResult.RedirectResult(uri)`: Appen sender brukeren videre til en annen URL.

I motsetning til prosesshandlinger flytter serverhandlinger **ikke** prosessen til neste oppgave. Hvis prosessen skal gå videre, bruker du en [prosesshandling]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/actions/process-actions" >}}) i stedet.
