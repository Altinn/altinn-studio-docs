---
title: Prefilling data using custom code
linktitle: Custom
description: How to code custom prefill of data in an app.
toc: false
weight: 300
---

Altinn apps enable prefill of an instance with custom data,
whether it is the result of an API call, calculations done under instantiation or other logic.

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v4, v5, v6">}}

This is implemented in the method _DataCreation_ in the file _InstantiationHandler.cs_ that can be found in the application repo under `App/logic`.

The example below populates the field _Bruker.FulltNavn_ in the model _Datamodell_ with the value "Test Testesen".

```C# {hl_lines=[6]}
public async Task DataCreation(Instance instance, object data)
{
    if (data.GetType() == typeof(Datamodell))
    {
        Datamodell model = (Datamodell)data;
        model.Bruker.FulltNavn = "Test Testesen";
    }
}
```

Replace _Data model_ with the name on the C# class that has been generated based 
on the xsd uploaded to Altinn Studio. If you use a suitable code editor you will be able to define fields
to be populated using intellisense.

Keep in mind that if you have complex types in your model, these will need to be instantiated before you can
assign a value to one of the type's subelements. See the example below where we assume that `Bruker` and 
`Name` are separate C# classes.

```C#
public async Task DataCreation(Instance instance, object data)
{
    if (data.GetType() == typeof(Datamodell))
    {
        Datamodell model = (Datamodell)data;
        Bruker b = new Bruker();
        b.Navn = new Name();
        b.Navn.FulltNavn = "Test Testesen";
    }
}
```
{{</content-version-container>}}

{{<content-version-container version-label="v7">}}
In version 7 the way to do custom code instantiation has changed. We now use an dependency injection based approach insted of overriding methods. If you previously used to place your custom code in the DataCreation method in the _InstantiationHandler.cs_ class you will see that it's mostly the same.

1. Create a class that implements the `IInstantiationProcessor` interface found in the `Altinn.App.Core.Features` namespace.  
    You can name and place the file in any folder you like within your project, but we suggest you use meaningful namespaces like in any other .Net project.
    The example below populates the field _Bruker.FulltNavn_ in the model _Datamodell_ with the value "Test Testesen".
    ```C# {hl_lines=[23]}
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Altinn.App.Core.Features;
    using Altinn.App.Models;
    using Altinn.Platform.Storage.Interface.Models;

    public class Instantiation: IInstantiationProcessor
    {
        public async Task DataCreation(Instance instance, object data, Dictionary<string, string> prefill)
        {
            if (data.GetType() == typeof(Datamodell))
            {
                Datamodell skjema = (Datamodell)data;
                
                Bruker b = new Bruker();
                b.Navn = new Name();
                b.FulltNavn = "Test Testesen";
                
                skjema.Bruker = b;
            }

            await Task.CompletedTask;
        }
    }
    ```
2. Register you custom implementation in the _Program.cs_ class
    ```C#
    services.AddTransient<IInstantiationProcessor, Instantiation>();
    ```
    This ensuers your custom code is known to the application and that it will be executed.

{{</content-version-container>}}
{{</content-version-selector>}}