---
title: Creating and publishing resources in Altinn Studio
linktitle: Creating resources
description: How to create and publish resources in Resource Administration in Altinn Studio
toc: false
---

In Altinn Studio Resource Administration, you can create resources to use as a basis for access control for services outside the Altinn platform.

## Prerequisites

You need to have access to resource administration for your organisation. See the [getting started guide](/en/authorization/getting-started/resourceadministration/).

## Step 1: Create resource

Log in to Altinn Studio and go to Resource Administration for your organisation:
`https://altinn.studio/resourceadm/{orgcode}/{orgcode}-resources`

Click **Create resource**. Give the resource a unique ID — this is used in the Altinn API to check access. Then give the resource a name.

{{% notice info %}}
The first time you visit Resource Administration after creating a repository and team, it may take a few minutes before the page becomes available.
{{% /notice %}}

![Create resource](create_resource_1.png)

### Resource type

For external resources, the type will be generic access resource.

![Resource type](create_resource_15.png)

### Title

The title is shown in access management and in service catalogues such as data.altinn.no.

You must define the title in Norwegian Bokmål, Norwegian Nynorsk and English.

![Title](create_resource_3.png)

### Description

The description is shown in access management and in service catalogues such as data.altinn.no.

You must define the description in Norwegian Bokmål, Norwegian Nynorsk and English.

![Description](create_resource_4.png)

### Delegation description

If the resource should be delegable, enable delegation and provide a delegation description in Norwegian Bokmål, Norwegian Nynorsk and English.

![Delegation description](create_resource_5.png)

### Keywords

Keywords can be used for filtering in service catalogues at a later stage.

![Keywords](create_resource_6.png)

### Status

The status of the service the resource points to.

![Status](create_resource_7.png)

### User types

Defines which types of users can access the resource. Currently used for information purposes only.

![User types](create_resource_8.png)

### Party type

Defines what type of party the service is targeting. May be used for filtering in service catalogues at a later stage.

![Party type](create_resource_9.png)

### Contact information

Contact information for the service. May be shown in service catalogues at a later stage.

![Contact information](create_resource_10.png)

## Create policy

Once the resource is created, you need to define the policy. The policy must contain at least one rule.

Each rule contains a resource, a subject and an action.

### Resource

Define the resource for the rule.

![Resource](create_resource_11.png)

### Action

Define the action for the rule.

![Action](create_resource_12.png)

### Subject

Define the subject for the rule. You can choose from ER roles, Altinn roles and access packages.

Read more about [access packages and roles](/en/authorization/what-do-you-get/accessgroups/).

![Subject](create_resource_13.png)

## Publish

When you have finished configuring the resource and policy, you can publish. You must set a new version ID and commit the changes to the resource repository.

{{% notice info %}}
If you receive an error message saying your local repository is out of sync with the one on the server, choose to fetch the latest version from the server and try again.
{{% /notice %}}

![Publish](create_resource_14.png)

### Permission to publish

To publish resources, you must be a member of the correct team in Gitea. These teams are set up by the administrator in your organisation. Teams for your organisation can be found at
`https://altinn.studio/repos/org/{orgcode}/teams`

The following teams grant access to publish resources:

- **Resources-Publish-PROD**: Permission to publish to production
- **Resources-Publish-TT02**: Permission to publish to TT02

## Verify

Once published, the resource is available in the resource registry.

Example resource from this guide:
[https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/ekstern-tjeneste-portal](https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/ekstern-tjeneste-portal)

Example policy from this guide:
[https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/ekstern-tjeneste-portal/policy](https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/ekstern-tjeneste-portal/policy)
