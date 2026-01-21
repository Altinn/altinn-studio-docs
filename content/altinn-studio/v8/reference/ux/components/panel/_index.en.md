---
title: Panel (Informativ melding)
linktitle: Panel (Informativ melding)
description: The panel component can be used to display important information to the user.
toc: false
weight: 10
---

The different variants of the Panel component:

<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="350" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1-45612&viewport=328%2C-2644%2C0.41&scaling=contain&content-scaling=responsive&starting-point-node-id=1%3A45612&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>
<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="350" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1-45613&viewport=328%2C-2644%2C0.41&scaling=contain&content-scaling=responsive&starting-point-node-id=1%3A45613&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>
<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="350" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1-45614&viewport=328%2C-2644%2C0.41&scaling=contain&content-scaling=responsive&starting-point-node-id=1%3A45614&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>

<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="100%" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/Link-til-Docs?page-id=0%3A1&node-id=2281-10363&viewport=376%2C-3688%2C0.35&scaling=contain&content-scaling=responsive&starting-point-node-id=2281%3A10363&show-proto-sidebar=0&embed-host=share&hide-ui=true
" allowfullscreen></iframe>
<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="100%" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/Link-til-Docs?page-id=0%3A1&node-id=2281-10496&viewport=376%2C-3688%2C0.35&scaling=contain&content-scaling=responsive&starting-point-node-id=2281%3A10496&show-proto-sidebar=0&embed-host=share&hide-ui=true
" allowfullscreen></iframe>
<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="100%" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/Link-til-Docs?page-id=0%3A1&node-id=2281-10440&viewport=376%2C-3688%2C0.35&scaling=contain&content-scaling=responsive&starting-point-node-id=2281%3A10440&show-proto-sidebar=0&embed-host=share&hide-ui=true
" allowfullscreen></iframe>

`FormLayout.json` example
```json
{
  "id": "panelinfo",
  "type": "Panel",
  "textResourceBindings": {
    "title": "Info text",
    "body": "Some important information here"
  },
  "variant": "info",
  "showIcon": false
}
```

`variant` can be one of the following:
- `info`
- `success`
- `warning`

`showIcon` can be used to hide/show the icon. By default the icon will be shown. 