---
title: Local development
linktitle: Local development
description: How to get started with local development
toc: true
weight: 250
---

When developing an application one will often  have to work both in Altinn Studio 
and in a local development environment.
Here is an overview of how to get started with local development.

## Preparations

Follow [the steps decribed on GitHub](https://github.com/Altinn/app-localtest/blob/master/README.md#prerequisites)
to prepare your local environment for development and testing of Altinn Apps.

## How to clone an application to the local environment

1. Find the application you want to work with in the dashboard in Altinn Studio

2. Navigate to the repository by clicking the _Repository_-button
    ![Repositoryknappen markert i et bilde](find-app-in-dashboard.png)

3. Copy the link of the repository (the blue square), either manually
   or by clicking the button marked with the red circle.

    ![Markert url til repository i Gitea i et bilde](copy-repo-link.png)

4. Open a terminal in your local environment
    - Navigate to the desired location for the application repository
    - Write the command `git clone` and paste the URL you copied in the previous step
   
    ```cmd
    $git clone https://altinn.studio/repos/ORG/APP.git
    ```
   
    - In the terminal you should be seeing an output like the one below
   
    ```cmd
    Cloning into 'APP'...
    remote: Enumerating objects: 982, done.
    remote: Counting objects: 100% (982/982), done.
    remote: Compressing objects: 100% (950/950), done.
    remote: Total 982 (delta 600), reused 0 (delta 0), pack-reused 0 
    Receiving objects: 100% (982/982), 166.38 KiB | 1.51 MiB/s, done.
    Resolving deltas: 100% (600/600), done.
    ```

You should not be able to fine a new folder with the contents of the application repository.
Open your preferred dev tool and get going with the app development!

## How to synchronize changes in Altinn Studio

### Upload changes to master

1. Click _Push_ on the Lage-page of the application in Altinn Studio
   ![Push-knappen markert i Altin Studio](push-button-in-studio.png)
2. Add a descriptive comment of the change(s) and click _Valider endringer_
    ![Commitmelding og valider-endringer illustrert](commit-message.png)
3. Wait for the changes to be validated
   1. If a conflict occurs, click _Løs konflikt_ and follow the instructions
4. Click _Push_ to upload the changes to master
    ![Push knappen illustrert](push.png)
5. If everything is successful you should see this confirmation
    ![Push bekreftelse](push-confirmation.png)

### Download changes from master

1. Click _Pull_ on the Lage-page of the application in Altinn Studio
   ![Pull markert i Altinn Studio](pull.png)
2. If everything is successful you should see this confirmation
    ![Push bekreftelse](pull-successful.png)

## How to synchronize changes in local dev environment

Synchronization of changes made in the local dev environment can be achieved in several ways.
Many dev tools have great integrations for this, 
check if your tool has this.

A description of how to synchronize changes from command line 
is available below.

### Upload changes to master

1. Navigate to the application repository folder in a terminal

2. Add the files you want to push to master with the command `git add {insert path of the file}`
   The command can be run for single files, multiple files at once or a folder

3. Commit the changes with a descriptive message with the command `git commit -m {insert comment}`

4. Push the changes to master with `git push` 

### Download changes from master

Navigate to the application repository folder in a terminal and run the command `git pull`.

[Read more about _git pull_ here](https://git-scm.com/docs/git-pull)
