---
title: Monitoring
linktitle: Monitoring
description: Altinn App metrics, telemetry and trace logs are available in Azure Application Insights.
weight: 70
---

{{% notice info %}}
Setting up custom rules and alerts is currently not available to application owners, 
but we are aiming to support this during the Spring of 2023. 
{{% /notice %}}

Azure Application Insights (AI) is an extension of 
[Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/overview) and is what we use in Altinn to 
provide Application Performance Monitoring features for apps. 

AI can provide you as an app developer with valuable insights into the health, performance and usage of your app.
With real-time monitoring and performance analytics, developers can identify and resolve issues before they impact the 
user experience. Error tracking and alerts* makes AI a valuable resource during operations as well. 


![Illustration of AI graphs](ai-overview.png "Illustration of AI graphs")

{{% expandlarge id="q1" header="Altinn monitors your infrastructure" %}}

The Altinn team has access to all of the telemetry logged by the application that the app owners also have access to. 
In addition we monitor the infrastructure components for each application owner such as Kubernetes cluster, 
storage account and key vault. 

As a main rule the Altinn team has action plans for alerts related to the infrastructure that is required to run the apps 
i.e  CPU exhaustion in the application cluster or a pod is in an error state in the cluster.

__Altinn does not actively monitor the performance or failure rates
of individual applications.__

{{% /expandlarge %}}
{{<children />}}
