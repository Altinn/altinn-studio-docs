---
title: Scaling compute resources
linktitle: Scaling Altinn 3
description: Traffic to Altinn varies widely during a year and scaling the compute resources correctly is important for stability and cost
tags: [architecture, infrastructure]
---

The below diagram shows how the number of unique users logged in to Altinn 2 varied through 2019.

![Scalability aa ](scalable.png "Unique users 2019 per day Altinn 2 platform")

Altinn 2 is a monolith where all digital services run on the same servers. This means that for days like the tax day when there is this enormous spike in traffic will require
that all servers are scaled up. It is also a on-prem solution where scaling needs to be planned weeks ahead.

For Altinn 3 the story is completly different. Every organization have their separate Kubernetes cluster. Each of theese cluster can be scaled independently.

### Cluster Autoscaler

Azure Kubernets Services does support autoscaling of nodes and pods. Read more about [cluster autoscaling.](https://docs.microsoft.com/en-us/azure/aks/cluster-autoscaler)

This is currently not been enabled.

### Resource Reservations in Azure Kubernetes Services

Node resources are utilized by AKS to make the node function as part of your cluster. This usage creates a discrepancy between the node's total resources and 
the resources allocatable when used in AKS. This information is important to note when setting requests and limits for user deployed pods.

For Altinn 3 this means the following

- Standard_D2s_v3: 100 millicores reserved per node, 1900 millicores to use
- Standard_D4s_v3: 140 millicores reserved per node, 3860 millicores to use
- Standard_D8s_v3: 180 millicores reserved per node, 7820 millicores to use

Read more about [resource reservations](https://docs.microsoft.com/en-us/azure/aks/concepts-clusters-workloads#resource-reservations)

#### Resource limitations

In Kubernetes it is possible to set

```txt
kind: Pod
apiVersion: v1
metadata:
  name: mypod
spec:
  containers:
  - name: mypod
    image: mcr.microsoft.com/oss/nginx/nginx:1.15.5-alpine
    resources:
      requests:
        cpu: 100m
        memory: 128Mi
      limits:
        cpu: 250m
        memory: 256Mi
```

The standard org clus

Read about best practice for [managing resources in Azure Kubernetes Services](https://docs.microsoft.com/en-us/azure/aks/developer-best-practices-resource-management)

### Scaling org clusters

There are currently [more than 50 orgs](https://www.altinn.no/en/about-altinn/the-altinn-co-operation/) hosting digital services in the Altinn 2 platform. 
They range from Tax Department, Police, the Civil Aviation Authority and many more. Some have digital services used by millions of citizens every year, while
other have digital services used only by 1 person during a year. Some have many digital services while other just 1.

This means that the compute requirements for the different cluster varies a lot between the different orgs.

To examplyfi this we shown the statistics from two different orgs for 3

Org 1




Org 2






#### Scaling option 1

The first option to scale 

#### Scaling option 2
