---
title: Egendefinert CSS og JavaScript
linktitle: Egendefinert CSS og JavaScript
description: Slik legger du til egne stilark og skript i en app.
weight: 90
draft: true
---

Du kan legge til egne CSS- og JavaScript-filer uten å endre siden som laster appen. Appen finner filene ved oppstart og legger dem inn etter appens egne ressurser.

{{% notice warning %}}
Egendefinert kode vedlikeholdes av tjenesteeier. Ikke baser koden på interne HTML-elementer, CSS-klasser eller JavaScript-funksjoner i app-frontenden. Disse kan endres uten å være en del av den offentlige kontrakten.
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

Begge listene er valgfrie. Et stilark støtter egenskapene `url`, `media`, `integrity` og `crossorigin`. Et skript støtter `url`, `type`, `async`, `defer`, `nomodule`, `integrity` og `crossorigin`. Den eneste støttede verdien for `type` er `module`.

Bruk [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) (`integrity`) når leverandøren tilbyr en kontrollsum. Da kontrollerer nettleseren at ressursen ikke er endret. Sett også `crossorigin` til `true` når leverandøren krever det for integritetskontrollen.

Start appen på nytt etter at du har endret `assets.json`.

## Test tilpasningene

Test tilpasningene lokalt og i alle miljøer der appen skal kjøre. Kontroller særlig at:

- skjemaet fortsatt kan brukes med tastatur og skjermleser
- tekst, knapper og feilmeldinger er synlige ved ulike skjermstørrelser
- skriptfeil ikke hindrer brukeren i å fylle ut eller sende inn skjemaet
- eksterne ressurser er tilgjengelige og tillatt av sikkerhetsinnstillingene i miljøet
