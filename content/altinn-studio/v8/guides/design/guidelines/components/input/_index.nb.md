---
title: Input
description: Lite tekstfelt brukes når brukeren skal føre inn tekst eller tall. 
weight: 30
toc: true
---

## Vanlig inputfelt

### Retningslinjer:
- Lite tekstfelt skal alltid ha en tilhørende label med forklarende tekst.
- Ta en vurdering på om ekstra beskrivelser og hjelpetekster må kobles til input elementet.
- To tekstfelt kan plasseres ved siden av hverandre dersom de på et eller annet vis hører sammen. Se eksempel under.
- Deaktivert felt bør unngås. Dersom et felt ikke kan redigeres bør informasjonen heller presenteres i tekst. 

### Eksempel på bruk:

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://embed.figma.com/design/b2w3PuS5c0w8vVU3z8KOwp/Altinn-Studio---Prototype-Kit?m=auto&node-id=12296-25230&embed-host=share" allowfullscreen></iframe>

---

### Bredde på inputfelt
Bredden på inputfeltet burde reflektere det som forventes av input fra brukeren. Vi har laget tre standard størrelser som burde dekke de fleste scenarioer og som skal fungere på forskjellige skjermstørrelser. [Les om hvordan du endrer størrelsen her](/nb/altinn-studio/v8/reference/ux/styling/#innergrid-og-labelgrid)

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

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://embed.figma.com/design/b2w3PuS5c0w8vVU3z8KOwp/Altinn-Studio---Prototype-Kit?m=auto&node-id=12296-26585&embed-host=share" allowfullscreen></iframe>
---

## Adresse
For adresse finnes det et fast oppsett der postnr og poststed er sidestilt under datofeltet. Postfelt fylles 
ut automatisk basert på postnr-input. 

### Eksempel på bruk:

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://embed.figma.com/design/b2w3PuS5c0w8vVU3z8KOwp/Altinn-Studio---Prototype-Kit?m=auto&node-id=12298-82778&embed-host=share" allowfullscreen></iframe>

---