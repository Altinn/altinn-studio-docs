---
title: Hva er nytt
description: Oversikt over endringer som ble introdusert i v3 av deployment.
toc: true
---

## 3.2.0

* Oppgrader Traefik API fra traefik.containo.us til traefik.io
* Ikke sett verdier for tls-konfigurasjon som standard, bruk cluster standard

[View release on Github](https://github.com/Altinn/altinn-studio-charts/releases/tag/deployment-3.2.0)

## 3.1.0

* Fjern standardverdi for image pullsecret. Dette er ikke lenger nødvendig, cluster håndterer autentisering til registeret

[View release on Github](https://github.com/Altinn/altinn-studio-charts/releases/tag/deployment-3.1.0)

## 3.0.1
Bugfix:
* Fjern dobbelt angitt hpa behavior felt i template

[Se release på Github](https://github.com/Altinn/altinn-studio-charts/releases/tag/deployment-3.0.0)

## 3.0.0

* Forbedre horizontal pod autoscaler håndtering.

[Se release på Github](https://github.com/Altinn/altinn-studio-charts/releases/tag/deployment-3.0.0)
