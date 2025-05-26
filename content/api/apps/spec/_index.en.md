---
title: OpenAPI (swagger) for Apps
linktitle: OpenAPI
type: openapi
spec: "/swagger/altinn-app-v1.json"
tags: [swagger, openapi]
---

Altinn 3 apps use Altinn's NuGet packages and therefore offer a standard API that is consistent across apps. In an app, you can create an instance that goes through a process with various steps where you can work with data elements belonging to a data type. The data types are unique per app, and to be able to create an API client for an app, it is often necessary to refer to schemas for data models and content types for attachment types. To meet this need, after version 8.6.0 of the NuGet packages, we have two different OpenAPI specifications. One is a traditional auto-generated specification that contains all APIs but no information about different data types, and the other is an app-specific specification. Below you can see what the general specification looks like, but to see the app-specific specification, you must visit {org}.apps.altinn.no/{org}/{app}/swagger in a browser.