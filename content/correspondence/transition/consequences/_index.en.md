---
title: Consequences
linktitle: Consequences
description: Consequences for the Parties using Altinn Correspondence
tags: []
toc: true
weight: 60
---

Here is a brief summary of the consequences of the chosen transition and migration solution for the different parties:

## Service Owner

- When creating the correspondence in the API, the correspondence is created in the environment being called ("home" of the element).
  - If created in Altinn 2, migration will occur to Altinn 3 shortly thereafter, but notification will be completed in A2 regardless of migration.
  - If in Altinn 3, the correspondence will be available in the Altinn 2 Portal.
    - A3 correspondences will not be available via A2 API.
- Checking the status of a correspondence created in A2 must be done against A2 until it is migrated, and after migration you may check against either A3 or A2.
  - We recommend you start using Altinn 3 APIs as soon as possible, and when the [CorrespondenceSync](/en/correspondence/transition/data-migration/#synchronization-of-status-changes-between-altinn-2-and-3) solution is live, you should avoid using Altinn 2 APIs.
- For new correspondences created in Altinn 3, integration with Altinn 3 API **is required** to do the same.

## End Users

### Via Altinn 2 portal

- Will get a full overview in the Altinn portal of both Altinn 2 and 3 elements.
- When they open an Altinn 3 element, it is displayed in the Altinn 2 Portal, similar to an Altinn 2 element.

### Via End-User System

- Altinn 3 correspondences will be available once the End-User System has integrated with A3.

### Via Arbeidsflate

- Will get correspondences created in Altinn 3, as well as those that have been migrated from Altinn 2.
- Correspondences in Altinn 2 that have not been migrated **will not be available** since Arbeidsflate is based on Dialogporten, and Altinn 2 messages are not available in Dialogporten.

## End-User System

- To get a full overview of elements, integration with **both** Altinn 2 and Altinn 3 API is required.
- When elements are migrated from A2 to A3, it is possible to identify this by the A3 element containing the Altinn 2 Correspondence ID/ReporteeElementId/AR.
- When the element is migrated, the End-User System can continue working with it through either the Altinn 2 or Altinn 3 APIs. Changes to the messages will be synchronized, but be mindful that there may be some latency before the changes are synced.
- The EUS must ensure that they handle the migrated messages in a controlled fashion, and that they do not interact with both the Altinn 2 or Altinn 3 version of the element.
  - We recommend that as soon as the [CorrespondenceSync](/en/correspondence/transition/data-migration/#synchronization-of-status-changes-between-altinn-2-and-3) solution is live, that you stop using Altinn 2 APIs, and use solely Altinn 3 APIs.

## Dialogporten and Arbeidsflate

- Altinn 2 elements are not available in Dialogporten until after they have been migrated and a Dialog referencing the element has been created.
- Dialogporten / Arbeidsflate will decide when the migrated messages become available, and Team Melding og Formidling will be responsible for the technical implementation in Altinn 3 Correspondence to create dialogs and make the message available.
- During the phase "Ongoing migration and availability of messages", the migration component for message data will automatically create the dialog as part of the operation to migrate fresh messages to Altinn 3 Correspondence.

{{<children />}}
