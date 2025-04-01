---
title: Opprett et nytt system i systemregister
description: API for the vendor to create a system in the system register
toc: true
---
## Opprett et nytt system

### Endepunkt

### Scopes
Machineporten-token med scope <mark style="background-color:lightgrey">altinn:authentication/systemregister.write</mark>

### Content typer
application/json

## Argumenter


### Obligatorisk Argumenter

#### Id
ID-en bør være i formatet {systemleverandørorgnr}_{navn valgt av leverandøren}. For eksempel "310547891_testprodukt". Dette er en unik ID for å identifisere produktet.

#### Vendor
Organisasjonsnummeret til systemleverandøren. Det må starte med en referansekode for enhetsregisteret.

for eksempel
```    
"vendor": {
  "ID": "0192:991825827"
}
```
<<0192>> er referansen som angir at det er en verdi for Enhetsregisteret i henhold til [Elektronisk adresseordning](https://docs.peppol.eu/poacc/billing/3.0/codelist/eas/), og 991825827 er organisasjonsnummeret til Direktoratet for digitalisering.

#### Name
Navn på systemet. Dette støtter språkene engelsk (en), norsk bokmål (nb) og nynorsk (nn). Dette brukes ved visning av systemet i brukergrensesnittet for manuell oppretting av systembruker, samt ved godkjenning av en systembrukerforespørsel.

```    
  "name": {
    "nb": "The Matrix",
    "en": "The Matrix",
    "nn": "The Matrix"
  },
```

#### Description
En kort tekst som beskriver systemet. Denne brukes til å presentere systemet for sluttbrukeren i Altinn-portalen. Engelsk (en), norsk bokmål (nb) og nynorsk (nn) støttes.
```    
  "description": {
    "nb": "Test system",
    "en": "Test system",
    "nn": "Test system"
  },
```

## Valgfrie argumenter
#### Rights
Dette definerer tjenestene som leverandørens system krever tilgang til fra systembrukeren. Dette kan være enten en Altinn 3-app, en tjeneste utenfor Altinn, men som er registrert som en ressurs i Altinn. Eksempelet nedenfor definerer en app "app_ttd_endring-av-navn-v2" i Altinn og en tjeneste "ske-krav-og-betalinger" utenfor Altinn som er registrert som en ressurs i Altinn. Dette er et valgfrie argument for å opprette et system, men det må settes før systembrukeren kan opprettes.
```
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "app_ttd_endring-av-navn-v2"
        }
      ]
    },
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "ske-krav-og-betalinger"
        }
      ]
    }
  ],
```
#### AccessPackages
Dette definerer tilgangspakkene som leverandørens system krever tilgang til fra systembrukeren. Per i dag er dette kun definert for klientdelegasjons-tilfellet. Eksempelet nedenfor definerer tilgangspakken "skattnaering". Tilgangspakken bør være en av rollene "REGN/REVI/FFOR". Dette er et valgfrie argument for å opprette et system, men det må settes før systembrukeren kan opprettes.
```
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:skattnaering"
    }
  ]
```

#### ClientId
Et system kan være knyttet til flere klient-ID-er. Disse klient-ID-ene genereres for integrasjoner i Maskinporten, og hver av dem er unik, knyttet spesifikt til et system. Som et resultat kan en klient-ID ikke gjenbrukes for et annet system. Hvis systemet som er knyttet til en klient-ID blir slettet, kan klient-ID-en tildeles et nytt eller eksisterende system.

```
  "clientId": [
    "32ef65ac-6e62-498d-880f-76c85c2052ae"
  ],
```

#### IsVisible
Leverandøren kan bestemme om systemet skal være synlig i Altinn-portalen for sluttbrukere å opprette manuelt..
 - True: Systemet er synlig i den brukerstyrte systembruker opprettingsprosessen i Altinn-portalen..
 - False: Systemet er ikke synlig i Altinn-portalen og kan kun opprettes av leverandøren gjennom den leverandørstyrte systembruker opprettelse.

#### AllowedRedirectUrls
Denne funksjonen brukes for å hvitliste URL-ene som er tillatt å sette i redirecturl for en leverandørstyrt systembrukerforespørsel.
 ```
   "allowedredirecturls": [
    "https://vg.no",
    "https://nrk.no",
    "https://altinn.no"
  ],
 ```

## Error Codes

| Feil Kode     | Status Kode | Feil Melding      | Detaljert beskrivelse   |
|----------------|-------------|--------------------|------------------------|
| AUTH.VLD-00000 | 400 | the org number identifier is not valid ISO6523 identifier | The organization identifier must be 0192, f.ex 0192:991825827 |
| AUTH.VLD-00001 | 400 | The system id does not match the format orgnumber_xxxx...  | The systemid is expected to be in the format vendororgnumber_xxxxxx |
| AUTH.VLD-00002 | 400 | The system id already exists | The system id is already taken |
| AUTH.VLD-00003 | 400 | One or all the resources in rights is not found in altinn's resource register | Any service outside altinn must be registered as a resource in altinn's resource register. Either the service provider has failed to register the resource or is specified wrong in the system register request. 
| AUTH.VLD-00004 | 400 | One of the client id is already tagged with an existing system | The ClientId can be tied to only one organisation. The vendor must use a different client id for the new system.
| AUTH.VLD-00005 | 400 | One or more of the redirect urls format is not valid. The valid format is https://xxx.xx | |
| AUTH.VLD-00006 | 400 | One or more duplicate rights found | Cehck your rights section and eliminate any duplicate app/resource |
| AUTH.VLD-00007 | 400 | One or more duplicate access package(s) found | The system id is already taken |
| AUTH.VLD-00008 | 400 | One or all the accesspackage(s) is not found in altinn's access packages or is not a part of REGN/REVI/Forretningsfører roller | The system id is already taken |

## Eksempler

### System med app og ressurs
```
{
  "id": "991825827_systemwithappandresource",
  "vendor": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:991825827"
  },
  "name": {
    "nb": "System med app og ressurs",
    "en": "System With App and Resource",
    "nn": "System med app og ressurs"
  },
  "description": {
    "nb": "Test system with app and resource",
    "en": "Test system with app and resource",
    "nn": "Test system with app and resource"
  },
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "app_ttd_endring-av-navn-v2"
        }
      ]
    },
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "ske-krav-og-betalinger"
        }
      ]
    }
  ],
  "clientId": [
    "087fc0e3-674f-4eaa-aea2-75e3369463e5"
  ],
  "allowedredirecturls": [
    "https://vg.no",
    "https://nrk.no",
    "https://altinn.no"
  ],
  "isVisible": true
}
```

### System med tilgangspakke
```
{
  "id": "991825827_systemwithaccesspackageandresource",
  "vendor": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:991825827"
  },
  "name": {
    "nb": "The Matrix",
    "en": "The Matrix",
    "nn": "The Matrix"
  },
  "description": {
    "nb": "Test system",
    "en": "Test system",
    "nn": "Test system"
  },
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:skattnaering"
    }
  ],
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "ske-krav-og-betalinger"
        }
      ]
    }
  ],
  "clientId": [
    "32ef65ac-6e62-498d-880f-76c85c2052ae"
  ],
  "allowedredirecturls": [
    "https://vg.no",
    "https://nrk.no",
    "https://altinn.no"
  ],
  "isVisible": true
}
```