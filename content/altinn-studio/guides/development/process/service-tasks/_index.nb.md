---
title: Systemoppgave
description: Automatiske systemoppgaver
tags: [altinn-apps, process, bpmn, task, service task, systemoppgave]
weight: 10
---

## Hva er en systemoppgave?

{{% insert "content/altinn-studio/guides/development/process/service-tasks/intro.nb.md" %}}

### Egendefinerte systemoppgaver
En egendefinert systemoppgave krever endringer i prosessen, i tilgangsstyring og en implementasjon av interfacet `IServiceTask`.

#### BPMN

```xml
<bpmn:serviceTask id="ExampleServiceTask" name="Example Service Task">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>exampleServiceTask</altinn:taskType>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>Flow_1yq6g64</bpmn:incoming>
    <bpmn:outgoing>Flow_1xowpt0</bpmn:outgoing>
</bpmn:serviceTask>
```

#### Implementasjon

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Altinn.App.Core.Internal.Data;
using Altinn.App.Core.Internal.Process.ProcessTasks.ServiceTasks;
using Altinn.App.Core.Models;
using Altinn.App.Models.model;
using Altinn.Platform.Storage.Interface.Models;
using Microsoft.Extensions.Logging;

namespace Altinn.App.Code;

public class ExampleServiceTask : IServiceTask
{
    private readonly IDataClient _dataClient;
    private readonly ILogger<ExampleServiceTask> _logger;

    public ExampleServiceTask(IDataClient dataClient, ILogger<ExampleServiceTask> logger)
    {
        _dataClient = dataClient;
        _logger = logger;
    }
    
    public string Type => "exampleServiceTask";

    public async Task Execute(string taskId, Instance instance, CancellationToken cancellationToken = default)
    {
        DataElement dataElement = instance.Data.Find(x => x.DataType == "model");

        var instanceIdentifier = new InstanceIdentifier(instance);
        var formData = (model)await _dataClient.GetFormData(instanceIdentifier.InstanceGuid, typeof(model), instance.Org, instance.AppId, int.Parse(instance.InstanceOwner.PartyId), Guid.Parse(dataElement.Id));

        if (formData.property1 == "Hei")
        {
            _logger.LogInformation("Hei hei!");
        }
    }
}
```

Dersom det ikke er ønskelig at prosessen skal gå automatisk videre så kan man implementere metoden `MoveToNextTaskAfterExecution` i systemoppgave-klassen.
```
public Task<bool> MoveToNextTaskAfterExecution(
        string taskId,
        Instance instance,
        CancellationToken cancellationToken = default
    )
    {
        return Task.FromResult(false);
    }
```

#### Tilgangsstyring
Systemoppgaver kjører med rettighetene til den brukeren som driver prosessen videre (process next). For at brukeren skal ha rettigheter til å kjøre en egendefinert systemoppgave må `Type` fra implementasjonen legges inn som en action i policy.xml.
Legg den på samme sted som andre actions den relevante brukeren skal ha tilgang til.
```
<xacml:AllOf>
    <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">exampleServiceTask</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
    </xacml:Match>
</xacml:AllOf>
```