---
title: Re-use code lists from Altinn 2
linktitle: Code lists from Altinn 2
description: How to configure code lists that exists in Altinn 2 in an Altinn 3 app?
toc: false
weight: 300
---
{{<notice warning >}}
**Deprecated feature**  
Altinn 2 provided a shared set of code lists for use in forms. Until May 2023 there really wasn't an alternative for common used code lists across Altinn 3 applications. By exposing the Altinn 2 code lists api in Altinn 3 applications you would get access to the same set of code lists.  
<br/>

This however is not a long term solution, and with the release of the [Altinn Common Code lists](https://github.com/Altinn/codelists-lib-dotnet) package, you now have access to many of the same code lists as in Altinn 2.  
<br/>

You still might find a missing code list or two in Altinn 3 compared with Altinn 2 - in that case please consider the following:
1. Can you create a pull request in [Altinn Common Code lists repo](https://github.com/Altinn/codelists-lib-dotnet) and contribute allowing others to re-use your implementation?
2. If you don't have the knowledge or time to create a pull request then just let us know, by creating a [new issue](https://github.com/Altinn/codelists-lib-dotnet/issues/new/choose) and describe what code list you need and we will either create it or help you do it.
3. If you decide to use the Altinn 2 variant, please know that this api won't be available after June 2025.
{{</notice>}}


## Configure an Altinn 2 code list
For an overview over available code lists in Altinn 2 please use the [api](https://altinn.github.io/docs/api/rest/metadata/#hente-oversikt-over-kodelister)
You register the lists you want to use in your applications `Program.cs` and you can keep updating the code list trough TUL. 

```C#
using Altinn.App.Core.Features.Options;
...
services.AddAltinn2CodeList(
    id: "ASF_Land",
    transform: (code) => new (){ Value = code.Code, Label = code.Value1 }, 
    // filter: (code) => int.Parse(code.Value3) > 100,
    codeListVersion: 3994, // Optional (use latest version if missing)
    metadataApiId: "ASF_Land" // Code list name in Altinn 2 (use id if missing)
);
```

The `id` parameter is required and should be the name of the code list in altinn 2, `transform` sorts out what columns
should be assigned to `Value` and `Label`. Translation is automatic. After version `v7.2.0`, `nb` will be used as a fallback
for missing languages. If you want two different transformations of the same list (for different components), `id` is the
name that is used in Altinn 3 and `metadataApiId` is used towards altinn 2.

Usage is as all code lists where `id` is written in the `optionsId` field of the component.

```json
{
  "id": "country",
  "type": "Dropdown",
  ...
  "optionsId": "ASF_Land"
},
```
