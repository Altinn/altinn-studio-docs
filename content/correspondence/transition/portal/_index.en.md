---
title: Altinn 2 Portal view
linktitle: Altinn 2 Portal
description: Display of Altinn 3 Messages in Altinn 2 Portal
tags: []
toc: false
weight: 30
---

To quickly have a GUI solution for end users independent of the delivery of Arbeidsflate, the current Altinn 2 portal is extended to fetch and display Altinn 3 Correspondences.
This enables a similar user experience for end users who do not receive Correspondences via end-user systems, by allowing them to access their Correspondences in the same portal and view as before.

The display will be largely similar to the existing display of Altinn 2 Correspondences, and all elements will be shown in the same list, but with some differences.

- No "Archive" button
- Different behavior with delete/trash functionality.

PS: Development and testing are ongoing, so this description may be updated.

## Measures to ensure gradual increase of load

To reduce unnecessary load up-front, the Altinn 2 portal will only call the API endpoints of Altinn 3 Correspondence if a given user/organization has data in Altinn 3 Correspondence.
This is handled by setting a flag per user/organization in the Altinn 2 database when Correspondences are created in Altinn 3 Correspondence.

This is a similar solution to that used for Forms/submission services and Altinn 3 Apps.

This results in a gradual increase in cross-traffic, based on whether data is available from either new services or migrated Correspondences.

## Technical Implementation

- A dedicated endpoint is used in the Altinn 3 Correspondence API that caters to the needs of the Altinn 2 Portal; [Legacy](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Controllers/LegacyCorrespondenceController.cs).
- New display component in the Altinn 2 Portal for fetching Altinn 3 Correspondences.
- New flag in the Altinn 2 database per party: **PartyHasAltinn3Messages** which controls whether the Portal should call Altinn 3 Correspondence when searching.
- Extension of SBLBridge to set **PartyHasAltinn3Messages**.
- Altinn 3 Correspondence calls SBLBridge to set **PartyHasAltinn3Messages** when a Correspondence is created for a user for the first time (including for migrated Correspondences).

{{<children />}}
