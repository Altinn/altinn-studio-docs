---
draft: true
title: Tips til ressursfordeling
description: Hva kan og bør du gjøre utover standard innstillinger?

---

Før vi går på konkrete tips må vi kort introdusere Helm Chart. Helm Chart er filen eller filene som styrer hvordan applikasjonen din distribueres til Kubernetes. Det er også her du styrer CPU- og minneallokering. Du finner `Chart.yaml` og `values.yaml` i deployment-mappen i applikasjonen din. Disse viktige filene er lette å overse og ikke ha et aktivt forhold til.

## Tips 1 - Kjør siste versjon av Helm Chart
Med siste versjon får du de mest oppdaterte innstillingene som standard. Se [Endringslogg for deployment](/nb/community/changelog/deployment/) for hvordan oppgradere til siste versjon.

## Tips 2 - Ha et aktivt forhold til hva applikasjonen krever av minne og CPU

Altinn kommer med en standard på 50m CPU og 128 Mi minne. Bare du som utvikler en applikasjon vet hva den faktisk krever. Hvis du cacher mye data krever det mye minne. Hvis du har tunge operasjoner krever det mye CPU. Du bør gjenspeile de faktiske kravene i Helm Chart hvis de avviker fra standarden.

## Tips 3 - Reduser antall instanser i testmiljø

Trenger du 2 kjørende instanser i test eller kan du klare deg med 1? Ønsker du å teste hvordan en app oppfører seg med flere instanser trenger du nødvendigvis 2 eller flere. Men ofte holder det med 1 kjørende instans i test og du tåler litt nedetid ved distribusjon.

{{%panel info%}}
**Merk:** Har du gjort de tiltakene du kan, men allikevel nådd taket på hva clusteret håndterer, er neste steg å øke antallet noder eller ha kraftigere noder. Ta kontakt med oss i Altinn så ser vi på dette sammen med dere.
{{% /panel%}}

{{<children />}}
