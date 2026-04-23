---
title: 'Dialog Tokens'
description: 'Learn how dialog tokens can be used to simplify authorization and enable higher confidentiality'
weight: 30
---

## Introduction
A dialog token is a signed JSON Web Token (JWT) issued by Dialogporten that contains information about the authenticated user or organization, the selected actor, the dialog identifier, the date, and other details.

The dialog token enables a simpler authorization flow for both end-user systems and service providers, as it embeds the authorization decisions made by Altinn Authorization based on the ID-porten or Maskinporten identity used to authenticate the user. Relying on this token means service provider systems do not have to make requests back to Altinn Authorization in order to authorize requests, but can instead rely on the information in the dialog token submitted by the end-user system. This reduces latency and enables better performance.

{{<mermaid>}}
sequenceDiagram
autonumber
participant SBS as End-user system
participant DP as Dialogporten
participant AA as Altinn Authorization
participant TT as Service Provider
DP->>AA: Authorize request
AA->>DP: Return decision
DP->>SBS: Return dialog + dialog token
SBS->>TT: Perform action, supply dialogtoken
TT->>TT: Validate dialog token and action
TT->>SBS: Return response
{{</mermaid>}}
{{<center>}}_Diagram showing the overall end-user system flow using a dialog token. Note step 5, where the service provider authorizes the action without having to make requests to Altinn Authorization, instead reusing information from the decision Dialogporten received in step 2._{{</center>}}

## Front channel embeds and write actions

The dialog token also enables [front channel embeds]({{< relref "/dialogporten/getting-started/front-channel-embeds" >}}) and [write actions]({{< relref "/dialogporten/getting-started/write-actions" >}}), which are point-to-point interactions between the end user's device or system and the service provider systems, avoiding the need for intermediaries to handle data transfers.

## Security and trust
Dialogporten issues bearer tokens as JWTs (JSON Web Tokens) signed using state-of-the-art cryptography standards. The public key material used to verify tokens issued by Dialogporten is published at a standard HTTPS location, allowing for automatic configuration using most well-established cryptography application libraries.

**Read more**
* [Technical reference for dialog tokens]({{< relref "/dialogporten/reference/authorization/dialog-tokens" >}})

{{<children />}}
