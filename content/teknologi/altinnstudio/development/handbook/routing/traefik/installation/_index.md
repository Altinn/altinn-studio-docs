---
title: Installation of Traefik 2.0
description: How to install traefik
tags: [development, routing, traefik, installation]
weight: 100
---

Installation of traefik is done through helm, and we have a traefik helm chart for Altinn Tjenester 3.0.

If there is a fresh installation of traefik 2.0 with helm 3.0, make sure that there is a folder called `crds` in that helm chart folder.
After that it is just to install with helm, and wait for the traefik service to have a public IP before updating the Azure DNS zone with a A record.
