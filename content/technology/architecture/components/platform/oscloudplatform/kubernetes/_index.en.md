---
title: Kubernetes
description: Kubernetes is a central part of the infrastructure in Altinn 3.
tags: [architecture]
---

[Kubernetes](https://kubernetes.io/) is choosen to orchestrate the containers in the different solutions.
There are serveral Kubernetes Clusters involved.

The solution uses managed Kubernetes Clusters, Azure Kubernetes Services.

## Setup
We use Azure CLI to setup the different Kubernetes Clusters. (Altinn Studio, Altinn Apps and Altinn Platform).

This include networking and node setup.

## Management & monitoring
From the Azure Portal we can manage and montitor the Kubernetes Clusters.

### Nodes
We can scale up and down Nodes.

### Containers
We get monitor the number of containers and state of containers.
