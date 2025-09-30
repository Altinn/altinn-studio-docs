---
title: Operating Systems & Cloud Platform
linktitle: OS & Cloud Platform
description: Operating Systems & Cloud Platform defines the operating systems for containers and how the container are deployed to the cloud.
tags: [architecture]
---

## Operating systems

### Container Operation Systems
All containers are running on [Alpine Linux](https://alpinelinux.org/), which includes apps created in Altinn Studio and the Altinn Platform components.

## Cloud Platform

### Orchestrating & Sceduling

We use Kubernetes to manage the application containers for the different solutions.

We use Azure Kubernetes Services that is a managed Kubernetes administration in Azure.

Read more about our [Kubernetes Clusters](kubernetes).

### Service Mesh & Proxy

We use [Traefik](https://traefik.io) as proxy in Kubernetes and [Linkerd](https://linkerd.io/) as service mesh.

{{<children />}}
