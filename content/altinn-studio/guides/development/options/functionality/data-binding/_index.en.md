---
title: Data binding
description: What can be stored in the data model
---

### Save label value in the datamodel
Sometimes you might wish to save the displayed value in the users chosen language to simplify creation of simple presentations of data without addtional lookups or a requirement to remember the label the user actually picked in case it have changed over time.

This is performed by having a separate ``dataModelBindings`` with the key ``"label":`` in addition to ``"simpleBinding":``

```json
{
  "id": "dropdown-component",
  "type": "Dropdown",
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype",
    "label":"soknad.nyGaranti.loyvetypeLabel"
  },
  "optionsId": "biler"
}
```

### Store metadata for the parameters used to retrieve options in tha datamodel

You can store metadata for the parameters used to retrieve options in the datamodel by setting the `metadata` property
on the components `dataModelBinding` property:

```json
{
  "id": "some-dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "NyGarantiLoyvetype"
  },
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype",
    "metadata":  "soknad.transportorOrgnummer"
  },
  "required": true,
  "optionsId": "loyvetyper",
  "mapping": {
    "soknad.transportorOrgnummer": "orgnummer"
  }
},
```

This configuration will store the metadata of the retrieved options as a comma separated string in the
field `soknad.transportorOrgnummer` in the datamodel.
