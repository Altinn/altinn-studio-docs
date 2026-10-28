---
draft: true
title: Logo
description: Slik legger du til og konfigurerer logoen i appen
toc: true
tags: [needsReview]
---

## Bruke logoen til tjenesteeieren

For å bruke logoen du har angitt for organisasjonen i `altinn-orgs.json`, skriver du følgende i `applicationmetadata.json`:

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "logo": {
    "source": "org",
    "displayAppOwnerNameInHeader": true
  }
}
```

Hvis du vil bruke en annen logo for appen, angir du dette i `resource.json` med verdien

{{< code-title >}}
App/config/texts/resource.nb.json
{{< /code-title >}}

```json
{
  "id": "appLogo.url",
  "value": "https://altinncdn.no/orgs/brg/brreg.png"
}
```

Hvis logoen din allerede viser navnet på tjenesteeieren, trenger du kanskje ikke at appen også skal vise det i overskriften. Du kan slå dette av ved å sette `displayAppOwnerNameInHeader` til `false`.

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "logo": {
    ...
    "displayAppOwnerNameInHeader": false
  }
}
```

Hvis du vil overstyre navnet på tjenesteeieren, gjør du dette i `resource.json` med verdien

{{< code-title >}}
App/config/texts/resource.nb.json
{{< /code-title >}}

```json
{
  "id": "appOwner",
  "value": "Brønnøysundregistrene"
}
```

Du kan også overstyre alt-teksten på logoen:

{{< code-title >}}
App/config/texts/resource.nb.json
{{< /code-title >}}

```json
{
  "id": "appLogo.altText",
  "value": "Logo til Brønnøysundregistrene"
}
```

## Bruke egendefinert logo

For å bruke din egen logo, må du først laste den opp.

1. Lag en mappe med navnet `wwwroot` under App-mappen: `App/wwwroot`.
2. Last opp logoen til denne mappen. Følg [designretningslinjene](#designretningslinjer-for-logoen-til-tjenesteeieren) under.

Husk at du må oppdatere hver tekstressursfil (`resource.[språk].json`) for at appen skal vise endringene på alle språk.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Syntaks">}}

{{< code-title >}}
App/config/texts/resource.nb.json
{{< /code-title >}}

```json
{
  "id": "appLogo.url",
  "value": "/{appID}/{logoName}.svg"
}
```

Her viser `appID` til `id`-egenskapen i `applicationmetadata.json`.

{{</content-version-container>}}
{{<content-version-container version-label="Eksempel">}}

{{< code-title >}}
App/config/texts/resource.nb.json
{{< /code-title >}}

```json
{
  "id": "appLogo.url",
  "value": "/digdir/bli-tjenesteeier/logo_digdir.svg"
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

Til slutt endrer du `source` i `applicationmetadata.json` til `resource`, slik at appen henter logoen du lastet opp.

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json {hl_lines=[3]}
"logo": {
    "displayAppOwnerNameInHeader": false,
    "source": "resource",
    "size": "medium"
  },
```

## Egenskaper

### source

Angir hvor appen skal hente logoen fra. Har to gyldige verdier:

- `"org"`: Appen henter logoen fra `altinn-orgs.json`.
- `"resource"`: Appen henter logoen fra tekstressursfilene, med verdien til `id`-en `"appLogo.url"`.

### displayAppOwnerNameInHeader

Angir om appen skal vise navnet på tjenesteeieren ved siden av logoen. Appen henter navnet direkte fra `altinn-orgs.json`, med mindre du har definert `appOwner` i tekstressursfilene.

### size

Standardstørrelsen på logoen passer ikke alltid like godt. Du kan angi størrelsen med `size`-egenskapen, som har tre gyldige verdier:

- `"small"`
- `"medium"`
- `"large"`

Størrelsen er `"small"` som standard, hvis du ikke angir noe.

## Designretningslinjer for logoen til tjenesteeieren

### Størrelse og skala

Logoen bør ha en passende størrelse og nok luft rundt seg, slik at den ikke skaper visuell uorden. En god huskeregel er å holde bredden på logoen til maksimalt 32 px.

### Justering

Appen plasserer alltid logoen øverst til venstre i skjemaet. Det gjør plasseringen konsekvent og lett å kjenne igjen.

### Kontrast og lesbarhet

Logoen bør ha nok kontrast mot bakgrunnen, slik at den er lett å lese. Hvis logoen inneholder tekst, bør teksten være lesbar og ikke for liten.

### Logovarianter

Hvis logoen din finnes i flere varianter (for eksempel i farger, svart-hvitt eller monokrom), velger du varianten som passer best til skjemaets design og bakgrunnsfarge.

### Testing og gjentatte forbedringer

Test plasseringen av logoen på ulike enheter og skjermstørrelser, slik at den ser ut og fungerer som tiltenkt. Test den også på mobilskjermer og nettbrett. Vurder å samle tilbakemeldinger fra brukere eller kolleger, og forbedre designet ved behov.

### Tilgjengelighet

Fargene og plasseringen til logoen bør oppfylle kravene til tilgjengelighet, slik at brukere med ulike synsbehov får med seg innholdet. Skjermlesere trenger alt-tekst på logoen. Alt-teksten bør være på samme språk som resten av siden, for eksempel «Utdanningsdirektoratets logo».
