---
title: Tracks
description: How to add dynamic tracks in the app.
toc: true
weight: 20
---

Dynamic tracks in an application can be useful if you want to show and/or hide some pages
based on input from user on previous parts of the form.

{{% panel theme="warning" %}}
⚠️ Dynamic tracks are unsupported as of v4 (frontend). Hiding and showing entire pages
are supported by [dynamic expressions](../../../logic/expressions)
(read how to [hide entire pages here](../../../logic/expressions#viseskjule-hele-sider)).
{{% /panel %}}

## Trigger calculation on tracks from frontend

The app will perform an initial call to calculate the order when loading. To trigger calculation of dynamic tracks when switching pages, this needs to be added as a trigger on the navigation component you want.
This is done by adding `calculatePageOrder` as a part of triggers. Example:

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
    "order": ["Side1", "Side2", "Side3"],
    "triggers": ["calculatePageOrder"]
  }
}
```

If `triggers` is set on the navigation component, this will overrule `triggers` set in Settings.json, and by doing this it is possible to control default behaviour on component level if desirable.

The implementation varies slightly depending on the version of the app template and Nuget packages you are using.

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v6, v7">}}
To overrule default dynamic tracks, two changes must be made.

1. Create a class that implements the `IPageOrder` interface found in the `Altinn.App.Core.Features.PageOrder` namespace.  
   You can name and place the file in any folder you like within your project, but we suggest you use meaningful namespaces like in any other .Net project.

   ```C#
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Altinn.App.Core.Features.PageOrder;
    using Altinn.App.Core.Models;
    using Altinn.App.Models;

    namespace Altinn.App.AppLogic.Custom;

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

2. Register you custom implementation in the _Program.cs_ class
   ```C#
   services.AddTransient<IPageOrder, CustomOrder>();
   ```
   This ensuers your custom code is known to the application and that it will be executed.

The interface contains a method with the name _GetPageOrder_. The expected output from this is a sorted list with the names of the relevant pages in the application.

The function provides a number of parameters that can be useful if you are using form data or
other information about the user to trigger the dynamic tracks.

- _appIdentifier_ Contains organization and app name for the application

- _instanceIdentifier_ Contains InstanceOwnerPartyId and InstanceGuid. If the application is stateless the object will be blank (InstanceIdentifier.NoInstance).
  If GetInstanceId is called on an InstanceIdentifier.NoInstance, an exception will be thrown.

- _layoutSetId_ If your app defines multiple layout sets, the id on the layout set in question will be submitted.
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

This prequires that the service `IAppResources` is made available in the class.
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

- _CurrentPage_ The page you want to navigate from will be specified in this parameter.

- _FormData_ contains the form data. This can easily be worked with as an object by casting it to the right type `Skjema skjema = (Skjema)formdata;`.
  Here, the C# model's name is `Skjema`, but for your application the name could be different.
  You can check this by finding the class name of the C# file in the App/models folder.
  {{</content-version-container>}}
  {{<content-version-container version-label="v4, v5">}}

{{%notice warning%}}
For track selection to work for stateless applications, NuGet must be upgraded to 5.0.0 or later.
{{%/notice%}}
In the file App.cs one must override the method that retrieves the default order of pages defined in `Settings.json`
This is done by adding the below function in App.cs.
The expected output from this method is a capitalized list containing the name of the relevant pages in the application.

```cs
/// <inheritdoc />
public override async Task<List<string>> GetPageOrder(string org, string app, int instanceOwnerId, Guid instanceGuid, string layoutSetId, string currentPage, string dataTypeId, object formData)
{
    List<string> pageOrder = new List<string>();
    // Implement your own logic here
    return pageOrder;
}
```

The function receives several parameters that can be useful if you are going to use form data
or other information about the end user to calculate the track selection.

- _layoutSetId_ If your app defines several layout sets, the id of the current layout set is submitted.
  If the application does not have a layout set, this string will be empty. Based on this parameter one can retrieve
  the default page order defined in the application:

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

This assumes that the service `IAppResources` is made available in App.cs file.
As the service is already dependency injected into the class, only two steps are required.

1. Create a private variable in the state of the class.

```cs
private readonly IAppResources _appResourcesService;
```

2. Define the new private variable equal to the service passed in the constructor of App.cs.

```cs
 _appResourcesService = appResourcesService;
```

_CurrentPage_ The page you want to navigate from must be specified in this parameter.

- _FormData_ contains the form data. It can easily be worked with as an object by casting it to the correct type `Form form = (Form)formData;`.
  In this case C# model for the form data is called `Form' for your application, it can be another name.
  You can check this by finding the class name of the C# file in the App/models folder.
  {{</content-version-container>}}

{{</content-version-selector>}}

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
