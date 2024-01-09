---
title: Authorization
linktitle: Authorization
description: The authorization components provide access management and control functionality for digital and analog services hosted in the Altinn Platform or other places.
tags: [architecture, solution]
toc: false
weight: 1
aliases:
 - /technology/solutions/altinn-platform/authorization/
---

The typical scenario is that some event will be triggered, or data will be read, updated, or created by a digital or analog service. A service owner owns this service and has defined some business rules for who is allowed to use the service.

This service needs to control who can access and modify data.

Altinn Authorization provides the capability to verify and enforce this. 

![User Scenario](userscenario.drawio.svg "User scenario")

Users and organizations get rights to access a service from defined rules and policies.

The below drawing show all aspects that control who and what rights a user or organization has.

![Rules](rules.drawio.svg "Access control aspects")

- Resources - describes the resource a rule applies to. It can be an app, a resource in the resource register, a specific task, or any other sub-resources to an app or resource in the rescource registry.
- Action - describes which action the rules apply to. This can be any action like read, write, sign, fire, Opendoor +++
- Subject - describes who the rules apply to. It can be a role, access group, an organization number or a specific user, and many more
- Obligation - describes additional information like minimum authentication level.
- Condition - Describes additional conditions like the reportee needs to be registered in SRR/RRR for this resource/service.

