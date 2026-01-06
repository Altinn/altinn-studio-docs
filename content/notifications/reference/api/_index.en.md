---
title: Altinn Notifications API
linktitle: API
description: An overview of the Altinn Notifications API
weight: 10
toc: true
---

The Altinn Notifications API is an HTTP-based RESTful API that provides endpoints and actions for ordering,
managing and reviewing notifications sent through Altinn.

## Base URL

{{% insert "content/altinn-studio/v8/guides/shared/api/base-urls.md" "notifications"%}}

## Authentication & Authorization

### Altinn token

{{% insert "content/altinn-studio/v8/guides/shared/api/altinn-token.md" "Notifications"%}}

### Maskinporten scopes

{{% insert "content/altinn-studio/v8/guides/shared/api/maskinporten-scopes.md" %}}


### Platform Access token

{{% insert "content/altinn-studio/v8/guides/shared/api/platform-access-token.md" %}}

## Error Handling

The Altinn Notifications API uses standard HTTP status codes and provides detailed error information through problem details responses.

### Error Codes

The API returns unique error codes in the format `NOT-XXXXX` for specific error conditions. These error codes help you identify and handle specific error scenarios programmatically.

For a complete reference of all error codes, see the [Error Codes Reference](/en/notifications/reference/error-codes/).
