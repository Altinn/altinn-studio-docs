---
title: Infrastructure configuration & management
linktitle: Infrastructure mgmt
description: For a platform like Altinn 3, it is important to have good tools and processes when it comes to configuration and management of infrastructure.
tags: [architecture, infrastructure, devops]
toc: false
---

Over time it is expected that the Altinn 3 platform would consist of hundreds of Kubernetes clusters and other cloud resources.

To be able to manage and configure all these cloud resources the architecture that is selected has several capabilities enabled with help of various tools and processes.

## Tools & components

For all solutions of Altinn 3 (Altinn Apps, Altinn Platform and Altinn Studio) we use some common tools to configure and manage infrastructure.

Currently all resources are located in [Microsoft Azure](https://azure.microsoft.com/).

We use [Terraform](https://www.terraform.io/) to define the [infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_code). Terraform allows to write declarative configuration files
defining the infrastructure we use in the different solutions.

We use the [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest) that allows lifecycle management of
Microsoft Azure using the Azure Resource Manager APIs. This is a provider maintained by the Azure team at Microsoft and the Terraform team at HashiCorp.

We use [Azure Devops Repos](https://azure.microsoft.com/services/devops/repos/) to store our Terraform scripts for the different solutions.
We use [Azure Devops Pipelines](https://azure.microsoft.com/services/devops/pipelines/) to run the Terraform scripts.

## Provision of new environemnts

### Altinn Apps

Each org have their own Altinn Apps environment both for test and production. When a org sign up for using Altinn 3 the DevOps team
will provision a Altinn Apps environment for that organization.

- K8 Cluster with the defined set of nodes and node size
- Storage account for org used to store data from apps
- Container register for apps created in Altinn Studio
- KeyVault for secrets used by apps
- Network setup
- Kubernetes wrapper for monitoring status of the different applications in the apps cluster
- Traefik loadbalancer

### Altinn Platform

Each Altinn 3 environment (production, performance test, test, acceptence test) has their own Altinn Platform solution.

This is based around a Kubernetes cluster and serveral components running in this. 

The following cloud components is configured

- Kubernetes Cluster
- Network
- API managment
- Platform storage
- PostgresSQL server
- Cosmos DB
- Traefik loadbalancer
- 

### Altinn Studio



## Patching environments

Kured

## PaaS & IaaS Management Capabilities

### Automation & Scheduling (batch, scripts)

This include running scripts for infrastructure and jobs both manual and scheduled.

See [operations application components](../../../components/application/nonsolutionspecific/operations/) for details about tools and applications used. 

### Paas & IaaS Configuration & Management

This include the capability to configure all PaaS and IaaS in the cloud.

See [operations application components](../../../components/application/nonsolutionspecific/operations/) for details about tools and applications used. 