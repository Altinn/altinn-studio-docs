---
title: Altinn 3 Broker Developer guide for Service Owner
linktitle: Service Owner
description: How to get started with Altinn 3 Broker Service Owner API operations, for developers
tags: [Broker, guide]
weight: 30
---

{{<children />}}

## Operation: Initialize Service Owner in Broker API {#operation-initialize-service-owner-in-broker-api}

**Endpoint:** POST /broker/api/v1/serviceowner

This operation configures your organization as a Service Owner in the Broker Config Store.

**Request**: An instance of [ServiceOwnerInitializeExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/ServiceOwner/ServiceOwnerInitializeExt.cs) serialized as JSON.

**Return**: HTTP 200

**Events triggered**: none.

**Example:** "Service Owner/Configure service owner for Broker" in our [Bruno collection](https://github.com/Altinn/altinn-broker/blob/main/.bruno/collection.bru).

## Operation: Get Service Owner Config from Broker API {#operation-get-service-owner-config-from-broker-api}

**Endpoint:** GET /broker/api/v1/serviceowner

This gets the configuration of your as a Service Owner in the Broker Config Store.

**Request**: (Based upon the organization specificed in the token).

**Return**: HTTP 200 An instance of [ServiceOwnerOverviewExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/ServiceOwner/ServiceOwnerOverviewExt.cs) serialized as JSON.

**Events triggered**: none.

**Example:** "Service Owner/Get service owner configuration for Broker" in our [Bruno collection](https://github.com/Altinn/altinn-broker/blob/main/.bruno/collection.bru).

## Operation: Configure resource in Broker API {#operation-configure-resource-in-broker-api}

**Endpoint:** PUT broker/api/v1/resource{resourceId}"

This operation configures your resource in Altinn Broker.

**Request**: An instance of [ResourceExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/ResourceExt.cs) serialized as JSON.

**Return**: HTTP 200

**Events triggered**: none.

**Example:** "Resource/Configure resource for Broker" in our [Bruno collection](https://github.com/Altinn/altinn-broker/blob/main/.bruno/collection.bru).

