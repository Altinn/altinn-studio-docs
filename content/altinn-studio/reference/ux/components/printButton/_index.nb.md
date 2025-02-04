---
title: PrintButton
description: En knapp som åpner en utskriftsdialog for gjeldende skjemaside
toc: false
weight: 10
---

PrintButton-komponenten kan legges til i form layout der du vil gi en mulighet til å åpne utskriftsdialogen til nettleseren.
I det knappen blir klikket på vil utskriftsdialogen åpne seg. Vanligvis er det en mulighet til å "Skrive ut som PDF" om ønskelig.

### Anatomi
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="280" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=238-7624&viewport=-814%2C659%2C1.32&scaling=contain&content-scaling=responsive&starting-point-node-id=238%3A7624&show-proto-sidebar=1&embed-host=share" allowfullscreen></iframe>
Dette eksemplet er hentet fra <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Merk at eksempelet ikke er identisk med den faktiske koden, men er tilpasset for å lage prototyper i Figma.

`FormLayout.json` eksempel:

```json
{
  "id": "printButtonInfo",
  "type": "PrintButton"
}
```
Standardteksten på PrintButton er "Print / Lagre PDF".
Teksten kan bli overstyrt ved å endre tekstresurs-nøkkelen:
```json
{
  "id": "general.print_button_text",
  "value": "Skriv ut"
}
```
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="200" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=238-7624&viewport=-814%2C659%2C1.32&scaling=contain&content-scaling=responsive&starting-point-node-id=238%3A7624&show-proto-sidebar=1&embed-host=share" allowfullscreen></iframe>


PrintButton-komponenten støtter også grid-tilpassning om ønskelig.
