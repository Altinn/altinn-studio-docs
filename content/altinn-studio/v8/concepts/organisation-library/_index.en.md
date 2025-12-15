---
title: Library elements
description: What are Altinn 3 library elements?
weight: 10
---

## The general concept

A library element is an element which is published using the Altinn Studio Designer organisation library for the purpose of being used in multiple Altinn applications.
The elements are saved to the organisation library repository and published to the service owner space in the Altinn Studio Designer organisation library.

Library elements use sequential versioning in addition to a "latest" version.
This is to support two use cases:

* Pinning a version - to make sure that the application will not change when a new version is published.
* Using the latest version. By using the "latest" version, the application runtime will automatically fetch the updated element without the application having to be redeployed.

### When should you use a library element?

If you want to reuse an element between multiple applications, then library elements is the preferred solution.

If you want to manage an element's versioning independent of an application itself and prefer to publish a new version over redeploying the application, then using the organisation library
with the "latest" version in the application might be something to consider.

See the subpages for elements which are currently supported in the Altinn Studio Designer organisation library.

{{<children />}}
