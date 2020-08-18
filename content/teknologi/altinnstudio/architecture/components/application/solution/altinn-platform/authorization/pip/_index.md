---
title: Policy Information Point
linktitle: PIP
description: Description of Policy Information Point for Altinn Platform.
tags: [architecture, security]
---

A Policy Information Point is a component that is used by the Context Handler to enrich the decision request
with the needed attributes so that the Policy Decision Point can evaluate the decision request against the relevant policy for a decision request.

For the Altinn Platform there are serveral Policy Information Points:

- Altinn II Authorization - Get information about roles a user or system has for a given party
- Storage PIP - Get attributes about the resource in the decision request 
- Register PIP - Possible information about the party (is he still alive?)
- Other Register - Roles/claims stored other places than in Altinn

The exact number of PIPs are work in progress.
