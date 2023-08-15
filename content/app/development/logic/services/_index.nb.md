---
title: Tjenester
linktitle: Tjenester
description: Hvordan benytte enkelte bortgjemte tjenester og klienter i app template bibliotekene.
toc: false
weight: 30
---

## Personoppslag
Tjenesten for personoppslag kan brukes til å verifisere et personnummer og til å hente informasjon om den identifiserte personen. Brukeren vil måtte oppgi både et personnummer og etternavnet til personen. Tjenesten vil da gjøre et oppslag på personnummeret og sjekke at etternavnet stemmer. Begge verdiene er obligatoriske og etternavnet brukes til å forhindre vasking av personnummer. Hvis brukeren oppgir feil informasjon for mange ganger vil brukeren bli sperret fra å gjøre flere oppslag i en liten periode.

De returnete persondataene kan brukes til å fylle ut andre felter i datamodellen.

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v7">}}
### Personoppslag eksempel
Tjenesten kan benyttes fra alle "handlers" i logikk klassene i en app. Nedenfor har vi laget et eksempel som gjør oppslag i `ProcessDataWrite` metoden i `DataProcessor`.

```C#
using System;
using System.Threading;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Interface;
using Altinn.App.Models;
using Altinn.Platform.Register.Models;
using Altinn.Platform.Storage.Interface.Models;
using Microsoft.Extensions.Logging;

namespace Altinn.App.AppLogic.DataProcessing;

public class DataProcessor : IDataProcessor

public async Task<bool> ProcessDataWrite(
    Instance instance, Guid? dataId, object data)
{
    if (data is MessageV1 message)
    {
        Person person = await _personLookup.GetPerson(
            message.Personnummer, 
            message.Etternavn, 
            CancellationToken.None);

        message.Fornavn = person.FirstName;
        return true;
    }

    return false;
}
```

For at dette skal fungere må vi gjøre et par andre endringer i `DataProcessor`. 

Legg til et privat felt `_personLookup` for tjenesten og oppdater klassens konstruktør til å ta inn en instanse av tjenesten som input. Set det private feltet i konstruktøren.

```C#
private readonly IPersonLookup _personLookup;

    public DataProcessor(IPersonLookup personLookup)
    {
        _personLookup = personLookup;
    }
```

Registrer din implementering i Program.cs klassen.

```C# {hl_lines=[3]}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
{
    services.AddTransient<IPersonService, PersonService>();
    services.AddTransient<IDataProcessor, DataProcessor>();
    // Other custom services
}
```
{{</content-version-container>}}
{{<content-version-container version-label="v4, v5, v6">}}
### Personoppslag eksempel
Tjenesten kan benyttes fra alle "handlers" i logikk klassene i en app. Nedenfor har vi laget et eksempel som gjør oppslag i `ProcessDataWrite` metoden i `DataProcessingHandler`.

```C#
public async Task<bool> ProcessDataWrite(
    Instance instance, Guid? dataId, object data)
{
    if (data is MessageV1 message)
    {
        Person person = await _personLookup.GetPerson(
            message.Personnummer, 
            message.Etternavn, 
            CancellationToken.None);

        message.Fornavn = person.FirstName;
        return true;
    }

    return false;
}
```

For at dette skal fungere må vi gjøre et par andre endringer i `DataProcessingHandler`. 

Legg til et privat felt `_personLookup` for tjenesten og oppdater klassens konstruktør til å ta inn en instanse av tjenesten som input. Set det private feltet i konstruktøren.

```C#
private readonly IPersonLookup _personLookup;

public DataProcessingHandler(IPersonLookup personLookup)
{
    _personLookup = personLookup;
}
```

Endringene i `DataProcessingHandler` konstruktøren medfører at man også må gjøre endringer i konstruktøren til `App` klassen. Legg til `IPersonLookup` som input parameter og bruk verdien som input i konstruktøren til `DataProcessingHandler`.

```C# {hl_lines=[4,9]}
public App(
    ...
    IText textService,
    IPersonLookup personLookup,
    IHttpContextAccessor httpContextAccessor) : base(...)
{
    _logger = logger;
    _validationHandler = new ValidationHandler(httpContextAccessor);
    _dataProcessingHandler = new DataProcessingHandler(personLookup);
    _instantiationHandler = new InstantiationHandler(profileService, registerService);
    _pdfHandler = new PdfHandler();
}
```
{{</content-version-container>}}

{{</content-version-selector>}}

### Håndtering av feil

Uten flere endringer enn de som er beskrevet over, vil app backend begynne å svare med statuskode `429 - TooManyRequests` hvis brukeren har oppgitt feil data for mange ganger. Denne statuskoden er for øyeblikket ikke håndtert av frontend delen av app koden. Dette vil i utganspunktet resultere i "ukjent feil" som kan unngås ved å legge inn håndtering av exceptions. Det kan legges inn kode som fanger opp PlatformHttpException med en response med statuskode 429, men det er i dag ingen god innebygget mekanisme som kan brukes til å informere brukeren om hvorfor noe gikk galt. Det man eventuelt kan gjøre er å benytte et felt i datamodellen.

```C#
try
{
    ...
    return true;
}
catch (PlatformHttpException phex)
{
    switch (phex.Response.StatusCode)
    {
        case HttpStatusCode.TooManyRequests:
            // Add corrective messures
            break;
        case HttpStatusCode.NotFound:
            // Add corrective messures
            break;
    }
    throw;
}
```
