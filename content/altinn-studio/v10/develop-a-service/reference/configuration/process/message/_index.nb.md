---
title: Melding
description: Slik setter du opp en melding i Altinn Studio.
toc: true
tags: [needsReview]
---

En melding i Altinn 3 er egentlig bare et data-steg, på samme måte som skjemautfylling. Den settes opp med en datamodell for meldingen og en layout for hva som skal vises på siden. Melding er ikke en egen steg-type. Dette gjør at en melding i Altinn 3 er ekstremt fleksibel, og kan settes opp enten som eneste steg i en prosess eller som en del av en større prosess.

Vi har lagd noen verktøy som skal gjøre det enkelt å komme i gang med å sette opp en melding i en app.

## Datamodell

Vi har lagd en standard datamodell for meldinger. Denne datamodellen finner du [her](https://altinncdn.no/schemas/xsd/message/message.schema.v1.xsd). Den kan brukes som den er, brukes som et utgangspunkt, eller du kan bruke en helt annen datamodell.

## Layout

Layouten kan du definere helt selv, på samme måte som for skjemaet.

![Standard meldings-visning](message-app.png "Standard meldings-visning")