---
title: App B
linktitle: App B
description: Slik setter du opp app B
weight: 20
tags: [needsReview]
aliases:

- /app/multi-app-solution/instructions/app-b

---

App B er først og fremst ansvarlig for å håndtere og presentere data som den henter fra app A.
Utover dette kan appen fungere som en vanlig Altinn-app der det siste trinnet er å sende inn skjemaet,
og dermed avslutte livssyklusen til den opprettede instansen.
Hvis det ikke er en naturlig måte å avslutte instansen av app B på, må du håndtere dette manuelt.

Les følgende seksjoner for mer detaljer:

- [Hente data fra app A](#hente-data-fra-app-a)
- [Stoppe en aktiv instans](#stoppe-en-aktiv-instans)

## Hente data fra app A

App B trenger mye mindre konfigurasjon som et minimum.
Hovedoppgaven for app B er å hente ut dataene mottatt fra app A og representere eller behandle dem på en måte.

Hvis du bruker presentasjonsfelt eller prefill, som forklart
i [alternativ 1 og 2 i den siste delen av app A-instruksjonene](/nb/altinn-studio/v8/guides/development/multi-app-solution/instructions/app-a#kontrollere-data-i-app-b),
trenger du ikke tilpasset kode.

Hvis du benytter alternativ 3, må du aktivt hente dataene fra instansen.
Du gjør dette ved å bruke `ProcessDataRead`-metoden i servicen `DataProcessor` sammen med `UpdateData`-metoden på `dataClient`.
Se eksempelkode nedenfor:

```csharp
public async Task<bool> ProcessDataRead(Instance instance, Guid? dataId, object data)
{
   bool redigert = false;

   if (data.GetType() == typeof(DataModel))
   {
       DataModel modell = (DataModel)data;

       DataElement data = instance.Data.FirstOrDefault(de => de.DataType == [DATA_TYPE]);

       if (data != null)
       {
           var instansGuid = Guid.Parse(instance.Id.Split("/")[1]);
          
           await _dataClient.UpdateData(modell, instansGuid, typeof(DataModel), instance.Org, instance.AppId, int.Parse(instance.InstanceOwner.PartyId), Guid.Parse(instance.Data.Where(de => de.DataType == [DATA_TYPE]).First().Id));
           redigert = true;
       }
   }
   return await Task.FromResult(redigert);
}
```

## Stoppe en aktiv instans

Siden denne appen, i de fleste tilfeller, fungerer som
et on-demand-dashboard for å hente inn data fra app A, har appen ingen naturlig måte å avslutte sin prosess på.
For å omgå dette hindret, bør de innkommende skjemaene enten:

1. slettes manuelt etter å ha blitt lest, eller
2. implementeres med et krav om noen form for brukerinteraksjon som vil utløse avslutningen av prosessen. 