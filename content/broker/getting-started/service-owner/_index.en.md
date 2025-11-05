---
title: Get Started with Altinn Broker as a Service Owner
linktitle: Service Owner
description: How to get started with Altinn 3 Broker, for service owners
tags: [Broker, guide]
toc: true
weight: 10
---

{{<children />}}

{{% notice warning  %}}
This process will be simplified through a future update in Altinn Studio.

Particularly Steps 4-6 will be performed through GUI instead of requiring direct API Calls.
{{% /notice %}}

## 1. Get started as service owner in Altinn {#get-started-as-service-owner-in-altinn}

To get started with Altinn Broker, your enterprise must be registered as a service owner in Altinn. For a step-by-step guide , see the
[Get started with Altinn guide (Norwegian language only)](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/).

This step is only necessary for new enterprises that have not yet established themselves as service owners on the Altinn platform. As an existing service owner, you can proceed directly with the next steps to start using Altinn Broker.

## 2. Perform common steps for API Key and Maskinporten Client {#perform-common-steps-for-api-key-and-maskinporten-client}

Perform steps 1 and 2 of the [Common Get started steps](/en/broker/getting-started/common-steps/) if you have not already done so.

## 3. Register a Resource in Altinn Resource Registry {#register-a-resource-in-altinn-resource-registry}

All files sent using Broker is associated with a resource/service/"tjenesteressurs". See [Resource Registry](/en/authorization/what-do-you-get/resourceregistry/).
Resources can be registered through Altinn Studio, and are used for access rules and access lists.
Your policy must be configured in such a way that that they permit the actions:

- "subscribe" for all, - this is used for Events.
- "read" for recipients
- "write" for senders.

## 4. Register yourself as a Service Owner in Broker API {#register-yourself-as-a-service-owner-in-broker-api}

Now the time has come to configure the Broker component itself, first by configuring your organization as a Service Owner in the Broker Config Store.

Call the API operation [initialize service owner in broker api](/en/broker/getting-started/developer-guides/service-owner/#operation-initialize-service-owner-in-broker-api).

## 5. Configure your existing Resource in Broker {#configure-your-existing-resource-in-broker}

Now to configure the specific Broker configuration for the Resource.

Using the ID of the resource you created in step 3, call the API operation to [configure resource](/en/broker/getting-started/developer-guides/service-owner/#operation-configure-resource-in-broker-api).

## 6. Configure system

Systemuser is the typical authentication method used with the Broker service. [Consult the systemuser documentation for how to set this up](/en/authorization/guides/system-vendor/system-user/). You can follow the steps in the [Bruno collection](https://github.com/Altinn/altinn-broker/blob/main/.bruno/collection.bru) to set up and configure a system in the System Register.

## How to migrate from Altinn 2 to Altinn 3 {#how-to-migrate-from-Altinn-2-to-Altinn-3}

If you have an existing solution in Altinn 2 you wish to migrate, you can either create a new independent Altinn Broker service in Altinn 3, or use the transition solution, [described here](/en/broker/broker-transition/).
