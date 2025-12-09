---
title: Skjule instanser
linktitle: Skjule instanser
description: Konfiurasjon for å skjule instanser fra meldingsboksen.
weight: 200
---

For applikasjoner med en kompleks appflyt kan det være nyttig å skjule instanser
fra meldingsboksen under deler av prosessen eller for hele prosessen.


## Konfigurasjon

{{% notice info  %}}
Konfigurasjonen har tilbakevirkende kraft på tidligere opprettede instanser.
{{% /notice %}}

Konfigurasjon av skjuling fra meldingsboks gjøres i `applicationmetadata.json` som ligger i repoet under mappen `App/config`.

Legg til en ny seksjon med navn `messageBoxConfiguration` med følgende underfeltet `hideSettings`.

HideSettings kan igjen bestå av én av  to properties

 Navn         | Beskrivelse
--------------|------------
hideOnTask  | En liste med tasker der instanser skal skjules fra meldingsboksen.
hideAlways  | En boolean som indikerer om instansen alltid skal skjules fra meldingsboksen.

## Eksempler

Konfigurasjonen til en app der instanser skal skjules på `Task_1` og `Task_3`, men være synlig på alle andre prosess-steg:

```json
"messageBoxConfig": {
  "hideSettings": {
      "hideOnTask":["Task_1", "Task_3"]
  }
}
```

Konfigurasjonen til en app der instanser aldri skal vises i meldingsboksen.

```json
"messageBoxConfig": {
  "hideSettings": {
      "hideAlways":true
  }
}
```