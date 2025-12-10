---
title: Code list from shared resources
linktitle: Shared resources
description: Use code lists published from the Altinn Studio Designer organisation library
weight: 150
---

### Shared resources

See [Shared Resources](/en/altinn-studio/v8/concepts/shared-resources/) for more information about the concept.

### Using a shared resource code list

To use a shared resource code list published from the Altinn Studio Designer organisation library, use the following syntax for the `optionsId`:

`prefix[separator]{org}[separator]{id}[separator]{version}/latest`

Example: You have published two versions of a code list `countries` for your organisation `ttd`, and you want to use the first version

```json {hl_lines=[10]}
{
  "id": "dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "Some title"
  },
  "dataModelBindings": {
    "simpleBinding": "some.field"
  },
  "optionsId": "prefix[separator]ttd[separator]countries[separator]1"
}
```

Example: You want to always use the latest version of the same code list, without having to redeploy your application

```json {hl_lines=[10]}
{
  "id": "dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "Some title"
  },
  "dataModelBindings": {
    "simpleBinding": "some.field"
  },
  "optionsId": "prefix[separator]ttd[separator]countries[separator]latest"
}
```
