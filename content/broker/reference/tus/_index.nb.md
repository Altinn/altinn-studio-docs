---
title: Gjenopptakbar opplasting (TUS)
linktitle: TUS-opplasting
description: Last opp store filer til Altinn Formidling med TUS-protokollen for gjenopptakbar opplasting.
tags: []
toc: true
weight: 35
---

Altinn Formidling støtter [TUS](https://tus.io/) for gjenopptakbar opplasting av store filer. TUS deler opplastingen i mange korte HTTP-forespørsler. Hvis tilkoblingen brytes kan klienten fortsette fra siste vellykkede offset i stedet for å starte på nytt.

For mindre filer og enkle integrasjoner er [strømmeopplasting](/broker/getting-started/developer-guides/send-files/#operation-uploadstreamed) det beste valget.

## Når du bør bruke TUS

Bruk TUS når du trenger å

- laste opp filer som tar lang tid å overføre
- tåle brutt tilkobling, tidsavbrudd i proxy eller andre nettverksavbrudd
- unngå å holde én HTTP-tilkobling åpen i timevis

Strømmeendepunktet sender hele filen i én forespørsel. Det fungerer godt for mindre filer, men lange tilkoblinger avsluttes ofte av lastbalanserere eller reverse proxy.

Se også [Store filer](/broker/explanation/very-large-files/) for størrelsesgrenser og viruskanning over 50 GB.

## Forutsetninger

TUS-opplasting bruker samme autorisasjon som andre avsenderoperasjoner. Du trenger et Maskinporten-token med scope `altinn:broker.write`.

Før opplasting må du [initialisere filoverføringen](/broker/getting-started/developer-guides/send-files/#operation-initialize-filetransfer). Angi filstørrelse, sjekksum, mottakere og annen metadata i det kallet — på samme måte som for strømmeopplasting.

## Opplastingsflyt

1. **Initialiser** — `POST /broker/api/v1/filetransfer` returnerer en `fileTransferId`.
2. **Opprett TUS-opplasting** — `POST /broker/api/v1/filetransfer/upload/tus/{fileTransferId}` med headeren `Upload-Length` og `Tus-Resumable: 1.0.0`.
3. **Last opp deler** — send `PATCH`-forespørsler til samme URL til hele filen er lastet opp. Bruk `HEAD` for å lese gjeldende offset ved gjenopptak.
4. **Vent på behandling** — poll `GET /broker/api/v1/filetransfer/{fileTransferId}` eller abonner på [hendelser](/broker/getting-started/developer-guides/events/) til status er `Published` (eller `UploadProcessing` hvis viruskanning er aktivert).

Statusoverganger:

| Steg | Status |
|------|--------|
| Etter initialisering | `Initialized` |
| Etter TUS-opprettelse (`POST`) | `UploadStarted` |
| Under opplasting (`PATCH`) | `UploadStarted` |
| Etter fullført opplasting | `Published` eller `UploadProcessing` |
| Ved feil | `Failed` |

Ufullstendige opplastinger utløper etter 24 timer uten aktivitet.

## Endepunkter

Alle TUS-operasjoner bruker samme grunn-URL. Bytt ut `{fileTransferId}` med ID-en fra initialisering.

```
OPTIONS /broker/api/v1/filetransfer/upload/tus/{fileTransferId}
POST    /broker/api/v1/filetransfer/upload/tus/{fileTransferId}
HEAD    /broker/api/v1/filetransfer/upload/tus/{fileTransferId}
PATCH   /broker/api/v1/filetransfer/upload/tus/{fileTransferId}
DELETE  /broker/api/v1/filetransfer/upload/tus/{fileTransferId}
```

| Metode | Formål |
|--------|--------|
| `OPTIONS` | Finn ut hvilke TUS-utvidelser som støttes |
| `POST` | Opprett opplastingen (krever `Upload-Length`) |
| `HEAD` | Les gjeldende offset (for gjenopptak) |
| `PATCH` | Send neste del av fildata |
| `DELETE` | Avbryt en ufullstendig opplasting |

**TUS-versjon:** `1.0.0` (send `Tus-Resumable: 1.0.0` på hver forespørsel)

**Autorisasjon:** Bearer-token med `altinn:broker.write`

## Klientbiblioteker

Det er vanskelig å implementere TUS-protokollen manuelt uten feil. Bruk et TUS-klientbibliotek i stedet, for eksempel:

- [tus-js-client](https://github.com/tus/tus-js-client) (JavaScript)
- [tus-dotnet-client](https://github.com/Jon-Indico/TusDotNetClient) (.NET)

Pek klienten mot `/broker/api/v1/filetransfer/upload/tus/{fileTransferId}` og send samme Bearer-token som for andre Broker API-kall.

## Begrensninger

- **Upload-Length må angis ved opprettelse.** Utsatt lengde (`Upload-Defer-Length`) støttes ikke.
- **Sjekksum per del** er ikke aktivert. MD5-sjekksum kontrolleres når opplastingen er fullført (angis ved initialisering).
- **Nedlasting** er ikke tilgjengelig via TUS. Mottakere laster ned filer via [standard nedlastingsendepunkt](/broker/getting-started/developer-guides/receive-files/).
- **Ufullstendige opplastinger** fjernes etter 24 timer uten aktivitet.

## Konfigurasjon av reverse proxy

TUS krever ikke HTTP-tilkoblinger som varer i timevis. Hver `PATCH` er en kort forespørsel. Konfigurer proxyen til å tillate

- forespørselsstørrelse minst like stor som delstørrelsen (for eksempel 32 MiB pluss overhead)
- moderate tidsavbrudd for inaktivitet (minutter, ikke timer)

Hvis du fortsatt bruker strømmeendepunktet, kan du trenge lengre tidsavbrudd for den stien.

## Relatert dokumentasjon

- [Veiledning for avsender — initialiser og last opp](/broker/getting-started/developer-guides/send-files/)
- [Store filer](/broker/explanation/very-large-files/)
- [Hendelser](/broker/getting-started/developer-guides/events/)
- [OpenAPI-spesifikasjon](/nb/api/broker/spec/)
