---
title: Code list from organisation library
linktitle: Organisation library
description: Use code lists published from the Altinn Studio Designer organisation library
weight: 150
---

### Library elements

See [Organisation library](/en/altinn-studio/v8/concepts/organisation-library/) for more information about the concept.

### Using a library code list

To use a code list published from the Altinn Studio Designer organisation library, you can

* Pin a version - to make sure that the application will not change if a new version is published.
* Use the latest version by setting version to `latest`

The `optionsId` field follows this syntax:

`prefix**{org}**{id}**{version}/latest`

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
  "optionsId": "prefix**ttd**countries**1"
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
  "optionsId": "prefix**ttd**countries**latest"
}
```
