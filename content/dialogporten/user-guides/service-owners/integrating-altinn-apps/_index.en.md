---
title: 'Integrating Altinn Apps'
description: 'How to override or enrich the automatic Dialogporten integration from your app'
weight: 50
---

## Introduction

Altinn Apps are automatically synchronized with Dialogporten. Every time a new
instance is created, the dialog service will create or update a corresponding
dialog that is visible to the end user in Altinn Inbox ("arbeidsflate"). This
guide explains how the default behaviour can be adjusted and how you can take
full control over the integration if needed.

## Automatic dialog synchronization

By default, the synchronization is enabled for all applications. Updates to the
instance, such as status changes, added activities or attachments, will be
reflected in Dialogporten. The behaviour can be tuned in the app settings. See the 
reference information linked below for details.

**Read more**
* {{<link "../../../reference/front-end/altinn-apps">}}


## Using the Dialogporten WebAPI SDK

Some scenarios require more control than the automatic synchronization offers.
The [Dialogporten WebAPI SDK](https://github.com/Altinn/dialogporten/tree/main/src/Digdir.Library.Dialogporten.WebApiClient)
gives your application programmatic access to Dialogporten so you can create and
update dialogs yourself. This enables fine-grained handling of activities,
transmissions and synchronization with Altinn Inbox.
