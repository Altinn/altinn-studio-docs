---
title: Ta i bruk systembruker for systemleverandører
linktitle: Systembruker for SBS
description: Systembruker er et nytt konsept for API autentisering. Denne guiden beskriver hvordan man som systemleverandør kan benytte seg av dette.
toc: false
weight: 1
---


## Forutsetninger

På [Samarbeidsportalen](https://samarbeid.digdir.no/altinn/kom-i-gang-i-testmiljoet-tt02/2868) kan du lese mer om skrittene som må gjennomføres får du kan starte med integrasjon og test mot vårt testmiljø (TT02)

Pass på at du får tildelt scopene:
- `altinn:authentication/systemregister.write` - for registrering av system i systemregisteret
- `altinn:authentication/systemuser.request.write` - for leverandørstyrt flyt - opprette forespørsler
- `altinn:authentication/systemuser.request.read` - leverandørstyrt flyt - forespørre staus

I tillegg trengs tilgang til scopes for API-ene som skal benyttes av systemet. Dette vil være informasjon som tjenesteeier sitter på.





## Implementasjon

### 1. Tjenesteier lager tjenste/app
Ressurseier lager ressurs med behov for tilgangsstyring. Dette kan være en app i Altinn Studio eller API ressurseiers egen plattform.  
Tjenesten kan kreve egne scopes som ressurseier selv styrer tilgang til.

### 2. Lage Maskinporten-klient
Sluttbrukersystemleverandør tar i bruk [Maskonporten som konsument](https://samarbeid.digdir.no/maskinporten/konsument/119).

### 3. Avtale om systembruker
Sluttbrukersystemleverandør kontakter Digdir for å få tilgang til systembruker scopes.  
I perioden frem til nye bruksvilkår er på plass må det også underskrives pilotavtale før systembruker kan brukes i produksjon.

### 4. Registrere sluttbrukersystem

Før man kan opprette systembruker må man opprette systemet i systemregisteret. Ett system kan ha forskjellige moduler som har forkjellige konfigurasjoner i forhold til rettigheter det trenger. Man angir her det maksimale mengedn rettigheter modulen trenger og kan siden beskranke dette ved opprettelse av systemkbruker via leverandørstyrt forespørsel. Her angis også om det skal være mulig å opprette systembruker fra altinn.no [sluttbrukerstyrt opprettelse](../../what-do-you-get/systemuser#sluttbrukerstyr-opprettelse) eller om dette skal kontrolleres av leveranør via [Leverandørstyrt opprettelse](../../what-do-you-get/systemuser#leverandørstyrt-opprettelse).

```json
POST https://platform.tt02.altinn.no/authentication/api/v1/systemregister/vendor/
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "id": "123456789_systemid", 
  "vendor": {
    "ID": "0192:123456789"
  },
  "name": {
    "en": "System name",
    "nb": "Systemnavn",
    "nn": "Systemnamn"
  },
  "description": {
    "en": "System description",
    "nb": "Systembeskrivelse",
    "nn": "Systembeskriving"
  },
  "rights": [
    {
      "resource": [
        {
          "value": "tjenestenavn",
          "id": "urn:altinn:resource"
        }
      ]
    }
  ],
  "accessPackages": [],
  "isVisible": false,
  "allowedRedirectUrls": [ "https://smartcloudaltinn.azurewebsites.net/receipt" ], 
  "clientId": [ "a2ed712d-4144-4471-839f-80ae4a68146b" ]
}

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

"772e52bc-63c3-45c0-80b7-f3bb1581469f"
```

> For produksjon endres domenet til **platform.altinn.no**

Se [OpenAPI spec](/nb/api/authentication/spec/#/SystemRegister) for full dokumentasjon av API, paramenter og eksempler</br></br>


**Id:** Unik id som benyttes for å identifisere sluttbrukersystemet. Gyldige tegn er a-z 0-9 og _. Må være i form [orgnr]_[navn].  
**Vendor:** Orgnr til levereansør 0192 er referanse til Enhetsregisteret i [Electronic Adress Scheme](https://docs.peppol.eu/poacc/billing/3.0/codelist/eas/)</br>
**Name:** Navn på sluttbrukersystemet opprettelse. Angis på bokmål(nb), nynorsk(nn), engelsk(en))</br>
**Beskrivelse:** Beskrivelse vises i altinn.no ved sluttbrukerstyrt opprettelse (bokmål, nynorsk, engelsk)</br>
**Rights**: Nødvendige enkelttjenester for systembruker ift tjenestene den skal brukes mot. Referanser til applikasjoner i Altinn plattformen eller tjenester utenfor Altinn som er registrert hos Altinn.</br>
**AccessPackages:** Nødvendige tilgangspakker for systembruker (Q2 2025).
**AllowedRedirectUrls** Hviteklisting av gyldige url det kan rediretes til ved leverandørstyrt opprettelse (angis i RedirectUrl)</br>
**ClientID:** Klientidene for integrasjonen som er opprettet i Maskinporten. 
**IsVisible:** Angir om systemet skal vises systemregisteret for [Sluttbrukerstyrt opprettelse]().


### 5. Opprette systembruker 

Systembruker kan opprettes på to forskjellige måter via Sluttbrukersytrt opprettelse eller Leverandørstyrt opprettelse.
Ekspemplet under viser Leverandørstyrt opprettelse, hvor man sluttbrukersystemleverandør forespør sluttbruker om å opprette systembruker.

```json
POST https://platform.tt02.altinn.no/authentication/api/v1/systemuser/request/vendor/
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "externalRef": "123456789_externalRef",
  "systemId": "123456789_systemid",
  "partyOrgNo": "123456789",
  "rights": [
    {
      "resource": [
        {
          "value": "tjenestenavn",
          "id": "urn:altinn:resource"
        }
      ]
    }
  ],
  "redirectUrl": "https://smartcloudaltinn.azurewebsites.net/receipt"
}


HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "id": "d111dbab-d619-4f15-bf29-58fe570a9ae6",
  "externalRef": "123456789_externalRef",
  "systemId": "123456789_systemid",
  "partyOrgNo": "123456789",
  "rights": [
    {
      "resource": [
        {
          "value": "tjenestenavn",
          "id": "urn:altinn:resource"
        }
      ]
    }
  ],
  "status": "New",
  "redirectUrl": "https://smartcloudaltinn.azurewebsites.net/receipt",
  "confirmUrl": "https://authn.ui.tt02.altinn.no/authfront/ui/auth/vendorrequest?id=d111dbab-d619-4f15-bf29-58fe570a9ae6"
}
```

> For produksjon endres domenet til **platform.altinn.no**

Se [OpenAPI spec](/nb/api/authentication/spec/#/RequestSystemUser) for full dokumentasjon av API, paramenter og eksempler</br></br>


**externalRef:** Brukes ved opprettelse av flere systembrukere på samme system. Dersom denne oppgis må den brukes i alle forespørsler den kan settes.  Hvis externalRef ikke er satt eksplisitt, blir den automatisk satt til organisasjonsnummer (orgnr.). Det er ikke nødvendig å spesifisere denne verdien i API-kallene, da den har en standardverdi.  
**systemId:** Referanse til system  
**partyOrgNo:** organisasjonsnummer til kunde.  
**rights:** Liste over rettigheter systembrukeren trenger tilgang til.  
**redirectUrl:** Url kunde sendes tilbake til etter godkjenning av systembrukeropprettelse</br></br>


**confirmUrl:** URL sluttbrukersystem-leverandør videresender kunde til for godkjenning av systembrukeropprettelse. Etter godkjenning sendes kunde tilbake til **redirectUrl**.  







### 6. Test og Produksjonssetting 


**Request**

Funksjonaliteten er basert på Oauth2-utvidelesen for fin-granulert autorisasjon (Rich Authorization Requests, RAR), der vi har definert en ny type urn:altinn:systemuser for systembruker-mønsteret.

Leverandøren ber om å få et token for en påstått kunde ved å oppgi kundens organisasjonsnummer, og dersom en systembruker-delegering foreligger i Altinn, vil det returneres et Maskinporten-token med systembruker-identifikator som API-tilbyder i sin tur kan benytte til å konstruere spørringer mot Altinn Autorisasjon PDP for å finne detaljert ut hva leverandørens system er autorisert til å utføre.

{{<mermaid>}}
sequenceDiagram
    Sluttbrukersystem->>+Maskinporten: Forespørre token(client_id, systemUserOrgNo)
    Maskinporten->>Altinn Autorisasjon: GetSystemUser(client_id, systemUserOrgNo)
    Altinn Autorisasjon-->>Maskinporten: Systembrukerinformasjon
    Maskinporten-->>Sluttbrukersystem: Systembruker-token 
    Sluttbrukersystem->>API: API-kall m/systembrukertoken
    API->>Altinn Autorisasjon: Authorize(systemUserId, res, action, part)
    Altinn Autorisasjon-->>API: AuthorizationResponse
    API-->>Sluttbrukersystem: API Resultat 
{{< /mermaid >}}


Et fagsystem ber om å få systembruker-token på vegne av en part ved å inkludere en RAR-forespørsel av type urn:altinn:systemuser med partens organisasjonsidentifikator, i [JWT-grantet](https://docs.digdir.no/docs/Maskinporten/maskinporten_protocol_jwtgrant)


```json
POST https://test.maskinporten.no/token

{
  "aud" : "https://maskinporten.no",
  "sub" : "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "authorization_details" : [ {
    "systemuser_org" : {
      "authority" : "iso6523-actorid-upis",
      "ID" : "0192:123456789"
    },
    "type" : "urn:altinn:systemuser"
  } ],
  "scope" : "krr:global/kontaktinformasjon.read",
  "iss" : "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "exp" : 1718124835,
  "iat" : 1718124715,
  "jti" : "89365ecd-772b-4462-a4de-ac36af8ef3e2"
}


HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "access_token" : "IxC0B76vlWl3fiQhAwZUmD0hr_PPwC9hSIXRdoUslPU=",
  "token_type" : "Bearer",
  "expires_in" : 599,
  "scope" : "difitest:test1"
}
```

> Man kan kun spørre på en part om gangen.

> Grantet må også alltid forespørre et eller flere Oauth2 scopes.      

**Response - JWT Token**  

Tokenet vil innehold en liste med systembrukere som tilhører kundens organisasjonnummer, og er knyttet mot leverandørens fagsystem gjennom det autentiserte fagsystemet (client_id):
```json
{
  "authorization_details" : [ {
    "type" : "urn:altinn:systemuser",
    "systemuser_org" : {
      "authority" : "iso6523-actorid-upis",
      "id" : "0192:123456789"
    },
    "systemuser_id" : [ "ebe4a681-0a8c-429e-a36f-8f9ca942b59f" ],
    "system_id" : "123456789_systemid"
  } ],
  "scope" : "krr:global/kontaktinformasjon.read",
  "iss" : "https://test.maskinporten.no/",
  "client_amr" : "private_key_jwt",
  "token_type" : "Bearer",
  "exp" : 1718175135,
  "iat" : 1718175015,
  "client_id" : "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "jti" : "-SpfU--1Zn_Oqvkpjwu3oVn--VLcPzSAwjqyiP6zBEw",
  "consumer" : {
    "authority" : "iso6523-actorid-upis",
    "ID" : "0192:987654321"
  }
}
```
> Tokenet man får fra maskinporten legges ved som et bearer token mot de API man skal kalle. 


## Demoklient
For en demo av hvordan leverandørstyrt opprettelsee kan se ut, så vår demolklient [SmartCloud](http://smartcloudaltinn.azurewebsites.net).

Se kode med dokumentasjon [her](https://github.com/TheTechArch/altinn-systemuser).


For opprettelse av systembrukere kan testbrukere/organisasjoner fra Tenor benyttes.

