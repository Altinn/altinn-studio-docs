---
title: Altinn 3 Broker Security Controls
linktitle: Security Controls
description: Altinn 3 Broker Security Controls - Summary 
tags: [architecture, solution]
toc: true
weight: 20
---

{{<notice warning>}} <!-- info -->
This is work in progress.
{{</notice>}}

## Authentication and Authorization
Maskinporten and Altinn Authorization

## Checksum
TBD

## Virus check

When a file is uploaded to Broker, it undergoes a scan by Microsoft Defender Antivirus. 
If no viruses are detected, the file is promptly published and made available for download by recipients. However, in cases where a virus is found or the scan fails, the file is removed, and the transfer status is updated to provide detailed information regarding the scan failure.


## In-transit protection

Encrypted file transfers with TLS/HTTPS.

## At rest protection

Encrypted Broker File Storage; ref. [Azure Storage encryption for data
at rest \| Microsoft
Learn](https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption).

Encrypted Broker Metadata Storage, Metadata storage using the PostgreSQL Database. Detalis TBD

TBD: Specific encryption solution... firewall, not V-net... 


## Alternative file storage solutions

TBD

## DDoS attack prevention

DDoS attack prevention via Azure API Management.

## Hosting

Private cloud hosting

On-premises hosting

## Coding practices

TBD Open source

## Key Vault

Azure Key Vault, Private keys, internals... identities (hidden tokens); secrets,  Altinn authentication


