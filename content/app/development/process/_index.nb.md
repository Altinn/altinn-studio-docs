---
title: Prosess handling
description: Applikasjons templaten støtter å definere en foretnings prosess for digitale tjenester
tags: [altinn-apps, process, bpmn]
weight: 60
---

Malen følger [BPMN 2.0-standarden](https://www.bpmn.org/).

## Støttede prosesselementer

* [__Prosessoppgaver__](tasks) _oppgaver som lar brukerne utføre handlinger før prosessen fortsetter_

* [__Flytkontroll__](flowcontrol) _kontrollerer navigasjonen gjennom en prosess med gateways_

## Prosesseksempler

![Enkel prosess](process1.drawio.svg "En prosess med en dataoppgave")

![Enkel prosess](process2.drawio.svg "En prosess med data- og bekreftelsesoppgaver")

![Enkel prosess](process3.drawio.svg "En prosess med data-, bekreftelses- og tilbakemeldingsoppgave")

![Enkel prosess](process4.drawio.svg "En prosess med data og bekreftelser og valgfri bekreftelse")

![Enkel prosess](process5.drawio.svg "En prosess med data og bekreftelse og valgfri bekreftelse med mulighet til å gå tilbake til dataoppgaven")

## Konfigurasjon av prosessen

I Altinn Studio kan apputvikleren konfigurere prosessen.

[Les vår utviklerhåndbok for detaljer.](../../../../app/development/configuration/process/)