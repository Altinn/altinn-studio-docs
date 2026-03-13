---
title: Konsumere API-er i en app
linktitle: Konsumere
description: Slik bruker appen API-er som er tilgjengelige via internett
toc: true
tags: [needsReview]
---

ASP.NET Core har gode muligheter til å konsumere API-er.

Dette er nyttig hvis du vil eksponere organisasjonens egne API-er via en app, eller trenger data fra eksterne API-er i appen.

På denne siden går vi gjennom et eksempel der vi bruker et eksternt, åpent API til å berike skjemadata.
[Du kan se eksempelappen i sin helhet i Altinn Studio](https://altinn.studio/repos/ttd/consume-api-example).

Vi bruker [RestCountries v3](https://restcountries.com/#api-endpoints-v3), og det er
endepunktet `https://restcountries.com/v3.1/name/{country}` vi er interessert i.
Dette returnerer et sett med detaljer om landet som er oppgitt.

Du kan studere responsen ved å kalle API-et fra nettleseren: [https://restcountries.com/v3.1/name/Norway](https://restcountries.com/v3.1/name/Norway).

Vi ønsker å berike skjemaet med detaljer om et land som sluttbrukeren har fylt inn.

## Opprette API-modeller

Hvis API-et du skal bruke er dokumentert med Swagger eller OpenAPI, kan du enkelt generere C#-klasser basert på datamodellen.
Dette kan du gjøre manuelt eller ved hjelp av verktøy som tilbyr slik generering.

I dette eksempelet er responsobjektet stort og inneholder langt mer data enn den vi er interessert i.

Her er et lite utsnitt av responsobjektet for Norge.
```json {linenos=false,hl_lines=[9,10,11,13]}
[
	{
		"name": {
			"common": "Norway",
			"official": "Kingdom of Norway",
			"nativeName": {}
		},
		"idd": {},
		"capital": [
			"Oslo"
		],
		"altSpellings": [],
		"region": "Europe",
		"subregion": "Northern Europe",
		"languages": {},
		"translations": {},
		"latlng": [
			62,
			10
		],
		"landlocked": false,
		"borders": [],
		"area": 323802,
		"demonyms": {},
		"flag": "🇳🇴",
		"maps": {},
		"population": 5379475,
		"postalCode": {
			"format": "###",
			"regex": "^(\\d{4})$"
		}
	}
]
```

I appen ønsker vi kun å ta med oss dataene fra de markerte linjene, altså hovedstad og region.
Vi lager et enkelt responsobjekt som kun inneholder de feltene vi er interessert i.

I mappen _App/models_ oppretter du filen `Country.cs`.

```C#
using System.Collections.Generic;

namespace Altinn.App.models
{
    public class Country
    {
        public List<string> Capital { get; set; }
        public string Region { get; set; }
    }
}
```

`Country`-objektet består av feltene `Capital` og `Region`.
`Capital` er en liste med strenger, da et land kan ha flere hovedsteder.

I dette eksempelet krever ikke API-et et komplekst request-objekt, og dermed kan vi nøye oss med den ene modellen.
Skulle det være behov for et request-objekt, kan du opprette dette på samme måte.

## Sette opp grensesnitt for klienten

Du bør definere et grensesnitt for klienten som skal kalle API-et.
Det gjør at du kan bruke styrkene til .NET med dependency injection og håndtere HTTP-klienter effektivt.

I app-repoet oppretter du mappen _App/clients_,
og i den nye mappen oppretter du filen `ICountryClient.cs`.

Grensesnittet består av én metode `GetCountry` som tar inn en streng og returnerer et _Country_-objekt.

Definer grensesnittet som vist nedenfor.

```C#
using System.Threading.Tasks;

using Altinn.App.models;

namespace Altinn.App.client
{
    public interface ICountryClient
    {
        /// <summary>
        /// Retrieves metadata about the provided country.
        /// </summary>
        /// <param name="country">The name of the country</param>
        /// <returns>A country object</returns>
        public Task<Country> GetCountry(string country);
    }
}
```

Returobjektet er omkranset av `Task<...>`. Dette er lagt inn for å vise til at kallet som skal gjøres
vil være asynkront.

## Implementere klienten

Klienten inneholder koden som gjør kallet mot API-et og omformer resultatet til `Country`-modellen
som funksjonene forventer i retur når de kaller klienten.

Her ser du hele _Country_-klienten.

```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

using Altinn.App.models;

using Microsoft.Extensions.Logging;

namespace Altinn.App.client
{
    public class CountryClient : ICountryClient
    {
        HttpClient _client;
        ILogger<ICountryClient> _logger;
        JsonSerializerOptions _serializerOptions;

        public CountryClient(HttpClient client, ILogger<ICountryClient> logger)
        {
            _logger = logger;

            _client = client;
            _client.BaseAddress = new Uri("https://restcountries.com/v3.1");

            _serializerOptions = new()
            {
                PropertyNameCaseInsensitive = true
            };
        }

        public async Task<Country> GetCountry(string country)
        {
            string query = $"name/{country}";

            HttpResponseMessage res = await _client.GetAsync(query);

            if (res.IsSuccessStatusCode)
            {
                string resString = await res.Content.ReadAsStringAsync();

                List<Country> countryResponse = JsonSerializer.Deserialize<List<Country>>(resString, _serializerOptions);

                return countryResponse.Any() ? countryResponse.First() : null;
            }
            else
            {
                _logger.LogError("Retrieving country {country} failed with status code {statusCode}", country, res.StatusCode);
                return null;
            }
        }
    }
}

```

Øverst i filen finner du referanser til alle namespace som klassen er avhengig av.

```cs
using System;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

using Altinn.App.models;

using Microsoft.Extensions.Logging;
```

Deretter definerer vi klassen og hvilket grensesnitt den arver fra.

```cs
public class CountryClient : ICountryClient
```

I klassen er det tre private objekter __client_, __logger og __serializerOptions_.

```cs
private readonly HttpClient _client;
private readonly ILogger<ICountryClient> _logger;
private readonly JsonSerializerOptions _serializerOptions;
```

Understrek foran navnet er kun en navnekonvensjon og har ingen effekt.
- __client_ får en HTTP-klient i konstruktøren
- __logger_ får en logger i konstruktøren slik at du kan logge feilmeldinger og annet i klassen
- __serializerOptions_ opprettes og konfigureres i konstruktøren for å kunne deserialisere responsen fra API-et

Neste steg er å definere konstruktøren.

```cs
public CountryClient(HttpClient client, ILogger<ICountryClient> logger)
{
      _logger = logger;
      _client = client;
      _client.BaseAddress = new Uri("https://restcountries.com/v3.1");

      _serializerOptions = new()
      {
          PropertyNameCaseInsensitive = true
      };
}
```

Objekter som kommer som input i konstruktøren får sine verdier, og andre objekter opprettes.
Skulle du ha behov for å bruke en av de andre tjenestene som er registrert i appen, er det bare å
sende den inn i konstruktøren og opprette et privat objekt for å kunne ta det i bruk i klassen, slik vi har gjort
med __logger_ eller __client_.

Lenger ned i klassen finner du implementasjonen av metoden `GetCountry`.

```cs
public async Task<Country> GetCountry(string country)
{
    string query = $"name/{country}";
    HttpResponseMessage res = await _client.GetAsync(query);

    if (res.IsSuccessStatusCode)
    {
        string resString = await res.Content.ReadAsStringAsync();

        List<Country> countryResponse = JsonSerializer.Deserialize<List<Country>>(resString, _serializerOptions);

        return countryResponse.Any() ? countryResponse.First() : null;
    }
    else
    {
        _logger.LogError("Retrieving country {country} failed with status code {statusCode}", country, res.StatusCode);
        return null;
    }
}
```

Her sjekker vi om statuskoden på API-kallet er en suksess-kode, før vi deserialiserer og returnerer objektet.
Hvis det ikke er en suksess-statuskode, logger vi en feil og returnerer null.

## Registrere klienten i appen

Når grensesnitt og klient er implementert, kan du registrere den i _App/Program.cs_ (.NET&nbsp;6) eller i _App/Startup.cs_ (.NET&nbsp;5) for bruk i appen.

I `Program.cs`-klassen legger vi til kodelinjen nedenfor.
I tillegg må du legge til `using Altinn.App.client;` og `using Altinn.App.AppLogic.DataProcessing;` øverst i filen.

```C#
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.AddHttpClient<ICountryClient, CountryClient>();
    services.AddTransient<IDataProcessor, DataProcessor>();
    // Register your apps custom service implementations here.
}
```

## Bruke klient i app-logikk

For å berike skjemadata må vi koble klienten til logikken i _App/logic/DataProcessingHandler.cs_ i metoden _ProcessDataWrite_.

Først må du gjøre klienten tilgjengelig ved å _injecte_ den inn i konstruktøren til klassen.
DataProcessingHandler har ingen konstruktør i utgangspunktet, så du må opprette den i klassen.

```cs
public DataProcessingHandler()
{
}
```

Nå kan vi opprette et privat objekt for klienten, injecte den i konstruktøren og tilordne den til det private objektet.
Resultatet blir seende slik ut:

```cs
private readonly ICountryClient _countryClient;

public DataProcessingHandler(ICountryClient countryClient)
{
    _countryClient = countryClient;
}
```
I tillegg må du også legge til `using Altinn.App.client;` i denne filen.

__countryClient_ er nå tilgjengelig i DataProcessingHandler, og vi er klare til å implementere logikken i ProcessDataWrite.

{{%notice warning%}}

**MERK**: Stateless apps kaller ikke på ProcessDataWrite. Bruk ProcessDataRead for stateless apps.
{{%/notice%}}

```cs
public async Task<bool> ProcessDataWrite(Instance instance, Guid? dataId, object data)
{
    if (data.GetType() == typeof(skjema))
    {
        skjema skjema = (skjema)data;
        if (!string.IsNullOrEmpty(skjema.land))
        {
            Country country = await _countryClient.GetCountry(skjema.land.Trim());

            if (country != null)
            {
                skjema.hovedstad = string.Join(",", country.Capital);
                skjema.region = country.Region;
            }
            else
            {
                skjema.hovedstad = skjema.region = string.Empty;
            }

            return true;
        }
        else
        {
            skjema.hovedstad = string.Empty;
            skjema.region = string.Empty;
        }
    }
    return await Task.FromResult(false);
}
```

Prøver du å bygge appen nå, vil du få en feil.
DataProcessingHandler opprettes i App.cs, så alle dependencies må også inn i denne filen
og deretter sendes videre i konstruktøren til DataProcessingHandler.

I filen _App/logic/App.cs_ gjør du følgende endringer:

- Legg til en referanse til navneområdet til klienten øverst i filen.
  ```cs
  using Altinn.App.client;
  ```
- _Inject_ `ICountryClient` nederst i App.cs-konstruktøren.

    Dette er gjort på linje 14.
    ```cs {linenos=inline,hl_lines=[14]}
    public App(
        IAppResources appResourcesService,
        ILogger<App> logger,
        IData dataService,
        IProcess processService,
        IPDF pdfService,
        IProfile profileService,
        IRegister registerService,
        IPrefill prefillService,
        IInstance instanceService,
        IOptions<GeneralSettings> settings,
        IText textService,
        IHttpContextAccessor httpContextAccessor,
        ICountryClient countryClient) : base(
            appResourcesService,
            logger,
            dataService,
            processService,
            pdfService,
            prefillService,
            instanceService,
            registerService,
            settings,
            profileService,
            textService,
            httpContextAccessor)
    ```

- Legg til countryClient i konstruktøren til DataProcessingHandler.
    ```cs
    _dataProcessingHandler = new DataProcessingHandler(countryClient);
    ```

## Caching av responsdata

En ulempe med eksempelet slik det står nå, er at for hver gang skjemaet lagres, gjør vi et kall
mot endepunktet for å hente ut data.

Det er rimelig å anta at et lands hovedstad og hvilken region
det tilhører ikke vil endre seg hyppig. Har vi hentet informasjon om Norge, kan vi lagre denne lokalt i appen
i en tidsperiode, så vi slipper å gjøre kallet igjen.

Kodeendringene beskrives ikke steg for steg, men er vist i sin helhet nedenfor.
Det kreves kun endringer i _CountryClient.cs_.

```cs
using Altinn.App.models;

using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Altinn.App.client
{
    public class CountryClient : ICountryClient
    {
        private readonly HttpClient _client;
        private readonly ILogger<ICountryClient> _logger;
        private readonly JsonSerializerOptions _serializerOptions;
        private readonly IMemoryCache _memoryCache;
        private readonly MemoryCacheEntryOptions _cacheOptions;

        public CountryClient(HttpClient client, ILogger<ICountryClient> logger, IMemoryCache memoryCache)
        {
            _logger = logger;

            _client = client;
            _client.BaseAddress = new Uri("https://restcountries.com/v3.1/");

            _serializerOptions = new()
            {
                PropertyNameCaseInsensitive = true
            };

            _memoryCache = memoryCache;
            _cacheOptions = new()
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(24)
            };
        }

        public async Task<Country> GetCountry(string country)
        {
            string uniqueCacheKey = "Country_" + country;

            // Check if country is present in cache, if so return from cache
            if (_memoryCache.TryGetValue(uniqueCacheKey, out Country outputCountry))
            {
                return outputCountry;
            }

            string query = $"name/{country}";

            HttpResponseMessage res = await _client.GetAsync(query);

            if (res.IsSuccessStatusCode)
            {
                string resString = await res.Content.ReadAsStringAsync();

                List<Country> countryResponse = JsonSerializer.Deserialize<List<Country>>(resString, _serializerOptions);

                if (countryResponse.Any())
                {
                    outputCountry = countryResponse.First();

                    // Add response country to cache
                    _memoryCache.Set(uniqueCacheKey, outputCountry, _cacheOptions);
                    return outputCountry;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                _logger.LogError("Retrieving country {country} failed with status code {statusCode}", country, res.StatusCode);
                return null;
            }
        }
    }
}
```
