---
title: Configure Prefill
description: Altinn Studio will let the developer define prefill for datamodel from register and profile
---

The prefill configuration is handled by a json file where source values are linked to fields in the app data model.  In order to add prefill to your application this file needs to be added to the repository alongside the datamodel under the `Model` folder, with the same name as the data model it is connected to, and a prefill extension. So, if you have a data model named `ServiceModel.xsd`, the file should be named `ServiceModel.prefill.json` 

The prefill comes with a json-schema and which gives auto complete on the source fields. As of now there is no auto complete on the target fields.

To get started using prefill you can copy the following template into your repository:

```
{
    "$schema": "https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json",
	"allowOverwrite": false,
	"ER": {
	},
	"DSF": {
	},
	"UserProfile": {
	}
}
```

There are three sources you can prefill from as of now

- ER (enhetsregisteret)
- DSF (det sentrale folkeregisteret)
- UserProfile 


The `allowOverwrite ` field is a flag to determine if existing values in the app data model can be overwritten by prefill data. 

Below is an example of a prefill where two fields are connected to the name from DFS and user name from the user profile, and we have allowed prefill values to overwrite values in the data model:

```
{
	"allowOverwrite": true,
	"ER": {
	},
	"DSF": {
		"Name": "Skattyterinforgrp5801.infogrp5802.OppgavegiverNavnPreutfyltdatadef25795.value"
	},
	"UserProfile": {
		"UserName": "Skattyterinforgrp5801.infogrp5802.OppgavegiverAdressePreutfyltdatadef25796.value"
	}
}
```

[See issues related to prefill on Github](https://github.com/Altinn/altinn-studio/labels/prefill)