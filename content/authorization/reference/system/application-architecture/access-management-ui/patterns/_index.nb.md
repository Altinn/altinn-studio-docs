---
title: Arkitekturmønstre i Access Management UI
linktitle: Arkitekturmønstre
description: Mønstre i React-klienten og BFF-en for Access Management UI.
weight: 1
toc: true
---

Access Management UI kombinerer en React-klient med en ASP.NET Core-basert backend for frontend (BFF). Mønstrene er tilpasset en brukerflate som samler data fra mange autorisasjonstjenester.

## Backend for frontend

BFF-en tilbyr endepunkter som er tilpasset brukeroppgavene, og skjuler tjenestetopologien og tilgangstokenene for nettleseren.

**Fordeler:** færre kall fra nettleseren, enklere kontrakter og en samlet sikkerhetsgrense.

**Ulemper:** BFF-en kan bli en ny monolitt, duplisere backendlogikk og øke responstiden.

**Eksempler i koden**

- [`AccessPackageController` tilbyr en brukerflatetilpasset API-flate](https://github.com/Altinn/altinn-access-management-frontend/blob/8539d5bd44c1fbace079a65dfa42831a599f8806/backend/src/Altinn.AccessManagement.UI/Altinn.AccessManagement.UI/Controllers/AccessPackageController.cs).
- [`AccessPackageService` setter sammen data for brukerflaten](https://github.com/Altinn/altinn-access-management-frontend/blob/8539d5bd44c1fbace079a65dfa42831a599f8806/backend/src/Altinn.AccessManagement.UI/Altinn.AccessManagement.UI.Core/Services/AccessPackageService.cs).

## Porter og klientadaptere

Kjernen avhenger av klientgrensesnitt, mens integrasjonsprosjektet inneholder HTTP-klientene. Dette er et porter-og-adaptere-mønster rundt eksterne Altinn-tjenester.

**Fordeler:** integrasjonene kan erstattes og prøves isolert. **Ulemper:** mange nesten like grensesnitt og modeller gir oversettingskode og mer navigering.

- [`IAccessManagementClient` er en port i kjernen](https://github.com/Altinn/altinn-access-management-frontend/blob/8539d5bd44c1fbace079a65dfa42831a599f8806/backend/src/Altinn.AccessManagement.UI/Altinn.AccessManagement.UI.Core/ClientInterfaces/IAccessManagementClient.cs).
- [`AccessManagementClient` er HTTP-adapteren](https://github.com/Altinn/altinn-access-management-frontend/blob/8539d5bd44c1fbace079a65dfa42831a599f8806/backend/src/Altinn.AccessManagement.UI/Altinn.AccessManagement.UI.Integration/Clients/AccessManagementClient.cs).

## Egne visningsmodeller

Modeller merket `Frontend` former data etter skjermbildenes behov i stedet for å eksponere integrasjonskontraktene direkte.

**Fordeler:** brukerflaten skjermes mot backendendringer og får mindre sammenstillingslogikk. **Ulemper:** modellen kan dupliseres og komme ut av takt med kilden.

- [`AccessPackageFE` er en egen visningsmodell](https://github.com/Altinn/altinn-access-management-frontend/blob/8539d5bd44c1fbace079a65dfa42831a599f8806/backend/src/Altinn.AccessManagement.UI/Altinn.AccessManagement.UI.Core/Models/AccessPackage/Frontend/AccessPackageFE.cs).

## Tjenester per brukeroppgave

BFF-kjernen deler orkestreringen i tjenester for blant annet tilgangspakker, samtykke, forbindelser og System User.

**Fordeler:** hver arbeidsflyt får et tydelig samlingspunkt. **Ulemper:** tjenestene kan bli tynne videresendinger eller utvikle overlappende ansvar.

- [`ConsentService` samler samtykkeflyten](https://github.com/Altinn/altinn-access-management-frontend/blob/8539d5bd44c1fbace079a65dfa42831a599f8806/backend/src/Altinn.AccessManagement.UI/Altinn.AccessManagement.UI.Core/Services/ConsentService.cs).