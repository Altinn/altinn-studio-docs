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

Description of how service owners' systems can use Maskinporten to access APIs.

## Collaboration Portal

In [My Profile](https://minside-samarbeid.digdir.no) in the [Collaboration Portal](https://samarbeid.digdir.no/), you have access to self-service for [Maskinporten](https://samarbeid.digdir.no/maskinporten/maskinporten/25), where you can create new integrations (clients).

- https://tt02.altinn.no is the test environment for apps in Altinn, and it is connected to the **Ver 2** environment in Maskinporten.
- https://www.altinn.no is connected to **Production**.

![Environments in Maskinporten](environments-idporten.png "Environments in Maskinporten")

## Access as a service owner

To retrieve data from Storage in Altinn 3 via API as a service owner, you must create an integration (client) in Maskinporten with the necessary scopes.

The following scopes are created by Altinn and delegated to the service owner. These scopes are necessary to use the APIs related to instances as a service owner:

```js
altinn:serviceowner/instances.read
altinn:serviceowner/instances.write
```

Clients with *write* scope can, among other things, instantiate apps on behalf of users via the app's own API, upload data, update metadata, and process status.
Clients with *read* scope can only read data, metadata, and events.

In most cases, a client for the service owner will need both scopes.

Client creation can be done via API or in the Collaboration Portal.

```http
POST https://integrasjon.difi.no/clients/
{
    "integration_type": "maskinporten",
    "client_name": "DIHE test client for instances",
    "client_type": "CONFIDENTIAL",
    "description": "Client to retrieve data from my apps",
    "scopes": [ "altinn:serviceowner/instances.read", "altinn:serviceowner/instances.write" ],
    "token_reference": "SELF_CONTAINED"
}
```

![New integration](new-integration.png "Create new integration (client) in the Collaboration Portal. Remember to choose the correct environment.")

## Exchange to Altinn token

Altinn does not accept Maskinporten tokens directly. These must be exchanged for Altinn tokens. See details in the scenario below.

## More information

- For more information, see [documentation for API consumers](https://docs.digdir.no/maskinporten_guide_apikonsument.html#prosedyre-for-api-konsument) from Maskinporten.
- See also [authentication scenario](../../../api/scenarios/authentication/) for more details (in English).
