---
title: Process Interaction
linktitle: Process Interaction
description:  
tags: [app-backend]
weight: 100
---

App backend exposes different APIS that is relevant during a app process. 

This page show examples

### Process Interaction App Frontend - App Backend - 

{{%excerpt%}}
<object data="../process_interaction.svg" type="image/svg+xml" style="width: 100%;  max-width: 800px;"></object>
{{% /excerpt%}}


[Full Screen](../process_interaction.svg)

The above example show the following

- User clicks link to a App from service catalog
- The browser redirect to the start service page in the app. The react application renders the correct view
- User click on instantiate button.
- App Frontend calls instansiate API
- Instantiate create a new instance with data for the datamodell with prefill and returns instance information that user should be redirect to.
- User/browser open the instance
- App frontend calls app backed to get the instance state
- App Frontend render the correct component for the given state.
- User input data . App Frontend call Data API to update data. If calculation or dataretrieavel causes additional data updates on server side, the response indicates to app frontend to get the latest data
- App frontend gets the updated data
9 and 10 is repeated as long user has data to input

- User press complete/send inn button
- App frontend Saves data
- App frontend calls validation API and any possible errors are presented to the user. If 
- If no errors are returned App Frontend call Process API to complete Task. Process Api trigger task validation to make sure it is allowed to move process forward. If validation fails, process API returns


### Process Interaction End User System - App Backend - 

{{%excerpt%}}
<object data="../process_interaction_eus.svg" type="image/svg+xml" style="width: 100%;  max-width: 800px;"></object>
{{% /excerpt%}}

[Full Screen](../process_interaction_eus.svg)


### Process Interaction Sirius Use case 

{{%excerpt%}}
<object data="../process_interaction_sirius.svg" type="image/svg+xml" style="width: 100%;  max-width: 800px;"></object>
{{% /excerpt%}}

[Full Screen](../process_interaction_sirius.svg)

