---
draft: true
title: Veiledning for autorisasjonsregler
linktitle: Veiledning
description: Autorisasjonsregler må du definere med omhu. Denne veiledningen forteller hva du som applikasjonseier må vurdere før du setter autorisasjonsregler for en applikasjon.
toc: true
tags: [needsReview]
---

Du definerer autorisasjonsregler i henhold til XACML 3.0-standarden. Reglene angir hvilke betingelser som må være til stede for å gi
en bestemt bruker tilgang til å utføre ett eller flere trinn i applikasjonens [definerte arbeidsprosess](/nb/altinn-studio/v9/develop-a-service/process/).

## Du må vite hva du gjør!
Du som eier av tjenesten er selv ansvarlig for å lage autorisasjonsregler og velge riktige roller som gir tilgang til beskyttet informasjon. 
Selv om XACML-standarden gir deg stor frihet til å definere regler og velge rollene du ønsker, må du følge denne veiledningen for å sikre at
tilgangen til applikasjonen er korrekt og fungerer etter hensikten.

For å ta de riktige valgene når du lager autorisasjonsregler for appen din, trenger du en generell forståelse av hvordan Altinn Autorisasjon fungerer og hvordan du bruker den til å kontrollere tilgang.
På denne [siden](https://altinn.github.io/docs/utviklingsguider/styring-av-tilgang/for-tjenesteeier/) kan du lese mer om Altinn Autorisasjon.

## Du må velge roller med omhu!
I konfigurasjonsfilen for autorisasjon bruker du roller for å definere hvem som har lov til å utføre hvilke handlinger.
Altinn tilbyr et sett med roller du kan bruke som betingelse for å gi tilgang til et bestemt trinn i arbeidsprosessen og informasjonen som vises der.

Før du velger hvilken rolle du skal bruke, må du være sikker på at du har en god forståelse av hva disse rollene betyr, og hvilke tjenester og hvilken informasjon du kan forvente at rollen har tilgang til.
Det er viktig at autorisasjonsreglene og rollevalget samsvarer med intensjonene og forventningene administratoren for aktøren har. 
For eksempel forventer administratoren antagelig at rollen «Skatt» gir tilgang til tjenester knyttet til for eksempel skatterapportering, men ikke at denne rollen gir tilgang til tjenester innen lønn og personalområdet. 
På samme måte bør du være forsiktig med å bruke for eksempel rollen «Kontaktperson» fra Enhetsregisteret til å gi tilgang til tjenester, med mindre du har vurdert grunnlaget for tilgangen grundig. 

Hvis du ikke finner en rolle som passer, må du ta kontakt med Altinn slik at vi kan vurdere om vi bør opprette nye roller.

[Her](/nb/authorization/what-do-you-get/accesspackages/) kan du lese mer om hvilke roller og tilgangspakker som finnes i Altinn.

## Unngå å endre autorisasjonsregler etter produksjonssetting
Hvis du endrer autorisasjonsregler etter en produksjonssetting, kan brukere som har fått tilgang til tjenesten gjennom delegering av en rolle som tidligere var satt på tjenesten, miste muligheten til å utføre tjenesten.

Dette pålegger virksomhetene som skal bruke tjenesten en administrasjonsbyrde, fordi de da må rydde opp i delegeringer gjort med utgangspunkt i den gamle policyen. En slik praksis gir som regel misfornøyde brukere av applikasjonen. 

## Be om hjelp!
Som applikasjonseier må du alltid vurdere om intensjonene i rollebeskrivelsen stemmer overens med tjenesten eller tilgangen til data som applikasjonen din gir.
{{%notice warning%}}
Å gi feil personer tilgang til data de ikke burde ha, er ingen god markedsføring for tjenesten din. Vi anbefaler deg derfor sterkt å kontakte Altinn for veiledning i valg av roller og oppsett av autorisasjonsregler hvis du er usikker.
{{% /notice%}}

## Altinn kan pålegge deg å endre autorisasjonsregler
Selv om det er ditt ansvar som applikasjonseier å konstruere riktig autorisasjonsregel og velge riktige roller, gjennomfører Altinn stikkprøver av autorisasjonsreglene for tjenester i produksjon.
Hvis vi oppdager det vi anser som feil bruk av Altinn Autorisasjon, vil vi om nødvendig ta tjenesten ut av produksjon eller pålegge deg å endre autorisasjonsreglene.
