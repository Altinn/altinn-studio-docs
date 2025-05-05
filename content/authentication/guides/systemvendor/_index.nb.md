---
title: Systemleverandør veiledning
linktitle: Systemleverandør
description: En veiledning for systemleverandøren for å registrere sitt system med Altinn og etablere integrasjonen.
toc: false
weight: 2
---

#### Tiltak utført av systemleverandøren (SmartCloud AS)
   1. Kontakt Digdir
      - Systemleverandøren må ta kontakt med Digdir for å få tilgang til systemregisteret og systembruker-scopes. Det er et krav at leverandøren gjennomfører testing av systembruker i Digdirs testmiljø, og det må inngås en avtale om bruk av systembruker for integrasjon med produksjonsmiljøet.
   2. Opprette en Maskinporten-klient for systemet
      - SmartCloud AS ønsker å integrere systembrukeren i sitt regnskapsprogram, SmartCloud.
      - For å integrere må de opprette en klient i Maskinporten for SmartCloud, som får en klient-ID som brukes til autentisering og autorisering.
   3. Registrering av systemet i Altinn systemregister
      - SmartCloud AS registrerer deretter SmartCloud system i Altinn systemregister.
      - De definerer de nødvendige rettighetene for å få tilgang til 'Krav og betalinger' ved å knytte klient-ID-en til systemet.

      ```
      {
         "id": "991825827_smartcloud",
         "systemVendorOrgNumber": "991825827",
         "vendor":
         {
         "authority" : "iso6523-actorid-upis",
         "ID" : "0192:991825827"
         },
         "name": 
         { 
            "nb":"SmartCloud 1",
            "en":"SmartCloud 1",
            "nn":"Smart SKY"
         },
         "description": 
         { 
            "nb":"SmartCloud er verdens beste system.",
            "en":"SmartCloud Rocks.",
            "nn":"SmartSky er vestlandets beste system"
         },
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
         "xxxxxx-xxxx-xxxx-xxxx-xxxxxxx"
         ],
         "allowedredirecturls": [
         "https://smartcloudxxxx/receipt"
         ],
         "isVisible": true
      }
      ```
      - Registrering av systemet med nødvendige tilgangspakker i Altinns systemregister. I dette eksempelet registrerer vi et system med nødvendig tilgang til en tilgangspakke

      ```
      {
        "id": "991825827_smartcloud_ap",
        "systemVendorOrgNumber": "991825827",
        "vendor":
          {
            "authority" : "iso6523-actorid-upis",
            "ID" : "0192:991825827"
          },
        "name": 
          { 
              "nb":"Smartcloud TP",
              "en":"SmartCloud AP",
              "nn":"Smartcloud TP"
          },
        "description": 
          { 
              "nb":"SmartCloud er verdens beste system.",
              "en":"SmartCloud Rocks",
              "nn":"SmartSky er vestlandets beste system"
          },
          "accessPackages":
          [
              {
                  "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet"
              }
          ],
        "clientId": [
          "xxxxx-xxxx-xxx-xxx-xxx"
        ],
        "allowedredirecturls": [
          "https://smartcloudxxxx/receipt"
        ],
        "isVisible": true
      }
      ```

   Se [her](../../../api/authentication/systemregister/model/) for en detaljert beskrivelse av hver enkelt input. Ved all videre kommunikasjon må systemleverandøren referere til verdien som er angitt i feltet 'id'.

#### Opprettelse av systembruker for standard system bruker
Systembrukeren kan opprettes på to måter

   1. Sluttbrukerstyrt
      - SmartCloud AS må be TILFELDIG SUBTIL APES (sluttbruker) om å logge inn i Altinn-portalen og opprette en systembruker for deres system SmartCloud.
   2. Leverandørstyrt
      - SmartCloud AS oppretter en systembrukerforespørsel (via Altinn API for systembrukerforespørsler) fra SmartCloud, som sendes til Altinn.

      ```
      {
         "externalRef": "d5cc6e61-023e-4945-82cc-3f32d8ee28ee",
         "systemId": "991825827_smartcloud",
         "partyOrgNo": "310904473",
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
         "redirectUrl": "https://smartcloudxxxxxxx/receipt",
      }
      ```
      - Denne forespørselen inkluderer de nødvendige rettigheter for å utføre oppgaver knyttet til tjenesten 'Krav og betalinger' på vegne av TILFELDIG SUBTIL APE.
      - Responsen er for eksempel

         ```
         {
            "id": "505f8488-3d48-4c15-8e21-35cb9432f815",
            "externalRef": "smartcloud_demo_test",
            "systemId": "991825827_smartcloud",
            "partyOrgNo": "310904473",
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
            "status": "New",
            "redirectUrl": "https://smartcloudxxxxxxxxx/receipt",
            "confirmUrl": "https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/request?id=505f8488-3d48-4c15-8e21-35cb9432f815"
         }

         ```

      - Bekreftelseslenken (confirmurl) sendes til sluttbrukeren for godkjenning. Følg veiledningen for [sluttbruker for Standard systembruker](../enduser/standard/) for å håndtere forespørselen. 

### Opprettelse av en systembruker for agentsystembruker
  - Systembrukeren for en agentsystembruker kan kun opprettes ved en forespørsel fra en systembruker.
  - SmartCloud AS oppretter en systembrukerforespørsel (via Altinn API for systembrukerforespørsel) fra SmartCloud, som deretter sendes til Altinn.
For detaljert informasjon om hvert inputfelt, se dokumentasjonen [her](../../../api/authentication/systemuserrequest/external/model/)
              
      ```
      {
          "externalRef": "smartcloud_demo_agent_test",
          "systemId": "991825827_smartcloud_ap",
          "partyOrgNo": "314250052",
          "accessPackages":
          [
              {
                  "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet"
              }
          ],
          "redirectUrl": "https://smartcloudaltinn.azurewebsites.net/receipt"
      }

      ```
            
  - Denne forespørselen inkluderer nødvendige tilgangspakker for å utføre oppgaver knyttet til tjenestene som tilgangspakken gir tilgang til.
  - Responsen er noe ala :
              
      ```
      {
          "id": "605bb239-23b1-4d11-aae8-a40eb683aa1f",
          "externalRef": "smartcloud_demo_agent_test",
          "systemId": "991825827_smartcloud_ap",
          "partyOrgNo": "314250052",
          "accessPackages": [
              {
                  "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet"
              }
          ],
          "status": "New",
          "redirectUrl": "https://smartcloudxxxxx.azurewebsites.net/receipt",
          "confirmUrl": "https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/agentrequest?id=605bb239-23b1-4d11-aae8-a40eb683aa1f"
      }
      
      ```

- Bekreftelseslenken (confirmurl) sendes til sluttbrukeren, her revisjonsorganisasjonen, for godkjenning. Når den er godkjent, kan sluttbrukeren legge til klienter til systembrukeren. Følg veiledningen for sluttbruker for [Agent systembruker](../enduser/clientdelegation/)

#### Kom i gang for systemleverandør
Følg [veiledningen for systemleverandør](systemauthentication-for-systemproviders/)