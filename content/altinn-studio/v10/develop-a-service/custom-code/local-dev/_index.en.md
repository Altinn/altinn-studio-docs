---
draft: false
title: Local development
linktitle: Local development
description: Getting started with local development
tags: [needsReview]
toc: true
weight: 900
aliases:
- /altinn-studio/guides/local-dev/
---

When developing an application, you must work both in Altinn Studio and in a local development environment.
Here is an overview of how to get started with local development.

## Clone the application to a local development environment

1. Find the application you want to work with locally in the [Dashboard](/en/altinn-studio/v8/getting-started/navigation/dashboard/) in Altinn Studio
2. Open the repository. Click the **Repository** button
    ![Repository button highlighted in an image](find-app-in-dashboard.png)
    *Replace this image.*
3. Copy the repository link (the blue square) either manually or by clicking the button marked with a red circle
    ![Highlighted repository URL in Gitea in an image](copy-repo-link.png)
    *Consider replacing this image.*
4. Open a terminal in your local development environment:
    - Go to the desired location for the application repository.
    - Enter the command `git clone` and paste the URL you copied in the previous step.
    ```cmd
    $ git clone https://altinn.studio/repos/<org>/<app-name>.git
    ```
    -  If you have logged into Altinn Studio without creating a password (e.g. using GitHub login), you can [create a personal access token in Gitea](https://altinn.studio/repos/user/settings/applications) to use as a password when cloning:
    ```cmd
    $ git clone https://<username>:<access-token>@altinn.studio/repos/<org>/<app-name>.git
    ```
    - You should see a result in the terminal similar to this:
    ```cmd
    Cloning into 'app-name'...
    remote: Enumerating objects: 982, done.
    remote: Counting objects: 100% (982/982), done.
    remote: Compressing objects: 100% (950/950), done.
    remote: Total 982 (delta 600), reused 0 (delta 0), pack-reused 0
    Receiving objects: 100% (982/982), 166.38 KiB | 1.51 MiB/s, done.
    Resolving deltas: 100% (600/600), done.
    ```

The system creates a folder with the same name as the application and clones the contents of the application repository into the folder.
Now you can open your preferred development tool and start coding.

## Synchronise changes in the local development environment

You must upload (push) changes you make locally to the repository from which the code was cloned.
If you make changes in Altinn Studio Designer (and upload these to the repository), you must download them (pull) to update the local code.

You can synchronise changes in the local development environment in several ways.
Many development tools have good integrations for this purpose, so check whether your tool has that type of support.

Below we describe how you can synchronise changes from the command line.

### Upload changes

1. Go to your application repository in a terminal.
2. Add the files for which you want to upload changes (push) with the command `git add <file path>`. You can run the command for individual files, multiple files at once (space separated), or a directory.
3. Save (commit) the changes with a meaningful message using the command `git commit -m <commit message>`.
4. Upload (push) the changes to the master branch with the command `git push`.

### Download changes

Go to your application repository in a terminal and run the command `git pull`.

[Read more about `git pull` here](https://git-scm.com/docs/git-pull)

## Synchronise changes in Altinn Studio

In Altinn Studio, you must synchronise changes in the same way as with local changes.

### Download changes
1. Click **Hent endringer** (Fetch changes) on the 'Lage' page of the application in Altinn Studio.
   ![Fetch changes in Altinn Studio](toolbar-hent.png)
   *Replace this image.*
2. If everything went well, you will see this confirmation.
    ![Fetch changes confirmation](pull-successful.png)
    *Replace this image.*

### Upload changes

1. Click **Last opp dine endringer** (Upload your changes) on the 'Lage' page of the application in Altinn Studio.
   ![Upload changes in Altinn Studio](toolbar-last-opp.png)
   *Replace this image.*
2. Enter a descriptive message for the change(s) and click **Valider endringer** (Validate changes).
    ![Commit message](commit-message.png)
    *Replace this image.*
3. Wait a moment whilst the system validates the changes. If a conflict occurs, click **Løs konflikt** (Resolve conflict) and follow the instructions.
4. Click **Lagre** (Save) to upload the changes to the repository (master).
    ![Save validated changes](changes-validated.png)
    *Replace this image.*
5. If everything went well, you will see this confirmation.
    ![Save confirmation](push-successful.png)
    *Replace this image.*

## Local testing

You can preview the changes you make when working locally.
*LocalTest* is a programme that spins up a local mock-up of the Altinn Platform.
It allows you to test and verify local changes without having to synchronise with Altinn Studio.

{{% notice info %}}
**NOTE**
To run the app in LocalTest, the application must have an associated [data model](/en/altinn-studio/v8/reference/data/data-modeling/).
{{% /notice %}}

1. **Download and start LocalTest** by following the steps [we describe on GitHub](https://github.com/Altinn/app-localtest/blob/master/README.md) (includes starting the app, which we also explain below).
2. **Run your application within LocalTest**: Open a new terminal window and go to the subfolder *App* in your application (`<app-name>/App`). Start the app with the command `dotnet run` and wait for confirmation in the terminal.
3. **Preview and test application**: Go to [http://local.altinn.cloud](http://local.altinn.cloud) and log in with a [test user](/en/altinn-studio/v8/reference/testing/local/testusers/).

### Preview changes in real-time

- If you change JSON files, simply reload the page.
- If you change prefilling, you must start a new instance of the application (go to [http://local.altinn.cloud](http://local.altinn.cloud) and log in again).
- If you change CS files, you must stop the application (`ctrl+C`) and start it again (`dotnet run`).

You can update automatically when changing CS files by starting the application with `dotnet watch`.
This command will either start the application or reload it ([hot reload](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-watch#hot-reload)) when changes are made to the source code.

### Stop the application and LocalTest

Stop the application by pressing `ctrl+C` in the terminal window where you started it.
Stop LocalTest by going to the `app-localtest` folder in the terminal and running the command `docker compose down`.
