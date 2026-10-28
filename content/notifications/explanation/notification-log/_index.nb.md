---
title: Varslinglogg
description: "Konseptuell oversikt over varslingloggen og hvordan du bruker den til å spore, revidere og feilsøke varslinglevering."
linktitle: Varslinglogg
tags: [log, audit, tracking, troubleshooting, dialogporten]
weight: 40
---

Varslinglogg-API-et lar deg hente historiske loggoppføringer for varsler som er sendt gjennom Altinn Notifications. Denne siden forklarer hva varslinglogger er, hvorfor du trenger dem, og hvordan de brukes.

## Hva er en varslinglogg?

En varslinglogg fanger uforanderlige oppføringer av varslingsleveringsstatus som rapportert av e-post- eller SMS-leverandører på bestemte tidspunkter. Hver loggoppføring registrerer:

- **Varselet** — Unik ID, type (Notification, Reminder, Instant, Composed) og leveringskanal (E-post eller SMS)
- **Mottakeren** — E-postadresse eller telefonnummer varslet ble sendt til
- **Tidspunkt** — Når varslet ble forespurt sendt (requestedSendTime) og når leverandøren rapporterte resultatet (lastUpdateTime)
- **Resultat** — Leveringsresultatet kodet i statusfeltet (f.eks. `Email_Delivered`, `Email_Failed_RecipientReserved`, `SMS_Failed_BarredReceiver`)

Fordi oppføringer er uforanderlige poster av leverandørrapportert status, viser de leveringsresultatet på det tidspunktet leverandøren rapporterte det—ikke en fullstendig historie over alle statusendringer.

## Hvorfor hente varslinglogger?

Varslingloggen hjelper deg i flere viktige scenarier:

### Revisjon og samsvar
Oppretthold et komplett, manipuleringssikkert revisjonsspor for kommunikasjon knyttet til Dialogporten-dialoger og -overføringer.

### Feilsøking av leveringsproblemer
Når et varsel ikke når en mottaker, viser loggen:
- Om varslet ble behandlet
- Leveringsresultatet (vellykket eller mislykket)
- Feiltype kodet i statusen (f.eks. `Email_Failed_InvalidFormat`)
- Tidspunktet leverandøren rapporterte resultatet (ikke en fullstendig statushistorie)

### Sporing av flerkanals levering
For varsler sendt på både e-post og SMS viser loggen separate oppføringer for hver kanal, slik at du kan se nøyaktig hva som skjedde på hver kanal.

### Korrelering med Dialogporten
Loggoppføringene inkluderer Dialogporten `dialogId` og `transmissionId`, som lar deg korrelere Altinn Notifications-aktiviteter med dialog- og overføringshendelser i Dialogporten.

### Integrasjon og overvåking
Hent varslingsleveringsdata programmatisk for å integrere med dine egne overvåkingssystemer, dashboards eller arbeidsflyter.

## Varslinglogg sammenlignet med andre statusverkytøy

Altinn Notifications tilbyr flere måter å sjekke leveringer på:

| Verktøy | Endepunkt | Formål | Best når |
|---------|-----------|--------|----------|
| **Status-API** | `/future/shipment/{id}` | Sanntidsstatus for en forsendelse | Du kjenner forsendelse-IDen og ønsker gjeldende status |
| **Status Feed** | `/future/shipment/feed` | Sekvensiell feed av statusoppdateringer | Du poller for nye oppdateringer |
| **Varslinglogg** | `/future/log` | Historisk oppslag etter dialog/overføring | Du finne alle varsler for en Dialogporten-interaksjon |

Loggen er optimalisert for **retrospektive oppslag etter Dialogporten-identifikatorer**, ikke sanntidsovervåking.

## Varslingloggdata

Hver loggoppføring inneholder:

- **notificationId** — Unik identifikator for varselet
- **dialogId** — Dialogporten dialog-ID (hvis tilknyttet)
- **transmissionId** — Dialogporten overførings-ID (hvis tilknyttet)
- **type** — Varslingordningstype (Notification, Reminder, Instant, Composed)
- **channel** — E-post eller SMS
- **destination** — E-postadresse eller telefonnummer
- **status** — Leveringsresultat (Email_Delivered, SMS_Accepted, Email_Failed_*, etc.)
- **requestedSendTime** — Når ordren forespurte varslet sendt
- **lastUpdateTime** — Når leverandøren rapporterte leveringsresultatet

For fullstendige feltbeskrivelser, se [Varslinglogg-referansen](/nb/notifications/reference/notification-log/).

## Spørremønstre

Logg-API-et støtter tre spørremønstre:

1. **Etter dialog-ID** — Få alle varsler for en dialog
2. **Etter overførings-ID** — Få alle varsler for en overføring
3. **Etter begge** — Få varsler for en spesifikk overføring innenfor en dialog

Minst en identifikator må oppgis.

## Eksempler

### "Sendte vi et varsel for denne dialogen?"

Spør etter `dialogId` for å se alle varsler for den dialogen, på tvers av alle kanaler og ordningstyper.

### "Hvorfor ble ikke e-posten levert?"

Spør etter `dialogId` eller `transmissionId`, finn e-postoppføringen og kontroller `status`-feltet. `Email_Failed_InvalidFormat` betyr ugyldig e-postadresse. `Email_Failed_RecipientReserved` betyr mottakeren blokkerte e-poster.

### "Hvilke mottakere fikk både e-post og SMS?"

Spør etter `dialogId` og teller hvor mange oppføringer som finnes for hver `destination` på tvers av begge kanaler.

### "Generer revisjonsspor for samsvar"

Spør etter `dialogId` for å generere revisjonslogger som viser hvilke varsler som ble behandlet og deres leveringsstatus, som påkrevd for dine compliance- og regulatoriske forpliktelser.

## Viktige merknader

- **Immutable** — Loggoppføringer er skriv-en-gang-poster. Når de er opprettet, endres de aldri.
- **Status fra leverandør** — Hver loggoppføring fanger leveringsstatus rapportert av leverandøren (e-post- eller SMS-tjeneste).
- **Ikke full statushistorie** — Loggen returnerer ikke alle statusendringer, bare leverandørens rapporterte leveringsresultater på bestemte tidspunkter.
- **Spørringstidsfiltrering** — Resultater filtreres etter `dialogId` og/eller `transmissionId` ved spørring, ikke lagret i separate tabeller.

## Se også

- [Varslinglogg-referanse](/nb/notifications/reference/notification-log/) — Teknisk API-spesifikasjon
- [Statusverdi-referanse](/nb/notifications/reference/notification-status/) — Alle leveringsstatuser
- [API-oversikt](/nb/notifications/reference/api/) — Andre API-er
