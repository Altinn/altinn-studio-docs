---
title: Migration from v3
description: How to migrate from App-frontend v3 to v4
weight: 50
---

{{% notice warning %}}
There are several breaking changes between App-frontend v3 and v4. 
Make sure to read through the [list of breaking changes](/community/changelog/app-frontend/v4), and make the necessary changes throughout your app.
{{% /notice %}}

We are planning to release an upgrade tool that will automate the migration process and fix most breaking changes. 
Until then, you can use the following guide to migrate manually.

### Manual migration

To use App-frontend v4 in your app, you need to change which version is referenced in your app's `Index.cshtml` file. 
This file should be located in the `App/views/Home` folder. 
In addition to changing the version, you should also remove the links to the third party CSS and font, as the font is now loaded by App-frontend itself, and the third party CSS is no longer used.

<!-- TODO: Should we change '4' in the URLs to the release candiate version to begin with? -->

Changes inside __&lt;head&gt;__:
```diff
  <title>@ViewBag.Org- @ViewBag.App</title>

  <link rel="icon" href="https://altinncdn.no/favicon.ico">
- 
- <!-- Third Party CSS -->
- <link rel="stylesheet" href="https://altinncdn.no/toolkits/fortawesome/altinn-no-bold/0.1/css/embedded-woff.css">
- <link rel="stylesheet" href="https://altinncdn.no/toolkits/fortawesome/altinn-no-regular/0.1/css/embedded-woff.css">
- <link rel="stylesheet" href="https://altinncdn.no/toolkits/fortawesome/altinn-studio/0.1/css/embedded-woff.css">
- 
- <!-- Fonts -->
- <link href="https://altinncdn.no/fonts/altinn-din/altinn-din.css" rel="stylesheet">

  <!-- Runtime CSS -->
- <link rel="stylesheet" type="text/css" href="https://altinncdn.no/toolkits/altinn-app-frontend/3/altinn-app-frontend.css">
+ <link rel="stylesheet" type="text/css" href="https://altinncdn.no/toolkits/altinn-app-frontend/4/altinn-app-frontend.css">
```

Changes inside __&lt;body&gt;__:
```diff
  <div class="flex-column d-flex media-body">

  <script>
    function loadScript() {
      var appId = window.location.pathname.split('/');
      window.reportee = document.cookie.replace(/(?:(?:^|.*;\s*)AltinnPartyId\s*\=\s*([^;]*).*$)|^.*$/, "$1");;
      window.org = appId[1];
      window.app = appId[2];
    }
  </script>
  <div id="root" class="media-body flex-column d-flex"></div>
  <script>
    loadScript();
  </script>
  </div>

- <script src="https://altinncdn.no/toolkits/altinn-app-frontend/3/altinn-app-frontend.js"></script>
+ <script src="https://altinncdn.no/toolkits/altinn-app-frontend/4/altinn-app-frontend.js"></script>
```

__Note__: These are only the changes necessary to switch frontend version, you also need to fix any [breaking changes](/community/changelog/app-frontend/v4) affecting your app, including upgrading the nuget packages to version 8.0.
