---
title: Konfigurere autentisering
linktitle: Autentisering
description: Slik konfigurerer du autentisering.
weight: 800
tags: [needsReview]
---

## Autentiseringsnivå

Du setter påkrevd autentiseringsnivå i [XACML Policy]({{< relref "../authorization" >}}) som obligation.

## ID-provider

Det er mulig å angi at appen skal bruke en spesiell ID-provider som ikke er standardvalget. Standardvalget er ID-porten eller Altinn-pålogging.

De eneste godkjente ID-providerene for øyeblikket er:

- [FEIDE](https://www.feide.no/)
- [UIDP](https://www.udir.no/verktoy/uidp/)

Bruk av OIDC-provider angis i `appSettings`:

```json
"AppOidcProvider": "uidp"
```

Les mer om OIDC-støtten under [arkitektur](/nb/technology/architecture/capabilities/runtime/security/authentication/oidcproviders/).
