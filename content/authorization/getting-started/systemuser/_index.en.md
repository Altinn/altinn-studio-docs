---
title: System User
description: To start using system users you must complete a few administrative steps and adapt your own solution.
tags: [platform, authentication]
toc: false
aliases:
  - /authentication/systemauthentication/
---

Below is a high-level checklist of the steps a service owner and an end-user system vendor must complete to start using system users.

## Service owner

{{< stepcard step="1" title="1 Create service" >}}
The service owner develops and documents the service that will use Altinn Authorization for access control
{{< /stepcard >}}

{{< stepcard step="2" title="2 Choose authentication" >}}
[Maskinporten](https://samarbeid.digdir.no/maskinporten/dette-er-maskinporten/96) is one of the foundational components that system users build on. It guarantees authenticity and lets the service owner perform coarse-grained access management through scopes. The Maskinporten token is also the carrier of system-user information, which enables the service owner to enforce access control through Altinn Authorization.

The service therefore has to support Maskinporten, and at least one scope must be configured on the service.

Follow the steps in the [Samarbeidsportalen guide](https://samarbeid.digdir.no/maskinporten/tilbydar/141) to enable Maskinporten for your service.

> The Maskinporten token that contains system-user information does not reveal which end user performed an operation. When you need insight into the person performing an action, the service must also support ID-porten authentication.
> {{< /stepcard >}}

{{< stepcard step="3" title="3 Register resource" >}}
The Resource Registry stores the description of the authorisation resource and its access rules. Make sure the consumers of your service know which access packages (and any individual rights) they must request in order to access the service. See the [resource creation guide](/en/authorization/guides/resource-owner/create-resource-resource-admin/) for detailed instructions.
{{< /stepcard >}}

{{< stepcard step="4" title="4 Integrate with Altinn Authorization" >}}
For services that run outside Altinn you must call Altinn Authorization for access decisions. See [the resource owner guides](../../guides/resource-owner/) for implementation details.
{{< /stepcard >}}

## System vendor

{{< stepcard step="1" title="Maskinporten onboarding" >}}
System users build on Maskinporten, which lets the service owner secure authentication and manage access to the service through scopes. The Maskinporten token also carries the system-user information used when Altinn Authorization evaluates access.

You need a Norwegian organisation number to get access to Maskinporten. See [Maskinporten](https://www.digdir.no/felleslosninger/maskinporten/869) for details.

By signing the [terms of use for Maskinporten and ID-porten](https://samarbeid.digdir.no/maskinporten/bruksvilkar-private-virksomheter/73#21_generelt) you receive access to both the test and production environments.

1. Connect to Maskinporten – follow the steps in [Get started with Maskinporten](https://samarbeid.digdir.no/maskinporten/ta-i-bruk-maskinporten/97).
2. Create a Maskinporten client. You can do this in Samarbeidsportalen or via the API. Creating a client requires that the Maskinporten connection is in place. See the [Maskinporten client guide](https://docs.altinn.studio/nb/correspondence/getting-started/developer-guides/maskinporten/).
   {{< /stepcard >}}

{{< stepcard step="2" title="Gain access to the System User APIs" >}}
By signing the [terms of use for Altinn](https://samarbeid.digdir.no/altinn/bruksvilkar-sluttbrukersystemleverandorer-i-altinn/3002) you gain access to both the test and production environments.

Fill in the [registration form for end-user system vendors](https://forms.office.com/Pages/ResponsePage.aspx?id=D1aOAK8I7EygVrNUR1A5kcdP2Xp78HZOttvolvmHfSJUOFFBMThaOTI1UlVEVU9VM0FaTVZLMzg0Vi4u) and tick off for system user to receive the required scopes:

- altinn:authentication/systemuser.request.read
- altinn:authentication/systemuser.request.write
- altinn:authentication/systemregister.write

If the enduser system will use client delegations API

- altinn:clientdelegations.read
- altinn:clientdelegations.write

{{< /stepcard >}}

{{< stepcard step="3" title="Register the system in the System Registry" >}}
To consume services through your end-user system, the system must be registered in the Altinn System Registry.

Registration is done via the [API](https://docs.altinn.studio/nb/api/authentication/systemuserapi/systemregister/create/). The system must be linked to the Maskinporten client created in step 3.

Which access packages and/or individual services you need depends on the service you plan to consume – see the service documentation for details.

> The current Altinn roles will be replaced by access packages. See [access packages](/en/authorization/what-do-you-get/accessgroups/) for more information.
> {{< /stepcard >}}

{{< stepcard step="4" title="Request access to the service owner's APIs" >}}
Each service owner decides which scopes are used for access control to their APIs. These scopes are different from the scopes that enable system user functionality and must be granted by the relevant service owner. Check the service documentation or contact the owner to learn which scopes to request.
{{< /stepcard >}}

{{< stepcard step="5" title="Adapt the system for your customers" >}}
This step often takes some time because it involves your users. We recommend allocating sufficient time and involving users early.

A system user is defined by the access packages the end-user system vendor selects. The possible access packages are those that were configured when the system was registered in the System Registry. To know which access packages a system user requires, you have to map the tasks your users perform and the services they need.

See the [system user guides](./../../guides/system-vendor/system-user/) for detailed scenarios.
{{< /stepcard >}}

{{< stepcard step="6" title="Connect to and use the service owner's APIs" >}}
{{< /stepcard >}}
