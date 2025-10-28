---
title: Getting Started with Consent
linktitle: Consent
description: To start using the consent solution, both the data consumer (end-user system) and the service owner must complete a few steps to configure the setup.
---

## Service Owner

This section describes what the service owner must do to make data available through the consent service.

1. Create a service that requires consent.

   - Create or adapt an API that offers data that can be shared based on consent.
   - The API must accept a valid **consent token** (JWT) from the data consumer as proof that the end user has granted consent.
   - Clearly describe which data is shared and under which conditions.

2. Register scopes for the service.

   - The service must be assigned one or more **OAuth2 scopes** in **Maskinporten**.  
     These scopes identify which rights (resources) require consent.
   - Each scope should be specific to its purpose, for example `altinn:inntekt.read`.

3. Create a consent resource in the Resource Registry.  
   The Resource Registry contains the description of the authorisation resource as well as its access rules. Inform prospective consumers about the access packages (and any individual rights) required to use the service.

4. Access lists.  
   You can use access lists to control which data consumers are allowed to use the service. This requires a process for adding new data consumers to the lists when needed.  
   A description of access lists and how to use them is available [here](/en/authorization/guides/resource-owner/manage-accesslists-resource-admin/).

5. Information and documentation.  
   Document:

   - which steps the data consumer must complete,
   - which access packages and scopes are required, and
   - who to contact to obtain access.

6. Validate consent.  
   The consent token is a rich token that contains all information required to validate the consent. You can therefore perform validation without calling Altinn Authorization.

## Data Consumer / End-User System

This section describes what the data consumer must do to start using the consent service.

1. The data consumer must register a Maskinporten client.

   - Maskinporten is one of the building blocks that the system user relies on.
   - Maskinporten ensures authenticity and allows the service owner to perform coarse-grained access control through scopes.
   - The Maskinporten token serves as a carrier for consent information so the service owner can perform authorisation based on the content of the token.

   To obtain access to Maskinporten, you need a Norwegian organisation number. For more information, see [Maskinporten](https://www.digdir.no/felleslosninger/maskinporten/869).

   By signing the [terms of use for Maskinporten and ID-porten](https://samarbeid.digdir.no/maskinporten/bruksvilkar-private-virksomheter/73#21_generelt) you gain access to both the test and production environments at Digdir.

   1. Connect to Maskinporten.  
      Follow the procedure for [connecting to Maskinporten](https://samarbeid.digdir.no/maskinporten/ta-i-bruk-maskinporten/97).
   2. Create a Maskinporten client.  
      A Maskinporten client can be created either in the Collaboration Portal or via API. Creating a client requires that you already have a connection to Maskinporten. For more information, see [Maskinporten client](https://docs.altinn.studio/nb/correspondence/getting-started/developer-guides/maskinporten/).

2. The data consumer must have consent scopes delegated by Digdir.

   - Sign the [terms of use for Altinn end-user system providers](https://samarbeid.digdir.no/altinn/bruksvilkar-sluttbrukersystemleverandorer-i-altinn/3002) to gain access to the test and production environments.
   - Complete the [registration form for end-user system providers](https://forms.office.com/Pages/ResponsePage.aspx?id=D1aOAK8I7EygVrNUR1A5kcdP2Xp78HZOttvolvmHfSJUOFFBMThaOTI1UlVEVU9VM0FaTVZLMzg0Vi4u) and tick consent to receive the necessary scopes:
     - altinn:consentrequests.read
     - altinn:consentrequests.write

3. Request access to the service owner’s services.

   - The service owner decides which scopes are used for access control to their services.
   - These scopes are different from the consent API scopes and are granted by the service owner.
   - Consult the service owner’s documentation or contact them directly to identify which scopes you need.
   - If the service owner uses access lists, ensure that your organisation number is added before requesting data.

4. Integration.  
   See [Guides](/en/authorization/guides/system-vendor/consent/) for details on how to integrate your end-user system with the consent APIs.
