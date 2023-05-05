---
title: Events API
linktitle: Events
description: Platform API for hendelser.
toc: true
tags: [api, translate-to-norwegian]
---

## Overview

Events are in this context is information about events created by applications or other sources. The event itself is based on the CloudEvent standard and is
a small JSON structure containing the most important information of an event. Details are found [here](/events/#what-is-an-event).

The events APIs are used to access events created by applications in Altinn Apps and other event sources that use Altinn Platform as
av "event hub". 

## Subscription

The highly preferred way to use events is to set up a subscription that enables push of events to a webhook-endpoint.
This is done through the subcriptions API. This API supports the following consumers

- Persons, authenticated through ID-porten
- Orgs, authenticated through Maskinporten

The subscriptions API is described [here](./spec) as Swagger.

The webhook endpoint needs to be able to accept cloud event that is posted through HTTPS to the endpoint URL.

The push functionality also supports pushing events to Slack. Other platforms might be added at a later point.

## Search API

The search allows searching for events. The storage of events is limited to 90 days.

This is available to be used by the following consumers.

- Persons, authenticated through ID-porten
- Orgs, authenticated through Maskinporten

The API is described in swagger [here](./spec).





