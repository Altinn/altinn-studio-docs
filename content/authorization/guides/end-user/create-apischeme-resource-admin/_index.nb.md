---
title: Creating and publishing API scheme in altinn Studio
linktitle: Creating API Scheme
description: This explaines how you can define a API scheme in Altinn
toc: false
---

In Altinn Studio Resource admin, you can create resources to use as a basis for access control for services outside of the Altinn Platform.

## Prerequisites

You need to have access to resource administration for your organization. See [Getting started guide](/nb/authorization/getting-started/resource-admin-studio/)

## Step 1 Create Resource

Log in to Altinn Studio

Create Resource

The ID given for resource will be the one used in Altinn API for checking access. This need to be globally unique

![Create Resource](create_resource_1.png)

### Resource Type

For api scheme resources, the type will be Api Scheme access resource.

![Create Resource](create_resource_1.png)

### Title

The title will be shown in Access Management and in service catalogues like data.altinn.no

You need to define the title in bokmål, nynorsk and english.

![Create Resource](create_resource_3.png)

### Description

The description will be shown in Access Management and in service catalogues like data.altinn.no

You need to define the description in bokmål, nynorsk and english.

![Create Resource](create_resource_4.png)

### Delegation description

If the resource should be able to be delegated as resource delegation you need to enable the delegation and set delegation description in bokmål, nynorsk and english.

![Create Resource](create_resource_5.png)

### Keywords

Keywords can be set for help. Currently not used but might be used for different service catalogues later

![Create Resource](create_resource_6.png)

### Status

The status of the API that the API scheme is pointing to

![Create Resource](create_resource_7.png)

### Scope

The scope that protects the API and is delegated.

![Create Resource](create_resource_15.png)

### Contact information

Contact information for the service. Might be presented in service cataloge on a later stage.

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

When you have finished setting the resource settings and policy you can publish.
Before publish you need to set a new version ID and commit changes to the resource repository.

![Create Resource](create_resource_14.png)

## Verify

When the API Scheme is published you can delegate it from the Altinn Portal

![Create Resource](create_resource_16.png)
