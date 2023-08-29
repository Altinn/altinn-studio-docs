---
title: AccordionGroup
description: A component that allows you to group multiple Accordions together
---

This component is used to group multiple `Accordion`s together. 
It is used to create a collapsible list of content that can be expanded and collapsed individually.
`AccordionGroup` is used to make sure that the `Accordion`s feel like they are part of the same group.

![AccordionGroup](accordion-group-open.png "An accordion group where one of the accordions are open")

![AccordionGroup](accordion-group-closed.png "The same accordion group where all accordions are closed")

## Example

```json
...
{
  "id": "accordion-group",
  "type": "AccordionGroup",
  "children": ["accordion", "accordion-2"]
},
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

To configure an AccordionGroup, simply add a new component with the type `AccordionGroup` to the layout file.
Then specify which other components you want to be able to collapse by adding their ID's to the `AccordionGroups`'s `children` property.
The following types can be added to an `AccordionGroup`: 
- `Accordion`
