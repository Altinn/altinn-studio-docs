---
title: Systemregister
linktitle: Systemregister
description: API for leverandøren til å administrere systemregisteret
toc: true
---

## System Register API
Systemregister-API-et tilbyr API-metoder for leverandøren til å administrere systemet i altinn's system register.

## Sikkerhetsskjema
Bearer-autentiseringsskjema brukes for å autentisere systemleverandøren.
Systemregister-API-et krever at systemleverandøren autentiserer seg med en bearer-token, som er en maskinporten-token med spesifikk scope.
For å få en maskinporten-token, må leverandøren først opprette en klient i maskinporten. Du kan følge trinnene i denne [lenken](https://docs.altinn.studio/authentication/getting-started/maskinportenclient/) for å sette opp en maskinporten-klient.

## API Methods

- [Opprett et nytt system](create)
- [Hent et system](get)
- [Hent rettigheter for et system](get#hent-rettigheter-for-et-system)
- [Hent tilgangspakke for et system](get#hent-tilgangspakker-for-et-system)
- [Oppdater et system](update)
- [Oppdater Rettigheter for et system](update#oppdater-rettighet-for-et-system)
- [Oppdater tilgangspakke for et system](update#oppdater-tilgangspakker-for-et-system)