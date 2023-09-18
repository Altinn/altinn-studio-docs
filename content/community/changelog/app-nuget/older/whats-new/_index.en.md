---
title: What's new
description: Overview of changes introduced in v1.0.62-alpha -- 2.0.1
toc: true
---

## 2.0.0 (2020-11-18) - Auto delete on process end

For some apps, the fact that there's traces of it in the user archive (and the data is stored) is a problem (e.g. for
security reasons).
The Altinn.App.* packages has been updated to support auto delete when process ends. This is introduced with version
2.0.0-alpha of the packages.

**Updating to this version will require changes in multiple files. See the entry
in [breaking changes](../breaking-changes/#support-for-auto-delete-when-process-ends)**

## 1.3.1 (2020-11-06) New layout structure in Designer
In order to support multiple pages in an app we have done some restructuring of the app-template.
When you are doing changes in Altinn Designer for your app the updated FormLayout.json will be put under the new structure.
For apps that have nuget references to `Altinn.App.Api`, `Altinn.App.Common`, and `Altinn.App.PlatformServices` with versions below version `1.2.0`
this will make the app unable to find the FormLayout.json on the network call against the app.

**Updating to this version will require changes in multiple files. See the entry in [breaking changes](../breaking-changes/#designer-moves-formlayoutjson-from-appui-to-appuilayouts)**

## 1.1.11-alpha (2020-10-02) - Registration of events

The Altinn.App.* packages has been updated to work with the new Events component in Altinn. This is introduced with version 1.1.11-alpha of the packages.

**Updating to this version will require changes in multiple files.
See the entry in [breaking changes](../breaking-changes/#added-registration-of-events-to-the-new-events-component)**

## 1.1.0-alpha (2020-10-01) - Deleting instances from endpoint in app

[#4871](https://github.com/Altinn/altinn-studio/issues/4871) was fixed with in release of 1.1.10-alpha of the app nugets.
**This change only affects users and app owners that try to delete an instance.**

**Updating to this version will require changes in multiple files.
See the entry in [breaking changes](../breaking-changes/#support-for-deleting-instances-from-endpoint-in-app)**

## 1.1.8-alpha (2020-09-23) - Update path of Data Protection Keys for Apps

[#4483](https://github.com/Altinn/altinn-studio/issues/4843) changed the way we use data protection keys in order to improve the support for running locally. These keys are used in [XSRF-protection](https://docs.microsoft.com/en-us/aspnet/core/security/anti-request-forgery?view=aspnetcore-3.1).
When you are running apps locally, we are using the default behaviour (directory under current user) for .Net Core. The path is passed with an environment variable when running in an apps cluster. This change requires the deployment.yaml file to be updated with the correct variable.

**The change affects all application created in Altinn Studio before 30.09.2020 using Altinn.App.PlatformServices 1.1.8-alpha and above**
**Updating to this version will require changes in multiple files.
See the entry in [breaking changes](../breaking-changes/#update-path-of-data-protection-keys-for-apps)**

## 1.1.2-alpha (2020-07-15) - Namespace renamed

A namespace was renamed in `Altinn.App.PlatformServices` Version="1.1.2-alpha causing the build of the application to fail
if references to this namespace isn't changed. This affects all applications created before June 2020 that reference nuget versions >= 1.1.2-alpha.

**Updating to this version will require changes in multiple files.
See the entry in [breaking changes](../breaking-changes/#build-pipeline-failed-on-task-build-and-push-docker-image-to-acr)**

## 1.1.0-alpha (2020-07-01) - Multiple changes

### Property type changed for UserProfile.ProfileSettingPreference

Introduced with issue: [#4466](https://github.com/Altinn/altinn-studio/issues/4466) and release v2020.28.  
**The change affects all applications in TT02 and PR with nuget version 1.0.98 and lower.**

### New endpoint for application text resources 

Introduced with issue: [#4451](https://github.com/Altinn/altinn-studio/issues/4451) and nuget 1.1.0.-alpha.  
**The change affects all application created in Altinn Studio before 8.07.2020 using nuget versions 1.1.0-alpha**


**Updating to this version will require changes in multiple files.
See the entries in breaking changes [here](../breaking-changes/#property-type-changed-for-userprofileprofilesettingpreference)
and [here](../breaking-changes/#new-endpoint-introduced-in-altinnappsapi-exposing-application-text-resources)**

## 1.0.86-alpha (2020-05-29) - Platform authorization for Register and Profile

Introduced with issue: [#4162](https://github.com/altinn/altinn-studio/issues/4162) and Release: v2020.23.  
**The change affects all application created in Altinn Studio before 03.06.2020.**

**Updating to this version will require changes in multiple files.
See the entry in [breaking changes](../breaking-changes/#platform-authorization-introduced-for-platform-register-and-profile)**

## 1.0.82-alpha (2020-05-15) - Updated client-side validation

Introduced with issue: [#3944](https://github.com/Altinn/altinn-studio/issues/3944), and applies to existing apps that upgrade to
the new major version of app frontend (v2).

The client-side validation of the app frontend has been replaced with a JSON-schema validation in order to provide a more complete client-side validation.
As of v2 of app frontend, client-side validation has support for type-checking basic types, including enums.
When upgrading the frontend version to v2, the app _must_ use nuget versions 1.0.82-alpha or newer.

**Updating to this version will require changes in multiple files.
See the entry in [breaking changes](../breaking-changes/#updated-client-side-validation---frontend-v2-and-nuget-v1082-alpha)**

## 1.0.80-alpha Removed GET operations with body

Introduced with issue: [#3738](https://github.com/Altinn/altinn-studio/issues/3738).

The Register API had a few GET operations that took an input parameter through the body of an http request.
Requests against these operations would work in AT environments, but would be broken by API Management in production like environments.
The operations in question has now been removed and replaced with operations that require POST requests.

### Errors
The methods that have been removed were used by an app when an instantiation were done by the Application owner.
More specifically if the instanceOwnerPartyId were unknown.
The instantiation request would then have the Person number or organization number instead, and the Register operation would be used to identify the correct party id. 

```json
POST https://{org}.apps.tt02.altinn.no/{app-id}/instances/

{
  "appId" : "org/app",
  "instanceOwner": {
    "personNumber": "12247918309",
    "organisationNumber": null,
    "instanceOwnerPartyId": null
  },
  ...
}
```

### How to fix
Any issues related to this change can be fixed by upgrading to the latest version of [Altinn.App.PlatformServices](https://www.nuget.org/packages/Altinn.App.PlatformServices/).
This means the App must be updated and a the new version deployed to all environments. Existing instances are not affected.

## 1.0.78-alpha Send-in / Validation fails with 'Ukjent feil'

Introduced with issue: [#3927](https://github.com/Altinn/altinn-studio/issues/3927).

There was a vulnerability in the solution allowing to update a whole instance object
using an endpoint in app backend or storage. This has been solved by refactoring app backend
and removing the endpoints.

Any issues related to validation failing with 'Ukjent feil' for apps with nuget packages older than 1.0.78-alpha
can be solved by upgrading to 1.0.78-alpha or newer.

## 1.0.62-alpha (2020-03-13) Data and task validation
Introduced with issue: [#3820](https://github.com/Altinn/altinn-studio/issues/3820).

The base class that every application inherits has been altered to allow for both data and task validation.

**Updating to this version will require changes in multiple files.
See the entry in [breaking changes](../breaking-changes/#build-fails-after-upgrading-altinnapp-nugets-to-version-1062-alpha)**
