---
title: Transition solution
linktitle: Transition solution
description: Transition solution for Altinn Correspondence
tags: []
toc: true
weight: 60
---

{{% notice warning  %}}
This section of the documentation is a work in progress.
There are sections with missing or only partial documentation.
Some functionality is still under analysis and development, and does not represent the final production version.
{{% /notice %}}

To simplify the transition from Altinn 2 to the Altinn 3 version of the Correspondence product, an overall strategy has been followed aiming to balance complexity and user-friendliness for all parties.

- Altinn 3 Correspondence largely has the same data model as Altinn 2 to enable mapping/migration.
- All Altinn 2 Correspondences and attachments are migrated into Altinn 3 Correspondence.
- All Altinn 2 Correspondence services with data will be created as Altinn 3 Correspondence services.
- Data/metadata is migrated in a process that also makes the elements available in the Dialogporten and Arbeidsflate.
- Migration of historical data will take time (weeks/months), and the transition solution is built with this in mind.
- Eventually, the migration job will "catch up" with live/fresh data, so the elements can be made available in Altinn 3 shortly after they were created in Altinn 2.
- To become independent of the production date for the new Arbeidsflate, Altinn 3 Correspondences are made available in the Altinn 2 Portal for end users.
- No transition solution is made for API endpoints:
  - End-user systems and Service Owner systems must maintain integration with both Altinn 2 and Altinn 3 during a transition period.

## Overall Process flow

TODO: Short version of process flow with diagrams.

{{<children />}}
