---
title: Egendefinert
tags: [altinn-apps, process, bpmn, task, service task, systemoppgave]
weight: 10
alias: 
---

En egendefinert systemoppgave krever:
- En C#-implementasjon av interfacet `IServiceTask`
- Et nytt steg i prosessen
- Tilgangsstyring

### Implementasjon i C#

```csharp
using System;
using System.Threading.Tasks;
using Altinn.App.Core.Internal.Data;
using Altinn.App.Core.Internal.Process.ProcessTasks.ServiceTasks;
using Altinn.App.Core.Models;
using Altinn.App.Core.Models.Process;
using Altinn.App.Models.model;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Code;

public class ExampleServiceTask : IServiceTask
{
    private readonly IDataClient _dataClient;

    public ExampleServiceTask(IDataClient dataClient)
    {
        _dataClient = dataClient;
    }
    
    public string Type => "exampleServiceTask";

    public async Task<ServiceTaskResult> Execute(ServiceTaskParameters parameters)
    {
        Instance instance = parameters.InstanceDataMutator.Instance;
        DataElement dataElement = instance.Data.Find(x => x.DataType == "model");

        var instanceIdentifier = new InstanceIdentifier(instance);
        var formData = (model)await _dataClient.GetFormData(instanceIdentifier.InstanceGuid, typeof(model), instance.Org, instance.AppId, int.Parse(instance.InstanceOwner.PartyId), Guid.Parse(dataElement.Id));

        if (formData.property1 != "Hei!")
            return new ServiceTaskFailedResult
            {
                ErrorTitle = "Rude!",
                ErrorMessage = "Didn't say 'Hei!'",
                ErrorType = ProcessErrorType.Conflict
            };
        
        formData.property2 = "Hei, hei!";
        return new ServiceTaskSuccessResult();

    }
}
```

### Legg til en serviceTask-node i BPMN-prosessen. 
Verdien i taskType må være like Type-property på C#-implementasjonen.

```xml
<bpmn:serviceTask id="ExampleServiceTask" name="Hilsen">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>exampleServiceTask</altinn:taskType>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>Flow_1yq6g64</bpmn:incoming>
    <bpmn:outgoing>Flow_1xowpt0</bpmn:outgoing>
</bpmn:serviceTask>
```

### Tilgangsstyring
Systemoppgaver kjører med rettighetene til den brukeren som driver prosessen videre (process next). Standard systemoppgaver autoriseres som `write`-operasjoner. For at brukeren skal ha rettigheter til å kjøre en egendefinert systemoppgave må `Type` fra implementasjonen legges inn som en action i policy.xml.

Legg den på samme sted som andre actions den relevante brukeren skal ha tilgang til.
```
<xacml:AllOf>
    <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">exampleServiceTask</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
    </xacml:Match>
</xacml:AllOf>
```