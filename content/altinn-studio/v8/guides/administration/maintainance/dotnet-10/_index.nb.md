---
title: Oppgradere appen til .NET 10
linktitle: .NET 10
description: Slik oppgraderer du en app på v8 fra .NET 8 til .NET 10.
toc: true
---

10. november 2026 slutter Microsoft å gi sikkerhetsoppdateringer til .NET 8 og .NET 9. Du kan flytte appen til .NET 10 uten å oppgradere den til v9. .NET 10 har support til november 2028.

Appen må bruke Altinn.App 8.12.9 eller nyere. Det er den første versjonen av v8 som støtter .NET 10.

## Oppgrader appen

Du gjør endringene i repositoriet til appen.

1. Åpne `App/App.csproj`, og oppdater `Altinn.App.Api` og `Altinn.App.Core` til siste 8.x-versjon. Du finner versjonene på [NuGet](https://www.nuget.org/packages/Altinn.App.Core).
2. Sett `TargetFramework` til `net10.0` i den samme filen. Har appen et testprosjekt, gjør du den samme endringen der.
3. Åpne `Dockerfile`, og bytt ut `8.0` med `10.0` i de to `FROM`-linjene. Står det `@sha256:` og en lang kode etter versjonen, sletter du den delen.
4. Bygg appen, for eksempel med `dotnet build App/App.csproj`. Stopper bygget med feilen NU1605, se [neste avsnitt](#hvis-bygget-stopper-med-nu1605).
5. Publiser appen til TT02, og test hele prosessen før du publiserer den i produksjon.

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

## Hvis bygget stopper med NU1605

Feilen betyr at appen refererer direkte til en eldre versjon av en pakke som Altinn.App også bruker. Øk versjonen i `App/App.csproj` til den Altinn.App trenger. Den står først i feilmeldingen. Det gjelder ofte `Swashbuckle.AspNetCore` eller `Azure.Extensions.AspNetCore.Configuration.Secrets`.

```text
error NU1605: Warning As Error: Detected package downgrade: Swashbuckle.AspNetCore from 9.0.6 to 9.0.4.
```

Her setter du `Swashbuckle.AspNetCore` til 9.0.6.

## Nye advarsler etter oppgraderingen

Bygget kan gi nye advarsler. De stopper ikke bygget:

- `NU1510`: Appen refererer til en pakke som nå er en del av .NET 10, for eksempel `Microsoft.Extensions.Logging.Debug`. Du kan slette linjen.
- `CS0618`: Koden bruker en metode som nyere v8-versjoner har merket som utdatert. Metoden virker fortsatt, men bytt den ut med metoden advarselen foreslår, når du har anledning.
