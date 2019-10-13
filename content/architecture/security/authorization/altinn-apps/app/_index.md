---
title: App (asp.net web template)
description: Description of the Authorization Architecture for an app created in Altinn Studio following the standard Asp.Net Core web application template created for Altinn Apps
tags: [architecture, security]
weight: 100
linktitle: App (asp.net)
alwaysopen: false
---

The general rule is that a app hosted in Altinn Apps has [attribute based access control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control).
In short, request is authorized based on attributes for the request. E.g. what data element is the user accessing, who owns it, 
what type of data element and so on.

The opposite is [Role Based access control](https://en.wikipedia.org/wiki/Role-based_access_control) where all user in a given role
is allowed to access an operation and access all data. This would not work in the scenarios that Altinn Apps support.

## Authorization Components
The authorization architecture for Altinn Apps are based on the 
[XACML reference architecture](https://en.wikipedia.org/wiki/XACML).

An app created in Altinn Studio and hosted in Altinn Apps follows the same architecture.

This architecture defines the following components.

### Policy Decision Point (PDP)
The Policy Decision Point is responsible for deciding if the requested operation is allowed.
PDP looks at the rules defined for a given resource and based on roles or other claims it decides if
user or system can perform the request. Altinn Apps uses Policy Decision Point in Altinn Platform solution

[Learn about Policy Decision Point in Altinn Platform](/../altinn-platform/pdp)

### Policy Information Point
The Policy Information Point is used by PDP to gather information needed to perform the decision.
Altinn Apps uses Policy Information Point in Altinn Platform to get information about resources and users/systems.

[Learn about Policy Information Point in Altinn Platform](../altinn-platform/pip)

### Policy Administration Point
The policy administration point is where the policy rules are defined. 
The policy for Apps is defined in Altinn Studio

[Learn about Policy Administration Point in Altinn Platform](../altinn-platform/pap)

### Policy Enforcement Point
The Policy Enforcement Point is where the user or system is actual stopped or allowed to perform a requested operation
on a resource. Each App in Altinn Apps need to have a Policy Enforcement Points on all resources that needs to be authorized

[Learn about Policy Enforcement Point in apps based on ASP.NET core template](pep)


### Policy Retrieval Point
The policy retrieval point is where PDP can request the policies for a given
resource. Altinn Apps uses PRP in Altinn Platform
[Learn about Policy Retrieval Point in Altinn Platform](../altinn-platform/prp)


### Context handler
The context handler is responsible for enriching the decision request, so 
it contains all attributes that PDP needs to take a decision.
 Altinn Apps uses Context Handler in Altinn Platform

[Learn about Context Handler in Altinn Platform](../altinn-platform/contexthandler)

## The Overall Authorization flow
The sequence diagram below shows how request is authorized

{{%excerpt%}}
<object data="/architecture/security/authorization/altinn-platform/authorization_flow_app_platform.svg" type="image/svg+xml" style="width: 100%;";></object>
{{% /excerpt%}}

[See fullscreen](/architecture/security/authorization/altinn-platform/authorization_flow_app_platform.svg)
### Example process

The following example flow describes in detail the authorization process when the REACT frontend calls an API to store form data

1. User trigger save in the REACT application. REACT application makes a http post request against the 
[ServiceAPIController](https://github.com/Altinn/altinn-studio/blob/master/src/AltinnCore/Runtime/Controllers/ServiceAPIController.css) in 
2. The configured Policy Enforcement Point for the API, the [Service Access Handler](https://github.com/Altinn/altinn-studio/blob/master/src/AltinnCore/Runtime/Authorization/ServiceAccessHandler.cs),  
triggers to verify that user is authorized
3. The PEP identifies the authenticated user from authorizationhandler context and find the relevant resource ID from request
4. The PEP calls the PDP functionality in [Authorization Component](/solutions/altinn-platform/authorization/) in Altinn Platform
5. PDP calls context handler to enrich the decision request
6. Context handler calls Storage PIP to get resource information
7. Context handler calls authorization PIP to get roles user have for resource party
8. Context handler enriches the decision request and return to PDP
9. PDP calls PRP to get the policy for the resource
10. PDP evaluates the decision request and returns a decision response
11. If the result was Permit, the PEP validates the obligation from PDP to see if authentication level was high enough. 
If it is enough the request is let through
12. If the authentication level is not high enough the PEP will throw a not authorized exception (403)
13. If the result was "Not Applicable" the PEP will throw  a not authorized exception (403)