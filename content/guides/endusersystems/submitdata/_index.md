---
title: Sende inn data fra sluttbrukersystem
linktitle: Sende inn data fra
description: Denne guiden beskriver i detalj hvordan man som applikasjonseier/tjenesteier kan motta data som innleveres til Altinn
tags: [architecture, devops, todo]
toc: false
---


## Overordnet om Altinn og sluttbrukersystem

På Altinn plattformen utvikler forskjellige etater og andre offentlige aktører tjenester som skal benyttes av innbyggere eller næringsliv. 

Tjenestene kan være enkle tjenster hvor man må fylle ut en begrenset mengde med data, til komplekste tjenester med flere typer datalementer over flere prosessteg.

En viktig egenskap med tjenester utviklet i Altinn er at hver tjeneste tilbyr et sett med API som kan benyttes for maskin til maskininnsending av data fra sluttbrukersystem

Et sluttbrukersystem er i denne kontekst en applikasjon som utfører oppgaver på vegne av sluttbruker (innbygger/næringsliv). Enten fullstendig automatisert eller kontrollert
av en sluttbruker.

## Hva er en Altinn tjeneste

En tjeneste består av en applikasjon som er tilgjengelig i Altinns infrastruktur. Denne applikasjonen har et sett med konfigurasjon
som beskriver data som tjenesten skal motta eller sende ut samt hvilken prosess.


## Hvilke typer data er det tjenestene eksponerer/mottar via API

Den typiske Altinn tjenesten har definert en skjemamodell som beskriver de dataene som gjelder den aktuelle tjenesten. 

