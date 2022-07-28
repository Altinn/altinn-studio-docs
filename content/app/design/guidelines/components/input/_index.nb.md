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
{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D2816%253A1332" %}}


### Bredde på inputfelt
Bredden på inputfeltet burde reflektere det som forventes av input fra brukeren. Vi har laget tre standard størrelser som burde dekke de fleste scenarioer og som skal fungere på forskjellige skjermstørrelser. [Les om hvordan du endrer størrelsen her](/app/development/ux/styling/#innergrid-og-labelgrid)

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

{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D3495%253A656" %}}

---

## Adresse
For adresse finnes det et fast oppsett der postnr og poststed er sidestilt under datofeltet. Postfelt fylles 
ut automatisk basert på postnr-input. 

### Eksempel på bruk:

{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D2911%253A652" %}}
