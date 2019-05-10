---
title: Breaking changes errors and how to fix them
linktitle: Breaking changes
description: Overview of breaking changes introduced into altinn studio and how and what to update on an existing application for applicatin owners
tags: ["guide"]
weight: 100
---

- [Error The type or namespace name *](#consume-profile-and-register-api-in-runtime-and-make-it-available-for-service-logic-and-prefill)
- [ 'ServiceImplementation' does not implement interface member* ](#consume-profile-and-register-api-in-runtime-and-make-it-available-for-service-logic-and-prefill)
- [Breaking change: Change storage format of formlayout](#breakingchange-form-layout)


<a name="#consume-profile-and-register-api-in-runtime-and-make-it-available-for-service-logic-and-prefill"></a>
## Error -The type or namespace name *
Introduced with issue: [#875](https://github.com/Altinn/altinn-studio/issues/875)

### Errors

When compiling C# files for a given service application the following errors occurs:

- ServiceImplementation.cs - The type or namespace name 'IPlatformServices' could not be found (are you missing a using directive or an assembly reference?)
- ServiceImplementation.cs - The type or namespace name 'IServiceImplementation' could not be found (are you missing a using directive or an assembly reference?)
- ServiceImplementation.cs - The type or namespace name 'RequestContext' could not be found (are you missing a using directive or an assembly reference?)
- ServiceImplementation.cs - The type or namespace name 'ServiceContext' could not be found (are you missing a using directive or an assembly reference?)
- ServiceImplementation.cs - The type or namespace name 'StartServiceModel' could not be found (are you missing a using directive or an assembly reference?)
- ValidationHandler.cs - The type or namespace name 'RequestContext' could not be found (are you missing a using directive or an assembly reference?)

### How to fix

Make the following updates to the application repo (https://altinn.studio/{organizationShortName}/{appName}):

- /AltinnService.csproj (update to latest nuget package):
![update-altinn-service-proj-file](update-altinn-service-proj-file.png)
- Implementation/ServiceImplementation.cs:
![update-service-implementation](update-service-implementation.png)
- Implementation/Validation/ValidationHandler.cs:
![update-validation-handler](update-validation-handler.png)

<a name="#consume-profile-and-register-api-in-runtime-and-make-it-available-for-service-logic-and-prefill"></a>
## Error - 'ServiceImplementation' does not implement interface member *
Introduced with issue: [#142](https://github.com/Altinn/altinn-studio/issues/142) [#875](https://github.com/Altinn/altinn-studio/issues/875)

### Errors

When compiling C# files for a given service application the following errors occurs:

- ServiceImplementation.cs - Error - 'ServiceImplementation' does not implement interface member 'IServiceImplementation.SetContext(RequestContext, ServiceContext, StartServiceModel, ModelStateDictionary)'
- ServiceImplementation.cs - Error - 'ServiceImplementation' does not implement interface member 'IServiceImplementation.SetContext(RequestContext)'

### How to fix

Make the following updates to the application repo (https://altinn.studio/{organizationShortName}/{appName}):

- /AltinnService.csproj (update to latest nuget package):
![update-altinn-service-proj-file](update-altinn-service-proj-file.png)
- Implementation/ServiceImplementation.cs:
![remove-viewbag-from-service-implementation](remove-viewbag-from-service-implementation.png)

<a name="#breakingchange-form-layout"></a>
## Breaking change: Change storage format of formlayout

After we have rewritten the runtime react application, we will also introduce a new format the layout is saved as. This change will be pushed in the transition between May and June 2019.

### How to fix

If you don't want to end up with a empty layout un the UI-editor, send a <a href="mailto:extmgm@brreg.no">mail</a> with the name of the organization and the repo-name.
And an admin will convert your formLayout.json to the new format.