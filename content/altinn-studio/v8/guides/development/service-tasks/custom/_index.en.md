---
title: Custom
tags: [altinn-apps, process, bpmn, task, service task, systemoppgave]
weight: 10
---

A custom service task requires:
- A C# implementation of the `IServiceTask` interface
- A new step in the process
- Access control

### C# implementation

```C#
using System.Threading.Tasks;
using Altinn.App.Core.Internal.Process.ProcessTasks.ServiceTasks;
using Altinn.App.Core.Models;
using Altinn.App.Models.model;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Code;

public class ExampleServiceTask : IServiceTask
{
    public string Type => "exampleServiceTask";

    public async Task<ServiceTaskResult> Execute(ServiceTaskContext context)
    {
        Instance instance = context.InstanceDataMutator.Instance;
        DataElement dataElement = instance.Data.Find(x => x.DataType == "model");

        var formData = (model)
            await context.InstanceDataMutator.GetFormData(new DataElementIdentifier(dataElement));

        if (formData.property1 != "true")
            return ServiceTaskResult.FailedAbortProcessNext();

        return ServiceTaskResult.Success();
    }
}

```

### Add a serviceTask node in the BPMN process
The value in taskType must match the Type property in the C# implementation.

```
<bpmn:serviceTask id="ExampleServiceTask" name="Greeting">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>exampleServiceTask</altinn:taskType>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>Flow_1yq6g64</bpmn:incoming>
    <bpmn:outgoing>Flow_1xowpt0</bpmn:outgoing>
</bpmn:serviceTask>
```

### Access control
Service tasks run with the permissions of the user who advances the process (process next). Standard service tasks are authorized as `write` operations. For a user to have the rights to run a custom service task, the `Type` from the implementation must be added as an action in policy.xml.

Place it in the same location as other actions that the relevant user should have access to.
```
<xacml:AllOf>
    <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">exampleServiceTask</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
    </xacml:Match>
</xacml:AllOf>
```
