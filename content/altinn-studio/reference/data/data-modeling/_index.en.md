---
title: Altinn Studio Data Modeling
linktitle: Data Modeling
description: Data model and Altinn Studio Data Modeling tool
weight: 1
toc: true
aliases:
  - /altinn-studio/reference/data/data-models-tool/
  - /altinn-studio/reference/data/data-model/
  - /altinn-studio/reference/data/data-models-tool/app-datamodels
  - /altinn-studio/reference/data/data-models-tool/org-datamodels
  - /altinn-studio/reference/data/data-models-tool/known-issues
---

## Data models

### Data Model Files for Applications

Data models for applications are located in the same folder structure as the rest of the application files. These are stored in the [Altinn Studio repository](https://altinn.studio/repos) under `App/models` in the application's file structure.
An application has 4 model files:

- **C# data model** (`<model>.cs`): Data model used by the application's backend/APIs to process and validate data.
- **JSON Schema** (`<model>.schema.json`): Data model in JSON Schema format used by the application on the client-side (frontend) to validate data in real-time.
  This is also the file that is worked on in the data modeling tool.
- **XSD data model** (`<model>.XSD`): Data model in XML format that defines the elements that can be used in a document.
  This is not directly used by the application but can be uploaded to generate the other model files in Altinn Studio or downloaded as needed.
- **JSON metadata** (`<model>.metadata.json`): Used by Altinn Studio to generate the `<model>.cs` file.
  This file will not be stored in the application and will only be generated if needed.

### Data models for organizations

Data models for organizations are located in Altinn Studio's [repos][1].
To access these, log in with an Altinn Studio user.
If this is your first time using Altinn Studio, you need to [create a user][2].

The data models are located in the `<org>-datamodels` repository, where `<org>` is the organization you belong to.
For example, the data models for the organization 'Test Department (ttd)' are located under
https://altinn.studio/repos/ttd/ttd-datamodels.

You can find the link to this repository in the [Altinn Studio Dashboard](/altinn-studio/getting-started/navigation/dashboard).
Select _Edit_ (blue pencil icon) to access the Altinn Studio [Data Modeling](#altinn-studio-data-modeling) tool.
Select _Gitea_ (green cup icon) to view the files directly in the repository.

![Overview of data model repo](./datamodels-dashboard.png "Overview of data model repo")

#### Access to Data Models

By default, anyone can view an organization's data models.
To gain access to edit the data models, the user needs to be part of the _Data models_ team in the organization.
Refer to the [access management][3] for more information.

#### Uploading XSD to Repository

XSD files can be directly uploaded to the tool [Altinn Studio Data Modeling](#altinn-studio-data-modeling) and are described under [Upload and Display Data Model](#upload-and-display-data-model).

If you only need to upload XSD files for storage and do not intend to use the tool to edit the model, you can upload XSD files directly to the `<org>-datamodels` repo.
To do this, navigate to the desired folder and select "Add file" -> "Upload file." In the text field that appears at the top, you can enter the folder name you wish to use (optional).
Upload the desired file, scroll down, optionally provide a message indicating the file type, and click "commit changes" to confirm.

![Upload XSD directly to `<org>-datamodels` repo](./file-upload.gif "Upload XSD directly to `<org>-datamodels` repo")

[1]: https://altinn.studio/repos
[2]: /altinn-studio/getting-started/create-user/
[3]: /altinn-studio/guides/administration/access-management/studio/

## Altinn Studio Data Modeling

{{% notice info %}}
The Data Modeling tool in Altinn Studio is under development and will have limited functionality until it is completed.
{{% /notice %}}

Altinn Studio Data Modeling is a tool for developing [data models](#data-models).
It is based on a data model in JSON Schema format from which it can generate XSD and C# models (see [Data Model Files for Applications](#data-model-files-for-applications)).

{{% expandlarge id="links" header="Useful links" %}}

- [Known issues and shortcomings for Altinn Studio Datamodellering](https://github.com/orgs/Altinn/projects/1/views/10)
- [Planned new functionality for Altinn Studio Datamodellering](https://github.com/orgs/Altinn/projects/1/views/6)
- [Development of data model for Altinn 2](/altinn-studio/guides/altinn-2/altinn-2-datamodel/)
- [Migrating from Seres to Altinn Studio Datamodellering](/altinn-studio/guides/altinn-2/seres-migration/)
  {{% /expandlarge %}}

### Navigating to Altinn Studio Data Modeling

1. Log in to Altinn Studio. If you are not in the [Altinn Studio Dashboard](/altinn-studio/getting-started/navigation/dashboard/), navigate there by clicking on the logo in the top left corner or [here](https://altinn.studio/dashboard).
2. Select _Edit_ (blue pencil icon) either for:  
   a. An app under "Mine applikasjoner" (My Applications) or  
   b. Data Modeling repository for your organization.
3. Select the **Datamodell** (Data model) tab in the top menu.

## Upload and Display Data Model

The data model defines the data that can be submitted through an app and the allowed format of the data.
Currently, we only support uploading XSD data models.
When uploading an XSD model `<model>.xsd`, the tool will generate the following files: `<model>.cs` and `<model>.schema.json` (see [Data Model Files](#data-model-files-for-applications)).

1. Click _Last opp datamodell_ (_Upload Data Model_) from the data modeling page if there are no existing data models or _Last opp_ (_Upload_) from the
   toolbar at the top of the tool.
2. Select an XSD data model file in the file picker and click _Last opp_.

![Upload Data Model](upload-datamodel.png "Upload Data Model")

After the data model is processed, you can find the generated files under `App/models/` in the app repository.

The types defined in the data model are displayed in the left-side panel.
A tree view of the data model can be opened to see a visual representation of the data model and the available fields.

![View Data Model](view-model.png "View Data Model")

## Selecting a Model from the Dropdown List

There are two categories in the dropdown list:

- _XSD_ - These files are shown when there are XSD models without a corresponding JSON Schema model file. Selecting a model from the XSD list automatically imports it into the tool and generates a JSON Schema file, which you can then work on in the data modeling tool.
- _JSON Schema_ - models generated after the processing of uploaded XSD models.

{{% notice info %}}
Only data models placed in a repository's `App/models` folder will be shown in the dropdown list.
{{% /notice %}}

## Create a New Data Model

To create a new data model from scratch:

1. Click _Lag ny_ (_Create new_) on the left-side of the toolbar.
2. Enter the name of the data model in the field.
3. Click _Opprett modell_ (_Create model_).

![Create new data model](create-new-model.png "Create a new data model")

The data model will be created with some example fields that you can work with or delete:

- `property1` (text, required)
- `property2` (text, required)
- `property3` (text)

![New data model](new-data-model.png "New data model")

## Editing a Data Model

Select the model you wish to edit from the dropdown list on the toolbar.

{{% notice info %}}
The JSON Schema model is automatically saved as you work on it. To generate other model files such as XSD and C# files, you need to
click _Generer modeller_ (_Generate Models_) on the toolbar (see [Generating Model Files](#generating-model-files-xsd-and-c)).
{{% /notice %}}

### Add New Field

To add a field at the top-level (root node), click "Legg til" (**1** in below image).

You can add subfields to fields of the Object type by clicking the adjacent **+** button or by clicking the field and selecting the tab _Felter_ (_Fields_) in the right-side panel.

### Adding a New Type

Click on the **+** sign in the "Typer" panel on the left side (**2** in below image).

### Converting Field to Type

A field can be converted to a type by pressing the reference icon to the right of the field (**3** in below image).

![Add field and type](add-field-type-convert.png "Add field and type and convert field to type")

### Editing a Type

1. Select the type from the panel on the left side. A tree view for the type will appear in the center.
2. Properties for the type can be edited in the right-side panel.
3. Add new fields by clicking the _Legg til_ (add) button at the top.
4. Select individual fields to edit their properties in the right-side panel.
5. Exit the type editing mode by clicking **Tilbake til datamodell** at the top of the model panel.

### Deleting a Type

1. Select the desired type from the panel on the left side.
2. Click the delete button on the top field (root node) of the type.

Note that it is not possible to delete types that are in use.

### Type References

A type reference is a field that follows the structure of a custom type.
For instance, if you have the type `Address` with fields `StreetName`, `PostalCode`, and `Location`, adding a reference to that type will automatically add these fields.
The type is displayed next to the field name in the tree view.

![Type reference](type-references.png "Type references")

### Adding a Type Reference

Drag and drop a type from the left side panel into the tree view (middle section). This will create a new field with the chosen type.

You can also add a type reference as a subfield by dragging the type into an existing field.

{{% notice info %}}
**NOTE**  
To add a reference as a subfield, the parent field must be of type _Object_.
{{% /notice %}}

### Deleting a Field

Click on the delete button to the right of the node/field.

### Editing Properties of a Field

1. Click on the node/field you want to edit to display the properties in the right-side panel.
2. Edit the properties of the node/field as desired. The available properties for the field will vary based on the base type
   of the field.

### Editing/Adding XSD attributes, namespaces, etc., including `dataFormatId` and `dataFormatVersion`.

This is currently not directly supported in the tool and must be done manually. Descriptions
on how to do this can be found in the links below:

- [dataFormatId og dataFormatVersion][1]
- [XSD attributter generelt][2]
- [XSD namespaces][3]

## Generating Model Files (XSD and C#)

Once the model is ready, you can generate model files by clicking on the **Generate Models** button in the toolbar.
Both XSD and C# model files will be generated.
Remember to click **Del dine endringer** (Upload your changes) on the right side of the main menu in Altinn Studio to save your changes.

## Downloading XSD

A generated XSD file can be downloaded by accessing the repository: click on the person icon in the top right corner of the page and select
"Open repository." Navigate to the desired file in `App/models/` and click on the download icon.

![Download XSD repo](./download-xsd.png "Download XSD from repo")

[1]: /altinn-studio/guides/altinn-2/altinn-2-datamodel/#dataformatid-og-dataformatversion
[2]: /altinn-studio/guides/altinn-2/altinn-2-datamodel/#xsd-attributter
[3]: /altinn-studio/guides/altinn-2/altinn-2-datamodel/#xsd-namespaces
