---
title: Tilgangsstyring
linktitle: Tilgangsstyring
description: Tilgangsstyring (Access Management) gir funksjonalitet til sluttbrukere for å administrere grupper, roller og rettigheter
tags: [architecture, security, authorization, xacml]
weight: 1
---

{{<notice warning>}}
Dette er et arbeid som pågår
{{</notice>}}

Tilgangsstyringen vil gi funksjonalitet for å administrere ulike aspekter ved autorisasjon i Altinn.

- Delegere og tilbakekalle Altinn 2 roller
- Delegere og tilbakekalle tilgangspakker
- Opprette tilgangsgrupper
- Legg til og fjern medlemskap for tilgangsgrupper
- Delegere app- og instansrettigheter
- [Administrer delegerbare Maskinporten API-ressurser](https://github.com/Altinn/altinn-authorization/issues/59)
- Liste tilgangsgrupper medlemmer
- Liste ressurser som er knyttet til tilgangspakker


Dette designet er i tidlig fase.

## Delegering og administrasjon av delegert API-tilgang

Denne funksjonaliteten lar brukere delegere tilgang gjennom API ved hjelp av å delegere tilgang i maskinporten.

![API-delegasjoner](apidelegations.jpg "API-delegasjoner")

Denne funksjonaliteten forventes levert vinteren 2022/2023.

## Delegering av generelle ressursrettigheter

Den andre funksjonen som leveres fra den nye Access Management-komponenten vil være

## Delegering og administrasjon av tilgangspakker

Som en del av ny design vil ledelse av tilgangspakker overta for rollestyring

![Tilgangspakker](accessgroups.jpg "Administrasjon av tilgangspakker")

### Konstruksjon

Se detaljer hvordan AccessManagement er [konstruert](/authorization/reference/architecture/accessmanagment/).