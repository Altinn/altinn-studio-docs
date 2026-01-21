---
title: Create System User
description: "This guide shows how you, as an end-user system vendor, can create a system user for your own system and a system user for a client system."
weight: 2
---



**Target Audience:** Developers and system integrators at an End-User System Vendor (SBSL) who will be integrating their system with the Altinn platform.

**Prerequisites:**

You must have some prerequisites in place before you create system user, see the [Getting Started guide](https://docs.altinn.studio/nb/authorization/getting-started/systemuser/).

-----

## 1. Create System User for Own System

This applies to a system user for your own system, where the system acts on behalf of the end-user organization. This can be done in two ways.

### Method A: [**Vendor-controlled Creation**](https://docs.altinn.studio/nb/authorization/guides/system-vendor/system-user/#Leverandørstyrt-opprettelse)

This is the preferred method where you, as the SBSL, initiate the creation via API.

1.  **Initiate request:** Send an HTTP POST request to the API endpoint.

     * **Test (TT02):** `https://platform.tt02.altinn.no/authentication/api/v1/systemuser/request/vendor`
     * **Production:** `https://platform.altinn.no/authentication/api/v1/systemuser/request/vendor`

2.  **Configure Request Body:** Include a JSON body that specifies the system, customer, and access rights (`accesspackage`).

     ```json
    {
    "systemId": "991825827_smartcloud",
    "partyOrgNo": "314248295",
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
    "redirectUrl": "https://smartcloudxxxx/receipt"
    }

3. **Receive response:** The API validates the request. Upon success, you will receive a JSON response with `status: "New"`.
4. **Get deep link:** From the response, retrieve the value of `confirmUrl`. Example response:

      ```json
        {
          "id": "505f8488-3d48-4c15-8e21-35cb9432f815",
          "status": "New",
          "confirmUrl": "https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/request?id=..."
        }
        ```

5.  **Relay link:** Provide the `confirmUrl` deep link to the end-user in a secure manner (e.g., directly in your software).

6.  **End-user approves:** The end-user must follow the link to [approve the System User](/nb/authorization/guides/end-user/system-user/accept-request/). The request will then get the status `Accepted`.


### Method B: [**User-controlled Creation**](https://docs.altinn.studio/nb/authorization/guides/system-vendor/system-user/#brukerstyrt-opprettelse)

This method is only relevant if you, as the SBSL, do *not* have your own interface to handle vendor-controlled creation.

1.  **Instruct end-user:** Ask the end-user to perform the following:
      * Go to the Altinn portal.
      * Navigate to system user creation.
      * Select your system from the dropdown list. (You must inform the customer what your system is named in the list).
2.  **Automatic approval:** When the user completes the process, they automatically approve all the predefined access rights the system needs.
3.  **Retrieve token:** After the user is created, you (SBSL) can retrieve the system user token needed for the integration.

-----

## 2\. Create System User for Client System

This applies to a system user for a system that will act on behalf of the end-user's *clients* (e.g., an accounting system).

**Key differences:**

  * Only **vendor-controlled** creation is possible.
  * You can *only* specify required access via `accessPackages`, not `rights`.
  * After approval, an additional manual step is required from the end-user.

### Instructions (Vendor-controlled Creation)

1. **Initiate request:** Send an HTTP POST request to the specific endpoint for client systems (`vendor/agent/`).

      * **Test (TT02):** `POST https://platform.tt02.altinn.no/authentication/api/v1/systemuser/request/vendor/agent/`
      * **Production:** `POST https://platform.altinn.no/authentication/api/v1/systemuser/request/vendor/agent/`

2. **Configure Request Body:** Include a JSON body. ***Note*** that the `rights` list must be empty or omitted.

    ```json
      {
    "systemId": "312605031_SuperRegnskap",
    "partyOrgNo": "310495670",
    "accessPackages": [
      {
        "urn": "urn:altinn:accesspackage:ansvarlig-revisor"
      }
    ],
    "redirectUrl": "https://superregnskap.no"
    }
    ```
    This request presupposes that a System exists in the System Registry with the systemId "312605031_SuperRegnskap" and the access package "ansvarlig revisor" (responsible auditor) beforehand.
    

3. **Receive response:** Receive a JSON response with `status: "New"` and a `confirmUrl`, similar to the process for "own system".

4. **Relay link:** Provide the `confirmUrl` deep link to the end-user in a secure manner.

5. **End-user approves:** The end-user follows the link and approves the request. (See [Approve System User](/nb/authorization/guides/end-user/system-user/accept-request/)). The status is set to `Accepted`.

6. **(Required) End-user delegates clients:** After the system user is approved, the end-user must **manually log in to Altinn** and delegate the clients (i.e., the organizations to be reported on behalf of) to the newly created system user. (See [Delegate Clients](/nb/authorization/guides/end-user/system-user/delegate-clients/)).

-----

## 3\. Verification and Status

### Verify Creation

After an end-user has approved a request (status `Accepted`), you as the SBSL can verify that the system user exists.

1.  Send an HTTP GET request to:
    `{{API_BASE_URL}}/authentication/api/v1/systemuser/vendor/byquery?system-id={systemId}&orgno={customerOrgno}`
    *(Replace `{API_BASE_URL}`, `{systemId}` and `{customerOrgno}`)*

2.  A successful response returns JSON with details about the system user, including the system user `id` and `userType`.

### Request Status

A request has a lifecycle defined by its status:

  * **New:** Newly created request, awaiting user action.
  * **Accepted:** The end-user has approved the request.
  * **Rejected:** The end-user has clicked "Do not approve".
  * **TimedOut:** The request was not answered within 10 days and has expired. It is no longer available via the API.
  * **Denied:** Not in use.


## Explore the API Documentation
For complete technical documentation, including detailed descriptions of parameters, responses, and authentication, go to Altinn's OpenAPI interface here: [**OpenAPI**](https://docs.altinn.studio/nb/api/authentication/spec/#/RequestSystemUser)
