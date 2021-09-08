---
title: ServiceConfigurations.json
description: Beskrivelse av format for tjeneste konfigurasjons filen.
tags: [app-structure, todo]
---

## Overordnet

*ServiceConfiguration.json* filen spesifiserer ulike konfigurasjoner lagt til i design prosessen. 
Nå består den av api koblinger, kalkuleringer og dynamikk regler.


## Format

### API connections
Strukturen under beskriver api koblinger til et skjema. Objektet inneholder koblingene og informajson knyttet til api'ene som er i bruk. 
ClientParams og apiResponseMapping viser mapping til datamodellen. externalApiId viser kobling til api'er som kan brukes. 

```json
"data": {
  "externalApi": {
    "APIs": {
      "connections": {
        "c5dadba0-9707-11e8-9c4d-6f48d2b86ea7": {
          "externalApiId": "id1",
          "clientParams": {
            "pnr": "skattyterinfor.kontakt.kontaktpersonPostnummer.value"
          },
          "metaParams": {
            "clientUrl": "fgdb"
          },
          "apiResponseMapping": {
            "skattyterinfor.kontakt.kontaktpersonPoststed.value": "result"
          }
        }
      },
      "externalApisById": {
        "id1": {
          "id": "id1",
          "name": "Bring postnummer API",
          "shortname": "Postnummer",
          "uri": "https://api.bring.com/shippingguide/api/postalCode.json?",
          "description": "Api for å hente poststed basert på postnummer",
          "clientParams": {
            "pnr": {
              "type": "queryString",
              "name": "pnr",
              "value": "",
              "required": true,
              "example": "Example: 2050"
            }
          },
          "metaParams": {
            "clientUrl": {
              "type": "queryString",
              "name": "clientUrl",
              "value": "",
              "required": true,
              "example": "Example: http://www.sitename.com",
              "urlEncode": true
            }
          }
        }
      },
      "externalApisIds": [
        "id1"
      ]
    }
  }
```

### Rule connections
Strukturen under beskriver regler lagt til i et skjema. Objektet inneholder koblingene til regler som finnes på et skjema. 
I objektet er det spesifisert hvilken metode som skal brukes, hvilke felter i datamodellen som skal knyttes til input objektet til metoden
og hvilke felt i datamodellen som skal knyttes til funsjonens output verdi.

```json
"ruleConnection": {
    "d180e210-9707-11e8-9c4d-6f48d2b86ea7": {
        "selectedFunction": "ruleFunctionName",
        "inputParams": {
            "inputParam1": "skattyterinfor.info.enhetOrganisasjonsnummer.value",
            "inputParam2": "skattyterinfor.kontakt.kontaktpersonEPost.value"
        },
        "outParams": {
            "outParam0": "klage.spesifisering.klageSpesifisering.value"
        }
    }
}
```

### Conditional rendering connections
Strukturen under beskriver dynamikk lagt til i et skjema. Objektet inneholder koblingene mellom skjema og dynamiske regler som finnes på et skjema. 
I objektet er det spesifisert hvilken metode som skal brukes, hvilke felter i datamodellen som skal knyttes til input objektet til metoden og 
mapping mellom regelen og elementer i skjemaet.

```json
"conditionalRendering": {
    "d841b430-9707-11e8-9c4d-6f48d2b86ea7": {
        "selectedFunction": "conditionalFunctionName",
        "inputParams": {
            "value": "skattyterinfor.info.oppgavegiverAdressePreutfylt.value"
        },
        "selectedAction": "Hide",
        "selectedFields": {
            "d8416610-9707-11e8-9c4d-6f48d2b86ea7": "94bb4f87-3428-4f2e-9b6a-6ff358ebd173"
        }
    }
}
```
