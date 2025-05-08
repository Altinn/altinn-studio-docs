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
- Checking the status of a correspondence created in A2 must be done against A2 until it is migrated, and after migration you may check against either A3 or A2.
- For new correspondences created in Altinn 3, integration with Altinn 3 API is required to do the same.

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

- To get a full overview of elements, integration with both Altinn 2 and Altinn 3 API is required.
- When elements are migrated from A2 to A3, it is possible to identify this by the A3 element containing the Altinn 2 Correspondence ID.
  - This makes it possible to exclude any duplicates.
- When the element is migrated, the End-User System can continue working with it through either Altinn 2 or Altinn 3 APIs. Changes to the messages will be syncronized, but be mindful that this may have some latency before the changes are synced.
  - But given that migration occurs after the expected active period, there should be no need.

## Dialogporten and Arbeidsflate

- Altinn 2 elements are not available in Dialogporten until after they have been migrated and a Dialog referencing the element has been created.
- Dialogporten / Arbeidsflate will control when migrated messages become available by calling a dedicated API endpoint in Altinn 3 Correspondence to create dialogs and make the message available.

{{<children />}}
