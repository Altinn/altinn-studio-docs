---
title: Kjøremiljø
description: Beskrivelse av kjøremiljøet for en Alttin 3 applikasjoner for en tjenesteeier.
weight: 40
---

Altinn 3 applikasjoner for en tjenesteeier kjører i Azure Kubernetes Service (AKS) fra Microsoft Azure. Dette er en såkalt Managed Service hvor vi lar Microsoft Azure ta seg av den underliggende driften av Kubernetes clusteret. Altinn står for konfigurering og provisjonering av clusteret, mens tjenesteeier har selv ansvar for utrulling av applikasjonene til clusteret. 

For detaljert dokumentasjon av hvilke muligheter som finnes må man se på:
* [Azure Kubernetes Services](https://docs.microsoft.com/en-us/azure/aks/)
* [Kubernetes](https://kubernetes.io/docs/home/), og da spesielt hvordan [ressurser administreres](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) - et ansvar som er delt mellom Altinn og tjenesteeier.

Alle tjenesteeiere vil ha egne Kubernetes cluster for test og produksjon. Dette sikrer at applikasjoner for en tjenesteeier ikke påvirker applikasjoner for andre tjenesteeiere.

## Ressursadministrasjon
Selv om man ofte tenker at en skyløsning har ubegrenset kapasitet, så vil også ubegrenset kapasitet gjerne føre til ubegrenset kostnadsbruk. Det er derfor viktig å ha kontroll på hva man forbruker av ressurser, hvor mange applikasjoner man kjører og hvor mye CPU/minne den enkelte applikasjon legger beslag på. Før eller siden vil man gå tom for ressurser (CPU og minne) på clusteret, og det er da viktig å forstå hvilke faktorer som påvirker.

## Komponentene i et cluster
Et AKS Cluster kjører på et antall noder (virtuelle maskiner) av en gitt type. Per i dag er dette B2 som har 2 vCPU og 8 GiB minne. Som standard settes det opp minimum 3 noder både i TT02 og produksjon med automatisk skalering opp til 6 noder avhengig av trafikk. Clusteret vil da ha 12 vCPU og 48 GiB minne som da blir den øvre kapasiteten clusteret har til å betjene de applikasjonene som til enhver tid er deployet. 

{{%panel info%}}
**Merk:** Et cluster kan skaleres automatisk opp til 1000 noder, men dette vil også medføre tilsvarende kostnadsøkning. Hva som er det rette "taket" for den enkelte tjensteeier vil avhenge av antall applikasjoner, hvor mye ressurser disse krever som minimum og trafikken som disse genererer. Ta kontakt med oss i Altinn om dere har behov for mer ressurser enn det som er satt opp som standard.
{{% /panel%}}


<div style="text-align: center;">
    <object
        data="kubernetes-scaling-concepts.drawio.svg"
        type="image/svg+xml"
        style="width: 100%;"
        title="Backlogs and teams"
        alt="Backlogs"
    ></object>
</div>

[Fullscreen](kubernetes-scaling-concepts.drawio.svg)

### Applikasjoner / Apps
Når vi snakker om en Altinn 3 App så snakker vi om den logiske applikasjonen som det bare finnes 1 av. For å sikre at en app hele tiden er oppe så kjører vi som regel med 2 eller flere instanser av applikasjonen. Minne og CPU reservasjoner gjelder per instans.

### Docker Containers
En Docker Container, eller bare container, inneholder i vårt tilfelle den kjørende koden for en Altinn 3 App. Men det finnes også andre containere i clusteret som inneholder systemtekniske ting som må kjøre. F. eks. så vil enhver Altinn 3 app container få følge av en Linkerd container som tar seg av kryptering/dekryptering av trafikk inn og ut av Altinn 3 applikasjonen.

### Pods
En pod er den minste kjørbare enheten i et kubernetes cluster og er det vi allokerer ressurser til. En pod kan bestå av en eller flere containere. En Altinn 3 applikasjon vil typisk bestå av en app container og en såkalt sidecar container som kjører Linkerd. Linkerd er den komponenten som tar seg av kryptering/dekryptering av kommunikasjon mellom pods i et cluster. Grunnen til at vi nevner denne er at denne også vil kreve minne og CPU ressurser.

### Deployments
En deployment styrer levetiden til en applikasjon, hvor mange instanser den skal ha samt allokering av minne og CPU. I Altinn 3 spesifiseres dette ved hjelp av såkalte Helm charts,. Dette kan sees på som en innpakking av en applikasjon med fornuftige standard verdier, men standard konfigurasjonen kan overstyres.


{{%panel info%}}
**Merk:** Noe av ressursene i et Kubernetes cluster vil gå med til systemtekniske prosesser både fra Kubernetes selv og fra Altinn infrastrukturen, så ikke alle ressurser i et cluster vil være tilgjengelig til fordeling til apps.

{{% /panel%}}
{{<children />}}
  
