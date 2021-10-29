---
title: Breaking changes
description: Overview of breaking changes introduced into deployment in v2.0.0
---

1. Rename of deployment object might lead to a downtime equal to the startup time of the application.
2. Default number of replicas changed from 1 to 2 and autoscaling enabled by default (min: 2, max: 10).
If your application cannot run multiple replicas you need to override this in `deployment/values.yaml`
```yaml {hl_lines=[2,4]}
deployment:
  replicaCount: 1
  autoscaling:
    enabled: false
```