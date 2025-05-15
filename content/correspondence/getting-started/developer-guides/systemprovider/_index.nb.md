---
title: Kom i gang systemleverandør
linktitle: Kom i gang systemleverandør
description: "Systemleverandør: tilbyr sluttbrukersystem som håndterer mottak og lagring av Altinn Melding, gjennom en maskin-til-maskin-integrasjon."
tags: []
toc: false
weight: 20
---

{{<children />}}

For å komme i gang som systemleverandør følg denne veiledningen: 

[Autentisering for systemleverandører](https://docs.altinn.studio/nb/authentication/guides/systemvendor/)

### Skaff Altinn API-nøkkel og tilgang til scopes {#get-an-altinn-api-key}
For å bruke Altinn Melding må man ha en abonnementsnøkkel. Teknisk sett er dette en API-nøkkel som må inkluderes i forespørselens `Ocp-Apim-Subscription-Key` header for å verifisere at du har rett til å bruke Meldings API-et. Uten denne nøkkelen vil forespørselen din bli avvist.
For å kunne autentisere og sikre at du kan utføre operasjoner via meldings-APIet, må Altinn gi deg tilgang på de scopes du trenger. Dette sikrer at kun autoriserte klienter kan sende og motta filer, og opprettholder dermed sikkerheten i tjenesten. Følgende scopes brukes for å motta meldinger:
- `altinn:correspondence.read`

For å få Altinn API-nøkkel og scopes må du sende en forespørsel til: servicedesk@altinn.no 
Forespørselen må inneholde de scopes du trenger. Vær obs på at du kan trenge flere scopes for integrasjonen din enn bare altinn:correspondence.read. 
Utfyllende liste over scopes finner du her: 
https://docs.altinn.studio/nb/api/authentication/digdirscopes/ 