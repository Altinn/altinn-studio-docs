---
title: Ordliste Altinn autorisasjon
linktitle: Ordliste
description: Her finner du ordliste for Altinn autorisasjon
tags: [architecture, terms]
toc: false
weight: 1
---

Denne ordlisten forklarer hvordan sentrale begreper innen Altinn Autorisasjon skal brukes. I brukerrettet tekst skal vi beskrive personen, virksomheten eller handlingen så konkret som mulig. Tekniske begreper kan brukes når teksten beskriver API-er, domenemodeller eller etablerte systemnavn, men bør forklares første gang de brukes.

## Slik velger du riktig begrep

| Når vi mener … | Bruk | Unngå i brukerrettet tekst | Unntak |
| --- | --- | --- | --- |
| En organisasjon generelt | **virksomhet** | aktør, bedrift, selskap, hovedenhet | Bruk den offisielle betegnelsen når virksomhetsformen er relevant. |
| En person eller virksomhet i en teknisk modell | **part** | – | Brukes hovedsakelig i API- og domenedokumentasjon. |
| En intern fellesbetegnelse for personer og virksomheter | **aktør** | aktør i brukerrettede instrukser | Kan brukes i kode, API-navn og forklaringer av eldre løsninger. |
| At noen handler for en annen | **gjøre eller handle på vegne av** | representere | *Representasjon* kan beholdes som teknisk domenebegrep når det forklares. |
| Myndigheten til å handle på vegne av noen | **fullmakt** | tilgang, rettighet, tillatelse | Begrepet må brukes i samsvar med den juridiske og faglige betydningen. |
| Den tekniske muligheten til å bruke en funksjon eller ressurs | **tilgang** | fullmakt | For eksempel: «Systemet har tilgang til API-et.» |
| En bestemt tillatt handling på en ressurs | **rettighet** | fullmakt, tilgang | For eksempel retten til å lese en melding. |
| Å gi noen en fullmakt | **gi fullmakt** | delegere | *Delegere* kan beholdes i tekniske navn og API-operasjoner. |
| Enheter registrert som hoved- eller underenhet | **hovedenhet** og **underenhet** | – | Brukes bare når Enhetsregisterets struktur er relevant. |

## Administratortilgang

Tilgangspakkene som gir fullmakt til å administrere fullmakter, men de gir ikke tilgang til tjenester.

Fire tilgangspakker er administratorfullmakter:

- Tilgangsstyring
- Hovedadministrator
- Klientadministrasjon for regnskapsfører og revisor
- Kundeadministrator

Disse er skilt ut i en egen tab i GUI i dag. Det går an å skjule dem i ressursregisteret.

## Aktør

En teknisk eller intern fellesbetegnelse for en person eller virksomhet.

Bruk som hovedregel ikke *aktør* i tekst rettet mot sluttbrukere. Skriv heller hvem teksten gjelder, for eksempel *personen*, *virksomheten* eller *den du handler på vegne av*.

Begrepet kan beholdes i API-navn, tekniske modeller og omtale av eksisterende funksjoner. Forklar begrepet første gang det brukes.

## Autorisasjon

Reglene og kontrollene som avgjør om en person, virksomhet eller et system får utføre en handling på en ressurs.

Brukes hovedsakelig i teknisk dokumentasjon.

## Avgiver

Et historisk begrep fra Altinn 2 for personen eller virksomheten noen handler på vegne av.

Bruk ikke *avgiver* i ny brukerrettet dokumentasjon. Begrepet kan brukes når Altinn 2, avgiverlisten eller eksisterende tekniske navn omtales.

## Delegere/delegering

Den tekniske handlingen der en fullmakt eller rettighet gis videre til noen andre.

Skriv normalt *gi fullmakt* i brukerrettet tekst. Behold *delegere* og *delegering* når teksten beskriver en API-operasjon, systemfunksjon eller et etablert teknisk navn.

## Enkelttjeneste

En tjeneste/ressurs som Altinn autorisasjon kan styre tilgang til. Se tjeneste.

## Fagsystem/Sluttbrukersystem

Et system som løser noe for bruker/sluttbruker, for eksempel regnskapssystem eller HR-system.

Fagsystem brukes eksternt i Altinn GUI med målgruppe Altinn-brukere.

Sluttbrukersystem brukes der målgruppen er tjenesteeiere og systemleverandører.

## Fullmakt

Myndigheten en person, virksomhet eller et system har til å handle på vegne av en annen person eller virksomhet.

En fullmakt kan omfatte én eller flere rettigheter. Bruk *fullmakt* når teksten handler om hva noen får myndighet til å gjøre, ikke om den tekniske gjennomføringen.

## Fullmakt til en enkelttjeneste

Erstatter enkeltrettighetsdelegering.

## Gjøre eller handle på vegne av

Brukes når en person, virksomhet eller et system utfører en oppgave for en annen person eller virksomhet.

Foretrekk denne formuleringen fremfor *representere* i brukerrettet tekst.

Eksempel: «Velg virksomheten du skal handle på vegne av.»

## Hovedenhet og underenhet

Offisielle begreper som beskriver enhetsstrukturen i Enhetsregisteret.

Bruk begrepene når registerstrukturen har betydning for det som forklares. Bruk ellers *virksomhet*.

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

## Part

Et teknisk domenebegrep for personen eller virksomheten som en ressurs, dialog eller forespørsel gjelder.

Bruk *part* i API- og domenedokumentasjon når den tekniske modellen krever det. Forklar begrepet første gang det brukes. I brukerrettet tekst bør man vanligvis skrive *person* eller *virksomhet*.

## Policy



En policy er en samling av en eller flere regler. Hver tjeneste eller ressurs i Altinn har en policy med minst én regel.

I Altinn benyttes XACML formatet for å beskrive en policy.

## Regel

En regel definerer hvem som har rettighet til å utføre noe. Tjenesteeiere definerer regler på ressurser og tjenester i Altinn Studio.

F.eks

- **Daglig leder** har lov til å **signere** på tjenesten **MVA-rapport**
- Bruker med tilgangspakken **HR** har lov til å **lese** meldinger av typen **sykemelding**

## Rettighet

En bestemt handling noen har lov til å utføre på en ressurs.

En rettighet beskrives vanligvis som en kombinasjon av handling og ressurs, for eksempel retten til å lese en melding eller signere et skjema.

En fullmakt kan inneholde flere rettigheter. Se også regel.

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

Den tekniske muligheten til å bruke en funksjon, tjeneste eller ressurs.

Tilgang er den tekniske gjennomføringen av en fullmakt eller rettighet. Bruk ikke *tilgang* når teksten egentlig handler om myndigheten noen har fått til å handle på vegne av andre.

## Tilgangspakke

En definert samling rettigheter innenfor et område.

En tilgangspakke kan inngå i en fullmakt. Selve pakken er ikke nødvendigvis det samme som fullmakten som gis til en person, virksomhet eller et system.

## Tilgangsstyrer

Den i virksomheten som kan gi fullmakt. Bruker foreløpig ikke begrepet i GUI. Vær obs på bruken så det ikke forveksles med tilgangspakken Tilgangsstyring.

## Tilgangsstyring

Den delen av Altinn som gir oversikt over brukere og fullmakter hos en virksomhet. Her kan du også gi fullmakt og be om fullmakt.

## Tjeneste

En tjeneste er en digital løsning som tilbyr funksjonalitet for dialog mellom en sluttbruker og en offentlig instans.

En tjeneste kan realiseres som en App i Altinn Studio og publiseres på Altinn plattformen eller lages på andre platformer/løsninger og registreres som en ressurs i ressursregisteret.

## Tjenesteutviklingsløsning

Løsning der tjenester blir konfigurert, for eksempel Altinn Studio og Ressursregisteret.

## Virksomhet

Standardbegrepet for en organisasjon i brukerrettet tekst.

Bruk *virksomhet* når den konkrete organisasjonsformen eller registerstrukturen ikke er relevant.

## XACML

xacml står for eXtensible Access Control Markup Language og er formatet som benyttes for å beskrive policy. Se Policy.
