---
title: Systembruker
description: API for the eksterne og interne systemer til å administrere the systembruker
toc: true
---

## Systembruker API
Systembruker-API-et gir metoder for eksterne brukere å hente informasjon om systembrukere. Det interne API-et hjelper med å administrere systembrukere

## Sikkerhetsskjema
Bærerautentiseringsordningen brukes for å autentisere den eksterne.
Systembruker-API-et krever at den eksterne autentiserer seg med et bærertoken, som er et maskinporten-token med spesifikk omfang.
For å få et maskinporten-token, må den eksterne først opprette en klient i maskinporten. Du kan følge trinnene i denne lenken for å sette opp en maskinporten-klient.

## Eksterne API Metoder

- [Verifiser party integrasjon](external#verifiser-party-integrasjon)
- [List alle systembrukere for et system](external#list-opp-alle-systembrukere-for-en-system)

## Internal API Metoder
- [Hent Systembruker](internal#hent-systembruker-etter-systembruker-id)