---
title: How to set up a subscription
linktitle: Set up a subscription
description: How-to guide on setting up a subscription for events from a specific resource
weight: 10
toc: true
---


## Endpoint

POST /subscriptions

{{% notice info %}}
Example use case: Use this endpoint when you want to add a subscription to your Altinn Studio app's events. Use the filter
properties to specify what events you want to subscribe to. 
{{% /notice %}}

## Authentication and authorization

Using this API requires an identity with access to the requested data. Events published by Altinn Studio Apps can be
accessed without any scopes, but events from other sources like Correspondence and Broker require the __altinn:events.subscribe__
scope. The scope is publicly available and can be used by both ID-porten and Maskinporten clients.

If you are subscribing to events as a service owner you also need to use the __altinn:serviceowner__ scope. This allows you to 
access data on a event source (service) level rather than for specific parties, making the subject filter property optional. 
The __altinn:serviceowner__ scope is available only for registered service owners using a Maskinporten client.

See [Authentication and Authorization](/en/events/api/#authentication--authorization) for more information.

## Request

### Content-Type
application/json

### Request body

{{% notice info %}}
The list of required properties below shows what is generally required. Requirements vary based on who the subscriber
is and what type of resource the subscription is targeting. Please use documentation below as guidance and refer to the
problem details if your subscription request is not being accepted.
{{% /notice %}}

### Required subscription request properties

#### endPoint

Webhook URL to receive HTTP POST request from Altinn Events.

{{% notice warning %}}
HTTPS endpoints must use publicly trusted TLS-certificates. Self-signed certificates are not supported and will cause subscription validation to fail.
{{% /notice %}}

The endpoint should respond with a HTTP response code in the 2xx range if the request was processed successfully. All other 
responses will be treated as failed. The API must accept the validation event (below) as well as all normal 
events.

```json
{
    "id": "694caa35-8b25-4cd7-b800-f6eeb93c56ed",
    "source": "https://platform.altinn.no/events/api/v1/subscriptions/1234",
    "type": "platform.events.validatesubscription",
    "specversion": "1.0"
}
```
_Example of validation event_

#### resourceFilter
Filter for the event source. The event resource field is an extension to the CloudEvent specification that Altinn Events is using
to identify the event source instead of using the source field directly. 

The resource filter field is required, but Altinn Events is able to populate it automatically based on a source filter value 
with a valid url pointing to an Altinn Studio App. This is done for backwards compatibility with older clients.

Must be an exact match to the resource set on the generated events. E.g: `urn:altinn:resource:app_digdir_demoapp`.

#### subjectFilter
Filter for the cloud event's subject. Altinn Events will perform an exact match comparison. 

The field is required unless you're a Service owner. Service owners can ignore the field and subscribe to all events across
all parties/subjects. 

##### Special subject filter value for app events:
- /party/{partyid} - If the party id of your party is unknown, use alternative subject filter instead.

##### Possible subject filter values for other event sources:
- urn:altinn:organization:identifier-no:{organization number}
- urn:altinn:person:identifier-no:{national identity number}

{{% notice warning %}}
Setting the value to an empty string (`""`) will cause the subscription to silently fail to deliver events.
{{% /notice %}}


### Optional subscription request properties

### sourceFilter
Filter for the cloud event source. This filter can be used instead of resource filter for events published by apps. This field
is kept for backwards compatibility with older clients.

The format for source filter is: `https://digdir.apps.altinn.no/digdir/demoapp`.

#### alternativeSubjectFilter
Filter for the cloud event's alternative subject. Alternative subject is an extension to the CloudEvent specification that
Altinn Events use for the purpose of making the subject of an event human readable. The field is used when the subject
field is populated with a party id.

{{% notice info %}}
Altinn Events doesn't keep the alternative subject filter value, but use it to generate a matching subject filter value. This is
why you don't see the value if you request existing subscriptions.
{{% /notice %}}

##### Possible subject filter values for app events:
- /org/{organization number}
- /person/{national identity number}


#### typeFilter
Filter events using the cloud event type value. Altinn Events will perform an exact match search for subscriptions with
a type filter. There are no wildcard or array support as of now. You can leave this field empty and filter for the events
your system is interested in on your side when events are being posted to your system endpoint.

##### Typical app events:
- app.instance.created
- app.instance.process.movedTo.Task_2
- app.instance.process.completed

##### Examples from other sources:
- no.altinn.broker.published
- no.altinn.correspondence.correspondencepublished
- dialogporten.dialog.created.v1

Altinn Events doesn't dictate what type of events different event sources is using. You'll need to look at the documentation
for each source for accurate information.

{{% notice warning %}}
Setting `typeFilter` to an empty string (`""`) will cause the subscription to silently fail to match events. This is a common
source of errors that is difficult to debug, as no validation error is returned.
{{% /notice %}}

#### includeSubunits
Allows events where the subject of the event is a subunit to be caught by a main unit subscription. This makes it
possible for an organization with subunits (hierarchy of organizations) to create a single subscription that can catch 
all events with subjects across the organizational hierarchy. 

The value will have an effect only if the `subjectFilter` value is the actual main unit of the organization.

Default value is: False.

## Response

A successful subscription registration should result in a 201 created response with the
[subscription](https://raw.githubusercontent.com/Altinn/altinn-events/main/src/Events/Models/Subscription.cs)
serialized as a JSON string in the response body.

The 201 response code does not indicate whether or not the subscription has been validated.
Altinn will only start pushing events to a subscription endpoint once the subscription endpoint has been validated.
You may retrieve your subscription by using the subscription ID to ensure that your subscription has been validated ok.


### Content-Type
- application/json

### Response codes
- 201 Created: The subscription has been successfully registered.
- 401 Unauthorized: Indicates a missing, invalid or expired authorization header or that consumer is not allowed
  to subscribe to events from this resource based on filter parameters
- 403 Forbidden: Indicates missing required scope or authorisation. Check user roles or access packages against
  the event source policy.

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
  "sourceFilter": "https://digdir.apps.altinn.no/digdir/demoapp",
  "endpoint":"https://webhook.site/"
  }'
```

### Response

#### 201 Created
```json
{
    "id": 1619,
    "endPoint": "https://webhook.site/43cec4b7-b20b-4cbd-9b47-592750bf06d1",
    "sourceFilter": "https://digdir.apps.at22.altinn.cloud/digdir/demoapp",
    "consumer": "/org/digdir",
    "createdBy": "/org/digdir",
    "created": "2023-04-05T13:57:11.234994Z",
    "validated": false,
    "includeSubunits": false
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
"Not authorized to create a subscription with subject /organisation/989271156"
```
