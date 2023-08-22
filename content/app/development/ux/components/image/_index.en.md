---
title: Image
description: Display visual content such as pictures, screenshots, illustrations, or graphics
toc: true
schemaname: Image
weight: 10
aliases:
- /app/development/ux/images/
- /app/development/ux/components/images
- /app/guides/design/guidelines/components/picture-component/
---

---
## Usage

Use images and illustrations to emphasize points or illustrate concepts that are difficult to explain using text.

### Anatomy
![Example image and alt text anatomy](image-and-alt-text-en.png)

1\. *Image* – Photo, screenshot, illustration, or graphic.  
2\. *Alternative text* – Used by screen readers and displayed if the image can not be rendered.

### Best practices
We recommend following the guidelines by [UUtilsynet](https://www.uutilsynet.no/regelverk/bilder-og-grafikk/205).

- Add an alternative text which explains the image. The alt. text will be displayed if the image is unavailable and is used by screen readers.
- If an image is purely decorative, it's best not to include an alternative text.
- Don't use images for image's sake. Ask yourself if the image illustrates a point or increases the understanding of what you are trying to tell.
- Check if the image scales well on devices like mobile or tablet. An image which looks good on a PC can quickly fill a smaller screen.
- Avoid using images instead of text, as screen readers cannot read it.

### Content guidelines

Keep alternative texts consistent:
- Never start with "Image of ..."
- Write short and start with the most essential part of the image.
- End by saying if the photo is an illustration or graphic.

<br>

**Example** 

<img src="https://www.uutilsynet.no/sites/tilsyn/files/styles/xxl/public/2023-01/Tretralle.png?itok=gBevDs0F" alt="Old wooden trolly. Photograph." width="300px"/>

Alt text: "Old wooden trolly. Photograph."

<br>

For more guidelines and examples, see [UUtilsynet](https://www.uutilsynet.no/regelverk/bilder-og-grafikk/205).

---
## Add and configure the component

You can add a component in [Altinn Studio Designer](/app/getting-started/ui-editor/) by dragging it from the left-side panel to the page area in the middle.
Selecting the component brings up its configuration panel on the right-hand side.

{{% notice warning %}}
We are currently updating Altinn Studio Designer with more configuration options!
 We'll update the documentation to reflect the new changes once they are stable.
{{% /notice %}}

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
<br>

![Images settings anatomy](./images-settings-anatomy.png)

{{</content-version-container>}}
{{<content-version-container version-label="Code">}}

```json{linenos=false,hl_lines=["4-14"]}
// File: /App/ui/layouts/<page>.json

{
  "data": {
    "layout": [
      {
        "id": "Image-ijlpGL",
        "type": "Image",
        "image": {
          "src": {
            "nb": ""
          },
          "width": "100%",
          "align": "center"
        }
      }
    ]
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

### 1. Component ID
Property: `id`  
Unique ID for each component. The ID is auto-generated when you add a component, but you can change the value as you like.

### 2. Source
Property: `src`  
The image source can be external or hosted in the app.

For external images, the source is simply the image URL (e.g. `https://example.com/image.png`).

All files placed inside the folder `/App/wwwroot` will be hosted in the application.
 If this folder does not exist, you can create it.
 Static hosting must be [configured](#configure-static-hosting) for apps created before December 2021.

An image placed in `/App/wwwroot` can be referenced in one of two ways:
1. Using its relative URL: `/<org or username>/<app-name>/image.png` or
2. Using the image path: `wwwroot/image.png` (will resolve to relative URL before the image is loaded).

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
Using relative URL as the source:

![Settings with source relative URL. Image](<image-src-rel-url.png> "Relative URL as source")

Using image path as the source:

![Settings with source local folder. Image](<image-src-wwwroot.png> "Image path as source")

{{</content-version-container>}}
{{<content-version-container version-label="Code">}}
Using relative URL as the source:
```json{linenos=false,hl_lines="9"}
// File: /App/ui/layouts/<page>.json

...
      {
        "id": "kommune-logo-2",
        "type": "Image",
        "image": {
          "src": {
            "nb": "/testdep/flyttemelding-sogndal/kommune-logo.png"
          },
          ...
        }
      }
...
```
Using image path as the source:
```json{linenos=false,hl_lines="9"}
// File: /App/ui/layouts/<page>.json

...
      {
        "id": "kommune-logo",
        "type": "Image",
        "image": {
          "src": {
            "nb": "wwwroot/kommune-logo.png"
          },
          ...
        }
      }
...
```
(Part of the code is omitted for brevity)
{{</content-version-container>}}
{{</content-version-selector>}}

<br>

Also, see [Multiple sources based on language](#multiple-sources-based-on-language).

#### Configure static hosting
For apps created *before December 2021*, static hosting must be configured manually by adding the line
 `app.UseStaticFiles('/' + applicationId);` in the `Configure` method in `App/Program.cs` as shown below:

```C# {linenos=false,hl_lines=[7]}
// File: /App/Program.cs

void Configure()
  {
    ...
    app.UseRouting();
    app.UseStaticFiles('/' + applicationId);
    app.UseAuthentication();
    ...
  }
```

`applicationId` is the same as `id`  in `/App/config/applicationmetadata.json`.

### 3. Alternative text
Property: `textResourceBindings.altTextImg`  
An alternative text will be displayed if the image is unavailable and is used by screen readers.
 The alt text is stored as a [text resource](/app/development/ux/texts/#add-and-change-texts-in-an-application) defined in `/App/config/texts/resource.<language>.json`.

**Example 1**: Add text resource using the id `kommune-logo.altTextImg`
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
Click the magnifying glass next to the property field to reveal a dropdown where you can select an existing text resource:

![Select text resource screenshot](screenshot-select-text.png "Select text resource")

{{</content-version-container>}}
{{<content-version-container version-label="Code">}}
Add a text resource by specifying the text resource id for the property `textResourceBindings.altTextImg`:
```json{hl_lines=["9-11"]}
// File: /App/ui/layouts/<page>.json

{
  "data": {
    "layout": [
      {
        "id": "kommune-logo",
        "type": "Image",
        "textResourceBindings": {
          "altTextImg": "kommune-logo.altTextImg"
        },
        "image": {
          "src": {
            "nb": "wwwroot/kommune-logo.png",
          },
          "width": "100%",
          "align": "center"
        }
      }
    ]
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

<br>

**Example 2**: Create or edit text resource
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
Click the `+` sign next to the field to add a new text resource (or the pencil icon to edit if one is already selected).
 You can add/edit texts in English and Norwegian bokmål. Other languages are available from the text editor (click _Tekst_ in the top-level menu).

![Create and edit text resource screenshot](screenshot-edit-text.png "Create and edit text resource")

{{</content-version-container>}}
{{<content-version-container version-label="Code">}}
Add or edit the text resource id and value in the appropriate language resource file.
 If the file does not exist, you can create it.
```json{hl_lines=["6-9"]}
// File: /App/config/texts/resource.en.json

{
  "language": "en",
  "resources": [
    {
      "id": "kommune-logo.altTextImg",
      "value": "Sogndal municipality coats of arms. Image"
    },
    ...
  ]
}
```
```json{hl_lines=["6-9"]}
// File: /App/config/texts/resource.nb.json

{
  "language": "nb",
  "resources": [
    {
      "id": "kommune-logo.altTextImg",
      "value": "Sogndal kommunevåpen. Bilde"
    },
    ...
  ]
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

### 4. Width
Property: `width`  
Image width is given as a percentage of the original width.

### 5. Alignment
Property: `align`  
The `align` property controls the horizontal alignment of the image.
In Designer, the options are "Venstre" (left), "Midtstilt" (centred), and "Høyre" (right).
 These settings correspond to the property values `flex-start`, `center`, and `flex-end`.
  In addition, `align` accepts the values `space-between`, `space-around`, and `space-evenly`.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
![Screenshot of alignment settings](screenshot-alignment-settings.png "Screenshot of alignment settings")

![]() <!-- Hack to reveal image caption -->
{{</content-version-container>}}
{{<content-version-container version-label="Code">}}
```json{hl_lines="17"}
// File: /App/ui/layouts/<page>.json

{
  "data": {
    "layout": [
      {
        "id": "kommune-logo",
        "type": "Image",
        "textResourceBindings": {
          "altTextImg": "kommune-logo.altTextImg"
        },
        "image": {
          "src": {
            "nb": "wwwroot/kommune-logo.png",
          },
          "width": "100%",
          "align": "flex-start"
        }
      }
    ]
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

---
## Properties

The following is an autogenerated list of the properties available for {{% title %}} based on the component's JSON schema file:

{{% component-props %}}
<!-- {{% expandlarge id="props-list" header="Available properties" %}} -->
<!-- {{% /expandlarge %}} -->

## Examples

### Multiple sources based on language

The default source is `nb`; any language that does not define a separate image source will use this source.
  List another language code and image source to add a source, as in the example below.

Available language sources are `en` (English), `nb` (Norwegian Bokmål), and `nn` (Norwegian Nynorsk).

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Code">}}
```json{hl_lines=["10-13"]}
// File: /App/ui/layouts/<page>.json

{
  "data": {
    "layout": [
      {
        "id": "example-image",
        "type": "Image",
        "image": {
          "src": {
            "nb": "https://example.com/image_nb.png",
            "en": "https://example.com/image_en.png"
          },
          "width": "100%",
          "align": "center"
        }
      }
    ]
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

### Horizontal alignment with `grid`

The `grid` property controls horizontal alignment based on a 12-column layout.
 Items are allocated fractions of 12 which sets their width relative to the screen width.
  In the example below, we set the image component's width to 2/12 of the screen width for all screen sizes.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Code">}}
```json{hl_lines=["15-17"]}
// File: /App/ui/layouts/<page>.json

{
  "data": {
    "layout": [
      {
        "id": "kommune-logo",
        "type": "Image",
        "image": {
          "src": {
            "nb": "wwwroot/kommune-logo.png",
          },
          "width": "100%",
          "align": "center",
          "grid": {
            "xs": 2,
          }
        }
      },
      ...
    ]
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}


![Grid example screenshot](screenshot-grid-example.png "Example of image taking up 2/12 of the screen width")

You can also use `grid` to place items side by side.

See [Components placed side by side (grid)](/app/development/ux/styling/#components-placed-side-by-side-grid) for details and more examples.