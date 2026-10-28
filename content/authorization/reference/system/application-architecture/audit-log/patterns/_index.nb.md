---
title: Arkitekturmønstre i Audit Log
linktitle: Arkitekturmønstre
description: Mønstre for å ta imot, lagre og hente autentiserings- og autorisasjonshendelser.
weight: 1
toc: true
---

Audit Log skiller asynkron innlasting fra lagring og lesing av sikkerhetshendelser.

## Købasert innlasting

Azure Functions leser hendelser fra køer og sender dem videre til Audit Log API-et. Produsentene trenger dermed ikke vente på databaselagringen.

**Fordeler:** løs kobling, utjevning av trafikktopper og mulighet for nye forsøk. **Ulemper:** hendelser blir etter hvert konsistente, kan komme flere ganger og krever overvåking av feilkøer.

- [`AuthorizationEventsProcessor` behandler autorisasjonshendelser](https://github.com/Altinn/altinn-auth-audit-log/blob/c070a2c4e18ee648ed9fb8a82dc53e2889ee235e/src/Functions/Altinn.Auth.AuditLog.Functions/AuthorizationEventsProcessor.cs).
- [`AuditLogClient` videresender hendelser til API-et](https://github.com/Altinn/altinn-auth-audit-log/blob/c070a2c4e18ee648ed9fb8a82dc53e2889ee235e/src/Functions/Altinn.Auth.AuditLog.Functions/Clients/AuditLogClient.cs).

## Separate hendelsesstrømmer over felles lag

Autentiserings- og autorisasjonshendelser har egne modeller, tjenester, repositories og controllere, men følger samme lagdeling.

**Fordeler:** domeneforskjeller blir eksplisitte og flytene kan utvikles separat. **Ulemper:** parallelle lag kan gi duplisert kode og ulik oppførsel.

- [`AuthenticationEventService` håndterer autentiseringshendelser](https://github.com/Altinn/altinn-auth-audit-log/blob/c070a2c4e18ee648ed9fb8a82dc53e2889ee235e/src/Altinn.Auth.AuditLog.Core/Services/AuthenticationEventService.cs).
- [`AuthorizationEventRepository` lagrer autorisasjonshendelser](https://github.com/Altinn/altinn-auth-audit-log/blob/c070a2c4e18ee648ed9fb8a82dc53e2889ee235e/src/Altinn.Auth.AuditLog.Persistence/AuthorizationEventRepository.cs).

## Tidsbasert databasepartisjonering

En bakgrunnstjeneste oppretter partisjoner, mens et eget repository kapsler inn databaseoperasjonene. Store hendelsestabeller deles etter tid.

**Fordeler:** mer forutsigbare spørringer og enklere livssyklusstyring. **Ulemper:** manglende partisjoner kan stoppe skriving, og opprydding må samordnes med krav til bevaring.

- [`PartitionCreationHostedService` sørger for kommende partisjoner](https://github.com/Altinn/altinn-auth-audit-log/blob/c070a2c4e18ee648ed9fb8a82dc53e2889ee235e/src/Altinn.Auth.AuditLog/Services/PartitionCreationHostedService.cs).
- [`PartitionManagerRepository` utfører partisjonsoperasjonene](https://github.com/Altinn/altinn-auth-audit-log/blob/c070a2c4e18ee648ed9fb8a82dc53e2889ee235e/src/Altinn.Auth.AuditLog.Persistence/PartitionManagerRepository.cs).

## Repository som lagringsgrense

Kjernetjenestene avhenger av repositorygrensesnitt og kjenner ikke PostgreSQL-detaljene.

**Fordeler:** forretningsflyten kan prøves uten database. **Ulemper:** et generisk lag kan skjule kostbare spørringer og databasespesifikk oppførsel.

- [`IAuthorizationEventRepository` definerer lagringsgrensen](https://github.com/Altinn/altinn-auth-audit-log/blob/c070a2c4e18ee648ed9fb8a82dc53e2889ee235e/src/Altinn.Auth.AuditLog.Core/Repositories/Interfaces/IAuthorizationEventRepository.cs).