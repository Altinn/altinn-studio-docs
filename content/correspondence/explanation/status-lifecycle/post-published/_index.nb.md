---
title: Flyt Etter Publisering
linktitle: Flyt Etter Publisering
description: Altinn 3 Melding status livssyklus og mottaker interaksjoner etter publisering.
tags: []
toc: true
weight: 2
---

## Flyt Etter Publisering

Etter at en melding er publisert, kan mottakere samhandle med den:

{{< correspondence-life-cycle-post-published >}}

## Statustilstander Etter Publisering

1. **Hentet**: Mottaker har tilgang til meldingen (via GetOverview eller GetDetails API)
2. **Lest**: Mottaker har eksplisitt markert meldingen som lest (krever forutgående Hentet status)
3. **Vedlegg Lastet Ned**: Mottaker har lastet ned ett eller flere vedlegg (kan skje når som helst)
4. **Bekreftet**: Mottaker har bekreftet meldingen (krever forutgående Hentet status, ikke Lest)
5. **Slettet av Mottaker**: Meldingen er slettet av mottaker
6. **Slettet av Altinn**: Meldingen er slettet av systemet

## Regler for statusflyt

- **Hentet** settes automatisk når mottakere kaller GetOverview eller GetDetails
- **Lest** krever eksplisitt handling via `/markasread` endepunkt og krever forutgående Hentet status
- **Bekreftet** krever eksplisitt handling via `/confirm` endepunkt og krever forutgående Hentet status
- **Vedlegg Lastet Ned** kan skje fra enhver publisert tilstand og krever ikke Lest status
- **Lest status er valgfri** - mottakere kan bekrefte direkte fra Hentet uten å lese
- **Bekreftelse** er kun påkrevd hvis meldingen har `IsConfirmationNeeded = true`

## API Forskjeller

### Hoved Melding API
Hoved Altinn 3 Melding API (`/correspondence/api/v1/correspondence`) støtter:
- Marker som Lest
- Bekreft
- Slett

### Kun Legacy API
Arkiveringsfunksjonalitet er **kun tilgjengelig** i Legacy API (`/correspondence/api/v1/legacy/correspondence`):
- Arkiver melding

## Mottaker Interaksjonsprosess

### Henting av Melding
- Mottakere får tilgang til meldingsdetaljer (utløser Hentet status)
- Dette utløses automatisk av GetOverview eller GetDetails API-kall
- Påkrevd før andre mottakerhandlinger

### Lesing og Bekreftelse
- Eventuelt marker som lest (eksplisitt handling påkrevd)
- Last ned vedlegg når som helst (utløser Vedlegg Lastet Ned status)
- Bekreft hvis påkrevd (kun hvis `IsConfirmationNeeded = true`)
- Lest status er ikke påkrevd for bekreftelse

### Sletting
- Mottakere kan slette melding når den ikke lenger trengs
- Systemet kan også slette meldinger basert på oppbevaringspolicyer

## Feilhåndtering

### Under Mottakerhandlinger
- **HTTP 400 Bad Request**: Forsøk på å lese/bekrefte uten å hente først
- **HTTP 404 Not Found**: Melding ikke tilgjengelig for mottaker i nåværende tilstand

## Varslingsadferd

- Påminnelsesvarsler kan sendes for uleste meldinger
- Varselsending stopper når melding markeres som lest
- Varsler administreres uavhengig av meldingsstatus

Systemet opprettholder et komplett revisjonsspor av alle mottakerinteraksjoner og statusendringer for compliance og feilsøking. 