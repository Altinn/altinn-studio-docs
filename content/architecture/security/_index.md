---
title: Security Architecture
description: Description of the Altinn Studio, Altinn Apps, Altinn Platform security architecture.
tags: [architecture, security]
weight: 100
alwaysopen: false
---


For a solutions like Altinn Studio, Altinn Apps and Altinn Platform security is a important aspect.

The security architecture is based on the following reference model

{{%excerpt%}}
<object data="/architecture/security/securityarchitecture.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

## Identity & Access managment
This area covers the following sub areas

### Authentication
How users and systems are authenticated for access to Apps and platforms API's 

[See authentication architecture](authentication)

### Authorization
How authenticated user and systems are authorized to perform requested actions in 

[See authorization architecture](authorization)

### Identity management
How the different identies are managed 

## Confidentiality and Integrity
This area covers the following sub areas

### Encryption
The ability to encrypt data 

### Digital Signatures
The ability to sign data to make sure it has not been modified

## Logging, tracking and log management
This area covers the following sub areas

### Event logging
How the platform logs events performed by the user or systems 

## Security infrastructure
This area covers the following sub areas

### Firewalls
The firewall products and architure

### Key vaults
How the different keys in the system are handled

## Availability
This area covers the following sub areas

### Scalability and robustness
How the architecture ensure a scalable and robust solutions

### Disaster recovery
How the architecture supports disaster recovery




