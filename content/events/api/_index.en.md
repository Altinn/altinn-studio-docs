---
title: Altinn Events API
linktitle: API
description: An overview of the Altinn Events API
weight: 10
toc: true
---

The Altinn Events API is an HTTP-based RESTful API that provides endpoints and actions for publishing of events and subscribing to events from Altinn 3 Apps and other registered sources.

## Base URL

{{% insert "content/events/api/base-urls.md" "events"%}}

## Authentication & Authorization

### Altinn token

{{% insert "content/events/api/altinn-token.md" "Events"%}}

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

### Private APIs

The API contains a set of private APIs that are only accessible within the Events-component.
These are marked as _Private API_ in the OpenAPI specification and require an access token in the request header.
