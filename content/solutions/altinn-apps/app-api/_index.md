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

As part of the application framwork added to a app when creating it in Altinn Studio there will be some API'S available to consume from end user Systems, 
External Portals, Mobile apps and App owner systems (typical agencies hosting apps in the platform)

## REST API's for end user systems
The main API'channel for data in the platform is REST for services created in Altinn Studio. 

The end user system needs to call different APIS based on the need.  The below figure show the different components relevant for an 
end user System calling Altinn through REST.

{{%excerpt%}}
<object data="/solutions/altinn-apps/app-api/eus-rest.svg" type="image/svg+xml" style="width: 100% max-width: 1200px;"></object>
{{% /excerpt%}}

### API to authenticate end user systems 
For new API's the goal is to use JWT Tokens to authenticate against the API. 

Altinn Apps will expose apis to authenticate end user systems and user of end user systems and return JWT Tokens that can be used against the other API's. 

### API to create new data instance for a app
From end user systems it will be possible to create a instance of a App from a end user system. 
This is a URL directly to the app and unique

**URL**
https://skd.apps.altinn.no/api/v1/3/AltinnTest/ApiDemo/

### API to update form data
Data that is form data for a given app needs to be updated through the APP APis to ensure handling of business rules

https://skd.apps.altinn.no/api/v1/3/AltinnTest/ApiDemo/7ae65582-f9bc-46b8-b094-84e9530e4ed6/Update

### API to get instance data with business rules
Data that is form data related to the apps data modell will need to be retrieved through the APP api. 
This is because the app possible can add additional data.


**URL**
https://skd.apps.altinn.no/api/v1/3/AltinnTest/ApiDemo/7ae65582-f9bc-46b8-b094-84e9530e4ed6/Update

### API to validate data
The apps will support the possibility to validate the datamodel for the app without creating a instance of the data

https://skd.apps.altinn.no/api/v1/3/AltinnTest/ApiDemo/7ae65582-f9bc-46b8-b094-84e9530e4ed6/Update



### API to calculate / perform business rules
The app will support the possibility to 

























