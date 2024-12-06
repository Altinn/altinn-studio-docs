---
title: Input
description: Inputfelt brukes når brukeren skal føre inn tekst eller tall. 
weight: 30
toc: true
---

## Vanlig inputfelt

### Retningslinjer:
- Et inputfelt skal alltid ha en tilhørende label med forklarende tekst.
- Ta en vurdering på om ekstra beskrivelser og hjelpetekster må kobles til input elementet.
- To inputfelt kan plasseres ved siden av hverandre dersom de på et eller annet vis hører sammen. Se eksempel under.
- Deaktivert felt bør unngås. Dersom et felt ikke kan redigeres bør informasjonen heller presenteres i tekst. 

### Eksempel på bruk:
<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/proto/b2w3PuS5c0w8vVU3z8KOwp/Altinn-Studio-Komponenter?page-id=7669%3A77399&node-id=8014-37377&node-type=frame&viewport=892%2C726%2C0.44&t=IfQg2uclVOuOBkf8-1&scaling=contain&content-scaling=fixed&starting-point-node-id=8014%3A37377" allowfullscreen></iframe>

---

### Bredde på inputfelt
Bredden på inputfeltet burde reflektere det som forventes av input fra brukeren. Vi har laget tre standard størrelser som burde dekke de fleste scenarioer og som skal fungere på forskjellige skjermstørrelser. [Les om hvordan du endrer størrelsen her](/altinn-studio/reference/ux/styling/#innergrid-og-labelgrid)

#### Lite input
Brukes til for eksempel telefonnummer, postnummer og årstall

```json
"grid": {
    "xs": 12,
    "innergrid": {
        "xs":5,
        "sm":3, 
        "md":2
    }
}
```
#### Medium input
Brukes til for eksempel kommune og land
```json
"grid": {
    "xs": 12,
    "innergrid": {
        "xs":8,
        "sm":6, 
        "md":6
    }      
}
```
#### Stor input
Brukes til for eksempel navn, e-post adresse og en URL
```json
"grid": {
    "xs": 12,
    "innergrid": {
        "sm":10 
    }
}
```

---

## Stort tekstfelt
Stort tekstfelt benyttes når brukeren skal fylle inn en lengre beskrivelse. De samme retningslinjene som 
inputfelt gjelder. 

### Eksempel på bruk:

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/proto/b2w3PuS5c0w8vVU3z8KOwp/Altinn-Studio-Komponenter?page-id=7669%3A77399&node-id=8158-45097&node-type=frame&viewport=632%2C-140%2C0.3&t=118bLx7dNSZgnbpQ-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=8014%3A37377" allowfullscreen></iframe>

---

## Adresse
For adresse finnes det et fast oppsett der postnr og poststed er sidestilt under datofeltet. Postfelt fylles 
ut automatisk basert på postnr-input. 

### Eksempel på bruk:

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/proto/b2w3PuS5c0w8vVU3z8KOwp/Altinn-Studio-Komponenter?page-id=7669%3A77399&node-id=8134-44753&node-type=frame&viewport=847%2C301%2C0.32&t=1uXtGX4TOvjHid2b-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=8014%3A37377" allowfullscreen></iframe>

---