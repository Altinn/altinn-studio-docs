---
title: Events
description: Hvordan lage egendefinerte events for en app.
toc: true
weight: 400
---

## Aktivere generering av events i applikasjonen din {#activate-generation-of-events-in-your-application}

{{%notice info%}}
For at applikasjonen din skal kunne generere events må den referere til nugetversjon >= 1.2.4.
Se hvordan du oppdaterer nugetreferanser for applikasjonen din [her](/nb/altinn-studio/v8/guides/administration/maintainance/dependencies/).
{{% /notice%}}

Generering og lagring av events er ikke enablet som default i applikasjonene per 22.10.2020.
Det må derfor et manuelt steg til for at applikasjonen din skal generere events.

I filen `appsettings.json` i mappen _App_ må følgende legges til i seksjonen _AppSettings_

```json
"RegisterEventsWithEventsComponent": true
```

## Sende egne hendelser fra appen {#pushing-self-defined-events-into-your-application}

Appen kan sende egne hendelser (events) med tjenesten `IEventsClient` fra navnerommet `Altinn.App.Core.Internal.Events`. Du får tjenesten ved å ta den inn i konstruktøren til klassen der hendelsen skal oppstå.

Metoden `AddEvent` tar navnet på hendelsestypen og instansen hendelsen gjelder. Appen bruker instansen til å fylle ut resten av metadataene for hendelsen.

### Kodeeksempel

Eksempelet sender en egen hendelse når appen lager skjemadata for en ny instans. Koden ligger i en klasse som implementerer `IInstantiationProcessor`, det samme grensesnittet som du bruker til [forhåndsutfylling med egen kode](/nb/altinn-studio/v8/guides/development/prefill/custom/).

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

Hendelsen har typen `app.test.event`. Registrer klassen i `Program.cs`:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```cs
services.AddTransient<IInstantiationProcessor, InstantiationEvents>();
```

Appen kjører `DataCreation` hver gang den lager skjemadata, så appen sender én hendelse for hvert skjema den lager.

Appen bruker bare den siste klassen som er registrert for `IInstantiationProcessor`. Har appen allerede en slik klasse, for eksempel for forhåndsutfylling, legger du koden for hendelsen i den.

Du kan [teste dette lokalt](https://github.com/Altinn/app-localtest/blob/master/README.md) før du publiserer appen til et testmiljø.
