---
title: Processing events from an Altinn App
linktitle: Processing app events
description: A description of a reference system for processing events from an Altinn App
weight: 50
toc: true
---

Altinn Apps are per the exit of 2022 the event producers responsible for the majority of the events registered
in Altinn. Although the applications vary in implementation and purpose, the processing of the events
produced by an application tend to have a number of similarities. 

## Default Altinn App event types

Altinn Apps that have enabled event generation publishes a set of default events.

- app.instance.created
- app.instance.process.movedTo.{Task ID}
- app.instance.process.completed
- app.instance.substatus.changed
  
In addition to the list above application owners are free to generate custom events.
Make sure to check in with the owner of the application you want to subscribe to if you are unsure of 
which event types would be best to subscribe to for your use case. 


## Altinn Application Owner System

We have created a reference system for application owners to use when processing application instances.
Supported by Azure and the events capabilities of Altinn,
the system is able to fetch data once an instance is completed and then update the status of the instance. 

[Altinn Application Owner system is available on GitHub](https://github.com/Altinn/altinn-application-owner-system). 
We recommend that you clone the repository before making any adaptions and deploying it in your Azure account. 


## Example flow: instance data processing

1. Set up a subscription for an application resource and the relevant event type(s) for you,
   e.g. _app.instance.created_ or _app.instance.process.completed_.

2. Once an event is pushed to your endpoint, follow the source link to access the metadata for the application instance.
   Note that the client must authenticate itself towards this endpoint as well.
    ```json {linenos=false,hl_lines=[5]}
    {
        "id": "b4d1d548-1280-464c-a8da-dee9840909de",
        "time": "2023-04-18T12:16:38.7942271Z",
        "type": "app.instance.process.completed",
        "source": "https://ttd.apps.at22.altinn.cloud/ttd/apps-test/instances/50019855/6b3323c8-7baf-4612-b8a6-5eac407f4d0c",
        "subject": "/party/50019855",
        "specversion": "1.0",
        "alternativesubject": "/person/16035001577"
    }
    ```
3. The instance metadata will provide a list of data elements related to the instance containing
   download links. Use either the *apps* or *platform* self links to download the data using the same credentials as 
   for the previous request.
   
   ```json  {linenos=false,hl_lines=[10,11]}      
    "data": [
        {
            "id": "abbccf62-0c8b-4acd-a99c-57e45d7542bc",
            "instanceGuid": "6b3323c8-7baf-4612-b8a6-5eac407f4d0c",
            "dataType": "default",
            "filename": null,
            "contentType": "application/xml",
            "blobStoragePath": "ttd/apps-test/6b3323c8-7baf-4612-b8a6-5eac407f4d0c/data/abbccf62-0c8b-4acd-a99c-57e45d7542bc",
            "selfLinks": {
                "apps": "https://ttd.apps.at22.altinn.cloud/ttd/apps-test/instances/50019855/6b3323c8-7baf-4612-b8a6-5eac407f4d0c/data/abbccf62-0c8b-4acd-a99c-57e45d7542bc",
                "platform": "https://platform.at22.altinn.cloud/storage/api/v1/instances/50019855/6b3323c8-7baf-4612-b8a6-5eac407f4d0c/data/abbccf62-0c8b-4acd-a99c-57e45d7542bc"
            },
            "size": 541,
            "locked": false,
            "refs": [],
            "isRead": true,
            "tags": [],
            "deleteStatus": null,
            "created": "2023-04-18T12:16:38.5517968Z",
            "createdBy": "20003904",
            "lastChanged": "2023-04-18T12:16:38.5517968Z",
            "lastChangedBy": "20003904"
        }
    ]
    ```

4. If you are the application owner and this is a part of processing a submitted instance, complete this flow by 
   calling the 
   [complete confirm endpoint for the instance](/api/apps/spec/#/Instances/post__org___app__instances__instanceOwnerPartyId___instanceGuid__complete). 
   
   This informs Altinn that you as an application owner have downloading everything you need, meaning Altinn 
   does not need to persist the instance and related form data and attachments after the end user deletes it from their 
   messagebox.