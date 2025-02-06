---
title: Applikasjon B
linktitle: Applikasjon B
description: Instruksjoner for å sette opp applikasjon B
weight: 20
aliases:

- /app/multi-app-solution/instructions/app-b

---

Applikasjon B er først og fremst ansvarlig for å håndtere og presentere data som den henter fra applikasjon A.
Utover dette kan applikasjonen fungere som en vanlig Altinn-applikasjon der det siste trinnet er å sende inn skjemaet,
og
dermed
avslutte livssyklusen til den opprettede instansen. På en annen side, hvis det ikke er en naturlig måte å avslutte
instansen
av applikasjon
B på, må dette håndteres manuelt.

Les følgende seksjoner for mer detaljer:

- [Henting av data fra applikasjon A](#henting-av-data-fra-applikasjon-a)
- [Stopp en aktiv instans](#stopp-en-aktiv-instans)

## Henting av data fra applikasjon A

Applikasjon B trenger mye mindre konfigurasjon, som et
minimum. Hovedoppgaven
for applikasjon B er å hente ut dataene mottatt
fra applikasjon A og representere eller behandle dem på en måte.

Hvis du bruker presentasjonsfelt eller prefill, som forklart
i [alternativ 1 og 2 i den siste delen av app A-instruksjonene](../app-a#kontrollere-data-i-app-b)
, er ingen tilpasset kode nødvendig.

Hvis du benytter alternativ 3, må dataene aktivt hentes fra instansen. Dette gjøres ved å bruke
`ProcessDataRead`-metoden i servicen `DataProcessor` sammen med `UpdateData`
metoden på `dataClient`. Se eksempelkode nedenfor:

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

## Stopp en aktiv instans

Siden denne applikasjonen, i de fleste tilfeller, vil fungere som
et on-demand-dashboard for å hente inn data fra
applikasjon A, har applikasjonen ingen naturlig måte å avslutte sin
prosess på. For å omgå dette hindret, bør de innkommende skjemaene enten:

1. slettes manuelt etter å ha blitt lest, eller
2. de må implementeres med et krav om noen form for
   brukerinteraksjon
   som vil utløse avslutningen av prosessen. 