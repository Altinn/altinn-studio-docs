---
title: Policy Administration Point
linktitle: PAP
description: The Policy Administration Point er ansvarlig for å lage og endre de forskjellige autorisasjonspolicyene som brukes av PDP
tags: [architecture, security, authorization, xacml]
weight: 1
---

I Altinn Platform er det foreløpig ingen Policy Administration Point-funksjonalitet, men Altinn Platform gir funksjonalitet som brukes
av de andre policyadministrasjonspunktene i Altinn 3. PRP gir API for lagring av policyer og henting av dem.

### Policy Administration Point for applikasjoner

Autorisasjonspolicyen for apper er definert i Altinn Studio ved utvikling av appen.

Se [Policy Administration Point i Altinn Studio](/altinn-studio/designer/build-app/authorization-rules/) for detaljer.

### Delegerte retningslinjer

Access Management-komponenten vil tillate sluttbrukere å delegere rettigheter til personer, bedriftsbrukere og organisasjoner

Foreløpig er denne funksjonaliteten kun tilgjengelig gjennom Altinn 2 GUI.

Resultatet av delegeringen er en XACML-policy som beskriver de delegerte rettighetene.