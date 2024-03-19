---
title: PDF
description: Hvordan konfigurere generering av PDF
weight: 50
---

{{%notice warning%}}
## Ny PDF-generering
### Aktivere ny PDF-generering
Fra og med versjon 7.5 av nuget-pakkene (Altinn.App.Api og Altinn.App.Core) er det lansert en ny måte å generere PDF-er på. Denne nye måten kan skrus av og på ved å legge til følgende seksjon og innstilling i _appsettings.json_.

```json
  "FeatureManagement": {
    "NewPdfGeneration": true
  }
```

Dette vil sørge for at den nye PDF-tjenesten kalles. Denne aksepterer en URL som peker tilbake til en automatisk generert side i appen. Siden bygges opp og danner grunnlaget for PDF-en. Grensesnittet `IPdfFormatter` som dokumentert nedenfor er fortsatt relevant hvis du trenger spesiallogikk for å skjule komponenter/sider fra PDF-en.

### Innstillinger
Selv om standardinnstillingene for den nye tjenesten skal være nok for de fleste applikasjoner, kan de overstyres ved å legge til en PdfGeneratorSettings-seksjon i _appsettings.json_ (standardinnstillinger vises under).

```json
  "PdfGeneratorSettings": {
    "ServiceEndpointUri": "https://{org}.apps.{hostName}/{appId}/#/instance/{instanceId}",
    "AppPdfPageUriTemplate": "https://{org}.apps.{hostName}/{appId}/#/instance/{instanceId}?pdf=1",
    "WaitForSelector": "#readyForPrint",
    "WaitForTime": 5000
  }
```

Hvis WaitForSelector er satt så blir WaitForTime ignorert. WaitForSelector sikrer at siden er ferdig oppbygd og presentert før PDF-en genereres.

{{% /notice%}}

Det er to ulike måter å konfigurere PDF-genereringen på:

1. [Automatisk basert på skjema-sidene dine](#automatisk-konfigurasjon)
2. [Manuelt basert på en egendefinert PDF-side](#egendefinert-konfigurasjon)

Det er også mulig å se en [forhåndsvisning](#forhåndsvisning-i-nettleseren) av hvordan PDF-en kommer til å se ut i nettleseren imens du jobber med den (kun v7.5+).

## Automatisk konfigurasjon

Denne metoden brukes som standard dersom du ikke har spesifisert en [egendefinert PDF-side](#egendefinert-konfigurasjon).
Denne metoden trekker ut alle sidene og komponentene i den rekkefølgen de vises, og tar de med i PDF-dokumentet.

### Ekskludering av sider og komponenter

Som regel har man behov for å ekskludere visse sider og komponenter som ikke er relevant for PDF-dokumentet.
Dette kan konfigureres på to ulike måter:

1. Ved å modifisere `Settings.json`-filen for layout-settet.
2. Programmatisk ved å implementere det i kode. Dette åpner for dynamisk ekskludering basert på skjemadataen.

Avhengig av hvilken versjon du kjører setter man opp den programmatiske metoden litt forskjellig, men logikken er helt lik. Oversikten under viser hvordan det settes opp for versjonen du kjører:
{{<content-version-selector classes="border-box">}}


{{<content-version-container version-label="v7">}}

1. Opprett en klasse som implementerer `IPdfFormatter`-grensesnittet som ligger i `Altinn.App.Core.Features`-navnerommet.  
    Du kan navngi og plassere filene i den mappestrukturen du selv ønsker i prosjektet ditt. Men vi anbefaler at du benytter meningsfulle navnerom som i et hvilket som helst annet .Net-prosjekt.
2. Registrér din implementering i _Program.cs_-klassen.
    ```C#
    services.AddTransient<IPdfFormatter, PdfFormatter>();
    ```
    Dette sørger for at din kode er kjent for applikasjonen og at koden blir kjørt når den skal.
{{</content-version-container>}}

{{<content-version-container version-label="v4, v5, v6">}}
Endre `PdfHandler.cs`-filen under `App/logic/Print`-mappen.
{{</content-version-container>}}

{{</content-version-selector>}}

{{% expandlarge id="exclude-page" header="Ekskludere sider" %}}

### 1. Settings.json

Legg til en liste med sidenavn som skal eksluderes på `excludeFromPdf` under `pages`:

```json {linenos=false,hl_lines=["5"]}
{
   "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
   "pages": {
      "order": ["side1", "side2"],
      "excludeFromPdf": ["side2"]
   }
}
```

### 2. Programmatisk

```cs
public async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
{
  if (data.GetType() == typeof(Skjema))
  {
    layoutSettings.Pages.ExcludeFromPdf.Add("side2");
  }
  return await Task.FromResult(layoutSettings);
}
```
<br>

**NB**: Du trenger kun å velge én av disse metodene.
{{% /expandlarge %}}

{{% expandlarge id="exclude-component" header="Ekskludere komponenter" %}}

### 1. Settings.json

Legg til en liste over komponent-ID-er som skal ekskluderes på `excludeFromPdf` under `components`:

```json {linenos=false,hl_lines=["7"]}
{
   "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
   "pages": {
      "order": ["side1"]
   },
   "components": {
      "excludeFromPdf": ["bilde-komponent-id"]
   }
}
```

### 2. Programmatisk

```cs
public async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
{
  if (data.GetType() == typeof(Skjema))
  {
    layoutSettings.Components.ExcludeFromPdf.Add("bilde-komponent-id");
  }
  return await Task.FromResult(layoutSettings);
}
```
<br>

**NB**: Du trenger kun å velge én av disse metodene.
{{% /expandlarge %}}

{{% expandlarge id="exclude-specific-component" header="Ekskludere komponenter fra en spesifikk rad i en repeterende gruppe" %}}
Dersom du trenger å ekskludere en komponent fra en spesifikk rad i en repeterende gruppe må du spesifisere radnummeret i tillegg til komponent-ID-en.

Formatet er: `komponentID-<rad-nummer>`.

### 1. Settings.json

```json {linenos=false,hl_lines=["7"]}
{
   "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
   "pages": {
      "order": ["side1"]
   },
   "components": {
      "excludeFromPdf": ["komponent-i-gruppe-1"]
   }
}
```

### 2. Programmatisk

```cs
public async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
{
  if (data.GetType() == typeof(Skjema))
  {
    layoutSettings.Components.ExcludeFromPdf.Add("komponent-i-gruppe-1");
  }
  return await Task.FromResult(layoutSettings);
}
```
<br>

**NB**: Du trenger kun å velge én av disse metodene.
{{% /expandlarge %}}

## Egendefinert konfigurasjon

{{%notice warning%}}

Denne metoden er kun tilgjengelig i versjon 7.5 og høyere.

{{% /notice%}}

Denne metoden lar deg spesifisere en helt egendefinert PDF ved å definere en layout-fil som bestemmer hva den skal inneholde.

For å ta i bruk denne metoden må du opprette en ny layout-fil for PDF-en og sette `pdfLayoutName` i `Settings.json` til å peke til den filen:
```json {linenos=false,hl_lines=["5"]}
{
   "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
   "pages": {
      "order": ["side1"],
      "pdfLayoutName": "minPdfLayout"
   }
}
```

Denne layout-filen konfigureres på akkurat samme måte som andre layout-filer, bortsett fra at ikke alle komponenttyper er tilgjengelig. Komponenttypene som kan brukes i en PDF-layout er følgende:

- `Summary`
- `Group`
- `InstanceInformation`
- `Header`
- `Paragraph`
- `Image`
- `Panel`

{{% expandlarge id="include-instance-information" header="Inkludere instans-informasjon" %}}

Den automatiske PDF-layouten inkluder en forside med instans-informasjon som avsender, mottaker, dato, og referansenummer. Dette bør du også inkludere i din egendefinerte PDF-layout. Eksempelet under viser hvordan du kan inkludere denne informasjonen på akkurat samme måte som i den automatiske metoden:

```json {linenos=false,hl_lines=["5-17"]}
{
   "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
   "data": {
      "layout": [
         {
            "id": "pdf-instance",
            "type": "InstanceInformation",
            "elements": {
               "dateSent": true,
               "sender": true,
               "receiver": true,
               "referenceNumber": true
            },
            "pageBreak": {
               "breakAfter": "always"
            }
         },
         ...
      ]
   }
}
```

{{% /expandlarge %}}

{{% expandlarge id="adding-page-breaks" header="Legge til sideskift" %}}

Du kan spesifisere at en komponent skal starte på en ny side eller at et sideskift skal komme rett etter en komponent ved å bruke `pageBreak`-egenskapen. Denne egenskapen er tilgjengelig på alle komponenter. I eksempelet under brukes det på en overskrift for å sørge for at den starter på en ny side:

```json {linenos=false,hl_lines=["12-15"]}
{
   "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
   "data": {
      "layout": [
         {
            "id": "pdf-header",
            "type": "Header",
            "textResourceBindings": {
               "title": "Dette er en ny seksjon"
            },
            "size": "L",
            "pageBreak": {
               "breakBefore": "always",
               "breakAfter": "avoid"
            }
         }
      ]
   }
}
```

**NB**: Verdien av `breakBefore` og `breakAfter` kan enten være `auto` (standard), `always`, `avoid`, eller ett [uttrykk](/nb/app/development/logic/expressions/) som returnerer en av disse verdiene.
{{% /expandlarge %}}

{{% expandlarge id="exclude-components-from-groups" header="Ekskludere komponenter inne i en gruppe" %}}

Det er mulig å ekskludere enkeltkomponenter inne i en gruppe ved å bruke `excludedChildren`-egenskapen på en `Summary`-komponent som refererer til en `Group`-komponent. Dette gjøres ved å legge ID-en til komponenten i listen over ekskluderte komponenter som i eksempelet under:

```json {linenos=false,hl_lines=["10"]}
{
   "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
   "data": {
      "layout": [
         {
            "id": "pdf-group-summary",
            "type": "Summary",
            "componentRef": "en-gruppe-komponent",
            "excludedChildren": [
               "en-komponent-i-gruppen"
            ]
         }
      ]
   }
}
```

{{% /expandlarge %}}

## Forhåndsvisning i nettleseren

{{%notice warning%}}

Forhåndsvisningen gjelder kun dersom du bruker ny PDF generering (v7.5+). Se [ovenfor](#ny-pdf-generering) for mer informasjon.

{{% /notice%}}

Det er mulig å se en forhåndsvisning av hvordan den genererte PDF-en kommer til å se ut i nettleseren imens du jobber. Følg instruksjonene nedenfor:

1. **Viktig**: Bruk Google Chrome til å forhåndsvise PDF.<br>PDF-generatoren bruker en variant av Chrome til å generere PDF-en, så andre nettlesere vil ikke produsere et korrekt resultat ved forhåndsvisning.
2. Kjør opp appen din lokalt eller åpne appen din i testmiljøet, og start en instans.
3. Åpne utviklerverktøyet ved å trykke på knappen nederst i høyre hjørne, eller bruk hurtigtasten `Ctrl+Shift+K`/`⌘+Shift+K`.
   <br><br>
   ![Knappen som åpner utviklerverktøyet, skjermbilde](dev-tools-button.png) 
4. Trykk på `Forhåndsvis PDF`-knappen i utviklerverktøyet.
   <br><br>
   ![Utviklerverktøyet, skjermbilde](preview-button.png) 

