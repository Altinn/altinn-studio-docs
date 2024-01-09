---
title: Use organisation logo
description: How to configure use of organisation logo
weight: 30
---

{{%notice warning%}}

Setting application logo is only available with `Altinn.App.Core` version 7.14.0 and higher 

{{% /notice%}}

To use organisation logo you can specify that in `applicationmetadata.json`:
```json
// applicationmetadata.json
{
  "logo": {
    "source": "org",
    "displayAppOwnerNameInHeader": true
  }
}
```

When enabling this option, the logo will default to the one specified for the organization in `altinn-orgs.json`.

If you want to use a different logo for the application, you can specify that in `resource.json` with the value

```json
// resource.nb.json
{
  "id": "appLogo.url",
  "value": "https://altinncdn.no/orgs/brg/brreg.png"
}
```

If your logo already contains the name of the organization the application represents, you might not want
the appOwner to be displayed in the header. You can disable this by setting the value `displayAppOwnerNameInHeader` to `false`.

```json
// applicationmetadata.json
{
  "logo": {
    ...
    "displayAppOwnerNameInHeader": false
  }
}
```

You can also override the alt text for the logo:

```json
{
  "id": "appLogo.altText",
  "value": "Logo for Brønnøysund Register Centre"
}
```

## Properties

#### source
Specifies where the source of the logo should be fetched from. It has two valid values:

- `"org"`: The logo is fetched from altinn-orgs.json.
- `"resource"`: The logo is fetched from text resource files. Fetches the value with the id `"appLogo.url"`

#### displayAppOwnerNameInHeader

Specifies whether the service owner's name should be displayed next to the logo. Retrieves the service owner's name 
directly from altinn-orgs.json if appOwner is not defined in the text resource files.

#### size

{{%notice warning%}}

Setting the size is only available with `Altinn.App.Core` version 7.15.0 and higher

{{% /notice%}}

For some logos, the default size of the logo might not always fit. The size can be specified with the `size` property.
It has three valid values:

- `"small"`
- `"medium"` 
- `"large"`

The size defaults to `"small"` if not specified.

## Design guidelines for app owner logo
#### Size and scale:
The logo should be appropriately sized and have enough clear space around it to prevent visual clutter. A good rule of
thumb is to keep the logo's width to no more than 32px.

#### Alignment:
The logo will be aligned to the top left corner of the form for consistency and easy recognition.

#### Contrast and legibility:
The logo should have enough contrast against the background to ensure that it is legible. If the logo includes text, the
text should be readable and not too small.

#### Logo variants:
If your logo comes in different variations (e.g., color, black and white, monochrome), choose the one that best suits 
the form's design and background color.


#### Testing and iteration:
The logo placement should be tested on different devices and screen sizes to ensure that it looks and functions as 
intended. Test it on mobile screens and tablets. Consider gathering feedback from users or colleagues and iterating on 
the design if needed.

#### Accessibility:
The logo's colors and placement should meet accessibility guidelines to accommodate users with different visual needs. 
Alt tag on the logo is required for screen reader. The alt text of the logo should reflect the 
language selected eg. "The Directorate of Education logo".


