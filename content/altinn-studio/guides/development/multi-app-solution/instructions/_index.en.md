---
title: Instructions for making a multi-app solution in Altinn
linktitle: Instructions
description: Explanations of how to go about when creating a general multi-app solution
weight: 20
aliases:

- /app/multi-app-solution/instructions/

---

## Prerequisites

Before starting on the technical implementation, please make sure the
required prerequisites are met.

### Functional Prerequisites

1. The app developer must have access to create, develop and deploy applications owned by an organization.
2. An existing Altinn form (application A) where the data that is intended forwarded to application B is identified.
3. It should be clear who the instance owners are, meaning what roles and access they acquire.

### Technical Prerequisites

1. Your applications are using version 8 or newer of the Altinn nugets.
2. The organization possesses an already existing Maskinporten client with the altinn-specific
   scopes; `altinn:serviceowner/instances.read` and
   `altinn:serviceowner/instances.write`*
3. An integration between the application(s) and the clients in Maskinporten. This must be done in the application(s)
   that are going to send requests to another application, which requests needs to be authorized by the application
   owner.*

If step 2 and 3 of the technical requirements are missing see
section [Maskinporten-App Integration](../../../integration/maskinporten-app-integration)

\* _If the end user of application A have the required roles to instantiate application B on behalf of the intended
recipient, you can skip these technical requirements_

{{<children description="true"/>}}
