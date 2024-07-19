---
title: Footer
description: How to configure the footer.
weight: 30
---

{{%notice warning%}}

Footer is only available in version 7.7 and higher.

{{% /notice%}}

In the footer you can put things like contact information, links, and other text. In new applications, the footer contains a link to Altinn 3's accessibility statement by default.

The footer is defined in the `footer .json` file under `App/ui`. This file is similar to other layout files, but is much simpler. The default footer is defined like this:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/footer.schema.v1.json",
  "footer": [
    {
      "type": "Link",
      "icon": "information",
      "title": "general.accessibility",
      "target": "https://www.altinn.no/om-altinn/tilgjengelighet/"
    }
  ]
}
```

New components can be added to the `footer` array.

## Components

{{% expandlarge id="email-component" header="Email" %}}

### Properties

| Property | Value                                                                                                            |
| -------- | ---------------------------------------------------------------------------------------------------------------- |
| type     | `Email`                                                                                                          |
| title    | The text resource to display. Does **not** support [formatting](/altinn-studio/reference/ux/texts/#formatting-of-texts). |
| target   | The email address the link should point to.                                                                      |

### Example

```json
{
    "type": "Email",
    "title": "hjelp@etaten.no",
    "target": "hjelp@etaten.no"
}
```

{{% /expandlarge %}}

{{% expandlarge id="phone-component" header="Phone" %}}

### Properties

| Property | Value                                                                                                            |
| -------- | ---------------------------------------------------------------------------------------------------------------- |
| type     | `Phone`                                                                                                          |
| title    | The text resource to display. Does **not** support [formatting](/altinn-studio/reference/ux/texts/#formatting-of-texts). |
| target   | The phone number the link should point to.                                                                       |

### Example

```json
{
    "type": "Phone",
    "title": "+47 987 65 432",
    "target": "+4798765432"
}
```

{{% /expandlarge %}}

{{% expandlarge id="link-component" header="Link" %}}

### Properties

| Property | Value                                                                                                            |
| -------- | ---------------------------------------------------------------------------------------------------------------- |
| type     | `Link`                                                                                                           |
| title    | The text resource to display. Does **not** support [formatting](/altinn-studio/reference/ux/texts/#formatting-of-texts). |
| target   | The URL the link should point to.                                                                                |
| icon     | Icon to display next to the link. Either `information`, `email`, or `phone`.                                     |

### Example

```json
{
    "type": "Link",
    "icon": "information",
    "title": "general.accessibility",
    "target": "https://www.altinn.no/om-altinn/tilgjengelighet/"
}
```

{{% /expandlarge %}}

{{% expandlarge id="text-component" header="Text" %}}

### Properties

| Property | Value                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------------- |
| type     | `Text`                                                                                               |
| title    | The text resource to display. Supports [formatting](/altinn-studio/reference/ux/texts/#formatting-of-texts). |

### Example

```json
{
    "type": "Text",
    "title": "footer.description"
}
```

{{% /expandlarge %}}
