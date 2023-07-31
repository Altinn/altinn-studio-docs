---
title: Fullmakter fra Enhetsregisteret som knytter virksomheter sammen
linktitle: Virksomhetsknytninger
description: Virksomheter som tildeles roller i Enhetsregisteret kan også få fullmakter på vegne av virksomheten i Altinn. Her forklares hvordan dette gjøres. 
tags: [architecture, security, authorization, ]
toc: true
weight: 1
---
*Innhold på siden er under arbeid. Innholdet vil ikke være gjeldende før nye [tilgangsgrupper](/authorization/modules/accessgroups/type-accessgroups/) trer i kraft. Dette må derfor ikke ansees som en fasit pr nå*


I mange tilfeller er det mulig å registrere andre organisasjoner i en eller flere roller på virksomeheten. 
Altinn vil i mange tilfeller da sørge for en knytning mellom disse virksomhetene slik at person som har bestemte roller i tilknyttet organisasjon da få fullmakter på vegne av den aktuelle virksomheten. 
Vi kaller dette nøsting av fullmakter. 

## Hvem får fullmakt på vegne av tilknyttet virksomhet
Det er tilknyttet virksomhet og nøkkelroller i denne som får fullmakter på vegne av den aktuelle virksomheten. 

Eksempel 1 på hvordan det fungerer: 

- "Bergen AS" registrerer "Trondheim AS" i rollen som daglig leder
- Kari er daglig leder for "Trondheim AS" 

I dette eksemplet vil Kari få fullmakter på vegne av "Bergen AS". Ola vil kunne opptre på vegne av "Bergen AS" med samme fullmater som en daglig leder. 

Eksempel 2 på hvordan det fungerer: 
- "Bergen AS" registrerer "Trondheim AS" i rollen som daglig leder
- "Trondheim AS" oppretter en virksomhetsbruker og denne gis fullmakten "Fullmakt for leverandør" (ECKEY-role) på vegne av "Trondheim AS"

I dette eksemplet vil virksomhetsbruker få fullmakter på vegne av "Bergen AS" gjennom sin knytning til "Trondheim AS". Virksomhetsbruker vil kunne opptre på vegne av "Bergen AS" med samme fullmater som en daglig leder. 


## Hva mange ledd nøstes fullmakter? 

Altinn nøster fullmakter kun i ett ledd. 

Eksempel på hvordan det fungerer: 
- "Bergen AS" registrerer "Trondheim AS" i rollen som daglig leder
- Daglig leder for "Trondheim AS" er "Oslo AS"
- Ola er daglig leder for "Oslo AS"

I dette tilfellet vil ikke Ola få fullmakter på vegne av "Bergen AS". 