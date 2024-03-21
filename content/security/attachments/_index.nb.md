---
title: Tillegg
description: 
toc: true
weight: 13
---

## Hvor behandles og lagres personopplysninger

| **Komponent**                                | **Data**                                                                                          | **Lokasjon**                                                                                                        |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Altinn Studio**                            | Brukernavn, epost-adresser, tilknytning til organisasjon, passord, knytning til GitHub, kildekode | Nord-Europa (skal flyttes til Vest-Europa). Flyttes ikke til Norge øst grunnet manglende funksjonalitet i Norge øst |
| **Tjenesteeierklustre**                      |                                                                       
| Application Insights                         | Logging fra tjenesteeier-applikasjonene                                                           | Vest Europa**                                                                                                       |
| Azure Key Vault                              | SAS-definisjoner til Storage Account                                                              | Norge øst                                                                                                           |
| Azure Key Vault                              | API nøkler/sertifikater som lastes opp av tjenesteeier og brukes av tjenestene                    | Norge Øst                                                                                                           |
| Azure Blob Storage                           | Skjema-data (definert av applikasjonene til tjenesteeierne) og binære vedlegg                     | Norge øst                                                                                                           |
| Azure Container Registry                     | Bildefiler («container images») av applikasjoner                                                  | Vest Europa*                                                                                                        |
| **Altinn Platform**                          |                                                                       
| Azure PostgreSQL                             | Metadata om innsendinger for alle tjenesteeiere og brukere, Hendelser                             | Norge øst                                                                                                           |
| Azure Key Vault                              | Hemmeligheter som benyttes av plattform                                                           | Norge øst                                                                                                           |
| Altinn Storage Account                       | Policy-filer fra alle applikasjoner                                                               | Norge øst                                                                                                           |
| Log Analytics Workspace/Application insights | Logger fra applikasjon, tjenester og klustre                                                      | Norge øst                                                                                                           |
| Microsoft Entra ID                           | Brukernavn, hashet passord, telefonnummer, navn                                                   | Europa med [enkelte unntak](https://learn.microsoft.com/en-us/entra/fundamentals/data-storage-eu) som f.eks SMS     |

<small>*Tjenesten er ikke tilgjengelig i norske datasentre  
** Tjenesten er nå tilgjengelig i Norge Øst, men er foreløpig ikke flyttet.</small>

## Azure regioner

| **Region**  | **Lokasjon** |
| ----------- | ------------ |
| Norge Vest  | Norge        |
| Norge Øst   | Norge        |
| Nord-Europa | Irland       |
| Vest-Europa | Nederland    |
