---
draft: true
title: Develop a multi-app solution in Altinn
linktitle: Instructions
description: How to proceed to create a multi-app solution
weight: 20
tags: [needsReview]
aliases:

- /app/multi-app-solution/instructions/app-b

---

## Before you start

Consider the following before starting the technical implementation.

### Functional requirements

- You must have access to create, develop and deploy apps owned by an organisation.
- You must have an existing Altinn form (app A) where you have identified the data to be forwarded to app B.
- You must know who the instance owners are, meaning which roles and access they have.

### Technical requirements

- Your apps must use version 8 or newer of the Altinn NuGet packages.
- The app that sends requests to another app must have the required Maskinporten scopes added in Altinn Studio:
   `altinn:serviceowner/instances.read` and
   `altinn:serviceowner/instances.write`.*
- The app must use the built-in Maskinporten client when the app owner must authorise the requests.*

If steps 2 and 3 are missing, see
[Maskinporten-App Integration](/en/altinn-studio/v10/develop-a-service/integration/maskinporten/)

\* _If the end user of app A has the necessary roles to create app B on behalf of the intended
recipient, you can skip these technical requirements._

{{<children description="true"/>}}
