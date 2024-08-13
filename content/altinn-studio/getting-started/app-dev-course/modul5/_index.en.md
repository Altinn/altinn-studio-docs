---
title: "Module 5: Publish Service"
description: Publish the service to a test environment
tags: [apps, training, form, deploy, test]
weight: 50
---

In this module, we will publish the service to a test environment to test the service end-to-end as an end user would experience it.

{{% notice warning %}}
**Note!** The test environment (and potentially the production environment) is only available for _organizations_. It will not be possible to publish a service created on behalf of your own user. If you have created the service with your own user, you can proceed to the next module.
{{% /notice %}}

### Topics covered in this module
- Navigate to the publishing page
- Access to publish
- Build a version
- Publish the desired version to a test environment

### Requirements from Sogndal Municipality
The service must be available in the test environment so that the service can be tested end-to-end.

## Navigate to the Publishing Page
1. Navigate to the service's publishing page by clicking the "Publish" button in the top right corner.
2. The page will display with 3 columns:
    - _On the left_: The different environments available. These are: _Production_ if the organization has a production environment, and _TT02_ which is the organization's test environment. Some organizations have multiple test environments.
    - _In the middle_: An overview of which versions have been published to each environment. For a brand new service, no history will be shown here until the service is actually published.
    - _On the right_: A column to build a new version of the service and an overview of previous versions.

## Access to Publish
Access to publish a service is set up by the person who manages permissions for your organization. If you do not have access to publish for your organization, you will receive a message on the page that says:
> _You do not belong to any team in your organization._

Contact the person who manages permissions for your organization to gain access to publish to the test environment.

## Build a Version

1. Make sure you have uploaded all changes you have made to the service to the service's central repository by clicking "Share changes" in the top menu, and entering a short description. Then click "Validate changes" to validate and upload all changes.
2. Enter the version name in the "version number" field, e.g., `v1`.
3. Enter a short description in the "Describe the content of the version" field, e.g., `First version of the form`.
4. Click "Build version".

You will see the version appear under "Previous builds of the application" with a spinner indicating that the build is in progress. The version is complete when the spinner disappears and a green checkmark icon appears next to "Build log". This can take 1-2 minutes.

## Publish Version to Test Environment
1. In the middle column on the page, in the row for the TT02 environment, click the dropdown list "Select version to publish".
2. You will see that the version built in the previous step is now listed. Click on it to select it.
3. Click "Publish new version" and click "Yes" in the dialog to confirm the publication.
4. A new row will now appear in the overview of "Versions published to the TT02 test environment".
    - This row is marked in blue, with a spinner in the left column and the status "Publishing in progress".
5. Wait until the spinner disappears and the row is marked with a green checkmark icon. This can take about 1 minute.
6. When the service is published to the environment, both the row in the table "Versions published to the TT02 test environment" and the environment status on the left side of the page will be marked in green.
7. In the environment status in the left column on the page, you will get a link to the service in the test environment when the publication is complete. Click this link.
8. Log in to the test environment using Tenor test data (Test user, select "Get random user").
9. You can now test the service in the TT02 test environment. Try filling out the service with some data and submit it to see what happens!

### Useful Documentation
- [User Guide - Create a Simple Form](/altinn-studio/guides/basic-form)

## Summary
In this module, we built a package of the first version of the service. We then published the package to the test environment and started the service in the test environment to test it.

{{<navigation-buttons
urlBack="../modul4"
textBack="<< Previous module"
>}}
