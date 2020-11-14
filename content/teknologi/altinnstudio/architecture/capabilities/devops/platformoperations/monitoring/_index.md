---
title: System and platform monitoring
linktitle: Monitoring
description: As part of the architecture Altinn 3 has capability to monitoring different aspects of the platform
tags: [architecture]
toc: false
---

Altinn 3 uses serveral features of [Azure Monitor](https://docs.microsoft.com/en-us/azure/azure-monitor/overview).  


### Monitoring

[Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview) 
is used to monitor different aspects of the platform.

![Operations overview](monitoring1.png "Operations overview")

The above screenshot shows statistics for different requests.  

![Application Map](monitoring2.png "Application Map")

This screenshots shows how Application Insights presents how traffic flows between the different applications in the solutions.

![Request overview](monitoring3.png "Request overview")

This screenshots show how a request flows through the different applications

![End to end transaction](monitoring4.png "End to end transaction")

This screenshots show how a request flows through the different applications

![CPU and Memory](monitoring5.png "CPU and Memory")

This screenshots show how a request flows through the different applications

### Alerts

[Azure Alerts](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/alerts-overview) is used to define rules to notify the DevOps team about issues
in the platform.    

Alerts are posted to a specific Alerts channel on Slack. 