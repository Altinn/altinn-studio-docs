---
title: Veiledning for autorisasjonsregler
linktitle: Veiledning 
description: Autorisasjonsregler må defineres med omhu. Disse retningslinjene forteller hva applikasjonseier må vurdere før autorisasjonsregler settes for en applikasjon
toc: true
---

Autorisasjonsregler defineres i henhold til XACML 3.0-standarden. Reglene vil angi hvilke betingelser som må være til stede for å gi
en bestemt bruker tilgang til å utføre ett eller flere trinn i en applikasjons [definerte arbeidsprosess](/altinn-studio/reference/configuration/process/).

## Du må vite hva du gjør!
Eier av tjenesten er selv ansvarlig for å lage autorisasjonsregler og velge riktige roller som gir tilgang til beskyttet informasjon. 
Selv om XACML-standarden gir utvikleren stor frihet til å definere regler og velge de roller man ønsker, så må disse retningslinjene følges for å sikre at
tilgang til applikasjonen er korrekt og fungerer etter hensikten.

For å ta de riktige valgene når du lager autorisasjonsregler for appen din trenger du en generell forståelse av hvordan Altinn Autorisasjon fungerer og hvordan den brukes til å kontrollere tilgang.
På denne [siden](https://altinn.github.io/docs/utviklingsguider/styring-av-tilgang/for-tjenesteeier/) kan du lese mer om Altinn Autorisasjon.

## Roller må velges med omhu!
I konfigurasjonsfil for autorisasjon brukes roller for å definere hvem som har lov til å utføre hvilke handlinger.
Altinn tilbyr et sett med roller som kan brukes som betingelse for å få tilgang til et bestemt trinn i arbeidsprosessen og informasjon som vises.

Før du velger hvilken rolle du skal bruke, må du være sikker på at du har en god forståelse av hva disse rollene betyr og hva slags tjenester og informasjon som forventes at denne rollen har tilgang til.
Det er viktig at autorisasjonsregler og valg av roller samsvarer med intensjoner og forventninger som administrator for aktøren har. 
For eksempel forventer antagelig admnistrator at rollen "Skatt" gir tilgang til tjenester knyttet til for eksempel skatterapportering, men ikke at denne rollen gir tilgang til tjenester innen Lønn og personalområdet. 
På samme måte skal man være forsiktig med å bruke for eksempel rollen "Kontaktperson" fra Enhetsregisteret til å gi tilgang til tjenester med mindre man har vurdert grunnlaget for at denne får tilgang på en grundig måte. 

Hvis du ikke finner en rolle du synes passer må du ta kontakt med Altinn slik at vi kan vurdere om nye roller bør opprettes.

[Her](roles_and_rights) kan du lese mer om hvilke roller som finnes i Altinn. 

## Unngå endringer av autorisasjonsregler etter produksjonssetting
Endringer i autorisasjonsregler i etterkant av en produksjonssetting vil medføre at f eks brukere som har fått tilgang til tjenesten gjennom delegering av en rolle som tidligere var satt på tjenesten senere kanskje ikke får utført tjenesten allikevel.

Dette vil pålegge virksomheter som skal bruke tjenesten en administrasjonsbyrde fordi de da må rydde opp i delegeringer gjort med utgangspunkt i gammel policy. En slik praksis vil som regel gi misfornøyde brukere av applikasjonen. 

## Be om hjelp!
Som applikasjonseier må du alltid vurdere om intensjonene i beskrivelsen av rollen stemmer overens med tjenesten eller tilgangen til data som applikasjonen din gir.
{{%notice warning%}}
Å gi feil personer tilgang til data de ikke burde ha er ingen god markedsføring for tjenesten din. Vi anbefaler deg derfor sterkt å kontakte Altinn for veiledning i valg av roller og oppsett av autorisasjonsregler hvis du er usikker.
{{% /notice%}}

## Autorisasjonsregler må testes
Autorisasjonsregler må som alt annet testes før applikasjonen lanseres for å verifisere at riktige roller har tilgang til nødvendig data.

[Her](test_authorization_application) kan du lese våre anbefalinger knyttet til testing av autorisasjonsregler.


## Altinn kan pålegge å endre autorisasjonsregler
Selv om det er applikasjonseierens ansvar å konstruere riktig autorisasjonsregel og velge riktige roller, vil Altinn gjennomføre stikkkontroller med autorisasjonsreglene for tjenester som settes i produksjon.
Hvis vi oppdager det vi anser som feil bruk av Altinn Autorisasjon så vil vi, om nødvendig, ta tjenesten ut av produksjon eller pålegge endringer i autorisasjonsregler.

