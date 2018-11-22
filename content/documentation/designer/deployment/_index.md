---
title: Service Deployment
linktitle: Service Deployment
description: Altinn Studio will let the developer deploy the service to test enviroments and production without any manuel steps
tags: ["tjenester 3.0"]
weight: 110
---


### Deployment

3.0-tjenester skal når som helst kunne deployes til produksjon, uten å måtte involvere Altinn-organisasjonen eller dens leverandører.
Designer vil typisk gjøre API-kall mot Repositories for å få tilbake en liste over [releaser](../repositories/#release-management),
og så gjøre et API-kall mot [Runtime](../runtime/) for å initiere deploy.

- Selvbetjent deploy til testmiljøer og prod

