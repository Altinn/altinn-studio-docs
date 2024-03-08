---
title: How to publish Altinn App events
linktitle: Publish app events
description: How-to guide on publishing Altinn App events
weight: 40
toc: true
---

{{% notice info %}}

**Are you an Altinn App developer?**

Please reference the [Altinn Apps documentation for guidance](../../../../app/development/configuration/events/) 
on how to enable the events functionality and define custom events in your Altinn App.</br></br>

As the publishing of app events is handled by core logic in the application, this documentation 
is only relevant for developers working with core application logic i.e. the application template.
{{% /notice %}}


## Endpoint

POST /app

## Authentication
This API requires authentication and a Platform Access Token in the header.

See [Authentication and Authorization](../../../api/#authentication--authorization) for more information.


## Request

### Content-type

application/json


### Request body
The request body should contain the cloud event formatted as a
[AppCloudEventRequestModel](https://github.com/Altinn/altinn-events/blob/main/src/Events/Models/AppCloudEventRequestModel.cs)
and serialized as a JSON string.

Events will handle setting ID and time on the cloud event.

### Required cloud event properties and extension attributes

#### type
- event type of the cloud event, type: string

#### source
- event source of the cloud event, type: URI

#### subject
- party ID for the instanceOwner, type: string


Format of the subject string: _/party/{partyId}_

#### specversion
- the cloud event spec version, type: string

### Optional cloud event properties and extension attributes
{{% notice info %}}
In addition to the properties stated below, all properties defined in the
[AppCloudEventRequestModel](https://github.com/Altinn/altinn-events/blob/main/src/Events/Models/AppCloudEventRequestModel.cs)
will be accepted.
{{% /notice %}}

#### alternative subject
- alternative identifier for the subject, type: string

The alternative subject should be an identifier that is commonly known to your subscribers.
This property is supported as a query/filter parameter when subscribing or querying events.
We recommend to include an alternative subject if the subject property is an internal ID
that is unknown to the event subscribers

For Altinn-related events alternative subject follows the format `/person/16069412345`
and `/organisation/987564321`.


## Response
A successful registration of the cloud event should result in a _200 OK_ response without any data.

### Content-Type
- application/json

### Response codes
- 201 Created: The cloud event was registered successfully
- 400 Bad Request: The request was invalid.

  Refer to problem details in response body for further information.
- 401 Unauthorized: Indicates a missing, invalid or expired authorization header or that app is not authorized to publish events for the provided source.
- 403 Forbidden: Indicates that Platform Access Token is missing or invalid.

## Examples

### Request

Note that the Platform Access and Altinn tokens should be inserted in the headers.

```bash
curl \
--location 'https://platform.altinn.no/events/api/v1/app' \
--header 'Content-Type: application/json' \
--header 'PlatformAccessToken: {Insert Platform Access token}' \
--header 'Authorization: Bearer {Insert Altinn token}' \
--data '{
	"type": "app.instance.created",
	"source": "https://ttd.apps.altinn.no/ttd/apps-test/instances/50019855/428a4575-2c04-4400-89a3-1aaadd2579cd",
	"subject": "/party/50019855",
	"specversion": "1.0",
	"alternativesubject": "/person/01017512345"
}'
```

### Response

#### 200 OK
Response contains the ID for the cloud event.

```json
"4815d141-8cf6-4555-8c3c-e069c7b80c79"
```

#### 400 Bad Request
Response contains a problem details object with the error message in the detail property.

```json
{
	"type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
	"title": "Bad Request",
	"status": 400,
	"detail": "Missing parameter values: source, subject and type cannot be null",
	"traceId": "00-4b54a6a0c9b74bf5afc5e917863f96fd-eb14b06c1f0c3cf8-00"
}
```