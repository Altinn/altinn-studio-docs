---
title: Ressursfordeling
description: Hvilke ressurser fordeles i et cluster og hvordan?
toc: true
weight: 40
---

Primært vil det være CPU og minne som fordeles. Man kan sette minimum (requests) og et tak (limit) for en container. Hvis en pod har flere containere vil Kubernetes summere opp disse.

I Altinn 3 benytter vi som standard requests, det vil si minimum for hva en applikasjon vil legge beslag på. 

## CPU
CPU spesifiseres i CPU-enheter, hvor 1 CPU-enhet = 1 fysisk CPU-kjerne eller 1 virtuell kjerne. Man kan spesifisere fraksjoner og enten spesifisere 0.1 eller 100m (som leses hundre millicores). Vi anbefaler at man benytter m-notasjonen og ikke desimalnotasjonen. Skriv 1m og ikke 0.001 (som er det minste man kan spesifisere).

Som standard har man 12 kjerner til fordeling i TT02, det vil si 12 000m. Dette gjelder dagens oppsett med 6 noder á 2 kjerner. Fra dette må vi trekke fra de systemtekniske containerne som Kubernetes selv kjører. Det tilsvarer ca. 30 % av CPU. Da er vi nede i 8000m til fordeling til Altinn 3-applikasjoner.

For en app er CPU satt som standard til 50m. Det vil si at man i teorien skal ha plass til 8000 / 50m = 160 apper på et slikt cluster. Men en app kjøres som standard opp i 2 instanser. Da har vi brukt 2×50m=100m. I tillegg har hver app en såkalt sidecar-container (Linkerd for kryptering/dekryptering) som får 25m. Denne følger instansen og det blir da 2×25=50m. En app krever da totalt 150m for 2 instanser. Gitt 8 CPU-er tilgjengelig får vi 53 apper med dagens oppsett. Dette er veiledende tall, men gir en grei pekepinn. Hvis en app krever mer CPU enn minimum vil den få det, gitt at det finnes mer tilgjengelig.

## Minne
Minne spesifiseres i byte. Man kan benytte ulike suffiks som Mi, M, Ki og så videre. Altinn 3 spesifiserer dette i Mi, som er Mebibyte. Dette er tilnærmet det samme som Megabyte.

Som standard har vi 48 GiB (Gibi Byte) minne tilgjengelig i clusteret totalt. Dette er fordelt med 8 GiB på hver av de 6 nodene. Fra dette må vi trekke fra ca. 0,5–1 GiB som går til systemtekniske containere som Kubernetes selv kjører. Det tilsvarer ca. 10–20 %. Det vil si at vi da har 6 noder × 7 Mi = 42 GiB (40 054 Mi) totalt i clusteret og 7 GiB (7168 Mi) per node til fordeling.

For en app er minne satt til 128 Mi som standard. Det vil si at man i teorien skal ha plass til 7168 Mi / 128 Mi = 56 appinstanser per node og 336 apper totalt i clusteret hvis vi kun ser på minne. Når vi ser på tallene over minneforbruk er det et overforbruk av minne. 256 Mi er nok et bedre tall per app. Korrigert for dette kan vi halvere tallene slik at det blir 24 appinstanser per node og 168 appinstanser totalt i clusteret.

## Hvordan fungerer ressursallokering i clusteret?
Når en ny app skal distribueres til et Kubernetes-cluster vil Kubernetes (litt forenklet) se på hvor mye minne og CPU det er bedt om som minimum. Den prøver å finne en node som har ledig plass. Hvis den ikke finner en node med ledig plass vil den se om noen av de kjørende applikasjonene overforbruker ressurser i forhold til hva de har bedt om. Den kaster ut den eller de som har høyest overforbruk for å gi plass til den nye.

{{%panel info%}}
**Merk:** Det at Kubernetes vil kaste ut en applikasjon som overforbruker gjør det svært viktig å ha et forhold til hvor mye ressurser man har tilgjengelig og hvor mye hver enkelt app krever. Summen av dette må gå opp – hvis ikke risikerer man ustabilitet i miljøet.
{{% /panel%}}


{{<children />}}
  
