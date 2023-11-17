---
title: Altinn Events API
linktitle: API
description: An overview of the Altinn Events API
weight: 10
toc: true
---

The Altinn Events API is an HTTP-based RESTful API that provides endpoints and actions for publishing of events and subscribing to events from Altinn 3 Apps and other registered sources.

## Base URL

{{% insert "/shared/api/base-urls.txt" "events"%}}

## Authentication & Authorization

### Altinn token

{{% insert "/shared//api/altinn-token.txt" "Events"%}}

### Maskinporten scopes

{{% insert "/shared/api/maskinporten-scopes.txt" %}}

### Platform Access token

{{% insert "/shared/api/platform-access-token.txt" %}}

### Private APIs

The API contains a set of private APIs that are only accessible within the Events-component.
These are marked as _Private API_ in the OpenAPI specification and require an access token in the request header.
