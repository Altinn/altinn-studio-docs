---
title: Group displayed as panel
linktitle: Panel
description: Configuration details for groups displayed as panels, and referencing group values in a panel
---

## Display group as part of Panel

A new parameter, `panel`, has been added which can be set up on a group component. This says that the group should be displayed as part of the [Panel component](../../../../components/panel).

Here, you will recognize the appearance and settings that can be set on the panel component. Example configuration:

```json
{
  "id": "input-panel-group",
  "type": "Group",
  "children": [
    "panel1",
    "panel2"
  ],
  "dataModelBindings": {},
  "textResourceBindings": {
    "title": "Dette er bare en demo av input panel utenfor repeterende gruppe.",
    "body": "Her ser jeg bare at ting fungerer som forventet."
  },
  "panel": {
    "variant": "info"
  }
}
```

Here the group has been set up to be displayed as a panel with the variant "info". The setup is otherwise exactely the same as a regular group.

This will give the following output:

![Group with panel](input-panel.jpeg "Group with panel")

It is possible to configure the following settings in the `panel` field of a group:

| Parameter      | Required | Description                                                                                                                                                                    |
|----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| variant        | Yes      | Which variant of panel the group should be placed in. Available values are "info", "success" and "warning"                                                                     |
| iconUrl        | No       | If you want your own icon as part of a panel, this can be set. Relative or full path, e.g. "awesomeIcon.png" or "http://cdn.example.com/awesomeIcon.png"                       |                                                                                           |
| iconAlt        | No       | Alternate text for the custom icon. Can only be set if iconUrl has been set. Can be plain text or a reference to a text resource.                                              |
| groupReference | No       | Reference to a different group. Can be used if you wish to add elements to a repeating group from some other context. [Read more.](#add-element-from-separate-repeating-group) | |

Example:

```json
{
  "id": "input-panel-group",
  "type": "Group",
  "panel": {
    "variant": "info",
    "iconUrl": "kort.svg",
    "iconAlt": "Betalingskort ikon"
  }
}
```

### Add element from separate repeating group

A use case one can imagine is that the user is asked to choose from an already filled out repeating group. One possible case is that the user is registering a set of suspicious transactions.
Here, the user first enters a set of separate payment cards as a repeating group. Later on in the form, the user will choose elements from this group when adding a suspicious transaction.
While filling out the suspicious transaction, the user remembers that they forgot to add a payment card, but do not wish to navigate all the way back to the original payment card group.

This is where the `groupReference` parameter comes in handy. This will open up for the possibility to add an element to a repeating group from the context from which you are using this list.

A picture to illustrate the usecase:

![GroupReference case](panel-reference-case.png "GroupReference case")

In this fictitious case the groups are placed directly above each other, but imagine that these are filled out on different pages in the form.
To achieve this setup, a group of elements are added to the repeating group that is set up with transactions (group-2) with a reference to the first group with payment cards (group-1).
The following group component is one of the children of group-2:

```json
{
  "id": "input-panel-group",
  "type": "Group",
  "dataModelBindings": {},
  "textResourceBindings": {
    "title": "Legg til nytt betalingskort",
    "body": "Kortet du registrer vil bli lagret og tilgjengelig i resten av tjenesten.",
    "add_label": "Legg til nytt betalingskort"
  },
  "panel": {
    "showIcon": true,
    "iconUrl": "kort.svg",
    "variant": "success",
    "groupReference": {
      "group": "first-group"
    }
  }
}
```

The text resources that can be set are:

- `title` - panel title
- `body` - panel body. Placed above the group elements.
- `add_label` - text for the "add new"-button.

If `children` is not set on the group, the children of the referenced group will be rendered. By adding to `children` you can freely define that only a subset of all children of the referenced group should be displayed.

Demonstration:

![Demonstration of groupReference](panel-reference-demo.gif "Demonstration of groupReference")

See [example app](https://altinn.studio/repos/ttd/input-panel-demo) for complete setup in form layout.
