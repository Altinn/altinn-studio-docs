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
All containers is running on [Alpine Linux](https://alpinelinux.org/), which includes apps created in Altinn Studio and the Altinn Platform components.

## Cloud Enablement Sofware

### Orchestrating & Sceduling

We use Kubernetes to manage the application containers for the different solutions.

We use Azure Kubernetes Services that is a managed Kubernetes.

### Service Mesh & Proxy

We use Traefik as Proxy in the Kubernetes.

Currently we dont use Service Mest technolgies