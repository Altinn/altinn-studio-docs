---
title: System Registration
description: This guide describes how you, as an end-user system vendor, register a system in the system registry.
linktitle: System Registration
weight: 1
---

**Target Audience:** Developers or technical integration managers at end-user system vendors (SBS).

## Prerequisites

Before you can register a system, the following must be in place:

* Access to the system registry and system user scopes has been obtained from Digdir. The procedure for this is described on the [Cooperation Portal (Samarbeidsportalen)](https://samarbeid.digdir.no/altinn/kom-i-gang/2868).
* For testing, it is recommended that the SBS organization number is added to the TT02 test environment.
* To get a real organization number created in TT02, the SBS must contact servicedesk@altinn.no.
* An overview of which access packages (`accessPackages`) or resources (`rights`) the service API requires. This information must be obtained from the service owner.
* One or more valid `clientId` (UUID) generated for the integration in Maskinporten.
* A valid Maskinporten token or Altinn token to authenticate the API call to the system registry.

-----

## Instructions

Registration of an end-user system is done by calling Altinn's system registry API with a JSON payload that defines the system.

### Step-by-step

1.  **Structure the JSON payload**
    Prepare a JSON payload to be sent to the API. Below is a detailed description of the fields.

2.  **Define Identifiers**

      * `id`: A unique identifier for the system.
        * **Format:** `{systemVendorOrgNo}_{chosenName}`.
        * **Example:** `991825827_smartcloud`.
      * `vendor`: Contains the organization number of the system vendor.
        * **Format:** `ID` must be set to `0192:{orgnr}` to specify reference to the Brønnøysund Register Centre.
        * **Example:** `"ID": "0192:991825827"`.
      * **Important:** The organization number used in `id` and `vendor.ID` must match the organization number in the authentication token (Maskinporten or Altinn).

3.  **Define Visible Texts**

      * Specify the name and description to be displayed for the system in the Altinn portal.
      * Texts must be provided for all supported languages: `nb` (Bokmål), `nn` (Nynorsk), and `en` (English).

4.  **Define Rights (`rights` and `accessPackages`)**

      * Specify which services or access packages the system requires access to.
      * Use `rights` to specify individual resources (e.g., `urn:altinn:resource`).
      * Use `accessPackages` to specify predefined access packages (e.g., `urn:altinn:accesspackage:skattegrunnlag`).
      * **Note:** These rights **must** be defined correctly *before* a system user can be created for this system.

5.  **Link Client ID (`clientId`)**

      * Provide a list of `clientId` values (as UUIDs) that are generated in Maskinporten for this integration.
      * A system can be linked to multiple client IDs.
      * This is the same client ID that will later be used when creating a system user towards Maskinporten.

6.  **Set Visibility (`isVisible`)**

      * `true`: The system is visible in the Altinn portal and can be used to create a system user from there.
      * `false`: The system is not visible in the portal. In this case, the system user must be created through a vendor-controlled process.

7.  **Specify Redirect URLs (`allowedredirecturls`)**

      * Define a list of exact URLs that are approved for redirection in the system user creation flow. A system user request must use a URL from this list (or a subset).

8.  **Example JSON Payload**
    Use the following structure as a template for your JSON payload:

    ```json
    {
      "id": "991825827_smartcloud",
      "vendor": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:991825827"
      },
      "name": {
        "nb": "SmartCloud 1",
        "en": "SmartCloud 1",
        "nn": "Smart SKY"
      },
      "description": {
        "nb": "SmartCloud er verdens beste system.",
        "en": "SmartCloud Rocks.",
        "nn": "SmartSky er vestlandets beste system"
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
      "accessPackages": [
        {
          "urn": "urn:altinn:accesspackage:skattegrunnlag"
        }
      ],
      "clientId": ["32ef65ac-6e62-498d-880f-76c85c2052ae"],
      "allowedredirecturls": ["https://smartcloudxxxx/receipt"],
      "isVisible": true
    }
    ```

9.  **Send the API call**

      * Execute a POST or PUT request (for creation or modification) to Altinn's system registry API with the JSON payload.
      * Remember to include your Maskinporten or Altinn token in the Authorization header for authentication.

-----

## Verification and Notes

  * **Verification:** After successful registration, the system will be available for creating system users. If `isVisible` is set to `true`, the system will also be visible in the Altinn portal.
  * **Modification:** Systems that are registered can be modified and deleted afterwards via the API.