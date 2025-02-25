---
title: 'Getting dialog details'
description: 'How to get dialog details in Dialogporten'
weight: 30
---

## Introduction

This guide shows how a end-user system can access specific dialogs in Dialogporten using either REST or GraphQL APIs. 

Note that the data structure that is returned when getting single dialogs differ from the one returned on the [search endpoint]({{<relref "../searching-for-dialogs">}}); the dialog details view offer more information about the dialog and what the user may access. 

## Basic steps (REST)

1. [Authenticate as a end-user]({{<relref "../authenticating">}})
2. Find the dialog ID you want to access. To search for accessible dialogs, see the [search endpoint]({{<relref "../searching-for-dialogs">}}). Dialog IDs can also be [discovered via events]({{<relref "../detecting-changes">}}).
3. Perform a GET request to `/api/v1/enduser/dialogs/{dialogId}`.

## Returned information
The data structure returned consists of all the data available in the search endpoint, and additionally 
* title, summary and additional info (text)
* [front channel embeds]({{<relref "../../getting-started/front-channel-embeds">}}) (ie. referenced content)
* [actions]({{<relref "../../getting-started/dialogs/#actions">}}) that can be perfomed
* [activity log]({{<relref "../../getting-started/activity-log">}})
* [transmissions]({{<relref "../../getting-started/dialogs/#transmissions">}})

For full details, see the [dialog details entity]({{<relref "../../reference/entities/dialog/">}}).

## Authorization

Dialogporten will perform a authorization check against Altinn Authorization for the dialog and its components, checking whether or not the authenticated identity has access to 

* any or all of the defined actions
* any or all of the defined transmissions

These entities have a flag, `isAuthorized`, which is either `true` or `false`. If `false`, the URLs associated with the action or transmission is replaced with a special value, `urn:dialogporten:unauthorized`.

## Authentication level

Resources in Altinn Authorization may contain a policy that adds a requirement for a minimum level of authentication in order to access that resource. In practice, this is used to enforce the use of personal two-factor authentication methods provided by ID-porten, which correspond to "High" in [eIDAS Levels of Assurance (LoA)](https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/eIDAS+Levels+of+Assurance). These currently are:

* BankID (and BankID variants)
* Buypass
* Commfides

Other authentication methods, ie. MinID or Maskinporten/system users, are *not* considered as having a "High" Level of Assurance (but rather the second level, "Substantial").

Attempting to access dialog details with a token with insufficient authentication level will result in a `403 Forbidden` error.

## Working with dialog details

The data returned will look something like the structure below.

{{<notice warning>}}
This is an abbreviated and simplified model where some mandatory fields are omitted/altered for brevity
{{</notice>}}

```jsonc
{
    "id": "01945fca-3189-7159-b3e6-d6ff8f9cca0c",
    "org": "ttd",
    "serviceResource": "urn:altinn:resource:some-service",
    "party": "urn:altinn:person:identifier-no:08895699684",
    "content": {
        "title": "Melding fra TTD",
        "summary":  "Et sammendrag på inntil 250 tegn her.",
        "mainContentReference": { 
            "value": "https://externalsite.com/fce/e859b33d54ca",
            "mediaType": "application/vnd.dialogporten.frontchannelembed-url;type=text/markdown"
        }
    },
    "dialogToken": "eyJhbGciOiJ..snip..RwLXN0YWdpbmctMjQ",
    "attachments": [
        {
            "displayName": "Vedleggsnavn.pdf",
            "urls": [ 
                { 
                    "url": "https://externalsite.com/attch/vedlegg.pdf", 
                    "consumerType": "Gui" 
                }
            ]
        }
    ],
    "guiActions": [
        {
            "url": "https://externalsite.com/gui/formfill",
            "priority": "Primary",
            "title": "Gå til utfylling"
        }
    ],
    "apiActions": [
        {
            "version": "20250215",
            "url": "https://externalsite.com/api/formpost",
            "httpMethod": "POST",
            "requestSchema": "https://externalsite.com/schemas/20250215",
            "responseSchema": "https://externalsite.com/schemas/response"
        }
    ]
}
```

Note that the data structure contains actual content - it contains instead references to content via either front channel embeds or attachments, both of which refer to endpoints external to Dialogporten.

Additional requests will have to be performed in order to fetch these resources. The end user system should expect that all these endpoints require authentication and that the same authorization is enforced as on the dialog, action or attachment itself. Typically will the endpoints require that the same kind of token (ID-porten or Maskinporten with system user) is provided but with a separate scope. For Altinn-based services, please refer to the documentation for Altinn Correspondence and Altinn APps.

**Read more**
* [Reference information about the dialog details entity]({{<relref "../../reference/entities/dialog/#details">}})

## Handling front channel embeds

There may be several front channel embeds (FCEs) in a dialog:
* One (or zero) on a dialog level
* One (or zero) per transmission (there may be several transmissions)

The basic steps to handle front channel embeds are:

1. Perform a GET request to the URL indicated, supplying the the [dialogtoken]({{<relref "../../getting-started/authorization/dialog-tokens">}}) in a `Authorization: Bearer`-header
2. Based on the indicated media type, parse the response (usually markdown) and convert to the presentation format (usually HTML)
3. Inject the converted data into the GUI

The endpoints are expected to fully support the [CORS-protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), including pre-flight, enabling the use of [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) and similar APIs within a constrained web browser environment.

**Read more**
* {{<link "../../getting-started/front-channel-embeds">}}
* {{<link "../../getting-started/authorization/dialog-tokens">}}
* {{<link "../../reference/front-end/front-channel-embeds">}}
* {{<link "../../reference/authorization/dialog-tokens/">}}


## Seen log updates

**Read more**
* {{<link "../../getting-started/seen-log">}}
* {{<link "../../reference/entities/seen">}}