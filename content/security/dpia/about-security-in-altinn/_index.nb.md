---
title: 5. Om sikkerheten i Altinn
linktitle: 5. Om sikkerheten i Altinn
weight: 50
toc: true
description: 
---

## 5.1	Om informasjonssikkerhet i Altinn
Digdir er forpliktet til å ivareta ansvaret for informasjonssikkerhet i henhold til personopplysningslovens § 1, jf.
personvernforordningen artikkel 32. Informasjonssikkerhet omfatter:

- Sikring av konfidensialitet; beskyttelse mot at uvedkommende får innsyn i opplysningene.
- Sikring av integritet; beskyttelse mot utilsiktet endring av opplysningene.
- Sikring av tilgjengelighet; sørge for at tilstrekkelige og relevante opplysninger er til stede.

Digdir plikter for øvrig å etterkomme krav til behandlingsaktivitetene som ellers følger av relevante lover og
forskrifter. Databehandlingen vil i tillegg utføres i henhold til gjeldende systemdokumentasjon og øvrige
rutinebeskrivelser for Altinn. Dokumentasjon på dette er på forespørsel tilgjengelig for blant annet Datatilsynet og
Personvernnemnda.

ASF har forpliktet seg til aktivt å opprettholde en forståelse for relevante trusler og risiko, og å vedlikeholde
tilstrekkelige sikkerhetstiltak ut fra et besluttet risikonivå. Overordnet oversikt over tiltak oppdateres i protokoll
over behandlingsaktiviteter for Altinn.

Videre skal den enkelte tjenesteeier administrere de tilganger som deres egne ansatte/konsulenter har til informasjon i
dokumentasjon om Altinn-løsningene og i servicedialogen mellom tjenesteeierne og ASF. Tilgangen skal være styrt i
henhold til tjenstlig behov.

I avtalene med flere av våre underleverandører for Altinn II er det kravsatt at de etterlever egne prosesser og rutiner
fra eget ISMS. Når det gjelder Altinn 3 etterlever Microsoft Azure en rekke nasjonale og internasjonale standarder og
blir revidert av tredjeparter.

Det er innført regler for å støtte sikker utviklingsprosess, og vi har også innført automatiske verktøy for ytterligere
støtte til å oppnå sikker kode med god kvalitet. Det utføres personvernmessige og sikkerhetsmessige vurderinger for alle
nye behovsforespørsler. Alle rettinger (bugfix) og endringer (change) blir kontrollert for sikkerhetssvakheter både
logisk (funksjon) og teknisk (kode). Rettinger og endringer som kan ha en sikkerhetsmessig risiko blir sikkerhetstestet
etter anbefalte teknikker før deployering til produksjon. Vi engasjerer innleid tredjepart med jevne mellomrom for
sikkerhetstesting av store endringer og gjennomgang av eksisterende funksjonalitet.

Det utføres risikovurderinger tilknyttet ny funksjonalitet i løsningen, og ved innføring av nye verktøy og systemer for
bruk i utvikling eller forvaltning av løsningen. Det er kravsatt at levererandørene for systemdrift og applikasjonsdrift
av Altinn II også utfører regelmessige ROS-analyser, samt ved endringer relatert til løsningen. For Altinn 3 utfører
Digdir selv ROS-analyser, og benytter seg av innleide sikkerhetskonsulenter ved behov. Innleide utviklings- og
forvaltningsressurser bidrar også.

Det gjennomføres regelmessige sikkerhetsrevisjoner av Altinn-løsningen, både Altinn II og 3. Tjenesteeierne i Altinn kan
be om å bli forelagt sikkerhetsrevisjoner som viser hvordan Altinn håndterer tjenesteeiers data, og har også muligheten
til å be om ytterligere sikkerhetsrevisjoner. Sikkerhetsrelatert informasjon kan være underlagt særlige begrensninger
når det gjelder innsyn og spredning, som tjenesteeier må forholde seg til, herunder at informasjonen kan være gradert
iht. sikkerhetsloven. 

### 5.1.1 Risikovurdering
Som det fremgår ovenfor, er Altinn underlagt strenge krav til sikkerheten. ROS-analyser gjøres og oppdateres løpende.
Risikoreduserende tiltak implementeres for å ta ned risikoer.

Også for skydrift av Altinn er det gjennomført analyser av risikoer og sårbarheter, med tilhørende risikoreduserende
tiltak. I det følgende vil vi redegjøre for risikoer med fokus på sluttbrukerens personvern. 

#### 5.1.1.1 Integritet og konfidensialitet
Trusler mot integriteten og konfidensialiteten av sluttbrukerens personopplysninger eksisterer allerede i Altinn II, som
driftes og forvaltes “on-prem” ved hjelp av private leverandører. Ved skydrift av Altinn av en internasjonal
skyleverandør, har vi vurdert det slik at risikobildet ikke endres.

Det er en viss risiko for at skyleverandøren, eller dennes underleverandører, har urettmessige tilganger til data i
løsningen, som kan bli utnyttet av en høykapasitet trusselagent.

Det er også er betydelige fordeler for integriteten og konfidensialiteten ved bruk av en velrennomert
skytjenesteleverandør som Microsoft, da en slik leverandør har betydelige kapabiliteter når det gjelder å jobbe med
informasjonssikkerhet enn mindre, lokale, leverandører med betydelig færre ressurser og midler. 

#### 5.1.1.2 Tilgjengelighet
Når det gjelder tilgjengeligheten av dataene, har Microsoft Azure høyt tjenestenivå og oppetid. Imidlertid inneholder
standardvilkårene bestemmelser om at leverandøren på svært kort tid kan legge ned sine tjenester eller avslutte avtalen.

Denne risikoen vil medføre at det i utgangspunktet, teoretisk og avtalemessig, er en mulighet for endring knyttet til
tilgjengeligheten av sluttbrukerens personopplysninger, selv om tjenestenivået til daglig vil kunne være bedre enn
allerede etablerte nasjonale driftsløsninger.

Vi vurderer det imidlertid også slik at en stor internasjonal skytjenesteleverandør er avhengig av tillit, og
tilgjengelighet på sine løsninger – og kundens data. Og at leverandøren vil strekke seg langt for å sikre svært god
tilgjengelighet. 

#### 5.1.1.3 Rett til informasjon og innsyn (åpenhet)
Det er Digdir ved ASF som vil håndtere den registrertes rett til informasjon og innsyn i data som vi er
behandlingsansvarlige for.

Tjenesteeierne vil håndtere den registrertes rett til informasjon og innsyn i data i sine tjenester, som tjenesteeierne
er behandlingsansvarlige for. Skyleverandørenes standardvilkår har generelt bestemmelser om at leverandøren vil
understøtte slike forespørsler fra kunden. Vi kan derfor ikke se at risiko for brudd på den registrertes rett til
informasjon og innsyn vil øke med skydrift av Altinn.  

#### 5.1.1.4 Korrigering, endring, begrensning og sletting
Som tilfellet for informasjon og innsyn, er det fortsatt Digdir ved ASF som vil håndtere den registrertes rettigheter
knyttet til dette. Og i de fleste tilfeller vil Altinn måtte henvise sluttbrukeren til den offentlige virksomhet som er
datakilden for grunndatainformasjon som Altinn benytter, eller tjenesteeier for den enkelte tjenesten i Altinn.

Vi kan i utgangspunktet ikke se større risiko for brudd på den registrertes rett til å få korrigert, endret eller
begrenset behandlingen av sine personopplysninger. 

#### 5.1.1.5 Kobling av datasett
Når det gjelder urettmessig kobling av datasett, vil i utgangspunktet ikke risikoen for dette øke – da det fortsatt er
ASF og tjenesteeierne som vil kontrollere dette. 

#### 5.1.1.6 Særlige forhold ved skytjenester
Inngåelse av kontrakt med en internasjonal skydriftsleverandør betyr et stort utenlandsk selskap som kontraktsmotpart.
Dette har konsekvenser for avtalen som inngås, som i stor grad består av standardvilkår.

Dette er relevant fordi det ofte er et annet lands rett og tolkningsprinsipper som må legges til grunn i
avtaleforholdet. Digdir sin avtale med Microsoft er underlagt irsk rett. Dette innfører tolkningsrisiko, prosessrisiko
og praktiske begrensinger i vår evne og vilje til å forfølge avtalebrudd rettslig. 

### 5.1.2 Risikoreduserende tiltak
Digdir har innført økte og delvis nye risikoreduserende tiltak. Innføringen av slike tiltak, og den kontinuerlige
oppfølgingen og kontrollen av dem, vil være underlagt etatens rutiner og prosesser, herunder vårt internkontrollregime.

Risikoene og de risikoreduserende tiltakene er mer utførlig beskrevet i egne ROS-analyser og sikkerhetsdokumentasjon for
Altinn 3, med mulige tiltakspunkter. 

## 5.2 Fordeler for den registrertes personvern
Skydrift av Altinn vil også medføre positive konsekvenser for den registrertes personvern. Mer effektive digitale
løsninger gjør at man kan forbedre dataminimering, samt enda enklere få oppdaterte og riktige opplysninger fra
datakildene. Løsninger for tilgangsstyring, autorisasjon og samtykke for delingen av data kan også forbedres og få
større gjenbruk i offentlig sektor, også i samspill med privat sektor.

Bruk av kraftig prosesseringskraft og skalerbarhet i skyen, koblet med lavere kostnader forbundet med å utnytte en slik
fleksibilitet, muliggjør også personvernvennlige tiltak i den digitale tjenesten som etableres.

Det vil også bli langt raskere, enklere og mindre kostnadskrevende å konfigurere opp og ned miljøer etter behov, som
gjør at man til enhver tid bare har det nødvendige antall tekniske miljø som inneholder data.

Det er også slik at Microsoft, som de andre store skytjenesteleverandørene, benytter teknologi og standard programvare
som generelt sett vil være enklere mht å oppdatere programvare med patching av sårbarheter enn en mer proprietær
utviklet løsning.

Microsoft lever også av å selge tillitstjenester, og er derfor svært opptatt av sikkerheten i sine løsninger og kundenes
data – selv om de tar juridiske forbehold for å kunne operere globalt med akseptabel juridisk risiko. De vil generelt ha
større kompetanse og kapasitet til å videreforedle sine løsninger og tjenester for å imøtekomme et trusselbilde som er i
stadig endring, enn f.eks. lokale driftsleverandører som utelukkende opererer i Norge.

Microsoft Azure er også sertifisert i henhold til svært mange nasjonale og internasjonale standarder, herunder i henhold
til adekvansbeslutningen, og revideres jevnlig av tredjeparter – hvor det også blir tilgjengeliggjort rapporter for
kundene. 
