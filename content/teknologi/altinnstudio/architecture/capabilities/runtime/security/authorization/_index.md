---
title: Authorization
description: The authorization model in Altinn Apps / Altinn Platform is flexible and supports different needs. 
tags: [architecture, security]
weight: 100
linktitle: Authorization
alwaysopen: false
---


## Rights
In Altinn Apps/Platform a right is a permission to perform an action on a given resource. 
The action can be one of some predefined option like read, write and sign but can also be any other action defined on a 
custom api in the apps.
The resource is typical an app instance or part of it where data belongs to a given party (person or organisation).

A user or system gets a right based on rules that describes permissions based on being a specific user or having a specific role.

## Rules
A authorization rule in Altinn Platform defines who has been given the right to perform actions on a given resource.
A rule consist of 5 elements

### Resource
This describe which resource the rule applies for. Altinn Apps currently support the following resource types in rules.

- Org - Unique identifier of the organisation responsible for the app.
- App - Application identifier which is unique within an organisation.
- Task - A specific task in the process defined for a app

Some of the resourcetypes is meant to be used in combination. As an exemple you can have been given the right for an app for a given reportee

### Subject
The subject in a authorization rule identifies who the rules applies for. In Altinn Apps/Platform the resource can be the following.

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

- Valid To

### Obligation
A obligation is a obligation that needs to be followed it the user is permited or denied.
In Altinn Apps/Platform this is used to define the minimun authentication level.

## Creation of rules
The rules in Altinn Studio Apps is defined when the app developer defines the rules for the app. 
The rules are deployed together with the App to a given Altinn Studio App environment.

In Altinn II end user can also create rules. This happens when:
- When user creates a local role that contains rights that user have through other roles
- When delegating single rights to a user or organisation.

The rules is slightly different since rules defined by the end user have different subjects and can be defined for a 
more limited resource.

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

