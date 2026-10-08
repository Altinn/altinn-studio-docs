---
draft: true
title: Tips til ressursfordeling
description: Hva kan og bør du gjøre utover standard innstillinger?

---

Du styrer CPU og minne for appen i filen `deployment/values.yaml` i app-repoet. Filen overstyrer standardverdiene i Helm-chartet som Altinn bruker til å publisere alle apper. Se [innstillinger for publisering]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/deployment" >}}) for hvilke innstillinger du kan endre.

## Tips 1 - Ha et aktivt forhold til hva applikasjonen krever av minne og CPU

Altinn kommer med en standard på 50m CPU og 256 Mi minne. Bare du som utvikler en applikasjon vet hva den faktisk krever. Hvis du cacher mye data krever det mye minne. Hvis du har tunge operasjoner krever det mye CPU. Du bør gjenspeile de faktiske kravene i `values.yaml` hvis de avviker fra standarden.

## Tips 2 - Reduser antall instanser i testmiljø

Trenger du 2 kjørende instanser i test eller kan du klare deg med 1? Ønsker du å teste hvordan en app oppfører seg med flere instanser trenger du nødvendigvis 2 eller flere. Men ofte holder det med 1 kjørende instans i test og du tåler litt nedetid ved distribusjon.

{{%panel info%}}
**Merk:** Har du gjort de tiltakene du kan, men allikevel nådd taket på hva clusteret håndterer, er neste steg å øke antallet noder eller ha kraftigere noder. Ta kontakt med oss i Altinn så ser vi på dette sammen med dere.
{{% /panel%}}

{{<children />}}
