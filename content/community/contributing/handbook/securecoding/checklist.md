---
title: Code Checklist
description: Checklist for security OWASP.
tags: [checklist, OWASP, security]
weight: 100
---

Below you find checklists used during coding. Important input have been [OWASP Top 10](https://owasp.org/www-project-top-ten/) and [CWE Top 25](http://cwe.mitre.org/top25/)

### Backend checklist

#### 1. Are input validated? 

Url parametes, post parameters and other that are store or presented in application.

Examples from the Altinn 3 is [validaton of file names.](https://github.com/Altinn/altinn-studio/blob/master/backend/src/Designer/Helpers/Extensions/StringExtensions.cs) used
 [here.](https://github.com/Altinn/altinn-studio/blob/master/backend/src/Designer/Configuration/ServiceRepositorySettings.cs#L341)


[This is related to OWASP Top 10 no 1.](https://owasp.org/www-project-top-ten/2017/A1_2017-Injection)

#### 2. Does API requires authenticted user? 

All API's need to require authenticated user or system. For .Net core application this means that it need to have the [Authorize] tag

[Example from InstancesController in Storage](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage/Controllers/InstancesController.cs#L284)

```c#
[Authorize]
[HttpPost]
[Consumes("application/json")]
[ProducesResponseType(StatusCodes.Status201Created)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
[Produces("application/json")]
public async Task<ActionResult<Instance>> Post(string appId, [FromBody] Instance instance)
```


#### 3. Does API validate correct authorization policy?

For each API the developer needs to identify the correct authorization policy required to be validated.

This could be that read or write access need to be authorized.

[Example from InstancesController in Storage](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage/Controllers/InstancesController.cs#L356)


```c#
[Authorize(Policy = AuthzConstants.POLICY_INSTANCE_DELETE)]
[HttpDelete("{instanceOwnerPartyId:int}/{instanceGuid:guid}")]
[ProducesResponseType(StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status204NoContent)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
[Produces("application/json")]
public async Task<ActionResult<Instance>> Delete(int instanceOwnerPartyId, Guid instanceGuid, [FromQuery] bool hard)
```
This is related to [OWASP Top 10 no 5.](https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control) and [CWE-862](http://cwe.mitre.org/data/definitions/862.html)

#### 4. Dont run application with to high priveliges. 

Are the docker containers running with the correct priveliges? 

```txt
securityContext:
    runAsUser: 1000
    runAsGroup: 3000
    allowPrivilegeEscalation: false
```

Example from [Dockerfile](https://github.com/Altinn/altinn-studio/blob/master/src/studio/AppTemplates/AspNet/Dockerfile) 

```txt
RUN addgroup -g 3000 dotnet && adduser -u 1000 -G dotnet -D -s /bin/false dotnet
USER dotnet
RUN mkdir /tmp/logtelemetry
```

#### 5. Protect against Cross-site requeste forgery

It is important that every endpoint that is exposed to users validates antiforgery tokens to make
sure we protect against Cross-site request forgery. 

As part of the platform their has been created a [custom authorization filter](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/Altinn.App.Api/Filters/ValidateAntiforgeryTokenIfAuthCookieAuthorizationFilter.cs) to protect against CSRF for endpoints beeing access by using cookie
or token.  This is enabled with using [AutoValidateAntiforgeryTokenIfAuthCookie] on methods or controllers.

[Example from datacontroller](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/Altinn.App.Api/Controllers/DataController.cs#L28)

```c#
[AutoValidateAntiforgeryTokenIfAuthCookie]
[Route("{org}/{app}/instances/{instanceOwnerPartyId:int}/{instanceGuid:guid}/data")]
public class DataController : ControllerBase
```

### Frontend