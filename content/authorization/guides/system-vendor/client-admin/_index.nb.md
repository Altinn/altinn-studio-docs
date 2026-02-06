---
title: Klientadministrasjon API
description: Denne veiledningen forklarer hvordan du bruker klientadministrasjons-API-et.
linktitle: Klientadministrasjon
toc: false
---

Altinn tilbyr nå et klientadministrasjons-API for å håndtere klienter og brukere for tjenestetilbydere.

## Hva er en tjenestetilbyder?

I denne sammenhengen er en tjenestetilbyder en virksomhet som:

- Er registrert som regnskapsfører for andre virksomheter i Enhetsregisteret (ER).
- Er registrert som revisor for andre virksomheter i Enhetsregisteret.
- Er registrert som forretningsfører for andre virksomheter i Enhetsregisteret.
- Har blitt delegert en eller flere tilgangspakker for virksomheter og personer i Altinn.

## Hva er en klient?

- Virksomhet som har registrert din virksomhet i Enhetsregisteret som regnskapsfører.
- Virksomhet som har registrert din virksomhet i Enhetsregisteret som revisor.
- Virksomhet som har registrert din virksomhet i Enhetsregisteret som forretningsfører.
- Virksomhet som i Altinn har delegert tilgangspakker til din virksomhet.

![Klientadmin](clientadmin.drawio.svg)

## Hva består klientrettigheter av?

Klientrettigheter består av tilgangspakker som tjenestetilbyder kan videredelegere til brukere i Altinn som er registrert som agenter for tjenestetilbyderen.

For tilganger gitt via Altinn tilgangsstyring kan dette omfatte alle tilgangspakker for virksomheter og personer. 

For klientrelasjoner registrert i Enhetsregisteret gir disse relasjonene følgende:

### Regnskapsfører

Rollen regnskapsfører i Enhetsregisteret gir [følgende tilgangspakker](https://platform.altinn.no/accessmanagement/api/v1/meta/info/roles/46e27685-b3ba-423e-8b42-faab54de5817/packages?variant=AS) som kan videredelegeres.

Klikk på pakkenavnet for å se hvilke konkrete rettigheter disse pakkene gir til tjenester.

- Tilgangspakken [Regnskapsfører lønn](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/43becc6a-8c6c-4e9e-bb2f-08fe588ada21)
- Tilgangspakken [Regnskapsfører med signeringsrettighet](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/955d5779-3e2b-4098-b11d-0431dc41ddbe)
- Tilgangspakken [Regnskapsfører uten signeringsrettighet](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/a5f7f72a-9b89-445d-85bb-06f678a3d4d1)

### Revisor

Rollen revisor i Enhetsregisteret gir [følgende tilgangspakker](https://platform.altinn.no/accessmanagement/api/v1/meta/info/roles/f76b997a-9bd8-4f7b-899f-fcd85d35669f/packages?variant=AS) som kan videredelegeres.

Klikk på pakkenavnet for å se hvilke konkrete rettigheter disse pakkene gir til tjenester.

- Tilgangspakken [Ansvarlig revisor](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/2f176732-b1e9-449b-9918-090d1fa986f6)
- Tilgangspakken [Revisormedarbeider](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/96120c32-389d-46eb-8212-0a6540540c25)

### Forretningsfører

Når du er registrert som forretningsfører for en virksomhet som enten er borettslag eller eierseksjonssameie, får du [følgende tilgangspakke](https://platform.altinn.no/accessmanagement/api/v1/meta/info/roles/348b2f47-47ee-4084-abf8-68aa54c2b27f/packages?variant=BRL).

- Tilgangspakken [Forretningsfører eiendom](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/0195efb8-7c80-7cf2-bcc8-720a3fb39d44)

## Hvem kan få videredelegerte klientrettigheter?

Alle personer med fødselsnummer/D-nummer i Altinn kan tildeles klientrettigheter.

## Beskrivelse av API

API-et lar deg:

- Legge til nye brukere i virksomheten
- Gi brukere klientrettigheter for en klient ved å videredelegere tilgangspakker.
- Liste brukere med rettigheter for en klient.


### Autentisering

For å kalle API må man være innlogget med person som er klientadministrator for tjenestetilbyder. 

Dette skjer via en ID-porten klient.

ID-port tokenet må veklses inn til et Altinn token.

### Identifikatorer 

For å identifsere virksomheter og brukere benyttes dagens versjon av API et Altinns partyUuid identifikatorer. 
Dette er en UUID. Hver person eller virksomhet i Altinn har en unik UUID. 

#### Hvordan finner man disse?

- partyUuid for tjenestetilbyder er tilgjengelig i Authorized Party API. Dette apiet lister ut all virksomheter og personer en 
- partyUuid for agent er tilgjengelig i agent API
- partyUuid for klient er tilgjengelig i klientAPI

### API: Liste agenter

Dette lar deg liste ut alle personer som har blitt tildelt agentrollen for tjenestetilbyder.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}`

Party i parameter er partyUuid for tjenestetilbyder

Eksempel respons

```json
{
  "links": {
    "next": null
  },
  "data": [
    {
      "agent": {
        "id": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960",
        "name": "KREATIV GRANITT",
        "type": "Person",
        "variant": "Person",
        "keyValues": {
          "PartyId": "50441038",
          "PersonIdentifier": "08919574934",
          "DateOfBirth": "1895-11-08"
        },
        "parent": null,
        "children": null,
        "partyid": 50441038,
        "userId": 1465828,
        "username": null,
        "organizationIdentifier": null,
        "personIdentifier": "08919574934",
        "dateOfBirth": "1895-11-08",
        "dateOfDeath": "2020-12-22",
        "isDeleted": false,
        "deletedAt": null
      },
      "access": [
        {
          "role": {
            "id": "ff4c33f5-03f7-4445-85ed-1e60b8aafb30",
            "code": "agent",
            "urn": "urn:altinn:role:agent",
            "legacyurn ": null,
            "children": null
          },
          "packages": []
        }
      ]
    }
  ]
}
```


### API: Legge til agent

Dette lar deg legge til en agent for tjenestetilbyder. Her oppgir man personummer til person samt etternavn

- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}`
- **Production**: `POST https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}`

Eksempel request body

```json
{
  "personidentifier": "01038712345", // fnr or username
  "lastName": "Salt"
}
```


Eksempel respons


```json
{
  "id": "019c2e70-c577-7b20-a11c-245fecd5e564",
  "roleId": "ff4c33f5-03f7-4445-85ed-1e60b8aafb30",
  "fromId": "4a06214d-b261-4695-b33a-0771a995b503",
  "toId": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960"
}

```

### API: Slette agent

Dette apiet fjerner agent rollen gitt til en bruker fra tjenestetilbyder.

Klientdelegeringer som er gitt for klienter vil forsinne i samme operasjon

- **Test**: `DELETE https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}&to={{to}}`
- **Production**: `DELETE https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}&to={{to}}`


{{party}} er partyUuid for tjenestetilbyder

{{to}} er partyUuid for agent


### API: Liste klienter

Dette apiet lar deg liste alle klienter.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/clients?party={{party}}`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/clients?party={{party}}`


{{party}} er partyUuid for tjenestetilbyder.


Eksempel respons

```json
{
  "links": {
    "next": null
  },
  "data": [
    {
      "client": {
        "id": "006cdf09-e874-4fcc-8502-5342b871e2ac",
        "name": "ENKEL SKJØR TIGER AS",
        "type": "Organisasjon",
        "variant": "AS",
        "keyValues": {
          "OrganizationIdentifier": "310757314",
          "PartyId": "51591744"
        },
        "parent": null,
        "children": null,
        "partyid": 51591744,
        "userId": null,
        "username": null,
        "organizationIdentifier": "310757314",
        "personIdentifier": null,
        "dateOfBirth": null,
        "dateOfDeath": null,
        "isDeleted": false,
        "deletedAt": null
      },
      "access": [
        {
          "role": {
            "id": "46e27685-b3ba-423e-8b42-faab54de5817",
            "code": "regnskapsforer",
            "urn": "urn:altinn:external-role:ccr:regnskapsforer",
            "legacyurn ": "urn:altinn:rolecode:regn",
            "children": null
          },
          "packages": [
            {
              "id": "a5f7f72a-9b89-445d-85bb-06f678a3d4d1",
              "urn": "urn:altinn:accesspackage:regnskapsforer-uten-signeringsrettighet",
              "areaId": "64cbcdc8-01c9-448c-b3d2-eb9582beb3c2"
            },
            {
              "id": "43becc6a-8c6c-4e9e-bb2f-08fe588ada21",
              "urn": "urn:altinn:accesspackage:regnskapsforer-lonn",
              "areaId": "64cbcdc8-01c9-448c-b3d2-eb9582beb3c2"
            },
            {
              "id": "955d5779-3e2b-4098-b11d-0431dc41ddbe",
              "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet",
              "areaId": "64cbcdc8-01c9-448c-b3d2-eb9582beb3c2"
            }
          ]
        }
      ]
    },
    {
      "client": {
        "id": "00d8acc2-3fac-49ad-88be-5d85ac28475e",
        "name": "OPPLYST REFLEKTERENDE TIGER AS",
        "type": "Organisasjon",
        "variant": "AS",
        "keyValues": {
          "OrganizationIdentifier": "310244589",
          "PartyId": "51546314"
        },
        "parent": null,
        "children": null,
        "partyid": 51546314,
        "userId": null,
        "username": null,
        "organizationIdentifier": "310244589",
        "personIdentifier": null,
        "dateOfBirth": null,
        "dateOfDeath": null,
        "isDeleted": false,
        "deletedAt": null
      },
      "access": [
        {
          "role": {
            "id": "46e27685-b3ba-423e-8b42-faab54de5817",
            "code": "regnskapsforer",
            "urn": "urn:altinn:external-role:ccr:regnskapsforer",
            "legacyurn ": "urn:altinn:rolecode:regn",
            "children": null
          },
          "packages": [
            {
              "id": "a5f7f72a-9b89-445d-85bb-06f678a3d4d1",
              "urn": "urn:altinn:accesspackage:regnskapsforer-uten-signeringsrettighet",
              "areaId": "64cbcdc8-01c9-448c-b3d2-eb9582beb3c2"
            },
            {
              "id": "955d5779-3e2b-4098-b11d-0431dc41ddbe",
              "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet",
              "areaId": "64cbcdc8-01c9-448c-b3d2-eb9582beb3c2"
            },
            {
              "id": "43becc6a-8c6c-4e9e-bb2f-08fe588ada21",
              "urn": "urn:altinn:accesspackage:regnskapsforer-lonn",
              "areaId": "64cbcdc8-01c9-448c-b3d2-eb9582beb3c2"
            }
          ]
        }
      ]
    }
  ]
}

```


### API: Delegere klientrettigheter til agent

Dette apiet gjør det mulig å videredelegere tilgangspakker som tjenestetilbyder har for klienter.


- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&from={{fromOrg}}&to={{to}}`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&from={{fromOrg}}&to={{to}}`

{{party}} partyUuid for tjenestetilbyder
{{fromOrg}} partyUuid for klient
{{to}} partyUuid for agent


Eksempel delegering av tilgangspakke for skatteegrunnlag
```json
{
  "values": [
   {
     "role": "rettighetshaver",
     "packages" : [
       "urn:altinn:accesspackage:skattegrunnlag"
     ]
   }
  ]
}

```

Eksempel respons

```json
[
  {
    "roleId": "42cae370-2dc1-4fdc-9c67-c2f4b0f0f829",
    "packageId": "4c859601-9b2b-4662-af39-846f4117ad7a",
    "viaId": "0dbde1a0-0680-414f-9f2e-80cba19c4407",
    "fromId": "e902b28d-bc80-4712-8cf4-438ef737f047",
    "toId": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960",
    "changed": true
  }
]
```


### API: Liste agenter som har rettigheter for klient

Dette apiet lar deg liste hvilke agenter som har tilgang til klient


- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/clients/accesspackages?party={{party}}&from={{from}}`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/clients/accesspackages?party={{party}}&from={{from}}`


{{party}} partyUuid for tjenestetilbyder
{{fromOrg}} partyUuid for klient

Eksempel respons

```json
{
  "links": {
    "next": null
  },
  "data": [
    {
      "agent": {
        "id": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960",
        "name": "KREATIV GRANITT",
        "type": "Person",
        "variant": "Person",
        "keyValues": {
          "PartyId": "50441038",
          "PersonIdentifier": "08919574934",
          "DateOfBirth": "1895-11-08"
        },
        "parent": null,
        "children": null,
        "partyid": 50441038,
        "userId": 1465828,
        "username": null,
        "organizationIdentifier": null,
        "personIdentifier": "08919574934",
        "dateOfBirth": "1895-11-08",
        "dateOfDeath": "2020-12-22",
        "isDeleted": false,
        "deletedAt": null
      },
      "access": [
        {
          "role": {
            "id": "42cae370-2dc1-4fdc-9c67-c2f4b0f0f829",
            "code": "rettighetshaver",
            "urn": "urn:altinn:role:rettighetshaver",
            "legacyurn ": null,
            "children": null
          },
          "packages": [
            {
              "id": "4c859601-9b2b-4662-af39-846f4117ad7a",
              "urn": "urn:altinn:accesspackage:skattegrunnlag",
              "areaId": "7d32591d-34b7-4afc-8afa-013722f8c05d"
            }
          ]
        }
      ]
    }
  ]
}
```



### API: Liste klienter som en gitt agent har tilgang til

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&from={{fromOrg}}&to={{to}}`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&from={{fromOrg}}&to={{to}}`

