---
title: Traefik ingress routes
description: How to set up an ingress route and route trafic based on rules and middlewares
tags: [development, routing, traefik, ingress routes, ingress]
weight: 100
---

Before traefik 2.0 the only supported way of routing in kubernetes was through the Kubernetes Ingress prodvider, which limited the functionality traefik could offer.

As a result of introducing the custom resource IngressRoutes in traefik 2.0 we don't need to write many annotations on the ingress. And it is easier to configure access to a kubernetes cluster.

### Resource configuration

```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: altinn-runtime
spec:
  entryPoints:
    - web
    - websecure
  routes:
    - match: Host(`dev.altinn.studio`)
      # priority: 25
      kind: Rule
      services:
        - name: altinn-runtime
          port: 5005
```

This is the simplest service to port over to traefik 2.0 within Altinn Studio. Since it is the "default" route if nothing else matches (routes for `/repos` or `/designer`).

Pay close attencion to the **priority**-field. If nothing is specified it will be the length of the string in the **match**-field. So longer rules are higher prioritized.

### Routing Middlewares

In the earlier example we can hook up **middlewares**. You can define middlewares in this format:

```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: fetch-cookie-and-redirect
spec:
  replacePath:
    path: /Redirect/FetchCookieAndRedirectHome/

```

This example is for when the designer fetches cookies and redirects to "/home".

The different specs can be found in the [traefik docs](https://docs.traefik.io/middlewares/overview/).

So first create a middleware resource in kubernetes and then you can use it in the ingressRoute like this

```yaml
name: altinn-designer-root
namespace: default
entrypoints:
  - web
routes:
  - match:
      local: Host(`altinn3.no`) && Path(`/`)
      dev: Host(`dev.altinn.studio`) && Path(`/`)
      staging: Host(`staging.altinn.studio`) && Path(`/`)
      prod: Host(`altinn.studio`) && Path(`/`)
    kind: Rule
    strategy: RoundRobin
middlewares: []
- name: altinn-designer-home
namespace: default
entrypoints:
  - web
routes:
  - match:
      local: Host(`altinn3.no`) && PathPrefix(`/Home`)
      dev: Host(`dev.altinn.studio`) && PathPrefix(`/Home`)
      staging: Host(`staging.altinn.studio`) && PathPrefix(`/Home`)
      prod: Host(`altinn.studio`) && PathPrefix(`/Home`)
    kind: Rule
    strategy: RoundRobin
middlewares: []
- name: altinn-designer-designer
namespace: default
entrypoints:
  - web
routes:
  - match:
      local: Host(`altinn3.no`) && PathPrefix(`/designer`)
      dev: Host(`dev.altinn.studio`) && PathPrefix(`/designer`)
      staging: Host(`staging.altinn.studio`) && PathPrefix(`/designer`)
      prod: Host(`altinn.studio`) && PathPrefix(`/designer`)
    kind: Rule
    strategy: RoundRobin
middlewares: []
- name: altinn-designer-repos
namespace: default
entrypoints:
  - web
routes:
  - match:
      local: Host(`altinn3.no`) && (Path(`/repos/`) || Path(`/repos`))
      dev: Host(`dev.altinn.studio`) && (Path(`/repos/`) || Path(`/repos`))
      staging: Host(`staging.altinn.studio`) && (Path(`/repos/`) || Path(`/repos`))
      prod: Host(`altinn.studio`) && (Path(`/repos/`) || Path(`/repos`))
    kind: Rule
    strategy: RoundRobin
middlewares:
  - name: fetch-cookie-and-redirect
```

At the last entry in the routes element uses the middleware. It references the middleware by name.
