---
title: Test service
description: Information about testing a service
tags: ["guide"]
weight: 100
---

A service can be tested in Altinn Studio without migrating to a test environment. This is a way to check that the service looks and behaves as expected. 

## Testing a service in Altinn Studio
Testing is available once a data model has been uploaded to the service. 

1. Select _Test -> Manuell_ in the top navigation menu. 
2. Select a test user from the list of available users.
3. Choose to start a new instance, or to reuse an existing instance (if any are available)
  * By using an existing instance, data used in a previous instance can be re-used.

{{<figure src="runtime-test.gif?width=1000" title="Test utgave i Runtime">}}

The following can be tested in Altinn Studio:

- Layout/look of service
- Client-side validations on data model
- Dynamics (f.ex. hide/show)
- Client-side API calls
- Loading of code lists

The following needs to be tested in a complete test environment:

- Server-side logic (validation/calculation)
- Server-side API calls

{{%notice info%}}
Complete test environments are currently not available. The documentation will be updated when it is possible to test a service in a test environment.
{{% /notice%}}


