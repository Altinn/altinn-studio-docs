---
title: Configure Prefill
linktitle: Prefill
description: Altinn Studio will let the developer define prefill for datamodel from register and profile.
---

The prefill configuration is handled by a json file where source values are linked to fields in the app data model.

In order to add prefill to your application this file needs to be added to the repository alongside the datamodel under the `models` folder,
with the same name as the data model it is connected to, and a prefill extension.

So, if you have a data model named `ServiceModel.xsd`, the file should be named `ServiceModel.prefill.json` 

The prefill comes with a json-schema and which gives auto complete on the source fields.
In order to use this auto-complete feature you need to use an IDE or text editor that supports json-schema (such as Visual Studio, Visual Studio Code, IntelliJ etc).
As of now there is no auto complete on the target fields.

The target fields are case insensitve, so writing `Skattyterinforgrp5801.Infogrp5802.OppgavegiverNavnPreutfyltdatadef25795.value` is the same as `skattyterinforgrp5801.infogrp5802.oppgavegiverNavnPreutfyltdatadef25795.value`.

To get started using prefill you can copy the following template into your repository:

```json
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

The easiest way to work on the configuration file is to clone your repository locally, and edit the file in your preferred editor.
To do this open a terminal and run

- `git clone https://altinn.studio/repos/[ORG]/[APP].git`

Then you can create the prefill config file under the `models` folder. 

There are three sources you can prefill from as of now

- ER (enhetsregisteret)
- DSF (det sentrale folkeregisteret)
- UserProfile 

All availiable source fields can bee seen [here](https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json).

The `allowOverwrite ` field is a flag to determine if existing values in the app data model can be overwritten by prefill data. 

Below is an example of a prefill where two fields are connected to the name from DFS and user name from the user profile,
and we have allowed prefill values to overwrite values in the data model:

```json {hl_lines=[7,10]}
{
	"$schema": "https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json",
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

[See issues related to prefill on Github](https://github.com/Altinn/altinn-studio/labels/area%2Fprefill).
