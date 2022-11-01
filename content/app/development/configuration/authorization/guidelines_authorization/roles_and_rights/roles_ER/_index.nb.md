---
title: Rollesr fra Enhetsregisteret
linktitle: ER-Roller
description: Denne siden beskriver roller fra Enhetsregisteret som kan benyttes til å gi tilgang til en applikasjon. 
toc: true
---


I Enhetsregisteret er det offisielle registeret over virksomheter i Norge. I registeret kan man registrere ulike [organisasjonsformer](https://www.brreg.no/bedrift/organisasjonsformer/) og til de ulike typene finnes forskjellige roller. 

Når man velger roller er det derfor viktig å vurdere hvilke typer organisasjoner som skal benytte tjenesten og med det hvilke roller man må knytte til tjenesten for å gi disse tilgang


## Nøkkelroller
Altinn har definert et sett med nøkkelroller. Dette er roller som vurderes å ha et særskilt og overordnet ansvar for virksomheten. 
Nøkkelrollene vil tilsammen dekker de fleste organisasjonstypene som finnes og sikre at noen for tilgang tilgang til en gitt applikasjon på vegne av en virksomhet. 

Det bør være en særskilt grunn til f eks å ikke gi Daglig leder tilgang til en applikasjon - dette kan f eks være at tjenesten gir tilgang til personsensitiv data som 
daglig leder ikke har tjenslig behov for å ha tilgang til. I slike tilfeller bør roller for taushetsbelagte tjenester vurderes istedet, se <todo>

Innehaver av en nøkkelrolle fra Enhetsregisteret vil også alltid får rollen hovedadministrator og tilgangsstyrer på vegne av virksomheten. Les mer om hva dette er her <todo> 


- **Daglig leder (DAGL)** - kan knyttes til de fleste organisasjonstyper. 
- **Styrets leder (STYR)** - kan knyttes til alle organisasjonstyper som har et styre.
- **Bestyrende reder(BEST)** - knyttes til organisasjonsformen "partsrederi"
- **Bostyrer (BOBE)** - knyttes til organisasjonsformen "konkursbo"
- **Deltaker med delt ansvar (DTPR)** - kan knyttes til organisasjonsformer hvor deltakere har proratarisk ansvar
- **Deltaker med fullt ansvar (DTSO)** - kan knyttes til organsiasjonsformer hvor deltakere har solidarisk ansvar
- **Innehaver (INNH)** - kan knyttes til organisasjonsformen "Enkeltpersonforetak" 
- **Komplementar (KOMP)** - kan knyttes til orgnaisasjonsformen "Kommandittselskap"
- **Norsk representant for utenlandsk enhet (REPR)** - kan knyttes til organisasjonsformen "Norsk avdeling av utenlandsk foretak" (NUF)



## Rolle for norskregistert Utenlands foretak
**Kontaktperson for utenlandsk foretak(KNUF)**

Norsk avdeling av utenlansk foretak (NUF) er i utgangspunktet ikke et norsk selskap, men registreres i ER fordi det har aktivitet i Norge og trenger et organisasjonsnummer. 
Det er i dag ingen krav til at et NUF må ha registrert en daglig leder og mange har kun registrert en kontaktperson (KNUF) for Enhetsregisteret. Denne rollen har i juridisk sett i utgangspunktet begrensede fullmakter for den Norske avdelingen men kan i mange sammenhenger være den eneste som i praksis kan representere selskapet digital. 
Hvis dere vet at tjenesten deres benyttes av NUF så bør dere gjøre en vurdering pÃ¥ om det riktig og nødvendig at rollen "Kontaktperson for utenlansk foretak" (KNUF) også får tilgang til tjenesten. 

## Øvrige roller fra Enhetsregisteret som kan få tilganger via Altinn Autorisasjon
I tillegg til nøkkelroller så finnes flere typer roller som kan registreres på en virksomhet. 
Det er ansees ikke som naturlig at disse rollene får tilgang til alle tjenesgter på vegne av en virksomhet, men i enkelt tilfeller kan det allikevel være fornuftig. 
Vurderingen avhenger f eks av
- av hvilken type tjeneste man tilbyr
- om dette er en tjeneste det er naturlig at rollen utfører
- applikasjonen gir tilgang til informasjon som denne rollen bør ha tilgang til 
  
### Følgende øvrige roller hentes fra Enhetsregisteret: 
- Forretningsfører (FFØR)
- Kontaktperson i kommune (KOMK)
- Kontaktperson i Administrativ Enhet - offentlig sektor (KEMN)
- Komplementar (KOMP)
- Styremedlem (STYR)
- Nestleder (NEST)
- Sameiere (SAM)
- Regnskapsfører (REGN)
- Revisor (REVI)
- Varamedlem (VARA)
