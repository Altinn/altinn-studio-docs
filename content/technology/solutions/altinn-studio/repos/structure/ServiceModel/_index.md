---
title: ServiceModel.cs
description: Beskrivelse av ServiceModel.cs.
tags: [app-structure, todo]
---

## Overordnet

'ServiceModel.cs' er tjenestemodellen som automatisk genereres fra datamodellen som er valgt
på tjenesten. Denne kommer i utgangspunktet fra XSD, men tjenester 3.0 vil mest sannsynlig
få støtte for å definere datamodell selv.

Runtime vil populere datamodellen med data fra GUI og forretningsregler vil kunne jobbe mot 
denne modellen.  

