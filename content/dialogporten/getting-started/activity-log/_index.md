---
title: 'Activity Log'
description: 'Learn about how Dialogporten provides a activity log for each dialog'
weight: 80
---

## Introduction

The activity log is a service owner populated log with high level information about past activities related to a particular dialog.

## Usage

The activity log is a immutable list of timestamped entries, each of a particular type, that shows the history of a particular dialogs lifetime. The various types define a particular activity, such as the creation of the dialog, a message being sent from the service owner, data being submitted by the party, a signature or payment made, a transmission being opened etc. For an exhaustive list of the various activity type, see the technical reference.

The service owner is responsible for populating the activity log, and should do so in relation to other changes made to the dialog. Activity log entries can refer to a particular transmission, eg. when it is opened and/or confirmed read.

{{<notice info>}}
The act of _adding_ transmissions should not be accompanied with a activity log entry, as the transmission list is immutable and thus acts as a log itself. Frontends should aggregate the activity log, transmission list and seen log in order to build a full chronology of the dialogs history
{{</notice>}}

The activity log can be queried via API, and can be used when creating conditional [notification orders]({{<ref "../../../notifications">}}), ie. when creating reminders.

## Read more
* [Techical reference for the activity log entity]({{<ref "../../reference/entities/activity">}})
* [Service owner user guides]({{<ref "../../reference/entities/activity">}})
* [Notification product documentation]({{<ref "../../../notifications">}})

{{<children />}}

