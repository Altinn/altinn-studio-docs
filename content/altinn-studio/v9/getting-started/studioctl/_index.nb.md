---
draft: true
title: Installere og sette opp studioctl
linktitle: Sette opp studioctl
description: Slik installerer du studioctl, logger inn og henter appen til egen maskin.
weight: 2
toc: true
---

studioctl er et kommandolinjeverktøy fra Altinn Studio. Du bruker det når du skal jobbe med appen på egen maskin i stedet for i Altinn Studio Designer. Med studioctl kan du

- logge inn i Altinn Studio og hente appen til maskinen din
- teste appen på egen maskin
- oppgradere appen til en ny versjon av Altinn Studio

Vi anbefaler studioctl når du skal oppgradere appen. Det er som regel utvikleren eller leverandøren din som installerer og bruker verktøyet. Jobber du ikke selv med koden, kan du sende denne siden til dem.

{{% notice warning %}}
{{% insert "content/altinn-studio/shared/studioctl/preview-warning.nb.md" %}}
{{% /notice %}}

## Dette trenger du

studioctl virker på Windows, macOS og Linux. På maskinen må du også ha

- Git, slik at studioctl kan hente appen fra Altinn Studio
- .NET SDK, slik at du kan kjøre appen
- Docker, Podman eller Colima, slik at du kan starte den lokale testplattformen

Når du har installert studioctl, kan du [kontrollere at du har alt du trenger](#kontroller-oppsettet).

## Installer studioctl

Kjør denne kommandoen i en terminal på Mac og Linux:

```bash
curl -sSL https://altinn.studio/designer/api/v1/studioctl/install.sh | sh
```

På Windows kjører du denne kommandoen i PowerShell:

```powershell
iwr https://altinn.studio/designer/api/v1/studioctl/install.ps1 -useb | iex
```

Installasjonen kan spørre deg hvor du vil legge studioctl. Den installerer også det studioctl trenger for å kjøre den lokale testplattformen.

## Logg inn og hent appen

1. Logg inn i Altinn Studio:
   ```bash
   studioctl auth login
   ```
   Nettleseren åpner Altinn Studio, og du logger inn med Ansattporten som vanlig. studioctl husker innloggingen på maskinen din.
2. Hent appen. Bytt ut `<org>` med kortnavnet til virksomheten din og `<app-name>` med navnet på appen:
   ```bash
   studioctl app clone <org>/<app-name>
   ```
   Du kan også lime inn lenken til app-repoet i stedet for `<org>/<app-name>`.
3. Gå til mappen studioctl har laget for appen:
   ```bash
   cd <app-name>
   ```

Nå har du en kopi av appen på maskinen din. studioctl har også satt opp Git, slik at du kan laste opp endringene dine til Altinn Studio igjen.

{{% expandlarge id="login-with-token" header="Logge inn fra automatisering og CI" %}}

I automatiske byggeløp og andre steder der ingen kan logge inn i nettleseren, kan du sende inn en eksisterende API-nøkkel for Altinn Studio. I eksempelet ligger nøkkelen i en miljøvariabel:

```bash
printf '%s' "$STUDIO_DESIGNER_API_KEY" | studioctl auth login --with-token
```

{{% /expandlarge %}}

## Kontroller oppsettet

Kjør denne kommandoen:

```bash
studioctl doctor
```

Kommandoen sjekker blant annet at du har en ny nok versjon av .NET SDK, og at du har Docker, Podman eller Colima. Mangler noe, viser den hva det er.

## Oppdater studioctl

Det kommer jevnlig nye versjoner av studioctl. Hent siste versjon før du oppgraderer appen:

```bash
studioctl self update
```

Trenger du en bestemt versjon, legger du til `--version`, for eksempel `studioctl self update --version v0.1.0-preview.29`.

## Neste steg

- [Oppgrader appen fra v8 til v9]({{< relref "/altinn-studio/v9/new-in-v9/upgrade" >}}).
- [Test appen på egen maskin]({{< relref "/altinn-studio/v9/getting-started/development/localtest/local-dev" >}}).
