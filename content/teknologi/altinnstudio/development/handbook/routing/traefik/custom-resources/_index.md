---
title: Traefik custom resources
description: Definitions for traefik 2.0 custom resources in kubernetes
tags: [development, routing, traefik, custom resources, crds]
weight: 100
---

**IMPORTANT** These resources have to be installed before creating any of the resources they describe. They are most likely installed with helm when installing traefik 2.0.

To support new features in routing and middlewares with IngressRoutes and dynamic tls options, traefik supplies it's own kubernetes custom resources [defined in the traefik docs](https://docs.traefik.io/reference/dynamic-configuration/kubernetes-crd/).
These are:

```yaml
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: ingressroutes.traefik.containo.us
spec:
  group: traefik.containo.us
  version: v1alpha1
  names:
    kind: IngressRoute
    plural: ingressroutes
    singular: ingressroute
  scope: Namespaced
---
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: middlewares.traefik.containo.us
spec:
  group: traefik.containo.us
  version: v1alpha1
  names:
    kind: Middleware
    plural: middlewares
    singular: middleware
  scope: Namespaced
---
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: tlsoptions.traefik.containo.us
spec:
  group: traefik.containo.us
  version: v1alpha1
  names:
    kind: TLSOption
    plural: tlsoptions
    singular: tlsoption
  scope: Namespaced
---
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: ingressroutetcps.traefik.containo.us
spec:
  group: traefik.containo.us
  version: v1alpha1
  names:
    kind: IngressRouteTCP
    plural: ingressroutetcps
    singular: ingressroutetcp
  scope: Namespaced
```

They will extend the types of resources you can have on your cluster.
