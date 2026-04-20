---
title: Lesetilgang til API-et
linktitle: API-tilgang
weight: 10
description: Tilgang til hendelser API som konsument av hendelser.
---

## Henting og abonnering på hendelser
Når man skal hente (søke etter) hendelser eller registrere et hendelsesabonnement kreves det at klienten 
har inkludert scopet: **altinn:events.subscribe**.

Dette scopet er tilgjengelig for alle klienter definert i Maskinporten eller ID-porten.

{{% notice info %}}
Teknisk sett er det et unntak for hendelser produsert av en Altinn studio App. Vi anbefaler likevel at alle klienter
med ønske om å konsumere hendelser benytter nevnte scope. Scope vil kunne bli et krav uavhengig av hendelseskilde.
{{% /notice %}}
