---
title: Authorization model
description: The authorization model 
tags: [architecture, security]
weight: 100
linktitle: Authorization model
alwaysopen: false
---
The authorization model in Altinn Studio Apps is flexible and supports different needs. 

## Rights
In Altinn Studio Apps a right is a permission to perform a action on a given resource. 
The action can be one of some predfined option like Read, Write, Sign, ArchiveRead, ArchiveDelete and ServiceOwnerArchiveRead.
The resource is typical a service instance or part of it hver data belongs to a given reportee (person or organization).

A user or system gets a right based on rules that describes permissions based on being a specific user or having a specific role.

## Rules
A authorization rule in Altinn Studio defines who has been given the right to perform actions on a given resource.
A rule in Altinn Studio consist of 4 elements

### Resource
This desribe which resource the rule applies for. Altinn Studio Apps currently support the following resource types in rules.

- Org - The service owner of the app
- App - The app id
- Task - A specific task in the process defined for a app
- Reportee - A owner of 
- InstanceId

Some of the resourcetypes is meant to be used in combination. As an exemple you can have been given the right for a service for a given reportee

### Subject
The subject in a authorization rule identifies who the rules applies for. In Altinn Studio the resource can be the following.

- User
- Party
- RoleType
- org

### Action
The Action part of the rule define what type of action that the subject can perform on the resource.
In Altinn Studio we have the following actions

- Read
- Write
- Sign
- ArchiveRead
- ArchiveDelete

### Condition
The condition part of the rule is extra conditions needed to be fulfilled for the rule to be valid. In Altinn Studio
we have the following types of conditions.

- Authentication level
- Valid To

## Creation of rules
The rules in Altinn Studio Apps is defined when the service developer defines the rules for the service. 
The rules are deployed together with the Service App to a given Altinn Studio App environment.

In Altinn II end user can also create rules. This happens when:
- When user creates a local role that contains rights that user have through other roles
- When delegating single rights to a user or organization.

The rules is slightly different since rules defined by the end user have different subjects and can be defined for a more limited resource.

#### Altinn Studio rule

{{%excerpt%}}
<object data="/architecture/security/authorization/altinn-platform/authorization_rule_defined_in_altinnstudio.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}

#### User defined rule 

{{%excerpt%}}
<object data="/architecture/security/authorization/altinn-platform/authorization_rule_defined_by_user.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}


## Roles
Altinn Studio Apps will retrieve roles from Altinn II Administration. This will later could be expanded to other sources for roles. 

















