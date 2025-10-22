---
title: Kom i gang med Samtykke
linktitle: Samtykke
description: For å komme i gang med med samtykkke må både datakonsument (sluttbrukersystem) og tjenesteeier gjennom noen steg for å sette opp løsningen
---

## Tjenesteeier

1. Opprett tjeneste som krever samtykke
   - Lag eller tilpass et API som tilbyr data som skal kunne deles basert på samtykke.  
   - 
   - API-et må kunne ta imot et gyldig **samtykketoken** (JWT) fra datakonsument som dokumentasjon på at sluttbruker har gitt samtykke.  
   - Beskriv tydelig hvilke data som deles, og under hvilke betingelser.

2. Registrer scopes for tjenesten   
   - Tjenesten må tildeles ett eller flere **OAuth2-scopes** i **Maskinporten**.  
    Disse scopes identifiserer hvilke rettigheter (ressurser) som krever samtykke.  
   - Hvert scope bør være spesifikt for formålet, f.eks.:  
3. Opprett samtykkeressurs i ressursregisteret
   Ressursregisteret inneholder beskrivelse av autorisasjonsressursen, samt tilgangsregler for denne. Sørg for å informere de som skal benytte tjenesten om nødvendige tilgangspakker (og eventuelle enkeltrettigheter) som kreves for å benytte tjenesten.
   - Scope
   - Tilgangsliste
4. Valider samtykke
   Samtykketokenet er et tykt token som inneholder all informasjon du trenger for å validere samtykket. Dette betyr at all validering kan gjøres uten oppslag mot Altinn Autorisasjon

## Datakonsument/Sluttbrukersystem

1. Datakonsumenten må ha registrert en Maskinporten-klient.
2. Datakonsumenten må ha fått delegert scope for samtykke fra Digdir.
   altinn:consentrequests.read
   altinn:consentrequests.write
3. Tilgang fra tjenesteeier
   1. Scopes
   2. Tilgangsliset
4. De nødvendige scopene må være lagt til Maskinporten-klienten..
5. Integrasjon
