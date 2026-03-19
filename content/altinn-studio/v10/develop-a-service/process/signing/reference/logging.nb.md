---
title: Logging
draft: true
---

## Altinn logger alle signeringer

Altinn logger alle signeringer. Loggen inneholder

- hvem som signerte (ID som kan kobles til fødselsnummer)
- hvilket sikkerhetsnivå personen brukte da de logget inn
- når signeringen skjedde
- hvilket steg i prosessen signeringen skjedde på

Altinn lagrer disse loggdataene adskilt fra tjenestene i en sentral database.


## Altinn lagrer loggen uansett

Digdir logger at signeringen ble utført. Selv om signaturobjektet blir slettet, lagrer Digdir fortsatt loggen som viser at noen signerte.

Altinn lagrer vanlige applikasjonslogger (for feilsøking) i 90 dager. Hendelseslogger lagres i 13 måneder.