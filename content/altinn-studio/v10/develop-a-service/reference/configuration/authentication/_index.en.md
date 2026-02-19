---
title: Configuration of authentication
linktitle: Authentication
description: Some configurations can be useful when it comes to authentication.
weight: 800
tags: [needsReview, translation]
---

## Authentication level

Required authentication level is set in the [XACML Policy]({{< relref "../authorization" >}}) as an obligation.

## ID-provider

It is possible to specify that an app should use a special ID-provider which is not the standard option. The standard option is ID-porten or Altinn's login.

Currently the only approved ID-providers are:

- [FEIDE](https://www.feide.no/)
- [UIDP](https://www.udir.no/verktoy/uidp/)

Use of OIDC provider is specified in appSettings:

```json
"AppOidcProvider": "uidp"
```

Read more about OIDC support under [architecture](/en/technology/architecture/capabilities/runtime/security/authentication/oidcproviders/).
