---
title: Systembruker forespørselen
description: API for leverandøren til å administrere systembrukerforespørsler
toc: true
---

## Systembruker forespørsel API
API-en for systembrukerforespørsler gir API-metoder for leverandøren til å administrere systembrukerforespørsler.

## Sikkerhetsskjema
Bærerautentiseringsordningen brukes for å autentisere den eksterne.
Systembruker-API-et krever at den eksterne autentiserer seg med et bærertoken, som er et maskinporten-token med spesifikk omfang.
For å få et maskinporten-token, må den eksterne først opprette en klient i maskinporten. Du kan følge trinnene i denne lenken for å sette opp en maskinporten-klient.

## Eksterne API metoder for Systembruker
- [Fjern en systembruker forespørselen](external#slett-systembruker-forespørsel)

## Eksterne API metoder for Standard Systembruker

- [Opprett systembruker forespørselen](external#opprett-en-standard-systembrukerforespørsel)
- [Hent systembruker forespørselen](external#hent-en-systembruker-forespørsel)
- [List standard systembruker forespørseler for leverandøren](external#hent-systembruker-forespørseler-for-leverandøren)
- [Hent systembruker forespørselen for eksterne refereanse](external#hent-en-systembruker-foresporsel-med-eksterne-referanse)

## Eksterne API metoder for Agent Systembruker

- [Opprett systembruker forespørselen for agent](external#opprett-en-agent-systembruker-forespørsel)
- [Hent agent systembruker forespørselen](external#hent-en-agent-systembruker-forespørsel)
- [List agent systembruker forespørseler for leverandøren](external#hent-agent-systembruker-forspørseler-for-en-leverandør)
- [Hent systembruker forespørselen for eksterne refereanse](external#hent-en-agent-systembruker-forespørsel-med-eksterne-referanse)

## Interne API metoder for Standard Systembruker

- [Godkjenn en systembruker forespørsel](internal#godkjenn-en-systembrukerforespørsel)
- [Avvis en systembrukerforespørsel](internal#avvis-en-systembrukerforespørsel)

## Interne API metoder For Agent Systembruker

- [Hent agent systembruker for en party](internal#hent-en-agent-systembrukerforespørsel-etter-party-requestid)
- [Godkjenn en systembruker forespørsel](internal#godkjenn-en-agent-systembrukerforespørsel)
- [Avvis en systembrukerforespørsel](internal#avvis-en-agent-systembrukerforespørsel)