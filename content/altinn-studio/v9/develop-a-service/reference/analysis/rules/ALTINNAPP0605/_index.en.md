---
draft: true
title: "ALTINNAPP0605: DataCreation with an Instance is never called"
description: "A class that implements IInstantiationProcessor has DataCreation with an Instance, which the app never calls"
weight: 65
---

This diagnostic is reported when a class that implements `IInstantiationProcessor`, or a base class
of one, has the method
`DataCreation(Instance instance, object data, Dictionary<string, string>? prefill)` and nothing in
the app calls it. The message names the class that declares the method.

This version of the app backend calls only
`DataCreation(IInstanceDataMutator instanceDataMutator, object data, Dictionary<string, string>? prefill)`.
The code in the old method therefore never runs, even though the app builds. If the class has only
the old method, the app does not build at all, and the compiler reports CS0535 instead.

Category `Deprecation`, severity **error**. The rule therefore fails the build.

Move the code into the method that takes an `IInstanceDataMutator`, and use
`instanceDataMutator.Instance` where you used `instance`. Then delete the old method. If the code
adds or changes data elements, do it through `instanceDataMutator` instead of `IDataClient`.
If the class has both methods, `studioctl app upgrade v9` deletes the old one but does not move its
code. If the code in the old method should run, move it yourself before you upgrade.

The rule does not report the old method when the app calls it itself, such as from the new method.

See the [guide to upgrading from v8 to v9](/nb/altinn-studio/v9/new-in-v9/upgrade/)
(documentation available in Norwegian only).
