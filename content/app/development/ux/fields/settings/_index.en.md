---
title: Field settings
linktitle: Settings
description: Texts attached to a field.
tags: [translate-to-english]
toc: false
---

{{%notice warning%}}
This functionality must be set up manually directly in form layout for now.

**NOTE:** This functionality requires app-frontend v3 or newer. See [this link](/community/changelog/app-frontend/v3/breaking-changes/) 
for more information.

{{%/notice%}}

## Mark a field as optional

It is possible to mark a field as optional. The default is that required fields are marked as required (with `*`), while
optional fields have no marking. 

![Optional default](optional-default.png "Default optional field (no marking).")

![Required default](required.png "Default required field (marked with *).")

Default behaviour can be overwritten by changing the settings of the field. This is done in the 
`labelSettings` property of a component in the form layout.

```json
{
  {
    "id": "input-felt-1",
    "type": "Input",
    ... 
    "labelSettings": {
      "optionalIndicator": true
    }
  }
}
```

By setting `optionalIndicator` to `true`, the text `(Optional)` will be shown after the field label.


![Optional with marking](optional.png "Optional field with marking.")

*NOTE*: It is not possible to force the *Optional* marking on a field that is required. Changing the 
`optionalIndicator` property does not alter or overrule the other properties of the field.
