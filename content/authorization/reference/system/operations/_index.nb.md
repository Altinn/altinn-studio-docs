---
title: Drift og observabilitet
linktitle: Drift
description: Runtime, observabilitet og feilsøking på tvers av Altinn Autorisasjon.
weight: 8
toc: true
---

Komponentene har egne deploy- og driftsmodeller. Denne siden beskriver det tverrgående perspektivet; konkrete runbooks skal ligge nær koden som driftes.

## Runtime

Kjernetjenestene er i hovedsak .NET-baserte API-er som kjøres containerisert. Access Management UI består av React-klient og en .NET BFF. Audit Log bruker Azure Storage Queue, Function App, containerapplikasjon og PostgreSQL. Databaser og skjema skal behandles som komponentinterne kontrakter, ikke som integrasjonsflater.

## Observabilitet

En komplett autorisasjonsflyt bør kunne følges gjennom korrelasjons- eller trace-ID, miljø og komponent, ressurs og handling, beslutningsresultat og feilkategori, samt varighet for avhengighetskall. Unødvendige personopplysninger skal ikke logges.

## Feilsøking

1. Finn PEP-kallet og bekreft hvilken identitetskontekst som ble sendt.
2. Kontroller part og representasjon.
3. Kontroller ressursidentifikator, handling og policy.
4. Kontroller relevante roller, delegeringer eller samtykker.
5. Finn PDP-resultatet og skill `Deny` fra teknisk feil.
6. Følg korrelasjonen til audit-hendelser og avhengighetskall.

Detaljer om bygging, lokal kjøring, konfigurasjon, hemmeligheter, helsesjekker og beredskap vedlikeholdes i de enkelte repoene. Systemdokumentasjonen skal forklare sammenhengen og lenke til disse, ikke kopiere flyktige driftsverdier.
