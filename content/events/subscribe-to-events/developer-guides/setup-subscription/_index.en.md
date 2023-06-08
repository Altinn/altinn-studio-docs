---
title: How to set up a subscription
linktitle: Set up a subscription
description: How-to guide on setting up a subscribe for events from a specific resource
weight: 10
toc: true
---


## Endpoint

POST /subscriptions

## Authentication

This API requires authentication.

When subscribing to generic events the Maskinporten scope __altinn:events.subscribe__ is also required.

See [Authentication and Authorization](../../../api/#authentication--authorization) for more information.


## Request

### Content-Type
application/json

### Request body
The request body should contain the
[subscription request](https://raw.githubusercontent.com/Altinn/altinn-events/main/src/Events/Models/SubscriptionRequestModel.cs)
serialized as JSON.

{{% notice info %}}
The list of required properties below shows what is generally required.
Requirements vary based on who the subscriber is and what type of resource
the subscription is targeting. Please use documentation below as guidance and refer to the problems details
if your subscription request is not being accepted.
{{% /notice %}}

### Required subscription request properties

#### endPoint
- webhook URL to receive HTTP POST request from Altinn Events

Endpoint should respond with 200 OK when an event is received. 
Additionally, it should return 200 OK when receiving our custom validation event:


```json
{
    "id": "694caa35-8b25-4cd7-b800-f6eeb93c56ed",
    "source": "https://platform.altinn.no/events/api/v1/subscriptions/1234",
    "type": "platform.events.validatesubscription",
    "specversion": "1.0"
}
```
_Example of validation event_

#### sourceFilter
- filter for the cloud event source

Property supports wildcard _%_ for an unknown string e.g. `https://digdir.apps.altinn.no/digdir/demoapp/%`


### Optional subscription request properties

#### subjectFilter
- filter for the cloud event's subject

#### alternativeSubjectFilter
- filter for the cloud event's alternative subject

#### typeFilter
- filter for the cloud event type.

Omit this property if you want to subscribe to all events types for the given source and/or resource

## Response

A successful subscription registration should result in a 201 created response with the
[subscription](https://raw.githubusercontent.com/Altinn/altinn-events/main/src/Events/Models/Subscription.cs)
serialized as a JSON string in the response body.

The 201 response code does indicate whether or not the subscription has been validated.
Altinn will only start pushing events to a subscription endpoint once the subscription endpoint has been validated.
You may retrieve your subscription by using the subscription ID to ensure that you subscription has been validated ok.


### Content-Type
- application/json

### Response codes
- 201 Created: The subscription has been successfully registered.



- 401 Unauthorized: Indicates a missing, invalid or expired authorization header or that consumer is not allowed
  to subscribe to events from this resource based on filter parameters
- 403 Forbidden: Indicating is missing required scope for subscribing to events

## Examples

### Request

Note that an Altinn Token should be included in the authorization header.

```bash
curl \
--location 'https://platform.altinn.no/events/api/v1/subscriptions' \
--header 'Accept: application/xml' \
--header 'Authorization: Bearer {insert Altinn token}' \
--header 'Content-Type: application/json' \
--data '{
  "sourceFilter": "https://digdir.apps.altinn.no/digdir/demoapp/%",
  "endpoint":"https://webhook.site/"
  }'
```

### Response

#### 201 Created
```json
{
    "id": 1619,
    "endPoint": "https://webhook.site/43cec4b7-b20b-4cbd-9b47-592750bf06d1",
    "sourceFilter": "https://digdir.apps.at22.altinn.cloud/digdir/demoapp/%25",
    "consumer": "/org/digdir",
    "createdBy": "/org/digdir",
    "created": "2023-04-05T13:57:11.234994Z",
    "validated": false
}
```

#### 400 Bad Request
```json
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "traceId": "00-3755bd55cf6d4e1ebdf7ed49b6f3d3be-154ebd2ad01de860-00",
    "errors": {
        "$": [
            "The JSON object contains a trailing comma at the end which is not supported in this mode. Change the reader options. Path: $ | LineNumber: 2 | BytePositionInLine: 2."
        ]
    }
}
```

#### 401 Unauthorized
```json
"Not authorized to create a subscription with subject /org/989271156"
```