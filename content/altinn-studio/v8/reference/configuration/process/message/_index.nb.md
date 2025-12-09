---
title: Melding
description: Hvordan sette opp en melding i Altinn Studio.
toc: true
---

En melding i Altinn 3 er egentlig bare et data-steg, på samme måte som f.eks. skjemautfylling. Det settes opp med en datamodell for meldingen, og en 
layout for hva som skal vises på siden. Melding er dermed ikke en egen steg-type. Dette gjør at en melding i Altinn 3 er ekstremt fleksibel, og kan settes opp enten som eneste steg i en prosess, eller som en del av en større prosess.

Vi har lagd noen verktøy som skal gjøre det enkelt å komme i gang med å sette opp en melding i en app.

## Datamodell
Vi har lagd en standard datamodell for meldinger, for å gjøre det enkelt å komme i gang. Denne datamodellen kan man finne [her](https://altinncdn.no/schemas/xsd/message/message.schema.v1.xsd). Denne kan enten brukes som den er, brukes som et utgangspunkt, eller man kan bruke en helt annen datamodell. 

## Layout
Layouten kan man definere helt selv, på samme måte som for skjemaet.

![Standard meldings-visning](message-app.png "Standard meldings-visning")