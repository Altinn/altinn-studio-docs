---
title: Service Owner System Integration
description: How to get started sending notifications from a Service Owner System
weight: 10
---

## 1. Get started as service owner in Altinn {#get-started-as-service-owner-in-altinn}

To get started with Altinn Notifications, your enterprise must be registered as a service owner in Altinn.
For a step-by-step guide, see the [Get started with Altinn guide (Norwegian language only)](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/).

This step is only necessary for new enterprises that have not yet established themselves as service owners on the Altinn platform.
If you are already an established service owner, you can proceed directly with the next steps to start using Altinn Notifications.

## 2. Register your Maskinporten Client with correct scopes

To use the Altinn Notifications API, you must have a Maskinporten client with the correct scope.

The scope **altinn:serviceowner/notifications.create** is required for clients to access the Notifications API.

All registered service owners have been delegated this scope by Digdir and should be able to find it in their list of scopes in Samarbeidsportalen.

For a guide on how to register a new Maskinporten integration in Samarbeidsportalen, please see [Altinn Authorization](/en/authorization/getting-started/maskinportenclient/)

## 3. Review policy for relevant resources in Altinn Resource Registry

{{% insert "content/notifications/shared/getting-started/resource/get-started-resource.en.md" %}}

## 4. Familiarize yourself with the guidelines and best practices for sending notifications

{{% insert "content/notifications/shared/getting-started/guidelines/guidelines.en.md" %}}

## 5. Integrate against the Notifications API

{{% insert "content/notifications/shared/getting-started/integrate-with-api/get-started-integrate-with-api.en.md" %}}
