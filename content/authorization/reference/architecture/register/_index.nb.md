---
title: Register
description: Register-mikrotjenesten leverer registerinformasjon til apper.
tags: [platform, register, needstranslation]
---

Registerkomponenten er en støttekomponent i Altinn Autorisasjon, og gjør registerinformasjon tilgjengelig for apper og andre komponenter som har behov for dette.

## Architecture

Registerkomponenten er en .NET-applikasjon som eksponerer API. Foreløpig fungerer den som en proxy mot Altinn 2-registeret,
men vi arbeider med å legge til lokal lagring for bedre ytelse og for å kunne fase ut Altinn 2 i 2026.

Planlagt design:

![Register design](registerdesign.drawio.svg)

## Database design

Databasedesign:

![Db design](dbdesignaltinn3.drawio.svg)
