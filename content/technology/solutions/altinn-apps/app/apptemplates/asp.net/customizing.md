---
title: Customzing Application
linktitle: Customizing
description: Description of you can customize the app based on this template.
tags: [altinn-apps]
---

## Adding custom API's
It is possible to add custom API's to the app. The need to be added as web-api controllers in the app project. 

See [development handbook](/app/development/api/expose/) for a step to step guideline for adding custom API's to the application.

## Consuming custom API's
A app can consume any REST-API avaiable on the Internet. 

See development handbook for a step to step guideline for consuming external API's.

## Custom frontend
If the standard UI-editor is to limited it is possible to build a custom frontend with the single page application (SPA) framework of your choice. (React, Angular, Vue etc ++).
You need to compile the SPA application and add it to the wwroot folder of the app. In addition you would need to modify the index.cshtml file to display your app.
