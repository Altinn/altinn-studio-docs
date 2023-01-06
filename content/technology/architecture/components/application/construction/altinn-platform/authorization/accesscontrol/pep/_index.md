---
title: Policy Enforcement Point
linktitle: PEP
description: There are different types of Policy Enforcement Points in the Altinn 3 platform. 
tags: [architecture, security]
toc: false
---

See below for details of how we have constructed the PEPs and how to configure them.

## Standard PEPs

Developers should configure security when possible, which is one important principle we follow. 
Therefore, we have developed some standard policy enforcement points that API developers can use on different API endpoints.

The best way to solve Attribute-based authorization is by using
[Policy-Based Authorization in ASP.NET Core.](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies)

We have created the standard PEPs in the ASP.Net Web application as 
[Authorization Handlers](https://github.com/dotnet/aspnetcore/blob/main/src/Security/Authorization/Core/src/AuthorizationHandler.cs).

### Policy Enforcement - AppAccess

The AppAccessHandler is the PEP for API endpoints that handle data related to an app created in Altinn Studio. This handler uses configuration
on the API endpoint and API parameters to call the PDP to authorize access. 

See [AppAccessHandler](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/AppAccessHandler.cs) 
and [AppAccessRequirement](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/AppAccessRequirement.cs) for implementation details.


In the App, the API developer defines a set of AppAccessRequirement, and for each operation, the developer maps the correct requirement.

Examples of requirements are:

- **InstanceRead** (User/system needs to be authorized to perform read action on the instance in its current state)
- **InstanceWrite** (User/system needs to be authorized to perform write action on the instance and its data in its current state)
- **InstanceInstantiate** (user/system needs to be authorized to Instantiate an instance for an app)

The PEP will create a decision request ([example](https://github.com/Altinn/altinn-authorization/blob/main/test/IntegrationTests/Data/Xacml/3.0/AltinnApps/AltinnApps0007Request.json)) and call the PDP
 based on route data (like instanceId) and the authenticated Identity.

Based on the response ([example](https://github.com/Altinn/altinn-authorization/blob/main/test/IntegrationTests/Data/Xacml/3.0/AltinnApps/AltinnApps0007Response.json)), the PEP will deny or approve the user. (Deny = http 403)

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

This handler is used in scenarios where we want to require some specific scopes to be able to call an API.

It support multiple scopes.


See [ScopeAccessHandler](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/ScopeAccessHandler.cs) 
and [ScopeAccessRequirement](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/ScopeAccessRequirement.cs) for implementation details.


#### Configuration

The application needs to have a startup configuration to enable the different standard PEPs

```c#
    services.AddAuthorization(options =>
    {
        options.AddPolicy(AuthorizationConstants.POLICY_SCOPE_EVENTS_PUBLISH, policy => policy.Requirements.Add(new ScopeAccessRequirement("altinn:events.publish")));
    });    

    services.AddTransient<IAuthorizationHandler, ScopeAccessHandler>();
```

Example from [program.cs](https://github.com/Altinn/altinn-events/blob/main/src/Events/Program.cs) in Events Component

The API needs to have enabled PEP for a given API operation

```c#
[Authorize(Policy = AuthorizationConstants.POLICY_SCOPE_EVENTS_PUBLISH)]
[Consumes("application/cloudevents+json")]
[HttpPost]
public async Task<ActionResult<string>> Post([FromBody] CloudEvent cloudEvent)

```

Example from [EventsController](https://github.com/Altinn/altinn-events/blob/main/src/Events/Controllers/EventsController.cs) in Event Component

### Policy enforcement ResourceAccess

In Scenarios where we want to authorize API access based on the authorization policy for a given resource in Altinn Resource Registry, we use the ResourceAccessHandler.


See [ResourceAccessHandler](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/ResourceAccessHandler.cs) 
and [ResourceAccessRequirement](https://github.com/Altinn/altinn-authorization/blob/main/src/Altinn.Common.PEP/Altinn.Common.PEP/Authorization/ResourceAccessRequirement.cs) for implementation details.

TODO Exmaple use

### Policy enforcement - ClaimsAccess

For scenarios where we require a specific claim for the authenticated system/user, we use the ClaimsAccessHandler.


#### Configuration

The application needs to have a startup configuration to enable the different standard PEPs

```c#
         services.AddAuthorization(options =>
            {
                options.AddPolicy(AuthzConstants.POLICY_STUDIO_DESIGNER, policy => policy.Requirements.Add(new ClaimAccessRequirement("urn:altinn:app", "studio.designer")));
            });

```



## Custom PEP

For some scenarios, it is impossible to authorize the request based on API parameters.

These scenarios require a custom PEP as part of API logic.

The example below retrieves a list of elements from the database. 

Before the API returns the list, each element must be checked for authorization and only returned if the user calling API is authorized.

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