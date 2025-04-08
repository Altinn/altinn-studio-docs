---
title: Systembruker
description: API for the eksterne og interne systemer to administer the system user
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
- [List alle systembrukere for en system](external#list-opp-alle-systembrukere-for-en-system)

## Internal API Metoder
- [Hent Systembruker](internal#hent-systembruker-etter-systembruker-id)

## Internal API metoder for Standard systembruker

- [Opprett Standard Systembruker](internal#opprett-en-standard-systembruker)
- [List Standard Systembrukere](internal#list-opp-standard-systembrukere-for-partiet)
- [Slett Standard Systembruker](internal#slett-standard-systembruker)
- [List alle Systembrukere for Register komponent](internal#list-alle-systembrukere-for-registerkomponent)

## Internal API metoder for Agent systembruker

- [List Agent Systembrukere](internal#list-opp-agent-systembrukere-for-partiet)
- [hent Delegations for Agent Systembruker](internal#hent-delegeringer-for-en-agent-systembruker)
- [Deleger til an Agent Systembruker](internal#deleger-til-en-agent-systembruker)
- [Slett kunde fra en Agent Systembruker](internal#slett-kunde-fra-en-agent-systembruker)
- [Slett Agent Systembruker](internal#slett-en-agent-system-bruker)
