---
title: Breaking changes
description: Overview of breaking changes introduced into deployment in v3.0.0
---

1. autoscaler behavior now have full config in values.yaml.
If following values was used in previous version, this need to be updated to full config.
Default values should be good for most cases.
```yaml {hl_lines=[4,5,6]}
# old values.yaml
autoscaler:
  behavior:
    stabilizationWindowSeconds:
      scaleUp: 0
      scaleDown: 120 
```
```yaml
# new values.yaml
autoscaler:
  behavior:
    stabilizationWindowSeconds:
      scaleUp: 0
      scaleDown: 120
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Pods
        value: 1
        periodSeconds: 15
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Pods
        value: 1
        periodSeconds: 60
```
