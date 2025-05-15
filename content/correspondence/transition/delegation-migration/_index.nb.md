---
title: Migrering av delegeringer
linktitle: Delegeringsmigrering
description: Migrering av delegeringer for Altinn Melding
tags: []
toc: true
weight: 30
---

Delegeringer av rettigheter kan gjøres på forskjellige vis og dersom dette ikke migreres som en del av migrerings-jobben for migrering av meldinger, vil ytterste konsekvens være at brukere mister tilgang til meldinger.

## Kort om delegeringer

- Delegeringer kan skje på tjeneste-nivå (Tjenestedelegering/Enkeltrettighetsdelegering) på konkrete rettigheter.
- Delegering kan skje på meldings-nivå (instansdelegering) på konkrete rettigheter.
- Delegering kan både gis, og slettes.
- Dette skjer løpende under tjenesten- og meldingens levetid.
- Det er en differanse i rettighetsmodellene mellom Altinn 2 Melding og Altinn 3:
  - "Read","Write" => "Read"
  - "ArchiveRead","ArchiveDelete" => finnes ikke i A3, de som har dette, får "Read".

Med disse fakta til grunn, så tilsier det at Delegeringer må migreres på både tjeneste- og instansnivå fra Altinn 2 til Altinn 3.
Samt at det ikke kan gjøres som en en-gangs-jobb, men det må synkroniseres når det skjer endringer.

### Teknisk implementasjon

Per nå er dette under analyse, men antakelsen er at det vil lages en intern komponent i Altinn 2 infrastruktur som håndterer synkroniseringen.

{{<children />}}
