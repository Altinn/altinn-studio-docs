---
title: Practical tips for resource allocation
description: 
weight: 40
tags: [translate-to-english]
---

Før vi går på konkrete tips må vi kort introdusere Helm Chart. Helm Chart er de(n) filen(e) som styrer hvordan applikasjonen din [deployes](/app/development/configuration/deployment/)) til Kubernetes. Det er også her man styrer CPU og minne allokering. Du finner `Chart.yaml`og `values.yaml`i deployment mappen i applikasjonen din. Dette er viktige filer som kan være lett å overse og ikke ha et aktivt forhold til.

## Tips 1 - Kjør siste versjon av Helm Chart
Med siste versjon får du de mest oppdaterte innstillingene som standard. Se [Endringslogg for deployment](/community/changelog/deployment/) for hvordan oppgradere til siste versjon.

## Tips 2 - Ha et aktivt forhold til hva applikasjonen krever av minne og CPU
Altinn kommer med en standard på 50m CPU og 128Mi minne, men hva som faktisk kreves er det jo bare den som utvikler en applikasjon som vet. Hvis det caches mye data, vil det kreve mye minne. Hvis det er tunge operasjoner så vil det kreve mye CPU. De faktiske kravene bør gjenspeiles i Helm Chart hvis de avviker fra standarden.

## Tips 3 - Reduser antall instanser i testmiljø
Trenger man 2 kjørende instanser i test eller kan man klare seg med 1? Ønsker man å teste hvordan en app oppfører seg med flere instanser så trenger man nødvendigvis 2 eller flere, men ofte så holder det men 1 kjørende instans i test og man tåler litt nedetid ved deploy.

{{%panel info%}}
**Merk:** Har man gjort de tiltakene man kan, men alikevel har nådd taket på hva clusteret håndterer så er neste steg å øke antallet noder evt. ha kraftigere noder. Ta kontakt med oss i Altinn så ser vi på dette sammen med dere.

{{% /panel%}}

{{<children />}}
