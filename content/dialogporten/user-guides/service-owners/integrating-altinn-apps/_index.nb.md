---
title: 'Integrere Altinn Apps'
description: 'Hvordan overstyre eller berike den automatiske Dialogporten-integrasjonen fra appen din'
weight: 50
---

## Introduksjon

Altinn Apps synkroniseres automatisk med Dialogporten. Hver gang en ny
instans opprettes, vil dialogtjenesten opprette eller oppdatere en tilhørende
dialog som er synlig for sluttbrukeren i Altinn Innboks ("arbeidsflate"). Denne
guiden forklarer hvordan standardoppførselen kan justeres og hvordan du kan ta
full kontroll over integrasjonen ved behov.

## Automatisk dialogsynkronisering

Som standard er synkroniseringen aktivert for alle applikasjoner. Oppdateringer av
instansen, som statusendringer, lagt til aktiviteter eller vedlegg, vil bli
reflektert i Dialogporten. Oppførselen kan finjusteres i appinnstillingene. Se
referanseinformasjonen lenket nedenfor for detaljer.

**Les mer**
* {{<link "../../../reference/front-end/altinn-apps">}}


## Bruke Dialogporten WebAPI SDK

Noen scenarier krever mer kontroll enn den automatiske synkroniseringen tilbyr.
[Dialogporten WebAPI SDK](https://github.com/Altinn/dialogporten/tree/main/src/Digdir.Library.Dialogporten.WebApiClient)
gir applikasjonen din programmatisk tilgang til Dialogporten slik at du kan opprette og
oppdatere dialoger selv. Dette muliggjør finkornet håndtering av aktiviteter,
forsendelser og synkronisering med Altinn Innboks.