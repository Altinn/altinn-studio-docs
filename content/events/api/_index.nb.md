---
title: Altinn Events API
linktitle: API
description: En oversikt over Altinn Events API
weight: 10
toc: true
---

Altinn Events API er et HTTP-basert RESTful API som tilbyr endepunkter og handlinger for publisering av hendelser og abonnering på hendelser fra Altinn 3 Apps og andre registrerte kilder.

## Basis-URL

{{% insert "content/altinn-studio/v8/guides/shared/api/base-urls.md" "events"%}}

## Autentisering og autorisasjon

### Altinn token

{{% insert "content/altinn-studio/v8/guides/shared/api/altinn-token.md" "Events"%}}

### Maskinporten-scopes

{{% insert "content/altinn-studio/v8/guides/shared/api/maskinporten-scopes.md" %}}

### Platform Access token

{{% insert "content/altinn-studio/v8/guides/shared/api/platform-access-token.md" %}}

### Private API-er

API-et inneholder et sett med private API-er som kun er tilgjengelige innenfor Events-komponenten.
Disse er merket som _Private API_ i OpenAPI-spesifikasjonen og krever et tilgangstoken i forespørselsheaderen.