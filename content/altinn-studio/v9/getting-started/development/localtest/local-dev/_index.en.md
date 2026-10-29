---
draft: true
title: Local development
linktitle: Local development
description: Getting started with local development
tags: [Reviewed]
toc: true
weight: 40
aliases:
- /altinn-studio/guides/local-dev/
---

When developing an application, you must work both in Altinn Studio and in a local development environment.
Here is an overview of how to get started with local development.

## Clone the application to a local development environment

{{% insert "content/altinn-studio/shared/studioctl/local-development-intro.en.md" %}}

{{% notice warning %}}
{{% insert "content/altinn-studio/shared/studioctl/preview-warning.en.md" %}}
{{% /notice %}}

{{% insert "content/altinn-studio/shared/studioctl/install-clone.en.md" %}}

{{% expandlarge id="legacy-clone-with-git" header="Old method: Clone manually with Git" %}}

1. Go to the repository for the app. You can do this in two ways:
    - On the dashboard in Altinn Studio, click the repository icon next to the app.
      ![The repository icon next to the app on the dashboard](./find-app-in-dashboard.png "The repository icon on the dashboard")
    - Inside the app, click the three dots in the top right corner and select **Repositorium**.
      ![The three-dots menu with the Repositorium option](./three-dots-repository.png "Repositorium in the three-dots menu")
2. Click **Kode**, and copy the link under **HTTPS** with the copy button (marked with a red circle).
    ![Copy the repository link in Gitea](./copy-repo-link.png "Copy the repository link")
3. Open a terminal in your local development environment, go to the folder where you want the app, and run `git clone` with the link you copied:
    ```bash
    git clone https://altinn.studio/repos/<org>/<app-name>.git
    ```
    You log in to Altinn Studio with Ansattporten, so you don't have a separate password. If Git asks for a password, use a [personal access token from Gitea](https://altinn.studio/repos/user/settings/applications) instead.

    You should see a result in the terminal similar to this:
    ```cmd
    Cloning into 'app-name'...
    remote: Enumerating objects: 982, done.
    remote: Counting objects: 100% (982/982), done.
    remote: Compressing objects: 100% (950/950), done.
    remote: Total 982 (delta 600), reused 0 (delta 0), pack-reused 0
    Receiving objects: 100% (982/982), 166.38 KiB | 1.51 MiB/s, done.
    Resolving deltas: 100% (600/600), done.
    ```

The system creates a folder with the same name as the app and clones the contents of the app repository into the folder.
Now you can open your preferred development tool and get started.

{{% /expandlarge %}}

## Synchronise changes in the local development environment

You must upload (push) changes you make locally to the repository from which the code was cloned.
If you make changes in Altinn Studio Designer (and upload these to the repository), you must download them (pull) to update the local code.

You can synchronise changes in the local development environment in several ways.
Many development tools have good integrations for this purpose, so check whether your tool has that type of support.

Below we describe how you can synchronise changes from the command line.

### Upload changes

1. Go to your application repository in a terminal.
2. Add the files for which you want to upload changes (push) with the command `git add <file path>`. You can run the command for individual files, multiple files at once (space separated), or a directory.
3. Save (commit) the changes with a descriptive message using the command `git commit -m <commit message>`.
4. Upload (push) the changes to the master branch with the command `git push`.

### Download changes

Go to your application repository in a terminal and run the command `git pull`.

Read more about [git pull in the Git documentation](https://git-scm.com/docs/git-pull).

## Synchronise changes in Altinn Studio

In Altinn Studio, you synchronise changes with the buttons in the toolbar at the top of the page.

### Fetch changes

Click **Hent endringer** (Fetch changes). You are notified when the app has been updated to the latest version.

![Fetch changes in Altinn Studio](./fetch-changes.png "Fetch changes in Altinn Studio")

### Share changes

A red dot on **Del dine endringer** (Share your changes) shows that you have changes that have not been shared yet.

1. Click **Del dine endringer**.
2. Describe what you have changed, and click **Del endringer** (Share changes). To see which files you have changed, click **Se siste endringer** (See latest changes).
   ![Share changes in Altinn Studio](./share-changes.png "Share changes in Altinn Studio")

You get a confirmation when the changes have been shared.

![Confirmation that the changes have been shared](./changes-shared.png "Confirmation that the changes have been shared")

If someone else has changed the app in the same place as you, you are told that there is a conflict in the app. You can then download your changes as a zip file, or select **Slett mine endringer** (Delete my changes).

## Local testing

{{% insert "content/altinn-studio/shared/studioctl/local-test-workflow.en.md" "/nb/altinn-studio/v9/develop-a-service/reference/data/data-modeling/" "/nb/altinn-studio/v9/test-a-service/testing/local/testusers/" %}}
{{% insert "content/altinn-studio/shared/studioctl/useful-commands.en.md" %}}

### Inspect processing in the workflow engine

The workflow engine runs process steps asynchronously in v9. During local testing, use its control panel to see whether a workflow is waiting, running, completed, or failed.

Open the localtest front page and select **Workflow engine** in the navigation. You can also open the control panel directly at [workflow-engine.local.altinn.cloud:8000](http://workflow-engine.local.altinn.cloud:8000/).

The **Live** tab shows scheduled, active, and recently finished workflows. Use the **Query** tab to search older workflows or filter by status and time. The control panel is available while localtest is running.

### Preview changes in real-time

- If you change JSON files, simply reload the page.
- If you change prefilling, you must start a new instance of the application (go to [http://local.altinn.cloud:8000](http://local.altinn.cloud:8000) and log in again).
- If you change C# files, you must stop the application (`ctrl+C`) and start it again (`studioctl run`).

You can update automatically when changing C# files by starting the app with `dotnet watch` from the *App* folder.
The command starts the app, or reloads it ([hot reload](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-watch#hot-reload)) when you change the source code.
The app gets its local settings from `studioctl` itself, so you need to have `studioctl` installed.

{{% insert "content/altinn-studio/shared/studioctl/stop-local-test.en.md" %}}

{{% expandlarge id="legacy-app-localtest" header="Old method: Run app-localtest manually" %}}

{{% insert "content/altinn-studio/shared/studioctl/legacy-app-localtest.en.md" "/nb/altinn-studio/v9/test-a-service/testing/local/testusers/" %}}

{{% /expandlarge %}}
