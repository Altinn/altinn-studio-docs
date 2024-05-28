---
title: Dynamisk oppførsel i repeterende grupper
linktitle: Dynamikk
description: Hvordan skjule rader i en repeterende gruppe
---

## Skjul rader i repeterende grupper.

Noen ganger er det ønskelig å skjule rader i repeterende grupper når gitte kriterier inntreffer.
Dette kan gjøres ved å bruke `hiddenRow` egenskapen som evalueres med dynamiske utrykk. Eksempelet under viser hvordan
vi kan skjule en rad dersom fornavn i datamodellen er lik "John".

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v4 (App Frontend)">}}

```json {linenos=inline}
{
  "id": "myGroup",
  "type": "RepeatingGroup",
  "hiddenRow": ["equal", ["dataModel", "firstName"], "John"],
  ...
}
```

{{</content-version-container >}}
{{<content-version-container version-label="v3 (App Frontend)">}}

```json {linenos=inline}
{
  "id": "myGroup",
  "type": "Group",
  "hiddenRow": ["equal", ["dataModel", "firstName"], "John"],
  ...
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

Du kan lese mer om [dynamiske utrykk her](/altinn-studio/reference/logic/expressions).
