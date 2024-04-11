---
title: 3. Spesielt om bruk av skytjenester
linktitle: 3. Bruk av skytjenester
weight: 30
toc: true
description: 
---


## 3.1 Nye regler for overføring av personopplysninger til USA

Dersom personopplysninger skal overføres fra EU/EØS til et tredjeland, herunder USA, må det finnes et
overføringsgrunnlag i henhold til personvernforordningen. Et mye brukt grunnlag for å overføre personopplysninger til
USA var en avtale kalt EU-US Privacy Shield. I Schrems II-dommen fra 2020 ble denne avtalen kjent ugyldig.

Imidlertid ble det 10. juli 2023 besluttet et nytt rammeverk for overføring av personopplysninger mellom EU/EØS og USA
gjennom en adekvansbeslutning fra EU-kommisjonen som hadde umiddelbar virkning.

En adekvansbeslutning er en beslutning fra EU-kommisjonen om at et område utenfor EU og EØS har regler som ivaretar
personvernet på en tilsvarende måte som land i EU og EØS. Hvis EU-kommisjonen har fattet en slik beslutning, kan man
overføre personopplysninger til området i tråd med beslutningen, og overføringen vil være sammenlignbar med overføringer
mellom land innen EU/EØS. Herunder er det viktig å presisere at øvrige krav i personvernregelverket må følges, som for
eksempel å ha behandlingsgrunnlag og databehandleravtale, om nødvendig. Det er også viktig å vurdere underleverandører,
for å se om disse er sertifisert og om de holder til i andre tredjeland enn USA, da denne adekvansbeslutningen kun
gjelder overføring til USA.

Dette nye rammeverket, EU-U.S. Data Privacy Framework, består av en selv-sertifiseringsordning. Amerikanske virksomheter
kan bli selvsertifiserte dersom de forplikter seg til å behandle personopplysninger i tråd med rammeverket, og dersom de
tilbyr gratis og uavhengige klageordninger for individer.

Konkret betyr dette at dersom man overfører personopplysninger til en sertifisert amerikansk virksomhet, trenger man
ikke andre overføringsgrunnlag enn denne adekvansbeslutningen. Det er heller ikke nødvendig å vurdere beskyttelsesnivået
i USA eller å iverksette sikkerhetstiltak. Denne konkrete tolkningen av virkningen av adekvansbeslutningen legges til
grunn av Datatilsynet[^3].

Microsoft Corporation er sertifisert[^4] etter denne ordningen, og adekvansbeslutningen er dermed et gyldig
overføringsgrunnlag for eventuell overføring av personopplysninger fra EU/EØS til USA.


## 3.2 Altinn 3
Altinn 3 kjøres som nevnt hos Microsoft Azure i norske datasentre. Digdir har satt opp policies i Azure om hvilke
lokasjoner som er tillatt for ressurser i Azure. Dette er Norge og Nord- og Vest-Europa. Vi velger kun annen lokasjon
enn Norge, herunder lokasjon Nord- og Vest-Europa, i de tilfeller Azure-ressursen som skal tas i bruk ikke er
tilgjengelig med Norge som lokasjon.

Lagring av data relatert til kjørende tjenester og sluttbrukere gjøres i Norge. Noe
data knyttet til utvikling/design-time for Altinn Studio (verktøyet som brukes av tjenesteutviklerne) lagres i Europa
(EU/EØS). I tillegg har Digdir en avtale med Microsoft om tekniske støttetjenester, herunder support. Support vil kunne
gis på flere forskjellige måter. Digdir vil som klart utgangspunkt kun benytte supporttjenester som ytes innenfor Norge
og EU/EØS. Det er Digdir selv som styrer når og om man velger å ta kontakt med supportpersonell, og hva
supportleverandør skal se og ha tilgang til.

Mer informasjon om sikkerhet og konfigurasjonen av Altinns bruk av Azure
finnes i dokumentert i [Sikkerhet i Altinn 3](../../whitepaper).


## 3.3 Bruk av databehandler og underdatabehandlere
I henhold til inngåtte avtaler er Microsoft Azure databehandler for Digdir for behandling av personopplysninger hvor
Digdir er behandlingsansvarlig. For de behandlingene hvor Digdir er å betrakte som databehandler for en tjenesteeier, er
Microsoft Azure underdatabehandler.

Microsoft Azure, i liket med de andre store internasjonale skyleverandørene, gjør omfattende bruk av underleverandører
og tredjeparter, for eksempel i form av support-sentre forskjellige steder i verden[^6]. Standardvilkårene er innrettet
slik at kunden forhåndssamtykker generelt (ved å inngå avtalen) til at leverandøren kan benytte slike underleverandører
/ underdatabehandlere.

Microsoft beskriver at deres potensielle underleverandører er kontraktsmessig forpliktet til å oppfylle strenge krav til
databeskyttelse som er likeverdige eller sterkere enn de kontraktsmessige fopliktelsene Microsoft gir til sine kunder.
Underleverandørene må blant annet oppfylle kravene etter GDPR og samtykke til og forholde seg til EUs standardvilkår. I
henhold til GDPR anser Microsoft disse leverandørene som databehandlere, og krever at de benytter passende tekniske og
organisatoriske tiltak for å beskytte personopplysninger. Microsoft krever videre at alle underleverandører blir med i
Microsofts program for sikkerhet og personvern for leverandører.

Her er det viktig å presisere som nevnt over at Altinn 3 kjøres i norske datasentre, og at Digdir har satt opp policies
i Azure om hvilke lokasjoner som er tillatt for ressurser i Azure. I tillegg at det er Digdir selv som styrer når og om
man velger å ta kontakt med supportpersonell, og hva supportleverandør skal se og ha tilgang til.


## 3.4 Etterretningsrisiko og overføring av personopplysninger
Versjon 2.0 av vår DPIA inneholdt nokså omfattende vurderinger av generell etterretningsrisiko og etterretningsrisiko
knyttet til overføring av personopplysninger til USA på grunn av amerikansk etterretningslovgivning. Etter Schrems
II-dommen var det blant annet krav til vurdering av etterretningsrisiko og derfor ble dette vurdert i daværende versjon
av DPIA’en. Fordi adekvansbeslutningen nå er et gyldig overføringsgrunnlag, er det som nevnt ikke lenger krav til å
gjennomføre vurdering av beskyttelsesnivået for personopplysninger som eventuelt overføres til USA. EU-kommisjonen har
ved adekvansbeslutningen lagt til grunn at beskyttelsesnivået for personopplysninger i USA er tilstrekkelig. Dette er
årsaken til at de omfattende vurderingene av etterretningsrisiko ikke inngår i denne siste versjonen av DPIA’en.

Digdir vil likevel generelt vise til at enhver stat trolig utfører etterretningsaktiviteter i større eller mindre
omfang. Dette gjelder trolig både stater Norge er alliert med og også andre stater. Det er ulike eksempler som
underbygger dette synet:

- Russland og Kina utøver etterretning og anses som de to fremste trusselaktørene mot Norge[^7].
- USA utøver etterretning, noe som blant annet har kommet til uttrykk i Schrems-dommene.
- Norge og andre europeiske land utøver etterretning, noe som blant annet kommer til uttrykk i avgjørelser fra EMD og
  etterretningslover.

Det kan derfor legges til grunn at alle (skytjeneste)leverandører vil være underlagt en form for etterretning. Dette kan
være både i landet hvor leverandøren sitt hovedkontor er etablert og i land leverandøren opererer i. Eksempelvis kan en
amerikansk skytjenesteleverandør som opererer i et land i EU/EØS være underlagt både amerikansk etterretningslovgivning,
samt etterretningslovgivning for det EU/EØS-landet skytjenesten opererer i.

Risikoen for ulovlig etterretning vil være en av flere risikoer som må vurderes for løsningen. Det vil alltid være en
risiko. En behandlingsansvarlig kan ikke legge til grunn at kun eksistensen av en risiko for etterretning er
uakseptabel. Størrelsen på risikoen er avgjørende. Videre må den sees i sammenheng med øvrige risikoer. Ofte vil det
dessverre være slik at løsninger og tiltak som er sikre mot noen typer risiko, har sårbarheter og svakheter som medfører
andre typer risiko.

Forutsatt at tilstrekkelig «in-transit»-kryptering er implementert, kan systemer for bulkinnsamling normalt bare
nyttiggjøre seg av metadata om internettrafikken. Digdir vurderer det ellers slik at det er relativt lav sannsynlighet
for at dataene som sendes til Microsofts datasentre i Nord- og Vest-Europa er av en slik interesse at fremmede
etterretningsmyndigheter vil knytte dem til individer.

Digdir har jobbet for å redusere risikoen for at andre lands etterretningsmyndigheter kan få tilgang gjennom ulike typer
tiltak. Disse tiltakene er bygd opp av tekniske, juridiske eller organisatoriske mekanismer, og gjerne ved en
kombinasjon av disse. Tiltak reduserer oftest sannsynlighet, men kan i noen tilfeller også påvirke konsekvensen.

Mange av de tiltakene som bidrar til å ta ned etterretningsrisiko er de samme som bidrar til å ta ned sikkerhetsrisiko.
Her kan eksempelvis tiltak som kontroll på systemer og dataflyt, pseudonymisering, sletterutiner, tilgangsstyring og
monitorering nevnes.

Vi har sørget for kryptering av data under transport, og kryptering av data ved stillstand / lagring. Digdir har også
sørget for at vi selv, eller vår leverandør, har implementert kryptering ved transport og lagring, geografisk
avgrensning til Norge og EU, herunder ved Microsofts implementering av EU Data Boundary og Customer Lockbox.

For de typer personopplysninger og de behandlinger som Digdir er behandlingsansvarlig for, jf. tidligere kapittel, anser
vi at vår valgte databehandler har gitt tilstrekkelige garantier for at de vil gjennomføre egnede tekniske og
organisatoriske tiltak som sikrer at behandlingen oppfyller kravene i GDPR og verner den registrertes rettigheter i møte
med etterretningsaktivitet.

Videre mener vi at både vi, som behandlingsansvarlig, og vår databehandler, har gjennomført egnede tekniske og
organisatoriske tiltak, som har ført til at vi har oppnådd et sikkerhetsnivå som er egnet med hensyn til de risikoene vi
har kartlagt.

Digdir understreker at en behandlingsansvarlig alltid er ansvarlig for sine egne vurderinger, og derfor må den enkelte
tjenesteeier – som behandlingsansvarlig for sine tjenester – selv gjøre vurderinger ut ifra konteksten til den konkrete
tjenesten og personopplysningene som behandles i denne.


## 3.5 Arbeidsrelaterte personopplysninger og support

### 3.5.1 Arbeidsrelaterte personopplysninger
Digdir benytter Microsoft Azure til Altinn 3 og Microsoft har forpliktet seg til en såkalt «EU Data Boundary» som skal
sørge for at europeiske kunder sine data kun skal bli lagret og prosessert innenfor EØS.

Microsoft har pr. 30. januar 2023 gått ut og bekreftet at det nå ikke er nødvendig å overføre data ut av EØS i
forbindelse med flerfaktor-autentisering (Multifactor Authentication eller MFA). Det er bare om man velger
telefonoppringning med egen hilsen, at dette vil betjenes fra USA[^9]. Dette er ikke i bruk av Digdir og våre ansatte eller
konsulenter.

Etter dette legger Digdir til grunn at autentiseringsprosessen i Azure ikke medfører overføring av personopplysninger ut
av EØS.

Tjenesteeiere som benytter Altinn 3 anbefales å sette egne restriksjoner for sine ansatte og innleide konsulenter, slik
at man unngår overføring av arbeidsrelaterte personopplysninger til tredjeland.

### 3.5.2	Support
Digdir har inngått avtale om Microsoft Unified Support. Support vil kunne gis på flere forskjellige måter. Digdir vil
som utgangspunkt benytte supporttjenester som ytes innenfor Norge og EU/EØS. Det er Digdir selv som styrer når og om man
velger å ta kontakt med supportpersonell, og hva supportleverandør skal se og ha tilgang til.

Microsofts standard databehandleravtale «Tillegg om databeskyttelse for produkter og tjenester fra Microsoft» definerer
«tekniske støttetjenester» som «faglige tjenester» som «hjelper kunden med å identifisere og løse problemer som påvirker
produkter».

De aller fleste tilfeller av support vil kunne løse problemene uten å faktisk ha reell tilgang til data, ved at det
løses på komponentnivå hvor data ikke er tilgjengelig i klartekst. Da etableres det beskyttelse ved hjelp av ett eller
flere lag med kryptering, sammen med tiltak som "segregation of duties", som vil sørge for at samme team/person ikke
både har tilgang til infrastrukturen og data/krypteringsnøklene.

En sjelden gang kan det være at årsaken til feil eller problemer faktisk ligger i dataene, og da vil Microsoft gi
støttepersonell en minimal tilgang til dette ved hjelp av «Customer Lockbox»[^8], men kun etter Digdirs bestilling. Customer
Lockbox   er en Microsoft-støttetjeneste som sørger for ekstra sikring mot innsyn i og lekkasje av personopplysninger i
forbindelse med vedlikehold og support ved feil. Dette gir oss mulighet til å styre i detalj hvem som skal gis en
midlertidig tilgang, til hva og hvor lenge, samt en detaljert sporing på dette. Dette sørger for at fragmenter av data
og eventuelle personopplysninger blant disse beskyttes fra en bredere deling via support/saksbehandlingssystemet.

Beskyttelsen i tiltaket ligger i en reell isolasjon av opplysningene, men samtidig hviler det på tiltak av
organisatorisk og teknisk art som er fullstendig under leverandørens regi. Utover kontraktsmessige garantier har vi ikke
stor mulighet til å kontrollere at leverandøren ikke med vilje omgår tiltakene eller blir tvunget til det av
utleveringskrav. Forholdene rundt informasjonen som gjøres tilgjengelig i en slik situasjon og flyktigheten i dette vil
derimot tyde på at det ikke øker risikoen for at informasjon kommer i etterretningens hender.

Utleveringskravene er personrettede, så det at fragmenter av personopplysninger som er tilgjengelig for navngitt
personell i en kort periode skal rammes av en utleveringsprosedyre, vil kreve betydelige bakdører og hemmelige
overvåkningsregimer. Det er ingen grunn til å anta at dette er noe annet enn hypotetisk. Som en del av utrullingen av
sin «EU Data Boundary» har Microsoft uttalt at «EU Data Boundary» vil utvides til å inkludere også teknisk support som
nødvendiggjør å se kundedata.

Digdir mener at en helhetsvurdering av vernenivået og den lave risikoen for utilsiktet innsyn i personopplysninger under
bruk av Customer Lockbox tilsier at en eventuell begrenset og kontrollert overføring av personopplysninger til et
tredjeland under et slikt supportbehov ikke utgjør et større inngrep i den registrertes rettigheter enn det som er
nødvendig i et demokratisk samfunn. Dette ut ifra en proporsjonalitetsvurdering hvor det teoretiske inngrepet
sammenholdes med rettssikkerhetsmekanismer og de tekniske tiltakene i form av bl.a. Customer Lockbox.

Igjen må de enkelte tjenesteeiere som benytter Altinn 3 – som behandlingsansvarlig – gjøre sine egne vurderinger av
personopplysningene som behandles i deres tjenester, og om det teoretisk mulige inngrepet er proporsjonalt og nødvendig
i et demokratisk samfunn – vurdert ut ifra konteksten til personopplysningene og den konkrete tjenesten.


[^3]: [Nye regler for overføring av personopplysninger til USA](https://www.datatilsynet.no/aktuelt/aktuelle-nyheter-2023/nye-regler-for-overforing-av-personopplysninger-til-usa/)
[^4]: https://www.dataprivacyframework.gov/participant/6474
[^6]: [Microsoft Professional services and suppliers](https://www.microsoft.com/en-us/professionalservices/suppliers) og
[Commercial Support Subprocessors from Official Microsoft Download Center](https://www.microsoft.com/en-us/download/details.aspx?id=50426)
[^7]: https://nsm.no/aktuelt/risiko-2024-nasjonal-sikkerhet-er-et-felles-ansvar
[^8]: https://learn.microsoft.com/en-us/azure/security/fundamentals/customer-lockbox-overview
[^9]: https://learn.microsoft.com/nb-no/entra/identity/authentication/concept-mfa-data-residency
