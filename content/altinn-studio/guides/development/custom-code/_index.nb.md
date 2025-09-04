---
title: Implementere egendefinert kode
description: Hvordan du implementerer grensesnitt for egendefinert kode i din app
toc: true
weight: 500
---

Denne guiden viser deg hvordan du kan implementere egendefinerte grensesnitt i din Altinn 3-app for å utvide funksjonaliteten utover det som er tilgjengelig i Altinn Studio.

## Forutsetninger

- Du har opprettet en app i Altinn Studio
- Du har satt opp [lokal utviklingsmiljø](/nb/altinn-studio/guides/development/local-dev/)
- Du har grunnleggende kunnskap om C# og .NET

## Steg 1: Velg riktig grensesnitt

Før du begynner å kode, må du identifisere hvilket grensesnitt som passer best for ditt behov. Se [oversikten over tilgjengelige grensesnitt](/nb/altinn-studio/reference/custom-development/) for å finne det som passer.

**Eksempel:** Hvis du trenger å beregne verdier automatisk når bruker fyller inn data, bør du implementere `IDataProcessor`.

## Steg 2: Opprett implementeringsklassen

1. Åpne appens kildekode i Visual Studio Code eller ditt foretrukne utviklingsmiljø
2. Naviger til mappen der du vil plassere din implementering (anbefalt: opprett en mappe kalt `Logic` eller `Features`)
3. Opprett en ny C#-klasse som implementerer det valgte grensesnittet

### Eksempel: Implementere IDataProcessor

```csharp
using Altinn.App.Core.Features;
using Altinn.Platform.Storage.Interface.Models;
using Microsoft.Extensions.Logging;

namespace Altinn.App.Logic
{
    public class DataProcessor : IDataProcessor
    {
        private readonly ILogger<DataProcessor> _logger;

        public DataProcessor(ILogger<DataProcessor> logger)
        {
            _logger = logger;
        }

        public async Task<bool> ProcessDataRead(Instance instance, Guid? dataId, object data)
        {
            // Logikk som kjøres når data leses
            _logger.LogInformation("ProcessDataRead called for instance {InstanceId}", instance.Id);
            
            // Returner false hvis ingen endringer ble gjort
            return await Task.FromResult(false);
        }

        public async Task<bool> ProcessDataWrite(Instance instance, Guid? dataId, object data)
        {
            bool hasChanges = false;
            
            // Cast til din datamodell
            if (data is MyDataModel model)
            {
                // Eksempel: Automatisk kalkulering
                if (model.Amount.HasValue && model.VatRate.HasValue)
                {
                    var calculatedVat = model.Amount.Value * model.VatRate.Value / 100;
                    
                    if (model.VatAmount != calculatedVat)
                    {
                        model.VatAmount = calculatedVat;
                        model.TotalAmount = model.Amount.Value + calculatedVat;
                        hasChanges = true;
                        
                        _logger.LogInformation("Calculated VAT: {VatAmount} for instance {InstanceId}", 
                                             calculatedVat, instance.Id);
                    }
                }
            }

            return await Task.FromResult(hasChanges);
        }
    }
}
```

## Steg 3: Registrer implementasjonen

For at Altinn-appen skal finne og bruke din implementering, må du registrere den i `Program.cs`-filen.

1. Åpne `Program.cs` i rot-mappen av appprosjektet
2. Legg til registrering av din implementering i `RegisterCustomAppServices`-metoden

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Eksisterende registreringer...
    
    // Registrer din egendefinerte implementering
    services.AddTransient<IDataProcessor, DataProcessor>();
    
    // Du kan registrere flere grensesnitt om nødvendig
    services.AddTransient<IInstantiationValidator, MyInstantiationValidator>();
}
```

### Forskjellige levetider for tjenester

- **AddTransient**: Ny instans opprettes hver gang den brukes (anbefalt for de fleste tilfeller)
- **AddScoped**: En instans per HTTP-forespørsel (bruk for tjenester som skal dele tilstand innenfor en forespørsel)
- **AddSingleton**: En instans for hele applikasjonens levetid (sjelden brukt for app-spesifikk logikk)

## Steg 4: Håndter avhengigheter

Hvis implementeringen din trenger andre tjenester, kan du injisere disse gjennom konstruktøren:

```csharp
public class DataProcessor : IDataProcessor
{
    private readonly ILogger<DataProcessor> _logger;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public DataProcessor(
        ILogger<DataProcessor> logger,
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration)
    {
        _logger = logger;
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    // ... implementering av metodene
}
```

Sørg for at alle avhengigheter også er registrert i `Program.cs` om nødvendig.

## Steg 5: Test implementeringen lokalt

1. Start appen lokalt ved å kjøre `dotnet run` i appens rot-mappe
2. Naviger til appen i nettleseren (vanligvis `http://localhost:5005`)
3. Test funksjonaliteten som bruker din implementering
4. Sjekk logger for å verifisere at koden kjører som forventet

### Tips for testing

- Bruk breakpoints i Visual Studio Code for å debugge koden
- Legg til omfattende logging for å spore hva som skjer
- Test edge-cases og feilsituasjoner
- Verifiser at return-verdier er korrekte (spesielt `bool`-verdier som indikerer om data er endret)

## Steg 6: Deploy og verifiser

1. Commit og push endringene til git-repositoryet ditt
2. Deploy appen til testmiljø
3. Test funksjonaliteten i testmiljø
4. Deploy til produksjon når du er fornøyd med testingen

## Vanlige fallgruver og tips

### Return-verdier
- For `IDataProcessor`: Returner `true` fra `ProcessDataWrite` kun hvis du faktisk endret data
- For `IValidator`: Legg til feilmeldinger i `ModelStateDictionary` ved valideringsfeil

### Feilhåndtering
- Bruk try-catch blokker for å håndtere unntak gracefully
- Logg feil med tilstrekkelig kontekst for debugging
- Ikke kast unntak med mindre det er kritiske feil

### Ytelse
- Unngå tunge operasjoner som kan påvirke brukeropplevelsen
- Bruk asynkrone metoder (`async`/`await`) for I/O-operasjoner
- Vurder caching for data som ikke endrer seg ofte

### Sikkerhet
- Valider all input som kommer fra brukere eller eksterne kilder
- Ikke logg sensitive data
- Bruk parameteriserte queries ved databasekall

## Eksempler på vanlige implementeringer

### Validering ved instansiering
```csharp
public class InstantiationValidator : IInstantiationValidator
{
    public async Task<InstantiationValidationResult?> Validate(Instance instance)
    {
        // Eksempel: Kun tillat instansiering på hverdager
        if (DateTime.Now.DayOfWeek == DayOfWeek.Saturday || 
            DateTime.Now.DayOfWeek == DayOfWeek.Sunday)
        {
            return new InstantiationValidationResult
            {
                Valid = false,
                Message = "Tjenesten er ikke tilgjengelig i helger"
            };
        }

        return null; // Null betyr validering OK
    }
}
```

### Egendefinert brukerhandling
```csharp
public class CalculateAction : IUserAction
{
    public string Id => "calculate";

    public async Task<UserActionResult> HandleAction(UserActionContext context)
    {
        // Utfør beregning basert på kontekst
        var result = PerformCalculation(context.Instance);
        
        return new UserActionResult
        {
            Success = true,
            UpdatedDataModel = result,
            ClientAction = new NavigateClientAction { PageId = "summary" }
        };
    }
}
```

## Videre lesning

- [Oversikt over alle tilgjengelige grensesnitt](/nb/altinn-studio/reference/custom-development/)
- [Dataprosessering](/nb/altinn-studio/reference/logic/dataprocessing/)
- [Validering](/nb/altinn-studio/reference/logic/validation/)
- [Instansiering](/nb/altinn-studio/reference/logic/instantiation/)
- [Prosesshandlinger](/nb/altinn-studio/reference/process/actions/)
- [Lokal utvikling](/nb/altinn-studio/guides/development/local-dev/)