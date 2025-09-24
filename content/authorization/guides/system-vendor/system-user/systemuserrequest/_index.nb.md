---
title: Forespørsel om systembruker
description: Forespørsel om systembruker
linktitle: Forespørsel om systembruker
hidden: true
---



### Opprettelse av systembruker for en standard system bruker

Systembrukeren kan opprettes på to måter
{.floating-bullet-numbers-sibling-ol}

1. Sluttbrukerstyrt
   - SmartCloud AS må be TILFELDIG SUBTIL APES (sluttbruker) om å logge inn i Altinn-portalen og opprette en systembruker for deres system SmartCloud.
2. Leverandørstyrt
   - SmartCloud AS oppretter en systembrukerforespørsel (via Altinn API for systembrukerforespørsler) fra SmartCloud, som sendes til Altinn.
     ```json
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
       "redirectUrl": "https://smartcloudxxxxxxx/receipt"
     }
     ```
   - Denne forespørselen inkluderer de nødvendige rettigheter for å utføre oppgaver knyttet til tjenesten 'Krav og betalinger' på vegne av TILFELDIG SUBTIL APE.
   - Responsen er for eksempel
     ```json
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
   - Bekreftelseslenken (`confirmurl`) sendes til sluttbrukeren for godkjenning. Følg veiledningen for [sluttbruker for Standard systembruker](../../end-user/system-user/#veiledning-for-sluttbruker-stadig-konsert-dagligleder-til-tilfeldig-subtil-ape) for å håndtere forespørselen.

### Opprettelse av en systembruker for agentsystembruker

- Systembrukeren for en agentsystembruker kan kun opprettes ved en forespørsel fra en systembruker.
- SmartCloud AS oppretter en systembrukerforespørsel (via Altinn API for systembrukerforespørsel) fra SmartCloud, som deretter sendes til Altinn. For detaljert informasjon om hvert inputfelt, se dokumentasjonen [her](../../../../api/authentication/systemuserapi/systemuserrequest/external/model/)
  ```json
  {
    "externalRef": "smartcloud_demo_agent_test",
    "systemId": "991825827_smartcloud_ap",
    "partyOrgNo": "314250052",
    "accessPackages": [
      {
        "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet"
      }
    ],
    "redirectUrl": "https://smartcloudaltinn.azurewebsites.net/receipt"
  }
  ```
- Denne forespørselen inkluderer nødvendige tilgangspakker for å utføre oppgaver knyttet til tjenestene som tilgangspakken gir tilgang til.
- Responsen er noe ala:
  ```json
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
- Bekreftelseslenken (`confirmurl`) sendes til sluttbrukeren, her revisjonsorganisasjonen, for godkjenning. Når den er godkjent, kan sluttbrukeren legge til klienter til systembrukeren. Følg veiledningen for sluttbruker for [Agent systembruker](../../end-user/system-user/#veiledning-for-sluttbruker-dress-minst-klientadministratør-i-tilbakeholden-usymmetrisk-tiger-as-)

Se [Samarbeisportalen](https://samarbeid.digdir.no/altinn/systembruker/2542) for illustrert og webinar.
{.mt-3}

se [api dokumentasjon](../../../../api/authentication/systemuserapi/) for mer informasjon om endepunkter.