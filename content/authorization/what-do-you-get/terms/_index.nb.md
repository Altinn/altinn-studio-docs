---
title: Ordliste Altinn autorisasjon
linktitle: Ordliste
description: Her finner du ordliste for Altinn autorisasjon
tags: [architecture, terms]
toc: false
weight: 2
---

## Administratortilgang

Tilgangspakkene som gir fullmakt til å administrere fullmakter, men de gir ikke tilgang til tjenester.

Fire tilgangspakker er administratorfullmakter:

- Tilgangsstyring
- Hovedadministrator
- Klientadministrasjon for regnskapsfører og revisor
- Kundeadministrator

Disse er skilt ut i en egen tab i GUI i dag. Det går an å skjule dem i ressursregisteret.

## Avgiver/aktør

Avgiver/aktør er den innbyggeren eller virksomheten som den man opptrer på vegne av i Altinn.

- Rapporterer inn data for
- Leser meldinger for 
- Administrerer rettigheter for

Se også part.

## Delegere/delegering

Å gi fullmakt. Man kan delegere til innbygger, virksomhet, systembruker og selvidentifiserte brukere i Altinn.

## Enkelttjeneste

En tjeneste/ressurs som Altinn autorisasjon kan styre tilgang til. Se tjeneste.

## Fagsystem/Sluttbrukersystem

Et system som løser noe for bruker/sluttbruker, for eksempel regnskapssystem eller HR-system.

Fagsystem brukes eksternt i Altinn GUI med målgruppe Altinn-brukere.

Sluttbrukersystem brukes der målgruppen er tjenesteeiere og systemleverandører.

## Fullmakt

Betyr å "få tilgang/tillatelse til noe". Erstatter “tilgang” som hovedbegrep for handlingen. “Fullmakt” er begrepet vi bruker for handlingen brukerne skal gjøre når de gir tilgang. “Fullmakt” skal stå på navigasjonselementer, for eksempel på knapper.

## Fullmakt til en enkelttjeneste

Erstatter enkeltrettighetsdelegering.

## Klientadministrasjon

Erstatter klientdelegering.

## Leverandør av fagsystem/Sluttbrukersystemleverandør

Noen som leverer et fagsystem som blir brukt av bruker/sluttbruker, for eksempel regnskapssystem eller HR-system.

Leverandør av fagsystem brukes eksternt i Altinn GUI med målgruppe Altinn-brukere.

Sluttbrukersystemleverandør brukes der målgruppen er tjenesteeiere og systemleverandører.

## Område

Tilgangspakkene er kategorisert i områder.

Basert på SSB sin kategorisering av virksomhetsområde, men vi har laget noen i tillegg.

Man kan ikke gi fullmakt til et område, men gir tilgang til pakkene under området. Dette for å understøtte fremtidige endringer.

## Oppgave

De ulike stegene i en tjeneste, for eksempel utfylling og signering.

Den som bruker en tjeneste, for eksempel den som skal fylle ut et skjema.

Brukes i Ressursregisteret, Altinn Studio, i dokumentasjon og mot tjenesteeiere.

## Policy

En policy er en samling av en eller flere regler. Hver tjeneste eller ressurs i Altinn har en policy med minst én regel.

I Altinn benyttes XACML formatet for å beskrive en policy.

## Regel

En regel definerer hvem som har rettighet til å utføre noe. Tjenesteeiere definerer regler på ressurser og tjenester i Altinn Studio.

F.eks 

- **Daglig leder** har lov til å **signere** på tjenesten **MVA-rapport**
- Bruker med tilgangspakken **HR** har lov til å **lese** meldinger av typen **sykemelding**

## Rettighet

Hva noen har rett til å gjøre, for eksempel rett til å lese en melding eller rett til å signere.

En rettighet beskrives med handling + ressurs. 

Se regel.

## Sluttbruker

Den som bruker en tjeneste, for eksempel den som skal fylle ut et skjema.

Brukes i Ressursregisteret, Altinn Studio, i dokumentasjon og mot tjenesteeiere.

## Sluttbrukerløsning

Sluttbrukerløsning har tradisjonelt vært brukt om altinn.no.

## Systemtilgang /Systembruker
	
Med en systemtilgang kan sluttbruker gi et fagsystem fullmakt til å løse oppgaver i Altinn. For eksempel automatisk oppslag i skatteopplysninger. Maskin-til-maskin.

**Systemtilgang** brukes eksternt i Altinn GUI med målgruppe Altinn-brukere, der brukeren selv lager en systemtilgang.

**Systembruker** brukes om selve konseptet, der både tjenesteeier, systemleverandør og sluttbruker må utføre sin del for å få fullmakten til å fungere.

## Tilgang

I Altinn: Handlingen “gi fullmakt”. Kan brukes i løpende tekst for å forklare denne handlingen.

Kan også brukes hvis det er nødvendig for å beskrive de ulike tingene en fullmakt kan gi rett til å gjøre med en tjeneste, for eksempel “lesetilgang”.

## Tilgangspakke

Fullmakter til enkelttjenester er samlet i tilgangspakker.

En tilgangspakke er en fullmakt til flere tjenester innenfor samme område.

Tjenesteeier definerer hvilke rettigheter som skal knyttes til en fullmaktspakke.

## Tilgangsstyrer

Den i virksomheten som kan gi fullmakt. Bruker foreløpig ikke begrepet i GUI. Vær obs på bruken så det ikke forveksles med tilgangspakken Tilgangsstyring.

## Tilgangsstyring

Den delen av Altinn som gir oversikt over brukere og fullmakter hos en virksomhet. Her kan du også gi fullmakt og be om fullmakt.

## Tjeneste

En tjeneste er en digital løsning som tilbyr funksjonalitet for dialog mellom en sluttbruker og en offentlig instans. 

En tjeneste kan realiseres som en App i Altinn Studio og publiseres på Altinn plattformen eller lages på andre platformer/løsninger og registreres som en ressurs i ressursregisteret.

## Tjenesteutviklingsløsning

Løsning der tjenester blir konfigurert, for eksempel Altinn Studio og Ressursregisteret.


## XACML

xacml står for eXtensible Access Control Markup Language og er formatet som benyttes for å beskrive policy. Se Policy. 