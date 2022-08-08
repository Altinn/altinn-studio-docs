---
title: Altinn Platform - Authorization
linktitle: Authorization
description: The authorization component provides functionality to authorize access to applications and components in Altinn Apps and Altinn Platform.
tags: [architecture, solution]
toc: false
weight: 102
---

The authorization components are based on [attribute based access control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control).

In short, a request is authorized based on attributes for the request. Eg what data element is the user accessing, who owns it,
what type of data element, and so on.

The authorization architecture for the Altinn Platform is based on the [XACML reference architecture](https://en.wikipedia.org/wiki/XACML).

The following diagram describes the different solution components that provide Authorization capabilities.

![Authorization Solution components](authorization_solution_components.svg "Authorization solution components")

This architecture defines the following components.

## PDP - Policy Decision Point

Responsible to decide if a request is authorized or not. [Read more](pdp)

## PAP - Policy Administration Point

Responsible for defining and administration authorization policies. [Read more](pap)

## PRP - Policy Retrieval Point

Responsible for identifying the correct policy for a request. [Read more](prp)

## Context Handler

Responsible for enriching the decision request so it can correctly be evaluated. [Read more](contexthandler)

## PIP - Policy information point

Responsible for providing information about the subject and the resource to the context handler. [Read more](pip)

## PEP - Policy Enforcement Point

Responsible for enforcing the decision from PDP. This is the component that blocks a request or let it through.

For details about how the components are constructed go [here](../../../construction/altinn-platform/authorization/).

## The Overall Authorization flow

The sequence diagram below shows how a request is authorized

![Authorization flow](authorization_flow_app_platform.svg "Authorization flow")

## Example process

The following example flow describes in detail the authorization process when the REACT frontend calls an API to store form data

1. User trigger save in the REACT application. REACT application makes an HTTP post request against the 
[ServiceAPIController](https://github.com/Altinn/altinn-studio/blob/master/src/AltinnCore/Runtime/Controllers/ServiceAPIController.css) in 
2. The configured Policy Enforcement Point for the API, the [Service Access Handler](https://github.com/Altinn/altinn-studio/blob/master/src/AltinnCore/Runtime/Authorization/ServiceAccessHandler.cs),  
triggers to verify that user is authorized
3. The PEP identifies the authenticated user from authorizationhandler context and find the relevant resource ID from request
4. The PEP calls the PDP functionality in [Authorization Component](../) in Altinn Platform
5. PDP calls context handler to enrich the decision request
6. Context handler calls Storage PIP to get resource information
7. Context handler calls authorization PIP to get roles user have for resource party
8. Context handler enriches the decision request and returns to PDP
9. PDP calls PRP to get the policy for the resource
10. PDP evaluates the decision request and returns a decision response
11. If the result was Permit, the PEP validates the obligation from PDP to see if the authentication level was high enough.
If it is enough the request is let through
12. If the authentication level is not high enough the PEP will throw a not authorized exception (403)
13. If the result was "Not Applicable" the PEP will throw  a not authorized exception (403)

## Authorization API

The Authorization component exposes a REST-API to Altinn Apps.
Use the authorization API to manage authorizations in altinn platform.

### Parties

A party is a person whom  you can represent and perform a request on his behalf. A logged in user can retrieve a list of parties that he/she can represent.

#### Operations

Get a list of parties that the user can represent. The userid is sent as parameter.

```http
GET /authorization/api/v1/parties?userid={userid}
```

Validate that a given user is allowed to represent a given party. The partyid and userid are sent as parameters.

```http
GET /authorization/api/v1/parties/{partyId}/validate?userid={userid}
```

### Roles

A role in altinn offers or denies right to the logged in user to perform an action or group of actions for him or on behalf of someone.

#### Operations

Get a list of roles that the user can perform for the selected party.

```http
GET /authorization/api/v1/roles
```

### Policies

A set of polices contains authorization rules.

#### Operations

Stores / updates rules for a given app, defined in the query string.
The rules are sent in the body of the request. Reade more about the [policy format](prp).

```http
POST /authorization/api/v1/policies?org=org&app=app
```

## Altinn Authorization - Future

In the coming years, Authorization will be modernized from being a part of Altinn 2 monolith to a cloud-native architecture.

The diagram below shows the different solution components.

![Future solution Altinn Authorization](authorization_solution_components_future.drawio.svg "Future solution Altinn Authorization")


### Altinn Access Management

This component will be the component responsible for the administration of access to self and organization

- Giving the end-users an overview of which rights he and other has	
- Administration of AccessGroups
- Possibility to delegate and revoke rights

### Altinn Resource Registry

This component will provide a register of

- Altinn 3 Apps
- Altinn 2 apps
- External services that are hosted in other platforms but registered in Altinn for authorization purposes.
  
[A POC is planned](https://github.com/Altinn/altinn-authorization/issues/26)

### Altinn Access Groups

Altinn Access Groups component contains the Altinn defined Access Groups and information which is member of this groups.

Exposes API to list and delegate Access Groups.

[A POC is planned](https://github.com/Altinn/altinn-authorization/issues/28)

### Altinn Access Policies

Store for the different policies. Able to identify the correct policy based on Authorization Request.

Have functionality to create delegated policies


[A POC is planned](https://github.com/Altinn/altinn-authorization/issues/27)

### Altinn Access Information

Altinn Access Information exposes API for Reportee, access groups, and rights for external consumers. Therefore, it needs to be highly scalable. 

### Altinn Consent

Provides functionality to request consent and give consents

### Altinn Policy Decision Point

This is the core PDP responsible to evaluate if the user should get access to a given resource. 

Depends on Altinn Access Groups for groups information and Altinn Access Policies for policy information. 

