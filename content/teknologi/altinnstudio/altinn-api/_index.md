---
title: Altinn API
description: Description of the Altinn API for end users and application owners.
toc: true
tags: [api]
aliases:
 - /altinn-api/
---

## The APIs

The new solution will have multiple APIs, but they can be divided in two groups. The App APIs and the Platform API.

### Application API

The application API is an API that provides access to specific instances of a specific app. The API provides features for working with data elements while keeping the metadata document for the instance and its data elements updated. The instance level endpoints revolves around moving an instance through its defined process and controlling some instance level settings.

Metadata for an App is the second job of the App API. There are endpoint that gives access to the metadata of the App itself, its data types and process deescription.

Every App will expose almost identical endpoints and functionality. External parties should need only one client implementation across all App APIs. Technically there is nothing preventing an application owner from adding or making changes to the API, but in those cases it is probably an application with a different process flow. Applications like that would in most cases require some special handling and have their own documentation provided by the application owner.

```http
https://{org}.apps.altinn.no/{org}/{appname}
```

The URL identifies the application owner **org** specific hostname and the identificator of the App **org/appname**. 

### Platform API

The Platform API are primarily made to support the applications hosted on the platform, but all GET methods can be used directly by both application owners and users.

The storage API provides access to all instances across all applications. It can be used to access metadata about applications, instances, data elements and events, as well as the actual data content. This API should be the preferred method for application owners to download data associated with instances created based on their applications, and for user applications with a form of message box and the need to retrieve archived instances and their data.

The authentication API provides methods for authentication.

```http
https://platform.altinn.no
```

## API user groups

There are primarily two groups of users of the Altinn APIs. The first group consists of applications and systems used by the owners of the Apps hosted by Altinn. This group is called *Application Owners*. The second group consists of organisations and people using the Apps to communicate with the application owners. This group is called *Application Users*. 

The two groups have many similar needs, but there are also differences in what type of tasks they need to be able to perform. All new APIs will be available to both groups, but some endpoints and features will normally only be used by one of them. 

### Application Owners

A list of common tasks for an application owner:

- Query instances for a given application according to status or instance owners.
- Create an application instance.
- Upload form data and attachments.
- Download form data.
- Change process state (workflow).
- Confirm instance as complete.

### Application Users

A list of common tasks for an application user:

- Query instances for themselves or a party they can represent (instance owner).
- Create an application instance.
- Upload form data and attachments.
- Download form data.
- Change process state (workflow).
- View status of an instance.

