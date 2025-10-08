---
title: Systembruker forespørselen
description: API for leverandøren til å administrere systembrukerforespørsler
toc: true
---

## Systembruker forespørsel API
API-en for systembrukerforespørsler gir API-metoder for leverandøren til å administrere systembrukerforespørsler.

## Sikkerhetsskjema
Bærerautentiseringsordningen brukes for å autentisere den eksterne.
Systembruker-API-et krever at den eksterne autentiserer seg med et bærertoken, som er et Maskinporten-token med spesifikk scope.
For å få et Maskinporten-token, må den eksterne først opprette en klient i Maskinporten. Du kan [følge trinnene beskrevet her](/nb/authorization/getting-started/maskinportenclient/) for å sette opp en Maskinporten-klient.

## Systembruker typer
For øyeblikket tilbyr vi to ulike type systembrukere
1. Standard<br>
    Utformet for organisasjoner som bruker tredjeparts programvare for å utføre operasjoner som samhandler med flere offentlige og private virksomheter.
2. Agent<br>
    Utformet for organisasjoner, som for eksempel regnskaps firma, som opererer på vegne av sine kunder ved bruk av tredjeparts programvaresystemer integrert med flere offentlige og private virksomheter.

## API metoder for Systembruker
- [Fjern en systembruker forespørselen](external#slett-systembruker-forespørsel)

## API metoder for Standard Systembruker

- [Opprett systembruker forespørselen](external#opprett-en-standard-systembrukerforespørsel)
- [Hent systembruker forespørselen](external#hent-en-systembruker-forespørsel)
- [List standard systembruker forespørseler for leverandøren](external#hent-systembruker-forespørseler-for-leverandøren)
- [Hent systembruker forespørselen for eksterne refereanse](external#hent-en-systembruker-foresporsel-med-eksterne-referanse)

## API metoder for Agent Systembruker

- [Opprett systembruker forespørselen for agent](external#opprett-en-agent-systembruker-forespørsel)
- [Hent agent systembruker forespørselen](external#hent-en-agent-systembruker-forespørsel)
- [List agent systembruker forespørseler for leverandøren](external#hent-agent-systembruker-forspørseler-for-en-leverandør)
- [Hent systembruker forespørselen for eksterne refereanse](external#hent-en-agent-systembruker-forespørsel-med-eksterne-referanse)