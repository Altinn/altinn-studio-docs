---
title: Grener
description: Slik lager du flere utviklingslinjer av appen din
weight: 10
---

Grener lar deg lage en egen utviklingslinje av appen din. Du kan tenke på det som en kopi av koden, der du kan gjøre endringer uten å påvirke hovedversjonen.

## Hvordan fungerer grener i Altinn Studio?
Når du oppretter en ny app, får den automatisk en `master`-gren. Dette er hovedversjonen av appen din. Når du vil utvikle nye funksjoner eller gjøre endringer, kan du

- opprette en ny gren fra `master` - dette gir deg en arbeidskopi

- lagre endringer i den nye grenen uten å påvirke `master`

- flette grenen tilbake til `master` når du er fornøyd

## Fordeler med grener
Grener gir deg mulighet til å jobbe på flere ting samtidig, for eksempel én gren for ny funksjonalitet og en annen for feilrettinger. Ulike team-medlemmer kan også jobbe i hver sine grener, uten at de forstyrrer hverandres arbeid. Hvis noe går galt, er `master`-grenen trygg og uendret.

## Slik kan du bruke grener i Studio
I Studio kan du bytte mellom grener med grenvelgeren øverst til høyre i brukergrensesnittet. Her kan du også lage nye grener.

![Grenvelger](branch-dropdown.png)

1. Klikk på **Ny gren** for å lage en ny gren.

2. I vinduet som vises, skriver du navnet på grenen din, for eksempel `feature/payment` eller `bugfix/hide-input-field`.

3. Hvis du har endringer i appen som du ikke har delt, får du en advarsel. Her kan du velge mellom å slette endringene dine, eller å gå tilbake for å dele dem.


### Flette grener til `master`
#### Trekkforespørsel/pull request
1. Del endringene fra utviklingsgrenen din.
2. Gå til Gitea med **Repositorium**-knappen i nedtrekksmenyen til høyre:
![Lenke til Gitea](gitea-link.png)
3. I Gitea får du forespørsel om å lage trekkforespørsel/pull request fra utviklingsgrenen:
![Gitea hovedbilde](gitea-main-pr-alert.png)
4. Klikk på **New Pull Request**
5. Lag en passende tittel og beskrivelse for endringene i grenen din.
6. Klikk på **Create Pull Request**.

### Flette en trekkforespørsel
Avhengig av hvordan du eller teamet ditt jobber, kan du velge å flette inn trekkforespørselen selv eller be en kollega om å sjekke den først.

Når du er klar til å flette inn grenen, får du følgende valg:
![Flette-valg](merge-choices.png)
1. Velg **Create merge commit** hvis du vil beholde meldingshistorikken fra commitene i grenen din. Hvis du heller vil slå sammen hele historikken i én melding, velger du **Create squash commit**. 
2. Etter at du har valgt type merge commit, trykker du på **Create merge commit**. Da skjer selve flettingen til `master`.

Du får nå beskjeden `Pull request successfully merged and closed`, og et spørsmål om du vil slette grenen din. Det kan være greit å slette grenen, slik at det ikke hoper seg opp med ubrukte grener. 

### Slette en gren
Hvis du vil slette en gren, går du tilbake til forsiden for repoet ditt i Gitea:
![Gitea hovedbilde](gitea-main.png)
1. Klikk på grenvelgeren, der det står **master**.
2. Klikk på **View all branches**.
3. Finn grenen du vil slette, og klikk på søppelbøtten.

Obs: Hvis du sletter en gren, er det permanent. Du kan ikke gjenopprette den.