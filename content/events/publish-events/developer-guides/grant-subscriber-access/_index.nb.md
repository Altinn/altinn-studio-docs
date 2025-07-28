---
title: Gi abonnenter tilgang
linktitle: Gi abonnenter tilgang
description: Guide for å gi abonnenter tilgang til produserte hendelser
weight: 50
---


Generelt vil tilgang til hendelser for en gitt part bli autorisert basert på roller som den forespørrende organisasjonen/brukeren har for subjektet til hendelsen.


## Generiske hendelser
Å gi en abonnent tilgang til dine publiserte hendelser gjøres gjennom policyen til 
ressursen i ressursregisteret. For å kunne spørre etter hendelser eller sette opp abonnement må autorisasjonspolicyen gi tilgang til "subscribe" handlingen.

{{% notice info  %}}

TODO: Har vi noe dokumentasjon vi kunne inkludere her for å veilede brukerne, Team Authorization? 
{{% /notice %}}


## Altinn App hendelser

Å gi abonnenter tilgang til hendelser generert av en Altinn App gjøres gjennom applikasjonens
autorisasjonspolicy. 

Se [Altinn Apps dokumentasjonen](../../../../altinn-studio/reference/configuration/authorization/) for veiledning.