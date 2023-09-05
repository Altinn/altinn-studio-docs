---
title: Application construction components - Altinn Notifications
linktitle: Architecture
tags: [architecture, solution]
weight: 999
toc: false

---

The Notifications component in Altinn is made up of multiple ASP.NET Web API applications 
deployed as Docker containers to a Kubernetes cluster.

The component is supported by multiple cron jobs running in the same Kubernetes, a Kafka server and an instance of 
[Azure Communication services](https://learn.microsoft.com/en-us/azure/communication-services/overview).

For a functional description see details in [application solution components](../../).

The following diagram illustrates the overall data flow.

![Solution diagram](solution.drawio.svg "Solution diagram Altinn Notifications")
