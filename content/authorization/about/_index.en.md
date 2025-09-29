---
title: About Authorization
linktitle: About Authorization
description: The authorization components provide access management and control functionality for digital and analog services hosted in the Altinn Platform or other places.
toc: false
weight: 1
aliases:
  - /technology/solutions/altinn-platform/authorization/
cascade:
  params:
    diataxis: diataxis_explanation
---

Altinn Authorization offers a collection of components and services that public entities, system providers, businesses, and citizens can use to achieve this.

A common scenario is when a public entity wants to control who can have access to or modify data in a given service.
The public entity that owns this service is the resource owner. The service can be one running on the Altinn platform or on the resource owner’s own platform.

To use Altinn Authorization, the resource owner must register the service in the Resource Register. Here, information about the service is specified, and access rules/policies are set to control who can use the service.

![Brukerscenario](om_autorisasjon.svg "Altinn Autoriasjon")

Businesses and private individuals can, through the Altinn Authorization user interface, grant authorization so that others can act on their behalf or on behalf of their business.
In the user interface, one can also see who holds such authorizations and, if necessary, revoke them.

To support scenarios where one works within a specialized system — for example, an accounting system — we also offer APIs so that system providers can offer authorization functionality through their systems.
