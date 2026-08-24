---
title: Ordliste Altinn autorisasjon
linktitle: Ordliste
description: Her finner du ordliste for Altinn autorisasjon
tags: [architecture, terms]
toc: false
weight: 1
---

Denne ordlisten forklarer hvordan sentrale begreper innen Altinn Autorisasjon skal brukes. I brukerrettet tekst skal vi beskrive personen, virksomheten eller handlingen så konkret som mulig. Tekniske begreper kan brukes når teksten beskriver API-er, domenemodeller eller etablerte systemnavn, men bør forklares første gang de brukes. Når vi omtaler eksisterende funksjoner eller elementer i brukergrensesnittet, bruker vi navnet som vises i løsningen.

Se også [Designsystemets retningslinjer for språk om representasjon](https://designsystemet.no/no/patterns/representation).

## Slik velger du riktig begrep

| Når vi mener … | Bruk | Unngå i brukerrettet tekst | Unntak |
| --- | --- | --- | --- |
| En organisasjon generelt | **virksomhet** | aktør, bedrift, selskap, hovedenhet | Bruk den offisielle betegnelsen når virksomhetsformen er relevant. |
| En person eller virksomhet i en teknisk modell | **part** | – | Brukes hovedsakelig i API- og domenedokumentasjon. |
| Personen eller virksomheten noen handler på vegne av | **personen** eller **virksomheten** | aktør, avgiver | *Aktør* og *aktørvalg* kan beholdes i etablerte produktnavn, kode og API-navn. |
| At noen handler for en annen | **gjøre eller handle på vegne av** | representere | *Representasjon* kan beholdes som teknisk domenebegrep når det forklares. |
| Myndigheten til å handle på vegne av noen | **fullmakt** | tilgang, rettighet, tillatelse | Begrepet må brukes i samsvar med den juridiske og faglige betydningen. |
| Den tekniske muligheten til å bruke en funksjon eller ressurs | **tilgang** | fullmakt | Kan brukes i sammensatte ord, for eksempel *lesetilgang*. |
| En bestemt tillatt handling på en ressurs | **rettighet** | rettighet som synonym for fullmakt | Brukes hovedsakelig i teknisk dokumentasjon. |
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

## Aktør og aktørvalg

Et etablert Altinn-begrep for en person eller virksomhet noen handler på vegne av. *Aktørvalg* er funksjonen for å velge denne personen eller virksomheten.

I ny brukerrettet tekst bør vi skrive hvem teksten gjelder, for eksempel *personen*, *virksomheten* eller *den du handler på vegne av*.

Begrepene kan beholdes når vi omtaler et eksisterende element i brukergrensesnittet, eller når de inngår i kode, API-navn eller tekniske modeller. Forklar begrepet første gang det brukes i teknisk dokumentasjon.

## Autorisasjon

Reglene og kontrollene som avgjør om en person, virksomhet eller et system får utføre en handling på en ressurs.

Brukes hovedsakelig i teknisk dokumentasjon.

## Avgiver og avgiverliste

Et historisk begrep fra Altinn 2 for personen eller virksomheten noen handler på vegne av.

Bruk ikke *avgiver* eller *avgiverliste* som nye begreper. De kan bare brukes når vi beskriver eller siterer historisk terminologi fra Altinn 2. Forklar da at begrepene er erstattet.

## Delegere/delegering

En teknisk operasjon der noen gir en fullmakt eller rettighet til andre.

Skriv normalt *gi fullmakt* i brukerrettet tekst. Behold *delegere* og *delegering* når teksten beskriver en API-operasjon, systemfunksjon eller et etablert teknisk navn.

## Del og gi fullmakt

Den brukerrettede formuleringen for å dele et bestemt element og gi fullmakt til det.

Bruk denne formuleringen i stedet for *instansdelegering* i brukergrensesnitt og brukerrettet dokumentasjon.

## Enkelttjeneste

En tjeneste/ressurs som Altinn autorisasjon kan styre tilgang til. Se tjeneste.

## Fagsystem/Sluttbrukersystem

Et system som løser noe for bruker/sluttbruker, for eksempel regnskapssystem eller HR-system.

Fagsystem brukes eksternt i Altinn GUI med målgruppe Altinn-brukere.

Sluttbrukersystem brukes der målgruppen er tjenesteeiere og systemleverandører, for eksempel i Ressursregisteret og Altinn Studio.

## Fullmakt

Myndigheten en person, virksomhet eller et system har til å handle på vegne av en annen person eller virksomhet.

En fullmakt kan omfatte én eller flere rettigheter. Bruk *fullmakt* når teksten handler om hva noen får myndighet til å gjøre, ikke om den tekniske gjennomføringen.

I brukergrensesnitt bruker vi *fullmakt* som produktbegrep. Skriv *gi fullmakt* i instrukser, og bruk *Fullmakt* i relevante navigasjonselementer og knapper.

## Fullmakt til en enkelttjeneste

En fullmakt som gjelder én bestemt tjeneste. Formuleringen erstatter *enkeltrettighetsdelegering*.

## Gjøre eller handle på vegne av

Brukes når en person, virksomhet eller et system utfører en oppgave for en annen person eller virksomhet.

Foretrekk denne formuleringen fremfor *representere* i brukerrettet tekst.

Eksempel: «Velg virksomheten du skal handle på vegne av.»

## Hovedenhet og underenhet

Offisielle begreper som beskriver enhetsstrukturen i Enhetsregisteret.

Bruk begrepene når registerstrukturen har betydning for det som forklares. Bruk ellers *virksomhet*.

## Instansdelegering

Et teknisk begrep for å delegere rettigheter til ett bestemt element eller én bestemt instans.

Bruk *Del og gi fullmakt* i brukergrensesnitt og brukerrettet dokumentasjon. Behold *instansdelegering* bare når den tekniske funksjonen må beskrives.

## Klientadministrasjon

Erstatter klientdelegering.

## Leverandør av fagsystem/Sluttbrukersystemleverandør

Noen som leverer et fagsystem som blir brukt av bruker/sluttbruker, for eksempel regnskapssystem eller HR-system.

Leverandør av fagsystem brukes eksternt i Altinn GUI med målgruppe Altinn-brukere.

Sluttbrukersystemleverandør brukes der målgruppen er tjenesteeiere og systemleverandører, for eksempel i Ressursregisteret og Altinn Studio.

## Område

En samling tilgangspakker innenfor samme tema, basert på SSBs kategorisering av virksomhetsområder og enkelte tilleggskategorier i Altinn.

Områder brukes bare til å kategorisere tilgangspakker. Man kan ikke gi fullmakt til et område.

## Oppgave

De ulike stegene i en tjeneste, for eksempel utfylling og signering.

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

Bruk *rettighet* hovedsakelig i teknisk dokumentasjon. Hvis teksten egentlig handler om myndigheten noen har fått til å handle på vegne av andre, bruk *fullmakt*.

## Sluttbruker

Den som bruker en tjeneste, for eksempel den som skal fylle ut et skjema.

Brukes i Ressursregisteret, Altinn Studio, i dokumentasjon og mot tjenesteeiere.

Bruk ikke *sluttbruker* i Altinns brukergrensesnitt. Beskriv personen mer konkret ut fra sammenhengen.

## Sluttbrukerløsning

Sluttbrukerløsning har tradisjonelt vært brukt om altinn.no.

## Systemtilgang/systembruker

Med en systemtilgang kan sluttbruker gi et fagsystem fullmakt til å løse oppgaver i Altinn. For eksempel automatisk oppslag i skatteopplysninger. Maskin-til-maskin.

**Systemtilgang** brukes eksternt i Altinn GUI med målgruppe Altinn-brukere, der brukeren selv lager en systemtilgang.

**Systembruker** brukes om selve konseptet, der både tjenesteeier, systemleverandør og sluttbruker må utføre sin del for å få fullmakten til å fungere.

## Tilgang

Den tekniske muligheten til å bruke en funksjon, tjeneste eller ressurs.

Tilgang er den tekniske gjennomføringen av en fullmakt eller rettighet. Bruk ikke *tilgang* når teksten egentlig handler om myndigheten noen har fått til å handle på vegne av andre.

Begrepet kan brukes når typen teknisk tilgang er relevant, for eksempel *lesetilgang*.

## Tilgangskontroll

Kontroller som sikrer at riktig person eller system får riktig tilgang til riktig ressurs på riktig tidspunkt, basert på registrerte fullmakter, rettigheter og andre autorisasjonsdata.

Brukes hovedsakelig i teknisk dokumentasjon.

## Tilgangspakke

En definert samling rettigheter til tjenester innenfor et område. Tilgangspakken beskriver omfanget av en fullmakt som kan gjelde flere tjenester.

I brukerrettet tekst bruker vi formuleringen *gi fullmakt til en tilgangspakke*. Teknisk er tilgangspakken samlingen av rettigheter, mens fullmakten er myndigheten som gis til en person, virksomhet eller et system.

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
