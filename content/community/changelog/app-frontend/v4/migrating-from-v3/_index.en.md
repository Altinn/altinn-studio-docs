---
title: Migration from v3
description: How to migrate from App-frontend v3 to v4
weight: 50
---

{{% notice warning %}}
There are several breaking changes between App-frontend v3 and v4. 
Make sure to read through the [list of breaking changes](/community/changelog/app-frontend/v4), and make the necessary changes throughout your app in addition to the changes below.
{{% /notice %}}

{{% notice info %}}
As of writing this documentation, the latest release candidate of app-frontend v4 is `4.0.0-rc2`. Updated information
[is available on GitHub](https://github.com/Altinn/app-frontend-react/releases). Before the release of v4.0.0 stable,
you will have to use exact version numbers in the URLs, e.g. `4.0.0-rc2` instead of `4`. Each time we release a new
release candidate and you want to try out the new release, this URL will have to be updated. When the stable
version is released, you can use `4` as the version number in the URLs and get the latest stable version automatically.
{{% /notice %}}

We are planning to release an upgrade tool that will automate the migration process and fix most breaking changes. 
Until then, you can use the following guide to migrate manually.

### Manual migration

To use App-frontend v4 in your app, you need to change which version is referenced in your app's `Index.cshtml` file. 
This file should be located in the `App/views/Home` folder. 
In addition to changing the version, you should also remove the links to the third party CSS and font, as the font is now loaded by App-frontend itself, and the third party CSS is no longer used.

Changes inside __&lt;head&gt;__:
{{< code-title >}}
App/views/Home/Index.cshtml
{{< /code-title >}}
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
+ <link rel="stylesheet" type="text/css" href="https://altinncdn.no/toolkits/altinn-app-frontend/4.0.0-rc2/altinn-app-frontend.css">
```

Changes inside __&lt;body&gt;__:
{{< code-title >}}
App/views/Home/Index.cshtml
{{< /code-title >}}
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
+ <script src="https://altinncdn.no/toolkits/altinn-app-frontend/4.0.0-rc2/altinn-app-frontend.js"></script>
```

It's optionally also possible to change the `$schema` reference in layout files to get the latest suggestions
and validations for layout configuration. This is not required for v4 to work, but is recommended when developing
applications locally, as you'll get the most up-to-date suggestions and validations in Visual Studio Code.
{{< code-title >}}
App/ui/*/layouts/*.json
{{< /code-title >}}

```diff
  {
-   "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
+   "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4.0.0-rc2/schemas/json/layout/layout.schema.v1.json",
    "data": {
      "layout": [
        {
          "id": "nav1",
          "type": "NavigationBar"
          ...
        },
        ...
      ]
    }
  }
```

{{% notice warning %}}
__Note__: These are only the changes necessary to switch frontend version, you also need to fix any [breaking changes](/community/changelog/app-frontend/v4) affecting your app, including upgrading the nuget packages to version 8.0.
{{% /notice %}}

