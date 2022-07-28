---
title: Module 1
description: Create app in Studio, set up local development environment and local test
linktitle: Module 1
tags: [apps, training, datamodel, localtest, texts]
weight: 20
---

In this module you will, based on the demands of the municipality of Sogndal,
be setting up the first page of your application for newcomers and verify that everything looks as expected locally.

**Topics covered in this module:**

- Create new application
- Add data model and connect fields
- Develop app in local developing environment
- Editing of text resources
- Test application in local developement environment (LocalTest)

## Tasks

{{% expandlarge id="create-new-application" header="Create new application" %}}

Create the application in Altinn Studio with the organization that you have access to as an owner.
Alternatively, you can create the application with you as the owner, if you are not testing it in a test environment.

### Requirements from the municipality

- The application must have a sensible name that makes it easy to find it again among the large number
of repositories Sogndal keeps in Altinn Studio.

- There are no preliminary plans for yearly revisions of the app,
so the year does not need to be taken into account.

There is a wish that one or more of the words "newcomer" and "Sogndal" is included in the name.

### Useful documentation
- [Create app in Altinn Studio](/app/getting-started/create-app/)

{{% /expandlarge %}}


{{% expandlarge id="upload-datamodel" header="Upload data model" %}}
The muncipality of Sogndal has created [a data model](datamodel.xsd)
that represents data they wish to collect from future residents.

{{% notice info %}}
As an app developer you will in some cases have to create a data model 
for a service yourself. You will then be able to use the data modelling tool in 
Altinn Studio (launching Spring 2022), or use an existing data model as a starting point and 
edit it in for example Visual Studio or a text editing program of your own choosing.
{{% /notice %}}


1. [Download the xsd-file](datamodel.xsd), open it in a text editing program
   and take a closer look at the contents.
2. [Upload the data model in Altinn Studio](/nb/app/development/data/data-model/#laste-opp--vise-datamodell)
3. Push the changes to master and take a closer look at the files in the folder `App/models`


### Comprehension check

- Which data is it the service owner wishes to collect here?
- Which effect has **\<minOccurs\>** in the data model? You may notice that the field has a different value for _Innflytter.Fornavn_ and _Innflytter.Mellomnavn_
- Which other properties is set on the field _Innflytter.Mellomnavn_?
- A _.C#_, _.metadata.json_ and _.schema.json_ file has been generated in addition to the _.xsd_ file you uploaded. What is the correlation between these files?
- Some restrictions from the data model is not transferred to the _C#_-file, which ones? Some new properties has also been added, which ones?

### Useful documentation
- [Upload data model in Altinn Studio](/app/development/data/data-model/#laste-opp--vise-datamodell)
- [Description of indicators in XSD](https://www.w3schools.com/xml/schema_complex_indicators.asp)

{{% /expandlarge %}}


{{% expandlarge id="edit-texts" header="Edit texts" %}}

To make the service user friendly and available to use for those with visual impairments, it is important that all components have 
descriptive titles and descriptions.

It is possible to connect texts to components in both Altinn Studio and locally.

{{% notice warning %}}
**NOTE**: Display name for the application must be changed in both `App/config/applicationMetadata.json` and in the text resources.
{{% /notice %}}


### Requirements from the municipality

- All inputfields should have descriptive labels that clarifies what should be filled in.
- The application must be available in bokmål, nynorsk and english.
  In a first edition it is sufficient that only one of these languages is available.
- It is important that the display name of the application sounds good and is descriptive of the service.


### Useful documentation
- [Edit application texts](/app/development/ux/texts/#add-and-change-texts-in-an-application)
- [Formatting of texts](/app/development/ux/texts/#formatting-of-texts)
- [ISO 639-1 standard](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

### Comprehension check

In Altinn we support three languages: bokmål, nynorsk and english.
- How do you get english language support in the application?
- If we one day were to support Ukrainian, which language code would you then need to annotate the file with?
- If a text key referred to in FormLayout.json does not exist in the text resources, what will appear on the screen?

{{% /expandlarge %}}

{{% expandlarge id="set-up-components" header="Set up components" %}}

The fields to be filled out on a form page can be created by using the "drag and drop" function in Altinn Studio
or manually in the json-file that describes the appearance of a from page _FormLayout.json_.

Based on the requirements from the municipality, can you now set up the first form page in Altinn Studio?

### Requirments from the municipality

- Name and age of the person who is a newcomer
  - Firstname
  - Middlename (optional)
  - Lastname
  - Age
- Address of the person who is a newcomer
  - Street address
  - Postal code
  - Postal city
- Contact information of the person who is a newcomer
  - Email
  - Phone number

### Useful documentation
- [How to build a form with UI editor in Altinn Studio](/app/getting-started/navigation/designer/ui-editor/)
- [Available components in Altinn Studio](/technology/solutions/altinn-studio/designer/functional/build-app/ui-designer/components/)
- [Guidelines for using components](/app/design/guidelines/components/)

### Comprehension check

In your application repository you will find _FormLayout.json_ in the folder `App/ui/layouts`. The JSON file describes the form page you have created in
Altinn Studio, given that you have pushed your changes to master.

- Can you locate the component connected to the email-field?
- What change is required in this file if the email-field is no longer required?
- By changing one line in _FormLayout.json_ it is possible to change the component attached to the middle name
  to an input field for a long answer. What change is required?
{{% /expandlarge %}}


{{% expandlarge id="download-app-locally" header="Download application locally" %}}

Some application features are not supported for development in Altinn Studio.
These must be developed in a local development environment.

The development itself can be carried out in your preferred development tool,
but if you need a recommendation [Visual Studio Code](https://code.visualstudio.com/Download) is a good option.


### Useful documentation
- [How to clone an application to local development environment](/app/getting-started/local-dev/#how-to-clone-an-application-to-the-local-environment)
- [How to synchronize changes in local development environment](/app/getting-started/local-dev/#how-to-synchronize-changes-in-local-dev-environment)
{{% /expandlarge %}}


{{% expandlarge id="run-in-localtest" header="Run application in LocalTest" %}}

By using a mock that can be spun up locally by Altinn Platform, it is possible to
do simple testing and verification of the application in the local development environment.

In this task you will be able to run the application locally with support from LocalTest.
When the app is running and you have logged in with a test user, you should have a result resembling this:

!["Application running locally"](/app/app-dev-course/modul1/app-running-locally.jpeg "A picture of the application running locally")

{{% notice info %}}
Moving on you will want to test your changes continuously in LocalTest.
- In the event of changes related to formLayout and other _json_-files, a refresh (F5) in the browser is sufficient.
- In the event of changes in prefill, the application must be instantiated again.
- In the event of changes in _cs_-files, the application must be stopped and restarted.
  Alternatively, you may use the `dotnet run watch` when you start the application for hot reload.

{{% /notice %}}


### Useful documentation
- [How to set up LocalTest](https://github.com/Altinn/altinn-studio/blob/master/LOCALAPP.md)
- [Debugging of application](/app/testing/local/debug/)
- [Available test-users in LocalTest](/nb/app/testing/local/testusers/)
{{% /expandlarge %}}


### Summary

In this module you have created an application in Altinn Studio, uploaded a data model
and set up a form page that connects components to some of the fields in the data model.
Furthermore, you have cloned the repository locally to further develop the application in your local development environment.

The service should be able to run on your local computer with LocalTest and you should be able to fill in the fields.

**Remember to _push_ your local changes to make them available in Altinn Studio when you are happy with them.**

### Solution
If you have not completed all the steps, we have an [example of a solution](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/1) that you can use as inspiration.

![Screenshot of data collecting page](/app/app-dev-course/modul1/data-screenshot.png "Screen shot of data collecting page")
