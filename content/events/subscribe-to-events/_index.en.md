---
title: Subscribe to events
linktitle: Subscribe to events
description: Documentation for event subscribers
weight: 20
---

### IP for outgoing traffic
{{% notice info %}}
A static IP is used when pushing events to allow subscribers to whitelist the IP address. </br> </br>
__TT02__: 20.100.24.41  </br> </br>
__Production__: 20.100.46.139
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
