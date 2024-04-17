---
title: Get Started with Altinn Broker
linktitle: Get Started
description: How to get started with Altinn 3 Broker, for service owners, senders and recipients
tags: [Broker, guide]
toc: true
weight: 10
---

{{<children />}}


{{% notice warning  %}}
This section of the documentation is a work in progress. 
There are sections with missing or only partial documentation.
{{% /notice %}}

## Common Steps to get started

These are common steps that all roles (Service Owner, Senders and Recipients) need to complete in order to start using the Altinn Broker component.

### 1. Get an Altinn Broker API Key

In order to use any Altinn APIs, you need a subscription key for the APIs. This is passed as the header "Ocp-Apim-Subscription-Key" in every request.
If you do not alredy possess one, you can get it by contacting us at [Altinn@Slack#produkt-formidling](https://join.slack.com/t/altinn/shared_invite/zt-7c77c9si-ZnMFwGNtab1aFdC6H_vwog).

TODO: Er denne Altinn generisk, eller Broker Spesifikk?

### 2. Register your Maskinporten Client with correct scopes

Register your Maskinporten clients to authenticate with the Broker API, assigning them relevant scopes:

- `altinn:authorization:pdp` - Required for all broker API clients for authorization access.
- `altinn:broker.write` - For clients sending files.
- `altinn:broker.read` - For clients receiving files.

Use [Samarbeidsportalen self-service](https://sjolvbetjening.test.samarbeid.digdir.no/) for registration. [Here's a detailed guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#selvbetjening-som-api-konsument).

### 3. Get access to specific resource

Contact the Service owner for the Broker Resource and ask for access to the Resource. - If you are a service owner creating your first Broker; skip to the Service Owner guide.

### 4. Integrate against Broker API

You are now ready to start integrating against the Broker APIs, see the [developer guides](../developer-guides/) for next steps.

## Service Owner specific steps

In order to use events/webhooks for a broker resource, you need to setup a subscription for the given resource. This subscription is used to configure the endpoint where the events published by broker end up. You can read more about how to setup an Events subscription in Altinn Events here.

## Service Owner's User Guide

{{% notice warning  %}}
This process will be simplyfied through a future update in Altinn Studio.

Especially so that Steps 4 and 5 are performed in GUI instead of requiring direct API Calls.
{{% /notice %}}

### 1. Get started as service owner in Altinn

To get started with Altinn Broker, your enterprise must be registered as a service owner in Altinn. For a step-by-step guide , see the
[Get started with Altinn guide (Norwegian language only)](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/).

This step is only necessary for new enterprises that have not yet established themselves as service owners on the Altinn platform. As an existing service owner, you can proceed directly with the next steps to start using Altinn Broker.

### 2. Perform common steps for API Key and Maskinporten Client

Perform steps 1,2 and 4 under common steps mentioned above.

### 3. Register a Resource in Altinn Resource Registry

All files sent using Broker is associated with a resource/service/"tjenesteressurs". These are registered in Altinn Studio, and are used for access rules and access lists.
Your access rules must be configured in such a way that that they permit the actions "publish" (for all), "read" (for recipients) and "write" (for senders).

### 4. Register yourself as a Service owner in Broker API

Now the time has come to configure the Broker component itself, first by configuring your organization as a Service Owner in the Broker Config Store.

POST /broker/api/v1/serviceowner

Example "Register Service Owner" in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json)

### 5. Configure your existing Resource in Broker

Now to configure the specific Broker configuration for the Resource.

Using the ID of the resource you created in step 3;

PUT /broker/api/v1/resource/{{resource_id}}

Example "Update Resource" in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json)

### 6. Grant access to the Resource for senders and receivers

Now that the configuration is set up in Altinn Broker, you can grant send and receive access to the enterprises that will use the service in Altinn Studio: <ADD LINK!!>

### How to migrate from  Altinn 2 to Altinn 3

TBD.