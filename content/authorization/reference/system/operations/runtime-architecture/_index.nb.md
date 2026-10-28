---
title: Kjøremiljøarkitektur
linktitle: Kjøremiljø
description: Slik kjører, konfigureres, overvåkes og leveres komponentene i Altinn Autorisasjon.
weight: 1
toc: true
---

Denne siden viser den logiske kjøremiljøarkitekturen. Den forklarer hvilke enheter som kan leveres, hvilke plattformtjenester de bruker, og hvor du finner den autoritative konfigurasjonen. Diagrammet er ikke en fullstendig ressursoversikt. Navn, størrelser, antall instanser og nettverksadresser skal leses fra infrastrukturen som kode og miljøet som kjører.

<a href="./runtime-overview.svg" target="_blank" rel="noopener noreferrer">
  <img src="./runtime-overview.svg" alt="Logisk kjøremiljøarkitektur for Altinn Autorisasjon" style="width: 100%; cursor: zoom-in;" />
</a>

*Klikk på diagrammet for å åpne det i full størrelse.*

## Hovedtrekk

- Klienter og andre Altinn-komponenter møter tjenestene gjennom den offentlige inngangen og API-grensen.
- De fleste kjernetjenestene bygges som Linux-containere. Den nøyaktige plasseringen og skaleringen kan variere mellom miljøene.
- Access Management UI og Audit Log API kjører som Azure Container Apps. Audit Log Consumer kjører som en separat Azure Function App.
- Hver komponent eier dataene sine. PostgreSQL-databaser, skjemaer, blobcontainere og køer er interne lagringskontrakter, ikke integrasjonsflater.
- Azure App Configuration gir konfigurasjon, mens Key Vault og administrerte identiteter beskytter hemmeligheter og tilganger.
- Den felles plattformen tilbyr blant annet nettverk, privat navneoppslag, brannmur, lagring, Service Bus og observabilitet.

Infrastrukturen i `altinn-authorization-tmp` bruker en hub- og spoke-modell. Huben samler felles nettverkstjenester. Hvert miljø har en spoke med miljøspesifikke arbeidslaster og datatjenester. Konfigurasjonen omtaler utviklings- og testmiljøene AT22, AT23, AT24 og YT01, testmiljøet TT02 og produksjon. Det betyr ikke at alle komponentene finnes i alle miljøene.

## Komponentprofiler

| Komponent | Enheter som kan leveres | Varige data og meldinger | Konfigurasjon og hemmeligheter | Autoritativ kilde |
|---|---|---|---|---|
| Authentication | .NET API som container | Flere PostgreSQL-skjemaer | Miljøkonfigurasjon og hemmeligheter utenfor containerbildet | [altinn-authentication](https://github.com/Altinn/altinn-authentication/tree/e581d8d61542e87709f5b7292af4532693072832) |
| Register | .NET API og bakgrunnsarbeid som container | PostgreSQL og importrelaterte lagre | Applikasjonsrepoet eier koden; infrastrukturen flyttes til monorepoet | [altinn-register](https://github.com/Altinn/altinn-register/tree/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87) og [Register-infrastruktur](https://github.com/Altinn/altinn-authorization-tmp/tree/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Register/infra) |
| Resource Registry | .NET API som container | PostgreSQL og ressursrelaterte blobdata | Koden ligger fortsatt i eget repo; plasseringen vil endres ved flytting til monorepoet | [altinn-resource-registry](https://github.com/Altinn/altinn-resource-registry/tree/8cc78660c3650e71b48fd18587928ef8065d9ea4) |
| Authorization (PDP) | .NET API som container | PostgreSQL, blobcontainere, kø og minnebuffer | App Configuration og administrert identitet settes opp fra Terraform | [applikasjon](https://github.com/Altinn/altinn-authorization-tmp/tree/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization) og [infrastruktur](https://github.com/Altinn/altinn-authorization-tmp/tree/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/infra) |
| Access Management | .NET API-er og bakgrunnsarbeid som container | PostgreSQL, Service Bus og lagring for låser | Terraform setter opp blant annet database, Key Vault, App Configuration, identitet og rolletilganger | [applikasjon](https://github.com/Altinn/altinn-authorization-tmp/tree/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement) og [infrastruktur](https://github.com/Altinn/altinn-authorization-tmp/tree/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/infra) |
| Access Management UI | React-klient og .NET BFF i en Azure Container App | Ingen autoritativ forretningsdatabase | Miljøspesifikke innstillinger for BFF og klient | [altinn-access-management-frontend](https://github.com/Altinn/altinn-access-management-frontend/tree/8539d5bd44c1fbace079a65dfa42831a599f8806) |
| Audit Log | API i en Azure Container App og Consumer i en separat Azure Function App | PostgreSQL og Azure Storage Queue | Egne leveranseløp og miljøinnstillinger for API-et og funksjonen | [altinn-auth-audit-log](https://github.com/Altinn/altinn-auth-audit-log/tree/c070a2c4e18ee648ed9fb8a82dc53e2889ee235e) |

Detaljene i [datamodellene](../../application-architecture/) forklarer tabeller, skjemaer og blobcontainere. Denne siden viser bare hvordan lagrene inngår i kjøremiljøet.

## Slik leveres endringer

I det nye monorepoet gjør GitHub Actions to forskjellige jobber:

1. Arbeidsflyten bygger applikasjonen som et versjonert containerbilde og publiserer bildet til GitHub Container Registry.
2. Terraform kjøres først mot utviklings- og testmiljøene, deretter TT02 og til slutt produksjon når applikasjonen har miljøspesifikk infrastruktur.

Navnet `CD: Apps` kan gi inntrykk av at arbeidsflyten også oppdaterer den kjørende arbeidslasten. Den undersøkte arbeidsflyten bygger og publiserer bildet og kjører Terraform, men viser ikke koblingen som velger det nye bildet i kjøremiljøet. Dokumenter denne koblingen når den er etablert eller funnet. Ikke anta at et publisert bilde er satt i drift.

De eldre komponentrepoene har egne arbeidsflyter. Access Management UI har blant annet et eksplisitt løp for tilbakerulling. Audit Log leverer Consumer som Function App og API-et som Container App i separate løp. Følg arbeidsflyten i repoet som eier komponenten før du planlegger rekkefølge eller tilbakerulling.

## Konfigurasjon og sikkerhet

Containerbildet skal være likt mellom miljøene. Miljøforskjeller skal komme fra konfigurasjon og plattformressurser, ikke fra manuelle endringer i bildet.

- Bruk App Configuration til vanlig miljøkonfigurasjon og funksjonsbrytere.
- Oppbevar hemmeligheter i Key Vault eller den godkjente hemmelighetsløsningen.
- Bruk administrerte identiteter og minst mulig rolletilgang mellom arbeidslastene og Azure-ressursene.
- Bruk private endepunkter og privat navneoppslag der infrastrukturen legger til rette for det.
- Ikke kopier hemmeligheter, tokens, tilkoblingsstrenger eller personopplysninger inn i dokumentasjonen.

## Helse og observabilitet

Den felles infrastrukturen inneholder Log Analytics, Application Insights og administrert Grafana. En operativ komponentprofil bør lenke til følgende opplysninger i repoet eller driftsverktøyet:

- endepunktene for oppstarts-, livstegn- og klarhetssjekker
- logger, spor og målinger med komponent- og miljønavn
- dashbord og varsler med navngitt eier
- forventede avhengigheter og typiske feiltilstander
- fremgangsmåten for tilbakerulling og kontroll etter leveranse

En autorisasjonsbeslutning bør kunne følges med sporings- eller korrelasjons-ID fra PEP via PDP og avhengigheter til Audit Log, uten at unødvendige personopplysninger logges.

## Ansvar og vedlikehold

Systemdokumentasjonen eier den stabile, logiske modellen og lenkene mellom komponentene. Repoene eier bygging, leveranse, helsesjekker og komponentnære prosedyrer. Terraform og den faktiske plattformen eier ressursnavn, nettverk, størrelser og miljøverdier.

Oppdater denne siden når en komponent

- flyttes mellom repoer eller kjøremodeller
- får en ny enhet som kan leveres
- bytter varig lager eller meldingstjeneste
- endrer leveranserekkefølge eller strategi for tilbakerulling
- flytter den autoritative infrastrukturen som kode