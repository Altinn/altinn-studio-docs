---
title: Module 3
description: Build and deploy application to test environment
linktitle: Module 3
tags: [apps, training, build, deploy, test ]
weight: 20
---
{{% notice warning %}}
 This module requires that you are part of an [organization](/altinn-studio/getting-started/create-user/#join-an-organization) with an enabled test environment for Altinn Apps. If this is not the case, move on to the [next module](../modul4/). 
 <br><br>
 If you have a personal application registered that you would like to move to an organization, 
 [you can ask for access to an organization by asking an administrator or the service desk](/altinn-studio/getting-started/create-user/#join-an-organization).

 When you have access to an organization with enabled test environments, the application can be moved by following these steps:
 1. Move the repository for the application in Gitea to your organization via the "Settings" menu on the Gitea-page.
 2. Update the `id` and `org`-fields in the `App/config/applicationmetadata.json`-file, so that they refer to the new organization 
{{% /notice %}}


In this module you are going to build and deploy the application to Altinn's test environment (TT02) and verify that everything works as expected.

**Topics covered in this module:**
- Set custom requirements for resource use
- Building application
- Deploying application


## Tasks
{{% expandlarge id="change-resources" header="Set custom requirements for resource use" %}}

All applications come with a standard setup for resource use and scaling in the application cluster.
This setup can be overridden if your application has different needs.
- You can change the number of replicas (instances of the application running at once)
- You can change the rules for how early or late the application should scale the number of instances based on CPU or memory usage
- You can change how much resources are to be dedicated to the application's instances in the cluster.

By overriding these values, smaller applications may save costs,
and for bigger applications make sure they have optimal performance with all necessary resources available.

For this test application, we want you to scale down resource usage to a minimum.

Scaling: `replicaCount: 1`

Resource use: Set _requests_ to `cpu: 50m` and `memory: 128Mi`

{{% notice info %}}
All changes related to scaling and resource use are made in the `deployment/values.yaml` file
{{% /notice %}}


### Useful documentation
- [Set custom rules for scaling](/altinn-studio/reference/configuration/deployment/#scaling)
- [Set custom limits for resource use](/altinn-studio/reference/configuration/deployment/#resources-configuration)
{{% /expandlarge %}}

{{% expandlarge id="build-application" header="Build application" %}}

When you refer to building an application in Altinn Studio,
this means creating a version of the current state of the application
that can be deployed to one or more environments.

Create a new build for the application with version number `0.0.1`
and add a descriptive comment of what the version includes.

### Useful documentation
- [Build app in Altinn Studio](/altinn-studio/reference/testing/deploy/#bygge-app)

{{% /expandlarge %}}

{{% expandlarge id="deploy-application" header="Deploy application" %}}

Deploying an application to the test environment allows you to test all integrations.
In addition to this, TT02 is often used to verify that an application works as expected before deploying to production.

{{% notice info %}}
To be able to deploy an application to TT02,
the organization that owns the application has to have an app cluster in the test environment.
In addition to this, the developer deploying the application needs the [role Deploy-TT02](/altinn-studio/guides/access-management/studio/#deploy-tt02)
for the organization in Altinn Studio.
{{% /notice %}}

**Deploy your application to TT02.**

### Useful documentation
- [Deploy app to test environment](/altinn-studio/reference/testing/deploy/#deploy-av-app-til-testmiljø)
- [Access control for the organization in Altinn Studio](/altinn-studio/guides/access-management/studio/#access-management-for-the-organization)

### Knowledge check
- Is it possible to have two versions of one application in TT02 at the same time?
- What happens if you try to deploy your application using an existing version number?
- Will the application be available immediately after deployment?
- Is it possible to remove an application from the environment after deployment?
{{% /expandlarge %}}

{{% expandlarge id="instantiate-in-tt02" header="Test the application in TT02" %}}

At the deployment page you will find the direct link to your application.
It is in the format _{org}.apps.tt02.altinn.no/{org}/{app}_


Unless you're already logged in with a user this link will bring you to Altinn's login page.
Your organization should have access to a set of test users, use one of these to log in.

Internal users in Digdir can use the "TestID" electronic ID, which lets you generate a random personal ID,
or retrieve credentials from [the internal Altinn 3 testing dataset](https://pedia.altinn.cloud/altinn-3/testing/test-data/).

**Test the different tracks and pages to confirm that the behaviour is as expected.**

{{% /expandlarge %}}

## Summary

In this module you have built and deployed your application to TT02, logged into Altinn with a test user and tested your application.


## Løsningsforslag

[Source code Module 3](https://altinn.studio/repos/testdep/flyttemelding-sogndal/src/branch/modul3)

{{%expandlarge id="resources-solution" header="Set custom requirements for resource use"%}}

The following changes have been made to the code:

{{< code-title >}}
App/deployment/values.yaml
{{< /code-title >}}

```yaml{linenos=false,hl_lines="3-7"}
deployment:
  
  replicaCount: 1
  
  requests:
      cpu: 50m
      memory: 128Mi

...
```

{{%/expandlarge%}}

<br><br>

{{% center %}}
[<< Previous module](../modul2/)      [Next module >>](../modul4/)
{{% /center %}}
