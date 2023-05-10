---
title: Authorization
description: The Authorization DevOps team primarily work on and is responsible for solutions that provide Authentication and Authorization in Altinn 2 and Altinn 3
---

## Responsibilities in Altinn 3:
The Authorization team is respobsible for all these services in Altinn 3. 
This includes development of new features, fixing issues, maintaining infrastructure and securing availablility.

### Authentication
The authentication component provides functionality to authenticate users and systems accessing Altinn Apps and Altinn platform.

[Repository](https://github.com/Altinn/altinn-authentication)

### Authorization
The authorization components provide access management and control functionality for digital and analog services hosted in the Altinn Platform or other places.
The solution is documented [here](https://docs.altinn.studio/authorization/)

- [Repository for authorization](https://github.com/Altinn/altinn-authorization)
- [Repository for access policies](https://github.com/Altinn/altinn-access-policies)
- [Repository for access groups](https://github.com/Altinn/altinn-access-groups)
- [Repository for resource registry](https://github.com/Altinn/altinn-resource-registry)

- [Repository for access management](https://github.com/Altinn/altinn-access-management)
- [Repository for access management frontend](https://github.com/Altinn/altinn-access-management-frontend)
- [Repository for Design system used in access management frontend](https://github.com/Altinn/altinn-design-system)

### Register
The Register application provides Altinn 3 access to registry data on people and organisations in Norway.

[Repository](https://github.com/Altinn/altinn-register)

## Responsibilities in Altinn 2: 

In Altinn 2 the team is responsible for non-critical support and developement for these services in Altinn 2.
Issues of urgent matter (support or developement) is handled by Altinn 2 servicemangement organization. 

### Consentservice
With consent/power of attorney, you can request permission to retrieve/share data that the public has about a citizen or business, or carry out something on their behalf.
You then get temporary access or action rights to a specific set of information or services from the user. This could, for example, be taxdata from the Norwegian Tax Authorities.
[Read more here](https://altinn.github.io/docs/utviklingsguider/samtykke/)

### Access Controll 
Altinn can be used for authorization and access control for external services, i.e. services on other websites than in the Altinn platform.
Altinn Authorization can be used by service owners who want to make information and services available on their own platform and website, but cannot carry out a full authorization of user access.
[Read more here](https://altinn.github.io/docs/utviklingsguider/styring-av-tilgang/for-tjenesteeier/)

### Access controll used in APIs 
Maskinporten is part of a national trust-service solution Digdir which offers security of API access via machine-to-machine authentication and an OAuth2-scope based authorization mechanism.
Altinn makes it possible for businesses that have been given access to an API through Maskinporten to pass this on to, for example, a supplier who will carry out the technical implementation on their behalf.
[Read more here](https://altinn.github.io/docs/utviklingsguider/api-delegering/)

### Users og authentication
The team has responsibility of the usertypes that are available: persons (pnr/dnr), organizations (orgnr), business users, self-identified users, computer system (systemID)
Authentication via Portal and in API including integration with IDporten, Maskinporten and Altinn-specific authentication solutionsr

### Altinn 2 copy av ER og FREG
Altinn has an updated copy of ER and FREG which are used in various parts of Altinn.