---
title: Datamodeller for applikasjoner
linktitle: Apper
description: Informasjon om datamodeller for applikasjoner
weight: 10
tags: [translate-to-english]
---

Datamodeller for applikasjoner ligger i samme mappe-struktur som resten av applikasjons-filene. Disse ligger lagret i 
[Gitea][1], under `App/models` i filstrukturen til appen.
En applikasjon har 4 modell-filer:
- `<model>.cs`: Denne brukes av applikasjonen sine API'er til å behandle/validere data
- `<model>.schema.json`: Denne brukes av applikasjonen på klient-siden (browser) til å validere data fortløpende.
  Det er også denne filen man jobber med i datamodellerings-verktyøet.
- `<model>.xsd`: Denne brukes ikke direkte av applikasjonen, men kan lastes ned ved behov til f.eks. mottakssystemer.
- `<model>.metadata.json`: Denne brukes kun til generering av `<model>.cs`-filen. _På sikt vil vi slutte å lagre denne
  filen i appen, og kun generere den ved behov_.


Datamodeller for en applikasjon kan bygges fra bunn av, eller lastes opp, i verktøyet 
[Altinn Studio Datamodellering][2].

[1]: https://altinn.studio/repos
[2]: ../data-models-tool
