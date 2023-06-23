---
title: Images
description: How to add and edit image references.
toc: true
aliases:
- /app/development/ux/components/images/
---

{{%notice warning%}}

**NOTE:** the image component is not yet supported in PDF-generation and will be ignored.

{{%/notice%}}

## Add images to the application

Adding images is done in _FormLayout.json_ by using the image component. Alternative text is useful for scenarios when the image cannot be loaded for any reason, or for users that use screen readers. This can be added as a text resource, defined in _resource.[language].json_.

```json
{
  "data": {
    "layout": [
      {
        "id": "616071dc-90b1-4ce5-8d18-492844828a41",
        "type": "Image",
        "textResourceBindings": {
          "altTextImg": "imgAltText"
        },
        "image": {
          "src": {
            "nb": "https://example.com/image_nb.png"
          },
          "width": "100%",
          "align": "center"
        }
      }
    ]
  }
}
```

The image can also have separate sources for different languages. The default source is _nb_, and this source will be used for any language that does not define a separate source for the image. Below is an example with different sources for _nb_ and _en_:

```json
{
  "data": {
    "layout": [
      {
        "id": "616071dc-90b1-4ce5-8d18-492844828a41",
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
          "align": "center"
        }
      }
    ]
  }
}
```

## Hosting images from apps

If the image should be loaded from the app, you need to set up static hosting of files in the application. This is automatically set up for applications created after december 2021. For older applications, you should follow the steps below.
This is configured in _App/Startup.cs_, in the _Configure_ method. This will host all files that is inside the `/app/wwwroot` folder. If this folder does not exist, it needs to be created.
If you want to refer to the file `app/wwwroot/bilde_nb.png` it can be reached at the following relative url `/org/app-name/bilde_nb.png`

_applicationId_ is a variable from a few lines above containing _org/app-name_ from `applicationmetadata.json`:

```C# {linenos=false,hl_lines=[5]}
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
    // ...
    app.UseRouting();
    app.UseStaticFiles('/' + applicationId);
    app.UseAuthentication();
    // ...
  }
```

In _FormLayout.json_ the reference to the image should be a relative url that starts with _/org/app-name_ similar to what was set up as the static hosting.
You can also use the custom prefix `wwwroot` (without a starting `/`), that will be replaced with _/org/app-name_ before the image is loaded.

```json
{
  "data": {
    "layout": [
      {
        "id": "616071dc-90b1-4ce5-8d18-492844828a41",
        "type": "Image",
        "textResourceBindings": {
          "altTextImg": "imgAltText"
        },
        "image": {
          "src": {
            "nb": "wwwroot/bilde_nb.png"
          },
          "width": "100%",
          "align": "center"
        }
      }
    ]
  }
}
```
