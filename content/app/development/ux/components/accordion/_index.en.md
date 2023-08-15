---
title: Accordion
description: A component that allows you to group content into collapsible sections
---

![Accordion](accordion-open.png "An open accordion with a single paragraph inside of it")

![Accordion](accordion-closed.png "The same accordion in closed state")

## Example

```json
...
{
  "id": "accordion",
  "type": "Accordion",
  "children": ["paragraph", "paragraph-2"]
},
{
  "id": "paragraph",
  "type": "Paragraph",
  "textResourceBindings": {
    "title": "accordion-paragraph-test"
  },
  "dataModelBindings": {}
},
{
  "id": "paragraph-2",
  "type": "Paragraph",
  "textResourceBindings": {
    "title": "Dette er en tittel med litt mere tekst"
  },
  "dataModelBindings": {}
},
...
```

## Configuration

To configure an Accordion, simply add a new component with the type `Accordion` to the layout file.
Then specify which other components you want to be able to collapse by adding their ID's to the accordion's `children` property.
The following types can be added to an Accordion: 
- `Paragraph`
- `Button`
