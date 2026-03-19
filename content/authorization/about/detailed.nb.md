---
title: Altinn Autorisasjon - Detaljert konsept
linktitle: Detaljert konsept
description: Slik fungerer Altinn Autorisasjon - en gjennomgang av de sentrale konseptene for tilgangsstyring og tilgangskontroll.
tags: [architecture, solution]
toc: true
weight: 2
---

Altinn Autorisasjon hjelper offentlige virksomheter med å styre hvem som kan gjøre hva i digitale tjenester – enten tjenesten kjører på Altinn-plattformen eller hos virksomheten selv. Denne siden forklarer de sentrale konseptene som til sammen utgjør løsningen.

{{% notice info %}}
Tilgangskontroll via Altinn Autorisasjon er forbeholdt offentlige virksomheter. Det er foreløpig ikke åpnet for at private virksomheter kan bruke Altinn som grunnlag for tilgangskontroll i egne tjenester.
{{% /notice %}}

Det som gjør Altinn Autorisasjon til det naturlige valget for offentlige tjenester er kombinasjonen av tre ting: innebygd tilgangskontroll for tjenester, et velfungerende system for delegering som innbyggere og virksomheter allerede kjenner og bruker, og direkte integrasjon med de nasjonale registrene. Tjenesteeier slipper å bygge dette fra grunnen av – og brukerne slipper å lære noe nytt.

## Ressurser og ressursregisteret

En **ressurs** er det du ønsker å styre tilgangen til. Det kan være

- en digital tjeneste (for eksempel et skjema eller en portal)
- et API
- en meldingstjeneste
- et datasett

Alle ressurser registreres i **Ressursregisteret**. Der beskriver du ressursen og knytter den til policyer som sier hvem som får tilgang, og til hvilke handlinger.

Ressursregisteret er stedet der tjenesteeier setter opp og vedlikeholder reglene for tilgang til sine tjenester.

## Policyer og regler

En **policy** er et sett av regler som beskriver hvem som har lov til å gjøre hva med en ressurs.

En typisk regel kan se slik ut:

> **Daglig leder** i en virksomhet har lov til å **signere** skjemaet **MVA-rapport**.

Tjenesteeier knytter reglene i policyen til

- roller fra eksterne registre, som roller fra Enhetsregisteret (for eksempel daglig leder, styreleder) og vergemålsroller fra Folkeregisteret. Det finnes også spesielle kilder som register for arvinger.
- tilgangspakker definert av Altinn (grupper av relaterte tjenester)
- Altinn-roller fra Altinn 2 (fases ut og vil ikke lenger gi tilgang fra 1. januar 2027)

I tillegg kan en **tilgangsstyrer** i virksomheten delegere rettigheter til enkeltpersoner eller virksomheter. En slik delegering oppretter en egen delegeringspolicy som peker direkte til den aktuelle personen eller virksomheten – ikke til en rolle eller tilgangspakke.

Det er den ansvarlige virksomheten – det vi kaller **tjenesteeier** – som definerer reglene i policyen og er ansvarlig for at de er riktige. Altinn håndhever dem automatisk når noen prøver å bruke tjenesten.

## Integrasjon med nasjonale registre

En av de viktigste fordelene med Altinn Autorisasjon er at løsningen er direkte integrert med **Folkeregisteret** og **Enhetsregisteret**. Dette betyr at offentlige tjenester automatisk får tilgang til oppdaterte opplysninger om hvem som er hvem, og hvem som har rett til å handle på vegne av hvem – uten at tjenesteeier trenger å sette opp eller vedlikeholde egne integrasjoner mot disse registrene.

Tjenesteeier kan dermed basere tilgangsreglene sine på faktiske, autoritative opplysninger fra registrene – og Altinn sørger for at dette alltid er oppdatert.

## Roller og representasjon

Altinn henter roller fra **Enhetsregisteret** (for eksempel daglig leder, regnskapsfører, styremedlem). Disse rollene gir automatisk rettigheter til bestemte tjenester, uten at noen trenger å delegere manuelt.

En **avgiver** (også kalt aktør) er den innbyggeren eller virksomheten man opptrer på vegne av. For eksempel kan en regnskapsfører logge inn i Altinn og handle på vegne av en av sine kunder.

### Nøkkelroller

Noen roller i Enhetsregisteret gir særlig brede fullmakter og kalles **nøkkelroller**. De vanligste er:

| Kode | Rolle |
|------|-------|
| DAGL | Daglig leder |
| LEDE | Styrets leder |
| INNH | Innehaver (enkeltpersonforetak) |
| BEST | Bestyrende reder |
| BOBE | Bostyrer |
| DTPR | Deltaker med delt ansvar (når registrert på personnummer) |
| DTSO | Deltaker med solidarisk ansvar (når registrert på personnummer) |

Det spesielle med nøkkelroller er at personen automatisk arver rettighetene som virksomheten har fått. Hvis en virksomhet har fått delegert rettigheter fra mange aktører, får personen med nøkkelrolle tilgang til alle disse. For eksempel vil daglig leder i et stort regnskapsbyrå kunne ha mange tusen aktører å velge mellom når vedkommende logger inn i Altinn.

I tillegg har flere av nøkkelrollene automatisk tilgang til de fleste [tilgangspakkene](/nb/authorization/what-do-you-get/accessgroups/accessgroups/) uten at noen trenger å delegere manuelt. Andre roller, som regnskapsfører (REGN) og revisor (REVI), gir kun tilgang til et utvalg tjenester som er relevante for den rollen.

### Arv av rettigheter

Når en virksomhet registrerer en annen virksomhet i en rolle i Enhetsregisteret, arver personene med nøkkelroller i den tilknyttede virksomheten fullmaktene videre. Dette kalles **nøsting av fullmakter**.

**Eksempel:** Bergen AS registrerer Trondheim AS som daglig leder. Kari er daglig leder i Trondheim AS. Da får Kari automatisk fullmakter på vegne av Bergen AS – som om hun var daglig leder der.

Det er to viktige begrensninger:

- **Kun ett ledd:** Altinn nøster fullmakter bare ett ledd. Hvis Trondheim AS igjen har Oslo AS som daglig leder, får Oslo AS sine representanter *ikke* fullmakter på vegne av Bergen AS.
- **Rettigheter gjelder også underenheter:** Underenheter (avdelinger) har ingen egne roller i Enhetsregisteret. En bruker eller virksomhet som har fått rettigheter til hovedenheten, får automatisk de samme rettighetene til underenhetene.

For **enkeltpersonforetak** gjelder en særregel: regnskapsfører og revisor som er registrert for foretaket, får i tillegg utvalgte fullmakter på vegne av innehavers personnummer.

## Tilgangspakker

Tilgangspakker er samlinger av tilganger til relaterte tjenester. I stedet for å gi tilgang til én og én tjeneste, kan en tilgangsstyrer gi en medarbeider en hel pakke som dekker et arbeidsområde.

Pakker er organisert i fullmaktsområder basert på SSBs kategorisering av virksomhetstyper. Det finnes over **135 tilgangspakker** fordelt på **21 fullmaktsområder** for virksomheter – mot bare et titalls roller i Altinn 2. Den økte granulariteten gjør det mulig å gi ansatte og systemer mer presis tilgang etter prinsippet om minste nødvendige rettighet: man gir tilgang til det som faktisk trengs, ikke mer.

[Se oversikt over alle fullmaktsområder og tilgangspakker](/nb/authorization/what-do-you-get/accessgroups/accessgroups/).

Tjenesteeier bestemmer selv hvilke tilgangspakker som skal gi tilgang til sin tjeneste. Når flere tjenesteeiere knytter tjenestene sine til samme pakke, bygger de opp et felles bransjeområde over tid. Det betyr at en tilgangspakke kan gi tilgang til tjenester fra mange ulike tjenesteeiere.

### Altinn-roller erstattes av tilgangspakker

De gamle Altinn-rollene (for eksempel «Utfyller/innsender» og «Begrenset signeringsrettighet») brukes i dag til å gi tilgang til tjenester i Altinn. Disse rollene fases ut og erstattes av tilgangspakker. Fra **1. januar 2027** vil tilgang gitt gjennom gamle Altinn-roller ikke lenger fungere.

Når Altinn 2 slås av, vil det ikke lenger være mulig å tildele Altinn-roller – kun å slette eksisterende. Det betyr at alle tjenester må ha registrert tilgangspakker før dette tidspunktet. Uten tilgangspakker vil det ikke være mulig å gi nye ansatte eller andre tilgang til tjenesten etter at Altinn 2 er borte – selv om de som allerede har rollen fortsatt vil beholde den en periode.

Tjenesteeiere som i dag bruker Altinn-roller i policyene sine, må knytte tjenestene sine til tilgangspakker i god tid før dette.

## Delegering og fullmakt

**Delegering** betyr å gi noen andre rett til å handle på dine vegne. I Altinn kan du delegere til

- enkeltpersoner (innbyggere eller ansatte)
- andre virksomheter
- systembrukere (automatiserte systemer)

Den som administrerer tilganger i en virksomhet kalles **tilgangsstyrer**. Tilgangsstyrer kan se hvem som har fullmakt, gi nye fullmakter og trekke dem tilbake.

### Typiske scenarier for delegering

- En daglig leder delegerer tilgang til lønn- og HR-tjenester til en HR-ansvarlig, uten å måtte gi tilgang til alle andre tjenester.
- En regnskapsfører gir en av sine ansatte tilgang til å håndtere en bestemt kundes rapportering.
- En privatperson gir et familiemedlem fullmakt til å følge opp en sak hos Nav på sine vegne.
- En virksomhet delegerer tilgang til en ekstern leverandør som skal utføre en avgrenset oppgave.

### Enkeltrettigheter vs. tilgangspakker

Du kan velge mellom to måter å delegere på:

**Enkeltrettighet** gir tilgang til én bestemt tjeneste. Bruk dette når du vil gi en presis og avgrenset tilgang – for eksempel kun til én spesifikk rapporteringstjeneste. Enkeltrettigheter er mer tidkrevende å administrere hvis en medarbeider trenger tilgang til mange tjenester.

**Tilgangspakke** gir tilgang til alle tjenestene som inngår i pakken. Bruk dette når en medarbeider skal jobbe innenfor et helt ansvarsområde – for eksempel regnskap eller personale. Det er raskere å administrere, men gir bredere tilgang.

Tilgangsstyrer velger selv hva som passer best ut fra medarbeiderens behov og virksomhetens krav til tilgangskontroll.

## API-er for tilgangsstyring

Altinn Autorisasjon tilbyr API-er som gjør det mulig å integrere tilgangsstyringen direkte i virksomhetens egne systemer og fagsystemer. Det betyr at delegering og administrasjon av fullmakter ikke trenger å skje manuelt i Altinn sin brukerflate – det kan skje automatisk som en del av eksisterende arbeidsflyter.

Noen typiske bruksområder:

- Et **HR-system** som automatisk gir en nyansatt riktige fullmakter på første arbeidsdag, basert på hvilken rolle vedkommende er registrert med i systemet.
- Et **ERP-system** som styrer hvilke ansatte som har tilgang til å sende inn rapporter til offentlige etater, og som holder dette oppdatert når folk bytter stilling eller slutter.
- En **systemleverandør** som bygger inn tilgangsstyring i sin løsning slik at kundenes brukere alltid har riktige tilganger uten at noen må logge inn i Altinn og gjøre dette manuelt.

Dette gir en sømløs opplevelse for sluttbrukerne, og reduserer administrativ byrde for virksomhetene. Resultatet er mer effektiv digitalisering – der tilganger følger med organisasjonsendringer i stedet for å henge etter.

### Relevante API-er

- [Tilgangsstyrings-API – guide for sluttbrukersystemer](/nb/authorization/guides/system-vendor/access-management/) – hvordan du integrerer delegering og tilgangsadministrasjon i egne systemer
- [Access Management API – EndUser (OpenAPI)](/nb/api/accessmanagement/enduser/) – API-referanse for å lese og administrere fullmakter på vegne av innloggede brukere
- [Access Management API – ResourceOwner (OpenAPI)](/nb/api/accessmanagement/resourceowneropenapi/) – API-referanse for tjenesteeiere som administrerer tilganger på ressursnivå
- [Authorization API (OpenAPI)](/nb/api/authorization/) – API-referanse for tilgangskontroll og autorisasjonsoppslag

## Tilgangskontroll

Når en bruker eller et system prøver å utføre en handling i en tjeneste, sjekker Altinn Autorisasjon om de har lov. Dette kalles **tilgangskontroll** og skjer i sanntid.

### Altinn-plattformens produkter har innebygget tilgangskontroll

Tjenester som er bygget på Altinn-plattformen får tilgangskontroll automatisk. Det holder å definere reglene som gjelder – plattformen håndhever dem ved hvert forsøk på å bruke tjenesten. Du trenger ikke skrive egen kode for selve tilgangskontrollen. Dette gjelder for:

- **Altinn-apper** bygget i Altinn Studio
- **Altinn Melding** (Correspondence) – se [tilgangsstyring for meldinger](/nb/correspondence/explanation/access-management/)
- **Altinn Formidling** (Broker) – se [ressurs og tilgangsregler for formidlingstjenester](/nb/broker/getting-started/service-owner/)

### Egenutviklede tjenester må integrere eksplisitt

Tjenester som kjører **utenfor Altinn-plattformen** – for eksempel på tjenesteeiers egne servere eller i skyløsninger – må selv kalle Altinn Autorisasjon sine API-er for å utføre tilgangskontrollen. Det er tjenesteeiers ansvar å sikre at denne integrasjonen er på plass og fungerer korrekt.

Et typisk mønster er:

1. Brukeren logger inn via ID-porten og får et token.
2. Tjenesten kaller Altinn Autorisasjon med token, ressursidentifikator og ønsket handling.
3. Altinn svarer om brukeren har tilgang eller ikke.
4. Tjenesten tillater eller avviser handlingen basert på svaret.

Hvis dette steget mangler eller feiler, er det ingenting som hindrer uautorisert tilgang – uavhengig av hva som er definert i policyen. Tjenesteeier bærer ansvaret for at tilgangskontrollen faktisk gjennomføres. Se [guide for integrasjon mot Altinn Autorisasjon fra eksterne tjenester](/nb/authorization/guides/resource-owner/generic-access-resource/integrating-link-service/).

## Systembruker

En **systembruker** gjør det mulig for et fagsystem (for eksempel et regnskapssystem) å handle automatisk på vegne av en virksomhet – uten at en person logger inn. Dette kalles maskin-til-maskin-kommunikasjon.

Slik fungerer det i praksis:

1. Systemleverandøren registrerer systemet sitt i Altinn og angir hvilke tilgangspakker systemet trenger.
2. Virksomheten godkjenner at systemet får handle på deres vegne.
3. Systemet bruker Maskinporten-autentisering kombinert med systembrukertilgangen for å kalle tjenester.

Systembrukere er særlig nyttige for rapportering, datautveksling og automatiserte prosesser.

## Samtykke

For noen tjenester er det krav om at brukeren aktivt **samtykker** til at en tjeneste får tilgang til bestemte opplysninger. Samtykket er tidsavgrenset og kan trekkes tilbake når som helst.

Et typisk eksempel er en bank som ber om tilgang til skattedata for å vurdere en lånesøknad. Slik fungerer det i praksis:

1. Banken sender brukeren til Altinn med en samtykkeforespørsel.
2. Brukeren logger inn og godkjenner samtykket.
3. Banken henter et **signert samtykketoken** fra Altinn ved hjelp av Maskinporten-autentisering.
4. Banken bruker tokenet som bevis på samtykke når den kaller Skatteetatens API for å hente ut dataene.
5. Skatteetaten verifiserer tokenet mot Altinn og leverer dataene.

Samtykket utløper etter avtalt tid og kan trekkes tilbake av brukeren når som helst. Altinn Autorisasjon håndterer innhenting, lagring og kontroll av samtykker gjennom hele levetiden. Se [kom i gang med samtykke](/nb/authorization/getting-started/consent/) for å sette opp samtykke for din tjeneste.

## Klientadministrasjon

Regnskapsførere og revisorer som opptrer på vegne av mange kunder kan bruke **klientadministrasjon** til å styre tilganger på tvers av kunder. Dette er en spesialtilpasset funksjon for disse bransjene.

## Oversikt over sammenhengen

De ulike delene av Altinn Autorisasjon henger sammen slik:

- **Tjenesteeier** registrerer ressursen og setter opp policyer i Ressursregisteret.
- **Altinn** lagrer fullmakter og håndhever tilgangsregler ved hvert oppslag.
- **Tilgangsstyrer** i en virksomhet gir og trekker fullmakter via Altinn sin brukerflate.
- **Sluttbruker** logger inn og handler på vegne av seg selv eller virksomheten.
- **Systemleverandør** bruker API-er til å sette opp systembrukere og klientadministrasjon.

Kjernen i dette er at millioner av innbyggere og virksomheter allerede administrerer fullmakter i Altinn – til å representere hverandre, delegere til ansatte og gi fagsystemer tilgang. Integrasjonen med Folkeregisteret og Enhetsregisteret gjør at tilgangene alltid reflekterer de faktiske forholdene: hvem som er registrert som daglig leder, hvem som er verge, hvem som driver enkeltpersonforetak. Når en offentlig tjeneste bruker Altinn Autorisasjon, kobles den inn i dette eksisterende nettverket av tillit uten at verken tjenesteeier eller bruker trenger å bygge det opp fra scratch.
