---
title: Systemgrensesnitt
linktitle: Systemgrensesnitt
description: Altinn 3 Melding Systemgrensesnitt
tags: []
toc: true
weight: 20
---

## Oversikt over Altinn 3 Melding eksterne grensesnitt
Følgende figur indikerer de viktigste systemgrensesnittene for Altinn 3 Melding som selvstendig løsning (uten Dialogporten):

![Oversikt over eksterne grensesnitt for Altinn 3 Melding som selvstendig løsning](altinn3-correspondence-standalone-interfaces-overview.nb.png "Oversikt over eksterne grensesnitt for Altinn 3 Melding som selvstendig løsning")

## API-operasjoner
En oversikt over operasjoner i Altinn 3 Formidling API gis av følgende figur:

![Altinn 3 Melding API-operasjoner](altinn3-correspondence-application-services.nb.png "Altinn 3 Melding API-operasjoner")

## Notifikasjoner om hendelser - maskin-til-maskin

![Altinn 3 Melding hendelsesnotifikasjoner](altinn3-correspondence-events.nb.png "Altinn 3 Correspondence Events")

## Varsling til sluttbrukere via e-post og SMS
Varsler til sluttbrukere om nye meldinger, filer og andre hendelser sendes via Altinns varslingstjeneste.

Se også:

## Scenariobeskrivelser

### Ende-til-ende typisk sekvens

Følgende sekvensdiagram viser typisk “happy path” sekvens fra opprettelse av vedlegg og melding, 
til levering og mottaksbekreftelse:

![Altinn 3 Correspondence 'happy path' sekvens](altinn3-correspondence-dialogporten-sequence-diagram.nb.png "Altinn 3 Correspondence 'happy path' sekvens")
