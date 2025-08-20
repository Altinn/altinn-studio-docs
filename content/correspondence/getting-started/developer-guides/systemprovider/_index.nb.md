---
title: Kom i gang systemleverandør
linktitle: Systemleverandør
description: "Systemleverandør: tilbyr sluttbrukersystem som håndterer mottak og lagring av Altinn Melding, gjennom en maskin-til-maskin-integrasjon."
tags: []
toc: false
weight: 20
---

{{<children />}}

For å komme i gang som systemleverandør følg denne veiledningen: 

[Leverandører av sluttbrukersystemer](https://samarbeid.digdir.no/altinn/kom-i-gang/2868)

### Tilgang til scopes {#get-access-to-scopes}
For å kunne autentisere og sikre at du kan utføre operasjoner via meldings-APIet, må Altinn gi deg tilgang på de scopes du trenger. Dette sikrer at kun autoriserte klienter kan sende og motta filer, og opprettholder dermed sikkerheten i tjenesten. Følgende scopes brukes for å motta meldinger:
- `altinn:correspondence.read`

For å få tilgang til scopes scopes må du sende en forespørsel til: servicedesk@altinn.no 
Forespørselen må inneholde de scopes du trenger. Vær obs på at du kan trenge flere scopes for integrasjonen din enn bare altinn:correspondence.read. 
Utfyllende liste over scopes finner du her: 
https://docs.altinn.studio/nb/api/authentication/digdirscopes/ 
