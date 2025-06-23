---
title: Hvordan konfigurere prosessen til en Altinn app
linktitle: Prosess
description: Nedenfor finner du veiledninger for vanlige oppsett av prosessen
tags: [signering]
weight: 50
aliases:
- /nb/altinn-studio/guides/process/
---

Altinn apps har en forretningsprosess som er definert i filen `process.bpmn`.
Det må defineres minimum én oppgave i denne prosessen, og nyopprettede apps kommer med en "data"-oppgave som standard.
Det er en oppgave hvor man skal samle inn data, enten via skjema i appen eller via API-kall.

Mer om prosessen [her](/nb/altinn-studio/reference/process).

## Prosessoppgave (task)
Det er mulig å opprette sine egne prosessoppgaver, men det er sannsynlig at det kommer relativt store breaking changes på interfacet i neste major versjon (9.0).
Prosessoppgavene som følger med som standard, implementerer interfacet `IProcessTask`, og i prinsippet kan man lage egne implementasjoner av dette.
Det anbefales at man kontakter oss dersom dette anses som aktuelt.

## Systemoppgave (service task)
{{% insert "content/altinn-studio/guides/development/process/service-tasks/intro.nb.md" %}}

[Slik gjør du det](/nb/altinn-studio/guides/development/process/service-tasks)