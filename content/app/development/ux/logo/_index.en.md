---
title: Logo
description: How to set and configure the logo of an application
toc: true
weight: 30
---

{{%notice warning%}}

Setting the application logo is only available with `Altinn.App.Core` version 7.14.0 and higher 

{{% /notice%}}

## Use organization logo
To use the organization logo specified for the organization in `altinn-orgs.json` you can write the following in `applicationmetadata.json`:
{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}
```json
{
  "logo": {
    "source": "org",
    "displayAppOwnerNameInHeader": true
  }
}
```

If you want to use a different logo for the application, you can specify that in `resource.json` with the value

{{< code-title >}}
App/config/texts/resource.nb.json
{{< /code-title >}}
```json
{
  "id": "appLogo.url",
  "value": "https://altinncdn.no/orgs/brg/brreg.png"
}
```

If your logo already contains the name of the organization the application represents, you might not want
the appOwner to be displayed in the header. You can disable this by setting the value `displayAppOwnerNameInHeader` to `false`.

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}
```json
{
  "logo": {
    ...
    "displayAppOwnerNameInHeader": false
  }
}
```

You can also override the alt text for the logo:

{{< code-title >}}
App/config/texts/resource.nb.json
{{< /code-title >}}
```json
{
  "id": "appLogo.altText",
  "value": "Logo for Brønnøysund Register Centre"
}
```

## Use custom logo

In order to use a custom logo, the logo must first be uploaded. 

1. Create a folder named `wwwroot`. This should be under App, `App/wwwroot`.
2. Upload a logo following the [design guidelines](#design-guidelines-for-app-owner-logo) to the folder.

Remember that each text resource file (`resource.[language].json`) must be updated for changes to apply to all languages.

{{< code-title >}}
App/config/texts/resource.nb.json
{{< /code-title >}}
```json
{
  "id": "appLogo.url",
  "value": "/{appID}/{logoName}.svg"
}
```

The `appID` here refers to the `id` property in `applicationmetadata.json`.

Finally, `source` in `applicationmetadata.json` needs to be set to `resource` in order to access the logo uploaded.
{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}
```json {hl_lines=[3]}
"logo": {
    "displayAppOwnerNameInHeader": false,
    "source": "resource", 
    "size": "medium"
  },
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


