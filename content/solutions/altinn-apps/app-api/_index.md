---
title: App API
description: Description of the API's available in a App created in Altinn Studio
tags: ["solution", "apps"]
aliases:
    - "/altinn-studio-apps"
weight: 200
---

{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}

API's have always been important to the Altinn platform. About 50% of all data going throug Altinn to service owners are comming 
from end user systems implementing Altinn Apis's (SOAP and REST). More than 100 different vendors of different types of 
applications integrates with Altinns appi and submits data for different "services". 

In addition mobile apps and external governmental portal consumes Altinn Apis to allow users to use services outside the Altinn Portal.

Service Owners also have seperate APIs to interact with the apps. The below figure shows the different consumers of the API's and show that consumers both
interact with the App Apis and the shared platform Api's.

{{%excerpt%}}
<object data="/solutions/altinn-apps/app-api/api-concept.svg" type="image/svg+xml" style="width: 100% max-width: 1200px;"></object>
{{% /excerpt%}}



{{% children description="true" depth="1" %}}







