---
title: Authorization
description: The Authorization DevOps team primarily work on and is responsible for solutions that provide Authentication and Authorization in Altinn 2 and Altinn 3
---

## Responsibilities in Altinn 3:
The Authorization team is responsible for all these services in Altinn 3. 
This includes development of new features, fixing issues, maintaining infrastructure and securing availability.

### Authentication
The authentication component provides functionality to authenticate users and systems accessing Altinn Apps and Altinn platform.

[Repository for Authentication](https://github.com/Altinn/altinn-authentication)

### Audit log

[Repository for Auth-audit-log](https://github.com/Altinn/altinn-auth-audit-log)

### Resource Registry
- [Repository for resource registry](https://github.com/Altinn/altinn-resource-registry)
- [Studio for Resource Registry](https://github.com/Altinn/altinn-studio), kun det som gjelder ressursadministrasjonsfunskjonalitet
- 
### Authorization
The authorization components provide access management and control functionality for digital and analog services hosted in the Altinn Platform or other places.
The solution is documented [here](/authorization/)

- [Repository for authorization](https://github.com/Altinn/altinn-authorization)
- [Repository for access policies](https://github.com/Altinn/altinn-access-policies)
- [Repository for access groups](https://github.com/Altinn/altinn-access-groups)


- [Repository for access management](https://github.com/Altinn/altinn-access-management)
- [Repository for access management frontend](https://github.com/Altinn/altinn-access-management-frontend)
- [Repository for Design system used in access management frontend](https://github.com/Altinn/altinn-design-system)

### Tools
- [Repository for Altinn-tools](https://github.com/Altinn/altinn-tools)
- [Repository for Altinn2-test-apiclient](https://github.com/Altinn/altinn2-test-apiclient)
- [Repository for Postman examples in Altinn 2 API](https://github.com/Altinn/postman-examples)
- [Repository for MaskinportAPI postman in Altinn 2 API](https://github.com/Altinn/MaskinportenApiPostman)

### Documentation
Documentation related to Authentication and Authorization
- [Altinn 2 docs](https://github.com/Altinn/docs)
- [Altinn 3 docs](https://github.com/Altinn/altinn-studio-docs)
- [Altinnpedia](https://github.com/Altinn/altinnpedia)
- [Postmortems](https://github.com/Altinn/altinn-devops-postmortem)
- [Roadmap for Authorization/Authentication](https://github.com/orgs/digdir/projects/8/views/5)
## Responsibilities in Altinn 2: 

In Altinn 2 the team is responsible for non-critical support and development for these services in Altinn 2.
Issues of urgent matter (support or development) is handled by Altinn 2 service management organization. 

### Consent service
With consent/power of attorney, you can request permission to retrieve/share data that the public has about a citizen or business, or carry out something on their behalf.
You then get temporary access or action rights to a specific set of information or services from the user. This could, for example, be tax data from the Norwegian Tax Authorities.
[Read more here](https://altinn.github.io/docs/utviklingsguider/samtykke/)

### Access Control 
Altinn can be used for authorization and access control for external services, i.e. services on other websites than in the Altinn platform.
Altinn Authorization can be used by service owners who want to make information and services available on their own platform and website, but cannot carry out a full authorization of user access.
[Read more here](https://altinn.github.io/docs/utviklingsguider/styring-av-tilgang/for-tjenesteeier/)

### Access control used in APIs 
Maskinporten is part of a national trust-service solution Digdir which offers security of API access via machine-to-machine authentication and an OAuth2-scope based authorization mechanism.
Altinn makes it possible for businesses that have been given access to an API through Maskinporten to pass this on to, for example, a supplier who will carry out the technical implementation on their behalf.
[Read more here](https://altinn.github.io/docs/utviklingsguider/api-delegering/)

### Users og authentication
The team has responsibility of the user types that are available: persons (pnr/dnr), organizations (orgnr), business users, self-identified users, computer system (systemID)
Authentication via Portal and in API including integration with IDporten, Maskinporten and Altinn-specific authentication solutionsr

### Altinn 2 copy av ER og FREG
Altinn has an updated copy of ER and FREG which are used in various parts of Altinn.