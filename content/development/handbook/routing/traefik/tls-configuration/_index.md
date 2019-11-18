---
title: TLS in Traefik 2.0
description: How to set up TLS
tags: [development, routing, traefik, tls]
weight: 100
---

#### TLS sertificates stored as secrets on the cluster

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: altinn-tls-secret
data:
  tls.crt: [[BASE 64 ENCODED CERTIFICATE]]
  tls.key: [[BASE 64 ENCODED PRIVATE KEY]]
```

#### TLS Options

To set up TLS options we need to use the custom resource TLSOption. A basic set up of this is:

```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: TLSOption
metadata:
  name: altinn-tls-options
  namespace: default
spec:
  minVersion: VersionTLS12
```

#### Adding TLS to an Ingress Route

Add a tls attribute to the spec if the ingress route, with secretName (secret that contains the TLS certificate and private key) and optionally
a `options`-attribute with the name of the TLSOption we made and the namespace (if nothing is specified when creating the secret it would be in the `default` namespace).

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
  tls:
    secretName: altinn-tls-secret
    options: #Optional
      name: altinn-tls-options
      namespace: default
```
