---
title: Differences
linktitle: Differences
description: Differences in Altinn Correspondence between Altinn 2 and Altinn 3
tags: []
toc: false
weight: 70
---

To simplify the transition from Altinn 2 to the Altinn 3 version of the Correspondence product, the data model and process flow of Altinn 2 Correspondence have been used as a basis, with some simplifications and improvements.

## Here are the main differences

- Altinn 3 Correspondence largely has the same data model as Altinn 2 to enable mapping and migration.
  - The fields for MessageBody and MessageSummary have changed from supporting only text or html to being stored as Markdown. If the content contains HTML it will be rejected.
  - ReplyOptions have been simplified to only be URL + descriptive text, as this is flexible enough to cover the needs that the separate types in Altinn 2 offered.
- Attachments are uploaded streamed and in a separate step before creating the Correspondence.
  - Attachments can be shared across multiple messages to reduce data usage when mass sending the same attachment to many parties.
- The API facilitates mass sending of Correspondences using templates/keywords and recipient lists as well as the mentioned shared attachments.
  - This makes it easy to send 1 request with a list of recipients and create up to 200 Correspondences as a result.
- Notification templates have been greatly simplified from Altinn 2; only a predefined set of templates representing "majority use" are supported, including one highly customizable one.
  - If more advanced functionality is needed, it is encouraged to integrate directly with [Altinn-Notifications](../../../notifications/)
- The process is more asynchronous than before, but publishes Altinn-Events at important process steps so that both end-user systems fetching Correspondences for recipients and the senders of the Correspondences can follow the process without having to poll web services for status.
- All Correspondences are created in the Dialogporten and thus available for Arbeidsflate and other systems that integrate with the Dialogporten, without the sender of the Correspondences needing to perform specific actions.
- The authorization model is somewhat simplified:
  - The right to be a sender can be set in the policy for the "Write" action and is no longer limited to only being the Service Owner.
  - All recipient rights are simplified from Altinn 2's granular "Read, Write, ArchiveRead, ArchiveDelete" to only "Read".

{{<children />}}
