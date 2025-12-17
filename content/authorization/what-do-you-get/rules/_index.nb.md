---
title: Autorisasjonsregler
linktitle: Autorisasjonsregler
description: Autorisasjonsregler gir kontroll over hvem som kan bruke en tjeneste, hvilke handlinger de kan utføre, og i hvilken del av tjenesteflyten dette skal være mulig. Modellen brukes både for Altinn-ressurser og tjenester utviklet i Altinn-Studio. 
weight: 2
hidden: false
---

## Autorisasjon for ressurser og apper

Altinn bruker samme overordnede prinsipper for autorisasjon, uavhengig av om tilgangen gjelder en ressurs eller en app utviklet i Altinn Studio. Dette gjør at virksomheter kan forholde seg til én tilgangsmodell, selv om teknologien bak er ulik.


### Én tilgangsmodell

Autorisasjonsregler i Altinn bygger på tre grunnkomponenter:

* *Hvem* (tilgangspakke, Altinn-rolle, Enhetsregister-rolle, app-rolle)
* *Hva* (handlinger eller rettigheter)
* *Hvor* (prosess-steg i apper, eller sub-ressurser for lenketjenester)

Altinn Studio-apper og Altinn-ressurser bruker de samme begrepene, selv om regelstrukturen ligger på ulike steder. 


### Tilgangsstyring via fullmakter

Tilgang til tjenester i Altinn styres gjennom fullmakter. En virksomhet kan gi fullmakt til en tjeneste via to nivåer: 
Direkte til en enkelttjeneste, eller til tilgangspakken eller rollen tjenesten tilhører 
Fullmakt på pakke- eller rollenivå gir automatisk tilgang til alle tjenester og ressurser som inngår i dette.
Siden Altinn bruker samme autorisering på tvers av ressurser og apper, kan virksomheter delegere rettigheter uten å ta stilling til de teknologiske forskjellene mellom apper og ressurser.


### Forskjeller mellom ressurser og apper

Autorisasjon uttrykkes og håndteres ulikt i Altinn Studio-apper og Altinn 3-ressurser. Her er hovedforskjellene du trenger å vite om:

**Altinn-ressurser**:
Autorisasjon administreres i Altinns ressursregister
Rettigheter konfigureres via ressurs-dashboardet
Reglene ligger utenfor tjenestekoden og gjelder uavhengig av implementasjon

**Altinn Studio apper**:
Autorisasjon ligger i tjenestens policy-fil
Konfigureres via Innstillinger i tjenesten
Reglene evalueres mot instanser av tjenesten