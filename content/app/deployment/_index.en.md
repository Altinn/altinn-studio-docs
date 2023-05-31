---
title: Deployment of apps to production
linktitle: Deployment
description: App owners can deploy their applications themselves.
toc: true
weight: 60
---

## Getting access to a production environment

Before you can deploy an application to the production environment for the first time, a seperate cluster for the service owner needs to be provisioned.

To get the cluster provisioned, the following process applies:

1. [Send an e-mail](mailto:tjenesteeier@digdir.no) with a message about which apps you have ready for deployment to production.
2. [Confirm that service owner accepts the terms of use](https://digdir.apps.altinn.no/digdir/godkjenn-bruksvilkaar)
3. Wait for a reply that cluster is created.

This routine just needs to be followed once. When the cluster is set up, the solution is 100% self-serviced afterwards.

## Deployment of app

Deploy of an application to production is done in [the same way as for test environments](/app/guides/testing/deploy).

## Order "About form"-page on altinn.no

Altinn maintains [an overview of all services](https://www.altinn.no/skjemaoversikt/).
In order for Altinn User Service to be able to help users with a service, information must be entered here.
The order form is called _"Publiser informasjon om tjeneste på Altinn PROD og TT02"_, and can be found after login on [altinndigtal.no](https://altinndigital.no).


**NB!** The form is currently optimized for Altinn II services. Therefore, do the following:

- In the field _"Tjenestekode"_, enter 9999 and in the field _"Utgavekode"_ enter 9999.
- In the field _"Hvem skal bruke skjemaet"_ remember to specify which roles are required for using the app in addition to the description of who the app is ment for.

{{<children />}}