---
title: Application arhicture authentication component - Altinn Platform
linktitle: Authentication
description: Description of authentication component
tags: ["solution", "architecture"]
weight: 100
---

The Authentication component is an a ASP.Net Core MVC Application exposing REST-API to Altinn Apps.

The solution is currently available locally and remotely at  http://localhost:5040/api/v1  and http://platform.altinn.cloud/api/authentication/v1, respectively.

An endpoint for testing purposes is available:

```http
/debug/{echo}
```
  Works with any string as echo, and will simply return the inputted string.

