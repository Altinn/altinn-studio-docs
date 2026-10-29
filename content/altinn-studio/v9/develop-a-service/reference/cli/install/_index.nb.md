---
title: Installere studioctl
linktitle: Installering
description: Kommandoer for å installere, kontrollere, oppdatere og avinstallere studioctl, kommandolinjeverktøyet for Altinn Studio.
toc: true
---

I v9 bruker du kommandolinjeverktøyet studioctl. Dokumentasjonen for v8 beskriver .NET-verktøyet `altinn.studio.cli`. Det bruker du ikke i v9.

{{% notice warning %}}
{{% insert "content/altinn-studio/shared/studioctl/preview-warning.nb.md" %}}
{{% /notice %}}

## Installere studioctl

Kjør denne kommandoen i en terminal på Mac og Linux:

```bash
curl -sSL https://altinn.studio/designer/api/v1/studioctl/install.sh | sh
```

På Windows kjører du denne kommandoen i PowerShell:

```powershell
iwr https://altinn.studio/designer/api/v1/studioctl/install.ps1 -useb | iex
```

Installasjonen kan spørre deg hvor du vil legge studioctl. Den installerer også det studioctl trenger for å kjøre den lokale testplattformen.

## Kontrollere installasjonen

Denne kommandoen viser hvilken versjon av studioctl du har:

```bash
studioctl --version
```

Denne kommandoen sjekker at maskinen har det du trenger for å jobbe med appen, blant annet .NET SDK og Docker, Podman eller Colima:

```bash
studioctl doctor
```

## Oppdatere studioctl

Denne kommandoen henter siste versjon av studioctl:

```bash
studioctl self update
```

Trenger du en bestemt versjon, legger du til `--version`, for eksempel `studioctl self update --version v0.1.0-preview.29`.

## Avinstallere studioctl

Denne kommandoen fjerner studioctl og dataene til studioctl fra maskinen:

```bash
studioctl self uninstall
```

Kommandoen stopper den lokale testplattformen og sletter innloggingen, innstillingene og testdataene til studioctl. Appene du har hentet til maskinen, blir ikke slettet.

Kommandoen spør før den fjerner noe. Legg til `--yes` hvis du ikke vil få spørsmålet.

## Neste steg

- [Oppgrader appen fra v8 til v9]({{< relref "/altinn-studio/v9/new-in-v9/upgrade" >}}).
- [Test appen på egen maskin]({{< relref "/altinn-studio/v9/getting-started/development/localtest/local-dev" >}}).
