---
title: RuleHandler.js
description: Beskrivelse av format for rule handler js filen.
tags: [app-structure, todo]
---

## Overordnet

Filen *RuleHandler.js* brukes til å lage metoder som skal benyttes for til kalkuleringer/regler på felter i datamodellen eller for å skape dynamikk i et skjema. 

## Format

Filen består av 4 objekter, 2 av de benyttes for til kalkuleringer/regler i skjema og de 2 andre benyttes til dynamikk i skjema.
**ruleHandlerObject** og **conditionalRuleHandlerObject** skal benyttes til å definere metoder som kan brukes til kalkuleringer/regler i skjema. 
Alle metodene har et objekt som input parameter og en output verdi, strukturen på input objektet er beskrevet i **ruleHandlerHelper** og **conditionalRuleHandlerHelper**.
Filen har følgende struktur:

```javascript
var ruleHandlerObject = {
    ruleFunctionName: (obj) => {
        return obj.inputParam1 + " " + obj.inputParam2;
    },
}

var ruleHandlerHelper = {
  ruleFunctionName: () => {
    return {
      inputParam1: "inputParam1",
      inputParam2: "inputParam2"
    };
  },
}

var conditionalRuleHandlerObject = {
  conditionalFunctionName: (obj) => {
    return obj.input1 > 10;
  },
}

var conditionalRuleHandlerHelper = {
  conditionalFunctionName: () => {
    return {
      input1: "input1"
    };
  },
}
```

Ved innlasting i skjemadesigneren vil filen lastes inn i window elementet og kalles ved hjelp av window.conditionalRuleHandlerObject.conditionalFunctionName. 
Kalkuleringer/regler kjøres når skjema fylles ut. Så regler kan testes både i desinger, preview og i runtime. 
Kalkuleringer/regler input objekt sine parameter og output parameteret kobles til felter i datamodellen. 

Dynamikk regler manipulerer skjema ved å skjule eller vise felter. 
Input objektet kobles til datamodelfelter. 
Deretter må brukeren spesifisere hva som skal skje hvis metoden returnerer true. Per nå er det kun mulig å velge å skjule eller vise felter. 
Deretter knytter man 'action' til felter som er lagt inn i skjema. Man kan knytte så mange felter man vil til en dynamisk regler.
