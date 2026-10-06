---
draft: true
title: "ALTINNAPP0700: sealed default implementation replaced"
description: "A class replaces an interface member whose default implementation is sealed"
weight: 70
---

This diagnostic is reported when a class implements an interface member that already has a
default implementation marked as sealed, so that the class's own implementation replaces it.

A concrete case: `IServiceTask` has a default implementation of `IPipelineServiceTask.Define`
that forwards to `Execute`. A class that implements `IServiceTask` and defines `Define` itself
replaces that forwarding — and then `Execute` never runs.

Category `Contracts`, severity **error**. The rule therefore fails the build.

The message names the class, the member being replaced and the type the default implementation
is on, and ends with the guidance attached to that member. In the case above, the fix is to
implement `IPipelineServiceTask` directly.
