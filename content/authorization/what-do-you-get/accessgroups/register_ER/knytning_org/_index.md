---
title: Fullmakter fra Enhetsregisteret som knytter virksomheter sammen
linktitle: Virksomhetsknytninger
description: Virksomheter som tildeles roller i Enhetsregisteret kan også få fullmakter på vegne av virksomheten i Altinn. Her forklares hvordan dette gjøres. 
tags: [architecture, security, authorization, ]
toc: true
weight: 1
---
*Innhold på siden er under arbeid. Innholdet vil ikke være gjeldende før nye [tilgangspakker](/authorization/what-do-you-get/accessgroups/type-accessgroups/) trer i kraft. Dette må derfor ikke ansees som en fasit pr nå*


I mange tilfeller er det mulig å registrere andre organisasjoner i en eller flere roller på virksomheten. 
Altinn vil i mange tilfeller da sørge for en knytning mellom disse virksomhetene slik at person som har bestemte roller i tilknyttet organisasjon da få fullmakter på vegne av den aktuelle virksomheten. 
Vi kaller dette nøsting av fullmakter. 

## Hvem får fullmakt på vegne av tilknyttet virksomhet
Det er tilknyttet virksomhet og personer reigstrert med nøkkelroller i denne som får fullmakter på vegne av den aktuelle virksomheten. I tabeller på [denne siden](/authorization/what-do-you-get/accessgroups/register_er/) finner du oversikt over hvilke nøkkelroller som finnes på ulike organisasjonsformer. 

Eksempel 1 på hvordan det fungerer: 

- "Bergen AS" registrerer "Trondheim AS" i rollen som daglig leder
- Kari er daglig leder for "Trondheim AS" 

I dette eksemplet vil Kari få fullmakter på vegne av "Bergen AS". Kari vil kunne opptre på vegne av "Bergen AS" med samme fullmakter som en daglig leder. 

Eksempel 2 på hvordan det fungerer: 
- "Bergen AS" registrerer "Trondheim AS" i rollen som daglig leder
- "Trondheim AS" oppretter en virksomhetsbruker og denne gis fullmakten "Fullmakt for leverandør" (ECKEY-role) på vegne av "Trondheim AS"

I dette eksemplet vil virksomhetsbruker få fullmakter på vegne av "Bergen AS" gjennom sin knytning til "Trondheim AS". Virksomhetsbruker vil kunne opptre på vegne av "Bergen AS" med samme fullmater som en daglig leder. 


### For hvor mange ledd nøstes fullmakter videre? 

Altinn nøster fullmakter kun i ett ledd. 

Eksempel på hvordan det fungerer: 
- "Bergen AS" registrerer "Trondheim AS" i rollen som daglig leder
- Daglig leder for "Trondheim AS" er "Oslo AS"
- Ola er daglig leder for "Oslo AS"

I dette tilfellet vil ikke Ola få fullmakter på vegne av "Bergen AS". 

### Hva med underenheter?
Det registreres ikke roller direkte på underenheter (AAFY og BEDR) i Enhetsregisteret. Derfor styres tilgang på vegne av en underenhet gjennom roller registert på hovedenhet i Enhetsregisteret. 

Eks 1
- "Avdeling Salhus" er knyttet til aksjeselskapet "Brønnøysund AS"
- Kari er registert som daglig leder for "Brønnøysund AS"
I dette tilfellet vil Kari få samme fullmakter for "Avdeling Salhus" som hun har for "Brønnøysund AS"

Eks 2
- "Avdeling Salhus" er knyttet til aksjeselskapet "Brønnøysund AS"
- "Regnskap AS" er registert som regnskapsfører for "Brønnøysund AS"
- Ola er daglig leder for "Regnskap AS"
I dette tilfellet vil Ola få regnskapsfullmakter på vegne av "Avdeling salhus" og "Brønnøysund AS"

## Hva med regnskapsfører og revisor for Enkeltpersonforetak? 
Enkeltpersonforetak er spesielle på den måten at det er innehaver selv som er 100% ansvarlig for virksomheten. Derfor får nøstes enkelte fullmakter videre til innehavers personnummer for regnskapsfører og revisor

Eks: 
- Kari har registert et ENK kalt "Kari sitt ENK"
- "Rgnskap AS" er registert regnskapsfører for "Kari ENK"
- Ola er daglig leder for "Regnskap AS"
I dette tilfellet vil Ola få regnskapsfullmakter på vegne av "Kari sitt ENK" og på vegne av Kari som person. 


## Oversikt over hvilke organisasjonsformer og roller som nøster knytning mellom organisasjoner i Altinn

|Navn (kode)|Roller som nøstes videre til nøkkelroller i tilnyttet selskap|Merknader|
|-----------|--------------------------------------------------------------|----------|
|Aksjeselskap (AS)|DAGL, LEDE, REVI, REGN||
|Europeisk selskap (SE)|DAGL, LEDE, REVI, REGN||
|Selskap med begrenset ansvar (BA)|DAGL, LEDE, REVI, REGN||
|Samvirkeforetak (SA)|DAGL, LEDE, REVI, REGN||
|Enkeltpersonforetak (ENK)|DAGL, LEDE, REVI, REGN||
|Ansvarlig selskap med delt ansvar (DA)|DAGL, LEDE, *DTPR, REVI, REGN||
|Ansvarlig selskap med solidarisk ansvar (ANS)|DAGL, LEDE, *DTSO, REVI, REGN||
|Kommandittselskap (KS)|DAGL, LEDE, *KOMP, REVI, REGN||
|Tingsrettslig sameie (SAM)|DAGL, LEDE, REVI, REGN||
|Borettslag (BRL)|DAGL, LEDE, REVI, REGN||
|Boligbyggelag (BBL)|DAGL, LEDE, REVI, REGN||
|Eierseksjonssameie (ESEK)|LEDE, REVI, REGN||
|Sparebank (SPA)|DAGL, LEDE, REVI, REGN||
|Pensjonskasse (PK)|DAGL, LEDE, REVI, REGN||
|Gjensidig forsikringsselskap (GFS)|DAGL, LEDE, REVI, REGN||
|Partrederi(PRE)|BEST, LEDE, DTPR REVI, REGN||
|Verdipapirfond (VPF0)|DAGL, REVI, REGN||
|Annen juridisk person (ANNA)|DAGL, LEDE, REVI, REGN||
|Forening/lag/innretning (FLI)|DAGL, LEDE, REVI, REGN||
|Stiftelse (STI)|DAGL, LEDE, REVI, REGN||
|Kommune (KOMM)|DAGL, REVI, REGN||
|Staten (STAT)|DAGL, REVI, REGN||
|Fylkeskommune (FYLK)|DAGL, REVI, REGN||
|Organisasjonsledd (ORGL)|DAGL, LEDE, REVI, REGN, ORGL||
|Administrativ enhet -offentlig sektor (ADOS)|LEDE, REVI, REGN, ADOS||
|Statsforetak (SF)|DAGL, LEDE, REVI, REGN||
|Fylkeskommunalt foretak (FKF)|DAGL, LEDE, REVI, REGN, EIKM||
|Kommunalt foretak (KF)|DAGL, LEDE, REVI, REGN, EIKM||
|Interkommunalt selskap (IKS)|DAGL, LEDE, REVI, REGN| Det ansees ikke som relevant å gi kommunedirekøtr i deltakende kommune fullmakter på vegne av IKS|
|Den norske kirke (KIRK)|DAGL, LEDE, REVI, REGN|Det ansees ikke som relevant å gi tilknyttet kirkeorganisasjon i en eierkommune fullmakter på vegne av tilknyttet KIRK|
|Annet foretak iflg. særskilt lov (SÆR)|DAGL, LEDE, REVI, REGN||
|Norskregistrert utenlandsk foretak (NUF)|DAGL, LEDE, REVI, REGN||
|Utenlandsk enhet (UTLA)|DAGL, REVI, REGN||
|Europeisk selskap(SE)|DAGL, LEDE, REVI, REGN||
|Europeisk økonomisk foretaksgruppe (EOFG)|DAGL, LEDE, REVI, REGN||
|Kontorfellesskap (KTRF)|REVI, REGN||
|Særskilt oppdelt enhet jfr mval § 2-2 (OPMV)|DAGL, REVI, REGN||
|Andre bo (BO)|DAGL, LEDE, REVI, REGN||
|Konkursbo (KBO)|REVI, REGN||
|Tvangsregistrert for MVA (TVAM)|DAGL, INNH, REVI, REGN||
|Andre enkeltpersoner som registreres i tilknyttet register (PERS)|(ingen)||
|Andre ikke-juridiske personer (IKJP)|DAGL, LEDE, REVI, REGN||
|Underenhet til ikke-næringsdrivende (AAFY)|Samme roller som for overordnet enhet||
|Underenhet til næringsdrivende og offentlig forvaltning (BEDR)|Samme roller som for overordnet enhet||
