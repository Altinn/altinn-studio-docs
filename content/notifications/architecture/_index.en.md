---
title: Application construction components - Altinn Notifications
linktitle: Architecture
tags: [architecture, solution]
weight: 20
toc: false

---

The Notifications solution in Altinn is made up of multiple ASP.NET Web API applications 
deployed as Docker containers to a Kubernetes cluster.

The solution is supported by multiple cron jobs running in the same Kubernetes cluster, a Kafka server and an instance of 
[Azure Communication services](https://learn.microsoft.com/en-us/azure/communication-services/overview).

The following diagram illustrates the overall data flow.

![Solution diagram](solution.drawio.svg "Solution diagram Altinn Notifications")


Data flow including kafka Topic

![Topics](notifications-topic.drawio.svg "Illustration of the data flow including Kafka Topics")