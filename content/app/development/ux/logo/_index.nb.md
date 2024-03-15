---
title: Logo
description: Hvordan legge til og konfigurere logo i applikasjon
toc: true
weight: 30
---

{{%notice warning%}}

Du må være på versjon 7.14.0 av `Altinn.App.Core` eller høyere for å kunne sette applikasjonslogo

{{% /notice%}}


## Bruke logo fra tjenesteeier
For å bruke tjenesteeiers logo spesifisert for organisasjonen i `altinn-orgs.json` kan du skrive følgende i `applicationmetadata.json`:
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


Hvis du ønsker å bruke en annen logo for applikasjonen, kan du spesifisere dette i resource.json med verdien

{{< code-title >}}
App/config/texts/resource.nb.json
{{< /code-title >}}
```json 
{
  "id": "appLogo.url",
  "value": "https://altinncdn.no/orgs/brg/brreg.png"
}
```

Hvis logoen din allerede inneholder navnet på organisasjonen som applikasjonen representerer, ønsker du kanskje ikke at
app-eieren skal vises i overskriften. Du kan deaktivere dette ved å sette `displayAppOwnerNameInHeader` verdien til `false`.

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

Dersom du ønsker å overstyre navnet på tjenesteeieren, kan du gjøre dette i `resource.json` med verdien

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

## Bruk egendefinert logo

For å bruke din egen logo, må den først lastes opp.

1. Lage en mappe med navnet `wwwroot`. Denne skal ligge under App-mappen, `App/wwwroot`.
2. Last opp logoen, som følger [designretningslinjene](#designretningslinjer-for-app-eier-logo), til mappen.

Husk at hver tekstressursfil (`resource.[language].json`) må oppdateres for at endringene skal vises i alle språk.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Endring">}}

{{< code-title >}}
App/config/texts/resource.nb.json
{{< /code-title >}}

```json
{
  "id": "appLogo.url",
  "value": "/{appID}/{logoName}.svg"
}
```
Her refererer `appID` til `id` egenskapen i `applicationmetadata.json`.

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

Til slutt så må `source` i `applicationmetadata.json` endres til å være `resource` for å hente logoen som ble lastet opp.
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

#### source

Spesifiserer fra hvor kilden til logen skal hentes. Har to gyldige verdier:
- `"org"`: Logoen hentes fra `altinn-orgs.json`.
- `"resource"`: Logoen hentes fra tekstressursfilene. Henter verdien med id `"appLogo.url"`

#### displayAppOwnerNameInHeader

Spesifiserer om tjenesteeiers navn skal skrives ut ved siden av logoen. Henter navnet på tjenesteeier
direkte fra `altinn-orgs.json` dersom `appOwner` ikke er definert i tekstressursfilene


#### size 

{{%notice warning%}}

Du må ha versjon 7.15.0 av `Altinn.App.Core` eller høyere for å kunne sette størrelse på logoen

{{% /notice%}}


For noen logoer passer ikke alltid standardstørrelsen til logoen. Størrelsen kan spesifiseres ved hjelp av `size`-egenskapen.
Den har tre gyldige verdier:

- `"small"`
- `"medium"`
- `"large"`

Størrelsen er som standard satt til `"small"` hvis den ikke er spesifisert.

## Designretningslinjer for app-eier logo

#### Størrelse og skala:

Logoet bør ha en passende størrelse og ha nok klart rom rundt seg for å unngå visuell uorden. En god huskeregel er å
holde logoens bredde til maksimalt 32px.

#### Justering:

Logoet vil bli justert til øvre venstre hjørne av skjemaet for å opprettholde konsistens og enkel gjenkjennelse.

#### Kontrast og lesbarhet:

Logoet bør ha tilstrekkelig kontrast mot bakgrunnen for å sikre at det er lesbart. Hvis logoen inkluderer tekst, bør
teksten være lesbar og ikke for liten.

#### Logovarianter:

Hvis logoen din finnes i ulike varianter (for eksempel farge, svart-hvitt, monokrom), velg den som passer best til
skjemaets design og bakgrunnsfarge.

#### Testing og iterasjon:

Plasseringen av logoen bør testes på ulike enheter og skjermstørrelser for å sikre at den ser ut og fungerer som
tiltenkt. Test den på mobilskjermer og nettbrett. Vurder å samle tilbakemeldinger fra brukere eller kolleger og gjøre
iterasjoner på designet om nødvendig.

#### Tilgjengelighet:

Logoens farger og plassering bør oppfylle tilgjengelighetsretningslinjer for å imøtekomme brukere med ulike visuelle
behov. Alt-tekst på logoen er nødvendig for skjermleser. Alt-teksten på logoen bør gjenspeile valgt språk, f.eks. "
Utdanningsdirektoratets logo"
