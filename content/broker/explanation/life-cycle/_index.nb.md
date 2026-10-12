---
title: Livssyklus for filoverføring
linktitle: Livssyklus
description: Livssyklus for filoverføring i Altinn 3 Formidling
tags: []
toc: true
weight: 10
---

# Livssyklus for filoverføring i Formidling

Livssyklus for status i filoverføringer i Altinn Formidling, inkludert TUS-opplastingsfaser, glidende token-vinduer og mottakerhandlinger etter publisering.

## Oversikt

En filoverføring går gjennom flere statuser fra opprettelse til sletting. Her viser vi Formidling som **én sammenhengende livssyklus**: initialiser → last opp (inkludert TUS) → publiser → mottakerhandlinger → slett.

## Statusoversikt

### Filoverføring (`FileTransferStatus`)

| Status | Betydning |
|--------|---------|
| `Initialized` | Metadata er opprettet; klar for opplasting |
| `UploadStarted` | Minst én byte / TUS-opprettelse er godtatt |
| `UploadProcessing` | Sjekksum og/eller viruskanning pågår |
| `Published` | Tilgjengelig for nedlasting hos mottaker |
| `AllConfirmedDownloaded` | Alle mottakere har bekreftet nedlasting |
| `Failed` | Opplasting eller behandling feilet |
| `Purged` | Innhold er fjernet (TTL eller karens etter bekreftelse) |
| `Cancelled` | Reservert i modellen; skrives ikke av nåværende API-stier |

### Mottaker (`ActorFileTransferStatus`)

| Status | Betydning |
|--------|---------|
| `Initialized` | Mottaker er registrert ved initialisering |
| `DownloadStarted` | Mottaker har startet nedlasting |
| `DownloadConfirmed` | Mottaker har bekreftet nedlasting |

## Fullstendig livssyklus

{{< broker-life-cycle >}}

**Fargeforklaring:** grønn = vellykkede statusmilepæler · blå = venting / glidende vinduer · rød = feil · oransje = varsel eller klientfeil · rosa = start/slutt · lys blå = slettet (`Purged`).

## Viktige tidsintervaller

| Emne | Standard | Merknader |
|------|----------|----------|
| Ufullstendig TUS-opplasting | **24 timer glidende** | `TusOptions.UploadExpiration`; fornyes ved opplastingsaktivitet |
| Fastlåst `UploadStarted` → `Failed` | **24 timer** inaktivitet | Hoppes over hvis TUS-aktivitet innen siste **1 time** |
| Fastlåst `UploadProcessing` | **15 min** | Kun Slack-varsling |
| Brokerbox-sesjonscookie | **60 min glidende** | Forlenges av vellykket API-/TUS-trafikk |
| Altinn-token i cookie | ca. **2 min** | Byttes på nytt via ID-Porten-oppdatering så lenge det er mulig |
| ID-Porten-autorisasjon | ca. **2 timer** hard grense | Etter det kan TUS fortsette med karens for **aktiv opplastingsøkt** for samme `fileTransferId` |
| TTL for filoverføring | **30 dager** (maks **365 dager**) | Planlegger sletting ved utløp når du initialiserer |
| Sletting etter at alle har bekreftet | **PT2H** (maks **PT24H**) | Karens som kan konfigureres per ressurs |
| Størrelsesgrense for viruskanning | **50 GB** | Større filer kan hoppe over skanning avhengig av konfigurasjon |

## Viktige punkter

- **Opplastingsfasen** er enten strømmeopplasting (legacy) eller TUS (inkludert parallelle deler og endelig concatenation).
- **Gjenopptak** for ufullstendige TUS-opplastinger er et **glidende 24-timers** vindu uten aktivitet, ikke klokketid fra opprettelse.
- **Opplasting i nettleser over natten** kan overleve ID-Porten-innlogging ved at en utløpt sesjon godtas **kun** for en allerede aktiv TUS-opplasting på den filoverføringen.
- **`Published`** er tilstanden for nedlasting (det finnes ingen egen `Available`-status).
- **Feil på grunn av skadelig programvare** sletter lagringen og setter `Failed`; den flytter **ikke** overføringen til `Purged`.
- **Mottakerbekreftelse** krever tidligere `DownloadStarted`; når alle har bekreftet, kjører eventuell karenstid før sletting.
