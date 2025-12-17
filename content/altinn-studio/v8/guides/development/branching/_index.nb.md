---
title: Grener
description: Hvordan lage flere utviklingslinjer av appen din
weight: 10
---

Grener lar deg lage en egen utviklingslinje av appen din. Du kan tenke på det som en kopi av koden hvor du kan gjøre endringer uten å påvirke hovedversjonen.

## Hvordan fungerer grener i Altinn Studio?
Når du oppretter en ny app, får den automatisk en master-gren. Dette er hovedversjonen av appen din. Når du vil utvikle nye funksjoner eller gjøre endringer, kan du:

1. Opprette en ny gren fra master - dette gir deg en arbeidskopi
2. Lagre endringer i den nye grenen uten å påvirke master
3. Flette grenen tilbake til master når du er fornøyd

## Fordeler med grener
Dette gir deg mulighet til å jobbe på flere ting samtidig, for eksempel én gren for ny funksjonalitet og en annen for feilrettinger. Ulike teammedlemmer kan også jobbe i hver sine grener uten å komme i konflikt med hverandre. Hvis noe går galt, er master-grenen trygg og uendret.

## Praktisk bruk
I Studio kan du bytte mellom grener via grenvelgeren i brukergrensesnittet. Her kan du også lage nye grener.

![Grenvelger](branch-dropdown.png)

1. Trykk på Ny gren for å lage din første nye gren.

2. I vinduet som kommer opp, bestemmer du hva grenen din skal hete, for eksempel `feature/payment` eller `bugfix/hide-input-field`.

3. Hvis du har endringer i appen som du ikke har delt, vil du få opp en advarsel. Her kan du velge mellom å slette endringene dine, eller å gå tilbake for å dele dem.


### Fletting av grener til `master`
#### Trekkforespørsel/pull request
1. Del endringene fra utviklingsgrenen din
2. Gå til Gitea:
![Lenke til Gitea](gitea-link.png)
3. I Gitea vil du få en forespørsel om å lage trekkforespørsel/pull request fra utviklingsgrenen:
![Gitea hovedbilde](gitea-main.png)
4. Trykk på **New Pull Request**
5. Lag en passende tittel og beskrivelse for endringene i grenen din
6. Trykk på **Create Pull Request**

### Fletting av trekkforespørsel
Avhengig av hvordan du eller teamet ditt jobber kan du velge å flette inn trekkforespørselen selv, eller be en kollega om en sjekk i forkant.
Når du er klar til å flette inn grenen, får du følgende valg:
![Flette-valg](merge-choices.png)
1. Velg **Create merge commit** hvis du vil beholde meldingshistorikken fra commitene i grenen din. Hvis du heller vil slå sammen hele historikken i én melding, velger du **Create squash commit**. 
2. Etter at du har valgt type merge commit trykker du på **Create merge commit**. Da skjer selve flettingen til `master`.

Du vil nå få beskjeden `Pull request successfully merged and closed`, og et valg om å slette grenen din. Det kan være greit å slette grenen, slik at det ikke hoper seg opp mange ubrukte grener. 