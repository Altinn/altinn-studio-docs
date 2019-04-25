---
title: Application arhicture profile component - Altinn Platform
linktitle: Profile
description: Description of profile component
tags: ["solution", "architecture"]
weight: 100
alwaysopen: true
---

The profile component is an ASP.Net Core MVC Application exposing REST-API to Altinn Apps.

The profile solution is now available locally at http://platform.altinn.cloud/api/v1 and all resources are avaiable through endpoints defined below.

Resources: users

## /users 
A user is the entity which is logged in in Altinn and performs actions for on behalf of an instance owner.

Get information about a user:

```http
/users/{userId}
```
(Available testdata. UserId: 1083,2772, 2882 and 1536.)