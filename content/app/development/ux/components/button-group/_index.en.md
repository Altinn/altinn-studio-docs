---
title: ButtonGroup
description: Arrange different types of button components horizontally
weight: 10
---

![ButtonGroup](button-group.png "A back button and a submit button inside of a ButtonGroup")

## Example

```json
...

{
  "id": "button-group-1",
  "type": "ButtonGroup",
  "children": ["nav-buttons", "submit-button"]
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

...
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
