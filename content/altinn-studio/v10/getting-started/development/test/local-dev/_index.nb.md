---
draft: true
title: Lokal utvikling
linktitle: Lokal utvikling
description: Slik kommer du i gang med lokal utvikling
tags: [needsReview]
toc: true
weight: 40
aliases:
- /nb/altinn-studio/guides/local-dev/
---

Når du utvikler en app, jobber du både i Altinn Studio og i et lokalt utviklingsmiljø.
Her er en oversikt over hvordan du kommer i gang med lokal utvikling. 

## Slik kloner du appen til et lokalt utviklingsmiljø

`studioctl` er et anbefalt kommandolinjeverktøy for lokal utvikling av Altinn Studio-apper.
Verktøyet logger inn mot Altinn Studio, kloner app-repoet og setter opp Git-autentisering for deg.

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

For automatisering og CI kan du sende inn en eksisterende Studio/Designer API-nøkkel via standard input:

```bash
studioctl auth login --with-token < token.txt
```

{{% expandlarge id="legacy-clone-with-git" header="Gammel metode: Klone manuelt med Git" %}}

1. Finn appen du vil jobbe med lokalt i Dashboardet i Altinn Studio
2. Åpne repositoriet. Klikk på **Repository**-knappen
    ![Repositoryknappen markert i et bilde](find-app-in-dashboard.png)
    *Bytt ut dette bildet.*
3. Kopier lenken til repoet (den blå firkanten), enten manuelt eller ved å klikke på knappen markert med en rød sirkel.
    ![Markert url til repository i Gitea i et bilde](copy-repo-link.png)
    *Vurder å bytte dette bildet.*
4. Åpne en terminal i ditt lokale utviklingsmiljø:
    - Gå til ønsket lokasjon for applikasjonsrepoet.
    - Skriv kommandoen `git clone` og lim inn URLen du kopierte i forrige steg.
    ```cmd
    $ git clone https://altinn.studio/repos/<org>/<app-name>.git
    ```
    -  Hvis du har logget inn i Altinn Studio uten å lage passord (f. eks. Github login), kan du [lage et personlig access token i Gitea](https://altinn.studio/repos/user/settings/applications) som kan brukes som passord ved kloning:
    ```cmd
    $ git clone https://<brukernavn>:<access-token>@altinn.studio/repos/<org>/<app-name>.git
    ```
    - I terminalen skal du se et resultat som likner dette:
    ```cmd
    Cloning into 'app-name'...
    remote: Enumerating objects: 982, done.
    remote: Counting objects: 100% (982/982), done.
    remote: Compressing objects: 100% (950/950), done.
    remote: Total 982 (delta 600), reused 0 (delta 0), pack-reused 0
    Receiving objects: 100% (982/982), 166.38 KiB | 1.51 MiB/s, done.
    Resolving deltas: 100% (600/600), done.
    ```

Systemet oppretter en mappe med samme navn som appen og kopierer innholdet i app-repoet inn i mappen.
Nå kan du åpne ditt foretrukne utviklingsverktøy og komme i gang med utviklingen.

{{% /expandlarge %}}

## Slik synkroniserer du endringer i lokalt utviklingsmiljø

Du må laste opp (*pushe*) endringer som du gjør lokalt til repoet koden ble klonet fra.
Hvis du gjør endringer i Altinn Studio Designer (og laster disse opp til repoet), må du hente dem ned (*pull*) for å oppdatere den lokale koden.

Du kan synkronisere endringer i det lokale utviklingsmiljøet på flere måter.
Mange utviklingsverktøy har gode integrasjoner for nettopp dette, så sjekk gjerne om ditt verktøy har den typen støtte.

Under kan du lese mer om hvordan du synkroniserer endringer fra kommandolinjen.

### Laste opp endringer

1. Gå til app-repoet ditt i en terminal.
2. Legg til filene du ønsker å laste opp endringer for (*pushe*) med kommandoen `git add <sti til filen>`. Du kan kjøre kommandoen for enkeltfiler, flere filer samtidig eller en mappe.
3. Lagre (*commit*) endringene med en fornuftig melding med kommandoen `git commit -m <commit-melding>`.
4. Last opp (*push*) endringene til master med kommandoen `git push`.

### Laste ned endringer

Gå til app-repoet ditt i en terminal og kjør kommandoen `git pull`.

[Les mer om _git pull_ her](https://git-scm.com/docs/git-pull)

## Slik synkroniserer du endringer i Altinn Studio

I Altinn Studio må du synkronisere endringer på samme vis som ved lokale endringer.

### Last ned endringer
1. Klikk på **Hent endringer** på Utforming-siden til appen i Altinn Studio.
   ![Hent endringer i Altinn Studio](toolbar-hent.png)
   *Bytt dette bildet.*

   Du får en bekreftelse på at appen din er oppdatert.

### Last opp endringer

1. Klikk på **Last opp dine endringer** på Utforming-siden til appen i Altinn Studio.
   ![Last opp endringer i Altinn Studio](toolbar-last-opp.png)
   *Bytt dette bildet.*
2. Legg inn en beskrivende tekst for endringen(e) og klikk på **Valider endringer**.
    ![Commitmelding](commit-message.png)
    *Bytt dette bildet.*

   Systemet validerer endringene. Oppstår det en konflikt, klikker du på **Løs konflikt** og følger instruksjonene.

3. Klikk på **Lagre** for å laste opp endringene til repoet (master).
    ![Lagre validerte endringer](changes-validated.png)
    *Bytt dette bildet.*

   Du får en bekreftelse på at endringene er lastet opp.

## Lokal testing

Du kan forhåndsvise endringene du gjør når du jobber lokalt.
`studioctl` starter den lokale testplattformen, kjører appen og kobler appen til local.altinn.cloud.
Du trenger en container runtime, for eksempel Docker eller Podman, og .NET SDK for å kjøre appen som en lokal prosess.
Kjør `studioctl doctor` hvis du vil sjekke at maskinen har det som trengs.

{{% notice info %}}
**MERK**
For å kunne kjøre appen i LocalTest må appen ha en tilknyttet [datamodell](/nb/altinn-studio/v10/develop-a-service/reference/data/data-modeling/).
{{% /notice %}}

1. **Start lokal testplattform**: Gå til app-repoet i terminalen og kjør `studioctl env up`.
2. **Kjør appen i LocalTest**: Kjør `studioctl app run` fra app-repoet. Kommandoen finner appmappen automatisk og starter appen med riktige lokale innstillinger.
3. **Forhåndsvis og test appen**: Gå til [http://local.altinn.cloud](http://local.altinn.cloud) og logg inn med en [testbruker](/nb/altinn-studio/v10/test-a-service/testing/local/testusers/).

Du kan også åpne nettleseren direkte når testplattformen starter:

```bash
studioctl env up --open
studioctl app run
```

Nyttige kommandoer:

| Kommando | Beskrivelse |
| -------- | ----------- |
| `studioctl env status` | Viser status for lokal testplattform. |
| `studioctl env logs` | Viser logger fra LocalTest-containerne. |
| `studioctl app run --detach` | Kjører appen i bakgrunnen. |
| `studioctl app logs` | Viser logger fra en app som kjører i bakgrunnen. Bruk `--follow` for løpende logg. |
| `studioctl app stop` | Stopper apper som er startet med `studioctl app run --detach`. |
| `studioctl env down` | Stopper lokal testplattform. |
| `studioctl doctor` | Diagnostiserer manglende verktøy og lokale miljøproblemer. |

### Se endringer fortløpende

- Hvis du endrer JSON-filer, holder det å laste inn siden på nytt.
- Hvis du endrer forhåndsutfylling, må du starte en ny instans av appen (gå til [http://local.altinn.cloud](http://local.altinn.cloud) og logg inn igjen).
- Hvis du endrer C#-filer, må du stoppe appen (`ctrl+C`) og starte den på nytt (`studioctl app run`).

Du kan oppdatere automatisk ved endring i C#-filer ved å starte appen med `dotnet watch`.
Denne kommandoen vil enten starte appen eller laste den på nytt ([hot reload](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-watch#hot-reload)) ved endringer i kildekoden.

### Stoppe app og LocalTest

Stopp appen ved å trykke `ctrl+C` i terminalvinduet der du startet den.
Stopp LocalTest med `studioctl env down`.

{{% expandlarge id="legacy-app-localtest" header="Gammel metode: Kjøre app-localtest manuelt" %}}

Den gamle arbeidsflyten bruker `app-localtest`-repoet direkte.
Denne metoden er fortsatt nyttig hvis du må feilsøke et gammelt oppsett, men den anbefalte lokale arbeidsflyten er `studioctl`.

1. **Last ned og start LocalTest** ved å følge stegene [som vi beskriver på GitHub](https://github.com/Altinn/app-localtest/blob/master/README.md) (inkluderer start av app som vi også forklarer under).
2. **Kjør appen i LocalTest**: Åpne et nytt terminalvindu og gå til undermappen *App* i appen din (`<app-name>/App`). Start appen med kommandoen `dotnet run` og vent på bekreftelse i terminalen.
3. **Forhåndsvis og test appen**: Gå til [http://local.altinn.cloud](http://local.altinn.cloud) og logg inn med en [testbruker](/nb/altinn-studio/v10/test-a-service/testing/local/testusers/).

Stopp appen ved å trykke `ctrl+C` i terminalvinduet der du startet den.
Stopp LocalTest ved å gå til mappen `app-localtest` i terminalen og kjøre kommandoen `docker compose down`.

{{% /expandlarge %}}
