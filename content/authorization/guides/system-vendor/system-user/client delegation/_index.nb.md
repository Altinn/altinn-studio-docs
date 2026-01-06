---
title: Klientdelegering for systemleverandør
description: Denne veiledningen viser hvordan systemleverandører kan integrere støtte for klientdelegering i sine sluttbrukersystemer ved hjelp av Altinns API-er. Klientdelegering gjør det mulig for en systembruker å representere klienter (f.eks. klienter av regnskapsførere eller revisorer) i kommunikasjon med offentlige tjenester. Hvert funksjonelt steg er illustrert med konkrete API-eksempler, slik at du enkelt kan implementere løsningen i ditt system. 
linktitle: Klientdelegering
weight: 5
toc: true
---

Egen guide for _klientdelegering_ som sluttbruker finner du her: [Klientdelegering](/nb/authorization/guides/end-user/system-user/delegate-clients/)


## 1 Hent systembrukere for klientsystem

Finn alle systembrukere for klientsystem som er knyttet til din organisasjon.


**API endepunkt:** `GET authentication/api/v1/enduser/systemuser/agents`

**Scopes:** Idporten token utvekslet som altinn token med scope `altinn:clientdelegations.read`

**Innholdstype:** `application/json`

### Forespørselparametere

**party:** orgnummer til eier systembruker

### Eksempel på forespørsel

{{environmenturl}}/authentication/api/v1/enduser/systemuser/agents?party=314250052

### Eksempel på respons

```json
[
    {
        "id": "6af73152-3304-47d6-b418-01cf7f3cdfd5",
        "integrationTitle": "Playwright-e2e-revisor-1750059427693-0.5132620954683862",
        "systemId": "310547891_Playwright-e2e-revisor-1750059427693-0.5132620954683862",
        "productName": "",
        "systemInternalId": "e7229409-d999-4103-ba4b-b2704b8ce70c",
        "partyId": "51117759",
        "partyUuId": "",
        "reporteeOrgNo": "314250052",
        "created": "2025-06-16T07:37:11.895306Z",
        "isDeleted": false,
        "supplierName": "",
        "supplierOrgno": "310547891",
        "externalRef": "0.2gfn08aq3661750059428187",
        "accessPackages": [
            {
                "urn": "urn:altinn:accesspackage:ansvarlig-revisor"
            }
        ],
        "userType": "agent"
    },
    {
        "id": "2bab4e06-1ae8-4037-9d59-9b31250b4da8",
        "integrationTitle": "Playwright-e2e-regnskapsfoerer-1750059436258-0.04049319303233756",
        "systemId": "310547891_Playwright-e2e-regnskapsfoerer-1750059436258-0.04049319303233756",
        "productName": "",
        "systemInternalId": "f3196b16-176c-4b28-a62c-906fdcc542a0",
        "partyId": "51117759",
        "partyUuId": "",
        "reporteeOrgNo": "314250052",
        "created": "2025-06-16T07:37:17.563908Z",
        "isDeleted": false,
        "supplierName": "",
        "supplierOrgno": "310547891",
        "externalRef": "0.3sn2wdnna2z1750059436420",
        "accessPackages": [
            {
                "urn": "urn:altinn:accesspackage:regnskapsforer-lonn"
            }
        ],
        "userType": "agent"
    }
]
```

## 2 Hent tilgjengelige klienter for systembrukeren


Hent en liste over klienter som kan delegeres til systembrukeren for klientsystem.

**API endepunkt:** `GET authentication/api/v1/enduser/systemuser/clients/available`

**Scopes:** Idporten token utvekslet som altinn token med scope `altinn:clientdelegations.read`

**Innholdstype:** `application/json`

### Forespørselparametere

**agent:** Den unike identifikatoren til systembruker for klientforhold

**paginering:** API-et har foreløpig ikke støtte for paginering, men dette planlegges implementert i en senere versjon. Vi har nå lagt grunnlaget for paginering i systemet.

### Eksempel på forespørsel

{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/available?agent=1b6cea43-f499-4aae-a633-51cf542795af

### Eksempel på respons

```json
{
    "links": {},
    "systemUserInformation": {
        "systemUserId": "1b6cea43-f499-4aae-a633-51cf542795af",
        "systemUserOwnerOrg": "314250052"
    },
    "data": [
        {
            "clientId": "fffefbe8-72ed-4729-b80b-dc16a96f4d9f",
            "clientOrganizationNumber": "310609544",
            "clientOrganizationName": "AUTORISERT VEIK TIGER AS"
        },
        {
            "clientId": "f9475c0b-2ee4-4a41-b306-f428f00ec21f",
            "clientOrganizationNumber": "313872076",
            "clientOrganizationName": "TØFF SITRONGUL TIGER AS"
        },
        {
            "clientId": "f909a031-5a6b-4cd7-910d-7f71bdba51d5",
            "clientOrganizationNumber": "310599298",
            "clientOrganizationName": "SPESIFIKK OPPSTEMT TIGER AS"
        },
    ]
}
```

## 3 Hent delegerte klienter for systembrukeren

Se hvilke klienter som allerede er delegert til systembrukeren for klientforhold


**API endepunkt:** `GET authentication/api/v1/enduser/systemuser/clients/`

**Scopes:** Idporten token utvekslet som altinn token med scope `altinn:clientdelegations.read`

**Innholdstype:** `application/json`

### Forespørselparametere

**agent:** Den unike identifikatoren til systembruker for klientforhold

**paginering:** API-et har foreløpig ikke støtte for paginering, men dette planlegges implementert i en senere versjon. Vi har nå lagt grunnlaget for paginering i systemet.

### Eksempel på forespørsel

{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/?agent=d06fe261-c46b-4d8b-b54d-b87aa6711f4c

### Eksempel på respons

```json
{
    "links": {},
    "systemUserInformation": {
        "systemUserId": "d06fe261-c46b-4d8b-b54d-b87aa6711f4c",
        "systemUserOwnerOrg": "314250052"
    },
    "data": [
        {
            "clientId": "cdc9c5ef-caff-4617-b4da-30f405ed373a",
            "clientOrganizationNumber": "313169960",
            "clientOrganizationName": "LILLA BLØT TIGER AS"
        }
    ]
}
```

## 4 Deleger en klient til systembrukeren

Delegerer tilgang fra en klient til systembrukeren for klientforhold


**API endepunkt:** `POST authentication/api/v1/enduser/systemuser/clients/`

**Scopes:** Idporten token utvekslet som altinn token med scope `altinn:clientdelegations.read` `altinn:clientdelegations.write`

**Innholdstype:** `application/json`

### Forespørselparametere

**agent:** Den unike identifikatoren til systembruker for klientforhold

**client:** Den unike identifikatoren til klienten som skal legges til systembrukeren

### Eksempel på forespørsel

{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/?agent=58cd5a57-ea49-4d04-bf7d-d48b338c68db&client=ff254c60-d02a-4ae8-bcd1-34cce38a823a

### Eksempel på respons

```json
{
    "agent": "58cd5a57-ea49-4d04-bf7d-d48b338c68db",
    "client": "ff254c60-d02a-4ae8-bcd1-34cce38a823a"
}
```

## 5 Fjern en klient fra systembrukeren

Fjerner en eksisterende klient fra systembruker for klientforhold


**API endepunkt:** `DELETE authentication/api/v1/enduser/systemuser/clients/`

**Scopes:** Idporten token utvekslet som altinn token med scope `altinn:clientdelegations.read` `altinn:clientdelegations.write`

**Innholdstype:** `application/json`

### Forespørselparametere

**agent:** Den unike identifikatoren til systembruker for klientforhold

**client:** Den unike identifikatoren til klienten som skal fjernes fra systembrukeren

### Eksempel på forespørsel

{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/?agent=58cd5a57-ea49-4d04-bf7d-d48b338c68db&client=ff254c60-d02a-4ae8-bcd1-34cce38a823a

### Eksempel på respons

```json
{
    "agent": "58cd5a57-ea49-4d04-bf7d-d48b338c68db",
    "client": "ff254c60-d02a-4ae8-bcd1-34cce38a823a"
}
```

## Utforsk API-dokumentasjonen
For fullstendig teknisk dokumentasjon, inkludert detaljerte beskrivelser av parametere, responser og autentisering, gå til Altinns OpenAPI-grensesnitt her: (kommer)
