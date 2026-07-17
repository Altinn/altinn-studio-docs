---
title: Utviklingsarkitektur
linktitle: Utviklingsarkitektur
description: Slik er kildekoden for Altinn Autorisasjon fordelt, bygd, testet og levert.
weight: 4
toc: true
---

Utviklingen av Altinn Autorisasjon er fordelt på flere kodebaser. Grensene følger i hovedsak komponentansvaret, men Authorization og Access Management deler et monorepo. [Applikasjonsarkitekturen](../application-architecture/) beskriver den interne oppbygningen av applikasjonene. Denne siden beskriver hvordan utviklerne arbeider med kildekoden og gjør endringer klare for drift. [Beslutningsmodellen i XACML](./xacml-decision-model/) forklarer ansvarsdelingen i en autorisasjonsbeslutning.

Versjoner, kommandoer og arbeidsflyter endres oftere enn arkitekturen. Prosjektfilene, `README.md` og arbeidsflytene under `.github/workflows/` i hvert repositorium er derfor kildene til gjeldende detaljer.

## Fordeling av kildekoden

| Repositorium | Kode og artefakter | Viktigste utviklingsgrense |
|---|---|---|
| [`altinn-authentication`](https://github.com/Altinn/altinn-authentication) | Authentication, OIDC-flyter og biblioteket for JWT-informasjonskapsler | Én .NET-løsning for applikasjonen, med egne tester og enkelte delte pakker |
| [`altinn-register`](https://github.com/Altinn/altinn-register) | Registerapplikasjonen og `Altinn.Register.Contracts` | Applikasjonen og den publiserte kontraktspakken versjoneres fra samme repo |
| [`altinn-resource-registry`](https://github.com/Altinn/altinn-resource-registry) | Resource Registry | Én .NET-løsning med applikasjons- og persistenstester |
| [`altinn-authorization-tmp`](https://github.com/Altinn/altinn-authorization-tmp) | Authorization/PDP, Access Management, delte biblioteker, NuGet-pakker, verktøy og infrastruktur | Monorepoet deler koden i vertikaler som kan bygges, testes og leveres uavhengig |
| [`altinn-access-management-frontend`](https://github.com/Altinn/altinn-access-management-frontend) | React-klient og .NET-basert BFF | Frontend og BFF utvikles og prøves sammen, men har egne byggejobber |
| [`altinn-auth-audit-log`](https://github.com/Altinn/altinn-auth-audit-log) | Audit Log-API, persistens og køutløste Azure Functions | API-et bygges som container, mens funksjonsapplikasjonen publiseres som et eget artefakt |

Repoet `altinn-authorization-tmp` inneholder også en kopi av Register-koden. Den autoritative kodebasen for Register er `altinn-register`. Endringer i Register skal derfor gjøres der og synkroniseres etter den avtalte arbeidsflyten, ikke utvikles uavhengig i kopien.
## Repoarkitekturen er i endring

Tabellen beskriver dagens fordeling av kildekoden. Teamet samler gradvis flere av komponentene i `altinn-authorization-tmp`. Resource Registry skal blant annet flyttes fra `altinn-resource-registry` til dette monorepoet.

I overgangsperioden kan en komponent derfor finnes i to repoer. Det betyr ikke at begge kopiene skal videreutvikles parallelt. Teamet må angi hvilken kodebase som er autoritativ, hvordan endringer skal synkroniseres, og når bygging og levering skal flyttes til det nye repoet. Dokumentasjonen skal vise dagens autoritative kodebase frem til ansvaret faktisk er overført.

Flyttingen endrer utviklings- og leveransegrensene, men ikke nødvendigvis komponentansvaret eller API-kontraktene. [Komponentoversikten](../components/) beskriver det logiske ansvaret uavhengig av hvor kildekoden ligger.

## Fra endring til leveranse

{{< mermaid >}}
flowchart LR
    Endring[Kode- og konfigurasjonsendring] --> PR[Pull request]
    PR --> Kontroll[Bygg, tester og statisk analyse]
    Kontroll --> Hovedgren[Hovedgren]
    Hovedgren --> Artefakt[Container, funksjon eller NuGet-pakke]
    Artefakt --> Testmiljø[Testmiljø]
    Testmiljø --> Utgivelse[Versjonert utgivelse]
    Utgivelse --> Produksjon[Produksjon]
{{< /mermaid >}}

Hvert repo eier sin egen kontinuerlige integrasjon og levering. En pull request utløser normalt bygging, automatiserte tester og kodeanalyse. Sikkerhetskontroller som CodeQL og containerskanning ligger også nær kodebasen. Etter at en endring er slått sammen, bygger arbeidsflytene et sporbart artefakt fra den aktuelle committen og leverer det videre til ett eller flere testmiljøer. Produksjonssetting følger en versjonert utgivelse eller en godkjent leveransearbeidsflyt.

Denne oppdelingen betyr at en systemendring som går på tvers av flere komponenter, må koordineres som flere kompatible leveranser. API-kontrakter og meldingsformater må kunne brukes mens produsenter og konsumenter kjører forskjellige versjoner.

## Bygge og kjøre lokalt

Backendrepoene bruker .NET-løsninger som felles inngang til bygging og tester. Flere integrasjonstester starter PostgreSQL eller andre avhengigheter i containere. En vellykket bygging uten en tilgjengelig containermotor dekker derfor ikke nødvendigvis hele testsettet.

| Område | Lokal inngang | Lokale avhengigheter |
|---|---|---|
| Authentication | `Altinn.Platform.Authentication.sln` og `dotnet run` fra applikasjonsprosjektet | .NET SDK og containermotor for integrasjonstester |
| Register | `Altinn.Register.sln` og .NET Aspire AppHost | .NET SDK, containermotor og lokale datakilder eller erstatninger ved behov |
| Resource Registry | `ResourceRegistry.sln` og Compose-oppsett | .NET SDK, containermotor og PostgreSQL |
| Authorization og Access Management | `Altinn.Authorization.sln`, appløsningene og kommandoene i `.justfile` | .NET SDK, PowerShell, Just og containermotor; enkelte flyter trenger Azure-tilgang |
| Access Management UI | Yarn-kommandoene i `package.json` og BFF-løsningen under `backend/` | Node.js/Yarn og .NET SDK; hybrid oppstart kan bruke tjenester i et Altinn-testmiljø |
| Audit Log | `Altinn.Auth.AuditLog.sln` | .NET SDK, PostgreSQL og Azurite for å prøve køflyten lokalt |

Utviklere bør bruke kommandoene i det aktuelle repoet. Tabellen viser inngangene, ikke en felles oppskrift som erstatter repoenes veiledninger.
### Verktøyene er ikke felles for alle repoene

.NET Aspire er ikke en felles standard for Altinn Autorisasjon. Register bruker en Aspire AppHost til å starte applikasjonen og lokale avhengigheter samlet. De andre repoene har valgt andre innganger ut fra behovene sine:

- Authorization og Access Management bruker Just og containere til det lokale utviklingsmiljøet.
- Resource Registry bruker Compose.
- Authentication kjøres hovedsakelig med `dotnet run`, mens integrasjonstestene bruker containere.
- Access Management UI bruker Yarn og Vite for React-klienten og .NET-verktøy for BFF-en.
- Audit Log bruker blant annet PostgreSQL og Azurite for å kjøre den fullstendige hendelsesflyten lokalt.

Når en komponent flyttes til monorepoet, må teamet ta stilling til om komponenten skal beholde verktøyene sine eller følge monorepoets felles utviklingsoppsett. En flytting av kildekoden betyr derfor ikke automatisk at det lokale utviklingsmiljøet blir likt for alle komponentene.

## Teststrategi

Testene ligger nær komponenten og kontrakten de beskytter:

- Enhetstester kontrollerer domenelogikk, serialisering og avgrensede tjenester.
- Integrasjonstester kontrollerer API, persistens og samspill med realistiske lokale avhengigheter.
- Bruno-samlinger i blant annet Authentication og Resource Registry støtter manuell og automatisert kontroll av API-flyter.
- Playwright prøver sentrale brukerreiser i Access Management UI, mens Vitest og Testing Library kontrollerer frontendkomponenter.
- k6-scenarier i autorisasjonsrepoet og Authentication brukes til målrettede ytelsesprøver.
- Planlagte systemtester kontrollerer utvalgte flyter mot delte testmiljøer.

Tester på tvers av repoer skal rette seg mot publiserte API-er og hendelser. De skal ikke koble komponentene sammen gjennom interne prosjektavhengigheter eller direkte databasetilgang.

## Leveranseartefakter

De kjørbare API-ene og BFF-en leveres hovedsakelig som containerbilder. Arbeidsflytene merker bildene med en commit eller utgivelsesversjon slik at koden som kjører, kan spores tilbake til kildekoden. Audit Log publiserer i tillegg Azure Functions separat.

Delte .NET-kontrakter og autorisasjonsbiblioteker leveres som versjonerte NuGet-pakker. Dette gjelder blant annet Register-kontraktene og pakkene for PEP og ABAC. En pakkeversjon er en kontrakt mellom repoer: konsumentene velger når de oppgraderer, og pakkeeieren må bevare kompatibilitet eller beskrive et eksplisitt brudd.

Infrastrukturen for Authorization og Access Management ligger i `infra/` i monorepoet og har egne kontroll- og leveransearbeidsflyter. Applikasjonskode og infrastruktur kan dermed endres i samme pull request, men bygges og godkjennes som ulike leveranser.

## Ansvar ved endringer på tvers

Når en endring berører flere repoer, må den som planlegger endringen avklare

- hvilket repo som eier kontrakten
- om endringen er bakoverkompatibel
- hvilken rekkefølge komponentene kan leveres i
- hvordan både gammel og ny versjon skal testes i overgangsperioden
- hvordan teamet kan rulle tilbake uten å gjøre lagrede data eller meldinger uleselige

En trygg standard er å utvide kontrakten først, levere konsumenten deretter og fjerne gammel oppførsel til slutt. Databaseendringer må følge samme prinsipp: ny og gammel applikasjonsversjon bør kunne kjøre mot skjemaet i perioden der en utrulling eller tilbakerulling pågår.

## Kilder i kodebasene

- `altinn-authentication/README.md`, `docs/development.md` og `.github/workflows/`
- `altinn-register/README.md`, `src/apps/`, `src/pkgs/` og `.github/workflows/`
- `altinn-resource-registry/README.md`, løsningens prosjektfiler og `.github/workflows/`
- `altinn-authorization-tmp/README.md`, `docs/testing/`, `eng/`, `infra/` og `.github/workflows/`
- `altinn-access-management-frontend/README.md`, `package.json`, `backend/`, `playwright/` og `.github/workflows/`
- `altinn-auth-audit-log/README.md`, prosjektfilene under `src/` og `.github/workflows/`
