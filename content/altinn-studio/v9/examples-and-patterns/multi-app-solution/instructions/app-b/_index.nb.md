---
title: App B
linktitle: App B
description: Slik setter du opp app B
weight: 20
tags: [needsReview]
aliases:

- /app/multi-app-solution/instructions/app-b

---

App B tar imot data fra app A og viser eller behandler dem.
Ellers fungerer den som en vanlig Altinn-app, der brukeren avslutter instansen ved å sende inn skjemaet.
Hvis app B ikke har en naturlig avslutning, må du avslutte instansene på en annen måte.

Siden har to deler:

- [Hente data fra app A](#hente-data-fra-app-a)
- [Stoppe en aktiv instans](#stoppe-en-aktiv-instans)

## Hente data fra app A

App B trenger mindre oppsett enn app A.
Hovedoppgaven til app B er å hente dataene fra app A og vise eller behandle dem.

Hvis du bruker forhåndsutfylling eller presentasjonsfelt, som beskrevet i
[alternativ 1 og 2 i veiledningen for app A]({{< relref "/altinn-studio/v9/examples-and-patterns/multi-app-solution/instructions/app-a#kontrollere-data-i-app-b" >}}),
trenger du ikke egen kode.

Hvis du bruker alternativ 3, må du hente dataene fra instansen selv.
Du gjør dette i `ProcessDataRead`-metoden i klassen som implementerer `IDataProcessor`.
Endringer du gjør i datamodellen i `ProcessDataRead`, lagrer appen automatisk.
Eksempel:

{{< code-title >}}
App/logic/DataProcessor.cs
{{< /code-title >}}

```csharp
public class DataProcessor : IDataProcessor
{
    public Task ProcessDataRead(Instance instance, Guid? dataId, object data, string? language)
    {
        // Bytt ut DataModel med navnet på datamodellen din
        if (data is DataModel modell)
        {
            // "vedlegg" er datatypen app A sender dataene som, se alternativ 3 i veiledningen for app A
            DataElement? dataFraAppA = instance.Data.FirstOrDefault(de => de.DataType == "vedlegg");

            if (dataFraAppA != null)
            {
                // Oppdater modell med informasjon om dataene fra app A
            }
        }
        return Task.CompletedTask;
    }

    public Task ProcessDataWrite(Instance instance, Guid? dataId, object data, object? previousData, string? language)
    {
        return Task.CompletedTask;
    }
}
```

Registrer klassen i `Program.cs`:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.AddTransient<IDataProcessor, DataProcessor>();
}
```

## Stoppe en aktiv instans

Som oftest viser app B bare data fra app A, og da har appen ingen naturlig avslutning på prosessen.
Du kan løse det ved å enten

- slette instansene manuelt når mottakeren har lest dem
- kreve at brukeren gjør noe i app B som avslutter prosessen
