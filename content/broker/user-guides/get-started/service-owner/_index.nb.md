---
title: Kom i gang med Altinn Broker som tjenesteeier
linktitle: Tjenesteeier
description: Hvordan komme i gang med Altinn 3 Broker, for tjenesteeiere
tags: [Broker, guide]
toc: true
weight: 20
---

{{<children />}}

{{% notice warning  %}}
Denne prosessen vil forenkles gjennom en fremtidig oppdatering i Altinn Studio.

Spesielt vil trinn 4-6 utføres via GUI i stedet for å kreve direkte API-kall.
{{% /notice %}}

## 1. Kom i gang som tjenesteeier i Altinn {#get-started-as-service-owner-in-altinn}

For å komme i gang med Altinn Broker må bedriften din være registrert som en tjenesteeier i Altinn. For en trinnvis veiledning, se [Kom i gang med Altinn-guiden](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/).

Dette trinnet er bare nødvendig for nye bedrifter som ennå ikke har etablert seg som tjenesteeiere på Altinn-plattformen. Som en eksisterende tjenesteeier kan du gå direkte videre til de neste trinnene for å begynne å bruke Altinn Broker.

## 2. Utfør felles steg for API-nøkkel og Maskinporten-klient {#perform-common-steps-for-api-key-and-maskinporten-client}

Utfør steg 1 og 2 i [Felles kom i gang-steg](../common-steps) hvis du ikke allerede har gjort det.

## 3. Registrer en ressurs i Altinn ressursregister {#register-a-resource-in-altinn-resource-registry}

Alle filer som sendes med Broker, er tilknyttet en ressurs/tjeneste/"tjenesteressurs". Se [Ressursregister](../../../../authorization/modules/resourceregistry/).
Ressurser kan registreres via Altinn Studio, og brukes for tilgangsregler og tilgangslister.
Politikken din må konfigureres slik at de tillater handlingene:

- "subscribe" for alle, - dette brukes for hendelser.
- "read" for mottakere
- "write" for avsendere.

For å sette opp en ressurs som fungerer raskt, kan du bruke vår [Postman-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json) og kjøre forespørslene "Create resource" og "Create resource policy" med en token som har omfanget "altinn:resourceregistry/resource.write".

Her er en [eksempelpolicy](ExamplePolicy.xml).

Merk at denne eksempelpolicyen angir en påkrevd brukerrolle "DAGL" for brukeren som har tilgang til ressursen, og krever bruk av [Ressursrettighetsregister](../../../../authorization/modules/resourceregistry/) (gå til engelsk språk for å se dokumentasjon for RRR) for å gi tilgang til spesifikke organisasjoner.
En bruker med denne tilgangen kan deretter delegere tilgangen til bedriftsbrukeren/systembrukeren

**TIPS**: Verifiser konfigurasjonene dine ved hjelp av [Postman-samlingen](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json), og erstatt testtokenene med dine egne Altinn-token (Se forespørselen "Logg inn i Maskinporten (Initialiser)" i Authenticator-mappen).

## 4. Registrer deg som tjenesteeier i Broker API {#register-yourself-as-a-service-owner-in-broker-api}

Nå er tiden inne for å konfigurere Broker-komponenten selv, først ved å konfigurere organisasjonen din som en tjenesteeier i Broker-konfigurasjonslagret.

Kall API-operasjonen [initialiser tjenesteeier i Broker API](../../developer-guides/service-owner/#operation-initialize-service-owner-in-broker-api).

## 5. Konfigurer den eksisterende ressursen din i Broker {#configure-your-existing-resource-in-broker}

Deretter må man konfigurere den spesifikke Broker-konfigurasjonen for ressursen.

Bruk ID-en til ressursen du opprettet i trinn 3, og kall API-operasjonen for å [konfigurere ressurs](../../developer-guides/service-owner/#operation-initialize-service-owner-in-broker-api).

## 6. Gi tilgang til avsendere og mottakere til ressursen {#grant-access-to-senders-and-recipients-to-the-resource}

For øyeblikket må dette gjøres manuelt ved å oppdatere policy som er definert i trinn 3, men vil i fremtiden bli gjort ved hjelp av GUI i Ressurs Rettighets Register.

TODO: Dokumenter hvordan man gjør dette i [Ressurs rettighets register](../../../../authorization/modules/resourceregistry) når det finnes norskspråklig dokumentasjon.

## Hvordan migrere fra Altinn 2 til Altinn 3 {#how-to-migrate-from-Altinn-2-to-Altinn-3}

Hvis du har en eksisterende løsning i Altinn 2 du ønsker å migrere, kan du enten opprette en ny uavhengig Altinn Broker-tjeneste i Altinn 3, eller bruke overgangsløsningen, beskrevet her.

TODO: Lenke til overgangsløsning dokumentasjon når den er tilgjengelig.
