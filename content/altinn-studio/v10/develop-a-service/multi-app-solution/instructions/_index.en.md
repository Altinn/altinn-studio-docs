---
title: Develop a Multi-app Solution in Altinn
linktitle: Instructions
description: How you proceed to create a multi-app solution
weight: 20
tags: [needsReview]
aliases:

- /app/multi-app-solution/instructions/

---

## Before You Start

This is what you need to consider before you start the technical implementation.

### Functional Requirements

1. You must have access to create, develop and deploy applications owned by an organisation.
2. You must have an existing Altinn form (application A) where you have identified the data to be forwarded to application B.
3. You must know who the instance owners are, meaning which roles and access they have.

### Technical Requirements

1. Your applications must use version 8 or newer of the Altinn NuGet packages.
2. The organisation must have an existing Maskinporten client with the correct Altinn-specific
   scopes: `altinn:serviceowner/instances.read` and
   `altinn:serviceowner/instances.write`*
3. You must have an integration between the application and the clients in Maskinporten. You must do this in the applications
   that will send requests to another application, where the application owner must authorise the requests.*

If steps 2 and 3 are missing, see
the section [Maskinporten-App Integration](/en/altinn-studio/v8/guides/integration/maskinporten/)

\* _If the end-user of application A has the necessary roles to create application B on behalf of the intended
recipient, you can skip these technical requirements._

{{<children description="true"/>}}
