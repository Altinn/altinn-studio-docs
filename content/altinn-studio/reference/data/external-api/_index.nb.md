---
title: Eksternt API
linktitle: Eksternt API
description: Hvordan integrere data fra eksterne API-er i Altinn-applikasjonen din.
toc: true
---

{{% notice info %}}
Tilgjengelig fra v8.2.8
{{% /notice %}}

## Introduksjon

Et Eksternt API lar deg integrere data fra eksterne API-er i Altinn-applikasjonen din. Dette er nyttig når du trenger å vise eller behandle data fra eksterne kilder i applikasjonen din. Dette fungerer ved å implementere grensesnittet `IExternalApiClient` og registrere implementasjonen i applikasjonens tjenestebeholder. Når den er implementert, kan dataene fra det eksterne API-et nås gjennom uttrykk (se [dokumentasjonen for uttrykk](../../logic/expressions)) eller i andre klasser i applikasjonen din.

## Hvordan det fungerer

For å bruke funksjonen for Eksternt API, må du:

1. Opprette en klasse som implementerer grensesnittet `IExternalApiClient`
2. Plassere implementasjonen i mappen `config/logic` i applikasjonen din
3. Registrere implementasjonen i filen `Program.cs` under `RegisterCustomAppServices`

Grensesnittet `IExternalApiClient` krever at du implementerer:

- En `Id`-egenskap som unikt identifiserer din eksterne API-klient
- En `GetExternalApiDataAsync`-metode som returnerer dataene fra det eksterne API-et

Metoden `GetExternalApiDataAsync` kan returnere et hvilket som helst objekt (men ikke primitive typer), noe som lar deg strukturere de returnerte dataene etter dine behov.

## Implementasjonseksempel

Her er et eksempel på hvordan du implementerer grensesnittet `IExternalApiClient`:

```csharp
public class ExternalApiTestClient : IExternalApiClient
{
    public string Id => "externalApiTestId";

    public async Task<object> GetExternalApiDataAsync(
        InstanceIdentifier instanceIdentifier,
        Dictionary<string, string> queryParams = null
    )
    {
        var mockData = new[]
        {
            new
            {
                schemaTitle = "Pantopplysninger for TRANBY OG RØDEBERG REGNSKAP",
                href = "https://example.com/mock1",
                date = DateTime.Now.ToString("dd.MM.yyyy")
            },
            new
            {
                schemaTitle = "Panteopplysninger for MADELENE NYRUD",
                href = "https://example.com/mock2",
                date = DateTime.Now.AddDays(-1).ToString("dd.MM.yyyy")
            },
            new
            {
                schemaTitle = "Panteopplysninger for MADELENE NYRUD",
                href = "https://example.com/mock3",
                date = DateTime.Now.AddDays(-2).ToString("dd.MM.yyyy")
            },
            new
            {
                schemaTitle = "Registerutskrift for TRANBY OG RØDEBERG REGNSKAP",
                href = "https://example.com/mock3",
                date = DateTime.Now.AddDays(-2).ToString("dd.MM.yyyy")
            },
            new
            {
                schemaTitle = "Registerutskrift for MADELENE NYRUD",
                href = "https://example.com/mock3",
                date = DateTime.Now.AddDays(-2).ToString("dd.MM.yyyy")
            },
            new
            {
                schemaTitle = "Ektepakt",
                href = "https://example.com/mock3",
                date = DateTime.Now.AddDays(-2).ToString("dd.MM.yyyy")
            },
            new
            {
                schemaTitle = "Registerutskrift fra Løseøreregisteret",
                href = "https://example.com/mock3",
                date = DateTime.Now.AddDays(-2).ToString("dd.MM.yyyy")
            }
        };

        return mockData;
    }
}
```

I dette eksempelet returnerer vi testdata, men i en reell implementasjon ville du typisk bruke en HttpClient for å gjøre HTTP-forespørsler til et eksternt API.

## Registrering av Eksternt API-klient

Etter å ha implementert grensesnittet `IExternalApiClient`, må du registrere implementasjonen din i filen `Program.cs`:

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
{
    // Registrer din eksterne API-klient
    services.AddTransient<IExternalApiClient, ExternalApiTestClient>();

    // Andre tilpassede tjenester<>
}
```

## Bruk av data fra det Eksterne API-et i applikasjonen din

Funksjonen for Eksternt API er primært designet for å brukes gjennom uttrykk i Altinn-applikasjonen din. Dette lar deg vise data fra eksterne kilder eller implementere betinget logikk basert på eksterne data direkte i skjemaene og layoutene dine.

### Tilgang til Eksternt API-data gjennom uttrykk

For å få tilgang til data fra din eksterne API-klient i uttrykk, kan du bruke funksjonen `externalApi`. Denne funksjonen krever to parametere:

1. `clientId`: ID-en til din eksterne API-klient
2. `pathToProperty`: Dotnotasjon til egenskapen du vil ha tilgang til fra det returnerte objektet

```json
["externalApi", "externalApiTestId", "0.schemaTitle"]
```

Dette uttrykket vil returnere skjematittelen til det første elementet i lista som returneres av `GetExternalApiDataAsync`-metoden til den eksterne API-klienten med ID-en "externalApiTestId".

Parameteren `pathToProperty` bruker punktnotasjon for å navigere gjennom objektstrukturen. For eksempel:

- `"0"` får tilgang til det første elementet i en liste
- `"items.0.title"` får tilgang til tittel-egenskapen til det første elementet i items-lista
- `"data.user.name"` får tilgang til name-egenskapen til user-objektet innenfor data-objektet

### Eksempler på bruk av Eksternt API-data i uttrykk

#### Visning av eksterne data

Du kan bruke Eksternt API-data for å vise informasjon i skjemaet ditt:

```json
{
  "id": "externalDataText",
  "type": "Text",
  "textResourceBindings": {
    "value": [
      "concat",
      "Dokumenttittel: ",
      ["externalApi", "externalApiTestId", "0.schemaTitle"]
    ]
  }
}
```

#### Betinget synlighet basert på eksterne data

Du kan også bruke Eksternt API-data for å kontrollere synligheten til komponenter:

```json
{
  "id": "conditionalInput",
  "type": "Input",
  "hidden": ["equals", ["externalApi", "externalApiTestId", "length"], 0]
}
```

Dette vil skjule komponenten hvis det eksterne API-et returnerer en tom array.

For mer informasjon om uttrykk og hvordan du bruker dem i Altinn-applikasjonen din, se [Uttrykksdokumentasjonen](../../logic/expressions).

### Tilgang til data gjennom API-endepunktet

Dataene som hentes gjennom implementasjonen av Eksternt API er også tilgjengelige gjennom et REST API-endepunkt. Endepunktet følger dette mønsteret:

```
{org}/{app}/instances/{instanceOwnerPartyId:int}/{instanceGuid:guid}/api/external/{externalApiId}
```

Hvor:

- `{org}` er organisasjonskoden (f.eks. "ttd")
- `{app}` er applikasjonsnavnet (f.eks. "my-app")
- `{instanceOwnerPartyId:int}` er part-ID-en til instanseieren
- `{instanceGuid:guid}` er den unike identifikatoren til instansen
- `{externalApiId}` er ID-en til den eksterne API-klienten (verdien som returneres av `Id`-egenskapen)

For eksempel, for å få tilgang til "externalApiTestId" Eksternt API for en spesifikk instans, ville du bruke:

```
https://ttd.apps.altinn.no/ttd/my-app/instances/50001337/b2572673-5afa-4a23-9c4e-db2cb0f8a9c9/api/external/externalApiTestId
```

Du kan også sende spørreparametere til endepunktet, som vil bli videresendt til `GetExternalApiDataAsync`-metoden:

```
https://ttd.apps.altinn.no/ttd/my-app/instances/50001337/b2572673-5afa-4a23-9c4e-db2cb0f8a9c9/api/external/externalApiTestId?param=value
```

{{% notice warning %}}
**Sikkerhetsadvarsel**: Inkluder aldri sensitiv informasjon som fødselsnumre eller andre personlige identifikatorer i spørreparametere. Spørreparametere kan logges i serverlogger, vises i nettleserhistorikk og kan mellomlagres av proxyer. For å få tilgang til data fra Folkeregisteret eller andre sensitive kilder, bruk alltid sikre metoder som å hente identifikatoren fra instansdataene eller bruke post-forespørsler med kryptert nyttelast.
{{% /notice %}}

Responsen vil være JSON-representasjonen av objektet som returneres av `GetExternalApiDataAsync`-metoden.

## Eksempel: Implementering av en reell Eksternt API-klient

Her er et mer komplett eksempel på en Eksternt API-klient som kaller et reelt API:

```csharp
public class WeatherApiClient : IExternalApiClient
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<WeatherApiClient> _logger;
    private readonly IConfiguration _configuration;

    public WeatherApiClient(
        HttpClient httpClient,
        ILogger<WeatherApiClient> logger,
        IConfiguration configuration)
    {
        _httpClient = httpClient;
        _logger = logger;
        _configuration = configuration;

        // Konfigurer HTTP-klienten
        _httpClient.BaseAddress = new Uri("https://api.weatherapi.com/v1/");
        _httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
    }

    public string Id => "weatherApi";

    public async Task<object> GetExternalApiDataAsync(
        InstanceIdentifier instanceIdentifier,
        Dictionary<string, string> queryParams = null)
    {
        try
        {
            // Hent API-nøkkelen fra konfigurasjonen
            var apiKey = _configuration["WeatherApi:ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
            {
                _logger.LogError("Weather API-nøkkel ikke funnet i konfigurasjonen");
                return new { Error = "API-nøkkel ikke konfigurert" };
            }

            // Legg til API-nøkkel i header i stedet for spørrestreng for bedre sikkerhet
            _httpClient.DefaultRequestHeaders.Add("X-Api-Key", apiKey);

            // Bygg spørrestrengen
            var query = new Dictionary<string, string>
            {
                { "q", queryParams?.GetValueOrDefault("location") ?? "Oslo" },
                { "days", queryParams?.GetValueOrDefault("days") ?? "3" }
            };

            var queryString = string.Join("&", query.Select(kv => $"{kv.Key}={Uri.EscapeDataString(kv.Value)}"));

            // Gjør API-kallet
            var response = await _httpClient.GetAsync($"forecast.json?{queryString}");

            // Sjekk om forespørselen var vellykket
            if (response.IsSuccessStatusCode)
            {
                // Parse og returner responsen
                var content = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<JsonDocument>(content);
            }
            else
            {
                // Håndter feilrespons
                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError($"Weather API returnerte feil: {response.StatusCode}, {errorContent}");

                return new { Error = $"Weather API returnerte feil: {response.StatusCode}" };
            }
        }
        catch (Exception ex)
        {
            // Håndter unntak
            _logger.LogError($"Feil ved kall til Weather API: {ex.Message}");

            return new { Error = "Kunne ikke kalle Weather API" };
        }
    }
}
```

Registrer denne klienten i `Program.cs`:

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
{
    // Registrer Weather API-klienten
    services.AddHttpClient<WeatherApiClient>();
    services.AddTransient<IExternalApiClient, WeatherApiClient>();

    // Andre tilpassede tjenester
}
```

## Eksempel: Bruk av Eksternt API med Maskinporten og DAN-klient

Data Altinn Norway (DAN)-klienten er en SDK som gir et rent API for å hente data fra ulike datasett på [data.altinn.no](https://data.altinn.no).
DAN-klienten kan brukes med et Eksternt API for å gi tilgang til disse datasettene i en Altinn-applikasjon.

For å komme i gang med DAN-klienten, kan du følge guiden her: https://docs.data.altinn.no/api/

Hvis du trenger tilgang til en av API-ene som krever autentisering gjennom Maskinporten, se [Maskinporten-integrasjonsguiden](../../../guides/integration/maskinporten).

### Implementasjon

#### Installering av DAN-klienten

For å bruke DAN-klienten i applikasjonen din, må du legge til `Altinn.ApiClients.Dan` NuGet-pakken i `App.csproj`-filen:

```xml
<PackageReference Include="Altinn.ApiClients.Dan" Version="4.1.0" />
```

#### Implementering av en Eksternt API-klient med DAN

Her er et eksempel på hvordan du implementerer en Eksternt API-klient som bruker DAN-klienten for å hente data fra FregPerson-datasettet:

```csharp
public class DanExternalClient(IDanClient danClient) : IExternalApiClient
{
    private readonly IDanClient _danClient = danClient;

    public string Id => "externalDanApi";

    public async Task<object> GetExternalApiDataAsync(
        InstanceIdentifier instanceIdentifier,
        Dictionary<string, string> queryParams = null)
    {

        // Kall DAN-klienten for å hente datasettet
        var response = await _danClient.GetDataSet(
            dataSetName: "danDataSetName"
            /// andre parametere som trengs for det spesifikke API-et som brukes
        );

        return response;
    }
}
```

I dette eksempelet:

- Vi injiserer `IDanClient` i vår eksterne API-klient
- Vi kaller DAN-klientens `GetDataSet`-metode for å hente dataene
- Vi returnerer responsen fra DAN-klienten

#### Registrering av DAN-klienten og Eksternt API-klienten

For å bruke DAN-klienten med din eksterne API-klient, må du registrere begge i applikasjonens tjenestebeholder. Om du trenger autentisering med Maskinporten, må du også registrere en Maskinporten-klientdefinisjon for å aktivere DAN-klienten til å autentisere med Maskinporten. Legg til følgende kode i `RegisterCustomAppServices`-metoden i `Program.cs`-filen din:

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
{
    // Registrer Maskinporten-klientdefinisjonen for DAN
    services.RegisterMaskinportenClientDefinition<SettingsJwkClientDefinition>(
        "my-client-definition-for-dan",
        config.GetSection("MaskinportenSettingsForDanClient")
    );

    // Registrer DAN-klienten med Maskinporten-meldingshåndtereren
    services
        .AddDanClient(config.GetSection("DanSettings"))
        .AddMaskinportenHttpMessageHandler<SettingsJwkClientDefinition>(
            "my-client-definition-for-dan"
        );

    // Registrer din eksterne API-klient
    services.AddTransient<IExternalApiClient, DanExternalClient>();

    // Andre tilpassede tjenester
}
```

Du kan fjerne `RegisterMaskinportenClientDefinition` og `AddMaskinportenHttpMessageHandler` hvis du ikke trenger Maskinporten for autentisering.

Du må også legge til både DAN-klient- og Maskinporten-konfigurasjon i `appsettings.json`-filen din:

```json
{
  "DanSettings": {
    "Environment": "dev",
    "EnableDebugLog": true
  },
  "MaskinportenSettingsForDanClient": {
    "Environment": "test",
    "ClientId": "",
    "Scope": "", // relevante scopes for API-ene du vil bruke
    "EncodedJwk": "",
    "ExchangeToAltinnToken": false,
    "EnableDebugLog": true
  }
}
```

De faktiske verdiene for `ClientId` og `EncodedJwk` bør lagres i Azure Key Vault som beskrevet i [Maskinporten-integrasjonsguiden](../../../guides/integration/maskinporten). `Scope`-verdien bør samsvare med datasettet du vil ha tilgang til.

## Feilhåndtering

Når du implementerer `GetExternalApiDataAsync`-metoden, bør du håndtere eventuelle feil som kan oppstå når du kaller det eksterne API-et. Her er et eksempel på hvordan du håndterer feil:

```csharp
public async Task<object> GetExternalApiDataAsync(
    InstanceIdentifier instanceIdentifier,
    Dictionary<string, string> queryParams = null)
{
    try
    {
        // Gjør API-kallet
        var response = await _httpClient.GetAsync("https://api.example.com/data");

        // Sjekk om forespørselen var vellykket
        if (response.IsSuccessStatusCode)
        {
            // Parse og returner responsen
            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<MyDataModel>(content);
        }
        else
        {
            // Håndter feilrespons
            var errorContent = await response.Content.ReadAsStringAsync();
            _logger.LogError($"Eksternt API returnerte feil: {response.StatusCode}, {errorContent}");

            // Returner et feilobjekt eller kast et unntak
            return new { Error = $"Eksternt API returnerte feil: {response.StatusCode}" };
        }
    }
    catch (Exception ex)
    {
        // Håndter unntak
        _logger.LogError($"Feil ved kall til eksternt API: {ex.Message}");

        // Returner et feilobjekt eller kast et unntak
        return new { Error = "Kunne ikke kalle eksternt API" };
    }
}
```

## Sikkerhetshensyn

Når du implementerer en Eksternt API-klient, bør du vurdere følgende sikkerhetsaspekter:

1. **Autentisering**: Sørg for at din eksterne API-klient autentiserer riktig med det eksterne API-et. Dette kan innebære bruk av API-nøkler, OAuth-tokens eller andre autentiseringsmekanismer.

2. **Databeskyttelse**: Vær forsiktig med hvilke data du sender til og mottar fra det eksterne API-et. Unngå å sende sensitive data med mindre det er nødvendig, og valider alle innkommende data.

3. **Feilhåndtering**: Som vist i eksempelet ovenfor, håndter feil på en elegant måte for å forhindre at sensitiv informasjon eksponeres for sluttbrukere.

4. **Ratebegrensning**: Implementer ratebegrensning for å forhindre overbelastning av det eksterne API-et og for å overholde eventuelle bruksgrenser pålagt av API-leverandøren.

## Feilsøking

Her er noen vanlige problemer du kan støte på når du implementerer Eksternt API og hvordan du løser dem:

### Eksternt API-data vises ikke i brukergrensesnittet

Hvis dataene fra ditt eksterne API ikke vises i UI-komponentene dine:

1. **Sjekk implementasjonen din**: Sørg for at `IExternalApiClient`-implementasjonen din returnerer dataen du forventer.
2. **Verifiser registreringen**: Sørg for at klienten din er riktig registrert i `Program.cs`.
3. **Sjekk uttrykkene**: Verifiser at uttrykkene dine refererer til riktig ID for den eksterne API-klienten og ritkig dotnotasjon til egenskapen du vil hente ut.
4. **Inspiser nettverksforespørsler**: Bruk nettleserens utviklerverktøy for å sjekke om API-endepunktet blir kalt og hvilken respons det returnerer.
5. **Sjekk logger**: Se etter eventuelle feil i applikasjonsloggene relatert til den eksterne API-klienten.

### Autentiseringsproblemer med eksterne tjenester

Hvis du har problemer med å autentisere med eksterne tjenester:

1. **Sjekk legitimasjon**: Verifiser at API-nøkler, tokens eller andre autentiseringverdier er korrekte og ikke utløpt.
2. **Inspiser forespørselsheadere**: Sørg for at autentiseringsheadere er riktig satt i forespørslene dine.
3. **Sjekk miljø**: Sørg for at du bruker riktige miljøinnstillinger (dev, test, prod) for den eksterne tjenesten.
4. **Verifiser scopes**: For Maskinporten, sørg for at du har riktige scopes konfigurert for API-ene du prøver å få tilgang til.
