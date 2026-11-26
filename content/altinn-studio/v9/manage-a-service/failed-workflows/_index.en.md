---
draft: true
title: Restart a workflow that has failed
linktitle: Failed workflows
description: How to find instances where a workflow has failed, and restart the workflow in Altinn Studio.
toc: true
weight: 80
---

When a workflow in the app has failed, you restart it on the **Publiserte apper** page in Altinn Studio.

In v9, the app runs every transition in the process as a workflow in the workflow engine, for example when the end user submits, or when a service task creates a PDF. If a step fails, the platform usually retries for a while. When it gives up, or the failure is permanent, the workflow stays failed until someone restarts it.

## When you need this

When a service task has failed, the end user can often retry. See [Hva brukeren ser mens en systemoppgave kjører](/nb/altinn-studio/v9/develop-a-service/process/service-tasks/visning/) (documentation available in Norwegian only). In these cases, someone at the service owner must restart the workflow:

- The end user does not have access to retry, or does not come back to the instance.
- The failure is of a kind the end user cannot retry. The end user then sees the page «Noe gikk galt» with references for user support, and no buttons.
- The failure came after the process had ended, for example in `IOnProcessEndedHandler` or when the app was to [confirm receipt]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/process/confirm-on-process-end" >}}). Neither the end user nor a system that reads the process then sees the failure.
- An auxiliary workflow has failed. Auxiliary workflows send events, for example, without the process waiting for them. The process moves on, so the end user notices nothing.

## What you need

You must be a member of the team for the environment in your organisation in Altinn Studio, **Admin-TT02** or **Admin-Production**. The owners of the organisation add members. See [Standardteam i Altinn Studio](/nb/altinn-studio/v9/develop-a-service/reference/administration/access-management/studio/#admin-tt02-og-admin-production) (documentation available in Norwegian only) for what the two teams give access to.

## Find the instances

You find the page under **Publiserte apper** in the top menu of Altinn Studio, or at
`https://altinn.studio/admin/{org}` (replace `{org}` with your organisation code).

1. Open the app in the environment in question.
2. Select the tab **Instanser med problemer**. It lists the instances where at least one workflow has failed.
3. Open the instance.

The tab **Instanser med problemer** exists only for apps that use the workflow engine, that is, apps on v9. With **Type feil** you can show only main workflows or only auxiliary workflows that have failed.

## Restart the workflow

First correct the cause of the failure if it lies in the app or its setup, for example an action missing in `policy.xml`. Then do this:

1. Find the workflow that has failed under **Arbeidsflyter** on the page for the instance.
2. Click **Prøv på nytt**.
3. Click **Prøv arbeidsflyten på nytt** to confirm.

The workflow engine queues the workflow again, and it continues from the step that failed. Workflows that stopped because this one failed restart together with it.

If the last failure was permanent, the dialogue says so. The platform does not retry a permanent failure by itself, so the workflow fails again unless you have corrected the cause.

Restart the workflow as soon as the failure has been corrected. The workflow engine deletes failed workflows when the retention period is over, and after that nobody can restart them.
