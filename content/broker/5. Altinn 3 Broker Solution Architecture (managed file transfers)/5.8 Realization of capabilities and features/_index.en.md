---
title: Altinn 3 Broker Capability Realization
linktitle: Capability Realization
description: Altinn 3 Broker Capability Realization
tags: [architecture, solution]
toc: true
weight: 80
---

{{<notice warning>}} <!-- info -->
This is work in progress.
{{</notice>}}

{{<notice info>}} <!-- info -->
TBD: Split into folders to allow navigation in the left side navigation pane!  
{{</notice>}}


## Realization of capabilities and features

### General

TBD: Describe the conceptual architecture Building Blocks (ABBs) vs.
specific Solutions Building Blocks (SBBs)…

### Use and reuse of other Digdir Solution Building Blocks
An overview of relevant Digdir components … TBD… update and translate…

[{{< figure src="./image10.png" title="Figure 10: Altinn Solution Building Block in question for use or re-use" alt="Alt-text">}}](https://www.vg.no)

### Dependancies
TBD

### Authentication and Authorization

Ref. [Authentication –
Altinn](https://docs.altinn.studio/authentication/) and [Authorization –
Altinn](https://docs.altinn.studio/authorization/).

TBD: Excplicit reference to the updated Maskinporten and Altinn Authorization 
solution architecture documentation. 


Ref. <https://digdir.github.io/dialogporten/#autorisasjon>

#### Maskinporten-token med systembruker-ID

Maskinporten foretar autentisering av systembruker/passord og utsteder
et beriket token med identifikator for systembrukeren. Både
tjenestetilbyder og Dialogporten må foreta oppslag mot Altinn
Autorisasjon for å autorisere den oppgitte systembrukeren på
tjenestenivå.

<img src="./image11.png" style="width:6.3in;height:3.08056in"
alt="Et bilde som inneholder tekst, skjermbilde, line, nummer Automatisk generert beskrivelse" />

#### Maskinporten-token med innbakt autorisasjon

I dette mønsteret oppgir SBS systembruker + passord, samt
tjenesteressurs i forespørselen til Maskinporten, som da foretar både
grov- og finkornet autorisasjon. Dette krever innføring av RAR (Rich
Authorization Requests) for Maskinporten, og en tettere kobling mellom
Maskinporten og Altinn Autorisasjon. Samme token-type kan benyttes mot
både Tjenestetilbyder og Dialogporten, men aud-claim må settes i token
og valideres for å unngå å åpne for replay-attacks.

<img src="./image12.png" style="width:6.3in;height:2.43264in"
alt="Et bilde som inneholder tekst, line, kvittering, diagram Automatisk generert beskrivelse" />

### Broker File storage

Broker File Storage is based MS Azure Blob Storage.

Stored Files are always encrypted; ref. [Azure Storage encryption for
data at rest \| Microsoft
Learn](https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption).

### Broker Metadata storage

Broker Metadata Storage uses the PostgreSQL Database.

Stored files are not accessible from the outside. TBD: Add detail!

### Addressing and capability lookup

TBD

### Logging

TBD

### Monitoring

TBD

### Clearing and billing

TBD

### Notifications to persons

TBD

### Notifications to End User Systems

Ref.
<https://digdir.github.io/dialogporten/#integrasjon-med-event-komponent>

### API Management

TBD… MS Azure API Management

### Case Folder
{{<notice warning>}} <!-- info -->
TBD: Move to Future enhancements!!!!!!!!! 
{{</notice>}}

Features:

- File versioning and change management
- Deletion of files




### File metadata

- correlationId

- uploadProtocol

- filename

- sendersFileReference

- checksum

- sender

- recipients

- Name-value pairs

- TBD: Review!

### Linked data

TBD

### Specific Security controls

#### Authentication and Authorization

Maskinporten and Altinn Authorization

#### Checksum
TBD

#### Virus check

- Configurable per transfer via intitalization

#### In-transit protection

Encrypted file transfers with TLS/HTTPS.

#### At rest protection

Encrypted Broker File Storage; ref. [Azure Storage encryption for data
at rest \| Microsoft
Learn](https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption).

Encrypted Broker Metadata Storage, Metadata storage using the PostgreSQL Database. Detalis TBD

TBD: Specific encryption solution... firewall, not V-net... 


#### Alternative file storage solutions

TBD

#### DDoS attack prevention

DDoS attack prevention via Azure API Management.

#### Hosting

Private cloud hosting

On-premises hosting

#### Coding practices

TBD Open source

#### Key Vault

Azure Key Vault, Private keys, internals... identities (hidden tokens); secrets,  Altinn authentication