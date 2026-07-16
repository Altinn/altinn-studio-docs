---
title: Authentication persistence architecture
linktitle: Persistence architecture
description: Database schemas, tables, blob container and event queue in Altinn Authentication.
weight: 2
toc: true
---

The persistence architecture shows how Authentication stores durable data. The model is based on migrations through version 0.29 at [source commit `e581d8d`](https://github.com/Altinn/altinn-authentication/tree/e581d8d61542e87709f5b7292af4532693072832/src/Persistance/Migration).

## Storage overview

<a href="./storage-overview.svg" target="_blank" rel="noopener"><img src="./storage-overview.svg" alt="Authentication storage overview" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

Select a diagram to open it at full size in a new tab.

Authentication uses two PostgreSQL schemas, one configurable blob container for Data Protection keys and one Azure Storage queue for authentication events.

## The `business_application` schema

<a href="./business-application-schema.svg" target="_blank" rel="noopener"><img src="./business-application-schema.svg" alt="Database model for the business_application schema" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

The seven tables store registered systems, Maskinporten clients, system users, requests, archives and the change log. `system_register` is the root for clients, system user profiles and change logs. Request tables use logical identifiers without foreign keys to the root.

## The `oidcserver` schema

<a href="./oidcserver-schema.svg" target="_blank" rel="noopener"><img src="./oidcserver-schema.svg" alt="Database model for the oidcserver schema" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

The nine tables store OIDC clients, login transactions, authorisation codes, sessions, refresh tokens and credentials for self-identified users. An upstream transaction refers to either a registered or unregistered client flow; a check constraint requires exactly one.

`authorization_code.session_id` is a logical reference to `oidc_session.sid`, but the migration creates no foreign key.

## Blob container and queue

`KeysContainer` specifies the blob container. The `keys.xml` blob contains the ASP.NET Core Data Protection key ring and is protected with a Key Vault key. The container name varies between environments.

`AuthenticationEventQueueName` specifies the queue receiving authentication events before Audit Log processes them. Development configuration uses `eventlog`.

## Scope and maintenance

The SVGs show tables, key columns and explicit relationships. They omit indexes, check constraints, PostgreSQL domains, triggers and functions to remain readable. Update the diagrams and source commit when migrations or storage configuration change.