---
title: Key figures for published apps
linktitle: Key figures
description: What the numbers on the Published apps page in Altinn Studio mean, where they come from, and who can see them.
toc: true
weight: 130
---

The **Published apps** page in Altinn Studio shows how your apps are used in each environment: how many instances users start and complete, how long they typically take, and which apps need attention. This page explains what each number means, where it comes from, and who has access.

You find the page under **Published apps** in the top menu of Altinn Studio, or at
`https://altinn.studio/admin/{org}` (replace `{org}` with your organisation code).

## Who sees the numbers

You must be a member of a team in your organisation named `Admin-` followed by the environment name, for example `Admin-Production` for production and `Admin-TT02` for the TT02 test environment. The team needs no repository access; membership alone gives access to the page.

The owners of the organisation create the team and add members. [How to manage teams in Altinn Studio](/altinn-studio/v8/guides/administration/access-management/studio/).

## Where the numbers come from

Every night, Altinn Studio fetches yesterday's numbers from Altinn's storage service, app by app, and stores them per day. The page sums those daily numbers when you open it. That is why the top of the page says which day the numbers cover and when they were last fetched, for example "Tall per 10. november 2026, oppdatert 11.11.2026, 03:30".

A day is counted in UTC, which is Norwegian time minus one hour in winter and two in summer. An instance a user started at 00:30 Norwegian time on 11 November therefore counts on 10 November.

Errors are the exception: the page fetches them straight from the logs every time you open it, and they always cover the last seven days.

Numbers are collected for production and TT02. The AT and YT test environments have no key figures.

## What the numbers mean

### Period

The **Periode** selector at the top controls every number on the page, both the tiles and the table. You can choose the last 7, 30 or 90 days. The period ends on the last day that has numbers, not today. If the collection failed one night, the period does not get shorter; the last day with numbers is in the stamp at the top.

### The tiles at the top

| Tile | Meaning |
|---|---|
| Apper i miljøet | How many apps are published in the environment, and how many of them got at least one new instance in the period. |
| Instanser opprettet | How many instances users started in the period, with the change in percent against the same number of days right before the period. |
| Instanser fullført | How many instances were completed in the period, and what share that is of the ones started in the same period. An instance is completed when its process has ended and the instance is archived. |
| Apper med avvik | How many apps have errors or are unused. See [Deviations](#deviations). |

### The columns in the table

| Column | Meaning |
|---|---|
| Navn | The app's name, linking to the app's details page. |
| Versjon | The version of the app published in the environment now. |
| Instanser siste X d | Instances users started in the period. Under the number is the typical time to completion for the instances completed in the period. |
| Avvik | Errors and unused apps. Empty when all is well. |

You can sort on every column by clicking its heading. By default, the apps with deviations come first.

### Typical time to completion

"Typical time" is the median: half of the instances were completed faster, half took longer. We use the median rather than the mean because a few instances left open for weeks would otherwise pull the number far up.

The time runs from the user starting the instance to the process ending. Altinn Studio computes the median per day and weights the days by how many instances were completed, so a day with many completions counts more than a day with few.

### Deviations

The **Avvik** column only shows what you as a service owner can do something about yourself:

- **Errors**: the app has had errors in the last seven days, either when users tried to start an instance or when they tried to move on in the process. The number is the number of failing calls, and the **Se logger her** link takes you to the logs.
- **Unused**: no user has started an instance in the app for more than 90 days. The number says how many months it has been. An unused app still costs to run, so consider whether it can be [undeployed](/altinn-studio/v8/guides/development/undeploy/).

If the collection started less than 90 days ago, Altinn Studio counts from the first day that has numbers. An app is therefore not marked as unused until 90 days have actually passed without us being able to see an instance.

## The details page for an app

When you click an app, you also see

- **typical time to completion** for the last 30 days, independent of the selector in the **Statistikk fra siste** card, which goes all the way down to five minutes
- **deployments** drawn into the charts of started and completed instances: a dashed line with the version above it for every deployment in the period, a grey line for an undeploy, and a list under the chart with the time, the version and who published

That way you can see whether a new version changed how many start or complete.

## What the numbers do not show

- **Open instances**, that is instances not yet completed, and which step they are on. You find them in the instance list on the details page, with the filter for instances older than a number of days.
- **Submissions the service owner has not confirmed**. Use the **Bekreftet mottatt** filter in the instance list.
- **Storage** per app.
- **The app library version** in the list. It is on the details page under **Informasjon om appen**.

## For the Altinn Studio team: Plattform

The **Plattform** menu item shows the same numbers for every service owner in one environment, summed per service owner, and a list of all apps with a filter for unused apps. Here an app counts as unused after 180 days.

The menu item only shows for members of the `Studio-Platform` team in the `ttd` organisation. It is for those who operate Altinn Studio, not for service owners.
