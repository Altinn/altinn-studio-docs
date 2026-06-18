---
title: 'API-klient for .NET'
description: 'Hvordan bruke .NET API-klienten for tjenesteeiere'
weight: 60
---

## Introduksjon

Dialogporten inneholder en .NET-klientpakke for tjenesteeier-API-et. Pakke-ID-en er `Altinn.ApiClients.Dialogporten.ServiceOwner`, og hovednavnerommet er `Altinn.ApiClients.Dialogporten.ServiceOwner`.

Pakken registrerer en Refit-basert klient for tjenesteeier-API-et, i tillegg til delte tjenester for validering av dialogtoken.

## Konfigurasjon

Pakken konfigureres gjennom `DialogportenSettings`.

- `BaseUri` er base-URI-en for Dialogporten frem til, men ikke inkludert, `/api/v...`
- `ThrowOnPublicKeyFetchInit` styrer om oppstart skal feile dersom biblioteket ikke kan hente offentlige nøkler fra Dialogporten
- `Maskinporten` inneholder Maskinporten-klientkonfigurasjonen som brukes ved kall mot tjenesteeier-API-et

Eksempel:

```csharp
using Altinn.ApiClients.Dialogporten;
using Altinn.ApiClients.Dialogporten.ServiceOwner;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDialogportenClient(settings =>
{
    settings.BaseUri = "https://platform.tt02.altinn.no/dialogporten";
    settings.Maskinporten.ClientId = "YOUR_CLIENT_ID";
    settings.Maskinporten.EncodedJwk = "YOUR_ENCODED_JWK";
    settings.Maskinporten.Environment = "test";
    settings.Maskinporten.Scope =
        "digdir:dialogporten.serviceprovider digdir:dialogporten.serviceprovider.search";
});
```

## Bruke klienten

Pakken for tjenesteeier eksponerer `IServiceOwnerApi`, som gir tilgang til versjonerte API-er gjennom `.V1`.

Minimalt eksempel:

```csharp
using Altinn.ApiClients.Dialogporten.ServiceOwner;

public sealed class DialogService(IServiceOwnerApi dialogportenApi)
{
    public async Task<int> GetLabelCount(Guid dialogId, CancellationToken cancellationToken)
    {
        var response = await dialogportenApi.V1.GetServiceOwnerLabels(dialogId, cancellationToken);
        return response.Content?.Count ?? 0;
    }
}
```

Registreringen legger også til `IDialogTokenValidator`, og en bakgrunnstjeneste som oppdaterer de offentlige nøklene som trengs for å validere signaturer på dialogtoken.

{{<notice info>}}
En SDK for sluttbruker-API-et er for tiden under aktiv utvikling.
{{</notice>}}
