---
title: Audio
linktitle: Audio
description: Lydspillerkomponent
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
---

## Bruk

Lydkomponenten brukes til å vise en lydspiller i applikasjonen din. Den kan brukes frittstående eller som en mediekomponent innenfor andre komponenter som [Kort](../cards).

Når den brukes innenfor en Kort-komponent, kan Lydkomponenten refereres til i `media`-egenskapen til et kort for å vise en lydspiller øverst eller nederst på kortet.

### Anatomi

En standard lydspiller inkluderer vanligvis:

1. Spill/pause-knapp
2. Fremdriftsindikator
3. Visning av nåværende tid og varighet
4. Volumkontroll
5. Nedlastingsknapp (valgfritt)

### Relatert

- [Kort](../cards) - Kan bruke Lydkomponenter som medieinnhold
- [Bilde](../image) - En annen mediekomponent som kan brukes i Kort
- [Video](../video) - Videospillerkomponent som også kan brukes i Kort

## Egenskaper

Følgende er en liste over tilgjengelige egenskaper for {{% title %}}. Listen er automatisk generert basert på komponentens JSON schema (se link).

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter. Listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

<!-- Shortkoden `component-props` genererer automatisk en liste over komponentegenskaper fra komponentens JSON schema.
Komponentnavnet kan gis eksplisitt som argument (f.eks. `component-props "Grid"`).
Hvis ingen argument gis, henter shortkoden komponentnavnet fra 'schemaname' i frontmatter.
Hvis komponenten ikke har JSON schema, kommenter ut tekst og shortcode i denne delen og lag evt. tabell manuelt med de viktigste egenskapene (kolonner: Egenskap, Type, Beskrivelse).
 -->

{{% component-props %}}

## Konfigurering

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio med flere muligheter for innstillinger!
 Dokumentasjonen oppdateres fortløpende, men det kan være flere innstillinger tilgjengelig enn det som beskrives her og noen innstillinger kan være i betaversjon.
{{% /notice %}}

### Legg til komponent

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Du kan legge til en komponent i [Altinn Studio Designer](/nb/altinn-studio/getting-started/) ved å dra den fra komponent-listen til sideområdet.
Når du velger komponenten, vises innstillingspanelet for den.

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Grunnleggende komponent:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="6-"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  {
    "data": {
      "layout": [
        {
          "id": "myAudio",
          "type": "Audio",
          "source": "https://example.com/audio.mp3",
          "title": "Lydtittel",
          "description": "Lydbeskrivelse"
        }
      ]
    }
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

<!-- 
Legg til seksjoner som beskriver konfigurasjonen av egenskaper som er spesifikke for komponenten.
- Bruk nedenstående shortcode for Designer/Kode-faner for å vise innstillingene.
- Inkluder skjermbilder og eksempler der det er hensiktsmessig.
- Hvis innstillingene ikke er tilgjengelige i Altinn Studio, bruk kun fanen for kode og legg til følgende shortcode rett under overskriften til avsnittet:
    {{% notice info %}}
    Innstillingene for denne egenskapen er foreløpig ikke tilgjengelig i Altinn Studio og må konfigureres manuelt.
    {{% /notice %}}
- Legg til filsti eller annen informasjon inni code-title (vises øverst i kodeblokken).
- Marker gjerne relevante deler av koden vha hl_lines.
- Legg til dokumentasjon for felles egenskaper ved å bruke shortcode `property-docs` med hakeparenteser (`< >`) og argument `prop="{propName}"`. `propName` må samsvare med filnavn (som bør samsvare med JSON-skjema-navn).

Shortcode for faner:

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

{{</content-version-container>}}

{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines=""}
{
  // component properties
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

-->

## Eksempler

### Bruke Lyd i en Kort-komponent

Lydkomponenten brukes ofte som en mediekomponent innenfor Kort. Her er et eksempel på hvordan man refererer til en Lydkomponent i en Kort-komponent:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json
{
  "id": "myCards",
  "type": "Cards",
  "minWidth": "250px",
  "minMediaHeight": "150px",
  "mediaPosition": "top",
  "cards": [
    {
      "title": "Lydeksempel",
      "description": "Dette kortet viser en lydspiller",
      "media": "myAudio"
    }
  ]
}
```

I dette eksempelet refererer `media`-egenskapen til kortet til ID-en til en Lydkomponent (`myAudio`) som er definert et annet sted i layouten.
