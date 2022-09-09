---
title: Pages
description: How to set up an app with multiple pages, tracks, summary or multiple layouts.
toc: false
weight: 10
---

{{%notice info%}}
Setup of multiple pages can be done manually (as described below) or directly in the form editor in Altinn Studio.
Note that the last page the user entered is cached so that they will return to this page when the app reloads.
{{%/notice%}}

## Setup
To get funtionality for mutliple pages in a form, the nuget-version of the packages the app uses **must** be upgraded to version `1.2.0-alpha` _or newer_.
See instructions for how that is done [here](../../../maintainance/dependencies).

Multiple pages in a form (within the same process task) is supported by splitting up the current layout-file `App/ui/FormLayout.json` to one file per page. The files must be placed in a folder `App/ui/layouts`. Each layout file must use the same format as the existing `FormLayout.json` file. For example:

```
|- App/
  |- ui/
    |- layouts/
      |- side1.json
      |- side2.json
      |- side3.json
```

The recommended approach as long as there is a need to set it up manually, is to use the ui-editor in Altinn Studio to add all components to `FormLayout.json`, and then copy them to their respective layout files, one for each page you want. `FormLayout.json` can either be renamed under the `layouts` folder or be deleted.

_Note: `FormLayout.json` must either be moved (can be renamed) into the `layouts` folder, or be deleted. If you have the old `FormLayout.json` file under the `App/ui` folder as it was, only this one will be used and all files under the `App/ui/layouts` folder will be ignored._

{{<children>}}