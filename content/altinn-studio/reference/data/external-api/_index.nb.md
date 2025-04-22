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
2. Registrere implementasjonen i filen `Program.cs` under `RegisterCustomAppServices`

Grensesnittet `IExternalApiClient` krever at du implementerer:

- En `Id`-egenskap som unikt identifiserer din eksterne API-klient
- En `GetExternalApiDataAsync`-metode som returnerer dataene fra det eksterne API-et

Metoden `GetExternalApiDataAsync` kan returnere et hvilket som helst objekt (men ikke primitive typer), noe som lar deg strukturere de returnerte dataene etter dine behov.

## Implementasjonseksempel

Her er et eksempel på hvordan du implementerer grensesnittet `IExternalApiClient`:

{{< code-title >}}
App/logic/ExternalApiTestClient.cs
{{< /code-title >}}

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

{{< code-title >}}
App/Program.cs
{{< /code-title >}}
{{<highlight csharp "linenos=false,hl_lines=3-4">}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
{
// Registrer din eksterne API-klient
services.AddTransient<IExternalApiClient, ExternalApiTestClient>();

    // Andre tilpassede tjenester

}
{{</highlight>}}

## Bruk av data fra det Eksterne API-et i applikasjonen din

Funksjonen for Eksternt API er primært designet for å brukes gjennom uttrykk i Altinn-applikasjonen din. Dette lar deg vise data fra eksterne kilder eller implementere betinget logikk basert på eksterne data direkte i skjemaene og layoutene dine.

### Tilgang til Eksternt API-data gjennom dynamiske uttrykk

For å få tilgang til data fra din eksterne API-klient i dynamiske uttrykk, kan du bruke funksjonen `externalApi`. Denne funksjonen krever to parametere:

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

For mer informasjon om uttrykk og hvordan du bruker dem i Altinn-applikasjonen din, se [dokumentasjonen for dynamiske uttrykk](../../logic/expressions).

### Tilgang til data gjennom API-endepunktet

Dataene som hentes gjennom implementasjonen av Eksternt API er også tilgjengelige gjennom et REST API-endepunkt. Endepunktet følger dette mønsteret:

```bash
{org}/{app}/instances/{instanceOwnerPartyId:int}/{instanceGuid:guid}/api/external/{externalApiId}
```

Hvor:

- `{org}` er organisasjonskoden (f.eks. "ttd")
- `{app}` er applikasjonsnavnet (f.eks. "my-app")
- `{instanceOwnerPartyId:int}` er part-ID-en til instanseieren
- `{instanceGuid:guid}` er den unike identifikatoren til instansen
- `{externalApiId}` er ID-en til den eksterne API-klienten (verdien som returneres av `Id`-egenskapen)

For eksempel, for å få tilgang til "externalApiTestId" Eksternt API for en spesifikk instans, ville du bruke:

```bash
https://ttd.apps.altinn.no/ttd/my-app/instances/50001337/b2572673-5afa-4a23-9c4e-db2cb0f8a9c9/api/external/externalApiTestId
```

Du kan også sende spørreparametere til endepunktet, som vil bli videresendt til `GetExternalApiDataAsync`-metoden:

```bash
https://ttd.apps.altinn.no/ttd/my-app/instances/50001337/b2572673-5afa-4a23-9c4e-db2cb0f8a9c9/api/external/externalApiTestId?param=value
```

{{% notice warning %}}
**Sikkerhetsadvarsel**: Aldri inkluder sensitiv informasjon som fødselsnumre eller andre personlige identifikatorer i spørreparametere. Spørreparametere kan logges i serverlogger, vises i nettleserhistorikk og kan mellomlagres av proxyer. For å få tilgang til data fra Folkeregisteret eller andre sensitive kilder, bruk alltid sikre metoder som å hente identifikatoren fra instansdataene eller bruke post-forespørsler med kryptert nyttelast.
{{% /notice %}}

Responsen vil være JSON-representasjonen av objektet som returneres av `GetExternalApiDataAsync`-metoden.

## Eksempel: Implementering av en reell Eksternt API-klient

Her er et mer komplett eksempel på en Eksternt API-klient som kaller et reelt API:

{{< code-title >}}
App/logic/WeatherApiClient.cs
{{< /code-title >}}

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
    // Registrer Weather API-klienten som IHttpClient
    services.AddHttpClient<WeatherApiClient>();
    // Registrer Weather API-klienten som IExternalApiClient
    services.AddTransient<IExternalApiClient, WeatherApiClient>();

    // Andre tilpassede tjenester
}
```

## Eksempel: Bruk av Eksternt API med Maskinporten

For å bruke eksterne API-er som krever Maskinporten-autentisering, trenger du en Maskinporten-klient med tilgang til de nødvendige scopene for API-et du ønsker å integrere:

- `altinn:serviceowner` (hvis du er en tjenesteeier)
- Eventuelle andre scopes som kreves av det spesifikke API-et du integrerer mot
  {.correspondence-custom-list}

For å sette opp dette kan du følge de generelle stegene i [veiledningen for Maskinporten-integrasjon](../../../guides/integration/maskinporten/) med noen modifikasjoner beskrevet nedenfor.

- Eksternt API-klienten trenger en Maskinporten-klient for å kommunisere med beskyttede API-er. Konfigurasjonsobjektet ser typisk slik ut:

  {{< code-title >}}
  App/appsettings.json
  {{< /code-title >}}

  ```json
  "MaskinportenSettings": {
      "Authority": "https://[test.]maskinporten.no/",
      "ClientId": "din-klient-id",
      "JwkBase64": "base64-kodet-jwk"
  }
  ```

- Hvis du trenger en annen konfigurasjonssti, kan du konfigurere den med hjelp av `ConfigureMaskinportenClient`:

  {{< code-title >}}
  App/Program.cs
  {{< /code-title >}}

  {{<highlight csharp "linenos=false,hl_lines=7-9">}}

  void RegisterCustomAppServices(
  IServiceCollection services,
  IConfiguration config,
  IWebHostEnvironment env
  )
  {
  services.ConfigureMaskinportenClient(
  "DinUnikeMaskinportenSettingsSti"
  );
  }
  {{</highlight>}}

- Hvis du trenger et tilpasset konfigurasjonsoppsett, kan du bruke en delegatmetode:
  {{< code-title >}}
  App/Program.cs
  {{< /code-title >}}

  {{<highlight csharp "linenos=false,hl_lines=7-10">}}
  void RegisterCustomAppServices(
  IServiceCollection services,
  IConfiguration config,
  IWebHostEnvironment env
  )
  {
  services.RegisterMaskinportenClientDefinition<SettingsJwkClientDefinition>(
  "min-maskinporten-klient",
  config.GetSection("MaskinportenSettings")
  );
  }
  {{</highlight>}}

- Du kan registrere Maskinporten-klienten på HttpClient-klassen som trenger dette i `Program.cs` ved å bruke extention-metoden `UseMaskinportenAuthorisation`:
  {{< code-title >}}
  App/Program.cs
  {{< /code-title >}}

  {{<highlight csharp "linenos=false,hl_lines=7">}}
  void RegisterCustomAppServices(
  IServiceCollection services,
  IConfiguration config,
  IWebHostEnvironment env
  )
  {
  services.AddHttpClient<WeatherApiClient>().UseMaskinportenAuthorisation("scope:1 scope:2");
  }
  {{</highlight>}}

- Hvis du trenger Maskinporten for autorisasjon mot en annen Altinn applikasjon, trenger du et Altinn-token. For å få det kan du bruke `UseMaskinportenAltinnAuthorisation`:
  {{< code-title >}}
  App/Program.cs
  {{< /code-title >}}

  {{<highlight csharp "linenos=false,hl_lines=7">}}
  void RegisterCustomAppServices(
  IServiceCollection services,
  IConfiguration config,
  IWebHostEnvironment env
  )
  {
  services.AddHttpClient<WeatherApiClient>().UseMaskinportenAltinnAuthorisation("scope:1 scope:2");
  }
  {{</highlight>}}

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
