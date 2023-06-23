---
title: MultipleSelect
description: MultipleSelect can be used when the user must choose one or more values
toc: false
---

The MultipleSelect component also offers local search/filtering of the options.

![MultipleSelect example](multipleSelect-example.png "MultipleSelect example")

`FormLayout.json` example:

```json
      {
        "id": "multiple-select-component-id",
        "type": "MultipleSelect",
        "textResourceBindings": {
          "title": "some.title"
        },
        "dataModelBindings": {
          "simpleBinding": "some.field"
        },
        "required": true,
        "optionsId": "someOptionId",
      },
```

As the `Checkbox`-component the MultipleSelect saves values as a comma separated string.

The MultipleSelect component can be configured by adding options directly to the component using the `options` param:

```json
      {
        "id": "multiple-select-component-id",
        "type": "MultipleSelect",
        ...
        "options": [
            { "label": "Label 1", "value": "value1" },
            { "label": "Label 2", "value": "value2" },
        ],
      },
```

 or by using api based options as described [here.](../../../data/options/)
