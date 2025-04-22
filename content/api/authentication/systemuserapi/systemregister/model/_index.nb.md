---
title: Modell for system register information
linktitle: Modell
description: Modell for eksterne til å lese/skrive systemregisterinformasjon.
toc: false
weight: 1
---
## Model

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