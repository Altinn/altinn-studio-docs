---
title: Application construction components - Designer Front-end
linktitle: Front-end
description: Description of the application construction components for Altinn Studio Designer Front-end
weight: 10
---

The Designer frontend consists of multiple React + Redux applications. It is split into two top-level applications:
- dashboard
- app-development

In additions, different functional areas will have their own applications, which are then imported into the relevant top-level application as a _subapp_ 
(see https://redux.js.org/recipes/isolatingsubapps). Currently, we have the following subapps, that are used by the _app-development_ top-level application:
- ux-editor
- schema-editor (data modeling)

Finally, there is a library of shared components and utils that are used accross all the applications in the Designer frontend.

![High-level overview of Designer frontend applications](/community/contributing/handbook/front-end/getting-started/structure-studio.drawio.svg "High-level overview of Designer frontend applications")

During build of the Designer application, the top-level applications are transpiled into javascript-files and CSS, which are copied into the Designer backends `wwwroot` folder and hosted there.
The Designer backend is a web application with views, that reference the javascript files and CSS.

{{% notice info %}}
**NOTE:** Parts of the front-end is currently built in .NET Core.
This will gradually be ported over to React as we work with the different functional areas. The exception here is the static landing page, which will remain
as a custom view in the .NET application.
{{% /notice %}}


## React architecture

The front-end of Altinn Studio designer is set up using the same React + Redux architecture as the App frontend, take a look [here](../../../app/app-frontend/react) 
for more details.

{{<children />}}
