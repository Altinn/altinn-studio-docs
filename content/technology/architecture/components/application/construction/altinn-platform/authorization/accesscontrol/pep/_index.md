---
title: Policy Enforcement Point
linktitle: PEP
description: There are different types of Policy Enforcement Points in the Altinn 3 platform. 
tags: [architecture, security]
toc: false
---

See below for details of how we have constructed the PEPs and how to configure them.

## Standard PEPs

Developers should configure security when possible, is one important principle we follow. 
Therefore, we have developed some standard policy enforcement points that API developers can use on different API endpoints.

The best way to solve Attribute-based authorization is by using
[Policy-Based Authorization in ASP.NET Core.](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies)

We have created the standard PEPs in the ASP.Net Web application as 
[Authorization Handlers](https://github.com/dotnet/aspnetcore/blob/main/src/Security/Authorization/Core/src/AuthorizationHandler.cs).

### Policy Enforcement - AppAccess

The AppAccessHandler is the PEP for API endpoints that handle data related to an app created in Altinn Studio. This handler uses configuration
on API endpoint and API parameters to call the PDP to authorize access. 

See [AppAccessHandler](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/AppAccessHandler.cs) 
and [AppAccessRequirement](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/AppAccessRequirement.cs) for implementation details.


In the App there is defined a set of
[AuthorizationRequirements](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.authorization.iauthorizationrequirement?) 
and for each operation of the different API endpoints needs to be configured with the correct requirement.

Example on requirements are:

- **InstanceRead** (User/system needs to be authorized to perform read action on the instance in current state)
- **InstanceWrite** (User/system needs to be authorized to perform write action on the instance and its data in current state)
- **InstanceInstantiate** (user/system needs to be authorized to Instantiate an instance for an app)

The PEP will based on route data (like instanceId) and the authenticated Identity create a
[decision request](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/IntegrationTests/Data/Xacml/3.0/AltinnApps/AltinnApps0007Request.json) and call PDP.
Based on the [response](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/IntegrationTests/Data/Xacml/3.0/AltinnApps/AltinnApps0007Response.json) the PEP will deny or approve the user. (Deny = http 403)

The PEP validates any obligation from the PDP like minimum authentication level. If this is not valid, the request will be denied (HTTP 403).

#### Configuration

The application needs to have a startup configuration to enable the different standard PEPs

```c#
services.AddAuthorization(options =>
{
    options.AddPolicy(AuthzConstants.POLICY_INSTANCE_READ, policy => policy.Requirements.Add(new AppAccessRequirement("read")));
    options.AddPolicy(AuthzConstants.POLICY_INSTANCE_WRITE, policy => policy.Requirements.Add(new AppAccessRequirement("write")));
    options.AddPolicy(AuthzConstants.POLICY_INSTANCE_DELETE, policy => policy.Requirements.Add(new AppAccessRequirement("delete")));
    options.AddPolicy(AuthzConstants.POLICY_INSTANCE_COMPLETE, policy => policy.Requirements.Add(new AppAccessRequirement("complete")));
});

```

Example from [Storage Program.cs](https://github.com/Altinn/altinn-storage/blob/main/src/Storage/Program.cs)

The API needs to have enabled PEP for a given API operation

```c#
[Authorize(Policy = AuthzConstants.POLICY_INSTANCE_WRITE)]
[HttpDelete("data/{dataGuid:guid}")]
public async Task<ActionResult<DataElement>> Delete(int instanceOwnerPartyId, Guid instanceGuid, Guid dataGuid)

```

Example from [DataController](https://github.com/Altinn/altinn-storage/blob/main/src/Storage/Controllers/DataController.cs)


### Policy Enforcment ScopeAccessHandler

See [ScopeAccessHandler](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/ScopeAccessHandler.cs) for PEP validating scope requirements


#### Configuration

The application needs to have a startup configuration to enable the different standard PEPs

```c#
services.AddAuthorization(options =>
{
    options.AddPolicy(AuthzConstants.POLICY_SCOPE_APPDEPLOY, policy => policy.Requirements.Add(new ScopeAccessRequirement("altinn:appdeploy")));
    options.AddPolicy(AuthzConstants.POLICY_SCOPE_INSTANCE_READ, policy => policy.Requirements.Add(new ScopeAccessRequirement("altinn:instances.read")));
});

```

### ResourceAccessHandler


### Polic enforcment - ClaimAccess




#### Configuration

The application needs to have a startup configuration to enable the different standard PEPs

```c#
         services.AddAuthorization(options =>
            {
                options.AddPolicy(AuthzConstants.POLICY_STUDIO_DESIGNER, policy => policy.Requirements.Add(new ClaimAccessRequirement("urn:altinn:app", "studio.designer")));
            });

```



## Custom PEP

For some scenarious it is not possible to authorize the request based on API parameters. 

This cases requires a custom PEP that is implemented as part of API logic.

In the example below a list of elements is retreived from database and we need to filter elements before they are returned based on what user is authorized for.

```c#
       [Authorize]
        [HttpGet("{instanceOwnerPartyId:int}/{instanceGuid:guid}")]
        public async Task<ActionResult> GetMessageBoxInstance(
            int instanceOwnerPartyId,
            Guid instanceGuid,
            [FromQuery] string language)
        {
            string[] acceptedLanguages = { "en", "nb", "nn" };
            string languageId = "nb";

            if (language != null && acceptedLanguages.Contains(language.ToLower()))
            {
                languageId = language;
            }

            string instanceId = $"{instanceOwnerPartyId}/{instanceGuid}";

            Instance instance = await _instanceRepository.GetOne(instanceId, instanceOwnerPartyId);

            if (instance == null)
            {
                return NotFound($"Could not find instance {instanceId}");
            }

            List<MessageBoxInstance> authorizedInstanceList =
                await _authorizationHelper.AuthorizeMesseageBoxInstances(
                    HttpContext.User, new List<Instance> { instance });
            if (authorizedInstanceList.Count <= 0)
            {
                return Forbid();
            }

            MessageBoxInstance authorizedInstance = authorizedInstanceList.First();

            // get app texts and exchange all text keys.
            List<TextResource> texts = await _textRepository.Get(new List<string> { instance.AppId }, languageId);
            InstanceHelper.ReplaceTextKeys(new List<MessageBoxInstance> { authorizedInstance }, texts, languageId);

            return Ok(authorizedInstance);
        }
```

Example from [MessageboxInstancesController](https://github.com/Altinn/altinn-storage/blob/main/src/Storage/Controllers/MessageboxInstancesController.cs)