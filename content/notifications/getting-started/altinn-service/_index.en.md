---
title: Altinn Service Integration
description: How to get started sending notifications from an Altinn Service
weight: 10
---

## 1. Register your Maskinporten Client with correct scopes

To use the Altinn Notifications API, you must have a Maskinporten client with the correct scope.

The scope **altinn:serviceowner/notifications.create** is required for clients to access the Notifications API.

All registered service owners have been delegated this scope by Digdir and should be able to find it in their list of scopes in Samarbeidsportalen.

For a guide on how to register a new Maskinporten integration in Samarbeidsportalen, please see [Altinn Authorization](/en/authorization/getting-started/maskinportenclient/)

## 2. Integrate against Notifications API

{{% insert "content/notifications/shared/getting-started/integrate-with-api/get-started-integrate-with-api.en.md" %}}

