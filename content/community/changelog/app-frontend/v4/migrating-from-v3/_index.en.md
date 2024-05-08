---
title: Migration from v3
description: How to migrate from App-frontend v3 to v4
weight: 50
toc: true
--- 

## Introduction

This guide will help you migrate your app from using version 3 of App-frontend to version 4. 
Since there are several breaking changes between these versions, it is very important that you test your app thoroughly after migrating. 
There is currently no support in Altinn Studio for upgrading apps, so using the Altinn Studio CLI is the recommended way to migrate. 
This will fix most of the breaking changes automatically, but you may still need to make some manual changes to your code.

## Migrate automatically using the Altinn Studio CLI

{{% notice info %}}
**Note**: You also need to upgrade the nuget packages to version 8.0. This can also be done using the Altinn Studio CLI. See [Migration from v7](/community/changelog/app-nuget/v8/migrating-from-v7) for more information.
{{% /notice %}}

The Altinn Studio CLI is a command line tool for upgrading Altinn Apps. The tool is able to upgrade and fix most breaking changes between version 3 and 4 of the Altinn App-frontend.

### Verify that you have the latest version of the Altinn Studio CLI

If you do not have the CLI installed, you can install it by following the instructions in the [installation guide](/app/cli/install).

Make sure you are using at least version `1.4.0` of the Altinn Studio CLI. You can check the version by running:

```bash
altinn-studio --version
```

If you have an older version, you can update it by running:

```bash
dotnet tool update -g altinn.studio.cli
```

### Run the upgrade command

First, navigate to the root folder of your app in your terminal. There are several optional arguments you can use with the `upgrade frontend` command. You can see all the available options by running:

```bash
altinn-studio upgrade frontend --help
```

The default options should work for most apps, but you may need to specify some options if you have a non-standard project structure. 
If some of the options are not correct, the CLI should print an error message explaining what went wrong.

It is recommended to have a clean working tree before running the upgrade command. 
This means that you should commit or stash any changes you have made to your code before running the command. 
That way you can easily see what changes the CLI made to your code, as well as reset and try again if something went wrong.

When you are ready to upgrade, run the following command:

```bash
altinn-studio upgrade frontend
```

The CLI will then make the necessary changes to your code to upgrade it to version 4 of App-frontend. The CLI will also print warnings and errors if it encounters any problems during the upgrade process, make sure to read these carefully.

## Migrate manually

To use App-frontend v4 in your app, you need to change which version is referenced in your app's `Index.cshtml` file. 
This file should be located in the `App/views/Home` folder. 
In addition to changing the version, you should also remove the links to the third party CSS and font, as the font is now loaded by App-frontend itself, and the third party CSS is no longer used.

1. Changes inside __&lt;head&gt;__:
    <br><br>
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
    + <link rel="stylesheet" type="text/css" href="https://altinncdn.no/toolkits/altinn-app-frontend/4/altinn-app-frontend.css">
    ```
2. Changes inside __&lt;body&gt;__:
    <br><br>
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
    + <script src="https://altinncdn.no/toolkits/altinn-app-frontend/4/altinn-app-frontend.js"></script>
    ```
3. It's optionally also possible to change the `$schema` reference in layout files to get the latest suggestions
    and validations for layout configuration. This is not required for v4 to work, but is recommended when developing
    applications locally, as you'll get the most up-to-date suggestions and validations in Visual Studio Code.
    <br><br>
    {{< code-title >}}
    App/ui/*/layouts/*.json
    {{< /code-title >}}
    ```diff
      {
    -   "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
    +   "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
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
4. Fix any [breaking changes](/community/changelog/app-frontend/v4) affecting your app, including upgrading the nuget packages to version 8.0.

## Opt-in to Altinn AI for tracks migration

In v3, `IPageOrder` and `calculatePageOrder`, so called tracks, could be used to define custom page order based on input 
from the user. This functionality has been removed in v4, and the page order is now determined by the layout configuration 
with the `hidden` property. To get pages to show/hide based on selections in the UI, you can use `hidden` together with 
dynamic expressions. This is a somewhat different approach to a dynamic page order, and you may find it beneficial to get
some help with the migration.

You can opt-in for an automatic AI-generated Pull Request to help you migrate from the old tracks feature, as the new 
way of handling page order is also available in v3. When you have opted-in for the AI-generated Pull Request, our 
Altinn AI Bot will create a Pull Request in your repository with a suggested migration from tracks to dynamic expressions.
This PR will be generated in a nightly run.

Steps to opt-in on a single repository:
1. In Gitea, go to the repository where you want to opt-in for the AI-generated Pull Request.
2. Go to the Settings tab.
3. Go to the Collaboration section.
4. Add "altinn_sa_ai (Altinn AI [Bot])".
5. Sit back and relax, and let the Altinn AI do the work for you. The PR will be created in a nightly run if the bot finds any tracks in your repository.


If you want to opt-in for all repositories in your organization, you can do this on a service owner level.
Steps to opt-in on a service owner level:
1. In Gitea, go to your organization: `https://altinn.studio/repos/<orgname>`
2. Go to the Teams tab.
3. Click the "Devs" team.
4. Add "altinn_sa_ai (Altinn AI [Bot])" to the team.
5. Sit back and relax, and let the Altinn AI do the work for you. A PR will be created in a nightly run in any repository the bot finds the tracks implementation.


{{% notice warning %}}
**Note**: Because the dynamic expression way of handling page order differs slightly from the tracks implementation,
the migrated result might not be a 100% match to the original behavior. The AI is not perfect at migrating the 
code, and you should always review and test the changes made in the Pull Request before merging it. 
{{% /notice %}}

The generative AI model used for this bot is 'gpt-4-1106-preview' from OpenAI, hosted as a dedicated instance on Digdir's
internal Azure subscription. Information provided to the model is limited to a relevant subset of your repository,
in this case the C# classes that implement the `IPageOrder` interface. Note that this information is not made available 
to any third party for training purposes.

 
