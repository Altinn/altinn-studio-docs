---
title: PDF
description: How to configure the generation of PDF.
weight: 50
---

It is possible to exclude components, or entire pages from being a part of the pdf generation. 

There are two options when excluding data from a PDF: 

Det er to måter å ekskludere data fra PDF på

1. Configuring in the `Settings.json` file in the `App/ui` folder
2. Programmatically in the `PdfHandler.cs` file in the `App/logic/Print` folder

{{%notice info%}}
If a page/component is to always be excluded from the PDF, it is recommended that this is
set in the configuraiton file.

If exclusion of a page/component depends on dynamics it _must_ be done programmatically.
{{% /notice%}}



### Exclude pages

In the examples below, the page with id _page2_ is excluded from the PDF PDF.

### Configuration

Setup in `Settings.json` under `App/ui`:

```json {linenos=false,hl_lines=["3-5"]}
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "pages": {
    "excludeFromPdf": ["page2"]
  }
}
```

### Programmatically

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

## Exclude components


In the examples below, the component with id _image-component-id_ is excluded from the PDF.

### Configuration

Setup in `Settings.json` under `App/ui`:

```json {linenos=false,hl_lines=["3-5"]}
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "components": {
    "excludeFromPdf": ["image-component-id"]
  }
}
```

### Programmatically

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

## Exclude components in a repeating group

If you need to exclude one or more components from an entry in a repeating group, 
this is done by specifying the index of the group element in addition to the component id. 

The required format is: `componentId-<groupIndex>`.

If the component should be excluded for all elements in the repeating group, follow the instructions for the
section above.

In the example below, the component with id _ownerId_ in the group element with index 1 is excluded from the PDF.

### Programmatically

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

The picture below shows that the component with index 0 and 2 is kept in the PDF, 
whilst the component with index 1 is excluded. 

!["Example excluding of component in repeating group"](exclude-componen-rep-group.png "Example excluding of component in repeating group")
