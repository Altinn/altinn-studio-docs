---
title: Service Test
linktitle: Service Test
description: In Altinn Studio there will different ways for service developers to test their services
tags: ["tjenester 3.0", "Test"]
weight: 111
---



### Automatisk testing

Automatisert testing av alle 3.0-tjenester som utvikles vil gi en veldig positiv effekt, både på kvalitet og redusert tidsbruk
over tid. Det å ha en [datamodell](#modellere-data) gjør at det blir enklere å f.eks. automatisk generere opp initielle tester, og
detektere tester som er blitt ugyldige.

- Legge opp til automatisert testing av alle tjenester
- Selenium / API ?

Dette er et område som ikke ble sett på i PoC.

{{<figure src="testing.png?width=1000" title="Editor for automatisert testing">}}


### Manuell testing

Samme [Runtime](../runtime/) som vil kjøre i altinn.no vil også benyttes for testing av tjenester i Designer.
Dette betyr at enhetstesting av UX og API'er vil gi stor grad av sikkerhet,
siden det er samme runtime-koden som vil kjøre både i prod og under utvikling.
En annen positiv effekt er at mer tekniske utviklere faktisk kan gjøre realistisk lokal debugging og stepping i runtime-koden.