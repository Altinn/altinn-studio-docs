---
title: Kubernetes
description: Kubernetes is used to manage the docker containers. 
tags: [tech, containers]
---

![Kubernetes logo](kubernetes.png?width=200)

Kubernetes is described as container orchitrastion. That means how containers are run,
exposed and all other operations that might be done on a container.

Both Altinn Studio and Altinn Studio Apps consists of many different applications
running in docker containers. For the Altinn Studio Apps solution this could possible
over time be many thousands containers running different end user apps.  

Kubernetes is used to manage the containers.  

### Kubernetes definitions

Kubernetes contains definitions for most of the usecases for containers
and can easily be extended with custom resource definitions.

#### [Pods](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/)

Pods are the building blocks of kubernetes. They will crash, be deleted and started up again.
But they will never be restored. After they either crash or get deleted, they will ble replaced with a new pod, with it's own configuration of IP adresses.

#### [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)

A replicaset defines how many copies of a pod is desired to run at any time.

#### [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

Deployments are controllers for pods, they declare different properties a pod should have, and how many replicas of the pod should be running.  
Properties a pod can have is:

* Environment variables and values
* Image and image-tag
* What names the pods should have (they will inherrit the name from the deployment and then a ID that makes the unique)
* Volume mounts, if they are from secrets or persistent volume claims

#### [Services](https://kubernetes.io/docs/concepts/services-networking/service/)

Services are an abstraction of a set of pods and how to access them. There are various methods of exposing a pod, here are the different types of services:

* ClusterIP (Internal) - Default service definition
* NodePort (External) - Exposes the nodes static ip
* LoadBalancer (External) - Exposes the service through a cloud-providers loadbalancer ip
* ExternalName (External) - Exposes the service through a cloud-providers loadbalancer ip with a CNAME entry


#### [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)

An ingress almost like a service, but not. A ingress exposes an entrypoint to your
cluster through domains. Imagine it as a layer between external traffic coming
in and services routing trafic to services and down the line to the pods. An ingress
needs an ingress controller (i.e. traefik) which extends functionality such as rules
for routing, middlewares and authorization. More on this in the documentation
about traefik and how we use it in altinn tjenester 3.0.

#### [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)

A secret is one or more key-value pairs that is stored on in the cluster and can be access from within the cluster.  
Secrets are base64 encrypted so it is possible to store binary files as secrets aswell.


#### [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)

Persistent volumes, as the name suggests it is used to manage persistent storage volumes. In altinn.studio we use persistent volume claims,  
and since we're using a Azure managaged kubernetes cluster, azure sets up virtual disks in the kubernetes cluster resource group.

#### [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)

Namespaces are intended for use in environments with multiple users spread across multiple teams or project.  
Namespaces provide a scope for names.

#### [Node](https://kubernetes.io/docs/concepts/architecture/nodes/)

A node is either a physical machine or a virtual one. They are used as workers for hosting different kubernetes resources.

#### Cluster

A cluster is a set of virtual machines with various hardware setup.


## Links

- https://kubernetes.io
- https://github.com/kubernetes/kubernetes
