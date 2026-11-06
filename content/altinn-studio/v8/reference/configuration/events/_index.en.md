---
title: Events
description: How to create custom events for an app.
toc: true
weight: 400
---

## Activate generation of events in your application {#activate-generation-of-events-in-your-application}

{{%notice info%}}
To allow generating events for your application it must refer to nuget version >= 1.2.4.
See how you update nuget references for your application [here](/en/altinn-studio/v8/guides/administration/maintainance/dependencies/).
{{% /notice%}}

Generation and storing of events is not enabled by default in applications per 22.10.2020.
Because of this, a manual step is required before your application can generate events.

In the file `appsettings.json` in the folder _App_ the following should be added into the section _AppSettings_

```json
"RegisterEventsWithEventsComponent": true
```

## Pushing self defined events into your application {#pushing-self-defined-events-into-your-application}

The application can send its own events with the service `IEventsClient` from the namespace `Altinn.App.Core.Internal.Events`. Inject the service into the constructor of the class where the event should happen.

The method `AddEvent` takes the name of the event type and the instance the event concerns. The application uses the instance to fill in the rest of the event's metadata.

### Code example

The example sends a self defined event when the application creates form data for a new instance. The code is in a class that implements `IInstantiationProcessor`, the same interface you use to [prefill data with custom code](/en/altinn-studio/v8/guides/development/prefill/custom/).

{{< code-title >}}
App/logic/Instantiation/InstantiationEvents.cs
{{< /code-title >}}

```cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Internal.Events;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Logic.Instantiation;

public class InstantiationEvents : IInstantiationProcessor
{
    private readonly IEventsClient _eventsClient;

    public InstantiationEvents(IEventsClient eventsClient)
    {
        _eventsClient = eventsClient;
    }

    public async Task DataCreation(Instance instance, object data, Dictionary<string, string>? prefill)
    {
        await _eventsClient.AddEvent("app.test.event", instance);
    }
}
```

The event has the type `app.test.event`. Register the class in `Program.cs`:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```cs
services.AddTransient<IInstantiationProcessor, InstantiationEvents>();
```

The application runs `DataCreation` every time it creates form data, so it sends one event for each form it creates.

The application uses only the last class registered for `IInstantiationProcessor`. If the application already has such a class, for example for prefill, put the code for the event in that class.

You can [test this locally](https://github.com/Altinn/app-localtest/blob/master/README.md) before you deploy the application to a test environment.
