---
title: Klient delegering
description: API for å håndtere kunder for et agentsystem
toc: true
---

## Klientdelegerings-API
Klientdelegerings-API-et tilbyr metoder for å administrere klienter for en agentsystembruker fra et tredjepartssystem.

## Sikkerhetsoppsett
Bærer-autentiseringsskjema brukes for autentisering. Systembruker-API krever at eksterne autentiserer seg med et bærertoken, som er et ID-porten-token med spesifikt scope. Dette tokenet må byttes til et Altinn-token ved å bruke endepunktet GET authentication/api/v1/exchange/id-porten (på testmiljø, legg til spørringsparameteren ?test=true)

## API Methods

- [List alle agent-systembrukere for partiet](#list-alle-agent-systembrukere-for-partiet)
- [List alle tilgjengelige klienter for systembrukeren](#list-alle-tilgjengelige-klienter-for-systembrukeren)
- [List alle delegerte klienter for systembrukeren](#list-alle-delegerte-klienter-for-systembrukeren)
- [Deleger en klient til systembrukeren](#deleger-en-klient-til-systembrukeren)
- [Fjern en klient fra systembrukeren](#fjern-en-klient-fra-systembrukeren)

## List alle agent-systembrukere for partiet
Lists all the agent system users for the party 

### Endepunkt
GET authentication/api/v1/enduser/systemuser/agents

### Scopes
Idporten token utvekslet som altinn token med scope <mark>altinn:clientdelegations.read</mark>

### Innholdstype
application/json

## Query parametere

#### party
orgnummer til party som eier systembruker

### Eksempel på forespørsel
{{environmenturl}}/authentication/api/v1/enduser/systemuser/agents?party=314250052

### Eksempel på respons
```
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
    },
    {
        "id": "f18f8ffe-d2d6-4ff5-a97a-d8b6e25c293b",
        "integrationTitle": "Playwright-e2e-revisor-1750161480040-0.4388583986327166",
        "systemId": "310547891_Playwright-e2e-revisor-1750161480040-0.4388583986327166",
        "productName": "",
        "systemInternalId": "ad3df1f1-6f90-4474-90fb-7fcfd5fcd421",
        "partyId": "51117759",
        "partyUuId": "",
        "reporteeOrgNo": "314250052",
        "created": "2025-06-17T11:58:03.755446Z",
        "isDeleted": false,
        "supplierName": "",
        "supplierOrgno": "310547891",
        "externalRef": "0.dn8ds5u5kgv1750161480737",
        "accessPackages": [
            {
                "urn": "urn:altinn:accesspackage:ansvarlig-revisor"
            }
        ],
        "userType": "agent"
    },
    {
        "id": "3617b82d-7c7b-41a8-b725-241fd91f7b6e",
        "integrationTitle": "Playwright-e2e-regnskapsfoerer-1750161480033-0.33885797100228543",
        "systemId": "310547891_Playwright-e2e-regnskapsfoerer-1750161480033-0.33885797100228543",
        "productName": "",
        "systemInternalId": "df9ec3e1-1241-4a5a-aa63-e2507c17ad71",
        "partyId": "51117759",
        "partyUuId": "",
        "reporteeOrgNo": "314250052",
        "created": "2025-06-17T11:58:04.18921Z",
        "isDeleted": false,
        "supplierName": "",
        "supplierOrgno": "310547891",
        "externalRef": "0.zkgf0pshuj1750161480675",
        "accessPackages": [
            {
                "urn": "urn:altinn:accesspackage:regnskapsforer-lonn"
            }
        ],
        "userType": "agent"
    },
    {
        "id": "d06fe261-c46b-4d8b-b54d-b87aa6711f4c",
        "integrationTitle": "Playwright-e2e-revisor-1750230656654-0.46161420060319336",
        "systemId": "310547891_Playwright-e2e-revisor-1750230656654-0.46161420060319336",
        "productName": "",
        "systemInternalId": "80cf387c-e21c-4ab3-994c-5a98992b7833",
        "partyId": "51117759",
        "partyUuId": "",
        "reporteeOrgNo": "314250052",
        "created": "2025-06-18T07:11:04.032557Z",
        "isDeleted": false,
        "supplierName": "",
        "supplierOrgno": "310547891",
        "externalRef": "0.v5jxgywn1r1750230658516",
        "accessPackages": [
            {
                "urn": "urn:altinn:accesspackage:ansvarlig-revisor"
            }
        ],
        "userType": "agent"
    },
    {
        "id": "58cd5a57-ea49-4d04-bf7d-d48b338c68db",
        "integrationTitle": "Playwright-e2e-revisor-1750059048470-0.4687499504311414",
        "systemId": "310547891_Playwright-e2e-revisor-1750059048470-0.4687499504311414",
        "productName": "",
        "systemInternalId": "c7611df9-fed3-4e9c-af35-96df32158426",
        "partyId": "51117759",
        "partyUuId": "",
        "reporteeOrgNo": "314250052",
        "created": "2025-06-16T07:35:21.151487Z",
        "isDeleted": false,
        "supplierName": "",
        "supplierOrgno": "310547891",
        "externalRef": "0.epcdvs9an261750059049315",
        "accessPackages": [
            {
                "urn": "urn:altinn:accesspackage:ansvarlig-revisor"
            }
        ],
        "userType": "agent"
    }
]
```

## List alle tilgjengelige klienter for systembrukeren
Viser alle potensielle klienter for partiet som har tilgang til tilgangspakken for systembrukeren

### Endepunkt
GET authentication/api/v1/enduser/systemuser/clients/available

### Scopes
Idporten token utvekslet som altinn token med scope <mark>altinn:clientdelegations.read</mark>

### Innholdstype
application/json

## Query parametere

#### agent
Den unike identifikatoren til agent-systembrukeren

### Eksempel på forespørsel
{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/available?agent=1b6cea43-f499-4aae-a633-51cf542795af

### Eksempel på respons
```
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

## List alle delegerte klienter for systembrukeren
Viser alle de delegerte klientene for systembrukeren

### Endepunkt
GET authentication/api/v1/enduser/systemuser/clients/

### Scopes
Idporten token utvekslet som altinn token med scope <mark>altinn:clientdelegations.read</mark>

### Innholdstype
application/json

## Query parametere

#### agent
Den unike identifikatoren til agent-systembrukeren

### Eksempel på forespørsel
{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/?agent=d06fe261-c46b-4d8b-b54d-b87aa6711f4c

### Eksempel på respons
```
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

## Deleger en klient til systembrukeren
Delegerer en klient til systembrukeren

### Endepunkt
POST authentication/api/v1/enduser/systemuser/clients/

### Scopes
Idporten token utvekslet som altinn token med scope <mark>altinn:clientdelegations.read altinn:clientdelegations.write</mark>

### Innholdstype
application/json

## Query parametere

#### agent
Den unike identifikatoren til agent-systembrukeren

#### client
Den unike identifikatoren til klienten som skal legges til systembrukeren

### Eksempel på forespørsel
{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/?agent=58cd5a57-ea49-4d04-bf7d-d48b338c68db&client=ff254c60-d02a-4ae8-bcd1-34cce38a823a

### Eksempel på respons
```
{
    "agent": "58cd5a57-ea49-4d04-bf7d-d48b338c68db",
    "client": "ff254c60-d02a-4ae8-bcd1-34cce38a823a"
}
```

## Fjern en klient fra systembrukeren
Fjerner en klient fra systembrukeren

### Endepunkt
DELETE authentication/api/v1/enduser/systemuser/clients/

### Scopes
Idporten token utvekslet som altinn token med scope <mark>altinn:clientdelegations.read altinn:clientdelegations.write</mark>

### Innholdstype
application/json

## Query parametere

#### agent
Den unike identifikatoren til agent-systembrukeren

#### client
Den unike identifikatoren til klienten som skal fjernes fra systembrukeren

### Eksempel på forespørsel
{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/?agent=58cd5a57-ea49-4d04-bf7d-d48b338c68db&client=ff254c60-d02a-4ae8-bcd1-34cce38a823a

### Eksempel på respons
```
{
    "agent": "58cd5a57-ea49-4d04-bf7d-d48b338c68db",
    "client": "ff254c60-d02a-4ae8-bcd1-34cce38a823a"
}
```