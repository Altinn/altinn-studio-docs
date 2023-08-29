---
title: Panel
description: The panel component can be used to display important information to the user.
toc: false
---

![The different variants of the Panel component](panel-example.png "The different variants of the Panel component")

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