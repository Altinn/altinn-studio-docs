---
draft: true
title: "ALTINNAPP0704: method does not implement the member it is named after"
description: "A method in a task class has the name of an IProcessTask member, but the app never calls it"
weight: 74
---

This diagnostic is reported when a class that implements `IProcessTask` or `IServiceTask` has a
method named `DefineStart`, `DefineEnd`, `DefineAbandon` or `ValidateConfiguration` that does not
implement the `IProcessTask` member of that name, and that no code in the app calls. The message
names the method and the member, and shows the signature the method should have. The rule looks
at the whole app, so it reports when the app is built.

`IProcessTask` has a default implementation of all four members, so the class still compiles.
The app never calls your method, and runs the default implementation instead. The defaults for
`DefineStart`, `DefineEnd` and `DefineAbandon` compose no stages, and the default for
`ValidateConfiguration` accepts all configuration.

The method does not implement the member if, for example, it

- takes different parameters, such as `PipelineBuilder.ServiceTask` instead of `PipelineBuilder.Lifecycle`
- has a different return type
- is not `public`
- is `static`

If the class inherits the interface from a base class, the class must also list the interface
itself. Otherwise the app does not call the class's methods, even when the signature is right.

Category `Contracts`, severity **error**. The rule therefore fails the build.

To fix it:

- Give the method the signature the message shows, that is `public`, not `static`, and with the
  same return type and parameters as the member in `IProcessTask`. You can also implement the
  member explicitly, for example with `void IProcessTask.DefineStart(PipelineBuilder.Lifecycle pipeline)`.
- If the class inherits the interface from a base class, add `IProcessTask` to the interfaces the
  class lists. A service task can list `IServiceTask` just as well.
- If the method is meant for something else, give it a different name.

`DefineStart`, `DefineEnd` and `DefineAbandon` take `PipelineBuilder.Lifecycle`, in a service
task too, where `DefineExecute` takes `PipelineBuilder.ServiceTask`. In the example below, a
service task should run the stage `Prepare` when it starts.

Incorrect:

```csharp
public void DefineStart(
    PipelineBuilder.ServiceTask pipeline
) => pipeline.Stage(Prepare);
```

Correct:

```csharp
public void DefineStart(
    PipelineBuilder.Lifecycle pipeline
) => pipeline.Stage(Prepare);
```

In the example below, `ArchiveTask` inherits the interface from the base class `TaskBase`, which
implements `IServiceTask`. The signature of `DefineEnd` is right, but the app only calls the
method once the class lists the interface itself.

Incorrect:

```csharp
public class ArchiveTask : TaskBase
{
    public void DefineEnd(
        PipelineBuilder.Lifecycle pipeline
    ) => pipeline.Stage(Notify);
}
```

Correct:

```csharp
public class ArchiveTask : TaskBase, IProcessTask
{
    public void DefineEnd(
        PipelineBuilder.Lifecycle pipeline
    ) => pipeline.Stage(Notify);
}
```

The rule does not report a method that something in the app calls, such as a helper method
`ValidateConfiguration(ArchiveSettings settings)` that `DefineExecute` uses, or a protected helper
in a base class that a derived task calls. Nor does it report
other methods of the same name once the class implements the member, such as a private helper
method with more parameters.

The rule does not report a method that overrides a method in a base class (`override`) either, or
one that implements a member of the same name in another interface, as the signature of such a
method was chosen elsewhere. If you override a method in a base class that is part of the app,
the rule reports the method in the base class instead.

See [Lage en egendefinert systemoppgave](/nb/altinn-studio/v9/develop-a-service/process/service-tasks/custom/) (documentation available in Norwegian only).
