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

{{% insert "content/events//api/altinn-token.md" "Events"%}}

### Maskinporten scopes

{{% insert "content/events/api/maskinporten-scopes.md" %}}

### Platform Access token

{{% insert "content/events/api/platform-access-token.md" %}}

### Private APIs

The API contains a set of private APIs that are only accessible within the Events-component.
These are marked as _Private API_ in the OpenAPI specification and require an access token in the request header.
