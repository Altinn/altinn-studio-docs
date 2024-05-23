---
title: Creating and publishing resources in altinn Studio
linktitle: Creating Resources
description: This explaines how 
toc: false
weight: 5
aliases:
---


In Altinn Studio Resource admin, you can create resources to use as a basis for access control for services outside of the Altinn Platform. 

## Prerequisites

- The org needs to have enabled the resource admin. Requires a repository under org with name {org}-resources. Example brg-resources
- The developer needs to be a team member with access to this repository. 
- The developer needs to be a member of a published resource group for the given environment.



## Step 1 Create Resource

Log in to Altinn Studio

Create Resource

The ID given for resource will be the one used in Altinn API for checking access 


![Create Resource](create_resource_1.png)


### Resource Type

For external resources the type will be 

### Title

The title will be shown in Access Management and in service catalogues like data.altinn.no

You need to define the title in bokmål, nynorsk and english.

![Create Resource](create_resource_3.png)

### Description

The description 

![Create Resource](create_resource_4.png)


### Delegation description

If the resource should be able to be delegated as resource delegation you need to enable the delegation.

![Create Resource](create_resource_5.png)

### Keywords

![Create Resource](create_resource_6.png)

### Status

![Create Resource](create_resource_7.png)


### User types

![Create Resource](create_resource_8.png)


### Status

![Create Resource](create_resource_9.png)

### Contact information
![Create Resource](create_resource_10.png)

## Create Policy

When resource is created you need to define the policy.
The policy needs to contain a minimum of 1 rule. 

Each rule contains of resource, subject and action

### Resource

Define the resource for the rule
![Create Resource](create_resource_11.png)


### Action

Define the action for the rule

![Create Resource](create_resource_12.png)

### Subject

Define the subject for the role. You can choose amongst ER roles, Altinn Roles, and Access Packages(todo)

![Create Resource](create_resource_13.png)

## Publish

When you have finished setting the resource settings  and policy you can publish.
Before publish you need to set a new version ID and commit changes to the resource repository. 

![Create Resource](create_resource_14.png)

