---
title: Skjule instanser
linktitle: Skjule instanser
description: Slik skjuler du instanser fra meldingsboksen.
weight: 200
tags: [needsReview]
---

For apper med en kompleks appflyt kan det være nyttig å skjule instanser fra meldingsboksen under deler av prosessen eller for hele prosessen.

## Konfigurasjon

{{% notice info  %}}
Denne konfigurasjonen gjelder også for instanser som allerede er opprettet.
{{% /notice %}}

Konfigurasjon av skjuling fra meldingsboks gjøres i `applicationmetadata.json` som ligger i repoet under mappen `App/config`.

Legg til en ny seksjon med navn `messageBoxConfig` med følgende underfelt: `hideSettings`.

`hideSettings` kan igjen bestå av én av to egenskaper:

| Navn         | Beskrivelse                                                                                 |
|--------------|---------------------------------------------------------------------------------------------|
| hideOnTask   | En liste med oppgaver der instanser skal skjules fra meldingsboksen.                       |
| hideAlways   | En boolean som indikerer om instansen alltid skal skjules fra meldingsboksen.              |

## Eksempler

Konfigurasjonen til en app der instanser skal skjules på `Task_1` og `Task_3`, men være synlige på alle andre prosess-steg:

```json
"messageBoxConfig": {
  "hideSettings": {
      "hideOnTask":["Task_1", "Task_3"]
  }
}
```

Konfigurasjonen til en app der instanser aldri skal vises i meldingsboksen:

```json
"messageBoxConfig": {
  "hideSettings": {
      "hideAlways":true
  }
}
```
