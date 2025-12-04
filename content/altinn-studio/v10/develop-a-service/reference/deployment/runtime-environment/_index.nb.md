---
title: Kjøremiljø
description: Kjøremiljøet for Altinn 3-applikasjoner for en tjenesteeier
weight: 40
---

Altinn 3-applikasjoner for en tjenesteeier kjører i Azure Kubernetes Service (AKS) fra Microsoft Azure. Dette er en såkalt Managed Service hvor Microsoft Azure tar seg av den underliggende driften av Kubernetes-clusteret.

Altinn står for konfigurering og provisjonering av clusteret. Tjenesteeier har selv ansvar for utrulling av applikasjonene til clusteret. 

Detaljert dokumentasjon om tilgjengelige muligheter finnes i:
* [Azure Kubernetes Services](https://docs.microsoft.com/en-us/azure/aks/)
* [Kubernetes](https://kubernetes.io/docs/home/), og da spesielt hvordan [ressurser administreres](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) - et ansvar som er delt mellom Altinn og tjenesteeier.

Alle tjenesteeiere har egne Kubernetes-clustere for test og produksjon. Dette sikrer at applikasjoner for en tjenesteeier ikke påvirker applikasjoner for andre tjenesteeiere.

## Ressursadministrasjon

En skyløsning har ikke ubegrenset kapasitet. Ubegrenset kapasitet fører også til ubegrenset kostnadsbruk.

Det er viktig å ha kontroll på hva du forbruker av ressurser. Du må vite hvor mange applikasjoner du kjører og hvor mye CPU og minne hver applikasjon bruker.

Før eller siden går clusteret tomt for ressurser (CPU og minne). Da er det viktig å forstå hvilke faktorer som påvirker.

## Komponentene i et cluster

Et AKS-cluster kjører på et antall noder (virtuelle maskiner) av en gitt type. Per i dag er dette B2 som har 2 vCPU og 8 GiB minne.

Som standard setter vi opp minimum 3 noder både i TT02 og produksjon. Clusteret skalerer automatisk opp til 6 noder avhengig av trafikk. Clusteret har da 12 vCPU og 48 GiB minne som øvre kapasitet for å betjene applikasjonene som til enhver tid er distribuert. 

{{%panel info%}}
**Merk:** Et cluster kan skaleres automatisk opp til 1000 noder, men dette medfører tilsvarende kostnadsøkning. Hva som er det rette "taket" for den enkelte tjenesteeier avhenger av antall applikasjoner, hvor mye ressurser disse krever som minimum og trafikken som disse genererer. Ta kontakt med oss i Altinn om dere har behov for mer ressurser enn det som er satt opp som standard.
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

### Applikasjoner
En Altinn 3-app er den logiske applikasjonen som det bare finnes én av. For å sikre at en app hele tiden er oppe kjører vi som regel med 2 eller flere instanser av applikasjonen. Minne- og CPU-reservasjoner gjelder per instans.

### Docker-containere
En Docker-container inneholder i vårt tilfelle den kjørende koden for en Altinn 3-app. Det finnes også andre containere i clusteret som inneholder systemtekniske komponenter som må kjøre. For eksempel vil enhver Altinn 3-appcontainer få følge av en Linkerd-container som tar seg av kryptering/dekryptering av trafikk inn og ut av Altinn 3-applikasjonen.

### Pods
En pod er den minste kjørbare enheten i et Kubernetes-cluster og er det vi allokerer ressurser til. En pod kan bestå av en eller flere containere. En Altinn 3-applikasjon består typisk av en app-container og en såkalt sidecar-container som kjører Linkerd. Linkerd er komponenten som tar seg av kryptering/dekryptering av kommunikasjon mellom pods i et cluster. Denne krever også minne- og CPU-ressurser.

### Deployments

En deployment styrer levetiden til en applikasjon, hvor mange instanser den skal ha samt allokering av minne og CPU. I Altinn 3 spesifiserer du dette ved hjelp av såkalte Helm charts.

Du kan se på dette som en innpakking av en applikasjon med fornuftige standardverdier, men du kan overstyre standardkonfigurasjonen.


{{%panel info%}}
**Merk:** Noe av ressursene i et Kubernetes cluster vil gå med til systemtekniske prosesser både fra Kubernetes selv og fra Altinn infrastrukturen, så ikke alle ressurser i et cluster vil være tilgjengelig til fordeling til apps.

{{% /panel%}}
{{<children />}}
  
