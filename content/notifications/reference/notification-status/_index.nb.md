---
title: Statusverdier for ordre og varsler
linktitle: Statusverdier
description: Referanse for ordrestatus og varslingsresultater i Altinn Notifications
weight: 30
toc: true
---

Denne siden beskriver statusverdiene som Altinn Notifications bruker når den
rapporterer hvor langt varslingsordrene har kommet, og hvordan e‑post og SMS ble
levert.

Disse verdiene vises i svarene fra status‑API‑ene (for eksempel
`/future/shipment/{id}` og statusfeeden). De hjelper deg å

- overvåke utsendingene dine
- finne årsaken når noe går galt
- gi god brukerstøtte

Eksempel på respons fra status‑API‑et:

```json
{
  "shipmentId": "c1d034c5-6af7-4813-aff7-920ab02e27b2",
  "sendersReference": "b6030a4e-93a3-489f-8478-85618d198745",
  "type": "Notification",
  "status": "Order_Processed",
  "lastUpdate": "2026-02-04T11:32:01.268148Z",
  "recipients": [
    {
      "type": "Email",
      "destination": "nullstilt@altinn.xyz",
      "status": "Email_Succeeded",
      "lastUpdate": "2026-02-04T11:33:09.64992Z"
    },
    {
      "type": "SMS",
      "destination": "+4798765432",
      "status": "SMS_Accepted",
      "lastUpdate": "2026-02-04T11:33:01.433868Z"
    }
  ]
}
```

## Slik leser du statusfeltene

- **Ordrenivå**: `status` på toppnivå viser hvor langt hele ordren har kommet (`Order_*`‑verdier).
- **Mottakernivå**: hvert element i `recipients` har et `status`‑felt som viser
  resultatet for én kanal til én mottaker (`Email_*`‑ eller `SMS_*`‑verdier).

Navnene i API‑responsen følger mønsteret:

- `Order_{OrderProcessingState}`
- `Email_{EmailNotificationResultType}`
- `SMS_{SmsNotificationResultType}`

I tabellene under viser vi både enum‑verdien og strengverdien som faktisk
opptrer i API‑et.

## OrderProcessingState (ordrestatus)

Ordrestatus beskriver hvor langt en varslingsordre har kommet i behandlingen.

| Enum-verdi           | API-statusstreng      | Beskrivelse                                                                 | Type              |
|----------------------|----------------------|-----------------------------------------------------------------------------|-------------------|
| `Registered`         | `Order_Registered`   | Ordren er opprettet og lagret, men behandlingen har ikke startet ennå.     | Midlertidig       |
| `Processing`         | `Order_Processing`   | Ordren behandles nå (Altinn slår opp mottakere, sjekker sendebetingelser osv.).| Midlertidig       |
| `Processed`          | `Order_Processed`    | Ordren er ferdig behandlet og er overlevert til e‑post- og SMS‑kanalene.   | Midlertidig       |
| `Completed`          | `Order_Completed`    | Ordren er ferdig behandlet, og alle varsler har fått endelig leveringsstatus. | Endelig        |
| `SendConditionNotMet`| `Order_SendConditionNotMet` | Sendebetingelsen var ikke oppfylt, derfor ble ingen varsler sendt. | Endelig           |
| `Cancelled`          | `Order_Cancelled`    | Ordren ble kansellert før utsending.                                       | Endelig           |

**Forskjellen mellom `Completed` og `Processed`**

- `Processed` betyr at systemet har behandlet ordren og opprettet alle varsler,
  men at sluttstatus for leveringen fortsatt er under oppfølging.
- `Completed` betyr at både ordren og alle tilhørende varsler har fått endelig
  leveringsstatus (for eksempel levert eller feilet i e‑post- og SMS‑kanalene).

## EmailNotificationResultType (e-postresultat)

Status for ett enkelt e‑postvarsel til én mottaker.

| Enum-verdi                     | API-statusstreng               | Beskrivelse                                                  | Type        |
|--------------------------------|--------------------------------|--------------------------------------------------------------|-------------|
| `New`                          | `Email_New`                    | E‑posten er opprettet, men ikke sendt videre ennå.          | Midlertidig |
| `Sending`                      | `Email_Sending`                | E‑posten er i ferd med å bli sendt.                         | Midlertidig |
| `Succeeded`                    | `Email_Succeeded`              | E‑postleverandøren har tatt imot e‑posten, men har ennå ikke bekreftet at den er levert.                | Midlertidig |
| `Delivered`                    | `Email_Delivered`              | Leverandøren har bekreftet at e‑posten er levert.           | Endelig     |
| `Failed`                       | `Email_Failed`                 | Feil uten mer spesifikk årsak.                              | Endelig     |
| `Failed_RecipientNotIdentified`| `Email_Failed_RecipientNotIdentified` | Mottakeren kunne ikke identifiseres.               | Endelig     |
| `Failed_InvalidFormat`         | `Email_Failed_InvalidFormat`          | Ugyldig e‑postadresseformat.                        | Endelig     |
| `Failed_RecipientReserved`     | `Email_Failed_RecipientReserved`      | Mottakeren er reservert eller blokkert.             | Endelig     |
| `Failed_SuppressedRecipient`   | `Email_Failed_SuppressedRecipient`    | Leverandøren har sperret mottakeren (suppressed).   | Endelig     |
| `Failed_TransientError`        | `Email_Failed_TransientError`         | Midlertidig feil hos leverandøren. Dette varselet blir ikke forsøkt på nytt automatisk, men en ny varslingsordre kan lykkes.                  | Endelig     |
| `Failed_Bounced`               | `Email_Failed_Bounced`                | E‑posten kom i retur (bounce).                      | Endelig     |
| `Failed_FilteredSpam`          | `Email_Failed_FilteredSpam`           | Filtrert som spam av leverandøren.                  | Endelig     |
| `Failed_Quarantined`           | `Email_Failed_Quarantined`            | Satt i karantene hos leverandøren.                  | Endelig     |
| `Failed_TTL`                   | `Email_Failed_TTL`                    | E‑posten utløp før den kunne leveres.               | Endelig     |

## SmsNotificationResultType (SMS-resultat)

Status for én SMS til én mottaker.

| Enum-verdi                     | API-statusstreng               | Beskrivelse                                                  | Type        |
|--------------------------------|--------------------------------|--------------------------------------------------------------|-------------|
| `New`                          | `SMS_New`                      | SMS-en er opprettet, men ikke sendt videre ennå.            | Midlertidig |
| `Sending`                      | `SMS_Sending`                  | SMS-en er i ferd med å bli sendt.                           | Midlertidig |
| `Accepted`                     | `SMS_Accepted`                 | Akseptert av SMS‑gatewayen.                                 | Midlertidig |
| `Delivered`                    | `SMS_Delivered`                | Bekreftet levert til mottakerens mobiltelefon.              | Endelig     |
| `Failed`                       | `SMS_Failed`                   | Feil uten mer spesifikk årsak.                              | Endelig     |
| `Failed_InvalidRecipient`      | `SMS_Failed_InvalidRecipient`  | Ugyldig telefonnummer eller mottaker.                       | Endelig     |
| `Failed_RecipientReserved`     | `SMS_Failed_RecipientReserved` | Mottakeren er blokkert eller reservert.                     | Endelig     |
| `Failed_BarredReceiver`        | `SMS_Failed_BarredReceiver`    | Operatøren har sperret mottakerens abonnement.              | Endelig     |
| `Failed_Deleted`               | `SMS_Failed_Deleted`           | Meldingen ble slettet før levering.                         | Endelig     |
| `Failed_Expired`               | `SMS_Failed_Expired`           | Meldingen utløp hos operatør eller gateway.                 | Endelig     |
| `Failed_Undelivered`           | `SMS_Failed_Undelivered`       | Meldingen kunne ikke leveres.                               | Endelig     |
| `Failed_RecipientNotIdentified`| `SMS_Failed_RecipientNotIdentified` | Mottakeren kunne ikke identifiseres.                | Endelig     |
| `Failed_Rejected`              | `SMS_Failed_Rejected`          | Avvist av leverandør eller operatør.                        | Endelig     |
| `Failed_TTL`                   | `SMS_Failed_TTL`               | Varslingen nådde levetiden (TTL) i Altinn uten at en endelig leveringsrapport kom inn. Se forklaringen under. | Endelig     |

## Time-to-live (TTL) og utløp

Levetiden (TTL) bestemmer hvor lenge Altinn følger opp en varsling før den
regnes som utløpt. Hvor lang levetiden er, og om du kan styre den selv, avhenger
av hvilket endepunkt du bruker.

### Standard levetid på 48 timer

Vanlige varslinger (bestilt via `/orders` og `/future/orders`) har en fast
levetid på **48 timer** som tjenesteeiere **ikke kan endre**. Altinn
beregner utløpstidspunktet ut fra ønsket sendetidspunkt pluss 48 timer for både
e‑post og SMS.

Umiddelbare varslinger (endepunktene `/future/orders/instant/*`) styres
annerledes:

- For umiddelbar SMS **må** avsenderen selv sette `timeToLiveInSeconds` i
  forespørselen. Gyldig verdi er mellom 60 og 172 800 sekunder (48 timer).
  Se [veiledningen for umiddelbar varsling]({{< relref "/notifications/guides/instant-notifications" >}})
  for anbefalte verdier.
- For umiddelbar e‑post gjelder den samme faste levetiden på 48 timer som for
  vanlige varslinger, og den kan ikke endres.

### Forskjellen mellom `Failed_TTL` og `Failed_Expired`

Begge statusene betyr at meldingen utløp før den ble levert, men de oppstår på
ulike steder:

- **`Failed_TTL`** settes av Altinn når den interne levetiden (TTL) er nådd.
  Dette skjer i to situasjoner:
  - varslingen forble i en ikke‑endelig tilstand helt til levetiden ble nådd –
    for eksempel ved gjentatte midlertidige feil i forsøkene på å levere til
    tredjeparten (Link Mobility for SMS), eller
  - varslingen ble akseptert for sending, men ingen leveringsrapport kom inn
    innenfor levetiden – for eksempel fordi mottakeren var utenfor dekning
    eller hadde telefonen avslått, eller fordi leveringsrapporten kom for sent
    fra leverandøren.
- **`Failed_Expired`** (kun SMS) settes når operatøren eller gatewayen melder
  tilbake at meldingens gyldighetsperiode utløp hos dem. Her kommer det altså
  en leveringsrapport, men den forteller at operatøren ga opp.

Kort sagt: `Failed_TTL` gjelder utløp i Altinns egen oppfølging, mens
`Failed_Expired` gjelder utløp meldt fra operatør eller gateway.

### Når en varsling utløper

Når levetiden er nådd, skjer dette:

- Resultatet blir rapportert som `Failed_TTL`, `Failed_Expired` eller en annen
  endelig feilstatus.
- Du bør ikke sende samme varsel på nytt uten at du først vurderer om innholdet
  fortsatt er relevant for mottakeren.

