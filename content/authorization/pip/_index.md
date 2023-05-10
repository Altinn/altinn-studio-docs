---
title: Policy Information Point
linktitle: PIP
description: The Policy Information Point(s) are responsible for providing needed information to the context handler so it can enrich the context request.
tags: [architecture, security]
weight: 1
---

Without this information it would be impossible for the PDP to evaluate the context request in many scenarios.

For the Altinn Platform there are serveral Policy Information Points:

- Altinn II Authorization - Get information about roles a user or system has for a given party
- Storage PIP - Get attributes about the resource in the decision request. (what kind of app, who is the reportee of the data, what is the current process state)

The number of PIP are expected to grow in the future.

### Implementation details

See implementation details in the [construction components for PIP](/technology/architecture/components/application/construction/altinn-platform/authorization/accesscontrol/#policy-information-point---roles).