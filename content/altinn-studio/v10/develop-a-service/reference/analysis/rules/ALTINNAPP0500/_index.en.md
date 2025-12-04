---
title: "ALTINNAPP0500: farlig bruk av IHttpContextAccessor"
tags: [needstranslation]
description: "IHttpContextAccessor.HttpContext bør ikke brukes i konstruktører"
weight: 50
---

Denne diagnostikken påpeker at `IHttpContextAccessor.HttpContext` **ikke** bør brukes
i konstruktører. Denne typen misbruk har ført til lekking av persondata i tidligere hendelser.

Se mer veiledning fra Microsoft her: 
https://learn.microsoft.com/en-us/aspnet/core/fundamentals/use-http-context?view=aspnetcore-8.0#httpcontext-isnt-thread-safe

Tilgjengelig fra **v8.6**.
