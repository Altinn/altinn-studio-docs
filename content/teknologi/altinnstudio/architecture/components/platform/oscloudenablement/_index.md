---
title: Operating Systems & Cloud Enablement
description: Operating Systems & Cloud Enablement defines the operating systems for containers and how the container are deployed to the cloud
tags: [architecture, infrastructure]
linktitle: OS & Cloud Enablement
weight: 104
alwaysopen: false
---

## Operating systems

### Container Operation Systems
The containers is the following Operating Systems

- [Alpine Linux](https://alpinelinux.org/) for Altinn Platform components based on .Net Core, Altinn Studio components based on .Net Core and apps created in Altinn Studio
- Linux for PDF components in Altinn Platform
- Linux for Gitea in Altinn Studio (we use standard docker file)

## Cloud Enablement Sofware

### Orchestrating & Sceduling

We use Kubernetes to manage the application containers for the different solutions. 

We use Azure Kubernetes Services that is a managed Kubernetes. 

### Service Mesh & Proxy

We use Traefik as Proxy in the Kubernetes.

Currently we dont use Service Mest technolgies

