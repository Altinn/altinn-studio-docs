---
title: REST-API for ORgs
description: Description of the Rest API for organizations (Service Owners)
tags: ["solution", "apps"]
aliases:
    - "/altinn-studio-apps"
weight: 200
---

{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}


For Apps created in Altinn Studio and hosted in Altinn apps, REST-API are the main channel to interact with the App / Altinn Platform.

### API to authenticate end agency systems
In the current Altinn Platform SOAP is used for most of the agencies API's. Altinn support both username/password for agencies
and 

### API to instansiate a new instance of a service with prefill
A agency system would be able to instansiate a new instance of a app. 


**URL**

```http
https://{org}.apps.altinn.no/api/v1/{org}/{appid}/
```

Get information about one instance.

```http
https://storage.platform.altinn.no/api/v1/instances/{instanceId}
```

Get (query) all instances that is instance owner has

```http
https://storage.platform.altinn.no/api/v1/instances&instanceOwnerId={instanceOwnerId}[&since=2017-01-01]
```

Get (query) all instances of a particular application that is completed

```http
https://storage.platform.altinn.no/api/v1/instances?applicationId={applicationId}&completed=true
```

##### Data service

A data element is a file that contains a specific form element of an instance.
It may be structured file, e.g. json, xml, or it may be a binary file, e.g. pdf.
The application metadata restricts the types of form elements that are allowed {dataTypeId}.

Get a specific data element

```http
https://storage.platform.altinn.no/api/v1/instances/{instanceId}/data//{dataId}
```


























