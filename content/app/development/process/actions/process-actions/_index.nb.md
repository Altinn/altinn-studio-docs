---
title: Process actions
description: Extended authorization, custom logic for process actions
tags: [altinn-apps, process, bpmn, gateway, action, acitons]
weight: 30
toc: true
---

I versjon 8 av appen ble "nugets actions in tasks" introdusert. Dette gjør det mulig for utviklere å knytte ActionButtons i grensesnittet med UserActions i backenden.
Det er mulig å autorisere hver handling i en oppgave separat i policy-filen.

## Handlinger med spesiell Altinn-logikk knyttet til dem

### write
Standard handling som utføres når en data- eller tilbakemeldingsoppgave sendes inn. Dette er også tillatelsen en bruker trenger for å oppdatere data i applikasjonen.

### confirm
Standard handling som utføres når en bekreftelsesoppgave sendes inn.

### sign
Handling som genererer et signaturobjekt basert på konfigurasjonen av oppgaven, se [Signatur](../tasks/signing)

### reject
Handling å bruke når du flytter tilbake fra en oppgave til en annen. Å utføre handlingen "reject" vil sikre at dataelementene i måloppgaven låses opp.

## Egendefinerte handlinger og egendefinert logikk når handlingen utføres

### Egendefinert handling i oppgave
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

The type-attributtet som er definert for handlingen _custom_ (processAction) er standardverdien, så typen for demo er også processAction.

### Definer nødvendige autorisasjonspolicyer

Brukere må gis rettighetene til å utføre handlingene _custom_ og _demo_ når de forlater _Task1_.

Dette er definert i policy.xml:

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

### Skriving av tilpasset kode og registrering som tjeneste

Den tilpassede koden assosiert med en prosesshandling utføres før prosessen flyttes til neste oppgave.

For å skrive tilpasset logikk, opprett en ny klasse som implementerer `Altinn.App.Core.Models.UserAction.IUserAction`.

Denne grensesnittet krever at du definerer en `Id` og en implementering av `public async Task<UserActionResult> HandleAction(UserActionContext context)`. Iden er brukt for å finne riktig C# implementasjon av det handlingen definert i prosessfilen.

En svært enkel implementering av _custom_-handlingen som bare logger brukerens bruker-ID og instans-ID kan implementeres som følger:

```
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

Hvis handlingen returnerer en `UserActionResult` med feltet "success" satt til true, flyttes prosessen til neste oppgave. Ellers vil ikke prosessen bli flyttet, og API-en vil returnere en feil til brukeren.