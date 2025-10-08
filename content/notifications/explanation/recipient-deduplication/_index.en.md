---
title: Contact Point Deduplication
description: "Altinn Notifications automatically deduplicates contact points across multiple data sources to ensure that recipients only receive one notification per mobile number or email address. This article explains how the deduplication mechanism works and the principles behind it."
weight: 30
---

## Why deduplication is necessary

When Altinn Notifications sends notifications linked to a resource to organisation numbers, the system retrieves contact information from multiple sources:

- **Notification addresses for organisations** - official contact points registered by the organisation
- **Personal contact details for organisations** - individual contact points registered by authorised users

Without deduplication, the same recipient would receive multiple identical notifications if their contact information is registered in several of these sources.

## How deduplication works

{{% notice warning  %}}
Deduplication only applies within the same notification (order) and notification channel (SMS or email).

Multiple separate notification orders to the same recipient will result in a corresponding number of separate notifications.
{{% /notice %}}

Deduplication is performed during address lookup before notifications are sent. The process follows these steps:

1. **Collection** - contact points are retrieved from data sources
2. **Normalisation** - all contact points are standardised to comparable formats
3. **Comparison** - contact points that are considered identical are reduced to a single entry
4. **Delivery** - the final set of unique contact points is used for notification delivery


### Format normalisation

Before comparison, contact points are normalised to handle different formats:

#### Mobile numbers
- International formats are standardised (e.g. `+4799999999`, `004799999999`, and `99999999` are treated as identical)

#### Email addresses
- Upper and lower case letters are treated as identical (`eksempel-1@default.digdir.no` and `Eksempel-1@default.digdir.no`)