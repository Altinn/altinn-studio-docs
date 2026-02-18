---
draft: true
title: Stateless app (innsynstjeneste)
linktitle: Stateless
description: Når du trenger en visning utenom appens prosess
tags: [needsReview, needsTranslation]
toc: true

---

## Introduksjon til stateless apper

En stateless app, eller tilstandsløs app, skiller seg fra vanlige apper ved at den ikke lagrer noe data - 
hverken skjemadata eller metadata om instanser av appen. Appen havner heller ikke i innboksen til brukeren. 
En stateless app tilsvarer en innsynstjeneste i Altinn 2.

Stateless-apper passer godt som innsynstjenester der en bruker eller et system gjør et oppslag mot en ressurs, eller 
presenterer data fra en tredjepart basert på identiteten til brukeren. Du kan også konfigurere en stateless-app til å 
tillate anonyme brukere, det vil si brukere som ikke er pålogget.

## Hvordan fungerer det?
Alle apper som skal lagre data må ha en prosess. Med en stateless app forteller vi appen at den ikke skal se etter noen
prosess når den starter opp, men peker heller på et sideoppsett der visningen vi ønsker er definert. Dette gjør at det 
ikke startes noen instans for brukeren, og ingen data lagres.

Det er likevel mulig å forhåndsutfylle data for brukeren, gjøre valideringer og/eller beregninger basert på hva brukeren
ev. fyller ut. Resultatet lagres dog ikke noe sted, men kan f.eks. brukes til dynamikk i visningen.

### Forhåndsutfylle og manipulere data
Når du bruker en stateless datatype, kan du populere datamodellen når app-frontend spør om skjemadataen.

Datapopuleringen skjer i to steg på det første kallet fra frontend (GET):
1. [Forhåndsutfylling](/nb/altinn-studio/v10/develop-a-service/data/prefill/)
2. [Dataprosessering](/nb/altinn-studio/v10/develop-a-service/data/dataprocessing/)

På påfølgende oppdateringer av samme skjemadata (POST) kjøres ikke prefill på nytt, men kalkuleringen trigges. Dette gjør det mulig å endre dataen basert på brukerens input, selv i en stateless tilstand.

### Tilgang uten innlogging
En stateless app kan settes opp til å tillate bruk helt uten innlogging. 

### Starte instans fra et stateless skjema
Et bruksområde for å starte en instans fra et stateless view kan være at du først ønsker at appen skal oppføre seg som en 
innsynstjeneste der brukeren blir presentert for aktuelle data. Fra denne informasjonen kan brukeren velge å agere videre 
på dataene som listes opp, og da går du over til en vanlig innsendingstjeneste.

