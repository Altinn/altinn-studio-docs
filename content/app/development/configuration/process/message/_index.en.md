---
title: Message
description: How to set up a message in Altinn Studio.
toc: true
---

A message in Altinn 3 is really just a data step, in the same way as for example filling out a form. It is set up through a data model for the message, and a layout 
describing what the message should look like in the GUI. Because of this, message is not its own task type. This enables greater flexibility for Messages in Altinn 3 and allows them to be used as either the only task in a process, or as a part of a larger process.

We have made some tools to simplify the process of getting started with setting up a message in an app.

## Data model
We have made a standard data model for messages, to make getting started easier. This data model can be found [here](https://altinncdn.no/schemas/xsd/message/message.schema.v1.xsd). It can be used as is, as a starting point, or exchanged for your own data model.

## Layout
The layout can be defined by yourself in the same way as a form. We have also created a [message widget](../../../ux/widgets), to make it easier to get started. This widget contains all the necessary components to recreate the example below. It also contains texts which are added to the resource files automatically, and contains [variables](../../../ux/texts#variables-in-texts) with references to `Title` and `Body` in a standard data model. If you should wish for different texts, or to use a different data model, just edit either the components or the texts according to your wishes after they have been added to the page.

{{%notice warning%}}
Note that if one wishes to use the _attachment list_, which is a standard message widget, one must manually add the _data types_ of the attachments to the layout file. A placeholder has been added to this component when it is added to the widget. Functionality to set it in Altinn Studio will be added at a later date. Accessible data types are located in the `applicationMetadata.json` file in the app. If the data types are missing in `applicationMetadata.json` generation of PDFs will not work.
{{% /notice %}}

![Standard message display](message-app.png "Standard message display")
