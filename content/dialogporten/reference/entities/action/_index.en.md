---
title: 'Action'
description: 'Reference information about the actions entities'
weight: 50
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

Actions describe operations the end user or a client integration can perform in relation to a dialog.

Both GUI actions and API actions share the same core authorization model:

- `action` maps to an action identifier in the service resource policy
- `authorizationAttribute` can override the default authorization resource for the action
- `isAuthorized` shows whether the authenticated user is currently authorized

In end-user APIs, unauthorized targets are redacted:

- GUI action URLs are rewritten to `urn:dialogporten:unauthorized`
- API action endpoint URLs are rewritten to `urn:dialogporten:unauthorized`

GUI actions are intended for browser-based frontends and add UI-specific fields such as:

- `priority`
- `httpMethod`
- `title`
- optional `prompt`
- `isDeleteDialogAction`

API actions are intended for client integrations and group one or more versioned endpoints. Each endpoint can expose:

- `version`
- `url`
- `httpMethod`
- optional `documentationUrl`
- optional `requestSchema`
- optional `responseSchema`
- `deprecated`
- optional `sunsetAt`


## GUI Actions

{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogGuiAction">}}

## API Actions

{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogApiAction">}}

{{<children />}}
