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

{{% insert "content/events/api/base-urls.md" "notifications"%}}

## Authentication & Authorization

### Altinn token

{{% insert "content/events/api/altinn-token.md" "Notifications"%}}

### Maskinporten scopes

{{% notice info %}}
TODO: find docs to link to or create them.
{{% /notice %}}

Some endpoints in the API require additional authorization in the form of a
Maskinporten scope. [User documentation on setting up a maskinporten integration with a specific scope
is available here]().

### Platform Access token

The use of some endpoints in the API is limited to callers within the Altinn eco-system.
These APIs require additional authorization in the form of a
Platform Access Token. Reference developer documentation for the client system on how to generate
the token.
