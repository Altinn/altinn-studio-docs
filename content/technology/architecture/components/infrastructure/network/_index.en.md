---
title: Network componentens
linktitle: Network
description: All networking infrastructure is located in Azure.
toc: true
tags: [architecture, infrastructure, todo]
---


Altinn 3 is based on different network components in Azure.


## Virtual Network

As part of the Altinn 3 platform there is serveral Virtual Networks.  Each Kubernetes Cluster have their own Virtual Network.

This increases security and isolates the different org cluster from eacother.

Read more about [Azure Virtual Networks](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview).

## Azure Loadbalancer

In front of every AKS cluster there is a Azure Loadbalancer that load traffic between the different nodes in the AKS cluster.

Read more about [Azure Load Balancer](https://azure.microsoft.com/en-us/services/load-balancer/)

## Application Gateway

Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications. Traditional load balancers operate at the transport layer (OSI layer 4 - TCP and UDP) and route 
traffic based on source IP address and port, to a destination IP address and port.

In Altinn 3 we use Application gateways in front of Azure Loadbalancers.

Read more about [Azure Application Gateway](https://docs.microsoft.com/en-us/azure/application-gateway/overview)

## Ingress controller

We use Traefik as [ingress controller](https://kubernetes.io/docs/concepts/services-networking/ingress/) in the different Kubernetes Clusters.

## ExpressRoute

We use Express route for high performence networking between our Altinn 3 platform and the on-premise Altinn 2 platform.

Read more about [ExpressRoute](https://docs.microsoft.com/en-us/azure/expressroute/expressroute-introduction)