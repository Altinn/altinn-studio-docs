---
title: 'Seen Log'
description: 'Learn how Dialogporten automatically populates a seen log'
weight: 70
---

## Introduction

The seen log contains timestamped information about who has "seen" a dialog at a particular revision. "Seen" in this context means that a particular dialog ID has been requested from the API. Using the search or list API does not cause the seen log to be populated.

## Usage

The seen log is populated automatically by Dialogporten, and cannot be altered by either service owners or end users. This information can be used to give hints about which users have accessed a particular dialog, but does not say whether content within the dialog has been read and understood, whether attachments have been downloaded, or whether any actions have been performed. For this kind of information, see the [activity log]({{<ref "../activity-log">}}).

Seen log entries are recorded per user per change. This means that for any particular revision of the dialog, only the first access for any given user is recorded. If the dialog is updated by the service owner, a new entry for the same user will be created if the dialog is subsequently accessed.

GUIs will normally use the seen log entries made after the latest update. However, a full seen log is also available, making it possible to correlate the immutable activity log and transmission entries with seen log entries.

## Relation to events

Whenever a seen-log entry is created, an event is produced and made available to all authorized event consumers. See the technical reference for more information about the event type and the information made available in the event body.

**Read more**

* [Learn about the activity log]({{<ref "../activity-log">}})
* [Technical reference for the seen log entity](<{{<ref "../../reference/entities/seen">}}>)

{{<children />}}
