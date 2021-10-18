---
title: Breaking changes
description: Overview of breaking changes introduced into deployment in v2.0.0
---

1. Rename of deployment object might lead to a downtime equal to the startup time of the application.
2. Default number of replicas changed from 1 to 2. If your application cannot run multiple replicas you need to override this (deplyoment.replicaCount=1)
3. Autoscaling enabled by default (min: 2, max: 10). If your application cannot run multiple replicas you need to disable this (deployment.autoscaling.enabled=false)
