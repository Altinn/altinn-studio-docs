---
title: Komponentarkitektur - Autentisering
linktitle: Autentisering
description: Autentiseringskomponenten i Altinn-plattformen er en ASP.NET Core web-API-applikasjon som driftes som en Docker-kontainer i en Kubernetes-klynge.
tags: [architecture, solution]
aliases:
  - /authentication/architecture/
---

Applikasjonen kjører på port 5040.  
Se detaljer i [Dockerfile](https://github.com/Altinn/altinn-authentication/blob/main/Dockerfile).

## API-kontrollere

- [Authentication](https://github.com/Altinn/altinn-authentication/blob/main/src/Authentication/Controllers/AuthenticationController.cs): Konverterer ulike ID-token fra identitetsleverandører
- [OpenID](https://github.com/Altinn/altinn-authentication/blob/main/src/Authentication/Controllers/OpenIdController.cs): Inneholder well-known-endepunkt
- [Logout](https://github.com/Altinn/altinn-authentication/blob/main/src/Authentication/Controllers/LogoutController.cs): Utlogging
- [Introspection](https://github.com/Altinn/altinn-authentication/blob/main/src/Authentication/Controllers/IntrospectionController.cs)

## Dependencies

Autentiseringskomponenten bruker biblioteker for OpenID Connect til å opprette og validere JWT-token.

Se komplett liste over avhengigheter i
[csproj-filen](https://github.com/Altinn/altinn-authentication/blob/main/src/Authentication/Altinn.Platform.Authentication.csproj).
