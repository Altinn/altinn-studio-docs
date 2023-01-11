---
title: Request access to Events API
linktitle: API access
weight: 10
description: Guide to requesting access to Altinns APIs
---

Clients accessing the APIs related to subscribing to events must have a valid Altinn access token (JWT-token). 
This token is provided upon authenticated through Maskinporten or ID-porten. 

{{% notice info %}}
When subscribing to events published by anything other than an Altinn App,
the scope `altinn.event:subscriber` is required. 
{{% /notice %}}



### Authenticating a REST client

There are multiple options when authenticating your client. 

[Check out our guide on available authentication options here]().
     
{{% notice warning %}}
Do we have a suitable guide for this or must it be created? 
{{% /notice %}}


### Requesting required scope: altinn.event:subscriber

Currently, access to this scope is limited to the development team and beta testers for non-Altinn App events. 
If you fall under one of these two groups and require access, please contact the development team directly. 

We are currently working on opening up requests to this scopes available to the public. 
[The progress of this work can be monitored here](https://github.com/Altinn/altinn-events/issues/142).


