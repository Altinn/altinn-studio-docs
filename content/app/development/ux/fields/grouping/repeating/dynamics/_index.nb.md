---
title: Dynamisk oppførsel i repeterende grupper
linktitle: Dynamikk
description: Hvordan skjule rader i en repeterende gruppe
---

## Skjul rader i repeterende grupper.

Noen ganger er det ønskelig å skjule rader i repeterende grupper når gitte kriterier inntreffer.
Dette kan gjøres ved å bruke `hiddenRow` egenskapen som evalueres med dynamiske utrykk. Eksempelet under viser hvordan
vi kan skjule en rad dersom fornavn i datamodellen er lik "John".

```json {linenos=inline}
{
  "id": "myGroup",
  "type": "group",
  "hiddenRow": ["equal", ["dataModel", "firstName"], "John"],
}
```
Du kan lese mer om [dynamiske utrykk her](/app/development/logic/expressions).
