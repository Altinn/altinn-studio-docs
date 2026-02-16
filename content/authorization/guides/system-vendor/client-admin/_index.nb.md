---
title: Klientadministrasjons-API
description: Denne veiledningen forklarer hvordan du bruker klientadministrasjons-API-et.
linktitle: Klientadministrasjon
toc: false
---

Altinn tilbyr nå et klientadministrasjons-API for å håndtere klienter og brukere for tjenestetilbydere.

## Forutsetninger for bruk

- Man er delegert scopet `altinn:clientdelegations.write`.
- Man har satt opp en ID-porten-klient i applikasjonen som ber om dette scopet.
- Man logger inn som klientadministrator for tjenestetilbyderen.


## Hva er en tjenestetilbyder?

I denne sammenhengen er en tjenestetilbyder en virksomhet som:

- Er registrert som regnskapsfører for andre virksomheter i Enhetsregisteret (ER).
- Er registrert som revisor for andre virksomheter i Enhetsregisteret.
- Er registrert som forretningsfører for andre virksomheter i Enhetsregisteret.
- Har blitt delegert en eller flere tilgangspakker for virksomheter og personer i Altinn.

## Hva er en klient?

- Virksomhet som har registrert tjenestetilbyder i Enhetsregisteret som regnskapsfører.
- Virksomhet som har registrert tjenestetilbyder i Enhetsregisteret som revisor.
- Virksomhet (BRL eller ESEK) som har registrert tjenestetilbyder i Enhetsregisteret som forretningsfører.
- Virksomhet som i Altinn har delegert tilgangspakker til tjenestetilbyder.
- Innbygger som i Altinn har delegert tilgangspakke til tjenestetilbyder.

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

Før man kan delegere klientrettigheter (tilgangspakker) til en person, må det være definert et agentforhold mellom personen og tjenestetilbyderen.
Dette gjøres via eget API. Sletting av agentforholdet vil samtidig fjerne alle klientrettigheter som tjenestetilbyderen har gitt til agenten.

## Beskrivelse av API

API-et lar deg:

- Legge til nye brukere i virksomheten
- Gi brukere klientrettigheter for en klient ved å videredelegere tilgangspakker.
- Liste brukere med rettigheter for en klient.


### Autentisering

For å bruke API-et må man være innlogget som klientadministrator for tjenestetilbyderen.

Dette skjer via en ID-porten-klient.

ID-porten-tokenet må veksles inn til et Altinn-token.

### Identifikatorer 

I dagens versjon av API-et benyttes Altinns `partyUuid`-identifikatorer. 
Dette er UUID-er; hver person eller virksomhet i Altinn har en unik UUID. 

#### Hvordan finner man disse?

- `partyUuid` for tjenestetilbyder er tilgjengelig i Authorized Party API-et. Dette API-et lister opp alle virksomheter og personer en bruker er autorisert for.
- `partyUuid` for agent er tilgjengelig i Agent-API-et.
- `partyUuid` for klient er tilgjengelig i Klient-API-et.

### API: Liste agenter

Dette lar deg liste ut alle personer som har blitt tildelt agentrollen for tjenestetilbyder.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}`

Parameteren `party` er `partyUuid` for tjenestetilbyderen.

Eksempelrespons

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

Dette lar deg legge til en agent for tjenestetilbyderen. Oppgi fødselsnummer (fnr) eller brukernavn, samt etternavn.

- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}`
- **Production**: `POST https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}`

Eksempel forespørsel (body)

```json
{
  "personidentifier": "01038712345", // fødselsnummer (fnr) eller brukernavn
  "lastName": "Salt"
}
```


Eksempelrespons


```json
{
  "id": "019c2e70-c577-7b20-a11c-245fecd5e564",
  "roleId": "ff4c33f5-03f7-4445-85ed-1e60b8aafb30",
  "fromId": "4a06214d-b261-4695-b33a-0771a995b503",
  "toId": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960"
}

```

### API: Slette agent

Dette API-et fjerner agentrollen gitt til en bruker fra tjenestetilbyderen.

Klientdelegeringer gitt for klienter vil forsvinne i samme operasjon avhengig om cascade = false eller true. Default er true

- **Test**: `DELETE https://platform.tt02.altinn.no{{baseUrl}}/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}&to={{to}}&cascade=false`
- **Production**: `DELETE https://platform.altinn.no{{baseUrl}}/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}&to={{to}}&cascade=false`


{{party}} er partyUuid for tjenestetilbyderen.

{{to}} er partyUuid for agenten.


### API: Liste klienter

Dette API-et lar deg liste alle klienter.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/clients?party={{party}}`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/clients?party={{party}}`


{{party}} er partyUuid for tjenestetilbyderen.


Eksempelrespons

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

{{% alert title="Viktig" color="warning" %}}
Klient-API inkluderer også virksomheter som har gitt tilgang på andre måter enn det som er nevnt som klienter. Disse vil det ikke være noen delegerbare klientforhold på. Dette gjelder f.eks:
- BEDR-relasjon – underenheter som i Enhetsregisteret har BEDR-knytning til aktuell party.
{{% /alert %}}



### API: Delegere klientrettigheter til agent

Dette API-et gjør det mulig å videredelegere tilgangspakker som tjenestetilbyderen har for klienter.


- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&from={{fromOrg}}&to={{to}}`
- **Production**: `POST https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&from={{fromOrg}}&to={{to}}`

{{party}} er partyUuid for tjenestetilbyderen.
{{fromOrg}} er partyUuid for klienten.
{{to}} er partyUuid for agenten.


Eksempeldelegering av tilgangspakke for skattegrunnlag
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

Eksempelrespons

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

### API: Slette klientrettigheter til agent

Dette API-et lar deg fjerne en eller flere tilgangspakker som er klientdelegert til en agent for en klient.

- **Test**: `DELETE https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&from={{from}}&to={{to}}`
- **Production**: `DELETE https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&from={{from}}&to={{to}}`

```json
{
  "values": [
   {
     "role": "rettighetshaver",
     "packages" : [
       "urn:altinn:accesspackage:innbygger-samliv"
     ]
   }
  ]
}
```

Eksempelrespons

```json
[
  {
    "roleId": "42cae370-2dc1-4fdc-9c67-c2f4b0f0f829",
    "packageId": "7778f33d-83b7-4089-93fc-4fbacbf28600",
    "viaId": "03b14d35-4b8c-44cd-9c71-dc740d8585c2",
    "fromId": "a4c0369b-2261-4123-ac03-e0028a64d265",
    "toId": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960",
    "changed": true
  }
]
```

Hvis man prøver å slette en pakke som allerede er slettet eller ikke finnes, vil `changed` i responsen være false.


### API: Liste agenter som har rettigheter for klient

Dette API-et lar deg liste hvilke agenter som har tilgang til en klient.


- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/clients/accesspackages?party={{party}}&from={{from}}`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/clients/accesspackages?party={{party}}&from={{from}}`


{{party}} er partyUuid for tjenestetilbyderen.
{{from}} er partyUuid for klienten.

Eksempelrespons

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

Dette API-et lister alle klienter en gitt agent har blitt delegert tilgangspakker for. Responsen inneholder detaljinformasjon om hvilke pakker og hvilke klienter agenten er blitt delegert.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&to={{to}}`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&to={{to}}`


{{party}} er partyUuid for tjenestetilbyderen.
{{to}} er partyUuid for agenten.

Eksempelrespons

```json
{
  "links": {
    "next": null
  },
  "data": [
    {
      "client": {
        "id": "e902b28d-bc80-4712-8cf4-438ef737f047",
        "name": "GEOMETRISK VOKSENDE TIGER AS",
        "type": "Organisasjon",
        "variant": "AS",
        "keyValues": {
          "OrganizationIdentifier": "310757632",
          "PartyId": "51561408"
        },
        "parent": null,
        "children": null,
        "partyid": 51561408,
        "userId": null,
        "username": null,
        "organizationIdentifier": "310757632",
        "personIdentifier": null,
        "dateOfBirth": null,
        "dateOfDeath": null,
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
