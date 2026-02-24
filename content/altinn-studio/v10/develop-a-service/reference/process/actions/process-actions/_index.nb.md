---
title: Prosesshandlinger
linktitle: Prosesshandlinger
description: Slik autoriserer du handlinger og skriver tilpasset logikk for prosesshandlinger.
tags: [altinn-apps, process, bpmn, gateway, action, actions, needsReview, needsTranslation]
toc: true
weight: 10
---

Versjon 8 av appen introduserte "nugets actions in tasks". Dette gjør det mulig for deg som utvikler å knytte ActionButtons i grensesnittet med UserActions i backenden.

Du kan autorisere hver handling i en oppgave separat i policy-filen.

## Handlinger med spesiell Altinn-logikk knyttet til dem

### write
Standardhandling som systemet utfører når en data- eller tilbakemeldingsoppgave sendes inn. Dette er også tillatelsen en bruker trenger for å oppdatere data i appen.

### confirm
Standardhandling som systemet utfører når en bekreftelsesoppgave sendes inn.

### sign
Handling som genererer et signaturobjekt basert på konfigurasjonen av oppgaven. Se [Signering](../../tasks/signing/).

### reject
Handling du bruker når du flytter tilbake fra en oppgave til en annen. Handlingen "reject" sørger for at dataelementene i måloppgaven blir låst opp.

## Egendefinerte handlinger og egendefinert logikk når handlingen utføres

### Slik legger du til egendefinert handling i oppgave

For å legge til handlinger i en oppgave må du endre filen `App/config/process/process.bpmn` og legge til ønsket handling i oppgaven.

Eksempel på en prosess der Task_1 har handlingene _demo_ og _custom_ definert:

```xml {hl_lines=["15-27"]}
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions id="Definitions_1eqx4ru"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
targetNamespace="http://bpmn.io/schema/bpmn"
xmlns:altinn="http://altinn.no/process">
  <bpmn:process id="Process_1rq9ej8" isExecutable="false">
    <bpmn:startEvent id="StartEvent">
      <bpmn:outgoing>Flow1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow1" sourceRef="StartEvent" targetRef="Task1" />
    <bpmn:task id="Task_1" name="Utfylling">
      <bpmn:incoming>Flow1</bpmn:incoming>
      <bpmn:outgoing>Flow2</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
          <altinn:taskType>data</altinn:taskType>
          <altinn:actions>
            <altinn:action>demo</altinn:action>
            <altinn:action type="processAction">custom</altinn:action>
          </altinn:actions>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow2" sourceRef="Task1" targetRef="EndEvent" />
    <bpmn:endEvent id="EndEvent">
      <bpmn:incoming>Flow2</bpmn:incoming>
    </bpmn:endEvent>
  </bpmn:process>
</bpmn:definitions>
```

Type-attributtet som er definert for handlingen _custom_ (processAction) er standardverdien, så typen for demo er også processAction.

### Slik definerer du nødvendige autorisasjonspolicyer

Du må gi brukere rettigheter til å utføre handlingene _custom_ og _demo_ når de forlater _Task_1_.

Dette defineres i policy.xml:

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
                        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">custom</xacml:AttributeValue>
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

Systemet utfører den tilpassede koden du har knyttet til en prosesshandling før prosessen flyttes til neste oppgave.

For å skrive tilpasset logikk, opprett en ny klasse som implementerer `Altinn.App.Core.Models.UserAction.IUserAction`.

Dette grensesnittet krever at du definerer en `Id` og en utføring av `public async Task<UserActionResult> HandleAction(UserActionContext context)`. Systemet bruker ID-en for å finne riktig C#-utføring av handlingen som er definert i prosessfilen.

Et svært enkelt eksempel på _custom_-handlingen som bare logger brukerens bruker-ID og instans-ID:

```csharp
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Models.UserAction;
using Microsoft.Extensions.Logging;

namespace Altinn.App.Actions;

public class MyDemoAction: IUserAction
{
    private readonly ILogger<MyDemoAction> _logger;

    public MyDemoAction(ILogger<MyDemoAction> logger)
    {
        _logger = logger;
    }

    public string Id => "demo";
    public async Task<UserActionResult> HandleAction(UserActionContext context)
    {
        await Task.CompletedTask;
        _logger.LogInformation("UserId: {userId}, InstanceId: {instanceId}", context.UserId, context.Instance.Id);
        return UserActionResult.SuccessResult();
    }
}

```

Hvis handlingen returnerer en `UserActionResult` med feltet "success" satt til true, flytter systemet prosessen til neste oppgave. Ellers flytter ikke systemet prosessen, og API-en returnerer en feil til brukeren.
