---
title: Konsumere APIer i en app
linktitle: Konsumere
description: En applikasjon kan konsumere åpne og lukkede API som er tilgjengelig via Internett.
toc: true
---

ASP.NET Core har gode muligheter til å konsumere API.

Dette kan være nyttig dersom man ønsker å eksponere organisasjonens
egne API via en app eller har behov for data fra eksterne API i appen.

På denne siden går vi gjennom et eksempel hvor et eksternt, åpent API benyttes til å berike skjemadata.
[Eksempelappen kan sees i sin helhet i Altinn Studio](https://altinn.studio/repos/ttd/consume-api-example).

APIet som benyttes er [RestCountries v3](https://restcountries.com/#api-endpoints-v3) og det er 
endepunktet `https://restcountries.com/v3.1/name/{country}` vi er interessert i. 
Dette returnerer et sett med detaljer om landet som er oppgitt. 

Du kan studere responsen ved å kalle APIet fra nettleseren din: [https://restcountries.com/v3.1/name/Norway](https://restcountries.com/v3.1/name/Norway).

Vi ønsker å berike skjemaet med detaljer om et land som sluttbruker har fylt inn. 

## Opprettelse av API modeller

Dersom API-et som skal konsumeres er dokumentert med Swagger eller OpenAPI kan man enkelt genere C# klasser basert på datamodellen.
Dette kan gjøres manuelt eller ved hjelp av verktøy som tilbyr slik generering.


I dette eksempelet er responsobjektet stort og inneholder langt mer data enn den vi er interessert i. 

Her er et lite utklipp av responsobjektet for Norge.
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

I applikasjonen ønsker vi kun å ta med oss dataen på de markerte linjene, altså hovedstad og region.
Vi lager et minimalistisk responsobjekt som kun inneholder de feltene vi er interessert i.

I mappen _App/models_ opprettes det en ny fil `Country.cs`.

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
`Capital` er en liste med strenger, da et land kan ha flere hovesteder.

I dette eksempelt krever ikke APIet et komplekst request-objekt og dermed kan vi nøye oss med den ene modellen.
Skulle det være behov for et request-objekt kan dette opprettes på samme måte. 


## Oppsett av interface for klienten

Det anbefales at det defineres et interface for klienten som skal kalle API. 
Det gjør at vi kan benytte oss av styrkene til .NET med dependency injection og effektiv håndtering av HTTP-klienter.

I applikasjonsrepoet opprettes mappen _App/clients_,
i den nye mappen opprettes filen `ICountryClient.cs`.

Interfaces består av én metode `GetCountry` som tar inn en streng og returnerer et _Country_-objekt.

Definer interfacet som vist nedenfor.

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

Returobjektet er omkranset av `Task<...>` denne er lagt inn for å vise til at kallet som skal gjøres
vil være asynkront. 

## Implementere klient

Det er klienten som inneholder koden som gjør kallet mot APIer og omformer resultatet til `Country`-modellen 
som forventes i retur av funksjonene som kaller klienten. 

Den fulle implementasjonen av _Country_-klienten er vist nedenfor.

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


Øverst i filen finner du referansen til alle namespace som klassen er avhengig av 

```cs
using System;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

using Altinn.App.models;

using Microsoft.Extensions.Logging;
```

Videre definerer vi klassen og hvilket interface den arver fra

```cs
public class CountryClient : ICountryClient
```

Videre er tre private objekter __client_, __logger og __serializerOptions_ 

```cs
private readonly HttpClient _client;
private readonly ILogger<ICountryClient> _logger;
private readonly JsonSerializerOptions _serializerOptions;
```        

Understrek foran navnet er kun en navnekonvensjon og har ingen effekt. 
- __client_ vil i konstruktøren populeres med en http-klient.
- __logger_ vil i konstruktøren populeres med en logger slik at man kan logge feilmeldinger og annet i klassen
- __serializerOptions_ vil i konstruktøren instansieres og konfigureres for å kunne deserialisere responsen fra APIet. 

Videre i klassen defineres konstruktøren.

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

Objekter populeres dersom de kommer som input i konstruktøren og andre objekter instansieres.
Skulle du ha behov for å bruke en av de andre servicene som er registeret i applikasjonen er det bare å
sende den inn i konstruktøren og opprette et privat objekt for å kunne ta det i bruk i klassen slik vi har gjort
med __logger_  eller __client_.


Videre i klassen finner du implementasjonen av metoden `GetCountry`.

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

Her gjøres det en sjekk på at statuskoden på API-kallet er en suksess-kode før vi deserialiseres og returnerer objektet.
Dersom det ikke er en suksess-statuskode logger vi en feil og returnerer null.

## Registrere klienten i applikasjonen

Når interface og klient er implementert kan den registreres i _App/Program.cs_ (.NET 6) eller i _App/Startup.cs_ (.NET 5) for bruk i applikasjonen.

I metoden `ConfigureServices` legger vi til kodelinjen nedenfor.
I tillegg må `using Altinn.App.client;` legges til øverst i filen.

```C#
services.AddHttpClient<ICountryClient, CountryClient>();
```

## Benytte klient i applikasjonslogikk

For å berike skjemadata må vi koble klienten vår på logikken i _App/logic/DataProcessingHandler.cs_ i metoden _ProcessDataWrite_.

Først må klienten tilgjengeliggjøres ved å _injecte_ den inn i konstruktøren til klassen.
DataProcessingHandler har ingen konstruktør i utgangspunktet så den må opprettes i klasse. 

```cs
public DataProcessingHandler()
{
}
```

Videre kan vi opprette et privat objekt for klienten, injecte den i konstruktøren og assigne den til det private objektet. 
Resultatet blir seende slik ut:

```cs
private readonly ICountryClient _countryClient;

public DataProcessingHandler(ICountryClient countryClient)
{
    _countryClient = countryClient;
}
```
I tillegg må `using Altinn.App.client;` legges til også i denne filen.

__countryClient_ er nå tilgjengelig i DataProcessingHandler og vi er klare til å implementere logikken i ProcessDataWrite. 

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

Prøver du å bygge applikasjonen nå vil du få en feil.
DataProcessingHandler instansieres i App.cs, så alle dependecies må og inn i denne filen 
og så sendes videre i konstruktøren til DataProcessingHandler.

I filen _App/logic/App.cs_ gjøres følgende endringer

- legg til en referanse til namespaces til klienten øverst i filen 
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

- Legg til countryClient i konstruktøren til DataProcessingHandler 
    ```cs
    _dataProcessingHandler = new DataProcessingHandler(countryClient);
    ```


## Caching av responsdata 

En ulempe med eksempelet slikt det står nå er at man for hver gang skjemaet lagres vil man gjøre et kall
mot endepunktet for å hente ut data. 

Det er rimelig å anta at et lands hovedstad og hvilken region 
det tilhører ikke vil endre seg hyppig. Har vi hentet informasjon om Norge kan vi lagre denne lokalt i applikasjonen 
i en tidsperiode, så man slipper å gjøre kallet igjen. 

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

