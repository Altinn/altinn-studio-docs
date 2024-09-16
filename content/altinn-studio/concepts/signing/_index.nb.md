---
title: Signering
description: Hva er signering i en Altinn 3 tjeneste?
weight: 10
---
## Autentisert elektronisk signatur
Elektronisk signatur er knyttet til sporbarhet. Sporbarhet innebærer å kunne sannsynliggjøre at en handling ble gjennomført på et bestemt tidspunkt og knyttet til en bestemt identitet. Krav til sporbarhet beskriver i hvilken grad det i ettertid skal være mulig å sannsynliggjøre at en aktør står bak et informasjonselement eller har utført en handling på et bestemt tidspunkt. 

Autentisert elektronisk signatur gjør det mulig for tjenesteeiere å sikre sporbarhet for å sannsynliggjøre at en identifisert person foretok en signeringshandling på et bestemt tidspunkt, f.eks. ved at sluttbruker bekrefter at opplysninger er riktig ved å signere. Signeringsløsningen i Altinn 3 er en autentisert signatur med mulighet for sikkerhetsnivå 3 eller 4. Autentiseringsnivå er konfigurerbart i den enkelte tjeneste. Man kan også velge lavere autentiseringsnivå enn 3 og 4. Ønsker man avansert signatur må man ta i bruk tredjeparts produkter som [eSignering | Samarbeidsportalen (digdir.no)](https://samarbeid.digdir.no/esignering/esignering/22).

Tjenesteeierne må foreta en egen vurdering av hvilken elektronisk signatur de ønsker og har behov for i sine tjenester. Dette blant annet ut ifra hvilke krav som stilles til signatur og sporbarhet i det regelverket som den enkelte tjenesteeier har ansvar for.

## Funksjonalitet
### Hva signeres det på?
Tjenesteeier styrer utvalg av dataelementer  som skal signeres og tjenesteeier velger hvilket autentiseringsnivå (identifikasjonsnivå) som sluttbruker må logge inn med før signering (nivå 1-4). Det er mulig med ett eller flere signeringssteg i sekvens.

### Signatur
Signaturhandling logges og det opprettes et signaturobjekt. Signaturobjektet representerer en signatur utført av en person, inneholder informasjon om hvilke dataelementer som er signert og eventuelt ikke signert. Signaturobjektet inneholder en såkalt hash kode av dataene som tilhører dataelementene som det signeres på. Hashing er en enveis matematisk algoritme som beregner en unik kode med utgangspunkt i dataene. Dersom bare ett tegn i dataene endres vil ikke lenger hash koden bli lik. Dataene stemmer dermed ikke lenger med det som ble signert, og det blir dermed synlig hvis data endres. 

### Logging
Det føres en hendelseslogg som inneholder hendelser utført i applikasjonen. Signering er en type handling som logges eksplisitt. Det logges id til den som utførte signeringshandlingen, sikkerhetsnivå for innloggingen, tidspunktet for handlingen, hvilket steg i prosessen handlingen ble utført på og at det var en signeringshandling. Loggdata knyttet til elektronisk signatur i Altinn 3 lagres adskilt fra tjenestene i en sentral hendelseslogg database. 

## Behandling av personopplysninger
For å sikre sporbarhet behandles det personopplysninger til loggformål. Det logges id til den som utførte signeringshandlingen som kan kobles til fødselsnummer, sikkerhetsnivå for innloggingen, hvilket steg i prosessen handlingen ble utført på, tidspunktet for handlingen og at det er en signeringshandling. Behandling av disse personopplysningene til dette formål er Digdir behandlingsansvarlig for.

Tjenesteeier er behandlingsansvarlig for behandling av personopplysninger i sine tjenester og skjema, og her for det aktuelle signeringsobjekt og tilhørende data. Dette inkluderer id til den som utførte signeringshandlingen og fødselsnummer. I henhold til samarbeidsavtalen er da Digdir databehandler for tjenesteeier.

## Lagringstid
Etter at prosessen i Altinn 3 er gjennomført, kan tjenesteeier laste ned alle data inkludert signeringsobjektet. Sluttbruker mottar en kvittering (PDF). 

Tjenesteeier kvitterer ut at signeringsobjekt og at tilhørende data er lastet ned. Sluttbruker kan velge å beholde eller å slette sin kvittering på signeringen i sin innboks. Dersom sluttbruker velger å slette sin kvittering etter at tjenesteeier har lastet ned signeringsobjektet, så innebærer det at Digdir sletter signeringsobjektet i våre systemer. Signeringsobjektet og tilhørende data må dermed lagres i tjenesteeiers systemer om man ønsker å arkivere signaturen.

Digdir logger at signeringshandlingen er utført. Det betyr at selv om signeringsobjektet er slettet, så lagrer Digdir fortsatt loggen som viser at det er utført en signaturhandling. Vanlige applikasjonslogger (benyttes som regel til feilsøking) lagrer Digdir i 90 dager, mens hendelseslogger lagrer vi i 13 måneder. 

## Verifisering av signatur
Tjenesteeier lagrer signaturobjektet i sitt arkivsystem. Signaturobjektet inneholder en hash kode av dataene som tilhører dataelementet. Dersom signaturobjektet senere endres vil dette kunne verifiseres ved at hash koden i signaturobjektet ikke lenger stemmer, dette bidrar til sporbarhet for signaturobjektet. Dette forutsetter at signaturen, dvs. hash koden, også finnes på sluttbruker sin kvittering slik at begge parter har hver sin kopi.

[Her kan du kan lese den teknisk beskrivelse for hvordan verifisering av signaturen gjøres.](https://docs.altinn.studio/nb/altinn-studio/reference/process/tasks/signing/#verifisering-av-sha256-hash) 
