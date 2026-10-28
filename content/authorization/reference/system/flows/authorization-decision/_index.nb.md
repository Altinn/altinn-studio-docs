---
title: Følge en autorisasjonsbeslutning ende til ende
linktitle: Kjørbar autorisasjonsflyt
description: Slik kjører, følger og feilsøker du en representativ PDP-beslutning.
weight: 1
toc: true
---

Denne øvelsen bruker en eksisterende Bruno-test for en systembruker med direkte delegert tilgangspakke. Testen forventer `Permit` for `read`. Filstiene bygger på [kildecommit `20fcb3f`](https://github.com/Altinn/altinn-authorization-tmp/tree/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb).

## Hva øvelsen viser

Forespørselen går til `POST /authorization/api/v1/decision` med systembrukerens UUID, handlingen `read`, ressursidentifikatoren og ressurspartens organisasjonsnummer. Authorization beriker konteksten, henter policyen, evaluerer roller og delegeringer, kontrollerer eventuell tilgangsliste og oppretter en audit-hendelse.

## Forutsetninger

Du trenger repoet `altinn-authorization-tmp`, Bruno eller Bruno CLI, tilgang til avtalt testmiljø, gyldig abonnementnøkkel og miljøets testdata. Hent hemmeligheter gjennom teamets godkjente løsning. Ikke legg dem i Git.

Åpne samlingen:

```text
src/apps/Altinn.Authorization/test/Bruno/Altinn.Authorization
```

Velg avtalt miljø og kjør:

```text
shared/Decision/SystemUser_AccPkg_ToDo_Scenarios/
  SysUser_DirectDelg_AccPkg_Permit.bru
```

Forhåndsskriptet setter `subjectSystemUser`, `resourceId` og `resourceOrgno` fra miljøets testdata. Testen er vellykket når HTTP-status er `200` og `response[0].decision` er `Permit`.

## Les forespørselen

| XACML-kategori | Attributt | Betydning |
|---|---|---|
| AccessSubject | `urn:altinn:systemuser:uuid` | systembrukeren |
| Action | `urn:oasis:names:tc:xacml:1.0:action:action-id` | `read` |
| Resource | `urn:altinn:resource` | beskyttet ressurs |
| Resource | `urn:altinn:organization:identifier-no` | ressursparten |

Endre ikke delte testdata uten avtale.

## Følg koden

1. [`DecisionController.Post`](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization/Controllers/DecisionController.cs) tar imot intern JSON eller XML.
2. Context Handler beriker parts-, rolle- og ressurskonteksten.
3. PRP henter ressurspolicyen.
4. PDP evaluerer policyen.
5. Ved `NotApplicable` hentes og evalueres relevante delegeringer.
6. Et foreløpig `Permit` kan bli `Deny` dersom en påkrevd tilgangsliste ikke godkjenner parten.
7. Event Log oppretter hendelsen når logging er aktivert.
8. Audit Log-funksjonen leser `authorizationeventlog` og kaller Audit Log-API-et.

## Kjør lokalt

```powershell
just dev
dotnet build Altinn.Authorization.sln
dotnet run --project src/apps/Altinn.Authorization/src/Altinn.Authorization
```

Følg repoets README for database og hemmeligheter. En lokal Authorization-prosess med delte backendtjenester er en hybrid test. Et fullstendig `Permit` krever konsistente ressurs-, policy-, parts- og delegeringsdata i avhengighetene.

## Tolk og feilsøk

`Permit` må fortsatt håndheves av PEP. `Deny` er et eksplisitt avslag, `NotApplicable` betyr at ingen relevant regel ga en beslutning, og `Indeterminate` betyr at evalueringen feilet. `401` eller `403` før XACML-svaret gjelder normalt API-tilgang.

Kontroller miljø og abonnementnøkkel, subjekt, ressursparti, ressurs og handling, gjeldende policy, rolle eller delegering, tilgangsliste, funksjonsflagg og testdata. Bruk trace- eller korrelasjons-ID på tvers av avhengigheter og Audit Log. Logg aldri hele tokens eller unødvendig beslutningskontekst.