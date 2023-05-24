---
title: Link
description: Knapp eller lenke for å sende brukeren til en ekstern side.
---

Link-komponenten kan brukes for å sende brukeren til en ekstern side. Den kan rendres som enten en knapp eller en lenke.

- [Konfigurasjon](#konfigurasjon)
- [Dynamisk URL](#dynamisk-url)
- [Miljøkonfigurasjon](#miljøkonfigurasjon)

## Konfigurasjon

Link-komponenten kan konfigureres med følgende egenskaper:

| Egenskap                      | Type      | Beskrivelse                                                                   |
| ----------------------------- | --------- | ----------------------------------------------------------------------------- |
| `textResourceBindings.title`  | `string`  | Tittelen på knappen eller lenken.                                             |
| `textResourceBindings.target` | `string`  | URL-en som skal åpnes.                                                        |
| `openInNewTab`                | `boolean` | Om URL-en skal åpnes i et nytt vindu eller ikke.                              |
| `style`                       | `string`  | Stilen til knappen. Kan være en av følgende: `primary`, `secondary` , `link`. |

### Eksempel

```json
{
  "id": "some-id",
  "type": "Link",
  "textResourceBindings": {
    "title": "Bekreft i altinn.no",
    "target": "https://altinn.no/bekreft"
  },
  "openInNewTab": false,
  "style": "primary"
}
```

## Dynamisk URL

I noen tilfeller kan det være nødvendig å ha mer informasjon i query parametere som for eksempel instans id slik at du kan sende brukeren tilbake til instansen fra din eksterne side.
Dette kan gjøres ved å bruke et [uttrykk](/nb/app/development/logic/expressions) i `target`-egenskapen. Se følgende eksempel:

```json
{
  "id": "some-id",
  "type": "Link",
  "textResourceBindings": {
    "title": "Bekreft i altinn.no",
    "target": [
      "concat",
      "https://altinn.no/bekreft?instanceId=",
      ["instanceContext", "instanceId"]
    ]
  },
  "openInNewTab": false,
  "style": "primary"
}
```

## Miljøkonfigurasjon

Dersom din eksterne tjeneste har ulike kjøretidsmiljøer, og du ønsker å sende brukeren til det korrekte miljøet avhengig av miljøet appen kjører i, kan du konfigurere dette i `appsettings.[miljø].json` filene i appen din.
I det følgende eksempelet konfigurerer jeg to ulike URLer avhengig av om appen kjører i staging- eller produksjonsmiljøet.

_appsettings.Staging.json_:

```json
{
  "FrontEndSettings": {
    "redirectUrl": "https://tt02.altinn.no/bekreft?instanceId="
  }
}
```

_appsettings.Production.json_:

```json
{
  "FrontEndSettings": {
    "redirectUrl": "https://altinn.no/bekreft?instanceId="
  }
}
```

_layout.json_:

```json
{
  "id": "some-id",
  "type": "Link",
  "textResourceBindings": {
    "title": "Bekreft i altinn.no",
    "target": [
      "concat",
      ["frontendSettings", "redirectUrl"],
      ["instanceContext", "instanceId"]
    ]
  },
  "openInNewTab": false,
  "style": "primary"
}
```
