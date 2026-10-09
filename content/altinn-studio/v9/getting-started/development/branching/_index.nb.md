---
draft: true
title: Jobbe i grener
linktitle: Grener
description: Slik jobber du i egne grener av appen i Altinn Studio og fletter endringene inn i master
weight: 25
tags: [needsReview]
---

En gren er en egen utviklingslinje av appen. Du kan gjøre endringer i en gren uten at de påvirker hovedversjonen av appen. Hovedversjonen ligger i grenen `master`, som alle apper har.

Med grener kan du

- jobbe på flere ting samtidig, for eksempel ny funksjonalitet i én gren og feilrettinger i en annen
- la flere i teamet jobbe hver for seg uten å forstyrre hverandre
- prøve ut endringer uten å risikere hovedversjonen

Når du publiserer appen, bygger Altinn Studio den fra `master`. Endringer i en annen gren kommer først med når du har flettet grenen inn i `master`.

## Lage en ny gren

Du finner grenvelgeren øverst til høyre i Altinn Studio. Den viser navnet på grenen du står i.

1. Klikk på grenvelgeren.
2. Klikk på **Ny gren**.
3. Skriv et navn på grenen, for eksempel `feature/betaling`. Navnet kan ha bokstaver, tall, bindestreker og skråstreker.
4. Klikk på **Opprett gren**.

Altinn Studio bytter til den nye grenen.

Den nye grenen tar alltid utgangspunkt i `master` slik den ligger i Gitea. Det gjelder også når du står i en annen gren. Endringer du ikke har delt, blir ikke med.

## Bytte gren

1. Klikk på grenvelgeren.
2. Velg grenen du vil bytte til, under **Bytt gren**. Listen vises når appen har mer enn én gren.

Siden lastes inn på nytt, og du står i grenen du valgte.

Har du endringer du ikke har delt, kan du ikke bytte gren. Du får spørsmål om du vil slette endringene og bytte gren. Vil du beholde endringene, klikker du på **Nei, avbryt** og deler dem med **Del dine endringer** først.

## Dele endringer i en gren

Når du klikker på **Del dine endringer**, havner endringene i grenen du står i. De påvirker ikke `master` før du fletter grenen inn.

## Flette grenen inn i master

Du fletter grenen inn i `master` i Gitea, med en trekkforespørsel (pull request).

### Lage en trekkforespørsel

1. Del endringene dine i grenen.
2. Åpne menyen med tre prikker øverst til høyre i Altinn Studio, og klikk på **Repositorium**. Repoet åpnes i Gitea.
3. Gå til fanen **Trekkforespørsler**, og klikk på **New Pull Request**.
4. Velg `master` under **merge into** og grenen din under **pull from**.
5. Skriv en tittel og en beskrivelse av endringene.
6. Klikk på **Create Pull Request**.

### Flette trekkforespørselen

Du kan flette trekkforespørselen selv, eller be en kollega se over den først. Det avhenger av hvordan teamet ditt jobber.

1. Velg hvordan du vil flette:
   - **Create merge commit** beholder alle endringene i grenen som egne punkter i historikken.
   - **Create squash commit** slår sammen alle endringene i grenen til ett punkt i historikken.
2. Klikk på knappen for å flette.

Gitea viser meldingen `Pull request successfully merged and closed`, og du kan slette grenen. Det er lurt å slette grener du ikke trenger lenger, så de ikke hoper seg opp.

Gå tilbake til Altinn Studio, bytt til `master` og klikk på **Hent endringer** for å få med deg det du har flettet inn.

## Slette en gren

Du kan slette grenen du står i, men ikke `master`.

1. Klikk på grenvelgeren.
2. Klikk på **Slett gren**.
3. Skriv navnet på grenen for å bekrefte.
4. Klikk på **Slett**.

Altinn Studio sletter grenen både i Altinn Studio og i Gitea, og bytter til `master`.

{{% notice warning %}}
Endringer i grenen som du ikke har delt, blir slettet sammen med grenen. Du kan ikke gjenopprette en slettet gren.
{{% /notice %}}

Du kan også slette grener i Gitea. Det gjør du for eksempel når du har flettet en trekkforespørsel.
