---
title: Migrering av lenketjenester fra Altinn 2
linktitle: Migrering fra Altinn 2
description: Ressursregisteret er sentral for de som ønsker å benytte Altinn autorisasjon til tilgangsstyring og kontroll for tjenester de drifter utenfor Altinn.
tags: [architecture, security, authorization, xacml]
weight: 1
---


En ressurs kan opprettes på nytt eller importeres fra en Altinn 2 lenketjeneste


### Import fra Altinn 2 lenketjenester

Hvis man har eksisterende lenketjenester i Altinn 2 som man benytter for ekstern autorisasjon må disse flyttes over til ressursregisteret i Altinn 3 plattformen.

I Altinn Studio kan man velge å opprette ny ressurser basert på eksisteren lenketjenste.



Velg importer ressurs

![Migration](/authorization/modules/resourceregistry/migration/migrationstep1.png "Migration")

Gi id som skal benyttes i Altinn ressourceregistret

![Migration](/authorization/modules/resourceregistry/migration/migrationstep2.png "Migration")


Når man trykker import opprettes det en ny ressurs i Altinn Studio i repositry til organisasjon. 

Da ressursregisteret krever mer komplette data enn hva som var mulig å sette i Altinn 2, vil du måtte fylle ut ekstra verdier

- Tittel på Bokmål, Nynorsk og Engelsk
- Delegeringstekst på Bokmål, Nynorsk og Engelsk
- Beskrivelse på Bokmål, Nynorsk og Engelsk

![Migration](/authorization/modules/resourceregistry/migration/migrationstep1.png "Migration")