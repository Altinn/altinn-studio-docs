---
title: 'Dialog'
description: 'Reference information about the dialog aggregate root'
weight: 10
toc: true
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

{{<notyetwritten>}}

## Dialog entity for end-users

### Details 

This is the entity returned in the end-user API when fetching details for a single dialog 

{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_Dialog">}}

### Search

This is the entity returned in the end-user API when searching for dialogs

{{<swaggerdisplayentity "V1EndUserDialogsQueriesSearch_Dialog">}}

## Dialog entity for service owners

### Details

This is the entity returned in the service owner API when fetching details for a single dialog 

{{<swaggerdisplayentity "V1ServiceOwnerDialogsQueriesGet_Dialog">}}

### Search

This is the entity returned in the service owner API when searching for dialogs

{{<swaggerdisplayentity "V1ServiceOwnerDialogsQueriesSearch_Dialog">}}

### Create (POST)

This is the entity expected as input in the service owner API when creating a new dialog 

{{<swaggerdisplayentity "V1ServiceOwnerDialogsCommandsCreate_DialogCommand">}}

### Update (PUT)

This is the entity expected as input in the service owner API when updating a new dialog 

{{<swaggerdisplayentity "V1ServiceOwnerDialogsCommandsUpdate_Dialog">}}

### Update (PATCH)

Dialogporten supports [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902/) JSON Patch. A patch document should be constructed based on the PUT entity described above.

Note that the list of transmissions and activities are immutable; so replace/remove operations are not accepted on those properties.

**See also**
* https://jsonpatch.com/

{{<children />}}

