---
title: Platform Operations Management Capabilities
linktitle: Platform Operations
description: Platform Operations Management Capabilities describes the capabilities needed to operate the platform. 
tags: [architecture, devops]
toc: false
---

## PaaS & IaaS Management Capabilities

### Automation & Scheduling (batch, scripts)

This include running scripts for infrastructure and jobs both manual and scheduled.

See [operations application components](../../../components/application/nonsolutionspecific/operations/) for details about tools and applications used.

### Infrastructure Configuration & Management

The Altinn 3 platform is a large platform with serveral 100 cloud resources. The architecture provides
serveral capabilityes to configure and manage all of this resource.

See details [here](infrastructuremgmt).

### Backup & Recovery

The Altinn 3 platform has the capability to backup and restore data created by applications hosted in Altinn Apps.

See details [here](backupandrecovery).

## Performance & Availability Management Capabilities

### Performance Profiling

See [operations application components](../../../components/application/nonsolutionspecific/operations/) for details about tools and applications used.

### Performance Tuning

The performance tuning capability for includes tuning of code and architecture to increase performance and capacity.
This is typical done based on metrix that indicates slow performance.

### Availability and Performance Monitoring

This capability include automatic and manuel monitoring of the availability, healt and performance of the different components deployed to the cloud.

See [operations application components](../../../components/application/nonsolutionspecific/operations/) for details about tools and applications used.

### Cloud Capacity Management

The devops team uses differen tools to manage capacity in cloud.

See [operations application components](../../../components/application/nonsolutionspecific/operations/) for details about tools and applications used.

{{<children>}}
