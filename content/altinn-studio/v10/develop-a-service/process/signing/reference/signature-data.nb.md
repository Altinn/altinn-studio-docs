---
title: Slik lagres data fra signering
linktitle: Signeringsdata
draft: true
---

## Signaturobjektet
Når brukeren utfører signeringen, lagrer systemet et signeringobjekt som datatypen "signatur". Signeringobjektet ser omtrent slik ut:

```json
{
    "id": "ab5b8d43-64a5-482d-bfab-99e5ae6b2f55",
    "instanceGuid": "5267dc93-aa7d-4af9-934b-b0cf5b97d86e",
    "signedTime": "2023-06-16T12:16:36.6250698Z",
    "signeeInfo": {
        "userId": "1337",
        "personNumber": "01039012345",
        "organisationNumber": null
    },
    "dataElementSignatures": [
        {
            "dataElementId": "c71177df-e74d-44a2-976c-0443c98756ba",
            "sha256Hash": "cee2a288ccc273e85f9bdbbc2de52b02d0f0caac80a62e0352bd72689b283286",
            "signed": true
        }
    ]
}
```

### Sentrale felter
#### `dataElementSignatures`

Hvis flere dataelementer er signert, legger systemet dem til i listen `dataElementSignatures`.

#### `sha256Hash` 
Feltet `sha256Hash` inneholder en heksadesimal-kodet SHA256 hash generert fra dataene som er lagret i Altinn på tidspunktet for signeringen.

#### `signeeInfo`
Objektet `signeeInfo` inneholder informasjonen om hvem som utførte signeringen.

## Du kan laste ned data når prosessen er ferdig

Når prosessen i Altinn er gjennomført, kan du laste ned alle data inkludert signaturobjektet. Sluttbruker får en kvittering (PDF).

## Du kan konfigurere hvor lenge data skal lagres

Du kan konfigurere hvor lenge Altinn skal lagre instansen og dataene.

## Sluttbruker kan slette sin kvittering

Du kvitterer ut at du har lastet ned signaturobjektet og tilhørende data. Sluttbruker kan velge å beholde eller slette sin kvittering i innboksen.

Hvis sluttbruker sletter kvitteringen etter at du har lastet ned signaturobjektet, sletter Digdir signaturobjektet i våre systemer. 
Du må derfor lagre signaturobjektet og tilhørende data i egne systemer hvis du vil arkivere signaturen.