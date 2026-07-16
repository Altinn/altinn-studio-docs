---
title: Arkitekturmønstre i Resource Registry
linktitle: Arkitekturmønstre
description: Mønstre for ressursmetadata, policyer, tilgangslister og eierskap i Resource Registry.
weight: 1
toc: true
---

Resource Registry forvalter metadata og sikkerhetsrelaterte koblinger for ressurser. Koden kombinerer klassisk lagdeling med mer eksplisitte aggregater for tilgangslister.

## Tjenestelag over repositories

Controllere bruker kjernetjenester, som igjen avhenger av repositorygrensesnitt for ressurser, policyer og tilgangslister.

**Fordeler:** API-, domenelogikk og lagring kan endres og prøves separat. **Ulemper:** tynne lag kan gi mye videresending, mens store tjenester kan samle for mange regler.

- [`ResourceRegistryService` samler ressursflytene](https://github.com/Altinn/altinn-resource-registry/blob/8cc78660c3650e71b48fd18587928ef8065d9ea4/src/Altinn.ResourceRegistry.Core/Services/ResourceRegistryService.cs).
- [`ResourceRegistryRepository` kapsler inn ressurslagringen](https://github.com/Altinn/altinn-resource-registry/blob/8cc78660c3650e71b48fd18587928ef8065d9ea4/src/Altinn.ResourceRegistry.Persistence/ResourceRegistryRepository.cs).

## Aggregater med hendelseshåndtering

Persistenslaget har generelle grenser for aggregater og aggregathendelser. Tilstandsendringer kan dermed behandles samlet rundt en konsistensgrense.

**Fordeler:** regler og hendelser knyttes til samme endring, og lagringen får en tydelig enhet. **Ulemper:** indirekte hendelsesflyt er vanskeligere å følge, og aggregater som blir store, gir samtidighetsproblemer.

- [`IAggregateRepository` definerer lagring av aggregater](https://github.com/Altinn/altinn-resource-registry/blob/8cc78660c3650e71b48fd18587928ef8065d9ea4/src/Altinn.ResourceRegistry.Persistence/Aggregates/IAggregateRepository.cs).
- [`IAggregateEventHandler` definerer behandling av aggregathendelser](https://github.com/Altinn/altinn-resource-registry/blob/8cc78660c3650e71b48fd18587928ef8065d9ea4/src/Altinn.ResourceRegistry.Persistence/Aggregates/IAggregateEventHandler.cs).

## Eksplisitt eierskapsautorisasjon

En egen ASP.NET Core-autorisasjonshåndterer kontrollerer om aktøren eier ressursen. En leverandør finner ressurseieren, og særskilte scopes behandles i en egen håndterer.

**Fordeler:** eierskapsregelen kan gjenbrukes deklarativt på endepunkter. **Ulemper:** flere håndterere kan gi uoversiktlig samspill, og feil i eieroppslaget påvirker alle beskyttede operasjoner.

- [`OwnedResourceAuthorizationHandler` kontrollerer eierskap](https://github.com/Altinn/altinn-resource-registry/blob/8cc78660c3650e71b48fd18587928ef8065d9ea4/src/Altinn.ResourceRegistry/Auth/OwnedResourceAuthorizationHandler.cs).
- [`IResourceOwnerProvider` avgrenser eieroppslaget](https://github.com/Altinn/altinn-resource-registry/blob/8cc78660c3650e71b48fd18587928ef8065d9ea4/src/Altinn.ResourceRegistry/Auth/IResourceOwnerProvider.cs).

## Tilgangslister som eget deldomene

Tilgangslister har egne API-er, tjenestegrense og repository. Medlemskap og selve listen behandles som beslektede, men separate ressurser.

**Fordeler:** reglene for lister isoleres fra generell ressursmetadata. **Ulemper:** konsistens mellom liste, medlemskap og ressurs må sikres på tvers av operasjoner.

- [`AccessListService` samler reglene for tilgangslister](https://github.com/Altinn/altinn-resource-registry/blob/8cc78660c3650e71b48fd18587928ef8065d9ea4/src/Altinn.ResourceRegistry.Core/AccessLists/AccessListService.cs).
- [`AccessListMembershipsController` skiller medlemsoperasjoner fra listeoperasjoner](https://github.com/Altinn/altinn-resource-registry/blob/8cc78660c3650e71b48fd18587928ef8065d9ea4/src/Altinn.ResourceRegistry/Controllers/AccessListMembershipsController.cs).

Resource Registry er planlagt flyttet inn i det midlertidige autorisasjonsrepoet. Mønstrene beskriver dagens kode; commitlåste lenker gjør analysens kilde eksplisitt når flyttingen skjer.