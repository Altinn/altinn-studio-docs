---
title: Image
description: Display visual content such as pictures, logos, and icons
# toc: true
schemaname: Image
weight: 10
aliases:
- /app/development/ux/images/
- /app/guides/design/guidelines/components/picture-component/
---

## Usage

Use images and illustrations to emphasize points or illustrate concepts which are difficult to explain using text.

{{%notice warning%}}
**NOTE:** the image component is not yet supported in PDF-generation and will be ignored.
{{%/notice%}}

### Anatomy



### Best practices
We recommend following the guidelines by [UUtilsynet](https://www.uutilsynet.no/regelverk/bilder-og-grafikk/205).

- Add an alternative text which explains the image. This is used by screen readers and will be displayed if the image is unavailable.
- If an image is purely decorative, it's best to not include an alternative text.
- Don't use images for images sake. Ask yourself if the image illustrates a point or increases the understanding of what you are trying to tell.
- Check if the image scales well on different devices, like on mobile or a tablet. An image which looks good on a PC can quickly fill a smaller screen.
- Avoid using images in place of text, as it cannot be read by screen readers.

### Content guidelines

Keep alternative texts consistent:
- Never start with "Image of ..."
- Write short and start with the most important part of the image.
- End by saying if the photo is a photo, illustration or graphic.

**Example** 
<img src="https://www.uutilsynet.no/sites/tilsyn/files/styles/xxl/public/2023-01/Tretralle.png?itok=gBevDs0F" alt="Old wooden trolly. Photograph." width="300px"/>

Alt text: "Old wooden trolly. Photograph."

For more guidelines and examples, see [UUtilsynet](https://www.uutilsynet.no/regelverk/bilder-og-grafikk/205).

## Add and configure component
In [Altinn Studio Designer](/app/getting-started/ui-editor/), drag the component from the left-side panel to the page area in the middle.

{{% expandlarge id="configuration-asd" header="Configuration in Altinn Studio Designer" %}}
Select the component you want to configure by clicking it. This will bring up the configuration panel for the component on the right-hand side.

![Images settings anatomy](./images-settings-anatomy.png)
#### 1. Component ID
Property: `id`  
Unique ID for each component. This comes pre-filled, but you can change the value as you like.

#### 2. Source
Property: `src`  
The image source can be external or local ([hosted in the app](#hosting-images-from-apps)).
* Source for *externally hosted images* : External image URL (e.g. `https://example.com/image.png`).
* Source for *images hosted in the app* :
  * Relative image URL (`/<org or username>/<app-name>/image.png`)
  * Relative file path for the image (`wwwroot/image.png`)

It is possible to configure separate sources for different languages, see 

#### 3. Alternative text
Property: `altTextImg`  
An alternative text is used by screen readers and will be displayed if the image is unavailable.
The text can be added directly by clicking the `+` sign next to the field
 (creates a new [text resource](/app/development/ux/texts/#add-and-change-texts-in-an-application)), or you can click the magnifying glass to choose a pre-made one.

#### 4. Width
Property: `width`  
Image width given as percentage of original width.

#### 5. Placement
Property: `align`  
Horizontal placement of image. Options are "Venstre" (left), "Høyre" (right), and "Midtstilt" (middle).

### Corresponding code
The `Image` component (highlighted) may be added directly to the page's layout file, `App/ui/layouts/<page>.json`, as follows:

```json{linenos=false,hl_lines=["4-14"]}
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

{{% /expandlarge %}}

{{% expandlarge id="hosting-images-from-apps" header="Hosting images from apps" %}}

{{% notice info %}}
Static hosting is automatically set up for applications created after December 2021.
 For apps created before Dec 2021, static hosting must be [configured manually](#set-up-static-hosting).
{{% /notice %}}

When static hosting is configured, all files placed inside the `/<app-name>/wwwroot` folder will be hosted in the application. If this folder does not exist, it needs to be created.

An image placed in `/<app-name>/wwwroot` can be referenced in one of two ways:
1. Using its relative URL: `/<org or username>/<app-name>/image.png` or
2. Using the image path: `wwwroot/image.png`

Example with statically hosted images, one referred to by image path and the other by relative URL:

```json{linenos=false,hl_lines=["5-15"]}
// File: /App/ui/layouts/<page>.json
{
  "data": {
    "layout": [
      {
        "id": "image1",
        "type": "Image",
        "image": {
          "src": {
            "nb": "wwwroot/image1.png"
          },
          "width": "100%",
          "align": "center"
        }
      },
      {
        "id": "image2",
        "type": "Image",
        "image": {
          "src": {
            "nb": "/testDepartment/test-app-123/image2.png"
          },
          "width": "100%",
          "align": "center"
        }
      }
    ]
  }
}
```

### Set up static hosting
For apps created *before December 2021*, static hosting must be configured manually.
In in the `Configure` method in `App/Startup.cs`, add the highlighted line as shown below:

```C# {linenos=false,hl_lines=[7]}
// File: /App/Startup.cs

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
    // ...
    app.UseRouting();
    app.UseStaticFiles('/' + applicationId);
    app.UseAuthentication();
    // ...
  }
```

`applicationId` is the `id` in `applicationmetadata.json`:

```json{linenos=false,hl_lines=[3]}
// File: /App/config/applicationmetadata.json
{
  "id": "testUser/test-app-123",
  "org": "testUser",
  "title": {
    "nb": "test-app-123"
  },
  // ...
```

{{% /expandlarge %}}

## Properties

{{% expandlarge id="property-list" header="Properties list" %}}

The following is an autogenerated list of the properties available for {{% title %}} based on the component's JSON schema file:

{{% component-props %}}

{{% /expandlarge %}}

{{% expandlarge id="examples" header="Configuration Examples" %}}

* `altTextImg`: Alternative text is useful for scenarios when the image cannot be loaded for any reason, or for users that use screen readers.
  This can be added as a [text resource](/app/development/ux/texts) defined in `resource.<language>.json`.  
  In the example below, an alternative text is added using the text resource key `imgAltText`.

* `src`: The default source is `nb`, and this source will be used for any language that does not define a separate source for the image.
  To add a source, list another language code and image link as in the example below.

* `grid`: The `grid` property may be used to place components side by side. See [grid](/app/development/ux/styling/#components-placed-side-by-side-grid) for details.


```json{hl_lines=["4-22"]}
{
  "data": {
    "layout": [
      {
        "id": "example-logo",
        "type": "Image",
        "textResourceBindings": {
          "altTextImg": "imgAltText"
        },
        "image": {
          "src": {
            "nb": "https://example.com/image_nb.png",
            "en": "https://example.com/image_en.png"
          },
          "width": "100%",
          "align": "center",
          "grid": {
            "xs": 12,
            "md": 6
          }
        }
      }
    ]
  }
}
```
{{% /expandlarge %}}