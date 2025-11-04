---
title: System Registration
description: This guide describes how you, as an end-user system vendor, register a system in the system registry.
linktitle: System Registration
weight: 1
---
-----
**Target Audience:** Developers or technical integration managers at end-user system suppliers (SBS).

## Prerequisites

You must have some prerequisites in place before you register a system, see the [Getting Started guide](https://docs.altinn.studio/nb/authorization/getting-started/systemuser/).

-----

## Instructions

Registration of an end-user system is done by calling Altinn's system registry API with a JSON payload that defines the system.

  * **Note:** The token used must have been assigned the scope: `altinn:authentication/systemregister.write`.

### Step-by-step

1.  **Structure the JSON payload**
    Prepare a JSON payload to be sent to the API. Below is a detailed description of the fields.

2.  **Define Identifiers**

      * `id`: A unique identifier for the system.
          * **Format:** `{systemsupplier_orgnr}_{chosen_name}`.
          * **Example:** `991825827_smartcloud`.
      * `vendor`: Contains the organization number of the system supplier.
          * **Format:** `ID` must be set to `0192:{orgnr}` to specify a reference to the Brønnøysund Register Centre (Enhetsregisteret).
          * **Example:** `"ID": "0192:991825827"`.
      * **Important:** The organization number used in `id` and `vendor.ID` must match the organization number in the authentication token (Maskinporten or Altinn). To get a real organization number created in TT02, the SBS must contact <servicedesk@altinn.no>.

3.  **Define Visible Texts**

      * Specify the name and description to be displayed for the system in the Altinn portal.
      * Texts must be provided for all supported languages: `nb` (Bokmål), `nn` (Nynorsk), and `en` (English).

4.  **Define Rights (`rights` and `accessPackages`)**

      * Specify which services or access packages the system requires access to.
      * Use `rights` to specify individual resources (e.g., `urn:altinn:resource`).
      * Use `accessPackages` to specify predefined access packages (e.g., `urn:altinn:accesspackage:skattegrunnlag`).
      * **Note:** These rights **must** be defined correctly *before* a system user can be created for this system.

5.  **Link Client ID (`clientId`)**

      * Provide a list of `clientId` values (as UUIDs) that have been generated in Maskinporten for this integration.
      * A system can be linked to multiple client IDs.
      * This is the same client ID that will later be used when creating a system user towards Maskinporten.

6.  **Set Visibility (`isVisible`)**

      * `true`: The system is visible in the Altinn portal and can be used to create a system user from there (user-managed creation).
      * `false`: The system is not visible in the portal. In this case, the system user must be created through a supplier-managed process.
      * **Important:** A system cannot be set to isVisible: true if it simultaneously has IsAssignable: false (a field that controls assignability, not shown in the JSON example).

7.  **Set Redirect URLs (Optional) (`allowedredirecturls`)**

      * This field is optional and can be omitted or set as an empty list (`[]`).

      * *If* the field is used, it must contain a list of exact URLs that are approved for redirection in the system user creation flow.

      * If the list is defined, a system user request must use a URL from this list (or a subset of it).

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

      * Use a POST request to create the system the first time.

      * Use a PUT request to modify an existing system.

      * **IMPORTANT:** A PUT request overwrites the entire system definition. When you need to make changes (e.g., add a new access package), you must retrieve the existing definition, make the changes, and then send the entire updated JSON payload in the PUT call. If you only send the new changes, all previous information will be deleted.

      * Always include your valid Maskinporten or Altinn token in the Authorization header for authentication.

-----

## Verification and Notes

  * **Verification:** After successful registration, the system will be available for creating system users. If `isVisible` is set to `true`, the system will also be visible in the Altinn portal.
  * **Modification:** Systems that are registered can be modified and deleted afterwards via the API.