---
title: Oppgradere appen til .NET 10
linktitle: .NET 10
description: Slik oppgraderer du en app på v8 fra .NET 8 til .NET 10.
toc: true
---

Appen din kjører på .NET fra Microsoft. Fra 10. november 2026 får .NET 8 og .NET 9 ikke lenger sikkerhetsoppdateringer. Flytt derfor appen til .NET 10, som får oppdateringer til november 2028. Du trenger ikke å vente på v9.

Appen må bruke Altinn.App 8.12.9 eller nyere. Det er den første versjonen av v8 som støtter .NET 10.

## Oppgrader appen

Du gjør endringene i repositoriet til appen.

1. Åpne `App/App.csproj`, og oppdater `Altinn.App.Api` og `Altinn.App.Core` til siste 8.x-versjon. Du finner versjonene på [NuGet](https://www.nuget.org/packages/Altinn.App.Core).
2. Sett `TargetFramework` til `net10.0` i den samme filen. Har appen et testprosjekt, gjør du den samme endringen der.
3. Slett linjene for pakker som Altinn.App allerede har med, for eksempel `Swashbuckle.AspNetCore`, så slipper du feilen NU1605 («Detected package downgrade»).
4. Åpne `Dockerfile`, og bytt ut `8.0` med `10.0` i de to `FROM`-linjene. Står det `@sha256:` og en lang kode etter versjonen, sletter du den delen.
5. Bygg appen, for eksempel med `dotnet build App/App.csproj`.
6. Publiser appen til TT02, og test hele prosessen før du publiserer den i produksjon.

Slik ser `App/App.csproj` ut etter endringene:

```xml
<PropertyGroup>
  <TargetFramework>net10.0</TargetFramework>
</PropertyGroup>
<ItemGroup>
  <PackageReference Include="Altinn.App.Api" Version="8.12.11" />
  <PackageReference Include="Altinn.App.Core" Version="8.12.11" />
</ItemGroup>
```

Slik ser `FROM`-linjene i `Dockerfile` ut:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
```

Har appen mye egen kode, bør du sjekke hvilke endringer i [.NET 9](https://learn.microsoft.com/en-us/dotnet/core/compatibility/9.0) og [.NET 10](https://learn.microsoft.com/en-us/dotnet/core/compatibility/10) som ikke er bakoverkompatible.

## Nye advarsler etter oppgraderingen

Bygget kan gi nye advarsler. De stopper ikke bygget:

- `NU1510`: Appen refererer til en pakke som nå er en del av .NET 10, for eksempel `Microsoft.Extensions.Logging.Debug`. Du kan slette linjen.
- `CS0618`: Koden bruker en metode som nyere v8-versjoner har merket som utdatert. Metoden virker fortsatt, men bytt den ut med metoden advarselen foreslår, når du har anledning.
