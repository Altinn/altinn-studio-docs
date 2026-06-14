---
title: What's new
description: Overview of changes introduced in v3 of deployment.
toc: true
---

## 3.3.0

* Adds conditional dual stack configuration to service template with IPv4/IPv6 support when ipv6.enabled is true (default).

[View release on Github](https://github.com/Altinn/altinn-studio-charts/releases/tag/deployment-3.3.0)

## 3.2.0

* Change traefik api from traefik.containo.us to traefik.io
* Do not set values for tls config default, use cluster default

[View release on Github](https://github.com/Altinn/altinn-studio-charts/releases/tag/deployment-3.2.0)

## 3.1.0

* Remove default value for image pullsecret. This is no longer needed, cluster handle auth to registry.

[View release on Github](https://github.com/Altinn/altinn-studio-charts/releases/tag/deployment-3.1.0)

## 3.0.1
Bugfix:
* Remove double hpa behavior field in template

[View release on Github](https://github.com/Altinn/altinn-studio-charts/releases/tag/deployment-3.0.1)

## 3.0.0

* Improve horizontal pod autoscaler behavior.

[View release on Github](https://github.com/Altinn/altinn-studio-charts/releases/tag/deployment-3.0.0)
