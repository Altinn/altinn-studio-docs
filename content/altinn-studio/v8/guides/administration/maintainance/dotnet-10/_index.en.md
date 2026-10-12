---
title: Upgrading the app to .NET 10
linktitle: .NET 10
description: How to upgrade a v8 app from .NET 8 to .NET 10.
toc: true
---

Your app runs on .NET from Microsoft. From 10 November 2026, .NET 8 and .NET 9 no longer get security updates. You should therefore move the app to .NET 10, which gets updates until November 2028. You do not need to wait for v9.

The app must use Altinn.App 8.12.9 or later. That is the first v8 version that supports .NET 10.

## Upgrade the app

You make the changes in the app's repository.

1. Open `App/App.csproj` and update `Altinn.App.Api` and `Altinn.App.Core` to the latest 8.x version. You can find the versions on [NuGet](https://www.nuget.org/packages/Altinn.App.Core).
2. Set `TargetFramework` to `net10.0` in the same file. If the app has a test project, make the same change there.
3. Delete the lines for packages that Altinn.App already includes, such as `Swashbuckle.AspNetCore`, to avoid error NU1605 ("Detected package downgrade").
4. Open `Dockerfile` and replace `8.0` with `10.0` in both `FROM` lines. If the version is followed by `@sha256:` and a long code, delete that part.
5. Build the app, for example with `dotnet build App/App.csproj`.
6. Publish the app to TT02 and test the whole process before you publish it to production.

This is how `App/App.csproj` looks after the changes:

```xml
<PropertyGroup>
  <TargetFramework>net10.0</TargetFramework>
</PropertyGroup>
<ItemGroup>
  <PackageReference Include="Altinn.App.Api" Version="8.12.11" />
  <PackageReference Include="Altinn.App.Core" Version="8.12.11" />
</ItemGroup>
```

This is how the `FROM` lines in `Dockerfile` look:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
```

If the app has a lot of custom code, read Microsoft's lists of breaking changes in [.NET 9](https://learn.microsoft.com/en-us/dotnet/core/compatibility/9.0) and [.NET 10](https://learn.microsoft.com/en-us/dotnet/core/compatibility/10).

## New warnings after the upgrade

The build may show new warnings. They do not stop the build:

- `NU1510`: the app references a package that is now part of .NET 10, such as `Microsoft.Extensions.Logging.Debug`. You can delete the line.
- `CS0618`: the code uses a method that newer v8 versions mark as obsolete. The method still works, but replace it with the one the warning suggests when you have the chance.
