---
title: 'API client for .NET'
description: 'How to use the .NET API client for service owners'
weight: 60
---

## Introduction

Dialogporten contains a .NET client package for the service-owner API. The package ID is `Altinn.ApiClients.Dialogporten.ServiceOwner`, and the main namespace is `Altinn.ApiClients.Dialogporten.ServiceOwner`.

The package registers a Refit-based client for the service-owner API, plus shared services for dialog token validation.

## Configuration

The package is configured through `DialogportenSettings`.

- `BaseUri` is the Dialogporten base URI up to, but excluding, `/api/v...`
- `ThrowOnPublicKeyFetchInit` controls whether startup should fail if the library cannot fetch Dialogporten public keys
- `Maskinporten` contains the Maskinporten client configuration used when calling the service-owner API

Example:

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

## Using the client

The service-owner package exposes `IServiceOwnerApi`, which gives access to versioned APIs through `.V1`.

Minimal example:

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

The registration also adds `IDialogTokenValidator`, and a background service that refreshes the public keys needed to validate dialog token signatures.

{{<notice info>}}
An SDK for the end-user API is currently under active development.
{{</notice>}}
