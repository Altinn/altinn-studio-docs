---
title: Hva er nytt?
description: Oversikt over endringer som ble introdusert i versjon 5.
toc: true
---

## 5.3.0 (21.06.2022) - Støtte for automatisk sletting av dataelementer

Denne releasen introduserer støtte for automatisk sletting av dataelementer når prosessen avsluttes. 
Dette er en måte å begrense sluttbrukers tilgang på data etter at prosessen er avsluttet. 

Konfigurasjon gjøres i `applicationmetadata.json`. 
Legg til `"autodeleteOnProcessEnd":true` i `appLogic`-seksjonen til datatypen.

En ferdigkonfigurert datatype vil kunne se slik ut: 

```json
{
  "id": "VedleggB",
  "taskId": "Task_1",
  "maxSize": 25,
  "maxCount": 1,
  "minCount": 1,
  "appLogic": {
    "autoDeleteOnProcessEnd": true
  }
}
```

## 5.2.0 (07.06.2022) - Api for hvilke språk som er tilgjengelige
### Features
- Denne releasen introduserer nye api endepunkter som gir informasjon om hvilke språk en applikasjon støtter. Ref. kommende funksjonalitet for å [velge språk](../../../../../app/development/ux/texts/translation/)

## 5.1.0 (23.05.2022) - Support for anonymous stateless apps

### Features
- Denne releasen gir mulighet for å benytte såkalte stateless applikasjoner, dvs. applikasjoner som ikke oppretter instanser, for brukere som ikke er logget inn. Dette er spesielt nyttig når man utvikler guider hvor brukeren svarer på ulike spørsmål for å bli guidet frem til rett løsning, men hvor du som en tjenesteeier ikke trenger at det lagres en instans som resultatet av den prosessen brukeren går gjennom.
- Muligheten til å benytte Altinn 2 kodelister fra Altinn 3 app. 

### Bugfixes
- En fiks for sporvalg som ikke virket i stateless applikasjoner.
- En fiks hvor det ble kastet en null pointer exception exception was thrown  in `/{org}/{app}/instances/{instanceOwnerPartyId}/active` når instansen ble initialisert fra api.
- En fiks som gjør at alle typer filer er tillatt lastet opp når content type ikke er spesifisert.
