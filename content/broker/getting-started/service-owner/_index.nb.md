---
title: Kom i gang med Altinn Formidling som tjenesteeier
linktitle: Tjenesteeier
description: Hvordan komme i gang med Altinn 3 Formidling, for tjenesteeiere
tags: [Broker, guide, Formidling]
toc: true
weight: 10
---

{{<children />}}

{{% notice warning  %}}
Denne prosessen vil forenkles gjennom en fremtidig oppdatering i Altinn Studio.

Spesielt vil trinn 4-6 utføres via GUI i stedet for å kreve direkte API-kall.
{{% /notice %}}

Denne veiledningen er for deg som er tjenesteeier og ønsker å bruke Altinn Formidling. Her finner du trinnvise instruksjoner for registrering, opprettelse av ressurs, konfigurering av tilganger og autentisering, integrasjon med Formidling API-et, samt oppsett av varsler. Veiledningen hjelper deg med å sette opp og administrere Formidlingtjenesten.

## 1. Kom i gang som tjenesteeier i Altinn {#get-started-as-service-owner-in-altinn}

For å komme i gang med Altinn Formidling må virksomheten din være registrert som en tjenesteeier i Altinn. For en trinnvis veiledning, se [Kom i gang med Altinn-guiden](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/).

Dette trinnet er bare nødvendig for nye virksomheter som ennå ikke har etablert seg som tjenesteeiere på Altinn-plattformen. Som en eksisterende tjenesteeier kan du gå direkte videre til de neste trinnene for å begynne å bruke Altinn Formidling.

## 2. Nødvendige steg for alle roller {#perform-common-steps-for-api-key-and-maskinporten-client}

Utfør steg 1 og 2 i [Felles kom i gang-steg](../common-steps) hvis du ikke allerede har gjort det.

## 3. Opprett ny ressurs {#register-a-resource-in-altinn-resource-registry}
For at filer skal kunne sendes med Altinn Formidling, må de være tilknyttet en tjeneste. 
En ressurs representerer en spesifikk funksjon eller et sett av funksjoner som brukes til å administrere tilgang og regler for filoverføring. 
Tjenester registreres via Altinn Studio og brukes til å definere tilgangsregler og tilgangslister, som sikrer at bare autoriserte brukere kan utføre bestemte handlinger.

1. Logg inn på Altinn Studio og naviger til ressursdashboardet, Se [Ressursregister](../../../../authorization/what-do-you-get/resourceregistry/) for en detaljert veiledning.
2. Opprett ny ressurs, følg veiledningen og fyll inn nødvendig informasjon og detaljer om tjenesten.
3. Angi tilgangsregler for ressursen.
4. Tilgangsregler må for ressursen må konfigureres slik at de tillater følgende handlinge:
    - "subscribe" for alle, - dette brukes for hendelser.
    - "read" for mottakere
    - "write" for avsendere.

Alternativt, for å sette opp en ressurs som fungerer raskt, kan du bruke vår [Postman-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json) og kjøre forespørslene "Create resource" og "Create resource policy" med en token som har scopet "altinn:resourceregistry/resource.write".

Her er en [eksempelpolicy](ExamplePolicy.xml).

Merk at denne eksempelpolicyen angir en påkrevd brukerrolle "DAGL(daglig leder)" for brukeren som har tilgang til ressursen, og krever bruk av [Ressursrettighetsregister](../../../../authorization/what-do-you-get/resourceregistry/) (gå til engelsk språk for å se dokumentasjon for RRR) for å gi tilgang til spesifikke organisasjoner.
En bruker med denne tilgangen kan deretter delegere tilgangen til virksomhetsbrukeren/systembrukeren

**TIPS**: Verifiser konfigurasjonene dine ved hjelp av [Postman-samlingen](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json), og erstatt testtokenene med dine egne Altinn-token (Se forespørselen "Logg inn i Maskinporten (Initialiser)" i Authenticator-mappen).

## 4. Registrer deg som tjenesteeier i Formidling API-et {#register-yourself-as-a-service-owner-in-broker-api}

Nå er tiden inne for å konfigurere Formidling-komponenten ved å registrere virksomheten din som en tjenesteeier i Altinn Formidling-konfigurasjonslaget. 
Dette trinnet er nødvendig for å etablere din virksomhet som en godkjent tjenesteeier og gi tilgang til Formidling API-et.

For detaljerte instruksjoner for å konfiguere din organisasjon som tjenesteeier i Formidling, følg [denne linken](../developer-guides/service-owner/#operation-initialize-service-owner-in-broker-api), som gir deg all nødvendig informasjon for å registrere organisasjonen din som en tjenesteeier i Formidling.

## 5. Konfigurer den eksisterende tjenesten din i Formidling {#configure-your-existing-resource-in-broker}

Deretter må du konfigurere den spesifikke Formidling-konfigurasjonen for ressursen. 
Bruk ID-en til ressursen du opprettet i trinn 3, og kall API-operasjonen for å konfigurere tjenesten.

 For detaljerte instruksjoner om hvordan du konfigurerer ressursen i Formidling, følg [denne lenken](../developer-guides/service-owner/#operation-configure-resource-in-broker-api), som gir deg all nødvendig informasjon for å fullføre konfigurasjonen og sikre at ressursen din er riktig satt opp i Formidling.

## Hvordan migrere fra Altinn 2 til Altinn 3 {#how-to-migrate-from-Altinn-2-to-Altinn-3}

Hvis du har en eksisterende løsning i Altinn 2 du ønsker å migrere, kan du enten opprette en ny uavhengig Altinn Formidling-tjeneste i Altinn 3, eller bruke overgangsløsningen, beskrevet her.

TODO: Lenke til overgangsløsning dokumentasjon når den er tilgjengelig.

