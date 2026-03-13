---
title: Guardianship
linktitle: Guardianship
description: Altinn Authorisation makes it easy for service owners to add support for guardianship in their services.
---

People who cannot look after their own interests due to injury, illness or disability can receive help from a guardian.
Such an arrangement is voluntary and tailored to the wishes and needs of the person under guardianship.
The County Governor appoints and supervises guardians, and the Civil Affairs Authority (Sivilrettsforvaltningen) is the central guardianship authority.

{{% notice warning %}}
This functionality is not yet available in TEST or PROD, but is planned for launch in early March.
To be prepared, you can start by identifying the relevant guardianship types and integrating with the party selector and authorisation lookup.
{{% /notice %}}

## How guardianship works in Altinn

Altinn Authorisation enables service owners to easily add support for guardianship in services that use Altinn Authorisation:

![High-level architecture for guardianship in Altinn](./GuardianshipOverview.png "High-level architecture for guardianship in Altinn")

- Credentials defined by the Civil Affairs Authority are retrieved from the National Population Register and mapped directly to access packages in Altinn Authorisation.
- The service owner creates access rules linked to the access packages for their service.
- The service owner adds a party selector to their service.
- The service owner performs authorisation lookups (PDP) from the service.
- The National Population Register is the authoritative source — it is not possible to grant or revoke guardianship powers in Altinn.
- If there is a need to grant private powers of attorney, separate access packages for private individuals are available.

## What it looks like for end users

In the access management interface, the ward can see their guardians, and guardians can see the people they are guardians for.
If a ward has multiple guardians, all are displayed, but the specific areas each guardian is responsible for are not shown.

## How to add support for guardianship

1. Create an authorisation resource.
2. Set access rules for guardianship.
3. Add support for party selection and authorisation lookup.

Once this is in place, the guardian can log in, choose to represent the ward and perform actions in the service.

See the [step-by-step guide for adding guardianship support](/en/authorization/getting-started/guardianship/).

## Read more

- Read more about guardianship at the [Civil Affairs Authority](https://www.vergemal.no).
- The County Governor is the local guardianship authority and makes decisions on the establishment, amendment and termination of guardianships.
  Decisions and information are reported to the National Population Register for registration, whilst the Civil Affairs Authority is the superior professional and appeals body.
