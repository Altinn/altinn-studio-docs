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

## 1. Get an Altinn API Key {#get-an-altinn-api-key}

In order to use any Altinn APIs, you need a subscription key for the APIs. This is passed as the header `Ocp-Apim-Subscription-Key` in every request.

If you do not already possess an API Key for the Maskinporten Client(s) you intend to use against Broker, you can get it by contacting us at [Altinn@Slack#produkt-formidling](https://join.slack.com/t/altinn/shared_invite/zt-7c77c9si-ZnMFwGNtab1aFdC6H_vwog).

## 2. Register your Maskinporten Client with correct scopes {#register-your-maskinporten-client-with-correct-scopes}

Register your Maskinporten client(s) to authenticate with the Broker API, assigning them relevant scopes:

- `altinn:broker.write` - For clients sending files.
- `altinn:broker.read` - For clients receiving files.

These scopes are maintained by Altinn and are required to be authorized for the appropriate API operations, and as such are independent of the [access set by Service Owners](../service-owner#grant-access-to-senders-and-recipients-to-the-resource) for the specific Broker Service Resource.

Use Samarbeidsportalen self-service for registration. [Here's a detailed guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#selvbetjening-som-api-konsument).

- [Test environments](https://sjolvbetjening.test.samarbeid.digdir.no/)
- [Production environment](https://sjolvbetjening.samarbeid.digdir.no/)

## 3. Get access to specific resource {#get-access-to-specific-resource}

Contact the Service owner for the Broker Resource and ask for access to the Resource, supplying them with:

- Organization number you will represent
- System user

{{% notice warning  %}}
This will in the future be handled by System User / Resource Registry /Access Lists through GUI.
{{% /notice %}}

**If you are a service owner creating your first Broker Service; skip to the [Service Owner](../service-owner/) guide.**

## 4. Integrate against Broker API {#integrate-against-broker-api}

You are now ready to start integrating against the Broker APIs, 
see the [developer guides](../developer-guides/) for next steps.

## 5. Set up Event Subscriptions {#set-up-event-subscriptions}

In order to use events/webhooks for a Broker resource, you need to setup a subscription for the given resource.

See the [developer guide](../developer-guides/events) for detailed instruction.
