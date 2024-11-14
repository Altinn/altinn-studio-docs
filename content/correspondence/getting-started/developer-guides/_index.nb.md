---
title: Veiledning for utviklere
linktitle: Utviklerveiledning
description: Velkommen til utviklerveiledningen for Altinn Melding! Denne delen av dokumentasjonen hjelper deg med å komme i gang med Altinn Melding og gir innsikt i hvordan du best kan utnytte plattformen. Vær oppmerksom på at dokumentasjonen fortsatt er under arbeid, og noen seksjoner kan være manglende eller bare delvis dokumentert.
tags: [Correspondence, guide, Melding]
toc: true
weight: 20
---

{{<children />}}

{{% notice warning  %}}
Denne delen av dokumentasjonen er under arbeid.
Det er seksjoner med manglende eller bare delvis dokumentasjon.
{{% /notice %}}

Siden Altinn Melding er åpen kildekode, kan du få tilgang til koden vår i [vårt offentlige GitHub-repo](https://github.com/Altinn/altinn-correspondence) og bygge en lokal Docker-instans for å teste mot.

Vi ønsker bidrag til løsningen velkommen.

Se [Readme-filen på GitHub](https://github.com/Altinn/altinn-correspondence/blob/main/README.md) for en introduksjon til Altinn 3 Melding, og hvordan du bygger og kjører den i din utviklermiljø.

Repoet inneholder også en [Postman-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn-correspondence-postman-collection.json) med eksempler.

Swagger for filoverførings-APIet er vert [her](/api/correspondence/spec/).

## Generell API-operasjon {#overall-api-operation}

Du må ha utført stegene i [Hvordan komme i gang](../../getting-started) for å sette opp tilgangskravene.

## Generell prosess {#overall-process}

Alle operasjoner er asynkrone, med mindre annet er angitt.
Som sådan bør du implementere hendelsesabonnementer for å optimalisere prosessen din i stedet for å stole på polling for status.

## Autentisering {#authentication}

For alle operasjoner må du autentisere deg ved å bruke din Maskinporten-klient og 
deretter [skaffe en Altinn-token fra Altinn-autentisering](https://docs.altinn.studio/authentication/reference/architecture/accesstoken/).

Bruk Altinn-tokenet som en Bearer-token for alle Melding API-forespørsler sammen med APIM-abonnementsnøkkelen som en header med nøkkelen `Ocp-Apim-Subscription-Key`.
