---
title: Query parameters
description: Available query parameter for an app.
weight: 200
tags: [translate-to-english]
---

## returnUrl

Query parameter `returnUrl` is used by the app to redirect users to that value when they click the exit-button in the app.

Valid values for `returnUrl` is value with a valid URL-format and that the host name defined in the value is the same one
as the app one links to.

Example:  
https://foo.apps.tt02.altinn.no/foo/bar?returnUrl=https://foo.apps.tt02.altinn.no/foo/foobar

Here one can see that `returnUrl` has a valid URL-format and it has the same host name as the app defined in the beginning.

One can not link to a different host name, this will not pass query parameter validation:  
https://foo.apps.tt02.altinn.no/foo/bar?returnUrl=https://foo.apps.altinn.no/foo/foobar

If `returnUrl` contains the character `#` it is very important to escape that character. All occurences of `#` within the 
`returnUrl` value must be replaced with `%23`. If the character is not replaced, the app frontend will have trouble 
figuring out which `#` it should use for fetching values and navigation.