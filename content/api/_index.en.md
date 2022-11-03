---
title: Altinn 3 API
linktitle: API
description: Description of the Altinn 3 data structures and APIs for both end users and application owners.
toc: true
weight: 20
aliases:
 - /altinn-api/
 - /teknologi/altinnstudio/altinn-api/
---

## The two primary data structures

This will be an overview of the primary models used in Altinn 3. The primary purpose of this is to form a basic understanding of the models before introducing the APIs.

![Instance](instance.drawio.svg "An instance can contain many data elements. Each data element must refer to a single data file.")

### Instance

The Instance model is the main metadata document in Altinn 3. It is used by Altinn to keep track of the state of an interaction between an end user and the owner of an app. An instance must be associated with an app and a reportee as the instance owner.

Instances are also a little bit like containers for all other documents; forms and unstructured data collected during an interaction between an end user and the application owner. The number of documents and files being produced will depend on the app. 

In a simple app, an end user will fill in a form and submit it to the application owner. This would typically produce a one way interaction where only one or two documents are collected in the instance. In more advanced apps the number of documents and files would extend to multiple forms, attachments, and feedback or validation messages from the application owner. 

An instance can't reference data directly, but will hold a list of data elements with more information about collected data.

### DataElement

The DataElement model is a metadata document for a specific form or binary file. The most important aspects of this document is that it holds information about where the actual data is being stored, and how the data is being used by the application. 

Most apps will automatically create a data element to represent the form being filled out by the user. More advanced apps will also require the user to upload attachments or to fill in multiple forms.

An instance can have many data elements, but each data element can not reference more than one data file.

## The APIs

The Altinn 3 solution has multiple APIs, but they can be divided in two groups. The app APIs and the Platform APIs.

### App API

The application API is an API that provides access to specific instances of a specific app. The API provides features for working with data elements while keeping the metadata document for the instance and its data elements updated. The instance level endpoints revolves around moving an instance through its defined process and controlling some instance level settings.

Metadata for an app is the second job of the app API. There are endpoints that give access to the metadata of the app itself, its data types and process description.

Every app will expose almost identical endpoints and functionality. External parties should need only one client implementation across all app APIs, but it is possible for the application owner to extend the app API with additional endpoints and even make changes to default functionality. Documentation for app specific API and features must be retrived directly from the app or from the application owner. 

```http
https://{org}.apps.altinn.no/{org}/{appname}
```

The URL identifies the application owner specific hostname using the short name **org**, and the identificator of the app consisting of both the application owner short name and the name of the app. Combining the org and appname results in what we call the app id **org/appname**. 

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