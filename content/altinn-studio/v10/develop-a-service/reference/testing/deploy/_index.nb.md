---
draft: true
title: Test app i testmiljø
linktitle: I testmiljø
description: Testing i testmiljø
toc: true
tags: [needsReview, translate-to-english]

aliases:
- /nb/altinn-studio/v8/reference/testing/deploy/
---

Du klargjør appen og distribusjon til testmiljø fra **Deploy**-fanen i Altinn Studio.

## Bygge appen

Før du kan distribuere en app til testmiljø må du samle alle nødvendige filer i en pakke. Du gjør dette ved å _bygge_ appen.

{{%notice info%}}
Bygget bruker filene fra app-repositoriet. Hvis du har gjort endringer på en app i Altinn Studio må du sende disse til repositoriet for at endringene skal bli med i byggpakken. Du gjør dette ved å velge **Push** fra **Lage**-fanen i Altinn Studio.
{{% /notice%}}

Når en app er klar til test kan du bygge den ved å gå til **Deploy**-fanen i Altinn Studio (inne på appen som skal distribueres).

På høyre side ser du et panel for å bygge appen.

{{%notice info%}}
Du kan kun bygge ny versjon av appen hvis du faktisk har gjort endringer i appen. Hvis du har gjort endringer og ikke kan bygge ny versjon, pass på at du har sendt endringene til app-repositoriet.
{{% /notice%}}

1. Skriv inn versjonsnummer for versjonen av appen som skal bygges. Må være unikt (ikke brukt tidligere for denne appen).
2. Skriv inn beskrivelse for denne versjonen av appen.
3. Klikk på **Bygg versjon** for å starte bygget.

Du ser status for bygget under **Tidligere bygg av applikasjonen**. Når status er grønn er denne versjonen av appen klar til distribusjon til testmiljø.

![Bygge app](build-app.gif?width=700 "Bygge app")

## Distribuere appen til testmiljø

Når du har bygget en app ferdig kan du distribuere den til testmiljø. Du gjør dette fra **Deploy**-fanen. Der ser du en oversikt over tilgjengelige miljøer, i tillegg til en oversikt over hvilke versjoner av appen som er i de forskjellige miljøene.

1. Velg versjonen av appen som skal distribueres fra nedtrekkslisten som ligger under det aktuelle miljøet.
2. Klikk på **Deploy ny versjon**.

Systemet distribuerer valgt versjon til valgt miljø. Du kan distribuere ny versjon eller gå tilbake til en eldre versjon hvis du ønsker det.

![Deploye app](deploy-app.gif?width?=700 "Deploye app")

## Teste appen i testmiljø

Logg inn i testmiljøet med testbruker. Bruk lenken som du ser over hvert miljø i **Deploy**-fanen for å komme til ønsket testmiljø og starte ny instans av appen.

Alle instanser er synlige i meldingsboksen/arkivet til valgt aktør, på samme måte som dagens tjenester (som er basert på Altinn II).
