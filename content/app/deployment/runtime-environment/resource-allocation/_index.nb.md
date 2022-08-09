---
title: Ressurserfordeling
description: Hvilke ressurser fordeles i et cluster og hvordan?
toc: true
weight: 40
---

Primært vil det være CPU og minne som fordeles. Man kan sette minimum (requests) og et tak (limit) for en container.
Hvis en pod har flere containere vil kubernetes summere opp disse.
 
 I Altinn 3 benytter vi som default requests, dvs. minimum for hva en applikasjon vil legge beslag på. 

## CPU
CPU spesifiseres i CPU enheter, hvor 1 CPU enhet = 1 fysisk CPU kjerne eller 1 virtuell kjerne. Man kan spesifisere fraksjoner og enten spesifisere 0.1 eller 100m (som leses hundre millicores). Vi anbefaler at man benytter m notasjonen og ikke desimal notasjonen slik at man skriver 1m og ikke 0.001 (som er det minste man kan spesifisere).

Som standard har man 12 kjerner til fordeling i TT02, dvs. 12 000m, gitt dagens oppsett med 6 noder á 2 kjerner. Fra dette må vi trekke fra de systemtekniske containerne som kubernetes selv kjører, det tilsvarer ca. 30% av CPU, da er vi nede i 8000m til fordeling til Altinn 3 applikasjoner.

For en app er CPU satt som default til 50m. Dvs. man skal i teorien ha plass til 8000 / 50m = 160 apps på et slikt cluster. Men en app vil som standard kjøres opp i 2 instanser, da har vi brukt 2x50m=100m. I tillegg har hver app en såkalt sidecar container (Linkerd for kryptering/dekryptering) som får 25m. Denne følger instansen og det blir da 2x25=50m. Så en app vil da totalt kreve 150m for 2 instanser. Gitt 8 cpu’er tilgjengelig så får vi 53 apps med dagens oppsett. Dette er veiledende tall, men gir en grei pekepinn. Hvis en app krever mer CPU enn minimum vil den få det gitt at det finnes mer tilgjengelig.

## Minne
Minne spesifiseres i byte, og man kan benytte ulike suffixer som Mi, M Ki etc. Altinn 3 spesifiserer dette i Mi som er Mebibyte som er tilnærmet det samme som Megabyte.

Som standard har vi 48GiB (Gibi Byte) minne tilgjengelig i clusteret totalt, men dette er fordelt med 8GiB på hver av de 6 nodene. Fra dette må vi trekke fra ca. 0.5 - 1GiB som går til systemtekniske containere som kubernetes selv kjører, det tilsvarer ca. 10-20%. Dvs. at vi da har 6 noder x 7Mi = 42GiB (40054Mi) totalt i clusteret og 7GiB (7168Mi) per. Node til fordeling.

For en app er minne satt til 128Mi som default. Dvs. man skal i teorien ha plass til 7168Mi / 128Mi = 56 app instanser per node og 336 apps totalt i clusteret hvis vi kun ser på minne. Når vi ser på tallene over minneforbruk så er det et overforbruk av minne, så 256Mi er nok et bedre tall per app. Korrigert for dette så kan vi halvere tallene slik at det blir 24 app instanser per node og 168 app instanser totalt i clusteret.

## Hvordan fungerer ressursallokering i clusteret?
Når en ny app skal deployes til et Kubernetes cluster vil Kubernetes litt forenklet se på hvor mye minne og CPU det er spurt om som minimum og prøve å finne node som har ledig plass. Hvis den ikke finner en node med ledig plass så vil den se om det er noen av de kjørende applikasjonene som overforbruker ressurser i forhold til hva de har spurt om å kaste ut den eller de som har høyest overforbruk for å gi plass til den nye.

{{%panel info%}}
**Merk:** Det at Kubernetes vil kaste ut en applikasjon som overforbruker gjør det svært viktig å ha et forhold til hvor mye ressurser man har tilgjengelig, hvor mye hver enkelt app krever og at summen av dette går opp - hvis ikke risikerer man ustabilitet i miljøet.

{{% /panel%}}


{{<children>}}
  
