---
title: ButtonGroup
description: Arrange different types of button components horizontally
weight: 10
---
{{% notice warning %}}
🚧 This documentation is a work in progress.
{{% /notice %}}

---
## Usage

<!-- Brief description of the component and how it is used. -->

### Anatomy
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="280" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=113-7794&viewport=-814%2C659%2C1.32&scaling=contain&content-scaling=responsive&starting-point-node-id=113%3A7794&show-proto-sidebar=1&embed-host=share" allowfullscreen></iframe>

This example is taken from <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Note that the example is not identical to the actual code but has been adapted to create prototypes in Figma.


```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "button-group1",
        "type": "ButtonGroup",
        "children": [
          "nav-buttons",
          "submit-button"
        ]
      },
      {
        "id": "nav-buttons",
        "type": "NavigationButtons",
        "textResourceBindings": {
          "next": "Next",
          "back": "Back"
        },
        "showBackButton": true
      },
      {
        "id": "submit-button",
        "type": "Button",
        "textResourceBindings": {
          "title": "Submit"
        }
      }
    ]
  }
}
```

## Configuration

To configure a button group, simply add a new component with the type `ButtonGroup` to the layout file before the buttons you want to group together.
You specify which button components to include in the button group by adding their ID's to the button group's `children` property.
The following component types can be added to a button group:

- `Button` (Submit button)
- `NavigationButtons`
- `PrintButton`
- `InstantiationButton`
<!-- - `ActionButton` -->
