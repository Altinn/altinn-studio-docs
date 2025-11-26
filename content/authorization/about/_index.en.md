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

A typical use case is when a public entity needs to control who can read or change data in a service. The service can run on the Altinn platform or on the owner’s own platform.

To use Altinn Authorization, the service owner registers the service in the **Resource Register**. There they describe the service and set access policies that state who can use it, on whose behalf, and with which operations.

![Brukerscenario](om_autorisasjon.png "Altinn Autorisasjon")

Businesses and private individuals can delegate rights through the Altinn Authorization user interface. They can see who has which rights on their behalf and revoke them when needed.

System providers can integrate the same delegation and access checks in their own solutions using our APIs. This allows users to stay in their business system (for example, an accounting system) while still relying on Altinn for secure authorization.
