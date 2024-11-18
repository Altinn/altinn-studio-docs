---
title: Link
description: Button or link to redirect the user to an external page.
weight: 10
---

The link component can be used to redirect the user to an external page. It can be rendered as either a button or a link.

- [Configuration](#configuration)
  - [Example](#example)
- [Dynamic URL](#dynamic-url)
- [Download](#download)
- [Environment configuration](#environment-configuration)

## Configuration

The link component has the following properties:

| Property                        | Type      | Description                                                                            |
| ------------------------------- | --------- | -------------------------------------------------------------------------------------- |
| `textResourceBindings.title`    | `string`  | The title of the button or link.                                                       |
| `textResourceBindings.target`   | `string`  | The URL to redirect to.                                                                |
| `textResourceBindings.download` | `string`  | When set, target is downloaded instead of navigated to. Value is downloaded filename. Use blank string for default filename. |
| `openInNewTab`                  | `boolean` | Whether to open the URL in a new tab or not.                                           |
| `style`                         | `string`  | The style of the button. Can be one of the following: `primary`, `secondary` , `link`. |

### Example

```json
{
  "id": "some-id",
  "type": "Link",
  "textResourceBindings": {
    "title": "Confirm in altinn.no",
    "target": "https://altinn.no/confirm"
  },
  "openInNewTab": false,
  "style": "primary"
}
```

## Dynamic URL

In some cases you may want to have more information in query parameters like the instance id so that you can redirect the user back to the instance from your external page.
This can be done by using an [expression](/app/development/logic/expressions) in the `target` property. See the following example:

```json
{
  "id": "some-id",
  "type": "Link",
  "textResourceBindings": {
    "title": "Confirm in altinn.no",
    "target": [
      "concat",
      "https://altinn.no/confirm?instanceId=",
      ["instanceContext", "instanceId"]
    ]
  },
  "openInNewTab": false,
  "style": "primary"
}
```

## Download

Let's say you need to offer a PDF for download, and that PDF content is found in the data model as a base64 encoded string. Then you can use `target` and `download` to present a link or button for the user to download the file:

```json
{
  "id": "some-id",
  "type": "Link",
  "textResourceBindings": {
    "title": "Download PDF",
    "target": [
      "concat",
      "data:application/pdf;base64,",
      ["dataModel", "Path.To.Pdf"]
    ],
    "download": "downloadFilename"
  },
  "openInNewTab": false,
  "style": "secondary"
}
```

Here `downloadFilename` is looked up as a language resource. It could contain variables like all language resources. `target` could also have been a language resource using a variable instead of an expression as it is here.

## Environment configuration

If your external service has multiple environments, and you want your app to redirect to the correct environment based on the environment the app is running in, you can configure this in the `appsettings.[environment].json` files in your app.
In the following example, I will configure two different urls depending if the app is running in the staging or production environment.

_appsettings.Staging.json_:

```json
{
  "FrontEndSettings": {
    "redirectUrl": "https://tt02.altinn.no/confirm?instanceId="
  }
}
```

_appsettings.Production.json_:

```json
{
  "FrontEndSettings": {
    "redirectUrl": "https://altinn.no/confirm?instanceId="
  }
}
```

_layout.json_:

```json
{
  "id": "some-id",
  "type": "Link",
  "textResourceBindings": {
    "title": "Confirm in altinn.no",
    "target": [
      "concat",
      ["frontendSettings", "redirectUrl"],
      ["instanceContext", "instanceId"]
    ]
  },
  "openInNewTab": false,
  "style": "primary"
}
```
