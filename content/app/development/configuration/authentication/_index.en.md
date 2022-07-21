---
title: Configuration of authentification
linktitle: Authentification
description: Some configurations can be usefull when it comes to authentification
weight: 800
---


## Authentification level

Required authentification level is set in the [XACML Policy](../authorization) as an obligation.


## ID-provider

It is possible to set up that an app will use a special ID-provider which is not the standard option. The standard option is ID-porten / Altinn's login.  

Currently the only validated ID-providers are:

- [FEIDE](https://www.feide.no/)
- [UIDP](https://www.udir.no/verktoy/uidp/)

Use of OIDC provider is set in appSettings

```json
    "AppOidcProvider": "uidp"
```


Read more about OIDC support under [architecture](/technology/architecture/capabilities/runtime/security/authentication/oidcproviders/).

