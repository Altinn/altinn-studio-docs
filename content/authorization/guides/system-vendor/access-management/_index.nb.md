---
title: Tilgangsstyrings-API
description: Slik bruker du tilgangsstyrings-API-et fra sluttbrukersystem
linktitle: Tilgangsstyring
toc: false
---

Altinn tilbyr et tilgangsstyrings-API som lar sluttbrukersystemer administrere tilganger mellom parter.
API-et gir mulighet til å se og håndtere hvem som har tilgang til hva, delegere tilgangspakker og enkeltrettigheter, og administrere klientforhold.

## Hva er et sluttbrukersystem?

Et sluttbrukersystem er programvare eller en nettside som kaller Altinns API-er på vegne av en bruker eller virksomhet. Det kan for eksempel være et regnskapssystem, en HR-løsning eller en portal fra en tjenesteeier med innlogging via ID-porten. Det finnes to typer:

- **Systemer med ID-porten-pålogging:** Nettløsninger eller applikasjoner der en person logger inn med ID-porten. Systemet handler på vegne av den påloggede brukeren. Dette kan være alt fra et regnskapssystem til en offentlig portal som tilbyr selvbetjeningsfunksjoner.
- **Systemer med systembruker:** Bakgrunnssystemer som bruker en [systembruker](../system-user/) til å kalle API-et uten at en person er pålogget. Systemet handler på vegne av virksomheten som har opprettet systembrukeren.

## Når er denne integrasjonen aktuell?

Tilgangsstyrings-API-et er relevant for systemer som ønsker å automatisere administrasjon av tilganger i Altinn. Eksempler:

- **Store virksomheter** som ønsker å automatisere hvilke tilganger ansatte har. I stedet for å logge inn i Altinn og delegere tilgangspakker manuelt kan virksomheten bruke API-et til å synkronisere tilganger fra egne HR- eller identitetssystemer.
- **Tjenestetilbydere** (regnskapsførere, revisorer o.l.) som administrerer tilganger for mange klienter og ønsker å gjøre dette effektivt gjennom egne systemer.
- **Forvaltningsløsninger** som trenger å vise brukeren hvilke parter de kan handle på vegne av, og hvilke rettigheter de har.

## OpenAPI

- [EndUser](../../../../api/accessmanagement/enduser/)

## Hvem kan bruke API-et?

API-et kan brukes av personer (via ID-porten) eller systembrukere (via Maskinporten).

### Autentisering med ID-porten

Personen logger inn via ID-porten. Under innlogging må sluttbrukeren gi samtykke til scopene som systemet ber om. Disse scopene avgrenser hva systemet kan gjøre på vegne av brukeren.

Se [autentisering med ID-porten](../../../getting-started/authentication/id-porten/) for detaljer om scopes og samtykke.

ID-porten-tokenet må deretter [veksles til et Altinn-token](../../../../api/).

### Relevante scopes

Systemet må be om de scopene som trengs for funksjonaliteten det skal bruke.

**Altinn tilgangsstyring**

| Scope | Valgfri/påkrevd | Beskrivelse |
|---|---|---|
| `altinn:accessmanagement/authorizedparties` | Les hvilke aktører (personer og virksomheter) den innloggede brukeren kan representere i Altinn |
| `altinn:accessmanagement/enduser:connections:fromothers.read` | Se mottatte tilganger for deg og andre du evt. er tilgangsstyrer for |
| `altinn:accessmanagement/enduser:connections:fromothers.write` | Slett mottatte tilganger gitt til deg eller andre aktører du er tilgangsstyrer for |
| `altinn:accessmanagement/enduser:connections:toothers.read` | Se tilganger gitt til andre, fra deg eller andre aktører du er tilgangsstyrer for |
| `altinn:accessmanagement/enduser:connections:toothers.write` | Opprett, oppdater og slett tilganger gitt til andre fra deg eller andre aktører du er tilgangsstyrer for |

**Altinn klientdelegering**

| Scope | Valgfri/påkrevd | Beskrivelse |
|---|---|---|
| `altinn:clientdelegations/myclients.read` | Se hvilke organisasjoner som har gitt deg tilgang til sine klienter, hvilke klienter du har mottatt klientdelegerte tilganger til, og hvilke tilganger du har mottatt for hver klient |
| `altinn:clientdelegations/myclients.write` | Slett mottatte klientdelegerte tilganger for en gitt klient, og slett ditt forhold til organisasjoner som har gitt deg tilgang til sine klienter (inkl. alle klienttilganger) |

{{% notice info %}}
På [digitalportal.azurewebsites.net](https://digitalportal.azurewebsites.net/) finner du en testapplikasjon som viser bruk av API-et.
{{% /notice %}}

### Autentisering med systembruker

API-et kan også brukes med en [systembruker](../system-user/).
Systembrukertokenet hentes fra Maskinporten og må deretter [veksles til et Altinn-token](../../../../api/).
Se [bruk av systembruker](../system-user/usetoken/) for detaljer om tokenveksling.

### Krav til tilgangspakke

For å bruke de fleste endepunktene i tilgangsstyrings-API-et må den innloggede brukeren eller systembrukeren ha en av følgende tilgangspakker for den aktuelle virksomheten:

- **Tilgangsstyring** (`urn:altinn:accesspackage:tilgangsstyring`)
- **Hovedadministrator** (`urn:altinn:accesspackage:hovedadministrator`)

## Identifikatorer

API-et bruker `partyUuid` som identifikator for parter. Hver person eller virksomhet i Altinn har en unik UUID.

Du finner `partyUuid` for aktuelle parter via Authorized Parties-endepunktet som er beskrevet nedenfor.

---

## API: Hente autoriserte parter

Henter alle parter (virksomheter og personer) som den innloggede brukeren er autorisert for.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/authorizedparties`
- **Produksjon**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/authorizedparties`

#### Spørreparametere

| Parameter | Type | Standardverdi | Beskrivelse |
|---|---|---|---|
| `includeRoles` | boolean | false | Inkluder roller i responsen |
| `includeAccessPackages` | boolean | false | Inkluder tilgangspakker i responsen |
| `includeResources` | boolean | false | Inkluder ressurser i responsen |
| `includeInstances` | boolean | false | Inkluder instanser i responsen |
| `includePartiesViaKeyRoles` | false/true/auto | auto | Inkluder parter via nøkkelroller |
| `includeSubParties` | false/true/auto | auto | Inkluder underparter |
| `includeInactiveParties` | false/true/auto | auto | Inkluder inaktive parter |
| `partyFilter` | array (UUID) | null | Filtrer på spesifikke parter |
| `anyOfResourceIds` | array (string) | null | Filtrer på ressurs-ID-er |

{{% notice tip %}}
Hvis du ønsker å finne hvilke parter den påloggede brukeren har tilgangsstyringsrettigheter for, kan du bruke `anyOfResourceIds`-filteret med ressurs-ID-en for tilgangsstyring:

`GET .../enduser/authorizedparties?anyOfResourceIds=urn:altinn:resource:accessmanagement/authorizedparties`

Da returneres kun parter der brukeren har rettigheter til å styre tilganger.
{{% /notice %}}

Eksempelrespons

```json
{
  "links": {
    "next": null
  },
  "data": [
    [
      {
        "partyUuid": "4a06214d-b261-4695-b33a-0771a995b503",
        "name": "GEOMETRISK VOKSENDE TIGER AS",
        "organizationNumber": "310757632",
        "partyId": 51561408,
        "type": "Organization",
        "unitType": "AS",
        "isDeleted": false,
        "onlyHierarchyElementWithNoAccess": false,
        "authorizedAccessPackages": [
          "urn:altinn:accesspackage:skattegrunnlag"
        ],
        "authorizedRoles": [
          "urn:altinn:role:tilgangsstyrer"
        ],
        "subunits": []
      }
    ]
  ]
}
```

---

## API: Hente tilkoblinger

Henter alle tilkoblinger (relasjoner) for en gitt part. En tilkobling viser hvem som har tilgang til hva, inkludert roller, tilgangspakker og ressurser.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections`
- **Produksjon**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/connections`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `party` | UUID | Ja | partyUuid for personen eller virksomheten du er tilgangstyrer for |
| `from` | UUID | Nei | Filtrer på avsender |
| `to` | UUID | Nei | Filtrer på mottaker |
| `includeClientDelegations` | boolean | Nei (standard: true) | Inkluder klientdelegeringer |
| `includeAgentConnections` | boolean | Nei (standard: true) | Inkluder agenttilkoblinger |

`party` må være lik enten `to` eller `from`. Verdien angir hvilken part du styrer tilganger for. Kombinasjonen avgjør retningen på oppslaget:

- **`party` = `to`**: Henter rettigheter som er gitt **til** denne parten (hvem har gitt parten tilgang?).
- **`party` = `from`**: Henter rettigheter som er gitt **fra** denne parten (hvem har parten gitt tilgang til?).

Paginering styres med `X-Page-Size` og `X-Page-Number` i headere.


Eksempelrespons

```json
{
  "links": {
    "next": null
  },
  "data": [
    {
      "party": {
        "id": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960",
        "name": "KREATIV GRANITT",
        "type": "Person",
        "variant": "Person"
      },
      "roles": [
        {
          "id": "42cae370-2dc1-4fdc-9c67-c2f4b0f0f829",
          "code": "rettighetshaver",
          "urn": "urn:altinn:role:rettighetshaver"
        }
      ],
      "packages": [
        {
          "id": "4c859601-9b2b-4662-af39-846f4117ad7a",
          "urn": "urn:altinn:accesspackage:skattegrunnlag"
        }
      ],
      "resources": []
    }
  ]
}
```

## API: Opprette tilkobling

Oppretter en ny tilkobling (delegering) til en person. Oppgi fødselsnummer og etternavn.

- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections`
- **Produksjon**: `POST https://platform.altinn.no/accessmanagement/api/v1/enduser/connections`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `party` | UUID | Ja | partyUuid for parten |
| `to` | UUID | Nei | partyUuid for mottaker (alternativ til body) |

Eksempelforespørsel (body)

```json
{
  "personIdentifier": "01038712345",
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

## API: Slette tilkobling

Sletter en tilkobling mellom to parter.

- **Test**: `DELETE https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections`
- **Produksjon**: `DELETE https://platform.altinn.no/accessmanagement/api/v1/enduser/connections`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `party` | UUID | Ja | partyUuid for parten |
| `from` | UUID | Ja | partyUuid for avsenderen |
| `to` | UUID | Ja | partyUuid for mottakeren |
| `cascade` | boolean | Nei | Slett også underliggende delegeringer |

---

## API: Hente tilgangspakker for en tilkobling

Henter tilgangspakker som er delegert mellom to parter.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages`
- **Produksjon**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `party` | UUID | Ja | partyUuid for parten |
| `from` | UUID | Nei | partyUuid for avsenderen |
| `to` | UUID | Nei | partyUuid for mottakeren |

Paginering styres med `X-Page-Size` og `X-Page-Number` i headere.

## API: Delegere tilgangspakke

Delegerer en tilgangspakke til en person.

- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages`
- **Produksjon**: `POST https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `party` | UUID | Ja | partyUuid for parten |
| `to` | UUID | Nei | partyUuid for mottaker (alternativ til body) |
| `packageId` | UUID | Nei | ID for tilgangspakken |
| `package` | string | Nei | URN for tilgangspakken |

Eksempelforespørsel (body)

```json
{
  "personIdentifier": "01038712345",
  "lastName": "Salt"
}
```

Eksempelrespons

```json
{
  "id": "019c2e70-c577-7b20-a11c-245fecd5e564",
  "assignmentId": "ff4c33f5-03f7-4445-85ed-1e60b8aafb30",
  "packageId": "4c859601-9b2b-4662-af39-846f4117ad7a"
}
```

## API: Fjerne tilgangspakke

Fjerner en delegert tilgangspakke fra en tilkobling.

- **Test**: `DELETE https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages`
- **Produksjon**: `DELETE https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `party` | UUID | Ja | partyUuid for parten |
| `from` | UUID | Ja | partyUuid for avsenderen |
| `to` | UUID | Ja | partyUuid for mottakeren |
| `packageId` | UUID | Nei | ID for tilgangspakken |
| `package` | string | Nei | URN for tilgangspakken |

## API: Kontrollere delegeringsmulighet for tilgangspakker

Sjekker om den innloggede brukeren kan delegere en gitt tilgangspakke på vegne av parten.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages/delegationcheck`
- **Produksjon**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/accesspackages/delegationcheck`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `party` | UUID | Ja | partyUuid for parten |
| `packageIds` | array (UUID) | Nei | ID-er for tilgangspakkene |
| `packages` | array (string) | Nei | URN-er for tilgangspakkene |

Eksempelrespons

```json
{
  "links": {
    "next": null
  },
  "data": [
    {
      "package": {
        "id": "4c859601-9b2b-4662-af39-846f4117ad7a",
        "urn": "urn:altinn:accesspackage:skattegrunnlag"
      },
      "result": true,
      "reasons": []
    }
  ]
}
```

---

## API: Hente roller for en tilkobling

Henter roller som en part har fått delegert i en tilkobling.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/roles`
- **Produksjon**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/roles`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `party` | UUID | Ja | partyUuid for parten |
| `from` | UUID | Ja | partyUuid for avsenderen |
| `to` | UUID | Ja | partyUuid for mottakeren |

Paginering styres med `X-Page-Size` og `X-Page-Number` i headere.

---

## API: Hente ressurser for en tilkobling

Henter ressurser som er delegert mellom to parter.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/resources`
- **Produksjon**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/resources`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `party` | UUID | Ja | partyUuid for parten |
| `from` | UUID | Nei | partyUuid for avsenderen |
| `to` | UUID | Nei | partyUuid for mottakeren |
| `resource` | string | Nei | Ressurs-ID |

## API: Fjerne ressursdelegering

Fjerner en delegert ressurs fra en tilkobling.

- **Test**: `DELETE https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/resources`
- **Produksjon**: `DELETE https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/resources`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `party` | UUID | Ja | partyUuid for parten |
| `from` | UUID | Ja | partyUuid for avsenderen |
| `to` | UUID | Ja | partyUuid for mottakeren |
| `resource` | string | Nei | Ressurs-ID |

---

## API: Hente enkeltrettigheter for en ressurs

Henter enkeltrettigheter (les, skriv, signer osv.) som er delegert for en spesifikk ressurs mellom to parter.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/resources/rights`
- **Produksjon**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/resources/rights`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `party` | UUID | Ja | partyUuid for parten |
| `from` | UUID | Ja | partyUuid for avsenderen |
| `to` | UUID | Ja | partyUuid for mottakeren |
| `resource` | string | Nei | Ressurs-ID |

## API: Delegere enkeltrettigheter for en ressurs

Delegerer enkeltrettigheter for en ressurs til en part.

- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/resources/rights`
- **Produksjon**: `POST https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/resources/rights`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `party` | UUID | Ja | partyUuid for parten |
| `to` | UUID | Ja | partyUuid for mottakeren |
| `resource` | string | Nei | Ressurs-ID |

Eksempelforespørsel (body)

```json
{
  "directRightKeys": [
    "read",
    "write"
  ]
}
```

## API: Oppdatere enkeltrettigheter for en ressurs

Oppdaterer (erstatter) enkeltrettigheter for en ressurs.

- **Test**: `PUT https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/resources/rights`
- **Produksjon**: `PUT https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/resources/rights`

Spørreparameterne og forespørselskroppen er de samme som for delegering (POST).

## API: Kontrollere delegeringsmulighet for ressurs

Sjekker om den innloggede brukeren kan delegere rettigheter for en gitt ressurs.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/connections/resources/delegationcheck`
- **Produksjon**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/connections/resources/delegationcheck`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `party` | UUID | Ja | partyUuid for parten |
| `resource` | string | Nei | Ressurs-ID |

Eksempelrespons

```json
{
  "resource": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Skattemelding",
    "refId": "skd-skattemelding"
  },
  "rights": [
    {
      "right": {
        "key": "read",
        "name": "Les",
        "action": {
          "type": "urn:oasis:names:tc:xacml:1.0:action:action-id",
          "value": "read"
        }
      },
      "result": true,
      "reasonCodes": []
    }
  ]
}
```

---

## Sluttbrukerens egne klientforhold

Endepunktene nedenfor lar en innlogget person se og administrere sine egne klientforhold.
Det vil si klienter som er delegert til brukeren via en tjenestetilbyder.

### API: Hente mine klienter

Henter alle klienter som den innloggede brukeren har fått delegert tilgang til.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clients`
- **Produksjon**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clients`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `provider` | array (UUID) | Nei | Filtrer på spesifikke tjenestetilbydere |

Paginering styres med `X-Page-Size` og `X-Page-Number` i headere.

Eksempelrespons

```json
{
  "data": [
    {
      "provider": {
        "id": "3e1a0c01-dcaa-47f6-b76b-820d380bd639",
        "name": "LEGITIM RASK TIGER AS",
        "type": "Organisasjon",
        "variant": "AS",
        "parent": null,
        "children": null,
        "partyid": 51690650,
        "userId": null,
        "username": null,
        "organizationIdentifier": "313818713",
        "personIdentifier": null,
        "dateOfBirth": null,
        "dateOfDeath": null,
        "isDeleted": false,
        "deletedAt": null
      },
      "clients": [
        {
          "client": {
            "id": "ee08d709-db94-4e3e-9791-d1cfd5fe7310",
            "name": "ULASTELIG SOLID TIGER AS",
            "type": "Organisasjon",
            "variant": "AS",
            "parent": null,
            "children": null,
            "partyid": 51745556,
            "userId": null,
            "username": null,
            "organizationIdentifier": "313572773",
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
                  "id": "9d2ec6e9-5148-4f47-9ae4-4536f6c9c1cb",
                  "urn": "urn:altinn:accesspackage:fiske",
                  "areaId": "fc93d25e-80bc-469a-aa43-a6cee80eb3e2"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "provider": {
        "id": "b1e5dc9e-9151-46c9-948f-21c2cc1dc7bd",
        "name": "PASSIV MUSKULØS MINK ANS",
        "type": "Organisasjon",
        "variant": "ANS",
        "parent": null,
        "children": null,
        "partyid": 51707476,
        "userId": null,
        "username": null,
        "organizationIdentifier": "311818031",
        "personIdentifier": null,
        "dateOfBirth": null,
        "dateOfDeath": null,
        "isDeleted": false,
        "deletedAt": null
      },
      "clients": [
        {
          "client": {
            "id": "ee08d709-db94-4e3e-9791-d1cfd5fe7310",
            "name": "ULASTELIG SOLID TIGER AS",
            "type": "Organisasjon",
            "variant": "AS",
            "parent": null,
            "children": null,
            "partyid": 51745556,
            "userId": null,
            "username": null,
            "organizationIdentifier": "313572773",
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
                  "id": "9d2ec6e9-5148-4f47-9ae4-4536f6c9c1cb",
                  "urn": "urn:altinn:accesspackage:fiske",
                  "areaId": "fc93d25e-80bc-469a-aa43-a6cee80eb3e2"
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "links": {
    "next": null
  }
}
```

### API: Fjerne klientdelegering

Fjerner en delegert klienttilgang for den innloggede brukeren.

- **Test**: `DELETE https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clients`
- **Produksjon**: `DELETE https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clients`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `provider` | UUID | Ja | partyUuid for tjenestetilbyderen |
| `from` | UUID | Ja | partyUuid for klienten |

Eksempelforespørsel (body)

```json
{
  "values": [
    {
      "role": "rettighetshaver",
      "packages": [
        "urn:altinn:accesspackage:regnskapsforer-uten-signeringsrettighet"
      ]
    }
  ]
}
```

### API: Hente mine tjenestetilbydere

Henter alle tjenestetilbydere som har delegert klientrettigheter til den innloggede brukeren.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clientproviders`
- **Produksjon**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clientproviders`

Dette endepunktet har ingen spørreparametere.

### API: Fjerne tjenestetilbyder

Fjerner forholdet til en tjenestetilbyder. Dette fjerner samtidig alle klientdelegeringer fra denne tjenestetilbyderen.

- **Test**: `DELETE https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clientproviders`
- **Produksjon**: `DELETE https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/my/clientproviders`

#### Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `provider` | UUID | Ja | partyUuid for tjenestetilbyderen |

