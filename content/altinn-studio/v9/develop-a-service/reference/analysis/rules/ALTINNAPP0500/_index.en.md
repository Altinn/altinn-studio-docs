---
draft: true
title: "ALTINNAPP0500: dangerous use of IHttpContextAccessor"
description: "IHttpContextAccessor.HttpContext should not be used in constructors"
weight: 50
---

This diagnostic points out that `IHttpContextAccessor.HttpContext` should **not** be used in
constructors. This kind of misuse has caused personal data to leak in past incidents.

See Microsoft's guidance:
https://learn.microsoft.com/en-us/aspnet/core/fundamentals/use-http-context?view=aspnetcore-8.0#httpcontext-isnt-thread-safe
