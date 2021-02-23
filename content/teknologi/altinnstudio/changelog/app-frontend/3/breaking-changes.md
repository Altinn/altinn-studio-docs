---
title: Breaking changes
linktitle: Breaking changes
description: Overview of breaking changes introduced into app frontend in v3.0.0
---

As of v3.0.0 of app frontend, the font [Altinn-DIN](https://github.com/Altinn/altinn-din) replaces the 
Roboto font that was used previously.

Once an app is upgraded to use v3 of the app frontend, all CSS expects the Altinn-DIN font to be loaded.
In order for the app to display fonts as expected, the font that is loaded with the app must be updated.

In `App/views/Home/Index.cshtml`, replace the line 

```
<link href="https://altinncdn.no/fonts/roboto/latin/roboto.css" rel="stylesheet">
```

with

```
<link href="https://altinncdn.no/fonts/altinn-din/altinn-din.css" rel="stylesheet">
```

The updated file, referring to v3 of app frontend, should reflect the changes of the file on the right:

![Diff when upgrading to v3 of app frontend](../v3-diff.png "Diff when upgrading to v3 of app frontend")
