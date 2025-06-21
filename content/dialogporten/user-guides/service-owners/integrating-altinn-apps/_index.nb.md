---
title: 'Integrere Altinn Apps'
description: 'Hvordan overstyre eller berike den automatiske Dialogporten-integrasjonen fra appen din'
weight: 50
---

## Introduksjon

Altinn Apps synkroniseres automatisk med Dialogporten. Hver gang en ny
instans opprettes, vil dialogtjenesten opprette eller oppdatere en tilsvarende
dialog som er synlig for sluttbrukeren i Altinn Innboks ("arbeidsflate"). Denne
guiden forklarer hvordan standardoppførselen kan justeres og hvordan du kan ta
full kontroll over integrasjonen om nødvendig.

## Automatisk dialogsynkronisering

Som standard er synkroniseringen aktivert for alle applikasjoner. Oppdateringer av
instansen, som statusendringer, lagt til aktiviteter eller vedlegg, vil bli
reflektert i Dialogporten. Oppførselen kan finjusteres gjennom
`syncAdapterSettings`-seksjonen i `applicationmetadata.json`.

### Innstillinger for synkroniseringsadapter

Sett hvilke som helst av egenskapene nedenfor under `syncAdapterSettings` til `true` for å overstyre den
automatiske synkroniseringen:

| Setting | Description |
| ------- | ----------- |
| `disableSync` | Deaktiver all dialogsynkronisering. Overstyrer alle andre innstillinger. |
| `disableCreate` | Deaktiver opprettelse av dialoger når appinstanser opprettes. |
| `disableDelete` | Deaktiver sletting av dialoger når appinstanser slettes. |
| `disableAddActivities` | Deaktiver å legge til aktiviteter. |
| `disableAddTransmissions` | Deaktiver å legge til forsendelser. |
| `disableSyncDueAt` | Deaktiver synkronisering av forfallsdato. |
| `disableSyncStatus` | Deaktiver synkronisering av status. |
| `disableSyncContentTitle` | Deaktiver synkronisering av tittelen. |
| `disableSyncContentSummary` | Deaktiver synkronisering av sammendraget. |
| `disableSyncAttachments` | Deaktiver synkronisering av dialogvedlegg (kun gjenkjente ID-er). |
| `disableSyncApiActions` | Deaktiver synkronisering av API-handlinger (kun gjenkjente ID-er). |
| `disableSyncGuiActions` | Deaktiver synkronisering av GUI-handlinger (kun gjenkjente ID-er). |

### Eksempel

Dette viser standard syncAdapterSettings. Sett hvilken som helst til `true` for å overstyre. Endringer vil ikke ha tilbakevirkende kraft på noen dialog før en ny synkronisering, som skjer når instansen oppdateres eller instanshendelser legges til.

{{< code-title >}}applicationmetadata.json{{< /code-title >}}
```json
"messageBoxConfig": {
    /* ...*/
    "syncAdapterSettings": {
        "disableSync": false,
        "disableCreate": false,
        "disableDelete": false,
        "disableAddActivities": false,
        "disableAddTransmissions": false,
        "disableSyncDueAt": false,
        "disableSyncStatus": false,
        "disableSyncContentTitle": false,
        "disableSyncContentSummary": false,
        "disableSyncAttachments": false,
        "disableSyncApiActions": false,
        "disableSyncGuiActions": false
    }
}
```

## Bruke Dialogporten WebAPI SDK

Noen scenarier krever mer kontroll enn den automatiske synkroniseringen tilbyr.
[Dialogporten WebAPI SDK](https://github.com/Altinn/dialogporten/tree/main/src/Digdir.Library.Dialogporten.WebApiClient)
gir applikasjonen din programmatisk tilgang til Dialogporten slik at du kan opprette og
oppdatere dialoger selv. Dette muliggjør finkornet håndtering av aktiviteter,
forsendelser og synkronisering med Altinn Innboks.