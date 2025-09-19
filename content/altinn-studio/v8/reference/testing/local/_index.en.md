---
title: Test of app locally
linktitle: Locally
description: Description of how test of an app locally on your own machine.
weight: 100
aliases:
- /altinn-studio/reference/testing/local/
---

If you need to write a significant amount of code (e.g., [logic](/altinn-studio/reference/logic/)), or quickly check how a form looks, it can be useful to test changes without having to deploy the app to a test environment.

When the app is created, it comes with all the necessary files and settings to run as a standalone application. By downloading all the files associated with the app from its repository, you can run the app locally on your own machine, thereby easily testing changes.

In the test environment, the app uses a set of platform services to retrieve/store data, etc. A simplified version of these services is available to set up and run locally. This is necessary for the app to be tested locally.

## Running the app locally

1. Navigate to the app repository in Altinn Studio. See [here](/altinn-studio/getting-started/navigation/repos/) for how to navigate there.
2. Download all the files in the repository
   - by using the `git clone` command [(read more)](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)
   - by clicking the download icon (this downloads it as a zip file)

See [Altinn Studio on Github](https://github.com/Altinn/app-localtest/blob/master/README.md) for information on how to download and run the local platform, and how to run the app.

{{<children />}}
