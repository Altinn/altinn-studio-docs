---
title: IFrame
description: IFrame-komponenten kan brukes til å rendre din egen HTML og CSS i en Altinn-app.
toc: false
weight: 10
---

## På denne siden

- [Hvorfor bruke IFrame-komponenten](/nb/app/development/ux/components/iframe/#hvorfor-bruke-iframe-komponenten)
- [Sikkerhets- og ytelsesbekymringer](/nb/app/development/ux/components/iframe/#sikkerhets--og-ytelsesbekymringer)
- [Bekymringer angående tilgjengelighetserklæring](/nb/app/development/ux/components/iframe/#bekymringer-angående-tilgjengelighetserklæring)
- [Grunnleggende implementering av IFrame-komponenten](/nb/app/development/ux/components/iframe/#grunnleggende-implementering-av-iframe-komponenten)
- [Avansert implementering av IFrame-komponenten](/nb/app/development/ux/components/iframe/#avansert-implementering-av-iframe-komponenten)
- [Sandbox-restriksjoner](/nb/app/development/ux/components/iframe/#sandbox-restriksjoner)

## Hvorfor bruke IFrame-komponenten

Som en tjenesteutvikler kan det være ønskelig å inkludere din egen HTML og CSS i en Altinn-app, for eksempel for å vise eksternt innhold som skal ligne selskapets merkevareprofil som utvikler appen.

Nå er det mulig å oppnå dette ved hjelp av IFrame-komponenten, som gjør det mulig å rendre HTML og CSS i eksisterende Altinn-applikasjoner.

**Tips:** Det kan være lurt å vurdere om det er strengt tatt nødvendig å bruke denne komponenten eller ikke. Det er ikke optimalt å benytte seg av mange iframe-er i applikasjonen. Det beste er å unngå dem, dersom det er mulig.

## Sikkerhets- og ytelsesbekymringer

{{<notice warning>}}
Det er viktig å merke seg at innholdet i iframe-en vil være fra en annen kilde enn appen selv, og dette kan påvirke ytelsen og potensielt sikkerheten til appen.

Det er derfor avgjørende å sikre at innholdet som lastes inn i iframe-en er pålitelig og sikkert, og at det ikke inneholder skadelig kode eller potensielt farlige tredjepartsressurser som du som tjenesteutvikler ikke har kontroll over.
{{</notice>}}

## Bekymringer angående tilgjengelighetserklæring

{{<notice info>}}
Som en tjenesteutvikler er du ansvarlig for å sikre at HTML-koden som lastes inn i IFrame-komponenten overholder tilgjengelighetslover og -regler, slik at alle brukere kan få tilgang til innholdet på en enkel og effektiv måte. Dette inkluderer å sørge for at innholdet er tilgjengelig for personer med ulike funksjonshemminger, som syns- eller hørselsnedsettelser, og at det er enkelt å navigere og bruke for alle brukere.
Det er også viktig å sikre at innholdet er tilgjengelig på alle plattformer og enheter, inkludert mobiltelefoner og nettbrett. Ved å følge disse retningslinjene kan du sikre at brukerne har den best mulige opplevelsen når de bruker din Altinn-app sammen med din egen HTML og CSS innenfor iframe-komponenten.
{{</notice>}}

## Grunnleggende implementering av IFrame-komponenten

For å bruke IFrame-komponenten i en Altinn-app, legger du enkelt til IFrame-komponenten i layout-filen din, som vist nedenfor.

```json
{
  "id": "unik-komponent-id",
  "type": "IFrame",
  "textResourceBindings": {
    "title": "enkel-overskrift"
  }
}
```

Nå lurer du kanskje på hvordan du kan legge inn HTML og CSS i IFrame-komponenten. Dette kan oppnås ved å legge til ønsket HTML- og CSS-kode i tekstressursfilen din.

```json
{
  "id": "enkel-overskrift",
  "value": "<html><head><title>Enkel overskrift</title><style>h1 { color: red; }</style></head><body><h1>Min enkle overskrift</h1></html>"
}
```

{{<notice info>}}
Det er viktig å merke seg at ID-en som er spesifisert i tekstressursfilen, må samsvare med tittelen som er angitt i delen textResourceBindings i layout-filen din.
{{</notice>}}

Nå, hvis vi besøker appen vår, bør vi kunne se at IFrame-komponenten rendre en rød overskrift med teksten "Min enkle overskrift."

## Avansert implementering av IFrame-komponenten

Noen ganger er det ikke nok å bruke statisk HTML og CSS direkte skrevet inn i tekstressursfilen. Det er situasjoner der du må hente HTML dynamisk basert på visse kriterier eller utføre beregninger.
For å hente HTML dynamisk kan du benytte deg av [ProcessDataRead](/nb/app/development/configuration/stateless/#datapopulering). Du kan lese mer om [dataprosessering her](/nb/app/development/logic/dataprocessing/).

ProcessDataRead og dataprosessering gir muligheten til å forbehandle data før det sendes tilbake til frontend for rendring.

## Sandbox-restriksjoner

IFrame-komponenten bruker sandbox-attributten som pålegger sikkerhets-restriksjoner for hvilke muligheter man har innenfor iframen.
Disse restriksjonene kan fjernes individuelt ved å legge til de ønskede egenskapene i sandbox-attributten. Se <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox>.
Fra før av er `allow-same-origin` aktivert. Noen av de andre restriksjonene kan fjernes ved å konfigurere `sandbox`-egenskapen på IFrame-komponenten.

Dersom du ønsker å tillate å åpne lenker i en ny fane, kan du bruke følgende konfigurasjon:

```json
{
  "id": "unik-komponent-id",
  "type": "IFrame",
  "textResourceBindings": {
    "title": "innhold-med-link"
  },
  "sandbox": {
    "allowPopups": true,
    "allowPopupsToEscapeSandbox": true
  }
}
```

**NB**: `allowPopupsToEscapeSandbox` fjerner alle sandbox-restriksjoner på den nye siden som åpnes. Uten å sette denne egenskapen vil ikke siden som åpnes kunne kjøre javascript.
