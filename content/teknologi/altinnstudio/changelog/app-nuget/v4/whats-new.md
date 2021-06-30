---
title: What's new
linktitle: What's new
description: Overview of changes introduced in version 4
toc: true
---

## 4.8.0 (2021-06-22) - Application version number available in AppSettings
During app deployment an environment variable with the app version number/name is added to the app runtime environment. This version information can now be retrieved in any controller or service through the AppSettings configuration object. Just add a dependency on `AppSettings` into the class and access the new property called `AppVersion`.

## 4.7.1 (2021-06-15) - Adjustments to response headers
Some of the controllers exposed by the applications have been modified to not allow caching and/or storage of their responces in the client.

## 4.7.0 (2021-06-08)

Altinn Apps now authorize access for statless apps.

Altinn Apps now have two new application events where application developers can add data processing logic. calculation, population, and more.

In this update the RunCalculate application event is made obsolete/deprecated. It's recommended that Apps are updated to use RunProcessDataWrite and RunProcessDataRead instead. Calls to the RunCalculate method will be removed in a future update.

The process to update is

1. Add the DataProcessing folder and DataProcessingHandler class from our [app template](https://github.com/Altinn/altinn-studio/tree/master/src/Altinn.Apps/AppTemplates/AspNet/App/logic) to your app.
2. Update App.cs. Add a class field for DataProcessingHandler and copy new methods ( RunProcessDataRead and RunProcessDataWrite) from [App.cs](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/App/logic/App.cs)
3. Move logic from calculation handler to DataProcessinghandler
4. Remove RunCalculation method from App.cs
5. Remove CalculationHandler when code has been moved to DataProcessingHandler.
6. Compile and test your app. 

See details about data processing [here](https://altinn.github.io/docs/altinn-studio/app-creation/logic/dataprocessing/)

## 4.6.2 (2021-06-01) - Duplicate keys in options causing crash

This release has a fix for a crash related to PDF rendering when an app have [options](https://altinn.github.io/docs/altinn-studio/app-creation/data/options/) with duplicate entries. [#5887](https://github.com/Altinn/altinn-studio/issues/5887)

## 4.6.1. (2021-05-21) Changed alternative subject

Altinn Apps now uses org instead of organization as subject when publishing events.

## 4.6.0 (2021-05-11) - Apps now support data fields
Altinn Apps now support data fields.
Data fields allows for adding data values, from either form fields or a custom source, to the instance object.
Form data can be added by configuring data fields in `applicationmetadata.json` while custom sources require coding.
Documentation on how to add data values to an instance can be found [here](https://altinn.github.io/docs/altinn-studio/app-creation/configuration/datafields/).


## 4.5.2 (2021-05-04) - Endpoints for stateless data elements exposed through app. Bug stopping local testing fixed

Altinn Apps now expose endpoints for creating, prefilling and running calculations on stateless data elements.
A stateless data element entails there is no link to an instance or instance owner, and the data is simply presented to the end user, but not persisted in any database.

In addition, a bug breaking apps running with localtest intoduced in 4.4.1 has been fixed.

Information on the new endpoints can be found in the swagger exposed by each application https://{org}.apps.altinn.no/{org}{app}/swagger

## 4.4.1 (2021-04-30) - Ask user to upgrade security level 

An app would show the "unknown error" message if a user were trying to access an instance with a security level that was too low for the instance. This has been fixed. The user is now sent to authentication with the option to pick an authentication method that provides a higher security level. The fix targets the GET instance endpoint specifically.

## 4.4.0(2021-04-27) - Performance fix
Improved performance.

## 4.3.0 (2021-04-28) - Apps now support presentation fields

Altinn Apps now support presentation fields. 
By specifying presentation fields in `applicationmetadata.json`, speficied data values from the form data
will be stored on the instance in order to show them along with the app title in the Altinn messagebox. 
Further documentation on how to configure presentation fields is found [here](https://altinn.github.io/docs/altinn-studio/app-creation/configuration/presentationfields/).

This change is related to [this epic](https://app.zenhub.com/workspace/o/altinn/altinn-studio/issues/594).

## 4.2.0 (2021-04-19) - Possible to integrate an app with eFormidling

Altinn Apps now support integration with eFormidling. 
Documentation on how to set up an application to use eFormidling will be published
once an integration point for eFormidling is set up in Altinn Platform. 

## 4.1.0 (2021-04-07) - Add new property with updated data to response for PUT to DataController

During PUT of data to DataController (`{org}/{app}/instances/{instanceOwnerPartyId:int}/{instanceGuid:guid}/data`), any calculations that are 
defined by the apps are run, and data is potentially updated before being saved.
Previously, the response returned only the metadata for the updated data element, and a GET to fetch the updated data was necessary.
In this version, a dictionary of all the fields that have updated data from calculations is returned as a new parameter
in the API response (in addition to the data element metadata), so that clients do not need to perform the additional GET request in order
to get the updated data.

This change is related to [this issue](https://github.com/Altinn/altinn-studio/issues/5754).

## 4.0.3 (2021-03-23) - Fixed a bug reading filename from Content-Disposition 

- The specification for Content-Disposition specify that `filename` should be in quotes. This was not supported by the app backend API, causing requests following the specification to fail. This has been fixed.
- Added support for `filename*` (FilenameStar). If Content-Disposition contain both `filename` and `filename*`, the value defined by `filename*` will be used.

## 4.0.1 (2021-03-15) - Upgraded application to .Net 5 and grouped references of Altinn App and Altinn Platform services in Startup.cs

Altinn.App.* librarires target .Net 5 now, which requires that the application does the same.
In addition we have created two methods for referencing all app and platform sevices in Startup.cs 

See [breaking changes](../breaking-changes) for how to update you app to be compatible with this version.
