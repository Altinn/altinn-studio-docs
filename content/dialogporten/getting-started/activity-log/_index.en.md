---
title: 'Activity Log'
description: 'Learn how Dialogporten provides an activity log for each dialog'
weight: 80
---

## Introduction

The activity log is a service-owner-populated log with high-level information about past activities related to a particular dialog.

## Usage

The activity log is an immutable list of timestamped entries, each of a particular type, that shows the history of a particular dialog's lifetime. The various types define specific activities, such as the creation of the dialog, a message being sent from the service owner, data being submitted by the party, a signature or payment being made, or a transmission being opened. For an exhaustive list of the various activity types, see the technical reference.

The service owner is responsible for populating the activity log, and should do so in relation to other changes made to the dialog. Activity log entries can refer to a particular transmission, e.g., when it is opened and/or confirmed as read.

{{<notice info>}}
The act of _adding_ [transmissions](/en/dialogporten/getting-started/activity-log/../dialogs#transmissions) should not be accompanied by an activity log entry, as the transmission list is immutable and thus acts as a log itself. Frontends should aggregate the activity log, transmission list, and seen log in order to build a full chronology of the dialog's history.
{{</notice>}}

The activity log can be queried via API, and can be used when creating conditional [notification orders]({{<ref "../../../notifications">}}), i.e., when creating reminders.

**Read more**
* [Technical reference for the activity log entity]({{<ref "../../reference/entities/activity">}})
* {{<link "../../user-guides/service-owners/creating-dialogs">}}
* [Notification product documentation]({{<ref "../../../notifications">}})

{{<children />}}
