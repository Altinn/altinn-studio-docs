---
title: Migrering av delegeringer
linktitle: Delegeringsmigrering
description: Migrering av delegeringer for Altinn Melding
tags: []
toc: true
weight: 30
---

Delegeringer av rettigheter for Meldingstjenester kan gjøres på forskjellige vis og dersom dette ikke migreres som en del av migrerings-jobben for migrering av meldinger, vil ytterste konsekvens være at brukere mister tilgang til meldinger.

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

## Hva migreres?

- Tjenestedelegering/Enkeltrettighetsdelegering.
- Instansdelegering er per nå _ikke_ støttet i Altinn 3, og det er derfor ikke mulig å hverken migrere eller synkronisere dette.

## Automatisk migrering og synk av delegeringer

Som en del av migrasjons-løpet blir Tjenestedelegering/Enkeltrettighetsdelegering migrert, og holdes synkronisert for _migrasjons-ressursene_.

### Teknisk implementasjon

- Det er opprettet en DelegationSync-batchjobb som kjører i Altinn 2 infrastruktur hvert xx minutt.
  - Ved hver kjøring sjekker om det er endringer på delegeringer siden forrige, og sender dette over til Altinn 3 APIene

## Manuell import av delegeringer

Det er mulig å bestille en manuell import av delegeringer fra en Altinn 2 meldingstjeneste til en Altinn 3 meldingsressurs for å lette re-etablering.

NB: Pass på å ha etablert ny ressurs i de aktuelle miljø før bestilling.

For å få bestilt import av delegeringer så send en e-post:
To:tjenesteeier@altinn.no
Subjekt: "Import av delegeringer fra Altinn 2 Meldingstjeneste til Altinn 3 Ressurs"
I teksten:
Angi hvilke miljø og tidspunkt dette skal utføres, samt:
Angi per tjeneste; Altinn 2 tjenestekode og utgavekode som skal være kilde samt den Altinn 3 Ressursen som skal få dette importert.
Spesifiser: "Ønsker at saken sendes til Altinn 2 Forvaltning".

Våre teknikere vil deretter kjøre en manuell kjøring av DelegationSync-jobben med gitte parametere.

{{<children />}}
