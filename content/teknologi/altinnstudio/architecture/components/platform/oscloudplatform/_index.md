---
title: Operating Systems & Cloud Platform
description: Operating Systems & Cloud Platform defines the operating systems for containers and how the container are deployed to the cloud
tags: [architecture, infrastructure]
linktitle: OS & Cloud Enablement
weight: 104
alwaysopen: false
---

## Operating systems

### Container Operation Systems
All containers are running on [Alpine Linux](https://alpinelinux.org/), which includes apps created in Altinn Studio and the Altinn Platform components.

## Cloud Platform

### Orchestrating & Sceduling

We use Kubernetes to manage the application containers for the different solutions.

We use Azure Kubernetes Services that is a managed Kubernetes.

### Service Mesh & Proxy

We use Traefik as Proxy in the Kubernetes.

Currently we dont use Service Mest technolgies