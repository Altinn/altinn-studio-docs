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

## What is Migrated?

- Service delegation / Single-right delegation.
- Instance delegation is currently _not_ supported in Altinn 3, and therefore cannot be migrated or synchronized.

## Automatic Migration and Sync of Delegations

As part of the migration process, service delegation / single-right delegation is migrated and kept synchronized for the _migration resources_.

### Technical Implementation

- A DelegationSync batch job has been created that runs in the Altinn 2 infrastructure every xx minutes.
  - On each run it checks whether there have been changes to delegations since the previous run and sends these over to the Altinn 3 APIs.

## Manual Import of Delegations

It is possible to request a manual import of delegations from an Altinn 2 correspondence service to an Altinn 3 correspondence resource to ease re-establishment.

Note: Make sure a new resource is established in the relevant environment(s) before ordering.

To order a delegation import, send an email:
To: tjenesteeier@altinn.no  
Subject: "Import of delegations from Altinn 2 Correspondence Service to Altinn 3 Resource"  
In the body:
Specify the environments and the time this should be executed, and:
Specify per service: the Altinn 2 service code and edition code that will be the source, as well as the Altinn 3 resource that should receive the imported delegations.
Specify: "Ønsker at saken sendes til Altinn 2 Forvaltning." (Request that the case is sent to Altinn 2 Operations.)

Our technicians will then perform a manual run of the DelegationSync job with the given parameters.

{{<children />}}
