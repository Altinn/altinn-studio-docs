---
title: Breaking changes
description: Oversikt over breaking changes introdusert i deployment i v2.0.0
---

1. Endring på navnet til deployment i kubernetes fører til en nedetid opp til tiden applikasjonen bruker på å starte
2. Standard antall replikas ved start er endret fra 1 til 2 og autoskalering påskrudd som standard (min: 2, max: 10)
Hvis din applikasjon kun kan ha en replika må overstyres i `deployment/values.yaml`
```yaml {hl_lines=[2,4]}
deployment:
  replicaCount: 1
  autoscaling:
    enabled: false
```