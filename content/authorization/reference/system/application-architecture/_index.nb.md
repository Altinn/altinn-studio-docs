---
title: Applikasjonsarkitektur
linktitle: Applikasjonsarkitektur
description: Intern oppbygning, teknologier og dataeierskap for applikasjonene i Altinn Autorisasjon.
weight: 3
toc: true
---

Denne siden beskriver hvordan hver applikasjon er bygd opp internt. [Systemarkitekturen](../architecture/) viser ansvaret og samspillet på tvers av applikasjonene, mens [informasjonsmodellen](../information-model/) beskriver begrepene og informasjonen de behandler.

Versjonsnumre endres ofte. Prosjektfilene i hvert repositorium er derfor kilden til hvilke versjoner som brukes nå.

## Felles mønster

De fleste backendapplikasjonene skiller mellom API, domenelogikk, integrasjoner og datalagring. Grensene er tydeligst i kildekoden og er ikke alltid egne prosesser i kjøremiljøet.

{{< mermaid >}}
flowchart LR
    Klient[Klient eller annen tjeneste] --> API[API-lag]
    API --> Kjerne[Domenelogikk]
    Kjerne --> Integrasjon[Integrasjonslag]
    Kjerne --> Persistens[Persistenslag]
    Integrasjon --> Ekstern[Eksterne tjenester]
    Persistens --> Database[(Komponentens database)]
{{< /mermaid >}}

| Applikasjon | Intern oppbygning | Sentrale teknologier | Data applikasjonen eier |
|---|---|---|---|
| Authentication | Webapplikasjon, kjerne, integrasjoner og persistens | ASP.NET Core, .NET 10, PostgreSQL, OpenTelemetry og Azure-tjenester | Sesjoner, OIDC-klienter, registrerte systemer og systembrukerforespørsler |
| Register | API, kjerne, persistens, integrasjoner og kontraktspakke | ASP.NET Core, .NET 9, PostgreSQL, MassTransit og .NET Aspire | Parter, eksterne roller og representasjonsforhold |
| Resource Registry | Webapplikasjon, kjerne, integrasjoner og persistens | ASP.NET Core, PostgreSQL og Azure-tjenester | Ressursmetadata, ressursreferanser og samtykkemetadata |
| Access Management | Flere API-flater, felles kjerne, integrasjoner og persistens | ASP.NET Core, .NET og PostgreSQL | Tilgangsforhold, delegeringer, roller og tilgangspakker |
| Authorization/PDP | Egen webapplikasjon og delte autorisasjonsbiblioteker | ASP.NET Core, XACML og Altinns PEP- og ABAC-biblioteker | Beslutningslogikk og policyrelatert informasjon |
| Access Management UI | React-klient og BFF | React 19, TypeScript, Vite og ASP.NET Core på .NET 10 | Brukergrensesnittets tilstand og tilpassede visningsmodeller |
| Audit Log | API, kjerne, persistens og køutløste funksjoner | ASP.NET Core, .NET 10, Azure Functions, Azure Storage Queue og PostgreSQL | Autentiserings- og autorisasjonshendelser |

## Authentication

Authentication er en ASP.NET Core-applikasjon som både håndterer nettleserbasert innlogging og utveksler tokens. Løsningen er delt i disse hovedprosjektene:

- `Authentication` eksponerer API-er, OIDC-endepunkter og applikasjonstjenester.
- `Core` inneholder domenemodeller, grensesnitt og logikk uten eksterne kall.
- `Integration` inneholder klienter mot blant annet Register, Access Management og identitetsleverandører.
- `Persistance` lagrer sesjoner, systemregister og systembrukerdata i PostgreSQL.
- `jwtcookie` er et delt bibliotek for Altinns JWT-baserte informasjonskapsler.

Applikasjonen bruker Azure Key Vault til signeringsnøkler og secrets. Den sender revisjonshendelser via Azure Storage Queue og bruker OpenTelemetry til sporing og målinger.

Systemregisteret og systembruker ligger i samme repositorium som Authentication, men er egne domeneområder. Denne plasseringen betyr ikke at begrepene hører til autentiseringsmodellen.

[Se applikasjonsarkitekturen og hoved-API-ene i Authentication.](./authentication/)

## Register

Register forvalter opplysninger om parter og representasjonsforhold. Applikasjonen består av et API, en domenekjerne, et persistenslag og egne integrasjoner for datakilder og importjobber.

- `Altinn.Register` eksponerer API-et og setter sammen applikasjonen.
- `Altinn.Register.Core` inneholder domenelogikken.
- `Altinn.Register.Persistence` lagrer registerdata.
- Integrasjonsprosjektene henter data fra blant annet Folkeregisteret og Enhetsregisteret.
- `Altinn.Register.Contracts` publiserer stabile kontrakter som andre applikasjoner kan bruke.
- `Altinn.Register.AppHost` setter sammen avhengighetene ved lokal kjøring med .NET Aspire.

Register bruker meldinger til å formidle endringer i parter og eksterne roller. Andre applikasjoner skal bruke API-er eller publiserte kontrakter, ikke lese databasetabellene direkte.

[Se applikasjonsarkitekturen og hoved-API-ene i Register.](./register/)

## Resource Registry

Resource Registry beskriver tjenester og andre ressurser som kan beskyttes med autorisasjonsregler. Applikasjonen har fire hovedlag:

- `Altinn.ResourceRegistry` eksponerer API-ene.
- `Altinn.ResourceRegistry.Core` inneholder ressursmodellen og domenelogikken.
- `Altinn.ResourceRegistry.Integration` håndterer kall til andre tjenester.
- `Altinn.ResourceRegistry.Persistence` lagrer ressursmetadata.

Ressursidentifikatoren er kontrakten mot autorisasjonsflytene. Ressursmetadata kan blant annet beskrive eier, type, delegerbarhet, autorisasjonsreferanser og grunnlag for samtykke.

[Se applikasjonsarkitekturen og hoved-API-ene i Resource Registry.](./resource-registry/)

## Access Management

Access Management forvalter tilgangsforhold. Løsningen har flere API-prosjekter for ulike konsumenter, blant annet sluttbrukere, tjenesteeiere, virksomheter, Maskinporten og interne tjenester. API-ene bruker en felles kjerne og felles persistens.

Denne oppdelingen gjør det mulig å ha forskjellige kontrakter og sikkerhetsgrenser uten å kopiere domenelogikken. `Altinn.AccessManagement.Core` inneholder den nyere domenekjernen. Repositoriet inneholder også eldre `Altinn.AccessMgmt`-prosjekter som fortsatt brukes i deler av løsningen.

Persistenslaget eier tilgangsforhold, rolletildelinger, delegeringer og koblinger til tilgangspakker. Resource Registry og Register leverer henholdsvis ressurs- og partsinformasjon.

[Se applikasjonsarkitekturen og hoved-API-flatene i Access Management.](./access-management/)

## Authorization og PDP

Authorization er applikasjonen som vurderer tilgangsforespørsler. Den bygger en beslutningskontekst, henter nødvendig informasjon og evaluerer forespørselen mot policy og rettigheter.

Repositoriet inneholder også delte biblioteker for API-kontrakter, PEP og ABAC. PEP-biblioteket brukes nær den beskyttede tjenesten, mens Authorization/PDP returnerer selve beslutningen. Bibliotekene er distribuerte byggeartefakter og ikke egne applikasjoner i kjøremiljøet.

[Se applikasjonsarkitekturen og hoved-API-ene i Authorization.](./authorization/)

## Access Management UI

Access Management UI består av to deler:

- En React-klient skrevet i TypeScript og bygd med Vite.
- En ASP.NET Core-basert BFF som tilpasser backend-API-ene til brukergrensesnittet.

BFF-en samler data fra blant annet Access Management, Authentication, Register og Resource Registry. Den skal ikke være autoritativ kilde for tilgangsdata. React-klienten bruker Designsystemet og egne frontendmodeller til å presentere og endre tilgangene.

[Se applikasjonsarkitekturen for Access Management UI.](./access-management-ui/)

## Audit Log

Audit Log behandler hendelser asynkront. Autentiserings- og autorisasjonskomponentene skriver hendelser til Azure Storage Queue. Azure Functions leser køene og sender de behandlede hendelsene til API-et, som lagrer dem i PostgreSQL.

Løsningen er delt i API, domenekjerne, persistens og Function App. API-et og funksjonene kjører på .NET 10. Audit Log eier revisjonshendelsene, men erstatter ikke applikasjonsloggene i de andre komponentene.

[Se applikasjonsarkitekturen og hendelses-API-ene i Audit Log.](./audit-log/)

## Kilder i kodebasene

Detaljene vedlikeholdes nær koden:

- `altinn-authentication/docs/architecture.md`
- prosjektfilene under `altinn-register/src/apps/Altinn.Register/src/`
- prosjektfilene under `altinn-resource-registry/src/`
- prosjektfilene under `altinn-authorization-tmp/src/apps/`
- `altinn-access-management-frontend/package.json` og prosjektfilene under `backend/`
- `altinn-auth-audit-log/README.md` og prosjektfilene under `src/`
