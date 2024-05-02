---
title: Get Started with Altinn Broker as a Service Owner
linktitle: Service Owner
description: How to get started with Altinn 3 Broker, for service owners
tags: [Broker, guide]
toc: true
weight: 20
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

Perform steps 1 and 2 of the [Common Get started steps](../common-steps) if you have not already done so.

## 3. Register a Resource in Altinn Resource Registry {#register-a-resource-in-altinn-resource-registry}

All files sent using Broker is associated with a resource/service/"tjenesteressurs". See [Resource Registry](../../../../authorization/modules/resourceregistry/).
Resources can be registered through Altinn Studio, and are used for access rules and access lists.
Your policy must be configured in such a way that that they permit the actions:

- "subscribe" for all, - this is used for Events.
- "read" for recipients
- "write" for senders.

To setup a resource that works quickly, you can use our [Postman collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json) and run the requests "Create resource" and "Create resource policy" with a token that has the scope "altinn:resourceregistry/resource.write".

Here is an [example policy](ExamplePolicy.xml).

Note that this example policy sets a required user role "DAGL" for the user that has access to the resource, and requires the use of [Resource Rights Registry](../../../../authorization/modules/resourceregistry/rrr/) to grant access to specific organisations.
A user with that access can then delegate the access to the enterprise user / system user

**TIP**: Verify your configurations using the [Postman collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json), substituting the test tokens with your own Altinn tokens (See "Login to Maskinporten (Initialize)" request in Authenticator folder).

## 4. Register yourself as a Service Owner in Broker API {#register-yourself-as-a-service-owner-in-broker-api}

Now the time has come to configure the Broker component itself, first by configuring your organization as a Service Owner in the Broker Config Store.

Call the API operation [initialize service owner in broker api](../../developer-guides/service-owner/#operation-initialize-service-owner-in-broker-api).

## 5. Configure your existing Resource in Broker {#configure-your-existing-resource-in-broker}

Now to configure the specific Broker configuration for the Resource.

Using the ID of the resource you created in step 3, call the API operation to [configure resource](../../developer-guides/service-owner/#operation-initialize-service-owner-in-broker-api).

## 6. Grant access to Senders and Recipients to the Resource {#grant-access-to-senders-and-recipients-to-the-resource}

Currently this has to be done manually by updating the policy defined in step 3, but will in the future be done using GUI.

TODO: Document how to grant this in [Resource Rights Registry](../../../../authorization/modules/resourceregistry/rrr/)?

## How to migrate from Altinn 2 to Altinn 3 {#how-to-migrate-from-Altinn-2-to-Altinn-3}

If you have an existing solution in Altinn 2 you wish to migrate, you can either create a new independent Altinn Broker service in Altinn 3, or use the transition solution, described here.

TODO: Link to transition solution documentation when available.
