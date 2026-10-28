---
draft: true
title: Hente data fra et eksternt API
linktitle: Eksternt API
description: Slik henter appen data fra et annet system og viser dem i skjemaet
weight: 60
toc: true
tags: [needsReview]
---

Appen kan hente data fra et annet system og vise dem til brukeren, for eksempel en liste med dokumenter som hører til saken. Utvikleren skriver en klasse som henter dataene. I skjemaet viser du dem med uttrykket `externalApi` eller i en `SimpleTable`.

{{% notice warning %}}
**Bruk `externalApi` bare til å vise tekst.** Backend i appen kjenner ikke funksjonen ennå og gir en feil når den møter den. Bruk den derfor ikke i `hidden`, `required`, validering, beregninger eller i prosessen. Vi har meldt feilen i [Altinn/altinn-studio#21350](https://github.com/Altinn/altinn-studio/issues/21350).
{{% /notice %}}

## Slik virker det

1. Utvikleren lager en klasse som henter dataene, og registrerer den i appen.
2. Appen gjør dataene tilgjengelige for hver instans gjennom et eget endepunkt.
3. Første gang skjemaet trenger dataene, henter nettleseren dem fra endepunktet. Den henter dataene fra alle de eksterne API-ene appen har, ikke bare det ene skjemaet bruker.
4. Nettleseren tar vare på dataene i 10 minutter for hver instans.

Nettleseren henter ikke dataene på nytt når brukeren endrer noe i skjemaet. Dataene kan derfor ikke avhenge av det brukeren fyller ut.

## Lage en klient

Klienten er en klasse som implementerer grensesnittet `IExternalApiClient`. Den har to deler:

- `Id` er navnet du bruker for å vise til klienten i skjemaet. Appen skiller ikke mellom store og små bokstaver i navnet.
- `GetExternalApiData` henter dataene og returnerer dem som et objekt.

Eksempelet returnerer faste data, slik at du ser formen. I en ekte klient henter du dataene fra API-et, se [Kalle et API med Maskinporten](#kalle-et-api-med-maskinporten).

{{< code-title >}}
App/logic/DokumentApiClient.cs
{{< /code-title >}}

```csharp
using Altinn.App.Core.Features.ExternalApi;
using Altinn.App.Core.Models;

public class DokumentApiClient : IExternalApiClient
{
    public string Id => "dokumenter";

    public Task<object?> GetExternalApiData(
        InstanceIdentifier instanceIdentifier,
        Dictionary<string, string> queryParams
    )
    {
        var data = new DokumentListe
        {
            Tittel = "Dokumenter i saken",
            Dokumenter =
            [
                new Dokument { Navn = "Panteattest", Dato = "2026-10-01" },
                new Dokument { Navn = "Registerutskrift", Dato = "2026-10-15" },
            ],
        };

        return Task.FromResult<object?>(data);
    }
}

public class DokumentListe
{
    public required string Tittel { get; set; }
    public required List<Dokument> Dokumenter { get; set; }
}

public class Dokument
{
    public required string Navn { get; set; }
    public required string Dato { get; set; }
}
```

Appen sender dataene som JSON med små forbokstaver i navnene. Egenskapen `Dokumenter` heter derfor `dokumenter` i skjemaet.

## Registrere klienten

Registrer klienten i `Program.cs`:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false,hl_lines=7" >}}
void RegisterCustomAppServices(
  IServiceCollection services,
  IConfiguration config,
  IWebHostEnvironment env
)
{
  services.AddTransient<IExternalApiClient, DokumentApiClient>();
}
{{< / highlight >}}

Har appen flere klienter, registrerer du hver av dem på samme måte. Gi dem ulike navn. Har to klienter samme navn, bruker appen den som er registrert først, uten å si fra.

## Vise dataene i skjemaet

### Med uttrykket externalApi

`externalApi` tar navnet på klienten og stien til verdien du vil vise. Stien bruker punktum mellom nivåene og hakeparenteser for plassen i en liste. Den første plassen er `0`.

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json {hl_lines=["7-11"]}
{
  "id": "forsteDokument",
  "type": "Text",
  "textResourceBindings": {
    "title": "forsteDokument.title"
  },
  "value": [
    "externalApi",
    "dokumenter",
    "dokumenter[0].navn"
  ]
}
```

Med dataene fra eksempelet viser komponenten «Panteattest».

Funksjonen returnerer alltid tekst eller `null`:

- Tall og `true` blir tekst, for eksempel `"42"`.
- Lister og objekter gir `null`. Du kan altså ikke telle elementene i en liste eller sjekke om listen er tom.
- `0`, `false`, en tom tekst og en sti som ikke finnes, gir også `null`.

### I en tabell

`SimpleTable` kan vise en liste fra et eksternt API som en tabell. I `externalApi` på komponenten oppgir du navnet på klienten i `id` og stien til listen i `path`. Hver kolonne viser til et felt i hver rad med `accessors`.

`SimpleTable` er en betakomponent. Du må slå den på i `appsettings.json` før du kan bruke den:

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}

```json
{
  "FeatureManagement": {
    "SimpleTableEnabled": true
  }
}
```

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json {hl_lines=["4-7"]}
{
  "id": "dokumenttabell",
  "type": "SimpleTable",
  "externalApi": {
    "id": "dokumenter",
    "path": "dokumenter"
  },
  "columns": [
    { "header": "dokumenttabell.navn", "accessors": ["navn"] },
    { "header": "dokumenttabell.dato", "accessors": ["dato"] }
  ]
}
```

Stien må peke på et objekt eller en liste med objekter. En komponent kan ikke ha både `externalApi` og `dataModelBindings`. Se [SimpleTable]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/SimpleTable" >}}) for alle egenskapene.

## Kalle et API med Maskinporten

Krever API-et Maskinporten, gir du klienten en HTTP-klient som legger på et token. Appen bruker Maskinporten-klienten Altinn Studio har satt opp for den. Se [Bruke Maskinporten i appkoden]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten#appkode" >}}) for hvordan du legger til scopene.

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false,hl_lines=7-9 11" >}}
void RegisterCustomAppServices(
  IServiceCollection services,
  IConfiguration config,
  IWebHostEnvironment env
)
{
  services
    .AddHttpClient<DokumentApiClient>(client => client.BaseAddress = new Uri("https://api.example.no/"))
    .UseMaskinportenAuthorization("example:dokumenter.read");

  services.AddTransient<IExternalApiClient>(sp => sp.GetRequiredService<DokumentApiClient>());
}
{{< / highlight >}}

Den siste linjen gjør at appen bruker den samme klienten, med HTTP-klienten og Maskinporten-tokenet, når den henter data fra det eksterne API-et.

{{< code-title >}}
App/logic/DokumentApiClient.cs
{{< /code-title >}}

```csharp
using System.Net.Http.Json;
using Altinn.App.Core.Features.ExternalApi;
using Altinn.App.Core.Models;

public class DokumentApiClient(HttpClient httpClient) : IExternalApiClient
{
    public string Id => "dokumenter";

    public async Task<object?> GetExternalApiData(
        InstanceIdentifier instanceIdentifier,
        Dictionary<string, string> queryParams
    )
    {
        return await httpClient.GetFromJsonAsync<DokumentListe>("dokumenter");
    }
}
```

Kaster klienten en `HttpRequestException` med statuskode, svarer endepunktet med den samme statuskoden. Andre feil gir statuskode 500.

## Hente dataene fra endepunktet

Du kan også hente dataene direkte, for eksempel fra et annet system:

```text
GET {org}/{app}/instances/{instanceOwnerPartyId}/{instanceGuid}/api/external/{externalApiId}
```

- `{externalApiId}` er navnet på klienten, altså verdien i `Id`.
- Den som kaller endepunktet, må ha lesetilgang til instansen.
- Finnes det ingen klient med navnet, svarer endepunktet med statuskode 400.
- Spørreparametere i adressen sender appen videre til `GetExternalApiData` i `queryParams`. Skjemaet sender aldri spørreparametere, så der er `queryParams` alltid tom.

{{% notice warning %}}
Ikke send fødselsnummer eller andre personopplysninger som spørreparametere. Adressen kan havne i logger og i nettleserhistorikken. Hent heller opplysningene fra instansen i klienten.
{{% /notice %}}

## Kommer du fra v8?

- Metoden heter nå `GetExternalApiData`, uten `Async`. `queryParams` har ingen standardverdi. `studioctl app upgrade v9` gir metoden det nye navnet.
- `ConfigureMaskinportenClient` finnes ikke lenger. Se [Kommer du fra v8?]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten#fra-v8" >}}) på siden om Maskinporten.
- I `Text` står uttrykket i `value` på komponenten.
- Uttrykket `["equals", ["externalApi", id, "length"], 0]` fra v8-dokumentasjonen virker ikke, fordi funksjonen gir `null` for lister og for `0`.

## Spørsmål du kan stille utviklerne

- Hvilke systemer henter appen data fra, og hva skjer i skjemaet hvis et av dem er nede?
- Bruker vi `externalApi` noe annet sted enn i tekst, for eksempel i `hidden` eller `required`?
- Kan dataene endre seg mens brukeren fyller ut skjemaet, og er det et problem at nettleseren tar vare på dem i 10 minutter?
- Inneholder dataene personopplysninger, og hvem har tilgang til dem?
