---
title: API
description: Beskrivelse av Altinn API for sluttbrukere og applikasjonseiere.
toc: true
weight: 20
tags: [translate-to-norwegian]
---

## The APIs

The new solution will have multiple APIs, but they can be divided in two groups. The app APIs and the Platform APIs.

### Application API

The application API is an API that provides access to specific instances of a specific app. The API provides features for working with data elements while keeping the metadata document for the instance and its data elements updated. The instance level endpoints revolves around moving an instance through its defined process and controlling some instance level settings.

Metadata for an app is the second job of the app API. There are endpoint that give access to the metadata of the app itself, its data types and process description.

Every app will expose almost identical endpoints and functionality. External parties should need only one client implementation across all app APIs. Technically there is nothing preventing an application owner from adding or making changes to the API, but in those cases it is probably an application with a different process flow. In these cases, the application might require some special handling, and additional documentation should be provided by the application owner.

```http
https://{org}.apps.altinn.no/{org}/{appname}
```

The URL identifies the application owner specific hostname using the short name **org**, and the identificator of the app consisting of both the application owner short name and the name of the app **org/appname**. 

### Platform API

The Platform APIs are primarily made to support the applications hosted on the platform, but a lot of endpoints can be used directly by both application owners and users. Primarily on the Authentication, Events and Storage APIs.

The Storage API provides access to all instances across all applications. It can be used to access metadata about applications, instances, data elements and instance activitylog (events), as well as the actual data content. This API should be the preferred method for application owners to download data associated with instances created based on their applications. Application users can use it if they need a form of message box or want to retrieve archived instances and their data.

The Authentication API provides methods for authentication.

The Events API provides access to the Events component endpoint for listing events. This can be used sporadically to query Altinn for events that have occured in the solution. 

```http
https://platform.altinn.no
```

## API user groups

There are primarily two groups of users of the Altinn APIs. The first group consists of applications and systems used by the owners of the Apps hosted by Altinn. This group is called *Application Owners*. The second group consists of organisations and people using the Apps to communicate with the application owners. This group is called *Application Users*. 

The two groups have many similar needs, but there are some differences in what type of tasks they need to perform. All new APIs is technically available to both groups, but some endpoints have authorization to allow only on of the groups.

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

{{<children>}}