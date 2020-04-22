---
title: Platform Operations Management Capabilities
description: Platform Operations Management Capabilities describes the capabilities needed to operate the platform. 
tags: [architecture]
linktitle: Platform Operations
weight: 102
alwaysopen: false
---

## PaaS & IaaS Management Capabilities

### Automation & Scheduling (batch, scripts)
This include running scripts for infrastructure and jobs both manual and scheduled.

See [operations application components](https://docs.altinn.studio/teknologi/altinnstudio/architecture/components/application/nonsolutionspecific/operations/) for details about tools and applications used. 

### Paas & IaaS Configuration & Management
This include the capability to configure all pass and Iaas in the cloud. 

See [operations application components](https://docs.altinn.studio/teknologi/altinnstudio/architecture/components/application/nonsolutionspecific/operations/) for details about tools and applications used. 

### Backup & Recovery
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

[See all details about the backup and recovery components](https://docs.altinn.studio/teknologi/altinnstudio/architecture/components/application/nonsolutionspecific/operations/backupandrecovery/) 


## Performance & Availability Management Capabilities

### Performance Profiling
See [operations application components](https://docs.altinn.studio/teknologi/altinnstudio/architecture/components/application/nonsolutionspecific/operations/) for details about tools and applications used. 

### Performance Tuning
The performance tuning capability for includes tuning of code and architecture to increase performance and capacity. This is typical done based on
metrix that indicates slow performance from

### Availability and Performance Monitoring
This capability include automatic and manuel monitoring of the availability, healt and performance of the different components deployed to the cloud. 

See [operations application components](https://docs.altinn.studio/teknologi/altinnstudio/architecture/components/application/nonsolutionspecific/operations/) for details about tools and applications used. 

### Cloud Capacity Management
The devops team uses differen tools to manage capacity in cloud.

See [operations application components](https://docs.altinn.studio/teknologi/altinnstudio/architecture/components/application/nonsolutionspecific/operations/) for details about tools and applications used. 