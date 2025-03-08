---
title: Data
description: The Platform API for working with data elements.
toc: true
tags: [api]
weight: 200
aliases:
- /teknologi/altinnstudio/altinn-api/platform-api/instancee-events/
---

### DataElement
Dataelement-modellen er et metadatadokument for et enkelt skjema eller en binærfil. Dataelementets viktigste oppgave er at det lagrer metadata om hvor dataen lagres og hvordan dataen brukes av applikasjonen.
De fleste applikasjoner lagrer automatisk dataelementet for å representere skjemaet som fylles ut av brukeren. Mer avanserte applikasjoner krever at brukeren laster opp vedlegg eller fyller ut flere skjemaer.
En instans kan ha flere dataelementer, men hvert dataelement kan ikke holde på informasjon om mer enn én fil.

## Hente dataelement
For å spørre etter ett dataelement:
```http
GET /instances/{instanceOwnerPartyId}/{instanceGuid}/data/{dataGuid}
```

### instanceOwnerPartyId
- The party id of the instance owner.

### instanceGuid
- The id of the instance that the data element is associated with.

### dataGuid
- The id of the data element to retrieve.

## Hente liste av dataelementer
For å spørre etter en liste av datalementer som tilhører en instans:
/instances/{instanceOwnerPartyId}/{instanceGuid}/dataelements

### instanceOwnerPartyId
- The party id of the instance owner

### instanceGuid
- The id of the instance that the data element is associated with

## Opprette og lagre dataelement

APIet støtter å bruke POST for å opprette et nytt dataelement. 

 ```http
 POST /instances/{instanceOwnerPartyId}/{instanceGuid}/data
```

Endepunktet bruker parametere i sti og som query params for å opprette nytt element.

## instanceOwnerPartyId *
- The party id of the instance owner.

## instanceGuid *
- The id of the instance that the data element is associated with.

## dataType
- The data type identifier for the data being uploaded.

## refs
- An optional array of data element references.

## generatedFromTask
- An optional id of the task the data element was generated from

{{% notice info %}}
APIet støtter også operasjoner ved å benytte PUT og DELETE. Sjekk siden for 
openAPI for videre tekniske detaljer om disse
{{% /notice %}}
