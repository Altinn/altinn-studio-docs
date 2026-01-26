---
draft: false
title: Datamodell
description: En datamodell beskriver strukturen på data som samles inn i en app.
weight: 30
tags: [needsReview]
---

## Datamodell i Altinn Studio

En datamodell er en strukturert beskrivelse av hvilke data appen skal samle inn og hvordan disse dataene henger sammen. I denne artikkelen forklarer vi hva en datamodell er, hvordan den fungerer, og hvorfor du trenger den.

### Hva er en datamodell?

En datamodell beskriver innholdet i et skjema – altså hvilke opplysninger brukeren skal fylle ut – men sier ingenting om hvordan skjemaet ser ut eller er utformet visuelt.

**Eksempel:**
Skattemeldingen har en datamodell som definerer at appen skal samle inn data om navn, fødselsdato, inntekt og fradrag. Den fastsetter også at navn er tekst, fødselsdato er dato, og at inntekt må være et tall.

### Hvordan fungerer en datamodell?

Datamodellen fungerer som et rammeverk eller en plan for hva slags informasjon appen skal samle inn. Den fastsetter:

- **Felttyper**: Om et felt er tekst, dato, tall eller noe annet
- **Regler**: Om et felt er obligatorisk eller om en verdi må være innenfor et bestemt område
- **Struktur**: Hvordan dataene henger sammen

Dette bidrar til å sikre god kvalitet på dataene du samler inn.

### Forholdet mellom datamodell og skjema

Selv om datamodellen og skjemaets visuelle utforming ofte henger sammen, er det ikke alltid en direkte én-til-én-samsvar.

- **Nøyaktig speiling**: I noen tilfeller speiler datamodellen skjemaet nøyaktig – hvert felt i skjemaet har en tilsvarende definisjon i modellen.
- **Mer kompleks**: I andre tilfeller kan datamodellen være mer abstrakt eller sammensatt enn skjemaet, for eksempel hvis flere skjemaer samler inn data som appen lagrer i én felles modell, eller hvis samme modell brukes på tvers av ulike skjemaer.

### Hvorfor trenger du en datamodell?

Formålet med en datamodell er å sikre konsistens, struktur og gjenbruk av data. Den gir utviklere, designere og systemeiere en felles forståelse av hva slags informasjon appen skal håndtere, og hvordan den skal organiseres, uavhengig av hvordan skjemaet vises for brukeren.
