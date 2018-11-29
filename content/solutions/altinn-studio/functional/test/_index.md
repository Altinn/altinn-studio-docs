---
title: Testing
description: In Altinn Studio there will different ways for service developers to test their services
tags: ["studio", "test"]
---

Automatic testing of all Altinn Studio service that is developed will give a positive effect, both on quality and reduced development time
over time.

Altinn Studio will seek to support automatic tests of services. Currently we are looking at TestCafe as framework.

### Manuell testing

Samme [Runtime](../runtime/) som vil kjøre i altinn.no vil også benyttes for testing av tjenester i Designer.
Dette betyr at enhetstesting av UX og API'er vil gi stor grad av sikkerhet,
siden det er samme runtime-koden som vil kjøre både i prod og under utvikling.
En annen positiv effekt er at mer tekniske utviklere faktisk kan gjøre realistisk lokal debugging og stepping i runtime-koden.