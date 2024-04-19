---
title: Common steps to get Started with Altinn Broker
linktitle: Common Steps
description: How to get started with Altinn 3 Broker, for service owners, senders and recipients
tags: [Broker, guide]
toc: true
weight: 10
---

{{<children />}}

{{% notice warning  %}}
This section of the documentation is a work in progress.
There are sections with missing or only partial documentation.
Some functionality does not represent the final production version.
{{% /notice %}}

These are common steps that all roles (Service Owner, Senders and Recipients) need to complete in order to start using the Altinn Broker component.

## 1. Get an Altinn API Key

In order to use any Altinn APIs, you need a subscription key for the APIs. This is passed as the header `Ocp-Apim-Subscription-Key` in every request.

If you do not already possess an API Key for the Maskinporten Client(s) you intend to use against Broker, you can get it by contacting us at [Altinn@Slack#produkt-formidling](https://join.slack.com/t/altinn/shared_invite/zt-7c77c9si-ZnMFwGNtab1aFdC6H_vwog).

## 2. Register your Maskinporten Client with correct scopes

Register your Maskinporten client(s) to authenticate with the Broker API, assigning them relevant scopes:

- `altinn:authorization:pdp` - Required for all broker API clients for authorization access.
- `altinn:broker.write` - For clients sending files.
- `altinn:broker.read` - For clients receiving files.

These scopes are maintained by Altinn and are required to be authorized for the appropriate API operations, and as such are independent of the [access set by Service Owners](../service-owner/_index.en.md#6-grant-access-to-senders-and-recipients-to-the-resource) for the specific Broker Service Resource.

Use Samarbeidsportalen self-service for registration. [Here's a detailed guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#selvbetjening-som-api-konsument).

- [Test environments](https://sjolvbetjening.test.samarbeid.digdir.no/)
- [Production environment](https://sjolvbetjening.samarbeid.digdir.no/)

## 3. Get access to specific resource

Contact the Service owner for the Broker Resource and ask for access to the Resource, supplying them with:

- Organization number you will represent
- System user

{{% notice warning  %}}
This will in the future be handled by System User / Resource Registry /Access Lists through GUI.
{{% /notice %}}

**If you are a service owner creating your first Broker Service; skip to the [Service Owner](../service-owner/) guide.**

## 4. Integrate against Broker API

You are now ready to start integrating against the Broker APIs, see the [developer guides](../../developer-guides/) for next steps.

## 5. Set up Event Subscriptions

{{% notice warning  %}}
Currently the Events for Broker are not ready for full-scale use.
{{% /notice %}}

In order to use events/webhooks for a Broker resource, you need to setup a subscription for the given resource.
This subscription is used to configure the endpoint where the events published by broker end up. [You can read more about how to setup an Events subscription in Altinn Events here](/events/subscribe-to-events/developer-guides/setup-subscription/).

You will need to set up filters on at least:

- sourceFilter
  - TT02: <https://platform.tt02.altinn.no/broker/api/v1/file>
  - PROD: <https://platform.altinn.no/broker/api/v1/file>
- resourceFilter
  - "urn:altinn:resource:" + The Resource Id for the Broker Resource

In addition we recommend you use filters for Type, so that you only receive the event types you wish, if you do not specify a Type Filter you will receive all the different types of events if you have access to them.

**For Senders:**

- `no.altinn.broker.filetransferinitialized`
- `no.altinn.broker.uploadprocessing`
- `no.altinn.broker.downloadconfirmed`
- `no.altinn.broker.allconfirmeddownloaded`

**For both Senders And Recipients:**

- `no.altinn.broker.Published`

For further description of events and their use see the [developer guides](../../developer-guides/).
