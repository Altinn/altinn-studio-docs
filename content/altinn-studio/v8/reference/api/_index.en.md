---
title: API
description: The apps developed in Altinn Studio can expose both standard and custom APIs, and take advantage of APIs. Here are guides on how to do it.
weight: 50
---

The app's APIs are documented with OpenAPI. There are two variants of the OpenAPI specification:

- Generic app API – exposes all endpoints regardless of the specific configuration of the app.
- App-specific API – exposes a reduced set of APIs, where several are relevant for end-user systems (available since v8.6).

Both are available at the following URL:

`https://<org>.apps.<env>.altinn.no/<org>/<app>/swagger`

{{% notice info %}}
There are APIs that are not described in an OpenAPI specification. These may be intended for internal use, and we may therefore make undocumented changes to these as needed.
{{% /notice %}}

{{<children />}}
