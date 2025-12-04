---
title: Test app i testmiljø
linktitle: I testmiljø
description: Testing i testmiljø
toc: true
weight: 200
aliases:
- /nb/altinn-studio/v8/reference/testing/deploy/
---

Klargjøring av app og distribusjon til testmiljø gjøres fra **Deploy**-fanen i Altinn Studio.

## Bygge app
Før en app kan distribueres til testmiljø må alle nødvendige filer samles i en pakke som kan distribueres. Dette gjøres ved å _bygge_ appen. 

{{%notice info%}}
Merk at det er filene fra app-repoet som benyttes i bygget. Dersom du har gjort endringer på en app i Altinn Studio må disse sendes til repoet for at endringene skal bli med i bygg-pakken. Dette gjøres ved å velge **Push** fra **Lage**-fanen i Altinn Studio.
{{% /notice%}}

Når en app er klar til test kan den bygges ved å gå til **Deploy**-fanen i Altinn Studio (inne på den appen som skal distribueres).

På høyre side vises et panel for å bygge appen.

{{%notice info%}}
Merk at det kun er mulig å bygge ny versjon av appen dersom det faktisk er gjort endringer i appen. Dersom det er gjort endringer og det ikke er mulig å bygge ny versjon, pass på at endringene har blitt sendt til app-repoet.
{{% /notice%}}

1. Skriv inn versjonsnummer for den versjonen av appen som skal bygges. Må være unikt (ikke brukt tidligere for denne appen).
2. Skriv inn beskrivelse for denne versjonen av appen.
3. Trykk på **Bygg versjon** for å starte bygget.

Status for bygget vises under **Tidligere bygg av applikasjonen**. Når status er grønn er denne versjonen av appen klar til å bli distribuert til testmiljø.

![Bygge app](build-app.gif?width=700 "Bygge app")

## Distribusjon av app til testmiljø
Når en app er bygget ferdig kan den distribueres til testmiljø. Dette gjøres fra **Deploy**-fanen. Der vises en oversikt over tilgjengelige miljø, i tillegg til en oversikt over hvilke versjoner av appen som er i de forskjellige miljøene.

1. Velg versjonen av appen som skal distribueres fra nedtrekkslisten som ligger under det aktuelle miljøet.
2. Trykk på **Deploy ny versjon**.

Valgt versjon blir da distribuert til valgt miljø. Her er det mulig å distribuere ny versjon eller gå tilbake til en eldre versjon om det er ønsket.

![Deploye app](deploy-app.gif?width?=700 "Deploye app")

## Teste app i testmiljø
Logg inn i testmiljø med testbruker. Bruk lenken som vises over hvert miljø i **Deploy**-fanen for å komme til ønsket testmiljø og starte ny instans av appen.

Alle instanser vil være synlige i meldingsboks/arkiv til valgt aktør, på samme måte som dagens tjenester (som er basert på Altinn II).