---
title: 'Oppslag ved referanse'
description: 'Hvordan løse opp en dialog fra en instance-id eller correspondence-id'
weight: 25
toc: true
---

## Introduksjon

Referanseoppslag lar deg oversette mellom en dialog-ID og identifikatoren til entiteten dialogen representerer, uten først å søke i hele dialoglisten.

Noen dialoger representerer en underliggende Altinn app-instans eller en enkelt Altinn Melding. For disse dialogene lar oppslag deg gå begge veier:

- fra en app-instans- eller meldingsreferanse til dialog-ID-en
- fra en dialog-ID til den kanoniske underliggende referansen

Andre dialoger representerer ikke en underliggende app-instans eller melding. For disse dialogene er dialog-ID-en selv den kanoniske identifikatoren.

Dette er nyttig når systemet ditt allerede kjenner en av disse identifikatorene:

- en Altinn app-instansreferanse
- en Altinn Melding-referanse
- en Dialogporten dialog-ID

Oppslags-API-ene returnerer lettvektsmetadata om dialogen og, for sluttbrukere, informasjon om hvorfor den nåværende brukeren har tilgang til den.

## Støttede identifikatorer

Den nåværende implementasjonen aksepterer disse `instanceRef`-formatene:

- `urn:altinn:instance-id:{partyId}/{uuid}`
- `urn:altinn:correspondence-id:{uuid}`
- `urn:altinn:dialog-id:{uuid}`

## Bruksområder

### Instansdelegering

I denne sammenhengen betyr "instansdelegering" delegering til én spesifikk app-instans, melding eller dialog. Autorisasjonssystemet bruker den kanoniske identifikatoren for den entiteten. For dialoger som representerer en app-instans eller en melding betyr det den underliggende app-instansreferansen eller meldingsreferansen. For dialoger uten en underliggende entitet er dialog-ID-en selv den kanoniske identifikatoren.

Dialogporten har ansvaret for å holde rede på denne koblingen. Hvis systemet ditt bare kjenner den ene siden av relasjonen, gir dialogoppslag deg identifikatoren du trenger for den andre siden.

### Hvorfor har jeg tilgang

Sluttbruker-API-et for oppslag inkluderer `authorizationEvidence` slik at et sluttbrukersystem kan forklare hvorfor den nåværende brukeren har lov til å se dialogen. Dette er nyttig i brukergrensesnitt som skal svare på spørsmål som "hvorfor har jeg tilgang til denne dialogen?".

Evidensen identifiserer tilgangsveien Dialogporten brukte for oppslaget. De boolske feltene viser om tilgangen kom gjennom en rolle, en tilgangspakke, ressursdelegering eller instansdelegering (kan være flere). Listen `evidence` inneholder den konkrete grant-typen og subject bak disse flaggene. For tilgang via rolle eller tilgangspakke er subject identifikatoren til rollen eller tilgangspakken. For ressursdelegering er subject tjenesteressursen. For instansdelegering er subject den kanoniske instansreferansen som returneres av oppslaget.

Svaret inkluderer også `currentAuthenticationLevel`. Sammen med `serviceResource.minimumAuthenticationLevel` kan dette hjelpe et sluttbrukersystem med å forklare om det nåværende autentiseringsnivået er tilstrekkelig for den vanlige tittelen som returneres av oppslaget.

## Slå opp en dialog som sluttbruker med REST

1. [Autentiser som sluttbruker](../authenticating/#bruk-for-sluttbrukersystemer)
2. Send en GET-forespørsel til `/api/v1/enduser/dialoglookup`, og oppgi `instanceRef` som query-parameter
3. Inspiser metadataene som returneres, og gå eventuelt videre til [veiledningen for dialogdetaljer](../getting-dialog-details/)

Eksempel:

```http
GET /api/v1/enduser/dialoglookup?instanceRef=urn:altinn:instance-id:1337/11111111-2222-3333-4444-555555555555
Accept-Language: en
Authorization: Bearer <token>
```

Svaret for sluttbruker inneholder:

- `dialogId`
- `instanceRef`
- `party`
- `title`
- `serviceResource`
- `serviceOwner`
- `authorizationEvidence`

`authorizationEvidence` forklarer hvorfor den nåværende sluttbrukeren kan få tilgang til dialogen. Det rapporterer gjeldende autentiseringsnivå og om tilgangen kommer via:

- en rolle
- en tilgangspakke
- ressursdelegering
- instansdelegering

## Slå opp en dialog som sluttbruker med GraphQL

GraphQL-API-et for sluttbruker eksponerer den samme funksjonaliteten gjennom `dialogLookup`.

Eksempel:

```graphql
query DialogLookup($instanceRef: String!) {
  dialogLookup(instanceRef: $instanceRef) {
    lookup {
      dialogId
      instanceRef
      party
      title {
        languageCode
        value
      }
      serviceResource {
        id
        isDelegable
        minimumAuthenticationLevel
        name {
          languageCode
          value
        }
      }
      serviceOwner {
        code
        orgNumber
        name {
          languageCode
          value
        }
      }
      authorizationEvidence {
        currentAuthenticationLevel
        viaRole
        viaAccessPackage
        viaResourceDelegation
        viaInstanceDelegation
        evidence {
          grantType
          subject
        }
      }
    }
    errors {
      __typename
      message
    }
  }
}
```

GraphQL returnerer oppslagsfeil i payloaden i stedet for gjennom HTTP-statuskoder. De nåværende typede feilene er:

- `DialogLookupNotFound`
- `DialogLookupForbidden`
- `DialogLookupValidationError`

## Slå opp en dialog som tjenesteeier med REST

1. [Autentiser som tjenesteeier](../authenticating/#bruk-for-tjenesteeiersystemer)
2. Send en GET-forespørsel til `/api/v1/serviceowner/dialoglookup`, og oppgi `instanceRef` som query-parameter
3. Bruk metadataene som returneres til å fortsette med operasjoner som tjenesteeier

Eksempel:

```http
GET /api/v1/serviceowner/dialoglookup?instanceRef=urn:altinn:dialog-id:11111111-2222-3333-4444-555555555555
Accept-Language: en
Authorization: Bearer <token>
```

Svaret for tjenesteeier inneholder de samme grunnleggende oppslagsfeltene som svaret for sluttbruker, men skiller seg på to viktige måter:

- det inkluderer ikke `authorizationEvidence`
- det kan inkludere `nonSensitiveTitle` i tillegg til `title`

Den nåværende implementasjonen inkluderer også slettede dialoger i oppslagsresultater for tjenesteeier.

### Kanonisk referanse

{{% notice info %}}
Den returnerte `instanceRef` er den kanoniske identifikatoren, noe som betyr at hvis du slår opp en dialog med `urn:altinn:dialog-id:{uuid}`, kan svaret returnere en annen `instanceRef`.
{{% /notice %}}

Den returnerte verdien er den kanoniske identifikatoren Dialogporten knytter til den dialogen:

- app-instansreferanse for dialoger som representerer en Altinn app-instans
- meldingsreferanse for dialoger som representerer en enkelt Altinn Melding
- selve dialogreferansen for dialoger uten en underliggende app-instans eller melding

Den nåværende implementasjonen foretrekker:

1. en app-instansreferanse
2. en meldingsreferanse
3. selve dialogreferansen

### Lokaliserte felt følger `Accept-Language`

Hvis du sender `Accept-Language`, beskjærer Dialogporten lokaliserte felt i svaret til de foretrukne språkene. Dette gjelder:

- `title`
- `serviceResource.name`
- `serviceOwner.name`
- `nonSensitiveTitle` i tjenesteeierendepunktet

### Valg av tittel for sluttbruker avhenger av autentiseringsnivå

For oppslag som sluttbruker kan `title` påvirkes av minimum autentiseringsnivå for tjenesteressursen:

- hvis brukerens nåværende autentiseringsnivå er høyt nok, returneres den vanlige tittelen
- hvis brukerens nivå er for lavt og dialogen har `nonSensitiveTitle`, returneres den ikke-sensitive tittelen i stedet
- hvis `nonSensitiveTitle` ikke er satt, returneres den vanlige tittelen

**Les mer**

- {{<link "../../reference/dialog-lookup">}}
- {{<link "../../reference/graphql">}}
