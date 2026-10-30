---
draft: true
title: "ALTINNAPP0501: Storage client used in process transition code"
description: "Process hooks and service tasks should use IInstanceDataMutator, not IDataClient, IInstanceClient or IDataService"
weight: 51
---

This diagnostic is reported when code that runs as part of a process transition calls
`IDataClient`, `IInstanceClient` or `IDataService`. It covers the body of the member that
implements one of these hooks, including lambdas and local functions in it:

- `IOnTaskStartingHandler.Execute`, `IOnTaskEndingHandler.Execute`,
  `IOnTaskAbandonHandler.Execute` and `IOnProcessEndedHandler.Execute`
- `IServiceTask.Execute` and `IPipelineServiceTask.Define`
- `IProcessTask.Start`, `IProcessTask.End` and `IProcessTask.Abandon`
- both overloads of `IInstantiationProcessor.DataCreation`

A method that overrides the hook member in a derived class is covered too. The message names
the client method that is called and the hook it is called from.

Category `CodeSmells`, severity **warning**.

While the process is transitioning, Storage refuses direct writes to the instance. The app saves
the changes the hooks make through `IInstanceDataMutator`, together with the transition. A write
through one of the clients therefore fails, and a read returns what is stored, without the
changes the hooks have made so far.

Use the `IInstanceDataMutator` the hook gets from its context (`context.InstanceDataMutator`)
instead. It reads and changes the current instance through `GetFormData`, `GetFormDataCopy`,
`ReplaceFormData`, `AddFormDataElement`, `AddBinaryDataElement`, `UpdateBinaryDataElement`,
`RemoveDataElement`, `UpdateDataElementMetadata`, `SetDataValue`, `SetPresentationText`,
`SetSubstatus` and `AddCompleteConfirmation`. In `IInstantiationProcessor`, move the code to the
`DataCreation` overload that takes an `IInstanceDataMutator`. Copying an instance calls only the
overload that takes an `Instance`.

The rule does not look at which instance a call targets. `IInstanceClient.GetInstances` is not
reported, because it reads other instances. If a hook reads or changes another instance on
purpose, suppress the warning for that call only: put `#pragma warning disable ALTINNAPP0501`
before the call and `#pragma warning restore ALTINNAPP0501` right after it.

The rule only sees calls written directly in the hook member. A helper method the hook calls,
an interface of the app's own that wraps a client, and code in a referenced package are not
checked.
