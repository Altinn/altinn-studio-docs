---
title: REST-API for End User Systems
description: Description of the Rest API for end user systems
tags: ["solution", "apps"]
aliases:
    - "/altinn-studio-apps"
weight: 200
---

{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}

The main API'channel for data in the platform is REST for services created in Altinn Studio. 

The end user system needs to call different APIS based on the need.  The below figure show the different components relevant for an 
end user System calling Altinn through REST.

{{%excerpt%}}
<object data="/solutions/altinn-apps/app-api/eus-rest/eus-rest.svg" type="image/svg+xml" style="width: 100% max-width: 1200px;"></object>
{{% /excerpt%}}

### API to authenticate end user systems 
For new API's the goal is to use JWT Tokens to authenticate against the API. 

Altinn Apps will expose apis to authenticate end user systems and user of end user systems and return JWT Tokens that can be used against the other API's. 

### API to create new data instance for a app
From end user systems it will be possible to create a instance of a App from a end user system. 
This is a URL directly to the app and unique

**URL**

```http
https://{org}.apps.altinn.no/api/v1/{org}/{appid}/
```

### API to update form data
Data that is form data for a given app needs to be updated through the APP APis to ensure handling of business rules


**Method:** PUT
```http
https://{org}.apps.altinn.no/api/v1/{org}/{appid}/{instanceid}/Update
```
### API to get instance data with business rules
Data that is form data related to the apps data modell will need to be retrieved through the APP api. 
This is because the app possible can add additional data.

```http
https://{org}.apps.altinn.no/api/v1/{org}/{appid}/{instanceid}/Update
```

### API to validate data
The apps will support the possibility to validate the datamodel for the app without creating a instance of the data

```http
https://{org}.apps.altinn.no/api/v1/{org}/{appid}/{instanceid}/Calculate
```

### API to calculate / perform business rules
The app will support the possibility to perform calculation / perform business rules for a datamodell to an app  

```http
https://{org}.apps.altinn.no/api/v1/{org}/{appid}/{instanceid}/Validate
```

### API to add binary attachments
The platform api will support adding binary data to a instance.

```http
https://storage.platform.altinn.no/api/v1/3/AltinnTest/ApiDemo/7ae65582-f9bc-46b8-b094-84e9530e4ed6/Calculate
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

Delete a specific instance (also deletes its data).

```http
https://storage.platform.altinn.no/api/v1/instances/{instanceId}
```

##### Data service

A data element is a file that contains a specific form element of an instance.
It may be structured file, e.g. json, xml, or it may be a binary file, e.g. pdf.
The application metadata restricts the types of form elements that are allowed {formId}.

Get a specific data element

```http
https://storage.platform.altinn.no/api/v1/instances/{instanceId}/data/{formId}/{dataId}
```

Post to create a specific data element. Content a file (as MultipartContent).
After success the instance's data section is updated, with the appropriate dataId guid
that is used to identify the specific data element

```http
/instances/{instanceId}/data/{formId}
```

Put to replace a specific data element. Delete to remove data element.

```http
/instances/{instanceId}/data/{formId}/{dataId}
```

























