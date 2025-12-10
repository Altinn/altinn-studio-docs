---
title: Shared Resources
description: What are Altinn 3 shared resources?
weight: 10
---

## The general concept

A shared resource is a resource which is published using the Altinn Studio Designer organisation library for the purpose of being used in multiple Altinn applications.
The resources are saved to the organisation library repository and published to the service owner space in the Altinn Shared Resources Store.

Shared resources use sequential versioning in addition to a "latest" version.
This is to support two use cases:

* Pinning a version - to make sure that the application will not change if a new version is published.
* Using the latest version. By using the "latest" version, the application runtime will automatically fetch the updated resource without the application having to be redeployed.

### When should you use a shared resource?

If you want to reuse a resource between multiple applications, then shared resources is the preferred solution.

If you want to manage a resource's versioning independent of an application itself and prefer to publish a new version over redeploying the application, the using the shared resource concept
with the "latest" version in the application might be something to consider.

See the subpages for resources which are currently supported in the Altinn Studio Designer organisation library.

{{<children />}}
