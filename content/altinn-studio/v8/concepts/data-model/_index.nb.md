---
title: Datamodell
description: En datamodell beskriver et sett med data
weight: 10
---

En datamodell er en strukturert beskrivelse av hvilke data som skal samles inn og hvordan disse dataene henger sammen. 
I konteksten av et skjema (for eksempel et nettskjema for registrering eller søknad), beskriver datamodellen innholdet 
i skjemaet – altså hvilke opplysninger brukeren skal fylle ut – men sier ingenting om hvordan skjemaet ser ut eller er 
utformet visuelt.

Datamodellen fungerer som et rammeverk eller en plan for hva slags informasjon som er relevant å samle inn. For eksempel 
kan en datamodell definere at man skal hente inn data om navn, fødselsdato, e-postadresse og svar på noen spørsmål. 
Den fastsetter også typene for disse feltene (for eksempel tekst, dato, tall) og eventuelle regler, som at et felt er 
obligatorisk eller at en verdi må være innenfor et bestemt område. Dette bidrar til å sikre god kvalitet på de dataene 
som samles inn.

Selv om datamodellen og skjemaets visuelle utforming ofte henger sammen, er det ikke alltid en direkte én-til-én-samsvar. 
I noen tilfeller kan datamodellen speile skjemaet nøyaktig – hvert felt i skjemaet har en tilsvarende definisjon 
i modellen. I andre tilfeller kan datamodellen være mer abstrakt eller sammensatt enn skjemaet, for eksempel dersom 
flere skjemaer samler inn data som lagres i én felles modell, eller hvis samme modell brukes på tvers av ulike skjemaer.

Formålet med en datamodell er å sikre konsistens, struktur og gjenbruk av data. Den gir utviklere, designere og 
systemeiere en felles forståelse av hva slags informasjon som skal håndteres, og hvordan den skal organiseres, uavhengig 
av hvordan skjemaet vises for brukeren.