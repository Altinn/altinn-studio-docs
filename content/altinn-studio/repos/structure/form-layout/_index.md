---
title: FormLayout.json
description: Beskrivelse av format for skjema-layout
tags: [app-structure, todo]
---

## Overordnet

'FormLayout.json' describes the structure of a schema.

## Format

'FormLayout.json' is divided into three objects: 

- *Components*: describes the components in the schema and configurations connected to the specific component. E.g the binding to a data model.
- *Containers*: describes the layout containers used in the schema and the configurations connected to them. E.g if the container is a repeating group
- *Order*: this object specify the order of the containers and components in the schema.

## Example

Here is an example of what the form layout file could look like:

```json
"components": {
  "a3569c64-2a54-493c-a2a2-213034ed9207": {
	"type": "Input",
	"itemType": "COMPONENT",
	"textResourceBindings": {
		"title": "25795.OppgavegiverNavnPreutfylt.Label",
	},
	"dataModelBindings": {
		"simpleBinding": "skattyterinfor.info.oppgavegiverNavnPreutfylt.value",
	},
  },
  "74b7ff77-a80b-45d4-8f4a-81d7a52e69c6": {
	"type": "Input",
	"itemType": "COMPONENT",
	"textResourceBindings": {
		"title": "25796.OppgavegiverAdressePreutfylt.Label",
	},
	"dataModelBindings": {
		"simpleBinding": "skattyterinfor.info.oppgavegiverAdressePreutfylt.value",
	},
	"hidden": false,
  },
  "95ddc03a-282a-4ed3-b854-18a3921eec0f": {
	"type": "Input",
	"itemType": "COMPONENT",
	"textResourceBindings": {
		"title": "2.KontaktpersonNavn.Label",
	},
	"dataModelBindings": {
		"simpleBinding": "skattyterinfor.kontakt.kontaktpersonNavn.value",
	},
  },
},
"containers": {
  "6eb99041-1ecc-4e83-9312-596a0802e728": {
	"repeating": false,
	"dataModelGroup": null
  },
  "760e9bad-b800-4361-8dce-71206a7fcfbb": {
	"repeating": false,
	"dataModelGroup": null,
	"index": 0
  }
},
"order": {
  "6eb99041-1ecc-4e83-9312-596a0802e728": [
	"760e9bad-b800-4361-8dce-71206a7fcfbb",
	"95ddc03a-282a-4ed3-b854-18a3921eec0f"
  ],
  "760e9bad-b800-4361-8dce-71206a7fcfbb": [
	"a3569c64-2a54-493c-a2a2-213034ed9207",
	"74b7ff77-a80b-45d4-8f4a-81d7a52e69c6"
  ]
}
```
