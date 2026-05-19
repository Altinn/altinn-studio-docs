---
title: Lokal utvikling
linktitle: Lokal utvikling
description: Hvordan komme i gang med lokal utvikling
toc: true
weight: 999
aliases:
- /nb/altinn-studio/guides/local-dev/
---

Under utvikling av en applikasjon vil man måtte jobbe både i Altinn Studio og 
i et lokalt utviklingsmiljø. 
Her er en oversikt over hvordan du kommer i gang med lokal utvikling. 

## Hvordan klone applikasjonen til et lokalt utviklingsmiljø

{{% insert "content/altinn-studio/shared/studioctl/local-development-intro.nb.md" %}}

{{% notice warning %}}
{{% insert "content/altinn-studio/shared/studioctl/preview-warning.nb.md" %}}
{{% /notice %}}

{{% insert "content/altinn-studio/shared/studioctl/install-clone.nb.md" %}}

{{% expandlarge id="legacy-clone-with-git" header="Gammel metode: Klone manuelt med Git" %}}

1. Finn applikasjonen du vil jobbe med lokalt i Dashboardet i Altinn Studio
2. Navigér til repositoriet ved å trykke på _Repository_-knappen
    ![Repositoryknappen markert i et bilde](find-app-in-dashboard.png)
3. Kopiér lenken til repoet (den blå firkanten), enten manuelt
   eller ved å trykke på knappen markert med en rød sirkel.
    ![Markert url til repository i Gitea i et bilde](copy-repo-link.png)
4. Åpne en terminal i ditt lokale utviklingsmiljø
    - Naviger til ønsket lokasjon for applikasjonsrepoet
    - Skriv kommandoen `git clone` og lim inn URLen du kopierte i forrige steg
    ```cmd
    $ git clone https://altinn.studio/repos/<org>/<app-name>.git
    ```
    -  Hvis du har logget inn i Altinn Studio uten å lage passord (f. eks. Github login),
    så kan du [lage et personlig access token i Gitea](https://altinn.studio/repos/user/settings/applications)
    som kan brukes som passord ved kloning:
    ```cmd
    $ git clone https://<brukernavn>:<access-token>@altinn.studio/repos/<org>/<app-name>.git
    ```
    - I terminalen skal du se en output som likner dette
    ```cmd
    Cloning into 'app-name'...
    remote: Enumerating objects: 982, done.
    remote: Counting objects: 100% (982/982), done.
    remote: Compressing objects: 100% (950/950), done.
    remote: Total 982 (delta 600), reused 0 (delta 0), pack-reused 0
    Receiving objects: 100% (982/982), 166.38 KiB | 1.51 MiB/s, done.
    Resolving deltas: 100% (600/600), done.
    ```

En mappe med samme navn som applikasjonen er opprettet og innholdet i applikasjonsrepoet er klonet inn i mappen.
Nå er det bare å åpne ditt foretrukne utviklingsverktøy og komme i gang med utviklingen.

{{% /expandlarge %}}

## Hvordan synkronisere endringer i lokalt utviklingsmiljø

Endringer som gjøres lokalt må lastes opp (_pushes_) til repoet koden ble klonet fra.
 Hvis det gjøres endringer i Altinn Studio Designer (og disse er lastet opp til repoet) må de hentes ned (_pull_) for å oppdatere den lokale koden.

Sykronisering av endringer gjort i det lokale utviklingsmiljøet kan gjøres på flere måter.
Mange utviklingsverktøy har gode integrasjoner for nettopp dette, 
sjekk gjerne om ditt verktøy har den typen støtte. 

Nedenfor er det beskrevet hvordan man kan synkronisere endringer 
fra kommandolinjen.

### Laste opp endringer

1. Navigér til applikasjonsrepoet ditt i en terminal.
2. Legg til filene du ønsker å laste opp endringer for (_pushe_) med kommandoen `git add <sti til filen>`.
   Kommandoen kan kjøres for enkeltfiler, flere filer samtidig eller en mappe.
3. Lagre (_commit_) endringene med en fornuftlig melding med kommandoen `git commit -m <commit-melding>`
4. Last opp (_push_) endringene til master med kommandoen `git push`.

### Laste ned endringer

Navigér til applikasjonsrepoet ditt i en terminal og kjør kommandoen `git pull`.

[Les mer om _git pull_ her](https://git-scm.com/docs/git-pull)

## Hvordan synkronisere endringer i Altinn Studio

I Altinn Studio må endringer synkroniseres på samme vis som ved lokale endringer.

### Laste ned endringer
1. Trykk på _Hent endringer_ på Lage-siden til applikasjonen i Altinn Studio.
   ![Hent endringer i Altinn Studio](toolbar-hent.png)
2. Har alt gått bra vil du se denne bekreftelsen.
    ![Hent endringer bekreftelse](pull-successful.png)

### Laste opp endringer

1. Trykk på _Last opp dine endringer_ på Lage-siden til applikasjonen i Altinn Studio.
   ![Last opp endringer i Altin Studio](toolbar-last-opp.png)
2. Legg inn en beskrivende tekst for endringen(e) og trykk _Valider endringer_.
    ![Commitmelding](commit-message.png)
3. Vent på at endringene valideres. Oppstår det en konflikt trykker du på _Løs konflikt_ og følger instruksjonene.
4. Trykk _Lagre_ for å laste opp endringene til repoet (master).
    ![Lagre validerte endringer](changes-validated.png)
5. Har alt gått bra vil du se denne bekreftelsen.
    ![Lagre bekreftelse](push-successful.png)

## Lokal testing

{{% insert "content/altinn-studio/shared/studioctl/local-test-workflow.nb.md" "/nb/altinn-studio/v8/reference/data/data-modeling/" "/nb/altinn-studio/v8/reference/testing/local/testusers/" %}}
{{% insert "content/altinn-studio/shared/studioctl/useful-commands.nb.md" %}}

### Se endringer fortløpende

- Ved endringer knyttet til JSON-filer holder det å laste inn siden på nytt.
- Ved endringer i forhåndsutfylling må applikasjonen instansieres på nytt (gå til [http://local.altinn.cloud:8000](http://local.altinn.cloud:8000) og logg inn igjen).
- Ved endringer i C#-filer må applikasjonen stoppes (`ctrl+C`) og startes på nytt (`studioctl run`).

For å oppdatere automatisk ved endring i C#-filer, start applikasjonen med `dotnet watch`.
Denne kommandoen vil enten starte applikasjonen eller laste den inn på nytt ([hot reload](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-watch#hot-reload)) ved endringer i kildekoden.

{{% insert "content/altinn-studio/shared/studioctl/stop-local-test.nb.md" %}}

{{% expandlarge id="legacy-app-localtest" header="Gammel metode: Kjøre app-localtest manuelt" %}}

{{% insert "content/altinn-studio/shared/studioctl/legacy-app-localtest.nb.md" "/nb/altinn-studio/v8/reference/testing/local/testusers/" %}}

{{% /expandlarge %}}
