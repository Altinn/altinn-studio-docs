---
title: Kvittering
description: Kvitteringskomponenten i Altinn Platform viser kvittering for apper.
tags: [platform, register]
---

Kvitteringskomponenten er laget for å vise en kvittering for alle apper. Noen apper vil fjernes fra Altinn Apps med tiden, men innsendte data vil likevel være tilgjengelig, og Kvitteringskomponenten er ansvarlig for å vise en generisk kvittering for innsendte data uavhengig av applikasjonen.

Tekster i Kvitteringskomponenten kan overstyres av applikasjonen ved å spesifisere tekster i applikasjonens `config/texts/resource.xx.json` fil.


{{%notice info%}}
Overstyring av tekster i kvitteringen vil ha påvirkning for alle kvitteringer for den gitte applikasjonen. Dette betyr at alle skjemaer som allerede er insendt vil også få det oppdaterte tekstene. PDF filen som er generert vil IKKE påvirkes av dette, men denne vil inneholde tekstene som var tilgjengelig når PDFen ble generert.
{{% /notice%}}


Dette er tekstnøklene som kan brukes for å overstyre standardtekstene:

```
receipt_platform.attachments
receipt_platform.date_sent
receipt_platform.helper_text
receipt_platform.is_sent
receipt_platform.receipt
receipt_platform.receiver
receipt_platform.reference_number
receipt_platform.sender
receipt_platform.sent_content

```
Hvis du for eksempel vil overstyre hjelpeteksten, kan du legge dette til i `config/texts/resource.en.json` filen i applikasjonen:

```json
{
  "language": "nb",
  "resources": [
    {
      "id": "receipt_platform.helper_text",
      "value": "Min egendefinerte hjelpetekst"
    }
  ]
}
```
