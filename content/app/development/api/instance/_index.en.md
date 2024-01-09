---
title: Instance
linktitle: Instance
description: How to make changes to application instances.
toc: true
---

This page is currently incomplete and more information will be provided at a later date.

An instantiated application will have a corresponding instance object. This object contains metadata about the specific
instance.
If you want to learn more about the instance and the affiliated API you can read the technical documentation about this
under "API".

## Substatus

As an app-owner you can set a sub status for the instance, this is to allow the end user further information about which
condition the instance is currently in.
Sub status is displayed both in the Altinn message box and in the receipt page.

The sub status is an object which can be set in the instance object. How this is done is described under API.
Sub status is a simple object which contains `label` and `description`. These fields can either contain clean text, or a
text key that refers to the application
texts. It is worth noting that we do not support variables in text for these texts.
In the message box, `label` is limited to 25 symbols and if it contains more than 25 symbols, only the first 22 symbols
will be used and "..." will be added to the end.

Example of a status object:
```json
{
    "label": "some.label",
    "description": "Description in clear text"
}
```

Below you see an example of how sub status looks like in the message box and in the receipt where the sub status is set
up in the following way:
```json
{
    "label": "Accepted",
    "description": "Your application has been accepted by the king."
}
```

![Substatus in message box](meldingsboks.png "Substatus in message box")

![Substatus in receipt](app.png "Substatus in receipt")

## Automatic deletion of drafts

As an application owner you can imagine some cases where deleting a user's draft after a certain time is necessary. 
To achieve this three steps are required:

1. The application needs to be configured to allow the service owner to delete instances
2. Identify which instances that haven't been completed via requesting storage
3. Delete the instance via an exposed endpoint within the application 

### Step 1: Configuring the application

Service owners are not allowed to delete instances by default. 
To get the required permissions a rule must be added into `policy.xml`, placed in `App/config/authorization`.
The rule can be copied from our [rule library](../../configuration/authorization/rules/#org-can-delete-an-instance-of-orgapp-in-any-task-or-event).

### Step 2: Identify which instances are incomplete by sending a request to storage

Storage exposes a set of query parameters which can be used to retrieve a set of instances.
The example below retrieves all non-submitted instances of a given application that was instantiated on the 30. of september 2020.

You can try query parameters for your service here.

`HTTP GET https://platform.altinn.no/storage/api/v1/instances?appId={org}/{app}&created=lte:2020-09-30&process.currentTask=Task_1`

### Step 3: Delete instance via endpoint exposed in the application

After identifying the instances that are to be deleted, you can send a call to the application to delete these with the instance id (instanceOwner.partyId/instanceGuid).

`HTTP DELETE https://ttd.apps.altinn.no/ttd/apps-test/instances/{instanceOwner.partyId}/{instanceGuid}`
