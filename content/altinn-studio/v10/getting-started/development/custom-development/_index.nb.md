---
title: Tilpasninger i egenutviklet kode
linktitle: Egne tilpasninger
description: Gjør tilpasninger i appen din med egen kode
draft: true
weight: 40
---

## Om bruk av egen kode i en Altinn-app
En Altinn app er en komplett web-applikasjon, og dermed er det fullt mulig å legge inn egne tilpasninger for å støtte mer 
enn standard konfigurasjon støtter. 

### Eksempler på bruksområder
Listen er ikke utfyllende - her kan du i praksis få til hva som helst!

- Validere ved oppstart av f.eks. et skjema med avansert valideringslogikk, oppslag eller lignende.
- Forhåndsutfylle fra egne systemer dynamisk
- Beregninger og annen logikk underveis i utfylling
- Oppslag mot eksterne kilder underveis i utfylling og/eller ved innsending
- Logikk og/eller avansert validering ifm innsending eller overgang til ny oppgave i prosessen
- Lage/hente inn dynamiske kodelister
- Oppsett på funksjonalitet som ikke enda er støttet via konfigurasjon alene, f.eks. betaling.
- Behov for nye konsepter som ikke er støttet ut av boksen i en Altinn-app per i dag

## Lokal utvikling med studioctl

`studioctl` er kommandolinjeverktøyet for lokal utvikling av Altinn Studio-apper.
Du bruker det til å logge inn, klone appen, starte lokal testplattform og kjøre appen fra maskinen din.
Verktøyet kan også brukes i CI når du vil klone og teste en app uten en interaktiv innlogging.

Installer `studioctl`:

```bash
curl -sSL https://altinn.studio/designer/api/v1/studioctl/install.sh | sh
```

På Windows kan du installere fra PowerShell:

```powershell
iwr https://altinn.studio/designer/api/v1/studioctl/install.ps1 -useb | iex
```

Logg inn og klon appen:

```bash
studioctl auth login
studioctl app clone <org>/<app-name>
cd <app-name>
```

Når appen er klonet kan du åpne repoet i ønsket utviklingsverktøy og gjøre endringer i C#-kode, konfigurasjon, datamodeller, layouts og andre filer.
Husk å synkronisere endringer med Git når du bytter mellom Altinn Studio Designer og lokalt utviklingsmiljø.

For automatisering og CI kan du sende inn en eksisterende Studio/Designer API-nøkkel via standard input:

```bash
studioctl auth login --with-token < token.txt
```

## Kjøre og teste appen lokalt

Start lokal testplattform og kjør appen:

```bash
studioctl env up
studioctl app run
```

`studioctl app run` finner appmappen automatisk og starter appen med riktige lokale innstillinger.
Når appen kjører kan du teste den på [http://local.altinn.cloud](http://local.altinn.cloud) med en [testbruker](/nb/altinn-studio/v10/test-a-service/testing/local/testusers/).

Kjør `studioctl doctor` hvis noe ikke starter som forventet.
Kommandoen sjekker blant annet .NET SDK, container runtime og lokal konfigurasjon.

Nyttige kommandoer:

| Kommando | Beskrivelse |
| -------- | ----------- |
| `studioctl env up --open` | Starter lokal testplattform og åpner local.altinn.cloud. |
| `studioctl env status` | Viser status for lokal testplattform. |
| `studioctl env logs` | Viser logger fra localtest-containerne. |
| `studioctl app run --detach` | Kjører appen i bakgrunnen. |
| `studioctl app logs` | Viser logger fra en app som kjører i bakgrunnen. Bruk `--follow` for løpende logg. |
| `studioctl app stop` | Stopper apper som er startet med `studioctl app run --detach`. |
| `studioctl env down` | Stopper lokal testplattform. |
| `studioctl doctor` | Diagnostiserer manglende verktøy og lokale miljøproblemer. |

Hvis du endrer JSON-filer er det som regel nok å laste siden på nytt.
Hvis du endrer C#-kode, stopp appen med `ctrl+C` og start den på nytt med `studioctl app run`.

<!-- ## Konsept: Dependency injection
En Altinn-app bruker biblioteker som Digdir utvikler og forvalter. Gjennom disse bibliotekene eksponeres det grensesnitt
for konkret funksjonalitet. Når disse grensesnittene implementeres i din app og registreres der, vil koden som er implementert
kjøres ved definerte tidspunkt/hendelser. -->
