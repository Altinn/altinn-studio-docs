---
title: Tracks
description: How to add dynamic tracks in the app.
toc: true
weight: 20
---

Dynamic tracks in an application can be useful if you want to show and/or hide some pages
based on input from user on previous parts of the form.

## Trigger calculation on tracks from frontend

The app will perform an initial call to calculate the order when loading. To trigger calculation of dynamic tracks when switching pages, this needs to be added as a trigger on the navigation component you want.
This is done by adding `calculatePageOrder` ad a part of triggers. Example:

```json
{
    "id": "navigation-button",
    "type": "NavigationButtons",
    "textResourceBindings": {
        "next": "Neste",
        "back": "Tilbake"
    },
    "triggers": ["calculatePageOrder"],
    "dataModelBindings": {},
    "showBackButton": true
}
```

Here, the frontend will make the call to the api defined in the app and use the list returned to determine which page it will go to when the user presses next.
This order will also be stored in the state frontend, so that navigating will work both backwards and forwards on the given order returned from the backend.

If you wish to trigger calculation on every single page switch, this can be done by either entering `calculatePageOrder` as part of `triggers` for all 
the navigation components in the application, or by adding a trigger in `Settings.json` under the `pages` section. Example:

```json
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "pages": {
    "order": [
      "Side1",
      "Side2",
      "Side3"
    ],
    "triggers": ["calculatePageOrder"]
  }
}
```

If `triggers` is set on the navigation component, this will overrule `triggers` set in Settings.json, and by doing this it is possible to control default behaviour on component level if desirable.

## Setting up dynamic tracks backend (nuget version > 5.0.0)

To overrule default dynamic tracks, two changes must be made.

1. Create a class implementing the interface [IPageOrder](https://github.com/Altinn/app-template-dotnet/blob/main/src/Altinn.App.PlatformServices/Interface/IPageOrder.cs)
2. Register this class as a Transient in Startup.cs

### Create separate class for controlling dynamic tracks

Create a new class in your application, e.g. under the folder App/logic/Pages (the folder is not created by default).
This class must implement the interface IPageOrder.
The interface contains a method with the name _GetPageOrder_. The expected output from this is a sorted list with the names of the relevant pages in the application.

```cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Models;
using Altinn.App.Services.Interface;
using Altinn.App.PlatformServices.Models;

namespace Altinn.App.AppLogic.Pages
{
    public class CustomOrder : IPageOrder
    {
        /// <inheritdoc />
        public async Task<List<string>> GetPageOrder(AppIdentifier appIdentifier, InstanceIdentifier instanceIdentifier, string layoutSetId, string currentPage, string dataTypeId, object formData)
        {
            List<string> pageOrder = new List<string>();
            
            // Implement your logic here.
            
            return await Task.FromResult(pageOrder);
        }

    }

}
```

The function provides a number of parameters that can be useful if you are using form data or 
other information about the user to trigger the dynamic tracks.

- *appIdentifier* Contains organization and app name for the application

- *instanceIdentifier* Contains InstanceOwnerPartyId and InstanceGuid. If the application is stateless the object will be blank (InstanceIdentifier.NoInstance).
If GetInstanceId is called on an InstanceIdentifier.NoInstance, an exception will be thrown.

- *layoutSetId* If your app defines multiple layout sets, the id on the layout set in question will be submitted.
If the application does not have a layout set, this string will be empty. Based on this parameter the default page order 
defined in the application can be retrieved.

```cs
List<string> pageOrder = new List<string>();

if (string.IsNullOrEmpty(layoutSetId))
{
    pageOrder = _appResourcesService.GetLayoutSettings().Pages.Order;
}
else
{
    pageOrder = _appResourcesService.GetLayoutSettingsForSet(layoutSetId).Pages.Order;
}
```

This prequires that the service IAppResources is made available in the class.
When the service is already available through dependency injected into the class, only two steps are required:

1. Create a private variable in the state of the class

```cs
private readonly IAppResources _appResourcesService;
```

2. Define a constructor that takes in IAppResources and initializes the private variable that was created in step 1.

```cs
public CustomOrder(IAppResources appResourcesService)
{
    _appResourcesService = appResourcesService;
}
```

- *CurrentPage* The page you want to navigate from will be specified in this parameter.

- *FormData* contains the form data. This can easily be worked with as an object by casting it to the right type `Skjema skjema = (Skjema)formdata;`.
Here, the C# model's name is `Skjema`, but for your application the name could be different.
You can check this by finding the class name of the C# file in the App/models folder.

## Reflect dynamic tracks in receipt (PDF)

As an app developer you must make sure to reflect the dynamic track choices made in the PDF that is created at the end of each task.
In `App.cs` the function `FormatPdf` can be found:

```cs
public override async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
{
    return await _pdfHandler.FormatPdf(layoutSettings, data);
}
```

As input to the method you have `layoutSettings` which contains the default page order under the property `layoutSettings.Pages.Order`.
In addition, you have the form data that is associated with the step to be completed. This can be parsed to a C# model as described further up on this page.

By manipulating `layoutSettings.Pages.Order` in this method, it will be possible to duplicate the dynamic track choices made for the user.
NOTE! The call to PDF handler, as shown below, must not be removed from the `FormatPDF` method, if you have implemented additional logic for the receipt in `PDFHandler.cs`.

```cs
return await _pdfHandler.FormatPdf(layoutSettings, data);
```

To avoid duplicating logic, we recommend creating a method that manipulates the page order based on form data and calling this both from `FormatPdf` and `GetPageOrder`.
A code example of such an implementation follows. This can, for example, be placed in the same class that implements the interface IPageOrder to keep all logic for order in the same place.

In the class implementing logic for page order:

```cs
public async Task<List<string>> GetPageOrder(AppIdentifier appIdentifier, InstanceIdentifier instanceIdentifier, string layoutSetId, string currentPage, string dataTypeId, object formData)
{
    List<string> pageOrder = new List<string>();

    if (string.IsNullOrEmpty(layoutSetId))
    {
        pageOrder = _appResourcesService.GetLayoutSettings().Pages.Order;
    }
    else
    {
        pageOrder = _appResourcesService.GetLayoutSettingsForSet(layoutSetId).Pages.Order;
    }
    UpdatePageOrder(pageOrder, (FavorittArtist)formData);
    return pageOrder;
}

public void UpdatePageOrder(List<string> pageOrder, FavorittArtist formdata)
{
    if (formdata.EnGodNrTo.Contains("Tix"))
    {
        pageOrder.Remove("Prince");
    }
    else
    {
        pageOrder.Remove("Tix");
    }
}
```

The method is then called from the method `FormatPdf` in `App.cs`

```cs
public override async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
{
    UpdatePageOrder(layoutSettings.Pages.Order, (FavorittArtist)data);
    return await _pdfHandler.FormatPdf(layoutSettings, data);
}
```