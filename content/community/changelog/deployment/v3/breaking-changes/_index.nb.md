---
title: Breaking changes
description: Oversikt over breaking changes introdusert i deployment i v3.0.0
---

1. autoscaler behavior støtter full konfigurasjon i values.yaml.
Hvis følgende var konfigurert i tidligere versjon, må dette endres til full konfigurasjon.
Standard verdier skal være godt valg for de fleste applikasjoner.
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
~
