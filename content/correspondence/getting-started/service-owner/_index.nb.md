---
title: Kom i gang med Altinn Melding som tjenesteeier
linktitle: Tjenesteeier
description: Hvordan komme i gang med Altinn 3 Melding, for tjenesteeiere
tags: [Correspondence, guide, Melding]
toc: true
weight: 10
---

{{<children />}}

{{% notice warning  %}}
Denne prosessen vil forenkles gjennom en fremtidig oppdatering i Altinn Studio.

Spesielt vil trinn 4-6 utføres via GUI i stedet for å kreve direkte API-kall.
{{% /notice %}}

Denne veiledningen er for deg som er tjenesteeier og ønsker å bruke Altinn Melding. Her finner du trinnvise instruksjoner for registrering, opprettelse av ressurs, konfigurering av tilganger og autentisering, integrasjon med Formidling API-et, samt oppsett av varsler. Veiledningen hjelper deg med å sette opp og administrere formidlingstjenesten.

## 1. Kom i gang som tjenesteeier i Altinn {#get-started-as-service-owner-in-altinn}

For å komme i gang med Altinn Melding må virksomheten din være registrert som en tjenesteeier i Altinn. For en trinnvis veiledning, se [Kom i gang med Altinn-guiden](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/).

Dette trinnet er bare nødvendig for nye virksomheter som ennå ikke har etablert seg som tjenesteeiere på Altinn-plattformen. Som en eksisterende tjenesteeier kan du gå direkte videre til de neste trinnene for å begynne å bruke Altinn Formidling.

## 2. Nødvendige steg for alle roller {#perform-common-steps-for-api-key-and-maskinporten-client}

Utfør steg 1 og 2 i [Felles kom i gang-steg](../common-steps) hvis du ikke allerede har gjort det.

## 3. Opprett ny ressurs {#register-a-resource-in-altinn-resource-registry}
For å kunne sende meldinger over med Altinn Melding, må de først være tilknyttet en ressurs. 
En ressurs representerer en spesifikk funksjon eller et sett av funksjoner som brukes til å administrere tilgang og regler for overføring av meldinger. 
Ressurser registreres via Altinn Studio og brukes til å definere tilgangsregler og tilgangslister, som sikrer at bare autoriserte brukere kan utføre bestemte handlinger.

1. Logg inn på Altinn Studio og naviger til ressursdashboardet, Se [Ressursregister](../../../../authorization/guides/create-resource-resource-admin/) for en detaljert veiledning.
2. Opprett ny ressurs, følg veiledningen og fyll inn nødvendig informasjon og detaljer om tjenesten.
3. Angi tilgangsregler for ressursen. Tilgangsregler må for ressursen må konfigureres slik at de tillater følgende handlinger:
    - "read" ment for mottakere å åpne og lese en melding
    - "write" ment for avsendere å sende en melding
    - "subscribe" for å registrere hendelsesabonnement i Altinn Events

Her er en [eksempelpolicy](ExamplePolicy.xml).

Merk at denne eksempelpolicyen angir en påkrevd brukerrolle "DAGL(daglig leder)" for brukeren som har tilgang til ressursen, og krever bruk av [Ressursrettighetsregister](../../../../authorization/what-do-you-get/resourceregistry/) (gå til engelsk språk for å se dokumentasjon for RRR) for å gi tilgang til spesifikke organisasjoner.
En bruker med denne tilgangen kan deretter delegere tilgangen til virksomhetsbrukeren/systembrukeren

**TIPS**: Verifiser konfigurasjonene dine ved hjelp av [Postman-samlingen](https://github.com/Altinn/altinn-correspondence/blob/main/altinn-correspondence-postman-collection.json), og erstatt testtokenene med dine egne Altinn-token (Se forespørselen "Logg inn i Maskinporten (Initialiser)" i Authenticator-mappen).



