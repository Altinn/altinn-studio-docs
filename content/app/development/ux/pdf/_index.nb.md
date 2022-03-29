---
title: PDF
description: Hvordan konfigurere generering av PDF.
weight: 50
---

Det er mulig å ekskludere enkelte komponenter, eller hele sider fra å bli med i pdf.

Det er to måter å ekskludere data fra PDF på

1. Via konfigurasjon i filen `Settings.json` under `App/ui`
2. Programmatisk i filen `PdfHandler.cs` under `App/logic/Print`.

{{%notice info%}}
Dersom en side/komponent alltid skal ekskluderes fra PDF er det anbefalt å sette det opp i konfigurasjonsfilen. 

Dersom ekskludering av en side/komponent er avhengig av dynamikk _må_ dette gjøres programmatisk. 
{{% /notice%}}



## Ekskludere sider 

I eksemplene nedenfor ekskluderes siden med id _page2_ fra PDF.

### Konfigurasjon

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