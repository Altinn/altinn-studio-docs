---
title: Flyt Før Publisering
linktitle: Flyt Før Publisering
description: Altinn 3 Melding status livssyklus og valideringsprosess før publisering.
tags: []
toc: true
weight: 1
---

## Flyt Før Publisering

Følgende diagram viser den komplette flyten av en melding fra initialisering til publisering:

{{< correspondence-life-cycle-pre-published >}}

## Statustilstander Før Publisering

1. **Initialisert**: Meldingen er opprettet og har bestått første validering
2. **Reservert**: Mottaker har valgt bort digital kommunikasjon i KRR, men melding kan opprettes med `IgnoreReservation` flagg
3. **Klar for publisering**: Alle vedlegg (hvis noen) er behandlet og har bestått virusskanning
4. **Publisert**: Meldingen er vellykket publisert og tilgjengelig for mottakere

## Feilhåndtering Under Initialisering

Systemet returnerer HTTP-feilsvar for valideringsfeil under initialisering (ingen status blir satt):
- **400 Bad Request**: Manglende innhold, ugyldig format, tomme meldingsfelter, ugyldige vedlegg, ugyldige datoer, ugyldig språk
- **401 Unauthorized**: Ingen tilgang til ressurs, ressurs ikke hvitelistet, feil ressurstype

## Publiseringsprosess-feil

**Feilet** status settes under publiseringsjobben når:
- Mottakerorganisasjon ikke finnes i Enhetsregisteret
- Mottakerorganisasjon er konkurs eller slettet
- Mottaker mangler påkrevde roller for konfidensielle meldinger
- Andre publiseringstidsvalideringsfeil oppstår

## Vedleggsbehandling

1. **Opplasting pågår**: Vedlegget lastes opp og behandles
2. **Publisert**: Vedlegget har bestått virusscanning og er tilgjengelig for nedlasting
3. **Feilet**: Vedlegget feilet virusscanning eller behandling

Alle vedlegg må nå **Publisert** status før meldingen kan publiseres.

## Prosessflyt Detaljer

### Initialisering og Validering
- Melding opprettes og valideres
- Autorisasjonssjekker utføres
- Mottaker reservasjonsstatus sjekkes
- Vedlegg metadata valideres

### Vedleggsbehandling (hvis aktuelt)
- Filer lastes opp til blob storage
- Virusscanning utføres
- Vedlegg må bestå alle sjekker før melding kan publiseres

### Publiseringsprosess
- Mottaker validering utføres under publisering
- Dialogporten dialog opprettes
- Meldingsstatus settes til Publisert
- Informasjonsaktiviteter opprettes
- Hendelser publiseres til abonnenter

### Varslingshåndtering
- Varsler opprettes under initialisering
- Påminnelsesvarsler kan sendes for uleste meldinger
- Varslingsendinger stopper når melding markeres som lest

## Feilhåndtering Sammendrag

### Under Initialisering
- **HTTP 400 Bad Request**: Valideringsfeil (melding ikke opprettet)
- **HTTP 401 Unauthorized**: Autorisasjonsfeil (melding ikke opprettet)

### Under Publisering
- **Feilet status**: Settes når publiseringstidsvalidering feiler (mottakerproblemer, etc.)

Systemet opprettholder et komplett revisjons-spor av alle statusendringer og tidsstempler for compliance og feilsøking. 