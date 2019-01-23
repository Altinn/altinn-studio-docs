---
title: First-time setup of Altinn Studio
linktitle: First-time setup
description: Setup Sett opp bruker i AltinnStudio for første gangs bruk.
tags: ["guide"]
weight: 100
---

## Create a user

Set up your user in [altinn.studio](https://altinn.studio) for the first time.

{{% notice info %}}
ONLY necessary if you have not already created a user.
{{% /notice %}}

1. Choose to log in
![Login](login.png?width=800)

2. Choose "Sign In with {{<icon name="fa-github" size="xx-large">}}"
![Login with GitHub](login-with-github.png?width=800)

3. Login with your GitHub user. If you don't have a user, click "Create an account".
![GitHub login](github-login.png?width=400)

4. Register a user in Altinn Studio (the box at the bottom). This user will be linked to your GitHub user.
![Gitea register](gitea-register.png?width=800)


## Opprett organisasjon
{{% notice info %}}
MERK: Kun nødvendig dersom ønsket organisasjon ikke allerede er opprettet.
{{% /notice %}}

1. Velg **+**-menyvalg i toppmenyen
2. Velg **New Organization**
3. Fyll ut navn på organisasjon og opprett.

{{<figure src="create-org.gif?width=1000" title="Lag ny organisasjon">}}

## Opprett repository for tjeneste

1. Velg **+**-menyvalg i toppmenyen
2. Velg **New Repository**
3. Velg organisasjon som eier
4. Fyll ut navn på repository
5. Opprett tjeneste

Tjenesten er nå synlig på startsiden.

{{<figure src="create-repo.gif?width=1000" title="Lag nytt repository">}}

## Klone tjenesten til lokal mappe

1. Fra startsiden, gå til repoet
2. Velg **clone service**
    - Dersom **Applikasjonsnøkkel** ikke er lagt inn vil du bli bedt om å legge inn dette, se [her](#add-app-token). Når dette er fullfør, start fra punkt 1.
3. Tjenesten er nå klar til bruk.


