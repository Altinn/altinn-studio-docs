---
title: Create new service
linktitle: New service
description: How to create a new service (application) in Altinn Studio.
weight: 1
---

Altinn Studio is used to create applications (apps).
An app can be anything from a simple form to a more complex application with APIs and user interfaces.

You create an app from the [Altinn Studio dashboard](https://altinn.studio/dashboard) (if you don't see the dashboard when you log in, click the logo in the upper left corner).

![Dashboard in Altinn Studio](https://altinncdn.no/studio/docs/images/dashboard_new-app-button.png "Altinn Studio Dashboard")

1. Click on "**Opprett ny applikasjon**" (create new application) in the top right corner of the dashboard.
2. Select the owner of the app from the **Eier** drop-down menu.
    This can be an organization you have access to or your own user name. Selection is disabled if your user is the only option.
3. Add the name of your app under **Navn**.
    The name is an ID used to identify the application and will be used as the repository name, in URLs, and APIs.  
    **The application name (ID)...**
   - should be short and descriptive (for instance "sick-leave" or "local-election-2024")
   - can only contain lower case letters, numbers, and dash (-)
   - must begin with a letter
   - must end with a letter or a number
   - _can not be changed after the app has been deployed to production._
4. Click "**Opprett applikasjon**" (create application) to create the app.

![New app popup](https://altinncdn.no/studio/docs/images/dashboard_new-app.png "Create new app")

Once the app is created you will be forwarded to an overview page.
From here you can navigate to **Lage**, **Datamodell**, and **Tekst** via the top-level menu bar to start building your app.

![App overview](https://altinncdn.no/studio/docs/images/app-development_overview.png "App Overview")
