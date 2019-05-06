---
title: Application arhicture authorization component - Altinn Platform
linktitle: Authorization
description: Description of authentication component
tags: ["solution", "architecture"]
weight: 100
alwaysopen: true
---

The Authentication component is an ASP.Net Core MVC Application exposing REST-API to Altinn Apps.

The solution is currently available at http://platform.altinn.cloud/api/authorization/v1.

An endpoint for testing purposes is available:

```http
/debug/{echo}
```
Works with any string as echo, and will simply return the inputted string.