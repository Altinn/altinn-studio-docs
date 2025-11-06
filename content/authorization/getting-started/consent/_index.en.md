---
title: Getting Started with Consent
linktitle: Consent
description: To start using the consent solution, both the data consumer (end-user system) and the service owner must complete a set of configuration steps.
---

## Service Owner

This section describes what the service owner must do to make data available through the consent service.

{{< stepcard step="1" title="Create a service that requires consent" >}}

- Create or adapt an API that exposes the data that should be shared based on consent.
- The API must accept a valid **consent token** (JWT) from the data consumer as proof that the end user has issued a consent.
- Clearly describe which data is shared and under which conditions.
  {{< /stepcard >}}

{{< stepcard step="2" title="Register scopes for the service" >}}

- Assign one or more **OAuth2 scopes** to the service in **Maskinporten**. These scopes identify the rights (resources) that require consent.
- Each scope should be purpose-specific, for example `altinn:inntekt.read`.
  {{< /stepcard >}}

{{< stepcard step="3" title="Create a consent resource in the Resource Registry" >}}
The Resource Registry stores the description of the authorisation resource and its access rules. Make sure potential consumers know which access packages (and any individual rights) are required to use the service. Read more about the required fields in the [consent resource guide](/en/authorization/guides/resource-owner/consent/#create-new-resource).  
{{< /stepcard >}}

{{< stepcard step="4" title="Manage access lists" >}}
You can use access lists to control which data consumers are allowed to use the service. This requires a process for adding new data consumers to the lists when needed.

![Flow diagram showing how access lists and scopes can stop the consent flow](samtykkeflyt_tilgang.png)

Data consumers that are not included in the access list cannot create consent requests, and the flow stops before the end user is asked for consent. Learn more about access lists [here](/en/authorization/guides/resource-owner/manage-accesslists-resource-admin/).
{{< /stepcard >}}

{{< stepcard step="5" title="Provide information and documentation" >}}
Document:

- which steps the data consumer must complete
- which access packages and scopes are required
- who to contact to obtain access
  {{< /stepcard >}}

{{< stepcard step="6" title="Validate consent" >}}
The consent token is a thick token that contains everything you need to validate the consent. Validation can therefore be performed without calling Altinn Authorization. See the [validation guidance](/en/authorization/guides/resource-owner/consent/#validate-consents) for details.
{{< /stepcard >}}

## Data Consumer / End-User System

This section explains what the data consumer must do to start using the consent service.

{{< stepcard step="1" title="Register a Maskinporten client" >}}

- Maskinporten is one of the foundation blocks that the consent solution builds on.
- Maskinporten ensures authenticity and allows the service owner to perform coarse-grained access control through scopes.
- The Maskinporten token carries the consent information, enabling the service owner to authorise access based on the token contents.

You need a Norwegian organisation number to access Maskinporten. See [Maskinporten](https://www.digdir.no/felleslosninger/maskinporten/869) for details.

By signing the [terms of use for Maskinporten and ID-porten](https://samarbeid.digdir.no/maskinporten/bruksvilkar-private-virksomheter/73#21_generelt) you gain access to the test and production environments at Digdir.

1. Connect to Maskinporten – follow the steps described in [Connect to Maskinporten](https://samarbeid.digdir.no/maskinporten/ta-i-bruk-maskinporten/97).
2. Create a Maskinporten client. You can create the client in Samarbeidsportalen or through the API. Creating a client requires that the Maskinporten connection is in place. See the [Maskinporten client guide](https://docs.altinn.studio/nb/correspondence/getting-started/developer-guides/maskinporten/).
   {{< /stepcard >}}

{{< stepcard step="2" title="Receive consent scopes from Digdir" >}}

- Sign the [terms of use for Altinn end-user system vendors](https://samarbeid.digdir.no/altinn/bruksvilkar-sluttbrukersystemleverandorer-i-altinn/3002) to access the test and production environments.
- Complete the [registration form for end-user system vendors](https://forms.office.com/Pages/ResponsePage.aspx?id=D1aOAK8I7EygVrNUR1A5kcdP2Xp78HZOttvolvmHfSJUOFFBMThaOTI1UlVEVU9VM0FaTVZLMzg0Vi4u) and tick consent to obtain the required scopes:
  - altinn:consentrequests.read
  - altinn:consentrequests.write
    {{< /stepcard >}}

{{< stepcard step="3" title="Request access to the service owner's APIs" >}}

- The service owner decides which scopes control access to their APIs.
- These scopes are different from the consent API scopes and are granted by the service owner.
- Find the required scopes in the service owner's documentation or by contacting them directly.
- If the service owner uses access lists, make sure your organisation number is added before requesting data.
  {{< /stepcard >}}

{{< stepcard step="4" title="Integrate with the consent APIs" >}}
See the [consent integration guides](/en/authorization/guides/system-vendor/consent/) for details on how to integrate your end-user system with Altinn's consent APIs.
{{< /stepcard >}}
