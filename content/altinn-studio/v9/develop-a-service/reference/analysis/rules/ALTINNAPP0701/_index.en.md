---
draft: true
title: "ALTINNAPP0701: incomplete registration discarded"
description: "The result of a builder call is discarded, but it is not a usable registration on its own"
weight: 71
---

This diagnostic is reported when the result of a call is discarded, and its return type is a
builder step that is not a complete registration in itself. One example is
`services.AddEFormidling();`, which registers everything except the one implementation the app
must supply itself.

The rule only looks at calls whose result is discarded entirely — where the call is the whole
statement. A builder object stored in a variable or passed on is not reported.

Category `Contracts`, severity **error**. The rule therefore fails the build.

Complete the registration, for example with `.WithMetadata<T>()`. If you deliberately want only
what the entry point registers, write an explicit discard — `_ = services.AddEFormidling();` —
which is not reported.

See the [guide to the eFormidling service task]({{< relref "/altinn-studio/v9/receive-data/eFormidling" >}}).
