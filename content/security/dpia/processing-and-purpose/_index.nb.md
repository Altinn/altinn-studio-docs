---
title: 2. Systematisk beskrivelse av behandlingene og formålet
linktitle: 2. Behandling og formål
weight: 30
toc: true
description: 
---

## 2.1 Altinn II og Altinn 3

Som en følge av at Altinn fortsatt er på skyreisen, sameksisterer i dag Altinn II og Altinn 3 – og vil fortsette å gjøre
det i noen år fremover. Funksjonalitet, driftsmiljøer og data vil gradvis flyttes over fra «on-prem»-løsningen til den
skybaserte plattformen, så lenge rammevilkårene tillater dette.

Rammevilkår innbefatter blant annet politiske og forvaltningsmessige føringer, sourcingstrategier, forretnings- og
finansieringsmessige føringer, juridiske rammevilkår og sikkerhetsrelaterte risiko- og sårbarhetsvurderinger.

Dette betyr at i skrivende stund er mange driftsmiljøer, databaser, funksjoner og tjenester fortsatt driftet «on-prem»
av en norsk leverandør. Altinn 3 benytter seg av disse tjenestene i Altinn II, gjør oppslag der og henter data derifra
til f.eks. preutfylling av tjenesteeiernes tjenester som etableres i Altinn 3.

Beskrivelsene av behandlingene av personopplysninger som skjer i Altinn tar utgangspunkt i dagens Altinn II og 3, men
vurderingene som gjøres av personvernkonsekvenser i dette dokumentet tar inn over seg migreringen av funksjonalitet,
data og tjenester vi står overfor de kommende årene.


## 2.2 Behandlingsansvar i Altinn

Alle offentlige virksomheter (tjenesteeiere) som deltar i Altinn-samarbeidet, er hver for seg behandlingsansvarlig for
sine tjenester i Altinn. Tjenesteeierne må gjøre sine egne vurderinger, ROS-analyser og eventuelle
personvernkonsekvensutredninger knyttet til overgangen til skydrift av sine egne tjenester. Tjenesteeierne kan selvsagt
støtte seg på Digdirs vurderinger for Altinn-løsningen som helhet.

Tjenesteeierne i Altinn innestår for å ha rettslig grunnlag etter personopplysningsloven for bruken av
personopplysninger i sine tjenester.

Tjenesteeierne skal kunne godtgjøre overfor Altinn Sentralforvaltning (ASF) at de har hjemmel til å motta ønskede
folkeregisteropplysninger, før utlevering kan finne sted.

Ved testing i forbindelse med utvikling, vedlikehold og feilsøking, innestår de involverte virksomhetene hver for seg
for at bruk av testdata er i samsvar med kravene i personopplysningsloven.

Digdir er behandlingsansvarlig for personopplysninger i fellesfunksjonalitet i Altinn, enten det dreier seg om Altinn II
eller Altinn 3. Dette dreier seg om personopplysninger som benyttes til identifisering, autentisering og autorisasjon
ved innlogging i Altinn, samt personopplysninger i innboksen i Altinn. Digdir er også behandlingsansvarlig for det som
skjer av generell og samlet lagring av loggdata av brukeraktiviteter.

Digdir benytter private leverandører, og disse vil være databehandlere i de tilfellene hvor Digdir er selvstendig
behandlingsansvarlig, og underdatabehandler i de behandlinger hvor Digdir er å betrakte som databehandler for en
tjenesteeier.

Det er inngått databehandleravtaler, som en del av et større avtaleverk, med både de private leverandørene og
tjenesteeierne i Altinn-samarbeidet.

Alle involverte avtaleparter skal sørge for å ivareta krav til protokoll over behandlingsaktiviteter. Ved endringer skal
partene gjensidig informere hverandre, og oppdatere databehandleravtalene og protokollene.


## 2.3 Behandlingsaktivitetene

### 2.3.1 Hvilke personopplysninger behandles?
Siden Altinn er en offentlig felleskomponent, som kan benyttes av alle offentlige virksomheter, vil det potensielt
behandles personopplysninger om hele Norges befolkning. I tillegg kommer personopplysninger om utenlandske statsborgere
som har en kommunikasjon med norske myndigheter gjennom Altinn.

Nær sagt alle tenkelige typer personopplysninger behandles i Altinn; navn, fødselsnummer, fysiske og elektroniske
adresser og kontaktinformasjon. Konfidensiell informasjon, forretningshemmeligheter, samt særlige kategorier
personopplysninger, blir også behandlet. 

### 2.3.2 Digdir som behandlingsansvarlig
Digitaliseringsdirektoratet anser seg som behandlingsansvarlig for behandlingen av personopplysninger tilknyttet
fellesfunksjonalitet i Altinn II og 3.

Altinn lagrer kopi av flere grunndataregisteropplysninger i Altinn II. Tjenester som kjører i Altinn 3 kan hente data
fra Altinn II, ved for eksempel preutfylling av skjema og andre tjenester.

- **Folkeregisteret**  
Opplysninger fra Folkeregisteret i henhold til tillatelse fra Skattedirektoratet, folkeregisterloven og lov om
Digitaliseringsdirektoratets tilgang til taushetsbelagte folkeregisteropplysninger : Navn, identifikasjonsnummer,
statsborgerskap, sivilstand, familierelasjon, status, dødsfall, bostedsadresse, oppholdsadresse, postadresse,
postadresse i utlandet, adressebeskyttelse.

    Digdir er databehandler for tjenesteeiere som på selvstendig grunnlag kan
innhente taushetsbelagte folkeregisteropplysninger[^2], og har delegert rettighet til Digdir. 

- **Kontakt- og reservasjonsregisteret (KRR)**  
Navn, fødsels- og d-nummer, epostadresse og/eller mobilnummer.

- **Enhetsregisteret (ER)**  
Navn, fødsels- og d-nummer, adresse, roller i ER, varslingsadresse (e-postadresse og
mobilnummer).

- **Autentisering og autorisasjon**  
Altinn lagrer personopplysninger for å kunne utføre korrekt kontroll av autentisering
og autorisasjon til data. Dette er fødselsnummer/d-nummer, navn, mobilnummer, e-post, pinkoder, brukernavn, bruker-ID,
roller og rettigheter til tjenester. 

- **Loggdata**  
Altinn lagrer loggdata med personopplysninger i forbindelse med brukeraktiviteter. De overordnede stegene i
aktivitetsloggen for en gitt instans av en gitt tjeneste er tilgjengelig for bruker.  Øvrig aktivitetslogg
(transaksjonslogg) i Altinn II er ikke direkte tilgjengelig for bruker eller andre, men kan utleveres på forespørsel, og
med gyldig rettslig grunnlag. Loggen inneholder IP-adresser, intern bruker-ID, tidspunkt for innlogging, og
aktivitetshistorikk.

    Logging er under utvikling i Altinn 3 og inneholder foreløpig ikke en like omfattende
aktivitetshistorikk som i Altinn II. 

- **Innboks**  
Altinn har en innboks hvor brukeren får fremvist sine lagrede/innsendte skjema/tjenester fra de ulike
tjenesteeierne i Altinn-samarbeidet. Dette kan være elementer lagret i både Altinn I, II og 3. Selve den genererte
innboksen ligger foreløpig i Altinn II.  

- **Brukerprofil**  
Det lagres personopplysninger om brukerens “profil” i Altinn. Navn og fødselsnummer vises for brukeren
når brukeren er innlogget, samt på profilsiden. På profilsiden vises også varslingsadresser og telefonnumre til bruk ved
varsling, og disse kan endres eller slettes av brukeren.


### 2.3.3 Digdir som databehandler
Digdir utfører en rekke behandlingsaktiviteter som databehandler for tjenesteeierne i Altinn.

Altinn støtter overføring av data mellom brukere og tjenesteeiere. Dette utføres ved at data blir overført til mottakers
innboks, og ved preutfylling av opplysninger fra tjenesteeier til brukere. Alle relevante aktiviteter i løsningen logges
i en aktivitetslogg.

Tjenesteeierne er behandlingsansvarlige for personopplysninger som behandles i løsningen ved bruk av tjenesteeiers
tjenester i Altinn, herunder data som behandles under utfylling, mellomlagring, videresending, innsending og utsending
til og fra tjenesteeier, samt til preutfylling. Dette inkluderer alle funksjoner i løsningen tilknyttet en sluttbrukers
bruk av tjenester i løsningen, og ved bruk av Altinns innebyggede funksjonalitet for tjenesteeiere.

Tjenesteeierne er videre behandlingsansvarlige for personopplysninger som behandles i tjenesteeiers egne systemer ved
forespørsler på informasjon fra Altinn, uavhengig av hvilket teknisk grensesnitt og funksjonalitet som benyttes i
løsningen. Dette kan eksempelvis være utveksling av autorisasjonsinformasjon.

Det er mulig for tjenesteeierne å angi periodisk sletting av skjemadata i tjenesteeiers arkiv i Altinn. Tjenesteeiers
arkiv videreføres ikke i Altinn 3.


## 2.4 Behandlingsgrunnlag for behandlingene

Hjemmel for behandling av personopplysninger i fellesfunksjonalitet i Altinn-løsningen er forvaltningsloven § 15a, jf.
eForvaltningsforskriften, jf. personvernforordningen artikkel 6 nr. 1 e).

Tjenesteeierne som benytter Altinn som sin databehandler, må ha rettslig grunnlag for behandlingen av personopplysninger
knyttet til den enkelte tjeneste.

For enkelte tjenester vil behandlingsgrunnlaget for personopplysninger tilknyttet tjenesten være samtykke, jf.
personvernforordningens artikkel 6 nr. 1 a), samt artiklene 7, 8 og 9. 


## 2.5 Formålet med behandlingene

Staten har flere målsettinger med Altinn. Altinn skal blant annet bidra til å realisere samfunnsmålet "økt
kostnadseffektivitet i samfunnet", herunder bidra til:

- Mer kostnadseffektiv offentlig sektor gjennom bruk av eForvaltning.
- Forenklinger i næringslivet gjennom effektiv samhandling med offentlig sektor.

Samfunnsmålet vil bidra til oppnåelse av de politiske målene:

- Norge skal være ledende i verden på å tilby elektroniske tjenester fra offentlig sektor, både mot næringsliv og
  innbyggere.
- Ved å ta elektroniske løsninger i bruk skal offentlig sektor effektiviseres slik at ressurser kan frigjøres til å
  styrke velferdstilbudet.
- Ved å ta elektroniske løsninger i bruk skal næringslivet få redusert sine administrative byrder knyttet til
  gjennomføring av offentlig regelverk. 
- Offentlig sektor skal unngå parallelle investeringer knyttet til produksjon og tilgjengeliggjøring av elektroniske
  tjenester.

I tillegg har regjeringen etablert prinsippet om "digitalt førstevalg" i forvaltningsloven § 15 a. Digitalt førstevalg
er et prinsipp som innebærer at forvaltningen så langt som mulig er tilgjengelig på nett, og at nettbaserte tjenester er
hovedregelen for forvaltningens kommunikasjon med brukerne. Dette skal gi bedre tjenester til brukerne, enklere
søknadsprosesser og raskere svar.

Formålet med behandlingen av personopplysningene i fellesfunksjonalitet i Altinn-løsningen er å muliggjøre realiseringen
av disse målsettingene for Altinn og om digitalt førstevalg. Nærmere bestemt ved å bidra til tilrettelegging for
forenklet, effektivisert og sikker samhandling mellom brukerne og offentlige virksomheter – ved å understøtte
identifisering, autentisering og autorisasjon av partene i den elektroniske dialogen.

For tjenesteeierne i Altinn vil formålet med behandlingen i den enkelte tjenesten, ha mange likhetstrekk med formålet
for Altinns behandling av personopplysninger i fellesfunksjonalitet. I tillegg kommer oppfyllelsen av den enkelte
tjenesteeiers spesifikke samfunnsoppdrag, som nedfelt blant annet i tildelingsbrevene, gjennom lovverk eller andre
føringer fra Stortinget eller Regjeringen.


[^2]: https://lovdata.no/dokument/NL/lov/2023-06-09-29
