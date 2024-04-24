---
title: Altinn 3 Broker Developer guide for Service Owner
linktitle: Service Owner
description: How to get started with Altinn 3 Broker Service Owner API operations, for developers
tags: [Broker, guide]
weight: 30
---

{{<children />}}

{{% notice warning  %}}
This section of the documentation is a work in progress, and as such currently makes extensive reference to external sources, as well as describing more scenarios.
{{% /notice %}}

## Operation: Initialize Service OWner in Broker API

**Endpoint:** POST /broker/api/v1/serviceowner

This operation configures your organization as a Service Owner in the Broker Config Store.

**Request**: An instance of [ServiceOwnerInitializeExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/ServiceOwnerInitializeExt.cs) serialized as JSON.

**Return**: HTTP 200

**Events triggered**: none.

**Example:** "Register Service Owner" in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json)

## Operation: Get Service Owner Config from Broker API

**Endpoint:** GET /broker/api/v1/serviceowner

This gets the configuration of your as a Service Owner in the Broker Config Store.

**Request**: (Based upon the organization specificed in the token).

**Return**: HTTP 200 An instance of [ServiceOwnerOverviewExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/ServiceOwnerOverviewExt.cs) serialized as JSON.

**Events triggered**: none.

**Example:** "Register Service Owner" in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json)

## Operation: Configure resource in Broker API

**Endpoint:** PUT broker/api/v1/resource{resourceId}"

This operation configures your resource in Altinn Broker.

**Request**: An instance of [ResourceExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/ResourceExt.cs) serialized as JSON.

**Return**: HTTP 200

**Events triggered**: none.

**Example:** Example "Update Resource" in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json)
