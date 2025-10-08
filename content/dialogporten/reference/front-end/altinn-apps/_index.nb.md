---
title: 'Altinn Apps integrasjon'
description: 'Referanseinformasjon for Altinn Apps integrasjon'
weight: 50
toc: true
---

## Applikasjonsmetadata

Disse innstillingene, sammen med andre, kan defineres i filen `App/config/applicationmetadata.json`

### Synkroniseringsadapterinnstillinger

Sett hvilken som helst av egenskapene nedenfor under `syncAdapterSettings` til `true` for å overstyre den
automatiske synkroniseringen:

| Setting | Beskrivelse |
| ------- | ----------- |
| `disableSync` | Deaktiver all dialogsynkronisering. Overstyrer alle andre innstillinger. |
| `disableCreate` | Deaktiver opprettelse av dialoger når applikasjonsinstanser opprettes. |
| `disableDelete` | Deaktiver sletting av dialoger når applikasjonsinstanser slettes. |
| `disableAddActivities` | Deaktiver å legge til aktiviteter. |
| `disableAddTransmissions` | Deaktiver å legge til forsendelser. |
| `disableSyncDueAt` | Deaktiver synkronisering av forfallsdato. |
| `disableSyncStatus` | Deaktiver synkronisering av status. |
| `disableSyncContentTitle` | Deaktiver synkronisering av tittel. |
| `disableSyncContentSummary` | Deaktiver synkronisering av sammendrag. |
| `disableSyncAttachments` | Deaktiver synkronisering av dialogvedlegg (kun gjenkjente ID-er). |
| `disableSyncApiActions` | Deaktiver synkronisering av API-handlinger (kun gjenkjente ID-er). |
| `disableSyncGuiActions` | Deaktiver synkronisering av GUI-handlinger (kun gjenkjente ID-er). |

### Eksempel

Dette viser standard syncAdapterSettings. Sett hvilken som helst til `true` for å overstyre. Endringer vil ikke ha tilbakevirkende kraft på noen dialog før en ny synkronisering, som skjer når instansen oppdateres eller instanshendelser legges til.

{{< code-title >}}applicationmetadata.json{{< /code-title >}}
```json
{
  "id": "ttd/my-app",
  /* ... */
  "messageBoxConfig": {
    /* ... */
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
}
```