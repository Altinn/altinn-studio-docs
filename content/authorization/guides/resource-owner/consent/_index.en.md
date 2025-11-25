---
title: Consent for Service Owners
linktitle: Consent
description: Overview and introduction to the Altinn Consent guides for service owners.
toc: false
---

Altinn Consent lets a service owner request explicit permission before data is shared or processes are started.  
As a service owner you need to both set up the consent resource in Altinn and ensure your service can read and verify the consent issued via Maskinporten.

This page gives you a high-level introduction to the guides in this section and helps you pick the right path.

## Guides in this section

### Create and configure a consent resource
- **Who:** Resource administrators and service owners who describe the data covered by the consent.
- **What:** Explains how to name the resource, choose a consent template, configure metadata, access rules, and delegation.
- **Link:** [Open the guide for creating a consent resource](./create-resource/).

### Validate consent inside your service
- **Who:** Developers and integration teams that consume the Maskinporten token in their own solution.
- **What:** Covers how to interpret `authorization_details` and `consentRights`, and how to verify that the token includes the rights your service requires.
- **Link:** [Open the guide for validating consent](./validate-concent/).

## Before you start

You must have resource administration access for your organization in Altinn Studio. If you do not, follow the steps in the [Getting Started guide](../../../getting-started/resource-admin-studio).

### Recommended order of work

1. Read the guide on [creating the consent resource](./create-resource/) and configure the resource in the TT02 test environment.
2. Implement and [validate the consent inside your service](./validate-concent/) before moving to production.
3. Run an end-to-end test with both the resource administrator and the service integration to confirm the consent covers the right dataset and that the token is interpreted correctly.

Once both guides are completed, you are ready to publish the consent resource and start receiving consent requests from end users.
