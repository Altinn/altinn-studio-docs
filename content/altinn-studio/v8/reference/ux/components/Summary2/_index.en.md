---
title: Summary2
linktitle: Summary2
description: Allows you to show summary versions of components, pages and layoutsets
schemaname: Summary2 # Component schema name used to autogenerate list of properties from json schema (replace with appropriate component name)
weight: 10 # Do not change, the components will be sorted alphabetically
toc: true
---


## Usage

The Summary2 component lets you display a summary of either a component, page or layoutSet, either in the current or previous tasks.

It is customizable to suit your needs, and is also used for generating PDFs.

### Anatomy

![Summary2](./summary2.png "Example of Summary2 components inside groups")

For examples of how Summary2 looks in different components, [see this example app](https://ttd.apps.tt02.altinn.no/ttd/component-library)

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="450" src="https://embed.figma.com/design/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?node-id=1994-9298&embed-host=share" allowfullscreen></iframe>
This example is taken from <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Note that the example is not identical to the actual code but has been adapted to create prototypes in Figma.

## Configuration

### Component Summary

The most basic way to use the component is to show a summary of a single component.

For example, if you want to show a summary of a simple input field configured like this:

```json{hl_lines="6-"}
{
  "id": "MyInputFieldID",
  "type": "Input",
}
```

your Summary2 configuration would look like this:

```json{hl_lines="6-"}
{
        "id": "MySummary2ID",
        "type": "Summary2",
        "target": {
          "type": "component",
          "id": "MyInputFieldID"
        }
}
```

The resulting Summary2 output would look like this:

![Summary2](./examplesummary.png "Example of Summary2 components inside groups")

### Page Summary

If you would like to show a summary of an entire page, you would set the ```target.type``` property to ```"page"``` like so:

```json{hl_lines="6-"}
{
        "id": "MySummary2ID",
        "type": "Summary2",
        "target": {
          "type": "page",
          "id": "MyLayoutFilename"
        }
}
```

In this case, the ```target.id``` is set to the name of the layout page you want to render, so you would have a file called MyLayoutFilename.json in your project.

### Layoutset Summary

It is also possible to render a summary of an entire layoutSet. In this case, you would set the ```target.type``` property to ```"layoutSet"``` like so:

```json{hl_lines="6-"}
{
        "id": "MySummary2ID",
        "type": "Summary2",
        "target": {
          "type": "layoutSet",
          "id": "MyLayoutSet"
        }
}
```

In this case, you would have a layoutSet called ```MyLayoutSet``` in your project.
This would render a summary of all the pages and components in the layoutSet.

### Rendering summaries of previous tasks

You can also render summaries of components, pages and layoutSets that exist in previous tasks.

To do this, simply specify the ```target.taskId``` like so:

```json{hl_lines="6-"}
{
  "id": "Summary2-previous-page",
  "type": "Summary2",
  "target": {
    "type": "page",
    "taskId": "Task_1",
    "id": "AddressPage"
 }
}
```

The behaviour is exactly like before with regard to ```target.type``` and ```target.id```, except that a ```taskId``` property has been added.

## Overrides

For each component in your summary, you can configure different overrides to suit your needs.

To configure an override, use the override field of the Summary2 component like so:

```json{hl_lines="6-"}
{
        "id": "MySummary2ID",
        "type": "Summary2",
        "target": {
          "type": "component",
          "id": "MyComponentID"
        },
         "overrides": [
           {
             "componentId": "MyComponentID",
             "displayType": "string"
           }
         ]
}
```

Here are the overrides that are common for all components:

| Parameter       | Type    | Required | Description                                                                                                 |
|-----------------|---------|----------|-------------------------------------------------------------------------------------------------------------|
| componentId     | string  | yes      | ID of the compoment you are overriding                                                                      |
| hidden          | boolean | no       | Exclude the component from summary                                                                          |
| forceShowInSummary       | boolean | no       | Will force show the component in a summary even if hideEmptyFields is set to true in the summary component. |
| emptyFieldText  | string  | no       | Custom text to show for empty fields.                                                                        |
| hideEmptyFields | boolean | no       | Exclude empty fields for summary. Only works if the field is not required.                                    |
| isCompact       | boolean | no       | Option to display a more compact version. (Map, Paragraph and Header does not have this)                    |

In addition, a few components support component-specific overrides:

### Checkbox and MultipleSelect

| Parameter       | Type                       | Required | Description                             |
|-----------------|----------------------------|----------|-----------------------------------------|
| displayType     | enum: ```list \| string``` | no       | Display the summary as a list or string |

### RepeatingGroup and Subform

| Parameter       | Type                       | Required | Description                                         |
|-----------------|----------------------------|----------|-----------------------------------------------------|
| display         | enum: ```table \| full```  | no       | Display the summary as a table or as fully expanded |
