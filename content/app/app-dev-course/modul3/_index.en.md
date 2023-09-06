---
title: Module 3
description: Build and deploy application to test environment
linktitle: Module 3
tags: [apps, training, build, deploy, test ]
weight: 20
---
{{% notice warning %}}
 This module requires that you are part of an [organization](/app/getting-started/create-user/#join-an-organization) with an enabled test environment for Altinn Apps. If this is not the case, move on to the [next module](../modul4/).
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
- [Set custom rules for scaling](/app/development/configuration/deployment/#scaling)
- [Set custom limits for resource use](/app/development/configuration/deployment/#resources-configuration)
{{% /expandlarge %}}



{{% expandlarge id="build-application" header="Build application" %}}

When you refer to building an application in Altinn Studio,
this means creating a version of the current state of the application
that can be deployed to one or more environments.

Create a new build for the application with version number `0.0.1`
and add a descriptive comment of what the version includes.

### Useful documentation
- [Build app in Altinn Studio](/app/testing/deploy/#bygge-app)

{{% /expandlarge %}}


{{% expandlarge id="deploy-application" header="Deploy application" %}}

Deploying an application to the test environment allows you to test all integrations.
In addition to this, TT02 is often used to verify that an application works as expected before deploying to production.

{{% notice info %}}
To be able to deploy an application to TT02,
the organization that owns the application has to have an app cluster in the test environment.
In addition to this, the developer deploying the application needs the [role Deploy-TT02](/app/guides/access-management/studio/#deploy-tt02)
for the organization in Altinn Studio.
{{% /notice %}}

**Deploy your application to TT02.**

### Useful documentation
- [Deploy app to test environment](/app/testing/deploy/#deploy-av-app-til-testmiljø)
- [Access control for the organization in Altinn Studio](/app/guides/access-management/studio/#tilgangsstyring-for-organisasjonen)

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

Internal users in Digdir should use one of the test users found in [the test data set](https://pedia.altinn.cloud/testing/testdata/datasets/).

**Test the different tracks and pages to confirm that the behaviour is as expected.**

{{% /expandlarge %}}

## Summary

In this module you have built and deployed your application to TT02, logged into Altinn with a test user and tested your application.


{{% expandlarge id="solution" header="Solution" %}}
[(Module 3 source code - previous version)](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/3) that you can use as inspiration.
{{% /expandlarge %}}

<br><br>

{{% center %}}
[<< Previous module](../modul2/)      [Next module >>](../modul4/)
{{% /center %}}