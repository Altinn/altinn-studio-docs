---
title: Alert
description: This component displays an important message to the user. The component can be used to display a message with different levels of severity.
weight: 10
---

## Usage

Alerts are commonly used to display important information to users that should be highlighted.

* [Page layout JSON schema](https://altinncdn.no/schemas/json/layout/layout.schema.v1.json)

## Component properties

| **Property** | **Title**    | **Type**                                       | **Description**                                                                                |
|--------------|--------------|------------------------------------------------|------------------------------------------------------------------------------------------------|
| `severity`   | Severity     | `"success" \| "info" \| "danger" \| "warning"` | String value indicating the severity level of the alert. This affect the styling of the alert. |

### Properties Description

The component has these properties:

#### severity

The severity of the alert. This affects the styling of the alert.


#### textResourceBindings

`title` and `body` can be configured with `textResourceBindings` to display text from the resource file.

## Accessibility

The component does not have `role="alert"` by default. This means that screen readers will not treat this as an alert.
An `Alert` should only have `role="alert"` if it appears in the ui as a result of an action the user has taken. Therefore,
`role="alert"` will be added if you use an expression in the hidden property.

## Examples

### Info

An alert with `severity` `"info"`

![Info card](info.png)

`FormLayout.json` example:

```json
{
  "id": "alert-id",
  "type": "Alert",
  "textResourceBindings": {
    "title": "Vedrørende navneendring",
    "body": "Ved å bekrefte navneendring bekrefter du at du ønsker å endre navnet ditt."
  },
  "severity": "info"
}

```

### Success

An alert with `severity` `"success"`

![Info card](success.png)

`FormLayout.json` example:

```json
{
  "id": "alert-id",
  "type": "Alert",
  "textResourceBindings": {
    "title": "Vedrørende navneendring",
    "body": "Ved å bekrefte navneendring bekrefter du at du ønsker å endre navnet ditt."
  },
  "severity": "success"
}

```
### Warning

An alert with `severity` `"warning"`

![Info card](warning.png)

`FormLayout.json` example:

```json
{
  "id": "alert-id",
  "type": "Alert",
  "textResourceBindings": {
    "title": "Vedrørende navneendring",
    "body": "Ved å bekrefte navneendring bekrefter du at du ønsker å endre navnet ditt."
  },
  "severity": "warning"
}

```
### Danger

An alert with `severity` `"danger"`

![Info card](danger.png)

`FormLayout.json` example:

```json
{
  "id": "alert-id",
  "type": "Alert",
  "textResourceBindings": {
    "title": "Vedrørende navneendring",
    "body": "Ved å bekrefte navneendring bekrefter du at du ønsker å endre navnet ditt."
  },
  "severity": "danger"
}

```

