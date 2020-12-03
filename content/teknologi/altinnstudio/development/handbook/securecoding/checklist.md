---
title: Code Checklist
description: Checklist for security OWASP.
tags: [checklist, OWASP, security]
weight: 100
---

### Backend 

#### 1. Are input validated? 

Url parametes, post parameters and other that are store or presented in application. 


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
[This is related to OWASP Top 10 no 5.](https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control)

### Frontend