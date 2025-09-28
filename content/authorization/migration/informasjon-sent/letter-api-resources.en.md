---
title: Information letter sent to service owners regarding API resources
linktitle: API resources info letter
description: Here you find the letter sent to all service owners regarding migration of Delegatable API resources
tags: [migration, plan, authorization]
weight: 10
---
The following letter has been sent to service owners who have the service type "Delegatable API resources". These are:
- The Norwegian Tax Administration
- The Norwegian Public Roads Administration
- The Norwegian Food Safety Authority
- The Norwegian State Educational Loan Fund
- Norwegian Helsenett
- NAV (Norwegian Labour and Welfare Administration)
- The Norwegian Digitalisation Agency

## Important information to service owners of «Delegatable API resources» in Altinn
As we have previously informed you, we are now in the process of decomposing and migrating Altinn Authorization from the Altinn 2 platform to Altinn 3 format. See here for information about the progress plan.

We are starting by moving functionality and services of the type «Delegatable API resources» and according to the plan this will happen at the end of January/beginning of February. See here for detailed information about moving services.

All services of the type "Delegatable API resources" will be moved from Altinn 2 to Altinn 3 in one operation. There are currently about 82 services of this type. This will result in a short downtime for these services. Downtime will be announced in advance.

Digdir will take responsibility for actually moving the services from Altinn 2 to Altinn 3. All delegations that have been made on the services will be preserved and moved together with the service. This means that all system suppliers who today have the right to use your APIs on behalf of their customers will retain these delegations even after the services have been moved.

### What service owners must do before services are migrated
Attached you will find a list of all Delegatable API resources that your agency is the service owner for and that currently exist in production in Altinn. We ask that you go through the list of these and check the following:
1. Is the service still in use and should it be moved from Altinn 2 to Altinn 3?
2. Is the title of the service of good and user-friendly quality so that it is easy for users to find the service?
    a. Title must be provided in all three languages (en, nb, nn) and is separated by commas in the file.
3. Is the delegation description of good and user-friendly quality that explains to users what services and information they are giving the system supplier access to?
    a. Delegation description must be provided in all three languages (en, nb, nn) and is separated by commas in the file.

*We ask that you give us written feedback on this by January 15. Services we do not receive feedback on will not be migrated and will thus be taken out of production and will no longer function.*

### Consequences for you as service owner after migration
Today, new services of the type «Delegatable API resources» are created via a REST interface «/maskinporten-api/delegationSchemes» in Altinn 2. After the services have been moved, this API will no longer be available.

We will create new APIs to register services of the type "Delegatable API resources", but in a transition phase, those who want to create new services must do this by sending an email to Digdir so that we can do it for you.

If you have questions, you can reach us via digdir-samarbeid.slack.com or by sending an email to tjenesteeier@altinn.no.