---
title: Administrer systemregister
description: API for leverandøren til å administrere systemregisteret
toc: true
---

## System Register API
Systemregister-API-et tilbyr API-metoder for leverandøren til å administrere systemet i altinn's system register.

## Security Scheme
Bearer-autentiseringsskjema brukes for å autentisere systemleverandøren.
Systemregister-API-et krever at systemleverandøren autentiserer seg med en bearer-token, som er en maskinporten-token med spesifikk scope.
For å få en maskinporten-token, må leverandøren først opprette en klient i maskinporten. Du kan følge trinnene i denne [lenken](https://docs.altinn.studio/authentication/getting-started/maskinportenclient/) for å sette opp en maskinporten-klient.

## API Methods

- [Opprett et nytt system](create/_index.nb.md)
- [Hent et system]()
- [Oppdater et system]()
- [Hent rettigheter for et system]()
- [Hent tilgangspakke for et system]()
- [Oppdater Rettigheter for et system]()
- [Oppdater tilgangspakke for et system]()