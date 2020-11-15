---
title: Backup & Recovery
linktitle: Backup & Recovery
description: As part of the Altinn 3 platform architecture we use different tools to have the capability to backup & restore data
tags: [architecture]
toc: false
---

It is important to reduce the risk of losing data on the platform. The risks that are identified are

- Data is deleted by accident by DevOps team or by wrongly configured jobs
- Data is corrupted by bugs in platform or application code
- Data is accidentally corrupted or deleted by end-users or systems
- A storage account is deleted
- Blob storage is deleted
- Cosmos DB collection is accidentally deleted

In Altinn Platform different types of data is stored

#### Cosmos DB

- Instances: Metadata about instances created
- InstanceEvents
- DataElements
- Applications

#### Blob Storage

- Data for data elements (structured and unstructured data, small to potential gigabytes of data)
- XACML Policy for applications

The requirement is that we are able to restore data up to 90 days.
The platform support this requirement for all types of data listed above.

[See all details about the backup and recovery components](/teknologi/altinnstudio/architecture/components/application/nonsolutionspecific/operations/backupandrecovery/).
