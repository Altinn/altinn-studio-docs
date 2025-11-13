---
title: 'Service owner labels'
description: 'Reference information about the service owner label entity'
weight: 40
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

Service Owner Labels are custom tags used by service owners to categorize and manage dialogs.  
Dialog search supports filtering by one or more service owner labels, requiring all specified labels to match a dialog.  
Wildcard prefix searches are also supported (e.g., some-prefix*).  

Each label must be unique and between 3 and 255 characters long.  
A dialog can have up to 20 labels.  
They are not visible to end users.  

{{<swaggerdisplayoperation "post" "/api/v1/serviceowner/dialogs/{dialogId}/context/labels">}}

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialogs/{dialogId}/context/labels">}}

{{<swaggerdisplayoperation "delete" "/api/v1/serviceowner/dialogs/{dialogId}/context/labels/{label}">}}


{{<children />}}

