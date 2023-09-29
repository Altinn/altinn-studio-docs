---
title: Instructions for making a multi-app solution in Altinn
linktitle: Instructions
description: Explanations of how to go about when creating a general multi-app solution
weight: 20
aliases:

- /app/multi-app-solution/instructions/

---

## Prerequisites

Before continue reading the technical implementation details, please make sure the
required prerequisites are met.

### Functional Prerequisites

1. The app-developer must have access to create and develop applications owned by an organization.
2. Existing basic Altinn form where the content of the data model is assessed against the intended data flow between
   application A and application B.

### Technical Prerequisites

1. Already existing Maskinporten clients (test and production) for the organization.
2. An integration between the application(s) and the clients in Maskinporten. This must be done in the application(s) that are going to send requests that to another application that must be authorized by the application owner.

If the technical requirements are missing see section [Maskinporten-App Integration](../../maskinporten-app-integration)


### Why Maskinporten-App Integration?

By nature, the request will have credentials from the private user who
logged in to the application A form, thus is not allowed to start
a new instance on behalf of the organisation that owns application B.
As a way to bypass this obstacle, we
can use a Maskinporten integration to authenticate the
request on behalf of the organisation owning
application B.

{{<children description="true"/>}}
