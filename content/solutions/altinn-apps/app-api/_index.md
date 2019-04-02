---
title: App API
description: Description of the API's available in a App created in Altinn Studio
tags: ["solution", "apps"]
aliases:
    - "/altinn-studio-apps"
weight: 200
---

As part of the application framwork added to a app when creating it in Altinn Studio there will be some API'S available to consume from End User Systems, 
External Portals, Mobile apps and App owner systems (typical agencies hosting apps in the platform)

## REST API's for End User systems
The main API'channel for data in the platform is REST for services created in Altinn Studio. 

The end user system needs to call different APIS based on the need.  The below figure show the different components relevant for an End User System calling Altinn through REST.

{{%excerpt%}}
<object data="/solutions/altinn-apps/app-api/eus-rest.svg" type="image/svg+xml" style="width: 100% max-width: 1200px;"></object>
{{% /excerpt%}}


### API to create new instance  
From end user systems it will be possible to create a instance of a App from a end user system. 
This is a URL directly to the app and unique


**URL**
https://skd.apps.altinn.no/runtime/api/3/AltinnTest/ApiDemo/

### API to update form data
Data that is form data for a given app needs to be updated through the APP APis to ensure handling of business rules

https://skd.apps.altinn.no/runtime/api/3/AltinnTest/ApiDemo/7ae65582-f9bc-46b8-b094-84e9530e4ed6/Update


### API to Retrieve instance 















