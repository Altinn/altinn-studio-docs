---
draft: true
title: Create a simple form
description: This guide teaches you how to create and publish an app in Altinn Studio, for example a simple form.
weight: 10
tags: [needsReview]
aliases:
- /altinn-studio/guides/basic-form/
---

{{% expandlarge id="create-service" header="Create a new app" %}}
Log in to Altinn Studio. If you don't have a user account, you can create one from the start page.

1. Click on the button to create a new app at the top right of the screen.
2. In the owner field, select who should own the app. What you can choose here depends on whether you have the right to create an app for your organization, or whether the app will be registered privately, to your user.
   - If you create the app on your own user, you can test all functionality in Altinn Studio, but you do not have access to
     the test environment.
   - If you have the rights to create the app for an organization, you can also publish the service to
     the organization's test environment.
3. In the name field, follow the rules for app names and create a short, descriptive name for your app.
   _The name must have at least two characters and can only contain lowercase letters, numbers, and hyphens. The name identifies your app and cannot be changed after you have set it. You can create a separate display name after you have created the app._
4. Click the button to create the app.

When the app is created, you will see it on the overview page.
{{%/expandlarge%}}

{{% expandlarge id="set-service-name" header="Add the name to be displayed for the app" %}}
Give the app its own display name. This name appears as a heading on the form and in the user's inbox in Altinn.

1. Click on Settings in the menu bar at the top left.
2. In the app name field, enter the name you want your form to have, for example "Reporting of rare species in Sagene district".

The name is saved when you click outside the field, and it is updated on the overview page.
{{%/expandlarge%}}

{{% expandlarge id="create-datamodel" header="Create a data model for your form" %}}
A data model is like a table of contents for the form.
The data model is used to determine _what_ you want to collect data about and _how_ the data
should look.

For a simple form, there is often a direct link between a field in the data model and a field in the form. For more advanced
forms, the data model and the form can be quite different.

When you create an app, it comes with a simple data model with some example fields. You can edit the field names
to clearly show what they represent, and you can add your own fields.

1. Go to __Data model__ in the top menu.
2. Select one of the property fields to display the __Properties__ panel. Here you can, among other things, change the name and set the format.
3. Click on __Add__ and select type. Common types for a simple form can be
   - Text
   - Integer
   - Decimal
4. Add more fields if needed.
If you want to group multiple fields, you can select __Object__ from the Add menu, and then add fields to this object.
5. Click on __Generate models__. You will receive a message that your data model has been created.
{{%/expandlarge%}}

{{% expandlarge id="create-form" header="Drag form components into the form and select properties for them" %}}
You create the form itself on the __Design__ page in Altinn Studio. Here you can drag in the form components you want to include on each page of the form.

### Adding fields to the form
The components you can use in the form are divided into three categories:
- **Standard**: Here you will find all simple form components, such as small and large text fields, dropdown lists (one or more answers),
  checkboxes, radio buttons, and submit button.
- **Text**: In this category you will find components you can use to inform those filling out your form, such as heading, paragraph, warning, and information panel.
- **Advanced**: This includes group, repeating group, map, and list, among others.

1. Click on the page you want to edit. There is always a Page 1 included in the app, but you can easily add a new one.
2. Select a component from the panel on the left and drag it onto the page. On the right, you will see the properties panel for the component.
3. If you are going to use the component to collect data, you must link it to the field it belongs to in the data model.
   - In the properties panel, open __Data model bindings__.
   - Click on the binding for the component (for example Large text field). In the Data model binding field, select the data model field you want to link to the component. You can search the list.
   - Click X to close Data model bindings.
4. Open __Text__ to set properties for texts.
   - Click __Label__ to specify a label for the component. You must add a label to all components that will collect data.
   - __Description__ is optional, it appears below the label and is useful if you need to explain more about what the user should fill in the field.
   - __Help text__ is also optional and appears when users click on a question mark next to the label. We recommend that you use __Description__ rather than __Help text__. That way, you ensure that all information about the field is visible to all users at all times.
   - If you want to change existing texts, click on the text you want to change.
5. In the properties panel, open __Content__. Here you can set other properties for the components, and they can vary
   from component to component. On most components you can decide if you want to
   - adjust the width of the component
   - set it to be read-only

### Useful information
- You must add a Submit button to the form. Use the __Submit__ component.
- You add new pages with the __Add new page__ button that appears below existing pages.
- If you want to change the ID of a page, select the page and click on __Page ID__.
  - Under __Text__ you can change the name to be displayed on the page, in the __Display name for page__ field.
- When you add pages, navigation buttons with the names Next and Previous are automatically added to move forward and backward in the form.
{{%/expandlarge%}}

{{% expandlarge id="configure-access-rules" header="Set up access rules" %}}

{{% notice warning %}}
You do _not_ have to complete this step to get a working service out in the test environment, but you must decide who should have access to the service before you put it into production.
{{% /notice %}}

When you create a new app, it comes with a set of access rules. The access rules control who should have access to
the different parts of the app. The setup that comes with it is a setup that will work for the vast
majority of simple apps. _However, it is still important that you consider what kind of roles an end user must have to be able to
use the service_.

{{% notice info %}}
We are working to simplify this setup. There are many rules to deal with in the app template, so we recommend that you follow
the recipe below for now. We will update this description when we make changes.
{{% /notice %}}

Today's template allows all users with the Altinn roles:
-  **Managing director (DAGL)** - this role you can have for a _business_.
-  **Private individual (PRIV)** - this role everyone has for _themselves_.

This applies to the entire app. In addition, it allows the service owner to start up, retrieve data
from and write data to the service, and confirm that data has been received in their own systems.

If you are just going to test a simple form in the test environment, you do not need to make any changes here. However, we still recommend that you make
a conscious choice here before you potentially put the app into production, and that you possibly remove the role that does not apply to your app.
If the form, for example, is to be used by private individuals, you can remove the "Managing director" role. If it is to be submitted on behalf of a business, you can
remove the "Private individual" role.

If there are other roles that are relevant, you can add them.
[You can see all available roles in Altinn here](https://info.altinn.no/hjelp/profil/alle-altinn-roller/).

The ruleset for access rules comes with two rules:
- The first rule applies to end users, and what access you want to give to end users who have specific roles.
- The second rule applies to service owners, and what access you want to give to them.

In this case, it will most often be the rule for end users that is relevant to change.

For example, here's how you can remove the "Managing director" role:

1. Click on __Settings__ in the menu bar at the top left of the app.
2. Select __Access__ in the __Settings__ window.
3. Find __Rule 1__.
4. Go to the field __Who should have these rights?__ and click on the cross next to __Managing director__. You have now removed the managing director.
   If you need it, you can add other roles from the dropdown list here.
6. Your changes are saved immediately and you can close the __Settings__ window.
{{%/expandlarge%}}

{{% expandlarge id="push-changes" header="Save changes" %}}
When you work on your app, you are working on a _copy_ of it. All changes you make are
saved automatically as you go. They are stored in _your user's file area in Altinn Studio_. For the changes you make to become available to
others, you must share your changes to _the central file area_.

1. At the top right of the app, click "Share your changes".
2. Write a brief description of what you have changed. This makes it easier to go back in logs to see what has been done.
   You can also look at the files that have been changed before you share them. Click __View latest changes__.
3. Click __Share changes__. Your changes are compared with what is in the central file area, and are then shared.

If someone has made changes directly in the files or outside Altinn Studio, you can retrieve these changes to your own file area.
Click __Fetch changes__ next to __Share your changes__.

{{% notice warning %}}
**Note!** If you make changes both in Altinn Studio _and_ directly in the app files, conflicts can occur. This is because the tool does not know which of the changes should apply.

<br/>
You should therefore upload changes from Altinn Studio often. If you know that changes are being made in the files directly, you should always
fetch changes before continuing to work on the service in Altinn Studio. This way you avoid conflicts between local and central versions of the app.
{{% /notice %}}

### Delete local changes
If a conflict occurs, or you have made changes that you do not want to include after all, you can delete your local changes.
The app will then be reset to the version that is in the central file area.

1. Click on the three vertical dots at the far right of the menu bar.
2. Select __Local changes__.
3. If you have made any changes you want to keep, you can either choose to download the entire repo, or just the files that have been changed.
4. Click __Delete local changes__ to delete your local changes.
5. Enter the name of your app and click __Delete my changes__ to delete, or select __Cancel__ to cancel and return to the app.
{{% /expandlarge %}}

{{% expandlarge id="publish-service" header="Publish the app" %}}
{{% notice info %}}
This section only applies if you have created a service for an _organization_.
{{% /notice %}}

You publish the app to the test and production environments from __Publish__ in the top menu. This menu option only appears if you have created an app for an organization.

On the publishing page, you get an overview of all available environments, and can see the status of the app in each individual environment.

When you are going to publish, you must first build a version, then publish it:
1. **Build version**: In this process, all files and settings are collected and linked to the app. It becomes a package with a _version name_.
2. **Publish version**: Here you retrieve the version you want from the packages you have built, and publish it to the environment.

### Build a version
1. In the panel on the right, enter the version name/number you want to have. The version name must start with a number or letter, and can contain:
- numbers
- lowercase letters
- period `.` and hyphen `-`

You can also describe the version.

2. Press __Build version__ to start the build, and wait for it to complete. This may take some time.

<video autoplay loop controls muted src="./build-version.mp4">Your browser does not support video playback.</video>

### Publish a version
When the version is finished building, you can publish it to the environment where you want it.
1. Select the desired version from the dropdown list associated with the environment.
2. Click __Publish new version__ and confirm that you want to publish the service to the environment.

Now the publishing starts. This may take some time. You will see updated status for the publishing as soon as the service is available in the environment.

<video autoplay loop controls muted src="./publish-version.mp4">Your browser does not support video playback.</video>
{{%/expandlarge%}}
