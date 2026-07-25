---
title: Tilgangsstyring
description: Planlegg hvem som skal ha tilgang til tjenesten
draft: true
---

Altinn Autorisasjon brukes for tilgangsstyring i Altinn apper. Du kan sette opp regler som definerer hvem som skal ha tilgang til 
å utføre definerte handlinger tilknyttet hele eller deler av tjenesten. Før du produksjonssetter tjenesten bør du ha en tydelig
plan for hvem som skal ha tilgang til å bruke tjenesten.


## Du må vite hva du gjør
Eier av tjenesten er selv ansvarlig for å lage autorisasjonsregler og velge riktige tilgangspakker som gir tilgang til beskyttet informasjon. 
Selv om XACML-standarden gir utvikleren stor frihet til å definere regler og velge de tilgangspakker man ønsker, så må disse retningslinjene følges for å sikre at
tilgang til applikasjonen er korrekt og fungerer etter hensikten.

For å ta de riktige valgene når du lager autorisasjonsregler for appen din trenger du en generell forståelse av hvordan Altinn Autorisasjon fungerer og hvordan den brukes til å konttilgangspakkere tilgang.

På denne [siden](/nb/authorization/about/detailed/) kan du lese mer om Altinn Autorisasjon.

## Tilgangspakker og roller må velges med omhu
I konfigurasjonsfil for autorisasjon brukes tilgangspakker for å definere hvem som har lov til å utføre hvilke handlinger.
Altinn tilbyr et sett med tilgangspakker som kan brukes som betingelse for å få tilgang til et bestemt trinn i arbeidsprosessen og informasjon som vises.

Før du velger hvilken tilgangspakke du skal bruke, må du være sikker på at du har en god forståelse av hva disse tilgangspakkene betyr og hva slags tjenester og informasjon som forventes at denne tilgangspakken har tilgang til.
Det er viktig at autorisasjonsregler og valg av tilgangspakker samsvarer med intensjoner og forventninger som administrator for aktøren har. 
For eksempel forventer antagelig admnistrator at tilgangspakken "Skatt" gir tilgang til tjenester knyttet til for eksempel skatterapportering, men ikke at denne tilgangspakken gir tilgang til tjenester innen Lønn og personalområdet. 
På samme måte skal man være forsiktig med å bruke for eksempel tilgangspakken "Kontaktperson" fra Enhetsregisteret til å gi tilgang til tjenester med mindre man har vurdert grunnlaget for at denne får tilgang på en grundig måte. 

Hvis du ikke finner en tilgangspakke du synes passer må du ta kontakt med Altinn slik at vi kan vurdere om nye tilgangspakker bør opprettes.

[Her](/nb/authorization/what-do-you-get/accessgroups/) kan du lese mer om hvilke tilgangspakker og roller som finnes i Altinn. 

## Unngå endringer av autorisasjonsregler etter produksjonssetting
Endringer i autorisasjonsregler i etterkant av en produksjonssetting vil medføre at f.eks brukere som har fått tilgang til 
tjenesten gjennom delegering av en tilgangspakke som tidligere var satt på tjenesten senere kanskje ikke får utført tjenesten allikevel.

Dette vil pålegge virksomheter som skal bruke tjenesten en administrasjonsbyrde fordi de da må rydde opp i delegeringer 
gjort med utgangspunkt i gammel policy. En slik praksis vil som regel gi misfornøyde brukere av applikasjonen. 

## Be om hjelp!
Som applikasjonseier må du alltid vurdere om intensjonene i beskrivelsen av tilgangspakken stemmer overens med tjenesten eller tilgangen til data som applikasjonen din gir.
{{%notice warning%}}
Å gi feil personer tilgang til data de ikke burde ha er ingen god markedsføring for tjenesten din. Vi anbefaler deg derfor sterkt å kontakte Altinn for veiledning i valg av tilgangspakker og oppsett av autorisasjonsregler hvis du er usikker.
{{% /notice%}}