---
title: 'Integrasjon med Altinn Apps'
description: 'Referanseinformasjon for integrasjon med Altinn Apps'
weight: 50
toc: true
---

## Applikasjonsmetadata

Disse innstillingene, sammen med andre, kan defineres i filen `App/config/applicationmetadata.json`.

### Innstillinger for sync-adapter

Sett en av egenskapene nedenfor under `syncAdapterSettings` til `true` for å overstyre den automatiske synkroniseringen:

| Innstilling                               | Beskrivelse                                                                 |
|-------------------------------------------|-----------------------------------------------------------------------------|
| `disableSync`                             | Deaktiver all dialogsynkronisering. Overstyrer alle andre innstillinger.    |
| `disableCreate`                           | Deaktiver opprettelse av dialoger når app-instanser opprettes.              |
| `disableDelete`                           | Deaktiver sletting av dialoger når app-instanser slettes.                   |
| `disableAddActivities`                    | Deaktiver å legge til aktiviteter.                                          |
| `disableAddTransmissions`                 | Deaktiver å legge til forsendelser.                                         |
| `disableSyncDueAt`                        | Deaktiver synkronisering av fristdatoen.                                    |
| `disableSyncStatus`                       | Deaktiver synkronisering av status.                                         |
| `disableSyncContentTitle`                 | Deaktiver synkronisering av tittel.                                         |
| `disableSyncContentSummary`               | Deaktiver synkronisering av sammendrag.                                     |
| `disableSyncContentAdditionalInformation` | Deaktiver synkronisering av ytterligere informasjon.                        |
| `disableSyncContentExtendedStatus`        | Deaktiver synkronisering av utvidet status.                                 |
| `disableSyncAttachments`                  | Deaktiver synkronisering av dialogvedlegg, kun gjenkjente ID-er.            |
| `disableSyncApiActions`                   | Deaktiver synkronisering av API-handlinger, kun gjenkjente ID-er.           |
| `disableSyncGuiActions`                   | Deaktiver synkronisering av GUI-handlinger, kun gjenkjente ID-er.           |
| `disableMarkCompletedWhenConfirmed`       | Deaktiver at dialogstatus settes til fullført når app-instansen er ArchivedConfirmed. |

### Eksempel

Dette viser standardverdiene for `syncAdapterSettings`. Sett en av dem til `true` for å overstyre. Endringer får ikke tilbakevirkende kraft på eksisterende dialoger før en ny resynkronisering skjer, noe som skjer hver gang instansen oppdateres eller instanshendelser legges til.

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
        "disableSyncContentAdditionalInformation": false,
        "disableSyncContentExtendedStatus": false,
        "disableSyncAttachments": false,
        "disableSyncApiActions": false,
        "disableSyncGuiActions": false,
        "disableMarkCompletedWhenConfirmed": false
    }
  }
}
```
