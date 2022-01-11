---
title: Query parameters
description: Available query parameters for an app.
weight: 200
tags: [translate-to-english]
---

## returnUrl

Query parameter `returnUrl` is used by the app to redirect users to that value when they click the exit-button in the app.

**Rules:**
- `returnUrl` must have a valid URL-format
- The host defined in `returnUrl` must be the same host as the URL has (see example below).

Example:  
https://foo.apps.tt02.altinn.no/foo/bar?returnUrl=https://foo.apps.tt02.altinn.no/foo/foobar

Here one can see that `returnUrl` has a valid URL-format and it has the same host name as the app defined in the beginning.

One can not link to a different host name, this will not pass query parameter validation:  
https://foo.apps.tt02.altinn.no/foo/bar?returnUrl=https://foo.apps.altinn.no/foo/foobar

It is important to have the correct order of query parameters and special characters in the URL.
Here is an example showing a correct URL:  
https://ttd.apps.at21.altinn.cloud/ttd/level1-app?returnUrl=https%3A%2F%2Fttd.apps.at21.altinn.cloud%2Fttd%2Fapps-test%2F%23%2Finstance%2Finstanceownerid%2Finstanceguid/#/instance/instanceownerid/instanceguid

Notice that the value inside `returnUrl` has been escaped for all special characters. It is not neccessary, however the
character `#` must be escaped as explained below.

If `returnUrl` contains the character `#` it is very important to escape that character. All occurences of `#` within the 
`returnUrl` value must be replaced with `%23`. If the character is not replaced, the app frontend will have trouble 
figuring out which `#` it should use for fetching values and navigation.