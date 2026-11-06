---
title: Query parameters
description: Available query parameters for an app.
weight: 200
---

## returnUrl

Query parameter `returnUrl` is used by the app to redirect users to that value when they click the exit-button in the app.

**Rules:**
- `returnUrl` must have a valid URL-format
- The host defined in `returnUrl` must belong to the domain of the environment the app runs in. In TT02 this is `tt02.altinn.no`, and in production it is `altinn.no`. The app compares the end of the host name with the setting `GeneralSettings:HostName`.
- The value of `returnUrl` must be a base64-encoded string

Example without base64-encoded string:  
https://foo.apps.tt02.altinn.no/foo/bar?returnUrl=https://foo.apps.tt02.altinn.no/foo/foobar

Example with base64-encoded string:  
https://foo.apps.tt02.altinn.no/foo/bar?returnUrl=aHR0cHM6Ly9mb28uYXBwcy50dDAyLmFsdGlubi5uby9mb28vZm9vYmFy

Here one can see that `returnUrl` has a valid URL-format and that its host name ends with `tt02.altinn.no`. You can also link to other addresses in the same environment, for example `https://tt02.altinn.no` or another app in TT02.

For readability, the examples below does not use base64-encoded strings.

One can not link to a host name in another environment, such as production from an app in TT02. This will not pass query parameter validation:  
https://foo.apps.tt02.altinn.no/foo/bar?returnUrl=https://foo.apps.altinn.no/foo/foobar

It is important to have the correct order of query parameters and special characters in the URL.
Here is an example showing a correct URL:  
https://ttd.apps.at21.altinn.cloud/ttd/level1-app?returnUrl=https%3A%2F%2Fttd.apps.at21.altinn.cloud%2Fttd%2Fapps-test%2F%23%2Finstance%2Finstanceownerid%2Finstanceguid/#/instance/instanceownerid/instanceguid