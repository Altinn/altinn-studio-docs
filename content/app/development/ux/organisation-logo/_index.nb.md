---
title: Bruk tjenesteeiers logo
description: Hvordan konfigurere bruk av tjenesteeiers logo
weight: 30
---

For å bruke en tjenesteeiers logo kan du spesifisere dette i `applicationmetadata.json`:

```json
// applicationmetadata.json
{
  "logo": {
    "source": "org",
    "displayAppOwnerNameInHeader": true
  }
}
```

Når du aktiverer denne opsjonen, vil logoen som standard bli den som er spesifisert for organisasjonen i
altinn-orgs.json.

Hvis du ønsker å bruke en annen logo for applikasjonen, kan du spesifisere dette i resource.json med verdien

```json
// resource.nb.json 
{
  "id": "appLogo.url",
  "value": "https://altinncdn.no/orgs/brg/brreg.png"
}
```

Hvis logoen din allerede inneholder navnet på organisasjonen som applikasjonen representerer, ønsker du kanskje ikke at
app-eieren skal vises i overskriften. Du kan deaktivere dette ved å sette verdien til

```json
// applicationmetadata.json
{
  "logo": {
    ...
    "displayAppOwnerNameInHeader": false
  }
}
```

Dersom du ønsker å overstyre navnet på tjenesteeieren, kan du gjøre dette i `resource.json` med verdien

```json
{
  "id": "appOwner",
  "value": "Brønnøysundregistrene"
}
```

Du kan også overstyle alt-teksten på logoen:

```json
{
  "id": "appLogo.altText",
  "value": "Logo til Brønnøysundregistrene"
}

```

## Egenskaper

#### source

Spesifiserer fra hvor kilden til logen skal hentes. Har to gyldige verdier:
- `"org"`: Logoen hentes fra `altinn-orgs.json`.
- `"resource"`: Logoen hentes fra tekstressursfilene. Henter verdien med id `"appLogo.url"`

#### displayAppOwnerNameInHeader

Spesifiserer om tjenesteeiers navn skal skrives ut ved siden av logoen. Henter navnet på tjenesteeier
direkte fra `altinn-orgs.json` dersom `appOwner` ikke er definert i tekstressursfilene



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
