---
title: Polling events
linktitle: Polling events
description: Developer guide on how to retrieve events using the Events API
weight: 40
---
{{% notice warning %}}

Altinn Events enables event driven integration patterns, designed specifically to ***avoid*** the need for continuously requesting resources, also known as 'polling'. 

However, in order to allow for smooth and incremental architectural migrations, the Events API also provides an HTTP API for scheduled requests of the same event data you hopefully will receive via webhooks in the future.

{{% /notice %}}

### Base URL
```http
https://platform.{env}.altinn.no/events/api/v1
```
<br />

## Required filter parameters


### after

- ID of event last retrieved, type: *string*

A typical polling-based integration works by requesting a list of all new events since the last successful polling request was processed. The `/events` endpoint uses event IDs for filtering instead of timestamps.

Simply provide the last event ID you have processed (or "0" if calling for the first time) and the endpoint will reply with the next set of events. 

*Note: included in the JSON response is a complete URL you can use to request the next set of events.*

### source

- a globally unique URI that identifies the originating system that produced the event and is a required filter parameter for performance reasons.


## Optional filter parameters (can be combined)

### type

Since all cloud events MUST include a single, non-empty `type` value (string), this can be a convient way to retrieve a subset of events for a particular source. 

See the [Cloud Events specification](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#type) for more information and examples.


### subject

- optional string property that usually identifies the entity a cloud event is related to. [Cloud Events specification](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#subject)


### alternativesubject

-optional string property that usually identifies the entity a cloud events i related to. 

## Example

```http
GET /events?after=6edc1976-5dd5-4b08-a570-55d9942aa89f&source=https%3A%2F%2Fplatform.altinn.no%2F&type=no.altinn.storage.instance.created&subject=org/123456789

Returns array of cloud events:

[
    {
        "id": "long-guid"
    }
]
```
