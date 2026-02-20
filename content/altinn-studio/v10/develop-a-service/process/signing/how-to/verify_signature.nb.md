---
title: Slik verifiserer du signaturen
linktitle: Verifisere signatur
description: Følg stegene i denne guiden for å verifisere mottatt signatur
draft: true
---


## 1. Lagre signaturobjektet i arkivsystemet ditt

Hent signaturobjektet sammen med resten av dataene fra instansen. Signaturobjektet inneholder en hash-kode av dataene.
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

Hvis flere dataelementer er signert, legger systemet dem til i listen `dataElementSignatures`.

Feltet `sha256Hash` inneholder en heksadesimal-kodet SHA256 hash generert fra dataene som er lagret i Altinn på tidspunktet for signeringen.
Objektet `signeeInfo` inneholder informasjonen om hvem som utførte signeringen.

## 2. Sjekk hash-koden for å oppdage endringer

{{% notice warning %}}
OBS! For at dette skal fungere, må både du og sluttbruker ha en kopi av hash-koden slik at de kan sammenlignes. 
Sluttbruker får hash-koden på sin kvittering.
{{% /notice %}}

Hvis noen endrer signaturobjektet i ettertid, kan du oppdage det ved å sjekke hash-koden. Hvis hash-koden ikke stemmer, betyr det at noen har endret dataene etter at de ble signert.

Også kalt en `digest`, denne verdien er resultatet fra SHA256 hash metoden. I eksempelet over har metoden blitt kjørt på en fil som tilhører et spesifikt dataelement, det vil si filen som ble signert.

Verifisering av signaturen i etterkant går i prinsippet ut på å sammenligne oppgitt `sha256Hash` med en uavhengig SHA256 beregning av samme fil. Hvis verdiene er identiske betyr det at filen brukeren har signert ikke har endret seg, og at signaturen fremdeles er gyldig.

Mer informasjon om Altinn sin implementering av denne utregningen finnes på [Github]

https://github.com/Altinn/altinn-storage/blob/afa8f921231afc485c17b8f4226f6d8e2333b3dd/src/Storage/Services/DataService.cs#L57

Kort oppsummert må du generere en SHA256 verdi av filen du vil sammenligne, deretter formattere denne verdien som en heksadesimal streng uten bindestreker og med kun små bokstaver. 
