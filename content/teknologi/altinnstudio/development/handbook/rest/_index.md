---
title: RESTful APIs (Representation State Transfer)
description: Guidelines for designing REST apis for microservices in Altinn
tags: [development, api]
weight: 100
---
{{%notice warning%}}
This page is work-in-progress. This is a proposed api which most likely is going to change.
{{% /notice%}}

## REST
REST is an architectural style for designing loosely coupled applications over HTTP which was coined by [Rob Fielding](https://en.wikipedia.org/wiki/Roy_Fielding) in 2000.
We will define services according to [REST](https://restfulapi.net/rest-architectural-constraints/).

 - REST APIs should start with `/api` so that we with ease can differentiate between an rest api call and a ux-application call.

 - REST APIs should start with a short word to indicate the logical domain or group of apis.

 - REST APIs should be versioned, with semantic versioning: v1 major (incompatible API changes), v1.1  minor (add backwards-compatible functionality), and v1.1.1 patch (bugfix). We should strive to make REST APIs backwards compatible, hence clients should not break if we add a new parameter.

 - REST APIs paths should be in lower case letters. Query parameter names should be lowerCamelCase.

 - REST APIs should be resource oriented. A resources is a thing that the client and server knows about.
The API provides methods to find, create, update, delete or manipulate a resource object.
A resource in a system should have only one logical URI, which should provide a way to fetch related or additional data about the resource.

 - REST APIs specifications should be public awailable as OpenApi 3.0 (swagger).

```http
/api/{domain}/{version}/{resource}
```

Example:

Create a new instance resource. Post to *instances* with query params that identifies the application and the instance owner.
This call should return identifier of the new instance resource or the json of the instance resource itself.

```http
/api/storage/v1/instances?applicationId=KNS-sailor&instanceOwnerId=1024
```

GET one instance or PUT to to this url to update the instance. 

```http
/api/storage/v1/instances/23f1faab-bdb3-4cba-aed2-d515e1be6db8
```

Get (query) all instances that is instance owner has

```http
/api/storage/v1/instances&instanceOwnerId={instanceOwnerId}[&since=2017-01-01]
```
