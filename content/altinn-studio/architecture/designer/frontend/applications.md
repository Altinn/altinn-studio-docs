---
title: Overview of frontend applications
linktitle: Applications
description: High-level description of the different applications used in Desgner frontend
toc: true
weight: 11
---

## dashboard
This is a top-level application, and is responsible for showing the app developers an overview of the apps they have available to 
view and/or edit, as well as functionality for creating a new app.

## app-development
This is a top-level application, and handles all operations related to the development of a specific app. It contains functionality like
administration and build/deploy of apps. It also uses the subapps [ux-editor](#ux-editor) and [schema-editor](#schema-editor) to provide functionality for 
creating/editing forms and data models. It does not have access to the store of any of the subapps.

### Header and Navigation
Material UI (applicatiopn bar and drawer) components are customized with altinn studio styles for the header and navigation in Altinn Studio.
A third-party library, [React Routing](https://reacttraining.com/react-router/web/guides/quick-start), is used together with Material UI to handle navigation.
When the user clicks on a header/side navigation link, the route changes and the subapp specific to the route is rendered.

### Header Menu (Application bar)
Application bar component is the Altinn Studio's header menu(navigation links at the top). React router library is used to handle those navigations.
Header menu has different user interface on desktop and tablet.
The display text and the links for navigation are built as object in a configuration file
[appbarconfig](https://github.com/Altinn/altinn-studio/blob/master/src/react-apps/applications/shared/src/navigation/main-header/appBarConfig.tsx).

The configuration object in the file is iterated and the application bar is rendered.
The styles specific to the component are placed inside
[the component file](https://github.com/Altinn/altinn-studio/blob/master/src/react-apps/applications/shared/src/navigation/main-header/appBar.tsx).
In addition to the navigation menu, a breadcrumb is also rendered in tablet view.

### Side Menu (Drawer Menu)
Drawer menu component is the Altinn Studio's side menu which can be found on the left.
It displays a list of Icons by default and on hover expands the menu and lists text by the side of the icon.
It will render a list of navigation links based on the selected header menu.

Side menu has different user interfaces in desktop and tablet. In tablet, only text is displayed and it slides in from left when "Menu" button is clicked.

Two different components are created to acheive this:

- [LeftDrawerMenu](https://github.com/Altinn/altinn-studio/blob/master/src/react-apps/applications/shared/src/navigation/drawer/LeftDrawerMenu.tsx)
- [TabletDrawerMenu](https://github.com/Altinn/altinn-studio/blob/master/src/react-apps/applications/shared/src/navigation/drawer/TabletDrawerMenu.tsx)

The styles specific to the side menu is added in a separate
[style file](https://github.com/Altinn/altinn-studio/blob/master/src/react-apps/applications/shared/src/navigation/drawer/leftDrawerMenuStyles.ts).
Similar to the header menu, the side menu is also rendered by looping over the menu settings object which is available in a separate
[configuration file](https://github.com/Altinn/altinn-studio/blob/master/src/react-apps/applications/shared/src/navigation/drawer/drawerMenuSettings.ts)

## ux-editor
This application is responsible for the GUI allowing app developers to create/edit form views that will be shown in the 
data step in the app frontend.

The general concept is that there is one or more JSON files (_layouts_) where the components that are to be part of a form are specified.
This includes the component types, texts, order, etc. These files are then parsed to display the form in the app frontend.

The _ux-editor_ application provides a GUI to create/change these files. The ux-editor displays a simple representation
of the components that app developers can then edit.

## schema-editor
{{% notice info %}}
This application is currently under development.
{{% /notice %}}
Responsible for the GUI allowing app developers to upload/create/edit data models for the application.
