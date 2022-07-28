---
title: What's new
description: Overview of changes introduced in version 4.
toc: true
---

## 4.34.1 (06.04.2022) - Support for specifying shipment type for eFormidling shipment

This release makes it possible to specify the shipment type for an eFormidling shipment. 

Extend the `eFormidling` section i applicationmetadata.json with the new property `dpfShipmentType` as shown below.

```json
  "eFormidling": {
    ...
    "dpfShipmentType": "altinn3.skjema"
  }
```
## 4.33.0 (15.03.2022) - Support for turning off PDF generation

This release makes it possible to turn of PDF generation for a given form

This is defined in ApplicationMetaData for the given DataType. Default is true

Example

```json
{
      "id": "melding",
      "allowedContentTypes": [ "application/xml" ],
      "maxCount": 1,
      "appLogic": {
        "autoCreate": false,
        "ClassRef": "App.IntegrationTestsRef.Data.apps.dibk.nabovarsel.Melding"
      },
      "taskId": "Task_1",
      "enablePdfCreation" : false
    }

```

## 4.32.0 (14.03.2022) - Person lookup service client
The platform application Register has been given a new endpoint that can be used to verify correct national identity number. This version of the app template packages have a new person lookup client that can be used to perform lookups with the new endpoint in Register.



## 4.31.1 (10.03.2022) - Fixed bug related to prefill and enriched instance events with person identification number

- This release fixes a bug where prefilling the same value to more than one field
throws a duplicate key exception. This has been solved by flipping the prefill dictionary. 
- Person identification number has been included to the platformUser data of an instance event.


## 4.30.0 (07.03.2022) - Support for readiness og liveness probes
An endpoint dedicated for health check has been implemented.
This is used by Kubernetes to know when an instance of the application is ready for load. 

All applications created before 16.06.2022 must be manually updated to 
enable the readiness and liveness probes.

1. In  `App/Startup.cs`
   1.  Add the line `using Altinn.App.Core.Health;` amongst the _using_-statements at the top of the file

   2. In the function  `ConfigureServices`, add the line

      ```cs
      services.AddHealthChecks().AddCheck<HealthCheck>("default_health_check");
      ```

   3. In the function `Configure` add the line

      ```cs
      app.UseHealthChecks("/health");
      ```

2. In `deployment/Chart.yaml` the reference to the Altinn Helm Chart should be updated to version `2.1.0`
   
   The final result should resemble this:

   ```yaml
   apiVersion: v1
   description: A Helm chart for Kubernetes
   name: deployment
   version: 1.1.0

   dependencies:
   - name: deployment
      repository: https://charts.altinn.studio/
      version: 2.1.0
   ```

3. In `deployment/values.yaml` under `deployment`, add

   ```yaml
   readiness:
     enabled: true

   liveness:
     enabled: true
   ```

**NOTE** identation is imporant in yaml files. `readiness` og `liveness` must be on the level below `deployment`,
and at the same level av `volumeMounts` og `volumes`.

## 4.27.0 (23.02.2022) - Secure options endpoint
Add support for secure options endpoints
Fixed url and parameter separator logic in GetInstanceEvents
Change redirect url from string to base64 encoded string

## 4.26.0 (2022-02-10) - Improvements to text resource in relation to PDF

Use new `appName` text resource as PDF title.
Use local texts for pdf generation instead of text resources from Platform Storage.

## 4.25.0 (2022-01-24) - Dynamic application settings for front end

Added a new section called `FrontEndSettings` for use in `appsetting.{environment}.json` files. This is made available for front end as `applicationSettings` and is a dynamic list of values. It's possible to add new entries to `FrontEndSettings` without the usual need to make code changes in backend. The feature ensures that backend can provide environment specific values to the front end application.

## 4.24.0 (2020-01-21)

Support language and query parameters in dynamic options.
New way of implementing dynamic options by creating a class that implements IAppOptionsProvider.  [See doc](../../../../../app/development/data/options/)

## 4.23.0 (2022-01-15) - Updated backend support for BPMN gateways

Restructure of process engine and support for BPMN gateways

## 4.22.0 (2022-01-07) - Included access token generation for eFormidling integration point

The integration point used for sending instance data through eFormidling now 
required a valid access token. Apps now fulfill all requirements of the integration point.

## 4.21.0 (2021-12-01) - Added support for saving username for instance owner

If a self indentified user instansiates an instance, their username is saved in the instance owner metadata. 

Added Api in App to expose XACML Policy and BPMN Process

## 4.20.0 (2021-11-18) - Added support for custom redirect URL when exiting an app

The URL to an app can now contain a query parameter (returnUrl) which, if validated (valid URI and host name),
can be used to redirect the user to that URL when the user clicks on the exit icon in an Altinn 3 app. 
[Read more about it here](../../../../../../../app/development/configuration/queryparameters)   

Related to [7183](https://github.com/Altinn/altinn-studio/issues/7183)

## 4.19.0 (2021-11-15) - Added support for instantiation based of a copy of an archived instance

The app template now supports the instantiation of an app based on a copy of an archived instance. 
[The new endpoint is documented here](../../../../../api/apps/instances). Note that support for copying an app in the message box and configuration 
of the application through Altinn Studio is still under development.

Related to [6695](https://github.com/Altinn/altinn-studio/issues/6695)

## 4.18.0 (2021-11-10) - Added support for OIDC configuration

You can now configure a specific OIDC provider in app.

Related to [7173](https://github.com/Altinn/altinn-studio/issues/7173)


## 4.17.2 (2021-10-27) - Added API for instansiation with key-value prefil

It is now possible to instantiate with keyValue prefill through a new instantiation API.

You can also use prefill in custom code. This will require that the app implements the latest version of `App.cs` which includes the following method

```c#
  public override async Task RunDataCreation(Instance instance, object data, Dictionary<string, string> prefill)
        {
           await _instantiationHandler.DataCreation(instance, data, prefill);
        }
```

And the latest `InstansiationHandler.cs` with the method signature

```c#
  public async Task DataCreation(Instance instance, object data, Dictionary<string, string> prefill)
        {
            await Task.CompletedTask;
        }
```


## 4.16.0 (2021-10-07) - Added API for tagging of data elements

It's now possible to save tags on a data element. To support this there are 3 new API endpoints for listing existing tags, adding a tag, and to remove a tag from a data element.

This change is associated with issue [6861](https://github.com/Altinn/altinn-studio/issues/6861) on github.

There is more information about the new API under the app API documentation.

## 4.15.2 (2021-10-04) - New endpoint for retrieving active instances
Altinn Apps now expose a new endpoint for retriveing active instances for a given instance owner. 
The new endpoint can be reached at {org}.apps.altinn.no/{org}/{app}/instances/{instanceOwnerPartyId}/active.

The change is related to issue [6767](https://github.com/Altinn/altinn-studio/issues/6767).

## 4.14.1 (2021-09-22) - 500 error when retrieving non existing instance fixed

There was a bug causing a 500 response when an request is made towards Get/Instances for a
non-existing instance. This has now been fixed and the response returned is 403.
Swagger for the endpoint is updated to reflect possible response codes.

## 4.14.0 (2021-09-13) - Partial support for namespace XML
The code that deserializes XML has been updated to support namespace declaration in the root element.

Example:
```xml
<Skjema xmlns="urn:no:altinn:skjema:v1">
   <Navn>Altinn</Navn>
</Skjema>
```
Deserialization occurs when an external system uses the app API to submit a new form, when they overwrite an existing form, and when an app retrieves a form from blob storage.

The change is not automatically used by all apps that update to this version. For the change to take properly effect the C# class that represents the model must be updated. The class needs to be decorated with an XmlRootAttribute with the Namespace property set to the correct namespace. 

Example:
```cs
[XmlRoot(ElementName = "Skjema", Namespace = "urn:no:altinn:skjema:v1")]
public class Skjema {
    [MaxLength(100)]
    [XmlElement("Navn")]
    public string Navn { get; set; }
}
```
This change must be done manually for all old and new models. The model editor in altinn.studio has not be updated to do this automatically.

## 4.13.0 (2021-09-03) - Event for changed substatus on instance
Changing the substatus of an instance triggers an event `app.instance.substatus.changed` which can be subscribed to in the event component.

This solves issue [#6691](https://github.com/Altinn/altinn-studio/issues/6691)

## 4.12.0 (2021-08-27) - Identity data is included in the request telemetry for all requests
In Application Insights we now register the properties listed below enabling linking of an entity to a specific request received by the application.

- partyId
- authentication level
- userId 
- organisationNumber

This solves issue [#5983](https://github.com/Altinn/altinn-studio/issues/5983)


## 4.11.1 (2021-08-26) - No longer possible to cache response from stateless apps
Caching of the stateless data responses is no longer possible.

This solves issue [#6532](https://github.com/Altinn/altinn-studio/issues/6532)

## 4.11.0 (2021-08-03) - Support for disabling reportee selection in Altinn Portal
Apps now support adding query parameter `DontChooseReportee=true` to disable the reportee selection when an unauthorized user accesses an app. 
The result being that the user will represent themselves and be routed directly to the application after login.

This release solves issue [#6573](https://github.com/Altinn/altinn-studio/issues/6573).

## 4.10.2 (2021-07-15) - Text resources are loaded locally
- The app will now load texts from the locally stored text resource files (config/texts/*) instead of retrieving them from Storage. Texts are still uploaded to Storage during deploy. The change is to remove unnecessary calls to Storage and to avoid an issue with caching that prevented new texts from being used immediately. [#6466](https://github.com/Altinn/altinn-studio/issues/6466), [#6415](https://github.com/Altinn/altinn-studio/issues/6415)
- Fixed a bug where a filename with space in it could lead to a crash. [#6421](https://github.com/Altinn/altinn-studio/issues/6421)
- New apps created after the v2021.29 release will provide security headers like X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, and Referer-Policy. To activate this in existing apps follow these steps:
   - Open the `App/Startup.cs` file.
   - At the top of the file add the namespace reference: `using Altinn.App.Api.Middleware;`
   - Find the `Configure` method and add the statement: `app.UseDefaultSecurityHeaders();` Add it right before existing `app.Use*` statements. E.g. before `app.UseRouting();`


## 4.9.2 (2021-07-08) - Fixed messages from multipart request validation
Validation messages from multipart request validation was misleading. This release solved issue [#6418](https://github.com/Altinn/altinn-studio/issues/6418). 


## 4.9.1 (2021-07-02) - Bugfix for errors in multipart validation
Fixed a bug that caused validation messages to show C# type of DataType rather than DataTypeId.
Issue [#6418](https://github.com/Altinn/altinn-studio/issues/6418)


## 4.9.0 (2021-06-29) - Support for marking a single field validation error as fixed
It is now possible to mark a previous validation error as fixed by using the prefix `*FIXED*` in front of the original error. 
[documentation on how to implement the functionality](../../../../../app/development/logic/validation/#spesifisere-at-valideringsfeil-er-fikset) (in Norwegian )


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

See details about data processing [here](../../../../../app/development/logic/dataprocessing/)

## 4.6.2 (2021-06-01) - Duplicate keys in options causing crash

This release has a fix for a crash related to PDF rendering when an app have [options](../../../../../app/development/data/options/) with duplicate entries. [#5887](https://github.com/Altinn/altinn-studio/issues/5887)

## 4.6.1. (2021-05-21) Changed alternative subject

Altinn Apps now uses org instead of organization as subject when publishing events.

## 4.6.0 (2021-05-11) - Apps now support data fields
Altinn Apps now support data fields.
Data fields allows for adding data values, from either form fields or a custom source, to the instance object.
Form data can be added by configuring data fields in `applicationmetadata.json` while custom sources require coding.
Documentation on how to add data values to an instance can be found [here](../../../../../app/development/configuration/datafields/).


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
Further documentation on how to configure presentation fields is found [here](../../../../../app/development/configuration/messagebox/presentationfields/).

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
