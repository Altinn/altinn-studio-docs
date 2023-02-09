---
title: PDF
description: Hvordan konfigurere generering av PDF.
weight: 50
---

{{%notice warning%}}
## Ny PDF generering
### Aktivere ny PDF generering
Fra og med versjon 7.5 av nuget pakkene (Altinn.App.Api and Altinn.App.Core) er det lansert en ny måte å generere PDF'er på. Denne nye måten kan skrus av og på ved å legge til følgende seksjon og innstilling i _appsettings.json_.

```json
  "FeatureManagement": {
    "NewPdfGeneration": true
  }
```

Dette vil sørge for at den nye PDF tjenesten kalles. Denne aksepterer en url som peker tilbake til en automatisk generert side i appen. Siden bygges opp og danner grunnlaget for PDF'en. `IPdfFormatter` grensesnittet som dokumentert nedenfor er fortsatt relevant hvis du trenger spesiallogikk for skjuling av komponenter/sider fra PDF'en.

### Innstillinger
Selv om standard innstillingene for den nye tjenesten skal være nok for de fleste applikasjoner kan de overstyres ved å legge til en PdfGeneratorSettings seksjon i _appsettings.json_ (standard innstillinger vises under).

```json
  "PdfGeneratorSettings": {
    "ServiceEndpointUri": "https://{org}.apps.{hostName}/{appId}/#/instance/{instanceId}",
    "AppPdfPageUriTemplate": "http://{hostName}/{appId}/#/instance/{instanceId}?pdf=1",
    "WaitForSelector": "#readyForPrint",
    "WaitForTime": 5000
  }
```

Hvis WaitForSelector er satt så blir WaitForTime ignorert. WaitForSelector sikrer at siden er ferdig oppbygd og presentert før PDF'en genereres.

{{% /notice%}}

Det er mulig å ekskludere enkelte komponenter, eller hele sider fra å bli med i pdf.

Det er to måter å ekskludere data fra PDF på

1. Via konfigurasjon i filen `Settings.json` under `App/ui`
2. Programmatisk
   For den programatiske måten er det noen mindre forskjeller avhengig av hvilke versjon av applikasjonsmalen du er på.

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v4, v5, v6">}}
I tidligere versjoner så gjøres endringene i `PdfHandler.cs` filen under `App/logic/Print` katalogen.
{{</content-version-container>}}

{{<content-version-container version-label="v7">}}
I versjon 7 har vi endret måten vi gjør kode baserte tilpassninger på. Vi benytter nå _dependency injection_ i stedet for overstyring av metoder. Hvis du tidligere plasserte koden din i _FormatPdf_ metoden in _PdfHandler.cs_ klassen så vil du erfare at det er mer eller mindre det samme som nå gjøres.
1. Opprett en klasse som implementerer `IPdfFormatter` grensesnittet som ligger i `Altinn.App.Core.Features` navnerommet.  
    Du kan navngi og plassere filene i den mappestrukturen du selv ønsker i prosjektet ditt. Men vi anbefaler at du benytter meningsfulle navnerom som i et hvilket som helst annet .Net prosjekt.
2. Registrer din implementering i _Program.cs_ klassen
    ```C#
    services.AddTransient<IPdfFormatter, PdfFormatter>();
    ```
    Dette sørger for at din kode er kjent for applikasjonen og at koden blir kjørt når den skal.
{{</content-version-container>}}
{{</content-version-selector>}}

Siden `IPdfFormater` grensesnittet har samme metode som `PdfHandler.cs` klassen er resten av dokumentasjonen og eksemplene felles for alle versjoner.


{{%notice info%}}
Dersom en side/komponent alltid skal ekskluderes fra PDF er det anbefalt å sette det opp i konfigurasjonsfilen. 

Dersom ekskludering av en side/komponent er avhengig av dynamikk _må_ dette gjøres programmatisk. 
{{% /notice%}}

## Ekskludere sider 

I eksemplene nedenfor ekskluderes siden med id _page2_ fra PDF.

### Konfigurasjon

Oppsett i `Settings.json` under `App/ui`:

```json {linenos=false,hl_lines=["3-5"]}
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "pages": {
    "excludeFromPdf": ["page2"]
  }
}
```

### Programmatisk

```cs
public async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
{
    if (data.GetType() == typeof(Skjema))
    {
        layoutSettings.Pages ??= new();
        layoutSettings.Pages.ExcludeFromPdf ??= new();
        layoutSettings.Pages.ExcludeFromPdf.Add("page2");
    }
    return await Task.FromResult(layoutSettings);
}
```

## Ekskludere komponenter 

I eksemplene nedenfor blir komponenten med id _image-component-id_ ekskludert fra pdf.

### Konfigurasjon

Oppsett i `Settings.json` under `App/ui`:

```json {linenos=false,hl_lines=["3-5"]}
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "components": {
    "excludeFromPdf": ["image-component-id"]
  }
}
```

### Programmatisk

```cs
public async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
{
    if (data.GetType() == typeof(Skjema))
    {
        layoutSettings.Components ??= new();
        layoutSettings.Components.ExcludeFromPdf ??= new();
        layoutSettings.Components.ExcludeFromPdf.Add("image-component-id");
    }
    return await Task.FromResult(layoutSettings);
}
```

## Ekskludere komponentinnslag i en repeterende gruppe

Dersom du ønsker å ekskludere én eller flere komponenter fra et innslag i en repeterende gruppe
gjøres dette ved å spesifisere indeksen av gruppeelementet i tillegg til komponent id.

Format for ekskludering: `componentId-<groupIndex>`.

Dersom komponenten skal ekskluderes for alle innslag i den repeterende gruppen kan 
intruksjonene i seksjonen over følges i stedet. 

I eksempelet nedenfor ekskluderes gruppeelement med indeks 1 og id _ownerId_ fra PDF.

### Programmatisk

```cs
public async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
    {
        if (data.GetType() == typeof(Skjema))
        {
            layoutSettings.Components ??= new();
            layoutSettings.Components.ExcludeFromPdf ??= new();
            layoutSettings.Components.ExcludeFromPdf.Add("ownerId-1");
        }
        return await Task.FromResult(layoutSettings);
    }
```

Bildet illustrerer at komponenten med indeks 0 og 2 er bevart i PDF, mens komponent med indeks 1 er borte.

!["Eksempel ekskludering av komponent i repeterende gruppe"](exclude-componen-rep-group.png "Eksempel ekskludering av komponent i repeterende gruppe")
