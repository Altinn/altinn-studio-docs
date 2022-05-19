---
title: Konfigurasjon av autentisering
linktitle: Autentisering
description: Når det gjelder autentisering er det noen konfigurasjoner som kan være aktuell
weight: 800
tags:
---
## Autentiseringsnivå

Påkrevd autentiseringsnivå settes i [XACML Policy](../authorization) som obligation.

## ID-provider

Det er mulig å sette at app skal bruke en spesiell ID-provider som ikke er standardvalget. Standarvalg betyr ID-porten / Altinn pålogging.

De eneste godkjente ID-providerene for øyeblikket er 

- [FEIDE](https://www.feide.no/)
- [UIDP](https://www.udir.no/verktoy/uidp/)

Bruk av OIDC provider settes i appSettings

```json
    "AppOidcProvider": "uidp"
```
Les mer om OIDC støtten under [arkitektur](/technology/architecture/capabilities/runtime/security/authentication/oidcproviders/).
