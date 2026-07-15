---
title: Komponenter
linktitle: Komponenter
description: Ansvar, data og samspill for komponentene i Altinn Autorisasjon.
weight: 4
toc: true
---

Komponentgrensene følger faglig ansvar, men er ikke alltid identiske med repo- eller deploy-grenser. Tabellen er startpunktet når en endring skal plasseres eller en feil skal spores.

| Komponent | Ansvar | Viktige avhengigheter | Kilderepo |
|---|---|---|---|
| Authentication | Nettleserinnlogging, sesjon, tokenutveksling og etablering av identitetskontekst | ID-porten, Maskinporten, UIDP/FEIDE, Altinn Access Token | `altinn-authentication` |
| Register | Partsinformasjon, roller og representasjonsforhold | Folkeregister-/virksomhets- og rollekilder | `altinn-register` |
| Resource Registry | Ressursmetadata, policytilknytning, handlinger, tilgangspakker og samtykkegrunnlag | Policy- og administrasjonsflater | `altinn-resource-registry` |
| Access Management | Rettigheter, delegeringer, klientrelasjoner og lesemodeller for tilgang | Register, Resource Registry og Authorization | `altinn-authorization-tmp` |
| Access Management UI | Brukerflaten og BFF-en til Access Management | Access Management API-er og Authentication | `altinn-access-management-frontend` |
| Systembruker | Systemregister, systembrukerforespørsler og kobling mellom system, leverandør og kunde | Authentication, Maskinporten, Access Management og Resource Registry | `altinn-authentication` |
| Samtykke | Opprettelse, representasjon og validering av samtykkebaserte fullmakter | Resource Registry og Access Management | flere autorisasjonskomponenter |
| Authorization/PDP | Bygge beslutningskontekst, hente policy og evaluere tilgang | Register, Resource Registry, Access Management og beskyttet tjeneste | `altinn-authorization-tmp` |
| Audit Log | Motta, behandle og lagre autentiserings- og autorisasjonshendelser | Authentication, Authorization, Azure Storage Queue og PostgreSQL | `altinn-auth-audit-log` |

## Authentication

Authentication er en OIDC-basert autorisasjonsserver som delegerer identitetskontroll til eksterne identitetsleverandører. Den etablerer Altinn-sesjon for nettleserflyter og utveksler betrodde eksterne tokens til en identitetskontekst resten av plattformen kan bruke. Systembrukerfunksjonaliteten er implementert i samme repo, men representerer et eget faglig produkt.

## Register og Resource Registry

Register svarer på *hvem* og *på vegne av hvem*. Resource Registry svarer på *hva*. Dette skillet er grunnleggende i beslutningsmodellen: partsdata beskriver subjekt og representasjon, mens ressursmetadata og policy beskriver objektet og mulige handlinger.

## Access Management

Access Management er systemet for å administrere tilgangsrelasjoner. Backend-tjenestene og brukerflaten er ulike deploybare komponenter, men brukerflaten er ikke et eget produkt. PDP bruker relevante rettighetsdata som del av beslutningsgrunnlaget.

## Authorization og PDP

Authorization-applikasjonen eksponerer beslutningsfunksjonen. Den mottar subjekt, ressurs, handling og kontekst, kompletterer forespørselen med nødvendig informasjon og evaluerer den mot policy og rettigheter. XACML-modellen brukes for policy og beslutning, med et avgrenset sett funksjoner.

## Audit Log

Audit Log mottar hendelser asynkront via kø, prosesserer dem i en Function App og lagrer dem gjennom en containerisert API-tjeneste i PostgreSQL. Komponentens rolle er sporbarhet, revisjon og støtte til feilsøking; den er ikke den primære applikasjonsloggen for hver tjeneste.
