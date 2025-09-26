---
title: Authentication with Maskinporten
linktitle: Maskinporten
description: Altinn supports the use of Maskinporten tokens in several APIs
toc: true
weight: 100
aliases:
  - /api/authentication/maskinporten/
---

- API for service owners in connection with data for Altinn Apps
- API for system providers in connection with system users

## Prerequisites

To make use of Maskinporten authentication, you must first have access to a client registered with Maskinporten. If you need a detailed description on how to set this up, please refer to the guide below.

{{% expandlarge id="guide-mp-int-samarbeid" header="Guide on how to register a new Maskinporten integration in Samarbeidsportalen" %}}
{{% insert "content/shared/maskinporten/maskinporten-client-create.en.md" %}}
{{% /expandlarge %}}

## Access as a service owner

To retrieve data from Storage in Altinn 3 via API as a service owner, you must create an integration (client) in Maskinporten with the necessary scopes.

The following scopes are created by Altinn and delegated to the service owner. These scopes are necessary to use the APIs related to instances as a service owner:

- `altinn:serviceowner/instances.read`
- `altinn:serviceowner/instances.write`
{.correspondence-custom-list}

Clients with `write` scope can, among other things, instantiate apps on behalf of users via the app's own API, upload data, update metadata, and process status.
Clients with `read` scope can only read data, metadata, and events.

In most cases, a client for the service owner will need both scopes.

## Exchange to Altinn token

Altinn does not accept Maskinporten tokens directly. These must be exchanged for Altinn tokens. See details in the scenario below.

## More information

- For more information, see [documentation for API consumers](https://docs.digdir.no/maskinporten_guide_apikonsument.html#prosedyre-for-api-konsument) from Maskinporten.
- See also [authentication scenario]({{< relref "/api/scenarios/authentication/" >}}) for more details (in English).
