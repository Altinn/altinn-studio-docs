---
title: Simple Form
description: User guide for creating a simple form in Altinn Studio
weight: 10
---
The points below cover a minimum of what is required to create and publish a form on Altinn Studio.

{{% expandlarge id="create-service" header="Creating the service containing the form" %}}
New services are created from your service dashboard.

1. Click on the "Create new application" button at the top right of the screen.
2. Choose the _owner_ of the service from the dropdown list.
   - If you choose your own user, you will be able to test all functionality in Altinn Studio but will not have access to
     the test environment.
   - If you choose an _organization_ for which you have rights, you will also have the opportunity to publish the service to
     the organization's test environment.
3. Enter the name of the service.
   _The name can only contain lowercase letters, numbers, and hyphens. This name is used to identify the service and cannot be
   changed once set. Display name can be set and changed after the service is created._
4. Click the "Create application" button.

Once the service is created, you will be taken to the service overview page.

<video autoplay loop controls muted src="./create-service.mp4">Your browser does not support video playback.</video>
{{%/expandlarge%}}

{{% expandlarge id="set-service-name" header="Adding a display name for the service" %}}
The service needs a display name that appears as a heading on the form and in the user's inbox in Altinn.

Add a display name by:

1. Clicking on the "Settings" button in the top left menu bar.
2. Modifying the "Application name" field to the desired display name.

The change is saved as soon as you leave the field. Once the display name is changed, you can see that it has also been updated on
the overview page.

<video autoplay loop controls muted src="./set-service-name.mp4">Your browser does not support video playback.</video>
{{%/expandlarge%}}

{{% expandlarge id="create-datamodel" header="Creating a data model for the form" %}}
The data model defines the data expected to be collected and the format it should be in.
> _**One can think of a data model as a table of contents for the form.**_

For a simple form, there is often a 1-1 correspondence from fields in the data model to fields in the form, while for more advanced
forms, the data model and form may be quite different.

A very simple data model with some example fields is included when creating a service. You can edit the field names
to make it clear what they represent and add your own fields.

The data model is used to determine _what_ data should be collected. It is also used to determine _how_ the data should look/be, by
setting constraints that are validated.

1. Navigate to the "Data Model" page by clicking on "Data Model" in the top menu bar.
2. Click on a field to bring up editing options, e.g., to change the name of the field.
3. Click "Add new" and choose type. Relevant types for simple forms include, among others:
   - Text - text content, can be used for most fields.
   - Integer
   - Decimal
4. When you have finished adding fields, click the "Generate models" button.

If you want to group fields, you can add an "Object" and then add fields under that group.

<video autoplay loop controls muted src="./create-datamodel.mp4">Your browser does not support video playback.</video>
{{%/expandlarge%}}

{{% expandlarge id="create-form" header="Dragging form components into the form and configuring them" %}}
Forms are created in Altinn Studio by navigating to the "Build" page. On this page 

Forms are created by dragging desired form components into each individual form page.

### Adding fields to the form
The components that can be used in the form are divided into 3 categories:
- **Standard**: Contains all simple form components such as text fields (long and short), dropdown list (single or multiple answers),
  checkboxes, radio buttons, submission button, and similar.
- **Text**: Contains text components used to inform the user. E.g., heading, paragraph, warning, information panel.
- **Advanced**: Contains more advanced components such as group, repeating group, map, list, and similar.

1. Click on the page you want to edit. When creating a service, a page named "Page1" is automatically included.
2. Select a component from the panel on the left and drag it onto the page. The component is now active in the configuration panel and
   can be configured.
3. If the component in the form is to be used to collect data, it must be linked to the corresponding field in the data model.
   - Open the section in the configuration column called "Data Model Bindings"
   - Click on the available binding (e.g., "short answer") and select the desired field in the data model from the list. The list is searchable.
   - Close the setup by clicking the X icon, or remove the binding by clicking the trash can icon.
4. Add texts for the component by opening the "Text" section in the configuration column.
   - Heading text is required for all components intended to collect data. Click on "Heading text" to add.
   - Description is optional and appears below the heading text. Click on "Description" to add.
   - Help text is optional and appears in a ? icon next to the heading text. Click on "Help text" to add.
   - Click the X icon to close the text editing view.
   - To edit existing texts, click on the relevant text to open the editing view.
5. Open the "Content" section in the configuration column to set up other configurations. Available configurations vary
   from component to component, but common to most are:
   - Whether the width of the component on the screen should be adjusted
   - Whether the component should be read-only

<video autoplay loop controls muted src="./create-form.mp4">Your browser does not support video playback.</video>

### Useful Information
- The button to submit the form must be added manually. Use the component called "Button".
- Add a new page by clicking on the "Add new page" button at the bottom of the page column.
- Edit page names by selecting the page, then click on the ID field to edit.
  - Add a display name for the page by opening the text section and adding "Display name for page".
- Buttons to navigate forward/backward between pages are added automatically when adding a page.
{{%/expandlarge%}}

{{% expandlarge id="configure-access-rules" header="Configuring access rules" %}}

{{% notice info %}}
We are working to simplify this setup, as there are many rules to deal with in the service template. We recommend following
the recipe below for now. Descriptions in this section will be updated continuously as we make changes.
{{% /notice %}}

When creating a new service, it comes with a set of access rules. These control who should have access to
the various parts of the service. The setup that comes with the service is a setup that will work for the vast majority
of simple services. _However, it is still important to consider what roles an end user must have to be able to
use the service_.

The current template allows all users with the Altinn roles:
-  **Managing director (DAGL)** - this is a role one can have for a _business_.
-  **Private individual (PRIV)** - this is a role everyone has for _themselves_.
  
to use the service. This applies to the entire service. In addition, it allows the service owner to start up, retrieve data
from and write data to the service, and confirm that data has been received in their own systems.

To only test a simple form in the test environment, no changes need to be made here. However, we still recommend making
a conscious choice here before the service is eventually put into production, and possibly removing the role that is not applicable to your service.
For example, if the service
is intended for use by private individuals, the "Director" role can be removed. If the service is to be submitted on behalf of a company, the
"Private individual" role can be removed.

If other roles are also relevant, these can also be added. A full overview of available roles in Altinn
[can be found here](https://info.altinn.no/hjelp/profil/alle-altinn-roller/).

The set of access rules comes with 2 rules:
- The first rule covers end users, and what access you want to give to end users with specific roles.
- The second rule covers the service owner, and what access you want to give to the service owner.

It will mostly be the rule covering end users that it will be relevant to change here.

For example, to remove the "Managing director (DAGL)" role:

1. Click on the "Settings" button in the top menu bar on the service workspace page.
2. Choose the "Access rules" tab from the left menu in "Settings".
3. Scroll down to the content of "Rule 1"
   - Find the field "Who should have these rights?"
4. In the field "Who should have these rights?", uncheck "Managing director"(/"Daglig leder") to remove it.
5. Optionally, add other roles from the dropdown list if needed.
6. The change is automatically saved when it is made. The "Settings" window can be closed.

<video autoplay loop controls muted src="./policy-rules.mp4">Your browser does not support video playback.</video>

{{%/expandlarge%}}

{{% expandlarge id="push-changes" header="Saving changes" %}}
When working in the workspace of the service, you are working with a _copy_ of the service for your user. All changes you
make are automatically saved along the way to _your file area in Altinn Studio_, but to make the changes available to others and publish them, you need to upload the changes to _the service's central file area_.

This is done by clicking on "Upload your changes" to the right in the top menu bar.

1. Click on "Upload your changes".
2. Write a brief description of the changes.
3. Click "Validate changes".

The changes are now compared with what is on the central file area of the service, and then uploaded.

<video autoplay loop controls muted src="./save-changes.mp4">Your browser does not support video playback.</video>

If changes have been made directly in the files, or outside of Altinn Studio, these can be brought into _your file area_
by clicking "Fetch changes" to the right in the menu bar. 

{{% notice warning %}}
**Note!** If changes are made both in Altinn Studio and directly in the files of the service, conflicts may occur,
as the tool does not know which of the changes is applicable.

<br/>
It is therefore very wise to upload changes from Altinn Studio frequently, and if changes are made in the files directly,
you should always click "Fetch changes" before continuing to work on the service in Altinn Studio to avoid conflicts.
{{% /notice %}}

### Deleting "local" changes
If a conflict arises, or if changes have been made that you want to discard, you can delete all changes
that have been made in _your file area_. The service will then be reset to how it is on _the service's central file area_.

1. Click on the menu button marked with 3 dots all the way to the right on the menu bar.
2. Choose "Local changes".
3. If you have any changes you want to keep, they can be downloaded here, either by downloading all files
   for the entire service, or by downloading only the files that have been changed.
4. To delete all changes in _your file area_, select "Delete local changes".
5. In the dialog that opens, you must enter the name of the service to confirm the deletion. Enter the name and click
   "Delete my changes" to delete, or "Cancel" to cancel.

<video autoplay loop controls muted src="./reset-local-changes.mp4">Your browser does not support video playback.</video>
{{% /expandlarge %}}

{{% expandlarge id="publish-service" header="Publishing the service" %}}
{{% notice info %}}
This section is only relevant if you have created a service for an _organization_. If you have created a test service for yourself,
you do not have access to any test environment, and the "Publish" button will not appear.
{{% /notice %}}

Publishing the service to the test and production environments is done via the "Publish" page. You can access this by clicking
the "Publish" button at the top right.

On the publishing page, you get an overview of all available environments, as well as the status of the service in each individual environment.

Publishing takes place in 2 steps:
1. **Build version**: Here, all files and settings associated with the service are collected into a package that is given a _version_.
2. **Publish version**: Here, you retrieve the desired _version_ from the packages you have built and publish it to the environment.

### Building a version
In the right column, enter the desired version name/number. Version names must start with a number or letter, and can contain:
- numbers
- lowercase letters
- period `.` and hyphen `-`

You can also provide a description of the version.

Click "Build version" to start the build, and wait for it to complete. This may take some time.

<video autoplay loop controls muted src="./build-version.mp4">Your browser does not support video playback.</video>


### Publishing a version
Once a version is built, it can be published to the desired environment. This is done by selecting the desired version from
the dropdown list associated with that environment. Then click "Publish new version" and confirm that you want to publish
the service to the environment.

The publication is then started, which may take some time. The status will be updated as soon as the service is available in the environment.

<video autoplay loop controls muted src="./publish-version.mp4">Your browser does not support video playback.</video>

{{%/expandlarge%}}
