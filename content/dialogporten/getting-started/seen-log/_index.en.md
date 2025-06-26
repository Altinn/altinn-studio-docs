---
title: 'Seen Log'
description: 'Learn about how Dialogporten automatically populates a seen log'
weight: 70
---

## Introduction

The seen log contains timestamped information about who has "seen" a dialog at a particular revision. "Seen" in this context means has requested a particular dialog ID from the API. Using the search/list API does not cause the seen log to be populated. 

## Usage

The seen log is populated automatically by Dialogporten, and cannot be altered by neither service owners or end users. This information can be used to give hints about which users has accessed a particular dialog, but does not give information on whether or not content within the dialog has been read and understodd, attachments downloaded or if there has been any actions performed. For this kind of information, see the [activity log]({{<ref "../activity-log">}}).

Seen log entries are recorderd per user per change. This means that for any particular revision of the dialog, only the first access for any given user is recorded. If the dialog is updated by the service owner, a new entry for the same user will be created when/if the dialog is subsequently accessed.

GUIs will normally utilize the seen log entries made after the latest update. However, a full seen log is also made available, making it possible to correlate (the immutable) activity log/transmission entries with seen log entries.

## Relation to events

Whenever a seen-log entry is created, an event is produced and made available for all authorized event consumers. See the techinical reference for more information about event type and information made available in the event body.

**Read more**

* [Learn about the activity log]({{<ref "../activity-log">}})
* [Techninal reference for the seen log entity](<{{<ref "../../reference/entities/seen">}}>)

{{<children />}}

