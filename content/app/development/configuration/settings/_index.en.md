---
title: Settings and environmental variables
linktitle: Settings
description: How to add configuration and environmental specific values so that they are available from app code.
toc: true
weight: 500
---

## Standard .NET configuration

Altinn 3's app template is based on an ASP.Net Core application and has a multidude of possibilities for controlling configuration of an app. This documentation is therefore in large part quotes from or links to [Microsoft's own documentation](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-3.1). However, not everything is possible in an application because Altinn 3 does not give full access to the environment an app is run within. 

## appsettings.json

The first and simplest source for configuration information are the `appsettings` files. Every new app which is created will come with an existing `appsettings.json` file. This file is read by an app during startup independently of what environment the app runs in. This means the file should only contain settings which are equal in all environments. The file contains some settings that are already in use and the values are in large part meant for a development environment where the application is run within [LocalTest](https://github.com/Altinn/altinn-studio/blob/master/LOCALAPP.md)

In appsettings.json the values are organized in different sections. It is not recommended to add new values to the existing sections, creating new sections is recommended. The following sections are reserved to avoid collisions: `Kestrel`, `AppSettings`, `GeneralSettings`, `PlatformSettings`, `PEPSettings`, `ApplicationInsights`, `kvSettings`.

```json
{
  "ExampleSection": {
    "ExampleValue": "Verdi lest inn i alle miljøer, men kanskje overstyrt av miljøspesifikke kilder"
  },
  "AppSettings": {
      ...
  },
  "GeneralSettings": {
      ...
  },
  "PlatformSettings": {
    "ApiStorageEndpoint": "http://localhost:5101/storage/api/v1/",
    "ApiRegisterEndpoint": "http://localhost:5101/register/api/v1/",
    ...
  },
  "ApplicationInsights": {
    "InstrumentationKey": "retrieved from environment at runtime"
  }
}
```

In the future new apps will have a designated section which is simple to expand. In the meantime we refer to [Microsoft's own documentation](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/options?view=aspnetcore-3.1) for how this should be done.

### Environment specific appsettings

A new app will contain a set of environment specific appsettings files: `appsettings.Development.json`, `appsettings.Staging.json` and `appsettings.Production.json`. These files are read in their respective environments. The TT02-environment is defined as staging and the production environment is defined as Production.

Every file should contain the values which are unique or different in at least one of the environments. Examples of values that vary from environment to environment is the "timeout" values. You might want an app to wait longer for a response from an external API during development than what you want to allow during production.

#### appsettings.Development.json
```json
{
  "ExampleSection": {
    "ExampleValue": "Verdi lest inn kun for utviklingsmiljø"
  }
}
```

#### appsettings.Staging.json
```json
{
  "ExampleSection": {
    "ExampleValue": "Verdi lest inn kun for TT02"
  }
}
```

#### appsettings.Production.json
```json
{
  "ExampleSection": {
    "ExampleValue": "Verdi lest inn kun for produksjon"
  }
}
```

## Environment variables

Standard behaviour for an ASP.Net application is to read Environment variables. This is also done for an app, but it isn't possible for an app developer to create or change any of these values. Altinn 3 considers the other method of controlling Environment specific variables to be covered by appsettings and KeyVault. 

## Command line arguments

It is technically possible to override all other data sources by using command line arguments. It is however not possible to use this to change values from one environment to another.

## Azure KeyVault

Every application owner should have access to their own Azure KeyVault for storage of sensitive values. Sensitive values includes values which you don't want to be visible in code or configuration files. Examples include usernames and passwords for external APIs, certificates, private keys, etc.

Currently values from KeyVault are not read into the configuration control of an App. Instead the secrets component is used. This is documented under [Secrets](../secrets).
