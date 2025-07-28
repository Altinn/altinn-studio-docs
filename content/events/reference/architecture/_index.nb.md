---
title: Applikasjonskonstruksjonskomponenter - Altinn Events
linktitle: Arkitektur
tags: [architecture, solution]
weight: 20
toc: true
description: "Altinn Events-komponenten er en ASP.NET MVC-applikasjon som eksponerer et REST API til Altinn Apps
og andre Altinn-tjenester. Applikasjonen er distribuert som en Docker-container til en Kubernetes-klynge og et sett
med funksjoner i en Azure Function App."
aliases:
 - /technology/solutions/altinn-platform/events/
---

## Illustrasjon av systemarkitektur

Når en publiseringsforespørsel sendes til `/app`-endepunktet, vil hendelsen først bli lagret i `events-registration`-køen for operasjonell robusthet og fleksibilitet.

Når en forespørsel om hendelseshenting mottas, vil den svare med resultater fra den interne relasjonsdatabasen som brukes til vedvarende lagring av hendelser.

![Hendelsesarkitekturdiagram](altinn-events.drawio.svg "Altinn Event-arkitektur")

## Flyt for prosessering av en enkelt innkommende hendelse

![Sekvensdiagram - POST-hendelse](sequence-diagram-post-events.drawio.svg "Sekvensdiagram - POST-hendelse")


## System- og tjenesteavhengigheter
### Interne
- **Altinn Authorization**: brukes til å autorisere tilgang til endepunkter
- **Altinn Register**: brukes til å støtte oppslag på alternativt subjekt

### Eksterne
- [**Azure Kubernetes Services**](https://azure.microsoft.com/en-us/products/kubernetes-service): er vert for docker-containere for mikrotjenester og cron-jobber
  i en fullstendig administrert Kubernetes-klynge
- [**PostgreSQL**](https://www.postgresql.org/): brukes til lagring
- [**Azure Functions**](https://docs.microsoft.com/en-us/azure/azure-functions/): brukes internt til å prosessere og videresende innkommende cloud events til abonnent-webhooks.
- [**Azure Queue Storage**](https://azure.microsoft.com/en-us/products/storage/queues): er vert for køene som brukes til å frikoble prosesseringen for innkommende hendelser