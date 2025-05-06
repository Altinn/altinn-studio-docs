---
title: Migration of Delegations
linktitle: Delegation Migration
description: Migration of Delegations for Altinn Correspondence
tags: []
toc: true
weight: 30
---

Delegations of rights can be done in different ways, and if this is not migrated as part of the migration job for messages, the ultimate consequence will be that users lose access to messages.

## Brief Overview of Delegations

- Delegations can occur at the service level (Service Delegation/Single Right Delegation) for specific rights.
- Delegations can occur at the message level (Instance Delegation) for specific rights.
- Delegations can both be granted and revoked.
- This happens continuously during the lifetime of the service and the message.
- There is a difference in the rights models between Altinn 2 Message and Altinn 3:
  - "Read", "Write" => "Read"
  - "ArchiveRead", "ArchiveDelete" => does not exist in A3, will be mapped to "Read"

Based on these facts, it is clear that delegations must be migrated at both the service and instance levels from Altinn 2 to Altinn 3.
Additionally, this cannot be done as a one-time job but must be synchronized when changes occur.

### Technical Implementation

Currently, this is under analysis, but the assumption is that an internal component will be created in the Altinn 2 infrastructure to handle the synchronization.


{{<children />}}
