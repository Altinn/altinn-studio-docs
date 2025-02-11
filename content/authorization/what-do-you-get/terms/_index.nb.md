---
title: Ordliste Altinn autorisasjon
linktitle: Ordlist
description: Her finner du ordliste for Altinn autorisasjon
tags: [architecture, terms]
toc: false
weight: 2
---


## Delegere/delegering

Det å gi fullmakt. Man kan delegere til innbygger, virksomhet, systembruker og selvidentifserte brukere i Altinn.

## Rettighet

Hva noen har rett til å gjøre. F.eks rett til å lese en melding, eller rett til å signere. 

## Regel

En regel definere hvem som har rettighet til å utføre noe. Tjeneste eiere definerer regler på ressurser og tjenester 
i Altinn studio.

## Policy

En policy er en samling av en eller flere regler. Hver tjeneste eller ressurs i Altinn har en policy med minst en regel.

## Tilgang

I Altinn: Handlingen “gi fullmakt”. Kan brukes i løpende tekst for å forklare denne handlingen.

Kan også brukes hvis det er nødvendig for å beskrive de ulike tingene en fullmakt kan gi rett til å gjøre med en tjeneste, for eksempel “lesetilgang”.

## Fullmakt

Betyr å "få tilgang/tillatelse til noe". Erstatter “tilgang” som hovedbegrep for handlingen. “Fullmakt” er begrepet vi bruker for handlingen brukerne skal gjøre når de gir tilgang. “Fullmakt” skal stå på navigasjonselementer, for eksempel på knapper.

## Enkelttjeneste

En tjeneste/ressurs som Altinn autorisasjon kan styre tilgang. Se tjeneste

## Fullmakt til en enkelttjeneste.

Erstatter enkeltrettighetsdelegering.

## Tjeneste

En tjeneste er en digital løsning som tilbyr funksjonalitet for dialog mellom en sluttbruker og en offentlig instans. Definert av Nina Kylstad.

## Tilgangspakke

Fullmakter til enkelttjenester er samlet i tilgangspakker.

En tilgangspakke er en fullmakt til flere tjenester innenfor samme område. 

Tjenesteeier definerer hvilke handlinger/ressurser/tjenester som skal knyttes til en fullmaktspakke

## Område

Tilgangspakkene er kategorisert i områder.

Basert på SSB sin kategorisering av virksomhetsområde. Men vi har laget noen i tillegg.

Kan ikke gi fullmakt til et område, men gir tilgang til pakkene under området. Dette for å understøtte fremtidige endringer.

## Administratortilgang

Tilgangspakkene som gir fullmakt til å administrere fullmakter. Men de gir ikke tilgang til tjenester.

Fire tilgangspakker er administratorfullmakter.

Tilgangsstyring, hovedadministrator, klientadministrasjon for regnskapsfører og revisor, kundeadministrator.

Disse er skilt ut i en egen tab i GUI i dag. Det går an å skjule dem i ressursregisteret.

## Tilgangsstyring

Den delen av Altinn som gir oversikt over brukere og fullmakter hos en virksomhet. Her kan du også gi fullmakt og be om fullmakt. 

## Tilgangsstyrer

Den i virksomheten som kan gi fullmakt. Bruker foreløpig ikke begrepet i GUI. Vær obs på bruken så ikke forveksles med tilgangspakken Tilgangsstyring. 

## Klientadministrasjon

Erstatter klientdelegering. 

## Oppgave

De ulike stegene i en tjeneste, for eksempel utfylling og signering.
Den som bruker en tjeneste, for eksempel den som skal fylle ut et skjema.

Brukes i Ressursregisteret, Altinn Studio, i dokumentasjon og mot tjenesteeiere.

## Sluttbruker

Den som bruker en tjeneste, for eksempel den som skal fylle ut et skjema.

Brukes i Ressursregisteret, Altinn Studio, i dokumentasjon og mot tjenesteeiere.


## Fagsystem/Sluttbrukersystem

Et system som løser noe for bruker/sluttbruker, for eksempel regnskapssystem eller HR-system.

Fagsystem brukes eksternt i Altinn GUI med målgruppe Altinn-brukere

Sluttbrukersystem brukes der målgruppen er tjenesteeiere og systemleverandører.

## Leverandør av fagsystem/Sluttbrukersystemleverandør

Noen som leverer et fagsystem som blir brukt av bruker/sluttbruker, for eksempel regnskapssystem eller HR-system.

Leverandør av fagsystem brukes eksternt i Altinn GUI med målgruppe Altinn-brukere

Sluttbrukersystemleverandør brukes der målgruppen er tjenesteeiere og systemleverandører.

## Sluttbrukerløsning

Sluttbrukerløsning har tradisjonelt vært brukt om altinn.no.

## Tjenesteutviklingsløsning

 Løsning der tjenester blir konfigurert, for eksempel Altinn Studio og Ressursregisteret.

## Avgiver/aktør

Avgiver/aktør er:
- En innbygger eller virksomhet
- den parten som rapporterer inn data. (hvem sin innboks skjema fylles ut i)
- Er den parten som mottar meldinger i Altinn. 
- Er den parten som som man administrerer rettigheter for.


## Systemtilgang

Med en systemtilgang kan du gi et fagsystem tilgang til å løse oppgaver i Altinn. For eksempel automatisk oppslag i skatteopplysninger. Maskin-til-maskin.
Systemtilgang