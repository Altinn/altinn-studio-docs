---
title: Consequences
linktitle: Consequences
description: Consequences for the Parties using Altinn Correspondence
tags: []
toc: true
weight: 40
---

Here is a brief summary of the consequences of the chosen transition and migration solution for the different parties:

## Service Owner

- When creating the Correspondence in the API, the Correspondence is created in the environment being called ("home" of the element).
  - If in A2, migration will occur to A3 after **migration wait time**, but notification will be completed in A2 regardless of migration.
  - If in Altinn 3, the Correspondence will be available in the Altinn 2 Portal.
- Checking the status of a Correspondence created in A2 must be done against A2 and possibly then against A3 after migration.
  - Since migration is performed after **migration wait time**, it is assumed that the Service Owner does not need to check for the same element in both A2 and A3, but that changes of interest have already occurred in A2.
- Integration with Altinn 3 API is required to create/follow up on new Correspondences there.
  - They can use the migrated services or establish entirely new ones.

## End Users

### Via Altinn 2 portal

- Will get a full overview in the Altinn portal of both Altinn 2 and 3 elements.
- When they open an Altinn 3 element, it is displayed in the Altinn 2 Portal, similar to an Altinn 2 element.

### Via End-User System

- Altinn 3 Correspondences will be available once the End-User System has integrated with A3.

### Via Arbeidsflate

- Will get Correspondences created in Altinn 3, as well as those that have been migrated from Altinn 2.
- Correspondences in Altinn 2 that have not been migrated **will not be available** since Arbeidsflate is based on Dialogporten, and Altinn 2 messages are not available in Dialogporten.

## End-User System

- To get a full overview of elements, integration with both Altinn 2 and Altinn 3 API is required.
- When elements are migrated from A2 to A3, it is possible to identify this by the A3 element containing the Altinn 2 Correspondence ID.
  - This makes it possible to exclude any duplicates.
- When the element is migrated, the End-User System must be integrated with the Altinn 3 API to continue working with it.
  - But given that migration occurs after the expected active period, there should be no need.

## Dialogporten and Arbeidsflate

- Altinn 2 elements are not available in Dialogporten until after they have been migrated and a Dialog referencing the element is created.
- By reducing the **migration wait time**,  migration can occur relatively quickly after Correspondences are created in Altinn 2, and thus make them available in Dialogporten and Arbeidsflate.

{{<children />}}
