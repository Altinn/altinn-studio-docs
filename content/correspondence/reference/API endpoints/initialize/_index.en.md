---
title: Initialize
linktitle: Initialize
description: Endpoint for initializing a correspondence.

weight: 60
toc: true
---

## Endpoint

POST /correspondence/api/v1/correspondence

## Authentication

Use the endpoints in the authentication folder to authenticate before initializing.

## Response

### Response codes
- 200 OK: The correspondence have been succesfully initialized

  Refer to problem details in response body for further information.
- 401 Unauthorized: Indicates a missing, invalid or expired authorization header.
- 403 Forbidden: Indicates that required scope or Platform Access Token is missing or invalid.

### Content-Type
- application/json

### Response body 
The response body is formatted as an 
[InitializeCorrespondencesExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondencesExt.cs)
and serialized as a JSON string.


### Response body properties

#### correspondenceId
Type: _Guid_

The ID of the correspondence that has been initialized

#### status
Type: _string_

Shows the status of the initialized correspondence

#### recipient
Type: _string_

Shows the recipient on the format 0192:{{senderOrgNo}}

#### succeeded
Type: _int_

The number of email notifications that have been sent successfully so far

#### notifications
Type: _List<InitializedCorrespondencesNotificationsExt>(https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondencesResponseExt.cs)\>_

A list of the generated notifications with send result.
Each notification will include the following properties: 
  - _orderId_: the ID of the order.
  - _isReminder_: a boolean indicating whether the notification is a reminder or not.
  - _status_: shows the status of the notification.

| Status                        | Description       |
|:-----------------------------:|:-----------------:|
| Success                       | The notification was sent succesfully.|
| MissingContact                | There is no contact information given.|
| Failure                       | Sending of the notification failed.|
