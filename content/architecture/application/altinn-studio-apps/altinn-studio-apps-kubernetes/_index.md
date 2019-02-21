---
title: Kubernetes Architecture for Altinn Studio Apps
linktitle: Kubernetes Architecture
description: Kubernetes Architecture for Altinn Studio Apps
tags: ["kubernetes"]
weight: 100
---

## Summary

Each ["ServiceApp"]({{< ref "/about/wordlist" >}}) created in Altinn Studio is deployed
to Altinn Studio Apps as separate applications running in Docker Containers. The containers will be orchestrated by Kubernetes.

## Kubernetes Clusters

Every service owner will have their separate Kubernetes Cluster in each environment.
The Kubernetes Cluster architecture will be the same in test and production environment
This will support scaling tailored each service owners needs.

### Serviceapps

Each Cluster will host several Serviceapps.

### Secrets

Pods gets access to secrets during deployment via HELM charts.

### Altinn Studio Platform Cluster

Altinn Studio Platform applications will be hosted on a separate cluster.

### Automatic scaling

Kubernetes Clusters and Serviceapps can do horizontal autoscaling.

### Kubernetes namespace

It's not planned to use namespaces.

## Networking

### Sub domains

Each service owner will have their own sub domain.

> org.apps.altinn.no

### Path for the service

> org.apps.altinn.no/servicename

### Encrypted traffic and network policy

There is ongoing analysis related to this topic. [Click here to find more information on Github](https://github.com/Altinn/altinn-studio/issues/1000).

### Ingress / Load balancer

Traefik will be used as an Ingree / Load balancer.

