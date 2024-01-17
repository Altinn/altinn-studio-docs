---
title: Process actions
description: Extended authorization, custom logic for process actions
tags: [altinn-apps, process, bpmn, gateway, action, acitons]
weight: 30
toc: true
---

In version 8 of the app nugets actions in tasks were introduced. This makes it possible for developers to associate ActionButtons in the UI with UserActions in the backend.
It is possible to authorize each action in a task separately in the policy file.

## Actions with special altinn logic connected to them

### write
Default action that is performed when a data or feedback task is submitted. This is also the permission a user needs to update data in the application.

### confirm
Default action that is performed when a confirmation task i submitted

### sign
Action that generates a signature object based on the configuration of the task see [Signature](../tasks/signing)

### reject
Action to use when moving back from one task to another. Performing action reject will ensure data elements in the target task is unlocked.

## Custom actions and custom logic when action is performed

### Custom action in task
To add actions to a task you have to modify the `App/config/process/process.bpmn` file and add the wanted action to the task.

Example of a process where Task_1 has the actions _demo_ and _custom_ defined:

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

The type attribute that is defined for the _custom_ action (processAction) is the default value so the type for demo is also processAction.

### Define neccessart authorization policies

Users needs to be granted the right to perform the action _custom_ and _demo_ when moving out of _Task1_

This is defined in policy.xml:

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

### Writing the custom code and registering it as a service

The custom code assosiated with a process action is executed before the process is moved to the next task.

To write custom logic create a new class that implements `Altinn.App.Core.Models.UserAction.IUserAction`.

This interface requires you to define an `Id` and an implementation of `public async Task<UserActionResult> HandleAction(UserActionContext context)`

A very simple implementation of the _custom_ action that only logs the users userId and the instanceId can be implemented as this:

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

If the action retuns a `UserActionResult` with the field success set to true the process is moved to the next task. Otherwise the process will not be moved and the api will return an error to the user.