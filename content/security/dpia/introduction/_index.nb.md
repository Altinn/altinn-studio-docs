---
title: 1. Innledning
weight: 20
toc: true
description: 
---

## 1.1 Om vurdering av personvernkonsekvenser

Slik Digdir tolker dokumenter fra Det europeiske Personvernrådet (EDPB), synes det ofte å være nødvendig med en
vurdering av personvernkonsekvenser (DPIA) ved overgang til sky på grunn av «*…the possible sensitive nature and large
amounts of data processed by public bodies…*»[^1]. Digdir har derfor valgt å gjennomføre en DPIA på grunn av skiftet fra en
lokal driftsleverandør i Norge, til en internasjonal skydriftsleverandør.

Fokuset for denne DPIA’en er vurderinger av personvernkonsekvenser knyttet til overgang til skytjenesteleverandør av
drift av Altinn 3 og handler i hovedsak om hva som *endrer seg* av behandlinger, risiko- og sårbarhetsvurderinger,
nødvendige tiltak mv. ved å sette ut driften av Altinn til en internasjonal skydriftsleverandør.

Arbeidet med DPIA er en kontinuerlig prosess. Det vil være behov for kontinuerlige oppdateringer og endringer av DPIA’en
for Altinn, eksempelvis på bakgrunn av regelverksendringer, nye produkter som utvikles mv. Bakgrunnen for denne siste
oppdateringen av DPIA’en er adekvansbeslutningen datert 10. juli 2023 som gjelder for overføring av personopplysninger
mellom EU/EØS og USA.

Plikten til å sørge for vurderinger av personvernkonsekvenser ligger for øvrig hos den behandlingsansvarlige, herunder
den leder som har det daglige ansvaret for den aktuelle behandlingen. Selve oppgaven kan delegeres til andre.

## 1.2 Om Altinn

Altinn er en viktig offentlig fellesløsning som alle statlige etater, kommuner, fylkeskommuner og andre offentlige
virksomheter kan benytte til å utvikle digitale tjenester til sine brukere. Altinn ivaretar også behov for digital
dialog mellom offentlige virksomheter, innbyggere, næringslivet og frivillig sektor.

Altinn videreutvikles, driftes og forvaltes av Altinn-samarbeidet, som består av en rekke offentlige etater. Digdir ble
etablert 1. januar 2020, etter en sammenslåing av Altinn og Difi. Digdir er ansvarlig for forvaltningen av Altinn og
avgjør hvordan den tekniske løsningen skal videreutvikles.

Altinn ble startet som et samarbeid mellom Skatteetaten, Statistisk sentralbyrå og Brønnøysundregistrene i 2002, og
skulle være en ALTernativ INNrapporteringskanal for økonomiske data. Altinn ble offisielt åpnet av tidligere
finansminister Per-Kristian Foss og nærings- og handelsminister Ansgar Gabrielsen 4. desember 2003.

Siden portalen www.altinn.no ble lansert har den vært i stadig vekst. Samarbeidet har blitt utvidet betydelig og består
per desember 2023 av 71 ulike tjenesteeiere.

I dag er Altinn en veletablert og omfattende plattform, og er i sterk vekst når det gjelder datavolumer, tilknyttede
offentlige virksomheter og antallet elektroniske sluttbrukertjenester.

Altinn-løsningen blir også stadig videreutviklet med forbedringer av eksisterende funksjonalitet og ny funksjonalitet.

Altinn inneholder også svært mye nyttig informasjon for gründere og små/mellomstore bedrifter under "Starte og drive
bedrift" på altinn.no. Her finnes også oversikt over alle statlige støtteordninger til næringslivet.

Over 4 millioner privatpersoner har en innboks (inkludert «arkiv») i Altinn gjennom fødselsnummeret sitt, og over 1
million virksomheter er registrert som brukere gjennom et organisasjonsnummer. Fra oppstarten i 2003 og fram til
november 2023 er det sendt inn over 223 millioner elektroniske skjemaer gjennom Altinn, mens 559 millioner meldinger er
sendt til brukernes innboks. Dette har ført til innsparinger i milliardklassen for både det offentlige og næringslivet.
Og bruken av tjenestene i Altinn øker stadig.

Altinn er som skjermingsverdig objekt underlagt sikkerhetsloven, og dermed strenge vilkår for sikkerheten i løsningen. I
tillegg er Altinn underlagt personopplysningsloven og flere andre regelverk som gir føringer for blant annet sikkerhet
og behandling av personopplysninger.

Altinn har siden etableringen for 20 år siden, i større eller mindre grad benyttet private leverandører til drift,
applikasjonsdrift, forvaltning og videreutvikling. Dersom leverandøren behandler personopplysninger som en del av sitt
avtaleforhold, er det også inngått databehandleravtale med leverandøren. Gjennom avdelingen for Brukeropplevelse og
Datadeling (BOD) følger direktoratet opp og kontrollerer leverandørene. Gjennom alt fra den daglige driftsdialogen til
avtalefestede kontroll- og revisjonsmuligheter.

## 1.3 Altinns skyreise

Altinn er på en reise fra dagens «on-prem» drifts- og applikasjonsdrift av Altinn II, til en skybasert løsning for
Altinn 3. Digdir har avtale om bruk av Microsofts offentlige skyløsning Azure. Behandlingsansvaret, formålene eller
hjemmelsgrunnlagene for behandlingene endrer seg i prinsippet ikke ved skydrift av Altinn. Digdir har valgt driftssenter
i Norge så langt dette lar seg gjøre, og for øvrig er resterende plassert i EU.

Altinn er en stor IT-løsning med mange avhengigheter både innad i løsningen og til eksterne interessenter. Det er derfor
viktig at en overgang til sky kan gjøres i flere trinn og uten forstyrrelser og avbrudd av eksisterende
sluttbrukertjenester.

For at Altinn skal etterleve langsiktige mål og strategier må løsningen først og fremst kunne tilby en ny
tjenesteutviklingsløsning og kunne samspille med andre løsninger og plattformer i offentlig og privat sektor. I tillegg
må løsningen kunne forvaltes og videreutvikles raskere og mer effektivt enn dagens «on-prem»-løsning.

Den første leveransen inkluderte en ny tjenesteutviklingsløsning som består av utviklingsverktøy (Altinn Studio),
kjøretidsmiljøer (Altinn Apps) og en ny plattform med gjenbrukbare micro-services (Altinn Platform). Den nye
tjenesteutviklingsløsningen benytter seg av mulighetene og egenskapene som finnes i en ren skybasert infrastruktur.

![Konsept](/nb/community/about/concept3.svg "Altinn 3 konsept")

Altinn skal understøtte tverrsektoriell samhandling, som også er knyttet til denne nye tjenesteutviklingsløsningen, og
innfører behov for en rekke andre og nye samhandlingsfunksjoner. En skybasert løsning sikrer Altinns muligheter for å
støtte fremtidige behov for digitalisering i Norge.

Første versjon av Altinn 3 ble produksjonsatt i juni 2020. Videre er
målet at funksjonalitet skal videreutvikles, og tjenestene som kjører på Altinn II skal reetableres på Altinn 3 senest
innen juni 2026. Det er behov for en hybrid modell i denne transisjonsperioden, med både en «on-prem»-løsning og
løsninger i offentlig sky.

Gevinster og mulighetsrom knyttet til overgang til sky er:

- **Redusert nedetid og mer selvbetjening**  
Mer effektiv bruk av ressurser. Ikke minst på grunn av høyere utvikler-produktivitet, mindre overleveringer og overhead
(mulighet for selvbetjening). Raskere realisering av verdi fra investeringer (kortere tid fra investering gjøres til
verdien av investeringen realiseres). Redusert tid fra behov/idé oppstår, til løsning er eksponert for brukere.

- **Betal for det man bruker**  
Mer effektiv ressursutnyttelse og mulighet for dynamisk skalering, kombinert med at man
kun betaler for de ressursene man faktisk bruker, fører til økt kostnadseffektivitet.

- **Økt effektivitet i drift og leveranseevne**  
Ved å benytte bedre verktøy og øke graden av automatisering, vil
ressurser brukt på drift reduseres. 

- **Økte muligheter for innovasjon** - både intern og ekstern innovasjon. Sky gir tilgang til ny og oppdatert teknologi.

- **Tilgang til ny teknologi**


[^1]: [edpb_20230118_cef_cloud-basedservices_publicsector_en.pdf](https://www.edpb.europa.eu/system/files/2023-01/edpb_20230118_cef_cloud-basedservices_publicsector_en.pdf) (europa.eu) Se spesielt s. 2 og 10.