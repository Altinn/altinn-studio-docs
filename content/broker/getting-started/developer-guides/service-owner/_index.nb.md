---
title: Altinn 3 Formidling - Utviklerveiledning for Tjenesteeier
linktitle: Tjenesteeier
description: Hvordan komme i gang med Altinn 3 Formidling Tjenesteeier API-operasjoner, for utviklere
tags: [Broker, guide, Formidling]
weight: 30
---

{{<children />}}

{{% notice warning  %}}
Denne delen av dokumentasjonen er under arbeid, og inneholder derfor omfattende referanser til eksterne kilder, samt beskrivelser av flere scenarier.
{{% /notice %}}

## Operasjon: Initialiser Tjenesteeier i Formidling API {#operation-initialize-service-owner-in-broker-api}

**Endepunkt:** POST /broker/api/v1/serviceowner

Denne operasjonen konfigurerer organisasjonen din som en Tjenesteeier i Formidling Config Store.

**Forespørsel**: En forekomst av [ServiceOwnerInitializeExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/ServiceOwner/ServiceOwnerInitializeExt.cs) serialisert som JSON.

**Retur**: HTTP 200

**Utløste hendelser**: ingen.

**Eksempel**: "Register Service Owner" i vår [PostMan-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn-broker-postman-collection.json).

## Operasjon: Hent Tjenesteeierkonfigurasjon fra Formidling API {#operation-get-service-owner-config-from-broker-api}

**Endepunkt:** GET /broker/api/v1/serviceowner

Dette henter konfigurasjonen for organisasjonen din som en Tjenesteeier i Formidling Config Store.

**Forespørsel**: (Basert på organisasjonen spesifisert i tokenet).

**Retur**: HTTP 200 En forekomst av [ServiceOwnerOverviewExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/ServiceOwner/ServiceOwnerOverviewExt.cs) serialisert som JSON.

**Utløste hendelser**: ingen.

**Eksempel**: "Registrer Tjenesteeier" i vår [PostMan-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn-broker-postman-collection.json).

## Operasjon: Konfigurer ressurs i Formidling API {#operation-configure-resource-in-broker-api}

**Endepunkt:** PUT broker/api/v1/resource{resourceId}"

Denne operasjonen konfigurerer ressursen din i Altinn Formidling.

**Forespørsel**: En forekomst av [ResourceExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/ResourceExt.cs) serialisert som JSON.

**Retur**: HTTP 200

**Utløste hendelser**: ingen.

**Eksempel**: Eksempel "Update Resource" i vår [PostMan-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn-broker-postman-collection.json).

