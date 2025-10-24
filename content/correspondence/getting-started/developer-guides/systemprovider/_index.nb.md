---
title: Kom i gang systemleverandør
linktitle: Systemleverandør
description: "Systemleverandør: tilbyr sluttbrukersystem som gjennom en maskin-til-maskin-integrasjon som (blant annet) kan motta motta Altinn Melding."
tags: []
toc: false
weight: 20
---

{{<children />}}

Vi anbefaler systemleverandører å integrere seg mot Dialogportens APIer for å hente Altinn melding. Da vil man også få andre type brev (dialoger/transmissions) som ikke sendes med Altinn Mellding APIer. Dette gjelder for eksempel brev fra Skatteetaten, Nav og andre avsendere. Skatteetaten har allerede tatt i bruk dialoger. (Disse brevene når man ikke dersom man integrerer seg kun mot Meldings APIer.) 


{{% expandlarge id="onboarding-process" header="Onboarding prosess" %}}

Leverandører av sluttbrukersystemer som ønsker å få tilgang til funksjonalitet og tjenester i test- og produksjonsmiljø, må følge denne [onboarding-prosessen](https://samarbeid.digdir.no/altinn/kom-i-gang/2868).
{{% /expandlarge %}}


{{% expandlarge id="service-integration" header="Integrasjon mot tjenester" %}}

Se hvilke tjenester du kan sette opp integrasjon mot [her](https://samarbeid.digdir.no/altinn/integrasjon-mot-tjenester/2412).
{{% /expandlarge %}}


{{% expandlarge id="get-access-to-scopes" header="Tilgang til scopes" %}}

For å kunne autentisere og sikre at du kan utføre operasjoner via meldings-APIet, må Altinn gi deg tilgang på de scopes du trenger. Dette sikrer at kun autoriserte klienter kan sende og motta filer, og opprettholder dermed sikkerheten i tjenesten. 
- Oversikt over aktuelle scopes finner du [her](https://samarbeid.digdir.no/altinn/scopeoversikt-produkt-og-funksjonsomrade/3017).
- For å få tilgang til scopes, send en forespørsel til: [servicedesk@altinn.no](mailto:servicedesk@altinn.no). Forespørselen må inneholde de scopes du trenger for ditt system.
{{% /expandlarge %}}
