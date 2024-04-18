---
title: Get Started with Altinn Broker as a Service Owner
linktitle: Service Owner
description: How to get started with Altinn 3 Broker, for service owners
tags: [Broker, guide]
toc: true
weight: 20
---

{{<children />}}

## Service Owner's User Guide

{{% notice warning  %}}
This process will be simplified through a future update in Altinn Studio.

Particularly Steps 4 and 5 will be performed through GUI instead of requiring direct API Calls.
{{% /notice %}}

### 1. Get started as service owner in Altinn

To get started with Altinn Broker, your enterprise must be registered as a service owner in Altinn. For a step-by-step guide , see the
[Get started with Altinn guide (Norwegian language only)](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/).

This step is only necessary for new enterprises that have not yet established themselves as service owners on the Altinn platform. As an existing service owner, you can proceed directly with the next steps to start using Altinn Broker.

### 2. Perform common steps for API Key and Maskinporten Client

Perform steps [1](#1-get-an-altinn-broker-api-key) and [2](#2-register-your-maskinporten-client-with-correct-scopes) under common steps mentioned above.

### 3. Register a Resource in Altinn Resource Registry

All files sent using Broker is associated with a resource/service/"tjenesteressurs". These are registered in Altinn Studio, and are used for access rules and access lists.
Your access rules must be configured in such a way that that they permit the actions:

- "publish" and "subscribe" for all, - this is used for Events.
- "read" for recipients
- "write" for senders.

To setup a resource that works quickly, you can use our [Postman collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json) and run the requests "Create resource" and "Create resource policy" with a token that has the scope "altinn:resourceregistry/resource.write".

See an [example policy](https://github.com/Altinn/altinn-broker/blob/main/Test/Altinn.Broker.Tests/Data/BasePolicy.xml) in .xml format in our repo. Note that this policy will authorize neither on access lists nor on system user, and is essentially open for use by anyone with access to the Broker API in general.

**TIP**: Verify your configurations using the [Postman collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json), substituting the test tokens with your own Altinn tokens (See "Login to Maskinporten (Initialize)" request in Authenticator folder).

### 4. Register yourself as a Service owner in Broker API

Now the time has come to configure the Broker component itself, first by configuring your organization as a Service Owner in the Broker Config Store.

POST /broker/api/v1/serviceowner

Example "Register Service Owner" in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json)

### 5. Configure your existing Resource in Broker

Now to configure the specific Broker configuration for the Resource.

Using the ID of the resource you created in step 3;

PUT /broker/api/v1/resource/{{resource_id}}

Example "Update Resource" in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json)

### How to migrate from  Altinn 2 to Altinn 3

TBD.
