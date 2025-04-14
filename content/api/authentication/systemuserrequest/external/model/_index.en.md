---
title: Model
linktitle: Model
description: Model for the external to process system user request
toc: true
---

### Standard System User Request
This model is the request model for an agent system user request.

#### externalref
This is an optional reference set by the vendor for the system user request. If not provided, it defaults to partyOrgNo. If specified, this value must be used in the token request to Maskinporten.

#### systemid
The id of the registered system in altinn

#### partyorgno
The organisation number that must approve the system user request

#### rights
The list of resources the system bruker is seeking access to.

#### redirecturl
The url that the user must be redirected to after approving or rejecting the system user request

### Standard System User Response
This model is the response model for agent system user request.

#### id
The unique identifier of the created request. This ID is used to check the status or manage the request.

#### externalref
This is an optional reference set by the vendor for the system user request. If not provided, it defaults to partyOrgNo. If specified, this value must be used in the token request to Maskinporten.

#### systemid
The id of the registered system in altinn

#### partyorgno
The organisation number that must approve the system user request

#### rights
The list of resources the system bruker is seeking access to.

#### redirecturl
The url that the user must be redirected to after approving or rejecting the system user request

#### status
The status of the request. The status is "new" when the request is created. It changes to "accepted", "rejected", or "denied" depending on how the request is handled by the user.

#### confirmurl
The vendor will provide this URL to their customers to approve or reject the system user requests

#### created
The date and time the request was created. This is useful to identify if the request is still valid.

### Agent Request
This model is the request model for an agent system user request.

#### externalref
This is an optional reference set by the vendor for the system user request. If not provided, it defaults to partyOrgNo. If specified, this value must be used in the token request to Maskinporten.

#### systemid
The id of the registered system in altinn

#### partyorgno
The organisation number that must approve the system user request

#### accesspackages
The list of accesspackages the system bruker is seeking access to.

#### redirecturl
The url that the user must be redirected to after approving or rejecting the system user request

### Agent Response
This model is the response model for agent system user request.

#### id
The unique identifier of the created request. This ID is used to check the status or manage the request.

#### externalref
This is an optional reference set by the vendor for the system user request. If not provided, it defaults to partyOrgNo. If specified, this value must be used in the token request to Maskinporten.

#### systemid
The id of the registered system in altinn

#### partyorgno
The organisation number that must approve the system user request

#### accesspackages
The list of accesspackages the system bruker is seeking access to.


#### redirecturl
The url that the user must be redirected to after approving or rejecting the system user request

#### status
The status of the request. The status is "new" when the request is created. It changes to "accepted", "rejected", or "denied" depending on how the request is handled by the user.

### confirmurl
The vendor will provide this URL to their customers to approve or reject the system user requests

#### created
The date and time the request was created. This is useful to identify if the request is still valid.