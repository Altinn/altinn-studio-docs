---
title: Legge til egendefinert CSS og JavaScript
linktitle: Egendefinert CSS og JavaScript
description: Slik legger du til egne stilark og skript i en app.
weight: 90
draft: true
---

Du kan legge til egne CSS- og JavaScript-filer i appen. Appen finner filene ved oppstart og legger dem inn etter appens egne ressurser.

{{% notice warning %}}
Ikke baser tilpasningene på HTML-elementer, CSS-klasser eller JavaScript-funksjoner i app-frontenden. Disse kan bli endret mellom versjoner.
{{% /notice %}}

## Oppgrader til v9 med eksisterende tilpasninger

Når du kjører `studioctl app upgrade v9`, flytter verktøyet støttede CSS- og JavaScript-tilpasninger fra `App/views/Home/Index.cshtml` automatisk:

- Lenker til egne stilark og skript blir oppføringer i `App/config/assets.json`.
- CSS i `<style>`-elementer blir filer i `App/wwwroot/custom-css`.
- JavaScript i `<script>`-elementer uten `src` blir filer i `App/wwwroot/custom-js`.

Etter at verktøyet har flyttet tilpasningene, sletter det `Index.cshtml`. Appen lager da HTML-en selv og laster inn tilpasningene fra de nye plasseringene. Gå gjennom filene verktøyet har laget, og test at tilpasningene fortsatt fungerer.

Hvis filen inneholder Razor-kode som `@if` eller `@{ ... }`, HTML-elementer verktøyet ikke kjenner igjen, eller et ufullstendig frontend-oppsett, beholder verktøyet `Index.cshtml` og sier fra om hva du må følge opp manuelt.

{{% notice warning %}}
Hvis `Index.cshtml` fortsatt finnes i v9-appen, tolker backenden det som at du leverer frontenden selv. Den innebygde Altinn 3-appfrontenden vil da ikke fungere. Du må velge hvordan du vil at appen skal fungere videre:

- Vil du bruke den innebygde appfrontenden, må du flytte tilpasningene til plasseringene beskrevet i denne artikkelen og slette `Index.cshtml`.
- Vil du beholde `Index.cshtml`, må du levere og vedlikeholde en egen frontend som fungerer med v9-backenden.
{{% /notice %}}

## Legg til lokale filer

Opprett én eller begge av disse mappene i appen:

```text
App/
└── wwwroot/
    ├── custom-css/
    │   └── custom.css
    └── custom-js/
        └── custom.js
```

- Legg stilark i `App/wwwroot/custom-css`.
- Legg skript i `App/wwwroot/custom-js`.

Alle filene i mappene lastes automatisk. Du trenger ikke å registrere dem i en konfigurasjonsfil. Start appen på nytt etter at du har lagt til, fjernet eller gitt nytt navn til en fil, slik at appen leser fillisten på nytt.

Stilarkene lastes etter appens standardstilark. Skriptene lastes etter app-frontenden. Hvis du legger til flere filer, bør hver fil ha ett tydelig ansvar og ikke være avhengig av en bestemt innlastingsrekkefølge.

## Last inn ressurser fra eksterne adresser

Du kan registrere eksterne stilark og skript i `App/config/assets.json`. Bruk bare ressurser fra leverandører du stoler på.

{{< code-title >}}
App/config/assets.json
{{< /code-title >}}

```json
{
  "stylesheets": [
    {
      "url": "https://example.com/styles.css",
      "media": "screen",
      "integrity": "sha384-...",
      "crossorigin": true
    }
  ],
  "scripts": [
    {
      "url": "https://example.com/script.js",
      "type": "module",
      "integrity": "sha384-...",
      "crossorigin": true
    }
  ]
}
```

Begge listene er valgfrie. For hvert stilark eller skript er bare `url` påkrevd. Et stilark kan i tillegg ha egenskapene `media`, `integrity` og `crossorigin`. Et skript kan ha `type`, `async`, `defer`, `nomodule`, `integrity` og `crossorigin`. Den eneste støttede verdien for `type` er `module`.

Bruk [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) (`integrity`) når leverandøren tilbyr en kontrollsum. Da kontrollerer nettleseren at ressursen ikke er endret. Sett også `crossorigin` til `true` når leverandøren krever det for integritetskontrollen.

Start appen på nytt etter at du har endret `assets.json`.

## Test tilpasningene

Test tilpasningene lokalt og i alle miljøer der appen skal kjøre. Kontroller særlig at

- skjemaet fortsatt kan brukes med tastatur og skjermleser
- tekst, knapper og feilmeldinger er synlige ved ulike skjermstørrelser
- skriptfeil ikke hindrer brukeren i å fylle ut eller sende inn skjemaet
- eksterne ressurser er tilgjengelige og sikkerhetsinnstillingene i miljøet tillater dem
