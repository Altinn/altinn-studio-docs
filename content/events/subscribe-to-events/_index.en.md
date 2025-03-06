---
title: Subscribe to events
linktitle: Subscribe to events
description: Documentation for event subscribers
weight: 20
---

### Explanation of what the service offers
Subscribing to events offers an event-driven solution where the event recipients register an endpoint/webhook in their own API.
All event subscribers will receive data to their own endpoint, asynchronously. This is the recommended approach for receiving 
events from Altinn Events.
    
If the recipient's webhook is unresponsive, for whatever reason, Altinn Events offers a retry mechanism with up to 12 retries. 
Technical details are listed below.


### Making a subscription request
The example below features a subscription request object, containing three properties. _Endpoint_ is the absolute path
to the webhook in the recipients own API, while _SourceFilter_ and _SubjectFilter_ are filters on source and subject, respectively.

```json
{
    "EndPoint":"https://www.skatteetaten.no/hook",
    "SourceFilter":"https://hunderpasseren.no/by/bronnoysund",
    "SubjectFilter":"/hund/ascii"
}
```
_Example of subscription request object_

### Validating a subscriber's endpoint
Once a new subscription has been registered through the API, 
a validation event is sent to the endpoint to validate its response status.

```json
{
    "id": "694caa35-8b25-4cd7-b800-f6eeb93c56ed",
    "source": "https://platform.altinn.no/events/api/v1/subscriptions/1234",
    "type": "platform.events.validatesubscription",
    "specversion": "1.0"
}
```
_Example of validation event_


### IP for outgoing traffic
{{% notice info %}}
A static IP is used when pushing events to allow subscribers to whitelist the IP address. </br> </br>
__TT02__: 20.100.24.41/32  </br> </br>
__Production__: 20.100.46.139/32
{{% /notice %}}


### Retry schedule

Subscription validation and push of events to registered webhooks is retried if the request to 
webhook fails (Http status != 200). The cloud event will be attempted sent up to 12 times according to the schedule below. 

If it fails on the 12th attempt, the cloud event is placed in a dead letter queue and will not be retried.

- 1st retry after 10 seconds
- 2nd retry after 30 seconds
- 3rd retry after 1 minute
- 4th retry after 5 minutes
- 5th retry after 10 minutes
- 6th retry after 30 minutes
- 7th retry after 1 hour
- 8th retry after 3 hours
- 9th retry after 6 hours
- 10th retry after 12 hours
- 11th retry after 12 hours


{{<children />}}
