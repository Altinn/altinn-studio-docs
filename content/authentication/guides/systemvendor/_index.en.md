---
title: System Vendor Guide
linktitle: System Vendor
description: A guide for the sysem vendor to set up their system with altinn and establishing the integration.
toc: false
weight: 2
---

#### Actions by System Vendor (SmartCloud AS)
   1. Contact Digdir
      - The System vendor must contact Digdir to get access to the system register, system user scopes. It is required that the vendor runs the test of system user in Digdir's test environment and must sign an agreement of using system user to integrate with production environment.
   2. Creating a Maskinporten Client for the System
      - SmartCloud AS wants to integrates the system user into their accounting software, SmartRegnskap.
      - To integrate, they must create a client in Maskinporten for system SmartCloud, which gets a client ID that will be used for authentication and authorization.
   3. Registering the System in Altinn’s System Register
      - SmartCloud AS then registers SmartCloud system in the Altinn System Register.
      - They define the required rights for accessing "Krav og betalinger" by associating the client ID with the relevant permissions.

  ```
    {
    "id": "991825827_smartregnskap",
    "systemVendorOrgNumber": "991825827",
    "vendor":
      {
        "authority" : "iso6523-actorid-upis",
        "ID" : "0192:991825827"
      },
    "name": 
      { 
          "nb":"Smartregnskap",
          "en":"Smart Accounting System",
          "nn":"Smartregnskap"
      },
    "description": 
      { 
          "nb":"RegnskapsSmartregnskap er et enkelt og smart regnskapsprogram for små bedrifter.",
          "en":"Smartregnskap is a simple and smart accounting software for small businesses.",
          "nn":"RegnskapsSmartregnskap er et enkelt og smart regnskapsprogram for små bedrifter."
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
  - Registering the System with required access packages in Altinn’s System Register. In tis example we register a system with required access for an accesspackage
      
      
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
  - Refer [here](../../../api/authentication/systemregister/model/) for the detailed description for information about each input. For all subsequent communications, the system vendor must reference the value specified in the 'id' field.

### Creating a System User For Standard System User
The system user can be created in two ways

  1. End user driven
      - Smartcloud As must request "TILFELDIG SUBTIL APE" (end user) to login to altinn portal and create a system user for their system SmartCloud
  2. Vendor driven
      - SmartCloud AS creates a system user request (via altinn api for system user request) from within SmartRegnskap, which is sent to Altinn.
      For detailed information on each input field, refer the documentation [here](../../../api/authentication/systemuserrequest/external/model/)

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

  - This request includes the necessary access rights to perform tasks related to the "Krav og betalinger" service on behalf of Rør og Vann AS (the company, end user).
  - The response is for example

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

  - The confirmurl is sent to the end user for approval. Follow the guide for end user for
    - [Standard system user](../enduser/standard/)
    

### Creating a System User For Agent System User
  - The system user for agent system user can be created only by system user request
  - SmartCloud AS creates a system user request (via altinn api for system user request) from within SmartRegnskap, which is sent to Altinn.
    For detailed information on each input field, refer the documentation [here](../../../api/authentication/systemuserrequest/external/model/)
              
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
            
  - This request includes the necessary access packages to perform tasks related to the services that the access package gives access to.
  - The response is for example
              
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

- The confirmurl is sent to the end user, here the auditing organisation for approval. Once approved, the end user can add clients to the system user. Follow the guide for end user for
    - [Agent system user](../enduser/clientdelegation/)


#### Getting Started For System Provider
Follow the [guide for system provider](systemauthentication-for-systemproviders/)