---
title: REST-API for End User Systems
description: Description of the Rest API for end user systems
tags: [altinn-apps]
aliases:
    - "/altinn-studio-apps"
weight: 200
---

{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}

The main API'channel for data in the platform is REST for services created in Altinn Studio. 

The end user system needs to call different APIS based on the need.  The below figure show the different components relevant for an 
end user System calling Altinn through REST.

{{%excerpt%}}
<object data="/solutions/altinn-apps/app-api/eus-rest/eus-rest.svg" type="image/svg+xml" style="width: 100% max-width: 1200px;"></object>
{{% /excerpt%}}

### API to authenticate end user systems 
For new API's the goal is to use JWT Tokens to authenticate against the API. 

Altinn Apps will expose apis to authenticate end user systems and user of end user systems and return JWT Tokens that can be used against the other API's. 

### API to create new data instance for a app
From end user systems it will be possible to create a instance of a App from a end user system. 
This is a URL directly to the app and unique

See [Application Users API](/altinn-api)
