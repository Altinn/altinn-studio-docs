---
title: Systembruker
description: API til å få systembruker informasjon
toc: true
---

## Systembruker API
Systembruker-API-et gir metoder for eksterne brukere å hente informasjon om systembrukere.

## Sikkerhetsskjema
Bærerautentiseringsordningen brukes for å autentisere den eksterne.
Systembruker-API-et krever at den eksterne autentiserer seg med et bærertoken, som er et maskinporten-token med spesifikk scope.
For å få et maskinporten-token, må den eksterne først opprette en klient i maskinporten. Du kan følge trinnene i denne lenken for å sette opp en maskinporten-klient.

## Eksterne API Metoder

- [Verifiser party integrasjon](external#verifiser-party-integrasjon)
- [List alle systembrukere for et system](external#list-opp-alle-systembrukere-for-en-system)