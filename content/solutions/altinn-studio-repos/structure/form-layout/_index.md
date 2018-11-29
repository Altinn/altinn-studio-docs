---
title: FormLayout.json
description: Beskrivelse av format for skjema-layout
tags: ["tjenester 3.0", "dataformat"]
weight: 100
---

## Overordnet

'FormLayout.json' beskriver strukturen til et skjema.

## Format

'FormLayout.json' er oppdelt i tre objekter: 

- *Components*: beskriver komponentene skjema består av og konfigurasjoner tilknyttet den komponenten som feks binding til datamodel.
- *Containers*: beskriver layout-containere som brukes i skjema, og konfigurasjoner tilknyttet disse som f.eks. om den representerer en 
repeterende gruppe
- *Order*: spesifiserer rekkefølgen containere og komponentenene inne i containerne skal ligge i. 

## Eksempel

Under er et eksempel på hvordan layout filen kan se ut:

```

"components": {
  "a3569c64-2a54-493c-a2a2-213034ed9207": {
	"component": "Input",
	"itemType": "COMPONENT",
	"title": "25795.OppgavegiverNavnPreutfylt.Label",
	"dataModelBinding": "skattyterinfor.info.oppgavegiverNavnPreutfylt.value"
  },
  "74b7ff77-a80b-45d4-8f4a-81d7a52e69c6": {
	"component": "Input",
	"itemType": "COMPONENT",
	"title": "25796.OppgavegiverAdressePreutfylt.Label",
	"dataModelBinding": "skattyterinfor.info.oppgavegiverAdressePreutfylt.value",
	"hidden": false
  },
  "95ddc03a-282a-4ed3-b854-18a3921eec0f": {
	"component": "Input",
	"itemType": "COMPONENT",
	"title": "2.KontaktpersonNavn.Label",
	"dataModelBinding": "skattyterinfor.kontakt.kontaktpersonNavn.value"
  }
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
