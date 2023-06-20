---
title: Link
description: Button or link to redirect the user to an external page.
---

The link component can be used to redirect the user to an external page. It can be rendered as either a button or a link.

- [Configuration](#configuration)
- [Dynamic URL](#dynamic-url)
- [Environment configuration](#environment-configuration)

## Configuration

The link component has the following properties:

| Property                      | Type      | Description                                                                            |
| ----------------------------- | --------- | -------------------------------------------------------------------------------------- |
| `textResourceBindings.title`  | `string`  | The title of the button or link.                                                       |
| `textResourceBindings.target` | `string`  | The URL to redirect to.                                                                |
| `openInNewTab`                | `boolean` | Whether to open the URL in a new tab or not.                                           |
| `style`                       | `string`  | The style of the button. Can be one of the following: `primary`, `secondary` , `link`. |

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
