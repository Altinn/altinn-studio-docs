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

| Setting                                   | Beskrivelse                                                                          |
|-------------------------------------------|--------------------------------------------------------------------------------------|
| `disableSync`                             | Deaktiver all dialogsynkronisering. Overstyrer alle andre innstillinger.             |
| `disableCreate`                           | Deaktiver opprettelse av dialoger når applikasjonsinstanser opprettes.               |
| `disableDelete`                           | Deaktiver sletting av dialoger når applikasjonsinstanser slettes.                    |
| `disableAddActivities`                    | Deaktiver å legge til aktiviteter.                                                   |
| `disableAddTransmissions`                 | Deaktiver å legge til forsendelser.                                                  |
| `disableSyncDueAt`                        | Deaktiver synkronisering av forfallsdato.                                            |
| `disableSyncStatus`                       | Deaktiver synkronisering av status.                                                  |
| `disableSyncContentTitle`                 | Deaktiver synkronisering av tittel.                                                  |
| `disableSyncContentSummary`               | Deaktiver synkronisering av sammendrag.                                              |
| `disableSyncContentAdditionalInformation` | Deaktiver synkronisering av tilleggsinformasjon.                                     |
| `disableSyncContentExtendedStatus`        | Deaktiver synkronisering av utvidet status.                                          |
| `disableSyncAttachments`                  | Deaktiver synkronisering av dialogvedlegg (kun gjenkjente ID-er).                    |
| `disableSyncApiActions`                   | Deaktiver synkronisering av API-handlinger (kun gjenkjente ID-er).                   |
| `disableSyncGuiActions`                   | Deaktiver synkronisering av GUI-handlinger (kun gjenkjente ID-er).                   |
| `disableMarkCompletedWhenConfirmed`       | Deaktiver å sette dialogstatus til Completed når app-instansen er ArchivedConfirmed. |
| `enableUserSuppliedDialogId`              | Bruk brukerlevert dialogId funnet i DataValues med nøkkel: dialog.id.                |

#### Aktiver brukerlevert dialogId
Som standard genererer adapteren en dialog-ID deterministisk fra instans-IDen og opprettelsestidspunktet av instansen. Aktivering av denne innstillingen bruker i stedet en dialog-ID levert av appen selv, funnet i DataValues-oppføring med nøkkel dialog.id.

Krav til den leverte dialog-IDen:
- Må være en gyldig UUIDv7
- Tidsstempelet innebygd i UUIDen må være i fortiden
- Må ikke allerede være i bruk av en annen app-instans

**Kollisjonsdeteksjon:** Adapteren sjekker den gitte dialogen for eventuelle service owner labels med urn:altinn:integration:storage:{instanceId}. Hvis en label blir funnet som peker til en annen instans, avvises synkroniseringen

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
        "disableSyncContentAdditionalInformation": false,
        "disableSyncContentExtendedStatus": false,
        "disableSyncAttachments": false,
        "disableSyncApiActions": false,
        "disableSyncGuiActions": false,
        "disableMarkCompletedWhenConfirmed": false,
        "enableUserSuppliedDialogId": false

    }
  }
}
```
