---
title: Policy Decision Point
description: Description of the Authoirzation architecture
tags: ["architecture", "security"]
weight: 100
linktitle: PDP
alwaysopen: false
---
The Policy Decision Point is implemented in the [authorization application](https://github.com/Altinn/altinn-studio/issues/1166) 
that is deployed in the Platform Cluster in Altinn Studio Apps. 

Policy Decision Point exposes a method that authorize request based on the following

- ResourceId (instanceId, dataId or appId)
- SubjectId (systemId, userId)
- ReporteeId (in case of appId)
- Action

If instanceID or dataID is used as Resource ID PDP will use [Context Handler](ContextHandler) to identifiy the correct appId, 
the instance workflow state and the reporteId for the existing resource.

For request for non existing instances the appId will be used and the reportee is a required input

The diagram below show the detailed flow.

{{%excerpt%}}
<object data="/architecture/security/authorization/altinn-studio-apps/PDPFlow.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}

Flow explained

1. Context for the inputed resource is retrieved from database. This inlcude the correct reportee owning the app data instance 
2. Rules for the app is retrieved from PIP in Altinn Studio. 
3. Check if the operation requested by the user is a regular end user request or a service owner user request
4. Check if request is comming from a end user system
5. Check if owner of system is the reportee of app data instance
6. Get roles the system (eg owner of the system) has for the reportee that owns app data instance from Altinn II platform. This need to be cached
7. Validate to see if system is authorized based on the roles. If yes go to 10. If not go to 8.
8. Get delegated rights system (eg owner) has for the reportee for the given app. This is retrieved from Altinn II platform. The delegation is described
as XACML rules
9.  Verify if the delegated righs is enough for accessing. If not system is not authorized. If go to 10.
10. Verify if it is a authenticated user that uses the end user system. If not go to 11. If go to 12.
11. Verify if the action is allowed to be performed with only end user system
credentials.
12. Get the roles the user has for the given reportee
13. Verify if the rules matches the roles user has for reportee. If not go to 14. If it has it is authorized
14. Get the delegated rights from ALtinn II pip for the given app/reportee
15. Verify if the delegated rights matches the request. If so, it is authoirzed, if not denied
16. Get the IP rules for the given org. 
17. Verify if user is accessing service owner archive is accessing from
a allowed IP range
18. Get the reportee adress type
19. Verify if the reportee has secret adress
20. Get the org roles (user have for org that owns the org)(serice owner roles)
21. Verify if user has needed service owner roles

## Technical Considerations

### Caching
The number of calls to external component should be kept at a minimum. 

We need to implement caching of
- Roles user/system has for a reportee
- Policy for a app


### Logging






